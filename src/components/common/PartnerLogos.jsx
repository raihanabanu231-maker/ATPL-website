import React, { useState } from 'react';

/**
 * High-Fidelity Official Partner Brand Logos
 * Source: Official ATPL Partner Portfolio & Brand Assets
 * Uses 100% REAL downloaded image assets from atplgroup.com and verified official repositories.
 * No drawn text, no CSS redraws. White rounded tiles, object-fit: contain, full alt & error fallback.
 */

export const PartnerLogoImg = ({
  src,
  alt,
  title,
  height = 36,
  className = '',
  style = {},
  fallbackText = ''
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        className={`partner-logo-fallback ${className}`}
        style={{
          color: '#0f172a',
          fontWeight: 800,
          fontSize: '0.92rem',
          letterSpacing: '-0.01em',
          display: 'inline-block',
          ...style
        }}
        title={title || alt}
        aria-label={alt}
      >
        {fallbackText || title || alt}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      title={title || alt}
      loading="lazy"
      decoding="async"
      className={`partner-logo-img ${className}`}
      onError={() => setHasError(true)}
      style={{
        maxHeight: typeof height === 'number' ? `${height}px` : height,
        maxWidth: '100%',
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        ...style
      }}
    />
  );
};

// 1. Honeywell Scanning & Mobility
export const HoneywellLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/honeywell.png"
    alt="Honeywell Scanning & Mobility"
    title="Honeywell"
    height={height}
    className={className}
    style={style}
    fallbackText="Honeywell"
  />
);

// 2. Zebra Technologies
export const ZebraLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/zebra.svg"
    alt="Zebra Technologies Corporation"
    title="Zebra Technologies"
    height={height}
    className={className}
    style={style}
    fallbackText="Zebra"
  />
);

// 3. Nilfisk Industrial
export const NilfiskLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/nilfisk.png"
    alt="Nilfisk Industrial Cleaning & Automation"
    title="Nilfisk"
    height={height}
    className={className}
    style={style}
    fallbackText="Nilfisk"
  />
);

// 4. SOTI MobiControl
export const SotiLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/soti.png"
    alt="SOTI MobiControl Enterprise Mobility"
    title="SOTI"
    height={height}
    className={className}
    style={style}
    fallbackText="SOTI"
  />
);

// 5. Telesis Technologies
export const TelesisLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/telesis.png"
    alt="Telesis Technologies, Inc. Laser Marking"
    title="Telesis"
    height={height}
    className={className}
    style={style}
    fallbackText="Telesis"
  />
);

// 6. Bradma Marking
export const BradmaLogo = ({ height = 38, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/bradma.png"
    alt="Bradma Automating The Future"
    title="Bradma"
    height={height}
    className={className}
    style={style}
    fallbackText="Bradma"
  />
);

// 7. Axis Communications
export const AxisLogo = ({ height = 38, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/axis.svg"
    alt="Axis Communications AB Network Cameras & Vision"
    title="Axis Communications"
    height={height}
    className={className}
    style={style}
    fallbackText="Axis"
  />
);

// 8. Forbes Macsa id
export const ForbesMacsaLogo = ({ height = 40, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/forbesmacsa.png"
    alt="Forbes Macsa id Private Limited Laser & Coding"
    title="Forbes Macsa"
    height={height}
    className={className}
    style={style}
    fallbackText="Forbes Macsa"
  />
);

// 9. TSC Printronix Auto ID
export const TscPrintronixLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/tscprintronix.png"
    alt="TSC Printronix Auto ID Industrial Printers"
    title="TSC Printronix"
    height={height}
    className={className}
    style={style}
    fallbackText="TSC Printronix"
  />
);

// 10. Advantech
export const AdvantechLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/advantech.png"
    alt="Advantech Co., Ltd. Industrial IoT & Computing"
    title="Advantech"
    height={height}
    className={className}
    style={style}
    fallbackText="Advantech"
  />
);

// 11. Raiser Industrial
export const RaiserLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/raiser.png"
    alt="Raiser Industrial Conveyor Logistics"
    title="Raiser"
    height={height}
    className={className}
    style={style}
    fallbackText="Raiser"
  />
);

