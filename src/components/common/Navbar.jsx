import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AtplLogo } from './AtplLogo';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { GsapDropdown } from './GsapDropdown';
import { MegaMenu } from './MegaMenu';
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
  FileText,
  Calculator,
  Smartphone,
  Zap,
  Barcode,
  Bot,
  Car,
  RotateCw,
  Activity,
  Maximize2
} from 'lucide-react';

export const ATPL_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'zh-CN', name: 'Chinese', native: '中文 (Simplified)', flag: '🇨🇳' }
];

export const Navbar = ({ onOpenSearch }) => {
  const { currentView, setCurrentView, openDemoModal, authSession, openCoPilot } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Smooth hover intent handlers for GSAP dropdowns
  const handleDropdownEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setLanguageOpen(false);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Restore saved language preference on mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('atpl_selected_lang_name');
      if (savedName) {
        setSelectedLang(savedName);
      }
    } catch (e) { }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click & Escape key closes mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLanguageOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (viewId) => {
    if (viewId === 'why-atpl') {
      setCurrentView('why-atpl');
      try {
        window.history.pushState({ view: 'why-atpl' }, '', '/why-atpl');
      } catch (e) {}
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      setLanguageOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (viewId === 'insights') {
      setCurrentView('insights');
      try {
        window.history.pushState({ view: 'insights' }, '', '/insights');
      } catch (e) {}
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      setLanguageOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView(viewId);
    try {
      if (viewId === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', `#${viewId}`);
      }
    } catch (e) { }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setLanguageOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (langObj) => {
    setSelectedLang(langObj.native);
    setLanguageOpen(false);

    try {
      localStorage.setItem('atpl_selected_lang_code', langObj.code);
      localStorage.setItem('atpl_selected_lang_name', langObj.native);

      // Set cookie for Google Translate
      const host = window.location.hostname;
      document.cookie = `googtrans=/en/${langObj.code}; path=/;`;
      if (host && host !== 'localhost') {
        document.cookie = `googtrans=/en/${langObj.code}; domain=.${host}; path=/;`;
      }

      // Trigger translate combo box
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langObj.code;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.warn('Language change error:', e);
    }
  };

  return (
    <>
      {/* Top Banner Alert Strip */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.35rem 0.75rem',
        fontSize: '0.78rem',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1002,
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '100%', padding: '0 0.25rem', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minWidth: 0, gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, flex: 1 }}>
              <span
                className="announcement-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 113, 186, 0.1)',
                  color: '#0071ba',
                  border: '1px solid rgba(0, 113, 186, 0.25)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '0.12rem 0.45rem',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                  flexShrink: 0
                }}
              >
                <span className="announcement-badge-desktop">ATPL GROUP</span>
                <span className="announcement-badge-mobile">ATPL</span>
              </span>
              <span
                className="announcement-text-content"
                style={{
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  lineHeight: 1.2
                }}
              >
                <span>Enterprise Shopfloor Automation, AIDC &amp; Barcode Solutions</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>

              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  background: 'rgba(0, 113, 186, 0.08)',
                  border: '1px solid rgba(0, 113, 186, 0.3)',
                  borderRadius: '5px',
                  color: '#0071ba',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.73rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.14rem 0.5rem',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0071ba';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.08)';
                  e.currentTarget.style.color = '#0071ba';
                }}
                title="Open ATPL Control Center & SEO Manager"
              >
                <span>⚙️ Admin Panel</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'none', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }} className="top-banner-right">
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
          transition: 'all 0.2s ease',
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>

          {/* Brand Logo with exact ATPL Bow & Arrow + #E85874 Coral Arc */}
          <AtplLogo
            size={40}
            showText={true}
            onClick={() => handleNavClick('home')}
          />

          {/* Responsive Header Navigation Breakpoint (1024px) */}
          <style>{`
            @media (max-width: 1024px) {
              .atpl-desktop-nav { display: none !important; }
              .desktop-only-action { display: none !important; }
              .mobile-toggle-btn { display: flex !important; }
            }
            @media (min-width: 1025px) {
              .atpl-desktop-nav { display: flex !important; }
              .desktop-only-action { display: flex !important; }
              .mobile-toggle-btn { display: none !important; }
            }
            .mega-nav-item-wrap:hover .mega-nav-underline {
              transform: scaleX(1) !important;
            }
          `}</style>
          <nav className="atpl-desktop-nav" style={{ alignItems: 'center', gap: '0.2rem' }}>

            {/* 1. Hardware Dropdown Trigger */}
            <div
              className="mega-nav-item-wrap"
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('hardware')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'hardware') {
                    handleNavClick('hardware');
                  } else {
                    handleDropdownEnter('hardware');
                  }
                }}
                className="mega-nav-btn"
                aria-expanded={activeDropdown === 'hardware'}
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
                  position: 'relative',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Hardware</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'hardware' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <span
                  className="mega-nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '0.75rem',
                    right: '0.75rem',
                    height: '2px',
                    backgroundColor: '#0071ba',
                    transformOrigin: 'left',
                    transform: activeDropdown === 'hardware' || currentView === 'hardware' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* 2. Software Dropdown Trigger */}
            <div
              className="mega-nav-item-wrap"
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('software')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'software') {
                    handleNavClick('software');
                  } else {
                    handleDropdownEnter('software');
                  }
                }}
                className="mega-nav-btn"
                aria-expanded={activeDropdown === 'software'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'software' || currentView === 'software' ? '#0071ba' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  position: 'relative',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Software</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'software' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <span
                  className="mega-nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '0.75rem',
                    right: '0.75rem',
                    height: '2px',
                    backgroundColor: '#0071ba',
                    transformOrigin: 'left',
                    transform: activeDropdown === 'software' || currentView === 'software' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* 3. Customers Dropdown Trigger */}
            <div
              className="mega-nav-item-wrap"
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('customers')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'customers') {
                    handleNavClick('customers');
                  } else {
                    handleDropdownEnter('customers');
                  }
                }}
                className="mega-nav-btn"
                aria-expanded={activeDropdown === 'customers'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'customers' || currentView === 'customers' ? '#0071ba' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  position: 'relative',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Customers</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'customers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <span
                  className="mega-nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '0.75rem',
                    right: '0.75rem',
                    height: '2px',
                    backgroundColor: '#0071ba',
                    transformOrigin: 'left',
                    transform: activeDropdown === 'customers' || currentView === 'customers' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* 4. Partners Dropdown Trigger */}
            <div
              className="mega-nav-item-wrap"
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('partners')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'partners') {
                    handleNavClick('partners');
                  } else {
                    handleDropdownEnter('partners');
                  }
                }}
                className="mega-nav-btn"
                aria-expanded={activeDropdown === 'partners'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeDropdown === 'partners' || currentView === 'partners' ? '#0071ba' : '#334155',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '6px',
                  position: 'relative',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Partners</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'partners' ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <span
                  className="mega-nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '0.75rem',
                    right: '0.75rem',
                    height: '2px',
                    backgroundColor: '#0071ba',
                    transformOrigin: 'left',
                    transform: activeDropdown === 'partners' || currentView === 'partners' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* Direct Why ATPL Link */}
            <button
              onClick={() => handleNavClick('why-atpl')}
              style={{
                background: currentView === 'why-atpl' 
                  ? 'rgba(0, 113, 186, 0.16)' 
                  : 'rgba(0, 113, 186, 0.08)',
                border: currentView === 'why-atpl'
                  ? '1.5px solid #0071ba'
                  : '1px solid rgba(0, 113, 186, 0.3)',
                color: '#0071ba',
                padding: '0.45rem 0.75rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                boxShadow: currentView === 'why-atpl' ? '0 0 10px rgba(0, 113, 186, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 113, 186, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentView === 'why-atpl' ? 'rgba(0, 113, 186, 0.16)' : 'rgba(0, 113, 186, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title="Why Industry Leaders Choose Archery Technocrats"
            >
              <Sparkles size={14} color="#0071ba" />
              <span>Why ATPL</span>
            </button>
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
                onClick={() => {
                  setActiveDropdown(null);
                  setLanguageOpen(!languageOpen);
                }}
                aria-label="Change Website Language"
                aria-expanded={languageOpen}
                style={{
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  color: '#334155',
                  cursor: 'pointer',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0071ba';
                  e.currentTarget.style.color = '#0071ba';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#334155';
                }}
                title="Change Website Language (Google Translate)"
              >
                <Globe size={15} color="#0071ba" />
                <span>{selectedLang.split(' ')[0]}</span>
                <ChevronDown size={13} style={{ transform: languageOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              <GsapDropdown
                isOpen={languageOpen}
                width="220px"
                align="right"
                style={{
                  maxHeight: '340px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  padding: '0.6rem 0.5rem'
                }}
              >
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94a3b8',
                  padding: '0.3rem 0.5rem 0.2rem 0.5rem',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  Select Language / மொழி
                </div>
                {ATPL_LANGUAGES.map(lang => {
                  const isSelected = selectedLang === lang.native || selectedLang === lang.name;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className="dropdown-hover-item"
                      style={{
                        background: isSelected ? 'rgba(0, 113, 186, 0.08)' : 'transparent',
                        border: 'none',
                        color: isSelected ? '#0071ba' : '#334155',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.84rem',
                        textAlign: 'left',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                        <span>{lang.native}</span>
                      </span>
                      {isSelected && <span style={{ color: '#0071ba', fontSize: '0.8rem' }}>✓</span>}
                    </button>
                  );
                })}
              </GsapDropdown>
            </div>


            {/* Direct Admin Control Center Button (Desktop) */}
            <button
              onClick={() => handleNavClick('admin')}
              className="desktop-only-action"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                border: '1.5px solid #cbd5e1',
                color: '#1e293b',
                fontWeight: 700,
                fontSize: '0.86rem',
                padding: '0.45rem 0.8rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-display)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#0071ba';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.color = '#1e293b';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              title="Open Admin Control Center & SEO Manager"
            >
              <LayoutDashboard size={15} />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Button (Strict 44x44px minimum tap target) */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                padding: 0,
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                transition: 'background 0.15s ease'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>

        {/* Reusable Compact Mega Menu Panel */}
        <MegaMenu
          menuKey={activeDropdown}
          isOpen={Boolean(activeDropdown && ['hardware', 'software', 'customers', 'partners'].includes(activeDropdown))}
          onClose={() => setActiveDropdown(null)}
          onNavigate={(view, anchor) => {
            handleNavClick(view);
            if (anchor) {
              setTimeout(() => {
                const el = document.getElementById(anchor);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }
          }}
          onOpenDemo={openDemoModal}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
            }
          }}
          onMouseLeave={handleDropdownLeave}
        />

        {/* Mobile Clean Full-Screen Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 99999,
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            {/* Drawer Top Bar with Brand Logo and 44x44px Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              flexShrink: 0
            }}>
              <AtplLogo
                size={34}
                showText={true}
                onClick={() => {
                  handleNavClick('home');
                  setMobileMenuOpen(false);
                }}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  width: '44px',
                  height: '44px',
                  minWidth: '44px',
                  minHeight: '44px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '1rem 1.25rem 3.5rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              {/* 1. Hardware Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'hardware' ? null : 'hardware')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>📦</span>
                    <span>Hardware Solutions</span>
                  </span>
                  <ChevronDown size={18} style={{ transform: mobileExpandedSection === 'hardware' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {mobileExpandedSection === 'hardware' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Fixed UHF RFID Portals & Antennas</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial 2D & DPM Barcode Scanners</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial Barcode & RFID Printers</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Rugged Handheld Computers & PDAs</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Automated Sorting & Conveyor Systems</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'rgba(0, 113, 186, 0.08)', borderRadius: '6px', border: 'none', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore All Hardware Catalog</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 2. Software Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'software' ? null : 'software')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>💻</span>
                    <span>Software Suites (ATPL One™)</span>
                  </span>
                  <ChevronDown size={18} style={{ transform: mobileExpandedSection === 'software' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {mobileExpandedSection === 'software' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(56, 189, 248, 0.12)', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.35)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#0071ba', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ PerfectEdge MDM™ (Priority #1)</span>
                      <span style={{ backgroundColor: '#dc2626', color: '#fff', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>FLEET</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(245, 158, 11, 0.12)', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.35)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#b45309', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ Perfect Labeler™ (Priority #2)</span>
                      <span style={{ backgroundColor: '#f59e0b', color: '#0f172a', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>AI CLOUD</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Flow 360™ (CRM & Ops)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Store™ (Warehouse WMS)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Trace™ (Serialization & Aggregation)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect AI Vision™ (Defect Inspection)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect PMS™ (Production Management)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Audit™ (Digital Compliance)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(0, 113, 186, 0.08)', borderRadius: '6px', border: 'none', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore All Software Suites</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Customers & Case Studies Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'customers' ? null : 'customers')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>👥</span>
                    <span>Customers & Case Studies</span>
                  </span>
                  <ChevronDown size={18} style={{ transform: mobileExpandedSection === 'customers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {mobileExpandedSection === 'customers' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Automotive & EV (Apollo, Ola, Bosch)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Heavy Engg & Defense (L&T, ABB, BEL)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>FMCG & Packaging (HUL, Hatsun, ITC)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'rgba(0, 113, 186, 0.08)', borderRadius: '6px', border: 'none', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore 200+ Enterprise Clients</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Partners & OEM Alliances Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'partners' ? null : 'partners')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>🤝</span>
                    <span>Partners & OEM Alliances</span>
                  </span>
                  <ChevronDown size={18} style={{ transform: mobileExpandedSection === 'partners' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {mobileExpandedSection === 'partners' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Hardware OEMs (Honeywell, Zebra, TSC, Impinj)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#E85874', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>ERP Cloud Alliances (SAP S/4HANA, Oracle Cloud)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Authorized GS1 Global Alliance Partner</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'rgba(0, 113, 186, 0.08)', borderRadius: '6px', border: 'none', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore All Partner Programs</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Why ATPL Mobile Button */}
              <button
                onClick={() => handleNavClick('why-atpl')}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  background: 'rgba(0, 113, 186, 0.08)',
                  border: '1.5px solid rgba(0, 113, 186, 0.35)',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  textAlign: 'left',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ color: '#0071ba' }}>✨</span>
                  <span>Why ATPL (Executive Difference)</span>
                </span>
                <span style={{ backgroundColor: '#0071ba', color: '#ffffff', fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '999px', fontWeight: 800 }}>LEADER</span>
              </button>

              {/* 6. Contact Sales & Support (Direct Link) */}
              <button
                onClick={() => handleNavClick('contact')}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  textAlign: 'left',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ color: '#0071ba' }}>📍</span>
                  <span>Contact Sales & Support (TIDEL Park HQ)</span>
                </span>
              </button>

              {/* Secondary Navigation Quick-Links */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                padding: '0.65rem 0.25rem 0.2rem 0.25rem',
                fontSize: '0.82rem',
                color: '#64748b'
              }}>
                <button onClick={() => handleNavClick('solutions')} style={{ background: 'none', border: 'none', color: '#0071ba', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', padding: '0.2rem 0.4rem' }}>Industry Solutions</button>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#0071ba', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', padding: '0.2rem 0.4rem' }}>24/7 AMC</button>
                </div>

              {/* Compact Language Selector Bar */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'language' ? null : 'language')}
                  style={{
                    width: '100%',
                    minHeight: '38px',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#64748b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Globe size={16} color="#0071ba" />
                    <span>Language / மொழி: <strong style={{ color: '#0071ba' }}>{selectedLang.split(' ')[0]}</strong></span>
                  </span>
                  <ChevronDown size={15} style={{ transform: mobileExpandedSection === 'language' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>
                {mobileExpandedSection === 'language' && (
                  <div style={{
                    padding: '0.4rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.4rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '0.35rem'
                  }}>
                    {ATPL_LANGUAGES.map(lang => {
                      const isSelected = selectedLang === lang.native || selectedLang === lang.name;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleLanguageChange(lang);
                            setMobileMenuOpen(false);
                          }}
                          style={{
                            minHeight: '38px',
                            background: isSelected ? '#0071ba' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#334155',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '0.4rem 0.55rem',
                            fontSize: '0.8rem',
                            fontWeight: isSelected ? 700 : 500,
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer'
                          }}
                        >
                          <span>{lang.flag}</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lang.native}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Admin Control Link */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('admin');
                  }}
                  style={{
                    minHeight: '40px',
                    backgroundColor: 'rgba(0, 113, 186, 0.06)',
                    color: '#0071ba',
                    border: '1px dashed rgba(0, 113, 186, 0.35)',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginTop: '0.25rem'
                  }}
                >
                  <span>⚙️ Admin & SEO Control Center</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
