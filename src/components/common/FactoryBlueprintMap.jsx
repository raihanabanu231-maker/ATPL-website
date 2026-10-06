import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.jpg';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { AtplLogo } from './AtplLogo';
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
  Radio
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
    y: 78,
    tagline: 'GS1 Serialization & Anti-Counterfeit Packaging',
    lesson: 'Step 1: Here is PERFECT TRACE! Our software assigns parent-child serialization (Item -> Pack -> Case -> Pallet) with cryptographic QR verification for 100% DGFT/DSCSA regulatory compliance.',
    specs: ['Multi-level Parent-Child aggregation', '1-Click recall traceability', 'DGFT & EU-FMD compliant'],
    targetView: 'software'
  },
  {
    id: 'node-audit',
    stepNumber: 2,
    name: 'PERFECT AUDIT™',
    category: 'COMPLIANCE & AUDIT MANAGEMENT',
    icon: '📋',
    x: 30,
    y: 48,
    tagline: 'Paperless Digital Audits & Non-Conformance Logs',
    lesson: 'Step 2: Welcome to PERFECT AUDIT! This digital audit platform eliminates paper checklists. Quality inspectors record photo evidence, execute automated CAPA workflows, and sign with 21 CFR Part 11 compliant digital signatures.',
    specs: ['100% paperless digital checklists', 'Photo evidence capture', '21 CFR Part 11 compliance'],
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
    targetView: 'software'
  },
  {
    id: 'node-rfid',
    stepNumber: 4,
    name: 'RFID ANTENNA & READERS',
    category: 'AIDC HARDWARE',
    icon: '📡',
    x: 39,
    y: 18,
    tagline: 'Long-Range UHF Portals & High-Temp Tags',
    lesson: 'Step 4: At the RFID ANTENNA station! Fixed multi-directional UHF portals capture 1,200+ pallet and carton tags in milliseconds as forklifts drive through warehouse bay doors with 99.98% inventory accuracy.',
    specs: ['1,200+ tags/sec dense read rate', 'Up to 15m capture range', 'Directional dock-door sensing'],
    targetView: 'hardware'
  },
  {
    id: 'node-pms',
    stepNumber: 5,
    name: 'PERFECT PMS™',
    category: 'PRODUCTION MANAGEMENT SYSTEM',
    icon: '⚙️',
    x: 58,
    y: 82,
    tagline: 'Real-time Shop-Floor OEE & Machine Monitoring',
    lesson: 'Step 5: Here is PERFECT PMS! It directly connects with assembly lines to track Overall Equipment Effectiveness (OEE), monitor machine cycle times, analyze downtime pareto root causes, and trigger real-time Andon alerts.',
    specs: ['Real-time OEE dashboards', 'Machine cycle monitoring', 'Automated Andon alerts'],
    targetView: 'software'
  },
  {
    id: 'node-robots',
    stepNumber: 6,
    name: 'INDUSTRIAL ROBOTS',
    category: 'ROBOTIC AUTOMATION & PLC',
    icon: '🤖',
    x: 83,
    y: 52,
    tagline: '6-Axis Multi-Joint Robotic Assembly Cells',
    lesson: 'Step 6: Here are the INDUSTRIAL ROBOTS! Multi-axis articulated robotic arms execute precision welding, pick-and-place, and synchronized conveyor transfers with 0.05mm repeatability alongside PLC automation.',
    specs: ['6-Axis articulated motion', '0.05mm repeatability precision', 'Direct PLC/SCADA integration'],
    targetView: 'hardware'
  },
  {
    id: 'node-scanners',
    stepNumber: 7,
    name: 'SCANNING SOLUTIONS',
    category: 'AIDC HARDWARE',
    icon: '📱',
    x: 52,
    y: 28,
    tagline: 'Ultra-Rugged 1D/2D, DPM & Handsfree Scanners',
    lesson: 'Step 7: Check out our SCANNING SOLUTIONS! ATPL deploys high-speed DPM (Direct Part Mark) scanners decoding laser-etched and dot-peen codes on curved reflective automotive metals and pharmaceutical packaging.',
    specs: ['Sub-10ms multi-code decode', 'MIL-STD-810H ultra-rugged drop', 'Multi-illumination liquid lens'],
    targetView: 'hardware'
  },
  {
    id: 'node-printers',
    stepNumber: 8,
    name: 'INDUSTRIAL PRINTING',
    category: 'PRINTING SOLUTIONS',
    icon: '🖨️',
    x: 41,
    y: 77,
    tagline: 'All-Metal 24/7 Chassis & In-Line Verifiers',
    lesson: 'Step 8: Welcome to INDUSTRIAL PRINTING! Heavy-duty industrial printers with all-metal mechanisms, dual-sensor calibration, and inline ODV barcode verifiers ensuring 100% scan-ready GS1 shipping labels.',
    specs: ['Continuous 24/7 multi-shift uptime', '600 DPI ultra-fine micro-labels', 'Integrated inline barcode verifier'],
    targetView: 'hardware'
  },
  {
    id: 'node-drones',
    stepNumber: 9,
    name: 'DRONES & REMOTE CONTROL',
    category: 'AERIAL WAREHOUSE AUDIT',
    icon: '🛸',
    x: 88,
    y: 28,
    tagline: 'Autonomous Indoor Optical SLAM Inventory Drones',
    lesson: 'Step 9: Look up at DRONES & REMOTE CONTROL! Autonomous inspection drones navigate high-bay 15-meter racking aisles without GPS, auditing thousands of pallet barcodes in minutes safely without scissor lifts.',
    specs: ['Optical SLAM indoor navigation', 'Zero-fall hazard stocktaking', 'Instant ERP discrepancy alerts'],
    targetView: 'hardware'
  },
  {
    id: 'node-dev',
    stepNumber: 10,
    name: 'SOFTWARE DEVELOPMENT',
    category: 'R&D LABS (MADURAI & CHENNAI)',
    icon: '💻',
    x: 23,
    y: 28,
    tagline: 'Cloud SaaS, Embedded IIoT Firmware & Mobile Apps',
    lesson: 'Step 10: Here is ATPL SOFTWARE DEVELOPMENT! Our in-house engineering team crafts cloud-native MES/WMS platforms, high-speed OPC-UA middleware, embedded sensor firmware, and mobile enterprise applications.',
    specs: ['35+ years combined domain mastery', 'REST, MQTT & OPC-UA native stacks', 'Custom ERP bi-directional sync'],
    targetView: 'software'
  },
  {
    id: 'node-ai',
    stepNumber: 11,
    name: 'SUPER COMPUTER AI & ML',
    category: 'EDGE AI & VISION INTELLIGENCE',
    icon: '🧠',
    x: 24,
    y: 78,
    tagline: 'Sub-8ms Optical Defect Detection & Neural Inference',
    lesson: 'Step 11: At the SUPER COMPUTER AI & ML hub! GPU-accelerated neural networks analyze gigapixel inspection images in sub-8ms, classifying microscopic surface flaws, solder bridge defects, and dimensional variances.',
    specs: ['Sub-8ms neural inference latency', '99.99% defect catch accuracy', 'Automated Pareto root-cause analytics'],
    targetView: 'software'
  },
  {
    id: 'node-erp',
    stepNumber: 12,
    name: 'ERP SOLUTIONS & SYNC',
    category: 'ENTERPRISE INTEGRATION',
    icon: '🔄',
    x: 21,
    y: 53,
    tagline: 'Bi-directional Real-Time Sync with SAP, Oracle & MS',
    lesson: 'Step 12: Completing our tour at ERP SOLUTIONS! ATPL ERP Sync certified connectors translate shopfloor machine PLC events and barcode scans into real-time SAP IDocs and Oracle BAPIs with zero data latency.',
    specs: ['Certified SAP S/4HANA & Oracle BAPIs', 'Zero-data-loss buffering memory', 'Instant shopfloor-to-boardroom visibility'],
    targetView: 'solutions'
  }
];

