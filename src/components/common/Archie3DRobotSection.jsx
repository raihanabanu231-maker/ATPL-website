import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AtplSplitComparison } from './AtplSplitComparison';
import { ArrowRight, PhoneCall } from 'lucide-react';

export const Archie3DRobotSection = () => {
  const { openDemoModal } = useApp();
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef(null);

  // Pause animations when section is scrolled out of viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="why-atpl"
      style={{
        position: 'relative',
        backgroundColor: '#040914',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(0, 113, 186, 0.18) 0%, transparent 65%)',
        color: '#ffffff',
        padding: 'clamp(3.5rem, 5.5vw, 5.5rem) 0 clamp(3.5rem, 5vw, 5rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {/* The Dual Animated Split Comparison (ATPL Way vs Without ATPL with Pro Physics Drops) */}
          <AtplSplitComparison />

          {/* Bottom Actions Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <button
              type="button"
              onClick={() => openDemoModal({ solution: 'Factory Automation Feasibility Audit', notes: 'Scheduled via Why ATPL Comparative Section' })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: '1px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '999px',
                padding: '11px 24px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0, 113, 186, 0.45), 0 0 15px rgba(0, 240, 255, 0.3)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span>Schedule Feasibility Audit</span>
              <ArrowRight size={14} />
            </button>

            <a
              href="tel:04435537618"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background-color 0.15s ease'
              }}
            >
              <PhoneCall size={14} color="#00f0ff" />
              <span>Call: 044 3553 7618</span>
            </a>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>✓ 250+ Plants Connected</span>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>✓ &lt;4-Hr Emergency SLA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Archie3DRobotSection;
