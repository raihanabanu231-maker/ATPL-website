import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
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

// =========================================================================
// The ATPL Way - Precision Luminous Badges (Floating Zero-Gravity)
// =========================================================================
const atplPills = [
  { id: 'p0', label: 'Live Real-Time Sync', bg: '#ffffff', color: '#040914', border: '1px solid rgba(255, 255, 255, 0.9)', top: '11%', left: '50%', rot: 0, floatY: [-4, 4], floatX: [-2, 2], dur: 3.4, delay: 0.05 },
  { id: 'p1', label: 'Native SAP & Oracle', bg: 'rgba(0, 113, 186, 0.95)', color: '#ffffff', border: '1px solid rgba(0, 240, 255, 0.5)', top: '21%', left: '34%', rot: -3, floatY: [-5, 5], floatX: [-3, 3], dur: 3.8, delay: 0.15 },
  { id: 'p2', label: '<4-Hr Emergency SLA', bg: 'rgba(2, 132, 199, 0.95)', color: '#ffffff', border: '1px solid rgba(56, 189, 248, 0.5)', top: '31%', left: '66%', rot: 4, floatY: [-6, 5], floatX: [3, -2], dur: 4.2, delay: 0.3 },
  { id: 'p3', label: '100% In-House WMS', bg: 'rgba(15, 23, 42, 0.95)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', top: '41%', left: '35%', rot: -2, floatY: [-7, 4], floatX: [2, -3], dur: 4.5, delay: 0.25 },
  { id: 'p4', label: 'Zero Scanner Tax', bg: '#ffffff', color: '#040914', border: '1px solid rgba(255, 255, 255, 0.9)', top: '51%', left: '68%', rot: 3, floatY: [-4, 6], floatX: [-2, 3], dur: 3.5, delay: 0.45 },
  { id: 'p5', label: 'Resident Engineers', bg: 'rgba(0, 113, 186, 0.95)', color: '#ffffff', border: '1px solid rgba(0, 240, 255, 0.5)', top: '61%', left: '33%', rot: -3, floatY: [-4, 5], floatX: [-3, 2], dur: 3.6, delay: 0.4 },
  { id: 'p6', label: 'IP67 Harsh Grade', bg: 'rgba(15, 23, 42, 0.95)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', top: '71%', left: '67%', rot: 4, floatY: [-5, 5], floatX: [-2, 3], dur: 3.9, delay: 0.35 },
  { id: 'p7', label: 'Lab Golden-Staged', bg: '#ffffff', color: '#040914', border: '1px solid rgba(255, 255, 255, 0.9)', top: '81%', left: '36%', rot: -2, floatY: [-5, 5], floatX: [2, -2], dur: 4.0, delay: 0.5 },
  { id: 'p8', label: 'Zero Line Standstills', bg: 'rgba(2, 132, 199, 0.95)', color: '#ffffff', border: '1px solid rgba(56, 189, 248, 0.5)', top: '91%', left: '52%', rot: 2, floatY: [-6, 4], floatX: [2, -3], dur: 4.3, delay: 0.2 }
];

