import React from 'react';
import {
  Sparkles,
  Compass,
  BarChart2,
  FileText,
  Mic,
  Layers,
  Briefcase,
  UserCheck,
  Globe,
  ArrowRight,
  Zap,
  CheckCircle2,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';
import { t } from '../utils/i18n';

export default function WhyUsPage({ onStartJourney, onNavigate, language = 'English', studentProfile }) {
  const keyBenefits = [
    {
      id: 'guidance',
      title: t('why_benefit_guidance_title', language) || 'Personalized Career Guidance',
      description: t('why_benefit_guidance_desc', language) || 'Get customized career roadmaps tailored to your academic background, current skills, and target job roles.',
      icon: Compass,
      color: '#9333EA',
      bgColor: '#FAF7FF'
    },
    {
      id: 'skillgap',
      title: t('why_benefit_skillgap_title', language) || 'Skill Gap Analysis',
      description: t('why_benefit_skillgap_desc', language) || 'Identify missing technical and soft skills with weighted scoring and actionable learning recommendations.',
      icon: BarChart2,
      color: '#2563EB',
      bgColor: '#EFF6FF'
    },
    {
      id: 'resume',
      title: t('why_benefit_resume_title', language) || 'Resume Assist',
      description: t('why_benefit_resume_desc', language) || 'Analyze, score, and polish your resume against real job descriptions to maximize ATS compatibility.',
      icon: FileText,
      color: '#059669',
      bgColor: '#ECFDF5'
    },
    {
      id: 'mock',
      title: t('why_benefit_mock_title', language) || 'AI Mock Interviews',
      description: t('why_benefit_mock_desc', language) || 'Practise technical, HR, and situational interviews with real-time AI camera, voice, and instant feedback.',
      icon: Mic,
      color: '#D97706',
      bgColor: '#FFFBEB'
    },
    {
      id: 'project',
      title: t('why_benefit_project_title', language) || 'Project Lab',
      description: t('why_benefit_project_desc', language) || 'Explore real-world project ideas and step-by-step guides to build practical portfolio experience.',
      icon: Layers,
      color: '#9333EA',
      bgColor: '#FAF7FF'
    },
    {
      id: 'jobs',
      title: t('why_benefit_jobs_title', language) || 'Internship & Job Opportunities',
      description: t('why_benefit_jobs_desc', language) || 'Discover verified career openings matching your profile, check for red flags, and track application status.',
      icon: Briefcase,
      color: '#2563EB',
      bgColor: '#EFF6FF'
    },
    {
      id: 'mentor',
      title: t('why_benefit_mentor_title', language) || 'Mentor Guidance',
      description: t('why_benefit_mentor_desc', language) || 'Receive expert support and guidance from experienced mentors to make informed career decisions.',
      icon: UserCheck,
      color: '#DB2777',
      bgColor: '#FFF0F7'
    },
    {
      id: 'multilingual',
      title: t('why_benefit_multilingual_title', language) || 'Multilingual Support',
      description: t('why_benefit_multilingual_desc', language) || 'Access career guidance, interview practice, and learning resources in your preferred platform language.',
      icon: Globe,
      color: '#9333EA',
      bgColor: '#FAF7FF'
    }
  ];

  const visualSteps = [
    { step: '1', title: 'Create Student Profile', desc: 'Add academic details, current skills & marks' },
    { step: '2', title: 'Identify Career Goals', desc: 'Select target job role, domain & preferences' },
    { step: '3', title: 'Analyze Skill Gaps', desc: 'Discover missing skills & benchmark score' },
    { step: '4', title: 'Learn, Practise & Build', desc: 'Build Project Lab apps & complete modules' },
    { step: '5', title: 'Prepare Resume & Interview', desc: 'Optimize ATS resume & pass AI mock tests' },
    { step: '6', title: 'Explore & Track Growth', desc: 'Apply to opportunities & monitor progress' }
  ];

  const differentiators = [
    { icon: '🎯', label: 'Personalized Guidance', detail: 'Roadmaps tailored specifically to your academic background, degree, and target goals.' },
    { icon: '🛠️', label: 'Integrated Career Tools', detail: 'Single unified ecosystem connecting skill gap analytics, resume, projects, and interviews.' },
    { icon: '💡', label: 'Practical Learning', detail: 'Hands-on project building and actionable skill practice instead of passive watching.' },
    { icon: '📈', label: 'Progress Tracking', detail: 'Real-time employability scoring and clear growth trajectory metrics over time.' },
    { icon: '🌐', label: 'Accessible Multilingual Support', detail: 'Learn, practise, and navigate SkillAura in your preferred platform language.' }
  ];

  const handleStartJourneyClick = () => {
    if (onStartJourney) {
      onStartJourney();
    } else if (onNavigate) {
      onNavigate('profile-analysis');
    }
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. WHY SKILLAURA HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)',
        borderRadius: '24px',
        padding: '36px 28px',
        color: '#FFFFFF',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(45, 27, 78, 0.15)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.15)',
          color: '#F6DCEC',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          marginBottom: '14px'
        }}>
          <Sparkles size={16} color="#C084FC" />
          <span>WHY SKILLAURA?</span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px', lineHeight: '1.2' }}>
          Empowering Students Throughout Their Complete Career Journey
        </h1>

        <p style={{ color: '#EAE2F8', fontSize: '1.0rem', lineHeight: '1.6', maxWidth: '760px', margin: '0 auto 24px auto' }}>
          SkillAura is a comprehensive career guidance platform that supports college students from identifying baseline skills to building portfolio projects, polishing resumes, practicing interviews, and launching successful careers.
        </p>

        {/* ONE PLATFORM CALLOUT */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '18px',
          padding: '18px 24px',
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          textAlign: 'left'
        }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#9333EA', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 2px 0' }}>
              One Platform, Complete Career Journey
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#EAE2F8', margin: 0, lineHeight: '1.4' }}>
              No more switching between multiple disconnected websites. SkillAura brings career roadmaps, skill gap analytics, project labs, resume building, AI mock interviews, job opportunities, and mentor support together into one seamless place.
            </p>
          </div>
        </div>
      </div>

      {/* 2. KEY BENEFITS SECTION (8 SPECIFIED BENEFITS) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0EAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>Key Platform Benefits</h2>
            <p style={{ color: '#7A6F8A', fontSize: '0.88rem', margin: 0 }}>Integrated tools to prepare you for every stage of your career development.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {keyBenefits.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '20px',
                  border: '1px solid #EAE2F8',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(147, 51, 234, 0.04)';
                }}
              >
                <div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: item.bgColor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#4A3E56', lineHeight: '1.5', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. HOW SKILLAURA WORKS (6-STEP VISUAL JOURNEY) */}
      <div style={{
        background: '#FAF7FF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', marginBottom: '6px' }}>
            STEP-BY-STEP PROCESS
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2D1B4E', margin: '4px 0 6px 0' }}>
            How SkillAura Works – 6-Step Visual Journey
          </h2>
          <p style={{ color: '#7A6F8A', fontSize: '0.9rem', margin: 0 }}>
            A structured path from profile creation to tracking growth and securing job offers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {visualSteps.map((st, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '20px',
                border: '1.5px solid #EAE2F8',
                boxShadow: '0 4px 14px rgba(147, 51, 234, 0.04)',
                position: 'relative'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}>
                {st.step}
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>
                {st.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#7A6F8A', margin: 0, lineHeight: '1.4' }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WHAT MAKES SKILLAURA DIFFERENT? */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
        border: '1px solid #EAE2F8',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <Award size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>What Makes SkillAura Different?</h2>
            <p style={{ color: '#7A6F8A', fontSize: '0.88rem', margin: 0 }}>Designed around actual student career needs with actionable, practical tools.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {differentiators.map((diff, idx) => (
            <div
              key={idx}
              style={{
                background: '#FAF7FF',
                padding: '18px',
                borderRadius: '16px',
                border: '1px solid #EAE2F8'
              }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{diff.icon}</div>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '4px' }}>
                {diff.label}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#4A3E56', margin: 0, lineHeight: '1.4' }}>
                {diff.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PROMINENT CALL TO ACTION */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
        borderRadius: '24px',
        padding: '36px',
        border: '1.5px solid #C084FC',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(147, 51, 234, 0.1)'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>
          Ready to Take the Next Step in Your Career?
        </h2>
        <p style={{ color: '#7A6F8A', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 20px auto' }}>
          Explore your student profile, identify skill gaps, build real projects, and prepare for top internship and job opportunities.
        </p>

        <button
          onClick={handleStartJourneyClick}
          className="btn-primary"
          style={{
            padding: '14px 36px',
            fontSize: '1.05rem',
            borderRadius: '18px',
            boxShadow: '0 6px 20px rgba(147, 51, 234, 0.3)'
          }}
        >
          <span>Start My Journey</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
