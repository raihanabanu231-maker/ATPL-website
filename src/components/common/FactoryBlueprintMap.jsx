import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.webp';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { AtplLogo } from './AtplLogo';
import confetti from 'canvas-confetti';
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
    id: 'node-scanners',
    stepNumber: 6,
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
    stepNumber: 7,
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
    stepNumber: 8,
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
    stepNumber: 9,
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
    stepNumber: 10,
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
    stepNumber: 11,
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

export const FactoryBlueprintMap = ({ embedded = false }) => {
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
      className={`hud-blueprint-master ${embedded ? 'is-embedded' : 'is-standalone'}`}
      aria-label="ATPL Smart Factory Autonomous Robot Tour"
      style={{ 
        backgroundColor: embedded ? 'transparent' : '#040914', 
        color: '#ffffff',
        paddingTop: embedded ? 0 : 'clamp(0.35rem, 0.8vh, 0.65rem)',
        paddingBottom: embedded ? 0 : 'clamp(0.35rem, 0.8vh, 0.65rem)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      {/* Background Decorative Ambient Radial Glow */}
      {!embedded && (
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
      )}

      <div className={embedded ? 'hud-embedded-wrap' : 'container'} style={{
        maxWidth: embedded ? '100%' : '1440px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        padding: embedded ? 0 : '0 0.85rem'
      }}>
        
        {/* =====================================================================
            1. COMPACT 1-FOLD HEADER (Fits Entire Tour in One Screen View)
           ===================================================================== */}
        <div className="hud-header-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '0.65rem',
          flexWrap: 'wrap'
        }}>
          <div className="hud-header-left" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <div className="hud-header-pill" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '999px',
              padding: '0.2rem 0.65rem',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 6px #00f0ff',
                display: 'inline-block',
                animation: 'sonarPingDot 1.6s infinite'
              }} />
              <span className="hud-header-pill-text" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-brand-cyan, #00f0ff)'
              }}>
                Archie AI Smart Factory Tour
              </span>
            </div>

            <h2 className="hud-header-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.2
            }}>
              Autonomous <span className="gradient-text">Factory Flight Inspection</span>
            </h2>
          </div>

          <div className="hud-header-right" style={{
            fontSize: '0.76rem',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            flexShrink: 0
          }}>
            <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800 }}>
              LIVE INSPECTION: <span style={{ color: '#ffffff' }}>{currentNode.name.replace('™', '')}</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={handlePrev}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.22rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  minHeight: '28px',
                  transition: 'all 0.15s ease'
                }}
                title="Previous station"
              >
                <ChevronLeft size={13} />
                <span>Prev</span>
              </button>

              <button
                onClick={handleNext}
                style={{
                  backgroundColor: 'rgba(0, 113, 186, 0.35)',
                  border: '1.2px solid #00f0ff',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.22rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  minHeight: '28px',
                  transition: 'all 0.15s ease'
                }}
                title="Next station"
              >
                <span>Next</span>
                <ChevronRight size={13} />
              </button>

              <button
                onClick={() => setIsAutoTour(!isAutoTour)}
                style={{
                  backgroundColor: isAutoTour ? 'rgba(232, 88, 116, 0.2)' : 'rgba(0, 240, 255, 0.15)',
                  border: isAutoTour ? '1px solid #E85874' : '1px solid #00f0ff',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.22rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  minHeight: '28px',
                  transition: 'all 0.15s ease'
                }}
                title={isAutoTour ? "Pause automated tour" : "Resume automated tour"}
              >
                {isAutoTour ? <Pause size={12} color="#E85874" /> : <Play size={12} color="#00f0ff" />}
                <span>{isAutoTour ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setCurrentView('factory-3d')}
                style={{
                  backgroundColor: 'rgba(0, 113, 186, 0.25)',
                  border: '1px solid rgba(0, 240, 255, 0.5)',
                  color: '#00f0ff',
                  borderRadius: '6px',
                  padding: '0.22rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  minHeight: '28px',
                  transition: 'all 0.15s ease'
                }}
                title="Switch to 3D Digital Twin View"
              >
                <Layers size={12} />
                <span>3D Twin</span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. FULL-BOX TOUR STAGE (Unobstructed Factory Floor View)
           ===================================================================== */}
        <div className="hud-tour-grid">
          <style>{`
            #factory-blueprint-section {
              box-sizing: border-box;
            }
            .hud-tour-grid {
              display: block;
              width: 100%;
            }
            .hud-factory-viewport {
              position: relative;
              width: 100%;
              aspect-ratio: 16 / 9;
              max-height: 720px;
              min-height: 280px;
              overflow: hidden;
              background-color: #030816;
              border-radius: 16px;
              border: 1.5px solid rgba(0, 240, 255, 0.4);
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 240, 255, 0.15);
            }
            @media (max-width: 768px) {
              .hud-factory-viewport {
                border-radius: 10px;
                aspect-ratio: 16 / 9;
              }
            }
            @keyframes archieFloating {
              0%, 100% {
                transform: translate(-50%, -50%) translateY(0) rotate(0deg);
              }
              50% {
                transform: translate(-50%, -50%) translateY(-8px) rotate(1.2deg);
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
              width: 22px;
              height: 22px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justifyContent: center;
              background: rgba(4, 13, 29, 0.88);
              border: 1.5px solid rgba(0, 240, 255, 0.7);
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 240, 255, 0.4);
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
            @keyframes coreHubPulse {
              0%, 100% {
                box-shadow: 0 0 25px rgba(0, 240, 255, 0.5), 0 0 50px rgba(0, 113, 186, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.2);
                border-color: rgba(0, 240, 255, 0.85);
              }
              50% {
                box-shadow: 0 0 42px rgba(0, 240, 255, 0.85), 0 0 75px rgba(232, 88, 116, 0.45), inset 0 0 25px rgba(0, 240, 255, 0.45);
                border-color: #00f0ff;
              }
            }
            .hud-central-logo-hub {
              position: absolute;
              left: 49.5%;
              top: 53.5%;
              transform: translate(-50%, -50%);
              z-index: 22;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              user-select: none;
              transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .hud-central-logo-hub:hover {
              transform: translate(-50%, -50%) scale(1.08);
            }
            @media (max-width: 768px) {
              .hud-central-logo-hub {
                transform: translate(-50%, -50%) scale(0.82) !important;
              }
              .hud-central-logo-hub:hover {
                transform: translate(-50%, -50%) scale(0.88) !important;
              }
              .hud-station-pin {
                width: 24px !important;
                height: 24px !important;
                display: flex !important;
                align-items: center !important;
                justifyContent: center !important;
              }
              .hud-pin-disc {
                width: 17px !important;
                height: 17px !important;
              }
              .hud-archie-speech-badge {
                padding: 0.12rem 0.45rem !important;
                font-size: 0.58rem !important;
                white-space: nowrap !important;
                max-width: 170px !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
              }
              .hud-archie-avatar-box {
                width: 42px !important;
                height: 42px !important;
              }
            }
          `}</style>

          <div className="hud-factory-viewport">
            {/* The Isometric Factory Floor Graphic */}
            <picture style={{ width: '100%', height: '100%', display: 'block' }}>
              <source media="(max-width: 768px)" type="image/avif" srcSet="/assets/images/atpl_isometric_factory_mobile.avif" />
              <source media="(max-width: 768px)" type="image/webp" srcSet="/assets/images/atpl_isometric_factory_mobile.webp" />
              <source type="image/avif" srcSet="/assets/images/atpl_isometric_factory.avif" />
              <source type="image/webp" srcSet="/assets/images/atpl_isometric_factory.webp" />
              <img 
                src={blueprintImg}
                alt="ATPL Smart Factory Floor"
                width="1920"
                height="1080"
                loading="eager"
                fetchPriority="high"
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1920 / 1080',
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
                CENTRAL ATPL SMART FACTORY EMBLEM & CORE NEXUS
                Positioned in the exact center of the factory circuit motherboard
               ================================================================= */}
            <div 
              className="hud-central-logo-hub"
              onClick={() => {
                confetti({
                  particleCount: 50,
                  spread: 65,
                  origin: { x: 0.49, y: 0.54 },
                  colors: ['#0071ba', '#E85874', '#00f0ff', '#ffffff']
                });
              }}
              title="ATPL Industrial Core Hub, Target Perfection"
            >
              {/* Concentric Rotating Outer Holographic Reticle Ring */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '136px',
                height: '136px',
                marginTop: '-68px',
                marginLeft: '-68px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(0, 240, 255, 0.45)',
                animation: 'reticleRotate 20s linear infinite',
                pointerEvents: 'none'
              }} />

              {/* Pulsing Sonar Wave Aura */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '116px',
                height: '116px',
                marginTop: '-58px',
                marginLeft: '-58px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.28) 0%, rgba(232, 88, 116, 0.18) 50%, transparent 75%)',
                animation: 'sonarPulseWave 2.8s infinite ease-out',
                pointerEvents: 'none'
              }} />

              {/* Central Glowing Cybernetic Hub Platform */}
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #0d2240 0%, #030c1a 100%)',
                border: '2.5px solid rgba(0, 240, 255, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'coreHubPulse 3.2s infinite ease-in-out',
                position: 'relative',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 240, 255, 0.5)'
              }}>
                {/* Crisp White Inner Disc to showcase authentic ATPL Logo */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45), inset 0 0 8px rgba(0, 113, 186, 0.15)'
                }}>
                  <AtplLogo size={62} showText={false} />
                </div>
              </div>

              {/* High-Tech ATPL Brand Core Pill Label */}
              <div style={{
                marginTop: '6px',
                backgroundColor: 'rgba(2, 9, 21, 0.94)',
                backdropFilter: 'blur(8px)',
                border: '1.2px solid rgba(0, 240, 255, 0.65)',
                borderRadius: '999px',
                padding: '0.2rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 240, 255, 0.4)',
                whiteSpace: 'nowrap'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }} />
                <span style={{
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontWeight: 900,
                  fontSize: '0.74rem',
                  color: '#ffffff',
                  letterSpacing: '0.06em'
                }}>
                  ATPL <span style={{ color: '#00f0ff' }}>CORE</span>
                </span>
              </div>
            </div>

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
                {/* Floating Telemetry Speech Pill Attached to Archie */}
                <div 
                  className="hud-archie-speech-badge"
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    marginBottom: '8px',
                    left: currentNode.x > 68 ? 'auto' : currentNode.x < 32 ? '0' : '50%',
                    right: currentNode.x > 68 ? '0' : 'auto',
                    transform: currentNode.x > 68 || currentNode.x < 32 ? 'none' : 'translateX(-50%)',
                    backgroundColor: 'rgba(3, 10, 24, 0.94)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid #00f0ff',
                    borderRadius: '999px',
                    padding: '0.2rem 0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
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
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}>
                    SCANNING: <span style={{ color: '#00f0ff' }}>{currentNode.name.replace('™', '')}</span>
                  </span>
                </div>

                {/* Archie Mascot Character Avatar Body */}
                <div 
                  className="hud-archie-avatar-box"
                  style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.92) 60%, rgba(0, 240, 255, 0.5) 100%)',
                  border: '2.5px solid #00f0ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px #00f0ff, 0 0 20px rgba(232, 88, 116, 0.6)'
                }}>
                  <AtplRobotAvatar size={40} glow={true} />
                </div>

                {/* Holographic Propulsion Thruster Aura Under Archie */}
                <div style={{
                  width: '28px',
                  height: '6px',
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
                  title={node.name}
                  role="button"
                  tabIndex={0}
                >
                  {/* Glowing Beacon Disc (Number-Free) */}
                  <div className="hud-pin-disc">
                    <div style={{
                      width: isActive ? '8px' : '5px',
                      height: isActive ? '8px' : '5px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#ffffff' : '#00f0ff',
                      boxShadow: isActive ? '0 0 10px #ffffff' : '0 0 6px #00f0ff',
                      transition: 'all 0.25s ease'
                    }} />
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
            {/* Sleek Floating Bottom Glass Station Selector Strip */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 35,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(3, 10, 24, 0.88)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1.2px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '999px',
              padding: '0.35rem 0.75rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.15)',
              maxWidth: 'calc(100% - 24px)',
              overflowX: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                paddingRight: '0.5rem',
                borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '1rem' }}>{currentNode.icon}</span>
                <span style={{ color: '#ffffff', fontSize: '0.76rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {currentNode.name.replace('™', '')}
                </span>
                <span style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap'
                }}>
                  {currentNode.roiMetric}
                </span>
              </div>

              {/* Station jump dots (clean, numberless modern indicators) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                {ATPL_FACTORY_NODES.map((node, i) => (
                  <button
                    key={node.id}
                    onClick={() => handleStationClick(i)}
                    title={node.name}
                    aria-label={node.name}
                    style={{
                      width: currentIndex === i ? '16px' : '6px',
                      height: '6px',
                      borderRadius: '999px',
                      backgroundColor: currentIndex === i ? '#E85874' : 'rgba(255, 255, 255, 0.3)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: currentIndex === i ? '0 0 8px #E85874' : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Live Station Demo CTA */}
              <button
                onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry from Tour - ${currentNode.name}` })}
                style={{
                  backgroundColor: '#E85874',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '999px',
                  padding: '0.28rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 2px 10px rgba(232, 88, 116, 0.45)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Sparkles size={12} />
                <span>Station Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
