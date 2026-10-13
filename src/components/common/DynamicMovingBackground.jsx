import React, { useEffect, useRef } from 'react';

export function DynamicMovingBackground({ currentView }) {
  const canvasRef = useRef(null);

  // Dynamic IIoT sensor node particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Count tailored for smooth 60fps performance
    const isDark = currentView !== 'home';
    const particleCount = width < 768 ? 24 : 45;
    const maxDistance = width < 768 ? 90 : 130;

    // Particle definition
    const particles = [];
    const colors = isDark 
      ? ['rgba(56, 189, 248, ', 'rgba(0, 113, 186, ', 'rgba(16, 185, 129, ', 'rgba(99, 102, 241, ']
      : ['rgba(0, 113, 186, ', 'rgba(2, 132, 199, ', 'rgba(0, 154, 68, ', 'rgba(79, 70, 229, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: isDark ? (Math.random() * 0.4 + 0.25) : (Math.random() * 0.25 + 0.12),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Mouse tracking for subtle interactive magnetism
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
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle interaction
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / distMouse) * force * 1.5;
          p.y -= (dyMouse / distMouse) * force * 1.5;
        }

        // Pulse alpha
        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${Math.max(0.05, currentAlpha)})`;
        ctx.shadowColor = `${p.colorBase}0.8)`;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with subtle data telemetry lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${p.colorBase}${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
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
  }, [currentView]);

  const isDark = currentView !== 'home';

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
      {/* 1. Large Morphing Aurora Gradient Orbs (Silky smooth GPU CSS) */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '55vw',
          height: '55vw',
          maxWidth: '650px',
          maxHeight: '650px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 113, 186, 0.28) 0%, rgba(2, 132, 199, 0.08) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(0, 113, 186, 0.12) 0%, rgba(56, 189, 248, 0.04) 60%, transparent 80%)',
          filter: 'blur(70px)',
          animation: 'orbFloatSlow 22s ease-in-out infinite alternate',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform'
        }}
      />

      <div 
        style={{
          position: 'absolute',
          top: '35%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          maxWidth: '600px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 154, 68, 0.22) 0%, rgba(16, 185, 129, 0.06) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(0, 154, 68, 0.08) 0%, rgba(52, 211, 153, 0.03) 60%, transparent 80%)',
          filter: 'blur(80px)',
          animation: 'orbFloatAlt 28s ease-in-out infinite alternate',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform'
        }}
      />

      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '25%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(0, 240, 255, 0.05) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, rgba(14, 165, 233, 0.02) 60%, transparent 80%)',
          filter: 'blur(90px)',
          animation: 'orbPulse 20s ease-in-out infinite alternate',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform'
        }}
      />

      {/* 2. Interactive Sensor Node Network Canvas */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* 3. Subtle Industrial Cyber Laser Scanline Wave */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 113, 186, 0.2) 20%, rgba(0, 240, 255, 0.6) 50%, rgba(0, 154, 68, 0.2) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(0, 113, 186, 0.1) 20%, rgba(2, 132, 199, 0.35) 50%, rgba(0, 154, 68, 0.1) 80%, transparent 100%)',
          boxShadow: isDark ? '0 0 15px rgba(0, 240, 255, 0.4)' : '0 0 10px rgba(2, 132, 199, 0.2)',
          animation: 'laserScanlineSweep 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          opacity: isDark ? 0.65 : 0.35
        }}
      />

      {/* Inline Keyframe Animations */}
      <style>{`
        @keyframes orbFloatSlow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(8vw, 12vh, 0) scale(1.15);
          }
          100% {
            transform: translate3d(-6vw, 6vh, 0) scale(0.92);
          }
        }

        @keyframes orbFloatAlt {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
          }
          50% {
            transform: translate3d(-10vw, -10vh, 0) scale(1.12);
          }
          100% {
            transform: translate3d(5vw, 8vh, 0) scale(1);
          }
        }

        @keyframes orbPulse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(5vw, -6vh, 0) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate3d(-4vw, 4vh, 0) scale(0.95);
            opacity: 0.85;
          }
        }

        @keyframes laserScanlineSweep {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh);
            opacity: 0;
          }
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
