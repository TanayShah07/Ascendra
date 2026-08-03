import "./ATSScore.css";
import {
    FileCheck,
    TrendingUp,
    Building2,
    BadgeCheck,
    CircleCheckBig
} from "lucide-react";

const ATSScore = () => {

    return (

        <div className="ats-container">

            <div className="ats-main-card">

                <div className="ats-circle">

                    <svg width="180" height="180">

                        <circle
                            cx="90"
                            cy="90"
                            r="72"
                            className="bg-circle"
                        />

                        <circle
                            cx="90"
                            cy="90"
                            r="72"
                            className="progress-circle"
                            strokeDasharray="452"
                            strokeDashoffset="49"
                        />

                    </svg>

                    <div className="score-text">

                        <h1>89</h1>

                        <span>/100</span>

                    </div>

                </div>

                <div className="score-info">

                    <h2>

                        <FileCheck size={24}/>

                        ATS Score

                    </h2>

                    <p>

                        Excellent! Your resume passes most Applicant Tracking
                        Systems and is highly recruiter friendly.

                    </p>

                    <div className="verdict">

                        <CircleCheckBig size={18}/>

                        Resume Ready for Applications

                    </div>

                </div>

            </div>

            <div className="ats-stats">

                <div className="ats-card">

                    <TrendingUp size={32}/>

                    <h3>Recruiter Readiness</h3>

                    <span>92%</span>

                </div>

                <div className="ats-card">

                    <Building2 size={32}/>

                    <h3>Company Match</h3>

                    <span>Google • 87%</span>

                </div>

                <div className="ats-card">

                    <BadgeCheck size={32}/>

                    <h3>AI Confidence</h3>

                    <span>High</span>

                </div>

            </div>

        </div>

    );

};

export default ATSScore;