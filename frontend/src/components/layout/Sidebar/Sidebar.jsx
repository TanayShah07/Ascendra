import "./Sidebar.css";

import {
    LayoutDashboard,
    Brain,
    Users,
    FileText,
    Route,
    User,
    BookOpen,
    Settings as SettingsIcon,
    ChevronLeft,
    ChevronRight,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";


const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    const {
        user,
        logout
    } = useAuth();

    const { t } = useLanguage();


    return (

        <aside
            className={
                collapsed
                    ? "sidebar collapsed"
                    : "sidebar"
            }
        >

            {/* =====================================================
                TOP
            ===================================================== */}

            <div className="sidebar-top">

                {!collapsed && (

                    <img
                        src="/logo/logo-white.png"
                        alt="Ascendra"
                        className="sidebar-logo"
                    />

                )}

                <button
                    className="collapse-btn"
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                >

                    {
                        collapsed
                            ? <ChevronRight size={20} />
                            : <ChevronLeft size={20} />
                    }

                </button>

            </div>


            {/* =====================================================
                NAVIGATION
            ===================================================== */}

            <nav>

                <NavLink to="/dashboard">

                    <LayoutDashboard />

                    {!collapsed && (
                        <span>
                            {t("sidebar.dashboard")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/interview">

                    <Brain />

                    {!collapsed && (
                        <span>
                            {t("sidebar.interview")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/group-discussion">

                    <Users />

                    {!collapsed && (
                        <span>
                            {t("sidebar.groupDiscussion")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/preparation">

                    <BookOpen />

                    {!collapsed && (
                        <span>
                            {t("sidebar.preparation")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/resume">

                    <FileText />

                    {!collapsed && (
                        <span>
                            {t("sidebar.resume")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/roadmap">

                    <Route />

                    {!collapsed && (
                        <span>
                            {t("sidebar.roadmap")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/profile">

                    <User />

                    {!collapsed && (
                        <span>
                            {t("sidebar.profile")}
                        </span>
                    )}

                </NavLink>


                <NavLink to="/settings">

                    <SettingsIcon />

                    {!collapsed && (
                        <span>
                            {t("sidebar.settings")}
                        </span>
                    )}

                </NavLink>

            </nav>


            {/* =====================================================
                BOTTOM
            ===================================================== */}

            <div className="sidebar-bottom">


                {/* =================================================
                    GAMIFICATION STATS
                ================================================= */}

                {!collapsed && (

                    <div className="user-stats">

                        <div className="sidebar-stat">

                            <span className="sidebar-stat-icon">
                                🔥
                            </span>

                            <span>
                                {user?.streak ?? 0} Day Streak
                            </span>

                        </div>


                        <div className="sidebar-stat">

                            <span className="sidebar-stat-icon">
                                ⭐
                            </span>

                            <span>
                                {user?.xp ?? 0} XP
                            </span>

                        </div>


                        <div className="sidebar-stat">

                            <span className="sidebar-stat-icon">
                                🏅
                            </span>

                            <span>
                                Level {user?.level ?? 1}
                            </span>

                        </div>

                    </div>

                )}


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <button
                    className="logout-sidebar"
                    onClick={logout}
                >

                    <LogOut />

                    {!collapsed && (
                        <span>
                            {t("sidebar.logout")}
                        </span>
                    )}

                </button>

            </div>

        </aside>

    );

};


export default Sidebar;