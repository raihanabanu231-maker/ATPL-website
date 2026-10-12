import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const PrivacyView = () => {
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
              backgroundColor: 'rgba(0, 240, 255, 0.12)',
              color: '#00f0ff',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              letterSpacing: '0.05em'
            }}>
              LEGAL &amp; COMPLIANCE
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Effective Date: October 2026</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '750px' }}>
            Archery Technocrats Private Limited (ATPL Group) is committed to protecting the privacy, security, and integrity of personal and enterprise client data across all our platforms, WMS software, IoT hardware, and 3D digital twin services.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ padding: '3.5rem 1.5rem 0 1.5rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', fontSize: '0.96rem', lineHeight: 1.75, color: '#334155' }}>
          
          {/* Trust Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <Lock size={22} color="#0071ba" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Enterprise Security</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>ISO 9001:2015 and 21 CFR Part 11 compliant data management architectures.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <ShieldCheck size={22} color="#009a44" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Zero Third-Party Sale</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>We never monetize, rent, or trade client telemetry or personal contact information.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <Eye size={22} color="#E85874" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Complete Transparency</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Full data subject rights under DPDP Act 2023 (India) and international standards.</p>
            </div>
          </div>

          {/* Section 1 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            1. Information We Collect
          </h2>
          <p>
            When you visit <strong style={{ color: '#0f172a' }}>https://atplgroup.com</strong>, interact with our Archie AI assistant, submit an RFQ, or access our proprietary enterprise software (Perfect Store™, Perfect Trace™, Perfect Audit™), we collect the following categories of information:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Contact Details:</strong> Name, work email address, telephone number, job title, and organization name when submitted via demo request forms.</li>
            <li><strong>Technical &amp; Telemetry Data:</strong> IP address, device operating system, browser specifications, diagnostic logs, and session interactions with our 3D Digital Twin factory simulator.</li>
            <li><strong>Enterprise Facility Details:</strong> Information voluntarily provided for solution sizing, such as warehouse square footage, SKU counts, and conveyor speed specifications.</li>
          </ul>

          {/* Section 2 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            2. How We Use Your Information
          </h2>
          <p>ATPL Group processes collected data solely for legitimate business purposes:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li>To respond to RFQs, schedule on-site engineering surveys, and deliver customized proof-of-concept (PoC) software demonstrations.</li>
            <li>To provision, maintain, and support enterprise subscriptions, hardware firmware updates, and 24/7 FieldCare™ SLA maintenance contracts.</li>
            <li>To enhance platform performance, verify compliance with ISO 9001:2015 quality procedures, and prevent unauthorized portal access.</li>
          </ul>

          {/* Section 3 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            3. Data Protection &amp; Confidentiality
          </h2>
          <p>
            All industrial data, GS1 serial registers, and client database connections are protected by end-to-end TLS 1.3 encryption in transit and AES-256 encryption at rest. Enterprise production credentials and SAP/Oracle database sync keys are isolated in hardened key vaults with restricted role-based access control (RBAC).
          </p>

          {/* Section 4 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            4. Cookies and Analytical Tracking
          </h2>
          <p>
            Our website uses strictly necessary cookies for session persistence, language localization, and CSRF protection. We do not employ third-party advertising trackers. You can disable non-essential cookies via your browser settings at any time.
          </p>

          {/* Section 5 */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
            5. Contact Information &amp; Data Officer
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise data access, correction, or deletion requests, please contact our Legal &amp; Compliance team:
          </p>
          
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: '#0f172a' }}>Archery Technocrats Private Limited (ATPL Group)</p>
            <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.9rem' }}><strong>Address:</strong> TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai, Tamil Nadu 600113, India</p>
            <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.9rem' }}><strong>Email:</strong> <a href="mailto:info@atplgroup.com" style={{ color: '#0071ba', textDecoration: 'none', fontWeight: 600 }}>info@atplgroup.com</a> | <a href="mailto:sales@atplgroup.com" style={{ color: '#0071ba', textDecoration: 'none', fontWeight: 600 }}>sales@atplgroup.com</a></p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Telephone:</strong> +91 44 2254 0000 / +91 63808 59963</p>
          </div>

        </div>
      </section>
    </div>
  );
};
