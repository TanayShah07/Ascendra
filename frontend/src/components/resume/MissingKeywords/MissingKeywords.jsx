import "./MissingKeywords.css";

import {
    AlertTriangle,
    CheckCircle2,
    KeyRound
} from "lucide-react";

import { useLanguage } from "../../../context/LanguageContext";

const MissingKeywords = ({ targetAnalysis }) => {

    const { t } = useLanguage();

    if (!targetAnalysis) {
        return null;
    }

    /*
    =========================================================
    FORMAT SKILL NAMES
    =========================================================
    */

    const formatSkill = (skill) => {

        if (!skill) {
            return "";
        }

        const specialCases = {

            "java": "Java",
            "python": "Python",
            "c": "C",
            "c++": "C++",
            "c#": "C#",

            "sql": "SQL",
            "oop": "OOP",
            "dsa": "DSA",

            "git": "Git",
            "github": "GitHub",

            "rest api": "REST API",
            "rest": "REST",

            "node.js": "Node.js",
            "express.js": "Express.js",
            "mongodb": "MongoDB",
            "postgresql": "PostgreSQL",
            "mysql": "MySQL",

            "html": "HTML",
            "css": "CSS",
            "javascript": "JavaScript",
            "typescript": "TypeScript",

            "react": "React",
            "tailwind": "Tailwind CSS",
            "bootstrap": "Bootstrap",

            "aws": "AWS",
            "azure": "Azure",
            "gcp": "GCP",

            "nlp": "NLP",
            "llm": "LLM",
            "ai": "AI",
            "api": "API",

            "cuda": "CUDA",
            "tensorflow": "TensorFlow",
            "pytorch": "PyTorch",
            "scikit-learn": "Scikit-learn",

            "numpy": "NumPy",
            "pandas": "Pandas",
            "matplotlib": "Matplotlib",

            "mediapipe": "MediaPipe",
            "gemini": "Gemini",

            "data structures": "Data Structures",
            "algorithms": "Algorithms",
            "problem solving": "Problem Solving",
            "system design": "System Design",
            "machine learning": "Machine Learning",
            "deep learning": "Deep Learning"
        };

        const normalized =
            String(skill)
                .trim()
                .toLowerCase();

        if (specialCases[normalized]) {
            return specialCases[normalized];
        }

        return String(skill)
            .trim()
            .split(" ")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");

    };


    /*
    =========================================================
    GET DATA FROM TARGET ANALYSIS
    =========================================================
    */

    const matched =
        targetAnalysis.matched_skills || [];

    const missing =
        targetAnalysis.missing_skills || [];

    const matchPercentage =
        targetAnalysis.skill_match_percentage ?? 0;


    return (

        <div className="keywords-container">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="keywords-header">

                <div>

                    <div className="keywords-title">

                        <KeyRound size={24} />

                        <h2>
                            {t(
                                "resume.missingKeywords"
                            )}
                        </h2>

                    </div>

                    <p>
                        {t(
                            "resume.keywordAnalysisDescription"
                        )}
                    </p>

                </div>


                {/* =================================================
                    MATCH PERCENTAGE
                ================================================= */}

                <div className="keyword-match">

                    {matchPercentage}%

                    <span>
                        {t(
                            "resume.keywordMatch"
                        )}
                    </span>

                </div>

            </div>


            {/* =================================================
                KEYWORD SECTIONS
            ================================================= */}

            <div className="keyword-sections">


                {/* =================================================
                    MATCHED SKILLS
                ================================================= */}

                <div className="keyword-box matched">

                    <div className="keyword-box-header">

                        <CheckCircle2 size={20} />

                        <h3>
                            {t(
                                "resume.matchedKeywords"
                            )}
                        </h3>

                    </div>


                    <div className="keyword-list">

                        {matched.length > 0 ? (

                            matched.map(
                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="keyword-pill"
                                    >
                                        {formatSkill(skill)}
                                    </span>

                                )
                            )

                        ) : (

                            <p>
                                {t(
                                    "resume.noMatchedKeywords"
                                )}
                            </p>

                        )}

                    </div>

                </div>


                {/* =================================================
                    MISSING SKILLS
                ================================================= */}

                <div className="keyword-box missing">

                    <div className="keyword-box-header">

                        <AlertTriangle size={20} />

                        <h3>
                            {t(
                                "resume.missingKeywords"
                            )}
                        </h3>

                    </div>


                    <div className="keyword-list">

                        {missing.length > 0 ? (

                            missing.map(
                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="keyword-pill"
                                    >
                                        {formatSkill(skill)}
                                    </span>

                                )
                            )

                        ) : (

                            <p>
                                {t(
                                    "resume.noMissingKeywords"
                                )}
                            </p>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default MissingKeywords;