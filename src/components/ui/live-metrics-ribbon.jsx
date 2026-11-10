import React from 'react';
import { motion } from 'framer-motion';
import { NumberTicker } from './number-ticker';
import { SpotlightCard } from './spotlight-card';
import { ShieldCheck, Activity, Zap, Cpu, Award, CheckCircle2 } from 'lucide-react';

export function LiveMetricsRibbon() {
  const metrics = [
    {
      value: 35,
      suffix: '+',
      label: 'Years Industry Proven',
      subtext: 'Engineering industrial automation since 1991',
      icon: Award,
      color: '#00f0ff',
      glow: 'rgba(0, 240, 255, 0.25)',
      radarColor: '#00f0ff'
    },
    {
      value: 250,
      suffix: '+',
      label: 'Tier-1 Enterprise Plants',
      subtext: 'Ola, Pegatron, Hero, Motherson, Sun Pharma',
      icon: Cpu,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.25)',
      radarColor: '#38bdf8'
    },
    {
      value: 99.98,
      suffix: '%',
      decimalPlaces: 2,
      label: 'DPM Read Accuracy',
      subtext: 'Curved metal, reflective cast & EV battery cells',
      icon: ShieldCheck,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      radarColor: '#10b981'
    },
    {
      value: 8,
      prefix: '< ',
      suffix: 'ms',
      label: 'Vision Inspection Takt',
      subtext: 'Sub-second AI pokayoke zero-assembly escape',
      icon: Zap,
      color: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.25)',
      radarColor: '#a855f7'
    }
  ];

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      padding: '2.5rem 0 3rem 0',
      background: 'linear-gradient(180deg, #040914 0%, #081121 50%, #040914 100%)',
      borderTop: '1px solid rgba(0, 240, 255, 0.15)',
      borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Background Ambient Lighting */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1rem, 2vw, 2.5rem)', position: 'relative', zIndex: 1 }}>
        
        {/* Header Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ position: 'relative', display: 'flex', width: '10px', height: '10px' }}>
              <span style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '9999px',
                backgroundColor: '#10b981',
                opacity: 0.75,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
              }} />
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '9999px',
                height: '10px',
                width: '10px',
                backgroundColor: '#10b981'
              }} />
            </span>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono, monospace)'
            }}>
              REAL-TIME PRODUCTION TELEMETRY & AUDIT VERIFICATION
            </span>
          </div>

          <div style={{
            fontSize: '0.76rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono, monospace)'
          }}>
            <Activity size={13} color="#10b981" />
            <span>Telemetry Status: Active, Sub-Millisecond Latency</span>
          </div>
        </div>

        {/* 4 Spotlight Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor={m.glow}
                borderColor="rgba(255, 255, 255, 0.08)"
                backgroundColor="#0a1224"
                style={{
                  padding: '1.65rem 1.45rem',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '175px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: `${m.color}15`,
                      border: `1px solid ${m.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={19} color={m.color} />
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: m.color,
                      backgroundColor: `${m.color}12`,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      border: `1px solid ${m.color}30`
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: m.color }} />
                      <span>Live Verified</span>
                    </div>
                  </div>

                  {/* Animated Big Number */}
                  <div style={{
                    fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    marginBottom: '0.35rem',
                    fontFamily: 'var(--font-display, Inter, sans-serif)'
                  }}>
                    <NumberTicker
                      value={m.value}
                      prefix={m.prefix || ''}
                      suffix={m.suffix || ''}
                      decimalPlaces={m.decimalPlaces || 0}
                      delay={idx * 0.15}
                    />
                  </div>

                  <div style={{
                    fontSize: '0.94rem',
                    fontWeight: 800,
                    color: '#e2e8f0',
                    marginBottom: '0.35rem'
                  }}>
                    {m.label}
                  </div>
                </div>

                <div style={{
                  fontSize: '0.78rem',
                  color: '#94a3b8',
                  lineHeight: 1.45,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '0.65rem',
                  marginTop: '0.65rem'
                }}>
                  {m.subtext}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

