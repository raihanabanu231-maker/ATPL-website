import React, { useState } from 'react';
import { ATPL_FACTORY_NODES } from '../../data/factoryStations3D';
import { Camera, Activity, Cpu, Sparkles, Layers } from 'lucide-react';

/**
 * High-Tech Interactive Visual Previews for 12 Smart Factory 3D Stations
 * Displays High-Resolution Photorealistic Industrial Imagery & System Schematics
 */

export const StationVisualPreview = ({ stationId, color = '#00f0ff', height = 150 }) => {
  const [viewMode, setViewMode] = useState('photo'); // 'photo' or 'schematic'
  const node = ATPL_FACTORY_NODES[stationId] || {};
  const imageSrc = node.image || '/assets/images/stations/trace.jpg';

  const renderSchematic = () => {
    switch (stationId) {
      case 'perfectTrace':
        return (
          <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <pattern id="grid-trace" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1"/>
            </pattern>
            <rect width="400" height="130" fill="url(#grid-trace)" />
            
            <g transform="translate(20, 25)">
              <rect x="0" y="20" width="45" height="45" rx="6" fill="rgba(0, 240, 255, 0.15)" stroke="#00f0ff" strokeWidth="2" />
              <rect x="8" y="28" width="12" height="12" fill="#00f0ff" />
              <rect x="25" y="28" width="12" height="4" fill="#00f0ff" />
              <rect x="25" y="36" width="12" height="4" fill="#00f0ff" />
              <text x="22" y="78" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">UNIT</text>

              <path d="M 55 42 L 80 42" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3 3" />
              <polygon points="80,39 86,42 80,45" fill="#00f0ff" />

              <rect x="95" y="15" width="55" height="55" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
              <rect x="105" y="25" width="35" height="6" fill="#10b981" />
              <rect x="105" y="35" width="35" height="6" fill="#10b981" />
              <rect x="105" y="45" width="35" height="6" fill="#10b981" />
              <text x="122" y="82" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">BUNDLE</text>

              <path d="M 160 42 L 185 42" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
              <polygon points="185,39 191,42 185,45" fill="#10b981" />

              <rect x="200" y="10" width="65" height="65" rx="6" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="2" />
              <rect x="210" y="20" width="45" height="45" rx="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="232" y="86" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">SHIPPER</text>

              <path d="M 275 42 L 300 42" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <polygon points="300,39 306,42 300,45" fill="#38bdf8" />

              <rect x="315" y="5" width="60" height="75" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
              <line x1="315" y1="65" x2="375" y2="65" stroke="#f59e0b" strokeWidth="3" />
              <text x="345" y="92" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">PALLET</text>
            </g>

            <text x="20" y="118" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold">GS1 CRYPTOGRAPHIC 4-TIER AGGREGATION • 450 PACKS/MIN</text>
          </svg>
        );

      case 'perfectWarehouse':
        return (
          <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <g transform="translate(30, 15)">
              {[0, 1, 2, 3, 4].map(col => (
                <g key={col} transform={`translate(${col * 65}, 0)`}>
                  <rect x="0" y="5" width="55" height="22" rx="3" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="1.5" />
                  <rect x="0" y="32" width="55" height="22" rx="3" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
                  <rect x="0" y="59" width="55" height="22" rx="3" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="27" y="20" fill="#93c5fd" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN A-{col+1}</text>
                  <text x="27" y="47" fill="#86efac" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN B-{col+1}</text>
                  <text x="27" y="74" fill="#fde68a" fontSize="9" textAnchor="middle" fontFamily="monospace">BIN C-{col+1}</text>
                </g>
              ))}
            </g>
            <text x="20" y="118" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">DYNAMIC 3D HEATMAP BIN SLOTTING • SAP / ORACLE BAPI SYNC</text>
          </svg>
        );

      case 'visionAi':
        return (
          <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <g transform="translate(30, 15)">
              <circle cx="60" cy="45" r="35" stroke="#E85874" strokeWidth="2" fill="rgba(232, 88, 116, 0.1)" strokeDasharray="4 2" />
              <circle cx="60" cy="45" r="18" stroke="#E85874" strokeWidth="1.5" />
              <line x1="20" y1="45" x2="100" y2="45" stroke="#E85874" strokeWidth="1" />
              <line x1="60" y1="5" x2="60" y2="85" stroke="#E85874" strokeWidth="1" />

              <rect x="150" y="15" width="200" height="65" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.15)" />
              <rect x="160" y="25" width="70" height="45" rx="4" fill="rgba(232, 88, 116, 0.2)" stroke="#E85874" strokeWidth="1.5" />
              <text x="195" y="52" fill="#E85874" fontSize="10" textAnchor="middle" fontWeight="bold">FLAW 99.8%</text>

              <rect x="245" y="25" width="90" height="45" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
              <text x="290" y="45" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">ISO 15415</text>
              <text x="290" y="60" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">GRADE A</text>
            </g>
            <text x="20" y="118" fill="#E85874" fontSize="10" fontFamily="monospace" fontWeight="bold">SUB-8MS NEURAL DEFECT CLASSIFIER • HIGH-SPEED REJECT GATES</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <g transform="translate(30, 20)">
              <rect x="10" y="10" width="80" height="60" rx="8" fill={`${color}20`} stroke={color} strokeWidth="2" />
              <circle cx="50" cy="40" r="16" fill={color} opacity="0.8" />
              <rect x="110" y="15" width="220" height="15" rx="3" fill="rgba(255, 255, 255, 0.15)" />
              <rect x="110" y="40" width="160" height="12" rx="3" fill="rgba(255, 255, 255, 0.1)" />
              <rect x="110" y="60" width="200" height="10" rx="2" fill={`${color}50`} />
            </g>
            <text x="20" y="118" fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold">ATPL SMART FACTORY 4.0 TELEMETRY & HARDWARE INTEGRATION</text>
          </svg>
        );
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#040b18',
      border: `1.5px solid ${color}50`,
      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.6), 0 0 20px ${color}20`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Bar with Mode Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.35rem 0.65rem',
        background: 'rgba(5, 14, 28, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: color, fontWeight: 700, letterSpacing: '0.04em' }}>
            {viewMode === 'photo' ? 'AUTHENTIC HARDWARE VIEW' : 'SYSTEM ARCHITECTURE'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => setViewMode('photo')}
            style={{
              background: viewMode === 'photo' ? `${color}30` : 'transparent',
              border: viewMode === 'photo' ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
              color: viewMode === 'photo' ? '#ffffff' : '#94a3b8',
              borderRadius: '4px',
              padding: '0.15rem 0.45rem',
              fontSize: '0.66rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
            title="Show Hardware Photo"
          >
            <Camera size={11} /> Photo
          </button>
          <button
            onClick={() => setViewMode('schematic')}
            style={{
              background: viewMode === 'schematic' ? `${color}30` : 'transparent',
              border: viewMode === 'schematic' ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
              color: viewMode === 'schematic' ? '#ffffff' : '#94a3b8',
              borderRadius: '4px',
              padding: '0.15rem 0.45rem',
              fontSize: '0.66rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
            title="Show System Diagram"
          >
            <Layers size={11} /> Diagram
          </button>
        </div>
      </div>

      {/* Main Visual Display */}
      <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden', background: '#020611' }}>
        {viewMode === 'photo' ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={imageSrc}
              alt={node.name || 'Station Visual'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            />
            {/* Scanline Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none'
            }} />
            
            {/* Bottom Status Ribbon */}
            <div style={{
              position: 'absolute',
              bottom: '6px',
              left: '8px',
              right: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(3, 8, 20, 0.82)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.55rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}>
              <span style={{ color: '#ffffff', fontSize: '0.7rem', fontWeight: 700 }}>
                {node.name}
              </span>
              <span style={{ color: color, fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 800 }}>
                {node.telemetry ? Object.values(node.telemetry)[0] : 'ONLINE'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #07152d 0%, #030a16 100%)' }}>
            {renderSchematic()}
          </div>
        )}
      </div>
    </div>
  );
};
