import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * TECHNICAL MEDIA FALLBACK
 * High-precision vector circuit & radar pulse animation.
 * Displayed when an item lacks a raster photo so the preview never looks empty.
 */
const TechnicalMediaFallback = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 50% 50%, #0a172e 0%, #050a14 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <svg width="84" height="84" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.85 }}>
      {/* Concentric Calibration Circles */}
      <circle cx="50" cy="50" r="42" stroke="#1c2a44" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="30" stroke="#22d3ee" strokeWidth="1.2" opacity="0.65">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="9s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="16" stroke="#1c2a44" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="4" fill="#22d3ee">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Crosshair Graticules */}
      <line x1="8" y1="50" x2="92" y2="50" stroke="#1c2a44" strokeWidth="1" opacity="0.5" />
      <line x1="50" y1="8" x2="50" y2="92" stroke="#1c2a44" strokeWidth="1" opacity="0.5" />
    </svg>
    <div
      style={{
        position: 'absolute',
        bottom: '8px',
        right: '12px',
        fontSize: '9.5px',
        fontFamily: 'monospace',
        color: '#22d3ee',
        letterSpacing: '0.08em',
        opacity: 0.8
      }}
    >
      ATPL//SYS.ACTIVE
    </div>
  </div>
);

/**
 * MASTER DATA-DRIVEN CONFIGURATION
 * All authentic navigation menus, groups, items, descriptions, images and CTAs.
 */
