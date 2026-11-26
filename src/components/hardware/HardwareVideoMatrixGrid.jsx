import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  RotateCw, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Search,
  Filter,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Wifi,
  Zap,
  Activity
} from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { ShineBadge } from '../ui/shine-badge';
import { MagneticButton } from '../ui/magnetic-button';
import { GlowEffect } from '../ui/glow-effect';
import { NumberTicker } from '../ui/number-ticker';
import { ScrollReveal } from '../ui/scroll-reveal';

// Master catalog of all 20 authentic 360° video products
const ALL_HARDWARE_VIDEO_PRODUCTS = [
  // 1. SCANNERS
  {
    id: 'vid-hw-scanner-wired',
    title: 'ATPL Wired Scanner 1D / 2D',
    subtitle: 'Superior High-Accuracy Workstation & Dispatch Imager',
    category: 'scanners',
    categoryName: 'Scanning',
    oem: 'Honeywell / ATPL',
    accentColor: '#00f0ff',
    badgeText: '1D / 2D High Speed',
    videoUrl: '/assets/videos/rotating_optimized.mp4',
    fpsTarget: 60,
    tags: ['Ultra-Fast Megapixel Sensor', 'IP52 Sealed', 'Shielded USB/RS232', 'Automotive & Logistics'],
    specs: [
      { label: 'Scan Rate', val: 1200, suffix: ' scans/s' },
      { label: 'Drop Spec', val: 2.0, suffix: 'm to concrete' },
      { label: 'Resolution', val: 1280, prefix: '', suffix: 'p' },
      { label: 'Decode Depth', val: 45, suffix: ' cm' }
    ],
    blueprint: {
      controller: 'Dual-Core High-Resolution Linear & 2D CMOS Engine',
      connectivity: 'Industrial Shielded High-Retention USB Type-A / RS-232',
      protocols: 'Code 128, GS1 DataBar, QR Code, Data Matrix, PDF417',
      roiMetric: 'Eliminates misreads at fulfillment sorting dispatch stations'
    }
  },
  {
    id: 'vid-hw-scanner-cordless',
    title: 'ATPL Wireless Scanner with Smart Cradle',
    subtitle: 'Freedom of Movement for POS, Conveyors & Warehouses',
    category: 'scanners',
    categoryName: 'Scanning',
    oem: 'ATPL Industrial',
    accentColor: '#00f0ff',
    badgeText: '100m Bluetooth 5.2',
    videoUrl: '/assets/videos/scanner_cordless_360.mp4',
    fpsTarget: 60,
    tags: ['Cordless Mobility', 'Magnetic Charging Base', 'Batch Mode Memory', 'Retail & Dispatch'],
    specs: [
      { label: 'Wireless Range', val: 100, suffix: ' m' },
      { label: 'Battery Life', val: 18, suffix: ' hrs' },
      { label: 'Drop Spec', val: 1.8, suffix: 'm' },
      { label: 'Offline Buffer', val: 8000, suffix: ' barcodes' }
    ],
    blueprint: {
      controller: 'Ultra-Low Latency Bluetooth BLE 5.2 Micro-Transceiver',
      connectivity: 'Dual-Contact Inductive Base Cradle with Host USB Uplink',
      protocols: 'HID Keyboard, SPP Serial, BLE Custom Factory Protocol',
      roiMetric: 'Untethered scanning efficiency for loading bays and packing tables'
    }
  },
  {
    id: 'vid-hw-scanner-dpm',
    title: 'ATPL Industrial DPM Scanner',
    subtitle: 'Direct Part Mark Imager with Multi-Illumination Dome',
    category: 'scanners',
    categoryName: 'Scanning',
    oem: 'ATPL Solutions',
    accentColor: '#a855f7',
    badgeText: 'DPM Glare Suppression',
    videoUrl: '/assets/videos/scanner_dpm_360.mp4',
    fpsTarget: 60,
    tags: ['Multi-Quadrant Dome Lighting', 'Etched Metals & Cast Iron', 'Specular Glare Cancel', 'Powertrain'],
    specs: [
      { label: 'Dot Peen Read', val: 100, suffix: '%' },
      { label: 'Laser Etch Acc', val: 99.8, suffix: '%' },
      { label: 'Diffuser Modes', val: 4, suffix: ' quadrants' },
      { label: 'Operating Temp', val: 50, prefix: '+', suffix: '°C' }
    ],
    blueprint: {
      controller: 'Multi-Quadrant LED Cognitive Illumination Controller',
      connectivity: 'Heavy-Duty Oil-Resistant Molded Polyurethane Cable',
      protocols: 'ISO/IEC 15415 & AS9132 DPM Quality Verification',
      roiMetric: '100% Powertrain and Aerospace Engine Part Serialization'
    }
  },
  {
    id: 'vid-hw-scanner-conveyor',
    title: 'ATPL Fixed Conveyor Vision Scanner',
    subtitle: 'Built-in AI Technology & High-Speed In-Motion Reading',
    category: 'plc',
    categoryName: 'Machine Vision',
    oem: 'Keyence / Cognex Partner',
    accentColor: '#3b82f6',
    badgeText: '5.0 m/s Line Speed',
    videoUrl: '/assets/videos/scanner_conveyor_360.mp4',
    fpsTarget: 60,
    tags: ['Autonomous Conveyor Reading', 'Polarized Multi-Spectrum Lens', 'Liquid Lens Autofocus', 'E-Commerce'],
    specs: [
      { label: 'Conveyor Speed', val: 5.0, suffix: ' m/s' },
      { label: 'Frame Rate', val: 120, suffix: ' FPS' },
      { label: 'Field of View', val: 650, suffix: ' mm' },
      { label: 'Ingress Protect', val: 67, prefix: 'IP', suffix: '' }
    ],
    blueprint: {
      controller: 'Embedded AI Vision Pipeline with Liquid Lens Focal Control',
      connectivity: 'PROFINET, EtherNet/IP, TCP/IP Gigabit M12 Industrial Ports',
      protocols: 'OPC-UA, Modbus TCP, Discrete Optical Sensor Triggering',
      roiMetric: 'High-velocity 5m/s conveyor sorting without package rotation stops'
    }
  },

  // 2. PRINTERS
  {
    id: 'vid-hw-printer-industrial',
    title: 'Industrial Heavy-Duty Barcode Printer',
    subtitle: '24/7 Precision Solid-Die-Cast Chassis & In-Line Verifier',
    category: 'printers',
    categoryName: 'Printers',
    oem: 'ATPL Industrial',
    accentColor: '#10b981',
    badgeText: '24/7 Cast Aluminum',
    videoUrl: '/assets/videos/printer_360.mp4',
    fpsTarget: 60,
    tags: ['Full Metal Enclosure', 'Thermal Transfer / Direct Thermal', '600 DPI High-Res', 'Automotive OEM'],
    specs: [
      { label: 'Print Speed', val: 14, suffix: ' ips' },
      { label: 'Resolution', val: 600, suffix: ' DPI' },
      { label: 'Ribbon Length', val: 450, suffix: ' m' },
      { label: 'Duty Cycle', val: 24, suffix: '/7 Cont' }
    ],
    blueprint: {
      controller: 'Arm Cortex High-Speed Thermal Drive with Edge Heat Sensor',
      connectivity: 'Gigabit LAN, Dual USB Host, RS-232, GPIO Applicator Port',
      protocols: 'ZPL II, EPL, DPL, SAP NetWeaver Auto-Connect, XML Direct',
      roiMetric: 'Zero barcode line-stops with 100% in-line verification'
    }
  },
  {
    id: 'vid-hw-printer-rfid',
    title: 'ATPL RFID Industrial Printer & Encoder',
    subtitle: 'High-Speed Encoding for Standard Labels & On-Metal Tags',
    category: 'printers',
    categoryName: 'Printers',
    oem: 'ATPL Industrial',
    accentColor: '#fbbf24',
    badgeText: 'RAIN RFID Encoded',
    videoUrl: '/assets/videos/printer_rfid_360.mp4',
    fpsTarget: 60,
    tags: ['EPC Gen2v2 Encoding', 'On-Metal Tag Support', 'Auto Void & Reprint', 'Supply Chain Pallets'],
    specs: [
      { label: 'Encoding Speed', val: 12, suffix: ' ips' },
      { label: 'RFID Standard', val: 18000, prefix: 'ISO ', suffix: '-6C' },
      { label: 'Tag Pitch Min', val: 16, suffix: ' mm' },
      { label: 'Reprint Acc', val: 100, suffix: '%' }
    ],
    blueprint: {
      controller: 'Adaptive Antenna Array Engine with Auto-Pitch Calibration',
      connectivity: 'Industrial Ethernet, USB 2.0, Centronics, Wireless 802.11ac',
      protocols: 'RAIN RFID Gen2, ZPL RFID Extensions, EPC Class 1 Gen 2',
      roiMetric: 'Automated simultaneous print and verify on pallet-level assets'
    }
  },
  {
    id: 'vid-hw-printer-mobile',
    title: 'ATPL Portable Mobile Barcode Printer',
    subtitle: 'Point-of-Activity Belt-Clip Printing for Rugged Crews',
    category: 'printers',
    categoryName: 'Printers',
    oem: 'ATPL Mobility',
    accentColor: '#10b981',
    badgeText: 'Drop-Proof IP54',
    videoUrl: '/assets/videos/printer_mobile_360.mp4',
    fpsTarget: 60,
    tags: ['Belt-Clip Wearable', 'Direct Thermal', 'OLED Battery Gauge', 'Cross-Dock & Delivery'],
    specs: [
      { label: 'Print Width', val: 4, suffix: ' inch' },
      { label: 'Battery Run', val: 24, suffix: ' hrs' },
      { label: 'Drop Rating', val: 2.1, suffix: 'm' },
      { label: 'Weight', val: 680, suffix: ' g' }
    ],
    blueprint: {
      controller: 'Power-Optimized Mobile Thermal Head Controller',
      connectivity: 'NFC Tap-to-Pair, Dual-Mode Bluetooth 5.0, Wi-Fi 6',
      protocols: 'CPCL, ZPL, ESC/POS, Android & iOS Native SDKs',
      roiMetric: 'Cuts forklift operator travel time by printing labels at pallet drop'
    }
  },
  {
    id: 'vid-hw-printer-desktop',
    title: 'ATPL Desktop Barcode Printer',
    subtitle: 'Affordable High-Volume Daily Identification & Shipping',
    category: 'printers',
    categoryName: 'Printers',
    oem: 'ATPL Industrial',
    accentColor: '#10b981',
    badgeText: 'Compact Clamshell',
    videoUrl: '/assets/videos/printer_desktop_360.mp4',
    fpsTarget: 60,
    tags: ['Space-Saving Clamshell', '300 DPI Fine Text', 'Quick Ribbon Reload', 'Pharma & Dispatch'],
    specs: [
      { label: 'Print Speed', val: 8, suffix: ' ips' },
      { label: 'Max Width', val: 108, suffix: ' mm' },
      { label: 'Memory', val: 128, suffix: ' MB' },
      { label: 'Resolution', val: 300, suffix: ' DPI' }
    ],
    blueprint: {
      controller: 'High-Torque Clamshell Stepper Motor with Gap/BlackMark Sensor',
      connectivity: 'USB 2.0 Host/Device, 10/100 Ethernet, Serial RS-232',
      protocols: 'TSPL-EZ, ZPL, EPL, Windows & Linux CUPS Drivers',
      roiMetric: 'Low TCO compact shipping label workstation'
    }
  },
  {
    id: 'vid-hw-printer-idcard',
    title: 'ATPL Security Retransfer ID Card Printer',
    subtitle: 'High-Security Dual-Sided RFID & Smart Badge Issuance',
    category: 'printers',
    categoryName: 'Printers',
    oem: 'HID Fargo / ATPL',
    accentColor: '#10b981',
    badgeText: 'Over-the-Edge Retransfer',
    videoUrl: '/assets/videos/printer_idcard_360.mp4',
    fpsTarget: 60,
    tags: ['Edge-to-Edge Pigment', 'Contactless RFID Encoding', 'Tamper Hologram', 'Corporate Security'],
    specs: [
      { label: 'Card Throughput', val: 150, suffix: ' cards/h' },
      { label: 'Resolution', val: 600, suffix: ' DPI' },
      { label: 'Hopper Capacity', val: 200, suffix: ' cards' },
      { label: 'Lamination', val: 100, suffix: '% Edge' }
    ],
    blueprint: {
      controller: 'Thermal Retransfer Micro-Engine with Inline RFID Programmer',
      connectivity: 'Secure AES-256 Gigabit Ethernet, USB 2.0 Host',
      protocols: 'MIFARE DESFire, HID iCLASS SE, ISO 7816 Smart Card',
      roiMetric: 'Instant corporate badge issuance with zero delamination'
    }
  },

  // 3. MOBILITY
  {
    id: 'vid-hw-mobility-rugged',
    title: 'Android Enterprise Rugged Device',
    subtitle: 'Full-Touch + Physical Keypad with 15.2m Read Range',
    category: 'mobility',
    categoryName: 'Mobility Edge',
    oem: 'Honeywell / Zebra Partner',
    accentColor: '#00f0ff',
    badgeText: '15.2m Extreme Range',
    videoUrl: '/assets/videos/mobility_360.mp4',
    fpsTarget: 60,
    tags: ['Hot-Swap 7000mAh Battery', '38-Key Alphanumeric', 'IP68 Sealed', 'High-Bay Warehouses'],
    specs: [
      { label: 'Read Distance', val: 15.2, suffix: ' m' },
      { label: 'Battery Capacity', val: 7000, suffix: ' mAh' },
      { label: 'Drop Spec', val: 3.0, suffix: 'm' },
      { label: 'Drop Cycles', val: 2000, suffix: ' tumbles' }
    ],
    blueprint: {
      controller: 'Qualcomm Snapdragon Octa-Core 2.2GHz with AI Engine',
      connectivity: 'Wi-Fi 6E, 5G NR Dual SIM, Bluetooth 5.2, NFC',
      protocols: 'Android Enterprise Recommended, SOTI MobiControl, MDM',
      roiMetric: 'High-rack forklift scanning without operator dismounting'
    }
  },
  {
    id: 'vid-hw-mobility-field',
    title: 'Mobility Edge Enterprise Touch PDA',
    subtitle: 'Qualcomm-Powered Ultra-Slim Scalable Mobile Platform',
    category: 'mobility',
    categoryName: 'Mobility Edge',
    oem: 'Honeywell ScanPal EDA51',
    accentColor: '#00f0ff',
    badgeText: 'Qualcomm Octa-Core',
    videoUrl: '/assets/videos/mobility_field_360.mp4',
    fpsTarget: 60,
    tags: ['Gorilla Glass 5 Touch', 'Integrated 2D Imager', 'All-Day Ergonomics', 'Retail & Last-Mile'],
    specs: [
      { label: 'Screen Size', val: 5.0, suffix: ' inch' },
      { label: 'Battery Life', val: 14, suffix: ' hrs' },
      { label: 'Drop Rating', val: 1.5, suffix: 'm' },
      { label: 'OS Upgradeable', val: 4, suffix: ' generations' }
    ],
    blueprint: {
      controller: 'Qualcomm SDM450 Octa-Core with Mobility Edge Unified SOM',
      connectivity: 'WLAN 802.11ac, Bluetooth 4.2, 4G LTE Worldwide, GPS',
      protocols: 'Android 11 upgradable to 14, Honeywell Unified Client Pack',
      roiMetric: 'Sleek consumer ergonomics with enterprise lifecycle longevity'
    }
  },
  {
    id: 'vid-hw-mobility-cold-storage',
    title: 'Cold Storage & Hazardous Zone Terminal',
    subtitle: 'Built for -30°C Freezers & Explosive Atmospheres',
    category: 'mobility',
    categoryName: 'Mobility Edge',
    oem: 'ATPL Specialized',
    accentColor: '#06b6d4',
    badgeText: '-30°C Freezer Ready',
    videoUrl: '/assets/videos/mobility_cold_storage_360.mp4',
    fpsTarget: 60,
    tags: ['Internal Heating Coils', 'Desiccant Optics', 'Glove-Operable Screen', 'Explosion-Proof ATEX'],
    specs: [
      { label: 'Min Temp', val: 30, prefix: '-', suffix: '°C' },
      { label: 'Heater Coils', val: 3, suffix: ' zones' },
      { label: 'Speaker Vol', val: 105, suffix: ' dB' },
      { label: 'IP Sealing', val: 68, prefix: 'IP', suffix: '' }
    ],
    blueprint: {
      controller: 'Microprocessor-Controlled Thermal Defrost Engine',
      connectivity: 'Freezer-Tuned Extended Diversity Wi-Fi Antennas',
      protocols: 'ATEX Zone 2, IECEx, Class I Div 2 Non-Incendive',
      roiMetric: 'Eliminates optical fogging downtime in blast freezers'
    }
  },
  {
    id: 'vid-hw-mobility-tablet',
    title: 'ATPL Rugged Industrial Tablet',
    subtitle: 'Supervisor & Shopfloor Workflow Tablet with Vehicle Docks',
    category: 'mobility',
    categoryName: 'Mobility Edge',
    oem: 'ATPL Solutions',
    accentColor: '#00f0ff',
    badgeText: '10.1" 1000-Nit Sunlight',
    videoUrl: '/assets/videos/mobility_tablet_360.mp4',
    fpsTarget: 60,
    tags: ['Forklift Vehicle Docking', 'Hot-Swappable Pack', 'Windows 11 / Android 13', 'Shopfloor MES'],
    specs: [
      { label: 'Display Nits', val: 1000, suffix: ' nits' },
      { label: 'Screen Res', val: 1920, suffix: 'x1200' },
      { label: 'Drop Spec', val: 1.8, suffix: 'm' },
      { label: 'Hot-Swap', val: 100, suffix: '% seamless' }
    ],
    blueprint: {
      controller: 'Intel Core i5 / Qualcomm Hexagon Platform with TPM 2.0',
      connectivity: 'Pass-through RF Antennas for GPS/WWAN/WLAN on Forklift Dock',
      protocols: 'MIL-STD-810H Vibration, IP65 Waterproof, OPC-UA Client',
      roiMetric: 'Real-time MES job card dispatch directly from forklift cab'
    }
  },

  // 4. RFID
  {
    id: 'vid-hw-rfid-antenna',
    title: 'Industrial RFID Flat Panel Antenna & Tags',
    subtitle: 'Vibration-Proof Antennas with Water & Chemical Resistant Tags',
    category: 'rfid',
    categoryName: 'RFID Portals',
    oem: 'ATPL RAIN RFID',
    accentColor: '#f59e0b',
    badgeText: '9 dBi Circular Gain',
    videoUrl: '/assets/videos/rfid_antenna_360.mp4',
    fpsTarget: 60,
    tags: ['Circular Polarization', 'IP67 Radome', 'On-Metal Acid Resistant Tags', 'Dock Door Portals'],
    specs: [
      { label: 'Antenna Gain', val: 9.0, suffix: ' dBic' },
      { label: 'Portal Read Acc', val: 99.9, suffix: '%' },
      { label: 'Tag Temp Max', val: 250, prefix: '+', suffix: '°C' },
      { label: 'Read Distance', val: 12, suffix: ' m' }
    ],
    blueprint: {
      controller: 'UHF Circular Polarized Low-Axial-Ratio Planar Radome Array',
      connectivity: 'Low-Loss N-Type Coaxial Cable to 8-Port RAIN Reader Engine',
      protocols: 'EPCglobal Gen2 (ISO 18000-63), RAIN RFID Standard',
      roiMetric: 'Automated dock-door pallet verification with zero manual scan'
    }
  },

  // 5. MARKING / DPM
  {
    id: 'vid-hw-marking-fiber',
    title: 'Fiber Laser Marking Machine Galvo Head',
    subtitle: 'Chiller-Free High-Speed Traceability for Metals & Cast Iron',
    category: 'marking',
    categoryName: 'DPM Marking',
    oem: 'ATPL Industrial Marking',
    accentColor: '#c084fc',
    badgeText: '100,000h Diode Life',
    videoUrl: '/assets/videos/laser_marker_360.mp4',
    fpsTarget: 60,
    tags: ['MOPA Variable Pulse', 'Zero Consumable', 'Galvo High-Speed Mirrors', 'Automotive VIN'],
    specs: [
      { label: 'Laser Power', val: 50, suffix: ' W' },
      { label: 'Marking Speed', val: 9000, suffix: ' mm/s' },
      { label: 'Laser Lifetime', val: 100000, suffix: ' hrs' },
      { label: 'Wavelength', val: 1064, suffix: ' nm' }
    ],
    blueprint: {
      controller: 'High-Precision Dual-Axis Digital Galvo Scanning Head with MOPA',
      connectivity: 'Isolated Industrial I/O, Ethernet TCP/IP, PLC Handshake',
      protocols: 'Direct DataMatrix GS1 Serialization, Vector Engraving, DXF',
      roiMetric: 'Permanent lifetime traceability surviving shot-blasting and heat treat'
    }
  },
  {
    id: 'vid-hw-marking-uv',
    title: 'UV Cold Laser Hyperfine Marking Module',
    subtitle: 'Photochemical Cold Etch for Medical Devices & Polymers',
    category: 'marking',
    categoryName: 'DPM Marking',
    oem: 'ATPL Ultra Precision',
    accentColor: '#c084fc',
    badgeText: '355nm Zero Heat',
    videoUrl: '/assets/videos/uv_laser_360.mp4',
    fpsTarget: 60,
    tags: ['Zero Heat Affected Zone', 'Sterile Syringes & Catheters', 'Micro-DataMatrix', 'Cleanrooms'],
    specs: [
      { label: 'Wavelength', val: 355, suffix: ' nm' },
      { label: 'Beam Spot Size', val: 15, suffix: ' µm' },
      { label: 'Heat Spread', val: 0, suffix: ' µm' },
      { label: 'Frequency Rate', val: 200, suffix: ' kHz' }
    ],
    blueprint: {
      controller: 'Triple Harmonic Frequency-Tripled Diode Pumped Solid State UV',
      connectivity: 'Ethernet, Interlock Safety Circuit, Industrial Fume Extraction',
      protocols: 'FDA UDI 21 CFR Part 11 Compliance, ISO 13485 Medical Track',
      roiMetric: 'Marks sterile plastics without surface deformation or material leach'
    }
  },
  {
    id: 'vid-hw-marking-dotpeen',
    title: 'Industrial Dot Peen Pin Marking Station',
    subtitle: 'Deep Electromechanical Carbide Stylus Metal Indentation',
    category: 'marking',
    categoryName: 'DPM Marking',
    oem: 'Bradma / ATPL Heavy',
    accentColor: '#c084fc',
    badgeText: 'Tungsten Carbide 92 HRC',
    videoUrl: '/assets/videos/dotpeen_360.mp4',
    fpsTarget: 60,
    tags: ['Tungsten Carbide Stylus', 'Extreme Depth for Casting', 'Column Mount or Portable', 'Heavy Steel'],
    specs: [
      { label: 'Indentation Depth', val: 0.8, suffix: ' mm' },
      { label: 'Pin Hardness', val: 92, suffix: ' HRC' },
      { label: 'Marking Window', val: 160, suffix: 'x100mm' },
      { label: 'Impact Rate', val: 300, suffix: ' impacts/s' }
    ],
    blueprint: {
      controller: 'Heavy-Duty Solenoid Pulse Driver with Micro-Stepped Ball Screws',
      connectivity: 'RS-232, USB, Ethernet, Factory Discrete Air Interlock',
      protocols: 'Direct Part Mark 2D DataMatrix, Human-Readable Font Specs',
      roiMetric: 'Mark survives heavy powder coating, galvanized zinc, and weather'
    }
  },

  // 6. TOUCH & AUTOMATION
  {
    id: 'vid-hw-touch-industrial',
    title: 'Heavy-Duty Industrial Fanless Touch PC',
    subtitle: 'IP66 Waterproof Seamless Panel for Shopfloor MES & SCADA',
    category: 'touch',
    categoryName: 'Touch Systems',
    oem: 'ATPL Industrial Systems',
    accentColor: '#fb7185',
    badgeText: 'Fanless IP66 Bezel',
    videoUrl: '/assets/videos/touch_computer_360.mp4',
    fpsTarget: 60,
    tags: ['Full Flat Projected Capacitive', 'Solid Aluminum Heat Sink', 'Wide 9-36V DC Input', 'Machine HMI'],
    specs: [
      { label: 'Screen Diagonal', val: 15.6, suffix: ' inch' },
      { label: 'Touch Points', val: 10, suffix: '-point' },
      { label: 'MTBF Rating', val: 50000, suffix: ' hrs' },
      { label: 'Operating Temp', val: 60, prefix: '+', suffix: '°C' }
    ],
    blueprint: {
      controller: 'Intel Industrial Embedded Processor with Fanless Fin Chassis',
      connectivity: 'Dual Gigabit LAN, 4x Isolated COM Ports, 4x USB 3.2, PCIe slot',
      protocols: 'OPC-DA, SCADA Web Client, Modbus, Windows IoT Enterprise',
      roiMetric: 'Eliminates dust fan failure and oil vapor infiltration on lines'
    }
  },
  {
    id: 'vid-hw-kiosk-modular',
    title: 'ATPL Modular Smart Factory Kiosk System',
    subtitle: 'Gate Pass, Truck Weighbridge & Assembly Job Card Station',
    category: 'kiosk',
    categoryName: 'Kiosks',
    oem: 'ATPL Kiosks',
    accentColor: '#fb7185',
    badgeText: 'Heavy Gauge Mild Steel',
    videoUrl: '/assets/videos/kiosk_360.mp4',
    fpsTarget: 60,
    tags: ['Integrated Barcode + RFID + Camera', 'Thermal Receipt Printer', 'Outdoor Weatherproof', 'Gate Entry'],
    specs: [
      { label: 'Touch Display', val: 21.5, suffix: ' inch' },
      { label: 'Chassis Gauge', val: 2.0, suffix: ' mm Steel' },
      { label: 'Vandal Rating', val: 10, prefix: 'IK', suffix: '' },
      { label: 'Uptime SLA', val: 99.9, suffix: '%' }
    ],
    blueprint: {
      controller: 'Embedded Industrial PC with Lockable Heavy Access Panel',
      connectivity: 'Optical Fiber Uplink, Industrial Wi-Fi 6, 4G Router Failover',
      protocols: 'PerfectEdge MDM Lockdown, SAP Gate Pass Web Interface',
      roiMetric: 'Cuts driver weighbridge and gate turnaround time by 75%'
    }
  },

  // 7. WEARABLE VOICE
  {
    id: 'vid-hw-voice-headset',
    title: 'ATPL Voice Devices & Headset Solutions',
    subtitle: 'Hands-Free Multilingual Speech Picking for High-Rack Warehouses',
    category: 'voice',
    categoryName: 'Wearable Voice',
    oem: 'Honeywell Vocollect / ATPL',
    accentColor: '#818cf8',
    badgeText: 'Speech Recognition 99.9%',
    videoUrl: '/assets/videos/voice_headset_360.mp4',
    fpsTarget: 60,
    tags: ['Active Dual-Mic Noise Cancel', 'Breakaway Safety Lanyard', 'Extreme Cold Microphone', 'Zero Eyes Downtime'],
    specs: [
      { label: 'Noise Cancel', val: 110, suffix: ' dB' },
      { label: 'Pick Rate Boost', val: 35, prefix: '+', suffix: '%' },
      { label: 'Battery Shift', val: 16, suffix: ' hrs' },
      { label: 'Languages', val: 40, prefix: '', suffix: '+ Supported' }
    ],
    blueprint: {
      controller: 'Dual Beamforming Noise-Cancellation Acoustic DSP Engine',
      connectivity: 'Encrypted Industrial BLE 5.1 with Fast Reconnect',
      protocols: 'Vocollect Voice Interface, SAP EWM Voice Direct, WMS Bridge',
      roiMetric: 'Hands-free, eyes-free picking boosts order accuracy to 99.99%'
    }
  }
];

