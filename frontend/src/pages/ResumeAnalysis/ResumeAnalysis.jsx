import "./ResumeAnalysis.css";

import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import ResumeUpload from "../../components/resume/ResumeUpload/ResumeUpload";
import ATSScore from "../../components/resume/ATSScore/ATSScore";
import ResumeInsights from "../../components/resume/ResumeInsights/ResumeInsights";
import ResumeSuggestions from "../../components/resume/ResumeSuggestions/ResumeSuggestions";
import ResumeInterview from "../../components/resume/ResumeInterview/ResumeInterview";
import MissingKeywords from "../../components/resume/MissingKeywords/MissingKeywords";

import { useLanguage } from "../../context/LanguageContext";


const ResumeAnalysis = () => {

    const [analyzed, setAnalyzed] = useState(false);

    const [loading, setLoading] = useState(false);

    const [parsedResume, setParsedResume] = useState(null);

    const [targetAnalysis, setTargetAnalysis] = useState(null);

    const [atsAnalysis, setAtsAnalysis] = useState(null);

    const [resumeInsights, setResumeInsights] = useState(null);

    const [interviewQuestions, setInterviewQuestions] = useState([]);

    const { t } = useLanguage();


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
            "c++": "C++",
            "c#": "C#",
            "sql": "SQL",
            "oop": "OOP",
            "git": "Git",
            "github": "GitHub",

            "rest api": "REST API",

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
            "dsa": "DSA",

            "cuda": "CUDA",
            "tensorflow": "TensorFlow",
            "pytorch": "PyTorch",
            "scikit-learn": "Scikit-learn",

            "numpy": "NumPy",
            "pandas": "Pandas",
            "matplotlib": "Matplotlib",

            "mediapipe": "MediaPipe",
            "gemini": "Gemini"

        };


        const normalized =
            skill.trim().toLowerCase();


        if (specialCases[normalized]) {

            return specialCases[normalized];

        }


        return skill
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
    FORMAT SKILL LIST
    =========================================================
    */

    const formatSkillList = (skills = []) => {

        return skills.map(formatSkill);

    };


    /*
    =========================================================
    HANDLE RESUME ANALYSIS
    =========================================================
    */

    const handleAnalyze = async ({
        file,
        targetCompany,
        targetRole,
        experienceLevel
    }) => {

        if (!file) {

            toast.error(
                "Please select a resume first."
            );

            return;

        }


        setLoading(true);

        setAnalyzed(false);

        setParsedResume(null);

        setTargetAnalysis(null);

        setAtsAnalysis(null);

        setResumeInsights(null);

        setInterviewQuestions([]);


        try {

            /*
            =================================================
            FORM DATA
            =================================================
            */

            const formData = new FormData();


            formData.append(
                "file",
                file
            );


            formData.append(
                "target_company",
                targetCompany
            );


            formData.append(
                "target_role",
                targetRole
            );


            formData.append(
                "experience_level",
                experienceLevel
            );


            /*
            =================================================
            API REQUEST
            =================================================
            */

            const response = await fetch(
                "http://localhost:8000/resume/parse",
                {
                    method: "POST",
                    body: formData
                }
            );


            const data =
                await response.json();


            /*
            =================================================
            ERROR HANDLING
            =================================================
            */

            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Resume analysis failed."
                );

            }


            console.log(
                "Resume Analysis:",
                data
            );


            /*
            =================================================
            STEP 1
            PARSED RESUME
            =================================================
            */

            setParsedResume(
                data.data?.parsed_resume || null
            );


            /*
            =================================================
            STEP 2
            TARGET ANALYSIS
            =================================================
            */

            setTargetAnalysis(
                data.data?.target_analysis || null
            );


            /*
            =================================================
            STEP 3
            ATS ANALYSIS
            =================================================
            */

            setAtsAnalysis(
                data.data?.ats_analysis || null
            );


            /*
            =================================================
            STEP 4
            RESUME INSIGHTS
            =================================================
            */

            setResumeInsights(
                data.data?.resume_insights || null
            );

            setInterviewQuestions(
                data.data?.interview_questions || []
            );


            /*
            =================================================
            ANALYSIS COMPLETE
            =================================================
            */

            setAnalyzed(true);


            toast.success(
                "Resume analyzed successfully!"
            );


        } catch (error) {

            console.error(
                "Resume analysis error:",
                error
            );


            toast.error(
                error.message ||
                "Unable to analyze resume."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout>

            <div className="resume-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="resume-header">

                    <h1>
                        {t("resume.title")}
                    </h1>

                    <p>
                        {t("resume.description")}
                    </p>

                </div>


                {/* =================================================
                    UPLOAD SECTION
                ================================================= */}

                <ResumeUpload
                    onAnalyze={handleAnalyze}
                />


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="resume-placeholder">

                        <h2>
                            Analyzing Resume...
                        </h2>

                        <p>
                            Extracting your resume,
                            matching target requirements
                            and calculating ATS score.
                        </p>

                    </div>

                )}


                {/* =================================================
                    BEFORE ANALYSIS
                ================================================= */}

                {!analyzed && !loading && (

                    <div className="resume-placeholder">

                        <h2>
                            {t(
                                "resume.readyForAnalysis"
                            )}
                        </h2>

                        <p>
                            {t(
                                "resume.analysisDescription"
                            )}
                        </p>


                        <ul>

                            <li>
                                ✅{" "}
                                {t(
                                    "resume.atsScore"
                                )}
                            </li>

                            <li>
                                ✅{" "}
                                {t(
                                    "resume.missingKeywords"
                                )}
                            </li>

                            <li>
                                ✅{" "}
                                {t(
                                    "resume.companyMatch"
                                )}
                            </li>

                            <li>
                                ✅{" "}
                                {t(
                                    "resume.aiSuggestions"
                                )}
                            </li>

                            <li>
                                ✅{" "}
                                {t(
                                    "resume.resumeInterview"
                                )}
                            </li>

                        </ul>

                    </div>

                )}


                {/* =================================================
                    STEP 1
                    EXTRACTED RESUME
                ================================================= */}

                {analyzed &&
                    parsedResume && (

                    <div className="resume-placeholder">

                        <h2>
                            Extracted Resume
                        </h2>


                        <p>
                            Resume information extracted
                            from your uploaded document.
                        </p>


                        {/* CONTACT */}

                        {parsedResume.contact && (

                            <div className="parsed-section">

                                <h3>
                                    Contact Information
                                </h3>


                                <p>

                                    <strong>
                                        Email:
                                    </strong>{" "}

                                    {
                                        parsedResume.contact.email ||
                                        "Not detected"
                                    }

                                </p>


                                <p>

                                    <strong>
                                        Phone:
                                    </strong>{" "}

                                    {
                                        parsedResume.contact.phone ||
                                        "Not detected"
                                    }

                                </p>

                            </div>

                        )}


                        {/* SUMMARY */}

                        {parsedResume.sections?.summary && (

                            <div className="parsed-section">

                                <h3>
                                    Summary
                                </h3>

                                <p>
                                    {
                                        parsedResume.sections.summary
                                    }
                                </p>

                            </div>

                        )}


                        {/* SKILLS */}

                        {parsedResume.sections?.skills && (

                            <div className="parsed-section">

                                <h3>
                                    Skills
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.skills
                                    }

                                </div>

                            </div>

                        )}


                        {/* EDUCATION */}

                        {parsedResume.sections?.education && (

                            <div className="parsed-section">

                                <h3>
                                    Education
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.education
                                    }

                                </div>

                            </div>

                        )}


                        {/* EXPERIENCE */}

                        {parsedResume.sections?.experience && (

                            <div className="parsed-section">

                                <h3>
                                    Experience
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.experience
                                    }

                                </div>

                            </div>

                        )}


                        {/* PROJECTS */}

                        {parsedResume.sections?.projects && (

                            <div className="parsed-section">

                                <h3>
                                    Projects
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.projects
                                    }

                                </div>

                            </div>

                        )}


                        {/* CERTIFICATIONS */}

                        {parsedResume.sections?.certifications && (

                            <div className="parsed-section">

                                <h3>
                                    Certifications
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.certifications
                                    }

                                </div>

                            </div>

                        )}


                        {/* ACHIEVEMENTS */}

                        {parsedResume.sections?.achievements && (

                            <div className="parsed-section">

                                <h3>
                                    Achievements
                                </h3>

                                <div className="parsed-text">

                                    {
                                        parsedResume.sections.achievements
                                    }

                                </div>

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    STEP 2
                    TARGET AWARE ANALYSIS
                ================================================= */}

                {analyzed &&
                    targetAnalysis && (

                    <div className="resume-placeholder">

                        <h2>
                            Target Resume Analysis
                        </h2>


                        <p>

                            <strong>
                                Company:
                            </strong>{" "}

                            {
                                targetAnalysis.target_company
                            }

                        </p>


                        <p>

                            <strong>
                                Role:
                            </strong>{" "}

                            {
                                targetAnalysis.target_role
                            }

                        </p>


                        <p>

                            <strong>
                                Experience:
                            </strong>{" "}

                            {
                                targetAnalysis.experience_level
                            }

                        </p>


                        {/* SKILL MATCH */}

                        <div className="parsed-section">

                            <h3>
                                Skill Match
                            </h3>


                            <h2>

                                {
                                    targetAnalysis.skill_match_percentage
                                }%

                            </h2>

                        </div>


                        {/* MATCHED SKILLS */}

                        {targetAnalysis.matched_skills?.length > 0 && (

                            <div className="parsed-section">

                                <h3>
                                    Matched Skills
                                </h3>


                                <p>

                                    {
                                        formatSkillList(
                                            targetAnalysis.matched_skills
                                        ).join(", ")
                                    }

                                </p>

                            </div>

                        )}


                        {/* MISSING SKILLS */}

                        {targetAnalysis.missing_skills?.length > 0 && (

                            <div className="parsed-section">

                                <h3>
                                    Recommended Skills
                                </h3>


                                <p>

                                    {
                                        formatSkillList(
                                            targetAnalysis.missing_skills
                                        ).join(", ")
                                    }

                                </p>

                            </div>

                        )}


                        {/* EXPERIENCE RECOMMENDATIONS */}

                        {targetAnalysis.experience_recommendations?.length > 0 && (

                            <div className="parsed-section">

                                <h3>
                                    Preparation Recommendations
                                </h3>


                                <ul>

                                    {targetAnalysis.experience_recommendations.map(
                                        (
                                            recommendation,
                                            index
                                        ) => (

                                            <li
                                                key={index}
                                            >
                                                {recommendation}
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    STEP 3
                    ATS SCORE
                ================================================= */}

                {analyzed &&
                    atsAnalysis && (

                    <ATSScore

                        atsAnalysis={
                            atsAnalysis
                        }

                        targetAnalysis={
                            targetAnalysis
                        }

                    />

                )}


                {/* =================================================
                    MISSING KEYWORDS
                ================================================= */}

                {analyzed &&
                    targetAnalysis && (

                    <MissingKeywords
                        targetAnalysis={targetAnalysis}
                    />

                )}


                {/* =================================================
                    RESUME INTELLIGENCE
                ================================================= */}

                {analyzed &&
                    resumeInsights && (

                    <ResumeInsights
                        insights={resumeInsights}
                    />

                )}


                {/* =================================================
                    EXISTING ANALYSIS MODULES
                ================================================= */}

                {analyzed && (

                    <>

                        <ResumeSuggestions
                            insights={resumeInsights}
                            atsAnalysis={atsAnalysis}
                        />

                        <ResumeInterview
                            questions={interviewQuestions}
                        />

                    </>

                )}

            </div>

        </DashboardLayout>

    );

};


export default ResumeAnalysis;