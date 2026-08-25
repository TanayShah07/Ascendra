import "./AIInterviewer.css";

import {
    Bot,
    Mic,
    MicOff,
    Video,
    VideoOff,
    Volume2
} from "lucide-react";

const AIInterviewer = () => {

    return (

        <div className="interviewer-card">

            <div className="interviewer-top">

                <div className="avatar">

                    <Bot size={60}/>

                </div>

                <div>

                    <h2>

                        Ascendra AI Interviewer

                    </h2>

                    <p>

                        Senior Software Engineer Interview

                    </p>

                </div>

            </div>

            <div className="ai-message">

                <p>

                    👋 Hello Tanay!

                </p>

                <p>

                    Welcome to your AI Coding Interview.

                </p>

                <p>

                    Today you'll solve coding problems while I evaluate your
                    approach, coding style, communication, and optimization
                    skills.

                </p>

                <p>

                    Once you're ready, explain your approach before you begin
                    writing code.

                </p>

            </div>

            <div className="interviewer-controls">

                <button>

                    <Mic size={18}/>

                </button>

                <button>

                    <MicOff size={18}/>

                </button>

                <button>

                    <Video size={18}/>

                </button>

                <button>

                    <VideoOff size={18}/>

                </button>

                <button>

                    <Volume2 size={18}/>

                </button>

            </div>

        </div>

    );

};

export default AIInterviewer;