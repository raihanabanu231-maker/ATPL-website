import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, CheckCircle, Sparkles, Send, Building, Mail, Phone, User, Layers, 
  Calendar, Clock, Calculator, Download, Headphones, MessageSquare, 
  TrendingUp, Check, ExternalLink, FileSpreadsheet, ShieldCheck, Zap, 
  Factory, ArrowRight, DollarSign, Award, ChevronRight, Handshake, 
  Globe, Wrench, AlertTriangle, ShieldAlert, Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeadModal = () => {
  const { demoModalOpen, closeDemoModal, demoModalPrefill, addLead, addToast } = useApp();

  // Mode state: 'demo' | 'engineer' | 'roi' | 'partner' | 'service'
  const [activeMode, setActiveMode] = useState('demo');

  // Shared form inputs
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    plantLocation: '',
    solution: 'ATPL Unified Automation Platform',
    budget: '₹15 Lakhs - ₹50 Lakhs',
    notes: '',
    // Demo specific
    demoFormat: 'virtual', // 'virtual' | 'onsite' | 'experience_center'
    preferredDate: '',
    preferredTime: '10:00 AM - 01:00 PM',
    plantScale: 'Medium (5,000 - 25,000 units/day)',
    // Engineer specific
    erpSystem: 'SAP S/4HANA / ECC',
    callbackWindow: 'Next 30 - 60 Minutes (Urgent)',
    challengeScope: 'UHF RFID & Dock Gate Architecture',
    // ROI specific
    designation: '',
    // Partner specific
    partnerType: 'oem', // 'oem' | 'si' | 'distributor' | 'turnkey'
    partnerWebsite: '',
    partnerTerritory: 'Pan-India & South Asia',
    partnerRevenue: '₹10 Cr - ₹50 Cr',
    partnerScope: '',
    // Service specific
    equipmentType: 'PERFECT LABELER™ Automated Print & Apply',
    severity: 'Critical Line-Stop (Guaranteed 2-Hour SLA)'
  });

  // Interactive ROI Calculator State
  const [roiInputs, setRoiInputs] = useState({
    workers: 24,
    shifts: 2,
    dailyDispatches: 3500,
    errorRate: 2.2
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMode, setSuccessMode] = useState('demo');

  // Resolve initial mode from prefill
  useEffect(() => {
    if (demoModalPrefill) {
      if (demoModalPrefill.mode) {
        setActiveMode(demoModalPrefill.mode);
      } else if (demoModalPrefill.solution) {
        const solLower = demoModalPrefill.solution.toLowerCase();
        if (solLower.includes('partner') || solLower.includes('oem') || solLower.includes('alliance') || solLower.includes('channel')) {
          setActiveMode('partner');
        } else if (solLower.includes('amc') || solLower.includes('service') || solLower.includes('ticket') || solLower.includes('breakdown')) {
          setActiveMode('service');
        } else if (solLower.includes('engineer') || solLower.includes('architecture consultation')) {
          setActiveMode('engineer');
        } else if (solLower.includes('roi') || solLower.includes('calculator')) {
          setActiveMode('roi');
        } else {
          setActiveMode('demo');
        }
      }
      setFormData(prev => ({
        ...prev,
        solution: demoModalPrefill.solution || prev.solution,
        notes: demoModalPrefill.notes || ''
      }));
    }
  }, [demoModalPrefill]);

  // Dynamic ROI Calculations
  const roiCalculations = useMemo(() => {
    const avgWorkerCostPerMonth = 24000;
    const totalWorkers = roiInputs.workers * roiInputs.shifts;
    const annualLaborCost = totalWorkers * avgWorkerCostPerMonth * 12;
    const annualLaborSavings = annualLaborCost * 0.35;

    const annualDispatches = roiInputs.dailyDispatches * 300;
    const annualErrors = annualDispatches * (roiInputs.errorRate / 100);
    const annualErrorCost = annualErrors * 2800;
    const annualErrorSavings = annualErrorCost * 0.985;

    const totalAnnualSavings = Math.round(annualLaborSavings + annualErrorSavings);
    const annualHoursSaved = Math.round(totalWorkers * 8 * 300 * 0.32);

    const estimatedCapex = Math.max(1200000, Math.round(totalAnnualSavings * 0.42));
    const paybackMonths = Math.max(2.8, +( (estimatedCapex / (totalAnnualSavings / 12)) ).toFixed(1));
    const estimated3YrRoi = Math.round(((totalAnnualSavings * 3 - estimatedCapex) / estimatedCapex) * 100);

    return {
      totalAnnualSavings,
      savingsInLakhs: (totalAnnualSavings / 100000).toFixed(1),
      annualHoursSaved,
      paybackMonths,
      estimated3YrRoi,
      annualErrorSavingsInLakhs: (annualErrorSavings / 100000).toFixed(1),
      annualLaborSavingsInLakhs: (annualLaborSavings / 100000).toFixed(1)
    };
  }, [roiInputs]);

  if (!demoModalOpen) return null;

  // Function to download realistic CSV ROI model spreadsheet
  const triggerRoiDownload = () => {
    const companyName = formData.company.trim() || 'Your Facility';
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(
`================================================================================
ATPL 2026 WAREHOUSE & SMART FACTORY AUTOMATION ROI MODEL
Prepared For: ${companyName}
Generated On: ${new Date().toLocaleDateString('en-IN')}
Engineering Hotline: +91 63808 59963 | Web: https://atplgroup.com
================================================================================

1. FACILITY BASELINE INPUTS
Warehouse / Shopfloor Workers per Shift,${roiInputs.workers} operators
Operating Shifts per Day,${roiInputs.shifts} shifts (${roiInputs.shifts * 8} hours/day)
Total Shopfloor Workforce,${roiInputs.workers * roiInputs.shifts} active operators
Average Daily Dispatches,${roiInputs.dailyDispatches.toLocaleString()} units
Current Baseline Error / Mismatch Rate,${roiInputs.errorRate}%
Baseline Annual Operating Working Days,300 days

2. ANNUAL FINANCIAL COST ESTIMATION (BEFORE AUTOMATION)
Annual Manual Labor Baseline (₹),₹${((roiInputs.workers * roiInputs.shifts) * 24000 * 12).toLocaleString()}
Annual Cost of Picking/Dispatch Errors (₹),₹${Math.round(roiInputs.dailyDispatches * 300 * (roiInputs.errorRate / 100) * 2800).toLocaleString()}

3. PROJECTED SAVINGS WITH ATPL INDUSTRY 4.0 SUITE
Projected Annual Labor Hours Saved,${roiCalculations.annualHoursSaved.toLocaleString()} productive hours
Projected Annual Labor Cost Saved (₹),₹${roiCalculations.annualLaborSavingsInLakhs} Lakhs
Projected Annual Error Elimination Savings (₹),₹${roiCalculations.annualErrorSavingsInLakhs} Lakhs
TOTAL PROJECTED ANNUAL NET SAVINGS (₹),₹${roiCalculations.savingsInLakhs} LAKHS (₹${roiCalculations.totalAnnualSavings.toLocaleString()})

4. RETURN ON INVESTMENT HORIZON
Estimated Capital Payback Period,${roiCalculations.paybackMonths} Months
Estimated 3-Year Cumulative ROI,${roiCalculations.estimated3YrRoi}%
Error Reduction Target,From ${roiInputs.errorRate}% down to < 0.02% (GS1 Compliant)

5. RECOMMENDED NEXT ARCHITECTURE STEP
Book an On-Site RFID/Vision AI Feasibility Study:
- Call Engineering Desk: +91 63808 59963
- Direct Technical WhatsApp: +91 63808 59963
- Chennai Tech Labs: 044 3553 7618
`
    );

    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `ATPL_Automation_ROI_Model_2026_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (addToast) {
      addToast('ROI Model Downloaded!', '2026 Financial Model CSV saved to your device.', 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMode(activeMode);

    setTimeout(() => {
      const leadPayload = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        priority: (activeMode === 'engineer' || activeMode === 'service') ? 'Urgent' : 'High',
        source: activeMode === 'demo' ? 'Live Demo Request' 
          : activeMode === 'engineer' ? 'Engineer Hotline' 
          : activeMode === 'roi' ? 'ROI Calculator Download'
          : activeMode === 'partner' ? 'Partner & OEM Alliance Application'
          : '24/7 FieldCare AMC Service Ticket'
      };

      if (activeMode === 'demo') {
        leadPayload.solution = formData.solution;
        leadPayload.notes = `Demo Format: ${formData.demoFormat.toUpperCase()} | Preferred Date: ${formData.preferredDate || 'Earliest slot'} (${formData.preferredTime}) | Plant Scale: ${formData.plantScale} | Notes: ${formData.notes}`;
      } else if (activeMode === 'engineer') {
        leadPayload.solution = `Systems Engineering Consultation (${formData.challengeScope})`;
        leadPayload.notes = `ERP System: ${formData.erpSystem} | Callback Window: ${formData.callbackWindow} | Location: ${formData.plantLocation} | Problem: ${formData.notes}`;
      } else if (activeMode === 'roi') {
        leadPayload.solution = 'ROI Model & Executive Financial Brief';
        leadPayload.notes = `Workers: ${roiInputs.workers} | Shifts: ${roiInputs.shifts} | Dispatches: ${roiInputs.dailyDispatches}/day | Error Rate: ${roiInputs.errorRate}% | Projected Savings: ₹${roiCalculations.savingsInLakhs} Lakhs/yr | Payback: ${roiCalculations.paybackMonths} mo`;
        triggerRoiDownload();
      } else if (activeMode === 'partner') {
        leadPayload.solution = `OEM & Channel Alliance (${formData.partnerType.toUpperCase()})`;
        leadPayload.notes = `Partner Category: ${formData.partnerType.toUpperCase()} | Website: ${formData.partnerWebsite} | Territory: ${formData.partnerTerritory} | Revenue Scale: ${formData.partnerRevenue} | Proposal: ${formData.notes || formData.partnerScope}`;
      } else if (activeMode === 'service') {
        leadPayload.solution = `FieldCare™ AMC Rapid Service (${formData.equipmentType})`;
        leadPayload.notes = `Severity: ${formData.severity} | Location: ${formData.plantLocation} | Equipment: ${formData.equipmentType} | Breakdown: ${formData.notes}`;
      }

      addLead(leadPayload);

      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        closeDemoModal();
      }, 3500);
    }, 850);
  };

  return (
    <div className="modal-overlay" onClick={closeDemoModal} style={{ zIndex: 9999, overflowY: 'auto', padding: '1.5rem 1rem' }}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: activeMode === 'roi' ? '760px' : activeMode === 'partner' ? '720px' : '680px', 
          width: '100%', 
          padding: '1.75rem', 
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #0f172a 0%, #090e1a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 113, 186, 0.15)',
          position: 'relative',
          margin: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeDemoModal}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '0.45rem',
            color: '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        >
          <X size={20} />
        </button>

        {/* Mode Switcher Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: activeMode === 'service' ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)',
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
          marginTop: '0.25rem',
          gap: '4px'
        }}>
          {/* Tab 1: Live Demo */}
          <button
            type="button"
            onClick={() => setActiveMode('demo')}
            style={{
              padding: '0.65rem 0.35rem',
              borderRadius: '7px',
              border: 'none',
              background: activeMode === 'demo' ? 'linear-gradient(135deg, #E85874 0%, #c83b56 100%)' : 'transparent',
              color: activeMode === 'demo' ? '#ffffff' : '#94a3b8',
              fontWeight: activeMode === 'demo' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
              boxShadow: activeMode === 'demo' ? '0 4px 15px rgba(232, 88, 116, 0.35)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Calendar size={14} />
            <span>Live Demo</span>
          </button>

          {/* Tab 2: Talk to an Engineer */}
          <button
            type="button"
            onClick={() => setActiveMode('engineer')}
            style={{
              padding: '0.65rem 0.35rem',
              borderRadius: '7px',
              border: 'none',
              background: activeMode === 'engineer' ? 'linear-gradient(135deg, #0071ba 0%, #0284c7 100%)' : 'transparent',
              color: activeMode === 'engineer' ? '#ffffff' : '#94a3b8',
              fontWeight: activeMode === 'engineer' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
              boxShadow: activeMode === 'engineer' ? '0 4px 15px rgba(0, 113, 186, 0.35)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Headphones size={14} />
            <span>Engineer Desk</span>
          </button>

          {/* Tab 3: ROI Calculator */}
          <button
            type="button"
            onClick={() => setActiveMode('roi')}
            style={{
              padding: '0.65rem 0.35rem',
              borderRadius: '7px',
              border: 'none',
              background: activeMode === 'roi' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              color: activeMode === 'roi' ? '#ffffff' : '#94a3b8',
              fontWeight: activeMode === 'roi' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
              boxShadow: activeMode === 'roi' ? '0 4px 15px rgba(16, 185, 129, 0.35)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Calculator size={14} />
            <span>ROI Model</span>
          </button>

          {/* Tab 4: Partner & OEM Alliance */}
          <button
            type="button"
            onClick={() => setActiveMode('partner')}
            style={{
              padding: '0.65rem 0.35rem',
              borderRadius: '7px',
              border: 'none',
              background: activeMode === 'partner' ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 'transparent',
              color: activeMode === 'partner' ? '#ffffff' : '#94a3b8',
              fontWeight: activeMode === 'partner' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
              boxShadow: activeMode === 'partner' ? '0 4px 15px rgba(139, 92, 246, 0.35)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Handshake size={14} />
            <span>Partner / OEM</span>
          </button>

          {/* Tab 5 (if opened via service action) */}
          {activeMode === 'service' && (
            <button
              type="button"
              onClick={() => setActiveMode('service')}
              style={{
                padding: '0.65rem 0.35rem',
                borderRadius: '7px',
                border: 'none',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              <Wrench size={14} />
              <span>AMC Service</span>
            </button>
          )}
        </div>

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.45)'
            }}>
              <CheckCircle size={42} color="#10b981" />
            </div>

            <h3 style={{ color: '#ffffff', fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              {successMode === 'demo' && 'Live Demo Booking Requested!'}
              {successMode === 'engineer' && 'Engineer Callback Dispatched!'}
              {successMode === 'roi' && 'ROI Model Successfully Generated & Downloaded!'}
              {successMode === 'partner' && 'Partner Alliance Application Dispatched!'}
              {successMode === 'service' && 'Emergency AMC Ticket Dispatched!'}
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              {successMode === 'demo' && (
                <>Our solutions team has logged your session request for <strong style={{ color: '#38bdf8' }}>{formData.company || 'your facility'}</strong>. A calendar invite with live plant simulation access will be dispatched to <strong style={{ color: '#ffffff' }}>{formData.email}</strong> within 2 hours.</>
              )}
              {successMode === 'engineer' && (
                <>Your priority engineering ticket has been queued to ATPL Systems Desk. An automation architect will reach you at <strong style={{ color: '#38bdf8' }}>{formData.phone}</strong> during your requested window (<strong style={{ color: '#ffffff' }}>{formData.callbackWindow}</strong>).</>
              )}
              {successMode === 'roi' && (
                <>Your 2026 Facility Financial Model has downloaded directly to your browser. A copy and custom CFO presentation have also been queued for <strong style={{ color: '#38bdf8' }}>{formData.email}</strong>.</>
              )}
              {successMode === 'partner' && (
                <>Your partner alliance profile for <strong style={{ color: '#c084fc' }}>{formData.company || 'your organization'}</strong> has been routed to ATPL Global Channel Directorate. Our Alliance team will schedule an exploratory briefing with <strong style={{ color: '#ffffff' }}>{formData.email}</strong> within 2 business days.</>
              )}
              {successMode === 'service' && (
                <>Your FieldCare™ emergency maintenance ticket has been registered with priority SLA. A resident technician has been alerted for plant <strong style={{ color: '#f59e0b' }}>{formData.plantLocation || formData.company}</strong>.</>
              )}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.82rem', color: '#94a3b8' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span>Logged into Central ATPL Enterprise CRM (Ref: #{Math.floor(100000 + Math.random() * 900000)})</span>
            </div>
          </div>
        ) : (
          /* FORM / CALCULATOR BODIES */
          <div>
            {/* ============================================================== */}
            {/* MODE 1: REQUEST LIVE DEMO                                     */}
            {/* ============================================================== */}
            {activeMode === 'demo' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(232, 88, 116, 0.15)', color: '#ff758f', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(232, 88, 116, 0.3)' }}>
                    <Sparkles size={13} />
                    <span>Live Interactive PoC & Simulation</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.3rem 0' }}>
                    Schedule an <span style={{ color: '#ff758f' }}>Interactive Live Demo</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    See ATPL WMS, Vision AI, UHF RFID gates, and GS1 Serialization live in action with customized plant data.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.45rem' }}>
                      Choose Demo Format:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {[
                        { id: 'virtual', label: '🖥️ Virtual Live Demo', sub: 'Zoom / Teams plant simulation' },
                        { id: 'onsite', label: '🏭 On-Site PoC Trial', sub: 'Hardware test at your plant' },
                        { id: 'experience_center', label: '🏢 ATPL Tech Labs', sub: 'Visit Chennai Demo Center' }
                      ].map(format => (
                        <div
                          key={format.id}
                          onClick={() => setFormData({ ...formData, demoFormat: format.id })}
                          style={{
                            padding: '0.65rem 0.6rem',
                            borderRadius: '8px',
                            border: `1.5px solid ${formData.demoFormat === format.id ? '#E85874' : 'rgba(255,255,255,0.08)'}`,
                            background: formData.demoFormat === format.id ? 'rgba(232, 88, 116, 0.12)' : 'rgba(255,255,255,0.02)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: formData.demoFormat === format.id ? '#ffffff' : '#cbd5e1' }}>
                            {format.label}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                            {format.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <User size={13} color="#ff758f" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rajesh Kumar"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Building size={13} color="#ff758f" />
                        <span>Company & Plant Location *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tata Motors / Pune Plant"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Mail size={13} color="#ff758f" />
                        <span>Work Email *</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="rajesh@tatamotors.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Phone size={13} color="#ff758f" />
                        <span>Phone / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Layers size={13} color="#ff758f" />
                        <span>Platform / Solution to Demo</span>
                      </label>
                      <select
                        className="form-control"
                        value={formData.solution}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="ATPL Warehouse Management System (WMS)">ATPL WMS (Warehouse Automation & Inventory)</option>
                        <option value="Fixed UHF RFID Dock Portals">Fixed UHF RFID Dock Gates & Inbound/Outbound</option>
                        <option value="ATPL Vision AI Defect Inspection">ATPL Vision AI Inspection (High-Speed QC)</option>
                        <option value="ATPL Trace™ Serialization & Aggregation">ATPL Trace™ GS1 Serialization & Aggregation</option>
                        <option value="PERFECT LABELER™ Automated Print & Apply">PERFECT LABELER™ Automated Print & Apply</option>
                        <option value="Turnkey Industry 4.0 End-to-End Suite">Turnkey Industry 4.0 End-to-End Suite</option>
                      </select>
                    </div>

                    <div className="grid-2" style={{ gap: '0.5rem' }}>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                          <Calendar size={13} color="#ff758f" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          style={{ padding: '0.65rem 0.6rem', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                          <Clock size={13} color="#ff758f" />
                          <span>Preferred Slot</span>
                        </label>
                        <select
                          className="form-control"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          style={{ padding: '0.65rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          <option value="10:00 AM - 01:00 PM">Morning (10 AM - 1 PM)</option>
                          <option value="02:00 PM - 05:00 PM">Afternoon (2 PM - 5 PM)</option>
                          <option value="Immediate / Next Day">Urgent (Next Available)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                      Specific Use Case / Plant Details (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="e.g. Need to track 4,000 pallets/day moving through 3 dock doors into SAP S/4HANA..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', resize: 'none' }}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={closeDemoModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        flex: 2,
                        padding: '0.85rem 1.25rem',
                        background: 'linear-gradient(135deg, #E85874 0%, #c83b56 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(232, 88, 116, 0.4)'
                      }}
                    >
                      <Calendar size={17} />
                      <span>{isSubmitting ? 'Reserving Schedule...' : 'Book Live Demo Session ➔'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 2: TALK TO AN ENGINEER                                   */}
            {/* ============================================================== */}
            {activeMode === 'engineer' && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0, 113, 186, 0.15)', color: '#38bdf8', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(0, 113, 186, 0.3)' }}>
                    <Zap size={13} />
                    <span>Direct Systems Architecture Desk · Zero Sales Pitch</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.3rem 0' }}>
                    Speak Directly with an <span style={{ color: '#38bdf8' }}>Automation Systems Architect</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    Connect with an ATPL engineer for protocol compatibility, PLC/SCADA integration, SAP/Oracle sync, and hardware sizing.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.65rem',
                  marginBottom: '1.25rem',
                  background: 'rgba(0, 113, 186, 0.08)',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 113, 186, 0.2)'
                }}>
                  <a
                    href="tel:+916380859963"
                    style={{
                      background: 'rgba(15, 23, 42, 0.7)',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <Phone size={18} color="#38bdf8" style={{ marginBottom: '0.25rem' }} />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Engineer Direct</span>
                    <strong style={{ fontSize: '0.86rem', color: '#ffffff', marginTop: '0.15rem' }}>+91 63808 59963</strong>
                  </a>

                  <a
                    href="https://wa.me/916380859963?text=Hi%20ATPL%20Engineering%20Desk%2C%20I%20would%20like%20to%20consult%20an%20automation%20systems%20architect%20regarding%20our%20plant."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(15, 23, 42, 0.7)',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <MessageSquare size={18} color="#22c55e" style={{ marginBottom: '0.25rem' }} />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>WhatsApp Tech Desk</span>
                    <strong style={{ fontSize: '0.86rem', color: '#4ade80', marginTop: '0.15rem' }}>Chat Online</strong>
                  </a>

                  <div style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <Clock size={18} color="#fbbf24" style={{ marginBottom: '0.25rem' }} />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>SLA Commitment</span>
                    <strong style={{ fontSize: '0.86rem', color: '#fde047', marginTop: '0.15rem' }}>Within 2 Hours</strong>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <User size={13} color="#38bdf8" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Vikram Sharma, Plant Head"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Phone size={13} color="#38bdf8" />
                        <span>Direct Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Building size={13} color="#38bdf8" />
                        <span>Company & Plant City *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ashok Leyland, Ennore"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Mail size={13} color="#38bdf8" />
                        <span>Corporate Email</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="vikram.s@ashokleyland.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                        Current Host ERP / MES System
                      </label>
                      <select
                        className="form-control"
                        value={formData.erpSystem}
                        onChange={(e) => setFormData({ ...formData, erpSystem: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="SAP S/4HANA / ECC">SAP S/4HANA / SAP ECC (IDoc / RFC / OData)</option>
                        <option value="Oracle NetSuite / Cloud ERP">Oracle Cloud / NetSuite</option>
                        <option value="Microsoft Dynamics 365">Microsoft Dynamics 365 Business Central</option>
                        <option value="Infor / Ramco / Epicor">Infor / Ramco / Epicor</option>
                        <option value="Tally Prime / Custom SQL DB">Tally Prime / Custom MS SQL / Postgres</option>
                        <option value="Standalone / No ERP Yet">Standalone / Evaluating First Automation</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                        Best Time for Engineer to Call
                      </label>
                      <select
                        className="form-control"
                        value={formData.callbackWindow}
                        onChange={(e) => setFormData({ ...formData, callbackWindow: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="Immediate (Next 30 - 60 Minutes)">Immediate (Next 30 - 60 Minutes)</option>
                        <option value="Today Afternoon (02:00 PM - 05:00 PM)">Today Afternoon (2:00 PM - 5:00 PM)</option>
                        <option value="Tomorrow Morning (10:00 AM - 12:00 PM)">Tomorrow Morning (10:00 AM - 12:00 PM)</option>
                        <option value="Schedule After Working Hours (6:00 PM+)">After Working Hours (6:00 PM+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                      What technical challenge are you solving?
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="e.g. RFID reflection around metal racks, Vision AI inspection speed requirements (140 ppm), or SAP dock receipt sync..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', resize: 'none' }}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={closeDemoModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        flex: 2,
                        padding: '0.85rem 1.25rem',
                        background: 'linear-gradient(135deg, #0071ba 0%, #0284c7 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(0, 113, 186, 0.4)'
                      }}
                    >
                      <Headphones size={17} />
                      <span>{isSubmitting ? 'Routing to Desk...' : 'Request Engineer Callback ➔'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 3: ROI CALCULATOR & DOWNLOAD                             */}
            {/* ============================================================== */}
            {activeMode === 'roi' && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <TrendingUp size={13} />
                    <span>Interactive Shopfloor Financial Model</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.3rem 0' }}>
                    Warehouse & RFID <span style={{ color: '#34d399' }}>ROI Calculator (2026)</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    Adjust your facility parameters below to view dynamic projected annual savings and download the complete executive spreadsheet model.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  padding: '1.1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '1.25rem'
                }}>
                  <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                          Shopfloor Operators / Shift:
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                          {roiInputs.workers} Workers
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="120"
                        step="1"
                        value={roiInputs.workers}
                        onChange={(e) => setRoiInputs({ ...roiInputs, workers: parseInt(e.target.value) || 5 })}
                        style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                        <span>5</span>
                        <span>60</span>
                        <span>120+</span>
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                        Operating Shifts / Day:
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                        {[1, 2, 3].map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setRoiInputs({ ...roiInputs, shifts: s })}
                            style={{
                              padding: '0.45rem',
                              borderRadius: '6px',
                              border: `1.5px solid ${roiInputs.shifts === s ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                              background: roiInputs.shifts === s ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.02)',
                              color: roiInputs.shifts === s ? '#ffffff' : '#94a3b8',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            {s} {s === 1 ? 'Shift' : s === 3 ? 'Shifts (24/7)' : 'Shifts'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                          Daily Dispatch Volume (Units):
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                          {roiInputs.dailyDispatches.toLocaleString()} / day
                        </span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="25000"
                        step="500"
                        value={roiInputs.dailyDispatches}
                        onChange={(e) => setRoiInputs({ ...roiInputs, dailyDispatches: parseInt(e.target.value) || 500 })}
                        style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                        <span>500</span>
                        <span>10,000</span>
                        <span>25,000+</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                          Current Shipping Error Rate:
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#f43f5e', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                          {roiInputs.errorRate}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.1"
                        value={roiInputs.errorRate}
                        onChange={(e) => setRoiInputs({ ...roiInputs, errorRate: parseFloat(e.target.value) || 0.5 })}
                        style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                        <span>0.5% (Low)</span>
                        <span>2.5%</span>
                        <span>5.0% (High)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.65rem',
                    marginTop: '1.1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 600 }}>Est. Annual Savings</span>
                      <strong style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                        ₹{roiCalculations.savingsInLakhs} L
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 600 }}>Payback Period</span>
                      <strong style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                        {roiCalculations.paybackMonths} Mo
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.25)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 600 }}>Hours Saved/Yr</span>
                      <strong style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                        {roiCalculations.annualHoursSaved.toLocaleString()} h
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 600 }}>Accuracy Gain</span>
                      <strong style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                        99.98%
                      </strong>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(16, 185, 129, 0.08)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px dashed rgba(16, 185, 129, 0.4)',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileSpreadsheet size={24} color="#10b981" />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                        ATPL 2026 ROI Financial Model (.CSV / Spreadsheet)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Pre-populated with formulas, cash-flow horizon, and labor cost schedules.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={triggerRoiDownload}
                    style={{
                      background: '#10b981',
                      color: '#062817',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 0.9rem',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#34d399'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#10b981'; }}
                  >
                    <Download size={14} />
                    <span>Download Model</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Or receive customized Executive Board Presentation for your Plant:
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company / Plant Name *"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Corporate Work Email *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone / WhatsApp *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={closeDemoModal}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        flex: 2,
                        padding: '0.85rem 1.25rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      <Download size={17} />
                      <span>{isSubmitting ? 'Generating File...' : 'Download Model & Send CFO Brief ➔'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 4: PARTNER & OEM ALLIANCE APPLICATION                     */}
            {/* ============================================================== */}
            {activeMode === 'partner' && (
              <div>
                <div style={{ marginBottom: '1.15rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                    <Handshake size={13} />
                    <span>Global OEM & Channel Partner Network</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.3rem 0' }}>
                    Apply for the <span style={{ color: '#c084fc' }}>ATPL Partner & OEM Program</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    Collaborate with ATPL Group to expand your industrial reach, co-engineer hardware solutions, or integrate enterprise WMS & RFID into your client base.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Partner Category Selector */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.45rem' }}>
                      Select Partner Category:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem' }}>
                      {[
                        { id: 'oem', label: '🏭 Hardware OEM', sub: 'Zebra / Honeywell / Sick' },
                        { id: 'si', label: '💻 ERP / SI Partner', sub: 'SAP / Oracle / MES SI' },
                        { id: 'distributor', label: '🌐 Regional VAR', sub: 'Distributor / Reseller' },
                        { id: 'turnkey', label: '🔧 Turnkey Builder', sub: 'Machine / Conveyor OEM' }
                      ].map(cat => (
                        <div
                          key={cat.id}
                          onClick={() => setFormData({ ...formData, partnerType: cat.id })}
                          style={{
                            padding: '0.6rem 0.4rem',
                            borderRadius: '8px',
                            border: `1.5px solid ${formData.partnerType === cat.id ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}`,
                            background: formData.partnerType === cat.id ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: formData.partnerType === cat.id ? '#ffffff' : '#cbd5e1' }}>
                            {cat.label}
                          </div>
                          <div style={{ fontSize: '0.67rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                            {cat.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <User size={13} color="#c084fc" />
                        <span>Primary Alliance Contact *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Suresh N., VP Channel Alliances"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Building size={13} color="#c084fc" />
                        <span>Company / OEM Organization *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Acme Automation Technologies Ltd"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Mail size={13} color="#c084fc" />
                        <span>Official Business Email *</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="alliances@acme-automation.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Phone size={13} color="#c084fc" />
                        <span>Direct Phone / Mobile *</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Globe size={13} color="#c084fc" />
                        <span>Operating Territory / Country</span>
                      </label>
                      <select
                        className="form-control"
                        value={formData.partnerTerritory}
                        onChange={(e) => setFormData({ ...formData, partnerTerritory: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="Pan-India & South Asia">Pan-India & South Asia</option>
                        <option value="Western India (MH, GJ)">Western India (MH, GJ)</option>
                        <option value="Southern India (TN, KA, AP, TS)">Southern India (TN, KA, AP, TS)</option>
                        <option value="Northern India (NCR, HR, PB)">Northern India (NCR, HR, PB)</option>
                        <option value="ASEAN / Southeast Asia">ASEAN / Southeast Asia (Singapore, Malaysia, Vietnam)</option>
                        <option value="Middle East / GCC (UAE, Saudi)">Middle East / GCC (UAE, Saudi Arabia)</option>
                        <option value="Europe / North America">Europe / North America</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Briefcase size={13} color="#c084fc" />
                        <span>Company Annual Turnover</span>
                      </label>
                      <select
                        className="form-control"
                        value={formData.partnerRevenue}
                        onChange={(e) => setFormData({ ...formData, partnerRevenue: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="₹1 Cr - ₹10 Cr">₹1 Cr - ₹10 Cr (Regional Integrator)</option>
                        <option value="₹10 Cr - ₹50 Cr">₹10 Cr - ₹50 Cr (Established System Partner)</option>
                        <option value="₹50 Cr - ₹250 Cr">₹50 Cr - ₹250 Cr (Large Enterprise OEM)</option>
                        <option value="₹250 Cr+ Tier-1 Global">₹250 Cr+ (Tier-1 Global OEM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                      Partnership Scope & Value Proposition
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="e.g. We are an SAP Gold Partner with 40+ warehouse clients seeking to bundle ATPL's WMS and RFID gates into our client deployments..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', resize: 'none' }}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={closeDemoModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        flex: 2,
                        padding: '0.85rem 1.25rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
                      }}
                    >
                      <Handshake size={17} />
                      <span>{isSubmitting ? 'Transmitting Profile...' : 'Submit Partner Alliance Application ➔'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 5: FIELDCARE AMC SERVICE & RAPID DISPATCH                 */}
            {/* ============================================================== */}
            {activeMode === 'service' && (
              <div>
                <div style={{ marginBottom: '1.15rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <Wrench size={13} />
                    <span>24/7 FieldCare™ Rapid Technical Dispatch</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.3rem 0' }}>
                    Raise an <span style={{ color: '#fbbf24' }}>Immediate AMC Service Ticket</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    Guaranteed engineer dispatch for line stops, printhead calibration, scanner realignments, and spare replacement.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Building size={13} color="#fbbf24" />
                        <span>Facility / Plant Location *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Hyundai Plant 2, Sriperumbudur"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <AlertTriangle size={13} color="#f43f5e" />
                        <span>Issue Severity *</span>
                      </label>
                      <select
                        className="form-control"
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="Critical Line-Stop (Guaranteed 2-Hour SLA)">🚨 Critical Line-Stop (Guaranteed 2h SLA)</option>
                        <option value="Major Impairment (4-Hour Response)">⚠️ Major Impairment (4h Response)</option>
                        <option value="Preventive Maintenance & Calibration">📋 Scheduled Preventive Calibration</option>
                        <option value="Consumables / Printhead Spare Dispatch">📦 Spare Parts / Consumable Buffer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <User size={13} color="#fbbf24" />
                        <span>Shopfloor Supervisor Name *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Ramesh K. (Maintenance Lead)"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Phone size={13} color="#fbbf24" />
                        <span>Emergency Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '0.85rem' }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Layers size={13} color="#fbbf24" />
                        <span>Equipment Type</span>
                      </label>
                      <select
                        className="form-control"
                        value={formData.equipmentType}
                        onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="PERFECT LABELER™ Automated Print & Apply">PERFECT LABELER™ Automated Print & Apply</option>
                        <option value="Fixed UHF RFID Dock Gate Portal">Fixed UHF RFID Dock Gate Portal</option>
                        <option value="AI Vision Inspection Optical Cameras">AI Vision Inspection Optical Cameras</option>
                        <option value="Zebra Industrial RFID Printer (ZT411 / ZT610)">Zebra Industrial RFID Printer (ZT411 / ZT610)</option>
                        <option value="Rugged Mobile Handheld Computer">Rugged Mobile Handheld Computer</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                        <Mail size={13} color="#fbbf24" />
                        <span>Corporate Email</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="maintenance@hyundai.co.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.35rem', display: 'block' }}>
                      Breakdown Symptoms / Error Codes
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="e.g. Error 402: Pneumatic cylinder tamp timeout on Station 4. Conveyor halted..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', resize: 'none' }}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={closeDemoModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        flex: 2,
                        padding: '0.85rem 1.25rem',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
                      }}
                    >
                      <Wrench size={17} />
                      <span>{isSubmitting ? 'Alerting Emergency Desk...' : 'Dispatch AMC Ticket ➔'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
