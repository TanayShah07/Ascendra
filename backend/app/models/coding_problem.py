from sqlalchemy import Column, Integer, String, Text, Boolean

from app.database.session import Base


class CodingProblem(Base):

    __tablename__ = "coding_problems"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    difficulty = Column(
        String(20),
        nullable=False
    )

    topic = Column(
        String(100),
        nullable=False
    )

    company = Column(
        String(100),
        nullable=True
    )

    starter_code = Column(
        Text,
        nullable=True
    )

    expected_output = Column(
        Text,
        nullable=True
    )

    time_limit = Column(
        Integer,
        default=30
    )

    xp = Column(
        Integer,
        default=25
    )

    is_active = Column(
        Boolean,
        default=True
    )

    # Detailed LeetCode-style information
    examples = Column(
        Text,
        nullable=True
    )

    constraints = Column(
        Text,
        nullable=True
    )

    hints = Column(
        Text,
        nullable=True
    )

    # Language-specific boilerplate
    boilerplate = Column(
        Text,
        nullable=True
    )

    # Language-specific official solutions
    solutions = Column(
        Text,
        nullable=True
    )

    # Visible test cases
    test_cases = Column(
        Text,
        nullable=True
    )

    # Hidden test cases
    hidden_test_cases = Column(
        Text,
        nullable=True
    )