import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { 
  RotateCcw, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Check, 
  X,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';

// =========================================================================
// 1. DATA DEFINITIONS (10 Pairs, Index Matched)
// =========================================================================
export const ROWS = [
  { id: 0, atpl: 'Live Real-Time Sync', problem: 'Inventory Drift', alignAtpl: 'flex-start', alignProb: 'flex-end', rotAtpl: -1.4, rotProb: 1.6 },
  { id: 1, atpl: 'Native SAP & Oracle', problem: 'Middleware Mess', alignAtpl: 'flex-end', alignProb: 'flex-start', rotAtpl: 1.2, rotProb: -1.5 },
  { id: 2, atpl: '<4-Hr Emergency SLA', problem: '3 to 7 Days Delay', alignAtpl: 'flex-start', alignProb: 'flex-end', rotAtpl: -1.8, rotProb: 1.4 },
  { id: 3, atpl: '100% In-House WMS', problem: 'Unorganized IT', alignAtpl: 'flex-end', alignProb: 'flex-start', rotAtpl: 1.5, rotProb: -1.2 },
  { id: 4, atpl: 'Zero Scanner Tax', problem: 'Manual Scans', alignAtpl: 'flex-start', alignProb: 'flex-end', rotAtpl: -1.1, rotProb: 1.8 },
  { id: 5, atpl: 'Resident Engineers', problem: 'Vendor Spam', alignAtpl: 'flex-end', alignProb: 'flex-start', rotAtpl: 1.3, rotProb: -1.4 },
  { id: 6, atpl: 'IP67 Harsh Grade', problem: 'Broken Components', alignAtpl: 'flex-start', alignProb: 'flex-end', rotAtpl: -1.5, rotProb: 1.2 },
  { id: 7, atpl: 'Lab Golden-Staged', problem: 'Random Firmware', alignAtpl: 'flex-end', alignProb: 'flex-start', rotAtpl: 1.6, rotProb: -1.7 },
  { id: 8, atpl: 'Open Standards', problem: 'Costly Lock-In', alignAtpl: 'flex-start', alignProb: 'flex-end', rotAtpl: -1.2, rotProb: 1.5 },
  { id: 9, atpl: 'Zero Line Standstills', problem: 'Line Standstills', alignAtpl: 'flex-end', alignProb: 'flex-start', rotAtpl: 1.0, rotProb: -1.3 }
];

// =========================================================================
// 2. ANIMATION TIMING CONFIGURATION (TUNE ALL PARAMETERS HERE)
// =========================================================================
export const ANIM_CONFIG = {
  // Stagger between rows in seconds
  rowStagger: 0.30, 
  // Fall duration per chip in seconds
  fallDuration: 1.10, 
  // Drop initial tilt angle in degrees (-14deg left, +14deg right)
  tiltLeft: -14,
  tiltRight: 14,
  // Bounce physics: first rebound up 62px, second rebound 15px
  firstBounceHeight: 62, 
  secondBounceHeight: 15,
  // Impact effects duration in ms
  impactDuration: 700,
  sparkCount: 7,
  // Idle floating loop duration in seconds
  floatDuration: 4.5,
  floatDisplacement: 6,
  // Pair highlight auto-cycle interval in ms
  pairCycleInterval: 2400,
  // 3D Panel Tilt Angles (degrees)
  maxTiltX: 5,
  maxTiltY: 7,
  perspective: 1400
};

// =========================================================================
// 3. STATS COUNT-UP COMPONENT (Shown after chips land)
// =========================================================================
const StatCard = memo(({ label, targetValue, prefix = '', suffix = '', subtext, icon: Icon, color = '#00f0ff' }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.round(ease * targetValue));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const id = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(id);
  }, [targetValue]);

  return (
    <div
      style={{
        flex: '1 1 240px',
        background: 'rgba(5, 14, 30, 0.85)',
        border: `1.5px solid ${color}40`,
        borderRadius: '16px',
        padding: '1.25rem 1.4rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${color}20`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
        <Icon size={18} color={color} />
      </div>
      <div style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
        <span style={{ color }}>{prefix}</span>
        {val}
        <span style={{ color }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.4 }}>
        {subtext}
      </div>
    </div>
  );
});

