import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, X, CheckCircle2, ShieldCheck, Factory, Warehouse, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerStoriesCarousel = () => {
  const { openDemoModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const stories = [
    {
      id: 'atpl-team-purpose',
      tag: 'OUR PEOPLE & PURPOSE',
      headlineFirst: 'Built with patience.',
      headlineSecond: 'Guided by purpose.',
      subtext: "We've spent years building industrial automation software with focus and intent. Behind every line we automate is our in-house engineering team.",
      ctaText: 'READ OUR STORY',
      image: '/assets/images/atpl_team_expo.jpg',
      imagePosition: 'center 30%',
      caption: 'ATPL Engineering Team • Industrial Expo',
      badgeColor: '#E85874',
      accentColor: '#fb7185',
      client: 'Archery Technocrats Private Limited',
      location: 'TIDEL Park Chennai HQ • R&D TCE-TBI Madurai',
      metrics: [
        { label: 'Domain Heritage', value: '35+ Years', sub: 'Combined domain experience' },
        { label: 'Plants Powered', value: '250+ Plants', sub: 'Across Indian industry' },
        { label: 'Engineering Delivery', value: '100% In-House', sub: 'Zero third-party middlemen' }
      ],
      fullStory: {
        challenge: "Modern plant managers are tired of endless vendor blame games between overseas software providers who don't understand shopfloor hardware, and local hardware resellers who cannot write custom ERP middleware.",
        solution: "Archery Technocrats (ATPL) was founded to unite shopfloor hardware integration with in-house proprietary software. Our engineers develop the software, mount the scanner gates, configure the RFID portals, and connect directly with SAP & Oracle.",
        outcome: "From our R&D center at TCE-TBI Madurai to our headquarters at TIDEL Park Chennai, over 250 manufacturing plants and supply chain distribution hubs trust our team for 24/7 mission-critical uptime."
      }
    },
    {
      id: 'automotive-hosur',
      tag: 'AUTOMOTIVE POWERTRAIN',
      headlineFirst: 'Built for zero defects.',
      headlineSecond: 'Tested on real shopfloors.',
      subtext: 'We deployed rugged handhelds and Perfect Trace across TVS tier-1 vendor lines in Hosur, eliminating batch recall blind spots before engines leave the plant.',
      ctaText: 'READ THE STORY',
      image: '/assets/images/story_automotive.jpg',
      imagePosition: 'center',
      caption: 'Automotive Powertrain Line • Hosur Corridor',
      badgeColor: '#0071ba',
      accentColor: '#38bdf8',
      client: 'Tier-1 Powertrain Supplier',
      location: 'Hosur Industrial Corridor, Tamil Nadu',
      metrics: [
        { label: 'Genealogy Lookup', value: '< 2 Mins', sub: 'Down from 2 hours' },
        { label: 'Recall Exposure', value: 'Zero Gaps', sub: '100% serialized parts' },
        { label: 'ERP Sync', value: 'Live 2-Way', sub: 'SAP S/4HANA verified' }
      ],
      fullStory: {
        challenge: 'The plant manufactured critical automotive steering and powertrain assemblies. Handheld paper logs and manual batch records caused over 2 hours of delay whenever OEM quality auditors requested backward lot trace, risking full-shift shipment quarantine.',
        solution: 'ATPL engineered an end-to-end 4-tier packaging serialization hierarchy (Item → Box → Shipper → Pallet). Rugged Honeywell handhelds running Perfect Trace now verify 2D Datamatrix codes directly against SAP production orders in real time.',
        outcome: 'Auditors can trace any shipped part back to its exact raw material heat number and assembly timestamp in under 2 minutes. Zero unverified assemblies have reached the OEM since deployment.'
      }
    },
    {
      id: 'logistics-proconnect',
      tag: 'SUPPLY CHAIN & LOGISTICS',
      headlineFirst: 'Zero forklift stoppage.',
      headlineSecond: 'Verified in motion.',
      subtext: 'Automated multi-antenna RFID dock portals scan full pallet loads on moving forklifts at ProConnect 3PL, cutting dock check-in bottlenecks from 12 minutes to 4 seconds.',
      ctaText: 'READ THE STORY',
      image: '/assets/images/story_logistics.jpg',
      badgeColor: '#0071ba',
      accentColor: '#00f0ff',
      client: 'ProConnect Mega Distribution Center',
      location: 'Sriperumbudur Hub, Tamil Nadu (120,000 sq.ft)',
      metrics: [
        { label: 'Dock Gate Time', value: '4 Seconds', sub: 'Down from 12 mins' },
        { label: 'Forklift Stoppage', value: '0 Stops', sub: 'Continuous motion' },
        { label: 'Pallet Tag Reads', value: '1,200+/sec', sub: 'Multi-antenna portals' }
      ],
      fullStory: {
        challenge: 'A high-velocity 3PL distribution hub handling over 4,000 cartons daily suffered chronic dock-door traffic jams. Forklift drivers had to brake, dismount, and scan individual pallet barcodes by hand, causing driver queues and delayed dispatches.',
        solution: 'ATPL designed and mounted rugged overhead UHF RFID dock portals with motion-direction sensors across 8 active inbound and outbound bays, linked straight into their warehouse management software.',
        outcome: 'Forklifts drive through dock gates at normal operating speed. Entire pallet loads are identified, verified against ASN manifests, and recorded into inventory in 4 seconds with zero forklift stops.'
      }
    },
    {
      id: 'ev-battery-assembly',
      tag: 'EV & ADVANCED ELECTRONICS',
      headlineFirst: 'Powering EV traceability.',
      headlineSecond: 'Engineered for scale.',
      subtext: 'High-speed battery pack serialization and AI optical defect detection on continuous lines, meeting strict 21 CFR & automotive safety compliance.',
      ctaText: 'READ THE STORY',
      image: '/assets/images/atpl_ai_vision_inspection.webp',
      badgeColor: '#E85874',
      accentColor: '#fda4af',
      client: 'High-Volume EV Battery Hub',
      location: 'Krishnagiri / Hosur Corridor',
      metrics: [
        { label: 'Line Traceability', value: '100% Cell-Level', sub: 'Complete digital birth cert' },
        { label: 'Defect Catch Rate', value: '99.98%', sub: 'Automated optical gates' },
        { label: 'Inspection Cycle', value: '< 8ms', sub: 'Real-time Pass/Fail' }
      ],
      fullStory: {
        challenge: 'High-speed electric vehicle battery module assembly required unbroken cell-to-pack serialization and 100% flaw detection to prevent catastrophic safety hazards and comply with national transport regulations.',
        solution: 'ATPL deployed high-speed industrial optical cameras running real-time convolutional neural networks paired with cryptographically verified 2D barcode direct-part-marking (DPM) serialization.',
        outcome: 'Every finished battery pack carries a tamper-proof digital genealogy record. Welds, terminal alignments, and seals are inspected inline with automatic pneumatic diverters rejecting defective units.'
      }
    }
  ];

  const current = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Auto advance every 7 seconds when not hovered
  useEffect(() => {
    if (isHovered || selectedStory) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered, selectedStory, stories.length]);

  return (
    <section 
      style={{ 
        padding: '5rem 1.5rem', 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #e2e8f0' 
      }}
    >
      <div className="container" style={{ maxWidth: '1160px', margin: '0 auto' }}>
        
        {/* =========================================================================
            TOP LINK: "CUSTOMER STORIES >" (Zoho Style)
           ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <button
            onClick={() => {
              const el = document.getElementById('stories-container');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#0071ba',
              fontSize: '0.86rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '999px',
              backgroundColor: '#eff6ff',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
          >
            <span>CUSTOMER STORIES</span>
            <ChevronRight size={15} strokeWidth={2.8} />
          </button>
        </div>

        {/* =========================================================================
            MAIN CAROUSEL BANNER CARD WITH FLANKING ARROWS
           ========================================================================= */}
        <div 
          id="stories-container"
          style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* PREVIOUS BUTTON (Left Arrow) */}
          <button
            onClick={handlePrev}
            aria-label="Previous Story"
            style={{
              position: 'absolute',
              left: '-20px',
              zIndex: 10,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.color = '#0071ba';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#0f172a';
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
          </button>

          {/* CINEMATIC STORY CARD */}
          <div
            style={{
              width: '100%',
              maxWidth: '1080px',
              minHeight: '380px',
              backgroundColor: '#0b0f17',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.25)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              position: 'relative'
            }}
          >
            {/* LEFT HALF: Editorial Typography */}
            <div
              style={{
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: 2,
                background: 'linear-gradient(90deg, #0b0f17 0%, #0b0f17 80%, rgba(11, 15, 23, 0.9) 100%)'
              }}
            >
              {/* Category Tag */}
              <div style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: current.accentColor,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: current.accentColor }} />
                <span>{current.tag}</span>
              </div>

              {/* Bold Serif / Display Headline */}
              <h3 style={{
                fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
                fontFamily: '"Georgia", "Cambria", "Times New Roman", serif',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.18,
                letterSpacing: '-0.015em',
                margin: '0 0 1.25rem 0'
              }}>
                {current.headlineFirst}<br />
                {current.headlineSecond}
              </h3>

              {/* Subtext description */}
              <p style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                color: 'rgba(255, 255, 255, 0.78)',
                lineHeight: 1.65,
                margin: '0 0 2rem 0',
                maxWidth: '460px'
              }}>
                {current.subtext}
              </p>

              {/* CTA Link: READ THE STORY ↗ */}
              <div>
                <button
                  onClick={() => setSelectedStory(current)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: current.accentColor,
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: 0,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.85';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>{current.ctaText}</span>
                  <ArrowUpRight size={17} strokeWidth={2.6} />
                </button>
              </div>

            </div>

            {/* RIGHT HALF: High-Resolution Cinematic Photograph */}
            <div
              style={{
                position: 'relative',
                minHeight: '280px',
                overflow: 'hidden'
              }}
            >
              <img
                src={current.image}
                alt={current.headlineFirst}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: current.imagePosition || 'center',
                  display: 'block'
                }}
              />

              {/* Soft gradient blend over image */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #0b0f17 0%, rgba(11, 15, 23, 0.15) 35%, rgba(11, 15, 23, 0.3) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Authentic Photo Caption Tag */}
              {current.caption && (
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(11, 15, 23, 0.78)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#f8fafc',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  letterSpacing: '0.03em',
                  zIndex: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}>
                  {current.caption}
                </div>
              )}
            </div>

          </div>

          {/* NEXT BUTTON (Right Arrow) */}
          <button
            onClick={handleNext}
            aria-label="Next Story"
            style={{
              position: 'absolute',
              right: '-20px',
              zIndex: 10,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.borderColor = '#0071ba';
              e.currentTarget.style.color = '#0071ba';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#0f172a';
            }}
          >
            <ChevronRight size={22} strokeWidth={2.4} />
          </button>

        </div>

        {/* =========================================================================
            DOT INDICATORS
           ========================================================================= */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginTop: '1.75rem' }}>
          {stories.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to story ${idx + 1}`}
              style={{
                width: idx === currentIndex ? '28px' : '9px',
                height: '9px',
                borderRadius: '999px',
                backgroundColor: idx === currentIndex ? '#0071ba' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                padding: 0
              }}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
          DETAILED STORY MODAL (Opens when clicking "READ THE STORY ↗")
         ========================================================================= */}
      {selectedStory && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedStory(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: '1px solid #e2e8f0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 1.75rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#0071ba',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}>
                  {selectedStory.tag} • {selectedStory.location}
                </span>
                <h3 style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: 1.25,
                  margin: 0
                }}>
                  {selectedStory.client}
                </h3>
              </div>

              <button
                onClick={() => setSelectedStory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '6px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.75rem' }}>
              
              {/* Key Metrics Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem'
              }}>
                {selectedStory.metrics.map((m, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0071ba', lineHeight: 1.15 }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* The Challenge */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  The Plant Bottleneck
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {selectedStory.fullStory.challenge}
                </p>
              </div>

              {/* What We Deployed */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0071ba' }} />
                  What ATPL Implemented
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {selectedStory.fullStory.solution}
                </p>
              </div>

              {/* Verified Result */}
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} color="#166534" />
                  Verified Plant Result
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#14532d', lineHeight: 1.55, margin: 0 }}>
                  {selectedStory.fullStory.outcome}
                </p>
              </div>

              {/* Modal CTA Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => setSelectedStory(null)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '6px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const storyName = selectedStory.client;
                    setSelectedStory(null);
                    openDemoModal({ solution: storyName, notes: `Inquiry regarding case study: ${storyName}` });
                  }}
                  style={{
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '6px',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Discuss a Similar Project
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