export const FactoryBlueprintMap = () => {
  const { openDemoModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(true);
  const [typedText, setTypedText] = useState('');
  const typingRef = useRef(null);

  const currentNode = ATPL_FACTORY_NODES[currentIndex];

  // Typing effect when station changes
  useEffect(() => {
    if (typingRef.current) clearInterval(typingRef.current);
    setTypedText('');
    let idx = 0;
    const fullText = currentNode.lesson;

    typingRef.current = setInterval(() => {
      if (idx < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(idx));
        idx++;
      } else {
        clearInterval(typingRef.current);
      }
    }, 10);

    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [currentIndex]);

  // Auto-tour timer (moves automatically every 5.5s)
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoTour]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + ATPL_FACTORY_NODES.length) % ATPL_FACTORY_NODES.length);
  };

  // Build SVG path string connecting all 12 stations in order
  const pathD = ATPL_FACTORY_NODES.map((node, i) => `${i === 0 ? 'M' : 'L'} ${node.x} ${node.y}`).join(' ');

  return (
    <section 
      id="factory-blueprint-section" 
      style={{ 
        height: 'calc(100dvh - 108px)',
        minHeight: '460px',
        maxHeight: 'calc(100dvh - 108px)',
        padding: '0.35rem 0.8rem 0.45rem 0.8rem', 
        backgroundColor: '#050c1a', 
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', height: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Full 1-Screen Interactive Stage Container */}
        <div 
          className="factory-blueprint-stage-box"
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            minHeight: 0,
            backgroundColor: '#040b18',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1.5px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.15)'
          }}
        >
          
          {/* Background Isometric Graphic (Fully Visible) */}
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

          {/* SVG Connecting Route Path Lines */}
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
            {/* Glowing Outer Route Trace */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0, 240, 255, 0.35)"
              strokeWidth="0.8"
              strokeDasharray="2, 2"
            />
            {/* Dynamic Laser Line from Robot to Current Station */}
            <line
              x1={`${currentNode.x}`}
              y1={`${currentNode.y - 7}`}
              x2={`${currentNode.x}`}
              y2={`${currentNode.y}`}
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeDasharray="1, 1"
            />
          </svg>

          {/* Responsive Mobile Styles */}
          <style>{`
            @media (max-width: 768px) {
              #factory-blueprint-section {
                height: 540px !important;
                min-height: 540px !important;
                max-height: 540px !important;
                padding: 0.25rem 0.4rem !important;
              }
              .factory-blueprint-top-hud {
                top: 6px !important;
                left: 6px !important;
                right: 6px !important;
                padding: 0.3rem 0.55rem !important;
              }
              .factory-top-title-span {
                font-size: 0.68rem !important;
              }
              .factory-pin-label-span {
                display: none !important;
              }
              .factory-pin-label-span.active {
                display: inline !important;
                font-size: 0.62rem !important;
                max-width: 90px !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
              }
              .factory-hud-bottom-overlay {
                grid-template-columns: 1fr !important;
                gap: 0.3rem !important;
                padding: 0.4rem 0.65rem !important;
                bottom: 6px !important;
                left: 6px !important;
                right: 6px !important;
                border-radius: 10px !important;
              }
              .hud-speech-paragraph {
                max-height: 38px !important;
                font-size: 0.72rem !important;
                line-height: 1.25 !important;
              }
              .hud-actions-container {
                display: flex !important;
                width: 100% !important;
                gap: 0.3rem !important;
              }
              .hud-actions-container button {
                flex: 1 !important;
                justify-content: center !important;
                padding: 0.3rem 0.4rem !important;
                font-size: 0.7rem !important;
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
              background: 'rgba(4, 11, 24, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '10px',
              padding: '0.4rem 0.85rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
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
                  <span>ATPL CONNECTED SMART FACTORY • 12-STATION ROBOT TOUR</span>
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
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoTour(false);
                  }}
                  title={`${node.stepNumber}. ${node.name}`}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: currentIndex === i ? '#E85874' : 'rgba(255, 255, 255, 0.08)',
                    border: currentIndex === i ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

          {/* 12 Clickable Hotspot Pins with Sequence Numbers */}
          {ATPL_FACTORY_NODES.map((node, index) => {
            const isActive = currentIndex === index;
            return (
              <div
                key={node.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoTour(false);
                }}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  padding: isActive ? '0.2rem 0.5rem' : '0.15rem 0.35rem',
                  background: isActive ? '#002248' : 'rgba(4, 11, 24, 0.88)',
                  border: isActive ? '2px solid #E85874' : '1px solid rgba(0, 240, 255, 0.45)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isActive ? '0 0 25px #E85874' : '0 2px 8px rgba(0,0,0,0.6)'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: isActive ? '#E85874' : '#0071ba',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  boxShadow: isActive ? '0 0 15px #E85874' : 'none'
                }}>
                  {node.stepNumber}
                </div>
                <span className={`factory-pin-label-span ${isActive ? 'active' : ''}`} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: isActive ? '#ffffff' : '#e2e8f0',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase'
                }}>
                  {node.name}
                </span>
              </div>
            );
          })}

          {/* Animated Traveling Robot Avatar */}
          <div style={{
            position: 'absolute',
            left: `${currentNode.x}%`,
            top: `${currentNode.y - 7}%`,
            transform: 'translate(-50%, -50%)',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.92) 60%, rgba(0, 240, 255, 0.5) 100%)',
            border: '2px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 35px #00f0ff, 0 0 20px rgba(232, 88, 116, 0.6)',
            zIndex: 30,
            pointerEvents: 'none',
            transition: 'all 1.0s cubic-bezier(0.25, 1, 0.5, 1)'
          }}>
            <AtplRobotAvatar size={45} />
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

          {/* BOTTOM HUD DIALOGUE CONSOLE (Inside Stage - 100% Unclipped description & Clean Controls) */}
          <div 
            className="factory-hud-bottom-overlay"
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '10px',
              right: '10px',
              zIndex: 35,
              background: 'rgba(4, 11, 24, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(0, 240, 255, 0.45)',
              borderRadius: '12px',
              padding: '0.45rem 0.95rem',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 240, 255, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '0.85rem',
              alignItems: 'center'
            }}
          >
            
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
                <strong style={{ color: '#ffffff', fontSize: '0.82rem', display: 'block', letterSpacing: '0.01em' }}>ATPL Robot Guide:</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase' }}>
                  STOP {currentIndex + 1}/12 • {currentNode.category}
                </span>
              </div>
            </div>

            {/* Live Lesson Speech (Unclipped, Full Description Visibility) */}
            <div style={{ minWidth: 0, paddingRight: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.1rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '0.88rem', color: '#ffffff', margin: 0, fontWeight: 900, letterSpacing: '0.02em' }}>
                  {currentNode.name}
                </h3>
                <span style={{ color: '#E85874', fontSize: '0.72rem', fontWeight: 700 }}>
                  • {currentNode.tagline}
                </span>
              </div>
              <p className="hud-speech-paragraph" style={{ 
                fontSize: '0.80rem', 
                color: '#e2e8f0', 
                lineHeight: 1.35, 
                margin: 0,
                maxHeight: '48px',
                overflowY: 'auto'
              }}>
                {typedText}
              </p>
            </div>

            {/* Action Navigation Controls */}
            <div className="hud-actions-container" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexShrink: 0 }}>
              <button
                onClick={handlePrev}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.32rem 0.65rem',
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
              >
                <ChevronLeft size={13} />
                <span>Prev</span>
              </button>

              <button
                onClick={handleNext}
                style={{
                  background: '#0071ba',
                  border: '1px solid #00f0ff',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.32rem 0.75rem',
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
              >
                <span>Next</span>
                <ChevronRight size={13} />
              </button>

              <button
                onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry for ${currentNode.name} from Factory Blueprint map.` })}
                style={{
                  backgroundColor: '#E85874',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.32rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(232, 88, 116, 0.4)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d44360'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E85874'}
              >
                Demo
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