// =========================================================================
// 4. MAIN ATPL SPLIT COMPARISON COMPONENT
// =========================================================================
export const AtplSplitComparison = memo(() => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const sparksOverlayRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  const atplRefs = useRef([]);
  const probRefs = useRef([]);
  const animInstancesRef = useRef([]);
  const timersRef = useRef([]);

  // Reduced motion preference
  const prefersReduced = useReducedMotion();

  // Scroll in-view trigger
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  // Animation lifecycle states
  const [hasStarted, setHasStarted] = useState(false);
  const [landedRows, setLandedRows] = useState(new Set());
  const [allLanded, setAllLanded] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);

  // Pair highlight states
  const [activeRow, setActiveRow] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [lineCoords, setLineCoords] = useState(null);

  // 3D tilt coordinates & cursor glow
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Clear all pending timers and animations
  const cleanupAllAnimations = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    animInstancesRef.current.forEach(a => {
      try { a.cancel(); } catch (e) {}
    });
    animInstancesRef.current = [];
  }, []);

  // Spawn landing impact ring and 7 upward glowing sparks
  const triggerImpact = useCallback((el, color) => {
    if (!el || !sparksOverlayRef.current) return;
    const rect = el.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect() || rect;
    const x = rect.left + rect.width / 2 - parentRect.left;
    const y = rect.bottom - parentRect.top;

    // 1. Expanding Elliptical Ring
    const ring = document.createElement('div');
    ring.className = 'impact-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.borderColor = color;
    ring.style.boxShadow = `0 0 16px ${color}`;
    sparksOverlayRef.current.appendChild(ring);
    setTimeout(() => ring.remove(), ANIM_CONFIG.impactDuration);

    // 2. Seven upward flying glowing sparks
    for (let s = 0; s < ANIM_CONFIG.sparkCount; s++) {
      const spark = document.createElement('div');
      spark.className = 'impact-spark';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 8px ${color}, 0 0 2px #ffffff`;
      sparksOverlayRef.current.appendChild(spark);

      // Random upward fan angle (-150deg to -30deg)
      const angle = (-150 + Math.random() * 120) * (Math.PI / 180);
      const dist = 22 + Math.random() * 40;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist;

      spark.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`, opacity: 0 }
      ], {
        duration: ANIM_CONFIG.impactDuration,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }).onfinish = () => spark.remove();
    }
  }, []);

  // Run the physics drop animation sequence
  const startDropAnimation = useCallback(() => {
    cleanupAllAnimations();
    setHasStarted(true);
    setLandedRows(new Set());
    setAllLanded(false);
    setIsReplaying(true);

    const fallMs = ANIM_CONFIG.fallDuration * 1000;
    const staggerMs = ANIM_CONFIG.rowStagger * 1000;

    ROWS.forEach((row, i) => {
      const delayMs = i * staggerMs;

      // Drop distance calculation: start above the top border of the panel
      // so chips enter from the top edge and are clipped by overflow:hidden
      const dropDistance = 110 + i * 46;

      // 1. Trigger falling animation at staggered time
      const timerDrop = setTimeout(() => {
        const atplEl = atplRefs.current[row.id];
        const probEl = probRefs.current[row.id];

        // Shared realistic gravity keyframes:
        // - Ease-in fall
        // - Impact squash (1.14 x 0.76)
        // - Bounce up 62px
        // - Land squash (1.06 x 0.90)
        // - Small bounce 15px
        // - Settle
        const buildKeyframes = (initialTilt) => [
          { transform: `translate3d(0, -${dropDistance}px, 0) rotate(${initialTilt}deg) scale(1, 1)`, opacity: 0, offset: 0 },
          { transform: `translate3d(0, -${dropDistance * 0.9}px, 0) rotate(${initialTilt * 0.9}deg) scale(1, 1)`, opacity: 1, offset: 0.06 },
          { transform: `translate3d(0, 0px, 0) rotate(0deg) scale(1.14, 0.76)`, opacity: 1, offset: 0.58 }, // First impact!
          { transform: `translate3d(0, -${ANIM_CONFIG.firstBounceHeight}px, 0) rotate(${initialTilt * 0.12}deg) scale(0.96, 1.05)`, opacity: 1, offset: 0.73 }, // Rebound 62px
          { transform: `translate3d(0, 0px, 0) rotate(0deg) scale(1.06, 0.90)`, opacity: 1, offset: 0.86 }, // Second landing
          { transform: `translate3d(0, -${ANIM_CONFIG.secondBounceHeight}px, 0) rotate(0deg) scale(0.98, 1.02)`, opacity: 1, offset: 0.94 }, // Rebound 15px
          { transform: `translate3d(0, 0px, 0) rotate(0deg) scale(1, 1)`, opacity: 1, offset: 1 } // Settled
        ];

        if (atplEl) {
          const animLeft = atplEl.animate(buildKeyframes(ANIM_CONFIG.tiltLeft), {
            duration: fallMs,
            easing: 'linear',
            fill: 'forwards'
          });
          animInstancesRef.current.push(animLeft);
        }

        if (probEl) {
          const animRight = probEl.animate(buildKeyframes(ANIM_CONFIG.tiltRight), {
            duration: fallMs,
            easing: 'linear',
            fill: 'forwards'
          });
          animInstancesRef.current.push(animRight);
        }

        // 2. Impact sparks & ring at 58% of fall duration (exact landing point)
        const impactDelay = fallMs * 0.58;
        const timerImpact = setTimeout(() => {
          triggerImpact(atplRefs.current[row.id], '#00f0ff');
          triggerImpact(probRefs.current[row.id], '#ef4444');
        }, impactDelay);
        timersRef.current.push(timerImpact);

        // 3. Mark row as landed when settle completes
        const timerLanded = setTimeout(() => {
          setLandedRows(prev => new Set(prev).add(row.id));

          // If this is the last row (Row 9), trigger all-landed state and stat cards
          if (i === ROWS.length - 1) {
            setAllLanded(true);
            setIsReplaying(false);
          }
        }, fallMs);
        timersRef.current.push(timerLanded);

      }, delayMs);

      timersRef.current.push(timerDrop);
    });
  }, [cleanupAllAnimations, triggerImpact]);

  // Autostart when scrolled into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      startDropAnimation();
    }
  }, [isInView, hasStarted, startDropAnimation]);

  // Replay animation button click
  const handleReplay = useCallback(() => {
    startDropAnimation();
  }, [startDropAnimation]);

  // Pair highlight auto-cycling every 2.4s (active only after all chips land, pauses on hover)
  useEffect(() => {
    if (!allLanded || isMouseOver) return;

    const timer = setInterval(() => {
      setActiveRow(prev => (prev + 1) % ROWS.length);
    }, ANIM_CONFIG.pairCycleInterval);

    return () => clearInterval(timer);
  }, [allLanded, isMouseOver]);

  // Which row is currently highlighted (hover overrides auto-cycle)
  const effectiveActiveRow = hoveredRow !== null ? hoveredRow : (allLanded ? activeRow : null);

  // Compute animated connecting dashed line coordinates
  const updateLine = useCallback(() => {
    if (effectiveActiveRow === null || !containerRef.current) {
      setLineCoords(null);
      return;
    }
    const atplEl = atplRefs.current[effectiveActiveRow];
    const probEl = probRefs.current[effectiveActiveRow];
    if (!atplEl || !probEl) {
      setLineCoords(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const atplRect = atplEl.getBoundingClientRect();
    const probRect = probEl.getBoundingClientRect();

    // From right edge of ATPL chip to left edge of Problem chip
    const x1 = atplRect.right - containerRect.left;
    const y1 = atplRect.top + atplRect.height / 2 - containerRect.top;
    const x2 = probRect.left - containerRect.left;
    const y2 = probRect.top + probRect.height / 2 - containerRect.top;

    setLineCoords({ x1, y1, x2, y2 });
  }, [effectiveActiveRow]);

  useEffect(() => {
    updateLine();
    window.addEventListener('resize', updateLine);
    return () => window.removeEventListener('resize', updateLine);
  }, [updateLine]);

  // 3D Tilt calculation & cursor glow on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * ANIM_CONFIG.maxTiltX;
    const rotY = ((x - centerX) / centerX) * ANIM_CONFIG.maxTiltY;

    setTilt({ x: rotX, y: rotY });
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    updateLine();
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsMouseOver(false);
    setHoveredRow(null);
  };

  // Background Canvas: Rising Cyan and Red Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 35 particles: cyan on left half, red on right half
    const particles = Array.from({ length: 35 }, () => {
      const isCyan = Math.random() < 0.5;
      return {
        x: isCyan ? Math.random() * (width * 0.48) : width * 0.52 + Math.random() * (width * 0.48),
        y: Math.random() * height,
        radius: 1 + Math.random() * 2,
        speed: 0.35 + Math.random() * 0.55,
        color: isCyan ? 'rgba(0, 240, 255,' : 'rgba(239, 68, 68,',
        alpha: 0.2 + Math.random() * 0.6,
        alphaSpeed: 0.01 * (Math.random() > 0.5 ? 1 : -1)
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speed;
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.1 || p.alpha >= 0.75) p.alphaSpeed *= -1;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = p.color.includes('240') ? Math.random() * (width * 0.48) : width * 0.52 + Math.random() * (width * 0.48);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color.includes('240') ? '#00f0ff' : '#ef4444';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReduced]);

  // Clean up all timers and animations on unmount
  useEffect(() => {
    return () => cleanupAllAnimations();
  }, [cleanupAllAnimations]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 2.5vw, 2rem)',
        backgroundColor: '#030813',
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(0, 113, 186, 0.12) 0%, transparent 75%)',
        borderRadius: '24px',
        border: '1px solid rgba(0, 240, 255, 0.18)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.08)',
        perspective: `${ANIM_CONFIG.perspective}px`,
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* =====================================================================
          BACKGROUND CANVAS (Rising Cyan and Red Particles)
         ===================================================================== */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.85
        }}
      />

      {/* Background Animated Architectural Grid */}
      <div className="animated-moving-grid" />

      {/* Sparks & Impact Overlay Container */}
      <div
        ref={sparksOverlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 45,
          overflow: 'visible'
        }}
      />

      {/* =====================================================================
          EMBEDDED STYLES (Performance Composite Only: Transform & Opacity)
         ===================================================================== */}
      <style>{`
        /* 1. Moving Subtle Background Grid */
        @keyframes movingGrid {
          from { background-position: 0 0; }
          to { background-position: 32px 32px; }
        }
        .animated-moving-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          animation: movingGrid 20s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* 2. Heading Blur-to-Sharp Shimmer Gradient */
        @keyframes titleBlurIn {
          0% {
            opacity: 0;
            filter: blur(14px);
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
        .title-blur-rise {
          animation: titleBlurIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shimmerCyan {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #00f0ff 0%, #ffffff 35%, #0071ba 70%, #00f0ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerCyan 3.5s linear infinite;
          filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.45));
        }

        /* 3. Panel Conic-Gradient Border Sweep (CSS @property with fallback) */
        @property --conic-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotateConic {
          from { --conic-angle: 0deg; }
          to { --conic-angle: 360deg; }
        }
        .conic-border-left {
          --conic-angle: 0deg;
          animation: rotateConic 7s linear infinite;
          background: 
            linear-gradient(#050f22, #040c1b) padding-box,
            conic-gradient(from var(--conic-angle), #00f0ff 0%, transparent 30%, #0071ba 65%, #00f0ff 100%) border-box;
          border: 1.5px solid transparent;
        }
        .conic-border-right {
          --conic-angle: 0deg;
          animation: rotateConic 7s linear infinite;
          background: 
            linear-gradient(#16060e, #0e0409) padding-box,
            conic-gradient(from var(--conic-angle), #ef4444 0%, transparent 30%, #991b1b 65%, #ef4444 100%) border-box;
          border: 1.5px solid transparent;
        }

        /* 4. Impact Ring & Sparks on Landing */
        @keyframes impactRingExpand {
          0% {
            transform: translate(-50%, -50%) scale(0.2, 0.1);
            opacity: 1;
            border-width: 2.5px;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.8, 0.7);
            opacity: 0;
            border-width: 0.5px;
          }
        }
        .impact-ring {
          position: absolute;
          width: 70px;
          height: 24px;
          border-radius: 50%;
          border-style: solid;
          pointer-events: none;
          z-index: 50;
          animation: impactRingExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .impact-spark {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 51;
        }

        /* 5. Post-Landing Chip Floating Idle (4.5s loop, 6px displacement) */
        @keyframes chipIdleFloat {
          0%, 100% { transform: translateY(-3px); }
          50% { transform: translateY(3px); }
        }
        .chip-floating-idle {
          animation: chipIdleFloat 4.5s ease-in-out infinite;
        }

        /* 6. Light Shine Sweep across each chip every ~5s */
        @keyframes chipLightSweep {
          0%, 25% { transform: translateX(-160%) skewX(-20deg); }
          55%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        .chip-shine-streak {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.28) 50%, transparent 100%);
          animation: chipLightSweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 3;
        }

        /* 7. RGB Glitch Flicker on Red Chips */
        @keyframes redRgbGlitch {
          0%, 94%, 100% {
            filter: drop-shadow(0 0 0 transparent);
            transform: scale(1) translate(0, 0);
          }
          95% {
            filter: drop-shadow(-2px 0 0 #00f0ff) drop-shadow(2px 0 0 #ef4444);
            transform: scale(1) translate(1px, -1px);
          }
          97% {
            filter: drop-shadow(2px 0 0 #00f0ff) drop-shadow(-2px 0 0 #ef4444);
            transform: scale(1) translate(-1px, 1px);
          }
          99% {
            filter: drop-shadow(0 0 0 transparent);
            transform: scale(1) translate(0, 0);
          }
        }
        .red-chip-glitch {
          animation: redRgbGlitch 4.8s ease-in-out infinite;
        }

        /* 8. Active Pair Shake on the Problem Chip */
        @keyframes activeProblemShake {
          0%, 100% { transform: scale(1.09) rotate(0deg); }
          20% { transform: scale(1.09) rotate(-1.5deg); }
          40% { transform: scale(1.09) rotate(1.5deg); }
          60% { transform: scale(1.09) rotate(-1deg); }
          80% { transform: scale(1.09) rotate(1deg); }
        }
        .active-problem-shake {
          animation: activeProblemShake 0.38s ease-in-out;
        }

        /* 9. VS Badge Counter-Rotating Rings */
        @keyframes spinClockwise {
          from { transform: rotate(0deg); }
          to { rotate: 360deg; }
        }
        @keyframes spinCounterClockwise {
          from { transform: rotate(360deg); }
          to { rotate: 0deg; }
        }
        @keyframes vsPulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.45); }
          50% { box-shadow: 0 0 35px rgba(0, 240, 255, 0.85); }
        }
        .vs-ring-dashed-cyan {
          animation: spinClockwise 12s linear infinite;
        }
        .vs-ring-thin-red {
          animation: spinCounterClockwise 8s linear infinite;
        }
        .vs-badge-core {
          animation: vsPulseGlow 2.5s ease-in-out infinite;
        }

        /* 10. Connector Animated Dash Line */
        @keyframes connectorFlow {
          to { stroke-dashoffset: -20; }
        }
        .connector-flow-line {
          animation: connectorFlow 1.2s linear infinite;
        }

        /* 11. Responsive Grid Structure */
        .split-comp-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 760px) {
          .split-comp-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .vs-badge-container {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            margin: -10px auto !important;
            display: flex !important;
            justify-content: center !important;
          }
          .svg-connector-overlay {
            display: none !important;
          }
          .split-chip-row {
            height: 42px !important;
          }
          .chip-item {
            font-size: 0.74rem !important;
            padding: 0.35rem 0.75rem !important;
          }
        }

        /* 12. Accessibility: prefers-reduced-motion turns off ONLY infinite decorative loops */
        @media (prefers-reduced-motion: reduce) {
          .chip-floating-idle,
          .chip-shine-streak,
          .red-chip-glitch,
          .vs-ring-dashed-cyan,
          .vs-ring-thin-red,
          .animated-moving-grid,
          .connector-flow-line {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================================
          TOP HEADER: Badge, Shimmering Title, Subtext & Replay Button
         ===================================================================== */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          {/* Header Benchmark Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#00f0ff'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
            <span>OPERATIONAL BENCHMARK // 250+ CONNECTED MEGA-PLANTS</span>
          </div>

          {/* Replay Animation Button */}
          <button
            type="button"
            onClick={handleReplay}
            disabled={isReplaying}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: isReplaying ? 'rgba(0, 113, 186, 0.35)' : 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.45)',
              color: '#ffffff',
              padding: '0.45rem 1.15rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: isReplaying ? 'default' : 'pointer',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)',
              transition: 'all 0.2s ease'
            }}
            title="Replay the chips drop and landing sequence"
          >
            <RotateCcw size={13} color="#00f0ff" style={{ transform: isReplaying ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s ease' }} />
            <span>{isReplaying ? 'Dropping Chips...' : 'Replay Animation'}</span>
          </button>
        </div>

        {/* Shimmering Title with Blur Rise */}
        <h2
          className="title-blur-rise"
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 0.5rem 0'
          }}
        >
          Why ATPL for <span className="shimmer-text">Factory Automation</span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)',
            lineHeight: 1.55,
            color: '#94a3b8',
            margin: '0',
            maxWidth: '820px'
          }}
        >
          Direct engineering integration with in-house software, guaranteed &lt;4-hr SLAs, and native SAP/Oracle synchronization.
        </p>
      </div>

      {/* =====================================================================
          3D TILTING SPLIT PANELS (Interactive Tilt with Cursor Glow)
         ===================================================================== */}
      <div
        className="split-comp-layout"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Soft Radial Cursor Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 240, 255, 0.08), transparent 70%)`,
            zIndex: 2,
            transition: 'background 0.1s ease-out'
          }}
        />

        {/* =====================================================================
            LEFT PANEL: "● The ATPL way" (Cyan Conic Glow, 10 Falling Chips)
           ===================================================================== */}
        <div
          ref={leftPanelRef}
          className="conic-border-left"
          style={{
            borderRadius: '20px',
            padding: '1.25rem 1.25rem 1.4rem 1.25rem',
            position: 'relative',
            overflow: 'hidden', // REQUIRED: Clips falling chips entering from the top
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 113, 186, 0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transformOrigin: '50% 100%'
          }}
        >
          {/* Left Panel Heading Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 10 }}>
            <div
              style={{
                backgroundColor: 'rgba(0, 240, 255, 0.12)',
                border: '1.2px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '999px',
                padding: '0.38rem 1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#ffffff',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.3)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              <span>The</span>
              <span style={{ color: '#00f0ff' }}>ATPL</span>
              <span>way</span>
            </div>
          </div>

          {/* 10 Fixed Rows with Zigzag Alignment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', position: 'relative', zIndex: 10 }}>
            {ROWS.map((row, idx) => {
              const isActive = effectiveActiveRow === row.id;
              const isLanded = landedRows.has(row.id);

              return (
                <div
                  key={row.id}
                  className="split-chip-row"
                  style={{
                    height: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: row.alignAtpl,
                    position: 'relative',
                    zIndex: isActive ? 20 : 5
                  }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Floating idle wrapper (enabled after landing) */}
                  <div
                    className={isLanded && !isActive ? 'chip-floating-idle' : ''}
                    style={{
                      animationDelay: `${idx * 0.4}s`,
                      display: 'inline-flex'
                    }}
                  >
                    {/* The Falling ATPL Chip with transform-origin 50% 100% */}
                    <div
                      ref={(el) => { atplRefs.current[row.id] = el; }}
                      className="chip-item"
                      style={{
                        transformOrigin: '50% 100%',
                        backgroundColor: isActive ? '#ffffff' : 'rgba(4, 22, 48, 0.85)',
                        color: isActive ? '#031527' : '#ffffff',
                        border: isActive ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.45)',
                        borderRadius: '9999px',
                        padding: '0.45rem 1.05rem',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: isActive
                          ? '0 0 0 2px #00f0ff, 0 0 32px rgba(0, 240, 255, 0.95)'
                          : '0 4px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                        transform: isActive ? 'scale(1.09)' : 'scale(1)',
                        transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease'
                      }}
                    >
                      {/* Sweeping Light Shine */}
                      <div className="chip-shine-streak" style={{ animationDelay: `${idx * 0.5}s` }} />

                      {/* Self-Drawing SVG ✓ Checkmark Icon */}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#0071ba" : "#00f0ff"} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path
                          d="M4 12l5 5L20 6"
                          style={{
                            strokeDasharray: 26,
                            strokeDashoffset: isLanded ? 0 : 26,
                            transition: 'stroke-dashoffset 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                      </svg>
                      <span>{row.atpl}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: "● Without ATPL" (Red Conic Glow, 10 Falling Chips)
           ===================================================================== */}
        <div
          ref={rightPanelRef}
          className="conic-border-right"
          style={{
            borderRadius: '20px',
            padding: '1.25rem 1.25rem 1.4rem 1.25rem',
            position: 'relative',
            overflow: 'hidden', // REQUIRED: Clips falling chips entering from the top
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.22)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transformOrigin: '50% 100%'
          }}
        >
          {/* Right Panel Heading Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 10 }}>
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1.2px solid rgba(239, 68, 68, 0.45)',
                borderRadius: '999px',
                padding: '0.38rem 1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#fecaca',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.3)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
              <span>Without ATPL</span>
            </div>
          </div>

          {/* 10 Fixed Rows with Zigzag Alignment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', position: 'relative', zIndex: 10 }}>
            {ROWS.map((row, idx) => {
              const isActive = effectiveActiveRow === row.id;
              const isLanded = landedRows.has(row.id);

              return (
                <div
                  key={row.id}
                  className="split-chip-row"
                  style={{
                    height: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: row.alignProb,
                    position: 'relative',
                    zIndex: isActive ? 20 : 5
                  }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Floating idle wrapper + RGB Glitch Flicker */}
                  <div
                    className={`${isLanded && !isActive ? 'chip-floating-idle' : ''} red-chip-glitch`}
                    style={{
                      animationDelay: `${idx * 0.4 + 0.3}s`,
                      display: 'inline-flex'
                    }}
                  >
                    {/* The Falling Problem Chip with transform-origin 50% 100% */}
                    <div
                      ref={(el) => { probRefs.current[row.id] = el; }}
                      className={`chip-item ${isActive ? 'active-problem-shake' : ''}`}
                      style={{
                        transformOrigin: '50% 100%',
                        backgroundColor: isActive ? 'rgba(78, 12, 24, 0.98)' : 'rgba(38, 10, 20, 0.85)',
                        color: isActive ? '#ffffff' : '#fecaca',
                        border: isActive ? '1.5px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.45)',
                        borderRadius: '9999px',
                        padding: '0.45rem 1.05rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: isActive
                          ? '0 0 0 2px #ef4444, 0 0 32px rgba(239, 68, 68, 0.95)'
                          : '0 4px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                        transform: isActive ? 'scale(1.09)' : 'scale(1)',
                        transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease'
                      }}
                    >
                      {/* Sweeping Light Shine */}
                      <div className="chip-shine-streak" style={{ animationDelay: `${idx * 0.5 + 0.25}s` }} />

                      {/* Self-Drawing SVG ✕ Cross Icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff4d63" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <line
                          x1="5" y1="5" x2="19" y2="19"
                          style={{
                            strokeDasharray: 22,
                            strokeDashoffset: isLanded ? 0 : 22,
                            transition: 'stroke-dashoffset 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                        <line
                          x1="19" y1="5" x2="5" y2="19"
                          style={{
                            strokeDasharray: 22,
                            strokeDashoffset: isLanded ? 0 : 22,
                            transition: 'stroke-dashoffset 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                          }}
                        />
                      </svg>
                      <span>{row.problem}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            CENTER "VS" BADGE (Spring Overshoot, Dual Counter-Rotating Rings)
           ===================================================================== */}
        <div
          className="vs-badge-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 35,
            pointerEvents: 'none'
          }}
        >
          {/* Dual Counter-Rotating Rings */}
          <div
            className="vs-ring-dashed-cyan"
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(0, 240, 255, 0.7)',
              pointerEvents: 'none'
            }}
          />
          <div
            className="vs-ring-thin-red"
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '1px solid rgba(239, 68, 68, 0.65)',
              pointerEvents: 'none'
            }}
          />

          {/* Core VS Circle with Pulsing Glow */}
          <div
            className="vs-badge-core"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#030a16',
              border: '2px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f0ff',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              boxShadow: '0 0 24px rgba(0, 240, 255, 0.55), inset 0 0 12px rgba(0, 240, 255, 0.3)'
            }}
          >
            VS
          </div>
        </div>

        {/* =====================================================================
            DYNAMIC SVG BEZIER CONNECTOR (With Bright Travelling Dot)
           ===================================================================== */}
        <svg
          ref={overlayRef}
          className="svg-connector-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 30,
            overflow: 'visible'
          }}
        >
          <defs>
            <linearGradient id="atplSplitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glowDot" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {lineCoords && (
            <g>
              {/* Dashed Bezier Line */}
              <path
                id="connectorPath"
                className="connector-flow-line"
                d={`M ${lineCoords.x1} ${lineCoords.y1} C ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.45} ${lineCoords.y1}, ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.55} ${lineCoords.y2}, ${lineCoords.x2} ${lineCoords.y2}`}
                fill="none"
                stroke="url(#atplSplitGrad)"
                strokeWidth="2.4"
                strokeDasharray="6 4"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.65))' }}
              />

              {/* Bright Travelling Dot across path */}
              <circle r="4.5" fill="#ffffff" filter="url(#glowDot)">
                <animateMotion
                  dur="1.8s"
                  repeatCount="indefinite"
                  path={`M ${lineCoords.x1} ${lineCoords.y1} C ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.45} ${lineCoords.y1}, ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.55} ${lineCoords.y2}, ${lineCoords.x2} ${lineCoords.y2}`}
                />
              </circle>
            </g>
          )}
        </svg>
      </div>

      {/* =====================================================================
          AFTER LANDING: 3 STAT CARDS COUNTING UP
         ===================================================================== */}
      {allLanded && (
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0, 240, 255, 0.2)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 10,
            animation: 'titleBlurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <StatCard
            label="Emergency Field SLA"
            prefix="<"
            targetValue={4}
            suffix=" hr"
            subtext="Guaranteed on-site engineer dispatch across South India corridors."
            icon={Clock}
            color="#00f0ff"
          />
          <StatCard
            label="Turnkey In-House WMS"
            targetValue={100}
            suffix="%"
            subtext="Native SAP & Oracle integration with zero third-party middleware."
            icon={ShieldCheck}
            color="#38bdf8"
          />
          <StatCard
            label="Line Standstills"
            targetValue={0}
            subtext="Zero barcode escape guarantee with 99.985% first-pass verification yield."
            icon={Zap}
            color="#10b981"
          />
        </div>
      )}
    </div>
  );
});

export default AtplSplitComparison;
