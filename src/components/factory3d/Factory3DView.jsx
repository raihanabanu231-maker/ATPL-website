import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';
import blueprintImg from '../../../assets/images/atpl_isometric_factory.jpg';
import { AtplRobotAvatar } from '../common/AtplRobotAvatar';
import { 
  Sparkles, 
  Compass, 
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
  Camera,
  Cpu,
  ShieldCheck,
  Eye,
  Sliders
} from 'lucide-react';

/* =========================================================================
   SYNTHETIC CYBERNETIC AUDIO FX (Web Audio API - Zero External Dependencies)
   ========================================================================= */
const playAudioFX = (type, enabled) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1180, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'demo') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    // Ignore autoplay restriction
  }
};

/* =========================================================================
   CATEGORY DEFINITIONS FOR QUICK FILTERING
   ========================================================================= */
const CATEGORIES = [
  { id: 'ALL', label: 'All Stations (12)' },
  { id: 'TRACE_WMS', label: 'Trace & WMS', keys: ['perfectTrace', 'perfectAudit', 'perfectWarehouse'] },
  { id: 'HARDWARE', label: 'Hardware & RFID', keys: ['rfidPortals', 'scanners', 'printers'] },
  { id: 'ROBOTICS_AI', label: 'Robotics & AI', keys: ['industrialRobots', 'visionAi', 'inspectionDrones'] },
  { id: 'CLOUD_MES', label: 'Cloud & MES', keys: ['erpSync', 'software', 'pms'] }
];

