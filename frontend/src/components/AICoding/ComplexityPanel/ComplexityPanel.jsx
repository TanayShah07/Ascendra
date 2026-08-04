import "./ComplexityPanel.css";

import {
    Gauge,
    Cpu,
    Lightbulb,
    TrendingUp
} from "lucide-react";

const ComplexityPanel = () => {

    return (

        <div className="complexity-panel">

            <h2>

                AI Code Analysis

            </h2>

            <div className="complexity-grid">

                <div className="complexity-card">

                    <Gauge size={24}/>

                    <h3>

                        Time Complexity

                    </h3>

                    <p>

                        --

                    </p>

                </div>

                <div className="complexity-card">

                    <Cpu size={24}/>

                    <h3>

                        Space Complexity

                    </h3>

                    <p>

                        --

                    </p>

                </div>

                <div className="complexity-card">

                    <TrendingUp size={24}/>

                    <h3>

                        Optimization

                    </h3>

                    <p>

                        Pending

                    </p>

                </div>

                <div className="complexity-card">

                    <Lightbulb size={24}/>

                    <h3>

                        AI Suggestions

                    </h3>

                    <p>

                        Available after submission

                    </p>

                </div>

            </div>

        </div>

    );

};

export default ComplexityPanel;