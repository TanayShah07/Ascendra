from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from app.models.aptitude_question import AptitudeQuestion
from app.models.user import User

from app.services.profile_service import (
    calculate_placement_readiness
)


# =========================================================
# GET COMPANIES
# =========================================================

def get_companies(db: Session):

    companies = (
        db.query(
            AptitudeQuestion.company
        )
        .filter(
            AptitudeQuestion.company.isnot(None)
        )
        .distinct()
        .order_by(
            AptitudeQuestion.company
        )
        .all()
    )

    return [
        company[0]
        for company in companies
    ]


# =========================================================
# GET CATEGORIES
# =========================================================

def get_categories(db: Session):

    categories = (
        db.query(
            AptitudeQuestion.category
        )
        .distinct()
        .order_by(
            AptitudeQuestion.category
        )
        .all()
    )

    return [
        category[0]
        for category in categories
    ]


# =========================================================
# CALCULATE DIFFICULTY DISTRIBUTION
# =========================================================

def calculate_distribution(
    limit: int
):

    """
    Creates an approximately equal
    Easy / Medium / Hard distribution.

    Examples:

    10 -> 4 Easy, 3 Medium, 3 Hard
    15 -> 5 Easy, 5 Medium, 5 Hard
    20 -> 7 Easy, 7 Medium, 6 Hard
    """

    if limit <= 0:

        return {
            "Easy": 0,
            "Medium": 0,
            "Hard": 0
        }


    base = limit // 3

    remainder = limit % 3


    distribution = {

        "Easy": base,

        "Medium": base,

        "Hard": base

    }


    # Distribute remaining questions
    order = [
        "Easy",
        "Medium",
        "Hard"
    ]


    for index in range(remainder):

        distribution[
            order[index]
        ] += 1


    return distribution


# =========================================================
# BUILD BASE QUESTION QUERY
# =========================================================

def build_question_query(
    db: Session,
    company: str | None = None,
    category: str | None = None,
):

    query = db.query(
        AptitudeQuestion
    )


    # -----------------------------------------------------
    # GENERAL
    # -----------------------------------------------------

    if company is None:

        query = query.filter(
            AptitudeQuestion.company.is_(None)
        )


    # -----------------------------------------------------
    # COMPANY SPECIFIC
    # -----------------------------------------------------

    else:

        query = query.filter(
            AptitudeQuestion.company
            == company
        )


    # -----------------------------------------------------
    # CATEGORY
    # -----------------------------------------------------

    if category:

        query = query.filter(
            AptitudeQuestion.category
            == category
        )


    return query


# =========================================================
# GET QUESTIONS
# =========================================================

def get_questions(
    db: Session,
    company: str | None = None,
    category: str | None = None,
    difficulty: str | None = None,
    limit: int = 10,
):

    # -----------------------------------------------------
    # SAFETY
    # -----------------------------------------------------

    if limit < 1:

        return []


    if limit > 50:

        limit = 50


    # =====================================================
    # EXPLICIT DIFFICULTY
    # =====================================================

    if difficulty:

        query = build_question_query(

            db=db,

            company=company,

            category=category

        )


        query = query.filter(

            AptitudeQuestion.difficulty
            == difficulty

        )


        return (

            query

            .order_by(
                func.random()
            )

            .limit(limit)

            .all()

        )


    # =====================================================
    # BALANCED MODE
    # =====================================================

    distribution = (
        calculate_distribution(
            limit
        )
    )


    selected_questions = []


    # -----------------------------------------------------
    # GET QUESTIONS FROM EACH DIFFICULTY
    # -----------------------------------------------------

    for level, count in distribution.items():

        if count <= 0:

            continue


        query = build_question_query(

            db=db,

            company=company,

            category=category

        )


        query = query.filter(

            AptitudeQuestion.difficulty
            == level

        )


        questions = (

            query

            .order_by(
                func.random()
            )

            .limit(count)

            .all()

        )


        selected_questions.extend(
            questions
        )


    # =====================================================
    # FALLBACK
    # =====================================================

    # If a company/category doesn't have enough
    # questions at a particular difficulty,
    # fill the remaining slots from any available
    # questions.

    if len(selected_questions) < limit:

        selected_ids = {

            question.id

            for question
            in selected_questions

        }


        fallback_query = (
            build_question_query(

                db=db,

                company=company,

                category=category

            )
        )


        if selected_ids:

            fallback_query = (
                fallback_query.filter(

                    ~AptitudeQuestion.id.in_(
                        selected_ids
                    )

                )
            )


        remaining = (
            limit
            - len(selected_questions)
        )


        fallback_questions = (

            fallback_query

            .order_by(
                func.random()
            )

            .limit(remaining)

            .all()

        )


        selected_questions.extend(
            fallback_questions
        )


    # =====================================================
    # FINAL SHUFFLE
    # =====================================================

    import random

    random.shuffle(
        selected_questions
    )


    return selected_questions


