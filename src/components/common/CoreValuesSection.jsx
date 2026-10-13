import React from 'react';
import { Users, Database, Cpu, Layers, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const HandshakeIcon = ({ size = 26, color = '#0071ba' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-1.3 1.3" />
    <path d="m13 11-1.3-1.3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 0 1.4l4.3 4.3a1 1 0 0 0 1.4 0l2-2" />
    <path d="m18 11 3-3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-3 3" />
    <path d="m2 16 3-3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-3 3" />
  </svg>
);

export const CoreValuesSection = () => {
  const values = [
    {
      id: 'commitment',
      title: 'Long-term industrial commitment',
      icon: HandshakeIcon,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      description: '35+ years of combined industrial domain experience gives us a deep understanding of shopfloor realities. We build systems to run reliably for decades, partnering with your plants through every production expansion.'
    },
    {
      id: 'operator-first',
      title: 'Plant-floor first philosophy',
      icon: Users,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      description: 'Software is only as good as the operator holding the scanner on the line. We design our interfaces for busy forklift drivers and line operators — eliminating unnecessary clicks, delays, and friction.'
    },
    {
      id: 'data-ownership',
      title: 'Complete data ownership & zero lock-in',
      icon: Database,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      description: 'Your manufacturing and inventory data belongs entirely to you. Our software links directly into your SAP or Oracle ERP without locking your plant into proprietary file formats or recurring user licensing traps.'
    },
    {
      id: 'rnd-focus',
      title: 'Focus on research & in-house R&D',
      icon: Cpu,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      description: 'Industrial automation is our craft. Backed by our R&D center at TCE-TBI Madurai and headquarters at TIDEL Park Chennai, we invest continuously in proprietary firmware, vision neural models, and industrial IoT middleware.'
    },
    {
      id: 'single-team',
      title: 'One accountable engineering team',
      icon: Layers,
      color: '#0071ba',
      bgColor: 'rgba(0, 113, 186, 0.08)',
      description: 'We handle both the shopfloor hardware mounting and the ERP middleware software in-house. You never have to mediate between an IT software consultant and an industrial hardware reseller.'
    },
    {
      id: 'sla-support',
      title: 'Guaranteed 4-hour on-site SLA',
      icon: Clock,
      color: '#E85874',
      bgColor: 'rgba(232, 88, 116, 0.08)',
      description: 'When a critical packing line or dock portal encounters an issue, our local field engineers dispatch on-site across South India manufacturing corridors with pre-configured hot-swap equipment to keep dispatches rolling 24/7.'
    }
  ];

  return (
    <section 
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <div className="container" style={{ maxWidth: '1160px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.22,
            letterSpacing: '-0.025em',
            margin: '0 0 1.25rem 0',
            cursor: 'default',
            caretColor: 'transparent'
          }}>
            The core values and principles<br />
            that drive us
          </h2>

          {/* Accent Line (Custom ATPL Blue) */}
          <div style={{
            width: '46px',
            height: '3.5px',
            backgroundColor: '#0071ba',
            borderRadius: '999px',
            margin: '0 auto'
          }} />
        </div>

        {/* 2-Column Spacious Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3.5rem 4.5rem',
          alignItems: 'start'
        }}>
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.4rem'
                }}
              >
                {/* Big Distinct Colored Icon */}
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  backgroundColor: item.bgColor,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Icon size={26} color={item.color} />
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: '1.24rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.3,
                    margin: '0 0 0.65rem 0'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.96rem',
                    color: '#475569',
                    lineHeight: 1.68,
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
