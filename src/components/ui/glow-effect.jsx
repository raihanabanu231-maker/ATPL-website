import React, { useId } from 'react';
import { cn } from '../../lib/utils';

/**
 * High-Performance GPU-Composited GlowEffect
 * Replaces main-thread JavaScript gradient interpolation with native GPU CSS keyframes
 * (composite-only transform & opacity), eliminating DOM mutations and style recalcs.
 */
export function GlowEffect({
  className,
  style,
  colors = ['#00f0ff', '#0071ba', '#3b82f6', '#10b981'],
  mode = 'rotate',
  blur = 'medium',
  scale = 1,
  duration = 5,
}) {
  const blurMap = {
    softest: 'blur(8px)',
    soft: 'blur(16px)',
    medium: 'blur(24px)',
    strong: 'blur(36px)',
    stronger: 'blur(48px)',
    strongest: 'blur(64px)',
    none: 'none',
  };

  const filterStyle = typeof blur === 'number' ? `blur(${blur}px)` : blurMap[blur] || 'blur(24px)';
  const uniqueId = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  let background = '';
  let animationName = '';

  if (mode === 'rotate') {
    background = `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')}, ${colors[0]})`;
    animationName = `glow-rotate-${uniqueId}`;
  } else if (mode === 'pulse') {
    background = `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, ${colors[1] || colors[0]} 45%, transparent 75%)`;
    animationName = `glow-pulse-${uniqueId}`;
  } else if (mode === 'breathe') {
    background = `radial-gradient(ellipse at center, ${colors[0]} 0%, ${colors[1] || colors[0]} 45%, ${colors[2] || 'transparent'} 75%, transparent 100%)`;
    animationName = `glow-breathe-${uniqueId}`;
  } else if (mode === 'flowHorizontal') {
    background = `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`;
    animationName = `glow-flow-${uniqueId}`;
  } else if (mode === 'colorShift') {
    background = `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')}, ${colors[0]})`;
    animationName = `glow-rotate-${uniqueId}`;
  } else {
    background = `linear-gradient(to right, ${colors.join(', ')})`;
    animationName = 'none';
  }

  return (
    <>
      <style>{`
        @keyframes glow-rotate-${uniqueId} {
          from { transform: scale(${scale}) rotate(0deg); }
          to { transform: scale(${scale}) rotate(360deg); }
        }
        @keyframes glow-pulse-${uniqueId} {
          0%, 100% { transform: scale(${scale}); opacity: 0.35; }
          50% { transform: scale(${scale * 1.1}); opacity: 0.7; }
        }
        @keyframes glow-breathe-${uniqueId} {
          0%, 100% { transform: scale(${scale}); opacity: 0.45; }
          50% { transform: scale(${scale * 1.06}); opacity: 0.75; }
        }
        @keyframes glow-flow-${uniqueId} {
          0% { transform: scale(${scale}) translateX(-4%); }
          50% { transform: scale(${scale}) translateX(4%); }
          100% { transform: scale(${scale}) translateX(-4%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-effect-aura-${uniqueId} {
            animation: none !important;
          }
        }
      `}</style>
      <div
        className={cn('glow-effect-aura', `glow-effect-aura-${uniqueId}`, className)}
        style={{
          ...style,
          background,
          filter: filterStyle,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          transform: `scale(${scale})`,
          animation: animationName !== 'none' ? `${animationName} ${duration}s linear infinite` : 'none',
          transformOrigin: 'center center'
        }}
      />
    </>
  );
}
export default GlowEffect;
