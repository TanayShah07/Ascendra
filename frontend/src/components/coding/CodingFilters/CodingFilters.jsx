import "./CodingFilters.css";

import {
    Search,
    Building2,
    Code2,
    Filter
} from "lucide-react";

const CodingFilters = () => {

    return(

        <div className="coding-filters">

            <div className="search-box">

                <Search size={18}/>

                <input
                    type="text"
                    placeholder="Search problems..."
                />

            </div>

            <div className="filter-group">

                <Building2 size={18}/>

                <select>

                    <option>All Companies</option>

                    <option>Google</option>

                    <option>Microsoft</option>

                    <option>Amazon</option>

                    <option>Adobe</option>

                    <option>Oracle</option>

                    <option>NVIDIA</option>

                    <option>Goldman Sachs</option>

                    <option>JP Morgan</option>

                </select>

            </div>

            <div className="filter-group">

                <Code2 size={18}/>

                <select>

                    <option>All Topics</option>

                    <option>Arrays</option>

                    <option>Strings</option>

                    <option>Trees</option>

                    <option>Graphs</option>

                    <option>Dynamic Programming</option>

                    <option>Greedy</option>

                    <option>Linked List</option>

                </select>

            </div>

            <div className="filter-group">

                <Filter size={18}/>

                <select>

                    <option>All Difficulty</option>

                    <option>Easy</option>

                    <option>Medium</option>

                    <option>Hard</option>

                </select>

            </div>

        </div>

    );

};

export default CodingFilters;