/**
 * ATPL GROUP - 3D DIGITAL TWIN & SMART FACTORY TOUR (SINGLE SOURCE OF TRUTH)
 * Archery Technocrats Private Limited - "Target Perfection"
 * Content derived directly from the Official Corporate Pitch Deck 2026
 */

export interface StationData {
  id: string;
  number: string;
  name: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  targetLookAt: [number, number, number];
  photoUrl: string;
  diagramUrl?: string;
  latencyBadge: string;
  archieLesson: string;
  specs: string[];
  clientProject: {
    clientType: string;
    headline: string;
    challenge: string;
    solution: string;
    impact: string[];
    tags: string[];
  };
  telemetry: Record<string, string>;
  demoActionName: string;
  visionTableData?: {
    item: string;
    expected: string;
    detected: string;
    status: 'PASS' | 'FAIL';
  }[];
}

export const ATPL_STATIONS: Record<string, StationData> = {
  perfectTrace: {
    id: 'perfectTrace',
    number: '01',
    name: 'Perfect Trace',
    title: 'PERFECT TRACE™ (End-to-End Serialization & Aggregation)',
    category: 'SERIALIZATION & GS1 COMPLIANCE',
    tagline: 'Cryptographic multi-tier parent-child supply chain aggregation',
    description: 'Assigns verifiable cryptographic identities (Item -> Bundle -> Case -> Pallet) with sub-millisecond line validation, preventing counterfeit leakage and ensuring 100% DGFT/DSCSA regulatory compliance.',
    icon: '🔍',
    color: '#18E0FF',
    accentColor: '#FFC93C',
    position: [4.2, 0, 12],
    cameraPosition: [4.2, 4.5, 18],
    targetLookAt: [4.2, 1.5, 12],
    photoUrl: '/assets/images/stations/trace.jpg',
    latencyBadge: '< 8ms Verification Latency',
    archieLesson: 'In high-speed regulated manufacturing (Pharma, Automotive, FMCG), product recall risks and counterfeit leakage destroy enterprise value. Perfect Trace assigns verifiable cryptographic identities at line speeds up to 450 packs/min.',
    specs: [
      'Item -> Bundle -> Case -> Pallet 4-tier aggregation',
      'Sub-8ms cryptographic QR and DataMatrix verification',
      'One-click backward/forward recall genealogy tracking',
      '21 CFR Part 11 & GS1 EPCIS regulatory conformance'
    ],
    clientProject: {
      clientType: 'Global Automotive Component Manufacturer',
      headline: 'Resource allocation time reduced from 2 hours to 2 minutes',
      challenge: 'Manual paper records and un-synchronized parts inventory caused severe shipping delays and audit risk during assembly recalls.',
      solution: 'Deployed ATPL Perfect Trace with 4-tier GS1 parent-child aggregation integrated with SAP S/4HANA ERP for automated serial number allocation.',
      impact: [
        'Resource allocation time cut from 2 hours to 2 minutes',
        '100% backward/forward recall genealogy tracking',
        'Zero counterfeit component entry into OEM supply chain'
      ],
      tags: ['Automotive Tier-1', 'SAP S/4HANA', 'GS1 EPCIS']
    },
    telemetry: {
      lineSpeed: '420 packs/min',
      verifyRate: '99.99%',
      activeCryptoKeys: '1.4M / batch',
      complianceStatus: 'DGFT & US-FDA PASS'
    },
    demoActionName: 'Simulate Pallet Serialization'
  },

  perfectAudit: {
    id: 'perfectAudit',
    number: '02',
    name: 'Perfect Audit',
    title: 'PERFECT AUDIT™ (SaaS ISO Compliance & Paperless CAPA)',
    category: 'DIGITAL QUALITY MANAGEMENT SYSTEM',
    tagline: '100% Paperless shopfloor audits & automated CAPA workflows',
    description: 'SaaS-based ISO internal audit management platform that completely eliminates paper checklists, captures timestamped photo evidence, and executes automated CAPA workflows with 21 CFR Part 11 digital signatures.',
    icon: '📋',
    color: '#10B981',
    accentColor: '#FFC93C',
    position: [12, 0, 8],
    cameraPosition: [8, 4.5, 14],
    targetLookAt: [12, 1.8, 8],
    photoUrl: '/assets/images/stations/pms.jpg',
    latencyBadge: 'Real-Time CAPA Sync',
    archieLesson: 'Welcome to Perfect Audit! Inspectors record photo evidence on mobile tablets with geolocation stamps, triggering automated Corrective and Preventive Action (CAPA) routing directly to production supervisors without paper delays.',
    specs: [
      '100% paperless digital checklist execution',
      'Automatic non-conformance CAPA routing & escalation',
      'Time-stamped photo & video audit trail capture',
      'Digital electronic signatures adhering to 21 CFR Part 11'
    ],
    clientProject: {
      clientType: 'Leading FMCG Food & Dairy Conglomerate',
      headline: 'Reduced audit preparation time by 70%',
      challenge: 'Handling tens of thousands of paper checklists across 8 manufacturing sites made compliance preparation slow and prone to misplaced records.',
      solution: 'Implemented ATPL Perfect Audit SaaS platform with mobile tablet photo evidence, automated CAPA escalation, and digital 21 CFR Part 11 signatures.',
      impact: [
        'Audit preparation time cut by 70%',
        '100% paperless shopfloor inspection logs',
        'Real-time corporate compliance visibility'
      ],
      tags: ['FMCG Food & Dairy', 'ISO Compliance', 'Automated CAPA']
    },
    telemetry: {
      openAudits: '14 Active',
      capaResolutionTime: '2.4 hrs avg',
      paperWasteReduced: '100%',
      auditReadiness: 'ALWAYS COMPLIANT'
    },
    demoActionName: 'Trigger Quality Audit Scan'
  },

  perfectStore: {
    id: 'perfectStore',
    number: '03',
    name: 'Perfect Store',
    title: 'PERFECT STORE™ / WMS (Autonomous Warehouse & 3D Slotting)',
    category: 'WAREHOUSE 4.0 MANAGEMENT SYSTEM',
    tagline: 'Industrial warehouse app with 3D heatmap bin allocation & RFID',
    description: 'Optimizes inventory tracking, dynamic slotting, FIFO/FEFO picking algorithms, and order fulfillment with real-time inventory visibility and native ERP synchronization.',
    icon: '📦',
    color: '#3B82F6',
    accentColor: '#FFC93C',
    position: [-14, 0, -8],
    cameraPosition: [-6, 6.5, 2],
    targetLookAt: [-14, 3.5, -8],
    photoUrl: '/assets/images/stations/warehouse.jpg',
    latencyBadge: 'Sub-second Sync with ERP',
    archieLesson: 'Modern logistics demands zero phantom inventory. Perfect Store continuously builds dynamic 3D heatmaps of racking aisles, optimizes forklift travel paths via AI slotting, and syncs bi-directionally with SAP and Oracle.',
    specs: [
      'Dynamic 3D warehouse bin heatmap & slotting optimization',
      'Automated Pallet & Carton level RFID gate integration',
      'FIFO / FEFO expiry-date based picking algorithms',
      'Sub-second bi-directional ERP connectors (SAP, Oracle, Dynamics)'
    ],
    clientProject: {
      clientType: 'National 3PL Distribution & Retail Hub',
      headline: '120,000 sq.ft facility with 99.98% inventory accuracy',
      challenge: 'Forklift congestion and phantom inventory delayed order fulfillment times across a massive 120,000 sq.ft facility.',
      solution: 'Deployed Perfect Store with 3D heatmap slotting AI, automated RFID bay portals, and dynamic wave picking.',
      impact: [
        '99.98% inventory tracking accuracy',
        '65% reduction in dock-to-stock turnaround',
        '38% improvement in forklift travel path efficiency'
      ],
      tags: ['Warehouse 4.0', '3D Bin Slotting', 'Autonomous Dispatch']
    },
    telemetry: {
      inventoryAccuracy: '99.98%',
      dockToStockTime: '-65% Reduction',
      activeBinCapacity: '84.6% Utilized',
      forkliftPathEfficiency: '+38% Optimized'
    },
    demoActionName: 'Simulate 3D Bin Allocation'
  },

  rfidPortals: {
    id: 'rfidPortals',
    number: '04',
    name: 'RFID Portals',
    title: 'Fixed UHF RFID Gate Portals',
    category: 'INDUSTRIAL AIDC INFRASTRUCTURE',
    tagline: 'Multi-directional beam-steered UHF RFID portals for dock doors',
    description: 'Long-range UHF portals and high-temperature tags that capture 1,200+ pallet and carton tags in milliseconds as forklifts drive through warehouse bays with 99.98% inventory accuracy.',
    icon: '📡',
    color: '#F59E0B',
    accentColor: '#18E0FF',
    position: [-3.5, 0, 14],
    cameraPosition: [-3.5, 4.0, 20],
    targetLookAt: [-3.5, 2.5, 14],
    photoUrl: '/assets/images/stations/rfid.jpg',
    latencyBadge: '1,400+ tags/sec Read Rate',
    archieLesson: 'Manual scanning creates shipping bottleneck queues. ATPL multi-directional UHF RFID portals combine beam-steered antenna arrays with optical transit eye sensors to verify inbound and outbound dock shipments instantly.',
    specs: [
      '1,400+ tags/second ultra-dense read rate',
      'Multi-axis circular polarized antenna arrays',
      'Optical direction-sensing photo eyes (Inbound vs Outbound)',
      'Direct Industrial Ethernet / Modbus TCP & PoE+ connectivity'
    ],
    clientProject: {
      clientType: 'Global Electronics & Appliance Factory',
      headline: '1,200+ tags/second throughput with zero forklift stoppage',
      challenge: 'Congested loading docks suffered from long staging delays while drivers manually scanned individual carton barcodes.',
      solution: 'Installed fixed UHF portals at all inbound container docks and outbound shipping gates with automated bay light signal confirmation.',
      impact: [
        '1,400 tags/sec read rate',
        'Zero shipping mismatches',
        '100% Inbound Gate Sync'
      ],
      tags: ['UHF RFID', 'Impinj / Zebra', 'Dock Automation']
    },
    telemetry: {
      portalReadRate: '1,420 tags/sec',
      rfSignalStrength: '-41 dBm (Optimal)',
      activeAntennas: '8 / 8 Online',
      misreadRate: '< 0.002%'
    },
    demoActionName: 'Trigger RFID Portal Burst'
  },

  plcSpmIntegration: {
    id: 'plcSpmIntegration',
    number: '05',
    name: 'PLC / HMI / SPM Integration',
    title: 'Industrial Automation, PLC & SPM Testing Integration',
    category: 'SHOPFLOOR AUTOMATION & ROBOTICS',
    tagline: 'Connects Special Purpose Machines & PLCs with IIoT Edge Middleware',
    description: 'Unlocks the power of ERP, PLC, HMI, and Special Purpose Machine (SPM) integration with IIoT/Edge devices, robotic sorting cells, and automated test benches.',
    icon: '🤖',
    color: '#EC4899',
    accentColor: '#FFC93C',
    position: [-1.8, 0, -2],
    cameraPosition: [0, 4.0, 6],
    targetLookAt: [-1.8, 2.0, -2],
    photoUrl: '/assets/images/stations/robot_arm.jpg',
    latencyBadge: '10ms Fieldbus Cycle',
    archieLesson: 'ATPL custom middleware bridges machine controllers (Siemens, Rockwell, Mitsubishi) and automated SPM testing machines with enterprise software, ensuring deterministic telemetry and 0.05mm robotic handling.',
    specs: [
      '6-Axis articulated robotic cells with 0.05mm repeatability',
      'Direct Siemens S7, Rockwell & Mitsubishi PLC integration',
      'Integrated SPM testing machine data acquisition',
      'Real-time conveyor tracking & automated diverter gates'
    ],
    clientProject: {
      clientType: 'Automotive Precision Machining & EV Assembly',
      headline: 'Automated robotic sorting & 0.05mm laser DPM engraving',
      challenge: 'Manual sorting and part handling created ergonomic strain and inconsistent takt-time across the machining line.',
      solution: 'Deployed articulated robotic arms along high-speed assembly conveyor for direct part marking and precision binning.',
      impact: [
        '2.1s cycle time per item',
        '±0.035mm repeatability',
        '35% higher line throughput'
      ],
      tags: ['Robotics', 'EV Assembly', 'PLC Integration']
    },
    telemetry: {
      cycleTime: '2.1 sec / item',
      repeatability: '±0.035 mm',
      motorTemperature: '42.8°C (Normal)',
      oeeAvailability: '99.8%'
    },
    demoActionName: 'Execute Robotic Arm Cycle'
  },

  visionAi: {
    id: 'visionAi',
    number: '06',
    name: 'Perfect AI Vision System',
    title: 'PERFECT AI VISION SYSTEM (Defect Detection & Automated QC)',
    category: 'EDGE AI COMPUTER VISION & DEFECT INSPECTION',
    tagline: 'Deep learning optical defect detection & automated PASS/FAIL inspection',
    description: 'An AI-powered vision system for automated quality control, defect detection, and process monitoring in manufacturing, eliminating human error and reducing inspection costs.',
    icon: '👁️',
    color: '#8B5CF6',
    accentColor: '#18E0FF',
    position: [6.5, 0, 2],
    cameraPosition: [3.5, 4.5, 8],
    targetLookAt: [6.5, 3.0, 2],
    photoUrl: '/assets/images/stations/vision_ai.jpg',
    latencyBadge: '6.2ms TensorRT Inference',
    archieLesson: 'Traditional rule-based machine vision fails on organic variations. ATPL Vision AI runs edge TensorRT neural inference models on industrial NVIDIA GPUs, classifying microscopic flaws and triggering pneumatic reject gates in 6.2ms.',
    specs: [
      'Sub-8 millisecond edge neural inference latency',
      'Microscopic surface scratch, porosity, and void classification',
      'Automated PASS/FAIL defect detection for castings and assemblies',
      'Ultra-fast GPIO hardware triggering for pneumatic reject gates'
    ],
    clientProject: {
      clientType: 'Major Automotive Transmission & Die-Casting Plant',
      headline: 'Automated real-time PASS/FAIL defect detection at 6.2ms',
      challenge: 'Microscopic surface porosity and missing rubber O-rings caused costly warranty claims when human inspectors missed flaws under shift fatigue.',
      solution: 'Installed ATPL Perfect AI Vision System with high-speed telecentric cameras and edge deep learning inference models for automated defect classification.',
      impact: [
        'Instant 6.2ms defect detection per part',
        '<0.01% false rejection rate',
        '100% elimination of defective escapes to customer'
      ],
      tags: ['Vision AI', 'Defect Detection', 'Deep Learning Edge']
    },
    visionTableData: [
      { item: 'Connector_2_way', expected: '1', detected: '1', status: 'PASS' },
      { item: 'Rubber_L', expected: '1', detected: '1', status: 'PASS' },
      { item: 'Rubber_S', expected: '1', detected: '1', status: 'PASS' },
      { item: 'Clamp_S1', expected: '4', detected: '4', status: 'PASS' },
      { item: 'Surface_Pore_0.84', expected: '0', detected: '0', status: 'PASS' }
    ],
    telemetry: {
      inferenceSpeed: '6.2 ms',
      falseRejectRate: '< 0.01%',
      defectResolution: '5 Microns',
      gpuUtilization: '38% (NVIDIA Jetson)'
    },
    demoActionName: 'Run Neural Defect Inspection'
  },

  erpSync: {
    id: 'erpSync',
    number: '07',
    name: 'ERP Sync (ATPL Middleware)',
    title: 'ATPL ERP Sync & Middleware Integration Platform',
    category: 'CLOUD DATA BRIDGING & INTEGRATION',
    tagline: 'Real-time bidirectional synchronization with SAP, Oracle & Dynamics',
    description: 'Comprehensive integrated middleware that combines cutting-edge edge devices (sensors, barcode/RFID scanners, PLCs) with seamless real-time integration to ERP and cloud systems.',
    icon: '🏢',
    color: '#06B6D4',
    accentColor: '#FFC93C',
    position: [-8.5, 0, -4],
    cameraPosition: [-4, 4.0, 2],
    targetLookAt: [-8.5, 2.2, -4],
    photoUrl: '/assets/images/stations/erp_sync.jpg',
    latencyBadge: '48ms Sync Latency',
    archieLesson: 'Data silos between shopfloor machines and management ERPs cause delayed financial books and inaccurate inventory. ATPL ERP Sync uses certified connectors to translate OPC-UA, MQTT, and REST streams into native SAP IDOC and Oracle BAPIs automatically.',
    specs: [
      'Certified SAP S/4HANA & ECC bi-directional IDOC connectors',
      'Oracle Fusion Cloud & NetSuite REST API adapters',
      'Real-time Bill of Materials (BOM) work order status sync',
      'Automated goods receipt, issue, and scrap voucher creation'
    ],
    clientProject: {
      clientType: 'Multi-Plant Steel & Industrial Infrastructure',
      headline: 'Real-time sync between 5,000+ IIoT devices & SAP ERP',
      challenge: 'Manual batch data entry resulted in a 4-hour delay between physical shopfloor production and ERP inventory updates.',
      solution: 'Custom ATPL middleware eliminates batch latency by feeding real-time shopfloor production records directly into enterprise financial accounting.',
      impact: [
        '3.2M records synchronized per day',
        '48ms real-time sync latency',
        '99.999% gateway uptime'
      ],
      tags: ['SAP S/4HANA', 'Oracle Cloud', 'IIoT Middleware']
    },
    telemetry: {
      syncLatency: '48 ms',
      pendingQueue: '0 (Clean)',
      recordsSynchronized: '3.2M / day',
      gatewayUptime: '99.999%'
    },
    demoActionName: 'Trigger SAP/Oracle Sync Pulse'
  },

  inspectionDrones: {
    id: 'inspectionDrones',
    number: '08',
    name: 'Inspection Drones',
    title: 'Autonomous Aerial Stock Audit Drones ("Perfect Store with AI")',
    category: 'AERIAL WAREHOUSE TELEMETRY',
    tagline: 'Autonomous optical navigation for high-bay inventory cycle counts',
    description: 'AI-enabled aerial stock auditing quadcopters navigating indoor GPS-denied high-bay warehouse aisles to audit pallet barcodes and inspect rack structural integrity.',
    icon: '🛸',
    color: '#38BDF8',
    accentColor: '#18E0FF',
    position: [0, 6.8, 6],
    cameraPosition: [0, 5.2, 14],
    targetLookAt: [0, 6.8, 6],
    photoUrl: '/assets/images/stations/drones.jpg',
    latencyBadge: '120 Pallets/min Audit Speed',
    archieLesson: 'Manual stocktaking in high-bay warehouses requires expensive scissor lifts and creates safety hazards. ATPL inspection drones navigate indoor GPS-denied aisles using optical SLAM, scanning thousands of upper-tier pallet tags in minutes.',
    specs: [
      'Indoor LiDAR & optical SLAM GPS-denied autonomous navigation',
      'High-resolution 4K barcode & RFID dual scanning sensors',
      'Reduces high-bay annual stocktaking duration by 80%',
      'Automated precision battery dock charging stations'
    ],
    clientProject: {
      clientType: 'National Cold-Chain & Heavy Logistics Facility',
      headline: '80% reduction in high-bay stocktaking duration',
      challenge: 'Annual physical stocktaking required closing warehouse bays for 4 days with scissor lifts operating at 40-foot heights.',
      solution: 'Deployed automated night-flying drones to audit 40ft high-bay storage racks with dual LiDAR barcode scanners.',
      impact: [
        '120 pallets audited per minute',
        '80% reduction in audit duration',
        'Zero scissor lift safety hazards'
      ],
      tags: ['Autonomous Drones', 'LiDAR SLAM', 'High-Bay WMS']
    },
    telemetry: {
      altitude: '8.4 meters',
      flightBattery: '92%',
      palletsAuditedPerMin: '120 pallets',
      obstacleClearance: '1.2m (Safe)'
    },
    demoActionName: 'Launch Aerial Drone Flight'
  },

  scannersDpm: {
    id: 'scannersDpm',
    number: '09',
    name: 'Scanners & DPM Marking',
    title: 'Industrial 2D & Direct Part Marking (DPM) Readers',
    category: 'OPTICAL BARCODE CAPTURE & VERIFICATION',
    tagline: 'Rugged fixed & handheld imagers for dot-peen and laser DPM',
    description: 'High-speed optical readers and laser marking verification decoding low-contrast, curved, dot-peen, and laser-etched 2D codes at conveyor speeds up to 6 meters/sec in partnership with Honeywell, Zebra, Datalogic, and Newland.',
    icon: '⚡',
    color: '#EAB308',
    accentColor: '#FFC93C',
    position: [-8.5, 0, 6],
    cameraPosition: [-4, 3.8, 12],
    targetLookAt: [-8.5, 2.0, 6],
    photoUrl: '/assets/images/stations/scanners.jpg',
    latencyBadge: '11ms Decode Time',
    archieLesson: 'Automotive engine blocks and aerospace parts use Direct Part Marking (DPM) that standard scanners cannot read. ATPL multi-spectral liquid-lens imagers dynamically adapt focal length and polarized lighting to decode any marking in milliseconds.',
    specs: [
      'High-speed decoding up to 60 scans/sec on moving conveyors',
      'Patented DPM algorithms for dot-peen, laser etch, and cast codes',
      'IP67 sealed industrial cast metal casing with oil resistance',
      'Direct Profinet, Ethernet/IP, and Modbus TCP interfaces'
    ],
    clientProject: {
      clientType: 'Top Rubber & Industrial Tyre Manufacturer',
      headline: 'Improved dispatch accuracy by 50% with barcode verification',
      challenge: 'High-speed tyre conveyor dispatch suffered from barcode misreads on curved black rubber, leading to wrong shipments.',
      solution: 'Installed ATPL multi-point fixed industrial imagers with polarized lighting to decode curved and reflective rubber barcodes at 4.8 m/s.',
      impact: [
        '50% improvement in dispatch accuracy',
        '100% elimination of shipping mismatches',
        'Instant automated warehouse gate clearance'
      ],
      tags: ['Tyre Manufacturing', 'DPM Imagers', 'Zero Mismatch']
    },
    telemetry: {
      decodeTime: '11 ms',
      conveyorSpeed: '4.8 m/s',
      readReliability: '99.99%',
      lensFocalLength: 'Auto-Tuned (Liquid)'
    },
    demoActionName: 'Trigger Multi-Code Scan Burst'
  },

  perfectLabeler: {
    id: 'perfectLabeler',
    number: '10',
    name: 'Perfect Labeler',
    title: 'PERFECT LABELER™ (Cloud Labeling & Print Automation)',
    category: 'CLOUD LABEL OPERATIONS & PRINTING',
    tagline: 'Cloud-native Intelligent Label Operations Platform',
    description: 'Seamlessly connects enterprise data, label workflows, and industrial printers (Zebra, Honeywell, TSC) with a visual designer, live DB integration, batch/N-up printing, Archie AI assistant, and full audit traceability.',
    icon: '🖨️',
    color: '#14B8A6',
    accentColor: '#18E0FF',
    position: [-11, 0, 15],
    cameraPosition: [-6, 3.8, 21],
    targetLookAt: [-11, 2.0, 15],
    photoUrl: '/assets/images/stations/printers.jpg',
    latencyBadge: '14 in/sec Print Throughput',
    archieLesson: 'Line stoppages caused by incorrect label templates or printer jams cost thousands per minute. Perfect Labeler centralizes template authoring in the cloud with universal print drivers and AI compliance verification.',
    specs: [
      'Visual WYSIWYG cloud label template designer',
      'Live ERP database integration & automated batch printing',
      'Universal printer connectivity (Zebra ZPL, TSC TSPL, Honeywell)',
      'Multi-tenant cloud SaaS with regulatory revision audit trails'
    ],
    clientProject: {
      clientType: 'Pharmaceutical & Specialty Packaging Facility',
      headline: 'Unified 200+ industrial printers across 6 manufacturing plants',
      challenge: 'Disconnected desktop label software resulted in outdated label designs, barcode compliance failures, and frequent printer downtime.',
      solution: 'Standardized on Perfect Labeler cloud platform with centralized visual designer, ERP database sync, and Archie AI print assistant.',
      impact: [
        'Centralized 200+ Zebra, Honeywell, and TSC printers',
        '90% reduction in label template authoring time',
        'Full audit trail for regulatory label revisions'
      ],
      tags: ['Perfect Labeler', 'Cloud Printing', 'Archie AI']
    },
    telemetry: {
      printSpeed: '12 in/sec',
      headLifeRemaining: '94%',
      rfidWriteVerify: '100% PASS',
      ribbonRemaining: '720 meters'
    },
    demoActionName: 'Print & Encode Test Label'
  },

  perfectEdgeMdm: {
    id: 'perfectEdgeMdm',
    number: '11',
    name: 'Perfect Edge MDM',
    title: 'PERFECT EDGE MDM™ (Enterprise Mobility & Device Management)',
    category: 'ENTERPRISE MOBILITY MANAGEMENT',
    tagline: 'Centralized control for rugged handhelds, tablets & frontline devices',
    description: 'Provides centralized control over the enterprise mobility ecosystem—from zero-touch device enrollment and configuration to policy-driven security, remote support, Push-to-Talk communication, and fleet analytics.',
    icon: '💻',
    color: '#6366F1',
    accentColor: '#18E0FF',
    position: [8.5, 0, 15],
    cameraPosition: [5, 3.8, 21],
    targetLookAt: [8.5, 1.8, 15],
    photoUrl: '/assets/images/stations/software_lab.jpg',
    latencyBadge: '5,000+ Active Devices',
    archieLesson: 'As enterprises deploy thousands of rugged handhelds, IT teams struggle with device downtime. Perfect Edge MDM delivers remote screen control, automated policy enforcement, and push-to-talk to keep frontline teams connected.',
    specs: [
      'Zero-touch remote device enrollment & configuration',
      'Centralized application sprawl control & silent updates',
      'Remote desktop screen takeover for rapid IT resolution',
      'Built-in Push-to-Talk (PTT) communication for frontline workers'
    ],
    clientProject: {
      clientType: 'Pan-India Field Mobility & Logistics Fleet',
      headline: 'Managing 5,000+ rugged enterprise mobile handhelds',
      challenge: 'High device downtime and manual app configurations slowed warehouse operators across 24 regional hubs.',
      solution: 'Deployed Perfect Edge MDM for automated policy updates, remote screen support, and instant push-to-talk coordination.',
      impact: [
        '5,000+ rugged devices centrally managed',
        '85% reduction in IT remote support resolution time',
        'Zero manual device configuration'
      ],
      tags: ['Perfect Edge MDM', 'Enterprise Mobility', 'Rugged Handhelds']
    },
    telemetry: {
      activeMicroservices: '28 Running',
      eventThroughput: '45,000 msgs/sec',
      bufferLatency: '1.2 ms',
      securityAudit: 'ZERO VULNERABILITIES'
    },
    demoActionName: 'Simulate Cloud Fleet Telemetry'
  },

  perfectSolvEdge: {
    id: 'perfectSolvEdge',
    number: '12',
    name: 'PerfectSolvEdge / Archie AI',
    title: 'PERFECT SOLVEDGE™ & ARCHIE AI (Generative AI Support Platform)',
    category: 'GENERATIVE AI CHATBOT & SUPPORT',
    tagline: 'In-house AI support platform delivering 24/7 technical assistance',
    description: 'Generative AI chatbot platform developed in-house by ATPL to streamline technical support for AIDC devices, machine vision faults, WMS binning queries, and enterprise software.',
    icon: '⚙️',
    color: '#F43F5E',
    accentColor: '#FFC93C',
    position: [14, 0, 0],
    cameraPosition: [8, 4.2, 6],
    targetLookAt: [14, 2.5, 0],
    photoUrl: '/assets/images/stations/supercomputer.jpg',
    latencyBadge: '24/7 Autonomous AI Agent',
    archieLesson: 'Hi, I am Archie AI! Built on PerfectSolvEdge, I provide real-time fault explanation for vision systems, instant inventory lookup for Perfect Store, and ISO policy guidance for Perfect Audit without human delay.',
    specs: [
      'Generative AI trained on industrial AIDC hardware & software manuals',
      'Real-time fault explanation and vision defect root cause analysis',
      'Instant WMS inventory, dispatch, and binning assistance via chat',
      '24/7 multilingual technical assistance across global branches'
    ],
    clientProject: {
      clientType: 'ATPL National Support & 250+ Enterprise Clients',
      headline: 'Reduced support turnaround time with 24/7 AI resolution',
      challenge: 'Enterprise customers operating 24/7 assembly lines needed immediate technical troubleshooting for scanners and printers during midnight shifts.',
      solution: 'Deployed PerfectSolvEdge as a 24/7 conversational support layer capable of diagnosing hardware error codes and guiding operators.',
      impact: [
        'Instant response time for 90% of routine queries',
        '24/7 multilingual assistance across all branches',
        'Zero dependency on tier-1 human support engineers'
      ],
      tags: ['Generative AI', 'Archie AI Mascot', 'PerfectSolvEdge']
    },
    telemetry: {
      aiAccuracy: '99.4%',
      avgResponseTime: '0.4s',
      resolvedTickets: '18,400+',
      knowledgeNodes: '120,000+'
    },
    demoActionName: 'Ask Archie AI a Question'
  }
};

