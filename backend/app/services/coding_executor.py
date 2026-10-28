# ============================================================
# ASCENDRA CODING EXECUTOR
# Python + Java + C++
# ============================================================

import ast
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import time

from pathlib import Path


# ============================================================
# CONFIGURATION
# ============================================================

EXECUTION_TIMEOUT = 5

SUPPORTED_LANGUAGES = {
    "python",
    "java",
    "cpp",
}


# ============================================================
# PROBLEM / FUNCTION REGISTRY
# ============================================================

PROBLEM_REGISTRY = {

    "Two Sum":
        "twoSum",

    "Valid Anagram":
        "isAnagram",

    "Reverse String":
        "reverseString",

    "Maximum Element in Array":
        "findMax",

    "Contains Duplicate":
        "containsDuplicate",

    "Valid Parentheses":
        "isValid",

    "Longest Substring Without Repeating Characters":
        "lengthOfLongestSubstring",

    "3Sum":
        "threeSum",

    "Group Anagrams":
        "groupAnagrams",

    "Product of Array Except Self":
        "productExceptSelf",

    "Binary Search":
        "search",
}


FUNCTION_TO_PROBLEM = {
    function_name: problem_name
    for problem_name, function_name
    in PROBLEM_REGISTRY.items()
}


# ============================================================
# LANGUAGE NORMALIZATION
# ============================================================

def normalize_language(language):

    if not language:
        return "python"

    language = (
        str(language)
        .lower()
        .strip()
    )

    aliases = {

        "py":
            "python",

        "python3":
            "python",

        "java":
            "java",

        "c++":
            "cpp",

        "cc":
            "cpp",

        "cplusplus":
            "cpp",

    }

    return aliases.get(
        language,
        language
    )


def validate_language(language):

    language = normalize_language(
        language
    )

    if language not in SUPPORTED_LANGUAGES:

        raise ValueError(
            f"Unsupported language: {language}"
        )

    return language


# ============================================================
# RESULT HELPER
# ============================================================

def make_result(
    passed=False,
    status="Runtime Error",
    output=None,
    expected=None,
    error="",
    execution_time=0.0,
):

    return {

        "passed":
            bool(passed),

        "status":
            status,

        "output":
            output,

        "expected":
            expected,

        "error":
            error or "",

        "execution_time":
            execution_time,

    }


# ============================================================
# PROCESS EXECUTION
# ============================================================

def run_process(
    command,
    cwd,
    timeout=EXECUTION_TIMEOUT,
):

    try:

        process = subprocess.run(

            command,

            cwd=str(cwd),

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

            "success":
                False,

            "returncode":
                -1,

            "stdout":
                "",

            "stderr":
                "Time Limit Exceeded",

        }

    except Exception as exc:

        return {

            "success":
                False,

            "returncode":
                -1,

            "stdout":
                "",

            "stderr":
                str(exc),

        }


# ============================================================
# VALUE PARSING
# ============================================================

def parse_value(value):

    if value is None:
        return None

    if isinstance(
        value,
        (
            dict,
            list,
            tuple,
            bool,
            int,
            float
        )
    ):

        if isinstance(
            value,
            tuple
        ):

            return list(value)

        return value

    text = str(
        value
    ).strip()

    if not text:
        return ""

    # --------------------------------------------------------
    # JSON
    # --------------------------------------------------------

    try:

        return json.loads(
            text
        )

    except Exception:
        pass

    # --------------------------------------------------------
    # Python literal
    # --------------------------------------------------------

    try:

        value = ast.literal_eval(
            text
        )

        if isinstance(
            value,
            tuple
        ):

            return list(value)

        return value

    except Exception:
        pass

    # --------------------------------------------------------
    # Boolean / null
    # --------------------------------------------------------

    lower = text.lower()

    if lower == "true":
        return True

    if lower == "false":
        return False

    if lower in (
        "null",
        "none"
    ):

        return None

    # --------------------------------------------------------
    # Number
    # --------------------------------------------------------

    try:
        return int(text)

    except Exception:
        pass

    try:
        return float(text)

    except Exception:
        pass

    # --------------------------------------------------------
    # String
    # --------------------------------------------------------

    if (
        len(text) >= 2
        and text[0] == text[-1]
        and text[0] in ("'", '"')
    ):

        return text[1:-1]

    return text


# ============================================================
# INPUT PARSER
# ============================================================

