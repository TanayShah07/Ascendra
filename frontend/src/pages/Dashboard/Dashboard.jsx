import "./Dashboard.css";

import DashboardHeader from "../../components/dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats/DashboardStats";
import DashboardActions from "../../components/dashboard/DashboardActions/DashboardActions";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

const Dashboard = () => {

    return (

        <DashboardLayout>

            <div className="dashboard-page">

                <DashboardHeader />

                <DashboardStats />

                <DashboardActions />

            </div>

        </DashboardLayout>

    );

};

export default Dashboard;