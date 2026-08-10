import io
import re

from pypdf import PdfReader
from docx import Document


# =========================================================
# PDF EXTRACTION
# =========================================================

def extract_pdf_text(file_bytes: bytes) -> str:

    text_parts = []

    pdf_file = io.BytesIO(file_bytes)
    reader = PdfReader(pdf_file)

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text_parts.append(page_text)

    return "\n".join(text_parts).strip()


# =========================================================
# DOCX EXTRACTION
# =========================================================

def extract_docx_text(file_bytes: bytes) -> str:

    docx_file = io.BytesIO(file_bytes)
    document = Document(docx_file)

    text_parts = []

    for paragraph in document.paragraphs:

        text = paragraph.text.strip()

        if text:
            text_parts.append(text)

    return "\n".join(text_parts).strip()


# =========================================================
# GENERAL EXTRACTION
# =========================================================

def extract_resume_text(
    file_bytes: bytes,
    filename: str
) -> str:

    filename_lower = filename.lower()

    if filename_lower.endswith(".pdf"):
        return extract_pdf_text(file_bytes)

    if filename_lower.endswith(".docx"):
        return extract_docx_text(file_bytes)

    raise ValueError(
        "Unsupported file format. "
        "Only PDF and DOCX are supported."
    )


# =========================================================
# SECTION EXTRACTION
# =========================================================

def find_section(
    text: str,
    section_names: list[str]
) -> str:

    lines = text.splitlines()

    start_index = None

    normalized_section_names = {
        section.lower().strip()
        for section in section_names
    }

    for index, line in enumerate(lines):

        normalized = line.strip().lower()

        if normalized in normalized_section_names:

            start_index = index + 1
            break

    if start_index is None:
        return ""

    section_lines = []

    common_sections = {

        "education",
        "academic background",
        "educational background",

        "experience",
        "work experience",
        "professional experience",

        "skills",
        "technical skills",
        "technical skill",
        "key skills",

        "projects",
        "academic projects",
        "personal projects",

        "certifications",
        "certificates",

        "achievements",
        "accomplishments",

        "summary",
        "professional summary",

        "profile",
        "objective",

        "contact",

        "internship",
        "internships"

    }

    for line in lines[start_index:]:

        normalized = line.strip().lower()

        if normalized in common_sections:
            break

        if line.strip():

            section_lines.append(
                line.strip()
            )

    return "\n".join(section_lines).strip()


# =========================================================
# CONTACT EXTRACTION
# =========================================================

def extract_email(text: str) -> str:

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    return match.group(0) if match else ""


def extract_phone(text: str) -> str:

    match = re.search(
        r"(?:\+91[\s-]?)?[6-9]\d{9}",
        text
    )

    return match.group(0) if match else ""


# =========================================================
# RESUME PARSER
# =========================================================

def parse_resume(text: str) -> dict:

    return {

        "contact": {

            "email":
                extract_email(text),

            "phone":
                extract_phone(text)

        },

        "sections": {

            "summary":
                find_section(
                    text,
                    [
                        "summary",
                        "professional summary",
                        "profile",
                        "objective"
                    ]
                ),

            "skills":
                find_section(
                    text,
                    [
                        "skills",
                        "technical skills",
                        "technical skill",
                        "key skills"
                    ]
                ),

            "education":
                find_section(
                    text,
                    [
                        "education",
                        "academic background",
                        "educational background"
                    ]
                ),

            "experience":
                find_section(
                    text,
                    [
                        "experience",
                        "work experience",
                        "professional experience",
                        "internship",
                        "internships"
                    ]
                ),

            "projects":
                find_section(
                    text,
                    [
                        "projects",
                        "academic projects",
                        "personal projects"
                    ]
                ),

            "certifications":
                find_section(
                    text,
                    [
                        "certifications",
                        "certificates"
                    ]
                ),

            "achievements":
                find_section(
                    text,
                    [
                        "achievements",
                        "accomplishments"
                    ]
                )

        },

        "raw_text": text

    }


# =========================================================
# TARGET ROLE SKILLS
# =========================================================

