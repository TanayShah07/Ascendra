import "./About.css";
import { motion } from "framer-motion";
import {
    Brain,
    Target,
    ShieldCheck,
    Sparkles
} from "lucide-react";

const stats = [

    {
        number: "10+",
        title: "AI Modules"
    },

    {
        number: "7",
        title: "Assessment Types"
    },

    {
        number: "100%",
        title: "Personalized Feedback"
    },

    {
        number: "95%",
        title: "Prediction Accuracy"
    }

];

const About = () => {

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

                    ABOUT ASCENDRA

                </span>

                <h2>

                    Built For The Next Generation Of Placements

                </h2>

                <p>

                    Ascendra combines Artificial Intelligence,
                    Deep Learning, Computer Vision,
                    Natural Language Processing and Speech
                    Intelligence to prepare students for
                    real-world technical interviews.

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

                            AI Driven Evaluation

                        </h3>

                        <p>

                            Analyze speech, eye contact,
                            facial expressions,
                            coding ability and resume
                            using intelligent AI models.

                        </p>

                    </div>

                    <div className="about-card">

                        <Target size={36}/>

                        <h3>

                            Personalized Roadmaps

                        </h3>

                        <p>

                            Every student receives a custom
                            roadmap based on strengths,
                            weaknesses and interview history.

                        </p>

                    </div>

                    <div className="about-card">

                        <ShieldCheck size={36}/>

                        <h3>

                            Secure Platform

                        </h3>

                        <p>

                            JWT Authentication,
                            PostgreSQL,
                            encrypted passwords and
                            secure APIs.

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

                        Why Recruiters Love Ascendra

                    </h2>

                    <p>

                        Instead of generic interview practice,
                        Ascendra creates a complete AI-powered
                        placement readiness ecosystem combining
                        resume optimization, coding interviews,
                        speech intelligence and adaptive learning.

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