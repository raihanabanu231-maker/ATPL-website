import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Building2, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  X, 
  Eye, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

export const AdminProjects = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    addToast,
    setCurrentView,
    adminProjectModalOpen,
    setAdminProjectModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Sync with global modal trigger
  useEffect(() => {
    if (adminProjectModalOpen) {
      handleOpenAdd();
      setAdminProjectModalOpen(false);
    }
  }, [adminProjectModalOpen]);

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: 'Automotive OEM',
    solution: 'PERFECT WAREHOUSE™ & UHF RFID Portals',
    metric: '99.98% Inventory Accuracy',
    year: '2026',
    status: 'Published',
    featured: true,
    description: ''
  });

  const quickPresets = [
    {
      title: 'Automated Robotic Vision QC & Laser DPM Cell',
      client: 'Tata Motors Powertrain Division',
      industry: 'Automotive OEM',
      solution: 'AI Optical Inspection + Robotic Laser Marking',
      metric: '99.98% Inspection Accuracy (<8ms latency)',
      year: '2026',
      description: 'Deployed multi-axis robotic handling with sub-millimeter AI defect detection and GS1-compliant laser etching on high-velocity production lines.'
    },
    {
      title: 'Real-Time UHF RFID Warehouse & Dock Portal Sync',
      client: 'Reliance Retail & Omnichannel Supply Chain',
      industry: 'Omnichannel Retail & Logistics',
      solution: 'PERFECT WAREHOUSE™ + RFID Archway Portals',
      metric: '-65% Dock Loading Time • 100% Inbound Scan',
      year: '2026',
      description: 'Automated gate check-in, pallet serialization, and bi-directional ERP synchronization for over 450,000 inventory items daily.'
    },
    {
      title: 'DSCSA & EU-FMD Compliant Pharma Serialization Line',
      client: 'Dr. Reddy\'s Laboratories (Formulations)',
      industry: 'Pharmaceuticals & Life Sciences',
      solution: 'PERFECT TRACE™ Track & Trace Suite',
      metric: '450 packs/min Line Speed (Zero Rejections)',
      year: '2026',
      description: 'Turnkey 4-tier aggregation (Item -> Carton -> Case -> Pallet) with 21 CFR Part 11 electronic records and tamper-evident labeling.'
    }
  ];

  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      ...preset
    }));
    addToast('Preset Applied', `Loaded template: ${preset.title}`, 'info');
  };

  const filteredProjects = projects.filter(proj => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'All' || proj.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      industry: 'Automotive OEM',
      solution: 'PERFECT WAREHOUSE™ & UHF RFID Portals',
      metric: '99.98% Inventory Accuracy',
      year: '2026',
      status: 'Published',
      featured: true,
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
      addToast('Project Updated', `Project "${formData.title}" updated successfully!`, 'success');
    } else {
      addProject(formData);
      addToast('Project Published', `New project "${formData.title}" is now LIVE on the website!`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Enterprise Projects & <span className="gradient-text">Case Studies Manager</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Add and manage Industry 4.0 client projects, deployment metrics, and showcase case studies on the live website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={15} />
          <span>Add New Project / Case Study</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search projects by client, solution, or industry..."
            style={{ paddingLeft: '2.25rem', width: '100%' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Industry Filter */}
        <select
          className="form-control"
          style={{ width: '200px' }}
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
        >
          <option value="All">Industry: All</option>
          <option value="Automotive OEM">Automotive OEM</option>
          <option value="Omnichannel Retail & Logistics">Retail & Logistics</option>
          <option value="Pharmaceuticals & Life Sciences">Pharma & Life Sciences</option>
          <option value="Aerospace & Defense">Aerospace & Defense</option>
        </select>

      </div>

      {/* Projects Grid */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="glass-card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-cyan">{proj.industry}</span>
                  {proj.featured && <span className="badge badge-purple">★ Featured</span>}
                </div>
                <span className={`badge ${proj.status === 'Published' ? 'badge-emerald' : 'badge-amber'}`}>
                  {proj.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                {proj.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                <Building2 size={14} color="var(--cyan-primary)" />
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{proj.client}</span>
                <span>•</span>
                <Calendar size={13} />
                <span>{proj.year}</span>
              </div>

              <div style={{ background: 'rgba(10, 18, 35, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Solution & Delivered Impact
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500, marginTop: '0.15rem' }}>
                  {proj.solution}
                </div>
                {proj.metric && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.82rem', marginTop: '0.25rem', fontWeight: 600 }}>
                    <TrendingUp size={14} />
                    <span>{proj.metric}</span>
                  </div>
                )}
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {proj.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                ID: {proj.id}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                >
                  {proj.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.3rem 0.6rem' }}
                  title="Edit Project"
                >
                  <Edit3 size={13} color="var(--cyan-primary)" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: '0.3rem 0.5rem' }}
                  title="Delete Project"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '650px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                  {editingProject ? 'Edit Project / Case Study' : 'Add New Client Project & Case Study'}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  Publish enterprise deployment deliverables and benchmark metrics to the website.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* 1-Click Rapid Template Buttons */}
            {!editingProject && (
              <div style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  ⚡ Quick 1-Click Industry Templates:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {quickPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                    >
                      {preset.industry === 'Automotive OEM' ? '🚗 Auto OEM' : preset.industry.includes('Retail') ? '📦 Retail/RFID' : '💊 Pharma'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Autonomous Robotic Assembly Cell & DPM Laser Marking"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Client / Enterprise *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. Tata Motors Powertrain"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Industry Vertical</label>
                  <select
                    className="form-control"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="Automotive OEM">Automotive OEM</option>
                    <option value="Omnichannel Retail & Logistics">Omnichannel Retail & Logistics</option>
                    <option value="Pharmaceuticals & Life Sciences">Pharmaceuticals & Life Sciences</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Heavy Manufacturing & Foundries">Heavy Manufacturing & Foundries</option>
                    <option value="Electronics & Semiconductor">Electronics & Semiconductor</option>
                  </select>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Solution Deployed *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. PERFECT WAREHOUSE™ & UHF RFID Portals"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Delivered Impact / Key Metric</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 99.98% Accuracy (-65% Dock Time)"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Deployment Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2026"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Publish Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Published">Published (Live on Website)</option>
                    <option value="Draft">Draft (Internal Only)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Case Study Detailed Overview *</label>
                <textarea
                  className="form-control"
                  rows={3}
                  required
                  placeholder="Describe technical challenges solved, hardware/software stack, and measurable business ROIs..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                />
                <label htmlFor="featuredCheck" style={{ cursor: 'pointer', color: '#ffffff', fontSize: '0.88rem', marginBottom: 0 }}>
                  Feature this project on the Homepage Showcase (Live Website)
                </label>
              </div>

              {/* Website Live Preview Box */}
              {formData.title && (
                <div style={{
                  background: 'rgba(10, 18, 35, 0.9)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    👁️ Live Website Preview:
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                    {formData.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                    🏢 {formData.client || 'Client Name'} • <span style={{ color: '#10b981' }}>⚡ {formData.metric || 'Performance Metric'}</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-cyan btn-lg" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span>{editingProject ? 'Save Changes' : 'Publish to Website ➔'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