export const Factory3DView = () => {
  const { setCurrentView, openDemoModal } = useApp();
  
  const [selectedStation, setSelectedStation] = useState('perfectTrace');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('plant'); // 'plant' (isometric digital twin) or 'studio' (4K machine inspection)
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const activeNode = selectedStation ? ATPL_FACTORY_NODES[selectedStation] : ATPL_FACTORY_NODES.perfectTrace;

  // Scroll to top immediately when 3D view mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Filtered station keys
  const visibleStationKeys = activeCategory === 'ALL' 
    ? STATION_KEYS 
    : (CATEGORIES.find(c => c.id === activeCategory)?.keys || STATION_KEYS);

  // Station Selection Handler
  const handleSelectStation = useCallback((stationKey) => {
    setSelectedStation(stationKey);
    setIsAutoTour(false);
    playAudioFX('select', soundEnabled);
  }, [soundEnabled]);

  // Next / Prev Station
  const currentIdx = selectedStation ? STATION_KEYS.indexOf(selectedStation) : 0;
  const handleNextStation = () => {
    const nextIdx = (currentIdx + 1) % STATION_KEYS.length;
    handleSelectStation(STATION_KEYS[nextIdx]);
  };
  const handlePrevStation = () => {
    const prevIdx = (currentIdx - 1 + STATION_KEYS.length) % STATION_KEYS.length;
    handleSelectStation(STATION_KEYS[prevIdx]);
  };

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      setSelectedStation((prev) => {
        const idx = prev ? STATION_KEYS.indexOf(prev) : -1;
        const nextIdx = (idx + 1) % STATION_KEYS.length;
        return STATION_KEYS[nextIdx];
      });
      playAudioFX('select', soundEnabled);
    }, 6500);

    return () => clearInterval(timer);
  }, [isAutoTour, soundEnabled]);

  // Trigger Live Simulation Demo
  const handleTriggerDemo = () => {
    setIsDemoRunning(true);
    playAudioFX('demo', soundEnabled);
    setTimeout(() => {
      setIsDemoRunning(false);
    }, 3200);
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Pan & Drag Handlers for Digital Twin Canvas
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedStation(null);
    playAudioFX('select', soundEnabled);
  };

  return (
    <div 
      ref={containerRef}
      className="factory-twin-command-center"
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100dvh - 65px)',
        minHeight: 'calc(100dvh - 65px)',
        background: '#040814',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes nodePulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7); }
          70% { transform: scale(1.12); box-shadow: 0 0 0 16px rgba(0, 240, 255, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 240, 255, 0); }
        }
        @keyframes floatingRobot {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glowBorder {
          0%, 100% { border-color: rgba(0, 240, 255, 0.4); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
          50% { border-color: rgba(0, 240, 255, 0.9); box-shadow: 0 0 35px rgba(0, 240, 255, 0.5); }
        }

        .twin-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .twin-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
        }
        .twin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.4);
          border-radius: 4px;
        }

        @media (max-width: 900px) {
          .twin-sidebar-dock {
            display: none !important;
          }
          .twin-mobile-drawer {
            display: flex !important;
          }
          .twin-header-title-sub {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .twin-sidebar-dock {
            display: flex !important;
          }
          .twin-mobile-drawer {
            display: none !important;
          }
        }
      `}</style>

      {/* ===================================================================
          1. TOP EXECUTIVE COMMAND HEADER
          =================================================================== */}
      <header style={{
        position: 'relative',
        zIndex: 30,
        background: 'rgba(5, 12, 28, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.3)',
        padding: '0.6rem 1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.7)'
      }}>
        {/* Brand & Digital Twin Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 12px #10b981',
              animation: 'nodePulse 2s infinite'
            }}></span>
            <div>
              <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, fontSize: '0.95rem', color: '#ffffff', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                ATPL SMART FACTORY <span style={{ color: '#00f0ff', fontSize: '0.72rem', background: 'rgba(0, 240, 255, 0.15)', padding: '0.1rem 0.45rem', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.4)' }}>DIGITAL TWIN 4.0</span>
              </div>
              <div className="twin-header-title-sub" style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                ENTERPRISE TELEMETRY • 12/12 SENSOR NODES SYNCHRONIZED
              </div>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '0.2rem',
            borderRadius: '8px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            marginLeft: '0.5rem'
          }}>
            <button
              onClick={() => { setViewMode('plant'); playAudioFX('select', soundEnabled); }}
              style={{
                background: viewMode === 'plant' ? '#00f0ff' : 'transparent',
                color: viewMode === 'plant' ? '#040814' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={13} />
              <span>Plant Digital Twin</span>
            </button>
            <button
              onClick={() => { setViewMode('studio'); playAudioFX('select', soundEnabled); }}
              style={{
                background: viewMode === 'studio' ? '#00f0ff' : 'transparent',
                color: viewMode === 'studio' ? '#040814' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Camera size={13} />
              <span>4K Machine Studio</span>
            </button>
          </div>
        </div>

        {/* Center Category Filters (Desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.keys && !cat.keys.includes(selectedStation)) {
                  handleSelectStation(cat.keys[0]);
                }
                playAudioFX('select', soundEnabled);
              }}
              style={{
                background: activeCategory === cat.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: activeCategory === cat.id ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                color: activeCategory === cat.id ? '#00f0ff' : '#cbd5e1',
                borderRadius: '6px',
                padding: '0.28rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: activeCategory === cat.id ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Controls & Exit Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Auto Tour Toggle */}
          <button
            onClick={() => { setIsAutoTour(!isAutoTour); playAudioFX('select', soundEnabled); }}
            style={{
              background: isAutoTour ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: isAutoTour ? '#040814' : '#34d399',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
          >
            {isAutoTour ? <Pause size={13} /> : <Play size={13} />}
            <span>{isAutoTour ? 'Touring...' : 'Auto Tour'}</span>
          </button>

          {/* Audio Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: soundEnabled ? '#00f0ff' : '#64748b',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetView}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Reset Canvas View"
          >
            <Compass size={16} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* EXIT 3D BUTTON (Prominent & Immediate) */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              setCurrentView('home');
            }}
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
              gap: '0.4rem',
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.45)',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={15} />
            <span>EXIT 3D</span>
          </button>

        </div>
      </header>

      {/* ===================================================================
          2. MAIN STAGE CONTENT (Plant Map OR 4K Machine Studio)
          =================================================================== */}
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex'
      }}>

        {/* =================================================================
            VIEW MODE A: HIGH-RESOLUTION ISOMETRIC PLANT DIGITAL TWIN
            ================================================================= */}
        {viewMode === 'plant' && (
          <div 
            style={{
              position: 'relative',
              flex: 1,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 113, 186, 0.15) 0%, rgba(4, 8, 20, 0.98) 75%)',
              pointerEvents: 'none'
            }}></div>

            {/* Transformable Interactive Factory Map Canvas */}
            <div style={{
              position: 'relative',
              width: 'min(1400px, 94vw)',
              aspectRatio: '16/9',
              maxHeight: 'calc(100dvh - 180px)',
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              overflow: 'hidden'
            }}>
              
              {/* Photorealistic Factory Isometric Master Render */}
              <img 
                src={blueprintImg}
                alt="ATPL Smart Factory Digital Twin 3D Blueprint"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.08) brightness(0.95)'
                }}
                draggable={false}
              />

              {/* Laser Scanline Beam Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                boxShadow: '0 0 15px #00f0ff, 0 0 30px #00f0ff',
                animation: 'scanline 8s linear infinite',
                pointerEvents: 'none'
              }}></div>

              {/* 12 Interactive Station Pulse Hotspots */}
              {visibleStationKeys.map((key) => {
                const node = ATPL_FACTORY_NODES[key];
                if (!node || node.mapX === undefined || node.mapY === undefined) return null;
                const isSelected = selectedStation === key;

                return (
                  <div
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectStation(key);
                    }}
                    style={{
                      position: 'absolute',
                      left: `${node.mapX}%`,
                      top: `${node.mapY}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isSelected ? 25 : 15,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {/* Glowing Pulse Ring & Icon Marker */}
                    <div style={{
                      position: 'relative',
                      width: isSelected ? '46px' : '36px',
                      height: isSelected ? '46px' : '36px',
                      borderRadius: '50%',
                      background: isSelected 
                        ? 'radial-gradient(circle, #00f0ff 0%, #0071ba 100%)' 
                        : 'rgba(6, 16, 36, 0.92)',
                      border: isSelected 
                        ? '3px solid #ffffff' 
                        : `2px solid ${node.color || '#00f0ff'}`,
                      boxShadow: isSelected 
                        ? `0 0 25px ${node.color || '#00f0ff'}, 0 0 50px rgba(0, 240, 255, 0.8)` 
                        : `0 0 14px ${node.color || '#00f0ff'}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isSelected ? '1.3rem' : '1.05rem',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      animation: isSelected ? 'nodePulse 2s infinite' : 'none'
                    }}>
                      <span>{node.icon}</span>
                      
                      {/* Station Number Badge */}
                      <span style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        background: '#040814',
                        color: node.color || '#00f0ff',
                        border: `1.5px solid ${node.color || '#00f0ff'}`,
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono, monospace)'
                      }}>
                        {node.number}
                      </span>
                    </div>

                    {/* Glassmorphic Station Label Pill */}
                    <div style={{
                      background: isSelected ? 'rgba(0, 240, 255, 0.95)' : 'rgba(4, 12, 28, 0.85)',
                      color: isSelected ? '#040814' : '#ffffff',
                      border: isSelected ? '1px solid #ffffff' : '1px solid rgba(0, 240, 255, 0.4)',
                      borderRadius: '6px',
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
                      fontFamily: 'var(--font-display, sans-serif)',
                      letterSpacing: '0.02em',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {node.name}
                    </div>

                    {/* Floating Telemetry Tag (Active Station) */}
                    {isSelected && node.telemetry && (
                      <div style={{
                        position: 'absolute',
                        bottom: -28,
                        background: 'rgba(16, 185, 129, 0.92)',
                        color: '#040814',
                        padding: '0.12rem 0.45rem',
                        borderRadius: '4px',
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-mono, monospace)',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)'
                      }}>
                        {Object.values(node.telemetry)[0]}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Traveling Archie AI Tour Guide Mascot */}
              {activeNode && activeNode.mapX !== undefined && (
                <div style={{
                  position: 'absolute',
                  left: `${activeNode.mapX}%`,
                  top: `${Math.max(12, activeNode.mapY - 14)}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 28,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  animation: 'floatingRobot 3s ease-in-out infinite',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  <div style={{
                    background: 'rgba(0, 113, 186, 0.9)',
                    padding: '0.35rem',
                    borderRadius: '50%',
                    border: '2px solid #00f0ff',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)'
                  }}>
                    <AtplRobotAvatar size={38} isTalking={isAutoTour || isDemoRunning} />
                  </div>
                  <div style={{
                    background: 'rgba(6, 16, 36, 0.95)',
                    border: '1px solid #00f0ff',
                    borderRadius: '8px',
                    padding: '0.35rem 0.65rem',
                    color: '#00f0ff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
                  }}>
                    ARCHIE AI • STATION #{activeNode.number}
                  </div>
                </div>
              )}

            </div>

            {/* Canvas Zoom Controls (Floating Bottom-Left) */}
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(6, 14, 30, 0.9)',
              padding: '0.3rem 0.6rem',
              borderRadius: '8px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              zIndex: 25,
              backdropFilter: 'blur(12px)'
            }}>
              <button
                onClick={() => setZoomLevel(Math.min(2.2, zoomLevel + 0.2))}
                style={{ background: 'transparent', border: 'none', color: '#00f0ff', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', padding: '0 0.4rem' }}
                title="Zoom In"
              >
                +
              </button>
              <span style={{ color: '#ffffff', fontSize: '0.72rem', fontFamily: 'var(--font-mono, monospace)', minWidth: '45px', textAlign: 'center' }}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.2))}
                style={{ background: 'transparent', border: 'none', color: '#00f0ff', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', padding: '0 0.4rem' }}
                title="Zoom Out"
              >
                -
              </button>
              <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)', margin: '0 0.2rem' }}></div>
              <button
                onClick={handleResetView}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            VIEW MODE B: CINEMATIC 4K MACHINERY STUDIO INSPECTION
            ================================================================= */}
        {viewMode === 'studio' && (
          <div style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.75rem, 2vw, 2rem)',
            boxSizing: 'border-box',
            overflowY: 'auto'
          }}>
            <div style={{
              width: 'min(1200px, 100%)',
              background: 'rgba(6, 14, 30, 0.95)',
              border: `2px solid ${activeNode.color || '#00f0ff'}`,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: `0 0 50px ${activeNode.color || '#00f0ff'}40, 0 30px 80px rgba(0,0,0,0.9)`,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              padding: 'clamp(1rem, 2vw, 2rem)'
            }}>
              
              {/* Left Column: 4K Machinery Photo & Live Simulation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                }}>
                  <img
                    src={activeNode.image}
                    alt={activeNode.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  
                  {/* Status Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(4, 9, 20, 0.88)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 240, 255, 0.5)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#00f0ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                    <span>HD 4K SENSOR FEED</span>
                  </div>

                  {/* Station Number Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: activeNode.color || '#00f0ff',
                    color: '#040814',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display, sans-serif)'
                  }}>
                    STATION #{activeNode.number}
                  </div>
                </div>

                {/* Simulation Trigger Bar */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>LIVE DIGITAL TWIN BENCHMARK</div>
                    <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 800, marginTop: '0.1rem' }}>
                      {activeNode.demoActionName || 'Execute Station Cycle'}
                    </div>
                  </div>
                  <button
                    onClick={handleTriggerDemo}
                    disabled={isDemoRunning}
                    style={{
                      background: isDemoRunning 
                        ? '#10b981' 
                        : `linear-gradient(135deg, ${activeNode.color || '#00f0ff'}, #0071ba)`,
                      color: isDemoRunning ? '#040814' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.15rem',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      cursor: isDemoRunning ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: `0 0 20px ${activeNode.color || '#00f0ff'}60`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Zap size={15} />
                    <span>{isDemoRunning ? 'SIMULATION RUNNING...' : 'SIMULATE NOW'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Station Specs & Telemetry Dials */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeNode.color || '#00f0ff', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span>{activeNode.category}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '0.3rem 0 0.5rem 0' }}>
                    {activeNode.title}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                    {activeNode.lesson}
                  </p>
                </div>

                {/* Live Telemetry Gauges Grid */}
                {activeNode.telemetry && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem'
                  }}>
                    {Object.entries(activeNode.telemetry).map(([metricKey, metricVal]) => (
                      <div
                        key={metricKey}
                        style={{
                          background: 'rgba(15, 23, 42, 0.7)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '0.6rem 0.85rem'
                        }}
                      >
                        <div style={{ fontSize: '0.66rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono, monospace)' }}>
                          {metricKey.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#00f0ff', marginTop: '0.15rem', fontFamily: 'var(--font-mono, monospace)' }}>
                          {metricVal}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Specifications Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {activeNode.specs?.map((spec, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Row */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => openDemoModal({ solution: activeNode.name, notes: `Executive inquiry from 4K Digital Twin Studio.` })}
                    style={{
                      flex: 1,
                      background: '#00f0ff',
                      color: '#040814',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                    }}
                  >
                    <span>Schedule Production PoC</span>
                    <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('plant')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Back to Plant Map
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* =================================================================
            3. DESKTOP DOCKED SIDEBAR (Station Insights & Specs)
            ================================================================= */}
        {viewMode === 'plant' && (
          <aside 
            className="twin-sidebar-dock twin-scrollbar"
            style={{
              width: '380px',
              maxWidth: '380px',
              background: 'rgba(5, 12, 28, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(0, 240, 255, 0.3)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              overflowY: 'auto',
              zIndex: 20,
              boxShadow: '-10px 0 35px rgba(0,0,0,0.7)'
            }}
          >
            {/* Top Navigation Ribbon */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: activeNode.color || '#00f0ff', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Activity size={14} />
                <span>STATION {activeNode.number} OF 12</span>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button
                  onClick={handlePrevStation}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: '6px', padding: '0.25rem', cursor: 'pointer' }}
                  title="Previous Station"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextStation}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: '6px', padding: '0.25rem', cursor: 'pointer' }}
                  title="Next Station"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Station Title & 4K Photo Preview */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.4rem 0' }}>
                {activeNode.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 0.85rem 0', lineHeight: '1.4' }}>
                {activeNode.tagline}
              </p>

              {/* 4K Station Photo Card */}
              <div 
                onClick={() => { setViewMode('studio'); playAudioFX('select', soundEnabled); }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '140px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: `1px solid ${activeNode.color || '#00f0ff'}80`,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
              >
                <img
                  src={activeNode.image}
                  alt={activeNode.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(4, 9, 20, 0.9) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.6rem',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.68rem', color: '#00f0ff', fontWeight: 800, fontFamily: 'var(--font-mono, monospace)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Eye size={12} /> Click to Inspect in 4K Studio
                  </span>
                  <span style={{ background: '#10b981', color: '#040814', fontSize: '0.6rem', fontWeight: 900, padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                    LIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Archie AI Lesson / Value Explanation */}
            <div style={{
              background: 'rgba(0, 113, 186, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                <AtplRobotAvatar size={24} />
              </div>
              <div style={{ fontSize: '0.74rem', color: '#e2e8f0', lineHeight: '1.45' }}>
                {activeNode.lesson}
              </div>
            </div>

            {/* Live Telemetry Stream */}
            {activeNode.telemetry && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.65rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem'
              }}>
                {Object.entries(activeNode.telemetry).map(([mKey, mVal]) => (
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

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={handleTriggerDemo}
                disabled={isDemoRunning}
                style={{
                  width: '100%',
                  background: isDemoRunning 
                    ? '#10b981' 
                    : `linear-gradient(135deg, ${activeNode.color || '#00f0ff'}, #0071ba)`,
                  color: isDemoRunning ? '#040814' : '#ffffff',
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
                  boxShadow: `0 0 16px ${activeNode.color || '#00f0ff'}50`,
                  transition: 'all 0.2s ease'
                }}
              >
                <Zap size={14} />
                <span>{isDemoRunning ? 'SIMULATING...' : activeNode.demoActionName || 'Run Live Demo'}</span>
              </button>

              <button
                onClick={() => openDemoModal({ solution: activeNode.name, notes: `Digital twin inquiry for ${activeNode.name}` })}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
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

          </aside>
        )}

      </div>

      {/* ===================================================================
          4. BOTTOM QUICK-SELECT STATION RIBBON
          =================================================================== */}
      <nav 
        className="twin-scrollbar"
        style={{
          position: 'relative',
          zIndex: 25,
          background: 'rgba(5, 12, 28, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 240, 255, 0.3)',
          padding: '0.45rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          overflowX: 'auto',
          boxShadow: '0 -8px 25px rgba(0,0,0,0.6)'
        }}
      >
        {visibleStationKeys.map((key) => {
          const node = ATPL_FACTORY_NODES[key];
          if (!node) return null;
          const isSelected = selectedStation === key;

          return (
            <button
              key={key}
              onClick={() => handleSelectStation(key)}
              style={{
                flexShrink: 0,
                background: isSelected 
                  ? 'rgba(0, 240, 255, 0.22)' 
                  : 'rgba(15, 23, 42, 0.8)',
                border: isSelected 
                  ? `2px solid ${node.color || '#00f0ff'}` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                borderRadius: '8px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: isSelected ? 800 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: isSelected ? `0 0 15px ${node.color || '#00f0ff'}40` : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>{node.icon}</span>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', color: node.color || '#00f0ff', fontWeight: 800 }}>
                {node.number}
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>{node.name}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
