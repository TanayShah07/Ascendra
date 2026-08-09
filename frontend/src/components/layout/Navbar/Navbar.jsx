import "./Navbar.css";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const Navbar = () => {

    const [activeSection, setActiveSection] = useState("home");
    const { t } = useLanguage();

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
                    {t("landing.nav.home")}
                </a>

                <a
                    href="#features"
                    className={activeSection === "features" ? "active" : ""}
                >
                    {t("landing.nav.features")}
                </a>

                <a
                    href="#technology"
                    className={activeSection === "technology" ? "active" : ""}
                >
                    {t("landing.nav.technology")}
                </a>

                <a
                    href="#about"
                    className={activeSection === "about" ? "active" : ""}
                >
                    {t("landing.nav.about")}
                </a>

            </div>

            <div className="navbar-buttons">

                <Link
                    to="/login"
                    className="login-btn"
                >
                    {t("landing.nav.login")}
                </Link>

                <Link
                    to="/register"
                    className="get-started-btn"
                >
                    {t("landing.nav.getStarted")}
                </Link>

            </div>

            <button className="mobile-menu">

                <Menu size={28} />

            </button>

        </nav>

    );

};

export default Navbar;