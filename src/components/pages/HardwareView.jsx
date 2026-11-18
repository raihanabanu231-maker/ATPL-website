import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { HardwareVideoMatrixGrid } from '../hardware/HardwareVideoMatrixGrid';
import { BentoCard } from '../ui/bento-card';
import { ShineBadge } from '../ui/shine-badge';
import { MagneticButton } from '../ui/magnetic-button';
import { GlowEffect } from '../ui/glow-effect';

export const HardwareView = () => {
  const { openDemoModal } = useApp();

  return (
    <div 
      id="hardware"
      className="section" 
      style={{ 
        paddingTop: 'clamp(5.5rem, 8vw, 7.5rem)', 
        paddingBottom: '6rem', 
        backgroundColor: 'transparent',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* =========================================================================
            AUTHENTIC 360° HARDWARE VIDEO MATRIX & INTERACTIVE FILTERABLE GRID
           ========================================================================= */}
        <HardwareVideoMatrixGrid />

        {/* Custom Integration & Consumables Banner (21st.dev BentoCard) */}
        <BentoCard
          spotlightColor="rgba(16, 185, 129, 0.16)"
          borderColor="rgba(255, 255, 255, 0.12)"
          glowBorderColor="rgba(16, 185, 129, 0.45)"
          style={{ 
            padding: '2.5rem 3rem', 
            marginTop: '3.5rem',
            borderRadius: '16px'
          }}
        >
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem', 
            alignItems: 'center'
          }}>
            <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <ShineBadge variant="emerald">
                  CERTIFIED INDUSTRIAL SUPPLIES
                </ShineBadge>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-white, #ffffff)', marginBottom: '0.5rem', fontWeight: 800 }}>
                Specialized RFID Tags, Barcode Labels & Thermal Ribbons
              </h3>
              <p style={{ color: 'var(--color-slate-400, #94a3b8)', fontSize: '0.94rem', margin: 0, maxWidth: '750px', lineHeight: 1.6 }}>
                We supply ISO/IEC compliant tamper-evident barcode labels, metal-mount UHF RFID tags, chemical-resistant tags for pharma autoclaves, and high-resin thermal transfer ribbons.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <GlowEffect colors={['#10b981', '#06b6d4', '#3b82f6']} mode="breathe" blur="soft" duration={4} scale={1.12} />
                <MagneticButton
                  onClick={() => openDemoModal({ solution: 'Consumables & Labels RFQ', notes: 'Inquiry for specialized RFID tags, labels, and ribbons.' })}
                  className="btn btn-secondary"
                  style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minHeight: '44px', position: 'relative', zIndex: 1 }}
                >
                  <span>Request Consumables Catalog</span>
                  <ArrowRight size={15} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  );
};
