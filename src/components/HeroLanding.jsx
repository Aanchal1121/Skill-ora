import React from 'react';
import { 
  Target, 
  FileText, 
  GraduationCap, 
  Mic, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  BarChart2, 
  Languages, 
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Briefcase
} from 'lucide-react';
import { translations } from '../data/translations';

export default function HeroLanding({ onSelectFeature, language = "English" }) {
  const t = translations[language] || translations.English;

  const features = [
    {
      id: 'skill-gap',
      title: t.featSkillGap,
      subtitle: t.featSkillGapSub,
      icon: Target,
      bg: '#EEF2FF',
      color: '#4F46E5'
    },
    {
      id: 'resume-tools',
      title: t.featResumeJd,
      subtitle: t.featResumeJdSub,
      icon: FileText,
      bg: '#F0FDF4',
      color: '#16A34A'
    },
    {
      id: 'learning',
      title: t.featFreeResources,
      subtitle: t.featFreeResourcesSub,
      icon: GraduationCap,
      bg: '#EFF6FF',
      color: '#2563EB'
    },
    {
      id: 'mock-interview',
      title: t.featMockInterview,
      subtitle: t.featMockInterviewSub,
      icon: Mic,
      bg: '#FAF5FF',
      color: '#9333EA'
    },
    {
      id: 'elevator-pitch',
      title: t.featElevatorPitch,
      subtitle: t.featElevatorPitchSub,
      icon: UserCheck,
      bg: '#FFF7ED',
      color: '#EA580C'
    },
    {
      id: 'career-chat',
      title: t.featCareerChat,
      subtitle: t.featCareerChatSub,
      icon: MessageSquare,
      bg: '#ECFDF5',
      color: '#059669'
    },
    {
      id: 'weekly-nudge',
      title: t.featWeeklyNudge,
      subtitle: t.featWeeklyNudgeSub,
      icon: Calendar,
      bg: '#FEF2F2',
      color: '#DC2626'
    },
    {
      id: 'peer-benchmark',
      title: t.featPeerBenchmark,
      subtitle: t.featPeerBenchmarkSub,
      icon: BarChart2,
      bg: '#F5F3FF',
      color: '#7C3AED'
    },
    {
      id: 'local-lang',
      title: t.featLocalLang,
      subtitle: t.featLocalLangSub,
      icon: Languages,
      bg: '#FDF2F8',
      color: '#DB2777'
    },
    {
      id: 'practice-app',
      title: t.featPracticeApp,
      subtitle: t.featPracticeAppSub,
      icon: Send,
      bg: '#F0F9FF',
      color: '#0284C7'
    }
  ];

  const steps = [
    { num: 1, label: 'Assess', desc: 'Know your current skills and profile', icon: UserCheck },
    { num: 2, label: 'Identify', desc: 'Find your skill gaps and career path', icon: Target },
    { num: 3, label: 'Learn', desc: 'Get free, curated resources', icon: BookOpen },
    { num: 4, label: 'Build', desc: 'Create projects and gain experience', icon: Layers },
    { num: 5, label: 'Improve Resume', desc: 'Match with JDs and get better', icon: FileText },
    { num: 6, label: 'Practice', desc: 'Take mock interviews and refine your answers', icon: Mic },
    { num: 7, label: 'Apply', desc: 'Use our practice application mode', icon: Send },
    { num: 8, label: 'Measure', desc: 'Track your progress with an employability score', icon: BarChart2 }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }} className="fade-in">
      
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #F5F3FF 100%)',
        borderRadius: '28px',
        padding: '50px 40px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #C7D2FE',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            {/* Badge */}
            <div className="badge-pill" style={{ marginBottom: '20px' }}>
              <Sparkles size={16} />
              <span>{t.heroBadge}</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              lineHeight: '1.2',
              color: '#0F172A',
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}>
              From Skills to Opportunities <br />
              <span className="text-gradient">— We Help You Get There</span>
            </h1>

            {/* Subhead */}
            <p style={{
              fontSize: '1.1rem',
              color: '#475569',
              marginBottom: '32px',
              maxWidth: '560px',
              lineHeight: '1.6'
            }}>
              {t.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button 
                onClick={() => onSelectFeature('dashboard')} 
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <span>{t.startJourney}</span>
              </button>
              <button 
                onClick={() => {
                  document.getElementById('features-grid')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <span>{t.exploreFeatures}</span>
              </button>
            </div>

            {/* 3 Sub-bullets */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#4F46E5" />
                <span>{t.pillResources}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#4F46E5" />
                <span>{t.pillGuidance}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={18} color="#4F46E5" />
                <span>{t.pillFocused}</span>
              </div>
            </div>
          </div>

          {/* Right Vector Journey Graphic Illustration */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 20px 40px rgba(79, 70, 229, 0.12)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid #E2E8F0'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase' }}>
                  CAREER ROADMAP VECTOR SIMULATOR
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                  Simulated 3-Year Trajectory
                </h3>
              </div>
              <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', borderColor: '#A7F3D0' }}>
                +₹4.2 LPA Lift
              </span>
            </div>

            {/* Vector Path Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: '#4F46E5',
                color: '#FFFFFF',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Briefcase size={18} />
                  <span>Get Hired — Tier-1 Tech / Product Startup</span>
                </div>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '8px' }}>
                  Goal
                </span>
              </div>

              <div style={{
                background: '#EEF2FF',
                color: '#4F46E5',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                border: '1px solid #C7D2FE'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mic size={18} />
                  <span>Practice AI Mock Interviews</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#4F46E5' }}>92% Readiness</span>
              </div>

              <div style={{
                background: '#F8FAFC',
                color: '#334155',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} />
                  <span>Build Resume & Match JDs</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#16A34A' }}>ATS Score: 88</span>
              </div>

              <div style={{
                background: '#F8FAFC',
                color: '#334155',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GraduationCap size={18} />
                  <span>Learn & Grow — Free NPTEL / SWAYAM</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#2563EB' }}>2 Certs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 FEATURES GRID SECTION */}
      <section id="features-grid" style={{ marginBottom: '70px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            {t.sectionEverything}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem' }}>
            {t.sectionEverythingSub}
          </p>
        </div>

        {/* 10 Feature Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px'
        }}>
          {features.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={feat.id}
                onClick={() => onSelectFeature(feat.id)}
                className="feature-card"
              >
                <div className="icon-box" style={{ background: feat.bg, color: feat.color }}>
                  <IconComponent size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.5', flexGrow: 1 }}>
                  {feat.subtitle}
                </p>
                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: feat.color
                }}>
                  <span>Explore Feature</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STEP BY STEP JOURNEY SECTION */}
      <section style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid #E2E8F0',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
            {t.sectionJourney}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>
            {t.sectionJourneySub}
          </p>
        </div>

        {/* 8 Horizontal Step Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '16px',
          alignItems: 'stretch'
        }}>
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.num} className="step-node">
                <div className="step-icon-circle">
                  <StepIcon size={20} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#4F46E5',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  Step {step.num}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {step.label}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>
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
