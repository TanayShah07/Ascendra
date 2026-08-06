from sqlalchemy.orm import Session

from app.models.user import User


def get_profile(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


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

    db.commit()
    db.refresh(user)

    return user


def update_social_links(
    db: Session,
    user: User,
    data
):

    user.linkedin = data.linkedin
    user.github = data.github
    user.portfolio = data.portfolio
    user.leetcode = data.leetcode

    db.commit()
    db.refresh(user)

    return user


def update_placement_goals(
    db: Session,
    user: User,
    data
):

    user.dream_company = data.dream_company
    user.target_role = data.target_role
    user.preferred_domain = data.preferred_domain

    db.commit()
    db.refresh(user)

    return user