// courseData.js
// Personalized Free and Paid course recommendations mapped directly to skills.

export const COURSE_RECOMMENDATIONS = {
  "SQL": [
    {
      id: "course-sql-free-1",
      name: "SQL Fundamentals for Data Analytics",
      provider: "SkillAura Free Academy / NPTEL",
      skillCovered: "SQL",
      description: "Learn relational database concepts, SELECT statements, WHERE filtering, GROUP BY aggregations, and multi-table JOINs.",
      isFree: true,
      price: "Free",
      duration: "4 weeks (15 hrs)",
      difficulty: "Beginner",
      certificate: true,
      format: "Video lessons & Interactive SQL Sandbox",
      url: "https://nptel.ac.in/courses/sql"
    },
    {
      id: "course-sql-free-2",
      name: "Introduction to Databases and SQL Querying",
      provider: "Coursera (IBM)",
      skillCovered: "SQL",
      description: "Hands-on practice writing basic and intermediate queries using cloud relational databases.",
      isFree: true,
      price: "Free to Audit",
      duration: "3 weeks (10 hrs)",
      difficulty: "Beginner",
      certificate: false,
      format: "Video lectures & Graded quizzes",
      url: "https://coursera.org/learn/sql-for-data-science"
    },
    {
      id: "course-sql-paid-1",
      name: "Advanced SQL & Database Management Bootcamp",
      provider: "Udemy / SkillAura Pro",
      skillCovered: "SQL",
      description: "Master subqueries, Window functions, CTEs, Indexing, and query performance tuning for high-volume databases.",
      isFree: false,
      price: "₹1,499 (Sample Price)",
      duration: "6 weeks (25 hrs)",
      difficulty: "Intermediate",
      certificate: true,
      format: "Video + Real-world Project Assignments",
      url: "https://udemy.com/course/advanced-sql"
    },
    {
      id: "course-sql-paid-2",
      name: "SQL for Enterprise Data Engineering",
      provider: "DataCamp",
      skillCovered: "SQL",
      description: "Build robust transactional schema designs, foreign keys, and analytical reporting pipelines.",
      isFree: false,
      price: "₹1,999 / mo",
      duration: "5 weeks (18 hrs)",
      difficulty: "Intermediate to Advanced",
      certificate: true,
      format: "Interactive browser coding exercises",
      url: "https://datacamp.com/courses/sql"
    }
  ],

  "Python": [
    {
      id: "course-py-free-1",
      name: "Python for Data Analysis Basics",
      provider: "Coursera (IBM / SkillAura)",
      skillCovered: "Python",
      description: "Learn Python data types, lists, dictionaries, Pandas DataFrames, NumPy arrays, and Matplotlib visualization.",
      isFree: true,
      price: "Free to Audit",
      duration: "5 weeks (20 hrs)",
      difficulty: "Beginner",
      certificate: true,
      format: "Video tutorials & Jupyter Notebook labs",
      url: "https://coursera.org/learn/python-data-analysis"
    },
    {
      id: "course-py-free-2",
      name: "Automate the Boring Stuff with Python",
      provider: "FreeCodeCamp",
      skillCovered: "Python",
      description: "Practical Python scripting for web scraping, file parsing, Excel automation, and dataset cleaning.",
      isFree: true,
      price: "Free",
      duration: "4 weeks (12 hrs)",
      difficulty: "Beginner",
      certificate: false,
      format: "Interactive exercises & Project code",
      url: "https://freecodecamp.org/python"
    },
    {
      id: "course-py-paid-1",
      name: "Complete Python Developer: Zero to Mastery",
      provider: "Udemy / ZTM",
      skillCovered: "Python",
      description: "In-depth Python course covering OOP, functional programming, Web Scraping, Pandas, and portfolio projects.",
      isFree: false,
      price: "₹1,299 (Sample)",
      duration: "8 weeks (35 hrs)",
      difficulty: "Intermediate",
      certificate: true,
      format: "Full video course & GitHub project portfolio",
      url: "https://udemy.com/course/python-mastery"
    }
  ],

  "Excel": [
    {
      id: "course-xl-free-1",
      name: "Excel Essentials for Beginners",
      provider: "Microsoft Learn",
      skillCovered: "Excel",
      description: "Master cell formatting, basic formulas, VLOOKUP, PivotTables, and dynamic charting.",
      isFree: true,
      price: "Free",
      duration: "2 weeks (8 hrs)",
      difficulty: "Beginner",
      certificate: true,
      format: "Official Microsoft interactive modules",
      url: "https://learn.microsoft.com/excel"
    },
    {
      id: "course-xl-paid-1",
      name: "Excel to MySQL: Analytic Techniques for Business",
      provider: "Coursera (Duke University)",
      skillCovered: "Excel",
      description: "Advanced PivotTables, INDEX-MATCH, XLOOKUP, PowerQuery, and business dashboard modeling.",
      isFree: false,
      price: "₹2,499 (Sample)",
      duration: "4 weeks (16 hrs)",
      difficulty: "Intermediate",
      certificate: true,
      format: "Guided spreadsheet case studies",
      url: "https://coursera.org/specializations/excel-mysql"
    }
  ],

  "Power BI": [
    {
      id: "course-pbi-free-1",
      name: "Power BI Data Analyst Essentials",
      provider: "Microsoft Learn",
      skillCovered: "Power BI",
      description: "Build interactive visual reports, transform data using Power Query, and create DAX calculated measures.",
      isFree: true,
      price: "Free",
      duration: "3 weeks (12 hrs)",
      difficulty: "Beginner to Intermediate",
      certificate: true,
      format: "Hands-on labs & Microsoft documentation",
      url: "https://learn.microsoft.com/power-bi"
    },
    {
      id: "course-pbi-paid-1",
      name: "Microsoft Power BI Desktop: Complete Masterclass",
      provider: "Udemy",
      skillCovered: "Power BI",
      description: "Master DAX measures, row-level security, bookmarks, drill-through reports, and Power BI Service publishing.",
      isFree: false,
      price: "₹1,499 (Sample)",
      duration: "6 weeks (22 hrs)",
      difficulty: "Intermediate to Advanced",
      certificate: true,
      format: "Full video tutorials & Real-world dashboards",
      url: "https://udemy.com/course/powerbi-masterclass"
    }
  ],

  "Statistics": [
    {
      id: "course-stat-free-1",
      name: "Introductory Statistics & Probability",
      provider: "Khan Academy / NPTEL",
      skillCovered: "Statistics",
      description: "Learn mean, median, standard deviation, normal distribution, z-scores, and hypothesis testing basics.",
      isFree: true,
      price: "Free",
      duration: "4 weeks (14 hrs)",
      difficulty: "Beginner",
      certificate: false,
      format: "Video lessons & Practice quizzes",
      url: "https://khanacademy.org/math/statistics"
    }
  ],

  "Communication": [
    {
      id: "course-comm-free-1",
      name: "Business Communication & Data Storytelling",
      provider: "SkillAura Free Academy",
      skillCovered: "Communication",
      description: "Articulate data findings, structure executive slide presentations, and handle stakeholder Q&A rounds.",
      isFree: true,
      price: "Free",
      duration: "2 weeks (6 hrs)",
      difficulty: "Beginner",
      certificate: true,
      format: "Interactive video modules & Mock pitch tests",
      url: "https://skillaura.in/courses/comm"
    }
  ],

  "Java Fundamentals": [
    {
      id: "course-j-free-1",
      name: "Java Programming Fundamentals",
      provider: "Oracle Dev / NPTEL",
      skillCovered: "Java Fundamentals",
      description: "Learn JDK setup, variables, control flow, loops, methods, and Java primitive types.",
      isFree: true,
      price: "Free",
      duration: "4 weeks (16 hrs)",
      difficulty: "Beginner",
      certificate: true,
      format: "Video lectures & Coding assignments",
      url: "https://nptel.ac.in/courses/java"
    }
  ],

  "Object-Oriented Programming": [
    {
      id: "course-oop-free-1",
      name: "Object-Oriented Programming in Java",
      provider: "Coursera (Duke)",
      skillCovered: "Object-Oriented Programming",
      description: "Classes, Objects, Inheritance, Polymorphism, Interfaces, and Encapsulation best practices.",
      isFree: true,
      price: "Free to Audit",
      duration: "4 weeks (14 hrs)",
      difficulty: "Intermediate",
      certificate: true,
      format: "Hands-on coding exercises",
      url: "https://coursera.org/learn/java-oop"
    }
  ],

  "Data Structures": [
    {
      id: "course-dsa-free-1",
      name: "Data Structures & Algorithms in Java",
      provider: "FreeCodeCamp",
      skillCovered: "Data Structures",
      description: "Master Arrays, Linked Lists, Stacks, Queues, HashMaps, Trees, Graphs, and Big-O time complexity.",
      isFree: true,
      price: "Free",
      duration: "6 weeks (25 hrs)",
      difficulty: "Intermediate",
      certificate: false,
      format: "Video + Coding exercises",
      url: "https://freecodecamp.org/dsa-java"
    },
    {
      id: "course-dsa-paid-1",
      name: "Mastering Data Structures & Algorithms for SDE Roles",
      provider: "GeeksforGeeks / SkillAura Pro",
      skillCovered: "Data Structures",
      description: "In-depth practice of 150+ LeetCode Medium/Hard DSA problems with live mentor support.",
      isFree: false,
      price: "₹2,999 (Sample)",
      duration: "8 weeks (40 hrs)",
      difficulty: "Advanced",
      certificate: true,
      format: "Coding sandbox & Mock interviews",
      url: "https://geeksforgeeks.org/dsa-course"
    }
  ],

  "React": [
    {
      id: "course-react-free-1",
      name: "React 19 Complete Beginner Guide",
      provider: "React Official / FreeCodeCamp",
      skillCovered: "React",
      description: "Components, Props, State, Hooks (useState, useEffect), and building interactive Single Page Applications.",
      isFree: true,
      price: "Free",
      duration: "4 weeks (18 hrs)",
      difficulty: "Beginner to Intermediate",
      certificate: true,
      format: "Video & Hands-on project build",
      url: "https://react.dev/learn"
    }
  ]
};

// Helper function to generate relevance explanation string
export function getCourseRelevanceExplanation(course, currentLevel, requiredLevel, skillName) {
  const gap = Math.max(0, requiredLevel - currentLevel);
  if (currentLevel === 0) {
    return `Recommended because '${skillName}' has not been assessed yet, and is required at ${requiredLevel}% for your target role.`;
  }
  if (gap > 25) {
    return `High Priority Recommendation: Your assessed level in ${skillName} is ${currentLevel}%, while your target role requires ${requiredLevel}% (High Gap of ${gap}%).`;
  }
  if (gap > 10) {
    return `Moderate Priority Recommendation: Your assessed level in ${skillName} is ${currentLevel}%, while your target role requires ${requiredLevel}% (Gap of ${gap}%).`;
  }
  return `Skill Refinement: Your current level in ${skillName} is ${currentLevel}%, close to the target requirement of ${requiredLevel}%.`;
}
