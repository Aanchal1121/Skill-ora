import React from 'react';
import { 
  BarChart2, 
  Compass, 
  ShieldAlert, 
  Award, 
  TrendingUp, 
  Target, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  BookOpen,
  Layers,
  FileText,
  Send
} from 'lucide-react';

export default function HeroLanding({ 
  onSelectSubFeature, 
  studentProfile,
  onNavigateProgress,
  searchQuery
}) {

  // Exact 6 Main Feature Cards specified for Home Page
  const homeCards = [
    {
      id: 'growth-map',
      title: 'Growth Map & Weekly Reports',
      description: 'Track daily career progress, skills practiced, completed tasks, and weekly milestones with visual interactive charts.',
      metric: '65% Weekly Progress Achieved',
      icon: BarChart2,
      bg: '#F0EAFA',
      color: '#9333EA',
      action: 'View Progress'
    },
    {
      id: 'mentor-guidance',
      title: 'Mentor Guidance',
      description: 'AI Career Mentor providing supportive, non-judgmental guidance on career paths, anxiety support, and next steps.',
      metric: '3 Personal AI Nudges Ready',
      icon: Compass,
      bg: '#FFF0F7',
      color: '#DB2777',
      action: 'Get Guidance'
    },
    {
      id: 'red-flag-detector',
      title: 'AI Red Flag Detector',
      description: 'Analyze job & internship descriptions to identify suspicious registration fees, unpaid work, or vague listings.',
      metric: 'Safe & Verified Scanner',
      icon: ShieldAlert,
      bg: '#FEF2F2',
      color: '#DC2626',
      action: 'Scan Opportunity'
    },
    {
      id: 'employability-score',
      title: 'Employability Score',
      description: 'Role-specific employability rating (72/100) with detailed component breakdown across technical skills, projects & experience.',
      metric: '72 / 100 — Placement Ready',
      icon: Award,
      bg: '#F0EAFA',
      color: '#9333EA',
      action: 'View Score Breakdown'
    },
    {
      id: 'peer-benchmarking',
      title: 'Peer Benchmarking',
      description: 'Privacy-protected anonymized comparison with peers from Computer Science Engineering (3rd Year).',
      metric: 'Top 24th Percentile in Batch',
      icon: TrendingUp,
      bg: '#EFF6FF',
      color: '#2563EB',
      action: 'Compare Standing'
    },
    {
      id: 'skill-demand',
      title: 'Skill Demand Radar',
      description: 'Live industry skill demands for Java Backend Developer vs your verified skill profile.',
      metric: 'Need: Spring Boot & REST APIs',
      icon: Target,
      bg: '#ECFDF5',
      color: '#059669',
      action: 'Explore Demand Radar'
    }
  ];

  // Filter cards if search query present
  const filteredCards = searchQuery 
    ? homeCards.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : homeCards;

  const journeySteps = [
    { num: 1, label: 'Create Profile', desc: 'Set up your student academic profile', icon: UserCheck },
    { num: 2, label: 'Choose Goal', desc: 'Identify your target career role', icon: Target },
    { num: 3, label: 'Analyze Skills', desc: 'Identify skill gaps & readiness score', icon: BarChart2 },
    { num: 4, label: 'Explore Jobs', desc: 'Discover verified jobs & schemes', icon: Send },
    { num: 5, label: 'Improve', desc: 'Build projects & practice interviews', icon: Layers },
    { num: 6, label: 'Track Progress', desc: 'Monitor weekly growth & benchmarks', icon: TrendingUp }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }} className="fade-in">
      
      {/* HERO SECTION MATCHING PROMPT INSTRUCTIONS */}
      <section style={{
        background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 50%, #FFFFFF 100%)',
        border: '1px solid #EAE2F8',
        borderRadius: '28px',
        padding: '36px',
        marginBottom: '40px',
        position: 'relative',
        boxShadow: '0 8px 30px rgba(185, 160, 232, 0.12)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'center'
        }}>
          {/* Left Hero Content */}
          <div>
            <div className="badge-pill" style={{ marginBottom: '14px', background: '#F6DCEC', borderColor: '#B9A0E8' }}>
              <Sparkles size={15} color="#9333EA" />
              <span>Personalized Student Employability Platform</span>
            </div>

            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              color: '#2D1B4E',
              lineHeight: '1.2',
              marginBottom: '14px'
            }}>
              Your Career Journey Starts Here
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#4A3E56',
              marginBottom: '26px',
              lineHeight: '1.65'
            }}>
              Skillora helps students understand their strengths, identify skill gaps, explore career opportunities, and prepare for their professional future through personalized guidance and career-readiness insights.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <button 
                onClick={() => onSelectSubFeature('academic-guidance')}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '1rem' }}
              >
                <span>Start My Journey</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => {
                  document.getElementById('home-feature-cards')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '12px 22px', fontSize: '0.95rem' }}
              >
                <span>Explore 6 Core Features</span>
              </button>
            </div>

            {/* Feature Badges */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 600, color: '#3A2D5C' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#9333EA" />
                <span>Personalized Guidance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#9333EA" />
                <span>Skill Gap & Growth Tracking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#9333EA" />
                <span>Privacy Protected Benchmarking</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(147, 51, 234, 0.15)',
              border: '2px solid #FFFFFF'
            }}>
              <img 
                src="/student_hero.jpg" 
                alt="Student Career Guidance" 
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '340px', objectFit: 'cover' }}
              />

              {/* Floating Employability Score Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #EAE2F8',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>
                  Employability Readiness
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9333EA', lineHeight: '1.1' }}>
                  72 <span style={{ fontSize: '0.9rem', color: '#7A6F8A' }}>/ 100</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span>Placement Ready ↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 MAIN HOME FEATURE CARDS SECTION */}
      <section id="home-feature-cards" style={{ marginBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
            Core Career Guidance Modules
          </h2>
          <p style={{ color: '#7A6F8A', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Personalized insights, growth graphs, risk verification, and peer standing for your target role.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredCards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div 
                key={card.id}
                onClick={() => onSelectSubFeature(card.id)}
                className="feature-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="icon-box" style={{ background: card.bg, color: card.color }}>
                    <CardIcon size={24} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: card.bg,
                    color: card.color,
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {card.metric}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#4A3E56', lineHeight: '1.5', flexGrow: 1, marginBottom: '16px' }}>
                  {card.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: card.color
                }}>
                  <span>{card.action}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW SKILLORA WORKS: STEP BY STEP JOURNEY */}
      <section style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px',
        border: '1px solid #EAE2F8',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            How Skillora Works, <span className="text-gradient">Step by Step</span>
          </h2>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            A transparent 6-stage journey designed for student career success.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          {journeySteps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.num} className="step-node">
                <div className="step-icon-circle">
                  <StepIcon size={20} />
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#9333EA',
                  textTransform: 'uppercase',
                  marginBottom: '2px'
                }}>
                  Step {step.num}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>
                  {step.label}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#7A6F8A', lineHeight: '1.3' }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
