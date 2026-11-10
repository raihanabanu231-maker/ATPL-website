import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Layers, 
  LayoutGrid,
  Maximize2,
  ExternalLink,
  Activity,
  Barcode,
  Printer,
  Radio,
  Target,
  Smartphone,
  Eye,
  Monitor,
  Headphones
} from 'lucide-react';

// ============================================================================
// AUDIO SYNTHESIZER UTILITY (Web Audio API - Zero External Audio Files Needed)
// ============================================================================
class CinematicSoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playLift() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.18);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  playFlip() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.14);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  playDock() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  playSparkle() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [659.25, 880, 1174.66, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.035;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.02, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });
    } catch (e) {}
  }
}

const sfx = new CinematicSoundFX();

// ============================================================================
// 24 AUTHENTIC ATPL HARDWARE CARDS (Official Products & Content from atplgroup.com)
// ============================================================================
const HARDWARE_DECK_CARDS = [
  // --- 1. SCANNING SOLUTIONS (atplgroup.com/barcode-scanner-solutions/) ---
  {
    id: 'hw-scanner-wired',
    num: '01',
    category: 'scanners',
    categoryName: 'Scanning Solutions',
    oem: 'ATPL Solutions',
    title: 'ATPL Wired Scanner 1D / 2D',
    subtitle: 'Superior High-Accuracy Workstation & Dispatch Imager',
    accentColor: '#00f0ff',
    badgeText: '1D / 2D High-Accuracy',
    headlineWord: 'WIRED SCAN',
    tagline: 'Captures Even the Most Difficult-to-Read or Damaged Barcodes',
    image: '/assets/images/hardware/atpl_scanner_wired_h1.jpg',
    fallbackImage: '/assets/images/hw_handheld_scanner.jpg',
    desc: 'Superior scanning solution for 1D & 2D Barcodes. Premium wired scanning for retail, dispatch, and workstation environments that demand high-accuracy scanning of barcodes. Engineered to capture even the most difficult-to-read or damaged barcodes and improve business performance through technology.',
    keyPills: ['1D & 2D Barcodes', 'Damaged Code Capture', 'Retail & Dispatch Desks', 'Heavy-Duty USB / RS-232'],
    stats: [
      { label: 'Symbologies', val: 'All Standard 1D & 2D Barcodes' },
      { label: 'Workstations', val: 'Retail, Stores, Dispatch Bays' },
      { label: 'Condition Tolerance', val: 'Damaged, Smudged & Curved Codes' },
      { label: 'Interface', val: 'USB HID, Virtual COM, RS-232' }
    ],
    blueprint: {
      controller: 'High-Density Area Imager with Superior Decode DSP',
      connectivity: 'Industrial Shielded Heavy-Duty USB & RS-232 Cables',
      protocols: 'Direct POS Emulation, Keyboard Wedge, SAP WMS Driver',
      sensors: 'White LED illumination with precise green aimer beam',
      roiMetric: '100% First-Pass Read Rate on Low-Contrast and Damaged Labels'
    }
  },
  {
    id: 'hw-scanner-wireless',
    num: '02',
    category: 'scanners',
    categoryName: 'Scanning Solutions',
    oem: 'ATPL Solutions',
    title: 'ATPL Wireless Scanner 1D / 2D',
    subtitle: 'Freedom of Movement for POS, Conveyors & Warehouses',
    accentColor: '#38bdf8',
    badgeText: 'Extended Shift Battery',
    headlineWord: 'CORDLESS',
    tagline: 'Freedom of Movement Across Dispatch, Conveyors & Workstations',
    image: '/assets/images/hardware/atpl_scanner_cordless_hs2.jpg',
    fallbackImage: '/assets/images/hw_cordless_scanner.jpg',
    desc: 'Wireless scanning solution for 1D & 2D Barcodes. Provides freedom of movement around POS terminals, conveyor lines, stores, dispatch areas, warehouses, and workstations. Features superior battery capacity for long-duration multi-shift work without interruption.',
    keyPills: ['Freedom of Movement', 'Superior Battery Capacity', 'Conveyors & Warehouses', 'Auto-Pairing Cradle'],
    stats: [
      { label: 'Wireless Range', val: 'Up to 100m Line of Sight' },
      { label: 'Battery Capacity', val: 'Full Multi-Shift Continuous Work' },
      { label: 'Drop Survival', val: '1.8m to Concrete Floors' },
      { label: 'Auto-Docking', val: 'Instant Magnetic Charge Cradle' }
    ],
    blueprint: {
      controller: 'Dual-Field Area Imager with Bluetooth Low Energy 5.0',
      connectivity: 'Base Station Cradle with Multi-Interface USB & RS-232',
      protocols: 'Real-Time Batch Storage Mode & Instant Online RF Sync',
      sensors: 'Aggressive motion tolerance decoding fast items on conveyor belts',
      roiMetric: 'Eliminates Cable Fatigue & Speeds Up Pallet Check-in by 40%'
    }
  },
  {
    id: 'hw-scanner-granit',
    num: '03',
    category: 'scanners',
    categoryName: 'Scanning Solutions',
    oem: 'Honeywell / ATPL',
    title: 'Granit XP 1991i Ultra-Rugged',
    subtitle: 'Industrial Wireless High-Rack & Freezer Imager',
    accentColor: '#E85874',
    badgeText: '3.0m Drop (IP67)',
    headlineWord: 'ULTRA-RUGGED',
    tagline: 'Survives 3.0m Concrete Drops, Forklifts & -30°C Freezers',
    image: '/assets/images/hardware/atpl_scanner_granit_h3.jpg',
    fallbackImage: '/assets/images/hardware/atpl_scanner_cordless_hs2.jpg',
    desc: 'Engineered for punishment in severe industrial environments. Built to survive 3.0-meter drops to concrete and thousands of tumbles. Extended flex-range optics capture barcodes from near-contact up to 15 meters away across high-rack warehouse bays and sub-zero cold chain facilities.',
    keyPills: ['15m Long Range', '3.0m Drop Concrete', '-30°C Cold Storage', 'IP65 & IP67 Sealed'],
    stats: [
      { label: 'Drop Specification', val: '3.0m to concrete at -30°C' },
      { label: 'Tumble Durability', val: '7,000 1-meter tumbles' },
      { label: 'Read Distance', val: 'Near contact up to 15 meters' },
      { label: 'Operating Temp', val: '-30°C to +50°C' }
    ],
    blueprint: {
      controller: 'FlexRange High-Density Long-Range Area Imager Engine',
      connectivity: 'Bluetooth Class 1 (100m line of sight) with Secure Base',
      protocols: 'Direct SAP WMS Emulation, Telnet 5250/3270, RS-232, USB',
      sensors: 'Impact-isolated optics with bright red laser aimer cross',
      roiMetric: 'Zero Breakage Replacement Costs in Demanding Foundries & Yards'
    }
  },
  {
    id: 'hw-scanner-dpm',
    num: '04',
    category: 'scanners',
    categoryName: 'Scanning Solutions',
    oem: 'ATPL Solutions',
    title: 'ATPL Industrial DPM Scanner',
    subtitle: 'Direct Part Mark Imager with Multi-Illumination',
    accentColor: '#a855f7',
    badgeText: 'DPM Multi-Illumination',
    headlineWord: 'DPM SCAN',
    tagline: 'Decodes Dot-Peen, Laser-Etch & Chemical Marks on Any Metal',
    image: '/assets/images/hardware/atpl_scanner_dpm_h6.jpg',
    fallbackImage: '/assets/images/hardware/atpl_scanner_wired_h1.jpg',
    desc: 'Engineered to read barcodes from Direct Part Marks (DPM) used in automotive, pharmaceutical, defense, and aerospace industries. Innovative multi-illumination lighting system enables scanning of virtually any type of direct part mark regardless of size, curved surface, marking method, or low contrast.',
    keyPills: ['Multi-Illumination System', 'Dot Peen & Laser Marks', 'Curved & Mirrored Metals', 'Automotive & Defense'],
    stats: [
      { label: 'Marking Types', val: 'Dot Peen, Laser Etch, Chemical Ink' },
      { label: 'Lighting Modes', val: 'Direct, Diffused & Darkfield Illumination' },
      { label: 'Surfaces', val: 'Cast Iron, Polished Chrome, Plastics' },
      { label: 'Quality Grading', val: 'ISO/IEC 15415 & AS9132 DPM Specs' }
    ],
    blueprint: {
      controller: 'DPM Cognitive Decoding Engine with Glare Suppression',
      connectivity: 'Heavy-Duty Industrial Shielded USB / RS-232 Cable',
      protocols: 'GS1 DataMatrix DPM, QR Code, MicroPDF417, PDF417',
      sensors: 'Multi-quadrant diffuse LED dome eliminating specular glare',
      roiMetric: 'Guarantees 100% Part Serialization Traceability on Powertrains'
    }
  },
  {
    id: 'hw-scanner-conveyor',
    num: '05',
    category: 'scanners',
    categoryName: 'Scanning Solutions',
    oem: 'ATPL Vision',
    title: 'ATPL Fixed Conveyor & Vision Scanner',
    subtitle: 'Built-in AI Technology & High-Speed In-Motion Reading',
    accentColor: '#06b6d4',
    badgeText: 'Built-in AI Vision',
    headlineWord: 'AI CONVEYOR',
    tagline: 'Identify Presence, Check Differences & Read Objects in Motion',
    image: '/assets/images/hardware/atpl_scanner_presentation_h4.jpg',
    fallbackImage: '/assets/images/hardware/atpl_scanner_wired_h1.jpg',
    desc: 'Lightweight, durable, and portable fixed-mount scanning solution for conveyor applications and kiosks. Features built-in AI technology designed to capture dynamic imaging conditions, identify presence, perform difference checking, and read objects rapidly on the move with external trigger I/O support.',
    keyPills: ['Built-in AI Technology', 'Read Objects on the Move', 'External Trigger I/O', 'Fixed Conveyor & Kiosk'],
    stats: [
      { label: 'Frame Rate', val: 'Up to 60 Frames / Second' },
      { label: 'Conveyor Speed', val: 'Reads Objects Moving at 3.5 m/s' },
      { label: 'I/O Ports', val: 'Optocoupled Triggers & Aux Lights' },
      { label: 'Mounting', val: 'Adjustable Industrial Swivel Bracket' }
    ],
    blueprint: {
      controller: 'Embedded AI Vision Neural Engine with Pattern Matching',
      connectivity: 'M12 Industrial Ethernet, RS-485, Opto-Isolated I/O Triggers',
      protocols: 'Modbus TCP, TCP/IP Socket, Direct PLC Trigger Handshake',
      sensors: 'Global shutter sensor eliminating motion blur at line speeds',
      roiMetric: 'Automates Sortation Lines with Zero In-Motion Mis-Scans'
    }
  },

  // --- 2. BARCODE PRINTER SOLUTIONS (atplgroup.com/barcode-printer-solutions/) ---
  {
    id: 'hw-printer-industrial',
    num: '06',
    category: 'printers',
    categoryName: 'Printing Solutions',
    oem: 'ATPL Industrial',
    title: 'Industrial Printer - High Performance',
    subtitle: '24/7 Error-Free Precision with In-Line Verification',
    accentColor: '#10b981',
    badgeText: 'In-Line Verifier',
    headlineWord: 'INDUSTRIAL',
    tagline: 'Error-Free Precision Printing & Host-Free Smart Printing',
    image: '/assets/images/hardware/atpl_printer_industrial.png',
    fallbackImage: '/assets/images/hardware/atpl_printer_desktop.png',
    desc: 'Takes industrial printing to a new level of accuracy and simplicity by providing customers with error-free precision printing, increasing production efficiency and reducing operational costs. Integrated label verification technology checks and ensures barcodes are accurate every time. Smart printing allows configuring and printing without a host computer.',
    keyPills: ['Integrated Label Verifier', 'Host-Free Smart Print', 'Predictive Fleet Analytics', 'Heavy All-Metal Build'],
    stats: [
      { label: 'Max Print Speed', val: 'Up to 14 Inches / Second' },
      { label: 'Verification', val: 'Integrated 1D/2D In-line Barcode Verifier' },
      { label: 'Resolution', val: '203 / 300 / 600 DPI Precision' },
      { label: 'Chassis', val: 'Rugged Die-Cast Metal Structure' }
    ],
    blueprint: {
      controller: 'High-Speed Multitasking RISC CPU with Real-Time Buffer',
      connectivity: 'Gigabit Ethernet, Dual USB Host, RS-232, Wi-Fi 6',
      protocols: 'ZPL II, DPL, IPL, Direct XML & SAP Smart Forms Native Driver',
      sensors: 'Transmissive gap sensor, reflective black mark, ribbon low sensor',
      roiMetric: 'Eliminates Unreadable Barcode Chargebacks & Boosts Uptime to 99.9%'
    }
  },
  {
    id: 'hw-printer-rfid',
    num: '07',
    category: 'printers',
    categoryName: 'Printing Solutions',
    oem: 'ATPL Industrial',
    title: 'ATPL RFID Industrial Printer & Encoder',
    subtitle: 'High-Speed Encoding on Standard & On-Metal Tags',
    accentColor: '#fbbf24',
    badgeText: 'RAIN RFID Encoded',
    headlineWord: 'RFID PRINT',
    tagline: 'High-Speed Encoding for Standard Labels & On-Metal Assets',
    image: '/assets/images/hardware/atpl_printer_rfid.png',
    fallbackImage: '/assets/images/hardware/atpl_printer_desktop.png',
    desc: 'Enterprise-level features and high-speed RFID encoding at an affordable price. Encodes and prints on standard RFID paper labels commonly used in carton or pallet supply chain applications, as well as thick on-metal RFID tags used in asset tracking where the tagged item has a metal surface, such as IT servers, safety deposit boxes, or gas canisters.',
    keyPills: ['Standard & On-Metal Tags', 'High-Speed RFID Encoding', 'Supply Chain Cartons', 'IT Servers & Gas Canisters'],
    stats: [
      { label: 'RFID Standard', val: 'EPCglobal Gen2v2 / ISO 18000-6C' },
      { label: 'Tag Compatibility', val: 'Standard Paper Inlays & On-Metal Tags' },
      { label: 'Verification', val: 'Auto Bad-Tag Voiding & Re-Print' },
      { label: 'Print Resolution', val: '300 & 600 DPI High-Density' }
    ],
    blueprint: {
      controller: 'Integrated RAIN RFID Encoder Engine with Dynamic Antenna Pitch',
      connectivity: 'Gigabit Ethernet, USB Host, RS-232, Industrial Wi-Fi',
      protocols: 'EPC Gen2, RAIN RFID, ZPL RFID Commands, SAP Auto-ID',
      sensors: 'Adaptive antenna calibrator detecting micro-pitch tag inlays',
      roiMetric: 'Simultaneous 100% Verified RFID Tag Encoding & Barcode Printing'
    }
  },
  {
    id: 'hw-printer-mobile',
    num: '08',
    category: 'printers',
    categoryName: 'Printing Solutions',
    oem: 'ATPL Mobile',
    title: 'ATPL Portable Mobile Printer',
    subtitle: 'Point-of-Activity Printing Built for Rugged Environments',
    accentColor: '#00a651',
    badgeText: '2.0m Drop Concrete',
    headlineWord: 'MOBILE PRINT',
    tagline: 'On-the-Spot Labeling Built for the Most Rugged Environments',
    image: '/assets/images/hardware/atpl_printer_mobile.png',
    fallbackImage: '/assets/images/hardware/atpl_printer_desktop.png',
    desc: 'Prints labels directly at the location where they are needed. Portable mobile printer built for the most rugged environments with quiet operation and excellent value. Increases efficiency and minimizes downtime with easy integrated device management and high-level security throughout the printer lifespan.',
    keyPills: ['Print at Point of Activity', 'Built for Rugged Environments', 'Easy Device Management', 'High-Level Security'],
    stats: [
      { label: 'Drop Survival', val: '2.0m to Concrete Floors' },
      { label: 'Print Width', val: 'Up to 4-Inch (104mm) Media' },
      { label: 'Battery Capacity', val: 'High-Capacity Smart Lithium-Ion' },
      { label: 'Connectivity', val: 'Bluetooth 5.0 BLE + Wi-Fi 802.11ac' }
    ],
    blueprint: {
      controller: 'Low-Power Mobile Print Processor with Instant Cold-Wake',
      connectivity: 'NFC Instant Tap-to-Pair with Handhelds & Tablets',
      protocols: 'CPCL, ZPL, EPL, ESC/POS, Direct Android / iOS SDK',
      sensors: 'Optical label gap sensor, black mark reflex, paper-out switch',
      roiMetric: 'Saves 45 Minutes Per Worker Shift by Eliminating Walking to Desks'
    }
  },
  {
    id: 'hw-printer-desktop',
    num: '09',
    category: 'printers',
    categoryName: 'Printing Solutions',
    oem: 'ATPL Solutions',
    title: 'ATPL Desktop Barcode Printer',
    subtitle: 'Affordable High-Volume Daily Identification & Shipping',
    accentColor: '#0071ba',
    badgeText: 'High-Volume Daily',
    headlineWord: 'DESKTOP',
    tagline: 'Prints Thousands of Clear, Crisp Barcode & Shipping Labels Daily',
    image: '/assets/images/hardware/atpl_printer_desktop.png',
    fallbackImage: '/assets/images/hardware/atpl_printer_industrial.png',
    desc: 'For budgetary label printing solutions. Designed and built to deliver high quality and performance while withstanding tough workplace environments. Affordable, hardworking printer producing thousands of clear, crisp barcode and identification labels per day, from shipping labels to compliance and product identification.',
    keyPills: ['Budgetary Label Printing', 'Thousands of Labels / Day', 'Shipping & Compliance Labels', 'Withstands Tough Desks'],
    stats: [
      { label: 'Daily Output', val: 'Thousands of Labels per Day' },
      { label: 'Applications', val: 'Shipping, Compliance, Product IDs' },
      { label: 'Print Methods', val: 'Direct Thermal & Thermal Transfer' },
      { label: 'Shell Structure', val: 'Dual-Walled High-Impact Polymer' }
    ],
    blueprint: {
      controller: '32-Bit RISC Engine with Easy-Load Ribbon & Media Mechanism',
      connectivity: 'USB 2.0 High-Speed, Ethernet RJ-45, Optional Wi-Fi',
      protocols: 'Auto-Switching Emulations: ZPL II, EPL, TSPL, DPL',
      sensors: 'Adjustable transmissive gap sensor and reflective black mark',
      roiMetric: 'Lowest Total Cost of Ownership for Stockrooms & Packing Benches'
    }
  },

  // --- 3. MOBILITY & TABLET SOLUTIONS (atplgroup.com/mobility-tablet-solutions/) ---
  {
    id: 'hw-mobility-rugged',
    num: '10',
    category: 'mobility',
    categoryName: 'Mobility Edge Solutions',
    oem: 'Honeywell / Zebra',
    title: 'Android Enterprise Rugged Device',
    subtitle: 'Full-Touch + Physical Keypad with 15.2m Read Range',
    accentColor: '#38bdf8',
    badgeText: '15.2m Read Range',
    headlineWord: 'RUGGED',
    tagline: 'Fast Data Entry at High Transaction Rates in Severe Environments',
    image: '/assets/images/hardware/atpl_mobility_rugged.png',
    fallbackImage: '/assets/images/hardware/atpl_mobility_enterprise.png',
    desc: 'Android Enterprise Rugged handheld computer designed to improve operational speed and accuracy. Combines full-touch capabilities with physical keys for fast data entry at high transaction rates in severe environments. Features enhanced 1D/2D scanning with read ranges from 0.15m to 15.2m, surviving 3.0m drops to concrete and IP65/IP67 water/dust spray.',
    keyPills: ['0.15m to 15.2m Read Range', '3.0m Drop to Concrete', 'Touch + Physical Keypad', 'IP65 / IP67 Sealed'],
    stats: [
      { label: 'Drop Specification', val: '3.0m to concrete & 1m tumbles' },
      { label: 'Scan Range', val: '0.15 m to 15.2 m FlexRange' },
      { label: 'Ingress Protection', val: 'IP65 & IP67 Sealed against water spray' },
      { label: 'Keypad Options', val: 'Numeric, Functional & Alphanumeric' }
    ],
    blueprint: {
      controller: 'Qualcomm Octa-Core Processor with Dedicated Neural Engine',
      connectivity: 'Wi-Fi 6E (802.11ax), 5G Cellular, Bluetooth 5.2 Low Energy',
      protocols: 'Android Enterprise Recommended, SAP Fiori, Telnet 5250/3270',
      sensors: 'Extended-range area imager with green LED aimer cross',
      roiMetric: 'Zero Breakage Rate & 45% Faster High-Bay Rack Inventory Audits'
    }
  },
  {
    id: 'hw-mobility-field',
    num: '11',
    category: 'mobility',
    categoryName: 'Mobility Edge Solutions',
    oem: 'ATPL Mobility Edge',
    title: 'Mobility Edge Enterprise Device',
    subtitle: 'Qualcomm-Powered Scalable Mobile Platform',
    accentColor: '#00f0ff',
    badgeText: '2-3 Shift Battery',
    headlineWord: 'MOBILITY',
    tagline: 'Lightweight & Slim Design with Two to Three Shift Battery Life',
    image: '/assets/images/hardware/atpl_mobility_enterprise.png',
    fallbackImage: '/assets/images/hardware/atpl_mobility_field.png',
    desc: 'Enterprise-class mobile computer that provides reliable and secure connectivity between frontline workers and backend systems across retail, logistics, manufacturing, and public service. Lightweight and slim design allows users to easily operate the device with one hand, carry it in pockets, and stay comfortable all day, backed by a battery lasting 2 to 3 shifts.',
    keyPills: ['Unified Mobility Edge', '2 to 3 Shifts Battery', 'Slim One-Handed Design', 'Centimeters to 20m Range'],
    stats: [
      { label: 'Battery Life', val: 'Lasts 2 to 3 Full Work Shifts' },
      { label: 'Ergonomics', val: 'Slim, Pocketable & Lightweight Design' },
      { label: 'Platform Stability', val: 'Guaranteed Multi-Gen Android Support' },
      { label: 'Scan Flexibility', val: 'Centimeters up to 20m Scan Choice' }
    ],
    blueprint: {
      controller: 'High-Performance Qualcomm Platform with Long OS Lifecycle',
      connectivity: 'Fast Roaming Wi-Fi, Bluetooth 5.1 BLE, 4G/5G Cellular',
      protocols: 'WPA3 Enterprise Security, Zero-Touch MDM Enrollment',
      sensors: 'Integrated ambient light sensor and proximity sensor',
      roiMetric: 'Guaranteed 5-Year Hardware Lifecycle & Lower Enterprise TCO'
    }
  },
  {
    id: 'hw-mobility-cold-zone',
    num: '12',
    category: 'mobility',
    categoryName: 'Mobility Edge Solutions',
    oem: 'ATPL Specialized',
    title: 'Cold Storage & Hazardous Zone Terminal',
    subtitle: 'Built for -30°C Freezers & Explosive Atmospheres',
    accentColor: '#06b6d4',
    badgeText: '-30°C Freezer Ready',
    headlineWord: 'ZONE ATEX',
    tagline: 'Heated Scan Windows & High Visibility in Direct Sunlight & Explosive Zones',
    image: '/assets/images/hardware/atpl_mobility_cold_storage.png',
    fallbackImage: '/assets/images/hardware/atpl_mobility_zone.png',
    desc: 'Specifically built to perform under demanding conditions in cold storage areas, oily environments, mines, freezer warehouses, and explosive atmosphere zones. Features heated optical scan windows to prevent condensation, high-visibility displays in direct sunlight, glove-operable touchscreens, and noise-canceling loud speakers.',
    keyPills: ['-30°C Cold Storage', 'Hazardous Zone Rated', 'Internal Heated Window', 'Glove & Sunlight Display'],
    stats: [
      { label: 'Operating Temp', val: '-30°C to +50°C Continuous' },
      { label: 'Hazardous Certification', val: 'Non-Incendive & Explosive Atmosphere' },
      { label: 'Display Optics', val: 'Direct Sunlight High-Nits Screen' },
      { label: 'Audio System', val: 'Extremely Loud Speaker with Noise Cancel' }
    ],
    blueprint: {
      controller: 'Thermal-Regulated Embedded Motherboard with Internal Heaters',
      connectivity: 'Low-Temp Rated Antennas for High-Moisture Freezers',
      protocols: 'ATEX / IECEx Zone 2 Certified, Cold Storage Protocol',
      sensors: 'Desiccant-sealed optics with frost-prevention heating coil',
      roiMetric: 'Prevents Fogging Downtime & Battery Shutdown in -30°C Cold Stores'
    }
  },
  {
    id: 'hw-mobility-tablet',
    num: '13',
    category: 'mobility',
    categoryName: 'Mobility Edge Solutions',
    oem: 'ATPL Industrial',
    title: 'ATPL Rugged Industrial Tablet',
    subtitle: 'Supervisor & Shopfloor Workflow Tablet with Vehicle Docks',
    accentColor: '#f59e0b',
    badgeText: 'Forklift Docked',
    headlineWord: 'TABLET',
    tagline: 'Vehicle Docks for Forklift Mounting, Desk Docks & Far-Range Scans',
    image: '/assets/images/hardware/atpl_mobility_tablet.png',
    fallbackImage: '/assets/images/hardware/atpl_mobility_enterprise.png',
    desc: 'Rugged tablet designed for rapid user adoption across supervisors, shop floor workers, and maintenance teams. Ready to fit daily workflows with powerful barcode scanning capabilities including near, mid, and far range with instantaneous autofocus. Features vehicle docks for forklift mounting, desk docks, and secure voice/video collaboration.',
    keyPills: ['Forklift Vehicle Docks', 'Supervisor & Shopfloor Fit', 'Near / Mid / Far Scan', 'Voice & Video Collab'],
    stats: [
      { label: 'Mounting Docks', val: 'Forklift Vehicle Docks & Desk Docks' },
      { label: 'Barcode Scanner', val: 'Instantaneous Autofocus Imager' },
      { label: 'Durability', val: 'MIL-STD-810H & Rugged Drop Spec' },
      { label: 'Display Size', val: '8-Inch & 10-Inch High-Luminance' }
    ],
    blueprint: {
      controller: 'Intel / Qualcomm Industrial Mobile Platform',
      connectivity: 'Wi-Fi 6, 4G/5G LTE, Hot-Swappable Secondary Battery',
      protocols: 'Windows 11 Pro / Android Enterprise, SAP GUI, Web Apps',
      sensors: 'Gorilla Glass touch display operable with heavy work gloves',
      roiMetric: 'Connects Shopfloor Supervisors Directly to ERP in Real-Time'
    }
  },

  // --- 4. RFID SOLUTIONS (atplgroup.com/rfid-card-tags-antenna-and-readers/) ---
  {
    id: 'hw-rfid-fixed',
    num: '14',
    category: 'rfid',
    categoryName: 'RFID Solutions',
    oem: 'ATPL RFID',
    title: 'Best-in-Class Fixed RFID Reader',
    subtitle: 'High-Visibility Tag Reading for Logistics & Material Handling',
    accentColor: '#fbbf24',
    badgeText: 'High Tag Accuracy',
    headlineWord: 'FIXED RFID',
    tagline: 'Best-in-Class Visibility for Logistics, Manufacturing & Asset Tracking',
    image: '/assets/images/hardware/atpl_rfid_fixed_reader.jpg',
    fallbackImage: '/assets/images/hardware/atpl_rfid_antenna.jpg',
    desc: 'Best-in-class fixed mount RFID reader line that enables system integrators to create RFID solutions for logistics, material handling, asset tracking, and manufacturing applications. Easily deployed and managed on common networks to achieve a new level of visibility in identifying RFID tags with greater tag reading accuracy.',
    keyPills: ['High Tag Reading Accuracy', 'Logistics & Material Handling', 'Common Network Management', 'Multi-Port Fixed Mount'],
    stats: [
      { label: 'Tag Read Speed', val: 'Up to 1,200 Tags / Second' },
      { label: 'Sensitivity', val: '-92 dBm Ultra-High RF Receive' },
      { label: 'Antenna Ports', val: '4-Port & 8-Port Expandable' },
      { label: 'Power', val: 'Power over Ethernet Plus (PoE+)' }
    ],
    blueprint: {
      controller: 'Next-Generation RAIN RFID Reader Core with Phase Sensing',
      connectivity: 'Gigabit PoE+, Industrial M12 Ethernet, Opto-Isolated I/O',
      protocols: 'EPCglobal Gen2v2 (ISO 18000-6C), LLRP, JSON REST API',
      sensors: 'Integrated RF carrier cancellation and directional logic',
      roiMetric: '99.98% Automatic Verification on High-Speed Pallet Conveyors'
    }
  },
  {
    id: 'hw-rfid-sled',
    num: '15',
    category: 'rfid',
    categoryName: 'RFID Solutions',
    oem: 'ATPL RFID',
    title: 'ATPL Mobile RFID Reader & Sled',
    subtitle: 'Handheld RFID for Retail, Logistics & Manufacturing',
    accentColor: '#f97316',
    badgeText: 'Handheld UHF Sled',
    headlineWord: 'MOBILE SLED',
    tagline: 'Paired with Lightweight Touchscreen Mobile Computers Indoors & Outdoors',
    image: '/assets/images/hardware/atpl_rfid_handheld_sled.jpg',
    fallbackImage: '/assets/images/hardware/atpl_rfid_fixed_reader.jpg',
    desc: 'Offers a complete range of mobile solutions for RFID needs across multiple markets, from handheld readers for retail environments to ruggedized units for logistics and manufacturing. Paired with lightweight, touchscreen mobile computers for indoor and outdoor asset tracking and inventory counting.',
    keyPills: ['Handheld Mobile RFID', 'Retail to Rugged Logistics', 'Touch Mobile Pairing', 'Indoor & Outdoor Tracking'],
    stats: [
      { label: 'Read Distance', val: 'Up to 10+ Meters Line of Sight' },
      { label: 'Ergonomics', val: 'Balanced Gun Grip with Quick-Release' },
      { label: 'Battery Capacity', val: 'Dedicated 7,000 mAh RFID Battery' },
      { label: 'Drop Rating', val: '1.5m to Concrete Floors' }
    ],
    blueprint: {
      controller: 'High-Throughput Mobile UHF RFID Module with Anti-Collision',
      connectivity: 'Direct eConn Hardware Interface & Bluetooth 5.0',
      protocols: 'ISO 18000-6C, RAIN RFID, Native Android Sled SDK',
      sensors: 'Circular polarized antenna reading tags at any physical angle',
      roiMetric: 'Conducts 10,000-Item Warehouse Audits in Under 20 Minutes'
    }
  },
  {
    id: 'hw-rfid-antenna-tags',
    num: '16',
    category: 'rfid',
    categoryName: 'RFID Solutions',
    oem: 'ATPL RFID',
    title: 'Forklift Antennas & Industrial Tags',
    subtitle: 'Vibration-Proof Antennas with Water & Chemical Resistant Tags',
    accentColor: '#eab308',
    badgeText: 'Shock & Vibration Proof',
    headlineWord: 'RFID ANTENNA',
    tagline: 'No Drilling, Cutting or Welding for Fast Single Forklift or Fleet Rollouts',
    image: '/assets/images/hardware/atpl_rfid_antenna.jpg',
    fallbackImage: '/assets/images/hardware/atpl_rfid_tags.jpg',
    desc: 'RFID antennas specifically developed for forklift installations where shock and vibration exceed fixed antenna specifications, mounted with no drilling, cutting, or welding for fast fleet deployments. Paired with a wide range of industrial RFID tags that withstand water immersion, chemicals, shock, and temperature variations without line of sight.',
    keyPills: ['Forklift Vibration Proof', 'No-Drill Mounting Cells', 'Water & Chemical Resistant', 'No Line of Sight Needed'],
    stats: [
      { label: 'Forklift Mounting', val: 'Antenna Cells: No Drilling or Cutting' },
      { label: 'Tag Resistance', val: 'Water, Harsh Chemicals & High Shock' },
      { label: 'Line of Sight', val: 'No Line of Sight Required for Reading' },
      { label: 'Tag Formats', val: 'On-Metal, High-Temp, Reusable & Disposable' }
    ],
    blueprint: {
      controller: 'Heavy-Duty Shock-Absorbing Cell Antenna Housing',
      connectivity: 'Low-Loss Reverse-Polarity TNC Coaxial Cables',
      protocols: 'UHF 865-868 MHz (India & EU) / 902-928 MHz (US)',
      sensors: 'Multi-plane radiation pattern capturing tags in any orientation',
      roiMetric: 'Zero Forklift Cabling Damage & Continuous Pallet Pick Verification'
    }
  },

  // --- 5. DIRECT MARKING SOLUTIONS (atplgroup.com/direct-marking-solutions/) ---
  {
    id: 'hw-marking-fiber',
    num: '17',
    category: 'marking',
    categoryName: 'Direct Marking Solutions',
    oem: 'ATPL Marking',
    title: 'Fiber Laser Marking Machine',
    subtitle: 'Chiller-Free High-Speed Traceability for Metals & Cast Iron',
    accentColor: '#a855f7',
    badgeText: 'Operates Without Chillers',
    headlineWord: 'FIBER LASER',
    tagline: 'Marking, Engraving, Coding & Etching on All Types of Metals',
    image: '/assets/images/hardware/atpl_marking_laser.png',
    fallbackImage: '/assets/images/hardware/atpl_marking_bradma_dotpeen.png',
    desc: 'Suitable for rugged industrial environments, operating reliably without chillers. Engineered for high-resolution, high-speed marking and high-volume applications with negligible maintenance and zero consumables. Provides the best industrial solution for product identification and traceability, marking on coated metals, glass, fiberglass, plastics, cast iron, and leather.',
    keyPills: ['Operates Without Chillers', 'Zero Consumables Cost', 'Coated Metals & Cast Iron', 'Negligible Maintenance'],
    stats: [
      { label: 'Chiller Requirement', val: 'Zero Chillers Required (Air Cooled)' },
      { label: 'Substrates', val: 'Metals, Cast Iron, Fiber Glass, Acrylic' },
      { label: 'Marking Operations', val: 'Marking, Engraving, Coding & Etching' },
      { label: 'Consumables', val: '100% Zero Inks or Consumables' }
    ],
    blueprint: {
      controller: 'Solid-State Fiber Laser Source with High-Speed Galvo Scanner',
      connectivity: 'Industrial Ethernet M12, USB 3.0, Optically Isolated I/O',
      protocols: 'Direct Marking of GS1 DataMatrix, Alphanumeric Codes',
      sensors: 'Red pilot beam focusing pointer with focal height sensor',
      roiMetric: '100% Permanent Part Traceability with Zero Consumables Expense'
    }
  },
  {
    id: 'hw-marking-uv',
    num: '18',
    category: 'marking',
    categoryName: 'Direct Marking Solutions',
    oem: 'ATPL Marking',
    title: 'UV Laser Hyperfine Marking Machine',
    subtitle: 'Mini Laser Spot Cold Marking with Zero Material Burning',
    accentColor: '#c084fc',
    badgeText: 'Zero Material Burning',
    headlineWord: 'UV LASER',
    tagline: 'Mini Laser Spot & Small Heat-Affected Zone for Hyperfine Marking',
    image: '/assets/images/hardware/atpl_marking_uv_laser.png',
    fallbackImage: '/assets/images/hardware/atpl_marking_laser.png',
    desc: 'Features a mini laser spot and ultra-small heat-affected zone for hyperfine marking on special and heat-sensitive materials. The premier choice for customers requiring high marking quality with zero material burning, high marking speed, high efficiency, stable performance, and low electricity consumption.',
    keyPills: ['Mini Laser Spot', 'Zero Material Burning', 'Small Heat-Affected Zone', 'Low Electricity Consumption'],
    stats: [
      { label: 'Laser Wavelength', val: '355nm UV Cold Laser Beam' },
      { label: 'Thermal Effect', val: 'Negligible (Zero Material Burning)' },
      { label: 'Target Materials', val: 'Special Plastics, Glass, Pharma Vials' },
      { label: 'Power Consumption', val: 'Low Electricity Energy Efficient' }
    ],
    blueprint: {
      controller: 'Diode-Pumped Solid-State UV Laser with Precision Optic Train',
      connectivity: 'Industrial PC Controller with Automated Touchscreen GUI',
      protocols: '21 CFR Part 11 Audit Trail, UDI Medical Compliance',
      sensors: 'Micro-focal dynamic depth sensor for curved medical vials',
      roiMetric: 'Flawless Contrast on Sensitive Plastics Without Structural Damage'
    }
  },
  {
    id: 'hw-marking-pin',
    num: '19',
    category: 'marking',
    categoryName: 'Direct Marking Solutions',
    oem: 'Bradma / ATPL',
    title: 'Industrial Dot Peen Pin Marker',
    subtitle: 'Deep Mechanical Character & 2D Matrix Indentation',
    accentColor: '#9333ea',
    badgeText: 'Optimal Efficiency',
    headlineWord: 'PIN MARKING',
    tagline: 'Automates Character & DataMatrix Marking on Plastic & Metal Surfaces',
    image: '/assets/images/hardware/atpl_marking_bradma_dotpeen.png',
    fallbackImage: '/assets/images/hardware/atpl_marking_tmp1000.png',
    desc: 'Fast-paced industries depend on dot peen markers to automate the process of marking characters on plastic and metal surfaces. Delivers precise dot placement that yields high-quality, long-lasting impressions and legible wording on substrates, ensuring permanent traceability through painting and sandblasting.',
    keyPills: ['Deep Permanent Indents', 'Optimal Efficiency & Speed', 'Precise Dot Placement', 'Metal & Dense Plastics'],
    stats: [
      { label: 'Marking Principle', val: 'Pneumatic & Electromagnetic Dot Peen' },
      { label: 'Material Hardness', val: 'Up to 62 HRC Hardened Steel' },
      { label: 'Legibility', val: 'Legible After Paint & Heavy Wear' },
      { label: 'Configurations', val: 'Benchtop & Handheld Gun Models' }
    ],
    blueprint: {
      controller: 'Microprocessor-Controlled X/Y Stepper Drive System',
      connectivity: 'RS-232, USB, Ethernet, PLC I/O Start/Stop Signals',
      protocols: 'ISO 16022 DataMatrix, Serial Numbering, Time Stamps',
      sensors: 'Stylus position feedback with carbide pin wear detection',
      roiMetric: 'Indelible Chassis Identification Surviving 20+ Years in Service'
    }
  },

  // --- 6. INDUSTRIAL TOUCH SYSTEMS (atplgroup.com/industrial-touch-system/) ---
  {
    id: 'hw-touch-industrial',
    num: '20',
    category: 'touch',
    categoryName: 'Industrial Touch Systems',
    oem: 'ATPL Touch',
    title: 'Industrial Touch System & Edge POS',
    subtitle: 'Fan-Less Thermal Design with Toughened PCAP Glass',
    accentColor: '#f59e0b',
    badgeText: 'Fan-Less Thermal Design',
    headlineWord: 'TOUCH SYSTEM',
    tagline: 'Bezel-Free Toughened Glass & OS Versatility (Android, Windows, Linux)',
    image: '/assets/images/hardware/atpl_touch_computer.jpg',
    fallbackImage: '/assets/images/hw_electronics_qc.jpg',
    desc: 'Diverse industrial edge computers with high performance and rugged design to enhance retail, hospitality services, and industrial automation. Features complete OS versatility (Android, Windows, and Linux compatible), bezel-free PCAP touch screen, impact-resistant toughened glass, and a fan-less thermal design that allows heat to dissipate rapidly.',
    keyPills: ['Fan-less Thermal Design', 'Bezel-Free PCAP Touch', 'Android, Windows & Linux', 'Toughened Glass Screen'],
    stats: [
      { label: 'Thermal Cooling', val: 'Fan-less Rapid Heat Dissipation' },
      { label: 'Touch Screen Type', val: 'Bezel-free Projected Capacitive (PCAP)' },
      { label: 'Front Glass', val: 'Impact-Resistant Toughened Glass' },
      { label: 'Operating Systems', val: 'Android, Windows & Linux Compatible' }
    ],
    blueprint: {
      controller: 'High-Performance Fanless Industrial Embedded Core',
      connectivity: 'Dual LAN, Multiple USB 3.0, Powered COM RS-232/485',
      protocols: 'OPC UA, MQTT, Windows IoT, Ubuntu LTS, Android POS',
      sensors: 'Glove-operable capacitive sensor with moisture rejection',
      roiMetric: '100% Elimination of Dust-Related Computer Failures on the Shop Floor'
    }
  },

  // --- 7. PLC AUTOMATION (atplgroup.com/plc-automation/) ---
  {
    id: 'hw-plc-automation',
    num: '21',
    category: 'plc',
    categoryName: 'PLC Automation',
    oem: 'ATPL Automation',
    title: 'ATPL PLC Automation Panel & Control',
    subtitle: 'Integrating Scanners, Printers & HMIs with Industrial Fieldbuses',
    accentColor: '#06b6d4',
    badgeText: 'Industrial Fieldbus',
    headlineWord: 'AUTOMATION',
    tagline: 'Interprets Higher-Level Software to Execute Automated Movements',
    image: '/assets/images/hardware/atpl_plc_automation.jpg',
    fallbackImage: '/assets/images/hardware/atpl_scanner_presentation_h4.jpg',
    desc: 'Automates industrial processes by integrating barcode scanners, printers, and HMIs with higher-level software applications. Interprets information from software to execute automated movements via industrial fieldbuses, connecting sensors, electric motors, valves, and switches, outfitted with safety devices to ensure reliable machine operation and minimize errors.',
    keyPills: ['Industrial Fieldbus Network', 'Integrate Scanners & Printers', 'Sensors, Motors & Valves', 'Integrated Safety Devices'],
    stats: [
      { label: 'Architecture', val: 'Industrial Fieldbus Network Backbone' },
      { label: 'Integration', val: 'Scanners, Printers & HMIs to ERP' },
      { label: 'Motion Control', val: 'Sensors, Electric Motors & Valves' },
      { label: 'Safety Systems', val: 'Certified Machine Safety Devices' }
    ],
    blueprint: {
      controller: 'Industrial PLC CPU with Real-Time Fieldbus Master',
      connectivity: 'PROFINET, EtherNet/IP, Modbus TCP, Safety I/O',
      protocols: 'OPC UA Server, SCADA Gateway, Warehouse Control System',
      sensors: 'High-speed optical photo eyes, limit switches & encoders',
      roiMetric: 'Zero Conveyor Jam Errors & Millisecond Real-Time Sortation'
    }
  },

  // --- 8. KIOSK SYSTEMS (atplgroup.com/kiosk-system/) ---
  {
    id: 'hw-kiosk-modular',
    num: '22',
    category: 'kiosk',
    categoryName: 'Kiosk Systems',
    oem: 'ATPL Kiosk',
    title: 'ATPL Modular Smart Kiosk System',
    subtitle: 'Built with Touch Computer, Diverse Stands & Peripherals',
    accentColor: '#f97316',
    badgeText: 'Smart Modular Kiosk',
    headlineWord: 'SMART KIOSK',
    tagline: 'Brings Automation in an Easier Way & Improves Daily User Workflows',
    image: '/assets/images/hardware/atpl_kiosk_system.jpg',
    fallbackImage: '/assets/images/hw_fixed_conveyor.jpg',
    desc: 'Smart kiosk system built with industrial touch computers, diverse components, and various types of stands to meet every unique need. Brings automation in an easier way, boosts operational efficiency, and improves daily user workflows with customized models tailored to the data collected and apps run.',
    keyPills: ['Touch Computer Core', 'Diverse Stand Configurations', 'Operational Efficiency', 'Tailored Data & Apps'],
    stats: [
      { label: 'Touch Display', val: 'Integrated Industrial Touch Computer' },
      { label: 'Mounting Styles', val: 'Floor Pedestal, Desktop & Wall Stands' },
      { label: 'Peripherals', val: '2D Scanners, RFID Badges, Printers' },
      { label: 'Workflows', val: 'Visitor, Driver Gate & Shop Job-Cards' }
    ],
    blueprint: {
      controller: 'Embedded Industrial PC with Multi-Peripheral Controller',
      connectivity: 'Internal Gigabit LAN Switch, Wi-Fi 6, 4G LTE Option',
      protocols: 'Web Kiosk Lockdown, ERP REST API, Active Directory',
      sensors: 'Presence detection optical sensor and door tamper switch',
      roiMetric: 'Cuts Driver Gate & Check-in Processing Time by Over 75%'
    }
  },

  // --- 9. VOICE TECHNOLOGY (atplgroup.com/voice-devices-headsets-solutions/) ---
  {
    id: 'hw-voice-headset',
    num: '23',
    category: 'voice',
    categoryName: 'Voice Technology',
    oem: 'ATPL Voice',
    title: 'ATPL Voice Devices & Headset Solutions',
    subtitle: 'Hands-Free & Eyes-Free Multilingual Directed Workflows',
    accentColor: '#ec4899',
    badgeText: 'Hands-Free Eyes-Free',
    headlineWord: 'VOICE TECH',
    tagline: 'Move Workers Safely & Efficiently with Voice-Guided Workflows',
    image: '/assets/images/hardware/atpl_voice_headset.png',
    fallbackImage: '/assets/images/hardware/atpl_scanner_ring_h5.jpg',
    desc: 'Optimizes workflow and accuracy in demanding distribution center and warehouse operations with Voice technology. Directs associates working both hands-free and eyes-free through mobile workflows to minimize steps and maximize efficiency. Voice devices, headsets, accessories, and software enable workers to speak in their native languages to pick and pack safely and accurately.',
    keyPills: ['Hands-Free & Eyes-Free', 'Native Language Support', 'Distribution Center Accuracy', 'Voice-Guided Workflows'],
    stats: [
      { label: 'Workflow Style', val: 'Hands-Free & Eyes-Free Directed Pick' },
      { label: 'Language Support', val: 'Workers Speak in Their Native Languages' },
      { label: 'Noise Cancellation', val: 'Industrial Ambient Noise Suppression' },
      { label: 'Hardware Ecosystem', val: 'Voice Devices, Headsets & Software' }
    ],
    blueprint: {
      controller: 'Dedicated Speech Recognition Neural Audio Processor',
      connectivity: 'Ultra-Reliable Bluetooth BLE + Instant NFC Pairing',
      protocols: 'Vocollect Voice, Android Voice API, SAP EWM Direct Link',
      sensors: 'Directional noise-canceling dual-microphone array',
      roiMetric: 'Eliminates Mis-Picks and Boosts Warehouse Pick Speed by 35%'
    }
  },
  {
    id: 'hw-voice-wearable-ring',
    num: '24',
    category: 'voice',
    categoryName: 'Voice Technology',
    oem: 'ATPL Solutions',
    title: 'ATPL Hands-Free Wearable Ring Scanner',
    subtitle: 'Compact Ergonomic Scanner Supporting High-Frequency Workflows',
    accentColor: '#d946ef',
    badgeText: 'Zero Wasted Motion',
    headlineWord: 'RING SCAN',
    tagline: 'Compact, High-Performance Wearable Scanner for Manpower Efficiency',
    image: '/assets/images/hardware/atpl_scanner_ring_h5.jpg',
    fallbackImage: '/assets/images/hardware/atpl_voice_headset.png',
    desc: 'Compact, high-performance, hands-free wearable scanner designed to boost business improvement and manpower efficiency. Completely eliminates wasted motion associated with scanners in hand, delivering ergonomic scanning that supports high-frequency workflows in dispatch, warehouse picking, and sortation.',
    keyPills: ['Hands-Free Wearable', 'Eliminates Wasted Motion', 'High-Frequency Workflows', 'Manpower Efficiency'],
    stats: [
      { label: 'Ergonomics', val: 'Compact, Lightweight Finger Ring Mount' },
      { label: 'Operation', val: 'Dual-Side Ambidextrous Trigger' },
      { label: 'Battery Life', val: 'Continuous Shift-Long Run Time' },
      { label: 'Pairing', val: 'Bluetooth Instant Tap to Wearable Terminal' }
    ],
    blueprint: {
      controller: 'Miniaturized 1D/2D High-Speed Scan Engine',
      connectivity: 'Bluetooth Low Energy 5.0 with 30m Roaming Radius',
      protocols: 'SPP, HID, Direct Mobile Computer Data Wedge',
      sensors: 'Haptic vibration feedback, LED indicator, audible beeper',
      roiMetric: 'Saves 4+ Seconds on Every Single Warehouse Pick Action'
    }
  }
];

