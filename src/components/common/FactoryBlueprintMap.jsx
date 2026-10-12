import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.jpg';
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
  const closingLockRef = useRef(false);

  const closeTour = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
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
    setIsTourOpen(true);
  };

  const currentNode = ATPL_FACTORY_NODES[currentIndex];
  const isLastStation = currentIndex === ATPL_FACTORY_NODES.length - 1;

  // Auto-tour timer (moves automatically every 5.5s)
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
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

  const handleStationClick = (index) => {
    if (closingLockRef.current) return;
    setCurrentIndex(index);
    setIsAutoTour(false);
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
      style={{ 
        padding: '0.8rem 1rem 1.2rem 1rem', 
        backgroundColor: '#050c1a', 
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* =====================================================================
            1. SECTION INTRO HEADER: Clarity & Immediate Purpose
           ===================================================================== */}
        <div className="factory-tour-header" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '999px',
            padding: '0.22rem 0.85rem',
            marginBottom: '0.35rem',
            boxShadow: '0 2px 12px rgba(0, 240, 255, 0.15)'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 10px #00f0ff',
              display: 'inline-block',
              animation: 'pulseCyanDot 1.8s infinite'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#00f0ff',
              letterSpacing: '0.07em',
              textTransform: 'uppercase'
            }}>
              Industry 4.0 Digital Twin • 12-Station Interactive Tour
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 2.3vw, 1.95rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: '0.1rem 0 0.25rem 0',
            lineHeight: 1.25
          }}>
            Explore ATPL Smart Factory – 12 Station Interactive Tour
          </h2>

          <p className="factory-tour-header-desc" style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
            maxWidth: '820px',
            margin: '0 auto',
            lineHeight: 1.4
          }}>
            Click directly on any station pin or let Archie AI guide you through our turnkey manufacturing, warehouse automation, RFID portals, and sub-8ms machine vision ecosystem.
          </p>
        </div>

        {/* =====================================================================
            2. INTERACTIVE STAGE BOX
           ===================================================================== */}
        <div 
          className="factory-blueprint-stage-box"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(460px, 60vh, 660px)',
            minHeight: '440px',
            backgroundColor: '#040b18',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1.5px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.15)'
          }}
        >
          
          {/* Background Isometric Graphic */}
          <img 
            src={blueprintImg} 
            alt="ATPL Isometric Factory Blueprint"
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
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .station-pin-circle {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-display, sans-serif);
              font-size: 0.76rem;
              font-weight: 900;
              color: #ffffff;
              background: linear-gradient(135deg, #0071ba 0%, #004b7c 100%);
              border: 1.5px solid rgba(0, 240, 255, 0.65);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.65), 0 0 10px rgba(0, 240, 255, 0.35);
              transition: all 0.25s ease;
              position: relative;
            }
            .station-pin-container:hover .station-pin-circle {
              transform: scale(1.18);
              background: #E85874;
              border-color: #ffffff;
              box-shadow: 0 0 22px #E85874;
            }
            .station-pin-container.active .station-pin-circle {
              background: #E85874;
              border-color: #ffffff;
              box-shadow: 0 0 25px #E85874;
              transform: scale(1.15);
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
              top: calc(100% + 4px);
              left: 50%;
              transform: translateX(-50%);
              background: rgba(4, 11, 24, 0.94);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(0, 240, 255, 0.45);
              color: #f1f5f9;
              padding: 0.18rem 0.55rem;
              border-radius: 4px;
              font-size: 0.64rem;
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
              background: rgba(232, 88, 116, 0.35);
              box-shadow: 0 0 16px rgba(232, 88, 116, 0.65);
              font-weight: 900;
              transform: translateX(-50%) scale(1.05);
            }
            .station-pin-container:hover .station-pill-label {
              border-color: #00f0ff;
              color: #ffffff;
              box-shadow: 0 0 14px rgba(0, 240, 255, 0.65);
            }

            /* Tooltip styling for QR code */
            .qr-badge-caption {
              font-size: 0.62rem;
              color: #38bdf8;
              font-weight: 700;
              letter-spacing: 0.04em;
              text-align: center;
              margin-top: 3px;
              white-space: nowrap;
            }

            @media (max-width: 768px) {
              #factory-blueprint-section {
                padding: 0.5rem 0.5rem 0.8rem 0.5rem !important;
              }
              .factory-tour-header {
                margin-bottom: 0.4rem !important;
              }
              .factory-tour-header h2 {
                font-size: 1.05rem !important;
                margin: 0.1rem 0 !important;
                line-height: 1.25 !important;
              }
              .factory-tour-header-desc {
                display: none !important;
              }
              .factory-blueprint-stage-box {
                height: 275px !important;
                min-height: 275px !important;
                border-radius: 10px !important;
              }
              .station-pin-circle {
                width: 22px !important;
                height: 22px !important;
                font-size: 0.65rem !important;
              }
              .station-pill-label {
                display: none !important;
              }
              .station-pin-container.active .station-pill-label {
                display: block !important;
                font-size: 0.55rem !important;
                padding: 0.1rem 0.35rem !important;
              }
              .factory-blueprint-top-hud {
                top: 6px !important;
                left: 6px !important;
                right: 6px !important;
                padding: 0.25rem 0.5rem !important;
              }
              .factory-top-title-span {
                font-size: 0.68rem !important;
              }
              .factory-blueprint-qr-box {
                padding: 4px !important;
                border-radius: 10px !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8) !important;
              }
              .factory-blueprint-qr-img {
                width: 44px !important;
                height: 44px !important;
                border-radius: 4px !important;
              }
              .qr-badge-caption {
                font-size: 0.52rem !important;
                display: none !important;
              }
              .qr-badge-header {
                font-size: 0.52rem !important;
                padding: 0.1rem 0.3rem !important;
              }
              .factory-hud-bottom-overlay {
                grid-template-columns: 1fr !important;
                gap: 0.25rem !important;
                padding: 0.45rem 2.4rem 0.45rem 0.65rem !important;
                bottom: 5px !important;
                left: 5px !important;
                right: 5px !important;
                border-radius: 10px !important;
                max-height: 140px !important;
                z-index: 45 !important;
              }
              .hud-corner-close-btn {
                position: absolute !important;
                top: 6px !important;
                right: 6px !important;
                width: 28px !important;
                height: 28px !important;
                z-index: 60 !important;
                pointer-events: auto !important;
              }
              .hud-benefits-row {
                display: none !important;
              }
              .hud-speech-paragraph {
                max-height: 32px !important;
                font-size: 0.68rem !important;
                line-height: 1.25 !important;
                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;
                overflow: hidden !important;
              }
              .hud-actions-container {
                display: flex !important;
                width: 100% !important;
                gap: 0.35rem !important;
                margin-top: 0.15rem !important;
              }
              .hud-btn-prev, .hud-btn-next {
                flex: 1 1 0 !important;
                min-height: 34px !important;
                padding: 0.25rem 0.35rem !important;
                font-size: 0.72rem !important;
                justify-content: center !important;
              }
              .hud-btn-demo {
                flex: 1.3 1 0 !important;
                min-height: 34px !important;
                padding: 0.25rem 0.45rem !important;
                font-size: 0.72rem !important;
                justify-content: center !important;
              }
              .factory-hud-toggle-pill {
                bottom: 8px !important;
                right: 8px !important;
                padding: 0.35rem 0.85rem !important;
                font-size: 0.74rem !important;
                z-index: 45 !important;
                pointer-events: auto !important;
              }
            }
            @media (max-width: 480px) {
              .factory-blueprint-stage-box {
                height: 250px !important;
                min-height: 250px !important;
              }
              .factory-blueprint-qr-img {
                width: 38px !important;
                height: 38px !important;
              }
            }
          `}</style>

          {/* TOP HUD HEADER OVERLAY (Inside Stage) */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
                  <span className="mobile-only-inline">SMART FACTORY 3D TOUR</span>
                </span>
              </div>
            </div>

            {/* Quick 12 Station Number Chips */}
            <div style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }} className="tour-chips-bar">
              <style>{`
                @media (min-width: 900px) {
                  .tour-chips-bar { display: flex !important; }
                }
              `}</style>
              {ATPL_FACTORY_NODES.map((node, i) => (
                <button
                  key={node.id}
                  onClick={() => handleStationClick(i)}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                onClick={() => setIsAutoTour(!isAutoTour)}
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

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#00f0ff', fontWeight: 800 }}>
                STATION {currentIndex + 1}/12
              </div>
            </div>
          </div>

          {/* 12 Crisp Numbered Hotspot Target Beacons */}
          {ATPL_FACTORY_NODES.map((node, index) => {
            const isActive = currentIndex === index;
            return (
              <div
                key={node.id}
                className={`station-pin-container ${isActive ? 'active' : ''}`}
                onClick={() => handleStationClick(index)}
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
                <div className="station-pill-label">
                  {node.name}
                </div>
              </div>
            );
          })}

          {/* COMPACT & EXPLAINED QR CODE BADGE (Scan for mobile or click to launch 3D tour) */}
          <div 
            className="factory-blueprint-qr-box"
            onClick={() => setCurrentView('factory-3d')}
            title="Scan with mobile camera to view 3D tour on phone, or click to launch fullscreen 3D WebGL Simulation"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 25,
              background: 'rgba(4, 11, 24, 0.90)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '6px 8px',
              borderRadius: '14px',
              border: '1.5px solid rgba(0, 240, 255, 0.5)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 16px 45px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.6), 0 0 0 2px #00f0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.3)';
            }}
          >
            {/* Header Tag */}
            <span className="qr-badge-header" style={{
              fontSize: '0.6rem',
              fontWeight: 800,
              color: '#00f0ff',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <QrCode size={11} color="#00f0ff" />
              <span>Mobile 3D Tour</span>
            </span>

            {/* QR Image with white high-contrast wrapper */}
            <div style={{
              background: '#ffffff',
              padding: '3px',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <img 
                src={atplQrCodeImg} 
                alt="Scan ATPL QR Code" 
                className="factory-blueprint-qr-img"
                style={{
                  width: '64px',
                  height: '64px',
                  display: 'block',
                  borderRadius: '6px'
                }}
              />
            </div>

            {/* Explanatory Caption */}
            <span className="qr-badge-caption">
              Scan or Click to Launch 3D
            </span>
          </div>

          {/* Animated Traveling Robot Avatar with Spotlight Glow */}
          <div style={{
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
          }}>
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

          {/* =====================================================================
              5. STATION 12/12 ENDING EXPERIENCE OVERLAY (Strong Call To Action)
             ===================================================================== */}
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
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <button
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

          {/* =====================================================================
              3. BOTTOM HUD DIALOGUE CONSOLE: Richer Active Station Info & Archie AI
             ===================================================================== */}
          {/* =====================================================================
              3. BOTTOM HUD DIALOGUE CONSOLE: Richer Active Station Info & Archie AI
             ===================================================================== */}
          {isTourOpen ? (
            <div 
              className="factory-hud-bottom-overlay"
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
                onPointerDown={(e) => e.stopPropagation()}
                className="hud-corner-close-btn"
                aria-label="Close Archie AI Tour panel"
                title="Close Archie AI Tour panel (✕)"
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(232, 88, 116, 0.22)',
                  border: '1.5px solid #E85874',
                  color: '#ff4d6d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 60,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
