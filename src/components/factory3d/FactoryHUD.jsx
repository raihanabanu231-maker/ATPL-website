import React, { useState } from 'react';
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
  LogOut,
  FolderGit2,
  Award,
  Building2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { ATPL_FACTORY_NODES, STATION_KEYS, ATPL_PROJECT_SHOWCASE, ATPL_CLIENT_LOGOS } from '../../data/factoryStations3D';
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
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

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

  const filteredProjects = selectedFilter === 'ALL'
    ? ATPL_PROJECT_SHOWCASE
    : ATPL_PROJECT_SHOWCASE.filter(p => p.sector.toLowerCase().includes(selectedFilter.toLowerCase()) || p.title.toLowerCase().includes(selectedFilter.toLowerCase()));

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
          
          {/* Real Projects & Pitch Deck Showcase Button */}
          <button
            onClick={() => setShowProjectsModal(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.92), rgba(0, 240, 255, 0.85))',
              border: '1px solid #00f0ff',
              color: '#030a16',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
              transition: 'all 0.15s ease'
            }}
            title="View Real Client Projects & Pitch Deck Case Studies"
          >
            <FolderGit2 size={14} />
            <span>📁 Projects & Case Studies</span>
          </button>

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
            width: 'min(440px, calc(100vw - 2.5rem))',
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
            {/* Card Header with Station Number, Category & Close Button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${node.color || '#00f0ff'}25`,
                  border: `1.5px solid ${node.color || '#00f0ff'}`,
                  color: node.color || '#00f0ff',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 900,
                  fontSize: '0.9rem'
                }}>
                  {node.number}
                </span>
                <div>
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: node.color || '#00f0ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 700
                  }}>
                    {node.category}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    Interactive 3D Station
                  </div>
                </div>
              </div>

              {/* Close Button to Dismiss Card & View 3D Scene Clearly */}
              <button
                onClick={onResetOverview}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#94a3b8',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
                title="Close Station Card"
              >
                <X size={15} />
              </button>
            </div>

            {/* Title & Tagline */}
            <h2 style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '1.2rem',
              fontWeight: 800,
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
                height={140}
              />
            </div>

            {/* ⭐ REAL CLIENT PROJECT CASE STUDY BADGE (From Pitch Deck) */}
            {node.realProject && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 113, 186, 0.18), rgba(0, 240, 255, 0.08))',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '10px',
                padding: '0.75rem',
                marginBottom: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Award size={12} color="#00f0ff" />
                    <span>REAL CLIENT PROJECT DEPLOYMENT</span>
                  </span>
                  <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>{node.realProject.clientType}</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem' }}>
                  "{node.realProject.headline}"
                </div>
                <p style={{ fontSize: '0.73rem', color: '#cbd5e1', margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
                  {node.realProject.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {node.realProject.metrics?.map((m, i) => (
                    <span key={i} style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.18rem 0.45rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
              <p style={{ fontSize: '0.75rem', color: '#e2e8f0', margin: 0, lineHeight: '1.45' }}>
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
          3. REAL CLIENT PROJECTS & PITCH DECK SHOWCASE MODAL
          =================================================================== */}
      {showProjectsModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(3, 10, 22, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            pointerEvents: 'auto'
          }}
          onClick={() => setShowProjectsModal(false)}
        >
          <div 
            style={{
              background: 'linear-gradient(180deg, #071326 0%, #030a16 100%)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '20px',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 240, 255, 0.15)',
              boxSizing: 'border-box',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
            className="factory-hud-scrollbar"
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00f0ff', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                  <FolderGit2 size={16} />
                  <span>ATPL CORPORATE PROJECTS & PROVEN RESULTS</span>
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Real-World <span style={{ color: '#00f0ff' }}>Customer Success Stories</span>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0.4rem 0 0 0' }}>
                  Proven business outcomes delivered across 500+ industrial deployments in Automotive, FMCG, Warehousing, and Rubber manufacturing.
                </p>
              </div>

              <button
                onClick={() => setShowProjectsModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Verified Enterprise Credentials Bar */}
            <div style={{
              background: 'rgba(0, 113, 186, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#10b981" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>ISO 9001:2015 Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="#f59e0b" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Honeywell Gold Partner & Distributor</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={18} color="#00f0ff" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>DIPP Startup India Certified</span>
              </div>
            </div>

            {/* Grid of Projects */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {filteredProjects.map((proj) => {
                const targetNode = ATPL_FACTORY_NODES[proj.stationId];
                return (
                  <div
                    key={proj.id}
                    style={{
                      background: 'rgba(10, 22, 44, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00f0ff', textTransform: 'uppercase' }}>
                        {proj.sector}
                      </span>
                      <span style={{ fontSize: '1.2rem' }}>{proj.icon}</span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.4rem 0' }}>
                      {proj.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.75rem' }}>
                      Client: <span style={{ color: '#e2e8f0' }}>{proj.client}</span>
                    </div>

                    <div style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                      padding: '0.6rem 0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', marginBottom: '0.2rem' }}>
                        "{proj.headline}"
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {proj.challenge}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', flex: 1 }}>
                      {proj.results.map((res, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1' }}>
                          <CheckCircle2 size={13} color="#10b981" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button to Fly 3D Camera Directly to Station */}
                    <button
                      onClick={() => {
                        setShowProjectsModal(false);
                        onSelectStation(proj.stationId);
                      }}
                      style={{
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.4)',
                        color: '#00f0ff',
                        borderRadius: '8px',
                        padding: '0.55rem',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#00f0ff';
                        e.currentTarget.style.color = '#030a16';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
                        e.currentTarget.style.color = '#00f0ff';
                      }}
                    >
                      <span>Inspect Station #{targetNode?.number} in 3D</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Client Logos Wall (From Slide 28) */}
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', textAlign: 'center' }}>
                TRUSTED BY LEADING ENTERPRISES ACROSS INDIA
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                {ATPL_CLIENT_LOGOS.map((client, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#e2e8f0',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px'
                    }}
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================
          4. BOTTOM 12-STATION DOCKED CAROUSEL (Touch & Click Friendly)
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
