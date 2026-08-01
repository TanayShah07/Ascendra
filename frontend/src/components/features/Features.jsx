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

const features = [
    {
        icon: <Brain size={30} />,
        title: "AI Mock Interviews",
        desc: "Practice realistic interviews powered by AI."
    },
    {
        icon: <FileText size={30} />,
        title: "ATS Resume Scanner",
        desc: "Optimize your resume for recruiters."
    },
    {
        icon: <Code2 size={30} />,
        title: "Coding Assessment",
        desc: "Solve DSA and coding interview questions."
    },
    {
        icon: <Mic size={30} />,
        title: "Speech Intelligence",
        desc: "Analyze confidence, pace and clarity."
    },
    {
        icon: <Eye size={30} />,
        title: "Computer Vision",
        desc: "Eye contact and posture analysis."
    },
    {
        icon: <Route size={30} />,
        title: "Learning Roadmaps",
        desc: "Personalized preparation plans."
    }
];

const Features = () => {

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
                    FEATURES
                </span>

                <h2>
                    Everything You Need To Crack Placements
                </h2>

                <p>
                    Ascendra combines Artificial Intelligence, NLP,
                    Deep Learning and Computer Vision into one
                    intelligent interview preparation platform.
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

                            Learn More

                            <ChevronRight size={18}/>

                        </button>

                    </motion.div>

                ))}

            </div>

        </section>

    );

};

export default Features;