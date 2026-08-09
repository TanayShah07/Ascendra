from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_database
from app.config.dependencies import get_current_user

from app.models.user import User

from app.schemas.user import (
    ProfileUpdate,
    SocialLinksUpdate,
    PlacementGoalsUpdate,
)

from app.services.profile_service import (
    get_profile,
    update_profile,
    update_social_links,
    update_placement_goals,
)

from app.services.profile_service import (
    get_profile,
    update_profile,
    update_social_links,
    update_placement_goals,
    calculate_readiness_breakdown,
)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def fetch_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_database),
):

    return get_profile(
        db,
        current_user.id
    )


@router.put("/")
def edit_profile(
    data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_database),
):

    return update_profile(
        db,
        current_user,
        data
    )


@router.patch("/social")
def edit_social_links(
    data: SocialLinksUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_database),
):

    return update_social_links(
        db,
        current_user,
        data
    )


@router.patch("/goals")
def edit_placement_goals(
    data: PlacementGoalsUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_database),
):

    return update_placement_goals(
        db,
        current_user,
        data
    )

@router.get("/readiness")
def get_readiness(
    current_user: User = Depends(get_current_user),
):

    breakdown = calculate_readiness_breakdown(
        current_user
    )

    total = sum(
        item["score"]
        for item in breakdown.values()
    )

    return {
        "score": min(total, 100),
        "breakdown": breakdown
    }