import React, { useEffect, useRef } from 'react';

export function DynamicMovingBackground({ currentView }) {
  const canvasRef = useRef(null);

  // Dynamic IIoT sensor node particle network with active live data packets
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = currentView !== 'home';
    const particleCount = width < 768 ? 35 : 70;
    const maxDistance = width < 768 ? 110 : 150;

    // Particle nodes definition
    const particles = [];
    const colors = isDark 
      ? [
          { r: 0, g: 240, b: 255 },   // Electric Cyan
          { r: 0, g: 113, b: 186 },   // Royal Blue
          { r: 232, g: 88, b: 116 },  // Cyber Coral
          { r: 16, g: 185, b: 129 },  // Emerald
          { r: 139, g: 92, b: 246 }   // Violet
        ]
      : [
          { r: 0, g: 113, b: 186 },
          { r: 2, g: 132, b: 199 },
          { r: 232, g: 88, b: 116 },
          { r: 0, g: 166, b: 81 }
        ];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2.2 + 1.2,
        color: colorObj,
        baseAlpha: isDark ? (Math.random() * 0.45 + 0.35) : (Math.random() * 0.3 + 0.2),
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Live data packets moving along connections
    const dataPackets = [];
    const maxPackets = width < 768 ? 12 : 25;

    for (let i = 0; i < maxPackets; i++) {
      dataPackets.push({
        from: Math.floor(Math.random() * particleCount),
        to: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: Math.random() * 0.012 + 0.006,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Mouse tracking for interactive magnetism
    let mouse = { x: -1000, y: -1000, radius: 160 };

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

      // 1. Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle push
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / distMouse) * force * 1.8;
          p.y -= (dyMouse / distMouse) * force * 1.8;
        }

        // Pulse alpha
        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.15;
        const c = p.color;

        // Draw particle halo & core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.9)`;
        ctx.shadowBlur = isDark ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with telemetry lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.35 : 0.2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${lineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw live data packet pulses traveling along connections
      for (let k = 0; k < dataPackets.length; k++) {
        const dp = dataPackets[k];
        const p1 = particles[dp.from];
        const p2 = particles[dp.to];

        if (p1 && p2) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            dp.progress += dp.speed;
            if (dp.progress > 1) {
              dp.progress = 0;
              dp.from = Math.floor(Math.random() * particleCount);
              dp.to = Math.floor(Math.random() * particleCount);
            }

            const currentX = p1.x + (p2.x - p1.x) * dp.progress;
            const currentY = p1.y + (p2.y - p1.y) * dp.progress;
            const c = dp.color;

            ctx.beginPath();
            ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.95)`;
            ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 1)`;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Find a valid pair that is close enough
            dp.from = Math.floor(Math.random() * particleCount);
            dp.to = Math.floor(Math.random() * particleCount);
            dp.progress = 0;
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
      {/* 1. Cybernetic Tech Grid Floor with Perspective & Movement */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(0, 240, 255, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.045) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(0, 113, 186, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 113, 186, 0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          animation: 'gridDriftSlow 30s linear infinite',
          opacity: 0.85
        }}
      />

      {/* 2. Top Radiant Spotlight Flare (Directly illuminates header region) */}
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
          background: isDark
            ? 'radial-gradient(ellipse at 50% 30%, rgba(0, 113, 186, 0.42) 0%, rgba(0, 240, 255, 0.22) 35%, rgba(232, 88, 116, 0.12) 65%, transparent 85%)'
            : 'radial-gradient(ellipse at 50% 30%, rgba(0, 113, 186, 0.18) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 80%)',
          filter: 'blur(60px)',
          animation: 'spotlightBreathe 10s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* 3. Luminous Morphing Aurora Plasma Clouds */}
      {/* Electric Cyan Cloud - Left */}
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
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(0, 113, 186, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(0, 113, 186, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 75%)',
          filter: 'blur(75px)',
          animation: 'orbFloatSlow 20s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />

      {/* Cyber Coral Cloud - Right */}
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
          background: isDark
            ? 'radial-gradient(circle, rgba(232, 88, 116, 0.22) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(232, 88, 116, 0.08) 0%, rgba(244, 114, 182, 0.03) 50%, transparent 75%)',
          filter: 'blur(80px)',
          animation: 'orbFloatAlt 24s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />

      {/* Emerald / Tech Green Cloud - Bottom Center */}
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '30%',
          width: '55vw',
          height: '55vw',
          maxWidth: '680px',
          maxHeight: '680px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(0, 113, 186, 0.1) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, rgba(52, 211, 153, 0.02) 50%, transparent 75%)',
          filter: 'blur(85px)',
          animation: 'orbPulse 18s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />

      {/* 4. Interactive Sensor Node Network Canvas (Sharp & Vibrant) */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      />

      {/* 5. Industrial Cyber Laser Scanline Wave */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2.5px',
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 113, 186, 0.3) 15%, rgba(0, 240, 255, 0.95) 50%, rgba(232, 88, 116, 0.4) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(0, 113, 186, 0.2) 15%, rgba(2, 132, 199, 0.6) 50%, rgba(232, 88, 116, 0.2) 85%, transparent 100%)',
          boxShadow: isDark ? '0 0 20px rgba(0, 240, 255, 0.7), 0 0 40px rgba(0, 240, 255, 0.4)' : '0 0 15px rgba(2, 132, 199, 0.4)',
          animation: 'laserScanlineSweep 10s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          opacity: isDark ? 0.85 : 0.45,
          zIndex: 3
        }}
      />

      {/* Keyframe Animations */}
      <style>{`
        @keyframes gridDriftSlow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 48px 48px;
          }
        }

        @keyframes spotlightBreathe {
          0% {
            opacity: 0.75;
            transform: translateX(-50%) scale(0.95);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.08);
          }
          100% {
            opacity: 0.75;
            transform: translateX(-50%) scale(0.95);
          }
        }

        @keyframes orbFloatSlow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(6vw, 10vh, 0) scale(1.18);
          }
          100% {
            transform: translate3d(-5vw, 5vh, 0) scale(0.92);
          }
        }

        @keyframes orbFloatAlt {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
          }
          50% {
            transform: translate3d(-8vw, -8vh, 0) scale(1.15);
          }
          100% {
            transform: translate3d(4vw, 6vh, 0) scale(1);
          }
        }

        @keyframes orbPulse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.75;
          }
          50% {
            transform: translate3d(4vw, -5vh, 0) scale(1.22);
            opacity: 1;
          }
          100% {
            transform: translate3d(-3vw, 3vh, 0) scale(0.96);
            opacity: 0.8;
          }
        }

        @keyframes laserScanlineSweep {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 1;
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
