import React, { useState } from 'react';
import { 
  UserCheck, 
  Compass, 
  Target, 
  Sparkles, 
  TrendingUp, 
  BarChart2, 
  Briefcase, 
  Building2, 
  Award, 
  Bell, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  MessageSquare, 
  Mic, 
  HelpCircle, 
  Star, 
  Globe, 
  CheckCircle2, 
  Search,
  ExternalLink,
  Send,
  AlertTriangle,
  Zap,
  ArrowRight,
  Download
} from 'lucide-react';
import SkillGap from './SkillGap';
import ResumeTools from './ResumeTools';
import MockInterview from './MockInterview';
import GovtSchemes from './GovtSchemes';
import LearningHub from './LearningHub';
import TpoDashboard from './TpoDashboard';
import ConnectedJobsNetwork from './ConnectedJobsNetwork';
import GrowthMap from './GrowthMap';
import MentorGuidancePage from './MentorGuidancePage';
import ElevatorPitchPage from './ElevatorPitchPage';
import LanguageTranslatorPage from './LanguageTranslatorPage';
import RedFlagDetectorPage from './RedFlagDetectorPage';
import EmployabilityScorePage from './EmployabilityScorePage';
import PeerBenchmarkingPage from './PeerBenchmarkingPage';
import SkillDemandRadarPage from './SkillDemandRadarPage';
import StudentProfileDashboard from './StudentProfileDashboard';
import CareerRoadmapPage from './CareerRoadmapPage';
import JobsOpportunitiesPage from './JobsOpportunitiesPage';
import JobAlertsPage from './JobAlertsPage';
import ProjectLabPage from './ProjectLabPage';
import GlobalSearchResultsPage from './GlobalSearchResultsPage';
import SupportFeedbackPage from './SupportFeedbackPage';
import WhyUsPage from './WhyUsPage';
import MindGamesPage from './MindGamesPage';
import BackButton from './BackButton';

