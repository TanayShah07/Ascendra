import "./ResumeInterview.css";
import {
    Brain,
    Play,
    MessageSquare,
    Sparkles,
    ArrowRight,
    FileQuestion
} from "lucide-react";

const questions = [

    "Tell me about yourself based on your resume.",

    "Explain your Ascendra project in detail.",

    "Why did you choose React over Angular?",

    "What challenges did you face while building FaceSense?",

    "Explain JWT Authentication.",

    "Which project are you most proud of and why?"

];

const ResumeInterview = () => {

    return (

        <div className="resume-interview">

            <div className="resume-interview-header">

                <Brain size={30}/>

                <div>

                    <h2>

                        Resume Based Interview

                    </h2>

                    <p>

                        AI generates interview questions directly from your uploaded resume.

                    </p>

                </div>

            </div>

            <div className="question-preview">

                {

                    questions.map((question,index)=>(

                        <div
                            key={index}
                            className="question-card"
                        >

                            <MessageSquare size={20}/>

                            <span>

                                {question}

                            </span>

                        </div>

                    ))

                }

            </div>

            <div className="resume-interview-info">

                <div className="feature">

                    <Sparkles size={24}/>

                    <div>

                        <h3>

                            AI Generated Questions

                        </h3>

                        <p>

                            Every interview is personalized according to your resume.

                        </p>

                    </div>

                </div>

                <div className="feature">

                    <FileQuestion size={24}/>

                    <div>

                        <h3>

                            Dynamic Follow-Up Questions

                        </h3>

                        <p>

                            AI asks deeper questions depending on your responses.

                        </p>

                    </div>

                </div>

            </div>

            <button className="resume-interview-btn">

                <Play size={20}/>

                Start Resume Interview

                <ArrowRight size={18}/>

            </button>

        </div>

    );

};

export default ResumeInterview;