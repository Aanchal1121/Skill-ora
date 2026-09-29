// assessmentData.js
// Predefined role-specific dummy assessment questions with MCQs, scenario-based, and practical questions.

export const ROLE_ASSESSMENTS = {
  "Data Scientist / Analyst": {
    roleName: "Data Analyst / Scientist",
    skills: ["SQL", "Python", "Excel", "Power BI", "Statistics", "Communication"],
    questions: [
      // --- SQL QUESTIONS ---
      {
        id: "q-sql-1",
        skill: "SQL",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which SQL clause is used to filter records AFTER an aggregation operation using GROUP BY?",
        options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
        correctIndex: 1,
        topic: "Aggregation & Grouping",
        explanation: "HAVING clause is specifically designed to filter groups created by GROUP BY, whereas WHERE filters rows before grouping."
      },
      {
        id: "q-sql-2",
        skill: "SQL",
        type: "mcq",
        difficulty: "Intermediate",
        question: "What type of JOIN returns all records from the left table, and matching records from the right table?",
        options: ["INNER JOIN", "LEFT (OUTER) JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correctIndex: 1,
        topic: "Table Joins",
        explanation: "LEFT JOIN retrieves all rows from the left table, matching rows from the right table, and NULLs for non-matching right rows."
      },
      {
        id: "q-sql-3",
        skill: "SQL",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: You need to calculate the running total of sales for each employee ordered by sale date. Which SQL feature should you use?",
        options: ["Window Function (SUM() OVER (...))", "NESTED GROUP BY", "SELF JOIN with WHERE", "UNION ALL"],
        correctIndex: 0,
        topic: "Window Functions",
        explanation: "SUM(sales) OVER (PARTITION BY employee_id ORDER BY sale_date) calculates running totals efficiently without collapsing rows."
      },
      {
        id: "q-sql-4",
        skill: "SQL",
        type: "practical",
        difficulty: "Advanced",
        question: "Practical: Given a table `orders (id, customer_id, amount, order_date)`, which query finds top 3 spending customers?",
        options: [
          "SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 3;",
          "SELECT customer_id FROM orders WHERE amount = MAX(amount) LIMIT 3;",
          "SELECT TOP 3 customer_id FROM orders ORDER BY amount;",
          "SELECT DISTINCT customer_id FROM orders HAVING SUM(amount) DESC LIMIT 3;"
        ],
        correctIndex: 0,
        topic: "Data Analysis Queries",
        explanation: "Grouping by customer_id and ordering SUM(amount) descending with LIMIT 3 gives top 3 spenders."
      },
      {
        id: "q-sql-5",
        skill: "SQL",
        type: "mcq",
        difficulty: "Advanced",
        question: "What is the primary benefit of creating a database INDEX on a frequently queried column?",
        options: ["Decreases storage space", "Speeds up SELECT retrieval queries", "Accelerates INSERT statement speed", "Enforces foreign key constraints"],
        correctIndex: 1,
        topic: "Database Indexing & Performance",
        explanation: "Indexes create B-Tree lookup structures that dramatically speed up read queries at the cost of slightly slower writes."
      },

      // --- PYTHON QUESTIONS ---
      {
        id: "q-py-1",
        skill: "Python",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which Python data structure is immutable and ordered?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correctIndex: 2,
        topic: "Data Structures",
        explanation: "Tuples are ordered collections of items that cannot be modified after creation."
      },
      {
        id: "q-py-2",
        skill: "Python",
        type: "practical",
        difficulty: "Intermediate",
        question: "In Pandas, how do you handle missing (NaN) values by replacing them with the column mean?",
        options: [
          "df['col'].fillna(df['col'].mean(), inplace=True)",
          "df['col'].replaceAll(df['col'].avg())",
          "df['col'].dropNulls()",
          "df['col'].value_counts()"
        ],
        correctIndex: 0,
        topic: "Pandas Data Cleaning",
        explanation: "df['col'].fillna(df['col'].mean()) substitutes NaN values with the computed arithmetic mean."
      },
      {
        id: "q-py-3",
        skill: "Python",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: You have a CSV with 5 million rows and low memory. What Pandas parameter helps read it in chunks?",
        options: ["chunksize", "batch_size", "memory_limit", "max_rows"],
        correctIndex: 0,
        topic: "Pandas Performance",
        explanation: "pd.read_csv('file.csv', chunksize=100000) iterates through large datasets in chunks to save RAM."
      },
      {
        id: "q-py-4",
        skill: "Python",
        type: "mcq",
        difficulty: "Advanced",
        question: "Which library is primary for numerical array operations and vectorized calculations in Python?",
        options: ["NumPy", "Flask", "BeautifulSoup", "Matplotlib"],
        correctIndex: 0,
        topic: "Numerical Python",
        explanation: "NumPy provides C-optimized ndarrays for lightning-fast numerical and matrix math."
      },

      // --- EXCEL QUESTIONS ---
      {
        id: "q-xl-1",
        skill: "Excel",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which formula searches for a value in the first column of a table and returns a value in the same row from a specified column?",
        options: ["VLOOKUP", "COUNTIF", "SUMIFS", "CONCATENATE"],
        correctIndex: 0,
        topic: "Lookup Functions",
        explanation: "VLOOKUP searches vertically in the first column and fetches corresponding row values."
      },
      {
        id: "q-xl-2",
        skill: "Excel",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: You need to aggregate total revenue only for region 'West' where order status is 'Delivered'. Which function should you use?",
        options: ["SUMIF", "SUMIFS", "VLOOKUP", "AVERAGEIF"],
        correctIndex: 1,
        topic: "Conditional Aggregation",
        explanation: "SUMIFS allows multiple condition criteria (Region='West' AND Status='Delivered')."
      },
      {
        id: "q-xl-3",
        skill: "Excel",
        type: "practical",
        difficulty: "Advanced",
        question: "Practical: Which modern Excel combination is more flexible than VLOOKUP because it doesn't require the lookup column to be on the left?",
        options: ["INDEX + MATCH (or XLOOKUP)", "HLOOKUP + IF", "PIVOT + COUNT", "TEXTJOIN + SEARCH"],
        correctIndex: 0,
        topic: "Advanced Excel Lookups",
        explanation: "INDEX(MATCH()) or XLOOKUP can look left or right regardless of column position."
      },

      // --- POWER BI QUESTIONS ---
      {
        id: "q-pbi-1",
        skill: "Power BI",
        type: "mcq",
        difficulty: "Beginner",
        question: "What language is primarily used in Power BI to write custom calculated columns and measures?",
        options: ["DAX (Data Analysis Expressions)", "M Language", "SQL", "VBA"],
        correctIndex: 0,
        topic: "DAX Formulas",
        explanation: "DAX is the formula expression language used in Power BI Desktop for measures and calculated columns."
      },
      {
        id: "q-pbi-2",
        skill: "Power BI",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: You want to calculate Total Sales regardless of any user filters applied to Product Category on the visual. Which DAX function removes filters?",
        options: ["CALCULATE(..., ALL(Products))", "FILTER(..., REMOVE())", "SUMX(Products)", "LOOKUPVALUE()"],
        correctIndex: 0,
        topic: "Filter Context & DAX",
        explanation: "CALCULATE(SUM(Sales), ALL(Products)) clears the filter context on Products table."
      },

      // --- STATISTICS QUESTIONS ---
      {
        id: "q-stat-1",
        skill: "Statistics",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which measure of central tendency is LEAST affected by extreme outliers in a dataset?",
        options: ["Mean", "Median", "Mode", "Variance"],
        correctIndex: 1,
        topic: "Descriptive Statistics",
        explanation: "Median represents the middle value and is robust against extreme high/low skew outliers."
      },
      {
        id: "q-stat-2",
        skill: "Statistics",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: In A/B testing a new website feature, a p-value of 0.03 is obtained with threshold alpha = 0.05. What is the conclusion?",
        options: ["Reject the null hypothesis (statistically significant)", "Fail to reject null hypothesis", "Sample size is invalid", "Feature has 3% success rate"],
        correctIndex: 0,
        topic: "Hypothesis Testing & p-values",
        explanation: "p-value (0.03) < alpha (0.05) indicates significant evidence to reject the null hypothesis."
      },

      // --- COMMUNICATION QUESTIONS ---
      {
        id: "q-comm-1",
        skill: "Communication",
        type: "scenario",
        difficulty: "Beginner",
        question: "Scenario: When presenting complex data analysis to non-technical business stakeholders, what is the best approach?",
        options: [
          "Focus on actionable business insights and visual charts, minimizing technical jargon",
          "Show raw SQL code and data transformation logs",
          "Use complex statistical formulas to prove rigor",
          "Provide 100-page unformatted spreadsheets"
        ],
        correctIndex: 0,
        topic: "Data Storytelling & Stakeholder Engagement",
        explanation: "Translating data findings into business impact and intuitive charts drives effective decision making."
      }
    ]
  },

  "Java Backend Developer": {
    roleName: "Java Backend Developer",
    skills: ["Java Fundamentals", "Object-Oriented Programming", "Data Structures", "Exception Handling", "SQL", "Problem Solving"],
    questions: [
      {
        id: "q-j-1",
        skill: "Java Fundamentals",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which of the following is NOT a primitive data type in Java?",
        options: ["int", "boolean", "String", "double"],
        correctIndex: 2,
        topic: "Java Data Types",
        explanation: "String is a class object in Java, whereas int, boolean, and double are primitive types."
      },
      {
        id: "q-j-2",
        skill: "Object-Oriented Programming",
        type: "mcq",
        difficulty: "Intermediate",
        question: "Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its parent class?",
        options: ["Method Overloading", "Method Overriding", "Encapsulation", "Abstraction"],
        correctIndex: 1,
        topic: "Polymorphism & Overriding",
        explanation: "Method Overriding occurs when a child class redefines a parent class method with identical signature."
      },
      {
        id: "q-j-3",
        skill: "Data Structures",
        type: "scenario",
        difficulty: "Intermediate",
        question: "Scenario: You need a Java Collection that stores key-value pairs with O(1) average time complexity for lookup. Which class should you use?",
        options: ["ArrayList", "HashMap", "LinkedList", "TreeSet"],
        correctIndex: 1,
        topic: "Java Collections Framework",
        explanation: "HashMap provides hash-table based key-value storage with fast O(1) average get/put operations."
      },
      {
        id: "q-j-4",
        skill: "Exception Handling",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which block in Java exception handling ALWAYS executes, whether an exception is thrown or caught?",
        options: ["try", "catch", "finally", "throws"],
        correctIndex: 2,
        topic: "Exception Controls",
        explanation: "The finally block always runs after try-catch, usually for resource cleanup like closing DB connections."
      },
      {
        id: "q-j-5",
        skill: "SQL",
        type: "mcq",
        difficulty: "Intermediate",
        question: "In Spring Data JPA, which annotation maps an entity class field to a primary key column in the database?",
        options: ["@Id", "@Column", "@Entity", "@Table"],
        correctIndex: 0,
        topic: "ORM & JPA Mapping",
        explanation: "@Id specifies the primary key property of an entity."
      },
      {
        id: "q-j-6",
        skill: "Problem Solving",
        type: "practical",
        difficulty: "Advanced",
        question: "Practical: What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIndex: 1,
        topic: "Algorithmic Analysis",
        explanation: "Balanced BST halving eliminates half the tree each step, yielding logarithmic time O(log N)."
      }
    ]
  },

  "Full Stack Developer": {
    roleName: "Full Stack Developer",
    skills: ["React", "JavaScript", "Node.js", "SQL", "REST APIs", "Git"],
    questions: [
      {
        id: "q-fs-1",
        skill: "React",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which React Hook is used to execute side effects like data fetching or DOM subscriptions?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctIndex: 1,
        topic: "React Hooks",
        explanation: "useEffect handles lifecycle side effects in functional React components."
      },
      {
        id: "q-fs-2",
        skill: "JavaScript",
        type: "mcq",
        difficulty: "Intermediate",
        question: "What will `console.log(typeof NaN)` output in JavaScript?",
        options: ["'number'", "'nan'", "'undefined'", "'object'"],
        correctIndex: 0,
        topic: "JS Types & Gotchas",
        explanation: "In JS specification, NaN (Not-a-Number) is technically of type 'number'."
      },
      {
        id: "q-fs-3",
        skill: "REST APIs",
        type: "mcq",
        difficulty: "Intermediate",
        question: "Which HTTP status code signifies that a client request succeeded and a new resource was created?",
        options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
        correctIndex: 1,
        topic: "HTTP Status Codes",
        explanation: "201 Created indicates successful resource creation (e.g. POST request)."
      },
      {
        id: "q-fs-4",
        skill: "Git",
        type: "mcq",
        difficulty: "Beginner",
        question: "Which Git command creates a new branch and immediately switches to it?",
        options: ["git branch new-branch", "git checkout -b new-branch", "git commit -m new-branch", "git merge new-branch"],
        correctIndex: 1,
        topic: "Git Version Control",
        explanation: "git checkout -b <branch> (or git switch -c <branch>) creates and switches branches in one command."
      },
      {
        id: "q-fs-5",
        skill: "SQL",
        type: "mcq",
        difficulty: "Intermediate",
        question: "Which keyword is used to remove duplicate rows from a SELECT query result?",
        options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"],
        correctIndex: 1,
        topic: "SQL Syntax",
        explanation: "SELECT DISTINCT removes duplicate rows from the output."
      },
      {
        id: "q-fs-6",
        skill: "Node.js",
        type: "mcq",
        difficulty: "Intermediate",
        question: "What architecture allows Node.js to handle non-blocking asynchronous I/O operations on a single thread?",
        options: ["Event Loop", "Multi-threading worker", "Thread Pool only", "Synchronous Loop"],
        correctIndex: 0,
        topic: "Node.js Architecture",
        explanation: "Node.js uses an Event Loop to offload I/O operations and handle callbacks asynchronously."
      }
    ]
  }
};
