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
          
          {/* Header Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#00f0ff',
              marginBottom: '0.75rem',
              width: 'fit-content'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
            <span>OPERATIONAL BENCHMARK // 250+ CONNECTED MEGA-PLANTS</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 0.5rem 0'
            }}
          >
            Why ATPL for <span style={{ color: '#00f0ff', textShadow: '0 0 25px rgba(0, 240, 255, 0.45)' }}>Factory Automation</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)',
              lineHeight: 1.55,
              color: '#94a3b8',
              margin: '0 0 1.75rem 0',
              maxWidth: '850px'
            }}
          >
            Direct engineering integration with in-house software, guaranteed &lt;4-hr SLAs, and native SAP/Oracle synchronization.
          </p>

          {/* The Dual Animated Split Comparison (ATPL Way vs Without ATPL) */}
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