ROLE_SKILLS = {

    "Software Engineer": [

        "java",
        "python",
        "c++",
        "data structures",
        "algorithms",
        "oop",
        "sql",
        "git",
        "rest api",
        "problem solving"

    ],

    "Frontend Developer": [

        "html",
        "css",
        "javascript",
        "react",
        "typescript",
        "tailwind",
        "bootstrap",
        "git"

    ],

    "Backend Developer": [

        "python",
        "java",
        "node.js",
        "express.js",
        "fastapi",
        "sql",
        "postgresql",
        "mongodb",
        "rest api",
        "git"

    ],

    "Full Stack Developer": [

        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "express.js",
        "mongodb",
        "sql",
        "rest api",
        "git"

    ],

    "AI Engineer": [

        "python",
        "machine learning",
        "deep learning",
        "nlp",
        "transformers",
        "tensorflow",
        "pytorch",
        "computer vision",
        "generative ai",
        "llm"

    ],

    "Machine Learning Engineer": [

        "python",
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "scikit-learn",
        "numpy",
        "pandas",
        "nlp",
        "computer vision"

    ],

    "Data Scientist": [

        "python",
        "sql",
        "machine learning",
        "statistics",
        "pandas",
        "numpy",
        "scikit-learn",
        "data analysis",
        "data visualization",
        "matplotlib"

    ]

}


# =========================================================
# TARGET COMPANY SKILLS
# =========================================================

COMPANY_SKILLS = {

    "Google": [

        "data structures",
        "algorithms",
        "python",
        "java",
        "c++",
        "system design",
        "problem solving"

    ],

    "Microsoft": [

        "data structures",
        "algorithms",
        "c++",
        "c#",
        "python",
        "azure",
        "system design"

    ],

    "Amazon": [

        "data structures",
        "algorithms",
        "java",
        "python",
        "aws",
        "system design",
        "problem solving"

    ],

    "Adobe": [

        "java",
        "c++",
        "python",
        "javascript",
        "data structures",
        "algorithms",
        "problem solving"

    ],

    "NVIDIA": [

        "c++",
        "python",
        "cuda",
        "machine learning",
        "deep learning",
        "computer vision"

    ],

    "Oracle": [

        "java",
        "sql",
        "database",
        "cloud",
        "python",
        "data structures"

    ],

    "JP Morgan": [

        "java",
        "python",
        "sql",
        "data structures",
        "algorithms",
        "finance"

    ],

    "Goldman Sachs": [

        "java",
        "python",
        "sql",
        "data structures",
        "algorithms",
        "finance"

    ],

    "Infosys": [

        "java",
        "python",
        "sql",
        "data structures",
        "algorithms",
        "communication"

    ],

    "TCS": [

        "java",
        "python",
        "sql",
        "data structures",
        "algorithms",
        "problem solving"

    ],

    "Accenture": [

        "java",
        "python",
        "sql",
        "cloud",
        "data structures",
        "communication"

    ]

}


# =========================================================
# EXPERIENCE RECOMMENDATIONS
# =========================================================

EXPERIENCE_RECOMMENDATIONS = {

    "Fresher": [

        "Data Structures and Algorithms",
        "Problem Solving",
        "Projects",
        "Technical Fundamentals",
        "Interview Practice"

    ],

    "Intern": [

        "Data Structures and Algorithms",
        "Projects",
        "Practical Development",
        "Technical Fundamentals",
        "Interview Practice"

    ],

    "0-2 Years": [

        "System Design Fundamentals",
        "Production Experience",
        "Advanced Problem Solving",
        "Technical Interviews"

    ],

    "2-5 Years": [

        "System Design",
        "Architecture",
        "Leadership",
        "Advanced Technical Skills",
        "Domain Expertise"

    ]

}


# =========================================================
# TEXT NORMALIZATION
# =========================================================

