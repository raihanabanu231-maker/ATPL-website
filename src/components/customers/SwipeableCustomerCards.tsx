import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  LayoutGrid, 
  Hand,
  TrendingUp,
  Award
} from 'lucide-react';

export interface SwipeCardData {
  id: string;
  client: string;
  industry: string;
  tierBadge: string;
  logoUrl: string;
  metric: string;
  metricLabel: string;
  solutionTag: string;
  gradient: string;
  accentColor: string;
  description: string;
  highlightStat: string;
  photoUrl: string;
  fullResults: string[];
}

const SWIPE_CLIENTS: SwipeCardData[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    industry: 'EV Mega-Factory',
    tierBadge: 'TIER-1 EV TWO-WHEELER LEADER',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    metric: '2 Min',
    metricLabel: 'Shift Resource Allocation Speed',
    solutionTag: 'ATPL PERFECT TRACE · DPM LASER',
    highlightStat: '100% AIS-156 Pack Compliance',
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)',
    accentColor: '#FF3D77',
    photoUrl: '/assets/images/hw_electronics_qc.jpg',
    description: 'Direct Part Mark (DPM) cognitive area imagers syncing battery pack telemetry to MES assembly stations in 12ms. Slashed resource allocation from 2 hours to 2 minutes.',
    fullResults: [
      'Resource allocation cycle slashed from 2 hours to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Zero non-compliance line escapes across 250,000+ electric scooters'
    ]
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    industry: 'Global Top-3 EMS',
    tierBadge: 'SMT HIGH-SPEED MOTHERBOARDS',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    metric: '99.99%',
    metricLabel: 'First-Pass Read Rate on SMT Lines',
    solutionTag: 'ATPL PERFECT VERIFIER · AI VISION',
    highlightStat: '< 4ms Pneumatic Diversion Rejection',
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)',
    accentColor: '#06B6D4',
    photoUrl: '/assets/images/atpl_factory_3d_interior.jpg',
    description: 'Sub-second inline 2D DataMatrix vision grading on micro PCB assemblies with instant pneumatic rejection gates and real-time MES synchronization.',
    fullResults: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards'
    ]
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    industry: '3PL & Supply Chain',
    tierBadge: 'REDINGTON DISTRIBUTION HUB',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    metric: '3.5×',
    metricLabel: 'Inbound Dock Turnaround Speedup',
    solutionTag: 'ATPL PERFECT WAREHOUSE · WMS',
    highlightStat: '45,000+ Active SKUs Synced Live',
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)',
    accentColor: '#4361EE',
    photoUrl: '/assets/images/story_logistics.jpg',
    description: 'Paperless cross-docking and high-rack warehouse execution system. Rugged 15-meter mobile scanners linked straight into SAP S/4HANA middleware.',
    fullResults: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors'
    ]
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    industry: 'Heavy Radial Mobility',
    tierBadge: 'AUTOMATED RAIN RFID PORTALS',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    metric: '+50%',
    metricLabel: 'Dispatch Verification Accuracy',
    solutionTag: 'RAIN RFID TUNNELS · SAP SYNC',
    highlightStat: 'Zero Mis-Shipment Chargebacks',
    gradient: 'linear-gradient(137deg, #10B981 0%, #6EE7B7 45%, #059669 100%)',
    accentColor: '#10B981',
    photoUrl: '/assets/images/story_automotive.jpg',
    description: 'Deployed automated RAIN RFID overhead conveyor portals across tyre curing and high-rack dispatch lines, eliminating manual forklift scan delays.',
    fullResults: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries'
    ]
  },
  {
    id: 'case-abb',
    client: 'ABB Automation',
    industry: 'Heavy Robotics & Power',
    tierBadge: 'GLOBAL INDUSTRIAL ELECTRIFICATION',
    logoUrl: '/assets/images/clients/abb.svg',
    metric: '99.98%',
    metricLabel: 'Part ID Under Extreme Thermal Flux',
    solutionTag: 'COGNITIVE FIXED IMAGERS · IP67',
    highlightStat: 'Zero Sensor Interference Under Load',
    gradient: 'linear-gradient(137deg, #EF4444 0%, #FCA5A5 45%, #B91C1C 100%)',
    accentColor: '#EF4444',
    photoUrl: '/assets/images/atpl_ai_vision_inspection.webp',
    description: 'Integrated cognitive high-density barcode imagers and rugged industrial IP67 housings to ensure continuous tracking across robotics assembly lines.',
    fullResults: [
      '99.98% continuous readability across high-voltage production cells',
      'Complete digital birth certificate for all manufactured assemblies',
      'Zero hardware failure across 24/7 continuous annual shifts'
    ]
  }
];

