import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Building2, 
  ArrowUpRight, 
  Check,
  Zap,
  Boxes,
  FileCheck,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClientLogo } from './ClientBrandLogos';

export const ENTERPRISE_CASE_STUDIES_DATA = [
  {
    id: 'cs-automotive',
    clientName: 'TVS Sensing & Automotive Powertrain OEM',
    clientSlug: 'ola-electric',
    category: 'Automotive & EV Powertrain',
    icon: Zap,
    metricValue: '-98%',
    metricLabel: 'Recall Isolation Cycle Time',
    metricHighlight: 'From 2 Hours ➔ Under 2 Minutes',
    solution: 'Perfect Trace™ 4-Tier GS1 Packaging Serialization & SAP S/4HANA Sync',
    challenge: 'Manual lot allocation and physical ledger tracking created 2-hour production bottlenecks, high labor overhead, and critical recall liability on high-speed engine and EV motor lines.',
    outcomes: [
      'Zero escape defects across 450 packs/min high-speed packaging lines',
      '1-Click backward/forward recall genealogy tracking with sub-second SAP S/4HANA IDoc synchronization',
      '100% DGFT & US-FDA DSCSA electronic record compliance (21 CFR Part 11)'
    ],
    verifiedQuote: 'ATPL\'s Perfect Trace slashed our traceability lot allocation cycle from two hours to under two minutes with zero data loss.',
    author: 'VP of Manufacturing Operations',
    color: '#0071ba'
  },
  {
    id: 'cs-logistics',
    clientName: 'National 3PL Logistics & Cold-Chain Hub',
    clientSlug: 'proconnect-logistics',
    category: 'Supply Chain & Warehousing (120,000 sq.ft)',
    icon: Boxes,
    metricValue: '99.98%',
    metricLabel: 'Inventory Visibility & Accuracy',
    metricHighlight: '10x Faster Dock Inbound/Outbound Throughput',
    solution: 'Fixed UHF RFID Gate Portals (1,400+ tags/sec) & Perfect Store™ WMS 4.0',
    challenge: 'Manual handheld barcode scanning at shipping dock doors created multi-hour forklift congestion queues, shipping mismatches, and delayed dock-to-stock turnaround.',
    outcomes: [
      '1,400+ pallet RFID tags read per second with zero forklift stoppage',
      'Dock-to-stock processing time cut by 65%, increasing forklift velocity by 38%',
      'Eliminated shipping mismatch claims, achieving 99.98% inventory accuracy'
    ],
    verifiedQuote: 'The fixed UHF RFID dock portals verify 1,200 pallet tags per second with zero forklift stoppage. Shipping errors dropped to absolute zero.',
    author: 'Director of Plant Automation',
    color: '#009a44'
  },
  {
    id: 'cs-fmcg',
    clientName: 'Hatsun Agro / Top Indian FMCG Conglomerate',
    clientSlug: 'hatsun-agro',
    category: 'FMCG, Dairy & Process Packaging (14 Plants)',
    icon: FileCheck,
    metricValue: '-70%',
    metricLabel: 'Audit Preparation Time Reduced',
    metricHighlight: 'From 4 Weeks ➔ Under 2 Days Across 14 Plants',
    solution: 'Perfect Audit™ 100% Paperless Digital Compliance Platform',
    challenge: 'Paper-based clipboards across 14 multi-state facilities led to lost inspection records, delayed non-conformance remediation, and 4-week prep backlogs for ISO certification.',
    outcomes: [
      '100% paperless digital inspection checklists with timestamped photo/video audit trails',
      'Automated CAPA workflows routing corrective actions in hours instead of weeks',
      'Continuous 365-day ISO 9001:2015 & FSSAI audit readiness with real-time multi-plant dashboard'
    ],
    verifiedQuote: 'Deploying Perfect Audit across our facilities eliminated paper clipboards and cut audit prep time by 70%. The automated photo evidence and CAPA workflows keep us audit-ready 365 days a year.',
    author: 'Head of Supply Chain & Quality',
    color: '#8b5cf6'
  },
  {
    id: 'cs-pharma',
    clientName: 'Caplin Point Laboratories (US-FDA Approved)',
    clientSlug: 'caplin-steriles',
    category: 'Pharmaceuticals & Regulated Packaging',
    icon: Printer,
    metricValue: '200+',
    metricLabel: 'Industrial Printers Unified Across 6 Plants',
    metricHighlight: '-90% Label Template Authoring Time',
    solution: 'Perfect Labeler™ Cloud & Universal Industrial Printer Architecture',
    challenge: 'Disjointed label printers across 6 manufacturing units led to dangerous template version drift, manual label errors, and compliance breach risks under stringent US-FDA mandates.',
    outcomes: [
      'Unified 200+ Zebra, TSC, and Honeywell printers onto a multi-tenant cloud platform',
      '100% US-FDA DSCSA & DGFT compliance with 21 CFR Part 11 cryptographic change logs',
      'Template authoring and validation time slashed by 90% via WYSIWYG visual cloud designer'
    ],
    verifiedQuote: 'For pharmaceutical parent-child serialization compliant with US-FDA DSCSA mandates, ATPL is the gold standard.',
    author: 'General Manager – Regulatory Quality',
    color: '#E85874'
  }
];

