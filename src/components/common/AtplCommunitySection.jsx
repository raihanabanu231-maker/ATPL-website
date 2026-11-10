import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Globe2,
  Cpu
} from 'lucide-react';
import { NumberTicker } from '../ui/number-ticker';
import { MagneticButton } from '../ui/magnetic-button';
import { GlowEffect } from '../ui/glow-effect';
import { ShineBadge } from '../ui/shine-badge';
import { SpotlightCard } from '../ui/spotlight-card';
import { ParallaxTiltCard } from '../ui/parallax-tilt-card';
import { AnimatedTabs } from '../ui/animated-tabs';

/**
 * LaurelWreath: Authentic laurel wreath SVG icon with ATPL Logo Blue & light styling,
 * now enhanced with 21st.dev NumberTicker for animated scroll telemetry.
 */
function LaurelWreath({ number, label, accentColor = '#299fe0', tickerVal, tickerSuffix = '' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem'
      }}
    >
      {/* Left Laurel Branch */}
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M18 2C16 8 11 13 6 18C2 22 2 28 6 33C8 35 12 36 18 36" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 6C10 9 6 10 3 9" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 14C8 16 5 18 2 17" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 22C7 24 4 27 2 26" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 30C10 31 7 33 5 33" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>

      {/* Number and Label */}
      <div style={{ textAlign: 'left' }}>
        <div style={{
          fontSize: '1.45rem',
          fontWeight: 900,
          color: '#f8fafc',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px'
        }}>
          {tickerVal !== undefined ? (
            <NumberTicker value={tickerVal} suffix={tickerSuffix} />
          ) : (
            number
          )}
        </div>
        <div style={{
          fontSize: '0.84rem',
          color: '#94a3b8',
          fontWeight: 600,
          marginTop: '0.15rem'
        }}>
          {label}
        </div>
      </div>

      {/* Right Laurel Branch */}
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M4 2C6 8 11 13 16 18C20 22 20 28 16 33C14 35 10 36 4 36" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M8 6C12 9 16 10 19 9" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 14C14 16 17 18 20 17" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 22C15 24 18 27 20 26" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 30C12 31 15 33 17 33" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
}

/**
 * AtplCommunitySection: Upgraded with 21st.dev Animated Architecture & 5-Pillar Motion
 * - NumberTicker animated counters
 * - MagneticButton + GlowEffect CTA
 * - 3D ParallaxTiltCard with dynamic cursor spotlight
 * - AnimatedTabs sliding spring pill selector
 */
