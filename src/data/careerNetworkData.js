// careerNetworkData.js
// Interactive Connected Jobs Network dataset with comprehensive nodes and explicit relationship links.

export const NODE_TYPES = {
  ROLE: { id: 'role', label: 'Career Role', color: '#9333EA', bg: '#F3E8FF', border: '#C084FC', iconName: 'Target' },
  JOB: { id: 'job', label: 'Job & Internship', color: '#EC4899', bg: '#FCE7F3', border: '#F472B6', iconName: 'Briefcase' },
  SKILL: { id: 'skill', label: 'Skill', color: '#0D9488', bg: '#CCFBF1', border: '#2DD4BF', iconName: 'Sparkles' },
  COURSE: { id: 'course', label: 'Course & Certification', color: '#EA580C', bg: '#FFEDD5', border: '#FB923C', iconName: 'GraduationCap' },
  COMPANY: { id: 'company', label: 'Company', color: '#2563EB', bg: '#DBEAFE', border: '#60A5FA', iconName: 'Building2' },
  GOVT: { id: 'govt', label: 'Government Opportunity', color: '#7C3AED', bg: '#EDE9FE', border: '#A78BFA', iconName: 'Award' }
};

export const DOMAINS = [
  'All Domains',
  'Technology & IT',
  'Business & Management',
  'Finance',
  'Marketing',
  'Design',
  'Healthcare'
];

