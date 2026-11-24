import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AtplSplitComparison } from './AtplSplitComparison';
import { 
  ArrowRight, 
  PhoneCall, 
  Bot, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';

// Tactile sound effect for interactive controls & pill drag/hover
const playChime = (freq = 587.33) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch {
    // AudioContext muted/unsupported
  }
};

// Archie Showcase Camera & Presentation Feeds
const ARCHIE_FEEDS = {
  presentation: {
    id: 'presentation',
    label: '4K Presentation',
    video: '/assets/videos/archie_presentation.mp4',
    poster: '/assets/videos/posters/archie_presentation.jpg',
    status: '• PRESENTING CAPABILITIES',
    statusColor: '#00f0ff',
    badge: 'ARCHIE // 4K SMART FACTORY AGENT'
  },
  waving: {
    id: 'waving',
    label: 'Shopfloor Telemetry',
    video: '/assets/videos/robot_waving_agent.mp4',
    poster: '/assets/videos/posters/robot_waving_agent.jpg',
    status: '• ACTIVE & TRACKING',
    statusColor: '#10b981',
    badge: 'ARCHIE // SHOPFLOOR AGENT'
  },
  tracking: {
    id: 'tracking',
    label: 'Camera Lock',
    video: '/assets/videos/robot_waving_at_camera.mp4',
    poster: '/assets/videos/posters/robot_waving_at_camera.jpg',
    status: '• FOCAL LOCK ON LINE #4',
    statusColor: '#38bdf8',
    badge: 'ARCHIE // OPTICAL INSPECTION'
  }
};

