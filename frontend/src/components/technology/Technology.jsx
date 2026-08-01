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

const technologies = [

    {
        icon: <Globe size={30} />,
        title: "Frontend",
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
        title: "Backend",
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
        title: "Database",
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
        title: "Artificial Intelligence",
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
        title: "AI Models",
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
        title: "Security",
        stack: [
            "JWT",
            "Password Hashing",
            "CORS",
            "Protected Routes"
        ],
        progress: "96%"
    }

];

const Technology = () => {

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

                    TECHNOLOGY

                </span>

                <h2>

                    Powered By Modern Technologies

                </h2>

                <p>

                    Built with a production-ready technology stack
                    combining Artificial Intelligence, Deep Learning,
                    NLP and scalable backend architecture.

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