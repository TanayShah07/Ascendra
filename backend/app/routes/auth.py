from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_database
from app.models.user import User
from app.schemas.user import UserRegister
from app.config.security import hash_password
from app.config.security import (
    verify_password,
    create_access_token,
)

from app.schemas.user import UserLogin
from app.config.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_database)
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
        college=user.college,
        branch=user.branch,
        graduation_year=user.graduation_year
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration Successful",
        "user_id": new_user.id
    }

@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_database)
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token(
        {
            "sub": existing_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user