import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Car, 
  Pill, 
  Truck, 
  Package, 
  Factory, 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileCheck, 
  Eye, 
  Radio, 
  Printer, 
  Boxes, 
  Smartphone, 
  ChevronRight,
  Download,
  Building2,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const SolutionsView = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [selectedIndustry, setSelectedIndustry] = useState('automotive');

  const industries = [
    {
      id: 'automotive',
      name: 'Automotive & EV',
      badge: 'Tier-1 & OEM Verified',
      icon: Car,
      color: '#0071ba',
      bgLight: '#eff6ff',
      tagline: 'High-Precision DPM Traceability, Battery Pack Serialization & Pokayoke Verification',
      overview: 'End-to-end Direct Part Marking (DPM) barcode scanning, robotic laser marking verification, and EV battery cell-to-pack serialization compliant with global OEM audit standards.',
      challenges: [
        'Harsh metal reflection & curved surfaces causing barcode read failures on laser-etched VINs.',
        'High-speed assembly line pokayoke error-proofing to prevent wrong part fitment.',
        'Complex battery cell, module, and pack aggregation for fire safety and warranty traceability.'
      ],
      solutionsOffered: [
        {
          title: 'Direct Part Marking (DPM) Liquid Lens Imagers',
          desc: 'Ultra-high density decoding of 2D DataMatrix etched on reflective cast aluminum, engine blocks, and powertrain components.'
        },
        {
          title: 'EV Battery Cell-to-Pack Traceability',
          desc: 'Cryptographic GS1 serial generation tying individual pouch/prismatic cells to BMS modules and finished battery packs.'
        },
        {
          title: 'Inline AI Vision Pokayoke Inspection',
          desc: 'Deep learning camera stations verifying connector pin alignment, gasket presence, and torque mark verification in <8ms.'
        }
      ],
      caseStudy: {
        client: 'Leading EV 2-Wheeler Gigafactory (Ola Electric & Tier 1 Suppliers)',
        result: '100% pokayoke verification at 60 units/hr line speed with 0 assembly fitment escapes.'
      },
      stats: [
        { label: 'DPM Read Rate', value: '99.98%' },
        { label: 'Assembly Escape Rate', value: '0 PPM' },
        { label: 'Line Takt Time Impact', value: '0 ms' }
      ]
    },
    {
      id: 'pharma',
      name: 'Pharmaceuticals & Healthcare',
      badge: '21 CFR Part 11 & US-FDA DSCSA',
      icon: Pill,
      color: '#009a44',
      bgLight: '#f0fdf4',
      tagline: 'High-Speed Packaging Line Serialization, Multi-Level Aggregation & DGFT Export Compliance',
      overview: 'High-speed item-to-pallet cryptographic serialization compliant with US-FDA DSCSA, EU-FMD, and DGFT export mandates at line speeds up to 450 packs/minute.',
      challenges: [
        'Strict global compliance mandates requiring parent-child aggregation from blister -> carton -> case -> pallet.',
        'High packaging line speeds (up to 450 packs/min) where standard cameras fail or bottleneck throughput.',
        'Paperless digital audit requirements with mandatory 21 CFR Part 11 electronic signatures and audit trails.'
      ],
      solutionsOffered: [
        {
          title: 'Perfect Trace™ 4-Tier Aggregation Suite',
          desc: 'Blister pack, bottle carton, shipper case, and pallet-level cryptographic QR serial generation and physical label application.'
        },
        {
          title: 'Perfect Audit™ Digital Compliance SaaS',
          desc: 'Paperless non-conformance logs, automated CAPA workflows, and timestamped electronic audit trails.'
        },
        {
          title: 'Print & Apply Automated Reject Stations',
          desc: 'In-line ISO 15415 grade verification with pneumatic reject arm for sub-standard barcodes.'
        }
      ],
      caseStudy: {
        client: 'Global Formulation Plants & Active Pharmaceutical Exporters',
        result: '100% DGFT & US-FDA DSCSA compliance achieved across 18 automated packaging lines.'
      },
      stats: [
        { label: 'Packaging Speed', value: '450 packs/min' },
        { label: 'Audit Trail Uptime', value: '100%' },
        { label: 'Regulatory Non-Conformance', value: 'Zero' }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics, 3PL & Warehousing',
      badge: 'High-Throughput Distribution',
      icon: Truck,
      color: '#f59e0b',
      bgLight: '#fffbeb',
      tagline: 'Automated UHF RFID Dock Portals, 3D WMS Slotting & Forklift Fleet Automation',
      overview: 'Transform warehouse throughput with hands-free RFID dock portals reading 1,200+ tags/sec, intelligent 3D bin heatmap slotting, and zero-touch MDM fleet terminal management.',
      challenges: [
        'Manual scanning bottlenecks at dock loading bays causing dispatch delays and demurrage penalties.',
        'Mispicked inventory and lost pallet locations in high-bay racking.',
        'Fragmented rugged mobile terminals with frequent IT breakdowns and configuration drift.'
      ],
      solutionsOffered: [
        {
          title: 'Fixed Multi-Directional UHF RFID Portals',
          desc: 'Automated scanning of pallet loads as forklifts pass through dock doors at 15 km/h with instant ERP gate-pass validation.'
        },
        {
          title: 'Perfect Store™ WMS with 3D Heatmap AI',
          desc: 'Dynamic FIFO/FEFO picking paths, automated bin optimization, and real-time SAP/Oracle ERP sync.'
        },
        {
          title: 'PerfectEdge MDM™ Fleet Lockdown',
          desc: 'Zero-touch QR provisioning, remote screen takeover, and push-to-talk communications for rugged warehouse scanners.'
        }
      ],
      caseStudy: {
        client: 'Multi-Client 3PL Hub (250,000+ sq.ft Facility)',
        result: 'Dock-to-stock turnaround time cut by 65%, achieving 99.98% inventory accuracy across 40,000 pallet positions.'
      },
      stats: [
        { label: 'Tag Scan Speed', value: '1,200+ tags/sec' },
        { label: 'Inventory Accuracy', value: '99.98%' },
        { label: 'Dock-to-Stock Cut', value: '-65%' }
      ]
    },
    {
      id: 'fmcg',
      name: 'FMCG, Food & Beverage',
      badge: 'High-Speed Discrete & Batch',
      icon: Package,
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      tagline: 'High-Speed Batch Coding, Expiry Verification & Anti-Counterfeit Channel Protection',
      overview: 'Protect brand integrity and eliminate product recalls with high-speed thermal inkjet printing, in-line OCR expiry code inspection, and anti-diversion QR serialization.',
      challenges: [
        'Smudged or illegible expiry date and batch codes causing retail partner rejections and consumer fines.',
        'Counterfeiting and unauthorized gray-market channel diversion of high-value packaged goods.',
        'High-speed continuous lines requiring real-time OEE and downtime Pareto tracking.'
      ],
      solutionsOffered: [
        {
          title: 'Continuous High-Speed TIJ & Laser Coders',
          desc: 'Instant-drying micro-coding on polybags, bottles, pouches, and corrugated cartons at up to 600 DPI.'
        },
        {
          title: 'Optical AI OCR/OCV Date Code Verifier',
          desc: '100% inspection of printed text, expiry dates, and MRP with automated reject trigger before packing.'
        },
        {
          title: 'Anti-Counterfeit Cloud Authentication',
          desc: 'Consumer-facing QR code scan verification connected to live brand protection cloud.'
        }
      ],
      caseStudy: {
        client: 'National FMCG Brand (Beverage & Personal Care Lines)',
        result: 'Zero misprinted expiry batches shipped to market and complete channel diversion visibility.'
      },
      stats: [
        { label: 'Inspection Speed', value: '600 units/min' },
        { label: 'False Reject Rate', value: '<0.01%' },
        { label: 'Recall Prevention', value: '100%' }
      ]
    },
    {
      id: 'heavy-engg',
      name: 'Heavy Engineering & Steel',
      badge: 'Extreme Ruggedized Industry',
      icon: Factory,
      color: '#E85874',
      bgLight: 'rgba(232, 88, 116, 0.08)',
      tagline: 'Extreme High-Temp RFID, Yard Asset Tracking & Overhead Crane IoT Telemetry',
      overview: 'Engineered for extreme environments including steel mills, foundries, and open stockyards. Withstand temperatures up to 300°C with ceramic UHF RFID tags and long-range laser scanners.',
      challenges: [
        'Extreme thermal exposure (+300°C) and heavy magnetic interference destroying conventional tags and sensors.',
        'Sprawling open storage yards (50+ acres) where locating specific steel coils or billets takes hours.',
        'Harsh vibration, dust, and rain degrading shopfloor handhelds and wireless access points.'
      ],
      solutionsOffered: [
        {
          title: 'Ultra High-Temp Ceramic UHF RFID Tags',
          desc: 'Rated for 300°C continuous heat exposure on hot steel coils, engine castings, and smelting billets.'
        },
        {
          title: 'GPS + UHF RFID Open Yard Locator',
          desc: 'Sub-meter accurate 3D yard map showing exact slot positions of heavy raw materials and finished goods.'
        },
        {
          title: 'Crane-Mounted Long-Range RFID Scanners',
          desc: 'Automatic tag capture from 15 meters as overhead gantry cranes lift and transport heavy bundles.'
        }
      ],
      caseStudy: {
        client: 'Major Steel & Metal Manufacturing Conglomerate',
        result: 'Yard search time for steel coils reduced from 45 minutes to under 60 seconds.'
      },
      stats: [
        { label: 'Heat Endurance', value: 'Up to 300°C' },
        { label: 'Yard Search Time', value: '<60 seconds' },
        { label: 'Tag Survivability', value: '100%' }
      ]
    },
    {
      id: 'amc-field',
      name: '24/7 Field Engineering & AMC',
      badge: 'Zero-Downtime Mission Critical',
      icon: Headphones,
      color: '#0d9488',
      bgLight: '#f0fdfa',
      tagline: 'Guaranteed 4-Hour Emergency Dispatch SLA, Resident Plant Engineers & Hot-Swap Spares',
      overview: 'Comprehensive Annual Maintenance Contracts (AMC) designed to guarantee 99.9% uptime across all your barcode, RFID, vision, and printing hardware with certified resident automation specialists.',
      challenges: [
        'Unplanned line stoppages costing thousands of dollars per hour due to scanner or printer hardware breakdown.',
        'Delayed OEM support taking days for replacement parts or on-site engineer visit.',
        'Lack of routine preventive calibration leading to gradual sensor and optical scanner degradation.'
      ],
      solutionsOffered: [
        {
          title: 'Guaranteed 4-Hour On-Site SLA',
          desc: 'Priority emergency dispatch across key industrial manufacturing hubs (Chennai, Bangalore, NCR, Pune, Ahmedabad).'
        },
        {
          title: 'Pre-Stocked Hot-Swap Buffer Vaults',
          desc: 'Consignment inventory of replacement scanners, printheads, and RFID readers kept directly at your plant.'
        },
        {
          title: 'Preventive Optical & Sensor Calibration',
          desc: 'Quarterly deep cleaning, lens alignment, firmware patching, and laser health verification.'
        }
      ],
      caseStudy: {
        client: '24/7 Tier-1 Automotive & Consumer Electronics Plants',
        result: '99.98% hardware availability maintained with mean time to repair (MTTR) under 25 minutes.'
      },
      stats: [
        { label: 'Emergency SLA', value: '<4 Hours' },
        { label: 'Hardware Uptime', value: '99.98%' },
        { label: 'Spare Hot-Swap', value: 'Instant' }
      ]
    }
  ];

  const activeData = industries.find(i => i.id === selectedIndustry) || industries[0];

  return (
    <div style={{ backgroundColor: '#060b14', color: '#ffffff', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Header Section */}
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
            backgroundColor: 'rgba(0, 113, 186, 0.2)',
            border: '1px solid rgba(0, 113, 186, 0.5)',
            color: '#38bdf8',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={15} />
            <span>INDUSTRY 4.0 VERTICAL SOLUTIONS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Engineered for <span className="gradient-text">Mission-Critical Manufacturing</span>
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            maxWidth: '820px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Explore specialized hardware, proprietary software, and automated AIDC systems tailored specifically for your industry vertical.
          </p>

          {/* Industry Selection Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '1050px',
            margin: '0 auto'
          }}>
            {industries.map((ind) => {
              const IconComp = ind.icon;
              const isSelected = ind.id === selectedIndustry;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  style={{
                    backgroundColor: isSelected ? ind.color : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? `2px solid ${ind.color}` : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 8px 25px ${ind.color}50` : 'none',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  <IconComp size={18} color={isSelected ? '#ffffff' : '#94a3b8'} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Industry Deep-Dive Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          
          <div style={{
            backgroundColor: '#0a1324',
            border: `1.5px solid ${activeData.color}40`,
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${activeData.color}20`
          }}>
            
            {/* Header with Title & Badge */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: `${activeData.color}25`,
                  border: `1px solid ${activeData.color}60`,
                  color: activeData.color === '#f59e0b' ? '#fbbf24' : activeData.color,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem'
                }}>
                  <ShieldCheck size={14} />
                  <span>{activeData.badge}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {activeData.name} Solution Blueprint
                </h2>
                <p style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 600 }}>
                  {activeData.tagline}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, maxWidth: '850px', marginTop: '0.75rem' }}>
                  {activeData.overview}
                </p>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openDemoModal({ solution: `${activeData.name} Consultation`, notes: `Industry inquiry from Solutions view (${activeData.name})` })}
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
                  <span>Request {activeData.name} Blueprint</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            {/* 3 Metric Stat Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem'
            }}>
              {activeData.stats.map((st, sIdx) => (
                <div 
                  key={sIdx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: activeData.color, marginBottom: '0.25rem' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Grid: Challenges vs Delivered Solution */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              
              {/* Left Col: Industry Challenges */}
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                padding: '1.75rem'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fca5a5', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>⚠️ Common Plant Bottlenecks & Pitfalls</span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeData.challenges.map((ch, cIdx) => (
                    <li key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginTop: '6px', flexShrink: 0 }}></div>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Col: ATPL Integrated Solution Modules */}
              <div style={{
                backgroundColor: 'rgba(0, 113, 186, 0.06)',
                border: '1px solid rgba(0, 113, 186, 0.3)',
                borderRadius: '16px',
                padding: '1.75rem'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="#00f0ff" />
                  <span>The ATPL Integrated Architecture</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {activeData.solutionsOffered.map((sol, soIdx) => (
                    <div key={soIdx}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                        {sol.title}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        {sol.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Case Study Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
              border: '1px solid rgba(0, 113, 186, 0.35)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  PROVEN ENTERPRISE IMPACT
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                  {activeData.caseStudy.client}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                  {activeData.caseStudy.result}
                </div>
              </div>

              <button
                onClick={() => setCurrentView('about')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '8px',
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>View All 500+ Clients</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Explore Virtual Plant Callout */}
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
              Want to see these solutions in an interactive 3D virtual plant?
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Launch our 3D Digital Twin and travel across all 12 assembly and warehouse stations with live IoT sensor telemetry.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentView('factory-3d')}
                style={{
                  backgroundColor: '#00f0ff',
                  color: '#060b14',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(0, 240, 255, 0.35)'
                }}
              >
                <Sparkles size={18} />
                <span>Launch 3D Digital Twin</span>
              </button>

              <button
                onClick={() => openDemoModal({ solution: 'Plant Sizing Feasibility Study', notes: 'Lead requested feasibility from solutions footer' })}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '10px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Book Plant Feasibility Audit</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
