import "./DashboardStats.css";

import {
    Flame,
    Trophy,
    Brain,
    TrendingUp
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";

const DashboardStats = () => {

    const { user } = useAuth();
    const { t } = useLanguage();

    const stats = [

        {
            icon: <Flame size={28} />,
            title: t("dashboard.currentStreak"),
            value: `${user?.streak ?? 0} Day${user?.streak === 1 ? "" : "s"}`
        },

        {
            icon: <Trophy size={28} />,
            title: t("dashboard.xp"),
            value: `${user?.xp ?? 0}`
        },

        {
            icon: <Brain size={28} />,
            title: t("dashboard.interviews"),
            value: `${user?.interview_completed ?? 0}`
        },

        {
            icon: <TrendingUp size={28} />,
            title: t("dashboard.readiness"),
            value: `${user?.placement_readiness ?? 0}%`
        }

    ];

    return (

        <div className="stats-grid">

            {stats.map((item, index) => (

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

            ))}

        </div>

    );
};

export default DashboardStats;