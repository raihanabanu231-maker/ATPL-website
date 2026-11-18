import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView
} from 'framer-motion';

// Cubic bezier easing specified in prompt
const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

// Types for data models
export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  logoUrl?: string;
  squares: Array<{ x: number; y: number; size: number }>;
}

export interface MarqueeLogo {
  name: string;
  iconType: 'code' | 'dots' | 'circle-ring' | 'arrow' | 'wave-circle' | 'lines' | 'bolt' | 'plus';
}

// Real Enterprise Case Studies dataset directly from atplgroup.com
const DEFAULT_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'case-ola',
    title: 'Ola Electric',
    category: 'EV Mega-Factory & Battery Traceability',
    year: '2026',
    image: '/assets/images/hw_electronics_qc.jpg',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    squares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 }
    ]
  },
  {
    id: 'case-pegatron',
    title: 'Pegatron Electronics',
    category: 'High-Tech Consumer EMS & SMT Lines',
    year: '2025',
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    squares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 }
    ]
  },
  {
    id: 'case-proconnect',
    title: 'Proconnect Logistics',
    category: '3PL & Omnichannel Supply Chain Hubs',
    year: '2024',
    image: '/assets/images/story_logistics.jpg',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    squares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 }
    ]
  },
  {
    id: 'case-apollo',
    title: 'Apollo Tyres',
    category: 'Automated RAIN RFID Portals & Manufacturing',
    year: '2023',
    image: '/assets/images/story_automotive.jpg',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    squares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 }
    ]
  }
];

// 8 floating header parallax squares positions (x%, y%, size px)
const HEADER_FLOATING_SQUARES = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 }
];

// 8 verified enterprise client & alliance logos from atplgroup.com
const MARQUEE_LOGOS: MarqueeLogo[] = [
  { name: 'Ola Electric', iconType: 'bolt' },
  { name: 'Pegatron Electronics', iconType: 'code' },
  { name: 'Apollo Tyres', iconType: 'circle-ring' },
  { name: 'Proconnect 3PL', iconType: 'arrow' },
  { name: 'Dixon Technologies', iconType: 'lines' },
  { name: 'Rane Group', iconType: 'wave-circle' },
  { name: 'LS Automotive', iconType: 'dots' },
  { name: 'Honeywell Alliance', iconType: 'plus' }
];

// ============================================================================
// SVG ICONS COMPONENT
// ============================================================================
export const MarqueeIcon: React.FC<{ type: MarqueeLogo['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'code':
      // 22x18, viewBox 0 0 22 18, stroke, strokeWidth 2, round caps. Two polylines 6,4 1,9 6,14 and 16,4 21,9 16,14, one line 13,2 to 9,16
      return (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6,4 1,9 6,14" />
          <polyline points="16,4 21,9 16,14" />
          <line x1="13" y1="2" x2="9" y2="16" />
        </svg>
      );
    case 'dots':
      // 20x20, viewBox 0 0 20 20, filled. 9 circles at grid positions [3,10,17] x [3,10,17], radius 2.2
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {[3, 10, 17].map(x =>
            [3, 10, 17].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />
            ))
          )}
        </svg>
      );
    case 'circle-ring':
      // 22x22, viewBox 0 0 22 22, stroke, strokeWidth 2. Two circles at (11,11) with radii 9 and 4
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="9" />
          <circle cx="11" cy="11" r="4" />
        </svg>
      );
    case 'arrow':
      // 18x18, viewBox 0 0 18 18, stroke, strokeWidth 2, round caps. Line 2,16 to 16,2, polyline 7,2 16,2 16,11
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="16" x2="16" y2="2" />
          <polyline points="7,2 16,2 16,11" />
        </svg>
      );
    case 'wave-circle':
      // 22x22, viewBox 0 0 22 22, stroke, strokeWidth 1.5. Circle (11,11) r=9, path M5 11Q8 7 11 11Q14 15 17 11
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="9" />
          <path d="M5 11Q8 7 11 11Q14 15 17 11" strokeLinecap="round" />
        </svg>
      );
    case 'lines':
      // 24x18, viewBox 0 0 24 18, stroke, strokeWidth 2.2, round caps. Three horizontal lines: (0,3 to 24,3), (6,9 to 24,9), (0,15 to 18,15)
      return (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="0" y1="3" x2="24" y2="3" />
          <line x1="6" y1="9" x2="24" y2="9" />
          <line x1="0" y1="15" x2="18" y2="15" />
        </svg>
      );
    case 'bolt':
      // 14x20, viewBox 0 0 14 20, filled. Polygon 8,0 0,11 6,11 6,20 14,9 8,9
      return (
        <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
          <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
        </svg>
      );
    case 'plus':
      // 18x18, viewBox 0 0 18 18, filled. Two rects: (7.5, 0, 3, 18) and (0, 7.5, 18, 3)
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <rect x="7.5" y="0" width="3" height="18" />
          <rect x="0" y="7.5" width="18" height="3" />
        </svg>
      );
    default:
      return null;
  }
};