// =========================================================================
// Without ATPL - Problem Box Waterfall (Alert Warning Palette)
// =========================================================================
const rainingPills = [
  { id: 'r0', label: 'Delayed Reports', bg: 'rgba(30, 41, 59, 0.85)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)', left: '22%', rot: -7, dur: 3.4, delay: 0.0, depth: 1 },
  { id: 'r1', label: 'Random Firmware', bg: 'rgba(30, 41, 59, 0.75)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.08)', left: '56%', rot: 8, dur: 4.1, delay: 0.25, depth: 0 },
  { id: 'r2', label: 'Unorganized IT', bg: 'rgba(30, 41, 59, 0.85)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)', left: '38%', rot: -6, dur: 3.5, delay: 0.5, depth: 1 },
  { id: 'r3', label: 'Overwhelming Bugs', bg: 'rgba(239, 68, 68, 0.22)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.45)', left: '76%', rot: 5, dur: 4.2, delay: 0.75, depth: 0 },
  { id: 'r4', label: 'Vendor Spam', bg: 'rgba(30, 41, 59, 0.85)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)', left: '18%', rot: -9, dur: 3.6, delay: 1.0, depth: 1 },
  { id: 'r5', label: '3 to 7 Days Delay', bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)', left: '68%', rot: 7, dur: 3.9, delay: 1.25, depth: 1 },
  { id: 'r6', label: 'Broken CSV Drops', bg: 'rgba(30, 41, 59, 0.75)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.08)', left: '44%', rot: -11, dur: 4.4, delay: 1.5, depth: 0 },
  { id: 'r7', label: 'Costly Lock-In', bg: 'rgba(30, 41, 59, 0.85)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)', left: '82%', rot: -4, dur: 3.7, delay: 1.75, depth: 1 },
  { id: 'r8', label: 'Hardware Burnout', bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)', left: '26%', rot: 6, dur: 4.0, delay: 2.0, depth: 0 },
  { id: 'r9', label: 'Line Standstills', bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)', left: '62%', rot: 4, dur: 3.5, delay: 2.25, depth: 1 },
  { id: 'r10', label: 'Drop-Ship Boxes', bg: 'rgba(30, 41, 59, 0.75)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.08)', left: '32%', rot: -8, dur: 4.3, delay: 2.5, depth: 0 },
  { id: 'r11', label: 'Zero SLA Support', bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)', left: '74%', rot: 6, dur: 3.8, delay: 2.75, depth: 1 },
  { id: 'r12', label: 'Manual Scans', bg: 'rgba(30, 41, 59, 0.85)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)', left: '20%', rot: -5, dur: 4.1, delay: 3.0, depth: 1 },
  { id: 'r13', label: 'Uncertified Cables', bg: 'rgba(30, 41, 59, 0.75)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.08)', left: '50%', rot: 10, dur: 3.6, delay: 3.25, depth: 0 },
  { id: 'r14', label: 'Inventory Drift', bg: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.5)', left: '80%', rot: -6, dur: 4.2, delay: 3.5, depth: 1 },
  { id: 'r15', label: 'Disjointed Middleware', bg: 'rgba(30, 41, 59, 0.75)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.08)', left: '35%', rot: 5, dur: 3.7, delay: 3.75, depth: 0 }
];

// =========================================================================
// ISOLATED TIMELINE CONTROLS (Cyber-Glass Aesthetic)
// =========================================================================
const SimulationTimelineControl = memo(({ isPlaying, setIsPlaying, isMuted, setIsMuted, isInView }) => {
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    if (!isPlaying || !isInView) return;
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : Number((prev + 0.4).toFixed(1))));
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying, isInView]);

  return (
    <div
      style={{
        marginTop: '0.85rem',
        marginBottom: '1.25rem',
        padding: '0.55rem 0.95rem',
        backgroundColor: 'rgba(5, 14, 32, 0.88)',
        backdropFilter: 'blur(10px)',
        borderRadius: '999px',
        border: '1.5px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}
    >
      {/* Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={() => {
          setIsPlaying(!isPlaying);
          if (!isMuted) playChime(isPlaying ? 440 : 659.25);
        }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#0071ba' : 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 0 12px rgba(0, 113, 186, 0.6)' : 'none',
          transition: 'all 0.15s ease',
          flexShrink: 0
        }}
        title={isPlaying ? 'Pause simulation animation' : 'Resume simulation animation'}
      >
        {isPlaying ? <Pause size={13} /> : <Play size={13} style={{ marginLeft: '1px' }} />}
      </button>

      {/* Sound Chime Toggle Button */}
      <button
        type="button"
        onClick={() => {
          setIsMuted(!isMuted);
          if (isMuted) playChime(659.25);
        }}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: isMuted ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 240, 255, 0.15)',
          color: isMuted ? '#64748b' : '#00f0ff',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          flexShrink: 0
        }}
        title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
      >
        {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
      </button>

      {/* Interactive Scrubber Track Bar */}
      <div 
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
          setProgress(Number(newProgress.toFixed(1)));
          if (!isMuted) playChime(523.25 + (newProgress * 3));
        }}
        style={{
          flex: 1,
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
        title="Click or scrub along the simulation timeline"
      >
        <div 
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0071ba 0%, #00f0ff 60%, #E85874 100%)',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.6)',
            borderRadius: '999px',
            transition: isPlaying ? 'width 0.1s linear' : 'none'
          }}
        />
      </div>

      {/* Live Timecode & Rewind */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.72rem',
          fontFamily: 'monospace',
          fontWeight: 700,
          color: '#94a3b8',
          flexShrink: 0
        }}
      >
        <span>{`00:${String(Math.floor((progress / 100) * 20)).padStart(2, '0')}`} / 00:20</span>
        <button
          type="button"
          onClick={() => {
            setProgress(0);
            if (!isMuted) playChime(523.25);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Rewind to 00:00"
        >
          <RotateCcw size={11} />
        </button>
      </div>
    </div>
  );
});

