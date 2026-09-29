/**
 * ATPL GROUP - INITIAL ADMIN & CRM DATA STORE
 */

export const INITIAL_LEADS = [
  {
    id: 'LEAD-1001',
    name: 'Senthil Kumar (VP Manufacturing)',
    company: 'Ola Electric FutureFactory',
    email: 'senthil.k@olaelectric.com',
    phone: '+91 98401 22334',
    solution: 'Perfect Trace™ EV Battery Pack Serialization & DPM',
    budget: '₹45,00,000 - ₹80,00,000',
    status: 'Demo Scheduled',
    priority: 'High',
    source: '3D Factory Tour',
    date: '2026-09-08T10:30:00Z',
    notes: 'Cell-to-pack serialization and DPM laser inspection for Tamil Nadu Gigafactory line expansion.',
    assignedTo: 'Amarnath Paramasivam (Founder & MD)'
  },
  {
    id: 'LEAD-1002',
    name: 'Ravi Chandran (Plant Operations Head)',
    company: 'Bosch Automotive Electronics India',
    email: 'ravi.chandran@in.bosch.com',
    phone: '+91 98840 55678',
    solution: 'Perfect AI Vision System™ & Inline Pokayoke QC',
    budget: '₹35,00,000 - ₹60,00,000',
    status: 'Quotation Sent',
    priority: 'Critical',
    source: 'Website Inquiry',
    date: '2026-09-07T14:15:00Z',
    notes: 'Sub-8ms ECU connector pin defect detection and ISO 15415 barcode grading.',
    assignedTo: 'Amarnath Paramasivam (Founder & MD)'
  },
  {
    id: 'LEAD-1003',
    name: 'M. Venkatakrishnan (Quality & Compliance Head)',
    company: 'Caplin Point Laboratories Ltd',
    email: 'venkat@caplinpoint.net',
    phone: '+91 94440 88990',
    solution: 'Perfect Trace™ & Perfect Audit™ (DSCSA & 21 CFR Part 11)',
    budget: '₹50,00,000+',
    status: 'In Review',
    priority: 'High',
    source: 'Direct RFP',
    date: '2026-09-06T09:45:00Z',
    notes: 'US-FDA and DGFT export serialization for injectable pharmaceutical formulations.',
    assignedTo: 'Anusuya Paramasivam (Director)'
  },
  {
    id: 'LEAD-1004',
    name: 'K. Balasubramanian (Logistics General Manager)',
    company: 'JSW Steel Limited (Salem & Vijayanagar Works)',
    email: 'k.bala@jsw.in',
    phone: '+91 97909 33441',
    solution: 'Fixed UHF RFID Gate Portals & High-Temp 300°C Tags',
    budget: '₹65,00,000 - ₹1,20,00,000',
    status: 'Won',
    priority: 'Critical',
    source: 'Partner Referral',
    date: '2026-09-04T16:20:00Z',
    notes: 'Hot-rolled coil yard tracking with long-range ceramic RFID tags and crane reader integration.',
    assignedTo: 'Amarnath Paramasivam (Founder & MD)'
  },
  {
    id: 'LEAD-1005',
    name: 'G. Sundaram (Supply Chain Lead)',
    company: 'Ashok Leyland Ennore Plant',
    email: 'sundaram.g@ashokleyland.com',
    phone: '+91 99400 11223',
    solution: 'Perfect Store™ WMS & SAP S/4HANA Middleware',
    budget: '₹40,00,000',
    status: 'In Review',
    priority: 'Medium',
    source: 'Customer Portal',
    date: '2026-09-08T11:00:00Z',
    notes: 'Engine and transmission sub-assembly kit tracking with rugged Android terminals.',
    assignedTo: 'Amarnath Paramasivam (Founder & MD)'
  },
  {
    id: 'LEAD-1006',
    name: 'R. Vignesh (IT & Device Infrastructure Head)',
    company: 'Dixon Technologies (India) Ltd',
    email: 'vignesh.r@dixoninfo.com',
    phone: '+91 98410 77889',
    solution: 'PerfectEdge MDM™ Fleet Management (1,500+ Handhelds)',
    budget: '₹25,00,000/yr',
    status: 'Won',
    priority: 'High',
    source: 'TIDEL Park Office Meeting',
    date: '2026-09-09T08:10:00Z',
    notes: 'Zero-touch QR provisioning and remote kiosk lockdown for mobile barcode scanners.',
    assignedTo: 'Anusuya Paramasivam (Director)'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'PROD-SW-01',
    category: 'software',
    name: 'Perfect Store™ (WMS)',
    type: 'Industrial Warehouse Management & Middleware',
    version: 'v5.4 Enterprise',
    status: 'Active',
    deployments: 160,
    rating: '4.9/5',
    description: 'Autonomous WMS & middleware connecting SAP ERP, PLC, HMI, and SPM testing machines with barcode & RFID.'
  },
  {
    id: 'PROD-SW-02',
    category: 'software',
    name: 'Perfect Trace™',
    type: 'GS1 Serialization & Parent-Child Aggregation',
    version: 'v4.2 Cloud',
    status: 'Active',
    deployments: 120,
    rating: '5.0/5',
    description: 'Cryptographically verified unit-to-pallet aggregation hierarchy compliant with DGFT & US-FDA DSCSA.'
  },
  {
    id: 'PROD-SW-03',
    category: 'software',
    name: 'Perfect AI Vision System™',
    type: 'Deep Learning Defect Detection & QC',
    version: 'v3.1 Edge AI',
    status: 'Active',
    deployments: 85,
    rating: '5.0/5',
    description: 'Sub-8ms optical surface inspection, real-time Pass/Fail defect classification, and automated QC.'
  },
  {
    id: 'PROD-SW-04',
    category: 'software',
    name: 'PerfectEdge MDM™',
    type: 'Enterprise Mobile Device Management',
    version: 'v3.5 Enterprise',
    status: 'Active',
    deployments: 140,
    rating: '4.9/5',
    description: 'Centralized control for rugged handhelds, vehicle terminals, and tablets with zero-touch enrollment and kiosk lockdown.'
  },
  {
    id: 'PROD-SW-05',
    category: 'software',
    name: 'Perfect Labeler™',
    type: 'Cloud-Native Label Operations Platform',
    version: 'v2.8 SaaS',
    status: 'Active',
    deployments: 110,
    rating: '4.9/5',
    description: 'Intelligent visual label designer, live database integration, Archie AI assistant, and print automation.'
  },
  {
    id: 'PROD-SW-06',
    category: 'software',
    name: 'Perfect Audit™',
    type: 'SaaS ISO Internal Audit Management',
    version: 'v2.4 SaaS',
    status: 'Active',
    deployments: 75,
    rating: '4.8/5',
    description: 'Streamlines ISO internal audits, eliminates paper records, and automates regulatory compliance workflows.'
  },
  {
    id: 'PROD-SW-07',
    category: 'software',
    name: 'PerfectSolvEdge™',
    type: 'AI-Powered Support & Troubleshooting Assistant',
    version: 'v1.5 Generative AI',
    status: 'Active',
    deployments: 95,
    rating: '4.9/5',
    description: 'In-house Generative AI assistant streamlining technical support for AIDC hardware and software across all branches.'
  },
  {
    id: 'PROD-HW-01',
    category: 'hardware',
    name: 'Fixed UHF RFID Portals & Antennas',
    type: 'Automated Bay Gate Scanning Portal',
    version: 'Gen 4 Heavy-Duty',
    status: 'Active',
    deployments: 340,
    rating: '4.9/5',
    description: 'Multi-antenna circular array reading 1,200+ pallet and carton RFID tags/sec at dock gates.'
  },
  {
    id: 'PROD-HW-02',
    category: 'hardware',
    name: 'PERFECT LABELER™ (Print & Apply)',
    type: 'Automated In-Line Labeling Machine',
    version: 'v4.5 High-Speed',
    status: 'Active',
    deployments: 190,
    rating: '5.0/5',
    description: '120 packs/min synchronized print & apply system with pneumatic tamp arms and in-line barcode ISO grading.'
  },
  {
    id: 'PROD-HW-03',
    category: 'hardware',
    name: 'Industrial 2D & DPM Barcode Scanners',
    type: 'Direct Part Marking (DPM) Handhelds & Fixed Mounts',
    version: 'IP67 Rugged',
    status: 'Active',
    deployments: 1450,
    rating: '4.9/5',
    description: 'Decodes dot-peen, laser-etched, and low-contrast codes on metal, plastic, and electronic substrates.'
  }
];

