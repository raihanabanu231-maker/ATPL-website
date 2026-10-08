import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, ArrowRight } from 'lucide-react';
import { ATPL_STATIONS, ATPL_COMPANY_INFO } from '../../data/stations';

export const ArchieChat = ({ onSelectStation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'archie',
      text: 'Hey buddy! 👋 I am Archie AI, your smart factory digital twin guide. Ask me anything about our 12 IoT stations, Vision AI, Perfect Trace, or ATPL solutions!'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (userText) => {
    const text = userText || inputVal;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInputVal('');

    // Generate intelligent canned response from stations & pitch deck
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('trace') || lower.includes('01')) {
        reply = `🔍 **Perfect Trace™ (Station 01)**: Delivers 4-tier GS1 parent-child serialization (Item -> Bundle -> Case -> Pallet). A tier-1 automotive client reduced resource-allocation time from 2 hours to 2 minutes with automated SAP integration!`;
      } else if (lower.includes('audit') || lower.includes('02')) {
        reply = `📋 **Perfect Audit™ (Station 02)**: Paperless ISO internal audit platform. Our FMCG dairy client cut audit prep time by 70% and eliminated paper records completely across 8 plants.`;
      } else if (lower.includes('store') || lower.includes('warehouse') || lower.includes('wms') || lower.includes('03')) {
        reply = `📦 **Perfect Store™ / WMS (Station 03)**: Autonomous warehouse management with 3D heatmap bin allocation and RFID tracking. A rubber manufacturer client improved dispatch accuracy by 50%!`;
      } else if (lower.includes('vision') || lower.includes('defect') || lower.includes('06')) {
        reply = `👁️ **Perfect AI Vision System (Station 06)**: Runs sub-8ms deep learning defect detection on NVIDIA edge GPUs. Achieves 6.2ms inference speed with automated PASS/FAIL sorting for automotive die-castings!`;
      } else if (lower.includes('rfid') || lower.includes('portal') || lower.includes('04')) {
        reply = `📡 **RFID Portals (Station 04)**: High-throughput fixed UHF dock gateways that scan up to 1,400+ tags/second with directional transit sensing.`;
      } else if (lower.includes('drone') || lower.includes('08')) {
        reply = `🛸 **Inspection Drones (Station 08)**: Autonomous indoor optical SLAM drones designed to audit 40ft high-bay racks at 120 pallets/minute without scissor lifts.`;
      } else if (lower.includes('printer') || lower.includes('label') || lower.includes('10')) {
        reply = `🖨️ **Perfect Labeler (Station 10)**: Cloud-native label operations unifying 200+ Zebra, Honeywell, and TSC industrial printers with live ERP integration.`;
      } else if (lower.includes('mdm') || lower.includes('device') || lower.includes('11')) {
        reply = `💻 **Perfect Edge MDM (Station 11)**: Manages 5,000+ rugged handhelds with remote screen control, zero-touch enrollment, and push-to-talk.`;
      } else if (lower.includes('company') || lower.includes('about') || lower.includes('atpl') || lower.includes('turnover') || lower.includes('revenue')) {
        reply = `🏢 **ATPL Group**: Founded by professionals with 35+ years in AIDC & IT. ISO 9001:2015 and Startup India certified, Honeywell Gold Partner, serving 250+ enterprise clients nationwide with projected FY27 revenue of ₹8.20 Cr!`;
      } else {
        reply = `✨ I understand you are interested in industrial digital transformation! ATPL offers a complete integrated hardware-software platform connecting IIoT edge devices with SAP & Oracle ERPs. Click on any station (01–12) to see a live 3D walkthrough!`;
      }

      setMessages(prev => [...prev, { sender: 'archie', text: reply }]);
    }, 450);
  };

  return (
    <div style={{ position: 'fixed', bottom: '85px', right: '1.25rem', zIndex: 60, pointerEvents: 'auto' }}>
      
      {/* Floating Chat Bubble Launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Archie AI Chat"
          style={{
            background: 'linear-gradient(135deg, #0070C0, #18E0FF)',
            border: '2px solid #FFC93C',
            borderRadius: '999px',
            padding: '0.55rem 1.15rem',
            color: '#02101C',
            fontWeight: 800,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 8px 25px rgba(24, 224, 255, 0.5), 0 0 15px rgba(255, 201, 60, 0.4)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.1rem' }}>🤖</span>
          <span>Hey buddy, need any help? 👋</span>
        </button>
      )}

      {/* Expanded Archie AI Chat Panel */}
      {isOpen && (
        <div
          style={{
            width: 'min(380px, calc(100vw - 2.5rem))',
            height: '480px',
            background: 'rgba(2, 16, 28, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid #18E0FF',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(24, 224, 255, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0070C0, #005299)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(24, 224, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#02101C', border: '1.5px solid #FFC93C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>
                🤖
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF' }}>Archie AI Assistant</div>
                <div style={{ fontSize: '0.66rem', color: '#18E0FF', fontFamily: 'monospace' }}>Powered by PerfectSolvEdge</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Questions Ticker */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', padding: '0.5rem 0.75rem', background: 'rgba(0, 112, 192, 0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['Perfect Trace', 'Vision AI', 'WMS Benefits', 'About ATPL'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(`Tell me about ${chip}`)}
                style={{
                  background: 'rgba(24, 224, 255, 0.12)',
                  border: '1px solid rgba(24, 224, 255, 0.3)',
                  color: '#18E0FF',
                  borderRadius: '12px',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? '#0070C0' : 'rgba(10, 24, 46, 0.85)',
                  border: msg.sender === 'user' ? '1px solid #18E0FF' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  padding: '0.55rem 0.75rem',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  lineHeight: '1.4'
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: '0.65rem 0.75rem', background: 'rgba(2, 12, 22, 0.9)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.4rem' }}
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Archie AI about any station..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(24, 224, 255, 0.3)',
                borderRadius: '8px',
                padding: '0.45rem 0.65rem',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#0070C0',
                border: '1px solid #18E0FF',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
