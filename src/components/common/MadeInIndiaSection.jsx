import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight } from 'lucide-react';

export const MadeInIndiaSection = () => {
  const { setCurrentView } = useApp();
  const [btnHover, setBtnHover] = useState(false);

  const metrics = [
    {
      value: '250+',
      label: 'Plants & Hubs Served',
      subtext: 'Across manufacturing & 3PL'
    },
    {
      value: '35+',
      label: 'Years Combined Domain',
      subtext: 'In shopfloor automation'
    },
    {
      value: '6+',
      label: 'In-House Software Products',
      subtext: 'WMS, MDM, Trace, Audit'
    },
    {
      value: '500K+',
      label: 'Daily Shopfloor Moves',
      subtext: 'Barcode & RFID verified'
    },
    {
      value: '4-Hour',
      label: 'On-Site Support SLA',
      subtext: 'South India industrial hubs'
    }
  ];

  const handleLearnMore = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: '#0059b3',
        background: 'linear-gradient(135deg, #004b99 0%, #0066cc 50%, #0352a0 100%)',
        color: '#ffffff',
        padding: '5.5rem 1.5rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* =========================================================================
          BACKGROUND ARTWORK: Iconic Tamil Nadu & Indian Industrial Heritage Line Art
          (Shore Temple Mahabalipuram, Meenakshi Gopuram, and Modern Factory Silhouettes)
         ========================================================================= */}
      <div 
        style={{
          position: 'absolute',
          right: '-20px',
          bottom: 0,
          width: 'min(780px, 90vw)',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.22,
          zIndex: 1
        }}
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 800 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right bottom' }}
        >
          {/* Distant Hills / Waves */}
          <path d="M0 480 Q 200 470 400 480 T 800 475" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M50 495 Q 350 485 750 495" stroke="#ffffff" strokeWidth="1.5" />

          {/* Mahabalipuram Shore Temple / Dravidian Gopuram (Center-Right) */}
          {/* Main Tower Base */}
          <rect x="480" y="320" width="180" height="175" stroke="#ffffff" strokeWidth="2" fill="none" />
          <line x1="480" y1="360" x2="660" y2="360" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="480" y1="410" x2="660" y2="410" stroke="#ffffff" strokeWidth="1.5" />
          
          {/* Arches on Base */}
          <path d="M510 495 V 435 Q 535 405 560 435 V 495" stroke="#ffffff" strokeWidth="2" />
          <path d="M580 495 V 435 Q 605 405 630 435 V 495" stroke="#ffffff" strokeWidth="2" />

          {/* Stepped Gopuram Tiers */}
          <path d="M490 320 L 510 240 L 630 240 L 650 320 Z" stroke="#ffffff" strokeWidth="2" />
          <path d="M520 240 L 535 170 L 605 170 L 620 240 Z" stroke="#ffffff" strokeWidth="2" />
          <path d="M540 170 L 550 115 L 590 115 L 600 170 Z" stroke="#ffffff" strokeWidth="2" />
          <path d="M555 115 L 560 75 L 580 75 L 585 115 Z" stroke="#ffffff" strokeWidth="2" />

          {/* Temple Kalasam (Finials) on Top */}
          <path d="M570 75 V 45 M566 50 H574 M564 60 H576" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="570" cy="40" r="4" stroke="#ffffff" strokeWidth="2" />

          {/* Tier Niches and Details */}
          <line x1="515" y1="280" x2="625" y2="280" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="540" cy="280" r="5" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="570" cy="280" r="5" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="600" cy="280" r="5" stroke="#ffffff" strokeWidth="1.2" />

          <line x1="538" y1="205" x2="602" y2="205" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="555" cy="205" r="4" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="585" cy="205" r="4" stroke="#ffffff" strokeWidth="1.2" />

          <line x1="552" y1="142" x2="588" y2="142" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="570" cy="142" r="3" stroke="#ffffff" strokeWidth="1.2" />

          {/* Secondary Shore Vimana (Left Tower) */}
          <rect x="360" y="380" width="90" height="115" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M370 380 L 380 320 L 430 320 L 440 380 Z" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M385 320 L 392 270 L 418 270 L 425 320 Z" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M395 270 L 400 230 L 410 230 L 415 270 Z" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M405 230 V 205 M402 212 H408" stroke="#ffffff" strokeWidth="2" />
          <circle cx="405" cy="200" r="3" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M385 495 V 440 Q 405 420 425 440 V 495" stroke="#ffffff" strokeWidth="1.5" />

          {/* Modern Industrial Tech Elements (TIDEL Park & Factory Silhouettes) */}
          {/* Smart Factory Sawtooth Roof Silhouette (Far Right) */}
          <path d="M680 495 V 390 L 720 350 V 495 L 760 350 V 495 L 800 350 V 495" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Antenna / IoT Communication Mast */}
          <line x1="720" y1="350" x2="720" y2="280" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="710" y1="300" x2="730" y2="300" stroke="#ffffff" strokeWidth="1.2" />
          <line x1="705" y1="315" x2="735" y2="315" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="720" cy="275" r="4" stroke="#ffffff" strokeWidth="1.5" />

          {/* Traditional Palm Trees & Coastal Elements */}
          <path d="M320 495 Q 325 420 310 360" stroke="#ffffff" strokeWidth="2" />
          <path d="M310 360 Q 280 350 260 370 M310 360 Q 290 330 280 310 M310 360 Q 320 320 340 310 M310 360 Q 345 340 355 365 M310 360 Q 330 380 340 400" stroke="#ffffff" strokeWidth="1.5" />

          <path d="M260 495 Q 262 440 250 400" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M250 400 Q 230 390 215 410 M250 400 Q 235 375 225 360 M250 400 Q 260 370 275 360 M250 400 Q 280 385 285 410" stroke="#ffffff" strokeWidth="1.4" />

          {/* Cloud Contours */}
          <path d="M420 120 Q 440 100 465 110 T 510 115" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M620 90 Q 640 70 670 80 T 710 85" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
        
        {/* =========================================================================
            HEADER: "Made in India. Made for the World."
           ========================================================================= */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          
          <h2 style={{
            fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 1.25rem 0'
          }}>
            Made in India.<br />
            Made for the World.
          </h2>

          {/* Green accent line (Exactly matching Zoho's signature green underline) */}
          <div style={{
            width: '46px',
            height: '3.5px',
            backgroundColor: '#00c04b',
            borderRadius: '999px',
            margin: '0 auto'
          }} />

        </div>

        {/* =========================================================================
            METRICS COUNTERS STRIP (5 Columns with Elegant Dividers)
           ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem 0',
          alignItems: 'center',
          marginBottom: '3.5rem'
        }}>
          {metrics.map((item, index) => (
            <div 
              key={index}
              style={{
                textAlign: 'center',
                padding: '0.75rem 1.25rem',
                borderRight: index < metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.22)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                {item.value}
              </div>

              <div style={{
                fontSize: '0.96rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.92)',
                lineHeight: 1.35,
                marginBottom: '0.2rem'
              }}>
                {item.label}
              </div>

              <div style={{
                fontSize: '0.78rem',
                color: 'rgba(255, 255, 255, 0.65)',
                fontWeight: 400
              }}>
                {item.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            CTA BUTTON: "MORE ABOUT ATPL >" (Outline Boxed Button)
           ========================================================================= */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLearnMore}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              backgroundColor: btnHover ? '#ffffff' : 'transparent',
              color: btnHover ? '#0059b3' : '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.75)',
              padding: '0.85rem 2.2rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              transition: 'all 0.2s ease',
              boxShadow: btnHover ? '0 10px 24px rgba(0, 0, 0, 0.2)' : 'none',
              transform: btnHover ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            <span>MORE ABOUT ATPL</span>
            <ChevronRight size={16} strokeWidth={2.8} />
          </button>
        </div>

      </div>
    </section>
  );
};
