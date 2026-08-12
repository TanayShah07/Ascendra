from pydantic import BaseModel
from typing import Optional


class AptitudeQuestionResponse(BaseModel):

    id: int

    question: str

    option_a: str
    option_b: str
    option_c: str
    option_d: str

    # IMPORTANT
    # Required for answer review
    correct_answer: str

    # IMPORTANT
    # Required for explanation
    explanation: Optional[str] = None

    category: str

    company: Optional[str] = None

    difficulty: str

    marks: int


    class Config:
        from_attributes = True