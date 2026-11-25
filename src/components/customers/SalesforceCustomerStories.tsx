import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight,
  CheckCircle2, 
  Search, 
  Filter, 
  Play, 
  Pause,
  ChevronRight, 
  ChevronLeft, 
  Quote, 
  Layers, 
  LayoutGrid, 
  Zap, 
  ExternalLink,
  Award,
  TrendingUp,
  Cpu,
  Factory,
  Warehouse,
  Radio
} from 'lucide-react';

export interface SalesforceStory {
  id: string;
  client: string;
  industry: 'Automotive & EV' | 'High-Tech EMS' | '3PL & Supply Chain' | 'Heavy Engineering' | 'Pharma & FMCG';
  product: 'PERFECT TRACE' | 'PERFECT VERIFIER' | 'PERFECT WAREHOUSE' | 'RAIN RFID PORTALS' | 'MACHINE VISION';
  tierBadge: string;
  logoUrl: string;
  tabStatement: string;
  headline: string;
  subheadline: string;
  metric: string;
  metricLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  quoteText: string;
  quoteAuthor: string;
  quoteRole: string;
  image: string;
  gradient: string;
  headerBg: string;
  accentColor: string;
  accentGlow: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  telemetry: {
    status: string;
    statA: string;
    statB: string;
  };
}

