import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useApp } from '../../context/AppContext';
import { FactoryScene } from './FactoryScene';
import { StationPanel } from './StationPanel';
import { TourControls } from './TourControls';
import { AboutOverlay } from './AboutOverlay';
import { ArchieChat } from './ArchieChat';
import { ATPL_STATIONS, STATION_KEYS } from '../../data/stations';

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
    background: '#02101C',
    zIndex: 20,
    gap: '1.25rem'
  }}>
    <div style={{
      width: '54px',
      height: '54px',
      borderRadius: '50%',
      border: '3px solid rgba(24, 224, 255, 0.2)',
      borderTopColor: '#18E0FF',
      animation: 'spin 1s linear infinite'
    }}></div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF', letterSpacing: '0.04em' }}>
        LOADING 3D SMART FACTORY DIGITAL TWIN
      </div>
      <div style={{ fontFamily: 'monospace, var(--font-mono)', fontSize: '0.78rem', color: '#18E0FF', marginTop: '0.3rem' }}>
        RENDERING 12 IOT STATIONS & ARCHIE AI ENGINE...
      </div>
    </div>
  </div>
);

/* =========================================================================
   MAIN 3D DIGITAL TWIN & FACTORY TOUR VIEW
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Scroll to top immediately when 3D view mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Keyboard navigation: ESC closes panel, Arrow keys switch stations
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isAboutOpen) {
          setIsAboutOpen(false);
        } else {
          setIsOverview(true);
          setSelectedStation(null);
        }
      } else if (e.key === 'ArrowRight') {
        const curr = selectedStation ? STATION_KEYS.indexOf(selectedStation) : -1;
        const next = (curr + 1) % STATION_KEYS.length;
        handleSelectStation(STATION_KEYS[next]);
      } else if (e.key === 'ArrowLeft') {
        const curr = selectedStation ? STATION_KEYS.indexOf(selectedStation) : 0;
        const prev = (curr - 1 + STATION_KEYS.length) % STATION_KEYS.length;
        handleSelectStation(STATION_KEYS[prev]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStation, isAboutOpen]);

  // Handle station selection
  const handleSelectStation = useCallback((key) => {
    setSelectedStation(key);
    setIsOverview(false);
    playAudioFX('select', soundEnabled);
  }, [soundEnabled]);

  // Handle Overview reset
  const handleResetOverview = useCallback(() => {
    setIsOverview(true);
    setSelectedStation(null);
    setIsAutoTour(false);
    playAudioFX('select', soundEnabled);
  }, [soundEnabled]);

  // Auto Tour Timer (Cycles every 6 seconds)
  useEffect(() => {
    if (!isAutoTour) return;

    const interval = setInterval(() => {
      setSelectedStation((prev) => {
        const currIdx = prev ? STATION_KEYS.indexOf(prev) : -1;
        const nextIdx = (currIdx + 1) % STATION_KEYS.length;
        const nextKey = STATION_KEYS[nextIdx];
        playAudioFX('select', soundEnabled);
        return nextKey;
      });
      setIsOverview(false);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoTour, soundEnabled]);

  // Trigger simulated station demo
  const handleTriggerDemo = (stationId) => {
    setIsDemoRunning(true);
    playAudioFX('demo', soundEnabled);
    setTimeout(() => {
      setIsDemoRunning(false);
    }, 2800);
  };

  // Open lead modal for PoC
  const handleRequestPoC = (stationName) => {
    if (openDemoModal) {
      openDemoModal({
        solution: `3D Digital Twin - ${stationName} PoC`,
        notes: `Customer requested Enterprise PoC demonstration for ${stationName}.`
      });
    }
  };

  const activeStation = selectedStation ? ATPL_STATIONS[selectedStation] : null;

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      backgroundColor: '#02101C',
      overflow: 'hidden',
      userSelect: 'none'
    }}>

      {/* 3D WebGL Canvas */}
      <Suspense fallback={<FactoryLoadingFallback />}>
        <Canvas
          shadows={quality === 'HIGH'}
          dpr={quality === 'HIGH' ? [1, 2] : [0.75, 1]}
          gl={{
            antialias: quality === 'HIGH',
            powerPreference: 'high-performance',
            toneMapping: 3, // ACESFilmicToneMapping
            toneMappingExposure: 1.15
          }}
          camera={{
            position: [-1.2, 5.6, 27.5],
            fov: 48,
            near: 0.5,
            far: 140
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <FactoryScene
            selectedStation={selectedStation}
            hoveredStation={hoveredStation}
            onSelectStation={handleSelectStation}
            onHoverStation={setHoveredStation}
            isOverview={isOverview}
          />
        </Canvas>
      </Suspense>

      {/* Overlay HUD & Tour Controls */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        boxSizing: 'border-box',
        zIndex: 10
      }}>
        <TourControls
          selectedStation={selectedStation}
          onSelectStation={handleSelectStation}
          onResetOverview={handleResetOverview}
          isOverview={isOverview}
          isAutoTour={isAutoTour}
          onToggleAutoTour={() => setIsAutoTour(!isAutoTour)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          quality={quality}
          onChangeQuality={setQuality}
          onOpenAbout={() => setIsAboutOpen(true)}
          onExit={() => setCurrentView('home')}
        />
      </div>

      {/* Slide-In Left Detail Panel (With Gold Border) */}
      {!isAutoTour && activeStation && (
        <StationPanel
          station={activeStation}
          onClose={() => {
            setSelectedStation(null);
            setIsOverview(true);
          }}
          isDemoRunning={isDemoRunning}
          onTriggerDemo={handleTriggerDemo}
          onRequestDemoModal={handleRequestPoC}
        />
      )}

      {/* Corporate Pitch Deck / About ATPL Fullscreen Glass Overlay */}
      <AboutOverlay
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onSelectStation={handleSelectStation}
      />

      {/* Floating Archie AI Chat Bubble & Panel */}
      <ArchieChat onSelectStation={handleSelectStation} />

    </div>
  );
};
