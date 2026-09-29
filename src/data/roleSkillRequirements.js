// roleSkillRequirements.js
// Predefined target skill requirements (%) and "Why is this skill important?" explanations per role.

export const ROLE_SKILL_REQUIREMENTS = {
  "Data Scientist / Analyst": {
    "SQL": { required: 90, importance: "SQL is the foundational query language used to extract, join, and aggregate structured enterprise data from relational databases." },
    "Python": { required: 85, importance: "Python libraries like Pandas, NumPy, and Scikit-Learn power data cleaning, exploratory analysis, and statistical modeling." },
    "Excel": { required: 90, importance: "Excel remains the industry standard for fast ad-hoc modeling, PivotTables, VLOOKUP, and financial data sharing." },
    "Power BI": { required: 85, importance: "Power BI turns static datasets into interactive executive dashboards with live business metrics and DAX calculations." },
    "Statistics": { required: 85, importance: "Statistical principles enable valid hypothesis testing, A/B experimentation, confidence intervals, and regression analysis." },
    "Communication": { required: 80, importance: "Data insights are useless without data storytelling — explaining findings clearly to business stakeholders and executives." }
  },

  "Java Backend Developer": {
    "Java Fundamentals": { required: 90, importance: "Core Java syntax, memory management, garbage collection, and OOP rules form the base of enterprise backend engines." },
    "Object-Oriented Programming": { required: 95, importance: "OOP principles (Inheritance, Polymorphism, Encapsulation, Abstraction) ensure scalable, modular code architecture." },
    "Data Structures": { required: 85, importance: "Choosing the right Data Structures (HashMap, Lists, Trees) ensures optimal execution time and memory efficiency." },
    "Exception Handling": { required: 85, importance: "Robust exception handling prevents application crashes and maintains system reliability during unexpected runtime errors." },
    "SQL": { required: 85, importance: "Backend services require efficient database queries, transactional integrity, and ORM entity mapping." },
    "Problem Solving": { required: 90, importance: "Algorithmic thinking is vital for optimizing microservices performance and passing technical coding rounds." }
  },

  "Full Stack Developer": {
    "React": { required: 90, importance: "React enables fast, component-based user interfaces with declarative rendering and smooth single-page UX." },
    "JavaScript": { required: 90, importance: "ES6+ JavaScript is the core scripting language across both client-side React and server-side Node.js environments." },
    "Node.js": { required: 85, importance: "Node.js provides a high-concurrency event-driven asynchronous backend runtime for handling REST APIs." },
    "SQL": { required: 85, importance: "Full stack applications rely on relational databases for persistent user data, authentication, and state records." },
    "REST APIs": { required: 90, importance: "Designing clean HTTP REST endpoints establishes seamless communication between client UIs and server logic." },
    "Git": { required: 85, importance: "Git version control enables multi-developer collaboration, feature branching, and pull request code reviews." }
  },

  "AI / ML Engineer": {
    "Python": { required: 95, importance: "Python is the primary ecosystem for neural networks, PyTorch, TensorFlow, and AI model deployments." },
    "Statistics": { required: 90, importance: "Probability distributions, linear algebra, and calculus underpin machine learning optimization algorithms." },
    "SQL": { required: 80, importance: "Data engineering pipelines rely on SQL to fetch and clean raw training datasets." }
  },

  "DevOps / Cloud Engineer": {
    "Git": { required: 90, importance: "Infrastructure-as-code and CI/CD automation rely heavily on Git repositories for configuration tracking." },
    "Java Fundamentals": { required: 75, importance: "Understanding runtime environments helps debug containerized application deployments." }
  },

  "Cybersecurity Analyst": {
    "SQL": { required: 85, importance: "Preventing and detecting SQL Injection vulnerabilities requires deep relational database understanding." },
    "Python": { required: 80, importance: "Python scripts automate vulnerability scanning, network traffic parsing, and security log parsing." }
  },

  "SDE 1 (Product Companies)": {
    "Data Structures": { required: 95, importance: "Mastery of DSA is mandatory for clearing product-company technical coding assessments and interviews." },
    "Java Fundamentals": { required: 90, importance: "Core language internals and JVM garbage collection are heavily tested in SDE interviews." },
    "Problem Solving": { required: 95, importance: "Solving complex algorithmic constraints under tight time limits determines hiring success." }
  }
};
