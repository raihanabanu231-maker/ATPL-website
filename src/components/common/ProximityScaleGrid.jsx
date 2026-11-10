import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Radio,
  ArrowRight,
  X,
  Building2,
  Activity,
  Layers,
  Award,
  Zap
} from 'lucide-react';

export const ATPL_VALUES_ITEMS = [
  {
    id: 'client-ola',
    category: 'Automotive & EV',
    categoryTag: '⚡ EV MOBILITY',
    title: 'Ola Electric',
    keyword: 'BATTERY SERIALIZATION',
    sub: 'FutureFactory Tamil Nadu',
    scope: 'Cell-to-Pack Traceability & AIS-156 Compliance',
    desc: 'Cell-to-pack DPM laser serialization and 2-minute shift resource allocation for mega-factory EV lines.',
    tech: 'Direct Part Mark (DPM) Laser Imagers + PERFECT TRACE & PMS',
    metrics: [
      { label: 'Allocation Speed', val: '2 Min (from 2h)' },
      { label: 'Battery Packs', val: '100% Serialized' },
      { label: 'Standard', val: 'AIS-156 Compliant' }
    ],
    color: '#00d26a',
    icon: '/assets/images/clients/ola-electric.svg'
  },
  {
    id: 'client-apollo',
    category: 'Automotive & EV',
    categoryTag: '🚗 TYRES & AUTO',
    title: 'Apollo Tyres',
    keyword: '+50% DISPATCH ACCURACY',
    sub: 'Tire Curing & WMS Hubs',
    scope: 'Automated RAIN RFID Portals & High-Speed Verification',
    desc: 'Automated RAIN RFID overhead tunnel portals and inline barcode verifiers across high-speed tyre dispatch.',
    tech: 'Multi-Antenna Overhead RFID Tunnels + SAP S/4HANA Middleware',
    metrics: [
      { label: 'Dispatch Accuracy', val: '+50% Boost' },
      { label: 'Portal Speed', val: 'Conveyor Velocity' },
      { label: 'ERP Sync', val: 'Direct SAP S/4' }
    ],
    color: '#a855f7',
    icon: '/assets/images/clients/apollo-tyres.svg'
  },
  {
    id: 'client-lt',
    category: 'Defense & Heavy Engg',
    categoryTag: '🏗️ HEAVY FABRICATION',
    title: 'Larsen & Toubro',
    keyword: '15M YARD SCANNING',
    sub: 'Heavy Engg & Defense Fab',
    scope: 'Long-Range Outdoor Yard Heavy Asset Tracking',
    desc: 'Long-range outdoor yard scanning across 50,000+ heavy fabricated assemblies with direct SAP sync.',
    tech: 'Industrial Long-Range Imagers + Weatherproof Mil-Spec Tags',
    metrics: [
      { label: 'Read Range', val: 'Up to 15 Meters' },
      { label: 'Asset Volume', val: '50,000+ Fabrications' },
      { label: 'Yard Audits', val: 'Real-Time Sync' }
    ],
    color: '#38bdf8',
    icon: '/assets/images/clients/larsen-toubro.svg'
  },
  {
    id: 'client-hul',
    category: 'FMCG & Packaging',
    categoryTag: '📦 FMCG PACKAGING',
    title: 'Hindustan Unilever',
    keyword: '300 CARTONS / MIN',
    sub: 'High-Speed Packaging Lines',
    scope: 'High-Speed Machine Vision Quality & Inline Pneumatics',
    desc: 'Fixed-mount machine vision cameras grading GS1 DataMatrix codes with 4ms pneumatic rejection.',
    tech: 'High-Resolution Fixed Vision Cameras + 4ms High-Speed Diverters',
    metrics: [
      { label: 'Throughput', val: '300 Cartons/Min' },
      { label: 'Gate Response', val: '4 Milliseconds' },
      { label: 'Verification', val: 'GS1 DataMatrix' }
    ],
    color: '#00f0ff',
    icon: '/assets/images/clients/hindustan-unilever.svg'
  },
  {
    id: 'client-proconnect',
    category: 'Supply Chain & Ports',
    categoryTag: '🚚 3PL LOGISTICS',
    title: 'Proconnect Logistics',
    keyword: '3.5× DOCK SPEEDUP',
    sub: 'Omnichannel 3PL Hubs (Redington)',
    scope: 'High-Density Cross-Docking & Distribution WMS',
    desc: 'High-density Android mobile scanners and PERFECT WAREHOUSE cross-docking for Redington fulfillment.',
    tech: 'Rugged Mobile Computers + PERFECT WAREHOUSE Execution',
    metrics: [
      { label: 'Dock Turnaround', val: '3.5× Faster' },
      { label: 'Pick Accuracy', val: '99.98%' },
      { label: 'Active SKUs', val: '45,000+ Managed' }
    ],
    color: '#38bdf8',
    icon: '/assets/images/clients/proconnect-logistics.svg'
  },
  {
    id: 'client-pegatron',
    category: 'Automotive & EV',
    categoryTag: '⚡ HIGH-TECH EMS',
    title: 'Pegatron Electronics',
    keyword: '99.99% FIRST-PASS READ',
    sub: 'High-Density SMT Lines',
    scope: 'Sub-Second Micro-QR Verification on Circuit Boards',
    desc: 'Ultra-high-speed PCB optical inspection and micro GS1 DataMatrix component tracking.',
    tech: 'PERFECT VERIFIER + Cognitive Area Imagining Vision',
    metrics: [
      { label: 'First-Pass Rate', val: '99.99% Read Rate' },
      { label: 'Code Geometry', val: '2mm Micro-QR' },
      { label: 'Quality Standard', val: 'ISO/IEC 15415' }
    ],
    color: '#00f0ff',
    icon: '/assets/images/clients/pegatron-electronics.svg'
  },
  {
    id: 'client-bel',
    category: 'Defense & Heavy Engg',
    categoryTag: '🛡️ DEFENSE & RADAR',
    title: 'Bharat Electronics',
    keyword: 'DEFENSE MIL-STD',
    sub: 'Aerospace & Radar Systems (BEL)',
    scope: 'Direct Part Mark Serialization conforming to MIL-STD-130',
    desc: 'Ultra-rugged DPM laser marking and traceability hardware for defense and radar manufacturing.',
    tech: 'Ultra-Rugged Fiber Laser Marking + Mil-Std Optical Scanners',
    metrics: [
      { label: 'Defense Standard', val: 'MIL-STD-130' },
      { label: 'Durability', val: 'Harsh Environment' },
      { label: 'Audit Trail', val: 'Tamper-Evident' }
    ],
    color: '#818cf8',
    icon: '/assets/images/clients/bel-bharat-electronics.svg'
  },
  {
    id: 'client-dixon',
    category: 'Defense & Heavy Engg',
    categoryTag: '📱 CONSUMER EMS',
    title: 'Dixon Technologies',
    keyword: '1,500+ MDM TERMINALS',
    sub: 'Consumer Electronics EMS Plants',
    scope: 'Zero-Touch Provisioning & Factory Kiosk Lockdown',
    desc: 'Zero-touch QR provisioning and remote kiosk lockdown for mobile scanners across nationwide factories.',
    tech: 'Mobile Device Management (MDM) + Custom Android Lockdown Kiosk',
    metrics: [
      { label: 'Fleet Size', val: '1,500+ Terminals' },
      { label: 'Provisioning', val: 'Zero-Touch QR' },
      { label: 'Uptime SLA', val: '99.95%' }
    ],
    color: '#f59e0b',
    icon: '/assets/images/clients/dixon-technologies.svg'
  },
  {
    id: 'client-gmr',
    category: 'Supply Chain & Ports',
    categoryTag: '✈️ AVIATION HUBS',
    title: 'GMR Airports',
    keyword: 'BAGGAGE RFID PORTALS',
    sub: 'Delhi, Hyderabad & Goa',
    scope: 'High-Velocity IATA-753 Baggage Inbound & Outbound Portals',
    desc: 'High-velocity IATA compliant baggage tracking RFID portals deployed at premier international airports.',
    tech: 'High-Density RAIN RFID Readers + High-Speed Sorting Interlocks',
    metrics: [
      { label: 'Compliance', val: 'IATA Resolution 753' },
      { label: 'Throughput', val: 'Continuous Flight Run' },
      { label: 'Airports', val: 'DEL, HYD, GOX' }
    ],
    color: '#06b6d4',
    icon: '/assets/images/clients/gmr-airports.svg'
  },
  {
    id: 'client-arcelormittal',
    category: 'Defense & Heavy Engg',
    categoryTag: '🔥 FOUNDRY & MILLS',
    title: 'ArcelorMittal',
    keyword: 'STEEL MILL WMS',
    sub: 'Heavy Metals Foundry Yard',
    scope: 'Extreme Temperature & Vibration-Resistant Barcode Verification',
    desc: 'Extreme-duty asset verification surviving harsh outdoor temperature, foundry vibration, and slag dust.',
    tech: 'IP67 Ruggedized Imagers + Heat-Resistant Ceramic Tags',
    metrics: [
      { label: 'Rating', val: 'IP67 Heavy-Duty' },
      { label: 'Operating Temp', val: 'Extreme Foundry' },
      { label: 'Verification', val: 'Coil & Billet WIP' }
    ],
    color: '#ec4899',
    icon: '/assets/images/clients/arcelormittal.svg'
  },
  {
    id: 'client-caplin',
    category: 'Pharma & Precision',
    categoryTag: '💊 PHARMA INJECTABLES',
    title: 'Caplin Steriles',
    keyword: 'US-FDA 21 CFR',
    sub: 'Pharma Injectables USA Exports',
    scope: 'DGFT Export Serialization & Zero-Paper Compliant Audit Trails',
    desc: 'DGFT export serialization, tamper-evident labeling, and zero-paper compliant audit trails.',
    tech: 'High-Speed Thermal Printers + 21 CFR Part 11 Audit Software',
    metrics: [
      { label: 'Audit Standard', val: '21 CFR Part 11' },
      { label: 'Export Body', val: 'US-FDA / DGFT' },
      { label: 'Traceability', val: 'Vial-Level Serial' }
    ],
    color: '#10b981',
    icon: '/assets/images/clients/caplin-steriles.svg'
  },
  {
    id: 'client-abb',
    category: 'Defense & Heavy Engg',
    categoryTag: '🤖 ROBOTICS & DRIVES',
    title: 'ABB Robotics',
    keyword: 'ROBOTIC TRACEABILITY',
    sub: 'Robotics & Automation Plant',
    scope: 'Sub-Assembly Component Line Interlocks & MES Gateways',
    desc: 'Precision optical verification of robotic drive components with automated production line interlocks.',
    tech: 'Cognitive 2D Imagers + Direct PLC / MES Industrial Protocol Gateways',
    metrics: [
      { label: 'Line Interlock', val: 'Zero-Defect Escape' },
      { label: 'Interface', val: 'Direct PLC / MES' },
      { label: 'Inspection', val: 'Sub-Assembly 2D' }
    ],
    color: '#ef4444',
    icon: '/assets/images/clients/abb.svg'
  }
];

