import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Handshake, 
  Phone, 
  Award, 
  Compass, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { ATPL_COMPANY_INFO } from '../../data/stations';

export const AboutOverlay = ({ isOpen, onClose, onSelectStation }) => {
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'certs' | 'traction' | 'clients' | 'partners' | 'contact'

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(2, 16, 28, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        pointerEvents: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(180deg, #07192C 0%, #02101C 100%)',
          border: '1px solid rgba(24, 224, 255, 0.4)',
          borderRadius: '20px',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(24, 224, 255, 0.15)',
          boxSizing: 'border-box',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
        className="factory-hud-scrollbar"
      >
        {/* Header with Title & Close Button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#18E0FF', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
              <Building2 size={16} />
              <span>ARCHERY TECHNOCRATS PRIVATE LIMITED • TARGET PERFECTION</span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              Corporate Overview & <span style={{ color: '#18E0FF' }}>Pitch Deck 2026</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: '0.4rem 0 0 0' }}>
              {ATPL_COMPANY_INFO.overview}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close pitch deck modal"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'about', label: 'Company & Vision', icon: Building2 },
            { id: 'certs', label: 'Certifications', icon: ShieldCheck },
            { id: 'traction', label: 'Growth & Traction', icon: TrendingUp },
            { id: 'clients', label: 'Clients Wall', icon: Users },
            { id: 'partners', label: 'OEM Partners', icon: Handshake },
            { id: 'contact', label: 'Contact & Offices', icon: Phone }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#0070C0' : 'rgba(255, 255, 255, 0.05)',
                  border: isActive ? '1px solid #18E0FF' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  borderRadius: '8px',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} color={isActive ? '#18E0FF' : '#94A3B8'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ABOUT & VISION */}
        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {/* Vision Card */}
              <div style={{ background: 'rgba(0, 112, 192, 0.12)', border: '1px solid rgba(24, 224, 255, 0.3)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#18E0FF', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  OUR VISION
                </div>
                <blockquote style={{ fontSize: '0.92rem', color: '#FFFFFF', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                  {ATPL_COMPANY_INFO.vision}
                </blockquote>
              </div>

              {/* Mission Card */}
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  OUR MISSION
                </div>
                <blockquote style={{ fontSize: '0.92rem', color: '#FFFFFF', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                  {ATPL_COMPANY_INFO.mission}
                </blockquote>
              </div>
            </div>

            {/* Leadership & Experience */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Executive Leadership
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {ATPL_COMPANY_INFO.leadership.map((leader, i) => (
                  <div key={i} style={{ background: 'rgba(10, 24, 46, 0.65)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>{leader.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#18E0FF', fontWeight: 700, marginBottom: '0.4rem' }}>{leader.role}</div>
                    <p style={{ fontSize: '0.76rem', color: '#94A3B8', margin: 0, lineHeight: '1.4' }}>{leader.background}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATIONS */}
        {activeTab === 'certs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {ATPL_COMPANY_INFO.certifications.map((cert, i) => (
              <div key={i} style={{ background: 'rgba(10, 24, 46, 0.75)', border: '1px solid rgba(24, 224, 255, 0.25)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>{cert.name}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {cert.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#18E0FF', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Issuer: {cert.issuer}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                  {cert.scope}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: GROWTH & TRACTION (RECHARTS BAR CHART) */}
        {activeTab === 'traction' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Annual Revenue Progression (INR Crores)
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                  Consistent progress, stronger every year with sustainable B2B recurring growth.
                </p>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#34D399', fontSize: '0.78rem', fontWeight: 800 }}>
                FY 26-27 Target: ₹8.20 Cr (+26%)
              </div>
            </div>

            <div style={{ height: '280px', width: '100%', background: 'rgba(2, 12, 22, 0.6)', borderRadius: '12px', padding: '1rem 0.5rem 0 0', boxSizing: 'border-box' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATPL_COMPANY_INFO.financialTraction}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit=" Cr" />
                  <Tooltip 
                    contentStyle={{ background: '#02101C', border: '1px solid #18E0FF', borderRadius: '8px', color: '#FFFFFF' }}
                    formatter={(val) => [`₹${val} Crores`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {ATPL_COMPANY_INFO.financialTraction.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === ATPL_COMPANY_INFO.financialTraction.length - 1 ? '#10B981' : '#0070C0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENTS WALL */}
        {activeTab === 'clients' && (
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
              Over 250+ enterprise client deployments across automotive, FMCG, retail, heavy engineering, and electronics:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {ATPL_COMPANY_INFO.clients.map((client, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(10, 24, 46, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: '#E2E8F0'
                  }}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: OEM PARTNERS */}
        {activeTab === 'partners' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {ATPL_COMPANY_INFO.oemPartners.map((partner, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(10, 24, 46, 0.75)',
                  border: '1px solid rgba(24, 224, 255, 0.2)',
                  borderRadius: '10px',
                  padding: '1rem'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem' }}>
                  {partner.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#18E0FF', fontWeight: 600 }}>
                  {partner.category}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: CONTACT & OFFICES */}
        {activeTab === 'contact' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(10, 24, 46, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#18E0FF', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Sales Office (TIDEL Park)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#E2E8F0', margin: 0, lineHeight: '1.4' }}>
                {ATPL_COMPANY_INFO.contact.salesOffice}
              </p>
            </div>

            <div style={{ background: 'rgba(10, 24, 46, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#18E0FF', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Headquarters (Registered Office)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#E2E8F0', margin: 0, lineHeight: '1.4' }}>
                {ATPL_COMPANY_INFO.contact.registeredOffice}
              </p>
            </div>

            <div style={{ background: 'rgba(10, 24, 46, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#18E0FF', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Toll Free & Direct Helpdesk
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34D399', marginBottom: '0.2rem' }}>
                {ATPL_COMPANY_INFO.contact.tollFree}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                {ATPL_COMPANY_INFO.contact.emails.join(' | ')}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
