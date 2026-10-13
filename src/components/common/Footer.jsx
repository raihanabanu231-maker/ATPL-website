import React from 'react';
import { useApp } from '../../context/AppContext';
import { AtplLogo } from './AtplLogo';
import { MapPin, Building2, Mail, Phone, ExternalLink } from 'lucide-react';

// Clean SVG Social Icons
const SocialIcons = {
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
};

export const Footer = () => {
  const { setCurrentView } = useApp();

  const handleNav = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: '#0a0f1d',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b',
        padding: '4.5rem 0 0 0',
        position: 'relative',
        zIndex: 10,
        fontSize: '0.88rem'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* =========================================================================
            1. TOP DIRECTORY NAVIGATION COLUMNS
           ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '2.5rem 3rem',
          paddingBottom: '3.5rem'
        }}>
          
          {/* Col 1: Software Products */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              Software Products
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  PerfectEdge MDM (Fleet Kiosk)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Perfect Labeler (Cloud Print)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Perfect Audit (Digital ISO SaaS)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Perfect Store (Enterprise WMS)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Perfect Trace (Packaging GS1)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Perfect Vision AI (Defect QC)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Shopfloor Hardware */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              Shopfloor Hardware
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Fixed UHF RFID Dock Portals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Industrial 2D Barcode Scanners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Thermal Barcode & RFID Printers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hardware')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Rugged Forklift & Handheld Terminals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partners')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Strategic Alliances (Honeywell, Zebra, TSC)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Facilities */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              Company & Hubs
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button onClick={() => handleNav('about')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  About Archery Technocrats
                </button>
              </li>
              <li>
                <address itemScope itemType="https://schema.org/PostalAddress" style={{ fontStyle: 'normal', color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  <div style={{ color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <MapPin size={14} color="#38bdf8" /> TIDEL Park Chennai HQ
                  </div>
                  <span itemProp="streetAddress">G11 Ground Floor, No.4 Canal Bank Rd, Taramani</span>,<br />
                  <span itemProp="addressLocality">Chennai</span>, <span itemProp="addressRegion">Tamil Nadu</span> <span itemProp="postalCode">600113</span>, <span itemProp="addressCountry">India</span>
                </address>
              </li>
              <li>
                <address itemScope itemType="https://schema.org/PostalAddress" style={{ fontStyle: 'normal', color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  <div style={{ color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <Building2 size={14} color="#38bdf8" /> TCE-TBI Madurai R&amp;D
                  </div>
                  <span itemProp="streetAddress">Thiagarajar College of Engineering Campus</span>,<br />
                  <span itemProp="addressLocality">Madurai</span>, <span itemProp="addressRegion">Tamil Nadu</span> <span itemProp="postalCode">625015</span>, <span itemProp="addressCountry">India</span>
                </address>
              </li>
              <li>
                <span style={{ color: '#94a3b8', fontSize: '0.84rem' }}>
                  Regional Hubs: Hosur &amp; Bengaluru
                </span>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.86rem', textAlign: 'left', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  Documentation & Datasheets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Helplines */}
          <div>
            <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              Direct Helplines
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a href="tel:04435537618" itemProp="telephone" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Phone size={14} color="#38bdf8" /> 044 3553 7618 (Chennai Desk)
                </a>
              </li>
              <li>
                <a href="tel:1800120774777" itemProp="telephone" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Phone size={14} color="#38bdf8" /> 1800-120-774777 (Toll Free)
                </a>
              </li>
              <li>
                <a href="mailto:info@atplgroup.com" itemProp="email" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Mail size={14} color="#38bdf8" /> info@atplgroup.com
                </a>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <a
                  href="https://perfectflow360.atplgroup.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#38bdf8',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>Perfectflow 360 Portal</span>
                  <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            2. CENTERED SOCIAL MEDIA ICONS (Zoho Screenshot 2 Style)
           ========================================================================= */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          padding: '2rem 0 1.5rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {[
            { name: 'X', icon: SocialIcons.X, href: 'https://x.com/atplgroup' },
            { name: 'Facebook', icon: SocialIcons.Facebook, href: 'https://facebook.com/atplgroup' },
            { name: 'YouTube', icon: SocialIcons.YouTube, href: 'https://youtube.com/@atplgroup' },
            { name: 'LinkedIn', icon: SocialIcons.LinkedIn, href: 'https://linkedin.com/company/atplgroup' },
            { name: 'Instagram', icon: SocialIcons.Instagram, href: 'https://instagram.com/atplgroup' }
          ].map((soc) => {
            const Icon = soc.icon;
            return (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.backgroundColor = '#0071ba';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        {/* =========================================================================
            3. CENTERED LEGAL LINKS ROW (Zoho Screenshot 2 Style)
           ========================================================================= */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem 1.25rem',
          fontSize: '0.82rem',
          color: '#64748b',
          paddingBottom: '2.5rem'
        }}>
          <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.82rem' }}>
            Contact Us
          </button>
          <span>•</span>
          <span style={{ color: '#94a3b8' }}>Security & 21 CFR Part 11</span>
          <span>•</span>
          <span style={{ color: '#94a3b8' }}>ISO 9001:2015 Compliance</span>
          <span>•</span>
          <button onClick={() => handleNav('terms')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.82rem' }}>
            Terms of Service
          </button>
          <span>•</span>
          <button onClick={() => handleNav('privacy')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.82rem' }}>
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={() => handleNav('login')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0, fontSize: '0.82rem' }}>
            Staff Portal Login
          </button>
        </div>

      </div>

      {/* =========================================================================
          4. BOTTOM DARK COPYRIGHT BAR (Zoho Screenshot 2 Style)
         ========================================================================= */}
      <div style={{
        backgroundColor: '#060a14',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '2rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <AtplLogo size={32} showText={true} lightText={true} onClick={() => handleNav('home')} />
          
          <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
            © 2026 Archery Technocrats Private Limited. All Rights Reserved.<br />
            <span style={{ fontSize: '0.76rem', color: '#475569' }}>
              Headquartered at TIDEL Park Chennai & R&D at TCE-TBI Madurai, Tamil Nadu, India.
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};
