import "./Interview.css";

import DashboardLayout
    from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Brain,
    Building2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";


const Interview = () => {

    const navigate = useNavigate();

    const { t } = useLanguage();


    return (

        <DashboardLayout>

            <div className="interview-page">

                <h1>
                    {t("interview.chooseMode")}
                </h1>

                <p>
                    {t("interview.selectPracticeMode")}
                </p>


                <div className="mode-grid">


                    {/* AI MOCK INTERVIEW */}

                    <div
                        className="mode-card"
                        onClick={() =>
                            navigate("/interview/mock")
                        }
                    >

                        <Brain size={50} />

                        <h2>
                            {t("interview.aiMockInterview")}
                        </h2>

                        <p>
                            {t(
                                "interview.aiMockInterviewDescription"
                            )}
                        </p>

                    </div>


                    {/* COMPANY INTERVIEW */}

                    <div
                        className="mode-card"
                        onClick={() =>
                            navigate("/interview/company")
                        }
                    >

                        <Building2 size={50} />

                        <h2>
                            {t("interview.companyInterview")}
                        </h2>

                        <p>
                            {t(
                                "interview.companyInterviewDescription"
                            )}
                        </p>

                    </div>


                </div>

            </div>

        </DashboardLayout>

    );

};


export default Interview;