/**
 * Global Hardware Decoder Manager
 * Chrome/Chromium has a strict hardware limit on concurrent active video decoder sessions (Direct3D11 / Media Foundation).
 * Retaining more than 6 active decoders causes subsequent video decoders to stall (paused=false, currentTime=0).
 * This manager caps concurrent mounted <video> elements to 6.
 * Off-screen or waiting cards display the static first-frame .jpg poster.
 */
const MAX_ACTIVE_DECODERS = 6;
const activeDecoderIds = new Set();
const decoderChangeListeners = new Set();

function notifyDecoderChange() {
  decoderChangeListeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      // ignore
    }
  });
}

function requestDecoderSlot(id, isModal = false) {
  if (activeDecoderIds.has(id)) return true;
  if (isModal || activeDecoderIds.size < MAX_ACTIVE_DECODERS) {
    activeDecoderIds.add(id);
    notifyDecoderChange();
    return true;
  }
  return false;
}

function releaseDecoderSlot(id) {
  if (activeDecoderIds.has(id)) {
    activeDecoderIds.delete(id);
    notifyDecoderChange();
  }
}

/**
 * TurntableVideoPlayer
 * High-performance 360° video turntable player:
 * - Pre-loads 300px before entering viewport (rootMargin: '300px', threshold: 0).
 * - 2-second grace period before unmounting out-of-view videos to prevent thrashing during scrolling.
 * - preload="auto" for smooth buffer-ahead playback without stalling.
 * - Isolated playbackSpeed updates without tearing down or reloading the video element.
 * - Clean composite stack with no backdrop blur over the playing video surface.
 */
