import json
import re

from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from app.models.coding_problem import CodingProblem
from app.models.coding_submission import CodingSubmission
from app.models.user import User

from app.services.profile_service import (
    calculate_placement_readiness
)

from app.services.coding_executor import (
    run_test_cases,
    summarize_results
)

from app.services.coding_registry import (
    get_function_name
)


# =========================================================
# JSON PARSER
# =========================================================

def parse_json(value):

    if value is None:
        return None

    if isinstance(
        value,
        (dict, list)
    ):
        return value

    try:

        return json.loads(
            value
        )

    except Exception:

        return None


# =========================================================
# FUNCTION NAME
# =========================================================

def get_problem_function_name(
    problem,
    language
):

    language = (
        language or "python"
    ).lower().strip()

    # -----------------------------------------------------
    # FIRST: REGISTRY
    # -----------------------------------------------------

    function_name = (
        get_function_name(
            problem.title,
            language
        )
    )

    if function_name:

        return function_name

    # -----------------------------------------------------
    # FALLBACK:
    # DETECT FROM STARTER CODE
    # -----------------------------------------------------

    starter_code = getattr(
        problem,
        "starter_code",
        None
    )

    # -----------------------------------------------------
    # If starter_code is JSON/dict
    # -----------------------------------------------------

    if isinstance(
        starter_code,
        dict
    ):

        starter_code = (
            starter_code.get(language)
            or
            starter_code.get("python")
            or
            starter_code.get("java")
            or
            starter_code.get("cpp")
        )

    if not starter_code:

        return None

    starter_code = str(
        starter_code
    )

    # =====================================================
    # PYTHON
    # =====================================================

    if language == "python":

        match = re.search(
            r"def\s+"
            r"([A-Za-z_][A-Za-z0-9_]*)"
            r"\s*\(",
            starter_code
        )

        if match:

            return match.group(1)

    # =====================================================
    # JAVA
    # =====================================================

    if language == "java":

        match = re.search(
            r"(?:public|private|protected)?\s*"
            r"(?:static\s+)?"
            r"[A-Za-z_<>\[\]]+\s+"
            r"([A-Za-z_][A-Za-z0-9_]*)"
            r"\s*\(",
            starter_code
        )

        if match:

            candidate = (
                match.group(1)
            )

            if candidate not in {
                "main",
                "println",
                "print"
            }:

                return candidate

    # =====================================================
    # C++
    # =====================================================

    if language == "cpp":

        match = re.search(
            r"(?:std::)?"
            r"(?:vector|int|string|bool|long|double|void)"
            r"(?:\s*<[^>]+>)?"
            r"\s+"
            r"([A-Za-z_][A-Za-z0-9_]*)"
            r"\s*\(",
            starter_code
        )

        if match:

            candidate = (
                match.group(1)
            )

            if candidate != "main":

                return candidate

    return None


# =========================================================
# VISIBLE TEST CASES
#
# RUN CODE USES THESE ONLY
# =========================================================

def get_visible_test_cases(
    problem
):

    data = parse_json(
        getattr(
            problem,
            "test_cases",
            None
        )
    )

    # -----------------------------------------------------
    # Structure:
    #
    # {
    #     "visible": [...],
    #     "hidden": [...]
    # }
    # -----------------------------------------------------

    if isinstance(
        data,
        dict
    ):

        visible = data.get(
            "visible",
            []
        )

        if not isinstance(
            visible,
            list
        ):

            return []

        return visible[:2]

    # -----------------------------------------------------
    # Backward compatibility:
    # plain list = first 2 visible cases
    # -----------------------------------------------------

    if isinstance(
        data,
        list
    ):

        return data[:2]

    return []


# =========================================================
# HIDDEN TEST CASES
#
# SUBMIT USES THESE + VISIBLE
# =========================================================

