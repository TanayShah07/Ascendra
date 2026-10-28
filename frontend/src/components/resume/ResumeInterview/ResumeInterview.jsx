import "./ResumeInterview.css";

import {
    Brain,
    Play,
    MessageSquare,
    Sparkles,
    ArrowRight,
    FileQuestion
} from "lucide-react";

import { useLanguage } from "../../../context/LanguageContext";


const ResumeInterview = ({
    questions = []
}) => {

    const { t } = useLanguage();


    return (

        <div className="resume-interview">

            {/* ============================================
                HEADER
            ============================================ */}

            <div className="resume-interview-header">

                <Brain size={30}/>

                <div>

                    <h2>
                        {t("resume.resumeInterview")}
                    </h2>

                    <p>
                        AI-generated interview questions
                        based on your actual resume and
                        selected career target.
                    </p>

                </div>

            </div>


            {/* ============================================
                QUESTIONS
            ============================================ */}

            <div className="question-preview">

                {questions.length > 0 ? (

                    questions.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="question-card"
                            >

                                <MessageSquare
                                    size={20}
                                />

                                <div>

                                    <span>
                                        {item.question}
                                    </span>

                                    <div
                                        className="question-meta"
                                    >

                                        <small>
                                            {item.type}
                                        </small>

                                        <small>
                                            {item.difficulty}
                                        </small>

                                    </div>

                                </div>

                            </div>

                        )
                    )

                ) : (

                    <div className="question-card">

                        <MessageSquare
                            size={20}
                        />

                        <span>
                            No resume-based interview
                            questions generated yet.
                        </span>

                    </div>

                )}

            </div>


            {/* ============================================
                FEATURES
            ============================================ */}

            <div className="resume-interview-info">

                <div className="feature">

                    <Sparkles size={24}/>

                    <div>

                        <h3>
                            AI Generated Questions
                        </h3>

                        <p>
                            Questions are generated from
                            your actual resume, skills,
                            projects and target role.
                        </p>

                    </div>

                </div>


                <div className="feature">

                    <FileQuestion size={24}/>

                    <div>

                        <h3>
                            Resume-Based Follow-Ups
                        </h3>

                        <p>
                            Questions include technical
                            project deep-dives, role fit,
                            company fit and experience-level
                            challenges.
                        </p>

                    </div>

                </div>

            </div>


            {/* ============================================
                START BUTTON
            ============================================ */}

            <button
                className="resume-interview-btn"
                disabled={questions.length === 0}
            >

                <Play size={20}/>

                Start Resume Interview

                <ArrowRight size={18}/>

            </button>

        </div>

    );

};


export default ResumeInterview;