// Single Swipeable Card Component using Framer Motion Gestures
interface SwipeCardItemProps {
  card: SwipeCardData;
  index: number;
  total: number;
  isFront: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
  onSelect: () => void;
}

const SwipeCardItem: React.FC<SwipeCardItemProps> = ({
  card,
  index,
  total,
  isFront,
  onSwipe,
  onSelect
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-12, 0, 12]);
  const opacity = useTransform(x, [-260, -180, 0, 180, 260], [0, 0.9, 1, 0.9, 0]);

  // Swipe Hint Badges
  const nextBadgeOpacity = useTransform(x, [40, 120], [0, 1]);
  const prevBadgeOpacity = useTransform(x, [-120, -40], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 80;
    const velocityThreshold = 300;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    }
  };

  // Stack calculation for 3D depth
  const stackOffset = index * 16;
  const stackScale = 1 - index * 0.045;
  const stackOpacity = 1 - index * 0.18;
  const zIndex = total - index;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        opacity: isFront ? opacity : stackOpacity,
        scale: stackScale,
        y: stackOffset,
        zIndex,
        transformOrigin: 'bottom center',
        cursor: isFront ? 'grab' : 'default',
        touchAction: 'none',
        userSelect: 'none'
      }}
      animate={{
        scale: stackScale,
        y: stackOffset,
        opacity: stackOpacity,
        transition: { type: 'spring', stiffness: 280, damping: 24 }
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isFront ? handleDragEnd : undefined}
      whileTap={isFront ? { cursor: 'grabbing' } : undefined}
    >
      {/* Glow Ambient Layer Behind Card (Dark-Themed Blurred Halo) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '40px',
          background: card.gradient,
          opacity: isFront ? 0.6 : 0.25,
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Swipe Feedback Badges */}
      {isFront && (
        <>
          {/* Next Badge (Dragging Right) */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 30,
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#10B981',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.6)',
              opacity: nextBadgeOpacity,
              pointerEvents: 'none'
            }}
          >
            NEXT CLIENT →
          </motion.div>

          {/* Prev Badge (Dragging Left) */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 30,
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#3B82F6',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.6)',
              opacity: prevBadgeOpacity,
              pointerEvents: 'none'
            }}
          >
            ← PREV CLIENT
          </motion.div>
        </>
      )}

      {/* Foreground Card with 8px Solid Transparent Border & Gradient Clip */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '430px',
          borderRadius: '40px',
          zIndex: 10,
          overflow: 'hidden',
          border: '8px solid transparent',
          background: `linear-gradient(#151518, #151518) padding-box, ${card.gradient} border-box`,
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.4)',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Header Section */}
        <div
          style={{
            padding: '1.75rem 1.85rem 1rem 1.85rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Logo Pill in High-Contrast White Background */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '999px',
              padding: '6px 14px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)'
            }}
          >
            <img
              src={card.logoUrl}
              alt={card.client}
              style={{
                height: '22px',
                maxWidth: '120px',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Tier Badge */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '999px',
              padding: '4px 10px',
              whiteSpace: 'nowrap'
            }}
          >
            {card.industry}
          </div>
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: '1.5rem 1.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Client Title */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '4px'
              }}
            >
              {card.tierBadge}
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: '-0.025em'
              }}
            >
              {card.client}
            </h3>
          </div>

          {/* Big Glowing Stat Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  lineHeight: 1
                }}
              >
                {card.metric}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  fontWeight: 500,
                  marginTop: '4px'
                }}
              >
                {card.metricLabel}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#34d399'
              }}
            >
              <CheckCircle2 size={13} color="#34d399" />
              <span>Verified ROI</span>
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '13.5px',
              lineHeight: 1.6,
              color: '#cbd5e1',
              margin: 0
            }}
          >
            {card.description}
          </p>
        </div>

        {/* Card Footer: Solution Tag & CTA Button */}
        <div
          style={{
            padding: '1.25rem 1.85rem 1.5rem 1.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>TECH: </span>
            <span style={{ color: '#ffffff' }}>{card.solutionTag}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              color: '#0A0A0B',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 255, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.2)';
            }}
          >
            <span>Inspect Case Study</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export interface SwipeableCustomerCardsProps {
  onSelectCaseStudy?: (customerId: string) => void;
}