export const INITIAL_NODES = [
  // --- CAREER ROLES ---
  {
    id: 'role-data-analyst',
    label: 'Data Analyst',
    type: 'role',
    domain: 'Technology & IT',
    shortDesc: 'Collects, processes, and performs statistical analysis on data to help businesses make informed decisions.',
    requiredSkills: ['SQL', 'Python', 'Excel', 'Power BI', 'Statistics'],
    preferredSkills: ['Tableau', 'R', 'A/B Testing', 'Data Storytelling'],
    responsibilities: [
      'Interpret data, analyze results using statistical techniques and provide ongoing reports.',
      'Develop and implement databases, data collection systems, and data analytics solutions.',
      'Acquire data from primary or secondary data sources and maintain databases/data systems.',
      'Identify, analyze, and interpret trends or patterns in complex data sets.'
    ],
    qualification: 'Bachelor\'s Degree in Computer Science, Statistics, Economics, Mathematics or related field.',
    salaryRange: '₹4.5 - ₹9.5 LPA (Illustrative)',
    demandLevel: 'High Demand (Illustrative)',
    matchPct: 88,
    careerPathways: ['Junior Data Analyst', 'Data Analyst', 'Senior Data Analyst', 'Lead Analytics Engineer', 'Head of Data & BI']
  },
  {
    id: 'role-java-dev',
    label: 'Java Backend Developer',
    type: 'role',
    domain: 'Technology & IT',
    shortDesc: 'Designs, builds, and maintains server-side web applications and database APIs using Java ecosystem.',
    requiredSkills: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Git'],
    preferredSkills: ['Microservices', 'Docker', 'Hibernate', 'JUnit', 'Redis'],
    responsibilities: [
      'Write clean, testable, and efficient Java code for backend microservices.',
      'Design RESTful APIs and integrate with third-party software components.',
      'Optimize database queries and ensure high scalability and security.',
      'Troubleshoot, debug, and upgrade existing enterprise Java applications.'
    ],
    qualification: 'B.Tech / B.E. in CSE, IT, ECE or BCA/MCA with strong OOP fundamentals.',
    salaryRange: '₹6.0 - ₹12.0 LPA (Illustrative)',
    demandLevel: 'Very High Demand (Illustrative)',
    matchPct: 72,
    careerPathways: ['Associate Software Engineer', 'Java Backend Developer', 'Senior Backend Engineer', 'Tech Lead / Architect']
  },
  {
    id: 'role-fullstack',
    label: 'Full Stack Engineer',
    type: 'role',
    domain: 'Technology & IT',
    shortDesc: 'Handles both client-side frontend UI and server-side backend database systems.',
    requiredSkills: ['React', 'JavaScript', 'Node.js', 'SQL', 'Git'],
    preferredSkills: ['TypeScript', 'Next.js', 'MongoDB', 'AWS', 'TailwindCSS'],
    responsibilities: [
      'Develop user-facing responsive UI components using React.',
      'Build scalable backend REST and GraphQL API services.',
      'Manage databases and streamline deployment pipelines.'
    ],
    qualification: 'Bachelor\'s Degree in Computer Science or software bootcamps.',
    salaryRange: '₹6.5 - ₹15.0 LPA (Illustrative)',
    demandLevel: 'Very High Demand (Illustrative)',
    matchPct: 81,
    careerPathways: ['Junior Web Developer', 'Full Stack Engineer', 'Senior Full Stack Lead', 'Engineering Manager']
  },
  {
    id: 'role-business-analyst',
    label: 'Business Analyst',
    type: 'role',
    domain: 'Business & Management',
    shortDesc: 'Bridges the gap between IT and business requirements using data assessment and process modeling.',
    requiredSkills: ['Excel', 'SQL', 'Communication', 'Power BI', 'Process Mapping'],
    preferredSkills: ['Agile / Scrum', 'Jira', 'Requirement Gathering', 'Tableau'],
    responsibilities: [
      'Evaluate business processes, anticipate requirements, and uncover areas for improvement.',
      'Translate technical specs into functional business requirements.',
      'Lead cross-functional team reviews of technical solutions.'
    ],
    qualification: 'B.Tech / BBA / MBA or relevant degree with business acumen.',
    salaryRange: '₹5.5 - ₹11.0 LPA (Illustrative)',
    demandLevel: 'High Demand (Illustrative)',
    matchPct: 79,
    careerPathways: ['Associate BA', 'Business Analyst', 'Senior Product Analyst', 'Product Manager']
  },
  {
    id: 'role-product-manager',
    label: 'Product Manager',
    type: 'role',
    domain: 'Business & Management',
    shortDesc: 'Defines product vision, strategy, roadmap, and features for software products.',
    requiredSkills: ['Product Strategy', 'Communication', 'Data Storytelling', 'Agile / Scrum', 'UX Fundamentals'],
    preferredSkills: ['SQL', 'A/B Testing', 'Figma', 'Product Analytics'],
    responsibilities: [
      'Conduct market research and define product feature requirements.',
      'Collaborate with engineering, UX design, and marketing teams.',
      'Track product metrics, user funnels, and retention rates.'
    ],
    qualification: 'Bachelor\'s Degree in Tech/Management; MBA preferred for senior roles.',
    salaryRange: '₹9.0 - ₹22.0 LPA (Illustrative)',
    demandLevel: 'High Demand (Illustrative)',
    matchPct: 65,
    careerPathways: ['Associate Product Manager', 'Product Manager', 'Senior PM', 'VP of Product']
  },
  {
    id: 'role-financial-analyst',
    label: 'Financial Analyst',
    type: 'role',
    domain: 'Finance',
    shortDesc: 'Guides businesses in financial decisions by examining financial data, trends, and risk models.',
    requiredSkills: ['Financial Modeling', 'Excel', 'Statistics', 'Accounting Fundamentals'],
    preferredSkills: ['SQL', 'Python', 'Power BI', 'Tally Prime'],
    responsibilities: [
      'Consolidate and analyze financial statements and forecasts.',
      'Develop financial models and valuation analysis.',
      'Identify financial status by comparing actual results with plans.'
    ],
    qualification: 'B.Com / BBA (Finance) / M.Com / MBA (Finance) / CA Inter.',
    salaryRange: '₹5.0 - ₹10.5 LPA (Illustrative)',
    demandLevel: 'Moderate to High Demand (Illustrative)',
    matchPct: 60,
    careerPathways: ['Junior Financial Analyst', 'Financial Analyst', 'Senior Finance Manager', 'Chief Financial Officer (CFO)']
  },
  {
    id: 'role-ux-designer',
    label: 'UI/UX Designer',
    type: 'role',
    domain: 'Design',
    shortDesc: 'Creates intuitive, user-centered interface wireframes, prototypes, and visual experiences.',
    requiredSkills: ['Figma', 'UX Fundamentals', 'User Research', 'Wireframing', 'Communication'],
    preferredSkills: ['HTML', 'CSS', 'Design Systems', 'Micro-interactions'],
    responsibilities: [
      'Create wireframes, storyboards, user flows, process flows and site maps.',
      'Conduct user testing and evaluate user feedback to refine UX.',
      'Maintain unified UI design tokens across digital applications.'
    ],
    qualification: 'Degree in Design, Fine Arts, Human-Computer Interaction, or relevant portfolio.',
    salaryRange: '₹5.0 - ₹12.0 LPA (Illustrative)',
    demandLevel: 'High Demand (Illustrative)',
    matchPct: 75,
    careerPathways: ['Junior UX Designer', 'UI/UX Designer', 'Lead Product Designer', 'Design Director']
  },

  // --- SKILLS ---
  {
    id: 'skill-sql',
    label: 'SQL',
    type: 'skill',
    category: 'Database & Analytics',
    description: 'Structured Query Language used to query, manage, and manipulate relational database systems.',
    importance: 'Critical for data retrieval, joins, aggregations, and backend API queries.',
    studentLevel: 'Intermediate (75% Mastered)',
    requiredLevel: 'Advanced (Complex joins, CTEs, Indexing)',
    certifications: ['Oracle Certified Associate', 'SQL Fundamentals by NPTEL']
  },
  {
    id: 'skill-python',
    label: 'Python',
    type: 'skill',
    category: 'Programming & Data Science',
    description: 'Versatile high-level programming language widely used in Data Science, AI, and Automation.',
    importance: 'Essential for data processing libraries (Pandas, NumPy) and ML modeling.',
    studentLevel: 'Intermediate (70% Mastered)',
    requiredLevel: 'Proficient in Pandas & Automation',
    certifications: ['Python for Data Science (Coursera/IBM)']
  },
  {
    id: 'skill-excel',
    label: 'Excel',
    type: 'skill',
    category: 'Data Analysis & Productivity',
    description: 'Spreadsheet software for data manipulation, formulas, PivotTables, VLOOKUP, and dashboards.',
    importance: 'Universal tool across finance, business analysis, and reporting.',
    studentLevel: 'Advanced (85% Mastered)',
    requiredLevel: 'Advanced (Macros, PivotTables, PowerQuery)',
    certifications: ['Microsoft Office Specialist Excel']
  },
  {
    id: 'skill-powerbi',
    label: 'Power BI',
    type: 'skill',
    category: 'Business Intelligence & Data Visualization',
    description: 'Interactive data visualization software with primary focus on business intelligence.',
    importance: 'Creates interactive executive dashboards and live business report flows.',
    studentLevel: 'Beginner (40% Mastered)',
    requiredLevel: 'Intermediate (DAX formulas & Data Modeling)',
    certifications: ['Microsoft Certified: Power BI Data Analyst Associate (PL-300)']
  },
  {
    id: 'skill-statistics',
    label: 'Statistics',
    type: 'skill',
    category: 'Mathematics & Data Science',
    description: 'Branch of mathematics dealing with data collection, analysis, hypothesis testing, and probability.',
    importance: 'Core foundation for data validation, predictive models, and A/B testing.',
    studentLevel: 'Intermediate',
    requiredLevel: 'Proficient in Hypothesis Testing & Regressions',
    certifications: ['Introductory Statistics by NPTEL']
  },
  {
    id: 'skill-java',
    label: 'Java',
    type: 'skill',
    category: 'Programming Languages',
    description: 'Object-oriented, class-based programming language built for high concurrency and enterprise backend engines.',
    importance: 'Primary language for enterprise backends, Android, and Spring applications.',
    studentLevel: 'Proficient (80% Mastered)',
    requiredLevel: 'Advanced OOP & Concurrency',
    certifications: ['Oracle Certified Professional Java SE Developer']
  },
  {
    id: 'skill-springboot',
    label: 'Spring Boot',
    type: 'skill',
    category: 'Backend Frameworks',
    description: 'Java-based framework used to build stand-alone, production-grade Spring microservice applications.',
    importance: 'Industry standard framework for Java enterprise web services.',
    studentLevel: 'Learning Gap (Needs Focus)',
    requiredLevel: 'Proficient with REST controllers & Spring Security',
    certifications: ['Spring Certified Professional']
  },
  {
    id: 'skill-react',
    label: 'React',
    type: 'skill',
    category: 'Frontend Development',
    description: 'Popular open-source JavaScript library for building component-driven single-page user interfaces.',
    importance: 'Dominant UI library used by top tech web products.',
    studentLevel: 'Intermediate',
    requiredLevel: 'Hooks, State Management & API Fetching',
    certifications: ['Meta Front-End Developer Certificate']
  },
  {
    id: 'skill-communication',
    label: 'Communication',
    type: 'skill',
    category: 'Soft Skills & Leadership',
    description: 'Ability to convey information clearly, articulate insights, and collaborate with teams.',
    importance: 'Essential across all roles for stakeholder management and interviews.',
    studentLevel: 'Good (74th Percentile)',
    requiredLevel: 'High Proficiency',
    certifications: ['Effective Business Communication']
  },
  {
    id: 'skill-figma',
    label: 'Figma',
    type: 'skill',
    category: 'UI/UX & Graphic Design',
    description: 'Collaborative web-based vector graphics editor and prototyping platform.',
    importance: 'Industry standard for UX wireframes, design systems, and developer handoffs.',
    studentLevel: 'Beginner',
    requiredLevel: 'Intermediate Interactive Prototypes',
    certifications: ['Figma UI/UX Design Fundamentals']
  },
  {
    id: 'skill-finmodel',
    label: 'Financial Modeling',
    type: 'skill',
    category: 'Finance & Accounting',
    description: 'Building abstract mathematical representations of real-world financial situations and valuations.',
    importance: 'Crucial for investment banking, corporate strategy, and equity research.',
    studentLevel: 'Not Started',
    requiredLevel: 'DCF & Financial Statement Integration',
    certifications: ['FMVA Certification by CFI']
  },

  // --- JOBS AND INTERNSHIPS ---
  {
    id: 'job-jr-data-analyst',
    label: 'Junior Data Analyst',
    type: 'job',
    company: 'TCS',
    description: 'Join the Enterprise Data & Analytics team to build automated SQL queries, clean customer data, and update Power BI dashboards.',
    requiredSkills: ['SQL', 'Excel', 'Power BI'],
    preferredSkills: ['Python', 'Communication'],
    eligibility: 'B.Tech / B.E. / BCA / B.Sc Stats (2025/2026 Batch, Min 60% aggregate)',
    experienceLevel: 'Entry-Level (0-1 Years)',
    location: 'Bangalore / Hyderabad / Hybrid',
    jobType: 'Full-time',
    salary: '₹4.5 - ₹6.0 LPA',
    matchPct: 92,
    deadline: '2026-10-30'
  },
  {
    id: 'job-data-analyst-intern',
    label: 'Data Analyst Intern',
    type: 'job',
    company: 'Accenture',
    description: 'Paid 6-month internship assisting analytics consultants with client reporting, data cleaning, and statistical validation.',
    requiredSkills: ['SQL', 'Python', 'Excel'],
    preferredSkills: ['Statistics'],
    eligibility: 'Pre-final and Final Year Students (CGPA 7.0+)',
    experienceLevel: 'Internship',
    location: 'Gurgaon / Pune / Remote',
    jobType: 'Internship',
    salary: '₹25,000 / month Stipend',
    matchPct: 95,
    deadline: '2026-10-15'
  },
  {
    id: 'job-java-trainee',
    label: 'Java Backend Trainee',
    type: 'job',
    company: 'Infosys',
    description: 'Develop microservice modules using Java, Spring Boot, and PostgreSQL. Rigorous initial 3-month paid training at Mysore campus.',
    requiredSkills: ['Java', 'SQL'],
    preferredSkills: ['Spring Boot', 'Git'],
    eligibility: 'CSE / IT / ECE Graduates with 0 backlogs.',
    experienceLevel: 'Fresh Graduate',
    location: 'Mysore / Bangalore / Pune',
    jobType: 'Full-time',
    salary: '₹4.2 - ₹6.5 LPA',
    matchPct: 84,
    deadline: '2026-11-10'
  },
  {
    id: 'job-bi-analyst',
    label: 'BI Analyst Trainee',
    type: 'job',
    company: 'Wipro',
    description: 'Transform raw data into meaningful business charts and decision metrics using Power BI and SQL database warehousing.',
    requiredSkills: ['SQL', 'Power BI', 'Excel'],
    preferredSkills: ['Communication'],
    eligibility: 'Any STEM Graduate with strong analytical orientation.',
    experienceLevel: 'Entry-Level',
    location: 'Noida / Chennai',
    jobType: 'Full-time',
    salary: '₹4.8 - ₹7.0 LPA',
    matchPct: 89,
    deadline: '2026-10-25'
  },
  {
    id: 'job-associate-pm-intern',
    label: 'Associate Product Intern',
    type: 'job',
    company: 'Deloitte',
    description: 'Assist Senior Product Managers in customer interviews, sprint backlog prioritizing, and feature spec documentation.',
    requiredSkills: ['Communication', 'Excel'],
    preferredSkills: ['SQL', 'Product Strategy'],
    eligibility: 'Final Year B.Tech / MBA Students.',
    experienceLevel: 'Internship',
    location: 'Mumbai / Remote',
    jobType: 'Internship',
    salary: '₹30,000 / month Stipend',
    matchPct: 78,
    deadline: '2026-10-20'
  },

  // --- COMPANIES ---
  {
    id: 'company-tcs',
    label: 'TCS',
    type: 'company',
    industry: 'IT Services & Consulting',
    description: 'Tata Consultancy Services is a global leader in IT services, consulting & business solutions with over 600,000 employees.',
    associatedSkills: ['Java', 'SQL', 'Python', 'Power BI'],
    sampleJobs: ['Junior Data Analyst', 'System Engineer Trainee', 'Cloud Analyst'],
    relevantCourses: ['Enterprise Java Architecture', 'SQL for Enterprise Data']
  },
  {
    id: 'company-accenture',
    label: 'Accenture',
    type: 'company',
    industry: 'Management Consulting & IT',
    description: 'Accenture delivers innovation in strategy, technology, digital transformation, and cloud solutions worldwide.',
    associatedSkills: ['Python', 'SQL', 'Spring Boot', 'Agile / Scrum'],
    sampleJobs: ['Data Analyst Intern', 'Application Development Analyst', 'Security Specialist'],
    relevantCourses: ['Data Science with Python', 'Business Analytics Essentials']
  },
  {
    id: 'company-infosys',
    label: 'Infosys',
    type: 'company',
    industry: 'IT & Software Services',
    description: 'Infosys is a multinational information technology company providing next-generation digital services and consulting.',
    associatedSkills: ['Java', 'Spring Boot', 'React', 'SQL'],
    sampleJobs: ['Java Backend Trainee', 'Specialist Programmer', 'Digital Specialist Engineer'],
    relevantCourses: ['Spring Boot Microservices Mastery', 'Core Java Certified Developer']
  },
  {
    id: 'company-deloitte',
    label: 'Deloitte',
    type: 'company',
    industry: 'Audit, Tax & Management Consulting',
    description: 'One of the Big Four accounting and consulting firms, offering advisory, risk, tax, and strategy consulting.',
    associatedSkills: ['Excel', 'Communication', 'Financial Modeling', 'Power BI'],
    sampleJobs: ['Associate Product Intern', 'Risk & Financial Advisory Associate', 'Business Analyst'],
    relevantCourses: ['Financial Analytics & Valuation', 'Corporate Consulting Skills']
  },

  // --- COURSES & CERTIFICATIONS ---
  {
    id: 'course-sql-fundamentals',
    label: 'SQL Fundamentals',
    type: 'course',
    provider: 'SkillAura Free Academy / NPTEL',
    description: 'Master relational database querying, SELECT statements, WHERE filters, GROUP BY, aggregations, and multi-table JOINs.',
    skillsCovered: ['SQL', 'Database Indexing'],
    relatedRoles: ['Data Analyst', 'Business Analyst', 'Java Backend Developer'],
    duration: '4 Weeks (Self-paced)',
    difficulty: 'Beginner to Intermediate',
    price: 'Free (NPTEL Certificate Eligible)'
  },
  {
    id: 'course-python-data',
    label: 'Python for Data Analysis',
    type: 'course',
    provider: 'Coursera / IBM',
    description: 'Learn Python programming, Pandas dataframes, NumPy arrays, Matplotlib plotting, and data cleaning techniques.',
    skillsCovered: ['Python', 'Statistics'],
    relatedRoles: ['Data Analyst', 'Data Scientist', 'Business Analyst'],
    duration: '6 Weeks',
    difficulty: 'Intermediate',
    price: 'Free to Audit'
  },
  {
    id: 'course-powerbi-essentials',
    label: 'Power BI Essentials',
    type: 'course',
    provider: 'Microsoft Learn',
    description: 'Build interactive dashboards, import multi-source datasets, DAX measure creation, and publish executive reports.',
    skillsCovered: ['Power BI', 'Excel'],
    relatedRoles: ['Data Analyst', 'Business Analyst', 'BI Specialist'],
    duration: '3 Weeks',
    difficulty: 'Beginner',
    price: 'Free Official Module'
  },
  {
    id: 'course-springboot-mastery',
    label: 'Spring Boot Microservices',
    type: 'course',
    provider: 'Udemy / SkillAura Labs',
    description: 'Build production-ready Java REST APIs using Spring Boot, Spring Data JPA, Security JWT, and Docker containerization.',
    skillsCovered: ['Spring Boot', 'Java', 'REST APIs'],
    relatedRoles: ['Java Backend Developer', 'Full Stack Engineer'],
    duration: '8 Weeks',
    difficulty: 'Advanced',
    price: 'Free Certificate for College Students'
  },

  // --- GOVERNMENT EXAMS & OPPORTUNITIES ---
  {
    id: 'govt-nic-scientist',
    label: 'NIC Scientist B Data Role',
    type: 'govt',
    department: 'National Informatics Centre (MeitY)',
    eligibility: 'B.Tech / B.E. in CSE / IT / ECE or MCA with GATE or NIC Recruitment Exam.',
    qualification: '100% Technical Entrance Test + Interview',
    skills: ['SQL', 'Java', 'Python', 'Statistics'],
    relatedRoles: ['Data Analyst', 'Java Backend Developer'],
    importantDates: 'Notification: Oct 2026 | Exam: Dec 2026',
    officialUrl: 'https://nic.in/careers'
  },
  {
    id: 'govt-ibps-it-officer',
    label: 'IBPS IT Officer Scale-I',
    type: 'govt',
    department: 'Institute of Banking Personnel Selection (Public Sector Banks)',
    eligibility: '4-year Engineering Degree in Computer Science / IT / ECE / MCA.',
    qualification: 'Prelims + Mains (IT Professional Knowledge) + Interview',
    skills: ['SQL', 'Java', 'Database Systems', 'Networking'],
    relatedRoles: ['Java Backend Developer', 'Data Analyst'],
    importantDates: 'Prelims: Nov 2026 | Mains: Jan 2027',
    officialUrl: 'https://ibps.in'
  },
  {
    id: 'govt-niti-aayog-fellow',
    label: 'NITI Aayog Young Professional',
    type: 'govt',
    department: 'NITI Aayog (Govt of India Think Tank)',
    eligibility: 'Master\'s Degree or 4-year B.Tech with 1-year analysis experience.',
    qualification: 'Merit Shortlisting based on analytical background + Interview',
    skills: ['Excel', 'Statistics', 'Power BI', 'Communication'],
    relatedRoles: ['Business Analyst', 'Data Analyst'],
    importantDates: 'Applications open twice annually',
    officialUrl: 'https://niti.gov.in'
  }
];

