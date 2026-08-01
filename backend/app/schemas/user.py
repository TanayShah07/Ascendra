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

    class Config:
        from_attributes = True