def get_hidden_test_cases(
    problem
):

    # -----------------------------------------------------
    # First check separate hidden_test_cases
    # -----------------------------------------------------

    hidden_data = parse_json(
        getattr(
            problem,
            "hidden_test_cases",
            None
        )
    )

    if isinstance(
        hidden_data,
        dict
    ):

        hidden = hidden_data.get(
            "hidden",
            []
        )

        if isinstance(
            hidden,
            list
        ):

            return hidden

    if isinstance(
        hidden_data,
        list
    ):

        return hidden_data

    # -----------------------------------------------------
    # Otherwise check test_cases.hidden
    # -----------------------------------------------------

    data = parse_json(
        getattr(
            problem,
            "test_cases",
            None
        )
    )

    if isinstance(
        data,
        dict
    ):

        hidden = data.get(
            "hidden",
            []
        )

        if isinstance(
            hidden,
            list
        ):

            return hidden

    return []


# =========================================================
# COMPANIES
# =========================================================

def get_companies(
    db: Session
):

    companies = (

        db.query(
            CodingProblem.company
        )

        .filter(
            CodingProblem.company.isnot(None)
        )

        .distinct()

        .order_by(
            CodingProblem.company
        )

        .all()
    )

    return [

        company[0]

        for company in companies

    ]


# =========================================================
# TOPICS
# =========================================================

def get_topics(
    db: Session
):

    topics = (

        db.query(
            CodingProblem.topic
        )

        .distinct()

        .order_by(
            CodingProblem.topic
        )

        .all()
    )

    return [

        topic[0]

        for topic in topics

    ]


# =========================================================
# DIFFICULTIES
# =========================================================

def get_difficulties(
    db: Session
):

    difficulties = (

        db.query(
            CodingProblem.difficulty
        )

        .distinct()

        .order_by(
            CodingProblem.difficulty
        )

        .all()
    )

    return [

        difficulty[0]

        for difficulty in difficulties

    ]


# =========================================================
# GET CODING PROBLEMS
# =========================================================

def get_problems(
    db: Session,
    company: str | None = None,
    topic: str | None = None,
    difficulty: str | None = None,
    search: str | None = None,
    limit: int = 20,
):

    # -----------------------------------------------------
    # SAFE LIMIT
    # -----------------------------------------------------

    limit = max(
        1,
        min(
            limit,
            100
        )
    )

    query = (

        db.query(
            CodingProblem
        )

        .filter(
            CodingProblem.is_active == True
        )
    )

    # =====================================================
    # COMPANY
    # =====================================================

    if (
        company
        and
        company != "All Companies"
    ):

        query = query.filter(
            CodingProblem.company == company
        )

    # =====================================================
    # TOPIC
    # =====================================================

    if (
        topic
        and
        topic != "All Topics"
    ):

        query = query.filter(
            CodingProblem.topic == topic
        )

    # =====================================================
    # DIFFICULTY
    # =====================================================

    if (
        difficulty
        and
        difficulty != "All Difficulty"
    ):

        query = query.filter(
            CodingProblem.difficulty == difficulty
        )

    # =====================================================
    # SEARCH
    # =====================================================

    if search:

        search_pattern = (
            f"%{search.strip()}%"
        )

        query = query.filter(

            CodingProblem.title.ilike(
                search_pattern
            )

        )

    return (

        query

        .order_by(
            func.random()
        )

        .limit(
            limit
        )

        .all()
    )


# =========================================================
# GET SINGLE PROBLEM
# =========================================================

def get_problem(
    db: Session,
    problem_id: int
):

    return (

        db.query(
            CodingProblem
        )

        .filter(

            CodingProblem.id == problem_id,

            CodingProblem.is_active == True

        )

        .first()
    )


# =========================================================
# RUN CODE
#
# IMPORTANT:
# ONLY VISIBLE TEST CASES
# =========================================================

