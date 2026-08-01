import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const registerUser = (data) =>
    API.post("/auth/register", data);

export const loginUser = (data) =>
    API.post("/auth/login", data);

export const getProfile = (token) =>
    API.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export default API;