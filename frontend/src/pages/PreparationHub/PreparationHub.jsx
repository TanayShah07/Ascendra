import "./PreparationHub.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Code2,
    Calculator
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const PreparationHub = () => {

    const navigate = useNavigate();

    const preparationOptions = [

        {
            title: "Coding Practice",
            description:
                "Practice coding problems and strengthen your DSA skills for placement preparation.",
            icon: Code2,
            path: "/coding",
            button: "Start Coding"
        },

        {
            title: "Aptitude",
            description:
                "Practice company-specific and general aptitude questions for placement tests.",
            icon: Calculator,
            path: "/aptitude",
            button: "Practice Aptitude"
        }

    ];


    return (

        <DashboardLayout>

            <div className="preparation-page">

                <div className="preparation-header">

                    <h1>
                        Preparation Hub
                    </h1>

                    <p>
                        Everything you need to prepare
                        for your placement journey.
                    </p>

                </div>


                <div className="preparation-grid">

                    {preparationOptions.map(
                        (option) => {

                            const Icon = option.icon;

                            return (

                                <div
                                    className="preparation-card"
                                    key={option.title}
                                    onClick={() =>
                                        navigate(option.path)
                                    }
                                >

                                    <div className="preparation-icon">

                                        <Icon size={34} />

                                    </div>


                                    <h2>
                                        {option.title}
                                    </h2>


                                    <p>
                                        {option.description}
                                    </p>


                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate(
                                                option.path
                                            );

                                        }}
                                    >

                                        {option.button}

                                    </button>

                                </div>

                            );

                        }
                    )}

                </div>

            </div>

        </DashboardLayout>

    );

};


export default PreparationHub;