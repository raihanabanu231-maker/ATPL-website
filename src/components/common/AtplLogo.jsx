import React from 'react';

/**
 * ATPL Official Brand Logo Component
 * Incorporates:
 * - Electric Sky Blue (#29A2E1) & Deep Blue
 * - Charcoal Arrow Body (#334155 / #1e293b)
 * - Signature ATPL Coral Bow Arc (#E85874)
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
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 1000 1000" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        {/* 1. Top Blue Triangle Facet */}
        <polygon 
          points="220,107 377,434 80,577" 
          fill="#29A6E8" 
        />

        {/* 2. Dark Charcoal Arrow Shaft */}
        <polygon 
          points="1,854 80,577 377,434 824,226 840,220 426,538" 
          fill="#2F4149" 
        />

        {/* 3. Teal Accent Band */}
        <polygon 
          points="229,678 426,538 457,600 296,731" 
          fill="#0E87A9" 
        />

        {/* 4. Bottom Light Blue Triangle Facet */}
        <polygon 
          points="296,731 457,600 648,1000" 
          fill="#3EA6E9" 
        />

        {/* 5. Arrowhead Tip Diamond */}
        <polygon 
          points="840,220 864,133 1000,107 910,225" 
          fill="#2F4149" 
        />

        {/* 6. Signature Coral Bow Arc */}
        <path 
          d="M436,34 L465,59 C605,180 740,430 740,580 C740,730 705,870 648,1000 C725,870 784,710 784,540 C784,370 655,140 436,34 Z" 
          fill="#E85874" 
        />
      </svg>

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
