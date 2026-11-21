import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion, animate } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Check
} from 'lucide-react';

// ============================================================================
// 1. COMPARISON DATA & VENDOR DEFINITIONS (STORED IN CLEAN ARRAYS AT TOP)
// ============================================================================

export const COMPARISON_VENDORS = [
  {
    id: 'atpl',
    name: 'ATPL Turnkey Engineering',
    tagline: 'Hardware + In-House Software',
    highlight: true,
  },
  {
    id: 'resellers',
    name: 'Traditional Resellers',
    tagline: 'Hardware Box-Pushers',
    highlight: false,
  },
  {
    id: 'mega',
    name: 'Mega Software Vendors',
    tagline: 'Rigid COTS Monoliths',
    highlight: false,
  },
];

export const COMPARISON_DATA = [
  {
    id: 'velocity',
    criterion: 'Deployment Velocity',
    shortLabel: 'Velocity',
    atpl: {
      headline: '2 to 4 Weeks Turnkey',
      description: 'Pre-calibrated hardware modules and plug-and-play ERP connectors.',
    },
    resellers: {
      headline: '6 to 12 Months',
      description: 'Disjointed third-party software integration and custom driver writing.',
    },
    mega: {
      headline: '12 to 18 Months',
      description: 'Protracted multi-phase rollouts with heavy professional services fees.',
    },
  },
  {
    id: 'responsibility',
    criterion: 'Hardware & Software Responsibility',
    shortLabel: 'Responsibility',
    atpl: {
      headline: 'Single Turnkey Partner',
      description: 'ATPL owns the optical design, PLC logic, and software stack end to end.',
    },
    resellers: {
      headline: 'Vendor Finger-Pointing',
      description: 'Hardware vendor blames software vendor when misreads or latency occurs.',
    },
    mega: {
      headline: 'Proprietary Lock-in',
      description: 'Rigid ecosystems requiring expensive proprietary certified peripherals.',
    },
  },
  {
    id: 'erp-sync',
    criterion: 'Real-Time ERP Sync (SAP / Oracle)',
    shortLabel: 'ERP Sync',
    atpl: {
      headline: 'Sub-Second Certified Connectors',
      description: 'Direct bi-directional IDocs & REST webhooks with offline failover buffer.',
    },
    resellers: {
      headline: 'Fragile Batch Cron Jobs',
      description: 'Periodic CSV dumps causing ghost inventory and shipping discrepancies.',
    },
    mega: {
      headline: 'Complex Middleware Tax',
      description: 'Requires expensive enterprise service buses (MuleSoft, SAP PI/PO).',
    },
  },
  {
    id: 'sla',
    criterion: 'On-Site Field Support & AMC SLA',
    shortLabel: 'On-Site SLA',
    atpl: {
      headline: 'Guaranteed 4-Hour On-Site SLA',
      description: 'Local engineering squads in Chennai, Hosur, Bangalore & Madurai.',
    },
    resellers: {
      headline: 'Best-Effort Ticketing',
      description: '48 to 72 hour email response times with no local hardware swap pool.',
    },
    mega: {
      headline: 'Multi-Tier Offshore Queues',
      description: 'Tier-1/2 call centers with days of delay before physical dispatch.',
    },
  },
  {
    id: 'escape-prevention',
    criterion: 'Defect Escape Guarantee',
    shortLabel: 'Escape Prevention',
    atpl: {
      headline: '100% Escape Prevention',
      description: 'Sub-pixel AI defect detection backed by optical verification SLA.',
    },
    resellers: {
      headline: 'No Guarantee on Reads',
      description: 'Resells equipment with standard OEM manufacturer pass-through warranty.',
    },
    mega: {
      headline: 'Software Only SLA',
      description: 'No responsibility for ambient lighting, vibration, or optical errors.',
    },
  },
];

// Maximum scale for the race timeline (0 to 78 weeks, equivalent to 18 months)
const MAX_WEEKS = 78;
// Animation duration in seconds (9s linear)
const RACE_DURATION = 9;

