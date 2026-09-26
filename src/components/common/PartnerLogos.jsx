import React from 'react';

/**
 * High-Fidelity Official Partner Brand Logos
 * Source: Official ATPL Partner Portfolio (Honeywell, Zebra, Nilfisk, SOTI, Telesis, Bradma, Axis, Forbes Macsa, TSC Printronix, Advantech, Raiser, Kendo, Datalogic, CipherLab, Newland)
 */

export const HoneywellLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 200 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="36" fill="#ED1C24" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="42" fontWeight="900" letterSpacing="-0.5px">
      Honeywell
    </text>
  </svg>
);

export const ZebraLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 190 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* Zebra Head Stripes Mark */}
    <g transform="translate(0, 4) scale(0.9)">
      <path d="M5 40 L15 5 L20 5 L10 40 Z" fill="#000000" />
      <path d="M16 40 L25 10 L30 10 L21 40 Z" fill="#000000" />
      <path d="M26 40 L34 16 L38 16 L31 40 Z" fill="#000000" />
      <path d="M36 28 L39 20 L42 20 L38 28 Z" fill="#000000" />
    </g>
    <text x="48" y="38" fill="#000000" fontFamily="'Arial Black', 'Helvetica Neue', sans-serif" fontSize="36" fontWeight="900" letterSpacing="1px">
      ZEBRA
    </text>
  </svg>
);

export const NilfiskLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* Nilfisk Spiral Emblem */}
    <g transform="translate(4, 5)">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#002855" strokeWidth="3" />
      <path d="M20 7 A13 13 0 0 1 33 20 A9 9 0 0 1 24 29 A5 5 0 0 1 19 24" fill="none" stroke="#002855" strokeWidth="3" strokeLinecap="round" />
    </g>
    <text x="52" y="36" fill="#002855" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="34" fontWeight="800" letterSpacing="-0.5px">
      Nilfisk
    </text>
    <circle cx="158" cy="14" r="3" fill="none" stroke="#002855" strokeWidth="0.8" />
    <text x="158" y="16.5" fill="#002855" fontSize="4.5" textAnchor="middle" fontWeight="bold">R</text>
  </svg>
);

export const SotiLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 150 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="38" fill="#0054A6" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="44" fontWeight="800" letterSpacing="2px">
      SOT
    </text>
    <text x="100" y="38" fill="#0054A6" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="44" fontWeight="800">
      I
    </text>
    <rect x="100" y="4" width="8" height="8" fill="#E31B23" />
    <circle cx="126" cy="14" r="3" fill="none" stroke="#0054A6" strokeWidth="0.8" />
    <text x="126" y="16.5" fill="#0054A6" fontSize="4.5" textAnchor="middle" fontWeight="bold">R</text>
  </svg>
);

export const TelesisLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 170 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="34" fill="#0A2A5E" fontFamily="'Arial Black', sans-serif" fontSize="32" fontWeight="900" letterSpacing="1px">
      TELESIS
    </text>
    {/* Light beam on the S */}
    <polygon points="120,20 135,16 125,23" fill="#38BDF8" opacity="0.85" />
  </svg>
);

export const BradmaLogo = ({ height = 38 }) => (
  <svg height={height} viewBox="0 0 180 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="5" y="34" fill="#D32F2F" fontFamily="'Brush Script MT', 'Segoe Script', cursive, sans-serif" fontSize="40" fontWeight="bold">
      Bradma
    </text>
    <text x="5" y="49" fill="#1E293B" fontFamily="Arial, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.5px">
      Automating The Future
    </text>
  </svg>
);

export const AxisLogo = ({ height = 38 }) => (
  <svg height={height} viewBox="0 0 210 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="34" fill="#000000" fontFamily="'Arial Black', sans-serif" fontSize="38" fontWeight="900" letterSpacing="2px">
      AXIS
    </text>
    {/* Yellow/Red Axis Triangle Logo */}
    <g transform="translate(138, 4) scale(0.7)">
      <polygon points="25,0 50,42 0,42" fill="#FDB913" />
      <polygon points="15,22 35,22 25,42" fill="#E30613" />
    </g>
    <text x="0" y="49" fill="#000000" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" letterSpacing="3.5px">
      COMMUNICATIONS
    </text>
  </svg>
);

export const ForbesMacsaLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* Arch Emblem */}
    <g transform="translate(75, 0) scale(0.65)">
      <path d="M0 45 C15 45 25 20 30 0 C35 20 45 45 60 45 L60 55 C40 55 30 30 30 15 C30 30 20 55 0 55 Z" fill="#C8102E" />
      <path d="M-10 48 C5 48 15 25 22 10 L28 10 C20 28 10 55 -10 55 Z" fill="#002855" />
    </g>
    <text x="15" y="48" fill="#002855" fontFamily="'Arial Black', sans-serif" fontSize="16" fontWeight="900" letterSpacing="0.5px">
      FORBES
    </text>
    <text x="96" y="48" fill="#C8102E" fontFamily="'Arial Black', sans-serif" fontSize="17" fontWeight="900">
      Macsa
    </text>
    <text x="160" y="48" fill="#002855" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800">
      id
    </text>
    <text x="35" y="60" fill="#64748B" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="2.5px">
      A CODE YOU CAN TRUST
    </text>
  </svg>
);

export const TscPrintronixLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 230 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* TSC side */}
    <rect x="0" y="32" width="70" height="6" fill="#ED1C24" />
    <text x="0" y="28" fill="#005BAC" fontFamily="'Arial Black', sans-serif" fontSize="34" fontWeight="900" letterSpacing="1px">
      TSC
    </text>
    {/* Printronix side */}
    <g transform="translate(76, 2)">
      <rect x="0" y="0" width="150" height="42" fill="#005BAC" rx="3" />
      <text x="8" y="22" fill="#FFFFFF" fontFamily="'Arial Black', sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.5px">
        PRINTRONIX
      </text>
      <text x="35" y="36" fill="#38BDF8" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="800" letterSpacing="2px">
        AUTO ID
      </text>
    </g>
  </svg>
);

export const AdvantechLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 170 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <rect x="0" y="0" width="170" height="42" fill="#003E7E" rx="3" />
    <text x="12" y="30" fill="#FFFFFF" fontFamily="'Arial Black', sans-serif" fontSize="23" fontWeight="900" letterSpacing="1.5px">
      ADVANTECH
    </text>
    {/* Distinct stylized A cross */}
    <polygon points="34,22 45,22 39.5,12" fill="#003E7E" />
    <polygon points="37,20 42,20 39.5,15" fill="#38BDF8" />
  </svg>
);

export const RaiserLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="32" fill="#D32F2F" fontFamily="'Arial Black', sans-serif" fontSize="34" fontWeight="900" letterSpacing="2px">
      RAISER
    </text>
    <rect x="0" y="38" width="155" height="5" fill="#D32F2F" />
    <polygon points="145,26 158,15 152,32" fill="#D32F2F" />
  </svg>
);

export const KendoLogo = ({ height = 44 }) => (
  <svg height={height} viewBox="0 0 210 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <rect x="0" y="0" width="210" height="65" rx="4" fill="#F26522" />
    <text x="25" y="40" fill="#FFFFFF" fontFamily="'Arial Black', sans-serif" fontSize="34" fontWeight="900" letterSpacing="2px">
      KENDO
    </text>
    <circle cx="178" cy="22" r="4" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
    <text x="178" y="25" fill="#FFFFFF" fontSize="6" textAnchor="middle" fontWeight="bold">R</text>
    <text x="25" y="55" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="10.5" fontWeight="600" opacity="0.95">
      Your Professional Partner
    </text>
  </svg>
);

export const DatalogicLogo = ({ height = 38 }) => (
  <svg height={height} viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* Datalogic Target Circle */}
    <g transform="translate(0, 4)">
      <circle cx="18" cy="18" r="16" fill="none" stroke="#003B71" strokeWidth="3" />
      <circle cx="18" cy="18" r="8" fill="#003B71" />
      <line x1="2" y1="18" x2="34" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="18" y1="2" x2="18" y2="34" stroke="#FFFFFF" strokeWidth="2.5" />
    </g>
    <text x="44" y="28" fill="#003B71" fontFamily="'Arial Black', sans-serif" fontSize="26" fontWeight="900" letterSpacing="1px">
      DATALOGIC
    </text>
    <text x="65" y="44" fill="#003B71" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="800" letterSpacing="2px">
      THE VISION IS YOURS
    </text>
  </svg>
);

export const CipherLabLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 170 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    <text x="0" y="30" fill="#002D62" fontFamily="'Arial Black', sans-serif" fontSize="24" fontWeight="900" letterSpacing="0.5px">
      CIPHER
    </text>
    <rect x="106" y="4" width="58" height="34" fill="#0071BA" rx="2" />
    <text x="112" y="29" fill="#FFFFFF" fontFamily="'Arial Black', sans-serif" fontSize="22" fontWeight="900">
      LAB
    </text>
  </svg>
);

export const NewlandLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 200 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: height, width: 'auto' }}>
    {/* Newland Diagonal Stripe Diamond */}
    <g transform="translate(0, 4) scale(0.85)">
      <rect x="0" y="20" width="30" height="30" transform="rotate(-45 15 35)" fill="none" stroke="#002F6C" strokeWidth="3" />
      <line x1="8" y1="35" x2="38" y2="35" stroke="#002F6C" strokeWidth="2.5" />
      <line x1="13" y1="28" x2="33" y2="28" stroke="#002F6C" strokeWidth="2.5" />
      <line x1="13" y1="42" x2="33" y2="42" stroke="#002F6C" strokeWidth="2.5" />
    </g>
    <text x="44" y="26" fill="#002F6C" fontFamily="'Arial Black', sans-serif" fontSize="21" fontWeight="900">
      Newland
    </text>
    <text x="138" y="26" fill="#002F6C" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800">
      AIDC
    </text>
    <text x="45" y="43" fill="#E85874" fontFamily="Arial, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="0.5px">
      Scanning Made Simple
    </text>
  </svg>
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
  advantech: AdvantechLogo,
  raiser: RaiserLogo,
  kendo: KendoLogo,
  datalogic: DatalogicLogo,
  cipherlab: CipherLabLogo,
  newland: NewlandLogo
};

export const ALL_PARTNER_LOGOS = [
  { id: 'honeywell', name: 'Honeywell', component: HoneywellLogo, height: 32 },
  { id: 'zebra', name: 'Zebra Technologies', component: ZebraLogo, height: 30 },
  { id: 'nilfisk', name: 'Nilfisk', component: NilfiskLogo, height: 32 },
  { id: 'soti', name: 'SOTI', component: SotiLogo, height: 30 },
  { id: 'telesis', name: 'Telesis', component: TelesisLogo, height: 28 },
  { id: 'bradma', name: 'Bradma', component: BradmaLogo, height: 32 },
  { id: 'axis', name: 'Axis Communications', component: AxisLogo, height: 32 },
  { id: 'forbesmacsa', name: 'Forbes Macsa id', component: ForbesMacsaLogo, height: 34 },
  { id: 'tscprintronix', name: 'TSC Printronix Auto ID', component: TscPrintronixLogo, height: 30 },
  { id: 'advantech', name: 'Advantech', component: AdvantechLogo, height: 28 },
  { id: 'raiser', name: 'Raiser', component: RaiserLogo, height: 28 },
  { id: 'kendo', name: 'Kendo', component: KendoLogo, height: 34 },
  { id: 'datalogic', name: 'Datalogic', component: DatalogicLogo, height: 30 },
  { id: 'cipherlab', name: 'CipherLab', component: CipherLabLogo, height: 28 },
  { id: 'newland', name: 'Newland AIDC', component: NewlandLogo, height: 32 }
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
 */
export const OfficialPartnersShowcase = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <div style={{
      backgroundColor: isDark ? '#0a1324' : '#ffffff',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      boxShadow: isDark ? '0 20px 50px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          display: 'inline-block',
          backgroundColor: isDark ? 'rgba(232, 88, 116, 0.15)' : 'rgba(232, 88, 116, 0.1)',
          color: '#E85874',
          border: '1px solid rgba(232, 88, 116, 0.3)',
          padding: '0.35rem 1rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem'
        }}>
          Authorized OEM Alliances & Integrations
        </span>
        <h3 style={{
          fontSize: '1.8rem',
          fontWeight: 900,
          color: isDark ? '#ffffff' : '#0f172a',
          margin: 0,
          fontFamily: 'var(--font-display, sans-serif)'
        }}>
          Our Official Global Partners
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        alignItems: 'center'
      }}>
        {ALL_PARTNER_LOGOS.map((partner) => {
          const LogoComp = partner.component;
          return (
            <div
              key={partner.id}
              style={{
                backgroundColor: isDark ? '#ffffff' : '#f8fafc',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '75px',
                boxShadow: isDark ? '0 4px 15px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #e2e8f0',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 113, 186, 0.25)';
                e.currentTarget.style.borderColor = '#0071ba';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 15px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';
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
