import React, { useRef } from 'react';

const TOP_CLIENT_LOGOS = [
  { name: 'Ola Electric', logoUrl: '/assets/images/clients/ola-electric.svg' },
  { name: 'Larsen & Toubro', logoUrl: '/assets/images/clients/larsen-toubro.svg' },
  { name: 'Apollo Tyres', logoUrl: '/assets/images/clients/apollo-tyres.svg' },
  { name: 'ABB Automation', logoUrl: '/assets/images/clients/abb.svg' },
  { name: 'Bosch', logoUrl: '/assets/images/clients/bosch.svg' },
  { name: 'Schneider Electric', logoUrl: '/assets/images/clients/schneider-electric.svg' },
  { name: 'Tata Motors', logoUrl: '/assets/images/clients/tata-motors.svg' },
  { name: 'Dell Technologies', logoUrl: '/assets/images/clients/dell-technologies.svg' },
  { name: 'Pegatron Electronics', logoUrl: '/assets/images/clients/pegatron-electronics.svg' },
  { name: 'Dixon Technologies', logoUrl: '/assets/images/clients/dixon-technologies.svg' },
  { name: 'BorgWarner', logoUrl: '/assets/images/clients/borgwarner.svg' },
  { name: 'Godrej', logoUrl: '/assets/images/clients/godrej.svg' },
  { name: 'Proconnect Logistics', logoUrl: '/assets/images/clients/proconnect-logistics.svg' },
  { name: 'ArcelorMittal', logoUrl: '/assets/images/clients/arcelormittal.svg' },
  { name: 'Bharat Electronics', logoUrl: '/assets/images/clients/bel-bharat-electronics.svg' },
  { name: 'Hindustan Unilever', logoUrl: '/assets/images/clients/hindustan-unilever.svg' },
  { name: 'GMR Airports', logoUrl: '/assets/images/clients/gmr-airports.svg' },
  { name: 'Caplin Steriles', logoUrl: '/assets/images/clients/caplin-steriles.svg' }
];

export const SalesforceCustomerTopBanner = () => {
  const videoRef = useRef(null);

  return (
    <section
      id="customers"
      data-section="customers-top"
      style={{
        position: 'relative',
        backgroundColor: '#0176D3',
        backgroundImage: 'linear-gradient(180deg, #E6F3FE 0%, #BFE0FD 10%, #0176D3 28%, #00569E 100%)',
        color: '#ffffff',
        padding: 'clamp(2.5rem, 4vw, 4rem) 0 clamp(2.5rem, 4vw, 3.5rem) 0',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Decorative Golden Star Accent (Salesforce Signature) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vw, 50px)',
          right: 'clamp(4%, 8vw, 12%)',
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* =====================================================================
            1. SALESFORCE-STYLE BOLD HEADING & SUBTITLE (Positioned ABOVE the Video)
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '1040px', margin: '0 auto clamp(2rem, 3.5vw, 3rem) auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.25)', marginBottom: '1.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
            <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
              VERIFIED ENTERPRISE SUCCESS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.3rem, 4.6vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1.25rem 0'
            }}
          >
            Customers of every size, business, and industry succeed with ATPL
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '860px',
              margin: '0 auto',
              fontWeight: 450
            }}
          >
            Where human ingenuity joins industrial precision robotics. From automotive mega-factories and SMT cleanrooms to 3PL omnichannel distribution hubs, India's leading manufacturers rely on ATPL for millisecond traceability, cognitive vision, and zero-defect execution.
          </p>
        </div>

        {/* =====================================================================
            2. CRYSTAL-CLEAR FULL-WIDTH HANDSHAKE VIDEO SHOWCASE (Directly Below Heading)
               (100% sharp, bright & authentic - zero dark/blue tint overlays)
           ===================================================================== */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto clamp(2.5rem, 4.5vw, 3.5rem) auto',
            borderRadius: 'clamp(18px, 2.5vw, 28px)',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 35, 90, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.28)',
            backgroundColor: '#020b18',
            aspectRatio: '16 / 9',
            maxHeight: '620px'
          }}
        >
          {/* The Video Element - Pure, crystal-clear, zero overlay wash */}
          <video
            ref={videoRef}
            src="/assets/videos/human_robot_handshake.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Top-Left Live Status Telemetry Pill */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(5, 12, 28, 0.82)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
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
        </div>
      </div>

      {/* =====================================================================
          3. 100% FULL-SCREEN EDGE-TO-EDGE CLIENT LOGO MARQUEE
             (ONLY REAL LOGOS, NO COMPANY NAME TEXT, NO PAUSE BUTTON)
         ========================================================================= */}
      <div
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          padding: '1.8rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.22)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.22)',
          backgroundColor: '#00569E',
          backgroundImage: 'linear-gradient(90deg, #004d8c 0%, #00569E 50%, #004d8c 100%)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Left & Right Edge Fade Gradients */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 'clamp(60px, 12vw, 180px)',
            background: 'linear-gradient(90deg, #004d8c 0%, rgba(0, 77, 140, 0.85) 35%, transparent 100%)',
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
            width: 'clamp(60px, 12vw, 180px)',
            background: 'linear-gradient(270deg, #004d8c 0%, rgba(0, 77, 140, 0.85) 35%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />

        <style>{`
          @keyframes atplTopClientTicker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .atpl-top-ticker-track {
            display: flex;
            align-items: center;
            gap: clamp(2.5rem, 4.5vw, 4.5rem);
            width: max-content;
            animation: atplTopClientTicker 42s linear infinite;
            will-change: transform;
          }
          .atpl-top-ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="atpl-top-ticker-track">
          {[...TOP_CLIENT_LOGOS, ...TOP_CLIENT_LOGOS].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'transform 0.25s ease, filter 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'none';
              }}
            >
              <img
                src={item.logoUrl}
                alt={item.name}
                style={{
                  height: '56px',
                  width: 'auto',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)'
                }}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SalesforceCustomerTopBanner;
