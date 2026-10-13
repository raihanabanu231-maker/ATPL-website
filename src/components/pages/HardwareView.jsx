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
import { PageHeroBackdrop, HeroFilterPill } from '../common/PageHeroBackdrop';

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
      oem: 'Honeywell',
      image: 'https://s7d1.scene7.com/is/image/Honeywell65/sps-ppr-1950g-barcode-scanner',
      fallbackImage: '/assets/images/hw_handheld_scanner.jpg',
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
      oem: 'Honeywell',
      image: 'https://s7d1.scene7.com/is/image/Honeywell65/sps-ppr-1952g-barcode-scanner',
      fallbackImage: '/assets/images/hw_cordless_scanner.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/granit-xp-1991i-xlr-and-cordless-base-left',
      fallbackImage: '/assets/images/hw_handheld_scanner.jpg',
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
      oem: 'Honeywell',
      image: 'https://s7d1.scene7.com/is/image/Honeywell65/sps-ppr-hf680-primary-image',
      fallbackImage: '/assets/images/hw_presentation_scanner.jpg',
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
      oem: 'Honeywell',
      image: 'https://s7d1.scene7.com/is/image/Honeywell65/sps-ppr-8680i-mobile-computer',
      fallbackImage: '/assets/images/hw_voice_headset.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/granit-xp-1991i-xlr-and-cordless-base-left',
      fallbackImage: '/assets/images/hw_laser_marking.jpg',
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
      oem: 'Cognex / ATPL',
      image: '/assets/images/hw_fixed_conveyor.jpg',
      fallbackImage: '/assets/images/atpl_ai_vision_inspection.jpg',
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
      model: 'TSC TX200 / TX210 Series',
      oem: 'TSC Auto ID',
      image: 'https://in.tscprinters.com/sites/in.tscprinters.com/files/styles/product_slider/public/2021-03/tx210_0.png',
      fallbackImage: '/assets/images/hw_desktop_printer.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/rp2f-primary',
      fallbackImage: '/assets/images/hw_mobile_printer.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/sps-ppr-pm45a-primary',
      fallbackImage: '/assets/images/hw_desktop_printer.jpg',
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
      oem: 'Printronix Auto ID',
      image: 'https://usca.tscprinters.com/sites/usca.tscprinters.com/files/styles/product_slider/public/2024-03/tsc-auto-id-rfid-label-printer-enterprise-industrial-t6000e.png',
      fallbackImage: '/assets/images/atpl_labeler_hardware.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/sps-ppr-pm45a-primary',
      fallbackImage: '/assets/images/hw_desktop_printer.jpg',
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
      oem: 'HID Global Fargo',
      image: '/assets/images/atpl_labeler_hardware.jpg',
      fallbackImage: '/assets/images/hw_desktop_printer.jpg',
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
      oem: 'Honeywell',
      image: 'https://s7d1.scene7.com/is/image/Honeywell65/sps-ppr-ct45-ct45xp-mobile-computer-image-3',
      fallbackImage: '/assets/images/hw_rugged_handheld.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/hon-ia-pss-ck65-cs-primary',
      fallbackImage: '/assets/images/hw_rugged_handheld.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/hon-ia-pss-ck65-cs-primary',
      fallbackImage: '/assets/images/hw_rugged_handheld.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/hon-ia-pss-ck65-cs-primary',
      fallbackImage: '/assets/images/hw_rugged_handheld.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/sps-ppr-rt10w-mobile-computer',
      fallbackImage: '/assets/images/hw_rugged_handheld.jpg',
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
      oem: 'Honeywell',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/sps-pss-IH45-primary-1200x798',
      fallbackImage: '/assets/images/hw_rfid_portal.jpg',
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
      model: 'Zebra AN480 Ultra-Rugged UHF Antenna Array',
      oem: 'Zebra Technologies',
      image: 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web005/an480-antenna-photography-website-product-facing-front-3x2-3600x2400.jpg',
      fallbackImage: '/assets/images/hw_rfid_portal.jpg',
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
      model: 'Zebra FX9600 Enterprise RFID Controller',
      oem: 'Zebra Technologies',
      image: 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/product-cards/model/fx9600-3x2-3600.jpg',
      fallbackImage: '/assets/images/atpl_rfid_portal_showcase.jpg',
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
      oem: 'Omni-ID / Confidex',
      image: '/assets/images/atpl_rfid_portal_showcase.jpg',
      fallbackImage: '/assets/images/hw_rfid_portal.jpg',
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
      oem: 'Macsa ID / Forbes',
      image: '/assets/images/hw_laser_marking.jpg',
      fallbackImage: '/assets/images/atpl_labeler_hardware.jpg',
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
      oem: 'Macsa ID / Forbes',
      image: '/assets/images/atpl_ai_vision_inspection.jpg',
      fallbackImage: '/assets/images/hw_laser_marking.jpg',
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
      oem: 'Macsa ID',
      image: '/assets/images/hw_vision_camera.jpg',
      fallbackImage: '/assets/images/hw_laser_marking.jpg',
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
      oem: 'Telesis Technologies',
      image: '/assets/images/story_automotive.jpg',
      fallbackImage: '/assets/images/hw_laser_marking.jpg',
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
      oem: 'Honeywell Voice',
      image: 'https://honeywell.scene7.com/is/image/Honeywell65/A730-SRX3-Shadow',
      fallbackImage: '/assets/images/hw_voice_headset.jpg',
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
      oem: 'Agilysys / ATPL',
      image: '/assets/images/atpl_connected_3d_twin.jpg',
      fallbackImage: '/assets/images/hw_fixed_conveyor.jpg',
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
      oem: 'Archery Technocrats',
      image: '/assets/images/hw_fixed_conveyor.jpg',
      fallbackImage: '/assets/images/atpl_factory_3d_interior.jpg',
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

  const renderHardwareIcon = (category, size = 48, color = '#0071ba') => {
    switch (category) {
      case 'scanners':
        return <Barcode size={size} color={color} strokeWidth={2} />;
      case 'printers':
        return <Printer size={size} color={color} strokeWidth={2} />;
      case 'mobility':
        return <Smartphone size={size} color={color} strokeWidth={2} />;
      case 'rfid':
        return <Radio size={size} color={color} strokeWidth={2} />;
      case 'marking':
        return <Target size={size} color={color} strokeWidth={2} />;
      case 'automation':
        return <Cpu size={size} color={color} strokeWidth={2} />;
      default:
        return <Barcode size={size} color={color} strokeWidth={2} />;
    }
  };

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: 'transparent' }}>
      <div className="container">
        
        {/* Dynamic Radiant Page Hero Backdrop */}
        <PageHeroBackdrop
          badgeIcon={Sparkles}
          badgeText="AUTHENTIC ATPL AIDC & SENSOR HARDWARE"
          badgeColor="#E85874"
          accentColor="#E85874"
          secondaryGlow="#00f0ff"
          systemTag="[ SHOPFLOOR RIGS // 24/7 FACTORY TOUGH ]"
          title="Enterprise Hardware Built for"
          highlightText="Demanding Factory Floors"
          description="Archery Technocrats designs, sources, and commissions enterprise-grade AIDC hardware engineered for 24/7 reliability in automotive foundries, sterile pharmaceutical cleanrooms, and high-velocity fulfillment centers."
        >
          {categories.map(cat => (
            <HeroFilterPill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setTimeout(() => {
                  const el = document.getElementById('hardware-cards-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
              label={cat.label}
              accentColor="#E85874"
            />
          ))}
        </PageHeroBackdrop>

        {/* Responsive Hardware Grid Styling (2-Column on larger phones, smaller images) */}
        <style>{`
          .hw-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.75rem;
            margin-bottom: 3.5rem;
            margin-top: 2rem;
            scroll-margin-top: 6rem;
          }
          .hw-card-img-frame {
            height: 220px;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            transition: height 0.3s ease;
          }
          .hw-card-body {
            padding: 1.5rem;
          }
          .hw-card-footer {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
          /* 2-Column Grid on Larger Phones & Tablets (440px - 768px) */
          @media (max-width: 768px) and (min-width: 440px) {
            .hw-cards-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 0.75rem !important;
              margin-top: 1rem !important;
              margin-bottom: 2rem !important;
            }
            .hw-card-img-frame {
              height: 135px !important;
            }
            .hw-card-body {
              padding: 0.85rem !important;
            }
            .hw-card-body h3 {
              font-size: 0.95rem !important;
              margin-bottom: 0.35rem !important;
              line-height: 1.25 !important;
            }
            .hw-card-desc {
              display: -webkit-box !important;
              -webkit-line-clamp: 2 !important;
              -webkit-box-orient: vertical !important;
              overflow: hidden !important;
              font-size: 0.76rem !important;
              line-height: 1.35 !important;
              margin-bottom: 0.65rem !important;
            }
            .hw-card-specs {
              display: none !important;
            }
            .hw-card-footer {
              padding: 0 0.85rem 0.85rem 0.85rem !important;
            }
            .hw-card-btn {
              padding: 0.5rem 0.65rem !important;
              font-size: 0.76rem !important;
              min-height: 44px !important;
              gap: 0.25rem !important;
            }
            .hw-oem-badge {
              top: 6px !important;
              left: 6px !important;
              padding: 0.15rem 0.4rem !important;
              font-size: 0.6rem !important;
            }
            .hw-spec-badge {
              top: 6px !important;
              right: 6px !important;
              padding: 0.15rem 0.45rem !important;
              font-size: 0.62rem !important;
            }
            .hw-cat-tag {
              bottom: 6px !important;
              left: 6px !important;
              padding: 0.15rem 0.4rem !important;
              font-size: 0.6rem !important;
            }
          }
          /* Compact View on Smaller Phones (< 440px) */
          @media (max-width: 439px) {
            .hw-cards-grid {
              grid-template-columns: 1fr !important;
              gap: 1.15rem !important;
              margin-top: 1rem !important;
              margin-bottom: 2rem !important;
            }
            .hw-card-img-frame {
              height: 155px !important;
            }
            .hw-card-body {
              padding: 1rem !important;
            }
            .hw-card-footer {
              padding: 0 1rem 1rem 1rem !important;
            }
            .hw-card-specs-item:nth-child(n+3) {
              display: none !important;
            }
          }
        `}</style>

        {/* Hardware Grid with Real Images */}
        <div id="hardware-cards-grid" className="hw-cards-grid">
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
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = hw.color;
                e.currentTarget.style.boxShadow = `0 22px 50px -10px ${hw.color}50, 0 0 30px ${hw.color}35`;
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
                const topBar = e.currentTarget.querySelector('.hw-card-top-glow');
                if (topBar) topBar.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                const topBar = e.currentTarget.querySelector('.hw-card-top-glow');
                if (topBar) topBar.style.opacity = '0';
              }}
            >
              {/* Vibrant Top Luminous Highlight Beam */}
              <div 
                className="hw-card-top-glow"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, transparent 0%, ${hw.color} 50%, transparent 100%)`,
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  zIndex: 10,
                  boxShadow: `0 0 16px ${hw.color}`
                }}
              />

              <div>
                {/* Product Image Frame */}
                <div 
                  className="hw-card-img-frame"
                  style={{
                    backgroundColor: hw.image.startsWith('http') ? '#ffffff' : '#0a1628'
                  }}
                >
                  {/* Real Product Image */}
                  <img 
                    src={hw.image} 
                    alt={hw.model || hw.name || 'ATPL Industrial Hardware'}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: hw.image.startsWith('http') ? 'contain' : 'cover',
                      objectPosition: 'center',
                      padding: hw.image.startsWith('http') ? '1rem' : '0',
                      transition: 'transform 0.4s ease',
                      position: 'relative',
                      zIndex: 2,
                      filter: hw.image.startsWith('http') ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18))' : 'none'
                    }}
                    onError={(e) => {
                      if (hw.fallbackImage && e.currentTarget.src !== hw.fallbackImage && !e.currentTarget.dataset.fallbackTried) {
                        e.currentTarget.dataset.fallbackTried = 'true';
                        e.currentTarget.src = hw.fallbackImage;
                        e.currentTarget.style.objectFit = 'cover';
                        e.currentTarget.style.padding = '0';
                        e.currentTarget.style.filter = 'none';
                        e.currentTarget.parentElement.style.backgroundColor = '#0a1628';
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />

                  {/* Gradient vignette on local dark factory images */}
                  {!hw.image.startsWith('http') && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 21, 40, 0.95) 0%, rgba(11, 21, 40, 0.25) 45%, rgba(11, 21, 40, 0) 100%)',
                      zIndex: 2,
                      pointerEvents: 'none'
                    }} />
                  )}

                  {/* High-Tech Fallback Visual (Big, Relevant, Fills Space) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    zIndex: 1,
                    textAlign: 'center',
                    padding: '1.5rem',
                    backgroundColor: '#0a1628',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 113, 186, 0.25) 0%, rgba(6, 13, 27, 0.98) 100%)'
                  }}>
                    <div style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '20px',
                      background: `rgba(${hw.color === '#0071ba' ? '0, 113, 186' : hw.color === '#E85874' ? '232, 88, 116' : '0, 166, 81'}, 0.18)`,
                      border: `2px solid ${hw.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 32px ${hw.color}45`
                    }}>
                      {renderHardwareIcon(hw.category, 46, hw.color)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700, marginBottom: '0.2rem' }}>
                        {hw.model}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                        {hw.categoryName}
                      </div>
                    </div>
                  </div>

                  {/* Top Left OEM Authenticity Badge */}
                  {hw.oem && (
                    <div 
                      className="hw-oem-badge"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(11, 21, 40, 0.88)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        zIndex: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <CheckCircle2 size={12} color="#00a651" />
                      <span>OEM DIRECT • {hw.oem.toUpperCase()}</span>
                    </div>
                  )}

                  {/* Top Right Spec Badge */}
                  <div 
                    className="hw-spec-badge"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.92)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: `1px solid ${hw.color}`,
                      borderRadius: '6px',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      zIndex: 4,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {hw.badge}
                  </div>

                  {/* Category Indicator Tag at bottom left of image */}
                  <div 
                    className="hw-cat-tag"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(11, 21, 40, 0.88)',
                      backdropFilter: 'blur(6px)',
                      color: hw.color,
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      zIndex: 4
                    }}
                  >
                    {renderHardwareIcon(hw.category, 13, hw.color)}
                    <span>{hw.categoryName}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="hw-card-body">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.35rem'
                  }}>
                    <span style={{
                      fontSize: '0.78rem',
                      color: hw.color,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {hw.categoryName} • {hw.model}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      color: '#94a3b8',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {hw.oem}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.65rem', fontWeight: 700 }}>
                    {hw.name}
                  </h3>

                  <p className="hw-card-desc" style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {hw.desc}
                  </p>

                  <div className="hw-card-specs" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    {hw.specs.map((spec, idx) => (
                      <div key={idx} className="hw-card-specs-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                        <CheckCircle2 size={14} color={hw.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action (Min 44x44px Tap Target) */}
              <div className="hw-card-footer">
                <button
                  className="hw-card-btn"
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
                    minHeight: '44px',
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
