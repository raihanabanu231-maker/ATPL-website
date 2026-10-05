import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Cpu, 
  Smartphone, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Barcode, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Mic,
  Monitor,
  ExternalLink,
  Target
} from 'lucide-react';

export const HardwareView = () => {
  const { openDemoModal } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Hardware Solutions' },
    { id: 'scanners', label: 'Scanning Solutions' },
    { id: 'printers', label: 'Printing Solutions' },
    { id: 'mobility', label: 'Mobility Edge & Tablets' },
    { id: 'rfid', label: 'RFID Systems & Gates' },
    { id: 'marking', label: 'Direct Part Marking & Laser' },
    { id: 'automation', label: 'Voice, Touch & Automation' }
  ];

  const hardwareProducts = [
    // 1. SCANNING SOLUTIONS
    {
      id: 'hw-scan-01',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Wired Barcode Scanner 1D / 2D',
      model: 'Honeywell Xenon XP 1950g',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-xenon-xp-1950g-barcode-scanner-2-1024x1024.jpg',
      badge: 'High-Accuracy 1D/2D',
      color: '#0071ba',
      desc: 'Superior wired scanning for retail, dispatch, and workstation environments. Captures even difficult-to-read, smudged, or damaged barcodes in milliseconds.',
      specs: [
        'Custom sensor optimized for aggressive barcode scanning',
        'Engineered to withstand 50 drops from 1.8 m (6 ft) to concrete',
        'Accurate decode on smartphone screens and curved packaging',
        'Plug-and-play USB, RS-232, and Keyboard Wedge interfaces'
      ]
    },
    {
      id: 'hw-scan-02',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Wireless Cordless Scanner 1D / 2D',
      model: 'Honeywell Xenon XP 1952g',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/Honeywell_Xenon_XP_1952g_black_3-4-pres-black-1952g-Presentation-CCB-1024x1024.jpg',
      badge: 'Cordless Mobility',
      color: '#E85874',
      desc: 'Freedom of movement around POS terminals, conveyor lines, warehouse dispatch bays, and manufacturing assembly cells with ultra-long battery life.',
      specs: [
        'Bluetooth Class 1 radio with up to 100-meter operating range',
        'Battery-free supercapacitor or high-capacity Lithium-Ion options',
        'Scans over 50,000 barcodes on a single full charge',
        'Presentation charging base with instant auto-dock pairing'
      ]
    },
    {
      id: 'hw-scan-03',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Industrial High Performance Scanner',
      model: 'Granit XP 1991i Ultra-Rugged',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/Granit-XP-1991i-cordless-base-topleftangle-1.jpg',
      badge: '3.0m Drop Spec (IP67)',
      color: '#00a651',
      desc: 'Rock-solid durability engineered to withstand harsh punishment from loading docks, fork trucks, freezing environments, and outdoor chemical exposure.',
      specs: [
        'Survives 3.0 m (10 ft) drops to concrete and 7,000 1-meter tumbles',
        'IP65 and IP67 sealed against dust and water immersion',
        'Operating temperature down to -30°C for cold chain facilities',
        'Ultra-high resolution sensor for tiny electronic PCB barcodes'
      ]
    },
    {
      id: 'hw-scan-04',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Handsfree Presentation Scanner',
      model: 'Honeywell HF680 2D Imager',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/honeywell-hf-680-2d-barcode-scanner-373476660-wyi3f.jpg',
      badge: 'Handsfree POS & QC',
      color: '#0071ba',
      desc: 'Point-of-sale hands-free presentation scanner delivering rapid throughput for retail checkouts, supermarket counters, and inspection stations.',
      specs: [
        'Hybrid imaging technology for seamless scanning of print & digital screens',
        'Subtle white LED illumination reduces eye fatigue during long shifts',
        'Wide scanning angle up to 60° deflection for instant pass-by reads',
        'Compact form factor suited for space-constrained operator desks'
      ]
    },
    {
      id: 'hw-scan-05',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Wearable Hands-Free Ring Scanner',
      model: 'Honeywell 8680i Smart Wearable',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/Honeywell-8680i-honeywell.jpg',
      badge: 'Ergonomic Wearable',
      color: '#E85874',
      desc: 'Compact, high-performance wearable scanner that eliminates wasted motion of picking up and putting down handheld devices, boosting pick speed by 30%.',
      specs: [
        'Customizable display for step-by-step picking and sort instructions',
        'Wi-Fi and Bluetooth direct connectivity to enterprise WMS',
        'Lightweight ergonomic finger and glove mount assemblies',
        'High-density 1D/2D scanning with aggressive motion tolerance'
      ]
    },
    {
      id: 'hw-scan-06',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Direct Part Mark (DPM) Scanner',
      model: 'Honeywell 1920i Industrial DPM',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/1920i_1-600x600-1.jpg',
      badge: 'DPM & Dot-Peen',
      color: '#f59e0b',
      desc: 'Decodes Direct Part Marks (DPM) on curved metal, cast iron, engine blocks, aerospace components, and pharmaceutical medical implants.',
      specs: [
        'Multi-illumination system (diffuse, direct, darkfield lighting)',
        'Decodes laser-etched, dot-peen, and chemical-etched DataMatrix codes',
        'Rugged industrial housing withstands extreme shopfloor conditions',
        'Certified ISO/IEC 15415 & AS9132 grading support'
      ]
    },
    {
      id: 'hw-scan-07',
      category: 'scanners',
      categoryName: 'Scanning Solutions',
      name: 'Vision & Fixed Conveyor Scanner',
      model: 'Fixed Mount Conveyor Scanner',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/fixedcoveyor.jpg',
      badge: 'High-Speed Conveyor',
      color: '#00a651',
      desc: 'Lightweight, durable fixed-mount scanning unit designed for automated carton sortation, packaging conveyor lines, and smart kiosk integration.',
      specs: [
        'Built-in AI optical engine capturing items in continuous motion',
        'Integrated I/O for photo-eyes, external triggers, and warning stack lights',
        'Decodes up to 600 items/minute on high-speed conveyor belts',
        'Network-ready with Ethernet/IP and Modbus industrial protocols'
      ]
    },

    // 2. PRINTING SOLUTIONS
    {
      id: 'hw-print-01',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'Desktop Barcode & Label Printer',
      model: 'TSC TX200 Series',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/tsc-tx200-barcode-printer.png',
      badge: 'Precision Desktop',
      color: '#0071ba',
      desc: 'High-performance desktop thermal transfer printer engineered for shipping labels, product identification, compliance barcodes, and asset tags.',
      specs: [
        'Print speeds up to 8 inches per second with 203 / 300 DPI resolution',
        'Holds 300-meter ribbon supply on a 1-inch core',
        '3.5-inch color TFT display for easy standalone configuration',
        'Supports TSPL-EZ, EPL, ZPL, and DMX printer command languages'
      ]
    },
    {
      id: 'hw-print-02',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'Rugged Mobile Label Printer',
      model: 'Honeywell RP4 / RP2 Series',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-RP4_Fiji-2.png',
      badge: 'Portable On-Demand',
      color: '#E85874',
      desc: 'Ultra-rugged mobile receipt and label printer designed for route delivery, warehouse cross-docking, and roadside enforcement labeling.',
      specs: [
        'Withstands 2.0 m (6.6 ft) drops and severe vibrations',
        'Prints 4-inch wide direct thermal labels and receipts on the go',
        'Fast thermal print engine up to 5 inches per second',
        'Wi-Fi 802.11 a/b/g/n and Bluetooth 4.0 wireless sync'
      ]
    },
    {
      id: 'hw-print-03',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'Industrial Mid-Range Printer',
      model: 'Honeywell PD4500B Industrial',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-03-PD4500B-scaled.jpg',
      badge: 'All-Metal 24/7 Chassis',
      color: '#00a651',
      desc: 'Ergonomic all-metal chassis engineered for manufacturing, logistics, and healthcare label printing with anti-wrinkle ribbon sensors.',
      specs: [
        'Heavy-duty all-metal mechanism for non-stop multi-shift printing',
        'Patented dual-sensor technology ensuring accurate label calibration',
        'Supports Smart Printing without requiring an external host PC',
        'Available with automatic peel, rewind, and rotary cutter assemblies'
      ]
    },
    {
      id: 'hw-print-04',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'Industrial High-Speed RFID Printer',
      model: 'Printronix T6000e Enterprise RFID',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/T6000e-4_-Left-Label.jpg',
      badge: 'UHF RFID & ODV Verifier',
      color: '#f59e0b',
      desc: 'Enterprise RFID encoding printer capable of high-speed UHF tag encoding for standard paper carton labels and thick on-metal asset tracking tags.',
      specs: [
        'Encodes standard and on-metal RFID tags with sub-millimeter precision',
        'Optional inline 1D/2D ODV barcode verifier grading labels to ISO standards',
        'High throughput printing up to 14 inches per second at 600 DPI',
        'Direct connection to SAP S/4HANA and Oracle ERP without middleware'
      ]
    },
    {
      id: 'hw-print-05',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'High-Performance Data Visualization Printer',
      model: 'Honeywell PM45 / PM45C Industrial',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-PSS_PM45C_Industrial-Printer_Main_screen_highres-scaled.jpg',
      badge: 'Precision Calibration',
      color: '#0071ba',
      desc: 'Precision industrial printer built with smart diagnostics, predictive maintenance telemetry, and zero-defect barcode label generation.',
      specs: [
        'Print registration down to ±0.5 mm for tiny component labels',
        'Full color touch screen with real-time health and ribbon analytics',
        'WWAN 4G LTE cellular connectivity for remote plant locations',
        'Thermal transfer and direct thermal operation with 203/300/600 DPI'
      ]
    },
    {
      id: 'hw-print-06',
      category: 'printers',
      categoryName: 'Printing Solutions',
      name: 'Secure ID Card Personalization Printer',
      model: 'Fargo HDP6600xe High Definition',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/fargo-hdp6600xe-id-card-printer-base.jpg',
      badge: 'Re-Transfer High-Res',
      color: '#8b5cf6',
      desc: 'High-definition re-transfer card printer producing crisp, edge-to-edge employee badges, access control RFID smart cards, and visitor passes.',
      specs: [
        'High Definition 600 DPI re-transfer printing for brilliant photographic cards',
        'High-speed throughput printing up to 230 cards per hour',
        'Inline encoding for contactless smart cards (Mifare, HID, RFID)',
        'Eco-friendly wasteless lamination technology'
      ]
    },

    // 3. MOBILITY EDGE SOLUTIONS
    {
      id: 'hw-mob-01',
      category: 'mobility',
      categoryName: 'Mobility Edge & Tablets',
      name: 'Rugged Field Mobility Computer',
      model: 'Honeywell CT45 / CT45 XP',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-CT-45_Upright-Angle-Left_w-Screen2_7987_highres-1-scaled.jpg',
      badge: 'Mobility Edge Platform',
      color: '#0071ba',
      desc: 'Built on the unified Mobility Edge platform with FlexRange scan engine, providing extreme reliability for field logistics and frontline shopfloor teams.',
      specs: [
        'Qualcomm octa-core processor guaranteed support through Android 15',
        'FlexRange imager capturing barcodes from near contact to 10 meters',
        'Full HD 5.0-inch daylight readable Gorilla Glass 5 screen',
        'Wi-Fi 6 and 4G/5G standalone voice and high-speed data'
      ]
    },
    {
      id: 'hw-mob-02',
      category: 'mobility',
      categoryName: 'Mobility Edge & Tablets',
      name: 'Enterprise Keypad Mobile Computer',
      model: 'Honeywell EDA61K Handheld',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-EDA61K-1-scaled.jpg',
      badge: 'Physical Keypad & Touch',
      color: '#E85874',
      desc: 'Ergonomically balanced mobile computer with physical numeric/alphanumeric keypad, ideal for fast warehouse inventory data entry with gloved hands.',
      specs: [
        'Physical 34-key numeric or 47-key alphanumeric backlit keypad',
        '7,000mAh extended battery lasting 25+ hours across 3 full shifts',
        'Extended read range up to 15 meters for high-bay pallet racking',
        'IP65 rated for dust and water resistance with 1.5m drop durability'
      ]
    },
    {
      id: 'hw-mob-03',
      category: 'mobility',
      categoryName: 'Mobility Edge & Tablets',
      name: 'Ultra-Rugged Warehouse Handheld',
      model: 'Honeywell CK65 Mobile Computer',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-ck65-mobile-computers-38-scaled.jpg',
      badge: '3.0m Drop / IP68 Rated',
      color: '#00a651',
      desc: 'The industry-standard ultra-rugged computer designed for the most demanding warehouse distribution centers and automated factory operations.',
      specs: [
        'Withstands 3.0 m (10 ft) drops to concrete across full temperature range',
        'FlexRange EX20 imager reading barcodes from 10 cm up to 20 meters away',
        'Pre-licensed and pre-loaded client for TE (Terminal Emulation) & WMS',
        'Hot-swap battery allows replacement without rebooting or losing session data'
      ]
    },
    {
      id: 'hw-mob-04',
      category: 'mobility',
      categoryName: 'Mobility Edge & Tablets',
      name: 'Cold Storage Freezer Handheld',
      model: 'Honeywell CK65 Cold Storage',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-CK65-Cold-Storage-Numeric-scaled.jpg',
      badge: '-30°C Cold Chain',
      color: '#00f0ff',
      desc: 'Equipped with internal heating elements and specialized low-temperature battery chemistry for seamless transitions between freezers and ambient docks.',
      specs: [
        'Internal screen defogger and window heaters for fog-free scanning',
        'Operates continuously at -30°C (-22°F) cold storage environments',
        'Specialized freezer battery pack designed for sub-zero capacity',
        'Large keys easily operated with heavy thermal work gloves'
      ]
    },
    {
      id: 'hw-mob-05',
      category: 'mobility',
      categoryName: 'Mobility Edge & Tablets',
      name: 'Industrial Rugged Vehicle Tablet',
      model: 'Honeywell RT10A / RT10W Rugged Tablet',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-RT10A_Castellini_2021_1MAN0719-1024x683.jpg',
      badge: '10.1" Rugged Screen',
      color: '#f59e0b',
      desc: 'Rugged 10.1-inch tablet for forklift vehicle mounting, supervisor plant audits, and mobile field engineering with near/far barcode scanning.',
      specs: [
        'Bright 10.1-inch 800 nits high-visibility sunlight readable display',
        'Integrated FlexRange barcode scanner for fast forklift dock scans',
        'Vehicle docking station with direct ignition wire and antenna pass-through',
        'Available in Android (RT10A) and Windows 10/11 IoT (RT10W) platforms'
      ]
    },

    // 4. RFID SYSTEMS
    {
      id: 'hw-rfid-01',
      category: 'rfid',
      categoryName: 'RFID Systems & Gates',
      name: 'Mobile UHF RFID Sled Reader',
      model: 'Honeywell IH45 / IH40 RFID Gun',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-IH45_CT30P-IH40-BRS_Angle.860.png',
      badge: '1,000+ Tags/Sec Sled',
      color: '#E85874',
      desc: 'Ergonomic RFID pistol sled pairing seamlessly with mobile computers, reading up to 1,000 RFID tags per second for fast inventory cycle counts.',
      specs: [
        'Reads RFID tags up to 9+ meters (30 ft) away in crowded warehouse aisles',
        'Direct eConn snap-in connection to CT40, CT45, and CT30 XP terminals',
        '4,000mAh dedicated battery ensures uninterrupted full-shift scanning',
        'Lightweight design eliminates wrist fatigue during extensive auditing'
      ]
    },
    {
      id: 'hw-rfid-02',
      category: 'rfid',
      categoryName: 'RFID Systems & Gates',
      name: 'Heavy-Duty RFID Forklift & Portal Antenna',
      model: 'AN4x Ultra-Rugged UHF Antenna Array',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/an4x-front-facing-3x2-3600-scaled.jpg',
      badge: 'IP67 Portal Array',
      color: '#0071ba',
      desc: 'High-gain circular polarized antenna engineered specifically for high-vibration forklift mounting and warehouse dock door portal enclosures.',
      specs: [
        'Vibration and shock resistant casing compliant with industrial mobile specs',
        'Wide beam angle ensuring reliable tag capture across broad dock bays',
        'No welding or drilling needed with universal bolt pattern brackets',
        'Operating temperature range from -40°C to +70°C'
      ]
    },
    {
      id: 'hw-rfid-03',
      category: 'rfid',
      categoryName: 'RFID Systems & Gates',
      name: 'Fixed Multi-Port UHF RFID Reader',
      model: 'Honeywell IF2 Enterprise RFID Controller',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-if2-rfid-2-scaled.jpg',
      badge: 'Fixed Gate Controller',
      color: '#00a651',
      desc: 'Compact, cost-effective network-ready fixed RFID reader for dock doors, conveyor choke points, assembly work cells, and automated tool cribs.',
      specs: [
        '4-port RF antenna outputs with Power over Ethernet (PoE) support',
        'General Purpose I/O (GPIO) for direct interface with light stacks and sensors',
        'Embedded tag filtering software reduces network traffic to backend ERP',
        'Certified for EPCglobal Gen 2 and ISO 18000-6C international standards'
      ]
    },
    {
      id: 'hw-rfid-04',
      category: 'rfid',
      categoryName: 'RFID Systems & Gates',
      name: 'Industrial On-Metal & High-Temp RFID Tags',
      model: 'Max Rigid Engineered Tags',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/Max_Rigid_Thumbnail_V2___03247.jpg',
      badge: 'On-Metal & 250°C Rated',
      color: '#f59e0b',
      desc: 'Rugged encapsulated RFID tags engineered to withstand direct metal mounting, automotive paint shop ovens, acid washdown, and harsh outdoor storage.',
      specs: [
        'High temperature tolerance up to +250°C for foundry and autoclave cycles',
        'Tough encapsulation resists impact, oil, diesel, and caustic chemicals',
        'Long read range up to 12 meters on metallic steel coils and shipping containers',
        'Available with screw mounting, magnetic backing, or industrial rivet holes'
      ]
    },

    // 5. DIRECT MARKING & LASER
    {
      id: 'hw-mark-01',
      category: 'marking',
      categoryName: 'Direct Part Marking & Laser',
      name: 'Industrial Fiber Laser Marking Machine',
      model: 'Forbes Macsa BMFD Fiber Laser',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/forbes_macsa_packaginglasers_bmfd_packaging.jpg',
      badge: 'Zero-Consumable Laser',
      color: '#0071ba',
      desc: 'Chiller-free high-speed fiber laser marking system for permanent engraving, annealing, and high-contrast DataMatrix etching on metals and engineered plastics.',
      specs: [
        'Zero consumables and zero maintenance downtime with 100,000-hour diode life',
        'Marks metals, coated glass, fiberglass, cast iron, and high-density polymers',
        'Permanent traceability resistant to heat, friction, solvent, and weathering',
        'Real-time automated serialization, GS1 DataMatrix, and batch timestamping'
      ]
    },
    {
      id: 'hw-mark-02',
      category: 'marking',
      categoryName: 'Direct Part Marking & Laser',
      name: 'Industrial CO2 Packaging Laser Coder',
      model: 'Forbes Macsa iCON-30 CO2 Laser',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/Icon-10_Icon-30-1.jpg',
      badge: 'Fly-Marking for Packaging',
      color: '#E85874',
      desc: 'Designed for high-duty cycle Fly-Marking-Applications (FMA) on high-speed bottling, pharmaceutical cartons, PVC pipes, and food packaging lines.',
      specs: [
        'Marks on moving production lines without touching the product',
        'Crisp permanent codes on PET bottles, paperboard, acrylic, and films',
        'Eliminates messy ink spills, solvent vapors, and nozzle clogging',
        'Compact laser head mounts seamlessly into existing packaging conveyors'
      ]
    },
    {
      id: 'hw-mark-03',
      category: 'marking',
      categoryName: 'Direct Part Marking & Laser',
      name: 'Hyperfine UV Laser Marking Machine',
      model: 'Industrial UV Laser Cold Marker',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/UV-LASER-600x500.jpg',
      badge: 'Hyperfine Cold Marking',
      color: '#00a651',
      desc: 'Ultra-small focal spot with minimal thermal heat-affected zone, delivering damage-free cold marking on sensitive electronics, silicone, and thin medical plastics.',
      specs: [
        'Cold processing laser avoids burning, melting, or micro-cracking substrates',
        'Ideal for medical catheters, silicon wafers, glass vials, and microchips',
        'Extremely crisp microscopic 2D codes down to 0.5 mm x 0.5 mm',
        'High energy efficiency with ultra-low power consumption'
      ]
    },
    {
      id: 'hw-mark-04',
      category: 'marking',
      categoryName: 'Direct Part Marking & Laser',
      name: 'Pneumatic Dot Peen Pin Marker',
      model: 'Telesis TMP1000 Pinstamp Marker',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/TMP1000_600-x-600-600x500.jpg',
      badge: 'Pneumatic Heavy Impact',
      color: '#f59e0b',
      desc: 'Indents deep, permanent characters and 2D DataMatrix dots into steel, cast alloys, and aluminum automotive chassis that remain legible even after painting.',
      specs: [
        'Floating pin technology automatically contours over uneven and curved surfaces',
        'Deep indentations withstand shot blasting, galvanizing, and thick powder coating',
        'Compact footprint easily mounted on robotic arms or benchtop stands',
        'Integrated controller with pre-loaded automotive VIN marking algorithms'
      ]
    },

    // 6. VOICE, TOUCH & AUTOMATION
    {
      id: 'hw-auto-01',
      category: 'automation',
      categoryName: 'Voice, Touch & Automation',
      name: 'Industrial Voice Directed Picking Headset',
      model: 'Honeywell SRX3 Wireless Headset',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/sps-ppr-SRX3-Headset-noHeadband-1536x1356.jpg',
      badge: 'Hands-Free Voice DC',
      color: '#0071ba',
      desc: 'Hands-free, eyes-free voice recognition headset directing warehouse picking and sorting in high-noise distribution centers with multi-lingual AI.',
      specs: [
        'Advanced SoundSense active noise cancellation eliminating 99% background noise',
        'Flip-to-mute microphone with multi-lingual speech-to-text recognition',
        'Shared operational electronics with individual hygienic headband pads',
        'Withstands freezer temperatures down to -30°C and 2.0m drops to concrete'
      ]
    },
    {
      id: 'hw-auto-02',
      category: 'automation',
      categoryName: 'Voice, Touch & Automation',
      name: 'Smart Interactive Self-Service Kiosk',
      model: 'Agilysys Enterprise Kiosk Terminal',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/agilysys-kiosk-800x600.jpg',
      badge: 'Touch Kiosk & Scanner',
      color: '#E85874',
      desc: 'Heavy-duty self-service kiosk with integrated PCAP touch monitor, barcode scanner, RFID card reader, and thermal receipt printer for check-in and dispatch.',
      specs: [
        'Toughened shatter-resistant PCAP multi-touch glass screen',
        'Internal industrial PC supporting Windows 10/11 IoT and Linux',
        'Modular pedestal stand with floor bolting and cable management',
        'Integrated QR scanner, badge reader, and thermal printer'
      ]
    },
    {
      id: 'hw-auto-03',
      category: 'automation',
      categoryName: 'Voice, Touch & Automation',
      name: 'Shopfloor PLC Automation & In-Line Reject Gates',
      model: 'ATPL Industrial PLC Control Unit',
      image: 'https://atplgroup.com/wp-content/uploads/2024/02/PLC-AUTOMATION.jpg',
      badge: 'PLC / HMI Integration',
      color: '#00a651',
      desc: 'Automates industrial shopfloor processes, synchronizing barcode scanners, RFID readers, vision inspection cameras, and pneumatic reject diverters.',
      specs: [
        'High-speed fieldbus communications via Profinet, Ethernet/IP, and Modbus TCP',
        'Sub-millisecond pneumatic reject diverter triggers for defective cartons',
        'Fail-safe safety interlocks adhering to ISO 13849 machinery directives',
        'Bi-directional synchronization with ATPL Perfect Trace & SAP ERP'
      ]
    }
  ];

  const filteredHardware = activeCategory === 'all'
    ? hardwareProducts
    : hardwareProducts.filter(h => h.category === activeCategory);

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: '#060b14' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(232, 88, 116, 0.1)',
            border: '1px solid rgba(232, 88, 116, 0.35)',
            color: '#E85874',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} color="#E85874" />
            <span>AUTHENTIC ATPL AIDC & SENSOR HARDWARE</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
            Enterprise Hardware Built for <span className="gradient-text">Demanding Factory Floors</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '2.25rem' }}>
            Archery Technocrats designs, sources, and commissions enterprise-grade AIDC hardware engineered for 24/7 reliability in automotive foundries, sterile pharmaceutical cleanrooms, and high-velocity fulfillment centers.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '920px',
            margin: '0 auto'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: activeCategory === cat.id ? '#E85874' : 'rgba(255, 255, 255, 0.05)',
                  border: activeCategory === cat.id ? '2px solid #E85874' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(232, 88, 116, 0.45)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hardware Grid with Real Images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          marginTop: '2.5rem'
        }}>
          {filteredHardware.map(hw => (
            <div
              key={hw.id}
              className="glass-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(11, 21, 40, 0.85)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = hw.color;
                e.currentTarget.style.boxShadow = `0 15px 35px ${hw.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Product Image Frame */}
                <div style={{
                  height: '230px',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.25rem',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={hw.image} 
                    alt={hw.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    border: `1px solid ${hw.color}`,
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {hw.badge}
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.75rem' }}>
                  <div style={{
                    fontSize: '0.78rem',
                    color: hw.color,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.04em'
                  }}>
                    {hw.categoryName} • {hw.model}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.65rem', fontWeight: 700 }}>
                    {hw.name}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {hw.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    {hw.specs.map((spec, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                        <CheckCircle2 size={14} color={hw.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
                <button
                  onClick={() => openDemoModal({ solution: `${hw.name} (${hw.model})`, notes: `Hardware RFQ and sample evaluation request for ${hw.model}` })}
                  style={{
                    width: '100%',
                    backgroundColor: '#E85874',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(232, 88, 116, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d44360';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(232, 88, 116, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#E85874';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(232, 88, 116, 0.35)';
                  }}
                >
                  <span>Request RFQ & Site Survey</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Integration & Consumables Banner */}
        <div className="glass-card" style={{ padding: '2.5rem 3rem', background: 'rgba(8, 17, 34, 0.85)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>TURNKEY CONSUMABLES & TAGS</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Specialized RFID Tags, Barcode Labels & Thermal Ribbons
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', margin: 0, maxWidth: '750px', lineHeight: 1.6 }}>
              We supply ISO/IEC compliant tamper-evident barcode labels, metal-mount UHF RFID tags, chemical-resistant tags for pharma autoclaves, and high-resin thermal transfer ribbons.
            </p>
          </div>

          <button
            onClick={() => openDemoModal({ solution: 'Consumables & Labels RFQ', notes: 'Inquiry for specialized RFID tags, labels, and ribbons.' })}
            className="btn btn-secondary"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>Request Consumables Catalog</span>
          </button>
        </div>

      </div>
    </div>
  );
};
