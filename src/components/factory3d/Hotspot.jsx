import React from 'react';
import { Html } from '@react-three/drei';

export const Hotspot = ({ node, isSelected, isHovered, onSelect }) => {
  const isHighlighted = isSelected || isHovered;
  const borderColor = isSelected ? '#FFC93C' : isHovered ? '#18E0FF' : 'rgba(24, 224, 255, 0.55)';
  const badgeBg = isSelected ? '#FFC93C' : 'rgba(24, 224, 255, 0.2)';
  const badgeColor = isSelected ? '#02101C' : '#18E0FF';

  return (
    <Html
      position={[0, node.id === 'inspectionDrones' ? 1.6 : 3.8, 0]}
      center
      distanceFactor={34}
      style={{ pointerEvents: 'auto', userSelect: 'none' }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        aria-label={`Select station ${node.number} ${node.name}`}
        style={{
          background: isSelected 
            ? 'rgba(7, 20, 38, 0.96)' 
            : isHovered 
              ? 'rgba(6, 24, 48, 0.92)' 
              : 'rgba(2, 16, 28, 0.85)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: '8px',
          padding: '0.38rem 0.75rem',
          boxShadow: isSelected 
            ? '0 0 25px rgba(255, 201, 60, 0.7), 0 8px 24px rgba(0,0,0,0.85)' 
            : isHovered 
              ? '0 0 20px rgba(24, 224, 255, 0.6), 0 6px 18px rgba(0,0,0,0.7)' 
              : '0 4px 16px rgba(0,0,0,0.6)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHighlighted ? 'scale(1.08)' : 'scale(1)',
          whiteSpace: 'nowrap',
          outline: 'none'
        }}
      >
        {/* Pulsing Signal Dot */}
        <span 
          style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: isSelected ? '#FFC93C' : '#18E0FF', 
            boxShadow: `0 0 8px ${isSelected ? '#FFC93C' : '#18E0FF'}`,
            display: 'inline-block' 
          }}
        />

        {/* Station Number Badge */}
        <span style={{
          background: badgeBg,
          color: badgeColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '4px',
          padding: '0.05rem 0.32rem',
          fontFamily: 'monospace, var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 900
        }}>
          {node.number}
        </span>

        {/* Station Name */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: '0.82rem',
          color: '#ffffff',
          letterSpacing: '0.02em'
        }}>
          {node.name}
        </span>
      </button>
    </Html>
  );
};
