import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { PageHeroBackdrop, HeroFilterPill } from '../common/PageHeroBackdrop';
import { HardwareFlipCaterpillar } from '../hardware/HardwareFlipCaterpillar';
import { BentoCard } from '../ui/bento-card';
import { ShineBadge } from '../ui/shine-badge';
import { MagneticButton } from '../ui/magnetic-button';
import { GlowEffect } from '../ui/glow-effect';
import { ScrollReveal } from '../ui/scroll-reveal';

export const HardwareView = () => {
  const { openDemoModal } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Solutions' },
    { id: 'scanners', label: 'Scanning' },
    { id: 'rfid', label: 'RFID Portals' },
    { id: 'printers', label: 'Printers' },
    { id: 'marking', label: 'DPM Marking' },
    { id: 'mobility', label: 'Mobility Edge' },
    { id: 'plc', label: 'Machine Vision' },
    { id: 'touch', label: 'Touch Systems' },
    { id: 'kiosk', label: 'Kiosks' },
    { id: 'voice', label: 'Wearable Voice' }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: 'transparent' }}>
      <div className="container">
        
        {/* Dynamic Radiant Page Hero Backdrop */}
        <PageHeroBackdrop
          badgeIcon={Sparkles}
          badgeText="AUTHENTIC ATPL AIDC & SENSOR HARDWARE"
          badgeColor="#E85874"
          accentColor="#E85874"
          secondaryGlow="#00f0ff"
          systemTag="[ SHOPFLOOR RIGS // 24/7 FACTORY TOUGH ]"
          title="Enterprise Hardware Built for"
          highlightText="Demanding Factory Floors"
          description="Archery Technocrats designs, sources, and commissions enterprise-grade AIDC hardware engineered for 24/7 reliability in automotive foundries, sterile pharmaceutical cleanrooms, and high-velocity fulfillment centers."
        >
          {categories.map(cat => (
            <HeroFilterPill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setTimeout(() => {
                  const el = document.getElementById('hardware-3d-deck');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
              label={cat.label}
              accentColor="#E85874"
            />
          ))}
        </PageHeroBackdrop>


        {/* =========================================================================
            GSAP FLIP CATERPILLAR HARDWARE PRODUCT SHOWCASE (Swiping Cards Animation)
           ========================================================================= */}
        <ScrollReveal variant="fade-up" distance={40} duration={0.65}>
          <HardwareFlipCaterpillar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </ScrollReveal>

        {/* Custom Integration & Consumables Banner (21st.dev BentoCard) */}
        <ScrollReveal variant="fade-up" distance={30} delay={0.1} duration={0.6}>
          <BentoCard
            spotlightColor="rgba(16, 185, 129, 0.16)"
            borderColor="rgba(255, 255, 255, 0.12)"
            glowBorderColor="rgba(16, 185, 129, 0.45)"
            style={{ 
              padding: '2.5rem 3rem', 
              marginTop: '2.5rem',
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
        </ScrollReveal>

      </div>
    </div>
  );
};
