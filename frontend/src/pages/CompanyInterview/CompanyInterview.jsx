import "./CompanyInterview.css";

import DashboardLayout
    from "../../components/layout/DashboardLayout/DashboardLayout";

import { useState } from "react";

import {
    Building2,
    Play,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";


const CompanyInterview = () => {

    const navigate = useNavigate();

    const { t } = useLanguage();


    const companies = [
        "Google",
        "Microsoft",
        "Amazon",
        "Adobe",
        "Oracle",
        "NVIDIA",
        "Goldman Sachs",
        "JP Morgan",
        "Morgan Stanley",
        "Flipkart",
        "Swiggy",
        "Zomato",
        "Infosys",
        "TCS",
        "Accenture"
    ];


    const roles = [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Data Scientist",
        "Machine Learning Engineer",
        "AI Engineer",
        "Cloud Engineer"
    ];


    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [duration, setDuration] = useState("30");
    const [language, setLanguage] = useState("English");


    return (

        <DashboardLayout>

            <div className="company-interview-page">

                {/* BACK BUTTON */}

                <button
                    className="company-interview-back-btn"
                    onClick={() => navigate("/interview")}
                >
                    <ArrowLeft size={18} />

                    {t("interview.backToInterview")}
                </button>


                {/* HEADER */}

                <div className="company-interview-header">

                    <h1>
                        <Building2 size={38} />

                        {t("interview.companyInterview")}
                    </h1>

                    <p>
                        {t(
                            "interview.companyInterviewDescription"
                        )}
                    </p>

                </div>


                {/* FORM */}

                <div className="company-interview-card">


                    {/* COMPANY */}

                    <div className="company-interview-field">

                        <label>
                            {t("interview.company")}
                        </label>

                        <select
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                        >

                            <option value="">
                                {t("interview.selectCompany")}
                            </option>

                            {companies.map(
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

                    </div>


                    {/* JOB ROLE */}

                    <div className="company-interview-field">

                        <label>
                            {t("interview.jobRole")}
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >

                            <option value="">
                                {t("interview.selectRole")}
                            </option>

                            {roles.map(
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

                    </div>


                    {/* DIFFICULTY */}

                    <div className="company-interview-field">

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

                    </div>


                    {/* DURATION */}

                    <div className="company-interview-field">

                        <label>
                            {t("interview.durationMinutes")}
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

                    </div>


                    {/* LANGUAGE */}

                    <div className="company-interview-field">

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

                    </div>


                    {/* START BUTTON */}

                    <button
                        className="company-interview-start-btn"
                    >

                        <Play size={20} />

                        {t(
                            "interview.startCompanyInterview"
                        )}

                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
};


export default CompanyInterview;