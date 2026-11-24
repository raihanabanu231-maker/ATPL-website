import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

/**
 * PAIRS DATA ARRAY (ATPL -> Problem)
 * 10 pairs with subtle rotations (-2deg to +2deg) and alternating alignments.
 */
export const ROWS = [
  { id: 0, atpl: 'Live Real-Time Sync', problem: 'Inventory Drift', rotAtpl: -1.4, rotProb: 1.6, alignAtpl: 'flex-start', alignProb: 'flex-end' },
  { id: 1, atpl: 'Native SAP & Oracle', problem: 'Middleware Mess', rotAtpl: 1.2, rotProb: -1.5, alignAtpl: 'flex-end', alignProb: 'flex-start' },
  { id: 2, atpl: '<4-Hr Emergency SLA', problem: '3 to 7 Days Delay', rotAtpl: -1.8, rotProb: 1.4, alignAtpl: 'flex-start', alignProb: 'flex-end' },
  { id: 3, atpl: '100% In-House WMS', problem: 'Unorganized IT', rotAtpl: 1.5, rotProb: -1.2, alignAtpl: 'flex-end', alignProb: 'flex-start' },
  { id: 4, atpl: 'Zero Scanner Tax', problem: 'Manual Scans', rotAtpl: -1.1, rotProb: 1.8, alignAtpl: 'flex-start', alignProb: 'flex-end' },
  { id: 5, atpl: 'Resident Engineers', problem: 'Vendor Spam', rotAtpl: 1.3, rotProb: -1.4, alignAtpl: 'flex-end', alignProb: 'flex-start' },
  { id: 6, atpl: 'IP67 Harsh Grade', problem: 'Broken Components', rotAtpl: -1.5, rotProb: 1.2, alignAtpl: 'flex-start', alignProb: 'flex-end' },
  { id: 7, atpl: 'Lab Golden-Staged', problem: 'Random Firmware', rotAtpl: 1.6, rotProb: -1.7, alignAtpl: 'flex-end', alignProb: 'flex-start' },
  { id: 8, atpl: 'Open Standards', problem: 'Costly Lock-In', rotAtpl: -1.2, rotProb: 1.5, alignAtpl: 'flex-start', alignProb: 'flex-end' },
  { id: 9, atpl: 'Zero Line Standstills', problem: 'Line Standstills', rotAtpl: 1.0, rotProb: -1.3, alignAtpl: 'flex-end', alignProb: 'flex-start' }
];

