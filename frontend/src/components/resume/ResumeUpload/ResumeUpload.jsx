import "./ResumeUpload.css";
import { useState } from "react";
import {
    UploadCloud,
    Building2,
    Briefcase,
    GraduationCap,
    FileText,
    Sparkles
} from "lucide-react";

const ResumeUpload = ({ onAnalyze }) => {

    const [fileName, setFileName] = useState("");

    const handleFile = (e) => {

        if (e.target.files.length > 0) {

            setFileName(e.target.files[0].name);

        }

    };

    return (

        <div className="resume-upload-card">

            <div className="upload-header">

                <Sparkles size={28} />

                <div>

                    <h2>

                        AI Resume Analysis

                    </h2>

                    <p>

                        Upload your latest resume and customize the analysis
                        according to your dream company and role.

                    </p>

                </div>

            </div>

            <div className="upload-box">

                <UploadCloud size={60} />

                <h3>

                    Drag & Drop Resume

                </h3>

                <p>

                    PDF or DOCX • Maximum 5 MB

                </p>

                <label className="upload-btn">

                    Choose Resume

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={handleFile}
                    />

                </label>

                {

                    fileName && (

                        <span className="selected-file">

                            <FileText size={18} />

                            {fileName}

                        </span>

                    )

                }

            </div>

            <div className="resume-form">

                <div>

                    <label>

                        <Building2 size={18} />

                        Target Company

                    </label>

                    <select defaultValue="">

                        <option value="" disabled>

                            Select Target Company

                        </option>

                        <option>Google</option>
                        <option>Microsoft</option>
                        <option>Amazon</option>
                        <option>Adobe</option>
                        <option>NVIDIA</option>
                        <option>Oracle</option>
                        <option>JP Morgan</option>
                        <option>Goldman Sachs</option>
                        <option>Infosys</option>
                        <option>TCS</option>
                        <option>Accenture</option>

                    </select>

                </div>

                <div>

                    <label>

                        <Briefcase size={18} />

                        Target Role

                    </label>

                    <select defaultValue="">

                        <option value="" disabled>

                            Select Target Role

                        </option>

                        <option>Software Engineer</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>Full Stack Developer</option>
                        <option>AI Engineer</option>
                        <option>Machine Learning Engineer</option>
                        <option>Data Scientist</option>

                    </select>

                </div>

                <div>

                    <label>

                        <GraduationCap size={18} />

                        Experience Level

                    </label>

                    <select>

                        <option>Fresher</option>
                        <option>Intern</option>
                        <option>0-2 Years</option>
                        <option>2-5 Years</option>

                    </select>

                </div>

                <div>

                    <label>

                        Resume Version

                    </label>

                    <select>

                        <option>Latest Resume</option>
                        <option>Version 2</option>
                        <option>Version 1</option>

                    </select>

                </div>

            </div>

            <button
                className="analyze-btn"
                onClick={onAnalyze}
            >

                Analyze Resume

            </button>

        </div>

    );

};

export default ResumeUpload;