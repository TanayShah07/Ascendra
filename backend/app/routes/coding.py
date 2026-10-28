from fastapi import (
    APIRouter,
    Depends,
    Query,
    HTTPException,
)

from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.database.dependencies import get_database
from app.config.dependencies import get_current_user

from app.models.user import User

from app.services.coding_service import (
    get_companies,
    get_topics,
    get_difficulties,
    get_problems,
    get_problem,
    run_coding_problem,
    submit_coding_problem,
    get_coding_submissions,
)


router = APIRouter(
    prefix="/coding",
    tags=["Coding"]
)


# =========================================================
# REQUEST MODEL
# =========================================================

class CodingExecutionRequest(
    BaseModel
):

    code: str

    language: str = "python"


# =========================================================
# COMPANIES
# =========================================================

@router.get("/companies")
def coding_companies(
    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return {
        "companies":
            get_companies(db)
    }


# =========================================================
# TOPICS
# =========================================================

@router.get("/topics")
def coding_topics(
    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return {
        "topics":
            get_topics(db)
    }


# =========================================================
# DIFFICULTIES
# =========================================================

@router.get("/difficulties")
def coding_difficulties(
    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    return {
        "difficulties":
            get_difficulties(db)
    }


# =========================================================
# PROBLEMS
# =========================================================

@router.get("/problems")
def coding_problems(
    company: str | None = Query(
        default=None
    ),

    topic: str | None = Query(
        default=None
    ),

    difficulty: str | None = Query(
        default=None
    ),

    search: str | None = Query(
        default=None
    ),

    limit: int = Query(
        default=20,
        ge=1,
        le=100
    ),

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    problems = get_problems(
        db=db,
        company=company,
        topic=topic,
        difficulty=difficulty,
        search=search,
        limit=limit,
    )

    return {
        "count": len(problems),
        "problems": problems
    }


# =========================================================
# SINGLE PROBLEM
# =========================================================

@router.get(
    "/problems/{problem_id}"
)
def coding_problem(
    problem_id: int,

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    problem = get_problem(
        db,
        problem_id
    )

    if not problem:

        raise HTTPException(
            status_code=404,
            detail="Coding problem not found."
        )

    return problem


# =========================================================
# RUN
# =========================================================

@router.post(
    "/problems/{problem_id}/run"
)
def run_problem(
    problem_id: int,

    request: CodingExecutionRequest,

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    result = run_coding_problem(
        db=db,

        problem_id=problem_id,

        code=request.code,

        language=request.language,
    )

    if result is None:

        raise HTTPException(
            status_code=404,

            detail=
                "Coding problem not found."
        )

    return result


# =========================================================
# SUBMIT
# =========================================================

@router.post(
    "/problems/{problem_id}/submit"
)
def submit_problem(
    problem_id: int,

    request: CodingExecutionRequest,

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    result = submit_coding_problem(
        db=db,

        user=current_user,

        problem_id=problem_id,

        code=request.code,

        language=request.language,
    )

    if result is None:

        raise HTTPException(
            status_code=404,

            detail=
                "Coding problem not found."
        )

    return result


# =========================================================
# SUBMISSIONS
# =========================================================

@router.get(
    "/problems/{problem_id}/submissions"
)
def coding_submissions(
    problem_id: int,

    db: Session = Depends(
        get_database
    ),

    current_user: User = Depends(
        get_current_user
    ),
):

    problem = get_problem(
        db,
        problem_id
    )

    if not problem:

        raise HTTPException(
            status_code=404,

            detail=
                "Coding problem not found."
        )

    submissions = get_coding_submissions(
        db=db,

        user=current_user,

        problem_id=problem_id
    )

    return {
        "count":
            len(submissions),

        "submissions": [
            {
                "id":
                    submission.id,

                "language":
                    submission.language,

                "status":
                    submission.status,

                "passed_tests":
                    submission.passed_tests,

                "total_tests":
                    submission.total_tests,

                "xp_earned":
                    submission.xp_earned,

                "code":
                    submission.code,

                "submitted_at":
                    submission.submitted_at,
            }

            for submission
            in submissions
        ]
    }