// Official URL Mapping for Hardware Categories
const OFFICIAL_CATEGORY_URLS = {
  scanners: 'https://atplgroup.com/barcode-scanner-solutions/',
  printers: 'https://atplgroup.com/barcode-printer-solutions/',
  mobility: 'https://atplgroup.com/mobility-tablet-solutions/',
  rfid: 'https://atplgroup.com/rfid-card-tags-antenna-and-readers/',
  marking: 'https://atplgroup.com/direct-marking-solutions/',
  touch: 'https://atplgroup.com/industrial-touch-system/',
  plc: 'https://atplgroup.com/plc-automation/',
  kiosk: 'https://atplgroup.com/kiosk-system/',
  voice: 'https://atplgroup.com/voice-devices-headsets-solutions/'
};

// ============================================================================
// MAIN CINEMATIC 3D HARDWARE CARD DECK COMPONENT
// ============================================================================
export const Cinematic3DCardDeck = ({ activeCategory = 'all', onCategoryChange }) => {
  const { openDemoModal } = useApp();
  const [internalCategory, setInternalCategory] = useState(activeCategory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [viewMode, setViewMode] = useState('deck'); // 'deck' or 'grid'
  const [selectedProductModal, setSelectedProductModal] = useState(null); // Full description popup modal
  
  // 360 Degree Device Interactive Turntable State
  const [deviceRotation, setDeviceRotation] = useState(0); // 0 to 360 degrees
  const [isAutoRotating, setIsAutoRotating] = useState(false); // 360 auto turntable spin
  const [isDraggingDevice, setIsDraggingDevice] = useState(false);
  const dragStartRef = useRef({ x: 0, rot: 0 });

  // Dynamic cursor physics state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringActive, setIsHoveringActive] = useState(false);

  // Sync internal category with parent prop if provided
  useEffect(() => {
    if (activeCategory) {
      setInternalCategory(activeCategory);
      setActiveIndex(0);
    }
  }, [activeCategory]);

  // Reset device rotation when card changes
  useEffect(() => {
    setDeviceRotation(0);
    setIsAutoRotating(false);
  }, [activeIndex]);

  // 360 degree turntable auto-spin animation loop
  useEffect(() => {
    if (!isAutoRotating) return;
    let animId;
    const spin = () => {
      setDeviceRotation(prev => (prev + 0.85) % 360);
      animId = requestAnimationFrame(spin);
    };
    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating]);

  // Global mouse/touch drag handlers for 360 degree device rotation
  useEffect(() => {
    if (!isDraggingDevice) return;

    const handleGlobalMouseMove = (e) => {
      const deltaX = (e.clientX - dragStartRef.current.x) * 1.15;
      const newRot = (dragStartRef.current.rot + deltaX) % 360;
      setDeviceRotation(newRot < 0 ? newRot + 360 : newRot);
    };

    const handleGlobalTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaX = (e.touches[0].clientX - dragStartRef.current.x) * 1.15;
        const newRot = (dragStartRef.current.rot + deltaX) % 360;
        setDeviceRotation(newRot < 0 ? newRot + 360 : newRot);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingDevice(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDraggingDevice]);

  const handleDeviceMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingDevice(true);
    setIsAutoRotating(false);
    dragStartRef.current = {
      x: e.clientX,
      rot: deviceRotation
    };
  };

  const handleDeviceTouchStart = (e) => {
    e.stopPropagation();
    if (e.touches.length > 0) {
      setIsDraggingDevice(true);
      setIsAutoRotating(false);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        rot: deviceRotation
      };
    }
  };

  const handleDeviceWheel = (e) => {
    e.stopPropagation();
    setIsAutoRotating(false);
    const delta = e.deltaY > 0 ? 8 : -8;
    setDeviceRotation(prev => {
      const next = (prev + delta) % 360;
      return next < 0 ? next + 360 : next;
    });
  };

  const currentCategory = onCategoryChange ? activeCategory : internalCategory;

  const handleCategorySelect = (catId) => {
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      setInternalCategory(catId);
    }
    setActiveIndex(0);
    setIsInspecting(true);
    setIsFlipped(false);
    sfx.playLift();
  };

  // Filtered hardware cards based on active category
  const filteredCards = useMemo(() => {
    if (currentCategory === 'all') return HARDWARE_DECK_CARDS;
    return HARDWARE_DECK_CARDS.filter(c => c.category === currentCategory);
  }, [currentCategory]);

  // Keep active index in bounds
  const currentCard = filteredCards[activeIndex] || filteredCards[0] || HARDWARE_DECK_CARDS[0];

  // Stage container reference for cursor physics & particle canvas
  const stageRef = useRef(null);
  const activeCardRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  // Sync sound muted state
  useEffect(() => {
    sfx.muted = !soundEnabled;
  }, [soundEnabled]);

  // --------------------------------------------------------------------------
  // HTML5 2D CANVAS PARTICLE ENGINE (Celestial Starlight & Sparkle Bursts)
  // --------------------------------------------------------------------------
  const triggerParticleBurst = useCallback((clientX, clientY, color = '#00f0ff') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const originX = clientX ? clientX - rect.left : canvas.width / 2;
    const originY = clientY ? clientY - rect.top : canvas.height / 2;

    const count = 35;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.5;
      const size = 1.2 + Math.random() * 3.2;
      const palette = [color, '#ffffff', '#fbbf24', '#38bdf8'];
      const pColor = palette[Math.floor(Math.random() * palette.length)];

      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size,
        color: pColor,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        gravity: 0.08,
        twinkle: Math.random() * Math.PI
      });
    }

    if (soundEnabled) {
      sfx.playSparkle();
    }
  }, [soundEnabled]);

  // Canvas render loop: ambient stars + interactive sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate ambient celestial starlight nodes
    const ambientStars = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 2,
      baseAlpha: 0.2 + Math.random() * 0.5,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient celestial stars
      ambientStars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw active burst sparks
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // CURSOR PHYSICS & PARALLAX TRACKING
  // --------------------------------------------------------------------------
  const handleMouseMove = (e) => {
    if (!activeCardRef.current || viewMode !== 'deck') return;
    const rect = activeCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMousePos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY))
    });
  };

  const handleCardClick = (idx, e) => {
    if (viewMode === 'grid') {
      setViewMode('deck');
    }
    setActiveIndex(idx);
    setIsInspecting(true);
    setIsFlipped(false);
    sfx.playLift();
    triggerParticleBurst(e?.clientX, e?.clientY, filteredCards[idx]?.accentColor);
  };

  const handleCloseInspect = () => {
    setIsInspecting(false);
    setIsFlipped(false);
    setSelectedProductModal(null);
    sfx.playDock();
  };

  const handleToggleFlip = (e) => {
    e?.stopPropagation();
    setIsFlipped(prev => !prev);
    sfx.playFlip();
    triggerParticleBurst(e?.clientX, e?.clientY, currentCard?.accentColor);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex(prev => {
      const nextIdx = (prev === 0 ? filteredCards.length - 1 : prev - 1);
      if (selectedProductModal) setSelectedProductModal(filteredCards[nextIdx]);
      return nextIdx;
    });
    setIsFlipped(false);
    sfx.playLift();
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex(prev => {
      const nextIdx = (prev === filteredCards.length - 1 ? 0 : prev + 1);
      if (selectedProductModal) setSelectedProductModal(filteredCards[nextIdx]);
      return nextIdx;
    });
    setIsFlipped(false);
    sfx.playLift();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedProductModal) {
          setSelectedProductModal(null);
        } else if (isInspecting) {
          handleCloseInspect();
        }
      }
      if (viewMode !== 'deck') return;
      if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => {
          const nextIdx = (prev === 0 ? filteredCards.length - 1 : prev - 1);
          if (selectedProductModal) setSelectedProductModal(filteredCards[nextIdx]);
          return nextIdx;
        });
        setIsFlipped(false);
        sfx.playLift();
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(prev => {
          const nextIdx = (prev === filteredCards.length - 1 ? 0 : prev + 1);
          if (selectedProductModal) setSelectedProductModal(filteredCards[nextIdx]);
          return nextIdx;
        });
        setIsFlipped(false);
        sfx.playLift();
      } else if (e.key === ' ' && isInspecting) {
        e.preventDefault();
        handleToggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards, isInspecting, viewMode, selectedProductModal]);

  // Dynamic calculated tilt values
  const tiltX = isHoveringActive ? -mousePos.y * 13 : 0;
  const tiltY = isHoveringActive ? mousePos.x * 13 : 0;
  const sheenX = ((mousePos.x + 1) / 2) * 100;
  const sheenY = ((mousePos.y + 1) / 2) * 100;

  return (
    <section 
      id="hardware-3d-deck"
      aria-label="ATPL 3D Hardware Ecosystem Showcase"
      ref={stageRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        backgroundColor: '#030712',
        color: '#ffffff',
        padding: '4.5rem 0 5rem 0',
        overflow: 'hidden',
        minHeight: viewMode === 'deck' ? '820px' : 'auto',
        borderRadius: '24px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
        margin: '2rem 0 3.5rem 0'
      }}
    >
      {/* Background Radial Glow Meshes */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '650px',
        height: '450px',
        background: `radial-gradient(circle at center, ${currentCard.accentColor}22 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.6s ease'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '550px',
        height: '400px',
        background: 'radial-gradient(circle at center, rgba(0, 113, 186, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* HTML5 Celestial Starlight & Sparkle Bursts Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Oversized Cinematic Background Headline (Deck View Only) */}
      {viewMode === 'deck' && (
        <div 
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <span style={{
            display: 'block',
            fontSize: 'clamp(4.5rem, 14vw, 15rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: isInspecting ? `1.5px ${currentCard.accentColor}33` : '1.5px rgba(255, 255, 255, 0.05)',
            opacity: isInspecting ? 0.35 : 0.12,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {currentCard.headlineWord}
          </span>
        </div>
      )}

      {/* Main Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1rem, 2vw, 2.5rem)' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 2.5rem auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: currentCard.accentColor,
              backgroundColor: `${currentCard.accentColor}18`,
              border: `1px solid ${currentCard.accentColor}44`,
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.4s ease'
            }}>
              <Sparkles size={13} />
              <span>AUTHENTIC ATPL HARDWARE SHOWCASE</span>
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '0.75rem'
          }}>
            Tactile Shopfloor <span style={{ 
              background: `linear-gradient(135deg, #ffffff 0%, ${currentCard.accentColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.4s ease'
            }}>Hardware Deck</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
            color: '#94a3b8',
            lineHeight: 1.6,
            margin: '0 auto 1.5rem auto',
            maxWidth: '680px'
          }}>
            Click any authentic hardware unit to physically lift it from the cascading horizon into 3D inspection. Move your cursor to tilt with organic physics or flip to inspect real-time technical schematics.
          </p>

          {/* Category Filter Pills & Mode Switcher */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.55rem'
          }}>
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'scanners', label: 'Scanning' },
              { id: 'rfid', label: 'RFID Portals' },
              { id: 'printers', label: 'Printers' },
              { id: 'marking', label: 'DPM Marking' },
              { id: 'mobility', label: 'Mobility' },
              { id: 'plc', label: 'Machine Vision' },
              { id: 'touch', label: 'Touch Systems' },
              { id: 'kiosk', label: 'Kiosks' },
              { id: 'voice', label: 'Wearable Voice' }
            ].map(cat => {
              const active = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{
                    backgroundColor: active ? '#0071ba' : 'rgba(255, 255, 255, 0.05)',
                    color: active ? '#ffffff' : '#94a3b8',
                    border: active ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 0 15px rgba(0, 240, 255, 0.35)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* View Mode Toggle (3D Deck Horizon vs Expanded Grid) */}
            <button
              onClick={() => {
                setViewMode(prev => (prev === 'deck' ? 'grid' : 'deck'));
                setIsInspecting(false);
                setIsFlipped(false);
                sfx.playLift();
              }}
              title="Toggle between 3D Cascading Deck Horizon and Full Expanded Grid"
              style={{
                backgroundColor: viewMode === 'grid' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
                color: viewMode === 'grid' ? '#00f0ff' : '#ffffff',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              {viewMode === 'deck' ? <LayoutGrid size={13} /> : <Layers size={13} />}
              <span>{viewMode === 'deck' ? 'Grid View' : '3D Deck'}</span>
            </button>

            {/* Sound FX Toggle Pill */}
            <button
              onClick={() => {
                setSoundEnabled(prev => !prev);
                sfx.init();
              }}
              title={soundEnabled ? 'Disable audio sound effects' : 'Enable futuristic audio sound effects'}
              style={{
                backgroundColor: soundEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                color: soundEnabled ? '#00f0ff' : '#64748b',
                border: soundEnabled ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.4rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{soundEnabled ? 'FX On' : 'FX Muted'}</span>
            </button>
          </div>

        </div>

        {/* =====================================================================
            VIEW MODE A: 3D CASCADING DECK STAGE (Mathematics & Continuity)
           ===================================================================== */}
        {viewMode === 'deck' && (
          <div 
            style={{
              position: 'relative',
              height: isInspecting ? '630px' : '550px',
              width: '100%',
              perspective: '1350px',
              perspectiveOrigin: '50% 50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'height 0.4s ease'
            }}
          >
            {filteredCards.map((card, idx) => {
              const isSelected = idx === activeIndex;
              const diff = idx - activeIndex;
              const absDiff = Math.abs(diff);

              let translateX = diff * 125;
              let translateY = absDiff * 16 + diff * 3;
              let translateZ = -absDiff * 55;
              let rotateY = diff * -11;
              let rotateZ = diff * 2.8;
              let scale = 1 - Math.min(absDiff * 0.08, 0.35);
              let zIndex = 100 - absDiff * 10;
              let opacity = Math.max(0.35, 1 - absDiff * 0.22);
              let filter = 'none';

              if (isInspecting) {
                if (isSelected) {
                  translateX = 0;
                  translateY = -15;
                  translateZ = 240;
                  rotateY = isFlipped ? 180 + tiltY : tiltY;
                  rotateZ = 0;
                  scale = 1.15;
                  zIndex = 500;
                  opacity = 1;
                } else {
                  translateZ = -220;
                  opacity = 0.12;
                  filter = 'blur(6px)';
                  scale = 0.85;
                }
              }

              return (
                <div
                  key={card.id}
                  ref={isSelected ? activeCardRef : null}
                  onClick={(e) => handleCardClick(idx, e)}
                  onMouseEnter={() => {
                    if (isSelected) setIsHoveringActive(true);
                  }}
                  onMouseLeave={() => {
                    if (isSelected) {
                      setIsHoveringActive(false);
                      setMousePos({ x: 0, y: 0 });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: 'min(360px, 86vw)',
                    height: '490px',
                    borderRadius: '24px',
                    cursor: isInspecting && isSelected ? 'default' : 'pointer',
                    transformStyle: 'preserve-3d',
                    transform: `
                      translate3d(${translateX}px, ${translateY}px, ${translateZ}px)
                      rotateX(${isSelected && isInspecting ? tiltX : 0}deg)
                      rotateY(${rotateY}deg)
                      rotateZ(${rotateZ}deg)
                      scale(${scale})
                    `,
                    zIndex,
                    opacity,
                    filter,
                    transition: isHoveringActive && isSelected && isInspecting
                      ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
                      : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, filter 0.4s ease',
                    userSelect: 'none'
                  }}
                >
                  {/* CARD FRONT FACE */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(10, 18, 32, 0.94)',
                    backdropFilter: 'blur(20px)',
                    border: isSelected 
                      ? `1.5px solid ${card.accentColor}` 
                      : '1.5px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: isSelected
                      ? `0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px ${card.accentColor}33`
                      : '0 15px 35px rgba(0, 0, 0, 0.65)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem'
                  }}>

                    {/* Specular Holographic Cursor Sheen */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.16) 0%, transparent 65%)`,
                        pointerEvents: 'none',
                        zIndex: 30,
                        mixBlendMode: 'screen'
                      }} />
                    )}

                    {/* Metallic Cyber Corner Accents */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: `2px solid ${card.accentColor}`, borderLeft: `2px solid ${card.accentColor}`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: `2px solid ${card.accentColor}`, borderRight: `2px solid ${card.accentColor}`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: `2px solid ${card.accentColor}`, borderLeft: `2px solid ${card.accentColor}`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: `2px solid ${card.accentColor}`, borderRight: `2px solid ${card.accentColor}`, pointerEvents: 'none' }} />

                    {/* Card Header Strip */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transform: 'translateZ(25px)',
                      marginBottom: '0.85rem'
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: card.accentColor,
                        letterSpacing: '0.1em'
                      }}>
                        ATPL // {card.num}
                      </span>

                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        backgroundColor: `${card.accentColor}18`,
                        color: card.accentColor,
                        border: `1px solid ${card.accentColor}44`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Activity size={11} />
                        <span>{card.badgeText}</span>
                      </span>
                    </div>

                    {/* 3D Hardware Visual Stage (Interactive 360° Rotating Turntable) */}
                    <div 
                      onMouseDown={isSelected ? handleDeviceMouseDown : undefined}
                      onTouchStart={isSelected ? handleDeviceTouchStart : undefined}
                      onWheel={isSelected ? handleDeviceWheel : undefined}
                      onClick={(e) => {
                        if (isSelected) {
                          e.stopPropagation();
                        }
                      }}
                      title={isSelected ? "Click and drag horizontally or scroll wheel to rotate this device in 360 degrees" : undefined}
                      style={{
                        position: 'relative',
                        height: '185px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(5, 11, 20, 0.75)',
                        border: isSelected ? `1.5px solid ${card.accentColor}55` : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        transform: 'translateZ(45px)',
                        marginBottom: '1rem',
                        boxShadow: isSelected 
                          ? `inset 0 0 25px rgba(0, 0, 0, 0.8), 0 0 25px ${card.accentColor}22`
                          : 'inset 0 0 25px rgba(0, 0, 0, 0.8)',
                        cursor: isSelected ? (isDraggingDevice ? 'grabbing' : 'grab') : 'pointer',
                        perspective: '1000px',
                        transformStyle: 'preserve-3d',
                        userSelect: 'none'
                      }}
                    >
                      {/* Ambient Glow */}
                      <div style={{
                        position: 'absolute',
                        width: '180px',
                        height: '180px',
                        background: `radial-gradient(circle, ${card.accentColor}33 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                        pointerEvents: 'none'
                      }} />

                      {/* 360° Holographic Turntable Pedestal Base */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '50%',
                            transform: `translateX(-50%) rotateX(72deg) rotateZ(${deviceRotation}deg)`,
                            width: '180px',
                            height: '75px',
                            borderRadius: '50%',
                            border: `1.5px dashed ${card.accentColor}99`,
                            background: `radial-gradient(ellipse at center, ${card.accentColor}44 0%, transparent 70%)`,
                            boxShadow: `0 0 25px ${card.accentColor}44`,
                            pointerEvents: 'none',
                            zIndex: 1,
                            transition: isDraggingDevice ? 'none' : 'transform 0.08s linear'
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            inset: '6px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.25)'
                          }} />
                        </div>
                      )}

                      {/* 360° Rotating Device Image */}
                      <img 
                        src={card.image}
                        alt={card.title}
                        draggable={false}
                        style={{
                          maxHeight: '140px',
                          maxWidth: '88%',
                          objectFit: card.image.endsWith('.png') ? 'contain' : 'cover',
                          borderRadius: '10px',
                          position: 'relative',
                          zIndex: 2,
                          padding: card.image.endsWith('.png') ? '0.4rem' : '0',
                          transform: isSelected 
                            ? `rotateY(${deviceRotation}deg) rotateX(${Math.sin((deviceRotation * Math.PI) / 180) * 8}deg) scale(${1 + Math.cos((deviceRotation * Math.PI) / 180) * 0.04})` 
                            : 'none',
                          transition: isDraggingDevice ? 'none' : 'transform 0.08s linear',
                          filter: isSelected
                            ? `drop-shadow(${Math.sin((deviceRotation * Math.PI) / 180) * 16}px 14px 22px rgba(0, 0, 0, 0.9))`
                            : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.8))',
                          pointerEvents: 'none'
                        }}
                        onError={(e) => {
                          if (e.currentTarget.src !== card.fallbackImage) {
                            e.currentTarget.src = card.fallbackImage;
                          } else {
                            e.currentTarget.src = '/assets/images/hardware/blueprint_scanner.svg';
                          }
                        }}
                      />

                      {/* Top-Left: 360° Auto-Spin Toggle Button */}
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAutoRotating(prev => !prev);
                            sfx.playLift();
                          }}
                          title={isAutoRotating ? 'Pause 360° Auto-Spin' : 'Start 360° Auto-Spin'}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            backgroundColor: isAutoRotating ? `${card.accentColor}33` : 'rgba(15, 23, 42, 0.85)',
                            border: `1px solid ${isAutoRotating ? card.accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                            color: isAutoRotating ? card.accentColor : '#cbd5e1',
                            borderRadius: '8px',
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            zIndex: 6,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <RotateCw size={11} style={{ transform: isAutoRotating ? `rotate(${deviceRotation * 2}deg)` : 'none' }} />
                          <span>{isAutoRotating ? 'Spinning 360°' : '360° Spin'}</span>
                        </button>
                      )}

                      {/* Top-Right: 360° Angle Display */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(5, 11, 20, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: card.accentColor,
                            borderRadius: '8px',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            pointerEvents: 'none',
                            zIndex: 6
                          }}
                        >
                          {Math.round(((deviceRotation % 360) + 360) % 360)}°
                        </div>
                      )}

                      {/* Bottom-Left: Quick Angle Presets */}
                      {isSelected && (
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            display: 'flex',
                            gap: '4px',
                            zIndex: 6
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {[0, 90, 180, 270].map(angle => (
                            <button
                              key={angle}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeviceRotation(angle);
                                setIsAutoRotating(false);
                                sfx.playLift();
                              }}
                              title={`Rotate device to ${angle} degrees`}
                              style={{
                                backgroundColor: Math.round(((deviceRotation % 360) + 360) % 360) === angle ? card.accentColor : 'rgba(15, 23, 42, 0.85)',
                                color: Math.round(((deviceRotation % 360) + 360) % 360) === angle ? '#030712' : '#94a3b8',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '5px',
                                padding: '0.15rem 0.35rem',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              {angle}°
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Center Bottom: Drag Hint */}
                      {isSelected && !isDraggingDevice && !isAutoRotating && (
                        <div style={{
                          position: 'absolute',
                          bottom: '30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '999px',
                          padding: '0.15rem 0.55rem',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          color: '#94a3b8',
                          pointerEvents: 'none',
                          whiteSpace: 'nowrap',
                          zIndex: 6
                        }}>
                          ↔ Drag device to rotate 360°
                        </div>
                      )}

                      {/* Flip Blueprint Button on Image */}
                      {isSelected && isInspecting && (
                        <button
                          onClick={handleToggleFlip}
                          title="Flip card to inspect technical architecture"
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(15, 23, 42, 0.88)',
                            border: `1px solid ${card.accentColor}`,
                            color: '#ffffff',
                            borderRadius: '8px',
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            zIndex: 6,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          <RotateCw size={12} color={card.accentColor} />
                          <span>Flip Blueprint</span>
                        </button>
                      )}
                    </div>

                    {/* Card Typography & Details */}
                    <div style={{
                      transform: 'translateZ(30px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      flex: 1
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#94a3b8',
                        letterSpacing: '0.06em'
                      }}>
                        <span>{card.categoryName}</span>
                        <span style={{ color: card.accentColor }}>{card.oem}</span>
                      </div>

                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.2
                      }}>
                        {card.title}
                      </h3>

                      <p style={{
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        lineHeight: 1.45,
                        margin: '0.2rem 0 0.6rem 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {card.desc}
                      </p>

                      {/* Quick Specs Pills */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        marginTop: 'auto'
                      }}>
                        {card.keyPills.slice(0, 3).map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              color: '#e2e8f0'
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Action Prompt */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.75rem',
                        paddingTop: '0.65rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(idx);
                            setIsInspecting(true);
                            setSelectedProductModal(card);
                            sfx.playLift();
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: card.accentColor,
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            padding: 0,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <span>Full Description & Specs</span>
                          <ArrowRight size={13} />
                        </button>

                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                          #{card.id.replace('hw-', '')}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* CARD BACK FACE: SCHEMATICS & ERP TELEMETRY */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(8, 14, 26, 0.96)',
                    backdropFilter: 'blur(20px)',
                    border: `1.5px solid ${card.accentColor}`,
                    boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px ${card.accentColor}44`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    transformStyle: 'preserve-3d',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem',
                    color: '#ffffff'
                  }}>

                    {/* Blueprint Grid Watermark */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      pointerEvents: 'none',
                      opacity: 0.5
                    }} />

                    {/* Back Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <Cpu size={16} color={card.accentColor} />
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          color: card.accentColor,
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.08em'
                        }}>
                          TECH ARCHITECTURE
                        </span>
                      </div>

                      <button
                        onClick={handleToggleFlip}
                        title="Flip back to front face"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <RotateCw size={11} />
                        <span>Flip</span>
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.65rem',
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {card.stats.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '10px',
                            padding: '0.55rem 0.65rem'
                          }}
                        >
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {st.label}
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: card.accentColor, marginTop: '2px' }}>
                            {st.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Blueprint Specifications */}
                    <div style={{
                      backgroundColor: 'rgba(5, 10, 18, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      fontSize: '0.74rem',
                      lineHeight: 1.5,
                      color: '#cbd5e1',
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}>
                      <div>
                        <strong style={{ color: '#ffffff' }}>Controller / Engine: </strong>
                        <span>{card.blueprint.controller}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#ffffff' }}>Interfaces: </strong>
                        <span>{card.blueprint.connectivity}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#ffffff' }}>Protocols & ERP: </strong>
                        <span>{card.blueprint.protocols}</span>
                      </div>
                      <div style={{ color: card.accentColor, fontWeight: 700, marginTop: '0.2rem' }}>
                        ⚡ ROI Metric: {card.blueprint.roiMetric}
                      </div>
                    </div>

                    {/* Direct Demo Booking Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDemoModal({
                          solution: `${card.title} (${card.oem})`,
                          notes: `Inquiry initiated from 3D Hardware Deck (${card.title})`
                        });
                      }}
                      style={{
                        marginTop: 'auto',
                        backgroundColor: '#0071ba',
                        color: '#ffffff',
                        border: `1px solid ${card.accentColor}`,
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: `0 4px 20px ${card.accentColor}33`,
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <span>Request Evaluation Unit / Quote</span>
                      <ArrowRight size={14} />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            VIEW MODE B: EXPANDED GRID VIEW (If User Wants All at a Glance)
           ===================================================================== */}
        {viewMode === 'grid' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
          }}>
            {filteredCards.map((card, idx) => (
              <div
                key={card.id}
                style={{
                  backgroundColor: 'rgba(11, 21, 40, 0.88)',
                  border: `1px solid rgba(255, 255, 255, 0.1)`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = card.accentColor;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 15px 35px ${card.accentColor}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden', backgroundColor: '#070f1e' }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: card.image.endsWith('.png') ? 'contain' : 'cover',
                      padding: card.image.endsWith('.png') ? '0.75rem' : '0'
                    }}
                    onError={(e) => {
                      if (e.currentTarget.src !== card.fallbackImage) {
                        e.currentTarget.src = card.fallbackImage;
                      } else {
                        e.currentTarget.src = '/assets/images/hardware/blueprint_scanner.svg';
                      }
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(5, 11, 22, 0.85)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: card.accentColor
                  }}>
                    {card.oem}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: `${card.accentColor}25`,
                    border: `1px solid ${card.accentColor}`,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#ffffff'
                  }}>
                    {card.badgeText}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {card.categoryName}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                    {card.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {card.keyPills.map((p, pi) => (
                      <span key={pi} style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#cbd5e1' }}>
                        {p}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveIndex(idx);
                      setSelectedProductModal(card);
                      sfx.playLift();
                    }}
                    style={{
                      marginTop: 'auto',
                      backgroundColor: 'rgba(0, 113, 186, 0.25)',
                      border: `1px solid ${card.accentColor}`,
                      color: '#ffffff',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    <span>View Official Description & Specs</span>
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TACTILE HUD CONTROLS & DOCK NAVIGATION (Deck View Only) */}
        {viewMode === 'deck' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
            maxWidth: '750px',
            margin: '2rem auto 0 auto',
            padding: '0.85rem 1.5rem',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
          }}>

            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              title="Previous Hardware Unit (Left Arrow)"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Center Card Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', overflowX: 'auto', maxWidth: '380px', padding: '4px' }}>
              {filteredCards.map((c, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={c.id}
                    onClick={(e) => handleCardClick(i, e)}
                    title={`Select ${c.title}`}
                    style={{
                      width: active ? '26px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      backgroundColor: active ? currentCard.accentColor : 'rgba(255, 255, 255, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      boxShadow: active ? `0 0 10px ${currentCard.accentColor}` : 'none'
                    }}
                  />
                );
              })}
            </div>

            {/* Right Action: Close Inspect or Next Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {isInspecting && (
                <button
                  onClick={handleCloseInspect}
                  title="Dock card back into cascading deck (ESC)"
                  style={{
                    backgroundColor: 'rgba(232, 88, 116, 0.15)',
                    border: '1px solid rgba(232, 88, 116, 0.4)',
                    color: '#ff758f',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <X size={13} />
                  <span>Dock Deck</span>
                </button>
              )}

              <button
                onClick={handleNext}
                title="Next Hardware Unit (Right Arrow)"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        )}

        {/* Keyboard Hints helper */}
        {viewMode === 'deck' && (
          <div style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: '#64748b',
            marginTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <span>Hotkeys:</span>
            <span><kbd style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>← / →</kbd> Browse</span>
            <span><kbd style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>Space</kbd> Flip</span>
            <span><kbd style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>Esc</kbd> Return to Deck</span>
          </div>
        )}

        {/* =====================================================================
            ACTIVE PRODUCT OFFICIAL SPECIFICATION & DESCRIPTION DOSSIER
            (Synchronized with selected card with official text from atplgroup.com)
           ===================================================================== */}
        {currentCard && (
          <div
            style={{
              marginTop: '2.5rem',
              backgroundColor: 'rgba(9, 18, 36, 0.88)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${currentCard.accentColor}55`,
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${currentCard.accentColor}18`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Background Accent */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, ${currentCard.accentColor}18 0%, transparent 70%)`,
              pointerEvents: 'none',
              filter: 'blur(30px)'
            }} />

            {/* Dossier Header */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              zIndex: 2
            }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem', marginBottom: '0.4rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: currentCard.accentColor,
                    backgroundColor: `${currentCard.accentColor}18`,
                    border: `1px solid ${currentCard.accentColor}44`,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Activity size={11} />
                    <span>{currentCard.categoryName}</span>
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px'
                  }}>
                    OEM: {currentCard.oem}
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <ShieldCheck size={12} />
                    <span>Official Content from atplgroup.com</span>
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  {currentCard.title}
                </h3>
                <div style={{ fontSize: '0.88rem', color: currentCard.accentColor, fontWeight: 700, marginTop: '0.25rem' }}>
                  {currentCard.subtitle}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  onClick={() => setSelectedProductModal(currentCard)}
                  style={{
                    backgroundColor: `${currentCard.accentColor}20`,
                    border: `1px solid ${currentCard.accentColor}`,
                    color: '#ffffff',
                    padding: '0.55rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Maximize2 size={13} />
                  <span>Spotlight View</span>
                </button>

                <a
                  href={currentCard.officialUrl || OFFICIAL_CATEGORY_URLS[currentCard.category] || 'https://atplgroup.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    padding: '0.55rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = currentCard.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <span>atplgroup.com</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Dossier Body: 2 Columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem',
              alignItems: 'start',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Column 1: Official Description & Core Highlights */}
              <div>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  letterSpacing: '0.08em',
                  marginBottom: '0.45rem'
                }}>
                  Official Solution Overview
                </div>
                <p style={{
                  fontSize: '0.94rem',
                  color: '#e2e8f0',
                  lineHeight: 1.75,
                  margin: '0 0 1.25rem 0'
                }}>
                  {currentCard.desc}
                </p>

                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: currentCard.accentColor,
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem'
                }}>
                  Key Hardware Capabilities
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {currentCard.keyPills.map((pill, pi) => (
                    <span
                      key={pi}
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f8fafc',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <CheckCircle2 size={13} color={currentCard.accentColor} />
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 2: Technical Specifications & ERP Blueprint */}
              <div>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  letterSpacing: '0.08em',
                  marginBottom: '0.45rem'
                }}>
                  Technical Specifications
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.65rem',
                  marginBottom: '1rem'
                }}>
                  {currentCard.stats.map((st, si) => (
                    <div
                      key={si}
                      style={{
                        backgroundColor: 'rgba(4, 9, 18, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '0.65rem 0.8rem'
                      }}
                    >
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {st.label}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: currentCard.accentColor, marginTop: '2px' }}>
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  backgroundColor: 'rgba(5, 11, 22, 0.85)',
                  border: `1px solid rgba(255, 255, 255, 0.08)`,
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.76rem',
                  lineHeight: 1.55,
                  color: '#cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}>
                  <div>
                    <strong style={{ color: '#ffffff' }}>Controller: </strong>
                    <span>{currentCard.blueprint.controller}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>Interfaces: </strong>
                    <span>{currentCard.blueprint.connectivity}</span>
                  </div>
                  <div style={{ color: currentCard.accentColor, fontWeight: 700, marginTop: '0.2rem' }}>
                    ⚡ Expected ROI: {currentCard.blueprint.roiMetric}
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={() => {
                      openDemoModal({
                        solution: `${currentCard.title} (${currentCard.oem})`,
                        notes: `Inquiry initiated from ATPL Official Hardware Showcase: ${currentCard.title}`
                      });
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#0071ba',
                      color: '#ffffff',
                      border: `1px solid ${currentCard.accentColor}`,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: `0 4px 20px ${currentCard.accentColor}33`
                    }}
                  >
                    <span>Request Evaluation Unit & Quotation</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PRODUCT DESCRIPTION & TECHNICAL SPECIFICATIONS MODAL OVERLAY
            (Triggered on single click on any product card)
           ===================================================================== */}
        {selectedProductModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(3, 7, 18, 0.88)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              animation: 'fadeIn 0.2s ease'
            }}
            onClick={() => setSelectedProductModal(null)}
          >
            <div
              style={{
                backgroundColor: 'rgba(10, 20, 38, 0.96)',
                border: `1.5px solid ${selectedProductModal.accentColor}88`,
                boxShadow: `0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px ${selectedProductModal.accentColor}33`,
                borderRadius: '24px',
                maxWidth: '920px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                position: 'relative',
                color: '#ffffff'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProductModal(null)}
                title="Close Description (Esc)"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  backgroundColor: `${selectedProductModal.accentColor}20`,
                  color: selectedProductModal.accentColor,
                  border: `1px solid ${selectedProductModal.accentColor}55`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Sparkles size={12} />
                  <span>{selectedProductModal.categoryName}</span>
                </span>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#94a3b8',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  OEM: {selectedProductModal.oem}
                </span>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <ShieldCheck size={13} />
                  <span>Official atplgroup.com Content</span>
                </span>
              </div>

              {/* Modal Body: 2 Columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
              }}>
                {/* Visual Stage */}
                <div>
                  {/* 360° Interactive Visual Stage */}
                  <div 
                    onMouseDown={handleDeviceMouseDown}
                    onTouchStart={handleDeviceTouchStart}
                    onWheel={handleDeviceWheel}
                    onClick={(e) => e.stopPropagation()}
                    title="Click and drag horizontally or scroll wheel to rotate this device in 360 degrees"
                    style={{
                      position: 'relative',
                      height: '255px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(4, 9, 18, 0.85)',
                      border: `1.5px solid ${selectedProductModal.accentColor}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.9), 0 10px 30px ${selectedProductModal.accentColor}18`,
                      cursor: isDraggingDevice ? 'grabbing' : 'grab',
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      width: '220px',
                      height: '220px',
                      background: `radial-gradient(circle, ${selectedProductModal.accentColor}33 0%, transparent 70%)`,
                      filter: 'blur(15px)',
                      pointerEvents: 'none'
                    }} />

                    {/* 360° Holographic Turntable Pedestal Base */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: `translateX(-50%) rotateX(72deg) rotateZ(${deviceRotation}deg)`,
                        width: '220px',
                        height: '90px',
                        borderRadius: '50%',
                        border: `1.5px dashed ${selectedProductModal.accentColor}99`,
                        background: `radial-gradient(ellipse at center, ${selectedProductModal.accentColor}44 0%, transparent 70%)`,
                        boxShadow: `0 0 25px ${selectedProductModal.accentColor}44`,
                        pointerEvents: 'none',
                        zIndex: 1,
                        transition: isDraggingDevice ? 'none' : 'transform 0.08s linear'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        inset: '8px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.25)'
                      }} />
                    </div>

                    {/* 360° Rotating Device Image */}
                    <img
                      src={selectedProductModal.image}
                      alt={selectedProductModal.title}
                      draggable={false}
                      style={{
                        maxHeight: '185px',
                        maxWidth: '88%',
                        objectFit: selectedProductModal.image.endsWith('.png') ? 'contain' : 'cover',
                        borderRadius: '10px',
                        position: 'relative',
                        zIndex: 2,
                        transform: `rotateY(${deviceRotation}deg) rotateX(${Math.sin((deviceRotation * Math.PI) / 180) * 8}deg) scale(${1 + Math.cos((deviceRotation * Math.PI) / 180) * 0.04})`,
                        transition: isDraggingDevice ? 'none' : 'transform 0.08s linear',
                        filter: `drop-shadow(${Math.sin((deviceRotation * Math.PI) / 180) * 18}px 16px 24px rgba(0, 0, 0, 0.95))`,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Top-Left: 360° Auto-Spin Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoRotating(prev => !prev);
                        sfx.playLift();
                      }}
                      title={isAutoRotating ? 'Pause 360° Spin' : 'Start 360° Auto-Spin'}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: isAutoRotating ? `${selectedProductModal.accentColor}33` : 'rgba(15, 23, 42, 0.85)',
                        border: `1px solid ${isAutoRotating ? selectedProductModal.accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                        color: isAutoRotating ? selectedProductModal.accentColor : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '0.28rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        zIndex: 6,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <RotateCw size={12} style={{ transform: isAutoRotating ? `rotate(${deviceRotation * 2}deg)` : 'none' }} />
                      <span>{isAutoRotating ? 'Spinning 360°' : '360° Spin'}</span>
                    </button>

                    {/* Top-Right: 360° Angle Display */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(5, 11, 20, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: selectedProductModal.accentColor,
                        borderRadius: '8px',
                        padding: '0.25rem 0.55rem',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        pointerEvents: 'none',
                        zIndex: 6
                      }}
                    >
                      {Math.round(((deviceRotation % 360) + 360) % 360)}°
                    </div>

                    {/* Bottom-Left: Quick Angle Presets */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        gap: '5px',
                        zIndex: 6
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[0, 90, 180, 270].map(angle => (
                        <button
                          key={angle}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeviceRotation(angle);
                            setIsAutoRotating(false);
                            sfx.playLift();
                          }}
                          title={`Rotate device to ${angle} degrees`}
                          style={{
                            backgroundColor: Math.round(((deviceRotation % 360) + 360) % 360) === angle ? selectedProductModal.accentColor : 'rgba(15, 23, 42, 0.85)',
                            color: Math.round(((deviceRotation % 360) + 360) % 360) === angle ? '#030712' : '#94a3b8',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '6px',
                            padding: '0.2rem 0.45rem',
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {angle}°
                        </button>
                      ))}
                    </div>

                    {/* Center Bottom: Drag Hint */}
                    {!isDraggingDevice && !isAutoRotating && (
                      <div style={{
                        position: 'absolute',
                        bottom: '38px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.65rem',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#94a3b8',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        zIndex: 6
                      }}>
                        ↔ Drag device to rotate 360°
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div>
                    <div style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: selectedProductModal.accentColor,
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem'
                    }}>
                      Core Capabilities
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {selectedProductModal.keyPills.map((pill, pi) => (
                        <span
                          key={pi}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            padding: '0.35rem 0.75rem',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#e2e8f0',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <CheckCircle2 size={12} color={selectedProductModal.accentColor} />
                          <span>{pill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    margin: '0 0 0.4rem 0'
                  }}>
                    {selectedProductModal.title}
                  </h2>
                  <p style={{
                    fontSize: '0.92rem',
                    color: selectedProductModal.accentColor,
                    fontWeight: 700,
                    margin: '0 0 1rem 0'
                  }}>
                    {selectedProductModal.subtitle}
                  </p>

                  {/* Full Description Box */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.1rem 1.25rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem'
                    }}>
                      Official Product Description (atplgroup.com)
                    </div>
                    <p style={{ fontSize: '0.94rem', color: '#f1f5f9', lineHeight: 1.7, margin: 0 }}>
                      {selectedProductModal.desc}
                    </p>
                  </div>

                  {/* Technical Specs */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.65rem',
                    marginBottom: '1.25rem'
                  }}>
                    {selectedProductModal.stats.map((st, si) => (
                      <div
                        key={si}
                        style={{
                          backgroundColor: 'rgba(6, 12, 24, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '0.65rem 0.85rem'
                        }}
                      >
                        <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {st.label}
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: selectedProductModal.accentColor, marginTop: '2px' }}>
                          {st.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture & ERP */}
                  <div style={{
                    backgroundColor: 'rgba(4, 9, 18, 0.9)',
                    border: `1px solid ${selectedProductModal.accentColor}44`,
                    borderRadius: '12px',
                    padding: '0.95rem 1.15rem',
                    fontSize: '0.78rem',
                    lineHeight: 1.6,
                    color: '#cbd5e1',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    <div>
                      <strong style={{ color: '#ffffff' }}>Engine & Controller: </strong>
                      <span>{selectedProductModal.blueprint.controller}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#ffffff' }}>Interfaces & Connectivity: </strong>
                      <span>{selectedProductModal.blueprint.connectivity}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#ffffff' }}>Protocols & ERP: </strong>
                      <span>{selectedProductModal.blueprint.protocols}</span>
                    </div>
                    <div style={{ color: selectedProductModal.accentColor, fontWeight: 700, marginTop: '0.2rem' }}>
                      ⚡ Proven ROI Impact: {selectedProductModal.blueprint.roiMetric}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button
                      onClick={() => {
                        openDemoModal({
                          solution: `${selectedProductModal.title} (${selectedProductModal.oem})`,
                          notes: `Inquiry initiated from ATPL Official Hardware Showcase: ${selectedProductModal.title}`
                        });
                      }}
                      style={{
                        flex: 1,
                        minWidth: '200px',
                        backgroundColor: '#0071ba',
                        color: '#ffffff',
                        border: `1px solid ${selectedProductModal.accentColor}`,
                        padding: '0.85rem 1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: `0 4px 20px ${selectedProductModal.accentColor}33`,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Request Evaluation Unit & Quote</span>
                      <ArrowRight size={16} />
                    </button>

                    <a
                      href={selectedProductModal.officialUrl || OFFICIAL_CATEGORY_URLS[selectedProductModal.category] || 'https://atplgroup.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '10px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>View on atplgroup.com</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
