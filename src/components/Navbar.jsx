import React from 'react';
import { 
  Sparkles, 
  Globe, 
  Mic, 
  Award, 
  User, 
  BarChart3, 
  BookOpen, 
  FileText, 
  Video, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage, 
  voiceEnabled, 
  setVoiceEnabled,
  studentProfile 
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E8F0',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <span style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.5px'
            }}>
              Career<span style={{ color: '#4F46E5' }}>Leap</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          padding: '4px'
        }}>
          <button 
            onClick={() => setActiveTab('home')}
            className={`tab-pill ${activeTab === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`tab-pill ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard & Score
          </button>
          <button 
            onClick={() => setActiveTab('skill-gap')}
            className={`tab-pill ${activeTab === 'skill-gap' ? 'active' : ''}`}
          >
            Skill Gap
          </button>
          <button 
            onClick={() => setActiveTab('resume-tools')}
            className={`tab-pill ${activeTab === 'resume-tools' ? 'active' : ''}`}
          >
            Resume ↔ JD
          </button>
          <button 
            onClick={() => setActiveTab('mock-interview')}
            className={`tab-pill ${activeTab === 'mock-interview' ? 'active' : ''}`}
          >
            AI Interview
          </button>
          <button 
            onClick={() => setActiveTab('govt-schemes')}
            className={`tab-pill ${activeTab === 'govt-schemes' ? 'active' : ''}`}
          >
            Govt Schemes
          </button>
          <button 
            onClick={() => setActiveTab('learning')}
            className={`tab-pill ${activeTab === 'learning' ? 'active' : ''}`}
          >
            Free Courses
          </button>
          <button 
            onClick={() => setActiveTab('tpo')}
            className={`tab-pill ${activeTab === 'tpo' ? 'active' : ''}`}
          >
            TPO College View
          </button>
        </nav>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Employability Score Pill */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            style={{
              background: '#EEF2FF',
              border: '1px solid #C7D2FE',
              borderRadius: '20px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#4F46E5'
            }}
            title="Click to view Employability Score breakdown"
          >
            <Award size={16} />
            <span>Score: {studentProfile?.employabilityScore || 745}/900</span>
          </div>

          {/* Language Switcher */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={16} color="#64748B" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#334155',
                outline: 'none',
                cursor: 'pointer',
                background: '#FFFFFF'
              }}
            >
              <option value="English">🌐 English</option>
              <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
              <option value="Hinglish">🗣️ Hinglish</option>
            </select>
          </div>

          {/* Voice Assistant Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            style={{
              padding: '8px 12px',
              borderRadius: '20px',
              border: voiceEnabled ? '1.5px solid #4F46E5' : '1px solid #CBD5E1',
              background: voiceEnabled ? '#EEF2FF' : '#FFFFFF',
              color: voiceEnabled ? '#4F46E5' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
            title={voiceEnabled ? "Voice Assistant Enabled" : "Click to enable Voice Assistant"}
          >
            <Mic size={15} color={voiceEnabled ? '#4F46E5' : '#64748B'} />
            <span>{voiceEnabled ? "Voice ON" : "Voice"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
