import "./FeedbackPanel.css";

import {

    Bot,

    Mic,

    MessageCircle,

    Star,

    Lock

} from "lucide-react";

const FeedbackPanel = () => {

    return (

        <div className="feedback-panel">

            <div className="feedback-header">

                <Bot size={28}/>

                <div>

                    <h2>

                        AI Interview Feedback

                    </h2>

                    <p>

                        Feedback will appear after your submission.

                    </p>

                </div>

            </div>

            <div className="feedback-grid">

                <div className="feedback-card">

                    <Mic/>

                    <h3>

                        Communication

                    </h3>

                    <span>

                        --

                    </span>

                </div>

                <div className="feedback-card">

                    <MessageCircle/>

                    <h3>

                        Explanation

                    </h3>

                    <span>

                        --

                    </span>

                </div>

                <div className="feedback-card">

                    <Star/>

                    <h3>

                        Coding Score

                    </h3>

                    <span>

                        --

                    </span>

                </div>

            </div>

            <div className="feedback-placeholder">

                <Lock size={26}/>

                <p>

                    Submit your solution to receive AI-powered feedback,
                    interviewer comments, optimization suggestions,
                    confidence score and communication analysis.

                </p>

            </div>

        </div>

    );

};

export default FeedbackPanel;