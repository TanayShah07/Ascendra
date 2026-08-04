import "./AIInterviewHeader.css";

import {
    BrainCircuit,
    Timer,
    Trophy,
    Circle
} from "lucide-react";

const AIInterviewHeader = () => {

    return (

        <div className="ai-header">

            <div className="header-left">

                <div className="header-icon">

                    <BrainCircuit size={28}/>

                </div>

                <div>

                    <h1>

                        AI Coding Interview

                    </h1>

                    <p>

                        Adaptive interview powered by Ascendra AI

                    </p>

                </div>

            </div>

            <div className="header-right">

                <div className="header-card">

                    <Timer size={18}/>

                    <div>

                        <span>

                            Time

                        </span>

                        <h4>

                            45:00

                        </h4>

                    </div>

                </div>

                <div className="header-card">

                    <Trophy size={18}/>

                    <div>

                        <span>

                            Difficulty

                        </span>

                        <h4>

                            Medium

                        </h4>

                    </div>

                </div>

                <div className="header-card live">

                    <Circle size={12}/>

                    <span>

                        Live Interview

                    </span>

                </div>

            </div>

        </div>

    );

};

export default AIInterviewHeader;