export default function SubFeatureViewer({ 
  subFeatureId, 
  studentProfile, 
  onNavigate,
  onGoBack,
  canGoBack,
  onOpenTranslator,
  onUpdateProfile,
  language = 'English'
}) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [redFlagUrl, setRedFlagUrl] = useState('');
  const [redFlagResult, setRedFlagResult] = useState(null);
  const [companyJD, setCompanyJD] = useState('');
  const [analyzedJDResult, setAnalyzedJDResult] = useState(null);

  const wrapWithBack = (element) => (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 20px 0 20px' }}>
      {onGoBack && (
        <BackButton onGoBack={onGoBack} label="Back to Previous Page" />
      )}
      {element}
    </div>
  );

  // If subFeatureId corresponds to one of the major dedicated components:
  if (subFeatureId === 'mind-games' || subFeatureId === 'puzzles' || subFeatureId === 'mind-games-puzzles') {
    return wrapWithBack(<MindGamesPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} language={language} />);
  }
  if (subFeatureId === 'project-lab' || subFeatureId === 'project-ideas') {
    return wrapWithBack(<ProjectLabPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'job-alerts') {
    return wrapWithBack(<JobAlertsPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'internships-jobs' || subFeatureId === 'jobs-opportunities' || subFeatureId === 'jobs' || subFeatureId === 'opportunities') {
    return wrapWithBack(<JobsOpportunitiesPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'academic-guidance' || subFeatureId === 'career-explorer') {
    return wrapWithBack(<CareerRoadmapPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'profile-analysis') {
    return wrapWithBack(
      <StudentProfileDashboard 
        studentProfile={studentProfile} 
        onNavigate={onNavigate} 
        onGoBack={onGoBack}
        onUpdateProfile={onUpdateProfile} 
        language={language} 
      />
    );
  }
  if (subFeatureId === 'skill-demand') {
    return wrapWithBack(<SkillDemandRadarPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'peer-benchmarking') {
    return wrapWithBack(<PeerBenchmarkingPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'employability-score') {
    return wrapWithBack(<EmployabilityScorePage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'red-flag-detector') {
    return wrapWithBack(<RedFlagDetectorPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'mentor-guidance') {
    return wrapWithBack(<MentorGuidancePage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'growth-map') {
    return wrapWithBack(<GrowthMap studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'connected-jobs-network') {
    return wrapWithBack(<ConnectedJobsNetwork studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'skill-gap') {
    return wrapWithBack(<SkillGap studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'resume-assist' || subFeatureId === 'resume-analyzer' || subFeatureId === 'resume-improvement' || subFeatureId === 'rejected-resume' || subFeatureId === 'company-resume' || subFeatureId === 'jd-analyzer' || subFeatureId === 'resume-reference') {
    return wrapWithBack(<ResumeTools studentProfile={studentProfile} defaultTab={subFeatureId} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'mock-interviews') {
    return wrapWithBack(<MockInterview studentProfile={studentProfile} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'communication-skills' || subFeatureId === 'elevator-pitch') {
    return wrapWithBack(<ElevatorPitchPage studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'govt-opportunities-schemes' || subFeatureId === 'govt-jobs' || subFeatureId === 'govt-schemes') {
    return wrapWithBack(<GovtSchemes studentProfile={studentProfile} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'free-courses' || subFeatureId === 'project-ideas') {
    return wrapWithBack(<LearningHub defaultTab={subFeatureId} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'tpo-notices' || subFeatureId === 'tpo') {
    return wrapWithBack(<TpoDashboard onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'language-translation') {
    return wrapWithBack(<LanguageTranslatorPage studentProfile={studentProfile} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'support-feedback' || subFeatureId === 'support' || subFeatureId === 'rating-feedback') {
    return wrapWithBack(<SupportFeedbackPage studentProfile={studentProfile} onNavigate={onNavigate} language={language} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'why-us') {
    return wrapWithBack(<WhyUsPage onNavigate={onNavigate} language={language} onGoBack={onGoBack} />);
  }
  if (subFeatureId === 'search-results') {
    return wrapWithBack(<GlobalSearchResultsPage searchQuery={searchQuery} studentProfile={studentProfile} onNavigate={onNavigate} onGoBack={onGoBack} />);
  }

  // Handle Red Flag Detector scanner logic
  const handleScanRedFlag = (e) => {
    e.preventDefault();
    if (!redFlagUrl) return;
    setRedFlagResult({
      isSafe: !redFlagUrl.toLowerCase().includes('telegram') && !redFlagUrl.toLowerCase().includes('whatsapp'),
      trustScore: redFlagUrl.toLowerCase().includes('telegram') ? '34/100 (HIGH RISK)' : '94/100 (VERIFIED)',
      flags: redFlagUrl.toLowerCase().includes('telegram') ? [
        'Requires upfront registration fee of ₹500 (Scam Alert)',
        'Unverified employer domain',
        'Vague job responsibilities'
      ] : [
        'Verified corporate employer domain',
        'No registration fee required',
        'Official career portal link matched'
      ]
    });
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }} className="fade-in">
      
      {/* 1. STUDENT PROFILE ANALYSIS */}
      {subFeatureId === 'profile-analysis' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="icon-box" style={{ background: '#F0EAFA', color: '#9333EA', margin: 0 }}>
              <UserCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Student Profile Analysis</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Comprehensive breakdown of academics, verified skills & career targets.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#2D1B4E', marginBottom: '12px', fontSize: '1rem', fontWeight: 700 }}>Academic Record</h4>
              <p><strong>Student:</strong> {studentProfile.name}</p>
              <p><strong>College:</strong> {studentProfile.college}</p>
              <p><strong>Branch:</strong> {studentProfile.branch}</p>
              <p><strong>CGPA:</strong> {studentProfile.cgpa} / 10.0</p>
              <p><strong>Backlog History:</strong> {studentProfile.backlogHistory === 0 ? 'Clean Record (0)' : studentProfile.backlogHistory}</p>
            </div>

            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#2D1B4E', marginBottom: '12px', fontSize: '1rem', fontWeight: 700 }}>Target Role & Readiness</h4>
              <p><strong>Career Goal:</strong> <span style={{ color: '#9333EA', fontWeight: 700 }}>Java Backend Developer</span></p>
              <p><strong>Current Employability Score:</strong> <strong style={{ color: '#9333EA' }}>72 / 100</strong></p>
              <p><strong>Placement readiness level:</strong> On Track (Top 24% Batch)</p>
              <div style={{ marginTop: '10px' }}>
                <span className="badge-pill">Target Salary: ₹6.5 - ₹10 LPA</span>
              </div>
            </div>

            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#2D1B4E', marginBottom: '12px', fontSize: '1rem', fontWeight: 700 }}>Current Skills Overview</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {['Java', 'C++', 'SQL', 'HTML', 'Git Basics'].map((s, i) => (
                  <span key={i} style={{ background: '#F0EAFA', color: '#9333EA', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 600 }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
              <h5 style={{ color: '#DC2626', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Recommended Additions:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Spring Boot', 'REST APIs', 'Docker', 'JUnit'].map((s, i) => (
                  <span key={i} style={{ background: '#FEF2F2', color: '#DC2626', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 600 }}>
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACADEMIC & CAREER GUIDANCE */}
      {subFeatureId === 'academic-guidance' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="icon-box" style={{ background: '#FFF0F7', color: '#DB2777', margin: 0 }}>
              <Compass size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Academic & Career Guidance</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Personalized roadmap matching your semester timeline with industry expectations.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: '#FAF7FF', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#9333EA', fontWeight: 700, marginBottom: '6px' }}>Semester 6 Focus (Current)</h4>
              <p style={{ fontSize: '0.9rem' }}>Master Spring Boot fundamentals, create 1 microservice project, and complete NPTEL Database Systems course.</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: '#2563EB', fontWeight: 700, marginBottom: '6px' }}>Semester 7 Goal (Campus Placement Season)</h4>
              <p style={{ fontSize: '0.9rem' }}>Participate in college TPO mock drives, refine ATS resume, and practice 50 LeetCode Medium Java problems.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CAREER PATH EXPLORER */}
      {subFeatureId === 'career-explorer' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#ECFDF5', color: '#059669', margin: 0 }}>
              <Target size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Career Path Explorer</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Explore different tech domains, required skills, and growth trends.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div style={{ background: '#F0EAFA', border: '2px solid #9333EA', padding: '20px', borderRadius: '18px' }}>
              <span className="badge-pill" style={{ background: '#9333EA', color: '#FFFFFF', marginBottom: '10px' }}>YOUR SELECTED MATCH</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E' }}>Java Backend Developer</h3>
              <p style={{ fontSize: '0.85rem', color: '#4A3E56', margin: '8px 0' }}>Build robust server-side APIs, microservices, and high-performance database architectures.</p>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9333EA' }}>Avg Salary: ₹6 LPA - ₹14 LPA</div>
            </div>

            <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', padding: '20px', borderRadius: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E' }}>Full Stack Engineer</h3>
              <p style={{ fontSize: '0.85rem', color: '#4A3E56', margin: '8px 0' }}>Combine React frontend with Java / Node.js backend systems.</p>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563EB' }}>Avg Salary: ₹7 LPA - ₹16 LPA</div>
            </div>

            <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', padding: '20px', borderRadius: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E' }}>Data & AI Engineer</h3>
              <p style={{ fontSize: '0.85rem', color: '#4A3E56', margin: '8px 0' }}>Design data pipelines, SQL queries, and machine learning model integrations.</p>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>Avg Salary: ₹8 LPA - ₹18 LPA</div>
            </div>
          </div>

          {/* Interactive Connected Jobs Network Banner */}
          <div
            onClick={() => onNavigate('connected-jobs-network')}
            style={{
              background: 'linear-gradient(135deg, #F0EAFA 0%, #FFF0F7 100%)',
              border: '1.5px solid #C084FC',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span className="badge-pill" style={{ background: '#9333EA', color: '#FFFFFF', marginBottom: '8px' }}>NEW INTERACTIVE FEATURE</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>
                Interactive Connected Jobs Network
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginTop: '2px' }}>
                Visually explore how your target career roles, skills, internships, courses, and government exams connect together!
              </p>
            </div>
            <button className="btn-primary">
              <span>Open Graph Network</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 4. CURRENT SKILL DEMAND RADAR */}
      {subFeatureId === 'skill-demand' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#EFF6FF', color: '#2563EB', margin: 0 }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Skill Demand Radar 2026</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Live industry hiring demands vs your current profile.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { skill: 'Java Core & Data Structures', demand: '96% High Demand', status: '✓ Mastered (You have this)', pct: 96, color: '#10B981' },
              { skill: 'Spring Boot & Microservices', demand: '92% High Demand', status: '⚡ High Priority Gap', pct: 92, color: '#9333EA' },
              { skill: 'SQL & Database Indexing', demand: '88% High Demand', status: '✓ Proficient', pct: 88, color: '#10B981' },
              { skill: 'RESTful API Architecture', demand: '85% High Demand', status: '⚡ Medium Priority Gap', pct: 85, color: '#F59E0B' },
              { skill: 'Git & GitHub Collaboration', demand: '80% High Demand', status: '⚡ Recommended', pct: 80, color: '#3B82F6' }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '16px', background: '#FAF7FF', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 700 }}>
                  <span style={{ color: '#2D1B4E' }}>{item.skill}</span>
                  <span style={{ color: item.color }}>{item.status}</span>
                </div>
                <div style={{ height: '8px', background: '#EAE2F8', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. GROWTH MAP & WEEKLY PROGRESS */}
      {subFeatureId === 'growth-map' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#F0EAFA', color: '#9333EA', margin: 0 }}>
              <BarChart2 size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Growth Map & Weekly Reports</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Monitor completed tasks, weekly milestones, and employability score gain.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>WEEKLY TARGET</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#9333EA' }}>65%</div>
              <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>Completed on schedule</div>
            </div>
            <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>LEARNING TASKS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>6</div>
              <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>Modules completed</div>
            </div>
            <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>PROJECTS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>2</div>
              <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>GitHub verified</div>
            </div>
            <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>APPLICATIONS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EA580C' }}>8</div>
              <div style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>Submitted jobs/internships</div>
            </div>
          </div>
        </div>
      )}

      {/* 6. INTERNSHIP & JOB OPPORTUNITIES */}
      {subFeatureId === 'internships-jobs' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#EFF6FF', color: '#2563EB', margin: 0 }}>
              <Briefcase size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Internship & Job Opportunities</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Verified job and internship listings curated for Java Backend Developers.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { title: 'Junior Java Developer Intern', company: 'TechCorp Solutions', location: 'Remote / Bangalore', stipend: '₹25,000 / mo', match: '92% Skill Match', tags: ['Java', 'SQL', 'REST API'] },
              { title: 'Backend Software Trainee', company: 'InnoTech Labs', location: 'Hybrid / Gurgaon', stipend: '₹30,000 / mo', match: '88% Skill Match', tags: ['Spring Boot', 'Git'] },
              { title: 'Full Stack Java Graduate Trainee', company: 'CyberTech Global', location: 'Pune', stipend: '₹6.5 LPA (Job)', match: '84% Skill Match', tags: ['Java Core', 'MySQL'] }
            ].map((job, i) => (
              <div key={i} style={{ padding: '20px', borderRadius: '16px', background: '#FAF7FF', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px' }}>
                    {job.match}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D1B4E', marginTop: '6px' }}>{job.title}</h3>
                  <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>{job.company} • {job.location} • <strong>{job.stipend}</strong></p>
                </div>
                <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  <span>Apply Now</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. AI RED FLAG DETECTOR */}
      {subFeatureId === 'red-flag-detector' && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#FEF2F2', color: '#DC2626', margin: 0 }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>AI Red Flag Detector</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Scan job postings to detect fake listings, registration fee scams, or suspicious requirements.</p>
            </div>
          </div>

          <form onSubmit={handleScanRedFlag} style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '8px' }}>
              Paste Job Listing URL or Description:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. https://linkedin.com/jobs/view/123456 or telegram listing..."
                value={redFlagUrl}
                onChange={(e) => setRedFlagUrl(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                <ShieldAlert size={16} />
                <span>Scan Listing</span>
              </button>
            </div>
          </form>

          {redFlagResult && (
            <div style={{
              background: redFlagResult.isSafe ? '#ECFDF5' : '#FEF2F2',
              border: `1.5px solid ${redFlagResult.isSafe ? '#10B981' : '#DC2626'}`,
              borderRadius: '16px',
              padding: '20px'
            }}>
              <h4 style={{ color: redFlagResult.isSafe ? '#059669' : '#DC2626', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>
                Trust Score: {redFlagResult.trustScore}
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#2D1B4E', fontSize: '0.9rem' }}>
                {redFlagResult.flags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 8. EMPLOYABILITY SCORE & PEER BENCHMARKING */}
      {(subFeatureId === 'employability-score' || subFeatureId === 'peer-benchmarking' || subFeatureId === 'mentor-guidance') && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#F0EAFA', color: '#9333EA', margin: 0 }}>
              <Award size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Employability Score & Peer Benchmark</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Illustrative demo analysis of your career readiness and peer standing.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)', color: '#FFFFFF', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#B9A0E8', fontWeight: 700, textTransform: 'uppercase' }}>EMPLOYABILITY SCORE</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F6DCEC', margin: '8px 0' }}>72 <span style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>/ 100</span></div>
              <p style={{ fontSize: '0.88rem', color: '#EAE2F8' }}>Target: Java Backend Developer</p>
              <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem' }}>
                Status: Placement Ready (Top 24%)
              </div>
            </div>

            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '20px', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#2D1B4E', fontWeight: 700, marginBottom: '12px' }}>Peer Benchmarking (Branch CSE Year 3)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div>DSA & Coding: <strong style={{ color: '#9333EA' }}>68th Percentile</strong></div>
                <div>Project Portfolio: <strong style={{ color: '#2563EB' }}>82nd Percentile</strong></div>
                <div>Communication & Soft Skills: <strong style={{ color: '#059669' }}>74th Percentile</strong></div>
                <div>Overall Batch Rank: <strong style={{ color: '#9333EA' }}>Top 24th Percentile</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. SUPPORT & FEEDBACK */}
      {(subFeatureId === 'support-feedback' || subFeatureId === 'rating-feedback') && (
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box" style={{ background: '#FFF0F7', color: '#DB2777', margin: 0 }}>
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2D1B4E' }}>Support & Rating Feedback</h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>We value your input. Raise queries or rate your experience with SkillAura.</p>
            </div>
          </div>

          {feedbackSubmitted ? (
            <div style={{ background: '#ECFDF5', padding: '20px', borderRadius: '16px', color: '#059669', textAlign: 'center' }}>
              <CheckCircle2 size={32} style={{ marginBottom: '8px' }} />
              <h4>Thank you! Your feedback has been submitted successfully.</h4>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFeedbackSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '4px', display: 'block' }}>Rate SkillAura Platform:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={24} color="#F59E0B" fill="#F59E0B" style={{ cursor: 'pointer' }} />
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '4px', display: 'block' }}>Your Query or Feedback:</label>
                <textarea className="form-control" rows={4} placeholder="Tell us how we can improve or ask any career query..." required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                <Send size={16} />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
