import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Play,
  Pause,
  RotateCw,
  Sliders,
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  CheckCircle2,
  Scan,
  Printer,
  Tablet,
  Flame
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// AUDIO TICK SYNTHESIZER (Synthesizes subtle futuristic mechanical clicks)
// ============================================================================
class HardwareSoundFX {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.lastTickTime = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playTick(frequency = 750) {
    if (this.muted) return;
    const now = Date.now();
    if (now - this.lastTickTime < 45) return; // Throttle ticks for smooth audio
    this.lastTickTime = now;

    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, t);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, t + 0.04);

      gain.gain.setValueAtTime(0.015, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }
}

const hwSfx = new HardwareSoundFX();

// ============================================================================
// FLAGSHIP HARDWARE PRODUCTS DATA CONFIGURATION
// ============================================================================
const HARDWARE_SEQUENCE_PRODUCTS = [
  {
    id: 'scanner',
    name: 'Granit XP 1991i Ultra-Rugged Imager',
    shortName: 'Granit XP Scanner',
    oem: 'Honeywell / ATPL',
    category: 'SCANNING SOLUTIONS',
    accentColor: '#00f0ff',
    secondaryGlow: '#0071ba',
    icon: Scan,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/scanner/frame_',
    extension: '.webp',
    tagline: 'Flex-Range 15m High-Rack Imager with 3.0m Concrete Drop Durability',
    summary: 'Engineered for punishment in severe industrial environments. Built to survive 3.0-meter drops to concrete and thousands of tumbles at -30°C. Extended flex-range optics capture barcodes from near-contact up to 15 meters away.',
    keyStats: [
      { label: 'Drop Survival', val: '3.0m Concrete' },
      { label: 'Scan Distance', val: '0.1m - 15m' },
      { label: 'Ingress Sealing', val: 'IP65 & IP67' },
      { label: 'Tumbles', val: '7,000 x 1m' }
    ],
    milestones: [
      { frame: 1, label: '01. Optics & Chassis', sub: 'Flex-Range Dual Lens' },
      { frame: 13, label: '02. DSP Engine', sub: 'Direct Part Mark DSP' },
      { frame: 25, label: '03. IP67 Rugged', sub: '3.0m Drop Exoskeleton' },
      { frame: 37, label: '04. RF Wireless', sub: 'Bluetooth Class 1' }
    ]
  },
  {
    id: 'printer',
    name: 'ATPL High-Speed RFID Industrial Printer',
    shortName: 'RFID Industrial Printer',
    oem: 'Honeywell / ATPL Solutions',
    category: 'PRINTING SOLUTIONS',
    accentColor: '#10b981',
    secondaryGlow: '#059669',
    icon: Printer,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/printer/frame_',
    extension: '.webp',
    tagline: '14 IPS Continuous 24/7 Thermal Transfer with Inline Verification',
    summary: 'Industrial printing to a new level of precision and simplicity. Features 14 IPS continuous thermal throughput, UHF RFID on-metal tag encoding, integrated 100% inline barcode grading, and direct SAP / Oracle WMS streaming.',
    keyStats: [
      { label: 'Print Speed', val: '14 IPS (355mm/s)' },
      { label: 'RFID Encoding', val: 'EPC Class 1 Gen 2' },
      { label: 'Verifier', val: '100% ISO Inline' },
      { label: 'Duty Cycle', val: '24/7 Heavy Industrial' }
    ],
    milestones: [
      { frame: 1, label: '01. Precision Head', sub: '14 IPS Thermal Transfer' },
      { frame: 13, label: '02. 100% Verifier', sub: 'Inline ISO/IEC Grading' },
      { frame: 25, label: '03. RFID Encoder', sub: 'On-Metal UHF Tag Head' },
      { frame: 37, label: '04. System Bus', sub: 'Dual-Core SAP Streamer' }
    ]
  },
  {
    id: 'tablet',
    name: 'Mobility Edge Cold Storage Tablet',
    shortName: 'Mobility Cold Tablet',
    oem: 'Mobility Edge Platform',
    category: 'MOBILITY EDGE SOLUTIONS',
    accentColor: '#38bdf8',
    secondaryGlow: '#0284c7',
    icon: Tablet,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/tablet/frame_',
    extension: '.webp',
    tagline: '1000-Nit Sunlight Gorilla Glass with -30°C Cold Storage Heater',
    summary: 'Designed for front-line mobile workers across retail yards, cross-dock bays, and -30°C cold storage freezers. Powered by enterprise Qualcomm architecture guaranteed for multi-generation OS updates.',
    keyStats: [
      { label: 'Display Luminance', val: '1000 Nits Bright' },
      { label: 'Operating Temp', val: '-30°C to +50°C' },
      { label: 'Battery Life', val: '10h Hot-Swappable' },
      { label: 'Scanner Engine', val: 'Integrated 2D Imager' }
    ],
    milestones: [
      { frame: 1, label: '01. Sunlight Display', sub: '1000 Nits Gorilla Glass' },
      { frame: 13, label: '02. -30°C Heater', sub: 'Internal Thermal Pack' },
      { frame: 25, label: '03. Top Imager', sub: 'Integrated Long-Range' },
      { frame: 37, label: '04. Mil-Spec Body', sub: 'Drop-Proof Elastomer' }
    ]
  },
  {
    id: 'laser',
    name: 'Telesis DPM Fiber Laser Marking System',
    shortName: 'Telesis Fiber Laser',
    oem: 'Telesis / ATPL Direct Marking',
    category: 'DIRECT PART MARKING',
    accentColor: '#E85874',
    secondaryGlow: '#be123c',
    icon: Flame,
    frameCount: 48,
    framePrefix: '/assets/images/sequences/laser/frame_',
    extension: '.webp',
    tagline: 'High-Contrast Permanent 2D Marking with 0.01mm Spot Precision',
    summary: 'Permanent traceability for automotive engine blocks, aerospace turbine components, and medical implants. 20W - 50W MOPA pulsed fiber laser creates indelible, tamper-proof 2D DataMatrix marks resistant to acid and heat.',
    keyStats: [
      { label: 'Laser Source', val: '20W MOPA Fiber' },
      { label: 'Spot Precision', val: '0.01mm Galvo' },
      { label: 'Diode MTBF', val: '100,000+ Hours' },
      { label: 'Bus Interface', val: 'PROFINET / PLC I/O' }
    ],
    milestones: [
      { frame: 1, label: '01. Fiber Source', sub: '20W MOPA Pulsed' },
      { frame: 13, label: '02. Galvo Scanner', sub: '0.01mm Precision Head' },
      { frame: 25, label: '03. Air Cooling', sub: '100k Hour MTBF Diode' },
      { frame: 37, label: '04. PLC Trigger', sub: 'Automated Line Bus' }
    ]
  }
];

