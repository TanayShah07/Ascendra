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

    const [fileName, setFileName] = useState("");
    const { t } = useLanguage();

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

                        {t("resume.title")}

                    </h2>

                    <p>

                        {t("resume.description")}

                    </p>

                </div>

            </div>

            <div className="upload-box">

                <UploadCloud size={60} />

                <h3>

                    {t("resume.dragAndDrop")}

                </h3>

                <p>

                    {t("resume.fileTypes")} • {t("resume.maxSize")}

                </p>

                <label className="upload-btn">

                    {t("resume.chooseResume")}

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

                        {t("resume.targetCompany")}

                    </label>

                    <select defaultValue="">

                        <option value="" disabled>

                            {t("resume.selectTargetCompany")}

                        </option>

                        <option>{t("resume.targetCompany.google")}</option>
                        <option>{t("resume.targetCompany.microsoft")}</option>
                        <option>{t("resume.targetCompany.amazon")}</option>
                        <option>{t("resume.targetCompany.adobe")}</option>
                        <option>{t("resume.targetCompany.nvidia")}</option>
                        <option>{t("resume.targetCompany.oracle")}</option>
                        <option>{t("resume.targetCompany.jpMorgan")}</option>
                        <option>{t("resume.targetCompany.goldmanSachs")}</option>
                        <option>{t("resume.targetCompany.infosys")}</option>
                        <option>{t("resume.targetCompany.tcs")}</option>
                        <option>{t("resume.targetCompany.accenture")}</option>

                    </select>

                </div>

                <div>

                    <label>

                        <Briefcase size={18} />

                        {t("resume.targetRole")}

                    </label>

                    <select defaultValue="">

                        <option value="" disabled>

                            {t("resume.selectTargetRole")}

                        </option>

                        <option>{t("resume.role.softwareEngineer")}</option>
                        <option>{t("resume.role.frontendDeveloper")}</option>
                        <option>{t("resume.role.backendDeveloper")}</option>
                        <option>{t("resume.role.fullStackDeveloper")}</option>
                        <option>{t("resume.role.aiEngineer")}</option>
                        <option>{t("resume.role.machineLearningEngineer")}</option>
                        <option>{t("resume.role.dataScientist")}</option>

                    </select>

                </div>

                <div>

                    <label>

                        <GraduationCap size={18} />

                        {t("resume.experienceLevel")}

                    </label>

                    <select>

                        <option>{t("resume.experience.fresher")}</option>
                        <option>{t("resume.experience.intern")}</option>
                        <option>{t("resume.experience.0-2-years")}</option>
                        <option>{t("resume.experience.2-5-years")}</option>

                    </select>

                </div>

                <div>

                    <label>

                        {t("resume.resumeVersion")}

                    </label>

                    <select>

                        <option>{t("resume.version.latest")}</option>
                        <option>{t("resume.version.2")}</option>
                        <option>{t("resume.version.1")}</option>

                    </select>

                </div>

            </div>

            <button
                className="analyze-btn"
                onClick={onAnalyze}
            >

                {t("resume.analyzeButton")}

            </button>

        </div>

    );

};

export default ResumeUpload;