import "./ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Mail,
    ShieldCheck
} from "lucide-react";

import toast from "react-hot-toast";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        toast.success(
            "OTP functionality will be connected on Day 6."
        );

    };

    return (

        <div className="forgot-page">

            <button

                className="back-btn"

                onClick={() => navigate("/login")}

            >

                <ArrowLeft size={18}/>

                Back to Login

            </button>

            <form

                className="forgot-card"

                onSubmit={handleSubmit}

            >

                <div className="forgot-icon">

                    <ShieldCheck size={42}/>

                </div>

                <h1>

                    Forgot Password?

                </h1>

                <p>

                    Enter your registered email address.
                    We'll send you an OTP to reset your password.

                </p>

                <div className="input-box">

                    <Mail size={18}/>

                    <input

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                        required

                    />

                </div>

                <button

                    className="send-btn"

                >

                    Send OTP

                </button>

            </form>

        </div>

    );

};

export default ForgotPassword;