export const MEGA_MENU_CONFIG = {
  hardware: {
    id: 'hardware',
    label: 'Hardware',
    groups: [
      {
        title: 'AIDC, RFID & SCANNING',
        items: [
          {
            id: 'rfid-portals',
            name: 'Fixed UHF RFID Portals',
            desc: 'High-throughput dock gate auto scanners',
            link: 'hardware',
            anchor: 'rfid-portals',
            img: '/assets/images/hw_rfid_portal.jpg',
            longDesc: 'Automated dock-door portals reading >1,400 tags/sec with multi-lane beamforming and zero cross-talk filtering.'
          },
          {
            id: 'dpm-scanners',
            name: 'Industrial 2D & DPM Scanners',
            desc: 'Fixed mount & rugged handheld imagers',
            link: 'hardware',
            anchor: 'barcode-scanners',
            img: '/assets/images/hw_handheld_scanner.jpg',
            longDesc: 'Ultra-rugged 2D DPM imagers certified for dot-peen, laser etched and direct part marks on automotive metal.'
          },
          {
            id: 'mobile-computers',
            name: 'Rugged Mobile Computers',
            desc: 'Android warehouse PDAs & vehicle mounts',
            link: 'hardware',
            anchor: 'mobility-tablets',
            img: '/assets/images/hw_rugged_handheld.jpg',
            longDesc: 'Drop-tested Android enterprise handhelds with long-range scan engines up to 21 meters and hot-swap batteries.'
          }
        ]
      },
      {
        title: 'PRINTERS & CODING',
        items: [
          {
            id: 'industrial-printers',
            name: 'Industrial Barcode Printers',
            desc: '600 DPI & RFID print-and-apply engines',
            link: 'hardware',
            anchor: 'barcode-printers',
            img: '/assets/images/hw_desktop_printer.jpg',
            longDesc: 'Heavy-duty 24/7 thermal transfer label printers with inline ODV-2D barcode verifiers and RFID encoder modules.'
          },
          {
            id: 'laser-marking',
            name: 'Laser & DPM Marking',
            desc: 'Permanent laser etching for automotive & metals',
            link: 'hardware',
            anchor: 'direct-marking',
            img: '/assets/images/hw_laser_marking.jpg',
            longDesc: 'Fiber and CO2 industrial lasers for permanent serial number engraving, micro-QR codes, and tamperproof marking.'
          },
          {
            id: 'mobile-printers',
            name: 'Mobile & Wearable Printers',
            desc: 'Frontline belt-clip & forklift printers',
            link: 'hardware',
            anchor: 'mobile-printers',
            img: '/assets/images/hw_mobile_printer.jpg',
            longDesc: 'Rugged mobile receipt and barcode label printers with drop resistance and IP54 dust and moisture sealing.'
          }
        ]
      },
      {
        title: 'AUTOMATION & VISION',
        items: [
          {
            id: 'sorting-gates',
            name: 'Automation & Sorting Gates',
            desc: 'Pneumatic diverters & conveyor systems',
            link: 'hardware',
            anchor: 'plc-automation',
            img: '/assets/images/hw_fixed_conveyor.jpg',
            longDesc: 'High-speed PLC conveyor diverters, motorized rollers, and multi-lane package sorting automation.'
          },
          {
            id: 'vision-sensors',
            name: 'Machine Vision Sensors',
            desc: 'Telecentric lenses & high-speed cameras',
            link: 'hardware',
            anchor: 'computer-vision',
            img: '/assets/images/hw_vision_camera.jpg',
            longDesc: 'Industrial smart cameras with onboard AI for microscopic defect detection, OCR date-code verification, and color sorting.'
          },
          {
            id: 'touch-terminals',
            name: 'Industrial Touch Panel PCs',
            desc: 'IP65 sealed HMI terminals & kiosk systems',
            link: 'hardware',
            anchor: 'industrial-touch',
            img: '/assets/images/hw_logistics_forklift.jpg',
            longDesc: 'Fanless stainless-steel industrial panel PCs and rugged touch HMIs engineered for washdown manufacturing floors.'
          }
        ]
      }
    ],
    cta: {
      text: 'Launch 360° Hardware 3D Showcase',
      sub: 'Compare real turntable videos, laser specs and optics in 3D',
      link: 'hardware',
      anchor: 'hardware-3d-deck'
    }
  },

  software: {
    id: 'software',
    label: 'Software',
    groups: [
      {
        title: 'FLAGSHIP SUITES',
        items: [
          {
            id: 'mdm',
            name: 'PerfectEdge MDM',
            desc: 'Smart device management & kiosk lockdown',
            link: 'software',
            anchor: 'mdm',
            img: '/assets/images/software_mdm.jpg',
            longDesc: 'Centralized mobile device management with over-the-air firmware updates, geo-fencing, and single-app kiosk lockdown.'
          },
          {
            id: 'labeler',
            name: 'Perfect Labeler',
            desc: 'AI prompt cloud label design & multi-branch',
            link: 'software',
            anchor: 'labeler',
            img: '/assets/images/software_labeler.jpg',
            longDesc: 'Enterprise cloud label management with AI prompt design, automated GS1 compliance, and central printer dispatch.'
          },
          {
            id: 'flow360',
            name: 'Perfect Flow 360',
            desc: 'CRM, instant quotes, attendance & live delivery',
            link: 'software',
            anchor: 'flow360',
            img: '/assets/images/software_flow360.jpg',
            longDesc: 'Unified field service, instant quotation generation, GPS route tracking, and automated proof-of-delivery workflow.'
          }
        ]
      },
      {
        title: 'SUPPLY CHAIN & PRODUCTION',
        items: [
          {
            id: 'wms',
            name: 'Perfect Store™ (WMS)',
            desc: 'Warehouse management & 3D bin slotting',
            link: 'software',
            anchor: 'wms',
            img: '/assets/images/software_warehouse.jpg',
            longDesc: 'High-density warehouse management with 3D heatmaps, FIFO/LIFO rules, pick-to-light, and bi-directional SAP/Oracle sync.'
          },
          {
            id: 'trace',
            name: 'Perfect Trace™',
            desc: 'GS1 item-to-pallet aggregation & serialization',
            link: 'software',
            anchor: 'trace',
            img: '/assets/images/software_trace.jpg',
            longDesc: '4-tier parent-child serialization compliant with DGFT and US-FDA DSCSA standards for automotive and pharma traceability.'
          },
          {
            id: 'pms',
            name: 'Perfect PMS™ (Production)',
            desc: 'Shopfloor OEE, WIP & line balancing',
            link: 'software',
            anchor: 'pms',
            img: '/assets/images/software_pms.jpg',
            longDesc: 'Real-time production monitoring with automated line cycle calculation, downtime root cause logging, and WIP ledger.'
          }
        ]
      },
      {
        title: 'AI QUALITY & COMPLIANCE',
        items: [
          {
            id: 'vision',
            name: 'Perfect AI Vision™',
            desc: 'Deep learning Pass/Fail defect QC inspection',
            link: 'software',
            anchor: 'vision',
            img: '/assets/images/atpl_ai_vision_inspection.webp',
            longDesc: 'Edge-accelerated deep learning algorithms for sub-pixel surface flaw classification, missing part checks, and label inspection.'
          },
          {
            id: 'audit',
            name: 'Perfect Audit™',
            desc: 'Digital CAPA & paperless compliance records',
            link: 'software',
            anchor: 'audit',
            img: '/assets/images/software_audit.jpg',
            longDesc: 'Paperless quality auditing with photo capture, automated corrective action triggers, and 21 CFR Part 11 audit trails.'
          },
          {
            id: 'cmms',
            name: 'Perfect Maintenance™ (CMMS)',
            desc: 'Preventive maintenance, spares & work orders',
            link: 'software',
            anchor: 'cmms',
            img: '/assets/images/atpl_tech_campus_bg.jpg',
            longDesc: 'Automated predictive maintenance scheduling, MTBF/MTTR tracking, spare parts inventory, and technician dispatch.'
          }
        ]
      }
    ],
    cta: {
      text: 'Request Live Enterprise Software Demo',
      sub: 'Book a tailored walkthrough with an ATPL systems architect',
      action: 'demo-modal',
      solution: 'Enterprise Software Suite Walkthrough'
    }
  },

  customers: {
    id: 'customers',
    label: 'Customers',
    groups: [
      {
        title: 'AUTOMOTIVE & ENGINEERING',
        items: [
          {
            id: 'automotive-ev',
            name: 'Automotive & EV Leaders',
            desc: 'Ola Electric, Bosch, Ashok Leyland & BorgWarner',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/story_automotive.jpg',
            longDesc: 'Battery pack serialization, chassis RFID tracking, and end-of-line verification across India’s leading EV and auto plants.'
          },
          {
            id: 'heavy-engg',
            name: 'Heavy Engineering & Metals',
            desc: 'JSW Steel, ArcelorMittal, L&T & Jindal Aluminium',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/hw_logistics_forklift.jpg',
            longDesc: 'Rugged yard inventory tracking, high-temperature slab barcode tags, and automated crane dispatch integrations.'
          },
          {
            id: 'electronics-oem',
            name: 'Electronics & Hardware OEMs',
            desc: 'Dell, Dixon Technologies, Pegatron & BEL',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/hw_electronics_qc.jpg',
            longDesc: 'Sub-millimeter PCB component tracking, cleanroom scanning terminals, and automated box-to-pallet packaging lines.'
          }
        ]
      },
      {
        title: 'PHARMA & CONSUMER',
        items: [
          {
            id: 'pharma-health',
            name: 'Pharma & Life Sciences',
            desc: 'Caplin Point, Micro Labs & Apollo Tyres',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/software_trace.jpg',
            longDesc: 'DGFT and US-FDA DSCSA compliant serialization with parent-child case packing and secure cryptographic 2D barcodes.'
          },
          {
            id: 'fmcg-food',
            name: 'FMCG & Cold Chain',
            desc: 'Hindustan Unilever, Hatsun Agro & Bundl Swiggy',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/story_logistics.jpg',
            longDesc: 'High-speed warehouse FIFO routing, perishables date-code verification, and temperature-controlled pallet tracking.'
          },
          {
            id: 'aviation-logistics',
            name: 'Aviation & Logistics Hubs',
            desc: 'GMR Airports, Blue Dart & ProConnect',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/atpl_isometric_factory.webp',
            longDesc: 'Dock-door RFID gates scanning >1,400 tags/sec with automated cross-docking and SAP delivery confirmation.'
          }
        ]
      },
      {
        title: 'VERIFIED EVIDENCE',
        items: [
          {
            id: 'directory-200',
            name: '200+ Client Directory',
            desc: 'Search deployments across Tier-1 manufacturers',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/atpl_team_full_group.webp',
            longDesc: 'Explore our searchable database of 200+ enterprise customers with verified plant locations and case studies.'
          },
          {
            id: 'case-studies',
            name: 'Engineering Insights & Blueprints',
            desc: 'Read technical teardowns & ROI benchmarks',
            link: 'insights',
            img: '/assets/images/atpl_tech_campus_bg.jpg',
            longDesc: 'In-depth engineering write-ups covering edge vision algorithms, sub-8ms RFID read rates, and WMS integrations.'
          },
          {
            id: 'video-proofs',
            name: 'Factory Video Case Studies',
            desc: 'Watch operational equipment in action',
            link: 'customers',
            anchor: 'client-roster',
            img: '/assets/images/atpl_factory_3d_interior.webp',
            longDesc: 'Watch real shopfloor footage of automated packaging, high-speed sorting tunnels, and live robotic workcells.'
          }
        ]
      }
    ],
    cta: {
      text: 'Download Enterprise Case Studies Portfolio',
      sub: 'Verified production results and ROI metrics across 200+ industry leaders',
      action: 'demo-modal',
      solution: 'Enterprise Customer Case Studies Portfolio'
    }
  },

  partners: {
    id: 'partners',
    label: 'Partners',
    groups: [
      {
        title: 'AIDC & BARCODE OEMS',
        items: [
          {
            id: 'honeywell-partner',
            name: 'Honeywell Scanning',
            desc: 'Gold Tier partner & regional distributor',
            link: 'partners',
            anchor: 'aidc',
            img: '/logos/honeywell.png',
            longDesc: 'Direct factory partnership for Honeywell Granit rugged scanners, Xenon imagers, and vehicle-mount terminals.'
          },
          {
            id: 'zebra-partner',
            name: 'Zebra Technologies',
            desc: 'Certified solution partner for RFID & mobile',
            link: 'partners',
            anchor: 'aidc',
            img: '/logos/zebra.svg',
            longDesc: 'Authorized partner for Zebra fixed RFID readers, antennas, mobile computers, and certified barcode media.'
          },
          {
            id: 'tsc-partner',
            name: 'TSC Printronix Auto ID',
            desc: 'Rising star industrial printing partner',
            link: 'partners',
            anchor: 'aidc',
            img: '/logos/tscprintronix.png',
            longDesc: 'Enterprise alliance for mission-critical thermal barcode printers and inline ODV-2D barcode verification engines.'
          }
        ]
      },
      {
        title: 'VISION & TRACEABILITY',
        items: [
          {
            id: 'datalogic-newland',
            name: 'Datalogic & Newland',
            desc: 'Fixed industrial cameras & 2D scan engines',
            link: 'partners',
            anchor: 'aidc',
            img: '/logos/datalogic.svg',
            longDesc: 'High-speed conveyor scanners, liquid-lens optical imagers, and embedded OEM barcode reading sub-assemblies.'
          },
          {
            id: 'telesis-forbes',
            name: 'Telesis & Forbes Macsa',
            desc: 'Direct part marking & laser coding alliances',
            link: 'partners',
            anchor: 'automation',
            img: '/logos/telesis.png',
            longDesc: 'Heavy-duty fiber laser markers, dot-peen pin indenters, and continuous inkjet packaging coders.'
          },
          {
            id: 'nilfisk-advantech',
            name: 'Nilfisk & Advantech',
            desc: 'Autonomous cleaning & industrial IoT edge',
            link: 'partners',
            anchor: 'automation',
            img: '/logos/nilfisk.png',
            longDesc: 'Autonomous plant vacuum scrubbers and fanless industrial edge computing computers for harsh environments.'
          }
        ]
      },
      {
        title: 'STANDARDS & ENTERPRISE CLOUD',
        items: [
          {
            id: 'gs1-partner',
            name: 'GS1 India Global',
            desc: 'Authorized barcode standards & serialization alliance',
            link: 'partners',
            anchor: 'cert',
            img: '/logos/gs1.svg',
            longDesc: 'Certified standards provider for GS1-128, DataMatrix, EPCIS repository architecture, and GTIN barcode compliance.'
          },
          {
            id: 'soti-partner',
            name: 'SOTI MobiControl',
            desc: 'Enterprise MDM partner & remote support',
            link: 'partners',
            anchor: 'mdm',
            img: '/logos/soti.png',
            longDesc: 'Authorized partner for centralized frontline mobile device management, asset tagging, and remote diagnostics.'
          },
          {
            id: 'erp-cloud',
            name: 'SAP & Oracle ERP Connectors',
            desc: 'Certified RFC/BAPI & REST bi-directional sync',
            link: 'partners',
            anchor: 'mdm',
            img: '/assets/images/software_blueprint.svg',
            longDesc: 'Certified zero-data-loss connectors syncing physical shopfloor scans with SAP S/4HANA and Oracle Cloud in real time.'
          }
        ]
      }
    ],
    cta: {
      text: 'Consult an OEM Integration Engineer',
      sub: 'Verify equipment compatibility, factory warranties and guaranteed SLAs',
      action: 'demo-modal',
      solution: 'OEM Hardware & Standards Integration Consultation'
    }
  }
};