def run_coding_problem(
    db: Session,
    problem_id: int,
    code: str,
    language: str,
):

    # =====================================================
    # GET PROBLEM
    # =====================================================

    problem = get_problem(
        db,
        problem_id
    )

    if not problem:

        return None

    # =====================================================
    # EMPTY CODE
    # =====================================================

    if (
        not code
        or
        not code.strip()
    ):

        return {

            "success": False,

            "status":
                "Empty Code",

            "message":
                "Please write some code before running.",

            "passed_tests": 0,

            "total_tests": 0,

            "results": []
        }

    # =====================================================
    # NORMALIZE LANGUAGE
    # =====================================================

    language = (
        language or "python"
    ).lower().strip()

    # =====================================================
    # FUNCTION NAME
    # =====================================================

    function_name = (
        get_problem_function_name(
            problem,
            language
        )
    )

    if not function_name:

        return {

            "success": False,

            "status":
                "Unsupported Problem",

            "message":
                "Unable to determine the solution "
                "function for this problem and language.",

            "passed_tests": 0,

            "total_tests": 0,

            "results": []
        }

    # =====================================================
    # GET VISIBLE TESTS
    # =====================================================

    visible_tests = (
        get_visible_test_cases(
            problem
        )
    )

    if not visible_tests:

        return {

            "success": False,

            "status":
                "No Test Cases",

            "message":
                "No visible test cases are available.",

            "passed_tests": 0,

            "total_tests": 0,

            "results": []
        }

    # =====================================================
    # EXECUTE VISIBLE TESTS
    # =====================================================

    results = run_test_cases(

        code=code,

        language=language,

        function_name=function_name,

        test_cases=visible_tests,

        problem_name=problem.title,

        timeout=(
            problem.time_limit
            or
            5
        )
    )

    # =====================================================
    # SUMMARY
    # =====================================================

    summary = summarize_results(
        results
    )

    return {

        "success":
            summary["passed"],

        "status":
            summary["status"],

        "passed_tests":
            summary["passed_count"],

        "total_tests":
            len(
                visible_tests
            ),

        "results":
            summary["results"]
    }


# =========================================================
# SUBMIT CODE
#
# IMPORTANT:
# VISIBLE + HIDDEN TEST CASES
# =========================================================

