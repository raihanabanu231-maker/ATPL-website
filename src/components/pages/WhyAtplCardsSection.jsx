import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// 1. CARDS DATA (EXACT COPY PRESERVED AS REQUIRED - 100% VERBATIM)
// ============================================================================
export const WHY_ATPL_CARDS = [
  {
    id: 'advanced-tech',
    icon: Cpu,
    title: 'Advanced Technology Made Easy',
    subtitle: 'Complexity hidden. Performance amplified.',
    description: 'Modern factories run at unforgiving speeds. ATPL packages deep learning TensorRT models, multi-angle stroboscopic lighting, and UHF RFID into plug-and-play modules that line operators can control with zero programming required.',
    visualType: 'chips',
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance Without Compromise',
    subtitle: 'Sub-8ms decode. Zero line bottlenecks.',
    description: 'High-throughput automotive and EV plants cannot afford a 50ms pause per part. Our edge-computed pipelines inspect and serialize at 180 parts per minute, ensuring 100% genealogy without adding a single second of cycle time.',
    visualType: 'stats',
  },
  {
    id: 'ecosystem',
    icon: Layers,
    title: 'Turnkey Hardware + Software Ecosystem',
    subtitle: 'Single engineering authority. Zero finger-pointing.',
    description: 'Unlike traditional box-pushers who sell disjointed hardware and leave you to find software integrators, ATPL engineers the entire stack: optical mounts, PLCs, edge controllers, custom middleware, and cloud dashboards.',
    visualType: 'layers',
  },
  {
    id: 'interoperability',
    icon: ShieldCheck,
    title: 'Native ERP & Shopfloor Interoperability',
    subtitle: 'Certified SAP S/4HANA & Oracle connectors.',
    description: 'Say goodbye to fragile batch CSV cron jobs. ATPL systems communicate directly via bi-directional SAP IDocs, BAPIs, and Modbus-TCP DMA, eliminating inventory drift and synchronization lag between the floor and the executive suite.',
    visualType: 'erp-sync',
  },
  {
    id: 'on-site-sla',
    icon: Clock,
    title: 'Guaranteed 4-Hour On-Site SLA',
    subtitle: "Local field squads across India's manufacturing corridors.",
    description: 'With technical centers at TIDEL Park Chennai, TCE-TBI Madurai R&D Hub, Hosur Auto Corridor, and Bengaluru, our engineers guarantee sub-4-hour emergency on-site dispatch backed by local buffer hardware pools.',
    visualType: 'sla-ring',
  },
  {
    id: 'regulatory',
    icon: Award,
    title: 'Tested, Audited & Regulatory Compliant',
    subtitle: 'AIS-156, FDA 21 CFR Part 11, GS1 India certified.',
    description: 'From tamper-proof pharmaceutical electronic audit trails to EV battery genealogy mandated by ARAI, ATPL solutions come pre-configured to pass rigorous global regulatory audits with zero non-conformances.',
    visualType: 'badges',
  },
];

// ============================================================================
// 2. MINI-VISUAL COMPONENTS (ONE COMPONENT PER CARD)
// ============================================================================

/**
 * Visual 1: Chips "TensorRT", "Strobe light", "UHF RFID" start scattered and rotated,
 * then spring together, followed by a solid "= Plug & play" pill.
 */
const VisualChips = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();

  const chips = [
    { label: 'TensorRT', initial: { x: -20, y: 14, rotate: -10 } },
    { label: 'Strobe light', initial: { x: 18, y: -12, rotate: 8 } },
    { label: 'UHF RFID', initial: { x: -14, y: -14, rotate: -6 } },
  ];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '8px',
      minHeight: '48px',
      width: '100%'
    }}>
      {chips.map((chip, idx) => (
        <motion.span
          key={chip.label}
          initial={prefersReduced ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, ...chip.initial }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : chip.initial}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 22,
            delay: prefersReduced ? 0 : 0.15 + idx * 0.1,
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#0369a1',
            background: 'rgba(3, 105, 161, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            boxShadow: '0 1px 3px rgba(3, 105, 161, 0.06)'
          }}
        >
          {chip.label}
        </motion.span>
      ))}

      {/* Solid "= Plug & play" pill stamping in */}
      <motion.span
        initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 20,
          delay: prefersReduced ? 0 : 0.5,
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '11.5px',
          fontWeight: 800,
          color: '#ffffff',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #0f766e 100%)',
          boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)'
        }}
      >
        <span style={{ opacity: 0.85 }}>=</span>
        <span>Plug &amp; play</span>
      </motion.span>
    </div>
  );
});

