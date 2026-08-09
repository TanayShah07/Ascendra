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

import { useLanguage } from "../../context/LanguageContext";


const Profile = () => {

    const {
        user,
        token,
        setUser
    } = useAuth();

    const { t } = useLanguage();


    const [showProfileModal, setShowProfileModal] =
        useState(false);

    const [showGoalModal, setShowGoalModal] =
        useState(false);

    const [readiness, setReadiness] =
        useState(null);


    const readinessScore =
        user?.placement_readiness || 0;


    const readinessLevel =
        readinessScore >= 80
            ? t("profile.placementReady")
            : readinessScore >= 60
            ? t("profile.advanced")
            : readinessScore >= 40
            ? t("profile.intermediate")
            : readinessScore >= 20
            ? t("profile.developing")
            : t("profile.beginner");


    useEffect(() => {

        if (!token) return;

        const fetchReadiness = async () => {

            try {

                const res =
                    await getReadiness(token);

                setReadiness(res.data);

            } catch (error) {

                console.error(
                    "Failed to fetch readiness:",
                    error
                );

            }

        };

        fetchReadiness();

    }, [token, user]);


    const handleAddLink = async (platform) => {

        const url = prompt(
            `${t("profile.enterProfileUrl")} ${platform}`
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

        } catch (err) {

            console.error(err);

            alert(
                t("profile.updateProfileError")
            );

        }

    };


    const handleProfileUpdate = async (data) => {

        try {

            const res =
                await updateProfile(
                    token,
                    data
                );

            setUser(res.data);

            setShowProfileModal(false);

        } catch (err) {

            console.error(err);

            alert(
                t("profile.updateProfileError")
            );

        }

    };


    const handleGoalUpdate = async (data) => {

        try {

            const res =
                await updatePlacementGoals(
                    token,
                    data
                );

            setUser(res.data);

            setShowGoalModal(false);

        } catch (err) {

            console.error(err);

            alert(
                t("profile.updateGoalsError")
            );

        }

    };


    const breakdownItems = readiness
        ? [

            {
                label: t("profile.profile"),
                score: readiness.breakdown.profile.score,
                max: readiness.breakdown.profile.max
            },

            {
                label: t("profile.professionalProfiles"),
                score: readiness.breakdown.professional.score,
                max: readiness.breakdown.professional.max
            },

            {
                label: t("profile.placementGoals"),
                score: readiness.breakdown.placement_goals.score,
                max: readiness.breakdown.placement_goals.max
            },

            {
                label: t("profile.resume"),
                score: readiness.breakdown.resume.score,
                max: readiness.breakdown.resume.max
            },

            {
                label: t("profile.coding"),
                score: readiness.breakdown.coding.score,
                max: readiness.breakdown.coding.max
            },

            {
                label: t("profile.interview"),
                score: readiness.breakdown.interview.score,
                max: readiness.breakdown.interview.max
            },

            {
                label: t("profile.groupDiscussion"),
                score: readiness.breakdown.group_discussion.score,
                max: readiness.breakdown.group_discussion.max
            },

            {
                label: t("profile.roadmap"),
                score: readiness.breakdown.roadmap.score,
                max: readiness.breakdown.roadmap.max
            }

        ]
        : [];


    return (

        <DashboardLayout>

            <div className="profile-page">


                <div className="profile-header">

                    <div className="profile-avatar">

                        <User size={48} />

                    </div>

                    <div className="profile-heading">

                        <h1>
                            {user?.full_name}
                        </h1>

                        <p>
                            {t("profile.completeProfile")}
                        </p>

                    </div>

                </div>


                <div className="profile-card readiness-card">

                    <div>

                        <h2>
                            {t("profile.placementReadiness")}
                        </h2>

                        <p>
                            {t("profile.readinessDescription")}
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


                <div className="profile-grid">


                    <div className="profile-card readiness-breakdown full-width">

                        <div className="profile-card-header">

                            <div>

                                <h2>
                                    {t("profile.readinessBreakdown")}
                                </h2>

                                <p>
                                    {t("profile.breakdownDescription")}
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
                                                        {item.score}/{item.max}
                                                    </strong>

                                                </div>

                                                <div className="breakdown-bar">

                                                    <div
                                                        style={{
                                                            width:
                                                                `${percentage}%`
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

                                {t("profile.loadingBreakdown")}

                            </p>

                        )}

                    </div>


                    <div className="profile-card">

                        <div className="profile-card-header">

                            <h2 style={{ marginBottom: 0 }}>

                                {t("profile.personalInformation")}

                            </h2>

                            <button
                                className="profile-btn"
                                onClick={() =>
                                    setShowProfileModal(true)
                                }
                            >

                                {t("profile.edit")}

                            </button>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.fullName")}
                            </label>

                            <span>
                                {user?.full_name}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.email")}
                            </label>

                            <span>
                                {user?.email}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.college")}
                            </label>

                            <span>
                                {user?.college}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.branch")}
                            </label>

                            <span>
                                {user?.branch}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.graduationYear")}
                            </label>

                            <span>
                                {user?.graduation_year}
                            </span>

                        </div>

                    </div>


                    <div className="profile-card">

                        <h2>
                            {t("profile.professionalProfiles")}
                        </h2>


                        <div className="link-row">

                            <div className="link-left">

                                <FaLinkedin className="profile-icon" />

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
                                            {t("profile.linkedinDescription")}
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
                                    ? t("profile.edit")
                                    : t("profile.add")
                                }

                            </button>

                        </div>


                        <div className="link-row">

                            <div className="link-left">

                                <FaGithub className="profile-icon" />

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
                                            {t("profile.githubDescription")}
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
                                    ? t("profile.edit")
                                    : t("profile.add")
                                }

                            </button>

                        </div>


                        <div className="link-row">

                            <div className="link-left">

                                <FaGlobe className="profile-icon" />

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
                                            {t("profile.portfolioDescription")}
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
                                    ? t("profile.edit")
                                    : t("profile.add")
                                }

                            </button>

                        </div>


                        <div className="link-row">

                            <div className="link-left">

                                <FaLaptopCode className="profile-icon" />

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
                                            {t("profile.leetcodeDescription")}
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
                                    ? t("profile.edit")
                                    : t("profile.add")
                                }

                            </button>

                        </div>

                    </div>


                    <div className="profile-card">

                        <div className="profile-card-header">

                            <h2>
                                {t("profile.placementGoals")}
                            </h2>

                            <button
                                className="profile-btn"
                                onClick={() =>
                                    setShowGoalModal(true)
                                }
                            >

                                {t("profile.edit")}

                            </button>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.dreamCompany")}
                            </label>

                            <span>
                                {user?.dream_company ||
                                    t("profile.notSelected")}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.targetRole")}
                            </label>

                            <span>
                                {user?.target_role ||
                                    t("profile.notSelected")}
                            </span>

                        </div>


                        <div className="detail-item">

                            <label>
                                {t("profile.preferredDomain")}
                            </label>

                            <span>
                                {user?.preferred_domain ||
                                    t("profile.notSelected")}
                            </span>

                        </div>

                    </div>


                    <div className="profile-card">

                        <h2>
                            {t("profile.statistics")}
                        </h2>

                        <div className="stats-grid">

                            <div>

                                <h3>0</h3>

                                <span>
                                    {t("profile.resumeUploads")}
                                </span>

                                <small>
                                    {t("profile.lastUpload")}
                                </small>

                            </div>


                            <div>

                                <h3>0</h3>

                                <span>
                                    {t("profile.interviews")}
                                </span>

                                <small>
                                    {t("profile.average")}
                                </small>

                            </div>


                            <div>

                                <h3>0</h3>

                                <span>
                                    {t("profile.coding")}
                                </span>

                                <small>
                                    {t("profile.xp")}
                                </small>

                            </div>


                            <div>

                                <h3>0</h3>

                                <span>
                                    {t("profile.gdSessions")}
                                </span>

                                <small>
                                    {t("profile.rating")}
                                </small>

                            </div>

                        </div>

                    </div>


                    <div className="profile-card">

                        <h2>
                            {t("profile.recentActivity")}
                        </h2>

                        <div className="activity">

                            <p>
                                🟢 {t("profile.joinedAscendra")}
                            </p>

                            <p>
                                📄 {t("profile.noResume")}
                            </p>

                            <p>
                                💻 {t("profile.noCoding")}
                            </p>

                            <p>
                                🎤 {t("profile.noInterviews")}
                            </p>

                        </div>

                    </div>


                    <div className="profile-card full-width">

                        <h2>
                            {t("profile.achievements")}
                        </h2>

                        <div className="achievement-grid">

                            <div>
                                🔒
                                <h4>
                                    {t("profile.firstResume")}
                                </h4>
                            </div>

                            <div>
                                🔒
                                <h4>
                                    {t("profile.firstInterview")}
                                </h4>
                            </div>

                            <div>
                                🔒
                                <h4>
                                    {t("profile.hundredCoding")}
                                </h4>
                            </div>

                            <div>
                                🔒
                                <h4>
                                    {t("profile.thirtyDayStreak")}
                                </h4>
                            </div>

                        </div>

                    </div>


                    <div className="profile-card full-width">

                        <h2>
                            {t("profile.aiInsights")}
                        </h2>

                        <div className="insight-list">

                            <p>
                                ☐ {t("profile.resumeAnalysis")}
                            </p>

                            <p>
                                ☐ {t("profile.codingPractice")}
                            </p>

                            <p>
                                ☐ {t("profile.mockInterview")}
                            </p>

                            <p>
                                ☐ {t("profile.groupDiscussion")}
                            </p>

                            <p>
                                {t("profile.generateRoadmap")}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {showProfileModal && (

                <EditProfileModal
                    user={user}
                    onClose={() =>
                        setShowProfileModal(false)
                    }
                    onSave={handleProfileUpdate}
                />

            )}


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