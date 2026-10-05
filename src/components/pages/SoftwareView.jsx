import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Boxes, 
  Eye, 
  FileCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Radio, 
  Database, 
  Download, 
  Check, 
  Server,
  Smartphone,
  Printer
} from 'lucide-react';

export const SoftwareView = () => {
  const { openDemoModal } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Software Suites' },
    { id: 'store', label: 'PERFECT STORE™ (WMS)' },
    { id: 'trace', label: 'PERFECT TRACE™' },
    { id: 'vision', label: 'PERFECT AI VISION™' },
    { id: 'mdm', label: 'PERFECTEDGE MDM™' },
    { id: 'labeler', label: 'PERFECT LABELER™' },
    { id: 'audit', label: 'PERFECT AUDIT™' },
    { id: 'solvedge', label: 'PERFECT SOLVEDGE™' }
  ];

  const softwareProducts = [
    {
      id: 'store',
      name: 'Perfect Store™ (WMS)',
      tagline: 'Industrial Warehouse Management & ERP Middleware',
      icon: Boxes,
      badge: 'v5.4 Enterprise WMS',
      color: '#00f0ff',
      desc: 'High-throughput enterprise WMS & middleware connecting standard SAP ERP, PLCs, HMIs, and SPM testing machines with automated barcode & RFID tracking to eliminate inventory errors.',
      features: [
        'Automated Pallet & Carton level RFID gate integration',
        'Standard ERP (SAP S/4HANA, Oracle), PLC, HMI, and SPM middleware connector',
        'Dynamic 3D Warehouse Bin Heatmap & Slotting AI algorithms',
        'FIFO / FEFO / Expiry lot picking optimization & quarantine holds'
      ],
      integrations: ['SAP S/4HANA', 'Oracle NetSuite', 'Siemens PLC', 'MS Dynamics 365']
    },
    {
      id: 'trace',
      name: 'Perfect Trace™',
      tagline: 'End-to-End Serialization & Parent-Child Aggregation',
      icon: FileCheck,
      badge: 'GS1 & DGFT Certified',
      color: '#10b981',
      desc: 'Mission-critical supply chain track and trace software generating cryptographically verified parent-child aggregation hierarchies across pharmaceutical, automotive, FMCG, and retail packaging lines.',
      features: [
        'Item -> Bundle -> Case -> Pallet multi-tier aggregation engine',
        'DSCSA, EU-FMD & DGFT global regulatory compliance modules',
        'Cryptographic serial number generation & EPCIS repository sync',
        'Instant recall isolation & consumer anti-counterfeit verification portal'
      ],
      integrations: ['GS1 EPCIS', 'DGFT Portal', 'Tracer Systems']
    },
    {
      id: 'vision',
      name: 'Perfect AI Vision System™',
      tagline: 'Deep Learning Optical Defect & Surface QC',
      icon: Eye,
      badge: 'Real-Time Pass/Fail Edge AI',
      color: '#8b5cf6',
      desc: 'Edge-accelerated computer vision running deep convolutional neural networks to classify connector flaws, micro-scratches, solder defects, and label errors in under 8ms.',
      features: [
        'Automated Pass/Fail real-time industrial defect classification',
        'Sub-micron surface defect detection (scratches, pits, voids, stains)',
        'Zero-latency edge inference on NVIDIA Jetson & industrial GPUs',
        'Automated high-speed pneumatic reject chute triggering'
      ],
      integrations: ['NVIDIA TensorRT', 'Basler / FLIR Cameras', 'Modbus TCP']
    },
    {
      id: 'mdm',
      name: 'PerfectEdge MDM™',
      tagline: 'Enterprise Mobile Device & Frontline Fleet Management',
      icon: Smartphone,
      badge: 'v3.5 Enterprise Android',
      color: '#06b6d4',
      desc: 'Centralized control over thousands of rugged handhelds, vehicle-mounted terminals, and warehouse tablets with zero-touch enrollment, single-app kiosk lockdown, and remote support.',
      features: [
        'Zero-Touch QR / Barcode provisioning for thousands of rugged devices',
        'Policy-driven Single-App Kiosk Lockdown preventing tampering',
        'Push-to-Talk instant communication for frontline operations',
        'Real-time battery degradation telemetry & remote screen takeover'
      ],
      integrations: ['Android Enterprise', 'Zebra OEMConfig', 'Honeywell Edge', 'Samsung Knox']
    },
    {
      id: 'labeler',
      name: 'Perfect Labeler™',
      tagline: 'Cloud-Native Intelligent Label Operations Platform',
      icon: Printer,
      badge: 'Cloud Labelling SaaS',
      color: '#10b981',
      desc: 'Seamlessly connects enterprise data, label workflows, and industrial printers — transforming mission-critical labeling into a smarter, automated, and highly visible operation.',
      features: [
        'Visual Web Label Designer with live ERP database integration',
        'High-speed batch & N-up automated label generation',
        'Archie AI Assistant reducing technical design dependencies',
        'Audit trail logging & 100% in-line print verification'
      ],
      integrations: ['SAP S/4HANA', 'Zebra ZPL', 'TSC TSPL', 'Honeywell DPL']
    },
    {
      id: 'audit',
      name: 'Perfect Audit™',
      tagline: 'SaaS-Based ISO Internal Audit & Compliance Management',
      icon: ShieldCheck,
      badge: 'ISO & 21 CFR Compliant',
      color: '#E85874',
      desc: 'SaaS-based ISO internal audit management solution that streamlines audits, eliminates paper records, cuts prep time by 70%, and ensures regulatory compliance in any industry.',
      features: [
        'Digital audit checklists & automated non-conformance tracking',
        'Slashing audit preparation time by 70% with zero paper records',
        'Built-in regulatory standards policy lookup & ISO 9001 templates',
        'Multi-plant audit progress dashboards & automated CAPA escalation'
      ],
      integrations: ['ISO 9001:2015', '21 CFR Part 11', 'BMQR Systems']
    },
    {
      id: 'solvedge',
      name: 'PerfectSolvEdge™',
      tagline: 'In-House AI Support & Technical Troubleshooting Platform',
      icon: Cpu,
      badge: 'Generative AI Support',
      color: '#f59e0b',
      desc: 'Generative AI chatbot platform developed by ATPL to streamline technical support for AIDC devices and enterprise software with 24/7 multilingual assistance.',
      features: [
        'Real-time fault explanation & vision insights via voice/text',
        'Instant inventory, dispatch, and binning support via AI assistant',
        'AI-driven ISO audit query handling & policy lookup',
        '24/7 automated tier-1 technical support across all branches'
      ],
      integrations: ['OpenAI / Gemini LLM', 'ATPL Knowledge Graph', 'FieldCare Desk']
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? softwareProducts
    : softwareProducts.filter(p => p.id === activeCategory);

  return (
    <div className="section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>PROPRIETARY INDUSTRIAL SOFTWARE SUITE</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
            Enterprise Software for <span className="gradient-text">Connected Smart Factories</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '2.25rem' }}>
            Archery Technocrats builds robust, deterministic software suites bridging physical factory machinery with enterprise ERP clouds to deliver 100% data fidelity and audit compliance.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '960px',
            margin: '0 auto'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setTimeout(() => {
                    const el = document.getElementById('software-cards-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
                style={{
                  backgroundColor: activeCategory === cat.id ? '#0071ba' : 'rgba(255, 255, 255, 0.05)',
                  border: activeCategory === cat.id ? '2px solid #0071ba' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(0, 113, 186, 0.4)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Software Cards */}
        <div id="software-cards-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem', marginTop: '2.5rem', scrollMarginTop: '6rem' }}>
          {filteredProducts.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="glass-card"
                style={{
                  padding: '2.75rem',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '2.75rem',
                  alignItems: 'center',
                  border: `1px solid ${prod.color}35`,
                  boxShadow: `0 0 35px ${prod.color}10`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: `${prod.color}18`,
                      border: `1px solid ${prod.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color={prod.color} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>{prod.name}</h2>
                        <span className="badge" style={{ background: `${prod.color}15`, color: prod.color, border: `1px solid ${prod.color}40`, fontSize: '0.72rem' }}>
                          {prod.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{prod.tagline}</div>
                    </div>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                    {prod.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                    <button
                      onClick={() => openDemoModal({ solution: prod.name, notes: `Demo & Trial request for ${prod.name}` })}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                    >
                      <span>Request Live Demo</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      onClick={() => openDemoModal({ solution: `${prod.name} Tech Specs`, notes: `Brochure and technical integration guide request for ${prod.name}` })}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                    >
                      <Download size={14} />
                      <span>Get Architecture Whitepaper</span>
                    </button>
                  </div>
                </div>

                {/* Right Specification & Integrations Box */}
                <div style={{ background: 'rgba(5, 11, 22, 0.9)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.75rem' }}>
                  <div style={{ fontSize: '0.76rem', color: prod.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', fontWeight: 700 }}>
                    CORE ARCHITECTURAL FEATURES
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {prod.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        <CheckCircle2 size={16} color={prod.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Native ERP & System Connectors:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {prod.integrations.map((item, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          padding: '0.2rem 0.6rem',
                          fontSize: '0.74rem',
                          color: '#cbd5e1',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ERP Integration Architecture Banner */}
        <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(8, 17, 34, 0.85)', textAlign: 'center' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>ENTERPRISE INTEROPERABILITY</div>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.75rem' }}>
            Seamless Integration with Your Existing ERP & Shopfloor Stack
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: '700px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
            No need to replace your legacy ERP. ATPL software suites integrate natively via certified REST APIs, MQTT brokers, OPC-UA, and SAP IDOC connectors.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', alignItems: 'center' }}>
            {['SAP S/4HANA & ECC', 'Oracle Fusion Cloud', 'Microsoft Dynamics 365', 'Infor CloudSuite', 'Siemens MindSphere', 'Tally Prime'].map((erp, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '8px',
                padding: '0.75rem 1.25rem',
                color: '#e2e8f0',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Server size={16} color="var(--cyan-primary)" />
                <span>{erp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