def parse_input_string(value):

    if value is None:
        return []

    if isinstance(
        value,
        list
    ):

        return value

    if isinstance(
        value,
        tuple
    ):

        return list(value)

    text = str(
        value
    ).strip()

    if not text:
        return []

    # --------------------------------------------------------
    # Python AST
    #
    # "anagram", "nagaram"
    # becomes:
    #
    # ["anagram", "nagaram"]
    #
    # [2,7,11,15]
    # becomes:
    #
    # [[2,7,11,15]]
    # --------------------------------------------------------

    try:

        tree = ast.parse(
            text,
            mode="eval"
        )

        node = tree.body

        if isinstance(
            node,
            ast.Tuple
        ):

            return [

                ast.literal_eval(
                    element
                )

                for element
                in node.elts

            ]

        return [

            ast.literal_eval(
                node
            )

        ]

    except Exception:

        pass

    # --------------------------------------------------------
    # JSON
    # --------------------------------------------------------

    try:

        value = json.loads(
            text
        )

        return [value]

    except Exception:

        pass

    # --------------------------------------------------------
    # Fallback parser
    # --------------------------------------------------------

    parts = []

    current = ""

    quote = None

    depth = 0

    for char in text:

        if quote:

            current += char

            if char == quote:

                quote = None

            continue

        if char in (
            "'",
            '"'
        ):

            quote = char

            current += char

            continue

        if char in (
            "[",
            "{",
            "("
        ):

            depth += 1

            current += char

            continue

        if char in (
            "]",
            "}",
            ")"
        ):

            depth -= 1

            current += char

            continue

        if (
            char == ","
            and depth == 0
        ):

            parts.append(
                parse_value(
                    current
                )
            )

            current = ""

            continue

        current += char

    if current.strip():

        parts.append(
            parse_value(
                current
            )
        )

    return parts


# ============================================================
# TEST CASE NORMALIZATION
# ============================================================

def normalize_test_case(
    test_case
):

    if not isinstance(
        test_case,
        dict
    ):

        return {

            "input":
                test_case,

            "expected":
                None,

        }

    input_value = (
        test_case.get(
            "input"
        )
    )

    if input_value is None:

        input_value = (
            test_case.get(
                "inputs"
            )
        )

    if input_value is None:

        input_value = (
            test_case.get(
                "test_input"
            )
        )

    if input_value is None:

        input_value = (
            test_case.get(
                "arguments"
            )
        )

    if input_value is None:

        input_value = (
            test_case.get(
                "args"
            )
        )

    expected = (
        test_case.get(
            "output"
        )
    )

    if expected is None:

        expected = (
            test_case.get(
                "expected_output"
            )
        )

    if expected is None:

        expected = (
            test_case.get(
                "expected"
            )
        )

    return {

        "input":
            input_value,

        "expected":
            expected,

    }


# ============================================================
# OUTPUT NORMALIZATION
# ============================================================

def normalize_output(
    value
):

    if isinstance(
        value,
        tuple
    ):

        return [

            normalize_output(
                item
            )

            for item
            in value

        ]

    if isinstance(
        value,
        list
    ):

        return [

            normalize_output(
                item
            )

            for item
            in value

        ]

    if isinstance(
        value,
        dict
    ):

        return {

            str(key):
                normalize_output(
                    item
                )

            for key, item
            in value.items()

        }

    if isinstance(
        value,
        float
    ):

        if math.isclose(
            value,
            round(value),
            abs_tol=1e-12
        ):

            return int(
                round(value)
            )

    return value


# ============================================================
# OUTPUT COMPARISON
# ============================================================

def outputs_match(
    actual,
    expected,
    problem_name=None,
):

    actual = normalize_output(
        parse_value(
            actual
        )
    )

    expected = normalize_output(
        parse_value(
            expected
        )
    )

    # --------------------------------------------------------
    # TWO SUM
    #
    # [0,1] and [1,0]
    # are both valid.
    # --------------------------------------------------------

    if (
        problem_name == "Two Sum"
        and isinstance(actual, list)
        and isinstance(expected, list)
        and len(actual) == 2
        and len(expected) == 2
    ):

        try:

            return (
                sorted(actual)
                ==
                sorted(expected)
            )

        except Exception:

            pass

    # --------------------------------------------------------
    # 3SUM
    #
    # Order of triplets and order inside triplets
    # should not affect correctness.
    # --------------------------------------------------------

    if (
        problem_name == "3Sum"
        and isinstance(actual, list)
        and isinstance(expected, list)
    ):

        try:

            actual_normalized = sorted(
                [
                    sorted(
                        item
                    )
                    for item
                    in actual
                ]
            )

            expected_normalized = sorted(
                [
                    sorted(
                        item
                    )
                    for item
                    in expected
                ]
            )

            return (
                actual_normalized
                ==
                expected_normalized
            )

        except Exception:

            pass

    # --------------------------------------------------------
    # GROUP ANAGRAMS
    # --------------------------------------------------------

    if (
        problem_name == "Group Anagrams"
        and isinstance(actual, list)
        and isinstance(expected, list)
    ):

        try:

            actual_normalized = sorted(
                [
                    sorted(
                        group
                    )
                    for group
                    in actual
                ]
            )

            expected_normalized = sorted(
                [
                    sorted(
                        group
                    )
                    for group
                    in expected
                ]
            )

            return (
                actual_normalized
                ==
                expected_normalized
            )

        except Exception:

            pass

    return (
        actual
        ==
        expected
    )


