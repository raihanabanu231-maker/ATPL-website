import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.webp';
import atplQrCodeImg from '../../../assets/images/atpl_qr_code.png';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { 
  Bot, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Play,
  Pause,
  Activity,
  Zap,
  Radio,
  X,
  QrCode,
  Download,
  PhoneCall,
  Calendar,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Check
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
    lesson: 'Step 1: Here is PERFECT TRACE! Our software assigns parent-child serialization (Item -> Pack -> Case -> Pallet) with cryptographic QR verification for 100% DGFT/DSCSA regulatory compliance.',
    specs: ['Multi-level Parent-Child aggregation', '1-Click recall traceability', 'DGFT & EU-FMD compliant'],
    keyBenefits: ['Parent-Child Aggregation', '1-Click Recall Isolation', '100% DGFT / DSCSA Certified'],
    roiMetric: '100% Regulatory Compliance',
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
    lesson: 'Step 2: Welcome to PERFECT AUDIT! This digital audit platform eliminates paper checklists. Quality inspectors record photo evidence, execute automated CAPA workflows, and sign with 21 CFR Part 11 compliant digital signatures.',
    specs: ['100% paperless digital checklists', 'Photo evidence capture', '21 CFR Part 11 compliance'],
    keyBenefits: ['Zero Paper Checklists', 'Photo Evidence & CAPA', '21 CFR Part 11 e-Signatures'],
    roiMetric: '75% Faster Audit Cycles',
    targetView: 'software'
  },
  {
    id: 'node-warehouse',
    stepNumber: 3,
    name: 'PERFECT WAREHOUSE™',
    category: 'WAREHOUSE MANAGEMENT SYSTEM (WMS)',
    icon: '📦',
    x: 74,
    y: 24,
    image: '/assets/images/stations/warehouse.webp',
    tagline: 'Autonomous WMS with 3D Bin Mapping & RFID',
    lesson: 'Step 3: Visiting PERFECT WAREHOUSE! This enterprise WMS manages automated 3D bin allocation, dynamic slotting, FIFO/FEFO picking optimization, and synchronizes bi-directionally with SAP and Oracle.',
    specs: ['3D bin & rack heatmap mapping', 'Automated pallet & carton tagging', 'Native SAP/Oracle ERP sync'],
    keyBenefits: ['3D Bin Heatmap Slotting', 'FIFO/FEFO Picking AI', 'Sub-second SAP/Oracle Sync'],
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
    lesson: 'Step 4: At the RFID ANTENNA station! Fixed multi-directional UHF portals capture 1,200+ pallet and carton tags in milliseconds as forklifts drive through warehouse bay doors with 99.98% inventory accuracy.',
    specs: ['1,200+ tags/sec dense read rate', 'Up to 15m capture range', 'Directional dock-door sensing'],
    keyBenefits: ['1,200+ Tags/Sec Capture', '15m High-Throughput Range', 'Directional Dock Sensing'],
    roiMetric: '10x Faster Inbound/Outbound',
    targetView: 'hardware'
  },
  {
    id: 'node-pms',
    stepNumber: 5,
    name: 'PERFECT PMS™',
    category: 'PRODUCTION MANAGEMENT SYSTEM',
    icon: '⚙️',
    x: 58,
    y: 80,
    image: '/assets/images/stations/pms.webp',
    tagline: 'Real-time Shop-Floor OEE & Machine Monitoring',
    lesson: 'Step 5: Here is PERFECT PMS! It directly connects with assembly lines to track Overall Equipment Effectiveness (OEE), monitor machine cycle times, analyze downtime pareto root causes, and trigger real-time Andon alerts.',
    specs: ['Real-time OEE dashboards', 'Machine cycle monitoring', 'Automated Andon alerts'],
    keyBenefits: ['Live OEE Dashboards', 'Sub-Second Machine Telemetry', 'Automated Andon Alerts'],
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
    tagline: '6-Axis Multi-Joint Robotic Assembly Cells',
    lesson: 'Step 6: Here are the INDUSTRIAL ROBOTS! Multi-axis articulated robotic arms execute precision welding, pick-and-place, and synchronized conveyor transfers with 0.05mm repeatability alongside PLC automation.',
    specs: ['6-Axis articulated motion', '0.05mm repeatability precision', 'Direct PLC/SCADA integration'],
    keyBenefits: ['6-Axis Articulated Motion', '0.05mm Repeatability Precision', 'PLC & SCADA Interlocked'],
    roiMetric: 'Zero Assembly Variance',
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
    lesson: 'Step 7: Check out our SCANNING SOLUTIONS! ATPL deploys high-speed DPM (Direct Part Mark) scanners decoding laser-etched and dot-peen codes on curved reflective automotive metals and pharmaceutical packaging.',
    specs: ['Sub-10ms multi-code decode', 'MIL-STD-810H ultra-rugged drop', 'Multi-illumination liquid lens'],
    keyBenefits: ['Sub-10ms DPM Decode Rate', 'Curved Metal & Dot-Peen Ready', 'MIL-STD-810H Drop Proof'],
    roiMetric: '99.99% First-Pass Read Rate',
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
    lesson: 'Step 8: Welcome to INDUSTRIAL PRINTING! Heavy-duty industrial printers with all-metal mechanisms, dual-sensor calibration, and inline ODV barcode verifiers ensuring 100% scan-ready GS1 shipping labels.',
    specs: ['Continuous 24/7 multi-shift uptime', '600 DPI ultra-fine micro-labels', 'Integrated inline barcode verifier'],
    keyBenefits: ['Continuous 24/7 Multi-Shift Uptime', 'Inline Barcode ODV Verifier', '600 DPI Ultra-Fine Labels'],
    roiMetric: 'Zero Bad-Barcode Chargebacks',
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
    lesson: 'Step 9: Look up at DRONES & REMOTE CONTROL! Autonomous inspection drones navigate high-bay 15-meter racking aisles without GPS, auditing thousands of pallet barcodes in minutes safely without scissor lifts.',
    specs: ['Optical SLAM indoor navigation', 'Zero-fall hazard stocktaking', 'Instant ERP discrepancy alerts'],
    keyBenefits: ['Optical SLAM Indoor Navigation', 'Zero Scissor Lift Fall Hazards', 'Instant ERP Discrepancy Flags'],
    roiMetric: '15x Faster High-Bay Audits',
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
    lesson: 'Step 10: Here is ATPL SOFTWARE DEVELOPMENT! Our in-house engineering team crafts cloud-native MES/WMS platforms, high-speed OPC-UA middleware, embedded sensor firmware, and mobile enterprise applications.',
    specs: ['35+ years combined domain mastery', 'REST, MQTT & OPC-UA native stacks', 'Custom ERP bi-directional sync'],
    keyBenefits: ['35+ Years Domain Engineering', 'REST, MQTT & OPC-UA Native', '100% In-House Architecture'],
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
    lesson: 'Step 11: At the SUPER COMPUTER AI & ML hub! GPU-accelerated neural networks analyze gigapixel inspection images in sub-8ms, classifying microscopic surface flaws, solder bridge defects, and dimensional variances.',
    specs: ['Sub-8ms neural inference latency', '99.99% defect catch accuracy', 'Automated Pareto root-cause analytics'],
    keyBenefits: ['Sub-8ms Neural Inference Latency', 'Gigapixel Surface Flaw Detection', 'Automated Root-Cause Analytics'],
    roiMetric: '99.99% Flaw Detection Catch',
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
    lesson: 'Step 12: Completing our tour at ERP SOLUTIONS! ATPL ERP Sync certified connectors translate shopfloor machine PLC events and barcode scans into real-time SAP IDocs and Oracle BAPIs with zero data latency.',
    specs: ['Certified SAP S/4HANA & Oracle BAPIs', 'Zero-data-loss buffering memory', 'Instant shopfloor-to-boardroom visibility'],
    keyBenefits: ['Certified SAP S/4HANA & Oracle Connectors', 'Zero Data Loss Buffering', 'Shopfloor-to-Boardroom Visibility'],
    roiMetric: 'Real-time ERP Data Flow',
    targetView: 'solutions'
  }
];

