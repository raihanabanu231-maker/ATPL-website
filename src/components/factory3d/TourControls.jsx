import React from 'react';
import { 
  Compass, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  LogOut,
  Building2,
  Sparkles
} from 'lucide-react';
import { ATPL_STATIONS, STATION_KEYS } from '../../data/stations';

export const TourControls = ({
  selectedStation,
  onSelectStation,
  onResetOverview,
  isOverview,
  isAutoTour,
  onToggleAutoTour,
  soundEnabled,
  onToggleSound,
  quality,
  onChangeQuality,
  onOpenAbout,
  onExit
}) => {
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
    <>
      {/* Top Header Command Bar */}
      <header 
        style={{ 
          pointerEvents: 'auto', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '0.6rem',
          width: '100%',
          zIndex: 40
        }}
      >
        {/* Top-Left Telemetry Card */}
        <div 
          style={{
            background: 'rgba(2, 16, 28, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(24, 224, 255, 0.45)',
            borderRadius: '12px',
            padding: '0.45rem 0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '0.86rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
                SMART FACTORY DIGITAL TWIN
              </div>
              <div style={{ fontFamily: 'monospace, var(--font-mono)', fontSize: '0.66rem', color: '#18E0FF' }}>
                ATPL GROUP • 12 ACTIVE IOT STATIONS
              </div>
            </div>
          </div>

          <div style={{ height: '22px', width: '1px', background: 'rgba(255,255,255,0.15)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#34D399', fontFamily: 'monospace, var(--font-mono)', fontWeight: 700 }}>
            <Activity size={13} />
            <span>TELEMETRY LIVE</span>
          </div>
        </div>

        {/* Top-Right Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          
          {/* About ATPL / Company Pitch Deck Modal */}
          <button
            onClick={onOpenAbout}
            aria-label="Open About ATPL pitch deck"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 112, 192, 0.92), rgba(24, 224, 255, 0.85))',
              border: '1px solid #18E0FF',
              color: '#02101C',
              borderRadius: '8px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 18px rgba(24, 224, 255, 0.45)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Building2 size={14} />
            <span>About ATPL</span>
          </button>

          {/* Reset Overview Camera */}
          <button
            onClick={onResetOverview}
            aria-label="Reset camera overview"
            style={{
              background: isOverview ? 'rgba(24, 224, 255, 0.25)' : 'rgba(7, 20, 38, 0.88)',
              border: isOverview ? '1px solid #18E0FF' : '1px solid rgba(24, 224, 255, 0.35)',
              color: isOverview ? '#18E0FF' : '#CBD5E1',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Compass size={14} />
            <span>Overview</span>
          </button>

          {/* Auto Tour Mode (Every 6s) */}
          <button
            onClick={onToggleAutoTour}
            aria-label="Toggle automated guided tour"
            style={{
              background: isAutoTour ? 'rgba(16, 185, 129, 0.28)' : 'rgba(7, 20, 38, 0.88)',
              border: isAutoTour ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.18)',
              color: isAutoTour ? '#34D399' : '#CBD5E1',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(12px)'
            }}
          >
            {isAutoTour ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoTour ? 'Touring' : 'Auto Tour'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Disable audio effects' : 'Enable audio effects'}
            style={{
              background: 'rgba(7, 20, 38, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: soundEnabled ? '#18E0FF' : '#64748B',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)'
            }}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Quality Toggle: HIGH / LOW */}
          <button
            onClick={() => onChangeQuality(quality === 'HIGH' ? 'LOW' : 'HIGH')}
            aria-label="Toggle render quality"
            style={{
              background: 'rgba(7, 20, 38, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: quality === 'HIGH' ? '#34D399' : '#94A3B8',
              borderRadius: '8px',
              padding: '0.4rem 0.65rem',
              fontSize: '0.72rem',
              fontFamily: 'monospace, var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
          >
            Q: {quality}
          </button>

          {/* Exit 3D Tour Button */}
          {onExit && (
            <button
              onClick={onExit}
              aria-label="Exit 3D Tour and return to home"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 69, 94, 0.95), rgba(225, 29, 72, 0.95))',
                border: '1px solid #F0455E',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '0.42rem 0.95rem',
                fontSize: '0.78rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 16px rgba(240, 69, 94, 0.45)'
              }}
            >
              <LogOut size={14} />
              <span>Exit 3D</span>
            </button>
          )}
        </div>
      </header>

      {/* Bottom 12-Station Dock Ribbon */}
      <footer 
        style={{ 
          pointerEvents: 'auto', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          zIndex: 40
        }}
      >
        <div 
          style={{
            background: 'rgba(2, 16, 28, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(24, 224, 255, 0.45)',
            borderRadius: '999px',
            padding: '0.35rem 0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.85)',
            maxWidth: '100%',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={handlePrevStation}
            aria-label="Previous station"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <ChevronLeft size={16} />
          </button>

          {STATION_KEYS.map((key) => {
            const st = ATPL_STATIONS[key];
            const isActive = selectedStation === key;
            return (
              <button
                key={key}
                onClick={() => onSelectStation(key)}
                aria-label={`Jump to station ${st.number} ${st.name}`}
                style={{
                  background: isActive ? 'rgba(255, 201, 60, 0.22)' : 'transparent',
                  border: isActive ? '1.5px solid #FFC93C' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  borderRadius: '20px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isActive ? '0 0 12px rgba(255, 201, 60, 0.45)' : 'none',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <span style={{ fontFamily: 'monospace, var(--font-mono)', color: isActive ? '#FFC93C' : '#18E0FF', fontWeight: 800 }}>
                  {st.number}
                </span>
                <span className="hidden md:inline" style={{ whiteSpace: 'nowrap' }}>{st.name}</span>
              </button>
            );
          })}

          <button
            onClick={handleNextStation}
            aria-label="Next station"
            style={{
              background: '#0070C0',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </>
  );
};
