PROBLEM_REGISTRY = {

    "Two Sum": {
        "python": "twoSum",
        "java": "twoSum",
        "cpp": "twoSum",
    },

    "Valid Anagram": {
        "python": "isAnagram",
        "java": "isAnagram",
        "cpp": "isAnagram",
    },

    "Reverse String": {
        "python": "reverseString",
        "java": "reverseString",
        "cpp": "reverseString",
    },

    "Maximum Element in Array": {
        "python": "findMax",
        "java": "findMax",
        "cpp": "findMax",
    },

    "Contains Duplicate": {
        "python": "containsDuplicate",
        "java": "containsDuplicate",
        "cpp": "containsDuplicate",
    },

    "Valid Parentheses": {
        "python": "isValid",
        "java": "isValid",
        "cpp": "isValid",
    },

    "Longest Substring Without Repeating Characters": {
        "python": "lengthOfLongestSubstring",
        "java": "lengthOfLongestSubstring",
        "cpp": "lengthOfLongestSubstring",
    },

    "3Sum": {
        "python": "threeSum",
        "java": "threeSum",
        "cpp": "threeSum",
    },

    "Group Anagrams": {
        "python": "groupAnagrams",
        "java": "groupAnagrams",
        "cpp": "groupAnagrams",
    },

    "Product of Array Except Self": {
        "python": "productExceptSelf",
        "java": "productExceptSelf",
        "cpp": "productExceptSelf",
    },

    "Binary Search": {
        "python": "search",
        "java": "search",
        "cpp": "search",
    },

    "Merge K Sorted Lists": {
        "python": "mergeKLists",
        "java": "mergeKLists",
        "cpp": "mergeKLists",
    },

    "Median of Two Sorted Arrays": {
        "python": "findMedianSortedArrays",
        "java": "findMedianSortedArrays",
        "cpp": "findMedianSortedArrays",
    },
}


def get_function_name(
    problem_title,
    language
):

    problem = PROBLEM_REGISTRY.get(
        problem_title
    )

    if not problem:
        return None

    return problem.get(
        normalize_registry_language(
            language
        )
    )


def normalize_registry_language(
    language
):

    if not language:
        return "python"

    language = (
        str(language)
        .lower()
        .strip()
    )

    aliases = {
        "py": "python",
        "python3": "python",
        "c++": "cpp",
        "cc": "cpp",
        "cplusplus": "cpp",
    }

    return aliases.get(
        language,
        language
    )