/**
 * REUSABLE COMPACT MEGA MENU SYSTEM (Dark Hero-Integrated Style)
 * - Fixed ~330px panel under navbar, 0 vertical scroll on desktop.
 * - Always dark (#050a14), 1px top border (#1c2a44), deep shadow below.
 * - Left 1.35fr (3 columns x up to 3 items as rows with continuous mono 01-09, 8px hover slide).
 * - Tiny accent square (#22d3ee) before uppercase headings.
 * - Solid accent button card below last group.
 * - Right 1fr (Preview panel with faint 24px grid, 16px accent corner brackets, 22px title, solid accent Explore button).
 * - Auto-rotates every 3s when idle.
 */
export const MegaMenu = ({
  menuKey,
  isOpen,
  onClose,
  onNavigate,
  onOpenDemo,
  onMouseEnter,
  onMouseLeave
}) => {
  const menuData = MEGA_MENU_CONFIG[menuKey];
  const allItems = menuData ? menuData.groups.flatMap(g => g.items) : [];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  // Reset active item on menu swap
  useEffect(() => {
    setActiveIndex(0);
    setIsHoveringGrid(false);
  }, [menuKey]);

  // Auto-rotation every 3 seconds when mouse is not hovering rows
  useEffect(() => {
    if (!isOpen || isHoveringGrid || allItems.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % allItems.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isOpen, isHoveringGrid, allItems.length]);

  if (!isOpen || !menuData) return null;

  const activeItem = allItems[activeIndex] || allItems[0];

  const handleRowClick = (item) => {
    if (item.action === 'demo-modal') {
      if (onOpenDemo) onOpenDemo({ solution: item.solution || item.name });
    } else if (onNavigate) {
      onNavigate(item.link, item.anchor);
    }
    if (onClose) onClose();
  };

  const handleCtaClick = () => {
    const cta = menuData.cta;
    if (!cta) return;
    if (cta.action === 'demo-modal') {
      if (onOpenDemo) onOpenDemo({ solution: cta.solution || cta.text });
    } else if (onNavigate) {
      onNavigate(cta.link, cta.anchor);
    }
    if (onClose) onClose();
  };

  let globalRowCounter = 0;

  return (
    <div
      className="mega-menu-panel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#050a14',
        borderTop: '1px solid #1c2a44',
        borderBottom: '1px solid #1c2a44',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 4px 12px rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        animation: 'megaPanelReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <style>{`
        @keyframes megaPanelReveal {
          from {
            clip-path: inset(0% 0% 100% 0%);
            opacity: 0;
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
            opacity: 1;
          }
        }
        @keyframes megaRowFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes megaPreviewSlideIn {
          from {
            opacity: 0;
            transform: translateX(14px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mega-menu-content-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 20px;
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 34px;
          align-items: start;
          box-sizing: border-box;
          min-height: 310px;
        }

        .mega-grid-left {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* Each item is a row, not a box */
        .mega-row-btn {
          width: 100%;
          text-align: left;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #1c2a44;
          padding: 8px 10px;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          display: flex;
          align-items: flex-start;
          box-sizing: border-box;
          min-height: 48px;
          animation: megaRowFadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
          border-radius: 4px;
        }

        .mega-row-btn:hover,
        .mega-row-btn:focus-visible,
        .mega-row-btn.active-row {
          background-color: #13203a;
          transform: translateX(8px);
          outline: none;
        }

        .mega-row-btn:hover .mega-row-name,
        .mega-row-btn:focus-visible .mega-row-name,
        .mega-row-btn.active-row .mega-row-name {
          color: #22d3ee !important;
        }

        .mega-row-num {
          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          color: #22d3ee;
          margin-right: 8px;
          margin-top: 1px;
          flex-shrink: 0;
          opacity: 0.85;
        }

        .mega-row-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #eaf1ff;
          line-height: 1.25;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.18s ease;
        }

        .mega-row-desc {
          font-size: 11px;
          color: #8aa0c4;
          margin-top: 2px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mega-cta-card-btn {
          grid-column: span 3;
          margin-top: 8px;
          background-color: #22d3ee;
          color: #050a14;
          border: none;
          border-radius: 6px;
          padding: 10px 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          font-weight: 800;
          font-size: 12.5px;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-sizing: border-box;
          width: 100%;
          text-align: left;
        }

        .mega-cta-card-btn:hover {
          background-color: #06b6d4;
          transform: translateY(-1px);
        }

        /* Right Column Preview Panel with 24px grid & 16px corner brackets */
        .mega-preview-panel {
          position: relative;
          background-color: #08101e;
          background-image: 
            linear-gradient(rgba(28, 42, 68, 0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 42, 68, 0.45) 1px, transparent 1px);
          background-size: 24px 24px;
          border: 1px solid #1c2a44;
          border-radius: 4px;
          padding: 16px;
          height: 260px;
          max-height: 260px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* 16px accent corner brackets at top-left and bottom-right */
        .corner-bracket-tl {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 16px;
          height: 16px;
          border-top: 2px solid #22d3ee;
          border-left: 2px solid #22d3ee;
          pointer-events: none;
          z-index: 4;
        }

        .corner-bracket-br {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 16px;
          height: 16px;
          border-bottom: 2px solid #22d3ee;
          border-right: 2px solid #22d3ee;
          pointer-events: none;
          z-index: 4;
        }

        /* Responsive Breakpoint (Under 700px) */
        @media (max-width: 700px) {
          .mega-menu-panel {
            max-height: 80vh;
            overflow-y: auto;
          }
          .mega-menu-content-wrap {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 14px 12px !important;
          }
          .mega-grid-left {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          .mega-row-desc {
            display: none !important;
          }
          .mega-row-name {
            font-size: 11.5px !important;
          }
          .mega-row-btn {
            padding: 6px 6px !important;
            min-height: 38px !important;
          }
          .mega-preview-panel {
            height: 210px !important;
            max-height: 210px !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .mega-menu-panel,
          .mega-row-btn,
          .mega-preview-slide-box {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mega-menu-content-wrap">
        
        {/* LEFT COLUMN: 3 Columns of Rows with Continuous 01-09 Numbers */}
        <div>
          <div 
            className="mega-grid-left"
            onMouseEnter={() => setIsHoveringGrid(true)}
            onMouseLeave={() => setIsHoveringGrid(false)}
          >
            {menuData.groups.map((group, gIdx) => (
              <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Heading with tiny accent square */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', userSelect: 'none' }}>
                  <span style={{ width: '4px', height: '4px', backgroundColor: '#22d3ee', borderRadius: '1px', flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#8aa0c4'
                    }}
                  >
                    {group.title}
                  </span>
                </div>

                {group.items.map((item) => {
                  const currentGlobalIdx = globalRowCounter++;
                  const formattedNum = String(currentGlobalIdx + 1).padStart(2, '0');
                  const isActive = allItems[activeIndex]?.id === item.id;
                  const staggerDelay = `${currentGlobalIdx * 55}ms`;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`mega-row-btn ${isActive ? 'active-row' : ''}`}
                      style={{ animationDelay: staggerDelay }}
                      onMouseEnter={() => setActiveIndex(currentGlobalIdx)}
                      onFocus={() => setActiveIndex(currentGlobalIdx)}
                      onClick={() => handleRowClick(item)}
                      aria-label={`${item.name} - ${item.desc}`}
                    >
                      <span className="mega-row-num">{formattedNum}</span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="mega-row-name" title={item.name}>
                          {item.name}
                        </div>
                        <div className="mega-row-desc" title={item.desc}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Bottom Solid Accent-Colored Button Card */}
            {menuData.cta && (
              <button
                type="button"
                className="mega-cta-card-btn"
                onClick={handleCtaClick}
                aria-label={menuData.cta.text}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 800, fontSize: '13px', color: '#050a14' }}>
                    {menuData.cta.text}
                  </span>
                  {menuData.cta.sub && (
                    <span style={{ fontSize: '11px', color: '#092537', opacity: 0.9, marginTop: '1px' }}>
                      {menuData.cta.sub}
                    </span>
                  )}
                </div>
                <ArrowRight size={16} color="#050a14" style={{ flexShrink: 0, marginLeft: '12px' }} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Preview Panel with 24px Grid & 16px Corner Brackets */}
        {activeItem && (
          <div
            className="mega-preview-panel"
            onMouseEnter={() => setIsHoveringGrid(true)}
            onMouseLeave={() => setIsHoveringGrid(false)}
          >
            {/* 16px Accent Corner Brackets */}
            <span className="corner-bracket-tl" />
            <span className="corner-bracket-br" />

            {/* Top-Right Progress Dots showing active item */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 5
              }}
            >
              {allItems.map((it, idx) => (
                <span
                  key={it.id}
                  style={{
                    height: '3px',
                    borderRadius: '2px',
                    width: idx === activeIndex ? '14px' : '4px',
                    backgroundColor: idx === activeIndex ? '#22d3ee' : 'rgba(138, 160, 196, 0.3)',
                    transition: 'all 0.25s ease'
                  }}
                  title={it.name}
                />
              ))}
            </div>

            {/* Slide-in Animated Preview Content (0.4s) */}
            <div
              key={activeItem.id}
              className="mega-preview-slide-box"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                animation: 'megaPreviewSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <div>
                {/* Media Area on Top (about 150px tall, rounded) */}
                <div
                  style={{
                    width: '100%',
                    height: '138px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: activeItem.img?.startsWith('/logos/') ? '#ffffff' : '#050a14',
                    border: '1px solid #1c2a44',
                    marginBottom: '10px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: activeItem.img?.startsWith('/logos/') ? '14px' : '0',
                    boxSizing: 'border-box'
                  }}
                >
                  {activeItem.img && !imgErrors[activeItem.id] ? (
                    <img
                      src={activeItem.img}
                      alt={activeItem.name}
                      loading="eager"
                      onError={() => setImgErrors(prev => ({ ...prev, [activeItem.id]: true }))}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: activeItem.img?.startsWith('/logos/') ? 'contain' : 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <TechnicalMediaFallback />
                  )}
                </div>

                {/* 22px Title */}
                <h4
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#eaf1ff',
                    margin: '0 0 3px 0',
                    lineHeight: 1.25,
                    fontFamily: 'var(--font-display, inherit)'
                  }}
                >
                  {activeItem.name}
                </h4>

                {/* 1-2 Line Description in Muted Color */}
                <p
                  style={{
                    fontSize: '11.8px',
                    color: '#8aa0c4',
                    lineHeight: 1.45,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {activeItem.longDesc || activeItem.desc}
                </p>
              </div>

              {/* Bottom Solid Accent "Explore →" Button */}
              <div style={{ paddingTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleRowClick(activeItem)}
                  style={{
                    backgroundColor: '#22d3ee',
                    color: '#050a14',
                    border: 'none',
                    padding: '6px 16px',
                    borderRadius: '4px',
                    fontWeight: 800,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#06b6d4';
                    e.currentTarget.style.gap = '7px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#22d3ee';
                    e.currentTarget.style.gap = '4px';
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight size={13} color="#050a14" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MegaMenu;
