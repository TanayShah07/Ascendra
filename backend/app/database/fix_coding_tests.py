import json

from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.coding_problem import CodingProblem


# =========================================================
# ASCENDRA CODING TEST CASE FIXER
#
# Every problem:
#   2 visible test cases
#   2 hidden test cases
#
# Existing descriptions, examples, hints, constraints,
# boilerplates and solutions are NOT modified.
# =========================================================


TEST_CASES = {

    # =====================================================
    # 1. TWO SUM
    # =====================================================

    "Two Sum": {
        "visible": [
            {
                "input": "[2,7,11,15], 9",
                "output": "[0,1]"
            },
            {
                "input": "[3,2,4], 6",
                "output": "[1,2]"
            }
        ],
        "hidden": [
            {
                "input": "[3,3], 6",
                "output": "[0,1]"
            },
            {
                "input": "[-3,4,3,90], 0",
                "output": "[0,2]"
            }
        ]
    },


    # =====================================================
    # 2. VALID ANAGRAM
    # =====================================================

    "Valid Anagram": {
        "visible": [
            {
                "input": '"anagram", "nagaram"',
                "output": "true"
            },
            {
                "input": '"rat", "car"',
                "output": "false"
            }
        ],
        "hidden": [
            {
                "input": '"listen", "silent"',
                "output": "true"
            },
            {
                "input": '"hello", "world"',
                "output": "false"
            }
        ]
    },


    # =====================================================
    # 3. REVERSE STRING
    # =====================================================

    "Reverse String": {
        "visible": [
            {
                "input": '"hello"',
                "output": '"olleh"'
            },
            {
                "input": '"world"',
                "output": '"dlrow"'
            }
        ],
        "hidden": [
            {
                "input": '"a"',
                "output": '"a"'
            },
            {
                "input": '"Ascendra"',
                "output": '"ardnecsA"'
            }
        ]
    },


    # =====================================================
    # 4. MAXIMUM ELEMENT
    # =====================================================

    "Maximum Element in Array": {
        "visible": [
            {
                "input": "[3,1,5,2,4]",
                "output": "5"
            },
            {
                "input": "[-10,-3,-7,-1]",
                "output": "-1"
            }
        ],
        "hidden": [
            {
                "input": "[42]",
                "output": "42"
            },
            {
                "input": "[100,99,101,50,101]",
                "output": "101"
            }
        ]
    },


    # =====================================================
    # 5. CONTAINS DUPLICATE
    # =====================================================

    "Contains Duplicate": {
        "visible": [
            {
                "input": "[1,2,3,1]",
                "output": "true"
            },
            {
                "input": "[1,2,3,4]",
                "output": "false"
            }
        ],
        "hidden": [
            {
                "input": "[1,1]",
                "output": "true"
            },
            {
                "input": "[-1,-2,-3,-4,-5]",
                "output": "false"
            }
        ]
    },


    # =====================================================
    # 6. VALID PARENTHESES
    # =====================================================

    "Valid Parentheses": {
        "visible": [
            {
                "input": '"()"',
                "output": "true"
            },
            {
                "input": '"()[]{}"',
                "output": "true"
            }
        ],
        "hidden": [
            {
                "input": '"(]"',
                "output": "false"
            },
            {
                "input": '"([{}])"',
                "output": "true"
            }
        ]
    },


    # =====================================================
    # 7. LONGEST SUBSTRING
    # =====================================================

    "Longest Substring Without Repeating Characters": {
        "visible": [
            {
                "input": '"abcabcbb"',
                "output": "3"
            },
            {
                "input": '"bbbbb"',
                "output": "1"
            }
        ],
        "hidden": [
            {
                "input": '"pwwkew"',
                "output": "3"
            },
            {
                "input": '""',
                "output": "0"
            }
        ]
    },


    # =====================================================
    # 8. 3SUM
    # =====================================================

    "3Sum": {
        "visible": [
            {
                "input": "[-1,0,1,2,-1,-4]",
                "output": "[[-1,-1,2],[-1,0,1]]"
            },
            {
                "input": "[0,1,1]",
                "output": "[]"
            }
        ],
        "hidden": [
            {
                "input": "[0,0,0]",
                "output": "[[0,0,0]]"
            },
            {
                "input": "[-2,0,1,1,2]",
                "output": "[[-2,0,2],[-2,1,1]]"
            }
        ]
    },


    # =====================================================
    # 9. GROUP ANAGRAMS
    # =====================================================

    "Group Anagrams": {
        "visible": [
            {
                "input": '["eat","tea","tan","ate","nat","bat"]',
                "output": '[["eat","tea","ate"],["tan","nat"],["bat"]]'
            },
            {
                "input": '[""]',
                "output": '[[""]]'
            }
        ],
        "hidden": [
            {
                "input": '["a"]',
                "output": '[["a"]]'
            },
            {
                "input": '["abc","bca","cab","xyz","zyx"]',
                "output": '[["abc","bca","cab"],["xyz","zyx"]]'
            }
        ]
    },


    # =====================================================
    # 10. PRODUCT EXCEPT SELF
    # =====================================================

    "Product of Array Except Self": {
        "visible": [
            {
                "input": "[1,2,3,4]",
                "output": "[24,12,8,6]"
            },
            {
                "input": "[-1,1,0,-3,3]",
                "output": "[0,0,9,0,0]"
            }
        ],
        "hidden": [
            {
                "input": "[2,3]",
                "output": "[3,2]"
            },
            {
                "input": "[1,1,1,1]",
                "output": "[1,1,1,1]"
            }
        ]
    },


    # =====================================================
    # 11. BINARY SEARCH
    # =====================================================

    "Binary Search": {
        "visible": [
            {
                "input": "[-1,0,3,5,9,12], 9",
                "output": "4"
            },
            {
                "input": "[-1,0,3,5,9,12], 2",
                "output": "-1"
            }
        ],
        "hidden": [
            {
                "input": "[5], 5",
                "output": "0"
            },
            {
                "input": "[1,3,5,7,9], 7",
                "output": "3"
            }
        ]
    },


    # =====================================================
    # 12. MERGE INTERVALS
    # =====================================================

    "Merge Intervals": {
        "visible": [
            {
                "input": "[[1,3],[2,6],[8,10],[15,18]]",
                "output": "[[1,6],[8,10],[15,18]]"
            },
            {
                "input": "[[1,4],[4,5]]",
                "output": "[[1,5]]"
            }
        ],
        "hidden": [
            {
                "input": "[[1,4],[0,2],[3,5]]",
                "output": "[[0,5]]"
            },
            {
                "input": "[[1,2]]",
                "output": "[[1,2]]"
            }
        ]
    },


    # =====================================================
    # 13. MERGE K SORTED LISTS
    # =====================================================

    "Merge K Sorted Lists": {
        "visible": [
            {
                "input": "[[1,4,5],[1,3,4],[2,6]]",
                "output": "[1,1,2,3,4,4,5,6]"
            },
            {
                "input": "[]",
                "output": "[]"
            }
        ],
        "hidden": [
            {
                "input": "[[],[1]]",
                "output": "[1]"
            },
            {
                "input": "[[1,2],[3,4],[0,5]]",
                "output": "[0,1,2,3,4,5]"
            }
        ]
    },


    # =====================================================
    # 14. TRAPPING RAIN WATER
    # =====================================================

    "Trapping Rain Water": {
        "visible": [
            {
                "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
                "output": "6"
            },
            {
                "input": "[4,2,0,3,2,5]",
                "output": "9"
            }
        ],
        "hidden": [
            {
                "input": "[1,0,1]",
                "output": "1"
            },
            {
                "input": "[3,3,3,3]",
                "output": "0"
            }
        ]
    },


    # =====================================================
    # 15. WORD LADDER
    # =====================================================

    "Word Ladder": {
        "visible": [
            {
                "input": '"hit", "cog", ["hot","dot","dog","lot","log","cog"]',
                "output": "5"
            },
            {
                "input": '"hit", "cog", ["hot","dot","dog","lot","log"]',
                "output": "0"
            }
        ],
        "hidden": [
            {
                "input": '"a", "c", ["a","b","c"]',
                "output": "2"
            },
            {
                "input": '"hot", "dog", ["hot","dog"]',
                "output": "0"
            }
        ]
    },


    # =====================================================
    # 16. LONGEST INCREASING SUBSEQUENCE
    # =====================================================

    "Longest Increasing Subsequence": {
        "visible": [
            {
                "input": "[10,9,2,5,3,7,101,18]",
                "output": "4"
            },
            {
                "input": "[0,1,0,3,2,3]",
                "output": "4"
            }
        ],
        "hidden": [
            {
                "input": "[7,7,7,7,7]",
                "output": "1"
            },
            {
                "input": "[1,2,3,4,5]",
                "output": "5"
            }
        ]
    },


    # =====================================================
    # 17. EDIT DISTANCE
    # =====================================================

    "Edit Distance": {
        "visible": [
            {
                "input": '"horse", "ros"',
                "output": "3"
            },
            {
                "input": '"intention", "execution"',
                "output": "5"
            }
        ],
        "hidden": [
            {
                "input": '"", "abc"',
                "output": "3"
            },
            {
                "input": '"abc", "abc"',
                "output": "0"
            }
        ]
    },


    # =====================================================
    # 18. SERIALIZE / DESERIALIZE TREE
    # =====================================================

    "Serialize and Deserialize Binary Tree": {
        "visible": [
            {
                "input": "[1,2,3,null,null,4,5]",
                "output": "[1,2,3,null,null,4,5]"
            },
            {
                "input": "[]",
                "output": "[]"
            }
        ],
        "hidden": [
            {
                "input": "[1]",
                "output": "[1]"
            },
            {
                "input": "[1,2,3]",
                "output": "[1,2,3]"
            }
        ]
    },


    # =====================================================
    # 19. FIZZ BUZZ
    # =====================================================

    "Fizz Buzz": {
        "visible": [
            {
                "input": "3",
                "output": '["1","2","Fizz"]'
            },
            {
                "input": "5",
                "output": '["1","2","Fizz","4","Buzz"]'
            }
        ],
        "hidden": [
            {
                "input": "1",
                "output": '["1"]'
            },
            {
                "input": "15",
                "output": '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]'
            }
        ]
    },


    # =====================================================
    # 20. MOVE ZEROES
    # =====================================================

    "Move Zeroes": {
        "visible": [
            {
                "input": "[0,1,0,3,12]",
                "output": "[1,3,12,0,0]"
            },
            {
                "input": "[0]",
                "output": "[0]"
            }
        ],
        "hidden": [
            {
                "input": "[1,2,3]",
                "output": "[1,2,3]"
            },
            {
                "input": "[0,0,1]",
                "output": "[1,0,0]"
            }
        ]
    },


    # =====================================================
    # 21. BEST TIME TO BUY AND SELL STOCK
    # =====================================================

    "Best Time to Buy and Sell Stock": {
        "visible": [
            {
                "input": "[7,1,5,3,6,4]",
                "output": "5"
            },
            {
                "input": "[7,6,4,3,1]",
                "output": "0"
            }
        ],
        "hidden": [
            {
                "input": "[1,2]",
                "output": "1"
            },
            {
                "input": "[2,4,1]",
                "output": "2"
            }
        ]
    },


    # =====================================================
    # 22. PALINDROME NUMBER
    # =====================================================

    "Palindrome Number": {
        "visible": [
            {
                "input": "121",
                "output": "true"
            },
            {
                "input": "-121",
                "output": "false"
            }
        ],
        "hidden": [
            {
                "input": "10",
                "output": "false"
            },
            {
                "input": "0",
                "output": "true"
            }
        ]
    },


    # =====================================================
    # 23. SUBARRAY SUM EQUALS K
    # =====================================================

    "Subarray Sum Equals K": {
        "visible": [
            {
                "input": "[1,1,1], 2",
                "output": "2"
            },
            {
                "input": "[1,2,3], 3",
                "output": "2"
            }
        ],
        "hidden": [
            {
                "input": "[1,-1,0], 0",
                "output": "3"
            },
            {
                "input": "[3,4,7,2,-3,1,4,2], 7",
                "output": "4"
            }
        ]
    },


    # =====================================================
    # 24. TOP K FREQUENT
    # =====================================================

    "Top K Frequent Elements": {
        "visible": [
            {
                "input": "[1,1,1,2,2,3], 2",
                "output": "[1,2]"
            },
            {
                "input": "[1], 1",
                "output": "[1]"
            }
        ],
        "hidden": [
            {
                "input": "[4,4,4,5,5,6], 2",
                "output": "[4,5]"
            },
            {
                "input": "[1,2,2,3,3,3], 1",
                "output": "[3]"
            }
        ]
    },


    # =====================================================
    # 25. NUMBER OF ISLANDS
    # =====================================================

    "Number of Islands": {
        "visible": [
            {
                "input": '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
                "output": "1"
            },
            {
                "input": '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
                "output": "3"
            }
        ],
        "hidden": [
            {
                "input": '[["0","0"],["0","0"]]',
                "output": "0"
            },
            {
                "input": '[["1"]]',
                "output": "1"
            }
        ]
    },


    # =====================================================
    # 26. COURSE SCHEDULE
    # =====================================================

    "Course Schedule": {
        "visible": [
            {
                "input": '2, [[1,0]]',
                "output": "true"
            },
            {
                "input": '2, [[1,0],[0,1]]',
                "output": "false"
            }
        ],
        "hidden": [
            {
                "input": '3, [[1,0],[2,1]]',
                "output": "true"
            },
            {
                "input": '3, [[1,0],[2,0],[0,2]]',
                "output": "false"
            }
        ]
    },


    # =====================================================
    # 27. LRU CACHE
    # =====================================================

    "LRU Cache": {
        "visible": [
            {
                "input": '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
                "output": '[null,null,null,1,null,-1,null,-1,3,4]'
            },
            {
                "input": '["LRUCache","put","get"], [[1],[1,10],[1]]',
                "output": '[null,null,10]'
            }
        ],
        "hidden": [
            {
                "input": '["LRUCache","put","put","get"], [[1],[1,1],[2,2],[1]]',
                "output": '[null,null,null,-1]'
            },
            {
                "input": '["LRUCache","put","put","get","get"], [[2],[1,1],[2,2],[1],[2]]',
                "output": '[null,null,null,-1,2]'
            }
        ]
    },


    # =====================================================
    # 28. COIN CHANGE
    # =====================================================

    "Coin Change": {
        "visible": [
            {
                "input": "[1,2,5], 11",
                "output": "3"
            },
            {
                "input": "[2], 3",
                "output": "-1"
            }
        ],
        "hidden": [
            {
                "input": "[1], 0",
                "output": "0"
            },
            {
                "input": "[1,3,4,5], 7",
                "output": "2"
            }
        ]
    },


    # =====================================================
    # 29. MEDIAN OF TWO SORTED ARRAYS
    # =====================================================

    "Median of Two Sorted Arrays": {
        "visible": [
            {
                "input": "[1,3], [2]",
                "output": "2.0"
            },
            {
                "input": "[1,2], [3,4]",
                "output": "2.5"
            }
        ],
        "hidden": [
            {
                "input": "[0,0], [0,0]",
                "output": "0.0"
            },
            {
                "input": "[], [1]",
                "output": "1.0"
            }
        ]
    },


    # =====================================================
    # 30. MAXIMUM PATH SUM
    # =====================================================

    "Maximum Path Sum in Binary Tree": {
        "visible": [
            {
                "input": "[1,2,3]",
                "output": "6"
            },
            {
                "input": "[-10,9,20,null,null,15,7]",
                "output": "42"
            }
        ],
        "hidden": [
            {
                "input": "[1]",
                "output": "1"
            },
            {
                "input": "[-3]",
                "output": "-3"
            }
        ]
    },


    # =====================================================
    # 31. REGULAR EXPRESSION MATCHING
    # =====================================================

    "Regular Expression Matching": {
        "visible": [
            {
                "input": '"aa", "a"',
                "output": "false"
            },
            {
                "input": '"aa", "a*"',
                "output": "true"
            }
        ],
        "hidden": [
            {
                "input": '"ab", ".*"',
                "output": "true"
            },
            {
                "input": '"mississippi", "mis*is*p*."',
                "output": "false"
            }
        ]
    },


    # =====================================================
    # 32. WORD SEARCH
    # =====================================================

    "Word Search": {
        "visible": [
            {
                "input": '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"',
                "output": "true"
            },
            {
                "input": '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"',
                "output": "true"
            }
        ],
        "hidden": [
            {
                "input": '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"',
                "output": "false"
            },
            {
                "input": '[["A"]], "B"',
                "output": "false"
            }
        ]
    },

}


