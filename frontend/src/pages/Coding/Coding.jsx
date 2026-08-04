import "./Coding.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import CodingHeader from "../../components/coding/CodingHeader/CodingHeader";
import CodingStats from "../../components/coding/CodingStats/CodingStats";
import CodingFilters from "../../components/coding/CodingFilters/CodingFilters";
import CodingTracks from "../../components/coding/CodingTracks/CodingTracks";
import CodingProblems from "../../components/coding/CodingProblems/CodingProblems";

const Coding = () => {

    return (

        <DashboardLayout>

            <div className="coding-page">

                <CodingHeader/>

                <CodingStats/>

                <CodingFilters/>

                <CodingTracks/>

                <CodingProblems/>

            </div>

        </DashboardLayout>

    );

};

export default Coding;