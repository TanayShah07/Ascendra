import "./MockInterview.css";

import DashboardLayout
    from "../../components/layout/DashboardLayout/DashboardLayout";

import { useState } from "react";

import {
    Play,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";


const MockInterview = () => {

    const navigate = useNavigate();

    const { t } = useLanguage();


    const [subject, setSubject] = useState("");

    const [difficulty, setDifficulty] =
        useState("Easy");

    const [duration, setDuration] =
        useState("30");

    const [language, setLanguage] =
        useState("English");


    const subjects = [

        "Data Structures",
        "OOP",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "Java",
        "Python",
        "JavaScript",
        "React",
        "HR",
        "Aptitude",
        "Mixed"

    ];


    return (

        <DashboardLayout>

            <div className="setup-page">


                {/* BACK */}

                <button
                    className="mock-interview-back-btn"
                    onClick={() =>
                        navigate("/interview")
                    }
                >

                    <ArrowLeft size={18} />

                    {t("interview.backToInterview")}

                </button>


                <h1>
                    {t("interview.aiMockInterview")}
                </h1>


                <p>
                    {t("interview.configureInterview")}
                </p>


                <div className="setup-card">


                    {/* SUBJECT */}

                    <label>
                        {t("interview.subject")}
                    </label>

                    <select
                        value={subject}
                        onChange={(e) =>
                            setSubject(e.target.value)
                        }
                    >

                        <option value="">
                            {t("interview.selectSubject")}
                        </option>


                        {subjects.map(
                            (item, index) => (

                                <option
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </option>

                            )
                        )}

                    </select>


                    {/* DIFFICULTY */}

                    <label>
                        {t("interview.difficulty")}
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                    >

                        <option value="Easy">
                            {t("interview.easy")}
                        </option>

                        <option value="Medium">
                            {t("interview.medium")}
                        </option>

                        <option value="Hard">
                            {t("interview.hard")}
                        </option>

                    </select>


                    {/* DURATION */}

                    <label>
                        {t("interview.duration")}
                    </label>

                    <select
                        value={duration}
                        onChange={(e) =>
                            setDuration(e.target.value)
                        }
                    >

                        <option value="15">
                            15
                        </option>

                        <option value="30">
                            30
                        </option>

                        <option value="45">
                            45
                        </option>

                        <option value="60">
                            60
                        </option>

                    </select>


                    {/* LANGUAGE */}

                    <label>
                        {t("interview.language")}
                    </label>

                    <select
                        value={language}
                        onChange={(e) =>
                            setLanguage(e.target.value)
                        }
                    >

                        <option value="English">
                            English
                        </option>

                        <option value="Hindi">
                            Hindi
                        </option>

                        <option value="Hinglish">
                            Hinglish
                        </option>

                    </select>


                    {/* START */}

                    <button className="start-btn">

                        <Play size={20} />

                        {t("interview.startInterview")}

                    </button>


                </div>

            </div>

        </DashboardLayout>

    );

};


export default MockInterview;