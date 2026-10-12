import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, FileCheck, ShieldAlert, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

export const TermsView = () => {
  const { setCurrentView } = useApp();

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #060b14 0%, #0b1528 50%, #10203b 100%)',
        color: '#ffffff',
        padding: '5rem 1.5rem 4rem 1.5rem',
        position: 'relative',
        borderBottom: '1px solid rgba(0, 240, 255, 0.2)'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '2rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{
              backgroundColor: 'rgba(232, 88, 116, 0.12)',
              color: '#E85874',
              border: '1px solid rgba(232, 88, 116, 0.3)',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              letterSpacing: '0.05em'
            }}>
              ENTERPRISE TERMS
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Effective Date: October 2026</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Terms of Service
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '750px' }}>
            Terms and conditions governing the access, licensing, and deployment of Archery Technocrats Private Limited (ATPL Group) software suites, AIDC hardware integration, and industrial engineering services.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ padding: '3.5rem 1.5rem 0 1.5rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', fontSize: '0.96rem', lineHeight: 1.75, color: '#334155' }}>
          
          {/* Quick Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <Scale size={22} color="#0071ba" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Authorized Licensing</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Enterprise non-exclusive licenses for shopfloor automation and WMS middleware.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <FileCheck size={22} color="#009a44" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Certified Uptime SLAs</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Guaranteed 4-hour on-site dispatch and 99.98% platform operational uptime.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <Building2 size={22} color="#E85874" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Jurisdiction &amp; Law</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Governed strictly under the laws of Tamil Nadu, Republic of India.</p>
            </div>
          </div>

          {/* Section 1 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing <strong style={{ color: '#0f172a' }}>https://atplgroup.com</strong>, downloading software documentation, or executing a master service agreement (MSA) with Archery Technocrats Private Limited, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
          </p>

          {/* Section 2 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            2. Proprietary Software Rights &amp; Intellectual Property
          </h2>
          <p>
            All intellectual property rights, trademarks, patents, software algorithms, neural vision models, and 3D digital twin models associated with Perfect Store™, Perfect Trace™, Perfect Audit™, Perfect PMS™, PerfectEdge MDM™, and Archie AI™ remain the exclusive proprietary property of Archery Technocrats Private Limited (ATPL Group).
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li>No reverse engineering, decompilation, or unauthorized replication of machine vision neural weights or ERP middleware connectors is permitted.</li>
            <li>Client data stored within customer database schemas remains 100% customer property.</li>
          </ul>

          {/* Section 3 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            3. Hardware Warranties &amp; FieldCare™ AMC Services
          </h2>
          <p>
            Industrial hardware supplied by ATPL (including Zebra, Honeywell, Datalogic, TSC printers, and UHF RFID portal antennas) carries manufacturer pass-through warranties supplemented by ATPL FieldCare™ annual maintenance contracts. Replacement parts and hot-swap loaner devices are provided in accordance with agreed service level schedules.
          </p>

          {/* Section 4 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, ATPL Group shall not be liable for indirect, incidental, or consequential damages resulting from unauthorized facility network tampering, third-party ERP downtime, or operator failure to follow designated equipment safety guidelines.
          </p>

          {/* Section 5 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            5. Governing Law &amp; Dispute Resolution
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to binding arbitration seated in Chennai, Tamil Nadu, in accordance with the Arbitration and Conciliation Act, 1996.
          </p>

          {/* Contact Box */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: '#0f172a' }}>Legal Department — Archery Technocrats Private Limited</p>
            <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.9rem' }}>TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai, TN 600113, India</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Email inquiries: <a href="mailto:info@atplgroup.com" style={{ color: '#0071ba', textDecoration: 'none', fontWeight: 600 }}>info@atplgroup.com</a></p>
          </div>

        </div>
      </section>
    </div>
  );
};
