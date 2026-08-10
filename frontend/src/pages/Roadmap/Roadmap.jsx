import "./Roadmap.css";

import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

import {
    Map,
    Sparkles,
    CheckCircle2,
    Clock,
    Target,
    BookOpen,
    ChevronRight,
    Star,
    MoreVertical,
    Pencil,
    Archive,
    RotateCcw,
    Trash2,
    X
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";

import { useLanguage } from "../../context/LanguageContext";


const Roadmap = () => {

    const [goal, setGoal] = useState("");

    const [roadmaps, setRoadmaps] = useState([]);

    const [archivedRoadmaps, setArchivedRoadmaps] =
        useState([]);

    const [loading, setLoading] = useState(false);

    const [loadingRoadmaps, setLoadingRoadmaps] =
        useState(true);

    const [menuOpen, setMenuOpen] =
        useState(null);

    const [renameId, setRenameId] =
        useState(null);

    const [renameValue, setRenameValue] =
        useState("");

    const [showArchived, setShowArchived] =
        useState(false);

    const { t } = useLanguage();


    // =====================================================
    // LOAD ROADMAPS
    // =====================================================

    const loadRoadmaps = async () => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            setLoadingRoadmaps(false);

            return;

        }


        try {

            const [activeResponse, archivedResponse] =
                await Promise.all([

                    fetch(
                        "http://localhost:8000/roadmap/",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    ),

                    fetch(
                        "http://localhost:8000/roadmap/archived",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    )

                ]);


            const activeData =
                await activeResponse.json();

            const archivedData =
                await archivedResponse.json();


            if (!activeResponse.ok) {

                throw new Error(
                    activeData.detail ||
                    "Unable to load roadmaps."
                );

            }


            setRoadmaps(
                activeData.data || []
            );


            if (archivedResponse.ok) {

                setArchivedRoadmaps(
                    archivedData.data || []
                );

            }


        } catch (error) {

            console.error(
                "Roadmap loading error:",
                error
            );


            toast.error(
                "Unable to load saved roadmaps."
            );


        } finally {

            setLoadingRoadmaps(false);

        }

    };


    useEffect(() => {

        loadRoadmaps();

    }, []);


    // =====================================================
    // GENERATE ROADMAP
    // =====================================================

    const handleGenerate = async () => {

        if (!goal.trim()) {

            toast.error(
                "Please enter your career goal."
            );

            return;

        }


        const token =
            localStorage.getItem("token");


        if (!token) {

            toast.error(
                "Please login to generate a roadmap."
            );

            return;

        }


        setLoading(true);


        try {

            const response =
                await fetch(
                    "http://localhost:8000/roadmap/generate",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({
                            goal: goal.trim()
                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to generate roadmap."
                );

            }


            setRoadmaps(
                previous => [
                    ...previous,
                    data.data
                ]
            );


            setGoal("");


            toast.success(
                "New roadmap generated successfully!"
            );


        } catch (error) {

            console.error(
                "Roadmap generation error:",
                error
            );


            toast.error(
                error.message ||
                "Unable to generate roadmap."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RENAME
    // =====================================================

    const startRename = (roadmap) => {

        setRenameId(
            roadmap.id
        );

        setRenameValue(
            roadmap.goal
        );

        setMenuOpen(null);

    };


    const cancelRename = () => {

        setRenameId(null);

        setRenameValue("");

    };


    const handleRename = async (
        roadmapId
    ) => {

        if (!renameValue.trim()) {

            toast.error(
                "Roadmap name cannot be empty."
            );

            return;

        }


        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(

                    `http://localhost:8000/roadmap/${roadmapId}/rename`,

                    {

                        method: "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            goal:
                                renameValue.trim()

                        })

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to rename roadmap."
                );

            }


            setRoadmaps(
                previous =>
                    previous.map(
                        roadmap =>
                            roadmap.id === roadmapId
                                ? {
                                    ...roadmap,
                                    goal:
                                        data.data.goal
                                }
                                : roadmap
                    )
            );


            setArchivedRoadmaps(
                previous =>
                    previous.map(
                        roadmap =>
                            roadmap.id === roadmapId
                                ? {
                                    ...roadmap,
                                    goal:
                                        data.data.goal
                                }
                                : roadmap
                    )
            );


            cancelRename();


            toast.success(
                "Roadmap renamed successfully."
            );


        } catch (error) {

            console.error(error);

            toast.error(
                error.message ||
                "Unable to rename roadmap."
            );

        }

    };


    // =====================================================
    // ARCHIVE
    // =====================================================

    const handleArchive = async (
        roadmapId
    ) => {

        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(

                    `http://localhost:8000/roadmap/${roadmapId}/archive`,

                    {

                        method: "PATCH",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to archive roadmap."
                );

            }


            const archivedRoadmap =
                roadmaps.find(
                    roadmap =>
                        roadmap.id === roadmapId
                );


            if (archivedRoadmap) {

                setArchivedRoadmaps(
                    previous => [

                        ...previous,

                        {
                            ...archivedRoadmap,
                            archived: true
                        }

                    ]
                );

            }


            setRoadmaps(
                previous =>
                    previous.filter(
                        roadmap =>
                            roadmap.id !== roadmapId
                    )
            );


            setMenuOpen(null);


            toast.success(
                "Roadmap archived."
            );


        } catch (error) {

            console.error(error);

            toast.error(
                error.message ||
                "Unable to archive roadmap."
            );

        }

    };


    // =====================================================
    // RESTORE
    // =====================================================

    const handleRestore = async (
        roadmapId
    ) => {

        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(

                    `http://localhost:8000/roadmap/${roadmapId}/restore`,

                    {

                        method: "PATCH",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to restore roadmap."
                );

            }


            const restored =
                archivedRoadmaps.find(
                    roadmap =>
                        roadmap.id === roadmapId
                );


            if (restored) {

                setRoadmaps(
                    previous => [

                        ...previous,

                        {
                            ...restored,
                            archived: false
                        }

                    ]
                );

            }


            setArchivedRoadmaps(
                previous =>
                    previous.filter(
                        roadmap =>
                            roadmap.id !== roadmapId
                    )
            );


            toast.success(
                "Roadmap restored."
            );


        } catch (error) {

            console.error(error);

            toast.error(
                error.message ||
                "Unable to restore roadmap."
            );

        }

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (
        roadmapId
    ) => {

        const confirmed =
            window.confirm(
                "Delete this roadmap permanently? This cannot be undone."
            );


        if (!confirmed) {

            return;

        }


        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(

                    `http://localhost:8000/roadmap/${roadmapId}`,

                    {

                        method: "DELETE",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to delete roadmap."
                );

            }


            setRoadmaps(
                previous =>
                    previous.filter(
                        roadmap =>
                            roadmap.id !== roadmapId
                    )
            );


            setArchivedRoadmaps(
                previous =>
                    previous.filter(
                        roadmap =>
                            roadmap.id !== roadmapId
                    )
            );


            setMenuOpen(null);


            toast.success(
                "Roadmap deleted permanently."
            );


        } catch (error) {

            console.error(error);

            toast.error(
                error.message ||
                "Unable to delete roadmap."
            );

        }

    };


    // =====================================================
    // TOGGLE TOPIC
    // =====================================================

    const toggleTopic = async (

        roadmapIndex,

        stageIndex,

        topicIndex

    ) => {

        const roadmap =
            roadmaps[
                roadmapIndex
            ];


        const topic =
            roadmap
                ?.stages?.[
                    stageIndex
                ]
                ?.topics?.[
                    topicIndex
                ];


        if (!roadmap || !topic) {

            return;

        }


        const newCompleted =
            !topic.completed;


        const token =
            localStorage.getItem("token");


        if (!token) {

            toast.error(
                "Please login again."
            );

            return;

        }


        try {

            const response =
                await fetch(

                    `http://localhost:8000/roadmap/${roadmap.id}/stage/${stageIndex}/topic/${topicIndex}`,

                    {

                        method: "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            completed:
                                newCompleted

                        })

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to save progress."
                );

            }


            setRoadmaps(
                previous => {

                    const updated =
                        [...previous];


                    updated[
                        roadmapIndex
                    ] = data.data;


                    return updated;

                }
            );


        } catch (error) {

            console.error(error);

            toast.error(
                "Could not save your progress."
            );

        }

    };


    // =====================================================
    // ROADMAP CARD
    // =====================================================

    const renderRoadmap = (
        roadmap,
        roadmapIndex
    ) => (

        <div
            className="roadmap-instance"
            key={roadmap.id}
        >

            {/* HEADER */}

            <div className="roadmap-result-header">

                <div className="roadmap-title-area">

                    <div className="roadmap-result-icon">

                        <Map size={30} />

                    </div>


                    <div>

                        <span>
                            Roadmap {roadmapIndex + 1}
                        </span>


                        {renameId === roadmap.id ? (

                            <div className="rename-box">

                                <input

                                    value={renameValue}

                                    onChange={(e) =>
                                        setRenameValue(
                                            e.target.value
                                        )
                                    }

                                    autoFocus

                                />

                                <button
                                    onClick={() =>
                                        handleRename(
                                            roadmap.id
                                        )
                                    }
                                >
                                    <CheckCircle2 size={18} />
                                </button>

                                <button
                                    onClick={
                                        cancelRename
                                    }
                                >
                                    <X size={18} />
                                </button>

                            </div>

                        ) : (

                            <>

                                <h1>
                                    {roadmap.role}
                                </h1>

                                <p>
                                    {roadmap.goal}
                                </p>

                            </>

                        )}

                    </div>

                </div>


                <div className="roadmap-actions">

                    <button
                        className="roadmap-menu-button"
                        onClick={() =>
                            setMenuOpen(
                                menuOpen === roadmap.id
                                    ? null
                                    : roadmap.id
                            )
                        }
                    >

                        <MoreVertical size={22} />

                    </button>


                    {menuOpen === roadmap.id && (

                        <div className="roadmap-menu">

                            <button
                                onClick={() =>
                                    startRename(
                                        roadmap
                                    )
                                }
                            >

                                <Pencil size={17} />

                                Rename

                            </button>


                            <button
                                onClick={() =>
                                    handleArchive(
                                        roadmap.id
                                    )
                                }
                            >

                                <Archive size={17} />

                                Archive

                            </button>


                            <button
                                className="danger"
                                onClick={() =>
                                    handleDelete(
                                        roadmap.id
                                    )
                                }
                            >

                                <Trash2 size={17} />

                                Delete

                            </button>

                        </div>

                    )}

                </div>


                <div className="roadmap-xp-card">

                    <Star size={22} />

                    <strong>
                        {roadmap.xp || 0}
                    </strong>

                    <span>
                        XP Earned
                    </span>

                </div>


                <div className="roadmap-progress-card">

                    <Target size={24} />

                    <strong>
                        {roadmap.progress || 0}%
                    </strong>

                    <span>
                        Complete
                    </span>

                </div>

            </div>


            {/* PROGRESS */}

            <div className="roadmap-progress-section">

                <div className="roadmap-progress-top">

                    <span>
                        Roadmap Progress
                    </span>

                    <strong>

                        {roadmap.completed_topics || 0}

                        {" / "}

                        {roadmap.total_topics || 0}

                        {" topics"}

                    </strong>

                </div>


                <div className="roadmap-progress-bar">

                    <div

                        className="roadmap-progress-fill"

                        style={{
                            width:
                                `${roadmap.progress || 0}%`
                        }}

                    />

                </div>

            </div>


            {/* STATS */}

            <div className="roadmap-stats">

                <div className="roadmap-stat">

                    <BookOpen size={25} />

                    <div>

                        <strong>
                            {roadmap.total_stages || 0}
                        </strong>

                        <span>
                            Learning Stages
                        </span>

                    </div>

                </div>


                <div className="roadmap-stat">

                    <Target size={25} />

                    <div>

                        <strong>
                            {roadmap.total_topics || 0}
                        </strong>

                        <span>
                            Topics
                        </span>

                    </div>

                </div>


                <div className="roadmap-stat">

                    <CheckCircle2 size={25} />

                    <div>

                        <strong>
                            {roadmap.completed_topics || 0}
                        </strong>

                        <span>
                            Completed
                        </span>

                    </div>

                </div>


                <div className="roadmap-stat">

                    <Star size={25} />

                    <div>

                        <strong>
                            {roadmap.xp || 0}
                        </strong>

                        <span>
                            XP Earned
                        </span>

                    </div>

                </div>

            </div>


            {/* STAGES */}

            <div className="roadmap-stages">

                {roadmap.stages?.map(
                    (
                        stage,
                        stageIndex
                    ) => (

                        <div
                            className="roadmap-stage"
                            key={stageIndex}
                        >

                            <div className="stage-number">

                                {stageIndex + 1}

                            </div>


                            <div className="stage-content">

                                <div className="stage-header">

                                    <div>

                                        <h2>
                                            {stage.title}
                                        </h2>


                                        <div className="stage-meta">

                                            <span>

                                                <Clock size={15} />

                                                {stage.duration}

                                            </span>


                                            <span>
                                                {stage.difficulty}
                                            </span>

                                        </div>

                                    </div>


                                    <ChevronRight
                                        size={24}
                                    />

                                </div>


                                <div className="stage-topics">

                                    {stage.topics?.map(
                                        (
                                            topic,
                                            topicIndex
                                        ) => (

                                            <button

                                                className={
                                                    topic.completed
                                                        ? "topic-item completed"
                                                        : "topic-item"
                                                }

                                                key={
                                                    topicIndex
                                                }

                                                onClick={() =>
                                                    toggleTopic(
                                                        roadmapIndex,
                                                        stageIndex,
                                                        topicIndex
                                                    )
                                                }

                                            >

                                                <CheckCircle2
                                                    size={18}
                                                />


                                                <span>
                                                    {topic.name}
                                                </span>


                                                {topic.completed && (

                                                    <span className="topic-xp">

                                                        +25 XP

                                                    </span>

                                                )}

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>


            {/* COMPLETE */}

            {roadmap.progress === 100 && (

                <div className="roadmap-complete">

                    <CheckCircle2 size={26} />

                    <div>

                        <strong>
                            Roadmap Completed! 🎉
                        </strong>

                        <p>

                            You completed every topic
                            and earned{" "}

                            <strong>
                                {roadmap.xp} XP
                            </strong>.

                        </p>

                    </div>

                </div>

            )}

        </div>

    );


    return (

        <DashboardLayout>

            <div className="roadmap-page">


                {/* CREATE */}

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

                        Create a New Roadmap

                    </label>


                    <textarea

                        value={goal}

                        onChange={(e) =>
                            setGoal(
                                e.target.value
                            )
                        }

                        placeholder={t(
                            "roadmap.goalPlaceholder"
                        )}

                    />


                    <button
                        onClick={
                            handleGenerate
                        }
                        disabled={loading}
                    >

                        <Sparkles size={18} />

                        {loading
                            ? "Generating..."
                            : "Generate New Roadmap"
                        }

                    </button>

                </div>


                {/* SAVED */}

                {!loadingRoadmaps && (

                    roadmaps.length > 0 ? (

                        roadmaps.map(
                            (
                                roadmap,
                                index
                            ) =>
                                renderRoadmap(
                                    roadmap,
                                    index
                                )
                        )

                    ) : (

                        <div className="roadmap-empty">

                            <Map size={40} />

                            <h2>
                                No Roadmaps Yet
                            </h2>

                            <p>
                                Create your first
                                personalized roadmap above.
                            </p>

                        </div>

                    )

                )}


                {/* ARCHIVED */}

                {archivedRoadmaps.length > 0 && (

                    <div className="archived-section">

                        <button
                            className="archived-toggle"
                            onClick={() =>
                                setShowArchived(
                                    !showArchived
                                )
                            }
                        >

                            <Archive size={20} />

                            Archived Roadmaps

                            <span>
                                {archivedRoadmaps.length}
                            </span>

                        </button>


                        {showArchived && (

                            <div className="archived-list">

                                {archivedRoadmaps.map(
                                    roadmap => (

                                        <div
                                            className="archived-card"
                                            key={
                                                roadmap.id
                                            }
                                        >

                                            <div>

                                                <Archive
                                                    size={22}
                                                />

                                                <div>

                                                    <h3>
                                                        {roadmap.role}
                                                    </h3>

                                                    <p>
                                                        {roadmap.goal}
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="archived-actions">

                                                <button
                                                    onClick={() =>
                                                        handleRestore(
                                                            roadmap.id
                                                        )
                                                    }
                                                >

                                                    <RotateCcw
                                                        size={17}
                                                    />

                                                    Restore

                                                </button>


                                                <button
                                                    className="danger"
                                                    onClick={() =>
                                                        handleDelete(
                                                            roadmap.id
                                                        )
                                                    }
                                                >

                                                    <Trash2
                                                        size={17}
                                                    />

                                                    Delete

                                                </button>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};


export default Roadmap;