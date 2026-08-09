from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from pydantic import EmailStr
from jose import JWTError, jwt

import secrets
from datetime import datetime, timedelta, timezone

from app.database.dependencies import get_database
from app.models.user import User
from app.models.password_reset import PasswordReset

from app.schemas.user import UserRegister, UserLogin

from app.config.security import (
    hash_password,
    verify_password,
    create_access_token,
    pwd_context,
)

from app.config.dependencies import get_current_user
from app.config.settings import settings

from app.services.email_service import send_otp_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================================================
# REGISTER
# =========================================================

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

        password_hash=hash_password(
            user.password
        ),

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


# =========================================================
# LOGIN
# =========================================================

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


# =========================================================
# GET CURRENT USER
# =========================================================

@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
):

    return current_user


# =========================================================
# FORGOT PASSWORD
# =========================================================

@router.post("/forgot-password")
def forgot_password(
    email: EmailStr,
    db: Session = Depends(get_database)
):

    # Find user
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # Don't reveal whether email exists
    if not user:

        return {

            "message":
            "If the email is registered, an OTP has been sent."

        }

    # Generate random 6-digit OTP
    otp = f"{secrets.randbelow(1_000_000):06d}"

    # Hash OTP before storing
    otp_hash = pwd_context.hash(otp)

    # OTP expires after 10 minutes
    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=10)
    )

    # Invalidate previous unused OTPs
    db.query(PasswordReset).filter(

        PasswordReset.user_id == user.id,

        PasswordReset.used == 0

    ).update({

        PasswordReset.used: 1

    })

    # Create new reset record
    reset = PasswordReset(

        user_id=user.id,

        otp_hash=otp_hash,

        expires_at=expires_at,

        used=0

    )

    db.add(reset)

    db.commit()

    # Send OTP email
    try:

        send_otp_email(
            user.email,
            otp
        )

    except Exception:

        db.delete(reset)

        db.commit()

        raise HTTPException(

            status_code=500,

            detail="Unable to send OTP email."

        )

    return {

        "message":
        "If the email is registered, an OTP has been sent."

    }


# =========================================================
# VERIFY OTP
# =========================================================

@router.post("/verify-otp")
def verify_otp(
    email: EmailStr,
    otp: str,
    db: Session = Depends(get_database)
):

    # Find user
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP."

        )

    # Find latest unused OTP
    reset = (
        db.query(PasswordReset)
        .filter(

            PasswordReset.user_id == user.id,

            PasswordReset.used == 0

        )
        .order_by(

            PasswordReset.created_at.desc()

        )
        .first()
    )

    if not reset:

        raise HTTPException(

            status_code=400,

            detail="Invalid or expired OTP."

        )

    # Check expiry
    if reset.expires_at < datetime.now(timezone.utc):

        reset.used = 1

        db.commit()

        raise HTTPException(

            status_code=400,

            detail="OTP has expired."

        )

    # Verify OTP
    if not pwd_context.verify(
        otp,
        reset.otp_hash
    ):

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP."

        )

    # Mark OTP as used
    reset.used = 1

    db.commit()

    # Generate temporary reset token
    reset_token = create_access_token({

        "sub": user.email,

        "purpose": "password_reset"

    })

    return {

        "message":
        "OTP verified successfully.",

        "reset_token":
        reset_token

    }


# =========================================================
# RESET PASSWORD
# =========================================================

@router.post("/reset-password")
def reset_password(
    email: EmailStr,
    reset_token: str,
    new_password: str,
    db: Session = Depends(get_database)
):

    # -----------------------------------------------------
    # Verify reset token
    # -----------------------------------------------------

    try:

        payload = jwt.decode(

            reset_token,

            settings.SECRET_KEY,

            algorithms=[
                settings.ALGORITHM
            ]

        )

    except JWTError:

        raise HTTPException(

            status_code=401,

            detail=
            "Invalid or expired reset token."

        )

    # -----------------------------------------------------
    # Make sure this is a password-reset token
    # -----------------------------------------------------

    if payload.get("purpose") != "password_reset":

        raise HTTPException(

            status_code=401,

            detail="Invalid reset token."

        )

    token_email = payload.get("sub")

    if not token_email:

        raise HTTPException(

            status_code=401,

            detail="Invalid reset token."

        )

    if token_email != email:

        raise HTTPException(

            status_code=401,

            detail="Invalid reset token."

        )

    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found."

        )

    # -----------------------------------------------------
    # Prevent using current password again
    # -----------------------------------------------------

    if verify_password(

        new_password,

        user.password_hash

    ):

        raise HTTPException(

            status_code=400,

            detail=
            "New password must be different from your current password."

        )

    # -----------------------------------------------------
    # Update password
    # -----------------------------------------------------

    user.password_hash = hash_password(
        new_password
    )

    db.commit()

    return {

        "message":
        "Password reset successfully."

    }