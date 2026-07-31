import "./Hero.css";
import DashboardPreview from "../dashboard/DashboardPreview/DashboardPreview";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero">

      <motion.div
        className="hero-left"
        initial={{opacity:0,x:-60}}
        animate={{opacity:1,x:0}}
        transition={{
            duration:.8
    }}
      >

        <span className="hero-badge">
            Multimodal AI Interview Intelligence Platform
        </span>

        <h1>
          Prepare Smarter.
          <br />
          Perform Better.
        </h1>

        <p>
          Ascendra is an AI-powered placement readiness platform that combines NLP, Deep Learning, Computer Vision, 
          and Speech Intelligence to simulate real interviews, assess technical and communication skills, 
          and generate personalized feedback with adaptive learning roadmaps.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Watch Demo
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <h2>10+</h2>
            <span>AI Modules</span>
          </div>

          <div>
            <h2>7</h2>
            <span>Assessment Types</span>
          </div>

          <div>
            <h2>100%</h2>
            <span>Personalized Feedback</span>
          </div>

        </div>

      </motion.div>

      <motion.div
    className="hero-right"
    initial={{opacity:0,x:60}}
    animate={{opacity:1,x:0}}
    transition={{
        delay:.3,
        duration:.8
    }}
>

        <DashboardPreview />

      </motion.div>

    </section>
  );
};

export default Hero;