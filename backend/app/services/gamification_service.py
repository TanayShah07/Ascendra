from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.user import User


# =========================================================
# XP REWARDS
# =========================================================

XP_REWARDS = {

    "login": 10,

    "resume_analysis": 50,

    "roadmap_generation": 40,

    "coding_problem": 20,

    "interview": 50,

    "gd": 40,

}


# =========================================================
# LEVEL CALCULATION
# =========================================================

def calculate_level(xp: int) -> int:

    if xp < 100:
        return 1

    return (xp // 100) + 1


# =========================================================
# ADD XP
# =========================================================

def add_xp(
    db: Session,
    user: User,
    amount: int
):

    if amount <= 0:
        return user

    user.xp = (user.xp or 0) + amount

    user.level = calculate_level(
        user.xp
    )

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# LOGIN STREAK
# =========================================================

def update_login_streak(
    db: Session,
    user: User
):

    now = datetime.now(timezone.utc)

    # First-ever streak login
    if user.last_streak_at is None:

        user.streak = 1
        user.last_streak_at = now

        db.commit()
        db.refresh(user)

        return user

    last_streak = user.last_streak_at

    # Handle timezone-naive database values
    if last_streak.tzinfo is None:

        last_streak = last_streak.replace(
            tzinfo=timezone.utc
        )

    elapsed_seconds = (
        now - last_streak
    ).total_seconds()

    # Less than 24 hours:
    # do NOT increase streak.
    if elapsed_seconds < 24 * 60 * 60:

        return user

    # 24 hours or more:
    # increase streak exactly once.
    user.streak = (user.streak or 0) + 1

    user.last_streak_at = now

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# GAMIFICATION DATA
# =========================================================

def get_gamification_data(
    user: User
):

    xp = user.xp or 0

    level = user.level or calculate_level(xp)

    return {

        "xp": xp,

        "level": level,

        "streak": user.streak or 0

    }
def process_login_gamification(
    db: Session,
    user: User
):

    now = datetime.now(timezone.utc)

    # -----------------------------
    # XP
    # -----------------------------

    user.xp = (user.xp or 0) + XP_REWARDS["login"]

    user.level = calculate_level(
        user.xp
    )

    # -----------------------------
    # STREAK
    # -----------------------------

    if user.last_streak_at is None:

        user.streak = 1
        user.last_streak_at = now

    else:

        last_streak = user.last_streak_at

        if last_streak.tzinfo is None:

            last_streak = last_streak.replace(
                tzinfo=timezone.utc
            )

        elapsed_seconds = (
            now - last_streak
        ).total_seconds()

        if elapsed_seconds >= 24 * 60 * 60:

            user.streak = (
                user.streak or 0
            ) + 1

            user.last_streak_at = now

    db.commit()
    db.refresh(user)

    return user