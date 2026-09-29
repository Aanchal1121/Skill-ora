import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  CheckCircle2, 
  Target, 
  Briefcase, 
  Mic, 
  BookOpen,
  BarChart2,
  Lock
} from 'lucide-react';

export default function PeerBenchmarkingPage({ studentProfile, onNavigate }) {
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  // Profile data
  const studentName = studentProfile?.name || 'Alex Student';
  const targetRole = studentProfile?.targetRole || 'Java Backend Developer';
  const course = studentProfile?.degree || 'B.Tech';
  const branch = studentProfile?.branch || 'CSE';
  const currentSem = studentProfile?.semester || 'Semester 6';
  const myScore = 72;
  const peerAverage = 64;
  const myPercentile = 76; // Top 24%

  // Comparison group specification
  const comparisonGroup = {
    course: `${course} (${branch})`,
    yearSem: `Year 3, ${currentSem}`,
    role: targetRole,
    sampleSize: 48,
    minRequired: 10
  };

  // Skill domain comparisons (My score vs Peer Average)
  const skillDomains = [
    {
      name: 'Technical & Role-Specific Skills',
      myScore: 78,
      peerAvg: 65,
      diff: +13,
      status: 'ahead',
      icon: Target,
      color: '#9333EA'
    },
    {
      name: 'Projects & Practical Experience',
      myScore: 70,
      peerAvg: 60,
      diff: +10,
      status: 'ahead',
      icon: Briefcase,
      color: '#059669'
    },
    {
      name: 'Communication & Soft Skills',
      myScore: 75,
      peerAvg: 70,
      diff: +5,
      status: 'ahead',
      icon: Users,
      color: '#2563EB'
    },
    {
      name: 'Interview Readiness',
      myScore: 65,
      peerAvg: 68,
      diff: -3,
      status: 'improve',
      icon: Mic,
      color: '#D97706'
    }
  ];

  const aheadDomains = skillDomains.filter(d => d.diff > 0);
  const improveDomains = skillDomains.filter(d => d.diff <= 0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. HEADER SECTION */}
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
            <Users size={15} />
            <span>ANONYMIZED PEER STANDING ENGINE</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Peer Benchmarking
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Compare your career readiness against anonymized peers pursuing <strong style={{ color: '#9333EA' }}>{targetRole}</strong>.
          </p>
        </div>

        {/* Small Privacy Guarantee Tag */}
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          borderRadius: '16px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={20} color="#059669" />
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
            <div>100% Anonymized Data</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#047857' }}>No public rankings or names</div>
          </div>
        </div>
      </div>

      {/* 2. CORE DASHBOARD: MY SCORE VS PEER AVERAGE & PERCENTILE */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'center'
      }}>
        {/* Score Comparison Visual Cards */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '130px',
            background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#B9A0E8', fontWeight: 700, textTransform: 'uppercase' }}>MY SCORE</div>
            <div style={{ fontSize: '3.0rem', fontWeight: 800, color: '#F6DCEC', margin: '4px 0', lineHeight: 1 }}>{myScore}</div>
            <div style={{ fontSize: '0.78rem', color: '#EAE2F8' }}>Out of 100</div>
          </div>

          <div style={{
            flex: 1,
            minWidth: '130px',
            background: '#FAF7FF',
            border: '2px solid #EAE2F8',
            borderRadius: '20px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>PEER AVERAGE</div>
            <div style={{ fontSize: '3.0rem', fontWeight: 800, color: '#9333EA', margin: '4px 0', lineHeight: 1 }}>{peerAverage}</div>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>+8 pts above avg</div>
          </div>
        </div>

        {/* Percentile Banner & Group Context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9333EA', textTransform: 'uppercase' }}>YOUR RELATIVE STANDING</span>
              <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.82rem', fontWeight: 800, padding: '2px 10px', borderRadius: '10px' }}>
                Top 24% of Peers
              </span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2D1B4E' }}>{myPercentile}th Percentile</div>
            <p style={{ fontSize: '0.84rem', color: '#7A6F8A', marginTop: '2px' }}>
              Your score is higher than 76% of comparable students in your comparison group.
            </p>
          </div>

          <div style={{ background: '#FFF0F7', padding: '12px 16px', borderRadius: '14px', border: '1px solid #FBCFE8', fontSize: '0.84rem', color: '#2D1B4E' }}>
            <strong>Comparison Group:</strong> {comparisonGroup.course} • {comparisonGroup.yearSem} • Target: <strong>{comparisonGroup.role}</strong> ({comparisonGroup.sampleSize} peers)
          </div>
        </div>
      </div>

      {/* 3. SKILL COMPARISON BREAKDOWN */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '24px', padding: '28px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.06)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
          Skill Domain Comparison
        </h3>
        <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '20px' }}>
          Comparing your verified category scores against the peer group average.
        </p>

        {/* 4 Skill Category Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {skillDomains.map((domain, idx) => {
            const IconComponent = domain.icon;

            return (
              <div key={idx} style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '18px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: `${domain.color}15`, color: domain.color, padding: '8px', borderRadius: '10px' }}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#2D1B4E' }}>{domain.name}</div>
                      <div style={{ fontSize: '0.78rem', color: domain.status === 'ahead' ? '#059669' : '#D97706', fontWeight: 700 }}>
                        {domain.status === 'ahead' ? `✓ ${domain.diff}% Ahead of Peer Average` : `⚡ ${Math.abs(domain.diff)}% Below Peer Average`}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.88rem' }}>
                    <div>My Score: <strong style={{ color: '#2D1B4E' }}>{domain.myScore}%</strong></div>
                    <div>Peer Avg: <strong style={{ color: '#9333EA' }}>{domain.peerAvg}%</strong></div>
                  </div>
                </div>

                {/* Comparative Double Progress Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {/* My Score Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#7A6F8A', width: '60px', fontWeight: 700 }}>You</span>
                    <div style={{ flex: 1, height: '8px', background: '#EAE2F8', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${domain.myScore}%`, height: '100%', background: domain.color, borderRadius: '4px' }} />
                    </div>
                  </div>
                  {/* Peer Average Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#7A6F8A', width: '60px', fontWeight: 700 }}>Peer Avg</span>
                    <div style={{ flex: 1, height: '6px', background: '#EAE2F8', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${domain.peerAvg}%`, height: '100%', background: '#C084FC', opacity: 0.7, borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Summary Cards (Top 2 Ahead vs Opportunities) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '16px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>⭐ WHERE YOU ARE AHEAD (TOP 2)</span>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {aheadDomains.slice(0, 2).map((d, i) => (
                <div key={i} style={{ fontSize: '0.88rem', fontWeight: 700, color: '#047857' }}>
                  • {d.name} (+{d.diff}% over peers)
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '16px', padding: '16px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>🎯 IMPROVEMENT OPPORTUNITY</span>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {improveDomains.length > 0 ? improveDomains.map((d, i) => (
                <div key={i} style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B45309' }}>
                  • {d.name} ({Math.abs(d.diff)}% below peers)
                </div>
              )) : (
                <div style={{ fontSize: '0.88rem', color: '#059669', fontWeight: 700 }}>
                  Great job! You are ahead of the peer average in all 4 categories.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. PERSONALIZED AI INSIGHTS & RECOMMENDED ACTIONS */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
        border: '1.5px solid #C084FC',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div className="icon-box" style={{ background: '#9333EA', color: '#FFFFFF', width: '36px', height: '36px', margin: 0 }}>
            <Sparkles size={18} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2D1B4E' }}>
            Personalized Peer Insights & Action Steps
          </h3>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#4A3E56', lineHeight: '1.6', marginBottom: '18px' }}>
          You are outperforming the peer average in <strong>Technical Core Skills (+13%)</strong> and <strong>Project Experience (+10%)</strong>. Peers targeting Java Backend Developer roles are currently averaging higher scores in timed <strong>Interview Coding Practice</strong>.
        </p>

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px' }}>
          Recommended Next Steps:
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '14px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2D1B4E' }}>1. Practice Timed Coding</div>
              <div style={{ fontSize: '0.76rem', color: '#9333EA' }}>Catch up on peer interview readiness</div>
            </div>
            <button onClick={() => onNavigate('mock-interviews')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Practice
            </button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', padding: '14px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2D1B4E' }}>2. Maintain Skill Gap Lead</div>
              <div style={{ fontSize: '0.76rem', color: '#059669' }}>Complete Spring Boot assessment</div>
            </div>
            <button onClick={() => onNavigate('skill-gap')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Skill Gap
            </button>
          </div>
        </div>
      </div>

      {/* 5. EXPANDABLE PRIVACY & FAIR COMPARISON EXPLANATION */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '20px' }}>
        <button
          onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
          style={{
            background: 'transparent',
            border: 'none',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E' }}>
            <Lock size={16} color="#9333EA" />
            <span>How Peer Benchmarking Works & Privacy Guarantee</span>
          </div>
          {showPrivacyDetails ? <ChevronUp size={18} color="#7A6F8A" /> : <ChevronDown size={18} color="#7A6F8A" />}
        </button>

        {showPrivacyDetails && (
          <div style={{ marginTop: '14px', fontSize: '0.86rem', color: '#4A3E56', lineHeight: '1.6' }} className="fade-in">
            <p style={{ marginBottom: '8px' }}>
              <strong>Fair Comparison Criteria:</strong> Your performance is compared exclusively with anonymized students pursuing the same degree (<em>{comparisonGroup.course}</em>), academic batch (<em>{comparisonGroup.yearSem}</em>), and target role (<em>{comparisonGroup.role}</em>).
            </p>
            <ul style={{ paddingLeft: '20px', color: '#7A6F8A' }}>
              <li>No names, photos, email addresses, or personal records are ever displayed or shared.</li>
              <li>Peer averages are calculated only when a minimum threshold of 10 comparable students is reached (Current sample: {comparisonGroup.sampleSize} students).</li>
              <li>Peer averages serve as constructive reference points, not rigid standards or public rankings.</li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