# =========================================================
# NORMALIZE TEST CASE
# =========================================================

def normalize_test_case(test_case):

    return {
        "input": str(
            test_case.get(
                "input",
                ""
            )
        ),

        "output": str(
            test_case.get(
                "output",
                ""
            )
        )
    }


# =========================================================
# UPDATE ONE PROBLEM
# =========================================================

def update_problem(
    problem,
    test_data
):

    visible = [
        normalize_test_case(x)
        for x in test_data["visible"]
    ]

    hidden = [
        normalize_test_case(x)
        for x in test_data["hidden"]
    ]

    if len(visible) != 2:
        raise ValueError(
            f"{problem.title}: visible tests != 2"
        )

    if len(hidden) != 2:
        raise ValueError(
            f"{problem.title}: hidden tests != 2"
        )

    problem.test_cases = json.dumps(
        {
            "visible": visible,
            "hidden": hidden
        }
    )

    problem.hidden_test_cases = json.dumps(
        {
            "hidden": hidden
        }
    )


# =========================================================
# MAIN
# =========================================================

def fix_coding_tests():

    db: Session = SessionLocal()

    updated = 0
    missing = 0

    try:

        problems = (
            db.query(
                CodingProblem
            )
            .filter(
                CodingProblem.is_active == True
            )
            .all()
        )

        print(
            f"Found {len(problems)} active coding problems."
        )

        for problem in problems:

            title = problem.title

            test_data = (
                TEST_CASES.get(title)
            )

            if not test_data:

                print(
                    f"WARNING: No test dataset for: {title}"
                )

                missing += 1

                continue

            update_problem(
                problem,
                test_data
            )

            updated += 1

            print(
                f"Updated: {title}"
            )

        db.commit()

        print()
        print(
            "=========================================="
        )

        print(
            f"Updated {updated} coding problems."
        )

        print(
            f"Missing {missing} coding problems."
        )

        print(
            "Every updated problem has:"
        )

        print(
            "  2 visible test cases"
        )

        print(
            "  2 hidden test cases"
        )

        print(
            "  4 total test cases"
        )

        print(
            "=========================================="
        )

    except Exception:

        db.rollback()

        raise

    finally:

        db.close()


if __name__ == "__main__":

    fix_coding_tests()