import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroLanding from './components/HeroLanding';
import LeftSidebar from './components/LeftSidebar';
import SubFeatureViewer from './components/SubFeatureViewer';
import CareerChatbot from './components/CareerChatbot';
import TranslatorModal from './components/TranslatorModal';
import NavbarModals from './components/NavbarModals';
import AuthModal from './components/AuthModal';
import FloatingChatbotWidget from './components/FloatingChatbotWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'feature', 'career-chat'
  const [activeSubFeature, setActiveSubFeature] = useState('profile-analysis');
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('skillora_user_language') || 'English';
    } catch (e) {
      return 'English';
    }
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'about', 'why-us', 'contact', 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Suggested Student Profile Data State
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('skillora_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      id: "STU-7821",
      name: "Ananya Roy",
      email: "ananya.roy@college.edu.in",
      phone: "+91 98765 43210",
      college: "Institute of Technology & Engineering",
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      year: "3rd Year",
      semester: "Semester 6",
      gradYear: "2026",
      cgpa: 8.4,
      sgpaHistory: [
        { semester: "Sem 1", sgpa: 8.0 },
        { semester: "Sem 2", sgpa: 8.2 },
        { semester: "Sem 3", sgpa: 8.1 },
        { semester: "Sem 4", sgpa: 8.5 },
        { semester: "Sem 5", sgpa: 8.6 },
        { semester: "Sem 6", sgpa: 8.8 }
      ],
      backlogHistory: 0,
      class10Marks: "94.2%",
      class12Marks: "91.8%",
      targetRole: "Java Backend Developer",
      employabilityScore: 745,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      peerPercentiles: { dsaPercentile: 68, projectPercentile: 82, communicationPercentile: 74, overallPercentile: 76 }
    };
  });

  const handleUpdateProfile = (updatedData) => {
    setStudentProfile(prev => {
      const updated = { ...prev, ...updatedData };
      try {
        localStorage.setItem('skillora_student_profile', JSON.stringify(updated));
      } catch (e) {}

      fetch('http://localhost:5000/api/student/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch(() => {});

      return updated;
    });
  };

  const handleSelectSubFeature = (subId) => {
    if (subId === 'language-translation') {
      setIsTranslatorOpen(true);
      return;
    }
    setActiveSubFeature(subId);
    setActiveTab('feature');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    alert("You have securely logged out from Skillora.");
    setActiveTab('home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-subtle)' }}>
      
      {/* Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            setActiveSubFeature('home');
          }
        }}
        language={language}
        setLanguage={setLanguage}
        studentProfile={studentProfile}
        onOpenModal={(modalName) => setActiveModal(modalName)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectSubFeature={handleSelectSubFeature}
        onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Content Layout with Left Sidebar */}
      <div style={{
        display: 'flex',
        flexGrow: 1,
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Left Sidebar */}
        <div style={{
          display: (isMobileSidebarOpen || window.innerWidth > 900) ? 'block' : 'none'
        }}>
          <LeftSidebar 
            activeSubFeature={activeSubFeature}
            onSelectSubFeature={handleSelectSubFeature}
            onLogout={handleLogout}
            language={language}
          />
        </div>

        {/* Main Content Area */}
        <main style={{ flexGrow: 1, width: '100%', minWidth: 0 }}>
          {activeTab === 'home' && (
            <HeroLanding 
              onSelectSubFeature={handleSelectSubFeature}
              studentProfile={studentProfile}
              onNavigateProgress={() => handleSelectSubFeature('growth-map')}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'feature' && (
            <SubFeatureViewer 
              subFeatureId={activeSubFeature}
              studentProfile={studentProfile}
              onNavigate={(tab) => handleSelectSubFeature(tab)}
              onOpenTranslator={() => setIsTranslatorOpen(true)}
              onUpdateProfile={handleUpdateProfile}
              language={language}
            />
          )}

          {activeTab === 'career-chat' && (
            <CareerChatbot 
              language={language}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer 
        onGetStarted={() => { handleSelectSubFeature('academic-guidance'); }}
        language={language}
      />

      {/* Floating AI Chatbot Widget (Bottom-Right) */}
      <FloatingChatbotWidget language={language} />

      {/* Auth & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegisterSuccess={(registeredData) => {
          handleUpdateProfile(registeredData);
          handleSelectSubFeature('profile-analysis');
        }}
      />

      {/* Language Translator Modal */}
      <TranslatorModal 
        isOpen={isTranslatorOpen}
        onClose={() => setIsTranslatorOpen(false)}
      />

      {/* Navbar Modals (About Us, Why Us, Contact, Profile) */}
      <NavbarModals 
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        studentProfile={studentProfile}
        onUpdateProfile={handleUpdateProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        language={language}
      />

    </div>
  );
}
