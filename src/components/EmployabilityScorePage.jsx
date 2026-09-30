import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Mic, 
  GraduationCap, 
  BarChart2, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Zap,
  Target,
  UserCheck
} from 'lucide-react';

export default function EmployabilityScorePage({ studentProfile, onNavigate }) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('technical');
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('score'); // 'score' | 'benchmark'

  // Student details derived from profile
  const targetRole = studentProfile?.targetRole || 'Java Backend Developer';
  const cgpa = studentProfile?.cgpa || 8.4;
  const studentSkills = studentProfile?.skills || ['Java', 'C++', 'SQL', 'HTML'];

  // Weighted category data model
  const categoryData = {
    technical: {
      name: 'Technical & Role-Specific Skills',
      weight: 30,
      score: 78,
      status: 'assessed',
      icon: Target,
      color: '#9333EA',
      bgColor: '#FAF7FF',
      evidence: `Skill assessment evidence found in Core Java (85%), SQL & Database Querying (80%), REST API basics (70%).`,
      strengths: ['Solid foundation in Core Java & Data Structures', 'Verified SQL query optimization & database design'],
      improvements: ['Spring Boot Microservices knowledge is underdeveloped', 'Docker containerization not yet assessed'],
      contribution: 23.4 // 78 * 0.30
    },
    academic: {
      name: 'Academic Performance',
      weight: 15,
      score: 84, // Normalized from 8.4 CGPA -> (8.4/10)*100 = 84
      status: 'assessed',
      icon: GraduationCap,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      evidence: `Academic transcript verified: CGPA ${cgpa}/10.0, zero active backlogs in CSE Branch, Year 3.`,
      strengths: ['Clean academic record with 0 active backlogs', 'High consistency across Core CS coursework (DSA, DBMS)'],
      improvements: ['Elective course credits in Cloud Computing pending completion'],
      contribution: 12.6 // 84 * 0.15
    },
    projects: {
      name: 'Projects & Practical Experience',
      weight: 20,
      score: 70,
      status: 'assessed',
      icon: Briefcase,
      color: '#059669',
      bgColor: '#ECFDF5',
      evidence: `2 GitHub verified repositories (E-Commerce Backend API & Student Management System).`,
      strengths: ['Working GitHub project with CRUD operations and SQL persistence', 'Clear documentation in README'],
      improvements: ['Lacks production deployment (e.g. AWS/Render hosting)', 'No microservices integration demonstrated'],
      contribution: 14.0 // 70 * 0.20
    },
    communication: {
      name: 'Communication & Soft Skills',
      weight: 15,
      score: 75,
      status: 'assessed',
      icon: UserCheck,
      color: '#D97706',
      bgColor: '#FFFBEB',
      evidence: `Mock interview speech metrics: Good fluency (75%), clear articulation, confidence index 78%.`,
      strengths: ['Clear explanation of project architecture', 'Good active listening and structured response delivery'],
      improvements: ['Practice concise STAR method for behavioral questions'],
      contribution: 11.25 // 75 * 0.15
    },
    resume: {
      name: 'Resume & Professional Profile',
      weight: 10,
      score: 72,
      status: 'assessed',
      icon: FileText,
      color: '#DB2777',
      bgColor: '#FFF0F7',
      evidence: `ATS Resume Scanner score: 72/100. Formatting clean, keyword match 68% for Java Backend roles.`,
      strengths: ['Standard single-page ATS layout with clean typography', 'Verified skill badge links included'],
      improvements: ['Include quantifiable impact metrics in project bullet points (e.g. "improved query speed by 30%")'],
      contribution: 7.2 // 72 * 0.10
    },
    interview: {
      name: 'Interview Readiness',
      weight: 10,
      score: 65,
      status: 'assessed',
      icon: Mic,
      color: '#7C3AED',
      bgColor: '#F3E8FF',
      evidence: `Completed 1 AI Technical Mock Interview session. Coding problem solved in 28 mins.`,
      strengths: ['Able to explain time complexity (Big O) accurately'],
      improvements: ['Needs faster code implementation under timed pressure', 'Practice edge-case handling in live coding'],
      contribution: 6.5 // 65 * 0.10
    }
  };

  // Compute total employability score
  const categoriesList = Object.keys(categoryData).map(key => ({ key, ...categoryData[key] }));
  const assessedCategories = categoriesList.filter(c => c.status === 'assessed');
  
  const totalAssessedWeight = assessedCategories.reduce((acc, curr) => acc + curr.weight, 0);
  const totalRawContribution = assessedCategories.reduce((acc, curr) => acc + curr.contribution, 0);
  
  // Proportional score calculation if any category is not assessed
  const finalScore = Math.round((totalRawContribution / totalAssessedWeight) * 100);
  const coveragePct = Math.round((totalAssessedWeight / 100) * 100);

  // Readiness classification
  let readinessLevel = 'Developing';
  let readinessColor = '#D97706';
  let readinessBg = '#FFFBEB';
  if (finalScore >= 80) {
    readinessLevel = 'Career Ready';
    readinessColor = '#059669';
    readinessBg = '#ECFDF5';
  } else if (finalScore >= 60) {
    readinessLevel = 'Progressing';
    readinessColor = '#9333EA';
    readinessBg = '#FAF7FF';
  }

  // Top strengths (top 2 highest category scores)
  const sortedByScore = [...assessedCategories].sort((a, b) => b.score - a.score);
  const topStrengths = sortedByScore.slice(0, 2);
  const areasToImprove = [...assessedCategories].sort((a, b) => a.score - b.score).slice(0, 3);

  // Historical score snapshots for graph
  const scoreHistory = [
    { date: 'Jun 15, 2026', score: 62 },
    { date: 'Jul 20, 2026', score: 67 },
    { date: 'Aug 25, 2026', score: 71 },
    { date: 'Sep 29, 2026 (Today)', score: finalScore }
  ];

  const selectedCat = categoryData[selectedCategoryKey];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & SUB-FEATURE TAB SWITCHER */}
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
        gap: '16px'
      }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#F0EAFA', color: '#9333EA' }}>
            <Award size={15} />
            <span>TRANSPARENT CAREER READINESS ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Employability Score
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Evidence-based calculation of your preparation for <strong style={{ color: '#9333EA' }}>{targetRole}</strong>.
          </p>
        </div>

        {/* Tab switch between Score & Peer Benchmark */}
        <div style={{ display: 'flex', background: '#F0EAFA', padding: '4px', borderRadius: '16px' }}>
          <button
            onClick={() => setActiveTab('score')}
            style={{
              padding: '8px 18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'score' ? '#9333EA' : 'transparent',
              color: activeTab === 'score' ? '#FFFFFF' : '#4A3E56',
              transition: 'all 0.2s ease'
            }}
          >
            Employability Score
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            style={{
              padding: '8px 18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'benchmark' ? '#9333EA' : 'transparent',
              color: activeTab === 'benchmark' ? '#FFFFFF' : '#4A3E56',
              transition: 'all 0.2s ease'
            }}
          >
            Peer Benchmarking
          </button>
        </div>
      </div>

      {activeTab === 'score' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 2. MAIN DASHBOARD CARD */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EAE2F8',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'center'
          }}>
            {/* Circular Progress Gauge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" stroke="#F0EAFA" strokeWidth="14" fill="transparent" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="70" 
                    stroke="url(#gradientScore)" 
                    strokeWidth="14" 
                    fill="transparent" 
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * finalScore) / 100}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                  <defs>
                    <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#DB2777" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '160px',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#2D1B4E', lineHeight: 1 }}>
                    {finalScore}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#7A6F8A', fontWeight: 700 }}>out of 100</span>
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-pill" style={{ background: readinessBg, color: readinessColor, fontWeight: 800, fontSize: '0.82rem' }}>
                  Readiness: {readinessLevel}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                  +4 pts vs last month
                </span>
              </div>
            </div>

            {/* Target Role & Assessment Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#FAF7FF', padding: '16px', borderRadius: '16px', border: '1px solid #EAE2F8' }}>
                <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 800, textTransform: 'uppercase' }}>TARGET CAREER ROLE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>{targetRole}</div>
                <div style={{ fontSize: '0.82rem', color: '#9333EA', marginTop: '4px', fontWeight: 600 }}>
                  Based on active Skill Gap Analysis & Verified Assessments
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>LAST UPDATED</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E' }}>Sep 29, 2026</div>
                </div>
                <div style={{ background: '#FAF7FF', padding: '12px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                  <div style={{ fontSize: '0.74rem', color: '#7A6F8A', fontWeight: 700 }}>ASSESSMENT COVERAGE</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>{coveragePct}% (6/6 categories)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. AI-BASED PERSONALIZED INSIGHTS */}
          <div style={{
            background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
            border: '1.5px solid #C084FC',
            borderRadius: '20px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div className="icon-box" style={{ background: '#9333EA', color: '#FFFFFF', width: '36px', height: '36px', margin: 0 }}>
                <Sparkles size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E' }}>
                AI Employability Analysis & Insights
              </h3>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#4A3E56', lineHeight: '1.6', marginBottom: '14px' }}>
              Your current score of <strong>{finalScore}/100</strong> reflects strong performance in <strong>Academic Record (84%)</strong> and <strong>Technical Core Skills (78%)</strong>. To reach the <em>"Career Ready" (80+)</em> milestone for Java Backend roles, focus on expanding practical Spring Boot project deployment and honing timed coding during AI Mock Interviews.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669' }}>✓ TOP CONTRIBUTOR</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginTop: '2px' }}>Technical Skills (+23.4 pts)</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706' }}>⚡ NEXT BIG OPPORTUNITY</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2D1B4E', marginTop: '2px' }}>Interview Timed Practice (+3.5 pts)</div>
              </div>
            </div>
          </div>

          {/* 4. SCORE BREAKDOWN ACROSS 6 WEIGHTED CATEGORIES */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>
                  Weighted Category Breakdown
                </h3>
                <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>
                  Click on any category to view verified evidence, strengths & improvement areas.
                </p>
              </div>

              <button 
                onClick={() => setShowFormulaInfo(!showFormulaInfo)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '6px 14px' }}
              >
                <Info size={15} />
                <span>{showFormulaInfo ? 'Hide Formula' : 'How Is Score Calculated?'}</span>
              </button>
            </div>

            {/* Formula Explanation Accordion */}
            {showFormulaInfo && (
              <div style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '20px', marginBottom: '20px' }} className="fade-in">
                <h4 style={{ fontSize: '1.0rem', fontWeight: 800, color: '#9333EA', marginBottom: '8px' }}>
                  Calculation Methodology & Formula
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '12px' }}>
                  The Employability Score is calculated using standard weighted contribution formula:
                </p>
                <div style={{ background: '#2D1B4E', color: '#F6DCEC', padding: '12px 18px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '12px' }}>
                  Employability Score = Σ (Category Normalized Score × Category Weight %)
                </div>
                <ul style={{ fontSize: '0.85rem', color: '#7A6F8A', paddingLeft: '20px', lineHeight: '1.5' }}>
                  <li><strong>Technical Skills (30%):</strong> Assessed via Skill Gap test scores & skill verification.</li>
                  <li><strong>Academic Performance (15%):</strong> CGPA normalized to 100 scale (e.g. 8.4 CGPA = 84 points).</li>
                  <li><strong>Projects (20%):</strong> Assessed via GitHub repositories, CRUD features & deployment.</li>
                  <li><strong>Communication (15%):</strong> Speech clarity & response confidence during AI interviews.</li>
                  <li><strong>Resume (10%):</strong> ATS formatting & role-specific keyword density score.</li>
                  <li><strong>Interview Readiness (10%):</strong> Live coding & technical mock interview result.</li>
                </ul>
              </div>
            )}

            {/* 6 Category Progress Bars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {categoriesList.map((cat) => {
                const isSelected = selectedCategoryKey === cat.key;
                const IconComponent = cat.icon;

                return (
                  <div
                    key={cat.key}
                    onClick={() => setSelectedCategoryKey(cat.key)}
                    style={{
                      background: isSelected ? cat.bgColor : '#FFFFFF',
                      border: `2px solid ${isSelected ? cat.color : '#EAE2F8'}`,
                      borderRadius: '18px',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 4px 14px ${cat.color}20` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: `${cat.color}15`, color: cat.color, padding: '8px', borderRadius: '10px' }}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E' }}>{cat.name}</div>
                          <div style={{ fontSize: '0.76rem', color: '#7A6F8A' }}>Weight: {cat.weight}% of total</div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: cat.color }}>{cat.score} <span style={{ fontSize: '0.78rem', color: '#7A6F8A' }}>/100</span></div>
                        <div style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>+{cat.contribution} pts</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '8px', background: '#EAE2F8', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${cat.score}%`, height: '100%', background: cat.color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Category Deep Dive Panel */}
            <div style={{
              background: selectedCat.bgColor,
              border: `1.5px solid ${selectedCat.color}40`,
              borderRadius: '20px',
              padding: '24px'
            }} className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{selectedCat.name} Inspection</span>
                  <span style={{ fontSize: '0.8rem', background: selectedCat.color, color: '#FFFFFF', padding: '2px 10px', borderRadius: '10px' }}>
                    Weight {selectedCat.weight}% (Contributes {selectedCat.contribution} pts)
                  </span>
                </h4>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8', marginBottom: '14px' }}>
                <strong style={{ fontSize: '0.82rem', color: '#7A6F8A', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  EVIDENCE USED FOR CALCULATION
                </strong>
                <p style={{ fontSize: '0.9rem', color: '#2D1B4E' }}>{selectedCat.evidence}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#059669', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    ✓ IDENTIFIED STRENGTHS
                  </strong>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#2D1B4E', margin: 0 }}>
                    {selectedCat.strengths.map((str, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '14px', border: '1px solid #EAE2F8' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#D97706', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    ⚡ AREAS NEEDING IMPROVEMENT
                  </strong>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#2D1B4E', margin: 0 }}>
                    {selectedCat.improvements.map((imp, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ADDITIONAL USEFUL FEATURES & ACTION PLAN */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* Top Strengths & Areas to Improve */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
                Summary Highlights
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>TOP 2 STRENGTHS</span>
                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {topStrengths.map((st, i) => (
                    <div key={i} style={{ background: '#ECFDF5', padding: '10px 14px', borderRadius: '12px', border: '1px solid #A7F3D0', fontSize: '0.88rem', fontWeight: 700, color: '#059669' }}>
                      ⭐ {st.name} — {st.score}%
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>TOP IMPROVEMENT OPPORTUNITIES</span>
                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {areasToImprove.map((im, i) => (
                    <div key={i} style={{ background: '#FFFBEB', padding: '10px 14px', borderRadius: '12px', border: '1px solid #FDE68A', fontSize: '0.88rem', fontWeight: 700, color: '#D97706' }}>
                      🎯 {im.name} — {im.score}%
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personalized Action Plan */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
                Personalized Action Plan
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#7A6F8A', marginBottom: '14px' }}>
                Take targeted actions in SkillAura modules to boost your score efficiently.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#FAF7FF', padding: '12px 16px', borderRadius: '14px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2D1B4E' }}>1. Complete Spring Boot Skill Test</div>
                    <div style={{ fontSize: '0.76rem', color: '#9333EA' }}>Boosts Technical Score (+5 pts)</div>
                  </div>
                  <button onClick={() => onNavigate('skill-gap')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                    Take Test
                  </button>
                </div>

                <div style={{ background: '#FAF7FF', padding: '12px 16px', borderRadius: '14px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2D1B4E' }}>2. Practice AI Mock Coding Interview</div>
                    <div style={{ fontSize: '0.76rem', color: '#2563EB' }}>Boosts Interview Readiness (+4 pts)</div>
                  </div>
                  <button onClick={() => onNavigate('mock-interviews')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                    Practice
                  </button>
                </div>

                <div style={{ background: '#FAF7FF', padding: '12px 16px', borderRadius: '14px', border: '1px solid #EAE2F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2D1B4E' }}>3. Quantify Bullet Points in Resume</div>
                    <div style={{ fontSize: '0.76rem', color: '#059669' }}>Boosts Resume ATS Score (+3 pts)</div>
                  </div>
                  <button onClick={() => onNavigate('resume-analyzer')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                    Optimize
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* 6. SCORE HISTORY LINE GRAPH */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
              Employability Progress History
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7A6F8A', marginBottom: '18px' }}>
              Track how your employability score has improved across verified assessments over time.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {scoreHistory.map((item, idx) => (
                <div key={idx} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.76rem', color: '#7A6F8A', fontWeight: 700 }}>{item.date}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9333EA', margin: '4px 0' }}>{item.score}</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                    {idx === 0 ? 'Baseline' : `+${item.score - scoreHistory[idx - 1].score} pts`}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* PEER BENCHMARKING VIEW */
        <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }} className="fade-in">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
            Peer Benchmarking (Branch CSE Year 3)
          </h2>
          <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '24px' }}>
            Anonymized comparative standing against batchmates targeting <strong>{targetRole}</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)', color: '#FFFFFF', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#B9A0E8', fontWeight: 700, textTransform: 'uppercase' }}>BATCH PERCENTILE RANK</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F6DCEC', margin: '8px 0' }}>Top 24%</div>
              <p style={{ fontSize: '0.88rem', color: '#EAE2F8' }}>Rank 48 of 210 students</p>
              <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem' }}>
                Placement Status: High Placement Likelihood
              </div>
            </div>

            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '20px', border: '1px solid #EAE2F8' }}>
              <h4 style={{ color: '#2D1B4E', fontWeight: 700, marginBottom: '14px' }}>Skill Domain Percentiles</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>DSA & Coding Proficiency</span>
                    <strong style={{ color: '#9333EA' }}>68th Percentile</strong>
                  </div>
                  <div style={{ height: '6px', background: '#EAE2F8', borderRadius: '3px' }}><div style={{ width: '68%', height: '100%', background: '#9333EA' }} /></div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Project Portfolio Quality</span>
                    <strong style={{ color: '#2563EB' }}>82nd Percentile</strong>
                  </div>
                  <div style={{ height: '6px', background: '#EAE2F8', borderRadius: '3px' }}><div style={{ width: '82%', height: '100%', background: '#2563EB' }} /></div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Communication & Mock Rating</span>
                    <strong style={{ color: '#059669' }}>74th Percentile</strong>
                  </div>
                  <div style={{ height: '6px', background: '#EAE2F8', borderRadius: '3px' }}><div style={{ width: '74%', height: '100%', background: '#059669' }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
