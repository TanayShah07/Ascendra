import axios from "axios";

const API = axios.create({

    baseURL: "http://127.0.0.1:8000"

});


// =====================================================
// AUTHENTICATION
// =====================================================

export const registerUser = (data) =>

    API.post(
        "/auth/register",
        data
    );


export const loginUser = (data) =>

    API.post(
        "/auth/login",
        data
    );


// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = (email) =>

    API.post(
        "/auth/forgot-password",
        null,
        {
            params: {
                email
            }
        }
    );


export const verifyOtp = (
    email,
    otp
) =>

    API.post(
        "/auth/verify-otp",
        null,
        {
            params: {
                email,
                otp
            }
        }
    );


export const resetPassword = (
    email,
    resetToken,
    newPassword
) =>

    API.post(
        "/auth/reset-password",
        null,
        {
            params: {
                email,

                reset_token:
                    resetToken,

                new_password:
                    newPassword
            }
        }
    );


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = (
    data
) => {

    const token =
        localStorage.getItem(
            "token"
        );

    return API.post(
        "/auth/change-password",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};


// =====================================================
// PROFILE
// =====================================================

export const getProfile = (
    token
) =>

    API.get(
        "/profile",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


export const updateProfile = (
    token,
    data
) =>

    API.put(
        "/profile",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


export const updateSocialLinks = (
    token,
    data
) =>

    API.patch(
        "/profile/social",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


export const updatePlacementGoals = (
    token,
    data
) =>

    API.patch(
        "/profile/goals",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


export const getReadiness = (
    token
) =>

    API.get(
        "/profile/readiness",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

// =====================================================
// EXPORT USER DATA
// =====================================================

export const exportUserData = (format) => {

    const token =
        localStorage.getItem("token");

    return API.get(
        `/profile/export?format=${format}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            },

            responseType: "blob"
        }
    );
};
export default API;