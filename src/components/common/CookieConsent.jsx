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
        // Show after a subtle delay so it doesn't block initial LCP render
        const timer = setTimeout(() => setIsVisible(true), 2000);
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
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="cookie-consent-bar"
      style={{
        position: 'fixed',
        bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 1.5rem)',
        maxWidth: '720px',
        zIndex: 9980,
        backgroundColor: 'rgba(11, 19, 36, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(56, 189, 248, 0.28)',
        borderRadius: '12px',
        padding: '0.65rem 0.95rem',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.55), 0 0 16px rgba(0, 113, 186, 0.2)',
        color: '#ffffff',
        animation: 'cookieSlideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes cookieSlideUpFade {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .cookie-consent-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .cookie-consent-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.80rem;
          color: #cbd5e1;
          flex: 1;
          min-width: 240px;
          line-height: 1.4;
        }
        .cookie-consent-actions {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .cookie-consent-bar {
            width: calc(100% - 1rem) !important;
            padding: 0.55rem 0.75rem !important;
            bottom: max(0.5rem, env(safe-area-inset-bottom, 0.5rem)) !important;
          }
          .cookie-consent-text {
            font-size: 0.74rem !important;
            min-width: 100% !important;
          }
          .cookie-consent-actions {
            width: 100% !important;
            justify-content: flex-end !important;
            margin-top: 0.25rem !important;
          }
        }
      `}</style>

      <div className="cookie-consent-flex">
        <div className="cookie-consent-text">
          <ShieldCheck size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
          <span>
            We use essential cookies for platform stability &amp; security.{' '}
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
                fontSize: 'inherit',
                fontWeight: 600
              }}
            >
              Privacy Policy
            </button>
          </span>
        </div>

        <div className="cookie-consent-actions">
          <button
            onClick={handleEssentialOnly}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '6px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '36px',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
          >
            Essential Only
          </button>

          <button
            onClick={handleAcceptAll}
            style={{
              backgroundColor: '#0071ba',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 8px rgba(0, 113, 186, 0.4)',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
          >
            <Check size={13} />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss cookie notice"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '36px',
              minHeight: '36px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
