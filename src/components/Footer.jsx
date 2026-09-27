import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ onGetStarted, language = "English" }) {
  const t = translations[language] || translations.English;

  return (
    <footer style={{ marginTop: '60px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="mission-banner">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '700px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#818CF8',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '12px'
              }}>
                <Sparkles size={18} />
                <span>CAREERLEAP MISSION</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                {t.footerMissionTitle}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: '1.6' }}>
                {t.footerMissionSub}
              </p>
            </div>

            <div>
              <button 
                onClick={onGetStarted}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <span>{t.getStarted}</span>
              </button>
            </div>
          </div>

          {/* Bottom Copyright & Links */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.88rem',
            color: '#94A3B8'
          }}>
            <div>
              © 2024-2026 <strong>CareerLeap AI</strong>. NEP 2020 & Skill India Aligned.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span style={{ cursor: 'pointer' }}>Privacy (DPDP Act 2023 Compliant)</span>
              <span style={{ cursor: 'pointer' }}>Government Schemes</span>
              <span style={{ cursor: 'pointer' }}>College TPO Portal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
