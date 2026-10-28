import "./ForgotPassword.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Mail,
    ShieldCheck,
    LockKeyhole
} from "lucide-react";

import toast from "react-hot-toast";

import {
    forgotPassword,
    verifyOtp,
    resetPassword
} from "../../services/authService";
import { useLanguage } from "../../context/LanguageContext";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const { t } = useLanguage();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [resetToken, setResetToken] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [resendTimer, setResendTimer] = useState(0);


    // =====================================================
    // OTP COUNTDOWN TIMER
    // =====================================================

    useEffect(() => {

        if (step !== 2 || resendTimer <= 0) {
            return;
        }

        const timer = setTimeout(() => {

            setResendTimer((previous) =>
                previous - 1
            );

        }, 1000);

        return () => clearTimeout(timer);

    }, [step, resendTimer]);


    // =====================================================
    // FORMAT TIMER
    // =====================================================

    const formatTimer = () => {

        const minutes = Math.floor(
            resendTimer / 60
        );

        const seconds = resendTimer % 60;

        return `${minutes}:${String(seconds).padStart(2, "0")}`;

    };


    // =====================================================
    // SEND OTP
    // =====================================================

    const handleSendOtp = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error(
                t("forgotPassword.enterEmail")
            );

            return;

        }

        setLoading(true);

        try {

            await forgotPassword(email);

            toast.success(
                t("forgotPassword.otpSent")
            );

            setOtp("");

            setStep(2);

            // 5 minutes
            setResendTimer(300);

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Unable to send OTP."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RESEND OTP
    // =====================================================

    const handleResendOtp = async () => {

        if (resendTimer > 0 || loading) {
            return;
        }

        setLoading(true);

        try {

            await forgotPassword(email);

            toast.success(
                t("forgotPassword.otpResent")
            );

            // Clear old OTP
            setOtp("");

            // Restart 5-minute timer
            setResendTimer(300);

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                t("forgotPassword.unableToResendOtp")
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // VERIFY OTP
    // =====================================================

    const handleVerifyOtp = async (e) => {

        e.preventDefault();

        if (otp.length !== 6) {

            toast.error(
                t("forgotPassword.enterValidOtp")
            );

            return;

        }

        setLoading(true);

        try {

            const res = await verifyOtp(
                email,
                otp
            );

            setResetToken(
                res.data.reset_token
            );

            toast.success(
                t("forgotPassword.otpVerified")
            );

            setStep(3);

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                t("forgotPassword.invalidOtp")
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RESET PASSWORD
    // =====================================================

    const handleResetPassword = async (e) => {

        e.preventDefault();

        if (newPassword.length < 8) {

            toast.error(
                t("forgotPassword.passwordLength")
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error(
                t("forgotPassword.passwordMismatch")
            );

            return;

        }

        setLoading(true);

        try {

            await resetPassword(
                email,
                resetToken,
                newPassword
            );

            toast.success(
                t("forgotPassword.passwordReset")
            );

            navigate("/login");

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                t("forgotPassword.unableToResetPassword")
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CHANGE EMAIL
    // =====================================================

    const handleChangeEmail = () => {

        setStep(1);

        setOtp("");

        setResetToken("");

        setResendTimer(0);

    };


    return (

        <div className="forgot-page">


            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <button
                className="back-btn"
                onClick={() => navigate("/login")}
            >

                <ArrowLeft size={18} />

                {t("forgotPassword.backToLogin")}

            </button>


            <div className="forgot-card">


                {/* =================================================
                    STEP 1 — ENTER EMAIL
                ================================================= */}

                {step === 1 && (

                    <form
                        onSubmit={handleSendOtp}
                    >

                        <div className="forgot-icon">

                            <ShieldCheck size={42} />

                        </div>


                        <h1>

                            {t("forgotPassword.forgotTitle")}

                        </h1>


                        <p>

                            {t("forgotPassword.forgotDescription")}

                        </p>


                        <div className="input-box">

                            <Mail size={18} />

                            <input
                                type="email"
                                placeholder={t("forgotPassword.emailPlaceholder")}
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="send-btn"
                            disabled={loading}
                        >

                            {loading
                                ? t("forgotPassword.sending")
                                : t("forgotPassword.sendOtp")
                            }

                        </button>

                    </form>

                )}


                {/* =================================================
                    STEP 2 — VERIFY OTP
                ================================================= */}

                {step === 2 && (

                    <form
                        onSubmit={handleVerifyOtp}
                    >

                        <div className="forgot-icon">

                            <Mail size={42} />

                        </div>


                        <h1>

                            {t("forgotPassword.verifyOtp")}

                        </h1>


                        <p>

                            {t("forgotPassword.otpSent")}

                            <br />

                            <strong>

                                {email}

                            </strong>

                        </p>


                        <div className="input-box">

                            <ShieldCheck size={18} />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder={t("forgotPassword.otpPlaceholder")}
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                required
                            />

                        </div>


                        {/* VERIFY BUTTON */}

                        <button
                            type="submit"
                            className="send-btn"
                            disabled={loading}
                        >

                            {loading
                                ? t("forgotPassword.verifying")
                                : t("forgotPassword.verifyOtp")
                            }

                        </button>


                        {/* RESEND OTP BUTTON */}

                        <button
                            type="button"
                            className={
                                resendTimer > 0
                                    ? "resend-btn disabled"
                                    : "resend-btn"
                            }
                            onClick={handleResendOtp}
                            disabled={
                                resendTimer > 0 ||
                                loading
                            }
                        >

                            {resendTimer > 0
                                ? `Resend OTP in ${formatTimer()}`
                                : t("forgotPassword.resendOtp")
                            }

                        </button>


                        {/* CHANGE EMAIL */}

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleChangeEmail}
                        >

                            {t("forgotPassword.changeEmail")}

                        </button>

                    </form>

                )}


                {/* =================================================
                    STEP 3 — RESET PASSWORD
                ================================================= */}

                {step === 3 && (

                    <form
                        onSubmit={handleResetPassword}
                    >

                        <div className="forgot-icon">

                            <LockKeyhole size={42} />

                        </div>


                        <h1>

                            {t("forgotPassword.createPassword")}

                        </h1>


                        <p>

                            {t("forgotPassword.otpVerified")}
                            {t("forgotPassword.createNewPassword")}

                        </p>


                        {/* NEW PASSWORD */}

                        <div className="input-box">

                            <LockKeyhole size={18} />

                            <input
                                type="password"
                                placeholder={t("forgotPassword.newPassword")}
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="input-box">

                            <LockKeyhole size={18} />

                            <input
                                type="password"
                                placeholder={t("forgotPassword.confirmPassword")}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* RESET BUTTON */}

                        <button
                            type="submit"
                            className="send-btn"
                            disabled={loading}
                        >

                            {loading
                                ? t("forgotPassword.resetting")
                                : t("forgotPassword.resetPassword")
                            }

                        </button>

                    </form>

                )}

            </div>

        </div>

    );

};


export default ForgotPassword;