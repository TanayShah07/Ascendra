import "./ResumeSuggestions.css";
import {
    Lightbulb,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react";

const ResumeSuggestions = () => {

    const suggestions = [

        {
            title:"Improve Project Descriptions",
            text:"Quantify your achievements by adding measurable impact instead of generic statements."
        },

        {
            title:"Increase ATS Keywords",
            text:"Include Docker, Redis, CI/CD, REST APIs and Kubernetes for better ATS matching."
        },

        {
            title:"Add Certifications",
            text:"Relevant certifications significantly improve recruiter confidence."
        },

        {
            title:"Strengthen Resume Summary",
            text:"Highlight your strongest technical skills and career objective in 2–3 concise lines."
        },

        {
            title:"Use Strong Action Verbs",
            text:"Replace 'Worked On' with Designed, Developed, Built, Engineered or Optimized."
        }

    ];

    return (

        <div className="resume-suggestions">

            <div className="suggestion-header">

                <Sparkles size={28}/>

                <div>

                    <h2>

                        AI Resume Suggestions

                    </h2>

                    <p>

                        Personalized recommendations to maximize your ATS score and recruiter impact.

                    </p>

                </div>

            </div>

            <div className="suggestion-grid">

                {

                    suggestions.map((item,index)=>(

                        <div
                            className="suggestion-card"
                            key={index}
                        >

                            <div className="suggestion-icon">

                                <Lightbulb/>

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.text}

                            </p>

                            <button>

                                Apply Suggestion

                                <ArrowRight size={18}/>

                            </button>

                        </div>

                    ))

                }

            </div>

            <div className="resume-strength">

                <div>

                    <TrendingUp size={28}/>

                    <div>

                        <h3>

                            Predicted ATS Improvement

                        </h3>

                        <p>

                            Applying every recommendation could improve your ATS score from

                            <strong> 89 → 96 </strong>

                        </p>

                    </div>

                </div>

                <button>

                    <CheckCircle2 size={20}/>

                    Apply All Recommendations

                </button>

            </div>

        </div>

    );

};

export default ResumeSuggestions;