import re

import spacy
from sentence_transformers import SentenceTransformer, util


# =========================================================
# LOAD MODELS ONCE
# =========================================================

try:

    NER_MODEL = spacy.load(
        "en_core_web_sm"
    )

except Exception as error:

    NER_MODEL = None

    print(
        f"Warning: spaCy NER model could not be loaded: {error}"
    )


try:

    SEMANTIC_MODEL = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

except Exception as error:

    SEMANTIC_MODEL = None

    print(
        f"Warning: Sentence Transformer could not be loaded: {error}"
    )


# =========================================================
# RESUME-SPECIFIC ENTITY PATTERNS
# =========================================================

SKILL_TERMS = [

    "python",
    "java",
    "c++",
    "c",
    "javascript",
    "typescript",

    "html",
    "css",
    "react",
    "angular",
    "vue",

    "node.js",
    "express.js",
    "fastapi",

    "sql",
    "postgresql",
    "mysql",
    "mongodb",

    "git",
    "github",

    "docker",
    "kubernetes",

    "aws",
    "azure",
    "gcp",

    "machine learning",
    "deep learning",
    "natural language processing",
    "nlp",

    "computer vision",

    "tensorflow",
    "pytorch",
    "scikit-learn",

    "transformers",
    "generative ai",
    "llm",

    "rest api",
    "restful api",

    "data structures",
    "algorithms",

    "system design",

    "firebase",
    "android",

    "opencv",
    "numpy",
    "pandas",

    "redis",
    "kafka",

    "ci/cd",

    "cryptography",
    "rsa",
    "encryption"
]


ROLE_TERMS = [

    "software engineer",
    "software developer",

    "frontend developer",
    "front-end developer",

    "backend developer",
    "back-end developer",

    "full stack developer",
    "full-stack developer",

    "ai engineer",
    "artificial intelligence engineer",

    "machine learning engineer",

    "data scientist",
    "data analyst",

    "android developer",
    "web developer",

    "devops engineer",

    "cloud engineer",

    "data engineer"
]


DEGREE_TERMS = [

    "b.tech",
    "btech",
    "b.e",
    "be",

    "m.tech",
    "mtech",
    "m.e",
    "me",

    "b.sc",
    "bsc",

    "m.sc",
    "msc",

    "bca",
    "mca",

    "mba",
    "phd",

    "bachelor",
    "master"
]


# =========================================================
# NER ENTITY RULER
# =========================================================

def _add_resume_entity_ruler():

    if NER_MODEL is None:
        return

    # =====================================================
    # REMOVE EXISTING RESUME ENTITY RULERS
    # =====================================================

    pipes_to_remove = []

    for pipe_name in NER_MODEL.pipe_names:

        if "entity_ruler" in pipe_name.lower():

            pipes_to_remove.append(pipe_name)

    for pipe_name in pipes_to_remove:

        NER_MODEL.remove_pipe(pipe_name)

    # =====================================================
    # CREATE RESUME ENTITY RULER
    # =====================================================

    ruler = NER_MODEL.add_pipe(

        "entity_ruler",

        name="resume_entity_ruler",

        after="ner",

        config={
            "overwrite_ents": True,
            "phrase_matcher_attr": "LOWER"
        }

    )

    patterns = []

    # =====================================================
    # SKILLS
    # =====================================================

    for skill in SKILL_TERMS:

        patterns.append({

            "label": "SKILL",

            "pattern": skill

        })

    # =====================================================
    # JOB ROLES
    # =====================================================

    for role in ROLE_TERMS:

        patterns.append({

            "label": "JOB_ROLE",

            "pattern": role

        })

    # =====================================================
    # DEGREES
    # =====================================================

    for degree in DEGREE_TERMS:

        patterns.append({

            "label": "DEGREE",

            "pattern": degree

        })

    # =====================================================
    # ADD PATTERNS
    # =====================================================

    ruler.add_patterns(patterns)

    print(
        "Resume EntityRuler loaded successfully."
    )

    print(
        "NLP PIPELINE:",
        NER_MODEL.pipe_names
    )
_add_resume_entity_ruler()


# =========================================================
# FALSE POSITIVE FILTERING
# =========================================================

INVALID_PERSON_ENTITIES = {

    "cgpa",
    "gpa",
    "q1",
    "q2",
    "q3",
    "q4",
    "qure",
    "ai",
    "ml",
    "nlp"
}


INVALID_ORG_ENTITIES = {

    "core skills",
    "technical skills",
    "programming",
    "social media & marketing",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications"
}


# =========================================================
# NER EXTRACTION
# =========================================================

