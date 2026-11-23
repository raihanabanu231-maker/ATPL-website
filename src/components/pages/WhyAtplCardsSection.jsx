import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Activity,
  Check,
  Server,
  Radio,
  FileCheck,
  Scan,
  Compass,
  Boxes
} from 'lucide-react';

// ============================================================================
// 1. CARDS DATA (EXACT COPY PRESERVED 100% VERBATIM + EXPANDED CASE STUDY DETAILS)
// ============================================================================
export const WHY_ATPL_CARDS = [
  {
    id: 'advanced-tech',
    icon: Cpu,
    title: 'Advanced Technology Made Easy',
    subtitle: 'Complexity hidden. Performance amplified.',
    description: 'Modern factories run at unforgiving speeds. ATPL packages deep learning TensorRT models, multi-angle stroboscopic lighting, and UHF RFID into plug-and-play modules that line operators can control with zero programming required.',
    visualType: 'chips',
    bentoSpan: 'col-span-1',
    expandedData: {
      tag: 'DEEP LEARNING EDGE ENGINE',
      metric: '0 Code Required',
      metricLabel: 'Operator calibration time: <5 mins',
      techStack: ['NVIDIA TensorRT 10.x', '460nm Polarized Strobes', 'Impinj RAIN RFID', 'Zero-Code HMI'],
      caseStudyTitle: 'Plug-and-Play AI Inspection on High-Speed Packaging Lines',
      caseStudyBody: 'Traditional vision systems require PhD-level optical calibration. ATPL’s turnkey modules arrive pre-trained on millions of industrial defect samples. Line technicians swap product recipes with single-touch barcode scan presets.',
      highlights: [
        'Pre-trained defect classification models running locally at 120 FPS',
        'Automatic stroboscopic frequency syncing with variable conveyor speeds',
        'Rugged IP67 optical housing with vibration-damped telecentric brackets'
      ]
    }
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance Without Compromise',
    subtitle: 'Sub-8ms decode. Zero line bottlenecks.',
    description: 'High-throughput automotive and EV plants cannot afford a 50ms pause per part. Our edge-computed pipelines inspect and serialize at 180 parts per minute, ensuring 100% genealogy without adding a single second of cycle time.',
    visualType: 'stats',
    bentoSpan: 'col-span-2', // Wide showcase card in Bento Grid!
    expandedData: {
      tag: 'ULTRA HIGH-SPEED SERIALIZATION',
      metric: 'Sub-8ms / 180 PPM',
      metricLabel: '100% genealogy with 0ms cycle penalty',
      techStack: ['Edge IPC DMA Buffers', 'GenICam 10GigE Vision', 'CUDA FP16 Inference', 'Real-time IO Triggering'],
      caseStudyTitle: 'Tier-1 Automotive EV Powertrain Serialization Case Study',
      caseStudyBody: 'At 180 parts per minute, any software hitch causes immediate line pileups. ATPL’s dual-core DMA engine decodes Grade-A 2D DataMatrix codes, runs dimensional checks, and fires pneumatic diverters in under 8 milliseconds.',
      highlights: [
        'Hardware-timed optical strobe pulsing synchronized to shaft encoders',
        'Direct RAM frame grabber DMA bypassing operating system scheduling delays',
        'Automated reject lane diverting verified by secondary retro-reflective beams'
      ]
    }
  },
  {
    id: 'ecosystem',
    icon: Layers,
    title: 'Turnkey Hardware + Software Ecosystem',
    subtitle: 'Single engineering authority. Zero finger-pointing.',
    description: 'Unlike traditional box-pushers who sell disjointed hardware and leave you to find software integrators, ATPL engineers the entire stack: optical mounts, PLCs, edge controllers, custom middleware, and cloud dashboards.',
    visualType: 'layers',
    bentoSpan: 'col-span-2', // Wide foundational card
    expandedData: {
      tag: '5-LAYER UNIFIED ARCHITECTURE',
      metric: '1 Single Vendor',
      metricLabel: 'Hardware + Firmware + Middleware + Cloud',
      techStack: ['CNC Precision Mounts', 'Siemens & Beckhoff PLC DMA', 'Dockerized Edge Services', 'Cloud Telemetry'],
      caseStudyTitle: 'Eliminating the "Hardware vs Software" Finger-Pointing Trap',
      caseStudyBody: 'When an automated line faults, vendors blame software integrators, who in turn blame camera suppliers. ATPL designs, manufactures, codes, and supports the complete solution under a single end-to-end SLA.',
      highlights: [
        'Custom CNC optical mounting rigs engineered for shopfloor thermal stability',
        'Direct hardware PLC fieldbus integration (PROFINET, EtherNet/IP, Modbus-TCP)',
        'Unified Archie AI monitoring agent catching sensor drift before failures occur'
      ]
    }
  },
  {
    id: 'interoperability',
    icon: ShieldCheck,
    title: 'Native ERP & Shopfloor Interoperability',
    subtitle: 'Certified SAP S/4HANA & Oracle connectors.',
    description: 'Say goodbye to fragile batch CSV cron jobs. ATPL systems communicate directly via bi-directional SAP IDocs, BAPIs, and Modbus-TCP DMA, eliminating inventory drift and synchronization lag between the floor and the executive suite.',
    visualType: 'erp-sync',
    bentoSpan: 'col-span-1',
    expandedData: {
      tag: 'ENTERPRISE ERP DATA HIGHWAY',
      metric: 'Bi-directional DMA',
      metricLabel: 'Zero batch CSV delay & 0% inventory drift',
      techStack: ['SAP S/4HANA IDocs', 'Oracle Fusion APIs', 'Modbus-TCP DMA', 'MQTT Sparkplug B'],
      caseStudyTitle: 'Real-Time ERP Inventory Synchronization Across 14 Factory Warehouses',
      caseStudyBody: 'Fragile cron batch scripts result in phantom inventory and delayed shipping orders. ATPL connects physical dock RFID scanners and laser stations directly to enterprise ERP ledger entries in milliseconds.',
      highlights: [
        'Certified SAP NetWeaver and S/4HANA RFC connectors with local caching',
        'Offline buffer failover ensuring zero data loss during plant internet hiccups',
        'Sub-second goods receipt and automated dispatch bill-of-lading confirmation'
      ]
    }
  },
  {
    id: 'on-site-sla',
    icon: Clock,
    title: 'Guaranteed 4-Hour On-Site SLA',
    subtitle: "Local field squads across India's manufacturing corridors.",
    description: 'With technical centers at TIDEL Park Chennai, TCE-TBI Madurai R&D Hub, Hosur Auto Corridor, and Bengaluru, our engineers guarantee sub-4-hour emergency on-site dispatch backed by local buffer hardware pools.',
    visualType: 'sla-ring',
    bentoSpan: 'col-span-1',
    expandedData: {
      tag: 'EMERGENCY INDUSTRIAL SUPPORT',
      metric: '<4 Hours',
      metricLabel: 'Emergency on-site response across key hubs',
      techStack: ['Chennai (TIDEL Park)', 'Madurai (TCE-TBI)', 'Hosur (Auto Corridor)', 'Bengaluru (Tech Core)'],
      caseStudyTitle: 'Round-the-Clock Rapid Response for 24/7 Manufacturing Plants',
      caseStudyBody: 'An hour of stopped assembly can cost crores. ATPL maintains strategic buffer warehouses with pre-calibrated lenses, lasers, and PLCs within driving radius of India’s busiest industrial zones.',
      highlights: [
        'Dedicated mobile field engineer squads on 24/7 on-call dispatch rosters',
        'Local pre-configured hot-swap hardware inventory in regional hubs',
        'Direct telemetry hook connecting your plant floor to Archie AI Tier-3 engineers'
      ]
    }
  },
  {
    id: 'regulatory',
    icon: Award,
    title: 'Tested, Audited & Regulatory Compliant',
    subtitle: 'AIS-156, FDA 21 CFR Part 11, GS1 India certified.',
    description: 'From tamper-proof pharmaceutical electronic audit trails to EV battery genealogy mandated by ARAI, ATPL solutions come pre-configured to pass rigorous global regulatory audits with zero non-conformances.',
    visualType: 'badges',
    bentoSpan: 'col-span-2', // Wide reassurance card
    expandedData: {
      tag: 'GLOBAL COMPLIANCE ARCHITECTURE',
      metric: 'Zero Non-Conformances',
      metricLabel: 'Pre-audited templates for ARAI, FDA & GS1',
      techStack: ['AIS-156 EV Battery', 'FDA 21 CFR Part 11', 'GS1 ISO/IEC 15415', 'ARAI Certified'],
      caseStudyTitle: 'EV Battery Pack Traceability & Pharmaceutical Audit Trails',
      caseStudyBody: 'Stringent government norms require tamper-proof digital records of cell serialization and test voltages. ATPL’s pre-audited frameworks ensure instant audit readiness with cryptographic timestamping.',
      highlights: [
        'Immutable cryptographic audit logs for electronic signatures and batch releases',
        'Full ISO/IEC 15415 verification report generation for all marked barcodes',
        'Automated AIS-156 test bench records delivered straight to compliance auditors'
      ]
    }
  },
];

