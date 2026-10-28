import "./DashboardHeader.css";

import { Sparkles } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";

const DashboardHeader = () => {

    const { user } = useAuth();
    const { t } = useLanguage();

    return (

        <div className="dashboard-header">

            <div>

                <span className="welcome-tag">

                    {t("dashboard.welcome")}

                </span>

                <h1>
                    Hi,{" "}
                    <span>
                        {user?.full_name?.split(" ")[0] || "User"}
                    </span>{" "}
                    👋
                </h1>

                <p>

                    {t("dashboard.greeting")}

                </p>

            </div>

            <div className="header-level">

                <Sparkles size={26} />

                <div>

                    <span>
                        {t("level")}
                    </span>

                    <h2>
                        {user?.level ?? 1}
                    </h2>

                </div>

            </div>

        </div>

    );
};

export default DashboardHeader;