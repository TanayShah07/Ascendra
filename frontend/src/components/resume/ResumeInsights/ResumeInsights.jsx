import "./ResumeInsights.css";

import {
    Type,
    AlertTriangle,
    FolderGit2,
    Building2,
    CheckCircle2,
    XCircle
} from "lucide-react";

import { useLanguage } from "../../../context/LanguageContext";


/* =====================================================
   HELPERS
===================================================== */

const formatName = (value) => {

    if (!value) {
        return "";
    }

    if (typeof value !== "string") {
        return "";
    }

    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );

};


const getScore = (value) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return 0;
    }

    const number = Number(value);

    return Number.isNaN(number)
        ? 0
        : number;

};


/* =====================================================
   COMPONENT
===================================================== */

const ResumeInsights = ({
    insights
}) => {

    const { t } = useLanguage();


    /* -------------------------------------------------
       NO DATA
    ------------------------------------------------- */

    if (!insights) {
        return null;
    }


    /* -------------------------------------------------
       EXTRACT DATA SAFELY
    ------------------------------------------------- */

    const quality =
        insights.quality &&
        typeof insights.quality === "object"
            ? insights.quality
            : {};


    const projects =
        insights.projects &&
        typeof insights.projects === "object"
            ? insights.projects
            : {};


    const companyMatch =
        insights.company_match &&
        typeof insights.company_match === "object"
            ? insights.company_match
            : {};


    const sectionAnalysis =
        insights.section_analysis &&
        typeof insights.section_analysis === "object"
            ? insights.section_analysis
            : {};


    const risks =
        Array.isArray(insights.risks)
            ? insights.risks
            : [];


    const completedSections =
        Array.isArray(
            sectionAnalysis.completed
        )
            ? sectionAnalysis.completed
            : [];


    const missingSections =
        Array.isArray(
            sectionAnalysis.missing
        )
            ? sectionAnalysis.missing
            : [];


    const matchedProjectSkills =
        Array.isArray(
            projects.matched_project_skills
        )
            ? projects.matched_project_skills
            : [];


    /* =================================================
       RENDER
    ================================================= */

    return (

        <div className="resume-insights">

            {/* =================================================
                TITLE
            ================================================= */}

            <h2>
                {t("resume.intelligenceReport")}
            </h2>


            <div className="insight-grid">


                {/* =================================================
                    RESUME QUALITY
                ================================================= */}

                <div className="insight-card">

                    <Type size={32} />

                    <h3>
                        {t("resume.resumeQuality")}
                    </h3>


                    <div className="score-row">

                        <span>
                            {t("resume.overallQuality")}
                        </span>

                        <strong>
                            {getScore(
                                quality.overall_score
                            )}
                            %
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            {t(
                                "resume.sectionCompleteness"
                            )}
                        </span>

                        <strong>
                            {getScore(
                                quality.section_score
                            )}
                            %
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            {t("resume.impactScore")}
                        </span>

                        <strong>
                            {getScore(
                                quality.impact_score
                            )}
                            %
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            {t("resume.structureScore")}
                        </span>

                        <strong>
                            {getScore(
                                quality.structure_score
                            )}
                            %
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    RESUME SECTIONS
                ================================================= */}

                <div className="insight-card">

                    <h3>
                        {t("resume.resumeSections")}
                    </h3>


                    <ul>

                        {/* COMPLETED */}

                        {completedSections.map(
                            (section, index) => {

                                const name =
                                    formatName(section);

                                if (!name) {
                                    return null;
                                }

                                return (

                                    <li
                                        key={`completed-${index}`}
                                    >

                                        <CheckCircle2
                                            size={18}
                                        />

                                        <span>
                                            {name}
                                        </span>

                                    </li>

                                );

                            }
                        )}


                        {/* MISSING */}

                        {missingSections.map(
                            (section, index) => {

                                const name =
                                    formatName(section);

                                if (!name) {
                                    return null;
                                }

                                return (

                                    <li
                                        key={`missing-${index}`}
                                    >

                                        <XCircle
                                            size={18}
                                        />

                                        <span>
                                            {name}
                                        </span>

                                    </li>

                                );

                            }
                        )}


                        {/* NO SECTION DATA */}

                        {completedSections.length === 0 &&
                            missingSections.length === 0 && (

                                <li>

                                    <span>
                                        No section analysis
                                        available yet.
                                    </span>

                                </li>

                            )}

                    </ul>

                </div>


                {/* =================================================
                    PROJECT ANALYSIS
                ================================================= */}

                <div className="insight-card">

                    <FolderGit2 size={32} />

                    <h3>
                        {t("resume.projectAnalysis")}
                    </h3>


                    <div className="score-row">

                        <span>
                            {t(
                                "resume.projectRelevance"
                            )}
                        </span>

                        <strong>
                            {getScore(
                                projects.relevance_score
                            )}
                            %
                        </strong>

                    </div>


                    <div className="score-row">

                        <span>
                            {t(
                                "resume.projectStrength"
                            )}
                        </span>

                        <strong>

                            {projects.strength
                                ? formatName(
                                    projects.strength
                                )
                                : "—"}

                        </strong>

                    </div>


                    {/* PROJECT MESSAGE */}

                    {projects.message && (

                        <p className="insight-description">

                            {typeof projects.message === "string"
                                ? projects.message
                                : ""}

                        </p>

                    )}


                    {/* PROJECT SKILLS */}

                    {matchedProjectSkills.length > 0 && (

                        <div className="keyword-list">

                            {matchedProjectSkills.map(
                                (skill, index) => {

                                    const formattedSkill =
                                        formatName(skill);

                                    if (!formattedSkill) {
                                        return null;
                                    }

                                    return (

                                        <span
                                            key={index}
                                        >
                                            {formattedSkill}
                                        </span>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    TARGET MATCH
                ================================================= */}

                <div className="insight-card">

                    <Building2 size={32} />

                    <h3>
                        {t("resume.targetMatch")}
                    </h3>


                    <div className="company-match">

                        <span>
                            {t("resume.company")}
                        </span>

                        <strong>

                            {typeof companyMatch.company ===
                                "string"

                                ? companyMatch.company

                                : "—"}

                        </strong>

                    </div>


                    <div className="company-match">

                        <span>
                            {t("resume.targetRole")}
                        </span>

                        <strong>

                            {typeof companyMatch.role ===
                                "string"

                                ? companyMatch.role

                                : "—"}

                        </strong>

                    </div>


                    <div className="company-match">

                        <span>
                            {t("resume.skillMatch")}
                        </span>

                        <strong>

                            {getScore(
                                companyMatch.score
                            )}
                            %

                        </strong>

                    </div>

                </div>


                {/* =================================================
                    RESUME RISKS
                ================================================= */}

                <div className="insight-card warning">

                    <AlertTriangle size={32} />

                    <h3>
                        {t("resume.riskDetector")}
                    </h3>


                    <ul className="risk-list">


                        {/* =========================================
                            RISKS
                        ========================================= */}

                        {risks.length > 0 ? (

                            risks.map(
                                (risk, index) => {

                                    /*
                                     * Backend normally returns:
                                     *
                                     * {
                                     *   type,
                                     *   severity,
                                     *   message
                                     * }
                                     */

                                    if (
                                        !risk ||
                                        typeof risk !==
                                        "object"
                                    ) {
                                        return null;
                                    }


                                    const riskType =
                                        formatName(
                                            risk.type
                                        );


                                    const severity =
                                        formatName(
                                            risk.severity
                                        );


                                    const message =
                                        typeof risk.message ===
                                            "string"

                                            ? risk.message

                                            : "";


                                    return (

                                        <li
                                            key={index}
                                            className="risk-item"
                                        >

                                            <AlertTriangle
                                                size={17}
                                            />


                                            <div className="risk-content">


                                                {/* RISK TYPE */}

                                                {riskType && (

                                                    <strong>
                                                        {riskType}
                                                    </strong>

                                                )}


                                                {/* SEVERITY */}

                                                {severity && (

                                                    <span
                                                        className={
                                                            `risk-severity risk-${String(
                                                                risk.severity
                                                            ).toLowerCase()}`
                                                        }
                                                    >
                                                        {severity}
                                                    </span>

                                                )}


                                                {/* MESSAGE */}

                                                {message && (

                                                    <p>
                                                        {message}
                                                    </p>

                                                )}

                                            </div>

                                        </li>

                                    );

                                }
                            )

                        ) : (

                            /* =====================================
                               NO RISKS
                            ===================================== */

                            <li className="risk-item">

                                <CheckCircle2
                                    size={17}
                                />

                                <div>

                                    <strong>
                                        {t(
                                            "resume.noRisksDetected"
                                        )}
                                    </strong>

                                </div>

                            </li>

                        )}

                    </ul>

                </div>


            </div>

        </div>

    );

};


export default ResumeInsights;