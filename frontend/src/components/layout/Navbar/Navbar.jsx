import "./Navbar.css";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {

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
                features &&
                scroll < features.offsetTop - 100
            ) {

                setActiveSection("home");

            }

            else if (
                features &&
                technology &&
                scroll >= features.offsetTop - 100 &&
                scroll < technology.offsetTop - 100
            ) {

                setActiveSection("features");

            }

            else if (
                technology &&
                about &&
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

            <button className="mobile-menu">

                <Menu size={28} />

            </button>

        </nav>

    );

};

export default Navbar;