# ============================================================
# PYTHON EXECUTION
# ============================================================

def execute_python(
    code,
    function_name,
    test_input,
    expected_output,
    timeout=EXECUTION_TIMEOUT,
):

    start = time.perf_counter()

    try:

        args = parse_input_string(
            test_input
        )

        runner = f"""
import json
import traceback

try:

    _ascendra_args = {repr(args)}

    if "Solution" in globals():

        _ascendra_solution = Solution()

        _ascendra_function = getattr(
            _ascendra_solution,
            {function_name!r}
        )

    else:

        _ascendra_function = globals()[
            {function_name!r}
        ]

    _ascendra_answer = _ascendra_function(
        *_ascendra_args
    )

    print(
        "__ASCENDRA_OUTPUT__"
        +
        json.dumps(
            _ascendra_answer,
            separators=(",", ":"),
            default=list
        )
    )

except Exception as _ascendra_error:

    print(
        "__ASCENDRA_ERROR__"
        +
        str(_ascendra_error)
    )
"""

        with tempfile.TemporaryDirectory(
            prefix="ascendra_python_"
        ) as temp_dir:

            solution_file = (
                Path(temp_dir)
                /
                "solution.py"
            )

            solution_file.write_text(
                code
                +
                "\n\n"
                +
                runner,
                encoding="utf-8"
            )

            process = run_process(

                [
                    sys.executable,
                    str(solution_file)
                ],

                temp_dir,

                timeout

            )

        elapsed = round(

            (
                time.perf_counter()
                -
                start
            )
            * 1000,

            2
        )

        if not process["success"]:

            return make_result(

                status=(

                    "Time Limit Exceeded"

                    if
                    "Time Limit Exceeded"
                    in
                    process["stderr"]

                    else

                    "Runtime Error"
                ),

                error=(

                    process["stderr"]
                    or
                    process["stdout"]
                ),

                execution_time=
                    elapsed
            )

        stdout = (
            process["stdout"]
            .strip()
        )

        if (
            "__ASCENDRA_ERROR__"
            in
            stdout
        ):

            return make_result(

                status=
                    "Runtime Error",

                error=
                    stdout.split(
                        "__ASCENDRA_ERROR__",
                        1
                    )[1].strip(),

                execution_time=
                    elapsed
            )

        marker = (
            "__ASCENDRA_OUTPUT__"
        )

        if marker not in stdout:

            return make_result(

                status=
                    "Runtime Error",

                error=
                    "No output produced.",

                execution_time=
                    elapsed
            )

        actual_text = stdout.split(
            marker,
            1
        )[1].strip()

        actual = parse_value(
            actual_text
        )

        expected = normalize_output(
            parse_value(
                expected_output
            )
        )

        problem_name = (
            FUNCTION_TO_PROBLEM.get(
                function_name
            )
        )

        passed = outputs_match(

            actual,

            expected,

            problem_name
        )

        return make_result(

            passed=
                passed,

            status=(

                "Accepted"

                if passed

                else

                "Wrong Answer"
            ),

            output=
                actual,

            expected=
                expected,

            execution_time=
                elapsed
        )

    except subprocess.TimeoutExpired:

        return make_result(

            status=
                "Time Limit Exceeded",

            error=
                f"Execution exceeded {timeout} seconds."
        )

    except Exception as exc:

        return make_result(

            status=
                "Runtime Error",

            error=
                str(exc)
        )


# ============================================================
# JAVA VALUE HELPERS
# ============================================================

def java_literal(
    value
):

    if value is None:

        return "null"

    if isinstance(
        value,
        bool
    ):

        return (
            "true"
            if value
            else
            "false"
        )

    if isinstance(
        value,
        str
    ):

        return json.dumps(
            value
        )

    if isinstance(
        value,
        int
    ):

        return str(
            value
        )

    if isinstance(
        value,
        float
    ):

        return repr(
            value
        )

    if isinstance(
        value,
        list
    ):

        return (
            "new Object[]{"
            +
            ", ".join(
                java_literal(
                    item
                )
                for item
                in value
            )
            +
            "}"
        )

    return "null"


def java_int_array(
    value
):

    return (

        "new int[]{"

        +
        ", ".join(
            str(
                int(item)
            )
            for item
            in value
        )

        +
        "}"

    )


def java_string_array(
    value
):

    return (

        "new String[]{"

        +
        ", ".join(
            java_literal(
                str(item)
            )
            for item
            in value
        )

        +
        "}"

    )


# ============================================================
# JAVA TEST GENERATOR
# ============================================================

