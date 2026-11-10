import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Filter,
  BarChart3,
  Clock,
  Layers,
  MapPin,
  ChevronRight,
  Quote
} from 'lucide-react';
import { REAL_CLIENTS_DATA } from '../../data/realClientsData';
import { ProximityScaleGrid } from '../common/ProximityScaleGrid';
import { ScrollReveal } from '../ui/scroll-reveal';

// Featured Production Case Studies directly from ATPL's official client roster (atplgroup.com)
const FEATURED_CASE_STUDIES = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    category: 'EV TWO-WHEELER MEGA-FACTORY',
    headline: '2-Minute Allocation & Battery Pack Serialization',
    sub: 'FutureFactory EV Assembly (Tamil Nadu)',
    image: '/assets/images/hw_electronics_qc.jpg',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    metric: '2 Min',
    metricLabel: 'Shift Resource Allocation Speed',
    software: 'PERFECT TRACE & PERFECT PMS',
    summary: 'Integrated industrial DPM laser marking scanners and high-density mobile terminals to serialize battery cells and track assembly in real time.',
    challenge: 'Scaling to thousands of electric scooters per day required millisecond traceability of powertrain sub-assemblies and battery modules to ensure AIS-156 safety compliance.',
    solution: 'ATPL engineered Direct Part Mark (DPM) cognitive area imagers paired with ATPL PERFECT TRACE and MES work-in-progress software.',
    results: [
      'Resource allocation cycle slashed from 2 hours down to 2 minutes',
      'End-to-end component traceability for 100% of manufactured battery packs',
      'Direct compliance with AIS-156 EV safety standards'
    ]
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    category: 'HIGH-TECH CONSUMER EMS',
    headline: 'Sub-Second Micro-QR Verification on SMT Lines',
    sub: 'High-Density Surface-Mount PCB Assembly',
    image: '/assets/images/atpl_factory_3d_interior.jpg',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    metric: '99.99%',
    metricLabel: 'First-Pass Read Rate',
    software: 'PERFECT VERIFIER & Computer Vision System',
    summary: 'Automated inline 2D DataMatrix vision grading on micro PCB assemblies with instant pneumatic rejection gates and MES synchronization.',
    challenge: 'High-speed surface-mount technology lines required verifying laser-etched 2mm micro-QR codes without reducing conveyor velocity.',
    solution: 'ATPL installed high-resolution fixed-mount computer vision imagers running ATPL PERFECT VERIFIER with 4-millisecond pneumatic diversion gates.',
    results: [
      'Continuous 99.99% first-pass read rates across dense SMT boards',
      'Zero defective PCB sub-assemblies escaped to downstream assembly',
      'Sub-second automated grading conforming to ISO/IEC 15415 standards'
    ]
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    category: '3PL & SUPPLY CHAIN LOGISTICS',
    headline: '3.5× Faster Dock Turnaround & Cross-Docking WMS',
    sub: 'Omnichannel Distribution & Fulfillment Hubs (Redington)',
    image: '/assets/images/story_logistics.jpg',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    metric: '3.5×',
    metricLabel: 'Dock Turnaround Speedup',
    software: 'PERFECT WAREHOUSE (WMS)',
    summary: 'End-to-end warehouse execution system with rugged Android mobile terminals for paperless picking, staging, and ASN validation.',
    challenge: 'Handling massive SKU volumes across multi-client distribution centers caused dock bottlenecks, manual reconciliation delays, and dispatch misroutes.',
    solution: 'ATPL implemented PERFECT WAREHOUSE WMS paired with long-range 15-meter mobile scanners and automated barcode carton sorting.',
    results: [
      '3.5× faster inbound dock-to-stock turnaround time',
      '99.98% inventory pick accuracy across 45,000+ active SKUs',
      'Real-time EDI and ERP sync eliminating shipping reconciliation errors'
    ]
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    category: 'AUTOMOTIVE & TYRES',
    headline: '+50% Dispatch Accuracy & Automated RAIN RFID Portals',
    sub: 'Tire Manufacturing & Automated Warehouse Verification',
    image: '/assets/images/story_automotive.jpg',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    metric: '+50%',
    metricLabel: 'Dispatch Verification Accuracy',
    software: 'PERFECT TRACE & PERFECT WAREHOUSE',
    summary: 'Deployed automated RAIN RFID portals and inline 2D barcode verifiers across high-speed tyre curing and dispatch lines, eliminating shipping discrepancies.',
    challenge: 'High-speed vulcanization lines and dense tyre storage created scanning bottlenecks and manual dispatch check delays.',
    solution: 'ATPL engineered rugged RFID overhead tunnel portals paired with Android mobile computers and real-time SAP S/4HANA middleware.',
    results: [
      '100% first-pass read rates through automated tyre conveyor portals',
      '50% reduction in dock loading inspection times',
      'Zero mis-shipment chargebacks across OEM automotive deliveries'
    ]
  }
];