export const EnterpriseCaseStudiesSection = () => {
  const { openDemoModal, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  const filteredStudies = activeTab === 'all'
    ? ENTERPRISE_CASE_STUDIES_DATA
    : ENTERPRISE_CASE_STUDIES_DATA.filter(cs => cs.id.includes(activeTab));

  const handleDownloadReport = () => {
    if (addToast) {
      addToast('Case Studies Download', 'Downloading 2026 ATPL Enterprise Case Studies Brief...', 'success');
    }
    const link = document.createElement('a');
    link.href = '/ATPL_Smart_Factory_Overview_2026.pdf';
    link.setAttribute('download', 'ATPL_Enterprise_Case_Studies_2026.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="case-studies" 
      aria-label="Enterprise Case Studies and Quantified Results"
      style={{
        padding: '6rem 0',
        backgroundColor: '#07101e',
        color: '#ffffff',
        position: 'relative',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.25rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            color: '#00f0ff',
            padding: '0.4rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 15px rgba(0, 240, 255, 0.15)'
          }}>
            <ShieldCheck size={16} color="#00f0ff" />
            <span>PROVEN ENTERPRISE ROI & QUANTIFIED RESULTS</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: '1.2rem',
            fontFamily: 'var(--font-display)'
          }}>
            Verified Case Studies: Measured Outcomes Across 250+ Plants
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.65, margin: 0 }}>
            Real metrics from mission-critical industrial deployments. See how India's top automotive, pharmaceutical, FMCG, and electronics manufacturers achieve zero-defect assembly and proven payback in under 6 months with the ATPL One™ platform.
          </p>
        </div>

        {/* 4 Quantified Highlight Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem',
          backgroundColor: 'rgba(11, 23, 44, 0.8)',
          border: '1.5px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)', paddingRight: '1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#00f0ff', lineHeight: 1 }}>
              -98%
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginTop: '0.4rem' }}>
              Recall Isolation Time
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              2 hours reduced to under 2 minutes
            </div>
          </div>

          <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)', paddingRight: '1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#00f0ff', lineHeight: 1 }}>
              99.98%
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginTop: '0.4rem' }}>
              Inventory Accuracy
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              120,000 sq.ft facility with zero mismatch
            </div>
          </div>

          <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)', paddingRight: '1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#299fe0', lineHeight: 1 }}>
              10x Faster
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginTop: '0.4rem' }}>
              Dock Throughput Velocity
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              1,400+ tags/sec RFID read rate
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#E85874', lineHeight: 1 }}>
              &lt; 6 Mos
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginTop: '0.4rem' }}>
              Average Capital Payback
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Direct labor & rework savings
            </div>
          </div>
        </div>

        {/* Detailed Case Studies Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {ENTERPRISE_CASE_STUDIES_DATA.map((cs) => {
            const Icon = cs.icon;
            return (
              <div
                key={cs.id}
                style={{
                  backgroundColor: 'rgba(11, 23, 44, 0.85)',
                  border: '1.5px solid rgba(0, 240, 255, 0.22)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="case-study-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#00f0ff';
                  e.currentTarget.style.boxShadow = '0 25px 55px rgba(0, 240, 255, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.45)';
                }}
              >
                {/* Accent Top Glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${cs.color} 0%, #00f0ff 100%)`
                }} />

                <div>
                  {/* Card Header: Industry & Client Name */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f0ff', letterSpacing: '0.06em' }}>
                        {cs.category}
                      </span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0 0' }}>
                        {cs.clientName}
                      </h3>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '0.5rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ClientLogo slug={cs.clientSlug} height={36} />
                    </div>
                  </div>

                  {/* Primary Quantified Callout Box */}
                  <div style={{
                    backgroundColor: 'rgba(0, 240, 255, 0.06)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    borderRadius: '12px',
                    padding: '1.1rem 1.25rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem'
                  }}>
                    <div style={{
                      fontSize: '2.4rem',
                      fontWeight: 900,
                      color: cs.color,
                      lineHeight: 1,
                      fontFamily: 'var(--font-display)',
                      flexShrink: 0
                    }}>
                      {cs.metricValue}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                        {cs.metricLabel}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.2rem' }}>
                        ★ {cs.metricHighlight}
                      </div>
                    </div>
                  </div>

                  {/* Solution Implemented */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                      Technology Architecture
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} color="#00f0ff" style={{ flexShrink: 0 }} />
                      <span>{cs.solution}</span>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div style={{ marginBottom: '1.25rem', fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
                    <strong style={{ color: '#cbd5e1' }}>Challenge: </strong>
                    {cs.challenge}
                  </div>

                  {/* Measurable Outcomes Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                      Verified Operational Results
                    </div>
                    {cs.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                        <Check size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verified Executive Quote */}
                  <div style={{
                    borderLeft: `3px solid ${cs.color}`,
                    paddingLeft: '1rem',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                    fontSize: '0.86rem',
                    color: '#e2e8f0',
                    lineHeight: 1.55
                  }}>
                    "{cs.verifiedQuote}"
                    <div style={{ fontStyle: 'normal', fontWeight: 700, fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                      — {cs.author}, {cs.clientName.split('/')[0]}
                    </div>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <button
                    type="button"
                    onClick={() => openDemoModal({
                      solution: `Case Study Brief: ${cs.clientName}`,
                      notes: `Lead requested full case study brief for ${cs.clientName} (${cs.metricValue} ${cs.metricLabel})`
                    })}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid #00f0ff',
                      color: '#00f0ff',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#00f0ff';
                      e.currentTarget.style.color = '#030a16';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
                      e.currentTarget.style.color = '#00f0ff';
                    }}
                  >
                    <span>Request Full Case Study</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openDemoModal({
                      solution: `Plant Feasibility Audit: ${cs.category}`,
                      notes: `Requested plant feasibility audit inspired by ${cs.clientName}`
                    })}
                    style={{
                      backgroundColor: '#E85874',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1.1rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 14px rgba(232, 88, 116, 0.4)'
                    }}
                  >
                    <span>Book Demo</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Bottom Banner */}
        <div style={{
          backgroundColor: 'linear-gradient(135deg, rgba(11, 23, 44, 0.95) 0%, rgba(3, 8, 20, 0.98) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
              Want to see projected ROI benchmarks for your plant?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0 }}>
              Our senior Industry 4.0 automation engineers will calculate your exact throughput acceleration and payback schedule.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleDownloadReport}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                padding: '0.8rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Download size={16} />
              <span>Download 2026 Overview</span>
            </button>

            <button
              type="button"
              onClick={() => openDemoModal({
                solution: 'Plant Feasibility & ROI Benchmark Audit',
                notes: 'Lead requested Plant Feasibility & ROI Benchmark from Case Studies CTA Banner'
              })}
              style={{
                backgroundColor: '#E85874',
                color: '#ffffff',
                border: 'none',
                padding: '0.8rem 1.6rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 18px rgba(232, 88, 116, 0.45)'
              }}
            >
              <span>Schedule Plant Feasibility Audit</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
