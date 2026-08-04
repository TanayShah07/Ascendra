import "./Profile.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import {
    User
} from "lucide-react";

import {
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaLaptopCode
} from "react-icons/fa";

const Profile = () => {

    const { user } = useAuth();

    const [links, setLinks] = useState({

        linkedin: "",

        github: "",

        portfolio: "",

        leetcode: ""

    });

    const handleAddLink = (platform) => {

        const url = prompt(`Enter your ${platform} profile URL`);

        if (!url) return;

        setLinks({

            ...links,

            [platform.toLowerCase()]: url

        });

    };

    return (

        <DashboardLayout>

            <div className="profile-page">

                {/* ---------------- Header ---------------- */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        <User size={48}/>

                    </div>

                    <div className="profile-heading">

                        <h1>

                            {user?.full_name}

                        </h1>

                        <p>

                            Complete your profile to improve your placement readiness.

                        </p>

                    </div>

                </div>

                <div className="profile-card readiness-card">

                    <div>

                        <h2>

                            Placement Readiness

                        </h2>

                        <p>

                            Complete more modules to improve your placement readiness.

                        </p>

                    </div>

                    <div className="readiness-score">

                        <h1>

                            0%

                        </h1>

                        <span>

                            Beginner

                        </span>

                    </div>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{width:"0%"}}
                        />

                    </div>

                </div>

                <div className="profile-grid">

                    {/* ---------------- Personal Information ---------------- */}

                    <div className="profile-card">

                        <h2>

                            Personal Information

                        </h2>

                        <div className="detail-item">

                            <label>

                                Full Name

                            </label>

                            <span>

                                {user?.full_name}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Email

                            </label>

                            <span>

                                {user?.email}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                College

                            </label>

                            <span>

                                {user?.college}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Branch

                            </label>

                            <span>

                                {user?.branch}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Graduation Year

                            </label>

                            <span>

                                {user?.graduation_year}

                            </span>

                        </div>

                    </div>

                    {/* ---------------- Professional Profiles ---------------- */}

                    <div className="profile-card">

                        <h2>

                            Professional Profiles

                        </h2>

                        {/* LinkedIn */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaLinkedin className="profile-icon"/>

                                <div>

                                    <h4>

                                        LinkedIn

                                    </h4>

                                    {

                                        links.linkedin ?

                                        <p className="saved-link">

                                            {links.linkedin}

                                        </p>

                                        :

                                        <p>

                                            Add your LinkedIn profile to showcase your professional presence.

                                        </p>

                                    }

                                </div>

                            </div>

                            <button
                                className="profile-btn"
                                onClick={() => handleAddLink("linkedin")}
                            >

                                {links.linkedin ? "Edit" : "Add"}

                            </button>

                        </div>

                        {/* GitHub */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaGithub className="profile-icon"/>

                                <div>

                                    <h4>

                                        GitHub

                                    </h4>

                                    {

                                        links.github ?

                                        <p className="saved-link">

                                            {links.github}

                                        </p>

                                        :

                                        <p>

                                            Connect your GitHub profile to showcase your repositories and projects.

                                        </p>

                                    }

                                </div>

                            </div>

                            <button
                                className="profile-btn"
                                onClick={() => handleAddLink("github")}
                            >

                                {links.github ? "Edit" : "Add"}

                            </button>

                        </div>

                        {/* Portfolio */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaGlobe className="profile-icon"/>

                                <div>

                                    <h4>

                                        Portfolio

                                    </h4>

                                    {

                                        links.portfolio ?

                                        <p className="saved-link">

                                            {links.portfolio}

                                        </p>

                                        :

                                        <p>

                                            Add your personal portfolio website to impress recruiters.

                                        </p>

                                    }

                                </div>

                            </div>

                            <button
                                className="profile-btn"
                                onClick={() => handleAddLink("portfolio")}
                            >

                                {links.portfolio ? "Edit" : "Add"}

                            </button>

                        </div>

                        {/* LeetCode */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaLaptopCode className="profile-icon"/>

                                <div>

                                    <h4>

                                        LeetCode

                                    </h4>

                                    {

                                        links.leetcode ?

                                        <p className="saved-link">

                                            {links.leetcode}

                                        </p>

                                        :

                                        <p>

                                            Showcase your coding journey through your LeetCode profile.

                                        </p>

                                    }

                                </div>

                            </div>

                            <button
                                className="profile-btn"
                                onClick={() => handleAddLink("leetcode")}
                            >

                                {links.leetcode ? "Edit" : "Add"}

                            </button>

                        </div>

                    </div>

                                        {/* ---------------- Placement Goals ---------------- */}

                    <div className="profile-card">

                        <h2>

                            Placement Goals

                        </h2>

                        <div className="detail-item">

                            <label>

                                Dream Company

                            </label>

                            <span>

                                Not Selected

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Target Role

                            </label>

                            <span>

                                Not Selected

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Preferred Domain

                            </label>

                            <span>

                                Not Selected

                            </span>

                        </div>

                    </div>

                    <div className="profile-card">

                    <h2>

                    Skills

                    </h2>

                    <div className="skills-list">

                    <span>Java</span>

                    <span>React</span>

                    <span>Python</span>

                    <span>Node.js</span>

                    <button>

                    +

                    </button>

                    </div>

                    </div>

                    {/* ---------------- Statistics ---------------- */}

                    <div className="profile-card">

                        <h2>

                            Statistics

                        </h2>

                        <div className="stats-grid">

                            <div>

                            <h3>

                            0

                            </h3>

                            <span>

                            Resume Uploads

                            </span>

                            <small>

                            Last Upload : Never

                            </small>

                            </div>

                            <div>

                            <h3>

                            0

                            </h3>

                            <span>

                            Interviews

                            </span>

                            <small>

                            Average : --

                            </small>

                            </div>

                            <div>

                            <h3>

                            0

                            </h3>

                            <span>

                            Coding

                            </span>

                            <small>

                            XP : 0

                            </small>

                            </div>

                            <div>

                            <h3>

                            0

                            </h3>

                            <span>

                            GD Sessions

                            </span>

                            <small>

                            Rating : --

                            </small>

                            </div>

                         </div>

                    </div>

                    <div className="profile-card">

                        <h2>

                        Recent Activity

                        </h2>

                        <div className="activity">

                        <p>

                        🟢 Joined Ascendra

                        </p>

                        <p>

                        📄 No resume uploaded

                        </p>

                        <p>

                        💻 No coding problems solved

                        </p>

                        <p>

                        🎤 No interviews completed

                        </p>

                        </div>

                        </div>

                    {/* ---------------- Achievements ---------------- */}

                    <div className="profile-card full-width">

                        <h2>

                            Achievements

                        </h2>

                        <div className="achievement-grid">

                            <div>

                            🔒

                            <h4>

                            First Resume Upload

                            </h4>

                            </div>

                            <div>

                            🔒

                            <h4>

                            First Interview

                            </h4>

                            </div>

                            <div>

                            🔒

                            <h4>

                            100 Coding Problems

                            </h4>

                            </div>

                            <div>

                            🔒

                            <h4>

                            30 Day Streak

                            </h4>

                            </div>

                            </div>

                    </div>

                    {/* ---------------- AI Insights ---------------- */}

                    <div className="profile-card full-width">

                        <h2>

                            AI Insights

                        </h2>

                        <div className="insight-list">

                        <p>

                        ☐ Resume Analysis

                        </p>

                        <p>

                        ☐ Coding Practice

                        </p>

                        <p>

                        ☐ Mock Interview

                        </p>

                        <p>

                        ☐ Group Discussion

                        </p>

                        <p>

                        Generate your roadmap to unlock AI insights.

                        </p>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Profile;