import React, { useState, useRef, useEffect } from 'react';
import { 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Edit3, 
  Camera, 
  ExternalLink, 
  Github, 
  Sparkles, 
  BookOpen, 
  BarChart2, 
  Plus, 
  Trash2, 
  X, 
  Save, 
  ShieldCheck, 
  Target, 
  FileText, 
  Mic, 
  Zap,
  ArrowRight,
  Mail,
  Phone,
  User,
  AlertCircle,
  KeyRound,
  Check,
  Upload,
  RefreshCw,
  Lock,
  Layers,
  Calendar,
  Building,
  ChevronRight,
  Clock,
  Info,
  Sliders,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { t } from '../utils/i18n';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';

const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (val && typeof val === 'object') {
    return Object.values(val).flatMap(item => Array.isArray(item) ? item : [item]);
  }
  return [];
};

export default function StudentProfileDashboard({ 
  studentProfile, 
  onNavigate, 
  language = 'English',
  onUpdateProfile 
}) {
  // ---------------------------------------------------------------------------
  // 1. Initial State Setup & Sync
  // ---------------------------------------------------------------------------
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('skillaura_student_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, ...studentProfile };
      }
    } catch (e) {}

    return {
      id: studentProfile?.id || "STU-7821",
      name: studentProfile?.name || "Ananya Roy",
      email: studentProfile?.email || "ananya.roy@college.edu.in",
      phone: studentProfile?.phone || studentProfile?.mobile || "+91 98765 43210",
      college: studentProfile?.college || "Institute of Technology & Engineering",
      degree: studentProfile?.degree || "B.Tech",
      branch: studentProfile?.branch || "Computer Science & Engineering",
      year: studentProfile?.year || "3rd Year",
      semester: studentProfile?.semester || "Semester 6",
      gradYear: studentProfile?.gradYear || "2026",
      cgpa: studentProfile?.cgpa || 8.4,
      sgpaHistory: studentProfile?.sgpaHistory || [
        { semester: "Sem 1", sgpa: 8.0 },
        { semester: "Sem 2", sgpa: 8.2 },
        { semester: "Sem 3", sgpa: 8.1 },
        { semester: "Sem 4", sgpa: 8.5 },
        { semester: "Sem 5", sgpa: 8.6 },
        { semester: "Sem 6", sgpa: 8.8 }
      ],
      backlogHistory: studentProfile?.backlogHistory !== undefined ? studentProfile.backlogHistory : 0,
      class10Marks: studentProfile?.class10Marks || "94.2%",
      class12Marks: studentProfile?.class12Marks || "91.8%",
      academicAchievements: studentProfile?.academicAchievements || [
        "Institute Merit Scholar (2024)",
        "Dean's List Semester 5",
        "First Rank in Branch Coding Sprint"
      ],
      avatarUrl: studentProfile?.avatarUrl || DEFAULT_AVATAR,

      // Skills categorized into 6 required groups
      skills: studentProfile?.skills || [
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
      careerGoals: studentProfile?.careerGoals || {
        primaryGoal: "Become a Lead Java Backend Engineer at a Tier-1 Product Company",
        targetRole: studentProfile?.targetRole || "Java Backend Developer",
        preferredIndustries: ["FinTech", "SaaS / Cloud Enterprise", "E-Commerce Systems"],
        preferredLocationMode: "Hybrid / Bangalore, Pune, Remote",
        careerInterests: ["Microservices Architecture", "Distributed Systems", "SQL Query Tuning", "Cloud Computing", "Algorithmic DSA"],
        shortTermObjectives: "Crack campus placement with ₹8+ LPA package, publish 2 backend microservice projects on GitHub"
      },

      // Projects
      projects: studentProfile?.projects || [
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
      experiences: studentProfile?.experiences || [
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
      certifications: studentProfile?.certifications || [
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
      achievements: studentProfile?.achievements || [
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

      // Career Readiness Metrics
      employabilityScore: studentProfile?.employabilityScore || 745,
      readinessMetrics: studentProfile?.readinessMetrics || {
        employabilityScore: 745,
        skillGapStatus: "85% Match (2 Priority Gaps)",
        interviewReadiness: "Ready (82% Mock Score)",
        resumeAnalysisStatus: "ATS Score: 84 / 100",
        growthMapProgress: "Weekly Target: 65%"
      },

      // Growth History & Activity
      scoreHistory: studentProfile?.scoreHistory || [
        { date: "Aug 1", score: 620 },
        { date: "Aug 8", score: 650 },
        { date: "Aug 15", score: 680 },
        { date: "Aug 22", score: 710 },
        { date: "Aug 29", score: 730 },
        { date: "Sep 20", score: 745 }
      ],
      recentActivity: studentProfile?.recentActivity || [
        { id: "act1", title: "Completed AI Mock Interview", category: "Interview", result: "Score: 82% (Strong Technical Communication)", timestamp: "2 days ago" },
        { id: "act2", title: "Added New Project: E-Commerce Microservices Engine", category: "Projects", result: "GitHub Verified", timestamp: "4 days ago" },
        { id: "act3", title: "Analyzed ATS Resume for Java Backend Developer", category: "Resume", result: "ATS Score: 84 / 100", timestamp: "1 week ago" },
        { id: "act4", title: "Achieved NPTEL Core Java Certification", category: "Certifications", result: "Elite + Gold Badge", timestamp: "2 weeks ago" },
        { id: "act5", title: "Updated Target Career Role to Java Backend Developer", category: "Career Goals", result: "Goal Saved", timestamp: "3 weeks ago" }
      ]
    };
  });

  // Sync with incoming parent updates & fetch backend profile on mount
  useEffect(() => {
    if (studentProfile) {
      setProfile(prev => ({
        ...prev,
        ...studentProfile
      }));
    }

    // Try fetching live profile from backend API
    fetch('http://localhost:5000/api/student/profile')
      .then(res => res.ok ? res.json() : null)
      .then(dbData => {
        if (dbData && dbData.name) {
          setProfile(prev => ({
            ...prev,
            ...dbData
          }));
        }
      })
      .catch(() => {});
  }, [studentProfile]);

  // State for active edit modal, selected tab in modal, & messages
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState('personal'); // personal, academic, skills, goals, projects, certs
  const [editForm, setEditForm] = useState({ ...profile });
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const [toastMessage, setToastMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hoveredSgpaPoint, setHoveredSgpaPoint] = useState(null);
  const [hoveredScorePoint, setHoveredScorePoint] = useState(null);

  const fileInputRef = useRef(null);

  // Calculate Profile Completion Percentage & Missing Info
  const calculateProfileCompletion = (pData) => {
    const requiredFields = [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Mobile Number' },
      { key: 'college', label: 'College Name' },
      { key: 'degree', label: 'Degree' },
      { key: 'branch', label: 'Branch' },
      { key: 'year', label: 'Current Year' },
      { key: 'semester', label: 'Current Semester' },
      { key: 'gradYear', label: 'Graduation Year' },
      { key: 'cgpa', label: 'Academic CGPA' }
    ];

    const optionalFields = [
      { key: 'class10Marks', label: 'Class 10th Marks' },
      { key: 'class12Marks', label: 'Class 12th Marks' },
      { key: 'avatarUrl', label: 'Profile Photo' }
    ];

    let filledCount = 0;
    requiredFields.forEach(f => {
      if (pData[f.key]) filledCount++;
    });

    const skillsArr = ensureArray(pData.skills);
    if (skillsArr.length > 0) filledCount += 2;
    if (pData.careerGoals && pData.careerGoals.targetRole) filledCount += 2;
    const projArr = ensureArray(pData.projects);
    if (projArr.length > 0) filledCount += 2;
    const certArr = ensureArray(pData.certifications);
    if (certArr.length > 0) filledCount += 2;

    const maxTotal = requiredFields.length + 8; // 18 total score points
    const percentage = Math.min(100, Math.round((filledCount / maxTotal) * 100));

    const missingOptional = [];
    optionalFields.forEach(f => {
      if (!pData[f.key] || pData[f.key] === DEFAULT_AVATAR) missingOptional.push(f.label);
    });

    return { percentage, missingOptional };
  };

  const { percentage: completionPct, missingOptional } = calculateProfileCompletion(profile);

  // ---------------------------------------------------------------------------
  // Handlers for Photo & Modal Editing
  // ---------------------------------------------------------------------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPhotoPreview(dataUrl);
      setEditForm(prev => ({ ...prev, avatarUrl: dataUrl }));
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(DEFAULT_AVATAR);
    setEditForm(prev => ({ ...prev, avatarUrl: DEFAULT_AVATAR }));
  };

  const handleOpenEditModal = (defaultTabName = 'personal') => {
    setEditForm(JSON.parse(JSON.stringify(profile)));
    setEditTab(defaultTabName);
    setPhotoPreview(null);
    setErrorMessage(null);
    setIsEditModalOpen(true);
  };

  const validateEditForm = () => {
    if (!editForm.name || editForm.name.trim().length < 2) {
      setErrorMessage('Please enter your valid full name.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    const phoneDigits = (editForm.phone || '').replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      setErrorMessage('Please enter a valid phone number with at least 10 digits.');
      return false;
    }
    return true;
  };

  const handleSaveProfileSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateEditForm()) return;

    const updated = {
      ...editForm,
      avatarUrl: photoPreview || editForm.avatarUrl || profile.avatarUrl || DEFAULT_AVATAR
    };

    setProfile(updated);

    try {
      localStorage.setItem('skillaura_student_profile', JSON.stringify(updated));
    } catch (err) {}

    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }

    // Backend Sync
    fetch('http://localhost:5000/api/student/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {});

    setIsEditModalOpen(false);
    setToastMessage(t('profile_updated_success', language) || 'Student profile saved successfully!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Item Helper functions
  const handleAddProject = () => {
    const newProj = {
      id: `p-${Date.now()}`,
      title: "New Project",
      description: "Brief summary of features built.",
      techStack: ["Java", "SQL"],
      status: "In Progress",
      githubUrl: "",
      liveUrl: ""
    };
    setEditForm(prev => ({ ...prev, projects: [...(prev.projects || []), newProj] }));
  };

  const handleDeleteProject = (projId) => {
    setEditForm(prev => ({ ...prev, projects: (prev.projects || []).filter(p => p.id !== projId) }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `e-${Date.now()}`,
      title: "Intern Role",
      company: "Company Name",
      duration: "3 Months",
      description: "Summary of responsibilities.",
      responsibilities: "Key achievements."
    };
    setEditForm(prev => ({ ...prev, experiences: [...(prev.experiences || []), newExp] }));
  };

  const handleDeleteExperience = (expId) => {
    setEditForm(prev => ({ ...prev, experiences: ensureArray(prev.experiences).filter(e => e.id !== expId) }));
  };

  const handleAddCertification = () => {
    const newCert = {
      id: `c-${Date.now()}`,
      title: "Certification Title",
      issuer: "Issuing Org",
      issueDate: "2025-01",
      credentialUrl: ""
    };
    setEditForm(prev => ({ ...prev, certifications: [...ensureArray(prev.certifications), newCert] }));
  };

  const handleDeleteCertification = (certId) => {
    setEditForm(prev => ({ ...prev, certifications: ensureArray(prev.certifications).filter(c => c.id !== certId) }));
  };

  const handleAddAchievement = () => {
    const newAch = {
      id: `a-${Date.now()}`,
      title: "Hackathon / Academic Achievement",
      issuingOrg: "Organization",
      issueDate: "2025-01",
      credentialUrl: "",
      description: "Brief details."
    };
    setEditForm(prev => ({ ...prev, achievements: [...ensureArray(prev.achievements), newAch] }));
  };

  const handleDeleteAchievement = (achId) => {
    setEditForm(prev => ({ ...prev, achievements: ensureArray(prev.achievements).filter(a => a.id !== achId) }));
  };

  // Group skills into 6 categories
  const skillCategories = [
    "Programming Languages",
    "Web Development",
    "Databases",
    "AI & Data Science",
    "Cloud & Tools",
    "Soft Skills"
  ];

  const getSkillsByCategory = (catName) => {
    return ensureArray(profile.skills).filter(s => (s && (s.category || s.domain || '')).toLowerCase() === catName.toLowerCase());
  };

  // Top 5 Assessed Skills for Horizontal Bar Chart
  const topAssessedSkills = ensureArray(profile.skills).slice(0, 5);

  // Projects Summary
  const projectsList = ensureArray(profile.projects);
  const totalProjects = projectsList.length;
  const completedProjects = projectsList.filter(p => p.status === 'Completed').length;
  const totalExperiences = ensureArray(profile.experiences).length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div style={{
          background: 'linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%)',
          color: '#15803D',
          border: '1.5px solid #86EFAC',
          borderRadius: '16px',
          padding: '14px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '700',
          fontSize: '0.92rem',
          boxShadow: '0 4px 14px rgba(21, 128, 61, 0.1)'
        }} className="fade-in">
          <CheckCircle2 size={20} color="#15803D" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          SECTION 1: PROFILE HEADER & COMPLETION INDICATOR
         ==================================================================== */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '24px',
        border: '1.5px solid #EAE2F8',
        boxShadow: '0 8px 32px rgba(147, 51, 234, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Photo & Identity info */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={profile.avatarUrl || DEFAULT_AVATAR} 
                alt={profile.name}
                style={{
                  width: '115px',
                  height: '115px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3.5px solid #9333EA',
                  boxShadow: '0 6px 20px rgba(147, 51, 234, 0.25)'
                }}
              />
              <button
                onClick={() => handleOpenEditModal('personal')}
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                  color: '#FFFFFF',
                  border: '2px solid #FFFFFF',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(147, 51, 234, 0.4)'
                }}
                title={t('change_photo', language) || 'Upload / Change Photo'}
              >
                <Camera size={18} />
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1E1B4B', margin: 0, letterSpacing: '-0.5px' }}>
                  {profile.name}
                </h1>
                <span style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700', border: '1px solid #86EFAC' }}>
                  ✓ Verified Student Profile
                </span>
              </div>

              <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: '6px 0 4px 0', fontWeight: '600' }}>
                {profile.degree} in {profile.branch} ({profile.year}, {profile.semester}) • Graduating {profile.gradYear}
              </p>
              <p style={{ color: '#9333EA', fontSize: '0.9rem', fontWeight: 700, margin: '2px 0 12px 0' }}>
                🏛️ {profile.college}
              </p>
              
              {/* Contact Information Badges */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.88rem' }}>
                <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '12px', border: '1.5px solid #E9D5FF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} color="#9333EA" />
                  <span style={{ fontWeight: '600', color: '#1E1B4B' }}>{profile.email}</span>
                </div>
                <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '12px', border: '1.5px solid #E9D5FF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} color="#9333EA" />
                  <span style={{ fontWeight: '600', color: '#1E1B4B' }}>{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile CTA */}
          <button 
            onClick={() => handleOpenEditModal('personal')}
            style={{
              background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '14px 26px',
              fontWeight: '700',
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(147, 51, 234, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <Edit3 size={20} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Completion Indicator Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid #EAE2F8',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', fontWeight: 700 }}>
            <span style={{ color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#9333EA" />
              <span>Profile Completion Progress</span>
            </span>
            <span style={{ color: '#9333EA' }}>{completionPct}% Complete</span>
          </div>

          <div style={{ height: '10px', background: '#F0EAFA', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${completionPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #9333EA 0%, #C084FC 100%)',
              transition: 'width 0.5s ease'
            }} />
          </div>

          {missingOptional.length > 0 && (
            <div style={{ fontSize: '0.8rem', color: '#7A6F8A', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={14} color="#9333EA" />
              <span>Optional information missing: {missingOptional.join(', ')} (Optional details can be filled anytime)</span>
            </div>
          )}
        </div>

      </div>

      {/* ====================================================================
          SECTION 2: ACADEMIC INFORMATION & SGPA TREND GRAPH
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Academic Information</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Verified academic credentials, SGPA history & marks.</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenEditModal('academic')}
            style={{ background: '#FAF7FF', color: '#9333EA', border: '1px solid #EAE2F8', padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Edit3 size={14} />
            <span>Update Academic Info</span>
          </button>
        </div>

        {/* Academic Overview Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>OVERALL CGPA</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#9333EA', margin: '4px 0' }}>{profile.cgpa} <span style={{ fontSize: '1rem', color: '#7A6F8A' }}>/ 10.0</span></div>
            <div style={{ fontSize: '0.8rem', color: '#15803D', fontWeight: 700 }}>✓ Verified Record</div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>BACKLOG HISTORY</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: profile.backlogHistory === 0 ? '#10B981' : '#DC2626', margin: '4px 0' }}>
              {profile.backlogHistory}
            </div>
            <div style={{ fontSize: '0.8rem', color: profile.backlogHistory === 0 ? '#15803D' : '#DC2626', fontWeight: 700 }}>
              {profile.backlogHistory === 0 ? '✓ Clean Academic History' : '⚠️ Active Backlog(s)'}
            </div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>CLASS 10TH & 12TH</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginTop: '6px' }}>10th: <span style={{ color: '#9333EA' }}>{profile.class10Marks || 'N/A'}</span></div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginTop: '4px' }}>12th: <span style={{ color: '#9333EA' }}>{profile.class12Marks || 'N/A'}</span></div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>ACADEMIC HONORS</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2D1B4E', marginTop: '6px' }}>
              {(profile.academicAchievements || []).length} Honors / Awards Recorded
            </div>
          </div>
        </div>

        {/* Academic Performance Graph (Semester-wise SGPA Line Chart) */}
        <div style={{ background: '#FAF7FF', padding: '24px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>
              Academic Performance Trend (SGPA per Semester)
            </h4>
            <span style={{ fontSize: '0.82rem', background: '#F0EAFA', color: '#9333EA', padding: '4px 10px', borderRadius: '10px', fontWeight: 700 }}>
              Latest: Sem {profile.sgpaHistory?.length || 6} ({profile.sgpaHistory?.[profile.sgpaHistory.length - 1]?.sgpa || 8.8} SGPA)
            </span>
          </div>

          {/* Interactive SVG Line Graph */}
          <div style={{ position: 'relative', width: '100%', height: '220px', marginTop: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 180" style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="60" x2="580" y2="60" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="100" x2="580" y2="100" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="140" x2="580" y2="140" stroke="#EAE2F8" strokeDasharray="4" />
              
              {/* Y Axis Labels */}
              <text x="10" y="24" fill="#7A6F8A" fontSize="10" fontWeight="bold">10.0</text>
              <text x="15" y="64" fill="#7A6F8A" fontSize="10" fontWeight="bold">8.0</text>
              <text x="15" y="104" fill="#7A6F8A" fontSize="10" fontWeight="bold">6.0</text>
              <text x="15" y="144" fill="#7A6F8A" fontSize="10" fontWeight="bold">4.0</text>

              {/* Data points math */}
              {(() => {
                const history = profile.sgpaHistory || [
                  { semester: "Sem 1", sgpa: 8.0 },
                  { semester: "Sem 2", sgpa: 8.2 },
                  { semester: "Sem 3", sgpa: 8.1 },
                  { semester: "Sem 4", sgpa: 8.5 },
                  { semester: "Sem 5", sgpa: 8.6 },
                  { semester: "Sem 6", sgpa: 8.8 }
                ];
                const count = history.length;
                const startX = 60;
                const endX = 560;
                const stepX = (endX - startX) / Math.max(1, count - 1);
                
                // Map SGPA (0..10) to Y (160..20)
                const getY = (val) => 160 - ((val / 10) * 140);

                const points = history.map((item, idx) => ({
                  x: startX + idx * stepX,
                  y: getY(item.sgpa),
                  item,
                  isLatest: idx === count - 1
                }));

                const pathString = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                const areaString = `${pathString} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`;

                return (
                  <g>
                    {/* Gradient Area under line */}
                    <defs>
                      <linearGradient id="sgpaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9333EA" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#9333EA" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={areaString} fill="url(#sgpaGrad)" />
                    
                    {/* Line */}
                    <path d={pathString} fill="none" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />

                    {/* Interactive Circles & Labels */}
                    {points.map((p, idx) => (
                      <g key={idx} onMouseEnter={() => setHoveredSgpaPoint(p)} onMouseLeave={() => setHoveredSgpaPoint(null)} style={{ cursor: 'pointer' }}>
                        <circle 
                          cx={p.x} 
                          cy={p.y} 
                          r={p.isLatest ? "7" : "5"} 
                          fill={p.isLatest ? "#9333EA" : "#FFFFFF"} 
                          stroke="#9333EA" 
                          strokeWidth={p.isLatest ? "3" : "2.5"} 
                        />
                        <text x={p.x} y="168" textAnchor="middle" fill="#2D1B4E" fontSize="11" fontWeight="bold">
                          {p.item.semester}
                        </text>
                        <text x={p.x} y={p.y - 10} textAnchor="middle" fill={p.isLatest ? "#9333EA" : "#2D1B4E"} fontSize="11" fontWeight="bold">
                          {p.item.sgpa}
                        </text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 3: SKILLS OVERVIEW & PROFICIENCY VISUALIZATION
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Skills Overview</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Self-reported vs assessed technical & soft skill proficiency levels.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => onNavigate('skill-gap')}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <span>View All Skills (Gap Analysis)</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* 6 Category Skill Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          {skillCategories.map((cat, idx) => {
            const catSkills = getSkillsByCategory(cat);
            return (
              <div key={idx} style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{cat}</span>
                  <span style={{ fontSize: '0.75rem', color: '#9333EA', fontWeight: 700 }}>{catSkills.length} Recorded</span>
                </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {catSkills.length === 0 ? (
                    <span style={{ fontSize: '0.8rem', color: '#7A6F8A', italic: 'true' }}>No skills entered in this category yet.</span>
                  ) : (
                    catSkills.map((sk, sIdx) => (
                      <span 
                        key={sIdx}
                        style={{
                          background: sk.isAssessed ? '#F0EAFA' : '#FFFFFF',
                          color: sk.isAssessed ? '#9333EA' : '#4B5563',
                          border: `1px solid ${sk.isAssessed ? '#C084FC' : '#CBD5E1'}`,
                          padding: '5px 12px',
                          borderRadius: '12px',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {sk.isAssessed ? '✓ ' : '• '}{sk.name} ({sk.proficiency}%)
                        {sk.isAssessed && <span style={{ fontSize: '0.68rem', background: '#9333EA', color: '#FFF', padding: '1px 5px', borderRadius: '6px' }}>Assessed</span>}
                      </span>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Bar Chart Visualization for Top 5 Skills */}
        <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
            Top Assessed Skill Proficiency vs Target
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topAssessedSkills.map((sk, i) => {
              const current = sk.proficiency || 75;
              const target = sk.targetProficiency || 90;
              const diff = Math.max(0, target - current);

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700 }}>
                    <span style={{ color: '#2D1B4E' }}>{sk.name} ({sk.category})</span>
                    <span style={{ color: '#9333EA' }}>
                      Current: {current}% | Target: {target}% {diff > 0 ? `(Gap: -${diff}%)` : '✓ On Target'}
                    </span>
                  </div>

                  <div style={{ height: '12px', background: '#EAE2F8', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    {/* Current Bar */}
                    <div style={{ width: `${current}%`, height: '100%', background: 'linear-gradient(90deg, #9333EA 0%, #C084FC 100%)', borderRadius: '6px' }} />
                    {/* Target Indicator Line */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${target}%`, width: '3px', background: '#10B981', zIndex: 2 }} title={`Target: ${target}%`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 4: CAREER GOALS & INTEREST VISUALIZATION
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Target size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Career Goals & Preferences</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Primary aspirations, target role & domain preferences.</p>
            </div>
          </div>

          <button 
            onClick={() => handleOpenEditModal('goals')}
            style={{ background: '#FAF7FF', color: '#9333EA', border: '1px solid #EAE2F8', padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Edit3 size={14} />
            <span>Edit Career Goals</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '20px' }}>
          <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>TARGET JOB ROLE</h4>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#9333EA', margin: '6px 0 8px 0' }}>
              {profile.careerGoals?.targetRole || profile.targetRole}
            </div>
            <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: 0 }}>
              <strong>Primary Goal:</strong> {profile.careerGoals?.primaryGoal || 'High Growth Software Role'}
            </p>
          </div>

          <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>WORK LOCATION & MODE</h4>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', margin: '6px 0' }}>
              {profile.careerGoals?.preferredLocationMode || 'Hybrid / Remote'}
            </div>
            <div style={{ fontSize: '0.88rem', color: '#4B5563' }}>
              <strong>Target Package:</strong> ₹6.5 LPA - ₹12 LPA
            </div>
          </div>
        </div>

        {/* Short Term Objectives & Preferred Industries */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '20px' }}>
          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>Preferred Industries</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(profile.careerGoals?.preferredIndustries || ["FinTech", "SaaS"]).map((ind, idx) => (
                <span key={idx} style={{ background: '#F0EAFA', color: '#9333EA', padding: '4px 10px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700 }}>
                  🏢 {ind}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>Short-Term Objectives</h4>
            <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: 0 }}>
              {profile.careerGoals?.shortTermObjectives || 'Complete key project milestones and secure campus placement.'}
            </p>
          </div>
        </div>

        {/* Career Interest Visual Segmented Tags */}
        <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px' }}>Selected Career Interests</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(profile.careerGoals?.careerInterests || ["Microservices", "System Design"]).map((int, idx) => (
              <span key={idx} style={{ background: '#9333EA', color: '#FFFFFF', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700 }}>
                # {int}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 5: PROJECTS & EXPERIENCE
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Layers size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Projects & Experience</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Verified technical projects, GitHub repositories & internships.</p>
            </div>
          </div>

          <button 
            onClick={() => handleOpenEditModal('projects')}
            style={{ background: '#FAF7FF', color: '#9333EA', border: '1px solid #EAE2F8', padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={14} />
            <span>Add / Manage Projects & Internships</span>
          </button>
        </div>

        {/* Compact Summary Counter Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div style={{ background: '#FAF7FF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700 }}>TOTAL PROJECTS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#9333EA' }}>{totalProjects}</div>
          </div>
          <div style={{ background: '#FAF7FF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700 }}>COMPLETED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981' }}>{completedProjects}</div>
          </div>
          <div style={{ background: '#FAF7FF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700 }}>INTERNSHIPS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB' }}>{totalExperiences}</div>
          </div>
        </div>

        {/* Projects Cards List */}
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px' }}>Projects</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {ensureArray(profile.projects).map((proj, idx) => (
            <div key={idx} style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    background: proj.status === 'Completed' ? '#DCFCE7' : '#FEF3C7',
                    color: proj.status === 'Completed' ? '#15803D' : '#D97706',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {proj.status}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#2D1B4E' }} title="GitHub Repo">
                        <Github size={16} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#9333EA' }} title="Live Demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', margin: '0 0 6px 0' }}>
                  {proj.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                  {proj.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {ensureArray(proj.techStack).map((tech, tIdx) => (
                  <span key={tIdx} style={{ background: '#F0EAFA', color: '#9333EA', padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience & Internship Section */}
        {ensureArray(profile.experiences).length > 0 && (
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px' }}>Work & Internship Experience</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ensureArray(profile.experiences).map((exp, idx) => (
                <div key={idx} style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>
                      {exp.title} <span style={{ color: '#9333EA' }}>@ {exp.company}</span>
                    </h5>
                    <span style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>📅 {exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: '6px 0 4px 0' }}>{exp.description}</p>
                  {exp.responsibilities && (
                    <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>Key Result: {exp.responsibilities}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ====================================================================
          SECTION 6: CERTIFICATIONS & ACHIEVEMENTS
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Award size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Certifications & Achievements</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>SWAYAM / NPTEL certificates, hackathon wins & academic honors.</p>
            </div>
          </div>

          <button 
            onClick={() => handleOpenEditModal('certs')}
            style={{ background: '#FAF7FF', color: '#9333EA', border: '1px solid #EAE2F8', padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={14} />
            <span>Add / Edit Certifications</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          {/* Certifications Card */}
          <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#9333EA" />
              <span>Certifications</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(profile.certifications || []).map((c, i) => (
                <div key={i} style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>{c.title}</h5>
                    <p style={{ fontSize: '0.8rem', color: '#7A6F8A', margin: '2px 0 0 0' }}>{c.issuer} • {c.issueDate}</p>
                  </div>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      <span>Verify</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Achievements Card */}
          <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#D97706" />
              <span>Hackathons & Achievements</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(profile.achievements || []).map((a, i) => (
                <div key={i} style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #EAE2F8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>{a.title}</h5>
                    <span style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700 }}>{a.issueDate}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#9333EA', fontWeight: 700, margin: '2px 0 4px 0' }}>{a.issuingOrg}</p>
                  <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: 0, lineHeight: '1.3' }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 7: CAREER READINESS OVERVIEW (LINKING TO SKILLAURA MODULES)
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
            <BarChart2 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Career Readiness Overview</h3>
            <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Current readiness scores linked directly to connected SkillAura modules.</p>
          </div>
        </div>

        {/* 5 Summary Cards linking to modules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {/* Card 1: Employability Score */}
          <div 
            onClick={() => onNavigate('employability-score')}
            style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)', color: '#FFFFFF', padding: '20px', borderRadius: '18px', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '0.75rem', color: '#C084FC', fontWeight: 700, textTransform: 'uppercase' }}>EMPLOYABILITY SCORE</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F6DCEC', margin: '4px 0' }}>
              {profile.employabilityScore || 745} <span style={{ fontSize: '0.9rem', color: '#FFF' }}>/ 900</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#DCFCE7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Open Calculator</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 2: Skill Gap Status */}
          <div 
            onClick={() => onNavigate('skill-gap')}
            style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>SKILL GAP STATUS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9333EA', margin: '8px 0' }}>
              {profile.readinessMetrics?.skillGapStatus || "85% Role Match"}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View Gap Analysis</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 3: Interview Readiness */}
          <div 
            onClick={() => onNavigate('mock-interviews')}
            style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>INTERVIEW READINESS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', margin: '8px 0' }}>
              {profile.readinessMetrics?.interviewReadiness || "Not Assessed"}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Start AI Interview</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 4: Resume Analysis Status */}
          <div 
            onClick={() => onNavigate('resume-assist')}
            style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>RESUME ATS STATUS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9333EA', margin: '8px 0' }}>
              {profile.readinessMetrics?.resumeAnalysisStatus || "ATS Score: 84/100"}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Check ATS Resume</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Card 5: Growth Map Progress */}
          <div 
            onClick={() => onNavigate('growth-map')}
            style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>GROWTH MAP PROGRESS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D97706', margin: '8px 0' }}>
              {profile.readinessMetrics?.growthMapProgress || "65% Completed"}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Open Growth Map</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 8: STUDENT GROWTH VISUALIZATION ("MY GROWTH OVERVIEW")
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>My Growth Overview</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Historical progress trajectory of Employability Score over time.</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('growth-map')}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <span>View Growth Map & Weekly Report</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Employability Score Line Chart over time */}
        <div style={{ background: '#FAF7FF', padding: '24px', borderRadius: '18px', border: '1px solid #EAE2F8', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
            Employability Score Snapshot History
          </div>

          <div style={{ position: 'relative', width: '100%', height: '200px' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 160" style={{ overflow: 'visible' }}>
              <line x1="40" y1="20" x2="580" y2="20" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="60" x2="580" y2="60" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="100" x2="580" y2="100" stroke="#EAE2F8" strokeDasharray="4" />
              <line x1="40" y1="140" x2="580" y2="140" stroke="#EAE2F8" strokeDasharray="4" />

              <text x="10" y="24" fill="#7A6F8A" fontSize="10" fontWeight="bold">900</text>
              <text x="10" y="64" fill="#7A6F8A" fontSize="10" fontWeight="bold">750</text>
              <text x="10" y="104" fill="#7A6F8A" fontSize="10" fontWeight="bold">600</text>

              {(() => {
                const history = profile.scoreHistory || [
                  { date: "Aug 1", score: 620 },
                  { date: "Aug 8", score: 650 },
                  { date: "Aug 15", score: 680 },
                  { date: "Aug 22", score: 710 },
                  { date: "Aug 29", score: 730 },
                  { date: "Sep 20", score: 745 }
                ];
                const count = history.length;
                const startX = 60;
                const endX = 560;
                const stepX = (endX - startX) / Math.max(1, count - 1);

                // Map Score (300..900) to Y (140..20)
                const getY = (val) => 140 - (((val - 300) / 600) * 120);

                const pts = history.map((h, i) => ({
                  x: startX + i * stepX,
                  y: getY(h.score),
                  h,
                  isLast: i === count - 1
                }));

                const pathStr = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                const areaStr = `${pathStr} L ${pts[pts.length - 1].x} 140 L ${pts[0].x} 140 Z`;

                return (
                  <g>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={areaStr} fill="url(#scoreGrad)" />
                    <path d={pathStr} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />

                    {pts.map((p, idx) => (
                      <g key={idx} onMouseEnter={() => setHoveredScorePoint(p)} onMouseLeave={() => setHoveredScorePoint(null)} style={{ cursor: 'pointer' }}>
                        <circle cx={p.x} cy={p.y} r={p.isLast ? "7" : "5"} fill={p.isLast ? "#10B981" : "#FFFFFF"} stroke="#10B981" strokeWidth="2.5" />
                        <text x={p.x} y="154" textAnchor="middle" fill="#2D1B4E" fontSize="10" fontWeight="bold">{p.h.date}</text>
                        <text x={p.x} y={p.y - 10} textAnchor="middle" fill={p.isLast ? "#10B981" : "#2D1B4E"} fontSize="11" fontWeight="bold">{p.h.score}</text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Growth Milestone Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>SKILLS IMPROVED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#9333EA', margin: '4px 0' }}>+4 Skills</div>
            <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700 }}>Verified via Assessments</div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>PROJECTS COMPLETED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', margin: '4px 0' }}>{completedProjects} Projects</div>
            <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700 }}>GitHub Verified</div>
          </div>

          <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '14px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>ASSESSMENT MILESTONES</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', margin: '4px 0' }}>5 Achieved</div>
            <div style={{ fontSize: '0.75rem', color: '#7A6F8A' }}>Growth Map Milestones</div>
          </div>
        </div>

      </div>

      {/* ====================================================================
          SECTION 9: RECENT ACTIVITY HISTORY
         ==================================================================== */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
            <Clock size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Recent Activity</h3>
            <p style={{ color: '#7A6F8A', fontSize: '0.85rem', margin: 0 }}>Chronological history of completed assessments, projects & milestones.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(profile.recentActivity || []).length === 0 ? (
            <div style={{ fontSize: '0.88rem', color: '#7A6F8A', padding: '16px', textAlign: 'center' }}>
              No recent activity records available yet.
            </div>
          ) : (
            (profile.recentActivity || []).slice(0, 5).map((act, idx) => (
              <div key={idx} style={{ background: '#FAF7FF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9333EA' }} />
                  <div>
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>{act.title}</h5>
                    <p style={{ fontSize: '0.8rem', color: '#7A6F8A', margin: '2px 0 0 0' }}>
                      <span style={{ color: '#9333EA', fontWeight: 700 }}>{act.category}</span> • {act.result}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 600 }}>{act.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ====================================================================
          SECTION 10: EDIT PROFILE MULTI-TAB MODAL
         ==================================================================== */}
      {isEditModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            border: '1px solid #E2E8F0'
          }} className="fade-in">
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                  <Edit3 size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
                  Edit Student Profile Details
                </h3>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Section Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid #EAE2F8', marginBottom: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
              {[
                { id: 'personal', label: '👤 Personal Info' },
                { id: 'academic', label: '🎓 Academic Info' },
                { id: 'skills', label: '⚡ Skills' },
                { id: 'goals', label: '🎯 Career Goals' },
                { id: 'projects', label: '🚀 Projects & Exp' },
                { id: 'certs', label: '🏆 Certifications' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setEditTab(tab.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: editTab === tab.id ? '#9333EA' : 'transparent',
                    color: editTab === tab.id ? '#FFFFFF' : '#4B5563',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '12px 16px', borderRadius: '14px', fontSize: '0.88rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                <AlertCircle size={18} color="#DC2626" /> 
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* TAB 1: PERSONAL INFO */}
              {editTab === 'personal' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Photo Upload */}
                  <div style={{ background: '#FAF7FF', border: '1.5px solid #E9D5FF', borderRadius: '18px', padding: '16px', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                    <img
                      src={photoPreview || editForm.avatarUrl || DEFAULT_AVATAR}
                      alt="Preview"
                      style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #9333EA' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '6px' }}>Profile Photo</div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          style={{ background: '#9333EA', color: '#FFF', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Upload size={14} />
                          <span>Upload New Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Full Name:</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Email Address:</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Mobile Phone Number:</label>
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ACADEMIC INFO */}
              {editTab === 'academic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>College / University Name:</label>
                    <input
                      type="text"
                      value={editForm.college}
                      onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Degree:</label>
                      <input
                        type="text"
                        value={editForm.degree}
                        onChange={(e) => setEditForm({ ...editForm, degree: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Branch / Specialization:</label>
                      <input
                        type="text"
                        value={editForm.branch}
                        onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Current Year:</label>
                      <input
                        type="text"
                        value={editForm.year}
                        onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Semester:</label>
                      <input
                        type="text"
                        value={editForm.semester}
                        onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Graduation Year:</label>
                      <input
                        type="text"
                        value={editForm.gradYear}
                        onChange={(e) => setEditForm({ ...editForm, gradYear: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Current CGPA:</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={editForm.cgpa}
                        onChange={(e) => setEditForm({ ...editForm, cgpa: parseFloat(e.target.value) || 0 })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Backlogs Count:</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.backlogHistory}
                        onChange={(e) => setEditForm({ ...editForm, backlogHistory: parseInt(e.target.value) || 0 })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>12th Marks (%):</label>
                      <input
                        type="text"
                        value={editForm.class12Marks || ''}
                        onChange={(e) => setEditForm({ ...editForm, class12Marks: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {editTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#7A6F8A', margin: 0 }}>
                    Manage technical & soft skills. Self-reported vs assessed skills are automatically distinguished based on evaluation records.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto', paddingRight: '6px' }}>
                    {(editForm.skills || []).map((sk, idx) => (
                      <div key={idx} style={{ background: '#FAF7FF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EAE2F8', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                        <input
                          type="text"
                          value={sk.name}
                          onChange={(e) => {
                            const updatedSkills = [...(editForm.skills || [])];
                            updatedSkills[idx].name = e.target.value;
                            setEditForm({ ...editForm, skills: updatedSkills });
                          }}
                          style={{ flexGrow: 1, padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                        <select
                          value={sk.category}
                          onChange={(e) => {
                            const updatedSkills = [...(editForm.skills || [])];
                            updatedSkills[idx].category = e.target.value;
                            setEditForm({ ...editForm, skills: updatedSkills });
                          }}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                        >
                          {skillCategories.map((cat, cI) => <option key={cI} value={cat}>{cat}</option>)}
                        </select>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={sk.proficiency}
                          onChange={(e) => {
                            const updatedSkills = [...(editForm.skills || [])];
                            updatedSkills[idx].proficiency = parseInt(e.target.value) || 0;
                            setEditForm({ ...editForm, skills: updatedSkills });
                          }}
                          style={{ width: '60px', padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSkills = (editForm.skills || []).filter((_, i) => i !== idx);
                            setEditForm({ ...editForm, skills: updatedSkills });
                          }}
                          style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newSkill = { name: "New Skill", category: "Programming Languages", proficiency: 70, targetProficiency: 85, isAssessed: false };
                      setEditForm({ ...editForm, skills: [...(editForm.skills || []), newSkill] });
                    }}
                    style={{ background: '#FAF7FF', color: '#9333EA', border: '1px stroke #EAE2F8', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={14} />
                    <span>Add New Skill</span>
                  </button>
                </div>
              )}

              {/* TAB 4: CAREER GOALS */}
              {editTab === 'goals' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Target Job Role:</label>
                    <input
                      type="text"
                      value={editForm.targetRole}
                      onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value, careerGoals: { ...(editForm.careerGoals || {}), targetRole: e.target.value } })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Primary Career Goal:</label>
                    <input
                      type="text"
                      value={editForm.careerGoals?.primaryGoal || ''}
                      onChange={(e) => setEditForm({ ...editForm, careerGoals: { ...(editForm.careerGoals || {}), primaryGoal: e.target.value } })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Preferred Location / Work Mode:</label>
                    <input
                      type="text"
                      value={editForm.careerGoals?.preferredLocationMode || ''}
                      onChange={(e) => setEditForm({ ...editForm, careerGoals: { ...(editForm.careerGoals || {}), preferredLocationMode: e.target.value } })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E1B4B', display: 'block', marginBottom: '6px' }}>Short-Term Objectives:</label>
                    <textarea
                      rows={2}
                      value={editForm.careerGoals?.shortTermObjectives || ''}
                      onChange={(e) => setEditForm({ ...editForm, careerGoals: { ...(editForm.careerGoals || {}), shortTermObjectives: e.target.value } })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.92rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: PROJECTS & EXPERIENCE */}
              {editTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Projects</h5>
                    <button type="button" onClick={handleAddProject} style={{ background: '#F0EAFA', color: '#9333EA', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>+ Add Project</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                    {(editForm.projects || []).map((proj, idx) => (
                      <div key={idx} style={{ background: '#FAF7FF', padding: '12px', borderRadius: '10px', border: '1px solid #EAE2F8' }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...(editForm.projects || [])];
                              updated[idx].title = e.target.value;
                              setEditForm({ ...editForm, projects: updated });
                            }}
                            style={{ flexGrow: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                          />
                          <button type="button" onClick={() => handleDeleteProject(proj.id)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                        <input
                          type="text"
                          placeholder="Short description"
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...(editForm.projects || [])];
                            updated[idx].description = e.target.value;
                            setEditForm({ ...editForm, projects: updated });
                          }}
                          style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Internships</h5>
                    <button type="button" onClick={handleAddExperience} style={{ background: '#F0EAFA', color: '#9333EA', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>+ Add Internship</button>
                  </div>
                </div>
              )}

              {/* TAB 6: CERTIFICATIONS */}
              {editTab === 'certs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Certifications</h5>
                    <button type="button" onClick={handleAddCertification} style={{ background: '#F0EAFA', color: '#9333EA', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>+ Add Cert</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                    {(editForm.certifications || []).map((c, idx) => (
                      <div key={idx} style={{ background: '#FAF7FF', padding: '10px', borderRadius: '10px', border: '1px solid #EAE2F8', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={c.title}
                          onChange={(e) => {
                            const updated = [...(editForm.certifications || [])];
                            updated[idx].title = e.target.value;
                            setEditForm({ ...editForm, certifications: updated });
                          }}
                          style={{ flexGrow: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                        <button type="button" onClick={() => handleDeleteCertification(c.id)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Achievements & Hackathons</h5>
                    <button type="button" onClick={handleAddAchievement} style={{ background: '#F0EAFA', color: '#9333EA', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>+ Add Achievement</button>
                  </div>
                </div>
              )}

              {/* Action Buttons: Save Changes & Cancel */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ padding: '11px 20px', borderRadius: '12px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#4B5563', fontWeight: '700', cursor: 'pointer', fontSize: '0.92rem' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '11px 24px',
                    fontWeight: '700',
                    fontSize: '0.94rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)'
                  }}
                >
                  <Save size={18} />
                  <span>Save Profile Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
