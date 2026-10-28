import "./DashboardActions.css";
import {
    Brain,
    FileText,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const DashboardActions = () => {

    const { t } = useLanguage();
    const navigate = useNavigate();

    return (

        <div className="action-grid">

            <div className="action-card">

                <Brain size={42} />

                <h2>

                    {t("dashboard.startAIInterview")}

                </h2>

                <p>

                    {t("dashboard.startAIInterviewDescription")}

                </p>

                <button
                    onClick={() => navigate("/interview")}
                >

                    {t("dashboard.start")}

                    <ArrowRight size={18} />

                </button>

            </div>

            <div className="action-card">

                <FileText size={42} />

                <h2>

                    {t("dashboard.resumeAnalysis")}

                </h2>

                <p>

                    {t("dashboard.resumeAnalysisDescription")}

                </p>

                <button
                    onClick={() => navigate("/resume")}
                >

                    {t("dashboard.analyze")}

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

};

export default DashboardActions;