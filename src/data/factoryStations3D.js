/**
 * ATPL GROUP - 3D SMART FACTORY DIGITAL TWIN (SINGLE SOURCE OF TRUTH)
 * Exactly 12 Primary Interactive Product Stations with Authentic Pitch Deck Projects & Case Studies
 */

export const ATPL_FACTORY_NODES = {
  perfectTrace: {
    id: "perfectTrace",
    number: "01",
    name: "Perfect Trace",
    title: "PERFECT TRACE™ (Serialization & Aggregation)",
    category: "GS1 SUPPLY CHAIN TRACEABILITY",
    icon: "🔍",
    color: "#00f0ff",
    secondaryColor: "#10b981",
    image: "/assets/images/stations/trace.jpg",
    node: "station_perfect_trace",
    position: [18, 0, 16],
    mapX: 77,
    mapY: 77,
    robotPosition: [18, 3.2, 14],
    cameraPosition: [28, 10, 24],
    targetLookAt: [18, 1.5, 16],
    tagline: "Cryptographic multi-tier parent-child supply chain aggregation",
    whatItDoes: "Generates tamper-proof GS1 serialization hierarchies (Item -> Bundle -> Case -> Pallet) with sub-millisecond line validation.",
    lesson: "In high-speed regulated manufacturing (Pharma, Automotive, FMCG), product recall risks and counterfeit leakage destroy enterprise value. Perfect Trace assigns verifiable cryptographic identities at line speeds up to 450 packs/min, ensuring full DSCSA, EU-FMD, and DGFT compliance.",
    specs: [
      "Item -> Bundle -> Case -> Pallet 4-tier aggregation",
      "Sub-8ms cryptographic QR and DataMatrix verification",
      "One-click backward/forward recall genealogy tracking",
      "21 CFR Part 11 & GS1 EPCIS regulatory conformance"
    ],
    realProject: {
      clientType: "Global Automotive Component Manufacturer",
      headline: "Resource allocation time reduced from 2 hours to 2 minutes",
      description: "Implemented multi-tier serialization integrated directly with SAP ERP. Automated component tracking across chassis stamping, powertrain assembly, and final vehicle delivery.",
      metrics: ["2 hrs ➔ 2 mins allocation", "100% Traceability", "Zero Counterfeits"],
      tags: ["Automotive Tier-1", "SAP S/4HANA", "GS1 EPCIS"]
    },
    demo: "traceability",
    demoActionName: "Simulate Pallet Serialization",
    telemetry: {
      lineSpeed: "420 packs/min",
      verifyRate: "99.99%",
      activeCryptoKeys: "1.4M / batch",
      complianceStatus: "DGFT & US-FDA PASS"
    }
  },

  perfectAudit: {
    id: "perfectAudit",
    number: "02",
    name: "Perfect Audit",
    title: "PERFECT AUDIT™ (Paperless Quality & CAPA)",
    category: "DIGITAL QUALITY MANAGEMENT SYSTEM",
    icon: "📋",
    color: "#10b981",
    secondaryColor: "#00f0ff",
    image: "/assets/images/stations/pms.jpg",
    node: "station_perfect_audit",
    position: [-18, 0, 16],
    mapX: 28,
    mapY: 48,
    robotPosition: [-18, 3.2, 14],
    cameraPosition: [-10, 10, 24],
    targetLookAt: [-18, 1.5, 16],
    tagline: "100% Paperless shopfloor audits & automated CAPA workflows",
    whatItDoes: "Replaces physical logbooks with digital checklists, photographic non-conformance logs, and cryptographic signatures.",
    lesson: "Perfect Audit streamlines quality assurance across the plant floor. Mobile tablet inspectors log photographic evidence with geolocation stamps, triggering automated Corrective and Preventive Action (CAPA) routing directly to production supervisors.",
    specs: [
      "100% paperless digital checklist execution",
      "Automatic non-conformance CAPA routing & escalation",
      "Time-stamped photo & video audit trail capture",
      "Digital electronic signatures adhering to 21 CFR Part 11"
    ],
    realProject: {
      clientType: "Leading FMCG & Dairy Conglomerate",
      headline: "Reduced audit preparation time by 70%",
      description: "Eliminated thousands of paper checklist binders across 8 processing plants. Real-time audit dashboards automatically route non-conformances with photographic proof.",
      metrics: ["-70% Audit Prep Time", "100% Paperless", "ISO 9001:2015 Auto-Audit"],
      tags: ["FMCG Food & Dairy", "ISO Compliance", "Automated CAPA"]
    },
    demo: "audit",
    demoActionName: "Trigger Quality Audit Scan",
    telemetry: {
      openAudits: "14 Active",
      capaResolutionTime: "2.4 hrs avg",
      paperWasteReduced: "100%",
      auditReadiness: "ALWAYS COMPLIANT"
    }
  },

  perfectWarehouse: {
    id: "perfectWarehouse",
    number: "03",
    name: "Perfect Warehouse",
    title: "PERFECT WAREHOUSE™ (Autonomous WMS)",
    category: "WAREHOUSE 4.0 MANAGEMENT SYSTEM",
    icon: "📦",
    color: "#3b82f6",
    secondaryColor: "#00f0ff",
    image: "/assets/images/stations/warehouse.jpg",
    node: "station_perfect_warehouse",
    position: [18, 0, -16],
    mapX: 74,
    mapY: 24,
    robotPosition: [18, 3.8, -13.5],
    cameraPosition: [28, 12, -6],
    targetLookAt: [18, 2.5, -16],
    tagline: "Autonomous WMS with dynamic 3D bin mapping & slotting AI",
    whatItDoes: "Orchestrates automated receiving, dynamic bin allocation, wave picking, and automated dock-to-stock dispatch.",
    lesson: "Modern logistics demands zero phantom inventory. Perfect Warehouse continuously builds dynamic 3D heatmaps of racking aisles, optimizes forklift travel paths via AI slotting, and syncs bi-directionally with SAP S/4HANA and Oracle Cloud.",
    specs: [
      "Dynamic 3D warehouse bin heatmap & slotting optimization",
      "Automated Pallet & Carton level RFID gate integration",
      "FIFO / FEFO expiry-date based picking algorithms",
      "Sub-second bi-directional ERP connectors (SAP, Oracle, Dynamics)"
    ],
    realProject: {
      clientType: "Major National 3PL Distribution Hub",
      headline: "120,000 sq.ft facility with 99.98% inventory accuracy",
      description: "Equipped 14 warehouse bays with 3D heatmap slotting AI and automated forklift picking routes, cutting dock-to-stock turnaround by 65%.",
      metrics: ["99.98% Inventory Accuracy", "-65% Dock-to-Stock", "+38% Forklift Speed"],
      tags: ["Warehouse 4.0", "3D Bin Slotting", "Autonomous Dispatch"]
    },
    demo: "warehouse",
    demoActionName: "Simulate 3D Bin Allocation",
    telemetry: {
      inventoryAccuracy: "99.98%",
      dockToStockTime: "-65% Reduction",
      activeBinCapacity: "84.6% Utilized",
      forkliftPathEfficiency: "+38% Optimized"
    }
  },

  rfidPortals: {
    id: "rfidPortals",
    number: "04",
    name: "RFID Portals",
    title: "Fixed UHF RFID Gate Portals",
    category: "INDUSTRIAL AIDC INFRASTRUCTURE",
    icon: "📡",
    color: "#f59e0b",
    secondaryColor: "#00f0ff",
    image: "/assets/images/stations/rfid.jpg",
    node: "station_rfid_portals",
    position: [-6, 0, 16],
    mapX: 39,
    mapY: 19,
    robotPosition: [-6, 3.2, 14],
    cameraPosition: [2, 8, 26],
    targetLookAt: [-6, 1.8, 16],
    tagline: "Multi-directional beam-steered UHF RFID portals",
    whatItDoes: "Instantly reads hundreds of pallet and carton tags in milliseconds as forklifts transit warehouse bays.",
    lesson: "Manual scanning creates shipping bottleneck queues. ATPL's multi-directional UHF RFID portals combine beam-steered phased antenna arrays with optical transit eye sensors, reading up to 1,400 tags/second with directional transit verification.",
    specs: [
      "1,400+ tags/second ultra-dense read rate",
      "Multi-axis circular polarized antenna arrays",
      "Optical direction-sensing photo eyes (Inbound vs Outbound)",
      "Direct Industrial Ethernet / Modbus TCP & PoE+ connectivity"
    ],
    realProject: {
      clientType: "Global Electronics & Appliance Factory",
      headline: "1,200+ tags/second throughput with zero forklift stoppage",
      description: "Installed fixed UHF portals at all inbound container docks and outbound shipping gates with automated bay light signal confirmation.",
      metrics: ["1,400 tags/sec read rate", "Zero shipping mismatches", "100% Inbound Gate Sync"],
      tags: ["UHF RFID", "Impinj / Zebra", "Dock Automation"]
    },
    demo: "rfid",
    demoActionName: "Trigger RFID Portal Burst",
    telemetry: {
      portalReadRate: "1,420 tags/sec",
      rfSignalStrength: "-41 dBm (Optimal)",
      activeAntennas: "8 / 8 Online",
      misreadRate: "< 0.002%"
    }
  },

  industrialRobots: {
    id: "industrialRobots",
    number: "05",
    name: "Industrial Robots",
    title: "6-Axis Articulated Industrial Robotic Cells",
    category: "ROBOTIC AUTOMATION & MATERIAL HANDLING",
    icon: "🤖",
    color: "#ec4899",
    secondaryColor: "#3b82f6",
    image: "/assets/images/stations/robot_arm.jpg",
    node: "station_industrial_robots",
    position: [6, 0, -16],
    mapX: 42,
    mapY: 64,
    robotPosition: [6, 3.2, -14],
    cameraPosition: [16, 10, -6],
    targetLookAt: [6, 2, -16],
    tagline: "High-precision pick-and-place & direct part marking robotics",
    whatItDoes: "Executes continuous high-speed sorting, palletizing, laser direct part marking, and conveyor handover with 0.05mm repeatability.",
    lesson: "Autonomous robotic cells eliminate repetitive ergonomic strain and operational variation. Synchronized via industrial PLCs and optical cameras, our multi-axis robotic arms perform precision laser etching and sorting alongside active conveyor belts.",
    specs: [
      "6-Axis articulated motion with 0.05mm repeatability",
      "Synchronized conveyor tracking & dynamic pick-and-place",
      "Integrated safety light curtains & collaborative torque sensing",
      "Direct Siemens S7 & Rockwell PLC fieldbus integration"
    ],
    realProject: {
      clientType: "Automotive Precision Machining & EV Assembly",
      headline: "Automated robotic sorting & 0.05mm laser DPM engraving",
      description: "Deployed articulated robotic arms along high-speed assembly conveyor for direct part marking and precision binning.",
      metrics: ["2.1s cycle time", "±0.035mm accuracy", "35% higher throughput"],
      tags: ["Robotics", "EV Assembly", "Conveyor Tracking"]
    },
    demo: "robots",
    demoActionName: "Execute Robotic Arm Cycle",
    telemetry: {
      cycleTime: "2.1 sec / item",
      repeatability: "±0.035 mm",
      motorTemperature: "42.8°C (Normal)",
      oeeAvailability: "99.8%"
    }
  },

  visionAi: {
    id: "visionAi",
    number: "06",
    name: "Vision AI",
    title: "Deep Learning Optical AI Vision Suite",
    category: "EDGE AI COMPUTER VISION & DEFECT INSPECTION",
    icon: "👁️",
    color: "#8b5cf6",
    secondaryColor: "#ec4899",
    image: "/assets/images/stations/vision_ai.jpg",
    node: "station_vision_ai",
    position: [6, 0, 16],
    mapX: 22,
    mapY: 75,
    robotPosition: [6, 3.2, 14],
    cameraPosition: [14, 8, 24],
    targetLookAt: [6, 1.5, 16],
    tagline: "Sub-8ms convolutional neural defect classification",
    whatItDoes: "Inspects parts for sub-micron scratches, solder bridges, missing seals, and ISO barcode grading in under 8ms.",
    lesson: "Traditional rule-based machine vision fails on organic variations. ATPL's Vision AI runs edge TensorRT neural inference models on industrial NVIDIA GPUs, classifying microscopic manufacturing flaws and triggering pneumatic reject gates without slowing production lines.",
    specs: [
      "Sub-8 millisecond edge neural inference latency",
      "Microscopic surface scratch, pit, void, and stain classification",
      "ISO/IEC 15415 & 15416 1D/2D barcode grading verification",
      "Ultra-fast GPIO hardware triggering for pneumatic reject gates"
    ],
    realProject: {
      clientType: "Automotive Transmission & Die-Casting Plant",
      headline: "AI automated defect detection for die-cast parts",
      description: "Identifies casting porosity, crack defects, and verifies rubber seal clamp presence with automated PASS/FAIL triggering without human operator fatigue.",
      metrics: ["6.2ms inference speed", "<0.01% false reject", "Zero defective escapes"],
      tags: ["Vision AI", "Defect Detection", "Deep Learning Edge"]
    },
    demo: "vision",
    demoActionName: "Run Neural Defect Inspection",
    telemetry: {
      inferenceSpeed: "6.2 ms",
      falseRejectRate: "< 0.01%",
      defectResolution: "5 Microns",
      gpuUtilization: "38% (NVIDIA Jetson)"
    }
  },

  erpSync: {
    id: "erpSync",
    number: "07",
    name: "ERP Sync",
    title: "Bi-Directional Enterprise ERP Connectors",
    category: "CLOUD DATA BRIDGING & INTEGRATION",
    icon: "🏢",
    color: "#06b6d4",
    secondaryColor: "#3b82f6",
    image: "/assets/images/stations/erp_sync.jpg",
    node: "station_erp_sync",
    position: [-18, 0, -16],
    mapX: 86,
    mapY: 46,
    robotPosition: [-18, 3.2, -14],
    cameraPosition: [-10, 10, -6],
    targetLookAt: [-18, 2, -16],
    tagline: "Real-time data synchronization with SAP, Oracle & Dynamics",
    whatItDoes: "Bridges machine-level PLC events, WMS scans, and production milestones into cloud enterprise systems in real time.",
    lesson: "Data silos between shopfloor machines and management ERPs lead to delayed financial books and inaccurate inventory. ATPL ERP Sync uses certified connectors to translate OPC-UA, MQTT, and REST streams into native SAP IDOC and Oracle BAPIs automatically.",
    specs: [
      "Certified SAP S/4HANA & ECC bi-directional IDOC connectors",
      "Oracle Fusion Cloud & NetSuite REST API adapters",
      "Real-time Bill of Materials (BOM) work order status sync",
      "Automated goods receipt, issue, and scrap voucher creation"
    ],
    realProject: {
      clientType: "Multi-Plant Steel & Industrial Infrastructure",
      headline: "Real-time sync between 5,000+ IIoT devices & SAP ERP",
      description: "Custom middleware eliminates batch latency by feeding real-time shopfloor production records directly into enterprise financial accounting.",
      metrics: ["3.2M records/day", "48ms sync latency", "99.999% gateway uptime"],
      tags: ["SAP S/4HANA", "Oracle Cloud", "IIoT Middleware"]
    },
    demo: "erp",
    demoActionName: "Trigger SAP/Oracle Sync Pulse",
    telemetry: {
      syncLatency: "48 ms",
      pendingQueue: "0 (Clean)",
      recordsSynchronized: "3.2M / day",
      gatewayUptime: "99.999%"
    }
  },

  inspectionDrones: {
    id: "inspectionDrones",
    number: "08",
    name: "Inspection Drones",
    title: "Autonomous High-Bay Inventory Drones",
    category: "AERIAL WAREHOUSE TELEMETRY",
    icon: "🛸",
    color: "#38bdf8",
    secondaryColor: "#00f0ff",
    image: "/assets/images/stations/drones.jpg",
    node: "station_drones",
    position: [18, 0, 0],
    mapX: 55,
    mapY: 35,
    robotPosition: [18, 3.6, -2],
    cameraPosition: [28, 12, 10],
    targetLookAt: [18, 2, 0],
    tagline: "Autonomous optical navigation for high-altitude rack audits",
    whatItDoes: "Flies autonomously along 15-meter high warehouse racking to audit pallet barcodes and detect rack structural defects.",
    lesson: "Manual stocktaking in high-bay warehouses requires expensive scissor lifts and safety hazards. ATPL inspection drones navigate indoor GPS-denied aisles using optical SLAM, scanning thousands of upper-tier pallet tags in minutes.",
    specs: [
      "Indoor LiDAR & optical SLAM GPS-denied autonomous navigation",
      "High-resolution 4K barcode & RFID dual scanning sensors",
      "Reduces high-bay annual stocktaking duration by 80%",
      "Automated precision battery dock charging stations"
    ],
    realProject: {
      clientType: "National Cold-Chain & Heavy Logistics Facility",
      headline: "80% reduction in high-bay stocktaking duration",
      description: "Deployed automated night-flying drones to audit 40ft high-bay storage racks with dual LiDAR barcode scanners, eliminating scissor lift risks.",
      metrics: ["120 pallets audited/min", "-80% Audit Time", "Zero Scissor Lift Hazards"],
      tags: ["Autonomous Drones", "LiDAR SLAM", "High-Bay WMS"]
    },
    demo: "drones",
    demoActionName: "Launch Aerial Drone Flight",
    telemetry: {
      altitude: "8.4 meters",
      flightBattery: "92%",
      palletsAuditedPerMin: "120 pallets",
      obstacleClearance: "1.2m (Safe)"
    }
  },

  scanners: {
    id: "scanners",
    number: "09",
    name: "Scanners",
    title: "Industrial 2D & Direct Part Marking (DPM) Imagers",
    category: "OPTICAL BARCODE CAPTURE & VERIFICATION",
    icon: "⚡",
    color: "#eab308",
    secondaryColor: "#f59e0b",
    image: "/assets/images/stations/scanners.jpg",
    node: "station_scanners",
    position: [-6, 0, -16],
    mapX: 14,
    mapY: 42,
    robotPosition: [-6, 3.2, -14],
    cameraPosition: [4, 8, -6],
    targetLookAt: [-6, 1.5, -16],
    tagline: "Rugged fixed & handheld imagers for dot-peen and laser DPM",
    whatItDoes: "Decodes low-contrast, curved, dot-peen, and laser-etched 2D codes at conveyor speeds up to 6 meters/sec.",
    lesson: "Automotive engine blocks and aerospace parts use Direct Part Marking (DPM) that standard scanners cannot read. ATPL's multi-spectral liquid-lens imagers dynamically adapt focal length and polarized lighting to decode any marking in milliseconds.",
    specs: [
      "High-speed decoding up to 60 scans/sec on moving conveyors",
      "Patented DPM algorithms for dot-peen, laser etch, and cast codes",
      "IP67 sealed industrial cast metal casing with oil resistance",
      "Direct Profinet, Ethernet/IP, and Modbus TCP interfaces"
    ],
    realProject: {
      clientType: "Leading Rubber & Tyre Manufacturer",
      headline: "Improved dispatch accuracy by 50% with barcode verification",
      description: "Installed high-speed DPM fixed imagers along outbound dispatch lines, completely eliminating shipping errors and wrong tyre dispatches.",
      metrics: ["+50% Dispatch Accuracy", "Zero Shipping Errors", "60 scans/sec throughput"],
      tags: ["Tyre Manufacturing", "DPM Imagers", "Zero Mismatch"]
    },
    demo: "scanners",
    demoActionName: "Trigger Multi-Code Scan Burst",
    telemetry: {
      decodeTime: "11 ms",
      conveyorSpeed: "4.8 m/s",
      readReliability: "99.99%",
      lensFocalLength: "Auto-Tuned (Liquid)"
    }
  },

  printers: {
    id: "printers",
    number: "10",
    name: "Printers",
    title: "Industrial High-Speed Barcode & RFID Encoders",
    category: "PACKAGING MARKING & RFID ENCODING",
    icon: "🖨️",
    color: "#14b8a6",
    secondaryColor: "#00f0ff",
    image: "/assets/images/stations/printers.jpg",
    node: "station_printers",
    position: [6, 0, 0],
    mapX: 88,
    mapY: 70,
    robotPosition: [6, 3.2, -2],
    cameraPosition: [14, 8, 10],
    targetLookAt: [6, 1.5, 0],
    tagline: "Continuous 24/7 600 DPI thermal & RFID label applicators",
    whatItDoes: "Simultaneously prints micro-character GS1 barcodes and encodes UHF RFID chips with integrated automated applicator arms.",
    lesson: "Line stoppages caused by printer ribbon jams cost thousands per minute. ATPL heavy-duty industrial printers feature all-metal mechanisms, dual-cartridge hot-swaps, and automatic RFID tag encoding validation before label tamp application.",
    specs: [
      "600 DPI ultra-fine resolution for microscopic PCB serial tags",
      "Simultaneous UHF RFID chip encoding with bad-tag reject tamp",
      "High-speed printing up to 14 inches/sec (350 mm/sec)",
      "ZPL, EPL, and direct ERP enterprise print server drivers"
    ],
    realProject: {
      clientType: "Perfect Labeler Cloud Enterprise Deployment",
      headline: "Unified 200+ industrial printers across 6 manufacturing plants",
      description: "Deployed cloud-native Perfect Labeler with visual template designer, live database integration, and universal printer connectivity.",
      metrics: ["200+ Printers Unified", "-90% Template Errors", "14 in/sec Speed"],
      tags: ["Perfect Labeler", "Cloud Printing", "Zebra / TSC / Honeywell"]
    },
    demo: "printers",
    demoActionName: "Print & Encode Test Label",
    telemetry: {
      printSpeed: "12 in/sec",
      headLifeRemaining: "94%",
      rfidWriteVerify: "100% PASS",
      ribbonRemaining: "720 meters"
    }
  },

  software: {
    id: "software",
    number: "11",
    name: "Software",
    title: "ATPL Industrial Cloud Software Architecture",
    category: "ENTERPRISE MICROSERVICES & APIS",
    icon: "💻",
    color: "#6366f1",
    secondaryColor: "#8b5cf6",
    image: "/assets/images/stations/software_lab.jpg",
    node: "station_software",
    position: [-18, 0, 0],
    mapX: 12,
    mapY: 20,
    robotPosition: [-18, 3.2, -2],
    cameraPosition: [-8, 9, 10],
    targetLookAt: [-18, 1.5, 0],
    tagline: "Resilient edge-to-cloud telemetry & automation microservices",
    whatItDoes: "Provides scalable microservice engines, GraphQL APIs, and security infrastructure coordinating all plant systems.",
    lesson: "Enterprise automation requires distributed resilience. ATPL software architecture pairs edge container runtimes inside the factory with cloud dashboards, enabling zero-data-loss buffering during network outages with sub-second synchronization.",
    specs: [
      "Edge-to-cloud containerized microservices architecture",
      "High-throughput MQTT, REST & OPC-UA industrial broker connectors",
      "Sub-50ms deterministic data synchronization across distributed plants",
      "Role-based access control (RBAC) with active directory SSO"
    ],
    realProject: {
      clientType: "Perfect Edge MDM & PerfectSolvEdge AI Fleet",
      headline: "Managing 5,000+ rugged enterprise mobile handhelds",
      description: "Centralized policy management, remote push-to-talk, automated app updates, and in-house Generative AI technical troubleshooting chatbot.",
      metrics: ["5,000+ Devices Managed", "24/7 AI Troubleshooting", "Zero Manual Config"],
      tags: ["Perfect Edge MDM", "Generative AI SolvEdge", "Enterprise Mobility"]
    },
    demo: "software",
    demoActionName: "Simulate Cloud Telemetry Stream",
    telemetry: {
      activeMicroservices: "28 Running",
      eventThroughput: "45,000 msgs/sec",
      bufferLatency: "1.2 ms",
      securityAudit: "ZERO VULNERABILITIES"
    }
  },

  pms: {
    id: "pms",
    number: "12",
    name: "PMS",
    title: "PERFECT PMS™ (Production Management & OEE)",
    category: "SHOPFLOOR MES & MACHINE MONITORING",
    icon: "⚙️",
    color: "#f43f5e",
    secondaryColor: "#f59e0b",
    image: "/assets/images/stations/supercomputer.jpg",
    node: "station_pms",
    position: [-6, 0, 0],
    mapX: 58,
    mapY: 80,
    robotPosition: [-6, 3.2, -2],
    cameraPosition: [4, 8, 10],
    targetLookAt: [-6, 1.5, 0],
    tagline: "Real-time shopfloor OEE gauges & machine micro-stoppage telemetry",
    whatItDoes: "Captures live machine cycle times, vibration telemetry, downtime Pareto roots, and operator takt-time performance.",
    lesson: "Unplanned micro-stoppages degrade factory profitability. Perfect PMS interfaces directly with machine PLCs and vibration sensors to calculate Overall Equipment Effectiveness (OEE) at 10ms intervals, alerting maintenance teams before critical machine failure.",
    specs: [
      "Live OEE gauge tracking (Availability, Performance, Quality)",
      "Automated Pareto root-cause downtime categorization",
      "Direct PLC digital I/O and Modbus energy consumption logging",
      "Real-time Andon visual shopfloor boards and mobile alert push"
    ],
    realProject: {
      clientType: "Automotive Precision Press & Machining Shop",
      headline: "22% improvement in Overall Equipment Effectiveness (OEE)",
      description: "Connected 64 CNC machining centers and power presses to live telemetry dashboard with instant SMS Andon alerts on cycle micro-stoppages.",
      metrics: ["+22% OEE Boost", "-45% Unplanned Downtime", "Real-Time Andon"],
      tags: ["Perfect PMS", "Shopfloor MES", "OEE Telemetry"]
    },
    demo: "pms",
    demoActionName: "Trigger Live OEE Recalculation",
    telemetry: {
      currentOEE: "94.2%",
      availability: "98.5%",
      performanceRate: "96.4%",
      qualityScore: "99.3%"
    }
  }
};

