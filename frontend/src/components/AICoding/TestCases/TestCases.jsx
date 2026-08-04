import "./TestCases.css";

import { useState } from "react";

const TestCases = () => {

    const [activeTab, setActiveTab] = useState(0);

    const testCases = [

        {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]"
        },

        {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]"
        },

        {
            input: "nums = [3,3], target = 6",
            output: "[0,1]"
        }

    ];

    return (

        <div className="testcase-card">

            <div className="testcase-header">

                <h2>

                    Test Cases

                </h2>

                <div className="testcase-tabs">

                    {

                        testCases.map((_, index) => (

                            <button

                                key={index}

                                className={activeTab === index ? "active-tab" : ""}

                                onClick={() => setActiveTab(index)}

                            >

                                Case {index + 1}

                            </button>

                        ))

                    }

                </div>

            </div>

            <div className="testcase-body">

                <div className="test-row">

                    <label>

                        Input

                    </label>

                    <pre>

                        {testCases[activeTab].input}

                    </pre>

                </div>

                <div className="test-row">

                    <label>

                        Expected Output

                    </label>

                    <pre>

                        {testCases[activeTab].output}

                    </pre>

                </div>

            </div>

        </div>

    );

};

export default TestCases;