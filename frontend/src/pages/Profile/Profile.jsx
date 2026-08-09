import "./Profile.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import EditProfileModal from "../../components/profile/EditProfileModal/EditProfileModal";

import EditGoalsModal from "../../components/profile/EditGoalsModal/EditGoalsModal";

import { useEffect, useState } from "react";

import {
    updateProfile,
    updateSocialLinks,
    updatePlacementGoals,
    getReadiness
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


    // =====================================================
    // STATE
    // =====================================================

    const [showProfileModal, setShowProfileModal] =
        useState(false);

    const [showGoalModal, setShowGoalModal] =
        useState(false);

    const [readiness, setReadiness] =
        useState(null);


    // =====================================================
    // READINESS SCORE
    // =====================================================

    const readinessScore =
        user?.placement_readiness || 0;


    const readinessLevel =
        readinessScore >= 80
            ? "Placement Ready"
            : readinessScore >= 60
            ? "Advanced"
            : readinessScore >= 40
            ? "Intermediate"
            : readinessScore >= 20
            ? "Developing"
            : "Beginner";


    // =====================================================
    // FETCH READINESS BREAKDOWN
    // =====================================================

    useEffect(() => {

        if (!token) return;


        const fetchReadiness = async () => {

            try {

                const res =
                    await getReadiness(token);

                setReadiness(res.data);

            }

            catch (error) {

                console.error(
                    "Failed to fetch readiness:",
                    error
                );

            }

        };


        fetchReadiness();

    }, [token, user]);


    // =====================================================
    // ADD / EDIT SOCIAL LINK
    // =====================================================

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


            const res =
                await updateSocialLinks(
                    token,
                    updated
                );


            setUser(res.data);


        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to update profile."
            );

        }

    };


    // =====================================================
    // UPDATE PERSONAL PROFILE
    // =====================================================

    const handleProfileUpdate = async (data) => {

        try {

            const res =
                await updateProfile(
                    token,
                    data
                );


            setUser(res.data);

            setShowProfileModal(false);

        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to update profile."
            );

        }

    };


    // =====================================================
    // UPDATE PLACEMENT GOALS
    // =====================================================

    const handleGoalUpdate = async (data) => {

        try {

            const res =
                await updatePlacementGoals(
                    token,
                    data
                );


            setUser(res.data);

            setShowGoalModal(false);

        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to update goals."
            );

        }

    };


    // =====================================================
    // READINESS BREAKDOWN DATA
    // =====================================================

    const breakdownItems = readiness
        ? [

            {
                label: "Profile",
                score: readiness.breakdown.profile.score,
                max: readiness.breakdown.profile.max
            },

            {
                label: "Professional Profiles",
                score: readiness.breakdown.professional.score,
                max: readiness.breakdown.professional.max
            },

            {
                label: "Placement Goals",
                score: readiness.breakdown.placement_goals.score,
                max: readiness.breakdown.placement_goals.max
            },

            {
                label: "Resume",
                score: readiness.breakdown.resume.score,
                max: readiness.breakdown.resume.max
            },

            {
                label: "Coding",
                score: readiness.breakdown.coding.score,
                max: readiness.breakdown.coding.max
            },

            {
                label: "Interview",
                score: readiness.breakdown.interview.score,
                max: readiness.breakdown.interview.max
            },

            {
                label: "Group Discussion",
                score: readiness.breakdown.group_discussion.score,
                max: readiness.breakdown.group_discussion.max
            },

            {
                label: "Roadmap",
                score: readiness.breakdown.roadmap.score,
                max: readiness.breakdown.roadmap.max
            }

        ]
        : [];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <DashboardLayout>

            <div className="profile-page">


                {/* =================================================
                    PROFILE HEADER
                ================================================= */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        <User size={48} />

                    </div>


                    <div className="profile-heading">

                        <h1>

                            {user?.full_name}

                        </h1>


                        <p>

                            Complete your profile to improve
                            your placement readiness.

                        </p>

                    </div>

                </div>


                {/* =================================================
                    PLACEMENT READINESS
                ================================================= */}

                <div className="profile-card readiness-card">

                    <div>

                        <h2>
                            Placement Readiness
                        </h2>


                        <p>

                            Your readiness score is calculated
                            from your profile, resume, coding,
                            interview, GD and placement preparation.

                        </p>

                    </div>


                    <div className="readiness-score">

                        <h1>

                            {readinessScore}%

                        </h1>


                        <span>

                            {readinessLevel}

                        </span>

                    </div>


                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${readinessScore}%`
                            }}
                        />

                    </div>

                </div>


                {/* =================================================
                    PROFILE GRID
                ================================================= */}

                <div className="profile-grid">


                    {/* =================================================
                        READINESS BREAKDOWN
                    ================================================= */}

                    <div className="profile-card readiness-breakdown full-width">

                        <div className="profile-card-header">

                            <div>

                                <h2>
                                    Readiness Breakdown
                                </h2>


                                <p>

                                    See what's contributing to
                                    your placement readiness.

                                </p>

                            </div>

                        </div>


                        {readiness && (

                            <div className="breakdown-list">

                                {breakdownItems.map(
                                    (item) => {

                                        const percentage =
                                            item.max > 0
                                                ? (
                                                    item.score /
                                                    item.max
                                                ) * 100
                                                : 0;


                                        return (

                                            <div
                                                className="breakdown-item"
                                                key={item.label}
                                            >

                                                <div className="breakdown-info">

                                                    <span>

                                                        {item.label}

                                                    </span>


                                                    <strong>

                                                        {item.score}
                                                        /
                                                        {item.max}

                                                    </strong>

                                                </div>


                                                <div className="breakdown-bar">

                                                    <div
                                                        style={{
                                                            width: `${percentage}%`
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        )}


                        {!readiness && (

                            <p className="breakdown-loading">

                                Loading readiness breakdown...

                            </p>

                        )}

                    </div>


                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

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
                                onClick={() =>
                                    setShowProfileModal(true)
                                }
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


                    {/* =================================================
                        PROFESSIONAL PROFILES
                    ================================================= */}

                    <div className="profile-card">

                        <h2>
                            Professional Profiles
                        </h2>


                        {/* LinkedIn */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaLinkedin
                                    className="profile-icon"
                                />


                                <div>

                                    <h4>
                                        LinkedIn
                                    </h4>


                                    {user?.linkedin ? (

                                        <p className="saved-link">

                                            {user.linkedin}

                                        </p>

                                    ) : (

                                        <p>

                                            Add your LinkedIn profile
                                            to showcase your professional
                                            presence.

                                        </p>

                                    )}

                                </div>

                            </div>


                            <button
                                className="profile-btn"
                                onClick={() =>
                                    handleAddLink("linkedin")
                                }
                            >

                                {user?.linkedin
                                    ? "Edit"
                                    : "Add"
                                }

                            </button>

                        </div>


                        {/* GitHub */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaGithub
                                    className="profile-icon"
                                />


                                <div>

                                    <h4>
                                        GitHub
                                    </h4>


                                    {user?.github ? (

                                        <p className="saved-link">

                                            {user.github}

                                        </p>

                                    ) : (

                                        <p>

                                            Connect your GitHub profile
                                            to showcase your repositories
                                            and projects.

                                        </p>

                                    )}

                                </div>

                            </div>


                            <button
                                className="profile-btn"
                                onClick={() =>
                                    handleAddLink("github")
                                }
                            >

                                {user?.github
                                    ? "Edit"
                                    : "Add"
                                }

                            </button>

                        </div>


                        {/* Portfolio */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaGlobe
                                    className="profile-icon"
                                />


                                <div>

                                    <h4>
                                        Portfolio
                                    </h4>


                                    {user?.portfolio ? (

                                        <p className="saved-link">

                                            {user.portfolio}

                                        </p>

                                    ) : (

                                        <p>

                                            Add your personal portfolio
                                            website to impress recruiters.

                                        </p>

                                    )}

                                </div>

                            </div>


                            <button
                                className="profile-btn"
                                onClick={() =>
                                    handleAddLink("portfolio")
                                }
                            >

                                {user?.portfolio
                                    ? "Edit"
                                    : "Add"
                                }

                            </button>

                        </div>


                        {/* LeetCode */}

                        <div className="link-row">

                            <div className="link-left">

                                <FaLaptopCode
                                    className="profile-icon"
                                />


                                <div>

                                    <h4>
                                        LeetCode
                                    </h4>


                                    {user?.leetcode ? (

                                        <p className="saved-link">

                                            {user.leetcode}

                                        </p>

                                    ) : (

                                        <p>

                                            Showcase your coding journey
                                            through your LeetCode profile.

                                        </p>

                                    )}

                                </div>

                            </div>


                            <button
                                className="profile-btn"
                                onClick={() =>
                                    handleAddLink("leetcode")
                                }
                            >

                                {user?.leetcode
                                    ? "Edit"
                                    : "Add"
                                }

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        PLACEMENT GOALS
                    ================================================= */}

                    <div className="profile-card">

                        <div className="profile-card-header">

                            <h2>
                                Placement Goals
                            </h2>


                            <button
                                className="profile-btn"
                                onClick={() =>
                                    setShowGoalModal(true)
                                }
                            >

                                Edit

                            </button>

                        </div>


                        <div className="detail-item">

                            <label>
                                Dream Company
                            </label>

                            <span>

                                {user?.dream_company ||
                                    "Not Selected"}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                Target Role
                            </label>

                            <span>

                                {user?.target_role ||
                                    "Not Selected"}

                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                Preferred Domain
                            </label>

                            <span>

                                {user?.preferred_domain ||
                                    "Not Selected"}

                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        STATISTICS
                    ================================================= */}

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


                    {/* =================================================
                        RECENT ACTIVITY
                    ================================================= */}

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


                    {/* =================================================
                        ACHIEVEMENTS
                    ================================================= */}

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


                    {/* =================================================
                        AI INSIGHTS
                    ================================================= */}

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
                                Generate your roadmap to unlock
                                AI insights.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                EDIT PROFILE MODAL
            ================================================= */}

            {showProfileModal && (

                <EditProfileModal

                    user={user}

                    onClose={() =>
                        setShowProfileModal(false)
                    }

                    onSave={handleProfileUpdate}

                />

            )}


            {/* =================================================
                EDIT GOALS MODAL
            ================================================= */}

            {showGoalModal && (

                <EditGoalsModal

                    user={user}

                    onClose={() =>
                        setShowGoalModal(false)
                    }

                    onSave={handleGoalUpdate}

                />

            )}

        </DashboardLayout>

    );

};


export default Profile;