def normalize_text(text: str) -> str:

    text = text.lower()

    text = re.sub(
        r"[^a-z0-9+#.\s]",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# =========================================================
# KEYWORD MATCHING
# =========================================================

def keyword_exists(
    keyword: str,
    resume_text: str
) -> bool:

    normalized_resume = normalize_text(
        resume_text
    )

    normalized_keyword = normalize_text(
        keyword
    )

    if not normalized_keyword:
        return False

    return normalized_keyword in normalized_resume


# =========================================================
# TARGET-AWARE ANALYSIS
# =========================================================

def analyze_resume_target(
    parsed_resume: dict,
    target_company: str,
    target_role: str,
    experience_level: str
) -> dict:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    resume_text = " ".join([

        sections.get("summary", ""),

        sections.get("skills", ""),

        sections.get("education", ""),

        sections.get("experience", ""),

        sections.get("projects", ""),

        sections.get("certifications", ""),

        sections.get("achievements", "")

    ])

    normalized_resume = normalize_text(
        resume_text
    )

    role_skills = ROLE_SKILLS.get(
        target_role,
        []
    )

    company_skills = COMPANY_SKILLS.get(
        target_company,
        []
    )

    required_skills = list(
        dict.fromkeys(
            role_skills + company_skills
        )
    )

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        normalized_skill = normalize_text(
            skill
        )

        if normalized_skill in normalized_resume:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)

    if required_skills:

        skill_match_percentage = round(
            (
                len(matched_skills)
                / len(required_skills)
            ) * 100
        )

    else:

        skill_match_percentage = 0

    recommendations = (
        EXPERIENCE_RECOMMENDATIONS.get(
            experience_level,
            []
        )
    )

    return {

        "target_company":
            target_company,

        "target_role":
            target_role,

        "experience_level":
            experience_level,

        "skill_match_percentage":
            skill_match_percentage,

        "matched_skills":
            matched_skills,

        "missing_skills":
            missing_skills,

        "matched_keywords":
            matched_skills,

        "missing_keywords":
            missing_skills,

        "keyword_match":
            skill_match_percentage,

        "experience_recommendations":
            recommendations,

        "total_required_skills":
            len(required_skills),

        "matched_skill_count":
            len(matched_skills),

        "missing_skill_count":
            len(missing_skills)

    }


# =========================================================
# MISSING KEYWORD ANALYSIS
# =========================================================

def analyze_missing_keywords(
    resume_text: str,
    target_company: str,
    target_role: str,
    experience_level: str
) -> dict:

    role_skills = ROLE_SKILLS.get(
        target_role,
        []
    )

    company_skills = COMPANY_SKILLS.get(
        target_company,
        []
    )

    required_keywords = list(
        dict.fromkeys(
            role_skills + company_skills
        )
    )

    matched_keywords = []
    missing_keywords = []

    for keyword in required_keywords:

        if keyword_exists(
            keyword,
            resume_text
        ):

            matched_keywords.append(
                keyword
            )

        else:

            missing_keywords.append(
                keyword
            )

    total = len(
        required_keywords
    )

    if total > 0:

        match_percentage = round(
            (
                len(matched_keywords)
                / total
            ) * 100
        )

    else:

        match_percentage = 0

    return {

        "target_company":
            target_company,

        "target_role":
            target_role,

        "experience_level":
            experience_level,

        "required_keywords":
            required_keywords,

        "matched_keywords":
            matched_keywords,

        "missing_keywords":
            missing_keywords,

        "keyword_match":
            match_percentage

    }


# =========================================================
# ATS SCORE
# =========================================================

def calculate_ats_score(
    parsed_resume: dict,
    target_analysis: dict
) -> dict:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    contact = parsed_resume.get(
        "contact",
        {}
    )

    # -----------------------------------------------------
    # 1. TARGET SKILL MATCH — 60%
    # -----------------------------------------------------

    skill_match = target_analysis.get(
        "skill_match_percentage",
        0
    )

    skill_score = round(
        skill_match * 0.60
    )

    # -----------------------------------------------------
    # 2. SECTION COMPLETENESS — 20%
    # -----------------------------------------------------

    important_sections = [

        "summary",
        "skills",
        "education",
        "experience",
        "projects",
        "certifications",
        "achievements"

    ]

    completed_sections = 0

    for section in important_sections:

        if sections.get(
            section,
            ""
        ).strip():

            completed_sections += 1

    section_percentage = round(
        (
            completed_sections
            / len(important_sections)
        ) * 100
    )

    section_score = round(
        section_percentage * 0.20
    )

    # -----------------------------------------------------
    # 3. CONTACT COMPLETENESS — 20%
    # -----------------------------------------------------

    contact_points = 0

    if contact.get("email"):
        contact_points += 50

    if contact.get("phone"):
        contact_points += 50

    contact_score = round(
        contact_points * 0.20
    )

    # -----------------------------------------------------
    # FINAL SCORE
    # -----------------------------------------------------

    ats_score = (
        skill_score
        + section_score
        + contact_score
    )

    ats_score = min(
        100,
        max(
            0,
            ats_score
        )
    )

    # -----------------------------------------------------
    # VERDICT
    # -----------------------------------------------------

    if ats_score >= 85:

        verdict = "Excellent"

        message = (
            "Your resume is highly optimized "
            "for the selected target."
        )

    elif ats_score >= 70:

        verdict = "Good"

        message = (
            "Your resume is reasonably optimized "
            "but some improvements are recommended."
        )

    elif ats_score >= 50:

        verdict = "Needs Improvement"

        message = (
            "Your resume needs improvement "
            "to better match the selected target."
        )

    else:

        verdict = "Needs Major Improvement"

        message = (
            "Your resume has significant gaps "
            "for the selected target."
        )

    return {

        "score":
            ats_score,

        "skill_score":
            skill_score,

        "section_score":
            section_score,

        "contact_score":
            contact_score,

        "skill_match_percentage":
            skill_match,

        "completed_sections":
            completed_sections,

        "total_sections":
            len(important_sections),

        "verdict":
            verdict,

        "message":
            message

    }


