import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  X, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Cpu, 
  Award, 
  ChevronRight, 
  Sparkles, 
  Bot,
  Activity,
  Layers, 
  Eye, 
  Radio, 
  Factory, 
  Building2, 
  Check, 
  TrendingUp, 
  PhoneCall, 
  ExternalLink,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { WhyAtplCardsSection } from './WhyAtplCardsSection';
import { HowAtplComparesSection } from './HowAtplComparesSection';

export const WhyAtplView = () => {
  const { openDemoModal, setCurrentView, navigateToInsight } = useApp();
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 30 });
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isHeroExpanded, setIsHeroExpanded] = useState(true);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const simulatorIframeRef = useRef(null);
  const consoleContainerRef = useRef(null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (consoleContainerRef.current) {
        const el = consoleContainerRef.current;
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  useEffect(() => {
    const handleMsg = (event) => {
      if (event.data && event.data.type === 'TOUR_STATE') {
        setIsTourPlaying(!!event.data.isPlaying);
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const toggleTour = useCallback(() => {
    const nextState = !isTourPlaying;
    setIsTourPlaying(nextState);
    if (simulatorIframeRef.current && simulatorIframeRef.current.contentWindow) {
      simulatorIframeRef.current.contentWindow.postMessage({
        action: nextState ? 'startTour' : 'stopTour'
      }, '*');
    }
  }, [isTourPlaying]);

  // Full-View Cinematic Robot Theater State
  const [fullVideoMode, setFullVideoMode] = useState('presentation');
  const [fullVideoPlaying, setFullVideoPlaying] = useState(true);
  const [fullVideoMuted, setFullVideoMuted] = useState(true);
  const [fullVideoProgress, setFullVideoProgress] = useState(18);
  const [videoTime, setVideoTime] = useState(0);
  const fullVideoRef = useRef(null);
  const fullTheaterContainerRef = useRef(null);

  const fullFeeds = {
    presentation: {
      id: 'presentation',
      title: 'Archie Presenting Hardware & Software',
      video: '/assets/videos/archie_presentation.mp4',
      poster: '/assets/images/archery_robot_clean.png',
      status: '• PRESENTING CAPABILITIES',
      fps: '60 FPS',
      resolution: '4K ULTRA-HD',
      latency: '5.2ms',
      description: 'Archie presenting ATPL’s complete ecosystem: Tier-1 Hardware, Industrial Printers, and 9 In-House Customized Software Products with Native SAP & Oracle ERP Integration.'
    },
    waving: {
      id: 'waving',
      title: 'Archie AI Shopfloor Agent // Telemetry Mode',
      video: '/assets/videos/robot_waving_agent.mp4',
      poster: '/assets/videos/posters/robot_waving_agent.jpg',
      status: '• ACTIVE & TRACKING',
      fps: '60 FPS',
      resolution: '4K ULTRA-HD',
      latency: '5.8ms',
      description: 'Archie 3D autonomous AI shopfloor agent live in plant telemetry mode — streaming cognitive edge vision to line supervisors.'
    },
    tracking: {
      id: 'tracking',
      title: 'Direct Telecentric Camera Lock View',
      video: '/assets/videos/robot_waving_at_camera.mp4',
      poster: '/assets/videos/posters/robot_waving_at_camera.jpg',
      status: '• FOCAL LOCK ON LINE #4',
      fps: '120 FPS',
      resolution: '4K MACRO',
      latency: '4.2ms',
      description: 'Sub-pixel optical verification and dynamic focal depth adaptation on high-speed moving parts across conveyor lines.'
    },
    handshake: {
      id: 'handshake',
      title: 'Human & Robot Collaborative Engineering',
      video: '/assets/videos/human_robot_handshake.mp4',
      poster: '/assets/videos/posters/human_robot_handshake.jpg',
      status: '• COLLABORATIVE SAFETY ACTIVE',
      fps: '60 FPS',
      resolution: '1080P CINEMA',
      latency: '6.0ms',
      description: 'Certified ISO 10218 collaborative robotics integration with zero-pinch safety curtains and instant line handoff.'
    }
  };

  const activeFeed = fullFeeds[fullVideoMode] || fullFeeds.waving;

  // Timeline scrubber progress ticker
  useEffect(() => {
    if (!fullVideoPlaying) return;
    const interval = setInterval(() => {
      setFullVideoProgress(prev => (prev >= 100 ? 0 : Number((prev + 0.4).toFixed(1))));
    }, 80);
    return () => clearInterval(interval);
  }, [fullVideoPlaying]);

  // Audio tactile chime
  const playAudioChime = (freq = 587.33) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  const toggleFullScreenVideo = () => {
    if (!fullTheaterContainerRef.current) return;
    if (!document.fullscreenElement) {
      fullTheaterContainerRef.current.requestFullscreen().catch(() => {
        setVideoModalOpen(true);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Machine Vision & 3D Plant Simulation Stations
  const stations = [
    {
      id: '3d-simulator',
      type: 'simulator',
      name: '3D Plant Twin Simulator',
      shortName: '3D Simulator',
      tagline: 'Interactive 3D WebGL factory floor & autonomous line simulation',
      simulatorUrl: '/factory-map.html?embedded=true',
      poster: '/assets/images/atpl_connected_3d_twin.webp',
      badge: '★ 3D DIGITAL TWIN SIMULATOR',
      telemetry: '60 FPS WebGL // REAL-TIME 3D',
      description: 'Explore ATPL’s turnkey Industry 4.0 plant floor in real-time 3D: automated conveyor lines, collaborative robotic inspection, RAIN RFID dock gates, and live shopfloor telemetry.'
    },
    {
      id: 'vision-qc',
      type: 'video',
      name: 'High-Speed Conveyor Vision',
      shortName: 'Conveyor Vision',
      tagline: 'Edge AI defect inspection at 180 parts/minute',
      video: '/assets/videos/scanner_conveyor_360.mp4',
      poster: '/assets/videos/posters/scanner_conveyor_360.jpg',
      badge: '99.985% First-Pass Yield',
      telemetry: 'LIVE ATPL TELEMETRY: 6.2ms',
      description: 'Synchronized telecentric cameras and 460nm polarized ring strobes catching 50-micron porosity, burrs, and barcode grading violations in under 6.2 milliseconds.'
    },
    {
      id: 'dpm-laser',
      type: 'video',
      name: 'DPM Laser Marking & Verification',
      shortName: 'DPM Laser',
      tagline: 'Permanent ISO/IEC 15415 data matrix serialization',
      video: '/assets/videos/laser_marker_360.mp4',
      poster: '/assets/videos/posters/uv_laser_360.jpg',
      badge: 'AIS-156 EV Battery Genealogy',
      telemetry: 'ISO/IEC 15415 VERIFIED: GRADE A',
      description: 'Fiber and UV laser stations marking micro-QR codes directly on cylindrical 21700 EV battery cells, automotive knuckles, and turbine blades with zero degradation.'
    },
    {
      id: 'rfid-portal',
      type: 'video',
      name: 'High-Density RAIN RFID Dock Portal',
      shortName: 'RFID Dock Gate',
      tagline: '1,420 tags/second through stretch film',
      video: '/assets/videos/rfid_antenna_360.mp4',
      poster: '/assets/videos/posters/rfid_antenna_360.jpg',
      badge: 'Zero Ghost-Read Shielding',
      telemetry: '1,420 TAGS/SEC // DENSE MODE',
      description: 'Directional narrow-beam phased arrays paired with Doppler phase velocity filtering, eliminating cross-dock staging crosstalk while forklifts pass at 12 km/h.'
    }
  ];

  const pillars = [
    {
      icon: Cpu,
      title: 'Advanced Technology Made Easy',
      subtitle: 'Complexity hidden. Performance amplified.',
      description: 'Modern factories run at unforgiving speeds. ATPL packages deep learning TensorRT models, multi-angle stroboscopic lighting, and UHF RFID into plug-and-play modules that line operators can control with zero programming required.'
    },
    {
      icon: Zap,
      title: 'Performance Without Compromise',
      subtitle: 'Sub-8ms decode. Zero line bottlenecks.',
      description: 'High-throughput automotive and EV plants cannot afford a 50ms pause per part. Our edge-computed pipelines inspect and serialize at 180 parts per minute, ensuring 100% genealogy without adding a single second of cycle time.'
    },
    {
      icon: Layers,
      title: 'Turnkey Hardware + Software Ecosystem',
      subtitle: 'Single engineering authority. Zero finger-pointing.',
      description: 'Unlike traditional box-pushers who sell disjointed hardware and leave you to find software integrators, ATPL engineers the entire stack: optical mounts, PLCs, edge controllers, custom middleware, and cloud dashboards.'
    },
    {
      icon: ShieldCheck,
      title: 'Native ERP & Shopfloor Interoperability',
      subtitle: 'Certified SAP S/4HANA & Oracle connectors.',
      description: 'Say goodbye to fragile batch CSV cron jobs. ATPL systems communicate directly via bi-directional SAP IDocs, BAPIs, and Modbus-TCP DMA, eliminating inventory drift and synchronization lag between the floor and the executive suite.'
    },
    {
      icon: Clock,
      title: 'Guaranteed 4-Hour On-Site SLA',
      subtitle: 'Local field squads across India’s manufacturing corridors.',
      description: 'With technical centers at TIDEL Park Chennai, TCE-TBI Madurai R&D Hub, Hosur Auto Corridor, and Bengaluru, our engineers guarantee sub-4-hour emergency on-site dispatch backed by local buffer hardware pools.'
    },
    {
      icon: Award,
      title: 'Tested, Audited & Regulatory Compliant',
      subtitle: 'AIS-156, FDA 21 CFR Part 11, GS1 India certified.',
      description: 'From tamper-proof pharmaceutical electronic audit trails to EV battery genealogy mandated by ARAI, ATPL solutions come pre-configured to pass rigorous global regulatory audits with zero non-conformances.'
    }
  ];


  const activeStation = stations[activeStationIndex];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)'
    }}>

      {/* Top Cyan Gradient Scroll Progress Bar (Page-Level Extra) */}
      <motion.div
        style={{
          scaleX: progressScaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #22d3ee 0%, #0369a1 60%, #0284c7 100%)',
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      />

      {/* =========================================================================
          1. BREADCRUMBS
         ========================================================================= */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '1.25rem 1.5rem 0.5rem',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{ background: 'none', border: 'none', color: '#0071ba', cursor: 'pointer', padding: 0, fontSize: '0.82rem', fontWeight: 600 }}
          >
            Home
          </button>
          <span>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Why ATPL</span>
        </div>
      </div>

      {/* =========================================================================
          2. COGNEX-STYLE MACHINE VISION HERO & INSPECTION STATIONS (BIG SIZE VIEW)
         ========================================================================= */}
      <section style={{
        maxWidth: isHeroExpanded ? '100%' : '1440px',
        width: '100%',
        margin: '0 auto',
        padding: isHeroExpanded ? '0.75rem 1rem 3.5rem' : '1.75rem 1.25rem 4rem',
        transition: 'all 0.3s ease'
      }}>
        {/* Executive Headline & Value Proposition Block */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto 2.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(0, 113, 186, 0.08)',
            border: '1px solid rgba(0, 113, 186, 0.25)',
            borderRadius: '999px',
            padding: '0.35rem 0.95rem',
            marginBottom: '1rem',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#0071ba'
          }}>
            <Sparkles size={13} color="#0071ba" />
            <span>Industrial Automation &amp; Traceability Authority</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#0f172a',
            margin: '0 0 1rem',
            fontFamily: 'var(--font-display, sans-serif)'
          }}>
            Why ATPL
          </h1>

          <h2 style={{
            fontSize: 'clamp(1.35rem, 2.3vw, 1.95rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#0f172a',
            margin: '0 0 1.25rem',
            letterSpacing: '-0.015em'
          }}>
            Advanced Machine Vision &amp; Factory Automation Made Flawless
          </h2>

          <p style={{
            fontSize: '1.06rem',
            lineHeight: 1.65,
            color: '#475569',
            margin: '0 auto 1.75rem',
            maxWidth: '840px'
          }}>
            Archery Technocrats stands alone in combining advanced machine vision, industrial RAIN RFID, collaborative robotics, and 9 in-house software suites directly integrated with SAP S/4HANA &amp; Oracle ERP — backed by guaranteed 4-hour on-site SLA across India's manufacturing corridors.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openDemoModal({ solution: 'Factory Automation Feasibility Walkthrough' })}
              style={{
                background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                color: '#040812',
                border: 'none',
                padding: '0.85rem 1.85rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(0, 113, 186, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Request Plant Walkthrough</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setCurrentView('insights')}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                padding: '0.85rem 1.75rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0071ba';
                e.currentTarget.style.color = '#0071ba';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.color = '#0f172a';
              }}
            >
              Read Customer Teardowns
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('archie-robot-full-view');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'rgba(0, 113, 186, 0.08)',
                color: '#0071ba',
                border: '1.5px solid rgba(0, 113, 186, 0.3)',
                padding: '0.85rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 113, 186, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 113, 186, 0.08)';
              }}
            >
              <Bot size={16} />
              <span>Meet Archie 3D AI Robot</span>
            </button>
          </div>
        </div>

        {/* EXPANSIVE BIG-SIZE VIEW: 3D PLANT TWIN & INSPECTION STATIONS CONSOLE */}
        <div 
          ref={consoleContainerRef}
          style={{
            position: 'relative',
            borderRadius: isFullscreen ? 0 : '20px',
            overflow: 'hidden',
            boxShadow: isFullscreen ? 'none' : '0 25px 70px rgba(15, 23, 42, 0.22), 0 0 50px rgba(0, 113, 186, 0.15)',
            border: isFullscreen ? 'none' : '1.5px solid rgba(0, 113, 186, 0.35)',
            backgroundColor: '#090e1a',
            height: isFullscreen ? '100vh' : 'auto',
            display: isFullscreen ? 'flex' : 'block',
            flexDirection: 'column'
          }}
        >
          {/* Top Industrial Control Ribbon */}
          <div style={{
            background: 'rgba(6, 14, 27, 0.98)',
            borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            color: '#ffffff'
          }}>
            {/* Left: Active Station Badge & Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff4d6d' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffc93c' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <div style={{
                background: 'rgba(0, 240, 255, 0.12)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                borderRadius: '999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#00f0ff',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
                <span>{activeStation.badge}</span>
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
                {activeStation.name}
              </span>
            </div>

            {/* Right: Expand Widescreen Toggle & External Full 3D Map Link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                {activeStation.telemetry}
              </span>

              {activeStation.type === 'simulator' && (
                <button
                  onClick={toggleTour}
                  style={{
                    background: isTourPlaying ? 'rgba(0, 240, 255, 0.22)' : 'rgba(255, 255, 255, 0.08)',
                    border: isTourPlaying ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: isTourPlaying ? '#00f0ff' : '#ffffff',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: isTourPlaying ? '0 0 14px rgba(0, 240, 255, 0.45)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  title={isTourPlaying ? 'Pause Archie Robot Movement' : 'Resume Archie Robot Factory Tour'}
                >
                  {isTourPlaying ? <Pause size={13} color="#00f0ff" /> : <Play size={13} color="#ffffff" />}
                  <span>{isTourPlaying ? '❚❚ Pause Robot Tour' : '▶ Start Robot Tour'}</span>
                </button>
              )}

              <button
                onClick={() => setIsHeroExpanded(prev => !prev)}
                style={{
                  background: isHeroExpanded ? 'rgba(0, 113, 186, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                  border: isHeroExpanded ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: isHeroExpanded ? '#00f0ff' : '#ffffff',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s ease'
                }}
                title={isHeroExpanded ? 'Switch to Standard Boxed View' : 'Switch to Expansive Widescreen'}
              >
                {isHeroExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                <span>{isHeroExpanded ? 'Standard View' : 'Big Screen View'}</span>
              </button>

              <button
                onClick={toggleFullscreen}
                style={{
                  background: isFullscreen ? '#0071ba' : 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid #00f0ff',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 0 12px rgba(0, 240, 255, 0.35)',
                  transition: 'all 0.15s ease'
                }}
                title={isFullscreen ? 'Exit Fullscreen Monitor View' : 'Open True Fullscreen Monitor View'}
              >
                <Maximize2 size={13} color="#00f0ff" />
                <span>{isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen Monitor'}</span>
              </button>

              <a
                href="/factory-map.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #0071ba 0%, #0284c7 100%)',
                  border: '1px solid #38bdf8',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 2px 10px rgba(0, 113, 186, 0.4)'
                }}
                title="Launch Full 3D Plant Simulation in new window"
              >
                <span>Full Tour</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* MAIN BIG-SIZE VIEWPORT */}
          <div style={{
            position: 'relative',
            height: isFullscreen ? 'calc(100vh - 120px)' : (isHeroExpanded ? 'clamp(620px, 78vh, 850px)' : 'clamp(520px, 60vw, 660px)'),
            minHeight: '520px',
            flex: isFullscreen ? 1 : 'none',
            overflow: 'hidden',
            backgroundColor: '#020b14',
            transition: 'height 0.3s ease'
          }}>
            {activeStation.type === 'simulator' ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <iframe
                  ref={simulatorIframeRef}
                  src={activeStation.simulatorUrl}
                  title="ATPL Smart Factory 3D Twin Simulator"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                  }}
                  allow="fullscreen; accelerometer; gyroscope"
                />

                {/* 3D Interaction Pill Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(9, 14, 26, 0.90)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  backdropFilter: 'blur(10px)',
                  color: '#38bdf8',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  pointerEvents: 'none',
                  zIndex: 10,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}>
                  <RotateCw size={13} />
                  <span>Interactive 3D WebGL Plant // Drag to Rotate, Zoom &amp; Orbit</span>
                </div>
              </div>
            ) : (
              <>
                <video
                  key={activeStation.video}
                  src={activeStation.video}
                  poster={activeStation.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.94
                  }}
                />

                {/* Shading Vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(to bottom, rgba(4, 9, 20, 0.2) 0%, rgba(4, 9, 20, 0.6) 100%)'
                }} />

                {/* Central Yellow Cognex-Style Play Button */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      background: '#eab308',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 40px rgba(234, 179, 8, 0.75)',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Watch Full-Screen Demonstration"
                  >
                    <Play size={32} color="#040812" fill="#040812" style={{ marginLeft: '4px' }} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Station Switcher Tabs Bar */}
          <div style={{
            background: '#091322',
            borderTop: '1px solid rgba(0, 240, 255, 0.25)',
            padding: '0.85rem 1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem'
          }}>
            {stations.map((st, idx) => {
              const isSelected = activeStationIndex === idx;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStationIndex(idx)}
                  style={{
                    background: isSelected ? 'rgba(0, 113, 186, 0.28)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1.5px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 20px rgba(0, 240, 255, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isSelected ? '#00f0ff' : '#64748b', fontFamily: 'monospace' }}>
                      STATION 0{idx + 1}
                    </span>
                    {isSelected && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {st.name}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: isSelected ? '#38bdf8' : '#64748b',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: '0.15rem'
                  }}>
                    {st.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Under-Video Cognex-Style Guiding Philosophy Caption */}
        <div style={{
          maxWidth: '980px',
          margin: '1.5rem auto 0',
          padding: '0 0.5rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.94rem',
            lineHeight: 1.6,
            color: '#64748b',
            margin: 0,
            fontStyle: 'italic',
            borderLeft: 'none',
            paddingLeft: 0
          }}>
            "Advanced, but not complicated. High-speed, but zero-escape. To be truly transformational on the factory floor, technology must work effortlessly from Day 1."
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. DEDICATED FULL-VIEW THEATER: ARCHIE 3D AI ROBOT AGENT
             (Placed in a separate, dedicated section in expansive full view)
         ========================================================================= */}
      <section 
        id="archie-robot-full-view"
        style={{
          backgroundColor: '#030816',
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(0, 113, 186, 0.28) 0%, rgba(3, 8, 22, 0.98) 75%)',
          color: '#ffffff',
          padding: '5.5rem 1.5rem',
          borderTop: '1px solid rgba(0, 240, 255, 0.25)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Holographic Cyber Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.55,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '999px',
              padding: '0.35rem 1.15rem',
              marginBottom: '1rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#00f0ff',
              textTransform: 'uppercase'
            }}>
              <Bot size={14} color="#00f0ff" />
              <span>Full-View Cinematic Theater // Autonomous Shopfloor Intelligence</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              lineHeight: 1.12,
              margin: '0 0 1rem',
              fontFamily: 'var(--font-display, sans-serif)'
            }}>
              Meet <span style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Archie 3D AI</span> in Full View
            </h2>

            <p style={{ fontSize: '1.08rem', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
              Autonomous multi-camera cognitive vision, live plant telemetry monitoring, and native ERP synchronization across 250+ connected manufacturing plants.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {Object.values(fullFeeds).map((feed) => {
              const isActive = fullVideoMode === feed.id;
              return (
                <button
                  key={feed.id}
                  onClick={() => {
                    setFullVideoMode(feed.id);
                    if (!fullVideoMuted) playAudioChime(isActive ? 440 : 587.33);
                  }}
                  style={{
                    backgroundColor: isActive ? '#0071ba' : 'rgba(15, 23, 42, 0.8)',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    border: isActive ? '1.5px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: isActive ? '0 0 20px rgba(0, 240, 255, 0.35)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#00f0ff' : '#64748b',
                    boxShadow: isActive ? '0 0 8px #00f0ff' : 'none'
                  }} />
                  <span>{feed.title.split('//')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* THE GRAND FULL-VIEW CINEMA THEATER CONTAINER */}
          <div
            ref={fullTheaterContainerRef}
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#020713',
              border: '1.5px solid rgba(0, 240, 255, 0.4)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 45px rgba(0, 113, 186, 0.25)',
              minHeight: '480px',
              height: 'clamp(460px, 56vw, 620px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* The Full-Screen Widescreen Video Stream */}
            <video
              ref={fullVideoRef}
              key={activeFeed.video}
              src={activeFeed.video}
              poster={activeFeed.poster}
              autoPlay
              loop
              muted={fullVideoMuted}
              playsInline
              onTimeUpdate={(e) => setVideoTime(e.currentTarget.currentTime)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />

            {/* Subtle Gradient Overlays for High-Contrast Readable HUD */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(2, 7, 19, 0.35) 0%, transparent 15%, transparent 85%, rgba(2, 7, 19, 0.6) 100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }} />

            {/* Top HUD Status Bar */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(2, 7, 19, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 240, 255, 0.45)',
                padding: '0.45rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#00f0ff',
                letterSpacing: '0.06em'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
                <Bot size={14} color="#00f0ff" />
                <span>ARCHIE // AI SHOPFLOOR AGENT</span>
                <span style={{ color: '#ffffff', opacity: 0.4 }}>|</span>
                <span style={{ color: '#10b981' }}>{activeFeed.status}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: 'rgba(2, 7, 19, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.74rem',
                color: '#94a3b8',
                fontFamily: 'monospace'
              }}>
                <span style={{ color: '#00f0ff', fontWeight: 700 }}>{activeFeed.resolution}</span>
                <span>•</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>{activeFeed.fps}</span>
                <span>•</span>
                <span style={{ color: '#ec4899', fontWeight: 700 }}>LATENCY: {activeFeed.latency}</span>
              </div>
            </div>

            {/* Bottom HUD Controls Bar */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              padding: '1.25rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              {/* Scrubber Bar */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setFullVideoProgress(Number(newProgress.toFixed(1)));
                  if (!fullVideoMuted) playAudioChime(520 + (newProgress * 3));
                }}
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                title="Click anywhere to scrub playback"
              >
                <div style={{
                  height: '100%',
                  width: `${fullVideoProgress}%`,
                  background: 'linear-gradient(90deg, #0071ba 0%, #00f0ff 60%, #ec4899 100%)',
                  borderRadius: '999px'
                }} />
              </div>

              {/* Control Buttons & Telemetry Summary */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Left: Play/Pause, Mute/Unmute, Timecode */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    onClick={() => {
                      const next = !fullVideoPlaying;
                      setFullVideoPlaying(next);
                      if (fullVideoRef.current) {
                        if (next) fullVideoRef.current.play();
                        else fullVideoRef.current.pause();
                      }
                      if (!fullVideoMuted) playAudioChime(next ? 660 : 440);
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: fullVideoPlaying ? '#0071ba' : '#0f172a',
                      color: '#ffffff',
                      border: '1px solid rgba(0, 240, 255, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(0, 113, 186, 0.4)'
                    }}
                  >
                    {fullVideoPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                  </button>

                  <button
                    onClick={() => {
                      const next = !fullVideoMuted;
                      setFullVideoMuted(next);
                      if (fullVideoRef.current) fullVideoRef.current.muted = next;
                      if (!next) playAudioChime(660);
                    }}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: fullVideoMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 240, 255, 0.2)',
                      color: fullVideoMuted ? '#94a3b8' : '#00f0ff',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {fullVideoMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700 }}>
                    {`00:${String(Math.floor((fullVideoProgress / 100) * 20)).padStart(2, '0')}`} / 00:20
                  </span>
                </div>

                {/* Right: Description & Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={toggleFullScreenVideo}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      padding: '0.55rem 1.15rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    <Maximize2 size={14} />
                    <span>Expand Fullscreen</span>
                  </button>

                  <button
                    onClick={() => openDemoModal({ solution: 'Archie 3D AI Robot Shopfloor Walkthrough' })}
                    style={{
                      background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                      color: '#040812',
                      border: 'none',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                    }}
                  >
                    <span>Request Walkthrough</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Telemetry Pods Under the Full-View Cinema */}
          <div style={{
            marginTop: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.74rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase' }}>EDGE COGNITIVE LATENCY</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>5.8 ms</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>Sub-8ms decode with zero line standstills</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>HIGH-SPEED THROUGHPUT</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>180 PPM</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>Continuous inspection at 12 km/h conveyor speed</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(232, 88, 116, 0.25)',
              borderRadius: '14px',
              padding: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.74rem', color: '#E85874', fontWeight: 800, textTransform: 'uppercase' }}>DEFECT ESCAPE RATE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>0.00%</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>14M+ parts verified with optical SLA guarantee</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '14px',
              padding: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>ENTERPRISE SYNC</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>SAP &amp; Oracle</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem' }}>Native sub-second IDocs and REST webhooks</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. KEY VALUE PILLARS (THE 6 PILLARS OF WHY ATPL - UPGRADED 3D ANIMATED CARDS)
         ========================================================================= */}
      <WhyAtplCardsSection />

      {/* =========================================================================
          4. HEAD-TO-HEAD COMPARISON MATRIX (ANIMATED RACE TIMELINE & CRITERIA EXPLORER)
         ========================================================================= */}
      <HowAtplComparesSection />

      {/* =========================================================================
          5. METRICS COUNTER BAR & ENTERPRISE ROSTER
         ========================================================================= */}
      <section style={{
        backgroundColor: '#040812',
        color: '#ffffff',
        padding: '4.5rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: '#00f0ff', lineHeight: 1 }}>
                500+
              </div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
                Plant Automations Across India
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                99.985%
              </div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
                First-Pass Read &amp; QC Accuracy
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: '#E85874', lineHeight: 1 }}>
                14,000,000+
              </div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
                Parts Inspected With Zero Escape
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
                &lt; 4 Hours
              </div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
                Guaranteed Emergency On-Site SLA
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>
            TRUSTED BY LEADERS IN AUTOMOTIVE, EV, PHARMACEUTICALS, AND 3PL LOGISTICS
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. REAL PLANT DEPLOYMENT BLUEPRINTS (LINKED TO INSIGHTS)
         ========================================================================= */}
      <section style={{ maxWidth: '1240px', margin: '5rem auto', padding: '0 1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0071ba', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
              PROVEN RESULTS
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Recent Field Deployment Teardowns
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('insights')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0071ba',
              fontWeight: 700,
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <span>View All Insights</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {/* Card 1: Ola Electric */}
          <div
            onClick={() => navigateToInsight('sub-8ms-battery-cell-traceability-ola-futurefactory')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ height: '190px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Ola FutureFactory EV Battery Traceability"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.74rem', color: '#0071ba', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                AUTOMOTIVE &amp; EV
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                Sub-8ms Battery Cell Traceability: How Ola Solved Pack Genealogy
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                180 PPM line scan vision capturing 1,728 cylindrical 21700 cells per battery pack with zero false rejects under AIS-156 mandates.
              </p>
            </div>
          </div>

          {/* Card 2: Sundram Fasteners */}
          <div
            onClick={() => navigateToInsight('edge-tensorrt-vision-microscopic-casting-flaws-sundram-fasteners')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ height: '190px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Sundram Fasteners Machine Vision"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.74rem', color: '#0071ba', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                INDUSTRY 4.0 &amp; MACHINE VISION
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                Edge TensorRT Vision vs Microscopic Casting Flaws: 6.2ms Inspection
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                Catching 50-micron porosity and hairline fissures across 14 million precision automotive bolts with sub-pixel interpolation.
              </p>
            </div>
          </div>

          {/* Card 3: Proconnect Logistics */}
          <div
            onClick={() => navigateToInsight('decoding-1400-tags-second-high-density-dock-portals')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ height: '190px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="High-Density RFID Portals"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.74rem', color: '#0071ba', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                RAIN RFID &amp; HARDWARE
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                Decoding 1,400 Tags/Sec Through Shrink Wrap: RFID Dock Portals
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                Narrow-beam phased arrays and Doppler filtering eliminating adjacent lane crosstalk during peak 40-foot container unloading.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          7. BOTTOM CALL TO ACTION BANNER
         ========================================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #040812 100%)',
        color: '#ffffff',
        padding: '5rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 1.25rem',
            fontFamily: 'var(--font-display, sans-serif)'
          }}>
            Ready to Make Your Factory Automation Flawless?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.65, margin: '0 0 2.5rem' }}>
            Schedule an on-site feasibility study with senior ATPL automation engineers. We will inspect your line, test sample parts, and provide an integration blueprint within 5 business days.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openDemoModal()}
              style={{
                background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                color: '#040812',
                border: 'none',
                padding: '0.9rem 2.2rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
              }}
            >
              Book On-Site Line Audit
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.9rem 2rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Contact Chennai HQ (TIDEL Park)
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FULL-SCREEN VIDEO MODAL
         ========================================================================= */}
      {videoModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 9, 20, 0.92)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '960px',
            background: '#090e1a',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.9)'
            }}>
              <div>
                <div style={{ color: '#00f0ff', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  ATPL LIVE DEMO // {activeStation.badge}
                </div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 800 }}>
                  {activeStation.name}
                </div>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
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

            <div style={{ position: 'relative', height: '480px', backgroundColor: '#000000' }}>
              {activeStation.type === 'simulator' ? (
                <iframe
                  src={activeStation.simulatorUrl}
                  title={activeStation.name}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="fullscreen; accelerometer; gyroscope"
                />
              ) : (
                <video
                  key={activeStation.video}
                  src={activeStation.video}
                  poster={activeStation.poster}
                  autoPlay
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </div>

            <div style={{ padding: '1.25rem 1.5rem', background: '#090e1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.86rem', maxWidth: '600px' }}>
                {activeStation.description}
              </div>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  openDemoModal();
                }}
                style={{
                  background: '#0071ba',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Schedule Station Demo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
