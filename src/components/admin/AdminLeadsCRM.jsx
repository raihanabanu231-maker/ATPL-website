import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  Building, 
  User, 
  Calendar, 
  Layers, 
  DollarSign, 
  Send, 
  X,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const AdminLeadsCRM = () => {
  const { leads, addLead, updateLead, deleteLead, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    solution: 'PERFECT WAREHOUSE (WMS) & RFID Integration',
    budget: '$100,000 - $250,000',
    priority: 'High',
    notes: '',
    source: 'Manual Entry'
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.solution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleExportCSV = () => {
    if (leads.length === 0) {
      addToast('No Data', 'No leads available to export.', 'warning');
      return;
    }

    const headers = ['ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone', 'Solution', 'Budget', 'Status', 'Priority', 'Assigned To', 'Notes'];
    const csvRows = [
      headers.join(','),
      ...leads.map(l => [
        `"${l.id}"`,
        `"${l.date}"`,
        `"${l.name}"`,
        `"${l.company}"`,
        `"${l.email}"`,
        `"${l.phone}"`,
        `"${l.solution}"`,
        `"${l.budget}"`,
        `"${l.status}"`,
        `"${l.priority}"`,
        `"${l.assignedTo || 'Unassigned'}"`,
        `"${(l.notes || '').replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ATPL_Enterprise_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', 'Enterprise leads spreadsheet downloaded successfully.', 'success');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addLead(newLeadForm);
    setAddModalOpen(false);
    setNewLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      solution: 'PERFECT WAREHOUSE (WMS) & RFID Integration',
      budget: '$100,000 - $250,000',
      priority: 'High',
      notes: '',
      source: 'Manual Entry'
    });
  };

  const handleAddNote = (leadId) => {
    if (!newNote.trim()) return;
    const currentNotes = selectedLead.notes ? selectedLead.notes + `\n• [${new Date().toLocaleDateString()}] ${newNote}` : `• [${new Date().toLocaleDateString()}] ${newNote}`;
    updateLead(leadId, { notes: currentNotes });
    setSelectedLead(prev => ({ ...prev, notes: currentNotes }));
    setNewNote('');
    addToast('Note Added', 'Internal engineering log updated.', 'info');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'badge-cyan';
      case 'In Review': return 'badge-purple';
      case 'Demo Scheduled': return 'badge-amber';
      case 'Quotation Sent': return 'badge-emerald';
      case 'Won': return 'badge-emerald';
      case 'Closed': return 'badge-danger';
      default: return 'badge-cyan';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-amber';
      case 'Medium': return 'badge-cyan';
      default: return 'badge-secondary';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Action Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Enterprise Inquiries & <span className="gradient-text">Lead Pipeline CRM</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Triage, track, and manage requests from the 3D Virtual Tour, website forms, and partner channels.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setAddModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={15} />
            <span>Add Enterprise Lead</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search leads by company, client, solution or email..."
            style={{ paddingLeft: '2.25rem', width: '100%' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Drops */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            className="form-control"
            style={{ width: '160px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="New">Status: New</option>
            <option value="In Review">Status: In Review</option>
            <option value="Demo Scheduled">Status: Demo Scheduled</option>
            <option value="Quotation Sent">Status: Quotation Sent</option>
            <option value="Won">Status: Won</option>
            <option value="Closed">Status: Closed</option>
          </select>

          <select
            className="form-control"
            style={{ width: '150px' }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">Priority: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

      </div>

      {/* Leads Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Company & Contact</th>
              <th>Solution Focus</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Engineer</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No enterprise leads matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedLead(lead)}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                      {lead.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#ffffff' }}>{lead.company}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{lead.name} • {lead.email}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{lead.solution}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>{lead.budget}</div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      {lead.assignedTo || 'Unassigned'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                      {new Date(lead.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.3rem 0.5rem' }}
                        title="Inspect Lead"
                      >
                        <Eye size={14} color="var(--cyan-primary)" />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: '0.3rem 0.5rem' }}
                        title="Delete Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over Inspector Drawer for Selected Lead */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>{selectedLead.id}</span>
                <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>{selectedLead.company}</h2>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Origin: {selectedLead.source}</div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', background: 'rgba(10, 18, 35, 0.7)', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Contact Representative</div>
                <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedLead.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Estimated Budget</div>
                <div style={{ color: 'var(--cyan-primary)', fontWeight: 600, fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>{selectedLead.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Email Address</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>{selectedLead.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Phone Number</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>{selectedLead.phone}</div>
              </div>
            </div>

            {/* Workflow Status & Assignment Controls */}
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label>Update Pipeline Status</label>
                <select
                  className="form-control"
                  value={selectedLead.status}
                  onChange={(e) => {
                    const updatedStatus = e.target.value;
                    updateLead(selectedLead.id, { status: updatedStatus });
                    setSelectedLead(prev => ({ ...prev, status: updatedStatus }));
                  }}
                >
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Demo Scheduled">Demo Scheduled</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Won">Won (Deal Closed)</option>
                  <option value="Closed">Closed / Disqualified</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assign Lead Architect</label>
                <select
                  className="form-control"
                  value={selectedLead.assignedTo || 'Unassigned'}
                  onChange={(e) => {
                    const updatedAssignee = e.target.value;
                    updateLead(selectedLead.id, { assignedTo: updatedAssignee });
                    setSelectedLead(prev => ({ ...prev, assignedTo: updatedAssignee }));
                  }}
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Amarnath Paramasivam (Founder & MD)">Amarnath Paramasivam (Founder & MD)</option>
                  <option value="Anusuya Paramasivam (Director)">Anusuya Paramasivam (Director)</option>
                  <option value="Senior Automation Specialist (Chennai Hub)">Senior Automation Specialist (Chennai Hub)</option>
                  <option value="TIDEL Park Technical Lead">TIDEL Park Technical Lead</option>
                </select>
              </div>
            </div>

            {/* Internal Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#cbd5e1', marginBottom: '0.5rem', display: 'block' }}>
                Engineering Notes & Requirements
              </label>
              <div style={{
                background: '#070e1c',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                maxHeight: '130px',
                overflowY: 'auto',
                marginBottom: '0.75rem'
              }}>
                {selectedLead.notes || 'No notes logged yet.'}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add internal engineer note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote(selectedLead.id)}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleAddNote(selectedLead.id)}
                >
                  <MessageSquare size={15} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  deleteLead(selectedLead.id);
                  setSelectedLead(null);
                }}
              >
                Delete Lead
              </button>

              <button
                type="button"
                className="btn btn-cyan btn-sm"
                onClick={() => {
                  updateLead(selectedLead.id, { status: 'Quotation Sent' });
                  setSelectedLead(prev => ({ ...prev, status: 'Quotation Sent' }));
                  addToast('Quotation Transmitted', `Formal technical proposal sent to ${selectedLead.email}`, 'success');
                }}
              >
                <Send size={15} />
                <span>Send Enterprise Quotation ➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lead Modal */}
      {addModalOpen && (
        <div className="modal-overlay" onClick={() => setAddModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '620px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Add Enterprise Lead (Manual Entry)</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Log offline, conference, or telephone inquiries directly into CRM.</p>
              </div>
              <button onClick={() => setAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Representative Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. Sunil Verma"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Company / Organization *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. Larsen & Toubro"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    placeholder="s.verma@lntecc.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    placeholder="+91 98401 22334"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Solution Scope</label>
                  <select
                    className="form-control"
                    value={newLeadForm.solution}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, solution: e.target.value })}
                  >
                    <option value="PERFECT WAREHOUSE (WMS) & RFID Integration">PERFECT WAREHOUSE (WMS) & RFID Integration</option>
                    <option value="PERFECT TRACE (Track & Trace Serialization)">PERFECT TRACE (Track & Trace Serialization)</option>
                    <option value="Computer Vision AI Defect Inspection">Computer Vision AI Defect Inspection</option>
                    <option value="Autonomous Robotics & Assembly Line">Autonomous Robotics & Assembly Line</option>
                    <option value="Industrial Hardware RFQ (Printers, Scanners, Tablets)">Industrial Hardware RFQ</option>
                    <option value="Annual Maintenance Contract (AMC) & Service Support">AMC Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget Tier</label>
                  <select
                    className="form-control"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                  >
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                    <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                    <option value="$500,000+">$500,000+ Enterprise Suite</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Initial Notes / Scope</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Facility requirements, timelines, technical specifications..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Save Lead into CRM ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
