import "./ProblemCard.css";

import {
    ArrowRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const ProblemCard = ({ problem }) => {

    const navigate = useNavigate();


    /* =====================================================
       NORMALIZE COMPANIES
    ===================================================== */

    let companies = [];


    if (Array.isArray(problem.company)) {

        companies = problem.company;

    }
    else if (
        typeof problem.company === "string"
    ) {

        companies = [problem.company];

    }


    /* =====================================================
       OPEN PROBLEM
    ===================================================== */

    const handleSolve = () => {

        navigate(
            `/coding/problem/${problem.id}`
        );

    };


    return (

        <div className="problem-card">


            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="problem-left">

                <h3>
                    {problem.title}
                </h3>


                {/* =================================================
                    TAGS
                ================================================= */}

                <div className="problem-tags">


                    {/* DIFFICULTY */}

                    <span
                        className={
                            `difficulty ${
                                problem.difficulty
                                    ?.toLowerCase()
                            }`
                        }
                    >
                        {problem.difficulty}
                    </span>


                    {/* TOPIC */}

                    <span>
                        {problem.topic}
                    </span>


                    {/* TIME */}

                    <span>

                        {
                            problem.time_limit
                                ? `${problem.time_limit} min`
                                : "Practice"
                        }

                    </span>


                    {/* XP */}

                    <span>

                        ⭐ {problem.xp || 0} XP

                    </span>


                </div>


                {/* =================================================
                    COMPANIES
                ================================================= */}

                <p>

                    {
                        companies.length > 0
                            ? companies.join(" • ")
                            : "General Practice"
                    }

                </p>


            </div>


            {/* =================================================
                SOLVE BUTTON
            ================================================= */}

            <button
                onClick={handleSolve}
            >

                Solve

                <ArrowRight
                    size={18}
                />

            </button>


        </div>

    );

};


export default ProblemCard;