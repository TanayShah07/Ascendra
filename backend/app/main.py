from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.routes import auth_router
from app.database.session import engine, Base
from app.routes import (
    auth_router,
    profile_router,
    dashboard_router,
    resume_router,
    coding_router,
    roadmap_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ascendra API",
    version="1.0.0",
    description="Backend API for Ascendra"
)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(dashboard_router)
app.include_router(resume_router)
app.include_router(coding_router)
app.include_router(roadmap_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Ascendra API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "running"
    }