export const ProximityScaleGrid = ({
  title = 'Enterprise Deployments & Production Milestones',
  subtitle = 'Explore premier manufacturing and logistics deployments across India. Highlighting audited ROI keywords and live production metrics.',
  items = ATPL_VALUES_ITEMS
}) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [radarActive, setRadarActive] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const isHoveringRef = useRef(false);
  const radarTimerRef = useRef(null);

  // Industry Categories for rapid filtering
  const categories = useMemo(() => [
    'All',
    'Automotive & EV',
    'FMCG & Packaging',
    'Defense & Heavy Engg',
    'Supply Chain & Ports',
    'Pharma & Precision'
  ], []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter(
      (it) => it.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [items, activeCategory]);

  // Automated Radar Sweep (cycles smoothly without jarring scale explosions)
  useEffect(() => {
    if (!radarActive || filteredItems.length === 0) return;

    const runRadar = () => {
      if (!isHoveringRef.current) {
        setSpotlightIndex((prev) => (prev + 1) % filteredItems.length);
      }
      radarTimerRef.current = setTimeout(runRadar, 3000);
    };

    radarTimerRef.current = setTimeout(runRadar, 3000);

    return () => {
      if (radarTimerRef.current) clearTimeout(radarTimerRef.current);
    };
  }, [radarActive, filteredItems.length]);

  // Handle subtle cursor proximity effect
  const handleMouseMove = (e) => {
    isHoveringRef.current = true;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Apply smooth, contained micro-movement & lighting
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cRect = card.getBoundingClientRect();
      const cardCenterX = cRect.left - rect.left + cRect.width / 2;
      const cardCenterY = cRect.top - rect.top + cRect.height / 2;
      const dist = Math.hypot(mouseX - cardCenterX, mouseY - cardCenterY);

      // Subtle scale up to 1.03x within 240px, never overlaps neighbors
      const radius = 240;
      const proximity = Math.max(0, 1 - dist / radius);

      gsap.to(card, {
        scale: 1 + proximity * 0.03,
        y: -proximity * 4,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(8, 14, 28, 0.96) 0%, rgba(11, 20, 38, 0.98) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.18)',
        borderRadius: '24px',
        padding: '3rem 2rem 3.5rem 2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '25%',
          width: '550px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '20%',
          width: '500px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Top Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.25rem auto', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#00f0ff',
            marginBottom: '0.85rem'
          }}
        >
          <Sparkles size={13} />
          <span>ENTERPRISE PRODUCTION DEPLOYMENTS // LIVE RADAR</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 0.65rem 0'
          }}
        >
          {title}
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          {subtitle}
        </p>
      </div>

      {/* Control Bar: Category Filters & Radar Indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto 2rem auto',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 2
        }}
      >
        {/* Industry Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isSelected ? 'rgba(0, 240, 255, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isSelected ? '#00f0ff' : 'rgba(255, 255, 255, 0.12)'}`,
                  color: isSelected ? '#00f0ff' : '#94a3b8',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 14px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                {cat === 'All' ? `All Clients (${items.length})` : cat}
              </button>
            );
          })}
        </div>

        {/* Live Radar Status Chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setRadarActive(!radarActive)}
            style={{
              background: radarActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${radarActive ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
              color: radarActive ? '#10b981' : '#94a3b8',
              padding: '0.38rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.25s ease'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: radarActive ? '#10b981' : '#64748b',
                boxShadow: radarActive ? '0 0 8px #10b981' : 'none'
              }}
            />
            <span>{radarActive ? 'Radar Sweep: LIVE' : 'Radar Sweep: PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Structured Glassmorphic Bento Grid */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))',
          gap: '1.35rem',
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          zIndex: 2
        }}
      >
        {filteredItems.map((item, idx) => {
          const isSpotlight = radarActive && spotlightIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => setSelectedItem(item)}
              style={{
                position: 'relative',
                background: isSpotlight
                  ? 'linear-gradient(145deg, rgba(16, 28, 54, 0.95) 0%, rgba(20, 36, 70, 0.9) 100%)'
                  : 'linear-gradient(145deg, rgba(13, 22, 42, 0.85) 0%, rgba(17, 28, 54, 0.75) 100%)',
                border: isSpotlight
                  ? `1.5px solid ${item.color}`
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '1.4rem',
                backdropFilter: 'blur(16px)',
                boxShadow: isSpotlight
                  ? `0 14px 40px rgba(0, 0, 0, 0.65), 0 0 28px ${item.color}35`
                  : '0 8px 24px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                overflow: 'hidden'
              }}
            >
              {/* Dynamic top ambient glow on spotlight */}
              {isSpotlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`
                  }}
                />
              )}

              {/* Card Top Row: Client Logo & Industry Badge */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  {/* Clean High-Res Brand Logo Container */}
                  <div
                    style={{
                      width: '68px',
                      height: '44px',
                      backgroundColor: '#ffffff',
                      borderRadius: '10px',
                      padding: '5px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                      border: '1px solid rgba(255, 255, 255, 0.85)'
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Industry Category Tag */}
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}35`,
                      padding: '0.22rem 0.55rem',
                      borderRadius: '6px'
                    }}
                  >
                    {item.categoryTag}
                  </span>
                </div>

                {/* Client Name */}
                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: '0 0 0.25rem 0',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.title}
                </h3>

                {/* Facility / Deployment Scope */}
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    fontWeight: 500,
                    marginBottom: '0.85rem'
                  }}
                >
                  {item.sub}
                </div>

                {/* High-Impact ROI Keyword Badge */}
                <div style={{ marginBottom: '0.9rem' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.66rem',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      backgroundColor: `${item.color}1c`,
                      color: item.color,
                      border: `1.5px solid ${item.color}66`,
                      boxShadow: isSpotlight ? `0 0 16px ${item.color}45` : `0 0 8px ${item.color}20`
                    }}
                  >
                    {item.keyword}
                  </span>
                </div>

                {/* Deployment Description */}
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.82rem',
                    lineHeight: 1.55,
                    margin: '0 0 1.15rem 0'
                  }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Card Footer: Hardware/Software Tech Tag & Inspect Arrow */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Cpu size={12} color={item.color} />
                  <span>Deployment Architecture</span>
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: item.color
                  }}
                >
                  <span>Specs</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Bottom Info Bar */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          zIndex: 2
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <ShieldCheck size={14} color="#00f0ff" />
          <span>All metrics validated from live industrial installations across India,</span>
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#00f0ff',
            fontWeight: 700
          }}
        >
          Click any card to inspect full technical case study
        </span>
      </div>

      {/* Deep-Dive Case Study Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.82)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 99999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#0c1428',
              border: `1.5px solid ${selectedItem.color}`,
              borderRadius: '24px',
              padding: '2.2rem',
              boxShadow: `0 25px 65px rgba(0, 0, 0, 0.9), 0 0 35px ${selectedItem.color}35`,
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '74px',
                  height: '50px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
                }}
              >
                <img
                  src={selectedItem.icon}
                  alt={selectedItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: selectedItem.color
                  }}
                >
                  {selectedItem.categoryTag}
                </span>
                <h3
                  style={{
                    fontSize: '1.45rem',
                    color: '#ffffff',
                    fontWeight: 800,
                    margin: '0.2rem 0',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {selectedItem.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{selectedItem.sub}</div>
              </div>
            </div>

            {/* Scope & Verified Key Impact */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: selectedItem.color,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem'
                }}
              >
                DEPLOYMENT SCOPE &amp; CORE MILESTONE
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {selectedItem.scope}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                {selectedItem.desc}
              </p>
            </div>

            {/* Technical Stack Deployed */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem'
                }}
              >
                ATPL SYSTEMS &amp; HARDWARE ARCHITECTURE
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.86rem', fontWeight: 600 }}>
                {selectedItem.tech}
              </div>
            </div>

            {/* 3 Metric Pills */}
            {selectedItem.metrics && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {selectedItem.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${selectedItem.color}35`,
                      borderRadius: '12px',
                      padding: '0.75rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: selectedItem.color }}>
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Close View
              </button>

              <button
                onClick={() => {
                  setSelectedItem(null);
                  const contactSection = document.getElementById('contact-form') || document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = '#contact';
                  }
                }}
                style={{
                  flex: 1.3,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${selectedItem.color}, #0284c7)`,
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: `0 4px 18px ${selectedItem.color}45`
                }}
              >
                <span>Request Case Blueprint</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