def generate_java_call(
    problem_name,
    function_name,
    args,
):

    # --------------------------------------------------------
    # TWO SUM
    # --------------------------------------------------------

    if problem_name == "Two Sum":

        return f"""

int[] nums =
    {java_int_array(args[0])};

int target =
    {int(args[1])};

printJson(
    new Solution().{function_name}(
        nums,
        target
    )
);

"""


    # --------------------------------------------------------
    # VALID ANAGRAM
    # --------------------------------------------------------

    if problem_name == "Valid Anagram":

        return f"""

String s =
    {java_literal(args[0])};

String t =
    {java_literal(args[1])};

printJson(
    new Solution().{function_name}(
        s,
        t
    )
);

"""


    # --------------------------------------------------------
    # REVERSE STRING
    # --------------------------------------------------------

    if problem_name == "Reverse String":

        return f"""

String s =
    {java_literal(args[0])};

printJson(
    new Solution().{function_name}(
        s
    )
);

"""


    # --------------------------------------------------------
    # MAXIMUM ELEMENT
    # --------------------------------------------------------

    if problem_name == "Maximum Element in Array":

        return f"""

int[] nums =
    {java_int_array(args[0])};

printJson(
    new Solution().{function_name}(
        nums
    )
);

"""


    # --------------------------------------------------------
    # CONTAINS DUPLICATE
    # --------------------------------------------------------

    if problem_name == "Contains Duplicate":

        return f"""

int[] nums =
    {java_int_array(args[0])};

printJson(
    new Solution().{function_name}(
        nums
    )
);

"""


    # --------------------------------------------------------
    # VALID PARENTHESES
    # --------------------------------------------------------

    if problem_name == "Valid Parentheses":

        return f"""

String s =
    {java_literal(args[0])};

printJson(
    new Solution().{function_name}(
        s
    )
);

"""


    # --------------------------------------------------------
    # LONGEST SUBSTRING
    # --------------------------------------------------------

    if (
        problem_name
        ==
        "Longest Substring Without Repeating Characters"
    ):

        return f"""

String s =
    {java_literal(args[0])};

printJson(
    new Solution().{function_name}(
        s
    )
);

"""


    # --------------------------------------------------------
    # 3SUM
    # --------------------------------------------------------

    if problem_name == "3Sum":

        return f"""

int[] nums =
    {java_int_array(args[0])};

printJson(
    new Solution().{function_name}(
        nums
    )
);

"""


    # --------------------------------------------------------
    # GROUP ANAGRAMS
    # --------------------------------------------------------

    if problem_name == "Group Anagrams":

        return f"""

String[] strs =
    {java_string_array(args[0])};

printJson(
    new Solution().{function_name}(
        strs
    )
);

"""


    # --------------------------------------------------------
    # PRODUCT EXCEPT SELF
    # --------------------------------------------------------

    if problem_name == "Product of Array Except Self":

        return f"""

int[] nums =
    {java_int_array(args[0])};

printJson(
    new Solution().{function_name}(
        nums
    )
);

"""


    # --------------------------------------------------------
    # BINARY SEARCH
    # --------------------------------------------------------

    if problem_name == "Binary Search":

        return f"""

int[] nums =
    {java_int_array(args[0])};

int target =
    {int(args[1])};

printJson(
    new Solution().{function_name}(
        nums,
        target
    )
);

"""

    return None


# ============================================================
# JAVA WRAPPER
# ============================================================

JAVA_TEMPLATE = r'''
import java.util.*;
import java.lang.reflect.*;

__USER_CODE__

public class Main {

    static String quote(
        String value
    ) {

        return
            "\""
            +
            value
                .replace(
                    "\\",
                    "\\\\"
                )
                .replace(
                    "\"",
                    "\\\""
                )
                .replace(
                    "\n",
                    "\\n"
                )
                .replace(
                    "\r",
                    "\\r"
                )
            +
            "\"";
    }


    static String toJson(
        Object value
    ) {

        if (value == null) {

            return "null";
        }


        if (
            value instanceof String
            ||
            value instanceof Character
        ) {

            return quote(
                String.valueOf(value)
            );
        }


        if (
            value instanceof Boolean
            ||
            value instanceof Number
        ) {

            return String.valueOf(
                value
            );
        }


        Class<?> type =
            value.getClass();


        if (
            type.isArray()
        ) {

            StringBuilder result =
                new StringBuilder();

            result.append("[");


            int length =
                Array.getLength(
                    value
                );


            for (
                int i = 0;
                i < length;
                i++
            ) {

                if (i > 0) {

                    result.append(",");
                }


                result.append(
                    toJson(
                        Array.get(
                            value,
                            i
                        )
                    )
                );
            }


            result.append("]");

            return result.toString();
        }


        if (
            value instanceof Iterable<?>
        ) {

            StringBuilder result =
                new StringBuilder();

            result.append("[");

            boolean first = true;


            for (
                Object item
                :
                (Iterable<?>) value
            ) {

                if (!first) {

                    result.append(",");
                }

                first = false;


                result.append(
                    toJson(
                        item
                    )
                );
            }


            result.append("]");

            return result.toString();
        }


        return quote(
            String.valueOf(
                value
            )
        );
    }


    static void printJson(
        Object value
    ) {

        System.out.println(
            "__ASCENDRA_OUTPUT__"
            +
            toJson(
                value
            )
        );
    }


    public static void main(
        String[] args
    ) {

        try {

            __CALL__

        }

        catch (
            Throwable error
        ) {

            String message =
                error.getMessage();


            if (
                message == null
            ) {

                message =
                    error
                        .getClass()
                        .getSimpleName();
            }


            System.out.println(
                "__ASCENDRA_ERROR__"
                +
                message
            );
        }
    }
}
'''


