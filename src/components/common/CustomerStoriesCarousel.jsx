import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Quote, 
  Warehouse, 
  Zap, 
  Radio, 
  Play, 
  Pause 
} from 'lucide-react';

// ============================================================================
// AUTHENTIC ATPL ENTERPRISE CUSTOMER STORIES (VERIFIED DATASET)
// ============================================================================
const STACKED_CUSTOMER_STORIES = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    sector: 'EV Two-Wheeler Mega-Factory',
    facility: 'FutureFactory EV Hub (Tamil Nadu)',
    tabStatement: 'Enterprise intelligence runs on core shopfloor systems',
    tabProduct: 'PERFECT TRACE™',
    tabIcon: 'cloud',
    tierBadge: 'EV MEGA-FACTORY // TAMIL NADU',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    logoBg: '#ffffff',
    headline: 'Slashing battery pack resource allocation from 2 hours to 2 minutes',
    subheadline: 'Sub-second cell-to-pack serialization and continuous AIS-156 fire compliance.',
    summary: 'Integrated industrial Direct Part Mark (DPM) cognitive laser imagers and high-density mobile terminals to serialize battery cells and track assembly in real time across 250,000+ EV scooters.',
    challenge: 'Scaling to thousands of electric two-wheelers daily required millisecond traceability of powertrain sub-assemblies and battery modules to guarantee mandatory AIS-156 fire & safety certification with zero assembly escapes.',
    solution: 'ATPL engineered Direct Part Mark (DPM) cognitive area imagers paired with ATPL PERFECT TRACE and MES work-in-progress software syncing in 12ms with pneumatic defect gates.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Direct compliance with AIS-156 EV safety standards across 250,000+ scooters',
      'Zero assembly fitment escapes into active finished-goods staging'
    ],
    primaryMetric: {
      value: '2 Min',
      label: 'Allocation Speed',
      subtext: 'Down from 2 hours manual shift lag'
    },
    secondaryMetric: {
      value: '100%',
      label: 'AIS-156 Compliance',
      subtext: 'Cell-level genealogy audit proof'
    },
    quote: {
      text: 'ATPL integrated Direct Part Mark cognitive laser imagers and Perfect Trace to sync live battery cell telemetry to MES assembly stations in 12ms with zero escape.',
      author: 'Operations & Powertrain Leadership',
      role: 'EV Powertrain & Pack Gigafactory'
    },
    techStack: ['ATPL PERFECT TRACE™', 'Cognitive DPM Laser Imagers', 'Rugged Android Terminals', 'MES 12ms Sync API'],
    image: '/assets/images/hw_electronics_qc.jpg',
    theme: {
      gradient: 'linear-gradient(135deg, #021a38 0%, #082d5a 50%, #031730 100%)',
      headerBg: '#051d3b',
      accent: '#00f0ff',
      accentGlow: 'rgba(0, 240, 255, 0.45)',
      tabBorder: 'rgba(0, 240, 255, 0.35)',
      badgeBg: 'rgba(0, 240, 255, 0.12)',
      badgeText: '#00f0ff'
    },
    telemetry: {
      status: 'LIVE PRODUCTION VERIFIED',
      statA: 'CYCLE: 60/HR',
      statB: 'LATENCY: 12ms',
      statC: 'ESCAPE: ZERO'
    }
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    sector: 'High-Tech Consumer EMS',
    facility: 'Global Top-3 EMS // SMT Cleanrooms',
    tabStatement: 'An agentic coworker for sub-millisecond AI vision inspection',
    tabProduct: 'MACHINE VISION',
    tabIcon: 'sparkle',
    tierBadge: 'GLOBAL TOP-3 EMS // SMART SMT LINES',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    logoBg: '#ffffff',
    headline: 'Sub-second 99.99% micro-QR vision grading on high-speed SMT lines',
    subheadline: 'Sub-millisecond optical inspection and 4ms pneumatic rejection on dense motherboards.',
    summary: 'Automated inline 2D DataMatrix vision grading on micro PCB assemblies with instant pneumatic rejection gates and real-time MES synchronization.',
    challenge: 'Verifying laser-etched 2mm micro DataMatrix codes on high-density smartphone motherboards at full conveyor velocity without triggering false rejects or slowing line speed.',
    solution: 'ATPL installed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with 4-millisecond pneumatic diversion gates conforming to ISO/IEC 15415 standards.',
    results: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream manual assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards',
      'Instant PLC real-time I/O sync preventing conveyor jams'
    ],
    primaryMetric: {
      value: '99.99%',
      label: 'First-Pass Read Rate',
      subtext: 'Tested on micro 2mm laser QR'
    },
    secondaryMetric: {
      value: '< 4ms',
      label: 'Pneumatic Diversion',
      subtext: 'Instant defective PCB ejection'
    },
    quote: {
      text: 'ATPL deployed high-resolution fixed-mount computer vision imagers running Perfect Verifier with sub-millisecond AI grading and automated 4ms pneumatic ejection gates.',
      author: 'Quality Assurance Director',
      role: 'Surface-Mount Technology Division'
    },
    techStack: ['ATPL PERFECT VERIFIER™', 'Fixed Machine Vision Imagers', '4ms Pneumatic Diverter', 'ISO/IEC 15415 Grader'],
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    theme: {
      gradient: 'linear-gradient(135deg, #0b1329 0%, #172554 50%, #0d1938 100%)',
      headerBg: '#0e1836',
      accent: '#818cf8',
      accentGlow: 'rgba(129, 140, 248, 0.45)',
      tabBorder: 'rgba(129, 140, 248, 0.4)',
      badgeBg: 'rgba(129, 140, 248, 0.12)',
      badgeText: '#a5b4fc'
    },
    telemetry: {
      status: 'SMT INSPECTION ACTIVE',
      statA: 'GRADE: ISO-A',
      statB: 'REJECT: < 4ms',
      statC: 'FALSE REJECT: 0.01%'
    }
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    sector: '3PL & Supply Chain Hubs',
    facility: 'Redington 3PL Omnichannel Hub (120,000 sq.ft)',
    tabStatement: 'Deploy trusted paperless execution that moves at full speed',
    tabProduct: 'PERFECT WAREHOUSE',
    tabIcon: 'box',
    tierBadge: 'REDINGTON 3PL // 45,000+ DISTRIBUTION SKUs',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    logoBg: '#ffffff',
    headline: 'Accelerating inbound dock turnaround 3.5× with zero forklift stoppage',
    subheadline: 'Multi-antenna RFID dock portals scan full pallet loads on moving forklifts in 4 seconds.',
    summary: 'End-to-end warehouse execution system with rugged Android mobile terminals for paperless picking, staging, and automated ASN validation.',
    challenge: 'A high-velocity 3PL distribution hub handling over 45,000 active SKUs suffered chronic dock-door traffic jams. Forklift drivers had to brake, dismount, and scan individual pallet barcodes by hand, causing driver queues and delayed dispatches.',
    solution: 'ATPL engineered PERFECT WAREHOUSE WMS paired with long-range 15-meter mobile computers and automated barcode carton sortation directly connected into SAP S/4HANA.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time (12 min to 4 sec)',
      '99.98% inventory pick accuracy across 45,000+ active distribution SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors',
      'Zero manual dismounts required for forklift operators during staging'
    ],
    primaryMetric: {
      value: '3.5×',
      label: 'Dock Turnaround Speedup',
      subtext: 'From 12 minutes down to 4 seconds'
    },
    secondaryMetric: {
      value: '99.98%',
      label: 'Pick & Dispatch Accuracy',
      subtext: 'Across 45,000+ active SKUs'
    },
    quote: {
      text: 'Forklifts drive through dock gates at operating speed. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds with zero forklift stops.',
      author: 'VP Supply Chain Operations',
      role: 'Redington 3PL Hubs'
    },
    techStack: ['ATPL PERFECT WAREHOUSE™', 'Long-Range 15m Handhelds', 'Automated Carton Sortation', 'SAP S/4HANA Connector'],
    image: '/assets/images/story_logistics.jpg',
    theme: {
      gradient: 'linear-gradient(135deg, #004b99 0%, #0176D3 50%, #003366 100%)',
      headerBg: '#0157a3',
      accent: '#00f0ff',
      accentGlow: 'rgba(0, 240, 255, 0.5)',
      tabBorder: 'rgba(255, 255, 255, 0.4)',
      badgeBg: 'rgba(255, 255, 255, 0.15)',
      badgeText: '#ffffff'
    },
    telemetry: {
      status: 'WMS HIGH-BAY RADAR',
      statA: 'GATE TIME: 4 SEC',
      statB: 'READ VELOCITY: 15 KM/H',
      statC: 'SAP SYNC: VERIFIED'
    }
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    sector: 'Automotive & Heavy Tyres',
    facility: 'Continuous Tyre Curing & High-Rack Hubs',
    tabStatement: 'Ground plant logistics with automated RAIN RFID motion portals',
    tabProduct: 'RAIN RFID PORTALS',
    tabIcon: 'rfid',
    tierBadge: 'GLOBAL RADIAL MOBILITY LEADER',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    logoBg: '#ffffff',
    headline: '+50% dispatch speedup with automated RAIN RFID overhead portals',
    subheadline: 'Continuous tyre curing & high-rack warehouse verification with zero forklift stops.',
    summary: 'Deployed automated RAIN RFID portals and inline 2D barcode verifiers across high-speed tyre curing and dispatch lines, eliminating manual scanning bottlenecks.',
    challenge: 'High-speed vulcanization lines and dense tyre storage created scanning bottlenecks, requiring forklift drivers to dismount and scan individual tyres by hand.',
    solution: 'ATPL engineered rugged overhead UHF RFID portals with directional antennas, Android mobile computers, and real-time SAP middleware.',
    results: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '+50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries',
      'Instant serial verification as tyres roll through final inspection'
    ],
    primaryMetric: {
      value: '+50%',
      label: 'Dispatch Verification Speed',
      subtext: 'Direct outbound loading acceleration'
    },
    secondaryMetric: {
      value: '0 Stops',
      label: 'Forklift Stoppage',
      subtext: 'Continuous motion automated scanning'
    },
    quote: {
      text: 'Forklifts drive through ATPL RFID dock portals at operating speed without slowing down. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds.',
      author: 'Head of Plant Logistics',
      role: 'Apollo Tyre Manufacturing Unit'
    },
    techStack: ['ATPL RAIN RFID Portals', 'Directional Motion Antennas', 'Rugged Vehicle Mount Scanners', 'SAP ERP Middleware'],
    image: '/assets/images/story_automotive.jpg',
    theme: {
      gradient: 'linear-gradient(135deg, #023624 0%, #046344 50%, #012417 100%)',
      headerBg: '#034731',
      accent: '#34d399',
      accentGlow: 'rgba(52, 211, 153, 0.45)',
      tabBorder: 'rgba(52, 211, 153, 0.4)',
      badgeBg: 'rgba(52, 211, 153, 0.12)',
      badgeText: '#6ee7b7'
    },
    telemetry: {
      status: 'RAIN RFID BEAM ACTIVE',
      statA: 'TAG READS: 1,200/S',
      statB: 'MOTION: 15 KM/H',
      statC: 'ACCURACY: 100%'
    }
  }
];

