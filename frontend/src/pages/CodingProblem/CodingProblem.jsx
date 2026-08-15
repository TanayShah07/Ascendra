import "./CodingProblem.css";

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Code2,
    Lightbulb,
    Play,
    Send,
    Terminal,
    ChevronDown,
    Copy,
    Check
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getCodingProblem,
    runCodingProblem,
    submitCodingProblem,
    getCodingSubmissions
} from "../../services/codingService";


// =========================================================
// HELPERS
// =========================================================

const parseJSON = (value, fallback = null) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return fallback;
    }

    if (
        typeof value === "object"
    ) {
        return value;
    }

    try {

        return JSON.parse(value);

    } catch {

        return fallback;

    }
};


const formatJSON = (value) => {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    if (
        typeof value === "string"
    ) {
        return value;
    }

    try {

        return JSON.stringify(
            value,
            null,
            2
        );

    } catch {

        return String(value);

    }
};


const normalizeLanguage = (
    language
) => {

    const value =
        String(
            language || "python"
        ).toLowerCase();

    if (
        value === "c++" ||
        value === "cpp"
    ) {
        return "cpp";
    }

    if (
        value === "java"
    ) {
        return "java";
    }

    return "python";
};


// =========================================================
// FALLBACK BOILERPLATES
//
// These are ONLY fallbacks.
// Backend problem-specific boilerplates
// are preferred whenever available.
// =========================================================

