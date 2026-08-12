from sqlalchemy import Column, Integer, String, Text

from app.database.session import Base


class AptitudeQuestion(Base):

    __tablename__ = "aptitude_questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    question = Column(
        Text,
        nullable=False
    )

    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)

    correct_answer = Column(
        String(1),
        nullable=False
    )

    explanation = Column(
        Text,
        nullable=True
    )

    category = Column(
        String(50),
        nullable=False
    )

    company = Column(
        String(100),
        nullable=True
    )

    difficulty = Column(
        String(20),
        default="Medium"
    )

    marks = Column(
        Integer,
        default=1
    )