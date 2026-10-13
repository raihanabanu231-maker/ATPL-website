import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.webp';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Pause, 
  Activity, 
  Zap, 
  Radio, 
  X, 
  Download, 
  PhoneCall, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Scan,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ATPL_FACTORY_NODES = [
  {
    id: 'node-trace',
    stepNumber: 1,
    name: 'PERFECT TRACE™',
    category: 'SERIALIZATION & AGGREGATION',
    icon: '🔍',
    x: 77,
    y: 77,
    image: '/assets/images/stations/trace.webp',
    tagline: 'GS1 Serialization & Anti-Counterfeit Packaging',
    highlight: 'Parent-child aggregation with cryptographic QR verification for 100% DGFT/DSCSA regulatory compliance.',
    roiMetric: '100% DGFT Compliant',
    targetView: 'software'
  },
  {
    id: 'node-audit',
    stepNumber: 2,
    name: 'PERFECT AUDIT™',
    category: 'COMPLIANCE & AUDIT MANAGEMENT',
    icon: '📋',
    x: 28,
    y: 48,
    image: '/assets/images/stations/pms.webp',
    tagline: 'Paperless Digital Audits & Non-Conformance Logs',
    highlight: 'Digital checklist platform with photo evidence, automated CAPA, and 21 CFR Part 11 compliant digital signatures.',
    roiMetric: '75% Faster Audits',
    targetView: 'software'
  },
  {
    id: 'node-warehouse',
    stepNumber: 3,
    name: 'PERFECT WAREHOUSE™',
    category: 'WAREHOUSE MANAGEMENT (WMS)',
    icon: '📦',
    x: 74,
    y: 24,
    image: '/assets/images/stations/warehouse.webp',
    tagline: 'Autonomous WMS with 3D Bin Mapping & RFID',
    highlight: 'Enterprise WMS managing automated 3D bin allocation, dynamic slotting, and sub-second SAP/Oracle ERP sync.',
    roiMetric: '99.98% Inventory Accuracy',
    targetView: 'software'
  },
  {
    id: 'node-rfid',
    stepNumber: 4,
    name: 'RFID ANTENNA & READERS',
    category: 'AIDC HARDWARE',
    icon: '📡',
    x: 39,
    y: 19,
    image: '/assets/images/stations/rfid.webp',
    tagline: 'Long-Range UHF Portal & High-Temp Tags',
    highlight: 'Fixed multi-directional UHF portals capturing 1,200+ pallet tags/sec as forklifts transit dock bays.',
    roiMetric: '1,200+ Tags/Sec Capture',
    targetView: 'hardware'
  },
  {
    id: 'node-pms',
    stepNumber: 5,
    name: 'PERFECT PMS™',
    category: 'PRODUCTION MANAGEMENT (MES)',
    icon: '⚙️',
    x: 58,
    y: 80,
    image: '/assets/images/stations/pms.webp',
    tagline: 'Real-time Shop-Floor OEE & Machine Telemetry',
    highlight: 'Direct assembly line telemetry tracking OEE, machine cycle times, downtime root-causes, and Andon alerts.',
    roiMetric: '+18% Average OEE Uplift',
    targetView: 'software'
  },
  {
    id: 'node-robots',
    stepNumber: 6,
    name: 'INDUSTRIAL ROBOTS',
    category: 'ROBOTIC AUTOMATION & PLC',
    icon: '🤖',
    x: 82,
    y: 52,
    image: '/assets/images/stations/robot_arm.webp',
    tagline: '6-Axis Multi-Joint Articulated Robot Cells',
    highlight: 'Multi-axis articulated arms executing precision welding, pick-and-place, and synchronized conveyor transfers with 0.05mm repeatability.',
    roiMetric: '0.05mm Repeatability',
    targetView: 'hardware'
  },
  {
    id: 'node-scanners',
    stepNumber: 7,
    name: 'SCANNING SOLUTIONS',
    category: 'AIDC HARDWARE',
    icon: '📱',
    x: 55,
    y: 19,
    image: '/assets/images/stations/scanners.webp',
    tagline: 'Ultra-Rugged 1D/2D, DPM & Handsfree Scanners',
    highlight: 'High-speed DPM scanners decoding laser-etched and dot-peen DataMatrix marks on curved reflective automotive metals.',
    roiMetric: '99.99% First-Pass Read',
    targetView: 'hardware'
  },
  {
    id: 'node-printers',
    stepNumber: 8,
    name: 'INDUSTRIAL PRINTING',
    category: 'PRINTING SOLUTIONS',
    icon: '🖨️',
    x: 39,
    y: 76,
    image: '/assets/images/stations/printers.webp',
    tagline: 'All-Metal 24/7 Chassis & In-Line Verifiers',
    highlight: 'Heavy-duty industrial thermal printers with inline ODV barcode verifiers guaranteeing zero bad-barcode chargebacks.',
    roiMetric: 'Zero Chargeback Guarantee',
    targetView: 'hardware'
  },
  {
    id: 'node-drones',
    stepNumber: 9,
    name: 'DRONES & REMOTE CONTROL',
    category: 'AERIAL WAREHOUSE AUDIT',
    icon: '🛸',
    x: 91,
    y: 24,
    image: '/assets/images/stations/drones.webp',
    tagline: 'Autonomous Indoor Optical SLAM Inventory Drones',
    highlight: 'Optical SLAM drones navigating 15m high-bay racking aisles without GPS, auditing pallet barcodes safely without scissor lifts.',
    roiMetric: '15x Faster Stocktaking',
    targetView: 'hardware'
  },
  {
    id: 'node-dev',
    stepNumber: 10,
    name: 'SOFTWARE DEVELOPMENT',
    category: 'R&D LABS (MADURAI & CHENNAI)',
    icon: '💻',
    x: 19,
    y: 20,
    image: '/assets/images/stations/software_lab.webp',
    tagline: 'Cloud SaaS, Embedded IIoT Firmware & Mobile Apps',
    highlight: 'In-house engineering team crafting cloud-native MES/WMS platforms, OPC-UA middleware, and industrial mobile apps.',
    roiMetric: 'Sub-Second Middleware Sync',
    targetView: 'software'
  },
  {
    id: 'node-ai',
    stepNumber: 11,
    name: 'SUPER COMPUTER AI & ML',
    category: 'EDGE AI & VISION INTELLIGENCE',
    icon: '🧠',
    x: 18,
    y: 75,
    image: '/assets/images/stations/vision_ai.webp',
    tagline: 'Sub-8ms Optical Defect Detection & Neural Inference',
    highlight: 'GPU-accelerated neural networks analyzing gigapixel inspection feeds in sub-8ms to catch microscopic surface flaws.',
    roiMetric: 'Sub-8ms Defect Catch',
    targetView: 'software'
  },
  {
    id: 'node-erp',
    stepNumber: 12,
    name: 'ERP SOLUTIONS & SYNC',
    category: 'ENTERPRISE INTEGRATION',
    icon: '🔄',
    x: 13,
    y: 46,
    image: '/assets/images/stations/erp_sync.webp',
    tagline: 'Bi-directional Real-Time Sync with SAP, Oracle & MS',
    highlight: 'Certified SAP S/4HANA & Oracle connectors translating shopfloor sensor events into ERP transactions with zero data loss.',
    roiMetric: 'Real-time ERP Flow',
    targetView: 'solutions'
  }
];

