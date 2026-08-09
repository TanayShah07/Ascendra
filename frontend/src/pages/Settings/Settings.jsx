import "./Settings.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Palette,
    Languages,
    LockKeyhole,
    Bell,
    Target,
    ShieldCheck,
    LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
const Settings = () => {

    const { logout } = useAuth();

    const { theme, changeTheme } = useTheme();

    const { language, changeLanguage, t } = useLanguage();

    return (

        <DashboardLayout>

            <div className="settings-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="settings-header">

                    <h1>{t("settings.title")}</h1>

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

                            <h2>{t("settings.appearance")}</h2>

                           <p>
                                {t("settings.appearanceDescription")}
                            </p>

                        </div>

                    </div>


                    <div className="settings-options">

                        <button
                            className={
                                theme === "light"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() => changeTheme("light")}
                        >

                            <span>☀️ {t("settings.light")}</span>

                        </button>


                        <button
                            className={
                                theme === "dark"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() => changeTheme("dark")}
                        >

                            <span>🌙 {t("settings.dark")}</span>

                        </button>


                        <button
                            className={
                                theme === "system"
                                    ? "setting-option active"
                                    : "setting-option"
                            }
                            onClick={() => changeTheme("system")}
                        >

                            <span>💻 {t("settings.system")}</span>

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
                                {t("settings.language")}
                            </h2>

                            <p>
                                {t("settings.languageDescription")}
                            </p>

                        </div>

                    </div>


                    <select
                        value={language}
                        onChange={(e) =>
                            changeLanguage(e.target.value)
                        }
                    >

                        <option value="en-US">
                            🇺🇸 English (US)
                        </option>

                        <option value="en-GB">
                            🇬🇧 English (UK)
                        </option>

                        <option value="en-AU">
                            🇦🇺 English (Australia)
                        </option>

                        <option value="hi">
                            🇮🇳 Hindi
                        </option>

                        <option value="gu">
                            🇮🇳 Gujarati
                        </option>

                        <option value="kn">
                            🇮🇳 Kannada
                        </option>

                        <option value="ml">
                            🇮🇳 Malayalam
                        </option>

                        <option value="ta">
                            🇮🇳 Tamil
                        </option>

                        <option value="te">
                            🇮🇳 Telugu
                        </option>

                        <option value="mr">
                            🇮🇳 Marathi
                        </option>

                        <option value="pa">
                            🇮🇳 Punjabi
                        </option>

                        <option value="bn">
                            🇮🇳 Bengali
                        </option>

                        <option value="ur">
                            🇵🇰 Urdu
                        </option>

                        <option value="zh">
                            🇨🇳 Chinese
                        </option>

                        <option value="de">
                            🇩🇪 German
                        </option>

                        <option value="fr">
                            🇫🇷 French
                        </option>

                        <option value="it">
                            🇮🇹 Italian
                        </option>

                        <option value="es">
                            🇪🇸 Spanish
                        </option>

                        <option value="ko">
                            🇰🇷 Korean
                        </option>

                        <option value="ja">
                            🇯🇵 Japanese
                        </option>

                        <option value="pl">
                            🇵🇱 Polish
                        </option>

                        <option value="ru">
                            🇷🇺 Russian
                        </option>

                        <option value="pt">
                            🇵🇹 Portuguese
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
                                {t("settings.changePassword")}
                            </h2>

                            <p>
                                {t("settings.changePasswordDescription")}
                            </p>

                        </div>

                    </div>


                    <button className="settings-action-btn">

                        {t("settings.changePassword")}

                    </button>

                </div>


                {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <Bell size={22} />

                        </div>

                        <div>

                            <h2>{t("settings.notifications")}</h2>

                            <p>
                                {t("settings.notificationsDescription")}
                            </p>

                        </div>

                    </div>


                    <div className="notification-row">

                        <div>

                            <strong>
                                {t("settings.emailNotifications")}
                            </strong>

                            <span>
                                {t("settings.emailNotificationsDescription")}
                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    <div className="notification-row">

                        <div>

                            <strong>
                                {t("settings.preparationReminders")}
                            </strong>

                            <span>
                                {t("settings.preparationRemindersDescription")}
                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    <div className="notification-row">

                        <div>

                            <strong>
                                {t("settings.interviewGDReminders")}
                            </strong>

                            <span>
                                {t("settings.interviewGDRemindersDescription")}
                            </span>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

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
                                {t("settings.preparationPreferences")}
                            </h2>

                            <p>
                                {t("settings.preparationPreferencesDescription")}
                            </p>

                        </div>

                    </div>


                    <div className="preference-grid">

                        <div className="preference-item">

                            <label>
                                {t("settings.dailyPreparationGoal")}
                            </label>

                            <select>

                                <option>
                                    {t("settings.thirtyMinutes")}
                                </option>

                                <option>
                                    {t("settings.oneHour")}
                                </option>

                                <option>
                                    {t("settings.twoHours")}
                                </option>

                                <option>
                                    {t("settings.threePlusHours")}
                                </option>

                            </select>

                        </div>


                        <div className="preference-item">

                            <label>
                                {t("settings.preferredDifficulty")}
                            </label>

                            <select>

                                <option>
                                    {t("settings.easy")}
                                </option>

                                <option>
                                    {t("settings.medium")}
                                </option>

                                <option>
                                    {t("settings.hard")}
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PRIVACY & DATA
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">

                            <ShieldCheck size={22} />

                        </div>

                        <div>

                            <h2>
                                {t("settings.privacyData")}
                            </h2>

                            <p>
                                {t("settings.privacyDataDescription")}

                            </p>

                        </div>

                    </div>


                    <div className="privacy-row">

                        <div>

                            <strong>
                                {t("settings.personalization")}
                            </strong>

                            <span>
                                {t("settings.personalizationDescription")}
                            </span>

                        </div>


                        <label className="switch">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    <button className="secondary-settings-btn">

                        {t("settings.exportData")}

                    </button>

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
                                {t("settings.logout")}
                            </h2>

                            <p>
                                {t("settings.logoutDescription")}
                            </p>

                        </div>

                    </div>


                    <button
                        className="logout-settings-btn"
                        onClick={logout}
                    >

                        <LogOut size={18} />

                        {t("settings.logout")}

                    </button>

                </div>


            </div>

        </DashboardLayout>

    );

};


export default Settings;