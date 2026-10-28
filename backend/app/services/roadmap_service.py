import json


TOPIC_XP = 25


def normalize_goal(goal: str) -> str:

    if not goal:
        return ""

    return " ".join(
        goal.strip().lower().split()
    )


def detect_role(goal: str) -> str:

    normalized = normalize_goal(goal)

    if (
        "machine learning" in normalized
        or "ml engineer" in normalized
    ):
        return "Machine Learning Engineer"

    if (
        "ai engineer" in normalized
        or "artificial intelligence" in normalized
    ):
        return "AI Engineer"

    if (
        "data scientist" in normalized
        or "data science" in normalized
    ):
        return "Data Scientist"

    if (
        "full stack" in normalized
        or "fullstack" in normalized
    ):
        return "Full Stack Developer"

    if (
        "frontend" in normalized
        or "front end" in normalized
    ):
        return "Frontend Developer"

    if (
        "backend" in normalized
        or "back end" in normalized
    ):
        return "Backend Developer"

    if (
        "software engineer" in normalized
        or "sde" in normalized
        or "software developer" in normalized
    ):
        return "Software Engineer"

    return "Software Engineer"


def get_role_roadmap(role: str) -> list:

    roadmaps = {

        "Software Engineer": [

            {
                "title": "Programming Foundations",
                "duration": "1–2 weeks",
                "difficulty": "Beginner",
                "topics": [
                    "Data Structures",
                    "Algorithms",
                    "Object-Oriented Programming",
                    "Problem Solving",
                    "Time and Space Complexity"
                ]
            },

            {
                "title": "Core Computer Science",
                "duration": "2–3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "Operating Systems",
                    "Database Management Systems",
                    "Computer Networks",
                    "Software Engineering",
                    "System Design Fundamentals"
                ]
            },

            {
                "title": "Development Skills",
                "duration": "2–3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "Git and GitHub",
                    "REST APIs",
                    "Backend Development",
                    "Frontend Fundamentals",
                    "Authentication and Security"
                ]
            },

            {
                "title": "Interview Preparation",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "Coding Interview Problems",
                    "Technical Interview Questions",
                    "Behavioral Questions",
                    "Resume-Based Questions",
                    "Mock Interviews"
                ]
            },

            {
                "title": "Placement Readiness",
                "duration": "1–2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "Company-Specific Preparation",
                    "Aptitude",
                    "Communication",
                    "Problem Solving",
                    "Interview Strategy"
                ]
            }

        ],

        "Frontend Developer": [

            {
                "title": "Web Foundations",
                "duration": "1 week",
                "difficulty": "Beginner",
                "topics": [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Responsive Design"
                ]
            },

            {
                "title": "Modern Frontend",
                "duration": "2–3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "React",
                    "Components",
                    "State Management",
                    "Hooks",
                    "Routing"
                ]
            },

            {
                "title": "Production Frontend",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "API Integration",
                    "Authentication",
                    "Performance Optimization",
                    "Testing",
                    "Deployment"
                ]
            },

            {
                "title": "Frontend Interview Preparation",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "JavaScript Interview Questions",
                    "React Interview Questions",
                    "Frontend System Design",
                    "Coding Problems",
                    "Behavioral Questions"
                ]
            }

        ],

        "Backend Developer": [

            {
                "title": "Backend Foundations",
                "duration": "1–2 weeks",
                "difficulty": "Beginner",
                "topics": [
                    "Programming Fundamentals",
                    "HTTP",
                    "REST APIs",
                    "Client-Server Architecture"
                ]
            },

            {
                "title": "Backend Development",
                "duration": "2–3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "Node.js",
                    "Express",
                    "FastAPI",
                    "Authentication",
                    "API Design"
                ]
            },

            {
                "title": "Databases and Systems",
                "duration": "2 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "SQL",
                    "PostgreSQL",
                    "MongoDB",
                    "Database Design",
                    "Caching"
                ]
            },

            {
                "title": "Advanced Backend",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "System Design",
                    "Scalability",
                    "Microservices",
                    "Security",
                    "Deployment"
                ]
            },

            {
                "title": "Backend Interview Preparation",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "Backend Interview Questions",
                    "System Design",
                    "Coding Problems",
                    "Database Questions",
                    "Behavioral Questions"
                ]
            }

        ],

        "Full Stack Developer": [

            {
                "title": "Frontend Foundations",
                "duration": "1–2 weeks",
                "difficulty": "Beginner",
                "topics": [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Responsive Design"
                ]
            },

            {
                "title": "Frontend Development",
                "duration": "2 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "React",
                    "State Management",
                    "Routing",
                    "API Integration"
                ]
            },

            {
                "title": "Backend Development",
                "duration": "2–3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "Node.js",
                    "Express",
                    "REST APIs",
                    "Authentication",
                    "Database Integration"
                ]
            },

            {
                "title": "Full Stack Architecture",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "System Design",
                    "Security",
                    "Caching",
                    "Deployment",
                    "Cloud Fundamentals"
                ]
            },

            {
                "title": "Full Stack Interview Preparation",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "Coding Problems",
                    "Frontend Questions",
                    "Backend Questions",
                    "System Design",
                    "Behavioral Questions"
                ]
            }

        ],

        "AI Engineer": [

            {
                "title": "Python and Mathematics",
                "duration": "2 weeks",
                "difficulty": "Beginner",
                "topics": [
                    "Python",
                    "NumPy",
                    "Linear Algebra",
                    "Probability",
                    "Statistics"
                ]
            },

            {
                "title": "Machine Learning",
                "duration": "3 weeks",
                "difficulty": "Intermediate",
                "topics": [
                    "Supervised Learning",
                    "Unsupervised Learning",
                    "Feature Engineering",
                    "Model Evaluation",
                    "Scikit-learn"
                ]
            },

            {
                "title": "Deep Learning",
                "duration": "3 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "Neural Networks",
                    "CNNs",
                    "RNNs",
                    "Transformers",
                    "PyTorch"
                ]
            },

            {
                "title": "Generative AI",
                "duration": "2–3 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "LLMs",
                    "Prompt Engineering",
                    "Embeddings",
                    "Vector Databases",
                    "RAG"
                ]
            },

            {
                "title": "AI Engineering Interview",
                "duration": "2 weeks",
                "difficulty": "Advanced",
                "topics": [
                    "ML Interview Questions",
                    "Deep Learning Questions",
                    "LLM Questions",
                    "ML System Design",
                    "Coding Problems"
                ]
            }

        ]

    }

    return roadmaps.get(
        role,
        roadmaps["Software Engineer"]
    )