// The 3 race lanes with their upper-end target weeks and stated copy ranges
const RACE_LANES = [
  {
    id: 'atpl',
    name: 'ATPL Turnkey Engineering',
    tagline: 'Hardware + In-House Software',
    targetWeeks: 4,
    rangeLabel: '2 to 4 weeks',
    gradient: 'linear-gradient(90deg, #22d3ee 0%, #0369a1 100%)',
    barGlow: '0 0 14px rgba(34, 211, 238, 0.45)',
    isAtpl: true,
  },
  {
    id: 'resellers',
    name: 'Traditional Resellers',
    tagline: 'Hardware Box-Pushers',
    targetWeeks: 52, // 12 months = 52 weeks
    rangeLabel: '6 to 12 months',
    gradient: 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)',
    barGlow: 'none',
    isAtpl: false,
  },
  {
    id: 'mega',
    name: 'Mega Software Vendors',
    tagline: 'Rigid COTS Monoliths',
    targetWeeks: 78, // 18 months = 78 weeks
    rangeLabel: '12 to 18 months',
    gradient: 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)',
    barGlow: 'none',
    isAtpl: false,
  },
];

// Month markers for the slider track
const MONTH_TICKS = [
  { label: '0m', week: 0 },
  { label: '3m', week: 13 },
  { label: '6m', week: 26 },
  { label: '9m', week: 39 },
  { label: '12m', week: 52 },
  { label: '15m', week: 65 },
  { label: '18m', week: 78 },
];

