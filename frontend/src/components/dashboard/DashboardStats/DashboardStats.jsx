import "./DashboardStats.css";
import {
    Flame,
    Trophy,
    Brain,
    TrendingUp
} from "lucide-react";

const stats = [

    {
        icon: <Flame size={28} />,
        title: "Current Streak",
        value: "0 Days"
    },

    {
        icon: <Trophy size={28} />,
        title: "XP",
        value: "0"
    },

    {
        icon: <Brain size={28} />,
        title: "Interviews",
        value: "0"
    },

    {
        icon: <TrendingUp size={28} />,
        title: "Readiness",
        value: "0%"
    }

];

const DashboardStats=()=>{

    return(

<div className="stats-grid">

{

stats.map((item,index)=>(

<div
key={index}
className="stat-card"
>

<div>

{item.icon}

</div>

<h2>

{item.value}

</h2>

<p>

{item.title}

</p>

</div>

))

}

</div>

);

};

export default DashboardStats;