import "./Dashboard.css";
import { useAuth } from "../../context/AuthContext";
import {
    User,
    FileText,
    Brain,
    Mic,
    Eye,
    Code2,
    TrendingUp,
    Calendar,
    Sparkles,
    Target,
    ChevronRight
} from "lucide-react";
import DashboardNavbar from "../../components/layout/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {

    const { user } = useAuth();

    if (!user) {

        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );

    }

    return (

    <>

        <DashboardNavbar />

        <div className="dashboard-page">

            <div className="dashboard-top">

                <div>

                    <h1>

                        Welcome Back,

                        <span> {user.full_name.split(" ")[0]}</span>

                    </h1>

                    <p>

                        Let's continue your placement preparation.

                    </p>

                </div>

                <div className="readiness-card">

                    <span>Interview Readiness</span>

                    <h2>89%</h2>

                </div>

            </div>

            <div className="dashboard-grid">

                <div className="profile-card card">

                    <User size={38}/>

                    <h2>{user.full_name}</h2>

                    <p>{user.email}</p>

                    <small>{user.college}</small>

                    <small>{user.branch}</small>

                    <small>{user.graduation_year}</small>

                </div>

                <div className="progress-card card">

                    <div className="card-title">

                        <TrendingUp/>

                        Weekly Progress

                    </div>

                    <div className="progress-circle">

                        82%

                    </div>

                </div>

                <div className="metric card">

                    <FileText/>

                    <span>ATS Score</span>

                    <h3>91</h3>

                </div>

                <div className="metric card">

                    <Brain/>

                    <span>Emotion</span>

                    <h3>Calm</h3>

                </div>

                <div className="metric card">

                    <Mic/>

                    <span>Voice</span>

                    <h3>Excellent</h3>

                </div>

                <div className="metric card">

                    <Eye/>

                    <span>Eye Contact</span>

                    <h3>94%</h3>

                </div>

                <div className="metric card">

                    <Code2/>

                    <span>Coding</span>

                    <h3>Passed</h3>

                </div>

                <div className="roadmap card">

                    <div className="card-title">

                        <Target/>

                        AI Roadmap

                    </div>

                    <ul>

                        <li>Resume Optimization</li>

                        <li>Behavioral Interview</li>

                        <li>DSA Practice</li>

                        <li>Mock Interview</li>

                    </ul>

                </div>

                <div className="activity card">

                    <div className="card-title">

                        <Calendar/>

                        Upcoming

                    </div>

                    <p>

                        Mock Interview

                    </p>

                    <strong>

                        Tomorrow • 7 PM

                    </strong>

                </div>

                <div className="suggestions card">

                    <div className="card-title">

                        <Sparkles/>

                        AI Suggestions

                    </div>

                    <div className="tip">

                        Improve resume keywords

                        <ChevronRight/>

                    </div>

                    <div className="tip">

                        Practice Arrays

                        <ChevronRight/>

                    </div>

                    <div className="tip">

                        Increase speaking speed

                        <ChevronRight/>

                    </div>

                </div>

            </div>

        </div>

    </>

);
};

export default Dashboard;