/**
 * Visual 2: Three stats that count up when scrolled into view:
 * "<8 ms decode", "180 parts / min", "100% genealogy". (Tabular numbers)
 */
const AnimatedStatCounter = ({ target, prefix = '', suffix = '', duration = 1200, isInView }) => {
  const [val, setVal] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setVal(target);
      return;
    }

    let start = null;
    let animId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span style={{
      fontVariantNumeric: 'tabular-nums',
      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
      fontWeight: 900,
      color: '#0f172a',
      fontSize: '1.24rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    }}>
      {prefix}{val}{suffix}
    </span>
  );
};

const VisualStats = memo(({ isInView }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      minHeight: '48px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AnimatedStatCounter target={8} prefix="<" suffix=" ms" isInView={isInView} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
          decode
        </span>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(226, 232, 240, 0.9)',
        borderRight: '1px solid rgba(226, 232, 240, 0.9)',
        paddingLeft: '10px',
        paddingRight: '10px'
      }}>
        <AnimatedStatCounter target={180} suffix="" isInView={isInView} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
          parts / min
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AnimatedStatCounter target={100} suffix="%" isInView={isInView} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
          genealogy
        </span>
      </div>
    </div>
  );
});

/**
 * Visual 3: Five stacked layer bars that build up from the bottom:
 * Optical mounts, PLCs, Edge controllers, Custom middleware, Cloud dashboards.
 * On card hover, nudge alternate layers sideways.
 */