export const ATPL_CLIENTS = [
  'Ola Electric', 'Bosch', 'JSW Steel', 'ATG', 'Hatsun Dairy', 
  'LS Automotive', 'ABB', 'Larsen & Toubro', 'Tenneco', 'JK Fenner', 
  'Apollo Tyres', 'Vizag Steel', 'Hindustan Unilever (HUL)', 'Rane NSK', 
  'Bharat Electronics (BEL)', 'Magna Cosma', 'PSA Avtec', 'Rane Brakes', 
  'VKC', 'Ashok Leyland', 'Titan', 'Baashyaam', 'Visteon', 'Dell', 
  'Turbo Energy', 'TVH India', 'Polyspin', 'Vestas', 'Dixcy', 'Sanmina', 
  'Dixon', 'TVS Sensing', 'Rotork', 'Eberspächer', 'TI Automotive', 
  'Endress+Hauser', 'Hutchinson', 'MEI', 'Sedyon E-Hwa', 'Caplin Point Laboratories'
];

export const ATPL_COMPANY_INFO = {
  name: 'Archery Technocrats Private Limited',
  shortName: 'ATPL Group',
  slogan: 'Target Perfection',
  founded: '35+ years combined industry leadership',
  registeredOffice: '275/11, S1, 2nd Floor, Gandhi Road, West Tambaram, Chennai - 600045',
  salesOffice: 'TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai, Tamil Nadu - 600113',
  rdCenter: 'Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015',
  branches: 'Tidel Park, Tambaram, Madurai, Hosur, Bangalore (6 Branches nationwide)',
  tollFree: '1800-120-774777',
  phone: '044 3553 7618',
  salesPhone: '+91 63808 59963',
  servicePhone: '+91 72001 57626',
  softwarePhone: '+91 93421 73484',
  email: 'info@atplgroup.com',
  salesEmail: 'sales@atplgroup.com',
  serviceEmail: 'support@atplgroup.com',
  softwareEmail: 'softwaresupport@atplgroup.com',
  website: 'http://www.atplgroup.com',
  youtube: 'https://youtube.com/@archerytechnocrats3794',
  linkedin: 'https://www.linkedin.com/company/66312167/',
  facebook: 'https://www.facebook.com/ATPL-GROUP-103740024727332',
  certifications: [
    'ISO 9001:2015 Certified (BMQR Quality Management)',
    '#startupindia (DPIIT Certified Under Section 80-IAC)',
    'Ministry of MSME, Govt. of India',
    'Ministry of Commerce and Industry'
  ],
  awards: [
    'Honeywell Gold Partner & Regional Distributor (2019)',
    'Honeywell "Go Getter Award" (2021)',
    'TSC "Emerging Partner" (2024)',
    'TSC "Rising Star Partner" (2026)'
  ],
  leadership: [
    {
      name: 'Amarnath Paramasivam',
      role: 'Founder cum Managing Director (Full Time)',
      qualification: 'Mechanical Engineer & MBA',
      experience: '15+ years & 11 years in AIDC/IT',
      bio: 'Provides strategic vision, technological leadership, and executive steering for ATPL Group.'
    },
    {
      name: 'Anusuya Paramasivam',
      role: 'Director (Full Time)',
      qualification: 'ME (VLSI Design)',
      experience: '15+ years industry experience',
      bio: 'Leads Corporate Operations and Finance, project execution, and client relationship governance.'
    }
  ]
};

