import "./Profile.css";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../../components/profile/EditProfileModal/EditProfileModal";
import { useState } from "react";
import EditGoalsModal from "../../components/profile/EditGoalsModal/EditGoalsModal";
import {
    updateProfile,
    updateSocialLinks,
    updatePlacementGoals
} from "../../services/authService";
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

    const {

    user,

    token,

    setUser

} = useAuth();

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);

    const handleAddLink = async (platform) => {

    const url = prompt(
        `Enter your ${platform} profile URL`
    );

    if (!url) return;

    try {

        const updated = {

            linkedin: user.linkedin,

            github: user.github,

            portfolio: user.portfolio,

            leetcode: user.leetcode,

            [platform]: url

        };

        const res = await updateSocialLinks(
            token,
            updated
        );

        setUser(res.data);

    }

    catch (err) {

        console.error(err);

        alert("Unable to update profile.");

    }

};

const handleProfileUpdate = async (data) => {

    try {

        const res = await updateProfile(
            token,
            data
        );

        setUser(res.data);

        setShowProfileModal(false);

    }

    catch (err) {

        console.error(err);

        alert("Unable to update profile.");

    }

};

const handleGoalUpdate = async (data) => {

    try{

        const res = await updatePlacementGoals(
            token,
            data
        );

        setUser(res.data);

        setShowGoalModal(false);

    }

    catch(err){

        console.error(err);

        alert("Unable to update goals.");

    }

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

                        <div className="profile-card-header">

                            <h2
                                style={{
                                    marginBottom: 0
                                }}
                            >

                                Personal Information

                            </h2>

                            <button
                                className="profile-btn"
                                onClick={() => setShowProfileModal(true)}
                            >

                                Edit

                            </button>

                        </div>

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

                                        user?.linkedin ?

                                        <p className="saved-link">

                                            {user.linkedin}

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

                                {user?.linkedin ? "Edit" : "Add"}

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

                                        user?.github ?

                                        <p className="saved-link">

                                            {user.github}

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

                                {user?.github ? "Edit" : "Add"}

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

                                        user?.portfolio ?

                                        <p className="saved-link">

                                            {user.portfolio}

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

                                {user?.portfolio ? "Edit" : "Add"}

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

                                        user?.leetcode ?

                                        <p className="saved-link">

                                            {user.leetcode}

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

                                {user?.leetcode ? "Edit" : "Add"}

                            </button>

                        </div>

                    </div>

                                        {/* ---------------- Placement Goals ---------------- */}

                    {/* ---------------- Placement Goals ---------------- */}

                    <div className="profile-card">

                        <div className="profile-card-header">

                            <h2>

                                Placement Goals

                            </h2>

                            <button
                                className="profile-btn"
                                onClick={() => setShowGoalModal(true)}
                            >

                                Edit

                            </button>

                        </div>

                        <div className="detail-item">

                            <label>

                                Dream Company

                            </label>

                            <span>

                                {user?.dream_company || "Not Selected"}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Target Role

                            </label>

                            <span>

                                {user?.target_role || "Not Selected"}

                            </span>

                        </div>

                        <div className="detail-item">

                            <label>

                                Preferred Domain

                            </label>

                            <span>

                                {user?.preferred_domain || "Not Selected"}

                            </span>

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
            {

                showProfileModal && (

                <EditProfileModal

                user={user}

                onClose={() => setShowProfileModal(false)}

                onSave={handleProfileUpdate}

                />

                )

                }

                {

                    showGoalModal && (

                    <EditGoalsModal

                    user={user}

                    onClose={() => setShowGoalModal(false)}

                    onSave={handleGoalUpdate}

                    />

                    )

                    }

        </DashboardLayout>

    );

};

export default Profile;