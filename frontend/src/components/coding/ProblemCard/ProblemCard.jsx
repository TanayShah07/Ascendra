import "./ProblemCard.css";
import { ArrowRight } from "lucide-react";

const ProblemCard = ({ problem }) => {

    return (

        <div className="problem-card">

            <div className="problem-left">

                <h3>

                    {problem.title}

                </h3>

                <div className="problem-tags">

                    <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>

                        {problem.difficulty}

                    </span>

                    <span>

                        {problem.topic}

                    </span>

                    <span>

                        {problem.time}

                    </span>

                    <span>

                        ⭐ {problem.xp} XP

                    </span>

                </div>

                <p>

                    {problem.company.join(" • ")}

                </p>

            </div>

            <button>

                Solve

                <ArrowRight size={18}/>

            </button>

        </div>

    );

};

export default ProblemCard;