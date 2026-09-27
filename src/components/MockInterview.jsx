import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  Sparkles, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  Play,
  UserCheck
} from 'lucide-react';

export default function MockInterview({ studentProfile, voiceEnabled }) {
  const [domain, setDomain] = useState("Full Stack & Web Dev");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [mode, setMode] = useState("qa"); // 'qa' | 'elevator'

  // Elevator Pitch State
  const [elevatorScript, setElevatorScript] = useState("");

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const questionsMap = {
    "Full Stack & Web Dev": [
      "Explain the difference between client-side rendering (CSR) and server-side rendering (SSR) in React/Next.js.",
      "How do you handle asynchronous operations in Node.js and prevent callback hell?",
      "Describe a time when you optimized a web page that was loading slowly. What steps did you take?"
    ],
    "DSA & Problem Solving": [
      "How would you detect a cycle in a linked list? Explain the time and space complexity.",
      "What is the difference between BFS and DFS traversal in a graph?",
      "Explain how a HashMap handles hash collisions under the hood."
    ],
    "Behavioral HR": [
      "Tell me about a technical project where you faced a major bottleneck or tight deadline. How did you resolve it?",
      "How do you handle constructive criticism or code review feedback from senior team members?"
    ]
  };

  const currentQuestions = questionsMap[domain] || questionsMap["Full Stack & Web Dev"];
  const activeQuestion = currentQuestions[currentQuestionIdx];

  // Speech Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => prev + " " + transcript);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // WebCam Setup
  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (err) {
        console.warn("Camera access denied or unavailable:", err);
        alert("Camera preview requires permission. Running in text/audio mode.");
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      setIsCameraOn(false);
    }
  };

  // Text-To-Speech
  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(activeQuestion);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type your response below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) {
      alert("Please speak or type an answer before evaluating!");
      return;
    }

    setEvaluating(true);
    try {
      const res = await fetch('/api/mock-interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: activeQuestion, answer: userAnswer })
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const generateElevatorPitch = () => {
    const pitch = `Hello! I am ${studentProfile?.name || 'Aarav Sharma'}, a ${studentProfile?.year || '3rd Year Student'} in ${studentProfile?.branch || 'Computer Science'} at ${studentProfile?.college || 'IT Jaipur'}. I specialize in ${studentProfile?.targetRole || 'Full Stack Development'}, with verified skills in React, Node.js, and SQL. I have built hands-on micro-projects including REST APIs and interactive dashboards, and I am eager to contribute my technical and problem-solving skills as an intern.`;
    setElevatorScript(pitch);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        border: '1px solid #E9D5FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ background: '#F3E8FF', color: '#9333EA', borderColor: '#D8B4FE', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>AI MOCK INTERVIEW & STAR RUBRIC</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Interactive AI Interview Coach
          </h1>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Voice & video practice mode with communication metrics (filler words, pacing, STAR structure).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '30px', border: '1px solid #CBD5E1' }}>
          <button onClick={() => setMode('qa')} className={`tab-pill ${mode === 'qa' ? 'active' : ''}`} style={{ fontSize: '0.82rem', padding: '6px 16px' }}>
            Technical Q&A Practice
          </button>
          <button onClick={() => { setMode('elevator'); generateElevatorPitch(); }} className={`tab-pill ${mode === 'elevator' ? 'active' : ''}`} style={{ fontSize: '0.82rem', padding: '6px 16px' }}>
            30-Sec Elevator Pitch
          </button>
        </div>
      </div>

      {mode === 'qa' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* LEFT: Interviewer Question & WebCam Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Question Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Select Domain:
                </label>
                <select 
                  value={domain}
                  onChange={(e) => { setDomain(e.target.value); setCurrentQuestionIdx(0); setEvaluation(null); setUserAnswer(""); }}
                  style={{ fontSize: '0.85rem', padding: '4px 10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                >
                  <option value="Full Stack & Web Dev">Full Stack & Web Dev</option>
                  <option value="DSA & Problem Solving">DSA & Problem Solving</option>
                  <option value="Behavioral HR">Behavioral HR</option>
                </select>
              </div>

              <div style={{ background: '#EEF2FF', padding: '16px', borderRadius: '14px', border: '1px solid #C7D2FE', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                    QUESTION {currentQuestionIdx + 1} OF {currentQuestions.length}
                  </span>
                  <button onClick={speakQuestion} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <Volume2 size={16} /> Listen AI Voice
                  </button>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', lineHeight: '1.4' }}>
                  "{activeQuestion}"
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    setCurrentQuestionIdx((prev) => (prev + 1) % currentQuestions.length);
                    setUserAnswer("");
                    setEvaluation(null);
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <RefreshCw size={14} /> Next Question
                </button>
              </div>
            </div>

            {/* WebCam Video Feed Box */}
            <div style={{ background: '#0F172A', color: '#FFFFFF', borderRadius: '20px', padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Video size={16} color="#6EE7B7" /> Visual Camera Feed (Eye Contact Coaching)
                </span>
                <button onClick={toggleCamera} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#FFFFFF', padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.8rem' }}>
                  {isCameraOn ? "Turn Camera OFF" : "Turn Camera ON"}
                </button>
              </div>

              <div style={{
                width: '100%',
                height: '200px',
                background: '#1E293B',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {isCameraOn ? (
                  <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                    Camera preview offline. Click "Turn Camera ON" to enable posture coaching.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Answer Input & STAR Analytics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                  Your Answer (Speak or Type):
                </label>

                <button 
                  onClick={toggleMic}
                  style={{
                    background: isListening ? '#EF4444' : '#4F46E5',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  <span>{isListening ? "Listening... (Click to stop)" : "Speak Answer"}</span>
                </button>
              </div>

              <textarea 
                className="form-control"
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Click 'Speak Answer' or type your response here using the STAR method..."
                style={{ marginBottom: '16px' }}
              />

              <button 
                onClick={handleEvaluate} 
                className="btn-primary"
                disabled={evaluating}
                style={{ width: '100%', justifyCenter: 'center', padding: '12px' }}
              >
                <Sparkles size={16} />
                <span>{evaluating ? "Evaluating Communication & STAR Rubric..." : "Submit Answer for AI Scoring"}</span>
              </button>
            </div>

            {/* Evaluation Results Card */}
            {evaluation && (
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} color="#9333EA" />
                  <span>Communication Analytics & Feedback</span>
                </h3>

                {/* Score Meters */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px', textAlign: 'center' }}>
                  <div style={{ background: '#FAF5FF', padding: '12px', borderRadius: '12px', border: '1px solid #E9D5FF' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9333EA', fontWeight: 700 }}>COMMUNICATION</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>{evaluation.communicationScore}/100</div>
                  </div>
                  <div style={{ background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FECACA' }}>
                    <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 700 }}>FILLER WORDS</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DC2626' }}>{evaluation.fillerWordsCount}</div>
                  </div>
                  <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>ESTIMATED WPM</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A' }}>{evaluation.pacingWpm}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>AI Coaching Advice:</span>
                  <p style={{ fontSize: '0.88rem', color: '#475569', background: '#F8FAFC', padding: '12px', borderRadius: '12px', marginTop: '4px' }}>
                    {evaluation.feedback}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16A34A' }}>Suggested STAR Response Model:</span>
                  <p style={{ fontSize: '0.85rem', color: '#0F172A', background: '#F0FDF4', padding: '12px', borderRadius: '12px', marginTop: '4px', lineHeight: '1.5' }}>
                    "{evaluation.suggestedImprovedAnswer}"
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* ELEVATOR PITCH GENERATOR */
        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #E2E8F0', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <UserCheck size={24} color="#EA580C" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
              Personalized 30-Second Elevator Pitch
            </h2>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '20px' }}>
            Auto-generated introduce-yourself script tailored to your CGPA, target domain, and top technical skills:
          </p>

          <div style={{ background: '#FFF7ED', padding: '20px', borderRadius: '16px', border: '1px solid #FFEDD5', marginBottom: '20px', fontSize: '1rem', color: '#9A3412', lineHeight: '1.6', fontWeight: 500 }}>
            "{elevatorScript}"
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={speakQuestion} className="btn-primary">
              <Volume2 size={16} /> Listen AI Pitch Audio
            </button>
            <button onClick={generateElevatorPitch} className="btn-secondary">
              <RefreshCw size={16} /> Regenerate Script
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
