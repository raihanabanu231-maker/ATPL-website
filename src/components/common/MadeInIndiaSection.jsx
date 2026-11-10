import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Cpu, Globe2, Sparkles } from 'lucide-react';
import { NumberTicker } from '../ui/number-ticker';
import { MagneticButton } from '../ui/magnetic-button';
import { GlowEffect } from '../ui/glow-effect';

export const MadeInIndiaSection = () => {
  const { setCurrentView } = useApp();

  const metrics = [
    {
      num: 250,
      suffix: '+',
      label: 'Plants & Hubs Served',
      subtext: 'Across manufacturing & 3PL'
    },
    {
      num: 35,
      suffix: '+',
      label: 'Years Combined Domain',
      subtext: 'In shopfloor automation'
    },
    {
      num: 6,
      suffix: '+',
      label: 'In-House Software Suites',
      subtext: 'WMS, MDM, Trace, Audit'
    },
    {
      num: 500,
      suffix: 'K+',
      label: 'Daily Shopfloor Moves',
      subtext: 'Barcode & RFID verified'
    },
    {
      num: 4,
      suffix: '-Hour',
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
        backgroundColor: '#050b16',
        background: 'radial-gradient(ellipse at 50% 20%, #0d1e38 0%, #071020 60%, #030711 100%)',
        color: '#ffffff',
        padding: '5.5rem 1.5rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      {/* Background Volumetric Glows */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.18) 0%, rgba(0, 240, 255, 0.06) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Industrial Blueprint & Circuit Mesh Background (Proprietary ATPL Engineering Motif) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.12,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem auto' }}>
          
          {/* Authentic National Industrial Pride Micro-Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.28)',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--color-brand-cyan, #00f0ff)'
            }}>
              <Globe2 size={13} color="#00f0ff" />
              <span>ATPL Industrial Platform, Domestic R&amp;D, Global Execution</span>
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 1.25rem 0',
            fontFamily: 'var(--font-display, Inter, sans-serif)'
          }}>
            Made in India.<br />
            <span className="gradient-text">Engineered for the World.</span>
          </h2>

          {/* Electric Cyan & Royal Accent Sheen Line */}
          <div style={{
            width: '64px',
            height: '3.5px',
            background: 'linear-gradient(90deg, #00f0ff 0%, #0071ba 100%)',
            borderRadius: '999px',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)'
          }} />

          <p style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
            color: '#94a3b8',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            Conceived, coded, and assembled across our Chennai headquarters and Madurai R&amp;D engineering labs — powering shopfloors, EV gigafactories, and sterile pharmaceutical lines across India and global supply chains.
          </p>

        </div>

        {/* =========================================================================
            METRICS COUNTERS STRIP (5 Columns with 21st.dev NumberTicker & Glass Dividers)
           ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem 1rem',
          alignItems: 'center',
          marginBottom: '3.75rem',
          padding: '2rem 1.5rem',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)'
        }}>
          {metrics.map((item, index) => (
            <div 
              key={index}
              style={{
                textAlign: 'center',
                padding: '0.75rem 1rem',
                borderRight: index < metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{
                fontSize: 'clamp(2.3rem, 3.8vw, 3.1rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '0.45rem',
                fontFamily: 'var(--font-display, Inter, sans-serif)'
              }}>
                <NumberTicker
                  value={item.num}
                  suffix={item.suffix}
                  delay={index * 0.12}
                />
              </div>

              <div style={{
                fontSize: '0.94rem',
                fontWeight: 800,
                color: '#e2e8f0',
                lineHeight: 1.35,
                marginBottom: '0.25rem'
              }}>
                {item.label}
              </div>

              <div style={{
                fontSize: '0.78rem',
                color: '#94a3b8',
                fontWeight: 500
              }}>
                {item.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            CTA BUTTON: 21st.dev MagneticButton with Cyan Aura Glow
           ========================================================================= */}
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <GlowEffect colors={['#00f0ff', '#0071ba', '#38bdf8']} mode="breathe" blur="soft" duration={4} scale={1.12} />
            <MagneticButton
              onClick={handleLearnMore}
              style={{
                backgroundColor: 'rgba(0, 113, 186, 0.25)',
                color: '#ffffff',
                border: '1.5px solid rgba(0, 240, 255, 0.5)',
                padding: '0.95rem 2.4rem',
                fontSize: '0.88rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                boxShadow: '0 8px 30px rgba(0, 113, 186, 0.35)',
                position: 'relative',
                zIndex: 1,
                minHeight: '48px'
              }}
            >
              <span>Explore ATPL Company Heritage</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
};
