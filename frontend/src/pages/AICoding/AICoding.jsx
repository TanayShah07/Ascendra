import "./AICoding.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import AIInterviewHeader from "../../components/AICoding/AIInterviewHeader/AIInterviewHeader";
import AIInterviewer from "../../components/AICoding/AIInterviewer/AIInterviewer";
import ProblemPanel from "../../components/AICoding/ProblemPanel/ProblemPanel";
import CodeEditor from "../../components/AICoding/CodeEditor/CodeEditor";
import UnlockOverlay from "../../components/AICoding/UnlockOverlay/UnlockOverlay";

const AICoding = () => {

    const unlocked = false;

    return (

        <DashboardLayout>

            <div className="ai-coding-page">

                <div className={unlocked ? "ai-layout" : "ai-layout blurred"}>

                    <AIInterviewHeader/>

                    <div className="coding-main-grid">

                        <ProblemPanel/>

                        <CodeEditor/>

                    </div>

                    <AIInterviewer/>

                </div>

                {

                    !unlocked &&

                    <UnlockOverlay/>

                }

            </div>

        </DashboardLayout>

    );

};

export default AICoding;