// ============================================================================
// 2. PART 1: "RACE TO GO-LIVE" TIMELINE PANEL
// ============================================================================
const RaceToGoLivePanel = memo(() => {
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { once: true, amount: 0.25 });
  const prefersReduced = useReducedMotion();

  // Current weeks state (0 to 78)
  const [currentWeeks, setCurrentWeeks] = useState(prefersReduced ? MAX_WEEKS : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const hasAutoStartedRef = useRef(false);

  // Stop current active animation cleanly
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  // Run the 9-second linear race animation from startWeek to MAX_WEEKS
  const runRaceAnimation = useCallback((startWeek = 0) => {
    if (prefersReduced) {
      setCurrentWeeks(MAX_WEEKS);
      return;
    }

    stopAnimation();
    setIsAnimating(true);

    const remainingFraction = Math.max(0, (MAX_WEEKS - startWeek) / MAX_WEEKS);
    const duration = remainingFraction * RACE_DURATION;

    const anim = animate(startWeek, MAX_WEEKS, {
      duration: Math.max(duration, 0.2),
      ease: 'linear',
      onUpdate: (latest) => {
        setCurrentWeeks(latest);
      },
      onComplete: () => {
        setCurrentWeeks(MAX_WEEKS);
        setIsAnimating(false);
        animationRef.current = null;
      },
    });

    animationRef.current = anim;
  }, [prefersReduced, stopAnimation]);

  // Autoplay once when scrolled into view
  useEffect(() => {
    if (isInView && !hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      if (!prefersReduced) {
        runRaceAnimation(0);
      } else {
        setCurrentWeeks(MAX_WEEKS);
      }
    }
  }, [isInView, prefersReduced, runRaceAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  // Handle manual scrubber drag (stops auto-animation immediately)
  const handleSliderChange = (e) => {
    stopAnimation();
    const val = parseFloat(e.target.value);
    setCurrentWeeks(val);
  };

  // Replay button handler
  const handleReplay = () => {
    setCurrentWeeks(0);
    runRaceAnimation(0);
  };

  // Convert currentWeeks to months string
  const currentMonths = (currentWeeks / 4.333).toFixed(1);

  return (
    <div
      ref={panelRef}
      style={{
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(226, 232, 240, 0.95)',
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 2.8vw, 2.25rem)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05)',
        marginBottom: '3.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Header: Title, Clock & Replay Button */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0369a1',
            background: 'rgba(3, 105, 161, 0.08)',
            padding: '3px 10px',
            borderRadius: '999px',
            marginBottom: '0.4rem'
          }}>
            <Activity size={12} style={{ color: '#0284c7' }} />
            <span>Velocity Benchmark</span>
          </div>
          <h3 style={{
            fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)',
            fontWeight: 900,
            color: '#0f172a',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display, "Outfit", sans-serif)'
          }}>
            Race to go-live
          </h3>
        </div>

        {/* Live Clock & Replay Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Live Clock Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(3, 105, 161, 0.08) 0%, rgba(34, 211, 238, 0.12) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.45)',
            borderRadius: '12px',
            padding: '6px 14px',
            boxShadow: '0 2px 8px rgba(3, 105, 161, 0.06)'
          }}>
            <Clock size={16} style={{ color: '#0284c7', flexShrink: 0 }} />
            <div style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontWeight: 900,
              color: '#0f172a',
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap'
            }}>
              <span>{Math.round(currentWeeks)} weeks</span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginLeft: '6px' }}>
                ({currentMonths} months)
              </span>
            </div>
          </div>

          {/* Replay Pill Button */}
          <button
            onClick={handleReplay}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(203, 213, 225, 0.9)',
              background: '#ffffff',
              color: '#0369a1',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0369a1';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#0369a1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#0369a1';
              e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.9)';
            }}
            aria-label="Replay race animation"
          >
            <RotateCcw size={13} />
            <span>Replay race</span>
          </button>
        </div>
      </div>

      {/* 3 Horizontal Lanes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', marginBottom: '2.5rem' }}>
        {RACE_LANES.map((lane) => {
          // Progress fraction for this lane (0 to 1) based on currentWeeks
          const laneProgress = Math.min(1, currentWeeks / lane.targetWeeks);
          const isFinished = currentWeeks >= lane.targetWeeks;
          const percentVal = Math.round(laneProgress * 100);

          // Bar width on shared 78-week scale (percentage of the full track)
          const barWidthPercent = (Math.min(currentWeeks, lane.targetWeeks) / MAX_WEEKS) * 100;
          const targetWidthPercent = (lane.targetWeeks / MAX_WEEKS) * 100;

          return (
            <div key={lane.id}>
              {/* Lane Info Row: Vendor Name & Live Status */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '0.45rem',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.98rem',
                    fontWeight: lane.isAtpl ? 900 : 700,
                    color: lane.isAtpl ? '#0f172a' : '#475569',
                    letterSpacing: '-0.01em'
                  }}>
                    {lane.name}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    fontWeight: 600
                  }}>
                    ({lane.tagline})
                  </span>
                </div>

                {/* Status Text: Deploying... % or Live in production */}
                <div style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: isFinished ? '#047857' : (lane.isAtpl ? '#0369a1' : '#64748b'),
                  fontVariantNumeric: 'tabular-nums',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  {isFinished ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '999px',
                        background: '#047857'
                      }} />
                      <span>Live in production</span>
                    </>
                  ) : (
                    <span>Deploying… {percentVal}%</span>
                  )}
                </div>
              </div>

              {/* Progress Bar Track (0 to 78 weeks) */}
              <div style={{
                position: 'relative',
                height: '24px',
                background: '#f1f5f9',
                borderRadius: '999px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center'
              }}>
                {/* Target Finish Goalpost Line */}
                <div
                  title={`Target: ${lane.targetWeeks} weeks`}
                  style={{
                    position: 'absolute',
                    left: `${targetWidthPercent}%`,
                    top: '-4px',
                    bottom: '-4px',
                    width: '2px',
                    background: lane.isAtpl ? '#0369a1' : '#cbd5e1',
                    zIndex: 2,
                    opacity: 0.7
                  }}
                />

                {/* Animated Filled Bar */}
                <div
                  style={{
                    position: 'relative',
                    height: '100%',
                    width: `${Math.max(barWidthPercent, 0)}%`,
                    background: lane.gradient,
                    borderRadius: '999px',
                    boxShadow: lane.isAtpl ? lane.barGlow : 'none',
                    transition: isAnimating ? 'none' : 'width 0.15s ease',
                    zIndex: 3
                  }}
                >
                  {/* Round green check flag pop at the end of the bar */}
                  {isFinished && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      style={{
                        position: 'absolute',
                        right: '-10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '20px',
                        height: '20px',
                        borderRadius: '999px',
                        background: '#047857',
                        border: '2px solid #ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow: '0 2px 6px rgba(4, 120, 87, 0.35)',
                        zIndex: 5
                      }}
                      title="Deployed & Live"
                    >
                      <Check size={11} strokeWidth={3.5} />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sub-label: Stated range */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.35rem',
                fontSize: '11px',
                color: '#64748b',
                fontWeight: 600
              }}>
                <span>Stated range: <strong style={{ color: lane.isAtpl ? '#0369a1' : '#475569' }}>{lane.rangeLabel}</strong></span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>Target: {lane.targetWeeks}w</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Range Scrubber */}
      <div style={{
        background: 'rgba(248, 250, 252, 0.9)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '16px',
        padding: '1.25rem 1.4rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.65rem'
        }}>
          <label
            htmlFor="race-scrubber-input"
            style={{ fontSize: '12px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}
          >
            Weeks since project kickoff
          </label>
          <span style={{
            fontSize: '11.5px',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: '#0369a1'
          }}>
            {Math.round(currentWeeks)} / 78 weeks
          </span>
        </div>

        {/* Custom Range Input */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '0.6rem' }}>
          <input
            id="race-scrubber-input"
            type="range"
            min="0"
            max={MAX_WEEKS}
            step="0.5"
            value={currentWeeks}
            onChange={handleSliderChange}
            aria-label="Weeks since project kickoff scrubber"
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '999px',
              appearance: 'none',
              WebkitAppearance: 'none',
              outline: 'none',
              cursor: 'pointer',
              background: `linear-gradient(90deg, #0369a1 0%, #0369a1 ${(currentWeeks / MAX_WEEKS) * 100}%, #e2e8f0 ${(currentWeeks / MAX_WEEKS) * 100}%, #e2e8f0 100%)`
            }}
          />
        </div>

        {/* Month Ticks: 0m, 3m, 6m, 9m, 12m, 15m, 18m */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '10px',
          fontFamily: 'monospace',
          fontWeight: 700,
          color: '#94a3b8'
        }}>
          {MONTH_TICKS.map((t) => (
            <span key={t.label} style={{ textAlign: 'center' }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Explanatory Caption */}
      <div style={{
        marginTop: '1.25rem',
        fontSize: '11.5px',
        color: '#64748b',
        lineHeight: 1.5,
        textAlign: 'center'
      }}>
        <em>*Bars use the upper end of each stated range (4 weeks for ATPL, 52 weeks for Resellers, 78 weeks for Mega Vendors) to show conservative, real-world industrial deployment timelines.</em>
      </div>
    </div>
  );
});

