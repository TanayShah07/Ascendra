import "./Aptitude.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    ArrowLeft,
    Calculator,
    Building2,
    Brain,
    Clock3,
    Trophy
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const Aptitude = () => {

    const navigate = useNavigate();


    const companies = [
        "Accenture",
        "Capgemini",
        "TCS",
        "Deloitte",
        "IBM",
        "Wipro",
        "Genpact"
    ];


    return (

        <DashboardLayout>

            <div className="aptitude-page">


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    className="aptitude-back"
                    onClick={() =>
                        navigate("/preparation")
                    }
                >

                    <ArrowLeft size={18} />

                    Back to Preparation Hub

                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="aptitude-header">

                    <div className="aptitude-header-icon">

                        <Calculator size={38} />

                    </div>


                    <div>

                        <h1>
                            Aptitude Preparation
                        </h1>

                        <p>
                            Prepare for placement aptitude tests
                            with company-specific and general practice.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    QUICK STATS
                ================================================= */}

                <div className="aptitude-stats">

                    <div className="aptitude-stat">

                        <Building2 size={24} />

                        <div>

                            <strong>
                                {companies.length}
                            </strong>

                            <span>
                                Companies
                            </span>

                        </div>

                    </div>


                    <div className="aptitude-stat">

                        <Brain size={24} />

                        <div>

                            <strong>
                                4
                            </strong>

                            <span>
                                Core Areas
                            </span>

                        </div>

                    </div>


                    <div className="aptitude-stat">

                        <Clock3 size={24} />

                        <div>

                            <strong>
                                Timed
                            </strong>

                            <span>
                                Practice
                            </span>

                        </div>

                    </div>


                    <div className="aptitude-stat">

                        <Trophy size={24} />

                        <div>

                            <strong>
                                0
                            </strong>

                            <span>
                                Tests Completed
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    COMPANY PRACTICE
                ================================================= */}

                <section className="aptitude-section">

                    <div className="aptitude-section-header">

                        <div>

                            <h2>
                                Company-wise Aptitude
                            </h2>

                            <p>
                                Practice questions relevant to
                                specific placement tests.
                            </p>

                        </div>

                    </div>


                    <div className="company-grid">

                        {companies.map(
                            (company) => (

                                <div
                                    className="company-card"
                                    key={company}
                                    onClick={() =>
                                        alert(
                                            `${company} aptitude practice will be available here.`
                                        )
                                    }
                                >

                                    <div className="company-icon">

                                        <Building2 size={26} />

                                    </div>


                                    <div className="company-info">

                                        <h3>
                                            {company}
                                        </h3>

                                        <p>
                                            Company-specific aptitude
                                            preparation
                                        </p>

                                    </div>


                                    <span className="company-arrow">
                                        →
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    GENERAL APTITUDE
                ================================================= */}

                <section className="aptitude-section">

                    <div className="aptitude-section-header">

                        <div>

                            <h2>
                                General Aptitude
                            </h2>

                            <p>
                                Build your fundamentals before
                                attempting company-specific tests.
                            </p>

                        </div>

                    </div>


                    <div className="topic-grid">


                        {/* Quantitative */}

                        <div
                            className="topic-card"
                            onClick={() =>
                                alert(
                                    "Quantitative Aptitude practice will be available here."
                                )
                            }
                        >

                            <div className="topic-icon">

                                <Calculator size={28} />

                            </div>

                            <h3>
                                Quantitative Aptitude
                            </h3>

                            <p>
                                Percentages, profit & loss,
                                averages, ratios, time & work,
                                speed & distance and more.
                            </p>

                            <button>
                                Practice
                            </button>

                        </div>


                        {/* Logical */}

                        <div
                            className="topic-card"
                            onClick={() =>
                                alert(
                                    "Logical Reasoning practice will be available here."
                                )
                            }
                        >

                            <div className="topic-icon">

                                <Brain size={28} />

                            </div>

                            <h3>
                                Logical Reasoning
                            </h3>

                            <p>
                                Series, coding-decoding,
                                arrangements, puzzles and
                                logical patterns.
                            </p>

                            <button>
                                Practice
                            </button>

                        </div>


                        {/* Verbal */}

                        <div
                            className="topic-card"
                            onClick={() =>
                                alert(
                                    "Verbal Ability practice will be available here."
                                )
                            }
                        >

                            <div className="topic-icon">

                                <Brain size={28} />

                            </div>

                            <h3>
                                Verbal Ability
                            </h3>

                            <p>
                                Grammar, vocabulary,
                                comprehension and sentence
                                correction.
                            </p>

                            <button>
                                Practice
                            </button>

                        </div>


                        {/* Mixed */}

                        <div
                            className="topic-card"
                            onClick={() =>
                                alert(
                                    "Mixed aptitude practice will be available here."
                                )
                            }
                        >

                            <div className="topic-icon">

                                <Trophy size={28} />

                            </div>

                            <h3>
                                Mixed Practice
                            </h3>

                            <p>
                                Test yourself across multiple
                                aptitude categories in one session.
                            </p>

                            <button>
                                Practice
                            </button>

                        </div>


                    </div>

                </section>

            </div>

        </DashboardLayout>

    );

};


export default Aptitude;