export function AtplCommunitySection() {
  const { openDemoModal, setCurrentView } = useApp();
  const [activePhotoTab, setActivePhotoTab] = useState('team'); // 'team' | 'founder'

  const photoTabs = [
    { id: 'team', label: 'ATPL Engineering Team', icon: <Users size={15} /> },
    { id: 'founder', label: 'Leadership & Founder', icon: <ShieldCheck size={15} /> }
  ];

  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: '#070d18',
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(0, 113, 186, 0.22) 0%, transparent 45%),
          radial-gradient(circle at 85% 75%, rgba(232, 88, 116, 0.16) 0%, transparent 50%),
          linear-gradient(180deg, #060b14 0%, #0a1324 50%, #060b14 100%)
        `,
        padding: '5.5rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 113, 186, 0.25)',
        borderBottom: '1px solid rgba(0, 113, 186, 0.25)'
      }}
    >
      {/* Volumetric Optical Glows (Genjutsu Aura) */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Subtle Background Cityscape / Smart Factory Skyline Vector */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '70px',
          right: 0,
          width: '55vw',
          height: '280px',
          opacity: 0.08,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' fill='%230071ba'%3E%3Crect x='50' y='120' width='60' height='180'/%3E%3Crect x='130' y='80' width='80' height='220'/%3E%3Cpolygon points='170,20 150,80 190,80'/%3E%3Crect x='230' y='140' width='50' height='160'/%3E%3Crect x='300' y='60' width='90' height='240'/%3E%3Crect x='410' y='110' width='70' height='190'/%3E%3Crect x='500' y='90' width='110' height='210'/%3E%3Cpolygon points='555,30 535,90 575,90'/%3E%3Crect x='630' y='130' width='65' height='170'/%3E%3Crect x='715' y='70' width='85' height='230'/%3E%3Crect x='820' y='100' width='95' height='200'/%3E%3Cpolygon points='867,40 850,100 885,100'/%3E%3Crect x='935' y='135' width='60' height='165'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',
          backgroundSize: 'contain',
          zIndex: 0
        }}
      />

      <div 
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Main Grid: Left Column Text & Metrics, Right Column Team Photo Montage */}
        <div 
          className="atpl-community-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem 4.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem'
          }}
        >
          {/* =========================================================================
              LEFT COLUMN: Community Content & Metrics
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Luminous Shine Badge */}
            <div style={{ marginBottom: '1.5rem' }}>
              <ShineBadge variant="cyan" icon={<Users size={16} color="#00f0ff" />}>
                ATPL Community, 2,500+ Shopfloor Practitioners
              </ShineBadge>
            </div>

            {/* Main Headline */}
            <h2 
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.14,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-display, Inter, sans-serif)'
              }}
            >
              Where Innovators Connect &amp; <span className="gradient-text">Build the Future.</span>
            </h2>

            {/* Subtitle / Value Proposition */}
            <p 
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.22rem)',
                lineHeight: 1.65,
                color: '#94a3b8',
                marginBottom: '2.25rem',
                maxWidth: '520px'
              }}
            >
              Connect with Industry 4.0 practitioners, systems architects, and factory automation pioneers across India’s leading discrete manufacturing and warehousing hubs.
            </p>

            {/* CTA Button: Magnetic Coral Pill Button with Luminous Aura */}
            <div style={{ marginBottom: '2.75rem', display: 'inline-flex', position: 'relative' }}>
              <GlowEffect colors={['#E85874', '#ff7b92', '#00f0ff', '#0071ba']} mode="breathe" blur="soft" duration={3.5} scale={1.12} />
              <MagneticButton
                onClick={() => openDemoModal({ mode: 'community', solution: 'ATPL Community & Engineering Network' })}
                style={{
                  backgroundColor: '#E85874',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.95rem 2.4rem',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(232, 88, 116, 0.45)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span>JOIN NOW</span>
                <ChevronRight size={18} strokeWidth={3} />
              </MagneticButton>
            </div>

            {/* Social Proof Laurel Wreath Metrics with NumberTicker */}
            <div 
              className="atpl-laurel-metrics"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                flexWrap: 'wrap',
                paddingTop: '0.5rem'
              }}
            >
              <LaurelWreath tickerVal={250} tickerSuffix="+" label="Enterprise Clients" accentColor="#299fe0" />
              
              {/* Vertical divider */}
              <div className="atpl-laurel-divider" style={{ width: '1px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
              
              <LaurelWreath tickerVal={35} tickerSuffix="+ Yrs" label="Domain Legacy" accentColor="#E85874" />

              {/* Vertical divider */}
              <div className="atpl-laurel-divider" style={{ width: '1px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

              <LaurelWreath tickerVal={6} tickerSuffix=" Hubs" label="Pan-India Branches" accentColor="#00f0ff" />
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Real Team & Leadership Showcase with 3D Tilt & Spotlight
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Top Toggle Pills with 21st.dev AnimatedTabs */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                position: 'relative',
                zIndex: 3
              }}
            >
              <AnimatedTabs 
                tabs={photoTabs}
                activeTab={activePhotoTab}
                onSelectTab={setActivePhotoTab}
                layoutId="communityPhotoTab"
                size="sm"
              />
            </div>

            {/* Team / Leadership Showcase Stage with 3D Mouse Parallax Tilt & Spotlight */}
            <ParallaxTiltCard tiltFactor={8}>
              <SpotlightCard
                spotlightColor="rgba(0, 240, 255, 0.25)"
                borderColor="rgba(0, 113, 186, 0.4)"
                backgroundColor="#0b1528"
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 113, 186, 0.2)'
                }}
              >
                {/* Photo Display with Animated Cross-Fade */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhotoTab}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img 
                        src={activePhotoTab === 'team' ? "/assets/images/atpl_team_full_group.png" : "/assets/images/amarnath_paramasivam.jpg"}
                        alt={activePhotoTab === 'team' 
                          ? "Archery Technocrats Private Limited - Authentic Engineering Team at Industrial Expo" 
                          : "Amarnath Paramasivam - Founder & Managing Director, Archery Technocrats"}
                        width="800"
                        height="440"
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '430px',
                          aspectRatio: '730 / 440',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          display: 'block'
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dedicated Caption Bar: Clean, professional name & title with verification badges */}
                <div 
                  style={{
                    background: 'linear-gradient(180deg, #091325 0%, #060c18 100%)',
                    borderTop: '1px solid rgba(0, 113, 186, 0.25)',
                    padding: '1.25rem 1.6rem',
                    color: '#ffffff',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '1.24rem', 
                        fontWeight: 800, 
                        color: '#ffffff', 
                        letterSpacing: '-0.015em',
                        lineHeight: 1.25
                      }}>
                        {activePhotoTab === 'team' ? 'Archery Technocrats Engineering Force' : 'Amarnath Paramasivam'}
                      </div>
                      <div style={{ 
                        fontSize: '0.88rem', 
                        color: activePhotoTab === 'team' ? '#94a3b8' : '#38bdf8', 
                        fontWeight: 600,
                        marginTop: '0.3rem',
                        lineHeight: 1.4
                      }}>
                        {activePhotoTab === 'team' 
                          ? 'In-House Software Engineers, AIDC Integrators & Shopfloor Deployment Specialists' 
                          : 'Founder & Managing Director, Mechanical Engineer & MBA, 15+ Yrs AIDC Leadership'}
                      </div>
                      {activePhotoTab === 'founder' && (
                        <blockquote style={{
                          margin: '0.65rem 0 0 0',
                          paddingLeft: '0.75rem',
                          borderLeft: '2px solid #E85874',
                          color: '#e2e8f0',
                          fontSize: '0.85rem',
                          fontStyle: 'italic',
                          lineHeight: 1.5
                        }}>
                          "We should not hesitate to take risks to accomplish our commitments. Target Perfection."
                        </blockquote>
                      )}
                    </div>

                    {/* Verification Badges in Caption */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      flexWrap: 'wrap'
                    }}>
                      {activePhotoTab === 'founder' ? (
                        <div style={{
                          backgroundColor: 'rgba(56, 189, 248, 0.12)',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#38bdf8'
                        }}>
                          <ShieldCheck size={14} color="#38bdf8" />
                          <span>40 to 200+ Enterprise Clients</span>
                        </div>
                      ) : (
                        <div style={{
                          backgroundColor: 'rgba(232, 88, 116, 0.14)',
                          border: '1px solid rgba(232, 88, 116, 0.4)',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#ffffff'
                        }}>
                          <Sparkles size={14} color="#E85874" />
                          <span>ISO 9001:2015</span>
                        </div>
                      )}

                      <div style={{
                        backgroundColor: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.4)',
                        borderRadius: '8px',
                        padding: '0.4rem 0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#ffffff'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#00f0ff',
                          boxShadow: '0 0 8px #00f0ff'
                        }} />
                        <span>100% In-House R&amp;D</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ParallaxTiltCard>

          </motion.div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .atpl-community-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .atpl-laurel-metrics {
            gap: 1.25rem !important;
            justify-content: center !important;
          }
          .atpl-laurel-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
