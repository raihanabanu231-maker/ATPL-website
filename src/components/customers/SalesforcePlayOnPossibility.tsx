import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';

export interface PossibilityStory {
  id: string;
  client: string;
  industry: string;
  headline: string;
  subheadline: string;
  logoUrl: string;
  image: string;
  videoUrl?: string;
  metric: string;
  metricLabel: string;
  quote: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const POSSIBILITY_STORIES: PossibilityStory[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    industry: 'EV TWO-WHEELER MEGA-FACTORY',
    headline: 'How Ola Electric powers 250,000+ EV scooters with millisecond battery pack serialization',
    subheadline: 'FutureFactory EV Battery & Powertrain Line (Tamil Nadu)',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    image: '/assets/images/hw_electronics_qc.jpg',
    videoUrl: 'https://www.youtube.com/embed/4urwO-BZy08?autoplay=1',
    metric: '2 Min',
    metricLabel: 'Shift allocation speed (from 2 hrs)',
    quote: 'ATPL Direct Part Mark laser cognitive imagers sync battery cell array telemetry to MES assembly stations in 12ms with zero escape.',
    challenge: 'Scaling to thousands of electric scooters per day required millisecond traceability of powertrain sub-assemblies and battery modules for mandatory AIS-156 fire & safety certification.',
    solution: 'ATPL engineered Direct Part Mark (DPM) cognitive area imagers paired with ATPL PERFECT TRACE and MES work-in-progress software syncing in 12ms.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Direct compliance with AIS-156 EV safety standards across 250,000+ scooters'
    ]
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    industry: 'HIGH-TECH CONSUMER EMS',
    headline: 'How Pegatron achieved 99.99% micro-QR vision grading on high-speed SMT lines',
    subheadline: 'Sub-second optical inspection on dense multi-layer motherboards',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    videoUrl: 'https://www.youtube.com/embed/4urwO-BZy08?autoplay=1',
    metric: '99.99%',
    metricLabel: 'First-pass read rate on micro SMT',
    quote: 'ATPL deployed high-resolution fixed-mount computer vision imagers running Perfect Verifier with sub-millisecond AI grading and automated 4ms pneumatic ejection gates.',
    challenge: 'Verifying laser-etched 2mm micro DataMatrix codes on high-density smartphone motherboards at full conveyor velocity without triggering false rejects or slowing line speed.',
    solution: 'ATPL installed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with 4-millisecond pneumatic diversion gates conforming to ISO/IEC 15415.',
    results: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards'
    ]
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    industry: 'GLOBAL TYRE MOBILITY',
    headline: 'How Apollo Tyres eliminated shipping discrepancies with automated RAIN RFID portals',
    subheadline: 'Continuous tyre curing & high-rack warehouse verification',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    image: '/assets/images/story_automotive.jpg',
    videoUrl: 'https://www.youtube.com/embed/27tgTz-Bclw?autoplay=1',
    metric: '+50%',
    metricLabel: 'Dispatch verification accuracy',
    quote: 'Forklifts drive through ATPL RFID dock portals at operating speed. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds.',
    challenge: 'High-speed vulcanization lines and dense tyre storage created scanning bottlenecks, requiring forklift drivers to dismount and scan individual tyres.',
    solution: 'ATPL engineered rugged overhead UHF RFID portals with directional antennas, Android mobile computers, and real-time SAP middleware.',
    results: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries'
    ]
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    industry: '3PL & SUPPLY CHAIN LOGISTICS',
    headline: 'How Proconnect accelerated dock turnaround 3.5× with paperless WMS execution',
    subheadline: 'Omnichannel distribution & fulfillment across 45,000+ active SKUs (Redington)',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    image: '/assets/images/story_logistics.jpg',
    videoUrl: 'https://www.youtube.com/embed/27tgTz-Bclw?autoplay=1',
    metric: '3.5×',
    metricLabel: 'Inbound dock turnaround acceleration',
    quote: 'ATPL implemented Perfect Warehouse WMS paired with long-range 15-meter mobile scanners and automated carton sorting directly linked into SAP S/4HANA.',
    challenge: 'Handling massive SKU volumes across multi-client distribution centers caused dock bottlenecks, manual reconciliation delays, and dispatch misroutes.',
    solution: 'ATPL engineered PERFECT WAREHOUSE WMS paired with long-range 15-meter mobile computers and automated barcode carton sorting.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors'
    ]
  },
  {
    id: 'case-abb',
    client: 'ABB Automation',
    industry: 'HEAVY ROBOTICS & POWER',
    headline: 'How ABB ensured 99.98% part identification under extreme thermal flux and electrical load',
    subheadline: 'Robotics and high-voltage power systems assembly cells',
    logoUrl: '/assets/images/clients/abb.svg',
    image: '/assets/images/atpl_ai_vision_inspection.webp',
    videoUrl: 'https://www.youtube.com/embed/4urwO-BZy08?autoplay=1',
    metric: '99.98%',
    metricLabel: 'Part ID under thermal flux',
    quote: 'ATPL engineered cognitive fixed imagers with IP67 sealed housings to ensure flawless optical tracking under severe electromagnetic fields.',
    challenge: 'Severe thermal conditions and electrical interference on power automation assembly cells caused consumer-grade scanners to degrade and miss scans.',
    solution: 'ATPL installed military-grade cognitive industrial imagers paired with ATPL verification software and custom heat-shielded enclosures.',
    results: [
      '99.98% continuous readability across high-voltage production cells',
      'Complete digital birth certificate for all manufactured assemblies',
      'Zero hardware failure across 24/7 continuous annual shifts'
    ]
  }
];

