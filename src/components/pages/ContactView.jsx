import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles, Building, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactView = () => {
  const { addLead, siteSettings, setCurrentView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    solution: '3D Smart Factory & Robotics Tour',
    budget: '$100,000 - $250,000',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Add lead directly into Admin CRM
      addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        solution: formData.solution,
        budget: formData.budget,
        notes: formData.notes,
        priority: 'High',
        source: 'Website Contact Page'
      });

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        solution: '3D Smart Factory & Robotics Tour',
        budget: '$100,000 - $250,000',
        notes: ''
      });
    }, 1000);
  };

  return (
    <div className="section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>LET'S BUILD THE FUTURE TOGETHER</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Connect with <span className="gradient-text">Our Automation Engineers</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>
            Whether you are planning a new RFID-enabled warehouse, deploying AI vision inspection, or upgrading industrial barcode infrastructure, our experts are ready to assist.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* Left: Contact Coordinates */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '1.5rem' }}>Corporate Offices & Contact</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                🏢 Sales Office (Chennai HQ)
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd,<br />
                Taramani, Chennai, Tamil Nadu - 600113
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                🏛️ Registered Office
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                275/11, S1, 2nd Floor, Gandhi Road, West Tambaram, Chennai - 600045
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                🔬 R&D & Innovation Center
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                📞 Telephone & Toll Free
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <strong>Toll Free:</strong> <a href="tel:1800120774777" style={{ color: '#38bdf8' }}>1800-120-774777</a><br />
                <strong>Direct Line:</strong> 044-35537618, +91 9944735993
              </p>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                📧 Official Inquiries
              </strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                General: <a href="mailto:info@atplgroup.com" style={{ color: 'var(--cyan-primary)' }}>info@atplgroup.com</a><br />
                Sales & RFQs: <a href="mailto:sales@atplgroup.com" style={{ color: 'var(--cyan-primary)' }}>sales@atplgroup.com</a>
              </p>
            </div>

            <div style={{ background: 'rgba(0,240,255,0.06)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.25)' }}>
              <strong style={{ color: '#ffffff', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem' }}>
                ✨ Want an Interactive 3D Demo?
              </strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Experience our AI RoboGuide walking through all software and hardware products right in your browser.
              </p>
              <button 
                onClick={() => {
                  setCurrentView('factory-3d');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-cyan btn-sm"
              >
                Launch 3D Virtual Tour ➔
              </button>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '1.5rem' }}>Send Inquiry / Request PoC</h3>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
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
                  Inquiry Transmitted to CRM!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  Your request has been logged into the ATPL Admin Lead Queue. An automation specialist will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
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
                    <label>Company / Organization *</label>
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
                    <label>Corporate Email *</label>
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
                    <label>Phone Number *</label>
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
                    <label>Solution Scope</label>
                    <select
                      className="form-control"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    >
                      <option value="Perfect Store (WMS) & ERP Middleware">Perfect Store™ (WMS) & ERP Middleware</option>
                      <option value="PerfectEdge MDM (Mobile Device Management)">PerfectEdge MDM™ (Mobile Device Management)</option>
                      <option value="Perfect Labeler (Automated Print & Apply)">Perfect Labeler™ (Automated Print & Apply)</option>
                      <option value="Perfect Trace (GS1 Serialization)">Perfect Trace™ (GS1 Serialization)</option>
                      <option value="Perfect AI Vision System (Defect Detection)">Perfect AI Vision System™ (Defect Detection)</option>
                      <option value="Perfect Audit (ISO Audit Management SaaS)">Perfect Audit™ (ISO Audit Management SaaS)</option>
                      <option value="Fixed UHF RFID Dock Portals">Fixed UHF RFID Dock Portals</option>
                      <option value="3D Digital Twin & Smart Factory Simulator">3D Digital Twin & Smart Factory Simulator</option>
                      <option value="Annual Maintenance Contract (AMC) & Field SLA">Annual Maintenance Contract (AMC) & Field SLA</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Estimated Project Scale</label>
                    <select
                      className="form-control"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs (Pilot / Single Line)</option>
                      <option value="₹15 Lakhs - ₹50 Lakhs">₹15 Lakhs - ₹50 Lakhs (Plant Scale)</option>
                      <option value="₹50 Lakhs - ₹1.5 Crore">₹50 Lakhs - ₹1.5 Crore (Multi-Line Scale)</option>
                      <option value="₹1.5 Crore+ Enterprise">₹1.5 Crore+ (Enterprise Multi-Plant)</option>
                      <option value="Custom RFQ / AMC Tender">Custom RFQ / AMC Tender</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Details / Facility Requirements</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Briefly describe your facility setup, current throughput targets, or pain points..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '0.75rem' }}
                  disabled={isSubmitting}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Transmitting Data...' : 'Submit Inquiry to Engineering Desk ➔'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
