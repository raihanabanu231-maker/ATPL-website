import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Cpu, 
  Smartphone, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Barcode, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';

export const HardwareView = () => {
  const { openDemoModal } = useApp();

  const hardwareLines = [
    {
      id: 'rfid',
      name: 'Fixed UHF RFID Portals & Antennas',
      category: 'RFID & Supply Chain Gates',
      icon: Radio,
      badge: 'IP67 Heavy-Duty',
      color: '#00f0ff',
      specs: [
        '8-Port multi-directional beam-steered UHF antenna array',
        '1,400+ tags/second read rate at high forklift transit speeds',
        'Integrated optical photo-eyes for directional inbound/outbound transit validation',
        'Direct Ethernet / PoE+ and Industrial Modbus TCP interfaces'
      ]
    },
    {
      id: 'scanners',
      name: 'Industrial 2D & DPM Barcode Scanners',
      category: 'Fixed Mount & Handheld Scanners',
      icon: Barcode,
      badge: 'DPM & High-Density',
      color: '#f59e0b',
      specs: [
        'Decodes challenging Direct Part Marking (DPM) dot-peen and laser etched codes',
        'Ultra-fast multi-code decoding in sub-10 milliseconds',
        'Vibration, beeper, and green-spot visual decode confirmation',
        'IP65 industrial metal casing with oil and chemical resistance'
      ]
    },
    {
      id: 'printers',
      name: 'Industrial Barcode & RFID Encoding Printers',
      category: 'Serialization & Packaging Marking',
      icon: Printer,
      badge: '600 DPI & High-Duty',
      color: '#10b981',
      specs: [
        'Thermal transfer and direct thermal printing up to 14 inches/sec',
        'Simultaneous UHF RFID tag encoding and GS1 barcode printing',
        'All-metal print mechanism engineered for continuous 24/7 industrial shifts',
        'ZPL, EPL, and direct ERP print server plug-ins'
      ]
    },
    {
      id: 'handhelds',
      name: 'Rugged Mobile Handheld Terminals (PDA/EDA)',
      category: 'Warehouse & Shopfloor Mobility',
      icon: Smartphone,
      badge: 'MIL-STD-810H',
      color: '#3b82f6',
      specs: [
        'IP68 submersible & 2.4-meter drop-tested Gorilla Glass 5 touchscreen',
        'Extended-range 2D barcode imager reading pallets up to 18 meters away',
        'Hot-swappable 6,000mAh battery for continuous 16-hour multi-shift operation',
        'Android 14 Enterprise OS with pre-loaded ATPL WMS Mobile Client'
      ]
    },
    {
      id: 'vision',
      name: 'High-Resolution Telecentric Vision Cameras',
      category: 'Optical AI Defect Inspection',
      icon: Eye,
      badge: '25MP GigE Vision',
      color: '#8b5cf6',
      specs: [
        '25 Megapixel global shutter sensor with zero optical distortion telecentric lens',
        'Strobed polarized coaxial and darkfield LED illumination domes',
        'Sub-micron optical resolution capturing 0.02mm microscopic cracks',
        'Hardware GPIO triggering in under 5 microseconds'
      ]
    },
    {
      id: 'automation',
      name: 'Conveyor Sorting & Pneumatic Reject Gates',
      category: 'In-Line Material Handling',
      icon: Zap,
      badge: 'High-Speed Inline',
      color: '#E85874',
      specs: [
        'High-speed pneumatic pusher, blow-off, and drop-flap reject mechanisms',
        'PLC interface with fail-safe bin sensors ensuring uninspected items are quarantined',
        'Integrated tachometer speed synchronization up to 450 items/minute',
        'Emergency stop integration adhering to CE & ISO 13849 machinery safety'
      ]
    },
    {
      id: 'labeler',
      name: 'PERFECT LABELER™ (Print & Apply System)',
      category: 'Automated Packaging & Carton Labeling',
      icon: Printer,
      badge: '120 Packs/Min Sync',
      color: '#10b981',
      specs: [
        'Interchangeable tamp-blow, corner-wrap, and heavy pallet applicator arms',
        'Real-time GS1 serialization label printing synchronized up to 120 cartons/min',
        'Integrated in-line ISO/IEC 15415 2D DataMatrix barcode grade verifier',
        'Automated pneumatic reject chute for unscannable or misaligned labels'
      ]
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>INDUSTRIAL AIDC & SENSOR HARDWARE</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
            Rugged Hardware Built for <span className="gradient-text">Demanding Factory Floors</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Archery Technocrats designs, sources, and commissions enterprise-grade AIDC hardware engineered for 24/7 reliability in automotive foundries, sterile pharmaceutical cleanrooms, and high-velocity fulfillment centers.
          </p>
        </div>

        {/* Hardware Grid */}
        <div className="grid-3" style={{ gap: '2rem', marginBottom: '4rem' }}>
          {hardwareLines.map(hw => {
            const Icon = hw.icon;
            return (
              <div
                key={hw.id}
                className="glass-card"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: `1px solid ${hw.color}35`,
                  boxShadow: `0 0 30px ${hw.color}10`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: `${hw.color}18`,
                      border: `1px solid ${hw.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color={hw.color} />
                    </div>
                    <span className="badge" style={{ background: `${hw.color}15`, color: hw.color, border: `1px solid ${hw.color}40` }}>
                      {hw.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 700 }}>{hw.name}</h3>
                  <div style={{ fontSize: '0.82rem', color: hw.color, fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
                    {hw.category}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    {hw.specs.map((spec, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                        <CheckCircle2 size={15} color={hw.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                  <button
                    onClick={() => openDemoModal({ solution: hw.name, notes: `Hardware RFQ & sample evaluation request for ${hw.name}` })}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                  >
                    <span>Request RFQ & Site Survey</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Integration & Consumables Banner */}
        <div className="glass-card" style={{ padding: '2.5rem 3rem', background: 'rgba(8, 17, 34, 0.85)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>TURNKEY CONSUMABLES & TAGS</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Specialized RFID Tags, Barcode Labels & Thermal Ribbons
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', margin: 0, maxWidth: '750px', lineHeight: 1.6 }}>
              We supply ISO/IEC compliant tamper-evident barcode labels, metal-mount UHF RFID tags, chemical-resistant tags for pharma autoclaves, and high-resin thermal transfer ribbons.
            </p>
          </div>

          <button
            onClick={() => openDemoModal({ solution: 'Consumables & Labels RFQ', notes: 'Inquiry for specialized RFID tags, labels, and ribbons.' })}
            className="btn btn-secondary"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>Request Consumables Catalog</span>
          </button>
        </div>

      </div>
    </div>
  );
};