export const CustomersView = () => {
  const { openDemoModal } = useApp();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categories = useMemo(() => [
    { id: 'all', label: 'All Clients', count: REAL_CLIENTS_DATA.length },
    { id: 'Automotive', label: '🚗 Automotive & EV', count: REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes('auto') || c.category?.toLowerCase().includes('tyre')).length },
    { id: 'Heavy', label: '🏗️ Heavy & Engineering', count: REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes('heavy') || c.category?.toLowerCase().includes('tool') || c.category?.toLowerCase().includes('engg')).length },
    { id: 'Pharma', label: '💊 Pharma & Healthcare', count: REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes('pharma') || c.category?.toLowerCase().includes('health')).length },
    { id: 'FMCG', label: '📦 FMCG & Packaging', count: REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes('fmcg') || c.category?.toLowerCase().includes('food') || c.category?.toLowerCase().includes('pack')).length },
    { id: 'Electronics', label: '⚡ Electronics & EMS', count: REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes('electr') || c.category?.toLowerCase().includes('tech')).length }
  ], []);

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return REAL_CLIENTS_DATA.filter(c => {
      const matchesCat = activeCategory === 'all' || 
        (c.category && c.category.toLowerCase().includes(activeCategory.toLowerCase()));
      const matchesSearch = !searchQuery || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ backgroundColor: '#070c18', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          1. TOP ENTERPRISE HERO SECTION (Toptal Inspired Dark Navy Geometric Vibe)
         ========================================================================= */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '4.5rem',
          background: 'linear-gradient(135deg, #070d1e 0%, #0c1836 50%, #081126 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle geometric polygon facet backdrop */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(0, 240, 255, 0.08) 0%, transparent 45%),
              radial-gradient(circle at 85% 65%, rgba(56, 189, 248, 0.06) 0%, transparent 50%),
              linear-gradient(125deg, transparent 40%, rgba(20, 38, 80, 0.45) 40%, rgba(20, 38, 80, 0.45) 60%, transparent 60%)
            `,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Top Pill Badge */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Sparkles size={13} />
              <span>OFFICIAL ENTERPRISE CLIENT ROSTER // 200+ PRODUCTION DEPLOYMENTS</span>
            </span>
          </div>

          {/* Split Header: Left Title / Right Narrative */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'flex-start',
              marginBottom: '3rem'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                  margin: 0
                }}
              >
                Trusted by Leading Industrial Enterprises <span style={{ color: '#00f0ff' }}>Across India</span>
              </h1>
            </div>

            <div style={{ paddingTop: '0.5rem' }}>
              <p
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.68,
                  color: '#cbd5e1',
                  margin: '0 0 1.25rem 0'
                }}
              >
                Archery Technocrats Private Limited (ATPL) is South India's premier industrial automation provider, founded by industry veterans with 35+ years of combined AIDC, RFID, and IT experience. From our Chennai TIDEL Park HQ, Madurai TBI-TCE incubator, and Anantapur center, we empower 200+ enterprise leaders across Automotive, Defense, Electronics, and FMCG.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openDemoModal({ solution: 'Enterprise Case Studies', notes: 'Request full ROI case studies' })}
                  style={{
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 15px rgba(0, 113, 186, 0.4)'
                  }}
                >
                  <span>Request Full Case Studies</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  href="#client-roster"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.65rem 1.3rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span>Browse 200+ Verified Logos</span>
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. FOUR STAT COUNTERS BAR (Exact Toptal-Style Architectural Layout)
             ========================================================================= */}
          <ScrollReveal variant="fade-up" distance={32} duration={0.6}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                padding: '2.2rem 2.5rem',
                backgroundColor: 'rgba(11, 22, 48, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Stat 1 */}
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  ENTERPRISE CLIENTS
                </div>
                <div style={{ fontSize: 'clamp(2.3rem, 3.4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  200+
                </div>
                <div style={{ fontSize: '0.76rem', color: '#38bdf8', marginTop: '0.35rem', fontWeight: 600 }}>
                  Grown from 40 in 2018 across India
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  DAILY INDUSTRIAL SCANS
                </div>
                <div style={{ fontSize: 'clamp(2.3rem, 3.4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  5,000,000+
                </div>
                <div style={{ fontSize: '0.76rem', color: '#10b981', marginTop: '0.35rem', fontWeight: 600 }}>
                  Processed on ATPL WMS &amp; Barcode Systems
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  AIDC &amp; IT HERITAGE
                </div>
                <div style={{ fontSize: 'clamp(2.3rem, 3.4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  35+ Yrs
                </div>
                <div style={{ fontSize: '0.76rem', color: '#f59e0b', marginTop: '0.35rem', fontWeight: 600 }}>
                  Founding Leadership Industry Experience
                </div>
              </div>

              {/* Stat 4 */}
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  ZERO-DEFECT BENCHMARK
                </div>
                <div style={{ fontSize: 'clamp(2.3rem, 3.4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  99.98%
                </div>
                <div style={{ fontSize: '0.76rem', color: '#00f0ff', marginTop: '0.35rem', fontWeight: 600 }}>
                  Dispatch &amp; Inline Barcode Accuracy
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Real ATPL Provenance & Strategic Partnerships Strip */}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(6, 12, 28, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.78rem',
              color: '#94a3b8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#00f0ff', fontWeight: 700 }}>Headquarters &amp; Labs:</span>
              <span>TIDEL Park Chennai (HQ),</span>
              <span>Thiagarajar College of Engg TBI-TCE Madurai,</span>
              <span>Anantapur Center</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>Technology Alliances:</span>
              <span>Honeywell Gold Partner ("Go Getter Award" Winner),</span>
              <span>CSL,</span>
              <span>Zebra,</span>
              <span>Printronix,</span>
              <span>Advantech</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FEATURED CLIENT CASE STUDY CARDS (Like Corpay / Bridgestone in Toptal)
         ========================================================================= */}
      <section style={{ padding: '4.5rem 0 5rem 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 700 }}>
                REAL PRODUCTION DEPLOYMENTS
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#ffffff', fontWeight: 800, margin: 0 }}>
                Featured Enterprise Case Studies
              </h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '480px', margin: 0 }}>
              Click any client card to inspect the real-world manufacturing challenge, engineered solution, and audited ROI impact.
            </p>
          </div>

          {/* 4 Case Study Cards in a Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {FEATURED_CASE_STUDIES.map((cs) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCaseStudy(cs)}
                style={{
                  position: 'relative',
                  height: '380px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00f0ff';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 113, 186, 0.4)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.6)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Background Facility Image */}
                <img
                  src={cs.image}
                  alt={cs.client}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Dark Cinematic Scrim Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(8, 16, 36, 0.35) 0%, rgba(8, 16, 36, 0.75) 50%, rgba(6, 12, 28, 0.96) 100%)',
                    zIndex: 1
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Top: Sector Badge & Impact Metric */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#00f0ff',
                        backgroundColor: 'rgba(0, 240, 255, 0.15)',
                        border: '1px solid rgba(0, 240, 255, 0.35)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {cs.category}
                    </span>

                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px'
                      }}
                    >
                      {cs.metric}
                    </span>
                  </div>

                  {/* Center/Bottom: Big Bold Client Name & Official Verified Brand Logo */}
                  <div>
                    {cs.logoUrl && (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          height: '32px',
                          marginBottom: '0.65rem',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        <img
                          src={cs.logoUrl}
                          alt={cs.client}
                          style={{
                            maxHeight: '22px',
                            maxWidth: '90px',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>
                    )}

                    <h3
                      style={{
                        fontSize: '1.9rem',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: '0 0 0.35rem 0',
                        textShadow: '0 2px 10px rgba(0,0,0,0.85)'
                      }}
                    >
                      {cs.client}
                    </h3>

                    <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {cs.sub}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 1rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {cs.headline}
                    </p>

                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#00f0ff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. PROXIMITY SCALE GRID (Reduced Content & Highlighted Keywords)
         ========================================================================= */}
      <section style={{ padding: '0 0 4.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
          <ProximityScaleGrid
            title="Enterprise Deployments & Production Milestones"
            subtitle="Explore premier manufacturing and logistics deployments across India that scale dynamically with your cursor. Highlighting audited ROI keywords and live production metrics."
          />
        </div>
      </section>

      {/* =========================================================================
          4.5 AUTHENTIC CLIENT TESTIMONIAL (Direct from atplgroup.com)
         ========================================================================= */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(12, 24, 54, 0.75)',
              border: '1px solid rgba(0, 240, 255, 0.28)',
              borderRadius: '20px',
              padding: '2.4rem 2.8rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  backgroundColor: 'rgba(0, 240, 255, 0.12)',
                  border: '1px solid rgba(0, 240, 255, 0.35)',
                  borderRadius: '16px',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f0ff',
                  flexShrink: 0
                }}
              >
                <Quote size={28} />
              </div>

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#00f0ff', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  OFFICIAL CLIENT TESTIMONIAL // atplgroup.com
                </div>
                <blockquote style={{ margin: '0 0 1.25rem 0', fontSize: '1.05rem', lineHeight: 1.7, color: '#f1f5f9', fontStyle: 'italic' }}>
                  "My experience with ATPL is wonderful. The service and products are of high standards at great prices. The sales reps are some of the best in the business. As a first time customer all my needs were met and we now have great tags for our products. I look forward to placing my next order. I have already recommended ATPL to other businesses. I am looking forward to working with ATPL for years to come."
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff' }}>Mr. Vinayagam</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Senior Consultant, Verified Enterprise Client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COMPLETE 200+ ENTERPRISE CLIENT DIRECTORY WITH SEARCH & FILTERS
         ========================================================================= */}
      <section id="client-roster" style={{ padding: '2rem 0 6rem 0', backgroundColor: '#050914' }}>
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
              AUTHENTIC CLIENT DIRECTORY
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', color: '#ffffff', fontWeight: 800, margin: '0 0 0.65rem 0' }}>
              Explore Our {REAL_CLIENTS_DATA.length}+ Verified Enterprise Clients
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
              Search and filter across India's premier manufacturing, logistics, defense, and electronics organizations running on Archery Technocrats solutions.
            </p>
          </div>

          {/* Search Bar & Category Filters */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by client name (e.g. Apollo, ABB, Ola, L&T, HUL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#00f0ff' : '#94a3b8',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{ marginLeft: '0.35rem', opacity: 0.6, fontSize: '0.72rem' }}>({cat.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Logos Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => openDemoModal({ solution: `Case Study Inquiry: ${client.name}`, notes: `Inquiry about deployments with ${client.name}` })}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '96px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 240, 255, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
                }}
              >
                <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '0.4rem' }}>
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    loading="lazy"
                    style={{
                      maxHeight: '38px',
                      maxWidth: '130px',
                      objectFit: 'contain',
                      filter: 'contrast(1.05)'
                    }}
                    onError={(e) => {
                      // Fallback to stylized typography
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      if (parent && !parent.querySelector('.fallback-name')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-name';
                        fallback.style.cssText = 'font-weight: 800; font-size: 0.85rem; color: #0f172a; text-align: center; line-height: 1.2;';
                        fallback.textContent = client.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {client.category || 'Enterprise Partner'}
                </span>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No enterprise clients found matching "{searchQuery}"</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                style={{ background: 'none', border: '1px solid #00f0ff', color: '#00f0ff', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          6. MODAL: FULL CASE STUDY DEEP DIVE POPUP
         ========================================================================= */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCaseStudy(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.82)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              zIndex: 99999
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '650px',
                width: '100%',
                backgroundColor: '#0c1428',
                border: '2px solid #00f0ff',
                borderRadius: '20px',
                padding: '2.2rem',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.3)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {selectedCaseStudy.logoUrl && (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '6px 12px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                      <img src={selectedCaseStudy.logoUrl} alt={selectedCaseStudy.client} style={{ maxHeight: '30px', maxWidth: '100px', objectFit: 'contain' }} />
                    </div>
                  )}
                  <div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {selectedCaseStudy.category}
                    </span>
                    <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, margin: '0.25rem 0' }}>
                      {selectedCaseStudy.client}
                    </h2>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{selectedCaseStudy.sub}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ backgroundColor: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.74rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase' }}>Audited Outcome</div>
                <div style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>{selectedCaseStudy.headline}</div>
              </div>

              {selectedCaseStudy.software && (
                <div style={{ marginBottom: '1.25rem', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '10px', padding: '0.65rem 0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'monospace' }}>Core Software Architecture:</span>
                  <span style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 700 }}>{selectedCaseStudy.software}</span>
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.35rem' }}>The Challenge:</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{selectedCaseStudy.challenge}</p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.35rem' }}>ATPL Engineered Solution:</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{selectedCaseStudy.solution}</p>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.5rem' }}>Verified Results:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.6 }}>
                  {selectedCaseStudy.results.map((r, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{r}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    openDemoModal({ solution: `Case Study Deep Dive: ${selectedCaseStudy.client}`, notes: `Request technical architecture for ${selectedCaseStudy.client}` });
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Request Architecture Blueprint
                </button>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
