import "./ProblemPanel.css";

import {
    Building2,
    Clock3,
    Tag,
    FileText,
    CheckCircle2
} from "lucide-react";

const ProblemPanel = () => {

    return (

        <div className="problem-panel">

            <div className="problem-header">

                <div>

                    <h2>

                        Two Sum

                    </h2>

                    <div className="problem-meta">

                        <span className="easy">

                            Easy

                        </span>

                        <span>

                            <Clock3 size={14}/>

                            15 mins

                        </span>

                    </div>

                </div>

            </div>

            <div className="problem-section">

                <h3>

                    <FileText size={18}/>

                    Description

                </h3>

                <p>

                    Given an array of integers <strong>nums</strong> and an integer
                    <strong> target</strong>, return the indices of the two numbers
                    such that they add up to the target.

                </p>

            </div>

            <div className="problem-section">

                <h3>

                    <CheckCircle2 size={18}/>

                    Example

                </h3>

                <div className="example-box">

                    Input: nums = [2,7,11,15], target = 9

                    <br/>

                    Output: [0,1]

                    <br/><br/>

                    Explanation:

                    nums[0] + nums[1] = 9

                </div>

            </div>

            <div className="problem-section">

                <h3>

                    <Tag size={18}/>

                    Constraints

                </h3>

                <ul>

                    <li>2 ≤ nums.length ≤ 10⁴</li>

                    <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>

                    <li>Exactly one valid answer exists.</li>

                </ul>

            </div>

            <div className="problem-footer">

                <div>

                    <Building2 size={18}/>

                    Google • Amazon • Microsoft

                </div>

                <div>

                    ⭐ 25 XP

                </div>

            </div>

        </div>

    );

};

export default ProblemPanel;