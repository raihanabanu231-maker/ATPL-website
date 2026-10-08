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
  ChevronLeft,
  LogOut
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
  onChangeQuality,
  onExit
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
        zIndex: 15, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: '0.75rem 1.25rem',
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
          .hud-station-card-container {
            top: auto !important;
            bottom: 75px !important;
            left: 0.5rem !important;
            right: 0.5rem !important;
            width: auto !important;
            max-height: 52vh !important;
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
        }
      `}</style>
      
      {/* ===================================================================
          1. TOP COMMAND BAR (Fixed at Top, Never Overlapped)
          =================================================================== */}
      <header style={{ 
        pointerEvents: 'auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '0.6rem',
        width: '100%',
        zIndex: 40
      }}>
        
        {/* Left Status Badge */}
        <div 
          className="hud-status-full"
          style={{
            background: 'rgba(5, 12, 26, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '12px',
            padding: '0.45rem 0.95rem',
            alignItems: 'center',
            gap: '0.85rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
            <div>
              <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '0.86rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                SMART FACTORY DIGITAL TWIN
              </div>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.66rem', color: '#00f0ff' }}>
                ATPL GROUP • 12 3D IOT STATIONS
              </div>
            </div>
          </div>

          <div style={{ height: '22px', width: '1px', background: 'rgba(255,255,255,0.15)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#34d399', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
            <Activity size={13} />
            <span>TELEMETRY LIVE</span>
          </div>
        </div>

        {/* Compact Mobile Badge */}
        <div 
          className="hud-status-compact"
          style={{
            background: 'rgba(5, 12, 26, 0.94)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
          <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '0.76rem', color: '#ffffff' }}>
            3D TWIN <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem' }}>12/12</span>
          </div>
        </div>

        {/* Right Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          
          {/* Reset Overview Camera */}
          <button
            onClick={onResetOverview}
            style={{
              background: isOverview ? 'rgba(0, 240, 255, 0.25)' : 'rgba(10, 22, 44, 0.88)',
              border: isOverview ? '1px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.35)',
              color: isOverview ? '#00f0ff' : '#cbd5e1',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.15s ease'
            }}
            title="Reset Camera to Overview"
          >
            <Compass size={14} />
            <span>Overview</span>
          </button>

          {/* Auto Tour Mode */}
          <button
            onClick={onToggleAutoTour}
            style={{
              background: isAutoTour ? 'rgba(16, 185, 129, 0.28)' : 'rgba(10, 22, 44, 0.88)',
              border: isAutoTour ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.18)',
              color: isAutoTour ? '#34d399' : '#cbd5e1',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.15s ease'
            }}
            title="Automated Guided Tour"
          >
            {isAutoTour ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoTour ? 'Touring' : 'Auto Tour'}</span>
          </button>

          {/* Audio Sound Toggle */}
          <button
            onClick={onToggleSound}
            style={{
              background: 'rgba(10, 22, 44, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: soundEnabled ? '#00f0ff' : '#64748b',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)'
            }}
            title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Quality Switcher */}
          <button
            onClick={() => {
              const nextQ = quality === 'HIGH' ? 'MED' : quality === 'MED' ? 'LOW' : 'HIGH';
              onChangeQuality(nextQ);
            }}
            style={{
              background: 'rgba(10, 22, 44, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: quality === 'HIGH' ? '#34d399' : quality === 'MED' ? '#facc15' : '#94a3b8',
              borderRadius: '8px',
              padding: '0.4rem 0.65rem',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
            title="Toggle Graphics Quality"
          >
            Q: {quality}
          </button>

          {/* EXIT 3D TOUR BUTTON (Prominent & Immediate) */}
          {onExit && (
            <button
              onClick={onExit}
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(185, 28, 28, 0.95))',
                border: '1px solid #f87171',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.42rem 0.95rem',
                fontSize: '0.78rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.45)',
                transition: 'all 0.18s ease'
              }}
              title="Exit 3D Tour & Return to Website"
            >
              <LogOut size={14} />
              <span>Exit 3D</span>
            </button>
          )}
        </div>

      </header>

      {/* ===================================================================
          2. DOCKED STATION DETAILS CARD (Cleanly Positioned, No Overlap)
          =================================================================== */}
      {!isAutoTour && node && (
        <div 
          className="hud-station-card-container"
          style={{
            position: 'absolute',
            top: '75px',
            left: '1.25rem',
            bottom: '80px',
            width: 'min(430px, calc(100vw - 2.5rem))',
            zIndex: 35,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div 
            className="factory-hud-scrollbar"
            style={{
              background: 'rgba(5, 13, 26, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1.5px solid ${node.color || '#00f0ff'}`,
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 35px ${node.color || '#00f0ff'}30`,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Header with Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  background: node.color || '#00f0ff',
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
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: node.color || '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
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
                  padding: '0.3rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close Station Details"
              >
                <X size={15} />
              </button>
            </div>

            {/* Title & Tagline */}
            <h2 style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 0.35rem 0'
            }}>
              {node.name}
            </h2>
            <p style={{
              fontSize: '0.8rem',
              color: '#94a3b8',
              margin: '0 0 0.85rem 0',
              lineHeight: '1.45'
            }}>
              {node.tagline}
            </p>

            {/* High-Resolution Photo Preview */}
            <div style={{ marginBottom: '0.85rem' }}>
              <StationVisualPreview
                stationId={selectedStation}
                color={node.color}
                height={150}
              />
            </div>

            {/* Archie AI Educational Insight */}
            <div style={{
              background: 'rgba(0, 113, 186, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem',
              marginBottom: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00f0ff', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.3rem' }}>
                <Sparkles size={13} />
                <span>ARCHIE AI INDUSTRIAL VALUE:</span>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#e2e8f0', margin: 0, lineHeight: '1.45' }}>
                {node.lesson}
              </p>
            </div>

            {/* Live Telemetry Data Box */}
            {node.telemetry && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.65rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                marginBottom: '0.85rem'
              }}>
                {Object.entries(node.telemetry).map(([mKey, mVal]) => (
                  <div key={mKey}>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono, monospace)' }}>
                      {mKey.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00f0ff', fontFamily: 'var(--font-mono, monospace)', marginTop: '0.1rem' }}>
                      {mVal}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Specifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                Technical Capabilities:
              </div>
              {node.specs?.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                onClick={() => onTriggerDemo(selectedStation)}
                disabled={isDemoRunning}
                style={{
                  width: '100%',
                  background: isDemoRunning 
                    ? '#10b981' 
                    : `linear-gradient(135deg, ${node.color || '#00f0ff'}, #0071ba)`,
                  color: isDemoRunning ? '#040914' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.6rem',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  cursor: isDemoRunning ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: `0 0 16px ${node.color || '#00f0ff'}50`
                }}
              >
                <Zap size={14} />
                <span>{isDemoRunning ? 'SIMULATING...' : node.demoActionName || 'Run Live Demo'}</span>
              </button>

              <button
                onClick={() => onRequestDemoModal(node.name)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '0.55rem',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Request Enterprise PoC</span>
                <ExternalLink size={13} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================
          3. BOTTOM 12-STATION DOCKED CAROUSEL (Touch & Click Friendly)
          =================================================================== */}
      <footer style={{ 
        pointerEvents: 'auto', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        zIndex: 40
      }}>
        
        {/* Desktop Dock Ribbon */}
        <div 
          className="hud-desktop-dock"
          style={{
            background: 'rgba(5, 12, 25, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '999px',
            padding: '0.35rem 0.6rem',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.85)'
          }}
        >
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
              cursor: 'pointer'
            }}
            title="Previous Station"
          >
            <ChevronLeft size={16} />
          </button>

          {STATION_KEYS.map((key) => {
            const st = ATPL_FACTORY_NODES[key];
            const isActive = selectedStation === key;
            return (
              <button
                key={key}
                onClick={() => onSelectStation(key)}
                style={{
                  background: isActive ? 'rgba(0, 240, 255, 0.22)' : 'transparent',
                  border: isActive ? `1.5px solid ${st.color || '#00f0ff'}` : '1px solid transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  borderRadius: '20px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isActive ? `0 0 12px ${st.color || '#00f0ff'}40` : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono, monospace)', color: st.color || '#00f0ff', fontWeight: 800 }}>
                  {st.number}
                </span>
                <span>{st.name}</span>
              </button>
            );
          })}

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
              cursor: 'pointer'
            }}
            title="Next Station"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile Dock Ribbon */}
        <div 
          className="hud-mobile-ribbon"
          style={{
            background: 'rgba(5, 12, 25, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '999px',
            padding: '0.3rem 0.5rem',
            alignItems: 'center',
            gap: '0.35rem',
            width: 'min(100%, 380px)'
          }}
        >
          <button
            onClick={handlePrevStation}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={15} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto', flex: 1 }}>
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
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {st.number}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextStation}
            style={{
              background: '#0071ba',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={15} />
          </button>
        </div>

      </footer>

    </div>
  );
};