# ============================================================
# JAVA EXECUTION
# ============================================================

def execute_java(
    code,
    function_name,
    test_input,
    expected_output,
    timeout=EXECUTION_TIMEOUT,
):

    start = time.perf_counter()

    if shutil.which(
        "javac"
    ) is None:

        return make_result(

            status=
                "Compilation Error",

            error=
                "javac was not found in PATH. "
                "Install a Java JDK and add its bin "
                "directory to PATH."
        )

    if shutil.which(
        "java"
    ) is None:

        return make_result(

            status=
                "Runtime Error",

            error=
                "java was not found in PATH. "
                "Install a Java JDK and add its bin "
                "directory to PATH."
        )

    try:

        problem_name = (
            FUNCTION_TO_PROBLEM.get(
                function_name
            )
        )

        args = parse_input_string(
            test_input
        )

        call = generate_java_call(

            problem_name,

            function_name,

            args
        )

        if call is None:

            return make_result(

                status=
                    "Unsupported Problem",

                error=
                    (
                        "Java executor is not configured "
                        f"for {problem_name}."
                    )
            )

        wrapper = (
            JAVA_TEMPLATE
            .replace(
                "__USER_CODE__",
                code
            )
            .replace(
                "__CALL__",
                call
            )
        )

        with tempfile.TemporaryDirectory(
            prefix="ascendra_java_"
        ) as temp_dir:

            java_file = (
                Path(temp_dir)
                /
                "Main.java"
            )

            java_file.write_text(
                wrapper,
                encoding="utf-8"
            )

            compile_result = run_process(

                [
                    "javac",
                    str(java_file)
                ],

                temp_dir,

                timeout
            )

            if not compile_result["success"]:

                elapsed = round(

                    (
                        time.perf_counter()
                        -
                        start
                    )
                    * 1000,

                    2
                )

                return make_result(

                    status=
                        "Compilation Error",

                    error=(

                        compile_result["stderr"]
                        or
                        compile_result["stdout"]
                    ),

                    execution_time=
                        elapsed
                )

            run_result = run_process(

                [
                    "java",
                    "-cp",
                    temp_dir,
                    "Main"
                ],

                temp_dir,

                timeout
            )

        elapsed = round(

            (
                time.perf_counter()
                -
                start
            )
            * 1000,

            2
        )

        if not run_result["success"]:

            return make_result(

                status=(

                    "Time Limit Exceeded"

                    if
                    "Time Limit Exceeded"
                    in
                    run_result["stderr"]

                    else

                    "Runtime Error"
                ),

                error=(

                    run_result["stderr"]
                    or
                    run_result["stdout"]
                ),

                execution_time=
                    elapsed
            )

        stdout = (
            run_result["stdout"]
            .strip()
        )

        if (
            "__ASCENDRA_ERROR__"
            in
            stdout
        ):

            return make_result(

                status=
                    "Runtime Error",

                error=
                    stdout.split(
                        "__ASCENDRA_ERROR__",
                        1
                    )[1].strip(),

                execution_time=
                    elapsed
            )

        marker = (
            "__ASCENDRA_OUTPUT__"
        )

        if marker not in stdout:

            return make_result(

                status=
                    "Runtime Error",

                error=
                    "No output produced by Java program.",

                execution_time=
                    elapsed
            )

        actual_text = stdout.split(
            marker,
            1
        )[1].strip()

        actual = parse_value(
            actual_text
        )

        expected = normalize_output(
            parse_value(
                expected_output
            )
        )

        passed = outputs_match(

            actual,

            expected,

            problem_name
        )

        return make_result(

            passed=
                passed,

            status=(

                "Accepted"

                if passed

                else

                "Wrong Answer"
            ),

            output=
                actual,

            expected=
                expected,

            execution_time=
                elapsed
        )

    except subprocess.TimeoutExpired:

        return make_result(

            status=
                "Time Limit Exceeded",

            error=
                f"Execution exceeded {timeout} seconds."
        )

    except Exception as exc:

        return make_result(

            status=
                "Runtime Error",

            error=
                str(exc)
        )


# ============================================================
# C++ VALUE HELPERS
# ============================================================

def cpp_int_vector(
    value
):

    return (

        "vector<int>{"

        +
        ", ".join(

            str(
                int(item)
            )

            for item
            in value

        )

        +
        "}"

    )


def cpp_string(
    value
):

    return json.dumps(
        str(value)
    )


