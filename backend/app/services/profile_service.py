from sqlalchemy.orm import Session

from app.models.user import User


# =========================================================
# CALCULATE READINESS BREAKDOWN
# =========================================================

def calculate_readiness_breakdown(user: User):

    # -----------------------------------------------------
    # 1. PROFILE COMPLETION — 15 POINTS
    # -----------------------------------------------------

    profile_fields = [
        user.full_name,
        user.college,
        user.branch,
        user.graduation_year,
        user.bio,
    ]

    completed_profile = sum(
        1
        for field in profile_fields
        if field
    )

    profile_score = round(
        (completed_profile / len(profile_fields)) * 15
    )


    # -----------------------------------------------------
    # 2. PROFESSIONAL PROFILES — 10 POINTS
    # -----------------------------------------------------

    social_fields = [
        user.linkedin,
        user.github,
        user.portfolio,
        user.leetcode,
    ]

    completed_social = sum(
        1
        for field in social_fields
        if field
    )

    social_score = round(
        (completed_social / len(social_fields)) * 10
    )


    # -----------------------------------------------------
    # 3. PLACEMENT GOALS — 10 POINTS
    # -----------------------------------------------------

    goal_fields = [
        user.dream_company,
        user.target_role,
        user.preferred_domain,
    ]

    completed_goals = sum(
        1
        for field in goal_fields
        if field
    )

    goal_score = round(
        (completed_goals / len(goal_fields)) * 10
    )


    # -----------------------------------------------------
    # 4. RESUME — 20 POINTS
    # -----------------------------------------------------

    resume_score = round(
        min(
            (user.resume_score or 0) / 100 * 20,
            20
        )
    )


    # -----------------------------------------------------
    # 5. CODING — 20 POINTS
    # -----------------------------------------------------

    coding_solved = (
        user.coding_problems_solved or 0
    )

    coding_score = round(
        min(
            coding_solved / 100 * 20,
            20
        )
    )


    # -----------------------------------------------------
    # 6. INTERVIEW — 10 POINTS
    # -----------------------------------------------------

    interview_count = (
        user.interview_completed or 0
    )

    interview_score = round(
        min(
            interview_count / 5 * 10,
            10
        )
    )


    # -----------------------------------------------------
    # 7. GROUP DISCUSSION — 5 POINTS
    # -----------------------------------------------------

    gd_count = (
        user.gd_completed or 0
    )

    gd_score = round(
        min(
            gd_count / 5 * 5,
            5
        )
    )


    # -----------------------------------------------------
    # 8. ROADMAP — 10 POINTS
    # -----------------------------------------------------

    roadmap_score = (
        10
        if user.roadmap_generated
        else 0
    )


    # -----------------------------------------------------
    # RETURN BREAKDOWN
    # -----------------------------------------------------

    return {

        "profile": {
            "score": profile_score,
            "max": 15
        },

        "professional": {
            "score": social_score,
            "max": 10
        },

        "placement_goals": {
            "score": goal_score,
            "max": 10
        },

        "resume": {
            "score": resume_score,
            "max": 20
        },

        "coding": {
            "score": coding_score,
            "max": 20
        },

        "interview": {
            "score": interview_score,
            "max": 10
        },

        "group_discussion": {
            "score": gd_score,
            "max": 5
        },

        "roadmap": {
            "score": roadmap_score,
            "max": 10
        }

    }


# =========================================================
# CALCULATE TOTAL PLACEMENT READINESS
# =========================================================

def calculate_placement_readiness(user: User):

    breakdown = calculate_readiness_breakdown(
        user
    )

    total_score = sum(
        category["score"]
        for category in breakdown.values()
    )

    return min(
        total_score,
        100
    )


# =========================================================
# GET PROFILE
# =========================================================

def get_profile(
    db,
    user_id
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return None

    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,

        "college": user.college,
        "branch": user.branch,
        "graduation_year": user.graduation_year,

        "profile_photo": user.profile_photo,
        "role": user.role,

        # Professional Profiles
        "linkedin": user.linkedin,
        "github": user.github,
        "portfolio": user.portfolio,
        "leetcode": user.leetcode,

        # Placement
        "dream_company": user.dream_company,
        "target_role": user.target_role,
        "preferred_domain": user.preferred_domain,

        # Bio
        "bio": user.bio,

        # Readiness / Gamification
        "placement_readiness": user.placement_readiness,
        "xp": user.xp,
        "level": user.level,
        "streak": user.streak,
        "last_streak_at": user.last_streak_at,

        # Resume
        "resume_url": user.resume_url,
        "resume_score": user.resume_score,
        "ats_score": user.ats_score,

        # Coding
        "coding_problems_solved": user.coding_problems_solved,
        "easy_solved": user.easy_solved,
        "medium_solved": user.medium_solved,
        "hard_solved": user.hard_solved,

        # Interview / GD
        "interview_completed": user.interview_completed,
        "gd_completed": user.gd_completed,

        # Roadmap
        "roadmap_generated": user.roadmap_generated,

        "created_at": user.created_at
    }


# =========================================================
# UPDATE PROFILE
# =========================================================

def update_profile(
    db: Session,
    user: User,
    data
):

    user.full_name = data.full_name

    user.college = data.college

    user.branch = data.branch

    user.graduation_year = data.graduation_year

    user.bio = data.bio


    # Recalculate readiness immediately
    user.placement_readiness = (
        calculate_placement_readiness(user)
    )


    db.commit()

    db.refresh(user)


    return user


# =========================================================
# UPDATE SOCIAL LINKS
# =========================================================

def update_social_links(
    db: Session,
    user: User,
    data
):

    user.linkedin = data.linkedin

    user.github = data.github

    user.portfolio = data.portfolio

    user.leetcode = data.leetcode


    # Recalculate readiness immediately
    user.placement_readiness = (
        calculate_placement_readiness(user)
    )


    db.commit()

    db.refresh(user)


    return user


# =========================================================
# UPDATE PLACEMENT GOALS
# =========================================================

def update_placement_goals(
    db: Session,
    user: User,
    data
):

    user.dream_company = (
        data.dream_company
    )

    user.target_role = (
        data.target_role
    )

    user.preferred_domain = (
        data.preferred_domain
    )


    # Recalculate readiness immediately
    user.placement_readiness = (
        calculate_placement_readiness(user)
    )


    db.commit()

    db.refresh(user)


    return user

def calculate_placement_readiness(user: User):

    breakdown = calculate_readiness_breakdown(user)

    total = sum(
        item["score"]
        for item in breakdown.values()
    )

    return min(total, 100)