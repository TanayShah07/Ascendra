import "./ResumeInsights.css";
import {
    Search,
    FileCheck,
    Type,
    AlertTriangle,
    FolderGit2,
    Building2,
    CheckCircle2,
    XCircle
} from "lucide-react";

const ResumeInsights = () => {

    return (

        <div className="resume-insights">

            <h2>

                Resume Intelligence Report

            </h2>

            <div className="insight-grid">

                <div className="insight-card">

                    <Search size={32}/>

                    <h3>

                        Missing Keywords

                    </h3>

                    <div className="keyword-list">

                        <span>Docker</span>

                        <span>Redis</span>

                        <span>REST API</span>

                        <span>Kubernetes</span>

                        <span>CI/CD</span>

                    </div>

                </div>

                <div className="insight-card">

                    <Type size={32}/>

                    <h3>

                        Resume Quality

                    </h3>

                    <div className="score-row">

                        <span>Grammar</span>

                        <strong>98%</strong>

                    </div>

                    <div className="score-row">

                        <span>Formatting</span>

                        <strong>95%</strong>

                    </div>

                    <div className="score-row">

                        <span>Readability</span>

                        <strong>94%</strong>

                    </div>

                    <div className="score-row">

                        <span>Professional Tone</span>

                        <strong>96%</strong>

                    </div>

                </div>

                <div className="insight-card">

                    <FileCheck size={32}/>

                    <h3>

                        Resume Sections

                    </h3>

                    <ul>

                        <li><CheckCircle2 size={18}/> Education</li>

                        <li><CheckCircle2 size={18}/> Projects</li>

                        <li><CheckCircle2 size={18}/> Skills</li>

                        <li><CheckCircle2 size={18}/> Experience</li>

                        <li><XCircle size={18}/> Achievements</li>

                        <li><XCircle size={18}/> Certifications</li>

                    </ul>

                </div>

                <div className="insight-card">

                    <FolderGit2 size={32}/>

                    <h3>

                        Project Ranking

                    </h3>

                    <ol>

                        <li>Ascendra ⭐⭐⭐⭐⭐</li>

                        <li>FaceSense ⭐⭐⭐⭐☆</li>

                        <li>ChessMate ⭐⭐⭐⭐☆</li>

                        <li>CollegeBuddy ⭐⭐⭐☆☆</li>

                    </ol>

                </div>

                <div className="insight-card">

                    <Building2 size={32}/>

                    <h3>

                        Company Match

                    </h3>

                    <div className="company-match">

                        <span>Google</span>

                        <strong>89%</strong>

                    </div>

                    <div className="company-match">

                        <span>Microsoft</span>

                        <strong>91%</strong>

                    </div>

                    <div className="company-match">

                        <span>Amazon</span>

                        <strong>87%</strong>

                    </div>

                    <div className="company-match">

                        <span>Adobe</span>

                        <strong>90%</strong>

                    </div>

                </div>

                <div className="insight-card warning">

                    <AlertTriangle size={32}/>

                    <h3>

                        Resume Risk Detector

                    </h3>

                    <p>

                        Some project descriptions lack measurable
                        achievements. Add numbers, impact and
                        technologies for stronger recruiter appeal.

                    </p>

                </div>

            </div>

        </div>

    );

};

export default ResumeInsights;