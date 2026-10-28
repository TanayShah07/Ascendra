import "./MetricRow.css";
import { motion } from "framer-motion";

const MetricRow = ({ icon, label, value, delay }) => {
  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="metric-header">
        <div className="metric-icon">
          {icon}
        </div>

        <span>{label}</span>
      </div>

      <h3>{value}</h3>
    </motion.div>
  );
};

export default MetricRow;