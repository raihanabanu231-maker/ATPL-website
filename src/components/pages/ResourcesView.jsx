import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  Sparkles, 
  BookOpen, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Boxes, 
  Layers, 
  Printer, 
  Smartphone,
  ExternalLink,
  Search
} from 'lucide-react';

export const ResourcesView = () => {
  const { openDemoModal, setCurrentView, addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const downloads = [
    {
      title: 'ATPL Corporate Capabilities & Pitch Deck (2026)',
      category: 'corporate',
      type: 'PDF Presentation (30 Pages)',
      size: '8.4 MB',
      desc: 'Complete overview of Archery Technocrats Private Limited, leadership, proprietary software products, marquee clients, and Pan-India offices.'
    },
    {
      title: 'Perfect Store™ (WMS) Architecture & ERP Middleware Whitepaper',
      category: 'software',
      type: 'Technical Whitepaper',
      size: '4.2 MB',
      desc: 'In-depth guide on 3D bin heatmap slotting, dynamic FIFO/FEFO rules, and sub-second SAP S/4HANA / Oracle NetSuite sync.'
    },
    {
      title: 'US-FDA DSCSA & DGFT Export Serialization Guide',
      category: 'compliance',
      type: 'Regulatory Brief',
      size: '3.8 MB',
      desc: '4-tier packaging aggregation hierarchy (Unit -> Bundle -> Shipper -> Pallet) with 21 CFR Part 11 compliant digital audit trails.'
    },
    {
      title: 'Fixed UHF RFID Dock Portal Deployment & Tuning Handbook',
      category: 'hardware',
      type: 'Engineering Guide',
      size: '5.1 MB',
      desc: 'Best practices for 1,200+ tag/second dense read rates, on-metal anti-collision filtering, and forklift gate automation.'
    },
    {
      title: 'Perfect AI Vision System™ Sub-8ms Defect Detection Spec Sheet',
      category: 'software',
      type: 'Product Datasheet',
      size: '2.6 MB',
      desc: 'Optical neural network specifications, ISO/IEC 15415 barcode grading, and pneumatic reject timing schematics.'
    },
    {
      title: 'PerfectEdge MDM™ Rugged Handheld Fleet Management Guide',
      category: 'software',
      type: 'Solution Overview',
      size: '3.1 MB',
      desc: 'Zero-touch QR provisioning, locked kiosk launcher mode, and remote OTA firmware management across 1,000+ terminals.'
    }
  ];

  const handleDownload = (item) => {
    addToast('Download Initiated', `Downloading "${item.title}"...`, 'success');
  };

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'corporate', label: 'Corporate & Overview' },
    { id: 'software', label: 'Software Suites' },
    { id: 'hardware', label: 'AIDC Hardware & RFID' },
    { id: 'compliance', label: 'Regulatory & Standards' }
  ];

  const filteredDownloads = activeCategory === 'all' 
    ? downloads 
    : downloads.filter(d => d.category === activeCategory);

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
            backgroundColor: 'rgba(0, 113, 186, 0.2)',
            border: '1px solid rgba(0, 113, 186, 0.5)',
            color: '#38bdf8',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1.25rem'
          }}>
            <BookOpen size={15} />
            <span>KNOWLEDGE HUB & DOWNLOADS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Technical Resources & <span className="gradient-text">Product Documentation</span>
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            maxWidth: '820px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Access downloadable datasheets, regulatory whitepapers, 3D plant simulators, and system integration guides for Industry 4.0 automation.
          </p>

          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: activeCategory === cat.id ? '#0071ba' : 'rgba(255, 255, 255, 0.05)',
                  border: activeCategory === cat.id ? '2px solid #0071ba' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.6rem 1.2rem',
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
      </section>

      {/* Interactive 3D Twin Callout Card */}
      <section style={{ padding: '3.5rem 0 1.5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.2) 0%, rgba(0, 240, 255, 0.1) 100%)',
            border: '1.5px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '20px',
            padding: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.15)'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(0, 240, 255, 0.2)',
                color: '#00f0ff',
                padding: '0.25rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                <Sparkles size={14} />
                <span>FEATURED INTERACTIVE RESOURCE</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                3D Virtual Plant Simulator & Digital Twin
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Explore all 12 smart factory stations directly in your web browser with live station telemetry, conveyor simulation, and failure drill testbeds.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('factory-3d')}
              style={{
                backgroundColor: '#00f0ff',
                color: '#060b14',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem 2rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(0, 240, 255, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={18} />
              <span>Launch 3D Digital Twin</span>
            </button>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredDownloads.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#0a1324',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 113, 186, 0.15)',
                      border: '1px solid rgba(0, 113, 186, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#38bdf8'
                    }}>
                      <FileText size={20} />
                    </div>

                    <span style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#94a3b8',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 600
                    }}>
                      {item.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {item.title}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                    File size: {item.size}
                  </span>

                  <button
                    onClick={() => handleDownload(item)}
                    style={{
                      backgroundColor: 'rgba(0, 113, 186, 0.2)',
                      border: '1px solid rgba(0, 113, 186, 0.5)',
                      color: '#38bdf8',
                      borderRadius: '8px',
                      padding: '0.45rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Custom Consultation Box */}
      <section style={{ padding: '3rem 0 1rem 0' }}>
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
              Need a Custom Solution Blueprint for Your Facility?
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Our senior automation architects will analyze your plant layout, line speeds, and ERP requirements to deliver a comprehensive payback & sizing audit.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => openDemoModal({ solution: 'Custom Blueprint Request', notes: 'Lead requested custom engineering blueprint from resources page' })}
                style={{
                  backgroundColor: '#0071ba',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(0, 113, 186, 0.35)'
                }}
              >
                <span>Request Custom Plant Blueprint</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