# =========================================================
# RESUME QUALITY ANALYSIS
# =========================================================

def calculate_resume_quality(
    parsed_resume: dict
) -> dict:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    raw_text = parsed_resume.get(
        "raw_text",
        ""
    )

    normalized_text = normalize_text(
        raw_text
    )

    # Grammar / readability heuristic
    sentences = re.split(
        r"[.!?]+",
        raw_text
    )

    sentences = [
        sentence.strip()
        for sentence in sentences
        if sentence.strip()
    ]

    long_sentences = 0

    for sentence in sentences:

        if len(sentence.split()) > 35:
            long_sentences += 1

    if sentences:

        readability = max(
            60,
            100 - round(
                (
                    long_sentences
                    / len(sentences)
                ) * 40
            )
        )

    else:

        readability = 70

    # Formatting heuristic
    formatting = 100

    if len(raw_text) < 200:
        formatting -= 20

    if "\t" in raw_text:
        formatting -= 5

    if "  " in raw_text:
        formatting -= 5

    formatting = max(
        60,
        formatting
    )

    # Professional tone heuristic
    professional_words = [

        "developed",
        "implemented",
        "designed",
        "engineered",
        "optimized",
        "analyzed",
        "created",
        "managed",
        "built",
        "integrated"

    ]

    professional_matches = sum(
        1
        for word in professional_words
        if word in normalized_text
    )

    professional_tone = min(
        100,
        70 + professional_matches * 3
    )

    # Grammar heuristic
    grammar = 95

    if raw_text.count("??") > 0:
        grammar -= 5

    if raw_text.count("!!") > 0:
        grammar -= 5

    grammar = max(
        60,
        grammar
    )

    quality_score = round(
        (
            grammar
            + formatting
            + readability
            + professional_tone
        ) / 4
    )

    return {

        "grammar": grammar,

        "formatting": formatting,

        "readability": readability,

        "professional_tone":
            professional_tone,

        "overall":
            quality_score

    }


# =========================================================
# PROJECT ANALYSIS
# =========================================================

def analyze_projects(
    parsed_resume: dict
) -> dict:

    projects_text = parsed_resume.get(
        "sections",
        {}
    ).get(
        "projects",
        ""
    )

    if not projects_text.strip():

        return {

            "project_count": 0,

            "projects": [],

            "message":
                "No project section detected."

        }

    # Split project entries using common formatting
    project_blocks = re.split(
        r"\n(?=[A-Z][A-Za-z0-9 .&_-]{2,50}\s*(?:[-|:]|\n))",
        projects_text
    )

    project_blocks = [
        block.strip()
        for block in project_blocks
        if block.strip()
    ]

    if not project_blocks:

        project_blocks = [
            projects_text.strip()
        ]

    projects = []

    for index, project in enumerate(
        project_blocks,
        start=1
    ):

        normalized_project = normalize_text(
            project
        )

        technology_terms = [

            "java",
            "python",
            "c++",
            "javascript",
            "react",
            "node.js",
            "express.js",
            "mongodb",
            "sql",
            "tensorflow",
            "pytorch",
            "opencv",
            "android",
            "firebase",
            "fastapi",
            "postgresql",
            "docker",
            "aws",
            "azure"

        ]

        technologies = [

            technology
            for technology in technology_terms
            if normalize_text(
                technology
            ) in normalized_project

        ]

        measurable = bool(
            re.search(
                r"\b\d+%|\b\d+\+|\b\d+\s*(users|records|"
                r"projects|features|models|datasets|"
                r"requests|ms|seconds)\b",
                normalized_project
            )
        )

        score = 60

        if technologies:
            score += min(
                20,
                len(technologies) * 4
            )

        if measurable:
            score += 10

        if len(project.split()) >= 20:
            score += 10

        score = min(
            100,
            score
        )

        projects.append({

            "name":
                f"Project {index}",

            "score":
                score,

            "technologies":
                technologies,

            "has_measurable_impact":
                measurable

        })

    projects.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return {

        "project_count":
            len(projects),

        "projects":
            projects,

        "top_project":
            projects[0] if projects else None

    }


