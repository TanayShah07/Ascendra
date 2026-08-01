import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {

    const { token, logout } = useAuth();

    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {

        const handleScroll = () => {

            const scroll = window.scrollY + 120;

            const home = document.getElementById("home");
            const features = document.getElementById("features");
            const technology = document.getElementById("technology");
            const about = document.getElementById("about");

            if (
                home &&
                scroll < features.offsetTop - 100
            ) {

                setActiveSection("home");

            }

            else if (
                features &&
                scroll >= features.offsetTop - 100 &&
                scroll < technology.offsetTop - 100
            ) {

                setActiveSection("features");

            }

            else if (
                technology &&
                scroll >= technology.offsetTop - 100 &&
                scroll < about.offsetTop - 100
            ) {

                setActiveSection("technology");

            }

            else {

                setActiveSection("about");

            }

        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {

            window.removeEventListener("scroll", handleScroll);

        };

    }, []);

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                <Link to="/">

                    <img
                        src="/logo/logo-without-tagline.png"
                        alt="Ascendra"
                        className="logo"
                    />

                </Link>

            </div>

            {!token ? (

                <>

                    <div className="navbar-links">

                        <a
                            href="#home"
                            className={activeSection === "home" ? "active" : ""}
                        >
                            Home
                        </a>

                        <a
                            href="#features"
                            className={activeSection === "features" ? "active" : ""}
                        >
                            Features
                        </a>

                        <a
                            href="#technology"
                            className={activeSection === "technology" ? "active" : ""}
                        >
                            Technology
                        </a>

                        <a
                            href="#about"
                            className={activeSection === "about" ? "active" : ""}
                        >
                            About
                        </a>

                    </div>

                    <div className="navbar-buttons">

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="get-started-btn"
                        >
                            Get Started
                        </Link>

                    </div>

                </>

            ) : (

                <>

                    <div className="navbar-links">

                        <NavLink to="/dashboard">Dashboard</NavLink>

                        <NavLink to="/interview">Interview</NavLink>

                        <NavLink to="/roadmap">Roadmap</NavLink>

                        <NavLink to="/profile">Profile</NavLink>

                    </div>

                    <div className="navbar-buttons">

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </>

            )}

            <button className="mobile-menu">

                <Menu size={28} />

            </button>

        </nav>

    );

};

export default Navbar;