// ============================================================================
// 3. PART 2: CRITERIA EXPLORER (INTERACTIVE TABS & STAGGERED CARDS)
// ============================================================================
const CriteriaExplorer = memo(() => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentCriterion = COMPARISON_DATA[selectedIdx];
  const prefersReduced = useReducedMotion();
  const tabRefs = useRef([]);

  // Arrow key navigation for accessible tabs
  const handleKeyDown = (e, index) => {
    let nextIdx = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (index + 1) % COMPARISON_DATA.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (index - 1 + COMPARISON_DATA.length) % COMPARISON_DATA.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = COMPARISON_DATA.length - 1;
    }

    if (nextIdx !== null) {
      setSelectedIdx(nextIdx);
      if (tabRefs.current[nextIdx]) {
        tabRefs.current[nextIdx].focus();
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Criteria Section Label */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h3 style={{
          fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)',
          fontWeight: 900,
          color: '#0f172a',
          margin: '0 0 0.5rem',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-display, "Outfit", sans-serif)'
        }}>
          Interactive Criteria Explorer
        </h3>
        <p style={{ fontSize: '0.96rem', color: '#64748b', margin: 0 }}>
          Select an engineering benchmark below to compare accountability, ERP sync, and SLA guarantees side-by-side.
        </p>
      </div>

      {/* Two-Column Explorer Container (Vertical Tabs on left, Cards on right) */}
      <div className="how-atpl-criteria-container">
        
        {/* Left Column: Vertical Tabs */}
        <div
          role="tablist"
          aria-label="Comparison criteria selection"
          className="how-atpl-tablist"
        >
          {COMPARISON_DATA.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={item.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                role="tab"
                id={`criteria-tab-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`criteria-panel-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`how-atpl-tab-btn ${isSelected ? 'is-selected' : ''}`}
                style={{
                  position: 'relative',
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                  border: isSelected ? '1px solid rgba(3, 105, 161, 0.25)' : '1px solid transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 18px rgba(3, 105, 161, 0.08)' : 'none'
                }}
              >
                {/* Active Sliding Indicator Highlight */}
                {isSelected && (
                  <motion.div
                    layoutId="active-tab-highlight"
                    className="how-atpl-active-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32,
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: '#0369a1',
                      borderRadius: '4px 0 0 4px',
                    }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      color: isSelected ? '#0369a1' : '#94a3b8',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}>
                      Benchmark 0{idx + 1}
                    </div>
                    <div style={{
                      fontSize: '0.94rem',
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? '#0f172a' : '#475569',
                      lineHeight: 1.3
                    }}>
                      {item.criterion}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '12px',
                    color: isSelected ? '#0369a1' : 'transparent',
                    fontWeight: 900
                  }}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Comparison Cards (Swapped with AnimatePresence) */}
        <div
          role="tabpanel"
          id={`criteria-panel-${currentCriterion.id}`}
          aria-labelledby={`criteria-tab-${currentCriterion.id}`}
          style={{ flex: 1, minWidth: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCriterion.id}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24, rotateX: 6 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -14, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                perspective: 1000
              }}
            >
              {/* Card 1: ATPL Turnkey Engineering (Highlighted & Larger) */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="how-atpl-comparison-card atpl-card"
                style={{
                  background: 'linear-gradient(145deg, rgba(240, 249, 255, 0.98) 0%, rgba(224, 242, 254, 0.75) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '2px solid #0369a1',
                  borderRadius: '20px',
                  padding: '1.85rem',
                  boxShadow: '0 16px 36px -8px rgba(3, 105, 161, 0.2), 0 0 24px rgba(34, 211, 238, 0.14)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Accent Ribbon */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #22d3ee 0%, #0369a1 100%)'
                }} />

                <div>
                  {/* Badge & Vendor Title */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#0369a1',
                      background: 'rgba(3, 105, 161, 0.12)',
                      border: '1px solid rgba(34, 211, 238, 0.4)'
                    }}>
                      <CheckCircle2 size={13} style={{ color: '#0284c7' }} />
                      <span>TURNKEY STANDARD</span>
                    </div>

                    <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 800, color: '#0369a1' }}>
                      P01
                    </span>
                  </div>

                  <h4 style={{
                    fontSize: '1.18rem',
                    fontWeight: 900,
                    color: '#0f172a',
                    margin: '0 0 0.25rem',
                    lineHeight: 1.3
                  }}>
                    ATPL Turnkey Engineering
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 700, marginBottom: '1.25rem' }}>
                    Hardware + In-House Software
                  </div>

                  {/* Headline Spec */}
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#0369a1',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.35
                  }}>
                    {currentCriterion.atpl.headline}
                  </div>

                  {/* Description Copy */}
                  <p style={{
                    fontSize: '0.92rem',
                    color: '#334155',
                    lineHeight: 1.62,
                    margin: 0
                  }}>
                    {currentCriterion.atpl.description}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(3, 105, 161, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#047857'
                }}>
                  <Check size={14} strokeWidth={3} />
                  <span>Guaranteed by ATPL Engineering SLA</span>
                </div>
              </motion.div>

              {/* Card 2: Traditional Resellers (Muted White) */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="how-atpl-comparison-card competitor-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(226, 232, 240, 0.95)',
                  borderRadius: '20px',
                  padding: '1.85rem',
                  boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)'
                    }}>
                      <XCircle size={13} style={{ color: '#ef4444' }} />
                      <span>FRAGMENTED</span>
                    </div>

                    <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 800, color: '#94a3b8' }}>
                      P02
                    </span>
                  </div>

                  <h4 style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: '#334155',
                    margin: '0 0 0.25rem',
                    lineHeight: 1.3
                  }}>
                    Traditional Resellers
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '1.25rem' }}>
                    Hardware Box-Pushers
                  </div>

                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#ef4444',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.35
                  }}>
                    {currentCriterion.resellers.headline}
                  </div>

                  <p style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {currentCriterion.resellers.description}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(226, 232, 240, 0.8)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#94a3b8'
                }}>
                  Standard OEM pass-through warranty
                </div>
              </motion.div>

              {/* Card 3: Mega Software Vendors (Muted White) */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="how-atpl-comparison-card competitor-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(226, 232, 240, 0.95)',
                  borderRadius: '20px',
                  padding: '1.85rem',
                  boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)'
                    }}>
                      <XCircle size={13} style={{ color: '#ef4444' }} />
                      <span>MONOLITHIC</span>
                    </div>

                    <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 800, color: '#94a3b8' }}>
                      P03
                    </span>
                  </div>

                  <h4 style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: '#334155',
                    margin: '0 0 0.25rem',
                    lineHeight: 1.3
                  }}>
                    Mega Software Vendors
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '1.25rem' }}>
                    Rigid COTS Monoliths
                  </div>

                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#ef4444',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.35
                  }}>
                    {currentCriterion.mega.headline}
                  </div>

                  <p style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {currentCriterion.mega.description}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(226, 232, 240, 0.8)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#94a3b8'
                }}>
                  Excludes shopfloor optics &amp; vibration
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
});

