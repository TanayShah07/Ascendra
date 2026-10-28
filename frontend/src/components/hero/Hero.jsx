import "./Hero.css";
import DashboardPreview from "../dashboard/DashboardPreview/DashboardPreview";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Hero = () => {

    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <section
            className="hero"
            id="home"
        >

            <motion.div
                className="hero-left"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.8
                }}
            >

                <span className="hero-badge">
                    {t("landing.hero.badge")}
                </span>

                <h1>
                    {t("landing.hero.titleLine1")}
                    <br />
                    {t("landing.hero.titleLine2")}
                </h1>

                <p>
                    {t("landing.hero.description")}
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/register")}
                    >
                        {t("landing.hero.getStarted")}
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/register")}
                    >
                        {t("landing.hero.watchDemo")}
                    </button>

                </div>

                <div className="hero-stats">

                    <div>
                        <h2>10+</h2>
                        <span>{t("landing.hero.aiModules")}</span>
                    </div>

                    <div>
                        <h2>7</h2>
                        <span>{t("landing.hero.assessmentTypes")}</span>
                    </div>

                    <div>
                        <h2>100%</h2>
                        <span>{t("landing.hero.personalizedFeedback")}</span>
                    </div>

                </div>

            </motion.div>

            <motion.div
                className="hero-right"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8
                }}
            >

                <DashboardPreview />

            </motion.div>

        </section>
    );
};

export default Hero;