import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Activity } from 'lucide-react';

/**
 * ScrollTelemetryHUD
 * Floating interactive scroll telemetry pill anchored in the bottom right corner across all pages.
 * Displays live scroll progress via an animated SVG circular ring and percentage counter,
 * with 1-click smooth jump-to-top.
 */
export function ScrollTelemetryHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          
          if (totalHeight > 0) {
            const pct = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
            setScrollProgress(pct);
          }

          setIsVisible(currentScroll > 220);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else if (window.locomotiveScroll) {
      window.locomotiveScroll.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // SVG Circular progress mathematics (Radius = 16, Circumference = 2 * PI * 16 ≈ 100.53)
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99990,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            backgroundColor: 'rgba(10, 19, 37, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(0, 240, 255, 0.35)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 20px rgba(0, 240, 255, 0.2)',
            borderRadius: '999px',
            padding: '0.35rem 0.65rem 0.35rem 0.45rem',
            cursor: 'pointer',
            userSelect: 'none',
            color: '#ffffff'
          }}
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          aria-label={`Scroll to top (${scrollProgress}% scrolled)`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          {/* Circular Progress Gauge */}
          <div style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background Ring Track */}
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2.5"
              />
              {/* Active Progress Gradient Ring */}
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="url(#scrollGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 0.15s ease'
                }}
              />
              <defs>
                <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0071ba" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#E85874" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Arrow Icon */}
            <motion.div
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, repeatType: 'reverse', duration: 0.4 }}
              style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArrowUp size={15} color="#00f0ff" />
            </motion.div>
          </div>

          {/* Telemetry Text (Percentage & Label) */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em', minWidth: '28px' }}>
                {scrollProgress}%
              </span>
              <Activity size={10} color="#00f0ff" style={{ opacity: 0.8 }} />
            </div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isHovered ? 'TOP ↑' : 'PAGE'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

