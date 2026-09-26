import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Activity, 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Pause, 
  RefreshCw, 
  Radio, 
  Zap, 
  Eye, 
  Thermometer,
  Boxes,
  Layers
} from 'lucide-react';

export const AdminFactoryControl = () => {
  const { 
    stationsState, 
    simulationActive, 
    setSimulationActive, 
    conveyorSpeed, 
    setConveyorSpeed, 
    activeFaultStation, 
    triggerFault, 
    setCurrentView, 
    setSelectedStationId,
    addToast 
  } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Smart Factory & <span className="gradient-text">IoT Telemetry Hub</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Real-time digital twin telemetry, edge sensor streams, and interactive conveyor simulation controls.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('factory-3d')}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Sparkles size={15} />
          <span>Launch 3D WebGL Digital Twin ➔</span>
        </button>
      </div>

      {/* Global Simulation Controls Bar */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        {/* Simulation Stream State */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              setSimulationActive(!simulationActive);
              addToast(
                simulationActive ? 'Simulation Paused' : 'Simulation Resumed',
                simulationActive ? 'Sensor telemetry stream halted.' : 'Live IoT telemetry stream active.',
                'info'
              );
            }}
            className={simulationActive ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {simulationActive ? <Pause size={14} /> : <Play size={14} />}
            <span>{simulationActive ? 'Pause Telemetry' : 'Resume Telemetry'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: simulationActive ? '#34d399' : '#fbbf24' }}>
            <span className={simulationActive ? 'pulse-dot' : ''} style={{ background: simulationActive ? '#10b981' : '#f59e0b', width: '8px', height: '8px', borderRadius: '50%' }}></span>
            <span>{simulationActive ? 'REAL-TIME MQTT BROKER CONNECTED' : 'STREAM PAUSED'}</span>
          </div>
        </div>

        {/* Speed Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
          <Sliders size={16} color="var(--cyan-primary)" />
          <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Line Speed ({conveyorSpeed}x):</span>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.5"
            value={conveyorSpeed}
            onChange={(e) => setConveyorSpeed(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
          />
        </div>

      </div>

      {/* 5 Stations Telemetry Cards Grid */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {stationsState.map(st => {
          const isFaulted = activeFaultStation === st.id;
          return (
            <div
              key={st.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: isFaulted ? '1px solid rgba(239, 68, 68, 0.6)' : '1px solid var(--border-glass)',
                boxShadow: isFaulted ? '0 0 20px rgba(239, 68, 68, 0.25)' : undefined
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>{st.zone}</span>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>{st.name}</h3>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{st.tagline}</div>
                </div>

                <span className={`badge ${isFaulted ? 'badge-danger' : 'badge-emerald'}`}>
                  {isFaulted ? 'FAULT INJECTED' : 'ONLINE'}
                </span>
              </div>

              {/* Station Specific Telemetry Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                background: 'rgba(10, 18, 35, 0.7)',
                padding: '0.9rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>OEE METRIC</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: isFaulted ? '#f87171' : 'var(--cyan-primary)' }}>
                    {st.stats.oee || st.stats.accuracy}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>TEMPERATURE</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e2e8f0' }}>
                    {st.telemetry.temperature}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>THROUGHPUT</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399' }}>
                    {st.stats.throughput || st.stats.speed || st.stats.fleetSize}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <button
                  onClick={() => triggerFault(st.id)}
                  className={`btn ${isFaulted ? 'btn-emerald' : 'btn-danger'} btn-sm`}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
                >
                  <AlertTriangle size={13} />
                  <span>{isFaulted ? 'Clear Fault & Reset' : 'Simulate Fault'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedStationId(st.id);
                    setCurrentView('factory-3d');
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Eye size={13} color="var(--cyan-primary)" />
                  <span>Fly to 3D View</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
