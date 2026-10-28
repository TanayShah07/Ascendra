import "./DashboardPreview.css";
import {
  Brain,
  Eye,
  Mic,
  FileText,
  Code2,
  CircleCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import CandidateCard from "./CandidateCard";
import MetricRow from "./MetricRow";

const DashboardPreview = () => {
  return (
    <motion.div
      className="dashboard"
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="dashboard-header">
        <div>
          <h3>AI Interview</h3>
          <span>Software Engineer</span>
        </div>

        <div className="live-status">
          <span className="live-dot"></span>
          Live
        </div>
      </div>

      <CandidateCard />

      <div className="metrics-container">

        <MetricRow
            icon={<Brain size={20} />}
            label="Emotion Analysis"
            value="😊 Calm"
            delay={0.3}
        />

        <MetricRow
            icon={<Eye size={20} />}
            label="Eye Contact"
            value="94%"
            delay={0.4}
        />

        <MetricRow
            icon={<Mic size={20} />}
            label="Voice Confidence"
            value="Excellent"
            delay={0.5}
        />

        <MetricRow
            icon={<FileText size={20} />}
            label="ATS Score"
            value="91"
            delay={0.6}
        />

        <MetricRow
            icon={<Code2 size={20} />}
            label="Coding Round"
            value="Passed"
            delay={0.7}
        />

    </div>

      <div className="overall">
        <CircleCheck size={34} color="white" />

        <div>
          <span>Interview Readiness</span>
          <h2>89%</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;