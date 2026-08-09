import "./ResumeAnalysis.css";
import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import ResumeUpload from "../../components/resume/ResumeUpload/ResumeUpload";
import ATSScore from "../../components/resume/ATSScore/ATSScore";
import ResumeInsights from "../../components/resume/ResumeInsights/ResumeInsights";
import ResumeSuggestions from "../../components/resume/ResumeSuggestions/ResumeSuggestions";
import ResumeInterview from "../../components/resume/ResumeInterview/ResumeInterview";
import { useLanguage } from "../../context/LanguageContext";

const ResumeAnalysis = () => {

    const [analyzed, setAnalyzed] = useState(false);
    const { t } = useLanguage();
    return (

        <DashboardLayout>

            <div className="resume-page">

                <div className="resume-header">

                    <h1>

                        {t("resume.title")}

                    </h1>

                    <p>

                        {t("resume.description")}

                    </p>

                </div>

                <ResumeUpload
                    onAnalyze={() => setAnalyzed(true)}
                />

                {

                    !analyzed &&

                    <div className="resume-placeholder">

                        <h2>

                            {t("resume.readyForAnalysis")}

                        </h2>

                        <p>

                            {t("resume.analysisDescription")}

                        </p>

                        <ul>

                            <li>✅ {t("resume.atsScore")}</li>

                            <li>✅ {t("resume.missingKeywords")}</li>

                            <li>✅ {t("resume.companyMatch")}</li>

                            <li>✅ {t("resume.aiSuggestions")}</li>

                            <li>✅ {t("resume.resumeInterview")}</li>

                        </ul>

                    </div>

                }

                {

                    analyzed &&

                    <>

                        <ATSScore/>

                        <ResumeInsights/>

                        <ResumeSuggestions/>

                        <ResumeInterview/>

                    </>

                }

            </div>

        </DashboardLayout>

    );

};

export default ResumeAnalysis;