# ============================================================
# C++ TEST GENERATOR
# ============================================================

def generate_cpp_call(
    problem_name,
    function_name,
    args,
):

    # --------------------------------------------------------
    # TWO SUM
    #
    # IMPORTANT:
    #
    # vector<int>& requires an lvalue.
    #
    # We therefore create:
    #
    # vector<int> nums = {...};
    #
    # and pass nums.
    #
    # NOT:
    #
    # twoSum(vector<int>{...}, target)
    # --------------------------------------------------------

    if problem_name == "Two Sum":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

int target =
    {int(args[1])};

auto answer =
    solution.{function_name}(
        nums,
        target
    );

"""


    # --------------------------------------------------------
    # VALID ANAGRAM
    # --------------------------------------------------------

    if problem_name == "Valid Anagram":

        return f"""

string s =
    {cpp_string(args[0])};

string t =
    {cpp_string(args[1])};

auto answer =
    solution.{function_name}(
        s,
        t
    );

"""


    # --------------------------------------------------------
    # REVERSE STRING
    # --------------------------------------------------------

    if problem_name == "Reverse String":

        return f"""

string s =
    {cpp_string(args[0])};

auto answer =
    solution.{function_name}(
        s
    );

"""


    # --------------------------------------------------------
    # MAXIMUM ELEMENT
    # --------------------------------------------------------

    if problem_name == "Maximum Element in Array":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

auto answer =
    solution.{function_name}(
        nums
    );

"""


    # --------------------------------------------------------
    # CONTAINS DUPLICATE
    # --------------------------------------------------------

    if problem_name == "Contains Duplicate":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

auto answer =
    solution.{function_name}(
        nums
    );

"""


    # --------------------------------------------------------
    # VALID PARENTHESES
    # --------------------------------------------------------

    if problem_name == "Valid Parentheses":

        return f"""

string s =
    {cpp_string(args[0])};

auto answer =
    solution.{function_name}(
        s
    );

"""


    # --------------------------------------------------------
    # LONGEST SUBSTRING
    # --------------------------------------------------------

    if (
        problem_name
        ==
        "Longest Substring Without Repeating Characters"
    ):

        return f"""

string s =
    {cpp_string(args[0])};

auto answer =
    solution.{function_name}(
        s
    );

"""


    # --------------------------------------------------------
    # 3SUM
    # --------------------------------------------------------

    if problem_name == "3Sum":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

auto answer =
    solution.{function_name}(
        nums
    );

"""


    # --------------------------------------------------------
    # GROUP ANAGRAMS
    # --------------------------------------------------------

    if problem_name == "Group Anagrams":

        values = ", ".join(

            cpp_string(
                item
            )

            for item
            in args[0]

        )

        return f"""

vector<string> strs = {{
    {values}
}};

auto answer =
    solution.{function_name}(
        strs
    );

"""


    # --------------------------------------------------------
    # PRODUCT EXCEPT SELF
    # --------------------------------------------------------

    if problem_name == "Product of Array Except Self":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

auto answer =
    solution.{function_name}(
        nums
    );

"""


    # --------------------------------------------------------
    # BINARY SEARCH
    # --------------------------------------------------------

    if problem_name == "Binary Search":

        return f"""

vector<int> nums =
    {cpp_int_vector(args[0])};

int target =
    {int(args[1])};

auto answer =
    solution.{function_name}(
        nums,
        target
    );