const VisualLayers = memo(({ isInView, isHovered }) => {
  const prefersReduced = useReducedMotion();

  const layers = [
    { name: 'Cloud dashboards', level: 'L5 Cloud', grad: 'linear-gradient(90deg, #0284c7 0%, #0ea5e9 100%)' },
    { name: 'Custom middleware', level: 'L4 API', grad: 'linear-gradient(90deg, #0369a1 0%, #0284c7 100%)' },
    { name: 'Edge controllers', level: 'L3 Edge', grad: 'linear-gradient(90deg, #075985 0%, #0369a1 100%)' },
    { name: 'PLCs', level: 'L2 Control', grad: 'linear-gradient(90deg, #0c4a6e 0%, #075985 100%)' },
    { name: 'Optical mounts', level: 'L1 Hardware', grad: 'linear-gradient(90deg, #082f49 0%, #0c4a6e 100%)' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: '100%',
      minHeight: '48px'
    }}>
      {layers.map((layer, idx) => {
        const reverseIdx = layers.length - 1 - idx;
        const nudgeX = isHovered && !prefersReduced ? (idx % 2 === 0 ? -5 : 5) : 0;

        return (
          <motion.div
            key={layer.name}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0, x: nudgeX } : { opacity: 0, y: 10, x: 0 }}
            transition={{
              y: { type: 'spring', stiffness: 360, damping: 24, delay: reverseIdx * 0.05 },
              x: { type: 'spring', stiffness: 420, damping: 22 },
              opacity: { duration: 0.25, delay: reverseIdx * 0.05 }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '3px 8px',
              borderRadius: '5px',
              fontSize: '10.5px',
              fontWeight: 700,
              color: '#ffffff',
              background: layer.grad,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <span>{layer.name}</span>
            <span style={{ fontSize: '9px', fontFamily: 'monospace', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {layer.level}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
});

/**
 * Visual 4: An SVG diagram "Shopfloor" and "SAP / Oracle" connected by two dashed lines,
 * with dots traveling in opposite directions (animateMotion) to show two-way sync.
 */
const VisualErpSync = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();

  return (
    <div style={{
      width: '100%',
      minHeight: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg
        viewBox="0 0 320 60"
        style={{
          width: '100%',
          maxWidth: '310px',
          height: 'auto',
          overflow: 'visible',
          userSelect: 'none'
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          {/* Path 1: Shopfloor to SAP (Left to Right, Y=20) */}
          <path id="pathL2R" d="M 88 20 L 232 20" />
          {/* Path 2: SAP to Shopfloor (Right to Left, Y=40) */}
          <path id="pathR2L" d="M 232 40 L 88 40" />
        </defs>

        {/* Left Node: Shopfloor */}
        <g transform="translate(4, 10)">
          <rect
            width="82"
            height="40"
            rx="8"
            fill="url(#nodeGrad)"
            stroke="#bae6fd"
            strokeWidth="1.5"
          />
          <text x="41" y="24" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            Shopfloor
          </text>
        </g>

        {/* Right Node: SAP / Oracle */}
        <g transform="translate(234, 10)">
          <rect
            width="82"
            height="40"
            rx="8"
            fill="url(#nodeGrad)"
            stroke="#bae6fd"
            strokeWidth="1.5"
          />
          <text x="41" y="24" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            SAP / Oracle
          </text>
        </g>

        {/* Dashed Connecting Lines */}
        <line
          x1="88"
          y1="20"
          x2="232"
          y2="20"
          stroke="#0284c7"
          strokeWidth="1.75"
          strokeDasharray="4 4"
          strokeOpacity="0.45"
        />
        <line
          x1="88"
          y1="40"
          x2="232"
          y2="40"
          stroke="#22d3ee"
          strokeWidth="1.75"
          strokeDasharray="4 4"
          strokeOpacity="0.75"
        />

        {/* Traveling Dot 1: L to R (Shopfloor -> ERP) */}
        {!prefersReduced && isInView && (
          <circle r="4" fill="#0284c7">
            <animateMotion dur="2.4s" repeatCount="indefinite">
              <mpath href="#pathL2R" />
            </animateMotion>
          </circle>
        )}

        {/* Traveling Dot 2: R to L (ERP -> Shopfloor) */}
        {!prefersReduced && isInView && (
          <circle r="4" fill="#22d3ee">
            <animateMotion dur="2.4s" repeatCount="indefinite">
              <mpath href="#pathR2L" />
            </animateMotion>
          </circle>
        )}
      </svg>
    </div>
  );
});

/**
 * Visual 5: A circular progress ring that fills to "<4h" on scroll,
 * next to four cities (Chennai, Madurai, Hosur, Bengaluru), each with a pulsing dot.
 */
const VisualSlaRing = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23

  const cities = [
    { name: 'Chennai', tag: 'TIDEL Park' },
    { name: 'Madurai', tag: 'TCE-TBI' },
    { name: 'Hosur', tag: 'Auto Corridor' },
    { name: 'Bengaluru', tag: 'Tech Hub' }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      width: '100%',
      minHeight: '48px'
    }}>
      {/* Circular Progress Ring */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        height: '56px'
      }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', overflow: 'visible' }} viewBox="0 0 54 54">
          <circle
            cx="27"
            cy="27"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="3.5"
            fill="transparent"
          />
          <motion.circle
            cx="27"
            cy="27"
            r={radius}
            stroke="url(#slaGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * 0.15 } : { strokeDashoffset: circumference }}
            transition={{
              duration: prefersReduced ? 0.01 : 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <defs>
            <linearGradient id="slaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
            &lt;4h
          </span>
          <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', marginTop: '2px' }}>
            SLA
          </span>
        </div>
      </div>

      {/* 4 Cities Grid with Pulsing Cyan Dots */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: '12px',
        rowGap: '6px',
        flex: 1
      }}>
        {cities.map((city, idx) => (
          <div key={city.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
              {!prefersReduced && (
                <motion.span
                  animate={{ scale: [1, 1.7, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.25 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '999px',
                    background: '#22d3ee'
                  }}
                />
              )}
              <span style={{ position: 'relative', borderRadius: '999px', width: '8px', height: '8px', background: '#0284c7' }} />
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
              {city.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Visual 6: Three green badges (AIS-156, FDA 21 CFR Part 11, GS1 India)
 * that stamp in one by one with a check icon, using a spring.
 */
const VisualBadges = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();

  const badges = [
    { code: 'AIS-156' },
    { code: 'FDA 21 CFR Part 11' },
    { code: 'GS1 India' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '8px',
      minHeight: '48px',
      width: '100%'
    }}>
      {badges.map((badge, idx) => (
        <motion.div
          key={badge.code}
          initial={prefersReduced ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.8, rotate: -10 }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 22,
            delay: prefersReduced ? 0 : 0.12 + idx * 0.16,
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#065f46',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 1px 3px rgba(16, 185, 129, 0.08)'
          }}
        >
          <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} />
          <span>{badge.code}</span>
        </motion.div>
      ))}
    </div>
  );
});

// ============================================================================
// 3. TILT CARD WRAPPER WITH 3D TILT, SPOTLIGHT & GRADIENT BORDER
// ============================================================================
const TiltCard = memo(({ card, index, isInView }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Mouse position normalized (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // 10deg max tilt toward cursor with perspective 900
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReduced ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReduced ? [0, 0] : [-10, 10]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;

    // Set CSS variables for spotlight glow
    cardRef.current.style.setProperty('--mx', `${mouseClientX}px`);
    cardRef.current.style.setProperty('--my', `${mouseClientY}px`);

    // Normalize coordinates (-0.5 to 0.5)
    x.set(mouseClientX / rect.width - 0.5);
    y.set(mouseClientY / rect.height - 0.5);
  }, [x, y, prefersReduced]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const IconComp = card.icon;

  // Staggered column delay calculation (0.12s per column in 3-col grid)
  const columnIdx = index % 3;
  const colDelay = prefersReduced ? 0 : 0.08 + columnIdx * 0.12;

  // Render per-card visual
  const renderVisual = () => {
    switch (card.visualType) {
      case 'chips':
        return <VisualChips isInView={isInView} />;
      case 'stats':
        return <VisualStats isInView={isInView} />;
      case 'layers':
        return <VisualLayers isInView={isInView} isHovered={isHovered} />;
      case 'erp-sync':
        return <VisualErpSync isInView={isInView} />;
      case 'sla-ring':
        return <VisualSlaRing isInView={isInView} />;
      case 'badges':
        return <VisualBadges isInView={isInView} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: colDelay,
      }}
      style={{
        perspective: 900,
        height: '100%',
        outline: 'none',
        position: 'relative'
      }}
      tabIndex={0}
      role="article"
      aria-label={card.title}
      className="why-atpl-card-container"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '18px',
          padding: '1.85rem',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: isHovered 
            ? '0 20px 45px -12px rgba(3, 105, 161, 0.18), 0 0 25px rgba(34, 211, 238, 0.12)' 
            : '0 4px 18px rgba(15, 23, 42, 0.04)',
          transition: 'box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Animated Gradient Rotating Border on Hover */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '18px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            padding: '1.5px',
            background: 'conic-gradient(from var(--border-angle, 0deg), #22d3ee 0%, #0369a1 40%, #8b5cf6 70%, #22d3ee 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            animation: prefersReduced ? 'none' : 'cardBorderRotate 4s linear infinite',
            zIndex: 3
          }}
        />

        {/* Cursor Spotlight: Radial cyan glow following the mouse */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '18px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: 'radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(34, 211, 238, 0.20), transparent 80%)',
            zIndex: 2
          }}
        />

        {/* Card Header & Content */}
        <div style={{ position: 'relative', zIndex: 4 }}>
          {/* Icon with micro-animation on card hover: scale 1.12 + wiggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <motion.div
              animate={isHovered && !prefersReduced ? {
                scale: 1.12,
                rotate: [0, -7, 7, -4, 0]
              } : {
                scale: 1,
                rotate: 0
              }}
              transition={{
                duration: 0.45,
                ease: 'easeInOut'
              }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(3, 105, 161, 0.08)',
                border: '1px solid rgba(34, 211, 238, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0369a1',
                boxShadow: isHovered ? '0 0 16px rgba(34, 211, 238, 0.3)' : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              <IconComp size={24} strokeWidth={2.2} />
            </motion.div>

            {/* Subtle pillar badge */}
            <span style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              fontWeight: 800,
              color: '#94a3b8',
              letterSpacing: '0.06em'
            }}>
              0{index + 1}
            </span>
          </div>

          {/* Exact Card Title */}
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.45rem',
            lineHeight: 1.35,
            letterSpacing: '-0.015em',
            fontFamily: 'var(--font-display, "Outfit", sans-serif)'
          }}>
            {card.title}
          </h3>

          {/* Exact Card Subtitle */}
          <div style={{
            fontSize: '0.86rem',
            fontWeight: 700,
            color: '#0369a1',
            lineHeight: 1.4,
            marginBottom: '0.85rem'
          }}>
            {card.subtitle}
          </div>

          {/* Exact Card Description */}
          <p style={{
            fontSize: '0.94rem',
            color: '#64748b',
            lineHeight: 1.62,
            margin: 0
          }}>
            {card.description}
          </p>
        </div>

        {/* Separator & Per-Card Mini Visual */}
        <div style={{ position: 'relative', zIndex: 4, marginTop: '1.25rem' }}>
          {/* Dashed Separator Line */}
          <div style={{
            width: '100%',
            height: '0',
            borderTop: '1.5px dashed rgba(203, 213, 225, 0.85)',
            marginBottom: '1rem'
          }} />

          {/* Mini Visual Component */}
          {renderVisual()}
        </div>
      </motion.div>
    </motion.div>
  );
});