export const SALESFORCE_STYLE_STORIES: SalesforceStory[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    industry: 'Automotive & EV',
    product: 'PERFECT TRACE',
    tierBadge: 'EV MEGA-FACTORY // TAMIL NADU',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    tabStatement: 'Enterprise intelligence runs on core shopfloor systems',
    headline: 'How Ola Electric slashed battery pack resource allocation from 2 hours to 2 minutes',
    subheadline: 'FutureFactory EV Two-Wheeler Manufacturing Hub',
    metric: '2 Min',
    metricLabel: 'Allocation Speed (from 2 hrs)',
    secondaryMetric: '100%',
    secondaryLabel: 'AIS-156 Safety Compliance',
    quoteText: 'ATPL integrated Direct Part Mark cognitive laser imagers and Perfect Trace to sync live battery cell telemetry to MES assembly stations in 12ms with zero escape.',
    quoteAuthor: 'Operations Leadership',
    quoteRole: 'EV Powertrain & Pack Assembly',
    image: '/assets/images/hw_electronics_qc.jpg',
    gradient: 'linear-gradient(135deg, #021a38 0%, #082d5a 50%, #031730 100%)',
    headerBg: '#051d3b',
    accentColor: '#00f0ff',
    accentGlow: 'rgba(0, 240, 255, 0.45)',
    summary: 'Integrated industrial DPM laser marking scanners and high-density mobile terminals to serialize battery cells and track assembly in real time across 250,000+ EV scooters.',
    challenge: 'Scaling to thousands of electric two-wheelers per day required millisecond traceability of powertrain sub-assemblies and battery modules for mandatory AIS-156 fire & safety certification.',
    solution: 'ATPL engineered Direct Part Mark (DPM) cognitive area imagers paired with ATPL PERFECT TRACE and MES work-in-progress software syncing in 12ms.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Direct compliance with AIS-156 EV safety standards across 250,000+ scooters'
    ],
    techStack: ['ATPL PERFECT TRACE', 'DPM Cognitive Laser Imagers', 'Rugged Android Terminals', 'MES Live API'],
    telemetry: {
      status: 'LIVE PRODUCTION VERIFIED',
      statA: 'CYCLE: 60/HR',
      statB: 'LATENCY: 12ms'
    }
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    industry: 'High-Tech EMS',
    product: 'PERFECT VERIFIER',
    tierBadge: 'GLOBAL TOP-3 EMS // SMART SMT LINES',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    tabStatement: 'An agentic coworker for sub-millisecond AI vision inspection',
    headline: 'How Pegatron achieved 99.99% micro-QR vision grading on high-speed SMT lines',
    subheadline: 'Sub-second optical inspection on dense multi-layer motherboards',
    metric: '99.99%',
    metricLabel: 'First-Pass Read Rate on Micro SMT',
    secondaryMetric: '< 4ms',
    secondaryLabel: 'Pneumatic Diversion Ejection Speed',
    quoteText: 'ATPL deployed high-resolution fixed-mount computer vision imagers running Perfect Verifier with sub-millisecond AI grading and automated 4ms pneumatic ejection gates.',
    quoteAuthor: 'Quality Assurance Director',
    quoteRole: 'Surface-Mount Technology Division',
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    gradient: 'linear-gradient(135deg, #0b1329 0%, #172554 50%, #0d1938 100%)',
    headerBg: '#0e1836',
    accentColor: '#818cf8',
    accentGlow: 'rgba(129, 140, 248, 0.45)',
    summary: 'Automated inline 2D DataMatrix vision grading on micro PCB assemblies with instant pneumatic rejection gates and MES synchronization.',
    challenge: 'Verifying laser-etched 2mm micro DataMatrix codes on high-density smartphone motherboards at full conveyor velocity without triggering false rejects or slowing line speed.',
    solution: 'ATPL installed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with 4-millisecond pneumatic diversion gates conforming to ISO/IEC 15415.',
    results: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards'
    ],
    techStack: ['ATPL PERFECT VERIFIER', 'Fixed-Mount Machine Vision', '4ms Pneumatic Diverter', 'PLC Real-time I/O'],
    telemetry: {
      status: 'SMT INSPECTION ACTIVE',
      statA: 'GRADE: ISO-A',
      statB: 'REJECT: < 4ms'
    }
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    industry: '3PL & Supply Chain',
    product: 'PERFECT WAREHOUSE',
    tierBadge: 'REDINGTON 3PL DISTRIBUTION HUB',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    tabStatement: 'Deploy trusted paperless execution that moves at full speed',
    headline: 'How Proconnect accelerated inbound dock turnaround 3.5× with paperless WMS',
    subheadline: 'Omnichannel fulfillment across 45,000+ active distribution SKUs',
    metric: '3.5×',
    metricLabel: 'Dock Turnaround Acceleration',
    secondaryMetric: '99.98%',
    secondaryLabel: 'Pick & Dispatch Accuracy',
    quoteText: 'ATPL implemented Perfect Warehouse WMS paired with long-range 15-meter mobile scanners and automated carton sorting directly linked into SAP S/4HANA.',
    quoteAuthor: 'VP Supply Chain Operations',
    quoteRole: 'Redington 3PL Hubs',
    image: '/assets/images/story_logistics.jpg',
    gradient: 'linear-gradient(135deg, #004b99 0%, #0176D3 50%, #003366 100%)',
    headerBg: '#0157a3',
    accentColor: '#00f0ff',
    accentGlow: 'rgba(0, 240, 255, 0.5)',
    summary: 'End-to-end warehouse execution system with rugged Android mobile terminals for paperless picking, staging, and ASN validation.',
    challenge: 'Handling massive SKU volumes across multi-client distribution centers caused dock bottlenecks, manual reconciliation delays, and dispatch misroutes.',
    solution: 'ATPL engineered PERFECT WAREHOUSE WMS paired with long-range 15-meter mobile computers and automated barcode carton sorting.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors'
    ],
    techStack: ['ATPL PERFECT WAREHOUSE', 'Long-Range 15m Handhelds', 'Automated Carton Sortation', 'SAP S/4HANA Connector'],
    telemetry: {
      status: 'WMS HIGH-BAY RADAR',
      statA: 'GATE TIME: 4 SEC',
      statB: 'SAP SYNC: VERIFIED'
    }
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    industry: 'Automotive & EV',
    product: 'RAIN RFID PORTALS',
    tierBadge: 'GLOBAL RADIAL MOBILITY LEADER',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    tabStatement: 'Ground plant logistics with automated RAIN RFID motion portals',
    headline: 'How Apollo Tyres achieved +50% dispatch accuracy with automated RAIN RFID portals',
    subheadline: 'Continuous tyre curing & high-rack warehouse verification',
    metric: '+50%',
    metricLabel: 'Dispatch Verification Accuracy',
    secondaryMetric: '0 Stops',
    secondaryLabel: 'Forklift Stoppage During Scans',
    quoteText: 'Forklifts drive through ATPL RFID dock portals at operating speed. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds.',
    quoteAuthor: 'Head of Plant Logistics',
    quoteRole: 'Apollo Tyre Manufacturing Unit',
    image: '/assets/images/story_automotive.jpg',
    gradient: 'linear-gradient(135deg, #023624 0%, #046344 50%, #012417 100%)',
    headerBg: '#034731',
    accentColor: '#34d399',
    accentGlow: 'rgba(52, 211, 153, 0.45)',
    summary: 'Deployed automated RAIN RFID portals and inline 2D barcode verifiers across high-speed tyre curing and dispatch lines.',
    challenge: 'High-speed vulcanization lines and dense tyre storage created scanning bottlenecks, requiring forklift drivers to dismount and scan individual tyres.',
    solution: 'ATPL engineered rugged overhead UHF RFID portals with directional antennas, Android mobile computers, and real-time SAP middleware.',
    results: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '+50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries'
    ],
    techStack: ['ATPL RAIN RFID Portals', 'Directional Motion Antennas', 'Rugged Vehicle Mount Scanners', 'SAP ERP Middleware'],
    telemetry: {
      status: 'RAIN RFID BEAM ACTIVE',
      statA: 'TAG READS: 1,200/S',
      statB: 'MOTION: 15 KM/H'
    }
  },
  {
    id: 'case-abb',
    client: 'ABB Automation',
    industry: 'Heavy Engineering',
    product: 'MACHINE VISION',
    tierBadge: 'GLOBAL ROBOTICS & ELECTRIFICATION',
    logoUrl: '/assets/images/clients/abb.svg',
    tabStatement: 'Flawless cognitive identification under extreme thermal flux',
    headline: 'How ABB ensured 99.98% part identification under extreme thermal flux and electrical load',
    subheadline: 'Mission-critical robotics and switchgear assembly cells',
    metric: '99.98%',
    metricLabel: 'Read Accuracy Under Thermal Flux',
    secondaryMetric: '24/7',
    secondaryLabel: 'Continuous Annual Shift Uptime',
    quoteText: 'ATPL engineered cognitive fixed imagers with IP67 sealed housings to ensure flawless optical tracking under severe electromagnetic fields.',
    quoteAuthor: 'Automation Engineering Lead',
    quoteRole: 'ABB Manufacturing & Systems',
    image: '/assets/images/atpl_ai_vision_inspection.webp',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
    headerBg: '#1e1e38',
    accentColor: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    summary: 'Integrated cognitive high-density barcode imagers and rugged industrial IP67 housings to ensure continuous tracking across robotics assembly lines.',
    challenge: 'Severe thermal conditions and electrical interference on power automation assembly cells caused consumer-grade scanners to degrade and miss scans.',
    solution: 'ATPL installed military-grade cognitive industrial imagers paired with ATPL verification software and custom heat-shielded enclosures.',
    results: [
      '99.98% continuous readability across high-voltage production cells',
      'Complete digital birth certificate for all manufactured assemblies',
      'Zero hardware failure across 24/7 continuous annual shifts'
    ],
    techStack: ['Cognitive Fixed Imagers', 'IP67 Rugged Enclosures', 'ATPL Station Controller', 'SCADA Real-Time Link'],
    telemetry: {
      status: 'LIVE SHOPFLOOR RADAR',
      statA: 'SCANNING: EV MODULE_A7',
      statB: 'RESULT: PASS'
    }
  },
  {
    id: 'case-roche',
    client: 'Roche Diagnostics',
    industry: 'Pharma & FMCG',
    product: 'PERFECT TRACE',
    tierBadge: 'GLOBAL HEALTHCARE & BIOTECH',
    logoUrl: '/assets/images/clients/roche-diagnostics.webp',
    tabStatement: '100% cold-chain serialization & instant 21 CFR Part 11 audit trails',
    headline: 'How Roche Diagnostics secured 100% cold-chain traceability for temperature-critical diagnostics',
    subheadline: 'Cold-chain serialization and GS1 compliant clinical batch tracking',
    metric: '100%',
    metricLabel: 'Cold-Chain Serialization Compliance',
    secondaryMetric: '< 2 Min',
    secondaryLabel: 'Audit Recall Genealogy Report Speed',
    quoteText: 'Compliance with 21 CFR Part 11 and DGFT pharmaceutical serialization protocols handled seamlessly with ATPL Perfect Trace.',
    quoteAuthor: 'Regulatory Affairs Manager',
    quoteRole: 'Clinical Diagnostics Supply Chain',
    image: '/assets/images/software_trace.jpg',
    gradient: 'linear-gradient(135deg, #3b0717 0%, #701a35 50%, #29030e 100%)',
    headerBg: '#520c23',
    accentColor: '#fb7185',
    accentGlow: 'rgba(251, 113, 133, 0.45)',
    summary: 'End-to-end GS1 DataMatrix serialization and cold-chain temperature telemetry across pharmaceutical distribution hubs compliant with US-FDA DSCSA & EU-FMD.',
    challenge: 'Strict regulatory mandates for temperature-sensitive reagents required continuous batch genealogy logging with zero tolerance for label degradation.',
    solution: 'ATPL deployed cryogenic-resistant barcode labels, handheld scanners, and cloud-synced PERFECT TRACE with tamper-evident audit trails.',
    results: [
      '100% end-to-end cold-chain audit compliance achieved',
      'Zero batch recalls due to label unreadability under cryo conditions',
      'Instant GS1 compliant export verification for global shipments'
    ],
    techStack: ['ATPL PERFECT TRACE', 'Cryo-Resistant Synthetic Tags', '21 CFR Part 11 Audit Trail', 'GS1 Cryptographic Serials'],
    telemetry: {
      status: 'COLD-CHAIN AUDIT LIVE',
      statA: 'TEMP: -20°C MONITORED',
      statB: '21 CFR: VERIFIED'
    }
  }
];

