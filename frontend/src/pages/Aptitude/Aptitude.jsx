import "./Aptitude.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    ArrowLeft,
    ArrowRight,
    Calculator,
    Building2,
    Brain,
    Clock3,
    Trophy,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Loader2
} from "lucide-react";

import {
    useEffect,
    useState,
    useRef
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    getAptitudeCompanies,
    getAptitudeCategories,
    getAptitudeQuestions
} from "../../services/aptitudeService";


const Aptitude = () => {

    const navigate = useNavigate();

    const { token } = useAuth();


    // =====================================================
    // DATA
    // =====================================================

    const [companies, setCompanies] = useState([]);

    const [categories, setCategories] = useState([]);


    // =====================================================
    // QUESTIONS
    // =====================================================

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState({});


    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] =
        useState(true);

    const [questionsLoading, setQuestionsLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [testStarted, setTestStarted] =
        useState(false);

    const [testCompleted, setTestCompleted] =
        useState(false);


    // =====================================================
    // TEST INFO
    // =====================================================

    const [selectedMode, setSelectedMode] =
        useState("");

    const [selectedValue, setSelectedValue] =
        useState("");

    const [selectedDifficulty, setSelectedDifficulty] =
        useState("");

    const [questionCount, setQuestionCount] =
        useState(15);


    // =====================================================
    // TIMER
    // =====================================================

    /*
     * GENERAL APTITUDE ONLY
     *
     * 1 minute per question.
     *
     * 10 questions = 10 minutes
     * 15 questions = 15 minutes
     * 30 questions = 30 minutes
     * 50 questions = 50 minutes
     *
     * Company tests do NOT use timer.
     */

    const [timeLeft, setTimeLeft] =
        useState(0);

    const timerRef =
        useRef(null);

    const answersRef =
        useRef({});


    // =====================================================
    // RESULT
    // =====================================================

    const [score, setScore] =
        useState(0);

    const [correctAnswers, setCorrectAnswers] =
        useState(0);


    // =====================================================
    // LOAD COMPANIES + CATEGORIES
    // =====================================================

    useEffect(() => {

        if (!token) {
            return;
        }


        const loadAptitudeData = async () => {

            try {

                setLoading(true);

                setError("");


                const [
                    companiesResponse,
                    categoriesResponse
                ] = await Promise.all([

                    getAptitudeCompanies(token),

                    getAptitudeCategories(token)

                ]);


                setCompanies(
                    companiesResponse.data?.companies || []
                );


                setCategories(
                    categoriesResponse.data?.categories || []
                );


            } catch (err) {

                console.error(
                    "Aptitude loading error:",
                    err
                );

                setError(
                    "Unable to load aptitude data."
                );

            } finally {

                setLoading(false);

            }

        };


        loadAptitudeData();

    }, [token]);


    // =====================================================
    // FORMAT TIMER
    // =====================================================

    const formatTime = (seconds) => {

        const safeSeconds =
            Math.max(
                0,
                seconds || 0
            );


        const minutes =
            Math.floor(
                safeSeconds / 60
            );


        const remainingSeconds =
            safeSeconds % 60;


        return (
            `${String(minutes).padStart(2, "0")}:` +
            `${String(remainingSeconds).padStart(2, "0")}`
        );

    };


    // =====================================================
    // SUBMIT TEST
    // =====================================================

    const submitTest = () => {

        // -------------------------------------------------
        // STOP TIMER
        // -------------------------------------------------

        if (timerRef.current) {

            clearInterval(
                timerRef.current
            );

            timerRef.current = null;

        }


        // -------------------------------------------------
        // GET LATEST ANSWERS
        // -------------------------------------------------

        const currentAnswers =
            answersRef.current;


        // -------------------------------------------------
        // CALCULATE CORRECT ANSWERS
        // -------------------------------------------------

        let correct = 0;


        questions.forEach(
            question => {

                const selected =
                    currentAnswers[
                        question.id
                    ];


                if (
                    selected &&
                    selected.toUpperCase() ===
                    question.correct_answer?.toUpperCase()
                ) {

                    correct++;

                }

            }
        );


        // -------------------------------------------------
        // TOTAL MARKS
        // -------------------------------------------------

        const totalMarks =
            questions.reduce(
                (
                    total,
                    question
                ) => {

                    return (
                        total +
                        (question.marks || 1)
                    );

                },
                0
            );


        // -------------------------------------------------
        // OBTAINED MARKS
        // -------------------------------------------------

        const obtainedMarks =
            questions.reduce(
                (
                    total,
                    question
                ) => {

                    const selected =
                        currentAnswers[
                            question.id
                        ];


                    if (
                        selected &&
                        selected.toUpperCase() ===
                        question.correct_answer?.toUpperCase()
                    ) {

                        return (
                            total +
                            (question.marks || 1)
                        );

                    }


                    return total;

                },
                0
            );


        // -------------------------------------------------
        // PERCENTAGE
        // -------------------------------------------------

        const calculatedScore =
            totalMarks > 0

                ? Math.round(
                    (
                        obtainedMarks /
                        totalMarks
                    ) * 100
                )

                : 0;


        // -------------------------------------------------
        // SAVE RESULT
        // -------------------------------------------------

        setCorrectAnswers(
            correct
        );


        setScore(
            calculatedScore
        );


        setTestCompleted(
            true
        );


        setTimeLeft(
            previous =>
                previous
        );

    };


    // =====================================================
    // LOAD QUESTIONS
    // =====================================================

    const loadQuestions = async (
        mode,
        value,
        difficulty = selectedDifficulty
    ) => {

        try {

            setQuestionsLoading(true);

            setError("");


            // -------------------------------------------------
            // STOP ANY PREVIOUS TIMER
            // -------------------------------------------------

            if (timerRef.current) {

                clearInterval(
                    timerRef.current
                );

                timerRef.current = null;

            }


            // -------------------------------------------------
            // API REQUEST
            // -------------------------------------------------

            const response =
                await getAptitudeQuestions(
                    token,
                    {

                        /*
                         * COMPANY MODE
                         */

                        company:
                            mode === "company"
                                ? value
                                : null,


                        /*
                         * GENERAL CATEGORY MODE
                         */

                        category:
                            mode === "category"
                                ? value
                                : null,


                        /*
                         * Empty = balanced
                         */

                        difficulty:
                            difficulty || null,


                        /*
                         * Selected question count
                         */

                        limit:
                            questionCount

                    }
                );


            // -------------------------------------------------
            // GET QUESTIONS
            // -------------------------------------------------

            const loadedQuestions =
                response.data || [];


            // -------------------------------------------------
            // NO QUESTIONS
            // -------------------------------------------------

            if (
                loadedQuestions.length === 0
            ) {

                setError(
                    "No questions are available for this selection yet."
                );

                return;

            }


            // -------------------------------------------------
            // SET QUESTIONS
            // -------------------------------------------------

            setQuestions(
                loadedQuestions
            );


            setCurrentQuestion(
                0
            );


            setAnswers(
                {}
            );


            answersRef.current =
                {};


            // -------------------------------------------------
            // TEST INFORMATION
            // -------------------------------------------------

            setSelectedMode(
                mode
            );


            setSelectedValue(
                value
            );


            setSelectedDifficulty(
                difficulty
            );


            setTestStarted(
                true
            );


            setTestCompleted(
                false
            );


            setScore(
                0
            );


            setCorrectAnswers(
                0
            );


            // -------------------------------------------------
            // TIMER
            // -------------------------------------------------

            /*
             * ONLY GENERAL/CATEGORY TESTS ARE TIMED.
             *
             * Company tests have no timer.
             */

            if (
                mode === "category"
            ) {

                const totalSeconds =
                    loadedQuestions.length *
                    60;


                setTimeLeft(
                    totalSeconds
                );

            } else {

                setTimeLeft(
                    0
                );

            }


        } catch (err) {

            console.error(
                "Question loading error:",
                err
            );


            setError(
                err?.response?.data?.detail ||
                "Unable to load questions."
            );

        } finally {

            setQuestionsLoading(
                false
            );

        }

    };


    // =====================================================
    // TIMER EFFECT
    // =====================================================

    useEffect(() => {

        /*
         * No active test
         */

        if (
            !testStarted ||
            testCompleted
        ) {

            return;

        }


        /*
         * Company tests are NOT timed
         */

        if (
            selectedMode === "company"
        ) {

            return;

        }


        /*
         * No questions
         */

        if (
            questions.length === 0
        ) {

            return;

        }


        /*
         * Clear previous timer
         */

        if (timerRef.current) {

            clearInterval(
                timerRef.current
            );

        }


        /*
         * Start timer
         */

        timerRef.current =
            setInterval(() => {

                setTimeLeft(
                    previousTime => {

                        /*
                         * TIME UP
                         */

                        if (
                            previousTime <= 1
                        ) {

                            clearInterval(
                                timerRef.current
                            );

                            timerRef.current =
                                null;


                            /*
                             * Submit automatically.
                             */

                            submitTest();


                            return 0;

                        }


                        return (
                            previousTime - 1
                        );

                    }
                );

            }, 1000);


        /*
         * Cleanup
         */

        return () => {

            if (
                timerRef.current
            ) {

                clearInterval(
                    timerRef.current
                );

                timerRef.current =
                    null;

            }

        };

    }, [
        testStarted,
        testCompleted,
        selectedMode,
        questions.length
    ]);


    // =====================================================
    // SELECT ANSWER
    // =====================================================

    const selectAnswer = (
        questionId,
        answer
    ) => {

        if (
            testCompleted
        ) {

            return;

        }


        setAnswers(
            previous => {

                const updatedAnswers = {

                    ...previous,

                    [questionId]:
                        answer

                };


                /*
                 * Keep a ref with
                 * latest answers.
                 */

                answersRef.current =
                    updatedAnswers;


                return updatedAnswers;

            }
        );

    };


    // =====================================================
    // NEXT QUESTION
    // =====================================================

    const nextQuestion = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            setCurrentQuestion(
                previous =>
                    previous + 1
            );

        }

    };


    // =====================================================
    // PREVIOUS QUESTION
    // =====================================================

    const previousQuestion = () => {

        if (
            currentQuestion > 0
        ) {

            setCurrentQuestion(
                previous =>
                    previous - 1
            );

        }

    };


    // =====================================================
    // RESET TEST
    // =====================================================

    const resetTest = () => {

        /*
         * Stop timer
         */

        if (
            timerRef.current
        ) {

            clearInterval(
                timerRef.current
            );

            timerRef.current =
                null;

        }


        /*
         * Reset questions
         */

        setQuestions(
            []
        );


        /*
         * Reset answers
         */

        setAnswers(
            {}
        );


        answersRef.current =
            {};


        /*
         * Reset position
         */

        setCurrentQuestion(
            0
        );


        /*
         * Reset test state
         */

        setTestStarted(
            false
        );


        setTestCompleted(
            false
        );


        /*
         * Reset selections
         */

        setSelectedMode(
            ""
        );


        setSelectedValue(
            ""
        );


        setSelectedDifficulty(
            ""
        );


        /*
         * Reset results
         */

        setScore(
            0
        );


        setCorrectAnswers(
            0
        );


        /*
         * Reset timer
         */

        setTimeLeft(
            0
        );


        /*
         * Reset errors
         */

        setError(
            ""
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (
        loading
    ) {

        return (

            <DashboardLayout>

                <div
                    className="aptitude-page"
                >

                    <div
                        style={{
                            minHeight:
                                "60vh",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            gap:
                                "12px"
                        }}
                    >

                        <Loader2
                            size={28}
                            className="spin"
                        />

                        <span>
                            Loading aptitude preparation...
                        </span>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // =====================================================
    // TEST RESULT
    // =====================================================

    if (
        testStarted &&
        testCompleted
    ) {

        return (

            <DashboardLayout>

                <div
                    className="aptitude-page"
                >

                    <button
                        className="aptitude-back"
                        onClick={
                            resetTest
                        }
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back to Aptitude

                    </button>


                    <div
                        className="aptitude-section"
                        style={{
                            maxWidth:
                                "900px",

                            margin:
                                "40px auto"
                        }}
                    >

                        <div
                            className="topic-card"
                            style={{
                                textAlign:
                                    "center",

                                cursor:
                                    "default"
                            }}
                        >

                            <div
                                className="topic-icon"
                                style={{
                                    margin:
                                        "0 auto 20px"
                                }}
                            >

                                <Trophy
                                    size={32}
                                />

                            </div>


                            <h2>
                                Test Completed!
                            </h2>


                            <p>

                                {selectedMode ===
                                "company"

                                    ? `${selectedValue} Aptitude`

                                    : `${selectedValue} Practice`
                                }

                            </p>


                            <div
                                style={{
                                    margin:
                                        "30px 0",

                                    fontSize:
                                        "3rem",

                                    fontWeight:
                                        "800",

                                    color:
                                        "#2563eb"
                                }}
                            >

                                {score}%

                            </div>


                            <p>

                                You answered{" "}

                                <strong>
                                    {correctAnswers}
                                </strong>{" "}

                                out of{" "}

                                <strong>
                                    {questions.length}
                                </strong>{" "}

                                questions correctly.

                            </p>


                            {/* =================================
                                ANSWER REVIEW
                            ================================= */}

                            <div
                                style={{
                                    marginTop:
                                        "35px",

                                    textAlign:
                                        "left"
                                }}
                            >

                                <h3
                                    style={{
                                        marginBottom:
                                            "20px"
                                    }}
                                >

                                    Answer Review

                                </h3>


                                {questions.map(
                                    (
                                        question,
                                        index
                                    ) => {

                                        const userAnswer =
                                            answers[
                                                question.id
                                            ];


                                        const isCorrect =
                                            userAnswer &&
                                            userAnswer.toUpperCase() ===
                                            question.correct_answer?.toUpperCase();


                                        const userOptionText =
                                            userAnswer
                                                ? question[
                                                    `option_${userAnswer.toLowerCase()}`
                                                ]
                                                : "";


                                        const correctOptionText =
                                            question[
                                                `option_${question.correct_answer?.toLowerCase()}`
                                            ];


                                        return (

                                            <div
                                                key={
                                                    question.id
                                                }
                                                style={{
                                                    padding:
                                                        "20px 0",

                                                    borderBottom:
                                                        "1px solid var(--border-color)"
                                                }}
                                            >

                                                {/* STATUS */}

                                                <div
                                                    style={{
                                                        display:
                                                            "flex",

                                                        gap:
                                                            "10px",

                                                        alignItems:
                                                            "center"
                                                    }}
                                                >

                                                    {isCorrect ? (

                                                        <CheckCircle2
                                                            size={
                                                                20
                                                            }
                                                            color="#16a34a"
                                                        />

                                                    ) : (

                                                        <XCircle
                                                            size={
                                                                20
                                                            }
                                                            color="#dc2626"
                                                        />

                                                    )}


                                                    <strong>

                                                        Q
                                                        {index + 1}

                                                    </strong>

                                                </div>


                                                {/* QUESTION */}

                                                <p
                                                    style={{
                                                        marginTop:
                                                            "12px",

                                                        lineHeight:
                                                            "1.6",

                                                        fontWeight:
                                                            "600"
                                                    }}
                                                >

                                                    {
                                                        question.question
                                                    }

                                                </p>


                                                {/* YOUR ANSWER */}

                                                <p
                                                    style={{
                                                        fontSize:
                                                            "14px",

                                                        marginTop:
                                                            "10px"
                                                    }}
                                                >

                                                    Your answer:{" "}

                                                    <strong
                                                        style={{
                                                            color:
                                                                isCorrect
                                                                    ? "#16a34a"
                                                                    : "#dc2626"
                                                        }}
                                                    >

                                                        {userAnswer

                                                            ? `${userAnswer}. ${userOptionText || ""}`

                                                            : "Not answered"

                                                        }

                                                    </strong>

                                                </p>


                                                {/* CORRECT ANSWER */}

                                                <p
                                                    style={{
                                                        fontSize:
                                                            "14px",

                                                        marginTop:
                                                            "6px"
                                                    }}
                                                >

                                                    Correct answer:{" "}

                                                    <strong
                                                        style={{
                                                            color:
                                                                "#16a34a"
                                                        }}
                                                    >

                                                        {question.correct_answer}

                                                        {correctOptionText
                                                            ? `. ${correctOptionText}`
                                                            : ""
                                                        }

                                                    </strong>

                                                </p>


                                                {/* EXPLANATION */}

                                                {question.explanation && (

                                                    <div
                                                        style={{
                                                            marginTop:
                                                                "12px",

                                                            padding:
                                                                "14px 16px",

                                                            borderRadius:
                                                                "12px",

                                                            background:
                                                                "var(--bg-primary)",

                                                            border:
                                                                "1px solid var(--border-color)"
                                                        }}
                                                    >

                                                        <strong>
                                                            Explanation:
                                                        </strong>


                                                        <p
                                                            style={{
                                                                marginTop:
                                                                    "6px",

                                                                fontSize:
                                                                    "14px",

                                                                color:
                                                                    "var(--text-secondary)",

                                                                lineHeight:
                                                                    "1.7"
                                                            }}
                                                        >

                                                            {
                                                                question.explanation
                                                            }

                                                        </p>

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    }
                                )}

                            </div>


                            <button
                                className="settings-action-btn"
                                style={{
                                    marginTop:
                                        "30px"
                                }}
                                onClick={
                                    resetTest
                                }
                            >

                                <RotateCcw
                                    size={18}
                                    style={{
                                        marginRight:
                                            "8px",

                                        verticalAlign:
                                            "middle"
                                    }}
                                />

                                Practice Again

                            </button>

                        </div>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // =====================================================
    // ACTIVE TEST
    // =====================================================

    if (
        testStarted &&
        questions.length > 0
    ) {

        const question =
            questions[
                currentQuestion
            ];


        const selectedAnswer =
            answers[
                question.id
            ];


        const isLastQuestion =
            currentQuestion ===
            questions.length - 1;


        const isGeneralTest =
            selectedMode ===
            "category";


        const timerIsLow =
            timeLeft <= 60;


        return (

            <DashboardLayout>

                <div
                    className="aptitude-page"
                >

                    {/* EXIT */}

                    <button
                        className="aptitude-back"
                        onClick={
                            resetTest
                        }
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Exit Practice

                    </button>


                    {/* =====================================
                        TEST HEADER
                    ===================================== */}

                    <div
                        className="aptitude-header"
                        style={{
                            justifyContent:
                                "space-between",

                            alignItems:
                                "center"
                        }}
                    >

                        <div
                            className="aptitude-header-icon"
                        >

                            <Calculator
                                size={38}
                            />

                        </div>


                        <div
                            style={{
                                flex:
                                    1
                            }}
                        >

                            <h1>
                                {selectedValue}
                            </h1>


                            <p>

                                Question{" "}

                                {currentQuestion + 1}

                                {" "}of{" "}

                                {questions.length}

                            </p>

                        </div>


                        {/* =================================
                            GENERAL TIMER
                        ================================= */}

                        {isGeneralTest && (

                            <div
                                style={{
                                    minWidth:
                                        "140px",

                                    padding:
                                        "12px 18px",

                                    borderRadius:
                                        "14px",

                                    background:
                                        timerIsLow
                                            ? "#fef2f2"
                                            : "#eff6ff",

                                    border:
                                        timerIsLow
                                            ? "2px solid #fecaca"
                                            : "2px solid #bfdbfe",

                                    color:
                                        timerIsLow
                                            ? "#dc2626"
                                            : "#2563eb",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    gap:
                                        "8px",

                                    fontSize:
                                        "18px",

                                    fontWeight:
                                        "800",

                                    transition:
                                        "all .2s ease",

                                    flexShrink:
                                        0
                                }}
                            >

                                <Clock3
                                    size={20}
                                />

                                {formatTime(
                                    timeLeft
                                )}

                            </div>

                        )}

                    </div>


                    {/* =====================================
                        PROGRESS
                    ===================================== */}

                    <div
                        style={{
                            height:
                                "8px",

                            background:
                                "var(--border-color)",

                            borderRadius:
                                "999px",

                            marginBottom:
                                "30px",

                            overflow:
                                "hidden"
                        }}
                    >

                        <div
                            style={{
                                width:
                                    `${
                                        (
                                            (
                                                currentQuestion +
                                                1
                                            ) /
                                            questions.length
                                        ) *
                                        100
                                    }%`,

                                height:
                                    "100%",

                                background:
                                    "linear-gradient(135deg, #2563eb, #7c3aed)",

                                transition:
                                    "width .3s ease"
                            }}
                        />

                    </div>


                    {/* =====================================
                        QUESTION
                    ===================================== */}

                    <div
                        className="topic-card"
                        style={{
                            cursor:
                                "default",

                            maxWidth:
                                "900px",

                            margin:
                                "0 auto"
                        }}
                    >

                        {/* CATEGORY + DIFFICULTY */}

                        <span
                            style={{
                                display:
                                    "inline-block",

                                padding:
                                    "6px 12px",

                                borderRadius:
                                    "999px",

                                background:
                                    "#eff6ff",

                                color:
                                    "#2563eb",

                                fontSize:
                                    "13px",

                                fontWeight:
                                    "600",

                                marginBottom:
                                    "20px"
                            }}
                        >

                            {question.category}

                            {" • "}

                            {question.difficulty}

                        </span>


                        {/* QUESTION */}

                        <h2
                            style={{
                                lineHeight:
                                    "1.5",

                                marginBottom:
                                    "30px"
                            }}
                        >

                            {question.question}

                        </h2>


                        {/* OPTIONS */}

                        <div
                            style={{
                                display:
                                    "grid",

                                gap:
                                    "14px"
                            }}
                        >

                            {[
                                [
                                    "A",
                                    question.option_a
                                ],
                                [
                                    "B",
                                    question.option_b
                                ],
                                [
                                    "C",
                                    question.option_c
                                ],
                                [
                                    "D",
                                    question.option_d
                                ]
                            ].map(
                                (
                                    [
                                        letter,
                                        text
                                    ]
                                ) => (

                                    <button
                                        key={
                                            letter
                                        }
                                        onClick={() =>
                                            selectAnswer(
                                                question.id,
                                                letter
                                            )
                                        }
                                        style={{
                                            width:
                                                "100%",

                                            padding:
                                                "18px",

                                            textAlign:
                                                "left",

                                            border:
                                                selectedAnswer ===
                                                letter

                                                    ? "2px solid #2563eb"

                                                    : "1px solid var(--border-color)",

                                            borderRadius:
                                                "14px",

                                            background:
                                                selectedAnswer ===
                                                letter

                                                    ? "#eff6ff"

                                                    : "var(--bg-card)",

                                            color:
                                                "var(--text-primary)",

                                            cursor:
                                                "pointer",

                                            fontSize:
                                                "15px",

                                            transition:
                                                ".2s"
                                        }}
                                    >

                                        <strong>
                                            {letter}.
                                        </strong>

                                        {" "}

                                        {text}

                                    </button>

                                )
                            )}

                        </div>


                        {/* =================================
                            NAVIGATION
                        ================================= */}

                        <div
                            style={{
                                display:
                                    "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",

                                marginTop:
                                    "30px",

                                gap:
                                    "15px"
                            }}
                        >

                            {/* PREVIOUS */}

                            <button
                                className="aptitude-back"
                                onClick={
                                    previousQuestion
                                }
                                disabled={
                                    currentQuestion ===
                                    0
                                }
                                style={{
                                    margin:
                                        0,

                                    opacity:
                                        currentQuestion ===
                                        0

                                            ? 0.5

                                            : 1
                                }}
                            >

                                <ArrowLeft
                                    size={18}
                                />

                                Previous

                            </button>


                            {/* NEXT / SUBMIT */}

                            {!isLastQuestion ? (

                                <button
                                    className="topic-card"
                                    onClick={
                                        nextQuestion
                                    }
                                    style={{
                                        minHeight:
                                            "auto",

                                        padding:
                                            "13px 20px",

                                        flexDirection:
                                            "row",

                                        alignItems:
                                            "center",

                                        gap:
                                            "8px",

                                        background:
                                            "#2563eb",

                                        color:
                                            "white",

                                        border:
                                            "none"
                                    }}
                                >

                                    Next

                                    <ArrowRight
                                        size={18}
                                    />

                                </button>

                            ) : (

                                <button
                                    className="topic-card"
                                    onClick={
                                        submitTest
                                    }
                                    style={{
                                        minHeight:
                                            "auto",

                                        padding:
                                            "13px 20px",

                                        background:
                                            "#16a34a",

                                        color:
                                            "white",

                                        border:
                                            "none"
                                    }}
                                >

                                    Submit Test

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // =====================================================
    // MAIN APTITUDE HUB
    // =====================================================

    return (

        <DashboardLayout>

            <div
                className="aptitude-page"
            >

                {/* =====================================
                    BACK
                ===================================== */}

                <button
                    className="aptitude-back"
                    onClick={() =>
                        navigate(
                            "/preparation"
                        )
                    }
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to Preparation Hub

                </button>


                {/* =====================================
                    HEADER
                ===================================== */}

                <div
                    className="aptitude-header"
                >

                    <div
                        className="aptitude-header-icon"
                    >

                        <Calculator
                            size={38}
                        />

                    </div>


                    <div>

                        <h1>
                            Aptitude Preparation
                        </h1>


                        <p>
                            Prepare for placement aptitude
                            tests with company-specific
                            and general practice.
                        </p>

                    </div>

                </div>


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div
                        style={{
                            padding:
                                "15px 18px",

                            marginBottom:
                                "25px",

                            borderRadius:
                                "12px",

                            background:
                                "#fef2f2",

                            color:
                                "#dc2626",

                            border:
                                "1px solid #fecaca"
                        }}
                    >

                        {error}

                    </div>

                )}


                {/* =====================================
                    PRACTICE SIZE
                ===================================== */}

                <section
                    className="aptitude-section"
                    style={{
                        marginBottom:
                            "35px"
                    }}
                >

                    <div
                        className="aptitude-section-header"
                    >

                        <h2>
                            Practice Size
                        </h2>


                        <p>
                            Choose how many questions
                            you want in each test.
                        </p>

                    </div>


                    <div
                        style={{
                            display:
                                "flex",

                            gap:
                                "12px",

                            flexWrap:
                                "wrap"
                        }}
                    >

                        {[10, 15, 30, 50].map(
                            count => (

                                <button
                                    key={
                                        count
                                    }
                                    onClick={() =>
                                        setQuestionCount(
                                            count
                                        )
                                    }
                                    style={{
                                        padding:
                                            "12px 22px",

                                        borderRadius:
                                            "12px",

                                        border:
                                            questionCount ===
                                            count

                                                ? "2px solid #2563eb"

                                                : "1px solid var(--border-color)",

                                        background:
                                            questionCount ===
                                            count

                                                ? "#eff6ff"

                                                : "var(--bg-card)",

                                        color:
                                            questionCount ===
                                            count

                                                ? "#2563eb"

                                                : "var(--text-primary)",

                                        fontWeight:
                                            "700",

                                        cursor:
                                            "pointer"
                                    }}
                                >

                                    {count} Questions

                                </button>

                            )
                        )}

                    </div>


                    <p
                        style={{
                            marginTop:
                                "12px",

                            fontSize:
                                "13px",

                            color:
                                "var(--text-secondary)"
                        }}
                    >

                        Selected:{" "}

                        <strong>
                            {questionCount}
                        </strong>{" "}

                        questions

                        {" • "}

                        {selectedDifficulty
                            ? selectedDifficulty
                            : "Balanced difficulty"
                        }

                    </p>

                </section>


                {/* =====================================
                    DIFFICULTY
                ===================================== */}

                <section
                    className="aptitude-section"
                    style={{
                        marginBottom:
                            "35px"
                    }}
                >

                    <div
                        className="aptitude-section-header"
                    >

                        <h2>
                            Difficulty
                        </h2>


                        <p>
                            Choose a specific difficulty
                            or keep Balanced for an
                            Easy / Medium / Hard mix.
                        </p>

                    </div>


                    <div
                        style={{
                            display:
                                "flex",

                            gap:
                                "12px",

                            flexWrap:
                                "wrap"
                        }}
                    >

                        {[
                            {
                                value:
                                    "",

                                label:
                                    "Balanced"
                            },
                            {
                                value:
                                    "Easy",

                                label:
                                    "Easy"
                            },
                            {
                                value:
                                    "Medium",

                                label:
                                    "Medium"
                            },
                            {
                                value:
                                    "Hard",

                                label:
                                    "Hard"
                            }
                        ].map(
                            option => (

                                <button
                                    key={
                                        option.value ||
                                        "balanced"
                                    }
                                    onClick={() =>
                                        setSelectedDifficulty(
                                            option.value
                                        )
                                    }
                                    style={{
                                        padding:
                                            "12px 22px",

                                        borderRadius:
                                            "12px",

                                        border:
                                            selectedDifficulty ===
                                            option.value

                                                ? "2px solid #2563eb"

                                                : "1px solid var(--border-color)",

                                        background:
                                            selectedDifficulty ===
                                            option.value

                                                ? "#eff6ff"

                                                : "var(--bg-card)",

                                        color:
                                            selectedDifficulty ===
                                            option.value

                                                ? "#2563eb"

                                                : "var(--text-primary)",

                                        fontWeight:
                                            "700",

                                        cursor:
                                            "pointer"
                                    }}
                                >

                                    {option.label}

                                </button>

                            )
                        )}

                    </div>

                </section>


                {/* =====================================
                    QUICK STATS
                ===================================== */}

                <div
                    className="aptitude-stats"
                >

                    <div
                        className="aptitude-stat"
                    >

                        <Building2
                            size={24}
                        />

                        <div>

                            <strong>
                                {companies.length}
                            </strong>

                            <span>
                                Companies
                            </span>

                        </div>

                    </div>


                    <div
                        className="aptitude-stat"
                    >

                        <Brain
                            size={24}
                        />

                        <div>

                            <strong>
                                {categories.length}
                            </strong>

                            <span>
                                Core Areas
                            </span>

                        </div>

                    </div>


                    <div
                        className="aptitude-stat"
                    >

                        <Clock3
                            size={24}
                        />

                        <div>

                            <strong>
                                General Timed
                            </strong>

                            <span>
                                1 min / question
                            </span>

                        </div>

                    </div>


                    <div
                        className="aptitude-stat"
                    >

                        <Trophy
                            size={24}
                        />

                        <div>

                            <strong>
                                {questionCount}
                            </strong>

                            <span>
                                Questions / Test
                            </span>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    COMPANY PRACTICE
                ===================================== */}

                <section
                    className="aptitude-section"
                >

                    <div
                        className="aptitude-section-header"
                    >

                        <h2>
                            Company-wise Aptitude
                        </h2>


                        <p>
                            Practice questions relevant
                            to specific placement tests.
                            Company tests are untimed.
                        </p>

                    </div>


                    {companies.length === 0 ? (

                        <div
                            className="topic-card"
                            style={{
                                cursor:
                                    "default"
                            }}
                        >

                            <h3>
                                No company-specific
                                questions yet.
                            </h3>


                            <p>
                                Company-wise questions will
                                appear here once they are
                                added to the database.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="company-grid"
                        >

                            {companies.map(
                                company => (

                                    <div
                                        className="company-card"
                                        key={
                                            company
                                        }
                                        onClick={() =>
                                            loadQuestions(
                                                "company",
                                                company,
                                                selectedDifficulty
                                            )
                                        }
                                    >

                                        <div
                                            className="company-icon"
                                        >

                                            <Building2
                                                size={26}
                                            />

                                        </div>


                                        <div
                                            className="company-info"
                                        >

                                            <h3>
                                                {company}
                                            </h3>


                                            <p>
                                                {questionCount}{" "}
                                                questions
                                            </p>

                                        </div>


                                        <span
                                            className="company-arrow"
                                        >

                                            →

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =====================================
                    GENERAL APTITUDE
                ===================================== */}

                <section
                    className="aptitude-section"
                >

                    <div
                        className="aptitude-section-header"
                    >

                        <h2>
                            General Aptitude
                        </h2>


                        <p>
                            Build your fundamentals before
                            attempting company-specific tests.
                            General tests are timed at
                            one minute per question.
                        </p>

                    </div>


                    <div
                        className="topic-grid"
                    >

                        {categories.map(
                            category => (

                                <div
                                    className="topic-card"
                                    key={
                                        category
                                    }
                                    onClick={() =>
                                        loadQuestions(
                                            "category",
                                            category,
                                            selectedDifficulty
                                        )
                                    }
                                >

                                    <div
                                        className="topic-icon"
                                    >

                                        {category ===
                                        "Quantitative" ? (

                                            <Calculator
                                                size={28}
                                            />

                                        ) : category ===
                                          "Logical" ? (

                                            <Brain
                                                size={28}
                                            />

                                        ) : category ===
                                          "Verbal" ? (

                                            <Brain
                                                size={28}
                                            />

                                        ) : (

                                            <Trophy
                                                size={28}
                                            />

                                        )}

                                    </div>


                                    <h3>
                                        {category}
                                    </h3>


                                    <p>

                                        {category ===
                                        "Quantitative"

                                            ? "Percentages, profit & loss, averages, ratios, time & work, speed & distance and more."

                                            : category ===
                                              "Logical"

                                            ? "Series, coding-decoding, arrangements, puzzles and logical patterns."

                                            : category ===
                                              "Verbal"

                                            ? "Grammar, vocabulary, comprehension and sentence correction."

                                            : "Test yourself across multiple aptitude categories in one session."
                                        }

                                    </p>


                                    <button
                                        onClick={
                                            event => {

                                                event.stopPropagation();

                                                loadQuestions(
                                                    "category",
                                                    category,
                                                    selectedDifficulty
                                                );

                                            }
                                        }
                                    >

                                        Practice

                                    </button>

                                </div>

                            )
                        )}

                    </div>

                </section>


                {/* =====================================
                    LOADING OVERLAY
                ===================================== */}

                {questionsLoading && (

                    <div
                        style={{
                            position:
                                "fixed",

                            inset:
                                0,

                            background:
                                "rgba(15, 23, 42, .35)",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            zIndex:
                                9999
                        }}
                    >

                        <div
                            style={{
                                background:
                                    "var(--bg-card)",

                                color:
                                    "var(--text-primary)",

                                padding:
                                    "25px 35px",

                                borderRadius:
                                    "18px",

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                gap:
                                    "12px",

                                boxShadow:
                                    "0 20px 50px rgba(0,0,0,.2)"
                            }}
                        >

                            <Loader2
                                size={24}
                                className="spin"
                            />

                            Loading{" "}

                            {questionCount}{" "}

                            questions...

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};


export default Aptitude;