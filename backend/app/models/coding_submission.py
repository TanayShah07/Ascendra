from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func

from app.database.session import Base


class CodingSubmission(Base):

    __tablename__ = "coding_submissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    problem_id = Column(
        Integer,
        ForeignKey("coding_problems.id"),
        nullable=False
    )

    language = Column(
        String(20),
        nullable=False
    )

    code = Column(
        Text,
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False
    )

    passed_tests = Column(
        Integer,
        default=0
    )

    total_tests = Column(
        Integer,
        default=0
    )

    xp_earned = Column(
        Integer,
        default=0
    )

    submitted_at = Column(
        DateTime,
        server_default=func.now()
    )