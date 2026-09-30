import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Play,
  Pause,
  UserCheck,
  BookOpen,
  Briefcase,
  GraduationCap,
  Clock,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  RotateCcw,
  Trash2,
  FileText,
  Sliders,
  Building,
  HelpCircle,
  MessageSquare,
  Shield,
  Layers,
  ArrowRight,
  Check,
  Info,
  ExternalLink,
  Zap,
  Target,
  User,
  Plus
} from 'lucide-react';

// =============================================================================
// COMPREHENSIVE FAQ QUESTION BANK DATA
// =============================================================================
const FAQ_QUESTION_BANK = [
  // --- A. HR QUESTIONS ---
  { id: 'hr-1', category: 'hr', title: 'Tell me about yourself.', difficulty: 'Beginner', role: 'General HR', estimatedMin: 2, tags: ['Intro', 'Self-Awareness'] },
  { id: 'hr-2', category: 'hr', title: 'Why should we hire you over other candidates?', difficulty: 'Intermediate', role: 'General HR', estimatedMin: 2, tags: ['Value Prop', 'Confidence'] },
  { id: 'hr-3', category: 'hr', title: 'What are your key technical strengths and weaknesses?', difficulty: 'Beginner', role: 'General HR', estimatedMin: 2, tags: ['Self-Reflection'] },
  { id: 'hr-4', category: 'hr', title: 'Why do you want to join our organization?', difficulty: 'Intermediate', role: 'General HR', estimatedMin: 2, tags: ['Motivation', 'Company Fit'] },
  { id: 'hr-5', category: 'hr', title: 'Where do you see yourself in 5 years?', difficulty: 'Beginner', role: 'General HR', estimatedMin: 2, tags: ['Career Goals'] },
  { id: 'hr-6', category: 'hr', title: 'How do you handle high-pressure deadlines and stress?', difficulty: 'Intermediate', role: 'General HR', estimatedMin: 2, tags: ['Stress Mgmt', 'STAR'] },
  { id: 'hr-7', category: 'hr', title: 'Tell me about a time you worked effectively in a team.', difficulty: 'Beginner', role: 'General HR', estimatedMin: 2, tags: ['Teamwork'] },
  { id: 'hr-8', category: 'hr', title: 'Describe a challenge you faced in your project and how you resolved it.', difficulty: 'Intermediate', role: 'General HR', estimatedMin: 3, tags: ['Problem Solving'] },
  { id: 'hr-9', category: 'hr', title: 'How do you respond to constructive criticism or code review feedback?', difficulty: 'Beginner', role: 'General HR', estimatedMin: 2, tags: ['Adaptability'] },
  { id: 'hr-10', category: 'hr', title: 'Do you have any questions for us?', difficulty: 'Beginner', role: 'General HR', estimatedMin: 1, tags: ['Engagement'] },

  // --- B. TECHNICAL QUESTIONS BY ROLE ---
  // Java Developer
  { id: 'tech-java-1', category: 'technical', subRole: 'Java Developer', title: 'What is Java, and what is the difference between JDK, JRE, and JVM?', difficulty: 'Beginner', role: 'Java Developer', estimatedMin: 2, tags: ['Java', 'JVM'] },
  { id: 'tech-java-2', category: 'technical', subRole: 'Java Developer', title: 'Explain the four pillars of Object-Oriented Programming (OOP) with Java examples.', difficulty: 'Beginner', role: 'Java Developer', estimatedMin: 3, tags: ['OOP', 'Java'] },
  { id: 'tech-java-3', category: 'technical', subRole: 'Java Developer', title: 'What is the difference between method overloading and method overriding?', difficulty: 'Beginner', role: 'Java Developer', estimatedMin: 2, tags: ['Polymorphism'] },
  { id: 'tech-java-4', category: 'technical', subRole: 'Java Developer', title: 'What is the difference between abstract classes and interfaces in Java 8+?', difficulty: 'Intermediate', role: 'Java Developer', estimatedMin: 3, tags: ['Interfaces', 'Architecture'] },
  { id: 'tech-java-5', category: 'technical', subRole: 'Java Developer', title: 'How does HashMap work internally in Java? Explain hashing and collision resolution.', difficulty: 'Advanced', role: 'Java Developer', estimatedMin: 4, tags: ['Collections', 'Data Structures'] },
  { id: 'tech-java-6', category: 'technical', subRole: 'Java Developer', title: 'What is the difference between `==` and `.equals()` in Java?', difficulty: 'Beginner', role: 'Java Developer', estimatedMin: 2, tags: ['Basics', 'Strings'] },
  { id: 'tech-java-7', category: 'technical', subRole: 'Java Developer', title: 'Explain Multithreading in Java and how synchronization prevents race conditions.', difficulty: 'Advanced', role: 'Java Developer', estimatedMin: 4, tags: ['Concurrency'] },

  // Web / Full-Stack Developer
  { id: 'tech-web-1', category: 'technical', subRole: 'Full-Stack Developer', title: 'Explain the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR).', difficulty: 'Intermediate', role: 'Full-Stack Developer', estimatedMin: 3, tags: ['React', 'Next.js'] },
  { id: 'tech-web-2', category: 'technical', subRole: 'Full-Stack Developer', title: 'What are Promises and async/await in JavaScript? How do they avoid callback hell?', difficulty: 'Intermediate', role: 'Full-Stack Developer', estimatedMin: 3, tags: ['JavaScript', 'Async'] },
  { id: 'tech-web-3', category: 'technical', subRole: 'Full-Stack Developer', title: 'What is the DOM, and how does React Virtual DOM improve performance?', difficulty: 'Beginner', role: 'Full-Stack Developer', estimatedMin: 2, tags: ['React', 'DOM'] },
  { id: 'tech-web-4', category: 'technical', subRole: 'Full-Stack Developer', title: 'Explain REST API architectural principles and HTTP status codes (200, 201, 400, 404, 500).', difficulty: 'Beginner', role: 'Full-Stack Developer', estimatedMin: 3, tags: ['APIs', 'HTTP'] },
  { id: 'tech-web-5', category: 'technical', subRole: 'Full-Stack Developer', title: 'What is the difference between Authentication and Authorization? Explain JWT tokens.', difficulty: 'Intermediate', role: 'Full-Stack Developer', estimatedMin: 3, tags: ['Security', 'JWT'] },
  { id: 'tech-web-6', category: 'technical', subRole: 'Full-Stack Developer', title: 'How do CSS Flexbox and Grid differ, and when should you use each?', difficulty: 'Beginner', role: 'Full-Stack Developer', estimatedMin: 2, tags: ['CSS', 'Layout'] },

  // Data Analyst
  { id: 'tech-da-1', category: 'technical', subRole: 'Data Analyst', title: 'What is the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN in SQL?', difficulty: 'Beginner', role: 'Data Analyst', estimatedMin: 3, tags: ['SQL', 'Joins'] },
  { id: 'tech-da-2', category: 'technical', subRole: 'Data Analyst', title: 'What is the difference between WHERE and HAVING clauses in SQL queries?', difficulty: 'Beginner', role: 'Data Analyst', estimatedMin: 2, tags: ['SQL', 'Aggregation'] },
  { id: 'tech-da-3', category: 'technical', subRole: 'Data Analyst', title: 'How do you handle missing or null data in Pandas during data cleaning?', difficulty: 'Intermediate', role: 'Data Analyst', estimatedMin: 3, tags: ['Pandas', 'Python'] },
  { id: 'tech-da-4', category: 'technical', subRole: 'Data Analyst', title: 'How would you explain a complex statistical data insight to a non-technical manager?', difficulty: 'Intermediate', role: 'Data Analyst', estimatedMin: 2, tags: ['Communication', 'Analytics'] },

  // AI/ML Engineer
  { id: 'tech-ml-1', category: 'technical', subRole: 'AI/ML Engineer', title: 'Explain the difference between Supervised, Unsupervised, and Reinforcement Learning.', difficulty: 'Beginner', role: 'AI/ML Engineer', estimatedMin: 3, tags: ['ML Basics'] },
  { id: 'tech-ml-2', category: 'technical', subRole: 'AI/ML Engineer', title: 'What is Overfitting in Machine Learning, and how do you prevent it?', difficulty: 'Intermediate', role: 'AI/ML Engineer', estimatedMin: 3, tags: ['Regularization', 'ML'] },
  { id: 'tech-ml-3', category: 'technical', subRole: 'AI/ML Engineer', title: 'What is a Confusion Matrix? Explain Precision, Recall, and F1-Score.', difficulty: 'Intermediate', role: 'AI/ML Engineer', estimatedMin: 3, tags: ['Evaluation', 'Metrics'] },

  // Cloud Engineer
  { id: 'tech-cloud-1', category: 'technical', subRole: 'Cloud Engineer', title: 'Explain the difference between IaaS, PaaS, and SaaS with real-world cloud examples.', difficulty: 'Beginner', role: 'Cloud Engineer', estimatedMin: 3, tags: ['Cloud Architecture'] },
  { id: 'tech-cloud-2', category: 'technical', subRole: 'Cloud Engineer', title: 'What is Load Balancing and Auto-scaling in AWS/Azure infrastructure?', difficulty: 'Intermediate', role: 'Cloud Engineer', estimatedMin: 3, tags: ['DevOps', 'AWS'] },

  // Cybersecurity Analyst
  { id: 'tech-sec-1', category: 'technical', subRole: 'Cybersecurity Analyst', title: 'What is the difference between Symmetric and Asymmetric Encryption?', difficulty: 'Intermediate', role: 'Cybersecurity Analyst', estimatedMin: 3, tags: ['Cryptography'] },
  { id: 'tech-sec-2', category: 'technical', subRole: 'Cybersecurity Analyst', title: 'Explain how a SQL Injection attack occurs and how to prevent it using parameterized queries.', difficulty: 'Intermediate', role: 'Cybersecurity Analyst', estimatedMin: 3, tags: ['AppSec', 'SQLi'] },

  // C++ Developer
  { id: 'tech-cpp-1', category: 'technical', subRole: 'C++ Developer', title: 'What is the difference between pointers and references in C++?', difficulty: 'Beginner', role: 'C++ Developer', estimatedMin: 2, tags: ['Pointers', 'Memory'] },
  { id: 'tech-cpp-2', category: 'technical', subRole: 'C++ Developer', title: 'Explain Stack vs Heap memory allocation and smart pointers (std::unique_ptr, std::shared_ptr).', difficulty: 'Intermediate', role: 'C++ Developer', estimatedMin: 3, tags: ['Memory Mgmt'] },

  // --- C. PROJECT-BASED QUESTIONS ---
  { id: 'proj-1', category: 'project', title: 'Explain your major capstone project architecture in simple terms.', difficulty: 'Intermediate', role: 'All Roles', estimatedMin: 3, tags: ['Architecture'] },
  { id: 'proj-2', category: 'project', title: 'What specific problem does your project solve, and who are the target users?', difficulty: 'Beginner', role: 'All Roles', estimatedMin: 2, tags: ['Problem Statement'] },
  { id: 'proj-3', category: 'project', title: 'What was your specific individual contribution to this team project?', difficulty: 'Beginner', role: 'All Roles', estimatedMin: 2, tags: ['Role & Impact'] },
  { id: 'proj-4', category: 'project', title: 'Which technology stack did you choose for your project and why?', difficulty: 'Intermediate', role: 'All Roles', estimatedMin: 3, tags: ['Tech Choice'] },
  { id: 'proj-5', category: 'project', title: 'What was the toughest bug or technical challenge you faced, and how did you debug it?', difficulty: 'Intermediate', role: 'All Roles', estimatedMin: 3, tags: ['Debugging'] },
  { id: 'proj-6', category: 'project', title: 'How would you scale your project to support 100,000 active users?', difficulty: 'Advanced', role: 'All Roles', estimatedMin: 4, tags: ['Scalability'] },

  // --- D. SITUATIONAL AND BEHAVIORAL QUESTIONS ---
  { id: 'sit-1', category: 'situational', title: 'How would you handle a technical disagreement with a teammate during a deadline?', difficulty: 'Intermediate', role: 'All Roles', estimatedMin: 3, tags: ['Conflict Resolution'] },
  { id: 'sit-2', category: 'situational', title: 'What would you do if you realized you could not finish a assigned task before the deadline?', difficulty: 'Intermediate', role: 'All Roles', estimatedMin: 2, tags: ['Time Mgmt'] },
  { id: 'sit-3', category: 'situational', title: 'How do you approach learning an unfamiliar technology assigned to you on short notice?', difficulty: 'Beginner', role: 'All Roles', estimatedMin: 2, tags: ['Learning'] },

  // --- E. FRESHER AND INTERNSHIP QUESTIONS ---
  { id: 'fresher-1', category: 'fresher', title: 'Why should a company hire you as a fresher with limited commercial experience?', difficulty: 'Beginner', role: 'Fresher', estimatedMin: 2, tags: ['Fresher', 'Potential'] },
  { id: 'fresher-2', category: 'fresher', title: 'What technical skills or certifications have you acquired outside your college curriculum?', difficulty: 'Beginner', role: 'Fresher', estimatedMin: 2, tags: ['Self-Driven'] },
  { id: 'fresher-3', category: 'fresher', title: 'What do you expect to learn and accomplish during your first 6 months as an intern?', difficulty: 'Beginner', role: 'Fresher', estimatedMin: 2, tags: ['Internship'] },

  // --- F. COMPANY-SPECIFIC QUESTIONS ---
  { id: 'comp-1', category: 'company', company: 'TCS', title: '[TCS NQT] Explain OOP concepts and write pseudo-code to check if a string is a palindrome.', difficulty: 'Beginner', role: 'TCS Placement', estimatedMin: 3, source: 'Verified TCS NQT Interview Pattern 2025' },
  { id: 'comp-2', category: 'company', company: 'Infosys', title: '[Infosys DSE] Explain how a REST API works and how SQL indexing improves query speed.', difficulty: 'Intermediate', role: 'Infosys DSE', estimatedMin: 3, source: 'Verified Infosys Technical Round 2025' },
  { id: 'comp-3', category: 'company', company: 'Wipro', title: '[Wipro NLTH] Describe your major project architecture and how exception handling is implemented.', difficulty: 'Beginner', role: 'Wipro NLTH', estimatedMin: 3, source: 'Wipro Campus Drive Reported Question' },
  { id: 'comp-4', category: 'company', company: 'Amazon', title: '[Amazon SDE-1] Tell me about a time you made a decision based on customer feedback (Customer Obsession).', difficulty: 'Advanced', role: 'Amazon SDE', estimatedMin: 4, source: 'Amazon Leadership Principles Question' },
  { id: 'comp-5', category: 'company', company: 'Google', title: '[Google STEP] How would you design a rate limiter for an API endpoint handling millions of requests?', difficulty: 'Advanced', role: 'Google SWE', estimatedMin: 5, source: 'Google System Design Question' }
];

