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


const ForgotPassword = () => {

    const navigate = useNavigate();

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
                "Please enter your email address."
            );

            return;

        }

        setLoading(true);

        try {

            await forgotPassword(email);

            toast.success(
                "If the email is registered, an OTP has been sent."
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
                "A new OTP has been sent to your email."
            );

            // Clear old OTP
            setOtp("");

            // Restart 5-minute timer
            setResendTimer(300);

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Unable to resend OTP."
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
                "Enter the 6-digit OTP."
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
                "OTP verified successfully."
            );

            setStep(3);

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Invalid or expired OTP."
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
                "Password must be at least 8 characters."
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error(
                "Passwords do not match."
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
                "Password reset successfully!"
            );

            navigate("/login");

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Unable to reset password."
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

                Back to Login

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

                            Forgot Password?

                        </h1>


                        <p>

                            Enter your registered email
                            address. We'll send you a
                            6-digit OTP to reset your password.

                        </p>


                        <div className="input-box">

                            <Mail size={18} />

                            <input
                                type="email"
                                placeholder="Enter your email"
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
                                ? "Sending..."
                                : "Send OTP"
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

                            Verify OTP

                        </h1>


                        <p>

                            We've sent a 6-digit OTP to:

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
                                placeholder="Enter 6-digit OTP"
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
                                ? "Verifying..."
                                : "Verify OTP"
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
                                : "Resend OTP"
                            }

                        </button>


                        {/* CHANGE EMAIL */}

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleChangeEmail}
                        >

                            Change Email

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

                            Create New Password

                        </h1>


                        <p>

                            Your OTP has been verified.
                            Create a new password for your account.

                        </p>


                        {/* NEW PASSWORD */}

                        <div className="input-box">

                            <LockKeyhole size={18} />

                            <input
                                type="password"
                                placeholder="New password"
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
                                placeholder="Confirm new password"
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
                                ? "Resetting..."
                                : "Reset Password"
                            }

                        </button>

                    </form>

                )}

            </div>

        </div>

    );

};


export default ForgotPassword;