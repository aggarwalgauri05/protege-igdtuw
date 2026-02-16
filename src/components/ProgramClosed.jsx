import React, { useEffect, useState } from 'react';
import { X, Sparkles, Bell } from 'lucide-react';

const ProgramClosed = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1a1a 100%)',
          border: '1px solid rgba(32,178,170,0.3)',
          borderRadius: '28px',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 0 80px rgba(32,178,170,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#666', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#666'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'rgba(32,178,170,0.1)',
          border: '1px solid rgba(32,178,170,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.75rem',
        }}>
          <Sparkles size={32} color="#20B2AA" />
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 900,
          letterSpacing: '0.04em',
          background: 'linear-gradient(135deg, #20B2AA 0%, #f2f1f4 50%, #20B2AA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>
          XSEED Forms Are Closed
        </h2>

        {/* Divider */}
        <div style={{
          width: '48px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #20B2AA, transparent)',
          margin: '1.25rem auto',
          borderRadius: '2px',
        }} />

        {/* Message */}
        <p style={{
          color: '#cbd5e1',
          fontSize: '1.05rem',
          lineHeight: 1.75,
          fontFamily: "'Georgia', serif",
          marginBottom: '0.5rem',
        }}>
          Applications for this cohort have closed.
        </p>
        <p style={{
          color: '#666',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          We'd love to have you next time — the next cohort opens soon.
        </p>

        {/* See you next year badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.6rem 1.4rem',
          background: 'rgba(32,178,170,0.08)',
          border: '1px solid rgba(32,178,170,0.25)',
          borderRadius: '50px',
          color: '#20B2AA',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          marginBottom: '2rem',
        }}>
          <Bell size={14} />
          See you next year 👋
        </div>

        {/* Dismiss */}
        <br />
        <button
          onClick={handleClose}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px',
            padding: '14px 40px',
            fontSize: '0.95rem', fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'capitalize',
            border: '2px solid #20b2aa',
            background: 'transparent', color: '#20b2aa',
            cursor: 'pointer', borderRadius: '50px',
            fontFamily: "'Georgia', serif",
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(32,178,170,0.1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(32,178,170,0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Got it →
        </button>
      </div>
    </div>
  );
};

export default ProgramClosed;