# =========================================================
# GET QUESTION COUNTS
# =========================================================

def get_question_counts(
    db: Session,
    company: str | None = None,
    category: str | None = None,
):

    query = build_question_query(

        db=db,

        company=company,

        category=category

    )


    result = {}


    for level in [
        "Easy",
        "Medium",
        "Hard"
    ]:

        count = (

            query

            .filter(

                AptitudeQuestion.difficulty
                == level

            )

            .count()

        )


        result[level] = count


    result["total"] = sum(
        result.values()
    )


    return result


# =========================================================
# SUBMIT APTITUDE TEST
# =========================================================

def submit_aptitude_test(
    db: Session,
    user: User,
    answers,
):

    # =====================================================
    # GET QUESTION IDS
    # =====================================================

    question_ids = [

        answer.question_id

        for answer in answers

    ]


    # =====================================================
    # NO ANSWERS
    # =====================================================

    if not question_ids:

        return {

            "total_questions": 0,

            "attempted": 0,

            "correct": 0,

            "incorrect": 0,

            "unanswered": 0,

            "score": 0,

            "total_marks": 0,

            "percentage": 0,

            "xp_earned": 0,

            "current_xp":
                user.xp or 0,

            "level":
                user.level or 1,

            "results": []

        }


    # =====================================================
    # GET QUESTIONS
    # =====================================================

    questions = (

        db.query(
            AptitudeQuestion
        )

        .filter(

            AptitudeQuestion.id.in_(
                question_ids
            )

        )

        .all()

    )


    question_map = {

        question.id: question

        for question in questions

    }


    # =====================================================
    # COUNTERS
    # =====================================================

    total_questions = len(
        answers
    )

    attempted = 0

    correct = 0

    incorrect = 0

    unanswered = 0

    score = 0

    total_marks = 0

    results = []


    # =====================================================
    # CHECK ANSWERS
    # =====================================================

    for submitted in answers:

        question = question_map.get(
            submitted.question_id
        )


        # -------------------------------------------------
        # INVALID QUESTION
        # -------------------------------------------------

        if not question:

            continue


        marks = (
            question.marks or 0
        )


        total_marks += marks


        selected_answer = (
            submitted.answer
        )


        # -------------------------------------------------
        # NORMALIZE
        # -------------------------------------------------

        if selected_answer:

            selected_answer = (

                selected_answer

                .strip()

                .upper()

            )


        # =================================================
        # UNANSWERED
        # =================================================

        if not selected_answer:

            unanswered += 1


            results.append({

                "question_id":
                    question.id,

                "selected_answer":
                    None,

                "correct_answer":
                    question.correct_answer,

                "is_correct":
                    False,

                "marks_obtained":
                    0,

                "explanation":
                    question.explanation

            })


            continue


        attempted += 1


        # =================================================
        # CORRECT
        # =================================================

        if (

            selected_answer

            == question.correct_answer
            .strip()
            .upper()

        ):

            correct += 1

            score += marks


            results.append({

                "question_id":
                    question.id,

                "selected_answer":
                    selected_answer,

                "correct_answer":
                    question.correct_answer,

                "is_correct":
                    True,

                "marks_obtained":
                    marks,

                "explanation":
                    question.explanation

            })


        # =================================================
        # INCORRECT
        # =================================================

        else:

            incorrect += 1


            results.append({

                "question_id":
                    question.id,

                "selected_answer":
                    selected_answer,

                "correct_answer":
                    question.correct_answer,

                "is_correct":
                    False,

                "marks_obtained":
                    0,

                "explanation":
                    question.explanation

            })


    # =====================================================
    # PERCENTAGE
    # =====================================================

    percentage = 0


    if total_marks > 0:

        percentage = round(

            (
                score
                / total_marks
            )

            * 100,

            2

        )


    # =====================================================
    # XP
    # =====================================================

    # 10 XP for completing a test
    # + 5 XP per correct answer

    xp_earned = (

        10

        + (
            correct * 5
        )

    )


    user.xp = (

        user.xp or 0

    ) + xp_earned


    # =====================================================
    # LEVEL
    # =====================================================

    user.level = (

        user.xp // 100

    ) + 1


    # =====================================================
    # READINESS
    # =====================================================

    user.placement_readiness = (

        calculate_placement_readiness(

            user

        )

    )


    # =====================================================
    # SAVE
    # =====================================================

    db.commit()

    db.refresh(user)


    # =====================================================
    # RETURN
    # =====================================================

    return {

        "total_questions":
            total_questions,

        "attempted":
            attempted,

        "correct":
            correct,

        "incorrect":
            incorrect,

        "unanswered":
            unanswered,

        "score":
            score,

        "total_marks":
            total_marks,

        "percentage":
            percentage,

        "xp_earned":
            xp_earned,

        "current_xp":
            user.xp,

        "level":
            user.level,

        "results":
            results

    }