import "./CodingFilters.css";

import {
    Search,
    Building2,
    Code2,
    Filter
} from "lucide-react";


const CodingFilters = ({
    search,
    setSearch,

    selectedCompany,
    setSelectedCompany,

    selectedTopic,
    setSelectedTopic,

    selectedDifficulty,
    setSelectedDifficulty,

    companies,
    topics
}) => {

    return (

        <div className="coding-filters">

            {/* SEARCH */}

            <div className="search-box">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* COMPANY */}

            <div className="filter-group">

                <Building2 size={18} />

                <select
                    value={selectedCompany}
                    onChange={(e) =>
                        setSelectedCompany(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Companies
                    </option>

                    {companies.map(
                        (company) => (

                            <option
                                key={company}
                                value={company}
                            >
                                {company}
                            </option>

                        )
                    )}

                </select>

            </div>


            {/* TOPIC */}

            <div className="filter-group">

                <Code2 size={18} />

                <select
                    value={selectedTopic}
                    onChange={(e) =>
                        setSelectedTopic(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Topics
                    </option>

                    {topics.map(
                        (topic) => (

                            <option
                                key={topic}
                                value={topic}
                            >
                                {topic}
                            </option>

                        )
                    )}

                </select>

            </div>


            {/* DIFFICULTY */}

            <div className="filter-group">

                <Filter size={18} />

                <select
                    value={selectedDifficulty}
                    onChange={(e) =>
                        setSelectedDifficulty(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Difficulty
                    </option>

                    <option value="Easy">
                        Easy
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Hard">
                        Hard
                    </option>

                </select>

            </div>

        </div>

    );

};


export default CodingFilters;