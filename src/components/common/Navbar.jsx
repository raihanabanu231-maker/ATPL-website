import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { AtplLogo } from './AtplLogo';
import { GsapDropdown } from './GsapDropdown';
import { MegaMenu } from './MegaMenu';
import {
  Sparkles,
  LayoutDashboard,
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  ArrowRight,
  ExternalLink
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

const NAV_DROPDOWN_KEYS = ['hardware', 'software', 'customers', 'partners', 'why-atpl'];

export const Navbar = ({ onOpenSearch }) => {
  const { currentView, setCurrentView, openDemoModal } = useApp();
  
  // Navigation & dropdown state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Search expander state
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Language & mobile state
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  
  // Pill highlight coordinates
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0, top: 0 });
  
  // DOM Refs
  const headerRef = useRef(null);
  const navContainerRef = useRef(null);
  const navItemRefs = useRef({});
  const closeTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Track scroll position: shrink navbar from 64px to 54px past 20px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding soft pill highlight over nav items
  useEffect(() => {
    const targetKey = hoveredNav || activeDropdown;
    if (targetKey && navItemRefs.current[targetKey] && navContainerRef.current) {
      const el = navItemRefs.current[targetKey];
      const navContainer = navContainerRef.current;
      const elRect = el.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();
      
      setPillStyle({
        opacity: 1,
        left: elRect.left - containerRect.left,
        width: elRect.width,
        height: elRect.height,
        top: elRect.top - containerRect.top
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredNav, activeDropdown]);

  // Hover intent for dropdowns
  const handleDropdownEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredNav(name);
    setLanguageOpen(false);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setHoveredNav(null);
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

  // Outside click & keyboard accessibility (Esc closes menus/drawer)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLanguageOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target) && !searchQuery) {
        setSearchExpanded(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setLanguageOpen(false);
        setSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery]);

  // Focus input when search expands
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

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

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch(searchQuery);
    }
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
      {/* Dynamic Keyframes & Responsive Rules for Header */}
      <style>{`
        /* Cyan bottom travel line loop (5s linear infinite) */
        @keyframes cyanTravelLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        .cyan-travel-beam {
          width: 32%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.12) 20%, #22d3ee 50%, rgba(34, 211, 238, 0.12) 80%, transparent 100%);
          animation: cyanTravelLine 5s linear infinite;
        }

        /* Pulsing cyan dot next to company logo */
        @keyframes cyanPulseDot {
          0%, 100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.8); }
          50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 8px 2px rgba(34, 211, 238, 0.6); }
        }
        .cyan-pulse-dot {
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background-color: #22d3ee;
          display: inline-block;
          animation: cyanPulseDot 2.2s ease-in-out infinite;
          flex-shrink: 0;
          margin-left: 6px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .atpl-desktop-nav { display: none !important; }
          .desktop-only-action { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .atpl-desktop-nav { display: flex !important; }
          .desktop-only-action { display: inline-flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 900px) {
          .top-strip-tagline { display: none !important; }
          .nav-search-wrap { display: none !important; }
        }

        /* Accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .cyan-travel-beam,
          .cyan-pulse-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* 1) TOP STRIP: Slim 32px dark bar above navbar */}
      <div
        style={{
          backgroundColor: '#050a14',
          borderBottom: '1px solid #1c2a44',
          height: '32px',
          minHeight: '32px',
          padding: '0 1.25rem',
          fontSize: '0.75rem',
          color: '#8aa0c4',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1002,
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          {/* Left: Outlined Badge & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #1c2a44',
                color: '#22d3ee',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '0.08rem 0.45rem',
                borderRadius: '4px',
                flexShrink: 0
              }}
            >
              ATPL GROUP
            </span>
            <span
              className="top-strip-tagline"
              style={{
                color: '#8aa0c4',
                fontSize: '0.74rem',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              Enterprise Shopfloor Automation, AIDC &amp; Barcode Solutions
            </span>
          </div>

          {/* Right: Accent Admin Link */}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#22d3ee',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.74rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              transition: 'opacity 0.15s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            title="Open ATPL Control Center & SEO Manager"
          >
            <span>⚙️ Admin Panel</span>
          </button>
        </div>
      </div>

      {/* 2) NAVBAR: Sticky, full width, 64px shrinking to 54px, dark #050a14 @ 90% */}
      <header
        ref={headerRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(5, 10, 20, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #1c2a44',
          transition: 'height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
          height: isScrolled ? '54px' : '64px',
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            position: 'relative'
          }}
        >
          {/* Left: Brand Logo with pulsing dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
            <AtplLogo
              size={isScrolled ? 34 : 38}
              showText={true}
              lightText={true}
              onClick={() => handleNavClick('home')}
            />
            <span className="cyan-pulse-dot" title="Systems Active" />
          </div>

          {/* Center: Dropdown items + sliding soft pill highlight */}
          <nav
            ref={navContainerRef}
            className="atpl-desktop-nav"
            role="menubar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative'
            }}
          >
            {/* Sliding Soft Pill Highlight (#13203a) */}
            <div
              style={{
                position: 'absolute',
                top: `${pillStyle.top || 0}px`,
                left: `${pillStyle.left || 0}px`,
                width: `${pillStyle.width || 0}px`,
                height: `${pillStyle.height || 0}px`,
                backgroundColor: '#13203a',
                borderRadius: '9999px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: pillStyle.opacity,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Hardware */}
            <div
              ref={(el) => { navItemRefs.current['hardware'] = el; }}
              onMouseEnter={() => handleDropdownEnter('hardware')}
              onMouseLeave={handleDropdownLeave}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'hardware') {
                    handleNavClick('hardware');
                  } else {
                    handleDropdownEnter('hardware');
                  }
                }}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'hardware'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: (activeDropdown === 'hardware' || hoveredNav === 'hardware' || currentView === 'hardware') ? '#22d3ee' : '#eaf1ff',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease'
                }}
              >
                <span>Hardware</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'hardware' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* Software */}
            <div
              ref={(el) => { navItemRefs.current['software'] = el; }}
              onMouseEnter={() => handleDropdownEnter('software')}
              onMouseLeave={handleDropdownLeave}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'software') {
                    handleNavClick('software');
                  } else {
                    handleDropdownEnter('software');
                  }
                }}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'software'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: (activeDropdown === 'software' || hoveredNav === 'software' || currentView === 'software') ? '#22d3ee' : '#eaf1ff',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease'
                }}
              >
                <span>Software</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'software' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* Customers */}
            <div
              ref={(el) => { navItemRefs.current['customers'] = el; }}
              onMouseEnter={() => handleDropdownEnter('customers')}
              onMouseLeave={handleDropdownLeave}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'customers') {
                    handleNavClick('customers');
                  } else {
                    handleDropdownEnter('customers');
                  }
                }}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'customers'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: (activeDropdown === 'customers' || hoveredNav === 'customers' || currentView === 'customers') ? '#22d3ee' : '#eaf1ff',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease'
                }}
              >
                <span>Customers</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'customers' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* Partners */}
            <div
              ref={(el) => { navItemRefs.current['partners'] = el; }}
              onMouseEnter={() => handleDropdownEnter('partners')}
              onMouseLeave={handleDropdownLeave}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'partners') {
                    handleNavClick('partners');
                  } else {
                    handleDropdownEnter('partners');
                  }
                }}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'partners'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: (activeDropdown === 'partners' || hoveredNav === 'partners' || currentView === 'partners') ? '#22d3ee' : '#eaf1ff',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease'
                }}
              >
                <span>Partners</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'partners' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>

            {/* Why ATPL - Nav item styled identically to Partners */}
            <div
              ref={(el) => { navItemRefs.current['why-atpl'] = el; }}
              onMouseEnter={() => handleDropdownEnter('why-atpl')}
              onMouseLeave={handleDropdownLeave}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <button
                onClick={() => {
                  if (activeDropdown === 'why-atpl') {
                    handleNavClick('why-atpl');
                  } else {
                    handleDropdownEnter('why-atpl');
                  }
                }}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'why-atpl'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: (activeDropdown === 'why-atpl' || hoveredNav === 'why-atpl' || currentView === 'why-atpl') ? '#22d3ee' : '#eaf1ff',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease'
                }}
              >
                <span>Why ATPL</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'why-atpl' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>
          </nav>

          {/* Right: Expandable Search, Language Selector, Admin Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            
            {/* Search Icon that expands into input field */}
            <div
              ref={searchContainerRef}
              className="nav-search-wrap"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '36px'
              }}
            >
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: searchExpanded ? '#0a1220' : 'transparent',
                  border: searchExpanded ? '1px solid #1c2a44' : '1px solid transparent',
                  borderRadius: '9999px',
                  padding: searchExpanded ? '0 0.5rem 0 0.75rem' : '0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: searchExpanded ? '210px' : '36px',
                  overflow: 'hidden'
                }}
              >
                {searchExpanded && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..."
                    aria-label="Search ATPL products and solutions"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#eaf1ff',
                      fontSize: '0.84rem',
                      width: '100%',
                      padding: '0.35rem 0'
                    }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!searchExpanded) {
                      setSearchExpanded(true);
                    } else if (searchQuery.trim()) {
                      handleSearchSubmit();
                    } else {
                      setSearchExpanded(false);
                    }
                  }}
                  aria-label={searchExpanded ? "Execute Search" : "Open Search"}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: searchExpanded ? '#22d3ee' : '#8aa0c4',
                    cursor: 'pointer',
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    borderRadius: '50%',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; }}
                  onMouseLeave={(e) => { if (!searchExpanded) e.currentTarget.style.color = '#8aa0c4'; }}
                >
                  <Search size={17} />
                </button>
              </form>
            </div>

            {/* Language Selector: Rounded pill with small dropdown */}
            <div style={{ position: 'relative' }} className="desktop-only-action">
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setLanguageOpen(!languageOpen);
                }}
                aria-label="Change Website Language"
                aria-expanded={languageOpen}
                style={{
                  background: '#0a1220',
                  border: '1px solid #1c2a44',
                  color: '#eaf1ff',
                  cursor: 'pointer',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.36rem 0.75rem',
                  borderRadius: '9999px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#22d3ee';
                  e.currentTarget.style.color = '#22d3ee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1c2a44';
                  e.currentTarget.style.color = '#eaf1ff';
                }}
              >
                <Globe size={14} color="#22d3ee" />
                <span>{selectedLang.split(' ')[0]}</span>
                <ChevronDown
                  size={13}
                  style={{
                    transform: languageOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </button>

              <GsapDropdown
                isOpen={languageOpen}
                width="220px"
                align="right"
                style={{
                  backgroundColor: '#050a14',
                  border: '1px solid #1c2a44',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.65)',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  padding: '0.6rem 0.5rem',
                  borderRadius: '10px'
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8aa0c4',
                    padding: '0.3rem 0.5rem 0.2rem 0.5rem',
                    borderBottom: '1px solid #1c2a44'
                  }}
                >
                  Select Language / மொழி
                </div>
                {ATPL_LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.native || selectedLang === lang.name;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      style={{
                        background: isSelected ? '#13203a' : 'transparent',
                        border: 'none',
                        color: isSelected ? '#22d3ee' : '#eaf1ff',
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
                        if (!isSelected) e.currentTarget.style.backgroundColor = '#0a1220';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                        <span>{lang.native}</span>
                      </span>
                      {isSelected && <span style={{ color: '#22d3ee', fontSize: '0.8rem' }}>✓</span>}
                    </button>
                  );
                })}
              </GsapDropdown>
            </div>

            {/* Admin button as a solid light pill (#eaf1ff) */}
            <button
              onClick={() => handleNavClick('admin')}
              className="desktop-only-action"
              style={{
                backgroundColor: '#eaf1ff',
                color: '#050a14',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.84rem',
                padding: '0.38rem 0.95rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(234, 241, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#eaf1ff';
                e.currentTarget.style.boxShadow = 'none';
              }}
              title="Open Admin Control Center & SEO Manager"
            >
              <LayoutDashboard size={14} />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Button (44x44px minimum tap target) */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                background: '#0a1220',
                border: '1px solid #1c2a44',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                padding: 0,
                color: '#eaf1ff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 1px Cyan Light Traveling Beam along bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          <div className="cyan-travel-beam" />
        </div>

        {/* 3) Reusable Compact MegaMenu Component */}
        <MegaMenu
          menuKey={activeDropdown}
          isOpen={Boolean(activeDropdown && NAV_DROPDOWN_KEYS.includes(activeDropdown))}
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

        {/* 4) Mobile Full-Screen Navigation Drawer (Hero-Integrated Dark Theme) */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100dvh',
              backgroundColor: '#050a14',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 99999,
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Drawer Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid #1c2a44',
                backgroundColor: '#050a14',
                flexShrink: 0
              }}
            >
              <AtplLogo
                size={34}
                showText={true}
                lightText={true}
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
                  background: '#0a1220',
                  border: '1px solid #1c2a44',
                  color: '#eaf1ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                padding: '1rem 1.25rem 3.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              {/* 1. Hardware Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'hardware' ? null : 'hardware')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#eaf1ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#22d3ee' }}>📦</span>
                    <span>Hardware Solutions</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileExpandedSection === 'hardware' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'hardware' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #22d3ee', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Fixed UHF RFID Portals & Antennas</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial 2D & DPM Barcode Scanners</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial Barcode & RFID Printers</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Rugged Handheld Computers & PDAs</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: '#13203a', borderRadius: '6px', border: '1px solid #1c2a44', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#eaf1ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#22d3ee' }}>💻</span>
                    <span>Software Suites (ATPL One™)</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileExpandedSection === 'software' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'software' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #22d3ee', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '6px', border: '1px solid rgba(34, 211, 238, 0.3)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#22d3ee', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ PerfectEdge MDM™</span>
                      <span style={{ backgroundColor: '#dc2626', color: '#fff', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>FLEET</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#f59e0b', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ Perfect Labeler™</span>
                      <span style={{ backgroundColor: '#f59e0b', color: '#050a14', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>AI CLOUD</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Flow 360™ (CRM & Ops)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Store™ (Warehouse WMS)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Trace™ (Serialization & Aggregation)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect AI Vision™ (Defect Inspection)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: '#13203a', borderRadius: '6px', border: '1px solid #1c2a44', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore All Software Suites</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Customers Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'customers' ? null : 'customers')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#eaf1ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#22d3ee' }}>👥</span>
                    <span>Customers &amp; Case Studies</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileExpandedSection === 'customers' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'customers' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #22d3ee', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Automotive &amp; EV (Apollo, Ola, Bosch)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Heavy Engg &amp; Defense (L&amp;T, ABB, BEL)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>FMCG &amp; Packaging (HUL, Hatsun, ITC)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: '#13203a', borderRadius: '6px', border: '1px solid #1c2a44', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore 200+ Enterprise Clients</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Partners Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'partners' ? null : 'partners')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#eaf1ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#22d3ee' }}>🤝</span>
                    <span>Partners &amp; OEM Alliances</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileExpandedSection === 'partners' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'partners' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #22d3ee', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Hardware OEMs (Honeywell, Zebra, TSC, Impinj)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>ERP Cloud Alliances (SAP S/4HANA, Oracle Cloud)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Authorized GS1 Global Alliance Partner</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: '#13203a', borderRadius: '6px', border: '1px solid #1c2a44', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore All Partner Programs</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Why ATPL Accordion (Identical to Partners) */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'why-atpl' ? null : 'why-atpl')}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#eaf1ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#22d3ee' }}>✨</span>
                    <span>Why ATPL (Executive Difference)</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileExpandedSection === 'why-atpl' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'why-atpl' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #22d3ee', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Advanced Tech Made Easy</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Single Engineering Authority</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#eaf1ff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Guaranteed 4-Hour On-Site SLA</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>35+ Years Proven Track Record</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: '#13203a', borderRadius: '6px', border: '1px solid #1c2a44', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Explore Why ATPL Overview</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Language Selector Bar */}
              <div>
                <button
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'language' ? null : 'language')}
                  style={{
                    width: '100%',
                    minHeight: '40px',
                    background: '#0a1220',
                    border: '1px solid #1c2a44',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#8aa0c4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Globe size={16} color="#22d3ee" />
                    <span>Language / மொழி: <strong style={{ color: '#22d3ee' }}>{selectedLang.split(' ')[0]}</strong></span>
                  </span>
                  <ChevronDown
                    size={15}
                    style={{
                      transform: mobileExpandedSection === 'language' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: '#8aa0c4'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'language' && (
                  <div
                    style={{
                      padding: '0.4rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.4rem',
                      backgroundColor: '#0a1220',
                      border: '1px solid #1c2a44',
                      borderRadius: '8px',
                      marginTop: '0.35rem'
                    }}
                  >
                    {ATPL_LANGUAGES.map((lang) => {
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
                            background: isSelected ? '#22d3ee' : '#13203a',
                            color: isSelected ? '#050a14' : '#eaf1ff',
                            border: '1px solid #1c2a44',
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
              <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #1c2a44' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('admin');
                  }}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    backgroundColor: '#eaf1ff',
                    color: '#050a14',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <LayoutDashboard size={16} />
                  <span>Admin &amp; Control Center</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
