from sqlalchemy import Column, Integer, String, DateTime, Text
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

    # ---------- Professional Profiles ----------

    linkedin = Column(String(500))

    github = Column(String(500))

    portfolio = Column(String(500))

    leetcode = Column(String(500))

    # ---------- Placement ----------

    dream_company = Column(String(150))

    target_role = Column(String(150))

    preferred_domain = Column(String(150))

    # ---------- Bio ----------

    bio = Column(Text)

    # ---------- Readiness ----------

    placement_readiness = Column(Integer, default=2)

    xp = Column(Integer, default=0)

    level = Column(Integer, default=1)

    streak = Column(Integer, default=0)

    last_streak_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    # ---------- Resume ----------

    resume_url = Column(String(500))

    resume_score = Column(Integer, default=0)

    ats_score = Column(Integer, default=0)

    # ---------- Coding ----------

    coding_problems_solved = Column(Integer, default=0)

    easy_solved = Column(Integer, default=0)

    medium_solved = Column(Integer, default=0)

    hard_solved = Column(Integer, default=0)

    # ---------- Interview ----------

    interview_completed = Column(Integer, default=0)

    gd_completed = Column(Integer, default=0)

    # ---------- Roadmap ----------

    roadmap_generated = Column(Integer, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )