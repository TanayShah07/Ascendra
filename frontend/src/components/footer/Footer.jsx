import "./Footer.css";
import { ArrowUp } from "lucide-react";

const Footer = () => {

    const scrollTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    return (

        <footer className="footer">

            <div className="footer-top">

                <div className="footer-intro">

                    <span className="footer-badge">
                        ASCENDRA
                    </span>

                    <h2>
                        Built for Modern Placements.
                    </h2>

                    <p>
                        One intelligent platform for Resume Analysis,
                        AI Mock Interviews, Coding Assessment,
                        Speech Intelligence, Computer Vision,
                        and Personalized Learning Roadmaps.
                    </p>

                </div>

                <div className="footer-links">

                    <h3>Explore</h3>

                    <a href="#">Home</a>
                    <a href="#features">Features</a>
                    <a href="#technology">Technology</a>
                    <a href="#about">About</a>

                </div>

                <div className="footer-links">

                    <h3>Platform</h3>

                    <a href="#">Dashboard</a>
                    <a href="#">AI Interviews</a>
                    <a href="#">Resume Analyzer</a>
                    <a href="#">Learning Roadmaps</a>

                </div>

                <div className="footer-links">

                    <h3>Coming Soon</h3>

                    <p>Company-wise Preparation</p>
                    <p>Interview Analytics</p>
                    <p>AI Career Coach</p>
                    <p>Placement Insights</p>

                </div>

            </div>

            <div className="footer-bottom">

                <span>
                    © 2026 Ascendra • AI Placement Readiness Platform
                </span>

                <button
                    className="scroll-top"
                    onClick={scrollTop}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} strokeWidth={2.5} />
                </button>

            </div>

        </footer>

    );

};

export default Footer;