const TurntableVideoPlayer = ({
  src = '/assets/videos/rotating_optimized.mp4',
  poster,
  playbackSpeed = 1,
  accentColor = '#00f0ff',
  inModal = false,
  title = ''
}) => {
  const instanceId = useRef(Math.random().toString(36).substring(2, 9)).current;
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  // Store playbackSpeed in a ref updated on every render
  const speedRef = useRef(playbackSpeed);
  speedRef.current = playbackSpeed;

  const [inView, setInView] = useState(inModal);
  const [hasSlot, setHasSlot] = useState(inModal);

  // Derive first-frame poster URL if not provided directly
  const posterUrl = useMemo(() => {
    if (poster) return poster;
    if (!src) return '';
    return src.replace('/assets/videos/', '/assets/videos/posters/').replace(/\.mp4$/, '.jpg');
  }, [poster, src]);

  // Viewport intersection observer (rootMargin '300px', threshold 0 with 2000ms exit grace period)
  useEffect(() => {
    if (inModal) {
      setInView(true);
      return;
    }

    const container = containerRef.current;
    if (!container || !window.IntersectionObserver) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Become visible immediately; clear any pending exit timeout
            if (leaveTimeoutRef.current) {
              clearTimeout(leaveTimeoutRef.current);
              leaveTimeoutRef.current = null;
            }
            setInView(true);
          } else {
            // Wait 2000ms before unmounting out-of-view videos
            if (leaveTimeoutRef.current) {
              clearTimeout(leaveTimeoutRef.current);
            }
            leaveTimeoutRef.current = setTimeout(() => {
              setInView(false);
              leaveTimeoutRef.current = null;
            }, 2000);
          }
        });
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    );

    observer.observe(container);
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      observer.disconnect();
    };
  }, [inModal]);

  // Decoder slot manager subscription
  useEffect(() => {
    if (inModal) {
      requestDecoderSlot(instanceId, true);
      setHasSlot(true);
      return () => {
        releaseDecoderSlot(instanceId);
      };
    }

    const syncSlot = () => {
      if (inView) {
        if (activeDecoderIds.has(instanceId)) {
          setHasSlot(true);
        } else {
          const granted = requestDecoderSlot(instanceId, false);
          setHasSlot(granted);
        }
      } else {
        releaseDecoderSlot(instanceId);
        setHasSlot(false);
      }
    };

    syncSlot();
    decoderChangeListeners.add(syncSlot);

    return () => {
      decoderChangeListeners.delete(syncSlot);
      releaseDecoderSlot(instanceId);
    };
  }, [inView, inModal, instanceId]);

  const shouldMountVideo = inView && hasSlot;

  // Video playback lifecycle: depends ONLY on [shouldMountVideo, src]
  // StrictMode-safe cleanup: pauses immediately, but only frees src if element actually disconnected from DOM
  useEffect(() => {
    if (!shouldMountVideo) return;
    const v = videoRef.current;
    if (!v) return;

    v.defaultMuted = true;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.playbackRate = speedRef.current;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    return () => {
      try {
        v.pause();
      } catch (e) {}

      setTimeout(() => {
        if (!v.isConnected) {
          try {
            v.removeAttribute('src');
            v.load();
          } catch (e) {}
        }
      }, 0);
    };
  }, [shouldMountVideo, src]);

  // Dynamic playback rate sync: only sets playbackRate without reloading
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <div
      ref={containerRef}
      data-turntable-player="true"
      data-title={title}
      data-mounted={shouldMountVideo}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: inModal ? '16px' : '12px'
      }}
    >
      {shouldMountVideo ? (
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.playbackRate = speedRef.current;
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'translateZ(0) scale(1.05)',
            transformOrigin: 'center center',
            willChange: 'transform',
            borderRadius: inModal ? '16px' : '12px',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      ) : (
        <img
          src={posterUrl}
          alt={title || 'Product 360 preview'}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'translateZ(0) scale(1.05)',
            transformOrigin: 'center center',
            borderRadius: inModal ? '16px' : '12px',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        />
      )}
    </div>
  );
};

