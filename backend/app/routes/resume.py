from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Form
)

from app.services.resume_service import (
    extract_resume_text,
    parse_resume,
    analyze_resume_target,
    calculate_ats_score,
    generate_resume_insights
)

from app.services.resume_service import (
    extract_resume_text,
    parse_resume,
    analyze_resume_target,
    calculate_ats_score,
    generate_resume_insights,
    generate_resume_interview_questions
)


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


MAX_FILE_SIZE = 5 * 1024 * 1024


@router.post("/parse")
async def parse_resume_endpoint(

    file: UploadFile = File(...),

    target_company: str = Form(...),

    target_role: str = Form(...),

    experience_level: str = Form(...)

):

    # =====================================================
    # FILE VALIDATION
    # =====================================================

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )


    filename = file.filename.lower()


    if not (
        filename.endswith(".pdf")
        or filename.endswith(".docx")
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "Only PDF and DOCX files are supported."
            )
        )


    file_bytes = await file.read()


    if len(file_bytes) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail=(
                "File size must not exceed 5 MB."
            )
        )


    if len(file_bytes) == 0:

        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )


    try:

        # =================================================
        # STEP 1 — EXTRACT RESUME TEXT
        # =================================================

        extracted_text = extract_resume_text(
            file_bytes,
            file.filename
        )


        if not extracted_text:

            raise HTTPException(
                status_code=400,
                detail=(
                    "Could not extract text from the resume. "
                    "Please upload a text-based PDF or DOCX file."
                )
            )


        # =================================================
        # STEP 2 — PARSE RESUME
        # =================================================

        parsed_resume = parse_resume(
            extracted_text
        )


        # =================================================
        # STEP 3 — TARGET-AWARE ANALYSIS
        # =================================================

        target_analysis = analyze_resume_target(

            parsed_resume,

            target_company,

            target_role,

            experience_level

        )


        # =================================================
        # STEP 4 — ATS SCORE
        # =================================================

        ats_analysis = calculate_ats_score(

            parsed_resume,

            target_analysis

        )


        # =================================================
        # STEP 5 — RESUME INTELLIGENCE
        # =================================================

        resume_insights = generate_resume_insights(

            parsed_resume,

            target_analysis

        )

        interview_questions = generate_resume_interview_questions(
            parsed_resume,
            target_analysis
        )


        # =================================================
        # FINAL RESPONSE
        # =================================================

        return {

            "success": True,

            "filename": file.filename,

            "message":
                "Resume analyzed successfully.",

            "data": {

                "parsed_resume":
                    parsed_resume,

                "target_analysis":
                    target_analysis,

                "ats_analysis":
                    ats_analysis,

                "resume_insights":
                    resume_insights,

                "interview_questions":
                    interview_questions

            }

        }


    except HTTPException:

        raise


    except Exception as error:

        raise HTTPException(

            status_code=500,

            detail=(
                f"Resume analysis failed: {str(error)}"
            )

        )