import json
import os
import re
import random
import threading
import uuid
from typing import Any
from app.services.aptitude_interview_bank import APTITUDE_INTERVIEW_QUESTIONS
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")
OLLAMA_TIMEOUT = int(os.getenv("OLLAMA_TIMEOUT", "120"))

_sessions: dict[str, dict[str, Any]] = {}
_lock = threading.Lock()

QUESTION_BANK = {
    "Data Structures": [
        "How would you compare an array and a linked list, and when would you choose each?",
        "Explain how a hash table works and how collisions can be handled.",
        "What is the difference between a stack and a queue? Give a practical use case for each.",
        "How would you analyse the time complexity of binary search?"
    ],
    "OOP": [
        "Explain the four main principles of object-oriented programming with examples.",
        "What is the difference between method overloading and method overriding?",
        "When would you prefer composition over inheritance?"
    ],
    "DBMS": [
        "What is database normalization, and what problems does it solve?",
        "Explain the difference between a primary key and a foreign key.",
        "What is a database transaction, and what do the ACID properties mean?"
    ],
    "Operating Systems": [
        "What is the difference between a process and a thread?",
        "Explain deadlock and the four conditions required for it to occur.",
        "How does virtual memory help an operating system?"
    ],
    "Computer Networks": [
        "Compare TCP and UDP and explain when each is appropriate.",
        "What happens when you enter a URL into a browser and press Enter?",
        "Explain the purpose of DNS and the TCP three-way handshake."
    ],
    "Java": [
        "Explain the difference between an interface and an abstract class in Java.",
        "How does exception handling work in Java?",
        "What is the difference between == and equals() in Java?"
    ],
    "Python": [
        "Explain the difference between a list, tuple, set, and dictionary in Python.",
        "What are decorators in Python, and when might you use one?",
        "How does Python handle exceptions and resource cleanup?"
    ],
    "JavaScript": [
        "Explain the difference between var, let, and const.",
        "What are promises and async/await, and how do they help with asynchronous code?",
        "Explain how closures work in JavaScript."
    ],
    "React": [
        "What is the difference between props and state in React?",
        "Why are React hooks useful, and what rules must be followed when using them?",
        "How would you prevent unnecessary re-renders in a React application?"
    ],
    "HR": [
        "Tell me about yourself and the experiences that best prepare you for this role.",
        "Describe a challenging situation you faced and how you handled it.",
        "Why do you want this role, and what strengths would you bring to the team?"
    ],
    "Aptitude": [
        "A product's price increases by 20% and then decreases by 20%. Is the final price equal to the original? Explain.",
        "How would you approach a time-and-work problem where two people work at different rates?",
        "Explain your approach to solving a probability question when events may be dependent."
    ],
    "Mixed": [
        "Tell me about a technical project you built and the main engineering decision you made.",
        "Explain one core computer science concept you understand well.",
        "Describe a challenge you faced while learning or building something and how you resolved it."
    ],
}
def _ollama(prompt: str, system: str = "") -> str:
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "messages": ([{"role": "system", "content": system}] if system else []) +
                    [{"role": "user", "content": prompt}],
        "options": {"temperature": 0.35, "num_predict": 450},
    }
    req = Request(
        f"{OLLAMA_URL.rstrip('/')}/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(req, timeout=OLLAMA_TIMEOUT) as response:
            data = json.loads(response.read().decode("utf-8"))
        return str(data.get("message", {}).get("content", "")).strip()
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Ollama returned HTTP {exc.code}: {detail[:400]}") from exc
    except (URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise RuntimeError(
            f"Cannot reach Ollama at {OLLAMA_URL}. Start Ollama and verify model "
            f"'{OLLAMA_MODEL}' is available. Details: {exc}"
        ) from exc

def _extract_json(text: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    match = re.search(r"\{.*\}", cleaned, flags=re.S)
    if not match:
        raise ValueError("The interview model did not return valid JSON.")
    return json.loads(match.group(0))

def _make_question(session: dict, first: bool = False) -> str:
    subject = session["subject"]
    idx = session["question_index"]
    pool = session.get("question_pool") or QUESTION_BANK.get(subject, QUESTION_BANK["Mixed"])
    fallback = pool[idx % len(pool)]

    # Aptitude questions come directly from Ascendra's uploaded seed question bank.
    # This preserves the source's question wording/options and rotates categories.
    if subject == "Aptitude":
        aptitude_pool = session.get("aptitude_pool") or APTITUDE_INTERVIEW_QUESTIONS
        return aptitude_pool[idx % len(aptitude_pool)]["question"]

    try:
        history = "\\n".join(
            f"Q: {item['question']}\\nA: {item.get('answer','')}"
            for item in session["history"][-5:]
        ) or "No previous questions."
        generated = _ollama(
            f"Create exactly one varied placement interview question for subject '{subject}', "
            f"difficulty '{session['difficulty']}', interview language '{session['language']}'. "
            f"Question number: {idx + 1}. Use this randomly selected topic cue for inspiration, "
            f"but do not copy it verbatim: '{fallback}'. Avoid these previously asked questions:\\n{history}\\n"
            "Vary the question type across the interview: definitions, comparisons, practical scenarios, "
            "debugging/troubleshooting, trade-offs, examples, and applied reasoning when relevant. "
            "Return only one question, with no answer or explanation.",
            "You are a professional placement interviewer. Ask clear, fair, subject-specific questions. "
            "Do not repeat a question or merely rephrase a previous one."
        )
        generated = generated.strip().strip('"')
        if len(generated) >= 8 and generated.lower() not in {
            item.get("question", "").lower() for item in session["history"]
        }:
            return generated[:900]
    except RuntimeError:
        pass
    return fallback

def start_session(payload: dict) -> dict:
    subject = str(payload.get("subject", "Mixed"))
    if subject not in QUESTION_BANK:
        subject = "Mixed"
    question_pool = list(QUESTION_BANK.get(subject, QUESTION_BANK["Mixed"]))
    random.shuffle(question_pool)
    aptitude_pool = list(APTITUDE_INTERVIEW_QUESTIONS)
    # Rotate by complete category triplets: each session starts differently while
    # retaining Quantitative / Logical / Verbal variety throughout.
    if len(aptitude_pool) >= 3:
        offset = random.randrange(0, max(1, len(aptitude_pool) // 3)) * 3
        aptitude_pool = aptitude_pool[offset:] + aptitude_pool[:offset]
    session = {
        "session_id": str(uuid.uuid4()),
        "subject": subject,
        "difficulty": str(payload.get("difficulty", "Easy")),
        "duration": int(payload.get("duration", 30)),
        "language": str(payload.get("language", "English")),
        "question_index": 0,
        "asked_count": 0,
        "history": [],
        "question_pool": question_pool,
        "aptitude_pool": aptitude_pool,
        "current_question": "",
        "finished": False,
    }
    session["current_question"] = _make_question(session, first=True)
    session["asked_count"] = 1
    with _lock:
        _sessions[session["session_id"]] = session
    return {
        "session_id": session["session_id"],
        "question": session["current_question"],
        "question_number": 1,
        "subject": subject,
        "difficulty": session["difficulty"],
        "duration": session["duration"],
        "language": session["language"],
        "message": "Interview started.",
    }

def _get_session(session_id: str) -> dict:
    with _lock:
        session = _sessions.get(session_id)
    if not session:
        raise KeyError("Interview session not found. Please start a new interview.")
    return session

def process_turn(session_id: str, answer: str) -> dict:
    session = _get_session(session_id)
    answer = (answer or "").strip()
    if not answer:
        raise ValueError("Please speak or enter an answer before submitting.")
    if session["finished"]:
        raise ValueError("This interview has ended. Start a new interview to continue.")

    normalized = re.sub(r"[^a-z0-9\s']", " ", answer.lower())
    words = set(normalized.split())
    if words.intersection({"repeat", "repeated", "again"}) and len(words) <= 5:
        return {
            "intent": "repeat", "feedback": "Of course. Here is the question again.",
            "question": session["current_question"], "question_number": session["asked_count"],
            "advance": False, "finished": False
        }
    if words.intersection({"clarify", "clarification", "explain", "meaning"}) and len(words) <= 6:
        try:
            clarification = _ollama(
                f"Clarify this interview question in simple terms without answering it. "
                f"Interview language: {session['language']}. Question: {session['current_question']}",
                "You are a helpful interviewer. Explain what the question is asking, briefly."
            )
        except RuntimeError:
            clarification = "The question is asking you to explain the main concept, describe how it works, and give an example if relevant."
        return {
            "intent": "clarify", "feedback": clarification,
            "question": session["current_question"], "question_number": session["asked_count"],
            "advance": False, "finished": False
        }
    dont_know = any(phrase in normalized for phrase in [
        "i don't know", "i dont know", "do not know", "not sure", "no idea",
        "mujhe nahi pata", "pata nahi"
    ])
    if dont_know:
        feedback = "That's okay—this is a practice interview. Think about the core definition, then explain one example. I'll move to the next question so you can keep practising."
        session["history"].append({
            "question": session["current_question"], "answer": answer,
            "feedback": feedback, "score": 0, "intent": "dont_know"
        })
        return _advance(session, feedback, 0, "dont_know")

    prompt = f"""
Evaluate the candidate's actual answer to the current interview question.
Subject: {session['subject']}
Difficulty: {session['difficulty']}
Language: {session['language']}
Question: {session['current_question']}
Candidate answer: {answer}

Return ONLY valid JSON with these keys:
{{
 "score": integer from 0 to 100,
 "quality": "strong" or "partial" or "weak",
 "feedback": "specific concise feedback about this answer",
 "missing_points": ["important missing point"],
 "follow_up_question": "one relevant follow-up question or empty string",
 "next_question": "a new question on the same subject or empty string"
}}
Score based on correctness, relevance, explanation, and examples. Do not reward length alone.
Use the requested language. If the answer is strong (typically 70+), provide feedback and a new question.
If partially correct (typically 40-69), identify a concrete gap and ask a follow-up that helps assess understanding.
If weak (below 40), give supportive, actionable feedback and ask a simpler follow-up question.
"""
    try:
        raw = _ollama(prompt, "You are a fair technical interviewer and answer evaluator. Never claim the candidate said something absent from their answer.")
        evaluation = _extract_json(raw)
        score = max(0, min(100, int(evaluation.get("score", 0))))
        quality = str(evaluation.get("quality", "partial")).lower()
        feedback = str(evaluation.get("feedback", "Answer evaluated."))
        follow_up = str(evaluation.get("follow_up_question", "")).strip()
        next_question = str(evaluation.get("next_question", "")).strip()
        missing = evaluation.get("missing_points", [])
        if not isinstance(missing, list):
            missing = []
    except (RuntimeError, ValueError, TypeError, json.JSONDecodeError) as exc:
        # Keep the session usable if Ollama is temporarily unavailable or malformed.
        score = min(60, max(10, len(answer.split()) * 3))
        quality = "partial" if len(answer.split()) >= 8 else "weak"
        feedback = "I couldn't get a complete AI evaluation from Ollama just now. Please check that Ollama is running with the configured model, then try again. Your response has been kept."
        follow_up = ""
        next_question = ""
        missing = []

    session["history"].append({
        "question": session["current_question"], "answer": answer,
        "feedback": feedback, "score": score, "intent": "answer",
        "missing_points": missing
    })
    if quality == "strong" or score >= 70:
        return _advance(session, feedback, score, "answer", next_question=next_question, missing_points=missing)
    if follow_up:
        session["current_question"] = follow_up
        session["asked_count"] += 1
        return {
            "intent": "follow_up", "feedback": feedback, "score": score,
            "missing_points": missing, "question": follow_up,
            "question_number": session["asked_count"], "advance": False,
            "finished": False
        }
    return _advance(session, feedback, score, "answer", next_question=next_question, missing_points=missing)

def _advance(session: dict, feedback: str, score: int, intent: str, next_question: str = "", missing_points=None) -> dict:
    session["question_index"] += 1
    if session["asked_count"] >= max(1, int(session["duration"] / 3)):
        session["finished"] = True
        average = round(sum(item.get("score", 0) for item in session["history"]) / max(1, len(session["history"])))
        return {
            "intent": intent, "feedback": feedback, "score": score,
            "missing_points": missing_points or [], "question": "",
            "question_number": session["asked_count"], "advance": True,
            "finished": True, "summary": {
                "questions_answered": len(session["history"]),
                "average_score": average,
                "message": "Interview complete. Review the feedback and keep practising."
            }
        }
    if not next_question:
        try:
            next_question = _make_question(session)
        except Exception:
            next_question = QUESTION_BANK.get(session["subject"], QUESTION_BANK["Mixed"])[
                session["question_index"] % len(QUESTION_BANK.get(session["subject"], QUESTION_BANK["Mixed"]))
            ]
    session["current_question"] = next_question
    session["asked_count"] += 1
    return {
        "intent": intent, "feedback": feedback, "score": score,
        "missing_points": missing_points or [], "question": next_question,
        "question_number": session["asked_count"], "advance": True,
        "finished": False
    }

def session_summary(session_id: str) -> dict:
    session = _get_session(session_id)
    history = session["history"]
    return {
        "session_id": session_id,
        "subject": session["subject"],
        "questions_answered": len(history),
        "average_score": round(sum(x.get("score", 0) for x in history) / max(1, len(history))),
        "history": history,
        "finished": session["finished"],
    }
