import "./Roadmap.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Map,
    Sparkles,
    Lock
} from "lucide-react";

import { useState } from "react";

import { useLanguage } from "../../context/LanguageContext";


const Roadmap = () => {

    const [goal, setGoal] = useState("");

    const roadmapGenerated = false;

    const { t } = useLanguage();


    return (

        <DashboardLayout>

            <div className="roadmap-page">

                <div className="roadmap-card">

                    <div className="roadmap-icon">

                        <Map size={45} />

                    </div>


                    <h1>

                        {t("roadmap.title")}

                    </h1>


                    <p>

                        {t("roadmap.description")}

                    </p>


                    {!roadmapGenerated && (

                        <>

                            <div className="examples">

                                <span>
                                    {t("roadmap.googleSDE")}
                                </span>

                                <span>
                                    {t("roadmap.aiEngineer")}
                                </span>

                                <span>
                                    {t("roadmap.dataScientist")}
                                </span>

                                <span>
                                    {t("roadmap.fullStackDeveloper")}
                                </span>

                                <span>
                                    {t("roadmap.mlEngineer")}
                                </span>

                            </div>


                            <label>

                                {t("roadmap.goalLabel")}

                            </label>


                            <textarea

                                value={goal}

                                onChange={(e) =>
                                    setGoal(e.target.value)
                                }

                                placeholder={t(
                                    "roadmap.goalPlaceholder"
                                )}

                            />


                            <button>

                                <Sparkles size={18} />

                                {t(
                                    "roadmap.generateRoadmap"
                                )}

                            </button>

                        </>

                    )}


                    {roadmapGenerated && (

                        <div className="generated-placeholder">

                            {t(
                                "roadmap.roadmapWillAppear"
                            )}

                        </div>

                    )}

                </div>


                <div className="future-card">

                    <Lock />

                    <h2>

                        {t(
                            "roadmap.personalizedRoadmaps"
                        )}

                    </h2>


                    <p>

                        {t(
                            "roadmap.personalizedRoadmapsDescription"
                        )}

                    </p>

                </div>

            </div>

        </DashboardLayout>

    );

};


export default Roadmap;