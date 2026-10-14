import React from 'react';
import { useApp } from '../../context/AppContext';
import { FactoryBlueprintMap } from '../common/FactoryBlueprintMap';
import { OfficialPartnersShowcase } from '../common/PartnerLogos';
import { AuthenticClientsMarquee } from '../common/ClientBrandLogos';
import { MadeInIndiaSection } from '../common/MadeInIndiaSection';
import { CustomerStoriesCarousel } from '../common/CustomerStoriesCarousel';
import { CoreValuesSection } from '../common/CoreValuesSection';
import EnterpriseLeaderSection from '../common/EnterpriseLeaderSection';
import { AtplCommunitySection } from '../common/AtplCommunitySection';
import { 
  Boxes, 
  Radio, 
  Printer, 
  Eye, 
  Headphones, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Factory, 
  Sparkles,
  Download,
  Clock,
  Layers,
  Check,
  Smartphone,
  FileCheck,
  ChevronRight
} from 'lucide-react';

export const HomeView = () => {
  const { setCurrentView, openDemoModal } = useApp();

  const coreSolutions = [
    {
      id: 'mdm',
      name: 'PerfectEdge MDM',
      badge: 'Handheld Fleet Management',
      icon: Smartphone,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      shortDesc: 'Centralized mobile fleet management and kiosk lockdown for rugged handhelds.',
      summary: 'Centralized mobile device management for rugged handhelds and forklift terminals.',
      description: 'Gives plant IT teams full control over rugged Android barcode scanners, mobile computers, and forklift tablets. Provision devices in bulk via single barcode scan and lock them down into tamper-proof kiosk mode.',
      features: ['Zero-touch barcode enrollment for Zebra, Honeywell & Newland scanners', 'Single-app kiosk lockdown prevents operator tampering and gaming', 'Remote screen control, battery health alerts, and silent APK updates'],
      view: 'software'
    },
    {
      id: 'labeler',
      name: 'Perfect Labeler',
      badge: 'Cloud Labeling Platform',
      icon: Printer,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      shortDesc: 'Cloud-native label design with live ERP sync and industrial print-and-apply.',
      summary: 'Centralized cloud label designer with automated industrial print-and-apply.',
      description: 'Replaces fragmented desktop label design files with a single browser-based label hub. Connects live ERP data directly to Zebra, TSC, and Honeywell barcode printers across all your plant units.',
      features: ['Browser-based label designer linked directly to live ERP database', 'Universal printer support (Zebra ZPL, TSC TSPL, Honeywell DPL)', '100% inline barcode grading and audit logging to eliminate mislabeling'],
      view: 'software'
    },
    {
      id: 'audit',
      name: 'Perfect Audit',
      badge: 'Internal Audit & Compliance',
      icon: ShieldCheck,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      shortDesc: 'Paperless ISO & IATF digital checklists with photo proof and automated CAPA.',
      summary: '100% paperless ISO internal audit and compliance management SaaS.',
      description: 'Replaces paper clipboards and Excel sheets across multi-plant facilities. Shopfloor inspectors capture photo proof, geo-timestamps, and automated CAPA corrective actions directly on mobile devices.',
      features: ['Digital mobile inspection checklists with mandatory photo proof', 'Automated corrective action (CAPA) tracking and escalation rules', 'Cuts ISO 9001:2015 and IATF 16949 audit preparation time by 70%'],
      view: 'software'
    },
    {
      id: 'store',
      name: 'Perfect Store (WMS)',
      badge: 'Warehouse Management',
      icon: Boxes,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      shortDesc: 'Warehouse management with bin slotting, FIFO control, and direct ERP sync.',
      summary: 'Bin-level inventory tracking, FIFO enforcement, and direct ERP sync.',
      description: 'Connects warehouse operators on rugged handhelds straight into SAP S/4HANA and Oracle. Automatically directs put-away, stock picking, and dock dispatch without discrepancies.',
      features: ['Real-time two-way SAP & Oracle ERP sync', 'Dynamic bin slotting and aisle picking paths', 'Automated FIFO, FEFO, and quarantine rules'],
      view: 'software'
    },
    {
      id: 'trace',
      name: 'Perfect Trace',
      badge: 'Track & Trace Serialization',
      icon: Layers,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      shortDesc: 'Parent-child packaging serialization meeting DGFT and US-FDA export standards.',
      summary: 'Multi-tier parent-child packaging serialization and aggregation.',
      description: 'Connects packaging lines for automotive OEMs and pharmaceutical exporters. Generates cryptographic serials and verifies 2D barcodes at production line speed to eliminate recall liability.',
      features: ['4-tier aggregation (Item → Carton → Shipper → Pallet)', 'DGFT, US-FDA DSCSA & 21 CFR Part 11 compliant', 'Batch recall genealogy lookup in under 2 minutes'],
      view: 'software'
    },
    {
      id: 'vision',
      name: 'Perfect Vision AI',
      badge: 'Machine Vision Inspection',
      icon: Eye,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      shortDesc: 'High-speed conveyor optical inspection for automated defect classification.',
      summary: 'High-speed conveyor optical inspection for automated defect detection.',
      description: 'Industrial optical cameras running real-time Pass/Fail defect analysis on high-speed lines. Classifies microscopic surface flaws, label alignment, and solder cracks with automated reject gates.',
      features: ['Real-time automated Pass/Fail quality classification', 'Catches surface scratches, label misalignment, and print flaws', 'Direct pneumatic diverter and reject chute triggering'],
      view: 'software'
    }
  ];

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
          1. SPLIT HERO SECTION: HERO HEADLINE & CTAS (LEFT) + FACTORY BLUEPRINT TOUR (RIGHT)
         ========================================================================= */}
      <section 
        id="hero-split-master"
        aria-label="Archery Technocrats Smart Factory Automation and Interactive Shopfloor Tour"
        style={{
          position: 'relative',
          backgroundColor: '#040914',
          color: '#ffffff',
          paddingTop: 'clamp(1.75rem, 3.2vh, 3rem)',
          paddingBottom: 'clamp(2rem, 3.6vh, 3.25rem)',
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
                grid-template-columns: minmax(460px, 0.95fr) minmax(560px, 1.25fr);
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
          `}</style>

          <div className="hero-master-split-grid">
            {/* Left Column: Hero Headline, Subhead, CTAs & Proof Points */}
            <div className="hero-split-left-panel">
              {/* Trust badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(0, 113, 186, 0.15)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                padding: '0.38rem 0.95rem',
                borderRadius: '999px',
                fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
                fontWeight: 700,
                color: '#00f0ff',
                marginBottom: '1.2rem',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
              }}>
                <ShieldCheck size={16} color="#00f0ff" style={{ flexShrink: 0 }} />
                <span>Archery Technocrats • 35+ Years Combined Industrial Experience • ISO 9001:2015</span>
              </div>

              {/* Main Headline (Optimized H1 for SEO with Archery Technocrats brand & target keywords) */}
              <h1 style={{
                fontSize: 'clamp(1.95rem, 3.2vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                marginBottom: '1.1rem',
                fontFamily: 'var(--font-display)'
              }}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                  fontWeight: 800,
                  color: '#00f0ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.35rem'
                }}>
                  Archery Technocrats
                </span>
                Factory Automation That Actually Works on the Shop Floor.
              </h1>

              {/* Sub-headline */}
              <p style={{
                fontSize: 'clamp(0.92rem, 1.15vw, 1.08rem)',
                color: '#94a3b8',
                lineHeight: 1.62,
                maxWidth: '680px',
                marginBottom: '1.75rem'
              }}>
                We build warehouse management software, RFID tracking portals, and inline vision systems that connect straight to your SAP or Oracle ERP. Built, installed, and supported by engineers who understand Indian plant realities.
              </p>

              {/* Action CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginBottom: '1.85rem' }}>
                <button
                  onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Engineering Consultation', notes: 'Initiated from Homepage Hero' })}
                  className="hero-cta-btn-primary"
                >
                  <PhoneCall size={18} />
                  <span>Talk to an Automation Engineer</span>
                </button>

                <button
                  onClick={() => openDemoModal({ mode: 'demo', solution: 'Plant Feasibility Walkthrough', notes: 'Initiated from Hero secondary button' })}
                  className="hero-cta-btn-secondary"
                >
                  <span>Schedule Plant Walkthrough</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className="hero-cta-btn-download"
                  title="Download ATPL Smart Factory Product & Engineering Overview PDF"
                >
                  <Download size={16} />
                  <span>Overview PDF</span>
                </button>
              </div>

              {/* Key practical facts strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.35rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> Live Two-Way SAP & Oracle Sync
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> Rollouts in 2 to 4 Weeks
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" /> 4-Hour On-Site Support SLA in South India
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Factory Blueprint Tour */}
            <div className="hero-split-right-panel" style={{ width: '100%', minWidth: 0 }}>
              <FactoryBlueprintMap embedded={true} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. AUTHENTIC ENTERPRISE CLIENT LOGOS STRIP
         ========================================================================= */}
      <section style={{ backgroundColor: '#f8fafc', padding: '2.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
            TRUSTED BY 250+ ENTERPRISE MANUFACTURING PLANTS & SUPPLY CHAIN HUBS
          </div>
        </div>

        {/* Client Logos Marquee */}
        <AuthenticClientsMarquee direction="left" speed={40} />
      </section>

      {/* =========================================================================
          MADE IN INDIA. MADE FOR THE WORLD. (Zoho-Style Pride & Scale Section)
         ========================================================================= */}
      <MadeInIndiaSection />

      {/* =========================================================================
          3. WHAT WE DO (Ultra-compact, punchy 1-liner)
         ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', padding: '0 1.25rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#0071ba',
            backgroundColor: '#eff6ff',
            padding: '0.2rem 0.75rem',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '0.6rem'
          }}>
            WHAT WE DO
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem', lineHeight: 1.3, cursor: 'default', caretColor: 'transparent' }}>
            Eliminating Manual Friction Across Warehouse, Line & Dock.
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.55, margin: 0, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            We pair rugged barcode, RFID, and machine vision hardware with in-house software to connect your shop floor directly to SAP and Oracle.
          </p>
        </div>
      </section>

      {/* =========================================================================
          4. PROPRIETARY SOFTWARE SUITE (Zoho-Style Split Featured Apps Layout)
         ========================================================================= */}
      <section style={{ padding: '5.5rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3.5rem 4.5rem',
            alignItems: 'center'
          }}>
            
            {/* LEFT COLUMN: Punchy Editorial Headline & Value Proposition */}
            <div>
              <h2 style={{
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}>
                Your factory floor,<br />
                powered by our software
              </h2>

              {/* Red accent line (Signature Zoho-style accent) */}
              <div style={{
                width: '42px',
                height: '3.5px',
                backgroundColor: '#E85874',
                borderRadius: '999px',
                marginBottom: '1.75rem'
              }} />

              <p style={{
                fontSize: '1.08rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '480px'
              }}>
                A unified suite of industrial applications designed to eliminate manual clipboards, inventory discrepancies, and mislabeling across your plants. Built in-house by automation engineers who live on the shop floor.
              </p>

              <button
                onClick={() => openDemoModal({ solution: 'ATPL Software Suite', notes: 'Requesting PoC for ATPL Enterprise Software Suite' })}
                style={{
                  backgroundColor: '#E85874',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 4px 14px rgba(232, 88, 116, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d44360';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(232, 88, 116, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E85874';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(232, 88, 116, 0.35)';
                }}
              >
                <span>REQUEST A POC</span>
                <ChevronRight size={16} strokeWidth={2.8} />
              </button>
            </div>

            {/* RIGHT COLUMN: 2-Column x 3-Row Grid of ATPL Featured Software */}
            <div>
              {/* Featured Header */}
              <div style={{ marginBottom: '1.75rem', paddingLeft: '0.75rem' }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#64748b',
                  marginBottom: '0.45rem'
                }}>
                  FEATURED APPS
                </div>
                <div style={{
                  width: '36px',
                  height: '2.5px',
                  backgroundColor: '#E85874',
                  borderRadius: '999px'
                }} />
              </div>

              {/* 2x3 Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '1.5rem 1.75rem'
              }}>
                {coreSolutions.map((sol) => {
                  const Icon = sol.icon;
                  return (
                    <div
                      key={sol.id}
                      onClick={() => {
                        setCurrentView(sol.view);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.95rem',
                        padding: '0.9rem 0.85rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = sol.bgColor;
                        e.currentTarget.style.borderColor = `${sol.color}35`;
                        e.currentTarget.style.transform = 'translateX(6px)';
                        e.currentTarget.style.boxShadow = `0 10px 25px -5px ${sol.color}20`;
                        const iconContainer = e.currentTarget.querySelector('.app-icon-container');
                        if (iconContainer) {
                          iconContainer.style.transform = 'scale(1.12)';
                          iconContainer.style.boxShadow = `0 6px 16px ${sol.color}35`;
                        }
                        const title = e.currentTarget.querySelector('h4');
                        if (title) title.style.color = sol.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        const iconContainer = e.currentTarget.querySelector('.app-icon-container');
                        if (iconContainer) {
                          iconContainer.style.transform = 'scale(1)';
                          iconContainer.style.boxShadow = 'none';
                        }
                        const title = e.currentTarget.querySelector('h4');
                        if (title) title.style.color = '#0f172a';
                      }}
                    >
                      <div 
                        className="app-icon-container"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          backgroundColor: sol.bgColor,
                          color: sol.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <Icon size={23} strokeWidth={2} />
                      </div>

                      <div>
                        <h3 style={{
                          fontSize: '1.08rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          margin: '0 0 0.3rem 0',
                          lineHeight: 1.3
                        }}>
                          {sol.name}
                        </h3>
                        <p style={{
                          fontSize: '0.86rem',
                          color: '#64748b',
                          lineHeight: 1.48,
                          margin: 0
                        }}>
                          {sol.shortDesc || sol.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Explore Link */}
              <div style={{ marginTop: '2rem', paddingLeft: '0.75rem' }}>
                <button
                  onClick={() => {
                    setCurrentView('software');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0071ba',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: 0,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#005288';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#0071ba';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>EXPLORE ALL PRODUCTS</span>
                  <ChevronRight size={16} strokeWidth={2.8} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. ATPL COMMUNITY & ENGINEERING FORCE (Exact Zoho Community Layout)
         ========================================================================= */}
      <AtplCommunitySection />

      {/* =========================================================================
          6. REAL CUSTOMER STORIES (Zoho-Style Cinematic Carousel Banner)
         ========================================================================= */}
      <CustomerStoriesCarousel />

      {/* =========================================================================
          6. CORE VALUES & PRINCIPLES (Zoho-Style Editorial Principles Section)
         ========================================================================= */}
      <CoreValuesSection />

      {/* =========================================================================
          7. STRATEGIC OEM HARDWARE PARTNERS SHOWCASE
         ========================================================================= */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <OfficialPartnersShowcase theme="light" />
        </div>
      </section>

      {/* =========================================================================
          8. FINAL CALL TO ACTION (Direct, Human, Grounded)
         ========================================================================= */}
      <section style={{
        backgroundColor: '#0f172a',
        padding: '5rem 0',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '1.25rem'
          }}>
            TALK TO AN ENGINEER
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Have a Bottleneck on Your Line? Let’s Walk Your Floor.
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Invite an ATPL systems engineer to review your dispatch dock, packing line, or warehouse layout. We will give you a practical assessment of where automation makes sense — and where it doesn't.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button
              onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Walkthrough Audit', notes: 'Initiated from Final CTA' })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(0, 113, 186, 0.4)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
            >
              <span>Schedule a Plant Visit</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="tel:04435537618"
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
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
            >
              <PhoneCall size={17} />
              <span>Call Chennai HQ: 044 3553 7618</span>
            </a>
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
