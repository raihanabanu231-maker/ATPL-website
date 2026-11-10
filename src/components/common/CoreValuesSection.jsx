import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, 
  Database, 
  Cpu, 
  Layers, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  PhoneCall,
  Activity,
  Award,
  Zap,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Handshake Icon for Long-Term Industrial Commitment
const HandshakeIcon = ({ size = 26, color = '#0071ba' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-1.3 1.3" />
    <path d="m13 11-1.3-1.3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 0 1.4l4.3 4.3a1 1 0 0 0 1.4 0l2-2" />
    <path d="m18 11 3-3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-3 3" />
    <path d="m2 16 3-3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-3 3" />
  </svg>
);

// Individual Interactive 3D Perspective Tilt & Spotlight Value Card
const InteractiveValueCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D physical spring tilt values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 280, damping: 26 });
  const springY = useSpring(tiltY, { stiffness: 280, damping: 26 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    tiltX.set(xPct);
    tiltY.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="core-value-card"
      style={{
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        border: isHovered 
          ? `1.5px solid ${item.color}` 
          : '1px solid rgba(226, 232, 240, 0.95)',
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${item.accentGlow}, 0 8px 16px -6px rgba(15, 23, 42, 0.08)` 
          : '0 4px 18px -4px rgba(15, 23, 42, 0.04), 0 2px 6px -2px rgba(15, 23, 42, 0.02)',
        padding: '2.25rem 2rem',
        overflow: 'hidden',
        transition: 'border 0.25s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        willChange: 'transform'
      }}
    >
      {/* Interactive Cursor Spotlight Glow Effect */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${item.accentGlow}, transparent 75%)`,
          zIndex: 1
        }}
      />

      {/* Floating Parallax Background Architectural Number */}
      <div 
        className="card-watermark-num"
        style={{
          position: 'absolute',
          right: '1.25rem',
          top: '0.75rem',
          fontSize: '5.2rem',
          fontWeight: 900,
          fontFamily: 'monospace, sans-serif',
          color: item.color,
          opacity: 0.07,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.25s ease'
        }}
      >
        {item.num}
      </div>

      {/* Inner Card Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
          
          {/* Animated Icon Emblem */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: item.bgColor,
            border: `1.5px solid ${item.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: item.color,
            flexShrink: 0,
            transform: isHovered ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isHovered ? `0 8px 18px -4px ${item.accentGlow}` : 'none'
          }}>
            <Icon size={26} color={item.color} />
          </div>

          {/* Micro Category Tag */}
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            padding: '0.35rem 0.8rem',
            borderRadius: '999px',
            backgroundColor: item.bgColor,
            color: item.color,
            border: `1px solid ${item.borderColor}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: item.color,
              display: 'inline-block'
            }} />
            {item.tag}
          </span>
        </div>

        {/* Value Heading */}
        <h3 style={{
          fontSize: '1.28rem',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: 1.3,
          margin: '0 0 0.75rem 0',
          letterSpacing: '-0.015em'
        }}>
          {item.title}
        </h3>

        {/* Detailed Copywriting */}
        <p style={{
          fontSize: '0.96rem',
          color: '#475569',
          lineHeight: 1.68,
          margin: '0 0 1.5rem 0'
        }}>
          {item.description}
        </p>

        {/* Micro-Telemetry Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingTop: '0.95rem',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          fontSize: '0.8rem',
          color: '#64748b',
          fontWeight: 600
        }}>
          <CheckCircle2 size={15} color={item.color} style={{ flexShrink: 0 }} />
          <span>{item.badge}</span>
        </div>

      </div>
    </motion.div>
  );
};

export const CoreValuesSection = () => {
  const { openDemoModal } = useApp();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const spineFillRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // 6 Official ATPL Values with Enhanced Metadata
  const values = useMemo(() => [
    {
      id: 'commitment',
      num: '01',
      tag: 'Heritage & Stability',
      badge: '35+ Yrs Field Domain, Decades of Reliability',
      title: 'Long-term industrial commitment',
      icon: HandshakeIcon,
      color: '#0071ba',
      accentGlow: 'rgba(0, 113, 186, 0.18)',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      borderColor: 'rgba(0, 113, 186, 0.2)',
      description: '35+ years of combined industrial domain experience gives us a deep understanding of shopfloor realities. We build systems to run reliably for decades, partnering with your plants through every production expansion.'
    },
    {
      id: 'operator-first',
      num: '02',
      tag: 'Operator Centric',
      badge: 'Glove-Friendly Touch UI, Zero Operator Delay',
      title: 'Plant-floor first philosophy',
      icon: Users,
      color: '#E85874',
      accentGlow: 'rgba(232, 88, 116, 0.18)',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      borderColor: 'rgba(232, 88, 116, 0.2)',
      description: 'Software is only as good as the operator holding the scanner on the line. We design our interfaces for busy forklift drivers and line operators — eliminating unnecessary clicks, delays, and friction.'
    },
    {
      id: 'data-ownership',
      num: '03',
      tag: 'Open Architecture',
      badge: 'Native RFC / BAPI SQL Connectors, Zero Lock-in',
      title: 'Complete data ownership & zero lock-in',
      icon: Database,
      color: '#0071ba',
      accentGlow: 'rgba(0, 113, 186, 0.18)',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      borderColor: 'rgba(0, 113, 186, 0.2)',
      description: 'Your manufacturing and inventory data belongs entirely to you. Our software links directly into your SAP or Oracle ERP without locking your plant into proprietary file formats or recurring user licensing traps.'
    },
    {
      id: 'rnd-focus',
      num: '04',
      tag: 'Proprietary IP',
      badge: 'TCE-TBI Madurai Center, TIDEL Park Chennai HQ',
      title: 'Focus on research & in-house R&D',
      icon: Cpu,
      color: '#E85874',
      accentGlow: 'rgba(232, 88, 116, 0.18)',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      borderColor: 'rgba(232, 88, 116, 0.2)',
      description: 'Industrial automation is our craft. Backed by our R&D center at TCE-TBI Madurai and headquarters at TIDEL Park Chennai, we invest continuously in proprietary firmware, vision neural models, and industrial IoT middleware.'
    },
    {
      id: 'single-team',
      num: '05',
      tag: 'Unified SLA',
      badge: 'Hardware Mounts to ERP Middleware Under One Roof',
      title: 'One accountable engineering team',
      icon: Layers,
      color: '#0071ba',
      accentGlow: 'rgba(0, 113, 186, 0.18)',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      borderColor: 'rgba(0, 113, 186, 0.2)',
      description: 'We handle both the shopfloor hardware mounting and the ERP middleware software in-house. You never have to mediate between an IT software consultant and an industrial hardware reseller.'
    },
    {
      id: 'sla-support',
      num: '06',
      tag: 'Rapid Field Dispatch',
      badge: 'Resident Field Engineers Across South India Corridors',
      title: 'Guaranteed 4-hour on-site SLA',
      icon: Clock,
      color: '#E85874',
      accentGlow: 'rgba(232, 88, 116, 0.18)',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      borderColor: 'rgba(232, 88, 116, 0.2)',
      description: 'When a critical packing line or dock portal encounters an issue, our local field engineers dispatch on-site across South India manufacturing corridors with pre-configured hot-swap equipment to keep dispatches rolling 24/7.'
    }
  ], []);

  // GSAP ScrollTrigger Integration for dynamic entrance, timeline scrub & watermarks
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header Pill and Laser Accent Line
      gsap.fromTo(
        '.values-header-pill',
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.values-laser-line',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Staggered 3D entrance for all 6 value cards
      gsap.fromTo(
        '.core-value-card',
        { 
          y: 60, 
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.14,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Central Timeline Spine Scroll Scrubbing
      if (spineFillRef.current) {
        gsap.fromTo(
          spineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: true,
              onUpdate: (self) => {
                setScrollPercent(Math.round(self.progress * 100));
              }
            }
          }
        );
      }

      // 4. Parallax Scrub on Architectural Numbers
      gsap.utils.toArray('.card-watermark-num').forEach((numEl) => {
        gsap.to(numEl, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: numEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      });

      // 5. Bottom Telemetry Banner Entrance
      gsap.fromTo(
        '.values-telemetry-strip',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.values-telemetry-strip',
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="atpl-core-values-section"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem 6.5rem 1.5rem',
        backgroundColor: '#fbfcfe',
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Radial Depth Lighting */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 113, 186, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem auto' }}>
          
          {/* Luminous Pill Eyebrow */}
          <div className="values-header-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--color-brand-blue, #0071ba)',
              backgroundColor: 'rgba(0, 113, 186, 0.08)',
              border: '1px solid rgba(0, 113, 186, 0.22)',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}>
              <Sparkles size={14} color="#0071ba" />
              ATPL Industrial Pillars, Shopfloor Verified
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            margin: '0 0 1.25rem 0',
            cursor: 'default',
            caretColor: 'transparent'
          }}>
            The core values and principles<br />
            that drive us
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#64748b',
            lineHeight: 1.65,
            maxWidth: '640px',
            margin: '0 auto 1.5rem auto'
          }}>
            Engineered with deep plant-floor empathy, transparent ERP integration, and guaranteed local SLA response across India’s manufacturing belt.
          </p>

          {/* GSAP Laser Accent Line */}
          <div 
            className="values-laser-line"
            style={{
              width: '64px',
              height: '4px',
              background: 'linear-gradient(90deg, #0071ba, #00f0ff)',
              borderRadius: '999px',
              margin: '0 auto',
              boxShadow: '0 2px 10px rgba(0, 113, 186, 0.35)',
              transformOrigin: 'center'
            }} 
          />
        </div>

        {/* Values Grid Container with Central Spine on Desktop */}
        <div ref={containerRef} style={{ position: 'relative' }}>
          
          {/* Central Vertical Energy Conduit Rail (Desktop) */}
          <div 
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              width: '2px',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(226, 232, 240, 0.8)',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            {/* GSAP Scrubbed Glowing Fill Conduit */}
            <div 
              ref={spineFillRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, #0071ba 0%, #00f0ff 50%, #E85874 100%)',
                transformOrigin: 'top',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)'
              }}
            />

            {/* Glowing Milestone Bead Nodes */}
            {[0.16, 0.5, 0.84].map((pos, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: `${pos * 100}%`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: scrollPercent >= (pos * 100) ? '3px solid #00f0ff' : '3px solid #cbd5e1',
                  boxShadow: scrollPercent >= (pos * 100) ? '0 0 14px rgba(0, 240, 255, 0.8)' : 'none',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease',
                  zIndex: 2
                }}
              />
            ))}
          </div>

          {/* 2-Column High-Performance Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 1
          }}>
            {values.map((item, index) => (
              <InteractiveValueCard 
                key={item.id} 
                item={item} 
                index={index} 
              />
            ))}
          </div>

        </div>

        {/* Section Bottom Engineering Telemetry Strip */}
        <div 
          className="values-telemetry-strip"
          style={{
            marginTop: '4rem',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 6px 20px -6px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          {/* Scroll Progress Metric */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 113, 186, 0.08)',
              color: '#0071ba',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Activity size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Engineering Core Status
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-slate-900, #0f172a)' }}>
                6/6 Pillars Active, {scrollPercent}% Section Explored
              </div>
            </div>
          </div>

          {/* Emergency Hotline & Consultation Action */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="tel:04435537618" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#0071ba',
                textDecoration: 'none',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 113, 186, 0.06)'
              }}
            >
              <PhoneCall size={16} />
              Call SLA Desk: 044 3553 7618
            </a>

            <button
              onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Feasibility Audit', notes: 'Core Values Section CTA' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Schedule Plant Feasibility Audit</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
