import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


// =========================================================
// AUTH HEADER
// =========================================================

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});


// =========================================================
// GET COMPANIES
// =========================================================

export const getCodingCompanies = async (token) => {

    return axios.get(
        `${API_URL}/coding/companies`,
        getConfig(token)
    );

};


// =========================================================
// GET TOPICS
// =========================================================

export const getCodingTopics = async (token) => {

    return axios.get(
        `${API_URL}/coding/topics`,
        getConfig(token)
    );

};


// =========================================================
// GET DIFFICULTIES
// =========================================================

export const getCodingDifficulties = async (token) => {

    return axios.get(
        `${API_URL}/coding/difficulties`,
        getConfig(token)
    );

};


// =========================================================
// GET PROBLEMS
// =========================================================

export const getCodingProblems = async (
    token,
    {
        company = null,
        topic = null,
        difficulty = null,
        search = null,
        limit = 20
    } = {}
) => {

    return axios.get(
        `${API_URL}/coding/problems`,
        {
            ...getConfig(token),

            params: {

                company:
                    company &&
                    company !== "All Companies"
                        ? company
                        : undefined,

                topic:
                    topic &&
                    topic !== "All Topics"
                        ? topic
                        : undefined,

                difficulty:
                    difficulty &&
                    difficulty !== "All Difficulty"
                        ? difficulty
                        : undefined,

                search:
                    search || undefined,

                limit
            }
        }
    );

};


// =========================================================
// GET SINGLE PROBLEM
// =========================================================

export const getCodingProblem = async (
    token,
    problemId
) => {

    return axios.get(
        `${API_URL}/coding/problems/${problemId}`,
        getConfig(token)
    );

};


// =========================================================
// RUN CODE
// VISIBLE TEST CASES ONLY
// =========================================================

export const runCodingProblem = async (
    token,
    problemId,
    code,
    language
) => {

    return axios.post(
        `${API_URL}/coding/problems/${problemId}/run`,

        {
            code,
            language
        },

        getConfig(token)
    );

};


// =========================================================
// SUBMIT CODE
// VISIBLE + HIDDEN TEST CASES
// =========================================================

export const submitCodingProblem = async (
    token,
    problemId,
    code,
    language
) => {

    return axios.post(
        `${API_URL}/coding/problems/${problemId}/submit`,

        {
            code,
            language
        },

        getConfig(token)
    );

};


// =========================================================
// GET SUBMISSIONS
// =========================================================

export const getCodingSubmissions = async (
    token,
    problemId
) => {

    return axios.get(
        `${API_URL}/coding/problems/${problemId}/submissions`,
        getConfig(token)
    );

};