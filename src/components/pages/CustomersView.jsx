import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { SalesforceCustomerStories } from '../customers/SalesforceCustomerStories';
import { SalesforceCustomerTopBanner } from '../customers/SalesforceCustomerTopBanner';

export const CustomersView = () => {
  const { openDemoModal } = useApp();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  return (
    <div style={{ backgroundColor: '#060b14', color: '#ffffff', minHeight: '100vh', overflowX: 'clip' }}>
      
      {/* =========================================================================
          1. FULL-SCREEN HANDSHAKE VIDEO HERO & 100% CLIENT MARQUEE (Salesforce-Style)
             (Cinematic full-screen video with live telemetry, heading, and 18-logo ticker)
         ========================================================================= */}
      <SalesforceCustomerTopBanner />

      {/* =========================================================================
          2. SALESFORCE-GRADE CUSTOMER STORIES (Agentic Stacked Deck)
         ========================================================================= */}
      <SalesforceCustomerStories
        onSelectCaseStudy={(story) => {
          setSelectedCaseStudy({
            id: story.id,
            client: story.client,
            category: story.industry,
            headline: story.headline,
            sub: story.subheadline,
            image: story.image,
            logoUrl: story.logoUrl,
            metric: story.metric,
            metricLabel: story.metricLabel,
            software: story.product,
            summary: story.summary,
            challenge: story.challenge,
            solution: story.solution,
            results: story.results
          });
        }}
        onRequestAssessment={() => openDemoModal({ solution: 'Enterprise Plant Assessment', notes: 'Request verified engineering case study walkthrough' })}
      />


      {/* =========================================================================
          5. MODAL: FULL CASE STUDY DEEP DIVE POPUP
         ========================================================================= */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              zIndex: 99999
            }}
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '650px',
                width: '100%',
                backgroundColor: '#0c1428',
                border: '2px solid #00f0ff',
                borderRadius: '20px',
                padding: '2.2rem',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.3)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {selectedCaseStudy.logoUrl && (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '6px 12px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                      <img src={selectedCaseStudy.logoUrl} alt={selectedCaseStudy.client} style={{ maxHeight: '30px', maxWidth: '100px', objectFit: 'contain' }} />
                    </div>
                  )}
                  <div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {selectedCaseStudy.category}
                    </span>
                    <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, margin: '0.25rem 0' }}>
                      {selectedCaseStudy.client}
                    </h2>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{selectedCaseStudy.sub}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ backgroundColor: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.74rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase' }}>Audited Outcome</div>
                <div style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>{selectedCaseStudy.headline}</div>
              </div>

              {selectedCaseStudy.software && (
                <div style={{ marginBottom: '1.25rem', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '10px', padding: '0.65rem 0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'monospace' }}>Core Software Architecture:</span>
                  <span style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 700 }}>{selectedCaseStudy.software}</span>
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.35rem' }}>The Challenge:</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{selectedCaseStudy.challenge}</p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.35rem' }}>ATPL Engineered Solution:</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{selectedCaseStudy.solution}</p>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.5rem' }}>Verified Results:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.6 }}>
                  {selectedCaseStudy.results.map((r, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{r}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    openDemoModal({ solution: `Case Study Deep Dive: ${selectedCaseStudy.client}`, notes: `Request technical architecture for ${selectedCaseStudy.client}` });
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#0071ba',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Request Architecture Blueprint
                </button>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CustomersView;
