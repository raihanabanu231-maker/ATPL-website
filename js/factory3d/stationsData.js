/**
 * ATPL GROUP - 3D FACTORY STATIONS & PRODUCTS KNOWLEDGE BASE
 * Contains narrative scripts for AI Robot Guide, camera coordinates, specs, and telemetry.
 */

window.ATPL_STATIONS_DATA = [
  {
    id: 'station-warehouse',
    name: 'Smart Warehouse & Logistics Hub',
    tagline: 'High-Density Storage, Autonomous RFID & Handheld Mobility',
    zone: 'Zone A - Receiving & Storage',
    robotGreeting: "Welcome to the Smart Warehouse Hub! Here, ATPL's Perfect Warehouse software pairs with long-range RFID readers and rugged handheld computers to achieve 99.98% inventory accuracy and instant dock-to-stock traceability.",
    cameraPosition: { x: -35, y: 22, z: 45 },
    cameraTarget: { x: -25, y: 5, z: 15 },
    robotPosition: { x: -28, y: 7, z: 22 },
    stationCoordinates: { x: -30, y: 0, z: 20 },
    stats: {
      accuracy: '99.98%',
      throughput: '14,200 items/hr',
      dockTime: '-65% Reduction',
      roi: '4.2 Months'
    },
    software: [
      {
        name: 'PERFECT WAREHOUSE™',
        tag: 'WMS Platform',
        desc: 'Enterprise Warehouse Management System with automated bin allocation, batch/lot tracking, cross-docking, and ERP bi-directional sync (SAP, Oracle, Microsoft Dynamics).'
      }
    ],
    hardware: [
      {
        name: 'Fixed UHF RFID Portals & Antennas',
        tag: 'RFID Hardware',
        desc: 'Multi-directional UHF RFID antenna portals capturing pallet and carton tags in milliseconds at warehouse bay doors.'
      },
      {
        name: 'Rugged Industrial Tablets & Mobile Handhelds',
        tag: 'Mobility Edge',
        desc: 'IP67/IP68 rated Android enterprise handheld terminals with integrated 2D long-range barcode imagers.'
      }
    ],
    deepDive: {
      overview: "ATPL's Smart Warehousing solution eliminates manual paperwork, inventory mismatch, and phantom stockouts. Integrating automated bin-location mapping with real-time UHF RFID scanning allows instantaneous receiving, picking, and dispatching.",
      keyFeatures: [
        'Automated Pallet & Carton level RFID tagging',
        'FIFO / FEFO dynamic picking optimization algorithms',
        'Real-time ERP synchronization (SAP, Oracle, Infor)',
        'Forklift-mounted rugged terminals with sub-second lookups'
      ]
    }
  },
  {
    id: 'station-assembly',
    name: 'Autonomous Robotics & Assembly Line',
    tagline: 'Multi-Axis Robotic Arms, PLC Automation & Direct Part Marking',
    zone: 'Zone B - Manufacturing Core',
    robotGreeting: "Step into our Autonomous Assembly Line! Our high-speed industrial robotic arms collaborate with PLC automation and Direct Part Marking (DPM) laser heads to precision-assemble components with zero human error.",
    cameraPosition: { x: -5, y: 18, z: 35 },
    cameraTarget: { x: 0, y: 5, z: 0 },
    robotPosition: { x: -3, y: 6, z: 8 },
    stationCoordinates: { x: 0, y: 0, z: 0 },
    stats: {
      accuracy: '99.99%',
      throughput: '3,600 units/hr',
      cycleTime: '0.98 sec',
      oee: '98.7% OEE'
    },
    software: [
      {
        name: 'PERFECT PMS™',
        tag: 'Production Monitoring',
        desc: 'Real-time Production Management System tracking machine uptime, cycle durations, bottleneck analysis, and overall equipment effectiveness (OEE).'
      }
    ],
    hardware: [
      {
        name: 'Industrial Multi-Axis Robotic Arms',
        tag: 'Robotics',
        desc: 'Precision robotic arms for automated pick-and-place, welding, assembly, and synchronized material transfer.'
      },
      {
        name: 'Direct Part Marking (DPM) Lasers',
        tag: 'Marking & Engraving',
        desc: 'Fiber and CO2 laser marking systems etching indelible 2D DataMatrix codes onto metal, plastic, and electronic components.'
      },
      {
        name: 'PLC Automation & Industrial Touch Panels',
        tag: 'Automation Control',
        desc: 'Rugged IP65 touch panel PCs and programmable logic controllers orchestrating multi-station conveyor synchronization.'
      }
    ],
    deepDive: {
      overview: "Our autonomous assembly line merges robotic speed with deterministic PLC logic. By combining ATPL's PMS software with Direct Part Marking, every single sub-assembly is laser-etched with a unique cryptographic identity for lifelong traceability.",
      keyFeatures: [
        'Direct Part Marking (DPM) legible after heat treatment & painting',
        'High-speed synchronized dual-conveyor flow control',
        'Real-time OEE dashboards with automated downtime alerting',
        'Predictive maintenance alerts based on motor vibration and thermography'
      ]
    }
  },
  {
    id: 'station-vision',
    name: 'AI Computer Vision & Quality Inspection',
    tagline: 'Deep Learning Defect Detection & High-Speed Barcode Verification',
    zone: 'Zone C - Quality Assurance',
    robotGreeting: "Here is where precision matters most: Quality Inspection! Powered by ATPL Computer Vision AI and Perfect Verifier, 8K multispectral cameras inspect parts on the fly, detecting micro-defects down to 5 microns and verifying barcode ANSI grading in real-time.",
    cameraPosition: { x: 28, y: 16, z: 30 },
    cameraTarget: { x: 22, y: 4, z: 0 },
    robotPosition: { x: 22, y: 6, z: 8 },
    stationCoordinates: { x: 22, y: 0, z: 0 },
    stats: {
      accuracy: '99.995%',
      defectRate: '< 0.001%',
      inspectionSpeed: '120 frames/sec',
      isoGrade: 'ISO/IEC 15415 Grade A'
    },
    software: [
      {
        name: 'PERFECT VERIFIER™',
        tag: 'Quality & Compliance',
        desc: 'Automated barcode quality verifier evaluating symbol contrast, modulation, and axial non-uniformity compliant with ISO/IEC standards.'
      },
      {
        name: 'ATPL Computer Vision AI Engine',
        tag: 'AI & Neural Networks',
        desc: 'Custom convolutional neural networks trained for dimensional validation, scratch/burr detection, OCR text reading, and missing component identification.'
      }
    ],
    hardware: [
      {
        name: 'High-Speed Industrial Barcode Scanners',
        tag: 'Machine Vision Imagers',
        desc: 'Liquid lens industrial barcode readers decoding damaged, distorted, or low-contrast 1D/2D codes at conveyor speeds up to 6 m/s.'
      },
      {
        name: 'Multispectral Vision Lighting & Cameras',
        tag: 'Optical Inspection',
        desc: 'Polarized ring lighting and high-resolution industrial line-scan cameras capturing microscopic surface contours.'
      }
    ],
    deepDive: {
      overview: "ATPL Vision Inspection tunnels eliminate costly customer recalls. Our deep learning algorithms train on acceptable tolerances and automatically trigger pneumatic reject arms when an imperfect part or sub-grade barcode is identified.",
      keyFeatures: [
        'Sub-millimeter defect detection at ultra-high conveyor speeds',
        'Automated ISO/IEC 15415 & 15416 print quality grading',
        'Cloud-synced defect image archiving for quality audits',
        'Optical Character Recognition (OCR) for expiry dates & serial batches'
      ]
    }
  },
  {
    id: 'station-traceability',
    name: 'Packaging & End-to-End Traceability',
    tagline: 'Serialization, Industrial Thermal Printing & Aggregation',
    zone: 'Zone D - Packaging & Packaging',
    robotGreeting: "Moving on to Station 4: Packaging and Serialization! Watch how ATPL's Perfect Trace software assigns GS1 serialized identifiers while our heavy-duty thermal printers produce tamper-evident shipping labels with dynamic barcode verification.",
    cameraPosition: { x: 38, y: 20, z: -25 },
    cameraTarget: { x: 25, y: 5, z: -18 },
    robotPosition: { x: 26, y: 7, z: -10 },
    stationCoordinates: { x: 25, y: 0, z: -18 },
    stats: {
      accuracy: '100% Serialization',
      printSpeed: '14 inches/sec',
      traceDepth: 'Parent-Child Tier 4',
      uptime: '99.95%'
    },
    software: [
      {
        name: 'PERFECT TRACE™',
        tag: 'Track & Trace Platform',
        desc: 'Complete GS1-compliant track and trace system providing parent-child serialization (Item -> Pack -> Case -> Pallet) and anti-counterfeit protection.'
      }
    ],
    hardware: [
      {
        name: 'Industrial Thermal Transfer Barcode Printers',
        tag: 'Printing Solutions',
        desc: 'Heavy-duty 24/7 all-metal barcode printers with 600 DPI resolution, RFID encoding capability, and automatic label applicators.'
      },
      {
        name: 'Voice-Directed Technology & Headsets',
        tag: 'Voice Picking',
        desc: 'Hands-free, eyes-free industrial voice technology directing packaging operators with multilingual spoken commands.'
      }
    ],
    deepDive: {
      overview: "Serialization is critical for global regulatory compliance across pharmaceuticals, automotive, and electronics. ATPL's Perfect Trace seamlessly binds the unit barcode to cartons and pallets for frictionless supply chain audits.",
      keyFeatures: [
        'Multi-level parent-child packaging aggregation',
        'Cryptographic anti-counterfeit validation portals',
        'Industrial print-and-apply automated robotic arms',
        'Regulatory compliance with DSCSA, EU FMD, and Indian DGFT norms'
      ]
    }
  },
  {
    id: 'station-control',
    name: 'Command Center & AI Cloud Analytics',
    tagline: 'Enterprise Digital Twin, Perfect Audit & Real-time IoT Hub',
    zone: 'Zone E - Central Intelligence',
    robotGreeting: "Finally, welcome to the Brain of the Plant: The AI Cloud Command Center! ATPL's Perfect Audit software and enterprise IoT servers aggregate millions of factory data points, giving plant leadership complete digital twin visibility and automated compliance reporting.",
    cameraPosition: { x: -25, y: 24, z: -35 },
    cameraTarget: { x: -15, y: 6, z: -15 },
    robotPosition: { x: -16, y: 8, z: -8 },
    stationCoordinates: { x: -15, y: 0, z: -15 },
    stats: {
      dataPoints: '50M+ Events/Day',
      latency: '< 15ms Edge AI',
      auditSpeed: 'Instant 1-Click',
      compliance: 'ISO & 21 CFR Part 11'
    },
    software: [
      {
        name: 'PERFECT AUDIT™',
        tag: 'Audit & Compliance',
        desc: 'Paperless digital audit management system with automated non-conformance tracking, digital signatures, and regulatory compliance logs.'
      },
      {
        name: 'ATPL Cloud IoT & Data Analytics Suite',
        tag: 'Enterprise Cloud',
        desc: 'Big data analytics dashboard tracking enterprise-wide plant throughput, predictive maintenance metrics, and carbon footprint telemetry.'
      }
    ],
    hardware: [
      {
        name: 'Interactive Self-Service Kiosks',
        tag: 'Factory Kiosks',
        desc: 'Heavy-duty industrial touch kiosks for operator badge sign-in, work-order dispatching, and digital standard operating procedure (SOP) displays.'
      },
      {
        name: 'Edge AI Compute Servers',
        tag: 'Industrial Compute',
        desc: 'High-throughput edge computing racks executing deep learning inference with zero latency directly on the factory floor.'
      }
    ],
    deepDive: {
      overview: "The ATPL Command Center transforms raw industrial telemetry into actionable executive intelligence. Perfect Audit eliminates 100% of paper checklists, making regulatory inspections instant and foolproof.",
      keyFeatures: [
        'Digital Twin 3D real-time visualization of all active factory assets',
        'Automated 21 CFR Part 11 electronic records and signature compliance',
        'Predictive AI forecasting line bottlenecks before they occur',
        'Mobile manager alerts via SMS, Email, and WhatsApp integration'
      ]
    }
  }
];
