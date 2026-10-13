import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

/**
 * LaurelWreath: Authentic laurel wreath SVG icon with ATPL Logo Blue & light styling.
 */
function LaurelWreath({ children, number, label, accentColor = '#299fe0' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem'
    }}>
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
          letterSpacing: '-0.02em'
        }}>
          {number}
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
    </div>
  );
}

/**
 * AtplCommunitySection: Zoho Community-style hero section featuring our real team & leadership
 * Inspired directly by community.zoho.com layout with 30-30-40 brand harmony.
 */
export function AtplCommunitySection() {
  const { openDemoModal, setCurrentView } = useApp();
  const [activePhotoTab, setActivePhotoTab] = useState('team'); // 'team' | 'founder'

  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: '#070d18',
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(0, 113, 186, 0.16) 0%, transparent 45%),
          radial-gradient(circle at 85% 75%, rgba(232, 88, 116, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #060b14 0%, #0a1324 50%, #060b14 100%)
        `,
        padding: '5rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 113, 186, 0.2)',
        borderBottom: '1px solid rgba(0, 113, 186, 0.2)'
      }}
    >
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
              LEFT COLUMN: Zoho Community Content & Metrics
             ========================================================================= */}
          <div>
            {/* Small Brand App Badge */}
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
                  backgroundColor: 'rgba(14, 26, 49, 0.85)',
                  border: '2px solid #0071ba',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0, 113, 186, 0.3)'
                }}
              >
                <Users size={22} color="#299fe0" strokeWidth={2.4} />
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.01em'
              }}>
                ATPL <span style={{ color: '#299fe0' }}>Community</span>
              </span>
            </div>

            {/* Main Headline */}
            <h2 
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                fontWeight: 900,
                color: '#ffffff',
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
                fontSize: 'clamp(1rem, 1.6vw, 1.22rem)',
                lineHeight: 1.65,
                color: '#94a3b8',
                marginBottom: '2rem',
                maxWidth: '520px'
              }}
            >
              Where Industry 4.0 innovators, mechanical engineers, and factory pioneers connect, engage, and build the future of Indian manufacturing.
            </p>

            {/* CTA Button: ATPL Coral Pill Button */}
            <div style={{ marginBottom: '2.75rem' }}>
              <button
                onClick={() => openDemoModal({ mode: 'community', solution: 'ATPL Community & Engineering Network' })}
                style={{
                  backgroundColor: '#E85874',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 24px rgba(232, 88, 116, 0.4)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d44360';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(232, 88, 116, 0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E85874';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(232, 88, 116, 0.4)';
                }}
              >
                <span>JOIN NOW</span>
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Social Proof Laurel Wreath Metrics */}
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
              <LaurelWreath number="250+" label="Enterprise Clients" accentColor="#299fe0" />
              
              {/* Vertical divider */}
              <div className="atpl-laurel-divider" style={{ width: '1px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
              
              <LaurelWreath number="35+ Years" label="Domain Legacy" accentColor="#E85874" />

              {/* Vertical divider */}
              <div className="atpl-laurel-divider" style={{ width: '1px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

              <LaurelWreath number="6 Hubs" label="Pan-India Branches" accentColor="#00f0ff" />
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Real Team & Leadership Showcase
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
                  backgroundColor: activePhotoTab === 'team' ? '#0071ba' : 'rgba(14, 26, 49, 0.75)',
                  color: activePhotoTab === 'team' ? '#ffffff' : '#94a3b8',
                  border: activePhotoTab === 'team' ? '1.5px solid #299fe0' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: activePhotoTab === 'team' ? '0 4px 14px rgba(0, 113, 186, 0.4)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                👥 ATPL Engineering Team
              </button>
              <button
                type="button"
                onClick={() => setActivePhotoTab('founder')}
                style={{
                  backgroundColor: activePhotoTab === 'founder' ? '#0071ba' : 'rgba(14, 26, 49, 0.75)',
                  color: activePhotoTab === 'founder' ? '#ffffff' : '#94a3b8',
                  border: activePhotoTab === 'founder' ? '1.5px solid #299fe0' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: activePhotoTab === 'founder' ? '0 4px 14px rgba(0, 113, 186, 0.4)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                👔 Leadership & Founder
              </button>
            </div>

            {/* Team / Leadership Showcase Stage */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#0b1528',
                border: '2px solid rgba(0, 113, 186, 0.35)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(0, 113, 186, 0.15)',
                transition: 'all 0.35s ease'
              }}
            >
              {activePhotoTab === 'team' ? (
                <div style={{ position: 'relative' }}>
                  <img 
                    src="/assets/images/atpl_team_full_group.png"
                    alt="Archery Technocrats Private Limited - Authentic Engineering Team at Industrial Expo"
                    width="800"
                    height="440"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      aspectRatio: '800 / 440',
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
                      background: 'linear-gradient(to top, rgba(6, 11, 20, 0.95) 0%, rgba(6, 11, 20, 0.4) 65%, transparent 100%)',
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
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
                          Archery Technocrats Engineering Force
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          In-House Software Engineers, AIDC Integrators &amp; Leadership
                        </div>
                      </div>
                      <span style={{
                        backgroundColor: 'rgba(0, 240, 255, 0.2)',
                        border: '1px solid rgba(0, 240, 255, 0.5)',
                        color: '#00f0ff',
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
                    width="800"
                    height="440"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      aspectRatio: '800 / 440',
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
                      background: 'linear-gradient(to top, rgba(6, 11, 20, 0.95) 0%, rgba(6, 11, 20, 0.4) 65%, transparent 100%)',
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
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                          Amarnath Paramasivam
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
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
              className="atpl-community-tag-tr"
              style={{
                position: 'absolute',
                top: '45px',
                right: '-12px',
                backgroundColor: 'rgba(11, 21, 40, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 113, 186, 0.45)',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
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
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 8px #00f0ff'
              }} />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                100% In-House R&amp;D
              </div>
            </div>

            {/* Floating Tag Card Bottom-Left */}
            <div 
              className="atpl-community-tag-bl"
              style={{
                position: 'absolute',
                bottom: '15px',
                left: '-15px',
                backgroundColor: 'rgba(11, 21, 40, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(232, 88, 116, 0.45)',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 4,
                animation: 'atplFloatTag 7s ease-in-out infinite alternate-reverse'
              }}
            >
              <Sparkles size={14} color="#E85874" />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                ISO 9001:2015 Certified
              </div>
            </div>

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
          .atpl-community-tag-tr {
            right: 8px !important;
            top: 12px !important;
            padding: 0.4rem 0.7rem !important;
          }
          .atpl-community-tag-bl {
            left: 8px !important;
            bottom: 12px !important;
            padding: 0.4rem 0.7rem !important;
          }
          .atpl-search-form {
            padding: 0.35rem 0.5rem 0.35rem 1rem !important;
          }
          .atpl-search-input {
            font-size: 0.88rem !important;
          }
          .atpl-search-btn {
            padding: 0.55rem 1.1rem !important;
            font-size: 0.84rem !important;
          }
        }
      `}</style>
    </section>
  );
}
