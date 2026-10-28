import "./ResumeSuggestions.css";

import {
    Lightbulb,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react";

import { useLanguage } from "../../../context/LanguageContext";


/*
=========================================================
FORMAT TEXT
=========================================================
*/

const formatText = (value) => {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

};


/*
=========================================================
FORMAT TITLE
=========================================================
*/

const formatTitle = (value) => {

    if (!value) {
        return "Resume Improvement";
    }

    const formatted = formatText(value);

    return formatted
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );

};


/*
=========================================================
NORMALIZE RECOMMENDATION
=========================================================
*/

const normalizeRecommendation = (
    recommendation,
    index
) => {

    /*
    Backend may return a simple string
    */

    if (typeof recommendation === "string") {

        return {

            title: `Recommendation ${index + 1}`,

            text: recommendation

        };

    }


    /*
    Backend may return an object such as:

    {
        title: "...",
        message: "...",
        description: "..."
    }

    */

    if (
        recommendation &&
        typeof recommendation === "object"
    ) {

        return {

            title:
                recommendation.title ||
                recommendation.type ||
                recommendation.category ||
                `Recommendation ${index + 1}`,

            text:
                recommendation.message ||
                recommendation.description ||
                recommendation.text ||
                recommendation.recommendation ||
                "Consider improving this area of your resume."

        };

    }


    return {

        title: `Recommendation ${index + 1}`,

        text: "Consider improving this area of your resume."

    };

};


/*
=========================================================
COMPONENT
=========================================================
*/

const ResumeSuggestions = ({
    insights,
    atsAnalysis
}) => {

    const { t } = useLanguage();


    /*
    =====================================================
    GET BACKEND RECOMMENDATIONS
    =====================================================
    */

    const recommendations =
        Array.isArray(insights?.recommendations)
            ? insights.recommendations
            : [];


    /*
    =====================================================
    NORMALIZE DATA
    =====================================================
    */

    const suggestions =
        recommendations.map(
            normalizeRecommendation
        );


    /*
    =====================================================
    ATS SCORE
    =====================================================
    */

    const currentScore =
        Number(
            atsAnalysis?.ats_score ??
            atsAnalysis?.score ??
            atsAnalysis?.overall_score ??
            0
        );


    /*
    =====================================================
    PREDICTED SCORE

    Backend can optionally provide a predicted score.
    Otherwise calculate a conservative estimate.
    =====================================================
    */

    const backendPredictedScore =
        Number(
            insights?.predicted_ats_score ??
            insights?.predicted_score ??
            0
        );


    const predictedScore =
        backendPredictedScore > 0
            ? Math.min(
                backendPredictedScore,
                100
            )
            : Math.min(
                currentScore +
                Math.min(
                    suggestions.length * 2,
                    10
                ),
                100
            );


    const improvement =
        Math.max(
            predictedScore - currentScore,
            0
        );


    /*
    =====================================================
    EMPTY STATE
    =====================================================
    */

    if (
        suggestions.length === 0
    ) {

        return (

            <div className="resume-suggestions">

                <div className="suggestion-header">

                    <Sparkles size={28} />

                    <div>

                        <h2>
                            {t(
                                "resume.aiSuggestions"
                            ) || "AI Resume Suggestions"}
                        </h2>

                        <p>
                            No additional recommendations
                            were generated for this resume.
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    /*
    =====================================================
    RENDER
    =====================================================
    */

    return (

        <div className="resume-suggestions">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="suggestion-header">

                <Sparkles size={28} />

                <div>

                    <h2>

                        {t(
                            "resume.aiSuggestions"
                        ) || "AI Resume Suggestions"}

                    </h2>

                    <p>

                        Personalized recommendations based on
                        your resume, target role and analysis.

                    </p>

                </div>

            </div>


            {/* =================================================
                SUGGESTIONS
            ================================================= */}

            <div className="suggestion-grid">

                {suggestions.map(
                    (item, index) => (

                        <div
                            className="suggestion-card"
                            key={index}
                        >

                            <div className="suggestion-icon">

                                <Lightbulb />

                            </div>


                            <h3>

                                {formatTitle(
                                    item.title
                                )}

                            </h3>


                            <p>

                                {formatText(
                                    item.text
                                )}

                            </p>


                            <button
                                type="button"
                                onClick={() => {

                                    /*
                                    Future step:
                                    Apply suggestion automatically.
                                    */

                                    console.log(
                                        "Suggestion selected:",
                                        item
                                    );

                                }}
                            >

                                Apply Suggestion

                                <ArrowRight
                                    size={18}
                                />

                            </button>

                        </div>

                    )
                )}

            </div>


            {/* =================================================
                ATS IMPROVEMENT
            ================================================= */}

            <div className="resume-strength">


                <div>

                    <TrendingUp
                        size={28}
                    />

                    <div>

                        <h3>
                            Predicted ATS Improvement
                        </h3>


                        <p>

                            Applying the recommendations could
                            improve your ATS score from

                            <strong>
                                {" "}
                                {currentScore}
                                {" → "}
                                {predictedScore}
                            </strong>

                            {improvement > 0 && (
                                <>
                                    {" "}
                                    (+{improvement})
                                </>
                            )}

                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    onClick={() => {

                        console.log(
                            "Apply all recommendations:",
                            suggestions
                        );

                    }}
                >

                    <CheckCircle2
                        size={20}
                    />

                    Apply All Recommendations

                </button>


            </div>

        </div>

    );

};


export default ResumeSuggestions;