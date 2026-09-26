import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { FactoryBlueprintMap } from '../common/FactoryBlueprintMap';
import { OfficialPartnersShowcase } from '../common/PartnerLogos';
import { 
  Boxes, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  FileCheck, 
  Wrench, 
  Radio, 
  Printer, 
  Smartphone, 
  Zap, 
  TrendingUp, 
  Building2, 
  Award, 
  Headphones, 
  ChevronRight,
  ExternalLink,
  Lock,
  Globe,
  Database,
  BarChart3,
  Server,
  Play,
  Pause,
  ChevronLeft,
  Bot,
  Volume2
} from 'lucide-react';

export const HomeView = () => {
  const { setCurrentView, openDemoModal } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  // ATPL Proprietary Product Suite Apps
  const suiteApps = [
    {
      id: 'store',
      name: 'Perfect Store™ (WMS)',
      shortName: 'Store WMS',
      category: 'software',
      color: '#0071ba',
      bgLight: '#eff6ff',
      icon: Boxes,
      tagline: 'ERP, PLC & SPM Integration',
      desc: 'Industrial warehouse management & middleware connecting standard SAP ERP, PLCs, HMIs, and SPM testing machines with barcode & RFID.',
      features: ['SAP / Oracle Middleware Sync', '3D Bin Slotting AI', 'FIFO / Expiry Lot Rules', 'Automated Pallet Gate RFID'],
      statHighlight: 'Seamless ERP & PLC Middleware',
      view: 'software'
    },
    {
      id: 'trace',
      name: 'Perfect Trace™ Serialization',
      shortName: 'Trace',
      category: 'software',
      color: '#009a44',
      bgLight: '#f0fdf4',
      icon: FileCheck,
      tagline: 'Item-to-Pallet GS1 Aggregation',
      desc: 'High-speed parent-child packaging serialization compliant with DGFT, US-FDA DSCSA, and 21 CFR Part 11 standards.',
      features: ['Cryptographic Serial Generation', '450 packs/min Line Speed', 'Multi-tier Aggregation', 'Anti-Counterfeit Portal'],
      statHighlight: '450 Packs/Min Line Speed',
      view: 'software'
    },
    {
      id: 'vision',
      name: 'Perfect AI Vision System™',
      shortName: 'AI Vision',
      category: 'ai',
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      icon: Eye,
      tagline: 'Deep Learning Defect Detection',
      desc: 'Industrial optical neural inspection detecting micro-scratches, connector flaws, label misprints, and real-time Pass/Fail defect analysis.',
      features: ['Real-Time Pass/Fail Edge AI', 'Microscopic Surface Crack Inspection', 'ISO/IEC 15415 Quality Grading', 'Pneumatic Reject Triggering'],
      statHighlight: '<8ms Defect Decision',
      view: 'software'
    },
    {
      id: 'mdm',
      name: 'PerfectEdge MDM™',
      shortName: 'Edge MDM',
      category: 'software',
      color: '#0284c7',
      bgLight: '#f0f9ff',
      icon: Smartphone,
      tagline: 'Rugged Mobile Device Management',
      desc: 'Centralized control over thousands of rugged handhelds, forklift vehicle terminals, and tablets with zero-touch enrollment and kiosk lockdown.',
      features: ['Zero-Touch QR Barcode Enrollment', 'Lockdown Kiosk Launcher Mode', 'Remote Screen Control & OTA Updates', 'Push-to-Talk Frontline Comms'],
      statHighlight: 'Zero-Touch Fleet Provisioning',
      view: 'software'
    },
    {
      id: 'labeler',
      name: 'Perfect Labeler™',
      shortName: 'Labeler',
      category: 'hardware',
      color: '#10b981',
      bgLight: '#ecfdf5',
      icon: Printer,
      tagline: 'Cloud Labelling & Print & Apply',
      desc: 'Cloud-native intelligent label operations platform connecting enterprise data, label workflows, and automated 120 packs/min print & apply hardware.',
      features: ['Visual Cloud Label Designer', 'Live Database Integration', '120 Packs/Min Print & Apply', 'In-Line Barcode Grade Verification'],
      statHighlight: '120 Units/Min Synchronized',
      view: 'hardware'
    },
    {
      id: 'audit',
      name: 'Perfect Audit™',
      shortName: 'Audit SaaS',
      category: 'software',
      color: '#E85874',
      bgLight: 'rgba(232, 88, 116, 0.08)',
      icon: Cpu,
      tagline: 'SaaS ISO Internal Audit Mgmt',
      desc: 'Cloud-based ISO internal audit management solution that streamlines audits, eliminates paperwork, and ensures regulatory compliance.',
      features: ['Digital Audit Checklists', 'Automated Non-Conformance Tracking', 'Regulatory Policy Lookup', '70% Audit Prep Time Cut'],
      statHighlight: '-70% Audit Prep Time',
      view: 'software'
    },
    {
      id: 'rfid',
      name: 'Fixed UHF RFID Portals',
      shortName: 'RFID Portals',
      category: 'hardware',
      color: '#fbb03b',
      bgLight: '#fffbeb',
      icon: Radio,
      tagline: 'Automated Gate Scanners',
      desc: 'Heavy-duty multi-directional UHF RFID portals scanning 1,200+ pallet and carton tags per second through high-speed conveyor dock gates.',
      features: ['Multi-antenna Circular Array', 'Direct Forklift Rugged Enclosure', 'MQTT & REST Output', 'Anti-Collision Filtering'],
      statHighlight: '1,200+ Tags/Sec Capture',
      view: 'hardware'
    },
    {
      id: 'twin',
      name: '3D Digital Twin Simulator',
      shortName: 'DigitalTwin',
      category: 'ai',
      color: '#06b6d4',
      bgLight: '#ecfeff',
      icon: Sparkles,
      tagline: 'Interactive 3D Virtual Plant',
      desc: 'Full 3D WebGL digital twin of your shopfloor with live station telemetry, conveyor simulation, and failure drill testbeds.',
      features: ['Photorealistic 3D Shopfloor', 'Live Station Temperature & OEE', 'Interactive Traveling AI Guide', 'Fault Injection Testing'],
      statHighlight: '12-Station 3D Simulator',
      view: 'factory-3d'
    },
    {
      id: 'fieldcare',
      name: 'ATPL FieldCare™ AMC',
      shortName: 'FieldCare',
      category: 'services',
      color: '#0d9488',
      bgLight: '#f0fdfa',
      icon: Headphones,
      tagline: '24/7 SLA & Resident Engineers',
      desc: 'Guaranteed 4-hour on-site dispatch SLA, quarterly preventive maintenance, and consignment hot-swap spare vaults.',
      features: ['Guaranteed 4h On-Site SLA', 'Dedicated Hotline & Telemetry', 'Consignment Hot-Swap Vaults', 'Quarterly Calibration'],
      statHighlight: '4-Hour On-Site Dispatch SLA',
      view: 'services'
    }
  ];

  const filteredApps = activeCategory === 'all' 
    ? suiteApps 
    : suiteApps.filter(app => app.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'hardware', label: 'Hardware (RFID, Scanners & Printers)' },
    { id: 'software', label: 'Software (WMS, PMS, Trace & Audit)' },
    { id: 'ai', label: 'AI Vision & 3D Twin' },
    { id: 'services', label: 'Engineering & 24/7 AMC' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>

      {/* =========================================================================
          1. VISUAL FACTORY BLUEPRINT MAP & 12-STATION SMART FACTORY ROUTE
         ========================================================================= */}
      <FactoryBlueprintMap />

      {/* =========================================================================
          3. ATPL HERO SECTION
         ========================================================================= */}
      <section 
        style={{
          position: 'relative',
          paddingTop: '4.5rem',
          paddingBottom: '5rem',
          textAlign: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #fbfcfe 0%, #f8fafc 100%)'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.1) 0%, rgba(0, 240, 255, 0.08) 40%, rgba(16, 185, 129, 0.05) 70%, transparent 100%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '980px', margin: '0 auto' }}>
          
          {/* ATPL Brand Identity Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(232, 88, 116, 0.08)',
            border: '1px solid rgba(232, 88, 116, 0.3)',
            padding: '0.4rem 1.1rem',
            borderRadius: '999px',
            marginBottom: '1.4rem',
            boxShadow: '0 2px 10px rgba(232, 88, 116, 0.12)'
          }}>
            <span style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#E85874',
              animation: 'pulseCoralDot 2s infinite'
            }} />
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#E85874',
              textTransform: 'uppercase'
            }}>
              Next-Gen Industry 4.0 Platform
            </span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
              ATPL Autonomous Ecosystem
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            color: '#0f172a',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-display)'
          }}>
            Targeting Zero-Defect Operations.<br />
            <span style={{
              background: 'linear-gradient(135deg, #0071ba 0%, #E85874 50%, #00a651 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Powering Autonomous Manufacturing.</span>
          </h1>

          <div style={{
            width: '64px',
            height: '4px',
            background: 'linear-gradient(90deg, #0071ba 0%, #E85874 100%)',
            borderRadius: '2px',
            margin: '0 auto 1.85rem auto'
          }}></div>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            color: '#475569',
            lineHeight: 1.65,
            maxWidth: '820px',
            margin: '0 auto 2.6rem auto',
            fontWeight: 400
          }}>
            Archery Technocrats Private Limited (ATPL Group) engineers end-to-end Industry 4.0 automation: proprietary WMS, GS1 serialization, sub-millimeter vision AI, UHF RFID gates, and rugged mobility — built for 35+ years of mission-critical factory uptime.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                const el = document.getElementById('atpl-products-grid');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                padding: '1.05rem 2.4rem',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 113, 186, 0.35)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005a96';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 113, 186, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 113, 186, 0.35)';
              }}
            >
              <span>Explore ATPL Automation Suite</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setCurrentView('factory-3d')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                padding: '1.05rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0071ba';
                e.currentTarget.style.color = '#0071ba';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.color = '#0f172a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={18} color="#0071ba" />
              <span>✨ Launch 3D Virtual Plant</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.86rem', color: '#64748b', marginTop: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> 35+ Years Proven Reliability
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={16} color="#009a44" /> ISO 9001:2015 & GS1 Certified
            </span>
            <button
              onClick={() => {
                setCurrentView('factory-3d');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#0071ba',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>Launch 3D Plant Tour</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. ATPL COMPLETE PRODUCT ECOSYSTEM APPS GRID
         ========================================================================= */}
      <section id="atpl-products-grid" style={{ padding: '4.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0071ba',
              backgroundColor: '#eff6ff',
              padding: '0.3rem 0.8rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.85rem'
            }}>
              ATPL TARGET SUITE™
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.85rem' }}>
              Integrated Industrial Automation & Data Systems
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Click any solution below to summon our AI RoboGuide or explore detailed technical specifications.
            </p>
          </div>

          {/* ATPL Category Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '3rem'
          }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    backgroundColor: isActive ? '#0f172a' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#475569',
                    border: '1px solid ' + (isActive ? '#0f172a' : '#e2e8f0'),
                    padding: '0.55rem 1.15rem',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Zoho-Style Apps Grid with Robot Summon on Click */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredApps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    setCurrentView(app.view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  className="atpl-product-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 18px 35px -10px ${app.color}25, 0 0 0 1px ${app.color}40`;
                    e.currentTarget.style.borderColor = app.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >

                  <div>
                    {/* App Icon Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: app.bgLight,
                        border: `1px solid ${app.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: app.color
                      }}>
                        <Icon size={24} />
                      </div>

                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: app.color,
                        backgroundColor: app.bgLight,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px'
                      }}>
                        {app.tagline}
                      </span>
                    </div>

                    {/* App Title & Description */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      {app.name}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                      {app.desc}
                    </p>

                    {/* Feature Checkpoints */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                      {app.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                          <CheckCircle2 size={15} color={app.color} style={{ flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentView(app.view);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: app.color,
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: 0
                      }}
                    >
                      <span>Explore specs</span>
                      <ArrowRight size={15} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDemoModal({ solution: app.name, notes: `Inquiry for ${app.name}` });
                      }}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#0f172a',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Try Demo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Zoho One Style Section: "The Operating System for Manufacturing & Logistics" */}
      <section style={{ padding: '5.5rem 0', backgroundColor: '#060b14', color: '#ffffff', position: 'relative' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(228, 37, 40, 0.15)',
              border: '1px solid rgba(228, 37, 40, 0.35)',
              color: '#f87171',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              <Sparkles size={14} />
              <span>THE OPERATING SYSTEM FOR SMART FACTORIES</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1.2rem', lineHeight: 1.2 }}>
              One integrated platform to run your entire shopfloor and supply chain.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.65 }}>
              Say goodbye to fragmented point solutions. ATPL brings your ERP, WMS, optical AI cameras, RFID gates, and engineering maintenance into a single connected operational ecosystem.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div style={{
              backgroundColor: 'rgba(14, 26, 49, 0.8)',
              border: '1px solid rgba(0, 113, 186, 0.4)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0, 113, 186, 0.1)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 113, 186, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                marginBottom: '1.5rem'
              }}>
                <Boxes size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                End-to-End Software Suite
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                Native bi-directional connectors for SAP S/4HANA, Oracle, and Microsoft Dynamics with sub-second synchronization.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#38bdf8" /> 99.98% Inventory accuracy guarantee
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#38bdf8" /> Full 21 CFR Part 11 electronic audit trail
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#38bdf8" /> Zero-code workflow customization
                </li>
              </ul>
            </div>

            <div style={{
              backgroundColor: 'rgba(14, 26, 49, 0.8)',
              border: '1px solid rgba(0, 154, 68, 0.4)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0, 154, 68, 0.1)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 154, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
                marginBottom: '1.5rem'
              }}>
                <Radio size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                Rugged Shopfloor Hardware
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                Turnkey procurement, custom optical calibration, and heavy-duty field deployment tailored to your specific plant conditions.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#34d399" /> Fixed UHF RFID portals & antenna arrays
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#34d399" /> Industrial DPM & 2D barcode scanners
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#34d399" /> High-speed TIJ & thermal packaging coders
                </li>
              </ul>
            </div>

            <div style={{
              backgroundColor: 'rgba(14, 26, 49, 0.8)',
              border: '1px solid rgba(228, 37, 40, 0.4)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(228, 37, 40, 0.1)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'rgba(228, 37, 40, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f87171',
                marginBottom: '1.5rem'
              }}>
                <Headphones size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                24/7 FieldCare™ SLA
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                Keep your lines operating 24/7 with our guaranteed response SLAs, quarterly preventive audits, and consignment spare vaults.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#f87171" /> Guaranteed 4-hour on-site engineer dispatch
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#f87171" /> Pre-provisioned hot-swap hardware buffer
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#f87171" /> Direct access to senior automation engineers
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Visual Industry 4.0 Live Deployments & Hardware Showcase Gallery */}
      <section style={{ padding: '5rem 0', backgroundColor: '#0a101d', color: '#ffffff', borderTop: '1px solid #1e293b', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#00f0ff',
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              ENGINEERED HARDWARE & VISION AI IN ACTION
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              Real-World Shopfloor Deployments
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Explore ATPL's heavy-duty industrial hardware, robotic print & apply machines, high-speed vision AI stations, and UHF RFID dock portals operating across top manufacturing plants.
            </p>
          </div>

          {/* Visual Showcase Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            
            {/* 1. RFID Portal Visual Card */}
            <div style={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(0, 113, 186, 0.4)',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img 
                  src="/assets/images/atpl_rfid_portal_showcase.jpg" 
                  alt="ATPL Fixed UHF RFID Dock Gate Portal" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
                  <span>100% READ ACCURACY</span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#38bdf8',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(56, 189, 248, 0.4)'
                }}>
                  Fixed UHF RFID Gate Portal #04
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Automated Dock Gate UHF RFID Portals
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Multi-antenna circular array reading 1,200+ pallet and carton RFID tags simultaneously as forklifts drive through warehouse bay doors at 15 km/h.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('hardware');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: 'rgba(0, 113, 186, 0.2)',
                    border: '1px solid rgba(0, 113, 186, 0.5)',
                    color: '#38bdf8',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Explore RFID Hardware Specs</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* 2. AI Vision Inspection Visual Card */}
            <div style={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img 
                  src="/assets/images/atpl_ai_vision_inspection.jpg" 
                  alt="ATPL Sub-8ms AI Vision Inspection System" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(139, 92, 246, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <Zap size={12} />
                  <span>&lt;8ms DECISION TIME</span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#c084fc',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(192, 132, 252, 0.4)'
                }}>
                  Optical AI Defect Detection Station
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Perfect AI Vision System™ (Defect QC)
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Deep learning optical cameras inspecting circuit boards, connector pins, and EV battery welds in sub-8ms with automatic pneumatic reject sorting.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('software');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    color: '#c084fc',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Explore AI Vision Models</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* 3. Perfect Labeler Visual Card */}
            <div style={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img 
                  src="/assets/images/atpl_labeler_hardware.jpg" 
                  alt="ATPL High Speed Perfect Labeler Print & Apply System" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  backdropFilter: 'blur(8px)'
                }}>
                  120 UNITS / MIN SPEED
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#34d399',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(52, 211, 153, 0.4)'
                }}>
                  PERFECT LABELER™ Print & Apply
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Robotic Print & Apply Applicator
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Synchronized inline thermal printing, pneumatic tamp arm applicator, and integrated ISO 15415 barcode grading for fast-moving conveyor lines.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('hardware');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: '#34d399',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Explore Labeler Applicator</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust, Clients & OEM Partners Strip */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0071ba', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            TRUSTED BY 250+ ENTERPRISE MANUFACTURING LEADERS
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3.5rem',
            maxWidth: '1000px',
            margin: '0 auto 3.5rem auto'
          }}>
            {[
              'Ola Electric FutureFactory', 'Bosch Automotive Electronics', 'JSW Steel Limited', 
              'Caplin Point Laboratories', 'Ashok Leyland', 'Dixon Technologies', 'Dell', 
              'Larsen & Toubro (L&T)', 'ABB', 'Hatsun Dairy', 'Hindustan Unilever (HUL)', 
              'Apollo Tyres', 'Titan', 'Bharat Electronics (BEL)', 'Tenneco', 'JK Fenner'
            ].map((client, idx) => (
              <span 
                key={idx}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.6rem 1.15rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                {client}
              </span>
            ))}
          </div>

          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.75rem' }}>
            STANDARDS, CERTIFICATIONS & OEM ALLIANCES
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            {[
              { name: 'ISO 9001:2015', sub: 'BMQR Quality Management Certified', color: '#0071ba' },
              { name: '#startupindia', sub: 'DPIIT Section 80-IAC Certified', color: '#009a44' },
              { name: 'Honeywell Gold Partner', sub: 'Go Getter Award Winner', color: '#f59e0b' },
              { name: 'TSC Rising Star', sub: '2026 Premier Alliance', color: '#e42528' },
              { name: 'GS1 GLOBAL', sub: 'Certified Solution Partner', color: '#009a44' }
            ].map((cert, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem 1.6rem',
                  textAlign: 'center',
                  minWidth: '190px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{ color: cert.color, fontWeight: 800, fontSize: '1.02rem' }}>{cert.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '4px', fontWeight: 500 }}>{cert.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          OFFICIAL OEM & STRATEGIC PARTNERS SHOWCASE
         ========================================================================= */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <OfficialPartnersShowcase theme="light" />
        </div>
      </section>

      {/* ATPL Bottom CTA Banner */}
      <section style={{
        backgroundColor: '#0f172a',
        padding: '5.5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle accent glow */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
          
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            backgroundColor: 'rgba(0, 113, 186, 0.2)',
            border: '1px solid rgba(0, 113, 186, 0.4)',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '1.25rem'
          }}>
            READY TO TRANSFORM YOUR SHOPFLOOR?
          </span>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Accelerate Your Factory with Archery Technocrats.
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Schedule an on-site facility audit with our senior automation architects or test drive our 3D Digital Twin right in your browser.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => openDemoModal({ solution: 'Plant Audit Consultation', notes: 'Lead initiated from bottom banner CTA' })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                padding: '1.05rem 2.4rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 113, 186, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005a96';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Schedule Plant Feasibility Audit</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setCurrentView('factory-3d')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1.05rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={18} color="#00f0ff" />
              <span>✨ Launch 3D Factory Tour</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