def generate_roadmap(goal: str) -> dict:

    role = detect_role(goal)

    raw_stages = get_role_roadmap(role)

    stages = []

    total_topics = 0

    for stage in raw_stages:

        topics = []

        for topic in stage["topics"]:

            topics.append({
                "name": topic,
                "completed": False
            })

            total_topics += 1

        stages.append({

            "title": stage["title"],

            "duration": stage["duration"],

            "difficulty": stage["difficulty"],

            "topics": topics

        })

    return {

        "role": role,

        "goal": goal.strip(),

        "total_stages": len(stages),

        "progress": 0,

        "completed_topics": 0,

        "total_topics": total_topics,

        "xp": 0,

        "stages": stages

    }


def calculate_roadmap_progress(
    roadmap_data: dict
) -> dict:

    completed_topics = 0

    total_topics = 0

    for stage in roadmap_data.get(
        "stages",
        []
    ):

        for topic in stage.get(
            "topics",
            []
        ):

            total_topics += 1

            if topic.get(
                "completed",
                False
            ):

                completed_topics += 1

    progress = (
        round(
            (
                completed_topics /
                total_topics
            ) * 100
        )
        if total_topics > 0
        else 0
    )

    xp = completed_topics * TOPIC_XP

    roadmap_data["completed_topics"] = (
        completed_topics
    )

    roadmap_data["total_topics"] = (
        total_topics
    )

    roadmap_data["progress"] = progress

    roadmap_data["xp"] = xp

    return roadmap_data


def serialize_roadmap(
    roadmap_data: dict
) -> str:

    return json.dumps(
        roadmap_data
    )


def deserialize_roadmap(
    roadmap_data: str
) -> dict:

    return json.loads(
        roadmap_data
    )