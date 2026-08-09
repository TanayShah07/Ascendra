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
import { useLanguage } from "../../context/LanguageContext";


const GroupDiscussion = () => {

    const navigate = useNavigate();

    const [mode, setMode] = useState("create");

    const { t } = useLanguage();


    return (

        <DashboardLayout>

            <div className="gd-page">

                {/* ================= BACK BUTTON ================= */}

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >

                    <ArrowLeft size={18} />

                    {t("groupDiscussion.backToInterview")}

                </button>


                {/* ================= HEADER ================= */}

                <div className="gd-header">

                    <h1>

                        <Users />

                        {t("groupDiscussion.title")}

                    </h1>

                    <p>

                        {t("groupDiscussion.description")}

                    </p>

                </div>


                {/* ================= MODE SELECTION ================= */}

                <div className="gd-mode-grid">


                    {/* CREATE */}

                    <div
                        className={`gd-mode-card ${
                            mode === "create" ? "active" : ""
                        }`}
                        onClick={() => setMode("create")}
                    >

                        <PlusCircle size={42} />

                        <h2>
                            {t("groupDiscussion.title")}
                        </h2>

                        <p>
                            {t("groupDiscussion.description")}
                        </p>

                    </div>


                    {/* JOIN */}

                    <div
                        className={`gd-mode-card ${
                            mode === "join" ? "active" : ""
                        }`}
                        onClick={() => setMode("join")}
                    >

                        <Link2 size={42} />

                        <h2>
                            {t("groupDiscussion.peerDiscussion")}
                        </h2>

                        <p>
                            {t("groupDiscussion.peerDiscussionDescription")}
                        </p>

                    </div>


                    {/* AI */}

                    <div
                        className={`gd-mode-card ${
                            mode === "ai" ? "active" : ""
                        }`}
                        onClick={() => setMode("ai")}
                    >

                        <Bot size={42} />

                        <h2>
                            {t("groupDiscussion.aiDiscussion")}
                        </h2>

                        <p>
                            {t("groupDiscussion.aiDiscussionDescription")}
                        </p>

                    </div>

                </div>


                {/* ================= CONFIGURATION ================= */}

                <div className="gd-config-card">

                    <h2>
                        {t("groupDiscussion.selectMode")}
                    </h2>


                    <div className="gd-form">


                        {/* TOPIC */}

                        <div>

                            <label>

                                <Brain size={18} />

                                {t("groupDiscussion.topic")}

                            </label>

                            <input
                                type="text"
                                placeholder={
                                    t(
                                        "groupDiscussion.enterTopic"
                                    )
                                }
                            />

                        </div>


                        {/* COMPANY */}

                        <div>

                            <label>

                                <Building2 size={18} />

                                {t("groupDiscussion.company")}

                            </label>

                            <select>

                                <option value="">

                                    {t(
                                        "groupDiscussion.selectCompany"
                                    )}

                                </option>

                                <option>
                                    Deloitte
                                </option>

                                <option>
                                    Accenture
                                </option>

                                <option>
                                    EY
                                </option>

                                <option>
                                    PwC
                                </option>

                                <option>
                                    Infosys
                                </option>

                                <option>
                                    TCS
                                </option>

                            </select>

                        </div>


                        {/* PARTICIPANTS */}

                        <div>

                            <label>

                                <Users size={18} />

                                {t(
                                    "groupDiscussion.participants"
                                )}

                            </label>

                            <select>

                                <option value="">

                                    {t(
                                        "groupDiscussion.participants"
                                    )}

                                </option>

                                <option>
                                    4
                                </option>

                                <option>
                                    6
                                </option>

                                <option>
                                    8
                                </option>

                                <option>
                                    10
                                </option>

                            </select>

                        </div>


                        {/* DURATION */}

                        <div>

                            <label>

                                <Clock size={18} />

                                {t(
                                    "groupDiscussion.duration"
                                )}

                            </label>

                            <select>

                                <option value="">

                                    {t(
                                        "groupDiscussion.duration"
                                    )}

                                </option>

                                <option>
                                    10 minutes
                                </option>

                                <option>
                                    15 minutes
                                </option>

                                <option>
                                    20 minutes
                                </option>

                                <option>
                                    30 minutes
                                </option>

                            </select>

                        </div>


                        {/* DIFFICULTY */}

                        <div>

                            <label>

                                <Globe size={18} />

                                {t(
                                    "groupDiscussion.difficulty"
                                )}

                            </label>

                            <select>

                                <option value="">

                                    {t(
                                        "groupDiscussion.difficulty"
                                    )}

                                </option>

                                <option>
                                    {t(
                                        "groupDiscussion.easy"
                                    )}
                                </option>

                                <option>
                                    {t(
                                        "groupDiscussion.medium"
                                    )}
                                </option>

                                <option>
                                    {t(
                                        "groupDiscussion.hard"
                                    )}
                                </option>

                            </select>

                        </div>


                        {/* LANGUAGE */}

                        <div>

                            <label>

                                <Languages size={18} />

                                {t(
                                    "groupDiscussion.language"
                                )}

                            </label>

                            <select>

                                <option value="">

                                    {t(
                                        "groupDiscussion.language"
                                    )}

                                </option>

                                <option>
                                    English
                                </option>

                                <option>
                                    Hindi
                                </option>

                                <option>
                                    Hinglish
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ================= JOIN ROOM ================= */}

                    {mode === "join" && (

                        <div className="join-room">

                            <input
                                type="text"
                                placeholder={
                                    t(
                                        "groupDiscussion.enterRoomCode"
                                    )
                                }
                            />

                            <button>

                                <Link2 size={18} />

                                {t(
                                    "groupDiscussion.joinRoom"
                                )}

                            </button>

                        </div>

                    )}


                    {/* ================= CREATE INVITE ================= */}

                    {mode === "create" && (

                        <div className="invite-box">

                            <span>

                                {t(
                                    "groupDiscussion.copyInvite"
                                )}

                            </span>

                            <div>

                                <input
                                    value="https://ascendra.ai/gd/ABCD1234"
                                    readOnly
                                />

                                <button
                                    type="button"
                                    title={
                                        t(
                                            "groupDiscussion.copyInvite"
                                        )
                                    }
                                >

                                    <Copy size={18} />

                                </button>

                            </div>

                        </div>

                    )}


                    {/* ================= AI PREVIEW ================= */}

                    {mode === "ai" && (

                        <div className="ai-preview">

                            <h3>

                                {t(
                                    "groupDiscussion.aiParticipants"
                                )}

                            </h3>

                            <div className="ai-grid">

                                <div>

                                    {t(
                                        "groupDiscussion.communication"
                                    )}

                                </div>

                                <div>

                                    {t(
                                        "groupDiscussion.confidence"
                                    )}

                                </div>

                                <div>

                                    {t(
                                        "groupDiscussion.teamwork"
                                    )}

                                </div>

                                <div>

                                    {t(
                                        "groupDiscussion.relevance"
                                    )}

                                </div>

                            </div>

                        </div>

                    )}


                    {/* ================= START ================= */}

                    <button className="start-gd">

                        <Play size={20} />

                        {t(
                            "groupDiscussion.startDiscussion"
                        )}

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};


export default GroupDiscussion;