import "./Settings.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Palette,
    Languages,
    LockKeyhole,
    Target,
    ShieldCheck,
    LogOut,
    Download
} from "lucide-react";

import { useState } from "react";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import {
    changePassword,
    exportUserData
} from "../../services/authService";

const Settings = () => {

    const { logout } = useAuth();

    const { theme, changeTheme } = useTheme();

    const {
        language,
        changeLanguage,
        t
    } = useLanguage();

    const [
        exportLoading,
        setExportLoading
    ] = useState(false);

    // =====================================================
    // CHANGE PASSWORD STATE
    // =====================================================

    const [
        showPasswordForm,
        setShowPasswordForm
    ] = useState(false);

    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");

    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const [
        passwordLoading,
        setPasswordLoading
    ] = useState(false);

    // =====================================================
    // PREPARATION PREFERENCES
    // =====================================================

    const [
        dailyGoal,
        setDailyGoal
    ] = useState(
        () =>
            localStorage.getItem(
                "ascendra_daily_goal"
            ) || "1"
    );

    const [
        difficulty,
        setDifficulty
    ] = useState(
        () =>
            localStorage.getItem(
                "ascendra_difficulty"
            ) || "medium"
    );

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    const handleChangePassword = async (e) => {

        e.preventDefault();

        if (!currentPassword) {

            toast.error(
                t("settings.currentPasswordRequired")
            );

            return;

        }

        if (!newPassword) {

            toast.error(
                t("settings.newPasswordRequired")
            );

            return;

        }

        if (newPassword.length < 8) {

            toast.error(
                t("settings.passwordLength")
            );

            return;

        }

        if (
            newPassword !==
            confirmPassword
        ) {

            toast.error(
                t("settings.passwordMismatch")
            );

            return;

        }

        if (
            currentPassword ===
            newPassword
        ) {

            toast.error(
                t("settings.newPasswordDifferent")
            );

            return;

        }

        setPasswordLoading(true);

        try {

            await changePassword({

                current_password:
                    currentPassword,

                new_password:
                    newPassword

            });

            toast.success(
                t("settings.passwordChanged")
            );

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

            setShowPasswordForm(false);

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                t(
                    "settings.passwordChangeFailed"
                )

            );

        }

        finally {

            setPasswordLoading(false);

        }

    };

    // =====================================================
    // PREPARATION PREFERENCES
    // =====================================================

    const handleDailyGoalChange = (value) => {

        setDailyGoal(value);

        localStorage.setItem(
            "ascendra_daily_goal",
            value
        );

    };

    const handleDifficultyChange = (value) => {

        setDifficulty(value);

        localStorage.setItem(
            "ascendra_difficulty",
            value
        );

    };

    // =====================================================
// EXPORT DATA
// =====================================================

