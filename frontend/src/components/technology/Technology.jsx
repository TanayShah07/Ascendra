import "./Technology.css";
import { motion } from "framer-motion";
import {
    Cpu,
    Database,
    Brain,
    Globe,
    Server,
    ShieldCheck
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Technology = () => {
    const { t } = useLanguage();

    const technologies = [

    {
        icon: <Globe size={30} />,
        title: t("landing.technology.frontend"),
        stack: [
            "React",
            "Vite",
            "Framer Motion",
            "CSS"
        ],
        progress: "95%"
    },

    {
        icon: <Server size={30} />,
        title: t("landing.technology.backend"),
        stack: [
            "FastAPI",
            "JWT Authentication",
            "REST API",
            "SQLAlchemy"
        ],
        progress: "90%"
    },

    {
        icon: <Database size={30} />,
        title: t("landing.technology.database"),
        stack: [
            "PostgreSQL",
            "Alembic",
            "Pydantic",
            "Secure Storage"
        ],
        progress: "92%"
    },

    {
        icon: <Brain size={30} />,
        title: t("landing.technology.ai"),
        stack: [
            "NLP",
            "Deep Learning",
            "Computer Vision",
            "Speech Intelligence"
        ],
        progress: "100%"
    },

    {
        icon: <Cpu size={30} />,
        title: t("landing.technology.aiModels"),
        stack: [
            "Whisper",
            "MediaPipe",
            "Gemini",
            "Transformers"
        ],
        progress: "98%"
    },

    {
        icon: <ShieldCheck size={30} />,
        title: t("landing.technology.security"),
        stack: [
            "JWT",
            "Password Hashing",
            "CORS",
            "Protected Routes"
        ],
        progress: "96%"
    }

];

    return (

        <section
            className="technology"
            id="technology"
        >

            <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >

                <span>

                    {t("landing.technology.label")}

                </span>

                <h2>

                    {t("landing.technology.title")}

                </h2>

                <p>

                    {t("landing.technology.description")}

                </p>

            </motion.div>

            <div className="tech-grid">

                {

                    technologies.map((item,index)=>(

                        <motion.div

                            key={index}

                            className="tech-card"

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

                            transition={{
                                delay:index*.12
                            }}

                        >

                            <div className="tech-icon">

                                {item.icon}

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <ul>

                                {

                                    item.stack.map((tech,i)=>(

                                        <li key={i}>

                                            {tech}

                                        </li>

                                    ))

                                }

                            </ul>

                            <div className="progress">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width:item.progress
                                    }}
                                />

                            </div>

                            <span className="progress-text">

                                {item.progress}

                            </span>

                        </motion.div>

                    ))

                }

            </div>

        </section>

    );

};

export default Technology;