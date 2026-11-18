import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';

const TOP_CLIENT_LOGOS = [
  { name: 'Ola Electric', logoUrl: '/assets/images/clients/ola-electric.svg', fallbackText: 'OLA ELECTRIC' },
  { name: 'Pegatron Electronics', logoUrl: '/assets/images/clients/pegatron-electronics.svg', fallbackText: 'PEGATRON' },
  { name: 'Apollo Tyres', logoUrl: '/assets/images/clients/apollo-tyres.svg', fallbackText: 'APOLLO TYRES' },
  { name: 'ABB Automation', logoUrl: '/assets/images/clients/abb.webp', fallbackText: 'ABB' },
  { name: 'Larsen & Toubro', logoUrl: '/assets/images/clients/larsen-toubro.webp', fallbackText: 'L&T' },
  { name: 'Proconnect Logistics', logoUrl: '/assets/images/clients/proconnect-logistics.svg', fallbackText: 'PROCONNECT' },
  { name: 'Roche Diagnostics', logoUrl: '/assets/images/clients/roche-diagnostics.webp', fallbackText: 'ROCHE' },
  { name: 'Bharat Electronics', logoUrl: '/assets/images/clients/bel-bharat-electronics.webp', fallbackText: 'BEL' },
  { name: 'Hindustan Unilever', logoUrl: '/assets/images/clients/hindustan-unilever.webp', fallbackText: 'HUL' },
  { name: 'BorgWarner', logoUrl: '/assets/images/clients/borgwarner.webp', fallbackText: 'BORGWARNER' },
  { name: 'Dixon Technologies', logoUrl: '/assets/images/clients/dixon-technologies.webp', fallbackText: 'DIXON' },
  { name: 'Godrej', logoUrl: '/assets/images/clients/godrej.webp', fallbackText: 'GODREJ' },
  { name: 'Tata Steel / Mjunction', logoUrl: '/assets/images/clients/mjunction.webp', fallbackText: 'TATA MJUNCTION' },
  { name: 'Schneider Electric', logoUrl: '/assets/images/clients/schneider-electric.svg', fallbackText: 'SCHNEIDER' }
];

export const SalesforceCustomerHeroVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="customer-hero-video-section"
      style={{
        position: 'relative',
        backgroundColor: '#0176D3',
        backgroundImage: 'linear-gradient(180deg, #E6F3FE 0%, #BFE0FD 18%, #0176D3 38%, #00569E 100%)',
        color: '#ffffff',
        padding: 'clamp(3rem, 5vw, 4.5rem) 0 clamp(3.5rem, 6vw, 5rem) 0',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Golden Star Accent (Matching Reference Screenshot) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(28px, 6vw, 64px)',
          right: 'clamp(5%, 12vw, 15%)',
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
        </svg>
      </div>

      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* =====================================================================
            1. FLOATING HERO VIDEO SHOWCASE (Human & Robot Hands Shaking)
           ===================================================================== */}
        <div style={{ maxWidth: '1040px', margin: '0 auto clamp(2.5rem, 5vw, 4rem) auto', position: 'relative' }}>
          
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 45, 110, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3)',
              backgroundColor: '#031738',
              aspectRatio: '16 / 9',
              maxHeight: '580px'
            }}
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src="/assets/videos/human_robot_handshake.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Overlay Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(3, 23, 56, 0.25) 0%, transparent 40%, rgba(3, 23, 56, 0.75) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Eyebrow Tag */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(3, 23, 56, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              <span>COLLABORATIVE INTELLIGENCE // HUMAN &amp; ROBOTICS</span>
            </div>

            {/* Video Controls Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#032D60',
                    border: 'none',
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  style={{
                    backgroundColor: 'rgba(3, 23, 56, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(3, 23, 56, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                Production Verified // 200+ Enterprise Facilities
              </div>
            </div>

          </div>

        </div>

        {/* =====================================================================
            2. SALESFORCE-STYLE BOLD HEADING
               "Customers of every size, business, and industry succeed with ATPL"
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto clamp(2rem, 4vw, 3rem) auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1rem 0'
            }}
          >
            Customers of every size, business, and industry succeed with ATPL
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '820px',
              margin: '0 auto',
              fontWeight: 450
            }}
          >
            From automotive mega-factories and SMT cleanrooms to 3PL omnichannel distribution hubs, 
            India's leading manufacturers rely on ATPL for millisecond traceability, cognitive vision, and zero-defect execution.
          </p>
        </div>

        {/* =====================================================================
            3. HORIZONTAL CLIENT LOGO MARQUEE STRIP (Matching Reference Screenshot)
           ===================================================================== */}
        <div
          style={{
            position: 'relative',
            marginTop: '2rem',
            padding: '1.25rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Left/Right Fade Mask */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '80px',
              background: 'linear-gradient(90deg, #0176D3 0%, transparent 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '80px',
              background: 'linear-gradient(270deg, #0176D3 0%, transparent 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />

          <style>{`
            @keyframes atplClientTicker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .atpl-ticker-track {
              display: flex;
              align-items: center;
              gap: 3.5rem;
              width: max-content;
              animation: atplClientTicker 32s linear infinite;
            }
            .atpl-ticker-track.paused {
              animation-play-state: paused;
            }
          `}</style>

          <div
            className={`atpl-ticker-track ${isMarqueePaused ? 'paused' : ''}`}
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
          >
            {[...TOP_CLIENT_LOGOS, ...TOP_CLIENT_LOGOS].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: 0.92,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.92';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {item.logoUrl ? (
                  <div
                    style={{
                      height: '34px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      style={{
                        height: '24px',
                        maxWidth: '90px',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                ) : null}
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#ffffff',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.fallbackText || item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Marquee Pause/Play Toggle Button (as in Image 2) */}
          <div
            style={{
              position: 'absolute',
              right: '16px',
              zIndex: 10,
              backgroundColor: 'rgba(3, 45, 96, 0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
            title={isMarqueePaused ? 'Play marquee' : 'Pause marquee'}
          >
            {isMarqueePaused ? <Play size={12} style={{ marginLeft: '1px' }} /> : <Pause size={12} />}
          </div>
        </div>

      </div>

    </section>
  );
};

export default SalesforceCustomerHeroVideo;
