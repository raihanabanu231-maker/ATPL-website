import React, { useState } from 'react';
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
  ChevronRight,
  Activity,
  Zap,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export const HomeView = () => {
  const { setCurrentView, openDemoModal } = useApp();
  const [activeHeroTab, setActiveHeroTab] = useState('rfid');

  const heroShowcases = {
    rfid: {
      id: 'rfid',
      badge: 'STATION 04 • HIGH-SPEED DOCK PORTAL',
      title: 'UHF RFID Inbound & Outbound Dock Portals',
      image: '/assets/images/atpl_rfid_portal_showcase.webp',
      stats: [
        { label: 'Read Speed', value: '1,200 tags/s', highlight: true },
        { label: 'Verification', value: '100% Inbound ASN' },
        { label: 'ERP Latency', value: '0.18s SAP S/4HANA' }
      ],
      description: 'Hands-free dock gate scanning eliminating forklift queuing, manual barcode scanning, and staging errors.',
      tag: 'SAP S/4HANA MATDOC Synced',
      tagColor: '#0071ba',
      targetView: 'hardware'
    },
    vision: {
      id: 'vision',
      badge: 'STATION 07 • INLINE OPTICAL INSPECTION',
      title: 'High-Speed AI Vision Defect Detection',
      image: '/assets/images/atpl_ai_vision_inspection.webp',
      stats: [
        { label: 'Conveyor Speed', value: '180 pcs/min', highlight: true },
        { label: 'Flaw Detection', value: '50µm Precision' },
        { label: 'Reject Trigger', value: '< 8ms Pneumatic' }
      ],
      description: 'Microscopic surface flaw, print alignment & 2D code grading with instant automated pneumatic reject diverter.',
      tag: '99.98% Defect Free Yield',
      tagColor: '#7c3aed',
      targetView: 'software'
    },
    wms: {
      id: 'wms',
      badge: 'STATION 01 • INTELLIGENT DISPATCH HUB',
      title: 'Perfect Store™ 3D Warehouse Twin',
      image: '/assets/images/atpl_connected_3d_twin.webp',
      stats: [
        { label: 'Inventory Accuracy', value: '99.98%', highlight: true },
        { label: 'Dock Turnaround', value: '65% Faster' },
        { label: 'Slotting Algorithm', value: 'Dynamic 3D FIFO' }
      ],
      description: 'Put-away guidance, bin slotting, and pick-to-light workflows for high-velocity distribution connected to SAP & Oracle.',
      tag: 'Live Two-Way ERP Sync',
      tagColor: '#009a44',
      targetView: 'software'
    },
    trace: {
      id: 'trace',
      badge: 'STATION 09 • SERIALIZATION & PACKAGING',
      title: 'Perfect Trace™ 4-Tier Aggregation',
      image: '/assets/images/atpl_labeler_hardware.webp',
      stats: [
        { label: 'Regulatory Standard', value: 'US-FDA & DGFT', highlight: true },
        { label: 'Hierarchy', value: 'Unit → Carton → Pallet' },
        { label: 'Audit Trail', value: '21 CFR Part 11' }
      ],
      description: 'Cryptographic batch traceability and real-time parent-child serialization for global export with zero recall liability.',
      tag: 'Zero-Recall Compliance',
      tagColor: '#E85874',
      targetView: 'software'
    }
  };

  const currentShowcase = heroShowcases[activeHeroTab] || heroShowcases.rfid;

  const coreSolutions = [
    {
      id: 'mdm',
      name: 'PerfectEdge MDM',
      badge: 'Handheld Fleet Management',
      icon: Smartphone,
      color: '#0284c7',
      bgColor: '#f0f9ff',
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
      color: '#10b981',
      bgColor: '#ecfdf5',
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
      color: '#e11d48',
      bgColor: '#fff1f2',
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
      color: '#0071ba',
      bgColor: '#eff6ff',
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
      color: '#009a44',
      bgColor: '#f0f9ff',
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
      color: '#7c3aed',
      bgColor: '#f5f3ff',
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
          1. MASTER ENTERPRISE HERO SECTION (Rich, Grounded, High-Impact)
         ========================================================================= */}
      <section 
        style={{
          position: 'relative',
          paddingTop: 'clamp(2rem, 4vw, 3.75rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3.25rem)',
          borderBottom: '1px solid #e2e8f0',
          background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0, 113, 186, 0.09) 0%, rgba(248, 250, 252, 0.7) 45%, #ffffff 100%)',
          overflow: 'hidden'
        }}
      >
        <style>{`
          .atpl-hero-split-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.25rem;
            align-items: center;
            margin-bottom: 2.5rem;
          }
          @media (min-width: 1024px) {
            .atpl-hero-split-grid {
              grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
              gap: 2.75rem;
            }
          }
          .atpl-hero-cta-group {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.85rem;
            margin-bottom: 1.75rem;
          }
          @media (max-width: 640px) {
            .atpl-hero-cta-group {
              flex-direction: column;
              width: 100%;
            }
            .atpl-hero-cta-group button {
              width: 100% !important;
              justify-content: center !important;
            }
          }
          .atpl-hero-tab-btn {
            background: transparent;
            border: none;
            padding: 0.6rem 0.5rem;
            min-height: 44px;
            font-size: 0.76rem;
            font-weight: 700;
            color: #94a3b8;
            cursor: pointer;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            transition: all 0.15s ease;
            box-sizing: border-box;
          }
          .atpl-hero-tab-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
          }
          .atpl-hero-tab-btn.active {
            color: #ffffff;
            background: rgba(0, 113, 186, 0.25);
            border: 1px solid rgba(0, 113, 186, 0.5);
            box-shadow: 0 2px 8px rgba(0, 113, 186, 0.3);
          }
          .atpl-hero-tabs-nav {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.35rem;
            background: #090e1a;
            padding: 0.35rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          @media (max-width: 580px) {
            .atpl-hero-tabs-nav {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          .atpl-hero-metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
            text-align: left;
          }
          @media (max-width: 520px) {
            .atpl-hero-metrics-grid {
              grid-template-columns: 1fr;
            }
          }
          @keyframes atplPulseDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.35); opacity: 0.45; }
          }
        `}</style>

        {/* Subtle cyber grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 113, 186, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 113, 186, 0.035) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 1rem' }}>
          
          {/* Top Trust and Accreditations Badges Strip */}
          <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#ffffff',
              border: '1.2px solid rgba(0, 113, 186, 0.25)',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: 'clamp(0.74rem, 2.2vw, 0.8rem)',
              fontWeight: 700,
              color: '#0071ba',
              boxShadow: '0 4px 16px rgba(0, 113, 186, 0.07)',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} color="#0071ba" style={{ flexShrink: 0 }} />
                <span>DPIIT Recognized (#startupindia)</span>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>ISO 9001:2015</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>Authorized GS1 Global Partner</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ color: '#E85874', fontWeight: 800 }}>35+ Years Heritage</span>
            </div>
          </div>

          {/* 2-Column Hero Split Grid */}
          <div className="atpl-hero-split-grid">
            
            {/* Left Column: Authoritative Copy, Value Drivers & CTAs */}
            <div style={{ textAlign: 'left' }}>
              
              {/* Eyebrow with live pulse */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0284c7',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#0284c7',
                  boxShadow: '0 0 10px #0284c7',
                  animation: 'atplPulseDot 1.8s ease-in-out infinite'
                }} />
                <span>Enterprise Industry 4.0 &amp; Auto-ID Systems</span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 3.3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                marginBottom: '1.15rem',
                fontFamily: 'var(--font-display)'
              }}>
                Industrial RFID, AI Vision &amp;{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #0071ba 0%, #0284c7 45%, #E85874 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  Smart Factory Automation
                </span>
              </h1>

              {/* Value Proposition */}
              <p style={{
                fontSize: 'clamp(0.96rem, 1.8vw, 1.12rem)',
                color: '#475569',
                lineHeight: 1.62,
                marginBottom: '1.4rem'
              }}>
                We engineer proprietary warehouse management systems (WMS), high-speed UHF RFID gate portals, and inline AI vision inspection that connect physical manufacturing lines directly into SAP S/4HANA &amp; Oracle ERP. Engineered, deployed, and supported 24/7 by veterans who understand Indian shop floor realities.
              </p>

              {/* Key Value Drivers / Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={12} color="#009a44" strokeWidth={3} />
                  </div>
                  <span><strong>99.98% Inventory &amp; Dispatch Accuracy:</strong> Automated 3D bin slotting, FIFO &amp; hands-free RFID dock gates eliminate stockouts.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={12} color="#009a44" strokeWidth={3} />
                  </div>
                  <span><strong>&lt; 8ms AI Vision Quality Control:</strong> Real-time optical flaw detection and automated pneumatic reject on high-speed conveyors.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={12} color="#009a44" strokeWidth={3} />
                  </div>
                  <span><strong>Turnkey 2 to 4 Week Deployments:</strong> Zero production line shutdown with bi-directional live SAP S/4HANA &amp; Oracle sync.</span>
                </div>
              </div>

              {/* Action CTAs (Min 44x44px touch targets) */}
              <div className="atpl-hero-cta-group">
                <button
                  onClick={() => openDemoModal({ mode: 'engineer', solution: 'Plant Engineering Consultation', notes: 'Initiated from Master Hero primary CTA' })}
                  style={{
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem 1.85rem',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.55rem',
                    minHeight: '48px',
                    minWidth: '44px',
                    boxShadow: '0 6px 20px rgba(0, 113, 186, 0.35)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
                >
                  <PhoneCall size={18} />
                  <span>Talk to an Automation Engineer</span>
                </button>

                <button
                  onClick={() => openDemoModal({ mode: 'demo', solution: 'Plant Feasibility Walkthrough', notes: 'Initiated from Master Hero secondary CTA' })}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    border: '1.5px solid #cbd5e1',
                    padding: '0.85rem 1.75rem',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    minHeight: '48px',
                    minWidth: '44px',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0071ba';
                    e.currentTarget.style.color = '#0071ba';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                >
                  <span>Schedule Plant Walkthrough</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('factory-blueprint-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setCurrentView('factory-3d');
                    }
                  }}
                  style={{
                    backgroundColor: 'rgba(232, 88, 116, 0.08)',
                    color: '#E85874',
                    border: '1.5px solid rgba(232, 88, 116, 0.3)',
                    padding: '0.85rem 1.45rem',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    minHeight: '48px',
                    minWidth: '44px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.08)'}
                >
                  <Sparkles size={16} />
                  <span>✨ 12-Station Tour ↓</span>
                </button>
              </div>

              {/* Social Proof Strip */}
              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>250+ Enterprise Deployments:</span>
                <span>Ola FutureFactory • Bosch • JSW Steel • Ashok Leyland • Caplin Point</span>
              </div>
            </div>

            {/* Right Column: Interactive Shop Floor Telemetry Console */}
            <div style={{
              backgroundColor: '#0a0f1d',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 45px -10px rgba(0, 113, 186, 0.3), 0 10px 25px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}>
              
              {/* Telemetry Console Header */}
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#111827',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    boxShadow: '0 0 8px #22c55e',
                    animation: 'atplPulseDot 1.6s ease-in-out infinite'
                  }} />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.06em', fontFamily: 'monospace' }}>
                    ATPL TELEMETRY ENGINE v4.2
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>● ONLINE</span>
                  <span style={{ color: '#475569' }}>|</span>
                  <span>14ms SAP SYNC</span>
                </div>
              </div>

              {/* Station Switcher Tabs (Min 44x44px touch targets) */}
              <div className="atpl-hero-tabs-nav">
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('rfid')}
                  className={`atpl-hero-tab-btn ${activeHeroTab === 'rfid' ? 'active' : ''}`}
                >
                  <Radio size={14} />
                  <span>UHF RFID</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('vision')}
                  className={`atpl-hero-tab-btn ${activeHeroTab === 'vision' ? 'active' : ''}`}
                >
                  <Eye size={14} />
                  <span>AI Vision</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('wms')}
                  className={`atpl-hero-tab-btn ${activeHeroTab === 'wms' ? 'active' : ''}`}
                >
                  <Boxes size={14} />
                  <span>3D WMS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHeroTab('trace')}
                  className={`atpl-hero-tab-btn ${activeHeroTab === 'trace' ? 'active' : ''}`}
                >
                  <Layers size={14} />
                  <span>Serialization</span>
                </button>
              </div>

              {/* Visual Showcase Canvas (Optimized so no important text is cut off) */}
              <div style={{
                position: 'relative',
                backgroundColor: '#020617',
                height: 'clamp(210px, 25vw, 260px)',
                overflow: 'hidden'
              }}>
                <img
                  src={currentShowcase.image}
                  alt={currentShowcase.title}
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith('.webp')) {
                      e.currentTarget.src = e.currentTarget.src.replace('.webp', '.jpg');
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(0.9)'
                  }}
                />

                {/* Ambient Top Vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(10, 15, 29, 0.65) 0%, rgba(10, 15, 29, 0) 40%, rgba(10, 15, 29, 0.85) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Top-Left Live Telemetry Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  letterSpacing: '0.04em',
                  fontFamily: 'monospace'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span>{currentShowcase.badge}</span>
                </div>

                {/* Top-Right Active Status Tag */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${currentShowcase.tagColor}`,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#ffffff'
                }}>
                  {currentShowcase.tag}
                </div>

                {/* Bottom Image Title */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  right: '12px'
                }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {currentShowcase.title}
                  </div>
                </div>
              </div>

              {/* Dedicated Telemetry Data Card (Guarantees zero text cut-off on mobile) */}
              <div style={{
                padding: '1.15rem 1.25rem',
                backgroundColor: '#0d1424',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {/* 3 Real-time Data Counters */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.65rem',
                  marginBottom: '0.9rem'
                }}>
                  {currentShowcase.stats.map((st, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.65rem'
                    }}>
                      <div style={{ fontSize: '0.66rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {st.label}
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                        fontWeight: 800,
                        color: st.highlight ? '#38bdf8' : '#ffffff',
                        fontFamily: 'monospace',
                        marginTop: '0.2rem'
                      }}>
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanatory Narrative */}
                <p style={{
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  margin: '0 0 0.85rem 0'
                }}>
                  {currentShowcase.description}
                </p>

                {/* Direct Action Link (Min 44x44px touch target) */}
                <button
                  type="button"
                  onClick={() => setCurrentView(currentShowcase.targetView)}
                  style={{
                    backgroundColor: 'rgba(0, 113, 186, 0.18)',
                    color: '#38bdf8',
                    border: '1px solid rgba(0, 113, 186, 0.4)',
                    padding: '0.55rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    minHeight: '44px',
                    transition: 'all 0.15s ease',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.35)';
                    e.currentTarget.style.borderColor = '#38bdf8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.18)';
                    e.currentTarget.style.borderColor = 'rgba(0, 113, 186, 0.4)';
                  }}
                >
                  <span>Explore Station Specs &amp; Hardware</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Key Enterprise ROI Metrics Grid (4 High-Impact Counters) */}
          <div className="atpl-hero-metrics-grid">
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
              borderTop: '3px solid #0071ba'
            }}>
              <div style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#0071ba', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                250+
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>
                Enterprise Plants Automated
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>
                Ola Electric FutureFactory, Bosch, JSW Steel, Ashok Leyland &amp; Caplin Point.
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
              borderTop: '3px solid #009a44'
            }}>
              <div style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#009a44', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                99.98%
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>
                Inventory &amp; Dispatch Accuracy
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>
                Eliminating stockouts with automated 3D bin slotting, FIFO &amp; RFID dock gates.
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
              borderTop: '3px solid #7c3aed'
            }}>
              <div style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#7c3aed', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                &lt; 8ms
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>
                AI Vision Defect Inspection
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>
                High-speed conveyor pass/fail grading with instant pneumatic reject gates.
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
              borderTop: '3px solid #E85874'
            }}>
              <div style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#E85874', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                100%
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>
                US-FDA &amp; DGFT Serialization
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>
                Parent-child 4-tier packaging aggregation &amp; 21 CFR Part 11 electronic audit logs.
              </div>
            </div>
          </div>

          {/* Quick Core Capability Pills (Click to navigate, min 44px tap targets) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.75rem'
          }}>
            <button
              onClick={() => setCurrentView('software')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0071ba';
                e.currentTarget.style.color = '#0071ba';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>📦</span>
              <span>Perfect Store™ (WMS)</span>
            </button>

            <button
              onClick={() => setCurrentView('software')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#009a44';
                e.currentTarget.style.color = '#009a44';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>🔍</span>
              <span>Perfect Trace™ (Serialization)</span>
            </button>

            <button
              onClick={() => setCurrentView('hardware')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.color = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>📡</span>
              <span>UHF RFID Portals (1,200 tags/s)</span>
            </button>

            <button
              onClick={() => setCurrentView('software')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed';
                e.currentTarget.style.color = '#7c3aed';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>👁️</span>
              <span>Vision AI Defect Systems</span>
            </button>

            <button
              onClick={() => setCurrentView('hardware')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E85874';
                e.currentTarget.style.color = '#E85874';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>📱</span>
              <span>Rugged Handhelds &amp; MDM</span>
            </button>
          </div>

          {/* Key delivery facts strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontSize: '0.86rem',
            color: '#64748b',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '1.25rem'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> Live Two-Way SAP S/4HANA &amp; Oracle Sync
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> Turnkey Deployments in 2 to 4 Weeks
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> 4-Hour On-Site SLA in South India Corridor
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> Tier-1 Hardware OEM Alliances
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. AUTHENTIC ENTERPRISE CLIENT LOGOS STRIP
         ========================================================================= */}
      <section style={{ backgroundColor: '#f8fafc', padding: '2.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
            TRUSTED BY 250+ ENTERPRISE MANUFACTURING PLANTS &amp; SUPPLY CHAIN HUBS
          </div>
        </div>

        {/* Client Logos Marquee */}
        <AuthenticClientsMarquee direction="left" speed={40} />
      </section>

      {/* =========================================================================
          3. 12-STATION INTERACTIVE SMART FACTORY ROBOT TOUR
         ========================================================================= */}
      <div id="factory-blueprint-section">
        <FactoryBlueprintMap />
      </div>

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
                backgroundColor: '#e11d48',
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
                  backgroundColor: '#e11d48',
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
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#be123c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(225, 29, 72, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e11d48';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(225, 29, 72, 0.25)';
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
                  backgroundColor: '#e11d48',
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
                        <h4 style={{
                          fontSize: '1.08rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          margin: '0 0 0.3rem 0',
                          lineHeight: 1.3
                        }}>
                          {sol.name}
                        </h4>
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
            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Chennai Head Office</strong>
              <div>TIDEL Park, G11 Ground Floor</div>
              <div>No. 4 Canal Bank Rd, Taramani</div>
              <div>Chennai – 600 113</div>
            </div>

            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Madurai R&D Labs</strong>
              <div>TCE-TBI, Thiagarajar College of Engineering</div>
              <div>Madurai – 625 015</div>
              <div style={{ marginTop: '0.25rem', color: '#38bdf8' }}>Regional Hub: Hosur & Bengaluru</div>
            </div>

            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Direct Helplines</strong>
              <div>Sales: +91 63808 59963</div>
              <div>Support: +91 72001 57626</div>
              <div>Toll-Free: 1800-120-774777</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