export const SwipeableCustomerCards: React.FC<SwipeableCustomerCardsProps> = ({
  onSelectCaseStudy
}) => {
  const [deck, setDeck] = useState<SwipeCardData[]>(SWIPE_CLIENTS);
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [swipeCount, setSwipeCount] = useState(0);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'swipe') return;
      if (e.key === 'ArrowRight') {
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck, viewMode]);

  // Swipe Action: Moves top card to back or rotates
  const handleSwipe = (direction: 'left' | 'right') => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      if (direction === 'right') {
        // Move front card to the back
        const [front, ...rest] = prev;
        return [...rest, front];
      } else {
        // Move back card to the front
        const back = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [back, ...rest];
      }
    });

    setSwipeCount((c) => {
      const nextCount = c + 1;
      // Trigger subtle celebratory confetti on exploring 5 case studies!
      if (nextCount === 5) {
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#06B6D4', '#FF3D77', '#4361EE', '#10B981']
          });
        } catch (e) {}
      }
      return nextCount;
    });
  };

  const handleResetDeck = () => {
    setDeck(SWIPE_CLIENTS);
  };

  const currentFrontCard = deck[0];

  return (
    <section
      id="customer-interactive-showcase"
      style={{
        backgroundColor: '#0A0A0B',
        color: '#ffffff',
        padding: 'clamp(3.5rem, 6vh, 6rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Background Starfield Ambient Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '980px',
          height: '520px',
          background: 'radial-gradient(ellipse at center, rgba(67, 97, 238, 0.15) 0%, rgba(255, 61, 119, 0.08) 35%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
          
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
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#38bdf8',
              marginBottom: '1.25rem'
            }}
          >
            <Hand size={14} color="#38bdf8" />
            <span>INTERACTIVE GESTURAL CARD SWIPE</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.18,
              margin: '0 0 1rem 0'
            }}
          >
            Swipe Through Our <span style={{
              background: 'linear-gradient(135deg, #FF9D3C 0%, #FF3D77 50%, #7DD3FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Enterprise Case Studies</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
              margin: '0 auto',
              maxWidth: '640px'
            }}
          >
            Grab and swipe cards left or right to explore real production results across Ola Electric, Pegatron, Proconnect, Apollo Tyres, and ABB.
          </motion.p>

          {/* View Mode Toggle: Interactive Swipe Deck vs Full Grid */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              padding: '4px',
              marginTop: '1.75rem'
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('swipe')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.25s ease',
                backgroundColor: viewMode === 'swipe' ? '#ffffff' : 'transparent',
                color: viewMode === 'swipe' ? '#0A0A0B' : 'rgba(255, 255, 255, 0.7)'
              }}
            >
              <Layers size={14} />
              <span>Swipeable Card Deck</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.25s ease',
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#0A0A0B' : 'rgba(255, 255, 255, 0.7)'
              }}
            >
              <LayoutGrid size={14} />
              <span>Full Grid Showcase</span>
            </button>
          </div>

        </div>

        {/* =====================================================================
            VIEW MODE A: INTERACTIVE 3D GESTURE-DRIVEN SWIPE DECK
           ===================================================================== */}
        {viewMode === 'swipe' ? (
          <div>
            {/* The 3D Stack Container */}
            <div
              style={{
                position: 'relative',
                height: '500px',
                maxWidth: '480px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <AnimatePresence mode="popLayout">
                {deck.slice(0, 3).map((card, index) => (
                  <SwipeCardItem
                    key={card.id}
                    card={card}
                    index={index}
                    total={3}
                    isFront={index === 0}
                    onSwipe={handleSwipe}
                    onSelect={() => onSelectCaseStudy?.(card.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Gesture Hint & Controls Bar */}
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              {/* Swipe Controls: Prev, Next, Reset */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => handleSwipe('left')}
                  title="Swipe Previous Card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Progress Indicators (Dots) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {SWIPE_CLIENTS.map((item, idx) => {
                    const isActive = currentFrontCard.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          const targetIdx = deck.findIndex((d) => d.id === item.id);
                          if (targetIdx > 0) {
                            setDeck((prev) => {
                              const selected = prev[targetIdx];
                              const rest = prev.filter((_, i) => i !== targetIdx);
                              return [selected, ...rest];
                            });
                          }
                        }}
                        style={{
                          height: '8px',
                          width: isActive ? '24px' : '8px',
                          borderRadius: '999px',
                          backgroundColor: isActive ? currentFrontCard.accentColor : 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          padding: 0
                        }}
                        title={`Jump to ${item.client}`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleSwipe('right')}
                  title="Swipe Next Card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Helper text */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <span>💡 Tip: Drag card left or right, or use keyboard ← → arrows</span>
                <button
                  type="button"
                  onClick={handleResetDeck}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#38bdf8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline'
                  }}
                >
                  <RotateCcw size={12} /> Reset Deck
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =====================================================================
              VIEW MODE B: FULL GRID SHOWCASE (All Cards Side-by-Side)
             ===================================================================== */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {SWIPE_CLIENTS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => onSelectCaseStudy?.(card.id)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '36px',
                  overflow: 'hidden',
                  border: '8px solid transparent',
                  background: `linear-gradient(#151518, #151518) padding-box, ${card.gradient} border-box`,
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '999px', padding: '4px 12px' }}>
                      <img src={card.logoUrl} alt={card.client} style={{ height: '20px', maxWidth: '100px', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>{card.industry}</span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    {card.client}
                  </h3>

                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', margin: '0.75rem 0 0.25rem 0' }}>
                    {card.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {card.metricLabel}
                  </div>

                  <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#cbd5e1', marginTop: '1rem' }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{card.solutionTag}</span>
                  <span style={{ fontSize: '11px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                    Inspect <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* =====================================================================
            ENTERPRISE BRAND TRUST MARQUEE (Highlighting India's Top Brands)
           ===================================================================== */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: '1.5rem'
            }}
          >
            TRUSTED ACROSS 200+ AUTOMOTIVE, EMS, PHARMA &amp; 3PL PLANTS IN INDIA
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem 2rem'
            }}
          >
            {[
              { name: 'Ola Electric', logo: '/assets/images/clients/ola-electric.svg' },
              { name: 'Pegatron', logo: '/assets/images/clients/pegatron-electronics.svg' },
              { name: 'Proconnect Logistics', logo: '/assets/images/clients/proconnect-logistics.svg' },
              { name: 'Apollo Tyres', logo: '/assets/images/clients/apollo-tyres.svg' },
              { name: 'ABB Automation', logo: '/assets/images/clients/abb.svg' },
              { name: 'Honeywell Gold Partner', logo: '/assets/images/partners/honeywell_gold_seal.png' }
            ].map((brand, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px'
                }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    height: '16px',
                    maxWidth: '85px',
                    objectFit: 'contain',
                    filter: 'grayscale(1) brightness(1.8)'
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SwipeableCustomerCards;

