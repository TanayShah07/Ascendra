from app.database.session import SessionLocal
from app.models.aptitude_question import AptitudeQuestion


SUSPICIOUS_PATTERNS = [
    "answer:",
    "answer -",
    "explanation:",
    "explanation -",
    "correct answer",
]


def is_suspicious(text):
    if not text:
        return False

    lower = text.lower()

    return any(
        pattern in lower
        for pattern in SUSPICIOUS_PATTERNS
    )


def check_questions():

    db = SessionLocal()

    try:

        questions = (
            db.query(AptitudeQuestion)
            .order_by(AptitudeQuestion.id)
            .all()
        )

        suspicious = []

        for question in questions:

            fields = {
                "question": question.question,
                "option_a": question.option_a,
                "option_b": question.option_b,
                "option_c": question.option_c,
                "option_d": question.option_d,
                "explanation": question.explanation,
            }

            bad_fields = []

            for field, value in fields.items():

                if is_suspicious(value):
                    bad_fields.append(field)

            if bad_fields:

                suspicious.append(
                    (
                        question,
                        bad_fields
                    )
                )

        print()
        print("=" * 70)
        print("APTITUDE DATASET CHECK")
        print("=" * 70)

        print(
            f"Total questions: {len(questions)}"
        )

        print(
            f"Suspicious questions: {len(suspicious)}"
        )

        print("=" * 70)

        for question, bad_fields in suspicious:

            print()
            print(f"ID: {question.id}")
            print(
                f"Bad fields: {', '.join(bad_fields)}"
            )
            print(
                f"Question: {question.question[:300]}"
            )

            for field in bad_fields:

                value = getattr(
                    question,
                    field
                )

                print(
                    f"{field}: {value[:500]}"
                )

            print("-" * 70)

    finally:

        db.close()


if __name__ == "__main__":
    check_questions()