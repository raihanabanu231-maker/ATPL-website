import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  X, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
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
import { motion, AnimatePresence } from 'framer-motion';

export const WhyAtplView = () => {
  const { openDemoModal, setCurrentView, navigateToInsight } = useApp();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Full-View Cinematic Robot Theater State
  const [fullVideoMode, setFullVideoMode] = useState('waving');
  const [fullVideoPlaying, setFullVideoPlaying] = useState(true);
  const [fullVideoMuted, setFullVideoMuted] = useState(true);
  const [fullVideoProgress, setFullVideoProgress] = useState(18);
  const fullVideoRef = useRef(null);
  const fullTheaterContainerRef = useRef(null);

  const fullFeeds = {
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

  // Cognex-Style Machine Vision Inspection Stations
  const stations = [
    {
      id: 'vision-qc',
      name: 'High-Speed Conveyor Vision',
      tagline: 'Edge AI defect inspection at 180 parts/minute',
      video: '/assets/videos/scanner_conveyor_360.mp4',
      poster: '/assets/videos/posters/scanner_conveyor_360.jpg',
      badge: '99.985% First-Pass Yield',
      description: 'Synchronized telecentric cameras and 460nm polarized ring strobes catching 50-micron porosity, burrs, and barcode grading violations in under 6.2 milliseconds.'
    },
    {
      id: 'dpm-laser',
      name: 'DPM Laser Marking & Verification',
      tagline: 'Permanent ISO/IEC 15415 data matrix serialization',
      video: '/assets/videos/laser_marker_360.mp4',
      poster: '/assets/videos/posters/uv_laser_360.jpg',
      badge: 'AIS-156 EV Battery Genealogy',
      description: 'Fiber and UV laser stations marking micro-QR codes directly on cylindrical 21700 EV battery cells, automotive knuckles, and turbine blades with zero degradation.'
    },
    {
      id: 'rfid-portal',
      name: 'High-Density RAIN RFID Dock Portal',
      tagline: '1,420 tags/second through stretch film',
      video: '/assets/videos/rfid_antenna_360.mp4',
      poster: '/assets/videos/posters/rfid_antenna_360.jpg',
      badge: 'Zero Ghost-Read Shielding',
      description: 'Directional narrow-beam phased arrays paired with Doppler phase velocity filtering, eliminating cross-dock staging crosstalk while forklifts pass at 12 km/h.'
    },
    {
      id: 'mobile-wms',
      name: 'Rugged Warehouse Handhelds & ASRS',
      tagline: 'Continuous cold-chain and forklift inventory sync',
      video: '/assets/videos/mobility_360.mp4',
      poster: '/assets/videos/posters/touch_computer_360.jpg',
      badge: 'IP68 & Drop-Tested 2.4m',
      description: 'Enterprise Android mobile computers integrated natively into Perfect Store™ WMS and SAP EWM with 3D spatial bin heatmaps and offline buffer caching.'
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

  const comparisonData = [
    {
      criterion: 'Deployment Velocity',
      atpl: { title: '2 to 4 Weeks Turnkey', desc: 'Pre-calibrated hardware modules and plug-and-play ERP connectors.', positive: true },
      resellers: { title: '6 to 12 Months', desc: 'Disjointed third-party software integration and custom driver writing.', positive: false },
      megaVendors: { title: '12 to 18 Months', desc: 'Protracted multi-phase rollouts with heavy professional services fees.', positive: false }
    },
    {
      criterion: 'Hardware & Software Responsibility',
      atpl: { title: 'Single Turnkey Partner', desc: 'ATPL owns the optical design, PLC logic, and software stack from end to end.', positive: true },
      resellers: { title: 'Vendor Finger-Pointing', desc: 'Hardware vendor blames software vendor when misreads or latency occurs.', positive: false },
      megaVendors: { title: 'Proprietary Lock-in', desc: 'Rigid ecosystems requiring expensive proprietary certified peripherals.', positive: false }
    },
    {
      criterion: 'Real-Time ERP Sync (SAP / Oracle)',
      atpl: { title: 'Sub-Second Certified Connectors', desc: 'Direct bi-directional IDocs & REST webhooks with offline failover buffer.', positive: true },
      resellers: { title: 'Fragile Batch Cron Jobs', desc: 'Periodic CSV dumps causing ghost inventory and shipping discrepancies.', positive: false },
      megaVendors: { title: 'Complex Middleware Tax', desc: 'Requires expensive enterprise service buses (MuleSoft, SAP PI/PO).', positive: false }
    },
    {
      criterion: 'On-Site Field Support & AMC SLA',
      atpl: { title: 'Guaranteed 4-Hour On-Site SLA', desc: 'Local engineering squads in Chennai, Hosur, Bangalore & Madurai.', positive: true },
      resellers: { title: 'Best-Effort Ticketing', desc: '48 to 72 hour email response times with no local hardware swap pool.', positive: false },
      megaVendors: { title: 'Multi-Tier Offshore Queues', desc: 'Tier-1/2 call centers with days of delay before physical dispatch.', positive: false }
    },
    {
      criterion: 'Defect Escape Guarantee',
      atpl: { title: '100% Escape Prevention', desc: 'Sub-pixel AI defect detection backed by optical verification SLA.', positive: true },
      resellers: { title: 'No Guarantee on Reads', desc: 'Resells equipment with standard OEM manufacturer pass-through warranty.', positive: false },
      megaVendors: { title: 'Software Only SLA', desc: 'No responsibility for ambient lighting, vibration, or optical errors.', positive: false }
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
          2. COGNEX-STYLE MACHINE VISION HERO & INSPECTION STATIONS
         ========================================================================= */}
      <section style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '3.5rem',
        alignItems: 'center'
      }}>
        {/* Left Column: Typography & Lead Messaging */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(0, 113, 186, 0.08)',
            border: '1px solid rgba(0, 113, 186, 0.25)',
            borderRadius: '999px',
            padding: '0.3rem 0.85rem',
            marginBottom: '1.25rem',
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
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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
            fontSize: 'clamp(1.35rem, 2.3vw, 1.85rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#0f172a',
            margin: '0 0 1.5rem',
            letterSpacing: '-0.015em'
          }}>
            Advanced Machine Vision &amp; Factory Automation Made Flawless
          </h2>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: '#475569',
            margin: '0 0 1.25rem'
          }}>
            Archery Technocrats stands alone in combining advanced machine vision, industrial RAIN RFID, and turnkey shopfloor automation that reliably solves India's toughest manufacturing challenges — backed by industry-leading 24/7 on-site support that makes every solution easier to deploy, maintain, and expand.
          </p>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: '#475569',
            margin: '0 0 2rem'
          }}>
            We've built a decade of customer success across automotive, pharma, electronics, FMCG, and logistics by delivering zero-defect shopfloor intelligence with enterprise SAP S/4HANA &amp; Oracle ERP interoperability.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
          </div>
        </div>

        {/* Right Column: Split Camera / Machine Vision Inspection Player */}
        <div>
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#090e1a'
          }}>
            {/* Split Screen Video Preview */}
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
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
                  opacity: 0.92
                }}
              />

              {/* Cognex-style Inspection HUD Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(4, 9, 20, 0.2) 0%, rgba(4, 9, 20, 0.6) 100%)'
              }} />

              {/* Station Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(9, 14, 26, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                color: '#00f0ff',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                {activeStation.badge}
              </div>

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
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#eab308',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 35px rgba(234, 179, 8, 0.7)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  title="Watch Full-Screen Demonstration"
                >
                  <Play size={28} color="#040812" fill="#040812" style={{ marginLeft: '4px' }} />
                </button>
              </div>

              {/* Telemetry Bar at Bottom of Video */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.75rem 1rem',
                background: 'rgba(9, 14, 26, 0.9)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono, monospace)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#00f0ff', fontWeight: 700 }}>{activeStation.name}</span>
                </div>
                <div style={{ color: '#94a3b8' }}>LIVE ATPL TELEMETRY: 6.2ms</div>
              </div>
            </div>

            {/* Station Switcher Tabs */}
            <div style={{
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              padding: '0.75rem 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '0.5rem'
            }}>
              {stations.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStationIndex(idx)}
                  style={{
                    background: activeStationIndex === idx ? '#ffffff' : 'transparent',
                    border: activeStationIndex === idx ? '1.5px solid #0071ba' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.5rem 0.25rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: activeStationIndex === idx ? '0 2px 8px rgba(0, 113, 186, 0.15)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: activeStationIndex === idx ? '#0071ba' : '#64748b' }}>
                    0{idx + 1}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: activeStationIndex === idx ? '#0f172a' : '#475569',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {st.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Under-Video Cognex-Style Guiding Philosophy Caption */}
          <div style={{
            marginTop: '1.25rem',
            padding: '0 0.5rem',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: '#64748b',
              margin: 0,
              fontStyle: 'italic',
              borderLeft: '3px solid #0071ba',
              paddingLeft: '0.85rem'
            }}>
              "Advanced, but not complicated. High-speed, but zero-escape. To be truly transformational on the factory floor, technology must work effortlessly from Day 1."
            </p>
          </div>
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
              background: 'linear-gradient(180deg, rgba(2, 7, 19, 0.75) 0%, transparent 25%, transparent 70%, rgba(2, 7, 19, 0.92) 100%)',
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
          4. KEY VALUE PILLARS (THE 6 PILLARS OF WHY ATPL)
         ========================================================================= */}
      <section style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '5rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 900,
              color: '#0f172a',
              margin: '0 0 1rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display, sans-serif)'
            }}>
              Engineering Excellence Built for Indian Industry
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
              Why leading OEMs and Tier-1 suppliers choose Archery Technocrats as their primary factory automation partner.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {pillars.map((pillar, pIdx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pIdx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0071ba';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 113, 186, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(0, 113, 186, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: '#0071ba'
                  }}>
                    <IconComp size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                    {pillar.title}
                  </h3>

                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0071ba', marginBottom: '1rem' }}>
                    {pillar.subtitle}
                  </div>

                  <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. HEAD-TO-HEAD COMPARISON MATRIX (COGNEX-STYLE TEARDOWN)
         ========================================================================= */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '999px',
            padding: '0.3rem 0.85rem',
            marginBottom: '1rem',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#059669',
            textTransform: 'uppercase'
          }}>
            <ShieldCheck size={14} />
            <span>Honest Evaluation</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 1rem',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display, sans-serif)'
          }}>
            How ATPL Compares
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            Compare ATPL’s turnkey engineering against traditional hardware resellers and rigid enterprise software monoliths.
          </p>
        </div>

        <div style={{
          overflowX: 'auto',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1.25rem 1.5rem', width: '25%', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  CRITERIA
                </th>
                <th style={{ padding: '1.25rem 1.5rem', width: '30%', background: 'rgba(0, 113, 186, 0.06)', borderLeft: '2px solid #0071ba', borderRight: '2px solid #0071ba' }}>
                  <div style={{ color: '#0071ba', fontWeight: 800, fontSize: '1.05rem' }}>ATPL Turnkey Engineering</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Hardware + In-House Software</div>
                </th>
                <th style={{ padding: '1.25rem 1.5rem', width: '22%', color: '#475569', fontSize: '0.92rem' }}>
                  <div style={{ fontWeight: 700 }}>Traditional Resellers</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Hardware Box-Pushers</div>
                </th>
                <th style={{ padding: '1.25rem 1.5rem', width: '23%', color: '#475569', fontSize: '0.92rem' }}>
                  <div style={{ fontWeight: 700 }}>Mega Software Vendors</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Rigid COTS Monoliths</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  
                  {/* Criterion Title */}
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.94rem' }}>
                    {row.criterion}
                  </td>

                  {/* ATPL Column (Highlighted) */}
                  <td style={{ padding: '1.25rem 1.5rem', background: 'rgba(0, 113, 186, 0.03)', borderLeft: '2px solid #0071ba', borderRight: '2px solid #0071ba' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <CheckCircle2 size={18} color="#0071ba" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0071ba', fontSize: '0.95rem' }}>{row.atpl.title}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>{row.atpl.desc}</div>
                      </div>
                    </div>
                  </td>

                  {/* Traditional Resellers */}
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <X size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.88rem' }}>{row.resellers.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem', lineHeight: 1.4 }}>{row.resellers.desc}</div>
                      </div>
                    </div>
                  </td>

                  {/* Mega Vendors */}
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <X size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.88rem' }}>{row.megaVendors.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem', lineHeight: 1.4 }}>{row.megaVendors.desc}</div>
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

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
              <video
                key={activeStation.video}
                src={activeStation.video}
                poster={activeStation.poster}
                autoPlay
                controls
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
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
