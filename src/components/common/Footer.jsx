import React from 'react';
import { useApp } from '../../context/AppContext';
import { AtplLogo } from './AtplLogo';
import { ShieldCheck, Mail, Phone, MapPin, LayoutDashboard, Sparkles, ArrowRight, Building2 } from 'lucide-react';

export const Footer = () => {
  const { setCurrentView, openDemoModal } = useApp();

  const handleNav = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#090e1a',
      color: '#94a3b8',
      borderTop: '1px solid #1e293b',
      padding: '5rem 0 2rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        
        {/* Main 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <AtplLogo size={38} showText={true} lightText={true} onClick={() => handleNav('home')} />
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Archery Technocrats Private Limited — Empowering global industrial enterprises with Industry 4.0 digital transformation, autonomous WMS, GS1 serialization, and AI vision inspection.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                color: '#e2e8f0',
                fontWeight: 600
              }}>
                ISO 9001:2015
              </span>
              <span style={{
                backgroundColor: 'rgba(0, 154, 68, 0.15)',
                border: '1px solid rgba(0, 154, 68, 0.3)',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                color: '#34d399',
                fontWeight: 600
              }}>
                GS1 Partner
              </span>
              <span style={{
                backgroundColor: 'rgba(0, 113, 186, 0.15)',
                border: '1px solid rgba(0, 113, 186, 0.3)',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                color: '#38bdf8',
                fontWeight: 600
              }}>
                21 CFR Part 11
              </span>
            </div>
          </div>

          {/* Col 2: Software Suites */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Software Suites
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#00f0ff', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  💻 Explore All Software ➔
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Perfect Store™ (Warehouse WMS)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Perfect Trace™ (GS1 Serialization)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Perfect PMS™ (Production Management)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Perfect AI Vision™ (Defect QC)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Perfect Audit™ (Digital Compliance)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('factory-3d')} style={{ background: 'none', border: 'none', color: '#E85874', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  ✨ 3D Digital Twin Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware Solutions */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Hardware Solutions
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  ⚡ Explore All Hardware ➔
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Fixed UHF RFID Portals & Gates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Industrial 2D & DPM Barcode Scanners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Thermal Barcode & RFID Printers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Rugged Mobile Computers (PDA/EDA)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  Robotics, Sorting & Conveyor Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partners')} style={{ background: 'none', border: 'none', color: '#34d399', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left', padding: 0 }}>
                  🤝 Official OEM Partners (Honeywell, Zebra)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Headquarters & Offices
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}>
                <MapPin size={16} color="#E85874" />
                <span>TIDEL Park, Taramani, Chennai</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                <Building2 size={16} color="var(--cyan-primary)" />
                <span>TCE-TBI, Madurai (R&D Center)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#0071ba" />
                <span>info@atplgroup.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#009a44" />
                <span>1800-120-774777 (Toll Free)</span>
              </div>
            </div>

            <button
              onClick={() => handleNav('admin')}
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.65rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              <LayoutDashboard size={15} />
              <span>Admin & CMS Control Center</span>
            </button>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 Archery Technocrats Private Limited (ATPL Group). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ color: '#009a44' }}>● System Operational (99.98% SLA)</span>
            <button 
              onClick={() => handleNav('contact')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNav('contact')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
