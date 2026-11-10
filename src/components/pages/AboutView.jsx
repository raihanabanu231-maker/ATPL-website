import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  ShieldCheck, 
  Award, 
  Globe, 
  Users, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Target, 
  Cpu, 
  Clock, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  Zap,
  Car,
  Package,
  Pill,
  Truck
} from 'lucide-react';
import { ATPL_COMPANY_INFO, ATPL_CLIENTS } from '../../data/initialAdminData';
import { ClientLogo, REAL_CLIENTS_DATA } from '../common/ClientBrandLogos';
import { PageHeroBackdrop, HeroFilterPill } from '../common/PageHeroBackdrop';
import { ProximityScaleGrid } from '../common/ProximityScaleGrid';
import { AnimatedTabs } from '../ui/animated-tabs';
import { BentoCard } from '../ui/bento-card';
import { ShineBadge } from '../ui/shine-badge';
import { ParallaxTiltCard } from '../ui/parallax-tilt-card';
import { NumberTicker } from '../ui/number-ticker';
import { ScrollReveal } from '../ui/scroll-reveal';

export const AboutView = () => {
  const { openDemoModal, setCurrentView } = useApp();
  const [activeTopic, setActiveTopic] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');

  const filteredClients = activeTopic === 'all' && clientFilter === 'all'
    ? REAL_CLIENTS_DATA
    : clientFilter === 'all'
      ? REAL_CLIENTS_DATA
      : REAL_CLIENTS_DATA.filter(c => c.category?.toLowerCase().includes(clientFilter.toLowerCase()));

  const topics = [
    { id: 'all', label: 'All Company Info' },
    { id: 'about-atpl', label: 'About ATPL' },
    { id: 'leadership', label: 'Founder & Leadership' },
    { id: 'vision-mission', label: 'Vision & Mission' },
    { id: 'core-values', label: '7 Core Values' },
    { id: 'infrastructure-qa', label: 'Infrastructure & QA' },
    { id: 'competitive-advantage', label: 'Why Work With ATPL' },
    { id: 'case-studies', label: 'Case Studies & Impact' },
    { id: 'enterprise-roster', label: 'Enterprise Roster (200+)' },
    { id: 'offices-branches', label: 'Offices & R&D Hubs (6 Hubs)' }
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

  const offices = [
    {
      city: 'Sales Office (Chennai HQ)',
      address: 'TIDEL Park, G11 Ground Floor, No.4, Canal Bank Rd, Taramani, Chennai, Tamil Nadu - 600113',
      focus: 'Corporate Sales, Solution Architecture & Client Demo Center'
    },
    {
      city: 'Registered Office (Chennai)',
      address: 'Plot No 275/11, Flat No S1, 2nd Floor, Gandhi Road, West Tambaram, Chennai, Tamil Nadu - 600045',
      focus: 'Corporate Governance, Finance & Legal Administration'
    },
    {
      city: 'R&D & Innovation Center (Madurai)',
      address: 'Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015',
      focus: 'AI/ML Vision Systems, Embedded IIoT Firmware & Cloud SaaS Labs'
    },
    {
      city: 'Manufacturing & Industrial Hub (Hosur)',
      address: 'Plot No-51, 2/749-6 MM Nagar, Mookandapalli, Hosur, Tamil Nadu - 635126',
      focus: 'Automotive & Heavy Engineering AIDC Integration, 24/7 Field AMC'
    },
    {
      city: 'Technology Hub (Bangalore)',
      address: 'Novel Tech Park, 46/4, GB Palya, Kudlu Gate, Bangalore, Karnataka - 560068',
      focus: 'Enterprise Cloud Systems, MDM SaaS & Regional Dispatch'
    },
    {
      city: 'Industrial Corridor Hub (Pune)',
      address: '102, Suman Business Center, Kalyani Nagar, Pune, Maharashtra - 411014',
      focus: 'Western India Automotive & Discrete Manufacturing Support'
    }
  ];

  const caseStudies = [
    {
      sector: 'Automotive Component Manufacturer',
      impact: '2 hrs to 2 mins',
      desc: 'Resource allocation cycle reduced from 2 hours to 2 minutes using ATPL traceability integrated with SAP S/4HANA.'
    },
    {
      sector: 'Rubber Products Manufacturer',
      impact: '+50% Dispatch Accuracy',
      desc: 'Achieved 50% improvement in shipping and dispatch verification accuracy with ATPL automated barcode grading.'
    },
    {
      sector: 'FMCG & Packaging Enterprise',
      impact: '-70% Audit Preparation Time',
      desc: 'Eliminated paper workflows and slashed ISO internal audit prep time by 70% using Perfect Audit™ SaaS.'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: 'transparent' }}>
      <div className="container">
        
        {/* Dynamic Radiant Page Hero Backdrop */}
        <PageHeroBackdrop
          badgeIcon={Sparkles}
          badgeText="ARCHERY TECHNOCRATS PRIVATE LIMITED"
          badgeColor="#8b5cf6"
          accentColor="#8b5cf6"
          secondaryGlow="#E85874"
          systemTag="[ 35+ YRS COMBINED LEADERSHIP // 6 HUBS ]"
          title="Target Perfection."
          highlightText="Powering Digital Transformation."
          description="Founded by industry veterans with 35+ years of combined experience in AIDC, IIoT, and enterprise software. Operating 6 branches across India with 7+ years of consistent, bootstrapped corporate growth."
        >
          {topics.map(t => (
            <HeroFilterPill
              key={t.id}
              active={activeTopic === t.id}
              onClick={() => scrollToSection(t.id)}
              label={t.label}
              accentColor="#8b5cf6"
            />
          ))}
        </PageHeroBackdrop>

        {/* 21st.dev Real-Time Metrics Ticker Ribbon */}
        <ScrollReveal variant="fade-up" distance={30} duration={0.6}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            margin: '2.5rem 0 3.5rem 0'
          }}>
            {[
              { num: 35, suffix: '+', label: 'Years Combined Leadership', sub: 'Industry Heritage', dotColor: '#00f0ff' },
              { num: 250, suffix: '+', label: 'Enterprise Plants Deployed', sub: 'Automotive & Pharma', dotColor: '#10b981' },
              { num: 99.98, suffix: '%', decimalPlaces: 2, label: 'Traceability & QC Accuracy', sub: 'Sub-8ms Verification', dotColor: '#f59e0b' },
              { num: 6, suffix: ' Hubs', label: 'Nationwide Engineering Hubs', sub: 'Chennai, Madurai, Hosur', dotColor: '#a855f7' }
            ].map((stat, i) => (
              <BentoCard
                key={i}
                spotlightColor="rgba(0, 240, 255, 0.12)"
                borderColor="rgba(255, 255, 255, 0.08)"
                glowBorderColor="rgba(0, 240, 255, 0.4)"
                style={{ padding: '1.6rem 1.4rem', borderRadius: '14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                    <span style={{
                      position: 'absolute',
                      display: 'inline-flex',
                      height: '100%',
                      width: '100%',
                      borderRadius: '50%',
                      backgroundColor: stat.dotColor,
                      opacity: 0.75,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }} />
                    <span style={{
                      position: 'relative',
                      display: 'inline-flex',
                      borderRadius: '50%',
                      height: '10px',
                      width: '10px',
                      backgroundColor: stat.dotColor
                    }} />
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono, monospace)' }}>
                    {stat.sub}
                  </span>
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, fontFamily: 'var(--font-display, Inter, sans-serif)' }}>
                  <NumberTicker
                    value={stat.num}
                    suffix={stat.suffix || ''}
                    decimalPlaces={stat.decimalPlaces || 0}
                    delay={i * 0.12}
                  />
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginTop: '0.35rem' }}>
                  {stat.label}
                </div>
              </BentoCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Official About ATPL Company Profile (From atplgroup.com/about-us/) */}
        <motion.div 
          id="about-atpl" 
          className="glass-card" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          style={{ padding: '3rem', marginBottom: '4rem', marginTop: '2.5rem', scrollMarginTop: '6rem' }}
        >
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '0.85rem' }}>SOUTH INDIA AUTOMATION LEADER</div>
              <h2 style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem' }}>
                Archery Technocrats Private Limited <span className="gradient-text">(ATPL)</span>
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.25rem', textAlign: 'justify' }}>
                Archery Technocrats Private Limited (ATPL) is a leading automation company from South India, founded by professionals who are together having more than 35+ years of experience in the AIDC &amp; IT Industry. ATPL is a leading Industrial Automation, AI/ML, IoT solutions, IT Infra, Tracking &amp; Traceability solutions, Enterprise Printing solution, Cleaning solutions and software services provider.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', textAlign: 'justify' }}>
                We at ATPL believe in providing best suited solutions to our clients, which should be cost effective and easy to implement. We at ATPL work on throughput to deliver the most effective solution. We have expertise in WMS, WIP Automation, Supply Chain Management, RTLS and RFID Tracking solutions. Our strength and expertise are to study problem statements and with throughput propose solutions.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>
                ATPL Group is India's leader in automation solutions for industrial purpose. Every market sector sees in ATPL a technological partner of Honeywell, CSL that is vertically integrated in order to cater to specific needs. Archery Technocrats is a controlled company of ATPL Group, specialized in industrial automation, Barcode, RFID and Wireless Solutions.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <motion.div whileHover={{ y: -3 }} style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <Cpu size={20} color="#00f0ff" />
                  <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem' }}>Innovation &amp; Customization</h4>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  Translating technological advancements into tailored solutions for customers. Products, applications, and services engineered to support modern industries at the highest level of quality and technology.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <Globe size={20} color="#10b981" />
                  <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem' }}>With You All Over The Country</h4>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  As part of a group, Archery Technocrats plays a national role: Chennai Headquarters at TIDEL Park, West Tambaram office, TCE-TBI Madurai R&amp;D Hub, Ananthapur branch, and an expansive network of sales and engineering teams across India.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} style={{ background: 'rgba(232, 88, 116, 0.05)', border: '1px solid rgba(232, 88, 116, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <Target size={20} color="#E85874" />
                  <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem' }}>Total Barcoding &amp; Wireless Infrastructure</h4>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  From wireless backbones to the ideal label and ribbon combinations, IPC consoles, POS terminals, and fixed multi-antenna RFID dock portals.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission Grid (21st.dev BentoCard) */}
        <ScrollReveal variant="fade-up" distance={30} duration={0.6}>
          <div id="vision-mission" className="grid-2" style={{ gap: '2rem', marginBottom: '4rem', scrollMarginTop: '6rem' }}>
            <BentoCard
              spotlightColor="rgba(0, 240, 255, 0.16)"
              borderColor="rgba(0, 240, 255, 0.25)"
              glowBorderColor="rgba(0, 240, 255, 0.55)"
              style={{ padding: '2.5rem', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} color="var(--cyan-primary)" />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>Our Vision</h3>
              </div>
              <blockquote style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
                "To be the company that best understands and satisfies the product, service and solution needs of all customers - Globally."
              </blockquote>
            </BentoCard>

            <BentoCard
              spotlightColor="rgba(16, 185, 129, 0.16)"
              borderColor="rgba(16, 185, 129, 0.25)"
              glowBorderColor="rgba(16, 185, 129, 0.55)"
              style={{ padding: '2.5rem', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Compass size={22} color="#10b981" />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>Our Mission</h3>
              </div>
              <blockquote style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
                "To discover, develop, and deliver innovative technology oriented solutions that help customers to prevail over their problems and improve their productivity, security and infrastructure."
              </blockquote>
            </BentoCard>
          </div>
        </ScrollReveal>

        {/* 7 Core Values Section (Official from atplgroup.com/about-us/) */}
        {/* Dynamic Proximity Scale Grid for Core Values & Customer Commitments */}
        <div id="core-values" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <ProximityScaleGrid />
        </div>

        {/* Our Infrastructure & Quality Assurance (Official from atplgroup.com/about-us/) */}
        <div id="infrastructure-qa" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>WORLD-CLASS FACILITIES</div>
            <h2 style={{ fontSize: '2.1rem', color: '#ffffff', fontWeight: 800 }}>
              Our Infrastructure &amp; <span className="gradient-text">Quality Assurance</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Sophisticated quality control laboratories and fully configured departmental infrastructure.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={24} color="#00f0ff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>Our Infrastructure</h3>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>Integrated Operational Ecosystem</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', margin: 0 }}>
                We possess a well-equipped infrastructural set-up, which helps us in carrying out our operations without any interruption. Our infrastructure is configured with several specialized departments, which assists in streamlining our entire business operations. It consists of departments such as production, quality control, warehousing and packaging, logistics, and several others.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} color="#10b981" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>Quality Assurance</h3>
                  <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>Dedicated Quality Control Laboratory</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', margin: 0 }}>
                Our company strictly adheres to global standards of excellence, as we are a quality-focused organization. To retain our company's formidable status in the industry, we have adopted strict quality guiding principles and policies suggested by the industry. Moreover, we have developed a sophisticated quality control laboratory, where all our activities related to quality checking are performed efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Why Work With ATPL? / Competitive Advantage (Official from atplgroup.com/about-us/) */}
        <div id="competitive-advantage" className="glass-card" style={{ padding: '3.5rem 2.5rem', marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>COMPETITIVE ADVANTAGE</div>
            <h2 style={{ fontSize: '2.1rem', color: '#ffffff', fontWeight: 800 }}>
              Why Work With Archery Technocrats?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Manufacturer-agnostic recommendations, dedicated single-source coordination, and unmatched domain heritage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'AIDC Total Solutions',
                desc: 'We are experts in the Automatic Identification and Data Collection (AIDC) industry, combining total barcoding solutions from wireless backbones to appropriate labels and ribbons.'
              },
              {
                title: '20+ Yrs Account Expertise',
                desc: 'Archery Technocrats Account Managers average over 20 years of barcoding, RFID, mobile, and wireless expertise. We understand selecting the right tech for your specific business needs.'
              },
              {
                title: 'Single Source Coordination',
                desc: 'Your organization works with a single dedicated source at Archery Technocrats to coordinate your total solution; saving you time and money.'
              },
              {
                title: 'Manufacturer-Agnostic',
                desc: 'We take your business challenges seriously and gather research to provide manufacturer-agnostic recommendations that accomplish your goals in the most cost-effective manner.'
              },
              {
                title: 'Enduring Partnership',
                desc: 'Our commitment to your satisfaction and continued support is unparalleled in the industry. You can count on us to be your partner long after your solution is in place.'
              },
              {
                title: 'Client-Centered Priority',
                desc: 'The objectives of your organization are our main priority. We remain flexible and adaptable in helping you meet them.'
              }
            ].map((adv, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <Zap size={16} color="var(--cyan-primary)" />
                  <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>{adv.title}</h4>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: 0, textAlign: 'justify' }}>
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Governance & Institutional Credentials */}
        {/* Executive Leadership & Founder's Vision (Official from atplgroup.com/about-us/) */}
        <div id="leadership" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>FOUNDER &amp; EXECUTIVE LEADERSHIP</div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800 }}>
              Pioneering South India's Industrial Automation
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Founded in April 2018 by seasoned industry veterans. Expanding from 40 initial clients to 200+ Tier-1 enterprise giants nationwide under clear engineering leadership.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem', alignItems: 'stretch' }}>
            {/* Founder Card */}
            <div className="glass-card" style={{ padding: '2.5rem', border: '1.5px solid rgba(0, 113, 186, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <img 
                    src="/assets/images/amarnath_paramasivam.jpg" 
                    alt="Amarnath Paramasivam - Founder & Managing Director, ATPL Group" 
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '2px solid #00f0ff',
                      boxShadow: '0 8px 20px rgba(0, 113, 186, 0.35)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.45rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>
                      Amarnath Paramasivam
                    </h3>
                    <div style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.2rem' }}>
                      Founder &amp; Managing Director
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      Mechanical Engineer &amp; MBA, 15+ Yrs Leadership (11 Yrs AIDC/IT)
                    </div>
                  </div>
                </div>

                <blockquote style={{
                  margin: '0 0 1.25rem 0',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(0, 113, 186, 0.12)',
                  borderLeft: '3px solid #00f0ff',
                  borderRadius: '0 10px 10px 0',
                  color: '#f1f5f9',
                  fontSize: '0.96rem',
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}>
                  "We should not hesitate to take risks to accomplish our commitments. Target Perfection."
                </blockquote>

                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  He heads Archery Technocrats Private Limited, guiding its strategic focus across industrial automation, AIDC infrastructure, IoT, and custom shopfloor SaaS. Under his stewardship, ATPL expanded from an initial base of 40 customers in 2018 to serving over 200+ industry giants across aerospace, automotive, electronics, and pharmaceuticals.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                <CheckCircle2 size={16} color="#00f0ff" />
                <span>Executive Steering &amp; Strategic Vision</span>
              </div>
            </div>

            {/* Director Card */}
            <div className="glass-card" style={{ padding: '2.5rem', border: '1.5px solid rgba(16, 185, 129, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '2px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    fontSize: '1.8rem',
                    fontWeight: 900
                  }}>
                    AP
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.45rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>
                      Anusuya Paramasivam
                    </h3>
                    <div style={{ fontSize: '0.86rem', color: '#34d399', fontWeight: 700, marginTop: '0.2rem' }}>
                      Director (Full Time)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      M.E. (VLSI Design), 15+ Yrs Industry Experience
                    </div>
                  </div>
                </div>

                <div style={{
                  margin: '0 0 1.25rem 0',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.10)',
                  borderLeft: '3px solid #10b981',
                  borderRadius: '0 10px 10px 0',
                  color: '#f1f5f9',
                  fontSize: '0.90rem',
                  lineHeight: 1.6
                }}>
                  <strong>Focus:</strong> Corporate Governance, Quality Compliance, Project Execution &amp; Long-Term Institutional Growth.
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  Leads corporate operations, finance governance, and strict quality frameworks compliant with BMQR ISO 9001:2015, US-FDA 21 CFR Part 11 audit trail mandates, and DPIIT Section 80-IAC central government recognitions.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                <Award size={16} color="#10b981" />
                <span>ISO 9001:2015 &amp; DPIIT Corporate Governance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Case Studies */}
        <div id="case-studies" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>PROVEN BUSINESS IMPACT</div>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
              Measurable Client Outcomes
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {caseStudies.map((cs, idx) => (
              <ParallaxTiltCard key={idx} tiltFactor={8} style={{ height: '100%' }}>
                <BentoCard
                  spotlightColor="rgba(0, 240, 255, 0.15)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  glowBorderColor="rgba(0, 240, 255, 0.45)"
                  style={{ padding: '2rem', textAlign: 'center', height: '100%', borderRadius: '16px' }}
                >
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    {cs.impact}
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.08rem', fontWeight: 800, marginBottom: '0.75rem' }}>{cs.sector}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>{cs.desc}</p>
                </BentoCard>
              </ParallaxTiltCard>
            ))}
          </div>
        </div>

        {/* Marquee Clients Showcase (209+ Verified Real Logos from ATPL Brand Portfolio) */}
        <div id="enterprise-roster" className="glass-card" style={{ padding: '3.5rem 2.5rem', marginBottom: '4rem', background: 'rgba(10, 20, 38, 0.95)', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            <h3 style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Trusted by 200+ Tier-1 Industry Leaders
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Powering zero-defect operations across automotive, heavy metals, FMCG, pharma, defense, electronics EMS, and aerospace leaders with verified production deployments.
            </p>
          </div>

          {/* Client Filter Controls (21st.dev AnimatedTabs & UI/UX Pro Max Vector Icons) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', width: '100%', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <AnimatedTabs
              tabs={[
                { id: 'all', label: `All Clients (${REAL_CLIENTS_DATA.length})`, icon: <Building2 size={16} /> },
                { id: 'Automotive', label: 'Automotive & EV', icon: <Car size={16} /> },
                { id: 'Heavy', label: 'Heavy Metals & Engg', icon: <Cpu size={16} /> },
                { id: 'Pharma', label: 'Pharma & Healthcare', icon: <Pill size={16} /> },
                { id: 'FMCG', label: 'FMCG & Packaging', icon: <Package size={16} /> },
                { id: 'Electronics', label: 'Electronics & EMS', icon: <Zap size={16} /> },
                { id: 'Logistics', label: 'Supply Chain & 3PL', icon: <Truck size={16} /> }
              ]}
              activeTab={clientFilter}
              onSelectTab={setClientFilter}
              layoutId="aboutClientFilterPill"
              size="sm"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
            gap: '1.15rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {filteredClients.map((client) => (
              <div
                key={client.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '0.85rem 0.85rem 0.65rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '92px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 113, 186, 0.45)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                title={`${client.name}, ${client.category}`}
              >
                <ClientLogo slug={client.slug} clientName={client.name} height={46} />
                <span style={{ 
                  fontSize: '0.72rem', 
                  color: '#475569', 
                  fontWeight: 700, 
                  marginTop: '0.4rem', 
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '155px'
                }}>
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pan-India Presence (21st.dev Bento Grid) */}
        <div id="offices-branches" className="glass-card" style={{ padding: '3.5rem 2.5rem', background: 'rgba(8, 17, 34, 0.85)', marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <h3 style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.5rem' }}>
              Offices & R&D Facilities Across 6 Nationwide Hubs
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
              Operating from TIDEL Park Chennai, West Tambaram, TCE-TBI Madurai, and key manufacturing corridors.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1.75rem' }}>
            {offices.map((office, idx) => (
              <BentoCard
                key={idx}
                spotlightColor="rgba(0, 240, 255, 0.14)"
                borderColor="rgba(255, 255, 255, 0.1)"
                glowBorderColor="rgba(0, 240, 255, 0.4)"
                style={{ padding: '2rem', borderRadius: '14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={17} color="var(--cyan-primary)" />
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.18rem', fontWeight: 800, margin: 0 }}>{office.city}</h4>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.90rem', lineHeight: 1.55, marginBottom: '0.85rem' }}>{office.address}</p>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--cyan-primary)',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'rgba(0, 240, 255, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  border: '1px solid rgba(0, 240, 255, 0.2)'
                }}>
                  Focus: {office.focus}
                </div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Callout */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary btn-lg"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 800,
              borderRadius: '999px',
              boxShadow: '0 8px 30px rgba(0, 113, 186, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              minHeight: '48px'
            }}
          >
            <span>Connect with ATPL Engineering Desk</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

      </div>
    </div>
  );
};
