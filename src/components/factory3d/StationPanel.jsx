import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ExternalLink, 
  Award, 
  Activity, 
  Layers, 
  Image as ImageIcon,
  Cpu
} from 'lucide-react';
import { StationVisualPreview } from './StationVisuals';

export const StationPanel = ({
  station,
  onClose,
  isDemoRunning,
  onTriggerDemo,
  onRequestDemoModal
}) => {
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'diagram'

  if (!station) return null;

  return (
    <aside 
      className="station-detail-panel"
      role="region"
      aria-label={`${station.name} Station Details`}
      style={{
        position: 'absolute',
        top: '75px',
        left: '1.25rem',
        bottom: '85px',
        width: 'min(450px, calc(100vw - 2.5rem))',
        zIndex: 35,
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div 
        className="factory-hud-scrollbar"
        style={{
          background: 'rgba(2, 16, 28, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid #FFC93C',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(255, 201, 60, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Header: Station Badge, Category & Close Button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'rgba(255, 201, 60, 0.15)',
              border: '1.5px solid #FFC93C',
              color: '#FFC93C',
              fontFamily: 'monospace, var(--font-mono)',
              fontWeight: 900,
              fontSize: '0.95rem'
            }}>
              {station.number}
            </span>
            <div>
              <div style={{
                fontSize: '0.68rem',
                fontFamily: 'monospace, var(--font-mono)',
                color: '#18E0FF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 700
              }}>
                {station.category}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                ATPL Smart Connected Node
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close station details"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94A3B8',
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
              e.currentTarget.style.backgroundColor = 'rgba(240, 69, 94, 0.3)';
              e.currentTarget.style.color = '#F0455E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#94A3B8';
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Station Title & Tagline */}
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#FFFFFF',
          margin: '0 0 0.35rem 0',
          lineHeight: '1.25'
        }}>
          {station.title}
        </h2>
        <p style={{
          fontSize: '0.8rem',
          color: '#94A3B8',
          margin: '0 0 0.85rem 0',
          lineHeight: '1.45'
        }}>
          {station.tagline}
        </p>

        {/* View Mode Toggle: Authentic Hardware View / Diagram */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
        }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '2px' }}>
            <button
              onClick={() => setViewMode('photo')}
              style={{
                background: viewMode === 'photo' ? '#0070C0' : 'transparent',
                color: viewMode === 'photo' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ImageIcon size={12} />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setViewMode('diagram')}
              style={{
                background: viewMode === 'diagram' ? '#0070C0' : 'transparent',
                color: viewMode === 'diagram' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Cpu size={12} />
              <span>Diagram</span>
            </button>
          </div>

          {/* Latency & Telemetry Badge */}
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'monospace, var(--font-mono)',
            fontWeight: 800,
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px'
          }}>
            {station.latencyBadge}
          </span>
        </div>

        {/* Product Visual Preview */}
        <div style={{ marginBottom: '0.85rem' }}>
          <StationVisualPreview
            stationId={station.id}
            color={station.color}
            height={140}
          />
        </div>

        {/* Special Case: Vision AI PASS/FAIL Result Table */}
        {station.visionTableData && (
          <div style={{
            background: 'rgba(10, 24, 46, 0.8)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '8px',
            padding: '0.65rem',
            marginBottom: '0.85rem'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>AI Optical Inspection Output</span>
              <span style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>OVERALL: PASS</span>
            </div>
            <table style={{ width: '100%', fontSize: '0.7rem', color: '#CBD5E1', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '0.2rem 0' }}>Feature Name</th>
                  <th style={{ padding: '0.2rem 0', textAlign: 'center' }}>Expected</th>
                  <th style={{ padding: '0.2rem 0', textAlign: 'center' }}>Detected</th>
                  <th style={{ padding: '0.2rem 0', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {station.visionTableData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.25rem 0', fontFamily: 'monospace' }}>{row.item}</td>
                    <td style={{ padding: '0.25rem 0', textAlign: 'center' }}>{row.expected}</td>
                    <td style={{ padding: '0.25rem 0', textAlign: 'center' }}>{row.detected}</td>
                    <td style={{ padding: '0.25rem 0', textAlign: 'right', color: '#10B981', fontWeight: 800 }}>✓ PASS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ⭐ Real Client Project Case Study Card */}
        {station.clientProject && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 112, 192, 0.15), rgba(24, 224, 255, 0.08))',
            border: '1px solid rgba(24, 224, 255, 0.35)',
            borderRadius: '10px',
            padding: '0.75rem',
            marginBottom: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#18E0FF', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Award size={12} color="#18E0FF" />
                <span>CUSTOMER SUCCESS STORY</span>
              </span>
              <span style={{ fontSize: '0.64rem', color: '#94A3B8' }}>{station.clientProject.clientType}</span>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
              "{station.clientProject.headline}"
            </div>
            <p style={{ fontSize: '0.74rem', color: '#CBD5E1', margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
              {station.clientProject.solution}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {station.clientProject.impact?.map((m, i) => (
                <span key={i} style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.18rem 0.45rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                  ✓ {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Archie AI Educational Lesson Box */}
        <div style={{
          background: 'rgba(0, 112, 192, 0.12)',
          border: '1px solid rgba(24, 224, 255, 0.3)',
          borderRadius: '10px',
          padding: '0.75rem',
          marginBottom: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#18E0FF', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.3rem' }}>
            <Sparkles size={13} />
            <span>ARCHIE AI LESSON:</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#E2E8F0', margin: 0, lineHeight: '1.45' }}>
            {station.archieLesson}
          </p>
        </div>

        {/* Technical Capabilities Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
            Technical Capabilities:
          </div>
          {station.specs?.map((spec, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: '#CBD5E1' }}>
              <CheckCircle2 size={13} color="#10B981" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        {/* Actions: Live Demo & Request PoC Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            onClick={() => onTriggerDemo(station.id)}
            disabled={isDemoRunning}
            style={{
              width: '100%',
              background: isDemoRunning 
                ? '#10B981' 
                : 'linear-gradient(135deg, #0070C0, #18E0FF)',
              color: isDemoRunning ? '#02101C' : '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.62rem',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: isDemoRunning ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 0 16px rgba(24, 224, 255, 0.45)'
            }}
          >
            <Zap size={14} />
            <span>{isDemoRunning ? 'SIMULATING...' : station.demoActionName || 'Run Live Demo'}</span>
          </button>

          <button
            onClick={() => onRequestDemoModal(station.name)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(240, 69, 94, 0.9), rgba(225, 29, 72, 0.9))',
              border: '1px solid #F0455E',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '0.58rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: '0 0 16px rgba(240, 69, 94, 0.35)'
            }}
          >
            <span>Request Enterprise PoC</span>
            <ExternalLink size={13} />
          </button>
        </div>

      </div>
    </aside>
  );
};
