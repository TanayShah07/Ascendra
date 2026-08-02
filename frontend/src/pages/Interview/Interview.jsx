import "./Interview.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { Brain, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Interview = () => {

    const navigate = useNavigate();

    return (

        <DashboardLayout>

            <div className="interview-page">

                <h1>
                    Choose Interview Mode
                </h1>

                <p>
                    Select how you'd like to practice today.
                </p>

                <div className="mode-grid">

                    <div
                        className="mode-card"
                        onClick={() => navigate("/interview/mock")}
                    >

                        <Brain size={50} />

                        <h2>
                            AI Mock Interview
                        </h2>

                        <p>
                            Practice subject-wise technical and HR interviews with AI.
                        </p>

                    </div>

                    <div
                        className="mode-card"
                        onClick={() => navigate("/interview/company")}
                    >

                        <Building2 size={50} />

                        <h2>
                            Company Specific Interview
                        </h2>

                        <p>
                            Experience interviews based on real company patterns.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Interview;