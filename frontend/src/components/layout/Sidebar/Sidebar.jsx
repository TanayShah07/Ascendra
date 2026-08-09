import "./Sidebar.css";
import {
    LayoutDashboard,
    Brain,
    Users,
    FileText,
    Route,
    User,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    const { logout } = useAuth();

    return (

        <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

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
                    onClick={() => setCollapsed(!collapsed)}
                >

                    {

                        collapsed ?

                        <ChevronRight size={20}/> :

                        <ChevronLeft size={20}/>

                    }

                </button>

            </div>

            <nav>

                <NavLink to="/dashboard">

                    <LayoutDashboard/>

                    {!collapsed && <span>Dashboard</span>}

                </NavLink>

                <NavLink to="/interview">

                    <Brain/>

                    {!collapsed && <span>Interview</span>}

                </NavLink>

                <NavLink to="/group-discussion">

                    <Users/>

                    {!collapsed && <span>Group Discussion</span>}

                </NavLink>

                <NavLink to="/preparation">

                    <BookOpen />

                    {!collapsed && (
                        <span>
                            Preparation Hub
                        </span>
                    )}

                </NavLink>

                <NavLink to="/resume">

                    <FileText/>

                    {!collapsed && <span>Resume Analysis</span>}

                </NavLink>

                <NavLink to="/roadmap">

                    <Route/>

                    {!collapsed && <span>Roadmap</span>}

                </NavLink>

                <NavLink to="/profile">

                    <User/>

                    {!collapsed && <span>Profile</span>}

                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                {!collapsed && (

                    <div className="user-stats">

                        <p>🔥 0 Day Streak</p>

                        <p>⭐ 0 XP</p>

                        <p>🏅 Level 1</p>

                    </div>

                )}

                <button
                    className="logout-sidebar"
                    onClick={logout}
                >

                    <LogOut/>

                    {!collapsed && <span>Logout</span>}

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;