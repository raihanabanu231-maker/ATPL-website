import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  PhoneCall, 
  AlertCircle, 
  Zap, 
  Layers, 
  Check, 
  ArrowRight,
  Settings,
  Flame,
  FileCheck,
  Eye
} from 'lucide-react';
import { ScrollReveal } from '../ui/scroll-reveal';

export const ServicesView = () => {
  const { openDemoModal } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTopic, setActiveTopic] = useState('all');

  const topics = [
    { id: 'all', label: 'All Services & AMC' },
    { id: 'amc-tiers', label: 'Structured AMC Tiers' },
    { id: 'quick-dispatch', label: 'Urgent Dispatch & SLA' },
    { id: 'scope', label: 'Comprehensive Engineering Scope' },
    { id: 'faqs', label: 'AMC FAQs' }
  ];

  const scrollToSection = (id) => {
    setActiveTopic(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const faqs = [
    {
      q: 'What is included in an ATPL Annual Maintenance Contract (AMC)?',
      a: 'ATPL AMCs cover comprehensive hardware maintenance (scanners, RFID portals, printers, and handhelds), optical sensor cleaning and calibration, routine firmware updates, quarterly on-site audits, priority emergency breakdown dispatch, and buffer spare parts stocking.'
    },
    {
      q: 'How fast is your emergency on-site engineer dispatch SLA?',
      a: 'Under our Enterprise 24/7 AMC tier, we guarantee an on-site engineer response time of under 4 hours across major industrial corridors (Chennai, Bangalore, NCR, Pune, Ahmedabad). For plants running continuous 24/7 manufacturing operations, we provide Resident On-Site Engineers.'
    },
    {
      q: 'Do you support multi-vendor barcode and RFID hardware?',
      a: 'Yes, our certified automation engineers service and maintain ATPL integrated systems as well as standard industrial OEM hardware including Zebra, Honeywell, Cognex, Datalogic, SATO, and TSC printers and scanners.'
    },
    {
      q: 'How do we log and track support tickets?',
      a: 'You can raise a support ticket directly through this portal, call our 24/7 direct toll-free hotline, or message our dedicated WhatsApp dispatch desk. Each ticket is assigned a priority level and tracked against our strict SLA timer.'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>ANNUAL MAINTENANCE CONTRACTS (AMC) & SUPPORT</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>
            Guaranteed SLAs & <span className="gradient-text">24/7 Engineering Field Services</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '2.25rem' }}>
            In the realm of technology and equipment, an AMC refers to an Annual Maintenance Contract. This is a service agreement where a service provider or manufacturer agrees to maintain and repair a product or system over a one-year period. Performance metrics and key indicators are employed to assess the effectiveness and efficiency of our service management. So our services are always top-notch quality to satisfy end customers.
          </p>

          {/* Submenu Topic Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            maxWidth: '920px',
            margin: '0 auto'
          }}>
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => scrollToSection(t.id)}
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
        </div>

        {/* 4 Official Pillars from atplgroup.com/amc-service/ */}
        <ScrollReveal variant="fade-up" distance={35} duration={0.65}>
          <div style={{ marginBottom: '4.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
              <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>ATPL SERVICE EXCELLENCE</div>
              <h2 style={{ fontSize: '2.1rem', color: '#ffffff', fontWeight: 800 }}>
                The Four Pillars of ATPL Maintenance & Engineering Support
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                From ISO-standard hardware testing to 24/7 software emergency hotlines and nationwide on-site engineer deployment.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
              {/* Pillar 1: Hardware */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #00f0ff' }}>
                <div>
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Wrench size={22} color="#00f0ff" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    ISO STANDARDS & CALIBRATION
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                    Hardware Maintenance
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                    We are maintaining ISO quality standard and criteria for all our product implementation. We do conducting tests, inspections, and quality checks for all our deliverable products to the client. Our team dedicated to quality assurance and testing will handle the maintenance of our installed products, such as printers, scanners, and mobile devices, at customer locations.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                    ✓ Printers, Scanners &amp; Handhelds
                  </span>
                </div>
              </div>

              {/* Pillar 2: Software */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #10b981' }}>
                <div>
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Layers size={22} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    24/7 DEDICATED ONLINE DESK
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                    Software AMC (24/7)
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                    We offer affordable Annual Maintenance Contracts (AMCs) for both our proprietary software and existing software owned by client. Our dedicated software team is available round-the-clock, 24/7, to promptly address any customer issues online. Additionally, we meticulously document all client projects for future reference, enhancing the efficiency and effectiveness of our clients' operations.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                    ✓ Round-the-clock 24/7 Live Support
                  </span>
                </div>
              </div>

              {/* Pillar 3: Installation & Training */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #f59e0b' }}>
                <div>
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Settings size={22} color="#f59e0b" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    DEMOS, CALIBRATION & INDEPENDENCE
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                    Installation &amp; Training
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                    Our team is also tasked with delivering product demos to showcase test results at customer locations. This involves the collaboration of service engineers, quality control inspectors, and testing teams. They ensure that the equipment is properly maintained and calibrated. We provide training to customers on how to effectively utilize our products and services, enabling them to work independently without any reliance on external assistance.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
                    ✓ On-site Staff Hands-on Training
                  </span>
                </div>
              </div>

              {/* Pillar 4: Onsite service (PAN India) */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #c084fc' }}>
                <div>
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <ShieldCheck size={22} color="#c084fc" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    NATIONWIDE FIELD DISPATCH
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                    PAN-India Onsite Service
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                    We offer PAN India services across India, deploying our highly skilled service engineers directly to our customers' locations. To ensure the health and functionality of our products, preventive actions are taken through on-site visits for product health checks. Our quality assurance and testing procedures ensure that products and services meet the required standards and that defects are identified and addressed promptly.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700 }}>
                    ✓ Scheduled Health Checks &amp; Preventive Audits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Service Request Action Strip */}
        <div id="quick-dispatch" className="glass-card" style={{
          padding: '1.75rem 2.5rem',
          marginBottom: '4rem',
          marginTop: '2.5rem',
          background: 'linear-gradient(90deg, rgba(0, 114, 255, 0.15) 0%, rgba(0, 240, 255, 0.1) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span className="pulse-dot"></span>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>Need Immediate Field Service or Hardware Calibration?</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0 }}>
              Raise an urgent ticket for quick engineer dispatch, printhead replacement, or scanner alignment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => openDemoModal({ mode: 'service', solution: 'Urgent AMC Service Ticket', notes: 'Urgent breakdown / support dispatch request.' })}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Wrench size={16} />
              <span>Raise Service Ticket</span>
            </button>
            <a
              href="https://wa.me/917200157626?text=Hello%20ATPL%20Field%20Service%20Desk%2C%20I%20need%20urgent%20AMC%20maintenance%20%2F%20service%20dispatch."
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PhoneCall size={16} color="#34d399" />
              <span>WhatsApp Service Desk</span>
            </a>
          </div>
        </div>

        {/* SLA Tiers Grid */}
        <div id="amc-tiers" style={{ textAlign: 'center', marginBottom: '2.5rem', scrollMarginTop: '6rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>STRUCTURED AMC TIERS</div>
          <h2 style={{ fontSize: '2rem', color: '#ffffff' }}>Choose the Right SLA Coverage for Your Plant</h2>
        </div>

        <div className="grid-3" style={{ gap: '2rem', marginBottom: '4.5rem' }}>
          
          {/* Tier 1 */}
          <motion.div 
            className="glass-card" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '1rem' }}>Tier 1: Standard</div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 800 }}>Standard Business AMC</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Ideal for single-shift distribution centers, standard warehouse hubs, and non-continuous packaging lines.
              </p>
              
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
                8-Hour SLA
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Business hours remote helpdesk (9 AM - 7 PM)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Quarterly on-site preventive audit & cleaning</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Annual firmware upgrades & driver patches</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Discounted rates on consumable printheads & batteries</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openDemoModal({ mode: 'service', solution: 'Standard 8-Hour AMC', notes: 'Request for Standard AMC Contract proposal.' })}
              className="btn btn-secondary"
              style={{ marginTop: '2rem', width: '100%', cursor: 'pointer' }}
            >
              Select Standard AMC
            </motion.button>
          </motion.div>

          {/* Tier 2 */}
          <motion.div 
            className="glass-card" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{
              padding: '2.5rem',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)',
              background: 'linear-gradient(180deg, rgba(14, 28, 54, 0.95) 0%, rgba(7, 14, 28, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #00f0ff 0%, #0072ff 100%)',
              color: '#040914',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '0.2rem 1rem',
              borderRadius: '20px',
              letterSpacing: '0.05em'
            }}>
              MOST POPULAR FOR MANUFACTURING
            </div>

            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>Tier 2: 24/7 Enterprise</div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 800 }}>Enterprise 24/7 AMC</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Designed for high-speed pharmaceutical packaging, automotive assembly lines, and 24/7 fulfillment centers.
              </p>
              
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#34d399', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
                4-Hour On-Site SLA
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>24/7 round-the-clock priority emergency hotline</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Guaranteed 4-hour on-site engineer dispatch SLA</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Free hot-swap replacement standby units during repair</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Monthly OEE & barcode scan grade optimization audit</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openDemoModal({ mode: 'service', solution: 'Enterprise 24/7 AMC', notes: 'Request for Enterprise 24/7 AMC Contract proposal with 4h SLA.' })}
              className="btn btn-primary"
              style={{ marginTop: '2rem', width: '100%', cursor: 'pointer' }}
            >
              Select Enterprise 24/7 AMC
            </motion.button>
          </motion.div>

          {/* Tier 3 */}
          <motion.div 
            className="glass-card" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '1rem' }}>Tier 3: Continuous Operations</div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 800 }}>Resident Engineer AMC</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Full-time ATPL automation engineers permanently stationed inside your facility with on-site spare inventory.
              </p>
              
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#c084fc', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
                Instant Zero-Delay SLA
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Dedicated engineer(s) stationed at your plant</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>On-site consignment spare parts & hot-swap vault</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Daily shift changeover inspections & calibration</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Continuous shopfloor operator training & certifications</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openDemoModal({ mode: 'service', solution: 'Resident Engineer AMC', notes: 'Request for Resident Engineer AMC proposal.' })}
              className="btn btn-secondary"
              style={{ marginTop: '2rem', width: '100%', cursor: 'pointer' }}
            >
              Select Resident AMC
            </motion.button>
          </motion.div>

        </div>

        {/* What AMC Covers */}
        <div id="scope" className="glass-card" style={{ padding: '3rem', background: 'rgba(8, 16, 32, 0.85)', marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Comprehensive Scope of ATPL Field Maintenance
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
              We take complete lifecycle responsibility for the health of your industrial track & trace, scanning, printing, and optical inspection equipment.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {[
              {
                icon: Eye,
                title: 'Optical Cleaning & Calibration',
                desc: 'Precision laser lens cleaning, focal length calibration, and ambient lighting adjustment for barcode verifiers and vision cameras.'
              },
              {
                icon: Zap,
                title: 'Printhead & Platen Care',
                desc: 'Thermal printhead resistance testing, platen roller resurfacing, and ribbon tension balancing to avoid barcode grading drops.'
              },
              {
                icon: ShieldCheck,
                title: 'RFID Portal Tuning',
                desc: 'Power output calibration, RF reflection filtering, and antenna radiation pattern alignment for 100% read reliability.'
              },
              {
                icon: Settings,
                title: 'Firmware & Security Patches',
                desc: 'Scheduled software updates, security vulnerability remediation, and database index optimization for WMS and serialization servers.'
              },
              {
                icon: FileCheck,
                title: 'Audit & Compliance Reports',
                desc: 'Periodic ISO/IEC 15415 scan verification audit certificates for your FDA, DSCSA, or European export compliance binders.'
              },
              {
                icon: Headphones,
                title: '24/7 Telemetry Diagnostics',
                desc: 'Remote edge monitoring detecting degraded signal strength or micro-errors before an unexpected machine line stoppage occurs.'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color="var(--cyan-primary)" />
                    </div>
                    <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0 }}>{item.title}</h4>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" style={{ maxWidth: '850px', margin: '0 auto', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>Frequently Asked Questions About AMC</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="glass-card"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                style={{ padding: '1.5rem', cursor: 'pointer' }}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0 }}>{faq.q}</h4>
                  <span style={{ color: 'var(--cyan-primary)', fontSize: '1.2rem', fontWeight: 700 }}>
                    {activeFaq === i ? '−' : '+'}
                  </span>
                </div>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: 0 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
