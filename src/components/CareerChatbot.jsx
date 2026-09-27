import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, TrendingUp, Compass } from 'lucide-react';

export default function CareerChatbot({ language = "English" }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I am your AI Career Companion. Ask me anything about Indian IT salary bands, DSA strategies, resume tips, or NEP 2020 credit transfer!",
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = { sender: "user", text: inputQuery, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputQuery;
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentInput, language })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.reply, time: data.timestamp }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "I am having trouble connecting to the AI server. Please try again in a moment.", time: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  const domainSalaries = [
    { domain: "Full Stack Developer", fresherSalary: "₹4.5 - ₹8.5 LPA", midSalary: "₹12 - ₹22 LPA", ladder: "SDE 1 → Full Stack Lead → Tech Architect" },
    { domain: "Data Scientist / Analyst", fresherSalary: "₹5.0 - ₹9.0 LPA", midSalary: "₹14 - ₹25 LPA", ladder: "Data Analyst → Sr Data Scientist → AI Lead" },
    { domain: "DevOps & Cloud Engineer", fresherSalary: "₹4.8 - ₹9.5 LPA", midSalary: "₹15 - ₹28 LPA", ladder: "Junior DevOps → Cloud Architect → VP Infrastructure" },
    { domain: "AI / ML Engineer", fresherSalary: "₹6.0 - ₹12 LPA", midSalary: "₹18 - ₹35 LPA", ladder: "ML Engineer → Applied Scientist → AI Research Director" }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px' }} className="fade-in">
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '28px',
        border: '1px solid #A7F3D0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div className="badge-pill" style={{ background: '#D1FAE5', color: '#059669', borderColor: '#6EE7B7', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>INDIAN CONTEXT CAREER ADVISOR</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Career Q&A Chatbot & Indian Salary Ladder
          </h1>
          <p style={{ color: '#334155', fontSize: '0.95rem' }}>
            Get instant answers on tier-2/3 placement realistic expectations, salary progression, and DSA roadmaps.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* CHATBOT INTERFACE */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', height: '520px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0', marginBottom: '16px' }}>
            <Bot size={22} color="#4F46E5" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
              CareerLeap AI Q&A Assistant ({language})
            </h3>
          </div>

          {/* Chat Logs */}
          <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '6px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: msg.sender === 'user' ? '#4F46E5' : '#F1F5F9',
                color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                padding: '12px 16px',
                borderRadius: '16px',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                <div style={{ fontSize: '0.72rem', opacity: 0.8, marginBottom: '4px', fontWeight: 700 }}>
                  {msg.sender === 'user' ? 'You' : 'CareerLeap AI'} • {msg.time}
                </div>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#F1F5F9', padding: '10px 16px', borderRadius: '16px', fontSize: '0.85rem', color: '#64748B' }}>
                AI is thinking...
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="form-control"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about salary, DSA, resume, NEP credits..."
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* DOMAIN SALARY & LADDER GUIDE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#059669" />
            <span>Indian Career Ladder & Salary Bands</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {domainSalaries.map((item, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4F46E5', marginBottom: '6px' }}>
                  {item.domain}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span>Fresher Package (0-2 YOE): <strong style={{ color: '#16A34A' }}>{item.fresherSalary}</strong></span>
                  <span>Mid Level (3-5 YOE): <strong style={{ color: '#2563EB' }}>{item.midSalary}</strong></span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                  Career Trajectory: {item.ladder}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
