from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.coding_problem import CodingProblem

import json


# =========================================================
# CODING PROBLEM DATASET — 33 PROBLEMS
# =========================================================

QUESTIONS = [{'title': 'Two Sum',
  'description': 'Given an array of integers nums and an integer target, return the indices of the '
                 'two numbers such that they add up to target.',
  'difficulty': 'Easy',
  'topic': 'Arrays',
  'company': None,
  'starter_code': 'def two_sum(nums, target):\n    # Write your solution here\n    pass',
  'expected_output': 'Indices of the two numbers whose sum equals target.',
  'time_limit': 15,
  'xp': 25},
 {'title': 'Valid Anagram',
  'description': 'Given two strings s and t, determine whether t is an anagram of s.',
  'difficulty': 'Easy',
  'topic': 'Hashing',
  'company': None,
  'starter_code': 'def is_anagram(s, t):\n    # Write your solution here\n    pass',
  'expected_output': 'True if t is an anagram of s, otherwise False.',
  'time_limit': 15,
  'xp': 25},
 {'title': 'Reverse String',
  'description': 'Given a string, return the string reversed.',
  'difficulty': 'Easy',
  'topic': 'Strings',
  'company': None,
  'starter_code': 'def reverse_string(s):\n    # Write your solution here\n    pass',
  'expected_output': 'The reversed string.',
  'time_limit': 10,
  'xp': 20},
 {'title': 'Maximum Element in Array',
  'description': 'Given an integer array, find and return the largest element.',
  'difficulty': 'Easy',
  'topic': 'Arrays',
  'company': None,
  'starter_code': 'def find_max(nums):\n    # Write your solution here\n    pass',
  'expected_output': 'The maximum value in the array.',
  'time_limit': 10,
  'xp': 20},
 {'title': 'Contains Duplicate',
  'description': 'Given an integer array, determine whether any value appears at least twice.',
  'difficulty': 'Easy',
  'topic': 'Hashing',
  'company': None,
  'starter_code': 'def contains_duplicate(nums):\n    # Write your solution here\n    pass',
  'expected_output': 'True if a duplicate exists, otherwise False.',
  'time_limit': 15,
  'xp': 25},
 {'title': 'Valid Parentheses',
  'description': 'Given a string containing parentheses, brackets and braces, determine whether '
                 'the brackets are correctly balanced.',
  'difficulty': 'Easy',
  'topic': 'Stack',
  'company': None,
  'starter_code': 'def is_valid(s):\n    # Write your solution here\n    pass',
  'expected_output': 'True if all brackets are validly matched.',
  'time_limit': 20,
  'xp': 25},
 {'title': 'Longest Substring Without Repeating Characters',
  'description': 'Given a string, find the length of the longest substring without repeating '
                 'characters.',
  'difficulty': 'Medium',
  'topic': 'Sliding Window',
  'company': None,
  'starter_code': 'def longest_substring(s):\n    # Write your solution here\n    pass',
  'expected_output': 'Length of the longest substring without duplicates.',
  'time_limit': 25,
  'xp': 40},
 {'title': '3Sum',
  'description': 'Given an integer array, find all unique triplets whose sum is zero.',
  'difficulty': 'Medium',
  'topic': 'Two Pointers',
  'company': None,
  'starter_code': 'def three_sum(nums):\n    # Write your solution here\n    pass',
  'expected_output': 'All unique triplets with sum equal to zero.',
  'time_limit': 30,
  'xp': 45},
 {'title': 'Group Anagrams',
  'description': 'Given an array of strings, group the strings that are anagrams of each other.',
  'difficulty': 'Medium',
  'topic': 'Hashing',
  'company': None,
  'starter_code': 'def group_anagrams(strs):\n    # Write your solution here\n    pass',
  'expected_output': 'Groups of strings containing matching anagrams.',
  'time_limit': 25,
  'xp': 40},
 {'title': 'Product of Array Except Self',
  'description': 'Given an integer array nums, return an array where each element is the product '
                 'of all elements except nums[i].',
  'difficulty': 'Medium',
  'topic': 'Arrays',
  'company': None,
  'starter_code': 'def product_except_self(nums):\n    # Write your solution here\n    pass',
  'expected_output': 'Array containing products excluding each position.',
  'time_limit': 30,
  'xp': 45},
 {'title': 'Binary Search',
  'description': 'Given a sorted array and a target value, return the index of the target using '
                 'binary search.',
  'difficulty': 'Medium',
  'topic': 'Binary Search',
  'company': None,
  'starter_code': 'def binary_search(nums, target):\n    # Write your solution here\n    pass',
  'expected_output': 'Index of target or -1 if target is absent.',
  'time_limit': 20,
  'xp': 35},
 {'title': 'Merge Intervals',
  'description': 'Given a collection of intervals, merge all overlapping intervals.',
  'difficulty': 'Medium',
  'topic': 'Intervals',
  'company': None,
  'starter_code': 'def merge_intervals(intervals):\n    # Write your solution here\n    pass',
  'expected_output': 'Merged list of non-overlapping intervals.',
  'time_limit': 30,
  'xp': 45},
 {'title': 'Merge K Sorted Lists',
  'description': 'Given k sorted linked lists, merge them into one sorted linked list.',
  'difficulty': 'Hard',
  'topic': 'Heap',
  'company': None,
  'starter_code': 'def merge_k_lists(lists):\n    # Write your solution here\n    pass',
  'expected_output': 'One sorted linked list containing all nodes.',
  'time_limit': 40,
  'xp': 70},
 {'title': 'Trapping Rain Water',
  'description': 'Given an elevation map represented by an integer array, calculate how much rain '
                 'water can be trapped.',
  'difficulty': 'Hard',
  'topic': 'Two Pointers',
  'company': None,
  'starter_code': 'def trap(height):\n    # Write your solution here\n    pass',
  'expected_output': 'Total units of trapped rain water.',
  'time_limit': 40,
  'xp': 70},
 {'title': 'Word Ladder',
  'description': 'Given a begin word, an end word and a dictionary, determine the shortest '
                 'transformation sequence.',
  'difficulty': 'Hard',
  'topic': 'Graphs',
  'company': None,
  'starter_code': 'def word_ladder(begin_word, end_word, word_list):\n'
                  '    # Write your solution here\n'
                  '    pass',
  'expected_output': 'Length of the shortest valid transformation.',
  'time_limit': 45,
  'xp': 75},
 {'title': 'Longest Increasing Subsequence',
  'description': 'Given an integer array, find the length of the longest strictly increasing '
                 'subsequence.',
  'difficulty': 'Hard',
  'topic': 'Dynamic Programming',
  'company': None,
  'starter_code': 'def longest_increasing_subsequence(nums):\n'
                  '    # Write your solution here\n'
                  '    pass',
  'expected_output': 'Length of the longest increasing subsequence.',
  'time_limit': 40,
  'xp': 70},
 {'title': 'Edit Distance',
  'description': 'Given two strings, determine the minimum number of operations required to '
                 'convert the first string into the second.',
  'difficulty': 'Hard',
  'topic': 'Dynamic Programming',
  'company': None,
  'starter_code': 'def edit_distance(word1, word2):\n    # Write your solution here\n    pass',
  'expected_output': 'Minimum number of insert, delete or replace operations.',
  'time_limit': 45,
  'xp': 75},
 {'title': 'Serialize and Deserialize Binary Tree',
  'description': 'Design an algorithm to serialize a binary tree into a string and deserialize the '
                 'string back into the original tree.',
  'difficulty': 'Hard',
  'topic': 'Trees',
  'company': None,
  'starter_code': 'def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass',
  'expected_output': 'The original binary tree after serialization and deserialization.',
  'time_limit': 45,
  'xp': 80},
 {'title': 'Fizz Buzz',
  'description': 'For numbers from 1 to n, return Fizz for multiples of 3, Buzz for multiples of '
                 '5, and FizzBuzz for multiples of both.',
  'difficulty': 'Easy',
  'topic': 'Arrays',
  'company': 'Accenture',
  'starter_code': 'def fizz_buzz(n):\n    # Write your solution here\n    pass',
  'expected_output': 'List containing the required Fizz/Buzz representations.',
  'time_limit': 10,
  'xp': 20},
 {'title': 'Move Zeroes',
  'description': 'Move all zeroes in an array to the end while maintaining the relative order of '
                 'non-zero elements.',
  'difficulty': 'Easy',
  'topic': 'Arrays',
  'company': 'Amazon',
  'starter_code': 'def move_zeroes(nums):\n    # Write your solution here\n    pass',
  'expected_output': 'The modified array with all zeroes at the end.',
  'time_limit': 15,
  'xp': 25},
 {'title': 'Best Time to Buy and Sell Stock',
  'description': 'Given daily stock prices, find the maximum profit possible from one buy and one '
                 'sell.',
  'difficulty': 'Easy',
  'topic': 'Arrays',
  'company': 'Microsoft',
  'starter_code': 'def max_profit(prices):\n    # Write your solution here\n    pass',
  'expected_output': 'Maximum possible profit.',
  'time_limit': 20,
  'xp': 30},
 {'title': 'Palindrome Number',
  'description': 'Determine whether an integer reads the same forward and backward.',
  'difficulty': 'Easy',
  'topic': 'Math',
  'company': 'Adobe',
  'starter_code': 'def is_palindrome(x):\n    # Write your solution here\n    pass',
  'expected_output': 'True if the number is a palindrome.',
  'time_limit': 15,
  'xp': 20},
 {'title': 'Subarray Sum Equals K',
  'description': 'Given an integer array nums and integer k, return the total number of continuous '
                 'subarrays whose sum equals k.',
  'difficulty': 'Medium',
  'topic': 'Prefix Sum',
  'company': 'Google',
  'starter_code': 'def subarray_sum(nums, k):\n    # Write your solution here\n    pass',
  'expected_output': 'Number of continuous subarrays whose sum equals k.',
  'time_limit': 30,
  'xp': 45},
 {'title': 'Top K Frequent Elements',
  'description': 'Given an integer array, return the k most frequent elements.',
  'difficulty': 'Medium',
  'topic': 'Heap',
  'company': 'Amazon',
  'starter_code': 'def top_k_frequent(nums, k):\n    # Write your solution here\n    pass',
  'expected_output': 'The k most frequent elements.',
  'time_limit': 30,
  'xp': 45},
 {'title': 'Number of Islands',
  'description': 'Given a 2D grid containing land and water, count the number of distinct islands.',
  'difficulty': 'Medium',
  'topic': 'Graphs',
  'company': 'Google',
  'starter_code': 'def num_islands(grid):\n    # Write your solution here\n    pass',
  'expected_output': 'Number of connected islands.',
  'time_limit': 35,
  'xp': 50},
 {'title': 'Course Schedule',
  'description': 'Given courses and prerequisite relationships, determine whether all courses can '
                 'be completed.',
  'difficulty': 'Medium',
  'topic': 'Graphs',
  'company': 'Microsoft',
  'starter_code': 'def can_finish(num_courses, prerequisites):\n'
                  '    # Write your solution here\n'
                  '    pass',
  'expected_output': 'True if all courses can be completed.',
  'time_limit': 35,
  'xp': 50},
 {'title': 'LRU Cache',
  'description': 'Design a data structure supporting get and put operations while evicting the '
                 'least recently used item.',
  'difficulty': 'Medium',
  'topic': 'Hashing',
  'company': 'Amazon',
  'starter_code': 'class LRUCache:\n'
                  '    def __init__(self, capacity):\n'
                  '        pass\n'
                  '\n'
                  '    def get(self, key):\n'
                  '        pass\n'
                  '\n'
                  '    def put(self, key, value):\n'
                  '        pass',
  'expected_output': 'Correct LRU cache behaviour.',
  'time_limit': 40,
  'xp': 60},
 {'title': 'Coin Change',
  'description': 'Given coin denominations and a target amount, return the minimum number of coins '
                 'required to make that amount.',
  'difficulty': 'Medium',
  'topic': 'Dynamic Programming',
  'company': 'Goldman Sachs',
  'starter_code': 'def coin_change(coins, amount):\n    # Write your solution here\n    pass',
  'expected_output': 'Minimum number of coins or -1 if impossible.',
  'time_limit': 35,
  'xp': 50},
 {'title': 'Median of Two Sorted Arrays',
  'description': 'Given two sorted arrays, find their median in logarithmic time complexity.',
  'difficulty': 'Hard',
  'topic': 'Binary Search',
  'company': 'Google',
  'starter_code': 'def find_median(nums1, nums2):\n    # Write your solution here\n    pass',
  'expected_output': 'Median of the two sorted arrays.',
  'time_limit': 45,
  'xp': 80},
 {'title': 'Merge K Sorted Lists',
  'description': 'Merge k sorted linked lists into a single sorted linked list.',
  'difficulty': 'Hard',
  'topic': 'Heap',
  'company': 'Amazon',
  'starter_code': 'def merge_k_lists(lists):\n    # Write your solution here\n    pass',
  'expected_output': 'One sorted linked list.',
  'time_limit': 45,
  'xp': 80},
 {'title': 'Maximum Path Sum in Binary Tree',
  'description': 'Find the maximum path sum in a binary tree. A path may start and end at any '
                 'nodes.',
  'difficulty': 'Hard',
  'topic': 'Trees',
  'company': 'Microsoft',
  'starter_code': 'def max_path_sum(root):\n    # Write your solution here\n    pass',
  'expected_output': 'Maximum sum obtainable from any valid tree path.',
  'time_limit': 45,
  'xp': 80},
 {'title': 'Regular Expression Matching',
  'description': "Implement regular expression matching supporting '.' and '*'.",
  'difficulty': 'Hard',
  'topic': 'Dynamic Programming',
  'company': 'Adobe',
  'starter_code': 'def is_match(s, pattern):\n    # Write your solution here\n    pass',
  'expected_output': 'True if the complete string matches the pattern.',
  'time_limit': 50,
  'xp': 85},
 {'title': 'Word Search',
  'description': 'Given a 2D board of characters and a word, determine whether the word exists in '
                 'the grid.',
  'difficulty': 'Medium',
  'topic': 'Backtracking',
  'company': 'NVIDIA',
  'starter_code': 'def word_search(board, word):\n    # Write your solution here\n    pass',
  'expected_output': 'True if the word can be formed in the grid.',
  'time_limit': 35,
  'xp': 55}]

# =========================================================
# DETAILED PROBLEM CONTENT
# =========================================================