const FALLBACK_TEMPLATES = {

    python: {
        label: "Python",
        code: `# Write your solution here
`
    },

    java: {
        label: "Java",
        code: `import java.util.*;

class Solution {

    // Write your solution here

}
`
    },

    cpp: {
        label: "C++",
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {

public:

    // Write your solution here

};
`
    }

};


// =========================================================
// EXTRACT LANGUAGE-SPECIFIC BOILERPLATE
// =========================================================

const getLanguageValue = (
    source,
    language
) => {

    if (!source) {
        return null;
    }

    const normalized =
        normalizeLanguage(
            language
        );

    const parsed =
        parseJSON(
            source,
            null
        );

    if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
    ) {

        const possibleKeys = {

            python: [
                "python",
                "Python",
                "py"
            ],

            java: [
                "java",
                "Java"
            ],

            cpp: [
                "cpp",
                "C++",
                "c++"
            ]

        };


        for (
            const key
            of possibleKeys[normalized]
        ) {

            if (
                typeof parsed[key] ===
                "string" &&
                parsed[key].trim()
            ) {

                return parsed[key];

            }

        }

    }

    if (
        typeof source === "string" &&
        !parsed
    ) {

        return source;

    }

    return null;
};


// =========================================================
// GET PROBLEM BOILERPLATE
// =========================================================

const getProblemBoilerplate = (
    problem,
    language
) => {

    if (!problem) {

        return FALLBACK_TEMPLATES[
            normalizeLanguage(language)
        ].code;

    }


    const normalized =
        normalizeLanguage(
            language
        );


    // -----------------------------------------------------
    // 1. Explicit language-specific fields
    // -----------------------------------------------------

    const explicitFields = {

        python: [
            "python_starter_code",
            "starter_code_python",
            "python_boilerplate",
            "boilerplate_python"
        ],

        java: [
            "java_starter_code",
            "starter_code_java",
            "java_boilerplate",
            "boilerplate_java"
        ],

        cpp: [
            "cpp_starter_code",
            "cxx_starter_code",
            "starter_code_cpp",
            "cpp_boilerplate",
            "boilerplate_cpp"
        ]

    };


    for (
        const field
        of explicitFields[normalized]
    ) {

        const value =
            problem[field];

        if (
            typeof value ===
            "string" &&
            value.trim()
        ) {

            return value;

        }

    }


    // -----------------------------------------------------
    // 2. boilerplates object
    // -----------------------------------------------------

    const boilerplateSources = [

        problem.boilerplates,

        problem.starter_codes,

        problem.language_templates,

        problem.templates

    ];


    for (
        const source
        of boilerplateSources
    ) {

        const value =
            getLanguageValue(
                source,
                normalized
            );

        if (
            value &&
            value.trim()
        ) {

            return value;

        }

    }


    // -----------------------------------------------------
    // 3. starter_code
    //
    // starter_code may itself be a JSON object:
    //
    // {
    //   "python": "...",
    //   "java": "...",
    //   "cpp": "..."
    // }
    // -----------------------------------------------------

    if (
        problem.starter_code
    ) {

        const value =
            getLanguageValue(
                problem.starter_code,
                normalized
            );

        if (
            value &&
            value.trim()
        ) {

            /*
             * If starter_code is a language
             * object, this is exactly what
             * we want.
             */
            const parsed =
                parseJSON(
                    problem.starter_code,
                    null
                );

            if (
                parsed &&
                typeof parsed ===
                "object"
            ) {

                return value;

            }


            /*
             * A plain starter_code string is
             * considered valid only for Python
             * unless it clearly matches the
             * selected language.
             */
            if (
                normalized === "python"
            ) {

                return value;

            }

            if (
                normalized === "java" &&
                (
                    value.includes(
                        "class Solution"
                    ) ||
                    value.includes(
                        "import java"
                    )
                )
            ) {

                return value;

            }

            if (
                normalized === "cpp" &&
                (
                    value.includes(
                        "class Solution"
                    ) ||
                    value.includes(
                        "#include"
                    )
                )
            ) {

                return value;

            }

        }

    }


    // -----------------------------------------------------
    // 4. Fallback
    // -----------------------------------------------------

    return FALLBACK_TEMPLATES[
        normalized
    ].code;
};


// =========================================================
// GET SOLUTION
// =========================================================

const getLanguageSolution = (
    problem,
    language
) => {

    if (!problem) {
        return "";
    }


    const normalized =
        normalizeLanguage(
            language
        );


    const solutions = [

        problem.solutions,

        problem.solution,

        problem.reference_solutions

    ];


    for (
        const source
        of solutions
    ) {

        if (!source) {
            continue;
        }


        const parsed =
            parseJSON(
                source,
                null
            );


        if (
            parsed &&
            typeof parsed ===
            "object" &&
            !Array.isArray(parsed)
        ) {

            const keys = {

                python: [
                    "python",
                    "Python",
                    "py"
                ],

                java: [
                    "java",
                    "Java"
                ],

                cpp: [
                    "cpp",
                    "C++",
                    "c++"
                ]

            };


            for (
                const key
                of keys[normalized]
            ) {

                if (
                    typeof parsed[key] ===
                    "string" &&
                    parsed[key].trim()
                ) {

                    return parsed[key];

                }

            }

        }

    }


    return "";
};


// =========================================================
// COMPONENT
// =========================================================

const CodingProblem = () => {

    const {
        problemId
    } = useParams();

    const navigate =
        useNavigate();


    // =====================================================
    // AUTH
    // =====================================================

    const token =
        localStorage.getItem("token") ||
        localStorage.getItem("access_token");


    // =====================================================
    // STATE
    // =====================================================

    const [problem, setProblem] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const [language, setLanguage] =
        useState("python");


    const [code, setCode] =
        useState("");


    const [activeTab, setActiveTab] =
        useState("description");


    const [isRunning, setIsRunning] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);


    const [executionResult, setExecutionResult] =
        useState(null);


    const [submissions, setSubmissions] =
        useState([]);


    const [copiedSolution, setCopiedSolution] =
        useState(false);


    // =====================================================
    // LOAD PROBLEM
    // =====================================================

    useEffect(() => {

        const loadProblem = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getCodingProblem(
                        token,
                        problemId
                    );

                const loadedProblem =
                    response.data;

                setProblem(
                    loadedProblem
                );


                /*
                 * IMPORTANT:
                 *
                 * Do NOT use a hardcoded
                 * Two Sum template.
                 *
                 * Get the boilerplate from
                 * the actual problem.
                 */

                const initialCode =
                    getProblemBoilerplate(
                        loadedProblem,
                        "python"
                    );

                setCode(
                    initialCode
                );


            } catch (err) {

                console.error(err);

                setError(
                    err?.response?.data?.detail ||
                    "Unable to load coding problem."
                );

            } finally {

                setLoading(false);

            }

        };


        if (
            token &&
            problemId
        ) {

            loadProblem();

        }

    }, [
        token,
        problemId
    ]);


    // =====================================================
    // LOAD SUBMISSIONS
    // =====================================================

    useEffect(() => {

        const loadSubmissions =
            async () => {

                if (
                    !token ||
                    !problemId
                ) {
                    return;
                }


                try {

                    const response =
                        await getCodingSubmissions(
                            token,
                            problemId
                        );

                    setSubmissions(
                        response.data?.submissions ||
                        []
                    );

                } catch (err) {

                    console.error(
                        "Unable to load submissions",
                        err
                    );

                }

            };


        loadSubmissions();

    }, [
        token,
        problemId
    ]);


    // =====================================================
    // LANGUAGE CHANGE
    // =====================================================

    const handleLanguageChange = (
        event
    ) => {

        const selected =
            normalizeLanguage(
                event.target.value
            );


        setLanguage(
            selected
        );


        /*
         * Load THIS PROBLEM'S
         * boilerplate.
         */

        const nextCode =
            getProblemBoilerplate(
                problem,
                selected
            );


        setCode(
            nextCode
        );


        setExecutionResult(
            null
        );

    };


    // =====================================================
    // RUN
    // =====================================================

    const handleRun = async () => {

        if (
            !code.trim()
        ) {

            setExecutionResult({

                success: false,

                status: "Empty Code",

                message:
                    "Please write some code before running.",

                results: []

            });

            return;

        }


        try {

            setIsRunning(true);

            setExecutionResult(
                null
            );


            const response =
                await runCodingProblem(
                    token,
                    problemId,
                    code,
                    language
                );


            setExecutionResult(
                response.data
            );


        } catch (err) {

            console.error(err);

            setExecutionResult({

                success: false,

                status:
                    err?.response?.data?.detail ||
                    "Execution Error",

                message:
                    err?.response?.data?.detail ||
                    "Unable to execute code.",

                results: []

            });

        } finally {

            setIsRunning(false);

        }

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async () => {

        if (
            !code.trim()
        ) {

            setExecutionResult({

                success: false,

                status: "Empty Code",

                message:
                    "Please write some code before submitting.",

                results: []

            });

            return;

        }


        try {

            setIsSubmitting(true);

            setExecutionResult(
                null
            );


            const response =
                await submitCodingProblem(
                    token,
                    problemId,
                    code,
                    language
                );


            setExecutionResult(
                response.data
            );


            /*
             * Refresh submission history
             */

            const submissionsResponse =
                await getCodingSubmissions(
                    token,
                    problemId
                );


            setSubmissions(
                submissionsResponse.data?.submissions ||
                []
            );


        } catch (err) {

            console.error(err);

            setExecutionResult({

                success: false,

                status:
                    err?.response?.data?.detail ||
                    "Submission Error",

                message:
                    err?.response?.data?.detail ||
                    "Unable to submit code.",

                results: []

            });

        } finally {

            setIsSubmitting(false);

        }

    };


    // =====================================================
    // USE SOLUTION
    // =====================================================

    const handleUseSolution = async (
        solution
    ) => {

        if (
            !solution ||
            !solution.trim()
        ) {
            return;
        }


        /*
         * Put the reference solution
         * directly into the editor.
         */

        setCode(
            solution
        );


        setExecutionResult(
            null
        );


        /*
         * Move user to editor.
         */

        setActiveTab(
            "description"
        );


        /*
         * Scroll to top of the page.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =====================================================
    // COPY SOLUTION
    // =====================================================

    const handleCopySolution = async (
        solution
    ) => {

        if (
            !solution ||
            !solution.trim()
        ) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                solution
            );


            setCopiedSolution(
                true
            );


            setTimeout(() => {

                setCopiedSolution(
                    false
                );

            }, 1500);


        } catch (err) {

            console.error(
                "Unable to copy solution",
                err
            );

        }

    };


    // =====================================================
    // PROBLEM DETAILS
    // =====================================================

    const examples = useMemo(
        () => {

            return parseJSON(
                problem?.examples,
                []
            );

        },
        [problem]
    );


    const constraints = useMemo(
        () => {

            return parseJSON(
                problem?.constraints,
                []
            );

        },
        [problem]
    );


    const hints = useMemo(
        () => {

            return parseJSON(
                problem?.hints,
                []
            );

        },
        [problem]
    );


    const visibleTests = useMemo(
        () => {

            const data =
                parseJSON(
                    problem?.test_cases,
                    []
                );


            if (
                Array.isArray(data)
            ) {

                return data.slice(
                    0,
                    2
                );

            }


            if (
                data &&
                Array.isArray(
                    data.visible
                )
            ) {

                return data.visible;

            }


            return [];

        },
        [problem]
    );


    // =====================================================
    // CURRENT SOLUTIONS
    // =====================================================

    const pythonSolution =
        getLanguageSolution(
            problem,
            "python"
        );


    const javaSolution =
        getLanguageSolution(
            problem,
            "java"
        );


    const cppSolution =
        getLanguageSolution(
            problem,
            "cpp"
        );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="coding-problem-loading">

                Loading problem...

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (
        error ||
        !problem
    ) {

        return (

            <div className="coding-problem-error">

                <h2>
                    Unable to load problem
                </h2>

                <p>
                    {error || "Problem not found."}
                </p>

                <button
                    onClick={() =>
                        navigate("/coding")
                    }
                >
                    Back to Coding
                </button>

            </div>

        );

    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="coding-problem-page">


            {/* =================================================
                TOP BAR
            ================================================= */}

            <header className="problem-topbar">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/coding")
                    }
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to Coding

                </button>


                <div className="problem-top-meta">

                    <span
                        className={
                            `problem-difficulty ${
                                problem.difficulty
                                    ?.toLowerCase()
                            }`
                        }
                    >
                        {problem.difficulty}
                    </span>


                    <span>
                        {problem.topic}
                    </span>


                    <span>
                        ⭐ {problem.xp || 25} XP
                    </span>


                    <span>
                        ⏱ {problem.time_limit || 30} min
                    </span>

                </div>

            </header>


            {/* =================================================
                MAIN WORKSPACE
            ================================================= */}

            <main className="coding-workspace">


                {/* =================================================
                    LEFT PANEL
                ================================================= */}

                <section className="problem-panel">


                    <div className="problem-heading">

                        <div>

                            <h1>
                                {problem.title}
                            </h1>

                            <p>
                                {
                                    problem.company ||
                                    "General Practice"
                                }
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        TABS
                    ================================================= */}

                    <div className="problem-tabs">

                        <button
                            className={
                                activeTab ===
                                "description"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab(
                                    "description"
                                )
                            }
                        >
                            Description
                        </button>


                        <button
                            className={
                                activeTab ===
                                "solution"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab(
                                    "solution"
                                )
                            }
                        >
                            Solution
                        </button>


                        <button
                            className={
                                activeTab ===
                                "submission"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab(
                                    "submission"
                                )
                            }
                        >
                            Submission
                        </button>

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    {activeTab ===
                        "description" && (

                        <div className="problem-content">


                            <section>

                                <h2>
                                    Problem
                                </h2>

                                <p className="problem-description">
                                    {
                                        problem.description
                                    }
                                </p>

                            </section>


                            {/* EXAMPLES */}

                            {
                                examples?.length > 0 && (

                                    <section>

                                        <h2>
                                            Examples
                                        </h2>


                                        <div className="examples-list">

                                            {
                                                examples.map(
                                                    (
                                                        example,
                                                        index
                                                    ) => (

                                                        <div
                                                            className="example-card"
                                                            key={index}
                                                        >

                                                            <h3>
                                                                Example {
                                                                    index + 1
                                                                }
                                                            </h3>


                                                            <div>

                                                                <strong>
                                                                    Input
                                                                </strong>

                                                                <pre>
                                                                    {
                                                                        formatJSON(
                                                                            example.input
                                                                        )
                                                                    }
                                                                </pre>

                                                            </div>


                                                            <div>

                                                                <strong>
                                                                    Output
                                                                </strong>

                                                                <pre>
                                                                    {
                                                                        formatJSON(
                                                                            example.output
                                                                        )
                                                                    }
                                                                </pre>

                                                            </div>


                                                            {
                                                                example.explanation && (

                                                                    <div>

                                                                        <strong>
                                                                            Explanation
                                                                        </strong>

                                                                        <p>
                                                                            {
                                                                                example.explanation
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                )
                                                            }

                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>

                                    </section>

                                )
                            }


                            {/* CONSTRAINTS */}

                            {
                                constraints?.length > 0 && (

                                    <section>

                                        <h2>
                                            Constraints
                                        </h2>

                                        <ul className="constraint-list">

                                            {
                                                constraints.map(
                                                    (
                                                        constraint,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                        >
                                                            {
                                                                constraint
                                                            }
                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>

                                    </section>

                                )
                            }


                            {/* HINTS */}

                            {
                                hints?.length > 0 && (

                                    <section>

                                        <div className="hint-heading">

                                            <Lightbulb
                                                size={20}
                                            />

                                            <h2>
                                                Hints
                                            </h2>

                                        </div>


                                        <div className="hints-list">

                                            {
                                                hints.map(
                                                    (
                                                        hint,
                                                        index
                                                    ) => (

                                                        <details
                                                            key={index}
                                                            className="hint-card"
                                                        >

                                                            <summary>
                                                                Hint {
                                                                    index + 1
                                                                }
                                                            </summary>

                                                            <p>
                                                                {
                                                                    hint
                                                                }
                                                            </p>

                                                        </details>

                                                    )
                                                )
                                            }

                                        </div>

                                    </section>

                                )
                            }


                            {/* TEST CASES */}

                            {
                                visibleTests.length > 0 && (

                                    <section>

                                        <h2>
                                            Sample Test Cases
                                        </h2>


                                        <div className="sample-tests">

                                            {
                                                visibleTests.map(
                                                    (
                                                        test,
                                                        index
                                                    ) => (

                                                        <div
                                                            className="sample-test"
                                                            key={index}
                                                        >

                                                            <span>
                                                                Test {
                                                                    index + 1
                                                                }
                                                            </span>


                                                            <div>

                                                                <strong>
                                                                    Input
                                                                </strong>

                                                                <code>
                                                                    {
                                                                        test.input
                                                                    }
                                                                </code>

                                                            </div>


                                                            <div>

                                                                <strong>
                                                                    Expected Output
                                                                </strong>

                                                                <code>
                                                                    {
                                                                        test.output
                                                                }
                                                                </code>

                                                            </div>

                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>

                                    </section>

                                )
                            }

                        </div>

                    )}


                    {/* =================================================
                        SOLUTION
                    ================================================= */}

                    {
                        activeTab ===
                        "solution" && (

                            <div className="solution-content">

                                <div className="solution-warning">

                                    <Code2
                                        size={20}
                                    />

                                    <span>
                                        Reference solutions are provided
                                        for learning and comparison.
                                    </span>

                                </div>


                                <SolutionSection
                                    title="Python"
                                    language="python"
                                    solution={
                                        pythonSolution
                                    }
                                    onUseSolution={
                                        handleUseSolution
                                    }
                                    onCopySolution={
                                        handleCopySolution
                                    }
                                    copied={
                                        copiedSolution
                                    }
                                />


                                <SolutionSection
                                    title="Java"
                                    language="java"
                                    solution={
                                        javaSolution
                                    }
                                    onUseSolution={
                                        handleUseSolution
                                    }
                                    onCopySolution={
                                        handleCopySolution
                                    }
                                    copied={
                                        copiedSolution
                                    }
                                />


                                <SolutionSection
                                    title="C++"
                                    language="cpp"
                                    solution={
                                        cppSolution
                                    }
                                    onUseSolution={
                                        handleUseSolution
                                    }
                                    onCopySolution={
                                        handleCopySolution
                                    }
                                    copied={
                                        copiedSolution
                                    }
                                />

                            </div>

                        )
                    }


                    {/* =================================================
                        SUBMISSIONS
                    ================================================= */}

                    {
                        activeTab ===
                        "submission" && (

                            <div className="submission-content">

                                <h2>
                                    Your Submissions
                                </h2>


                                {
                                    submissions.length === 0 ? (

                                        <div className="no-submissions">

                                            <Terminal
                                                size={28}
                                            />

                                            <p>
                                                No submissions yet.
                                            </p>

                                        </div>

                                    ) : (

                                        <div className="submission-list">

                                            {
                                                submissions.map(
                                                    (
                                                        submission
                                                    ) => (

                                                        <div
                                                            className="submission-card"
                                                            key={
                                                                submission.id
                                                            }
                                                        >

                                                            <div>

                                                                {
                                                                    submission.status ===
                                                                    "Accepted" ? (

                                                                        <CheckCircle2
                                                                            className="accepted-icon"
                                                                        />

                                                                    ) : (

                                                                        <XCircle
                                                                            className="failed-icon"
                                                                        />

                                                                    )
                                                                }

                                                            </div>


                                                            <div className="submission-main">

                                                                <strong>
                                                                    {
                                                                        submission.status
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {
                                                                        submission.language
                                                                    }
                                                                </span>

                                                                <span>
                                                                    {
                                                                        submission.passed_tests
                                                                    }
                                                                    /
                                                                    {
                                                                        submission.total_tests
                                                                    }
                                                                    {" "}
                                                                    tests
                                                                </span>

                                                            </div>


                                                            <div className="submission-xp">

                                                                +{
                                                                    submission.xp_earned ||
                                                                    0
                                                                } XP

                                                            </div>

                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>

                                    )
                                }

                            </div>

                        )
                    }

                </section>


                {/* =================================================
                    RIGHT EDITOR
                ================================================= */}

                <section className="editor-panel">


                    {/* EDITOR HEADER */}

                    <div className="editor-header">

                        <div className="language-selector">

                            <Code2
                                size={17}
                            />

                            <select
                                value={
                                    language
                                }
                                onChange={
                                    handleLanguageChange
                                }
                            >

                                <option value="python">
                                    Python
                                </option>

                                <option value="java">
                                    Java
                                </option>

                                <option value="cpp">
                                    C++
                                </option>

                            </select>

                            <ChevronDown
                                size={15}
                            />

                        </div>


                        <span className="editor-label">
                            Code Editor
                        </span>

                    </div>


                    {/* =================================================
                        CODE EDITOR
                    ================================================= */}

                    <div className="code-editor">

                        <div className="line-numbers">

                            {
                                code
                                    .split("\n")
                                    .map(
                                        (
                                            _,
                                            index
                                        ) => (

                                            <span
                                                key={
                                                    index
                                                }
                                            >
                                                {
                                                    index + 1
                                                }
                                            </span>

                                        )
                                    )
                            }

                        </div>


                        <textarea
                            value={
                                code
                            }
                            onChange={
                                (event) =>
                                    setCode(
                                        event.target.value
                                    )
                            }
                            spellCheck={false}
                            className="code-textarea"
                            wrap="off"
                            aria-label="Coding editor"
                        />

                    </div>


                    {/* =================================================
                        ACTION BAR
                    ================================================= */}

                    <div className="editor-actions">

                        <button
                            type="button"
                            className="run-button"
                            onClick={
                                handleRun
                            }
                            disabled={
                                isRunning ||
                                isSubmitting
                            }
                        >

                            <Play
                                size={17}
                            />

                            {
                                isRunning
                                    ? "Running..."
                                    : "Run Code"
                            }

                        </button>


                        <button
                            type="button"
                            className="submit-button"
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                isRunning ||
                                isSubmitting
                            }
                        >

                            <Send
                                size={17}
                            />

                            {
                                isSubmitting
                                    ? "Submitting..."
                                    : "Submit"
                            }

                        </button>

                    </div>


                    {/* =================================================
                        TEST RESULT PANEL
                    ================================================= */}

                    <div className="test-result-panel">

                        <div className="test-result-header">

                            <h3>
                                Test Results
                            </h3>


                            {
                                executionResult && (

                                    <span
                                        className={
                                            executionResult.success
                                                ? "result-status accepted"
                                                : "result-status failed"
                                        }
                                    >

                                        {
                                            executionResult.success
                                                ? "Accepted"
                                                : executionResult.status
                                        }

                                    </span>

                                )
                            }

                        </div>


                        {
                            !executionResult && (

                                <div className="empty-result">

                                    <Terminal
                                        size={24}
                                    />

                                    <p>
                                        Run your code to see the results.
                                    </p>

                                </div>

                            )
                        }


                        {
                            executionResult && (

                                <>

                                    <div className="result-summary">

                                        <div>

                                            <strong>
                                                {
                                                    executionResult.passed_tests ||
                                                    0
                                                }
                                            </strong>

                                            <span>
                                                Passed
                                            </span>

                                        </div>


                                        <div>

                                            <strong>
                                                {
                                                    executionResult.total_tests ||
                                                    0
                                                }
                                            </strong>

                                            <span>
                                                Total
                                            </span>

                                        </div>


                                        {
                                            executionResult.xp_earned !==
                                            undefined && (

                                                <div>

                                                    <strong>
                                                        +{
                                                            executionResult.xp_earned
                                                        }
                                                    </strong>

                                                    <span>
                                                        XP
                                                    </span>

                                                </div>

                                            )
                                        }

                                    </div>


                                    {
                                        executionResult.message && (

                                            <div className="execution-message">

                                                {
                                                    executionResult.message
                                                }

                                            </div>

                                        )
                                    }


                                    {
                                        executionResult.results?.length > 0 && (

                                            <div className="execution-tests">

                                                {
                                                    executionResult.results.map(
                                                        (
                                                            test,
                                                            index
                                                        ) => (

                                                            <div
                                                                className={
                                                                    `execution-test ${
                                                                        test.passed
                                                                            ? "passed"
                                                                            : "failed"
                                                                    }`
                                                                }
                                                                key={
                                                                    index
                                                                }
                                                            >

                                                                <div>

                                                                    {
                                                                        test.passed ? (

                                                                            <CheckCircle2
                                                                                size={18}
                                                                            />

                                                                        ) : (

                                                                            <XCircle
                                                                                size={18}
                                                                            />

                                                                        )
                                                                    }

                                                                    <strong>
                                                                        Test Case {
                                                                            index + 1
                                                                        }
                                                                    </strong>

                                                                </div>


                                                                <span>
                                                                    {
                                                                        test.status
                                                                    }
                                                                </span>


                                                                {
                                                                    test.execution_time !==
                                                                    undefined && (

                                                                        <span>
                                                                            {
                                                                                test.execution_time
                                                                            } ms
                                                                        </span>

                                                                    )
                                                                }

                                                            </div>

                                                        )
                                                    )
                                                }

                                            </div>

                                        )
                                    }

                                </>

                            )
                        }

                    </div>

                </section>

            </main>

        </div>

    );

};


// =========================================================
// SOLUTION SECTION
// =========================================================

const SolutionSection = ({
    title,
    solution,
    onUseSolution,
    onCopySolution,
    copied
}) => {

    return (

        <div className="solution-section">

            <div className="solution-toolbar">

                <div className="solution-title">

                    <Code2
                        size={18}
                    />

                    <h3>
                        {title}
                    </h3>

                </div>


                {
                    solution && (

                        <div className="solution-actions">

                            <button
                                type="button"
                                className="solution-copy-button"
                                onClick={() =>
                                    onCopySolution(
                                        solution
                                    )
                                }
                            >

                                {
                                    copied ? (
                                        <Check
                                            size={15}
                                        />
                                    ) : (
                                        <Copy
                                            size={15}
                                        />
                                    )
                                }

                                {
                                    copied
                                        ? "Copied"
                                        : "Copy"
                                }

                            </button>


                            <button
                                type="button"
                                className="solution-editor-button"
                                onClick={() => {

                                    onUseSolution(
                                        solution
                                    );

                                }}
                            >

                                <Code2
                                    size={15}
                                />

                                Use in Editor

                            </button>

                        </div>

                    )
                }

            </div>


            <pre className="solution-code">

                {
                    solution ||
                    `No ${title} solution available yet.`
                }

            </pre>

        </div>

    );

};


export default CodingProblem;