export const INITIAL_TICKETS = [
  {
    id: 'TICK-801',
    client: 'Ola Electric (FutureFactory TN)',
    equipment: 'ATPL UltraGate Fixed UHF RFID Portal #04',
    serialNo: 'ATPL-RF-2026-9941',
    issue: 'Antenna #4 fine-tuning for battery pack high-velocity dock transfer',
    priority: 'High',
    status: 'In Progress',
    slaTime: '1h 30m remaining',
    created: '2026-09-09T09:12:00Z',
    technician: 'Senior Field Specialist (Chennai Hub)'
  },
  {
    id: 'TICK-802',
    client: 'Caplin Point Laboratories (Puducherry Plant)',
    equipment: 'PERFECT TRACE Cloud Server Node',
    serialNo: 'LIC-TRC-EXP-882',
    issue: 'DGFT portal serialization certificate annual cryptographic refresh',
    priority: 'Critical',
    status: 'Resolved',
    slaTime: 'Met within SLA',
    created: '2026-09-09T10:45:00Z',
    technician: 'Compliance Specialist'
  },
  {
    id: 'TICK-803',
    client: 'JSW Steel (Salem Works)',
    equipment: 'ATPL High-Temp Ceramic RFID Portal',
    serialNo: 'ATPL-HT-4029',
    issue: 'Routine quarterly sensor cleaning & RF signal calibration',
    priority: 'Normal',
    status: 'Resolved',
    slaTime: 'Met within SLA',
    created: '2026-09-08T15:20:00Z',
    technician: 'Salem Regional Resident Engineer'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-501',
    time: '2 mins ago',
    user: 'System Telemetry',
    action: 'IoT Telemetry heartbeat verified across all 5 Smart Factory nodes (Latency: 14ms)',
    type: 'telemetry'
  },
  {
    id: 'LOG-502',
    time: '18 mins ago',
    user: 'Amarnath Paramasivam',
    action: 'Updated Project "Ola Electric Battery Pack Serialization" status to Live Showcase',
    type: 'crm'
  },
  {
    id: 'LOG-503',
    time: '1 hour ago',
    user: 'Lead Intake',
    action: 'Inquiry submitted: Dixon Technologies (PerfectEdge MDM™ Fleet)',
    type: 'inquiry'
  },
  {
    id: 'LOG-504',
    time: '3 hours ago',
    user: 'Anusuya Paramasivam',
    action: 'Authorized annual ISO 9001:2015 and DPIIT compliance renewal logs',
    type: 'system'
  },
  {
    id: 'LOG-505',
    time: '5 hours ago',
    user: 'Amarnath Paramasivam',
    action: 'Published new case study: Bosch Automotive Electronics AI Defect QC',
    type: 'export'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'PROJ-701',
    title: 'EV Battery Cell-to-Pack Traceability & Laser DPM Inspection',
    client: 'Ola Electric FutureFactory',
    industry: 'Automotive & EV OEM',
    solution: 'Perfect Trace™ & Perfect AI Vision System™',
    metric: '100% Pokayoke (0 PPM Fitment Escapes)',
    year: '2026',
    status: 'Published',
    featured: true,
    description: 'Turnkey high-speed serialization of EV battery cells, BMS modules, and battery packs with sub-8ms optical laser DPM inspection on automated assembly lines.'
  },
  {
    id: 'PROJ-702',
    title: 'Automotive ECU Connector Defect QC & Pass/Fail Optical AI',
    client: 'Bosch Automotive Electronics India',
    industry: 'Automotive Components',
    solution: 'Perfect AI Vision System™ & Industrial Scanners',
    metric: '99.98% Defect Capture (<8ms Decision)',
    year: '2025-2026',
    status: 'Published',
    featured: true,
    description: 'Deep learning optical inspection verifying connector pin alignment, micro-scratches, and ISO 15415 2D DataMatrix code grading with pneumatic reject actuation.'
  },
  {
    id: 'PROJ-703',
    title: 'Extreme 300°C High-Temp Ceramic RFID Steel Coil Yard Tracking',
    client: 'JSW Steel Limited',
    industry: 'Heavy Engineering & Steel',
    solution: 'Fixed UHF RFID Portals & Ceramic On-Metal Tags',
    metric: '<60 Sec Coil Search Time (100% Survival)',
    year: '2025-2026',
    status: 'Published',
    featured: true,
    description: 'Deployed ultra-rugged 300°C thermal ceramic UHF RFID tags on hot steel coils with overhead crane readers and automated rail gate inventory tracking.'
  },
  {
    id: 'PROJ-704',
    title: 'US-FDA DSCSA & DGFT 4-Tier Pharmaceutical Serialization',
    client: 'Caplin Point Laboratories',
    industry: 'Pharmaceuticals & Healthcare',
    solution: 'Perfect Trace™ & Perfect Audit™ (21 CFR Part 11)',
    metric: '450 packs/min (100% DGFT Compliance)',
    year: '2025',
    status: 'Published',
    featured: true,
    description: 'Turnkey 4-tier parent-child packaging serialization (Blister -> Carton -> Shipper Case -> Pallet) with cryptographic QR codes and electronic audit trails.'
  },
  {
    id: 'PROJ-705',
    title: 'Heavy Commercial Vehicle Chassis Kit WMS & ERP Middleware',
    client: 'Ashok Leyland',
    industry: 'Commercial Vehicles OEM',
    solution: 'Perfect Store™ (WMS) & SAP S/4HANA Sync',
    metric: '99.98% Inventory Accuracy (-40% Staging Time)',
    year: '2025-2026',
    status: 'Published',
    featured: true,
    description: 'Automated 3D bin heatmap slotting, dynamic FIFO engine kitting, and sub-second SAP S/4HANA middleware synchronization across chassis assembly lines.'
  },
  {
    id: 'PROJ-706',
    title: 'Electronics SMT Board MDM Kiosk Fleet Provisioning (1,500+ Terminals)',
    client: 'Dixon Technologies / Dell Manufacturing',
    industry: 'Electronics & SMT Manufacturing',
    solution: 'PerfectEdge MDM™ & Industrial Handhelds',
    metric: 'Zero-Touch Deployment (99.9% Fleet Uptime)',
    year: '2026',
    status: 'Published',
    description: 'Centralized zero-touch QR onboarding, locked kiosk launcher, and remote OTA firmware updates across 1,500+ rugged warehouse scanners and vehicle mount computers.'
  }
];
