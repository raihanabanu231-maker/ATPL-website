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

export const ATPL_MASTER_GROK_PROMPT = `
You are Archie AI, the official intelligent industrial robot guide and smart automation advisor representing Archery Technocrats Private Limited (ATPL Group).
Your role is to answer client and prospect questions accurately using the official knowledge base of the ATPL website.

### Company Profile:
- Company Name: Archery Technocrats Private Limited (ATPL Group)
- Robot Guide & Mascot Name: Archie AI
- Slogan: "Target Perfection" | "Targeting Zero-Defect Operations. Powering Autonomous Manufacturing."
- Heritage: 35+ years of combined Industry 4.0 automation, IIoT, and enterprise AIDC leadership.
- Leadership:
  • Amarnath Paramasivam – Founder & Managing Director (Mechanical Engineer & MBA, 15+ years domain leadership).
  • Anusuya Paramasivam – Director (ME VLSI Design, Corporate Governance & Operations).
- Accreditations: ISO 9001:2015 (BMQR), DPIIT (#startupindia Section 80-IAC), Ministry of MSME & Commerce Govt. of India, Authorized GS1 Global Serialization Partner.

### Official Direct Contact Details & Helplines:
- Enterprise Sales Helpline: +91 63808 59963 / sales@atplgroup.com
- Software & WMS Support: +91 93421 73484 / softwaresupport@atplgroup.com
- Hardware & Field AMC Support: +91 72001 57626 / support@atplgroup.com
- Toll-Free Nationwide: 1800-120-774777
- Corporate Landline: 044 3553 7618
- WhatsApp Chat: +91 63808 59963
- Chennai Sales HQ: TIDEL Park, G11 Ground Floor, No.4 Canal Bank Rd, Taramani, Chennai - 600113.
- Registered Office: 275/11, Gandhi Road, West Tambaram, Chennai - 600045.
- R&D Innovation Labs: Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015.
- Industrial Hubs: Hosur & Bangalore Corridor (6 regional branches).

### Proprietary Software Suite (ATPL One™ Platform):
1. PERFECT STORE™ / WMS: 3D bin slotting, automated FIFO/FEFO, sub-second SAP S/4HANA & Oracle ERP sync, dock door RFID verification.
2. PERFECT TRACE™: GS1 unit-to-pallet aggregation (Item -> Bundle -> Case -> Pallet), 100% US-FDA DSCSA & DGFT compliant (up to 450 packs/min).
3. PERFECT AI VISION SYSTEM™: Sub-8ms neural network surface defect classification, ISO/IEC 15415 barcode grading, high-speed pneumatic reject gates.
4. PERFECTEDGE MDM™: Fleet management for 1,500+ rugged handhelds, zero-touch QR staging, kiosk lockdown, remote screen takeover.
5. PERFECT PMS™: Shopfloor OEE dashboards, cycle telemetry, Pareto downtime analysis, automated Andon alerts.
6. PERFECT AUDIT™: 100% paperless ISO internal audit platform, CAPA workflows, 21 CFR Part 11 electronic signatures.
7. PERFECT LABELER™: 120 packs/min synchronized automated Print & Apply with in-line verifiers.

### Hardware Catalog & Alliances:
- Honeywell Gold Partner, TSC Rising Star Partner, Zebra, Impinj, Datalogic.
- Fixed UHF RFID Gate Portals (1,200+ tags/sec), 300°C High-Temp Ceramic RFID tags.
- Ultra-Rugged 1D/2D & DPM Barcode Scanners (laser-etched/dot-peen on curved metals).
- Industrial Thermal Barcode Printers (600 DPI & in-line ODV verifiers).
- Autonomous Indoor SLAM Inventory Drones for 15m high-bay racking.

### 250+ Enterprise Clients:
- Automotive: Ola Electric FutureFactory, Bosch, Ashok Leyland, LS Automotive, Tenneco, Rane NSK.
- Pharma: Caplin Point Laboratories.
- Metals & Heavy Industry: JSW Steel, L&T, Vizag Steel, ABB, BEL.
- FMCG: HUL, Hatsun Dairy, Titan, Apollo Tyres, Dixon Technologies (1,500+ MDM fleet).

### Instructions:
1. Always format responses with clear markdown, bullet points, and bold text.
2. When asked for contact, phone, sales number, or support number, always provide all the direct numbers (+91 63808 59963, +91 93421 73484, +91 72001 57626, Toll-Free 1800-120-774777, WhatsApp +91 63808 59963).
3. If recommending a solution for a plant, explain the business value and suggest booking a plant feasibility audit or live demo.
`;

