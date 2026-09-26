/**
 * ATPL GROUP - INTERACTIVE ISOMETRIC FACTORY MAP & ROBOT TEACHER
 * Recreates the exact connected factory blueprint from atplgroup.com
 */

const ATPL_FACTORY_NODES = [
  {
    id: 'node-trace',
    name: 'PERFECT TRACE™',
    category: 'SERIALIZATION & AGGREGATION',
    icon: '🔍',
    x: 77, // Percentage X on factory graphic
    y: 78, // Percentage Y on factory graphic
    tagline: 'GS1 Serialization & Anti-Counterfeit Packaging',
    lesson: 'Here is PERFECT TRACE! Our software assigns parent-child serialization (Item -> Pack -> Case -> Pallet). Every manufactured unit receives cryptographic verification to prevent counterfeit leakage and ensure 100% DGFT/DSCSA regulatory compliance.',
    specs: ['Multi-level Parent-Child aggregation', '1-Click recall traceability', 'DGFT & EU-FMD compliant', 'Cryptographic QR verification']
  },
  {
    id: 'node-audit',
    name: 'PERFECT AUDIT™',
    category: 'COMPLIANCE & AUDIT MANAGEMENT',
    icon: '📋',
    x: 30,
    y: 48,
    tagline: 'Paperless Digital Audits & Non-Conformance Logs',
    lesson: 'Welcome to PERFECT AUDIT! This digital audit platform completely eliminates paper checklists. Quality inspectors record photo evidence, execute automated CAPA corrective workflows, and sign with 21 CFR Part 11 compliant digital signatures.',
    specs: ['100% paperless digital checklists', 'Photo & geolocation evidence capture', 'Automated CAPA routing', '21 CFR Part 11 compliance']
  },
  {
    id: 'node-warehouse',
    name: 'PERFECT WAREHOUSE™',
    category: 'WAREHOUSE MANAGEMENT SYSTEM (WMS)',
    icon: '📦',
    x: 74,
    y: 24,
    tagline: 'Autonomous WMS with 3D Bin Mapping & RFID',
    lesson: 'Now visiting PERFECT WAREHOUSE! This enterprise WMS manages automated 3D bin allocation, dynamic slotting, FIFO/FEFO picking optimization, and synchronizes bi-directionally with SAP, Oracle, and Microsoft Dynamics.',
    specs: ['3D bin & rack heatmap mapping', 'Automated pallet & carton tagging', 'Dynamic FIFO/FEFO slotting', 'Native SAP/Oracle ERP sync']
  },
  {
    id: 'node-rfid',
    name: 'RFID ANTENNA & READERS',
    category: 'AIDC HARDWARE',
    icon: '📡',
    x: 39,
    y: 18,
    tagline: 'Long-Range UHF Portals & High-Temp Tags',
    lesson: 'At the RFID ANTENNA station! Fixed multi-directional UHF portals capture 1,200+ pallet and carton tags in milliseconds as forklifts drive through warehouse bays with 99.98% inventory accuracy.',
    specs: ['1,200+ tags/sec dense read rate', 'Up to 15m capture range', 'Directional dock-door sensing', 'On-metal & high-temp tag endurance']
  },
  {
    id: 'node-pms',
    name: 'PERFECT PMS™',
    category: 'PRODUCTION MANAGEMENT SYSTEM',
    icon: '⚙️',
    x: 58,
    y: 82,
    tagline: 'Real-time Shop-Floor OEE & Machine Monitoring',
    lesson: 'Here is PERFECT PMS! It directly connects with assembly lines to track Overall Equipment Effectiveness (OEE), monitor machine cycle times, analyze downtime pareto root causes, and trigger real-time Andon alerts.',
    specs: ['Real-time OEE gauge dashboards', 'Machine uptime & cycle monitoring', 'Automated Andon alerts', 'Operator shift productivity reports']
  },
  {
    id: 'node-robots',
    name: 'INDUSTRIAL ROBOTS',
    category: 'ROBOTIC AUTOMATION & PLC',
    icon: '🤖',
    x: 83,
    y: 52,
    tagline: '6-Axis Multi-Joint Robotic Assembly Cells',
    lesson: 'Here are the INDUSTRIAL ROBOTS! Multi-axis articulated robotic arms execute precision welding, pick-and-place, and synchronized conveyor transfers with 0.05mm repeatability alongside PLC automation.',
    specs: ['6-Axis articulated motion', '0.05mm repeatability precision', 'Integrated safety light curtains', 'Direct PLC/SCADA integration']
  },
  {
    id: 'node-scanning',
    name: 'SCANNING SOLUTIONS',
    category: '1D/2D BARCODE IMAGERS',
    icon: '⚡',
    x: 55,
    y: 22,
    tagline: 'Industrial Fixed-Mount & Rugged Handhelds',
    lesson: 'Visiting SCANNING SOLUTIONS! Our liquid-lens industrial barcode scanners decode damaged, low-contrast, or direct part marked (DPM) codes at conveyor speeds up to 6 m/s.',
    specs: ['High-speed 60 scans/sec decoding', 'Direct Part Marking (DPM) decoding', 'IP67 waterproof & dust sealed', '3-Meter concrete drop durability']
  },
  {
    id: 'node-printing',
    name: 'INDUSTRIAL PRINTING SOLUTIONS',
    category: 'INDUSTRIAL THERMAL PRINTERS',
    icon: '🖨️',
    x: 40,
    y: 76,
    tagline: 'Heavy-Duty Thermal Transfer & RFID Encoders',
    lesson: 'At INDUSTRIAL PRINTING! Heavy-duty 24/7 barcode printers produce 600 DPI micro-labels and simultaneously encode UHF RFID chips with integrated print-and-apply automated robotic arms.',
    specs: ['600 DPI high-resolution printing', 'Simultaneous RFID encoding', 'Automated print-and-apply arms', 'Continuous 24/7 metal chassis']
  },
  {
    id: 'node-drones',
    name: 'DRONES & REMOTE CONTROL',
    category: 'AUTONOMOUS INSPECTION',
    icon: '🛸',
    x: 91,
    y: 24,
    tagline: 'High-Altitude Warehouse Inventory Scanning',
    lesson: 'Visiting DRONES & REMOTE CONTROL! Autonomous warehouse drones navigate along high-bay racking aisles, scanning upper-tier pallet barcodes to conduct rapid, paperless aerial stocktaking in minutes.',
    specs: ['Autonomous indoor optical navigation', 'High-bay rack barcode scanning', 'Reduces stocktake time by 80%', 'Live WMS inventory sync']
  },
  {
    id: 'node-software',
    name: 'SOFTWARE DEVELOPMENT',
    category: 'INTEGRATED CLOUD SOLUTIONS',
    icon: '💻',
    x: 18,
    y: 16,
    tagline: 'Enterprise Cloud Architecture & APIs',
    lesson: 'At SOFTWARE DEVELOPMENT! Our software team builds custom application-based platforms and cloud microservices that synchronize all plant hardware, PLCs, and ERP platforms seamlessly.',
    specs: ['Cloud microservices architecture', 'REST & GraphQL industrial APIs', 'Sub-second data latency', 'Enterprise cybersecurity']
  },
  {
    id: 'node-aiml',
    name: 'SUPER COMPUTER AI & ML',
    category: 'ARTIFICIAL INTELLIGENCE & COMPUTER VISION',
    icon: '🧠',
    x: 18,
    y: 75,
    tagline: 'Deep Learning Vision & Predictive Analytics',
    lesson: 'Here is SUPER COMPUTER AI & ML! Deep neural networks analyze high-speed machine vision streams to detect micro-defects down to 5 microns and forecast machine maintenance before downtime occurs.',
    specs: ['Deep learning optical inspection', '< 5 Micron defect resolution', 'Predictive maintenance forecasting', 'Edge AI tensor acceleration']
  },
  {
    id: 'node-erp',
    name: 'ERP SOLUTIONS',
    category: 'ENTERPRISE RESOURCE PLANNING',
    icon: '🏢',
    x: 12,
    y: 44,
    tagline: 'Two-Way Sync with SAP, Oracle & Dynamics',
    lesson: 'Finally, ERP SOLUTIONS! We bridge shop-floor production events directly into top-tier ERPs like SAP S/4HANA, Oracle Cloud, and Microsoft Dynamics for real-time inventory and financial reconciliation.',
    specs: ['Native SAP S/4HANA connector', 'Oracle Cloud & NetSuite sync', 'Real-time BOM work order updates', 'Automated goods receipt posting']
  }
];