// ============================================================================
// 4. SUBTLE CANVAS PARTICLES BACKGROUND (PAGE-LEVEL EXTRA)
// ============================================================================
const SubtleParticles = memo(() => {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let animId;

    const count = 28;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.22 + 0.08,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7
      }}
      aria-hidden="true"
    />
  );
});

// ============================================================================
// 5. MAGNETIC BUTTON COMPONENT (PAGE-LEVEL EXTRA)
// ============================================================================
export const MagneticButton = ({ children, onClick, style, className = '', ...props }) => {
  const btnRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useSpring(x, { stiffness: 350, damping: 20 });
  const my = useMotionValue(0);
  const sy = useSpring(my, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e) => {
    if (!btnRef.current || prefersReduced) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.28);
    my.set((e.clientY - centerY) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: y, y: sy, ...style }}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// 6. MAIN WHY ATPL CARDS SECTION EXPORT
// ============================================================================
export const WhyAtplCardsSection = memo(() => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '5rem 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* CSS @property definition for animated rotating gradient border & responsive grid */}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes cardBorderRotate {
          from {
            --border-angle: 0deg;
          }
          to {
            --border-angle: 360deg;
          }
        }
        .why-atpl-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .why-atpl-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        @media (max-width: 640px) {
          .why-atpl-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        .why-atpl-card-container:focus-visible {
          outline: 2px solid #22d3ee !important;
          outline-offset: 4px;
        }
      `}</style>

      {/* Subtle particle canvas background */}
      <SubtleParticles />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Headline & Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0369a1',
            background: 'rgba(3, 105, 161, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            marginBottom: '1rem'
          }}>
            <Sparkles size={13} style={{ color: '#0284c7' }} />
            <span>Industrial Automation Authority</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            fontFamily: 'var(--font-display, "Outfit", sans-serif)'
          }}>
            Engineering Excellence Built for Indian Industry
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
            Why leading OEMs and Tier-1 suppliers choose Archery Technocrats as their primary factory automation partner.
          </p>
        </div>

        {/* 3-Column Grid of 6 Cards (2 columns on tablet, 1 on mobile) */}
        <div className="why-atpl-cards-grid">
          {WHY_ATPL_CARDS.map((card, index) => (
            <TiltCard
              key={card.id}
              card={card}
              index={index}
              isInView={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyAtplCardsSection;
