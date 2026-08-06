import axios from "axios";

const API = axios.create({

    baseURL: "http://127.0.0.1:8000"

});


// ---------------- Authentication ----------------

export const registerUser = (data) =>

    API.post("/auth/register", data);


export const loginUser = (data) =>

    API.post("/auth/login", data);


// ---------------- Profile ----------------

export const getProfile = (token) =>

    API.get("/profile", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });


export const updateProfile = (

    token,

    data

) =>

    API.put("/profile", data, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });


export const updateSocialLinks = (

    token,

    data

) =>

    API.patch("/profile/social", data, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });


export const updatePlacementGoals = (

    token,

    data

) =>

    API.patch("/profile/goals", data, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });


export default API;