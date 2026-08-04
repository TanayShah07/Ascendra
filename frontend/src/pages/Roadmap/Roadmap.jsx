import "./Roadmap.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {

    Map,

    Sparkles,

    Lock

} from "lucide-react";

import { useState } from "react";

const Roadmap = () => {

    const [goal,setGoal]=useState("");

    const roadmapGenerated=false;

    return(

        <DashboardLayout>

            <div className="roadmap-page">

                <div className="roadmap-card">

                    <div className="roadmap-icon">

                        <Map size={45}/>

                    </div>

                    <h1>

                        AI Career Roadmap

                    </h1>

                    <p>

                        Generate a personalized placement roadmap using AI based on your dream role, company and current skill level.

                    </p>

                    {

                        !roadmapGenerated &&

                        <>

                            <div className="examples">

                                <span>

                                    Google SDE

                                </span>

                                <span>

                                    AI Engineer

                                </span>

                                <span>

                                    Data Scientist

                                </span>

                                <span>

                                    Full Stack Developer

                                </span>

                                <span>

                                    ML Engineer

                                </span>

                            </div>

                            <label>

                                What's your goal?

                            </label>

                            <textarea

                                value={goal}

                                onChange={(e)=>setGoal(e.target.value)}

                                placeholder="Example: I want to become an AI Engineer at NVIDIA within 8 months."

                            />

                            <button>

                                <Sparkles size={18}/>

                                Generate Roadmap

                            </button>

                        </>

                    }

                    {

                        roadmapGenerated &&

                        <div className="generated-placeholder">

                            Roadmap will appear here.

                        </div>

                    }

                </div>

                <div className="future-card">

                    <Lock/>

                    <h2>

                        AI Personalized Roadmaps

                    </h2>

                    <p>

                        Ascendra AI will generate weekly learning plans, coding schedules, interview preparation, resume milestones and personalized recommendations based on your progress.

                    </p>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Roadmap;