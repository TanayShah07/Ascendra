import API from "./api";


// =====================================================
// GET COMPANIES
// =====================================================

export const getAptitudeCompanies = (token) => {

    return API.get(
        "/aptitude/companies",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};


// =====================================================
// GET CATEGORIES
// =====================================================

export const getAptitudeCategories = (token) => {

    return API.get(
        "/aptitude/categories",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};


// =====================================================
// GET QUESTIONS
// =====================================================

export const getAptitudeQuestions = (
    token,
    filters = {}
) => {

    return API.get(
        "/aptitude/questions",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            },

            params: {

                company:
                    filters.company || undefined,

                category:
                    filters.category || undefined,

                difficulty:
                    filters.difficulty || undefined,

                limit:
                    filters.limit || 10

            }
        }
    );

};


// =====================================================
// SUBMIT TEST
// =====================================================

export const submitAptitudeTest = (
    token,
    answers
) => {

    return API.post(
        "/aptitude/submit",

        {
            answers
        },

        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};