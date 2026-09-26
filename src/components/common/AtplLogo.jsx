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
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        {/* 1. Top Blue Triangle Facet */}
        <polygon 
          points="22,10.5 38,43 0,58 22,10.5" 
          fill="#29A2E1" 
        />

        {/* 2. Middle Teal/Blue Accent Strip */}
        <polygon 
          points="23,54 44,53 29,73 23,54" 
          fill="#0284c7" 
        />

        {/* 3. Bottom Blue Wing */}
        <polygon 
          points="29,73 65,99.5 38,62 29,73" 
          fill="#38bdf8" 
        />

        {/* 4. Dark Arrow Main Shaft */}
        <polygon 
          points="0,85 38,51 83,22 75,34 0,85" 
          fill="#334155" 
        />

        {/* 5. Dark Arrow Tip Diamond */}
        <polygon 
          points="83,22 100,10.5 89,22.5 83,22" 
          fill="#1e293b" 
        />
        <polygon 
          points="89,22.5 100,10.5 91.5,27.5 89,22.5" 
          fill="#334155" 
        />

        {/* 6. Signature Brand Coral Bow Arc (#E85874) */}
        <path 
          d="M42 0.5 C55 3 67 11 75.5 22.5 C84.5 35 88 50 85 65.5 C82 80 72.5 92 65 99.5 C67 92 72.5 78.5 74.5 65 C76.5 51.5 73 38 65 27 C57 16 47 9 42 0.5 Z" 
          fill="#E85874" 
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontWeight: 900,
            fontSize: `${Math.round(size * 0.44)}px`,
            letterSpacing: '-0.03em',
            color: lightText ? '#ffffff' : '#0f172a',
            lineHeight: 1
          }}>
            ATPL
          </div>
          <div style={{
            fontSize: `${Math.max(9, Math.round(size * 0.2))}px`,
            letterSpacing: '0.14em',
            color: '#0071ba',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>ARCHERY TECHNOCRATS</span>
            <span style={{ 
              display: 'inline-block', 
              width: '5px', 
              height: '5px', 
              borderRadius: '50%', 
              backgroundColor: '#E85874',
              boxShadow: '0 0 6px rgba(232, 88, 116, 0.6)'
            }} />
          </div>
        </div>
      )}
    </div>
  );
};
