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

  return (
    <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
      
      {/* ===================================================================
          1. TOP COMMAND BAR
          =================================================================== */}
      <div style={{ pointerEvents: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Left Status Core */}
        <div style={{
          background: 'rgba(6, 14, 30, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-glass-strong, rgba(0,240,255,0.4))',
          borderRadius: '12px',
          padding: '0.6rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="pulse-dot"></span>
            <div>
              <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '0.9rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                SMART FACTORY DIGITAL TWIN
              </div>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: 'var(--cyan-primary, #00f0ff)' }}>
                ATPL GROUP • 12 ACTIVE IOT STATIONS
              </div>
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#34d399', fontFamily: 'var(--font-mono, monospace)' }}>
            <Activity size={14} />
            <span>TELEMETRY ONLINE</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          {/* Reset Overview Camera */}
          <button
            onClick={onResetOverview}
            style={{
              background: isOverview ? 'rgba(0, 240, 255, 0.2)' : 'rgba(10, 22, 44, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              color: isOverview ? 'var(--cyan-primary, #00f0ff)' : '#cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(12px)'
            }}
            title="Reset Camera to Overview"
          >
            <Compass size={15} />
            <span>Overview</span>
          </button>

          {/* Auto Tour Mode */}
          <button
            onClick={onToggleAutoTour}
            style={{
              background: isAutoTour ? 'rgba(16, 185, 129, 0.25)' : 'rgba(10, 22, 44, 0.85)',
              border: isAutoTour ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
              color: isAutoTour ? '#34d399' : '#cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(12px)'
            }}
            title="Auto-tour across all 12 stations"
          >
            {isAutoTour ? <Pause size={15} /> : <Play size={15} />}
            <span>{isAutoTour ? 'Pause Tour' : 'Auto Tour'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            style={{
              background: 'rgba(10, 22, 44, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: soundEnabled ? 'var(--cyan-primary, #00f0ff)' : '#64748b',
              borderRadius: '8px',
              padding: '0.55rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backdropFilter: 'blur(12px)'
            }}
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Quality Selector */}
          <button
            onClick={() => onChangeQuality(quality === 'HIGH' ? 'MED' : quality === 'MED' ? 'LOW' : 'HIGH')}
            style={{
              background: 'rgba(10, 22, 44, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 0.75rem',
              fontSize: '0.74rem',
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

      {/* ===================================================================
          2. FLOATING PRODUCT INFORMATION & LESSON PANEL (When Selected)
          =================================================================== */}
      {node && (
        <div style={{
          pointerEvents: 'auto',
          maxWidth: '480px',
          alignSelf: 'flex-start',
          margin: 'auto 0 1rem 0',
          background: 'rgba(5, 13, 26, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${node.color}`,
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: `0 20px 50px rgba(0,0,0,0.85), 0 0 35px ${node.color}25`,
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
                fontWeight: 900
              }}>
                {node.number}
              </span>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', color: node.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {node.category}
              </span>
            </div>

            <button
              onClick={() => onSelectStation(null)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
              title="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          <h3 style={{ fontSize: '1.35rem', color: '#ffffff', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
            {node.name}
          </h3>

          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 0.85rem 0' }}>
            {node.whatItDoes}
          </p>

          {/* Graphical Station Visual Illustration Preview */}
          <div style={{ marginBottom: '1rem', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
            <StationVisualPreview stationId={node.id} color={node.color} height={105} />
          </div>

          {/* AI Robot Lesson Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '0.9rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--cyan-primary, #00f0ff)', fontFamily: 'var(--font-mono, monospace)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🤖 ATPL AI ROBOT LESSON:</span>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
              {node.lesson}
            </p>
          </div>

          {/* Key Specifications */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              TECHNICAL SPECIFICATIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {node.specs.slice(0, 3).map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={14} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button
              onClick={() => onTriggerDemo(node.id)}
              style={{
                background: isDemoRunning ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 240, 255, 0.15)',
                border: isDemoRunning ? '1px solid #10b981' : '1px solid var(--cyan-primary, #00f0ff)',
                color: isDemoRunning ? '#34d399' : 'var(--cyan-primary, #00f0ff)',
                borderRadius: '8px',
                padding: '0.6rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <Zap size={15} />
              <span>{isDemoRunning ? 'Running Demo...' : 'Live 3D Demo'}</span>
            </button>

            <button
              onClick={() => onRequestDemoModal(node.name)}
              className="btn btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <span>Request PoC</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      )}

      {/* ===================================================================
          3. BOTTOM COMPACT 12-STATION NAVIGATOR DOCK
          =================================================================== */}
      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
        
        {!selectedStation && (
          <div style={{
            background: 'rgba(6, 14, 30, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '0.35rem 1rem',
            fontSize: '0.78rem',
            color: '#94a3b8',
            fontFamily: 'var(--font-mono, monospace)',
            backdropFilter: 'blur(10px)'
          }}>
            Select a station to explore digital twin telemetry & AI lesson
          </div>
        )}

        <div style={{
          background: 'rgba(5, 12, 25, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-glass-strong, rgba(0,240,255,0.35))',
          borderRadius: '16px',
          padding: '0.5rem 0.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.35rem',
          maxWidth: '100%',
          boxShadow: '0 12px 40px rgba(0,0,0,0.75)'
        }}>
          {STATION_KEYS.map((key) => {
            const st = ATPL_FACTORY_NODES[key];
            const isActive = selectedStation === key;
            return (
              <button
                key={key}
                onClick={() => onSelectStation(key)}
                style={{
                  background: isActive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? 'var(--cyan-primary, #00f0ff)' : '#94a3b8',
                  border: isActive ? '1px solid var(--cyan-primary, #00f0ff)' : '1px solid rgba(255, 255, 255, 0.07)',
                  boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.4)' : 'none',
                  borderRadius: '8px',
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{st.number}</span>
                <span style={{ fontFamily: 'var(--font-display, sans-serif)' }}>{st.name}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
