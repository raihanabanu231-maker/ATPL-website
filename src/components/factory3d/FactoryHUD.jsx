import React from 'react';
import { 
  Sparkles, 
  Compass, 
  RotateCcw, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Radio, 
  Zap, 
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';
import { StationVisualPreview } from './StationVisuals';

export const FactoryHUD = ({
  selectedStation,
  onSelectStation,
  onResetOverview,
  isOverview,
  isAutoTour,
  onToggleAutoTour,
  isDemoRunning,
  onTriggerDemo,
  onRequestDemoModal,
  soundEnabled,
  onToggleSound,
  quality,
  onChangeQuality
}) => {
  const node = selectedStation ? ATPL_FACTORY_NODES[selectedStation] : null;

  const currentIdx = selectedStation ? STATION_KEYS.indexOf(selectedStation) : -1;
  const handleNextStation = () => {
    const nextIdx = (currentIdx + 1) % STATION_KEYS.length;
    onSelectStation(STATION_KEYS[nextIdx]);
  };
  const handlePrevStation = () => {
    const prevIdx = (currentIdx - 1 + STATION_KEYS.length) % STATION_KEYS.length;
    onSelectStation(STATION_KEYS[prevIdx]);
  };

  return (
    <div 
      className="factory-hud-root"
      style={{ 
        pointerEvents: 'none', 
        position: 'absolute', 
        inset: 0, 
        zIndex: 10, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: 'clamp(0.4rem, 1.5vw, 1.25rem)',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .factory-hud-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .factory-hud-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
        }
        .factory-hud-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.4);
          border-radius: 4px;
        }
        .factory-hud-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.8);
        }

        /* Mobile specific adjustments (320px - 768px) */
        @media (max-width: 768px) {
          .hud-desktop-dock {
            display: none !important;
          }
          .hud-mobile-ribbon {
            display: flex !important;
          }
          .hud-status-full {
            display: none !important;
          }
          .hud-status-compact {
            display: flex !important;
          }
          .hud-btn-text-full {
            display: none !important;
          }
          .hud-btn-text-short {
            display: inline !important;
          }
          .hud-station-card {
            max-height: calc(100dvh - 135px) !important;
            width: calc(100vw - 1rem) !important;
            margin: auto 0 0.5rem 0 !important;
            padding: 0.9rem !important;
          }
        }

        @media (min-width: 769px) {
          .hud-desktop-dock {
            display: flex !important;
          }
          .hud-mobile-ribbon {
            display: none !important;
          }
          .hud-status-full {
            display: flex !important;
          }
          .hud-status-compact {
            display: none !important;
          }
          .hud-btn-text-full {
            display: inline !important;
          }
          .hud-btn-text-short {
            display: none !important;
          }
          .hud-station-card {
            max-height: calc(100dvh - 160px) !important;
            width: min(480px, calc(100vw - 2rem)) !important;
            margin: auto 0 1rem 0 !important;
            padding: 1.5rem !important;
          }
        }

        /* 4K Ultra-wide scaling (1600px - 2550px) */
        @media (min-width: 1800px) {
          .hud-station-card {
            max-width: 540px !important;
            padding: 2rem !important;
          }
        }
      `}</style>
      
      {/* ===================================================================
          1. TOP COMMAND BAR (Responsive for 320px to 2550px)
          =================================================================== */}
      <div style={{ 
        pointerEvents: 'auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '0.4rem',
        maxWidth: '100%'
      }}>
        
        {/* Left Status Core - Full on Desktop */}
        <div 
          className="hud-status-full"
          style={{
            background: 'rgba(6, 14, 30, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '12px',
            padding: '0.5rem 1rem',
            alignItems: 'center',
            gap: '0.85rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span className="pulse-dot"></span>
            <div>
              <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '0.88rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                SMART FACTORY DIGITAL TWIN
              </div>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.66rem', color: '#00f0ff' }}>
                ATPL GROUP • 12 ACTIVE IOT STATIONS
              </div>
            </div>
          </div>

          <div style={{ height: '22px', width: '1px', background: 'rgba(255,255,255,0.15)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: '#34d399', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
            <Activity size={13} />
            <span>TELEMETRY LIVE</span>
          </div>
        </div>

        {/* Left Status Core - Compact on Mobile (320px - 768px) */}
        <div 
          className="hud-status-compact"
          style={{
            background: 'rgba(6, 14, 30, 0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
          <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '0.76rem', color: '#ffffff' }}>
            3D TWIN <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem' }}>12/12</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 0.8vw, 0.5rem)' }}>
          
          {/* Reset Overview Camera */}
          <button
            onClick={onResetOverview}
            style={{
              background: isOverview ? 'rgba(0, 240, 255, 0.25)' : 'rgba(10, 22, 44, 0.88)',
              border: isOverview ? '1px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.35)',
              color: isOverview ? '#00f0ff' : '#cbd5e1',
              borderRadius: '8px',
              padding: 'clamp(0.35rem, 0.6vw, 0.5rem) clamp(0.5rem, 1vw, 0.85rem)',
              fontSize: 'clamp(0.72rem, 0.8vw, 0.8rem)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.15s ease'
            }}
            title="Reset Camera to Overview"
          >
            <Compass size={14} />
            <span className="hud-btn-text-full">Overview</span>
            <span className="hud-btn-text-short">Reset</span>
          </button>

          {/* Auto Tour Mode */}
          <button
            onClick={onToggleAutoTour}
            style={{
              background: isAutoTour ? 'rgba(16, 185, 129, 0.28)' : 'rgba(10, 22, 44, 0.88)',
              border: isAutoTour ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.18)',
              color: isAutoTour ? '#34d399' : '#cbd5e1',
              borderRadius: '8px',
              padding: 'clamp(0.35rem, 0.6vw, 0.5rem) clamp(0.5rem, 1vw, 0.85rem)',
              fontSize: 'clamp(0.72rem, 0.8vw, 0.8rem)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backdropFilter: 'blur(12px)',
              boxShadow: isAutoTour ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none',
              transition: 'all 0.15s ease'
            }}
            title="Auto-tour across all 12 stations"
          >
            {isAutoTour ? <Pause size={14} /> : <Play size={14} />}
            <span className="hud-btn-text-full">{isAutoTour ? 'Pause Tour' : 'Auto Tour'}</span>
            <span className="hud-btn-text-short">{isAutoTour ? 'Pause' : 'Tour'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            style={{
              background: 'rgba(10, 22, 44, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: soundEnabled ? '#00f0ff' : '#64748b',
              borderRadius: '8px',
              padding: 'clamp(0.35rem, 0.6vw, 0.5rem)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backdropFilter: 'blur(12px)'
            }}
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Quality Selector */}
          <button
            onClick={() => onChangeQuality(quality === 'HIGH' ? 'MED' : quality === 'MED' ? 'LOW' : 'HIGH')}
            style={{
              background: 'rgba(10, 22, 44, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: 'clamp(0.35rem, 0.6vw, 0.5rem) clamp(0.45rem, 0.8vw, 0.7rem)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
            title="Toggle Graphic Quality"
          >
            Q: {quality}
          </button>
        </div>

      </div>

      {/* Cinematic Full-View Auto Tour Indicator */}
      {isAutoTour && node && (
        <div style={{
          pointerEvents: 'none',
          alignSelf: 'center',
          marginTop: '0.4rem',
          maxWidth: 'min(92vw, 600px)',
          background: 'rgba(5, 13, 26, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 240, 255, 0.45)',
          borderRadius: '999px',
          padding: '0.35rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.25)',
          animation: 'fadeInDown 0.3s ease-out'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px #10b981',
            flexShrink: 0
          }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', color: '#00f0ff', fontWeight: 800, whiteSpace: 'nowrap' }}>
            STATION {node.number}/12:
          </span>
          <span style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '0.82rem', color: '#ffffff', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {node.name}
          </span>
        </div>
      )}

      {/* ===================================================================
          2. FLOATING PRODUCT INFORMATION & LESSON PANEL (Visible when station is clicked)
          =================================================================== */}
      {!isAutoTour && node && (
        <div 
          className="hud-station-card factory-hud-scrollbar"
          style={{
            pointerEvents: 'auto',
            alignSelf: 'flex-start',
            background: 'rgba(5, 13, 26, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1.5px solid ${node.color}`,
            borderRadius: '16px',
            boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 35px ${node.color}30`,
            animation: 'fadeInUp 0.25s ease-out',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: node.color,
                color: '#040914',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 900,
                flexShrink: 0
              }}>
                {node.number}
              </span>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: node.color, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                {node.category}
              </span>
            </div>

            <button
              onClick={() => onSelectStation(null)}
              style={{ 
                background: 'rgba(255, 255, 255, 0.08)', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                color: '#cbd5e1', 
                cursor: 'pointer', 
                padding: '0.25rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
              title="Close panel"
              aria-label="Close station panel"
            >
              <X size={16} />
            </button>
          </div>

          <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#ffffff', fontWeight: 800, margin: '0 0 0.35rem 0', lineHeight: 1.25 }}>
            {node.name}
          </h3>

          <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.45, margin: '0 0 0.75rem 0' }}>
            {node.whatItDoes}
          </p>

          {/* Graphical Station Visual Illustration Preview */}
          <div style={{ marginBottom: '0.75rem', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', flexShrink: 0 }}>
            <StationVisualPreview stationId={node.id} color={node.color} height={95} />
          </div>

          {/* Archie AI Robot Lesson Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#00f0ff', fontFamily: 'var(--font-mono, monospace)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
              <span>🤖 ARCHIE AI LESSON:</span>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '0.82rem', lineHeight: 1.45, margin: 0 }}>
              {node.lesson}
            </p>
          </div>

          {/* Key Specifications */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 700 }}>
              TECHNICAL SPECIFICATIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {node.specs.slice(0, 3).map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={13} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
            <button
              onClick={() => onTriggerDemo(node.id)}
              style={{
                background: isDemoRunning ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 240, 255, 0.15)',
                border: isDemoRunning ? '1px solid #10b981' : '1px solid #00f0ff',
                color: isDemoRunning ? '#34d399' : '#00f0ff',
                borderRadius: '8px',
                padding: '0.55rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Zap size={14} />
              <span>{isDemoRunning ? 'Running...' : 'Live Demo'}</span>
            </button>

            <button
              onClick={() => onRequestDemoModal(node.name)}
              className="btn btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              <span>Request PoC</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      )}

      {/* ===================================================================
          3. BOTTOM 12-STATION NAVIGATOR DOCK
          =================================================================== */}
      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '100%' }}>
        
        {/* Helper text when no station is selected (Desktop only) */}
        {!selectedStation && (
          <div 
            className="hud-desktop-dock"
            style={{
              background: 'rgba(6, 14, 30, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '0.3rem 0.9rem',
              fontSize: '0.74rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono, monospace)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Select any station to inspect 3D telemetry & Archie AI lesson
          </div>
        )}

        {/* 3A. DESKTOP DOCK (769px - 2550px) */}
        <div 
          className="hud-desktop-dock"
          style={{
            background: 'rgba(5, 12, 25, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '16px',
            padding: '0.45rem 0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.35rem',
            maxWidth: 'min(1400px, 96vw)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.75)'
          }}
        >
          {STATION_KEYS.map((key) => {
            const st = ATPL_FACTORY_NODES[key];
            const isActive = selectedStation === key;
            return (
              <button
                key={key}
                onClick={() => onSelectStation(key)}
                style={{
                  background: isActive ? 'rgba(0, 240, 255, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#00f0ff' : '#94a3b8',
                  border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.45)' : 'none',
                  borderRadius: '8px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontWeight: 800 }}>{st.number}</span>
                <span style={{ fontFamily: 'var(--font-display, sans-serif)' }}>{st.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3B. MOBILE HORIZONTAL RIBBON (320px - 768px) */}
        <div 
          className="hud-mobile-ribbon"
          style={{
            background: 'rgba(5, 12, 25, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '999px',
            padding: '0.3rem 0.5rem',
            alignItems: 'center',
            gap: '0.35rem',
            width: 'min(100%, 420px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.85)',
            boxSizing: 'border-box'
          }}
        >
          {/* Quick Prev Station */}
          <button
            onClick={handlePrevStation}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Previous Station"
            aria-label="Previous Station"
          >
            <ChevronLeft size={16} />
          </button>

          {/* 12 Horizontal Station Number Chips (Touch-scrollable) */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              flex: 1,
              padding: '0.1rem 0.2rem'
            }}
          >
            {STATION_KEYS.map((key) => {
              const st = ATPL_FACTORY_NODES[key];
              const isActive = selectedStation === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectStation(key)}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: isActive ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#030a16' : '#ffffff',
                    border: isActive ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isActive ? '0 0 10px #00f0ff' : 'none',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                  title={`${st.number}. ${st.name}`}
                >
                  {st.number}
                </button>
              );
            })}
          </div>

          {/* Quick Next Station */}
          <button
            onClick={handleNextStation}
            style={{
              background: '#0071ba',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Next Station"
            aria-label="Next Station"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
