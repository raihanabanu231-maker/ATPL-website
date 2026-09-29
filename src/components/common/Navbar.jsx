import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AtplLogo } from './AtplLogo';
import { 
  Boxes, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  LayoutDashboard, 
  Menu, 
  X,
  Search,
  Globe,
  ChevronDown,
  ArrowRight,
  Radio,
  Eye,
  FileCheck,
  Headphones,
  Printer,
  Building2,
  CheckCircle2,
  PlusCircle,
  ExternalLink,
  Award,
  Users,
  Handshake,
  BookOpen,
  Calculator,
  Smartphone,
  Zap,
  Barcode
} from 'lucide-react';

export const Navbar = ({ onOpenSearch }) => {
  const { currentView, setCurrentView, openDemoModal, authSession } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setLanguageOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages = ['English', 'हिन्दी (Hindi)', 'தமிழ் (Tamil)', 'Deutsch', '日本語'];

  return (
    <>
      {/* Top Banner Alert Strip */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.35rem 1rem',
        fontSize: '0.78rem',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1002
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(232, 88, 116, 0.12)',
              color: '#E85874',
              border: '1px solid rgba(232, 88, 116, 0.3)',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '0.12rem 0.5rem',
              borderRadius: '999px',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              ANNOUNCEMENT
            </span>
            <span style={{ color: '#334155', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              🚀 Live 3D Digital Twin Simulator is active!
            </span>
            <button
              onClick={() => handleNavClick('factory-3d')}
              style={{
                background: 'none',
                border: 'none',
                color: '#E85874',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.76rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                padding: 0,
                flexShrink: 0
              }}
            >
              <span>Explore</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} className="top-banner-right">
            <style>{`@media(min-width: 768px){ .top-banner-right { display: flex !important; } }`}</style>
            <span style={{ color: '#64748b' }}>ISO 9001:2015 & GS1 Certified</span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <a
              href="https://wa.me/916380859963?text=Hello%20ATPL%20Team%2C%20I%20would%20like%20to%20connect%20with%20your%20sales%20and%20engineering%20team."
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0071ba', fontWeight: 700, textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>💬 WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Header */}
      <header 
        ref={dropdownRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #f1f5f9',
          transition: 'all 0.2s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          
          {/* Brand Logo with exact ATPL Bow & Arrow + #E85874 Coral Arc */}
          <AtplLogo 
            size={40} 
            showText={true} 
            onClick={() => handleNavClick('home')} 
          />

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '0.2rem' }} className="atpl-desktop-nav">
            <style>{`
              @media (min-width: 860px) {
                .atpl-desktop-nav { display: flex !important; }
                .mobile-toggle-btn { display: none !important; }
              }
            `}</style>

            {/* 1. Hardware Dropdown & Direct Link */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleNavClick('hardware')}
                onMouseEnter={() => setActiveDropdown('hardware')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'hardware' || currentView === 'hardware' ? '#0071ba' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Hardware</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'hardware' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {activeDropdown === 'hardware' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '640px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                    padding: '1.5rem',
                    zIndex: 1050,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                      AIDC, RFID & SCANNING
                    </div>
                    
                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Radio size={20} color="#0071ba" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Fixed UHF RFID Portals</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>High-throughput dock gate auto scanners</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Zap size={20} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Industrial 2D & DPM Scanners</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Fixed mount & rugged handheld imagers</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Smartphone size={20} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Rugged Mobile Computers</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Android warehouse PDAs & vehicle mounts</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                      PRINTERS & AUTOMATION
                    </div>

                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Printer size={20} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Industrial Barcode Printers</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>600 DPI & RFID print-and-apply engines</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Cpu size={20} color="#E85874" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Robotics & Sorting Gates</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Articulated arms & pneumatic diverters</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('hardware')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Eye size={20} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Machine Vision Sensors</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Telecentric lenses & high-speed cameras</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Software Dropdown & Direct Link */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleNavClick('software')}
                onMouseEnter={() => setActiveDropdown('software')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'software' || currentView === 'software' ? '#E85874' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Software</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'software' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {activeDropdown === 'software' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '640px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                    padding: '1.5rem',
                    zIndex: 1050,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                      SUPPLY CHAIN & PRODUCTION
                    </div>

                    <div 
                      onClick={() => handleNavClick('software')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Boxes size={20} color="#0071ba" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Perfect Store™ (WMS)</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Warehouse management & 3D bin slotting</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('software')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <FileCheck size={20} color="#009a44" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Perfect Trace™</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>GS1 Item-to-pallet aggregation & serialization</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('software')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Layers size={20} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Perfect PMS™ (Production)</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Shopfloor OEE, WIP & line balancing</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                      AI QUALITY & CONNECTIVITY
                    </div>

                    <div 
                      onClick={() => handleNavClick('software')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <Eye size={20} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Perfect AI Vision™</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Deep learning Pass/Fail defect QC</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('software')}
                      style={{ padding: '0.55rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.75rem' }}
                      className="dropdown-hover-item"
                    >
                      <ShieldCheck size={20} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Perfect Audit™</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Digital CAPA & paperless compliance</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleNavClick('factory-3d')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, rgba(232, 88, 116, 0.08) 0%, #fff7ed 100%)',
                        border: '1px solid rgba(232, 88, 116, 0.25)',
                        display: 'flex',
                        gap: '0.75rem'
                      }}
                    >
                      <Sparkles size={20} color="#E85874" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#E85874' }}>✨ 3D Digital Twin</div>
                        <div style={{ fontSize: '0.75rem', color: '#9f1239' }}>Interactive 12-station smart factory tour</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Customers Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleNavClick('about')}
                onMouseEnter={() => setActiveDropdown('customers')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'customers' ? '#E85874' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Customers</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'customers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {activeDropdown === 'customers' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '380px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                    padding: '1.25rem',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div 
                    onClick={() => handleNavClick('about')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Users size={16} color="#0071ba" />
                      <span>Enterprise Customer Stories</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>500+ successful industrial plant deployments</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('about')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Award size={16} color="#009a44" />
                      <span>ROI & 99.98% Accuracy Impact</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Real benchmark metrics across global facilities</div>
                  </div>

                  <div 
                    onClick={() => openDemoModal({ solution: 'Customer Case Studies Request', notes: 'Request for enterprise case studies' })}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer', background: 'rgba(232, 88, 116, 0.06)', border: '1px solid rgba(232, 88, 116, 0.25)' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#E85874' }}>Request Industry Case Studies ➔</div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Partners Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleNavClick('partners')}
                onMouseEnter={() => setActiveDropdown('partners')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'partners' || currentView === 'partners' ? '#E85874' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Partners</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'partners' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {activeDropdown === 'partners' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '380px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                    padding: '1.25rem',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div 
                    onClick={() => handleNavClick('partners')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Handshake size={16} color="#009a44" />
                      <span>GS1 Global Certified Partner</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Authorized GS1 barcode & RFID serialization partner</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('partners')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Radio size={16} color="#fbb03b" />
                      <span>Hardware OEM Partners</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Zebra, Honeywell, Datalogic & Impinj alliance</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('partners')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={16} color="#0071ba" />
                      <span>ERP & Cloud Alliances</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>SAP S/4HANA, Oracle Cloud & Microsoft Dynamics</div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Resources Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => handleNavClick('resources')}
                onMouseEnter={() => setActiveDropdown('resources')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'resources' || currentView === 'resources' ? '#E85874' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px'
                }}
              >
                <span>Resources</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'resources' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {activeDropdown === 'resources' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    width: '340px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                    padding: '1rem',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div 
                    onClick={() => handleNavClick('resources')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0071ba', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BookOpen size={15} />
                      <span>Technical Whitepapers & Guides</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Download product datasheets & standards briefs</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('factory-3d')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#E85874', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Sparkles size={15} />
                      <span>3D Digital Twin Simulator</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Live interactive virtual plant tour</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('services')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Headphones size={15} color="#0d9488" />
                      <span>AMC & Maintenance SLAs</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Guaranteed response tiers & vaults</div>
                  </div>

                  <div 
                    onClick={() => handleNavClick('contact')}
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', cursor: 'pointer' }}
                    className="dropdown-hover-item"
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Building2 size={15} color="#0071ba" />
                      <span>Contact & Helpdesk</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Reach engineering teams directly</div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Utilities (Zoho Search, Language, Sign In, Sign Up) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                cursor: 'pointer',
                padding: '0.45rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#475569';
              }}
              title="Search products and docs (Ctrl+K)"
            >
              <Search size={19} />
            </button>

            {/* Language Selector */}
            <div style={{ position: 'relative', display: 'none' }} className="lang-selector-box">
              <style>{`@media(min-width: 640px){ .lang-selector-box { display: block !important; } }`}</style>
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#475569',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.5rem',
                  borderRadius: '6px'
                }}
              >
                <Globe size={16} />
                <span>{selectedLang.split(' ')[0]}</span>
                <ChevronDown size={13} />
              </button>

              {languageOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.06)',
                  borderRadius: '10px',
                  padding: '0.4rem',
                  zIndex: 1060,
                  width: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}>
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLanguageOpen(false);
                      }}
                      style={{
                        background: selectedLang === lang ? '#f8fafc' : 'transparent',
                        border: 'none',
                        color: selectedLang === lang ? '#e42528' : '#334155',
                        fontWeight: selectedLang === lang ? 700 : 500,
                        fontSize: '0.84rem',
                        textAlign: 'left',
                        padding: '0.45rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign In Link (Desktop Only) */}
            <button
              onClick={() => handleNavClick(authSession ? 'admin' : 'login')}
              className="desktop-only-action"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0071ba',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: 'pointer',
                padding: '0.45rem 0.6rem',
                borderRadius: '6px'
              }}
            >
              {authSession ? 'Admin CMS' : 'Portal Login'}
            </button>

            {/* ATPL Request Demo Button (Desktop Only) */}
            <button
              onClick={() => openDemoModal({ solution: 'Enterprise Suite Demo', notes: 'Lead initiated from header Request Demo button' })}
              className="desktop-only-action"
              style={{
                backgroundColor: '#0071ba',
                border: 'none',
                color: '#ffffff',
                padding: '0.55rem 1.25rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 8px rgba(0, 113, 186, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005a96';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 113, 186, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 113, 186, 0.25)';
              }}
            >
              <span>Request Demo</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile Slide Drawer Menu with Accordions for all 5 categories */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {/* Hardware Accordion */}
            <div>
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'hardware' ? null : 'hardware')}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>Hardware</span>
                <ChevronDown size={16} style={{ transform: mobileExpandedSection === 'hardware' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>
              {mobileExpandedSection === 'hardware' && (
                <div style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button onClick={() => handleNavClick('hardware')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem' }}>• Fixed UHF RFID Portals & Antennas</button>
                  <button onClick={() => handleNavClick('hardware')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#f59e0b', fontWeight: 600, fontSize: '0.9rem' }}>• Industrial 2D & DPM Barcode Scanners</button>
                  <button onClick={() => handleNavClick('hardware')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>• Industrial Barcode & RFID Printers</button>
                  <button onClick={() => handleNavClick('hardware')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#0284c7', fontWeight: 600, fontSize: '0.9rem' }}>• Rugged Handheld Computers & PDAs</button>
                  <button onClick={() => handleNavClick('hardware')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem' }}>• Robotics, Sorting & Conveyor Systems</button>
                </div>
              )}
            </div>

            {/* Software Accordion */}
            <div>
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'software' ? null : 'software')}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>Software</span>
                <ChevronDown size={16} style={{ transform: mobileExpandedSection === 'software' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>
              {mobileExpandedSection === 'software' && (
                <div style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button onClick={() => handleNavClick('software')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem' }}>• Perfect Store™ (Warehouse WMS)</button>
                  <button onClick={() => handleNavClick('software')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#009a44', fontWeight: 600, fontSize: '0.9rem' }}>• Perfect Trace™ (Serialization & Aggregation)</button>
                  <button onClick={() => handleNavClick('software')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#8b5cf6', fontWeight: 600, fontSize: '0.9rem' }}>• Perfect AI Vision™ (Defect Inspection)</button>
                  <button onClick={() => handleNavClick('software')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#f59e0b', fontWeight: 600, fontSize: '0.9rem' }}>• Perfect PMS™ (Production Management)</button>
                  <button onClick={() => handleNavClick('software')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>• Perfect Audit™ (Digital Compliance)</button>
                  <button onClick={() => handleNavClick('factory-3d')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#E85874', fontWeight: 700, fontSize: '0.9rem' }}>• ✨ 3D Digital Twin Simulator</button>
                </div>
              )}
            </div>

            {/* Customers */}
            <button
              onClick={() => handleNavClick('about')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontSize: '0.96rem',
                fontWeight: 700,
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              Customers & Case Studies
            </button>

            {/* Partners */}
            <button
              onClick={() => handleNavClick('partners')}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontSize: '0.96rem',
                fontWeight: 700,
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              Partners (GS1, Zebra, Honeywell, SAP)
            </button>

            {/* Resources */}
            <div>
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'resources' ? null : 'resources')}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>Resources & Downloads</span>
                <ChevronDown size={16} style={{ transform: mobileExpandedSection === 'resources' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>
              {mobileExpandedSection === 'resources' && (
                <div style={{ padding: '0.5rem 0.5rem 0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button onClick={() => handleNavClick('resources')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem' }}>• 📄 Technical Whitepapers & Datasheets</button>
                  <button onClick={() => handleNavClick('resources')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#009a44', fontWeight: 600, fontSize: '0.9rem' }}>• 📊 ATPL Capability Pitch Deck (2026)</button>
                  <button onClick={() => handleNavClick('factory-3d')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem' }}>• ✨ 3D Virtual Plant Tour</button>
                  <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#334155', fontSize: '0.9rem' }}>• 24/7 AMC Maintenance Contracts</button>
                  <button onClick={() => handleNavClick('contact')} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.4rem', color: '#334155', fontSize: '0.9rem' }}>• Helpdesk & Contact Sales</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick(authSession ? 'admin' : 'login');
                }}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#0071ba',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {authSession ? 'Open Admin CMS' : 'Portal Login'}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDemoModal({ solution: 'Enterprise Suite Demo', notes: 'Mobile drawer Request Demo click' });
                }}
                style={{
                  backgroundColor: '#0071ba',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 113, 186, 0.35)',
                  textAlign: 'center'
                }}
              >
                Request Live Demo ➔
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