export const AtplSplitComparison = memo(() => {
  // Active pair highlight (either auto-demo or user hover)
  const [activeRow, setActiveRow] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  
  // Set of solved problem IDs
  const [solvedIds, setSolvedIds] = useState(new Set());
  
  // 3D tilt coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  // Dynamic coordinates for SVG connector line
  const [lineCoords, setLineCoords] = useState(null);
  
  // Refs
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const atplRefs = useRef([]);
  const probRefs = useRef([]);
  const autoDemoTimerRef = useRef(null);

  // Auto-demo rotation every 2.6s (paused on mouse enter)
  useEffect(() => {
    if (isMouseOver) {
      if (autoDemoTimerRef.current) clearInterval(autoDemoTimerRef.current);
      return;
    }
    autoDemoTimerRef.current = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % ROWS.length);
    }, 2600);
    return () => {
      if (autoDemoTimerRef.current) clearInterval(autoDemoTimerRef.current);
    };
  }, [isMouseOver]);

  // Which row is currently highlighted (hover overrides auto-demo)
  const effectiveActiveRow = hoveredRow !== null ? hoveredRow : activeRow;

  // Measure and compute the connecting dashed line coordinates
  const updateLine = useCallback(() => {
    if (effectiveActiveRow === null || !containerRef.current) {
      setLineCoords(null);
      return;
    }
    const atplEl = atplRefs.current[effectiveActiveRow];
    const probEl = probRefs.current[effectiveActiveRow];
    if (!atplEl || !probEl) {
      setLineCoords(null);
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const atplRect = atplEl.getBoundingClientRect();
    const probRect = probEl.getBoundingClientRect();

    // From right edge of ATPL chip to left edge of Problem chip
    const x1 = atplRect.right - containerRect.left;
    const y1 = atplRect.top + atplRect.height / 2 - containerRect.top;
    const x2 = probRect.left - containerRect.left;
    const y2 = probRect.top + probRect.height / 2 - containerRect.top;

    setLineCoords({ x1, y1, x2, y2 });
  }, [effectiveActiveRow]);

  useEffect(() => {
    updateLine();
    window.addEventListener('resize', updateLine);
    return () => window.removeEventListener('resize', updateLine);
  }, [updateLine]);

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max 5deg tilt
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsMouseOver(false);
    setHoveredRow(null);
  };

  // Spark burst helper using Web Animations API
  const createSparks = (x, y, color, count = 12) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      const size = 3 + Math.random() * 4;
      spark.style.position = 'absolute';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = '50%';
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 8px ${color}`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '60';
      container.appendChild(spark);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 25 + Math.random() * 45;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      const anim = spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 500 + Math.random() * 300,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      });

      anim.onfinish = () => {
        spark.remove();
      };
    }
  };

  // Flying dot + solve transition using Web Animations API
  const handleProblemClick = (rowId) => {
    if (solvedIds.has(rowId)) return;
    
    const atplEl = atplRefs.current[rowId];
    const probEl = probRefs.current[rowId];
    const container = containerRef.current;
    if (!atplEl || !probEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const probRect = probEl.getBoundingClientRect();
    const atplRect = atplEl.getBoundingClientRect();

    const startX = probRect.left + probRect.width / 2 - containerRect.left;
    const startY = probRect.top + probRect.height / 2 - containerRect.top;
    const endX = atplRect.left + atplRect.width / 2 - containerRect.left;
    const endY = atplRect.top + atplRect.height / 2 - containerRect.top;

    // 1. Burst red sparks from clicked red chip
    createSparks(startX, startY, '#ef4444', 14);

    // 2. Flying glowing white dot from problem to ATPL partner (1.1s)
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.left = `${startX}px`;
    dot.style.top = `${startY}px`;
    dot.style.width = '9px';
    dot.style.height = '9px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = '#ffffff';
    dot.style.boxShadow = '0 0 16px 4px #00f0ff, 0 0 6px #ffffff';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '55';
    container.appendChild(dot);

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const dotAnim = dot.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${deltaX * 0.5}px), calc(-50% + ${deltaY * 0.5 - 20}px)) scale(1.6)`, opacity: 1 },
      { transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(1)`, opacity: 1 }
    ], {
      duration: 1100,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    dotAnim.onfinish = () => {
      dot.remove();

      // 3. Burst green sparks and flash ATPL chip
      createSparks(endX, endY, '#10b981', 16);

      atplEl.animate([
        { transform: 'scale(1)', filter: 'brightness(1)' },
        { transform: 'scale(1.15)', filter: 'brightness(1.9) drop-shadow(0 0 24px #10b981)' },
        { transform: 'scale(1)', filter: 'brightness(1)' }
      ], {
        duration: 550,
        easing: 'ease-out'
      });

      // 4. Mark chip as solved (shows green ✓, strikethrough, grey fade)
      setSolvedIds((prev) => {
        const next = new Set(prev);
        next.add(rowId);
        
        // If all 10 are solved, fire celebratory confetti sparks
        if (next.size === ROWS.length) {
          setTimeout(() => {
            for (let i = 0; i < 4; i++) {
              setTimeout(() => {
                const rx = 100 + Math.random() * (containerRect.width - 200);
                const ry = 60 + Math.random() * (containerRect.height - 120);
                const colors = ['#00f0ff', '#10b981', '#38bdf8', '#ffc93c', '#ffffff'];
                createSparks(rx, ry, colors[i % colors.length], 20);
              }, i * 220);
            }
          }, 300);
        }
        return next;
      });
    };
  };

  const allSolved = solvedIds.size === ROWS.length;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        perspective: '1200px',
        userSelect: 'none',
        margin: '0 auto 1.5rem auto'
      }}
    >
      {/* Component Styles (Transform and Opacity GPU Composited) */}
      <style>{`
        /* Staggered entrance pop-in (0.9s duration, 160ms stagger) */
        @keyframes chipEntrance {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(12px);
          }
          70% {
            transform: scale(1.02) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Slow idle float (8s loop, 5px total displacement) */
        @keyframes chipIdleFloat {
          0%, 100% { transform: translateY(-2.5px); }
          50% { transform: translateY(2.5px); }
        }

        /* Cyan scan beam sweep every 7s */
        @keyframes cyanScanSweep {
          0% { transform: translateY(-100%); }
          45%, 100% { transform: translateY(350%); }
        }
        .cyan-scan-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 38%;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.16) 50%, transparent 100%);
          animation: cyanScanSweep 7s ease-in-out infinite;
          z-index: 2;
        }

        /* Red scan beam sweep every 7s (offset by 3.5s) */
        @keyframes redScanSweep {
          0% { transform: translateY(-100%); }
          45%, 100% { transform: translateY(350%); }
        }
        .red-scan-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 38%;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.16) 50%, transparent 100%);
          animation: redScanSweep 7s ease-in-out 3.5s infinite;
          z-index: 2;
        }

        /* Light shine streak across white ATPL chips every 5s */
        @keyframes atplShineGlider {
          0%, 25% { transform: translateX(-160%) skewX(-20deg); }
          50%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        .atpl-chip-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 113, 186, 0.22) 50%, transparent 100%);
          animation: atplShineGlider 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 3;
        }

        /* Slow blinking red cross icon (2.6s) */
        @keyframes redCrossBlink {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.92); }
        }
        .red-cross-blink {
          animation: redCrossBlink 2.6s ease-in-out infinite;
          display: inline-block;
        }

        /* Gentle glow on pill headings (3s) */
        @keyframes headingGlowCyan {
          0%, 100% { box-shadow: 0 0 12px rgba(0, 240, 255, 0.25); border-color: rgba(0, 240, 255, 0.4); }
          50% { box-shadow: 0 0 24px rgba(0, 240, 255, 0.65); border-color: rgba(0, 240, 255, 0.85); }
        }
        @keyframes headingGlowRed {
          0%, 100% { box-shadow: 0 0 12px rgba(239, 68, 68, 0.25); border-color: rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 24px rgba(239, 68, 68, 0.65); border-color: rgba(239, 68, 68, 0.85); }
        }
        .heading-cyan-glow {
          animation: headingGlowCyan 3s ease-in-out infinite;
        }
        .heading-red-glow {
          animation: headingGlowRed 3s ease-in-out infinite;
        }

        /* VS Pulsing Ring */
        @keyframes vsRingPulse {
          0% { transform: scale(0.9); opacity: 0.85; box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.6); }
          70% { transform: scale(1.4); opacity: 0; box-shadow: 0 0 0 14px rgba(0, 240, 255, 0); }
          100% { transform: scale(0.9); opacity: 0; }
        }
        .vs-pulsing-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 240, 255, 0.6);
          animation: vsRingPulse 2.8s ease-out infinite;
          pointer-events: none;
        }

        /* Flowing animated dash for connector gradient line */
        @keyframes connectorDash {
          to { stroke-dashoffset: -20; }
        }
        .connector-animated-line {
          animation: connectorDash 1s linear infinite;
        }

        /* Responsive Layout Grid */
        .split-comp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          position: relative;
        }
        @media (max-width: 640px) {
          .split-comp-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .vs-badge-wrapper {
            display: none !important;
          }
          .split-comp-row {
            height: 40px !important;
          }
          .split-comp-chip {
            font-size: 0.72rem !important;
            padding: 0.32rem 0.65rem !important;
          }
        }

        /* Accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .cyan-scan-beam,
          .red-scan-beam,
          .atpl-chip-shine,
          .red-cross-blink,
          .heading-cyan-glow,
          .heading-red-glow,
          .vs-pulsing-ring,
          .connector-animated-line {
            animation: none !important;
          }
          .chip-idle-wrapper {
            animation: none !important;
          }
        }
      `}</style>

      {/* 3D Tilting Panel Container */}
      <div
        className="split-comp-grid"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* =====================================================================
            LEFT PANEL: "● The ATPL way" (Cyan border, blue gradient, 10 chips)
           ===================================================================== */}
        <div
          style={{
            backgroundColor: 'rgba(5, 14, 32, 0.94)',
            backgroundImage: 'linear-gradient(180deg, rgba(6, 24, 52, 0.94) 0%, rgba(4, 12, 28, 0.96) 100%)',
            border: '1.5px solid rgba(0, 240, 255, 0.45)',
            borderRadius: '20px',
            padding: '1.1rem 1.15rem 1.25rem 1.15rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 113, 186, 0.22)'
          }}
        >
          {/* Cyan Scan Beam Sweep */}
          <div className="cyan-scan-beam" />

          {/* Heading: Glowing Cyan Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.15rem', position: 'relative', zIndex: 10 }}>
            <div
              className="heading-cyan-glow"
              style={{
                backgroundColor: 'rgba(0, 240, 255, 0.12)',
                border: '1.2px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '999px',
                padding: '0.35rem 1.15rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.02em'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              <span>The</span>
              <span style={{ color: '#00f0ff' }}>ATPL</span>
              <span>way</span>
            </div>
          </div>

          {/* 10 Equal 44px Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', position: 'relative', zIndex: 10 }}>
            {ROWS.map((row, idx) => {
              const isActive = effectiveActiveRow === row.id;
              const isSolved = solvedIds.has(row.id);
              const isDimmed = effectiveActiveRow !== null && !isActive;

              return (
                <div
                  key={row.id}
                  className="split-comp-row"
                  style={{
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: row.alignAtpl,
                    position: 'relative'
                  }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Idle Floating & Entrance Wrapper */}
                  <div
                    className="chip-idle-wrapper"
                    style={{
                      animation: `chipEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.16}s backwards, chipIdleFloat 8s ease-in-out ${idx * 0.35}s infinite`,
                      display: 'inline-flex'
                    }}
                  >
                    {/* The ATPL Chip (White pill with dark text and cyan ✓) */}
                    <div
                      ref={(el) => { atplRefs.current[row.id] = el; }}
                      data-atpl-id={row.id}
                      className="split-comp-chip"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#050a14',
                        borderRadius: '9999px',
                        padding: '0.4rem 0.95rem',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transform: isActive 
                          ? 'scale(1.08) rotate(0deg)' 
                          : `scale(1) rotate(${row.rotAtpl}deg)`,
                        opacity: isDimmed ? 0.32 : 1,
                        boxShadow: isActive
                          ? '0 0 24px rgba(0, 240, 255, 0.8), 0 4px 16px rgba(0, 0, 0, 0.45)'
                          : '0 3px 12px rgba(0, 0, 0, 0.35)',
                        border: isActive ? '1.5px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.9)',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, box-shadow 0.25s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Sweep Shine Streak on each white chip */}
                      <div className="atpl-chip-shine" />

                      <span style={{ color: '#0071ba', fontWeight: 900, fontSize: '0.86rem' }}>✓</span>
                      <span>{row.atpl}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: "● Without ATPL" (Red border, dark red gradient, 10 chips)
           ===================================================================== */}
        <div
          style={{
            backgroundColor: 'rgba(20, 6, 12, 0.94)',
            backgroundImage: 'linear-gradient(180deg, rgba(38, 10, 20, 0.94) 0%, rgba(18, 4, 10, 0.96) 100%)',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
            borderRadius: '20px',
            padding: '1.1rem 1.15rem 1.25rem 1.15rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(239, 68, 68, 0.18)'
          }}
        >
          {/* Red Scan Beam Sweep */}
          <div className="red-scan-beam" />

          {/* Heading: Glowing Red Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.15rem', position: 'relative', zIndex: 10 }}>
            <div
              className="heading-red-glow"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1.2px solid rgba(239, 68, 68, 0.45)',
                borderRadius: '999px',
                padding: '0.35rem 1.15rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#fca5a5',
                letterSpacing: '0.02em'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
              <span>Without ATPL</span>
            </div>
          </div>

          {/* 10 Equal 44px Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', position: 'relative', zIndex: 10 }}>
            {ROWS.map((row, idx) => {
              const isActive = effectiveActiveRow === row.id;
              const isSolved = solvedIds.has(row.id);
              const isDimmed = effectiveActiveRow !== null && !isActive;

              return (
                <div
                  key={row.id}
                  className="split-comp-row"
                  style={{
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: row.alignProb,
                    position: 'relative'
                  }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Idle Floating & Entrance Wrapper */}
                  <div
                    className="chip-idle-wrapper"
                    style={{
                      animation: `chipEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.16 + 0.08}s backwards, chipIdleFloat 8s ease-in-out ${idx * 0.35 + 0.5}s infinite`,
                      display: 'inline-flex'
                    }}
                  >
                    {/* Problem Chip (Translucent red with red ✕; becomes grey with green ✓ when solved) */}
                    <div
                      ref={(el) => { probRefs.current[row.id] = el; }}
                      data-prob-id={row.id}
                      onClick={() => handleProblemClick(row.id)}
                      className="split-comp-chip"
                      title={isSolved ? "Problem resolved with ATPL" : "Click to solve with ATPL"}
                      style={{
                        backgroundColor: isSolved ? 'rgba(148, 163, 184, 0.08)' : 'rgba(239, 68, 68, 0.18)',
                        color: isSolved ? '#64748b' : '#fecaca',
                        border: isSolved 
                          ? '1px solid rgba(148, 163, 184, 0.25)' 
                          : (isActive ? '1.5px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.45)'),
                        borderRadius: '9999px',
                        padding: '0.4rem 0.95rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transform: isActive 
                          ? 'scale(1.08) rotate(0deg)' 
                          : `scale(1) rotate(${row.rotProb}deg)`,
                        opacity: isDimmed ? 0.32 : 1,
                        boxShadow: isActive && !isSolved
                          ? '0 0 24px rgba(239, 68, 68, 0.7), 0 4px 16px rgba(0, 0, 0, 0.45)'
                          : '0 3px 12px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, background-color 0.4s ease, color 0.4s ease',
                        cursor: isSolved ? 'default' : 'pointer',
                        textDecoration: isSolved ? 'line-through' : 'none'
                      }}
                    >
                      {isSolved ? (
                        <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.86rem' }}>✓</span>
                      ) : (
                        <span className="red-cross-blink" style={{ color: '#ef4444', fontWeight: 900, fontSize: '0.82rem' }}>✕</span>
                      )}
                      <span>{row.problem}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            CENTER: Round "VS" Badge with Soft Pulsing Ring
           ===================================================================== */}
        <div
          className="vs-badge-wrapper"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 35,
            pointerEvents: 'none'
          }}
        >
          <div className="vs-pulsing-ring" />
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#040b17',
              border: '1.5px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f0ff',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              boxShadow: '0 0 24px rgba(0, 240, 255, 0.55), inset 0 0 12px rgba(0, 240, 255, 0.25)'
            }}
          >
            VS
          </div>
        </div>

        {/* =====================================================================
            SVG DYNAMIC GRADIENT CONNECTOR LINE (Between active chips)
           ===================================================================== */}
        <svg
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 30,
            overflow: 'visible'
          }}
        >
          <defs>
            <linearGradient id="atplConnectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {lineCoords && (
            <path
              className="connector-animated-line"
              d={`M ${lineCoords.x1} ${lineCoords.y1} C ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.45} ${lineCoords.y1}, ${lineCoords.x1 + (lineCoords.x2 - lineCoords.x1) * 0.55} ${lineCoords.y2}, ${lineCoords.x2} ${lineCoords.y2}`}
              fill="none"
              stroke="url(#atplConnectorGrad)"
              strokeWidth="2.2"
              strokeDasharray="6 4"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))'
              }}
            />
          )}
        </svg>
      </div>

      {/* =====================================================================
          SUCCESS BANNER: When all 10 problems are solved
         ===================================================================== */}
      {allSolved && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.85rem 1.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1.5px solid #10b981',
            borderRadius: '999px',
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            boxShadow: '0 0 35px rgba(16, 185, 129, 0.45)',
            animation: 'chipPopIn 0.5s ease-out'
          }}
        >
          <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span>
          <span>All problems solved with ATPL — Enterprise Production Flow Restored</span>
        </div>
      )}
    </div>
  );
});
