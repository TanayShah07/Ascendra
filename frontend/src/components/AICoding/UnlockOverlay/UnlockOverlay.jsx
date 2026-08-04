import "./UnlockOverlay.css";

import {
    Lock,
    Sparkles,
    ArrowRight,
    Code2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const UnlockOverlay = () => {

    const navigate = useNavigate();

    return (

        <div className="unlock-overlay">

            <div className="unlock-card">

                <div className="lock-icon">

                    <Lock size={55}/>

                </div>

                <h1>

                    AI Coding Interview Locked

                </h1>

                <p>

                    Experience realistic AI-powered coding interviews with an
                    adaptive interviewer, live code evaluation, follow-up
                    questions, optimization analysis, and detailed AI feedback.

                </p>

                <div className="unlock-requirements">

                    <div className="requirement">

                        <Code2 size={22}/>

                        <div>

                            <h3>

                                Coding Problems

                            </h3>

                            <span>

                                0 / 50 Completed

                            </span>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{ width: "0%" }}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="requirement">

                        <Sparkles size={22}/>

                        <div>

                            <h3>

                                Coding XP

                            </h3>

                            <span>

                                0 / 1000 XP

                            </span>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{ width: "0%" }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <button

                    className="unlock-btn"

                    onClick={() => navigate("/coding")}

                >

                    Go to Coding Problems

                    <ArrowRight size={18}/>

                </button>

            </div>

        </div>

    );

};

export default UnlockOverlay;