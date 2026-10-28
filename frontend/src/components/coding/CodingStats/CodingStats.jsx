import "./CodingStats.css";

import {

    Trophy,

    Flame,

    CheckCircle2,

    Brain

} from "lucide-react";

const CodingStats = () => {

    return(

        <div className="coding-stats">

            <div className="coding-stat-card">

                <Trophy/>

                <h2>0</h2>

                <p>Total XP</p>

            </div>

            <div className="coding-stat-card">

                <Flame/>

                <h2>0</h2>

                <p>Current Streak</p>

            </div>

            <div className="coding-stat-card">

                <CheckCircle2/>

                <h2>0</h2>

                <p>Problems Solved</p>

            </div>

            <div className="coding-stat-card">

                <Brain/>

                <h2>0%</h2>

                <p>Interview Readiness</p>

            </div>

        </div>

    );

};

export default CodingStats;