export interface SalesforceCustomerStoriesProps {
  onSelectCaseStudy: (study: SalesforceStory) => void;
  onRequestAssessment?: () => void;
}

export const SalesforceCustomerStories: React.FC<SalesforceCustomerStoriesProps> = ({
  onSelectCaseStudy,
  onRequestAssessment
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const industries = ['All', 'Automotive & EV', 'High-Tech EMS', '3PL & Supply Chain', 'Heavy Engineering', 'Pharma & FMCG'];

  // Filtered stories
  const filteredStories = useMemo(() => {
    if (selectedIndustry === 'All') return SALESFORCE_STYLE_STORIES;
    return SALESFORCE_STYLE_STORIES.filter(s => s.industry === selectedIndustry);
  }, [selectedIndustry]);

  // Keep activeIdx in bounds when filter changes
  useEffect(() => {
    setActiveIdx(0);
  }, [selectedIndustry]);

  const activeStory = filteredStories[activeIdx] || filteredStories[0] || SALESFORCE_STYLE_STORIES[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx(prev => (prev + 1) % filteredStories.length);
  }, [filteredStories.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx(prev => (prev - 1 + filteredStories.length) % filteredStories.length);
  }, [filteredStories.length]);

  const handleSelect = (idx: number) => {
    setDirection(idx >= activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // Auto rotation
  useEffect(() => {
    if (isPaused || viewMode !== 'showcase' || filteredStories.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, viewMode, filteredStories.length, handleNext]);

  return (
    <section 
      id="customer-stories" 
      data-section="salesforce-customer-stories" 
      style={{
        backgroundColor: '#070c18',
        color: '#ffffff',
        padding: 'clamp(3rem, 5vh, 4.5rem) 0 4rem 0',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.18) 0%, rgba(67, 97, 238, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Global CSS animations */}
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

      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2rem)', position: 'relative', zIndex: 10 }}>

        {/* =====================================================================
            1. SECTION HERO HEADER WITH PROVENANCE BADGE
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
            border: '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)',
            fontSize: '11.5px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#00f0ff',
            textTransform: 'uppercase',
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={14} color="#00f0ff" />
            <span>ENTERPRISE CUSTOMER SUCCESS &amp; AUDITED ROI</span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.18,
            margin: '0 0 1rem 0'
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
            fontSize: 'clamp(0.96rem, 1.25vw, 1.1rem)',
            color: '#94a3b8',
            lineHeight: 1.65,
            margin: '0 auto 2rem auto',
            maxWidth: '740px'
          }}>
            Explore verified enterprise case studies across automotive mega-factories, SMT cleanrooms, and high-velocity 3PL distribution centers. Audited takt-times, zero defect escapes, and hard ROI.
          </p>

          {/* INDUSTRY FILTER PILLS + VIEW TOGGLE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '4px' }}>
                FILTER:
              </span>
              {industries.map(ind => {
                const isSelected = selectedIndustry === ind;
                return (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: isSelected ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                      color: isSelected ? '#00f0ff' : '#94a3b8',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setViewMode('showcase')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: viewMode === 'showcase' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: viewMode === 'showcase' ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                  color: viewMode === 'showcase' ? '#00f0ff' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                <Layers size={13} />
                <span>Showcase View</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: viewMode === 'grid' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: viewMode === 'grid' ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                  color: viewMode === 'grid' ? '#00f0ff' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                <LayoutGrid size={13} />
                <span>All Stories ({filteredStories.length})</span>
              </button>
            </div>
          </div>

          {/* QUICK CLIENT SELECTOR PILLS */}
          {viewMode === 'showcase' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.65rem'
            }}>
              {filteredStories.map((s, idx) => {
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
                        ? `1px solid ${s.accentColor}` 
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      backgroundColor: isActive 
                        ? 'rgba(0, 240, 255, 0.12)' 
                        : 'rgba(15, 23, 42, 0.65)',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      boxShadow: isActive ? `0 0 16px ${s.accentGlow}` : 'none',
                      transition: 'all 0.2s ease',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: s.accentColor,
                      boxShadow: isActive ? `0 0 8px ${s.accentColor}` : 'none'
                    }} />
                    <span>{s.client}</span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>({s.metric})</span>
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* =====================================================================
            2. SHOWCASE VIEW (SEAMLESS, ACTIVE CARD WITH ANIMATION)
           ===================================================================== */}
        {viewMode === 'showcase' ? (
          <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
            
            {/* Top Navigation Controls Strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              padding: '0 0.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {/* Index & Story label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  color: activeStory.accentColor,
                  letterSpacing: '0.1em'
                }}>
                  {String(activeIdx + 1).padStart(2, '0')} / {String(filteredStories.length).padStart(2, '0')}
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                  {activeStory.client} &bull; {activeStory.industry}
                </span>
              </div>

              {/* Controls */}
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
                    color: isPaused ? activeStory.accentColor : '#94a3b8',
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
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Active Card Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, y: direction * 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -14 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: '24px',
                  background: activeStory.gradient,
                  border: `1px solid rgba(255, 255, 255, 0.15)`,
                  boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${activeStory.accentGlow}`,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Top edge glow */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${activeStory.accentColor}, transparent)`,
                    pointerEvents: 'none'
                  }}
                />

                {/* Tab Header Strip */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem clamp(1rem, 2.5vw, 1.75rem)',
                    backgroundColor: activeStory.headerBg,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    gap: '0.75rem',
                    userSelect: 'none',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 240px' }}>
                    <span style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor: activeStory.accentColor,
                      boxShadow: `0 0 10px ${activeStory.accentColor}`,
                      flexShrink: 0
                    }} />
                    <span style={{
                      fontSize: 'clamp(0.85rem, 1.25vw, 1.05rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.35
                    }}>
                      {activeStory.tabStatement}
                    </span>
                  </div>

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
                    <span>{activeStory.product}</span>
                  </div>
                </div>

                {/* Card Main Grid */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.22fr) minmax(0, 1fr)',
                    gap: '2.5rem',
                    padding: 'clamp(1.75rem, 3.5vw, 3rem)'
                  }}
                  className="showcase-card-grid"
                >
                  <style>{`
                    @media (max-width: 900px) {
                      .showcase-card-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                      }
                    }
                  `}</style>

                  {/* Left Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Client Logo & Tier Badge */}
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
                          color: activeStory.accentColor
                        }}>
                          {activeStory.tierBadge}
                        </span>
                      </div>

                      {/* Headline */}
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

                      {/* Summary */}
                      <p style={{
                        fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                        color: 'rgba(255, 255, 255, 0.88)',
                        lineHeight: 1.65,
                        margin: '0 0 1.75rem 0'
                      }}>
                        {activeStory.summary}
                      </p>

                      {/* Two Metrics Highlights */}
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
                            color: activeStory.accentColor,
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            textShadow: `0 0 25px ${activeStory.accentGlow}`
                          }}>
                            {activeStory.metric}
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                            {activeStory.metricLabel}
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
                            {activeStory.secondaryMetric}
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                            {activeStory.secondaryLabel}
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
                        borderLeft: `3px solid ${activeStory.accentColor}`
                      }}>
                        <Quote size={22} color={activeStory.accentColor} style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
                        <div>
                          <p style={{
                            fontSize: '0.88rem',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.92)',
                            lineHeight: 1.55,
                            margin: '0 0 6px 0'
                          }}>
                            "{activeStory.quoteText}"
                          </p>
                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: activeStory.accentColor }}>
                            {activeStory.quoteAuthor} &mdash; <span style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>{activeStory.quoteRole}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => onSelectCaseStudy(activeStory)}
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
                          e.currentTarget.style.backgroundColor = activeStory.accentColor;
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

                      {onRequestAssessment && (
                        <button
                          onClick={onRequestAssessment}
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
                            e.currentTarget.style.borderColor = activeStory.accentColor;
                            e.currentTarget.style.color = activeStory.accentColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                        >
                          REQUEST PLANT ASSESSMENT
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Imagery & Telemetry */}
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{
                      position: 'relative',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      aspectRatio: '16 / 11',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                    }}>
                      <img 
                        src={activeStory.image} 
                        alt={activeStory.client} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />

                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(5, 9, 20, 0.1) 0%, rgba(5, 9, 20, 0.55) 100%)',
                        pointerEvents: 'none'
                      }} />

                      {/* Laser beam */}
                      <div
                        className="customer-laser-beam"
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: `linear-gradient(90deg, transparent 0%, ${activeStory.accentColor} 50%, transparent 100%)`,
                          boxShadow: `0 0 14px ${activeStory.accentColor}, 0 0 28px ${activeStory.accentColor}`,
                          pointerEvents: 'none',
                          zIndex: 4
                        }}
                      />

                      {/* Telemetry HUD Badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        right: '16px',
                        backgroundColor: 'rgba(5, 12, 28, 0.88)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
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

                        <div style={{ display: 'flex', gap: '12px', fontSize: '10.5px', fontFamily: 'monospace', color: activeStory.accentColor, fontWeight: 700 }}>
                          <span>{activeStory.telemetry.statA}</span>
                          <span>&bull;</span>
                          <span>{activeStory.telemetry.statB}</span>
                        </div>
                      </div>

                      {/* Top Corner Badge */}
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
                        {activeStory.tierBadge}
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
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

            {/* Bottom Dots */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '1.75rem'
            }}>
              {filteredStories.map((s, idx) => {
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
                      backgroundColor: isActive ? s.accentColor : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: isActive ? `0 0 10px ${s.accentColor}` : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  />
                );
              })}
            </div>

          </div>
        ) : (
          /* =====================================================================
              3. ALL STORIES GRID VIEW (CLEAN 3-COLUMN OR 2-COLUMN GRID)
             ===================================================================== */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1240px',
            margin: '0 auto'
          }}>
            {filteredStories.map((story) => (
              <div
                key={story.id}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = story.accentColor;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${story.accentGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img 
                    src={story.image} 
                    alt={story.client} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.9) 100%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '999px',
                    padding: '4px 12px'
                  }}>
                    <img src={story.logoUrl} alt={story.client} style={{ height: '18px', maxWidth: '80px', objectFit: 'contain' }} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(5, 12, 28, 0.85)',
                    borderRadius: '999px',
                    padding: '3px 10px',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    color: story.accentColor
                  }}>
                    {story.product}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: story.accentColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {story.industry}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, margin: '0.5rem 0 0.75rem 0' }}>
                      {story.headline}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem 0' }}>
                      {story.summary}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '12px',
                      padding: '0.85rem 0',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      marginBottom: '1.25rem'
                    }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 900, color: story.accentColor }}>
                        {story.metric}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>
                        {story.metricLabel}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectCaseStudy(story)}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = story.accentColor;
                        e.currentTarget.style.color = '#050914';
                        e.currentTarget.style.borderColor = story.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default SalesforceCustomerStories;
