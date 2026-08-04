import "./CodeEditor.css";

import { useState } from "react";

import {
    Play,
    Send,
    Moon,
    ChevronDown
} from "lucide-react";

const starterCode = `public class Solution {

    public int[] twoSum(int[] nums, int target) {

        

    }

}`;

const CodeEditor = () => {

    const [language, setLanguage] = useState("Java");

    const [code, setCode] = useState(starterCode);

    return (

        <div className="editor-card">

            <div className="editor-header">

                <div className="editor-left">

                    <select
                        value={language}
                        onChange={(e)=>setLanguage(e.target.value)}
                    >

                        <option>Java</option>

                        <option>Python</option>

                        <option>C++</option>

                        <option>JavaScript</option>

                        <option>C</option>

                        <option>Go</option>

                        <option>Kotlin</option>

                    </select>

                    <ChevronDown size={16}/>

                </div>

                <div className="editor-actions">

                    <button className="theme-btn">

                        <Moon size={18}/>

                    </button>

                    <button className="run-btn">

                        <Play size={18}/>

                        Run

                    </button>

                    <button className="submit-btn">

                        <Send size={18}/>

                        Submit

                    </button>

                </div>

            </div>

            <div className="editor-body">

                <textarea

                    value={code}

                    onChange={(e)=>setCode(e.target.value)}

                    spellCheck={false}

                />

            </div>

        </div>

    );

};

export default CodeEditor;