// ============================================================================
// 4. MAIN EXPORTED COMPONENT: HOW ATPL COMPARES SECTION
// ============================================================================
export const HowAtplComparesSection = memo(() => {
  return (
    <section
      id="how-atpl-compares"
      style={{
        padding: '5.5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Component-scoped CSS styles for responsive layout and hover interactions */}
      <style>{`
        .how-atpl-criteria-container {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .how-atpl-tablist {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .how-atpl-tab-btn:hover {
          background: rgba(255, 255, 255, 0.85) !important;
        }
        .how-atpl-tab-btn:focus-visible {
          outline: 2px solid #0369a1 !important;
          outline-offset: 2px;
        }
        .how-atpl-comparison-card:hover {
          transform: translateY(-4px) !important;
        }
        .how-atpl-comparison-card.atpl-card:hover {
          box-shadow: 0 20px 45px -8px rgba(3, 105, 161, 0.28), 0 0 28px rgba(34, 211, 238, 0.2) !important;
        }
        .how-atpl-comparison-card.competitor-card:hover {
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08) !important;
        }

        /* Responsive styling for Tablet & Mobile (below 860px) */
        @media (max-width: 860px) {
          .how-atpl-criteria-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          .how-atpl-tablist {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            gap: 0.5rem;
          }
          .how-atpl-tab-btn {
            width: auto !important;
            white-space: nowrap;
            flex-shrink: 0;
            padding: 0.75rem 1rem !important;
          }
          .how-atpl-active-indicator {
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            top: auto !important;
            width: 100% !important;
            height: 3px !important;
            border-radius: 0 0 4px 4px !important;
          }
        }
      `}</style>

      {/* Section Headline (Exact Copy Preserved 100%) */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '999px',
          padding: '4px 14px',
          marginBottom: '1rem',
          fontSize: '11.5px',
          fontWeight: 800,
          color: '#059669',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>
          <ShieldCheck size={14} />
          <span>Honest Evaluation</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
          fontWeight: 900,
          color: '#0f172a',
          margin: '0 0 1rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          fontFamily: 'var(--font-display, "Outfit", sans-serif)'
        }}>
          How ATPL Compares
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
          Compare ATPL's turnkey engineering against traditional hardware resellers and rigid enterprise software monoliths.
        </p>
      </div>

      {/* Part 1: "Race to go-live" (Animated Timeline with Scrubber & Live Clock) */}
      <RaceToGoLivePanel />

      {/* Part 2: Criteria Explorer (Interactive Tabs & Staggered Comparison Cards) */}
      <CriteriaExplorer />

    </section>
  );
});

export default HowAtplComparesSection;