export const FactoryBlueprintMap = () => {
  const { openDemoModal, setCurrentView, addToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(true);
  const [showCompletionCta, setShowCompletionCta] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const userClosedRef = useRef(false);
  const closingLockRef = useRef(false);

  const closeTour = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    userClosedRef.current = true;
    closingLockRef.current = true;
    setIsTourOpen(false);
    setIsAutoTour(false);
    setTimeout(() => {
      closingLockRef.current = false;
    }, 450);
  };

  const openTour = (e) => {
    if (closingLockRef.current) return;
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    userClosedRef.current = false;
    setIsTourOpen(true);
  };

  const currentNode = ATPL_FACTORY_NODES[currentIndex];
  const isLastStation = currentIndex === ATPL_FACTORY_NODES.length - 1;

  // Auto-tour timer (moves automatically every 5.5s)
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      if (userClosedRef.current) return;
      setCurrentIndex(prev => {
        const next = (prev + 1) % ATPL_FACTORY_NODES.length;
        if (next === ATPL_FACTORY_NODES.length - 1) {
          setShowCompletionCta(true);
        }
        return next;
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoTour]);

  // When user reaches station 12 (last station), enable completion CTA
  useEffect(() => {
    if (isLastStation) {
      setShowCompletionCta(true);
    }
  }, [isLastStation]);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const next = (prev + 1) % ATPL_FACTORY_NODES.length;
      if (next === ATPL_FACTORY_NODES.length - 1) {
        setShowCompletionCta(true);
      }
      return next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + ATPL_FACTORY_NODES.length) % ATPL_FACTORY_NODES.length);
  };

  const [mobileViewMode, setMobileViewMode] = useState('map'); // 'map' | 'cards'

  // WCAG 2.2 AA Keyboard Navigation (Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStationClick = (index) => {
    if (closingLockRef.current) return;
    setCurrentIndex(index);
    setIsAutoTour(false);
    userClosedRef.current = false;
    setIsTourOpen(true);
    if (index === ATPL_FACTORY_NODES.length - 1) {
      setShowCompletionCta(true);
    }
  };

  const handleDownloadBrochure = () => {
    if (addToast) {
      addToast('Brochure Download', 'Downloading ATPL Smart Factory 4.0 Corporate Overview (2026)...', 'success');
    }
    const link = document.createElement('a');
    link.href = '/ATPL_Smart_Factory_Overview_2026.pdf';
    link.setAttribute('download', 'ATPL_Smart_Factory_Overview_2026.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="factory-blueprint-section" 
      aria-label="ATPL Smart Factory Interactive 12-Station Tour"
      className="factory-blueprint-section-root"
      style={{ 
        backgroundColor: '#050c1a', 
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="factory-blueprint-main-wrapper" 
        style={{ 
          maxWidth: '1440px', 
          width: '100%', 
          margin: '0 auto', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        
        {/* =====================================================================
            1. SECTION INTRO HEADER: High-impact & Single-Screen Proportion
           ===================================================================== */}
        <div className="factory-tour-header" style={{ textAlign: 'center', marginBottom: '0.35rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '999px',
            padding: '0.15rem 0.65rem',
            marginBottom: '0.18rem',
            boxShadow: '0 2px 10px rgba(0, 240, 255, 0.15)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 8px #00f0ff',
              display: 'inline-block',
              animation: 'pulseCyanDot 1.8s infinite'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#00f0ff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              Industry 4.0 Digital Twin • 12-Station Interactive Tour
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: '0 0 0.12rem 0',
            lineHeight: 1.2
          }}>
            Explore ATPL Smart Factory – 12 Station Interactive Tour
          </h2>

          <p className="factory-tour-header-desc" style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.74rem, 0.88vw, 0.82rem)',
            maxWidth: '780px',
            margin: '0 auto',
            lineHeight: 1.35
          }}>
            Click directly on any station pin or let Archie AI guide you through our turnkey manufacturing, warehouse automation, RFID portals, and sub-8ms machine vision ecosystem.
          </p>
        </div>

        {/* =====================================================================
            2. INTERACTIVE STAGE BOX
           ===================================================================== */}
        <div 
          className={`factory-blueprint-stage-box ${mobileViewMode === 'cards' ? 'cards-mode' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#040b18',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1.5px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)'
          }}
        >
          {/* Visual & Responsive Styles */}
          <style>{`
            @keyframes pulseCyanDot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.3); }
            }
            @keyframes pulseCoralDot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.25); }
            }
            @keyframes radarPulse {
              0% { transform: scale(0.9); opacity: 0.9; }
              70% { transform: scale(2.4); opacity: 0; }
              100% { transform: scale(2.6); opacity: 0; }
            }
            .station-pin-container {
              position: absolute;
              transform: translate(-50%, -50%);
              cursor: pointer;
              z-index: 20;
              transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .station-pin-circle {
              width: 26px;
              height: 26px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-display, sans-serif);
              font-size: 0.74rem;
              font-weight: 900;
              color: #ffffff;
              background: linear-gradient(135deg, #0071ba 0%, #004b7c 100%);
              border: 1.5px solid rgba(0, 240, 255, 0.65);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.65), 0 0 10px rgba(0, 240, 255, 0.35);
              transition: all 0.25s ease;
              position: relative;
            }
            .station-pin-container:hover .station-pin-circle {
              transform: scale(1.15);
              background: #E85874;
              border-color: #ffffff;
              box-shadow: 0 0 20px #E85874;
            }
            .station-pin-container.active .station-pin-circle {
              background: #E85874;
              border-color: #ffffff;
              box-shadow: 0 0 22px #E85874;
              transform: scale(1.12);
            }
            .station-pin-radar {
              position: absolute;
              top: -4px;
              left: -4px;
              right: -4px;
              bottom: -4px;
              border-radius: 50%;
              border: 2px solid #E85874;
              animation: radarPulse 2s infinite ease-out;
              pointer-events: none;
            }
            .station-pill-label {
              position: absolute;
              top: calc(100% + 3px);
              left: 50%;
              transform: translateX(-50%);
              background: rgba(4, 11, 24, 0.94);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(0, 240, 255, 0.45);
              color: #f1f5f9;
              padding: 0.16rem 0.5rem;
              border-radius: 4px;
              font-size: 0.62rem;
              font-weight: 800;
              white-space: nowrap;
              letter-spacing: 0.02em;
              text-transform: uppercase;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.75);
              pointer-events: none;
              transition: all 0.25s ease;
              z-index: 25;
            }
            .station-pin-container.active .station-pill-label {
              border-color: #E85874;
              color: #ffffff;
              background: rgba(232, 88, 116, 0.4);
              box-shadow: 0 0 16px rgba(232, 88, 116, 0.65);
              font-weight: 900;
              transform: translateX(-50%) scale(1.04);
            }
            .station-pin-container:hover .station-pill-label {
              border-color: #00f0ff;
              color: #ffffff;
              box-shadow: 0 0 14px rgba(0, 240, 255, 0.65);
            }
            .station-pin-container:focus-visible {
              outline: 2px solid #00f0ff;
              outline-offset: 4px;
              border-radius: 50%;
            }
            .tour-chip-btn:focus-visible {
              outline: 2px solid #00f0ff;
              outline-offset: 2px;
            }
            @media (min-width: 900px) {
              .mobile-mode-toggle-btn {
                display: none !important;
              }
              .factory-mobile-cards-view {
                display: none !important;
              }
            }
            @media (max-width: 899px) {
              .mobile-mode-toggle-btn {
                display: inline-flex !important;
              }
              .factory-blueprint-stage-box.cards-mode .factory-map-viewport,
              .factory-blueprint-stage-box.cards-mode .factory-hud-bottom-overlay,
              .factory-blueprint-stage-box.cards-mode .factory-hud-toggle-pill {
                display: none !important;
              }
            }

            /* =========================================================
               Desktop Layout: Fits cleanly within Single Screen (One Scroll)
               ========================================================= */
            @media (min-width: 900px) {
              #factory-blueprint-section {
                height: calc(100vh - 102px) !important;
                max-height: calc(100vh - 102px) !important;
                min-height: 480px !important;
                padding: 0.25rem 1rem 0.45rem 1rem !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
              }
              .factory-blueprint-main-wrapper {
                height: 100% !important;
                flex: 1 1 0 !important;
                min-height: 0 !important;
              }
              .factory-tour-header {
                flex-shrink: 0 !important;
                margin-bottom: 0.25rem !important;
              }
              .factory-blueprint-stage-box {
                flex: 1 1 0 !important;
                min-height: 0 !important;
                height: 100% !important;
                position: relative !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                overflow: hidden !important;
              }
              .factory-map-viewport {
                position: relative !important;
                height: 100% !important;
                aspect-ratio: 1376 / 768 !important;
                max-width: 100% !important;
                max-height: 100% !important;
                margin: 0 auto !important;
                overflow: hidden !important;
                z-index: 1 !important;
              }
              .factory-map-viewport img.factory-blueprint-bg-img {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: fill !important;
              }
              .factory-blueprint-qr-box {
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 25 !important;
                background: rgba(4, 11, 24, 0.94) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                padding: 4px !important;
                border-radius: 12px !important;
                border: 1.5px solid rgba(0, 240, 255, 0.65) !important;
                box-shadow: 0 12px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.4) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                pointer-events: auto !important;
              }
              .factory-blueprint-qr-box:hover {
                transform: translate(-50%, -50%) scale(1.1) !important;
                border-color: #E85874 !important;
                box-shadow: 0 16px 45px rgba(0, 0, 0, 0.95), 0 0 35px rgba(232, 88, 116, 0.7) !important;
              }
              .factory-blueprint-qr-img {
                width: 52px !important;
                height: 52px !important;
                min-width: 52px !important;
                min-height: 52px !important;
                display: block !important;
                border-radius: 6px !important;
                object-fit: contain !important;
                position: static !important;
                inset: auto !important;
              }
              .factory-blueprint-top-hud {
                position: absolute !important;
                top: 8px !important;
                left: 10px !important;
                right: 10px !important;
                z-index: 35 !important;
                padding: 0.25rem 0.75rem !important;
              }
              .factory-hud-bottom-overlay {
                position: absolute !important;
                bottom: 8px !important;
                left: 10px !important;
                right: 10px !important;
                z-index: 45 !important;
                padding: 0.38rem 2.2rem 0.38rem 0.85rem !important;
              }
            }

            .factory-top-title-wrap {
              display: flex;
              align-items: center;
              gap: 0.65rem;
            }
            .factory-top-controls-wrap {
              display: flex;
              align-items: center;
              gap: 0.65rem;
            }
            .hud-station-header-row {
              display: flex;
              align-items: center;
              gap: 0.65rem;
            }

            /* =========================================================
               Mobile & Tablet Adaptive Layout: Fits in 1 Clean Screen Fold
               ========================================================= */
            @media (max-width: 899px) {
              #factory-blueprint-section {
                padding: 0.35rem 0.5rem 0.65rem 0.5rem !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
              }
              .factory-tour-header {
                margin-bottom: 0.25rem !important;
              }
              .factory-tour-header h2 {
                font-size: clamp(1.05rem, 4.2vw, 1.25rem) !important;
                margin: 0 0 0.12rem 0 !important;
                line-height: 1.2 !important;
              }
              .factory-tour-header-desc {
                font-size: 0.72rem !important;
                line-height: 1.3 !important;
                color: #94a3b8 !important;
                max-width: 96% !important;
                margin: 0 auto !important;
              }

              /* The stage container on mobile */
              .factory-blueprint-stage-box {
                position: relative !important;
                width: 100% !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                background: #040b18 !important;
                border: 1.5px solid rgba(0, 240, 255, 0.4) !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.12) !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 0 !important;
              }

              /* 1. Sleek Top Bar on Mobile */
              .factory-blueprint-top-hud {
                position: relative !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                width: 100% !important;
                z-index: 25 !important;
                background: rgba(4, 11, 24, 0.96) !important;
                border: none !important;
                border-bottom: 1px solid rgba(0, 240, 255, 0.22) !important;
                border-radius: 0 !important;
                padding: 0.32rem 0.55rem !important;
                box-shadow: none !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                gap: 6px !important;
                box-sizing: border-box !important;
              }
              .factory-top-title-wrap {
                display: none !important;
              }
              .tour-chips-bar {
                order: 2 !important;
                flex: 1 !important;
                min-width: 0 !important;
                display: flex !important;
                overflow-x: auto !important;
                -webkit-overflow-scrolling: touch !important;
                gap: 4px !important;
                padding: 1px 2px !important;
                scrollbar-width: none !important;
                justify-content: flex-start !important;
              }
              .tour-chips-bar::-webkit-scrollbar {
                display: none !important;
              }
              .tour-chip-btn {
                width: 24px !important;
                height: 24px !important;
                min-width: 24px !important;
                min-height: 24px !important;
                font-size: 0.72rem !important;
                flex-shrink: 0 !important;
                border-radius: 50% !important;
                touch-action: manipulation !important;
              }
              .factory-top-controls-wrap {
                order: 3 !important;
                gap: 0.4rem !important;
                flex-shrink: 0 !important;
              }
              .tour-counter-text {
                order: 1 !important;
                font-size: 0.72rem !important;
                font-weight: 800 !important;
                color: #00f0ff !important;
                padding: 0.2rem 0.45rem !important;
                background: rgba(0, 240, 255, 0.08) !important;
                border: 1px solid rgba(0, 240, 255, 0.25) !important;
                border-radius: 5px !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
              }
              .tour-auto-btn {
                min-height: 28px !important;
                padding: 0.22rem 0.55rem !important;
                font-size: 0.72rem !important;
                border-radius: 6px !important;
                touch-action: manipulation !important;
              }

              /* 2. Responsive Map Viewport on Mobile */
              .factory-map-viewport {
                position: relative !important;
                width: 100% !important;
                aspect-ratio: 1376 / 768 !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                border-radius: 0 !important;
                overflow: hidden !important;
                background: #040b18 !important;
                border: none !important;
                box-shadow: none !important;
              }

              /* Touch-friendly Hotspot Pins on Mobile */
              .station-pin-container {
                padding: 8px !important;
                margin-top: -8px !important;
                margin-left: -8px !important;
                touch-action: manipulation !important;
              }
              .station-pin-circle {
                width: 23px !important;
                height: 23px !important;
                font-size: 0.7rem !important;
              }
              .station-pill-label {
                display: none !important;
              }
              .station-pin-container.active .station-pill-label {
                display: block !important;
                font-size: 0.62rem !important;
                padding: 0.15rem 0.45rem !important;
                top: calc(100% + 2px) !important;
                z-index: 35 !important;
                max-width: 120px !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
              }

              /* Robot Avatar on Mobile */
              .factory-robot-avatar-marker {
                width: 36px !important;
                height: 36px !important;
              }

              /* QR Badge on Mobile */
              .factory-blueprint-qr-box {
                padding: 2.5px !important;
                border-radius: 7px !important;
              }
              .factory-blueprint-qr-img {
                width: 32px !important;
                height: 32px !important;
                border-radius: 4px !important;
              }

              /* 3. Docked Archie AI Briefing Console on Mobile */
              .factory-hud-bottom-overlay {
                position: relative !important;
                bottom: auto !important;
                left: auto !important;
                right: auto !important;
                width: 100% !important;
                border-radius: 0 !important;
                background: rgba(4, 11, 24, 0.98) !important;
                border: none !important;
                border-top: 1px solid rgba(0, 240, 255, 0.28) !important;
                padding: 0.45rem 0.65rem 0.55rem 0.65rem !important;
                box-shadow: none !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 0.3rem !important;
                max-height: none !important;
                z-index: 20 !important;
                box-sizing: border-box !important;
              }
              .hud-corner-close-btn {
                position: absolute !important;
                top: 6px !important;
                right: 6px !important;
                width: 28px !important;
                height: 28px !important;
                min-width: 28px !important;
                min-height: 28px !important;
                border-radius: 50% !important;
                z-index: 70 !important;
                touch-action: manipulation !important;
              }
              .hud-station-header-row {
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                padding-right: 32px !important;
              }
              .hud-speech-paragraph {
                font-size: 0.74rem !important;
                line-height: 1.35 !important;
                color: #cbd5e1 !important;
                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;
                max-height: 2.8em !important;
                overflow: hidden !important;
                margin: 0 !important;
              }
              .hud-benefits-row {
                display: none !important;
              }
              .hud-actions-container {
                display: flex !important;
                width: 100% !important;
                gap: 6px !important;
                margin-top: 0.15rem !important;
              }
              .hud-btn-prev, .hud-btn-next {
                flex: 1 1 0 !important;
                min-height: 38px !important;
                padding: 0.35rem 0.5rem !important;
                font-size: 0.78rem !important;
                font-weight: 800 !important;
                border-radius: 6px !important;
                justify-content: center !important;
                touch-action: manipulation !important;
              }
              .hud-btn-demo {
                flex: 1.2 1 0 !important;
                min-height: 38px !important;
                padding: 0.35rem 0.5rem !important;
                font-size: 0.78rem !important;
                font-weight: 800 !important;
                border-radius: 6px !important;
                justify-content: center !important;
                touch-action: manipulation !important;
              }

              /* Toggle pill when closed on Mobile */
              .factory-hud-toggle-pill {
                position: relative !important;
                bottom: auto !important;
                right: auto !important;
                width: 100% !important;
                min-height: 40px !important;
                border-radius: 0 !important;
                border: none !important;
                border-top: 1px solid rgba(0, 240, 255, 0.28) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 0.78rem !important;
                font-weight: 800 !important;
                box-sizing: border-box !important;
                padding: 0.45rem 0.75rem !important;
                touch-action: manipulation !important;
              }

              /* Completion Overlay on Mobile */
              .factory-completion-overlay {
                position: absolute !important;
                inset: 6px !important;
                transform: none !important;
                width: auto !important;
                max-width: none !important;
                padding: 0.75rem !important;
                border-radius: 10px !important;
                overflow-y: auto !important;
                z-index: 50 !important;
              }
              .factory-completion-overlay h3 {
                font-size: 1rem !important;
                line-height: 1.25 !important;
              }
              .factory-completion-overlay p {
                font-size: 0.74rem !important;
                margin-bottom: 0.6rem !important;
              }
              .factory-completion-btns {
                display: flex !important;
                flex-direction: column !important;
                gap: 6px !important;
                width: 100% !important;
              }
              .factory-completion-btns button {
                min-height: 38px !important;
                width: 100% !important;
                justify-content: center !important;
                font-size: 0.78rem !important;
              }
            }
          `}</style>

          {/* 1. TOP HUD HEADER (Inside Stage on Desktop, Clean Top Card on Mobile) */}
          <div 
            className="factory-blueprint-top-hud"
            style={{
              position: 'absolute',
              top: '10px',
              left: '12px',
              right: '12px',
              zIndex: 35,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              background: 'rgba(4, 11, 24, 0.90)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '10px',
              padding: '0.4rem 0.85rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Title / Badge */}
            <div className="factory-top-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="pulse-dot"></span>
              <div>
                <span className="factory-top-title-span" style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Activity size={14} color="#00f0ff" />
                  <span className="desktop-only-inline">ATPL CONNECTED SMART FACTORY • 12-STATION ARCHIE AI TOUR</span>
                  <span className="mobile-only-inline">SMART FACTORY TOUR</span>
                </span>
              </div>
            </div>

            {/* Quick 12 Station Number Chips - Clickable on Desktop & Mobile */}
            <div 
              className="tour-chips-bar" 
              role="tablist" 
              aria-label="12 Factory Stations"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              {ATPL_FACTORY_NODES.map((node, i) => (
                <button
                  key={node.id}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === i}
                  aria-controls="factory-station-briefing"
                  aria-label={`Station ${node.stepNumber}: ${node.name}`}
                  onClick={() => handleStationClick(i)}
                  className="tour-chip-btn"
                  title={`${node.stepNumber}. ${node.name}`}
                  style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    background: currentIndex === i ? '#E85874' : 'rgba(255, 255, 255, 0.08)',
                    border: currentIndex === i ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.18)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: currentIndex === i ? '0 0 12px #E85874' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {node.stepNumber}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="factory-top-controls-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setMobileViewMode(prev => prev === 'map' ? 'cards' : 'map')}
                className="tour-auto-btn mobile-mode-toggle-btn"
                aria-label={`Switch to ${mobileViewMode === 'map' ? 'Guided Cards Tour' : 'Blueprint Map'}`}
                title="Switch Mobile View: Blueprint Map or Guided Cards"
                style={{
                  background: 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid #00f0ff',
                  color: '#00f0ff',
                  borderRadius: '6px',
                  padding: '0.28rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {mobileViewMode === 'map' ? '📱 Cards' : '🗺️ Map'}
              </button>

              <button
                type="button"
                onClick={() => setIsAutoTour(!isAutoTour)}
                className="tour-auto-btn"
                aria-label={isAutoTour ? 'Pause automatic station rotation' : 'Start automatic station rotation'}
                style={{
                  background: isAutoTour ? 'rgba(232, 88, 116, 0.2)' : 'rgba(0, 240, 255, 0.15)',
                  border: isAutoTour ? '1px solid #E85874' : '1px solid #00f0ff',
                  color: isAutoTour ? '#E85874' : '#00f0ff',
                  borderRadius: '6px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isAutoTour ? '0 0 12px rgba(232, 88, 116, 0.4)' : 'none'
                }}
              >
                {isAutoTour ? <Pause size={12} /> : <Play size={12} />}
                <span>{isAutoTour ? 'Pause' : 'Auto'}</span>
              </button>

              <div className="tour-counter-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#00f0ff', fontWeight: 800 }}>
                STATION {currentIndex + 1}/12
              </div>
            </div>
          </div>

          {/* 2. DEDICATED MAP VIEWPORT (Clean, Uncrowded & Crisp Graphic on All Devices) */}
          <div className="factory-map-viewport">
            {/* Background Isometric Graphic */}
            <img 
              src={blueprintImg} 
              alt="ATPL Isometric Factory Blueprint"
              className="factory-blueprint-bg-img"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#040b18',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Dynamic Laser Line from Robot to Current Station */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              {/* Dynamic Scanning Laser Beam */}
              <line
                x1={`${currentNode.x}`}
                y1={`${currentNode.y - 6}`}
                x2={`${currentNode.x}`}
                y2={`${currentNode.y}`}
                stroke="#00f0ff"
                strokeWidth="1.6"
                strokeDasharray="2, 2"
              />
              {/* Pulsating Target Circle at Station Footprint */}
              <circle
                cx={`${currentNode.x}`}
                cy={`${currentNode.y}`}
                r="2.8"
                fill="rgba(232, 88, 116, 0.28)"
                stroke="#E85874"
                strokeWidth="0.9"
              />
            </svg>

            {/* 12 Crisp Numbered Hotspot Target Beacons */}
            {ATPL_FACTORY_NODES.map((node, index) => {
              const isActive = currentIndex === index;
              const isNearLeft = node.x < 24;
              const isNearRight = node.x > 76;
              const labelPositionStyle = isNearLeft 
                ? { left: '0%', transform: 'translateX(0%)' } 
                : isNearRight 
                  ? { left: 'auto', right: '0%', transform: 'none' } 
                  : { left: '50%', transform: 'translateX(-50%)' };
              return (
                <div
                  key={node.id}
                  className={`station-pin-container ${isActive ? 'active' : ''}`}
                  onClick={() => handleStationClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStationClick(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Station ${node.stepNumber}: ${node.name}. Press Enter or click to inspect.`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`
                  }}
                  title={`Station ${node.stepNumber}: ${node.name}`}
                >
                  {isActive && <div className="station-pin-radar" />}
                  <div className="station-pin-circle">
                    {node.stepNumber}
                  </div>
                  <div className="station-pill-label" style={labelPositionStyle}>
                    {node.name}
                  </div>
                </div>
              );
            })}

            {/* HIGH-VISIBILITY 3D TOUR LAUNCH BADGE WITH QR CODE */}
            <div 
              className="factory-blueprint-qr-box"
              onClick={() => setCurrentView('factory-3d')}
              title="Click to launch 3D Factory Tour"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentView('factory-3d');
                }
              }}
              aria-label="Launch 3D Digital Twin Factory Tour"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 26,
                background: 'rgba(4, 11, 24, 0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '4px',
                borderRadius: '12px',
                border: '1.5px solid rgba(0, 240, 255, 0.75)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.12)';
                e.currentTarget.style.borderColor = '#E85874';
                e.currentTarget.style.boxShadow = '0 16px 45px rgba(0, 0, 0, 0.95), 0 0 35px rgba(232, 88, 116, 0.75), 0 0 0 2px #00f0ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.75)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.45)';
              }}
            >
              {/* QR Image with white high-contrast wrapper */}
              <div style={{
                background: '#ffffff',
                padding: '3px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)'
              }}>
                <img 
                  src={atplQrCodeImg || "/assets/images/atpl_qr_code.png"} 
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/atpl_qr_code.png";
                  }}
                  alt="ATPL 3D Factory Tour QR Code" 
                  className="factory-blueprint-qr-img"
                  width="54"
                  height="54"
                  style={{
                    width: '54px',
                    height: '54px',
                    minWidth: '54px',
                    minHeight: '54px',
                    display: 'block',
                    borderRadius: '5px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

            {/* Animated Traveling Robot Avatar with Spotlight Glow */}
            <div 
              className="factory-robot-avatar-marker"
              style={{
                position: 'absolute',
                left: `${currentNode.x}%`,
                top: `${currentNode.y - 7}%`,
                transform: 'translate(-50%, -50%)',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.92) 60%, rgba(0, 240, 255, 0.5) 100%)',
                border: '2px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px #00f0ff, 0 0 20px rgba(232, 88, 116, 0.6)',
                zIndex: 30,
                pointerEvents: 'none',
                transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <AtplRobotAvatar size={40} />
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                width: '12px',
                height: '12px',
                background: '#E85874',
                borderRadius: '50%',
                boxShadow: '0 0 15px #E85874',
                animation: 'pulseCoralDot 1.5s infinite ease-in-out'
              }}></div>
            </div>

            {/* STATION 12/12 ENDING EXPERIENCE OVERLAY */}
            {showCompletionCta && isLastStation && (
              <div 
                className="factory-completion-overlay"
                style={{
                  position: 'absolute',
                  top: '52px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 36,
                  width: 'min(94%, 580px)',
                  background: 'rgba(4, 11, 24, 0.96)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1.5px solid #00f0ff',
                  borderRadius: '14px',
                  padding: '1.1rem 1.4rem',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.3)',
                  textAlign: 'center',
                  animation: 'fadeInUp 0.3s ease-out'
                }}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowCompletionCta(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#94a3b8',
                    borderRadius: '50%',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Dismiss"
                >
                  <X size={14} />
                </button>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(232, 88, 116, 0.15)',
                  border: '1px solid #E85874',
                  color: '#E85874',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  <Sparkles size={12} />
                  <span>Tour Complete • 12 Stations Explored</span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: '0.1rem 0 0.4rem 0',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-display)'
                }}>
                  Ready to bring this Smart Factory to your plant?
                </h3>

                <p style={{
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  lineHeight: 1.4,
                  margin: '0 auto 1rem auto',
                  maxWidth: '480px'
                }}>
                  ATPL delivers turnkey Industry 4.0 automation, RFID portals, and sub-8ms AI vision with seamless ERP integration across 500+ manufacturing plants.
                </p>

                {/* 3 Strong CTA Buttons */}
                <div 
                  className="factory-completion-btns"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openDemoModal({ solution: 'Turnkey Smart Factory 4.0', notes: 'Inquiry after completing 12-Station Factory Blueprint Tour' })}
                    style={{
                      background: 'linear-gradient(135deg, #E85874 0%, #c43854 100%)',
                      border: 'none',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '0.55rem 1.1rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 18px rgba(232, 88, 116, 0.5)'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Request Live Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView('contact')}
                    style={{
                      background: 'rgba(0, 113, 186, 0.25)',
                      border: '1.5px solid #00f0ff',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '0.55rem 1.1rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <PhoneCall size={14} color="#00f0ff" />
                    <span>Talk to Expert</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBrochure}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#f1f5f9',
                      borderRadius: '8px',
                      padding: '0.55rem 1.05rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Download size={14} />
                    <span>Download Brochure</span>
                  </button>
                </div>

                {/* Replay option */}
                <div style={{ marginTop: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(0);
                      setIsAutoTour(true);
                      setShowCompletionCta(false);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      textDecoration: 'underline'
                    }}
                  >
                    <RotateCcw size={11} />
                    <span>Replay 12-Station Tour from Station 1</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              2B. MOBILE GUIDED CARDS TOUR (Sleek Fallback & Direct Card Experience)
             ===================================================================== */}
          {mobileViewMode === 'cards' && (
            <div 
              className="factory-mobile-cards-view"
              role="region"
              aria-label={`Mobile Station Card ${currentIndex + 1} of 12: ${currentNode.name}`}
              style={{
                padding: '0.85rem',
                backgroundColor: '#071226',
                borderRadius: '10px',
                margin: '0.5rem',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#E85874',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.8rem'
                  }}>
                    {currentNode.stepNumber}
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#ffffff' }}>
                      {currentNode.name}
                    </h3>
                    <span style={{ fontSize: '0.68rem', color: '#00f0ff', fontWeight: 700, textTransform: 'uppercase' }}>
                      {currentNode.category}
                    </span>
                  </div>
                </div>
                {currentNode.roiMetric && (
                  <span style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10b981',
                    color: '#34d399',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    ⚡ {currentNode.roiMetric}
                  </span>
                )}
              </div>

              {/* Station Image */}
              {currentNode.image && (
                <div style={{ position: 'relative', height: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                  <img 
                    src={currentNode.image} 
                    alt={currentNode.name} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(4, 11, 24, 0.85)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    color: '#e2e8f0'
                  }}>
                    {currentNode.tagline}
                  </div>
                </div>
              )}

              {/* Archie AI Commentary */}
              <div style={{
                backgroundColor: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '8px',
                padding: '0.65rem',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <div style={{ flexShrink: 0 }}>
                  <AtplRobotAvatar size={24} />
                </div>
                <p style={{ margin: 0, fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  <strong style={{ color: '#00f0ff' }}>Archie AI: </strong>
                  {currentNode.lesson}
                </p>
              </div>

              {/* Key Benefits */}
              {currentNode.keyBenefits && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {currentNode.keyBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#94a3b8' }}>
                      <Check size={12} color="#00f0ff" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous factory station"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next factory station"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(0, 240, 255, 0.2)',
                    border: '1px solid #00f0ff',
                    color: '#00f0ff',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry from Mobile Tour - Station ${currentNode.stepNumber}` })}
                  style={{
                    flex: 1.4,
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #E85874 0%, #c43854 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Sparkles size={13} />
                  <span>Demo</span>
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              3. BOTTOM HUD DIALOGUE CONSOLE: Richer Active Station Info & Archie AI
             ===================================================================== */}
          {isTourOpen ? (
            <div 
              id="factory-station-briefing"
              className="factory-hud-bottom-overlay"
              role="region"
              aria-label={`Archie AI Tour Guide: Station ${currentIndex + 1} of 12 - ${currentNode.name}`}
              aria-live="polite"
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '10px',
                right: '10px',
                zIndex: 45,
                background: 'rgba(4, 11, 24, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '12px',
                padding: '0.55rem 2.5rem 0.55rem 1rem',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 240, 255, 0.2)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '0.9rem',
                alignItems: 'center',
                animation: 'fadeInUp 0.25s ease-out'
              }}
            >
              
              {/* Prominent Corner Exit / Close (X) Button */}
              <button
                type="button"
                onClick={closeTour}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  closeTour(e);
                }}
                className="hud-corner-close-btn"
                aria-label="Close Archie AI Tour panel"
                title="Close Archie AI Tour panel (✕)"
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(232, 88, 116, 0.22)',
                  border: '1.5px solid #E85874',
                  color: '#ff4d6d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 70,
                  pointerEvents: 'auto',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E85874';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.22)';
                  e.currentTarget.style.color = '#ff4d6d';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X size={16} strokeWidth={2.5} style={{ pointerEvents: 'none' }} />
              </button>

              {/* Robot Avatar Info */}
              <div className="hud-station-header-row" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #ffffff 0%, #e0f2fe 70%, #0071ba 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #00f0ff',
                  boxShadow: '0 0 16px rgba(0, 240, 255, 0.6), 0 0 8px rgba(232, 88, 116, 0.4)',
                  flexShrink: 0
                }}>
                  <AtplRobotAvatar size={28} />
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>
                  <strong style={{ color: '#ffffff', fontSize: '0.82rem', display: 'block', letterSpacing: '0.01em' }}>
                    Archie AI Guide:
                  </strong>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase' }}>
                    STOP {currentIndex + 1}/12 • {currentNode.category}
                  </span>
                </div>
              </div>

              {/* Station Speech + Rich Benefits Chips */}
              <div style={{ minWidth: 0, paddingRight: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '0.88rem', color: '#ffffff', margin: 0, fontWeight: 900, letterSpacing: '0.02em' }}>
                    {currentNode.name}
                  </h3>
                  <span style={{ color: '#E85874', fontSize: '0.72rem', fontWeight: 700 }}>
                    • {currentNode.tagline}
                  </span>
                  {currentNode.roiMetric && (
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#34d399',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      marginLeft: '0.2rem'
                    }}>
                      ⚡ {currentNode.roiMetric}
                    </span>
                  )}
                </div>

                <p className="hud-speech-paragraph" style={{ 
                  fontSize: '0.8rem', 
                  color: '#e2e8f0', 
                  lineHeight: 1.35, 
                  margin: '0 0 0.3rem 0'
                }}>
                  {currentNode.lesson}
                </p>

                {/* Rich Key Benefits Pills (Desktop & Tablet) */}
                {currentNode.keyBenefits && (
                  <div className="hud-benefits-row" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {currentNode.keyBenefits.map((benefit, bIdx) => (
                      <span key={bIdx} style={{
                        background: 'rgba(0, 240, 255, 0.08)',
                        border: '1px solid rgba(0, 240, 255, 0.25)',
                        color: '#bae6fd',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '0.12rem 0.45rem',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Check size={10} color="#00f0ff" />
                        <span>{benefit}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Navigation Controls + Station Demo + Close (X) */}
              <div className="hud-actions-container" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hud-btn-prev"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.34rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                  title="Previous Station"
                >
                  <ChevronLeft size={13} />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="hud-btn-next"
                  style={{
                    background: '#0071ba',
                    border: '1px solid #00f0ff',
                    color: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.34rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 10px rgba(0, 113, 186, 0.4)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
                  title="Next Station"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry for ${currentNode.name} from Factory Blueprint map.` })}
                  className="hud-btn-demo"
                  style={{
                    backgroundColor: '#E85874',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.34rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(232, 88, 116, 0.4)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d44360'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E85874'}
                  title={`Request Live Demo for ${currentNode.name}`}
                >
                  Demo
                </button>
              </div>

            </div>
          ) : (
            /* Re-open Pill when closed */
            <button
              type="button"
              onClick={openTour}
              className="factory-hud-toggle-pill"
              aria-label="Reopen Archie AI Tour panel"
              title="Click to reopen Archie AI Guide Tour"
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                zIndex: 45,
                background: 'linear-gradient(135deg, rgba(4, 11, 24, 0.96) 0%, rgba(0, 113, 186, 0.88) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid #00f0ff',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '0.45rem 1.1rem',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 240, 255, 0.4)',
                transition: 'all 0.2s ease',
                animation: 'fadeInUp 0.25s ease-out',
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.8), 0 0 25px rgba(0,240,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.7), 0 0 20px rgba(0,240,255,0.3)';
              }}
            >
              <AtplRobotAvatar size={22} />
              <span>Archie AI Tour ({currentIndex + 1}/12) ▶</span>
            </button>
          )}

        </div>

      </div>
    </section>
  );
};