class ATPLFactoryMapNavigator {
  constructor(stageContainerId) {
    this.stage = document.getElementById(stageContainerId);
    if (!this.stage) return;

    this.currentIndex = 0;
    this.robotAvatar = null;
    this.hotspotElements = [];
    this.typingInterval = null;

    this.init();
  }

  init() {
    this.stage.innerHTML = '';

    // 1. Background Isometric Factory Graphic
    const bgImg = document.createElement('img');
    bgImg.src = 'assets/images/atpl_isometric_factory.jpg';
    bgImg.alt = 'ATPL Isometric Smart Factory Map';
    bgImg.className = 'blueprint-bg-img';
    this.stage.appendChild(bgImg);

    // 2. Render Clickable Hotspot Pins on each machine
    this.renderHotspots();

    // 3. Render Robot Avatar
    this.renderRobotAvatar();

    // 4. Render Teaching Overlay
    this.renderTeachingOverlay();

    // 5. Navigate to initial station (Perfect Trace)
    this.moveToNode(0);
  }

  renderHotspots() {
    ATPL_FACTORY_NODES.forEach((node, index) => {
      const pin = document.createElement('div');
      pin.className = 'factory-hotspot';
      pin.style.left = `${node.x}%`;
      pin.style.top = `${node.y}%`;
      pin.id = `factory-hotspot-${index}`;

      pin.innerHTML = `
        <div class="hotspot-icon">${node.icon}</div>
        <span class="hotspot-text">${node.name}</span>
      `;

      pin.addEventListener('click', () => {
        this.moveToNode(index);
      });

      this.stage.appendChild(pin);
      this.hotspotElements.push(pin);
    });
  }