export const STATION_KEYS = Object.keys(ATPL_STATIONS);

/**
 * ATPL GROUP CORPORATE INFORMATION (FROM PITCH DECK 2026)
 */
export const ATPL_COMPANY_INFO = {
  companyName: 'Archery Technocrats Private Limited',
  brandTagline: 'Target Perfection',
  experience: '35+ years in AIDC & IT Industry',
  overview: 'ATPL is a premier Digital Transformation and Industry 4.0 solutions provider delivering integrated hardware-software platforms, industrial automation, IIoT edge middleware, and enterprise mobility solutions across India and globally.',
  vision: '"To be the company that best understands and satisfies the product, service and solution needs of all customers - Globally"',
  mission: '"To discover, develop, and deliver innovative technology oriented solutions that help customers to prevail over their problems and improve their productivity, security and infrastructure"',
  leadership: [
    {
      name: 'Amarnath Paramasivam',
      role: 'Founder cum MD (Full Time)',
      background: 'Mechanical Engineer & MBA with 15+ years in AIDC/IT. Provides strategic vision and technical insight.',
      shareholding: '85%'
    },
    {
      name: 'Anusuya Paramasivam',
      role: 'Director (Full Time)',
      background: 'ME (VLSI Design). Leads operations and finance with 15+ years industry experience.',
      shareholding: '15%'
    }
  ],
  certifications: [
    {
      name: 'ISO 9001:2015',
      issuer: 'Breakthrough Management Quality Registrar (BMQR)',
      scope: 'Trading and service of barcode scanner, RFID, mobile computer, cloud solutions and IoT',
      status: 'Certified'
    },
    {
      name: 'Startup India / DPIIT (Section 80-IAC)',
      issuer: 'Ministry of Commerce and Industry, Govt. of India',
      scope: 'Eligible business in Internet of Things and Manufacturing & Warehouse sector',
      status: 'Certified'
    },
    {
      name: 'Ministry of MSME',
      issuer: 'Govt. of India',
      scope: 'Micro, Small & Medium Enterprises Registered',
      status: 'Active'
    },
    {
      name: 'Honeywell Gold Partner & Distributor',
      issuer: 'Honeywell Scanning & Mobility',
      scope: 'Regional Distributor & Gold Tier Solution Partner since 2019',
      status: 'Gold Tier'
    }
  ],
  financialTraction: [
    { year: '2018-19', revenue: 2.50, label: '₹2.50 Cr', growth: '-' },
    { year: '2019-20', revenue: 5.97, label: '₹5.97 Cr', growth: '+139%' },
    { year: '2020-21', revenue: 4.10, label: '₹4.10 Cr', growth: '-31%' },
    { year: '2021-22', revenue: 5.06, label: '₹5.06 Cr', growth: '+23%' },
    { year: '2022-23', revenue: 6.50, label: '₹6.50 Cr', growth: '+28%' },
    { year: '2023-24', revenue: 5.60, label: '₹5.60 Cr', growth: '-14%' },
    { year: '2024-25', revenue: 6.14, label: '₹6.14 Cr', growth: '+10%' },
    { year: '2025-26', revenue: 6.50, label: '₹6.50 Cr', growth: '+6%' },
    { year: '2026-27 (Proj)', revenue: 8.20, label: '₹8.20 Cr', growth: '+26%' }
  ],
  clients: [
    'Bosch', 'Ola Electric', 'ABB', 'Larsen & Toubro', 'Apollo Tyres',
    'Dell', 'Titan', 'Ashok Leyland', 'Pegatron', 'JSW Steel',
    'Rane', 'TVS Sensing Solutions', 'Hatsun Agro', 'Dixcy', 'Modenik',
    'Dixon', 'Caplin Point', 'Sanmina', 'Visteon', 'Rotork', 'Eberspächer',
    'TI Automotive', 'Endress+Hauser', 'Hutchinson', 'Daebu'
  ],
  oemPartners: [
    { name: 'Honeywell', category: 'Gold Partner & Regional Distributor' },
    { name: 'Zebra Technologies', category: 'Premier Solutions Partner' },
    { name: 'TSC Printronix', category: 'Rising Star Partner' },
    { name: 'Datalogic', category: 'Industrial Barcode & Vision' },
    { name: 'CipherLab', category: 'Mobile Computing Partner' },
    { name: 'TVS Electronics', category: 'AIDC Solutions Alliance' },
    { name: 'Forbes Marshall', category: 'Industrial Automation' },
    { name: 'Unitech', category: 'Rugged Mobile Enterprise' },
    { name: 'SOTI', category: 'Enterprise Mobility Management' },
    { name: 'Advantech', category: 'Industrial IoT Edge Hardware' },
    { name: 'Newland AIDC', category: 'Scanning & Imagers' },
    { name: 'Posiflex', category: 'Touch Terminals & Kiosks' }
  ],
  contact: {
    registeredOffice: '275/11, S1, 2nd Floor, Gandhi Road, West Tambaram, Chennai - 600045',
    salesOffice: 'TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai - 600113',
    branchOffice: 'Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015',
    tollFree: '1800-120-774777',
    phones: ['044-35537618', '+91 9944735993'],
    emails: ['info@atplgroup.com', 'sales@atplgroup.com'],
    website: 'www.atplgroup.com'
  }
};
