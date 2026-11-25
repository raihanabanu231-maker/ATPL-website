import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Cpu, 
  Zap, 
  Truck, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

export interface CustomerTitanCard {
  id: string;
  client: string;
  category: 'ev-auto' | 'electronics' | 'logistics';
  tierBadge: string;
  logoUrl: string;
  metric: string;
  metricLabel: string;
  solutionTag: string;
  gradient: string;
  delay: number;
  description: string;
  highlightStat: string;
}

const FLAGSHIP_CUSTOMERS: CustomerTitanCard[] = [
  {
    id: 'case-ola',
    client: 'Ola Electric',
    category: 'ev-auto',
    tierBadge: 'TIER-1 EV MEGA-FACTORY',
    logoUrl: '/assets/images/clients/ola-electric.svg',
    metric: '2 Min',
    metricLabel: 'Shift allocation (from 2 hrs)',
    solutionTag: 'PERFECT TRACE · DPM LASER',
    highlightStat: '100% AIS-156 Pack Compliance',
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)',
    delay: 0.1,
    description: 'Battery pack AIS-156 serialization & shopfloor MES traceability. Slashed resource allocation cycle from 2 hours to 2 minutes.'
  },
  {
    id: 'case-pegatron',
    client: 'Pegatron Electronics',
    category: 'electronics',
    tierBadge: 'GLOBAL TOP-3 EMS GIANT',
    logoUrl: '/assets/images/clients/pegatron-electronics.svg',
    metric: '99.99%',
    metricLabel: 'First-pass SMT read rate',
    solutionTag: 'PERFECT VERIFIER · AI VISION',
    highlightStat: '< 4ms Pneumatic Rejection',
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)',
    delay: 0.2,
    description: 'Sub-second micro-QR vision grading on high-density SMT motherboard lines with 99.99% read rate and 4ms pneumatic rejection.'
  },
  {
    id: 'case-proconnect',
    client: 'Proconnect Logistics',
    category: 'logistics',
    tierBadge: 'REDINGTON 3PL HUB',
    logoUrl: '/assets/images/clients/proconnect-logistics.svg',
    metric: '3.5×',
    metricLabel: 'Dock turnaround acceleration',
    solutionTag: 'PERFECT WAREHOUSE · WMS',
    highlightStat: '45,000+ Active SKUs Synced',
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)',
    delay: 0.3,
    description: 'Paperless high-rack cross-docking and warehouse execution. 3.5× faster inbound turnaround with zero dispatch errors.'
  },
  {
    id: 'case-apollo',
    client: 'Apollo Tyres',
    category: 'ev-auto',
    tierBadge: 'GLOBAL TYRE MOBILITY',
    logoUrl: '/assets/images/clients/apollo-tyres.svg',
    metric: '+50%',
    metricLabel: 'Dispatch verification accuracy',
    solutionTag: 'RAIN RFID TUNNELS · SAP SYNC',
    highlightStat: 'Zero Mis-Shipment Chargebacks',
    gradient: 'linear-gradient(137deg, #10B981 0%, #6EE7B7 45%, #059669 100%)',
    delay: 0.4,
    description: 'Automated RAIN RFID conveyor portals and inline 2D barcode verifiers across tyre curing and high-rack dispatch lines.'
  }
];

// Top Brand Logos for Marquee Ticker
const TRUSTED_ENTERPRISE_BRANDS = [
  { name: 'Ola Electric', logo: '/assets/images/clients/ola-electric.svg' },
  { name: 'Pegatron', logo: '/assets/images/clients/pegatron-electronics.svg' },
  { name: 'Proconnect Logistics', logo: '/assets/images/clients/proconnect-logistics.svg' },
  { name: 'Apollo Tyres', logo: '/assets/images/clients/apollo-tyres.svg' },
  { name: 'ABB Automation', logo: '/assets/images/clients/abb.svg' },
  { name: 'Honeywell Gold Partner', logo: '/assets/images/partners/honeywell_gold_seal.png' },
  { name: 'Cholayil', logo: '/assets/images/clients/cholayil.webp' },
  { name: 'Seoyon E-Hwa', logo: '/assets/images/clients/seoyon-ehwa.webp' },
  { name: 'Shanthi Gears', logo: '/assets/images/clients/shanthi-gears.webp' }
];

export interface GlowingFeatureCardsSectionProps {
  onSelectCustomer?: (customerId: string) => void;
}

