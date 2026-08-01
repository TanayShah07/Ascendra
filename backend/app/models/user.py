from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(120), nullable=False)

    email = Column(String(255), unique=True, index=True, nullable=False)

    password_hash = Column(String(255), nullable=False)

    college = Column(String(150))

    branch = Column(String(100))

    graduation_year = Column(Integer)

    profile_photo = Column(String(500))

    role = Column(String(30), default="student")

    created_at = Column(DateTime(timezone=True), server_default=func.now())