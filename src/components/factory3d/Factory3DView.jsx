import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useApp } from '../../context/AppContext';
import { FactoryScene } from './FactoryScene';
import { FactoryHUD } from './FactoryHUD';
import { ATPL_FACTORY_NODES, STATION_KEYS } from '../../data/factoryStations3D';

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
    // Ignore audio context autoplay restrictions
  }
};

/* =========================================================================
   3D LOADING SUSPENSE FALLBACK
   ========================================================================= */
const FactoryLoadingFallback = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#040914',
    zIndex: 20,
    gap: '1.25rem'
  }}>
    <div style={{
      width: '54px',
      height: '54px',
      borderRadius: '50%',
      border: '3px solid rgba(0, 240, 255, 0.2)',
      borderTopColor: '#00f0ff',
      animation: 'spin 1s linear infinite'
    }}></div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', letterSpacing: '0.04em' }}>
        LOADING 3D SMART FACTORY DIGITAL TWIN
      </div>
      <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem', color: 'var(--cyan-primary, #00f0ff)', marginTop: '0.3rem' }}>
        RENDERING 12 4K MACHINERY STATIONS & ARCHIE AI...
      </div>
    </div>
  </div>
);

/* =========================================================================
   MAIN 3D DIGITAL TWIN VIEW
   ========================================================================= */
export const Factory3DView = () => {
  const { setCurrentView, openDemoModal } = useApp();
  
  const [selectedStation, setSelectedStation] = useState('perfectTrace');
  const [hoveredStation, setHoveredStation] = useState(null);
  const [isOverview, setIsOverview] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quality, setQuality] = useState('HIGH');

  // Scroll to top immediately when 3D view mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Station Selection Handler
  const handleSelectStation = useCallback((stationKey) => {
    setSelectedStation(stationKey);
    setIsOverview(!stationKey);
    if (stationKey) {
      setIsAutoTour(false);
    }
    playAudioFX('select', soundEnabled);
  }, [soundEnabled]);

  // Reset Overview Camera
  const handleResetOverview = useCallback(() => {
    setSelectedStation(null);
    setIsOverview(true);
    setIsAutoTour(false);
    playAudioFX('select', soundEnabled);
  }, [soundEnabled]);

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setInterval(() => {
      setSelectedStation((prev) => {
        const idx = prev ? STATION_KEYS.indexOf(prev) : -1;
        const nextIdx = (idx + 1) % STATION_KEYS.length;
        return STATION_KEYS[nextIdx];
      });
      setIsOverview(false);
      playAudioFX('select', soundEnabled);
    }, 6500);

    return () => clearInterval(timer);
  }, [isAutoTour, soundEnabled]);

  // Trigger Live 3D Station Demo
  const handleTriggerDemo = (stationId) => {
    setIsDemoRunning(true);
    playAudioFX('demo', soundEnabled);
    setTimeout(() => {
      setIsDemoRunning(false);
    }, 3500);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100dvh - 65px)', minHeight: 'calc(100dvh - 65px)', background: '#040812', overflow: 'hidden' }}>
      
      {/* HUD & Navigation Overlay */}
      <FactoryHUD
        selectedStation={selectedStation}
        onSelectStation={handleSelectStation}
        onResetOverview={handleResetOverview}
        isOverview={isOverview}
        isAutoTour={isAutoTour}
        onToggleAutoTour={() => setIsAutoTour(!isAutoTour)}
        isDemoRunning={isDemoRunning}
        onTriggerDemo={handleTriggerDemo}
        onRequestDemoModal={(productName) => openDemoModal({ solution: productName, notes: `Inquiry for ${productName} from 3D Digital Twin Command Center.` })}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        quality={quality}
        onChangeQuality={setQuality}
        onExit={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          setCurrentView('home');
        }}
      />

      {/* High-Performance WebGL 3D Canvas */}
      <Suspense fallback={<FactoryLoadingFallback />}>
        <Canvas
          shadows
          camera={{ position: [26, 20, 26], fov: 42, near: 0.1, far: 200 }}
          dpr={quality === 'HIGH' ? [1, 2] : quality === 'MED' ? 1 : 0.85}
          style={{ width: '100%', height: '100%' }}
        >
          <FactoryScene
            selectedStation={selectedStation}
            hoveredStation={hoveredStation}
            onSelectStation={handleSelectStation}
            onHoverStation={setHoveredStation}
            isOverview={isOverview}
            isDemoRunning={isDemoRunning}
            quality={quality}
          />
        </Canvas>
      </Suspense>

    </div>
  );
};