export const CustomerStoriesCarousel = () => {
  const { openDemoModal } = useApp();

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedModalStory, setSelectedModalStory] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);

  const activeStory = STACKED_CUSTOMER_STORIES[activeIdx] || STACKED_CUSTOMER_STORIES[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % STACKED_CUSTOMER_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + STACKED_CUSTOMER_STORIES.length) % STACKED_CUSTOMER_STORIES.length);
  }, []);

  const handleSelect = (idx) => {
    setDirection(idx >= activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // Auto-advance every 6.5s unless hovered or modal open
  useEffect(() => {
    if (isPaused || selectedModalStory) return;

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, selectedModalStory, handleNext]);

  return (
    <section 
      id="customer-stories-section" 
      style={{
        backgroundColor: '#050914',
        color: '#ffffff',
        padding: '5.5rem 0 6.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience Gradient */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '500px',
          background: 'radial-gradient(ellipse at top, rgba(1, 118, 211, 0.18) 0%, rgba(0, 240, 255, 0.05) 50%, transparent 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Global CSS animations for laser and shine */}
      <style>{`
        @keyframes customerLaserScan {
          0%, 100% { top: 3%; }
          50% { top: 95%; }
        }
        .customer-laser-beam {
          animation: customerLaserScan 3.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .customer-laser-beam {
            animation: none !important;
          }
        }
      `}</style>

      <div 
        className="container" 
        style={{ 
          maxWidth: '1260px', 
          margin: '0 auto', 
          padding: '0 clamp(1rem, 2.5vw, 2rem)', 
          position: 'relative', 
          zIndex: 2
        }}
      >
        
        {/* =====================================================================
            1. SECTION INTRO & QUICK CLIENT SELECTOR PILLS
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 2.5rem auto' }}>
          
          {/* Eyebrow Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)',
            fontSize: '11.5px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#00f0ff',
            textTransform: 'uppercase',
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={14} color="#00f0ff" />
            <span>ENTERPRISE CUSTOMER STORIES &amp; AUDITED ROI</span>
          </div>

          {/* Section Headline */}
          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            lineHeight: 1.18,
            margin: '0 0 1.15rem 0'
          }}>
            See how Trailblazers transform manufacturing with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ATPL Industrial Automation
            </span>
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.96rem, 1.3vw, 1.08rem)',
            color: '#94a3b8',
            lineHeight: 1.65,
            margin: '0 auto 2rem auto',
            maxWidth: '740px'
          }}>
            Explore verified enterprise case studies across automotive gigafactories, SMT cleanrooms, and high-velocity 3PL distribution centers. Audited takt-times, zero defect escapes, and hard production ROI.
          </p>

          {/* QUICK SELECTOR PILLS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem'
          }}>
            {STACKED_CUSTOMER_STORIES.map((s, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive 
                      ? `1px solid ${s.theme.accent}` 
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: isActive 
                      ? s.theme.badgeBg 
                      : 'rgba(15, 23, 42, 0.65)',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    boxShadow: isActive ? `0 0 16px ${s.theme.accentGlow}` : 'none',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: s.theme.accent,
                    boxShadow: isActive ? `0 0 8px ${s.theme.accent}` : 'none'
                  }} />
                  <span>{s.client}</span>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>({s.primaryMetric.value})</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* =====================================================================
            2. ACTIVE SHOWCASE CARD (CLEAN, SEAMLESS, NO STACKING GLITCH)
           ===================================================================== */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          
          {/* Top navigation controls strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            padding: '0 0.5rem'
          }}>
            {/* Story index & client selector status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                fontWeight: 800,
                color: activeStory.theme.accent,
                letterSpacing: '0.1em'
              }}>
                {String(activeIdx + 1).padStart(2, '0')} / {String(STACKED_CUSTOMER_STORIES.length).padStart(2, '0')}
              </span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                {activeStory.client} &bull; {activeStory.sector}
              </span>
            </div>

            {/* Prev / Next & Pause controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: isPaused ? activeStory.theme.accent : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
              </button>

              <button
                onClick={handlePrev}
                aria-label="Previous customer story"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = activeStory.theme.accent;
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next customer story"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = activeStory.theme.accent;
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Main Card Viewport with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, y: direction * 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -14 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: '24px',
                background: activeStory.theme.gradient,
                border: `1px solid ${activeStory.theme.tabBorder}`,
                boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${activeStory.theme.accentGlow}`,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Subtle top edge accent glow */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${activeStory.theme.accent}, transparent)`,
                  pointerEvents: 'none'
                }}
              />

              {/* CARD TOP HEADER STRIP */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem clamp(1rem, 2.5vw, 1.75rem)',
                  backgroundColor: activeStory.theme.headerBg,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  gap: '0.75rem',
                  userSelect: 'none',
                  flexWrap: 'wrap'
                }}
              >
                {/* Left: Punchy statement */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 240px' }}>
                  <span style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: activeStory.theme.accent,
                    boxShadow: `0 0 10px ${activeStory.theme.accent}`,
                    flexShrink: 0
                  }} />
                  <span style={{
                    fontSize: 'clamp(0.84rem, 1.25vw, 1.05rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35
                  }}>
                    {activeStory.tabStatement}
                  </span>
                </div>

                {/* Right: Product / Brand Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  flexShrink: 0
                }}>
                  {activeStory.tabIcon === 'cloud' && <Sparkles size={13} color={activeStory.theme.accent} />}
                  {activeStory.tabIcon === 'sparkle' && <Zap size={13} color={activeStory.theme.accent} />}
                  {activeStory.tabIcon === 'box' && <Warehouse size={13} color={activeStory.theme.accent} />}
                  {activeStory.tabIcon === 'rfid' && <Radio size={13} color={activeStory.theme.accent} />}
                  {activeStory.tabIcon === 'shield' && <ShieldCheck size={13} color={activeStory.theme.accent} />}
                  <span>{activeStory.tabProduct}</span>
                </div>
              </div>

              {/* CARD MAIN BODY */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.22fr) minmax(0, 1fr)',
                  gap: '2.5rem',
                  padding: 'clamp(1.75rem, 3.5vw, 3rem)'
                }}
                className="deck-body-grid"
              >
                {/* Responsive CSS helper */}
                <style>{`
                  @media (max-width: 900px) {
                    .deck-body-grid {
                      grid-template-columns: 1fr !important;
                      gap: 2rem !important;
                    }
                  }
                `}</style>

                {/* LEFT COLUMN: Customer Narrative & Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div>
                    {/* Client Identity Pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                      <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '999px',
                        padding: '6px 16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)'
                      }}>
                        <img 
                          src={activeStory.logoUrl} 
                          alt={activeStory.client} 
                          style={{ height: '22px', maxWidth: '120px', objectFit: 'contain' }}
                        />
                      </div>

                      <span style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: activeStory.theme.accent
                      }}>
                        {activeStory.tierBadge}
                      </span>
                    </div>

                    {/* Bold Headline */}
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 2.3vw, 2.2rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.22,
                      letterSpacing: '-0.02em',
                      margin: '0 0 1rem 0'
                    }}>
                      {activeStory.headline}
                    </h3>

                    {/* Story Summary Paragraph */}
                    <p style={{
                      fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                      color: 'rgba(255, 255, 255, 0.88)',
                      lineHeight: 1.65,
                      margin: '0 0 1.75rem 0'
                    }}>
                      {activeStory.summary}
                    </p>

                    {/* TWO GRAND METRIC HIGHLIGHTS */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.5rem',
                      padding: '1.5rem 0',
                      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      marginBottom: '1.75rem'
                    }}>
                      <div>
                        <div style={{
                          fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
                          fontWeight: 900,
                          color: activeStory.theme.accent,
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                          textShadow: `0 0 25px ${activeStory.theme.accentGlow}`
                        }}>
                          {activeStory.primaryMetric.value}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                          {activeStory.primaryMetric.label}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>
                          {activeStory.primaryMetric.subtext}
                        </div>
                      </div>

                      <div>
                        <div style={{
                          fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
                          fontWeight: 900,
                          color: '#ffffff',
                          lineHeight: 1,
                          letterSpacing: '-0.02em'
                        }}>
                          {activeStory.secondaryMetric.value}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                          {activeStory.secondaryMetric.label}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>
                          {activeStory.secondaryMetric.subtext}
                        </div>
                      </div>
                    </div>

                    {/* Verified Quote Snippet */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '1.75rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '12px',
                      borderLeft: `3px solid ${activeStory.theme.accent}`
                    }}>
                      <Quote size={22} color={activeStory.theme.accent} style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
                      <div>
                        <p style={{
                          fontSize: '0.88rem',
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.92)',
                          lineHeight: 1.55,
                          margin: '0 0 6px 0'
                        }}>
                          "{activeStory.quote.text}"
                        </p>
                        <div style={{ fontSize: '11.5px', fontWeight: 700, color: activeStory.theme.accent }}>
                          {activeStory.quote.author} &mdash; <span style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>{activeStory.quote.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTION CTAs */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedModalStory(activeStory)}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#070c18',
                        border: 'none',
                        padding: '11px 22px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.backgroundColor = activeStory.theme.accent;
                        e.currentTarget.style.color = '#050914';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#070c18';
                      }}
                    >
                      <span>EXPLORE FULL CASE STUDY</span>
                      <ArrowUpRight size={16} strokeWidth={2.6} />
                    </button>

                    <button
                      onClick={() => openDemoModal({ 
                        solution: `${activeStory.client} - ${activeStory.tabProduct}`, 
                        notes: `Inquiry regarding case study: ${activeStory.headline}` 
                      })}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        padding: '11px 20px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = activeStory.theme.accent;
                        e.currentTarget.style.color = activeStory.theme.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                    >
                      REQUEST PLANT ASSESSMENT
                    </button>
                  </div>

                </div>

                {/* RIGHT COLUMN: Cinematic Imagery + Laser Scanning + Telemetry HUD */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  
                  <div style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    aspectRatio: '16 / 11',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                  }}>
                    {/* High-res authentic image */}
                    <img 
                      src={activeStory.image} 
                      alt={activeStory.client} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Overlay gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5, 9, 20, 0.1) 0%, rgba(5, 9, 20, 0.55) 100%)',
                      pointerEvents: 'none'
                    }} />

                    {/* ANIMATED LASER SCANNING BEAM */}
                    <div
                      className="customer-laser-beam"
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, transparent 0%, ${activeStory.theme.accent} 50%, transparent 100%)`,
                        boxShadow: `0 0 14px ${activeStory.theme.accent}, 0 0 28px ${activeStory.theme.accent}`,
                        pointerEvents: 'none',
                        zIndex: 4
                      }}
                    />

                    {/* FLOATING TELEMETRY HUD BADGE */}
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      backgroundColor: 'rgba(5, 12, 28, 0.88)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${activeStory.theme.tabBorder}`,
                      borderRadius: '12px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      zIndex: 5
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: '#10b981',
                          boxShadow: '0 0 8px #10b981'
                        }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em' }}>
                          {activeStory.telemetry.status}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', fontSize: '10.5px', fontFamily: 'monospace', color: activeStory.theme.accent, fontWeight: 700 }}>
                        <span>{activeStory.telemetry.statA}</span>
                        <span>&bull;</span>
                        <span>{activeStory.telemetry.statB}</span>
                      </div>
                    </div>

                    {/* Top corner sector tag */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      backgroundColor: 'rgba(5, 12, 28, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '999px',
                      padding: '4px 12px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: '#ffffff',
                      zIndex: 5
                    }}>
                      {activeStory.facility}
                    </div>
                  </div>

                  {/* Tech Stack Badges Below Image */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1rem' }}>
                    {activeStory.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.8)',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '4px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Dot Indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1.75rem'
          }}>
            {STACKED_CUSTOMER_STORIES.map((s, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(idx)}
                  title={`View ${s.client}`}
                  style={{
                    height: '8px',
                    width: isActive ? '32px' : '8px',
                    borderRadius: '999px',
                    backgroundColor: isActive ? s.theme.accent : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isActive ? `0 0 10px ${s.theme.accent}` : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />
              );
            })}
          </div>

        </div>

        {/* =====================================================================
            3. BOTTOM STATUS CALLOUT: 250+ ENTERPRISE FACTORIES
           ===================================================================== */}
        <div style={{
          textAlign: 'center',
          marginTop: '3.5rem',
          padding: '1.75rem 2rem',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '3.5rem auto 0 auto'
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              Have an industrial facility requiring millisecond traceability or AI vision?
            </div>
            <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              ATPL engineers build in-house hardware integration and proprietary MES middleware for continuous shopfloor uptime.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openDemoModal({ solution: 'Plant Assessment', notes: 'Request full factory walkthrough' })}
              style={{
                backgroundColor: '#00f0ff',
                color: '#050914',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>BOOK A FACTORY WALKTHROUGH</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>

      {/* =====================================================================
          4. DETAILED FULL-SCREEN CASE STUDY MODAL
         ===================================================================== */}
      <AnimatePresence>
        {selectedModalStory && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 9, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedModalStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              style={{
                backgroundColor: '#0c1527',
                border: `1px solid ${selectedModalStory.theme.tabBorder}`,
                borderRadius: '24px',
                maxWidth: '780px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
                color: '#ffffff'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Banner */}
              <div style={{
                padding: '1.75rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                background: selectedModalStory.theme.gradient
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '999px', padding: '4px 12px' }}>
                      <img src={selectedModalStory.logoUrl} alt={selectedModalStory.client} style={{ height: '18px' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: selectedModalStory.theme.accent, letterSpacing: '0.08em' }}>
                      {selectedModalStory.tierBadge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.25 }}>
                    {selectedModalStory.headline}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedModalStory(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '2rem' }}>
                
                {/* Metric Summary Strip */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: selectedModalStory.theme.accent }}>
                      {selectedModalStory.primaryMetric.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                      {selectedModalStory.primaryMetric.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {selectedModalStory.primaryMetric.subtext}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
                      {selectedModalStory.secondaryMetric.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                      {selectedModalStory.secondaryMetric.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {selectedModalStory.secondaryMetric.subtext}
                    </div>
                  </div>
                </div>

                {/* The Challenge */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: 800, color: '#f87171' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    The Operational Bottleneck
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                    {selectedModalStory.challenge}
                  </p>
                </div>

                {/* The Engineered Solution */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: 800, color: selectedModalStory.theme.accent }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedModalStory.theme.accent }} />
                    What ATPL Implemented &amp; Deployed
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                    {selectedModalStory.solution}
                  </p>
                </div>

                {/* Verified Results List */}
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
                    <CheckCircle2 size={16} color="#34d399" />
                    Audited Production Results &amp; ROI
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedModalStory.results.map((res, i) => (
                      <li key={i} style={{ fontSize: '0.88rem', color: '#d1fae5', lineHeight: 1.55 }}>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer CTAs */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    onClick={() => setSelectedModalStory(null)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#94a3b8',
                      padding: '10px 20px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      const clientName = selectedModalStory.client;
                      setSelectedModalStory(null);
                      openDemoModal({ 
                        solution: `${clientName} Case Study Solution`, 
                        notes: `Inquiry regarding case study: ${clientName}` 
                      });
                    }}
                    style={{
                      backgroundColor: selectedModalStory.theme.accent,
                      color: '#050914',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Discuss a Similar Deployment
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CustomerStoriesCarousel;
