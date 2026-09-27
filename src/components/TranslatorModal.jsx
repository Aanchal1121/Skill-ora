import React, { useState } from 'react';
import { Languages, Sparkles, Copy, Check } from 'lucide-react';

export default function TranslatorModal({ isOpen, onClose }) {
  const [inputText, setInputText] = useState("maine ek react e-commerce project banaya tha jisme shopping cart feature aur backend Node API connection tha.");
  const [sourceLang, setSourceLang] = useState("Hinglish");
  const [translatedText, setTranslatedText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTranslate = () => {
    setTranslating(true);
    setTimeout(() => {
      setTranslatedText("Engineered an interactive e-commerce web application utilizing React for dynamic state management, integrated seamlessly with a Node.js REST API backend to process real-time shopping cart transactions.");
      setTranslating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
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
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '30px',
        maxWidth: '640px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        border: '1px solid #E2E8F0'
      }} className="fade-in">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Languages size={24} color="#DB2777" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              Regional Language Resume & Bullet Translator
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748B' }}>
            ×
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '16px' }}>
          Draft your achievements in Hindi or Hinglish — get an ATS-optimized professional English bullet point!
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Source Language:</label>
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} style={{ fontSize: '0.78rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
              <option value="Hinglish">Hinglish</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
            </select>
          </div>
          <textarea 
            className="form-control"
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type in your regional language or Hinglish..."
          />
        </div>

        <button onClick={handleTranslate} className="btn-primary" disabled={translating} style={{ width: '100%', justifyCenter: 'center', marginBottom: '16px' }}>
          <Sparkles size={16} />
          <span>{translating ? "Translating & Polishing Tone..." : "Translate & Professionalize to English"}</span>
        </button>

        {translatedText && (
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase' }}>
                PROFESSIONAL ENGLISH ATS BULLET
              </span>
              <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                {copied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 600, lineHeight: '1.5' }}>
              "{translatedText}"
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
