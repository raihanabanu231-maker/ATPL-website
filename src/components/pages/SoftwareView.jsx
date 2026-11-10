import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AnimatedTabs } from '../ui/animated-tabs';
import { BentoCard } from '../ui/bento-card';
import { ShineBadge } from '../ui/shine-badge';
import { ParallaxTiltCard } from '../ui/parallax-tilt-card';
import { MagneticButton } from '../ui/magnetic-button';
import { 
  Boxes, 
  Eye, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Smartphone,
  Printer,
  Activity,
  Play,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const SoftwareView = () => {
  const { openDemoModal } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [focusedAppIndex, setFocusedAppIndex] = useState(2); // Defaults to Perfect Flow 360

  const showcaseApps = [
    {
      id: 'mdm',
      name: 'PerfectEdge MDM',
      titlePrimary: 'PERFECTEDGE',
      titleSecondary: 'MDM',
      tagline: 'Smart Device Management Made Simple.',
      badge: '★ NEW BROCHURE RELEASE',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'dark',
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      image: '/assets/images/software_mdm.jpg',
      brochureUrl: '/assets/images/brochures/brochure_perfectedge_mdm.png',
      videoUrl: null,
      authenticParagraph: 'Easily add and manage devices from multiple locations through a single centralized MDM platform for seamless operations. Restrict unauthorized app usage like YouTube, games, or social media to improve productivity and security. Track real-time device status including online/offline, charging, battery health, connectivity, and live location updates.',
      features: [
        'Centralized MDM platform for multi-location device management & group-wise organization',
        'Tamper-proof kiosk lockdown restricting YouTube, gaming & unauthorized social apps',
        'Real-time battery health analytics, live charging state & GPS location updates'
      ],
      screenData: {
        title: 'PERFECTEDGE MDM',
        metric: '100% KIOSK LOCK',
        sub: 'Multi-Location Fleet',
        status: 'Unauthorized Apps: Blocked',
        tag: 'NEW RELEASE',
        color: '#38bdf8'
      }
    },
    {
      id: 'labeler',
      name: 'Perfect Labeler',
      titlePrimary: 'PERFECT',
      titleSecondary: 'LABELER',
      tagline: 'Print Anytime. Anywhere Effortlessly',
      badge: '★ AI CLOUD PRINTING',
      color: '#f59e0b',
      accentBg: '#fffbeb',
      theme: 'light',
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      image: '/assets/images/software_labeler.jpg',
      brochureUrl: '/assets/images/brochures/brochure_perfect_labeler.png',
      videoUrl: null,
      authenticParagraph: 'Anyone can design and print labels easily without technical training. With cloud-native architecture, there is no extra cost for multiple systems or printers, making it highly scalable and cost-effective across multi-branch operations. Users can generate label templates instantly using simple AI prompts.',
      features: [
        'Users can generate label templates instantly using simple AI prompts',
        'Labels can be generated using Excel upload, PDF upload, or manual data entry',
        'No extra cost for multiple systems or printers across multi-branch facilities'
      ],
      screenData: {
        title: 'PERFECT LABELER',
        metric: 'AI TEMPLATE GEN',
        sub: 'Zero Extra Printer Fee',
        status: 'Multi-Branch: Cloud Sync',
        tag: 'AI POWERED',
        color: '#f59e0b'
      }
    },
    {
      id: 'flow360',
      name: 'Perfect Flow 360',
      titlePrimary: 'PERFECT',
      titleSecondary: 'FLOW 360',
      tagline: 'Customer Relationship Management & Field Operations',
      badge: '★ ENTERPRISE CRM & OPS',
      color: '#10b981',
      accentBg: '#ecfdf5',
      theme: 'dark',
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      image: '/assets/images/software_flow360.jpg',
      portalUrl: 'https://perfectflow360.atplgroup.org',
      brochureUrl: '/assets/images/brochures/brochure_perfect_flow_360.png',
      videoUrl: null,
      authenticParagraph: 'Create and manage leads efficiently while maintaining complete customer details and communication history in one platform. Generate professional quotations instantly, track employee attendance and working hours, and monitor live delivery status.',
      features: [
        'Complete lead management, instant quotations, and sales pricing approvals',
        'Centralized employee attendance, working hours, and field activity monitoring',
        'Live dispatch & product delivery tracking with real-time business analytics'
      ],
      screenData: {
        title: 'PERFECT FLOW 360',
        metric: '360° CRM & OPS',
        sub: 'Field Attendance & Live GPS',
        status: 'Delivery Tracking: Active',
        tag: 'CRM PORTAL',
        color: '#10b981'
      }
    },
    {
      id: 'audit',
      name: 'Perfect Audit',
      titlePrimary: 'PERFECT',
      titleSecondary: 'AUDIT',
      tagline: 'ISO Audit Application for All Industries',
      badge: 'ISO AUDIT & COMPLIANCE',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'dark',
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      image: '/assets/images/software_audit.jpg',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Audit-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=4urwO-BZy08',
      authenticParagraph: 'An ISO Audit application for all industries is a software tool designed to assist companies in conducting and managing audits related to ISO standards. Conducting regular audits ensures that a company’s processes and practices align with these standards, helping to maintain compliance, improve operations, and enhance overall quality.',
      features: [
        'Tailored for manufacturing/production industries to plan, conduct, and manage ISO audits',
        'Ensures continuous compliance with ISO 9001, IATF 16949 & EHS standards',
        'Facilitates continuous improvement efforts and digital CAPA workflows across plants'
      ],
      screenData: {
        title: 'PERFECT AUDIT',
        metric: 'ISO COMPLIANT',
        sub: 'Digital Audit & CAPA',
        status: 'Audit Prep: -70% Time',
        tag: 'VERIFIED',
        color: '#38bdf8'
      }
    },
    {
      id: 'warehouse',
      name: 'Perfect Warehouse',
      titlePrimary: 'PERFECT',
      titleSecondary: 'WAREHOUSE',
      tagline: 'Store Manager Application for Warehouse Optimization',
      badge: 'STORE MANAGER & WAREHOUSE',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'light',
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      image: '/assets/images/software_warehouse.jpg',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Warehouse-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=27tgTz-Bclw',
      authenticParagraph: 'Store manager application for a warehouse is a specialized software tool designed to optimize and streamline all your warehouse operations. It generates intuitive daily reports for Directors and Executives regarding inventory processes, leading to a reduction of manual work involved in warehouse management by 20-30%.',
      features: [
        'Generates intuitive daily reports for Directors and Executives regarding inventory processes',
        'Reduces manual warehouse management workflows by 20% to 30%',
        'Enhances accuracy of inward and outward movement with AI virtual house implementation'
      ],
      screenData: {
        title: 'PERFECT WAREHOUSE',
        metric: '-30% MANUAL',
        sub: 'AI Virtual Warehouse',
        status: 'Daily Exec Reports: Active',
        tag: 'OPTIMIZED',
        color: '#0071ba'
      }
    },
    {
      id: 'trace',
      name: 'Perfect Trace',
      titlePrimary: 'PERFECT',
      titleSecondary: 'TRACE',
      tagline: 'End-to-End Traceability & Supply Chain Visibility',
      badge: 'TRACEABILITY & SUPPLY CHAIN',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'dark',
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      image: '/assets/images/software_trace.jpg',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Audit-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=4urwO-BZy08',
      authenticParagraph: 'A traceability application is a software tool, designed to track and record the movement, origin, and history of products, components, or materials throughout their lifecycle. The main goal of traceability is to provide transparency, accountability, and visibility into the supply chain.',
      features: [
        'Tracks and records movement, origin, and history of products throughout lifecycle',
        'Provides transparency, accountability, and visibility across supply chain tiers',
        'Enhances compliance, facilitates fast recalls, and improves overall process efficiency'
      ],
      screenData: {
        title: 'PERFECT TRACE',
        metric: '100% GENEALOGY',
        sub: 'Lifecycle History Log',
        status: 'Supply Chain: Transparent',
        tag: 'LIVE TRACE',
        color: '#38bdf8'
      }
    },
    {
      id: 'pms',
      name: 'Perfect PMS',
      titlePrimary: 'PERFECT',
      titleSecondary: 'PMS',
      tagline: 'Production Monitoring System with Real-Time Defect Identification',
      badge: 'PRODUCTION MONITORING (MES)',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'light',
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      image: '/assets/images/software_pms.jpg',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Production-Monitoring-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=27tgTz-Bclw',
      authenticParagraph: 'Implementing a Production Monitoring System in your unit can lead to increased operational efficiency, reduced downtime, improved quality, and better decision-making based on real-time and historical data. Automated defect detection contributes directly to overall product quality.',
      features: [
        'Tracks, analyzes, and visualizes manufacturing processes in real-time',
        'Automated defect detection prevents non-conforming parts from reaching customers',
        'Substantially reduces machine downtime and boosts shift-level production efficiency'
      ],
      screenData: {
        title: 'PERFECT PMS',
        metric: 'REAL-TIME MES',
        sub: 'Zero Downtime Architecture',
        status: 'Defect Control: Active',
        tag: 'RUNNING',
        color: '#0071ba'
      }
    },
    {
      id: 'verifier',
      name: 'Perfect Verifier',
      titlePrimary: 'PERFECT',
      titleSecondary: 'VERIFIER',
      tagline: 'Accurate Identification & Lean Manufacturing Quality Control',
      badge: 'QUALITY VERIFIER & IDENTIFICATION',
      color: '#0071ba',
      accentBg: '#eff6ff',
      theme: 'dark',
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      image: '/assets/images/software_verifier.jpg',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Quality-Verifier.pdf',
      videoUrl: null,
      authenticParagraph: 'Our very owned verifier applications is ensuring accurate identification, tracking, and quality control of products throughout the production process. These applications help in managing inventory, reducing errors, and enhancing overall efficiency. It aligns with the principles of lean manufacturing and quality control, ensuring that each batch is accurately identified and monitored throughout its lifecycle.',
      features: [
        'Ensures accurate identification, tracking, and quality control of products',
        'Aligns directly with lean manufacturing principles and zero-error batch control',
        'Reduces shop-floor labeling discrepancies and strengthens traceability lifecycle'
      ],
      screenData: {
        title: 'PERFECT VERIFIER',
        metric: 'LEAN QUALITY',
        sub: 'Accurate Identification',
        status: 'Batch Verification: 100%',
        tag: 'ZERO DEFECTS',
        color: '#38bdf8'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Software Suites' },
    { id: 'audit', label: 'PERFECT AUDIT' },
    { id: 'warehouse', label: 'PERFECT WAREHOUSE' },
    { id: 'trace', label: 'PERFECT TRACE' },
    { id: 'pms', label: 'PERFECT PMS' },
    { id: 'verifier', label: 'PERFECT VERIFIER' },
    { id: 'vision', label: 'COMPUTER VISION' },
    { id: 'mdm', label: 'PERFECTEDGE MDM' },
    { id: 'labeler', label: 'PERFECT LABELER' },
    { id: 'flow360', label: 'PERFECT FLOW 360' }
  ];

  const softwareProducts = [
    {
      id: 'audit',
      titlePrimary: 'PERFECT',
      titleSecondary: 'AUDIT',
      tagline: 'ISO Audit Application for All Industries',
      category: 'ISO AUDIT & COMPLIANCE',
      theme: 'dark',
      image: '/assets/images/software_audit.jpg',
      imageAlt: 'ATPL Perfect Audit ISO Audit Application',
      paragraphs: [
        'An ISO Audit application for all industries is a software tool designed to assist companies in conducting and managing audits related to ISO (International Organization for Standardization) standards.',
        'Conducting regular audits ensures that a company’s processes and practices align with these standards, helping to maintain compliance, improve operations, and enhance overall quality.',
        'This Audit application tailored for manufacturing/production industries assists in efficiently planning, conducting, and managing ISO audits, ensuring compliance with standards and facilitating continuous improvement efforts within the organization.'
      ],
      bulletPoints: [
        'Tailored specifically for manufacturing and production plants to streamline compliance audits',
        'Built-in support for ISO 9001:2015, IATF 16949, ISO 14001 EHS, and 5S checklists',
        'Real-time digital CAPA tracking with automated escalation workflows and photo evidence'
      ],
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Audit-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=4urwO-BZy08'
    },
    {
      id: 'warehouse',
      titlePrimary: 'PERFECT',
      titleSecondary: 'WAREHOUSE',
      tagline: 'Store Manager Application for Warehouse Operations',
      category: 'STORE MANAGER & WAREHOUSE MANAGEMENT',
      theme: 'light',
      image: '/assets/images/software_warehouse.jpg',
      imageAlt: 'ATPL Perfect Warehouse Store Manager Application',
      paragraphs: [
        'Store manager application for a warehouse is a specialized software tool designed to optimize and streamline all your warehouse operations.',
        'It generates intuitive daily reports for Directors and Executives regarding inventory processes, leading to a reduction of manual work involved in warehouse management by 20-30%.',
        'It plays a crucial role in enhancing the accuracy of movement for both inward and outward goods, complemented by the AI implementation of a virtual house.'
      ],
      bulletPoints: [
        'Generates intuitive daily reports for Directors and Executives regarding inventory processes',
        'Proven reduction of manual work involved in warehouse management by 20% to 30%',
        'Enhances accuracy of inward and outward goods movement with AI virtual house implementation',
        'Direct two-way integration with SAP S/4HANA, Oracle, and Microsoft Dynamics'
      ],
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Warehouse-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=27tgTz-Bclw'
    },
    {
      id: 'trace',
      titlePrimary: 'PERFECT',
      titleSecondary: 'TRACE',
      tagline: 'End-to-End Item & Batch Traceability Platform',
      category: 'TRACEABILITY & SUPPLY CHAIN AGGREGATION',
      theme: 'dark',
      image: '/assets/images/software_trace.jpg',
      imageAlt: 'ATPL Perfect Trace Traceability Application',
      paragraphs: [
        'A traceability application is a software tool, designed to track and record the movement, origin, and history of products, components, or materials throughout their lifecycle.',
        'The main goal of traceability is to provide transparency, accountability, and visibility into the supply chain, enabling businesses to monitor and manage various aspects of their operations, such as quality control, compliance, recalls, and overall process efficiency.',
        'This applications play a crucial role in modern supply chain management by enhancing accountability, reducing risks, and improving operational efficiency.'
      ],
      bulletPoints: [
        'Multi-tier packaging aggregation (Item to Carton to Shipper to Pallet) with cryptographic serials',
        'Meets DGFT serialization standards and US-FDA DSCSA export traceability protocols',
        'Batch genealogy recall lookup in under 2 minutes with complete audit reporting'
      ],
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Audit-Management-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=4urwO-BZy08'
    },
    {
      id: 'pms',
      titlePrimary: 'PERFECT',
      titleSecondary: 'PMS',
      tagline: 'Production Monitoring System with Real-Time Defect Identification',
      category: 'PRODUCTION MONITORING (MES) & OEE TRACKING',
      theme: 'light',
      image: '/assets/images/software_pms.jpg',
      imageAlt: 'ATPL Perfect PMS Production Monitoring System',
      paragraphs: [
        'Implementing a Production Monitoring System in your unit can lead to increased operational efficiency, reduced downtime, improved quality, and better decision-making based on real-time and historical data.',
        'Automated defect detection contributes directly to overall product quality and customer satisfaction.',
        'Our PMS tracks, analyzes, and visualizes manufacturing processes in real-time, helping plant managers identify bottlenecks instantly.'
      ],
      bulletPoints: [
        'Real-time Overall Equipment Effectiveness (OEE) tracking with shift-level live dashboards',
        'Direct connection to machine PLCs, sensors, and stack lights to capture micro-stoppages',
        'Automated defect classification and root-cause analysis to protect yield'
      ],
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Production-Monitoring-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=27tgTz-Bclw'
    },
    {
      id: 'verifier',
      titlePrimary: 'PERFECT',
      titleSecondary: 'VERIFIER',
      tagline: 'Accurate Identification & Lean Manufacturing Quality Control',
      category: 'QUALITY CONTROL & LEAN MANUFACTURING',
      theme: 'dark',
      image: '/assets/images/software_verifier.jpg',
      imageAlt: 'ATPL Perfect Verifier Quality Application',
      paragraphs: [
        'Our very owned verifier applications is ensuring accurate identification, tracking, and quality control of products throughout the production process. These applications help in managing inventory, reducing errors, and enhancing overall efficiency.',
        'It aligns with the principles of lean manufacturing and quality control, ensuring that each batch is accurately identified and monitored throughout its lifecycle.'
      ],
      bulletPoints: [
        'Ensures 100% accurate identification, tracking, and quality control across every production batch',
        'Directly aligns with lean manufacturing principles to eliminate identification errors',
        'Full lifecycle monitoring from raw material verification to finished goods shipping'
      ],
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Quality-Verifier.pdf',
      videoUrl: null
    },
    {
      id: 'vision',
      titlePrimary: 'COMPUTER',
      titleSecondary: 'VISION SYSTEM',
      tagline: 'AI/ML Character Engraving Capture & Damage Identification',
      category: 'AI/ML DEFECT & CHARACTER CAPTURING',
      theme: 'light',
      image: '/assets/images/stations/vision_ai.webp',
      imageAlt: 'ATPL Computer Vision System AI/ML Inspection',
      paragraphs: [
        'The ATPL-Perfect vision system, Powered by ML algorithms, excels in capturing engraved characters on multiple components and tracking products through to the finished goods stage.',
        'This system aids in detecting damages in parts by meticulously recording data, model evolution, algorithmic decisions, and component quality. This ensures accountability, identifies sources of errors or biases, validates results, and facilitates compliance with regulations and standards.',
        'Computer vision system for traceability by capturing characters engraved in components and damage identification in that, helps manufacturers can improve quality control, streamline production processes, and ensure the integrity of their products.'
      ],
      bulletPoints: [
        'AI/ML neural inference captures direct engraved characters across varying metal/plastic finishes',
        'Automated damage and flaw detection with sub-10ms response time on moving conveyors',
        'Complete audit logging of algorithmic decisions for regulatory compliance and traceability'
      ],
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      brochureUrl: 'https://atplgroup.com/wp-content/uploads/2024/04/Vision-System.pdf',
      videoUrl: 'https://www.youtube.com/watch?v=27tgTz-Bclw'
    },
    {
      id: 'mdm',
      titlePrimary: 'PERFECTEDGE',
      titleSecondary: 'MDM',
      tagline: 'Smart Device Management Made Simple.',
      category: 'MOBILE DEVICE MANAGEMENT & KIOSK LOCKDOWN',
      theme: 'dark',
      image: '/assets/images/software_mdm.jpg',
      imageAlt: 'ATPL PerfectEdge MDM Fleet Management Dashboard',
      paragraphs: [
        'Easily add and manage devices from multiple locations through a single centralized MDM platform for seamless operations.',
        'Organize devices group-wise based on branch, department, or location for simplified monitoring and management.'
      ],
      bulletPoints: [
        'Easily add and manage devices from multiple locations through a single centralized MDM platform for seamless operations.',
        'Organize devices group-wise based on branch, department, or location for simplified monitoring and management.',
        'Restrict unauthorized app usage like YouTube, games, or social media to improve productivity and security.',
        'Enable secure whitelisting and device-specific link access so shared links work only on authorized devices.',
        'Track real-time device status including online/offline, charging, battery health, connectivity, and live location updates.'
      ],
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      brochureUrl: '/assets/images/brochures/brochure_perfectedge_mdm.png',
      videoUrl: null
    },
    {
      id: 'labeler',
      titlePrimary: 'PERFECT',
      titleSecondary: 'LABELER',
      tagline: 'Print Anytime. Anywhere Effortlessly',
      category: 'CLOUD PRINTING APPLICATION',
      theme: 'light',
      image: '/assets/images/software_labeler.jpg',
      imageAlt: 'ATPL Perfect Labeler Cloud Barcode Designer Interface',
      paragraphs: [
        'Anyone can design and print labels easily without technical training. Cloud-native architecture means no extra cost for multiple systems or printers, making it highly scalable and cost-effective.',
        'Labels can be created and printed from any location, supporting multi-branch operations. All label templates, print jobs, and user activities are managed from a single unified platform.'
      ],
      bulletPoints: [
        'Anyone can design and print labels easily without technical training.',
        'No extra cost for multiple systems or printers, making it more scalable and cost-effective.',
        'Labels can be created and printed from any location, supporting multi-branch operations.',
        'All label templates, print jobs, and user activities are managed from a single platform.',
        'Users can generate label templates instantly using simple AI prompts.',
        'Labels can be generated using Excel upload, PDF upload, or manual data entry.'
      ],
      ctaColor: '#1e293b',
      ctaHoverColor: '#0f172a',
      brochureUrl: '/assets/images/brochures/brochure_perfect_labeler.png',
      videoUrl: null
    },
    {
      id: 'flow360',
      titlePrimary: 'PERFECT',
      titleSecondary: 'FLOW 360',
      tagline: 'Customer Relationship Management & Field Operations',
      category: 'CUSTOMER RELATIONSHIP MANAGEMENT (CRM & OPERATIONS)',
      theme: 'dark',
      image: '/assets/images/software_flow360.jpg',
      imageAlt: 'ATPL Perfect Flow 360 Enterprise CRM & Field Operations Dashboard',
      paragraphs: [
        'Create and manage leads efficiently while maintaining complete customer details and communication history in one platform. Generate professional quotations instantly and manage approvals, pricing, and sales processes with ease.',
        'Track employee attendance, working hours, and field activity through a centralized attendance management system, while monitoring sales performance, customer orders, and business growth with real-time reports and analytics.'
      ],
      bulletPoints: [
        'Create and manage leads efficiently while maintaining complete customer details and communication history in one platform.',
        'Generate professional quotations instantly and manage approvals, pricing, and sales processes with ease.',
        'Track employee attendance, working hours, and field activity through a centralized attendance management system.',
        'Monitor sales performance, customer orders, and business growth with real-time reports and analytics.',
        'Manage delivery reports and track product deliveries live to ensure smooth and timely customer service.',
        'Access customer data, sales updates, delivery tracking, and business operations anytime from anywhere securely.'
      ],
      ctaColor: '#dc2626',
      ctaHoverColor: '#b91c1c',
      portalUrl: 'https://perfectflow360.atplgroup.org',
      brochureUrl: '/assets/images/brochures/brochure_perfect_flow_360.png',
      videoUrl: null
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? softwareProducts
    : softwareProducts.filter(p => p.id === activeCategory);

  

  const scrollToProductSection = (id) => {
    setActiveCategory('all');
    setTimeout(() => {
      const el = document.getElementById(`software-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b', minHeight: '100vh' }}>
      
      {/* Dynamic 3D Styles */}
      <style>{`
        .software-card-3d {
          transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1),
                      box-shadow 0.4s ease,
                      opacity 0.4s ease,
                      filter 0.3s ease;
          transform-style: preserve-3d;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .software-card-3d:hover {
          filter: brightness(1.08);
        }
        .software-card-inner {
          width: 260px;
          height: 365px;
          background: linear-gradient(165deg, #0e172a 0%, #060b14 100%);
          border-radius: 18px;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          padding: 14px;
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.55);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .software-card-inner.focused {
          background: linear-gradient(165deg, #0d2347 0%, #061022 100%);
          border-color: #38bdf8;
          box-shadow: 0 32px 70px -10px rgba(0, 113, 186, 0.6), 
                      0 0 35px rgba(56, 189, 248, 0.4),
                      inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }
        .software-card-shadow {
          width: 210px;
          height: 16px;
          margin: 6px auto 0 auto;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.32) 0%, transparent 72%);
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.35s ease;
        }
        .software-card-shadow.focused {
          width: 250px;
          background: radial-gradient(ellipse at center, rgba(0, 113, 186, 0.45) 0%, transparent 72%);
        }
        @media (max-width: 900px) {
          .software-stage-wrap {
            overflow-x: auto;
            padding-bottom: 2rem;
            justify-content: flex-start !important;
            padding-left: 2rem;
          }
        }
      `}</style>

      {/* =========================================================================
          1. OFFICIAL HEADER SECTION (100% Matching atplgroup.com/software/)
         ========================================================================= */}
      <section style={{
        padding: 'clamp(4.5rem, 7vh, 6rem) 0 clamp(2rem, 3.5vh, 3rem) 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative'
      }}>
        <motion.div 
          className="container" 
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2.5rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.025em',
            margin: '0 0 1rem 0',
            lineHeight: 1.2,
            fontFamily: 'var(--font-display, Inter, sans-serif)'
          }}>
            SOFTWARE <strong style={{ color: '#0071ba' }}>SOLUTIONS</strong>
          </h1>

          <h2 style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.65rem)',
            fontWeight: 700,
            color: '#334155',
            lineHeight: 1.4,
            marginBottom: '1.75rem',
            maxWidth: '1100px'
          }}>
            Developing targeted software applications that connect directly into shopfloor hardware.
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            color: '#475569',
            fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: '1150px',
            textAlign: 'justify'
          }}>
            <p style={{ margin: 0 }}>
              As an industrial automation provider, we specialize in diagnosing plant bottlenecks and building targeted software systems that eliminate manual errors.
            </p>
            <p style={{ margin: 0 }}>
              Our engineering teams integrate software workflows directly with shopfloor hardware controllers, barcode verifiers, and warehouse automation systems.
            </p>
            <p style={{ margin: 0 }}>
              Our internal team of solution architects is committed to supervising the entire process, beginning with requirement gathering and concluding with the delivery of the finalized application to the customer. Simultaneously, our development team collaborates with service engineers for the integration of hardware components, specifically focusing on those who engage extensively with industry-leading OEMs.
            </p>
          </div>

          {/* Executive Performance Highlights Ribbon (UI/UX Pro Max & 21st.dev) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e2e8f0'
          }}>
            {[
              { metric: '8+ Enterprise Modules', label: 'Proprietary Industrial Stack', icon: <Boxes size={18} color="#0071ba" /> },
              { metric: '< 8ms Takt Time', label: 'Ultra-Fast Machine Vision Inspection', icon: <Activity size={18} color="#0071ba" /> },
              { metric: '100% On-Prem & Cloud', label: 'Zero Extra Printer License Fees', icon: <Printer size={18} color="#0071ba" /> },
              { metric: 'ISO & 21 CFR Compliant', label: 'IATF 16949 & DSCSA Verified', icon: <ShieldCheck size={18} color="#0071ba" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.9rem 1.1rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    {item.metric}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE 3D FANNED DEVICE SHOWCASE & PRODUCT SELECTOR
             (The exact interactive component requested by user)
         ========================================================================= */}
      <section 
        id="software-interactive-showcase"
        style={{
          backgroundColor: '#f8fafc',
          padding: 'clamp(3rem, 5vh, 4.5rem) 0 clamp(4rem, 6vh, 5.5rem) 0',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(1rem, 2vw, 2.5rem)' }}>
          
          {/* Header over Showcase */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#0071ba',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem'
            }}>
              <span>Interactive Application Stack, Select Any Device to Explore</span>
            </div>
            <h3 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
              fontWeight: 900,
              color: '#0f172a',
              margin: '0 0 0.5rem 0',
              fontFamily: 'var(--font-display, Inter, sans-serif)'
            }}>
              Featured ATPL <span style={{ color: '#0071ba' }}>Software Ecosystem</span>
            </h3>
            <p style={{ fontSize: '0.96rem', color: '#64748b', maxWidth: '750px', margin: '0 auto' }}>
              Explore our brochure-featured enterprise platforms and factory-proven production systems. Click a product tab or device to view full operational details.
            </p>
          </div>

          {/* 8 Product Navigation Pills with 21st.dev AnimatedTabs */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', width: '100%' }}>
            <AnimatedTabs
              tabs={showcaseApps.map((app) => ({
                id: app.id,
                label: app.name
              }))}
              activeTab={showcaseApps[focusedAppIndex]?.id}
              onSelectTab={(id) => {
                const idx = showcaseApps.findIndex((a) => a.id === id);
                if (idx !== -1) {
                  if (focusedAppIndex === idx) {
                    scrollToProductSection(id);
                  } else {
                    setFocusedAppIndex(idx);
                  }
                }
              }}
              layoutId="softwareShowcasePill"
            />
          </div>

          {/* 3D Fanned Software Product Cards Showcase */}
          <div 
            className="software-stage-wrap"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 65%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              position: 'relative',
              minHeight: '440px',
              padding: '1.5rem 0 1rem 0'
            }}
          >
            {showcaseApps.map((app, idx) => {
              const diff = idx - focusedAppIndex;
              let rotY = 0;
              let transZ = 0;
              let scale = 1;
              let zIndex = 5;
              let marginHorizontal = 0;

              if (diff === 0) {
                rotY = 0;
                transZ = 60;
                scale = 1.08;
                zIndex = 10;
                marginHorizontal = '12px';
              } else if (diff === -1) {
                rotY = 18;
                transZ = -15;
                scale = 0.96;
                zIndex = 8;
                marginHorizontal = '-35px';
              } else if (diff === -2) {
                rotY = 34;
                transZ = -65;
                scale = 0.86;
                zIndex = 6;
                marginHorizontal = '-30px';
              } else if (diff === 1) {
                rotY = -18;
                transZ = -15;
                scale = 0.96;
                zIndex = 8;
                marginHorizontal = '-35px';
              } else if (diff === 2) {
                rotY = -34;
                transZ = -65;
                scale = 0.86;
                zIndex = 6;
                marginHorizontal = '-30px';
              }

              const isFocused = diff === 0;

              return (
                <div
                  key={app.id}
                  className="software-card-3d"
                  onClick={() => {
                    if (isFocused) {
                      scrollToProductSection(app.id);
                    } else {
                      setFocusedAppIndex(idx);
                    }
                  }}
                  title={isFocused ? `Click to inspect full ${app.name} specifications` : `Click to view ${app.name}`}
                  style={{
                    transform: `perspective(1200px) rotateY(${rotY}deg) translateZ(${transZ}px) scale(${scale})`,
                    zIndex: zIndex,
                    marginLeft: marginHorizontal,
                    marginRight: marginHorizontal,
                    opacity: Math.abs(diff) > 2 ? 0.35 : 1
                  }}
                >
                  {/* Card Container */}
                  <div className={`software-card-inner ${isFocused ? 'focused' : ''}`}>
                    {/* Card Top: Tag Badge & Live Pulse */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: isFocused ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${isFocused ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.12)'}`,
                        color: isFocused ? '#38bdf8' : '#cbd5e1',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isFocused ? '#38bdf8' : '#10b981',
                          boxShadow: isFocused ? '0 0 8px #38bdf8' : 'none'
                        }} />
                        {app.screenData?.tag || 'ENTERPRISE'}
                      </span>

                      <span style={{
                        fontSize: '0.64rem',
                        fontWeight: 700,
                        color: '#64748b',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono, monospace)'
                      }}>
                        ATPL SUITE
                      </span>
                    </div>

                    {/* Screenshot Preview Image */}
                    <div style={{
                      position: 'relative',
                      height: '110px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                      border: `1px solid ${isFocused ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
                      backgroundColor: '#050a14'
                    }}>
                      <img 
                        src={app.image} 
                        alt={app.name} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/images/software_blueprint.svg';
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transform: isFocused ? 'scale(1.04)' : 'scale(1)',
                          transition: 'transform 0.4s ease'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '35px',
                        background: 'linear-gradient(to top, rgba(6, 11, 20, 0.95), transparent)',
                        pointerEvents: 'none'
                      }} />
                      {/* Metric Pill on Preview */}
                      <div style={{
                        position: 'absolute',
                        bottom: '6px',
                        left: '8px',
                        backgroundColor: isFocused ? 'rgba(0, 113, 186, 0.92)' : 'rgba(15, 23, 42, 0.88)',
                        backdropFilter: 'blur(4px)',
                        border: `1px solid ${isFocused ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)'}`,
                        color: '#ffffff',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '4px',
                        letterSpacing: '0.02em',
                        boxShadow: isFocused ? '0 0 10px rgba(56, 189, 248, 0.4)' : 'none'
                      }}>
                        {app.screenData?.metric || 'READY'}
                      </div>
                    </div>

                    {/* Product Name & Description */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        fontSize: '0.70rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isFocused ? '#38bdf8' : '#7dd3fc',
                        fontFamily: 'var(--font-mono, monospace)',
                        marginBottom: '2px'
                      }}>
                        {app.titlePrimary || 'PERFECT'}
                      </span>

                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: '0 0 6px 0',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-display, Inter, sans-serif)',
                        textShadow: isFocused ? '0 0 16px rgba(56, 189, 248, 0.5)' : 'none'
                      }}>
                        {app.titleSecondary || app.name.replace(/^Perfect\s*/i, '')}
                      </h4>

                      <p style={{
                        fontSize: '0.74rem',
                        color: isFocused ? '#cbd5e1' : '#94a3b8',
                        lineHeight: 1.35,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {app.tagline || app.screenData?.sub}
                      </p>
                    </div>

                    {/* Bottom Status & CTA Strip */}
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: `1px solid ${isFocused ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.70rem'
                    }}>
                      <span style={{
                        color: isFocused ? '#38bdf8' : '#64748b',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: isFocused ? '#38bdf8' : '#10b981',
                          display: 'inline-block'
                        }} />
                        <span>{isFocused ? 'Explore Specifications' : (app.screenData?.status || 'Active')}</span>
                      </span>

                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: isFocused ? '#0071ba' : 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        transition: 'all 0.2s ease',
                        boxShadow: isFocused ? '0 0 8px rgba(0, 113, 186, 0.5)' : 'none'
                      }}>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  </div>

                  {/* Floor Shadow */}
                  <div className={`software-card-shadow ${isFocused ? 'focused' : ''}`} />
                </div>
              );
            })}
          </div>
          {/* Subtle Quick Jump Action to Focused Product's Full Specifications */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => scrollToProductSection(showcaseApps[focusedAppIndex]?.id || 'flow360')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0071ba',
                border: '1.5px solid #bfdbfe',
                padding: '0.65rem 1.65rem',
                borderRadius: '999px',
                fontSize: '0.90rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 8px rgba(0, 113, 186, 0.12)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0071ba';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#0071ba';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#0071ba';
                e.currentTarget.style.borderColor = '#bfdbfe';
              }}
            >
              <span>Explore {showcaseApps[focusedAppIndex]?.name || 'Product'} Specifications</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY FILTER TABS FOR DEEP-DIVE SECTIONS
         ========================================================================= */}
      <section style={{ backgroundColor: '#ffffff', padding: '2.5rem 0 1rem 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2.5rem)' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0071ba', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono, monospace)' }}>
                DETAILED ARCHITECTURE VIEW
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0 0' }}>
                All Software Modules & Specifications
              </h3>
            </div>
            <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
              Showing {filteredProducts.length} of {softwareProducts.length} modules
            </div>
          </div>

          <div style={{
            display: 'flex',
            paddingTop: '0.85rem',
            borderTop: '1px solid #e2e8f0',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            WebkitOverflowScrolling: 'touch'
          }}>
            <AnimatedTabs
              tabs={categories}
              activeTab={activeCategory}
              onSelectTab={setActiveCategory}
              layoutId="softwareCategoryPill"
              size="sm"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. AUTHENTIC SOFTWARE PRODUCTS SHOWCASE (Alternating Dark / Light Blocks)
         ========================================================================= */}
      <section style={{ padding: 0 }}>
        {filteredProducts.map((prod) => {
          const isDark = prod.theme === 'dark';
          const isBrochureFeatured = ['mdm', 'labeler', 'flow360'].includes(prod.id);

          return (
            <div
              key={prod.id}
              id={`software-${prod.id}`}
              style={{
                backgroundColor: isDark ? '#0b162c' : '#ffffff',
                color: isDark ? '#ffffff' : '#1e293b',
                padding: 'clamp(4rem, 6.5vh, 5.5rem) 0',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2.5rem)' }}>
                <style>{`
                  .software-authentic-row {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                    align-items: center;
                  }
                  @media (min-width: 992px) {
                    .software-authentic-row {
                      grid-template-columns: 1fr 1.15fr;
                      gap: 4rem;
                    }
                  }
                  .software-authentic-img {
                    width: 100%;
                    height: auto;
                    max-height: 480px;
                    object-fit: cover;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
                    display: block;
                    border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'};
                  }
                `}</style>

                <motion.div 
                  className="software-authentic-row"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Left Column: Image with 21st.dev ParallaxTiltCard */}
                  <div style={{ position: 'relative' }}>
                    <ParallaxTiltCard tiltFactor={6} style={{ width: '100%', borderRadius: '12px' }}>
                      <img 
                        src={prod.image}
                        alt={prod.imageAlt}
                        className="software-authentic-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/images/software_blueprint.svg';
                        }}
                      />
                    </ParallaxTiltCard>
                  </div>

                  {/* Right Column: Title, Paragraphs, and Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    {/* Brochure Badge in Content */}
                    {isBrochureFeatured && (
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.5rem' }}>
                        ATPL Proprietary Suite, 2026 Edition
                      </div>
                    )}

                    {/* Category Label */}
                    <div style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isDark ? 'var(--color-brand-cyan, #38bdf8)' : 'var(--color-brand-blue, #0071ba)'
                    }}>
                      {prod.category}
                    </div>

                    {/* Headline */}
                    <h2 style={{
                      fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      margin: 0,
                      lineHeight: 1.15,
                      color: isDark ? '#38bdf8' : '#0071ba',
                      fontFamily: 'var(--font-display, Inter, sans-serif)'
                    }}>
                      {prod.titlePrimary} <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{prod.titleSecondary}</strong>
                    </h2>

                    {/* Tagline */}
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: isDark ? '#94a3b8' : '#475569',
                      marginTop: '-0.5rem'
                    }}>
                      {prod.tagline}
                    </div>

                    {/* Authentic Paragraphs (matching atplgroup.com exact text) */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.95rem',
                      color: isDark ? '#f1f5f9' : '#334155',
                      fontSize: 'clamp(0.96rem, 1.15vw, 1.05rem)',
                      lineHeight: 1.75,
                      textAlign: 'justify'
                    }}>
                      {prod.paragraphs.map((p, idx) => (
                        <p key={idx} style={{ margin: 0 }}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Key Bullet Points */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1rem',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
                      borderRadius: '10px'
                    }}>
                      {prod.bulletPoints.map((bp, bidx) => (
                        <div key={bidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.45 }}>
                          <CheckCircle2 size={15} color={isDark ? '#38bdf8' : '#0071ba'} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons: Know More, Download Brochure, Watch Video, Open Live Portal */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.9rem', marginTop: '0.5rem' }}>
                      
                      {/* Know More Button (Magnetic Spring) */}
                      <MagneticButton
                        onClick={() => openDemoModal({ solution: `${prod.titlePrimary} ${prod.titleSecondary}`, notes: `Inquiry for ${prod.titlePrimary} ${prod.titleSecondary} from Software page` })}
                        style={{
                          backgroundColor: prod.ctaColor,
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.75rem 1.65rem',
                          fontSize: '0.92rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                          minHeight: '44px'
                        }}
                      >
                        <span>Know More</span>
                        <ArrowRight size={16} />
                      </MagneticButton>

                      {/* Download Brochure Link */}
                      {prod.brochureUrl && (
                        <a
                          href={prod.brochureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                            color: isDark ? '#ffffff' : '#0f172a',
                            border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.25)' : '#cbd5e1'}`,
                            borderRadius: '6px',
                            padding: '0.75rem 1.35rem',
                            fontSize: '0.90rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.15s ease',
                            minHeight: '44px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#0071ba';
                            e.currentTarget.style.color = '#0071ba';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.25)' : '#cbd5e1';
                            e.currentTarget.style.color = isDark ? '#ffffff' : '#0f172a';
                          }}
                        >
                          <Download size={16} />
                          <span>Brochure (PDF)</span>
                        </a>
                      )}

                      {/* Video Demo Link */}
                      {prod.videoUrl && (
                        <a
                          href={prod.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.35)',
                            borderRadius: '6px',
                            padding: '0.75rem 1.25rem',
                            fontSize: '0.90rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.15s ease',
                            minHeight: '44px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        >
                          <Play size={15} fill="#ef4444" color="#ef4444" />
                          <span>Watch Video</span>
                        </a>
                      )}

                      {/* Portal Url */}
                      {prod.portalUrl && (
                        <a
                          href={prod.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.75rem 1.45rem',
                            fontSize: '0.90rem',
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.15s ease',
                            minHeight: '44px',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        >
                          <span>Open Live Portal</span>
                          <ArrowRight size={15} />
                        </a>
                      )}
                    </div>

                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
};