export const INITIAL_LINKS = [
  // Data Analyst Connections
  { source: 'role-data-analyst', target: 'skill-sql', label: 'Requires' },
  { source: 'role-data-analyst', target: 'skill-python', label: 'Requires' },
  { source: 'role-data-analyst', target: 'skill-excel', label: 'Requires' },
  { source: 'role-data-analyst', target: 'skill-powerbi', label: 'Requires' },
  { source: 'role-data-analyst', target: 'skill-statistics', label: 'Requires' },
  { source: 'role-data-analyst', target: 'skill-communication', label: 'Requires' },

  { source: 'role-data-analyst', target: 'role-business-analyst', label: 'Related to' },
  { source: 'role-data-analyst', target: 'role-fullstack', label: 'Related to' },

  { source: 'role-data-analyst', target: 'job-jr-data-analyst', label: 'Leads to' },
  { source: 'role-data-analyst', target: 'job-data-analyst-intern', label: 'Leads to' },
  { source: 'role-data-analyst', target: 'job-bi-analyst', label: 'Leads to' },

  // Companies & Jobs
  { source: 'company-tcs', target: 'job-jr-data-analyst', label: 'Offers' },
  { source: 'company-accenture', target: 'job-data-analyst-intern', label: 'Offers' },
  { source: 'company-infosys', target: 'job-java-trainee', label: 'Offers' },
  { source: 'company-wipro', target: 'job-bi-analyst', label: 'Offers' },
  { source: 'company-deloitte', target: 'job-associate-pm-intern', label: 'Offers' },
  { source: 'company-tcs', target: 'role-data-analyst', label: 'Employs' },
  { source: 'company-infosys', target: 'role-java-dev', label: 'Employs' },

  // Courses & Skills
  { source: 'course-sql-fundamentals', target: 'skill-sql', label: 'Teaches' },
  { source: 'course-python-data', target: 'skill-python', label: 'Teaches' },
  { source: 'course-python-data', target: 'skill-statistics', label: 'Teaches' },
  { source: 'course-powerbi-essentials', target: 'skill-powerbi', label: 'Teaches' },
  { source: 'course-springboot-mastery', target: 'skill-springboot', label: 'Teaches' },
  { source: 'course-springboot-mastery', target: 'skill-java', label: 'Teaches' },

  // Courses & Roles
  { source: 'course-sql-fundamentals', target: 'role-data-analyst', label: 'Prepares for' },
  { source: 'course-springboot-mastery', target: 'role-java-dev', label: 'Prepares for' },

  // Java Dev Connections
  { source: 'role-java-dev', target: 'skill-java', label: 'Requires' },
  { source: 'role-java-dev', target: 'skill-springboot', label: 'Requires' },
  { source: 'role-java-dev', target: 'skill-sql', label: 'Requires' },
  { source: 'role-java-dev', target: 'job-java-trainee', label: 'Leads to' },
  { source: 'role-java-dev', target: 'role-fullstack', label: 'Related to' },

  // Full Stack Connections
  { source: 'role-fullstack', target: 'skill-react', label: 'Requires' },
  { source: 'role-fullstack', target: 'skill-java', label: 'Requires' },
  { source: 'role-fullstack', target: 'skill-sql', label: 'Requires' },

  // Business Analyst Connections
  { source: 'role-business-analyst', target: 'skill-excel', label: 'Requires' },
  { source: 'role-business-analyst', target: 'skill-sql', label: 'Requires' },
  { source: 'role-business-analyst', target: 'skill-communication', label: 'Requires' },
  { source: 'role-business-analyst', target: 'role-product-manager', label: 'Leads to' },

  // Product Manager Connections
  { source: 'role-product-manager', target: 'skill-communication', label: 'Requires' },
  { source: 'role-product-manager', target: 'job-associate-pm-intern', label: 'Offers' },

  // Financial Analyst
  { source: 'role-financial-analyst', target: 'skill-excel', label: 'Requires' },
  { source: 'role-financial-analyst', target: 'skill-finmodel', label: 'Requires' },
  { source: 'role-financial-analyst', target: 'skill-statistics', label: 'Requires' },

  // UX Designer
  { source: 'role-ux-designer', target: 'skill-figma', label: 'Requires' },
  { source: 'role-ux-designer', target: 'skill-communication', label: 'Requires' },

  // Govt Opportunities
  { source: 'govt-nic-scientist', target: 'role-data-analyst', label: 'Qualifies for' },
  { source: 'govt-nic-scientist', target: 'role-java-dev', label: 'Qualifies for' },
  { source: 'govt-ibps-it-officer', target: 'role-java-dev', label: 'Qualifies for' },
  { source: 'govt-niti-aayog-fellow', target: 'role-business-analyst', label: 'Qualifies for' },
  { source: 'govt-nic-scientist', target: 'skill-sql', label: 'Requires' },
  { source: 'govt-niti-aayog-fellow', target: 'skill-excel', label: 'Requires' }
];