export const Archie3DRobotSection = () => {
  const { openDemoModal } = useApp();
  const [hoveredPill, setHoveredPill] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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

            {/* The Dual Animated Cards Side-by-Side (High-Contrast Cyber-Glass Theme) */}
            <div className="archie-dual-cards">
              
              {/* Card 1: "The ATPL way" (Deep Cyber Glass with Glowing Floating Zero-Gravity Pills) */}
              <div
                style={{
                  height: '410px',
                  backgroundColor: 'rgba(6, 18, 38, 0.88)',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(0, 240, 255, 0.35)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 113, 186, 0.22)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Centered Top Pill Header */}
                <div
                  style={{
                    paddingTop: '0.95rem',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 25
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid rgba(0, 240, 255, 0.4)',
                      boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
                      borderRadius: '999px',
                      padding: '0.32rem 1.05rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.80rem',
                      fontWeight: 800,
                      color: '#ffffff'
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
                    <span>The</span>
                    <span style={{ color: '#00f0ff' }}>ATPL</span>
                    <span>way</span>
                  </div>
                </div>

                {/* Zero-Gravity Floating Pills (GPU Composited) */}
                <div
                  style={{
                    position: 'relative',
                    flex: 1,
                    width: '100%',
                    overflow: 'hidden'
                  }}
                >
                  {atplPills.map((pill) => {
                    const isHovered = hoveredPill === pill.id;
                    return (
                      <motion.div
                        key={pill.id}
                        drag
                        dragConstraints={{ left: -30, right: 30, top: -25, bottom: 25 }}
                        dragElastic={0.25}
                        whileDrag={{ scale: 1.12, cursor: 'grabbing', zIndex: 45 }}
                        onHoverStart={() => {
                          setHoveredPill(pill.id);
                          if (!isMuted) playChime(587.33);
                        }}
                        onHoverEnd={() => setHoveredPill(null)}
                        whileHover={{
                          scale: 1.08,
                          zIndex: 40,
                          boxShadow: '0 0 24px rgba(0, 240, 255, 0.55)'
                        }}
                        className="archie-pill-anim"
                        style={{
                          position: 'absolute',
                          top: pill.top,
                          left: pill.left,
                          '--px-min': `${pill.floatX[0]}px`,
                          '--px-max': `${pill.floatX[1]}px`,
                          '--py-min': `${pill.floatY[0]}px`,
                          '--py-max': `${pill.floatY[1]}px`,
                          '--rot-base': `${pill.rot}deg`,
                          animation: `atplPillFloat ${pill.dur}s ease-in-out ${pill.delay}s infinite`,
                          animationPlayState: isPlaying && isInView && !isHovered ? 'running' : 'paused',
                          willChange: 'transform',
                          backgroundColor: pill.bg,
                          color: pill.color,
                          border: pill.border,
                          borderRadius: '999px',
                          padding: '0.38rem 0.86rem',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          lineHeight: 1,
                          whiteSpace: 'nowrap',
                          boxShadow: isHovered 
                            ? '0 0 24px rgba(0, 240, 255, 0.65)' 
                            : '0 4px 16px rgba(0, 0, 0, 0.4)',
                          cursor: 'grab',
                          userSelect: 'none',
                          zIndex: isHovered ? 35 : 10,
                          transformOrigin: 'center center'
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              backgroundColor: pill.color === '#040914' ? '#0071ba' : '#00f0ff',
                              boxShadow: `0 0 6px ${pill.color === '#040914' ? '#0071ba' : '#00f0ff'}`
                            }}
                          />
                          <span>{pill.label}</span>
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: "Without ATPL" (Warning Crimson Glass with Falling Problem Boxes) */}
              <div
                style={{
                  height: '410px',
                  backgroundColor: 'rgba(20, 8, 14, 0.88)',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(239, 68, 68, 0.35)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(239, 68, 68, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Centered Top Pill Header */}
                <div
                  style={{
                    paddingTop: '0.95rem',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 25
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      boxShadow: '0 0 14px rgba(239, 68, 68, 0.25)',
                      borderRadius: '999px',
                      padding: '0.32rem 1.05rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.80rem',
                      fontWeight: 700,
                      color: '#f87171'
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
                    <span>Without ATPL</span>
                  </div>
                </div>

                {/* Faint Background Watermark */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    opacity: 0.3,
                    zIndex: 1
                  }}
                >
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Non-Stop Issues • Production Delays
                  </div>
                </div>

                {/* CONTINUOUS FALLING RAIN OF BOXES (Pure GPU CSS Compositor) */}
                <div
                  style={{
                    position: 'relative',
                    flex: 1,
                    width: '100%',
                    overflow: 'hidden',
                    zIndex: 2
                  }}
                >
                  {rainingPills.map((pill) => (
                    <div
                      key={pill.id}
                      className="archie-rain-anim"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: pill.left,
                        '--rot-start': `${pill.rot}deg`,
                        '--pill-max-opacity': pill.depth === 1 ? 0.95 : 0.65,
                        animation: `atplPillRain ${pill.dur}s linear ${pill.delay}s infinite`,
                        animationPlayState: isPlaying && isInView ? 'running' : 'paused',
                        willChange: 'transform, opacity',
                        backgroundColor: pill.bg,
                        color: pill.color,
                        border: pill.border,
                        borderRadius: '999px',
                        padding: '0.34rem 0.76rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        filter: pill.depth === 0 ? 'blur(0.2px)' : 'none',
                        zIndex: pill.depth === 1 ? 5 : 2
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.68rem', opacity: 0.75, color: '#ef4444' }}>✕</span>
                        <span>{pill.label}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive Timeline & Player Controls (Isolated Subcomponent) */}
            <SimulationTimelineControl 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isInView={isInView}
            />

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
              SIDE 2: FULL-QUALITY WAVING ROBOT AGENT VIDEO SHOWCASE
              (High-def authentic robot waving at camera with live HUD telemetry)
             ======================================================================= */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              backgroundColor: '#030c1c',
              border: '1.5px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 30px rgba(0, 113, 186, 0.18)',
              aspectRatio: '1 / 1',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* The Authentic Robot Waving Video */}
            <video
              src="/assets/videos/robot_waving_agent.mp4"
              poster="/assets/videos/posters/robot_waving_agent.jpg"
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

            {/* Subtle Top & Bottom Gradient Vignettes */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(3, 12, 28, 0.65) 0%, transparent 35%, transparent 65%, rgba(3, 12, 28, 0.85) 100%)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />

            {/* Top Status Header Badge */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(5, 14, 32, 0.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#00f0ff',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
                <Bot size={13} color="#00f0ff" />
                <span>ARCHIE // AI SHOPFLOOR AGENT</span>
              </div>

              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span>ACTIVE &amp; TRACKING</span>
              </div>
            </div>

            {/* Bottom Floating Telemetry Card */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '1.25rem',
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
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
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
