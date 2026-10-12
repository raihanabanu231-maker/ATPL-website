import React from 'react';
import { Check, X, ShieldAlert, Zap, Clock, Cpu, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AtplDifferentiation = () => {
  const { openDemoModal } = useApp();

  const comparisonRows = [
    {
      criterion: 'Deployment Velocity',
      icon: Clock,
      atpl: {
        text: '2 to 4 Weeks Turnkey',
        sub: 'Pre-calibrated hardware & out-of-the-box SAP/Oracle connectors',
        positive: true
      },
      traditional: {
        text: '6 to 12 Months',
        sub: 'Manual custom coding & third-party middleware duct-taping',
        positive: false
      },
      megaVendors: {
        text: '12 to 18 Months',
        sub: 'Multi-quarter implementation cycles and heavy change orders',
        positive: false
      }
    },
    {
      criterion: 'Hardware + Software Synergy',
      icon: Cpu,
      atpl: {
        text: 'Unified In-House Ecosystem',
        sub: 'Proprietary WMS/Traceability designed directly with Honeywell, Zebra & Datalogic hardware',
        positive: true
      },
      traditional: {
        text: 'Disjointed Reseller Model',
        sub: 'Hardware resold with disconnected 3rd-party software plugins',
        positive: false
      },
      megaVendors: {
        text: 'Proprietary Vendor Lock-in',
        sub: 'Closed hardware ecosystems requiring expensive certified peripherals',
        positive: false
      }
    },
    {
      criterion: 'Total Cost of Ownership (TCO)',
      icon: Zap,
      atpl: {
        text: 'Up to 60% Lower TCO',
        sub: 'Transparent modular licensing with zero hidden consulting fees',
        positive: true
      },
      traditional: {
        text: 'High Unpredictable TCO',
        sub: 'Continuous billable hours for bug fixes and integration drift',
        positive: false
      },
      megaVendors: {
        text: 'Prohibitive 7-Figure Capex',
        sub: 'Heavy upfront licensing, annual seat fees, and mandatory partner consulting',
        positive: false
      }
    },
    {
      criterion: 'Real-Time ERP Sync (SAP / Oracle)',
      icon: ShieldCheck,
      atpl: {
        text: 'Sub-Second Certified Connectors',
        sub: 'Direct bi-directional SAP S/4HANA IDocs & Oracle BAPIs with zero data loss buffering',
        positive: true
      },
      traditional: {
        text: 'Fragile Batch Cron Jobs',
        sub: 'Periodic batch CSV imports causing inventory discrepancies',
        positive: false
      },
      megaVendors: {
        text: 'Complex Middleware Layers',
        sub: 'Requires external integration brokers (PI/PO, MuleSoft) at steep extra licensing',
        positive: false
      }
    },
    {
      criterion: 'On-Site Field Support & AMC SLA',
      icon: Award,
      atpl: {
        text: 'Guaranteed 4-Hour On-Site SLA',
        sub: 'Dedicated field engineers across Chennai, Hosur, Bangalore & Madurai corridors with local hardware swap pool',
        positive: true
      },
      traditional: {
        text: 'Best-Effort Ticketing',
        sub: 'Slow 48-72 hour response times with no guaranteed local hardware swap pool',
        positive: false
      },
      megaVendors: {
        text: 'Offshore Multi-Tier Queues',
        sub: 'Tier-1/2 offshore call centers with days of delay before physical dispatch',
        positive: false
      }
    },
    {
      criterion: 'Hardware Agnostic Freedom',
      icon: ShieldAlert,
      atpl: {
        text: '100% Brand-Agnostic Flexibility',
        sub: 'Seamlessly works across Zebra, Honeywell, Cognex, Keyence, Sick, Omron, SATO & TSC without lock-in',
        positive: true
      },
      traditional: {
        text: 'Limited Authorizations',
        sub: 'Pushes whatever brand provides them highest reseller margin, causing mismatched hardware silos',
        positive: false
      },
      megaVendors: {
        text: 'Walled-Garden Lock-in',
        sub: 'Proprietary communication buses requiring costly proprietary accessories and communication cards',
        positive: false
      }
    }
  ];

  return (
    <section id="why-atpl-section" style={{ padding: '5.5rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            color: '#0071ba',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={14} color="#0071ba" />
            <span>ARCHITECTURAL ADVANTAGE</span>
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
            Why ATPL vs Global Giants (Siemens, Honeywell, Zebra, Rockwell)
          </h2>

          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Enterprise manufacturing demands agile deployment, zero downtime, and certified ERP interoperability. See why leading OEMs migrate from rigid legacy conglomerates to the unified ATPL One™ platform.
          </p>
        </div>

        {/* Comparison Table for Desktop / Card Grid for Mobile */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}>
          
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 1.2fr) minmax(260px, 1.5fr) minmax(220px, 1.2fr) minmax(230px, 1.3fr)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '1.25rem 1.5rem',
            fontWeight: 800,
            fontSize: '0.9rem',
            letterSpacing: '0.02em',
            alignItems: 'center'
          }} className="diff-table-header">
            <div>Evaluation Criterion</div>
            <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38bdf8' }} />
              ATPL Group (Turnkey Industry 4.0)
            </div>
            <div style={{ color: '#94a3b8' }}>Traditional System Integrators</div>
            <div style={{ color: '#94a3b8' }}>Global Giants (Siemens, Honeywell, Zebra, Rockwell)</div>
          </div>

          {/* Table Rows */}
          {comparisonRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(200px, 1.2fr) minmax(260px, 1.5fr) minmax(220px, 1.2fr) minmax(220px, 1.2fr)',
                  padding: '1.4rem 1.5rem',
                  borderBottom: idx < comparisonRows.length - 1 ? '1px solid #f1f5f9' : 'none',
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                  alignItems: 'start'
                }}
                className="diff-table-row"
              >
                {/* Criterion */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0071ba',
                    flexShrink: 0
                  }}>
                    <Icon size={16} />
                  </div>
                  <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{row.criterion}</strong>
                </div>

                {/* ATPL Advantage (Highlighted) */}
                <div style={{
                  backgroundColor: 'rgba(0, 113, 186, 0.05)',
                  border: '1.5px solid rgba(0, 113, 186, 0.25)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  margin: '-0.3rem 0.5rem -0.3rem 0'
                }}>
                  <div className="mobile-diff-label" style={{ display: 'none', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#0071ba', marginBottom: '0.25rem' }}>
                    ATPL Turnkey Solution:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0071ba', fontWeight: 800, fontSize: '0.92rem' }}>
                    <Check size={16} color="#009a44" strokeWidth={3} />
                    <span>{row.atpl.text}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem', lineHeight: 1.45 }}>
                    {row.atpl.sub}
                  </div>
                </div>

                {/* Traditional Integrators */}
                <div style={{ padding: '0 0.5rem' }}>
                  <div className="mobile-diff-label" style={{ display: 'none', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>
                    Traditional Resellers:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: 700, fontSize: '0.88rem' }}>
                    <X size={15} color="#e11d48" strokeWidth={2.5} />
                    <span>{row.traditional.text}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.45 }}>
                    {row.traditional.sub}
                  </div>
                </div>

                {/* Global Giants */}
                <div style={{ padding: '0 0.5rem' }}>
                  <div className="mobile-diff-label" style={{ display: 'none', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#e11d48', marginBottom: '0.25rem' }}>
                    Global Mega-Vendors (Siemens, Honeywell, Zebra, Rockwell):
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: 700, fontSize: '0.88rem' }}>
                    <X size={15} color="#e11d48" strokeWidth={2.5} />
                    <span>{row.megaVendors.text}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.45 }}>
                    {row.megaVendors.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive CSS for Mobile Stacking */}
        <style>{`
          @media (max-width: 900px) {
            .diff-table-header {
              display: none !important;
            }
            .diff-table-row {
              display: flex !important;
              flex-direction: column !important;
              gap: 0.85rem !important;
              padding: 1.25rem !important;
              border-bottom: 2px solid #e2e8f0 !important;
            }
            .mobile-diff-label {
              display: block !important;
            }
          }
        `}</style>

        {/* CTA Banner under Comparison */}
        <div style={{
          marginTop: '2.5rem',
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
              Schedule a Custom Plant Architecture Review
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              Let our senior Industry 4.0 architects benchmark your current plant operations against ATPL benchmarks.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => openDemoModal({ mode: 'engineer', solution: 'Architecture & TCO Review', notes: 'Lead clicked Schedule Custom Plant Review from differentiation section' })}
              style={{
                backgroundColor: '#E85874',
                color: '#ffffff',
                border: 'none',
                padding: '0.8rem 1.6rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 18px rgba(232, 88, 116, 0.45)'
              }}
            >
              <span>Talk to an Engineer</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => openDemoModal({ mode: 'roi', solution: 'ROI Calculator Brief', notes: 'Requested ROI Calculator from differentiation section' })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                padding: '0.8rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Download ROI Calculator
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