DETAILS = {'Two Sum': {'examples': [{'input': 'nums = [2,7,11,15], target = 9',
                           'output': '[0,1]',
                           'explanation': 'nums[0] + nums[1] = 2 + 7 = 9.'},
                          {'input': 'nums = [3,2,4], target = 6',
                           'output': '[1,2]',
                           'explanation': 'nums[1] + nums[2] = 2 + 4 = 6.'}],
             'constraints': ['2 <= nums.length <= 10^4',
                             '-10^9 <= nums[i] <= 10^9',
                             '-10^9 <= target <= 10^9',
                             'Exactly one valid answer exists.'],
             'hints': ['For every number, think about the value you need to find.',
                       'A hash map can reduce the lookup time.'],
             'test_cases': [{'input': '[2,7,11,15], 9', 'output': '[0,1]'},
                            {'input': '[3,2,4], 6', 'output': '[1,2]'},
                            {'input': '[3,3], 6', 'output': '[0,1]'}],
             'boilerplate': {'python': 'class Solution:\n'
                                       '    def twoSum(self, nums, target):\n'
                                       '        # Write your solution here\n'
                                       '        pass',
                             'java': 'class Solution {\n'
                                     '    public int[] twoSum(int[] nums, int target) {\n'
                                     '        // Write your solution here\n'
                                     '        return new int[]{};\n'
                                     '    }\n'
                                     '}',
                             'cpp': 'class Solution {\n'
                                    'public:\n'
                                    '    vector<int> twoSum(vector<int>& nums, int target) {\n'
                                    '        // Write your solution here\n'
                                    '        return {};\n'
                                    '    }\n'
                                    '};',
                             'javascript': 'var twoSum = function(nums, target) {\n'
                                           '    // Write your solution here\n'
                                           '};',
                             'c': 'int* twoSum(int* nums, int numsSize, int target, int* '
                                  'returnSize) {\n'
                                  '    // Write your solution here\n'
                                  '}',
                             'kotlin': 'class Solution {\n'
                                       '    fun twoSum(nums: IntArray, target: Int): IntArray {\n'
                                       '        // Write your solution here\n'
                                       '        return intArrayOf()\n'
                                       '    }\n'
                                       '}'},
             'solutions': {'python': 'class Solution:\n'
                                     '    def twoSum(self, nums, target):\n'
                                     '        seen = {}\n'
                                     '\n'
                                     '        for i, num in enumerate(nums):\n'
                                     '            complement = target - num\n'
                                     '\n'
                                     '            if complement in seen:\n'
                                     '                return [seen[complement], i]\n'
                                     '\n'
                                     '            seen[num] = i\n'
                                     '\n'
                                     '        return []',
                           'java': 'class Solution {\n'
                                   '    public int[] twoSum(int[] nums, int target) {\n'
                                   '\n'
                                   '        java.util.HashMap<Integer, Integer> map =\n'
                                   '            new java.util.HashMap<>();\n'
                                   '\n'
                                   '        for (int i = 0; i < nums.length; i++) {\n'
                                   '\n'
                                   '            int complement = target - nums[i];\n'
                                   '\n'
                                   '            if (map.containsKey(complement)) {\n'
                                   '                return new int[]{\n'
                                   '                    map.get(complement),\n'
                                   '                    i\n'
                                   '                };\n'
                                   '            }\n'
                                   '\n'
                                   '            map.put(nums[i], i);\n'
                                   '        }\n'
                                   '\n'
                                   '        return new int[]{};\n'
                                   '    }\n'
                                   '}',
                           'cpp': 'class Solution {\n'
                                  'public:\n'
                                  '    vector<int> twoSum(vector<int>& nums, int target) {\n'
                                  '\n'
                                  '        unordered_map<int, int> mp;\n'
                                  '\n'
                                  '        for (int i = 0; i < nums.size(); i++) {\n'
                                  '\n'
                                  '            int complement = target - nums[i];\n'
                                  '\n'
                                  '            if (mp.count(complement)) {\n'
                                  '                return {mp[complement], i};\n'
                                  '            }\n'
                                  '\n'
                                  '            mp[nums[i]] = i;\n'
                                  '        }\n'
                                  '\n'
                                  '        return {};\n'
                                  '    }\n'
                                  '};',
                           'javascript': 'var twoSum = function(nums, target) {\n'
                                         '\n'
                                         '    const map = new Map();\n'
                                         '\n'
                                         '    for (let i = 0; i < nums.length; i++) {\n'
                                         '\n'
                                         '        const complement =\n'
                                         '            target - nums[i];\n'
                                         '\n'
                                         '        if (map.has(complement)) {\n'
                                         '            return [map.get(complement), i];\n'
                                         '        }\n'
                                         '\n'
                                         '        map.set(nums[i], i);\n'
                                         '    }\n'
                                         '\n'
                                         '    return [];\n'
                                         '};',
                           'c': 'int* twoSum(\n'
                                '    int* nums,\n'
                                '    int numsSize,\n'
                                '    int target,\n'
                                '    int* returnSize\n'
                                ') {\n'
                                '    *returnSize = 2;\n'
                                '\n'
                                '    int* result =\n'
                                '        (int*)malloc(2 * sizeof(int));\n'
                                '\n'
                                '    for (int i = 0; i < numsSize; i++) {\n'
                                '\n'
                                '        for (int j = i + 1; j < numsSize; j++) {\n'
                                '\n'
                                '            if (nums[i] + nums[j] == target) {\n'
                                '\n'
                                '                result[0] = i;\n'
                                '                result[1] = j;\n'
                                '\n'
                                '                return result;\n'
                                '            }\n'
                                '        }\n'
                                '    }\n'
                                '\n'
                                '    *returnSize = 0;\n'
                                '    return result;\n'
                                '}',
                           'kotlin': 'class Solution {\n'
                                     '    fun twoSum(\n'
                                     '        nums: IntArray,\n'
                                     '        target: Int\n'
                                     '    ): IntArray {\n'
                                     '\n'
                                     '        val map = HashMap<Int, Int>()\n'
                                     '\n'
                                     '        for (i in nums.indices) {\n'
                                     '\n'
                                     '            val complement =\n'
                                     '                target - nums[i]\n'
                                     '\n'
                                     '            if (map.containsKey(complement)) {\n'
                                     '                return intArrayOf(\n'
                                     '                    map[complement]!!,\n'
                                     '                    i\n'
                                     '                )\n'
                                     '            }\n'
                                     '\n'
                                     '            map[nums[i]] = i\n'
                                     '        }\n'
                                     '\n'
                                     '        return intArrayOf()\n'
                                     '    }\n'
                                     '}'}},
 'Valid Anagram': {'examples': [{'input': 's = "anagram", t = "nagaram"',
                                 'output': 'true',
                                 'explanation': 'Both strings contain the same characters with the '
                                                'same frequencies.'},
                                {'input': 's = "rat", t = "car"',
                                 'output': 'false',
                                 'explanation': 'The character frequencies are different.'}],
                   'constraints': ['1 <= s.length, t.length <= 5 * 10^4',
                                   's and t consist of lowercase English letters.'],
                   'hints': ['Two strings are anagrams when their character frequencies match.',
                             'A frequency map can solve this efficiently.'],
                   'test_cases': [{'input': '"anagram", "nagaram"', 'output': 'true'},
                                  {'input': '"rat", "car"', 'output': 'false'}],
                   'boilerplate': {'python': 'class Solution:\n'
                                             '    def isAnagram(self, s, t):\n'
                                             '        pass',
                                   'java': 'class Solution {\n'
                                           '    public boolean isAnagram(String s, String t) {\n'
                                           '        return false;\n'
                                           '    }\n'
                                           '}',
                                   'cpp': 'class Solution {\n'
                                          'public:\n'
                                          '    bool isAnagram(string s, string t) {\n'
                                          '        return false;\n'
                                          '    }\n'
                                          '};',
                                   'javascript': 'var isAnagram = function(s, t) {\n'
                                                 '    return false;\n'
                                                 '};',
                                   'c': 'bool isAnagram(char* s, char* t) {\n    return false;\n}',
                                   'kotlin': 'class Solution {\n'
                                             '    fun isAnagram(s: String, t: String): Boolean {\n'
                                             '        return false\n'
                                             '    }\n'
                                             '}'},
                   'solutions': {'python': 'class Solution:\n'
                                           '    def isAnagram(self, s, t):\n'
                                           '        if len(s) != len(t):\n'
                                           '            return False\n'
                                           '\n'
                                           '        count = {}\n'
                                           '\n'
                                           '        for ch in s:\n'
                                           '            count[ch] = count.get(ch, 0) + 1\n'
                                           '\n'
                                           '        for ch in t:\n'
                                           '            if ch not in count:\n'
                                           '                return False\n'
                                           '\n'
                                           '            count[ch] -= 1\n'
                                           '\n'
                                           '            if count[ch] < 0:\n'
                                           '                return False\n'
                                           '\n'
                                           '        return True',
                                 'java': 'class Solution {\n'
                                         '    public boolean isAnagram(String s, String t) {\n'
                                         '\n'
                                         '        if (s.length() != t.length())\n'
                                         '            return false;\n'
                                         '\n'
                                         '        int[] count = new int[26];\n'
                                         '\n'
                                         '        for (char c : s.toCharArray())\n'
                                         "            count[c - 'a']++;\n"
                                         '\n'
                                         '        for (char c : t.toCharArray())\n'
                                         "            count[c - 'a']--;\n"
                                         '\n'
                                         '        for (int x : count)\n'
                                         '            if (x != 0)\n'
                                         '                return false;\n'
                                         '\n'
                                         '        return true;\n'
                                         '    }\n'
                                         '}',
                                 'cpp': 'class Solution {\n'
                                        'public:\n'
                                        '    bool isAnagram(string s, string t) {\n'
                                        '\n'
                                        '        if (s.size() != t.size())\n'
                                        '            return false;\n'
                                        '\n'
                                        '        vector<int> count(26, 0);\n'
                                        '\n'
                                        '        for (char c : s)\n'
                                        "            count[c - 'a']++;\n"
                                        '\n'
                                        '        for (char c : t)\n'
                                        "            count[c - 'a']--;\n"
                                        '\n'
                                        '        for (int x : count)\n'
                                        '            if (x != 0)\n'
                                        '                return false;\n'
                                        '\n'
                                        '        return true;\n'
                                        '    }\n'
                                        '};',
                                 'javascript': 'var isAnagram = function(s, t) {\n'
                                               '\n'
                                               '    if (s.length !== t.length)\n'
                                               '        return false;\n'
                                               '\n'
                                               '    const count = new Map();\n'
                                               '\n'
                                               '    for (const ch of s)\n'
                                               '        count.set(ch, (count.get(ch) || 0) + 1);\n'
                                               '\n'
                                               '    for (const ch of t) {\n'
                                               '\n'
                                               '        if (!count.has(ch))\n'
                                               '            return false;\n'
                                               '\n'
                                               '        count.set(\n'
                                               '            ch,\n'
                                               '            count.get(ch) - 1\n'
                                               '        );\n'
                                               '\n'
                                               '        if (count.get(ch) < 0)\n'
                                               '            return false;\n'
                                               '    }\n'
                                               '\n'
                                               '    return true;\n'
                                               '};',
                                 'c': 'bool isAnagram(char* s, char* t) {\n'
                                      '\n'
                                      '    int count[26] = {0};\n'
                                      '\n'
                                      '    if (strlen(s) != strlen(t))\n'
                                      '        return false;\n'
                                      '\n'
                                      '    for (int i = 0; s[i]; i++)\n'
                                      "        count[s[i] - 'a']++;\n"
                                      '\n'
                                      '    for (int i = 0; t[i]; i++)\n'
                                      "        count[t[i] - 'a']--;\n"
                                      '\n'
                                      '    for (int i = 0; i < 26; i++)\n'
                                      '        if (count[i] != 0)\n'
                                      '            return false;\n'
                                      '\n'
                                      '    return true;\n'
                                      '}',
                                 'kotlin': 'class Solution {\n'
                                           '    fun isAnagram(s: String, t: String): Boolean {\n'
                                           '\n'
                                           '        if (s.length != t.length)\n'
                                           '            return false\n'
                                           '\n'
                                           '        val count = IntArray(26)\n'
                                           '\n'
                                           '        for (c in s)\n'
                                           "            count[c - 'a']++\n"
                                           '\n'
                                           '        for (c in t)\n'
                                           "            count[c - 'a']--\n"
                                           '\n'
                                           '        return count.all { it == 0 }\n'
                                           '    }\n'
                                           '}'}},
 'Reverse String': {'examples': [{'input': 's = "hello"',
                                  'output': '"olleh"',
                                  'explanation': 'The characters are reversed.'},
                                 {'input': 's = "Hannah"',
                                  'output': '"hannaH"',
                                  'explanation': 'The string is reversed character by character.'}],
                    'constraints': ['1 <= s.length <= 10^5',
                                    'The string may contain uppercase and lowercase letters.'],
                    'hints': ['You can use two pointers.', 'Swap characters from the two ends.'],
                    'test_cases': [{'input': '"hello"', 'output': '"olleh"'},
                                   {'input': '"abc"', 'output': '"cba"'}],
                    'boilerplate': {'python': 'class Solution:\n'
                                              '    def reverseString(self, s):\n'
                                              '        pass',
                                    'java': 'class Solution {\n'
                                            '    public String reverseString(String s) {\n'
                                            '        return "";\n'
                                            '    }\n'
                                            '}',
                                    'cpp': 'class Solution {\n'
                                           'public:\n'
                                           '    string reverseString(string s) {\n'
                                           '        return "";\n'
                                           '    }\n'
                                           '};',
                                    'javascript': 'var reverseString = function(s) {\n'
                                                  '    return "";\n'
                                                  '};',
                                    'c': 'char* reverseString(char* s) {\n    return s;\n}',
                                    'kotlin': 'class Solution {\n'
                                              '    fun reverseString(s: String): String {\n'
                                              '        return ""\n'
                                              '    }\n'
                                              '}'},
                    'solutions': {'python': 'class Solution:\n'
                                            '    def reverseString(self, s):\n'
                                            '        return s[::-1]',
                                  'java': 'class Solution {\n'
                                          '    public String reverseString(String s) {\n'
                                          '        return new StringBuilder(s)\n'
                                          '            .reverse()\n'
                                          '            .toString();\n'
                                          '    }\n'
                                          '}',
                                  'cpp': 'class Solution {\n'
                                         'public:\n'
                                         '    string reverseString(string s) {\n'
                                         '        reverse(s.begin(), s.end());\n'
                                         '        return s;\n'
                                         '    }\n'
                                         '};',
                                  'javascript': 'var reverseString = function(s) {\n'
                                                "    return s.split('').reverse().join('');\n"
                                                '};',
                                  'c': 'char* reverseString(char* s) {\n'
                                       '\n'
                                       '    int left = 0;\n'
                                       '    int right = strlen(s) - 1;\n'
                                       '\n'
                                       '    while (left < right) {\n'
                                       '\n'
                                       '        char temp = s[left];\n'
                                       '        s[left] = s[right];\n'
                                       '        s[right] = temp;\n'
                                       '\n'
                                       '        left++;\n'
                                       '        right--;\n'
                                       '    }\n'
                                       '\n'
                                       '    return s;\n'
                                       '}',
                                  'kotlin': 'class Solution {\n'
                                            '    fun reverseString(s: String): String {\n'
                                            '        return s.reversed()\n'
                                            '    }\n'
                                            '}'}},
 'Maximum Element in Array': {'examples': [{'input': '[3, 7, 2, 9, 4]',
                                            'output': '9',
                                            'explanation': '9 is the largest value.'},
                                           {'input': '[-5, -2, -10]',
                                            'output': '-2',
                                            'explanation': '-2 is the greatest value.'}],
                              'constraints': ['1 <= nums.length <= 10^5',
                                              '-10^9 <= nums[i] <= 10^9'],
                              'hints': ['Maintain the largest value seen so far.',
                                        'You only need one pass through the array.'],
                              'test_cases': [{'input': '[3,7,2,9,4]', 'output': '9'},
                                             {'input': '[-5,-2,-10]', 'output': '-2'}],
                              'boilerplate': {'python': 'class Solution:\n'
                                                        '    def findMax(self, nums):\n'
                                                        '        pass',
                                              'java': 'class Solution {\n'
                                                      '    public int findMax(int[] nums) {\n'
                                                      '        return 0;\n'
                                                      '    }\n'
                                                      '}',
                                              'cpp': 'class Solution {\n'
                                                     'public:\n'
                                                     '    int findMax(vector<int>& nums) {\n'
                                                     '        return 0;\n'
                                                     '    }\n'
                                                     '};',
                                              'javascript': 'var findMax = function(nums) {\n'
                                                            '    return 0;\n'
                                                            '};',
                                              'c': 'int findMax(int* nums, int numsSize) {\n'
                                                   '    return 0;\n'
                                                   '}',
                                              'kotlin': 'class Solution {\n'
                                                        '    fun findMax(nums: IntArray): Int {\n'
                                                        '        return 0\n'
                                                        '    }\n'
                                                        '}'},
                              'solutions': {'python': 'class Solution:\n'
                                                      '    def findMax(self, nums):\n'
                                                      '        return max(nums)',
                                            'java': 'class Solution {\n'
                                                    '    public int findMax(int[] nums) {\n'
                                                    '\n'
                                                    '        int max = nums[0];\n'
                                                    '\n'
                                                    '        for (int num : nums)\n'
                                                    '            max = Math.max(max, num);\n'
                                                    '\n'
                                                    '        return max;\n'
                                                    '    }\n'
                                                    '}',
                                            'cpp': 'class Solution {\n'
                                                   'public:\n'
                                                   '    int findMax(vector<int>& nums) {\n'
                                                   '\n'
                                                   '        int mx = nums[0];\n'
                                                   '\n'
                                                   '        for (int x : nums)\n'
                                                   '            mx = max(mx, x);\n'
                                                   '\n'
                                                   '        return mx;\n'
                                                   '    }\n'
                                                   '};',
                                            'javascript': 'var findMax = function(nums) {\n'
                                                          '    return Math.max(...nums);\n'
                                                          '};',
                                            'c': 'int findMax(int* nums, int numsSize) {\n'
                                                 '\n'
                                                 '    int mx = nums[0];\n'
                                                 '\n'
                                                 '    for (int i = 1; i < numsSize; i++)\n'
                                                 '        if (nums[i] > mx)\n'
                                                 '            mx = nums[i];\n'
                                                 '\n'
                                                 '    return mx;\n'
                                                 '}',
                                            'kotlin': 'class Solution {\n'
                                                      '    fun findMax(nums: IntArray): Int {\n'
                                                      '        return nums.maxOrNull()!!\n'
                                                      '    }\n'
                                                      '}'}},
 'Contains Duplicate': {'examples': [{'input': '[1,2,3,1]',
                                      'output': 'true',
                                      'explanation': '1 appears more than once.'},
                                     {'input': '[1,2,3,4]',
                                      'output': 'false',
                                      'explanation': 'Every element is unique.'}],
                        'constraints': ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
                        'hints': ['Keep track of values that have already appeared.',
                                  'A hash set gives constant average lookup time.'],
                        'test_cases': [{'input': '[1,2,3,1]', 'output': 'true'},
                                       {'input': '[1,2,3,4]', 'output': 'false'}],
                        'boilerplate': {'python': 'class Solution:\n'
                                                  '    def containsDuplicate(self, nums):\n'
                                                  '        pass',
                                        'java': 'class Solution {\n'
                                                '    public boolean containsDuplicate(int[] nums) '
                                                '{\n'
                                                '        return false;\n'
                                                '    }\n'
                                                '}',
                                        'cpp': 'class Solution {\n'
                                               'public:\n'
                                               '    bool containsDuplicate(vector<int>& nums) {\n'
                                               '        return false;\n'
                                               '    }\n'
                                               '};',
                                        'javascript': 'var containsDuplicate = function(nums) {\n'
                                                      '    return false;\n'
                                                      '};',
                                        'c': 'bool containsDuplicate(int* nums, int numsSize) {\n'
                                             '    return false;\n'
                                             '}',
                                        'kotlin': 'class Solution {\n'
                                                  '    fun containsDuplicate(nums: IntArray): '
                                                  'Boolean {\n'
                                                  '        return false\n'
                                                  '    }\n'
                                                  '}'},
                        'solutions': {'python': 'class Solution:\n'
                                                '    def containsDuplicate(self, nums):\n'
                                                '        return len(nums) != len(set(nums))',
                                      'java': 'class Solution {\n'
                                              '    public boolean containsDuplicate(int[] nums) {\n'
                                              '\n'
                                              '        java.util.HashSet<Integer> set =\n'
                                              '            new java.util.HashSet<>();\n'
                                              '\n'
                                              '        for (int num : nums) {\n'
                                              '\n'
                                              '            if (!set.add(num))\n'
                                              '                return true;\n'
                                              '        }\n'
                                              '\n'
                                              '        return false;\n'
                                              '    }\n'
                                              '}',
                                      'cpp': 'class Solution {\n'
                                             'public:\n'
                                             '    bool containsDuplicate(vector<int>& nums) {\n'
                                             '\n'
                                             '        unordered_set<int> seen;\n'
                                             '\n'
                                             '        for (int x : nums) {\n'
                                             '\n'
                                             '            if (seen.count(x))\n'
                                             '                return true;\n'
                                             '\n'
                                             '            seen.insert(x);\n'
                                             '        }\n'
                                             '\n'
                                             '        return false;\n'
                                             '    }\n'
                                             '};',
                                      'javascript': 'var containsDuplicate = function(nums) {\n'
                                                    '    return new Set(nums).size !== '
                                                    'nums.length;\n'
                                                    '};',
                                      'c': 'bool containsDuplicate(int* nums, int numsSize) {\n'
                                           '\n'
                                           '    for (int i = 0; i < numsSize; i++)\n'
                                           '        for (int j = i + 1; j < numsSize; j++)\n'
                                           '            if (nums[i] == nums[j])\n'
                                           '                return true;\n'
                                           '\n'
                                           '    return false;\n'
                                           '}',
                                      'kotlin': 'class Solution {\n'
                                                '    fun containsDuplicate(nums: IntArray): '
                                                'Boolean {\n'
                                                '        return nums.toSet().size != nums.size\n'
                                                '    }\n'
                                                '}'}},
 'Valid Parentheses': {'examples': [{'input': '"()"',
                                     'output': 'true',
                                     'explanation': 'The parentheses are correctly matched.'},
                                    {'input': '"()[]{}"',
                                     'output': 'true',
                                     'explanation': 'Every opening bracket has the correct closing '
                                                    'bracket.'},
                                    {'input': '"(]"',
                                     'output': 'false',
                                     'explanation': 'The closing bracket does not match the '
                                                    'opening bracket.'}],
                       'constraints': ['1 <= s.length <= 10^4',
                                       's consists only of parentheses, brackets and braces.'],
                       'hints': ['The most recently opened bracket must be closed first.',
                                 'This is a classic stack problem.'],
                       'test_cases': [{'input': '"()"', 'output': 'true'},
                                      {'input': '"()[]{}"', 'output': 'true'},
                                      {'input': '"(]"', 'output': 'false'}],
                       'boilerplate': {'python': 'class Solution:\n'
                                                 '    def isValid(self, s):\n'
                                                 '        pass',
                                       'java': 'class Solution {\n'
                                               '    public boolean isValid(String s) {\n'
                                               '        return false;\n'
                                               '    }\n'
                                               '}',
                                       'cpp': 'class Solution {\n'
                                              'public:\n'
                                              '    bool isValid(string s) {\n'
                                              '        return false;\n'
                                              '    }\n'
                                              '};',
                                       'javascript': 'var isValid = function(s) {\n'
                                                     '    return false;\n'
                                                     '};',
                                       'c': 'bool isValid(char* s) {\n    return false;\n}',
                                       'kotlin': 'class Solution {\n'
                                                 '    fun isValid(s: String): Boolean {\n'
                                                 '        return false\n'
                                                 '    }\n'
                                                 '}'},
                       'solutions': {'python': 'class Solution:\n'
                                               '    def isValid(self, s):\n'
                                               '\n'
                                               '        stack = []\n'
                                               '\n'
                                               '        pairs = {\n'
                                               "            ')': '(',\n"
                                               "            ']': '[',\n"
                                               "            '}': '{'\n"
                                               '        }\n'
                                               '\n'
                                               '        for ch in s:\n'
                                               '\n'
                                               '            if ch in pairs:\n'
                                               '\n'
                                               '                if not stack or stack.pop() != '
                                               'pairs[ch]:\n'
                                               '                    return False\n'
                                               '\n'
                                               '            else:\n'
                                               '                stack.append(ch)\n'
                                               '\n'
                                               '        return not stack',
                                     'java': 'class Solution {\n'
                                             '    public boolean isValid(String s) {\n'
                                             '\n'
                                             '        java.util.Stack<Character> stack =\n'
                                             '            new java.util.Stack<>();\n'
                                             '\n'
                                             '        for (char c : s.toCharArray()) {\n'
                                             '\n'
                                             "            if (c == '(' ||\n"
                                             "                c == '[' ||\n"
                                             "                c == '{') {\n"
                                             '\n'
                                             '                stack.push(c);\n'
                                             '\n'
                                             '            } else {\n'
                                             '\n'
                                             '                if (stack.isEmpty())\n'
                                             '                    return false;\n'
                                             '\n'
                                             '                char top = stack.pop();\n'
                                             '\n'
                                             "                if ((c == ')' && top != '(') ||\n"
                                             "                    (c == ']' && top != '[') ||\n"
                                             "                    (c == '}' && top != '{'))\n"
                                             '                    return false;\n'
                                             '            }\n'
                                             '        }\n'
                                             '\n'
                                             '        return stack.isEmpty();\n'
                                             '    }\n'
                                             '}',
                                     'cpp': 'class Solution {\n'
                                            'public:\n'
                                            '    bool isValid(string s) {\n'
                                            '\n'
                                            '        stack<char> st;\n'
                                            '\n'
                                            '        for (char c : s) {\n'
                                            '\n'
                                            "            if (c == '(' ||\n"
                                            "                c == '[' ||\n"
                                            "                c == '{') {\n"
                                            '\n'
                                            '                st.push(c);\n'
                                            '\n'
                                            '            } else {\n'
                                            '\n'
                                            '                if (st.empty())\n'
                                            '                    return false;\n'
                                            '\n'
                                            '                char top = st.top();\n'
                                            '                st.pop();\n'
                                            '\n'
                                            "                if ((c == ')' && top != '(') ||\n"
                                            "                    (c == ']' && top != '[') ||\n"
                                            "                    (c == '}' && top != '{'))\n"
                                            '                    return false;\n'
                                            '            }\n'
                                            '        }\n'
                                            '\n'
                                            '        return st.empty();\n'
                                            '    }\n'
                                            '};',
                                     'javascript': 'var isValid = function(s) {\n'
                                                   '\n'
                                                   '    const stack = [];\n'
                                                   '\n'
                                                   '    const pairs = {\n'
                                                   "        ')': '(',\n"
                                                   "        ']': '[',\n"
                                                   "        '}': '{'\n"
                                                   '    };\n'
                                                   '\n'
                                                   '    for (const ch of s) {\n'
                                                   '\n'
                                                   '        if (pairs[ch]) {\n'
                                                   '\n'
                                                   '            if (\n'
                                                   '                stack.length === 0 ||\n'
                                                   '                stack.pop() !== pairs[ch]\n'
                                                   '            )\n'
                                                   '                return false;\n'
                                                   '\n'
                                                   '        } else {\n'
                                                   '\n'
                                                   '            stack.push(ch);\n'
                                                   '        }\n'
                                                   '    }\n'
                                                   '\n'
                                                   '    return stack.length === 0;\n'
                                                   '};',
                                     'c': 'bool isValid(char* s) {\n'
                                          '\n'
                                          '    char stack[10000];\n'
                                          '    int top = -1;\n'
                                          '\n'
                                          '    for (int i = 0; s[i]; i++) {\n'
                                          '\n'
                                          '        char c = s[i];\n'
                                          '\n'
                                          "        if (c == '(' ||\n"
                                          "            c == '[' ||\n"
                                          "            c == '{') {\n"
                                          '\n'
                                          '            stack[++top] = c;\n'
                                          '\n'
                                          '        } else {\n'
                                          '\n'
                                          '            if (top < 0)\n'
                                          '                return false;\n'
                                          '\n'
                                          '            char open = stack[top--];\n'
                                          '\n'
                                          "            if ((c == ')' && open != '(') ||\n"
                                          "                (c == ']' && open != '[') ||\n"
                                          "                (c == '}' && open != '{'))\n"
                                          '                return false;\n'
                                          '        }\n'
                                          '    }\n'
                                          '\n'
                                          '    return top == -1;\n'
                                          '}',
                                     'kotlin': 'class Solution {\n'
                                               '    fun isValid(s: String): Boolean {\n'
                                               '\n'
                                               '        val stack = ArrayDeque<Char>()\n'
                                               '\n'
                                               '        for (c in s) {\n'
                                               '\n'
                                               '            if (\n'
                                               "                c == '(' ||\n"
                                               "                c == '[' ||\n"
                                               "                c == '{'\n"
                                               '            ) {\n'
                                               '\n'
                                               '                stack.addLast(c)\n'
                                               '\n'
                                               '            } else {\n'
                                               '\n'
                                               '                if (stack.isEmpty())\n'
                                               '                    return false\n'
                                               '\n'
                                               '                val top = stack.removeLast()\n'
                                               '\n'
                                               '                if (\n'
                                               "                    (c == ')' && top != '(') ||\n"
                                               "                    (c == ']' && top != '[') ||\n"
                                               "                    (c == '}' && top != '{')\n"
                                               '                )\n'
                                               '                    return false\n'
                                               '            }\n'
                                               '        }\n'
                                               '\n'
                                               '        return stack.isEmpty()\n'
                                               '    }\n'
                                               '}'}},
 'Longest Substring Without Repeating Characters': {'examples': [{'input': 's = "abcabcbb"',
                                                                  'output': '3',
                                                                  'explanation': 'The longest '
                                                                                 'substring '
                                                                                 'without '
                                                                                 'repeating '
                                                                                 'characters is '
                                                                                 '"abc".'},
                                                                 {'input': 's = "bbbbb"',
                                                                  'output': '1',
                                                                  'explanation': 'Only "b" can be '
                                                                                 'used without '
                                                                                 'repeating a '
                                                                                 'character.'},
                                                                 {'input': 's = "pwwkew"',
                                                                  'output': '3',
                                                                  'explanation': 'The longest '
                                                                                 'substring is '
                                                                                 '"wke".'}],
                                                    'constraints': ['0 <= s.length <= 5 * 10^4',
                                                                    's consists of English '
                                                                    'letters, digits, symbols and '
                                                                    'spaces.'],
                                                    'hints': ['Maintain a window containing only '
                                                              'unique characters.',
                                                              'When a duplicate appears, move the '
                                                              'left side of the window.',
                                                              'A hash map can store the latest '
                                                              'index of each character.'],
                                                    'test_cases': [{'input': '"abcabcbb"',
                                                                    'output': '3'},
                                                                   {'input': '"bbbbb"',
                                                                    'output': '1'},
                                                                   {'input': '"pwwkew"',
                                                                    'output': '3'}],
                                                    'boilerplate': {'python': 'class Solution:\n'
                                                                              '    def '
                                                                              'lengthOfLongestSubstring(self, '
                                                                              's):\n'
                                                                              '        pass',
                                                                    'java': 'class Solution {\n'
                                                                            '    public int '
                                                                            'lengthOfLongestSubstring(String '
                                                                            's) {\n'
                                                                            '        return 0;\n'
                                                                            '    }\n'
                                                                            '}',
                                                                    'cpp': 'class Solution {\n'
                                                                           'public:\n'
                                                                           '    int '
                                                                           'lengthOfLongestSubstring(string '
                                                                           's) {\n'
                                                                           '        return 0;\n'
                                                                           '    }\n'
                                                                           '};',
                                                                    'javascript': 'var '
                                                                                  'lengthOfLongestSubstring '
                                                                                  '= function(s) '
                                                                                  '{\n'
                                                                                  '    return 0;\n'
                                                                                  '};',
                                                                    'c': 'int '
                                                                         'lengthOfLongestSubstring(char* '
                                                                         's) {\n'
                                                                         '    return 0;\n'
                                                                         '}',
                                                                    'kotlin': 'class Solution {\n'
                                                                              '    fun '
                                                                              'lengthOfLongestSubstring(s: '
                                                                              'String): Int {\n'
                                                                              '        return 0\n'
                                                                              '    }\n'
                                                                              '}'},
                                                    'solutions': {'python': 'class Solution:\n'
                                                                            '    def '
                                                                            'lengthOfLongestSubstring(self, '
                                                                            's):\n'
                                                                            '        seen = {}\n'
                                                                            '        left = 0\n'
                                                                            '        answer = 0\n'
                                                                            '\n'
                                                                            '        for right, ch '
                                                                            'in enumerate(s):\n'
                                                                            '\n'
                                                                            '            if ch in '
                                                                            'seen and seen[ch] >= '
                                                                            'left:\n'
                                                                            '                left '
                                                                            '= seen[ch] + 1\n'
                                                                            '\n'
                                                                            '            seen[ch] '
                                                                            '= right\n'
                                                                            '\n'
                                                                            '            answer = '
                                                                            'max(\n'
                                                                            '                '
                                                                            'answer,\n'
                                                                            '                right '
                                                                            '- left + 1\n'
                                                                            '            )\n'
                                                                            '\n'
                                                                            '        return answer',
                                                                  'java': 'class Solution {\n'
                                                                          '    public int '
                                                                          'lengthOfLongestSubstring(String '
                                                                          's) {\n'
                                                                          '\n'
                                                                          '        '
                                                                          'java.util.HashMap<Character, '
                                                                          'Integer> map =\n'
                                                                          '            new '
                                                                          'java.util.HashMap<>();\n'
                                                                          '\n'
                                                                          '        int left = 0;\n'
                                                                          '        int answer = '
                                                                          '0;\n'
                                                                          '\n'
                                                                          '        for (int right '
                                                                          '= 0; right < '
                                                                          's.length(); right++) {\n'
                                                                          '\n'
                                                                          '            char c = '
                                                                          's.charAt(right);\n'
                                                                          '\n'
                                                                          '            if '
                                                                          '(map.containsKey(c))\n'
                                                                          '                left = '
                                                                          'Math.max(\n'
                                                                          '                    '
                                                                          'left,\n'
                                                                          '                    '
                                                                          'map.get(c) + 1\n'
                                                                          '                );\n'
                                                                          '\n'
                                                                          '            map.put(c, '
                                                                          'right);\n'
                                                                          '\n'
                                                                          '            answer = '
                                                                          'Math.max(\n'
                                                                          '                '
                                                                          'answer,\n'
                                                                          '                right - '
                                                                          'left + 1\n'
                                                                          '            );\n'
                                                                          '        }\n'
                                                                          '\n'
                                                                          '        return answer;\n'
                                                                          '    }\n'
                                                                          '}',
                                                                  'cpp': 'class Solution {\n'
                                                                         'public:\n'
                                                                         '    int '
                                                                         'lengthOfLongestSubstring(string '
                                                                         's) {\n'
                                                                         '\n'
                                                                         '        '
                                                                         'unordered_map<char, int> '
                                                                         'mp;\n'
                                                                         '\n'
                                                                         '        int left = 0;\n'
                                                                         '        int answer = 0;\n'
                                                                         '\n'
                                                                         '        for (int right = '
                                                                         '0; right < s.size(); '
                                                                         'right++) {\n'
                                                                         '\n'
                                                                         '            char c = '
                                                                         's[right];\n'
                                                                         '\n'
                                                                         '            if '
                                                                         '(mp.count(c))\n'
                                                                         '                left = '
                                                                         'max(left, mp[c] + 1);\n'
                                                                         '\n'
                                                                         '            mp[c] = '
                                                                         'right;\n'
                                                                         '\n'
                                                                         '            answer = '
                                                                         'max(\n'
                                                                         '                answer,\n'
                                                                         '                right - '
                                                                         'left + 1\n'
                                                                         '            );\n'
                                                                         '        }\n'
                                                                         '\n'
                                                                         '        return answer;\n'
                                                                         '    }\n'
                                                                         '};',
                                                                  'javascript': 'var '
                                                                                'lengthOfLongestSubstring '
                                                                                '= function(s) {\n'
                                                                                '\n'
                                                                                '    const map = '
                                                                                'new Map();\n'
                                                                                '\n'
                                                                                '    let left = '
                                                                                '0;\n'
                                                                                '    let answer = '
                                                                                '0;\n'
                                                                                '\n'
                                                                                '    for (let '
                                                                                'right = 0; right '
                                                                                '< s.length; '
                                                                                'right++) {\n'
                                                                                '\n'
                                                                                '        const ch '
                                                                                '= s[right];\n'
                                                                                '\n'
                                                                                '        if '
                                                                                '(map.has(ch))\n'
                                                                                '            left '
                                                                                '= Math.max(\n'
                                                                                '                '
                                                                                'left,\n'
                                                                                '                '
                                                                                'map.get(ch) + 1\n'
                                                                                '            );\n'
                                                                                '\n'
                                                                                '        '
                                                                                'map.set(ch, '
                                                                                'right);\n'
                                                                                '\n'
                                                                                '        answer = '
                                                                                'Math.max(\n'
                                                                                '            '
                                                                                'answer,\n'
                                                                                '            right '
                                                                                '- left + 1\n'
                                                                                '        );\n'
                                                                                '    }\n'
                                                                                '\n'
                                                                                '    return '
                                                                                'answer;\n'
                                                                                '};',
                                                                  'c': 'int '
                                                                       'lengthOfLongestSubstring(char* '
                                                                       's) {\n'
                                                                       '\n'
                                                                       '    int last[256];\n'
                                                                       '\n'
                                                                       '    for (int i = 0; i < '
                                                                       '256; i++)\n'
                                                                       '        last[i] = -1;\n'
                                                                       '\n'
                                                                       '    int left = 0;\n'
                                                                       '    int answer = 0;\n'
                                                                       '\n'
                                                                       '    for (int right = 0; '
                                                                       's[right]; right++) {\n'
                                                                       '\n'
                                                                       '        unsigned char c = '
                                                                       's[right];\n'
                                                                       '\n'
                                                                       '        if (last[c] >= '
                                                                       'left)\n'
                                                                       '            left = last[c] '
                                                                       '+ 1;\n'
                                                                       '\n'
                                                                       '        last[c] = right;\n'
                                                                       '\n'
                                                                       '        int length = right '
                                                                       '- left + 1;\n'
                                                                       '\n'
                                                                       '        if (length > '
                                                                       'answer)\n'
                                                                       '            answer = '
                                                                       'length;\n'
                                                                       '    }\n'
                                                                       '\n'
                                                                       '    return answer;\n'
                                                                       '}',
                                                                  'kotlin': 'class Solution {\n'
                                                                            '    fun '
                                                                            'lengthOfLongestSubstring(s: '
                                                                            'String): Int {\n'
                                                                            '\n'
                                                                            '        val map = '
                                                                            'HashMap<Char, Int>()\n'
                                                                            '\n'
                                                                            '        var left = 0\n'
                                                                            '        var answer = '
                                                                            '0\n'
                                                                            '\n'
                                                                            '        for (right in '
                                                                            's.indices) {\n'
                                                                            '\n'
                                                                            '            val c = '
                                                                            's[right]\n'
                                                                            '\n'
                                                                            '            if '
                                                                            '(map.containsKey(c))\n'
                                                                            '                left '
                                                                            '= maxOf(\n'
                                                                            '                    '
                                                                            'left,\n'
                                                                            '                    '
                                                                            'map[c]!! + 1\n'
                                                                            '                )\n'
                                                                            '\n'
                                                                            '            map[c] = '
                                                                            'right\n'
                                                                            '\n'
                                                                            '            answer = '
                                                                            'maxOf(\n'
                                                                            '                '
                                                                            'answer,\n'
                                                                            '                right '
                                                                            '- left + 1\n'
                                                                            '            )\n'
                                                                            '        }\n'
                                                                            '\n'
                                                                            '        return '
                                                                            'answer\n'
                                                                            '    }\n'
                                                                            '}'}},
 '3Sum': {'examples': [{'input': 'nums = [-1,0,1,2,-1,-4]',
                        'output': '[[-1,-1,2],[-1,0,1]]',
                        'explanation': 'These are the unique triplets whose sum is zero.'},
                       {'input': 'nums = [0,1,1]',
                        'output': '[]',
                        'explanation': 'No three numbers sum to zero.'}],
          'constraints': ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
          'hints': ['Sort the array first.',
                    'Fix one number and solve a two-sum problem for the remaining suffix.',
                    'Skip duplicate values to avoid duplicate triplets.'],
          'test_cases': [{'input': '[-1,0,1,2,-1,-4]', 'output': '[[-1,-1,2],[-1,0,1]]'},
                         {'input': '[0,1,1]', 'output': '[]'},
                         {'input': '[0,0,0]', 'output': '[[0,0,0]]'}],
          'boilerplate': {'python': 'class Solution:\n    def threeSum(self, nums):\n        pass',
                          'java': 'class Solution {\n'
                                  '    public java.util.List<java.util.List<Integer>> '
                                  'threeSum(int[] nums) {\n'
                                  '        return new java.util.ArrayList<>();\n'
                                  '    }\n'
                                  '}',
                          'cpp': 'class Solution {\n'
                                 'public:\n'
                                 '    vector<vector<int>> threeSum(vector<int>& nums) {\n'
                                 '        return {};\n'
                                 '    }\n'
                                 '};',
                          'javascript': 'var threeSum = function(nums) {\n    return [];\n};',
                          'c': '/* Return the unique triplets as required by your judge. */\n'
                               'int threeSum() {\n'
                               '    return 0;\n'
                               '}',
                          'kotlin': 'class Solution {\n'
                                    '    fun threeSum(nums: IntArray): List<List<Int>> {\n'
                                    '        return emptyList()\n'
                                    '    }\n'
                                    '}'},
          'solutions': {'python': 'class Solution:\n'
                                  '    def threeSum(self, nums):\n'
                                  '        nums.sort()\n'
                                  '        result = []\n'
                                  '\n'
                                  '        for i in range(len(nums) - 2):\n'
                                  '\n'
                                  '            if i > 0 and nums[i] == nums[i - 1]:\n'
                                  '                continue\n'
                                  '\n'
                                  '            left = i + 1\n'
                                  '            right = len(nums) - 1\n'
                                  '\n'
                                  '            while left < right:\n'
                                  '\n'
                                  '                total = nums[i] + nums[left] + nums[right]\n'
                                  '\n'
                                  '                if total == 0:\n'
                                  '\n'
                                  '                    result.append([\n'
                                  '                        nums[i],\n'
                                  '                        nums[left],\n'
                                  '                        nums[right]\n'
                                  '                    ])\n'
                                  '\n'
                                  '                    left += 1\n'
                                  '                    right -= 1\n'
                                  '\n'
                                  '                    while left < right and nums[left] == '
                                  'nums[left - 1]:\n'
                                  '                        left += 1\n'
                                  '\n'
                                  '                    while left < right and nums[right] == '
                                  'nums[right + 1]:\n'
                                  '                        right -= 1\n'
                                  '\n'
                                  '                elif total < 0:\n'
                                  '                    left += 1\n'
                                  '                else:\n'
                                  '                    right -= 1\n'
                                  '\n'
                                  '        return result',
                        'java': 'class Solution {\n'
                                '    public java.util.List<java.util.List<Integer>> threeSum(int[] '
                                'nums) {\n'
                                '\n'
                                '        java.util.Arrays.sort(nums);\n'
                                '\n'
                                '        java.util.List<java.util.List<Integer>> result =\n'
                                '            new java.util.ArrayList<>();\n'
                                '\n'
                                '        for (int i = 0; i < nums.length - 2; i++) {\n'
                                '\n'
                                '            if (i > 0 && nums[i] == nums[i - 1])\n'
                                '                continue;\n'
                                '\n'
                                '            int left = i + 1;\n'
                                '            int right = nums.length - 1;\n'
                                '\n'
                                '            while (left < right) {\n'
                                '\n'
                                '                int sum =\n'
                                '                    nums[i] + nums[left] + nums[right];\n'
                                '\n'
                                '                if (sum == 0) {\n'
                                '\n'
                                '                    result.add(\n'
                                '                        java.util.Arrays.asList(\n'
                                '                            nums[i],\n'
                                '                            nums[left],\n'
                                '                            nums[right]\n'
                                '                        )\n'
                                '                    );\n'
                                '\n'
                                '                    left++;\n'
                                '                    right--;\n'
                                '\n'
                                '                    while (left < right &&\n'
                                '                           nums[left] == nums[left - 1])\n'
                                '                        left++;\n'
                                '\n'
                                '                    while (left < right &&\n'
                                '                           nums[right] == nums[right + 1])\n'
                                '                        right--;\n'
                                '\n'
                                '                } else if (sum < 0) {\n'
                                '                    left++;\n'
                                '                } else {\n'
                                '                    right--;\n'
                                '                }\n'
                                '            }\n'
                                '        }\n'
                                '\n'
                                '        return result;\n'
                                '    }\n'
                                '}',
                        'cpp': 'class Solution {\n'
                               'public:\n'
                               '    vector<vector<int>> threeSum(vector<int>& nums) {\n'
                               '\n'
                               '        sort(nums.begin(), nums.end());\n'
                               '\n'
                               '        vector<vector<int>> result;\n'
                               '\n'
                               '        for (int i = 0; i < nums.size() - 2; i++) {\n'
                               '\n'
                               '            if (i > 0 && nums[i] == nums[i - 1])\n'
                               '                continue;\n'
                               '\n'
                               '            int left = i + 1;\n'
                               '            int right = nums.size() - 1;\n'
                               '\n'
                               '            while (left < right) {\n'
                               '\n'
                               '                long long sum =\n'
                               '                    (long long)nums[i]\n'
                               '                    + nums[left]\n'
                               '                    + nums[right];\n'
                               '\n'
                               '                if (sum == 0) {\n'
                               '\n'
                               '                    result.push_back({\n'
                               '                        nums[i],\n'
                               '                        nums[left],\n'
                               '                        nums[right]\n'
                               '                    });\n'
                               '\n'
                               '                    left++;\n'
                               '                    right--;\n'
                               '\n'
                               '                    while (\n'
                               '                        left < right &&\n'
                               '                        nums[left] == nums[left - 1]\n'
                               '                    )\n'
                               '                        left++;\n'
                               '\n'
                               '                    while (\n'
                               '                        left < right &&\n'
                               '                        nums[right] == nums[right + 1]\n'
                               '                    )\n'
                               '                        right--;\n'
                               '\n'
                               '                } else if (sum < 0) {\n'
                               '                    left++;\n'
                               '                } else {\n'
                               '                    right--;\n'
                               '                }\n'
                               '            }\n'
                               '        }\n'
                               '\n'
                               '        return result;\n'
                               '    }\n'
                               '};',
                        'javascript': 'var threeSum = function(nums) {\n'
                                      '\n'
                                      '    nums.sort((a, b) => a - b);\n'
                                      '\n'
                                      '    const result = [];\n'
                                      '\n'
                                      '    for (let i = 0; i < nums.length - 2; i++) {\n'
                                      '\n'
                                      '        if (i > 0 && nums[i] === nums[i - 1])\n'
                                      '            continue;\n'
                                      '\n'
                                      '        let left = i + 1;\n'
                                      '        let right = nums.length - 1;\n'
                                      '\n'
                                      '        while (left < right) {\n'
                                      '\n'
                                      '            const sum =\n'
                                      '                nums[i] +\n'
                                      '                nums[left] +\n'
                                      '                nums[right];\n'
                                      '\n'
                                      '            if (sum === 0) {\n'
                                      '\n'
                                      '                result.push([\n'
                                      '                    nums[i],\n'
                                      '                    nums[left],\n'
                                      '                    nums[right]\n'
                                      '                ]);\n'
                                      '\n'
                                      '                left++;\n'
                                      '                right--;\n'
                                      '\n'
                                      '                while (\n'
                                      '                    left < right &&\n'
                                      '                    nums[left] === nums[left - 1]\n'
                                      '                )\n'
                                      '                    left++;\n'
                                      '\n'
                                      '                while (\n'
                                      '                    left < right &&\n'
                                      '                    nums[right] === nums[right + 1]\n'
                                      '                )\n'
                                      '                    right--;\n'
                                      '\n'
                                      '            } else if (sum < 0) {\n'
                                      '                left++;\n'
                                      '            } else {\n'
                                      '                right--;\n'
                                      '            }\n'
                                      '        }\n'
                                      '    }\n'
                                      '\n'
                                      '    return result;\n'
                                      '};',
                        'c': '/* Typical C implementations use sorting\n'
                             '   followed by the two-pointer technique.\n'
                             '   Adapt the return structure to the judge API. */',
                        'kotlin': 'class Solution {\n'
                                  '    fun threeSum(nums: IntArray): List<List<Int>> {\n'
                                  '\n'
                                  '        nums.sort()\n'
                                  '\n'
                                  '        val result = mutableListOf<List<Int>>()\n'
                                  '\n'
                                  '        for (i in 0 until nums.size - 2) {\n'
                                  '\n'
                                  '            if (i > 0 && nums[i] == nums[i - 1])\n'
                                  '                continue\n'
                                  '\n'
                                  '            var left = i + 1\n'
                                  '            var right = nums.size - 1\n'
                                  '\n'
                                  '            while (left < right) {\n'
                                  '\n'
                                  '                val sum =\n'
                                  '                    nums[i] +\n'
                                  '                    nums[left] +\n'
                                  '                    nums[right]\n'
                                  '\n'
                                  '                if (sum == 0) {\n'
                                  '\n'
                                  '                    result.add(\n'
                                  '                        listOf(\n'
                                  '                            nums[i],\n'
                                  '                            nums[left],\n'
                                  '                            nums[right]\n'
                                  '                        )\n'
                                  '                    )\n'
                                  '\n'
                                  '                    left++\n'
                                  '                    right--\n'
                                  '\n'
                                  '                    while (\n'
                                  '                        left < right &&\n'
                                  '                        nums[left] == nums[left - 1]\n'
                                  '                    )\n'
                                  '                        left++\n'
                                  '\n'
                                  '                    while (\n'
                                  '                        left < right &&\n'
                                  '                        nums[right] == nums[right + 1]\n'
                                  '                    )\n'
                                  '                        right--\n'
                                  '\n'
                                  '                } else if (sum < 0) {\n'
                                  '                    left++\n'
                                  '                } else {\n'
                                  '                    right--\n'
                                  '                }\n'
                                  '            }\n'
                                  '        }\n'
                                  '\n'
                                  '        return result\n'
                                  '    }\n'
                                  '}'}},
 'Group Anagrams': {'examples': [{'input': 'strs = ["eat","tea","tan","ate","nat","bat"]',
                                  'output': '[["eat","tea","ate"],["tan","nat"],["bat"]]',
                                  'explanation': 'Words with identical character frequencies '
                                                 'belong to the same group.'},
                                 {'input': 'strs = [""]',
                                  'output': '[[""]]',
                                  'explanation': 'The empty string forms one group.'}],
                    'constraints': ['1 <= strs.length <= 10^4',
                                    '0 <= strs[i].length <= 100',
                                    'strs[i] consists of lowercase English letters.'],
                    'hints': ['Anagrams have the same character-frequency signature.',
                              'Use the signature as a hash-map key.'],
                    'test_cases': [{'input': '["eat","tea","tan","ate","nat","bat"]',
                                    'output': '[["eat","tea","ate"],["tan","nat"],["bat"]]'},
                                   {'input': '[""]', 'output': '[[""]]'}],
                    'boilerplate': {'python': 'class Solution:\n'
                                              '    def groupAnagrams(self, strs):\n'
                                              '        pass',
                                    'java': 'class Solution {\n'
                                            '    public java.util.List<java.util.List<String>> '
                                            'groupAnagrams(String[] strs) {\n'
                                            '        return new java.util.ArrayList<>();\n'
                                            '    }\n'
                                            '}',
                                    'cpp': 'class Solution {\n'
                                           'public:\n'
                                           '    vector<vector<string>> '
                                           'groupAnagrams(vector<string>& strs) {\n'
                                           '        return {};\n'
                                           '    }\n'
                                           '};',
                                    'javascript': 'var groupAnagrams = function(strs) {\n'
                                                  '    return [];\n'
                                                  '};',
                                    'c': '/* Implement grouping according to your judge interface. '
                                         '*/',
                                    'kotlin': 'class Solution {\n'
                                              '    fun groupAnagrams(strs: Array<String>): '
                                              'List<List<String>> {\n'
                                              '        return emptyList()\n'
                                              '    }\n'
                                              '}'},
                    'solutions': {'python': 'class Solution:\n'
                                            '    def groupAnagrams(self, strs):\n'
                                            '\n'
                                            '        groups = {}\n'
                                            '\n'
                                            '        for word in strs:\n'
                                            '\n'
                                            "            key = ''.join(\n"
                                            '                sorted(word)\n'
                                            '            )\n'
                                            '\n'
                                            '            groups.setdefault(\n'
                                            '                key,\n'
                                            '                []\n'
                                            '            ).append(word)\n'
                                            '\n'
                                            '        return list(groups.values())',
                                  'java': 'class Solution {\n'
                                          '    public java.util.List<java.util.List<String>> '
                                          'groupAnagrams(String[] strs) {\n'
                                          '\n'
                                          '        java.util.Map<String, java.util.List<String>> '
                                          'map =\n'
                                          '            new java.util.HashMap<>();\n'
                                          '\n'
                                          '        for (String word : strs) {\n'
                                          '\n'
                                          '            char[] chars = word.toCharArray();\n'
                                          '\n'
                                          '            java.util.Arrays.sort(chars);\n'
                                          '\n'
                                          '            String key = new String(chars);\n'
                                          '\n'
                                          '            map.computeIfAbsent(\n'
                                          '                key,\n'
                                          '                k -> new java.util.ArrayList<>()\n'
                                          '            ).add(word);\n'
                                          '        }\n'
                                          '\n'
                                          '        return new java.util.ArrayList<>(\n'
                                          '            map.values()\n'
                                          '        );\n'
                                          '    }\n'
                                          '}',
                                  'cpp': 'class Solution {\n'
                                         'public:\n'
                                         '    vector<vector<string>> groupAnagrams(vector<string>& '
                                         'strs) {\n'
                                         '\n'
                                         '        unordered_map<\n'
                                         '            string,\n'
                                         '            vector<string>\n'
                                         '        > groups;\n'
                                         '\n'
                                         '        for (string word : strs) {\n'
                                         '\n'
                                         '            string key = word;\n'
                                         '\n'
                                         '            sort(\n'
                                         '                key.begin(),\n'
                                         '                key.end()\n'
                                         '            );\n'
                                         '\n'
                                         '            groups[key].push_back(word);\n'
                                         '        }\n'
                                         '\n'
                                         '        vector<vector<string>> result;\n'
                                         '\n'
                                         '        for (auto& pair : groups)\n'
                                         '            result.push_back(pair.second);\n'
                                         '\n'
                                         '        return result;\n'
                                         '    }\n'
                                         '};',
                                  'javascript': 'var groupAnagrams = function(strs) {\n'
                                                '\n'
                                                '    const groups = new Map();\n'
                                                '\n'
                                                '    for (const word of strs) {\n'
                                                '\n'
                                                '        const key =\n'
                                                '            word\n'
                                                "                .split('')\n"
                                                '                .sort()\n'
                                                "                .join('');\n"
                                                '\n'
                                                '        if (!groups.has(key))\n'
                                                '            groups.set(key, []);\n'
                                                '\n'
                                                '        groups.get(key).push(word);\n'
                                                '    }\n'
                                                '\n'
                                                '    return [...groups.values()];\n'
                                                '};',
                                  'c': '/* C implementation depends on the\n'
                                       '   required output allocation format. */',
                                  'kotlin': 'class Solution {\n'
                                            '    fun groupAnagrams(\n'
                                            '        strs: Array<String>\n'
                                            '    ): List<List<String>> {\n'
                                            '\n'
                                            '        val groups =\n'
                                            '            HashMap<String, MutableList<String>>()\n'
                                            '\n'
                                            '        for (word in strs) {\n'
                                            '\n'
                                            '            val key =\n'
                                            '                word.toCharArray()\n'
                                            '                    .sorted()\n'
                                            '                    .joinToString("")\n'
                                            '\n'
                                            '            groups\n'
                                            '                .getOrPut(key) {\n'
                                            '                    mutableListOf()\n'
                                            '                }\n'
                                            '                .add(word)\n'
                                            '        }\n'
                                            '\n'
                                            '        return groups.values.toList()\n'
                                            '    }\n'
                                            '}'}},
 'Product of Array Except Self': {'examples': [{'input': 'nums = [1,2,3,4]',
                                                'output': '[24,12,8,6]',
                                                'explanation': 'Each output element is the product '
                                                               'of all numbers except the number '
                                                               'at that index.'},
                                               {'input': 'nums = [-1,1,0,-3,3]',
                                                'output': '[0,0,9,0,0]',
                                                'explanation': 'The zero causes every product '
                                                               'except its own position to become '
                                                               'zero.'}],
                                  'constraints': ['2 <= nums.length <= 10^5',
                                                  '-30 <= nums[i] <= 30',
                                                  'The product of any prefix or suffix fits in a '
                                                  '32-bit integer.'],
                                  'hints': ['Compute prefix products.',
                                            'Then multiply by suffix products.',
                                            'The solution can be achieved without division.'],
                                  'test_cases': [{'input': '[1,2,3,4]', 'output': '[24,12,8,6]'},
                                                 {'input': '[-1,1,0,-3,3]',
                                                  'output': '[0,0,9,0,0]'}],
                                  'boilerplate': {'python': 'class Solution:\n'
                                                            '    def productExceptSelf(self, '
                                                            'nums):\n'
                                                            '        pass',
                                                  'java': 'class Solution {\n'
                                                          '    public int[] '
                                                          'productExceptSelf(int[] nums) {\n'
                                                          '        return new int[nums.length];\n'
                                                          '    }\n'
                                                          '}',
                                                  'cpp': 'class Solution {\n'
                                                         'public:\n'
                                                         '    vector<int> '
                                                         'productExceptSelf(vector<int>& nums) {\n'
                                                         '        return {};\n'
                                                         '    }\n'
                                                         '};',
                                                  'javascript': 'var productExceptSelf = '
                                                                'function(nums) {\n'
                                                                '    return [];\n'
                                                                '};',
                                                  'c': 'int* productExceptSelf(\n'
                                                       '    int* nums,\n'
                                                       '    int numsSize,\n'
                                                       '    int* returnSize\n'
                                                       ') {\n'
                                                       '    return 0;\n'
                                                       '}',
                                                  'kotlin': 'class Solution {\n'
                                                            '    fun productExceptSelf(nums: '
                                                            'IntArray): IntArray {\n'
                                                            '        return IntArray(nums.size)\n'
                                                            '    }\n'
                                                            '}'},
                                  'solutions': {'python': 'class Solution:\n'
                                                          '    def productExceptSelf(self, nums):\n'
                                                          '\n'
                                                          '        result = [1] * len(nums)\n'
                                                          '\n'
                                                          '        prefix = 1\n'
                                                          '\n'
                                                          '        for i in range(len(nums)):\n'
                                                          '            result[i] = prefix\n'
                                                          '            prefix *= nums[i]\n'
                                                          '\n'
                                                          '        suffix = 1\n'
                                                          '\n'
                                                          '        for i in range(len(nums) - 1, '
                                                          '-1, -1):\n'
                                                          '            result[i] *= suffix\n'
                                                          '            suffix *= nums[i]\n'
                                                          '\n'
                                                          '        return result',
                                                'java': 'class Solution {\n'
                                                        '    public int[] productExceptSelf(int[] '
                                                        'nums) {\n'
                                                        '\n'
                                                        '        int[] result =\n'
                                                        '            new int[nums.length];\n'
                                                        '\n'
                                                        '        int prefix = 1;\n'
                                                        '\n'
                                                        '        for (int i = 0; i < nums.length; '
                                                        'i++) {\n'
                                                        '\n'
                                                        '            result[i] = prefix;\n'
                                                        '            prefix *= nums[i];\n'
                                                        '        }\n'
                                                        '\n'
                                                        '        int suffix = 1;\n'
                                                        '\n'
                                                        '        for (int i = nums.length - 1; i '
                                                        '>= 0; i--) {\n'
                                                        '\n'
                                                        '            result[i] *= suffix;\n'
                                                        '            suffix *= nums[i];\n'
                                                        '        }\n'
                                                        '\n'
                                                        '        return result;\n'
                                                        '    }\n'
                                                        '}',
                                                'cpp': 'class Solution {\n'
                                                       'public:\n'
                                                       '    vector<int> '
                                                       'productExceptSelf(vector<int>& nums) {\n'
                                                       '\n'
                                                       '        vector<int> result(nums.size(), '
                                                       '1);\n'
                                                       '\n'
                                                       '        int prefix = 1;\n'
                                                       '\n'
                                                       '        for (int i = 0; i < nums.size(); '
                                                       'i++) {\n'
                                                       '\n'
                                                       '            result[i] = prefix;\n'
                                                       '            prefix *= nums[i];\n'
                                                       '        }\n'
                                                       '\n'
                                                       '        int suffix = 1;\n'
                                                       '\n'
                                                       '        for (int i = nums.size() - 1; i >= '
                                                       '0; i--) {\n'
                                                       '\n'
                                                       '            result[i] *= suffix;\n'
                                                       '            suffix *= nums[i];\n'
                                                       '        }\n'
                                                       '\n'
                                                       '        return result;\n'
                                                       '    }\n'
                                                       '};',
                                                'javascript': 'var productExceptSelf = '
                                                              'function(nums) {\n'
                                                              '\n'
                                                              '    const result =\n'
                                                              '        new '
                                                              'Array(nums.length).fill(1);\n'
                                                              '\n'
                                                              '    let prefix = 1;\n'
                                                              '\n'
                                                              '    for (let i = 0; i < '
                                                              'nums.length; i++) {\n'
                                                              '\n'
                                                              '        result[i] = prefix;\n'
                                                              '        prefix *= nums[i];\n'
                                                              '    }\n'
                                                              '\n'
                                                              '    let suffix = 1;\n'
                                                              '\n'
                                                              '    for (\n'
                                                              '        let i = nums.length - 1;\n'
                                                              '        i >= 0;\n'
                                                              '        i--\n'
                                                              '    ) {\n'
                                                              '\n'
                                                              '        result[i] *= suffix;\n'
                                                              '        suffix *= nums[i];\n'
                                                              '    }\n'
                                                              '\n'
                                                              '    return result;\n'
                                                              '};',
                                                'c': 'int* productExceptSelf(\n'
                                                     '    int* nums,\n'
                                                     '    int numsSize,\n'
                                                     '    int* returnSize\n'
                                                     ') {\n'
                                                     '\n'
                                                     '    *returnSize = numsSize;\n'
                                                     '\n'
                                                     '    int* result =\n'
                                                     '        malloc(numsSize * sizeof(int));\n'
                                                     '\n'
                                                     '    int prefix = 1;\n'
                                                     '\n'
                                                     '    for (int i = 0; i < numsSize; i++) {\n'
                                                     '\n'
                                                     '        result[i] = prefix;\n'
                                                     '        prefix *= nums[i];\n'
                                                     '    }\n'
                                                     '\n'
                                                     '    int suffix = 1;\n'
                                                     '\n'
                                                     '    for (int i = numsSize - 1; i >= 0; i--) '
                                                     '{\n'
                                                     '\n'
                                                     '        result[i] *= suffix;\n'
                                                     '        suffix *= nums[i];\n'
                                                     '    }\n'
                                                     '\n'
                                                     '    return result;\n'
                                                     '}',
                                                'kotlin': 'class Solution {\n'
                                                          '    fun productExceptSelf(nums: '
                                                          'IntArray): IntArray {\n'
                                                          '\n'
                                                          '        val result =\n'
                                                          '            IntArray(nums.size) { 1 }\n'
                                                          '\n'
                                                          '        var prefix = 1\n'
                                                          '\n'
                                                          '        for (i in nums.indices) {\n'
                                                          '\n'
                                                          '            result[i] = prefix\n'
                                                          '            prefix *= nums[i]\n'
                                                          '        }\n'
                                                          '\n'
                                                          '        var suffix = 1\n'
                                                          '\n'
                                                          '        for (i in '
                                                          'nums.indices.reversed()) {\n'
                                                          '\n'
                                                          '            result[i] *= suffix\n'
                                                          '            suffix *= nums[i]\n'
                                                          '        }\n'
                                                          '\n'
                                                          '        return result\n'
                                                          '    }\n'
                                                          '}'}},
 'Binary Search': {'examples': [{'input': 'nums = [-1,0,3,5,9,12], target = 9',
                                 'output': '4',
                                 'explanation': '9 occurs at index 4.'},
                                {'input': 'nums = [-1,0,3,5,9,12], target = 2',
                                 'output': '-1',
                                 'explanation': '2 does not exist in the array.'}],
                   'constraints': ['1 <= nums.length <= 10^4',
                                   '-10^4 <= nums[i], target <= 10^4',
                                   'All integers in nums are unique.',
                                   'nums is sorted in ascending order.'],
                   'hints': ['The array is sorted.',
                             'Compare the target with the middle element.',
                             'Discard half of the search space after every comparison.'],
                   'test_cases': [{'input': '[-1,0,3,5,9,12], 9', 'output': '4'},
                                  {'input': '[-1,0,3,5,9,12], 2', 'output': '-1'}],
                   'boilerplate': {'python': 'class Solution:\n'
                                             '    def search(self, nums, target):\n'
                                             '        pass',
                                   'java': 'class Solution {\n'
                                           '    public int search(int[] nums, int target) {\n'
                                           '        return -1;\n'
                                           '    }\n'
                                           '}',
                                   'cpp': 'class Solution {\n'
                                          'public:\n'
                                          '    int search(vector<int>& nums, int target) {\n'
                                          '        return -1;\n'
                                          '    }\n'
                                          '};',
                                   'javascript': 'var search = function(nums, target) {\n'
                                                 '    return -1;\n'
                                                 '};',
                                   'c': 'int search(int* nums, int numsSize, int target) {\n'
                                        '    return -1;\n'
                                        '}',
                                   'kotlin': 'class Solution {\n'
                                             '    fun search(nums: IntArray, target: Int): Int {\n'
                                             '        return -1\n'
                                             '    }\n'
                                             '}'},
                   'solutions': {'python': 'class Solution:\n'
                                           '    def search(self, nums, target):\n'
                                           '\n'
                                           '        left = 0\n'
                                           '        right = len(nums) - 1\n'
                                           '\n'
                                           '        while left <= right:\n'
                                           '\n'
                                           '            mid = (left + right) // 2\n'
                                           '\n'
                                           '            if nums[mid] == target:\n'
                                           '                return mid\n'
                                           '\n'
                                           '            if nums[mid] < target:\n'
                                           '                left = mid + 1\n'
                                           '            else:\n'
                                           '                right = mid - 1\n'
                                           '\n'
                                           '        return -1',
                                 'java': 'class Solution {\n'
                                         '    public int search(int[] nums, int target) {\n'
                                         '\n'
                                         '        int left = 0;\n'
                                         '        int right = nums.length - 1;\n'
                                         '\n'
                                         '        while (left <= right) {\n'
                                         '\n'
                                         '            int mid =\n'
                                         '                left + (right - left) / 2;\n'
                                         '\n'
                                         '            if (nums[mid] == target)\n'
                                         '                return mid;\n'
                                         '\n'
                                         '            if (nums[mid] < target)\n'
                                         '                left = mid + 1;\n'
                                         '            else\n'
                                         '                right = mid - 1;\n'
                                         '        }\n'
                                         '\n'
                                         '        return -1;\n'
                                         '    }\n'
                                         '}',
                                 'cpp': 'class Solution {\n'
                                        'public:\n'
                                        '    int search(vector<int>& nums, int target) {\n'
                                        '\n'
                                        '        int left = 0;\n'
                                        '        int right = nums.size() - 1;\n'
                                        '\n'
                                        '        while (left <= right) {\n'
                                        '\n'
                                        '            int mid =\n'
                                        '                left + (right - left) / 2;\n'
                                        '\n'
                                        '            if (nums[mid] == target)\n'
                                        '                return mid;\n'
                                        '\n'
                                        '            if (nums[mid] < target)\n'
                                        '                left = mid + 1;\n'
                                        '            else\n'
                                        '                right = mid - 1;\n'
                                        '        }\n'
                                        '\n'
                                        '        return -1;\n'
                                        '    }\n'
                                        '};',
                                 'javascript': 'var search = function(nums, target) {\n'
                                               '\n'
                                               '    let left = 0;\n'
                                               '    let right = nums.length - 1;\n'
                                               '\n'
                                               '    while (left <= right) {\n'
                                               '\n'
                                               '        const mid =\n'
                                               '            Math.floor(\n'
                                               '                left + (right - left) / 2\n'
                                               '            );\n'
                                               '\n'
                                               '        if (nums[mid] === target)\n'
                                               '            return mid;\n'
                                               '\n'
                                               '        if (nums[mid] < target)\n'
                                               '            left = mid + 1;\n'
                                               '        else\n'
                                               '            right = mid - 1;\n'
                                               '    }\n'
                                               '\n'
                                               '    return -1;\n'
                                               '};',
                                 'c': 'int search(int* nums, int numsSize, int target) {\n'
                                      '\n'
                                      '    int left = 0;\n'
                                      '    int right = numsSize - 1;\n'
                                      '\n'
                                      '    while (left <= right) {\n'
                                      '\n'
                                      '        int mid =\n'
                                      '            left + (right - left) / 2;\n'
                                      '\n'
                                      '        if (nums[mid] == target)\n'
                                      '            return mid;\n'
                                      '\n'
                                      '        if (nums[mid] < target)\n'
                                      '            left = mid + 1;\n'
                                      '        else\n'
                                      '            right = mid - 1;\n'
                                      '    }\n'
                                      '\n'
                                      '    return -1;\n'
                                      '}',
                                 'kotlin': 'class Solution {\n'
                                           '    fun search(\n'
                                           '        nums: IntArray,\n'
                                           '        target: Int\n'
                                           '    ): Int {\n'
                                           '\n'
                                           '        var left = 0\n'
                                           '        var right = nums.size - 1\n'
                                           '\n'
                                           '        while (left <= right) {\n'
                                           '\n'
                                           '            val mid =\n'
                                           '                left + (right - left) / 2\n'
                                           '\n'
                                           '            if (nums[mid] == target)\n'
                                           '                return mid\n'
                                           '\n'
                                           '            if (nums[mid] < target)\n'
                                           '                left = mid + 1\n'
                                           '            else\n'
                                           '                right = mid - 1\n'
                                           '        }\n'
                                           '\n'
                                           '        return -1\n'
                                           '    }\n'
                                           '}'}},
 'Merge Intervals': {'examples': [{'input': 'See the problem statement for a representative input.',
                                   'output': 'Merged list of non-overlapping intervals.',
                                   'explanation': 'Given a collection of intervals, merge all '
                                                  'overlapping intervals.'}],
                     'constraints': ['Use the input format described in the problem statement.',
                                     'Handle edge cases and the stated limits efficiently.'],
                     'hints': ['Focus on the Intervals technique.',
                               'Choose an approach whose time and space complexity fit the '
                               'constraints.',
                               'Test boundary cases before submitting.'],
                     'test_cases': [{'input': "Use the problem statement's sample input.",
                                     'output': 'Merged list of non-overlapping intervals.'}],
                     'boilerplate': {'python': 'def merge_intervals(intervals):\n'
                                               '    # Write your solution here\n'
                                               '    pass',
                                     'java': '// Implement the required solution in Java.',
                                     'cpp': '// Implement the required solution in C++.',
                                     'javascript': '// Implement the required solution in '
                                                   'JavaScript.',
                                     'c': '/* Implement the required solution in C. */',
                                     'kotlin': '// Implement the required solution in Kotlin.'},
                     'solutions': {'python': 'def merge_intervals(intervals):\n'
                                             '    intervals.sort(key=lambda x: x[0])\n'
                                             '    result = []\n'
                                             '    for start, end in intervals:\n'
                                             '        if not result or start > result[-1][1]:\n'
                                             '            result.append([start, end])\n'
                                             '        else:\n'
                                             '            result[-1][1] = max(result[-1][1], end)\n'
                                             '    return result'}},
 'Merge K Sorted Lists': {'examples': [{'input': 'See the problem statement for a representative '
                                                 'input.',
                                        'output': 'One sorted linked list containing all nodes.',
                                        'explanation': 'Given k sorted linked lists, merge them '
                                                       'into one sorted linked list.'}],
                          'constraints': ['Use the input format described in the problem '
                                          'statement.',
                                          'Handle edge cases and the stated limits efficiently.'],
                          'hints': ['Focus on the Heap technique.',
                                    'Choose an approach whose time and space complexity fit the '
                                    'constraints.',
                                    'Test boundary cases before submitting.'],
                          'test_cases': [{'input': "Use the problem statement's sample input.",
                                          'output': 'One sorted linked list containing all '
                                                    'nodes.'}],
                          'boilerplate': {'python': 'def merge_k_lists(lists):\n'
                                                    '    # Write your solution here\n'
                                                    '    pass',
                                          'java': '// Implement the required solution in Java.',
                                          'cpp': '// Implement the required solution in C++.',
                                          'javascript': '// Implement the required solution in '
                                                        'JavaScript.',
                                          'c': '/* Implement the required solution in C. */',
                                          'kotlin': '// Implement the required solution in '
                                                    'Kotlin.'},
                          'solutions': {'python': 'import heapq\n'
                                                  '\n'
                                                  'def merge_k_lists(lists):\n'
                                                  '    heap = []\n'
                                                  '    for i, lst in enumerate(lists):\n'
                                                  '        if lst:\n'
                                                  '            heapq.heappush(heap, (lst[0], i, '
                                                  '0))\n'
                                                  '    result = []\n'
                                                  '    while heap:\n'
                                                  '        value, list_id, index = '
                                                  'heapq.heappop(heap)\n'
                                                  '        result.append(value)\n'
                                                  '        nxt = index + 1\n'
                                                  '        if nxt < len(lists[list_id]):\n'
                                                  '            heapq.heappush(heap, '
                                                  '(lists[list_id][nxt], list_id, nxt))\n'
                                                  '    return result'}},
 'Trapping Rain Water': {'examples': [{'input': 'See the problem statement for a representative '
                                                'input.',
                                       'output': 'Total units of trapped rain water.',
                                       'explanation': 'Given an elevation map represented by an '
                                                      'integer array, calculate how much rain '
                                                      'water can be trapped.'}],
                         'constraints': ['Use the input format described in the problem statement.',
                                         'Handle edge cases and the stated limits efficiently.'],
                         'hints': ['Focus on the Two Pointers technique.',
                                   'Choose an approach whose time and space complexity fit the '
                                   'constraints.',
                                   'Test boundary cases before submitting.'],
                         'test_cases': [{'input': "Use the problem statement's sample input.",
                                         'output': 'Total units of trapped rain water.'}],
                         'boilerplate': {'python': 'def trap(height):\n'
                                                   '    # Write your solution here\n'
                                                   '    pass',
                                         'java': '// Implement the required solution in Java.',
                                         'cpp': '// Implement the required solution in C++.',
                                         'javascript': '// Implement the required solution in '
                                                       'JavaScript.',
                                         'c': '/* Implement the required solution in C. */',
                                         'kotlin': '// Implement the required solution in Kotlin.'},
                         'solutions': {'python': 'def trap(height):\n'
                                                 '    left, right = 0, len(height) - 1\n'
                                                 '    left_max = right_max = water = 0\n'
                                                 '    while left < right:\n'
                                                 '        if height[left] <= height[right]:\n'
                                                 '            left_max = max(left_max, '
                                                 'height[left])\n'
                                                 '            water += left_max - height[left]\n'
                                                 '            left += 1\n'
                                                 '        else:\n'
                                                 '            right_max = max(right_max, '
                                                 'height[right])\n'
                                                 '            water += right_max - height[right]\n'
                                                 '            right -= 1\n'
                                                 '    return water'}},
 'Word Ladder': {'examples': [{'input': 'See the problem statement for a representative input.',
                               'output': 'Length of the shortest valid transformation.',
                               'explanation': 'Given a begin word, an end word and a dictionary, '
                                              'determine the shortest transformation sequence.'}],
                 'constraints': ['Use the input format described in the problem statement.',
                                 'Handle edge cases and the stated limits efficiently.'],
                 'hints': ['Focus on the Graphs technique.',
                           'Choose an approach whose time and space complexity fit the '
                           'constraints.',
                           'Test boundary cases before submitting.'],
                 'test_cases': [{'input': "Use the problem statement's sample input.",
                                 'output': 'Length of the shortest valid transformation.'}],
                 'boilerplate': {'python': 'def word_ladder(begin_word, end_word, word_list):\n'
                                           '    # Write your solution here\n'
                                           '    pass',
                                 'java': '// Implement the required solution in Java.',
                                 'cpp': '// Implement the required solution in C++.',
                                 'javascript': '// Implement the required solution in JavaScript.',
                                 'c': '/* Implement the required solution in C. */',
                                 'kotlin': '// Implement the required solution in Kotlin.'},
                 'solutions': {'python': 'from collections import deque\n'
                                         '\n'
                                         'def word_ladder(begin_word, end_word, word_list):\n'
                                         '    words = set(word_list)\n'
                                         '    if end_word not in words:\n'
                                         '        return 0\n'
                                         '    queue = deque([(begin_word, 1)])\n'
                                         '    while queue:\n'
                                         '        word, distance = queue.popleft()\n'
                                         '        if word == end_word:\n'
                                         '            return distance\n'
                                         '        for i in range(len(word)):\n'
                                         '            for c in "abcdefghijklmnopqrstuvwxyz":\n'
                                         '                nxt = word[:i] + c + word[i + 1:]\n'
                                         '                if nxt in words:\n'
                                         '                    words.remove(nxt)\n'
                                         '                    queue.append((nxt, distance + 1))\n'
                                         '    return 0'}},
 'Longest Increasing Subsequence': {'examples': [{'input': 'See the problem statement for a '
                                                           'representative input.',
                                                  'output': 'Length of the longest increasing '
                                                            'subsequence.',
                                                  'explanation': 'Given an integer array, find the '
                                                                 'length of the longest strictly '
                                                                 'increasing subsequence.'}],
                                    'constraints': ['Use the input format described in the problem '
                                                    'statement.',
                                                    'Handle edge cases and the stated limits '
                                                    'efficiently.'],
                                    'hints': ['Focus on the Dynamic Programming technique.',
                                              'Choose an approach whose time and space complexity '
                                              'fit the constraints.',
                                              'Test boundary cases before submitting.'],
                                    'test_cases': [{'input': "Use the problem statement's sample "
                                                             'input.',
                                                    'output': 'Length of the longest increasing '
                                                              'subsequence.'}],
                                    'boilerplate': {'python': 'def '
                                                              'longest_increasing_subsequence(nums):\n'
                                                              '    # Write your solution here\n'
                                                              '    pass',
                                                    'java': '// Implement the required solution in '
                                                            'Java.',
                                                    'cpp': '// Implement the required solution in '
                                                           'C++.',
                                                    'javascript': '// Implement the required '
                                                                  'solution in JavaScript.',
                                                    'c': '/* Implement the required solution in C. '
                                                         '*/',
                                                    'kotlin': '// Implement the required solution '
                                                              'in Kotlin.'},
                                    'solutions': {'python': 'from bisect import bisect_left\n'
                                                            '\n'
                                                            'def '
                                                            'longest_increasing_subsequence(nums):\n'
                                                            '    tails = []\n'
                                                            '    for x in nums:\n'
                                                            '        i = bisect_left(tails, x)\n'
                                                            '        if i == len(tails):\n'
                                                            '            tails.append(x)\n'
                                                            '        else:\n'
                                                            '            tails[i] = x\n'
                                                            '    return len(tails)'}},
 'Edit Distance': {'examples': [{'input': 'See the problem statement for a representative input.',
                                 'output': 'Minimum number of insert, delete or replace '
                                           'operations.',
                                 'explanation': 'Given two strings, determine the minimum number '
                                                'of operations required to convert the first '
                                                'string into the second.'}],
                   'constraints': ['Use the input format described in the problem statement.',
                                   'Handle edge cases and the stated limits efficiently.'],
                   'hints': ['Focus on the Dynamic Programming technique.',
                             'Choose an approach whose time and space complexity fit the '
                             'constraints.',
                             'Test boundary cases before submitting.'],
                   'test_cases': [{'input': "Use the problem statement's sample input.",
                                   'output': 'Minimum number of insert, delete or replace '
                                             'operations.'}],
                   'boilerplate': {'python': 'def edit_distance(word1, word2):\n'
                                             '    # Write your solution here\n'
                                             '    pass',
                                   'java': '// Implement the required solution in Java.',
                                   'cpp': '// Implement the required solution in C++.',
                                   'javascript': '// Implement the required solution in '
                                                 'JavaScript.',
                                   'c': '/* Implement the required solution in C. */',
                                   'kotlin': '// Implement the required solution in Kotlin.'},
                   'solutions': {'python': 'def edit_distance(word1, word2):\n'
                                           '    prev = list(range(len(word2) + 1))\n'
                                           '    for i, a in enumerate(word1, 1):\n'
                                           '        cur = [i]\n'
                                           '        for j, b in enumerate(word2, 1):\n'
                                           '            if a == b:\n'
                                           '                cur.append(prev[j - 1])\n'
                                           '            else:\n'
                                           '                cur.append(1 + min(prev[j], cur[j - '
                                           '1], prev[j - 1]))\n'
                                           '        prev = cur\n'
                                           '    return prev[-1]'}},
 'Serialize and Deserialize Binary Tree': {'examples': [{'input': 'See the problem statement for a '
                                                                  'representative input.',
                                                         'output': 'The original binary tree after '
                                                                   'serialization and '
                                                                   'deserialization.',
                                                         'explanation': 'Design an algorithm to '
                                                                        'serialize a binary tree '
                                                                        'into a string and '
                                                                        'deserialize the string '
                                                                        'back into the original '
                                                                        'tree.'}],
                                           'constraints': ['Use the input format described in the '
                                                           'problem statement.',
                                                           'Handle edge cases and the stated '
                                                           'limits efficiently.'],
                                           'hints': ['Focus on the Trees technique.',
                                                     'Choose an approach whose time and space '
                                                     'complexity fit the constraints.',
                                                     'Test boundary cases before submitting.'],
                                           'test_cases': [{'input': "Use the problem statement's "
                                                                    'sample input.',
                                                           'output': 'The original binary tree '
                                                                     'after serialization and '
                                                                     'deserialization.'}],
                                           'boilerplate': {'python': 'def serialize(root):\n'
                                                                     '    pass\n'
                                                                     '\n'
                                                                     'def deserialize(data):\n'
                                                                     '    pass',
                                                           'java': '// Implement the required '
                                                                   'solution in Java.',
                                                           'cpp': '// Implement the required '
                                                                  'solution in C++.',
                                                           'javascript': '// Implement the '
                                                                         'required solution in '
                                                                         'JavaScript.',
                                                           'c': '/* Implement the required '
                                                                'solution in C. */',
                                                           'kotlin': '// Implement the required '
                                                                     'solution in Kotlin.'},
                                           'solutions': {'python': 'class Codec:\n'
                                                                   '    def serialize(self, '
                                                                   'root):\n'
                                                                   '        if root is None:\n'
                                                                   '            return "#"\n'
                                                                   '        return '
                                                                   'f"{root.val},{self.serialize(root.left)},{self.serialize(root.right)}"\n'
                                                                   '\n'
                                                                   '    def deserialize(self, '
                                                                   'data):\n'
                                                                   '        values = '
                                                                   'iter(data.split(","))\n'
                                                                   '\n'
                                                                   '        def build():\n'
                                                                   '            value = '
                                                                   'next(values)\n'
                                                                   '            if value == "#":\n'
                                                                   '                return None\n'
                                                                   '            node = '
                                                                   'TreeNode(int(value))\n'
                                                                   '            node.left = '
                                                                   'build()\n'
                                                                   '            node.right = '
                                                                   'build()\n'
                                                                   '            return node\n'
                                                                   '\n'
                                                                   '        return build()'}},
 'Fizz Buzz': {'examples': [{'input': 'See the problem statement for a representative input.',
                             'output': 'List containing the required Fizz/Buzz representations.',
                             'explanation': 'For numbers from 1 to n, return Fizz for multiples of '
                                            '3, Buzz for multiples of 5, and FizzBuzz for '
                                            'multiples of both.'}],
               'constraints': ['Use the input format described in the problem statement.',
                               'Handle edge cases and the stated limits efficiently.'],
               'hints': ['Focus on the Arrays technique.',
                         'Choose an approach whose time and space complexity fit the constraints.',
                         'Test boundary cases before submitting.'],
               'test_cases': [{'input': "Use the problem statement's sample input.",
                               'output': 'List containing the required Fizz/Buzz '
                                         'representations.'}],
               'boilerplate': {'python': 'def fizz_buzz(n):\n'
                                         '    # Write your solution here\n'
                                         '    pass',
                               'java': '// Implement the required solution in Java.',
                               'cpp': '// Implement the required solution in C++.',
                               'javascript': '// Implement the required solution in JavaScript.',
                               'c': '/* Implement the required solution in C. */',
                               'kotlin': '// Implement the required solution in Kotlin.'},
               'solutions': {'python': 'def fizz_buzz(n):\n'
                                       '    result = []\n'
                                       '    for i in range(1, n + 1):\n'
                                       '        if i % 15 == 0:\n'
                                       '            result.append("FizzBuzz")\n'
                                       '        elif i % 3 == 0:\n'
                                       '            result.append("Fizz")\n'
                                       '        elif i % 5 == 0:\n'
                                       '            result.append("Buzz")\n'
                                       '        else:\n'
                                       '            result.append(str(i))\n'
                                       '    return result'}},
 'Move Zeroes': {'examples': [{'input': 'See the problem statement for a representative input.',
                               'output': 'The modified array with all zeroes at the end.',
                               'explanation': 'Move all zeroes in an array to the end while '
                                              'maintaining the relative order of non-zero '
                                              'elements.'}],
                 'constraints': ['Use the input format described in the problem statement.',
                                 'Handle edge cases and the stated limits efficiently.'],
                 'hints': ['Focus on the Arrays technique.',
                           'Choose an approach whose time and space complexity fit the '
                           'constraints.',
                           'Test boundary cases before submitting.'],
                 'test_cases': [{'input': "Use the problem statement's sample input.",
                                 'output': 'The modified array with all zeroes at the end.'}],
                 'boilerplate': {'python': 'def move_zeroes(nums):\n'
                                           '    # Write your solution here\n'
                                           '    pass',
                                 'java': '// Implement the required solution in Java.',
                                 'cpp': '// Implement the required solution in C++.',
                                 'javascript': '// Implement the required solution in JavaScript.',
                                 'c': '/* Implement the required solution in C. */',
                                 'kotlin': '// Implement the required solution in Kotlin.'},
                 'solutions': {'python': 'def move_zeroes(nums):\n'
                                         '    write = 0\n'
                                         '    for x in nums:\n'
                                         '        if x != 0:\n'
                                         '            nums[write] = x\n'
                                         '            write += 1\n'
                                         '    while write < len(nums):\n'
                                         '        nums[write] = 0\n'
                                         '        write += 1\n'
                                         '    return nums'}},
 'Best Time to Buy and Sell Stock': {'examples': [{'input': 'See the problem statement for a '
                                                            'representative input.',
                                                   'output': 'Maximum possible profit.',
                                                   'explanation': 'Given daily stock prices, find '
                                                                  'the maximum profit possible '
                                                                  'from one buy and one sell.'}],
                                     'constraints': ['Use the input format described in the '
                                                     'problem statement.',
                                                     'Handle edge cases and the stated limits '
                                                     'efficiently.'],
                                     'hints': ['Focus on the Arrays technique.',
                                               'Choose an approach whose time and space complexity '
                                               'fit the constraints.',
                                               'Test boundary cases before submitting.'],
                                     'test_cases': [{'input': "Use the problem statement's sample "
                                                              'input.',
                                                     'output': 'Maximum possible profit.'}],
                                     'boilerplate': {'python': 'def max_profit(prices):\n'
                                                               '    # Write your solution here\n'
                                                               '    pass',
                                                     'java': '// Implement the required solution '
                                                             'in Java.',
                                                     'cpp': '// Implement the required solution in '
                                                            'C++.',
                                                     'javascript': '// Implement the required '
                                                                   'solution in JavaScript.',
                                                     'c': '/* Implement the required solution in '
                                                          'C. */',
                                                     'kotlin': '// Implement the required solution '
                                                               'in Kotlin.'},
                                     'solutions': {'python': 'def max_profit(prices):\n'
                                                             '    minimum = float("inf")\n'
                                                             '    answer = 0\n'
                                                             '    for price in prices:\n'
                                                             '        minimum = min(minimum, '
                                                             'price)\n'
                                                             '        answer = max(answer, price - '
                                                             'minimum)\n'
                                                             '    return answer'}},
 'Palindrome Number': {'examples': [{'input': 'See the problem statement for a representative '
                                              'input.',
                                     'output': 'True if the number is a palindrome.',
                                     'explanation': 'Determine whether an integer reads the same '
                                                    'forward and backward.'}],
                       'constraints': ['Use the input format described in the problem statement.',
                                       'Handle edge cases and the stated limits efficiently.'],
                       'hints': ['Focus on the Math technique.',
                                 'Choose an approach whose time and space complexity fit the '
                                 'constraints.',
                                 'Test boundary cases before submitting.'],
                       'test_cases': [{'input': "Use the problem statement's sample input.",
                                       'output': 'True if the number is a palindrome.'}],
                       'boilerplate': {'python': 'def is_palindrome(x):\n'
                                                 '    # Write your solution here\n'
                                                 '    pass',
                                       'java': '// Implement the required solution in Java.',
                                       'cpp': '// Implement the required solution in C++.',
                                       'javascript': '// Implement the required solution in '
                                                     'JavaScript.',
                                       'c': '/* Implement the required solution in C. */',
                                       'kotlin': '// Implement the required solution in Kotlin.'},
                       'solutions': {'python': 'def is_palindrome(x):\n'
                                               '    if x < 0:\n'
                                               '        return False\n'
                                               '    s = str(x)\n'
                                               '    return s == s[::-1]'}},
 'Subarray Sum Equals K': {'examples': [{'input': 'See the problem statement for a representative '
                                                  'input.',
                                         'output': 'Number of continuous subarrays whose sum '
                                                   'equals k.',
                                         'explanation': 'Given an integer array nums and integer '
                                                        'k, return the total number of continuous '
                                                        'subarrays whose sum equals k.'}],
                           'constraints': ['Use the input format described in the problem '
                                           'statement.',
                                           'Handle edge cases and the stated limits efficiently.'],
                           'hints': ['Focus on the Prefix Sum technique.',
                                     'Choose an approach whose time and space complexity fit the '
                                     'constraints.',
                                     'Test boundary cases before submitting.'],
                           'test_cases': [{'input': "Use the problem statement's sample input.",
                                           'output': 'Number of continuous subarrays whose sum '
                                                     'equals k.'}],
                           'boilerplate': {'python': 'def subarray_sum(nums, k):\n'
                                                     '    # Write your solution here\n'
                                                     '    pass',
                                           'java': '// Implement the required solution in Java.',
                                           'cpp': '// Implement the required solution in C++.',
                                           'javascript': '// Implement the required solution in '
                                                         'JavaScript.',
                                           'c': '/* Implement the required solution in C. */',
                                           'kotlin': '// Implement the required solution in '
                                                     'Kotlin.'},
                           'solutions': {'python': 'def subarray_sum(nums, k):\n'
                                                   '    prefix_counts = {0: 1}\n'
                                                   '    prefix = answer = 0\n'
                                                   '    for x in nums:\n'
                                                   '        prefix += x\n'
                                                   '        answer += prefix_counts.get(prefix - '
                                                   'k, 0)\n'
                                                   '        prefix_counts[prefix] = '
                                                   'prefix_counts.get(prefix, 0) + 1\n'
                                                   '    return answer'}},
 'Top K Frequent Elements': {'examples': [{'input': 'See the problem statement for a '
                                                    'representative input.',
                                           'output': 'The k most frequent elements.',
                                           'explanation': 'Given an integer array, return the k '
                                                          'most frequent elements.'}],
                             'constraints': ['Use the input format described in the problem '
                                             'statement.',
                                             'Handle edge cases and the stated limits '
                                             'efficiently.'],
                             'hints': ['Focus on the Heap technique.',
                                       'Choose an approach whose time and space complexity fit the '
                                       'constraints.',
                                       'Test boundary cases before submitting.'],
                             'test_cases': [{'input': "Use the problem statement's sample input.",
                                             'output': 'The k most frequent elements.'}],
                             'boilerplate': {'python': 'def top_k_frequent(nums, k):\n'
                                                       '    # Write your solution here\n'
                                                       '    pass',
                                             'java': '// Implement the required solution in Java.',
                                             'cpp': '// Implement the required solution in C++.',
                                             'javascript': '// Implement the required solution in '
                                                           'JavaScript.',
                                             'c': '/* Implement the required solution in C. */',
                                             'kotlin': '// Implement the required solution in '
                                                       'Kotlin.'},
                             'solutions': {'python': 'from collections import Counter\n'
                                                     '\n'
                                                     'def top_k_frequent(nums, k):\n'
                                                     '    return [x for x, _ in '
                                                     'Counter(nums).most_common(k)]'}},
 'Number of Islands': {'examples': [{'input': 'See the problem statement for a representative '
                                              'input.',
                                     'output': 'Number of connected islands.',
                                     'explanation': 'Given a 2D grid containing land and water, '
                                                    'count the number of distinct islands.'}],
                       'constraints': ['Use the input format described in the problem statement.',
                                       'Handle edge cases and the stated limits efficiently.'],
                       'hints': ['Focus on the Graphs technique.',
                                 'Choose an approach whose time and space complexity fit the '
                                 'constraints.',
                                 'Test boundary cases before submitting.'],
                       'test_cases': [{'input': "Use the problem statement's sample input.",
                                       'output': 'Number of connected islands.'}],
                       'boilerplate': {'python': 'def num_islands(grid):\n'
                                                 '    # Write your solution here\n'
                                                 '    pass',
                                       'java': '// Implement the required solution in Java.',
                                       'cpp': '// Implement the required solution in C++.',
                                       'javascript': '// Implement the required solution in '
                                                     'JavaScript.',
                                       'c': '/* Implement the required solution in C. */',
                                       'kotlin': '// Implement the required solution in Kotlin.'},
                       'solutions': {'python': 'def num_islands(grid):\n'
                                               '    if not grid:\n'
                                               '        return 0\n'
                                               '    rows, cols = len(grid), len(grid[0])\n'
                                               '    islands = 0\n'
                                               '    for r in range(rows):\n'
                                               '        for c in range(cols):\n'
                                               '            if grid[r][c] != "1":\n'
                                               '                continue\n'
                                               '            islands += 1\n'
                                               '            stack = [(r, c)]\n'
                                               '            grid[r][c] = "0"\n'
                                               '            while stack:\n'
                                               '                x, y = stack.pop()\n'
                                               '                for dx, dy in '
                                               '((1,0),(-1,0),(0,1),(0,-1)):\n'
                                               '                    nx, ny = x + dx, y + dy\n'
                                               '                    if 0 <= nx < rows and 0 <= ny '
                                               '< cols and grid[nx][ny] == "1":\n'
                                               '                        grid[nx][ny] = "0"\n'
                                               '                        stack.append((nx, ny))\n'
                                               '    return islands'}},
 'Course Schedule': {'examples': [{'input': 'See the problem statement for a representative input.',
                                   'output': 'True if all courses can be completed.',
                                   'explanation': 'Given courses and prerequisite relationships, '
                                                  'determine whether all courses can be '
                                                  'completed.'}],
                     'constraints': ['Use the input format described in the problem statement.',
                                     'Handle edge cases and the stated limits efficiently.'],
                     'hints': ['Focus on the Graphs technique.',
                               'Choose an approach whose time and space complexity fit the '
                               'constraints.',
                               'Test boundary cases before submitting.'],
                     'test_cases': [{'input': "Use the problem statement's sample input.",
                                     'output': 'True if all courses can be completed.'}],
                     'boilerplate': {'python': 'def can_finish(num_courses, prerequisites):\n'
                                               '    # Write your solution here\n'
                                               '    pass',
                                     'java': '// Implement the required solution in Java.',
                                     'cpp': '// Implement the required solution in C++.',
                                     'javascript': '// Implement the required solution in '
                                                   'JavaScript.',
                                     'c': '/* Implement the required solution in C. */',
                                     'kotlin': '// Implement the required solution in Kotlin.'},
                     'solutions': {'python': 'from collections import deque\n'
                                             '\n'
                                             'def can_finish(num_courses, prerequisites):\n'
                                             '    graph = [[] for _ in range(num_courses)]\n'
                                             '    indegree = [0] * num_courses\n'
                                             '    for course, prerequisite in prerequisites:\n'
                                             '        graph[prerequisite].append(course)\n'
                                             '        indegree[course] += 1\n'
                                             '\n'
                                             '    queue = deque(i for i in range(num_courses) if '
                                             'indegree[i] == 0)\n'
                                             '    completed = 0\n'
                                             '\n'
                                             '    while queue:\n'
                                             '        course = queue.popleft()\n'
                                             '        completed += 1\n'
                                             '        for nxt in graph[course]:\n'
                                             '            indegree[nxt] -= 1\n'
                                             '            if indegree[nxt] == 0:\n'
                                             '                queue.append(nxt)\n'
                                             '\n'
                                             '    return completed == num_courses'}},
 'LRU Cache': {'examples': [{'input': 'See the problem statement for a representative input.',
                             'output': 'Correct LRU cache behaviour.',
                             'explanation': 'Design a data structure supporting get and put '
                                            'operations while evicting the least recently used '
                                            'item.'}],
               'constraints': ['Use the input format described in the problem statement.',
                               'Handle edge cases and the stated limits efficiently.'],
               'hints': ['Focus on the Hashing technique.',
                         'Choose an approach whose time and space complexity fit the constraints.',
                         'Test boundary cases before submitting.'],
               'test_cases': [{'input': "Use the problem statement's sample input.",
                               'output': 'Correct LRU cache behaviour.'}],
               'boilerplate': {'python': 'class LRUCache:\n'
                                         '    def __init__(self, capacity):\n'
                                         '        pass\n'
                                         '\n'
                                         '    def get(self, key):\n'
                                         '        pass\n'
                                         '\n'
                                         '    def put(self, key, value):\n'
                                         '        pass',
                               'java': '// Implement the required solution in Java.',
                               'cpp': '// Implement the required solution in C++.',
                               'javascript': '// Implement the required solution in JavaScript.',
                               'c': '/* Implement the required solution in C. */',
                               'kotlin': '// Implement the required solution in Kotlin.'},
               'solutions': {'python': 'from collections import OrderedDict\n'
                                       '\n'
                                       'class LRUCache:\n'
                                       '    def __init__(self, capacity):\n'
                                       '        self.capacity = capacity\n'
                                       '        self.cache = OrderedDict()\n'
                                       '\n'
                                       '    def get(self, key):\n'
                                       '        if key not in self.cache:\n'
                                       '            return -1\n'
                                       '        self.cache.move_to_end(key)\n'
                                       '        return self.cache[key]\n'
                                       '\n'
                                       '    def put(self, key, value):\n'
                                       '        if key in self.cache:\n'
                                       '            self.cache.move_to_end(key)\n'
                                       '        self.cache[key] = value\n'
                                       '        if len(self.cache) > self.capacity:\n'
                                       '            self.cache.popitem(last=False)'}},
 'Coin Change': {'examples': [{'input': 'See the problem statement for a representative input.',
                               'output': 'Minimum number of coins or -1 if impossible.',
                               'explanation': 'Given coin denominations and a target amount, '
                                              'return the minimum number of coins required to make '
                                              'that amount.'}],
                 'constraints': ['Use the input format described in the problem statement.',
                                 'Handle edge cases and the stated limits efficiently.'],
                 'hints': ['Focus on the Dynamic Programming technique.',
                           'Choose an approach whose time and space complexity fit the '
                           'constraints.',
                           'Test boundary cases before submitting.'],
                 'test_cases': [{'input': "Use the problem statement's sample input.",
                                 'output': 'Minimum number of coins or -1 if impossible.'}],
                 'boilerplate': {'python': 'def coin_change(coins, amount):\n'
                                           '    # Write your solution here\n'
                                           '    pass',
                                 'java': '// Implement the required solution in Java.',
                                 'cpp': '// Implement the required solution in C++.',
                                 'javascript': '// Implement the required solution in JavaScript.',
                                 'c': '/* Implement the required solution in C. */',
                                 'kotlin': '// Implement the required solution in Kotlin.'},
                 'solutions': {'python': 'def coin_change(coins, amount):\n'
                                         '    dp = [amount + 1] * (amount + 1)\n'
                                         '    dp[0] = 0\n'
                                         '    for current in range(1, amount + 1):\n'
                                         '        for coin in coins:\n'
                                         '            if coin <= current:\n'
                                         '                dp[current] = min(dp[current], '
                                         'dp[current - coin] + 1)\n'
                                         '    return -1 if dp[amount] > amount else dp[amount]'}},
 'Median of Two Sorted Arrays': {'examples': [{'input': 'See the problem statement for a '
                                                        'representative input.',
                                               'output': 'Median of the two sorted arrays.',
                                               'explanation': 'Given two sorted arrays, find their '
                                                              'median in logarithmic time '
                                                              'complexity.'}],
                                 'constraints': ['Use the input format described in the problem '
                                                 'statement.',
                                                 'Handle edge cases and the stated limits '
                                                 'efficiently.'],
                                 'hints': ['Focus on the Binary Search technique.',
                                           'Choose an approach whose time and space complexity fit '
                                           'the constraints.',
                                           'Test boundary cases before submitting.'],
                                 'test_cases': [{'input': "Use the problem statement's sample "
                                                          'input.',
                                                 'output': 'Median of the two sorted arrays.'}],
                                 'boilerplate': {'python': 'def find_median(nums1, nums2):\n'
                                                           '    # Write your solution here\n'
                                                           '    pass',
                                                 'java': '// Implement the required solution in '
                                                         'Java.',
                                                 'cpp': '// Implement the required solution in '
                                                        'C++.',
                                                 'javascript': '// Implement the required solution '
                                                               'in JavaScript.',
                                                 'c': '/* Implement the required solution in C. */',
                                                 'kotlin': '// Implement the required solution in '
                                                           'Kotlin.'},
                                 'solutions': {'python': 'def find_median(nums1, nums2):\n'
                                                         '    if len(nums1) > len(nums2):\n'
                                                         '        nums1, nums2 = nums2, nums1\n'
                                                         '\n'
                                                         '    m, n = len(nums1), len(nums2)\n'
                                                         '    low, high = 0, m\n'
                                                         '\n'
                                                         '    while low <= high:\n'
                                                         '        i = (low + high) // 2\n'
                                                         '        j = (m + n + 1) // 2 - i\n'
                                                         '\n'
                                                         '        left1 = float("-inf") if i == 0 '
                                                         'else nums1[i - 1]\n'
                                                         '        right1 = float("inf") if i == m '
                                                         'else nums1[i]\n'
                                                         '        left2 = float("-inf") if j == 0 '
                                                         'else nums2[j - 1]\n'
                                                         '        right2 = float("inf") if j == n '
                                                         'else nums2[j]\n'
                                                         '\n'
                                                         '        if left1 <= right2 and left2 <= '
                                                         'right1:\n'
                                                         '            if (m + n) % 2:\n'
                                                         '                return max(left1, '
                                                         'left2)\n'
                                                         '            return (max(left1, left2) + '
                                                         'min(right1, right2)) / 2\n'
                                                         '\n'
                                                         '        if left1 > right2:\n'
                                                         '            high = i - 1\n'
                                                         '        else:\n'
                                                         '            low = i + 1\n'
                                                         '\n'
                                                         '    raise ValueError("Invalid sorted '
                                                         'arrays")'}},
 'Maximum Path Sum in Binary Tree': {'examples': [{'input': 'See the problem statement for a '
                                                            'representative input.',
                                                   'output': 'Maximum sum obtainable from any '
                                                             'valid tree path.',
                                                   'explanation': 'Find the maximum path sum in a '
                                                                  'binary tree. A path may start '
                                                                  'and end at any nodes.'}],
                                     'constraints': ['Use the input format described in the '
                                                     'problem statement.',
                                                     'Handle edge cases and the stated limits '
                                                     'efficiently.'],
                                     'hints': ['Focus on the Trees technique.',
                                               'Choose an approach whose time and space complexity '
                                               'fit the constraints.',
                                               'Test boundary cases before submitting.'],
                                     'test_cases': [{'input': "Use the problem statement's sample "
                                                              'input.',
                                                     'output': 'Maximum sum obtainable from any '
                                                               'valid tree path.'}],
                                     'boilerplate': {'python': 'def max_path_sum(root):\n'
                                                               '    # Write your solution here\n'
                                                               '    pass',
                                                     'java': '// Implement the required solution '
                                                             'in Java.',
                                                     'cpp': '// Implement the required solution in '
                                                            'C++.',
                                                     'javascript': '// Implement the required '
                                                                   'solution in JavaScript.',
                                                     'c': '/* Implement the required solution in '
                                                          'C. */',
                                                     'kotlin': '// Implement the required solution '
                                                               'in Kotlin.'},
                                     'solutions': {'python': 'def max_path_sum(root):\n'
                                                             '    answer = float("-inf")\n'
                                                             '\n'
                                                             '    def dfs(node):\n'
                                                             '        nonlocal answer\n'
                                                             '        if node is None:\n'
                                                             '            return 0\n'
                                                             '        left = max(0, '
                                                             'dfs(node.left))\n'
                                                             '        right = max(0, '
                                                             'dfs(node.right))\n'
                                                             '        answer = max(answer, '
                                                             'node.val + left + right)\n'
                                                             '        return node.val + max(left, '
                                                             'right)\n'
                                                             '\n'
                                                             '    dfs(root)\n'
                                                             '    return answer'}},
 'Regular Expression Matching': {'examples': [{'input': 'See the problem statement for a '
                                                        'representative input.',
                                               'output': 'True if the complete string matches the '
                                                         'pattern.',
                                               'explanation': 'Implement regular expression '
                                                              "matching supporting '.' and '*'."}],
                                 'constraints': ['Use the input format described in the problem '
                                                 'statement.',
                                                 'Handle edge cases and the stated limits '
                                                 'efficiently.'],
                                 'hints': ['Focus on the Dynamic Programming technique.',
                                           'Choose an approach whose time and space complexity fit '
                                           'the constraints.',
                                           'Test boundary cases before submitting.'],
                                 'test_cases': [{'input': "Use the problem statement's sample "
                                                          'input.',
                                                 'output': 'True if the complete string matches '
                                                           'the pattern.'}],
                                 'boilerplate': {'python': 'def is_match(s, pattern):\n'
                                                           '    # Write your solution here\n'
                                                           '    pass',
                                                 'java': '// Implement the required solution in '
                                                         'Java.',
                                                 'cpp': '// Implement the required solution in '
                                                        'C++.',
                                                 'javascript': '// Implement the required solution '
                                                               'in JavaScript.',
                                                 'c': '/* Implement the required solution in C. */',
                                                 'kotlin': '// Implement the required solution in '
                                                           'Kotlin.'},
                                 'solutions': {'python': 'from functools import lru_cache\n'
                                                         '\n'
                                                         'def is_match(s, pattern):\n'
                                                         '    @lru_cache(None)\n'
                                                         '    def dp(i, j):\n'
                                                         '        if j == len(pattern):\n'
                                                         '            return i == len(s)\n'
                                                         '\n'
                                                         '        first = i < len(s) and '
                                                         'pattern[j] in (s[i], ".")\n'
                                                         '\n'
                                                         '        if j + 1 < len(pattern) and '
                                                         'pattern[j + 1] == "*":\n'
                                                         '            return dp(i, j + 2) or '
                                                         '(first and dp(i + 1, j))\n'
                                                         '\n'
                                                         '        return first and dp(i + 1, j + '
                                                         '1)\n'
                                                         '\n'
                                                         '    return dp(0, 0)'}},
 'Word Search': {'examples': [{'input': 'See the problem statement for a representative input.',
                               'output': 'True if the word can be formed in the grid.',
                               'explanation': 'Given a 2D board of characters and a word, '
                                              'determine whether the word exists in the grid.'}],
                 'constraints': ['Use the input format described in the problem statement.',
                                 'Handle edge cases and the stated limits efficiently.'],
                 'hints': ['Focus on the Backtracking technique.',
                           'Choose an approach whose time and space complexity fit the '
                           'constraints.',
                           'Test boundary cases before submitting.'],
                 'test_cases': [{'input': "Use the problem statement's sample input.",
                                 'output': 'True if the word can be formed in the grid.'}],
                 'boilerplate': {'python': 'def word_search(board, word):\n'
                                           '    # Write your solution here\n'
                                           '    pass',
                                 'java': '// Implement the required solution in Java.',
                                 'cpp': '// Implement the required solution in C++.',
                                 'javascript': '// Implement the required solution in JavaScript.',
                                 'c': '/* Implement the required solution in C. */',
                                 'kotlin': '// Implement the required solution in Kotlin.'},
                 'solutions': {'python': 'def word_search(board, word):\n'
                                         '    if not board:\n'
                                         '        return False\n'
                                         '\n'
                                         '    rows, cols = len(board), len(board[0])\n'
                                         '\n'
                                         '    def dfs(r, c, index):\n'
                                         '        if index == len(word):\n'
                                         '            return True\n'
                                         '        if r < 0 or r >= rows or c < 0 or c >= cols:\n'
                                         '            return False\n'
                                         '        if board[r][c] != word[index]:\n'
                                         '            return False\n'
                                         '\n'
                                         '        original = board[r][c]\n'
                                         '        board[r][c] = "#"\n'
                                         '\n'
                                         '        found = (\n'
                                         '            dfs(r + 1, c, index + 1)\n'
                                         '            or dfs(r - 1, c, index + 1)\n'
                                         '            or dfs(r, c + 1, index + 1)\n'
                                         '            or dfs(r, c - 1, index + 1)\n'
                                         '        )\n'
                                         '\n'
                                         '        board[r][c] = original\n'
                                         '        return found\n'
                                         '\n'
                                         '    for r in range(rows):\n'
                                         '        for c in range(cols):\n'
                                         '            if dfs(r, c, 0):\n'
                                         '                return True\n'
                                         '    return False'}}}


