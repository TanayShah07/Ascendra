import "./Features.css";
import { motion } from "framer-motion";
import {
    Brain,
    FileText,
    Mic,
    Eye,
    Code2,
    Route,
    ChevronRight
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

const Features = () => {
    const { t } = useLanguage();

    const features = [
    {
        icon: <Brain size={30} />,
        title: t("landing.features.aiMockInterviews"),
        desc: t("landing.features.aiMockInterviewsDesc")
    },
    {
        icon: <FileText size={30} />,
        title: t("landing.features.atsResumeScanner"),
        desc: t("landing.features.atsResumeScannerDesc")
    },
    {
        icon: <Code2 size={30} />,
        title: t("landing.features.codingAssessment"),
        desc: t("landing.features.codingAssessmentDesc")
    },
    {
        icon: <Mic size={30} />,
        title: t("landing.features.speechIntelligence"),
        desc: t("landing.features.speechIntelligenceDesc")
    },
    {
        icon: <Eye size={30} />,
        title: t("landing.features.computerVision"),
        desc: t("landing.features.computerVisionDesc")
    },
    {
        icon: <Route size={30} />,
        title: t("landing.features.learningRoadmaps"),
        desc: t("landing.features.learningRoadmapsDesc")
    }
];
    return (

        <section
            className="features"
            id="features"
        >

            <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >

                <span>
                    {t("landing.features.label")}
                </span>

                <h2>
                    {t("landing.features.title")}
                </h2>

                <p>
                    {t("landing.features.description")}
                </p>

            </motion.div>

            <div className="features-grid">

                {features.map((feature, index) => (

                    <motion.div
                        key={index}
                        className="feature-card"
                        initial={{
                            opacity: 0,
                            y: 50
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            delay: index * 0.1
                        }}
                    >

                        <div className="feature-icon">

                            {feature.icon}

                        </div>

                        <h3>

                            {feature.title}

                        </h3>

                        <p>

                            {feature.desc}

                        </p>

                        <button>

                            {t("landing.features.learnMore")}

                            <ChevronRight size={18}/>

                        </button>

                    </motion.div>

                ))}

            </div>

        </section>

    );

};

export default Features;