export interface SalesforcePlayOnPossibilityProps {
  onSelectStory?: (story: PossibilityStory) => void;
}

export const SalesforcePlayOnPossibility: React.FC<SalesforcePlayOnPossibilityProps> = ({
  onSelectStory
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStoryForVideo, setActiveStoryForVideo] = useState<PossibilityStory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If reached end, smooth scroll back to start, else scroll by 380px
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        color: '#032D60',
        padding: 'clamp(5.5rem, 8.5vh, 7.5rem) 0 clamp(2.5rem, 4vh, 4rem) 0',
        fontFamily: "'Salesforce Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2.5rem)' }}>
        
        {/* =====================================================================
            1. EXACT SALESFORCE HEADLINE & SUBHEAD
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 3rem auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              fontWeight: 800,
              color: '#032D60',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 1.25rem 0'
            }}
          >
            Press <span style={{ color: '#0176D3' }}>play</span> on possibility
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
              color: '#475569',
              lineHeight: 1.6,
              margin: '0 auto',
              maxWidth: '820px',
              fontWeight: 400
            }}
          >
            Every transformation starts with an idea. Meet the engineers and plant leaders putting ATPL to work in unexpected and inspiring ways — then start imagining what you could build.
          </p>
        </div>

        {/* =====================================================================
            2. MOVING HORIZONTAL VIDEO CAROUSEL TRACK
           ===================================================================== */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1.75rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem'
          }}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {POSSIBILITY_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => {
                if (onSelectStory) {
                  onSelectStory(story);
                } else {
                  setActiveStoryForVideo(story);
                }
              }}
              style={{
                flex: '0 0 auto',
                width: 'clamp(340px, 42vw, 540px)',
                height: 'clamp(260px, 30vw, 340px)',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.3s ease',
                backgroundColor: '#0F172A'
              }}
              className="group"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(1, 118, 211, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.12)';
              }}
            >
              {/* High-Res Background Image */}
              <img
                src={story.image}
                alt={story.client}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transition: 'transform 0.6s ease'
                }}
              />

              {/* Gentle Contrast Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.35) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Top Tag: Industry & Verification */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {story.industry}
                </span>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    color: '#38BDF8',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={12} color="#38BDF8" />
                  <span>{story.metric}</span>
                </div>
              </div>

              {/* Central Frosted Glass Play Button */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  border: '2px solid rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  style={{
                    width: '0',
                    height: '0',
                    borderTop: '9px solid transparent',
                    borderBottom: '9px solid transparent',
                    borderLeft: '15px solid #FFFFFF',
                    marginLeft: '3px'
                  }}
                />
              </div>

              {/* Bottom Client Logo & Information */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                {/* White Logo Container */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '999px',
                      padding: '6px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    <img
                      src={story.logoUrl}
                      alt={story.client}
                      style={{
                        height: '20px',
                        maxWidth: '110px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Micro Action Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(1, 118, 211, 0.85)',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  <span>Watch Story</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* =====================================================================
            3. EXACT SALESFORCE CONTROLS (Bottom Right Pause & Directional Arrows)
           ===================================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '1.25rem',
            paddingRight: '1rem'
          }}
        >
          {/* Pause / Play Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto-moving stories' : 'Resume auto-moving stories'}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0176D3',
              color: '#0176D3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(1, 118, 211, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0176D3';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#0176D3';
            }}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            title="Previous story"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0176D3',
              color: '#0176D3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(1, 118, 211, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0176D3';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#0176D3';
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            title="Next story"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0176D3',
              color: '#0176D3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(1, 118, 211, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0176D3';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#0176D3';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* Embedded Video / Story Modal */}
      <AnimatePresence>
        {activeStoryForVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStoryForVideo(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(3, 45, 96, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              zIndex: 99999
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '780px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Modal Video Header */}
              <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#000000' }}>
                <iframe
                  src={activeStoryForVideo.videoUrl}
                  title={activeStoryForVideo.client}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setActiveStoryForVideo(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <img src={activeStoryForVideo.logoUrl} alt={activeStoryForVideo.client} style={{ height: '24px', maxWidth: '120px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0176D3' }}>{activeStoryForVideo.industry}</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#032D60', margin: '0 0 0.75rem 0', lineHeight: 1.25 }}>
                  {activeStoryForVideo.headline}
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  {activeStoryForVideo.challenge}
                </p>

                <div style={{ padding: '12px 18px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0176D3', lineHeight: 1 }}>{activeStoryForVideo.metric}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>{activeStoryForVideo.metricLabel}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    onClick={() => setActiveStoryForVideo(null)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '999px',
                      backgroundColor: '#0176D3',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Done Watching
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SalesforcePlayOnPossibility;

