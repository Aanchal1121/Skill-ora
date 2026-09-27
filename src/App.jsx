import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroLanding from './components/HeroLanding';
import Dashboard from './components/Dashboard';
import SkillGap from './components/SkillGap';
import ResumeTools from './components/ResumeTools';
import MockInterview from './components/MockInterview';
import GovtSchemes from './components/GovtSchemes';
import LearningHub from './components/LearningHub';
import CareerChatbot from './components/CareerChatbot';
import TpoDashboard from './components/TpoDashboard';
import TranslatorModal from './components/TranslatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('English');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);

  // Student Profile state synced with backend API
  const [studentProfile, setStudentProfile] = useState({
    id: "STU-8921",
    name: "Aarav Sharma",
    college: "Institute of Technology, Jaipur",
    tier: "Tier 2 College",
    branch: "Computer Science & Engineering",
    year: "3rd Year (Semester 6)",
    cgpa: 7.8,
    backlogHistory: 0,
    targetRole: "Full Stack Developer",
    skills: ["HTML/CSS", "JavaScript", "React", "Python", "SQL", "Git"],
    employabilityScore: 745,
    weeklyLogs: [
      { week: "W1", score: 620 },
      { week: "W2", score: 650 },
      { week: "W3", score: 680 },
      { week: "W4", score: 710 },
      { week: "W5", score: 730 },
      { week: "W6", score: 745 }
    ],
    peerPercentiles: { dsaPercentile: 68, projectPercentile: 82, communicationPercentile: 74, overallPercentile: 76 }
  });

  // Fetch student profile on load
  useEffect(() => {
    fetch('/api/student/profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setStudentProfile(data);
        }
      })
      .catch(err => console.error("Error connecting to backend API:", err));
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const res = await fetch('/api/student/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.profile) {
        setStudentProfile(data.profile);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleSelectFeature = (featId) => {
    if (featId === 'local-lang') {
      setIsTranslatorOpen(true);
    } else if (featId === 'elevator-pitch') {
      setActiveTab('mock-interview');
    } else if (featId === 'weekly-nudge' || featId === 'peer-benchmark' || featId === 'practice-app') {
      setActiveTab('dashboard');
    } else {
      setActiveTab(featId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'local-lang') setIsTranslatorOpen(true);
          else setActiveTab(tab);
        }}
        language={language}
        setLanguage={setLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        studentProfile={studentProfile}
      />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <HeroLanding 
            onSelectFeature={handleSelectFeature}
            language={language}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            studentProfile={studentProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'skill-gap' && (
          <SkillGap 
            studentProfile={studentProfile}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'resume-tools' && (
          <ResumeTools 
            studentProfile={studentProfile}
          />
        )}

        {activeTab === 'mock-interview' && (
          <MockInterview 
            studentProfile={studentProfile}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === 'govt-schemes' && (
          <GovtSchemes 
            studentProfile={studentProfile}
          />
        )}

        {activeTab === 'learning' && (
          <LearningHub />
        )}

        {activeTab === 'career-chat' && (
          <CareerChatbot 
            language={language}
          />
        )}

        {activeTab === 'tpo' && (
          <TpoDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onGetStarted={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        language={language}
      />

      {/* Regional Language Translator Modal */}
      <TranslatorModal 
        isOpen={isTranslatorOpen}
        onClose={() => setIsTranslatorOpen(false)}
      />

    </div>
  );
}
