import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

const initialDbData = {
  studentProfile: {
    id: "STU-7821",
    name: "Ananya Roy",
    email: "ananya.roy@college.edu.in",
    phone: "+91 98765 43210",
    college: "Institute of Technology & Engineering",
    tier: "Tier 2 College",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    gradYear: "2026",
    cgpa: 8.4,
    sgpaHistory: [
      { semester: "Sem 1", sgpa: 8.0 },
      { semester: "Sem 2", sgpa: 8.2 },
      { semester: "Sem 3", sgpa: 8.1 },
      { semester: "Sem 4", sgpa: 8.5 },
      { semester: "Sem 5", sgpa: 8.6 },
      { semester: "Sem 6", sgpa: 8.8 }
    ],
    backlogHistory: 0,
    class10Marks: "94.2%",
    class12Marks: "91.8%",
    academicAchievements: [
      "Institute Merit Scholar (2024)",
      "Dean's List Semester 5",
      "First Rank in Branch Coding Sprint"
    ],
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    
    // Skills organized into 6 required categories
    skills: [
      { name: "Core Java", category: "Programming Languages", proficiency: 88, targetProficiency: 95, isAssessed: true },
      { name: "C++", category: "Programming Languages", proficiency: 75, targetProficiency: 85, isAssessed: false },
      { name: "Python", category: "Programming Languages", proficiency: 80, targetProficiency: 90, isAssessed: true },
      
      { name: "React", category: "Web Development", proficiency: 82, targetProficiency: 90, isAssessed: true },
      { name: "HTML / CSS", category: "Web Development", proficiency: 90, targetProficiency: 95, isAssessed: false },
      { name: "RESTful APIs", category: "Web Development", proficiency: 75, targetProficiency: 90, isAssessed: true },
      
      { name: "SQL & DBMS", category: "Databases", proficiency: 85, targetProficiency: 92, isAssessed: true },
      { name: "PostgreSQL", category: "Databases", proficiency: 70, targetProficiency: 85, isAssessed: false },
      { name: "Redis Caching", category: "Databases", proficiency: 60, targetProficiency: 80, isAssessed: false },
      
      { name: "DSA & Problem Solving", category: "AI & Data Science", proficiency: 86, targetProficiency: 95, isAssessed: true },
      { name: "Data Analysis Basics", category: "AI & Data Science", proficiency: 65, targetProficiency: 80, isAssessed: false },
      
      { name: "Git & GitHub", category: "Cloud & Tools", proficiency: 85, targetProficiency: 95, isAssessed: true },
      { name: "Spring Boot", category: "Cloud & Tools", proficiency: 58, targetProficiency: 85, isAssessed: true },
      { name: "Docker Containerization", category: "Cloud & Tools", proficiency: 50, targetProficiency: 75, isAssessed: false },
      
      { name: "Technical Communication", category: "Soft Skills", proficiency: 78, targetProficiency: 90, isAssessed: true },
      { name: "Team Collaboration", category: "Soft Skills", proficiency: 80, targetProficiency: 90, isAssessed: false }
    ],

    // Career Goals
    careerGoals: {
      primaryGoal: "Become a Lead Java Backend Engineer at a Tier-1 Product Company",
      targetRole: "Java Backend Developer",
      preferredIndustries: ["FinTech", "SaaS / Cloud Enterprise", "E-Commerce Systems"],
      preferredLocationMode: "Hybrid / Bangalore, Pune, Remote",
      careerInterests: ["Microservices Architecture", "Distributed Systems", "SQL Query Tuning", "Cloud Computing", "Algorithmic DSA"],
      shortTermObjectives: "Crack campus placement with ₹8+ LPA package, publish 2 backend microservice projects on GitHub"
    },

    // Projects
    projects: [
      {
        id: "p1",
        title: "E-Commerce Microservices Engine",
        description: "Scalable backend service architecture built with Spring Boot, Redis caching, and PostgreSQL database.",
        techStack: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
        status: "Completed",
        githubUrl: "https://github.com/ananya-roy/ecommerce-microservices",
        liveUrl: "https://shop-api.dev"
      },
      {
        id: "p2",
        title: "Real-Time AI Resume Gap Analyzer",
        description: "Full stack web application comparing student resumes with job descriptions to highlight skill gaps.",
        techStack: ["React", "Node.js", "Express", "OpenAI API"],
        status: "Completed",
        githubUrl: "https://github.com/ananya-roy/resume-analyzer-ai",
        liveUrl: "https://resume-gap.skillaura.app"
      },
      {
        id: "p3",
        title: "Distributed Job Alert Dispatcher",
        description: "High-performance job notification daemon processing asynchronous message queues.",
        techStack: ["Java", "RabbitMQ", "Docker", "JUnit"],
        status: "In Progress",
        githubUrl: "https://github.com/ananya-roy/job-alert-dispatcher",
        liveUrl: ""
      }
    ],

    // Experiences
    experiences: [
      {
        id: "e1",
        title: "Java Backend Developer Intern",
        company: "TechNova Solutions",
        duration: "May 2025 - Jul 2025 (3 Months)",
        description: "Designed and implemented 5 RESTful API endpoints for user authorization and automated transaction logging.",
        responsibilities: "Reduced API response latency by 35% through query optimization and SQL indexing."
      }
    ],

    // Certifications
    certifications: [
      {
        id: "c1",
        title: "NPTEL Programming, Data Structures & Algorithms in Java",
        issuer: "IIT Kharagpur / SWAYAM",
        issueDate: "2024-05",
        credentialUrl: "https://nptel.ac.in/noc/cert/123"
      },
      {
        id: "c2",
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        issueDate: "2024-11",
        credentialUrl: "https://aws.amazon.com/verify/aws-123"
      }
    ],

    // Achievements
    achievements: [
      {
        id: "a1",
        title: "Smart India Hackathon 2024 Finalist",
        issuingOrg: "Ministry of Education",
        issueDate: "2024-12",
        credentialUrl: "",
        description: "Selected in top 15 teams nationwide for building an AI-driven smart agriculture management app."
      },
      {
        id: "a2",
        title: "Annual College CodeSprint Winner",
        issuingOrg: "IIT Jaipur Coding Club",
        issueDate: "2025-02",
        credentialUrl: "",
        description: "Secured 1st rank among 300+ participants by solving 5 DSA challenges in 90 minutes."
      }
    ],

    // Readiness & Growth Metrics
    employabilityScore: 745,
    maxScore: 900,
    readinessMetrics: {
      employabilityScore: 745,
      skillGapStatus: "85% Match (2 Priority Gaps)",
      interviewReadiness: "Ready (82% Mock Score)",
      resumeAnalysisStatus: "ATS Score: 84 / 100",
      growthMapProgress: "Weekly Target: 65%"
    },
    scoreHistory: [
      { date: "Aug 1", score: 620 },
      { date: "Aug 8", score: 650 },
      { date: "Aug 15", score: 680 },
      { date: "Aug 22", score: 710 },
      { date: "Aug 29", score: 730 },
      { date: "Sep 20", score: 745 }
    ],

    // Recent Activity History
    recentActivity: [
      { id: "act1", title: "Completed AI Mock Interview", category: "Interview", result: "Score: 82% (Strong Technical Communication)", timestamp: "2 days ago" },
      { id: "act2", title: "Added New Project: E-Commerce Microservices Engine", category: "Projects", result: "GitHub Verified", timestamp: "4 days ago" },
      { id: "act3", title: "Analyzed ATS Resume for Java Backend Developer", category: "Resume", result: "ATS Score: 84 / 100", timestamp: "1 week ago" },
      { id: "act4", title: "Achieved NPTEL Core Java Certification", category: "Certifications", result: "Elite + Gold Badge", timestamp: "2 weeks ago" },
      { id: "act5", title: "Updated Target Career Role to Java Backend Developer", category: "Career Goals", result: "Goal Saved", timestamp: "3 weeks ago" }
    ],

    peerPercentiles: {
      dsaPercentile: 68,
      projectPercentile: 82,
      communicationPercentile: 74,
      overallPercentile: 76
    }
  },
  govtSchemes: [
    {
      id: "SCH-101",
      title: "PM Internship Scheme 2024-25",
      provider: "Ministry of Corporate Affairs (Govt. of India)",
      type: "Government Scheme",
      stipend: "₹5,000 / month + ₹6,000 one-time grant",
      duration: "12 Months",
      location: "Pan-India / State Offices",
      eligibility: {
        minCgpa: 6.0,
        branches: ["Computer Science & Engineering", "Information Technology", "Electronics", "Mechanical", "Civil"],
        maxBacklogs: 1,
        allowedYears: ["3rd Year (Semester 6)", "4th Year (Semester 8)", "Passed Out"]
      },
      skillsRequired: ["Basic Computer Skills", "Python / Web Basics", "Communication"],
      applyUrl: "https://pminternship.mca.gov.in",
      trustScore: 98,
      trustStatus: "Verified Govt Scheme",
      redFlags: []
    },
    {
      id: "SCH-102",
      title: "AICTE TULIP (The Urban Learning Internship Program)",
      provider: "AICTE & Ministry of Housing and Urban Affairs",
      type: "Smart Cities Internship",
      stipend: "₹12,000 - ₹18,000 / month",
      duration: "6 Months",
      location: "Jaipur Smart City Ltd / Delhi / Pune",
      eligibility: {
        minCgpa: 6.5,
        branches: ["Computer Science & Engineering", "Information Technology", "Civil", "Electrical"],
        maxBacklogs: 0,
        allowedYears: ["3rd Year (Semester 6)", "4th Year (Semester 8)"]
      },
      skillsRequired: ["GIS / Python", "Data Visualization", "Web Development"],
      applyUrl: "https://internship.aicte-india.org",
      trustScore: 96,
      trustStatus: "Verified AICTE Portal",
      redFlags: []
    },
    {
      id: "SCH-103",
      title: "National Career Service (NCS) Software Apprentice",
      provider: "Ministry of Labour & Employment",
      type: "Apprenticeship",
      stipend: "₹15,000 / month",
      duration: "1 Year",
      location: "Hybrid (Noida / Remote)",
      eligibility: {
        minCgpa: 5.5,
        branches: ["All Engineering Branches", "BCA", "B.Sc CS"],
        maxBacklogs: 2,
        allowedYears: ["3rd Year (Semester 6)", "4th Year (Semester 8)"]
      },
      skillsRequired: ["JavaScript", "HTML/CSS", "Database Querying"],
      applyUrl: "https://ncs.gov.in",
      trustScore: 94,
      trustStatus: "Verified Govt Portal",
      redFlags: []
    },
    {
      id: "SCH-104",
      title: "Suspect Entry: 'Remote AI Prompt Engineer Intern'",
      provider: "Unverified Third Party Agency",
      type: "Private Internship",
      stipend: "Unpaid / Ask for ₹1,500 Registration Fee",
      duration: "Undefined / Flexible",
      location: "Remote",
      eligibility: {
        minCgpa: 0,
        branches: ["All"],
        maxBacklogs: 10,
        allowedYears: ["All"]
      },
      skillsRequired: ["None"],
      applyUrl: "#",
      trustScore: 12,
      trustStatus: "FRAUD WARNING (Red Flagged)",
      redFlags: [
        "Asks candidates to pay registration/training fee before joining",
        "Vague work responsibilities and undefined contract duration",
        "Unrealistic promises of high package without interview process"
      ]
    }
  ],
  freeCourses: [
    {
      id: "CRS-01",
      title: "NPTEL: Programming, Data Structures & Algorithms in Python",
      provider: "IIT Madras / NPTEL (Swayam)",
      cost: "Free Learning (Optional ₹1000 Exam Fee)",
      duration: "8 Weeks",
      rating: 4.8,
      tags: ["Data Structures", "Python", "Algorithms"],
      url: "https://onlinecourses.nptel.ac.in",
      roiComparison: {
        paidAlternativeCost: "₹14,999 (Private EdTech)",
        expectedSalaryIncrease: "+ ₹2.5 LPA",
        recommendation: "Highly Recommended (Top Free IIT Quality)"
      }
    },
    {
      id: "CRS-02",
      title: "Fullstack Web Development with React & Node.js",
      provider: "freeCodeCamp / YouTube Full Course",
      cost: "100% Free",
      duration: "12 Weeks (Self-paced)",
      rating: 4.9,
      tags: ["React", "Node.js", "Express", "MongoDB"],
      url: "https://youtube.com",
      roiComparison: {
        paidAlternativeCost: "₹29,000 (Bootcamp)",
        expectedSalaryIncrease: "+ ₹3.8 LPA",
        recommendation: "Recommended Hands-on Free Resource"
      }
    },
    {
      id: "CRS-03",
      title: "Docker & Containerization for Beginners",
      provider: "TechWorld with Nana / Open Source",
      cost: "100% Free",
      duration: "3 Weeks",
      rating: 4.9,
      tags: ["Docker", "DevOps", "CI/CD"],
      url: "https://youtube.com",
      roiComparison: {
        paidAlternativeCost: "₹8,500",
        expectedSalaryIncrease: "+ ₹1.8 LPA",
        recommendation: "Must-learn DevOps Essential"
      }
    }
  ],
  microProjects: [
    {
      id: "PRJ-01",
      title: "E-Commerce REST API with Node, Express & Redis Cache",
      domain: "Full Stack & Backend",
      difficulty: "Intermediate",
      timeEstimate: "3-4 Days",
      skillsGained: ["Node.js", "Express", "Redis", "JWT Auth"],
      githubStarter: "https://github.com/example/node-express-starter",
      employabilityBoost: "+25 Points to Project Score"
    },
    {
      id: "PRJ-02",
      title: "Real-time AI Chat & Resume Gap Checker App",
      domain: "Web & AI Integration",
      difficulty: "Advanced",
      timeEstimate: "4-5 Days",
      skillsGained: ["React", "Vite", "OpenAI/Claude API", "TailwindCSS"],
      githubStarter: "https://github.com/example/react-ai-starter",
      employabilityBoost: "+35 Points to Project Score"
    }
  ],
  tpoAnalytics: {
    collegeName: "Institute of Technology, Jaipur",
    academicYear: "2024-2025",
    totalStudents: 480,
    placementEligible: 412,
    placedCount: 284,
    placementRate: "68.9%",
    avgPackage: "₹6.8 LPA",
    highestPackage: "₹24 LPA",
    atRiskStudents: [
      { name: "Rahul Verma", branch: "CSE", cgpa: 6.1, backlogs: 1, score: 510, mainGap: "DSA & System Design" },
      { name: "Priya Kumawat", branch: "ECE", cgpa: 6.4, backlogs: 0, score: 540, mainGap: "Core Web Dev & Soft Skills" },
      { name: "Vikram Singh", branch: "ME", cgpa: 5.9, backlogs: 2, score: 480, mainGap: "Basic Coding & Aptitude" }
    ],
    departmentSkillHeatmap: [
      { dept: "Computer Science", dsa: "High (78%)", webDev: "High (82%)", devOps: "Low (34%)", softSkills: "Medium (65%)" },
      { dept: "Information Tech", dsa: "Medium (66%)", webDev: "High (79%)", devOps: "Low (28%)", softSkills: "Medium (68%)" },
      { dept: "Electronics & Comm", dsa: "Low (42%)", webDev: "Medium (51%)", devOps: "Low (18%)", softSkills: "Medium (60%)" }
    ]
  },
  opportunities: [
    {
      id: "OPP-101",
      type: "internship",
      title: "Junior Java Developer Intern",
      company: "TCS (Tata Consultancy Services)",
      logoBg: "#9333EA",
      location: "Bangalore / Hybrid",
      workMode: "Hybrid",
      stipend: "₹25,000 / month",
      duration: "6 Months",
      deadline: "Oct 15, 2026",
      source: "Official TCS Careers",
      sourceUrl: "https://tcs.com/careers",
      requiredSkills: ["Core Java", "SQL", "REST APIs", "Git"],
      matchingSkills: ["Core Java", "SQL", "Git"],
      missingSkills: ["REST APIs"],
      experience: "0-1 Year (2025/2026 Batch B.Tech CSE/IT)",
      description: "Join the Enterprise Software team to develop RESTful microservices using Core Java, Spring Boot, and PostgreSQL databases.",
      responsibilities: ["Write clean Core Java code", "Optimize SQL queries", "Agile sprint collaboration"],
      isSaved: true,
      status: "Applied"
    },
    {
      id: "OPP-102",
      type: "job",
      title: "Full Stack Java Graduate Trainee",
      company: "CyberTech Global",
      logoBg: "#059669",
      location: "Pune / On-site",
      workMode: "On-site",
      stipend: "₹6.5 - ₹8.0 LPA",
      duration: "Permanent Role",
      deadline: "Nov 01, 2026",
      source: "Naukri.com",
      sourceUrl: "https://naukri.com",
      requiredSkills: ["Java", "SQL", "React", "HTML/CSS"],
      matchingSkills: ["Java", "SQL", "HTML/CSS"],
      missingSkills: ["React"],
      experience: "0-1 Years Experience",
      description: "Full-time graduate engineer trainee position focusing on end-to-end Java backend microservices.",
      responsibilities: ["Develop responsive web frontend and Java REST APIs", "Participate in CI/CD deployment"],
      isSaved: false,
      status: "Saved"
    }
  ],
  supportTickets: [
    {
      id: "TKT-84920",
      category: "Skill Gap Analysis",
      subject: "Spring Boot skill gap target level calculation",
      priority: "Medium",
      description: "Need clarification on how the Spring Boot assessment proficiency level is calculated against Senior Java Backend developer target.",
      status: "In Progress",
      createdAt: "2026-09-28",
      responses: [
        {
          sender: "SkillAura TPO Support",
          message: "Hello Ananya, our career team has reviewed your assessment dataset. The target benchmark is set based on Tier-1 Java job profiles.",
          timestamp: "2026-09-29 10:30 AM"
        }
      ]
    }
  ],
  feedbackList: [
    {
      id: "FB-101",
      category: "Feature Improvement",
      rating: 5,
      text: "Skill Gap Analysis and AI Mock Interview features are immensely helpful for campus placement preparation!",
      isAnonymous: false,
      studentName: "Ananya Roy",
      createdAt: "2026-09-25"
    }
  ],
  ratingsList: [
    {
      studentId: "STU-7821",
      studentName: "Ananya Roy",
      rating: 5,
      review: "Excellent career platform with outstanding AI mock interview practice.",
      timestamp: "2026-09-26"
    }
  ],
  mindGamesStats: {
    totalGamesPlayed: 14,
    challengesCompleted: 28,
    dailyStreak: 5,
    lastChallengeDate: "2026-09-30",
    totalXP: 840,
    accuracy: 88,
    avgTimeSeconds: 42,
    personalBest: 1250,
    badges: [
      { id: "b1", title: "Brain Starter", icon: "🥉", desc: "Completed your first mind game!", unlocked: true },
      { id: "b2", title: "Logic Master", icon: "🧠", desc: "Scored 80%+ on 5 Logical Reasoning games.", unlocked: true },
      { id: "b3", title: "Memory Champion", icon: "🃏", desc: "Matched all pairs in under 45s.", unlocked: true },
      { id: "b4", title: "Puzzle Solver", icon: "🧩", desc: "Solved 10 puzzles total.", unlocked: true },
      { id: "b5", title: "Critical Thinker", icon: "💡", desc: "Solved River Crossing or Tower of Hanoi.", unlocked: true },
      { id: "b6", title: "7-Day Streak", icon: "🔥", desc: "Maintain a 7-day daily streak.", unlocked: false, progress: "5/7 Days" },
      { id: "b7", title: "Brain Challenge Expert", icon: "🎓", desc: "Reach 1000 total XP.", unlocked: false, progress: "840/1000 XP" }
    ]
  }
};

export function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDbData, null, 2), 'utf-8');
    return initialDbData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file, using fallback:', err);
    return initialDbData;
  }
}

export function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database file:', err);
    return false;
  }
}
