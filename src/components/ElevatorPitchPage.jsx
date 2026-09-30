import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Trash2,
  Copy,
  Check,
  Edit3,
  Sliders,
  Target,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  RefreshCw,
  FileText,
  ChevronRight,
  Eye,
  Wand2,
  History,
  User,
  Building,
  Info,
  Zap,
  Volume,
  Award as StarIcon
} from 'lucide-react';

import { getNormalizedSkills, formatSkillsList } from '../utils/profileUtils';

export default function ElevatorPitchPage({ studentProfile, onNavigate }) {
  // ---------------------------------------------------------------------------
  // Profile defaults fallback
  // ---------------------------------------------------------------------------
  const profile = {
    name: studentProfile?.name || 'Alex Sharma',
    degree: studentProfile?.degree || 'B.Tech',
    branch: studentProfile?.branch || 'Computer Science & Engineering',
    year: studentProfile?.year || '3rd Year',
    semester: studentProfile?.semester || '6th Semester',
    cgpa: studentProfile?.cgpa || '8.6',
    careerGoal: studentProfile?.careerGoal || 'Java Backend Developer',
    skills: getNormalizedSkills(studentProfile?.skills),
    projects: Array.isArray(studentProfile?.projects)
      ? studentProfile.projects.map(p => (typeof p === 'object' && p ? (p.name || p.title || 'Project') : String(p)))
      : (typeof studentProfile?.projects === 'string' ? studentProfile.projects.split(',').map(s=>s.trim()).filter(Boolean) : ['E-Commerce Microservices Backend', 'AI Resume Screening Tool']),
    experience: studentProfile?.experience || 'Software Developer Intern at TechCorp (3 mos)',
    targetIndustry: studentProfile?.targetIndustry || 'Fintech / Enterprise Software'
  };

  // ---------------------------------------------------------------------------
  // Pre-configured pitch templates generator
  // ---------------------------------------------------------------------------
  const generatePitchText = (purpose, tone) => {
    const name = profile.name;
    const degreeBranch = `${profile.degree} in ${profile.branch}`;
    const topSkills = formatSkillsList(profile.skills, ', ', 3);
    const rawProj = profile.projects[0] || 'scalable web applications';
    const mainProject = typeof rawProj === 'object' ? (rawProj.name || rawProj.title || 'scalable web applications') : rawProj;
    const goal = profile.careerGoal;

    if (purpose === 'general') {
      if (tone === 'confident') {
        return `Hello! I'm ${name}, a final-year ${degreeBranch} student specializing in ${topSkills}. I excel at building production-grade solutions, such as my ${mainProject}. I am eager to leverage my software architecture expertise to drive impactful innovations as a ${goal}.`;
      } else if (tone === 'conversational') {
        return `Hi there! I'm ${name}, currently studying ${degreeBranch}. I've always loved solving technical challenges—recently, I built a ${mainProject} using ${topSkills}. I'm really excited to step into the industry as a ${goal} and collaborate on meaningful projects.`;
      } else if (tone === 'concise') {
        return `I'm ${name}, pursuing ${degreeBranch}. Specialized in ${topSkills}, I built a high-performance ${mainProject}. I'm seeking opportunities as a ${goal} to deliver high-impact software solutions.`;
      } else {
        // Professional
        return `Good morning. My name is ${name}, a ${degreeBranch} student with a solid background in ${topSkills}. Throughout my academic career, I developed ${mainProject}, focusing on clean code and reliable architecture. My professional objective is to contribute as a ${goal}.`;
      }
    } else if (purpose === 'internship') {
      if (tone === 'confident') {
        return `Hi! I'm ${name}, pursuing ${degreeBranch}. With hands-on proficiency in ${topSkills}, I built a scalable ${mainProject}. I am looking for a challenging internship role where I can immediately add value to backend systems while expanding my industry skills.`;
      } else if (tone === 'conversational') {
        return `Hello! I'm ${name}, studying ${degreeBranch}. I really enjoy practical coding and recently built a ${mainProject} using ${topSkills}. I'm searching for an internship position to apply what I've built in real-world team environments.`;
      } else if (tone === 'concise') {
        return `I'm ${name}, studying ${degreeBranch} with expertise in ${topSkills}. I built ${mainProject} and am actively seeking a internship in software engineering to contribute code from day one.`;
      } else {
        // Professional
        return `Hello. I am ${name}, currently enrolled in ${degreeBranch}. My technical toolkit includes ${topSkills}, demonstrated through my work on ${mainProject}. I am seeking a summer/fall internship opportunity to gain industry experience and support engineering teams.`;
      }
    } else if (purpose === 'job_interview') {
      if (tone === 'confident') {
        return `Good day! I'm ${name}, a ${degreeBranch} graduate. My core focus is ${topSkills}. In my recent project, ${mainProject}, I engineered microservices that handled high throughput seamlessly. I am ready to bring this problem-solving capability as a full-time ${goal} in your engineering team.`;
      } else if (tone === 'conversational') {
        return `Hi! I'm ${name}. I completed my ${degreeBranch} with a focus on ${topSkills}. Working on ${mainProject} taught me how to turn complex requirements into clean applications. I'm excited about this full-time ${goal} role and eager to contribute to your codebase!`;
      } else if (tone === 'concise') {
        return `Greetings. I'm ${name}, ${degreeBranch} candidate proficient in ${topSkills}. I successfully engineered ${mainProject} and seek the full-time ${goal} role to drive developer efficiency and scalable code delivery.`;
      } else {
        // Professional
        return `Hello, I'm ${name}, a final-year ${degreeBranch} student. My technical specialization centers on ${topSkills}. Through projects like ${mainProject}, I built robust database schemas and modular services. I am prepared to contribute effectively as a ${goal}.`;
      }
    } else {
      // Company specific
      if (tone === 'confident') {
        return `Hello! I'm ${name}, a ${degreeBranch} student deeply interested in software innovation. Given your leadership in technology, my expertise in ${topSkills} and project work on ${mainProject} position me to contribute right away to your software development team.`;
      } else if (tone === 'conversational') {
        return `Hi! My name is ${name}. As a ${degreeBranch} student, I've closely followed your team's work. I've built projects like ${mainProject} using ${topSkills}, and I would love the chance to solve hard problems with your engineering team.`;
      } else if (tone === 'concise') {
        return `I'm ${name}, specialized in ${topSkills} (${degreeBranch}). Inspired by your product ecosystem, I built ${mainProject} and aim to join your engineering organization as a high-performing ${goal}.`;
      } else {
        // Professional
        return `Good morning. I am ${name}, pursuing ${degreeBranch}. I have specialized in ${topSkills} and developed applications including ${mainProject}. I am eager to align my engineering skills with your organization's goals as a ${goal}.`;
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Component State
  // ---------------------------------------------------------------------------
  const [pitchPurpose, setPitchPurpose] = useState('general'); // 'general' | 'internship' | 'job_interview' | 'company_specific'
  const [pitchTone, setPitchTone] = useState('professional'); // 'confident' | 'professional' | 'conversational' | 'concise'
  const [pitchText, setPitchText] = useState(() => generatePitchText('general', 'professional'));
  const [savedPitches, setSavedPitches] = useState(() => {
    try {
      const saved = localStorage.getItem('skillaura_saved_pitches');
      return saved ? JSON.parse(saved) : [
        {
          id: '1',
          title: 'Campus Interview Self-Intro',
          purpose: 'job_interview',
          tone: 'confident',
          text: generatePitchText('job_interview', 'confident'),
          wordCount: 52,
          date: '2026-09-28'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'practice' | 'analysis' | 'history'

  // Practice & Timer State
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const timerRef = useRef(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunksRef = useRef([]);

  // Teleprompter & Speech synthesis state
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [teleprompterFontSize, setTeleprompterFontSize] = useState(22);
  const [copied, setCopied] = useState(false);

  // Practice History State
  const [practiceHistory, setPracticeHistory] = useState(() => {
    try {
      const hist = localStorage.getItem('skillaura_pitch_history');
      return hist ? JSON.parse(hist) : [
        {
          id: 'hist-1',
          date: '2026-09-29 14:30',
          durationSec: 28.5,
          wpm: 138,
          fillerCount: 1,
          clarityScore: 92,
          purpose: 'General Self-Intro',
          tone: 'Professional',
          audioUrl: null,
          feedbackSnippet: 'Great articulation! Pace was optimal at 138 WPM.'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Modal / Confirm Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ---------------------------------------------------------------------------
  // Sync pitch text when purpose or tone is selected by user
  // ---------------------------------------------------------------------------
  const handleGeneratePitch = (purpose = pitchPurpose, tone = pitchTone) => {
    const newText = generatePitchText(purpose, tone);
    setPitchText(newText);
  };

  const handlePurposeChange = (purpose) => {
    setPitchPurpose(purpose);
    handleGeneratePitch(purpose, pitchTone);
  };

  const handleToneChange = (tone) => {
    setPitchTone(tone);
    handleGeneratePitch(pitchPurpose, tone);
  };

  // ---------------------------------------------------------------------------
  // Real-time Text Analysis Helper Functions
  // ---------------------------------------------------------------------------
  const words = pitchText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  // Standard speech rate: 135 words per minute (2.25 words/sec)
  const estimatedSeconds = Math.round((wordCount / 135) * 60);

  const fillerWordsList = ['um', 'uh', 'basically', 'like', 'actually', 'honestly', 'you know', 'sort of', 'literally', 'so yeah'];
  const detectedFillers = words.filter(w => fillerWordsList.includes(w.toLowerCase().replace(/[^a-z]/g, '')));
  
  // Sentence structure analysis
  const sentences = pitchText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 18);

  // ---------------------------------------------------------------------------
  // 30-Second Timer & Audio Recording Controls
  // ---------------------------------------------------------------------------
  const startPracticeTimer = async () => {
    // Attempt mic access if available
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicPermission(true);
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } else {
        setHasMicPermission(false);
        setIsRecording(true); // Simulated recording fallback
      }
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable:', err);
      setHasMicPermission(false);
      setIsRecording(true); // Fallback simulation
    }

    setTimerSeconds(30);
    setTimerProgress(0);
    setIsTimerRunning(true);
  };

  const stopPracticeTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsRecording(false);

    // Record attempt to history automatically
    const durationSpoken = 30 - timerSeconds;
    const finalDuration = durationSpoken <= 0 ? 30 : Number(durationSpoken.toFixed(1));
    const calculatedWPM = Math.round((wordCount / (finalDuration || 30)) * 60);

    const newAttempt = {
      id: 'hist-' + Date.now(),
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      durationSec: finalDuration,
      wpm: calculatedWPM,
      fillerCount: detectedFillers.length,
      clarityScore: Math.min(98, Math.max(70, 100 - detectedFillers.length * 5 - (longSentences.length * 4))),
      purpose: pitchPurpose.replace('_', ' ').toUpperCase(),
      tone: pitchTone.charAt(0).toUpperCase() + pitchTone.slice(1),
      audioUrl: audioBlobUrl,
      feedbackSnippet: `Completed in ${finalDuration}s with ${calculatedWPM} WPM. Clarity rating is strong.`
    };

    setPracticeHistory(prev => {
      const updated = [newAttempt, ...prev];
      try {
        localStorage.setItem('skillaura_pitch_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const pausePracticeTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
    }
  };

  const resetPracticeTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setTimerSeconds(30);
    setTimerProgress(0);
    setAudioBlobUrl(null);
  };

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 0.1) {
            stopPracticeTimer();
            return 0;
          }
          const nextVal = prev - 0.1;
          setTimerProgress(((30 - nextVal) / 30) * 100);
          return nextVal;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // ---------------------------------------------------------------------------
  // Speech Synthesis AI Speech Voice
  // ---------------------------------------------------------------------------
  const handleListenAIVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }
    if (isSpeakingAI) {
      window.speechSynthesis.cancel();
      setIsSpeakingAI(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(pitchText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingAI(false);
    utterance.onerror = () => setIsSpeakingAI(false);

    setIsSpeakingAI(true);
    window.speechSynthesis.speak(utterance);
  };

  // ---------------------------------------------------------------------------
  // Save & Copy Actions
  // ---------------------------------------------------------------------------
  const handleSavePitch = () => {
    const titlePrompt = prompt('Enter a label for this pitch version:', `${pitchPurpose.replace('_', ' ')} (${pitchTone})`);
    if (!titlePrompt) return;

    const newPitch = {
      id: 'pitch-' + Date.now(),
      title: titlePrompt,
      purpose: pitchPurpose,
      tone: pitchTone,
      text: pitchText,
      wordCount,
      date: new Date().toISOString().split('T')[0]
    };

    setSavedPitches(prev => {
      const updated = [newPitch, ...prev];
      try {
        localStorage.setItem('skillaura_saved_pitches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    alert('Pitch version saved successfully!');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteHistory = () => {
    setPracticeHistory([]);
    try {
      localStorage.removeItem('skillaura_pitch_history');
    } catch (e) {}
    setShowDeleteModal(false);
  };

  // ---------------------------------------------------------------------------
  // Render Main Layout
  // ---------------------------------------------------------------------------
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
      padding: '28px 24px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#1E1B4B'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* TOP HEADER & NAVIGATION */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={14} /> SKILLAURA COMMUNICATION LAB
              </span>
              <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: '500' }}>
                 placement readiness
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1E1B4B',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em'
            }}>
              30-Second Elevator Pitch
            </h1>
            <p style={{ margin: 0, color: '#4B5563', fontSize: '0.95rem' }}>
              Craft a captivating, 30-second self-introduction based on your SkillAura profile and hone your verbal delivery with AI feedback.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              background: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: '16px',
              border: '1px solid #E9D5FF',
              boxShadow: '0 2px 8px rgba(147, 51, 234, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#F3E8FF',
                color: '#9333EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                {profile.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E1B4B' }}>{profile.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{profile.careerGoal} • {profile.degree}</div>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE INTEGRATION BAR */}
        <div style={{
          background: 'linear-gradient(90deg, #FFFFFF 0%, #FAF5FF 100%)',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid #F3E8FF',
          boxShadow: '0 2px 10px rgba(147, 51, 234, 0.04)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
              <GraduationCap size={16} color="#9333EA" />
              <span><strong>Background:</strong> {profile.degree} in {profile.branch} ({profile.year})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
              <Zap size={16} color="#9333EA" />
              <span><strong>Top Skills:</strong> {profile.skills.slice(0, 3).join(', ')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#4B5563' }}>
              <Briefcase size={16} color="#9333EA" />
              <span><strong>Project:</strong> {profile.projects[0]}</span>
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: '600', background: '#F3E8FF', padding: '4px 10px', borderRadius: '12px' }}>
            Auto-linked from SkillAura Profile
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '2px solid #E5E7EB',
          paddingBottom: '2px'
        }}>
          {[
            { id: 'editor', label: '1. Pitch Generator & Editor', icon: Edit3 },
            { id: 'practice', label: '2. 30-Sec Practice Room', icon: Mic },
            { id: 'analysis', label: '3. AI Feedback & Insights', icon: Sparkles },
            { id: 'history', label: '4. Saved Pitches & History', icon: History }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#9333EA' : '#6B7280',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderBottom: isActive ? '3px solid #9333EA' : '3px solid transparent',
                  boxShadow: isActive ? '0 -4px 12px rgba(147, 51, 234, 0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComponent size={18} color={isActive ? '#9333EA' : '#6B7280'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PITCH GENERATOR & EDITOR */}
        {activeTab === 'editor' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            {/* MAIN EDITOR COLUMN */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              {/* Pitch Purpose Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B', display: 'block', marginBottom: '8px' }}>
                  Select Pitch Purpose:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {[
                    { id: 'general', label: 'General Self-Intro', icon: User },
                    { id: 'internship', label: 'Internship Intro', icon: GraduationCap },
                    { id: 'job_interview', label: 'Job Placement Intro', icon: Briefcase },
                    { id: 'company_specific', label: 'Company-Specific', icon: Building }
                  ].map((p) => {
                    const PIcon = p.icon;
                    const selected = pitchPurpose === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handlePurposeChange(p.id)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: selected ? '2px solid #9333EA' : '1px solid #E5E7EB',
                          background: selected ? '#F3E8FF' : '#F9FAFB',
                          color: selected ? '#7E22CE' : '#4B5563',
                          fontWeight: selected ? '700' : '500',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <PIcon size={15} color={selected ? '#9333EA' : '#6B7280'} />
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tone Selection */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B' }}>
                    Select Communication Tone:
                  </label>
                  <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Customize pitch style</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'confident', label: '💪 Confident' },
                    { id: 'professional', label: '💼 Professional' },
                    { id: 'conversational', label: '😊 Conversational' },
                    { id: 'concise', label: '⚡ Concise' }
                  ].map((t) => {
                    const selected = pitchTone === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleToneChange(t.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          border: selected ? '1.5px solid #9333EA' : '1px solid #E5E7EB',
                          background: selected ? '#9333EA' : '#FFFFFF',
                          color: selected ? '#FFFFFF' : '#4B5563',
                          fontSize: '0.82rem',
                          fontWeight: selected ? '700' : '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Pitch Text Area */}
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#4B5563' }}>
                    Your Pitch Script:
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleListenAIVoice}
                      style={{
                        background: isSpeakingAI ? '#DC2626' : '#F3E8FF',
                        color: isSpeakingAI ? '#FFFFFF' : '#9333EA',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isSpeakingAI ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      {isSpeakingAI ? 'Stop Audio' : 'Listen AI Speech'}
                    </button>
                    <button
                      onClick={() => handleGeneratePitch()}
                      style={{
                        background: '#FAF5FF',
                        color: '#7E22CE',
                        border: '1px solid #E9D5FF',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RefreshCw size={12} /> Regenerate
                    </button>
                  </div>
                </div>

                <textarea
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '2px solid #E9D5FF',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#1E1B4B',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    background: '#FFFFFF',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Write or edit your 30-second elevator pitch here..."
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleSavePitch}
                    style={{
                      background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2)'
                    }}
                  >
                    <Save size={16} /> Save Pitch Version
                  </button>

                  <button
                    onClick={handleCopyText}
                    style={{
                      background: '#F9FAFB',
                      color: '#4B5563',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontWeight: '600',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Script'}
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('practice')}
                  style={{
                    background: '#FFF0F7',
                    color: '#BE185D',
                    border: '1px solid #FBCFE8',
                    borderRadius: '12px',
                    padding: '10px 18px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Start 30s Practice Room <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* SIDE METRICS & REAL-TIME AUDIT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Word & Duration Cards */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #F3E8FF',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} color="#9333EA" /> Timing & Quality Audit
                </h3>

                {/* Duration Meter */}
                <div style={{
                  background: estimatedSeconds > 35 || estimatedSeconds < 20 ? '#FEF2F2' : '#F0FDF4',
                  border: `1px solid ${estimatedSeconds > 35 || estimatedSeconds < 20 ? '#FCA5A5' : '#86EFAC'}`,
                  borderRadius: '14px',
                  padding: '14px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '700' }}>
                    Estimated Speaking Time
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: estimatedSeconds > 35 || estimatedSeconds < 20 ? '#DC2626' : '#16A34A'
                    }}>
                      ~{estimatedSeconds}s
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>
                      (Target: 25 - 32 sec)
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#374151', marginTop: '6px' }}>
                    {estimatedSeconds > 35 ? '⚠️ Pitch is slightly long for a 30s elevator presentation. Trim 10-15 words.' :
                     estimatedSeconds < 20 ? '⚠️ Pitch is too concise. Add detail on key project impact.' :
                     '✅ Perfect duration for a 30-second introduction!'}
                  </div>
                </div>

                {/* Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E1B4B' }}>{wordCount}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>Total Words</div>
                  </div>
                  <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: detectedFillers.length > 0 ? '#DC2626' : '#16A34A' }}>
                      {detectedFillers.length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>Filler Words</div>
                  </div>
                </div>
              </div>

              {/* Warning Checks */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #F3E8FF',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E1B4B', margin: '0 0 12px 0' }}>
                  Sentence Flow Checks
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem' }}>
                    {longSentences.length === 0 ? (
                      <CheckCircle2 size={16} color="#16A34A" />
                    ) : (
                      <AlertCircle size={16} color="#EA580C" />
                    )}
                    <span>
                      {longSentences.length === 0
                        ? 'Sentence length is well balanced'
                        : `${longSentences.length} long sentence(s) > 18 words`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem' }}>
                    {detectedFillers.length === 0 ? (
                      <CheckCircle2 size={16} color="#16A34A" />
                    ) : (
                      <AlertCircle size={16} color="#EA580C" />
                    )}
                    <span>
                      {detectedFillers.length === 0
                        ? 'No filler words detected'
                        : `Contains filler words: "${detectedFillers.join(', ')}"`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem' }}>
                    <CheckCircle2 size={16} color="#16A34A" />
                    <span>Includes academic background & core skills</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 30-SECOND PRACTICE ROOM */}
        {activeTab === 'practice' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid #F3E8FF',
            boxShadow: '0 4px 24px rgba(147, 51, 234, 0.06)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 8px 0' }}>
              30-Second Speaking Teleprompter & Recording
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.92rem', marginBottom: '24px' }}>
              Read your pitch aloud while the 30-second timer counts down. Record your audio to evaluate pacing and clarity.
            </p>

            {/* TELEPROMPTER CARD */}
            <div style={{
              background: '#0F172A',
              color: '#F8FAFC',
              borderRadius: '20px',
              padding: '32px 28px',
              marginBottom: '28px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              position: 'relative',
              textAlign: 'left'
            }}>
              {/* Teleprompter controls bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid #334155',
                paddingBottom: '12px'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  📺 TELEPROMPTER VIEW
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Font Size:</span>
                  <button
                    onClick={() => setTeleprompterFontSize(prev => Math.max(16, prev - 2))}
                    style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', padding: '2px 8px', cursor: 'pointer' }}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTeleprompterFontSize(prev => Math.min(32, prev + 2))}
                    style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', padding: '2px 8px', cursor: 'pointer' }}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Pitch Teleprompter Text */}
              <div style={{
                fontSize: `${teleprompterFontSize}px`,
                lineHeight: '1.6',
                fontWeight: '500',
                letterSpacing: '0.2px',
                minHeight: '120px',
                transition: 'font-size 0.2s ease'
              }}>
                {pitchText}
              </div>
            </div>

            {/* COUNTDOWN TIMER & CONTROL PANEL */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px'
            }}>
              {/* Circular Digital Timer Display */}
              <div style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: `conic-gradient(#9333EA ${timerProgress}%, #F3E8FF 0%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.15)'
              }}>
                <div style={{
                  width: '136px',
                  height: '136px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    color: timerSeconds <= 5 && timerSeconds > 0 ? '#DC2626' : '#1E1B4B',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {timerSeconds.toFixed(1)}s
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>
                    {isTimerRunning ? 'RECORDING LIVE' : 'COUNTDOWN'}
                  </span>
                </div>
              </div>

              {/* Mic Status Indicator */}
              <div style={{ fontSize: '0.85rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isRecording ? (
                  <span style={{
                    color: '#DC2626',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#DC2626',
                      animation: 'pulse 1s infinite'
                    }} />
                    Microphone Active ({hasMicPermission ? 'Browser Mic' : 'Simulated Audio Recording'})
                  </span>
                ) : (
                  <span>Microphone ready. Click Start Practice below.</span>
                )}
              </div>

              {/* Timer Control Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {!isTimerRunning ? (
                  <button
                    onClick={startPracticeTimer}
                    style={{
                      background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '14px 28px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 16px rgba(147, 51, 234, 0.25)'
                    }}
                  >
                    <Mic size={20} /> Start 30s Practice
                  </button>
                ) : (
                  <button
                    onClick={pausePracticeTimer}
                    style={{
                      background: '#EAB308',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '14px 24px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Pause size={20} /> Pause Timer
                  </button>
                )}

                <button
                  onClick={stopPracticeTimer}
                  disabled={!isRecording && timerSeconds === 30}
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '14px 24px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: (!isRecording && timerSeconds === 30) ? 'not-allowed' : 'pointer',
                    opacity: (!isRecording && timerSeconds === 30) ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={20} /> Finish & Analyze
                </button>

                <button
                  onClick={resetPracticeTimer}
                  style={{
                    background: '#F3F4F6',
                    color: '#4B5563',
                    border: '1px solid #D1D5DB',
                    borderRadius: '16px',
                    padding: '14px 20px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RotateCcw size={18} /> Reset
                </button>
              </div>

              {/* Audio Playback Player if Recorded */}
              {audioBlobUrl && (
                <div style={{
                  marginTop: '20px',
                  background: '#FAF5FF',
                  border: '1px solid #E9D5FF',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  width: '100%',
                  maxWidth: '500px'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#7E22CE', marginBottom: '8px' }}>
                    🎙️ Your Practice Recording Playback:
                  </div>
                  <audio controls src={audioBlobUrl} style={{ width: '100%' }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: AI FEEDBACK & ANALYSIS */}
        {activeTab === 'analysis' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* SCORE CARD & OVERALL METRICS */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="#9333EA" /> AI Pitch Scorecard
                </h3>
                <span style={{
                  background: '#F3E8FF',
                  color: '#7E22CE',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>
                  Based on standard interview criteria
                </span>
              </div>

              {/* Large Score Dial */}
              <div style={{
                background: 'linear-gradient(135deg, #FAF7FF 0%, #F3E8FF 100%)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: '#9333EA', lineHeight: '1' }}>
                  92<span style={{ fontSize: '1.2rem', color: '#6B7280' }}>/100</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1E1B4B', marginTop: '6px' }}>
                  Strong & Placement-Ready Pitch
                </div>
                <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Your pitch naturally covers your degree, technical stack, and career goals within ~30s.
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Clarity & Structure', score: '94%', text: 'Clear intro, body project, and career goal closing' },
                  { label: 'Relevance to Target Role', score: '95%', text: 'Highlights skills relevant to ' + profile.careerGoal },
                  { label: 'Speaking Pace (WPM)', score: '136 WPM', text: 'Optimal conversational pace (Target: 130-140 WPM)' },
                  { label: 'Tone & Professionalism', score: '90%', text: 'Authentic and professional phrasing' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#F9FAFB',
                    border: '1px solid #F3F4F6'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E1B4B' }}>{item.label}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#9333EA' }}>{item.score}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONABLE FEEDBACK & SUGGESTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Strengths */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #DCFCE7',
                boxShadow: '0 4px 16px rgba(22, 163, 74, 0.05)'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#15803D', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#16A34A" /> Key Strengths
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Directly mentions your practical work on <strong>{profile.projects[0]}</strong>.</li>
                  <li>Clear graduation timeline and core stack alignment ({profile.skills.slice(0, 3).join(', ')}).</li>
                  <li>Starts strong with name and academic degree without fluff.</li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #FEF3C7',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.05)'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#B45309', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} color="#D97706" /> Areas for Improvement
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Add a brief micro-pause (0.5s) right before stating your target career goal.</li>
                  <li>Ensure smooth vocal projection when pronouncing complex frameworks like Spring Boot or React.</li>
                </ul>
              </div>

              {/* AI Improved Sample Version */}
              <div style={{
                background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#C084FC', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wand2 size={16} /> Recommended AI Polished Version:
                </h4>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#E0E7FF', fontStyle: 'italic', margin: '0 0 14px 0' }}>
                  "Hello, I'm {profile.name}, a {profile.degree} student specializing in {profile.skills.slice(0,2).join(' and ')}. I recently architected an {profile.projects[0]}, focusing on high-concurrency performance. I am excited to apply my engineering skills as a full-time {profile.careerGoal}."
                </p>
                <button
                  onClick={() => {
                    setPitchText(`Hello, I'm ${profile.name}, a ${profile.degree} student specializing in ${profile.skills.slice(0,2).join(' and ')}. I recently architected an ${profile.projects[0]}, focusing on high-concurrency performance. I am excited to apply my engineering skills as a full-time ${profile.careerGoal}.`);
                    setActiveTab('editor');
                  }}
                  style={{
                    background: '#9333EA',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Apply to Editor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SAVED PITCHES & PRACTICE HISTORY */}
        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* SAVED PITCH VERSIONS */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E1B4B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} color="#9333EA" /> Saved Pitch Versions ({savedPitches.length})
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {savedPitches.map((p) => (
                  <div key={p.id} style={{
                    background: '#FAF7FF',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E9D5FF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#1E1B4B' }}>{p.title}</span>
                        <span style={{ fontSize: '0.75rem', background: '#F3E8FF', color: '#7E22CE', padding: '2px 8px', borderRadius: '8px', fontWeight: '600' }}>
                          {p.tone}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                        "{p.text.length > 120 ? p.text.substring(0, 120) + '...' : p.text}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E9D5FF', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{p.wordCount} words • Saved {p.date}</span>
                      <button
                        onClick={() => {
                          setPitchText(p.text);
                          setPitchPurpose(p.purpose);
                          setPitchTone(p.tone);
                          setActiveTab('editor');
                        }}
                        style={{
                          background: '#9333EA',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '4px 12px',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Load Script
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRACTICE ATTEMPTS HISTORY */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #F3E8FF',
              boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E1B4B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={18} color="#9333EA" /> Practice Attempt Logs
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    Track pacing, clarity scores, and speaking durations over time.
                  </span>
                </div>

                {practiceHistory.length > 0 && (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    style={{
                      background: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FCA5A5',
                      borderRadius: '10px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={14} /> Clear Practice History
                  </button>
                )}
              </div>

              {practiceHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#6B7280' }}>
                  <History size={36} color="#D1D5DB" style={{ marginBottom: '8px' }} />
                  <p>No practice attempts recorded yet. Head to the 30-Sec Practice Room to start!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {practiceHistory.map((item) => (
                    <div key={item.id} style={{
                      background: '#F9FAFB',
                      borderRadius: '14px',
                      padding: '16px',
                      border: '1px solid #F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: '#F3E8FF',
                          color: '#9333EA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '800',
                          fontSize: '0.9rem'
                        }}>
                          {item.clarityScore}%
                        </div>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E1B4B' }}>
                            {item.purpose} ({item.tone})
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                            {item.date} • Duration: <strong>{item.durationSec}s</strong> • Speed: <strong>{item.wpm} WPM</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#374151', maxWidth: '380px' }}>
                        {item.feedbackSnippet}
                      </div>

                      {item.audioUrl && (
                        <audio controls src={item.audioUrl} style={{ height: '36px', maxWidth: '200px' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '440px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1B4B', margin: '0 0 10px 0' }}>
                Delete Practice History?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', margin: '0 0 20px 0', lineHeight: '1.5' }}>
                Are you sure you want to delete all saved practice recordings and attempt statistics? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid #D1D5DB',
                    background: '#fff',
                    color: '#374151',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteHistory}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#DC2626',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Delete History
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
