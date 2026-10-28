import "./MockInterview.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowLeft, LoaderCircle, Camera, Mic, Monitor, Volume2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import API from "../../services/api";
import toast from "react-hot-toast";

const initialChecks = {
    camera: { status: "pending", message: "Not checked" },
    microphone: { status: "pending", message: "Not checked" },
    audio: { status: "pending", message: "Not checked" },
    speech: { status: "pending", message: "Not checked" },
    screen: { status: "pending", message: "Not checked" },
    screenAudio: { status: "pending", message: "Checked with screen sharing" }
};

const CheckRow = ({ icon: Icon, title, description, result, action, actionLabel, optional = false }) => {
    const statusIcon = result.status === "passed"
        ? <CheckCircle2 size={20} color="#16a34a" />
        : result.status === "failed"
            ? <XCircle size={20} color="#dc2626" />
            : result.status === "warning"
                ? <AlertCircle size={20} color="#d97706" />
                : <AlertCircle size={20} color="var(--text-secondary)" />;

    return (
        <div className="system-check-row">
            <div className="system-check-icon"><Icon size={21} /></div>
            <div className="system-check-copy">
                <div className="system-check-title">{title} {optional && <span className="system-check-optional">Optional</span>}</div>
                <div className="system-check-description">{description}</div>
                <div className={`system-check-status ${result.status}`}>{statusIcon}<span>{result.message}</span></div>
            </div>
            {action && <button type="button" className="system-check-action" onClick={action}>{actionLabel}</button>}
        </div>
    );
};

