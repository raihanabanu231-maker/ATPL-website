import React from 'react';
import atplLogoImg from '../../../assets/images/atpl_logo.png';

/**
 * ATPL Official Brand Logo Component
 * Incorporates:
 * - Official ATPL Emblem: Electric Sky Blue & Deep Teal Bow Facets, Charcoal Arrow & Signature Coral Arc
 */
export const AtplLogo = ({ 
  size = 38, 
  className = '', 
  showText = false, 
  lightText = false,
  onClick = undefined 
}) => {
  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        cursor: onClick ? 'pointer' : 'default', 
        userSelect: 'none' 
      }} 
      className={className}
    >
      <img 
        src={atplLogoImg} 
        alt="ATPL Archery Technocrats Official Logo" 
        width={size} 
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          flexShrink: 0,
          display: 'block'
        }}
      />

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.1 }}>
          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontWeight: 900,
            fontSize: `${Math.round(size * 0.44)}px`,
            letterSpacing: '-0.02em',
            color: lightText ? '#ffffff' : '#0f172a',
            lineHeight: 1
          }}>
            ATPL
          </div>
          <div style={{
            fontSize: `${Math.max(9, Math.round(size * 0.2))}px`,
            letterSpacing: '0.12em',
            color: lightText ? '#38bdf8' : '#0071ba',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginTop: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ 
              textShadow: lightText ? '0 0 12px rgba(56, 189, 248, 0.4)' : 'none',
              letterSpacing: '0.1em'
            }}>
              ARCHERY TECHNOCRATS
            </span>
            <span style={{ 
              display: 'inline-block', 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              backgroundColor: '#E85874',
              boxShadow: lightText ? '0 0 8px #E85874' : '0 0 4px rgba(232, 88, 116, 0.5)',
              flexShrink: 0
            }} />
          </div>
        </div>
      )}
    </div>
  );
};
