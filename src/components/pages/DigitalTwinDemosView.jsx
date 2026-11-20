import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  RotateCw, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Boxes, 
  Radio, 
  ArrowRight, 
  ChevronRight, 
  Eye, 
  Zap, 
  Printer, 
  Smartphone, 
  Factory, 
  Video, 
  Share2, 
  HelpCircle,
  Clock,
  Compass,
  Volume2,
  VolumeX,
  Bot,
  Award,
    ChevronLeft
} from 'lucide-react';
import { HardwareVideoMatrixGrid } from '../hardware/HardwareVideoMatrixGrid';

// 11 Real Customer Project Deployments explained by Archie Robot
export const FACTORY_PROJECT_STATIONS = [
  {
    index: 0,
    num: '01',
    name: 'Perfect Edge MDM',
    category: 'Enterprise Frontline Device Management',
    client: 'Pan-India Express Logistics Fleet',
    clientBadge: '★ PRIORITY #1 · 5,000+ MANAGED HANDHELDS',
    challenge: 'Field handheld downtime, lost devices, and OS configuration errors crippled driver delivery routes.',
    solution: 'Zero-touch remote enrollment, remote desktop screen takeover for instant IT support, and geofenced kiosk locks.',
    kpi: '85% Faster Remote IT Support · 100% Kiosk Lockdown',
    telemetry: '5,000+ Active Devices Managed',
    hardwareRef: 'vid-hw-mobility-rugged',
    hardwareName: 'Rugged Handheld Computer',
    speechText: "Welcome to Station 01! Perfect Edge MDM is our #1 top priority flagship suite. We manage over 5,000 rugged warehouse and courier handhelds across India, providing instant remote screen control, tamper-proof kiosk lockdown, and zero-touch device provisioning.",
    desc: 'Centralized security, telemetry, and remote screen assistance for enterprise Android devices with live cloud portal.'
  },
  {
    index: 1,
    num: '02',
    name: 'Perfect Labeler™',
    category: 'AI Cloud Label Design & Operations',
    client: 'Sterile Pharmaceutical Packaging Facility',
    clientBadge: '★ PRIORITY #2 · 200+ UNIFIED PRINTERS',
    challenge: 'Disjointed label templates across Zebra, TSC, and Honeywell printers caused costly regulatory compliance fines.',
    solution: 'Centralized SaaS label management with 21 CFR Part 11 audit trails, AI template generation, and direct cloud ZPL print drivers.',
    kpi: '-90% Template Authoring Time · Zero Extra Printer Fees',
    telemetry: '100% GS1 & US FDA Compliance',
    hardwareRef: 'vid-hw-printer-rfid',
    hardwareName: 'Industrial RFID Barcode Printer',
    speechText: "Station 02 is Perfect Labeler, our priority cloud printing platform! In sterile pharmaceutical packaging, we unified over 200 industrial printers across 6 sites onto a single cloud platform with instant AI template generation.",
    desc: 'Connects enterprise ERP data, label approval workflows, and 600 DPI industrial printers on one scalable platform.'
  },
  {
    index: 2,
    num: '03',
    name: 'PerfectFlow 360™',
    category: 'Enterprise Field Operations & CRM',
    client: 'Pan-India Industrial Spares Distributor',
    clientBadge: 'MULTI-FACILITY DISTRIBUTION // 360° OPS',
    challenge: 'Uncoordinated field sales routes, manual quote preparation delays, and missing dispatch visibility across regional warehouses.',
    solution: 'Centralized CRM & operations suite combining instant quotation generation, live GPS field attendance, and real-time dispatch tracking.',
    kpi: '-40% Order-to-Dispatch Cycle · 100% Field Visibility',
    telemetry: 'Live GPS & Instant Quotations',
    hardwareRef: 'vid-hw-tablet-rugged',
    hardwareName: 'Rugged Enterprise Tablet',
    speechText: "Station 03 is PerfectFlow 360! It unifies enterprise CRM, quotation approvals, and live field dispatch operations in real-time, connecting sales reps and warehouse dispatch teams seamlessly.",
    desc: 'Real-time lead management, instant quotations, employee GPS tracking, and multi-facility order fulfillment on one unified cloud platform.'
  },
  {
    index: 3,
    num: '04',
    name: 'Perfect Trace™',
    category: 'GS1 Supply Chain Traceability',
    client: 'Ola Electric FutureFactory',
    clientBadge: 'EV MEGA-FACTORY // TAMIL NADU',
    challenge: 'Manual cell tracking caused 2-hour battery pack assembly bottlenecks and recall vulnerability.',
    solution: 'Sub-8ms cryptographic DPM laser verification + 4-tier packaging aggregation directly to SAP S/4HANA.',
    kpi: '-98% Allocation Time (2 hrs → 2 mins)',
    telemetry: '12ms Cell Telemetry',
    hardwareRef: 'vid-hw-scanner-dpm',
    hardwareName: 'Industrial DPM Scanner',
    speechText: "Station 04 is Perfect Trace! For leading EV battery gigafactories, ATPL engineered 12-millisecond Direct Part Mark tracking on every battery cell. This slashed pack allocation from 2 hours to 2 minutes with 100% AIS-156 EV compliance.",
    desc: 'Direct Part Mark cognitive imagers verify 2D DataMatrix on cylindrical battery cells with 12ms SAP integration.'
  },
  {
    index: 4,
    num: '05',
    name: 'Perfect Store™ WMS',
    category: 'Intelligent Warehouse Management',
    client: 'Proconnect Supply Chain Logistics',
    clientBadge: '120,000 SQ.FT FULFILLMENT HUB',
    challenge: 'Phantom inventory and uncoordinated forklift travel caused dock-to-stock delays of over 4 hours.',
    solution: 'Dynamic 3D bin heatmaps, automated RFID gate verification, and AI-directed FIFO picking paths.',
    kpi: '-65% Dock-to-Stock Turnaround',
    telemetry: '+38% Forklift Speed',
    hardwareRef: 'vid-hw-touch-vehicle',
    hardwareName: 'Vehicle Mount Computer',
    speechText: "Moving to Station 05! At leading logistics hubs, Perfect Store uses 3D bin heatmaps and RFID portals to cut dock-to-stock turnaround by 65% with 99.98% inventory accuracy.",
    desc: 'Real-time 3D volumetric slotting and FIFO order fulfillment with native two-way SAP & Oracle sync.'
  },
  {
    index: 5,
    num: '06',
    name: 'Fixed UHF RFID Portals',
    category: 'Industrial AIDC Infrastructure',
    client: 'Pegatron / Foxconn Electronics OEM',
    clientBadge: '18 DOCK GATES // HIGH-VOLUME SMT',
    challenge: 'Manual barcode checks at dock doors stalled forklift traffic and caused shipment mismatches.',
    solution: 'Fixed 4-antenna beam-steered Impinj R700 UHF portals reading through pallet stretch-wrap in motion.',
    kpi: '1,400+ Tags/Sec Dense Read Rate',
    telemetry: '0.8s Pass-Through Verification',
    hardwareRef: 'vid-hw-rfid-portal',
    hardwareName: 'Fixed UHF RFID Portal',
    speechText: "Station 06 features our Fixed UHF RFID Portals! Capable of decoding over 1,400 tags per second, forklifts drive through dock doors at full speed without stopping, instantly generating goods receipts in SAP.",
    desc: 'Autonomous multi-antenna gate captures full pallet inventory as forklifts enter dispatch bays.'
  },
  {
    index: 6,
    num: '07',
    name: 'Vision AI Defect QC',
    category: 'Cognitive Surface & Defect Inspection',
    client: 'BorgWarner & Tier-1 Powertrain Castings',
    clientBadge: 'HIGH-PRESSURE DIE CASTING',
    challenge: 'Sub-millimeter porosity and hairline thread defects escaped manual human visual inspection.',
    solution: 'Telecentric optics with edge TensorRT neural inference models running on NVIDIA GPUs.',
    kpi: '<0.01% False Rejects · Zero Escape',
    telemetry: '6.2ms Real-Time Inference',
    hardwareRef: 'vid-hw-vision-cam',
    hardwareName: 'High-Speed Machine Vision Camera',
    speechText: "Station 07 is our Deep Learning Vision AI! Running neural inference models on NVIDIA edge GPUs, we inspect automotive die-castings in 6.2 milliseconds, achieving a zero defect escape rate.",
    desc: 'Sub-pixel optical classification triggers pneumatic reject gates within 6.2ms of part entry.'
  },
  {
    index: 7,
    num: '08',
    name: 'ERP Sync Middleware',
    category: 'Enterprise Middleware & IIoT Bridge',
    client: 'Multi-Plant Heavy Engineering Enterprise',
    clientBadge: '5,000+ CONNECTED IIoT DEVICES',
    challenge: 'Shopfloor sensors and scanners could not update SAP S/4HANA financial ledgers without data latency.',
    solution: 'Certified SAP IDOC & Oracle REST microservices middleware syncing 3.2M shopfloor events daily.',
    kpi: '3.2M Records / Day Processed',
    telemetry: '48ms Sync Latency to SAP',
    hardwareRef: 'vid-hw-edge-gateway',
    hardwareName: 'Industrial Edge Controller',
    speechText: "Station 08 is ATPL's ERP Sync Middleware! It connects over 5,000 factory floor devices straight into SAP S/4HANA and Oracle Cloud with 48-millisecond deterministic latency.",
    desc: 'Eliminates data silos by bridging raw PLC/sensor telemetry directly into SAP, Oracle, and Dynamics.'
  },
  {
    index: 8,
    num: '09',
    name: 'High-Speed Conveyor Scanners',
    category: 'In-Line Barcode & Dimensioning',
    client: 'Apollo Tyres Manufacturing',
    clientBadge: 'HIGH-SPEED RUBBER EXTRUSION & BEAD',
    challenge: 'Curved tire beads moving at 4 m/s on conveyors resulted in 12% misreads with standard laser imagers.',
    solution: 'Fixed liquid-lens 2D imagers with patented specular glare cancellation and omnidirectional decoding.',
    kpi: '+50% Dispatch Accuracy Uplift',
    telemetry: '120 m/min Belt Scanning Speed',
    hardwareRef: 'vid-hw-scanner-conveyor',
    hardwareName: 'Omnidirectional Conveyor Scanner',
    speechText: "Station 09 represents our high-speed conveyor scanning deployment for automotive manufacturing! Liquid-lens imagers capture curved rubber tire barcodes at 120 meters per minute, lifting dispatch accuracy by 50%.",
    desc: 'Decodes low-contrast, curved, and laser-etched codes at conveyor speeds up to 120 meters/minute.'
  },
  {
    index: 9,
    num: '10',
    name: 'Perfect Audit™',
    category: 'SaaS ISO Internal Audit Management',
    client: 'Top Indian FMCG & Dairy Conglomerate',
    clientBadge: '14 PROCESSING PLANTS // MULTI-STATE',
    challenge: 'Paper audit forms delayed compliance certification by 3 days per plant with missing photo logs.',
    solution: 'Cloud mobile audit checklists, timestamped tamper-evident photo logs, and automated CAPA routing.',
    kpi: '-70% Audit Prep Time',
    telemetry: '100% Paperless ISO 9001',
    hardwareRef: 'vid-hw-tablet-rugged',
    hardwareName: 'Rugged Enterprise Tablet',
    speechText: "Here at Station 10: Perfect Audit! We replaced paper inspection forms across 14 dairy plants with tamper-evident digital checklists, reducing compliance preparation time by 70%.",
    desc: 'Eliminates paper checklists and accelerates corrective action verification across multi-facility operations.'
  },
  {
    index: 10,
    num: '11',
    name: 'Production Monitoring (PMS)',
    category: 'Shopfloor OEE & Generative AI Copilot',
    client: 'Automotive Precision Press & Machining Shop',
    clientBadge: 'AUTOMOTIVE TIER-1 STAMPING',
    challenge: 'Unplanned press downtime costing ₹45,000/hour with paper-based root-cause investigation.',
    solution: 'Edge PMS calculating live OEE at 10ms intervals paired with Archie AI predictive maintenance alerts.',
    kpi: '+22% OEE Productivity Uplift',
    telemetry: '-45% Unplanned Downtime',
    hardwareRef: 'vid-hw-touch-panel',
    hardwareName: 'Industrial Touch Panel PC',
    speechText: "Station 11 is our Production Monitoring System! By calculating Overall Equipment Effectiveness at 10-millisecond intervals and deploying Archie AI predictive alerts, we boosted plant OEE by 22%.",
    desc: 'Real-time OEE tracking and Generative AI root-cause troubleshooting for shopfloor maintenance teams.'
  }
];

