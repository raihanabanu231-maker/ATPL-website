import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Filter,
  Play,
  ChevronRight,
  ChevronLeft,
  Quote,
  Layers,
  LayoutGrid,
  RotateCw,
  Zap,
  ExternalLink,
  Award,
  TrendingUp,
  Cpu,
  Factory,
  Warehouse,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface SalesforceStory {
  id: string;
  client: string;
  industry: 'Automotive & EV' | 'High-Tech EMS' | '3PL & Supply Chain' | 'Heavy Engineering';
  product: 'PERFECT TRACE' | 'PERFECT VERIFIER' | 'PERFECT WAREHOUSE' | 'RAIN RFID PORTALS' | 'MACHINE VISION';
  tierBadge: string;
  logoUrl: string;
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
  accentColor: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
}

const SALESFORCE_STYLE_STORIES: SalesforceStory[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    industry: 'Automotive & EV',
    product: 'PERFECT TRACE',
    tierBadge: 'EV MEGA-FACTORY // TAMIL NADU',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    headline: 'How Ola Electric slashed battery pack resource allocation from 2 hours to 2 minutes',
    subheadline: 'FutureFactory EV Two-Wheeler Manufacturing Hub',
    metric: '2 Min',
    metricLabel: 'Resource allocation speed (from 2 hrs)',
    secondaryMetric: '100%',
    secondaryLabel: 'AIS-156 fire & safety compliance',
    quoteText: 'ATPL integrated Direct Part Mark cognitive laser imagers and Perfect Trace to sync live battery cell telemetry to MES assembly stations in 12ms with zero escape.',
    quoteAuthor: 'Operations Leadership',
    quoteRole: 'EV Powertrain & Pack Assembly',
    image: '/assets/images/hw_electronics_qc.jpg',
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)',
    accentColor: '#FF3D77',
    summary: 'Integrated industrial DPM laser marking scanners and high-density mobile terminals to serialize battery cells and track assembly in real time.',
    challenge: 'Scaling to thousands of electric two-wheelers per day required millisecond traceability of powertrain sub-assemblies and battery modules for mandatory AIS-156 fire & safety certification.',
    solution: 'ATPL engineered Direct Part Mark (DPM) cognitive area imagers paired with ATPL PERFECT TRACE and MES work-in-progress software syncing in 12ms.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Direct compliance with AIS-156 EV safety standards across 250,000+ scooters'
    ],
    techStack: ['ATPL PERFECT TRACE', 'DPM Cognitive Laser Imagers', 'Rugged Android Terminals', 'MES Live API']
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    industry: 'High-Tech EMS',
    product: 'PERFECT VERIFIER',
    tierBadge: 'GLOBAL TOP-3 EMS // SMART SMT LINES',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    headline: 'How Pegatron achieved 99.99% micro-QR vision grading on high-speed SMT lines',
    subheadline: 'Sub-second optical inspection on dense multi-layer motherboards',
    metric: '99.99%',
    metricLabel: 'First-pass read rate on micro SMT',
    secondaryMetric: '< 4ms',
    secondaryLabel: 'Pneumatic diversion rejection speed',
    quoteText: 'ATPL deployed high-resolution fixed-mount computer vision imagers running Perfect Verifier with sub-millisecond AI grading and automated 4ms pneumatic ejection gates.',
    quoteAuthor: 'Quality Assurance Director',
    quoteRole: 'Surface-Mount Technology Division',
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)',
    accentColor: '#06B6D4',
    summary: 'Automated inline 2D DataMatrix vision grading on micro PCB assemblies with instant pneumatic rejection gates and MES synchronization.',
    challenge: 'Verifying laser-etched 2mm micro DataMatrix codes on high-density smartphone motherboards at full conveyor velocity without triggering false rejects or slowing line speed.',
    solution: 'ATPL installed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with 4-millisecond pneumatic diversion gates conforming to ISO/IEC 15415.',
    results: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards'
    ],
    techStack: ['ATPL PERFECT VERIFIER', 'Fixed-Mount Machine Vision', '4ms Pneumatic Diverter', 'PLC Real-time I/O']
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    industry: '3PL & Supply Chain',
    product: 'PERFECT WAREHOUSE',
    tierBadge: 'REDINGTON 3PL DISTRIBUTION HUB',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    headline: 'How Proconnect accelerated inbound dock turnaround 3.5× with paperless WMS',
    subheadline: 'Omnichannel fulfillment across 45,000+ active distribution SKUs',
    metric: '3.5×',
    metricLabel: 'Dock turnaround acceleration',
    secondaryMetric: '99.98%',
    secondaryLabel: 'Pick & dispatch verification accuracy',
    quoteText: 'ATPL implemented Perfect Warehouse WMS paired with long-range 15-meter mobile scanners and automated carton sorting directly linked into SAP S/4HANA.',
    quoteAuthor: 'VP Supply Chain Operations',
    quoteRole: 'Redington 3PL Hubs',
    image: '/assets/images/story_logistics.jpg',
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)',
    accentColor: '#4361EE',
    summary: 'End-to-end warehouse execution system with rugged Android mobile terminals for paperless picking, staging, and ASN validation.',
    challenge: 'Handling massive SKU volumes across multi-client distribution centers caused dock bottlenecks, manual reconciliation delays, and dispatch misroutes.',
    solution: 'ATPL engineered PERFECT WAREHOUSE WMS paired with long-range 15-meter mobile computers and automated barcode carton sorting.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors'
    ],
    techStack: ['ATPL PERFECT WAREHOUSE', 'Long-Range 15m Handhelds', 'Automated Carton Sortation', 'SAP S/4HANA Connector']
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    industry: 'Automotive & EV',
    product: 'RAIN RFID PORTALS',
    tierBadge: 'GLOBAL RADIAL MOBILITY LEADER',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    headline: 'How Apollo Tyres achieved +50% dispatch accuracy with automated RAIN RFID overhead portals',
    subheadline: 'Continuous tyre curing & high-rack warehouse verification',
    metric: '+50%',
    metricLabel: 'Dispatch verification accuracy',
    secondaryMetric: '0 Stops',
    secondaryLabel: 'Forklift stoppage during tag scans',
    quoteText: 'Forklifts drive through ATPL RFID dock portals at operating speed. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds.',
    quoteAuthor: 'Head of Plant Logistics',
    quoteRole: 'Apollo Tyre Manufacturing Unit',
    image: '/assets/images/story_automotive.jpg',
    gradient: 'linear-gradient(137deg, #10B981 0%, #6EE7B7 45%, #059669 100%)',
    accentColor: '#10B981',
    summary: 'Deployed automated RAIN RFID portals and inline 2D barcode verifiers across high-speed tyre curing and dispatch lines.',
    challenge: 'High-speed vulcanization lines and dense tyre storage created scanning bottlenecks, requiring forklift drivers to dismount and scan individual tyres.',
    solution: 'ATPL engineered rugged overhead UHF RFID portals with directional antennas, Android mobile computers, and real-time SAP middleware.',
    results: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries'
    ],
    techStack: ['ATPL RAIN RFID Portals', 'Directional Motion Antennas', 'Rugged Vehicle Mount Scanners', 'SAP ERP Middleware']
  },
  {
    id: 'case-abb',
    client: 'ABB Automation',
    industry: 'Heavy Engineering',
    product: 'MACHINE VISION',
    tierBadge: 'GLOBAL ROBOTICS & ELECTRIFICATION',
    logoUrl: '/assets/images/clients/abb.svg',
    headline: 'How ABB ensured 99.98% part identification under extreme thermal flux and electrical load',
    subheadline: 'Mission-critical robotics and switchgear assembly cells',
    metric: '99.98%',
    metricLabel: 'Read accuracy under thermal flux',
    secondaryMetric: '24/7',
    secondaryLabel: 'Continuous annual shift uptime',
    quoteText: 'ATPL engineered cognitive fixed imagers with IP67 sealed housings to ensure flawless optical tracking under severe electromagnetic fields.',
    quoteAuthor: 'Automation Engineering Lead',
    quoteRole: 'ABB Manufacturing & Systems',
    image: '/assets/images/atpl_ai_vision_inspection.webp',
    gradient: 'linear-gradient(137deg, #EF4444 0%, #FCA5A5 45%, #B91C1C 100%)',
    accentColor: '#EF4444',
    summary: 'Integrated cognitive high-density barcode imagers and rugged industrial IP67 housings to ensure continuous tracking across robotics assembly lines.',
    challenge: 'Severe thermal conditions and electrical interference on power automation assembly cells caused consumer-grade scanners to degrade and miss scans.',
    solution: 'ATPL installed military-grade cognitive industrial imagers paired with ATPL verification software and custom heat-shielded enclosures.',
    results: [
      '99.98% continuous readability across high-voltage production cells',
      'Complete digital birth certificate for all manufactured assemblies',
      'Zero hardware failure across 24/7 continuous annual shifts'
    ],
    techStack: ['Cognitive Fixed Imagers', 'IP67 Rugged Enclosures', 'ATPL Station Controller', 'SCADA Real-Time Link']
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
  const [selectedProduct, setSelectedProduct] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'stacked' | 'grid' | 'swipe'>('stacked');
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const cardOffsets = useRef<number[]>([]);

  // Industries list
  const industries = ['All', 'Automotive & EV', 'High-Tech EMS', '3PL & Supply Chain', 'Heavy Engineering'];

  // Products list
  const products = ['All', 'PERFECT TRACE', 'PERFECT VERIFIER', 'PERFECT WAREHOUSE', 'RAIN RFID PORTALS', 'MACHINE VISION'];

  // Filtered stories
  const filteredStories = useMemo(() => {
    return SALESFORCE_STYLE_STORIES.filter(s => {
      const matchIndustry = selectedIndustry === 'All' || s.industry === selectedIndustry;
      const matchProduct = selectedProduct === 'All' || s.product === selectedProduct;
      const matchSearch = !searchQuery ||
        s.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchIndustry && matchProduct && matchSearch;
    });
  }, [selectedIndustry, selectedProduct, searchQuery]);

  // Swipe Deck State (when in swipe mode)
  const [swipeDeck, setSwipeDeck] = useState<SalesforceStory[]>(SALESFORCE_STYLE_STORIES);

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDeck(prev => {
      if (prev.length <= 1) return prev;
      if (direction === 'right') {
        const [first, ...rest] = prev;
        return [...rest, first];
      } else {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      }
    });
  };

  // Salesforce "Agentic Enterprise" Stacked Cards Scroll Handler
  useEffect(() => {
    if (viewMode !== 'stacked') return;

    let ticking = false;

    const updateCoveredCards = () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      const total = cards.length;
      if (total === 0) return;

      const isMobile = window.innerWidth <= 768;
      const navH = isMobile ? 64 : 72;
      const stackGap = isMobile ? 34 : 38;

      let activeIdx = 0;
      cards.forEach((card, i) => {
        // The last card in the stack is never covered
        if (i === total - 1) {
          card.classList.remove('is-covered');
          return;
        }

        const nextCard = cards[i + 1];
        if (!nextCard) return;

        const nextRect = nextCard.getBoundingClientRect();
        const stickyThreshold = navH + (i + 1) * stackGap;

        // When the next card reaches its sticky docking top, the previous card is covered
        if (nextRect.top <= stickyThreshold + 4) {
          card.classList.add('is-covered');
          activeIdx = i + 1;
        } else {
          card.classList.remove('is-covered');
        }
      });

      setActiveStoryIdx(activeIdx);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateCoveredCards);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [viewMode, filteredStories]);

  // Switch to a target story card by scrolling to its natural docking position
  const scrollToCard = (idx: number) => {
    const card = cardRefs.current[idx];
    if (card) {
      const isMobile = window.innerWidth <= 768;
      const navH = isMobile ? 64 : 72;
      const stackGap = isMobile ? 34 : 38;
      const rect = card.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetY = currentScroll + rect.top - (navH + idx * stackGap);
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  // Keyboard navigation between stacked cards
  useEffect(() => {
    if (viewMode !== 'stacked') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const nextIdx = Math.min(filteredStories.length - 1, activeStoryIdx + 1);
        scrollToCard(nextIdx);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prevIdx = Math.max(0, activeStoryIdx - 1);
        scrollToCard(prevIdx);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activeStoryIdx, filteredStories.length]);

  return (
    <section
      id="customer-stories"
      data-section="salesforce-customer-stories"
      style={{
        backgroundColor: '#070c18',
        color: '#ffffff',
        padding: 'clamp(3rem, 5vh, 4.5rem) 0 clamp(3rem, 5vh, 4.5rem) 0',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'visible',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
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
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.15) 0%, rgba(67, 97, 238, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10, overflow: 'visible' }}>

        {/* =====================================================================
            1. SALESFORCE-STYLE HERO HEADER WITH PROVENANCE BADGE & STAT STRIP
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem auto' }}>

          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#00f0ff',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={14} color="#00f0ff" />
            <span>SALESFORCE-GRADE CUSTOMER STORIES &amp; ROI</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 1rem 0'
            }}
          >
            See how Trailblazers transform manufacturing with <span style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>ATPL Industrial Automation</span>
          </motion.h2>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: '#94a3b8',
              lineHeight: 1.65,
              margin: '0 auto',
              maxWidth: '720px'
            }}
          >
            Explore verified enterprise case studies across automotive mega-factories, SMT cleanrooms, and high-velocity 3PL distribution centers. Audited takt-times, zero defect escapes, and hard ROI.
          </motion.p>
        </div>

        {/* =====================================================================
            4. SUCCESS STORIES (STACKED DECK VS GRID VIEW VS SWIPE DECK)
           ===================================================================== */}
        {viewMode === 'stacked' ? (
          <>
            {/* Scoped CSS for Salesforce "Agentic Enterprise" Stacked Cards */}
            <style>{`
              .deck {
                --nav-h: 72px;
                --strip-h: 36px;
                --stack-gap: 38px;
                --inset-step: 22px;
                position: relative;
                width: 100%;
                margin: 0 auto;
                padding-bottom: 2.5rem;
                overflow: visible;
              }

              .deck-card {
                position: sticky;
                top: calc(var(--nav-h) + var(--card-i) * var(--stack-gap));
                z-index: calc(var(--card-i) + 1);
                min-height: calc(100vh - var(--nav-h) - 80px);
                margin-bottom: calc(100vh - var(--nav-h) - 80px);
                margin-inline: 0px;
                border-radius: 28px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
                border: 1px solid rgba(255, 255, 255, 0.12);
                overflow: hidden;
                box-sizing: border-box;
                transform-origin: top center;
                transition: margin-inline 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                will-change: margin-inline;
                backdrop-filter: blur(16px);
              }

              .deck-card:last-child {
                margin-bottom: 0px;
              }

              /* Covered Card: Width shrink via margin-inline (newest is full width, oldest is narrowest) */
              .deck-card.is-covered {
                margin-inline: calc((var(--total-n) - 1 - var(--card-i)) * var(--inset-step));
              }

              /* Header Strip: 36px tall, title left, product label + icon right */
              .deck-card-header {
                height: var(--strip-h);
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                cursor: pointer;
                user-select: none;
                gap: 1rem;
                transition: background-color 0.2s ease;
              }

              .deck-card-header-left {
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 0;
              }

              .deck-card-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                flex-shrink: 0;
              }

              .deck-card-header-title {
                font-size: 13px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: -0.01em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .deck-card-header-right {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 3px 10px;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.18);
                color: #ffffff;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                flex-shrink: 0;
              }

              /* Card Body: fades out when covered leaving only the header strip */
              .deck-card-body {
                opacity: 1;
                display: grid;
                grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
                gap: 2.5rem;
                padding: clamp(1.75rem, 3.5vw, 3rem);
                box-sizing: border-box;
                transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
              }

              .deck-card.is-covered .deck-card-body {
                opacity: 0;
                pointer-events: none;
              }

              /* Mobile (< 768px): reduce strip height to 32px, inset to 10px, stack body vertically */
              @media (max-width: 768px) {
                .deck {
                  --nav-h: 64px;
                  --strip-h: 32px;
                  --stack-gap: 34px;
                  --inset-step: 10px;
                  padding-bottom: 1.5rem;
                }

                .deck-card {
                  border-radius: 20px;
                  min-height: auto;
                  margin-bottom: 50vh;
                }

                .deck-card:last-child {
                  margin-bottom: 0px;
                }

                .deck-card-header {
                  height: var(--strip-h);
                  padding: 0 1rem;
                }

                .deck-card-header-title {
                  font-size: 11px;
                }

                .deck-card-header-right {
                  font-size: 9.5px;
                  padding: 2px 7px;
                }

                .deck-card-body {
                  grid-template-columns: 1fr;
                  gap: 1.5rem;
                  padding: 1.25rem 1rem;
                }
              }

              /* Respect prefers-reduced-motion */
              @media (prefers-reduced-motion: reduce) {
                .deck-card,
                .deck-card-body,
                .deck-card-header,
                .salesforce-ask-ai-pill {
                  transition: none !important;
                  animation: none !important;
                }
              }
            `}</style>

            {filteredStories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.15)', margin: '1rem 0 3rem 0' }}>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '1rem' }}>No case studies found matching your selected criteria.</p>
                <button
                  type="button"
                  onClick={() => { setSelectedIndustry('All'); setSelectedProduct('All'); setSearchQuery(''); }}
                  style={{ padding: '8px 20px', borderRadius: '999px', backgroundColor: '#0071ba', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Quick Story Selector Bar (1-Click Stacking) */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '2.5rem'
                  }}
                >
                  {filteredStories.map((s, idx) => {
                    const isActive = activeStoryIdx === idx;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollToCard(idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '7px 16px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? 'rgba(0, 240, 255, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                          border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: isActive ? '0 0 16px rgba(0, 240, 255, 0.35)' : 'none',
                          color: isActive ? '#00f0ff' : '#cbd5e1',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: s.accentColor,
                            boxShadow: `0 0 8px ${s.accentColor}`
                          }}
                        />
                        <span>{s.client}</span>
                        <span style={{ fontSize: '11px', opacity: 0.75, fontFamily: 'monospace' }}>({s.metric})</span>
                      </button>
                    );
                  })}
                </div>

                <div className="deck" ref={deckRef}>
                  {filteredStories.map((story, index) => {
                    const themes = [
                      // 1. Navy -> Blue
                      {
                        gradient: 'linear-gradient(135deg, #021a38 0%, #062e60 50%, #0a4d8c 100%)',
                        headerBg: '#031e40',
                        accent: '#00f0ff',
                        accentGlow: 'rgba(0, 240, 255, 0.45)',
                        tabBorder: 'rgba(0, 240, 255, 0.35)',
                        badgeBg: 'rgba(0, 240, 255, 0.12)'
                      },
                      // 2. Indigo -> Violet
                      {
                        gradient: 'linear-gradient(135deg, #0b1329 0%, #1a1e4a 50%, #2e266d 100%)',
                        headerBg: '#0e1836',
                        accent: '#818cf8',
                        accentGlow: 'rgba(129, 140, 248, 0.45)',
                        tabBorder: 'rgba(129, 140, 248, 0.4)',
                        badgeBg: 'rgba(129, 140, 248, 0.12)'
                      },
                      // 3. Teal -> Green
                      {
                        gradient: 'linear-gradient(135deg, #022c22 0%, #034e3d 50%, #056852 100%)',
                        headerBg: '#033b2e',
                        accent: '#34d399',
                        accentGlow: 'rgba(52, 211, 153, 0.45)',
                        tabBorder: 'rgba(52, 211, 153, 0.4)',
                        badgeBg: 'rgba(52, 211, 153, 0.12)'
                      },
                      // 4. Deep Blue -> Cyan
                      {
                        gradient: 'linear-gradient(135deg, #002855 0%, #015ea8 50%, #0077c8 100%)',
                        headerBg: '#00366b',
                        accent: '#38bdf8',
                        accentGlow: 'rgba(56, 189, 248, 0.45)',
                        tabBorder: 'rgba(56, 189, 248, 0.4)',
                        badgeBg: 'rgba(56, 189, 248, 0.12)'
                      }
                    ];
                    const theme = themes[index % themes.length];
                    const tabStatementMap: Record<string, string> = {
                      'case-ola': 'Enterprise intelligence runs on core shopfloor systems',
                      'case-pegatron': 'An agentic coworker for sub-millisecond AI vision inspection',
                      'case-proconnect': 'Deploy trusted paperless execution that moves at full speed',
                      'case-apollo': 'Ground plant logistics with automated RAIN RFID motion portals',
                      'case-abb': 'Flawless cognitive identification under extreme thermal flux'
                    };
                    const tabStatement = tabStatementMap[story.id] || story.headline;

                    return (
                      <article
                        key={story.id}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="deck-card"
                        style={{
                          '--card-i': index,
                          '--total-n': filteredStories.length,
                          position: 'sticky',
                          top: `calc(var(--nav-h, 72px) + ${index * 38}px)`,
                          zIndex: index + 1,
                          background: theme.gradient,
                          border: `1px solid ${theme.tabBorder}`,
                          borderTop: `2px solid ${theme.accent}`
                        } as React.CSSProperties}
                      >
                        {/* Top edge glow */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                            pointerEvents: 'none'
                          }}
                        />

                        {/* CARD TAB HEADER STRIP (36px tall) */}
                        <div
                          className="deck-card-header"
                          onClick={() => scrollToCard(index)}
                          style={{ backgroundColor: theme.headerBg }}
                          title={`Click to scroll to ${story.client} story`}
                        >
                        <div className="deck-card-header-left">
                          <span
                            className="deck-card-dot"
                            style={{
                              backgroundColor: theme.accent,
                              boxShadow: `0 0 10px ${theme.accent}`
                            }}
                          />
                          <span className="deck-card-header-title">
                            {tabStatement}
                          </span>
                        </div>

                        <div className="deck-card-header-right">
                          <Sparkles size={12} color={theme.accent} />
                          <span>{story.product}</span>
                        </div>
                      </div>

                      {/* CARD BODY */}
                      <div className="deck-card-body">
                        {/* Left: Narrative & Metrics */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
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
                                  src={story.logoUrl}
                                  alt={story.client}
                                  style={{ height: '22px', maxWidth: '120px', objectFit: 'contain' }}
                                />
                              </div>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: theme.accent
                              }}>
                                {story.tierBadge}
                              </span>
                            </div>

                            <h3 style={{
                              fontSize: 'clamp(1.6rem, 2.5vw, 2.3rem)',
                              fontWeight: 800,
                              color: '#ffffff',
                              lineHeight: 1.22,
                              letterSpacing: '-0.02em',
                              margin: '0 0 1rem 0'
                            }}>
                              {story.headline}
                            </h3>

                            <p style={{
                              fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                              color: 'rgba(255, 255, 255, 0.85)',
                              lineHeight: 1.65,
                              margin: '0 0 1.75rem 0'
                            }}>
                              {story.summary}
                            </p>

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
                                  color: theme.accent,
                                  lineHeight: 1,
                                  letterSpacing: '-0.02em',
                                  textShadow: `0 0 25px ${theme.accentGlow}`
                                }}>
                                  {story.metric}
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                                  {story.metricLabel}
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
                                  {story.secondaryMetric}
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                                  {story.secondaryLabel}
                                </div>
                              </div>
                            </div>

                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              marginBottom: '1.75rem',
                              padding: '1rem',
                              backgroundColor: 'rgba(0, 0, 0, 0.25)',
                              borderRadius: '12px',
                              borderLeft: `3px solid ${theme.accent}`
                            }}>
                              <Quote size={22} color={theme.accent} style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
                              <div>
                                <p style={{
                                  fontSize: '0.88rem',
                                  fontStyle: 'italic',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  lineHeight: 1.55,
                                  margin: '0 0 6px 0'
                                }}>
                                  "{story.quoteText}"
                                </p>
                                <div style={{ fontSize: '11.5px', fontWeight: 700, color: theme.accent }}>
                                  {story.quoteAuthor} &mdash; <span style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>{story.quoteRole}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={() => onSelectCaseStudy(story)}
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
                                e.currentTarget.style.backgroundColor = theme.accent;
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
                                type="button"
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
                                  e.currentTarget.style.borderColor = theme.accent;
                                  e.currentTarget.style.color = theme.accent;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                              >
                                REQUEST PLANT ASSESSMENT
                              </button>
                            )}

                            {/* Deck Story Stepper Buttons */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveStoryIdx(prev => Math.max(0, prev - 1));
                                }}
                                disabled={activeStoryIdx === 0}
                                style={{
                                  backgroundColor: activeStoryIdx === 0 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                                  color: activeStoryIdx === 0 ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                  padding: '10px 14px',
                                  borderRadius: '999px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: activeStoryIdx === 0 ? 'not-allowed' : 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                                title="Previous Story"
                              >
                                <ChevronLeft size={15} /> Prev
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveStoryIdx(prev => Math.min(filteredStories.length - 1, prev + 1));
                                }}
                                disabled={activeStoryIdx === filteredStories.length - 1}
                                style={{
                                  backgroundColor: activeStoryIdx === filteredStories.length - 1 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                                  color: activeStoryIdx === filteredStories.length - 1 ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                  padding: '10px 14px',
                                  borderRadius: '999px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: activeStoryIdx === filteredStories.length - 1 ? 'not-allowed' : 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                                title="Next Story"
                              >
                                Next <ChevronRight size={15} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right: Media & Live Laser HUD */}
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
                              src={story.image}
                              alt={story.client}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(180deg, rgba(5, 9, 20, 0.1) 0%, rgba(5, 9, 20, 0.55) 100%)',
                              pointerEvents: 'none'
                            }} />
                            <motion.div
                              animate={{
                                top: ['0%', '98%', '0%']
                              }}
                              transition={{
                                duration: 3.8,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                              style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
                                boxShadow: `0 0 14px ${theme.accent}, 0 0 28px ${theme.accent}`,
                                pointerEvents: 'none',
                                zIndex: 4
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              bottom: '16px',
                              left: '16px',
                              right: '16px',
                              backgroundColor: 'rgba(5, 12, 28, 0.85)',
                              backdropFilter: 'blur(10px)',
                              border: `1px solid ${theme.tabBorder}`,
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
                                  LIVE SHOPFLOOR RADAR
                                </span>
                              </div>
                              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: theme.accent, fontWeight: 700 }}>
                                {story.techStack[0]}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1rem' }}>
                            {story.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: 'rgba(255, 255, 255, 0.75)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
                    </article>
                  );
                })}
              </div>
            </>
          )}
          </>
        ) : viewMode === 'grid' ? (
          /* Salesforce-Grade 3-Column Lightning Cards Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, idx) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  onClick={() => onSelectCaseStudy(story)}
                  style={{
                    backgroundColor: 'rgba(11, 22, 48, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(16px)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {/* Card Media Header */}
                  <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={story.image}
                      alt={story.client}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      className="group-hover:scale-105"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 22, 48, 1) 0%, rgba(11, 22, 48, 0.2) 60%, transparent 100%)' }} />

                    {/* Logo Pill Floating on Photo */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: '#ffffff',
                        borderRadius: '999px',
                        padding: '4px 12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)'
                      }}
                    >
                      <img src={story.logoUrl} alt={story.client} style={{ height: '18px', maxWidth: '100px', objectFit: 'contain' }} />
                    </div>

                    {/* Industry Pill Floating Top Right */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'rgba(6, 12, 28, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: '#38bdf8'
                      }}
                    >
                      {story.industry}
                    </div>

                    {/* Big Metric Badge Floating Over Bottom of Photo */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        backgroundColor: 'rgba(6, 12, 28, 0.9)',
                        border: '1px solid rgba(0, 240, 255, 0.25)',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00f0ff', lineHeight: 1 }}>
                        {story.metric}
                      </span>
                      <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600, lineHeight: 1.2 }}>
                        {story.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Product Tag */}
                      <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em', marginBottom: '6px' }}>
                        {story.product}
                      </div>

                      {/* Headline */}
                      <h4 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, margin: '0 0 0.75rem 0' }}>
                        {story.headline}
                      </h4>

                      <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                        {story.summary}
                      </p>
                    </div>

                    {/* Card Footer: Read Story Link with Hover Arrow */}
                    <div
                      style={{
                        marginTop: '1.5rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                        ISO / AIS Verified
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#00f0ff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read customer story <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* =====================================================================
              VIEW MODE: CARD SWIPING INTERACTIVE CAROUSEL DECK
             ===================================================================== */
          <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto 4rem auto' }}>
            <div style={{ position: 'relative', height: '520px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="popLayout">
                {swipeDeck.slice(0, 3).map((card, idx) => {
                  const stackOffset = idx * 16;
                  const stackScale = 1 - idx * 0.045;
                  const stackOpacity = 1 - idx * 0.18;
                  const zIndex = 3 - idx;

                  return (
                    <motion.div
                      key={card.id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        zIndex,
                        scale: stackScale,
                        y: stackOffset,
                        opacity: stackOpacity,
                        cursor: idx === 0 ? 'grab' : 'default'
                      }}
                      drag={idx === 0 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 80 || info.velocity.x > 300) {
                          handleSwipe('right');
                        } else if (info.offset.x < -80 || info.velocity.x < -300) {
                          handleSwipe('left');
                        }
                      }}
                      whileTap={idx === 0 ? { cursor: 'grabbing' } : undefined}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(11, 22, 48, 0.95)',
                          border: '1px solid rgba(0, 240, 255, 0.35)',
                          borderRadius: '28px',
                          overflow: 'hidden',
                          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 240, 255, 0.15)',
                          minHeight: '480px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div style={{ padding: '1.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ backgroundColor: '#ffffff', borderRadius: '999px', padding: '4px 14px' }}>
                              <img src={card.logoUrl} alt={card.client} style={{ height: '22px', maxWidth: '110px', objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8' }}>{card.industry}</span>
                          </div>

                          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, margin: '0 0 1rem 0' }}>
                            {card.headline}
                          </h3>

                          <div style={{ padding: '12px 16px', borderRadius: '14px', backgroundColor: 'rgba(6, 12, 28, 0.85)', border: '1px solid rgba(0, 240, 255, 0.25)', marginBottom: '1.25rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00f0ff', lineHeight: 1 }}>
                              {card.metric}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', fontWeight: 500 }}>
                              {card.metricLabel}
                            </div>
                          </div>

                          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                            {card.summary}
                          </p>
                        </div>

                        <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(6, 12, 28, 0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Swipe card left or right</span>
                          <button
                            type="button"
                            onClick={() => onSelectCaseStudy(card)}
                            style={{
                              padding: '8px 18px',
                              borderRadius: '999px',
                              backgroundColor: '#00f0ff',
                              color: '#070c18',
                              fontSize: '12px',
                              fontWeight: 800,
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Read Full Story →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Swipe Controls Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleSwipe('left')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                {swipeDeck[0]?.client} ({swipeDeck.length} Stories)
              </span>

              <button
                type="button"
                onClick={() => handleSwipe('right')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}



      </div>

      {/* Fixed floating "Ask AI" pill matching Salesforce's "Ask Piper" */}
      <div
        className="salesforce-ask-ai-pill"
        onClick={() => {
          if (onRequestAssessment) {
            onRequestAssessment();
          } else {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '11px 22px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #014486 0%, #0176D3 60%, #00b4d8 100%)',
          border: '1.5px solid rgba(0, 240, 255, 0.65)',
          boxShadow: '0 8px 30px rgba(0, 118, 211, 0.5), 0 0 20px rgba(0, 240, 255, 0.4)',
          color: '#ffffff',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 118, 211, 0.7), 0 0 30px rgba(0, 240, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 118, 211, 0.5), 0 0 20px rgba(0, 240, 255, 0.4)';
        }}
        role="button"
        aria-label="Ask AI Assistant"
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={14} color="#00f0ff" />
        </div>
        <span style={{
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap'
        }}>
          Ask AI
        </span>
      </div>
    </section>
  );
};

export default SalesforceCustomerStories;

