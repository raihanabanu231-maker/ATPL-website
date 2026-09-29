import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles, Building, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactView = () => {
  const { addLead, siteSettings, setCurrentView } = useApp();
  const [activeTopic, setActiveTopic] = useState('demo');

  const topics = [
    { id: 'demo', label: '✨ 3D Plant Demo', solution: '3D Smart Factory & Robotics Tour' },
    { id: 'hardware', label: '🏷️ Hardware & RFID RFQ', solution: 'UHF RFID Portals & Scanners' },
    { id: 'software', label: '💻 Software & WMS Suite', solution: 'Perfect Store™ WMS & Serialization' },
    { id: 'amc', label: '🔧 24/7 AMC Support Desk', solution: 'Emergency Field AMC & Service' },
    { id: 'offices', label: '🏢 Corporate Offices', solution: null }
  ];

  const handleTopicClick = (topic) => {
    setActiveTopic(topic.id);
    if (topic.id === 'offices') {
      const el = document.getElementById('contact-offices');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (topic.solution) {
      setFormData(prev => ({ ...prev, solution: topic.solution }));
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>LET'S BUILD THE FUTURE TOGETHER</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Connect with <span className="gradient-text">Our Automation Engineers</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.25rem' }}>
            Whether you are planning a new RFID-enabled warehouse, deploying AI vision inspection, or upgrading industrial barcode infrastructure, our experts are ready to assist.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '900px',
            margin: '0 auto 2.5rem auto'
          }}>
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => handleTopicClick(t)}
                style={{
                  backgroundColor: activeTopic === t.id ? '#0071ba' : 'rgba(255, 255, 255, 0.05)',
                  border: activeTopic === t.id ? '2px solid #0071ba' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: activeTopic === t.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTopic === t.id ? '0 4px 15px rgba(0, 113, 186, 0.4)' : 'none'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* WhatsApp Direct Support Hub (Sales, Software, Service) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(18, 140, 126, 0.12) 100%)',
            border: '1.5px solid rgba(37, 211, 102, 0.4)',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            maxWidth: '960px',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>💬</span>
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Instant Departmental WhatsApp Direct Channels
              </h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Connect directly with our dedicated technical & sales desks for instant WhatsApp assistance:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {/* 1. Sales Support */}
              <a
                href="https://wa.me/916380859963?text=Hello%20ATPL%20Sales%20Team%2C%20I%20would%20like%20to%20inquire%20about%20Industry%204.0%20hardware%2Fsoftware%20solutions%20and%20request%20a%20quotation."
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#128C7E',
                  color: '#ffffff',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(18, 140, 126, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#25D366';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#128C7E';
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>💼</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Sales Support</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.95 }}>WhatsApp: +91 63808 59963</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>RFQs & Quotations</div>
                </div>
              </a>

              {/* 2. Software Support */}
              <a
                href="https://wa.me/919342173484?text=Hello%20ATPL%20Software%20Support%20Desk%2C%20I%20need%20technical%20assistance%20with%20Perfect%20Store%20WMS%20%2F%20Traceability%20%2F%20Vision%20AI%20software."
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#0071ba',
                  color: '#ffffff',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0, 113, 186, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#005a96';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#0071ba';
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>💻</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Software Support</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.95 }}>WhatsApp: +91 93421 73484</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>WMS, Trace & AI Helpdesk</div>
                </div>
              </a>

              {/* 3. Service & AMC Support */}
              <a
                href="https://wa.me/917200157626?text=Hello%20ATPL%20Field%20Service%20Desk%2C%20I%20need%20urgent%20AMC%20maintenance%20%2F%20engineer%20dispatch%20%2F%20hardware%20calibration%20support."
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#b45309',
                  color: '#ffffff',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(180, 83, 9, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#d97706';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#b45309';
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>🔧</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Service & AMC Support</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.95 }}>WhatsApp: +91 72001 57626</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Emergency Field AMC</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start', marginTop: '2.5rem' }}>
          
          {/* Left: Contact Coordinates */}
          <div id="contact-offices" className="glass-card" style={{ padding: '2.5rem', scrollMarginTop: '6rem' }}>
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
                📞 Departmental Phone & Mobile Desks
              </strong>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <div><strong>Toll Free:</strong> <a href="tel:1800120774777" style={{ color: '#38bdf8' }}>1800-120-774777</a></div>
                <div><strong>Landline:</strong> 044 3553 7618</div>
                <div><strong>Sales Mobile:</strong> <a href="tel:+916380859963" style={{ color: '#34d399' }}>+91 63808 59963</a></div>
                <div><strong>Software Mobile:</strong> <a href="tel:+919342173484" style={{ color: '#38bdf8' }}>+91 93421 73484</a></div>
                <div><strong>Service Mobile:</strong> <a href="tel:+917200157626" style={{ color: '#f59e0b' }}>+91 72001 57626</a></div>
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '0.35rem' }}>
                📧 Official Departmental Emails
              </strong>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <div><strong>Sales:</strong> <a href="mailto:sales@atplgroup.com" style={{ color: 'var(--cyan-primary)' }}>sales@atplgroup.com</a></div>
                <div><strong>Software Support:</strong> <a href="mailto:softwaresupport@atplgroup.com" style={{ color: 'var(--cyan-primary)' }}>softwaresupport@atplgroup.com</a></div>
                <div><strong>Service Desk:</strong> <a href="mailto:support@atplgroup.com" style={{ color: 'var(--cyan-primary)' }}>support@atplgroup.com</a></div>
              </div>
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
          <div id="contact-form" className="glass-card" style={{ padding: '2.5rem', scrollMarginTop: '6rem' }}>
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
