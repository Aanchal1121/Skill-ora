import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  Target, 
  BookOpen, 
  Edit3, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  RefreshCw, 
  Copy, 
  Check, 
  Building2, 
  Eye, 
  Clock, 
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';

export default function ResumeTools({ studentProfile, defaultTab }) {
  // Navigation state: null = Main Landing Page | 'editor' | 'analyzer' | 'improvement' | 'rejection' | 'company' | 'reference'
  const [currentView, setCurrentView] = useState(null);

  // Resume Editor State
  const [editorResumeText, setEditorResumeText] = useState(`Aanchal Sharma | Java Backend Developer
Email: aanchal.sharma@college.edu | Phone: +91 98765 43210
GitHub: github.com/aanchal | LinkedIn: linkedin.com/in/aanchal

SUMMARY:
Motivated 3rd year Computer Science student specializing in Core Java, Microservices, and SQL database management.

EDUCATION:
B.Tech in Computer Science & Engineering (2022 - 2026)
Imperial Institute of Technology & Science | CGPA: 8.4 / 10.0

SKILLS:
Languages: Java Core, C++, SQL, HTML/CSS
Frameworks & Tools: Spring Boot, REST APIs, Git, PostgreSQL, Docker Basics

PROJECTS:
• E-Commerce Microservices Backend: Built Spring Boot REST APIs with PostgreSQL persistence and Redis caching.
• Student Performance Tracker: Designed React & MySQL dashboard for tracking student SGPA trends.`);

  // Resume Analyzer State
  const [analyzerJdText, setAnalyzerJdText] = useState(`Role: Junior Java Developer Intern
Company: TCS (Tata Consultancy Services)
Requirements: Core Java, SQL Querying, REST APIs, Git. Min 60% CGPA.`);
  const [analyzerResult, setAnalyzerResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Resume Improvement State (Side-by-Side)
  const [bullets, setBullets] = useState([
    {
      id: 1,
      original: 'Built React frontend for shopping cart app.',
      suggested: 'Engineered responsive React web interface with Redux state management, improving user checkout velocity by 25%.',
      status: 'pending' // 'pending' | 'accepted' | 'rejected'
    },
    {
      id: 2,
      original: 'Worked on database queries in SQL for student records.',
      suggested: 'Optimized complex PostgreSQL JOIN queries and indexed student tables, reducing query latency by 30%.',
      status: 'pending'
    }
  ]);

  // Rejected Resume State
  const [rejectionFeedback, setRejectionFeedback] = useState(`Dear Candidate, Thank you for applying to our Java Engineering position. After reviewing your resume, we have decided not to proceed as we require stronger quantified project achievements and Spring Boot experience.`);
  const [rejectionAnalysis, setRejectionAnalysis] = useState(null);

  // Company Specific Resume State
  const [selectedTargetCompany, setSelectedTargetCompany] = useState('TCS Digital');
  const [companyMatchResult, setCompanyMatchResult] = useState(null);

  // Saved Resume Versions History
  const [savedVersions, setSavedVersions] = useState([
    { id: 1, name: 'Java_Backend_ATS_v2.pdf', date: 'Sep 28, 2026', atsScore: 72 },
    { id: 2, name: 'TCS_Digital_Customized.pdf', date: 'Sep 25, 2026', atsScore: 78 },
    { id: 3, name: 'General_Software_Engineer.pdf', date: 'Sep 15, 2026', atsScore: 68 }
  ]);

  // 6 Main Feature Cards Data
  const featureCards = [
    {
      id: 'editor',
      title: 'Resume Editor',
      icon: Edit3,
      color: '#9333EA',
      bgColor: '#FAF7FF',
      description: 'Upload and edit an existing resume, update sections, correct formatting, preview changes, and save PDF versions.'
    },
    {
      id: 'analyzer',
      title: 'Resume Analyzer',
      icon: FileText,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      description: 'Analyze ATS readability, formatting, grammar, structure, completeness, and job-description relevance.'
    },
    {
      id: 'improvement',
      title: 'Resume Improvement',
      icon: Sparkles,
      color: '#059669',
      bgColor: '#ECFDF5',
      description: 'Identify weak bullet points and vague wording with side-by-side original vs suggested bullet point improvements.'
    },
    {
      id: 'rejection',
      title: 'Rejected Resume Correction',
      icon: ShieldAlert,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      description: 'Upload a rejected resume and optional employer feedback to identify hidden weaknesses and correct errors.'
    },
    {
      id: 'company',
      title: 'Company-Specific Resume',
      icon: Target,
      color: '#D97706',
      bgColor: '#FFFBEB',
      description: 'Compare your existing resume against specific company JD requirements (e.g. TCS, Amazon) for tailored optimization.'
    },
    {
      id: 'reference',
      title: 'Reference Resumes',
      icon: BookOpen,
      color: '#DB2777',
      bgColor: '#FFF0F7',
      description: 'Explore sample reference resumes for Java Developers, AI/ML Engineers, Data Analysts, and Cloud Engineers.'
    }
  ];

  // Run ATS Analyzer
  const handleRunAnalyzer = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalyzerResult({
        atsScore: 74,
        readability: 'Good (Single Column Layout)',
        keywordMatch: '68% Match for Java Backend roles',
        strengths: [
          'Clean ATS single-column typography',
          'Core Java & SQL keywords detected in skills section',
          'Valid contact details & links'
        ],
        improvements: [
          'Add quantifiable metrics to project bullet points (e.g. % improvement)',
          'Spring Boot & Microservices keywords are missing'
        ]
      });
      setIsAnalyzing(false);
    }, 600);
  };

  // Run Rejection Corrector Analysis
  const handleAnalyzeRejection = () => {
    setRejectionAnalysis({
      perceivedGaps: [
        'Lack of quantified performance metrics in project bullet points',
        'Spring Boot Framework experience not highlighted prominently',
        'Vague description of database query optimization'
      ],
      recommendedFixes: [
        'Rewrite project section using Action Verb + Task + Impact formula',
        'Add Spring Boot microservice architecture project to GitHub repo',
        'Highlight CGPA 8.4 prominently in education header'
      ]
    });
  };

  // Run Company Match Analysis
  const handleCompanyMatch = () => {
    setCompanyMatchResult({
      company: selectedTargetCompany,
      matchPct: 82,
      matchingKeywords: ['Java', 'SQL', 'Git', 'Agile'],
      missingKeywords: ['REST APIs', 'Spring Security', 'JUnit'],
      customizationTip: 'Highlight your E-Commerce REST API project at the top of your experience section for TCS Digital.'
    });
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. MAIN RESUME ASSIST LANDING PAGE */}
      {currentView === null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF7FF 50%, #FFF0F7 100%)',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid #EAE2F8',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div className="badge-pill" style={{ marginBottom: '8px', background: '#F0EAFA', color: '#9333EA' }}>
                <FileText size={15} />
                <span>UNIFIED RESUME ASSIST SUITE</span>
              </div>
              <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                Resume Assist
              </h1>
              <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
                Improve your resume, identify gaps, and prepare for your next career opportunity.
              </p>
            </div>

            <button onClick={() => setCurrentView('editor')} className="btn-primary" style={{ padding: '10px 20px' }}>
              <Upload size={16} />
              <span>Upload & Edit Resume</span>
            </button>
          </div>

          {/* 6 Clickable Feature Cards Grid */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
              Select a Resume Assist Feature
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              {featureCards.map((card) => {
                const IconComponent = card.icon;

                return (
                  <div
                    key={card.id}
                    onClick={() => setCurrentView(card.id)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #EAE2F8',
                      borderRadius: '20px',
                      padding: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 18px rgba(147, 51, 234, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ background: card.bgColor, color: card.color, padding: '10px', borderRadius: '14px' }}>
                          <IconComponent size={24} />
                        </div>
                        <ArrowRight size={18} color="#7A6F8A" />
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: '#7A6F8A', lineHeight: '1.5' }}>
                        {card.description}
                      </p>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: card.color, marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Open Workspace</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Resumes & Version History */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.05)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#9333EA" />
              <span>Recent Resumes & Saved Versions</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedVersions.map((ver) => (
                <div key={ver.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '14px', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} color="#9333EA" />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E' }}>{ver.name}</div>
                      <div style={{ fontSize: '0.76rem', color: '#7A6F8A' }}>Saved: {ver.date} • ATS Score: {ver.atsScore}/100</div>
                    </div>
                  </div>

                  <button onClick={() => setCurrentView('editor')} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                    Open in Editor
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. INDIVIDUAL FEATURE WORKSPACES (WITH BACK BUTTON) */}
      {currentView !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Back Navigation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <button
              onClick={() => setCurrentView(null)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.86rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Resume Assist Overview</span>
            </button>
            <span style={{ fontSize: '0.84rem', color: '#7A6F8A' }}>| Active Workspace: <strong>{featureCards.find(c => c.id === currentView)?.title}</strong></span>
          </div>

          {/* WORKSPACE 1: RESUME EDITOR */}
          {currentView === 'editor' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px' }}>
                Resume Editor Workspace
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '20px' }}>
                Edit your resume text sections, update formatting, preview live output, and export PDF versions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                    Edit Resume Text:
                  </label>
                  <textarea
                    className="form-control"
                    rows={16}
                    value={editorResumeText}
                    onChange={(e) => setEditorResumeText(e.target.value)}
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px' }}>
                  <h4 style={{ fontSize: '1.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px' }}>
                    Live ATS Formatting Preview
                  </h4>
                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #EAE2F8', whiteSpace: 'pre-wrap', fontFamily: 'sans-serif', fontSize: '0.84rem', color: '#2D1B4E', maxHeight: '350px', overflowY: 'auto' }}>
                    {editorResumeText}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    <button onClick={() => alert('Saved version to history!')} className="btn-secondary">Save Version</button>
                    <button onClick={() => alert('Downloading ATS PDF Resume...')} className="btn-primary">
                      <Download size={14} /> Export PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSPACE 2: RESUME ANALYZER */}
          {currentView === 'analyzer' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '12px' }}>
                ATS Resume Analyzer Workspace
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                  Target Job Description (JD):
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={analyzerJdText}
                  onChange={(e) => setAnalyzerJdText(e.target.value)}
                />
                <button onClick={handleRunAnalyzer} className="btn-primary" style={{ marginTop: '12px' }}>
                  <Sparkles size={16} />
                  <span>{isAnalyzing ? 'Analyzing ATS Readiness...' : 'Run ATS Analysis'}</span>
                </button>
              </div>

              {analyzerResult && (
                <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px' }} className="fade-in">
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9333EA', marginBottom: '10px' }}>
                    ATS Score: {analyzerResult.atsScore} / 100
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: '#2D1B4E', marginBottom: '12px' }}>
                    Readability: <strong>{analyzerResult.readability}</strong> | Keyword Match: <strong>{analyzerResult.keywordMatch}</strong>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                      <strong style={{ color: '#059669', display: 'block', marginBottom: '4px' }}>✓ Identified Strengths:</strong>
                      {analyzerResult.strengths.map((st, i) => <div key={i} style={{ fontSize: '0.84rem' }}>• {st}</div>)}
                    </div>
                    <div style={{ background: '#FFFBEB', padding: '14px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                      <strong style={{ color: '#D97706', display: 'block', marginBottom: '4px' }}>⚡ Needed Improvements:</strong>
                      {analyzerResult.improvements.map((im, i) => <div key={i} style={{ fontSize: '0.84rem' }}>• {im}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WORKSPACE 3: RESUME IMPROVEMENT (SIDE-BY-SIDE) */}
          {currentView === 'improvement' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                Bullet Point Improvement Workspace (Side-by-Side)
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '20px' }}>
                Accept or reject AI-suggested bullet point rewrites to boost impact metrics.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {bullets.map((b) => (
                  <div key={b.id} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                      <div style={{ background: '#FFF0F7', padding: '12px', borderRadius: '12px', border: '1px solid #FBCFE8' }}>
                        <span style={{ fontSize: '0.74rem', color: '#DB2777', fontWeight: 800, textTransform: 'uppercase' }}>ORIGINAL TEXT</span>
                        <div style={{ fontSize: '0.88rem', color: '#2D1B4E', marginTop: '4px' }}>{b.original}</div>
                      </div>

                      <div style={{ background: '#ECFDF5', padding: '12px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                        <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase' }}>SUGGESTED REWRITE</span>
                        <div style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 700, marginTop: '4px' }}>{b.suggested}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setBullets(bullets.map(x => x.id === b.id ? { ...x, status: 'rejected' } : x))}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#DC2626' }}
                      >
                        Reject Suggestion
                      </button>
                      <button
                        onClick={() => setBullets(bullets.map(x => x.id === b.id ? { ...x, status: 'accepted' } : x))}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        {b.status === 'accepted' ? 'Accepted ✓' : 'Accept & Replace'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORKSPACE 4: REJECTED RESUME CORRECTION */}
          {currentView === 'rejection' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#DC2626', marginBottom: '8px' }}>
                Rejected Resume Correction Workspace
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '18px' }}>
                Paste recruiter rejection email or feedback to diagnose weaknesses and correct resume errors.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '6px', display: 'block' }}>
                  Paste Rejection Email or Feedback:
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={rejectionFeedback}
                  onChange={(e) => setRejectionFeedback(e.target.value)}
                />
                <button onClick={handleAnalyzeRejection} className="btn-primary" style={{ marginTop: '12px', background: '#DC2626', borderColor: '#DC2626' }}>
                  <ShieldAlert size={16} />
                  <span>Analyze Rejection Feedback</span>
                </button>
              </div>

              {rejectionAnalysis && (
                <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '18px', padding: '20px' }} className="fade-in">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#DC2626', marginBottom: '8px' }}>
                    Diagnosed Rejection Weaknesses:
                  </h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#2D1B4E', marginBottom: '14px' }}>
                    {rejectionAnalysis.perceivedGaps.map((gap, i) => <li key={i} style={{ marginBottom: '4px' }}>{gap}</li>)}
                  </ul>

                  <strong style={{ fontSize: '0.86rem', color: '#059669', display: 'block', marginBottom: '6px' }}>Recommended Corrections:</strong>
                  {rejectionAnalysis.recommendedFixes.map((fix, i) => <div key={i} style={{ fontSize: '0.84rem', color: '#047857' }}>✓ {fix}</div>)}
                </div>
              )}
            </div>
          )}

          {/* WORKSPACE 5: COMPANY-SPECIFIC RESUME */}
          {currentView === 'company' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                Company-Specific Resume Optimization
              </h2>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <select
                  value={selectedTargetCompany}
                  onChange={(e) => setSelectedTargetCompany(e.target.value)}
                  className="form-control"
                  style={{ width: 'auto' }}
                >
                  <option value="TCS Digital">Target: TCS Digital</option>
                  <option value="Amazon Web Services">Target: Amazon AWS</option>
                  <option value="Infosys Specialist Programmer">Target: Infosys SP</option>
                </select>
                <button onClick={handleCompanyMatch} className="btn-primary">
                  <Target size={16} />
                  <span>Run Company Match</span>
                </button>
              </div>

              {companyMatchResult && (
                <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px' }} className="fade-in">
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9333EA', marginBottom: '6px' }}>
                    {companyMatchResult.company} Match Score: {companyMatchResult.matchPct}%
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#4A3E56', marginBottom: '12px' }}>
                    <strong>Customization Advice:</strong> {companyMatchResult.customizationTip}
                  </p>
                  <button onClick={() => alert('Saved customized resume version for company!')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    Save Company Version
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WORKSPACE 6: REFERENCE RESUMES */}
          {currentView === 'reference' && (
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px' }} className="fade-in">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                Reference Resumes & Samples Gallery
              </h2>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '20px' }}>
                Curated reference resumes for freshers, interns, and experienced engineering roles.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { role: 'Java Developer Sample', level: 'Fresher / Intern', desc: 'Single-page ATS format emphasizing Java, SQL, and Spring Boot REST API project.' },
                  { role: 'AI/ML Engineer Sample', level: 'Undergraduate', desc: 'Focuses on Python Pandas, PyTorch models, and Kaggle competition entries.' },
                  { role: 'Data Analyst Sample', level: 'Fresher', desc: 'Highlights SQL Joins, PowerBI dashboards, and business case study analysis.' },
                  { role: 'Cloud Engineer Sample', level: 'Intern', desc: 'Includes AWS EC2, S3, Dockerfiles, and bash automation scripts.' }
                ].map((sample, idx) => (
                  <div key={idx} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '18px' }}>
                    <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', marginBottom: '6px' }}>{sample.level}</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>{sample.role}</h4>
                    <p style={{ fontSize: '0.84rem', color: '#7A6F8A', marginBottom: '12px' }}>{sample.desc}</p>
                    <button onClick={() => alert('Sample reference template loaded into editor!')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      Use Reference Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
