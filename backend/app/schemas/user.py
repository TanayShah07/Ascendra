from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    college: str
    branch: str
    graduation_year: int


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    college: str | None = None
    branch: str | None = None
    graduation_year: int | None = None

class ProfileUpdate(BaseModel):

    full_name: str

    college: str | None = None

    branch: str | None = None

    graduation_year: int | None = None

    bio: str | None = None


class SocialLinksUpdate(BaseModel):

    linkedin: str | None = None

    github: str | None = None

    portfolio: str | None = None

    leetcode: str | None = None


class PlacementGoalsUpdate(BaseModel):

    dream_company: str | None = None

    target_role: str | None = None

    preferred_domain: str | None = None

    class Config:
        from_attributes = True

class ChangePasswordRequest(BaseModel):

    current_password: str

    new_password: str