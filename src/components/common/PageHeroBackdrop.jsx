import React, { useState } from 'react';

/**
 * HeroFilterPill: High-impact, luminous glassmorphism filter tab button.
 * Eliminates flat, lifeless dark boxes with reactive hover glow,
 * neon active borders, subtle 3D lift, and pulsing status pings.
 */
export function HeroFilterPill({
  active,
  onClick,
  label,
  accentColor = '#00f0ff',
  count = null,
  icon: Icon = null
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.25rem',
        borderRadius: '12px',
        fontSize: '0.88rem',
        fontWeight: active ? 700 : 500,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        // Glassmorphism styling
        background: active
          ? `linear-gradient(135deg, ${accentColor} 0%, rgba(0, 113, 186, 0.95) 100%)`
          : hovered
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(15, 23, 42, 0.72)',
        color: active ? '#ffffff' : hovered ? '#ffffff' : '#cbd5e1',
        border: active
          ? `1.5px solid ${accentColor}`
          : hovered
          ? `1px solid ${accentColor}80`
          : '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: active
          ? `0 0 24px ${accentColor}75, 0 8px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)`
          : hovered
          ? `0 0 16px ${accentColor}40, 0 4px 12px rgba(0, 0, 0, 0.3)`
          : '0 4px 12px rgba(0, 0, 0, 0.25)',
        transform: active || hovered ? 'translateY(-2px)' : 'translateY(0)',
        outline: 'none',
        userSelect: 'none'
      }}
    >
      {/* Active pulse dot */}
      {active && (
        <span 
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 8px #ffffff',
            animation: 'heroPillDotPing 1.8s ease-in-out infinite'
          }}
        />
      )}

      {Icon && <Icon size={14} color={active ? '#ffffff' : hovered ? accentColor : '#94a3b8'} />}
      <span>{label}</span>

      {count !== null && (
        <span style={{
          fontSize: '0.72rem',
          padding: '0.1rem 0.45rem',
          borderRadius: '999px',
          background: active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          color: active ? '#ffffff' : '#94a3b8',
          fontWeight: 600
        }}>
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * PageHeroBackdrop: A high-impact, cyber-industrial hero header backdrop.
 * Features dual volumetric spotlights, animated cyber-matrix grid,
 * futuristic corner targeting brackets, and live telemetry badges
 * so page hero sections NEVER look numb, flat, or dead.
 */
export function PageHeroBackdrop({
  badgeIcon: BadgeIcon,
  badgeText,
  badgeColor = '#00f0ff',
  systemTag = null,
  title,
  highlightText,
  description,
  accentColor = '#0071ba',
  secondaryGlow = '#00f0ff',
  children,
  maxWidth = '1020px'
}) {
  return (
    <div 
      className="page-hero-backdrop-container"
      style={{
        position: 'relative',
        maxWidth: maxWidth,
        margin: '0 auto 3rem auto',
        padding: '3rem 2rem 2.25rem 2rem',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(14, 26, 49, 0.65) 0%, rgba(6, 11, 20, 0.45) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.15)',
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${accentColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textAlign: 'center'
      }}
    >
      {/* 1. Volumetric Dual-Cone Spotlight Beaming from top */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130%',
          height: '160%',
          background: `radial-gradient(ellipse 70% 50% at 50% 15%, ${accentColor}55 0%, ${secondaryGlow}30 35%, rgba(232, 88, 116, 0.12) 65%, transparent 85%)`,
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'heroSpotlightBreathe 9s ease-in-out infinite alternate'
        }}
      />

      {/* 2. Cybernetic Perspective Grid Matrix Layer */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${secondaryGlow}15 1px, transparent 1px), linear-gradient(to bottom, ${secondaryGlow}15 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 95% 75% at 50% 35%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 75% at 50% 35%, black 25%, transparent 85%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.85
        }}
      />

      {/* 3. Luminous Horizontal Cyber Scanline */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${badgeColor}40 25%, ${badgeColor} 50%, ${secondaryGlow}40 75%, transparent 100%)`,
          boxShadow: `0 0 18px ${badgeColor}, 0 0 35px ${badgeColor}60`,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 4. Industrial Corner Brackets [+] */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: `${badgeColor}80`,
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 2,
          fontWeight: 700
        }}
      >
        [ ATPL // 01 ]
      </div>
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: `${badgeColor}80`,
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 2,
          fontWeight: 700
        }}
      >
        {systemTag || '[ LIVE // SYNCD ]'}
      </div>

      {/* Hero Header Content (Front & Center) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Luminous Pill Badge with Live Beacon Ping */}
        {badgeText && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            backgroundColor: `${badgeColor}18`,
            border: `1.5px solid ${badgeColor}65`,
            color: badgeColor,
            padding: '0.42rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '1.15rem',
            boxShadow: `0 0 24px ${badgeColor}35, inset 0 0 12px ${badgeColor}20`,
            backdropFilter: 'blur(10px)'
          }}>
            {/* Live pulsating green/neon dot */}
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: badgeColor,
              boxShadow: `0 0 10px ${badgeColor}`,
              animation: 'heroPillDotPing 1.6s ease-in-out infinite'
            }} />
            {BadgeIcon && <BadgeIcon size={14} color={badgeColor} />}
            <span>{badgeText}</span>
          </div>
        )}

        {/* Main Page Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
          color: '#ffffff',
          marginBottom: '1.15rem',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.16,
          textShadow: '0 4px 25px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 113, 186, 0.35)'
        }}>
          {title} {highlightText && <span className="gradient-text">{highlightText}</span>}
        </h1>

        {/* Description */}
        {description && (
          <p style={{
            color: '#cbd5e1',
            fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
            lineHeight: 1.68,
            maxWidth: '820px',
            margin: '0 auto 2.25rem auto',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}>
            {description}
          </p>
        )}

        {/* Submenu Filter Pills Container */}
        {children && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.7rem',
            justifyContent: 'center',
            maxWidth: '960px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 3
          }}>
            {children}
          </div>
        )}

      </div>

      {/* Inline styles for subtle spotlight and ping animation */}
      <style>{`
        @keyframes heroSpotlightBreathe {
          0% {
            opacity: 0.7;
            transform: translateX(-50%) scale(0.95);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.08);
          }
          100% {
            opacity: 0.7;
            transform: translateX(-50%) scale(0.95);
          }
        }

        @keyframes heroPillDotPing {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
