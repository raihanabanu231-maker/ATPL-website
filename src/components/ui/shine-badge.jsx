"use client";
import React from 'react';

/**
 * 21st.dev Shine Badge with Live Beacon
 * Conforms to UI/UX Pro Max Priority #1 (Accessibility) & #6 (Typography & Color):
 * - Text contrast >= 4.5:1
 * - No emoji icons (Rule #10)
 * - Clear beacon pulse for real-time status indicators
 */
export const ShineBadge = ({
  children,
  icon,
  pulse = true,
  variant = 'cyan', // 'cyan', 'blue', 'amber', 'emerald'
  className = "",
  style = {}
}) => {
  const variants = {
    cyan: {
      bg: 'rgba(0, 113, 186, 0.12)',
      border: 'rgba(0, 240, 255, 0.35)',
      color: '#00f0ff',
      dot: '#00f0ff',
      dotGlow: 'rgba(0, 240, 255, 0.6)'
    },
    blue: {
      bg: 'rgba(0, 113, 186, 0.15)',
      border: 'rgba(56, 189, 248, 0.35)',
      color: '#0284c7',
      dot: '#0284c7',
      dotGlow: 'rgba(2, 132, 199, 0.5)'
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.35)',
      color: '#d97706',
      dot: '#f59e0b',
      dotGlow: 'rgba(245, 158, 11, 0.5)'
    },
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.35)',
      color: '#059669',
      dot: '#10b981',
      dotGlow: 'rgba(16, 185, 129, 0.5)'
    }
  };

  const current = variants[variant] || variants.cyan;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.color,
        padding: '0.35rem 0.95rem',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 800,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono, monospace)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 0 15px ${current.bg}`,
        ...style
      }}
    >
      {pulse && (
        <span
          style={{
            position: 'relative',
            display: 'flex',
            height: '8px',
            width: '8px',
            flexShrink: 0
          }}
        >
          <span
            style={{
              position: 'absolute',
              display: 'inline-flex',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              backgroundColor: current.dot,
              opacity: 0.75,
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          />
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              borderRadius: '50%',
              height: '8px',
              width: '8px',
              backgroundColor: current.dot,
              boxShadow: `0 0 8px ${current.dotGlow}`
            }}
          />
        </span>
      )}

      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {React.isValidElement(icon) ? icon : (typeof icon === 'function' || typeof icon === 'object' ? React.createElement(icon, { size: 13 }) : null)}
        </span>
      )}

      <span>{children}</span>
    </div>
  );
};

