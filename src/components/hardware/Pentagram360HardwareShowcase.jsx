import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  RotateCw, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Scan,
  Printer,
  Tablet,
  Flame,
  MousePointer
} from 'lucide-react';

export const PENTAGRAM_360_PRODUCTS = [
  {
    id: 'scanner',
    name: 'Granit XP 1991i Ultra-Rugged 1D/2D Imager',
    shortName: 'Granit XP Scanner',
    oem: 'Honeywell / ATPL',
    category: 'SCANNING SOLUTIONS',
    accentColor: '#00f0ff',
    secondaryGlow: '#0071ba',
    icon: Scan,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/scanner/frame_',
    extension: '.webp',
    tagline: '15-Meter High-Rack Range & 3.0m Concrete Drop Survival',
    summary: 'Engineered for punishment in severe industrial environments. Built to survive 3.0-meter drops to concrete and 7,000 tumbles at -30°C. Extended flex-range optics capture barcodes from near-contact up to 15 meters away across high-rack warehouse bays.',
    keyStats: [
      { label: 'Read Range', val: '0.1m to 15m' },
      { label: 'Drop Durability', val: '3.0m to Concrete' },
      { label: 'Cold Storage', val: '-30°C to +50°C' },
      { label: 'Sealing Rating', val: 'IP65 & IP67' }
    ],
    features: ['15m High-Rack Scanning', '3.0m Concrete Drop Spec', '-30°C Freezer Ready', 'Bluetooth Class 1 (100m)']
  },
  {
    id: 'printer',
    name: 'Industrial Printer - High Performance RFID',
    shortName: 'Industrial RFID Printer',
    oem: 'ATPL Industrial',
    category: 'PRINTING SOLUTIONS',
    accentColor: '#10b981',
    secondaryGlow: '#059669',
    icon: Printer,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/printer/frame_',
    extension: '.webp',
    tagline: '24/7 Thermal Precision with Integrated In-Line Barcode Verifier',
    summary: 'Takes industrial printing to a new level of accuracy and simplicity. Features integrated label verification technology that checks barcodes in real time and ensures 100% readability. Encodes RAIN RFID tags on standard paper labels and thick on-metal assets.',
    keyStats: [
      { label: 'Max Print Speed', val: '14 Inches / Sec' },
      { label: 'Resolution', val: '203 / 300 / 600 DPI' },
      { label: 'Verification', val: '1D/2D In-Line Verifier' },
      { label: 'Chassis', val: 'All-Metal Die-Cast' }
    ],
    features: ['14 IPS High Speed', 'Integrated 1D/2D Verifier', 'RAIN RFID On-Metal Encoder', 'Direct SAP XML Streaming']
  },
  {
    id: 'tablet',
    name: 'Mobility Edge Rugged Cold-Storage Tablet',
    shortName: 'Cold-Storage Tablet',
    oem: 'ATPL Enterprise',
    category: 'MOBILITY EDGE SOLUTIONS',
    accentColor: '#38bdf8',
    secondaryGlow: '#0284c7',
    icon: Tablet,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/tablet/frame_',
    extension: '.webp',
    tagline: 'Heated Freezer Optics & 1000-Nit Sunlight Gorilla Glass',
    summary: 'Built specifically for demanding conditions in cold storage areas (-30°C freezers), oily environments, and forklift vehicle mounts. Features heated scan windows to prevent frost condensation, glove-operable touchscreens, and hot-swappable 10-hour shift batteries.',
    keyStats: [
      { label: 'Operating Temp', val: '-30°C to +50°C' },
      { label: 'Display Brightness', val: '1000-Nit Sunlight' },
      { label: 'Vehicle Docks', val: 'Forklift & Bench Docks' },
      { label: 'Drop Protection', val: 'MIL-STD-810H' }
    ],
    features: ['-30°C Heated Window', 'Forklift Cradle Mount', 'Glove & Rain Touchscreen', 'Near/Far Auto-Focus Imager']
  },
  {
    id: 'laser',
    name: 'Telesis DPM Fiber Laser Marking System',
    shortName: 'Fiber Laser Marker',
    oem: 'ATPL Direct Marking',
    category: 'DIRECT PART MARKING',
    accentColor: '#f43f5e',
    secondaryGlow: '#be123c',
    icon: Flame,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/laser/frame_',
    extension: '.webp',
    tagline: 'Permanent Part Traceability with Zero Consumables & Air Cooling',
    summary: 'Operates reliably without chillers in rugged factory environments. Engineered for high-speed permanent marking, engraving, and etching of GS1 DataMatrix codes on coated metals, cast iron, and heat-sensitive plastics with negligible maintenance.',
    keyStats: [
      { label: 'Laser Source', val: '20W - 50W MOPA Fiber' },
      { label: 'Chiller Required', val: 'Zero (Air Cooled)' },
      { label: 'Precision', val: '0.01mm Galvo Head' },
      { label: 'Diode MTBF', val: '100,000+ Hours' }
    ],
    features: ['Operates Without Chillers', 'Zero Consumables Cost', 'Indelible DataMatrix Codes', 'PROFINET & PLC Fieldbus']
  }
];

