import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Smartphone, 
  Mail, 
  KeyRound, 
  User, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onRegisterSuccess }) {
  const [authStep, setAuthStep] = useState('login'); // 'login' | 'otp' | 'registration'
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Detailed Registration Form State
  const [regStep, setRegStep] = useState(1); // 1: Personal, 2: Academic, 3: Career, 4: Readiness
  const [regData, setRegData] = useState({
    name: 'Ananya Roy',
    age: '21',
    gender: 'Female',
    city: 'Bangalore',
    state: 'Karnataka',
    college: 'Institute of Technology & Engineering',
    branch: 'Computer Science & Engineering',
    degree: 'B.Tech',
    year: '3rd Year (Semester 6)',
    semester: 'Semester 6',
    cgpa: '7.8',
    sgpa: '8.1',
    backlogHistory: '0 Backlogs',
    targetRole: 'Java Backend Developer',
    careerGoal: 'Become a Backend Software Engineer at a top Tech Product company.',
    preferredIndustry: 'IT & Software',
    skills: 'Java, C++, SQL, HTML, Git Basics',
    confidenceTech: '4',
    confidenceComm: '4',
    readiness: 'On Track'
  });

  if (!isOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!emailAddress || !emailAddress.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    setValidationError('');
    setAuthStep('otp');
    setTimerActive(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpCode !== '123456' && otpCode.length !== 6) {
      setValidationError('Invalid OTP. Use test OTP: 123456');
      return;
    }
    setValidationError('');
    setAuthStep('registration');
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    onRegisterSuccess(regData);
    onClose();
  };

  return (
    <div className="cjn-modal-overlay" onClick={onClose}>
      <div className="cjn-modal-content" style={{ maxWidth: authStep === 'registration' ? '680px' : '480px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="#9333EA" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>SkillAura</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6F8A' }}>
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: MOBILE & EMAIL LOGIN */}
        {authStep === 'login' && (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span className="badge-pill" style={{ marginBottom: '8px' }}>STEP 1 OF 2 — AUTHENTICATION</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>Student Login / Sign Up</h3>
              <p style={{ fontSize: '0.88rem', color: '#7A6F8A' }}>Enter your mobile number and email to receive your OTP verification code.</p>
            </div>

            {validationError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px', borderRadius: '10px', fontSize: '0.84rem' }}>
                {validationError}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '4px', display: 'block' }}>
                Mobile Number:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '10px 14px', background: '#FAF7FF', border: '1px solid #D8C7F3', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, color: '#9333EA' }}>+91</span>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '4px', display: 'block' }}>
                Student Email Address:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="student@college.edu.in"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              <span>Send Verification OTP</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {authStep === 'otp' && (
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', marginBottom: '8px' }}>OTP SENT</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>Verify OTP Code</h3>
              <p style={{ fontSize: '0.88rem', color: '#7A6F8A' }}>
                Enter the 6-digit OTP sent to <strong>+91 {mobileNumber}</strong> and <strong>{emailAddress}</strong>.
              </p>
              <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: 700, marginTop: '4px' }}>
                💡 Demo Test OTP: <strong>123456</strong>
              </div>
            </div>

            {validationError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px', borderRadius: '10px', fontSize: '0.84rem' }}>
                {validationError}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2D1B4E', marginBottom: '4px', display: 'block' }}>
                Enter 6-Digit OTP:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 123456"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{ letterSpacing: '0.3em', fontSize: '1.2rem', textAlign: 'center', fontWeight: 800 }}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
              <span style={{ color: '#7A6F8A' }}>Didn't receive OTP?</span>
              <button
                type="button"
                onClick={() => alert("Resent demo OTP: 123456")}
                style={{ background: 'none', border: 'none', color: '#9333EA', fontWeight: 700, cursor: 'pointer' }}
              >
                Resend OTP (30s)
              </button>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <ShieldCheck size={16} />
              <span>Verify & Continue to Registration</span>
            </button>
          </form>
        )}

        {/* STEP 3: DETAILED STUDENT REGISTRATION & PROFILE SETUP */}
        {authStep === 'registration' && (
          <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span className="badge-pill" style={{ background: '#F3E8FF', color: '#9333EA', marginBottom: '6px' }}>
                STUDENT PROFILE REGISTRATION — STEP {regStep} OF 4
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E' }}>
                {regStep === 1 && 'Personal Information'}
                {regStep === 2 && 'Academic Records'}
                {regStep === 3 && 'Career Goals & Skills'}
                {regStep === 4 && 'Career Readiness Assessment'}
              </h3>
            </div>

            {/* Step 1: Personal Details */}
            {regStep === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Full Name:</label>
                  <input type="text" className="form-control" value={regData.name} onChange={(e) => setRegData({...regData, name: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Age:</label>
                  <input type="text" className="form-control" value={regData.age} onChange={(e) => setRegData({...regData, age: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Gender:</label>
                  <select className="form-control" value={regData.gender} onChange={(e) => setRegData({...regData, gender: e.target.value})}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>City & State:</label>
                  <input type="text" className="form-control" value={`${regData.city}, ${regData.state}`} onChange={(e) => setRegData({...regData, city: e.target.value})} required />
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {regStep === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>College / University Name:</label>
                  <input type="text" className="form-control" value={regData.college} onChange={(e) => setRegData({...regData, college: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Branch / Department:</label>
                  <input type="text" className="form-control" value={regData.branch} onChange={(e) => setRegData({...regData, branch: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Current CGPA:</label>
                  <input type="text" className="form-control" value={regData.cgpa} onChange={(e) => setRegData({...regData, cgpa: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Current Semester:</label>
                  <input type="text" className="form-control" value={regData.semester} onChange={(e) => setRegData({...regData, semester: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Backlog History:</label>
                  <input type="text" className="form-control" value={regData.backlogHistory} onChange={(e) => setRegData({...regData, backlogHistory: e.target.value})} required />
                </div>
              </div>
            )}

            {/* Step 3: Career Details */}
            {regStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Target Career Role:</label>
                  <select className="form-control" value={regData.targetRole} onChange={(e) => setRegData({...regData, targetRole: e.target.value})}>
                    <option value="Java Backend Developer">Java Backend Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Full Stack Engineer">Full Stack Engineer</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Current Technical Skills (Comma separated):</label>
                  <input type="text" className="form-control" value={regData.skills} onChange={(e) => setRegData({...regData, skills: e.target.value})} required />
                </div>
              </div>
            )}

            {/* Step 4: Self Assessment */}
            {regStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Rate Technical Confidence (1 - 5):</label>
                  <input type="range" min="1" max="5" value={regData.confidenceTech} onChange={(e) => setRegData({...regData, confidenceTech: e.target.value})} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E' }}>Placement Readiness Status:</label>
                  <select className="form-control" value={regData.readiness} onChange={(e) => setRegData({...regData, readiness: e.target.value})}>
                    <option value="On Track">On Track (High Confidence)</option>
                    <option value="Needs Skill Building">Needs Skill Building</option>
                    <option value="Beginning Preparation">Beginning Preparation</option>
                  </select>
                </div>
              </div>
            )}

            {/* Registration Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              {regStep > 1 && (
                <button type="button" onClick={() => setRegStep(regStep - 1)} className="btn-secondary">
                  Previous
                </button>
              )}

              {regStep < 4 ? (
                <button type="button" onClick={() => setRegStep(regStep + 1)} className="btn-primary" style={{ marginLeft: 'auto' }}>
                  Save & Continue →
                </button>
              ) : (
                <button type="submit" className="btn-primary" style={{ marginLeft: 'auto', background: '#059669' }}>
                  Submit Profile & Start Journey
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
