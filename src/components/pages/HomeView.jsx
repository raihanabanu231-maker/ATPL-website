import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { FactoryBlueprintMap } from '../common/FactoryBlueprintMap';
import { OfficialPartnersShowcase } from '../common/PartnerLogos';
import { DotMatrixHandsSection } from '../common/DotMatrixHandsSection';
import { AuthenticClientsMarquee } from '../common/ClientBrandLogos';
import { MadeInIndiaSection } from '../common/MadeInIndiaSection';
import { CustomerStoriesCarousel } from '../common/CustomerStoriesCarousel';
import { CoreValuesSection } from '../common/CoreValuesSection';
import { AtplCommunitySection } from '../common/AtplCommunitySection';
import { Archie3DRobotSection } from '../common/Archie3DRobotSection';
import { ParallaxTiltCard } from '../ui/parallax-tilt-card';
import { ShineBadge } from '../ui/shine-badge';
import { BentoCard } from '../ui/bento-card';
import { GlowEffect } from '../ui/glow-effect';
import { MagneticButton } from '../ui/magnetic-button';
import { SpotlightCard } from '../ui/spotlight-card';
import { LiveMetricsRibbon } from '../ui/live-metrics-ribbon';
import { AnimatedTabs } from '../ui/animated-tabs';
import { 
  ShieldCheck, 
  PhoneCall, 
  ArrowRight, 
  Download, 
  CheckCircle2,
  Boxes,
  Radio,
  Eye,
  Smartphone,
  Sparkles,
  Cpu,
  Layers,
  ShoppingCart,
  Zap,
  Package,
  Landmark,
  HeartPulse,
  Building2,
  Factory,
  Flame,
  Pill,
  Truck,
  Lightbulb,
  Store,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

export const HomeView = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/ATPL_Smart_Factory_Overview_2026.pdf';
    link.setAttribute('download', 'ATPL_Smart_Factory_Overview_2026.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>

      {/* =========================================================================
          1. SPLIT HERO SECTION: HERO HEADLINE & CTAS (LEFT) + 3D FACTORY BLUEPRINT TOUR (RIGHT)
         ========================================================================= */}
      <section 
        id="hero-split-master"
        aria-label="Archery Technocrats Smart Factory Automation and Interactive Shopfloor Tour"
        style={{
          position: 'relative',
          backgroundColor: '#040914',
          color: '#ffffff',
          paddingTop: 'clamp(2rem, 3.5vh, 3.25rem)',
          paddingBottom: 'clamp(2rem, 3.5vh, 3.25rem)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Cockpit Ambient Lighting Glows */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '650px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '750px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.12) 0%, rgba(232, 88, 116, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 clamp(1rem, 2vw, 2rem)' }}>
          <style>{`
            .hero-master-split-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
              align-items: center;
            }
            @media (min-width: 1080px) {
              .hero-master-split-grid {
                grid-template-columns: minmax(440px, 0.9fr) minmax(580px, 1.3fr);
                gap: 2.25rem;
              }
            }
            .hero-cta-btn-primary {
              background-color: #0071ba;
              color: #ffffff;
              border: 1px solid rgba(0, 240, 255, 0.4);
              padding: 0.85rem 1.65rem;
              font-size: 0.96rem;
              font-weight: 700;
              border-radius: 8px;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              min-height: 48px;
              box-shadow: 0 4px 20px rgba(0, 113, 186, 0.45);
              transition: all 0.15s ease;
            }
            .hero-cta-btn-primary:hover {
              background-color: #005a96;
              box-shadow: 0 6px 24px rgba(0, 240, 255, 0.4);
              transform: translateY(-1px);
            }
            .hero-cta-btn-secondary {
              background-color: rgba(255, 255, 255, 0.05);
              color: #ffffff;
              border: 1.5px solid rgba(255, 255, 255, 0.22);
              padding: 0.85rem 1.45rem;
              font-size: 0.96rem;
              font-weight: 700;
              border-radius: 8px;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              min-height: 48px;
              transition: all 0.15s ease;
            }
            .hero-cta-btn-secondary:hover {
              border-color: #00f0ff;
              color: #00f0ff;
              background-color: rgba(0, 240, 255, 0.08);
              transform: translateY(-1px);
            }
            .hero-cta-btn-download {
              background-color: rgba(232, 88, 116, 0.12);
              color: #ff758f;
              border: 1px solid rgba(232, 88, 116, 0.35);
              padding: 0.85rem 1.25rem;
              font-size: 0.92rem;
              font-weight: 700;


              border-radius: 8px;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.45rem;
              min-height: 48px;
              transition: all 0.15s ease;
            }
            .hero-cta-btn-download:hover {
              background-color: rgba(232, 88, 116, 0.22);
              transform: translateY(-1px);
            }
            .hero-cta-btn-video {
              background-color: rgba(239, 68, 68, 0.15);
              color: #f87171;
              border: 1px solid rgba(239, 68, 68, 0.35);
              padding: 0.85rem 1.25rem;
              font-size: 0.92rem;
              font-weight: 700;
              border-radius: 8px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.45rem;
              min-height: 48px;
              text-decoration: none;
              transition: all 0.15s ease;
            }
            .hero-cta-btn-video:hover {
              background-color: rgba(239, 68, 68, 0.25);
              transform: translateY(-1px);
            }
          `}</style>

          <div className="hero-master-split-grid">
            {/* Left Column: Hero Headline, Subhead, CTAs & Proof Points */}
            <motion.div 
              className="hero-split-left-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Operational Accreditation Header */}
              <div style={{ marginBottom: '0.85rem', fontSize: '0.85rem', color: 'var(--color-brand-cyan, #00f0ff)', fontWeight: 600 }}>
                Archery Technocrats, 35+ Years Combined Industrial Experience, ISO 9001:2015
              </div>

              {/* Main Headline (Optimized H1 for SEO with Archery Technocrats brand & target keywords) */}
              <motion.h1 
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(1.95rem, 3.2vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.18,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-white, #ffffff)',
                  marginBottom: '1.1rem',
                  fontFamily: 'var(--font-display)'
                }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                  fontWeight: 700,
                  color: 'var(--color-brand-cyan, #00f0ff)',
                  marginBottom: '0.35rem'
                }}>
                  Archery Technocrats
                </span>
                Factory Automation That Actually Works on the Shop Floor.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                style={{
                  fontSize: 'clamp(0.92rem, 1.15vw, 1.08rem)',
                  color: '#94a3b8',
                  lineHeight: 1.62,
                  maxWidth: '680px',
                  marginBottom: '1.75rem'
                }}
              >
                We build warehouse management software, RFID tracking portals, and inline vision systems that connect straight to your SAP or Oracle ERP. Built, installed, and supported by engineers who understand Indian plant realities.
              </motion.p>

              {/* Action CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginBottom: '1.85rem' }}
              >
                {/* Primary CTA with 21st.dev GlowEffect aura & Magnetic pull */}
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <GlowEffect colors={['#00f0ff', '#0071ba', '#38bdf8', '#0284c7']} mode="breathe" blur="soft" duration={4} scale={1.12} />
                  <MagneticButton
                    onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Engineering Consultation', notes: 'Initiated from Homepage Hero' })}
                    className="hero-cta-btn-primary"
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <PhoneCall size={18} />
                    <span>Talk to an Automation Engineer</span>
                  </MagneticButton>
                </div>

                <MagneticButton
                  onClick={() => openDemoModal({ mode: 'demo', solution: 'Plant Feasibility Walkthrough', notes: 'Initiated from Hero secondary button' })}
                  className="hero-cta-btn-secondary"
                >
                  <span>Schedule Plant Walkthrough</span>
                </MagneticButton>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadBrochure}
                  className="hero-cta-btn-download"
                  title="Download ATPL Smart Factory Product & Engineering Overview PDF"
                >
                  <Download size={16} />
                  <span>Overview PDF</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.youtube.com/watch?v=4urwO-BZy08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn-video"
                  title="Watch ATPL Corporate Overview Video on YouTube"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Watch Video</span>
                </motion.a>
              </motion.div>

              {/* Key practical facts strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.35rem', fontSize: '0.84rem', color: '#cbd5e1' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> Live Two-Way SAP & Oracle Sync
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> Rollouts in 2 to 4 Weeks
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> 4-Hour On-Site Support SLA in South India
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive Factory Blueprint Tour */}
            <div className="hero-split-right-panel" style={{ width: '100%', minWidth: 0 }}>
              <FactoryBlueprintMap embedded={true} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. REAL-TIME TELEMETRY & PRODUCTION METRICS RIBBON (21st.dev Animated Live Counter)
         ========================================================================= */}
      <LiveMetricsRibbon />

      {/* =========================================================================
          3. AUTHENTIC ENTERPRISE CLIENT LOGOS STRIP
         ========================================================================= */}
      <section style={{ backgroundColor: '#f8fafc', padding: '2.5rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
            TRUSTED BY 250+ ENTERPRISE MANUFACTURING PLANTS & SUPPLY CHAIN HUBS
          </div>
        </div>

        {/* Client Logos Marquee */}
        <AuthenticClientsMarquee direction="left" speed={40} />
      </section>

      {/* =========================================================================
          4. MADE IN INDIA. ENGINEERED FOR THE WORLD. (ATPL Domestic R&D & Global Execution)
         ========================================================================= */}
      <MadeInIndiaSection />

      {/* =========================================================================
          5. ARCHIE 3D, THINKING MACHINES FOR INDUSTRY 4.0 (Interactive Autonomous Robot Agent)
         ========================================================================= */}
      <Archie3DRobotSection />

      {/* =========================================================================
          6. ATPL COMMUNITY & ENGINEERING FORCE (Team & Leadership Section)
         ========================================================================= */}
      <AtplCommunitySection />

      {/* =========================================================================
          7. REAL CUSTOMER STORIES (Cinematic Carousel Banner)
         ========================================================================= */}
      <CustomerStoriesCarousel />

      {/* =========================================================================
          8. CORE VALUES & PRINCIPLES (Editorial Principles Section)
         ========================================================================= */}
      <CoreValuesSection />

      {/* =========================================================================
          9. OUR INDUSTRIES (15 Official Sectors from atplgroup.com)
         ========================================================================= */}
      <section 
        id="atpl-industries-section"
        style={{
          padding: '5.5rem 0 5rem 0',
          backgroundColor: '#070d18',
          borderTop: '1px solid rgba(0, 240, 255, 0.2)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(1rem, 2vw, 2.5rem)', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#00f0ff',
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              padding: '0.3rem 0.9rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              TRANSITION TO DIGITAL TRANSFORMATION
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1rem 0'
            }}>
              Our <span className="gradient-text">Industries</span>
            </h2>
            <p style={{
              fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
              color: '#94a3b8',
              lineHeight: 1.65,
              margin: 0
            }}>
              We integrate our products and services across various industries where automation is essential, catering to those seeking to transition from traditional methods to digital transformation.
            </p>
          </div>

            {/* 15 Industries Responsive Grid with 21st.dev Spotlight & Lucide Vector Icons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
              gap: '1.25rem'
            }}>
              {[
                { name: 'Automation', icon: Cpu, desc: 'Robotic assembly & PLC line synchronization', color: '#00f0ff' },
                { name: 'Consumer Durable', icon: Layers, desc: 'Traceability & assembly line QC', color: '#38bdf8' },
                { name: 'Consumer Electronics', icon: Smartphone, desc: 'Component serialization & PCB tracking', color: '#818cf8' },
                { name: 'E-Commerce', icon: ShoppingCart, desc: 'High-speed sortation & 3D bin WMS', color: '#f59e0b' },
                { name: 'Electricals', icon: Zap, desc: 'Switchgear & motor manufacturing tracking', color: '#eab308' },
                { name: 'FMCG', icon: Package, desc: 'High-speed packaging aggregation & labeling', color: '#10b981' },
                { name: 'Government', icon: Landmark, desc: 'Asset tagging, tracking & public logistics', color: '#6366f1' },
                { name: 'Healthcare', icon: HeartPulse, desc: 'Medical devices & specimen traceability', color: '#ec4899' },
                { name: 'Infrastructure', icon: Building2, desc: 'Heavy asset RFID & fleet dispatch', color: '#f97316' },
                { name: 'Manufacturing', icon: Factory, desc: 'End-to-end MES & shopfloor automation', color: '#06b6d4' },
                { name: 'Oil & Gas', icon: Flame, desc: 'Hazardous area rugged barcode tracking', color: '#ef4444' },
                { name: 'Pharma', icon: Pill, desc: '21 CFR Part 11 & DGFT serial aggregation', color: '#22c55e' },
                { name: 'Postal & Courier', icon: Truck, desc: 'Last-mile handhelds & parcel sortation', color: '#3b82f6' },
                { name: 'Power', icon: Lightbulb, desc: 'Grid asset tracking & substation audits', color: '#fbbf24' },
                { name: 'Retail', icon: Store, desc: 'Inventory counts & RFID stock visibility', color: '#a855f7' }
              ].map((ind, i) => {
                const IconComp = ind.icon;
                return (
                  <SpotlightCard
                    key={i}
                    spotlightColor={`${ind.color}30`}
                    borderColor="rgba(255, 255, 255, 0.08)"
                    backgroundColor="#0b1329"
                    onClick={() => openDemoModal({ solution: `${ind.name} Automation`, notes: `Inquiry regarding ${ind.name} industry solutions.` })}
                    style={{
                      padding: '1.4rem 1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: `${ind.color}15`,
                        border: `1px solid ${ind.color}35`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComp size={19} color={ind.color} />
                      </div>
                      <h3 style={{ color: '#ffffff', fontSize: '1.02rem', fontWeight: 800, margin: 0 }}>
                        {ind.name}
                      </h3>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                      {ind.desc}
                    </p>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </section>

      {/* =========================================================================
          10. CLIENT TESTIMONIALS (21st.dev Interactive Animated Slider)
         ========================================================================= */}
      <section 
        id="client-testimonials-section"
        style={{
          padding: '5.5rem 0',
          backgroundColor: '#0a0f1d',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto', padding: '0 clamp(1rem, 2vw, 2.5rem)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', fontWeight: 800, color: 'var(--color-white, #ffffff)', marginBottom: '2.5rem' }}>
            Client Testimonials & Production Proof
          </h2>

          <div style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 16, 30, 0.95) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.55)',
            position: 'relative'
          }}>
            {/* Sector Badge & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: [
                  '#00f0ff',
                  '#38bdf8',
                  '#10b981'
                ][activeTestimonialIdx],
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono, monospace)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {[
                  'General Manufacturing & RFID',
                  'Automotive & EV Gigafactory',
                  'Pharmaceuticals & 21 CFR Part 11'
                ][activeTestimonialIdx]}
              </span>

              <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" stroke="none" />
                ))}
              </div>
            </div>

            {/* Quote with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ fontSize: '2.5rem', color: '#00f0ff', lineHeight: 1, marginBottom: '0.75rem', fontFamily: 'serif' }}>
                  “
                </div>
                <blockquote style={{
                  color: '#f1f5f9',
                  fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  maxWidth: '820px',
                  margin: '0 auto 2rem auto',
                  minHeight: '90px'
                }}>
                  {[
                    `"My experience with ATPL is wonderful. The service and products are of high standards at great prices. The sales reps are some of the best in the business. As a first time customer all my needs were met and we now have great tags for our products. I look forward to placing my next order and working with ATPL for years to come."`,
                    `"ATPL integrated high-speed 2D DataMatrix DPM imagers and inline AI pokayoke inspection across our EV battery cell-to-pack line. We achieved 100% verification at 60 units/hour takt time with zero assembly fitment escapes."`,
                    `"Deploying Perfect Trace™ across our 4 high-speed packaging lines gave us end-to-end parent-child serialization compliant with US-FDA DSCSA and DGFT export mandates. The offline handheld validation was flawless."`
                  ][activeTestimonialIdx]}
                </blockquote>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    border: '2px solid #00f0ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f0ff',
                    fontWeight: 900,
                    fontSize: '1.05rem'
                  }}>
                    {['MV', 'OE', 'RC'][activeTestimonialIdx]}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>
                      {[
                        'Mr. Vinayagam',
                        'Operations & QA Lead',
                        'VP Regulatory Compliance'
                      ][activeTestimonialIdx]}
                    </div>
                    <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600 }}>
                      {[
                        'Senior Consultant, Industrial Manufacturing & RFID',
                        'Tier-1 Supplier to Leading EV 2-Wheeler Gigafactory',
                        'Global Formulations Exporter (US-FDA DSCSA & EU-FMD)'
                      ][activeTestimonialIdx]}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Carousel Nav Buttons & Dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
              <button
                onClick={() => setActiveTestimonialIdx(prev => (prev === 0 ? 2 : prev - 1))}
                aria-label="Previous testimonial"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    style={{
                      width: activeTestimonialIdx === idx ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '999px',
                      backgroundColor: activeTestimonialIdx === idx ? '#00f0ff' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonialIdx(prev => (prev === 2 ? 0 : prev + 1))}
                aria-label="Next testimonial"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. STRATEGIC OEM HARDWARE PARTNERS SHOWCASE
         ========================================================================= */}
      <section id="partner-section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
        {/* Joining Hands for Smarter Factories Dot-Matrix Canvas Engine */}
        <DotMatrixHandsSection 
          headline1="Joining Hands for"
          headline2="Smarter Factories."
          subline="When Tier-1 OEM hardware joins hands with in-house automation software, shopfloors eliminate bottlenecks and achieve zero-defect manufacturing."
          ctaText="Partner With ATPL"
        />

        <div className="container" style={{ padding: '3.5rem 0' }}>
          <OfficialPartnersShowcase theme="light" />
        </div>
      </section>

      {/* =========================================================================
          12. FINAL CALL TO ACTION (21st.dev GlowEffect & Magnetic Button)
         ========================================================================= */}
      <section style={{
        backgroundColor: '#0f172a',
        padding: '5rem 0',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--color-white, #ffffff)', letterSpacing: '-0.025em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Have a Bottleneck on Your Line? Let’s Walk Your Floor.
          </h2>

          <p style={{ color: 'var(--color-slate-400, #94a3b8)', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Invite an ATPL systems engineer to review your dispatch dock, packing line, or warehouse layout. We will give you a practical assessment of where automation makes sense — and where it doesn't.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '3rem' }}>
            {/* Luminous Magnetic Button */}
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <GlowEffect colors={['#00f0ff', '#0071ba', '#38bdf8', '#0284c7']} mode="breathe" blur="soft" duration={4} scale={1.15} />
              <MagneticButton
                onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Walkthrough Audit', notes: 'Initiated from Final CTA' })}
                style={{
                  backgroundColor: 'var(--color-brand-blue, #0071ba)',
                  color: 'var(--color-white, #ffffff)',
                  border: 'none',
                  padding: '1rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 25px rgba(0, 113, 186, 0.45)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span>Schedule a Plant Visit</span>
              </MagneticButton>
            </div>

            <MagneticButton
              onClick={() => window.location.href = 'tel:04435537618'}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={17} />
              <span>Call Chennai HQ: 044 3553 7618</span>
            </MagneticButton>
          </div>

          {/* Plant & Contact Information Grid */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
            fontSize: '0.85rem',
            color: '#94a3b8'
          }}>
            <address
              itemScope
              itemType="https://schema.org/PostalAddress"
              style={{ fontStyle: 'normal' }}
            >
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Chennai Head Office</strong>
              <div itemProp="streetAddress">TIDEL Park, G11 Ground Floor, No. 4 Canal Bank Rd, Taramani</div>
              <div>
                <span itemProp="addressLocality">Chennai</span>,{' '}
                <span itemProp="addressRegion">Tamil Nadu</span> –{' '}
                <span itemProp="postalCode">600113</span>
              </div>
              <div itemProp="addressCountry">India</div>
            </address>

            <address
              itemScope
              itemType="https://schema.org/PostalAddress"
              style={{ fontStyle: 'normal' }}
            >
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Madurai R&D Labs</strong>
              <div itemProp="streetAddress">TCE-TBI, Thiagarajar College of Engineering Campus</div>
              <div>
                <span itemProp="addressLocality">Madurai</span>,{' '}
                <span itemProp="addressRegion">Tamil Nadu</span> –{' '}
                <span itemProp="postalCode">625015</span>
              </div>
              <div style={{ marginTop: '0.25rem', color: '#38bdf8' }}>Regional Hub: Hosur &amp; Bengaluru</div>
            </address>

            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Direct Helplines</strong>
              <div>Sales: <a href="tel:+916380859963" style={{ color: '#cbd5e1', textDecoration: 'none' }}>+91 63808 59963</a></div>
              <div>Support: <a href="tel:+917200157626" style={{ color: '#cbd5e1', textDecoration: 'none' }}>+91 72001 57626</a></div>
              <div>Toll-Free: <a href="tel:1800120774777" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>1800-120-774777</a></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