// ============================================================================
// 2. LIVE TELEMETRY COUNTER STRIP (FEATURE #13 - ABOVE GRID)
// ============================================================================
const LiveTelemetryStrip = memo(() => {
  const [inspectedCount, setInspectedCount] = useState(2847190);

  useEffect(() => {
    const timer = setInterval(() => {
      setInspectedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '0 auto 2.5rem',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 100%)',
      border: '1px solid rgba(2, 132, 199, 0.25)',
      borderRadius: '16px',
      padding: '0.9rem 1.4rem',
      boxShadow: '0 4px 20px rgba(3, 105, 161, 0.06)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.25rem'
    }}>
      {/* System Status Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ position: 'relative', display: 'flex', width: '10px', height: '10px' }}>
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '999px',
            background: '#10b981',
            opacity: 0.75,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
          <span style={{ position: 'relative', width: '10px', height: '10px', borderRadius: '999px', background: '#059669' }} />
        </span>
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#0369a1'
        }}>
          Live Factory Mesh Active
        </span>
        <span style={{
          fontSize: '10px',
          fontFamily: 'monospace',
          background: 'rgba(3, 105, 161, 0.08)',
          color: '#0284c7',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 700
        }}>
          6 Connected Hubs
        </span>
      </div>

      {/* 4 Telemetry Counters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'clamp(1rem, 2vw, 2.5rem)'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '1.15rem',
            fontWeight: 900,
            color: '#0f172a',
            fontVariantNumeric: 'tabular-nums'
          }}>
            {inspectedCount.toLocaleString()}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
            Parts Inspected Today
          </span>
        </div>

        <div style={{ width: '1px', height: '18px', background: 'rgba(203, 213, 225, 0.8)' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '1.15rem',
            fontWeight: 900,
            color: '#0284c7',
            fontVariantNumeric: 'tabular-nums'
          }}>
            99.985%
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
            First-Pass Yield
          </span>
        </div>

        <div style={{ width: '1px', height: '18px', background: 'rgba(203, 213, 225, 0.8)' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '1.15rem',
            fontWeight: 900,
            color: '#0f766e',
            fontVariantNumeric: 'tabular-nums'
          }}>
            &lt;4 Hours
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
            Emergency SLA
          </span>
        </div>
      </div>
    </div>
  );
});

// ============================================================================
// 3. ASSEMBLY-LINE CONVEYOR STRIP (FEATURE #10 - BELOW GRID)
// ============================================================================
const AssemblyLineConveyor = memo(() => {
  const prefersReduced = useReducedMotion();
  const [activeItem, setActiveItem] = useState(2);

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setActiveItem(prev => (prev + 1) % 6);
    }, 2400);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const stations = [
    { code: 'SKU-701', name: 'EV 21700 Cell', status: 'PASS 100%' },
    { code: 'SKU-702', name: 'Steering Knuckle', status: 'PASS 100%' },
    { code: 'SKU-703', name: 'Laser Marked PCB', status: 'PASS 100%' },
    { code: 'SKU-704', name: 'Pharma Vial Tray', status: 'PASS 100%' },
    { code: 'SKU-705', name: 'RAIN RFID Pallet', status: 'PASS 100%' },
    { code: 'SKU-706', name: 'Transmission Gear', status: 'PASS 100%' },
  ];

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '3.5rem auto 0',
      background: 'linear-gradient(180deg, #0f172a 0%, #090e1a 100%)',
      borderRadius: '18px',
      border: '1.5px solid rgba(34, 211, 238, 0.35)',
      boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.28), 0 0 24px rgba(34, 211, 238, 0.1)',
      padding: '1.4rem 1.6rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Boxes size={18} style={{ color: '#22d3ee' }} />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
            ATPL High-Speed Vision Conveyor Pipeline
          </span>
          <span style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '4px',
            padding: '2px 6px',
            fontWeight: 800
          }}>
            180 PPM SYNCHRONIZED
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#22d3ee' }} />
            460nm Telecentric Strobe
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#10b981' }} />
            Pneumatic Diverter Armed
          </span>
        </div>
      </div>

      {/* Moving Assembly Conveyor Belt */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '12px',
        background: '#040914',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Conveyor track guide line */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), transparent)',
          zIndex: 1
        }} />

        {stations.map((st, idx) => {
          const isScanning = activeItem === idx;
          return (
            <div
              key={st.code}
              style={{
                position: 'relative',
                zIndex: 2,
                background: isScanning 
                  ? 'linear-gradient(145deg, rgba(3, 105, 161, 0.28) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'rgba(15, 23, 42, 0.75)',
                border: isScanning 
                  ? '1.5px solid #22d3ee' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.65rem 0.5rem',
                textAlign: 'center',
                boxShadow: isScanning ? '0 0 18px rgba(34, 211, 238, 0.35)' : 'none',
                transition: 'all 0.35s ease'
              }}
            >
              {/* Laser scanning beam overlay when part is under checkpoint */}
              {isScanning && !prefersReduced && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#22d3ee',
                  boxShadow: '0 0 10px #22d3ee, 0 0 20px #0284c7',
                  animation: 'scannerLine 1.2s ease-in-out infinite'
                }} />
              )}

              <div style={{
                fontSize: '9px',
                fontFamily: 'monospace',
                fontWeight: 800,
                color: isScanning ? '#22d3ee' : '#64748b',
                marginBottom: '2px'
              }}>
                {st.code}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f8fafc',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '6px'
              }}>
                {st.name}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '9.5px',
                fontWeight: 800,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '1px 6px',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <Check size={10} strokeWidth={3} />
                <span>{st.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ============================================================================
// 4. MINI-VISUAL COMPONENTS (ONE COMPONENT PER CARD)
// ============================================================================

const VisualChips = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();
  const chips = [
    { label: 'TensorRT', initial: { x: -20, y: 14, rotate: -10 } },
    { label: 'Strobe light', initial: { x: 18, y: -12, rotate: 8 } },
    { label: 'UHF RFID', initial: { x: -14, y: -14, rotate: -6 } },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', minHeight: '44px' }}>
      {chips.map((chip, idx) => (
        <motion.span
          key={chip.label}
          initial={prefersReduced ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, ...chip.initial }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : chip.initial}
          transition={{ type: 'spring', stiffness: 340, damping: 22, delay: prefersReduced ? 0 : 0.15 + idx * 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#0369a1',
            background: 'rgba(3, 105, 161, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            boxShadow: '0 1px 3px rgba(3, 105, 161, 0.06)'
          }}
        >
          {chip.label}
        </motion.span>
      ))}
      <motion.span
        initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ type: 'spring', stiffness: 420, damping: 20, delay: prefersReduced ? 0 : 0.5 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '11.5px',
          fontWeight: 800,
          color: '#ffffff',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #0f766e 100%)',
          boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)'
        }}
      >
        <span style={{ opacity: 0.85 }}>=</span>
        <span>Plug &amp; play</span>
      </motion.span>
    </div>
  );
});