"""

    return None


# ============================================================
# C++ WRAPPER
# ============================================================

CPP_TEMPLATE = r'''
#include <bits/stdc++.h>

using namespace std;


__USER_CODE__


// ==========================================================
// JSON SERIALIZATION
// ==========================================================

template <typename T>
string jsonValue(
    const T& value
) {

    if constexpr (
        is_same_v<T, bool>
    ) {

        return value
            ? "true"
            : "false";
    }

    else if constexpr (
        is_arithmetic_v<T>
    ) {

        ostringstream output;

        output
            << setprecision(15)
            << value;

        return output.str();
    }

    else if constexpr (
        is_same_v<T, string>
    ) {

        string output = "\"";

        for (
            char character
            :
            value
        ) {

            if (
                character == '\\'
            ) {

                output += "\\\\";
            }

            else if (
                character == '"'
            ) {

                output += "\\\"";
            }

            else if (
                character == '\n'
            ) {

                output += "\\n";
            }

            else if (
                character == '\r'
            ) {

                output += "\\r";
            }

            else {

                output += character;
            }
        }

        output += "\"";

        return output;
    }

    else {

        return "\"\"";
    }
}


template <typename T>
string jsonValue(
    const vector<T>& values
) {

    string output = "[";


    for (
        size_t i = 0;
        i < values.size();
        i++
    ) {

        if (
            i > 0
        ) {

            output += ",";
        }


        output += jsonValue(
            values[i]
        );
    }


    output += "]";

    return output;
}


// ==========================================================
// MAIN
// ==========================================================

int main() {

    try {

        Solution solution;

        __CALL__

        cout
            << "__ASCENDRA_OUTPUT__"
            << jsonValue(answer)
            << endl;
    }

    catch (
        const exception& error
    ) {

        cout
            << "__ASCENDRA_ERROR__"
            << error.what()
            << endl;
    }

    catch (...) {

        cout
            << "__ASCENDRA_ERROR__"
            << "Unknown Runtime Error"
            << endl;
    }

    return 0;
}
'''


# ============================================================
# C++ EXECUTION
# ============================================================

def execute_cpp(
    code,
    function_name,
    test_input,
    expected_output,
    timeout=EXECUTION_TIMEOUT,
):

    start = time.perf_counter()

    compiler = (
        shutil.which("g++")
        or
        shutil.which("clang++")
    )

    if compiler is None:

        return make_result(

            status=
                "Compilation Error",

            error=
                "Neither g++ nor clang++ "
                "was found in PATH."
        )

    try:

        problem_name = (
            FUNCTION_TO_PROBLEM.get(
                function_name
            )
        )

        args = parse_input_string(
            test_input
        )

        call = generate_cpp_call(

            problem_name,

            function_name,

            args
        )

        if call is None:

            return make_result(

                status=
                    "Unsupported Problem",

                error=
                    (
                        "C++ executor is not configured "
                        f"for {problem_name}."
                    )
            )

        wrapper = (
            CPP_TEMPLATE
            .replace(
                "__USER_CODE__",
                code
            )
            .replace(
                "__CALL__",
                call
            )
        )

        with tempfile.TemporaryDirectory(
            prefix="ascendra_cpp_"
        ) as temp_dir:

            source_file = (
                Path(temp_dir)
                /
                "main.cpp"
            )

            if os.name == "nt":

                executable = (
                    Path(temp_dir)
                    /
                    "solution.exe"
                )

            else:

                executable = (
                    Path(temp_dir)
                    /
                    "solution"
                )

            source_file.write_text(
                wrapper,
                encoding="utf-8"
            )

            compile_result = run_process(

                [

                    compiler,

                    "-std=c++17",

                    "-O2",

                    "-pipe",

                    str(source_file),

                    "-o",

                    str(executable),

                ],

                temp_dir,

                timeout
            )

            if not compile_result["success"]:

                elapsed = round(

                    (
                        time.perf_counter()
                        -
                        start
                    )
                    * 1000,

                    2
                )

                return make_result(

                    status=
                        "Compilation Error",

                    error=(

                        compile_result["stderr"]
                        or
                        compile_result["stdout"]
                        or
                        "Unknown C++ compilation error."
                    ),

                    execution_time=
                        elapsed
                )

            run_result = run_process(

                [
                    str(executable)
                ],

                temp_dir,

                timeout
            )

        elapsed = round(

            (
                time.perf_counter()
                -
                start
            )
            * 1000,

            2
        )

        if not run_result["success"]:

            return make_result(

                status=(

                    "Time Limit Exceeded"

                    if
                    "Time Limit Exceeded"
                    in
                    run_result["stderr"]

                    else

                    "Runtime Error"
                ),

                error=(

                    run_result["stderr"]
                    or
                    run_result["stdout"]
                    or
                    "Unknown C++ runtime error."
                ),

                execution_time=
                    elapsed
            )

        stdout = (
            run_result["stdout"]
            .strip()
        )

        if (
            "__ASCENDRA_ERROR__"
            in
            stdout
        ):

            return make_result(

                status=
                    "Runtime Error",

                error=
                    stdout.split(
                        "__ASCENDRA_ERROR__",
                        1
                    )[1].strip(),

                execution_time=
                    elapsed
            )

        marker = (
            "__ASCENDRA_OUTPUT__"
        )

        if marker not in stdout:

            return make_result(

                status=
                    "Runtime Error",

                error=
                    "No output produced by C++ program.",

                execution_time=
                    elapsed
            )

        actual_text = stdout.split(
            marker,
            1
        )[1].strip()

        actual = parse_value(
            actual_text
        )

        expected = normalize_output(
            parse_value(
                expected_output
            )
        )

        passed = outputs_match(

            actual,

            expected,

            problem_name
        )

        return make_result(

            passed=
                passed,

            status=(

                "Accepted"

                if passed

                else

                "Wrong Answer"
            ),

            output=
                actual,

            expected=
                expected,

            execution_time=
                elapsed
        )

    except subprocess.TimeoutExpired:

        return make_result(

            status=
                "Time Limit Exceeded",

            error=
                f"Execution exceeded {timeout} seconds."
        )

    except Exception as exc:

        return make_result(

            status=
                "Runtime Error",

            error=
                str(exc)
        )


# ============================================================
# UNIVERSAL SINGLE TEST
# ============================================================

def execute_test_case(
    code,
    language,
    function_name,
    test_input,
    expected_output,
    problem_name=None,
    timeout=EXECUTION_TIMEOUT,
):

    language = normalize_language(
        language
    )

    if problem_name is None:

        problem_name = (
            FUNCTION_TO_PROBLEM.get(
                function_name
            )
        )

    if language == "python":

        return execute_python(

            code=
                code,

            function_name=
                function_name,

            test_input=
                test_input,

            expected_output=
                expected_output,

            timeout=
                timeout
        )

    if language == "java":

        return execute_java(

            code=
                code,

            function_name=
                function_name,

            test_input=
                test_input,

            expected_output=
                expected_output,

            timeout=
                timeout
        )

    if language == "cpp":

        return execute_cpp(

            code=
                code,

            function_name=
                function_name,

            test_input=
                test_input,

            expected_output=
                expected_output,

            timeout=
                timeout
        )

    return make_result(

        status=
            "Unsupported Language",

        error=
            f"Unsupported language: {language}"
    )


# ============================================================
# SINGLE TEST
# ============================================================

def run_single_test(
    code,
    language,
    function_name,
    test_case,
    problem_name=None,
    timeout=EXECUTION_TIMEOUT,
):

    normalized = normalize_test_case(
        test_case
    )

    return execute_test_case(

        code=
            code,

        language=
            language,

        function_name=
            function_name,

        test_input=
            normalized["input"],

        expected_output=
            normalized["expected"],

        problem_name=
            problem_name,

        timeout=
            timeout
    )


# ============================================================
# RUN TEST CASES
# ============================================================
#
# IMPORTANT:
#
# This function supports BOTH:
#
# run_test_cases(
#     code,
#     language,
#     function_name,
#     test_cases
# )
#
# AND:
#
# run_test_cases(
#     code=...,
#     language=...,
#     function_name=...,
#     test_cases=...,
#     problem_name=...
# )
#
# No circular imports.
#
# ============================================================

def run_test_cases(
    code,
    language,
    function_name,
    test_cases,
    problem_name=None,
    timeout=EXECUTION_TIMEOUT,
    include_hidden=True,
):

    if not test_cases:

        return []

    # --------------------------------------------------------
    # Dictionary format
    #
    # {
    #   "visible": [...],
    #   "hidden": [...]
    # }
    # --------------------------------------------------------

    if isinstance(
        test_cases,
        dict
    ):

        visible = (
            test_cases.get(
                "visible",
                []
            )
        )

        hidden = (
            test_cases.get(
                "hidden",
                []
            )
        )

        if include_hidden:

            test_cases = (
                list(visible)
                +
                list(hidden)
            )

        else:

            test_cases = list(
                visible
            )

    # --------------------------------------------------------
    # Normal list
    # --------------------------------------------------------

    results = []

    for index, test_case in enumerate(
        test_cases,
        start=1
    ):

        current = run_single_test(

            code=
                code,

            language=
                language,

            function_name=
                function_name,

            test_case=
                test_case,

            problem_name=
                problem_name,

            timeout=
                timeout
        )

        current["test_case"] = (
            index
        )

        results.append(
            current
        )

        # ----------------------------------------------------
        # Stop at first failure.
        # ----------------------------------------------------

        if not current.get(
            "passed",
            False
        ):

            break

    return results


# ============================================================
# SUMMARY
# ============================================================

def summarize_results(
    results
):

    if not results:

        return {

            "passed":
                False,

            "passed_count":
                0,

            "total_count":
                0,

            "status":
                "No Test Cases",

            "results":
                [],

        }

    passed_count = sum(

        1

        for result_item
        in results

        if result_item.get(
            "passed",
            False
        )

    )

    total_count = len(
        results
    )

    all_passed = (
        passed_count
        ==
        total_count
    )

    if all_passed:

        status = "Accepted"

    else:

        status = (
            results[-1].get(
                "status",
                "Wrong Answer"
            )
        )

    return {

        "passed":
            all_passed,

        "passed_count":
            passed_count,

        "total_count":
            total_count,

        "status":
            status,

        "results":
            results,

    }


# ============================================================
# UNIVERSAL EXECUTE API
# ============================================================

def execute_code(
    language,
    code,
    function_name,
    test_input,
    expected_output,
    timeout=EXECUTION_TIMEOUT,
):

    language = validate_language(
        language
    )

    if not code or not code.strip():

        return make_result(

            status=
                "Runtime Error",

            error=
                "No code submitted."
        )

    return execute_test_case(

        code=
            code,

        language=
            language,

        function_name=
            function_name,

        test_input=
            test_input,

        expected_output=
            expected_output,

        timeout=
            timeout
    )


# ============================================================
# LEGACY COMPATIBILITY
# ============================================================

def execute_code_legacy(
    language,
    code,
    driver,
):

    return execute_code(

        language=
            language,

        code=
            code,

        function_name=
            "solve",

        test_input=
            [],

        expected_output=
            "",

    )