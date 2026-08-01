import "./DashboardNavbar.css";
import { Bell, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DashboardNavbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav className="dashboard-navbar">

            <div className="dashboard-logo">

                <img
                    src="/logo/logo-without-tagline.png"
                    alt="Ascendra"
                />

            </div>

            <div className="dashboard-links">

    <NavLink
        to="/dashboard"
        className={({ isActive }) =>
            isActive ? "active-link" : ""
        }
    >
        Dashboard
    </NavLink>

    <NavLink
        to="/interview"
        className={({ isActive }) =>
            isActive ? "active-link" : ""
        }
    >
        Interview
    </NavLink>

    <NavLink
        to="/roadmap"
        className={({ isActive }) =>
            isActive ? "active-link" : ""
        }
    >
        Roadmap
    </NavLink>

    <NavLink
        to="/profile"
        className={({ isActive }) =>
            isActive ? "active-link" : ""
        }
    >
        Profile
    </NavLink>

</div>

            <div className="dashboard-right">

                <button className="notification-btn">

                    <Bell size={20} />

                </button>

                <div className="user-chip">

                    <div className="avatar">

                        {user?.full_name?.charAt(0)}

                    </div>

                    <div>

                        <h4>

                            {user?.full_name}

                        </h4>

                        <p>

                            {user?.email}

                        </p>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </nav>

    );

};

export default DashboardNavbar;