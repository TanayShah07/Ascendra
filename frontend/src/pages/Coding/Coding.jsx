import {
    useEffect,
    useState
} from "react";

import "./Coding.css";

import DashboardLayout
    from "../../components/layout/DashboardLayout/DashboardLayout";

import CodingHeader
    from "../../components/coding/CodingHeader/CodingHeader";

import CodingStats
    from "../../components/coding/CodingStats/CodingStats";

import CodingFilters
    from "../../components/coding/CodingFilters/CodingFilters";

import CodingTracks
    from "../../components/coding/CodingTracks/CodingTracks";

import CodingProblems
    from "../../components/coding/CodingProblems/CodingProblems";

import {
    getCodingCompanies,
    getCodingTopics,
    getCodingProblems
} from "../../services/codingService";

import { useAuth } from "../../context/AuthContext";


const Coding = () => {

    const { token } = useAuth();


    /* =====================================================
       STATE
    ===================================================== */

    const [problems, setProblems] =
        useState([]);

    const [companies, setCompanies] =
        useState([]);

    const [topics, setTopics] =
        useState([]);


    const [search, setSearch] =
        useState("");

    const [selectedCompany, setSelectedCompany] =
        useState("");

    const [selectedTopic, setSelectedTopic] =
        useState("");

    const [selectedDifficulty, setSelectedDifficulty] =
        useState("");


    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =====================================================
       LOAD FILTER OPTIONS
    ===================================================== */

    useEffect(() => {

        const loadFilters = async () => {

            if (!token) {
                return;
            }

            try {

                const [
                    companiesResponse,
                    topicsResponse
                ] = await Promise.all([

                    getCodingCompanies(
                        token
                    ),

                    getCodingTopics(
                        token
                    )

                ]);


                setCompanies(
                    companiesResponse.data.companies || []
                );


                setTopics(
                    topicsResponse.data.topics || []
                );

            }

            catch (err) {

                console.error(
                    "Failed to load coding filters:",
                    err
                );

            }

        };


        loadFilters();

    }, [token]);


    /* =====================================================
       LOAD PROBLEMS
    ===================================================== */

    useEffect(() => {

        const loadProblems = async () => {

            if (!token) {
                return;
            }

            try {

                setLoading(true);

                setError("");


                const response =
                    await getCodingProblems(

                        token,

                        {
                            company:
                                selectedCompany ||
                                null,

                            topic:
                                selectedTopic ||
                                null,

                            difficulty:
                                selectedDifficulty ||
                                null,

                            search:
                                search.trim() ||
                                null,

                            limit: 50
                        }

                    );


                setProblems(
                    response.data.problems || []
                );

            }

            catch (err) {

                console.error(
                    "Failed to load coding problems:",
                    err
                );

                setError(
                    "Unable to load coding problems."
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadProblems();

    }, [

        token,

        selectedCompany,

        selectedTopic,

        selectedDifficulty,

        search

    ]);


    return (

        <DashboardLayout>

            <div className="coding-page">

                <CodingHeader />


                <CodingStats />


                <CodingFilters

                    search={search}

                    setSearch={setSearch}

                    selectedCompany={
                        selectedCompany
                    }

                    setSelectedCompany={
                        setSelectedCompany
                    }

                    selectedTopic={
                        selectedTopic
                    }

                    setSelectedTopic={
                        setSelectedTopic
                    }

                    selectedDifficulty={
                        selectedDifficulty
                    }

                    setSelectedDifficulty={
                        setSelectedDifficulty
                    }

                    companies={companies}

                    topics={topics}

                />


                <CodingTracks />


                <CodingProblems

                    problems={problems}

                    loading={loading}

                    error={error}

                />

            </div>

        </DashboardLayout>

    );

};


export default Coding;