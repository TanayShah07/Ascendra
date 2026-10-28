import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Mic,
    MicOff,
    Send,
    Volume2,
    RotateCcw,
    LoaderCircle,
    Camera,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./MockInterviewSession.css";

const speechLanguage = (language) =>
    ({
        English: "en-IN",
        Hindi: "hi-IN",
        Hinglish: "en-IN",
    }[language] || "en-IN");

const MockInterviewSession = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initial = location.state;

    const [session] = useState(initial || null);
    const [question, setQuestion] = useState(initial?.question || "");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(null);
    const [busy, setBusy] = useState(false);
    const [listening, setListening] = useState(false);
    const [finished, setFinished] = useState(false);
    const [summary, setSummary] = useState(null);
    const [cameraError, setCameraError] = useState("");
    const [poseStatus, setPoseStatus] = useState("Loading head-movement monitor…");
    const [poseWarning, setPoseWarning] = useState("");
    const [poseWarningCount, setPoseWarningCount] = useState(0);

    const recognitionRef = useRef(null);
    const cameraVideoRef = useRef(null);
    const cameraStreamRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const lookingAwaySinceRef = useRef(null);
    const lastWarningAtRef = useRef(0);
    const poseAnimationRef = useRef(null);
    const poseWarningTimerRef = useRef(null);

    const language = session?.language || "English";

    const speak = useCallback((text, selectedLanguage = "English") => {
        if (!text || !("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = speechLanguage(selectedLanguage);
        window.speechSynthesis.speak(utterance);
    }, []);

    useEffect(() => {
        if (!initial?.session_id) {
            toast.error("Start an interview first.");
            navigate("/interview/mock", { replace: true });
            return;
        }

        speak(initial.question || "", initial.language || "English");

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch {
                    // Recognition may already have stopped.
                }
                recognitionRef.current = null;
            }

            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, [initial, navigate, speak]);

    useEffect(() => {
        let cancelled = false;

        const startCamera = async () => {
            if (!navigator.mediaDevices?.getUserMedia) {
                setCameraError("Camera access is not supported by this browser.");
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (cancelled) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                cameraStreamRef.current = stream;

                const video = cameraVideoRef.current;
                if (video) {
                    video.srcObject = stream;
                    try {
                        await video.play();
                    } catch {
                        // Autoplay can be blocked; the video element remains available.
                    }
                }

                setCameraError("");
            } catch {
                if (!cancelled) {
                    setCameraError(
                        "Camera access is unavailable. Allow camera permission and reload the interview."
                    );
                }
            }
        };

        startCamera();

        return () => {
            cancelled = true;

            cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
            cameraStreamRef.current = null;

            if (cameraVideoRef.current) {
                cameraVideoRef.current.srcObject = null;
            }
        };
    }, []);

    // Optional browser-side face landmark model. It does not upload camera frames.
    // The model estimates approximate head orientation; warnings are coaching cues,
    // not a judgement of attention, honesty, or interview performance.
    useEffect(() => {
        let cancelled = false;
        let lastVideoTime = -1;

        const initialisePoseMonitor = async () => {
            try {
                const video = cameraVideoRef.current;
                if (!video) return;

                // Load MediaPipe from its public ESM CDN to avoid adding a large
                // build-time dependency to the existing frontend bundle.
                const vision = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/+esm");
                if (cancelled) return;

                const fileset = await vision.FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm"
                );
                const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: "CPU",
                    },
                    runningMode: "VIDEO",
                    numFaces: 1,
                    outputFaceBlendshapes: false,
                    outputFacialTransformationMatrixes: true,
                });

                if (cancelled) {
                    landmarker.close();
                    return;
                }

                faceLandmarkerRef.current = landmarker;
                setPoseStatus("Head-movement monitor active");

                const monitorFrame = () => {
                    if (cancelled) return;
                    const currentVideo = cameraVideoRef.current;
                    const model = faceLandmarkerRef.current;

                    if (currentVideo && model && currentVideo.readyState >= 2 && currentVideo.currentTime !== lastVideoTime) {
                        lastVideoTime = currentVideo.currentTime;
                        try {
                            const result = model.detectForVideo(currentVideo, performance.now());
                            const face = result.faceLandmarks?.[0];

                            if (!face) {
                                setPoseStatus("Face not detected");
                                setPoseWarning("");
                                lookingAwaySinceRef.current = null;
                            } else {
                                // Approximate yaw/pitch proxies from facial landmarks.
                                // This is a lightweight heuristic, not a calibrated pose model.
                                const leftEye = face[33];
                                const rightEye = face[263];
                                const nose = face[1];
                                const forehead = face[10];
                                const chin = face[152];
                                const eyeSpan = Math.max(Math.abs(rightEye.x - leftEye.x), 0.001);
                                const eyeMidX = (leftEye.x + rightEye.x) / 2;
                                const yawProxy = Math.abs(nose.x - eyeMidX) / eyeSpan;
                                const eyeMidY = (leftEye.y + rightEye.y) / 2;
                                const faceHeight = Math.max(Math.abs(chin.y - forehead.y), 0.001);
                                const verticalRatio = (nose.y - eyeMidY) / faceHeight;
                                const turnedSideways = yawProxy > 0.16;
                                const tiltedAway = verticalRatio < 0.19 || verticalRatio > 0.48;
                                const lookingAway = turnedSideways || tiltedAway;

                                setPoseStatus(lookingAway ? "Head orientation changed" : "Head position looks forward");
                                if (lookingAway) {
                                    if (lookingAwaySinceRef.current === null) {
                                        lookingAwaySinceRef.current = Date.now();
                                    }
                                    const sustained = Date.now() - lookingAwaySinceRef.current >= 2200;
                                    const cooldownPassed = Date.now() - lastWarningAtRef.current >= 8000;
                                    if (sustained && cooldownPassed) {
                                        lastWarningAtRef.current = Date.now();
                                        setPoseWarning("Your head appears turned away. Try facing the screen when comfortable.");
                                        setPoseWarningCount((count) => count + 1);
                                        if (poseWarningTimerRef.current) clearTimeout(poseWarningTimerRef.current);
                                        poseWarningTimerRef.current = setTimeout(() => setPoseWarning(""), 5000);
                                    }
                                } else {
                                    lookingAwaySinceRef.current = null;
                                    setPoseWarning("");
                                }
                            }
                        } catch {
                            setPoseStatus("Head-movement monitor unavailable");
                        }
                    }
                    poseAnimationRef.current = requestAnimationFrame(monitorFrame);
                };
                poseAnimationRef.current = requestAnimationFrame(monitorFrame);
            } catch {
                if (!cancelled) {
                    setPoseStatus("Head-movement monitor unavailable (model/network not loaded)");
                }
            }
        };

        if (cameraStreamRef.current) initialisePoseMonitor();
        else {
            // Camera acquisition runs in another effect; wait briefly for the video stream.
            const waitForCamera = () => {
                if (cancelled) return;
                if (cameraVideoRef.current?.srcObject) initialisePoseMonitor();
                else poseAnimationRef.current = requestAnimationFrame(waitForCamera);
            };
            poseAnimationRef.current = requestAnimationFrame(waitForCamera);
        }

        return () => {
            cancelled = true;
            if (poseAnimationRef.current) cancelAnimationFrame(poseAnimationRef.current);
            if (poseWarningTimerRef.current) clearTimeout(poseWarningTimerRef.current);
            faceLandmarkerRef.current?.close();
            faceLandmarkerRef.current = null;
        };
    }, []);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            toast.error(
                "Speech recognition is not supported in this browser. Try Chrome or type your answer."
            );
            return;
        }

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch {
                // Ignore if the previous recognition instance has already stopped.
            }
        }

        const recognition = new SpeechRecognition();
        recognition.lang = speechLanguage(language);
        recognition.interimResults = true;
        recognition.continuous = false;
        recognitionRef.current = recognition;

        let finalTranscript = "";

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event) => {
            let interim = "";

            for (let i = event.resultIndex; i < event.results.length; i += 1) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalTranscript += `${transcript} `;
                } else {
                    interim += transcript;
                }
            }

            setAnswer(`${finalTranscript}${interim}`.trim());
        };

        recognition.onerror = (event) => {
            if (event.error !== "no-speech" && event.error !== "aborted") {
                toast.error(`Microphone: ${event.error}`);
            }
        };

        recognition.onend = () => setListening(false);

        try {
            recognition.start();
        } catch {
            setListening(false);
            toast.error("Could not start speech recognition. Please try again.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch {
                // Recognition may already have stopped.
            }
        }
        setListening(false);
    };

    const submitAnswer = async (override) => {
        const spokenAnswer = (override ?? answer).trim();

        if (!spokenAnswer || busy || finished || !session?.session_id) return;

        stopListening();
        setBusy(true);
        setFeedback("");

        try {
            const { data } = await API.post("/interview/answer", {
                session_id: session.session_id,
                answer: spokenAnswer,
            });

            setFeedback(data.feedback || "");
            setScore(typeof data.score === "number" ? data.score : null);
            setAnswer("");

            if (data.finished) {
                setFinished(true);
                setSummary(data.summary || null);
                speak(
                    `${data.feedback || ""} Interview complete.`,
                    language
                );
            } else if (data.question) {
                setQuestion(data.question);
                speak(
                    `${data.feedback ? `${data.feedback} ` : ""}Next question. ${data.question}`,
                    language
                );
            } else if (data.feedback) {
                speak(data.feedback, language);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.detail || "Could not evaluate your answer."
            );
        } finally {
            setBusy(false);
        }
    };

    const repeatQuestion = async () => {
        if (!question || busy || !session?.session_id) return;

        setBusy(true);

        try {
            const { data } = await API.post("/interview/answer", {
                session_id: session.session_id,
                answer: "repeat",
            });

            if (data.question) {
                setQuestion(data.question);
                speak(data.question, language);
            }

            setFeedback(data.feedback || "");
        } catch (error) {
            toast.error(
                error?.response?.data?.detail || "Could not repeat the question."
            );
        } finally {
            setBusy(false);
        }
    };

    const clarifyQuestion = async () => {
        if (busy) return;
        await submitAnswer("clarify");
    };

    if (!session) return null;

    return (
        <DashboardLayout>
            <div className="mock-session-page">
                <button
                    type="button"
                    className="mock-session-back"
                    onClick={() => navigate("/interview/mock")}
                >
                    <ArrowLeft size={18} /> Exit interview
                </button>

                <header className="mock-session-header">
                    <div>
                        <p className="mock-session-eyebrow">
                            ASCENDRA · AI MOCK INTERVIEW
                        </p>
                        <h1>{session.subject} Interview</h1>
                        <p>
                            {session.difficulty} · {session.language} · {session.duration} minutes
                        </p>
                    </div>
                    <div className="mock-session-question-count">
                        Question {session.question_number || 1}
                    </div>
                </header>

                <aside
                    className="mock-session-camera-dock"
                    aria-label="Your live camera preview"
                >
                    <div className="mock-session-camera-heading">
                        <Camera size={16} /> Your video
                    </div>
                    <video
                        ref={cameraVideoRef}
                        className="mock-session-camera-video"
                        autoPlay
                        muted
                        playsInline
                    />
                    {cameraError && (
                        <p className="mock-session-camera-error">{cameraError}</p>
                    )}
                    <div className="mock-session-pose-status" role="status">
                        <span className="mock-session-pose-dot" /> {poseStatus}
                    </div>
                    {poseWarning && (
                        <p className="mock-session-pose-warning" role="alert">{poseWarning}</p>
                    )}
                    <p className="mock-session-pose-note">
                        Camera analysis runs in your browser. Movement alerts are approximate coaching cues, not a performance score.
                    </p>
                </aside>

                {!finished ? (
                    <section className="mock-session-card">
                        <div className="mock-session-ai-icon">
                            <Volume2 size={24} />
                        </div>
                        <p className="mock-session-label">INTERVIEWER</p>
                        <h2>{question}</h2>

                        <div className="mock-session-question-actions">
                            <button
                                type="button"
                                onClick={repeatQuestion}
                                disabled={busy}
                            >
                                <RotateCcw size={16} /> Repeat
                            </button>
                            <button
                                type="button"
                                onClick={clarifyQuestion}
                                disabled={busy}
                            >
                                <Volume2 size={16} /> Clarify
                            </button>
                        </div>

                        <label htmlFor="mock-answer">Your answer</label>
                        <textarea
                            id="mock-answer"
                            rows={5}
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                            placeholder="Click the microphone and answer aloud, or type your answer here..."
                            disabled={busy}
                        />

                        <div className="mock-session-controls">
                            <button
                                type="button"
                                className={
                                    listening ? "mock-mic-btn listening" : "mock-mic-btn"
                                }
                                onClick={listening ? stopListening : startListening}
                                disabled={busy}
                            >
                                {listening ? <MicOff size={18} /> : <Mic size={18} />}
                                {listening ? "Stop recording" : "Speak answer"}
                            </button>

                            <button
                                type="button"
                                className="mock-submit-btn"
                                onClick={() => submitAnswer()}
                                disabled={busy || !answer.trim()}
                            >
                                {busy ? (
                                    <LoaderCircle
                                        size={18}
                                        className="interview-spinner"
                                    />
                                ) : (
                                    <Send size={18} />
                                )}
                                {busy ? "Evaluating..." : "Submit answer"}
                            </button>
                        </div>

                        {feedback && (
                            <div className="mock-session-feedback">
                                <div className="mock-session-feedback-heading">
                                    <strong>AI Feedback</strong>
                                    {score !== null && <span>{score}/100</span>}
                                </div>
                                <p>{feedback}</p>
                            </div>
                        )}
                    </section>
                ) : (
                    <section className="mock-session-card mock-session-complete">
                        <div className="mock-session-ai-icon">
                            <Volume2 size={24} />
                        </div>
                        <h2>Interview complete!</h2>
                        <p>
                            {summary?.message ||
                                "You've completed this practice session."}
                        </p>

                        {summary && (
                            <p>
                                <strong>Questions answered:</strong>{" "}
                                {summary.questions_answered} ·{" "}
                                <strong>Average score:</strong>{" "}
                                {summary.average_score}/100
                            </p>
                        )}
                        <p><strong>Head-movement alerts:</strong> {poseWarningCount}</p>

                        {feedback && (
                            <div className="mock-session-feedback">
                                <strong>Final feedback</strong>
                                <p>{feedback}</p>
                            </div>
                        )}

                        <button
                            type="button"
                            className="mock-submit-btn"
                            onClick={() => navigate("/interview/mock")}
                        >
                            Start another interview
                        </button>
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MockInterviewSession;