# =========================================================
# RESUME RISK DETECTOR
# =========================================================

def detect_resume_risks(
    parsed_resume: dict,
    target_analysis: dict
) -> list:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    contact = parsed_resume.get(
        "contact",
        {}
    )

    risks = []

    # Missing contact information
    if not contact.get("email"):

        risks.append({

            "type":
                "Contact Information",

            "severity":
                "High",

            "message":
                "Email address was not detected."

        })

    if not contact.get("phone"):

        risks.append({

            "type":
                "Contact Information",

            "severity":
                "Medium",

            "message":
                "Phone number was not detected."

        })

    # Missing sections
    if not sections.get("skills", "").strip():

        risks.append({

            "type":
                "Skills",

            "severity":
                "High",

            "message":
                "A dedicated skills section was not detected."

        })

    if not sections.get("education", "").strip():

        risks.append({

            "type":
                "Education",

            "severity":
                "Medium",

            "message":
                "Education section was not detected."

        })

    if not sections.get("projects", "").strip():

        risks.append({

            "type":
                "Projects",

            "severity":
                "Medium",

            "message":
                "No projects section was detected."

        })

    # Target mismatch
    skill_match = target_analysis.get(
        "skill_match_percentage",
        0
    )

    if skill_match < 50:

        risks.append({

            "type":
                "Target Match",

            "severity":
                "High",

            "message":
                "The resume has a low skill match "
                "with the selected target."

        })

    elif skill_match < 70:

        risks.append({

            "type":
                "Target Match",

            "severity":
                "Medium",

            "message":
                "Several target-specific skills "
                "could be added."

        })

    # Project impact
    projects = sections.get(
        "projects",
        ""
    )

    if projects:

        has_numbers = bool(
            re.search(
                r"\b\d+%|\b\d+\+|\b\d+\s*(users|"
                r"records|features|models|datasets)\b",
                projects.lower()
            )
        )

        if not has_numbers:

            risks.append({

                "type":
                    "Project Impact",

                "severity":
                    "Medium",

                "message":
                    "Project descriptions lack "
                    "measurable achievements or impact."

            })

    return risks


# =========================================================
# RESUME INTELLIGENCE
# =========================================================

