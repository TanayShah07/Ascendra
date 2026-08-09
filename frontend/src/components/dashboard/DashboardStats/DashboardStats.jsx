import "./DashboardStats.css";
import {
    Flame,
    Trophy,
    Brain,
    TrendingUp
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

const DashboardStats=()=>{
    const { t } = useLanguage();

    const stats = [
    
    {
        icon: <Flame size={28} />,
        title: t("dashboard.currentStreak"),
        value: "0 Days"
    },
    
    {
        icon: <Trophy size={28} />,
        title: t("dashboard.xp"),
        value: "0"
    },
    
    {
        icon: <Brain size={28} />,
        title: t("dashboard.interviews"),
        value: "0"
    },
    
    {
        icon: <TrendingUp size={28} />,
        title: t("dashboard.readiness"),
        value: "0%"
    }
    
];

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