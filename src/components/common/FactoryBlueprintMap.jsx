import React, { useState, useEffect, useRef } from 'react';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.jpg';
import { AtplLogo } from './AtplLogo';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { 
  Bot, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Compass,
  Navigation,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ATPL_FACTORY_NODES = [
  {
    id: 'node-trace',
    stepNumber: 1,
    name: 'PERFECT TRACE™',
    category: 'SERIALIZATION & AGGREGATION',
    icon: '🔍',
    x: 77, // Percentage X on factory graphic
    y: 78, // Percentage Y on factory graphic
    tagline: 'GS1 Serialization & Anti-Counterfeit Packaging',
    lesson: 'Step 1: Here is PERFECT TRACE! Our software assigns parent-child serialization (Item -> Pack -> Case -> Pallet). Every manufactured unit receives cryptographic verification to prevent counterfeit leakage and ensure 100% DGFT/DSCSA regulatory compliance.',
    specs: ['Multi-level Parent-Child aggregation', '1-Click recall traceability', 'DGFT & EU-FMD compliant', 'Cryptographic QR verification'],
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
    lesson: 'Step 2: Welcome to PERFECT AUDIT! This digital audit platform completely eliminates paper checklists. Quality inspectors record photo evidence, execute automated CAPA corrective workflows, and sign with 21 CFR Part 11 compliant digital signatures.',
    specs: ['100% paperless digital checklists', 'Photo & geolocation evidence capture', 'Automated CAPA routing', '21 CFR Part 11 compliance'],
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
    lesson: 'Step 3: Now visiting PERFECT WAREHOUSE! This enterprise WMS manages automated 3D bin allocation, dynamic slotting, FIFO/FEFO picking optimization, and synchronizes bi-directionally with SAP, Oracle, and Microsoft Dynamics.',
    specs: ['3D bin & rack heatmap mapping', 'Automated pallet & carton tagging', 'Dynamic FIFO/FEFO slotting', 'Native SAP/Oracle ERP sync'],
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
    lesson: 'Step 4: At the RFID ANTENNA station! Fixed multi-directional UHF portals capture 1,200+ pallet and carton tags in milliseconds as forklifts drive through warehouse bays with 99.98% inventory accuracy.',
    specs: ['1,200+ tags/sec dense read rate', 'Up to 15m capture range', 'Directional dock-door sensing', 'On-metal & high-temp tag endurance'],
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
    specs: ['Real-time OEE gauge dashboards', 'Machine uptime & cycle monitoring', 'Automated Andon alerts', 'Operator shift productivity reports'],
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
    specs: ['6-Axis articulated motion', '0.05mm repeatability precision', 'Integrated safety light curtains', 'Direct PLC/SCADA integration'],
    targetView: 'hardware'
  },
  {
    id: 'node-scanning',
    stepNumber: 7,
    name: 'SCANNING SOLUTIONS',
    category: '1D/2D BARCODE IMAGERS',
    icon: '⚡',
    x: 55,
    y: 22,
    tagline: 'Industrial Fixed-Mount & Rugged Handhelds',
    lesson: 'Step 7: Visiting SCANNING SOLUTIONS! Our liquid-lens industrial barcode scanners decode damaged, low-contrast, or direct part marked (DPM) codes at conveyor speeds up to 6 m/s.',
    specs: ['High-speed 60 scans/sec decoding', 'Direct Part Marking (DPM) decoding', 'IP67 waterproof & dust sealed', '3-Meter concrete drop durability'],
    targetView: 'hardware'
  },
  {
    id: 'node-printing',
    stepNumber: 8,
    name: 'INDUSTRIAL PRINTING SOLUTIONS',
    category: 'INDUSTRIAL THERMAL PRINTERS',
    icon: '🖨️',
    x: 40,
    y: 76,
    tagline: 'Heavy-Duty Thermal Transfer & RFID Encoders',
    lesson: 'Step 8: At INDUSTRIAL PRINTING! Heavy-duty 24/7 barcode printers produce 600 DPI micro-labels and simultaneously encode UHF RFID chips with integrated print-and-apply automated robotic arms.',
    specs: ['600 DPI high-resolution printing', 'Simultaneous RFID encoding', 'Automated print-and-apply arms', 'Continuous 24/7 metal chassis'],
    targetView: 'hardware'
  },
  {
    id: 'node-drones',
    stepNumber: 9,
    name: 'DRONES & REMOTE CONTROL',
    category: 'AUTONOMOUS INSPECTION',
    icon: '🛸',
    x: 91,
    y: 24,
    tagline: 'High-Altitude Warehouse Inventory Scanning',
    lesson: 'Step 9: Visiting DRONES & REMOTE CONTROL! Autonomous warehouse drones navigate along high-bay racking aisles, scanning upper-tier pallet barcodes to conduct rapid, paperless aerial stocktaking in minutes.',
    specs: ['Autonomous indoor optical navigation', 'High-bay rack barcode scanning', 'Reduces stocktake time by 80%', 'Live WMS inventory sync'],
    targetView: 'hardware'
  },
  {
    id: 'node-software',
    stepNumber: 10,
    name: 'SOFTWARE DEVELOPMENT',
    category: 'INTEGRATED CLOUD SOLUTIONS',
    icon: '💻',
    x: 18,
    y: 16,
    tagline: 'Enterprise Cloud Architecture & APIs',
    lesson: 'Step 10: At SOFTWARE DEVELOPMENT! Our software team builds custom application-based platforms and cloud microservices that synchronize all plant hardware, PLCs, and ERP platforms seamlessly.',
    specs: ['Cloud microservices architecture', 'REST & GraphQL industrial APIs', 'Sub-second data latency', 'Enterprise cybersecurity'],
    targetView: 'software'
  },
  {
    id: 'node-aiml',
    stepNumber: 11,
    name: 'SUPER COMPUTER AI & ML',
    category: 'ARTIFICIAL INTELLIGENCE & COMPUTER VISION',
    icon: '🧠',
    x: 18,
    y: 75,
    tagline: 'Deep Learning Vision & Predictive Analytics',
    lesson: 'Step 11: Here is SUPER COMPUTER AI & ML! Deep neural networks analyze high-speed machine vision streams to detect micro-defects down to 5 microns and forecast machine maintenance before downtime occurs.',
    specs: ['Deep learning optical inspection', '< 5 Micron defect resolution', 'Predictive maintenance forecasting', 'Edge AI tensor acceleration'],
    targetView: 'software'
  },
  {
    id: 'node-erp',
    stepNumber: 12,
    name: 'ERP SOLUTIONS',
    category: 'ENTERPRISE RESOURCE PLANNING',
    icon: '🏢',
    x: 12,
    y: 44,
    tagline: 'Two-Way Sync with SAP, Oracle & Dynamics',
    lesson: 'Step 12: Finally, ERP SOLUTIONS! We bridge shop-floor production events directly into top-tier ERPs like SAP S/4HANA, Oracle Cloud, and Microsoft Dynamics for real-time inventory and financial reconciliation.',
    specs: ['Native SAP S/4HANA connector', 'Oracle Cloud & NetSuite sync', 'Real-time BOM work order updates', 'Automated goods receipt posting'],
    targetView: 'software'
  }
];

export const FactoryBlueprintMap = () => {
  const { openDemoModal, setCurrentView } = useApp();
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
    }, 12);

    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [currentIndex]);

  // Auto-tour timer (moves step-by-step automatically along the factory route)
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ATPL_FACTORY_NODES.length);
    }, 6000);
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
    <section id="factory-blueprint-section" style={{ padding: '1rem 0 2rem 0', backgroundColor: '#060e1e', color: '#ffffff', borderTop: '1px solid rgba(0, 240, 255, 0.2)' }}>
      <div className="container">
        
        {/* Sleek Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 1rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(0, 240, 255, 0.12)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            color: '#00f0ff',
            padding: '0.25rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.76rem',
            fontWeight: 700,
            marginBottom: '0.45rem'
          }}>
            <Navigation size={13} />
            <span>INTERACTIVE SMART FACTORY ROUTE & ROBOT TOUR</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Watch the <span className="gradient-text">ATPL AI Robot Tour Live</span> (12 Product Stations)
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.4, margin: '0 auto', maxWidth: '750px' }}>
            The autonomous robot navigates across all manufacturing & warehouse stations in real-time. Click any station below to inspect live capabilities.
          </p>
        </div>

        {/* Blueprint Container Box */}
        <div style={{
          background: 'radial-gradient(circle at center, #0a1f3d 0%, #030a16 100%)',
          border: '1.5px solid rgba(0, 240, 255, 0.45)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 240, 255, 0.2)',
          padding: '1rem'
        }}>
          
          {/* Blueprint Top Navigation Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.85rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '10px',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="pulse-dot"></span>
              <strong style={{ color: '#ffffff', fontSize: '0.9rem', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} color="#00f0ff" />
                <span>ATPL CONNECTED SMART FACTORY ROUTE</span>
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setIsAutoTour(!isAutoTour)}
                style={{
                  background: isAutoTour ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  border: isAutoTour ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: isAutoTour ? '#34d399' : '#cbd5e1',
                  borderRadius: '8px',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: isAutoTour ? '0 0 15px rgba(16, 185, 129, 0.35)' : 'none'
                }}
              >
                {isAutoTour ? <Pause size={13} /> : <Play size={13} />}
                <span>{isAutoTour ? 'Pause Robot Tour' : 'Resume Auto Tour'}</span>
              </button>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>
                STATION {currentIndex + 1} OF 12
              </div>
            </div>
          </div>

          {/* Blueprint Stage Map with SVG Route & Moving Robot */}
          <div 
            className="factory-blueprint-stage"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: '#051329',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.95)'
            }}
          >
            
            {/* Background Isometric Factory Graphic */}
            <img 
              src={blueprintImg} 
              alt="ATPL Isometric Factory Blueprint"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* SVG Connecting Route Path Lines */}
            {/* SVG Connecting Route Path Lines & Center Logo Pedestal */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 12,
                pointerEvents: 'none'
              }}
            >
              <defs>
                <radialGradient id="pedestalCapGrad" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f8fafc" />
                  <stop offset="90%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </radialGradient>
                <filter id="pedestalDropGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Outer Route Trace */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(0, 240, 255, 0.4)"
                strokeWidth="0.8"
                strokeDasharray="2, 2"
              />
              {/* Dynamic Laser Line from Robot to Current Station */}
              <line
                x1={`${currentNode.x}`}
                y1={`${currentNode.y - 8}`}
                x2={`${currentNode.x}`}
                y2={`${currentNode.y}`}
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeDasharray="1, 1"
              />

            </svg>

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
                    gap: '0.45rem',
                    cursor: 'pointer',
                    zIndex: 15,
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    padding: '0.35rem 0.75rem',
                    background: isActive ? '#002248' : 'rgba(6, 14, 30, 0.88)',
                    border: isActive ? '2px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.45)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: isActive ? '0 0 30px #00f0ff' : '0 2px 8px rgba(0,0,0,0.6)'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isActive ? '#00f0ff' : '#2ba5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    color: '#040914',
                    boxShadow: isActive ? '0 0 15px #00f0ff' : 'none'
                  }}>
                    {node.stepNumber}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: isActive ? '#00f0ff' : '#ffffff',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase'
                  }}>
                    {node.name}
                  </span>
                </div>
              );
            })}

            {/* Animated Traveling Robot Avatar - Custom ATPL Robot with Glowing Cyan Eyes & Chest Logo */}
            <div style={{
              position: 'absolute',
              left: `${currentNode.x}%`,
              top: `${currentNode.y - 8}%`,
              transform: 'translate(-50%, -50%)',
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.9) 60%, rgba(0, 240, 255, 0.45) 100%)',
              border: '2.5px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px #00f0ff, 0 0 15px rgba(232, 88, 116, 0.5)',
              zIndex: 30,
              pointerEvents: 'none',
              transition: 'all 1.1s cubic-bezier(0.25, 1, 0.5, 1)'
            }}>
              <AtplRobotAvatar size={58} />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                width: '18px',
                height: '18px',
                background: '#00f0ff',
                borderRadius: '50%',
                boxShadow: '0 0 20px #00f0ff',
                animation: 'pulseCoralDot 1.5s infinite ease-in-out'
              }}></div>
            </div>

          </div>

          {/* Robot Teaching Dialogue Console */}
          <div 
            className="factory-bottom-dialog"
            style={{
              marginTop: '1rem',
              background: 'rgba(6, 15, 34, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(0, 240, 255, 0.45)',
              borderRadius: '16px',
              padding: '1.1rem 1.4rem',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.15)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1.25rem',
              alignItems: 'center'
            }}
          >
            
            {/* Robot Avatar Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 0%, #e0f2fe 70%, #0071ba 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #00f0ff',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), 0 0 10px rgba(232, 88, 116, 0.4)',
                flexShrink: 0
              }}>
                <AtplRobotAvatar size={40} />
              </div>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>ATPL Traveling Robot:</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>
                  STOP {currentNode.stepNumber} OF 12 • {currentNode.category}
                </span>
              </div>
            </div>

            {/* Lesson Text */}
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '0 0 0.2rem 0', fontWeight: 800 }}>
                {currentNode.name}
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.45, margin: 0, minHeight: '36px' }}>
                {typedText}
              </p>
            </div>

            {/* Controls */}
            <div className="factory-dialog-controls" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handlePrev}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
              >
                <ChevronLeft size={15} />
                <span>Prev</span>
              </button>

              <button
                onClick={handleNext}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
              >
                <span>Next Station</span>
                <ChevronRight size={15} />
              </button>

              <button
                onClick={() => openDemoModal({ solution: currentNode.name, notes: `Inquiry for ${currentNode.name} from Factory Blueprint map.` })}
                className="btn btn-cyan btn-sm"
                style={{ whiteSpace: 'nowrap', padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
              >
                Request Demo
              </button>
            </div>

          </div>

          {/* Quick Node Route Step Selector Pills */}
          <div 
            className="factory-pills-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.45rem',
              marginTop: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {ATPL_FACTORY_NODES.map((node, i) => (
              <button
                key={node.id}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoTour(false);
                }}
                style={{
                  background: currentIndex === i ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: currentIndex === i ? 'var(--cyan-primary)' : '#94a3b8',
                  border: currentIndex === i ? '1px solid var(--cyan-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: currentIndex === i ? 800 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: currentIndex === i ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                {node.stepNumber}. {node.name}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
