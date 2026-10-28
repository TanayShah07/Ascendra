from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.database.dependencies import get_database
from app.config.dependencies import get_current_user

from app.models.user import User
from app.models.roadmap import Roadmap

from app.services.roadmap_service import (
    generate_roadmap,
    calculate_roadmap_progress,
    serialize_roadmap,
    deserialize_roadmap
)


router = APIRouter(
    prefix="/roadmap",
    tags=["Roadmap"]
)


class RoadmapRequest(BaseModel):
    goal: str


class TopicUpdateRequest(BaseModel):
    completed: bool


class RenameRoadmapRequest(BaseModel):
    goal: str


# =========================================================
# GENERATE ROADMAP
# =========================================================

@router.post("/generate")
def generate_roadmap_endpoint(

    request: RoadmapRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    if not request.goal.strip():

        raise HTTPException(
            status_code=400,
            detail="Please enter a career goal."
        )


    roadmap_data = generate_roadmap(
        request.goal
    )

    roadmap_data["archived"] = False


    roadmap = Roadmap(

        user_id=current_user.id,

        goal=roadmap_data["goal"],

        role=roadmap_data["role"],

        roadmap_data=serialize_roadmap(
            roadmap_data
        ),

        progress=roadmap_data["progress"],

        completed_topics=
            roadmap_data["completed_topics"],

        total_topics=
            roadmap_data["total_topics"],

        xp=roadmap_data["xp"]

    )


    db.add(roadmap)


    current_user.roadmap_generated = (
        (current_user.roadmap_generated or 0) + 1
    )


    db.commit()

    db.refresh(roadmap)


    return {

        "success": True,

        "message":
            "Roadmap generated successfully.",

        "data": {

            "id": roadmap.id,

            **roadmap_data

        }

    }


# =========================================================
# GET ACTIVE ROADMAPS
# =========================================================

@router.get("/")
def get_user_roadmaps(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmaps = (

        db.query(Roadmap)

        .filter(
            Roadmap.user_id ==
            current_user.id
        )

        .order_by(
            Roadmap.created_at.asc()
        )

        .all()

    )


    result = []


    for roadmap in roadmaps:

        data = deserialize_roadmap(
            roadmap.roadmap_data
        )


        # Old roadmaps created before archive
        # support will be treated as active.
        if data.get("archived", False):

            continue


        data["id"] = roadmap.id

        data["goal"] = roadmap.goal

        data["role"] = roadmap.role

        data["progress"] = roadmap.progress

        data["completed_topics"] = (
            roadmap.completed_topics
        )

        data["total_topics"] = (
            roadmap.total_topics
        )

        data["xp"] = roadmap.xp

        data["archived"] = False


        result.append(data)


    return {

        "success": True,

        "data": result

    }


# =========================================================
# GET ARCHIVED ROADMAPS
# =========================================================

@router.get("/archived")
def get_archived_roadmaps(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmaps = (

        db.query(Roadmap)

        .filter(
            Roadmap.user_id ==
            current_user.id
        )

        .order_by(
            Roadmap.created_at.asc()
        )

        .all()

    )


    result = []


    for roadmap in roadmaps:

        data = deserialize_roadmap(
            roadmap.roadmap_data
        )


        if not data.get(
            "archived",
            False
        ):

            continue


        data["id"] = roadmap.id

        data["goal"] = roadmap.goal

        data["role"] = roadmap.role

        data["progress"] = roadmap.progress

        data["completed_topics"] = (
            roadmap.completed_topics
        )

        data["total_topics"] = (
            roadmap.total_topics
        )

        data["xp"] = roadmap.xp

        data["archived"] = True


        result.append(data)


    return {

        "success": True,

        "data": result

    }


# =========================================================
# RENAME ROADMAP
# =========================================================

@router.patch("/{roadmap_id}/rename")
def rename_roadmap(

    roadmap_id: int,

    request: RenameRoadmapRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    new_goal = request.goal.strip()


    if not new_goal:

        raise HTTPException(
            status_code=400,
            detail="Roadmap name cannot be empty."
        )


    roadmap = (

        db.query(Roadmap)

        .filter(

            Roadmap.id ==
            roadmap_id,

            Roadmap.user_id ==
            current_user.id

        )

        .first()

    )


    if not roadmap:

        raise HTTPException(
            status_code=404,
            detail="Roadmap not found."
        )


    roadmap_data = deserialize_roadmap(
        roadmap.roadmap_data
    )


    roadmap.goal = new_goal

    roadmap_data["goal"] = new_goal


    roadmap.roadmap_data = serialize_roadmap(
        roadmap_data
    )


    db.commit()

    db.refresh(roadmap)


    return {

        "success": True,

        "message":
            "Roadmap renamed successfully.",

        "data": {

            "id": roadmap.id,

            "goal": roadmap.goal,

            "role": roadmap.role

        }

    }


# =========================================================
# ARCHIVE ROADMAP
# =========================================================

@router.patch("/{roadmap_id}/archive")
def archive_roadmap(

    roadmap_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmap = (

        db.query(Roadmap)

        .filter(

            Roadmap.id ==
            roadmap_id,

            Roadmap.user_id ==
            current_user.id

        )

        .first()

    )


    if not roadmap:

        raise HTTPException(
            status_code=404,
            detail="Roadmap not found."
        )


    roadmap_data = deserialize_roadmap(
        roadmap.roadmap_data
    )


    roadmap_data["archived"] = True


    roadmap.roadmap_data = serialize_roadmap(
        roadmap_data
    )


    db.commit()


    return {

        "success": True,

        "message":
            "Roadmap archived successfully."

    }


# =========================================================
# RESTORE ROADMAP
# =========================================================

@router.patch("/{roadmap_id}/restore")
def restore_roadmap(

    roadmap_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmap = (

        db.query(Roadmap)

        .filter(

            Roadmap.id ==
            roadmap_id,

            Roadmap.user_id ==
            current_user.id

        )

        .first()

    )


    if not roadmap:

        raise HTTPException(
            status_code=404,
            detail="Roadmap not found."
        )


    roadmap_data = deserialize_roadmap(
        roadmap.roadmap_data
    )


    roadmap_data["archived"] = False


    roadmap.roadmap_data = serialize_roadmap(
        roadmap_data
    )


    db.commit()


    return {

        "success": True,

        "message":
            "Roadmap restored successfully."

    }


# =========================================================
# DELETE ROADMAP
# =========================================================

@router.delete("/{roadmap_id}")
def delete_roadmap(

    roadmap_id: int,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmap = (

        db.query(Roadmap)

        .filter(

            Roadmap.id ==
            roadmap_id,

            Roadmap.user_id ==
            current_user.id

        )

        .first()

    )


    if not roadmap:

        raise HTTPException(
            status_code=404,
            detail="Roadmap not found."
        )


    db.delete(roadmap)

    db.commit()


    return {

        "success": True,

        "message":
            "Roadmap deleted permanently."

    }


# =========================================================
# UPDATE TOPIC
# =========================================================

@router.patch(
    "/{roadmap_id}/stage/{stage_index}/topic/{topic_index}"
)
def update_topic(

    roadmap_id: int,

    stage_index: int,

    topic_index: int,

    request: TopicUpdateRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_database
    )

):

    roadmap = (

        db.query(Roadmap)

        .filter(

            Roadmap.id ==
            roadmap_id,

            Roadmap.user_id ==
            current_user.id

        )

        .first()

    )


    if not roadmap:

        raise HTTPException(
            status_code=404,
            detail="Roadmap not found."
        )


    roadmap_data = deserialize_roadmap(
        roadmap.roadmap_data
    )


    stages = roadmap_data.get(
        "stages",
        []
    )


    if (
        stage_index < 0
        or stage_index >= len(stages)
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid stage."
        )


    topics = stages[
        stage_index
    ].get(
        "topics",
        []
    )


    if (
        topic_index < 0
        or topic_index >= len(topics)
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid topic."
        )


    topics[
        topic_index
    ]["completed"] = (
        request.completed
    )


    roadmap_data = calculate_roadmap_progress(
        roadmap_data
    )


    roadmap.roadmap_data = serialize_roadmap(
        roadmap_data
    )

    roadmap.progress = (
        roadmap_data["progress"]
    )

    roadmap.completed_topics = (
        roadmap_data["completed_topics"]
    )

    roadmap.total_topics = (
        roadmap_data["total_topics"]
    )

    roadmap.xp = (
        roadmap_data["xp"]
    )


    db.commit()

    db.refresh(roadmap)


    roadmap_data["id"] = roadmap.id


    return {

        "success": True,

        "message":
            "Roadmap progress updated.",

        "data": roadmap_data

    }