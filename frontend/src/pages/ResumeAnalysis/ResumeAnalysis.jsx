import "./ResumeAnalysis.css";
import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import ResumeUpload from "../../components/resume/ResumeUpload/ResumeUpload";
import ATSScore from "../../components/resume/ATSScore/ATSScore";
import ResumeInsights from "../../components/resume/ResumeInsights/ResumeInsights";
import ResumeSuggestions from "../../components/resume/ResumeSuggestions/ResumeSuggestions";
import ResumeInterview from "../../components/resume/ResumeInterview/ResumeInterview";

const ResumeAnalysis = () => {

    const [analyzed, setAnalyzed] = useState(false);

    return (

        <DashboardLayout>

            <div className="resume-page">

                <div className="resume-header">

                    <h1>

                        Resume Intelligence

                    </h1>

                    <p>

                        Upload your resume and receive AI-powered ATS scoring,
                        recruiter insights and interview preparation.

                    </p>

                </div>

                <ResumeUpload
                    onAnalyze={() => setAnalyzed(true)}
                />

                {

                    !analyzed &&

                    <div className="resume-placeholder">

                        <h2>

                            Ready for AI Analysis

                        </h2>

                        <p>

                            Upload your resume and click
                            <strong> Analyze Resume </strong>
                            to generate:

                        </p>

                        <ul>

                            <li>✅ ATS Score</li>

                            <li>✅ Missing Keywords</li>

                            <li>✅ Company Match</li>

                            <li>✅ AI Suggestions</li>

                            <li>✅ Resume Interview</li>

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