export const Archie3DRobotSection = () => {
  const { openDemoModal } = useApp();
  const [isInView, setIsInView] = useState(true);
  const [activeFeed, setActiveFeed] = useState('presentation');
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

      {/* GPU CSS Keyframe Animations for Zero DOM Mutations */}
      <style>{`
        .archie-master-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .archie-master-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 2.75rem;
          }
        }
        .archie-dual-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 580px) {
          .archie-dual-cards {
            grid-template-columns: 1fr 1fr;
            gap: 1.15rem;
          }
        }

        /* 1. Pure GPU CSS Zero-Gravity Float Keyframes */
        @keyframes atplPillFloat {
          0%, 100% {
            transform: translate3d(calc(-50% + var(--px-min, -2px)), calc(-50% + var(--py-min, -5px)), 0) rotate(var(--rot-base, 0deg));
          }
          50% {
            transform: translate3d(calc(-50% + var(--px-max, 2px)), calc(-50% + var(--py-max, 5px)), 0) rotate(calc(var(--rot-base, 0deg) + 2deg));
          }
        }

        /* 2. Pure GPU CSS Rain Waterfall Keyframes */
        @keyframes atplPillRain {
          0% {
            transform: translate3d(-50%, -70px, 0) rotate(calc(var(--rot-start) - 6deg));
            opacity: 0;
          }
          10% {
            opacity: var(--pill-max-opacity);
          }
          90% {
            opacity: var(--pill-max-opacity);
          }
          100% {
            transform: translate3d(-50%, 430px, 0) rotate(calc(var(--rot-start) + 8deg));
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .archie-pill-anim, .archie-rain-anim {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Master Grid: Left Animated Dribbble Comparison + Right Waving Robot Video */}
        <div className="archie-master-grid">

          {/* =======================================================================
              SIDE 1: THE ANIMATED COMPARISON (Floating "The ATPL Way" vs Falling "Without ATPL")
             ======================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
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
                margin: '0 0 1.25rem 0'
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
                gap: '12px',
                flexWrap: 'wrap'
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

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>✓ 250+ Plants Connected</span>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>✓ &lt;4-Hr Emergency SLA</span>
              </div>
            </div>

          </div>

          {/* =======================================================================
              SIDE 2: ARCHIE 4K ULTRA-HD AGENT VIDEO SHOWCASE
              (Google Flow 4K Archie gesturing toward blank holographic screen,
               with interactive camera feed switcher and live HUD overlays)
             ======================================================================= */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              backgroundColor: '#030c1c',
              border: '1.5px solid rgba(0, 240, 255, 0.35)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45), 0 0 35px rgba(0, 113, 186, 0.25)',
              aspectRatio: '16 / 11',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* The Active Robot Video Stream */}
            <video
              key={activeFeed}
              src={ARCHIE_FEEDS[activeFeed]?.video || ARCHIE_FEEDS.presentation.video}
              poster={ARCHIE_FEEDS[activeFeed]?.poster || ARCHIE_FEEDS.presentation.poster}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />

            {/* Subtle Atmospheric Top & Bottom Vignettes */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(3, 12, 28, 0.72) 0%, transparent 35%, transparent 60%, rgba(3, 12, 28, 0.88) 100%)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />

            {/* Top Status Header Badge + Multi-Feed Camera Switcher */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(5, 14, 32, 0.88)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 240, 255, 0.45)',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: '#00f0ff',
                    textTransform: 'uppercase'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
                  <Bot size={13} color="#00f0ff" />
                  <span>{ARCHIE_FEEDS[activeFeed]?.badge || 'ARCHIE // 4K SMART FACTORY AGENT'}</span>
                </div>

                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    color: ARCHIE_FEEDS[activeFeed]?.statusColor || '#10b981',
                    backgroundColor: 'rgba(5, 14, 32, 0.85)',
                    border: `1px solid ${ARCHIE_FEEDS[activeFeed]?.statusColor || '#10b981'}55`,
                    padding: '4px 11px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ARCHIE_FEEDS[activeFeed]?.statusColor || '#10b981' }} />
                  <span>{ARCHIE_FEEDS[activeFeed]?.status || '• LIVE STREAMING'}</span>
                </div>
              </div>

              {/* Feed Switcher Tabs */}
              <div
                style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(4, 12, 28, 0.82)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '999px',
                  padding: '3px',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  gap: '4px'
                }}
              >
                {Object.values(ARCHIE_FEEDS).map(feed => (
                  <button
                    key={feed.id}
                    type="button"
                    onClick={() => {
                      setActiveFeed(feed.id);
                      if (!isMuted) playChime(feed.id === 'presentation' ? 659.25 : 587.33);
                    }}
                    style={{
                      padding: '4px 11px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: activeFeed === feed.id ? 800 : 600,
                      backgroundColor: activeFeed === feed.id ? 'rgba(0, 113, 186, 0.9)' : 'transparent',
                      color: activeFeed === feed.id ? '#ffffff' : '#94a3b8',
                      border: activeFeed === feed.id ? '1px solid rgba(0, 240, 255, 0.5)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: activeFeed === feed.id ? '0 0 10px rgba(0, 240, 255, 0.35)' : 'none'
                    }}
                  >
                    {feed.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Holographic Telemetry Projected onto the Blank Glass Screen (Presentation Feed) */}
            {activeFeed === 'presentation' && (
              <div
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '6%',
                  width: '38%',
                  maxWidth: '210px',
                  backgroundColor: 'rgba(5, 14, 32, 0.65)',
                  backdropFilter: 'blur(6px)',
                  border: '1.5px solid rgba(0, 240, 255, 0.5)',
                  borderRadius: '14px',
                  padding: '0.75rem 0.85rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.25)',
                  zIndex: 5,
                  pointerEvents: 'none',
                  animation: 'atplPillFloat 3.8s ease-in-out infinite'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    • ATPL SYSTEM HUD
                  </span>
                  <span style={{ fontSize: '8.5px', color: '#10b981', fontWeight: 700 }}>60 FPS</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', lineHeight: 1.2 }}>
                  99.985%
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                  First-Pass Inspection Yield
                </div>
                <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(0, 240, 255, 0.2)', display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#38bdf8', fontWeight: 700 }}>
                  <span>SAP BAPI SYNC</span>
                  <span style={{ color: '#00f0ff' }}>4.8ms</span>
                </div>
              </div>
            )}

            {/* Bottom Floating Telemetry Card */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} color="#00f0ff" />
                  <span>INTELLIGENT AUTONOMOUS ASSISTANT</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  Live Plant Telemetry &amp; Cognitive Vision
                </div>
              </div>

              <button
                type="button"
                onClick={() => openDemoModal({ solution: 'Archie 3D Shopfloor Agent Walkthrough', notes: 'Inquiry from Archie Robot Section' })}
                style={{
                  backgroundColor: 'rgba(0, 240, 255, 0.18)',
                  color: '#00f0ff',
                  border: '1px solid rgba(0, 240, 255, 0.45)',
                  backdropFilter: 'blur(8px)',
                  padding: '7px 16px',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00f0ff';
                  e.currentTarget.style.color = '#020b18';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.18)';
                  e.currentTarget.style.color = '#00f0ff';
                }}
              >
                Request Walkthrough
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Archie3DRobotSection;