export const AtplCoPilot = () => {
  const { setCurrentView, openDemoModal, coPilotOpen, setCoPilotOpen, siteSettings } = useApp();
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = coPilotOpen !== undefined ? coPilotOpen : localIsOpen;
  const setIsOpen = setCoPilotOpen || setLocalIsOpen;
  const [isExpanded, setIsExpanded] = useState(false);
  const [speechBubbleDismissed, setSpeechBubbleDismissed] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I'm **Archie AI**, your official ATPL smart factory robot guide & automation advisor. How can I help power your factory today?",
      quickReplies: [
        '💡 Find the right solution for my plant',
        '💰 Calculate factory ROI',
        '✨ Explore 3D Digital Twin',
        '📞 Sales & Support Numbers',
        '📦 WMS vs Traceability comparison'
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

  // Live AI API Caller (Compatible with Free Groq, Google Gemini, OpenRouter, xAI Grok, OpenAI)
  const callGrokApi = async (userPrompt, chatHistory, apiKey, model, endpoint) => {
    let apiEndpoint = endpoint || 'https://api.groq.com/openai/v1/chat/completions';
    let apiModel = model || 'openai/gpt-oss-120b';

    const trimmedKey = (apiKey || '').trim();

    // Smart auto-detection based on API key format
    if (trimmedKey.startsWith('gsk_')) {
      // Free Groq Cloud Key
      apiEndpoint = endpoint || 'https://api.groq.com/openai/v1/chat/completions';
      apiModel = (model && model !== 'grok-beta' && !model.includes('llama-3.1-8b') && !model.includes('70b-versatile')) 
        ? model 
        : 'openai/gpt-oss-120b';
    } else if (trimmedKey.startsWith('AIza')) {
      // Free Google Gemini Key (via Google's OpenAI-compatible endpoint)
      apiEndpoint = endpoint || 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      apiModel = model && model !== 'grok-beta' ? model : 'gemini-1.5-flash';
    } else if (trimmedKey.startsWith('sk-or-')) {
      // Free OpenRouter Key
      apiEndpoint = endpoint || 'https://openrouter.ai/api/v1/chat/completions';
      apiModel = model && model !== 'grok-beta' ? model : 'meta-llama/llama-3.2-3b-instruct:free';
    } else if (trimmedKey.startsWith('xai-')) {
      // xAI Grok
      apiEndpoint = endpoint || 'https://api.x.ai/v1/chat/completions';
      apiModel = model || 'grok-beta';
    }

    const historyMessages = chatHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    const payload = {
      model: apiModel,
      messages: [
        { role: 'system', content: ATPL_MASTER_GROK_PROMPT },
        ...historyMessages,
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 800
    };

    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trimmedKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`AI API error (${res.status}): ${errText || res.statusText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const apiKey = siteSettings?.grokApiKey || localStorage.getItem('atpl_grok_api_key');
    const apiModel = siteSettings?.grokModel || localStorage.getItem('atpl_grok_model') || 'grok-beta';
    const apiEndpoint = siteSettings?.grokApiEndpoint || localStorage.getItem('atpl_grok_api_endpoint');

    // If Grok API key is configured, query Grok AI in real time!
    if (apiKey && apiKey.trim().length > 5) {
      try {
        const grokAnswer = await callGrokApi(query, messages, apiKey, apiModel, apiEndpoint);
        if (grokAnswer && grokAnswer.trim().length > 0) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: grokAnswer,
              quickReplies: [
                '💡 Recommend solution for my plant',
                '📞 Sales & Support Numbers',
                '💰 Calculate factory ROI',
                '✨ Launch 3D Factory Tour'
              ],
              actionBtn: {
                label: 'Book Live Demo / Consultation',
                onClick: () => openDemoModal('Grok AI Inquiry')
              }
            }
          ]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn('Grok AI API call fallback to local neural engine:', err);
      }
    }

    // Local High-Performance Typo-Tolerant & Fuzzy Intent Classifier Engine
    setTimeout(() => {
      let botResponse = '';
      let quickReplies = [];
      let actionBtn = null;
      const raw = query.toLowerCase().trim();

      // Levenshtein edit distance for resilient typo matching
      const getEditDistance = (s1, s2) => {
        const a = s1.toLowerCase();
        const b = s2.toLowerCase();
        const costs = [];
        for (let i = 0; i <= a.length; i++) {
          let lastValue = i;
          for (let j = 0; j <= b.length; j++) {
            if (i === 0) costs[j] = j;
            else {
              if (j > 0) {
                let newValue = costs[j - 1];
                if (a.charAt(i - 1) !== b.charAt(j - 1)) {
                  newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
            }
          }
          if (i > 0) costs[b.length] = lastValue;
        }
        return costs[b.length];
      };

      const wordMatches = (userToken, targetWord) => {
        const u = userToken.toLowerCase();
        const t = targetWord.toLowerCase();
        if (u === t) return true;
        if (u.length >= 3 && t.startsWith(u)) return true;
        if (u.length >= 4 && (u.includes(t) || t.includes(u))) return true;
        const dist = getEditDistance(u, t);
        if (t.length <= 4) return dist <= 1;
        return dist <= 2;
      };

      const tokens = raw.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
      const hasToken = (...targetWords) => tokens.some(tok => targetWords.some(tw => wordMatches(tok, tw)));
      const hasPhrase = (...phrases) => phrases.some(p => raw.includes(p.toLowerCase()));

      // 1. Direct Sales & Support Numbers / Contact Intent (Handles "give salws number", "salwes supoport numer", "sales phone", "call", "salws", etc.)
      const isSalesQuery = hasToken('sales', 'salesman', 'salws', 'saels', 'sles', 'sale', 'sell', 'buy');
      const isSupportQuery = hasToken('support', 'suport', 'supoport', 'supprt', 'service', 'helpdesk', 'help', 'assist');
      const isContactMethod = hasToken('number', 'numer', 'num', 'no', 'phone', 'fone', 'phon', 'call', 'dial', 'contact', 'kontact', 'whatsapp', 'email', 'mobile', 'tel', 'landline', 'tollfree', 'helpline', 'reach', 'connect');
      const isDirectContactAsk = hasToken('give', 'tell', 'need', 'want', 'what', 'how', 'get', 'share', 'show', 'pls', 'please', 'can') && (isSalesQuery || isSupportQuery || isContactMethod);

      if (
        (isSalesQuery && (isContactMethod || isDirectContactAsk || tokens.length <= 4)) || 
        (isSupportQuery && (isContactMethod || isDirectContactAsk || tokens.length <= 4)) || 
        hasToken('tollfree', 'whatsapp', 'landline', 'helpline') || 
        (isContactMethod && tokens.length <= 5) || 
        hasPhrase('sales number', 'support number', 'contact number', 'phone number', 'salws number', 'salwes number', 'give number', 'call us', 'contact us', 'reach us', 'sales contact', 'support contact')
      ) {
        botResponse = `### 📞 Official ATPL Helplines & Direct Contacts\n\nHere are the verified direct phone numbers and contact channels for **ATPL Group**:\n\n- 💼 **Enterprise Sales & Solution Consulting:**\n  • Direct Helpline: **+91 63808 59963**\n  • Email: **sales@atplgroup.com**\n\n- 💻 **Software, WMS & Cloud Support:**\n  • Direct Helpline: **+91 93421 73484**\n  • Email: **softwaresupport@atplgroup.com**\n\n- 🛠️ **Hardware, RFID & Field AMC Service:**\n  • Direct Helpline: **+91 72001 57626**\n  • Email: **support@atplgroup.com**\n\n- 📞 **Toll-Free Nationwide:** **1800-120-774777**\n- 🏢 **Chennai HQ Landline:** **044 3553 7618**\n- 💬 **Direct WhatsApp:** **+91 63808 59963**\n\n**Chennai HQ Sales & Demo Center:**\nTIDEL Park, G11 Ground Floor, No.4 Canal Bank Rd, Taramani, Chennai, Tamil Nadu - 600113.`;
        quickReplies = [
          '💬 WhatsApp Support (+91 63808 59963)',
          '📞 Book a TIDEL Park Demo',
          '✉️ Email Sales Team',
          '✨ Explore 3D Factory Tour'
        ];
        actionBtn = {
          label: 'Contact Us / Book Consultation',
          onClick: () => setCurrentView('contact')
        };
      }
      // 2. Solution Recommendation & Plant Finder
      else if (hasToken('recommend', 'recomnd', 'solution', 'solutn', 'suggest', 'which', 'choose', 'guidance') || (hasToken('plant', 'factory') && hasToken('help', 'solution', 'for', 'my', 'recommend')) || hasPhrase('recommend solution', 'solution for my plant', 'find right solution', 'help my plant')) {
        botResponse = `### 💡 ATPL Intelligent Solution Recommender\n\nTo tailor the exact Industry 4.0 automation architecture for your facility, select your primary operational priority:\n\n1. **📦 Warehouse Bottlenecks & Missing Inventory?**\n   ➔ **PERFECT STORE™ (WMS) + UHF RFID Gates** for 99.98% inventory accuracy & native SAP/Oracle sync.\n2. **🛡️ Regulatory Serialization & DGFT/DSCSA Compliance?**\n   ➔ **PERFECT TRACE™** for high-speed parent-child aggregation (up to 450 packs/min).\n3. **👁️ Surface Defects, Scratches or Misprinted Codes?**\n   ➔ **PERFECT AI VISION™** for sub-8ms optical defect classification & ISO 15415 barcode grading.\n4. **⚙️ Machine Downtime & Line Micro-Stoppages?**\n   ➔ **PERFECT PMS™** for real-time Shopfloor OEE, cycle telemetry & automated Andon alerts.\n5. **📱 Managing 500+ Rugged Handheld Scanners?**\n   ➔ **PERFECTEDGE MDM™** for zero-touch staging, kiosk lockdown & remote screen takeover.\n6. **📋 Tedious Paper Checklists & Audit Non-Conformance?**\n   ➔ **PERFECT AUDIT™** for 100% paperless digital inspections & 21 CFR Part 11 e-signatures.\n7. **🏷️ Manual Carton Labeling Bottlenecks?**\n   ➔ **PERFECT LABELER™** for 120 packs/min automated Print & Apply with in-line verifiers.`;
        quickReplies = [
          '📦 Warehouse & WMS Specs',
          '🛡️ Pharma & Serialization',
          '👁️ Vision AI Defect QC',
          '⚙️ Shopfloor OEE & PMS',
          '📱 Handheld MDM Fleet',
          '📞 Request Plant Feasibility Audit'
        ];
        actionBtn = {
          label: 'Request Plant Feasibility Audit',
          onClick: () => openDemoModal({ solution: 'Plant Feasibility & Solution Architecture', notes: 'Lead requested solution recommendation for manufacturing plant.' })
        };
      }
      // 3. WMS vs Traceability Comparison
      else if (hasPhrase('wms vs trace', 'wms vs traceability', 'difference between wms and trace', 'compare wms and trace', 'comparison') || (hasToken('wms', 'warehouse') && hasToken('trace', 'serialization') && hasToken('vs', 'compare', 'difference'))) {
        botResponse = `### ⚖️ PERFECT STORE™ (WMS) vs PERFECT TRACE™ (Serialization)\n\n| Capability | PERFECT STORE™ (WMS) | PERFECT TRACE™ (Serialization) |\n| :--- | :--- | :--- |\n| **Core Goal** | Warehouse Inventory, 3D Bin Slotting & FIFO/FEFO | Regulatory Serialization & Parent-Child Aggregation |\n| **Tracking Level** | Pallet / Carton / Bin Locations | Unit Item ➔ Bundle ➔ Shipper Case ➔ Pallet |\n| **ERP Integration** | Sub-second SAP S/4HANA / Oracle BAPIs | DGFT Export Portal & US-FDA DSCSA Cloud |\n| **Speed / Throughput** | Real-time warehouse movement | Up to **450 packs/minute** inline |\n| **Key Hardware** | UHF RFID Portals & Rugged Handhelds | In-line TIJ Encoders & ISO Barcode Verifiers |\n\n*Both systems integrate seamlessly under the unified **ATPL One™ Platform**.*`;
        quickReplies = ['📦 View WMS Details', '🛡️ View Trace Details', '📞 Schedule Technical Demo'];
        actionBtn = {
          label: 'Explore Software Suite',
          onClick: () => setCurrentView('software')
        };
      }
      // 4. Company Profile, History, Mission & Leadership
      else if (hasToken('company', 'about', 'profile', 'history', 'founder', 'management', 'leadership', 'amarnath', 'anusuya', 'md', 'director', 'slogan', 'vision', 'mission') || hasPhrase('who is atpl', 'about atpl', 'who are you', 'tell me about atpl')) {
        botResponse = `### 🏢 Archery Technocrats Private Limited (ATPL Group)\n\n**Slogan:** *"Target Perfection"*\n**Legacy:** 35+ years of combined Industry 4.0 automation, IIoT, and enterprise AIDC leadership.\n\n- **Core Mission:** Powering zero-defect manufacturing and autonomous supply chains with proprietary software, vision AI, and turnkey hardware.\n- **Executive Leadership:**\n  • **Amarnath Paramasivam** – Founder & Managing Director (Mechanical Engineer & MBA, 15+ yrs domain leadership)\n  • **Anusuya Paramasivam** – Director (ME VLSI Design, Corporate Operations & Governance)\n- **Certifications & Accreditations:**\n  • **ISO 9001:2015 Quality Management Certified** (BMQR)\n  • **DPIIT Certified** (#startupindia Section 80-IAC)\n  • Recognized by Ministry of MSME & Ministry of Commerce, Govt. of India\n  • Authorized **GS1 Global Serialization Alliance Partner**.`;
        quickReplies = ['📍 View Office Branches', '🏆 View Awards & OEM Alliances', '💼 View Enterprise Client Roster', '📞 Contact Leadership Team'];
        actionBtn = {
          label: 'Explore About ATPL',
          onClick: () => setCurrentView('about')
        };
      }
      // 5. Office Locations, Branches & TIDEL Park
      else if (hasToken('office', 'branch', 'address', 'location', 'tidel', 'tambaram', 'chennai', 'madurai', 'hosur', 'bangalore', 'headquarters') || hasPhrase('where are you', 'where is office', 'office address')) {
        botResponse = `### 📍 ATPL Regional Offices & Helplines\n\n- **Corporate Sales & Demo Center (Chennai HQ):**\n  TIDEL Park, G11 Ground Floor, No.4 Canal Bank Rd, Taramani, Chennai - 600113\n- **Registered Office:** 275/11, Gandhi Road, West Tambaram, Chennai - 600045\n- **R&D Innovation Labs:** Technology Business Incubator (TCE-TBI), Thiagarajar College of Engineering, Madurai - 625015\n- **Industrial Support Hub:** Hosur & Bangalore Corridor (6 regional branches nationwide).\n\n**Direct Helplines:**\n- 📞 Toll-Free: **1800-120-774777** | Sales: **+91 63808 59963**\n- 💻 Software: **+91 93421 73484** | Service: **+91 72001 57626**`;
        quickReplies = ['📞 Book a Demo at TIDEL Park', '💬 WhatsApp Support (+91 63808 59963)', '✨ Explore 3D Factory Tour'];
        actionBtn = {
          label: 'Get in Touch',
          onClick: () => setCurrentView('contact')
        };
      }
      // 6. Enterprise Clients & Case Studies
      else if (hasToken('client', 'customer', 'clients', 'customers', 'roster', 'ola', 'bosch', 'jsw', 'leyland', 'caplin', 'titan', 'apollo', 'dixon', 'hatsun', 'hul') || hasPhrase('case study', 'case studies', 'who uses', 'client list')) {
        botResponse = `### 🏆 Trusted by 250+ Tier-1 Enterprises\n\nATPL powers mission-critical operations across leading industrial conglomerates:\n\n- **Automotive & EV:** Ola Electric FutureFactory (battery pack serialization), Bosch, Ashok Leyland, LS Automotive, Tenneco, Rane NSK, Magna Cosma, PSA Avtec, TVS Sensing.\n- **Pharmaceutical & Healthcare:** Caplin Point Laboratories (US-FDA DSCSA & DGFT export serialization).\n- **Heavy Metals & Steel:** JSW Steel (Hot-rolled coil yard RFID tracking with 300°C ceramic tags), L&T, Vizag Steel, ABB, BEL.\n- **FMCG & Discrete Manufacturing:** Hindustan Unilever (HUL), Hatsun Dairy, Titan, Apollo Tyres, Dixon Technologies (1,500+ handheld MDM fleet).\n\n**Proven Impact Metrics:**\n- *Automotive:* Resource allocation cycle reduced from **2 hours to 2 minutes**.\n- *Logistics:* **+50% dispatch verification accuracy** with inline verifiers.\n- *Compliance:* **-70% audit prep time** with Perfect Audit™ SaaS.`;
        quickReplies = ['📋 Request Customer Case Studies', '💡 Recommend solution for my plant', '📞 Schedule Plant Feasibility Call'];
        actionBtn = {
          label: 'Request Case Studies',
          onClick: () => openDemoModal({ solution: 'Enterprise Case Studies', notes: 'Inquiry for customer case studies and benchmark ROI reports.' })
        };
      }
      // 7. Pharma & Healthcare Requirements
      else if (hasToken('pharma', 'pharmaceutical', 'drug', 'fda', 'dscsa', 'dgft', 'cfr', 'serialization', 'aggregation')) {
        botResponse = `### 💊 Pharma Regulatory & Serialization Requirements\n\nFor pharmaceutical manufacturers and contract packagers, ATPL provides end-to-end compliance suites:\n\n1. **PERFECT TRACE™:**\n   - Parent-Child aggregation (Vial ➔ Carton ➔ Shipper Case ➔ Pallet)\n   - 100% US-FDA DSCSA, EU-FMD & DGFT Export mandate compliant\n   - High-speed inline serialization up to **450 packs/min**\n2. **PERFECT AUDIT™:**\n   - 21 CFR Part 11 compliant electronic signatures and audit trails\n   - Photo evidence defect logging and automated CAPA workflows\n3. **PERFECT SOLVEDGE™:**\n   - AI regulatory assistant verifying GS1 Digital Link DataMatrix formats.`;
        quickReplies = ['📋 View Pharma Traceability Specs', '📞 Schedule Compliance Audit', '✨ Launch 3D Factory Tour'];
        actionBtn = {
          label: 'Explore Pharma Suite',
          onClick: () => setCurrentView('software')
        };
      }
      // 8. Automotive & EV Manufacturing
      else if (hasToken('automotive', 'auto', 'oem', 'ev', 'battery', 'iatf', 'dpm', 'engine', 'transmission', 'pokayoke', 'laser')) {
        botResponse = `### 🚗 Automotive & EV Manufacturing Solutions\n\nATPL delivers zero-defect Pokayoke automation for Tier-1 automotive lines:\n\n- **Laser DPM & Dot-Peen Scanning:** Ultra-rugged 2D imagers decoding low-contrast codes on curved metal engine blocks, transmission cases, and EV battery cells.\n- **Sub-8ms Optical Vision AI:** Microscopic defect inspection classifying scratches, burrs, and pin misalignment before final sub-assembly.\n- **PERFECT STORE™ (WMS):** Real-time Kanban kit tracking with bi-directional SAP S/4HANA & PLC middleware.\n- **6-Axis Articulated Robotic Transfer:** Synchronized welding and conveyor handoffs with 0.05mm precision.`;
        quickReplies = ['🛠️ Explore Automotive DPM Scanners', '📦 View WMS Middleware', '📞 Book Automotive Discovery'];
        actionBtn = {
          label: 'Explore Hardware Catalog',
          onClick: () => setCurrentView('hardware')
        };
      }
      // 9. Heavy Metals & Steel Yard Automation
      else if (hasToken('steel', 'metal', 'metals', 'yard', 'coil', 'foundry', 'billet', 'furnace', 'crane')) {
        botResponse = `### 🏗️ Heavy Metals & Steel Yard Automation\n\nEngineered for extreme industrial environments (dust, moisture, and high heat):\n\n- **Ceramic High-Temperature RFID Tags:** Survives up to **300°C** for hot-rolled steel coils, billets, and foundry dies.\n- **Fixed UHF Gate Portals:** Multi-antenna arrays with directional dock sensing reading 1,200+ tags/sec at truck weighbridges.\n- **Crane & Forklift Mounted Readers:** Real-time 3D yard slotting without manual yard scanning.`;
        quickReplies = ['📡 View UHF RFID Portal Specs', '📞 Request Steel Yard Audit', '✨ Launch 3D Factory Tour'];
        actionBtn = {
          label: 'View Hardware Details',
          onClick: () => setCurrentView('hardware')
        };
      }
      // 10. Warehouse Management (WMS) & Store
      else if (hasToken('wms', 'warehouse', 'store', 'inventory', 'slotting', 'picking', 'putaway', 'fifo', 'fefo', 'bin')) {
        botResponse = `### 📦 PERFECT STORE™ / PERFECT WAREHOUSE™ (WMS)\n\nATPL's enterprise WMS is engineered for high-throughput discrete & process manufacturing:\n\n- **3D Bin Heatmap Slotting & FIFO/FEFO automation**\n- **Sub-second SAP / Oracle / Dynamics bi-directional ERP sync**\n- **Pallet & carton UHF RFID automated dock verification**\n- **Wave & Batch Pick Optimization** with rugged handheld terminals.\n\nEliminate lost inventory and eliminate paperwork on your shop floor!`;
        quickReplies = ['🔍 View WMS Software Details', '✨ See WMS in 3D Factory Tour', '📞 Request WMS Demo'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      }
      // 11. Vision AI & Optical QC
      else if (hasToken('vision', 'camera', 'defect', 'optical', 'qc', 'flaw', 'telecentric')) {
        botResponse = `### 👁️ ATPL Vision AI™ & High-Speed Quality Inspection\n\n- **Sub-8ms Optical Defect AI:** Neural networks classifying scratches, burrs, pin bends, and label misprints.\n- **ISO/IEC 15415 barcode print quality grading** (A to F grade validation).\n- **High-speed pneumatic reject gate actuation** up to 6.0 m/sec conveyor speed.\n- **Sub-millimeter Telecentric Optics** for PCB & micro-component electronics inspection.`;
        quickReplies = ['✨ Launch 3D Vision Station Demo', '📞 Request Sample Feasibility Test', '📋 View AI Specs'];
        actionBtn = {
          label: 'Launch 3D Vision Station',
          onClick: () => setCurrentView('factory-3d')
        };
      }
      // 12. Mobile Device Management (MDM)
      else if (hasToken('mdm', 'handheld', 'handhelds', 'tablet', 'tablets', 'kiosk', 'lockdown', 'fleet')) {
        botResponse = `### 📱 ATPL PERFECT MDM™ (Mobile Device Management)\n\nComplete enterprise fleet governance over rugged Android handhelds & tablets:\n\n- **Zero-Touch Provisioning:** Rapid QR & NFC staging for 1,500+ handhelds in minutes\n- **Single-App Kiosk Lockdown:** Restrict workers strictly to ATPL WMS or production apps\n- **Remote Screen Takeover:** Real-time OTA troubleshooting for field technicians\n- **Battery & Shock Telemetry:** Predictive battery degradation and drop impact logging.`;
        quickReplies = ['📋 View MDM Specs', '📞 Request MDM Trial', '🛠️ Browse Rugged Handhelds'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      }
      // 13. Shopfloor OEE & PMS
      else if (hasToken('pms', 'oee', 'andon', 'production', 'shopfloor', 'mes', 'downtime')) {
        botResponse = `### ⚙️ PERFECT PMS™ (Production Management System)\n\nReal-time Shop-Floor OEE and machine intelligence:\n\n- **Real-Time OEE Dashboards:** Live Availability, Performance & Quality tracking across assembly lines\n- **Direct PLC & Sensor Integration:** Sub-second cycle time monitoring and micro-stoppage logging\n- **Pareto Root Cause Analysis:** Automated downtime categorization\n- **Automated Andon Escalations:** Instant SMS/WhatsApp supervisor notifications.`;
        quickReplies = ['📋 View PMS Software Specs', '💰 Calculate Plant OEE Payback', '📞 Book a Live PMS Demo'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      }
      // 14. Paperless ISO Audit Management
      else if (hasToken('audit', 'audits', 'paperless', 'capa', 'checklist', 'checklists')) {
        botResponse = `### 📋 PERFECT AUDIT™ (SaaS Audit & Compliance Platform)\n\nEliminate clipboards, spreadsheets, and manual compliance errors:\n\n- **100% Paperless Digital Checklists:** Dynamic inspection templates on rugged tablets\n- **Photo Evidence Capture:** Timestamped & geotagged non-conformance logs\n- **Automated CAPA Workflows:** Corrective Action & Preventive Action task tracking\n- **21 CFR Part 11 Compliance:** Cryptographic digital signatures & tamper-evident logs.`;
        quickReplies = ['📋 View Audit Management Specs', '📞 Request Free Audit Trial', '✨ See Audit Station in Tour'];
        actionBtn = {
          label: 'View Software Details',
          onClick: () => setCurrentView('software')
        };
      }
      // 15. Automated Print & Apply Labeling
      else if (hasToken('labeler', 'applicator', 'labeling', 'tamp') || hasPhrase('print and apply', 'print & apply')) {
        botResponse = `### 🏷️ PERFECT LABELER™ (Automated Print & Apply)\n\nHigh-speed inline robotic labeling for cartons, cases, and pallets:\n\n- **Synchronized Speed:** Applies GS1 serialized labels up to **120 cartons/min**\n- **Interchangeable Applicator Arms:** High-speed Tamp-Blow, Corner-Wrap, and Dual-Face Pallet arms\n- **Integrated 100% Verification:** In-line ISO/IEC 15415 2D DataMatrix barcode grade verifier\n- **Zero-Defect Reject Chute:** Automatic pneumatic ejection of misprinted or damaged labels.`;
        quickReplies = ['🛠️ View PERFECT LABELER Specs', '📞 Request Labeler Quote', '✨ Launch 3D Factory Tour'];
        actionBtn = {
          label: 'View Hardware Details',
          onClick: () => setCurrentView('hardware')
        };
      }
      // 16. Hardware Ecosystem & OEM Partnerships
      else if (hasToken('rfid', 'hardware', 'portal', 'scanner', 'scanners', 'printer', 'printers', 'zebra', 'honeywell', 'tsc', 'impinj', 'datalogic', 'antenna')) {
        botResponse = `### 📡 Industrial Hardware Ecosystem & OEM Alliances\n\nATPL is a certified regional distributor and Gold Partner for premier AIDC OEMs:\n\n- **OEM Alliances:** Honeywell Gold Partner, TSC Rising Star Partner, Zebra, Impinj, Datalogic.\n- **Turnkey Hardware Solutions:**\n  • Fixed Multi-Antenna UHF RFID Gates (1,200+ tags/sec)\n  • High-Speed DPM Barcode Imagers (MIL-STD-810H ultra-rugged)\n  • Industrial Thermal Printers (600 DPI fine micro-labels & ODV verifiers)\n  • Autonomous Indoor SLAM Inventory Drones (15m high-bay racking audits)\n  • Articulated 6-Axis Robotic Arms (0.05mm precision).`;
        quickReplies = ['🛠️ Explore Hardware Catalog', '✨ View Hardware in 3D Action', '📞 Request Equipment Quote'];
        actionBtn = {
          label: 'Browse Hardware Catalog',
          onClick: () => setCurrentView('hardware')
        };
      }
      // 17. ERP & PLC Integration
      else if (hasToken('erp', 'sap', 'oracle', 'plc', 'scada', 'middleware', 'idoc', 'bapi', 'integration')) {
        botResponse = `### 🔄 ERP & PLC Middleware Integration\n\nATPL software features pre-built, certified bidirectional connectors for enterprise ERP and SCADA systems:\n\n- **SAP S/4HANA & ECC 6.0:** Real-time IDoc, BAPI, and OData event synchronization with zero latency\n- **Oracle EBS & NetSuite:** Automated inventory adjustments, PO receipts, and ship confirms\n- **PLC / SCADA Protocols:** Direct OPC-UA, Modbus TCP, Siemens S7, Rockwell Ethernet/IP connectivity\n- **Zero-Data-Loss Offline Buffering:** Edge gateways cache scans if ERP connectivity dips.`;
        quickReplies = ['📦 View WMS Middleware', '📞 Discuss ERP Architecture', '✨ Explore 3D Factory Twin'];
        actionBtn = {
          label: 'View Integration Specs',
          onClick: () => setCurrentView('software')
        };
      }
      // 18. Technical Troubleshooting & Support
      else if (hasToken('troubleshoot', 'issue', 'problem', 'error', 'ticket', 'amc', 'helpdesk', 'sla', 'broken', 'repair')) {
        botResponse = `### 🛠️ ATPL Technical Support & Troubleshooting\n\nATPL provides 24/7 mission-critical maintenance and SLA support across all facilities:\n\n- **Common Quick Checks:**\n  • *Barcode Scanners:* Clean optical window, verify ISO grade contrast, ensure correct DPM illumination mode.\n  • *UHF RFID:* Check antenna polarization angle, ensure metal/liquid surfaces use on-metal ceramic tags.\n  • *Printers:* Clean thermal head with isopropyl alcohol, calibrate gap/black-mark sensors.\n- **24/7 Escalation Hotlines:**\n  • 📞 Software Support: **+91 93421 73484**\n  • 📞 Hardware & Field AMC: **+91 72001 57626**\n  • ✉️ Email: **support@atplgroup.com**`;
        quickReplies = ['📞 Call Hardware Support', '✉️ Log Support Ticket', '💬 WhatsApp Tech Help'];
        actionBtn = {
          label: 'Contact Support Hub',
          onClick: () => setCurrentView('contact')
        };
      }
      // 19. ROI & Financial Payback Calculator
      else if (hasToken('roi', 'cost', 'calculate', 'saving', 'price', 'pricing', 'budget', 'payback', 'quotation', 'quote') || hasPhrase('how much', 'price list', 'pricing plans')) {
        botResponse = `### 📊 Real-Time Automation ROI & Impact\n\nBased on benchmark data across 500+ manufacturing plants:\n\n- **Dock-to-Stock Time:** Reduced by **65%**\n- **Inventory Accuracy:** Achieves **99.98%** with UHF RFID portals\n- **Labor Efficiency:** Up to **3.2x faster picking & packing**\n- **Audit Preparation Time:** Slashed by **70%**\n- **Typical Payback Period:** **6 to 14 months**.\n\nOur application engineers can generate a plant-specific Feasibility & Payback Audit for your facility.`;
        quickReplies = ['📞 Request Plant Feasibility Audit', '✨ Explore 3D Digital Twin', '📦 View WMS Specs'];
        actionBtn = {
          label: 'Request Plant Audit',
          onClick: () => openDemoModal({ solution: 'Plant ROI & Feasibility Study', notes: 'Lead requested custom payback and feasibility audit via AI Co-Pilot.' })
        };
      }
      // 20. 3D Digital Twin Simulator
      else if (hasToken('3d', 'twin', 'tour', 'simulator', 'cad', 'webgl') || hasPhrase('virtual plant', '3d factory')) {
        botResponse = `### ✨ 3D Digital Twin Factory Simulator\n\nExperience our real-time interactive 3D factory powered by WebGL & Three.js:\n\n- Inspect **7 specialized industrial stations** (Inbound RFID, Robotic Kitting, Vision AI, TIJ Serialization, AGV Fleet, Auto-Palletizer, Dispatch Bay).\n- Switch between **Photorealistic 3D Mode** and **Architectural Blueprint CAD Mode**.\n- Live telemetry HUD with sensor overrides, laser tracing, and machine status.`;
        quickReplies = ['🚀 Launch 3D Factory Tour Now', '📋 View Stations Overview', '📞 Book a Live Engineering Walkthrough'];
        actionBtn = {
          label: 'Launch 3D Factory Twin',
          onClick: () => setCurrentView('factory-3d')
        };
      }
      // 21. Booking Demo & Direct Consultation
      else if (hasToken('demo', 'book', 'schedule', 'consultation', 'meeting', 'appointment') || hasPhrase('book demo', 'schedule demo', 'talk to engineer')) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        botResponse = `### 🎉 Let's Accelerate Your Automation Journey!\n\nOur senior automation architects can provide:\n\n1. **Free Plant Automation Feasibility Audit**\n2. **Customized 3D Digital Twin Simulation of your floor**\n3. **Detailed Bill of Materials (BOM) & Payback Proposal**.\n\nClick below to reserve your priority discovery session!`;
        quickReplies = ['📞 Request Priority Demo', '📍 View ATPL Regional Offices', '💬 Connect on WhatsApp (+91 63808 59963)'];
        actionBtn = {
          label: 'Request Priority Demo',
          onClick: () => openDemoModal('General Inquiry')
        };
      }
      // 22. General Greetings & Welcome
      else if (hasToken('hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'afternoon')) {
        botResponse = `### 🤖 Welcome to ATPL Smart Co-Pilot!\n\nI am your dedicated **Industrial Automation & Industry 4.0 Advisor** at **Archery Technocrats Private Limited (ATPL Group)**.\n\nHere is how I can assist your engineering and operations teams:\n- 🎯 **Targeting Zero-Defect Manufacturing:** AI Vision QC, DPM Scanners & Inline Verifiers\n- 📦 **Automating Warehouses & Yard Logistics:** 3D Bin WMS, UHF RFID Gate Portals\n- 🛡️ **Pharma & Auto Serialization:** 100% US-FDA DSCSA & DGFT compliance\n- 📊 **Calculating Factory ROI & Payback:** Benchmark data across 500+ global plants\n- ✨ **Interactive 3D Digital Twin:** Real-time WebGL virtual factory simulation.\n\nWhat would you like to explore today?`;
        quickReplies = [
          '💡 Recommend solution for my plant',
          '💰 Calculate factory ROI',
          '🏢 Company profile & leadership',
          '✨ Launch 3D Factory Tour',
          '📞 Sales & Support Numbers'
        ];
      }
      // 23. General Fallback with Comprehensive Ecosystem Menu
      else {
        botResponse = `I can help you explore **ATPL Group's** complete Industry 4.0 automation ecosystem:\n\n- 📦 **Proprietary Software (ATPL One™):** WMS, Perfect Trace™, Vision AI, Perfect PMS™, PerfectEdge MDM™, Perfect Audit™\n- 📡 **Industrial Hardware:** Fixed UHF RFID Gates, DPM Scanners, Industrial Printers, Robotic Applicators\n- 🏭 **3D Factory Twin:** Real-time WebGL factory simulator\n- 💼 **250+ Enterprise Clients:** Ola Electric, Bosch, JSW Steel, Ashok Leyland, Caplin Point Laboratories\n- 📍 **Offices & Helplines:** TIDEL Park Chennai HQ, Tambaram, Madurai R&D Labs & Hosur.\n\nHow can I best assist your facility today?`;
        quickReplies = [
          '💡 Recommend solution for my plant',
          '📞 Sales & Support Numbers',
          '💰 Calculate factory ROI',
          '🏢 Company profile & leadership',
          '✨ Launch 3D Factory Tour'
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
    }, 450);
  };

  return (
    <>
      {/* Floating Robot Button with Dismissible Speech Bubble */}
      {!isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 990,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          {/* Speech Bubble with 'X' Close Button */}
          {!speechBubbleDismissed && (
            <div
              onClick={() => setIsOpen(true)}
              style={{
                background: '#ffffff',
                color: '#1e293b',
                padding: '0.55rem 0.85rem',
                borderRadius: '999px',
                boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.86rem',
                fontWeight: 600,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Hey buddy, need any help? 👋</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSpeechBubbleDismissed(true);
                }}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#64748b';
                }}
                title="Dismiss message"
                aria-label="Dismiss message"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Circular Floating Robot Button */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0b1e36 0%, #030a16 100%)',
              border: '2px solid rgba(0, 240, 255, 0.7)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.borderColor = '#E85874';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(232, 88, 116, 0.5), 0 0 25px rgba(0, 240, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.7)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.35)';
            }}
            aria-label="Open Archie AI Assistant"
            title="Chat with Archie AI"
          >
            <AtplRobotAvatar size={32} glow={false} />
            <span style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '2px solid #030a16',
              boxShadow: '0 0 8px #10b981'
            }} />
          </button>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div 
          className="atpl-copilot-window"
          style={{
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
          }}
        >
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
                  Archie AI
                  <span style={{
                    fontSize: '0.65rem',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                    fontWeight: 600
                  }}>Online</span>
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>ATPL Robot & Automation Guide</div>
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
