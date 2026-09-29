import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onGetStarted }) {
  return (
    <footer style={{ marginTop: '50px', paddingBottom: '30px' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2D1B4E 0%, #3A2D5C 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 12px 32px rgba(45, 27, 78, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F6DCEC',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '10px'
              }}>
                <Sparkles size={16} color="#B9A0E8" />
                <span>SKILLAURA MISSION</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                Your Dream Career is a Journey, Not a Destination
              </h2>
              <p style={{ color: '#EAE2F8', fontSize: '0.95rem', lineHeight: '1.6' }}>
                SkillAura empowers students with real-time employability scores, AI mock practice, and curated tech opportunities across India.
              </p>
            </div>

            <div>
              <button 
                onClick={onGetStarted}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '0.95rem' }}
              >
                <span>Explore Career Paths</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(234, 226, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.82rem',
            color: '#B9A0E8'
          }}>
            <div>
              © 2026 <strong>SkillAura</strong>. Student Employability & Placement Guidance Platform.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>College TPO Network</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
