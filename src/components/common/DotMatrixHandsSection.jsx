import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Handshake, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown,
  Cpu,
  Radio,
  Zap
} from 'lucide-react';
import { 
  HoneywellLogo, 
  ZebraLogo, 
  DatalogicLogo, 
  SotiLogo, 
  TelesisLogo, 
  Gs1Logo 
} from './PartnerLogos';

/**
 * SolidPartnersHandsHero (DotMatrixHandsSection):
 * "Joining Hands for Smarter Factories"
 * 
 * Inspired by SynapticForge / Creation-of-Adam:
 * - Solid, photorealistic human arm & hand reaching horizontally from the left edge.
 * - Solid, sleek cybernetic robotic arm & hand reaching horizontally from the right edge.
 * - Central luminous iridescent rainbow aura orb pulsing between them.
 * - Zero dots / halftone — 100% full solid body with smooth organic floating & mouse parallax.
 * - Bold, crisp typography and rainbow underglow CTA.
 */
export const DotMatrixHandsSection = ({
  headline1 = "Joining Hands for",
  headline2 = "Smarter Factories.",
  subline = "When Tier-1 OEM hardware joins hands with in-house automation software, shopfloors eliminate bottlenecks and achieve zero-defect manufacturing.",
  ctaText = "Partner With ATPL",
  onCtaClick
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const animFrameRef = useRef(null);
  const { openDemoModal } = useApp ? useApp() : { openDemoModal: () => {} };

  // Smooth mouse parallax loop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized between -1 and 1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos(prev => ({ ...prev, targetX: nx, targetY: ny }));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Interpolation loop
    let curX = 0, curY = 0;
    const updateMotion = () => {
      setMousePos(prev => {
        curX += (prev.targetX - curX) * 0.08;
        curY += (prev.targetY - curY) * 0.08;
        return { ...prev, x: curX, y: curY };
      });
      animFrameRef.current = requestAnimationFrame(updateMotion);
    };
    animFrameRef.current = requestAnimationFrame(updateMotion);

    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (openDemoModal) {
      openDemoModal({
        mode: 'partner',
        solution: 'Tier-1 Partner Ecosystem Inquiry',
        notes: 'Inquiry from Strategic Partner Hands Hero'
      });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('partner-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Parallax offsets
  const leftHandShiftX = mousePos.x * 12 + (isCtaHovered ? 18 : 0);
  const leftHandShiftY = mousePos.y * 8;
  const leftHandRot = mousePos.y * 1.5;

  const rightHandShiftX = -mousePos.x * 12 - (isCtaHovered ? 18 : 0);
  const rightHandShiftY = -mousePos.y * 8;
  const rightHandRot = -mousePos.y * 1.5;

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: '#f7f7f5',
        minHeight: '680px',
        height: 'clamp(680px, 86vh, 860px)',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes floatLeftHand {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(8px, -10px, 0) rotate(-0.75deg);
          }
        }
        @keyframes floatRightHand {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-8px, 10px, 0) rotate(0.75deg);
          }
        }
        @keyframes pulseAura {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.96);
            opacity: 0.85;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            opacity: 1;
          }
        }
        @keyframes pulseSpark {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.7;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
            box-shadow: 0 0 35px rgba(232, 88, 116, 0.9), 0 0 60px rgba(56, 189, 248, 0.8);
          }
        }
        @keyframes rippleWave {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>

      {/* Top Header Pill for Partner Network */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(14px, 2.2vw, 36px)',
          paddingTop: '32px',
          fontSize: '13.5px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14.5px', letterSpacing: '-0.01em', color: '#111111' }}>
          <Handshake size={18} color="#0071ba" />
          <span>ATPL Global Partner Network</span>
        </div>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 'clamp(14px, 2.2vw, 32px)', color: '#475569', fontSize: '13px', fontWeight: 500 }}>
          <span onClick={scrollToCatalog} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-sky-600">OEM Alliances</span>
          <span onClick={scrollToCatalog} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-sky-600">AIDC &amp; RFID</span>
          <span onClick={scrollToCatalog} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-sky-600">Machine Vision</span>
          <span onClick={scrollToCatalog} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-sky-600">GS1 Standards</span>
        </div>

        <span 
          style={{
            backgroundColor: 'rgba(0, 113, 186, 0.08)',
            color: '#0071ba',
            border: '1px solid rgba(0, 113, 186, 0.25)',
            padding: '5px 13px',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0071ba', display: 'inline-block' }}></span>
          18+ TIER-1 PARTNERS
        </span>
      </div>

      {/* Central Iridescent Rainbow Aura Orb (Synaptic / Alliance Nexus) */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'clamp(380px, 46vw, 620px)',
          height: 'clamp(380px, 46vw, 620px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 195, 120, 0.65) 0%, rgba(255, 125, 195, 0.45) 26%, rgba(130, 215, 255, 0.50) 52%, rgba(175, 135, 255, 0.35) 75%, transparent 100%)',
          filter: 'blur(52px)',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'pulseAura 7s ease-in-out infinite'
        }}
      />

      {/* Subtle concentric ripple waves */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'clamp(420px, 50vw, 680px)',
          height: 'clamp(420px, 50vw, 680px)',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 113, 186, 0.15)',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'rippleWave 8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'clamp(420px, 50vw, 680px)',
          height: 'clamp(420px, 50vw, 680px)',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 88, 116, 0.15)',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'rippleWave 8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
          animationDelay: '4s'
        }}
      />

      {/* SOLID HAND 1: Human Hand Reaching Inward from Left Edge */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '48%',
          width: 'clamp(340px, 45vw, 680px)',
          height: 'auto',
          transform: `translate3d(${leftHandShiftX}px, calc(-50% + ${leftHandShiftY}px), 0) rotate(${leftHandRot}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.08))'
        }}
      >
        <div style={{ animation: 'floatLeftHand 6.5s ease-in-out infinite' }}>
          <img 
            src="/assets/images/human_hand_reach.webp" 
            alt="Human Craftsmanship & Engineering Hand Reaching In"
            width={1376}
            height={768}
            decoding="async"
            className="w-full h-auto object-contain select-none pointer-events-none"
            style={{
              display: 'block',
              aspectRatio: '1376 / 768',
              transform: 'scale(1.04) translateY(2%)'
            }}
            loading="eager"
            onError={(e) => {
              // Fallback to PNG if webp fails
              e.currentTarget.src = '/assets/images/human_hand_reach.png';
            }}
          />
        </div>
      </div>

      {/* SOLID HAND 2: Bionic Robotic Cybernetic Hand Reaching Inward from Right Edge */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '48%',
          width: 'clamp(340px, 45vw, 680px)',
          height: 'auto',
          transform: `translate3d(${rightHandShiftX}px, calc(-50% + ${rightHandShiftY}px), 0) rotate(${rightHandRot}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.10))'
        }}
      >
        <div style={{ animation: 'floatRightHand 6.5s ease-in-out infinite' }}>
          <img 
            src="/assets/images/robot_hand_reach.webp" 
            alt="Intelligent Robotic Automation Hand Reaching In"
            width={1376}
            height={768}
            decoding="async"
            className="w-full h-auto object-contain select-none pointer-events-none"
            style={{
              display: 'block',
              aspectRatio: '1376 / 768',
              transform: 'scale(1.04) translateY(-1%)'
            }}
            loading="eager"
            onError={(e) => {
              // Fallback to PNG if webp fails
              e.currentTarget.src = '/assets/images/robot_hand_reach.png';
            }}
          />
        </div>
      </div>

      {/* Nexus Spark / Connection Energy right between the fingertips */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '51.5%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div 
          style={{
            width: isCtaHovered ? '24px' : '14px',
            height: isCtaHovered ? '24px' : '14px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 25px #38bdf8, 0 0 50px #e85874',
            animation: 'pulseSpark 2.4s ease-in-out infinite',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      {/* Centered Editorial Copy: "Joining Hands for Smarter Factories" */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '20%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: 'min(94vw, 760px)',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        {/* Scenario Badge */}
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0071ba',
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            border: '1px solid rgba(0, 113, 186, 0.25)',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={13} color="#0071ba" />
            HUMAN CRAFT × MACHINE INTELLIGENCE ALLIANCE
          </span>
        </div>

        <h1 style={{
          letterSpacing: '-0.035em',
          lineHeight: 1.05,
          fontSize: 'clamp(36px, 4.4vw, 68px)',
          margin: 0
        }}>
          <span style={{ display: 'block', color: '#64748b', fontWeight: 500 }}>{headline1}</span>
          <span style={{ display: 'block', color: '#090d16', fontWeight: 800 }}>{headline2}</span>
        </h1>

        <p style={{
          marginTop: '18px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '560px',
          color: '#334155',
          fontSize: 'clamp(13.5px, 1.1vw, 16px)',
          lineHeight: 1.6,
          fontWeight: 500,
          textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)'
        }}>
          {subline}
        </p>

        {/* Rainbow Underglow Pill CTA & Catalog Quick-Jump */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: 'clamp(28px, 3.2vw, 44px)',
            pointerEvents: 'auto',
            flexWrap: 'wrap'
          }}
        >
          {/* Main Rainbow Glow Pill */}
          <div 
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
          >
            <div 
              style={{
                position: 'absolute',
                left: '6%',
                right: '6%',
                bottom: isCtaHovered ? '-10px' : '-6px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #ffcf5a, #7dffa8, #5ad7ff, #9b7bff, #ff6fd8, #ffb36b)',
                filter: isCtaHovered ? 'blur(13px)' : 'blur(9px)',
                opacity: isCtaHovered ? 1 : 0.85,
                zIndex: 1,
                pointerEvents: 'none',
                transition: 'all 0.3s ease'
              }}
            />

            <button
              onClick={handleCta}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                position: 'relative',
                zIndex: 2,
                backgroundColor: '#111111',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 26px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
                boxShadow: isCtaHovered ? '0 8px 24px rgba(0,0,0,0.25)' : '0 4px 14px rgba(0,0,0,0.15)',
                transform: isCtaHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              <span>{ctaText}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Quick-Jump to Catalog Button */}
          <button
            onClick={scrollToCatalog}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.90)',
              color: '#1e293b',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              fontSize: '13.5px',
              fontWeight: 600,
              padding: '11px 20px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.color = '#0071ba';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.90)';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.color = '#1e293b';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore 18+ Certified Partners</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Real OEM Partner Brand Logos at Bottom */}
      <div 
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 4.5vh, 48px)',
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(24px, 4.2vw, 60px)',
          flexWrap: 'wrap',
          padding: '0 16px',
          color: '#64748b',
          zIndex: 10
        }}
      >
        {/* Honeywell */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="Honeywell Gold Partner">
          <HoneywellLogo height={24} />
        </div>

        {/* Zebra */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="Zebra Technologies Certified Partner">
          <ZebraLogo height={24} />
        </div>

        {/* Datalogic */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="Datalogic Partner">
          <DatalogicLogo height={24} />
        </div>

        {/* SOTI */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="SOTI MobiControl Enterprise Partner">
          <SotiLogo height={22} />
        </div>

        {/* Telesis */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="Telesis Laser Traceability Alliance">
          <TelesisLogo height={22} />
        </div>

        {/* GS1 India */}
        <div style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer' }} onClick={scrollToCatalog} className="hover:opacity-100 hover:scale-105" title="GS1 Global Standard Partner">
          <Gs1Logo height={28} />
        </div>
      </div>
    </div>
  );
};

// Also export alias for semantic clarity
export const SolidPartnersHandsHero = DotMatrixHandsSection;
export default DotMatrixHandsSection;