const AnimatedStatCounter = ({ target, prefix = '', suffix = '', duration = 1200, isInView }) => {
  const [val, setVal] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setVal(target);
      return;
    }

    let start = null;
    let animId;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span style={{
      fontVariantNumeric: 'tabular-nums',
      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
      fontWeight: 900,
      color: '#0f172a',
      fontSize: '1.24rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    }}>
      {prefix}{val}{suffix}
    </span>
  );
};

const VisualStats = memo(({ isInView }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', minHeight: '44px', width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AnimatedStatCounter target={8} prefix="<" suffix=" ms" isInView={isInView} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>decode</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(226, 232, 240, 0.9)', borderRight: '1px solid rgba(226, 232, 240, 0.9)', paddingLeft: '10px', paddingRight: '10px' }}>
      <AnimatedStatCounter target={180} suffix="" isInView={isInView} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>parts / min</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AnimatedStatCounter target={100} suffix="%" isInView={isInView} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>genealogy</span>
    </div>
  </div>
));

const VisualLayers = memo(({ isInView, isHovered }) => {
  const prefersReduced = useReducedMotion();
  const layers = [
    { name: 'Cloud dashboards', level: 'L5 Cloud', grad: 'linear-gradient(90deg, #0284c7 0%, #0ea5e9 100%)' },
    { name: 'Custom middleware', level: 'L4 API', grad: 'linear-gradient(90deg, #0369a1 0%, #0284c7 100%)' },
    { name: 'Edge controllers', level: 'L3 Edge', grad: 'linear-gradient(90deg, #075985 0%, #0369a1 100%)' },
    { name: 'PLCs', level: 'L2 Control', grad: 'linear-gradient(90deg, #0c4a6e 0%, #075985 100%)' },
    { name: 'Optical mounts', level: 'L1 Hardware', grad: 'linear-gradient(90deg, #082f49 0%, #0c4a6e 100%)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', minHeight: '44px' }}>
      {layers.map((layer, idx) => {
        const reverseIdx = layers.length - 1 - idx;
        const nudgeX = isHovered && !prefersReduced ? (idx % 2 === 0 ? -5 : 5) : 0;
        return (
          <motion.div
            key={layer.name}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0, x: nudgeX } : { opacity: 0, y: 10, x: 0 }}
            transition={{
              y: { type: 'spring', stiffness: 360, damping: 24, delay: reverseIdx * 0.05 },
              x: { type: 'spring', stiffness: 420, damping: 22 },
              opacity: { duration: 0.25, delay: reverseIdx * 0.05 }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '3px 8px',
              borderRadius: '5px',
              fontSize: '10.5px',
              fontWeight: 700,
              color: '#ffffff',
              background: layer.grad,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <span>{layer.name}</span>
            <span style={{ fontSize: '9px', fontFamily: 'monospace', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {layer.level}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
});

const VisualErpSync = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();
  return (
    <div style={{ width: '100%', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 320 60" style={{ width: '100%', maxWidth: '300px', height: 'auto', overflow: 'visible', userSelect: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <path id="pathL2R" d="M 88 20 L 232 20" />
          <path id="pathR2L" d="M 232 40 L 88 40" />
        </defs>
        <g transform="translate(4, 10)">
          <rect width="82" height="40" rx="8" fill="url(#nodeGrad)" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="41" y="24" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800" fontFamily="sans-serif">Shopfloor</text>
        </g>
        <g transform="translate(234, 10)">
          <rect width="82" height="40" rx="8" fill="url(#nodeGrad)" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="41" y="24" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800" fontFamily="sans-serif">SAP / Oracle</text>
        </g>
        <line x1="88" y1="20" x2="232" y2="20" stroke="#0284c7" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.45" />
        <line x1="88" y1="40" x2="232" y2="40" stroke="#22d3ee" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
        {!prefersReduced && isInView && (
          <circle r="4" fill="#0284c7">
            <animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#pathL2R" /></animateMotion>
          </circle>
        )}
        {!prefersReduced && isInView && (
          <circle r="4" fill="#22d3ee">
            <animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#pathR2L" /></animateMotion>
          </circle>
        )}
      </svg>
    </div>
  );
});

const VisualSlaRing = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const cities = [
    { name: 'Chennai' },
    { name: 'Madurai' },
    { name: 'Hosur' },
    { name: 'Bengaluru' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', width: '100%', minHeight: '44px' }}>
      <div style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px' }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', overflow: 'visible' }} viewBox="0 0 54 54">
          <circle cx="27" cy="27" r={radius} stroke="#e2e8f0" strokeWidth="3.5" fill="transparent" />
          <motion.circle
            cx="27" cy="27" r={radius} stroke="url(#slaGrad)" strokeWidth="3.5" strokeLinecap="round" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * 0.15 } : { strokeDashoffset: circumference }}
            transition={{ duration: prefersReduced ? 0.01 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="slaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>&lt;4h</span>
          <span style={{ fontSize: '8px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', marginTop: '2px' }}>SLA</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '10px', rowGap: '6px', flex: 1 }}>
        {cities.map((city, idx) => (
          <div key={city.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '7px', height: '7px' }}>
              {!prefersReduced && (
                <motion.span
                  animate={{ scale: [1, 1.7, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.25 }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: '#22d3ee' }}
                />
              )}
              <span style={{ position: 'relative', borderRadius: '999px', width: '7px', height: '7px', background: '#0284c7' }} />
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const VisualBadges = memo(({ isInView }) => {
  const prefersReduced = useReducedMotion();
  const badges = [{ code: 'AIS-156' }, { code: 'FDA 21 CFR Part 11' }, { code: 'GS1 India' }];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', minHeight: '44px', width: '100%' }}>
      {badges.map((badge, idx) => (
        <motion.div
          key={badge.code}
          initial={prefersReduced ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.8, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22, delay: prefersReduced ? 0 : 0.12 + idx * 0.16 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#065f46',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 1px 3px rgba(16, 185, 129, 0.08)'
          }}
        >
          <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} />
          <span>{badge.code}</span>
        </motion.div>
      ))}
    </div>
  );
});

// ============================================================================
// 5. BENTO TILT CARD (WITH BORDER BEAM #3 & SCANNER SWEEP #11)
// ============================================================================
const BentoCard = memo(({ card, index, isInView, onSelect }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const prefersReduced = useReducedMotion();

  // Mouse spring coordinates for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReduced ? [0, 0] : [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReduced ? [0, 0] : [-7, 7]);

  // Scanner Laser Sweep Trigger
  useEffect(() => {
    if (isInView && !hasScanned) {
      const timer = setTimeout(() => setHasScanned(true), 1300);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasScanned]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReduced) return;
    // Only calculate 3D perspective tilt on devices with precise pointer (mouse), avoiding mobile touch CPU cost
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${mouseClientX}px`);
    cardRef.current.style.setProperty('--my', `${mouseClientY}px`);
    x.set(mouseClientX / rect.width - 0.5);
    y.set(mouseClientY / rect.height - 0.5);
  }, [x, y, prefersReduced]);

  const IconComp = card.icon;

  const renderVisual = () => {
    switch (card.visualType) {
      case 'chips': return <VisualChips isInView={isInView} />;
      case 'stats': return <VisualStats isInView={isInView} />;
      case 'layers': return <VisualLayers isInView={isInView} isHovered={isHovered} />;
      case 'erp-sync': return <VisualErpSync isInView={isInView} />;
      case 'sla-ring': return <VisualSlaRing isInView={isInView} />;
      case 'badges': return <VisualBadges isInView={isInView} />;
      default: return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-container-${card.id}`}
      onClick={() => onSelect(card)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      whileInView={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`why-atpl-bento-card ${card.bentoSpan}`}
      style={{
        perspective: 900,
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
      tabIndex={0}
      role="article"
      aria-label={card.title}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '20px',
          padding: '1.85rem',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(226, 232, 240, 0.95)',
          boxShadow: isHovered 
            ? '0 24px 50px -12px rgba(3, 105, 161, 0.2), 0 0 28px rgba(34, 211, 238, 0.15)' 
            : '0 4px 18px rgba(15, 23, 42, 0.04)',
          transition: 'box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* ================================================================
            BORDER BEAM (#3): Concentrated traveling laser along perimeter
           ================================================================ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '20px',
            padding: '1.5px',
            opacity: isHovered ? 1 : 0.45,
            transition: 'opacity 0.3s ease',
            background: 'conic-gradient(from var(--border-angle, 0deg), transparent 70%, #22d3ee 85%, #0369a1 95%, transparent 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            animation: prefersReduced ? 'none' : 'cardBorderRotate 4.5s linear infinite',
            zIndex: 3
          }}
        />

        {/* ================================================================
            SCANNER SWEEP (#11): Laser inspection line that sweeps down once
           ================================================================ */}
        {!prefersReduced && isInView && !hasScanned && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #22d3ee 25%, #ffffff 50%, #22d3ee 75%, transparent)',
              boxShadow: '0 0 16px #22d3ee, 0 0 30px #0284c7',
              zIndex: 10,
              pointerEvents: 'none',
              animation: 'laserSweepDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          />
        )}

        {/* Cursor Spotlight Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '20px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: 'radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), rgba(34, 211, 238, 0.18), transparent 80%)',
            zIndex: 2
          }}
        />

        {/* Card Header & Content */}
        <div style={{ position: 'relative', zIndex: 4 }}>
          {/* Top Bar with Icon & Expand Pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <motion.div
              animate={isHovered && !prefersReduced ? { scale: 1.12, rotate: [0, -7, 7, -4, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(3, 105, 161, 0.08)',
                border: '1px solid rgba(34, 211, 238, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0369a1',
                boxShadow: isHovered ? '0 0 16px rgba(34, 211, 238, 0.3)' : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              <IconComp size={24} strokeWidth={2.2} />
            </motion.div>

            {/* Click-to-Expand Indicator Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '999px',
              fontSize: '10.5px',
              fontWeight: 800,
              color: isHovered ? '#0284c7' : '#94a3b8',
              background: isHovered ? 'rgba(34, 211, 238, 0.12)' : 'rgba(241, 245, 249, 0.8)',
              border: '1px solid',
              borderColor: isHovered ? 'rgba(34, 211, 238, 0.4)' : 'rgba(226, 232, 240, 0.8)',
              transition: 'all 0.25s ease'
            }}>
              <span>Detail PoC</span>
              <Maximize2 size={11} />
            </div>
          </div>

          {/* Exact Card Title */}
          <h3 style={{
            fontSize: '1.28rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.45rem',
            lineHeight: 1.35,
            letterSpacing: '-0.015em',
            fontFamily: 'var(--font-display, "Outfit", sans-serif)'
          }}>
            {card.title}
          </h3>

          {/* Exact Card Subtitle */}
          <div style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#0369a1',
            lineHeight: 1.4,
            marginBottom: '0.85rem'
          }}>
            {card.subtitle}
          </div>

          {/* Exact Card Description */}
          <p style={{
            fontSize: '0.94rem',
            color: '#64748b',
            lineHeight: 1.62,
            margin: 0
          }}>
            {card.description}
          </p>
        </div>

        {/* Separator & Per-Card Mini Visual */}
        <div style={{ position: 'relative', zIndex: 4, marginTop: '1.25rem' }}>
          <div style={{
            width: '100%',
            height: '0',
            borderTop: '1.5px dashed rgba(203, 213, 225, 0.85)',
            marginBottom: '1rem'
          }} />
          {renderVisual()}
        </div>
      </motion.div>
    </motion.div>
  );
});

// ============================================================================
// 6. EXPAND-ON-CLICK DETAIL MODAL (FEATURE #2 - FRAMER MOTION LAYOUTID)
// ============================================================================
const ExpandedDetailModal = memo(({ card, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!card) return null;
  const IconComp = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="why-atpl-bento-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${card.id}`}
        className="why-atpl-bento-modal"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid rgba(34, 211, 238, 0.5)',
          boxShadow: '0 25px 60px -15px rgba(3, 105, 161, 0.35), 0 0 40px rgba(34, 211, 238, 0.25)',
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="bento-modal-close-btn"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '999px',
            background: 'rgba(241, 245, 249, 0.9)',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(241, 245, 249, 0.9)'; e.currentTarget.style.color = '#0f172a'; }}
          aria-label="Close detail modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(3, 105, 161, 0.12) 0%, rgba(34, 211, 238, 0.16) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0369a1',
            flexShrink: 0
          }}>
            <IconComp size={28} />
          </div>

          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#0284c7',
              background: 'rgba(3, 105, 161, 0.08)',
              marginBottom: '0.45rem'
            }}>
              <Activity size={12} />
              <span>{card.expandedData.tag}</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
              fontWeight: 900,
              color: '#0f172a',
              margin: '0 0 0.35rem',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display, "Outfit", sans-serif)'
            }}>
              {card.title}
            </h3>

            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0369a1' }}>
              {card.subtitle}
            </div>
          </div>
        </div>

        {/* Core Original Copy */}
        <div style={{
          background: '#f8fafc',
          borderLeft: '4px solid #0284c7',
          padding: '1rem 1.25rem',
          borderRadius: '0 12px 12px 0',
          marginBottom: '1.75rem',
          fontSize: '0.96rem',
          color: '#334155',
          lineHeight: 1.65
        }}>
          {card.description}
        </div>

        {/* Key Benchmark Stat Pill */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(34, 211, 238, 0.12) 100%)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '14px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Primary Benchmark
            </div>
            <div style={{
              fontSize: '1.65rem',
              fontWeight: 900,
              color: '#0f172a',
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)'
            }}>
              {card.expandedData.metric}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0369a1', marginTop: '2px' }}>
              {card.expandedData.metricLabel}
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '14px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Verified Production Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {card.expandedData.techStack.map(tech => (
                <span key={tech} style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0f172a',
                  background: 'rgba(241, 245, 249, 0.95)',
                  border: '1px solid rgba(203, 213, 225, 0.7)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Details */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>
            {card.expandedData.caseStudyTitle}
          </h4>
          <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 1rem' }}>
            {card.expandedData.caseStudyBody}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {card.expandedData.highlights.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
          borderTop: '1px solid rgba(226, 232, 240, 0.9)',
          paddingTop: '1.25rem'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Details
          </button>
          <button
            onClick={() => {
              onClose();
              window.location.href = '/contact';
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.65rem 1.4rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
            }}
          >
            <span>Request Engineering PoC</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ============================================================================
// 7. AMBIENT PARTICLES & GRID BACKGROUND (GPU COMPOSITED, 0% CPU JS LOAD)
// ============================================================================
const SubtleParticles = memo(() => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 42%),
          radial-gradient(circle at 85% 65%, rgba(3, 105, 161, 0.07) 0%, transparent 48%),
          radial-gradient(rgba(34, 211, 238, 0.16) 1.2px, transparent 1.2px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 28px 28px',
        opacity: 0.85
      }}
      aria-hidden="true"
    />
  );
});