export const DigitalTwinDemosView = memo(() => {
  const { openDemoModal } = useApp();
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isFullscreenSimulator, setIsFullscreenSimulator] = useState(false);
  const [isExplanationCardMinimized, setIsExplanationCardMinimized] = useState(false);
  const simulatorIframeRef = useRef(null);

  const currentProject = FACTORY_PROJECT_STATIONS[selectedStationIndex] || FACTORY_PROJECT_STATIONS[0];

  // Smooth scroll helper
  const scrollToSection = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle fullscreen mode for the 3D Simulator
  const toggleFullscreenSimulator = () => {
    setIsFullscreenSimulator(prev => !prev);
  };

  // Speak Archie project explanation
  const speakCurrentProject = useCallback((project) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(project.speechText);
      utterance.rate = 1.05;
      utterance.pitch = 1.08;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }, []);

  // Send station selection message to the iframe
  const sendStationToIframe = useCallback((index) => {
    setSelectedStationIndex(index);
    if (simulatorIframeRef.current && simulatorIframeRef.current.contentWindow) {
      simulatorIframeRef.current.contentWindow.postMessage({
        action: 'selectStation',
        index
      }, '*');
    }
    if (isVoiceEnabled) {
      speakCurrentProject(FACTORY_PROJECT_STATIONS[index]);
    }
  }, [isVoiceEnabled, speakCurrentProject]);

  // Start / Pause Archie Robot Project Tour
  const toggleRobotTour = () => {
    const nextState = !isPlayingTour;
    setIsPlayingTour(nextState);
    if (simulatorIframeRef.current && simulatorIframeRef.current.contentWindow) {
      simulatorIframeRef.current.contentWindow.postMessage({
        action: nextState ? 'startTour' : 'stopTour'
      }, '*');
    }
    if (nextState && isVoiceEnabled) {
      speakCurrentProject(currentProject);
    } else if (!nextState && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Next / Previous Project Navigation
  const handleNextProject = () => {
    const nextIdx = (selectedStationIndex + 1) % FACTORY_PROJECT_STATIONS.length;
    sendStationToIframe(nextIdx);
  };

  const handlePrevProject = () => {
    const prevIdx = (selectedStationIndex - 1 + FACTORY_PROJECT_STATIONS.length) % FACTORY_PROJECT_STATIONS.length;
    sendStationToIframe(prevIdx);
  };

  // Toggle Voice Narration
  const toggleVoice = () => {
    const nextVoice = !isVoiceEnabled;
    setIsVoiceEnabled(nextVoice);
    if (nextVoice) {
      speakCurrentProject(currentProject);
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (simulatorIframeRef.current && simulatorIframeRef.current.contentWindow) {
      simulatorIframeRef.current.contentWindow.postMessage({
        action: 'toggleVoice',
        enabled: nextVoice
      }, '*');
    }
  };

  // Listen for station changes and tour updates from inside the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return;
      if (event.data.type === 'STATION_CHANGED' && typeof event.data.index === 'number') {
        setSelectedStationIndex(event.data.index);
        if (isVoiceEnabled && FACTORY_PROJECT_STATIONS[event.data.index]) {
          speakCurrentProject(FACTORY_PROJECT_STATIONS[event.data.index]);
        }
      } else if (event.data.type === 'TOUR_STATE') {
        setIsPlayingTour(!!event.data.isPlaying);
        if (typeof event.data.index === 'number') {
          setSelectedStationIndex(event.data.index);
        }
      } else if (event.data.type === 'VOICE_STATE') {
        setIsVoiceEnabled(!!event.data.enabled);
      } else if (event.data.type === 'JUMP_TO_HARDWARE_VIDEO') {
        scrollToSection('hardware-360-matrix');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isVoiceEnabled, speakCurrentProject]);

  return (
    <div style={{
      backgroundColor: '#060b14',
      color: '#f8fafc',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'clip',
      paddingBottom: '6rem'
    }}>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        background: 'radial-gradient(circle at 50% 15%, rgba(0, 240, 255, 0.12) 0%, rgba(232, 88, 116, 0.06) 40%, transparent 75%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* STICKY QUICK-SWITCHER DOCK */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 900,
        backgroundColor: 'rgba(6, 11, 20, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.65rem 1rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Left: Quick Jump Navigation Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.25rem' }}>
              Jump To:
            </span>

            <button
              onClick={() => scrollToSection('3d-simulator')}
              style={{
                backgroundColor: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                color: '#00f0ff',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.08)'}
            >
              <Sparkles size={13} color="#00f0ff" />
              <span>3D Plant Simulator</span>
            </button>

            <button
              onClick={() => scrollToSection('hardware-360-matrix')}
              style={{
                backgroundColor: 'rgba(232, 88, 116, 0.08)',
                border: '1px solid rgba(232, 88, 116, 0.35)',
                color: '#E85874',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 88, 116, 0.08)'}
            >
              <RotateCw size={13} color="#E85874" />
              <span>360° Product Demo Videos</span>
            </button>

            <button
              onClick={() => scrollToSection('stations-deepdive')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              <Activity size={13} color="#10b981" />
              <span>11 Project Deployments</span>
            </button>
          </div>

          {/* Right: Fullscreen Launcher & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleFullscreenSimulator}
              style={{
                backgroundColor: isFullscreenSimulator ? '#00f0ff' : 'rgba(255, 255, 255, 0.06)',
                border: isFullscreenSimulator ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.2)',
                color: isFullscreenSimulator ? '#020b14' : '#ffffff',
                borderRadius: '8px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s'
              }}
              title="Toggle Fullscreen 3D Simulator"
            >
              {isFullscreenSimulator ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              <span>{isFullscreenSimulator ? 'Exit Fullscreen' : 'Expand Simulator'}</span>
            </button>

            <button
              onClick={() => openDemoModal('3d-twin-demos')}
              style={{
                background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(0, 113, 186, 0.35)'
              }}
            >
              <span>Book Plant Walkthrough</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '3rem 1.5rem 2rem 1.5rem',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        
        {/* Live System Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(0, 240, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.35)', marginBottom: '1.25rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#00f0ff', textTransform: 'uppercase' }}>
            SEE THE SYSTEM WORKING // INTERACTIVE LIVE DEMONSTRATION HUB
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          color: '#ffffff',
          margin: '0 auto 1.25rem auto',
          maxWidth: '960px'
        }}>
          3D Twin Simulator &amp;{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 45%, #E85874 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Product Demo Videos
          </span>
        </h1>

        {/* Subtitle explaining why a live demonstration beats a blog */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: '#94a3b8',
          lineHeight: 1.6,
          maxWidth: '820px',
          margin: '0 auto 2rem auto',
          fontWeight: 400
        }}>
          A blog post cannot show how a conveyor imager decodes 1,200 scans a minute or how an RFID gate captures 500 tags simultaneously. 
          Experience our systems in action: <strong style={{ color: '#e2e8f0' }}>let Archie the robot guide you through real client projects in 3D</strong>, or <strong style={{ color: '#e2e8f0' }}>inspect authentic 360° rotating video turntables</strong> for all 20 industrial hardware devices.
        </p>

        {/* Key Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '980px',
          margin: '0 auto 2.5rem auto'
        }}>
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
              3D Smart Factory
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00f0ff', letterSpacing: '-0.02em' }}>
              11 Enterprise Projects
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Ola Electric, Apollo, Pegatron &amp; more
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
              Product Demo Rigs
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#E85874', letterSpacing: '-0.02em' }}>
              20 Video Turntables
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Authentic 60 FPS studio 360° captures
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
              ERP Connectivity
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981', letterSpacing: '-0.02em' }}>
              &lt; 12ms Telemetry
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Real-time SAP S/4HANA &amp; Oracle sync
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE 3D DIGITAL TWIN SIMULATOR WITH ARCHIE ROBOT TOUR */}
      <section 
        id="3d-simulator"
        style={{
          maxWidth: '1360px',
          margin: '0 auto 4rem auto',
          padding: '0 1rem',
          position: 'relative',
          scrollMarginTop: '90px'
        }}
      >
        {/* Simulator Console Wrapper */}
        <div style={{
          backgroundColor: '#020b14',
          border: '1.5px solid rgba(0, 240, 255, 0.4)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 240, 255, 0.12), inset 0 0 30px rgba(0, 240, 255, 0.04)',
          position: 'relative'
        }}>
          
          {/* Console Header Bar */}
          <div style={{
            backgroundColor: 'rgba(7, 19, 34, 0.98)',
            borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff4d6d', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffc93c', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Bot size={18} color="#00f0ff" />
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Archie AI // 3D Smart Factory Robot Project Tour
                </span>
              </div>
              <span style={{
                backgroundColor: isPlayingTour ? 'rgba(0, 240, 255, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                color: isPlayingTour ? '#00f0ff' : '#10b981',
                border: isPlayingTour ? '1px solid #00f0ff' : '1px solid rgba(16, 185, 129, 0.35)',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isPlayingTour ? '#00f0ff' : '#10b981', animation: isPlayingTour ? 'pulse 1s infinite' : 'none' }}></span>
                <span>{isPlayingTour ? 'TOUR IN PROGRESS' : '60 FPS ONLINE'}</span>
              </span>
            </div>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a
                href="/factory-map.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                <span>Open in New Tab</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={toggleFullscreenSimulator}
                style={{
                  backgroundColor: 'rgba(0, 240, 255, 0.12)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  color: '#00f0ff',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s'
                }}
              >
                <Maximize2 size={13} />
                <span>Fullscreen Flight</span>
              </button>
            </div>
          </div>

          {/* ROBOT TOUR MASTER CONTROL BAR */}
          <div style={{
            backgroundColor: 'rgba(2, 11, 20, 0.98)',
            borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.85rem'
          }}>
            {/* Tour Action Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={toggleRobotTour}
                style={{
                  background: isPlayingTour 
                    ? 'linear-gradient(135deg, #E85874 0%, #ff4d6d 100%)' 
                    : 'linear-gradient(135deg, #00f0ff 0%, #0071ba 100%)',
                  border: 'none',
                  color: isPlayingTour ? '#ffffff' : '#020b14',
                  borderRadius: '8px',
                  padding: '0.55rem 1.2rem',
                  fontSize: '0.88rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: isPlayingTour 
                    ? '0 0 20px rgba(232, 88, 116, 0.5)' 
                    : '0 0 20px rgba(0, 240, 255, 0.45)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isPlayingTour ? <Pause size={15} color="#fff" /> : <Play size={15} color="#020b14" />}
                <span style={{ color: isPlayingTour ? '#fff' : '#020b14' }}>
                  {isPlayingTour ? '❚❚ Pause Robot Tour' : '▶ Start Archie Robot Tour'}
                </span>
              </button>

              <button
                onClick={toggleVoice}
                style={{
                  backgroundColor: isVoiceEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isVoiceEnabled ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: isVoiceEnabled ? '#10b981' : '#94a3b8',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s'
                }}
                title={isVoiceEnabled ? 'Mute Archie Voice' : 'Unmute Archie Voice Narration'}
              >
                {isVoiceEnabled ? <Volume2 size={14} color="#10b981" /> : <VolumeX size={14} color="#94a3b8" />}
                <span>{isVoiceEnabled ? 'Archie Voice: ON' : 'Voice: OFF'}</span>
              </button>
            </div>

            {/* Project Station Stepper Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handlePrevProject}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                title="Previous Project Station"
              >
                <ChevronLeft size={14} />
                <span>Prev Project</span>
              </button>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '6px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#00f0ff'
              }}>
                Project {selectedStationIndex + 1} of {FACTORY_PROJECT_STATIONS.length}
              </div>

              <button
                onClick={handleNextProject}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                title="Next Project Station"
              >
                <span>Next Project</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Quick Station Navigation Selector Bar (All 11 Project Stations) */}
          <div style={{
            backgroundColor: 'rgba(4, 14, 26, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
              Tour Stations:
            </span>
            {FACTORY_PROJECT_STATIONS.map((station) => (
              <button
                key={station.num}
                onClick={() => sendStationToIframe(station.index)}
                style={{
                  backgroundColor: selectedStationIndex === station.index ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedStationIndex === station.index ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: selectedStationIndex === station.index ? '#00f0ff' : '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{ opacity: 0.6 }}>{station.num}</span>
                <span>{station.name}</span>
                
              </button>
            ))}
          </div>

          {/* IFRAME 3D SIMULATOR VIEWPORT */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: isFullscreenSimulator ? '85vh' : '650px',
              minHeight: '480px',
              backgroundColor: '#020b14',
              transition: 'height 0.3s ease'
            }}
          >
            <iframe
              ref={simulatorIframeRef}
              src="/factory-map.html?embedded=true"
              title="ATPL Smart Factory 3D Twin Simulator"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
              allow="fullscreen; accelerometer; gyroscope"
            />

            {/* IN-FRAME LIVE ARCHIE PROJECT EXPLANATION CARD (COLLAPSIBLE) */}
            {isExplanationCardMinimized ? (
              <button
                onClick={() => setIsExplanationCardMinimized(false)}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(6, 16, 29, 0.95)',
                  backdropFilter: 'blur(14px)',
                  border: '1.5px solid #00f0ff',
                  borderRadius: '999px',
                  padding: '0.45rem 0.95rem',
                  color: '#00f0ff',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.8), 0 0 15px rgba(0,240,255,0.3)',
                  zIndex: 10,
                  transition: 'all 0.2s'
                }}
                title="Expand Archie's Project Explanation Card"
              >
                <Bot size={15} color="#00f0ff" />
                <span>Station {currentProject.num}: {currentProject.name}</span>
                <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
                  {currentProject.telemetry}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>[Expand ◻]</span>
              </button>
            ) : (
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                maxWidth: '430px',
                backgroundColor: 'rgba(6, 16, 29, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '14px',
                padding: '1.1rem',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(0, 240, 255, 0.15)',
                zIndex: 10,
                pointerEvents: 'auto'
              }}>
                {/* Header: Archie Avatar + Project Badge + Minimize */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 240, 255, 0.15)',
                      border: '1px solid #00f0ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Bot size={15} color="#00f0ff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        ARCHIE AI // PROJECT EXPLANATION
                      </div>
                      <div style={{ fontSize: '0.66rem', color: '#64748b' }}>
                        Station {currentProject.num} · {currentProject.category}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {currentProject.telemetry}
                    </span>
                    <button
                      onClick={() => setIsExplanationCardMinimized(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '0 4px',
                        fontSize: '15px',
                        lineHeight: 1
                      }}
                      title="Minimize card to see the full factory floor"
                    >
                      —
                    </button>
                  </div>
                </div>

                {/* Station Name & Client Deployment */}
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>
                  {currentProject.name}
                </div>

                

                {/* Archie's Project Explanation Speech Box */}
                <div style={{
                  backgroundColor: 'rgba(2, 11, 20, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.75rem',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                  marginBottom: '0.65rem',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    🎯 The Challenge &amp; ATPL Solution:
                  </div>
                  <div>{currentProject.challenge}</div>
                  <div style={{ color: '#00f0ff', marginTop: '0.3rem', fontWeight: 600 }}>{currentProject.solution}</div>
                </div>

                {/* Business Impact Metric */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '6px',
                  marginBottom: '0.75rem'
                }}>
                  <Award size={14} color="#10b981" />
                  <span>Result: {currentProject.kpi}</span>
                </div>

                {/* Action Buttons: Listen & See Hardware Video */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.76rem'
                }}>
                  <button
                    onClick={() => speakCurrentProject(currentProject)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#00f0ff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: 0
                    }}
                    title="Listen to Archie's narration of this project"
                  >
                    <Volume2 size={13} />
                    <span>Listen to Archie</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('hardware-360-matrix')}
                    style={{
                      background: 'rgba(232, 88, 116, 0.1)',
                      border: '1px solid rgba(232, 88, 116, 0.3)',
                      color: '#E85874',
                      borderRadius: '6px',
                      padding: '0.25rem 0.6rem',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>See 360° Video Demo</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* In-Frame Interaction Instructions Tip */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'rgba(2, 11, 20, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.74rem',
              color: '#94a3b8',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              <Compass size={13} color="#00f0ff" />
              <span>Drag to Pan &amp; Rotate | Click Hotspots or Press Start Tour for Archie's Project Guide</span>
            </div>
          </div>

          {/* Console Footer Telemetry Strip */}
          <div style={{
            backgroundColor: 'rgba(4, 14, 26, 0.98)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.6rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: '0.76rem',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span>Tour: <strong style={{ color: '#00f0ff' }}>Archie AI Voice Guided</strong></span>
              <span>•</span>
              <span>Deployments: <strong style={{ color: '#cbd5e1' }}>11 Live Customer Case Studies</strong></span>
              <span>•</span>
              <span>Sync: <strong style={{ color: '#10b981' }}>SAP S/4HANA &amp; Oracle Live</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => openDemoModal('3d-twin-station')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00f0ff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: 0
                }}
              >
                <span>Request Custom Project Simulation for Your Plant</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 360° HARDWARE PRODUCT DEMO VIDEOS */}
      <section 
        id="hardware-360-matrix"
        style={{
          maxWidth: '1360px',
          margin: '0 auto 4rem auto',
          padding: '0 1rem',
          position: 'relative'
        }}
      >
        {/* Seamlessly integrates the 20-product turntable matrix with the 6-decoder active manager */}
        <HardwareVideoMatrixGrid />
      </section>

      {/* SECTION 3: HOW IT WORKS TOGETHER (TWIN + PHYSICAL HARDWARE) */}
      <section
        id="stations-deepdive"
        style={{
          maxWidth: '1280px',
          margin: '0 auto 4rem auto',
          padding: '0 1.5rem',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '0.75rem' }}>
            <Activity size={13} color="#10b981" />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#10b981', textTransform: 'uppercase' }}>
              CONNECTED PHYSICAL-TO-DIGITAL ARCHITECTURE
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: '0 0 0.75rem 0'
          }}>
            How the 3D Twin &amp; Hardware Work Together
          </h2>

          <p style={{
            fontSize: '1.02rem',
            color: '#94a3b8',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Every physical barcode scan, RFID read, and vision defect logged on your plant floor updates the 3D twin in milliseconds — closing the loop between the shopfloor and ERP.
          </p>
        </div>

        {/* 4 Architectural Step Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Step 1 */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              01
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Physical Data Capture
            </div>
            <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Industrial scanners and RFID dock portals capture serial numbers, weights, and dimensions at belt speeds up to 120 m/min with sub-millisecond hardware decode latency.
            </div>
          </div>

          {/* Step 2 */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(232, 88, 116, 0.1)',
              border: '1px solid rgba(232, 88, 116, 0.3)',
              color: '#E85874',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              02
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Edge Telemetry Broker
            </div>
            <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              ATPL Edge Controllers filter tag chatter, validate GS1 barcodes, and route clean event payloads through MQTT/OPC-UA directly to the digital twin state manager.
            </div>
          </div>

          {/* Step 3 */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              03
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              3D Simulator Visualizer
            </div>
            <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              The 3D factory map moves pallets, updates station OEE in real-time, displays heatmaps of congested aisles, and alerts operators to unread parcels before line jams occur.
            </div>
          </div>

          {/* Step 4 */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#a855f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              04
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Instant SAP / Oracle Posting
            </div>
            <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Two-way enterprise connectors execute Goods Receipts (MIGO), Production Confirmations (CO11N), and ASN dispatch notices with zero manual data entry.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PLANT WALKTHROUGH CTA */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(7, 19, 34, 0.98) 0%, rgba(2, 11, 20, 0.98) 100%)',
          border: '1.5px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Subtle glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(0, 113, 186, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '999px', backgroundColor: 'rgba(232, 88, 116, 0.1)', border: '1px solid rgba(232, 88, 116, 0.3)', marginBottom: '1rem' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#E85874', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EXPERIENCE THIS WITH YOUR OWN SKUs &amp; PLANT
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              Want to See This Running on Your Shopfloor?
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Our systems integration engineers can build a tailored 3D simulation of your actual production lines, or bring demo scanners and RFID portals directly to your factory for a live proof-of-concept.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                onClick={() => openDemoModal('3d-twin-cta')}
                style={{
                  background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: '0 8px 24px rgba(0, 113, 186, 0.4)'
                }}
              >
                <span>Schedule an On-Site Plant Walkthrough</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="https://wa.me/916380859963?text=Hi%20ATPL%20Team%2C%20I%20saw%20your%203D%20Digital%20Twin%20and%20product%20demo%20videos%20and%20would%20like%20to%20request%20a%20live%20POC%20for%20our%20plant."
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <span>💬 WhatsApp an Automation Engineer</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
});
