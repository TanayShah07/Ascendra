import "./CandidateCard.css";
import { User, Briefcase } from "lucide-react";

const CandidateCard = () => {
  return (
    <div className="candidate-card">

      <div className="candidate-avatar">
        <User size={34} strokeWidth={2.2}/>
      </div>

      <div className="candidate-info">

        <h3>Tanay Shah</h3>

        <div className="candidate-role">
          <Briefcase size={15}/>
          <span>Software Engineer Interview</span>
        </div>

        <div className="progress-container">

          <div className="progress-header">

            <span>Interview Progress</span>

            <strong>82%</strong>

          </div>

          <div className="progress-bar">

            <div className="progress-fill"></div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CandidateCard;