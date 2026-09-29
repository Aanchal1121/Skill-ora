import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Mic, 
  Layers, 
  Check, 
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Cloud,
  Code,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function CareerRoadmapPage({ studentProfile, onNavigate }) {
  // Selected career path ('Java Developer' | 'AI/ML Engineer' | 'Data Analyst' | 'Cloud Engineer')
  const [selectedCareer, setSelectedCareer] = useState(studentProfile?.targetRole || 'Java Developer');
  const [expandedStageId, setExpandedStageId] = useState(1);
  const [customTaskInput, setCustomTaskInput] = useState('');
  const [activeStageForTask, setActiveStageForTask] = useState(null);

  // Available Career Options with Match Calculation
  const careerOptions = [
    {
      id: 'java-dev',
      role: 'Java Developer',
      matchPct: 88,
      icon: Code,
      color: '#9333EA',
      bgColor: '#FAF7FF',
      description: 'Build robust enterprise backend APIs, microservices, and database architectures using Core Java, Spring Boot, and SQL.',
      requiredSkills: ['Core Java', 'SQL', 'Spring Boot', 'REST APIs', 'Git'],
      matchingSkills: ['Core Java', 'SQL', 'Git'],
      missingSkills: ['Spring Boot', 'REST APIs']
    },
    {
      id: 'aiml-engineer',
      role: 'AI/ML Engineer',
      matchPct: 82,
      icon: Cpu,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      description: 'Design machine learning models, neural networks, and GenAI pipelines using Python, PyTorch, and MLOps tools.',
      requiredSkills: ['Python', 'PyTorch/TensorFlow', 'ML Algorithms', 'SQL', 'Docker'],
      matchingSkills: ['Python', 'SQL'],
      missingSkills: ['PyTorch/TensorFlow', 'ML Algorithms', 'Docker']
    },
    {
      id: 'data-analyst',
      role: 'Data Analyst',
      matchPct: 79,
      icon: Database,
      color: '#059669',
      bgColor: '#ECFDF5',
      description: 'Transform raw business data into actionable insights using SQL, Python, PowerBI/Tableau, and statistical analysis.',
      requiredSkills: ['SQL', 'Python', 'PowerBI', 'Statistics', 'Data Visualization'],
      matchingSkills: ['SQL', 'Python'],
      missingSkills: ['PowerBI', 'Statistics', 'Data Visualization']
    },
    {
      id: 'cloud-engineer',
      role: 'Cloud Engineer',
      matchPct: 75,
      icon: Cloud,
      color: '#D97706',
      bgColor: '#FFFBEB',
      description: 'Architect, deploy, and manage scalable cloud infrastructure, CI/CD pipelines, and containers on AWS/Azure.',
      requiredSkills: ['AWS', 'Linux/Bash', 'Docker', 'Kubernetes', 'Terraform'],
      matchingSkills: ['Linux/Bash'],
      missingSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
    }
  ];

  // Role-Specific Roadmap Data Templates
  const roadmapsByRole = {
    'Java Developer': [
      {
        id: 1,
        title: 'Stage 1: Programming Fundamentals',
        description: 'Master Core Java syntax, object-oriented programming, data structures, and exception handling.',
        estDuration: '4 Weeks',
        whatToLearn: ['Core Java 17', 'OOP Principles (Inheritance, Polymorphism)', 'Java Collections Framework', 'Exception Handling & File I/O'],
        resources: [
          { name: 'NPTEL Programming in Java (Free)', link: 'https://nptel.ac.in' },
          { name: 'Oracle Java Documentation', link: 'https://docs.oracle.com/en/java/' }
        ],
        project: 'Student Grade & Attendance Management Console App',
        targetModule: 'skill-gap',
        moduleLabel: 'Skill Gap Analysis',
        tasks: [
          { id: 101, text: 'Complete Java Syntax & OOP Core Assessment', completed: true },
          { id: 102, text: 'Solve 25 Java Data Structures problems on Skillora', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Advanced Java & Databases',
        description: 'Understand multi-threading, JDBC database connectivity, and SQL query optimization.',
        estDuration: '3 Weeks',
        whatToLearn: ['Multithreading & Concurrency', 'JDBC & Hibernate ORM', 'Relational Database Design', 'SQL Joins & Indexing'],
        resources: [
          { name: 'PostgreSQL & SQL Deep Dive', link: 'https://postgresql.org' }
        ],
        project: 'Database-driven Library Management System',
        targetModule: 'skill-gap',
        moduleLabel: 'Database Skill Test',
        tasks: [
          { id: 201, text: 'Design relational schema with SQL primary/foreign keys', completed: true },
          { id: 202, text: 'Connect Java console app to MySQL via JDBC', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Backend Development with Spring Boot',
        description: 'Build production-ready RESTful web services using Spring Boot, Spring Security, and Maven.',
        estDuration: '4 Weeks',
        whatToLearn: ['Spring Boot 3.x Framework', 'REST API Architecture', 'Spring Data JPA & Hibernate', 'JWT Authentication & Git/GitHub'],
        resources: [
          { name: 'Spring Boot Official Guides', link: 'https://spring.io/guides' }
        ],
        project: 'E-Commerce Backend REST API with JWT Auth',
        targetModule: 'profile-analysis',
        moduleLabel: 'Projects & Profile',
        tasks: [
          { id: 301, text: 'Create Spring Boot CRUD REST APIs', completed: false },
          { id: 302, text: 'Integrate Spring Security JWT authentication', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Stage 4: Practical Projects & Cloud Deployment',
        description: 'Develop full backend services, write unit tests, and deploy applications to Render/AWS cloud.',
        estDuration: '3 Weeks',
        whatToLearn: ['JUnit 5 & Mockito Unit Testing', 'Docker Containerization Basics', 'Render / AWS Cloud Hosting', 'API Postman Documentation'],
        resources: [
          { name: 'Docker Handbook for Java Developers', link: 'https://docker.com' }
        ],
        project: 'Deployed Microservices Architecture Project',
        targetModule: 'learning-hub',
        moduleLabel: 'Project Hub',
        tasks: [
          { id: 401, text: 'Containerize Java app using Dockerfile', completed: false },
          { id: 402, text: 'Deploy backend API live and add link to GitHub README', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Stage 5: Internship & Job Preparation',
        description: 'Prepare Java backend ATS resume, attempt mock technical drives, and apply to hiring listings.',
        estDuration: '2 Weeks',
        whatToLearn: ['System Design Basics', 'Java Memory Model (JVM & Garbage Collection)', 'ATS Resume Optimization', 'Technical Interview Coding'],
        resources: [
          { name: 'Top 50 Java Backend Interview Q&A', link: 'https://geeksforgeeks.org' }
        ],
        project: 'Targeted Java Developer ATS Resume & Portfolio',
        targetModule: 'resume-analyzer',
        moduleLabel: 'ATS Resume Tools',
        tasks: [
          { id: 501, text: 'Run ATS Resume Scanner for Java Backend roles', completed: true },
          { id: 502, text: 'Attempt 1 AI Technical Mock Interview session', completed: true },
          { id: 503, text: 'Apply to 5 verified Java Backend internships on Skillora', completed: false }
        ]
      }
    ],
    'AI/ML Engineer': [
      {
        id: 1,
        title: 'Stage 1: Python & Mathematical Foundations',
        description: 'Master Python programming, NumPy matrix operations, linear algebra, and probability theory.',
        estDuration: '4 Weeks',
        whatToLearn: ['Python Core & Data Structures', 'NumPy & Vectorized Math', 'Linear Algebra & Calculus Basics', 'Statistics & Data Distributions'],
        resources: [
          { name: 'Python for Data Science (Free)', link: 'https://scipy.org' }
        ],
        project: 'Exploratory Data Analysis (EDA) Jupyter Notebook',
        targetModule: 'skill-gap',
        moduleLabel: 'Python Assessment',
        tasks: [
          { id: 101, text: 'Master Python arrays & Pandas dataframe manipulation', completed: true },
          { id: 102, text: 'Solve 20 statistics & data cleaning exercises', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Machine Learning Core Algorithms',
        description: 'Understand supervised and unsupervised ML algorithms using Scikit-Learn.',
        estDuration: '4 Weeks',
        whatToLearn: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'K-Means Clustering', 'Model Evaluation (Precision, Recall, ROC-AUC)'],
        resources: [
          { name: 'Scikit-Learn Official User Guide', link: 'https://scikit-learn.org' }
        ],
        project: 'Predictive Machine Learning Model on Real Dataset',
        targetModule: 'skill-gap',
        moduleLabel: 'ML Skill Test',
        tasks: [
          { id: 201, text: 'Train & tune Random Forest Classifier', completed: false },
          { id: 202, text: 'Evaluate feature importances and confusion matrix', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Deep Learning & Neural Networks',
        description: 'Build deep learning architectures and Neural Networks using PyTorch or TensorFlow.',
        estDuration: '5 Weeks',
        whatToLearn: ['Artificial Neural Networks (ANN)', 'Convolutional Neural Networks (CNN for Vision)', 'Recurrent Neural Networks & Transformers', 'PyTorch Tensor Pipelines'],
        resources: [
          { name: 'DeepLearning.AI Tutorials', link: 'https://deeplearning.ai' }
        ],
        project: 'Image Classification Neural Network in PyTorch',
        targetModule: 'profile-analysis',
        moduleLabel: 'Projects & Profile',
        tasks: [
          { id: 301, text: 'Implement CNN model for handwritten digit recognition', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Stage 4: MLOps & Model API Deployment',
        description: 'Deploy machine learning models as production REST APIs using FastAPI and Docker.',
        estDuration: '3 Weeks',
        whatToLearn: ['FastAPI Web Framework', 'Model Serialization (Joblib/ONNX)', 'Docker Containerization for ML', 'HuggingFace Spaces'],
        resources: [
          { name: 'FastAPI Official Documentation', link: 'https://fastapi.tiangolo.com' }
        ],
        project: 'Production Machine Learning API Deployed on Cloud',
        targetModule: 'learning-hub',
        moduleLabel: 'ML Project Hub',
        tasks: [
          { id: 401, text: 'Build FastAPI endpoint to serve model predictions', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Stage 5: AI Portfolio & Interview Prep',
        description: 'Publish Kaggle notebooks, prepare ML system design, and practice technical interview rounds.',
        estDuration: '2 Weeks',
        whatToLearn: ['ML System Design Concepts', 'Kaggle Notebook Publishing', 'AI/ML ATS Resume Keywords', 'Live ML Coding Interviews'],
        resources: [
          { name: 'Kaggle Competitions Index', link: 'https://kaggle.com' }
        ],
        project: 'GitHub & Kaggle AI Portfolio',
        targetModule: 'resume-analyzer',
        moduleLabel: 'Resume Scanner',
        tasks: [
          { id: 501, text: 'Optimize resume for AI/ML Engineer job postings', completed: false },
          { id: 502, text: 'Practice 1 AI Technical Mock Interview session', completed: true }
        ]
      }
    ],
    'Data Analyst': [
      {
        id: 1,
        title: 'Stage 1: SQL & Data Querying Essentials',
        description: 'Master SQL aggregation, joins, subqueries, and window functions for analytics.',
        estDuration: '3 Weeks',
        whatToLearn: ['SQL SELECT, WHERE, GROUP BY', 'INNER/LEFT/RIGHT Joins', 'Window Functions (ROW_NUMBER, DENSE_RANK)', 'Data Cleansing in SQL'],
        resources: [
          { name: 'SQLBolt Interactive Exercises', link: 'https://sqlbolt.com' }
        ],
        project: 'E-Commerce Sales SQL Query Analysis',
        targetModule: 'skill-gap',
        moduleLabel: 'SQL Skill Assessment',
        tasks: [
          { id: 101, text: 'Complete SQL Window Functions assessment on Skillora', completed: true },
          { id: 102, text: 'Write queries to compute Monthly Recurring Revenue (MRR)', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Business Intelligence & PowerBI',
        description: 'Design interactive business dashboards, data models, and KPI charts in PowerBI / Tableau.',
        estDuration: '3 Weeks',
        whatToLearn: ['PowerBI Desktop Interface', 'DAX Measures & Calculated Columns', 'Data Modeling (Star Schema)', 'Executive KPI Dashboards'],
        resources: [
          { name: 'Microsoft PowerBI Learning Center', link: 'https://learn.microsoft.com' }
        ],
        project: 'Interactive Executive Business Intelligence Dashboard',
        targetModule: 'profile-analysis',
        moduleLabel: 'Add Dashboard Project',
        tasks: [
          { id: 201, text: 'Build star schema data model connecting sales tables', completed: false },
          { id: 202, text: 'Publish interactive PowerBI dashboard report', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Python Data Stack',
        description: 'Automate data extraction, cleaning, and statistical analysis using Pandas and Seaborn.',
        estDuration: '3 Weeks',
        whatToLearn: ['Pandas DataFrames', 'Data Cleansing & Missing Value Handling', 'Matplotlib & Seaborn Data Viz', 'Statistical Hypothesis Testing'],
        resources: [
          { name: 'Pandas Official Tutorial', link: 'https://pandas.pydata.org' }
        ],
        project: 'Customer Churn Analysis in Python',
        targetModule: 'skill-gap',
        moduleLabel: 'Python Assessment',
        tasks: [
          { id: 301, text: 'Perform exploratory analysis on customer retention dataset', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Stage 4: Business Case Studies & Portfolio',
        description: 'Solve real-world business case studies and compile a data analytics portfolio on GitHub.',
        estDuration: '2 Weeks',
        whatToLearn: ['Business Metrics (CAC, LTV, Retention)', 'A/B Testing Analysis', 'Executive Data Storytelling', 'Portfolio README Formatting'],
        resources: [
          { name: 'Data Analyst Case Study Guide', link: 'https://kaggle.com' }
        ],
        project: 'Comprehensive Data Analytics Portfolio',
        targetModule: 'learning-hub',
        moduleLabel: 'Projects Hub',
        tasks: [
          { id: 401, text: 'Write executive summary for sales case study', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Stage 5: Analyst Job Preparation',
        description: 'Prepare data analyst resume, practice SQL live coding tests, and apply to job listings.',
        estDuration: '2 Weeks',
        whatToLearn: ['Live SQL Screening Tests', 'Business Case Study Interview Rounds', 'ATS Resume for Analysts', 'Job Search Strategy'],
        resources: [
          { name: 'LeetCode Database Problem Set', link: 'https://leetcode.com' }
        ],
        project: 'Targeted Data Analyst Job Applications',
        targetModule: 'internships-jobs',
        moduleLabel: 'Internships & Jobs',
        tasks: [
          { id: 501, text: 'Scan resume for Data Analyst ATS compliance', completed: true },
          { id: 502, text: 'Apply to 5 verified Data Analyst internships on Skillora', completed: false }
        ]
      }
    ],
    'Cloud Engineer': [
      {
        id: 1,
        title: 'Stage 1: Linux & Networking Fundamentals',
        description: 'Master Linux terminal commands, bash scripting, and IP networking concepts.',
        estDuration: '3 Weeks',
        whatToLearn: ['Linux CLI Commands & Permissions', 'Bash Shell Scripting', 'OSI Model, TCP/IP, DNS, Subnetting', 'SSH & Key Pair Management'],
        resources: [
          { name: 'Linux Journey Interactive Guide', link: 'https://linuxjourney.com' }
        ],
        project: 'Automated Server Setup Bash Script',
        targetModule: 'skill-gap',
        moduleLabel: 'Linux Assessment',
        tasks: [
          { id: 101, text: 'Master Linux file permissions and user management', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: AWS Cloud Core Services',
        description: 'Architect scalable cloud infrastructure using Amazon EC2, S3, IAM, and VPC.',
        estDuration: '4 Weeks',
        whatToLearn: ['AWS EC2 Virtual Servers', 'S3 Object Storage & CloudFront CDN', 'Virtual Private Cloud (VPC) & Security Groups', 'AWS IAM Security Policies'],
        resources: [
          { name: 'AWS Cloud Practitioner Essentials (Free)', link: 'https://aws.amazon.com' }
        ],
        project: 'Highly Available Multi-Tier AWS Cloud Architecture',
        targetModule: 'skill-gap',
        moduleLabel: 'AWS Skill Test',
        tasks: [
          { id: 201, text: 'Configure custom VPC with public and private subnets', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: DevOps, Docker & Containers',
        description: 'Containerize applications with Docker and manage orchestration using Kubernetes.',
        estDuration: '4 Weeks',
        whatToLearn: ['Dockerfiles & Docker Compose', 'Container Networking', 'Kubernetes Pods, Deployments & Services', 'CI/CD Pipelines (GitHub Actions)'],
        resources: [
          { name: 'Kubernetes Official Documentation', link: 'https://kubernetes.io' }
        ],
        project: 'Containerized Microservices Cluster Deployed on K8s',
        targetModule: 'profile-analysis',
        moduleLabel: 'Projects & Profile',
        tasks: [
          { id: 301, text: 'Create GitHub Actions CI/CD pipeline to build Docker image', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Stage 4: Infrastructure as Code (Terraform)',
        description: 'Automate cloud provisioning using Terraform declarative code scripts.',
        estDuration: '3 Weeks',
        whatToLearn: ['Terraform Syntax & HCL', 'State Management & Modules', 'Automated Cloud Provisioning', 'Cloud Cost Optimization'],
        resources: [
          { name: 'HashiCorp Terraform Learn', link: 'https://developer.hashicorp.com' }
        ],
        project: 'Terraform Provisioned AWS Infrastructure Repository',
        targetModule: 'learning-hub',
        moduleLabel: 'DevOps Hub',
        tasks: [
          { id: 401, text: 'Write Terraform scripts to provision EC2 and S3 automatically', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Stage 5: Cloud Career Preparation',
        description: 'Prepare AWS/Azure certification, ATS cloud resume, and interview rounds.',
        estDuration: '2 Weeks',
        whatToLearn: ['AWS Certified Solutions Architect Prep', 'Cloud Architecture Design Interviews', 'ATS Cloud Resume', 'Job Applications'],
        resources: [
          { name: 'AWS Certification Exam Guide', link: 'https://aws.amazon.com/certification' }
        ],
        project: 'Cloud Engineer Certified Portfolio',
        targetModule: 'resume-analyzer',
        moduleLabel: 'Resume Scanner',
        tasks: [
          { id: 501, text: 'Run ATS Resume Scanner for Cloud Engineer roles', completed: true },
          { id: 502, text: 'Apply to 5 verified Cloud Engineer positions on Skillora', completed: false }
        ]
      }
    ]
  };

  // Active Roadmap Stages state based on selected career role
  const activeRoadmap = roadmapsByRole[selectedCareer] || roadmapsByRole['Java Developer'];
  const [stagesState, setStagesState] = useState(activeRoadmap);

  // When user switches career goal
  const handleSwitchCareer = (newRoleTitle) => {
    if (newRoleTitle === selectedCareer) return;
    setSelectedCareer(newRoleTitle);
    setStagesState(roadmapsByRole[newRoleTitle] || roadmapsByRole['Java Developer']);
    setExpandedStageId(1);
  };

  // Toggle Task Completion
  const toggleTask = (stageId, taskId) => {
    setStagesState(stagesState.map(stg => {
      if (stg.id === stageId) {
        return {
          ...stg,
          tasks: stg.tasks.map(tsk => tsk.id === taskId ? { ...tsk, completed: !tsk.completed } : tsk)
        };
      }
      return stg;
    }));
  };

  // Add Custom Personal Task
  const handleAddCustomTask = (stageId) => {
    if (!customTaskInput.trim()) return;
    setStagesState(stagesState.map(stg => {
      if (stg.id === stageId) {
        return {
          ...stg,
          tasks: [...stg.tasks, { id: Date.now(), text: customTaskInput, completed: false }]
        };
      }
      return stg;
    }));
    setCustomTaskInput('');
    setActiveStageForTask(null);
  };

  // Progress tracking statistics
  const allTasks = stagesState.flatMap(s => s.tasks);
  const completedTasksCount = allTasks.filter(t => t.completed).length;
  const totalTasksCount = allTasks.length;
  const overallProgressPct = Math.round((completedTasksCount / totalTasksCount) * 100);

  const completedStagesCount = stagesState.filter(stg => stg.tasks.length > 0 && stg.tasks.every(t => t.completed)).length;
  const totalStagesCount = stagesState.length;

  const incompleteTasks = allTasks.filter(t => !t.completed).slice(0, 3);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & PROGRESS TRACKING DASHBOARD */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#F0EAFA', color: '#9333EA' }}>
            <Compass size={15} />
            <span>STRUCTURED SEQUENTIAL ROADMAP</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Career Guidance & Career Roadmap
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Step-by-step learning, project building & job readiness roadmap for <strong style={{ color: '#9333EA' }}>{selectedCareer}</strong>.
          </p>
        </div>

        {/* Progress Gauge */}
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '16px 24px', textAlign: 'center', minWidth: '220px' }}>
          <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 800, textTransform: 'uppercase' }}>ROADMAP COMPLETION</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#9333EA', margin: '2px 0' }}>
            {overallProgressPct}%
          </div>
          <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>
            {completedStagesCount} of {totalStagesCount} Stages Completed ({completedTasksCount}/{totalTasksCount} Tasks)
          </div>
        </div>
      </div>

      {/* 2. CAREER SELECTION & RECOMMENDATIONS (4 ROLES) */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={20} color="#9333EA" />
          <span>Recommended Career Paths for Your Profile</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {careerOptions.map((opt) => {
            const IconComp = opt.icon;
            const isSelected = selectedCareer === opt.role;

            return (
              <div
                key={opt.id}
                style={{
                  background: isSelected ? opt.bgColor : '#FFFFFF',
                  border: `2px solid ${isSelected ? opt.color : '#EAE2F8'}`,
                  borderRadius: '18px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? `0 4px 14px ${opt.color}20` : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ background: `${opt.color}15`, color: opt.color, padding: '8px', borderRadius: '10px' }}>
                      <IconComp size={20} />
                    </div>
                    <span className="badge-pill" style={{ background: isSelected ? opt.color : '#ECFDF5', color: isSelected ? '#FFFFFF' : '#059669', fontWeight: 800 }}>
                      {opt.matchPct}% Match
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>{opt.role}</h4>
                  <p style={{ fontSize: '0.84rem', color: '#4A3E56', lineHeight: '1.4', marginBottom: '10px' }}>
                    {opt.description}
                  </p>
                </div>

                <button
                  onClick={() => handleSwitchCareer(opt.role)}
                  className={isSelected ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                >
                  <span>{isSelected ? 'Active Roadmap ✓' : 'View Roadmap'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SEQUENTIAL CAREER ROADMAP (5 STAGES WITH EXPANDABLE DETAILS) */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '28px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>
              Sequential {selectedCareer} Roadmap
            </h3>
            <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>
              Sequential milestones from core fundamentals to job readiness. Click any stage to expand learning details.
            </p>
          </div>

          <button onClick={() => setStagesState(roadmapsByRole[selectedCareer])} className="btn-secondary" style={{ fontSize: '0.8rem' }}>
            <RotateCcw size={14} />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Vertical Timeline Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {stagesState.map((stage) => {
            const isExpanded = expandedStageId === stage.id;
            const completedCount = stage.tasks.filter(t => t.completed).length;
            const isStageComplete = stage.tasks.length > 0 && completedCount === stage.tasks.length;

            return (
              <div
                key={stage.id}
                style={{
                  background: isStageComplete ? '#ECFDF5' : '#FAF7FF',
                  border: `2px solid ${isStageComplete ? '#10B981' : isExpanded ? '#9333EA' : '#EAE2F8'}`,
                  borderRadius: '20px',
                  padding: '20px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Stage Header Accordion Toggle */}
                <div
                  onClick={() => setExpandedStageId(isExpanded ? null : stage.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap', gap: '10px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isStageComplete ? '#10B981' : '#9333EA',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem'
                    }}>
                      {isStageComplete ? '✓' : stage.id}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E' }}>{stage.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 600 }}>Duration: {stage.estDuration} • ({completedCount}/{stage.tasks.length} tasks completed)</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge-pill" style={{ background: isStageComplete ? '#10B981' : '#F0EAFA', color: isStageComplete ? '#FFFFFF' : '#9333EA' }}>
                      {isStageComplete ? 'Completed ✓' : completedCount > 0 ? 'In Progress' : 'Not Started'}
                    </span>
                    {isExpanded ? <ChevronUp size={20} color="#7A6F8A" /> : <ChevronDown size={20} color="#7A6F8A" />}
                  </div>
                </div>

                {/* Expandable Stage Details */}
                {isExpanded && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #EAE2F8' }} className="fade-in">
                    <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '14px' }}>
                      {stage.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                      
                      {/* What to Learn */}
                      <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#9333EA', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          📚 WHAT TO LEARN & SKILLS
                        </strong>
                        <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: '#2D1B4E', margin: 0 }}>
                          {stage.whatToLearn.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Learning Resources & Project */}
                      <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#059669', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          🛠️ RECOMMENDED PROJECT & RESOURCES
                        </strong>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '8px' }}>
                          Project: {stage.project}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 600 }}>Resources:</div>
                        {stage.resources.map((res, i) => (
                          <a key={i} href={res.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#9333EA', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <ExternalLink size={12} />
                            <span>{res.name}</span>
                          </a>
                        ))}
                      </div>

                    </div>

                    {/* Interactive Tasks Checklist */}
                    <div style={{ marginBottom: '14px' }}>
                      <strong style={{ fontSize: '0.84rem', color: '#2D1B4E', display: 'block', marginBottom: '8px' }}>
                        Checklist Tasks for Stage {stage.id}:
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {stage.tasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(stage.id, task.id)}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #EAE2F8',
                              padding: '10px 14px',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '6px',
                              border: `2px solid ${task.completed ? '#10B981' : '#C084FC'}`,
                              background: task.completed ? '#10B981' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FFFFFF'
                            }}>
                              {task.completed && <Check size={14} strokeWidth={3} />}
                            </div>
                            <span style={{
                              fontSize: '0.88rem',
                              fontWeight: 600,
                              color: task.completed ? '#7A6F8A' : '#2D1B4E',
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button & Add Custom Task */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <button onClick={() => onNavigate(stage.targetModule)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                        <span>Open {stage.moduleLabel} Module</span>
                        <ArrowRight size={14} />
                      </button>

                      {activeStageForTask === stage.id ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task..."
                            value={customTaskInput}
                            onChange={(e) => setCustomTaskInput(e.target.value)}
                            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                          />
                          <button onClick={() => handleAddCustomTask(stage.id)} className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>Add</button>
                        </div>
                      ) : (
                        <button onClick={() => setActiveStageForTask(stage.id)} style={{ background: 'none', border: 'none', color: '#9333EA', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Plus size={14} />
                          <span>Add Personal Task</span>
                        </button>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CONTINUE YOUR ROADMAP (NEXT INCOMPLETE TASKS) */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
        border: '1.5px solid #C084FC',
        borderRadius: '24px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#9333EA" />
          <span>Continue Your Roadmap (Next Recommended Steps)</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {incompleteTasks.map((t, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge-pill" style={{ background: '#FAF7FF', color: '#9333EA', fontSize: '0.74rem', marginBottom: '6px' }}>
                  NEXT MILESTONE #{idx + 1}
                </span>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>{t.text}</div>
                <div style={{ fontSize: '0.8rem', color: '#7A6F8A', marginBottom: '12px' }}>Action item for {selectedCareer} progression.</div>
              </div>
              <button onClick={() => onNavigate('skill-gap')} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                <span>Continue Milestone</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
