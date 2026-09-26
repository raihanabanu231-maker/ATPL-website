import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  UserCheck, 
  Cpu, 
  Wrench,
  X
} from 'lucide-react';

export const AdminServiceDesk = () => {
  const { tickets, addTicket, updateTicket, addToast } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [formData, setFormData] = useState({
    client: '',
    equipment: '',
    serialNo: '',
    issue: '',
    priority: 'High',
    technician: 'Karthik Rao (Senior Field Specialist)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket(formData);
    setAddModalOpen(false);
    setFormData({
      client: '',
      equipment: '',
      serialNo: '',
      issue: '',
      priority: 'High',
      technician: 'Karthik Rao (Senior Field Specialist)'
    });
  };

  const handleResolve = (ticketId) => {
    updateTicket(ticketId, { status: 'Resolved', slaTime: 'Resolved on time' });
    addToast('Ticket Resolved', `Ticket ${ticketId} marked as completed.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Service Desk & <span className="gradient-text">AMC Contract Support</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            24/7 mission-critical response triage for deployed RFID portals, barcode engines, and WMS servers.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={15} />
          <span>Open Support Incident</span>
        </button>
      </div>

      {/* SLA Status Banners */}
      <div className="grid-3" style={{ gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>SLA COMMITMENT</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34d399', marginTop: '0.2rem' }}>4-Hour On-Site</div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>Guaranteed response for Level 1 Tier 1 clients</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>ACTIVE AMC CONTRACTS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--cyan-primary)', marginTop: '0.2rem' }}>48 Enterprise Plants</div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>100% active warranty coverage</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>SPARE PARTS READINESS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c084fc', marginTop: '0.2rem' }}>99.2% In-Stock</div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>Chennai & Pune regional warehouses</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Enterprise Client</th>
              <th>Equipment / Serial</th>
              <th>Issue Diagnostic</th>
              <th>Priority</th>
              <th>SLA Remaining</th>
              <th>Assigned Specialist</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => {
              const isResolved = ticket.status === 'Resolved';
              let priorityBadge = 'badge-cyan';
              if (ticket.priority === 'Critical') priorityBadge = 'badge-danger';
              else if (ticket.priority === 'High') priorityBadge = 'badge-amber';

              return (
                <tr key={ticket.id}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                      {ticket.id}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff' }}>{ticket.client}</strong>
                  </td>
                  <td>
                    <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{ticket.equipment}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{ticket.serialNo}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.84rem', color: '#e2e8f0', maxWidth: '300px' }}>{ticket.issue}</div>
                  </td>
                  <td>
                    <span className={`badge ${priorityBadge}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: isResolved ? '#34d399' : '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                      <Clock size={13} />
                      <span>{ticket.slaTime}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{ticket.technician}</div>
                  </td>
                  <td>
                    <span className={`badge ${isResolved ? 'badge-emerald' : 'badge-amber'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {!isResolved ? (
                      <button
                        onClick={() => handleResolve(ticket.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', color: '#34d399', borderColor: 'rgba(16,185,129,0.3)' }}
                      >
                        <CheckCircle size={13} />
                        <span>Resolve</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Closed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Support Incident Modal */}
      {addModalOpen && (
        <div className="modal-overlay" onClick={() => setAddModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Open Support Incident / Ticket</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Log an urgent hardware or software malfunction SLA ticket.</p>
              </div>
              <button onClick={() => setAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client Plant / Company *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Mahindra Automotive - Chakan Plant"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Equipment Model *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. ATPL UltraGate RFID Bay #2"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Serial / License Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ATPL-RF-2026-XXXX"
                    value={formData.serialNo}
                    onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Priority Tier</label>
                  <select
                    className="form-control"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Critical">Critical (Line Stoppage / 1-hr SLA)</option>
                    <option value="High">High (Partial Impairment / 4-hr SLA)</option>
                    <option value="Normal">Normal (Routine Maintenance)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned Specialist</label>
                  <select
                    className="form-control"
                    value={formData.technician}
                    onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                  >
                    <option value="Karthik Rao (Senior Field Specialist)">Karthik Rao (Senior Field Specialist)</option>
                    <option value="Arun Varma (Hardware Tech)">Arun Varma (Hardware Tech)</option>
                    <option value="Priya N. (Compliance Specialist)">Priya N. (Compliance Specialist)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Issue Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  required
                  placeholder="Symptom, error codes, affected production line..."
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Dispatch Ticket ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
