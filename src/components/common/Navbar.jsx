import React, { useState, useRef, useEffect } from 'react';
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

const ATPL_LANGUAGES = [
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

const HERO_TICKER_ITEMS = [
  '35+ Years Combined Industrial Experience',
  'ISO 9001:2015 & GS1 Certified Alliance',
  'Live Two-Way SAP & Oracle ERP Sync',
  'Rapid Factory Rollouts in 2 to 4 Weeks',
  '4-Hour On-Site Support SLA in South India'
];

export const Navbar = ({ onOpenSearch }) => {
  const { currentView, setCurrentView, openDemoModal } = useApp();
  
  // Navigation & dropdown state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ticker animation state (3.2s interval, 0.5s slide up + fade)
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerAnimating, setTickerAnimating] = useState(false);
  
  // Search expander state
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Language & mobile state
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  
  // Sliding pill highlight coordinates
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0, top: 0 });
  
  // DOM Refs
  const headerRef = useRef(null);
  const navContainerRef = useRef(null);
  const navItemRefs = useRef({});
  const closeTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Rotate message ticker every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerAnimating(true);
      setTimeout(() => {
        setTickerIndex((prev) => (prev + 1) % HERO_TICKER_ITEMS.length);
        setTickerAnimating(false);
      }, 500); // 0.5s slide up & fade
    }, 3200);
    return () => clearInterval(timer);
  }, []);

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
        /* Global header white text override */
        .atpl-white-header {
          background-color: #ffffff !important;
          color: #0e1a2b !important;
        }
        .atpl-white-header button {
          color: #0e1a2b;
        }

        /* Pulsing green dot for Telemetry Active */
        @keyframes greenPulseDot {
          0%, 100% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 8px 2px rgba(16, 185, 129, 0.5); }
        }
        .green-pulse-dot {
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background-color: #10b981;
          display: inline-block;
          animation: greenPulseDot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* White shine sweep across red engineer button every 3.6s */
        @keyframes whiteShineSweep {
          0% { transform: translateX(-160%) skewX(-20deg); }
          30%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        .talk-engineer-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
          animation: whiteShineSweep 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 1;
        }
        .talk-engineer-btn:hover .talk-engineer-arrow {
          transform: translateX(4px);
        }
        .talk-engineer-arrow {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
          .top-strip-telemetry { display: none !important; }
          .nav-search-wrap { display: none !important; }
        }
        @media (max-width: 640px) {
          .top-strip-ticker-wrap { display: none !important; }
        }

        /* Accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .green-pulse-dot,
          .talk-engineer-shine {
            animation: none !important;
          }
          .talk-engineer-arrow {
            transition: none !important;
          }
        }
      `}</style>

      {/* 1) TOP STRIP: Light (#edf3fd), 32px slim bar with ticker & telemetry */}
      <div
        style={{
          backgroundColor: '#edf3fd',
          borderBottom: '1px solid #d8e3f5',
          height: '32px',
          minHeight: '32px',
          padding: '0 1.25rem',
          fontSize: '0.75rem',
          color: '#5b6a84',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #c7d7ed',
                color: '#0071ba',
                fontSize: '0.62rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
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
                color: '#5b6a84',
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

          {/* Center: Message Ticker rotating every 3.2s + Green Pulsing Dot with "Telemetry active" */}
          <div
            className="top-strip-ticker-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              overflow: 'hidden',
              minWidth: 0,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                height: '20px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  transform: tickerAnimating ? 'translateY(-12px)' : 'translateY(0)',
                  opacity: tickerAnimating ? 0 : 1,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                  color: '#0e1a2b',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: '#0071ba', fontWeight: 800 }}>⚡</span>
                <span>{HERO_TICKER_ITEMS[tickerIndex]}</span>
              </div>
            </div>

            {/* Small green pulsing dot with "Telemetry active" */}
            <div
              className="top-strip-telemetry"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                flexShrink: 0
              }}
            >
              <span className="green-pulse-dot" />
              <span
                style={{
                  color: '#059669',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}
              >
                Telemetry active
              </span>
            </div>
          </div>

          {/* Right: Admin Panel Link */}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0071ba',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.74rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              transition: 'color 0.15s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#0e1a2b'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#0071ba'; }}
            title="Open ATPL Control Center & SEO Manager"
          >
            <span>⚙️ Admin Panel</span>
          </button>
        </div>
      </div>

      {/* 2) NAVBAR: Sticky, full width, WHITE (#ffffff), explicit dark text (#0e1a2b) & muted (#5b6a84) */}
      <header
        ref={headerRef}
        className="atpl-white-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 16px rgba(14, 26, 43, 0.06)',
          borderBottom: '1px solid #e2e8f0',
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
          {/* Left: Brand Logo with dark text for white navbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
            <AtplLogo
              size={isScrolled ? 34 : 38}
              showText={true}
              lightText={false}
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Center: Dropdown items + sliding soft pill highlight (#f1f5f9) */}
          <nav
            ref={navContainerRef}
            className="atpl-desktop-nav"
            role="menubar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              position: 'relative'
            }}
          >
            {/* Sliding Soft Pill Highlight (subtle light slate #f1f5f9) */}
            <div
              style={{
                position: 'absolute',
                top: `${pillStyle.top || 0}px`,
                left: `${pillStyle.left || 0}px`,
                width: `${pillStyle.width || 0}px`,
                height: `${pillStyle.height || 0}px`,
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: pillStyle.opacity,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* 1. Hardware */}
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
                  color: (activeDropdown === 'hardware' || hoveredNav === 'hardware' || currentView === 'hardware') ? '#0071ba' : '#0e1a2b',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Hardware</span>
                <ChevronDown
                  size={14}
                  color={(activeDropdown === 'hardware' || hoveredNav === 'hardware') ? '#0071ba' : '#5b6a84'}
                  style={{
                    transform: activeDropdown === 'hardware' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease'
                  }}
                />
              </button>
            </div>

            {/* 2. Software */}
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
                  color: (activeDropdown === 'software' || hoveredNav === 'software' || currentView === 'software') ? '#0071ba' : '#0e1a2b',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Software</span>
                <ChevronDown
                  size={14}
                  color={(activeDropdown === 'software' || hoveredNav === 'software') ? '#0071ba' : '#5b6a84'}
                  style={{
                    transform: activeDropdown === 'software' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease'
                  }}
                />
              </button>
            </div>

            {/* 3. Customers */}
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
                  color: (activeDropdown === 'customers' || hoveredNav === 'customers' || currentView === 'customers') ? '#0071ba' : '#0e1a2b',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Customers</span>
                <ChevronDown
                  size={14}
                  color={(activeDropdown === 'customers' || hoveredNav === 'customers') ? '#0071ba' : '#5b6a84'}
                  style={{
                    transform: activeDropdown === 'customers' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease'
                  }}
                />
              </button>
            </div>

            {/* 4. Partners */}
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
                  color: (activeDropdown === 'partners' || hoveredNav === 'partners' || currentView === 'partners') ? '#0071ba' : '#0e1a2b',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Partners</span>
                <ChevronDown
                  size={14}
                  color={(activeDropdown === 'partners' || hoveredNav === 'partners') ? '#0071ba' : '#5b6a84'}
                  style={{
                    transform: activeDropdown === 'partners' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease'
                  }}
                />
              </button>
            </div>

            {/* 5. Why ATPL (Positioned identically like Partners) */}
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
                  color: (activeDropdown === 'why-atpl' || hoveredNav === 'why-atpl' || currentView === 'why-atpl') ? '#0071ba' : '#0e1a2b',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Why ATPL</span>
                <ChevronDown
                  size={14}
                  color={(activeDropdown === 'why-atpl' || hoveredNav === 'why-atpl') ? '#0071ba' : '#5b6a84'}
                  style={{
                    transform: activeDropdown === 'why-atpl' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease'
                  }}
                />
              </button>
            </div>
          </nav>

          {/* Right: Expandable Search, Language Selector, Admin Pill & Red "Talk to an Engineer" */}
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
                  background: searchExpanded ? '#f8fafc' : 'transparent',
                  border: searchExpanded ? '1px solid #cbd5e1' : '1px solid transparent',
                  borderRadius: '9999px',
                  padding: searchExpanded ? '0 0.5rem 0 0.75rem' : '0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: searchExpanded ? '200px' : '36px',
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
                      color: '#0e1a2b',
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
                    color: searchExpanded ? '#0071ba' : '#5b6a84',
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
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0e1a2b'; }}
                  onMouseLeave={(e) => { if (!searchExpanded) e.currentTarget.style.color = '#5b6a84'; }}
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
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0e1a2b',
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
                  e.currentTarget.style.borderColor = '#0071ba';
                  e.currentTarget.style.color = '#0071ba';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#0e1a2b';
                }}
              >
                <Globe size={14} color="#0071ba" />
                <span>{selectedLang.split(' ')[0]}</span>
                <ChevronDown
                  size={13}
                  color="#5b6a84"
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
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 32px rgba(14, 26, 43, 0.12)',
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
                    color: '#5b6a84',
                    padding: '0.3rem 0.5rem 0.2rem 0.5rem',
                    borderBottom: '1px solid #f1f5f9'
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
                        background: isSelected ? 'rgba(0, 113, 186, 0.08)' : 'transparent',
                        border: 'none',
                        color: isSelected ? '#0071ba' : '#0e1a2b',
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

            {/* Admin button as a light solid pill (#f1f5f9) */}
            <button
              onClick={() => handleNavClick('admin')}
              className="desktop-only-action"
              style={{
                backgroundColor: '#f1f5f9',
                color: '#0e1a2b',
                border: '1px solid #cbd5e1',
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
                e.currentTarget.style.backgroundColor = '#0e1a2b';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#0e1a2b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#0e1a2b';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              title="Open Admin Control Center & SEO Manager"
            >
              <LayoutDashboard size={14} />
              <span>Admin</span>
            </button>

            {/* Red Pill Button: "Talk to an Engineer" with right-moving arrow & 3.6s white shine sweep */}
            <button
              onClick={() => {
                if (openDemoModal) {
                  openDemoModal('Talk to an Automation Engineer');
                } else {
                  handleNavClick('contact');
                }
              }}
              className="talk-engineer-btn desktop-only-action"
              title="Connect Directly with an ATPL Factory Automation Engineer"
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.84rem',
                padding: '0.42rem 1.05rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 2px 10px rgba(220, 38, 38, 0.28)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'background-color 0.2s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              {/* White shine sweep animation every 3.6s */}
              <div className="talk-engineer-shine" />
              <span style={{ position: 'relative', zIndex: 2 }}>Talk to an Engineer</span>
              <ArrowRight size={14} className="talk-engineer-arrow" style={{ position: 'relative', zIndex: 2 }} />
            </button>

            {/* Mobile Hamburger Button (44x44px minimum tap target) */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                padding: 0,
                color: '#0e1a2b',
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

        {/* 4) Mobile Full-Screen Navigation Drawer */}
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
              backgroundColor: '#ffffff',
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
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                flexShrink: 0
              }}
            >
              <AtplLogo
                size={34}
                showText={true}
                lightText={false}
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
                  border: '1px solid #cbd5e1',
                  color: '#0e1a2b',
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
              {/* Talk to an Engineer CTA (Mobile Priority #1) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (openDemoModal) {
                    openDemoModal('Talk to an Automation Engineer');
                  } else {
                    handleNavClick('contact');
                  }
                }}
                style={{
                  width: '100%',
                  minHeight: '46px',
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(220, 38, 38, 0.25)'
                }}
              >
                <span>Talk to an Engineer</span>
                <ArrowRight size={18} />
              </button>

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
                    color: '#0e1a2b',
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
                  <ChevronDown
                    size={18}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'hardware' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'hardware' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Fixed UHF RFID Portals & Antennas</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial 2D & DPM Barcode Scanners</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Industrial Barcode & RFID Printers</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Rugged Handheld Computers & PDAs</button>
                    <button onClick={() => handleNavClick('hardware')} style={{ minHeight: '44px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    color: '#0e1a2b',
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
                  <ChevronDown
                    size={18}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'software' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'software' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(0, 113, 186, 0.08)', borderRadius: '6px', border: '1px solid rgba(0, 113, 186, 0.25)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#0071ba', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ PerfectEdge MDM™</span>
                      <span style={{ backgroundColor: '#dc2626', color: '#fff', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>FLEET</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.25)', textAlign: 'left', padding: '0.5rem 0.65rem', color: '#b45309', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>★ Perfect Labeler™</span>
                      <span style={{ backgroundColor: '#f59e0b', color: '#0f172a', fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px' }}>AI CLOUD</span>
                    </button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Flow 360™ (CRM & Ops)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Store™ (Warehouse WMS)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Perfect Trace™ (Serialization & Aggregation)</button>
                    <button onClick={() => handleNavClick('software')} style={{ minHeight: '44px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0e1a2b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>👥</span>
                    <span>Customers &amp; Case Studies</span>
                  </span>
                  <ChevronDown
                    size={18}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'customers' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'customers' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Automotive &amp; EV (Apollo, Ola, Bosch)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Heavy Engg &amp; Defense (L&amp;T, ABB, BEL)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>FMCG &amp; Packaging (HUL, Hatsun, ITC)</button>
                    <button onClick={() => handleNavClick('customers')} style={{ minHeight: '44px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0e1a2b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>🤝</span>
                    <span>Partners &amp; OEM Alliances</span>
                  </span>
                  <ChevronDown
                    size={18}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'partners' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'partners' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Hardware OEMs (Honeywell, Zebra, TSC, Impinj)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>ERP Cloud Alliances (SAP S/4HANA, Oracle Cloud)</button>
                    <button onClick={() => handleNavClick('partners')} style={{ minHeight: '44px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#0e1a2b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#0071ba' }}>✨</span>
                    <span>Why ATPL (Executive Difference)</span>
                  </span>
                  <ChevronDown
                    size={18}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'why-atpl' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {mobileExpandedSection === 'why-atpl' && (
                  <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #0071ba', marginLeft: '0.5rem', marginTop: '0.35rem' }}>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Advanced Tech Made Easy</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Single Engineering Authority</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0e1a2b', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Guaranteed 4-Hour On-Site SLA</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', color: '#0071ba', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>35+ Years Proven Track Record</button>
                    <button onClick={() => handleNavClick('why-atpl')} style={{ minHeight: '44px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left', padding: '0.5rem 0.75rem', color: '#0071ba', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#5b6a84',
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
                  <ChevronDown
                    size={15}
                    color="#5b6a84"
                    style={{
                      transform: mobileExpandedSection === 'language' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
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
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
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
                            background: isSelected ? '#0071ba' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#0e1a2b',
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
              <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('admin');
                  }}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    backgroundColor: '#f1f5f9',
                    color: '#0e1a2b',
                    border: '1px solid #cbd5e1',
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
