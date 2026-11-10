import React, { useEffect, useRef } from 'react';

export function DynamicMovingBackground({ currentView }) {
  const canvasRef = useRef(null);
  const isDark = currentView !== 'home';

  // Do not run dynamic canvas or background effects on home page for clean, crisp aesthetic
  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = width < 768 ? 16 : 32;

    // Particle nodes definition - floating ambient glowing nodes without connecting lines
    const particles = [];
    const colors = [
      { r: 0, g: 240, b: 255 },   // Electric Cyan
      { r: 0, g: 113, b: 186 },   // Royal Blue
      { r: 232, g: 88, b: 116 },  // Cyber Coral
      { r: 16, g: 185, b: 129 },  // Emerald
      { r: 139, g: 92, b: 246 }   // Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 1.2,
        color: colorObj,
        baseAlpha: Math.random() * 0.35 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Mouse tracking for gentle push
    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw gentle glowing floating particles without any connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / distMouse) * force * 1.5;
          p.y -= (dyMouse / distMouse) * force * 1.5;
        }

        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.12;
        const c = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  // On Home view, keep background completely clean and static
  if (!isDark) {
    return null;
  }

  return (
    <div 
      className="dynamic-bg-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Static Subtle Grid Matrix (NO animated drift) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          opacity: 0.6
        }}
      />

      {/* Top Radiant Spotlight Flare */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85vw',
          height: '520px',
          maxWidth: '1200px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0, 113, 186, 0.35) 0%, rgba(0, 240, 255, 0.18) 35%, rgba(232, 88, 116, 0.08) 65%, transparent 85%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* Luminous Soft Aurora Clouds */}
      <div 
        style={{
          position: 'absolute',
          top: '5%',
          left: '-5%',
          width: '50vw',
          height: '50vw',
          maxWidth: '650px',
          maxHeight: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, rgba(0, 113, 186, 0.1) 50%, transparent 75%)',
          filter: 'blur(75px)',
          animation: 'orbFloatSlow 20s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />

      <div 
        style={{
          position: 'absolute',
          top: '25%',
          right: '-8%',
          width: '48vw',
          height: '48vw',
          maxWidth: '620px',
          maxHeight: '620px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 88, 116, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)',
          filter: 'blur(80px)',
          animation: 'orbFloatAlt 24s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />

      {/* Interactive Sensor Node Network Canvas (NO dynamic connecting lines) */}
      <canvas 
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      />

      <style>{`
        @keyframes orbFloatSlow {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(6vw, 10vh, 0) scale(1.18); }
          100% { transform: translate3d(-5vw, 5vh, 0) scale(0.92); }
        }
        @keyframes orbFloatAlt {
          0% { transform: translate3d(0, 0, 0) scale(0.95); }
          50% { transform: translate3d(-8vw, -8vh, 0) scale(1.15); }
          100% { transform: translate3d(4vw, 6vh, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dynamic-bg-container * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
