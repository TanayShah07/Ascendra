import os
import sys
import json
import uuid
import shutil
import subprocess
import tempfile

from pathlib import Path


# =========================================================
# CONFIGURATION
# =========================================================

EXECUTION_TIMEOUT = 5

SUPPORTED_LANGUAGES = {
    "python",
    "java",
    "cpp",
}


# =========================================================
# NORMALIZE LANGUAGE
# =========================================================

def normalize_language(language: str) -> str:

    if not language:
        return "python"

    language = language.lower().strip()

    aliases = {
        "py": "python",
        "python3": "python",
        "java": "java",
        "c++": "cpp",
        "cc": "cpp",
        "cplusplus": "cpp",
    }

    return aliases.get(
        language,
        language
    )


# =========================================================
# CHECK LANGUAGE
# =========================================================

def validate_language(language: str):

    language = normalize_language(
        language
    )

    if language not in SUPPORTED_LANGUAGES:

        raise ValueError(
            f"Unsupported language: {language}"
        )

    return language


# =========================================================
# RUN PROCESS
# =========================================================

def run_process(
    command,
    cwd,
    timeout=EXECUTION_TIMEOUT
):

    try:

        process = subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        return {
            "success":
                process.returncode == 0,

            "returncode":
                process.returncode,

            "stdout":
                process.stdout,

            "stderr":
                process.stderr,
        }

    except subprocess.TimeoutExpired:

        return {
            "success": False,
            "returncode": -1,
            "stdout": "",
            "stderr":
                "Time Limit Exceeded"
        }

    except Exception as exc:

        return {
            "success": False,
            "returncode": -1,
            "stdout": "",
            "stderr": str(exc)
        }


# =========================================================
# PYTHON
# =========================================================

def execute_python(
    code: str,
    driver: str
):

    workdir = Path(
        tempfile.mkdtemp(
            prefix="ascendra_python_"
        )
    )

    try:

        solution_file = (
            workdir / "solution.py"
        )

        driver_file = (
            workdir / "driver.py"
        )

        solution_file.write_text(
            code,
            encoding="utf-8"
        )

        driver_file.write_text(
            driver,
            encoding="utf-8"
        )

        result = run_process(
            [
                sys.executable,
                "driver.py"
            ],
            workdir
        )

        return result

    finally:

        shutil.rmtree(
            workdir,
            ignore_errors=True
        )


# =========================================================
# JAVA
# =========================================================

def execute_java(
    code: str,
    driver: str
):

    workdir = Path(
        tempfile.mkdtemp(
            prefix="ascendra_java_"
        )
    )

    try:

        solution_file = (
            workdir / "Solution.java"
        )

        driver_file = (
            workdir / "Main.java"
        )

        solution_file.write_text(
            code,
            encoding="utf-8"
        )

        driver_file.write_text(
            driver,
            encoding="utf-8"
        )

        compile_result = run_process(
            [
                "javac",
                "Solution.java",
                "Main.java"
            ],
            workdir
        )

        if not compile_result["success"]:
            return compile_result

        return run_process(
            [
                "java",
                "Main"
            ],
            workdir
        )

    finally:

        shutil.rmtree(
            workdir,
            ignore_errors=True
        )


# =========================================================
# C++
# =========================================================

def execute_cpp(
    code: str,
    driver: str
):

    workdir = Path(
        tempfile.mkdtemp(
            prefix="ascendra_cpp_"
        )
    )

    try:

        solution_file = (
            workdir / "solution.cpp"
        )

        driver_file = (
            workdir / "main.cpp"
        )

        executable = (
            workdir / "solution.exe"
        )

        solution_file.write_text(
            code,
            encoding="utf-8"
        )

        driver_file.write_text(
            driver,
            encoding="utf-8"
        )

        compile_result = run_process(
            [
                "g++",
                "-std=c++17",
                "solution.cpp",
                "main.cpp",
                "-o",
                "solution.exe"
            ],
            workdir
        )

        if not compile_result["success"]:
            return compile_result

        return run_process(
            [
                str(executable)
            ],
            workdir
        )

    finally:

        shutil.rmtree(
            workdir,
            ignore_errors=True
        )


# =========================================================
# EXECUTE
# =========================================================

def execute_code(
    language: str,
    code: str,
    driver: str
):

    language = validate_language(
        language
    )

    if not code or not code.strip():

        return {
            "success": False,
            "returncode": -1,
            "stdout": "",
            "stderr":
                "No code submitted."
        }

    if language == "python":

        return execute_python(
            code,
            driver
        )

    if language == "java":

        return execute_java(
            code,
            driver
        )

    if language == "cpp":

        return execute_cpp(
            code,
            driver
        )

    raise ValueError(
        "Unsupported language."
    )