import "./ATSScore.css";

import {
    FileCheck,
    TrendingUp,
    Building2,
    BadgeCheck,
    CircleCheckBig
} from "lucide-react";

import { useLanguage } from "../../../context/LanguageContext";


const ATSScore = ({
    atsAnalysis,
    targetAnalysis
}) => {

    const { t } = useLanguage();


    if (!atsAnalysis) {
        return null;
    }


    const score =
        atsAnalysis.score || 0;


    const skillMatch =
        atsAnalysis.skill_match_percentage || 0;


    const company =
        targetAnalysis?.target_company ||
        "Target Company";


    const role =
        targetAnalysis?.target_role ||
        "Target Role";


    const circumference = 452;


    const strokeOffset =
        circumference -
        (
            score /
            100
        ) *
        circumference;


    const getVerdictText = () => {

        if (score >= 85) {
            return "Resume Ready for Applications";
        }

        if (score >= 70) {
            return "Good Resume — Some Improvements Recommended";
        }

        if (score >= 50) {
            return "Resume Needs Improvement";
        }

        return "Resume Needs Major Improvement";

    };


    return (

        <div className="ats-container">


            {/* MAIN SCORE */}

            <div className="ats-main-card">


                <div className="ats-circle">

                    <svg
                        width="180"
                        height="180"
                    >

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
                            strokeDasharray={
                                circumference
                            }
                            strokeDashoffset={
                                strokeOffset
                            }
                        />

                    </svg>


                    <div className="score-text">

                        <h1>
                            {score}
                        </h1>

                        <span>
                            /100
                        </span>

                    </div>

                </div>


                <div className="score-info">

                    <h2>

                        <FileCheck size={24} />

                        {t("resume.atsScore")}

                    </h2>


                    <p>

                        {atsAnalysis.message}

                    </p>


                    <div className="verdict">

                        <CircleCheckBig
                            size={18}
                        />

                        {getVerdictText()}

                    </div>

                </div>

            </div>


            {/* ATS STATS */}

            <div className="ats-stats">


                {/* SKILL MATCH */}

                <div className="ats-card">

                    <TrendingUp size={32} />

                    <h3>

                        Target Skill Match

                    </h3>

                    <span>

                        {skillMatch}%

                    </span>

                </div>


                {/* COMPANY MATCH */}

                <div className="ats-card">

                    <Building2 size={32} />

                    <h3>

                        Company Match

                    </h3>

                    <span>

                        {company}

                    </span>

                </div>


                {/* ROLE MATCH */}

                <div className="ats-card">

                    <BadgeCheck size={32} />

                    <h3>

                        Target Role

                    </h3>

                    <span>

                        {role}

                    </span>

                </div>

            </div>


        </div>

    );

};


export default ATSScore;