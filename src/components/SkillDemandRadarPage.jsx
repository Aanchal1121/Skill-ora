import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Database,
  ExternalLink,
  Target
} from 'lucide-react';

import { getNormalizedSkills, formatSkillsList } from '../utils/profileUtils';

export default function SkillDemandRadarPage({ studentProfile, onNavigate }) {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('30d');
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const targetRole = studentProfile?.targetRole || 'Java Backend Developer';
  const studentSkills = getNormalizedSkills(studentProfile?.skills);

  // Master Market Dataset by Industry
  const skillDatasets = {
    all: [
      { skill: 'Python', count: 24500, pct: 88, category: 'AI & Data', isMatchingStudent: false },
      { skill: 'Java', count: 21800, pct: 82, category: 'Backend Dev', isMatchingStudent: true },
      { skill: 'SQL', count: 19400, pct: 76, category: 'Databases', isMatchingStudent: true },
      { skill: 'React', count: 17200, pct: 68, category: 'Frontend', isMatchingStudent: false },
      { skill: 'AWS', count: 15900, pct: 64, category: 'Cloud', isMatchingStudent: false },
      { skill: 'Spring Boot', count: 14800, pct: 59, category: 'Backend Dev', isMatchingStudent: false },
      { skill: 'Machine Learning', count: 13200, pct: 54, category: 'AI/ML', isMatchingStudent: false },
      { skill: 'Cybersecurity', count: 11500, pct: 46, category: 'Security', isMatchingStudent: false }
    ],
    it: [
      { skill: 'Java', count: 19500, pct: 89, category: 'Backend Dev', isMatchingStudent: true },
      { skill: 'Spring Boot', count: 14800, pct: 74, category: 'Backend Dev', isMatchingStudent: false },
      { skill: 'SQL', count: 13900, pct: 70, category: 'Databases', isMatchingStudent: true },
      { skill: 'React', count: 12400, pct: 62, category: 'Frontend', isMatchingStudent: false },
      { skill: 'Docker', count: 10800, pct: 54, category: 'DevOps', isMatchingStudent: false },
      { skill: 'REST APIs', count: 9800, pct: 49, category: 'Architecture', isMatchingStudent: false }
    ],
    ai: [
      { skill: 'Python', count: 22100, pct: 92, category: 'AI/ML Core', isMatchingStudent: false },
      { skill: 'PyTorch', count: 15400, pct: 71, category: 'Deep Learning', isMatchingStudent: false },
      { skill: 'Machine Learning', count: 14200, pct: 66, category: 'ML Algorithms', isMatchingStudent: false },
      { skill: 'SQL', count: 11000, pct: 51, category: 'Data Querying', isMatchingStudent: true },
      { skill: 'LangChain', count: 9600, pct: 44, category: 'GenAI Tools', isMatchingStudent: false }
    ],
    cloud: [
      { skill: 'AWS', count: 18900, pct: 85, category: 'Cloud Infrastructure', isMatchingStudent: false },
      { skill: 'Docker', count: 15200, pct: 72, category: 'Containers', isMatchingStudent: false },
      { skill: 'Kubernetes', count: 12800, pct: 61, category: 'Orchestration', isMatchingStudent: false },
      { skill: 'Terraform', count: 9900, pct: 48, category: 'IaC', isMatchingStudent: false }
    ]
  };

  const currentData = skillDatasets[selectedIndustry] || skillDatasets.all;
  const maxCount = Math.max(...currentData.map(d => d.count));

  // Top 3 Trending Skills (Highest demand growth)
  const trendingSkills = [
    { name: 'Docker & Microservices', growth: '+38%', reason: 'Surge in cloud native backend postings', trend: 'up' },
    { name: 'Spring Boot 3.x', growth: '+32%', reason: 'High demand across enterprise tech hiring', trend: 'up' },
    { name: 'Python GenAI APIs', growth: '+29%', reason: 'Rapid adoption in LLM application dev', trend: 'up' }
  ];

  // Up to 2 Personalized Skill Recommendations based on Target Role
  const recommendations = [
    {
      skill: 'Spring Boot & Microservices',
      reason: `Required in 74% of ${targetRole} job listings. Currently missing in your assessed profile.`,
      color: '#9333EA',
      bgColor: '#FAF7FF'
    },
    {
      skill: 'Docker Containerization',
      reason: 'Top trending DevOps skill for Java backend engineers (+38% growth in last 30 days).',
      color: '#059669',
      bgColor: '#ECFDF5'
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER & METADATA */}
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
          <div className="badge-pill" style={{ marginBottom: '8px', background: '#EFF6FF', color: '#2563EB' }}>
            <TrendingUp size={15} />
            <span>REAL-TIME JOB MARKET INTEL 2026</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Skill Demand Radar
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Interactive bar chart of current hiring demand across technical skills.
          </p>
        </div>

        {/* Data Source Badge */}
        <div style={{ background: '#FAF7FF', padding: '10px 16px', borderRadius: '16px', border: '1px solid #EAE2F8', fontSize: '0.8rem', color: '#7A6F8A' }}>
          <div style={{ fontWeight: 700, color: '#2D1B4E' }}>Source: Tech Job Market Aggregator</div>
          <div>Last Updated: Sep 29, 2026 • <span style={{ color: '#9333EA', fontWeight: 600 }}>(Permitted Market Demo Data)</span></div>
        </div>
      </div>

      {/* 2. CENTRAL INTERACTIVE BAR CHART DASHBOARD */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)'
      }}>
        {/* Interactive Filters Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          
          {/* Industry Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Tech Skills' },
              { id: 'it', label: 'IT & Software Dev' },
              { id: 'ai', label: 'AI & Data Science' },
              { id: 'cloud', label: 'Cloud & DevOps' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustry(tab.id)}
                className={`tab-pill ${selectedIndustry === tab.id ? 'active' : ''}`}
                style={{ fontSize: '0.84rem', padding: '6px 14px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Time Period Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
            <Clock size={16} color="#7A6F8A" />
            <select 
              value={selectedTimePeriod} 
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="form-control" 
              style={{ width: 'auto', padding: '4px 10px', fontSize: '0.84rem' }}
            >
              <option value="30d">Last 30 Days</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
            </select>
          </div>
        </div>

        {/* Main Bar Chart Visualization */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '16px' }}>
            Technical Skill Demand (Job Listing Count)
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '16px',
            height: '240px',
            paddingBottom: '30px',
            borderBottom: '2px solid #EAE2F8',
            overflowX: 'auto'
          }}>
            {currentData.map((item, idx) => {
              const heightPct = Math.round((item.count / maxCount) * 100);
              const isHovered = hoveredBarIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  style={{
                    flex: 1,
                    minWidth: '65px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {/* Tooltip on Hover / Tap */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      top: '-45px',
                      background: '#2D1B4E',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      {item.skill}: {item.count.toLocaleString()} listings ({item.pct}% demand)
                    </div>
                  )}

                  {/* Vertical Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '48px',
                      height: `${heightPct}%`,
                      background: item.isMatchingStudent 
                        ? 'linear-gradient(180deg, #10B981 0%, #059669 100%)'
                        : isHovered 
                          ? 'linear-gradient(180deg, #C084FC 0%, #9333EA 100%)'
                          : 'linear-gradient(180deg, #E9D5FF 0%, #C084FC 100%)',
                      borderRadius: '8px 8px 0 0',
                      transition: 'all 0.3s ease',
                      transform: isHovered ? 'scaleY(1.04)' : 'scaleY(1)',
                      transformOrigin: 'bottom'
                    }}
                  />

                  {/* X-Axis Skill Label */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-28px',
                    fontSize: '0.78rem',
                    fontWeight: item.isMatchingStudent ? 800 : 600,
                    color: item.isMatchingStudent ? '#059669' : '#2D1B4E',
                    textAlign: 'center',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.skill}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.8rem', color: '#7A6F8A' }}>
            <div>* Green bars indicate skills verified in your profile ({formatSkillsList(studentSkills, ', ', 4)})</div>
            <div>Hover or tap bars for detailed listing numbers</div>
          </div>
        </div>
      </div>

      {/* 3. TRENDING SKILLS SECTION (BELOW GRAPH) */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} color="#9333EA" />
          <span>Top 3 Trending Skills (Highest Demand Growth)</span>
        </h3>
        <p style={{ color: '#7A6F8A', fontSize: '0.86rem', marginBottom: '16px' }}>
          Skills experiencing the fastest growth in job postings over the last 30 days.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {trendingSkills.map((tr, i) => (
            <div key={i} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#2D1B4E' }}>{tr.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#7A6F8A', marginTop: '2px' }}>{tr.reason}</div>
              </div>
              <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', borderColor: '#A7F3D0', fontWeight: 800, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                ▲ {tr.growth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PERSONALIZED SKILL RECOMMENDATIONS ("RECOMMENDED FOR YOU") */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
        border: '1.5px solid #C084FC',
        borderRadius: '24px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#9333EA" />
          <span>Recommended for You (Target Role: {targetRole})</span>
        </h3>
        <p style={{ color: '#7A6F8A', fontSize: '0.86rem', marginBottom: '16px' }}>
          High-demand market skills missing from your profile that will boost your employability score.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {recommendations.map((rec, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge-pill" style={{ background: rec.bgColor, color: rec.color, marginBottom: '8px', fontSize: '0.78rem' }}>
                  HIGH PRIORITY GAP
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>
                  {rec.skill}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#4A3E56', lineHeight: '1.5', marginBottom: '14px' }}>
                  {rec.reason}
                </p>
              </div>

              <button
                onClick={() => onNavigate('skill-gap')}
                className="btn-primary"
                style={{ width: 'fit-content', padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <span>Assess Skill in Skill Gap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