export const HardwareVideoMatrixGrid = ({ 
  activeCategory: externalCategory, 
  onCategoryChange 
}) => {
  const { openDemoModal } = useApp();
  const [internalCategory, setInternalCategory] = useState('all');
  const selectedCategory = externalCategory !== undefined ? externalCategory : internalCategory;
  const handleCategorySelect = (catId) => {
    setInternalCategory(catId);
    if (onCategoryChange) onCategoryChange(catId);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'scanners', label: 'Scanning' },
    { id: 'printers', label: 'Printers' },
    { id: 'mobility', label: 'Mobility Edge' },
    { id: 'rfid', label: 'RFID Portals' },
    { id: 'marking', label: 'DPM Marking' },
    { id: 'plc', label: 'Machine Vision' },
    { id: 'touch', label: 'Touch Systems' },
    { id: 'kiosk', label: 'Kiosks' },
    { id: 'voice', label: 'Wearable Voice' }
  ];

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return ALL_HARDWARE_VIDEO_PRODUCTS.filter(item => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.oem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="hardware-360-matrix" style={{ marginTop: '0.5rem', marginBottom: '4rem', position: 'relative' }}>
      
      {/* SECTION HEADER & TELEMETRY BADGE */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}>
        {/* Soft Ambient Radial Lighting behind header */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(90vw, 750px)',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.16) 0%, rgba(2, 132, 199, 0.06) 45%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(0, 240, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.35)', marginBottom: '1rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
            <RotateCw size={13} color="#00f0ff" style={{ animation: 'spin 12s linear infinite' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#00f0ff', textTransform: 'uppercase' }}>
              AUTHENTIC 360° HARDWARE VIDEO MATRIX // 60 FPS ULTRA SLOW-MO
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.03em', 
            color: '#ffffff',
            lineHeight: 1.15,
            margin: '0 0 0.85rem 0'
          }}>
            Every Industrial Rig. <span style={{ 
              background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Full 360° Studio Showcase.</span>
          </h2>

          <p style={{ 
            color: '#94a3b8', 
            fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)', 
            maxWidth: '820px', 
            margin: '0 auto 1.5rem auto',
            lineHeight: 1.6
          }}>
            Inspect our flagship barcode scanners, industrial printers, rugged Android computers, RAIN RFID panels, and laser markers from every single angle in authentic 60 FPS slow-motion turntable capture.
          </p>

          {/* Quick Telemetry Trust Chips */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {[
              '20+ Studio Turntables',
              '60 FPS Slow-Motion',
              'Drop-Tested IP68 Hardware',
              '<4-Hr Guaranteed Spare Dispatch'
            ].map((chip, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.85)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00f0ff' }} />
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & SEARCH BAR */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2.5rem',
        padding: '1.25rem 1.5rem',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, rgba(12, 22, 46, 0.85) 0%, rgba(6, 12, 28, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(0, 240, 255, 0.22)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 35px rgba(0, 113, 186, 0.12)'
      }}>
        {/* Category Pills Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 1.05rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: isSelected ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(2, 132, 199, 0.4) 100%)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#00f0ff' : '#94a3b8',
                  boxShadow: isSelected ? '0 0 18px rgba(0, 240, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }
                }}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Turntable Global Speed Controller & Count Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: '1 1 240px', maxWidth: '380px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, OEM, tags, specs..."
              style={{
                width: '100%',
                padding: '0.45rem 2rem 0.45rem 2.25rem',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#00f0ff'; e.target.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.3)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'; e.target.style.boxShadow = 'none'; }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
            {/* Speed Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speed:</span>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '2px', 
                background: 'rgba(0, 0, 0, 0.45)', 
                padding: '3px', 
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }}>
                {[
                  { val: 0.75, label: '0.75x' },
                  { val: 1.0, label: '1x' },
                  { val: 1.5, label: '1.5x' }
                ].map(s => (
                  <button
                    key={s.val}
                    onClick={() => setPlaybackSpeed(s.val)}
                    style={{
                      padding: '0.25rem 0.55rem',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: playbackSpeed === s.val ? '#00f0ff' : 'transparent',
                      color: playbackSpeed === s.val ? '#050b14' : '#94a3b8',
                      boxShadow: playbackSpeed === s.val ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count Pill */}
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '4px 12px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
              {filteredProducts.length} Systems Active
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCT VIDEO MATRIX GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
        gap: '1.75rem',
        alignItems: 'stretch'
      }}>
        <AnimatePresence>
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{ 
                display: 'flex', 
                width: '100%'
              }}
            >
              <div
                data-card-index={idx}
                data-card-title={product.title}
                style={{
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  overflow: 'hidden',
                  padding: '1.35rem',
                  position: 'relative',
                  background: 'linear-gradient(165deg, rgba(13, 23, 48, 0.9) 0%, rgba(6, 12, 26, 0.96) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = product.accentColor || '#00f0ff';
                  e.currentTarget.style.boxShadow = `0 25px 60px rgba(0, 0, 0, 0.65), 0 0 30px ${product.accentColor ? `${product.accentColor}35` : 'rgba(0, 240, 255, 0.25)'}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Ambient Corner Accent Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${product.accentColor ? `${product.accentColor}40` : 'rgba(0, 240, 255, 0.25)'} 0%, transparent 70%)`,
                    filter: 'blur(25px)',
                    pointerEvents: 'none'
                  }}
                />

                {/* CARD HEADER: OEM & Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem', position: 'relative', zIndex: 2 }}>
                  <span style={{ 
                    fontSize: '0.70rem', 
                    letterSpacing: '0.08em', 
                    textTransform: 'uppercase', 
                    fontWeight: 800, 
                    color: product.accentColor || '#00f0ff',
                    background: `${product.accentColor ? `${product.accentColor}18` : 'rgba(0, 240, 255, 0.1)'}`,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${product.accentColor ? `${product.accentColor}45` : 'rgba(0, 240, 255, 0.35)'}`,
                    boxShadow: `0 0 10px ${product.accentColor ? `${product.accentColor}25` : 'rgba(0, 240, 255, 0.2)'}`
                  }}>
                    {product.oem}
                  </span>

                  <span style={{
                    fontSize: '0.70rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                    <span>{product.badgeText}</span>
                  </span>
                </div>

                {/* 360° TURNTABLE VIDEO BOX */}
                <div 
                  onClick={() => setActiveModalProduct(product)}
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '14px',
                    background: 'radial-gradient(circle at 50% 50%, #0d1a33 0%, #060d1c 75%, #02050c 100%)',
                    border: '1.5px solid rgba(0, 240, 255, 0.35)',
                    boxShadow: 'inset 0 2px 14px rgba(0, 0, 0, 0.9), 0 8px 24px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                  title="Click to inspect full-screen 360° model"
                >
                  {/* Cyber Corner Telemetry Brackets */}
                  <span style={{ position: 'absolute', top: '8px', left: '8px', width: '10px', height: '10px', borderTop: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff', zIndex: 4, pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', borderTop: '2px solid #00f0ff', borderRight: '2px solid #00f0ff', zIndex: 4, pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', bottom: '8px', left: '8px', width: '10px', height: '10px', borderBottom: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff', zIndex: 4, pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', width: '10px', height: '10px', borderBottom: '2px solid #00f0ff', borderRight: '2px solid #00f0ff', zIndex: 4, pointerEvents: 'none' }} />

                  {/* Top-Right Expand Button */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 5,
                    background: 'rgba(5, 11, 24, 0.92)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '6px',
                    borderRadius: '8px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease'
                  }}>
                    <Maximize2 size={12} />
                  </div>

                  {/* Glowing Hologram Pedestal Base */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    width: '85%',
                    height: '28px',
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse at center, ${product.accentColor ? `${product.accentColor}75` : 'rgba(0, 240, 255, 0.65)'} 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }} />

                  {/* 360° Slow-Motion Authentic Video Player with Viewport Stream Optimization */}
                  <TurntableVideoPlayer
                    src={product.videoUrl}
                    playbackSpeed={playbackSpeed}
                    accentColor={product.accentColor}
                    title={product.title}
                  />
                </div>

                {/* PRODUCT TITLE & SUBTITLE */}
                <h3 style={{
                  fontSize: '1.18rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '0.35rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.015em'
                }}>
                  {product.title}
                </h3>
                <p style={{
                  fontSize: '0.84rem',
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  marginBottom: '0.85rem',
                  minHeight: '2.5rem'
                }}>
                  {product.subtitle}
                </p>

                {/* KEY TAG PILLS */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
                  {product.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#cbd5e1'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* TELEMETRY STATS GRID (NumberTicker powered) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.6rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '1.25rem'
                }}>
                  {product.specs.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {spec.label}
                      </div>
                      <div style={{ fontSize: '0.90rem', fontWeight: 900, color: '#f1f5f9', display: 'flex', alignItems: 'baseline', gap: '2px', marginTop: '2px' }}>
                        <span>{spec.prefix || ''}</span>
                        <NumberTicker value={spec.val} decimalPlaces={typeof spec.val === 'number' && spec.val % 1 !== 0 ? 1 : 0} />
                        <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 700 }}>{spec.suffix}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ACTION ROW */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.95rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      color: '#ffffff',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                    }}
                  >
                    <span>Inspect 360°</span>
                    <Maximize2 size={13} />
                  </button>

                  <button
                    onClick={() => openDemoModal({ 
                      solution: `${product.title} (${product.oem})`, 
                      notes: `Inquiry for ${product.title}. Model: ${product.id}. OEM: ${product.oem}.` 
                    })}
                    style={{
                      padding: '0.6rem 1.15rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #0071ba 0%, #00b4d8 100%)',
                      border: 'none',
                      color: '#ffffff',
                      boxShadow: '0 4px 15px rgba(0, 113, 186, 0.4)',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 180, 216, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 113, 186, 0.4)';
                    }}
                  >
                    <span>Get RFQ</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FULLSCREEN 360 INSPECTION MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProduct(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(2, 6, 17, 0.88)',
              backdropFilter: 'blur(20px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '920px',
                borderRadius: '24px',
                background: 'linear-gradient(145deg, #0b1329 0%, #060b17 100%)',
                border: '1.5px solid rgba(0, 240, 255, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 240, 255, 0.2)',
                padding: '2rem',
                position: 'relative',
                maxHeight: '92vh',
                overflowY: 'auto'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              {/* Modal Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                
                {/* Left: Big Turntable Video Display */}
                <div>
                  <div style={{
                    width: '100%',
                    height: '380px',
                    borderRadius: '16px',
                    background: 'radial-gradient(circle at 50% 50%, #0d1527 0%, #060b17 75%, #02050c 100%)',
                    border: '1.5px solid rgba(0, 240, 255, 0.4)',
                    boxShadow: 'inset 0 2px 15px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <TurntableVideoPlayer
                      src={activeModalProduct.videoUrl}
                      playbackSpeed={playbackSpeed}
                      accentColor={activeModalProduct.accentColor}
                      inModal={true}
                      title={activeModalProduct.title}
                    />
                  </div>
                </div>

                {/* Right: Technical Specifications & OEM Integration */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: 800, 
                      letterSpacing: '0.08em', 
                      color: activeModalProduct.accentColor,
                      textTransform: 'uppercase'
                    }}>
                      {activeModalProduct.oem}
                    </span>
                    <span style={{ color: '#475569' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{activeModalProduct.categoryName}</span>
                  </div>

                  <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                    {activeModalProduct.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {activeModalProduct.subtitle}
                  </p>

                  {/* Blueprint Specifications */}
                  <div style={{ 
                    borderRadius: '12px', 
                    background: 'rgba(0, 0, 0, 0.35)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                      FACTORY INTEGRATION SPECS
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ color: '#64748b' }}>Controller: </span>
                        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{activeModalProduct.blueprint.controller}</span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Connectivity: </span>
                        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{activeModalProduct.blueprint.connectivity}</span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Protocols: </span>
                        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{activeModalProduct.blueprint.protocols}</span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>ROI Impact: </span>
                        <span style={{ color: '#10b981', fontWeight: 700 }}>{activeModalProduct.blueprint.roiMetric}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => {
                        const prod = activeModalProduct;
                        setActiveModalProduct(null);
                        openDemoModal({
                          solution: `${prod.title} (${prod.oem})`,
                          notes: `Requesting enterprise quote & on-site deployment verification for ${prod.title}.`
                        });
                      }}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        padding: '0.75rem 1.25rem',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        borderRadius: '10px'
                      }}
                    >
                      <span>Request Enterprise Quote & Demo</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

