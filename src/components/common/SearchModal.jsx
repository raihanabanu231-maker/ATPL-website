import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Boxes, 
  Cpu, 
  Radio, 
  Printer, 
  Eye, 
  FileCheck, 
  Headphones, 
  ArrowRight,
  Sparkles,
  Layers,
  Building2,
  Smartphone
} from 'lucide-react';

export const SearchModal = ({ isOpen, onClose }) => {
  const { setCurrentView, openDemoModal } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = [
    {
      category: 'Software Products',
      items: [
        { id: 'wms', title: 'PERFECT WAREHOUSE™ (WMS)', desc: 'Autonomous dock-to-stock & 3D bin slotting optimization', icon: Boxes, view: 'software', badge: 'Software' },
        { id: 'trace', title: 'PERFECT TRACE™ Serialization', desc: 'GS1 Item -> Bundle -> Case -> Pallet aggregation & DGFT compliance', icon: FileCheck, view: 'software', badge: 'Software' },
        { id: 'vision', title: 'ATPL Vision AI™', desc: 'Sub-8ms Edge optical micro-defect detection & OCR grading', icon: Eye, view: 'software', badge: 'AI Vision' },
        { id: 'pms', title: 'PERFECT PMS™ (Production OEE)', desc: 'Shopfloor SCADA, machine telemetry & downtime analytics', icon: Cpu, view: 'software', badge: 'Software' },
        { id: 'mdm', title: 'ATPL PERFECT MDM™', desc: 'Enterprise rugged mobile device & fleet management console', icon: Smartphone, view: 'software', badge: 'MDM Software' }
      ]
    },
    {
      category: 'Industrial Hardware & AIDC',
      items: [
        { id: 'labeler', title: 'PERFECT LABELER™ (Print & Apply)', desc: 'High-speed 120 packs/min automated carton & pallet labeling', icon: Printer, view: 'hardware', badge: 'Hardware' },
        { id: 'rfid-gates', title: 'Fixed UHF RFID Dock Portals', desc: 'Automated high-speed pallet & carton scanning portals', icon: Radio, view: 'hardware', badge: 'Hardware' },
        { id: 'scanners', title: 'Rugged 2D & DPM Handheld Scanners', desc: 'Direct Part Marking & harsh manufacturing barcode readers', icon: Cpu, view: 'hardware', badge: 'Hardware' },
        { id: 'printers', title: 'Thermal Barcode & TIJ RFID Printers', desc: 'High-speed automated packaging serialization printers', icon: Printer, view: 'hardware', badge: 'Hardware' },
        { id: 'eda', title: 'Android Mobile Computers (PDA / EDA)', desc: 'Drop-tested warehouse terminals with hot-swappable batteries', icon: Layers, view: 'hardware', badge: 'Hardware' }
      ]
    },
    {
      category: 'Services & Support',
      items: [
        { id: 'amc', title: '24/7 AMC Maintenance Contracts', desc: 'Guaranteed 4-hour on-site SLA & resident engineer support', icon: Headphones, view: 'services', badge: 'Services' },
        { id: 'twin', title: '3D Virtual Plant Digital Twin', desc: 'Live interactive factory tour and real-time station telemetry', icon: Sparkles, view: 'factory-3d', badge: '3D Simulation' },
        { id: 'contact', title: 'Consultation & Plant Audit', desc: 'Connect with senior automation consultants for an on-site audit', icon: Building2, view: 'contact', badge: 'Consulting' }
      ]
    }
  ];

  const filteredCategories = allItems.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.badge.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const handleSelect = (item) => {
    setCurrentView(item.view);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 2rem 1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '1.15rem 1.4rem',
          borderBottom: '1px solid #f1f5f9',
          background: '#ffffff'
        }}>
          <Search size={20} color="#64748b" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search software, hardware, RFID, solutions or documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: '#0f172a',
              fontFamily: 'var(--font-display)',
              background: 'transparent'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={16} />
            </button>
          )}
          <kbd style={{
            fontSize: '0.72rem',
            padding: '0.2rem 0.45rem',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            color: '#64748b',
            fontFamily: 'var(--font-mono)'
          }}>ESC</kbd>
        </div>

        {/* Search Results */}
        <div style={{ overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>No results found for "{query}"</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching for WMS, RFID, Vision AI, Scanners, or AMC support.</p>
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#94a3b8',
                  marginBottom: '0.6rem',
                  paddingLeft: '0.5rem'
                }}>
                  {cat.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.85rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          background: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#E85874',
                            flexShrink: 0
                          }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0f172a' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: '#e0f2fe',
                            color: '#0369a1'
                          }}>
                            {item.badge}
                          </span>
                          <ArrowRight size={14} color="#94a3b8" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '0.75rem 1.4rem',
          borderTop: '1px solid #f1f5f9',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          <span>Navigate with mouse or arrow keys</span>
          <button
            onClick={() => {
              onClose();
              openDemoModal();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#E85874',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.78rem'
            }}
          >
            Need Help? Request Consultation ➔
          </button>
        </div>
      </div>
    </div>
  );
};
