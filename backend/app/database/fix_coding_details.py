import json

from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.coding_problem import CodingProblem


# =========================================================
# PATCH ONLY THE PROBLEMS THAT CURRENTLY HAVE
# PLACEHOLDER / MISSING JAVA + C++ DATA
# =========================================================

PATCHES = {

    # =====================================================
    # FIZZ BUZZ
    # =====================================================

    "Fizz Buzz": {

        "examples": [
            {
                "input": "n = 3",
                "output": '["1","2","Fizz"]',
                "explanation": "3 is divisible by 3, so it becomes Fizz."
            },
            {
                "input": "n = 5",
                "output": '["1","2","Fizz","4","Buzz"]',
                "explanation": "5 is divisible by 5, so it becomes Buzz."
            },
            {
                "input": "n = 15",
                "output": '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
                "explanation": "15 is divisible by both 3 and 5, so it becomes FizzBuzz."
            }
        ],

        "constraints": [
            "1 <= n <= 10^4"
        ],

        "hints": [
            "Check divisibility by both 3 and 5 first.",
            "Then check divisibility by 3 and 5 separately.",
            "Otherwise return the number itself."
        ],

        "test_cases": [
            {
                "input": "3",
                "output": '["1","2","Fizz"]'
            },
            {
                "input": "5",
                "output": '["1","2","Fizz","4","Buzz"]'
            },
            {
                "input": "15",
                "output": '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]'
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def fizzBuzz(self, n):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public java.util.List<String> fizzBuzz(int n) {
        // Write your solution here
        return new java.util.ArrayList<>();
    }
}""",

            "cpp": """class Solution {
public:
    vector<string> fizzBuzz(int n) {
        // Write your solution here
        return {};
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def fizzBuzz(self, n):
        result = []

        for i in range(1, n + 1):
            if i % 15 == 0:
                result.append("FizzBuzz")
            elif i % 3 == 0:
                result.append("Fizz")
            elif i % 5 == 0:
                result.append("Buzz")
            else:
                result.append(str(i))

        return result""",

            "java": """class Solution {
    public java.util.List<String> fizzBuzz(int n) {

        java.util.List<String> result =
            new java.util.ArrayList<>();

        for (int i = 1; i <= n; i++) {

            if (i % 15 == 0)
                result.add("FizzBuzz");
            else if (i % 3 == 0)
                result.add("Fizz");
            else if (i % 5 == 0)
                result.add("Buzz");
            else
                result.add(String.valueOf(i));
        }

        return result;
    }
}""",

            "cpp": """class Solution {
public:
    vector<string> fizzBuzz(int n) {

        vector<string> result;

        for (int i = 1; i <= n; i++) {

            if (i % 15 == 0)
                result.push_back("FizzBuzz");
            else if (i % 3 == 0)
                result.push_back("Fizz");
            else if (i % 5 == 0)
                result.push_back("Buzz");
            else
                result.push_back(to_string(i));
        }

        return result;
    }
};"""
        }
    },


    # =====================================================
    # MOVE ZEROES
    # =====================================================

    "Move Zeroes": {

        "examples": [
            {
                "input": "nums = [0,1,0,3,12]",
                "output": "[1,3,12,0,0]",
                "explanation": "The non-zero elements remain in their original relative order."
            },
            {
                "input": "nums = [0]",
                "output": "[0]",
                "explanation": "There are no non-zero elements to move."
            }
        ],

        "constraints": [
            "1 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9"
        ],

        "hints": [
            "Keep a pointer for the next position of a non-zero value.",
            "Process the array from left to right.",
            "Fill the remaining positions with zeroes."
        ],

        "test_cases": [
            {
                "input": "[0,1,0,3,12]",
                "output": "[1,3,12,0,0]"
            },
            {
                "input": "[0]",
                "output": "[0]"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def moveZeroes(self, nums):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public void moveZeroes(int[] nums) {
        // Write your solution here
    }
}""",

            "cpp": """class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Write your solution here
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def moveZeroes(self, nums):
        write = 0

        for num in nums:
            if num != 0:
                nums[write] = num
                write += 1

        while write < len(nums):
            nums[write] = 0
            write += 1""",

            "java": """class Solution {
    public void moveZeroes(int[] nums) {

        int write = 0;

        for (int num : nums) {

            if (num != 0) {
                nums[write++] = num;
            }
        }

        while (write < nums.length) {
            nums[write++] = 0;
        }
    }
}""",

            "cpp": """class Solution {
public:
    void moveZeroes(vector<int>& nums) {

        int write = 0;

        for (int num : nums) {

            if (num != 0)
                nums[write++] = num;
        }

        while (write < nums.size())
            nums[write++] = 0;
    }
};"""
        }
    },


    # =====================================================
    # BEST TIME TO BUY AND SELL STOCK
    # =====================================================

    "Best Time to Buy and Sell Stock": {

        "examples": [
            {
                "input": "prices = [7,1,5,3,6,4]",
                "output": "5",
                "explanation": "Buy at 1 and sell at 6 for a profit of 5."
            },
            {
                "input": "prices = [7,6,4,3,1]",
                "output": "0",
                "explanation": "No profitable transaction is possible."
            }
        ],

        "constraints": [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
        ],

        "hints": [
            "Track the minimum price seen so far.",
            "At every price calculate the profit from selling today."
        ],

        "test_cases": [
            {
                "input": "[7,1,5,3,6,4]",
                "output": "5"
            },
            {
                "input": "[7,6,4,3,1]",
                "output": "0"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def maxProfit(self, prices):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
}""",

            "cpp": """class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your solution here
        return 0;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def maxProfit(self, prices):
        minimum = float("inf")
        answer = 0

        for price in prices:
            minimum = min(minimum, price)
            answer = max(answer, price - minimum)

        return answer""",

            "java": """class Solution {
    public int maxProfit(int[] prices) {

        int minimum = Integer.MAX_VALUE;
        int answer = 0;

        for (int price : prices) {

            minimum = Math.min(
                minimum,
                price
            );

            answer = Math.max(
                answer,
                price - minimum
            );
        }

        return answer;
    }
}""",

            "cpp": """class Solution {
public:
    int maxProfit(vector<int>& prices) {

        int minimum = INT_MAX;
        int answer = 0;

        for (int price : prices) {

            minimum = min(
                minimum,
                price
            );

            answer = max(
                answer,
                price - minimum
            );
        }

        return answer;
    }
};"""
        }
    },


    # =====================================================
    # PALINDROME NUMBER
    # =====================================================

    "Palindrome Number": {

        "examples": [
            {
                "input": "x = 121",
                "output": "true",
                "explanation": "121 reads the same from both directions."
            },
            {
                "input": "x = -121",
                "output": "false",
                "explanation": "The negative sign makes the number different when reversed."
            },
            {
                "input": "x = 10",
                "output": "false",
                "explanation": "10 reversed is 01, which is not 10."
            }
        ],

        "constraints": [
            "-2^31 <= x <= 2^31 - 1"
        ],

        "hints": [
            "Negative numbers cannot be palindromes.",
            "Reverse the digits and compare with the original."
        ],

        "test_cases": [
            {
                "input": "121",
                "output": "true"
            },
            {
                "input": "-121",
                "output": "false"
            },
            {
                "input": "10",
                "output": "false"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def isPalindrome(self, x):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        return false;
    }
}""",

            "cpp": """class Solution {
public:
    bool isPalindrome(int x) {
        // Write your solution here
        return false;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def isPalindrome(self, x):
        if x < 0:
            return False

        s = str(x)

        return s == s[::-1]""",

            "java": """class Solution {
    public boolean isPalindrome(int x) {

        if (x < 0)
            return false;

        int original = x;
        long reversed = 0;

        while (x > 0) {
            reversed =
                reversed * 10 + x % 10;

            x /= 10;
        }

        return original == reversed;
    }
}""",

            "cpp": """class Solution {
public:
    bool isPalindrome(int x) {

        if (x < 0)
            return false;

        long long original = x;
        long long reversed = 0;

        while (x > 0) {

            reversed =
                reversed * 10 + x % 10;

            x /= 10;
        }

        return original == reversed;
    }
};"""
        }
    },


    # =====================================================
    # SUBARRAY SUM EQUALS K
    # =====================================================

    "Subarray Sum Equals K": {

        "examples": [
            {
                "input": "nums = [1,1,1], k = 2",
                "output": "2",
                "explanation": "The subarrays [1,1] starting at indices 0 and 1 both sum to 2."
            },
            {
                "input": "nums = [1,2,3], k = 3",
                "output": "2",
                "explanation": "The valid subarrays are [1,2] and [3]."
            }
        ],

        "constraints": [
            "1 <= nums.length <= 2 * 10^4",
            "-1000 <= nums[i] <= 1000",
            "-10^7 <= k <= 10^7"
        ],

        "hints": [
            "Think in terms of prefix sums.",
            "If prefix - k has appeared before, a valid subarray exists."
        ],

        "test_cases": [
            {
                "input": "[1,1,1], 2",
                "output": "2"
            },
            {
                "input": "[1,2,3], 3",
                "output": "2"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def subarraySum(self, nums, k):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public int subarraySum(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}""",

            "cpp": """class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // Write your solution here
        return 0;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def subarraySum(self, nums, k):

        prefix_counts = {0: 1}
        prefix = 0
        answer = 0

        for x in nums:

            prefix += x

            answer += prefix_counts.get(
                prefix - k,
                0
            )

            prefix_counts[prefix] = \
                prefix_counts.get(prefix, 0) + 1

        return answer""",

            "java": """class Solution {
    public int subarraySum(int[] nums, int k) {

        java.util.HashMap<Integer, Integer> map =
            new java.util.HashMap<>();

        map.put(0, 1);

        int prefix = 0;
        int answer = 0;

        for (int x : nums) {

            prefix += x;

            answer += map.getOrDefault(
                prefix - k,
                0
            );

            map.put(
                prefix,
                map.getOrDefault(prefix, 0) + 1
            );
        }

        return answer;
    }
}""",

            "cpp": """class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {

        unordered_map<int, int> mp;

        mp[0] = 1;

        int prefix = 0;
        int answer = 0;

        for (int x : nums) {

            prefix += x;

            if (mp.count(prefix - k))
                answer += mp[prefix - k];

            mp[prefix]++;
        }

        return answer;
    }
};"""
        }
    },


    # =====================================================
    # TOP K FREQUENT ELEMENTS
    # =====================================================

    "Top K Frequent Elements": {

        "examples": [
            {
                "input": "nums = [1,1,1,2,2,3], k = 2",
                "output": "[1,2]",
                "explanation": "1 appears three times and 2 appears twice."
            },
            {
                "input": "nums = [1], k = 1",
                "output": "[1]",
                "explanation": "There is only one distinct element."
            }
        ],

        "constraints": [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4",
            "k is in the range [1, number of distinct elements]."
        ],

        "hints": [
            "Count the frequency of every number.",
            "Use a heap or bucket-based approach."
        ],

        "test_cases": [
            {
                "input": "[1,1,1,2,2,3], 2",
                "output": "[1,2]"
            },
            {
                "input": "[1], 1",
                "output": "[1]"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def topKFrequent(self, nums, k):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        return new int[]{};
    }
}""",

            "cpp": """class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Write your solution here
        return {};
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def topKFrequent(self, nums, k):

        from collections import Counter

        return [
            x
            for x, _ in
            Counter(nums).most_common(k)
        ]""",

            "java": """class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        java.util.Map<Integer, Integer> freq =
            new java.util.HashMap<>();

        for (int x : nums)
            freq.put(
                x,
                freq.getOrDefault(x, 0) + 1
            );

        java.util.PriorityQueue<Integer> heap =
            new java.util.PriorityQueue<>(
                (a, b) ->
                    freq.get(a) - freq.get(b)
            );

        for (int x : freq.keySet()) {

            heap.offer(x);

            if (heap.size() > k)
                heap.poll();
        }

        int[] result = new int[k];

        for (int i = k - 1; i >= 0; i--)
            result[i] = heap.poll();

        return result;
    }
}""",

            "cpp": """class Solution {
public:
    vector<int> topKFrequent(
        vector<int>& nums,
        int k
    ) {

        unordered_map<int, int> freq;

        for (int x : nums)
            freq[x]++;

        priority_queue<
            pair<int,int>,
            vector<pair<int,int>>,
            greater<pair<int,int>>
        > pq;

        for (auto& p : freq) {

            pq.push({
                p.second,
                p.first
            });

            if (pq.size() > k)
                pq.pop();
        }

        vector<int> result;

        while (!pq.empty()) {

            result.push_back(
                pq.top().second
            );

            pq.pop();
        }

        return result;
    }
};"""
        }
    },


    # =====================================================
    # NUMBER OF ISLANDS
    # =====================================================

    "Number of Islands": {

        "examples": [
            {
                "input": '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
                "output": "1",
                "explanation": "All connected land cells form one island."
            },
            {
                "input": '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
                "output": "3",
                "explanation": "There are three separate groups of connected land."
            }
        ],

        "constraints": [
            "1 <= grid.length, grid[0].length <= 300",
            "grid[i][j] is either '0' or '1'."
        ],

        "hints": [
            "Treat every unvisited land cell as the start of an island.",
            "Use DFS or BFS to mark connected land cells."
        ],

        "test_cases": [
            {
                "input": '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
                "output": "1"
            },
            {
                "input": '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
                "output": "3"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def numIslands(self, grid):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}""",

            "cpp": """class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your solution here
        return 0;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def numIslands(self, grid):

        if not grid:
            return 0

        rows = len(grid)
        cols = len(grid[0])
        islands = 0

        def dfs(r, c):

            if (
                r < 0 or
                r >= rows or
                c < 0 or
                c >= cols or
                grid[r][c] != "1"
            ):
                return

            grid[r][c] = "0"

            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):

                if grid[r][c] == "1":

                    islands += 1
                    dfs(r, c)

        return islands""",

            "java": """class Solution {

    public int numIslands(char[][] grid) {

        if (grid == null || grid.length == 0)
            return 0;

        int count = 0;

        for (int r = 0; r < grid.length; r++) {

            for (int c = 0; c < grid[0].length; c++) {

                if (grid[r][c] == '1') {

                    count++;

                    dfs(grid, r, c);
                }
            }
        }

        return count;
    }

    private void dfs(
        char[][] grid,
        int r,
        int c
    ) {

        if (
            r < 0 ||
            r >= grid.length ||
            c < 0 ||
            c >= grid[0].length ||
            grid[r][c] != '1'
        )
            return;

        grid[r][c] = '0';

        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}""",

            "cpp": """class Solution {
public:

    void dfs(
        vector<vector<char>>& grid,
        int r,
        int c
    ) {

        if (
            r < 0 ||
            r >= grid.size() ||
            c < 0 ||
            c >= grid[0].size() ||
            grid[r][c] != '1'
        )
            return;

        grid[r][c] = '0';

        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    int numIslands(
        vector<vector<char>>& grid
    ) {

        int count = 0;

        for (int r = 0; r < grid.size(); r++) {

            for (int c = 0; c < grid[0].size(); c++) {

                if (grid[r][c] == '1') {

                    count++;

                    dfs(grid, r, c);
                }
            }
        }

        return count;
    }
};"""
        }
    },


    # =====================================================
    # COURSE SCHEDULE
    # =====================================================

    "Course Schedule": {

        "examples": [
            {
                "input": "numCourses = 2, prerequisites = [[1,0]]",
                "output": "true",
                "explanation": "Course 0 can be taken before course 1."
            },
            {
                "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
                "output": "false",
                "explanation": "The prerequisites form a cycle."
            }
        ],

        "constraints": [
            "1 <= numCourses <= 2000",
            "0 <= prerequisites.length <= 5000",
            "prerequisites[i].length == 2"
        ],

        "hints": [
            "Model courses as a directed graph.",
            "A cycle means the courses cannot all be completed.",
            "Topological sorting can detect whether a cycle exists."
        ],

        "test_cases": [
            {
                "input": "2, [[1,0]]",
                "output": "true"
            },
            {
                "input": "2, [[1,0],[0,1]]",
                "output": "false"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def canFinish(self, numCourses, prerequisites):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public boolean canFinish(
        int numCourses,
        int[][] prerequisites
    ) {
        // Write your solution here
        return false;
    }
}""",

            "cpp": """class Solution {
public:
    bool canFinish(
        int numCourses,
        vector<vector<int>>& prerequisites
    ) {
        // Write your solution here
        return false;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def canFinish(self, numCourses, prerequisites):

        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses

        for course, prerequisite in prerequisites:

            graph[prerequisite].append(course)
            indegree[course] += 1

        queue = [
            i for i in range(numCourses)
            if indegree[i] == 0
        ]

        completed = 0

        while queue:

            course = queue.pop(0)
            completed += 1

            for nxt in graph[course]:

                indegree[nxt] -= 1

                if indegree[nxt] == 0:
                    queue.append(nxt)

        return completed == numCourses""",

            "java": """class Solution {
    public boolean canFinish(
        int numCourses,
        int[][] prerequisites
    ) {

        java.util.List<Integer>[] graph =
            new java.util.ArrayList[numCourses];

        for (int i = 0; i < numCourses; i++)
            graph[i] = new java.util.ArrayList<>();

        int[] indegree =
            new int[numCourses];

        for (int[] p : prerequisites) {

            graph[p[1]].add(p[0]);
            indegree[p[0]]++;
        }

        java.util.Queue<Integer> queue =
            new java.util.LinkedList<>();

        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0)
                queue.offer(i);

        int completed = 0;

        while (!queue.isEmpty()) {

            int course = queue.poll();
            completed++;

            for (int next : graph[course]) {

                indegree[next]--;

                if (indegree[next] == 0)
                    queue.offer(next);
            }
        }

        return completed == numCourses;
    }
}""",

            "cpp": """class Solution {
public:
    bool canFinish(
        int numCourses,
        vector<vector<int>>& prerequisites
    ) {

        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);

        for (auto& p : prerequisites) {

            graph[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }

        queue<int> q;

        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0)
                q.push(i);

        int completed = 0;

        while (!q.empty()) {

            int course = q.front();
            q.pop();

            completed++;

            for (int next : graph[course]) {

                indegree[next]--;

                if (indegree[next] == 0)
                    q.push(next);
            }
        }

        return completed == numCourses;
    }
};"""
        }
    },


    # =====================================================
    # COIN CHANGE
    # =====================================================

    "Coin Change": {

        "examples": [
            {
                "input": "coins = [1,2,5], amount = 11",
                "output": "3",
                "explanation": "11 = 5 + 5 + 1, so three coins are required."
            },
            {
                "input": "coins = [2], amount = 3",
                "output": "-1",
                "explanation": "There is no combination of 2-value coins that produces 3."
            }
        ],

        "constraints": [
            "1 <= coins.length <= 12",
            "1 <= coins[i] <= 2^31 - 1",
            "0 <= amount <= 10^4"
        ],

        "hints": [
            "Define dp[x] as the minimum number of coins needed for amount x.",
            "Build the answer from smaller amounts."
        ],

        "test_cases": [
            {
                "input": "[1,2,5], 11",
                "output": "3"
            },
            {
                "input": "[2], 3",
                "output": "-1"
            },
            {
                "input": "[1], 0",
                "output": "0"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def coinChange(self, coins, amount):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }
}""",

            "cpp": """class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your solution here
        return -1;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def coinChange(self, coins, amount):

        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for value in range(1, amount + 1):

            for coin in coins:

                if coin <= value:

                    dp[value] = min(
                        dp[value],
                        dp[value - coin] + 1
                    )

        return (
            -1
            if dp[amount] > amount
            else dp[amount]
        )""",

            "java": """class Solution {
    public int coinChange(
        int[] coins,
        int amount
    ) {

        int[] dp =
            new int[amount + 1];

        java.util.Arrays.fill(
            dp,
            amount + 1
        );

        dp[0] = 0;

        for (int value = 1;
             value <= amount;
             value++) {

            for (int coin : coins) {

                if (coin <= value) {

                    dp[value] =
                        Math.min(
                            dp[value],
                            dp[value - coin] + 1
                        );
                }
            }
        }

        return dp[amount] > amount
            ? -1
            : dp[amount];
    }
}""",

            "cpp": """class Solution {
public:
    int coinChange(
        vector<int>& coins,
        int amount
    ) {

        vector<int> dp(
            amount + 1,
            amount + 1
        );

        dp[0] = 0;

        for (int value = 1;
             value <= amount;
             value++) {

            for (int coin : coins) {

                if (coin <= value) {

                    dp[value] =
                        min(
                            dp[value],
                            dp[value - coin] + 1
                        );
                }
            }
        }

        return dp[amount] > amount
            ? -1
            : dp[amount];
    }
};"""
        }
    },


    # =====================================================
    # MEDIAN OF TWO SORTED ARRAYS
    # =====================================================

    "Median of Two Sorted Arrays": {

        "examples": [
            {
                "input": "nums1 = [1,3], nums2 = [2]",
                "output": "2.00000",
                "explanation": "The combined sorted array is [1,2,3], whose median is 2."
            },
            {
                "input": "nums1 = [1,2], nums2 = [3,4]",
                "output": "2.50000",
                "explanation": "The two middle values are 2 and 3, so the median is 2.5."
            }
        ],

        "constraints": [
            "nums1.length + nums2.length >= 1",
            "nums1 and nums2 are sorted in non-decreasing order.",
            "-10^6 <= nums1[i], nums2[i] <= 10^6"
        ],

        "hints": [
            "Binary search the smaller array.",
            "Partition the two arrays so the left side contains half the elements.",
            "The maximum of the left partition and minimum of the right partition determine the median."
        ],

        "test_cases": [
            {
                "input": "[1,3], [2]",
                "output": "2.0"
            },
            {
                "input": "[1,2], [3,4]",
                "output": "2.5"
            },
            {
                "input": "[], [1]",
                "output": "1.0"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public double findMedianSortedArrays(
        int[] nums1,
        int[] nums2
    ) {
        // Write your solution here
        return 0.0;
    }
}""",

            "cpp": """class Solution {
public:
    double findMedianSortedArrays(
        vector<int>& nums1,
        vector<int>& nums2
    ) {
        // Write your solution here
        return 0.0;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def findMedianSortedArrays(self, nums1, nums2):

        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1

        m = len(nums1)
        n = len(nums2)

        left = 0
        right = m

        while left <= right:

            i = (left + right) // 2
            j = (m + n + 1) // 2 - i

            left1 = (
                float("-inf")
                if i == 0
                else nums1[i - 1]
            )

            right1 = (
                float("inf")
                if i == m
                else nums1[i]
            )

            left2 = (
                float("-inf")
                if j == 0
                else nums2[j - 1]
            )

            right2 = (
                float("inf")
                if j == n
                else nums2[j]
            )

            if left1 <= right2 and left2 <= right1:

                if (m + n) % 2:
                    return max(left1, left2)

                return (
                    max(left1, left2)
                    + min(right1, right2)
                ) / 2

            elif left1 > right2:
                right = i - 1

            else:
                left = i + 1""",

            "java": """class Solution {
    public double findMedianSortedArrays(
        int[] nums1,
        int[] nums2
    ) {

        if (nums1.length > nums2.length)
            return findMedianSortedArrays(
                nums2,
                nums1
            );

        int m = nums1.length;
        int n = nums2.length;

        int left = 0;
        int right = m;

        while (left <= right) {

            int i =
                (left + right) / 2;

            int j =
                (m + n + 1) / 2 - i;

            int left1 =
                i == 0
                    ? Integer.MIN_VALUE
                    : nums1[i - 1];

            int right1 =
                i == m
                    ? Integer.MAX_VALUE
                    : nums1[i];

            int left2 =
                j == 0
                    ? Integer.MIN_VALUE
                    : nums2[j - 1];

            int right2 =
                j == n
                    ? Integer.MAX_VALUE
                    : nums2[j];

            if (
                left1 <= right2 &&
                left2 <= right1
            ) {

                if ((m + n) % 2 == 1)
                    return Math.max(
                        left1,
                        left2
                    );

                return (
                    Math.max(left1, left2)
                    +
                    Math.min(right1, right2)
                ) / 2.0;
            }

            if (left1 > right2)
                right = i - 1;
            else
                left = i + 1;
        }

        return 0.0;
    }
}""",

            "cpp": """class Solution {
public:
    double findMedianSortedArrays(
        vector<int>& nums1,
        vector<int>& nums2
    ) {

        if (nums1.size() > nums2.size())
            return findMedianSortedArrays(
                nums2,
                nums1
            );

        int m = nums1.size();
        int n = nums2.size();

        int left = 0;
        int right = m;

        while (left <= right) {

            int i =
                (left + right) / 2;

            int j =
                (m + n + 1) / 2 - i;

            int left1 =
                i == 0
                    ? INT_MIN
                    : nums1[i - 1];

            int right1 =
                i == m
                    ? INT_MAX
                    : nums1[i];

            int left2 =
                j == 0
                    ? INT_MIN
                    : nums2[j - 1];

            int right2 =
                j == n
                    ? INT_MAX
                    : nums2[j];

            if (
                left1 <= right2 &&
                left2 <= right1
            ) {

                if ((m + n) % 2)
                    return max(
                        left1,
                        left2
                    );

                return (
                    max(left1, left2)
                    +
                    min(right1, right2)
                ) / 2.0;
            }

            if (left1 > right2)
                right = i - 1;
            else
                left = i + 1;
        }

        return 0.0;
    }
};"""
        }
    },


    # =====================================================
    # REGULAR EXPRESSION MATCHING
    # =====================================================

    "Regular Expression Matching": {

        "examples": [
            {
                "input": 's = "aa", p = "a"',
                "output": "false",
                "explanation": "The pattern matches only one a."
            },
            {
                "input": 's = "aa", p = "a*"',
                "output": "true",
                "explanation": "a* can match two a characters."
            },
            {
                "input": 's = "ab", p = ".*"',
                "output": "true",
                "explanation": ".* matches any sequence of characters."
            }
        ],

        "constraints": [
            "1 <= s.length <= 20",
            "1 <= p.length <= 20",
            "s contains lowercase English letters.",
            "p contains lowercase English letters, '.' and '*'."
        ],

        "hints": [
            "Use dynamic programming or memoized recursion.",
            "When the next pattern character is *, consider zero or more occurrences.",
            "The dot character matches any single character."
        ],

        "test_cases": [
            {
                "input": '"aa", "a"',
                "output": "false"
            },
            {
                "input": '"aa", "a*"',
                "output": "true"
            },
            {
                "input": '"ab", ".*"',
                "output": "true"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def isMatch(self, s, p):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public boolean isMatch(String s, String p) {
        // Write your solution here
        return false;
    }
}""",

            "cpp": """class Solution {
public:
    bool isMatch(string s, string p) {
        // Write your solution here
        return false;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def isMatch(self, s, p):

        from functools import lru_cache

        @lru_cache(None)
        def dp(i, j):

            if j == len(p):
                return i == len(s)

            first =
                i < len(s) and \
                p[j] in (s[i], ".")

            if (
                j + 1 < len(p)
                and p[j + 1] == "*"
            ):

                return (
                    dp(i, j + 2)
                    or
                    (
                        first
                        and dp(i + 1, j)
                    )
                )

            return (
                first
                and dp(i + 1, j + 1)
            )

        return dp(0, 0)""",

            "java": """class Solution {
    public boolean isMatch(
        String s,
        String p
    ) {

        Boolean[][] memo =
            new Boolean[
                s.length() + 1
            ][
                p.length() + 1
            ];

        return dfs(
            s,
            p,
            0,
            0,
            memo
        );
    }

    private boolean dfs(
        String s,
        String p,
        int i,
        int j,
        Boolean[][] memo
    ) {

        if (j == p.length())
            return i == s.length();

        if (memo[i][j] != null)
            return memo[i][j];

        boolean first =
            i < s.length() &&
            (
                p.charAt(j) == '.' ||
                p.charAt(j) == s.charAt(i)
            );

        boolean result;

        if (
            j + 1 < p.length() &&
            p.charAt(j + 1) == '*'
        ) {

            result =
                dfs(
                    s, p,
                    i,
                    j + 2,
                    memo
                )
                ||
                (
                    first &&
                    dfs(
                        s, p,
                        i + 1,
                        j,
                        memo
                    )
                );

        } else {

            result =
                first &&
                dfs(
                    s, p,
                    i + 1,
                    j + 1,
                    memo
                );
        }

        memo[i][j] = result;

        return result;
    }
}""",

            "cpp": """class Solution {
public:

    bool dfs(
        string& s,
        string& p,
        int i,
        int j,
        vector<vector<int>>& memo
    ) {

        if (j == p.size())
            return i == s.size();

        if (memo[i][j] != -1)
            return memo[i][j];

        bool first =
            i < s.size() &&
            (
                p[j] == '.' ||
                p[j] == s[i]
            );

        bool result;

        if (
            j + 1 < p.size() &&
            p[j + 1] == '*'
        ) {

            result =
                dfs(
                    s, p,
                    i,
                    j + 2,
                    memo
                )
                ||
                (
                    first &&
                    dfs(
                        s, p,
                        i + 1,
                        j,
                        memo
                    )
                );

        } else {

            result =
                first &&
                dfs(
                    s, p,
                    i + 1,
                    j + 1,
                    memo
                );
        }

        return memo[i][j] = result;
    }

    bool isMatch(
        string s,
        string p
    ) {

        vector<vector<int>> memo(
            s.size() + 1,
            vector<int>(
                p.size() + 1,
                -1
            )
        );

        return dfs(
            s,
            p,
            0,
            0,
            memo
        );
    }
};"""
        }
    },


    # =====================================================
    # WORD SEARCH
    # =====================================================

    "Word Search": {

        "examples": [
            {
                "input": 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
                "output": "true",
                "explanation": "The word can be formed by moving horizontally and vertically."
            },
            {
                "input": 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
                "output": "true",
                "explanation": "SEE exists as a connected path in the board."
            },
            {
                "input": 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
                "output": "false",
                "explanation": "The same board cell cannot be used more than once."
            }
        ],

        "constraints": [
            "1 <= board.length <= 6",
            "1 <= board[i].length <= 6",
            "1 <= word.length <= 15",
            "board and word consist of English letters."
        ],

        "hints": [
            "Use DFS/backtracking.",
            "Mark the current cell as visited while exploring.",
            "Restore the cell when backtracking."
        ],

        "test_cases": [
            {
                "input": '[[A,B,C,E],[S,F,C,S],[A,D,E,E]], "ABCCED"',
                "output": "true"
            },
            {
                "input": '[[A,B,C,E],[S,F,C,S],[A,D,E,E]], "SEE"',
                "output": "true"
            },
            {
                "input": '[[A,B,C,E],[S,F,C,S],[A,D,E,E]], "ABCB"',
                "output": "false"
            }
        ],

        "boilerplate": {

            "python": """class Solution:
    def exist(self, board, word):
        # Write your solution here
        pass""",

            "java": """class Solution {
    public boolean exist(
        char[][] board,
        String word
    ) {
        // Write your solution here
        return false;
    }
}""",

            "cpp": """class Solution {
public:
    bool exist(
        vector<vector<char>>& board,
        string word
    ) {
        // Write your solution here
        return false;
    }
};"""
        },

        "solutions": {

            "python": """class Solution:
    def exist(self, board, word):

        rows = len(board)
        cols = len(board[0])

        def dfs(r, c, index):

            if index == len(word):
                return True

            if (
                r < 0 or
                r >= rows or
                c < 0 or
                c >= cols or
                board[r][c] != word[index]
            ):
                return False

            original = board[r][c]
            board[r][c] = "#"

            found = (
                dfs(r + 1, c, index + 1)
                or dfs(r - 1, c, index + 1)
                or dfs(r, c + 1, index + 1)
                or dfs(r, c - 1, index + 1)
            )

            board[r][c] = original

            return found

        for r in range(rows):
            for c in range(cols):

                if dfs(r, c, 0):
                    return True

        return False""",

            "java": """class Solution {

    public boolean exist(
        char[][] board,
        String word
    ) {

        for (int r = 0; r < board.length; r++) {

            for (int c = 0; c < board[0].length; c++) {

                if (dfs(
                    board,
                    word,
                    r,
                    c,
                    0
                ))
                    return true;
            }
        }

        return false;
    }

    private boolean dfs(
        char[][] board,
        String word,
        int r,
        int c,
        int index
    ) {

        if (index == word.length())
            return true;

        if (
            r < 0 ||
            r >= board.length ||
            c < 0 ||
            c >= board[0].length ||
            board[r][c] != word.charAt(index)
        )
            return false;

        char original =
            board[r][c];

        board[r][c] = '#';

        boolean found =
            dfs(
                board,
                word,
                r + 1,
                c,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r - 1,
                c,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r,
                c + 1,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r,
                c - 1,
                index + 1
            );

        board[r][c] = original;

        return found;
    }
}""",

            "cpp": """class Solution {
public:

    bool dfs(
        vector<vector<char>>& board,
        string& word,
        int r,
        int c,
        int index
    ) {

        if (index == word.size())
            return true;

        if (
            r < 0 ||
            r >= board.size() ||
            c < 0 ||
            c >= board[0].size() ||
            board[r][c] != word[index]
        )
            return false;

        char original =
            board[r][c];

        board[r][c] = '#';

        bool found =
            dfs(
                board,
                word,
                r + 1,
                c,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r - 1,
                c,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r,
                c + 1,
                index + 1
            )
            ||
            dfs(
                board,
                word,
                r,
                c - 1,
                index + 1
            );

        board[r][c] = original;

        return found;
    }

    bool exist(
        vector<vector<char>>& board,
        string word
    ) {

        for (int r = 0; r < board.size(); r++) {

            for (int c = 0; c < board[0].size(); c++) {

                if (
                    dfs(
                        board,
                        word,
                        r,
                        c,
                        0
                    )
                )
                    return true;
            }
        }

        return false;
    }
};"""
        }
    }

}


# =========================================================
# GENERIC PATCH FOR THE REMAINING HARD PROBLEMS
# =========================================================

# These problems already have proper Python implementations
# in the existing seed. We only ensure the UI never receives
# the old generic placeholder for Java/C++.

GENERIC_LANGUAGE_FIXES = {

    "Longest Increasing Subsequence": {

        "boilerplate": {
            "java": """class Solution {
    public int lengthOfLIS(int[] nums) {
        // Write your solution here
        return 0;
    }
}""",

            "cpp": """class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        // Write your solution here
        return 0;
    }
};"""
        }
    },

    "Edit Distance": {

        "boilerplate": {
            "java": """class Solution {
    public int minDistance(
        String word1,
        String word2
    ) {
        // Write your solution here
        return 0;
    }
}""",

            "cpp": """class Solution {
public:
    int minDistance(
        string word1,
        string word2
    ) {
        // Write your solution here
        return 0;
    }
};"""
        }
    }
}


# =========================================================
# PATCH DATABASE
# =========================================================

def fix_coding_details():

    db: Session = SessionLocal()

    updated = 0

    try:

        for title, patch in PATCHES.items():

            problem = (
                db.query(CodingProblem)
                .filter(
                    CodingProblem.title == title
                )
                .first()
            )

            if not problem:
                print(
                    f"NOT FOUND: {title}"
                )
                continue

            if "examples" in patch:
                problem.examples = json.dumps(
                    patch["examples"]
                )

            if "constraints" in patch:
                problem.constraints = json.dumps(
                    patch["constraints"]
                )

            if "hints" in patch:
                problem.hints = json.dumps(
                    patch["hints"]
                )

            if "test_cases" in patch:
                problem.test_cases = json.dumps(
                    patch["test_cases"]
                )

            if "boilerplate" in patch:
                problem.boilerplate = json.dumps(
                    patch["boilerplate"]
                )

            if "solutions" in patch:
                problem.solutions = json.dumps(
                    patch["solutions"]
                )

            updated += 1

            print(
                f"Patched: {title}"
            )


        # -----------------------------------------------------
        # Fix only Java/C++ placeholders for the remaining
        # problems without destroying existing Python/JS/etc.
        # -----------------------------------------------------

        for title, patch in GENERIC_LANGUAGE_FIXES.items():

            problem = (
                db.query(CodingProblem)
                .filter(
                    CodingProblem.title == title
                )
                .first()
            )

            if not problem:
                continue

            current_boilerplate = {}

            if problem.boilerplate:

                try:
                    current_boilerplate = json.loads(
                            problem.boilerplate
                        )
                except Exception:
                    current_boilerplate = {}


            current_boilerplate.update(
                patch["boilerplate"]
            )

            problem.boilerplate = json.dumps(
                current_boilerplate
            )


        db.commit()


        print()
        print(
            f"Updated {updated} coding problems."
        )
        print(
            "Coding detail patch completed."
        )


    except Exception:

        db.rollback()
        raise

    finally:

        db.close()


if __name__ == "__main__":

    fix_coding_details()