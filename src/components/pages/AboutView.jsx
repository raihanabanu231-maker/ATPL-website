import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  ShieldCheck, 
  Award, 
  Globe, 
  Users, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Target, 
  Cpu, 
  Clock, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  Zap
} from 'lucide-react';
import { ATPL_COMPANY_INFO, ATPL_CLIENTS } from '../../data/initialAdminData';
import { ClientLogo } from '../common/ClientBrandLogos';

export const AboutView = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [activeTopic, setActiveTopic] = useState('all');

  const topics = [
    { id: 'all', label: 'All Company Info' },
    { id: 'vision-mission', label: 'Vision & Mission' },
    { id: 'case-studies', label: 'Case Studies & Impact' },
    { id: 'enterprise-roster', label: 'Enterprise Roster (250+)' },
    { id: 'offices-branches', label: 'Offices & R&D Hubs' }
  ];

  const scrollToSection = (id) => {
    setActiveTopic(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const offices = [
    {
      city: 'Sales Office (Chennai HQ)',
      address: 'TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai, Tamil Nadu - 600113',
      focus: 'Corporate Sales, Solution Architecture & Client Demo Center'
    },
    {
      city: 'Registered Office (Chennai)',
      address: '275/11, S1, 2nd Floor, Gandhi Road, West Tambaram, Chennai, Tamil Nadu - 600045',
      focus: 'Corporate Governance, Finance & Administration'
    },
    {
      city: 'R&D & Innovation Center (Madurai)',
      address: 'Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015',
      focus: 'AI/ML Vision Systems, Embedded IIoT Firmware & Cloud SaaS Labs'
    },
    {
      city: 'Industrial Support Hub (Hosur)',
      address: 'Industrial Area, Hosur & Bangalore Corridor, Tamil Nadu / Karnataka',
      focus: 'Automotive & Heavy Engineering AIDC Integration, 24/7 Field AMC'
    }
  ];

  const caseStudies = [
    {
      sector: 'Automotive Component Manufacturer',
      impact: '2 hrs ➔ 2 mins',
      desc: 'Resource allocation cycle reduced from 2 hours to 2 minutes using ATPL traceability integrated with SAP S/4HANA.'
    },
    {
      sector: 'Rubber Products Manufacturer',
      impact: '+50% Dispatch Accuracy',
      desc: 'Achieved 50% improvement in shipping and dispatch verification accuracy with ATPL automated barcode grading.'
    },
    {
      sector: 'FMCG & Packaging Enterprise',
      impact: '-70% Audit Preparation Time',
      desc: 'Eliminated paper workflows and slashed ISO internal audit prep time by 70% using Perfect Audit™ SaaS.'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(232, 88, 116, 0.1)',
            border: '1px solid rgba(232, 88, 116, 0.35)',
            color: '#E85874',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} color="#E85874" />
            <span>ARCHERY TECHNOCRATS PRIVATE LIMITED</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
            Target Perfection. <span className="gradient-text">Powering Digital Transformation.</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2.25rem' }}>
            Founded by industry veterans with 35+ years of combined experience in AIDC, IIoT, and enterprise software. Operating 6 branches across India with 7+ years of consistent, bootstrapped corporate growth.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => scrollToSection(t.id)}
                style={{
                  backgroundColor: activeTopic === t.id ? '#E85874' : 'rgba(255, 255, 255, 0.05)',
                  border: activeTopic === t.id ? '2px solid #E85874' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeTopic === t.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTopic === t.id ? '0 4px 15px rgba(232, 88, 116, 0.45)' : 'none'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vision & Mission Grid (Official from Pitch Deck) */}
        <div id="vision-mission" className="grid-2" style={{ gap: '2rem', marginBottom: '4rem', marginTop: '2.5rem', scrollMarginTop: '6rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--cyan-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={22} color="var(--cyan-primary)" />
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.35rem', margin: 0 }}>Our Vision</h3>
            </div>
            <blockquote style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
              "To be the company that best understands and satisfies the product, service and solution needs of all customers - Globally."
            </blockquote>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={22} color="#10b981" />
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.35rem', margin: 0 }}>Our Mission</h3>
            </div>
            <blockquote style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
              "To discover, develop, and deliver innovative technology oriented solutions that help customers to prevail over their problems and improve their productivity, security and infrastructure."
            </blockquote>
          </div>
        </div>

        {/* Corporate Governance & Institutional Credentials */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>ENTERPRISE GOVERNANCE</div>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
              Institutional Governance & Engineering Excellence
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              35+ years of combined industrial leadership, certified quality frameworks, and deep R&D incubation.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.25rem', border: '1px solid rgba(0, 113, 186, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(0, 113, 186, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} color="#00f0ff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Executive Technical Steering</h3>
                  <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700 }}>
                    15+ Years Domain Leadership in AIDC & Industrial IT
                  </div>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Guided by senior mechanical engineering, enterprise software architecture, and VLSI systems leadership. ATPL provides executive steering and end-to-end technological stewardship for complex smart factory and warehouse deployments worldwide.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2.25rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} color="#10b981" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>Operations & Quality Compliance</h3>
                  <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
                    ISO 9001:2015 & DPIIT Certified Frameworks
                  </div>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Corporate operations, finance governance, and strict quality protocols compliant with BMQR ISO 9001:2015, US-FDA 21 CFR Part 11 electronic audit trails, and DPIIT Section 80-IAC central government recognitions.
              </p>
            </div>
          </div>
        </div>

        {/* Real Customer Case Studies */}
        <div id="case-studies" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>PROVEN BUSINESS IMPACT</div>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
              Measurable Client Outcomes
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                  {cs.impact}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '0.75rem' }}>{cs.sector}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{cs.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Clients Showcase (From Pitch Deck) */}
        <div id="enterprise-roster" className="glass-card" style={{ padding: '3.5rem 2.5rem', marginBottom: '4rem', background: 'rgba(10, 20, 38, 0.9)', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>ENTERPRISE ROSTER</div>
            <h3 style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Trusted by 250+ Industry Leaders
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Powering zero-defect operations across automotive, steel, FMCG, healthcare, defense, and electronics manufacturing conglomerates.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {ATPL_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '0.85rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '62px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 113, 186, 0.4)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
                title={client}
              >
                <ClientLogo clientName={client} height={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Pan-India Presence */}
        <div id="offices-branches" className="glass-card" style={{ padding: '3rem', background: 'rgba(8, 17, 34, 0.85)', marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>6 BRANCHES NATIONWIDE</div>
            <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Offices & R&D Facilities
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Operating from TIDEL Park Chennai, West Tambaram, TCE-TBI Madurai, and key manufacturing corridors.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1.75rem' }}>
            {offices.map((office, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <MapPin size={18} color="var(--cyan-primary)" />
                  <h4 style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0 }}>{office.city}</h4>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{office.address}</p>
                <div style={{ fontSize: '0.78rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
                  Focus: {office.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary btn-lg"
          >
            <span>Connect with ATPL Engineering Desk ➔</span>
          </button>
        </div>

      </div>
    </div>
  );
};
