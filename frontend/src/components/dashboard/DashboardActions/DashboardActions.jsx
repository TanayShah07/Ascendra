import "./DashboardActions.css";
import {
    Brain,
    FileText,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardActions = () => {

    const navigate = useNavigate();

    return (

        <div className="action-grid">

            <div className="action-card">

                <Brain size={42} />

                <h2>

                    Start AI Interview

                </h2>

                <p>

                    Practice with AI and improve your interview skills.

                </p>

                <button
                    onClick={() => navigate("/interview")}
                >

                    Start

                    <ArrowRight size={18} />

                </button>

            </div>

            <div className="action-card">

                <FileText size={42} />

                <h2>

                    Resume Analysis

                </h2>

                <p>

                    Get ATS score and AI-powered resume suggestions.

                </p>

                <button
                    onClick={() => navigate("/resume")}
                >

                    Analyze

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

};

export default DashboardActions;