def submit_coding_problem(
    db: Session,
    user: User,
    problem_id: int,
    code: str,
    language: str,
):

    # =====================================================
    # GET PROBLEM
    # =====================================================

    problem = get_problem(
        db,
        problem_id
    )

    if not problem:

        return None

    # =====================================================
    # EMPTY CODE
    # =====================================================

    if (
        not code
        or
        not code.strip()
    ):

        return {

            "success": False,

            "status":
                "Empty Code",

            "message":
                "Please write some code before submitting.",

            "passed_tests": 0,

            "total_tests": 0,

            "xp_earned": 0,

            "results": []
        }

    # =====================================================
    # NORMALIZE LANGUAGE
    # =====================================================

    language = (
        language or "python"
    ).lower().strip()

    # =====================================================
    # GET FUNCTION NAME
    # =====================================================

    function_name = (
        get_problem_function_name(
            problem,
            language
        )
    )

    if not function_name:

        return {

            "success": False,

            "status":
                "Unsupported Problem",

            "message":
                "Unable to determine the solution "
                "function for this problem and language.",

            "passed_tests": 0,

            "total_tests": 0,

            "xp_earned": 0,

            "results": []
        }

    # =====================================================
    # GET VISIBLE TESTS
    # =====================================================

    visible_tests = (
        get_visible_test_cases(
            problem
        )
    )

    # =====================================================
    # GET HIDDEN TESTS
    # =====================================================

    hidden_tests = (
        get_hidden_test_cases(
            problem
        )
    )

    # =====================================================
    # COMBINE
    #
    # Example:
    #
    # visible = 2
    # hidden  = 2
    #
    # total = 4
    # =====================================================

    all_tests = (

        visible_tests

        +

        hidden_tests

    )

    if not all_tests:

        return {

            "success": False,

            "status":
                "No Test Cases",

            "message":
                "No test cases are available.",

            "passed_tests": 0,

            "total_tests": 0,

            "xp_earned": 0,

            "results": []
        }

    # =====================================================
    # EXECUTE ALL TEST CASES
    # =====================================================

    results = run_test_cases(

        code=code,

        language=language,

        function_name=function_name,

        test_cases=all_tests,

        problem_name=problem.title,

        timeout=(
            problem.time_limit
            or
            5
        )
    )

    # =====================================================
    # SUMMARY
    # =====================================================

    summary = summarize_results(
        results
    )

    passed_tests = (
        summary["passed_count"]
    )

    total_tests = len(
        all_tests
    )

    # =====================================================
    # FAILED SUBMISSION
    #
    # IMPORTANT:
    #
    # NO XP
    # NO SOLVED COUNT
    # NO READINESS UPDATE
    #
    # AND:
    #
    # DO NOT SAVE FAILED CODE
    # TO SUCCESSFUL SUBMISSIONS
    # =====================================================

    if not summary["passed"]:

        # -------------------------------------------------
        # Only return visible test details.
        #
        # Hidden tests must remain hidden.
        # -------------------------------------------------

        visible_result_count = min(

            len(
                visible_tests
            ),

            len(
                summary["results"]
            )

        )

        visible_results = (

            summary["results"]

            [
                :visible_result_count
            ]

        )

        return {

            "success":
                False,

            "status":
                summary["status"],

            "passed_tests":
                passed_tests,

            "total_tests":
                total_tests,

            "xp_earned":
                0,

            "results":
                visible_results,

            "message":
                "Submission failed. "
                "Not all test cases passed."
        }

    # =====================================================
    # ALL TESTS PASSED
    #
    # ONLY NOW:
    #
    # XP
    # SOLVED COUNT
    # LEVEL
    # READINESS
    # SUBMISSION RECORD
    # =====================================================

    xp_earned = (
        problem.xp
        or
        25
    )

    # =====================================================
    # XP
    # =====================================================

    user.xp = (

        user.xp or 0

    ) + xp_earned

    # =====================================================
    # CODING SOLVED
    # =====================================================

    user.coding_problems_solved = (

        user.coding_problems_solved
        or
        0

    ) + 1

    # =====================================================
    # DIFFICULTY PROGRESS
    # =====================================================

    if problem.difficulty == "Easy":

        user.easy_solved = (

            user.easy_solved
            or
            0

        ) + 1

    elif problem.difficulty == "Medium":

        user.medium_solved = (

            user.medium_solved
            or
            0

        ) + 1

    elif problem.difficulty == "Hard":

        user.hard_solved = (

            user.hard_solved
            or
            0

        ) + 1

    # =====================================================
    # LEVEL
    # =====================================================

    user.level = (

        user.xp // 100

    ) + 1

    # =====================================================
    # PLACEMENT READINESS
    # =====================================================

    user.placement_readiness = (

        calculate_placement_readiness(
            user
        )

    )

    # =====================================================
    # SAVE ACCEPTED SUBMISSION
    # =====================================================

    submission = CodingSubmission(

        user_id=user.id,

        problem_id=problem.id,

        language=language,

        code=code,

        status="Accepted",

        passed_tests=total_tests,

        total_tests=total_tests,

        xp_earned=xp_earned

    )

    db.add(
        submission
    )

    # =====================================================
    # COMMIT EVERYTHING
    # =====================================================

    db.commit()

    db.refresh(
        user
    )

    db.refresh(
        submission
    )

    # =====================================================
    # RETURN SUCCESS
    # =====================================================

    return {

        "success":
            True,

        "status":
            "Accepted",

        "passed_tests":
            total_tests,

        "total_tests":
            total_tests,

        "xp_earned":
            xp_earned,

        "current_xp":
            user.xp,

        "level":
            user.level,

        "coding_problems_solved":
            user.coding_problems_solved,

        "easy_solved":
            user.easy_solved,

        "medium_solved":
            user.medium_solved,

        "hard_solved":
            user.hard_solved,

        "placement_readiness":
            user.placement_readiness,

        "message":
            "All test cases passed!"

    }


# =========================================================
# GET SUBMISSIONS
#
# ONLY ACCEPTED SUBMISSIONS ARE SAVED
# =========================================================

def get_coding_submissions(
    db: Session,
    user: User,
    problem_id: int
):

    return (

        db.query(
            CodingSubmission
        )

        .filter(

            CodingSubmission.user_id
            ==
            user.id,

            CodingSubmission.problem_id
            ==
            problem_id,

            CodingSubmission.status
            ==
            "Accepted"

        )

        .order_by(

            CodingSubmission.id.desc()

        )

        .all()
    )