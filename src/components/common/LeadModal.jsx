import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Sparkles, Send, Building, Mail, Phone, User, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeadModal = () => {
  const { demoModalOpen, closeDemoModal, demoModalPrefill, addLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    solution: 'ATPL Unified Automation Platform',
    budget: '₹15 Lakhs - ₹50 Lakhs',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (demoModalPrefill) {
      setFormData(prev => ({
        ...prev,
        solution: demoModalPrefill.solution || prev.solution,
        notes: demoModalPrefill.notes || ''
      }));
    }
  }, [demoModalPrefill]);

  if (!demoModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Add lead into central reactive CRM state
      addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        solution: formData.solution,
        budget: formData.budget,
        notes: formData.notes,
        priority: 'High',
        source: 'Interactive Web Modal'
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Confetti fallback
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        closeDemoModal();
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          solution: 'ATPL Unified Automation Platform',
          budget: '₹15 Lakhs - ₹50 Lakhs',
          notes: ''
        });
      }, 2000);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={closeDemoModal}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '620px', padding: '2rem' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={13} />
              <span>Direct Engineering Consultation</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: '#ffffff' }}>
              Schedule an <span className="gradient-text">Automation Consultation</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Connect directly with ATPL automation engineers for solution sizing, RFQs, and live PoC demos.
            </p>
          </div>
          <button
            onClick={closeDemoModal}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '0.4rem',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle size={38} color="#10b981" />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Consultation Request Confirmed!
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
              Your inquiry has been successfully transmitted and logged into the ATPL Admin CRM. An automation specialist will contact you within 2 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} color="var(--cyan-primary)" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rajesh Kumar"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building size={14} color="var(--cyan-primary)" />
                  <span>Company / Organization *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Bharat Manufacturing Ltd"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="var(--cyan-primary)" />
                  <span>Corporate Email *</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} color="var(--cyan-primary)" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} color="var(--cyan-primary)" />
                  <span>Solution Interest</span>
                </label>
                <select
                  className="form-control"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                >
                  <option value="ATPL Unified Automation Platform">ATPL Unified Automation Platform</option>
                  <option value="ATPL PERFECT MDM™ (Mobile Device Management)">ATPL PERFECT MDM™ (Mobile Device Management)</option>
                  <option value="PERFECT LABELER™ (Automated Print & Apply)">PERFECT LABELER™ (Automated Print & Apply)</option>
                  <option value="ATPL Warehouse (WMS) & RFID Integration">ATPL Warehouse (WMS) & RFID Integration</option>
                  <option value="ATPL Trace™ Serialization & Aggregation">ATPL Trace™ Serialization & Aggregation</option>
                  <option value="ATPL Vision AI Defect Inspection">ATPL Vision AI Defect Inspection</option>
                  <option value="Fixed UHF RFID Dock Portals">Fixed UHF RFID Dock Portals</option>
                  <option value="ATPL ShopFloor OS™ (SCADA & OEE)">ATPL ShopFloor OS™ (SCADA & OEE)</option>
                  <option value="3D Digital Twin & Virtual Plant Tour">3D Digital Twin & Virtual Plant Tour</option>
                  <option value="ATPL FieldCare™ 24/7 AMC & Resident SLA">ATPL FieldCare™ 24/7 AMC & Resident SLA</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estimated Project Budget</label>
                <select
                  className="form-control"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs (Starter Setup)</option>
                  <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs (Single Line / Plant)</option>
                  <option value="₹50 Lakhs - ₹1.5 Crore">₹50 Lakhs - ₹1.5 Crore (Multi-Line Scale)</option>
                  <option value="₹1.5 Crore+ Enterprise">₹1.5 Crore+ (Enterprise Multi-Plant)</option>
                  <option value="Custom RFQ / AMC Tender">Custom RFQ / AMC Tender</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Project Details / Pain Points</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Briefly describe your current facility setup, throughput targets, or timeline..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={closeDemoModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2 }}
                disabled={isSubmitting}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Transmitting Data...' : 'Submit to Engineering Desk ➔'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
