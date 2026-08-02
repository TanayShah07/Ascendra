import "./DashboardLayout.css";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <main className="dashboard-content">

                {children}

            </main>

        </div>

    );

};

export default DashboardLayout;