// 12. Kendo
export const KendoLogo = ({ height = 44, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/kendo.svg"
    alt="Kendo UI Systems & Tools"
    title="Kendo"
    height={height}
    className={className}
    style={style}
    fallbackText="Kendo"
  />
);

// 13. Datalogic
export const DatalogicLogo = ({ height = 38, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/datalogic.svg"
    alt="Datalogic S.p.A. Machine Vision & Fixed Scanners"
    title="Datalogic"
    height={height}
    className={className}
    style={style}
    fallbackText="Datalogic"
  />
);

// 14. CipherLab
export const CipherLabLogo = ({ height = 36, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/cipherlab.png"
    alt="CipherLab Co., Ltd. Enterprise Handhelds"
    title="CipherLab"
    height={height}
    className={className}
    style={style}
    fallbackText="CipherLab"
  />
);

// 15. Newland AIDC
export const NewlandLogo = ({ height = 40, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/newland.svg"
    alt="Newland AIDC Scanning & OEM Engines"
    title="Newland"
    height={height}
    className={className}
    style={style}
    fallbackText="Newland"
  />
);

// 16. GS1 India
export const Gs1Logo = ({ height = 34, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/gs1.svg"
    alt="GS1 India (Global Standards 1)"
    title="GS1 India"
    height={height}
    className={className}
    style={style}
    fallbackText="GS1 India"
  />
);

// 17. CSL (Convergence Systems Limited)
export const CslLogo = ({ height = 34, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/csl.svg"
    alt="Convergence Systems Limited RFID"
    title="CSL"
    height={height}
    className={className}
    style={style}
    fallbackText="CSL"
  />
);

// 18. Fargo (HID Global)
export const FargoLogo = ({ height = 34, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/fargo.svg"
    alt="HID Global (Fargo) ID Card Printers"
    title="Fargo"
    height={height}
    className={className}
    style={style}
    fallbackText="Fargo"
  />
);

// 19. ISO 9001:2015 QMS
export const IsoLogo = ({ height = 34, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/iso.svg"
    alt="ISO 9001:2015 Certified Quality Management System"
    title="ISO 9001:2015"
    height={height}
    className={className}
    style={style}
    fallbackText="ISO 9001"
  />
);

// 20. Startup India DPIIT
export const StartupIndiaLogo = ({ height = 34, className = '', style = {} }) => (
  <PartnerLogoImg
    src="/logos/startupindia.svg"
    alt="Startup India DPIIT Govt. Recognized Enterprise"
    title="Startup India"
    height={height}
    className={className}
    style={style}
    fallbackText="#startupindia"
  />
);

/**
 * Map of partner identifiers to components
 */
export const PARTNER_LOGOS_MAP = {
  honeywell: HoneywellLogo,
  zebra: ZebraLogo,
  nilfisk: NilfiskLogo,
  soti: SotiLogo,
  telesis: TelesisLogo,
  bradma: BradmaLogo,
  axis: AxisLogo,
  forbesmacsa: ForbesMacsaLogo,
  tscprintronix: TscPrintronixLogo,
  tsc: TscPrintronixLogo,
  printronix: TscPrintronixLogo,
  advantech: AdvantechLogo,
  raiser: RaiserLogo,
  kendo: KendoLogo,
  datalogic: DatalogicLogo,
  cipherlab: CipherLabLogo,
  newland: NewlandLogo,
  gs1: Gs1Logo,
  csl: CslLogo,
  fargo: FargoLogo,
  iso: IsoLogo,
  startupindia: StartupIndiaLogo
};

export const ALL_PARTNER_LOGOS = [
  // AIDC & RFID OEMs
  { id: 'honeywell', name: 'Honeywell Scanning', full: 'Honeywell Scanning & Mobility', component: HoneywellLogo, img: '/logos/honeywell.png', height: 32, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'zebra', name: 'Zebra Technologies', full: 'Zebra Technologies Corporation', component: ZebraLogo, img: '/logos/zebra.svg', height: 30, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'tscprintronix', name: 'TSC Printronix Auto ID', full: 'TSC Printronix Auto ID', component: TscPrintronixLogo, img: '/logos/tscprintronix.png', height: 30, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'datalogic', name: 'Datalogic Scanning', full: 'Datalogic S.p.A.', component: DatalogicLogo, img: '/logos/datalogic.svg', height: 30, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'newland', name: 'Newland AIDC', full: 'Newland AIDC', component: NewlandLogo, img: '/logos/newland.svg', height: 32, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'cipherlab', name: 'CipherLab Mobile', full: 'CipherLab Co., Ltd.', component: CipherLabLogo, img: '/logos/cipherlab.png', height: 28, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'csl', name: 'CSL RFID', full: 'Convergence Systems Limited', component: CslLogo, img: '/logos/csl.svg', height: 28, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },
  { id: 'fargo', name: 'Fargo ID Printers', full: 'HID Global (Fargo)', component: FargoLogo, img: '/logos/fargo.svg', height: 28, category: 'aidc', categoryName: 'AIDC & RFID OEMs' },

  // Automation & Laser Traceability
  { id: 'telesis', name: 'Telesis Technologies', full: 'Telesis Technologies, Inc.', component: TelesisLogo, img: '/logos/telesis.png', height: 28, category: 'automation', categoryName: 'Automation & Laser Traceability' },
  { id: 'nilfisk', name: 'Nilfisk Industrial', full: 'Nilfisk Industrial', component: NilfiskLogo, img: '/logos/nilfisk.png', height: 32, category: 'automation', categoryName: 'Automation & Laser Traceability' },
  { id: 'forbesmacsa', name: 'Forbes Macsa id', full: 'Forbes Macsa id Private Limited', component: ForbesMacsaLogo, img: '/logos/forbesmacsa.png', height: 34, category: 'automation', categoryName: 'Automation & Laser Traceability' },
  { id: 'bradma', name: 'Bradma Marking', full: 'Bradma Automating The Future', component: BradmaLogo, img: '/logos/bradma.png', height: 32, category: 'automation', categoryName: 'Automation & Laser Traceability' },
  { id: 'axis', name: 'Axis Communications', full: 'Axis Communications AB', component: AxisLogo, img: '/logos/axis.svg', height: 32, category: 'automation', categoryName: 'Automation & Laser Traceability' },
  { id: 'raiser', name: 'Raiser Industrial', full: 'Raiser Industrial', component: RaiserLogo, img: '/logos/raiser.png', height: 28, category: 'automation', categoryName: 'Automation & Laser Traceability' },

  // Enterprise MDM & Software
  { id: 'soti', name: 'SOTI MobiControl', full: 'SOTI Inc.', component: SotiLogo, img: '/logos/soti.png', height: 30, category: 'mdm', categoryName: 'Enterprise MDM & Software' },
  { id: 'advantech', name: 'Advantech IIoT', full: 'Advantech Co., Ltd.', component: AdvantechLogo, img: '/logos/advantech.png', height: 28, category: 'mdm', categoryName: 'Enterprise MDM & Software' },
  { id: 'kendo', name: 'Kendo UI Systems', full: 'Kendo UI Systems', component: KendoLogo, img: '/logos/kendo.svg', height: 34, category: 'mdm', categoryName: 'Enterprise MDM & Software' },

  // Standards & Regulatory Certifications
  { id: 'gs1', name: 'GS1 India (GS1 Global)', full: 'GS1 India (Global Standards 1)', component: Gs1Logo, img: '/logos/gs1.svg', height: 32, category: 'cert', categoryName: 'Government & GS1 Standards' },
  { id: 'iso', name: 'ISO 9001:2015 QMS', full: 'ISO 9001:2015 Certified Quality Management System', component: IsoLogo, img: '/logos/iso.svg', height: 32, category: 'cert', categoryName: 'Government & GS1 Standards' },
  { id: 'startupindia', name: 'Startup India DPIIT', full: 'Startup India DPIIT Govt. Recognized Enterprise', component: StartupIndiaLogo, img: '/logos/startupindia.svg', height: 30, category: 'cert', categoryName: 'Government & GS1 Standards' }
];

export const PartnerLogo = ({ name, height = 32, className = '' }) => {
  if (!name) return null;
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const [mapKey, Comp] of Object.entries(PARTNER_LOGOS_MAP)) {
    if (key.includes(mapKey)) {
      return <Comp height={height} className={className} />;
    }
  }
  return <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>{name}</span>;
};

/**
 * Interactive / Responsive Logo Marquee / Showcase Grid
 * Renders each partner logo inside an authentic white rounded tile.
 * Height is 48px on desktop and 40px on mobile, preserving aspect ratio.
 */
export const OfficialPartnersShowcase = ({ 
  theme = 'dark', 
  category = 'all', 
  onSelectCategory = null 
}) => {
  const isDark = theme === 'dark';

  const displayedLogos = category === 'all'
    ? ALL_PARTNER_LOGOS
    : ALL_PARTNER_LOGOS.filter(p => p.category === category);

  const categoryTitles = {
    all: 'Our Official Global OEM & Standards Partners',
    aidc: 'AIDC, Barcode & RFID OEM Alliances',
    automation: 'Robotics, Laser Marking & Traceability Alliances',
    mdm: 'Enterprise MDM & Industrial Software Alliances',
    cert: 'Accredited Standards & Government Certifications'
  };

  const categoryBadgeColors = {
    all: '#0071ba',
    aidc: '#0071ba',
    automation: '#E85874',
    mdm: '#0284c7',
    cert: '#00f0ff'
  };

  const badgeColor = categoryBadgeColors[category] || '#0071ba';
  const sectionTitle = categoryTitles[category] || 'Our Official Global Partners';

  return (
    <div style={{
      backgroundColor: isDark ? '#0a1324' : '#ffffff',
      border: isDark ? `1px solid ${badgeColor}30` : '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      boxShadow: isDark ? `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${badgeColor}15` : '0 10px 30px rgba(0, 0, 0, 0.04)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    }}>
      <style>{`
        .official-partner-tile {
          background-color: #ffffff !important;
          border-radius: 12px;
          padding: 0.65rem 1.25rem;
          display: flex;
          align-items: center;
          justifyContent: center;
          height: 48px;
          min-height: 48px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        @media (max-width: 480px) {
          .official-partner-tile {
            height: 40px !important;
            min-height: 40px !important;
            padding: 0.5rem 0.85rem !important;
          }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          backgroundColor: isDark ? `${badgeColor}20` : 'rgba(232, 88, 116, 0.1)',
          color: badgeColor,
          border: `1px solid ${badgeColor}50`,
          padding: '0.35rem 1rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: badgeColor,
            boxShadow: `0 0 6px ${badgeColor}`
          }} />
          {category === 'all' ? `All ${ALL_PARTNER_LOGOS.length} Official Brand Alliances` : `Showing ${displayedLogos.length} Verified Alliances`}
        </span>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 900,
          color: isDark ? '#ffffff' : '#0f172a',
          margin: 0,
          fontFamily: 'var(--font-display, sans-serif)'
        }}>
          {sectionTitle}
        </h2>
        <p style={{
          color: isDark ? '#94a3b8' : '#64748b',
          fontSize: '0.92rem',
          marginTop: '0.5rem',
          marginBottom: 0
        }}>
          Certified Tier-1 equipment integrations, direct factory hardware distribution, and SLA warranties.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '1.25rem',
        alignItems: 'center'
      }}>
        {displayedLogos.map((partner) => {
          const LogoComp = partner.component;
          return (
            <div
              key={partner.id}
              className="official-partner-tile"
              title={partner.full || partner.name}
              aria-label={partner.full || partner.name}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 12px 25px ${badgeColor}35`;
                e.currentTarget.style.borderColor = badgeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              <LogoComp height={partner.height} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
