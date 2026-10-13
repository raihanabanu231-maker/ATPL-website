import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Handshake, 
  Radio, 
  Cpu, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  ExternalLink,
  Layers,
  Building2
} from 'lucide-react';
import { 
  OfficialPartnersShowcase, 
  PartnerLogo,
  HoneywellLogo,
  ZebraLogo,
  NilfiskLogo,
  SotiLogo,
  TelesisLogo,
  BradmaLogo,
  AxisLogo,
  ForbesMacsaLogo,
  TscPrintronixLogo,
  AdvantechLogo,
  RaiserLogo,
  KendoLogo,
  DatalogicLogo,
  CipherLabLogo,
  NewlandLogo,
  Gs1Logo,
  IsoLogo,
  StartupIndiaLogo
} from '../common/PartnerLogos';
import { PageHeroBackdrop, HeroFilterPill } from '../common/PageHeroBackdrop';

export const PartnersView = () => {
  const { openDemoModal, setCurrentView } = useApp();

  // Parse initial category from URL hash if provided
  const getInitialCategory = () => {
    try {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('aidc') || hash.includes('rfid')) return 'aidc';
      if (hash.includes('automation') || hash.includes('robotics') || hash.includes('laser')) return 'automation';
      if (hash.includes('mdm') || hash.includes('software')) return 'mdm';
      if (hash.includes('cert') || hash.includes('gs1') || hash.includes('standards')) return 'cert';
    } catch (e) {}
    return 'all';
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setTimeout(() => {
      const el = document.getElementById('partner-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const categories = [
    { id: 'all', label: 'All Alliances' },
    { id: 'aidc', label: 'AIDC & RFID OEMs' },
    { id: 'automation', label: 'Robotics & Laser Traceability' },
    { id: 'mdm', label: 'Enterprise MDM & Software' },
    { id: 'cert', label: 'Government & GS1 Standards' }
  ];

  const partnerCategories = [
    {
      id: 'aidc',
      category: 'Global AIDC, Barcode & RFID OEM Alliances',
      icon: Radio,
      color: '#0071ba',
      desc: 'Authorized regional distributor, certified systems integrator, and gold tier partner for leading industrial barcode, RFID, and thermal printing OEMs.',
      partners: [
        {
          id: 'honeywell',
          name: 'Honeywell Scanning & Mobility',
          tier: 'Gold Partner & Regional Distributor (2019, 2021 Go-Getter Award)',
          focus: 'Industrial 2D DPM Barcode Imagers, Fixed Scanners, Rugged Vehicle Mounts',
          badge: 'Gold Tier Alliance',
          logoComp: HoneywellLogo
        },
        {
          id: 'zebra',
          name: 'Zebra Technologies',
          tier: 'Certified Solution Partner',
          focus: 'Fixed UHF RFID Antennas, Rugged Enterprise PDAs, Barcode Media & Ribbons',
          badge: 'Certified Integrator',
          logoComp: ZebraLogo
        },
        {
          id: 'tscprintronix',
          name: 'TSC Auto ID & Printronix',
          tier: 'Rising Star Partner (2026) & Emerging Partner (2024)',
          focus: 'Enterprise Thermal Transfer Printers, Print & Apply Engines, Mobile Printers',
          badge: 'Rising Star 2026',
          logoComp: TscPrintronixLogo
        },
        {
          id: 'datalogic',
          name: 'Datalogic Scanning',
          tier: 'Industrial Machine Vision & Optical Partner',
          focus: 'High-Speed Liquid Lens Cameras, Optical Defect AI, OCR Verification',
          badge: 'Vision Specialist',
          logoComp: DatalogicLogo
        },
        {
          id: 'newland',
          name: 'Newland AIDC',
          tier: 'Strategic Scanning OEM Alliance',
          focus: 'High-Performance 2D OEM Scan Engines, Rugged Handheld Terminals',
          badge: 'OEM Partner',
          logoComp: NewlandLogo
        },
        {
          id: 'cipherlab',
          name: 'CipherLab',
          tier: 'Enterprise Mobility Alliance',
          focus: 'Android Rugged Mobile Computers, Bluetooth Pocket Barcode Scanners',
          badge: 'Mobility Partner',
          logoComp: CipherLabLogo
        }
      ]
    },
    {
      id: 'automation',
      category: 'Industrial Automation, Robotics & Traceability Alliances',
      icon: Cpu,
      color: '#E85874',
      desc: 'Tier-1 industrial equipment, laser marking, cleaning automation, and industrial IoT hardware partnerships.',
      partners: [
        {
          id: 'telesis',
          name: 'Telesis Technologies',
          tier: 'Industrial Direct Part Marking (DPM) Alliance',
          focus: 'Laser Marking Systems, Dot Peen Pin Markers & High-Speed Traceability',
          badge: 'Traceability Partner',
          logoComp: TelesisLogo
        },
        {
          id: 'nilfisk',
          name: 'Nilfisk Industrial',
          tier: 'Autonomous Plant Maintenance Alliance',
          focus: 'Industrial Cleaning Automation, Continuous Vacuum Systems & Cleanroom Equipment',
          badge: 'Automation Partner',
          logoComp: NilfiskLogo
        },
        {
          id: 'forbesmacsa',
          name: 'Forbes Macsa id',
          tier: 'Industrial Coding & Laser Serialization',
          focus: 'Continuous Inkjet (CIJ), Thermal Inkjet (TIJ) & High-Speed Packaging Coding',
          badge: 'Coding Partner',
          logoComp: ForbesMacsaLogo
        },
        {
          id: 'bradma',
          name: 'Bradma Automating The Future',
          tier: 'Automation & Marking Solutions',
          focus: 'Automated Product Marking, Packaging Traceability & Impact Presses',
          badge: 'Marking Partner',
          logoComp: BradmaLogo
        },
        {
          id: 'axis',
          name: 'Axis Communications',
          tier: 'Industrial Optical AI & Security Alliance',
          focus: 'Thermal CCTV Vision, AI-Assisted Factory Perimeter Security & Analytics',
          badge: 'Vision Partner',
          logoComp: AxisLogo
        },
        {
          id: 'advantech',
          name: 'Advantech Industrial IoT',
          tier: 'Industrial Edge Computing Alliance',
          focus: 'Rugged Touch Panel PCs, Industrial Ethernet Switches & Modbus Gateways',
          badge: 'Edge IoT Alliance',
          logoComp: AdvantechLogo
        },
        {
          id: 'kendo',
          name: 'Kendo Tools & Automation',
          tier: 'Industrial Hardware & Shopfloor Partner',
          focus: 'Heavy Duty Assembly Hardware, Precision Calibration & Plant Tooling',
          badge: 'Hardware Partner',
          logoComp: KendoLogo
        },
        {
          id: 'raiser',
          name: 'Raiser Industrial',
          tier: 'Conveyor & Plant Logistics Alliance',
          focus: 'Automated Conveyor Transfers, Pallet Handling & Shopfloor Racks',
          badge: 'Plant Logistics',
          logoComp: RaiserLogo
        }
      ]
    },
    {
      id: 'mdm',
      category: 'Enterprise MDM & Mobility Alliances',
      icon: Layers,
      color: '#0284c7',
      desc: 'Centralized mobile device management and frontline handheld support alliances.',
      partners: [
        {
          id: 'soti',
          name: 'SOTI MobiControl',
          tier: 'Certified Enterprise Mobility Management',
          focus: 'Centralized MDM Device Management, Remote Diagnostic Over-The-Air Control',
          badge: 'Certified MDM',
          logoComp: SotiLogo
        }
      ]
    },
    {
      id: 'cert',
      category: 'Standards & Regulatory Certifications',
      icon: ShieldCheck,
      color: '#009a44',
      desc: 'Accredited member and certified provider of international barcode standards, serialization compliance, and quality frameworks.',
      partners: [
        {
          id: 'gs1',
          name: 'GS1 India (GS1 Global Standard)',
          tier: 'Authorized GS1 Solution Partner',
          focus: 'Global 1D/2D Barcode Verification, GS1 EPCIS Serialization, Item-to-Pallet Aggregation',
          badge: 'GS1 Certified',
          logoComp: Gs1Logo
        },
        {
          id: 'iso',
          name: 'ISO 9001:2015 Quality Management',
          tier: 'BMQR Certified QMS Standards',
          focus: 'Zero-defect software development, industrial hardware calibration, on-site SLA delivery',
          badge: 'ISO 9001 Certified',
          logoComp: IsoLogo
        },
        {
          id: 'startupindia',
          name: '#startupindia & DPIIT Recognition',
          tier: 'Govt. of India Section 80-IAC Certified',
          focus: 'Patented industrial automation research, IoT robotics, and AI manufacturing incubation',
          badge: 'Govt. Recognized',
          logoComp: StartupIndiaLogo
        }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'all'
    ? partnerCategories
    : partnerCategories.filter(c => c.id === activeCategory);

  return (
    <div style={{ backgroundColor: 'transparent', color: '#ffffff', minHeight: '100vh', paddingBottom: '6rem', paddingTop: '4rem' }}>
      
      {/* Responsive Styles */}
      <style>{`
        .partner-cat-box {
          background-color: #0a1324;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
        }
        .partner-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .partner-cat-box {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          .partner-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      {/* Dynamic Radiant Page Hero Backdrop */}
      <div className="container">
        <PageHeroBackdrop
          badgeIcon={Handshake}
          badgeText="OFFICIAL OEM ALLIANCES & CERTIFIED PARTNERS"
          badgeColor="#0071ba"
          accentColor="#0071ba"
          secondaryGlow="#E85874"
          systemTag="[ GLOBAL TIER-1 OEMS // GS1 STANDARDS ]"
          title="Our Global"
          highlightText="Partner Ecosystem"
          description="Partnering with world-class industrial hardware OEMs, GS1 international standards bodies, and Tier-1 ERP platforms to deliver certified end-to-end automation."
        >
          {categories.map(cat => (
            <HeroFilterPill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              label={cat.label}
              accentColor="#0071ba"
            />
          ))}

          <div style={{ width: '100%', marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => openDemoModal({ mode: 'partner', solution: 'Partner Program Application', notes: 'Inquiry from Partners page' })}
              style={{
                backgroundColor: '#E85874',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem 1.8rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(232, 88, 116, 0.45)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d44360';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(232, 88, 116, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E85874';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 88, 116, 0.45)';
              }}
            >
              <Handshake size={18} />
              <span>Apply for OEM / Reseller Partnership</span>
            </button>
          </div>
        </PageHeroBackdrop>
      </div>

      {/* Official Partner Logos Showcase & Filtered Catalog */}
      <section id="partner-catalog" style={{ padding: '3.5rem 0 1.5rem 0', scrollMarginTop: '5.5rem' }}>
        <div className="container">
          
          {/* Quick Category Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '2rem',
            padding: '0.85rem 1.25rem',
            backgroundColor: '#0a1324',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginRight: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Category Filter:
            </span>
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? 18 
                : partnerCategories.find(c => c.id === cat.id)?.partners.length || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    backgroundColor: isActive ? '#0071ba' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#ffffff' : '#e2e8f0',
                    border: isActive ? '1px solid #299fe0' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    padding: '0.45rem 1.1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'all 0.2s ease',
                    minHeight: '38px',
                    boxShadow: isActive ? '0 0 15px rgba(0, 113, 186, 0.5)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(0, 113, 186, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span>{cat.label}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    backgroundColor: isActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.12)',
                    color: isActive ? '#000000' : '#94a3b8',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '999px',
                    fontWeight: 800
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Category-Synchronized Logo Showcase */}
          <OfficialPartnersShowcase theme="dark" category={activeCategory} />
        </div>
      </section>

      {/* Partner Categories Detailed Grid */}
      <section style={{ padding: '2rem 0 3rem 0' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {filteredCategories.map((cat, cIdx) => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={cIdx}
                  className="partner-cat-box"
                  style={{
                    border: `1.5px solid ${cat.color}35`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: `${cat.color}20`,
                      border: `1px solid ${cat.color}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cat.color
                    }}>
                      <IconComp size={24} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        {cat.category}
                      </h2>
                    </div>
                  </div>

                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '850px' }}>
                    {cat.desc}
                  </p>

                  <div className="partner-cards-grid">
                    {cat.partners.map((partner, pIdx) => {
                      const LogoComp = partner.logoComp;
                      return (
                        <div 
                          key={pIdx}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '1.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = cat.color;
                            e.currentTarget.style.boxShadow = `0 12px 25px ${cat.color}20`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div>
                            {/* Card Header with Official Brand Logo & Badge */}
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              gap: '0.75rem', 
                              marginBottom: '1.25rem',
                              flexWrap: 'wrap'
                            }}>
                              <div style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                padding: '0.5rem 0.9rem',
                                minHeight: '44px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
                              }}>
                                {LogoComp ? (
                                  <LogoComp height={26} />
                                ) : (
                                  <span style={{ color: '#002855', fontWeight: 900, fontSize: '0.95rem' }}>
                                    {partner.name.split(' ')[0]}
                                  </span>
                                )}
                              </div>
                              <span style={{
                                backgroundColor: `${cat.color}25`,
                                color: cat.color,
                                border: `1px solid ${cat.color}60`,
                                padding: '0.25rem 0.65rem',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                whiteSpace: 'nowrap'
                              }}>
                                {partner.badge}
                              </span>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.4rem 0' }}>
                              {partner.name}
                            </h3>

                            <div style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.75rem' }}>
                              {partner.tier}
                            </div>

                            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                              {partner.focus}
                            </p>
                          </div>

                          {/* CTA action button */}
                          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <button
                              onClick={() => openDemoModal({ mode: 'partner', solution: `${partner.name} Alliance`, notes: `Inquiry regarding ${partner.name} (${partner.tier})` })}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '8px',
                                color: '#e2e8f0',
                                padding: '0.5rem 0.9rem',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                justifyContent: 'center'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${cat.color}25`;
                                e.currentTarget.style.borderColor = cat.color;
                                e.currentTarget.style.color = '#ffffff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.color = '#e2e8f0';
                              }}
                            >
                              <Handshake size={14} color={cat.color} />
                              <span>Consult Integration Engineer</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Become a Partner Callout */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            background: 'radial-gradient(circle at center, #0e1e38 0%, #060e1c 100%)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6)'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
              Want to partner with Archery Technocrats?
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Whether you are an industrial hardware OEM, ERP systems integrator, or regional automation distributor, our partner ecosystem delivers lucrative margins and dedicated application engineering support.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => openDemoModal({ mode: 'partner', solution: 'Partner Onboarding', notes: 'Lead initiated partner program request' })}
                style={{
                  backgroundColor: '#E85874',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(232, 88, 116, 0.4)'
                }}
              >
                <Sparkles size={18} />
                <span>Join Our Global Partner Network</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