// ============================================================================
// 8. MAIN WHY ATPL CARDS SECTION EXPORT
// ============================================================================
export const WhyAtplCardsSection = memo(() => {
  const sectionRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '5.5rem 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* CSS @property and Keyframes for Border Beam and Scanner Sweep */}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes cardBorderRotate {
          from {
            --border-angle: 0deg;
          }
          to {
            --border-angle: 360deg;
          }
        }
        @keyframes laserSweepDown {
          0% {
            top: 0%;
            opacity: 1;
          }
          85% {
            top: 98%;
            opacity: 0.9;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes scannerLine {
          0% {
            top: 0%;
            opacity: 0.9;
          }
          50% {
            top: 100%;
            opacity: 1;
          }
          100% {
            top: 0%;
            opacity: 0.9;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.4);
          }
        }

        /* Bento Grid Layout (Desktop 3-columns with wide cards) */
        .why-atpl-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.85rem;
        }
        .col-span-1 {
          grid-column: span 1;
        }
        .col-span-2 {
          grid-column: span 2;
        }

        /* Tablet Responsive (2 columns) */
        @media (max-width: 1024px) {
          .why-atpl-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .col-span-2 {
            grid-column: span 2;
          }
        }

        /* Mobile Responsive (1 column) */
        @media (max-width: 640px) {
          .why-atpl-bento-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .col-span-2 {
            grid-column: span 1;
          }
          .why-atpl-bento-modal-backdrop {
            padding: 0.75rem !important;
          }
          .why-atpl-bento-modal {
            padding: 1.25rem 1rem !important;
            border-radius: 18px !important;
            max-height: 92vh !important;
          }
          .bento-modal-close-btn {
            width: 44px !important;
            height: 44px !important;
            top: 0.75rem !important;
            right: 0.75rem !important;
          }
        }

        .why-atpl-bento-card:focus-visible {
          outline: 2px solid #22d3ee !important;
          outline-offset: 4px;
        }
      `}</style>

      {/* Subtle particle canvas background */}
      <SubtleParticles />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Section Headline & Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0369a1',
            background: 'rgba(3, 105, 161, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            marginBottom: '1rem'
          }}>
            <Sparkles size={13} style={{ color: '#0284c7' }} />
            <span>Industrial Automation Authority</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            fontFamily: 'var(--font-display, "Outfit", sans-serif)'
          }}>
            Engineering Excellence Built for Indian Industry
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
            Why leading OEMs and Tier-1 suppliers choose Archery Technocrats as their primary factory automation partner.
          </p>
        </div>

        {/* Feature #13: Live Telemetry Counter Strip (Above Grid) */}
        <LiveTelemetryStrip />

        {/* Feature #2 & #3 & #11: Asymmetric Bento Grid of 6 Cards with Border Beam & Scanner Sweep */}
        <div className="why-atpl-bento-grid">
          {WHY_ATPL_CARDS.map((card, index) => (
            <BentoCard
              key={card.id}
              card={card}
              index={index}
              isInView={true}
              onSelect={setSelectedCard}
            />
          ))}
        </div>

        {/* Feature #10: Assembly-Line Conveyor Strip (Below Grid) */}
        <AssemblyLineConveyor />

      </div>

      {/* Feature #2: Expand-on-Click Full Modal with Framer Motion layoutId */}
      <AnimatePresence>
        {selectedCard && (
          <ExpandedDetailModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

export default WhyAtplCardsSection;
