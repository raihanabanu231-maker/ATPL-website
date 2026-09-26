import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  Layers, 
  Cpu, 
  Sparkles, 
  X, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'software',
    type: '',
    version: 'v1.0.0',
    description: '',
    status: 'Active'
  });

  const filteredProducts = products.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setAddModalOpen(false);
    setFormData({
      name: '',
      category: 'software',
      type: '',
      version: 'v1.0.0',
      description: '',
      status: 'Active'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Solutions & <span className="gradient-text">Product Catalog</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Manage Industry 4.0 software platforms, IoT hardware, and connected edge devices.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={15} />
          <span>Add New Product / Suite</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'software', label: 'Software Suites' },
            { id: 'hardware', label: 'Hardware & IoT' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                background: activeCategory === tab.id ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: activeCategory === tab.id ? 'var(--cyan-primary)' : '#94a3b8',
                border: activeCategory === tab.id ? '1px solid var(--border-glass-strong)' : '1px solid transparent',
                borderRadius: '6px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search catalog by name or type..."
            style={{ paddingLeft: '2.2rem', width: '100%' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* Products Cards Grid */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {filteredProducts.map(product => {
          const isSoftware = product.category === 'software';
          return (
            <div key={product.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: isSoftware ? 'rgba(0, 240, 255, 0.12)' : 'rgba(139, 92, 246, 0.12)',
                      border: `1px solid ${isSoftware ? 'rgba(0, 240, 255, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSoftware ? <Layers size={20} color="var(--cyan-primary)" /> : <Cpu size={20} color="#c084fc" />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{product.name}</h3>
                      <div style={{ fontSize: '0.78rem', color: isSoftware ? 'var(--cyan-primary)' : '#c084fc', fontFamily: 'var(--font-mono)' }}>
                        {product.type} • {product.version}
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${product.status === 'Active' ? 'badge-emerald' : 'badge-danger'}`}>
                    {product.status}
                  </span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: '0.85rem 0' }}>
                  {product.description}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: '0.9rem',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                  <span>Deployments: <strong style={{ color: '#ffffff' }}>{product.deployments}</strong></span>
                  <span>Rating: <strong style={{ color: '#fbbf24' }}>★ {product.rating}</strong></span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => updateProduct(product.id, { status: product.status === 'Active' ? 'Inactive' : 'Active' })}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.74rem' }}
                  >
                    {product.status === 'Active' ? 'Set Inactive' : 'Set Active'}
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.3rem 0.5rem' }}
                    title="Delete product"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      {addModalOpen && (
        <div className="modal-overlay" onClick={() => setAddModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Add Solution or Product</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Publish new software release or hardware equipment.</p>
              </div>
              <button onClick={() => setAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product / Solution Name *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. PERFECT VERIFIER™ 2D / 3D"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="software">Software Suite</option>
                    <option value="hardware">Hardware & Edge</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Type / Classification</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. ISO Barcode Quality Analyzer"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Version / Model</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. v3.2 Enterprise"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Beta">Beta Preview</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Product Description & Key Value Proposition</label>
                <textarea
                  className="form-control"
                  rows={3}
                  required
                  placeholder="Overview of capabilities, protocols supported, and enterprise benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Publish to Catalog ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
