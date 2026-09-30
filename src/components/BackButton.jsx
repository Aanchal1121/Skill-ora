import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ 
  onGoBack, 
  title, 
  subtitle,
  label = 'Back',
  style = {}
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      ...style
    }}>
      <button
        onClick={onGoBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '20px',
          background: '#FAF7FF',
          border: '1.5px solid #EAE2F8',
          color: '#9333EA',
          fontSize: '0.88rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(147, 51, 234, 0.08)',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F0EAFA';
          e.currentTarget.style.borderColor = '#C084FC';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FAF7FF';
          e.currentTarget.style.borderColor = '#EAE2F8';
          e.currentTarget.style.transform = 'none';
        }}
        title="Go to previous page"
      >
        <ArrowLeft size={18} color="#9333EA" />
        <span>{label}</span>
      </button>

      {title && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2D1B4E', margin: 0, lineHeight: 1.2 }}>
            {title}
          </h2>
          {subtitle && (
            <span style={{ fontSize: '0.88rem', color: '#7A6F8A', marginTop: '2px' }}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
