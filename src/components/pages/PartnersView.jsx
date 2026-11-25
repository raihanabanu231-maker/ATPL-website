import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import {
  Handshake,
  Search,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Building2,
  ChevronRight,
  X
} from 'lucide-react';

// ============================================================================
// VERIFIED TECHNOLOGY PARTNERS DATASET (Real atplgroup.com Alliances)
// ============================================================================
export const PARTNERS_DATA = [
  {
    id: "honeywell",
    n: "Honeywell",
    full: "Honeywell Scanning & Mobility",
    col: "#ED1C24",
    ac: "#ef4444",
    img: "/logos/honeywell.png",
    s: "Gold Partner (2021 Go-Getter Award)",
    r: "Distributor & Solution Partner",
    d: "Industrial 2D DPM Barcode Imagers, Fixed Scanners, Rugged Vehicle Mounts, and Voice Picking Headsets.",
    p: ["Xenon XP 1950g/1952g Scanners", "Granit XP Rugged Imagers", "CT60 & CK65 Mobile Computers", "SRX3 Voice Headsets", "PM45C Industrial Printers"],
    c: ["Scanning", "Mobility", "Printing", "Voice"]
  },
  {
    id: "zebra",
    n: "Zebra",
    full: "Zebra Technologies Corporation",
    col: "#000000",
    ac: "#94a3b8",
    img: "/logos/zebra.svg",
    s: "Premier Solution Partner",
    r: "Hardware Partner",
    d: "Enterprise UHF RFID dock antennas, rugged mobile computers, and industrial barcode supplies.",
    p: ["AN4x High-Density RFID Antennas (AN440/AN480)", "Enterprise Barcode Scanners", "Industrial RFID Inlays"],
    c: ["RFID", "Scanning", "Printing"]
  },
  {
    id: "tsc-printronix",
    n: "TSC Printronix",
    full: "TSC Printronix Auto ID",
    col: "#005BAC",
    ac: "#3b82f6",
    img: "/logos/tscprintronix.png",
    s: "Authorized Systems Integrator",
    r: "Hardware Partner",
    d: "Mission-critical enterprise industrial barcode and RFID label printers with inline barcode verification.",
    p: ["T6000e High Performance Industrial RFID Printer", "Print & Apply Engines", "ODV-2D Barcode Verifier Printers", "TX200 Desktop Barcode Printers"],
    c: ["Printing", "RFID"]
  },
  {
    id: "datalogic",
    n: "Datalogic",
    full: "Datalogic S.p.A.",
    col: "#003882",
    ac: "#1d4ed8",
    img: "/logos/datalogic.svg",
    s: "Certified Solution Partner",
    r: "Technology Partner",
    d: "Industrial fixed-mount barcode scanners, liquid lens 2D imagers, and machine vision sensors.",
    p: ["Industrial Fixed Conveyor Scanners", "Matrix 2D High-Speed Imagers", "Handheld Industrial Scanners"],
    c: ["Scanning", "Vision"]
  },
  {
    id: "newland",
    n: "Newland",
    full: "Newland AIDC",
    col: "#D9251D",
    ac: "#ef4444",
    img: "/logos/newland.svg",
    s: "Certified OEM Integrator",
    r: "Technology Partner",
    d: "High-performance OEM 2D scan engines, handheld barcode scanners, and rugged touch terminals.",
    p: ["2D OEM Scan Engines", "Industrial Stationary Scanners", "Rugged Android Touch Handhelds"],
    c: ["Scanning", "Mobility"]
  },
  {
    id: "cipherlab",
    n: "CipherLab",
    full: "CipherLab Co., Ltd.",
    col: "#0072CE",
    ac: "#0284c7",
    img: "/logos/cipherlab.png",
    s: "Authorized Systems Partner",
    r: "Technology Partner",
    d: "Rugged Android mobile computers and wireless barcode scanners for warehousing and supply chains.",
    p: ["Enterprise Android Mobile Computers", "Bluetooth Pocket Scanners", "Wearable Ring Scanners"],
    c: ["Mobility", "Scanning"]
  },
  {
    id: "advantech",
    n: "Advantech",
    full: "Advantech Co., Ltd.",
    col: "#003E7E",
    ac: "#0284c7",
    img: "/logos/advantech.png",
    s: "Premier Industrial IoT Partner",
    r: "Technology Partner",
    d: "Industrial IoT edge computing hardware, rugged touch panel PCs, and industrial Ethernet switches.",
    p: ["Industrial Touch Panel PCs", "Industrial Ethernet Switches", "Modbus Gateways", "Edge IoT Computing Systems"],
    c: ["Industrial PC", "Automation"]
  },
  {
    id: "axis",
    n: "Axis",
    full: "Axis Communications AB",
    col: "#FDB913",
    ac: "#fbbf24",
    img: "/logos/axis.svg",
    s: "Certified Vision Alliance",
    r: "Technology Partner",
    d: "Thermal CCTV vision, AI-assisted factory perimeter security, and intelligent optical analytics.",
    p: ["Thermal CCTV Vision", "AI Factory Perimeter Security", "Optical Analytics Sensors", "Network Video Recorders"],
    c: ["Vision", "Security"]
  },
  {
    id: "bradma",
    n: "Bradma",
    full: "Bradma Automating The Future",
    col: "#D32F2F",
    ac: "#f87171",
    img: "/logos/bradma.png",
    s: "Authorized DPM Partner",
    r: "Technology Partner",
    d: "Automated product marking machines, packaging traceability, and industrial impact presses.",
    p: ["Automated Product Marking", "Packaging Traceability", "Impact Marking Presses", "Shopfloor Serialization"],
    c: ["Marking", "Automation"]
  },
  {
    id: "forbes-macsa",
    n: "Forbes Macsa",
    full: "Forbes Macsa id Private Limited",
    col: "#C8102E",
    ac: "#f43f5e",
    img: "/logos/forbesmacsa.png",
    s: "Laser Serialization Alliance",
    r: "Technology Partner",
    d: "Industrial coding and high-speed laser serialization for packaging lines.",
    p: ["Icon 10 & Icon 30 Packaging Lasers", "High-Speed Laser Coding", "Continuous Inkjet (CIJ)", "Thermal Inkjet (TIJ)"],
    c: ["Marking", "Traceability"]
  },
  {
    id: "nilfisk",
    n: "Nilfisk",
    full: "Nilfisk Industrial",
    col: "#002855",
    ac: "#60a5fa",
    img: "/logos/nilfisk.png",
    s: "Cleanroom Automation Alliance",
    r: "Technology Partner",
    d: "Autonomous plant maintenance, industrial vacuum systems, and automated cleaning equipment.",
    p: ["Continuous Vacuum Systems", "Autonomous Floor Scrubbers", "Cleanroom Equipment", "Plant Maintenance Automation"],
    c: ["Automation", "Maintenance"]
  },
  {
    id: "soti",
    n: "SOTI",
    full: "SOTI Inc.",
    col: "#0054A6",
    ac: "#38bdf8",
    img: "/logos/soti.png",
    s: "Certified Enterprise MDM Partner",
    r: "Technology Partner",
    d: "Enterprise Mobile Device Management (MDM) and remote over-the-air diagnostic control.",
    p: ["SOTI MobiControl", "Centralized Device Management", "Remote Diagnostic OTA Support", "Frontline Asset Visibility"],
    c: ["Mobility", "Software"]
  },
  {
    id: "telesis",
    n: "Telesis",
    full: "Telesis Technologies, Inc.",
    col: "#0A2A5E",
    ac: "#06b6d4",
    img: "/logos/telesis.png",
    s: "Industrial Laser Alliance",
    r: "Technology Partner",
    d: "Direct Part Marking (DPM) industrial lasers and permanent dot peen pin markers.",
    p: ["Fiber Laser Marking Systems", "CO2 Laser Engravers", "UV Laser Markers", "Dot Peen Pin Markers", "Industrial Traceability"],
    c: ["Marking", "Traceability"]
  },
  {
    id: "csl",
    n: "CSL",
    full: "Convergence Systems Limited",
    col: "#0284C7",
    ac: "#22d3ee",
    img: "/logos/csl.svg",
    s: "RFID Hardware Alliance",
    r: "Technological Partner",
    d: "High-performance passive RFID readers, antennas, and handheld RFID inventory devices.",
    p: ["Fixed UHF RFID Readers", "Directional RFID Antennas", "Handheld RFID Terminals", "Asset Tracking Portals"],
    c: ["RFID"]
  },
  {
    id: "fargo",
    n: "Fargo",
    full: "HID Global (Fargo)",
    col: "#003B71",
    ac: "#0ea5e9",
    img: "/logos/fargo.svg",
    s: "Secure Credential Alliance",
    r: "Hardware Partner",
    d: "High-definition retransfer ID card printers and secure employee credential issuance systems.",
    p: ["HDP6600xe High-Definition ID Card Printers", "Dual-Sided Card Printing Modules", "Secure Holographic Laminators"],
    c: ["Printing", "Security"]
  },
  {
    id: "raiser",
    n: "Raiser",
    full: "Raiser Industrial",
    col: "#0284C7",
    ac: "#38bdf8",
    img: "/logos/raiser.png",
    s: "Material Logistics Partner",
    r: "Technology Partner",
    d: "Automated conveyor transfers, plant logistics, pallet handling, and shopfloor storage systems.",
    p: ["Automated Conveyor Transfers", "Pallet Handling Equipment", "Shopfloor Storage Racks", "Line Logistics Transfers"],
    c: ["Automation", "Logistics"]
  },
  {
    id: "gs1",
    n: "GS1 India",
    full: "GS1 India (Global Standards 1)",
    col: "#F26322",
    ac: "#ea580c",
    img: "/logos/gs1.svg",
    s: "Authorized Solution Partner",
    r: "Standards & Compliance Partner",
    d: "Global barcode standards, serialization compliance, and item-to-pallet supply chain traceability.",
    p: ["1D/2D Barcode Verification & Grading", "GS1 EPCIS Serialization", "Item-to-Pallet Traceability Standards"],
    c: ["Traceability", "Standards"]
  }
];

