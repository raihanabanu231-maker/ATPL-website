/**
 * Default SEO & Metadata Configuration for ATPL Group Website
 * Can be customized and persisted via the Admin SEO & Keywords Manager.
 */

export const INITIAL_SEO_DATA = {
  global: {
    siteName: 'Archery Technocrats Private Limited (ATPL Group)',
    titleSuffix: ' | Archery Technocrats',
    baseUrl: 'https://atplgroup.com',
    defaultOgImage: 'https://atplgroup.com/og-image.png',
    googleVerificationCode: 'google-site-verification-atpl-india',
    bingVerificationCode: '',
    twitterHandle: '@ATPLGroup',
    language: 'en',
    geoRegion: 'IN-TN',
    geoPlacename: 'Chennai, Tamil Nadu, India'
  },
  pages: {
    home: {
      id: 'home',
      name: 'Homepage',
      route: '/',
      title: 'Archery Technocrats | Factory Automation & RFID Systems',
      description: 'Archery Technocrats engineers smart factory automation, RFID tracking systems, warehouse management software (WMS), and enterprise AIDC hardware across India.',
      keywords: [
        'Archery Technocrats',
        'ATPL Group',
        'Factory Automation',
        'RFID Systems',
        'Warehouse Management System WMS',
        'Barcode Scanners Honeywell Zebra',
        'GS1 Serialization',
        'Machine Vision AI',
        'Tamil Nadu',
        'Industrial IoT'
      ],
      canonical: 'https://atplgroup.com/',
      robots: 'index, follow',
      ogTitle: 'Archery Technocrats | Industrial Automation & RFID Systems',
      ogDescription: 'Pioneering Industry 4.0 automation, smart RFID systems, enterprise WMS, and barcode hardware across India & Asia.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'Organization'
    },
    software: {
      id: 'software',
      name: 'Software Suite',
      route: '/software',
      title: 'Enterprise Software Suite | WMS, Traceability & Vision AI | ATPL',
      description: 'Discover ATPL software solutions: Archery WMS, End-to-End Serialization & Traceability, Vision AI Quality Inspection, and MDM Mobile Device Management.',
      keywords: [
        'Warehouse Management System',
        'Archery WMS',
        'Serialization Software',
        'Pharma Track and Trace',
        'Vision AI Inspection',
        'Enterprise MDM',
        'Factory MES',
        'GS1 EPCIS'
      ],
      canonical: 'https://atplgroup.com/software',
      robots: 'index, follow',
      ogTitle: 'Enterprise Software Suite | Archery Technocrats',
      ogDescription: 'Deploy intelligent software for automated warehouses, real-time batch serialization, and AI vision inspection.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'SoftwareApplication'
    },
    hardware: {
      id: 'hardware',
      name: 'Hardware & AIDC Devices',
      route: '/hardware',
      title: 'Enterprise AIDC & RFID Hardware | Scanners, Printers & Terminals | ATPL',
      description: 'Authorized distributor of industrial barcode scanners, RFID readers, Zebra & Honeywell thermal printers, mobile computers, and automatic print & apply labelers.',
      keywords: [
        'Zebra Barcode Printers',
        'Honeywell Industrial Scanners',
        'Fixed RFID Readers',
        'Mobile Handheld Computers',
        'Print and Apply Labelers',
        'Rugged Tablets',
        'RFID Antennas',
        'AIDC Hardware'
      ],
      canonical: 'https://atplgroup.com/hardware',
      robots: 'index, follow',
      ogTitle: 'Industrial AIDC & RFID Hardware Systems | ATPL',
      ogDescription: 'High-throughput industrial printing, rugged barcode scanning, and fixed RFID portal readers built for extreme shop floor conditions.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'Product'
    },
    solutions: {
      id: 'solutions',
      name: 'Industry Solutions',
      route: '/solutions',
      title: 'Industry 4.0 Solutions | Automotive, Pharma, FMCG & Logistics | ATPL',
      description: 'Tailored industrial automation solutions for Automotive Assembly, Pharmaceutical Compliance (21 CFR Part 11), FMCG High-Speed Packaging, and Heavy Engineering.',
      keywords: [
        'Automotive Automation',
        'Pharma 21 CFR Part 11',
        'FMCG High Speed Packaging',
        'Logistics Automation',
        'Cold Chain RFID',
        'WIP Tracking',
        'Poka-Yoke Systems'
      ],
      canonical: 'https://atplgroup.com/solutions',
      robots: 'index, follow',
      ogTitle: 'End-to-End Industrial Solutions | ATPL Group',
      ogDescription: 'Turnkey automation engineered specifically for automotive tier-1 suppliers, pharmaceutical manufacturers, and warehouse logistics.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'Service'
    },
    customers: {
      id: 'customers',
      name: 'Customers & Case Studies',
      route: '/customers',
      title: 'Client Success Stories & Enterprise Deployments | ATPL Group',
      description: 'Explore verified case studies and deployments for Fortune 500 manufacturers, tier-1 automotive suppliers, and global pharmaceutical leaders powered by ATPL.',
      keywords: [
        'Customer Case Studies',
        'Factory Automation ROI',
        'Warehouse WMS Deployment',
        'RFID Success Stories',
        'Pharma Track and Trace Clients',
        'Industrial Automation Proof'
      ],
      canonical: 'https://atplgroup.com/customers',
      robots: 'index, follow',
      ogTitle: 'Client Case Studies & Verified Results | ATPL',
      ogDescription: 'Real results: 99.8% inventory accuracy, 40% faster dispatch, and zero serialization defects.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'WebPage'
    },
    partners: {
      id: 'partners',
      name: 'Technology Partners',
      route: '/partners',
      title: 'Global Technology Partners & Alliances | Zebra, Honeywell, Datalogic | ATPL',
      description: 'Certified Premier Partner of Zebra Technologies, Honeywell Safety & Productivity Solutions, Datalogic, Cognex Machine Vision, and Impinj RFID.',
      keywords: [
        'Zebra Premier Solution Partner',
        'Honeywell Authorized Partner',
        'Cognex Machine Vision Partner',
        'Datalogic Distributor',
        'Impinj RFID Systems',
        'AIDC Alliances'
      ],
      canonical: 'https://atplgroup.com/partners',
      robots: 'index, follow',
      ogTitle: 'World-Class Technology Alliances | ATPL Group',
      ogDescription: 'Partnered with global leaders in barcode scanning, thermal printing, RFID, and industrial vision.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'Organization'
    },
    services: {
      id: 'services',
      name: 'Engineering Services & AMC',
      route: '/services',
      title: 'Engineering Services, System Integration & 24/7 AMC Support | ATPL',
      description: 'Comprehensive lifecycle services: Turnkey Automation Integration, RFID Site Surveys, ERP/SAP Connectors, 24/7 AMC Maintenance, and Hardware Repair Support.',
      keywords: [
        'System Integration Services',
        'RFID Site Survey',
        'SAP ERP Warehouse Integration',
        'Annual Maintenance Contract AMC',
        'Zebra Printer Repair',
        'Industrial IoT Support'
      ],
      canonical: 'https://atplgroup.com/services',
      robots: 'index, follow',
      ogTitle: 'Industrial Integration & Support Services | ATPL',
      ogDescription: 'Turnkey engineering from site survey and software development to 24/7 mission-critical SLA support.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'Service'
    },
    demos: {
      id: 'demos',
      name: '3D Twin Simulator & Product Demos',
      route: '/demos',
      title: '3D Twin Simulator & Product Demo Videos | ATPL Group',
      description: 'Experience ATPL’s smart factory automation live. Explore our interactive 3D digital twin plant simulator and watch 360° rotating video turntables of all 20 industrial barcode scanners, RFID portals, and printers.',
      keywords: [
        '3D Digital Twin Simulator',
        'Smart Factory 3D Tour',
        'Product Demo Videos',
        '360 Industrial Hardware Turntables',
        'RFID Dock Door Portal Demo',
        'Conveyor Vision Sorting Video',
        'Shop Floor Automation Simulator'
      ],
      canonical: 'https://atplgroup.com/demos',
      robots: 'index, follow',
      ogTitle: '3D Twin Simulator & Product Demo Videos | ATPL Group',
      ogDescription: 'See our factory automation systems working live: interactive 3D digital twin plant tour and 360° rotating product demo videos.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'WebApplication'
    },
    resources: {
      id: 'resources',
      name: 'Resources & Downloads',
      route: '/resources',
      title: 'Technical Resources, Whitepapers & Case Studies | ATPL Group',
      description: 'Download technical whitepapers, RFID deployment guides, GS1 barcode compliance standards, and product spec sheets curated by ATPL engineers.',
      keywords: [
        'RFID Deployment Whitepaper',
        'GS1 Barcode Compliance Guide',
        'Industry 4.0 Ebook',
        'WMS Spec Sheet',
        'AIDC Technology Resources',
        'Smart Factory Architecture'
      ],
      canonical: 'https://atplgroup.com/resources',
      robots: 'index, follow',
      ogTitle: 'Industry 4.0 Whitepapers & Technical Guides | ATPL',
      ogDescription: 'Essential technical resources, hardware datasheets, and architectural blueprints for operations and supply chain leaders.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'CollectionPage'
    },
    'factory-3d': {
      id: 'factory-3d',
      name: '3D Virtual Factory Tour',
      route: '/factory-3d',
      title: 'Interactive 3D Virtual Factory Tour & Digital Twin | ATPL Group',
      description: 'Experience ATPL interactive 3D digital twin smart factory directly in your browser. Inspect automated packaging, RFID conveyor gates, robotic sorting, and warehouse WMS.',
      keywords: [
        '3D Digital Twin',
        'Virtual Factory Tour',
        'Three.js Factory Simulation',
        'Smart Factory Demonstration',
        'IoT Telemetry Dashboard',
        'Automated Conveyor System'
      ],
      canonical: 'https://atplgroup.com/factory-3d',
      robots: 'index, follow',
      ogTitle: 'Interactive 3D Digital Twin Smart Factory | ATPL',
      ogDescription: 'Explore an operating Industry 4.0 assembly and warehouse line in full real-time 3D.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'WebApplication'
    },
    about: {
      id: 'about',
      name: 'About Company',
      route: '/about',
      title: 'About Archery Technocrats | Pioneers in Industrial Automation & AIDC',
      description: 'Founded with a mission to target perfection, Archery Technocrats Private Limited delivers world-class industrial automation, IoT tracking, and enterprise software.',
      keywords: [
        'About Archery Technocrats',
        'ATPL History',
        'Industrial Automation Company India',
        'Chennai Technology Leaders',
        'AIDC Enterprise Pioneers'
      ],
      canonical: 'https://atplgroup.com/about',
      robots: 'index, follow',
      ogTitle: 'Target Perfection | About ATPL Group',
      ogDescription: 'Over two decades of excellence in industrial automation, enterprise serialization, and mission-critical shop floor systems.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'AboutPage'
    },
    contact: {
      id: 'contact',
      name: 'Contact & Inquiries',
      route: '/contact',
      title: 'Contact ATPL Group | Request a Demo & Engineering Consultation',
      description: 'Get in touch with ATPL industrial automation specialists. Request an on-site demonstration, system quotation, or 24/7 technical support.',
      keywords: [
        'Contact Archery Technocrats',
        'Factory Automation Inquiry',
        'Request RFID Demo',
        'ATPL Office Chennai',
        'Automation Quotation',
        'Engineering Consultation'
      ],
      canonical: 'https://atplgroup.com/contact',
      robots: 'index, follow',
      ogTitle: 'Contact ATPL Group | Engineering Consultation',
      ogDescription: 'Connect with our solution architects to plan your factory automation and warehouse modernization.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'ContactPage'
    },
    privacy: {
      id: 'privacy',
      name: 'Privacy Policy',
      route: '/privacy',
      title: 'Privacy Policy | Archery Technocrats Private Limited',
      description: 'Learn how Archery Technocrats collects, protects, and handles personal data and enterprise information in compliance with data privacy laws.',
      keywords: [
        'ATPL Privacy Policy',
        'Data Protection Policy',
        'Enterprise Data Security',
        'Cookies Policy'
      ],
      canonical: 'https://atplgroup.com/privacy',
      robots: 'noindex, follow',
      ogTitle: 'Privacy Policy | ATPL Group',
      ogDescription: 'Enterprise privacy and data governance commitment from Archery Technocrats Private Limited.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'WebPage'
    },
    terms: {
      id: 'terms',
      name: 'Terms of Service',
      route: '/terms',
      title: 'Terms of Service & SLA Conditions | ATPL Group',
      description: 'Terms and conditions governing the use of ATPL Group websites, enterprise software licenses, hardware support services, and system integration agreements.',
      keywords: [
        'Terms of Service',
        'Software License Terms',
        'Hardware Support SLA',
        'ATPL Legal Agreement'
      ],
      canonical: 'https://atplgroup.com/terms',
      robots: 'noindex, follow',
      ogTitle: 'Terms of Service | ATPL Group',
      ogDescription: 'Service terms, licensing guidelines, and warranty conditions for ATPL enterprise products.',
      ogImage: 'https://atplgroup.com/og-image.png',
      structuredDataType: 'WebPage'
    },
    insights: {
      id: 'insights',
      name: 'Insights & Technical Teardowns',
      route: '/insights',
      title: 'Insights & Implementation Blueprints | ATPL Plant Teardowns',
      description: 'Field deployment notes, implementation blueprints, and technical teardowns from ATPL\'s plant installations across India.',
      keywords: [
        'ATPL Insights',
        'Factory Automation Blueprints',
        'RAIN RFID Dock Portals',
        'Battery Cell Traceability',
        'Machine Vision Defect Inspection',
        'WMS Digital Twin',
        '21 CFR Part 11 Pharma Labeling'
      ],
      canonical: 'https://atplgroup.com/insights',
      robots: 'index, follow',
      ogTitle: 'Insights & Technical Teardowns | Archery Technocrats',
      ogDescription: 'Field deployment notes, implementation blueprints, and technical teardowns from ATPL\'s plant installations across India.',
      ogImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      structuredDataType: 'Blog'
    },
    'why-atpl': {
      id: 'why-atpl',
      name: 'Why ATPL',
      route: '/why-atpl',
      title: 'Why ATPL | Advanced Factory Automation, RFID & Vision Made Easy',
      description: 'Discover why India\'s leading automotive, pharma, and electronics manufacturers choose ATPL for turnkey factory automation, industrial RFID, and Edge AI machine vision.',
      keywords: [
        'Why ATPL',
        'ATPL Advantage',
        'Industrial Automation India',
        'Machine Vision Integrator',
        'RAIN RFID Systems',
        'Turnkey Automation Chennai',
        'Shopfloor Traceability'
      ],
      canonical: 'https://atplgroup.com/why-atpl',
      robots: 'index, follow',
      ogTitle: 'Why ATPL | Advanced Machine Vision & Factory Automation Made Easy',
      ogDescription: 'Turnkey automation, sub-10ms machine vision, and 24/7 on-site SLA engineering across India.',
      ogImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      structuredDataType: 'AboutPage'
    }
  }
};