const handleExportData = async (format) => {

    setExportLoading(true);

    try {

        const response =
            await exportUserData(format);

        const blob =
            response.data;

        const url =
            window.URL.createObjectURL(
                blob
            );

        const link =
            document.createElement("a");

        link.href = url;

        const extension =
            format === "excel"
                ? "xlsx"
                : format;

        link.download =
            `Ascendra_Data.${extension}`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

        toast.success(
            t("settings.exportSuccess")
        );

    } catch (error) {

        console.error(
            "Export error:",
            error
        );

        toast.error(
            t("settings.exportFailed")
        );

    } finally {

        setExportLoading(false);

    }
};

    // =====================================================
    // RENDER
    // =====================================================

    return (

        <DashboardLayout>

            <div className="settings-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="settings-header">

                    <h1>
                        {t("settings.title")}
                    </h1>

                    <p>
                        {t("settings.subtitle")}
                    </p>

                </div>


                {/* =================================================
                    APPEARANCE
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <Palette size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.appearance"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.appearanceDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    <div className="settings-options">

                        <button
                            type="button"
                            className={
                                theme === "light"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() =>
                                changeTheme("light")
                            }
                        >

                            <span>
                                ☀️{" "}
                                {t(
                                    "settings.light"
                                )}
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                theme === "dark"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() =>
                                changeTheme("dark")
                            }
                        >

                            <span>
                                🌙{" "}
                                {t(
                                    "settings.dark"
                                )}
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                theme === "system"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() =>
                                changeTheme("system")
                            }
                        >

                            <span>
                                💻{" "}
                                {t(
                                    "settings.system"
                                )}
                            </span>

                        </button>

                    </div>

                </div>


                {/* =================================================
                    LANGUAGE
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <Languages size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.language"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.languageDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    <select
                        className="settings-select"
                        value={language}
                        onChange={(e) =>
                            changeLanguage(
                                e.target.value
                            )
                        }
                    >

                        <option value="en-US">
                            🇺🇸 English (US)
                        </option>

                        <option value="hi">
                            🇮🇳 हिन्दी
                        </option>

                    </select>

                </div>


                {/* =================================================
                    CHANGE PASSWORD
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <LockKeyhole size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.changePassword"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.changePasswordDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    {!showPasswordForm && (

                        <button
                            type="button"
                            className="settings-action-btn"
                            onClick={() =>
                                setShowPasswordForm(
                                    true
                                )
                            }
                        >

                            {t(
                                "settings.changePassword"
                            )}

                        </button>

                    )}


                    {showPasswordForm && (

                        <form
                            className="password-form"
                            onSubmit={
                                handleChangePassword
                            }
                        >

                            <div className="password-field">

                                <label>
                                    {t(
                                        "settings.currentPassword"
                                    )}
                                </label>

                                <input
                                    type="password"
                                    value={
                                        currentPassword
                                    }
                                    onChange={(e) =>
                                        setCurrentPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder={t(
                                        "settings.currentPasswordPlaceholder"
                                    )}
                                    autoComplete="current-password"
                                />

                            </div>


                            <div className="password-field">

                                <label>
                                    {t(
                                        "settings.newPassword"
                                    )}
                                </label>

                                <input
                                    type="password"
                                    value={
                                        newPassword
                                    }
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder={t(
                                        "settings.newPasswordPlaceholder"
                                    )}
                                    autoComplete="new-password"
                                />

                            </div>


                            <div className="password-field">

                                <label>
                                    {t(
                                        "settings.confirmPassword"
                                    )}
                                </label>

                                <input
                                    type="password"
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder={t(
                                        "settings.confirmPasswordPlaceholder"
                                    )}
                                    autoComplete="new-password"
                                />

                            </div>


                            <div className="password-actions">

                                <button
                                    type="submit"
                                    className="settings-action-btn"
                                    disabled={
                                        passwordLoading
                                    }
                                >

                                    {passwordLoading
                                        ? t(
                                            "settings.changingPassword"
                                        )
                                        : t(
                                            "settings.savePassword"
                                        )
                                    }

                                </button>


                                <button
                                    type="button"
                                    className="secondary-settings-btn"
                                    onClick={() => {

                                        setShowPasswordForm(
                                            false
                                        );

                                        setCurrentPassword(
                                            ""
                                        );

                                        setNewPassword(
                                            ""
                                        );

                                        setConfirmPassword(
                                            ""
                                        );

                                    }}
                                >

                                    {t(
                                        "settings.cancel"
                                    )}

                                </button>

                            </div>

                        </form>

                    )}

                </div>


                {/* =================================================
                    PREPARATION PREFERENCES
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <Target size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.preparationPreferences"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.preparationPreferencesDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    <div className="preference-grid">

                        <div className="preference-item">

                            <label>
                                {t(
                                    "settings.dailyGoal"
                                )}
                            </label>

                            <select
                                value={dailyGoal}
                                onChange={(e) =>
                                    handleDailyGoalChange(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="0.5">
                                    {t(
                                        "settings.thirtyMinutes"
                                    )}
                                </option>

                                <option value="1">
                                    {t(
                                        "settings.oneHour"
                                    )}
                                </option>

                                <option value="2">
                                    {t(
                                        "settings.twoHours"
                                    )}
                                </option>

                                <option value="3">
                                    {t(
                                        "settings.threePlusHours"
                                    )}
                                </option>

                            </select>

                        </div>


                        <div className="preference-item">

                            <label>
                                {t(
                                    "settings.difficulty"
                                )}
                            </label>

                            <select
                                value={difficulty}
                                onChange={(e) =>
                                    handleDifficultyChange(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="easy">
                                    {t(
                                        "settings.easy"
                                    )}
                                </option>

                                <option value="medium">
                                    {t(
                                        "settings.medium"
                                    )}
                                </option>

                                <option value="hard">
                                    {t(
                                        "settings.hard"
                                    )}
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PRIVACY
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <ShieldCheck size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.privacyData"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.privacyDataDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    <div className="privacy-row">

                        <div>

                            <strong>
                                {t(
                                    "settings.personalization"
                                )}
                            </strong>

                            <span>
                                {t(
                                    "settings.personalizationDescription"
                                )}
                            </span>

                        </div>

                    </div>


                    <div className="export-actions">

                        <button
                            type="button"
                            className="secondary-settings-btn"
                            disabled={exportLoading}
                            onClick={() =>
                                handleExportData("xlsx")
                            }
                        >

                            <Download size={17} />

                            {t("settings.exportExcel")}

                        </button>


                        <button
                            type="button"
                            className="secondary-settings-btn"
                            disabled={exportLoading}
                            onClick={() =>
                                handleExportData("csv")
                            }
                        >

                            <Download size={17} />

                            {t("settings.exportCsv")}

                        </button>


                        <button
                            type="button"
                            className="secondary-settings-btn"
                            disabled={exportLoading}
                            onClick={() =>
                                handleExportData("pdf")
                            }
                        >

                            <Download size={17} />

                            {t("settings.exportPdf")}

                        </button>

                    </div>

                </div>


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <div className="settings-card logout-card">

                    <div className="settings-card-header">

                        <div className="settings-icon logout-icon">

                            <LogOut size={22} />

                        </div>

                        <div>

                            <h2>
                                {t(
                                    "settings.logout"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "settings.logoutDescription"
                                )}
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="logout-settings-btn"
                        onClick={logout}
                    >

                        <LogOut size={18} />

                        {t(
                            "settings.logout"
                        )}

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default Settings;