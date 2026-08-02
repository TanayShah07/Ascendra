import "./MockInterview.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { useState } from "react";
import { Play, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MockInterview = () => {

    const navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [duration, setDuration] = useState("30");
    const [language, setLanguage] = useState("English");

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

                <button
                    className="back-btn"
                    onClick={() => navigate("/interview")}
                >
                    <ArrowLeft size={18} />
                    Back to Interview
                </button>

                <h1>
                    AI Mock Interview
                </h1>

                <p>
                    Configure your interview before starting.
                </p>

                <div className="setup-card">

                    <label>Subject</label>

                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="">Select Subject</option>

                        {subjects.map((item, index) => (

                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>

                        ))}

                    </select>

                    <label>Difficulty</label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label>Duration</label>

                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                        <option>60</option>
                    </select>

                    <label>Language</label>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Hinglish</option>
                    </select>

                    <button className="start-btn">

                        <Play size={20} />

                        Start Interview

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default MockInterview;