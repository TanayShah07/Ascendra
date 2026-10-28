from app.services.coding_executor import (
    run_test_cases,
    summarize_results
)

from app.services.coding_registry import (
    get_function_name
)


def run_visible_tests(
    problem,
    code,
    language
):

    function_name = get_function_name(
        problem.title,
        language
    )

    if not function_name:

        return {
            "status": "Unsupported Problem",
            "passed": False,
            "results": []
        }

    test_cases = problem.test_cases

    if isinstance(test_cases, str):
        import json
        test_cases = json.loads(test_cases)

    results = run_test_cases(
        code=code,
        language=language,
        function_name=function_name,
        test_cases=test_cases
    )

    return summarize_results(results)