# =========================================================
# SEED FUNCTION
# =========================================================

def seed_questions():

    db: Session = SessionLocal()

    inserted = 0
    updated = 0
    skipped = 0

    try:

        for question_data in QUESTIONS:

            title = question_data["title"]
            company = question_data["company"]

            existing = (
                db.query(CodingProblem)
                .filter(
                    CodingProblem.title == title,
                    CodingProblem.company == company
                )
                .first()
            )

            # Every one of the 33 QUESTION rows has a DETAILS entry.
            detail = DETAILS.get(title)

            if existing:

                existing.description = question_data["description"]
                existing.difficulty = question_data["difficulty"]
                existing.topic = question_data["topic"]
                existing.starter_code = question_data["starter_code"]
                existing.expected_output = question_data["expected_output"]
                existing.time_limit = question_data["time_limit"]
                existing.xp = question_data["xp"]

                if detail:

                    existing.examples = json.dumps(
                        detail.get("examples", [])
                    )

                    existing.constraints = json.dumps(
                        detail.get("constraints", [])
                    )

                    existing.hints = json.dumps(
                        detail.get("hints", [])
                    )

                    existing.test_cases = json.dumps(
                        detail.get("test_cases", [])
                    )

                    existing.boilerplate = json.dumps(
                        detail.get("boilerplate", {})
                    )

                    existing.solutions = json.dumps(
                        detail.get("solutions", {})
                    )

                    updated += 1

                else:
                    skipped += 1

                continue

            # =================================================
            # NEW PROBLEM
            # =================================================

            new_problem = CodingProblem(
                **question_data
            )

            if detail:

                new_problem.examples = json.dumps(
                    detail.get("examples", [])
                )

                new_problem.constraints = json.dumps(
                    detail.get("constraints", [])
                )

                new_problem.hints = json.dumps(
                    detail.get("hints", [])
                )

                new_problem.test_cases = json.dumps(
                    detail.get("test_cases", [])
                )

                new_problem.boilerplate = json.dumps(
                    detail.get("boilerplate", {})
                )

                new_problem.solutions = json.dumps(
                    detail.get("solutions", {})
                )

            db.add(new_problem)
            inserted += 1

        db.commit()

        print(f"Inserted {inserted} new coding problems.")
        print(f"Updated {updated} existing coding problems.")
        print(f"Skipped {skipped} problems without detailed content.")
        print(f"Seed dataset size: {len(QUESTIONS)}")

    except Exception:

        db.rollback()
        raise

    finally:

        db.close()


if __name__ == "__main__":
    seed_questions()