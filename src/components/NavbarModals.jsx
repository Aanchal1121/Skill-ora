import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Info,
  HelpCircle,
  PhoneCall,
  User,
  CheckCircle2,
  Target,
  BookOpen,
  Layers,
  FileText,
  Send,
  BarChart2,
  ShieldAlert,
  Award,
  TrendingUp,
  Camera,
  Save,
  Mail,
  Smartphone,
  Compass,
  Briefcase,
  Zap,
  ArrowRight,
  Globe,
  Sliders,
  Check,
  GraduationCap
} from 'lucide-react';
import WhyUsPage from './WhyUsPage';

export default function NavbarModals({
  activeModal,
  onClose,
  studentProfile,
  onUpdateProfile,
  onOpenAuthModal
}) {
  const [profileForm, setProfileForm] = useState({
    name: studentProfile?.name || 'Aanchal Sharma',
    email: studentProfile?.email || 'aanchal.sharma@college.edu.in',
    phone: studentProfile?.phone || studentProfile?.mobile || '+91 98765 43210',
    targetRole: studentProfile?.targetRole || 'Java Backend Developer',
    avatarUrl: studentProfile?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const modalFileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (studentProfile) {
      setProfileForm({
        name: studentProfile.name || 'Aanchal Sharma',
        email: studentProfile.email || 'aanchal.sharma@college.edu.in',
        phone: studentProfile.phone || studentProfile.mobile || '+91 98765 43210',
        targetRole: studentProfile.targetRole || 'Java Backend Developer',
        avatarUrl: studentProfile.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      });
    }
  }, [studentProfile]);

  if (!activeModal) return null;

  // Contact configurations
  const CONTACT_PHONE = "+91 98765 43210";
  const CONTACT_TEL_LINK = "tel:+919876543210";
  const CONTACT_GMAIL = "support.skillaura@gmail.com";
  const CONTACT_MAILTO_LINK = "mailto:support.skillaura@gmail.com";

  const handlePhotoUploadModal = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
      setProfileForm(prev => ({ ...prev, avatarUrl: event.target.result }));
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhotoModal = () => {
    const fallback = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    setPhotoPreview(fallback);
    setProfileForm(prev => ({ ...prev, avatarUrl: fallback }));
  };

  const handleProfileFormSubmitModal = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!profileForm.name || profileForm.name.trim().length < 2) {
      setErrorMessage('Please enter a valid full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneDigits = profileForm.phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      setErrorMessage('Please enter a valid phone number with at least 10 digits.');
      return;
    }

    const emailChanged = profileForm.email.trim().toLowerCase() !== (studentProfile?.email || '').trim().toLowerCase();
    const phoneChanged = profileForm.phone.replace(/[^0-9]/g, '') !== (studentProfile?.phone || studentProfile?.mobile || '').replace(/[^0-9]/g, '');

    if ((emailChanged || phoneChanged) && !requiresVerification) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setRequiresVerification(true);
      alert(`Contact Verification Code dispatched! Demo Code: ${code}`);
      return;
    }

    if (requiresVerification) {
      if (!otpInput.trim() || (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456')) {
        setErrorMessage('Invalid verification code.');
        return;
      }
    }

    const updated = {
      ...studentProfile,
      ...profileForm,
      avatarUrl: photoPreview || profileForm.avatarUrl
    };

    if (onUpdateProfile) onUpdateProfile(updated);
    alert('Student Profile Updated Successfully!');
    setRequiresVerification(false);
    onClose();
  };

  return (
    <div className="cjn-modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        className="cjn-modal-content fade-in"
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '30px',
          maxWidth: activeModal === 'profile' ? '500px' : activeModal === 'contact' ? '560px' : '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          border: '1px solid #EAE2F8',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #EAE2F8',
          paddingBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sparkles size={20} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
              {activeModal === 'about' && 'About SkillAura'}
              {activeModal === 'why-us' && 'Why Choose SkillAura'}
              {activeModal === 'contact' && 'Get in Touch with SkillAura'}
              {activeModal === 'profile' && 'Student Profile Settings'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#FAF7FF',
              border: '1px solid #E9D5FF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#6B7280'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ===================================================================== */}
        {/* 1. ABOUT US MODAL CONTENT */}
        {/* ===================================================================== */}
        {activeModal === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Introduction */}
            <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '16px', border: '1px solid #E9D5FF' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9333EA', background: '#F3E8FF', padding: '4px 10px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AI-POWERED CAREER & EMPLOYABILITY PLATFORM
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1E1B4B', margin: '10px 0 8px 0' }}>
                Bridging the Gap Between College Learning and Industry Success
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                SkillAura is an AI-powered student career guidance and employability platform designed to help college students understand their strengths, identify skill gaps, build real-world projects, practice interviews, and confidently launch their professional careers.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #F3E8FF', boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Target size={20} color="#9333EA" />
                  <h4 style={{ color: '#9333EA', fontWeight: '800', fontSize: '1.05rem', margin: 0 }}>Our Mission</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.5', margin: 0 }}>
                  To make personalized career guidance, skill development, and verified career opportunities accessible to every college student across India.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #F3E8FF', boxShadow: '0 4px 16px rgba(147, 51, 234, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Compass size={20} color="#DB2777" />
                  <h4 style={{ color: '#DB2777', fontWeight: '800', fontSize: '1.05rem', margin: 0 }}>Our Vision</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.5', margin: 0 }}>
                  To empower every student to confidently transition from college academia into the competitive professional world with proven industry skills.
                </p>
              </div>
            </div>

            {/* The Problem We Solve */}
            <div style={{ background: '#FEF2F2', padding: '20px', borderRadius: '16px', border: '1px solid #FECACA' }}>
              <h4 style={{ color: '#DC2626', fontWeight: '800', fontSize: '1rem', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="#DC2626" /> The Problem We Solve
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {[
                  { title: 'Career Confusion', desc: 'Uncertainty about which tech stack or role aligns with interest' },
                  { title: 'Skill Gaps', desc: 'Mismatch between academic syllabus and practical industry needs' },
                  { title: 'Limited Project Exposure', desc: 'Difficulty building production-grade portfolio applications' },
                  { title: 'Placement Interview Anxiety', desc: 'Lack of real-time voice and technical interview practice' }
                ].map((item, i) => (
                  <div key={i} style={{ background: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #FCA5A5' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#991B1B', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Approach (Core Modules) */}
            <div>
              <h4 style={{ color: '#1E1B4B', fontWeight: '800', fontSize: '1.05rem', marginBottom: '12px' }}>
                Our Integrated Approach
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { name: 'Career Guidance', desc: 'Structured role roadmaps', icon: Compass },
                  { name: 'Skill Gap Analysis', desc: 'Personalized readiness score', icon: BarChart2 },
                  { name: 'Resume Assist', desc: 'ATS bullet polishing & review', icon: FileText },
                  { name: 'Project Lab', desc: 'Step-by-step project builder', icon: Sliders },
                  { name: 'AI Mock Interview', desc: 'Camera & voice interview studio', icon: Award },
                  { name: 'Opportunities', desc: 'Jobs & government schemes', icon: Briefcase }
                ].map((m, idx) => {
                  const MIcon = m.icon;
                  return (
                    <div key={idx} style={{ background: '#FAF7FF', padding: '14px', borderRadius: '14px', border: '1px solid #E9D5FF' }}>
                      <MIcon size={18} color="#9333EA" style={{ marginBottom: '6px' }} />
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E1B4B' }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{m.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Our Values */}
            <div>
              <h4 style={{ color: '#1E1B4B', fontWeight: '800', fontSize: '1.05rem', marginBottom: '12px' }}>
                Our Core Values
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['🌐 Accessibility', '🎯 Personalization', '📚 Continuous Learning', '🔍 Transparency', '⚡ Student Empowerment'].map((val, idx) => (
                  <span key={idx} style={{ background: '#F3E8FF', color: '#7E22CE', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' }}>
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 2. WHY US MODAL CONTENT */}
        {/* ===================================================================== */}
        {activeModal === 'why-us' && (
          <WhyUsPage
            studentProfile={studentProfile}
            onStartJourney={() => {
              onClose();
              if (onOpenAuthModal) onOpenAuthModal();
            }}
            language={language}
          />
        )}

        {/* ===================================================================== */}
        {/* 3. CONTACT US MODAL CONTENT */}
        {/* ===================================================================== */}
        {activeModal === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: '1.5', margin: 0 }}>
                Have a question or need assistance? Contact our team directly using the details below.
              </p>
            </div>

            {/* Clickable Contact Detail Cards ONLY (No form/messages/FAQs) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Clickable Phone Number */}
              <a
                href={CONTACT_TEL_LINK}
                style={{
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1.5px solid #E9D5FF',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: '#F3E8FF',
                  color: '#9333EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PhoneCall size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Contact Number
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1E1B4B', marginTop: '2px' }}>
                    {CONTACT_PHONE}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: '600', marginTop: '2px' }}>
                    Click to call via tel: link →
                  </div>
                </div>
              </a>

              {/* Clickable Gmail Address */}
              <a
                href={CONTACT_MAILTO_LINK}
                style={{
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1.5px solid #E9D5FF',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: '#F3E8FF',
                  color: '#9333EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Official Email / Gmail
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1E1B4B', marginTop: '2px' }}>
                    {CONTACT_GMAIL}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: '600', marginTop: '2px' }}>
                    Click to send mail via mailto: link →
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. STUDENT PROFILE MODAL CONTENT */}
        {/* ===================================================================== */}
        {activeModal === 'profile' && (
          <form onSubmit={handleProfileFormSubmitModal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Header Photo & Name */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 10px auto' }}>
                <img
                  src={photoPreview || profileForm.avatarUrl}
                  alt={profileForm.name}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #9333EA', boxShadow: '0 4px 14px rgba(147, 51, 234, 0.2)' }}
                />
                <button
                  type="button"
                  onClick={() => modalFileInputRef.current?.click()}
                  style={{ position: 'absolute', bottom: 0, right: 0, background: '#9333EA', color: '#FFF', border: '2px solid #FFF', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  title="Upload Photo"
                >
                  <Camera size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                <button
                  type="button"
                  onClick={() => modalFileInputRef.current?.click()}
                  style={{ background: '#F3E8FF', color: '#7E22CE', border: 'none', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhotoModal}
                  style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  Remove
                </button>
                <input type="file" ref={modalFileInputRef} onChange={handlePhotoUploadModal} accept="image/*" style={{ display: 'none' }} />
              </div>
              {photoPreview && <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: '700' }}>✓ Photo preview loaded</span>}

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B', margin: '4px 0 0 0' }}>{profileForm.name}</h4>
              <span style={{ fontSize: '0.78rem', color: '#7E22CE', background: '#F3E8FF', padding: '2px 10px', borderRadius: '10px', fontWeight: '700', marginTop: '4px', display: 'inline-block' }}>
                Target: {profileForm.targetRole}
              </span>
            </div>

            {errorMessage && (
              <div style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '10px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '600' }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '4px', display: 'block' }}>Full Name:</label>
              <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '4px', display: 'block' }}>Email Address:</label>
              <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '4px', display: 'block' }}>Phone Number:</label>
              <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }} />
            </div>

            {requiresVerification && (
              <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#9A3412', marginBottom: '4px' }}>
                  🔒 Contact Change Verification Code Required
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP code"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #FDBA74', fontSize: '0.88rem' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: '600', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" style={{ flex: 2, padding: '10px', borderRadius: '10px', background: '#9333EA', color: '#FFF', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Save size={16} />
                <span>{requiresVerification ? 'Verify & Save' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
