import React, { useState } from 'react';
import { Sparkles, X, MessageSquare } from 'lucide-react';
import CareerChatbot from './CareerChatbot';

export default function FloatingChatbotWidget({ language }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      {isOpen ? (
        <div style={{
          width: '380px',
          maxHeight: '560px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 16px 40px rgba(147, 51, 234, 0.25)',
          border: '1.5px solid #EAE2F8',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }} className="fade-in">
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>SkillAura Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '12px', flexGrow: 1, overflowY: 'auto' }}>
            <CareerChatbot language={language} isFloatingPanel={true} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            borderRadius: '30px',
            padding: '12px 20px',
            border: 'none',
            boxShadow: '0 8px 24px rgba(147, 51, 234, 0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all 0.25s ease'
          }}
          className="fade-in"
        >
          <Sparkles size={18} />
          <span>SkillAura Assistant</span>
        </button>
      )}
    </div>
  );
}
