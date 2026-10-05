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
  NewlandLogo
} from '../common/PartnerLogos';

export const PartnersView = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

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
          badge: 'GS1 Certified'
        },
        {
          id: 'iso',
          name: 'ISO 9001:2015 Quality Management',
          tier: 'BMQR Certified QMS Standards',
          focus: 'Zero-defect software development, industrial hardware calibration, on-site SLA delivery',
          badge: 'ISO 9001 Certified'
        },
        {
          id: 'startupindia',
          name: '#startupindia & DPIIT Recognition',
          tier: 'Govt. of India Section 80-IAC Certified',
          focus: 'Patented industrial automation research, IoT robotics, and AI manufacturing incubation',
          badge: 'Govt. Recognized'
        }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'all'
    ? partnerCategories
    : partnerCategories.filter(c => c.id === activeCategory);

  return (
    <div style={{ backgroundColor: '#060b14', color: '#ffffff', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <section style={{
        padding: '5rem 0 3.5rem 0',
        background: 'radial-gradient(circle at 50% 20%, rgba(0, 113, 186, 0.25) 0%, rgba(6, 11, 20, 1) 75%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(232, 88, 116, 0.12)',
            border: '1px solid rgba(232, 88, 116, 0.35)',
            color: '#E85874',
            padding: '0.4rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            letterSpacing: '0.05em'
          }}>
            <Handshake size={15} />
            <span>OFFICIAL OEM ALLIANCES & CERTIFIED PARTNERS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Our Global <span className="gradient-text">Partner Ecosystem</span>
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            maxWidth: '820px',
            margin: '0 auto 2.25rem auto',
            lineHeight: 1.6
          }}>
            Partnering with world-class industrial hardware OEMs, GS1 international standards bodies, and Tier-1 ERP platforms to deliver certified end-to-end automation.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '860px',
            margin: '0 auto 2.25rem auto'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: activeCategory === cat.id ? '#E85874' : 'rgba(255, 255, 255, 0.05)',
                  border: activeCategory === cat.id ? '2px solid #E85874' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(232, 88, 116, 0.45)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openDemoModal({ solution: 'Partner Program Application', notes: 'Inquiry from Partners page' })}
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
                boxShadow: '0 8px 25px rgba(232, 88, 116, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d44360';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(232, 88, 116, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E85874';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 88, 116, 0.4)';
              }}
            >
              <Handshake size={18} />
              <span>Apply for OEM / Reseller Partnership</span>
            </button>
          </div>
        </div>
      </section>

      {/* Official Partner Logos Showcase Carousel / Grid */}
      <section style={{ padding: '3.5rem 0 1.5rem 0' }}>
        <div className="container">
          <OfficialPartnersShowcase theme="dark" />
        </div>
      </section>

      {/* Partner Categories Detailed Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {filteredCategories.map((cat, cIdx) => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={cIdx}
                  style={{
                    backgroundColor: '#0a1324',
                    border: `1.5px solid ${cat.color}35`,
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
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
                      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        {cat.category}
                      </h2>
                    </div>
                  </div>

                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '850px' }}>
                    {cat.desc}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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
                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = cat.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <div>
                            {/* Card Header with Official Brand Logo & Badge */}
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              gap: '0.75rem', 
                              marginBottom: '1.25rem' 
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
                                color: cat.color === '#f59e0b' ? '#fbbf24' : cat.color,
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
                onClick={() => openDemoModal({ solution: 'Partner Onboarding', notes: 'Lead initiated partner program request' })}
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
