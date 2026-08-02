import "./CompanyInterview.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { useState } from "react";
import {
    Building2,
    Play,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyInterview = () => {

    const navigate = useNavigate();

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

            <div className="company-page">

                <button
                    className="back-btn"
                    onClick={() => navigate("/interview")}
                >
                    <ArrowLeft size={18} />
                    Back to Interview
                </button>

                <h1>

                    <Building2 />

                    Company Specific Interview

                </h1>

                <p>

                    Practice interviews based on real company hiring patterns.

                </p>

                <div className="company-card">

                    <label>Company</label>

                    <select
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    >

                        <option value="">

                            Select Company

                        </option>

                        {companies.map((item, index) => (

                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>

                        ))}

                    </select>

                    <label>Job Role</label>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <option value="">

                            Select Role

                        </option>

                        {roles.map((item, index) => (

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

                    <label>Interview Duration</label>

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

                        Start Company Interview

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default CompanyInterview;