// ============================================================================
// SINGLE CASE STUDY CARD COMPONENT
// ============================================================================
interface CardProps {
  card: CaseStudyItem;
  index: number;
  onSelect?: (card: CaseStudyItem) => void;
}

const CaseStudyCard: React.FC<CardProps> = ({ card, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse normalized coordinates (0 to 1, default center 0.5)
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  // When card is hovered, shift toward pointer (dist * 40)
  // distX = pointerX - 0.5 ranges from -0.5 to 0.5, multiplied by 40 = -20 to 20
  const targetShiftX = useTransform(pointerX, [0, 1], [-20, 20]);
  const targetShiftY = useTransform(pointerY, [0, 1], [-20, 20]);

  // Spring config: { stiffness: 80, damping: 18, mass: 0.6 }
  const springShiftX = useSpring(targetShiftX, { stiffness: 80, damping: 18, mass: 0.6 });
  const springShiftY = useSpring(targetShiftY, { stiffness: 80, damping: 18, mass: 0.6 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    pointerX.set(x);
    pointerY.set(y);
  }, [pointerX, pointerY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  // Generate 12-col x 8-row grid blocks for pixel-dissolve
  const gridBlocks = useMemo(() => {
    const blocks: Array<{ row: number; col: number }> = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 12; c++) {
        blocks.push({ row: r, col: c });
      }
    }
    return blocks;
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: CUBIC_EASE
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect?.(card)}
      className="group relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#111111'
      }}
    >
      {/* 1. Background image: absolutely positioned, h-full w-full object-cover */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        loading="lazy"
      />

      {/* 2. Pixel-block hover overlay: 12-col x 8-row grid of bg-black/80 blocks */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {gridBlocks.map(({ row, col }) => {
          const delayIn = (row + col) * 0.018;
          const delayOut = ((8 - row) + (12 - col)) * 0.012;

          return (
            <motion.div
              key={`${row}-${col}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: CUBIC_EASE,
                delay: isHovered ? delayIn : delayOut
              }}
              style={{
                position: 'absolute',
                width: `${100 / 12}%`,
                height: `${100 / 8}%`,
                left: `${(col * 100) / 12}%`,
                top: `${(row * 100) / 8}%`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transformOrigin: 'center center'
              }}
            />
          );
        })}
      </div>

      {/* 3. Magnetic squares: 5-6 small black squares per card */}
      <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden" aria-hidden="true">
        {card.squares.map((sq, sIdx) => (
          <motion.div
            key={sIdx}
            style={{
              position: 'absolute',
              left: `${sq.x}%`,
              top: `${sq.y}%`,
              width: `${sq.size}px`,
              height: `${sq.size}px`,
              backgroundColor: '#000000',
              x: springShiftX,
              y: springShiftY
            }}
          />
        ))}
      </div>

      {/* 4. Plus button (top right): absolute right-4 top-4, h-7 w-7 border border-white/30 text-xs text-white, + text, zIndex: 10 */}
      <div
        className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black"
        style={{ zIndex: 10 }}
      >
        +
      </div>

      {/* 5. Info plate (bottom left): absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5, zIndex: 20, maxWidth: "70%" */}
      <div
        className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5 shadow-lg"
        style={{
          zIndex: 20,
          maxWidth: '75%'
        }}
      >
        {card.logoUrl && (
          <div className="mb-1.5 inline-flex items-center rounded border border-black/10 bg-black/5 px-2 py-0.5">
            <img
              src={card.logoUrl}
              alt={card.title}
              className="h-3.5 max-w-[85px] object-contain"
            />
          </div>
        )}
        <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-tight text-black">
          {card.title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-4 text-[12px]">
          <span className="text-black/60">{card.category}</span>
          <span className="font-medium text-black">{card.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TOP AREA FLOATING SQUARE WITH INDEPENDENT SPRING PARALLAX + BOBBING
// ============================================================================
const FloatingSquare: React.FC<{
  square: { x: number; y: number; size: number };
  index: number;
  scrollYProgress: any;
}> = ({ square, index, scrollYProgress }) => {
  // Parallax formula: useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)])
  const rawParallax = useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)]);
  const springParallax = useSpring(rawParallax, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${square.x}%`,
        top: `${square.y}%`,
        y: springParallax
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3 + index * 0.4,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: index * 0.3
        }}
        style={{
          width: `${square.size}px`,
          height: `${square.size}px`,
          backgroundColor: '#000000'
        }}
      />
    </motion.div>
  );
};

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================
export interface InteractiveProjectsCaseStudiesProps {
  items?: CaseStudyItem[];
  badgeText?: string;
  headingPrefix?: string;
  headingAccent?: string;
  headingSuffix?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onCaseStudyClick?: (card: CaseStudyItem) => void;
}

export const InteractiveProjectsCaseStudies: React.FC<InteractiveProjectsCaseStudiesProps> = ({
  items = DEFAULT_CASE_STUDIES,
  badgeText = 'Case Studies',
  headingPrefix = 'Insights from ',
  headingAccent = 'Our',
  headingSuffix = 'Enterprise Deployments',
  description = 'We partner with ambitious industrial enterprises and manufacturing leaders across India — turning fragmented floor operations, manual tracking, and disjointed software into one focused engine for zero-defect production and rapid growth.',
  ctaText = "Let's work together",
  onCtaClick,
  onCaseStudyClick
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll progress across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Header in-view trigger
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  // Doubled logos for seamless infinite marquee loop (16 total)
  const doubledLogos = useMemo(() => [...MARQUEE_LOGOS, ...MARQUEE_LOGOS], []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Injected CSS keyframe and font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=DM+Sans:500,400&display=swap');
        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =====================================================================
          TOP AREA (Header with floating squares)
         ===================================================================== */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
        {/* Parallax Floating Black Squares Layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {HEADER_FLOATING_SQUARES.map((square, idx) => (
            <FloatingSquare
              key={idx}
              square={square}
              index={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Header Text */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: CUBIC_EASE }}
          className="relative mx-auto max-w-7xl text-center"
        >
          {/* Badge */}
          <span className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
            {badgeText}
          </span>

          {/* Heading */}
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
            <span className="text-black">{headingPrefix}</span>
            <span className="text-black/40">{headingAccent}</span>
            <br />
            <span className="text-black/40">{headingSuffix}</span>
          </h2>
        </motion.div>
      </div>

      {/* =====================================================================
          CASE STUDY CARDS (2x2 Grid)
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((card, idx) => (
            <CaseStudyCard
              key={card.id}
              card={card}
              index={idx}
              onSelect={onCaseStudyClick}
            />
          ))}
        </div>
      </div>

      {/* =====================================================================
          FOOTER AREA
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          
          {/* Left Side */}
          <div className="max-w-md">
            {/* Plus button */}
            <div className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs text-black">
              +
            </div>

            {/* Paragraph */}
            <p className="text-[14px] leading-[1.7] text-black/60">
              {description}
            </p>

            {/* CTA Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onCtaClick}
                className="group flex items-end cursor-pointer border-none bg-transparent p-0"
              >
                {/* Main Label */}
                <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white transition-colors duration-200 group-hover:bg-black/85">
                  {ctaText}
                </span>

                {/* Arrow Badge (lifts up from mb-6 to mb-9 on hover) */}
                <span className="mb-6 ml-0 flex h-6 w-6 items-center justify-center bg-black text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9 group-hover:bg-black/85">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Right Side (Marquee) */}
          <div className="flex-1 overflow-hidden border-t border-black/10 pt-6 md:border-t-0 md:pt-0 md:ml-12">
            <div className="overflow-hidden py-5">
              <div className="marquee-projects flex w-max">
                {doubledLogos.map((item, lIdx) => (
                  <div key={lIdx} className="flex shrink-0 items-center gap-2.5 px-8">
                    <span className="text-black flex items-center justify-center">
                      <MarqueeIcon type={item.iconType} />
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-12" />
    </section>
  );
};

export default InteractiveProjectsCaseStudies;

