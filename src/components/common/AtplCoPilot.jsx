import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AtplRobotAvatar } from './AtplRobotAvatar';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Boxes, 
  Radio, 
  FileCheck, 
  Eye, 
  Cpu, 
  CheckCircle2, 
  Calculator, 
  Headphones, 
  Maximize2, 
  Minimize2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AtplCoPilot = () => {
  const { setCurrentView, openDemoModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I'm the **ATPL Smart Co-Pilot**, your industrial automation advisor. How can I help power your factory today?",
      quickReplies: [
        '💡 Find the right solution for my plant',
        '💰 Calculate factory ROI',
        '✨ Explore 3D Digital Twin',
        '📦 WMS vs Traceability comparison',
        '📞 Book a live demo'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Bot Response Logic
    setTimeout(() => {
      let botResponse = '';
      let quickReplies = [];
      let actionBtn = null;
      const lower = query.toLowerCase();

      if (lower.includes('roi') || lower.includes('cost') || lower.includes('calculate') || lower.includes('saving')) {
        botResponse = `### 📊 Real-Time Automation ROI & Impact\n\nBased on benchmark data across 500+ manufacturing plants:\n- **Dock-to-Stock Time:** Reduced by **65%**\n- **Inventory Accuracy:** Achieves **99.98%** with UHF RFID portals\n- **Labor Efficiency:** Up to **3.2x faster picking & packing**\n- **Typical Payback Period:** **6 to 14 months**.\n\nOur application engineers can generate a plant-specific Feasibility & Payback Audit for your facility.`;
        quickReplies = ['📞 Request Plant Feasibility Audit', '✨ Explore 3D Digital Twin', '📦 View WMS Specs'];
        actionBtn = {
          label: 'Request Plant Audit',
          onClick: () => openDemoModal({ solution: 'Plant ROI & Feasibility Study', notes: 'Lead requested custom payback and feasibility audit via AI Co-Pilot.' })
        };
      } else if (lower.includes('wms') || lower.includes('warehouse')) {
        botResponse = `### 📦 PERFECT WAREHOUSE™ (WMS)\n\nATPL's enterprise WMS is engineered for high-throughput discrete & process manufacturing:\n- **3D Bin Heatmap Slotting & FIFO/FEFO automation**\n- **Sub-second SAP / Oracle / Dynamics bi-directional ERP sync**\n- **Pallet & carton UHF RFID automated dock verification**.\n\nEliminate lost inventory and eliminate paperwork on your shop floor!`;
        quickReplies = ['🔍 View WMS Software Details', '✨ See WMS in 3D Factory Tour', '📞 Request WMS Demo'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      } else if (lower.includes('trace') || lower.includes('serialization') || lower.includes('dscsa')) {
        botResponse = `### 🛡️ PERFECT TRACE™ Serialization & Aggregation\n\nFull regulatory compliance for Pharma & Automotive:\n- **Hierarchical GS1 Aggregation:** Item ➔ Bundle ➔ Case ➔ Shipping Pallet\n- **Line Speed:** Up to **450 packs/minute**\n- **Compliance:** 100% US-FDA DSCSA, EU FMD & DGFT export certified\n- **Cryptographic anti-counterfeit QR generation**.`;
        quickReplies = ['📋 View Traceability Specs', '📞 Schedule Regulatory Consultation'];
        actionBtn = {
          label: 'Explore Trace Suite',
          onClick: () => setCurrentView('software')
        };
      } else if (lower.includes('vision') || lower.includes('camera') || lower.includes('defect') || lower.includes('ai')) {
        botResponse = `### 👁️ ATPL Vision AI™ & High-Speed Quality Inspection\n\n- **Sub-8ms Optical Defect AI** detecting scratches, burrs, and label misprints.\n- **ISO/IEC 15415 barcode print quality grading** (A to F grade).\n- **High-speed pneumatic reject gate actuation** up to 6.0 m/sec conveyor speed.`;
        quickReplies = ['✨ Launch 3D Vision Station Demo', '📞 Request Sample Feasibility Test'];
        actionBtn = {
          label: 'Launch 3D Vision Station',
          onClick: () => setCurrentView('factory-3d')
        };
      } else if (lower.includes('mdm') || lower.includes('mobile device') || lower.includes('device management') || lower.includes('handheld') || lower.includes('fleet')) {
        botResponse = `### 📱 ATPL PERFECT MDM™ (Mobile Device Management)\n\nComplete enterprise control over your industrial mobile devices:\n- **Zero-Touch Enrollment:** Rapid QR & NFC provisioning for 1,000+ handhelds & tablets\n- **Single-App Kiosk Lockdown:** Lock screens strictly into ATPL WMS or production apps\n- **Remote Control & OTA Updates:** Instant remote screen takeover for field technicians\n- **Battery & Drop Telemetry:** Predictive battery degradation and shock impact logging.`;
        quickReplies = ['📋 View MDM Specs', '📞 Request MDM Trial', '🛠️ Browse Rugged Handhelds'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      } else if (lower.includes('labeler') || lower.includes('print & apply') || lower.includes('print and apply') || lower.includes('applicator') || lower.includes('labeling')) {
        botResponse = `### 🏷️ PERFECT LABELER™ (Automated Print & Apply)\n\nHigh-speed inline robotic labeling for cartons, cases, and pallets:\n- **Synchronized Speed:** Applies GS1 serialized labels up to **120 cartons/min**\n- **Interchangeable Applicator Arms:** High-speed Tamp-Blow, Corner-Wrap, and Dual-Face Pallet arms\n- **Integrated 100% Verification:** In-line ISO/IEC 15415 2D DataMatrix barcode grade verifier\n- **Zero-Defect Reject Chute:** Automatic pneumatic ejection of misprinted or damaged labels.`;
        quickReplies = ['🛠️ View PERFECT LABELER Specs', '📞 Request Labeler Quote', '✨ Launch 3D Factory Tour'];
        actionBtn = {
          label: 'View Hardware Details',
          onClick: () => setCurrentView('hardware')
        };
      } else if (lower.includes('rfid') || lower.includes('hardware') || lower.includes('portal') || lower.includes('scanners')) {
        botResponse = `### 📡 Industrial Hardware Ecosystem\n\nATPL provides turnkey industrial hardware built for harsh environments:\n- **PERFECT LABELER™:** 120 packs/min synchronized print & apply system\n- **UHF RFID Antennas & Dock Portals:** Reads 1,200+ tags/sec\n- **Industrial Barcode Imagers & DPM Scanners:** 60 scans/sec\n- **Thermal Barcode Printers & TIJ Encoders:** 600 DPI micro-label precision\n- **IP68 Rugged Handhelds & Tablets:** Shift-long battery life.`;
        quickReplies = ['🛠️ Explore Hardware Catalog', '✨ View Hardware in 3D Action'];
        actionBtn = {
          label: 'Browse Hardware Catalog',
          onClick: () => setCurrentView('hardware')
        };
      } else if (lower.includes('demo') || lower.includes('contact') || lower.includes('book') || lower.includes('quote')) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        botResponse = `### 🎉 Let's Accelerate Your Automation Journey!\n\nOur senior automation architects can provide:\n1. **Free Plant Automation Feasibility Audit**\n2. **Customized 3D Digital Twin Simulation of your floor**\n3. **Detailed Bill of Materials (BOM) & ROI Proposal**.\n\nClick below to reserve your priority discovery slot!`;
        quickReplies = ['📞 Request Priority Demo', '📍 View ATPL Regional Offices'];
        actionBtn = {
          label: 'Request Free Demo',
          onClick: () => openDemoModal('General Inquiry')
        };
      } else if (lower.includes('3d') || lower.includes('twin') || lower.includes('tour')) {
        botResponse = `### ✨ 3D Digital Twin Factory Simulator\n\nExperience our real-time interactive 3D factory powered by WebGL & Three.js:\n- Inspect **7 specialized industrial stations** (Inbound RFID, Robotic Kitting, Vision AI, TIJ Serialization, AGV Fleet, Auto-Palletizer, Dispatch Bay).\n- Switch between **Photorealistic 3D Mode** and **Architectural Blueprint CAD Mode**.\n- Live telemetry HUD with sensor overrides.`;
        quickReplies = ['🚀 Launch 3D Factory Tour Now', '📋 View Stations Overview'];
        actionBtn = {
          label: 'Launch 3D Factory Twin',
          onClick: () => setCurrentView('factory-3d')
        };
      } else {
        botResponse = `I can help you explore **ATPL Group's** end-to-end industrial automation ecosystem:\n\n- **ATPL One™ Platform:** Unified WMS, Traceability, Vision AI & ShopFloor OS\n- **Industrial Hardware:** Fixed UHF RFID Gates, Rugged Scanners & Printers\n- **3D Digital Twin Simulator:** Interactive factory simulation\n- **Turnkey Services:** 24/7 SLA, Retrofitting & Custom Integration.\n\nWhat would you like to explore next?`;
        quickReplies = [
          '💡 Recommend solution for my plant',
          '💰 Calculate factory ROI',
          '✨ Launch 3D Factory Tour',
          '📞 Book a consultation'
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          quickReplies,
          actionBtn
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            right: '1.75rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'linear-gradient(135deg, #0071ba 0%, #005a96 100%)',
            color: '#ffffff',
            border: '1.5px solid rgba(232, 88, 116, 0.4)',
            borderRadius: '999px',
            padding: '0.8rem 1.4rem',
            boxShadow: '0 10px 25px -5px rgba(232, 88, 116, 0.35), 0 8px 15px -6px rgba(0, 113, 186, 0.4)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.92rem',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(232, 88, 116, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(232, 88, 116, 0.35), 0 8px 15px -6px rgba(0, 113, 186, 0.4)';
          }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AtplRobotAvatar size={26} glow={false} />
            <span style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#E85874',
              border: '2px solid #0071ba',
              animation: 'pulseCoralDot 2s infinite'
            }} />
          </div>
          <span>ATPL Co-Pilot</span>
          <span style={{
            fontSize: '0.7rem',
            backgroundColor: '#E85874',
            color: '#ffffff',
            fontWeight: 800,
            padding: '0.15rem 0.45rem',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 6px rgba(232, 88, 116, 0.4)'
          }}>AI</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1001,
          width: isExpanded ? 'min(640px, 92vw)' : 'min(390px, 92vw)',
          height: isExpanded ? 'min(720px, 85vh)' : 'min(560px, 80vh)',
          backgroundColor: '#ffffff',
          borderRadius: '1.25rem',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'fadeInUp 0.25s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0071ba 0%, #005a96 100%)',
            padding: '1rem 1.25rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <AtplRobotAvatar size={30} glow={false} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  ATPL Co-Pilot
                  <span style={{
                    fontSize: '0.65rem',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                    fontWeight: 600
                  }}>Online</span>
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Intelligent Factory Assistant</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '0.35rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={isExpanded ? 'Minimize size' : 'Expand size'}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '0.35rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Context Banner */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>⚡ Powered by ATPL Knowledge Base & Industry 4.0 Telemetry</span>
            <button
              onClick={() => {
                setMessages([
                  {
                    id: Date.now(),
                    sender: 'bot',
                    text: "Conversation reset. How can I assist your plant today?",
                    quickReplies: [
                      '💡 Find the right solution for my plant',
                      '💰 Calculate factory ROI',
                      '✨ Explore 3D Digital Twin',
                      '📞 Book a live demo'
                    ]
                  }
                ]);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.72rem'
              }}
              title="Reset chat"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            backgroundColor: '#f8fafc'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '100%'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  backgroundColor: msg.sender === 'user' ? '#0071ba' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                  borderRadius: msg.sender === 'user' ? '1rem 1rem 0.2rem 1rem' : '1rem 1rem 1rem 0.2rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(0, 113, 186, 0.25)' : '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                  border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={idx} style={{ margin: '0 0 0.5rem 0', color: msg.sender === 'user' ? '#ffffff' : '#0071ba', fontSize: '0.95rem' }}>{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('- **')) {
                      const parts = line.replace('- ', '').split('**');
                      return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem', margin: '0.2rem 0' }}>
                          <span style={{ color: msg.sender === 'user' ? '#ffffff' : '#0071ba' }}>•</span>
                          <span><strong>{parts[1]}</strong>{parts.slice(2).join('')}</span>
                        </div>
                      );
                    }
                    return <p key={idx} style={{ margin: '0 0 0.4rem 0' }}>{line}</p>;
                  })}

                  {msg.actionBtn && (
                    <div style={{ marginTop: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.6rem' }}>
                      <button
                        onClick={msg.actionBtn.onClick}
                        style={{
                          backgroundColor: '#0071ba',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          boxShadow: '0 2px 4px rgba(0,113,186,0.3)'
                        }}
                      >
                        <span>{msg.actionBtn.label}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginTop: '0.5rem',
                    maxWidth: '90%'
                  }}>
                    {msg.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(qr)}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          borderRadius: '999px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0071ba';
                          e.currentTarget.style.color = '#0071ba';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.color = '#334155';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }}
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.75rem', backgroundColor: '#ffffff', borderRadius: '1rem', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0071ba', animation: 'pulse 1s infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0071ba', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0071ba', animation: 'pulse 1s infinite 0.4s' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.25rem' }}>Analyzing query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0'
          }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <input
                type="text"
                placeholder="Ask anything about ATPL automation, RFID, WMS..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  color: '#1e293b'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0071ba'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  backgroundColor: input.trim() ? '#0071ba' : '#94a3b8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.6rem',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