export const PartnersView = () => {
  const { openDemoModal } = useApp();

  // Extract all categories
  const allCategories = useMemo(() => {
    const set = new Set();
    PARTNERS_DATA.forEach(p => p.c.forEach(cat => set.add(cat)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(PARTNERS_DATA[0]);

  // Dynamic Cycling Word in Hero
  const cyclingWords = ['Scanning', 'RFID', 'Machine Vision', 'Industrial Printing', 'Mobility', 'Automation'];
  const [cyclingIdx, setCyclingIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCyclingIdx(prev => (prev + 1) % cyclingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [cyclingWords.length]);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return PARTNERS_DATA.filter(p => {
      const matchesCat = activeCategory === 'All' || p.c.includes(activeCategory);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch =
        p.n.toLowerCase().includes(q) ||
        p.full.toLowerCase().includes(q) ||
        p.d.toLowerCase().includes(q) ||
        p.p.some(prod => prod.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Keep selected partner valid when filtered
  useEffect(() => {
    if (filteredPartners.length > 0 && !filteredPartners.some(p => p.id === selectedPartner.id)) {
      setSelectedPartner(filteredPartners[0]);
    }
  }, [filteredPartners, selectedPartner]);

  // 3D Ring State & Animation
  const [ringAngle, setRingAngle] = useState(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);
  const animFrameRef = useRef(null);

  // Auto-spin 3D ring
  useEffect(() => {
    const spin = () => {
      if (!isDraggingRef.current && !isHoveredRef.current) {
        currentAngleRef.current += 0.22;
        setRingAngle(currentAngleRef.current);
      }
      animFrameRef.current = requestAnimationFrame(spin);
    };
    animFrameRef.current = requestAnimationFrame(spin);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Drag-to-spin handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startXRef.current;
    startXRef.current = clientX;
    currentAngleRef.current += delta * 0.45;
    setRingAngle(currentAngleRef.current);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Cylinder radius based on number of cards
  const ringRadius = useMemo(() => {
    const count = Math.max(6, filteredPartners.length);
    return Math.max(340, Math.round((count * 170) / (2 * Math.PI)));
  }, [filteredPartners.length]);

  // Particle Canvas Background
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 75);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.6 + 1,
        color: Math.random() > 0.4 ? 'rgba(34, 211, 238, ' : 'rgba(2, 132, 199, '
      });
    }

    let frameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.16 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      frameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#050b18', color: '#eaf1fb', minHeight: '100vh', overflowX: 'clip', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      <style>{`
        .partner-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeRun 40s linear infinite;
        }
        .partner-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeRun {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ring-3d-stage {
          perspective: 1200px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
        }
        .ring-3d-rotator {
          transform-style: preserve-3d;
          transition: transform 0.1s linear;
        }
        .ring-3d-tile {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .ring-3d-tile:hover {
          box-shadow: 0 10px 30px rgba(34, 211, 238, 0.4), 0 0 0 2px #22d3ee !important;
        }
        @media (max-width: 768px) {
          .ring-3d-stage {
            display: none !important;
          }
          .details-panel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* =====================================================================
          1. 3D PARTICLE HERO WITH CYCLING KEYWORD & 3 STAT METRICS
         ===================================================================== */}
      <section style={{ position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 3.5rem 1.5rem', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Eyebrow Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.28)',
            borderRadius: '999px',
            color: '#22d3ee',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            marginBottom: '1.5rem'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }} />
            <span>CERTIFIED INDUSTRIAL ALLIANCES &amp; OEM NETWORK</span>
          </div>

          {/* Dynamic Headline */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 4.8vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 1.25rem 0'
          }}>
            Technology Partners for Industrial<br />
            <span style={{
              color: '#22d3ee',
              textShadow: '0 0 30px rgba(34, 211, 238, 0.45)',
              display: 'inline-block',
              minWidth: '220px'
            }}>
              {cyclingWords[cyclingIdx]}
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
            color: '#94a3b8',
            lineHeight: 1.65,
            maxWidth: '740px',
            margin: '0 auto 2.5rem auto'
          }}>
            ATPL bridges premier global hardware OEMs and frontline shopfloor execution. Certified integration, native SAP &amp; Oracle connectivity, and guaranteed local SLA support across India.
          </p>

          {/* 3 Count-Up Stat Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '760px',
            margin: '0 auto'
          }}>
            <div style={{ backgroundColor: 'rgba(8, 20, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, color: '#22d3ee', lineHeight: 1, marginBottom: '6px' }}>17+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Certified Global Partners</div>
            </div>
            <div style={{ backgroundColor: 'rgba(8, 20, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, color: '#22d3ee', lineHeight: 1, marginBottom: '6px' }}>15+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Industry Sectors</div>
            </div>
            <div style={{ backgroundColor: 'rgba(8, 20, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, color: '#22d3ee', lineHeight: 1, marginBottom: '6px' }}>64+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Supported Product Lines</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SCROLLING MARQUEE STRIP (WHITE ROUNDED LOGO PILLS)
         ===================================================================== */}
      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgba(4, 12, 28, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 0',
        marginBottom: '3rem'
      }}>
        <div className="partner-marquee-track">
          {[...PARTNERS_DATA, ...PARTNERS_DATA].map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedPartner(p);
                const el = document.getElementById('details-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '999px',
                height: '48px',
                padding: '4px 22px',
                margin: '0 8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                flexShrink: 0
              }}
              title={p.full}
            >
              <img
                src={p.img}
                alt={p.full}
                style={{ maxHeight: '30px', maxWidth: '120px', objectFit: 'contain', pointerEvents: 'none' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. CATEGORY FILTER CHIPS & LIVE SEARCH CONTROLS
         ===================================================================== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 2.5rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
          
          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {allCategories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '7px 18px',
                    backgroundColor: isActive ? 'rgba(34, 211, 238, 0.14)' : 'rgba(8, 20, 42, 0.7)',
                    border: isActive ? '1px solid #22d3ee' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    color: isActive ? '#22d3ee' : '#94a3b8',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 16px rgba(34, 211, 238, 0.35)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partners, hardware models, solutions..."
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '12px 18px 12px 46px',
                backgroundColor: 'rgba(8, 20, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE 3D AUTO-SPINNING RING OF LOGOS
         ===================================================================== */}
      <section
        style={{ position: 'relative', marginBottom: '3.5rem', overflow: 'hidden' }}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          
          <div
            className="ring-3d-stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            <div
              className="ring-3d-rotator"
              style={{
                position: 'relative',
                width: '160px',
                height: '80px',
                transform: `rotateY(${ringAngle}deg)`
              }}
            >
              {filteredPartners.map((partner, idx) => {
                const theta = (360 / filteredPartners.length) * idx;
                const isSelected = selectedPartner.id === partner.id;

                return (
                  <div
                    key={partner.id}
                    className="ring-3d-tile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPartner(partner);
                      const el = document.getElementById('details-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '150px',
                      height: '76px',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      boxShadow: isSelected
                        ? `0 0 32px ${partner.ac}, 0 0 0 3px ${partner.ac}`
                        : '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 16px',
                      cursor: 'pointer',
                      transform: `rotateY(${theta}deg) translateZ(${ringRadius}px) scale(${isSelected ? 1.12 : 1})`,
                      boxSizing: 'border-box'
                    }}
                  >
                    <img
                      src={partner.img}
                      alt={partner.full}
                      style={{ maxHeight: '46px', maxWidth: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '1rem' }}>
            ✦ Auto-spinning 3D Ring • Drag horizontally to spin • Hover to slow • Click any logo to view specs
          </p>
        </div>
      </section>

      {/* =====================================================================
          5. ACTIVE PARTNER DETAILS PANEL
         ===================================================================== */}
      <section id="details-section" style={{ maxWidth: '980px', margin: '0 auto 4.5rem auto', padding: '0 1.5rem' }}>
        <motion.div
          key={selectedPartner.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: 'linear-gradient(180deg, rgba(10, 24, 52, 0.9) 0%, rgba(6, 16, 36, 0.98) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 211, 238, 0.15)`,
            backdropFilter: 'blur(16px)',
            position: 'relative'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '160px',
              height: '78px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 18px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              flexShrink: 0
            }}>
              <img
                src={selectedPartner.img}
                alt={selectedPartner.full}
                style={{ maxHeight: '50px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                {selectedPartner.s && (
                  <span style={{
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(244, 63, 94, 0.14)',
                    border: '1px solid #f43f5e',
                    color: '#fda4af'
                  }}>
                    {selectedPartner.s}
                  </span>
                )}
                {selectedPartner.r && (
                  <span style={{
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(34, 211, 238, 0.12)',
                    border: '1px solid #22d3ee',
                    color: '#22d3ee'
                  }}>
                    {selectedPartner.r}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {selectedPartner.full}
              </h2>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '1.02rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            {selectedPartner.d}
          </p>

          {/* Verified Products Grid */}
          <div style={{
            backgroundColor: 'rgba(4, 12, 28, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#22d3ee', marginBottom: '0.85rem' }}>
              Verified Solutions &amp; Equipment Lineup
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
              {selectedPartner.p.map((prod, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(8, 20, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0'
                  }}
                >
                  <Sparkles size={13} color="#22d3ee" style={{ flexShrink: 0 }} />
                  <span>{prod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {selectedPartner.c.map(cat => (
                <span
                  key={cat}
                  style={{
                    fontSize: '11px',
                    padding: '3px 9px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    color: '#94a3b8',
                    fontWeight: 600
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openDemoModal({
                solution: `${selectedPartner.full} Integration`,
                notes: `Request certified technical architecture walkthrough and equipment distribution details for ${selectedPartner.full}.`
              })}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(0, 113, 186, 0.45)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#299fe0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Consult Integration Engineer</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          6. COMPREHENSIVE ALLIANCE DIRECTORY GRID
         ===================================================================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
            Comprehensive Alliance Directory
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Showing {filteredPartners.length} verified partner programs across factory automation &amp; AIDC hardware
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredPartners.map(partner => (
            <motion.div
              key={partner.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => {
                setSelectedPartner(partner);
                const el = document.getElementById('details-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: 'rgba(8, 20, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '120px',
                    height: '54px',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 14px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    <img
                      src={partner.img}
                      alt={partner.full}
                      style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  {partner.s && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(244, 63, 94, 0.12)',
                      border: '1px solid #f43f5e',
                      color: '#fda4af'
                    }}>
                      {partner.s.slice(0, 20)}...
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  {partner.full}
                </h3>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#22d3ee', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {partner.r}
                </div>
                <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  {partner.d}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {partner.c.map(cat => (
                    <span
                      key={cat}
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        color: '#94a3b8'
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#22d3ee',
                  fontSize: '12.5px',
                  fontWeight: 700
                }}>
                  <span>View Specifications &amp; Hardware</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default PartnersView;
