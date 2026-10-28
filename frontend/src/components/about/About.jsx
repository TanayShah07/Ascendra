import "./About.css";
import { motion } from "framer-motion";
import {
    Brain,
    Target,
    ShieldCheck,
    Sparkles
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const About = () => {
    const { t } = useLanguage();

    const stats = [

    {
        number: "10+",
        title: t("landing.about.aiModules")
    },

    {
        number: "7",
        title: t("landing.about.assessmentTypes")
    },

    {
        number: "100%",
        title: t("landing.about.personalizedFeedback")
    },

    {
        number: "95%",
        title: t("landing.about.predictionAccuracy")
    }

];

    return (

        <section
            className="about"
            id="about"
        >

            <motion.div
                className="section-heading"
                initial={{
                    opacity:0,
                    y:40
                }}
                whileInView={{
                    opacity:1,
                    y:0
                }}
                viewport={{
                    once:true
                }}
            >

                <span>

                    {t("landing.about.label")}

                </span>

                <h2>

                    {t("landing.about.title")}

                </h2>

                <p>

                    {t("landing.about.description")}

                </p>

            </motion.div>

            <div className="about-content">

                <motion.div
                    className="about-left"
                    initial={{
                        opacity:0,
                        x:-50
                    }}
                    whileInView={{
                        opacity:1,
                        x:0
                    }}
                    viewport={{
                        once:true
                    }}
                >

                    <div className="about-card">

                        <Brain size={36}/>

                        <h3>

                            {t("landing.about.aiDrivenEvaluation")}

                        </h3>

                        <p>

                            {t("landing.about.aiDrivenEvaluationDescription")}

                        </p>

                    </div>

                    <div className="about-card">

                        <Target size={36}/>

                        <h3>

                            {t("landing.about.personalizedRoadmaps")}

                        </h3>

                        <p>

                            {t("landing.about.personalizedRoadmapsDescription")}

                        </p>

                    </div>

                    <div className="about-card">

                        <ShieldCheck size={36}/>

                        <h3>

                            {t("landing.about.securePlatform")}

                        </h3>

                        <p>

                            {t("landing.about.securePlatformDescription")}

                        </p>

                    </div>

                </motion.div>

                <motion.div
                    className="about-right"
                    initial={{
                        opacity:0,
                        x:50
                    }}
                    whileInView={{
                        opacity:1,
                        x:0
                    }}
                    viewport={{
                        once:true
                    }}
                >

                    <Sparkles
                        size={70}
                        className="about-icon"
                    />

                    <h2>

                        {t("landing.about.whyRecruitersLove")}

                    </h2>

                    <p>

                        {t("landing.about.whyRecruitersLoveDescription")}

                    </p>

                </motion.div>

            </div>

            <div className="stats-grid">

                {

                    stats.map((item,index)=>(

                        <motion.div

                            key={index}

                            className="stat-card"

                            initial={{
                                opacity:0,
                                y:30
                            }}

                            whileInView={{
                                opacity:1,
                                y:0
                            }}

                            viewport={{
                                once:true
                            }}

                            transition={{
                                delay:index*.15
                            }}

                        >

                            <h2>

                                {item.number}

                            </h2>

                            <span>

                                {item.title}

                            </span>

                        </motion.div>

                    ))

                }

            </div>

        </section>

    );

};

export default About;