def extract_resume_entities(
    text: str
) -> dict:

    empty_result = {

        "entities": [],

        "skills": [],

        "roles": [],

        "degrees": [],

        "organizations": [],

        "people": [],

        "dates": []

    }


    if not text or not text.strip():

        return empty_result


    if NER_MODEL is None:

        return empty_result


    doc = NER_MODEL(text)


    entities = []

    skills = []

    roles = []

    degrees = []

    organizations = []

    people = []

    dates = []


    seen_entities = set()


    for entity in doc.ents:

        value = entity.text.strip()

        label = entity.label_


        if not value:

            continue


        normalized = value.lower().strip()


        # ---------------------------------------------
        # Remove obvious false positive PERSON entities
        # ---------------------------------------------

        if (
            label == "PERSON"
            and normalized in INVALID_PERSON_ENTITIES
        ):

            continue


        # ---------------------------------------------
        # Remove obvious false positive ORG entities
        # ---------------------------------------------

        if (
            label == "ORG"
            and normalized in INVALID_ORG_ENTITIES
        ):

            continue


        key = (
            normalized,
            label
        )


        if key in seen_entities:

            continue


        seen_entities.add(key)


        entity_data = {

            "text": value,

            "label": label,

            "start": entity.start_char,

            "end": entity.end_char

        }


        entities.append(
            entity_data
        )


        # ---------------------------------------------
        # Custom entities
        # ---------------------------------------------

        if label == "SKILL":

            skills.append(value)


        elif label == "JOB_ROLE":

            roles.append(value)


        elif label == "DEGREE":

            degrees.append(value)


        elif label == "ORG":

            organizations.append(value)


        elif label == "PERSON":

            people.append(value)


        elif label == "DATE":

            dates.append(value)


    return {

        "entities":
            entities,

        "skills":
            list(dict.fromkeys(skills)),

        "roles":
            list(dict.fromkeys(roles)),

        "degrees":
            list(dict.fromkeys(degrees)),

        "organizations":
            list(dict.fromkeys(organizations)),

        "people":
            list(dict.fromkeys(people)),

        "dates":
            list(dict.fromkeys(dates))

    }


# =========================================================
# TEXT NORMALIZATION
# =========================================================

def normalize_nlp_text(
    text: str
) -> str:

    if not text:

        return ""

    text = text.lower()

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# =========================================================
# SENTENCE EXTRACTION
# =========================================================

def extract_sentences(
    text: str
) -> list[str]:

    if not text or not text.strip():

        return []


    # Prefer spaCy sentence segmentation
    # when the model is available.

    if NER_MODEL is not None:

        doc = NER_MODEL(
            text
        )

        sentences = [

            sentence.text.strip()

            for sentence in doc.sents

            if sentence.text.strip()

        ]

        if sentences:

            return sentences


    # Fallback sentence splitter

    sentences = re.split(
        r"(?<=[.!?])\s+",
        text
    )


    return [

        sentence.strip()

        for sentence in sentences

        if sentence.strip()

    ]


# =========================================================
# SEMANTIC SIMILARITY
# =========================================================

def semantic_similarity(
    text_a: str,
    text_b: str
) -> float:

    if not text_a or not text_b:

        return 0.0


    if not text_a.strip() or not text_b.strip():

        return 0.0


    if SEMANTIC_MODEL is None:

        return 0.0


    embeddings = SEMANTIC_MODEL.encode(

        [
            text_a,
            text_b
        ],

        convert_to_tensor=True

    )


    score = util.cos_sim(

        embeddings[0],

        embeddings[1]

    ).item()


    score = max(
        0.0,
        min(
            1.0,
            score
        )
    )


    return round(
        score * 100,
        2
    )


# =========================================================
# SENTENCE-LEVEL SEMANTIC SKILL MATCHING
# =========================================================

def semantic_skill_matching(
    resume_text: str,
    required_skills: list[str],
    threshold: float = 55.0
) -> dict:

    if not resume_text.strip() or not required_skills:

        return {
            "matched": [],
            "missing": [],
            "scores": {},
            "evidence": {}
        }

    if SEMANTIC_MODEL is None:

        return {
            "matched": [],
            "missing": required_skills,
            "scores": {
                skill: 0
                for skill in required_skills
            },
            "evidence": {}
        }

    # =====================================================
    # SPLIT RESUME INTO SENTENCES / MEANINGFUL LINES
    # =====================================================

    sentences = re.split(
        r"[\n.!?]+",
        resume_text
    )

    sentences = [

        sentence.strip()

        for sentence in sentences

        if len(sentence.strip()) >= 15

    ]

    if not sentences:

        return {
            "matched": [],
            "missing": required_skills,
            "scores": {
                skill: 0
                for skill in required_skills
            },
            "evidence": {}
        }

    # =====================================================
    # ENCODE RESUME SENTENCES ONCE
    # =====================================================

    sentence_embeddings = SEMANTIC_MODEL.encode(

        sentences,

        convert_to_tensor=True

    )

    matched = []
    missing = []

    scores = {}
    evidence = {}

    # =====================================================
    # MATCH EACH REQUIRED SKILL
    # =====================================================

    for skill in required_skills:

        skill_embedding = SEMANTIC_MODEL.encode(

            skill,

            convert_to_tensor=True

        )

        similarity_scores = util.cos_sim(

            skill_embedding,

            sentence_embeddings

        )[0]

        # Find highest score

        best_index = int(
            similarity_scores.argmax().item()
        )

        best_score = float(
            similarity_scores[best_index].item()
        )

        best_score = max(
            0.0,
            min(
                1.0,
                best_score
            )
        )

        percentage = round(
            best_score * 100,
            2
        )

        scores[skill] = percentage

        evidence[skill] = {

            "score": percentage,

            "sentence":
                sentences[best_index]

        }

        # =================================================
        # FINAL SEMANTIC DECISION
        # =================================================

        if percentage >= threshold:

            matched.append(skill)

        else:

            missing.append(skill)

    return {

        "matched":
            matched,

        "missing":
            missing,

        "scores":
            scores,

        "evidence":
            evidence

    }

# =========================================================
# ADVANCED RESUME ANALYSIS
# =========================================================

def analyze_resume_with_nlp(
    text: str,
    required_skills: list[str]
) -> dict:

    entities = extract_resume_entities(
        text
    )


    semantic = semantic_skill_matching(

        text,

        required_skills,

        threshold=35.0

    )


    return {

        "entities":
            entities,

        "semantic_matching":
            semantic

    }