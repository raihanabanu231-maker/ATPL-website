import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Cubic bezier matching smooth luxury UI feel
const EASE_OUT = [0.22, 1, 0.36, 1];

export interface EloCaseStudy {
  id: string;
  client: string;
  tierBadge: string;
  logoUrl: string;
  outcome: string;
  monogramType: 'battery' | 'chip' | 'warehouse';
  bgGradient: string;
  bgType: 'burnt-ember' | 'bright-tangerine' | 'deep-rust';
  stat1: {
    value: string;
    label: string;
  };
  stat2: {
    value: string;
    label: string;
  };
  photo: string;
  software: string;
  challenge: string;
  solution: string;
  results: string[];
}

const REAL_ATPL_CASE_STUDIES: EloCaseStudy[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    tierBadge: 'TIER-1 EV MEGA-FACTORY',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    outcome: 'Battery pack serialization & takt-time slashed',
    monogramType: 'battery',
    bgType: 'burnt-ember',
    bgGradient: 'radial-gradient(circle at 35% 25%, rgb(176, 64, 18) 0%, rgb(46, 13, 4) 100%)',
    stat1: {
      value: '2 Min',
      label: 'Resource allocation speed (from 2 hrs)'
    },
    stat2: {
      value: '100%',
      label: 'Battery pack AIS-156 compliance'
    },
    photo: '/assets/images/hw_electronics_qc.jpg',
    software: 'PERFECT TRACE & PERFECT PMS',
    challenge: 'Scaling to thousands of electric two-wheelers per day required millisecond traceability of battery packs, cell arrays, and powertrain modules for mandatory AIS-156 fire & safety certification.',
    solution: 'ATPL engineered rugged Direct Part Mark (DPM) cognitive laser imagers paired with ATPL PERFECT TRACE, syncing live pack telemetry to MES assembly stations in 12ms.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      '100% end-to-end component traceability for all manufactured battery packs',
      'Zero non-compliance line escapes across 250,000+ electric scooters'
    ]
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    tierBadge: 'GLOBAL TOP-3 EMS GIANT',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    outcome: 'Sub-second micro-QR vision grading on SMT lines',
    monogramType: 'chip',
    bgType: 'bright-tangerine',
    bgGradient: 'linear-gradient(135deg, rgb(236, 96, 28) 0%, rgb(250, 150, 56) 100%)',
    stat1: {
      value: '99.99%',
      label: 'First-pass read rate on micro SMT'
    },
    stat2: {
      value: '< 4ms',
      label: 'Pneumatic diversion rejection speed'
    },
    photo: '/assets/images/atpl_factory_3d_interior.jpg',
    software: 'PERFECT VERIFIER & Computer Vision System',
    challenge: 'Verifying laser-etched 2mm micro DataMatrix codes on high-density smartphone motherboards at full conveyor velocity without triggering false rejects or reducing line speed.',
    solution: 'ATPL deployed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with sub-millisecond AI grading and automated 4ms pneumatic ejection gates.',
    results: [
      'Continuous 99.99% first-pass read rates across dense multi-layer SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Automated grading certified conforming to ISO/IEC 15415 standards'
    ]
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    tierBadge: 'REDINGTON 3PL HUB',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    outcome: 'Paperless cross-docking & high-rack WMS execution',
    monogramType: 'warehouse',
    bgType: 'deep-rust',
    bgGradient: 'radial-gradient(circle at 35% 25%, rgb(132, 52, 22) 0%, rgb(24, 9, 5) 100%)',
    stat1: {
      value: '3.5×',
      label: 'Inbound dock turnaround acceleration'
    },
    stat2: {
      value: '99.98%',
      label: 'Pick accuracy across 45,000+ SKUs'
    },
    photo: '/assets/images/story_logistics.jpg',
    software: 'PERFECT WAREHOUSE (WMS)',
    challenge: 'Handling massive SKU turnover across omni-channel distribution hubs (Redington Group) caused manual staging bottlenecks, misroutes, and dispatch reconciliation delays.',
    solution: 'ATPL implemented PERFECT WAREHOUSE (WMS) paired with long-range 15-meter mobile RFID terminals, automated ASN barcode verification, and paperless put-away workflows.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active enterprise SKUs',
      'Real-time ERP sync eliminating shipping discrepancies and customer chargebacks'
    ]
  }
];

