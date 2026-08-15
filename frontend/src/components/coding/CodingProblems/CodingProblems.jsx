import "./CodingProblems.css";

import ProblemCard from "../ProblemCard/ProblemCard";


const CodingProblems = ({
    problems,
    loading,
    error
}) => {

    return (

        <div className="coding-problems">

            <h2>
                Coding Problems
            </h2>


            {/* LOADING */}

            {loading && (

                <div className="coding-loading">

                    Loading coding problems...

                </div>

            )}


            {/* ERROR */}

            {!loading && error && (

                <div className="coding-error">

                    {error}

                </div>

            )}


            {/* EMPTY */}

            {!loading &&
                !error &&
                problems.length === 0 && (

                    <div className="coding-empty">

                        No coding problems found
                        for this selection.

                    </div>

                )
            }


            {/* PROBLEMS */}

            {!loading &&
                !error &&
                problems.length > 0 && (

                    <div className="problem-list">

                        {problems.map(
                            (problem) => (

                                <ProblemCard
                                    key={problem.id}
                                    problem={problem}
                                />

                            )
                        )}

                    </div>

                )
            }

        </div>

    );

};


export default CodingProblems;