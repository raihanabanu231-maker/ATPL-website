/**
 * ATPL GROUP - 3D FACTORY STATIONS & DIGITAL TWIN DATA
 */

export const FACTORY_STATIONS = [
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
    color: '#00f0ff',
    stats: {
      accuracy: '99.98%',
      throughput: '14,200 items/hr',
      dockTime: '-65% Reduction',
      roi: '4.2 Months',
      oee: '99.4%'
    },
    telemetry: {
      temperature: '21.4°C',
      rfidSignal: '-42 dBm (Excellent)',
      activeAntennas: 8,
      readRate: '1,420 tags/sec',
      status: 'OPERATIONAL'
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
    color: '#3b82f6',
    stats: {
      accuracy: '99.99%',
      throughput: '3,600 units/hr',
      cycleTime: '0.98 sec',
      oee: '98.7%'
    },
    telemetry: {
      jointTorque: '94.2 Nm',
      laserPower: '48.5 W',
      plcCycle: '12 ms',
      vibration: '0.04 mm/s',
      status: 'OPERATIONAL'
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
      }
    ],
    deepDive: {
      overview: "Our autonomous assembly line merges robotic speed with deterministic PLC logic. By combining ATPL's PMS software with Direct Part Marking, every single sub-assembly is laser-etched with a unique cryptographic identity for lifelong traceability.",
      keyFeatures: [
        'Direct Part Marking (DPM) legible after heat treatment & painting',
        'High-speed synchronized dual-conveyor flow control',
        'Real-time OEE dashboards with automated downtime alerting',
        'Predictive maintenance alerts based on motor vibration'
      ]
    }
  },
  {
    id: 'station-vision',
    name: 'AI Computer Vision & Quality Assurance',
    tagline: 'Deep Learning Sub-Micron Defect Inspection & 3D Profiling',
    zone: 'Zone C - Quality Inspection',
    robotGreeting: "Here is our state-of-the-art AI Vision Inspection Hub. Powered by neural networks and high-resolution telecentric optical sensors, we detect microscopic scratches, solder bridge flaws, and label anomalies in under 8 milliseconds.",
    cameraPosition: { x: 25, y: 16, z: 30 },
    cameraTarget: { x: 25, y: 4, z: 5 },
    robotPosition: { x: 22, y: 5, z: 12 },
    stationCoordinates: { x: 25, y: 0, z: 5 },
    color: '#8b5cf6',
    stats: {
      accuracy: '99.999%',
      speed: '8 ms / image',
      falseRejects: '< 0.01%',
      resolution: '25 Megapixels',
      oee: '99.1%'
    },
    telemetry: {
      aiInference: '7.8 ms',
      cameraTemp: '34.2°C',
      defectRate: '0.003%',
      illuminance: '8,400 Lux',
      status: 'OPERATIONAL'
    },
    software: [
      {
        name: 'ATPL Vision AI Suite™',
        tag: 'Neural Inspection',
        desc: 'Deep learning classification and anomaly detection software running inference at the edge on NVIDIA Jetson / industrial GPUs.'
      },
      {
        name: 'PERFECT VERIFIER™',
        tag: 'Barcode Grading',
        desc: 'ISO/IEC 15415 & 15416 certified 1D/2D barcode verifier scoring print quality, contrast, and decodability.'
      }
    ],
    hardware: [
      {
        name: 'Telecentric Industrial Vision Cameras',
        tag: 'Vision Sensors',
        desc: 'GigE Vision and USB3 industrial line-scan and area-scan cameras with zero optical distortion.'
      },
      {
        name: 'Multi-Angle Strobed LED Illuminators',
        tag: 'Optical Lighting',
        desc: 'Polarized, darkfield, and coaxial lighting domes isolating surface defects under high-speed conveyor motion.'
      }
    ],
    deepDive: {
      overview: "Standard visual checks fail to catch micro-cracks and misaligned prints at high speeds. ATPL Vision AI combines telecentric optics with convolutional neural networks to ensure 100% inline inspection with zero bottlenecks.",
      keyFeatures: [
        'Real-time ISO/IEC barcode grading with automated reject chute',
        'Sub-micron surface defect classification (scratch, pit, blur)',
        'Edge AI inference without cloud latency',
        'Automated rejection air-knives triggering in 5 milliseconds'
      ]
    }
  },
  {
    id: 'station-traceability',
    name: 'GS1 Serialization & Aggregation',
    tagline: 'Regulatory Compliance, Parent-Child Aggregation & Cloud Sync',
    zone: 'Zone D - Serialization',
    robotGreeting: "Look at Station 4: Serialization & Aggregation! Perfect Trace creates parent-child relationships from item-level unit cartons to shipper cases and master pallets, complying with global DSCSA, EU-FMD, and DGFT regulations.",
    cameraPosition: { x: 45, y: 20, z: 20 },
    cameraTarget: { x: 40, y: 4, z: -10 },
    robotPosition: { x: 38, y: 6, z: -2 },
    stationCoordinates: { x: 40, y: 0, z: -10 },
    color: '#10b981',
    stats: {
      accuracy: '100% Verified',
      speed: '450 packs/min',
      compliance: 'GS1 / DSCSA / EU-FMD',
      syncDelay: '< 50 ms',
      oee: '99.6%'
    },
    telemetry: {
      serializationRate: '450 cpm',
      cloudSyncLatency: '32 ms',
      cryptoKeyValid: 'VALID',
      printHeads: 'Optimal (100%)',
      status: 'OPERATIONAL'
    },
    software: [
      {
        name: 'PERFECT TRACE™',
        tag: 'Serialization & Track',
        desc: 'End-to-end supply chain serialization platform generating cryptographically secure GS1 serial numbers and parent-child hierarchy trees.'
      },
      {
        name: 'PERFECT AUDIT™',
        tag: 'Compliance & Audit',
        desc: '21 CFR Part 11 compliant audit trail logger recording electronic signatures, batch releases, and tamper attempts.'
      }
    ],
    hardware: [
      {
        name: 'High-Speed Thermal Inkjet (TIJ) & Laser Printers',
        tag: 'Serialization Hardware',
        desc: 'Continuous micro-character TIJ heads applying sharp 600 DPI 2D DataMatrix codes on moving pharmaceutical packaging.'
      },
      {
        name: 'Parent-Child Aggregation Layer Station',
        tag: 'Multi-Camera Rig',
        desc: 'Multi-camera layer scanner reading up to 100 bundle codes in a single optical snapshot for instant case packing.'
      }
    ],
    deepDive: {
      overview: "Counterfeiting and regulatory audits demand flawless end-to-end provenance. PERFECT TRACE establishes an unbroken digital chain of custody from individual product manufacture to point-of-dispense.",
      keyFeatures: [
        'Multi-level aggregation (Unit -> Bundle -> Case -> Pallet)',
        'Full GS1 EPCIS standard compliant cloud export',
        '21 CFR Part 11 compliant digital signatures and audit trails',
        'Automated rework & de-aggregation management'
      ]
    }
  },
  {
    id: 'station-dispatch',
    name: 'Automated Dispatch & AGV Fleet Matrix',
    tagline: 'Autonomous Mobile Robots (AMRs), Fleet Routing & ERP Handshake',
    zone: 'Zone E - Outbound Logistics',
    robotGreeting: "Welcome to our Outbound Fleet Matrix! Autonomous Mobile Robots (AMRs) and automated stretch-wrapping portals communicate seamlessly with ERP gateways to stage finished pallets for carrier pickup.",
    cameraPosition: { x: 15, y: 24, z: -35 },
    cameraTarget: { x: 0, y: 4, z: -25 },
    robotPosition: { x: 5, y: 6, z: -20 },
    stationCoordinates: { x: 0, y: 0, z: -25 },
    color: '#f59e0b',
    stats: {
      fleetSize: '18 AMRs Active',
      uptime: '99.94%',
      dispatchRate: '120 Pallets/hr',
      dockTurnaround: '8.5 Mins',
      oee: '99.2%'
    },
    telemetry: {
      activeAMRs: '18 / 20',
      batteryAvg: '88%',
      corridorClearance: '100%',
      dispatchQueue: '14 orders',
      status: 'OPERATIONAL'
    },
    software: [
      {
        name: 'Fleet Dispatch Manager (FDM)™',
        tag: 'Robotics Fleet OS',
        desc: 'Dynamic path-planning and traffic management software coordinating mixed AMR/AGV fleets with collision avoidance.'
      }
    ],
    hardware: [
      {
        name: 'LiDAR-Guided Autonomous Mobile Robots (AMR)',
        tag: 'Autonomous Vehicles',
        desc: 'Heavy-duty 1,500 kg payload AMRs navigating facility floors with safety LiDAR and SLAM mapping.'
      },
      {
        name: 'Automated Pallet Wrapping & RFID Tunnel',
        tag: 'Outbound Portal',
        desc: 'High-speed rotary ring stretch wrapper with built-in UHF RFID tag encoder and automated SSCC label applicator.'
      }
    ],
    deepDive: {
      overview: "Outbound logistics requires frictionless handoff from production to transport. Our fleet coordination matrix dynamically routes AMRs to active packing bays, guaranteeing zero pallet congestion.",
      keyFeatures: [
        'SLAM LiDAR navigation with 360-degree obstacle detection',
        'Dynamic dock door assignment based on freight carrier arrival',
        'Automated SSCC pallet label verification and ERP billing trigger',
        'Zero-touch continuous 24/7 autonomous battery hot-swapping'
      ]
    }
  }
];