// White line monograms for each industry
const MonogramIcon: React.FC<{ type: 'battery' | 'chip' | 'warehouse' }> = ({ type }) => {
  switch (type) {
    case 'battery':
      // EV / Energy Bolt Monogram
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="16" height="12" rx="2" />
          <path d="M22 11v4" />
          <path d="m9 10-2 4h4l-2 4" />
        </svg>
      );
    case 'chip':
      // SMT / Microelectronics Monogram
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case 'warehouse':
      // Logistics / 3PL Warehouse Monogram
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 10h6" />
          <path d="M9 14h6" />
          <path d="M9 18h6" />
        </svg>
      );
  }
};

export interface EloResultsCaseStudiesProps {
  onCaseStudyClick?: (study: EloCaseStudy) => void;
  onViewMoreClick?: () => void;
}

export const EloResultsCaseStudies: React.FC<EloResultsCaseStudiesProps> = ({
  onCaseStudyClick,
  onViewMoreClick
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Headline words for staggered entrance
  const headlineWords = [
    'How', 'businesses', 'achieved', 'measurable',
    'results', 'with', 'ATPL'
  ];

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        backgroundColor: '#FDFDFD',
        color: '#000000',
        fontFamily: "'EloLexend', 'Lexend', system-ui, sans-serif"
      }}
    >
      {/* Injected Lexend Font & Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
        
        .elo-card-shadow {
          box-shadow: 0 20px 45px -12px rgba(184, 70, 15, 0.25), 0 10px 20px -8px rgba(0, 0, 0, 0.15);
        }
        .elo-card-shadow:hover {
          box-shadow: 0 30px 60px -15px rgba(184, 70, 15, 0.4), 0 14px 28px -8px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        
        {/* =====================================================================
            1. HEADER AREA: Centred Lexend 600 Headline with Word Stagger
           ===================================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Subtle Top Kicker Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8460F]/20 bg-[#B8460F]/5 px-3.5 py-1 text-xs font-medium uppercase tracking-widest text-[#B8460F]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8460F]" />
            Official Client Results
          </motion.div>

          {/* Staggered Word Headline */}
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.18] tracking-tight text-[#000000]">
            {headlineWords.map((word, index) => (
              <React.Fragment key={index}>
                <motion.span
                  className="inline-block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.045,
                    ease: EASE_OUT
                  }}
                >
                  {word === 'measurable' || word === 'results' ? (
                    <span className="text-[#B8460F]">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
                {index === 3 ? <br className="hidden sm:inline" /> : ' '}
              </React.Fragment>
            ))}
          </h2>

          {/* Lead Paragraph in Lexend 300 */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
            className="mx-auto mt-5 max-w-2xl text-[16px] font-light leading-[1.65] text-[#2B2B2B]"
          >
            Our clients come from very different industries, but the goal is always the same: measurable results. The projects below show the results that are actually possible.
          </motion.p>

          {/* Thin Rule That Draws In */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE_OUT }}
            className="mx-auto mt-8 h-[1px] w-24 bg-[#B8460F]/25 origin-center"
          />
        </div>

        {/* =====================================================================
            2. THREE TALL RESULT CARDS IN SUNSET ORANGE TONES (3-Column Layout)
           ===================================================================== */}
        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {REAL_ATPL_CASE_STUDIES.map((study, idx) => {
            const isHovered = hoveredCard === study.id;

            return (
              <motion.div
                key={study.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: 0.2 + idx * 0.12, // 120ms stagger
                  ease: EASE_OUT
                }}
                onMouseEnter={() => setHoveredCard(study.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onCaseStudyClick?.(study)}
                className="elo-card-shadow group relative flex flex-col justify-between rounded-[24px] p-7 sm:p-8 text-white cursor-pointer transition-all duration-300"
                style={{
                  background: study.bgGradient
                }}
              >
                {/* TOP AREA: Client Logo Badge, Name, Outcome & Monogram Icon */}
                <div>
                  {/* Top Bar: Highlighted Big Company Logo Pill & Monogram */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-md">
                      <img
                        src={study.logoUrl}
                        alt={study.client}
                        className="h-4.5 max-w-[100px] object-contain"
                      />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-black/75 border-l border-black/15 pl-2">
                        {study.tierBadge}
                      </span>
                    </div>

                    {/* Small White Line Monogram Top Right */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <MonogramIcon type={study.monogramType} />
                    </div>
                  </div>

                  {/* Prominent Client Headline */}
                  <h3 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-white leading-tight">
                    {study.client}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-normal leading-snug text-white/90">
                    {study.outcome}
                  </p>

                  {/* STATS: Two Big Stats Side-by-Side Divided by a Thin White Rule */}
                  <div className="mt-6 flex items-stretch border-t border-b border-white/20 py-4">
                    {/* Stat 1 */}
                    <div className="flex-1 pr-3.5">
                      <div className="text-[30px] sm:text-[34px] font-extrabold leading-none tracking-tight text-white drop-shadow-sm">
                        {study.stat1.value}
                      </div>
                      <div className="mt-2 text-[12px] font-medium leading-snug text-white/85">
                        {study.stat1.label}
                      </div>
                    </div>

                    {/* Thin White Vertical Divider */}
                    <div className="w-[1px] bg-white/20" />

                    {/* Stat 2 */}
                    <div className="flex-1 pl-3.5">
                      <div className="text-[30px] sm:text-[34px] font-extrabold leading-none tracking-tight text-white drop-shadow-sm">
                        {study.stat2.value}
                      </div>
                      <div className="mt-2 text-[12px] font-medium leading-snug text-white/85">
                        {study.stat2.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM PHOTO AREA FRAMED BY STACKED "PAPER" LAYERS (Never Cropped) */}
                <div className="relative mt-8 pt-4 pb-2">
                  
                  {/* Layer 3: Deepest Translucent Paper Layer */}
                  <div
                    className="absolute inset-x-3 -top-2.5 bottom-4 rounded-[16px] bg-white/12 border border-white/10 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                    style={{
                      transform: isHovered ? 'translateY(-10px) rotate(-3.5deg)' : 'translateY(0) rotate(-1.5deg)'
                    }}
                  />

                  {/* Layer 2: Middle Translucent Paper Layer */}
                  <div
                    className="absolute inset-x-2 -top-1 bottom-3 rounded-[16px] bg-white/20 border border-white/18 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                    style={{
                      transform: isHovered ? 'translateY(-6px) rotate(3.5deg)' : 'translateY(0) rotate(1.5deg)'
                    }}
                  />

                  {/* Layer 1: Front Paper Frame Sitting Under The Photo */}
                  <div
                    className="absolute inset-x-1 top-0 bottom-2 rounded-[16px] bg-white/28 border border-white/25 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                    style={{
                      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)'
                    }}
                  />

                  {/* 3:2 Photo Cover-Fitted in the Lower Part of the Card */}
                  <div className="relative z-10 aspect-[3/2] w-full overflow-hidden rounded-[16px] border border-white/35 shadow-xl bg-black/20">
                    <img
                      src={study.photo}
                      alt={study.client}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Subtle Explore Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20">
                      <span>Inspect Case Study</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* =====================================================================
            3. BUTTON: White Pill with Soft Border ("View more projects")
           ===================================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
          className="mt-14 text-center"
        >
          <button
            type="button"
            onClick={onViewMoreClick}
            className="group inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-medium text-[#000000] shadow-sm transition-all duration-300 hover:border-black/40 hover:bg-[#F9F9F9] hover:shadow-md cursor-pointer"
          >
            <span>View all 200+ enterprise client deployments</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default EloResultsCaseStudies;
