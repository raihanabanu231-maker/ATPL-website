import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

/**
 * LaurelWreath: Authentic laurel wreath SVG icon matching the Zoho Community social proof metrics.
 */
function LaurelWreath({ children, number, label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem'
    }}>
      {/* Left Laurel Branch */}
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M18 2C16 8 11 13 6 18C2 22 2 28 6 33C8 35 12 36 18 36" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 6C10 9 6 10 3 9" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 14C8 16 5 18 2 17" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 22C7 24 4 27 2 26" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 30C10 31 7 33 5 33" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>

      {/* Number and Label */}
      <div style={{ textAlign: 'left' }}>
        <div style={{
          fontSize: '1.45rem',
          fontWeight: 900,
          color: '#0f172a',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          {number}
        </div>
        <div style={{
          fontSize: '0.84rem',
          color: '#64748b',
          fontWeight: 600,
          marginTop: '0.15rem'
        }}>
          {label}
        </div>
      </div>

      {/* Right Laurel Branch */}
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M4 2C6 8 11 13 16 18C20 22 20 28 16 33C14 35 10 36 4 36" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M8 6C12 9 16 10 19 9" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 14C14 16 17 18 20 17" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 22C15 24 18 27 20 26" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 30C12 31 15 33 17 33" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

/**
 * AtplCommunitySection: Zoho Community-style hero section featuring our real team & leadership
 * Inspired directly by community.zoho.com layout.
 */
export function AtplCommunitySection() {
  const { openDemoModal, setCurrentView } = useApp();
  const [activePhotoTab, setActivePhotoTab] = useState('team'); // 'team' | 'founder'
  const [searchQuery, setSearchQuery] = useState('');

  const searchChips = [
    { label: 'Perfect Store WMS', view: 'software' },
    { label: 'Honeywell Scanners', view: 'hardware' },
    { label: 'Zebra RFID Portals', view: 'hardware' },
    { label: 'AI Vision QC', view: 'software' },
    { label: 'DGFT Serialization', view: 'software' },
    { label: 'Certified OEM Partners', view: 'partners' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('scan') || q.includes('print') || q.includes('rfid') || q.includes('hard')) {
      setCurrentView('hardware');
    } else if (q.includes('wms') || q.includes('soft') || q.includes('trace') || q.includes('vision') || q.includes('audit')) {
      setCurrentView('software');
    } else if (q.includes('partner') || q.includes('oem') || q.includes('zebra') || q.includes('honeywell')) {
      setCurrentView('partners');
    } else if (q.includes('about') || q.includes('team') || q.includes('founder') || q.includes('branch')) {
      setCurrentView('about');
    } else {
      openDemoModal({ mode: 'search', solution: `Inquiry: ${searchQuery}` });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: '#e6f4fc',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0, 113, 186, 0.08) 0%, transparent 45%),
          linear-gradient(135deg, #e5f4fd 0%, #edf7fd 50%, #f0f9ff 100%)
        `,
        padding: '5.5rem 0 4rem 0',
        overflow: 'hidden',
        borderTop: '1px solid #dbeafe',
        borderBottom: '1px solid #dbeafe'
      }}
    >
      {/* Subtle Background Cityscape / Smart Factory Skyline Vector (Like Zoho Community) */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '70px',
          right: 0,
          width: '55vw',
          height: '280px',
          opacity: 0.12,
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3.5rem 4.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem'
          }}
        >
          {/* =========================================================================
              LEFT COLUMN: Zoho Community Content & Metrics
             ========================================================================= */}
          <div>
            {/* Small Brand App Badge (Like Zoho Community) */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.75rem'
              }}
            >
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #0071ba',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 113, 186, 0.15)'
                }}
              >
                <Users size={22} color="#0071ba" strokeWidth={2.4} />
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.01em'
              }}>
                ATPL <span style={{ color: '#0071ba' }}>Community</span>
              </span>
            </div>

            {/* Main Headline */}
            <h2 
              style={{
                fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.14,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}
            >
              ATPL Community
            </h2>

            {/* Subtitle / Value Proposition */}
            <p 
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.22rem)',
                lineHeight: 1.65,
                color: '#475569',
                marginBottom: '2rem',
                maxWidth: '520px'
              }}
            >
              Where Industry 4.0 innovators, mechanical engineers, and factory pioneers connect, engage, and build the future of Indian manufacturing.
            </p>

            {/* CTA Button: Zoho-Style Red/Coral Pill Button */}
            <div style={{ marginBottom: '2.75rem' }}>
              <button
                onClick={() => openDemoModal({ mode: 'community', solution: 'ATPL Community & Engineering Network' })}
                style={{
                  backgroundColor: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 22px rgba(225, 29, 72, 0.35)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#be123c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(225, 29, 72, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e11d48';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(225, 29, 72, 0.35)';
                }}
              >
                <span>JOIN NOW</span>
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Social Proof Laurel Wreath Metrics (Exact Zoho Community Style) */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                flexWrap: 'wrap',
                paddingTop: '0.5rem'
              }}
            >
              <LaurelWreath number="250+" label="Enterprise Clients" />
              
              {/* Vertical divider */}
              <div style={{ width: '1px', height: '42px', backgroundColor: '#cbd5e1' }} />
              
              <LaurelWreath number="35+ Years" label="Domain Legacy" />

              {/* Vertical divider */}
              <div style={{ width: '1px', height: '42px', backgroundColor: '#cbd5e1' }} />

              <LaurelWreath number="6 Hubs" label="Pan-India Branches" />
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: "put our images like this" - Real Team & Leadership
             ========================================================================= */}
          <div style={{ position: 'relative' }}>
            
            {/* Top Toggle Pills: Team Expo vs Founder */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                position: 'relative',
                zIndex: 3
              }}
            >
              <button
                type="button"
                onClick={() => setActivePhotoTab('team')}
                style={{
                  backgroundColor: activePhotoTab === 'team' ? '#0071ba' : 'rgba(255, 255, 255, 0.8)',
                  color: activePhotoTab === 'team' ? '#ffffff' : '#475569',
                  border: activePhotoTab === 'team' ? '1.5px solid #0071ba' : '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: activePhotoTab === 'team' ? '0 4px 14px rgba(0, 113, 186, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                👥 ATPL Engineering Team
              </button>
              <button
                type="button"
                onClick={() => setActivePhotoTab('founder')}
                style={{
                  backgroundColor: activePhotoTab === 'founder' ? '#0071ba' : 'rgba(255, 255, 255, 0.8)',
                  color: activePhotoTab === 'founder' ? '#ffffff' : '#475569',
                  border: activePhotoTab === 'founder' ? '1.5px solid #0071ba' : '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: activePhotoTab === 'founder' ? '0 4px 14px rgba(0, 113, 186, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                👔 Leadership & Founder
              </button>
            </div>

            {/* Team / Leadership Showcase Stage (Grounded seamlessly on Sky-Blue Canvas) */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '3px solid #ffffff',
                boxShadow: '0 24px 60px rgba(0, 113, 186, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.35s ease'
              }}
            >
              {activePhotoTab === 'team' ? (
                <div style={{ position: 'relative' }}>
                  <img 
                    src="/assets/images/atpl_team_full_group.png"
                    alt="Archery Technocrats Private Limited - Authentic Engineering Team at Industrial Expo"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Subtle Gradient Overlay at bottom for clean caption integration */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.3) 65%, transparent 100%)',
                      padding: '1.75rem 1.25rem 1rem 1.25rem',
                      color: '#ffffff'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                          Archery Technocrats Engineering Force
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                          In-House Software Engineers, AIDC Integrators &amp; Leadership
                        </div>
                      </div>
                      <span style={{
                        backgroundColor: 'rgba(0, 240, 255, 0.25)',
                        border: '1px solid rgba(0, 240, 255, 0.5)',
                        color: '#38bdf8',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                        backdropFilter: 'blur(8px)'
                      }}>
                        ● EXPO BOOTH 2026
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <img 
                    src="/assets/images/amarnath_paramasivam.jpg"
                    alt="Amarnath Paramasivam - Founder & Managing Director, Archery Technocrats"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Bottom Caption for Founder */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 65%, transparent 100%)',
                      padding: '1.75rem 1.25rem 1rem 1.25rem',
                      color: '#ffffff'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                          Amarnath Paramasivam
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                          Founder &amp; Managing Director • 15+ Yrs Industry 4.0 Vision
                        </div>
                      </div>
                      <span style={{
                        backgroundColor: 'rgba(232, 88, 116, 0.25)',
                        border: '1px solid rgba(232, 88, 116, 0.5)',
                        color: '#fda4af',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                        backdropFilter: 'blur(8px)'
                      }}>
                        EXECUTIVE LEADERSHIP
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Tag Card Top-Right */}
            <div 
              style={{
                position: 'absolute',
                top: '45px',
                right: '-12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 4,
                animation: 'atplFloatTag 6s ease-in-out infinite alternate'
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }} />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                100% In-House R&amp;D
              </div>
            </div>

            {/* Floating Tag Card Bottom-Left */}
            <div 
              style={{
                position: 'absolute',
                bottom: '15px',
                left: '-15px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 4,
                animation: 'atplFloatTag 7s ease-in-out infinite alternate-reverse'
              }}
            >
              <Sparkles size={14} color="#0071ba" />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                ISO 9001:2015 Certified
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            BOTTOM FLOATING SEARCH / NAVIGATOR BAR (Exact Zoho Community Bottom Bar)
           ========================================================================= */}
        <div 
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '999px',
              padding: '0.5rem 0.75rem 0.5rem 1.5rem',
              boxShadow: '0 12px 35px rgba(0, 113, 186, 0.14), 0 2px 8px rgba(0, 0, 0, 0.05)',
              border: '1.5px solid #dbeafe',
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={22} color="#0071ba" style={{ marginRight: '0.85rem', flexShrink: 0 }} />
            
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions, AIDC hardware, WMS modules, or client case studies..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                color: '#0f172a',
                backgroundColor: 'transparent',
                fontWeight: 500
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.75rem 1.6rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(0, 113, 186, 0.3)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005288';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Search</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick-Click Suggestion Chips */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.55rem',
              justifyContent: 'center',
              marginTop: '1.15rem'
            }}
          >
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, alignSelf: 'center', marginRight: '0.25rem' }}>
              Popular searches:
            </span>
            {searchChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentView(chip.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '0.28rem 0.8rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backdropFilter: 'blur(6px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#0071ba';
                  e.currentTarget.style.color = '#0071ba';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes atplFloatTag {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}
