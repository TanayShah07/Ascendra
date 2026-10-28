from fastapi import (
    APIRouter,
    Depends,
    Query,
)

from sqlalchemy.orm import Session

from app.database.dependencies import (
    get_database
)

from app.config.dependencies import (
    get_current_user
)

from app.models.user import User

from app.services.aptitude_service import (
    get_companies,
    get_categories,
    get_questions,
    get_question_counts,
)

from app.schemas.aptitude import (
    AptitudeQuestionResponse
)


router = APIRouter(
    prefix="/aptitude",
    tags=["Aptitude"]
)


# =========================================================
# COMPANIES
# =========================================================

@router.get("/companies")
def aptitude_companies(
    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return {
        "companies": get_companies(db)
    }


# =========================================================
# CATEGORIES
# =========================================================

@router.get("/categories")
def aptitude_categories(
    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return {
        "categories": get_categories(db)
    }


# =========================================================
# QUESTION COUNTS
# =========================================================

@router.get("/counts")
def aptitude_question_counts(
    company: str | None = Query(
        default=None
    ),

    category: str | None = Query(
        default=None
    ),

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return get_question_counts(
        db=db,
        company=company,
        category=category,
    )


# =========================================================
# QUESTIONS
# =========================================================

@router.get(
    "/questions",
    response_model=list[
        AptitudeQuestionResponse
    ]
)
def aptitude_questions(

    company: str | None = Query(
        default=None
    ),

    category: str | None = Query(
        default=None
    ),

    difficulty: str | None = Query(
        default=None
    ),

    limit: int = Query(
        default=10,
        ge=1,
        le=50
    ),

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    questions = get_questions(

        db=db,

        company=company,

        category=category,

        difficulty=difficulty,

        limit=limit,
    )

    return questions