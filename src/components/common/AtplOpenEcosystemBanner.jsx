import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Database, 
  Scan, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  X, 
  Pin,
  Layers,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AtplOpenEcosystemBanner = () => {
  const { openDemoModal } = useApp();
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const INTEGRATIONS = [
    { name: 'SAP S/4HANA', type: 'ERP', badge: 'Certified RFC/BAPI' },
    { name: 'Oracle ERP Cloud', type: 'ERP', badge: 'REST / Telemetry' },
    { name: 'Zebra Technologies', type: 'Hardware', badge: 'Premier Partner' },
    { name: 'Siemens SIMATIC', type: 'Automation', badge: 'PLC / SCADA' },
    { name: 'Cognex Vision', type: 'Vision', badge: 'Micro-QR Grading' },
    { name: 'Microsoft Dynamics', type: 'ERP', badge: 'Warehouse API' },
    { name: 'Rockwell Automation', type: 'Automation', badge: 'EtherNet/IP' },
    { name: 'AWS Industrial IoT', type: 'Cloud', badge: 'MQTT Stream' }
  ];

  const CAPABILITY_PILLARS = [
    {
      id: 'pillar-hardware',
      icon: Scan,
      title: 'Industrial Hardware & AIDC',
      subtitle: 'Shopfloor Execution Layer',
      description: 'Plug-and-play integration with Zebra handhelds, high-speed fixed laser scanners, RFID dock portals, and thermal print engines with sub-12ms response.',
      stat: '< 12ms',
      statLabel: 'Edge Scan Latency',
      gradient: 'linear-gradient(135deg, #032D60 0%, #0A4B94 100%)'
    },
    {
      id: 'pillar-erp',
      icon: Database,
      title: 'Enterprise ERP & MES Ledger',
      subtitle: 'Corporate Data Sync Layer',
      description: 'Native bidirectional connectors for SAP S/4HANA, Oracle Cloud, and Microsoft Dynamics, syncing finished-goods serials and batch genealogy in real time.',
      stat: '100%',
      statLabel: 'AIS-156 & DGFT Compliance',
      gradient: 'linear-gradient(135deg, #022754 0%, #063A78 100%)'
    },
    {
      id: 'pillar-vision',
      icon: Cpu,
      title: 'Cognitive Vision & PLCs',
      subtitle: 'Inline Quality & Robotics',
      description: 'Sub-millisecond machine vision grading conforming to ISO/IEC 15415 standards, with 4ms pneumatic rejection gates and Siemens/Rockwell PLC signaling.',
      stat: '99.99%',
      statLabel: 'First-Pass Read Rate',
      gradient: 'linear-gradient(135deg, #021F45 0%, #083366 100%)'
    }
  ];

  return (
    <section
      id="open-ecosystem-section"
      style={{
        position: 'relative',
        backgroundColor: '#040914',
        backgroundImage: 'radial-gradient(ellipse at 50% 10%, rgba(0, 113, 186, 0.22) 0%, #060e20 50%, #020712 100%)',
        color: '#ffffff',
        padding: 'clamp(4.5rem, 8vw, 7.5rem) 0 clamp(4rem, 6vw, 6rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      {/* Subtle atmospheric ambient glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.25) 0%, rgba(0, 240, 255, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* =====================================================================
            1. CYBER-COCKPIT BOLD HERO MANIFESTO
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '1040px', margin: '0 auto' }}>
          
          {/* Eyebrow Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.3)', marginBottom: '1.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00f0ff' }}>
              UNIVERSAL INDUSTRIAL ARCHITECTURE
            </span>
          </div>

          {/* Giant Bold Headline */}
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 1.5rem 0'
            }}
          >
            ATPL is <span style={{ color: '#00f0ff', textShadow: '0 0 25px rgba(0, 240, 255, 0.4)' }}>open to every machine</span>, operator, and platform
          </h2>

          {/* Punchy Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.75vw, 1.25rem)',
              lineHeight: 1.65,
              color: '#94a3b8',
              maxWidth: '860px',
              margin: '0 auto 2.75rem auto',
              fontWeight: 400
            }}
          >
            When you build on ATPL, you’re connected to the shopfloor machinery your business depends on, 
            the enterprise infrastructure you’ve invested in, and the engineering partners who know how 
            to bring it all together.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4.5rem' }}>
            <button
              onClick={() => openDemoModal({ solution: 'Enterprise Plant Architecture', notes: 'Inquiry from Open Ecosystem Section' })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: '1px solid rgba(0, 240, 255, 0.45)',
                padding: '14px 32px',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(0, 113, 186, 0.4), 0 0 15px rgba(0, 240, 255, 0.25)',
                transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005a96';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 240, 255, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 113, 186, 0.4)';
              }}
            >
              <span>Explore Enterprise Architecture</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => openDemoModal({ solution: 'System Integration Review', notes: 'Request ERP & hardware integration blueprint' })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                padding: '14px 28px',
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Schedule Plant Review</span>
            </button>
          </div>

        </div>

        {/* =====================================================================
            2. 3-COLUMN ENTERPRISE CAPABILITY PILLARS
           ===================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4.5rem'
          }}
        >
          {CAPABILITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                style={{
                  backgroundColor: 'rgba(6, 18, 38, 0.88)',
                  borderRadius: '24px',
                  padding: '2.25rem 2rem',
                  border: '1px solid rgba(0, 240, 255, 0.22)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#00f0ff';
                  e.currentTarget.style.boxShadow = '0 24px 50px rgba(0, 113, 186, 0.35), 0 0 20px rgba(0, 240, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.35)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#020b18',
                        boxShadow: '0 8px 20px rgba(0, 113, 186, 0.4)'
                      }}
                    >
                      <Icon size={26} color="#020b18" />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#00f0ff', lineHeight: 1.1 }}>
                        {pillar.stat}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {pillar.statLabel}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    {pillar.subtitle}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.85rem 0', letterSpacing: '-0.01em' }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0, 240, 255, 0.12)', display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '13px', fontWeight: 700 }}>
                  <CheckCircle2 size={16} color="#00f0ff" />
                  <span>Production-tested on 200+ shopfloors</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            3. LOGO & ECOSYSTEM TICKER: "Integrate with your enterprise ERP & PLCs"
           ===================================================================== */}
        <div
          style={{
            backgroundColor: 'rgba(5, 14, 32, 0.92)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            padding: '2.25rem 2.5rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                SEAMLESS INTEROPERABILITY
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Integrate with your enterprise ecosystem of choice
              </h4>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
              Zero custom coding • Bidirectional REST/RFC • Real-time audit
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(10, 24, 52, 0.75)',
                  border: '1px solid rgba(0, 240, 255, 0.18)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00f0ff';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 240, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.18)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 6px #00f0ff' }} />
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                    {item.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#00f0ff',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    padding: '3px 9px',
                    borderRadius: '999px'
                  }}
                >
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default AtplOpenEcosystemBanner;

