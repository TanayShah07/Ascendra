import "./DashboardHeader.css";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const DashboardHeader = () => {

    const { user } = useAuth();

    return (

        <div className="dashboard-header">

            <div>

                <span className="welcome-tag">

                    Welcome Back

                </span>

                <h1>

                    Hi,

                    <span>

                        {user?.full_name?.split(" ")[0]}

                    </span>

                    👋

                </h1>

                <p>

                    Ready to ace your next interview?

                </p>

            </div>

            <div className="header-level">

                <Sparkles size={26}/>

                <div>

                    <span>

                        Level

                    </span>

                    <h2>

                        1

                    </h2>

                </div>

            </div>

        </div>

    );

};

export default DashboardHeader;