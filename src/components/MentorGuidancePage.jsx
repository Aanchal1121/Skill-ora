import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Send, 
  Mic, 
  RotateCcw, 
  ShieldCheck, 
  User, 
  Bot, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Smile, 
  Zap, 
  Compass, 
  AlertCircle,
  Plus,
  Check,
  PhoneCall
} from 'lucide-react';

export default function MentorGuidancePage({ 
  studentProfile, 
  language = "English", 
  onNavigate 
}) {
  // Selected Emotional Mood state
  const [selectedMood, setSelectedMood] = useState(null);

  // Messages log
  const [messages, setMessages] = useState([
    {
      sender: "mentor",
      text: `Hello ${studentProfile?.name || 'there'}! I'm your Personal AI Mentor. I'm here to listen, help you reflect, explore career paths, and navigate any study stress or uncertainty. What's on your mind today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Personalized Action Plan State
  const [actionPlan, setActionPlan] = useState([
    { id: 'a1', text: 'Focus on 1 technical skill gap (Spring Boot) for 30 mins daily', completed: false },
    { id: 'a2', text: 'Break down placement prep into small, 20-minute practice blocks', completed: false },
    { id: 'a3', text: 'Discuss career options with your college placement advisor', completed: false }
  ]);

  const chatEndRef = useRef(null);

  const moodsList = [
    { id: 'happy', label: 'Happy', emoji: '😊', bg: '#ECFDF5', color: '#059669' },
    { id: 'motivated', label: 'Motivated', emoji: '🚀', bg: '#F3E8FF', color: '#9333EA' },
    { id: 'confused', label: 'Confused', emoji: '🤔', bg: '#FFFBEB', color: '#D97706' },
    { id: 'stressed', label: 'Stressed', emoji: '😓', bg: '#FEF2F2', color: '#DC2626' },
    { id: 'anxious', label: 'Anxious', emoji: '😟', bg: '#FFF5FA', color: '#EC4899' },
    { id: 'overwhelmed', label: 'Overwhelmed', emoji: '🌊', bg: '#EFF6FF', color: '#2563EB' }
  ];

  const conversationTopics = [
    {
      title: 'Career Confusion',
      prompt: "I'm unsure about which career path to choose. Can you help me explore my options?",
      icon: Compass
    },
    {
      title: 'Stress & Anxiety',
      prompt: "I'm feeling stressed about my studies and future. Can we talk about it?",
      icon: Heart
    },
    {
      title: 'Emotional Support',
      prompt: "I'm feeling overwhelmed and would like someone to talk to.",
      icon: Sparkles
    },
    {
      title: 'Confidence & Motivation',
      prompt: "I'm struggling with confidence and motivation. How can I start improving?",
      icon: Zap
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle Mood Selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.id);
    let initialGreeting = "";

    if (mood.id === 'overwhelmed' || mood.id === 'anxious' || mood.id === 'stressed') {
      initialGreeting = `I notice you're feeling ${mood.label.toLowerCase()} today. Take a deep breath — you don't have to figure everything out at once. Would you like to talk about what's causing this stress?`;
    } else if (mood.id === 'confused') {
      initialGreeting = `Feeling confused about your career or studies is completely natural. Let's break down your options together step by step. What is your biggest decision right now?`;
    } else {
      initialGreeting = `Glad to see you're feeling ${mood.label.toLowerCase()} today! How can I help support your career journey and goals today?`;
    }

    setMessages(prev => [
      ...prev,
      {
        sender: 'mentor',
        text: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Handle Sending Message to AI Mentor
  const handleSendMessage = async (customText) => {
    const text = customText || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          studentContext: {
            name: studentProfile?.name || 'Student',
            targetRole: studentProfile?.targetRole || 'Java Backend Developer',
            college: studentProfile?.college,
            branch: studentProfile?.branch,
            skills: studentProfile?.skills
          },
          language
        })
      });
      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: data.reply || getSimulatedMentorReply(text, studentProfile),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: getSimulatedMentorReply(text, studentProfile),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Conversational AI Mentor Helper
  const getSimulatedMentorReply = (query, profile) => {
    const lower = query.toLowerCase();
    const role = profile?.targetRole || "Java Backend Developer";

    if (lower.includes('job') || lower.includes('placement') || lower.includes('worried') || lower.includes('fail')) {
      return `It is completely understandable to feel uncertain about placements and your future after graduation. You don't have to carry all that pressure at once. Looking at your profile for ${role}, you already have a solid base in ${profile?.skills?.join(', ') || 'core concepts'}. What worries you most right now: technical coding preparation, interview confidence, or comparing yourself with classmates?`;
    }
    if (lower.includes('confus') || lower.includes('career') || lower.includes('choose')) {
      return `Exploring career paths can feel overwhelming when there are so many options. For someone with your background in ${profile?.branch || 'engineering'}, roles like ${role}, Data Analytics, or Web Development are great paths. Which aspects of building software or working with data do you enjoy most?`;
    }
    if (lower.includes('stress') || lower.includes('overwhelmed') || lower.includes('anxiety')) {
      return `Thank you for sharing that with me. When academic workload and future expectations stack up, taking a short step back helps restore clarity. Try focusing on just ONE manageable task today — like practicing 20 minutes of coding or taking a relaxing walk. Would you like us to create a mini step-by-step plan for this week?`;
    }
    if (lower.includes('confidence') || lower.includes('motivat')) {
      return `Building confidence takes steady, small wins rather than overnight changes. Every project milestone and concept you learn adds up. Remember: peer progress varies, and your journey as a ${role} is unique. What is one small milestone you'd like to achieve this week?`;
    }
    return `I hear you. Moving forward one small step at a time is the best way to handle complex career goals. How can I best support you with your preparation for ${role} right now?`;
  };

  // Toggle Microphone Voice Speech Recognition
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice speech recognition is not supported by your browser. Please type your message.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-US';

    if (!isVoiceActive) {
      setIsVoiceActive(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsVoiceActive(false);
      };
      recognition.onerror = () => setIsVoiceActive(false);
      recognition.onend = () => setIsVoiceActive(false);
    } else {
      setIsVoiceActive(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear conversation history?")) {
      setMessages([
        {
          sender: "mentor",
          text: `Conversation cleared. I'm right here whenever you want to talk or reflect on your career.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px' }} className="fade-in">
      
      {/* 1. MENTOR GUIDANCE PAGE HEADER */}
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
            <Heart size={15} color="#9333EA" />
            <span>AI CAREER MENTOR & EMOTIONAL SUPPORT</span>
          </div>
          <h1 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
            Your Personal Mentor
          </h1>
          <p style={{ color: '#7A6F8A', fontSize: '0.95rem' }}>
            Your safe space to talk, reflect, explore your future, and move forward with confidence.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
        >
          <RotateCcw size={14} />
          <span>New Conversation</span>
        </button>
      </div>

      {/* 2. OPTIONAL EMOTIONAL CHECK-IN */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(185, 160, 232, 0.05)' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Smile size={18} color="#9333EA" />
          <span>How are you feeling today? (Optional Check-in)</span>
        </h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {moodsList.map(mood => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              style={{
                background: selectedMood === mood.id ? mood.bg : '#FAF7FF',
                border: `1.5px solid ${selectedMood === mood.id ? mood.color : '#EAE2F8'}`,
                color: selectedMood === mood.id ? mood.color : '#4A3E56',
                borderRadius: '16px',
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. SUGGESTED CONVERSATION TOPICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {conversationTopics.map((topic, idx) => {
          const TopicIcon = topic.icon;
          return (
            <div
              key={idx}
              onClick={() => handleSendMessage(topic.prompt)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #EAE2F8',
                borderRadius: '16px',
                padding: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(185, 160, 232, 0.05)',
                transition: 'all 0.25s ease'
              }}
              className="feature-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <TopicIcon size={16} color="#9333EA" />
                <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E' }}>{topic.title}</h5>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7A6F8A', lineHeight: '1.3' }}>
                "{topic.prompt.substring(0, 50)}..."
              </p>
            </div>
          );
        })}
      </div>

      {/* 4. MAIN CONVERSATIONAL AI MENTOR CHAT WINDOW */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EAE2F8',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '520px',
        marginBottom: '24px'
      }}>
        {/* Chat Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAE2F8', paddingBottom: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F0EAFA', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #C084FC' }}>
              <Bot size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2D1B4E' }}>
                AI Mentor — SkillAura Companion
              </h3>
              <span style={{ fontSize: '0.76rem', color: '#059669', fontWeight: 700 }}>
                ● Active Listening ({language})
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleVoice}
            style={{
              background: isVoiceActive ? '#F3E8FF' : '#FAF7FF',
              border: `1.5px solid ${isVoiceActive ? '#9333EA' : '#EAE2F8'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: isVoiceActive ? '#9333EA' : '#7A6F8A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Mic size={15} color={isVoiceActive ? '#9333EA' : '#7A6F8A'} />
            <span>{isVoiceActive ? 'Listening...' : 'Voice Input'}</span>
          </button>
        </div>

        {/* Scrollable Messages Area */}
        <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '6px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)' : '#F0EAFA',
                color: msg.sender === 'user' ? '#FFFFFF' : '#2D1B4E',
                padding: '14px 18px',
                borderRadius: '20px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '20px',
                borderBottomLeftRadius: msg.sender === 'user' ? '20px' : '4px',
                fontSize: '0.92rem',
                lineHeight: '1.5',
                boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(147, 51, 234, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.72rem', opacity: 0.8, marginBottom: '4px', fontWeight: 700 }}>
                {msg.sender === 'user' ? 'You' : 'AI Personal Mentor'} • {msg.time}
              </div>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#F0EAFA', padding: '10px 16px', borderRadius: '18px', fontSize: '0.85rem', color: '#9333EA', fontWeight: 600 }}>
              AI Mentor is reflecting on your message...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Type your thoughts, career worries, or questions here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={{ borderRadius: '24px', padding: '12px 18px' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 22px', borderRadius: '24px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* 5. PERSONALIZED ACTION PLAN */}
      <div style={{ background: '#FFFFFF', border: '1px solid #EAE2F8', borderRadius: '20px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 18px rgba(147, 51, 234, 0.06)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
          A Few Steps You Can Take
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#7A6F8A', marginBottom: '14px' }}>
          Small, practical actions suggested by your mentor to reduce stress and move forward.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {actionPlan.map((act) => (
            <div
              key={act.id}
              onClick={() => setActionPlan(actionPlan.map(a => a.id === act.id ? { ...a, completed: !a.completed } : a))}
              style={{
                padding: '12px 16px',
                borderRadius: '14px',
                background: act.completed ? '#ECFDF5' : '#FAF7FF',
                border: `1.5px solid ${act.completed ? '#A7F3D0' : '#EAE2F8'}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: `2px solid ${act.completed ? '#059669' : '#9333EA'}`,
                background: act.completed ? '#059669' : '#FFFFFF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {act.completed && <Check size={14} />}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: act.completed ? '#059669' : '#2D1B4E', textDecoration: act.completed ? 'line-through' : 'none' }}>
                {act.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. DISCREET HUMAN SUPPORT OPTION */}
      <div style={{ background: '#FFF5FA', border: '1px solid #F6DCEC', borderRadius: '18px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PhoneCall size={20} color="#EC4899" />
          <div>
            <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2D1B4E' }}>Need Additional Human Support?</h5>
            <p style={{ fontSize: '0.82rem', color: '#7A6F8A' }}>
              SkillAura AI is an assistant. Reach out to your college student counselor or trusted mentor when in distress.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("College Student Wellness & Counseling Office:\nContact: +91 800-123-4567 / counselor@college.edu.in")}
          className="btn-secondary"
          style={{ fontSize: '0.82rem', borderColor: '#F472B6', color: '#EC4899' }}
        >
          View Verified Support Details
        </button>
      </div>

    </div>
  );
}