const MockInterview = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [duration, setDuration] = useState("30");
    const [language, setLanguage] = useState("English");
    const [starting, setStarting] = useState(false);
    const [checking, setChecking] = useState(false);
    const [checks, setChecks] = useState(initialChecks);
    const [screenAudioAvailable, setScreenAudioAvailable] = useState(null);
    const [cameraPreviewStream, setCameraPreviewStream] = useState(null);
    const cameraVideoRef = useRef(null);
    const cameraStreamRef = useRef(null);
    const microphoneStreamRef = useRef(null);

    const subjects = [
        "Data Structures", "OOP", "DBMS", "Operating Systems",
        "Computer Networks", "Java", "Python", "JavaScript",
        "React", "HR", "Aptitude", "Mixed"
    ];

    const updateCheck = (key, status, message) => {
        setChecks(prev => ({ ...prev, [key]: { status, message } }));
    };

    const stopStream = (stream) => {
        stream?.getTracks?.().forEach(track => track.stop());
    };

    useEffect(() => {
        if (cameraVideoRef.current && cameraPreviewStream) {
            cameraVideoRef.current.srcObject = cameraPreviewStream;
            cameraVideoRef.current.play?.().catch(() => {});
        }
    }, [cameraPreviewStream]);

    useEffect(() => () => {
        stopStream(cameraStreamRef.current);
        stopStream(microphoneStreamRef.current);
    }, []);

    const checkCamera = async () => {
        try {
            stopStream(cameraStreamRef.current);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            cameraStreamRef.current = stream;
            setCameraPreviewStream(stream);
            updateCheck("camera", "passed", `Live preview active: ${stream.getVideoTracks()[0]?.label || "camera detected"}`);
        } catch (error) {
            stopStream(cameraStreamRef.current);
            cameraStreamRef.current = null;
            setCameraPreviewStream(null);
            updateCheck("camera", "failed", error.name === "NotAllowedError"
                ? "Permission denied. Allow camera access in your browser."
                : "Camera unavailable. Connect or enable a camera and retry.");
        }
    };

    const checkMicrophone = async () => {
        try {
            stopStream(microphoneStreamRef.current);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            microphoneStreamRef.current = stream;
            const track = stream.getAudioTracks()[0];
            if (track) {
                updateCheck("microphone", "passed", `Microphone available: ${track.label || "audio input detected"}`);
                stopStream(stream);
                microphoneStreamRef.current = null;
            } else {
                updateCheck("microphone", "failed", "No microphone audio track was detected.");
            }
        } catch (error) {
            updateCheck("microphone", "failed", error.name === "NotAllowedError"
                ? "Permission denied. Allow microphone access in your browser."
                : "Microphone unavailable. Connect or enable a microphone and retry.");
        }
    };

    const checkAudioPlayback = async () => {
        try {
            if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
                updateCheck("audio", "failed", "This browser does not support spoken question playback.");
                return;
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Audio check successful. You should hear this sentence.");
            utterance.lang = language === "Hindi" ? "hi-IN" : "en-IN";
            utterance.onend = () => updateCheck("audio", "passed", "Playback completed. If you did not hear it, check your speakers.");
            utterance.onerror = () => updateCheck("audio", "failed", "Audio playback failed. Check browser audio and speaker settings.");
            window.speechSynthesis.speak(utterance);
        } catch {
            updateCheck("audio", "failed", "Could not start audio playback.");
        }
    };

    const checkSpeechRecognition = () => {
        const supported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
        updateCheck("speech", supported ? "passed" : "failed", supported
            ? "Speech recognition is supported in this browser."
            : "Speech recognition is unsupported here. Use a recent Chrome browser or switch to typed answers.");
    };

    const checkScreenShare = async () => {
        if (!navigator.mediaDevices?.getDisplayMedia) {
            updateCheck("screen", "failed", "This browser does not support screen sharing.");
            updateCheck("screenAudio", "failed", "Screen audio capture is unavailable.");
            setScreenAudioAvailable(false);
            return;
        }
        let stream;
        try {
            // The browser picker cannot be programmatically restricted. We validate the
            // selected surface afterwards and reject anything except the entire monitor.
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: { displaySurface: "monitor" },
                audio: true,
                preferCurrentTab: false,
                selfBrowserSurface: "exclude",
                surfaceSwitching: "exclude",
                systemAudio: "include"
            });
            const videoTrack = stream.getVideoTracks()[0];
            const settings = videoTrack?.getSettings?.() || {};
            const fullMonitor = settings.displaySurface === "monitor";
            const hasAudio = stream.getAudioTracks().length > 0;
            setScreenAudioAvailable(hasAudio);

            if (!fullMonitor) {
                updateCheck("screen", "failed", "Not accepted: select Entire Screen/Monitor, not a window or browser tab.");
                updateCheck("screenAudio", hasAudio ? "passed" : "failed",
                    hasAudio ? "Audio track detected, but the selected surface was rejected."
                        : "No shared-screen audio track was detected.");
            } else if (!hasAudio) {
                updateCheck("screen", "failed", "Full screen selected, but screen audio was not provided. Retry and enable share-audio if your browser offers it.");
                updateCheck("screenAudio", "failed", "No shared-screen audio track. This browser/OS may not support it.");
            } else {
                updateCheck("screen", "passed", "Full monitor and shared audio detected.");
                updateCheck("screenAudio", "passed", "Full-screen audio track detected.");
            }
        } catch (error) {
            updateCheck("screen", "failed", error.name === "NotAllowedError"
                ? "Screen sharing was cancelled or permission was denied. Retry and choose Entire Screen."
                : "Could not start full-screen sharing. Check browser/OS support and retry.");
            updateCheck("screenAudio", "failed", "Audio availability could not be verified.");
            setScreenAudioAvailable(false);
        } finally {
            stream?.getTracks?.().forEach(track => track.stop());
        }
    };

    const runBasicChecks = async () => {
        setChecking(true);
        try {
            await checkCamera();
            await checkMicrophone();
            checkSpeechRecognition();
        } finally {
            setChecking(false);
        }
    };

    const requiredChecksPassed =
        checks.camera.status === "passed" &&
        checks.microphone.status === "passed" &&
        checks.audio.status === "passed" &&
        checks.speech.status === "passed" &&
        checks.screen.status === "passed" &&
        checks.screenAudio.status === "passed";

    const handleStart = async () => {
        if (!subject) {
            toast.error("Please select an interview subject.");
            return;
        }
        if (!requiredChecksPassed) {
            toast.error("Complete all required system checks before starting.");
            return;
        }
        setStarting(true);
        try {
            const response = await API.post("/interview/start", {
                subject, difficulty, duration: Number(duration), language
            });
            navigate("/interview/mock/session", { state: response.data });
        } catch (error) {
            const detail = error?.response?.data?.detail;
            toast.error(typeof detail === "string" ? detail : "Could not start the interview. Check that the backend is running.");
        } finally {
            setStarting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="setup-page">
                <button className="mock-interview-back-btn" onClick={() => navigate("/interview")}>
                    <ArrowLeft size={18} /> {t("interview.backToInterview")}
                </button>
                <h1>{t("interview.aiMockInterview")}</h1>
                <p>{t("interview.configureInterview")}</p>

                <div className="setup-card">
                    <label>{t("interview.subject")}</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">{t("interview.selectSubject")}</option>
                        {subjects.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>

                    <label>{t("interview.difficulty")}</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="Easy">{t("interview.easy")}</option>
                        <option value="Medium">{t("interview.medium")}</option>
                        <option value="Hard">{t("interview.hard")}</option>
                    </select>

                    <label>{t("interview.duration")}</label>
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>

                    <label>{t("interview.language")}</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Hinglish">Hinglish</option>
                    </select>
                </div>

                <section className="system-check-card">
                    <div className="system-check-header">
                        <div>
                            <h2>System check</h2>
                            <p>Verify your devices before the interview begins.</p>
                        </div>
                        <button type="button" className="system-check-run" onClick={runBasicChecks} disabled={checking}>
                            {checking ? <LoaderCircle size={17} className="interview-spinner" /> : <Camera size={17} />}
                            {checking ? "Checking..." : "Check camera & mic"}
                        </button>
                    </div>
                    <CheckRow icon={Camera} title="Camera" description="Allow camera permission and verify video input." result={checks.camera} action={checkCamera} actionLabel="Test camera" />
                    {cameraPreviewStream && (
                        <div className="camera-preview-panel">
                            <video ref={cameraVideoRef} className="camera-preview-video" autoPlay muted playsInline />
                            <div><strong>Camera preview</strong><span>Make sure your face is clearly visible.</span></div>
                            <button type="button" onClick={() => {
                                stopStream(cameraStreamRef.current);
                                cameraStreamRef.current = null;
                                setCameraPreviewStream(null);
                                updateCheck("camera", "pending", "Camera preview stopped. Test again when ready.");
                            }}>Stop preview</button>
                        </div>
                    )}
                    <CheckRow icon={Mic} title="Microphone" description="Allow microphone permission and verify audio input." result={checks.microphone} action={checkMicrophone} actionLabel="Test mic" />
                    <CheckRow icon={Volume2} title="Audio playback" description="Play a short spoken test. Confirm you can hear it." result={checks.audio} action={checkAudioPlayback} actionLabel="Test audio" />
                    <CheckRow icon={Mic} title="Speech recognition" description="Check browser support for speaking answers." result={checks.speech} action={checkSpeechRecognition} actionLabel="Check support" />
                    <CheckRow icon={Monitor} title="Screen sharing" description="Choose Entire Screen/Monitor and enable share-audio when prompted. Windows and browser tabs are rejected." result={checks.screen} action={checkScreenShare} actionLabel="Test full screen" />
                    <CheckRow icon={Volume2} title="Shared-screen audio" description="Audio capture depends on browser, OS and the sharing option." result={checks.screenAudio} optional />
                    {screenAudioAvailable === false && <p className="system-check-note">Full-screen sharing with audio is required. Some browsers/operating systems do not expose system audio; use a supported desktop browser and retry.</p>}
                    <p className="system-check-note">Camera preview stays visible during setup. The screen-share test accepts only a full monitor with an audio track; browser support varies. The interview starts only after all required checks pass.</p>
                    <button className="start-btn" onClick={handleStart} disabled={starting || !requiredChecksPassed}>
                        {starting ? <LoaderCircle size={20} className="interview-spinner" /> : <Play size={20} />}
                        {starting ? "Starting..." : requiredChecksPassed ? t("interview.startInterview") : "Complete system checks to start"}
                    </button>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default MockInterview;
