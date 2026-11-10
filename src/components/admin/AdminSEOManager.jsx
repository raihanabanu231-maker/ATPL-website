import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Search,
  Share2,
  CheckCircle2,
  AlertCircle,
  Save,
  RefreshCw,
  Plus,
  X,
  ExternalLink,
  Eye,
  Sparkles,
  Copy,
  Download,
  Upload,
  ShieldCheck,
  FileText,
  Smartphone,
  Monitor,
  Settings2,
  Tag,
  Link2,
  Check
} from 'lucide-react';

export const AdminSEOManager = () => {
  const { 
    seoData, 
    updatePageSEO, 
    updateGlobalSEO, 
    resetPageSEO, 
    resetAllSEO, 
    addToast,
    setCurrentView 
  } = useApp();

  // Active page tab (defaults to 'home')
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [pageSearchQuery, setPageSearchQuery] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('serp'); // 'serp' | 'social' | 'technical' | 'global'
  const [serpDevice, setSerpDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Input states for adding new keywords
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [bulkKeywordsInput, setBulkKeywordsInput] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const pagesMap = seoData?.pages || {};
  const globalConfig = seoData?.global || {};
  const activePage = pagesMap[selectedPageId] || pagesMap.home || {};

  // Recommended keywords to quick-add
  const SUGGESTED_KEYWORDS = [
    'Industry 4.0',
    'RFID Tracking',
    'Smart Factory',
    'Warehouse WMS',
    'GS1 Barcode Serialization',
    'Machine Vision AI',
    'Industrial IoT',
    'Automotive Automation',
    'Pharma 21 CFR Part 11',
    'Zebra Honeywell Hardware',
    'Digital Twin',
    'Turnkey Engineering'
  ];

  // Filtered pages for the selector
  const filteredPageIds = useMemo(() => {
    const list = Object.keys(pagesMap);
    if (!pageSearchQuery.trim()) return list;
    const q = pageSearchQuery.toLowerCase();
    return list.filter(id => {
      const p = pagesMap[id];
      return (
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        (Array.isArray(p.keywords) && p.keywords.some(k => k.toLowerCase().includes(q)))
      );
    });
  }, [pagesMap, pageSearchQuery]);

  // Handle direct field updates
  const handleFieldChange = (field, value) => {
    updatePageSEO(selectedPageId, { [field]: value });
  };

  // Keyword management
  const handleAddKeyword = () => {
    const trimmed = newKeywordInput.trim();
    if (!trimmed) return;
    const existing = activePage.keywords || [];
    if (existing.map(k => k.toLowerCase()).includes(trimmed.toLowerCase())) {
      addToast('Duplicate Keyword', `"${trimmed}" is already added to this page.`, 'warning');
      return;
    }
    const updated = [...existing, trimmed];
    updatePageSEO(selectedPageId, { keywords: updated });
    setNewKeywordInput('');
    addToast('Keyword Added', `Added "${trimmed}" to ${activePage.name}.`, 'info');
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    const existing = activePage.keywords || [];
    const updated = existing.filter(k => k !== keywordToRemove);
    updatePageSEO(selectedPageId, { keywords: updated });
  };

  const handleBulkAddKeywords = () => {
    if (!bulkKeywordsInput.trim()) return;
    const items = bulkKeywordsInput
      .split(/[,;\n]+/)
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const existing = activePage.keywords || [];
    const newItems = items.filter(
      item => !existing.map(k => k.toLowerCase()).includes(item.toLowerCase())
    );

    if (newItems.length === 0) {
      addToast('No New Keywords', 'All entered keywords already exist for this page.', 'warning');
      return;
    }

    const updated = [...existing, ...newItems];
    updatePageSEO(selectedPageId, { keywords: updated });
    setBulkKeywordsInput('');
    setShowBulkAdd(false);
    addToast('Keywords Added', `Appended ${newItems.length} keywords to ${activePage.name}.`, 'success');
  };

  const handleQuickAddSuggested = (kw) => {
    const existing = activePage.keywords || [];
    if (existing.includes(kw)) return;
    updatePageSEO(selectedPageId, { keywords: [...existing, kw] });
  };

  // Reset page
  const handleResetCurrentPage = () => {
    if (window.confirm(`Reset SEO metadata for "${activePage.name}" back to factory defaults?`)) {
      resetPageSEO(selectedPageId);
      addToast('Reset Complete', `Restored default metadata for ${activePage.name}.`, 'info');
    }
  };

  // Save confirmation
  const handleSaveAll = () => {
    // In our architecture, updates are already auto-persisted to AppContext and LocalStorage!
    // Triggering a feedback toast reassures the admin.
    addToast('SEO Changes Applied', `SEO settings for ${activePage.name} and all pages are live across the site!`, 'success');
  };

  // JSON Export / Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(seoData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `atpl-seo-metadata-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('SEO Exported', 'Downloaded full SEO metadata configuration JSON.', 'info');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.pages) {
          if (parsed.global) updateGlobalSEO(parsed.global);
          Object.keys(parsed.pages).forEach(key => {
            updatePageSEO(key, parsed.pages[key]);
          });
          addToast('Import Successful', 'SEO metadata imported and applied successfully.', 'success');
        } else {
          addToast('Invalid Format', 'JSON file does not contain valid ATPL SEO metadata.', 'danger');
        }
      } catch (err) {
        addToast('Parse Error', 'Failed to read JSON file. Check format.', 'danger');
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  // SEO Health Score calculation for the active page
  const seoHealth = useMemo(() => {
    let score = 0;
    const checks = [];

    // Title Check
    const titleLen = (activePage.title || '').length;
    if (titleLen >= 30 && titleLen <= 60) {
      score += 25;
      checks.push({ label: 'Title length is optimal', pass: true, detail: 'Optimal' });
    } else if (titleLen > 0) {
      score += 15;
      checks.push({ label: 'Title length needs adjustment', pass: false, detail: 'Review length' });
    } else {
      checks.push({ label: 'Title is missing', pass: false, detail: 'Required' });
    }

    // Description Check
    const descLen = (activePage.description || '').length;
    if (descLen >= 110 && descLen <= 165) {
      score += 25;
      checks.push({ label: 'Meta description is optimal', pass: true, detail: 'Optimal' });
    } else if (descLen > 0) {
      score += 15;
      checks.push({ label: 'Meta description length could improve', pass: false, detail: 'Review length' });
    } else {
      checks.push({ label: 'Meta description is missing', pass: false, detail: 'Required' });
    }

    // Keywords Check
    const kwCount = (activePage.keywords || []).length;
    if (kwCount >= 5) {
      score += 25;
      checks.push({ label: 'Target keyword cluster is robust', pass: true, detail: 'Active' });
    } else if (kwCount >= 1) {
      score += 15;
      checks.push({ label: 'Consider adding more keywords', pass: false, detail: 'Add more' });
    } else {
      checks.push({ label: 'No keywords defined', pass: false, detail: 'Missing' });
    }

    // Canonical & OG Check
    const hasCanonical = !!activePage.canonical;
    const hasOG = !!activePage.ogTitle && !!activePage.ogDescription;
    if (hasCanonical && hasOG) {
      score += 25;
      checks.push({ label: 'Canonical URL and Open Graph cards ready', pass: true, detail: 'Configured' });
    } else if (hasCanonical || hasOG) {
      score += 15;
      checks.push({ label: 'Incomplete social or canonical tags', pass: false, detail: 'Incomplete' });
    } else {
      checks.push({ label: 'Missing canonical and social tags', pass: false, detail: 'Not set' });
    }

    return { score, checks };
  }, [activePage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#f8fafc' }}>
      
      {/* Top Banner / Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 26, 49, 0.95) 0%, rgba(8, 14, 28, 0.95) 100%)',
        border: '1px solid var(--border-glass)',
        borderRadius: '16px',
        padding: '1.5rem 1.75rem',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '350px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #0072ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.35)'
              }}>
                <Globe size={18} color="#040914" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                SEO & Metadata Master Suite
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', fontWeight: 700 }}>
                Google Ready
              </span>
            </div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.86rem', maxWidth: '680px', lineHeight: 1.5 }}>
              Edit and live-preview meta titles, descriptions, keyword tags, canonical URLs, and Open Graph social cards for all pages on the ATPL website. Updates apply instantly across the live application.
            </p>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleExportJSON}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}
              title="Download SEO metadata JSON backup"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>

            <label
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', cursor: 'pointer', margin: 0 }}
              title="Import SEO metadata JSON"
            >
              <Upload size={14} />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={handleResetCurrentPage}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}
              title="Reset current page to default"
            >
              <RefreshCw size={14} />
              <span>Reset Page</span>
            </button>

            <button
              onClick={handleSaveAll}
              className="btn btn-cyan btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.78rem' }}
              title="Save all changes to live site"
            >
              <Save size={14} />
              <span>Save & Publish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Selector Strip */}
      <div style={{
        background: 'rgba(11, 20, 38, 0.7)',
        border: '1px solid var(--border-glass)',
        borderRadius: '14px',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', fontWeight: 700 }}>
              Select Page to Configure:
            </span>
          </div>

          {/* Search Filter for Pages */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Filter pages or keywords..."
              value={pageSearchQuery}
              onChange={(e) => setPageSearchQuery(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: '2.2rem',
                paddingTop: '0.35rem',
                paddingBottom: '0.35rem',
                fontSize: '0.8rem',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>

        {/* Scrollable Page Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.35rem',
          scrollbarWidth: 'thin'
        }}>
          {filteredPageIds.map(pageId => {
            const page = pagesMap[pageId];
            const isSelected = selectedPageId === pageId;
            const isNoIndex = page.robots?.includes('noindex');

            return (
              <button
                key={pageId}
                onClick={() => setSelectedPageId(pageId)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 114, 255, 0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--cyan-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.55rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 0 12px rgba(0, 240, 255, 0.25)' : 'none'
                }}
              >
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#ffffff' : '#94a3b8'
                }}>
                  {page.name}
                </span>

                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  background: isNoIndex ? 'rgba(245, 158, 11, 0.15)' : 'rgba(52, 211, 153, 0.15)',
                  color: isNoIndex ? '#fbbf24' : '#34d399',
                  border: isNoIndex ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(52, 211, 153, 0.3)'
                }}>
                  {page.route}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout: Left (Editor) & Right (Live Preview & Health Score) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }} className="seo-two-col-layout">
        
        <style>{`
          @media (min-width: 1100px) {
            .seo-two-col-layout {
              grid-template-columns: 1.15fr 0.85fr !important;
            }
          }
        `}</style>

        {/* LEFT COLUMN: PAGE METADATA EDITOR */}
        <div style={{
          background: 'rgba(11, 20, 38, 0.8)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Editor Header & Sub-Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                  Editing: {activePage.name}
                </h2>
                <button
                  onClick={() => setCurrentView(activePage.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--cyan-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  title="View this page on public site"
                >
                  <Eye size={12} />
                  <span>Preview Page</span>
                </button>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                Target Route: {activePage.route}, ID: {activePage.id}
              </span>
            </div>

            {/* Sub-tab Navigation */}
            <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.25rem', borderRadius: '8px' }}>
              <button
                onClick={() => setActiveEditorTab('serp')}
                style={{
                  background: activeEditorTab === 'serp' ? 'var(--cyan-primary)' : 'transparent',
                  color: activeEditorTab === 'serp' ? '#040914' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Search size={13} />
                <span>Search / SERP</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('social')}
                style={{
                  background: activeEditorTab === 'social' ? 'var(--cyan-primary)' : 'transparent',
                  color: activeEditorTab === 'social' ? '#040914' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Share2 size={13} />
                <span>Social / OG</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('technical')}
                style={{
                  background: activeEditorTab === 'technical' ? 'var(--cyan-primary)' : 'transparent',
                  color: activeEditorTab === 'technical' ? '#040914' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Settings2 size={13} />
                <span>Technical</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('global')}
                style={{
                  background: activeEditorTab === 'global' ? 'var(--cyan-primary)' : 'transparent',
                  color: activeEditorTab === 'global' ? '#040914' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Globe size={13} />
                <span>Global Site</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SEARCH / SERP & KEYWORDS */}
          {activeEditorTab === 'serp' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Page Title */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>
                    SEO Meta Title (Title Tag)
                  </label>
                  <span style={{
                    fontSize: '0.72rem',
                    color: (activePage.title?.length || 0) > 60 ? '#f59e0b' : '#34d399'
                  }}>
                    {(activePage.title?.length || 0) > 60 ? 'Too long' : 'Optimal'}
                  </span>
                </div>
                <input
                  type="text"
                  value={activePage.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="e.g. Archery Technocrats | Factory Automation & RFID Systems"
                  className="form-control"
                  style={{ fontSize: '0.9rem', width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Displayed in browser tabs and as the main clickable headline in Google search results.
                </span>
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>
                    Meta Description
                  </label>
                  <span style={{
                    fontSize: '0.72rem',
                    color: (activePage.description?.length || 0) > 165 ? '#f59e0b' : '#34d399'
                  }}>
                    {(activePage.description?.length || 0) > 165 ? 'Too long' : 'Optimal'}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={activePage.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="e.g. Archery Technocrats delivers cutting-edge warehouse WMS, RFID tracking, and Industry 4.0 automation..."
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%', resize: 'vertical' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Summarizes page contents for Google snippets and social graph readers.
                </span>
              </div>

              {/* Keywords Tag Manager */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Tag size={15} color="var(--cyan-primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                      Target Keyword Tags & Phrases
                    </span>
                  </div>

                  <button
                    onClick={() => setShowBulkAdd(!showBulkAdd)}
                    style={{
                      background: 'transparent',
                      border: '1px dashed rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.6rem',
                      color: 'var(--cyan-primary)',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    {showBulkAdd ? 'Cancel Bulk Paste' : '+ Bulk Import Keywords'}
                  </button>
                </div>

                {/* Bulk Paste Box (Conditional) */}
                {showBulkAdd && (
                  <div style={{ marginBottom: '1rem', background: 'rgba(0, 240, 255, 0.04)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
                      Paste comma, semicolon, or newline-separated keywords:
                    </label>
                    <textarea
                      rows={2}
                      value={bulkKeywordsInput}
                      onChange={(e) => setBulkKeywordsInput(e.target.value)}
                      placeholder="e.g. RFID Readers, Zebra Barcode Scanner, Warehouse MES, GS1 Serialization"
                      className="form-control"
                      style={{ fontSize: '0.8rem', width: '100%', marginBottom: '0.5rem' }}
                    />
                    <button
                      onClick={handleBulkAddKeywords}
                      className="btn btn-cyan btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      Append All Keywords
                    </button>
                  </div>
                )}

                {/* Single Add Keyword Input */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <input
                    type="text"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="Type keyword or phrase and press Enter..."
                    className="form-control"
                    style={{ fontSize: '0.82rem', flex: 1 }}
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>

                {/* Active Keyword Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', minHeight: '40px' }}>
                  <AnimatePresence>
                    {(activePage.keywords || []).map((kw) => (
                      <motion.div
                        key={kw}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        style={{
                          background: 'rgba(0, 240, 255, 0.08)',
                          border: '1px solid rgba(0, 240, 255, 0.25)',
                          borderRadius: '20px',
                          padding: '0.25rem 0.65rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.78rem',
                          color: '#e0f2fe'
                        }}
                      >
                        <span>{kw}</span>
                        <button
                          onClick={() => handleRemoveKeyword(kw)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 0
                          }}
                          title={`Remove "${kw}"`}
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {(!activePage.keywords || activePage.keywords.length === 0) && (
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', padding: '0.25rem 0' }}>
                      No keywords configured for this page yet.
                    </span>
                  )}
                </div>

                {/* Suggested Keyword Chips */}
                <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Sparkles size={12} color="var(--cyan-primary)" />
                    <span>Quick-Add Industry Recommendations:</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {SUGGESTED_KEYWORDS.filter(kw => !(activePage.keywords || []).includes(kw)).slice(0, 8).map((kw, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAddSuggested(kw)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px dashed rgba(255, 255, 255, 0.15)',
                          borderRadius: '16px',
                          padding: '0.15rem 0.55rem',
                          fontSize: '0.7rem',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <Plus size={10} />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SOCIAL & OPEN GRAPH */}
          {activeEditorTab === 'social' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Open Graph Title (Social Media Headline)
                </label>
                <input
                  type="text"
                  value={activePage.ogTitle || ''}
                  onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
                  placeholder={activePage.title || 'Enter social share title...'}
                  className="form-control"
                  style={{ fontSize: '0.9rem', width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Used by LinkedIn, Twitter/X, WhatsApp, Slack, and Facebook when sharing this link.
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Open Graph Description
                </label>
                <textarea
                  rows={3}
                  value={activePage.ogDescription || ''}
                  onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
                  placeholder={activePage.description || 'Enter social excerpt...'}
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Open Graph Banner Image URL
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={activePage.ogImage || ''}
                    onChange={(e) => handleFieldChange('ogImage', e.target.value)}
                    placeholder="https://atplgroup.com/og-image.png"
                    className="form-control"
                    style={{ fontSize: '0.85rem', flex: 1 }}
                  />
                  <button
                    onClick={() => handleFieldChange('ogImage', 'https://atplgroup.com/og-image.png')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                  >
                    Use Default Image
                  </button>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Recommended dimensions: 1200 x 630 pixels (Aspect ratio 1.91:1).
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL & INDEXING */}
          {activeEditorTab === 'technical' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Canonical URL
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={activePage.canonical || ''}
                    onChange={(e) => handleFieldChange('canonical', e.target.value)}
                    placeholder={`https://atplgroup.com${activePage.route}`}
                    className="form-control"
                    style={{ fontSize: '0.85rem', flex: 1 }}
                  />
                  <button
                    onClick={() => handleFieldChange('canonical', `${globalConfig.baseUrl || 'https://atplgroup.com'}${activePage.route === '/' ? '' : activePage.route}`)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                  >
                    Auto Generate
                  </button>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Informs search engines of the primary URL to prevent duplicate content penalties.
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Robots Indexing Directive
                </label>
                <select
                  value={activePage.robots || 'index, follow'}
                  onChange={(e) => handleFieldChange('robots', e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%', cursor: 'pointer' }}
                >
                  <option value="index, follow">index, follow (Allow in Google & Crawl Links - Standard)</option>
                  <option value="noindex, follow">noindex, follow (Hide from Search, Crawl Links - Legal / Terms)</option>
                  <option value="index, nofollow">index, nofollow (Show in Search, Do not pass link equity)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Completely block search engines)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Schema.org Structured Data Type
                </label>
                <select
                  value={activePage.structuredDataType || 'WebPage'}
                  onChange={(e) => handleFieldChange('structuredDataType', e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%', cursor: 'pointer' }}
                >
                  <option value="Organization">Organization (Brand, corporate entity)</option>
                  <option value="SoftwareApplication">SoftwareApplication (WMS, Traceability, Vision AI)</option>
                  <option value="Product">Product (Hardware devices, printers, scanners)</option>
                  <option value="Service">Service (System integration, AMC, consultancy)</option>
                  <option value="CollectionPage">CollectionPage (Resources, downloads)</option>
                  <option value="AboutPage">AboutPage (Company story, leadership)</option>
                  <option value="ContactPage">ContactPage (Inquiries, locations)</option>
                  <option value="WebApplication">WebApplication (3D Factory Tour, interactive twin)</option>
                  <option value="WebPage">WebPage (General page)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 4: GLOBAL SITE SEO SETTINGS */}
          {activeEditorTab === 'global' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Site Brand / Corporate Name
                </label>
                <input
                  type="text"
                  value={globalConfig.siteName || ''}
                  onChange={(e) => updateGlobalSEO({ siteName: e.target.value })}
                  placeholder="Archery Technocrats Private Limited (ATPL Group)"
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Title Suffix
                </label>
                <input
                  type="text"
                  value={globalConfig.titleSuffix || ''}
                  onChange={(e) => updateGlobalSEO({ titleSuffix: e.target.value })}
                  placeholder=" | Archery Technocrats"
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Primary Domain (Base URL)
                </label>
                <input
                  type="text"
                  value={globalConfig.baseUrl || ''}
                  onChange={(e) => updateGlobalSEO({ baseUrl: e.target.value })}
                  placeholder="https://atplgroup.com"
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '0.4rem' }}>
                  Google Search Console Verification Token
                </label>
                <input
                  type="text"
                  value={globalConfig.googleVerificationCode || ''}
                  onChange={(e) => updateGlobalSEO({ googleVerificationCode: e.target.value })}
                  placeholder="google-site-verification=xxxxxxxxxxxxxxx"
                  className="form-control"
                  style={{ fontSize: '0.85rem', width: '100%' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
                  Injects &lt;meta name="google-site-verification" content="..."&gt; into &lt;head&gt;.
                </span>
              </div>

              <div style={{ paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  onClick={() => {
                    if (window.confirm('Restore all 13 pages to default factory SEO metadata?')) {
                      resetAllSEO();
                      addToast('Reset Complete', 'Restored all pages to initial SEO configurations.', 'info');
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', fontSize: '0.75rem' }}
                >
                  <RefreshCw size={13} style={{ marginRight: '0.35rem' }} />
                  Reset All 13 Pages to Initial Defaults
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: REAL-TIME SERP & SOCIAL PREVIEWS + AUDIT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* 1. Live Google Search Preview (SERP) */}
          <div style={{
            background: 'rgba(11, 20, 38, 0.8)',
            border: '1px solid var(--border-glass)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Search size={16} color="var(--cyan-primary)" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                  Live Google SERP Preview
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.2rem', borderRadius: '6px' }}>
                <button
                  onClick={() => setSerpDevice('desktop')}
                  style={{
                    background: serpDevice === 'desktop' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    color: serpDevice === 'desktop' ? '#ffffff' : '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.7rem'
                  }}
                >
                  <Monitor size={12} />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setSerpDevice('mobile')}
                  style={{
                    background: serpDevice === 'mobile' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    color: serpDevice === 'mobile' ? '#ffffff' : '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.7rem'
                  }}
                >
                  <Smartphone size={12} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Card Simulation */}
            <div style={{
              background: '#202124',
              borderRadius: serpDevice === 'mobile' ? '12px' : '8px',
              padding: serpDevice === 'mobile' ? '1rem' : '1.1rem 1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'Roboto, Arial, sans-serif',
              maxWidth: serpDevice === 'mobile' ? '360px' : '100%',
              margin: serpDevice === 'mobile' ? '0 auto' : '0'
            }}>
              {/* Google URL & Favicon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#0071ba',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: '#ffffff'
                }}>
                  A
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#dadce0', lineHeight: 1.2 }}>
                    Archery Technocrats
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#bdc1c6', lineHeight: 1.2 }}>
                    https://atplgroup.com {activePage.route !== '/' ? `› ${activePage.id}` : ''}
                  </span>
                </div>
              </div>

              {/* Title Link */}
              <div style={{
                color: '#8ab4f8',
                fontSize: serpDevice === 'mobile' ? '1.05rem' : '1.15rem',
                lineHeight: 1.3,
                fontWeight: 400,
                cursor: 'pointer',
                marginBottom: '0.35rem',
                wordBreak: 'break-word'
              }}>
                {activePage.title || 'Page Title Not Configured'}
              </div>

              {/* Snippet Description */}
              <div style={{
                color: '#bdc1c6',
                fontSize: '0.82rem',
                lineHeight: 1.45,
                wordBreak: 'break-word'
              }}>
                {activePage.description || 'No description provided. Search engines will automatically excerpt random body text from the webpage.'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
              <span>Robots Directive: <strong style={{ color: activePage.robots?.includes('noindex') ? '#f59e0b' : '#34d399' }}>{activePage.robots || 'index, follow'}</strong></span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activePage.canonical || `https://atplgroup.com${activePage.route}`);
                  setCopiedUrl(true);
                  setTimeout(() => setCopiedUrl(false), 2000);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--cyan-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.72rem'
                }}
              >
                {copiedUrl ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                <span>{copiedUrl ? 'Copied' : 'Copy Canonical URL'}</span>
              </button>
            </div>
          </div>

          {/* 2. Social Media Open Graph Share Card Preview */}
          <div style={{
            background: 'rgba(11, 20, 38, 0.8)',
            border: '1px solid var(--border-glass)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <Share2 size={16} color="var(--cyan-primary)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                Social Share Card Preview (LinkedIn / Twitter / WhatsApp)
              </span>
            </div>

            {/* Social Card Box */}
            <div style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {/* Image Preview Banner */}
              <div style={{
                height: '140px',
                background: 'linear-gradient(135deg, #091224 0%, #0c1a35 100%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                {activePage.ogImage ? (
                  <img
                    src={activePage.ogImage}
                    alt="OG Preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: '#64748b' }}>
                    <Globe size={28} />
                    <span style={{ fontSize: '0.75rem' }}>Default Social Banner</span>
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '10px',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '4px',
                  padding: '0.15rem 0.45rem',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--cyan-primary)'
                }}>
                  atplgroup.com
                </div>
              </div>

              {/* Text Card Details */}
              <div style={{ padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                  atplgroup.com
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '0.35rem' }}>
                  {activePage.ogTitle || activePage.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {activePage.ogDescription || activePage.description}
                </div>
              </div>
            </div>
          </div>

          {/* 3. SEO Health Checklist Card */}
          <div style={{
            background: 'rgba(11, 20, 38, 0.8)',
            border: '1px solid var(--border-glass)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldCheck size={16} color={seoHealth.score >= 80 ? '#34d399' : '#f59e0b'} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                  Page Quality Audit & Checklist
                </span>
              </div>
              <span className={`badge ${seoHealth.score >= 80 ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                {seoHealth.score >= 80 ? 'Status: Optimal' : 'Needs Review'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {seoHealth.checks.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    background: item.pass ? 'rgba(52, 211, 153, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                    border: item.pass ? '1px solid rgba(52, 211, 153, 0.15)' : '1px solid rgba(245, 158, 11, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.pass ? (
                      <CheckCircle2 size={14} color="#34d399" />
                    ) : (
                      <AlertCircle size={14} color="#f59e0b" />
                    )}
                    <span style={{ fontSize: '0.76rem', color: '#e2e8f0', fontWeight: 500 }}>
                      {item.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

