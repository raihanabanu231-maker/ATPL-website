import React from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';

export default function EnterpriseLeaderSection({ setCurrentView }) {
  return (
    <section 
      style={{
        padding: '5.5rem 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div 
        className="container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '4.5rem 6rem',
            alignItems: 'flex-start'
          }}
        >
          {/* =========================================================================
              LEFT COLUMN: ATPL for Enterprise (Exact Zoho Layout)
             ========================================================================= */}
          <div>
            {/* Header: Icon + Title inline on same row (Zoho Style) */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}
            >
              {/* Zoho-style rounded app icon with brand border */}
              <div 
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  border: '2px solid #0071ba',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(0, 113, 186, 0.12)'
                }}
              >
                <BarChart3 size={28} color="#0071ba" strokeWidth={2.2} />
              </div>

              <h2 
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 700,
                  color: '#18181b',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  lineHeight: 1.15,
                  cursor: 'default',
                  caretColor: 'transparent'
                }}
              >
                ATPL for Enterprise
              </h2>
            </div>

            {/* Description (Zoho Style: 2 short sentences, crisp) */}
            <p 
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.7,
                color: '#475569',
                marginBottom: '2.5rem',
                maxWidth: '480px'
              }}
            >
              Discover the ecosystem we’ve built for large-scale transformation. Explore ATPL’s platform capabilities, professional services, and infrastructure.
            </p>

            {/* Outlined Action Button (Zoho Style: uppercase, thin border, chevron) */}
            <button
              onClick={() => {
                if (setCurrentView) setCurrentView('solutions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#0071ba',
                border: '1.5px solid #0071ba',
                padding: '0.8rem 1.75rem',
                fontSize: '0.86rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.06)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>LEARN MORE</span>
              <ChevronRight size={15} strokeWidth={2.8} />
            </button>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Founder Perspective & Story (Exact Zoho Layout)
             ========================================================================= */}
          <div>
            {/* Quote (Zoho Style: directly on white canvas, no card box) */}
            <p 
              style={{
                fontSize: '1.14rem',
                lineHeight: 1.75,
                color: '#334155',
                margin: '0 0 2.25rem 0',
                fontWeight: 400
              }}
            >
              &ldquo;By pairing mechanical engineering rigor with in-house software, we give Indian manufacturers total shopfloor visibility — eliminating counting errors and vendor blame games without replacing legacy ERPs.&rdquo;
            </p>

            {/* Leader Bio: Avatar + Name & Title (Zoho Style) */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: 0
              }}
            >
              <img 
                src="/assets/images/amarnath_headshot.jpg"
                alt="Amarnath Paramasivam - Founder & Managing Director, Archery Technocrats"
                width="92"
                height="92"
                loading="lazy"
                style={{
                  width: '92px',
                  height: '92px',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '3px solid #ffffff',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
                }}
              />

              <div>
                <div 
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '0.25rem'
                  }}
                >
                  Amarnath Paramasivam
                </div>
                <div 
                  style={{
                    fontSize: '0.94rem',
                    color: '#64748b',
                    fontWeight: 500
                  }}
                >
                  Founder &amp; Managing Director, Archery Technocrats
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