// Helper function to get node details by ID
export function getNodeById(id) {
  return INITIAL_NODES.find(n => n.id === id) || null;
}

// Helper function to get connected links for a node
export function getConnectedLinks(nodeId, links = INITIAL_LINKS) {
  return links.filter(l => l.source === nodeId || l.target === nodeId || l.source?.id === nodeId || l.target?.id === nodeId);
}

// Additional expanded node data when user clicks "Expand Network"
export const EXPANDED_NODES_DATA = [
  {
    id: 'skill-tableau',
    label: 'Tableau',
    type: 'skill',
    category: 'Data Visualization',
    description: 'Visual analytics platform transforming data into interactive enterprise dashboards.',
    importance: 'Highly preferred for senior business intelligence positions.',
    studentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    certifications: ['Tableau Desktop Specialist']
  },
  {
    id: 'role-data-engineer',
    label: 'Data Engineer',
    type: 'role',
    domain: 'Technology & IT',
    shortDesc: 'Builds infrastructure and data pipelines to format and store massive data streams for analysts.',
    requiredSkills: ['SQL', 'Python', 'Java', 'Spark'],
    preferredSkills: ['Kafka', 'Airflow', 'AWS S3'],
    responsibilities: ['Construct data pipelines', 'Optimize database performance', 'Implement ETL flows'],
    qualification: 'Degree in Computer Science or Software Engineering.',
    salaryRange: '₹7.5 - ₹18.0 LPA (Illustrative)',
    demandLevel: 'High Demand',
    matchPct: 76,
    careerPathways: ['Junior Data Engineer', 'Data Engineer', 'Lead Data Architect']
  },
  {
    id: 'course-tableau-mastery',
    label: 'Tableau Desktop Mastery',
    type: 'course',
    provider: 'Coursera / Tableau',
    description: 'Comprehensive course covering data connections, calculated fields, parameters, and interactive dashboards.',
    skillsCovered: ['Tableau', 'Power BI'],
    relatedRoles: ['Data Analyst', 'Data Engineer'],
    duration: '4 Weeks',
    difficulty: 'Intermediate',
    price: 'Free to Audit'
  }
];

export const EXPANDED_LINKS_DATA = [
  { source: 'role-data-analyst', target: 'skill-tableau', label: 'Preferred' },
  { source: 'role-data-analyst', target: 'role-data-engineer', label: 'Leads to' },
  { source: 'course-tableau-mastery', target: 'skill-tableau', label: 'Teaches' },
  { source: 'role-data-engineer', target: 'skill-sql', label: 'Requires' },
  { source: 'role-data-engineer', target: 'skill-python', label: 'Requires' }
];
