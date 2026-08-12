import re

from app.database.session import SessionLocal
from app.models.aptitude_question import AptitudeQuestion


# =========================================================
# PATTERNS
# =========================================================

ANSWER_MARKERS = [
    "Answer -",
    "Answer –",
    "Answer:",
    "Answer - ",
    "ANSWER -",
    "ANSWER:",
]

EXPLANATION_MARKERS = [
    "Explanation:",
    "Explanation -",
    "EXPLANATION:",
]

SOURCE_ANSWER_PATTERN = re.compile(
    r"^\s*Source answer:\s*Option\s*([A-E])\.?\s*$",
    re.IGNORECASE
)


# =========================================================
# CLEAN EXPLANATION
# =========================================================

def clean_explanation(explanation):

    if not explanation:
        return explanation

    text = explanation.strip()

    # -----------------------------------------------------
    # CASE 1:
    # "Source answer: Option C."
    # -----------------------------------------------------

    match = SOURCE_ANSWER_PATTERN.match(text)

    if match:

        answer = match.group(1).upper()

        return (
            f"The correct answer is "
            f"option {answer}."
        )

    # -----------------------------------------------------
    # REMOVE DATASET HEADERS
    # -----------------------------------------------------

    headers = [
        "IBM Number Series Questions and Answers with Explanation",
        "Accenture Aptitude Questions and Answers with Explanation",
        "Accenture Logical Reasoning Questions and Answers with Explanation",
        "Genpact Aptitude Questions and Answers with Explanation",
        "Genpact Logical Reasoning Questions and Answers with Explanation",
        "TCS Aptitude Questions and Answers with Explanation",
    ]

    for header in headers:

        index = text.lower().find(
            header.lower()
        )

        if index != -1:

            text = text[:index].strip()

    # -----------------------------------------------------
    # REMOVE "ANSWER" + NEXT CONTENT
    # -----------------------------------------------------

    for marker in ANSWER_MARKERS:

        index = text.find(marker)

        if index > 0:

            # Keep explanation before answer marker
            text = text[:index].strip()

    # -----------------------------------------------------
    # REMOVE NEXT QUESTION NUMBER
    #
    # Example:
    #
    # "... explanation"
    # "14. In a class..."
    #
    # -----------------------------------------------------

    match = re.search(
        r"\s+\d{1,3}\.\s+[A-Z][A-Za-z]",
        text
    )

    if match:

        text = text[:match.start()].strip()

    return text


# =========================================================
# CLEAN OPTIONS
# =========================================================

def clean_option(option):

    if not option:
        return option

    text = option.strip()

    # -----------------------------------------------------
    # Remove everything after Answer marker
    # -----------------------------------------------------

    for marker in ANSWER_MARKERS:

        index = text.find(marker)

        if index > 0:

            text = text[:index].strip()

    # -----------------------------------------------------
    # Remove everything after Explanation
    # -----------------------------------------------------

    for marker in EXPLANATION_MARKERS:

        index = text.find(marker)

        if index > 0:

            text = text[:index].strip()

    # -----------------------------------------------------
    # Remove accidental next option
    #
    # Example:
    # "4592 Answer – A..."
    # -----------------------------------------------------

    return text


# =========================================================
# CLEAN QUESTIONS
# =========================================================

def clean_question(question):

    if not question:
        return question

    text = question.strip()

    # Don't aggressively modify questions.
    # Many valid questions contain words such as
    # "correct answer".

    return text


# =========================================================
# MAIN CLEANER
# =========================================================

def clean_aptitude():

    db = SessionLocal()

    try:

        questions = (
            db.query(AptitudeQuestion)
            .order_by(
                AptitudeQuestion.id
            )
            .all()
        )

        changed = 0

        for question in questions:

            original_question = (
                question.question
            )

            original_a = (
                question.option_a
            )

            original_b = (
                question.option_b
            )

            original_c = (
                question.option_c
            )

            original_d = (
                question.option_d
            )

            original_explanation = (
                question.explanation
            )

            # -------------------------------------------------
            # CLEAN
            # -------------------------------------------------

            question.question = clean_question(
                question.question
            )

            question.option_a = clean_option(
                question.option_a
            )

            question.option_b = clean_option(
                question.option_b
            )

            question.option_c = clean_option(
                question.option_c
            )

            question.option_d = clean_option(
                question.option_d
            )

            question.explanation = clean_explanation(
                question.explanation
            )

            # -------------------------------------------------
            # CHECK WHETHER CHANGED
            # -------------------------------------------------

            if (
                question.question
                != original_question
                or question.option_a
                != original_a
                or question.option_b
                != original_b
                or question.option_c
                != original_c
                or question.option_d
                != original_d
                or question.explanation
                != original_explanation
            ):

                changed += 1

                print(
                    f"Cleaned question ID "
                    f"{question.id}"
                )

        # -----------------------------------------------------
        # SAVE
        # -----------------------------------------------------

        db.commit()

        print()
        print("=" * 60)
        print("APTITUDE CLEANUP COMPLETE")
        print("=" * 60)
        print(
            f"Total questions: {len(questions)}"
        )
        print(
            f"Questions modified: {changed}"
        )
        print("=" * 60)

    except Exception:

        db.rollback()

        raise

    finally:

        db.close()


if __name__ == "__main__":

    clean_aptitude()