// ============================================================================
// MAIN COMPONENT: GSAP SCROLLTRIGGER IMAGE SEQUENCE HARDWARE SHOWCASE
// ============================================================================
export const HardwareImageSequenceShowcase = () => {
  const { openDemoModal } = useApp();

  // Active product selection
  const [selectedProductId, setSelectedProductId] = useState('scanner');
  const activeProduct = useMemo(
    () => HARDWARE_SEQUENCE_PRODUCTS.find(p => p.id === selectedProductId) || HARDWARE_SEQUENCE_PRODUCTS[0],
    [selectedProductId]
  );

  // Canvas & DOM refs
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Playhead and playback state
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // GSAP animation instance references
  const playheadRef = useRef({ frame: 0 });
  const tweenRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);

  // Sync audio mute state
  useEffect(() => {
    hwSfx.muted = !isAudioEnabled;
  }, [isAudioEnabled]);

  // Generate frame URLs array for current product
  const frameUrls = useMemo(() => {
    const urls = [];
    for (let i = 1; i <= activeProduct.frameCount; i++) {
      urls.push(`${activeProduct.framePrefix}${String(i).padStart(4, '0')}${activeProduct.extension}`);
    }
    return urls;
  }, [activeProduct]);

  // --------------------------------------------------------------------------
  // ASPECT-FIT IMAGE DRAWING LOGIC (Retina Sharpness & No Distortion)
  // --------------------------------------------------------------------------
  const renderImageToCanvas = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina DPI scaling
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

    // Calculate aspect ratio fit (contain)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawH = displayHeight;
      drawW = displayHeight * imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = 0;
    } else {
      drawW = displayWidth;
      drawH = displayWidth / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawH) / 2;
    }

    // High quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Update canvas to a specific frame number
  const setFrame = useCallback((frameIdx) => {
    const clamped = Math.max(0, Math.min(activeProduct.frameCount - 1, Math.round(frameIdx)));
    playheadRef.current.frame = clamped;
    setCurrentFrameIndex(clamped);

    const img = imagesRef.current[clamped];
    if (img) {
      renderImageToCanvas(img);
    }
  }, [activeProduct.frameCount, renderImageToCanvas]);

  // --------------------------------------------------------------------------
  // PRELOAD IMAGE FRAMES INTO BROWSER MEMORY
  // --------------------------------------------------------------------------
  useEffect(() => {
    setIsLoaded(false);
    setLoadProgress(0);
    imagesRef.current = [];
    playheadRef.current.frame = 0;
    setCurrentFrameIndex(0);

    let loadedCount = 0;
    const total = frameUrls.length;
    const loadedImages = [];

    frameUrls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / total) * 100));

        if (idx === 0) {
          renderImageToCanvas(img);
        }

        if (loadedCount === total) {
          setIsLoaded(true);
          renderImageToCanvas(loadedImages[0]);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    });

    imagesRef.current = loadedImages;

    return () => {
      loadedImages.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frameUrls, renderImageToCanvas]);

  // Handle window resizing to keep canvas razor sharp
  useEffect(() => {
    const handleResize = () => {
      const currentImg = imagesRef.current[playheadRef.current.frame];
      if (currentImg) {
        renderImageToCanvas(currentImg);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderImageToCanvas]);

  // --------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ENGINE (Exact Pattern from CodePen VwgevYW)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !canvasRef.current) return;

    // Kill any existing GSAP tween and ScrollTrigger instance
    if (tweenRef.current) {
      if (tweenRef.current.scrollTrigger) {
        tweenRef.current.scrollTrigger.kill();
      }
      tweenRef.current.kill();
    }

    let lastReportedFrame = -1;

    // Create GSAP ScrollTrigger tween mapping scroll distance to playhead frame
    const tween = gsap.to(playheadRef.current, {
      frame: activeProduct.frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentF = Math.round(playheadRef.current.frame);
          if (currentF !== lastReportedFrame) {
            lastReportedFrame = currentF;
            setCurrentFrameIndex(currentF);
            const img = imagesRef.current[currentF];
            if (img) {
              renderImageToCanvas(img);
              if (isAudioEnabled) {
                hwSfx.playTick(600 + (currentF / activeProduct.frameCount) * 400);
              }
            }
          }
        }
      },
      onUpdate: () => {
        const currentF = Math.round(playheadRef.current.frame);
        const img = imagesRef.current[currentF];
        if (img) renderImageToCanvas(img);
      }
    });

    tweenRef.current = tween;

    // Refresh ScrollTrigger to sync measurements
    ScrollTrigger.refresh();

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [isLoaded, activeProduct, renderImageToCanvas, isAudioEnabled]);

  // --------------------------------------------------------------------------
  // AUTO-PLAY / PAUSE 360° PLAYBACK ANIMATION LOOP
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // 30 FPS playback

    const animate = (time) => {
      const elapsed = time - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);

        playheadRef.current.frame = (playheadRef.current.frame + 1) % activeProduct.frameCount;
        const currentF = Math.round(playheadRef.current.frame);
        setCurrentFrameIndex(currentF);

        const img = imagesRef.current[currentF];
        if (img) {
          renderImageToCanvas(img);
          if (isAudioEnabled && currentF % 3 === 0) {
            hwSfx.playTick(700);
          }
        }
      }
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, activeProduct.frameCount, renderImageToCanvas, isAudioEnabled]);

  // Scrub bar manual slider change handler
  const handleSliderChange = (e) => {
    setIsPlaying(false);
    const targetF = parseInt(e.target.value, 10);
    setFrame(targetF);
  };

  // Jump to a specific milestone frame
  const handleJumpToMilestone = (targetFrame) => {
    setIsPlaying(false);
    gsap.to(playheadRef.current, {
      frame: targetFrame - 1,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        const cur = Math.round(playheadRef.current.frame);
        setCurrentFrameIndex(cur);
        const img = imagesRef.current[cur];
        if (img) renderImageToCanvas(img);
      }
    });
  };

  // Current progress percentage
  const progressPercent = Math.round((currentFrameIndex / (activeProduct.frameCount - 1)) * 100);
  const currentDegrees = ((currentFrameIndex / (activeProduct.frameCount - 1)) * 360).toFixed(1);

  return (
    <section
      id="hardware-gsap-sequence"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#030712',
        color: '#f8fafc',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
        margin: '2rem 0 3.5rem 0',
        borderRadius: isFullscreen ? '0' : '24px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)'
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: `radial-gradient(ellipse at center, ${activeProduct.accentColor}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Main Pinned Stage Container (GSAP ScrollTrigger Pins This) */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 'clamp(1rem, 2.5vw, 2.5rem)'
        }}
      >
        {/* ===================================================================
            HEADER: TITLE, PRODUCT PILLS, & CONTROLS
           =================================================================== */}
        <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
            
            {/* Left Header Info */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: activeProduct.accentColor,
                    backgroundColor: `${activeProduct.accentColor}18`,
                    border: `1px solid ${activeProduct.accentColor}44`,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <Sparkles size={12} />
                  <span>GSAP SCROLLTRIGGER 3D IMAGE SEQUENCE</span>
                </span>

                <a
                  href="https://codepen.io/GreenSock/pen/VwgevYW"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#94a3b8',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  title="View GreenSock Image Sequence Helper Function on CodePen"
                >
                  <span>CodePen: VwgevYW</span>
                  <ExternalLink size={10} />
                </a>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  margin: 0
                }}
              >
                Photorealistic 360° Hardware <span style={{ color: activeProduct.accentColor }}>Sequence Scroller</span>
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              
              {/* Audio Toggle */}
              <button
                onClick={() => {
                  setIsAudioEnabled(prev => !prev);
                  hwSfx.init();
                }}
                style={{
                  backgroundColor: isAudioEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: isAudioEnabled ? '#00f0ff' : '#64748b',
                  border: isAudioEnabled ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
                title={isAudioEnabled ? 'Mute sound effects' : 'Enable interactive mechanical click sound effects'}
              >
                {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{isAudioEnabled ? 'Audio On' : 'Audio Muted'}</span>
              </button>

              {/* RFQ / Datasheet CTA */}
              <button
                onClick={() =>
                  openDemoModal({
                    solution: activeProduct.name,
                    notes: `Requested engineering technical specifications for ${activeProduct.name} (Category: ${activeProduct.category}).`
                  })
                }
                style={{
                  backgroundColor: activeProduct.accentColor,
                  color: '#050b14',
                  border: 'none',
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: `0 4px 20px ${activeProduct.accentColor}55`,
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Request Datasheet</span>
                <ArrowRight size={13} />
              </button>

            </div>

          </div>

          {/* Product Category Selector Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              backgroundColor: 'rgba(10, 18, 32, 0.85)',
              padding: '0.4rem',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {HARDWARE_SEQUENCE_PRODUCTS.map((prod) => {
              const isSelected = prod.id === selectedProductId;
              const IconComponent = prod.icon;

              return (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setIsPlaying(false);
                    hwSfx.playTick(880);
                  }}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '150px',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? `${prod.accentColor}22` : 'transparent',
                    border: isSelected ? `1.5px solid ${prod.accentColor}` : '1.5px solid transparent',
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.25s ease'
                  }}
                >
                  <IconComponent size={16} color={isSelected ? prod.accentColor : '#64748b'} />
                  <span style={{ whiteSpace: 'nowrap' }}>{prod.shortName}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ===================================================================
            CENTER STAGE: HTML5 CANVAS 360° FRAME SEQUENCE ENGINE
           =================================================================== */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 auto',
            width: '100%',
            maxWidth: '1280px',
            margin: '1rem auto',
            minHeight: '440px',
            maxHeight: '680px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            backgroundColor: '#050b14',
            border: `1.5px solid ${activeProduct.accentColor}33`,
            boxShadow: `inset 0 0 40px rgba(0, 0, 0, 0.9), 0 20px 50px -10px ${activeProduct.accentColor}22`,
            overflow: 'hidden'
          }}
        >
          {/* Loading Indicator */}
          {!isLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(5, 11, 20, 0.92)',
                zIndex: 20,
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: `3px solid ${activeProduct.accentColor}33`,
                  borderTopColor: activeProduct.accentColor,
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: activeProduct.accentColor,
                  letterSpacing: '1px'
                }}
              >
                PRELOADING 48 FRAMES // {loadProgress}%
              </span>
            </div>
          )}

          {/* HTML5 Canvas Element */}
          <canvas
            ref={canvasRef}
            aria-label="360-degree industrial equipment rotation viewer"
            role="img"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              cursor: isPlaying ? 'default' : 'ew-resize'
            }}
          />

          {/* Subtle Instruction Badge Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(5, 11, 20, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              padding: '0.35rem 1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono, monospace)',
              color: '#94a3b8',
              pointerEvents: 'none',
              zIndex: 5,
              backdropFilter: 'blur(8px)'
            }}
          >
            <RotateCw size={12} color={activeProduct.accentColor} />
            <span>SCROLL DOWN OR DRAG SLIDER BELOW TO ROTATE 360°</span>
          </div>

        </div>

        {/* ===================================================================
            FOOTER CONTROLS: TIMELINE SCRUBBER, MILESTONES & PLAYBACK
           =================================================================== */}
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Milestone Quick Jump Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.65rem',
              marginBottom: '1rem'
            }}
          >
            {activeProduct.milestones.map((ms, idx) => {
              const isCurrent =
                currentFrameIndex >= ms.frame - 1 &&
                currentFrameIndex < (activeProduct.milestones[idx + 1]?.frame - 1 || activeProduct.frameCount);

              return (
                <button
                  key={ms.frame}
                  onClick={() => handleJumpToMilestone(ms.frame)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    backgroundColor: isCurrent ? 'rgba(8, 17, 34, 0.95)' : 'rgba(5, 11, 20, 0.65)',
                    border: isCurrent
                      ? `1.5px solid ${activeProduct.accentColor}`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isCurrent ? `0 4px 15px ${activeProduct.accentColor}25` : 'none'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono, monospace)',
                      color: isCurrent ? activeProduct.accentColor : '#64748b',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {ms.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: isCurrent ? '#ffffff' : '#94a3b8',
                      fontWeight: 600
                    }}
                  >
                    {ms.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Scrub Bar & Playback Deck */}
          <div
            style={{
              backgroundColor: 'rgba(10, 18, 32, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '0.85rem 1.25rem',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: isPlaying ? 'rgba(255, 255, 255, 0.1)' : activeProduct.accentColor,
                color: isPlaying ? '#ffffff' : '#050b14',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isPlaying ? 'none' : `0 0 20px ${activeProduct.accentColor}66`,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              title={isPlaying ? 'Pause 360° rotation' : 'Start automatic 360° turntable spin'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
            </button>

            {/* Range Scrubber */}
            <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono, monospace)', color: '#94a3b8' }}>
                  SCRUB POSITION // FRAME {String(currentFrameIndex + 1).padStart(2, '0')} OF {activeProduct.frameCount}
                </span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: 800,
                    color: activeProduct.accentColor
                  }}
                >
                  {currentDegrees}° AZIMUTH
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={activeProduct.frameCount - 1}
                value={currentFrameIndex}
                onChange={handleSliderChange}
                style={{
                  width: '100%',
                  accentColor: activeProduct.accentColor,
                  cursor: 'pointer',
                  height: '6px'
                }}
              />
            </div>

            {/* Quick Stats Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                paddingLeft: '1.25rem',
                flexShrink: 0
              }}
            >
              {activeProduct.keyStats.slice(0, 2).map(stat => (
                <div key={stat.label} style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono, monospace)' }}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