export const FactoryBlueprintMap = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(true);
  const [hoveredStation, setHoveredStation] = useState(null);

  const currentNode = ATPL_FACTORY_NODES[currentIndex];

  // Auto-tour timer (moves automatically every 5.0 seconds)
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoTour]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentIndex(prev => (prev - 1 + ATPL_FACTORY_NODES.length) % ATPL_FACTORY_NODES.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoTour(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + ATPL_FACTORY_NODES.length) % ATPL_FACTORY_NODES.length);
  };

  const handleStationClick = (index) => {
    setCurrentIndex(index);
    setIsAutoTour(false);
  };

  return (
    <section 
      id="factory-blueprint-section" 
      aria-label="ATPL Smart Factory Autonomous Robot Tour"
      style={{ 
        backgroundColor: '#040914', 
        color: '#ffffff',
        paddingTop: '2.5rem',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, rgba(232, 88, 116, 0.04) 50%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* =====================================================================
            1. MINIMALIST, HIGH-IMPACT HEADER (Clean & Uncluttered)
           ===================================================================== */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '999px',
            padding: '0.22rem 0.85rem',
            marginBottom: '0.55rem',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.2)'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 8px #00f0ff',
              display: 'inline-block',
              animation: 'sonarPingDot 1.6s infinite'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#00f0ff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              ARCHIE AI • AUTONOMOUS FACTORY TOUR
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: '0 0 0.4rem 0',
            lineHeight: 1.2
          }}>
            Watch Archie AI Tour the <span className="gradient-text">Connected Smart Factory</span>
          </h2>

          <p style={{
            color: '#94a3b8',
            fontSize: '0.92rem',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Archie navigates through all 12 manufacturing, WMS, RFID, and AI machine vision stations. Click any station beacon to fly Archie there instantly.
          </p>
        </div>

        {/* =====================================================================
            2. INTERACTIVE ANIMATION STAGE (The Star of the Show!)
           ===================================================================== */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#030816',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid rgba(0, 240, 255, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.15)'
          }}
        >
          {/* Keyframe Animations */}
          <style>{`
            @keyframes archieFloating {
              0%, 100% {
                transform: translate(-50%, -50%) translateY(0) rotate(0deg);
              }
              50% {
                transform: translate(-50%, -50%) translateY(-9px) rotate(1.2deg);
              }
            }
            @keyframes thrusterGlow {
              0% {
                opacity: 0.6;
                transform: scale(0.9);
                box-shadow: 0 0 10px #00f0ff;
              }
              100% {
                opacity: 1;
                transform: scale(1.3);
                box-shadow: 0 0 25px #00f0ff, 0 0 35px #E85874;
              }
            }
            @keyframes scanSweep {
              0% { opacity: 0.25; transform: scaleY(0.4); }
              50% { opacity: 0.85; transform: scaleY(1); }
              100% { opacity: 0.25; transform: scaleY(0.4); }
            }
            @keyframes reticleRotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes sonarPulseWave {
              0% { transform: scale(0.6); opacity: 0.9; }
              70% { transform: scale(2.2); opacity: 0.2; }
              100% { transform: scale(2.6); opacity: 0; }
            }
            @keyframes sonarPingDot {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.4); opacity: 0.6; }
            }
            .hud-station-pin {
              position: absolute;
              transform: translate(-50%, -50%);
              cursor: pointer;
              z-index: 25;
              transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .hud-station-pin:hover {
              transform: translate(-50%, -50%) scale(1.25);
            }
            .hud-pin-disc {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-display, sans-serif);
              font-size: 0.82rem;
              font-weight: 900;
              color: #ffffff;
              background: rgba(4, 13, 29, 0.88);
              border: 1.5px solid rgba(0, 240, 255, 0.6);
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 240, 255, 0.35);
              transition: all 0.3s ease;
            }
            .hud-station-pin.active .hud-pin-disc {
              background: #E85874;
              border-color: #ffffff;
              box-shadow: 0 0 25px #E85874, 0 0 35px rgba(232, 88, 116, 0.6);
              color: #ffffff;
            }
            .hud-station-pin:hover .hud-pin-disc {
              border-color: #00f0ff;
              box-shadow: 0 0 20px #00f0ff;
            }
            .hud-chip-btn {
              transition: all 0.2s ease;
            }
            .hud-chip-btn:hover {
              transform: translateY(-2px);
            }
            @media (max-width: 768px) {
              .hud-factory-viewport {
                aspect-ratio: auto !important;
                height: clamp(390px, 60vh, 470px) !important;
                min-height: 390px !important;
              }
              .hud-top-strip {
                top: 8px !important;
                left: 8px !important;
                right: 8px !important;
                padding: 0.35rem 0.65rem !important;
              }
              .hud-top-chips-strip {
                display: none !important;
              }
              .hud-bottom-dock {
                left: 8px !important;
                right: 8px !important;
                bottom: 8px !important;
                padding: 0.65rem 0.85rem !important;
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 0.45rem !important;
                background-color: rgba(3, 10, 24, 0.96) !important;
              }
              .hud-dock-desc {
                white-space: normal !important;
                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;
                overflow: hidden !important;
                font-size: 0.78rem !important;
                line-height: 1.38 !important;
                color: #e2e8f0 !important;
                text-overflow: ellipsis !important;
              }
              .hud-dock-controls {
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                gap: 0.45rem !important;
              }
              .hud-dock-demo-btn {
                flex: 1 !important;
                justify-content: center !important;
                padding: 0.52rem 0.85rem !important;
                min-height: 44px !important;
              }
              .desktop-only-inline {
                display: none !important;
              }
              .hud-station-pin {
                width: 44px !important;
                height: 44px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              .hud-pin-disc {
                width: 28px !important;
                height: 28px !important;
                font-size: 0.76rem !important;
              }
              .hud-archie-speech-badge {
                padding: 0.18rem 0.55rem !important;
                font-size: 0.65rem !important;
                white-space: nowrap !important;
                max-width: calc(100vw - 36px) !important;
              }
              @keyframes archieFloating {
                0%, 100% {
                  transform: translate(-50%, -50%) scale(0.82) translateY(0) rotate(0deg);
                }
                50% {
                  transform: translate(-50%, -50%) scale(0.82) translateY(-7px) rotate(1deg);
                }
              }
            }
          `}</style>

          {/* Top HUD Control Strip (Sleek, Translucent & Compact) */}
          <div className="hud-top-strip" style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            right: '14px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap',
            background: 'rgba(3, 10, 24, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.28)',
            borderRadius: '12px',
            padding: '0.45rem 0.9rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
          }}>
            {/* Active Station Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span style={{
                backgroundColor: 'rgba(232, 88, 116, 0.2)',
                border: '1px solid #E85874',
                color: '#ffffff',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}>
                STATION {currentIndex + 1} OF 12
              </span>
              <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                {currentNode.name}
              </span>
            </div>

            {/* 12 Interactive Station Quick-Jump Chips */}
            <div className="hud-top-chips-strip" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}>
              {ATPL_FACTORY_NODES.map((node, i) => (
                <button
                  key={node.id}
                  onClick={() => handleStationClick(i)}
                  className="hud-chip-btn"
                  title={`${node.stepNumber}. ${node.name}`}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: currentIndex === i ? '#E85874' : 'rgba(255, 255, 255, 0.08)',
                    border: currentIndex === i ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: currentIndex === i ? '0 0 14px #E85874' : 'none'
                  }}
                >
                  {node.stepNumber}
                </button>
              ))}
            </div>

            {/* Play/Pause & 3D Tour CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setIsAutoTour(!isAutoTour)}
                style={{
                  backgroundColor: isAutoTour ? 'rgba(232, 88, 116, 0.25)' : 'rgba(0, 240, 255, 0.18)',
                  border: isAutoTour ? '1px solid #E85874' : '1px solid #00f0ff',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.32rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isAutoTour ? '0 0 14px rgba(232, 88, 116, 0.4)' : 'none'
                }}
              >
                {isAutoTour ? <Pause size={12} color="#E85874" /> : <Play size={12} color="#00f0ff" />}
                <span>{isAutoTour ? 'Pause Tour' : 'Auto Play'}</span>
              </button>

              <button
                onClick={() => setCurrentView('factory-3d')}
                style={{
                  backgroundColor: 'rgba(0, 113, 186, 0.3)',
                  border: '1px solid rgba(0, 240, 255, 0.6)',
                  color: '#00f0ff',
                  borderRadius: '6px',
                  padding: '0.32rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Layers size={13} />
                <span>3D Mode</span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              MAIN FACTORY VIEWPORT: 100% OPEN & UNOBSTRUCTED BLUEPRINT CANVAS
             ===================================================================== */}
          <div 
            className="hud-factory-viewport"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1376 / 768',
              maxHeight: 'min(76vh, 760px)',
              overflow: 'hidden',
              backgroundColor: '#030816'
            }}
          >
            {/* The Isometric Factory Floor Graphic */}
            <picture style={{ width: '100%', height: '100%', display: 'block' }}>
              <source type="image/avif" srcSet="/assets/images/atpl_isometric_factory.avif" />
              <source type="image/webp" srcSet="/assets/images/atpl_isometric_factory.webp" />
              <img 
                src={blueprintImg}
                alt="ATPL Smart Factory Floor"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              />
            </picture>

            {/* Subtle Industrial Laser Grid Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
              zIndex: 5
            }} />

            {/* =================================================================
                DYNAMIC HOLOGRAPHIC SCAN BEAM & GROUND TARGET (SVG)
               ================================================================= */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 15,
                pointerEvents: 'none'
              }}
            >
              <defs>
                {/* Conical Holographic Light Beam Gradient */}
                <linearGradient id="scanHoloCone" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#0071ba" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E85874" stopOpacity="0.08" />
                </linearGradient>

                <radialGradient id="targetGroundAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#E85874" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </radialGradient>

                <filter id="beamLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Holographic Scan Cone from Archie down to Ground Footprint */}
              <polygon
                points={`
                  ${currentNode.x},${currentNode.y - 7}
                  ${currentNode.x - 4.5},${currentNode.y}
                  ${currentNode.x + 4.5},${currentNode.y}
                `}
                fill="url(#scanHoloCone)"
                style={{
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />

              {/* 2. Precision Laser Alignment Center Track */}
              <line
                x1={currentNode.x}
                y1={currentNode.y - 6.5}
                x2={currentNode.x}
                y2={currentNode.y}
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeDasharray="2, 1.5"
                filter="url(#beamLaserGlow)"
                style={{
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />

              {/* 3. Sweeping Horizontal Scanline Beam */}
              <line
                x1={currentNode.x - 3.8}
                y1={currentNode.y - 0.5}
                x2={currentNode.x + 3.8}
                y2={currentNode.y - 0.5}
                stroke="#00f0ff"
                strokeWidth="1.8"
                filter="url(#beamLaserGlow)"
                style={{
                  animation: 'scanSweep 1.8s infinite ease-in-out',
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />

              {/* 4. Ground Target Holographic Aura Footprint */}
              <circle
                cx={currentNode.x}
                cy={currentNode.y}
                r="4.2"
                fill="url(#targetGroundAura)"
                style={{
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />

              {/* 5. Rotating Holographic Reticle Ring */}
              <circle
                cx={currentNode.x}
                cy={currentNode.y}
                r="3.2"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="0.8"
                strokeDasharray="2.5, 1.5"
                style={{
                  animation: 'reticleRotate 8s linear infinite',
                  transformOrigin: `${currentNode.x}px ${currentNode.y}px`,
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />

              {/* 6. Active Sonar Radar Wave Pulse */}
              <circle
                cx={currentNode.x}
                cy={currentNode.y}
                r="2.2"
                fill="none"
                stroke="#E85874"
                strokeWidth="1.2"
                style={{
                  animation: 'sonarPulseWave 2s infinite ease-out',
                  transformOrigin: `${currentNode.x}px ${currentNode.y}px`,
                  transition: 'all 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
                }}
              />
            </svg>

            {/* =================================================================
                ANIMATED TRAVELING ARCHIE ROBOT AVATAR (Smooth Gliding & Hovering)
               ================================================================= */}
            <div 
              style={{
                position: 'absolute',
                left: `${currentNode.x}%`,
                top: `${currentNode.y - 8}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 35,
                pointerEvents: 'none',
                transition: 'left 1.1s cubic-bezier(0.34, 1.25, 0.64, 1), top 1.1s cubic-bezier(0.34, 1.25, 0.64, 1)'
              }}
            >
              {/* Archie Container with Smooth Bobbing Float */}
              <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'archieFloating 2.6s ease-in-out infinite'
              }}>
                {/* Floating Telemetry Speech Pill Attached to Archie (Edge-safe so text is never cut off) */}
                <div 
                  className="hud-archie-speech-badge"
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    marginBottom: '10px',
                    left: currentNode.x > 68 ? 'auto' : currentNode.x < 32 ? '0' : '50%',
                    right: currentNode.x > 68 ? '0' : 'auto',
                    transform: currentNode.x > 68 || currentNode.x < 32 ? 'none' : 'translateX(-50%)',
                    backgroundColor: 'rgba(3, 10, 24, 0.94)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid #00f0ff',
                    borderRadius: '999px',
                    padding: '0.22rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 240, 255, 0.45)',
                    whiteSpace: 'nowrap',
                    zIndex: 36
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981'
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}>
                    SCANNING STATION {currentNode.stepNumber}: <span style={{ color: '#00f0ff' }}>{currentNode.name.replace('™', '')}</span>
                  </span>
                </div>

                {/* Archie Mascot Character Avatar Body */}
                <div style={{
                  width: '62px',
                  height: '62px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.92) 60%, rgba(0, 240, 255, 0.5) 100%)',
                  border: '2.5px solid #00f0ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px #00f0ff, 0 0 25px rgba(232, 88, 116, 0.65)'
                }}>
                  <AtplRobotAvatar size={46} glow={true} />
                </div>

                {/* Holographic Propulsion Thruster Aura Under Archie */}
                <div style={{
                  width: '32px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, #00f0ff 0%, #E85874 55%, transparent 75%)',
                  marginTop: '-3px',
                  animation: 'thrusterGlow 1.2s infinite alternate ease-in-out'
                }} />
              </div>
            </div>

            {/* =================================================================
                12 MINIMALIST HOLOGRAPHIC STATION BEACONS (Numbered Pins)
               ================================================================= */}
            {ATPL_FACTORY_NODES.map((node, index) => {
              const isActive = currentIndex === index;
              const isHovered = hoveredStation === index;

              return (
                <div
                  key={node.id}
                  className={`hud-station-pin ${isActive ? 'active' : ''}`}
                  onClick={() => handleStationClick(index)}
                  onMouseEnter={() => setHoveredStation(index)}
                  onMouseLeave={() => setHoveredStation(null)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`
                  }}
                  title={`Station ${node.stepNumber}: ${node.name}`}
                  role="button"
                  tabIndex={0}
                >
                  {/* Glowing Numeric Disc */}
                  <div className="hud-pin-disc">
                    {node.stepNumber}
                  </div>

                  {/* Clean Tooltip on Hover / Active */}
                  {(isActive || isHovered) && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(3, 10, 24, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: isActive ? '1px solid #E85874' : '1px solid #00f0ff',
                      color: '#ffffff',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '5px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      boxShadow: isActive ? '0 0 16px rgba(232, 88, 116, 0.6)' : '0 0 12px rgba(0, 240, 255, 0.4)',
                      zIndex: 30,
                      pointerEvents: 'none'
                    }}>
                      {node.name}
                    </div>
                  )}
                </div>
              );
            })}

            {/* =================================================================
                3. SLEEK FLOATING GLASSMORPHISM TELEMETRY DOCK (At Bottom of Stage)
               ================================================================= */}
            <div 
              className="hud-bottom-dock"
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                right: '14px',
                zIndex: 40,
                backgroundColor: 'rgba(3, 10, 24, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.2px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '14px',
                padding: '0.65rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 240, 255, 0.2)'
              }}
            >
              {/* Left: Station Telemetry Info */}
              <div className="hud-dock-info" style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
                  <span style={{
                    color: '#00f0ff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 900
                  }}>
                    [{String(currentIndex + 1).padStart(2, '0')} / 12]
                  </span>
                  <strong style={{ color: '#ffffff', fontSize: '0.92rem', letterSpacing: '0.02em' }}>
                    {currentNode.name}
                  </strong>
                  <span style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#34d399',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '4px'
                  }}>
                    ⚡ {currentNode.roiMetric}
                  </span>
                </div>

                <p 
                  className="hud-dock-desc"
                  style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: '#cbd5e1',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {currentNode.highlight}
                </p>
              </div>

              {/* Right: Sleek Action Controls */}
              <div className="hud-dock-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous station"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '44px',
                    minHeight: '44px',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <ChevronLeft size={16} />
                  <span className="desktop-only-inline">Prev</span>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next station"
                  style={{
                    backgroundColor: 'rgba(0, 113, 186, 0.4)',
                    border: '1.2px solid #00f0ff',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '44px',
                    minHeight: '44px',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 0 12px rgba(0, 113, 186, 0.5)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.7)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.4)'}
                >
                  <span className="desktop-only-inline">Next</span>
                  <ChevronRight size={16} />
                </button>

                {/* Request Live Demo CTA */}
                <button
                  className="hud-dock-demo-btn"
                  onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry from Robot Tour - Station ${currentNode.stepNumber}: ${currentNode.name}` })}
                  style={{
                    backgroundColor: '#E85874',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.48rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 18px rgba(232, 88, 116, 0.5)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d44360'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E85874'}
                >
                  <Sparkles size={14} />
                  <span>Explore Demo</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