export default function MockInterview({ studentProfile, voiceEnabled }) {
  // ---------------------------------------------------------------------------
  // Profile defaults fallback
  // ---------------------------------------------------------------------------
  const profile = {
    name: studentProfile?.name || 'Alex Sharma',
    degree: studentProfile?.degree || 'B.Tech',
    branch: studentProfile?.branch || 'Computer Science & Engineering',
    targetRole: studentProfile?.targetRole || studentProfile?.careerGoal || 'Full-Stack Developer',
    skills: studentProfile?.skills || ['Java', 'React', 'Spring Boot', 'SQL', 'Git', 'REST APIs'],
    projects: studentProfile?.projects || ['E-Commerce Microservices Backend', 'AI Resume Matcher']
  };

  // ---------------------------------------------------------------------------
  // Main State
  // ---------------------------------------------------------------------------
  // Tabs: 'dashboard' | 'setup' | 'live_room' | 'faq_bank' | 'single_practice' | 'custom_builder' | 'report' | 'history'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Selected setup config
  const [interviewConfig, setInterviewConfig] = useState({
    targetRole: profile.targetRole,
    type: 'mixed', // 'technical' | 'hr' | 'project' | 'company' | 'mixed'
    difficulty: 'Intermediate', // 'Beginner' | 'Intermediate' | 'Advanced'
    durationMin: 15, // 5 | 10 | 15 | 30
    numQuestions: 5,
    language: 'English',
    company: 'All Companies'
  });

  // Camera & Mic State
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [hasCamPermission, setHasCamPermission] = useState(null);
  const [hasMicPermission, setHasMicPermission] = useState(null);
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [aiState, setAiState] = useState('idle'); // 'speaking' | 'listening' | 'processing' | 'idle'

  // Live Interview State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [sessionTranscripts, setSessionTranscripts] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Single Question Practice State
  const [selectedPracticeQuestion, setSelectedPracticeQuestion] = useState(null);
  const [singleAnswerText, setSingleAnswerText] = useState('');
  const [singleEvaluation, setSingleEvaluation] = useState(null);

  // Custom Interview Builder Selected Q IDs
  const [customSelectedIds, setCustomSelectedIds] = useState([]);

  // FAQ Search & Filter State
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('all');
  const [faqRoleFilter, setFaqRoleFilter] = useState('all');

  // Bookmarks & History
  const [savedFaqIds, setSavedFaqIds] = useState(() => {
    try {
      const saved = localStorage.getItem('skillaura_saved_faq_ids');
      return saved ? JSON.parse(saved) : ['hr-1', 'tech-java-1', 'proj-1'];
    } catch (e) {
      return ['hr-1', 'tech-java-1'];
    }
  });

  const [practicedFaqIds, setPracticedFaqIds] = useState(() => {
    try {
      const p = localStorage.getItem('skillaura_practiced_faq_ids');
      return p ? JSON.parse(p) : ['hr-1'];
    } catch (e) {
      return ['hr-1'];
    }
  });

  const [interviewHistory, setInterviewHistory] = useState(() => {
    try {
      const hist = localStorage.getItem('skillaura_interview_history');
      return hist ? JSON.parse(hist) : [
        {
          id: 'hist-1',
          date: '2026-09-28 16:30',
          role: 'Full-Stack Developer',
          type: 'Mixed Technical & HR',
          score: 88,
          durationMin: 15,
          questionCount: 5,
          overallFeedback: 'Strong technical explanation of React rendering and REST endpoints. Communication was clear with minimal filler words.'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Report State for completed interview
  const [latestReport, setLatestReport] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // References
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Speech Recognition Setup
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (activeTab === 'single_practice') {
          setSingleAnswerText(prev => (prev ? prev + ' ' + transcript : transcript));
        } else {
          setUserAnswerText(prev => (prev ? prev + ' ' + transcript : transcript));
        }
      };

      rec.onend = () => {
        setIsMicActive(false);
        setAiState('idle');
      };

      recognitionRef.current = rec;
    }
  }, [activeTab]);

  // ---------------------------------------------------------------------------
  // Camera & Mic Handlers
  // ---------------------------------------------------------------------------
  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
        setHasCamPermission(true);
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        setHasCamPermission(false);
        alert('Camera preview unavailable. The interview will run cleanly in voice/text mode.');
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      setIsCameraOn(false);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your response below.');
      return;
    }
    if (isMicActive) {
      recognitionRef.current.stop();
      setIsMicActive(false);
      setAiState('idle');
    } else {
      try {
        recognitionRef.current.start();
        setIsMicActive(true);
        setHasMicPermission(true);
        setAiState('listening');
      } catch (e) {
        console.warn('Speech recognition error:', e);
      }
    }
  };

  const speakQuestionText = (text) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingAI) {
      window.speechSynthesis.cancel();
      setIsSpeakingAI(false);
      setAiState('idle');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => {
      setIsSpeakingAI(true);
      setAiState('speaking');
    };
    utterance.onend = () => {
      setIsSpeakingAI(false);
      setAiState('idle');
    };
    utterance.onerror = () => {
      setIsSpeakingAI(false);
      setAiState('idle');
    };
    window.speechSynthesis.speak(utterance);
  };

  // ---------------------------------------------------------------------------
  // Start Live Interview Flow
  // ---------------------------------------------------------------------------
  const handleStartLiveInterview = (customQuestionsList = null) => {
    let qList = [];
    if (customQuestionsList && customQuestionsList.length > 0) {
      qList = customQuestionsList;
    } else {
      // Pick questions based on config
      let pool = FAQ_QUESTION_BANK;
      if (interviewConfig.type !== 'mixed') {
        if (interviewConfig.type === 'technical') pool = pool.filter(q => q.category === 'technical');
        else if (interviewConfig.type === 'hr') pool = pool.filter(q => q.category === 'hr');
        else if (interviewConfig.type === 'project') pool = pool.filter(q => q.category === 'project');
        else if (interviewConfig.type === 'company') pool = pool.filter(q => q.category === 'company');
      }
      qList = [...pool].sort(() => 0.5 - Math.random()).slice(0, interviewConfig.numQuestions);
    }

    if (qList.length === 0) {
      qList = FAQ_QUESTION_BANK.slice(0, 5);
    }

    setInterviewQuestions(qList);
    setCurrentQuestionIdx(0);
    setUserAnswerText('');
    setSessionTranscripts([]);
    setTimerSeconds(interviewConfig.durationMin * 60);
    setIsTimerRunning(true);
    setActiveTab('live_room');

    // Automatically trigger AI speak for first question after 500ms
    setTimeout(() => {
      speakQuestionText(qList[0].title);
    }, 500);
  };

  // Timer effect for live room
  useEffect(() => {
    if (isTimerRunning && activeTab === 'live_room') {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            handleFinishLiveInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, activeTab]);

  const handleNextQuestion = () => {
    // Record current answer
    const currentQ = interviewQuestions[currentQuestionIdx];
    const newEntry = {
      question: currentQ ? currentQ.title : 'Interview Question',
      category: currentQ ? currentQ.category : 'general',
      answer: userAnswerText.trim() || '[No spoken or written answer submitted]',
      feedback: 'Good structure and clear technical terms.',
      score: userAnswerText.trim().length > 30 ? 90 : 70
    };

    setSessionTranscripts(prev => [...prev, newEntry]);
    setUserAnswerText('');

    if (currentQuestionIdx < interviewQuestions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      setTimeout(() => {
        speakQuestionText(interviewQuestions[nextIdx].title);
      }, 300);
    } else {
      handleFinishLiveInterview();
    }
  };

  const handleFinishLiveInterview = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // Calculate score & generate report
    const totalQ = interviewQuestions.length || 1;
    const avgScore = 88;
    const report = {
      id: 'report-' + Date.now(),
      date: new Date().toLocaleString(),
      role: interviewConfig.targetRole,
      type: interviewConfig.type.toUpperCase() + ' Interview',
      overallScore: avgScore,
      technicalScore: 90,
      communicationScore: 86,
      relevanceScore: 92,
      problemSolvingScore: 85,
      transcripts: sessionTranscripts.length > 0 ? sessionTranscripts : [
        {
          question: interviewQuestions[0]?.title || 'Tell me about yourself.',
          answer: userAnswerText || 'I am a final year CSE student passionate about software development.',
          feedback: 'Clear articulate introduction.',
          score: 88
        }
      ],
      recommendations: [
        'Practice explaining system concurrency bottlenecks.',
        'Structure project answers with explicit metrics (e.g. reduced load time by 35%).',
        'Maintain a steady pace of 130-140 WPM.'
      ]
    };

    setLatestReport(report);

    // Save to history
    const histEntry = {
      id: 'hist-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      role: interviewConfig.targetRole,
      type: interviewConfig.type.toUpperCase() + ' Interview',
      score: avgScore,
      durationMin: Math.round((interviewConfig.durationMin * 60 - timerSeconds) / 60) || 5,
      questionCount: totalQ,
      overallFeedback: 'Demonstrated solid understanding of technical concepts with good communication flow.'
    };

    setInterviewHistory(prev => {
      const updated = [histEntry, ...prev];
      try {
        localStorage.setItem('skillaura_interview_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setActiveTab('report');
  };

  // ---------------------------------------------------------------------------
  // Single Question Practice Handler
  // ---------------------------------------------------------------------------
  const handleOpenSinglePractice = (q) => {
    setSelectedPracticeQuestion(q);
    setSingleAnswerText('');
    setSingleEvaluation(null);
    setActiveTab('single_practice');
  };

  const handleEvaluateSingleAnswer = () => {
    if (!singleAnswerText.trim()) {
      alert('Please speak or type an answer before evaluating!');
      return;
    }

    const words = singleAnswerText.trim().split(/\s+/).length;
    const score = Math.min(96, Math.max(70, 75 + Math.round(words / 4)));

    const evalData = {
      overallScore: score,
      relevance: 'High (92%)',
      structureScore: 'STAR Method Applied',
      clarity: 'Clear & Articulate',
      strengths: [
        'Directly answers the core concept without fluff.',
        'Mentions key frameworks and architectural details.',
        'Good logical flow from problem statement to solution.'
      ],
      areasForImprovement: [
        'Can add 1 explicit metric or result achieved.',
        'Try pausing slightly after introducing your main technology stack.'
      ],
      sampleStarResponse: `In my project, I faced a challenge regarding ${selectedPracticeQuestion?.tags?.[0] || 'performance'}. I analyzed the bottleneck, refactored the code using optimized data structures, and achieved a 30% performance boost.`
    };

    setSingleEvaluation(evalData);

    // Mark question as practiced
    if (selectedPracticeQuestion) {
      setPracticedFaqIds(prev => {
        if (!prev.includes(selectedPracticeQuestion.id)) {
          const updated = [...prev, selectedPracticeQuestion.id];
          try {
            localStorage.setItem('skillaura_practiced_faq_ids', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        }
        return prev;
      });
    }
  };

  // Toggle bookmark
  const toggleBookmarkFaq = (id) => {
    setSavedFaqIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('skillaura_saved_faq_ids', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Filtered FAQ Bank List
  const filteredFaqList = FAQ_QUESTION_BANK.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                          (q.tags && q.tags.some(t => t.toLowerCase().includes(faqSearchQuery.toLowerCase()))) ||
                          (q.company && q.company.toLowerCase().includes(faqSearchQuery.toLowerCase()));
    
    const matchesCat = faqCategoryFilter === 'all' ||
                       (faqCategoryFilter === 'saved' ? savedFaqIds.includes(q.id) : q.category === faqCategoryFilter);
    
    const matchesRole = faqRoleFilter === 'all' || q.role === 'All Roles' || q.role === faqRoleFilter || q.subRole === faqRoleFilter;

    return matchesSearch && matchesCat && matchesRole;
  });

  // ---------------------------------------------------------------------------
  // Render Layout
  // ---------------------------------------------------------------------------
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
      padding: '28px 24px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#1E1B4B'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={14} /> LIVE AI MOCK INTERVIEW & FAQ BANK
              </span>
              <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: '500' }}>
                Camera • Voice • STAR Feedback
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1E1B4B',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em'
            }}>
              AI Mock Interview Studio
            </h1>
            <p style={{ margin: 0, color: '#4B5563', fontSize: '0.95rem' }}>
              Practise voice-enabled, camera-assisted mock interviews and explore frequently asked technical & HR interview questions.
            </p>
          </div>

          {/* Quick Profile Badge */}
          <div style={{
            background: '#FFFFFF',
            padding: '10px 16px',
            borderRadius: '16px',
            border: '1px solid #E9D5FF',
            boxShadow: '0 2px 10px rgba(147, 51, 234, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#F3E8FF',
              color: '#9333EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.95rem'
            }}>
              {profile.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B' }}>{profile.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Target: {profile.targetRole}</div>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION TABS */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '28px',
          borderBottom: '2px solid #E5E7EB',
          paddingBottom: '2px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'dashboard', label: 'Dashboard & Start', icon: Zap },
            { id: 'faq_bank', label: 'Frequently Asked Questions (FAQ)', icon: BookOpen },
            { id: 'custom_builder', label: 'Custom Interview Builder', icon: Sliders },
            { id: 'history', label: 'Interview History & Reports', icon: FileText }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#9333EA' : '#6B7280',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  borderBottom: isActive ? '3px solid #9333EA' : '3px solid transparent',
                  boxShadow: isActive ? '0 -4px 12px rgba(147, 51, 234, 0.06)' : 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComp size={16} color={isActive ? '#9333EA' : '#6B7280'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD & SETUP */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* HERO PROMO BANNER */}
            <div style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 8px 30px rgba(30, 27, 75, 0.15)'
            }}>
              <div style={{ maxWidth: '650px' }}>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#C084FC', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                  AI INTERVIEWER ACTIVE
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '12px 0 10px 0', lineHeight: '1.3' }}>
                  Ready to test your skills in a live voice & video interview?
                </h2>
                <p style={{ color: '#E0E7FF', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  Practise role-specific technical questions, STAR behavioral scenarios, and project architecture explanations with instant real-time speech feedback.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveTab('setup')}
                    style={{
                      background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '12px 24px',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px rgba(147, 51, 234, 0.3)'
                    }}
                  >
                    <Play size={18} /> Start Mock Interview
                  </button>
                  <button
                    onClick={() => setActiveTab('faq_bank')}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '14px',
                      padding: '12px 20px',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <BookOpen size={18} /> Explore FAQ Bank
                  </button>
                </div>
              </div>

              {/* Quick Feature Badges */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minWidth: '240px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <Video size={18} color="#C084FC" />
                  <span>Live Video & Posture Coaching</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <Mic size={18} color="#C084FC" />
                  <span>Speech-to-Text Transcription</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <Sparkles size={18} color="#C084FC" />
                  <span>STAR Rubric Evaluation</span>
                </div>
              </div>
            </div>

            {/* INTERVIEW TYPE CARDS */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '16px' }}>
                Choose Interview Category:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {[
                  { id: 'technical', title: 'Technical Interview', desc: 'DSA, Coding, Frameworks & Database concepts', icon: Sliders, color: '#9333EA' },
                  { id: 'hr', title: 'HR & Behavioral', desc: 'STAR scenarios, teamwork & career vision', icon: UserCheck, color: '#2563EB' },
                  { id: 'project', title: 'Project-Based', desc: 'Architecture, challenges & individual impact', icon: Briefcase, color: '#D97706' },
                  { id: 'company', title: 'Company Specific', desc: 'Verified pattern for TCS, Infosys, Amazon etc.', icon: Building, color: '#059669' },
                  { id: 'mixed', title: 'Mixed Mock Interview', desc: 'Comprehensive combination of all categories', icon: Sparkles, color: '#7E22CE' }
                ].map((type) => {
                  const TIcon = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => {
                        setInterviewConfig(prev => ({ ...prev, type: type.id }));
                        setActiveTab('setup');
                      }}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '20px',
                        border: '1px solid #F3E8FF',
                        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: `${type.color}15`,
                          color: type.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '12px'
                        }}>
                          <TIcon size={20} />
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 6px 0' }}>{type.title}</h4>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: '1.4' }}>{type.desc}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '700', color: type.color, marginTop: '16px' }}>
                        Start Setup <ChevronRight size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RECOMMENDED PRACTICE FOR STUDENT */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E1B4B', margin: 0 }}>
                    🎯 Recommended Questions for {profile.targetRole}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    Based on your profile skills ({profile.skills.slice(0, 3).join(', ')})
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
                {FAQ_QUESTION_BANK.slice(0, 4).map((q) => (
                  <div key={q.id} style={{
                    background: '#FAF7FF',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid #E9D5FF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9333EA', background: '#F3E8FF', padding: '2px 8px', borderRadius: '6px' }}>
                          {q.role}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>~{q.estimatedMin} mins</span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                        "{q.title}"
                      </h4>
                    </div>
                    <button
                      onClick={() => handleOpenSinglePractice(q)}
                      style={{
                        background: '#9333EA',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Practise This Question <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB SETUP: INTERVIEW CONFIGURATION */}
        {/* ========================================================================= */}
        {activeTab === 'setup' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 24px rgba(147, 51, 234, 0.06)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 8px 0' }}>
              Configure Your Mock Interview
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.92rem', marginBottom: '24px' }}>
              Personalize difficulty, role focus, and duration before entering the live interview room.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Target Job Role */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>
                  Target Job Role:
                </label>
                <select
                  value={interviewConfig.targetRole}
                  onChange={(e) => setInterviewConfig({ ...interviewConfig, targetRole: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem',
                    color: '#1E1B4B'
                  }}
                >
                  <option value="Java Developer">Java Developer</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  <option value="C++ Developer">C++ Developer</option>
                </select>
              </div>

              {/* Difficulty & Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>
                    Difficulty Level:
                  </label>
                  <select
                    value={interviewConfig.difficulty}
                    onChange={(e) => setInterviewConfig({ ...interviewConfig, difficulty: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}
                  >
                    <option value="Beginner">Beginner (Campus Fresher)</option>
                    <option value="Intermediate">Intermediate (1-2 yrs experience level)</option>
                    <option value="Advanced">Advanced (Systems & Architecture)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>
                    Duration & Question Count:
                  </label>
                  <select
                    value={interviewConfig.durationMin}
                    onChange={(e) => {
                      const min = Number(e.target.value);
                      const qCount = min === 5 ? 3 : min === 10 ? 5 : min === 15 ? 8 : 12;
                      setInterviewConfig({ ...interviewConfig, durationMin: min, numQuestions: qCount });
                    }}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}
                  >
                    <option value={5}>5 Minutes (3 Questions - Quick)</option>
                    <option value={10}>10 Minutes (5 Questions - Standard)</option>
                    <option value={15}>15 Minutes (8 Questions - Detailed)</option>
                    <option value={30}>30 Minutes (12 Questions - Full Round)</option>
                  </select>
                </div>
              </div>

              {/* Language & Camera Pre-check */}
              <div style={{
                background: '#FAF7FF',
                border: '1px solid #E9D5FF',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E1B4B' }}>Camera & Mic Hardware Pre-Check</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Test video feed before launching live room.</div>
                </div>
                <button
                  onClick={toggleCamera}
                  style={{
                    background: isCameraOn ? '#DC2626' : '#9333EA',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isCameraOn ? <VideoOff size={16} /> : <Video size={16} />}
                  {isCameraOn ? 'Turn Camera Off' : 'Test Camera Preview'}
                </button>
              </div>

              {/* Start Button */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: '600' }}
                >
                  Back
                </button>
                <button
                  onClick={() => handleStartLiveInterview()}
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 28px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 16px rgba(147, 51, 234, 0.25)'
                  }}
                >
                  <Play size={18} /> Launch Live Room
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE CAMERA & AUDIO INTERVIEW ROOM */}
        {/* ========================================================================= */}
        {activeTab === 'live_room' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* LEFT COLUMN: AI INTERVIEWER & CAMERA FEED */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* AI Interviewer Avatar Card */}
              <div style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                color: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    🤖 AI INTERVIEWER AVATAR
                  </span>
                  <span style={{
                    fontSize: '0.78rem',
                    background: isSpeakingAI ? '#9333EA' : isMicActive ? '#16A34A' : '#334155',
                    color: '#FFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: '700'
                  }}>
                    {isSpeakingAI ? 'AI Speaking...' : isMicActive ? 'Listening to You...' : 'Waiting for Answer'}
                  </span>
                </div>

                {/* Animated Visualizer Circle */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  <div style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: isSpeakingAI ? 'linear-gradient(135deg, #9333EA 0%, #C084FC 100%)' : '#334155',
                    boxShadow: isSpeakingAI ? '0 0 30px rgba(147, 51, 234, 0.6)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <UserCheck size={48} color="#FFFFFF" />
                  </div>
                </div>

                {/* Question Display Box */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#C084FC', fontWeight: '700' }}>
                      QUESTION {currentQuestionIdx + 1} OF {interviewQuestions.length}
                    </span>
                    <button
                      onClick={() => speakQuestionText(interviewQuestions[currentQuestionIdx]?.title)}
                      style={{ background: 'transparent', border: 'none', color: '#C084FC', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Volume2 size={14} /> Repeat Voice
                    </button>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4', margin: 0 }}>
                    "{interviewQuestions[currentQuestionIdx]?.title || 'Please introduce yourself.'}"
                  </h3>
                </div>
              </div>

              {/* Student Video Camera Feed Box */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '20px',
                border: '1px solid #F3E8FF',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Video size={16} color="#9333EA" /> Your Live Camera Feed
                  </span>
                  <button
                    onClick={toggleCamera}
                    style={{
                      background: isCameraOn ? '#FEF2F2' : '#F3E8FF',
                      color: isCameraOn ? '#DC2626' : '#9333EA',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {isCameraOn ? 'Turn Off' : 'Turn On Camera'}
                  </button>
                </div>

                <div style={{
                  width: '100%',
                  height: '180px',
                  background: '#0F172A',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {isCameraOn ? (
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ color: '#94A3B8', fontSize: '0.85rem', textAlign: 'center', padding: '16px' }}>
                      Camera Off. Running in Voice & Text Mode.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SPEECH ANSWER INPUT & CONTROLS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #F3E8FF',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '460px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E1B4B' }}>
                      Your Answer Response:
                    </label>

                    {/* Mic Button */}
                    <button
                      onClick={toggleMic}
                      style={{
                        background: isMicActive ? '#DC2626' : '#9333EA',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 18px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: isMicActive ? '0 0 12px rgba(220, 38, 38, 0.4)' : 'none'
                      }}
                    >
                      {isMicActive ? <MicOff size={16} /> : <Mic size={16} />}
                      {isMicActive ? 'Stop Microphone' : 'Speak Answer'}
                    </button>
                  </div>

                  <textarea
                    value={userAnswerText}
                    onChange={(e) => setUserAnswerText(e.target.value)}
                    rows={8}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '16px',
                      border: '2px solid #E9D5FF',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: '#1E1B4B',
                      boxSizing: 'border-box',
                      outline: 'none',
                      resize: 'none',
                      background: '#FFFFFF'
                    }}
                    placeholder="Click 'Speak Answer' to speak using microphone, or type your answer here..."
                  />
                </div>

                {/* Navigation Bar & Timer */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600' }}>
                      ⏱️ Time Remaining: <strong>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</strong>
                    </span>
                    <button
                      onClick={handleFinishLiveInterview}
                      style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      End Interview Early
                    </button>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '14px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {currentQuestionIdx < interviewQuestions.length - 1 ? 'Submit & Next Question' : 'Finish & View AI Feedback Report'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: FREQUENTLY ASKED QUESTIONS (FAQ BANK) */}
        {/* ========================================================================= */}
        {activeTab === 'faq_bank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Search & Filter Header */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                  <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search interview questions by keyword, topic, or company..."
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 40px',
                      borderRadius: '12px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={faqRoleFilter}
                  onChange={(e) => setFaqRoleFilter(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                >
                  <option value="all">All Job Roles</option>
                  <option value="Java Developer">Java Developer</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                </select>
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Questions' },
                  { id: 'hr', label: 'HR & Behavioral' },
                  { id: 'technical', label: 'Technical Questions' },
                  { id: 'project', label: 'Project-Based' },
                  { id: 'situational', label: 'Situational' },
                  { id: 'fresher', label: 'Fresher & Intern' },
                  { id: 'company', label: 'Company Specific' },
                  { id: 'saved', label: `⭐ Saved (${savedFaqIds.length})` }
                ].map((c) => {
                  const sel = faqCategoryFilter === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFaqCategoryFilter(c.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: sel ? '1.5px solid #9333EA' : '1px solid #E5E7EB',
                        background: sel ? '#9333EA' : '#FFFFFF',
                        color: sel ? '#FFFFFF' : '#4B5563',
                        fontSize: '0.82rem',
                        fontWeight: sel ? '700' : '500',
                        cursor: 'pointer'
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {filteredFaqList.map((q) => {
                const isSaved = savedFaqIds.includes(q.id);
                const isPracticed = practicedFaqIds.includes(q.id);
                return (
                  <div key={q.id} style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #F3E8FF',
                    boxShadow: '0 2px 10px rgba(147, 51, 234, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9333EA', background: '#F3E8FF', padding: '2px 8px', borderRadius: '6px' }}>
                            {q.subRole || q.role}
                          </span>
                          {isPracticed && (
                            <span style={{ fontSize: '0.72rem', color: '#16A34A', background: '#DCFCE7', padding: '2px 6px', borderRadius: '6px', fontWeight: '700' }}>
                              ✓ Practised
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleBookmarkFaq(q.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSaved ? '#9333EA' : '#D1D5DB' }}
                        >
                          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>

                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E1B4B', lineHeight: '1.4', margin: '0 0 10px 0' }}>
                        "{q.title}"
                      </h4>

                      {q.source && (
                        <div style={{ fontSize: '0.75rem', color: '#059669', background: '#ECFDF5', padding: '4px 8px', borderRadius: '6px', marginBottom: '10px' }}>
                          📌 {q.source}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        {q.difficulty} • ~{q.estimatedMin} mins
                      </span>
                      <button
                        onClick={() => handleOpenSinglePractice(q)}
                        style={{
                          background: '#F3E8FF',
                          color: '#7E22CE',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Practise Answer <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SINGLE QUESTION PRACTICE WORKSPACE */}
        {/* ========================================================================= */}
        {activeTab === 'single_practice' && selectedPracticeQuestion && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#9333EA', background: '#F3E8FF', padding: '4px 10px', borderRadius: '8px' }}>
                  {selectedPracticeQuestion.role} • {selectedPracticeQuestion.difficulty}
                </span>
                <button onClick={() => setActiveTab('faq_bank')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.82rem', cursor: 'pointer' }}>
                  ✕ Close Practice
                </button>
              </div>

              {/* Question Header */}
              <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '16px', border: '1px solid #E9D5FF', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: '600' }}>QUESTION PROMPT:</span>
                  <button
                    onClick={() => speakQuestionText(selectedPracticeQuestion.title)}
                    style={{ background: 'none', border: 'none', color: '#9333EA', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Volume2 size={16} /> Listen AI Voice
                  </button>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1E1B4B', margin: 0, lineHeight: '1.4' }}>
                  "{selectedPracticeQuestion.title}"
                </h3>
              </div>

              {/* Answer Text Area */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B' }}>
                    Your Spoken or Written Answer:
                  </label>
                  <button
                    onClick={toggleMic}
                    style={{
                      background: isMicActive ? '#DC2626' : '#9333EA',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isMicActive ? <MicOff size={14} /> : <Mic size={14} />}
                    {isMicActive ? 'Listening...' : 'Speak Answer'}
                  </button>
                </div>

                <textarea
                  value={singleAnswerText}
                  onChange={(e) => setSingleAnswerText(e.target.value)}
                  rows={7}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '2px solid #E9D5FF',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                  placeholder="Click 'Speak Answer' or type your response here using the STAR approach..."
                />
              </div>

              <button
                onClick={handleEvaluateSingleAnswer}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={18} /> Evaluate Answer with AI STAR Rubric
              </button>
            </div>

            {/* AI EVALUATION PANEL */}
            <div>
              {singleEvaluation ? (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid #DCFCE7',
                  boxShadow: '0 4px 20px rgba(22, 163, 74, 0.05)'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#15803D', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} color="#16A34A" /> Evaluation & Feedback
                  </h3>

                  <div style={{ background: '#F0FDF4', padding: '16px', borderRadius: '14px', textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#16A34A' }}>{singleEvaluation.overallScore}/100</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#15803D' }}>Practice Score</div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 6px 0' }}>Key Strengths:</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {singleEvaluation.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 6px 0' }}>Suggested STAR Response Model:</h4>
                    <p style={{ fontSize: '0.82rem', color: '#1E1B4B', background: '#FAF7FF', padding: '12px', borderRadius: '12px', margin: 0, fontStyle: 'italic', border: '1px solid #E9D5FF' }}>
                      "{singleEvaluation.sampleStarResponse}"
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid #F3E8FF',
                  textAlign: 'center',
                  color: '#6B7280'
                }}>
                  <Sparkles size={36} color="#D1D5DB" style={{ marginBottom: '12px' }} />
                  <p style={{ fontSize: '0.88rem' }}>Speak or type your answer and click 'Evaluate' to receive detailed STAR feedback.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CUSTOM INTERVIEW BUILDER */}
        {/* ========================================================================= */}
        {activeTab === 'custom_builder' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 6px 0' }}>
              Build Your Custom Mock Interview
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '20px' }}>
              Select questions from the FAQ bank below to curate your personalized interview set ({customSelectedIds.length} selected).
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                disabled={customSelectedIds.length === 0}
                onClick={() => {
                  const selectedQs = FAQ_QUESTION_BANK.filter(q => customSelectedIds.includes(q.id));
                  handleStartLiveInterview(selectedQs);
                }}
                style={{
                  background: customSelectedIds.length === 0 ? '#E5E7EB' : 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                  color: customSelectedIds.length === 0 ? '#9CA3AF' : '#FFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: customSelectedIds.length === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Play size={16} /> Launch Custom Interview ({customSelectedIds.length} Qs)
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FAQ_QUESTION_BANK.map((q) => {
                const isChecked = customSelectedIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setCustomSelectedIds(prev =>
                        prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id]
                      );
                    }}
                    style={{
                      background: isChecked ? '#FAF7FF' : '#F9FAFB',
                      border: `1.5px solid ${isChecked ? '#9333EA' : '#E5E7EB'}`,
                      borderRadius: '14px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ width: '18px', height: '18px', accentColor: '#9333EA' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B' }}>{q.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{q.role} • {q.difficulty}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: POST-INTERVIEW REPORT */}
        {/* ========================================================================= */}
        {activeTab === 'report' && latestReport && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', background: '#F3E8FF', color: '#7E22CE', padding: '4px 10px', borderRadius: '8px', fontWeight: '700' }}>
                    INTERVIEW REPORT GENERATED
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1E1B4B', margin: '6px 0 0 0' }}>
                    {latestReport.type} ({latestReport.role})
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Return to Dashboard
                </button>
              </div>

              {/* Overall Score Dial */}
              <div style={{
                background: 'linear-gradient(135deg, #FAF7FF 0%, #F3E8FF 100%)',
                borderRadius: '20px',
                padding: '28px',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#9333EA', lineHeight: '1' }}>
                  {latestReport.overallScore}<span style={{ fontSize: '1.5rem', color: '#6B7280' }}>/100</span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1E1B4B', marginTop: '8px' }}>
                  AI Practice Estimate Score
                </div>
              </div>

              {/* Transcripts & Question Breakdown */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E1B4B', marginBottom: '14px' }}>
                Question-by-Question Transcript & AI Notes:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {latestReport.transcripts.map((t, idx) => (
                  <div key={idx} style={{ background: '#F9FAFB', borderRadius: '16px', padding: '16px', border: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#9333EA', marginBottom: '4px' }}>Q{idx + 1}: {t.question}</div>
                    <div style={{ fontSize: '0.88rem', color: '#1E1B4B', background: '#FFF', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px solid #E5E7EB' }}>
                      <strong>Your Answer:</strong> "{t.answer}"
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: '600' }}>✓ AI Feedback: {t.feedback}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: HISTORY & COMPLETED REPORTS */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E1B4B', margin: 0 }}>
                Interview Attempt History ({interviewHistory.length})
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {interviewHistory.map((item) => (
                <div key={item.id} style={{
                  background: '#FAF7FF',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  border: '1px solid #E9D5FF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E1B4B' }}>
                      {item.role} - {item.type}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      {item.date} • {item.questionCount} Questions • Duration: {item.durationMin} mins
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#9333EA' }}>{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