def generate_resume_insights(
    parsed_resume: dict,
    target_analysis: dict
) -> dict:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    # -----------------------------------------------------
    # QUALITY ANALYSIS
    # -----------------------------------------------------

    quality_data = calculate_resume_quality(
        parsed_resume
    )

    grammar = quality_data.get(
        "grammar",
        0
    )

    formatting = quality_data.get(
        "formatting",
        0
    )

    readability = quality_data.get(
        "readability",
        0
    )

    professional_tone = quality_data.get(
        "professional_tone",
        0
    )

    overall_quality = quality_data.get(
        "overall",
        0
    )


    # -----------------------------------------------------
    # SECTION ANALYSIS
    # -----------------------------------------------------

    section_names = [

        "summary",
        "skills",
        "education",
        "experience",
        "projects",
        "certifications",
        "achievements"

    ]


    completed_sections = []
    missing_sections = []


    for section in section_names:

        section_content = sections.get(
            section,
            ""
        )


        if (
            isinstance(section_content, str)
            and section_content.strip()
        ):

            completed_sections.append(
                section
            )

        else:

            missing_sections.append(
                section
            )


    section_score = round(
        (
            len(completed_sections)
            / len(section_names)
        ) * 100
    )


    # -----------------------------------------------------
    # PROJECT ANALYSIS
    # -----------------------------------------------------

    project_data = analyze_projects(
        parsed_resume
    )


    project_list = project_data.get(
        "projects",
        []
    )


    project_count = project_data.get(
        "project_count",
        0
    )


    # Calculate project strength

    if project_list:

        average_project_score = round(
            sum(
                project.get(
                    "score",
                    0
                )
                for project in project_list
            )
            / len(project_list)
        )

    else:

        average_project_score = 0


    if average_project_score >= 85:

        project_strength = "Excellent"

    elif average_project_score >= 70:

        project_strength = "Strong"

    elif average_project_score >= 50:

        project_strength = "Moderate"

    elif project_count > 0:

        project_strength = "Needs Improvement"

    else:

        project_strength = "No Projects"


    # -----------------------------------------------------
    # TARGET SKILLS INSIDE PROJECTS
    # -----------------------------------------------------

    projects_text = sections.get(
        "projects",
        ""
    )


    normalized_projects = normalize_text(
        projects_text
    )


    matched_project_skills = []


    target_matched_skills = target_analysis.get(
        "matched_skills",
        []
    )


    for skill in target_matched_skills:

        if normalize_text(skill) in normalized_projects:

            matched_project_skills.append(
                skill
            )


    # -----------------------------------------------------
    # PROJECT RELEVANCE
    # -----------------------------------------------------

    target_skill_count = len(
        target_matched_skills
    )


    if target_skill_count > 0:

        project_relevance = round(
            (
                len(matched_project_skills)
                / target_skill_count
            ) * 100
        )

    elif project_count > 0:

        project_relevance = 50

    else:

        project_relevance = 0


    project_relevance = min(
        100,
        max(
            0,
            project_relevance
        )
    )


    if project_count == 0:

        project_message = (
            "No project section was detected. "
            "Add relevant technical projects "
            "aligned with the target role."
        )

    elif project_relevance >= 75:

        project_message = (
            "Your projects show strong alignment "
            "with the selected target."
        )

    elif project_relevance >= 50:

        project_message = (
            "Your projects show moderate alignment "
            "with the selected target. Consider "
            "highlighting more relevant technologies."
        )

    else:

        project_message = (
            "Your projects have limited alignment "
            "with the selected target. Add or "
            "highlight projects using relevant skills."
        )


    # -----------------------------------------------------
    # TARGET MATCH
    # -----------------------------------------------------

    target_company = target_analysis.get(
        "target_company",
        ""
    )


    target_role = target_analysis.get(
        "target_role",
        ""
    )


    skill_match = target_analysis.get(
        "skill_match_percentage",
        0
    )


    # -----------------------------------------------------
    # RISKS
    # -----------------------------------------------------

    risks = detect_resume_risks(
        parsed_resume,
        target_analysis
    )


    # -----------------------------------------------------
    # RECOMMENDATIONS
    # -----------------------------------------------------

    recommendations = []


    missing_keywords = target_analysis.get(
        "missing_keywords",
        []
    )


    matched_keywords = target_analysis.get(
        "matched_keywords",
        []
    )


    if missing_keywords:

        recommendations.append(
            "Add relevant target-specific skills "
            "from the missing keyword list."
        )


    if not sections.get(
        "summary",
        ""
    ).strip():

        recommendations.append(
            "Add a concise professional summary "
            "aligned with the target role."
        )


    if not sections.get(
        "certifications",
        ""
    ).strip():

        recommendations.append(
            "Consider adding relevant technical "
            "certifications."
        )


    if not sections.get(
        "achievements",
        ""
    ).strip():

        recommendations.append(
            "Add measurable achievements or "
            "leadership accomplishments."
        )


    if project_count > 0:

        weak_projects = [

            project
            for project in project_list

            if project.get(
                "score",
                0
            ) < 80

        ]


        if weak_projects:

            recommendations.append(
                "Strengthen project descriptions with "
                "technologies, metrics and measurable impact."
            )


    # -----------------------------------------------------
    # FINAL RESPONSE
    #
    # IMPORTANT:
    # This structure exactly matches
    # ResumeInsights.jsx
    # -----------------------------------------------------

    return {

        # =================================================
        # QUALITY
        # =================================================

        "quality": {

            "overall_score":
                overall_quality,

            "section_score":
                section_score,

            "impact_score":
                average_project_score,

            "structure_score":
                round(
                    (
                        grammar
                        + formatting
                        + readability
                    ) / 3
                ),

            "grammar":
                grammar,

            "formatting":
                formatting,

            "readability":
                readability,

            "professional_tone":
                professional_tone

        },


        # =================================================
        # SECTION ANALYSIS
        # =================================================

        "section_analysis": {

            "completed":
                completed_sections,

            "missing":
                missing_sections,

            "total":
                len(section_names),

            "completed_count":
                len(completed_sections),

            "missing_count":
                len(missing_sections)

        },


        # =================================================
        # PROJECT ANALYSIS
        # =================================================

        "projects": {

            "project_count":
                project_count,

            "relevance_score":
                project_relevance,

            "strength":
                project_strength,

            "message":
                project_message,

            "matched_project_skills":
                matched_project_skills,

            "projects":
                project_list

        },


        # =================================================
        # TARGET MATCH
        # =================================================

        "company_match": {

            "company":
                target_company,

            "role":
                target_role,

            "score":
                skill_match

        },


        # =================================================
        # KEYWORDS
        # =================================================

        "missing_keywords":
            missing_keywords,

        "matched_keywords":
            matched_keywords,

        "keyword_match":
            target_analysis.get(
                "keyword_match",
                skill_match
            ),


        # =================================================
        # RISKS
        # =================================================

        "risks":
            risks,


        # =================================================
        # RECOMMENDATIONS
        # =================================================

        "recommendations":
            recommendations,


        # =================================================
        # TARGET INFORMATION
        # =================================================

        "target_company":
            target_company,

        "target_role":
            target_role,

        "experience_level":
            target_analysis.get(
                "experience_level",
                ""
            )

    }