export const STATION_KEYS = Object.keys(ATPL_FACTORY_NODES);

/**
 * ATPL GROUP - REAL CLIENT PROJECTS & PRODUCTS SHOWCASE (FROM PITCH DECK)
 */
export const ATPL_PROJECT_SHOWCASE = [
  {
    id: "proj-auto-sap",
    title: "Automotive SAP Traceability & Parent-Child Aggregation",
    client: "Global Tier-1 Automotive Component Manufacturer",
    sector: "Automotive & Heavy Engineering",
    stationId: "perfectTrace",
    icon: "🔍",
    headline: "Resource allocation reduced from 2 hours to 2 minutes",
    challenge: "Manual paper records and un-synchronized parts inventory caused severe shipping delays and audit risk during assembly recalls.",
    solution: "Deployed ATPL Perfect Trace with 4-tier GS1 parent-child aggregation integrated with SAP S/4HANA ERP for automated serial number allocation.",
    results: [
      "Resource allocation time reduced from 2 hours to 2 minutes",
      "100% backward/forward recall genealogy tracking",
      "Zero counterfeit component entry into OEM supply chain"
    ],
    badges: ["SAP S/4HANA", "Perfect Trace", "Automotive"]
  },
  {
    id: "proj-vision-qc",
    title: "AI-Powered Automated Casting Defect Detection",
    client: "Major Automotive Transmission & Die-Casting Plant",
    sector: "Automotive Castings & Precision Machining",
    stationId: "visionAi",
    icon: "👁️",
    headline: "Automated real-time PASS/FAIL defect detection at 6.2ms",
    challenge: "Microscopic surface porosity and missing rubber O-rings caused costly warranty claims when human inspectors missed flaws under shift fatigue.",
    solution: "Installed ATPL Perfect AI Vision System with high-speed telecentric cameras and edge deep learning inference models for automated defect classification.",
    results: [
      "Instant 6.2ms defect detection per part",
      "<0.01% false rejection rate",
      "100% elimination of defective escapes to customer"
    ],
    badges: ["Perfect Vision AI", "Deep Learning", "Zero Defect"]
  },
  {
    id: "proj-fmcg-audit",
    title: "Paperless ISO Digital Audit & CAPA Management",
    client: "Leading FMCG Food & Dairy Conglomerate",
    sector: "FMCG, Food & Dairy",
    stationId: "perfectAudit",
    icon: "📋",
    headline: "Reduced audit preparation time by 70%",
    challenge: "Handling tens of thousands of paper checklists across 8 manufacturing sites made compliance preparation slow and prone to misplaced records.",
    solution: "Implemented ATPL Perfect Audit SaaS platform with mobile tablet photo evidence, automated CAPA escalation, and digital 21 CFR Part 11 signatures.",
    results: [
      "Audit preparation time cut by 70%",
      "100% paperless shopfloor inspection logs",
      "Real-time corporate compliance visibility"
    ],
    badges: ["Perfect Audit", "ISO 9001:2015", "Paperless"]
  },
  {
    id: "proj-rubber-dispatch",
    title: "Automated Barcode Verification & Outbound Dispatch",
    client: "Top Rubber & Industrial Tyre Manufacturer",
    sector: "Rubber & Tyre Manufacturing",
    stationId: "scanners",
    icon: "⚡",
    headline: "Improved dispatch accuracy by 50%",
    challenge: "High-speed tyre conveyor dispatch suffered from occasional barcode misreads, leading to wrong shipments and costly carrier penalties.",
    solution: "Installed ATPL multi-point fixed industrial imagers with polarized lighting to decode curved and reflective rubber barcodes at 4.8 m/s.",
    results: [
      "50% improvement in dispatch verification accuracy",
      "100% elimination of shipping mismatches",
      "Instant automated warehouse gate clearance"
    ],
    badges: ["DPM Scanners", "Tyre Logistics", "Zero Shipping Errors"]
  },
  {
    id: "proj-wms-slotting",
    title: "3D Bin Heatmap WMS & Automated Bay RFID",
    client: "National Logistics & Retail 3PL Distribution Hub",
    sector: "Logistics & Warehousing",
    stationId: "perfectWarehouse",
    icon: "📦",
    headline: "120,000 sq.ft warehouse with 99.98% inventory accuracy",
    challenge: "Forklift congestion and phantom inventory delayed order fulfillment times across a massive 120,000 sq.ft facility.",
    solution: "Deployed Perfect Store / Perfect Warehouse with 3D heatmap slotting AI, automated RFID bay portals, and dynamic wave picking.",
    results: [
      "99.98% inventory tracking accuracy",
      "65% reduction in dock-to-stock turnaround",
      "38% improvement in forklift travel path efficiency"
    ],
    badges: ["Perfect Store", "Warehouse 4.0", "RFID Portals"]
  },
  {
    id: "proj-cloud-labeler",
    title: "Cloud-Native Label Operations & Printer Orchestration",
    client: "Pharmaceutical & Specialty Packaging Facility",
    sector: "Pharmaceuticals & Packaging",
    stationId: "printers",
    icon: "🖨️",
    headline: "Centralized 200+ industrial printers with Archie AI",
    challenge: "Disconnected desktop label software resulted in outdated label designs, barcode compliance failures, and frequent printer downtime.",
    solution: "Standardized on Perfect Labeler cloud platform with centralized visual designer, ERP database sync, and Archie AI print assistant.",
    results: [
      "Centralized 200+ Zebra, Honeywell, and TSC printers",
      "90% reduction in label template authoring time",
      "Full audit trail for regulatory label revisions"
    ],
    badges: ["Perfect Labeler", "Cloud Printing", "Archie AI"]
  }
];

export const ATPL_CLIENT_LOGOS = [
  "Bosch", "Ola Electric", "ABB", "Larsen & Toubro", "Apollo Tyres",
  "Dell", "Titan", "Ashok Leyland", "Pegatron", "JSW Steel",
  "Rane", "TVS Sensing", "Hatsun", "Dixcy", "Modenik", "Dixon"
];
