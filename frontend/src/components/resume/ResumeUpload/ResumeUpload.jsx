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

import { useLanguage } from "../../../context/LanguageContext";


const ResumeUpload = ({ onAnalyze }) => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const [targetCompany, setTargetCompany] = useState("");
    const [targetRole, setTargetRole] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("Fresher");

    const { t } = useLanguage();


    const handleFile = (e) => {

        if (
            e.target.files &&
            e.target.files.length > 0
        ) {

            const selectedFile =
                e.target.files[0];

            setFile(selectedFile);

            setFileName(
                selectedFile.name
            );

        }

    };


    const handleAnalyze = () => {

        if (!file) {
            return;
        }

        if (!targetCompany) {
            return;
        }

        if (!targetRole) {
            return;
        }

        onAnalyze({

            file,

            targetCompany,

            targetRole,

            experienceLevel

        });

    };


    return (

        <div className="resume-upload-card">


            <div className="upload-header">

                <Sparkles size={28} />

                <div>

                    <h2>
                        {t("resume.title")}
                    </h2>

                    <p>
                        {t("resume.description")}
                    </p>

                </div>

            </div>


            {/* UPLOAD */}

            <div className="upload-box">

                <UploadCloud size={60} />

                <h3>
                    {t("resume.dragDrop")}
                </h3>

                <p>
                    {t("resume.fileFormat")}
                </p>


                <label className="upload-btn">

                    {t("resume.chooseResume")}

                    <input
                        type="file"
                        accept=".pdf,.docx"
                        hidden
                        onChange={handleFile}
                    />

                </label>


                {fileName && (

                    <span className="selected-file">

                        <FileText size={18} />

                        {fileName}

                    </span>

                )}

            </div>


            {/* TARGET FORM */}

            <div className="resume-form">


                {/* COMPANY */}

                <div>

                    <label>

                        <Building2 size={18} />

                        {t("resume.companyLabel")}

                    </label>


                    <select

                        value={targetCompany}

                        onChange={(e) =>
                            setTargetCompany(
                                e.target.value
                            )
                        }

                    >

                        <option
                            value=""
                            disabled
                        >
                            {t(
                                "resume.selectTargetCompany"
                            )}
                        </option>


                        <option value="Google">
                            Google
                        </option>

                        <option value="Microsoft">
                            Microsoft
                        </option>

                        <option value="Amazon">
                            Amazon
                        </option>

                        <option value="Adobe">
                            Adobe
                        </option>

                        <option value="NVIDIA">
                            NVIDIA
                        </option>

                        <option value="Oracle">
                            Oracle
                        </option>

                        <option value="JP Morgan">
                            JP Morgan
                        </option>

                        <option value="Goldman Sachs">
                            Goldman Sachs
                        </option>

                        <option value="Infosys">
                            Infosys
                        </option>

                        <option value="TCS">
                            TCS
                        </option>

                        <option value="Accenture">
                            Accenture
                        </option>

                    </select>

                </div>


                {/* ROLE */}

                <div>

                    <label>

                        <Briefcase size={18} />

                        {t("resume.targetRole")}

                    </label>


                    <select

                        value={targetRole}

                        onChange={(e) =>
                            setTargetRole(
                                e.target.value
                            )
                        }

                    >

                        <option
                            value=""
                            disabled
                        >
                            {t(
                                "resume.selectTargetRole"
                            )}
                        </option>


                        <option value="Software Engineer">
                            Software Engineer
                        </option>

                        <option value="Frontend Developer">
                            Frontend Developer
                        </option>

                        <option value="Backend Developer">
                            Backend Developer
                        </option>

                        <option value="Full Stack Developer">
                            Full Stack Developer
                        </option>

                        <option value="AI Engineer">
                            AI Engineer
                        </option>

                        <option value="Machine Learning Engineer">
                            Machine Learning Engineer
                        </option>

                        <option value="Data Scientist">
                            Data Scientist
                        </option>

                    </select>

                </div>


                {/* EXPERIENCE */}

                <div>

                    <label>

                        <GraduationCap size={18} />

                        {t(
                            "resume.experienceLevel"
                        )}

                    </label>


                    <select

                        value={experienceLevel}

                        onChange={(e) =>
                            setExperienceLevel(
                                e.target.value
                            )
                        }

                    >

                        <option value="Fresher">
                            {t(
                                "resume.experience.fresher"
                            )}
                        </option>

                        <option value="Intern">
                            {t(
                                "resume.experience.intern"
                            )}
                        </option>

                        <option value="0-2 Years">
                            {t(
                                "resume.experience.0-2-years"
                            )}
                        </option>

                        <option value="2-5 Years">
                            {t(
                                "resume.experience.2-5-years"
                            )}
                        </option>

                    </select>

                </div>


                {/* VERSION */}

                <div>

                    <label>

                        {t(
                            "resume.resumeVersion"
                        )}

                    </label>


                    <select>

                        <option>
                            {t(
                                "resume.version.latest"
                            )}
                        </option>

                        <option>
                            {t(
                                "resume.version.2"
                            )}
                        </option>

                        <option>
                            {t(
                                "resume.version.1"
                            )}
                        </option>

                    </select>

                </div>

            </div>


            {/* ANALYZE */}

            <button

                className="analyze-btn"

                onClick={handleAnalyze}

                disabled={
                    !file ||
                    !targetCompany ||
                    !targetRole
                }

            >

                <Sparkles size={18} />

                {t(
                    "resume.analyzeResume"
                )}

            </button>


        </div>

    );

};


export default ResumeUpload;