export const Pentagram360HardwareShowcase = () => {
  const { openDemoModal } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProduct = PENTAGRAM_360_PRODUCTS[currentIndex];

  const canvasRef = useRef(null);
  const playheadRef = useRef({ frame: 0 });
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [spinSpeed, setSpinSpeed] = useState(1); // 0.5x, 1x, 2x
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);

  // Cached image objects
  const imagesCacheRef = useRef({});
  const animFrameIdRef = useRef(null);

  // Preload frames for current active product
  useEffect(() => {
    setIsLoaded(false);
    setLoadPercent(0);

    const productId = activeProduct.id;
    if (!imagesCacheRef.current[productId]) {
      imagesCacheRef.current[productId] = [];
    }

    const cachedList = imagesCacheRef.current[productId];
    if (cachedList.length === activeProduct.frameCount && cachedList[0]?.complete) {
      setIsLoaded(true);
      setLoadPercent(100);
      drawFrame(playheadRef.current.frame);
      return;
    }

    let loadedCount = 0;
    const total = activeProduct.frameCount;
    const loadedImages = [];

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = `${activeProduct.framePrefix}${String(i).padStart(4, '0')}${activeProduct.extension}`;
      img.onload = () => {
        loadedCount++;
        setLoadPercent(Math.round((loadedCount / total) * 100));
        if (i === 1) {
          drawFrame(0);
        }
        if (loadedCount === total) {
          setIsLoaded(true);
          drawFrame(playheadRef.current.frame);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) setIsLoaded(true);
      };
      loadedImages.push(img);
    }

    imagesCacheRef.current[productId] = loadedImages;
  }, [activeProduct]);

  // Draw specific frame index to canvas with retina sharpness
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const productId = activeProduct.id;
    const frames = imagesCacheRef.current[productId];
    if (!frames || frames.length === 0) return;

    const clamped = Math.max(0, Math.min(activeProduct.frameCount - 1, Math.round(frameIdx)));
    const img = frames[clamped];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawH = displayHeight * 0.88; // 88% height for elegant studio breathing room
      drawW = drawH * imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = (displayHeight - drawH) / 2;
    } else {
      drawW = displayWidth * 0.88;
      drawH = drawW / imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = (displayHeight - drawH) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [activeProduct]);

  // Automatic 360-degree rotation animation loop at 30 FPS
  useEffect(() => {
    if (!isAutoSpinning || isDraggingRef.current) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let lastTime = performance.now();
    const fpsInterval = (1000 / 30) / spinSpeed; // Adjust for speed multiplier

    const animate = (time) => {
      const elapsed = time - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);

        // Advance frame continuously
        playheadRef.current.frame = (playheadRef.current.frame + 1) % activeProduct.frameCount;
        const currentF = Math.round(playheadRef.current.frame);
        setCurrentFrameIndex(currentF);
        drawFrame(currentF);
      }
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isAutoSpinning, spinSpeed, activeProduct, drawFrame]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => drawFrame(playheadRef.current.frame);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Pointer drag to spin manually
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartFrameRef.current = playheadRef.current.frame;
    setIsAutoSpinning(false); // Pause auto-spin during active user scrubbing
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartXRef.current;

    // Sensible drag ratio: 12px drag = 1 frame
    const frameDelta = Math.round(deltaX / 10);
    const newFrame = (dragStartFrameRef.current + frameDelta + activeProduct.frameCount * 10) % activeProduct.frameCount;

    playheadRef.current.frame = newFrame;
    setCurrentFrameIndex(newFrame);
    drawFrame(newFrame);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Next and Previous equipment navigation
  const prevEquipment = () => {
    setCurrentIndex((prev) => (prev - 1 + PENTAGRAM_360_PRODUCTS.length) % PENTAGRAM_360_PRODUCTS.length);
    playheadRef.current.frame = 0;
    setCurrentFrameIndex(0);
  };

  const nextEquipment = () => {
    setCurrentIndex((prev) => (prev + 1) % PENTAGRAM_360_PRODUCTS.length);
    playheadRef.current.frame = 0;
    setCurrentFrameIndex(0);
  };

  // Calculate rotation degree (0° to 360°)
  const currentDegrees = Math.round((currentFrameIndex / activeProduct.frameCount) * 360);

  // Side peek items (matching Pentagram's left and right peek slides)
  const prevProduct = PENTAGRAM_360_PRODUCTS[(currentIndex - 1 + PENTAGRAM_360_PRODUCTS.length) % PENTAGRAM_360_PRODUCTS.length];
  const nextProduct = PENTAGRAM_360_PRODUCTS[(currentIndex + 1) % PENTAGRAM_360_PRODUCTS.length];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0a0e1a',
        borderRadius: '26px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 1.5rem 3.5rem 1.5rem',
        margin: '2rem 0 4rem 0',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), inset 0 0 50px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: `radial-gradient(circle, ${activeProduct.accentColor}18 0%, ${activeProduct.secondaryGlow}08 50%, transparent 75%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* =========================================================================
            HEADER: Product Title & Category Pill
           ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: activeProduct.accentColor,
                backgroundColor: `${activeProduct.accentColor}18`,
                border: `1px solid ${activeProduct.accentColor}44`,
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Sparkles size={13} />
              <span>✦ {activeProduct.category} // AUTOMATIC 360° TURNTABLE ✦</span>
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.025em'
            }}
          >
            {activeProduct.name}
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.96rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {activeProduct.tagline}
          </p>

        </div>

        {/* =========================================================================
            PENTAGRAM-STYLE WIDESCREEN 360° SHOWCASE STAGE (With Left/Right Peeks)
           ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            position: 'relative',
            marginBottom: '2rem'
          }}
        >
          {/* Left Peek Slide (Previous Equipment) */}
          <div
            onClick={prevEquipment}
            title={`Switch to ${prevProduct.shortName}`}
            style={{
              width: '180px',
              height: '380px',
              borderRadius: '18px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'none', // Shown on large screens
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
              cursor: 'pointer',
              opacity: 0.5,
              transform: 'scale(0.92)',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              userSelect: 'none'
            }}
            className="hidden-mobile-peek"
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(0.92)'; }}
          >
            <ChevronLeft size={24} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <div style={{ width: '80px', height: '80px', marginBottom: '1rem', overflow: 'hidden' }}>
              <img
                src={`${prevProduct.framePrefix}0001.webp`}
                alt={prevProduct.shortName}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
              {prevProduct.shortName}
            </span>
            <span style={{ fontSize: '0.62rem', color: prevProduct.accentColor, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              ✦ 360° VIEW
            </span>
          </div>

          {/* Central Main 360° Studio Turntable Stage (Exactly like Pentagram's SNL Showcase) */}
          <div
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            style={{
              flex: 1,
              maxWidth: '960px',
              height: '460px',
              position: 'relative',
              borderRadius: '22px',
              background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 60%, #e2e8f0 100%)',
              border: '2px solid rgba(255, 255, 255, 0.85)',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05), 0 25px 60px rgba(0, 0, 0, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            {/* Soft Elliptical Turntable Shadow beneath the rotating hardware */}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                width: '68%',
                height: '35px',
                background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.12) 55%, transparent 75%)',
                filter: 'blur(6px)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* The HTML5 Canvas Rendering 360° Image Sequence Frames */}
            <canvas
              ref={canvasRef}
              aria-label="Interactive 360-degree industrial equipment inspector"
              role="img"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />

            {/* Top-Right: Live 360° Degree Angle Gauge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(8, 14, 26, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                zIndex: 3
              }}
            >
              <RotateCw size={12} color={activeProduct.accentColor} className={isAutoSpinning ? 'spin-icon' : ''} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', fontWeight: 800, color: '#ffffff' }}>
                {currentDegrees}° TURNTABLE
              </span>
            </div>

            {/* Top-Left: Auto-Spin Status Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(8, 14, 26, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                zIndex: 3
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isAutoSpinning ? '#0ae448' : '#fbbf24',
                  boxShadow: isAutoSpinning ? '0 0 10px #0ae448' : 'none'
                }}
              />
              <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                {isAutoSpinning ? 'AUTO 360° ACTIVE' : 'PAUSED (DRAG TO SCRUB)'}
              </span>
            </div>

            {/* Bottom-Center: Interactive Hint Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                backgroundColor: 'rgba(8, 14, 26, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '999px',
                padding: '0.35rem 0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            >
              <MousePointer size={12} color="#00f0ff" />
              <span style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#cbd5e1', fontWeight: 600 }}>
                DRAG OR SWIPE TO ROTATE 360° MANUALLY
              </span>
            </div>

            {/* Preload Progress Indicator */}
            {!isLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  zIndex: 4
                }}
              >
                <div style={{ width: '38px', height: '38px', border: '3px solid #0071ba', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
                  Loading 360° Studio Frames ({loadPercent}%)...
                </span>
              </div>
            )}
          </div>

          {/* Right Peek Slide (Next Equipment) */}
          <div
            onClick={nextEquipment}
            title={`Switch to ${nextProduct.shortName}`}
            style={{
              width: '180px',
              height: '380px',
              borderRadius: '18px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'none', // Shown on large screens
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
              cursor: 'pointer',
              opacity: 0.5,
              transform: 'scale(0.92)',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              userSelect: 'none'
            }}
            className="hidden-mobile-peek"
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(0.92)'; }}
          >
            <ChevronRight size={24} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <div style={{ width: '80px', height: '80px', marginBottom: '1rem', overflow: 'hidden' }}>
              <img
                src={`${nextProduct.framePrefix}0001.webp`}
                alt={nextProduct.shortName}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
              {nextProduct.shortName}
            </span>
            <span style={{ fontSize: '0.62rem', color: nextProduct.accentColor, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              ✦ 360° VIEW
            </span>
          </div>

        </div>

        {/* =========================================================================
            PENTAGRAM-STYLE BOTTOM FLOATING CAPSULE CONTROLS & PRODUCT SWITCHER
           ========================================================================= */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Previous Button */}
          <button
            onClick={prevEquipment}
            style={{
              padding: '0.6rem 1.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '999px',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          {/* Auto-Spin Toggle Button */}
          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            style={{
              padding: '0.6rem 1.5rem',
              backgroundColor: isAutoSpinning ? activeProduct.accentColor : 'rgba(255, 255, 255, 0.08)',
              color: isAutoSpinning ? '#070c18' : '#ffffff',
              border: `1.5px solid ${activeProduct.accentColor}`,
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: isAutoSpinning ? `0 0 20px ${activeProduct.accentColor}55` : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {isAutoSpinning ? <Pause size={15} /> : <Play size={15} />}
            <span>{isAutoSpinning ? 'Pause 360° Spin' : 'Resume Auto 360° Spin'}</span>
          </button>

          {/* Speed Multiplier Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              padding: '3px'
            }}
          >
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpinSpeed(spd)}
                style={{
                  background: spinSpeed === spd ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                  color: spinSpeed === spd ? '#00f0ff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {spd}×
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextEquipment}
            style={{
              padding: '0.6rem 1.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '999px',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Equipment Selector Pills (Direct Product Selection) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', marginBottom: '2.5rem' }}>
          {PENTAGRAM_360_PRODUCTS.map((prod, idx) => {
            const isSelected = currentIndex === idx;
            const ProdIcon = prod.icon;
            return (
              <button
                key={prod.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  playheadRef.current.frame = 0;
                  setCurrentFrameIndex(0);
                }}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  border: isSelected ? `2px solid ${prod.accentColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: isSelected ? `${prod.accentColor}18` : 'rgba(15, 23, 42, 0.7)',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: isSelected ? `0 0 20px ${prod.accentColor}33` : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <ProdIcon size={14} color={isSelected ? prod.accentColor : '#64748b'} />
                <span>{prod.shortName}</span>
                <span style={{ fontSize: '0.62rem', color: prod.accentColor, fontWeight: 800, textTransform: 'uppercase' }}>
                  (360°)
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TECHNICAL SPECIFICATIONS & QUOTE ACTION FOOTER
           ========================================================================= */}
        <div
          style={{
            backgroundColor: 'rgba(11, 18, 32, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '2rem 2.2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', color: activeProduct.accentColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              OEM &amp; MODEL: {activeProduct.oem}
            </div>
            <h3 style={{ fontSize: '1.45rem', color: '#ffffff', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              {activeProduct.name}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
              {activeProduct.summary}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            {activeProduct.keyStats.map((stat, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '0.65rem 0.85rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>{stat.label}</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{stat.val}</div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              onClick={() => openDemoModal({ solution: activeProduct.name, notes: `Inquiry from 360 Turntable: ${activeProduct.name}` })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: `1px solid ${activeProduct.accentColor}66`,
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 18px rgba(0, 113, 186, 0.45)',
                transition: 'transform 0.2s ease'
              }}
            >
              <span>Request Quote / Pilot Test</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.74rem', color: '#64748b' }}>
              Immediate Technical Dispatch Across India
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 3s linear infinite;
        }
        @media (min-width: 1200px) {
          .hidden-mobile-peek {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
