from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.interview_service import start_session, process_turn, session_summary

router = APIRouter(prefix="/interview", tags=["AI Mock Interview"])

class StartInterviewRequest(BaseModel):
    subject: str = "Mixed"
    difficulty: str = "Easy"
    duration: int = Field(default=30, ge=3, le=180)
    language: str = "English"

class AnswerRequest(BaseModel):
    session_id: str
    answer: str = Field(min_length=1, max_length=10000)

@router.post("/start")
def start_interview(payload: StartInterviewRequest):
    try:
        return start_session(payload.model_dump())
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Could not start interview: {exc}") from exc

@router.post("/answer")
def submit_answer(payload: AnswerRequest):
    try:
        return process_turn(payload.session_id, payload.answer)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc).strip("'")) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Could not process answer: {exc}") from exc

@router.get("/{session_id}/summary")
def get_summary(session_id: str):
    try:
        return session_summary(session_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc).strip("'")) from exc