export const GlowingFeatureCards: React.FC<GlowingFeatureCardsSectionProps> = ({
  onSelectCustomer
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ev-auto' | 'electronics' | 'logistics'>('all');

  const filteredCards = activeFilter === 'all'
    ? FLAGSHIP_CUSTOMERS
    : FLAGSHIP_CUSTOMERS.filter(c => c.category === activeFilter);

  return (
    <section
      id="customer-flagships"
      className="bg-[#0A0A0B] text-white font-sans relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0B',
        padding: 'clamp(3.5rem, 6vh, 6rem) 1.5rem',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Background Ambient Glow FX */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(67, 97, 238, 0.12) 0%, rgba(255, 61, 119, 0.05) 45%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* =====================================================================
            1. HEADER WITH ENTERPRISE STAT BADGE & BOLD HEADLINE
           ===================================================================== */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#38bdf8',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={14} color="#38bdf8" />
            <span>VERIFIED FACTORY DEPLOYMENTS &amp; ROI</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.18,
              margin: '0 0 1rem 0'
            }}
          >
            Powering Production for <span style={{
              background: 'linear-gradient(135deg, #FF9D3C 0%, #FF3D77 50%, #7DD3FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>India's Industrial Giants</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.12rem)',
              color: '#94a3b8',
              lineHeight: 1.65,
              margin: '0 auto',
              maxWidth: '680px'
            }}
          >
            From the world's largest EV mega-factories to high-density Apple motherboard lines, inspect how ATPL’s cognitive barcode, vision, and RFID systems eliminate shopfloor errors.
          </motion.p>

          {/* Sector Category Filters (100% Focused on Real Customers) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              padding: '5px',
              marginTop: '1.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {[
              { id: 'all', label: '⭐ All Flagships (4)' },
              { id: 'ev-auto', label: '🚗 EV & Automotive' },
              { id: 'electronics', label: '⚡ Electronics EMS' },
              { id: 'logistics', label: '📦 3PL & Warehousing' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s ease',
                  backgroundColor: activeFilter === tab.id ? '#ffffff' : 'transparent',
                  color: activeFilter === tab.id ? '#0A0A0B' : 'rgba(255, 255, 255, 0.75)',
                  boxShadow: activeFilter === tab.id ? '0 2px 10px rgba(255, 255, 255, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* =====================================================================
            2. GLOWING CUSTOMER FEATURE CARDS GRID (Exact Glowing Border Tech)
           ===================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
            boxSizing: 'border-box',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: card.delay }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                onClick={() => onSelectCustomer?.(card.id)}
                className="group cursor-pointer"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  maxWidth: '320px',
                  margin: '0 auto',
                  boxSizing: 'border-box'
                }}
              >
                {/* Glow Background (Exact 45px Blur & Gradient Glow) */}
                <div
                  className="pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '350px',
                    opacity: 0.65,
                    borderRadius: '40px',
                    background: card.gradient,
                    filter: 'blur(45px)',
                    zIndex: 0
                  }}
                />

                {/* Foreground Card with 8px Solid Transparent Border & Gradient Clip */}
                <div
                  className="relative z-10 overflow-hidden shadow-2xl transition-all duration-300"
                  style={{
                    position: 'relative',
                    alignSelf: 'stretch',
                    width: '100%',
                    height: '350px',
                    borderRadius: '40px',
                    zIndex: 10,
                    overflow: 'hidden',
                    border: '8px solid transparent',
                    background: `linear-gradient(#151518, #151518) padding-box, ${card.gradient} border-box`,
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Content Inner Layout */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '1.65rem 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box',
                      position: 'relative'
                    }}
                  >
                    {/* Top Row: Client Logo Pill & Tier Badge */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}
                      >
                        {/* Logo Pill in High-Contrast White Background */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            borderRadius: '999px',
                            padding: '4px 12px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                          }}
                        >
                          <img
                            src={card.logoUrl}
                            alt={card.client}
                            style={{
                              height: '18px',
                              maxWidth: '100px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>

                        {/* Direct Inspect Arrow */}
                        <div
                          className="transition-transform duration-200 group-hover:scale-110 group-hover:bg-white group-hover:text-black"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </div>
                      </div>

                      {/* Tier Subtitle */}
                      <div
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#38bdf8',
                          marginBottom: '4px'
                        }}
                      >
                        {card.tierBadge}
                      </div>

                      {/* Client Name */}
                      <h3
                        style={{
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '1.35rem',
                          lineHeight: 1.2,
                          margin: '0 0 0.4rem 0',
                          letterSpacing: '-0.025em'
                        }}
                      >
                        {card.client}
                      </h3>

                      {/* Big KPI Metric Stat */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '8px',
                          marginTop: '0.65rem',
                          padding: '6px 10px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            color: '#ffffff',
                            lineHeight: 1
                          }}
                        >
                          {card.metric}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#94a3b8',
                            fontWeight: 500,
                            lineHeight: 1.2
                          }}
                        >
                          {card.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Area: Outcome Description & Solution Tag */}
                    <div style={{ marginTop: '0.85rem' }}>
                      <p
                        style={{
                          color: '#cbd5e1',
                          fontSize: '12.5px',
                          lineHeight: 1.5,
                          fontWeight: 400,
                          margin: '0 0 0.85rem 0'
                        }}
                      >
                        {card.description}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '0.6rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          color: '#94a3b8'
                        }}
                      >
                        <span style={{ color: '#ffffff' }}>{card.solutionTag}</span>
                        <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          Inspect <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* =====================================================================
            3. ENTERPRISE BRAND TRUST MARQUEE (Highlighting India's Top Brands)
           ===================================================================== */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: '1.5rem'
            }}
          >
            TRUSTED ACROSS 200+ AUTOMOTIVE, EMS, PHARMA &amp; 3PL PLANTS IN INDIA
          </div>

          {/* Marquee ticker */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem 2.5rem',
              opacity: 0.85
            }}
          >
            {TRUSTED_ENTERPRISE_BRANDS.map((brand, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  transition: 'all 0.25s ease'
                }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    height: '16px',
                    maxWidth: '80px',
                    objectFit: 'contain',
                    filter: 'grayscale(1) brightness(1.8)'
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GlowingFeatureCards;
