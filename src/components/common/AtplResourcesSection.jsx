import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Calculator, ShieldCheck, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AtplResourcesSection = () => {
  const { openDemoModal, addToast, setCurrentView } = useApp();
  const [downloadingId, setDownloadingId] = useState(null);

  const resources = [
    {
      id: 'res-roi',
      type: 'Interactive Tool',
      tag: 'ROI Calculator',
      title: 'Warehouse & RFID Automation ROI Calculator (2026)',
      desc: 'Benchmark your labor cost savings, dock throughput gains, and inventory discrepancy reduction over a 3-year horizon.',
      format: 'XLSX + Interactive PDF',
      ctaLabel: 'Download ROI Calculator',
      action: 'roi'
    },
    {
      id: 'res-compliance',
      type: 'Compliance Guide',
      tag: 'DGFT & US-FDA',
      title: 'Pharmaceutical & Discrete Serialization Compliance Checklist',
      desc: 'Step-by-step audit readiness checklist covering DSCSA, DGFT 4-tier aggregation, GS1 Digital Link barcodes, and 21 CFR Part 11 e-signatures.',
      format: 'PDF Guide • 14 Pages',
      ctaLabel: 'Get Compliance Checklist',
      action: 'compliance'
    },
    {
      id: 'res-wms',
      type: 'Technical Whitepaper',
      tag: 'WMS Architecture',
      title: 'Architecting Sub-Second SAP S/4HANA & Oracle WMS Middleware',
      desc: 'Engineering deep dive into bi-directional IDocs, asynchronous buffer queues, and edge RFID tag verification at 1,200 tags/sec.',
      format: 'Technical Whitepaper • 22 Pages',
      ctaLabel: 'Download Whitepaper',
      action: 'whitepaper'
    }
  ];

  const handleDownload = (res) => {
    setDownloadingId(res.id);
    if (addToast) {
      addToast('Resource Queued', `Downloading ${res.title}...`, 'success');
    }

    setTimeout(() => {
      // Simulate file download
      const link = document.createElement('a');
      link.href = '/ATPL_Smart_Factory_Overview_2026.pdf';
      link.setAttribute('download', `${res.tag.replace(/[^a-zA-Z0-9]/g, '_')}_ATPL_2026.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingId(null);
    }, 600);
  };

  return (
    <section id="resources-section" style={{ padding: '5.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'rgba(0, 154, 68, 0.08)',
            border: '1px solid rgba(0, 154, 68, 0.25)',
            color: '#009a44',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            <BookOpen size={14} color="#009a44" />
            <span>INDUSTRY 4.0 KNOWLEDGE BASE &amp; TOOLS</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)'
          }}>
            Engineering Whitepapers &amp; ROI Calculators
          </h2>

          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Practical engineering resources, compliance blueprints, and financial calculators authored by ATPL automation specialists.
          </p>
        </div>

        {/* 3-Column Resource Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}>
          {resources.map((res) => (
            <div
              key={res.id}
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#0071ba';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(0, 113, 186, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.04)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#0071ba',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '6px'
                  }}>
                    {res.tag}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    {res.format}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                  {res.title}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {res.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                <button
                  onClick={() => handleDownload(res)}
                  disabled={downloadingId === res.id}
                  style={{
                    width: '100%',
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 14px rgba(0, 113, 186, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a96'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0071ba'}
                >
                  <Download size={16} />
                  <span>{downloadingId === res.id ? 'Preparing...' : res.ctaLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Resources Link */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setCurrentView('resources');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#0071ba',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'underline'
            }}
          >
            <span>Explore All Technical Case Studies &amp; Product Datasheets</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
