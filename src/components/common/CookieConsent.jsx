import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CookieConsent = () => {
  const { setCurrentView } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('atpl_cookie_consent');
      if (!consent) {
        // Show after a subtle 1-second delay so it doesn't jarringly block initial render
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // In case localStorage is blocked
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('atpl_cookie_consent', 'accepted_all');
      localStorage.setItem('atpl_cookie_consent_timestamp', new Date().toISOString());
    } catch (e) {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('atpl_cookie_consent', 'essential_only');
      localStorage.setItem('atpl_cookie_consent_timestamp', new Date().toISOString());
    } catch (e) {}
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('atpl_cookie_consent', 'dismissed');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      style={{
        position: 'fixed',
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        left: '1rem',
        right: '1rem',
        maxWidth: '540px',
        margin: '0 auto',
        zIndex: 9980,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1.2px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.75), 0 0 25px rgba(0, 113, 186, 0.3)',
        color: '#ffffff',
        animation: 'cookieSlideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes cookieSlideUpFade {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 640px) {
          .cookie-consent-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cookie-btn-primary, .cookie-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 113, 186, 0.25)',
            border: '1px solid #0071ba',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            flexShrink: 0
          }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
              Privacy &amp; Cookie Compliance
            </span>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8' }}>
              ISO 9001:2015 &amp; GDPR Compliant Session Persistence
            </span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss cookie notice"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '0.35rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <X size={18} />
        </button>
      </div>

      <p style={{
        fontSize: '0.8rem',
        lineHeight: 1.5,
        color: '#cbd5e1',
        margin: '0 0 0.85rem 0'
      }}>
        We use strictly necessary cookies to ensure platform reliability, CSRF security, and multilingual translation. Non-essential tracking is disabled by default. Read our{' '}
        <button
          onClick={() => {
            setCurrentView('privacy');
            setIsVisible(false);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#38bdf8',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          Privacy Policy
        </button>.
      </p>

      <div className="cookie-consent-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
        <button
          onClick={handleAcceptAll}
          className="cookie-btn-primary"
          style={{
            backgroundColor: '#0071ba',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.55rem 1rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            boxShadow: '0 4px 12px rgba(0, 113, 186, 0.4)',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
        >
          <Check size={14} />
          <span>Accept All</span>
        </button>

        <button
          onClick={handleEssentialOnly}
          className="cookie-btn-secondary"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '0.55rem 0.9rem',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
        >
          <span>Essential Only</span>
        </button>
      </div>
    </div>
  );
};