  renderRobotAvatar() {
    this.robotAvatar = document.createElement('div');
    this.robotAvatar.className = 'traveling-robot-avatar';
    this.robotAvatar.innerHTML = `
      <span>🤖</span>
      <div class="thruster-pulse"></div>
    `;
    this.stage.appendChild(this.robotAvatar);
  }

  renderTeachingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'robot-teaching-overlay';
    overlay.id = 'robot-teaching-overlay';

    overlay.innerHTML = `
      <div class="teaching-robot-badge">
        <div class="teaching-robot-avatar">🤖</div>
        <div>
          <strong style="color: #fff; font-size: 0.95rem; display: block;">ATPL AI Robot:</strong>
          <span id="teaching-node-tag" style="font-family: var(--font-mono); font-size: 0.75rem; color: #00f0ff;">Node 1 of 12</span>
        </div>
      </div>

      <div class="teaching-info">
        <h3 id="teaching-node-title">PERFECT TRACE™</h3>
        <p id="teaching-node-lesson">Loading factory product walkthrough...</p>
      </div>

      <div class="teaching-nav-controls">
        <button id="btn-map-prev" class="btn btn-secondary btn-sm">⬅ Prev</button>
        <button id="btn-map-next" class="btn btn-primary btn-sm">Next Product ➔</button>
      </div>
    `;

    this.stage.appendChild(overlay);

    document.getElementById('btn-map-prev').addEventListener('click', () => {
      const prevIdx = (this.currentIndex - 1 + ATPL_FACTORY_NODES.length) % ATPL_FACTORY_NODES.length;
      this.moveToNode(prevIdx);
    });

    document.getElementById('btn-map-next').addEventListener('click', () => {
      const nextIdx = (this.currentIndex + 1) % ATPL_FACTORY_NODES.length;
      this.moveToNode(nextIdx);
    });
  }

  moveToNode(index) {
    if (index < 0 || index >= ATPL_FACTORY_NODES.length) return;
    this.currentIndex = index;
    const node = ATPL_FACTORY_NODES[index];

    // 1. Move Robot Avatar smoothly along coordinates
    if (this.robotAvatar) {
      this.robotAvatar.style.left = `${node.x}%`;
      this.robotAvatar.style.top = `${node.y - 7}%`;
    }

    // 2. Highlight Active Hotspot
    this.hotspotElements.forEach((el, i) => {
      if (i === index) el.classList.add('active');
      else el.classList.remove('active');
    });

    // 3. Update Robot Teaching Overlay (Pure Text - No Voice)
    const titleEl = document.getElementById('teaching-node-title');
    const tagEl = document.getElementById('teaching-node-tag');
    const lessonEl = document.getElementById('teaching-node-lesson');

    if (titleEl) titleEl.textContent = node.name;
    if (tagEl) tagEl.textContent = `PRODUCT ${index + 1} OF ${ATPL_FACTORY_NODES.length} • ${node.category}`;

    if (lessonEl) {
      this.typeLessonText(lessonEl, node.lesson);
    }
  }

  typeLessonText(targetEl, text) {
    let idx = 0;
    targetEl.textContent = '';
    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      if (idx < text.length) {
        targetEl.textContent += text.charAt(idx);
        idx++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 12);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('atpl-blueprint-stage')) {
    window.ATPL_MAP = new ATPLFactoryMapNavigator('atpl-blueprint-stage');
  }
});