# =========================================================
# RESUME INTERVIEW QUESTION GENERATOR
# =========================================================

def generate_resume_interview_questions(
    parsed_resume: dict,
    target_analysis: dict
) -> list:

    sections = parsed_resume.get(
        "sections",
        {}
    )

    questions = []

    target_company = target_analysis.get(
        "target_company",
        ""
    )

    target_role = target_analysis.get(
        "target_role",
        ""
    )

    experience_level = target_analysis.get(
        "experience_level",
        ""
    )

    # -----------------------------------------------------
    # EXTRACT RESUME CONTENT
    # -----------------------------------------------------

    projects_text = sections.get(
        "projects",
        ""
    ).strip()

    skills_text = sections.get(
        "skills",
        ""
    ).strip()

    experience_text = sections.get(
        "experience",
        ""
    ).strip()

    summary_text = sections.get(
        "summary",
        ""
    ).strip()

    # -----------------------------------------------------
    # 1. INTRODUCTION QUESTION
    # -----------------------------------------------------

    questions.append({
        "question":
            "Tell me about yourself and walk me through your "
            "background based on your resume.",

        "type":
            "Introduction",

        "difficulty":
            "Easy"
    })

    # -----------------------------------------------------
    # 2. RESUME SUMMARY QUESTION
    # -----------------------------------------------------

    if summary_text:

        questions.append({
            "question":
                "Your resume includes a professional summary. "
                "Can you explain the key strengths mentioned "
                "there and how they relate to the role you are "
                f"targeting at {target_company}?",

            "type":
                "Resume Summary",

            "difficulty":
                "Medium"
        })

    # -----------------------------------------------------
    # 3. PROJECT QUESTIONS
    # -----------------------------------------------------

    if projects_text:

        project_lines = [
            line.strip()
            for line in projects_text.splitlines()
            if line.strip()
        ]

        project_name = None

        # Try to find a likely project title
        for line in project_lines:

            if len(line.split()) <= 8:

                project_name = line.strip()

                if not project_name.endswith("."):
                    break

        if project_name:

            questions.append({
                "question":
                    f"Explain the {project_name} project from "
                    "your resume. What problem did you solve, "
                    "what was your approach, and what was your "
                    "individual contribution?",

                "type":
                    "Project",

                "difficulty":
                    "Medium"
            })

        else:

            questions.append({
                "question":
                    "Explain one of the most important projects "
                    "on your resume. What problem did you solve, "
                    "what technologies did you use, and what was "
                    "your individual contribution?",

                "type":
                    "Project",

                "difficulty":
                    "Medium"
            })

        # Technical project deep dive

        questions.append({
            "question":
                "Choose a project from your resume and explain "
                "one major technical challenge you faced and "
                "how you solved it.",

            "type":
                "Technical Project",

            "difficulty":
                "Hard"
        })

        # Impact question

        questions.append({
            "question":
                "What measurable result, improvement, or impact "
                "did your projects achieve? How would you "
                "demonstrate that impact to a recruiter?",

            "type":
                "Project Impact",

            "difficulty":
                "Medium"
        })

    # -----------------------------------------------------
    # 4. SKILL-BASED QUESTIONS
    # -----------------------------------------------------

    if skills_text:

        normalized_skills = normalize_text(
            skills_text
        )

        if "react" in normalized_skills:

            questions.append({
                "question":
                    "You have React listed on your resume. "
                    "Explain how you have used React in a real "
                    "project and why you chose it.",

                "type":
                    "Technical Skill",

                "difficulty":
                    "Medium"
            })

        elif "python" in normalized_skills:

            questions.append({
                "question":
                    "You have Python listed on your resume. "
                    "Describe a project where you used Python "
                    "and explain why it was suitable for that task.",

                "type":
                    "Technical Skill",

                "difficulty":
                    "Medium"
            })

        elif "java" in normalized_skills:

            questions.append({
                "question":
                    "You have Java listed on your resume. "
                    "Explain how you have used Java in a project "
                    "and which object-oriented concepts you applied.",

                "type":
                    "Technical Skill",

                "difficulty":
                    "Medium"
            })

        else:

            questions.append({
                "question":
                    "Choose one technical skill from your resume "
                    "that you consider your strongest. Explain "
                    "where you used it and how you applied it.",

                "type":
                    "Technical Skill",

                "difficulty":
                    "Medium"
            })

    # -----------------------------------------------------
    # 5. EXPERIENCE QUESTION
    # -----------------------------------------------------

    if experience_text:

        questions.append({
            "question":
                "Walk me through your professional or internship "
                "experience. What were your responsibilities and "
                "what did you learn from the experience?",

            "type":
                "Experience",

            "difficulty":
                "Medium"
        })

    # -----------------------------------------------------
    # 6. TARGET ROLE QUESTION
    # -----------------------------------------------------

    if target_role:

        questions.append({
            "question":
                f"Why do you believe your background and "
                f"technical skills make you a good candidate "
                f"for the {target_role} role?",

            "type":
                "Role Fit",

            "difficulty":
                "Medium"
        })

    # -----------------------------------------------------
    # 7. COMPANY-SPECIFIC QUESTION
    # -----------------------------------------------------

    if target_company:

        questions.append({
            "question":
                f"Why do you want to work at {target_company}, "
                "and how does this role fit into your career goals?",

            "type":
                "Company Fit",

            "difficulty":
                "Medium"
        })

    # -----------------------------------------------------
    # 8. EXPERIENCE LEVEL QUESTION
    # -----------------------------------------------------

    if experience_level == "Fresher":

        questions.append({
            "question":
                "As a fresher, what project or academic experience "
                "best demonstrates that you are ready to contribute "
                "in a professional software development environment?",

            "type":
                "Experience Level",

            "difficulty":
                "Medium"
        })

    elif experience_level == "Intern":

        questions.append({
            "question":
                "How has your internship or practical experience "
                "prepared you for this role?",

            "type":
                "Experience Level",

            "difficulty":
                "Medium"
        })

    elif experience_level == "0-2 Years":

        questions.append({
            "question":
                "Describe a situation where you independently "
                "solved a technical problem in a professional "
                "environment.",

            "type":
                "Experience Level",

            "difficulty":
                "Hard"
        })

    elif experience_level == "2-5 Years":

        questions.append({
            "question":
                "Describe a technically challenging decision "
                "you made in a professional project and explain "
                "the reasoning behind it.",

            "type":
                "Experience Level",

            "difficulty":
                "Hard"
        })

    # -----------------------------------------------------
    # 9. FOLLOW-UP / DEFENSE QUESTION
    # -----------------------------------------------------

    questions.append({
        "question":
            "Looking at your resume, which technical claim or "
            "project would you expect an interviewer to challenge "
            "you on, and how would you defend it?",

        "type":
            "Follow-up",

        "difficulty":
            "Hard"
    })

    # -----------------------------------------------------
    # LIMIT QUESTIONS
    # -----------------------------------------------------

    return questions[:10]