from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.database.session import Base


class Roadmap(Base):

    __tablename__ = "roadmaps"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    goal = Column(
        String(500),
        nullable=False
    )

    role = Column(
        String(150),
        nullable=False
    )

    roadmap_data = Column(
        Text,
        nullable=False
    )

    progress = Column(
        Integer,
        default=0
    )

    completed_topics = Column(
        Integer,
        default=0
    )

    total_topics = Column(
        Integer,
        default=0
    )

    xp = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )