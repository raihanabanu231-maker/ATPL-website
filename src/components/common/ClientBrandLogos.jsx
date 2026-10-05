import React, { useState } from 'react';
import { REAL_CLIENTS_DATA, FEATURED_MARQUEE_CLIENTS } from '../../data/realClientsData';

/**
 * Authentic Official Enterprise Client Brand Logos for ATPL Group
 * Extracted directly from ATPL certified client & OEM partner roster.
 */

// Mapping of common slug aliases to canonical client IDs
const CLIENT_SLUG_ALIASES = {
  'ola': 'ola-electric',
  'ola electric': 'ola-electric',
  'bosch': 'bosch',
  'jsw': 'arcelormittal',
  'jsw steel': 'arcelormittal',
  'abb': 'abb',
  'apollo': 'apollo-tyres',
  'apollo tyres': 'apollo-tyres',
  'hul': 'hindustan-unilever',
  'hindustan unilever': 'hindustan-unilever',
  'caplin': 'caplin-steriles',
  'caplin point': 'caplin-steriles',
  'caplin steriles': 'caplin-steriles',
  'dixon': 'dixon-technologies',
  'dixon technologies': 'dixon-technologies',
  'dell': 'dell-technologies',
  'dell technologies': 'dell-technologies',
  'lt': 'larsen-toubro',
  'larsen & toubro': 'larsen-toubro',
  'l&t': 'larsen-toubro',
  'l&t hydrocarbon': 'lt-hydrocarbon',
  'bel': 'bel-bharat-electronics',
  'bharat electronics': 'bel-bharat-electronics',
  'ashok leyland': 'arun-automobiles',
  'borgwarner': 'borgwarner',
  'pegatron': 'pegatron-electronics',
  'endress+hauser': 'endress-hauser',
  'endress': 'endress-hauser',
  'emerson': 'emerson',
  'gmr': 'gmr-airports',
  'gmr goa': 'gmr-goa-airport',
  'hatsun': 'hatsun-agro',
  'hap': 'hatsun-agro',
  'swiggy': 'bundl-swiggy',
  'bundl': 'bundl-swiggy',
  'titan': 'delta-jewellers',
  'seoyon': 'seoyon-ehwa',
  'seoyon e-hwa': 'seoyon-ehwa',
  'magna': 'magna-cosma',
  'cosma': 'magna-cosma',
  'psa': 'psa-avtec',
  'avtec': 'psa-avtec',
  'sipcot': 'sipcot-tamilnadu',
  'iit madras': 'iit-madras',
  'shanthi gears': 'shanthi-gears',
  'rane': 'rane-madras',
  'jindal': 'jindal-aluminium',
  'kosei minda': 'kosei-minda',
  'jamna auto': 'jamna-auto',
  'flyjac': 'flyjac-logistics',
  'harting': 'harting-india',
  'marposs': 'marposs-india',
  'roche': 'roche-diagnostics',
  'cavli': 'cavli-wireless',
  'forbes': 'forbes-macsaid',
  'forbes macsa': 'forbes-macsaid',
  'cholayil': 'cholayil',
  'medimix': 'cholayil'
};

/**
 * Universal Authentic Client Logo component that renders real extracted logos
 */
export const ClientLogo = ({ clientName, slug, height = 54, className = '', style = {} }) => {
  const [imageError, setImageError] = useState(false);

  let targetSlug = slug;
  if (!targetSlug && clientName) {
    const clean = clientName.toLowerCase().trim();
    targetSlug = CLIENT_SLUG_ALIASES[clean] || clean.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  }

  // Find client record if possible
  const clientRecord = REAL_CLIENTS_DATA.find(c => c.slug === targetSlug || c.slug.includes(targetSlug) || targetSlug.includes(c.slug));
  const finalSlug = clientRecord ? clientRecord.slug : (targetSlug || 'abb');
  const logoSrc = `/assets/images/clients/${finalSlug}.png`;
  const displayName = clientRecord ? clientRecord.name : (clientName || finalSlug);

  if (imageError) {
    return (
      <div 
        className={className} 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '0.5rem 0.85rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          fontWeight: 800, 
          fontSize: '0.95rem', 
          color: '#0f172a',
          letterSpacing: '0.5px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          ...style 
        }}
        title={displayName}
      >
        {displayName}
      </div>
    );
  }

  return (
    <img
      src={logoSrc}
      alt={`${displayName} Official Logo`}
      title={displayName}
      className={className}
      onError={() => setImageError(true)}
      style={{
        maxHeight: `${height}px`,
        maxWidth: '180px',
        width: 'auto',
        height: `${height}px`,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: 'contrast(1.08) drop-shadow(0 1px 3px rgba(0,0,0,0.08))',
        ...style
      }}
      loading="lazy"
    />
  );
};

/**
 * Infinite Scrolling Authentic Marquee for Homepage & Showcase
 */
export const AuthenticClientsMarquee = ({ direction = 'left', speed = 35 }) => {
  // Select featured verified clients
  const featuredList = REAL_CLIENTS_DATA.filter(c => FEATURED_MARQUEE_CLIENTS.includes(c.slug));
  const displayItems = featuredList.length > 0 ? featuredList : REAL_CLIENTS_DATA.slice(0, 32);

  // Duplicate for seamless infinite loop
  const marqueeItems = [...displayItems, ...displayItems];

  return (
    <div style={{
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      padding: '0.75rem 0',
      maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
    }}>
      <div 
        style={{
          display: 'flex',
          gap: '1.25rem',
          width: 'max-content',
          animation: `marqueeScroll${direction === 'right' ? 'Reverse' : ''} ${speed}s linear infinite`
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {marqueeItems.map((client, idx) => (
          <div
            key={`${client.id}-${idx}`}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '0.6rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '180px',
              height: '82px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.25s ease',
              flexShrink: 0
            }}
          >
            <ClientLogo slug={client.slug} clientName={client.name} height={54} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Standard Certification Badges
 */
export const IsoBadge = ({ height = 30 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#0071ba', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
    ISO 9001:2015 CERTIFIED
  </span>
);

export const StartupIndiaBadge = ({ height = 30 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#e11d48', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
    #startupindia DPIIT
  </span>
);

export const HoneywellPartnerBadge = ({ height = 30 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#d97706', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
    HONEYWELL GOLD PARTNER
  </span>
);

export const TscRisingStarBadge = ({ height = 30 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#0284c7', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
    TSC RISING STAR 2026
  </span>
);

export const Gs1GlobalBadge = ({ height = 30 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#059669', color: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
    GS1 GLOBAL PARTNER
  </span>
);

export const CLIENT_LOGOS_LIST = REAL_CLIENTS_DATA.slice(0, 32).map(c => ({
  id: c.slug,
  name: c.name,
  component: (props) => <ClientLogo slug={c.slug} clientName={c.name} {...props} />
}));

export const CERTIFICATION_BADGES_LIST = [
  { id: 'iso', name: 'ISO 9001:2015', component: IsoBadge },
  { id: 'startup', name: '#startupindia', component: StartupIndiaBadge },
  { id: 'honeywell', name: 'Honeywell Gold Partner', component: HoneywellPartnerBadge },
  { id: 'tsc', name: 'TSC Rising Star', component: TscRisingStarBadge },
  { id: 'gs1', name: 'GS1 GLOBAL', component: Gs1GlobalBadge }
];

export { REAL_CLIENTS_DATA, FEATURED_MARQUEE_CLIENTS };

