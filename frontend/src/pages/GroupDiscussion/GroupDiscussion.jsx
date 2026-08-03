import "./GroupDiscussion.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import {
    Users,
    Bot,
    PlusCircle,
    Link2,
    Play,
    ArrowLeft,
    Building2,
    Globe,
    Clock,
    Languages,
    Brain,
    Copy
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GroupDiscussion = () => {

    const navigate = useNavigate();

    const [mode, setMode] = useState("create");

    return (

        <DashboardLayout>

            <div className="gd-page">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft size={18}/>
                    Back to Dashboard
                </button>

                <div className="gd-header">

                    <h1>

                        <Users/>

                        Group Discussion Arena

                    </h1>

                    <p>

                        Practice real-world group discussions with friends,
                        AI participants or company-specific GD simulations.

                    </p>

                </div>

                <div className="gd-mode-grid">

                    <div
                        className={`gd-mode-card ${mode==="create"?"active":""}`}
                        onClick={()=>setMode("create")}
                    >

                        <PlusCircle size={42}/>

                        <h2>Create Discussion</h2>

                        <p>Create a room and invite participants.</p>

                    </div>

                    <div
                        className={`gd-mode-card ${mode==="join"?"active":""}`}
                        onClick={()=>setMode("join")}
                    >

                        <Link2 size={42}/>

                        <h2>Join Discussion</h2>

                        <p>Enter invite code or room link.</p>

                    </div>

                    <div
                        className={`gd-mode-card ${mode==="ai"?"active":""}`}
                        onClick={()=>setMode("ai")}
                    >

                        <Bot size={42}/>

                        <h2>Join AI Discussion</h2>

                        <p>Practice anytime with intelligent AI participants.</p>

                    </div>

                </div>

                <div className="gd-config-card">

                    <h2>Discussion Configuration</h2>

                    <div className="gd-form">

                        <div>

                            <label>

                                <Brain size={18}/>

                                Topic

                            </label>

                            <input
                                placeholder="Eg. Is AI replacing Software Engineers?"
                            />

                        </div>

                        <div>

                            <label>

                                <Building2 size={18}/>

                                Company Mode

                            </label>

                            <select>

                                <option>General Discussion</option>

                                <option>Deloitte</option>

                                <option>Accenture</option>

                                <option>EY</option>

                                <option>PwC</option>

                                <option>Infosys</option>

                                <option>TCS</option>

                            </select>

                        </div>

                        <div>

                            <label>

                                <Users size={18}/>

                                Participants

                            </label>

                            <select>

                                <option>4</option>

                                <option>6</option>

                                <option>8</option>

                                <option>10</option>

                            </select>

                        </div>

                        <div>

                            <label>

                                <Clock size={18}/>

                                Duration

                            </label>

                            <select>

                                <option>10 Minutes</option>

                                <option>15 Minutes</option>

                                <option>20 Minutes</option>

                                <option>30 Minutes</option>

                            </select>

                        </div>

                        <div>

                            <label>

                                <Globe size={18}/>

                                Difficulty

                            </label>

                            <select>

                                <option>Easy</option>

                                <option>Medium</option>

                                <option>Hard</option>

                            </select>

                        </div>

                        <div>

                            <label>

                                <Languages size={18}/>

                                Language

                            </label>

                            <select>

                                <option>English</option>

                                <option>Hindi</option>

                                <option>Hinglish</option>

                            </select>

                        </div>

                    </div>

                    {mode==="join" && (

                        <div className="join-room">

                            <input
                                placeholder="Paste Invite Link or Room Code"
                            />

                            <button>

                                <Link2 size={18}/>

                                Join Room

                            </button>

                        </div>

                    )}

                    {mode==="create" && (

                        <div className="invite-box">

                            <span>

                                Invite Link

                            </span>

                            <div>

                                <input
                                    value="https://ascendra.ai/gd/ABCD1234"
                                    readOnly
                                />

                                <button>

                                    <Copy size={18}/>

                                </button>

                            </div>

                        </div>

                    )}

                    {mode==="ai" && (

                        <div className="ai-preview">

                            <h3>

                                AI Participants

                            </h3>

                            <div className="ai-grid">

                                <div>Aggressive Speaker</div>

                                <div>Analytical Thinker</div>

                                <div>Confident Speaker</div>

                                <div>Quiet Observer</div>

                            </div>

                        </div>

                    )}

                    <button className="start-gd">

                        <Play size={20}/>

                        Start Discussion

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default GroupDiscussion;