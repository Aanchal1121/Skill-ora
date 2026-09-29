import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, TrendingUp, Compass, Mic, Volume2 } from 'lucide-react';

export default function CareerChatbot({ language = "English", isFloatingPanel = false, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I am your SkillAura Assistant. Ask me anything about career paths, required skills, resume improvement, internships & jobs, or interview preparation!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  const quickPrompts = [
    "Career paths for Java Backend Developer",
    "Required skills to improve Spring Boot & REST APIs",
    "How to improve my resume ATS score?",
    "Find internships for Computer Science 3rd Year",
    "Mock interview preparation tips"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: data.reply || `For ${query}, we recommend focusing on Java Spring Boot microservices, building 2 GitHub projects, and applying to verified PM Internship Scheme openings!`, 
        time: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: `Based on your goal as a Java Backend Developer: Focus on Spring Boot, REST APIs, SQL indexing, and practicing 20 LeetCode Java problems. Check our Learning Hub for free NPTEL courses!`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const domainSalaries = [
    { domain: "Java Backend Developer", fresherSalary: "₹5.5 - ₹10 LPA", midSalary: "₹14 - ₹24 LPA", ladder: "Junior Java Dev → Sr Backend Dev → Solutions Architect" },
    { domain: "Full Stack Engineer", fresherSalary: "₹5.0 - ₹9.0 LPA", midSalary: "₹13 - ₹22 LPA", ladder: "SDE 1 → Full Stack Lead → Tech Lead" },
    { domain: "AI / Data Engineer", fresherSalary: "₹6.0 - ₹12 LPA", midSalary: "₹16 - ₹30 LPA", ladder: "Data Analyst → AI Engineer → Principal ML Lead" }
  ];

  return (
    <div style={{ maxWidth: isFloatingPanel ? '100%' : '1200px', margin: '0 auto', padding: isFloatingPanel ? '0' : '24px 20px' }} className="fade-in">
      
      {!isFloatingPanel && (
        <div style={{
          background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 100%)',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '24px',
          border: '1px solid #EAE2F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', borderColor: '#B9A0E8', marginBottom: '8px' }}>
              <Sparkles size={15} />
              <span>SKILLAURA AI ASSISTANT</span>
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
              Career Q&A Chatbot & Voice Assistant
            </h1>
            <p style={{ color: '#4A3E56', fontSize: '0.95rem' }}>
              Get instant guidance on career paths, skills to improve, resume fixes, and interview preparation.
            </p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isFloatingPanel ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* CHATBOT INTERFACE */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #EAE2F8', 
          borderRadius: '24px', 
          padding: '20px', 
          boxShadow: 'var(--shadow-sm)', 
          display: 'flex', 
          flexDirection: 'column', 
          height: isFloatingPanel ? '480px' : '520px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #EAE2F8', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#F0EAFA', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#2D1B4E' }}>
                SkillAura Assistant ({language})
              </h3>
            </div>

            <button
              onClick={() => setVoiceActive(!voiceActive)}
              style={{
                background: voiceActive ? '#F0EAFA' : '#FAF7FF',
                border: '1px solid #EAE2F8',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: voiceActive ? '#9333EA' : '#7A6F8A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Mic size={14} color={voiceActive ? '#9333EA' : '#7A6F8A'} />
              <span>{voiceActive ? "Voice On" : "Voice"}</span>
            </button>
          </div>

          {/* Quick Prompts */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '10px' }}>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                style={{
                  background: '#FAF7FF',
                  border: '1px solid #EAE2F8',
                  borderRadius: '14px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  color: '#9333EA',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                + {qp}
              </button>
            ))}
          </div>

          {/* Chat Logs */}
          <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.sender === 'user' ? '#9333EA' : '#F0EAFA',
                color: msg.sender === 'user' ? '#FFFFFF' : '#2D1B4E',
                padding: '10px 14px',
                borderRadius: '16px',
                fontSize: '0.88rem',
                lineHeight: '1.45'
              }}>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '3px', fontWeight: 700 }}>
                  {msg.sender === 'user' ? 'You' : 'SkillAura Assistant'} • {msg.time}
                </div>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#F0EAFA', padding: '8px 14px', borderRadius: '16px', fontSize: '0.82rem', color: '#9333EA' }}>
                SkillAura AI is generating response...
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-control"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask SkillAura Assistant about jobs, skills, resume..."
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* SALARY & CAREER LADDER GUIDE (If not floating panel) */}
        {!isFloatingPanel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#9333EA" />
              <span>Career Trajectory & Salary Insights</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {domainSalaries.map((item, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #EAE2F8', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#9333EA', marginBottom: '4px' }}>
                    {item.domain}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '4px' }}>
                    <span>Fresher Package: <strong style={{ color: '#059669' }}>{item.fresherSalary}</strong></span>
                    <span>Mid Level (3-5 YOE): <strong style={{ color: '#2563EB' }}>{item.midSalary}</strong></span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 600 }}>
                    Career Path: {item.ladder}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
