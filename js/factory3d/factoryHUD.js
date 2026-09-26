/**
 * ATPL GROUP - 3D FACTORY HUD & INTERACTION MANAGER
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvasContainer = document.getElementById('factory-canvas-container');
  if (!canvasContainer) return;

  // 1. Initialize 3D Factory Scene & Robot Guide
  const factory = new ATPLFactoryScene('factory-canvas-container');
  const robot = new ATPLRobotGuide(factory);

  // Hook robot update into scene loop
  const origAnimate = factory.animate.bind(factory);
  factory.animate = function() {
    origAnimate();
    if (robot) {
      robot.update(factory.clock.getDelta(), factory.clock.getElapsedTime());
    }
  };

  // 2. Current State
  let currentStationIndex = 0;
  const stations = window.ATPL_STATIONS_DATA || [];

  // Hide loader after loading
  setTimeout(() => {
    const loader = document.getElementById('factory-loader');
    if (loader) loader.classList.add('hidden');
    // Start at Station 0
    selectStation(0);
  }, 1200);

  // 3. UI DOM Elements
  const stationStepBtns = document.querySelectorAll('.station-step-btn');
  const camBtns = document.querySelectorAll('.cam-btn');
  const soundToggleBtn = document.getElementById('hud-sound-toggle');
  const stationSpecCard = document.getElementById('station-spec-card');
  const productModal = document.getElementById('product-deepdive-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // 4. Station Selection Function
  function selectStation(index) {
    if (index < 0 || index >= stations.length) return;
    currentStationIndex = index;
    const station = stations[index];

    // Update Step Buttons in Bottom Bar
    stationStepBtns.forEach((btn, i) => {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Move 3D Camera & AI Robot
    factory.flyToStation(index);
    robot.moveToStation(index);

    // Update Station Spec Card UI
    updateSpecCard(station);

    // Update Telemetry Tickers
    updateTelemetry(station);
  }

  function updateSpecCard(station) {
    if (!stationSpecCard) return;

    stationSpecCard.classList.remove('hidden');

    const badgeEl = stationSpecCard.querySelector('.station-badge');
    const titleEl = stationSpecCard.querySelector('.station-title');
    const descEl = stationSpecCard.querySelector('.station-desc');
    const productsListEl = stationSpecCard.querySelector('.products-included-list');

    if (badgeEl) badgeEl.textContent = station.zone;
    if (titleEl) titleEl.textContent = station.name;
    if (descEl) descEl.textContent = station.tagline;

    if (productsListEl) {
      productsListEl.innerHTML = '';

      // Add Software
      station.software.forEach(sw => {
        const row = document.createElement('div');
        row.className = 'product-item-row';
        row.innerHTML = `
          <span class="name">${sw.name}</span>
          <span class="category">${sw.tag}</span>
        `;
        productsListEl.appendChild(row);
      });

      // Add Hardware
      station.hardware.forEach(hw => {
        const row = document.createElement('div');
        row.className = 'product-item-row';
        row.innerHTML = `
          <span class="name">${hw.name}</span>
          <span class="category">${hw.tag}</span>
        `;
        productsListEl.appendChild(row);
      });
    }
  }

  function updateTelemetry(station) {
    const accuracyEl = document.getElementById('telemetry-accuracy');
    const throughputEl = document.getElementById('telemetry-throughput');
    if (accuracyEl && station.stats.accuracy) {
      accuracyEl.textContent = station.stats.accuracy;
    }
    if (throughputEl && station.stats.throughput) {
      throughputEl.textContent = station.stats.throughput;
    }
  }

  // 5. Connect 3D Raycasting Click to Station Switch
  factory.onStationClick = (index) => {
    selectStation(index);
  };

  // 6. Step Button Click Handlers
  stationStepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-station-idx'), 10);
      selectStation(idx);
    });
  });

  // 7. Quick Robot Action Buttons ("Next Station", "View Deepdive", "Tell Me More")
  const btnNextStation = document.getElementById('robot-btn-next');
  if (btnNextStation) {
    btnNextStation.addEventListener('click', () => {
      const nextIdx = (currentStationIndex + 1) % stations.length;
      selectStation(nextIdx);
    });
  }

  const btnDeepdive = document.getElementById('robot-btn-deepdive');
  if (btnDeepdive) {
    btnDeepdive.addEventListener('click', () => {
      openProductModal(stations[currentStationIndex]);
    });
  }

  const btnSpecs = document.getElementById('btn-open-specs');
  if (btnSpecs) {
    btnSpecs.addEventListener('click', () => {
      openProductModal(stations[currentStationIndex]);
    });
  }

  // 8. Product Deepdive Modal
  function openProductModal(station) {
    if (!productModal || !station) return;
    const modalTitle = document.getElementById('modal-station-title');
    const modalContent = document.getElementById('modal-station-body');

    if (modalTitle) modalTitle.textContent = station.name;
    if (modalContent) {
      let swHtml = station.software.map(s => `
        <div style="background: rgba(0,240,255,0.06); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0,240,255,0.2); margin-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="color: #fff; font-size: 1.05rem;">${s.name}</strong>
            <span style="color: var(--cyan-primary); font-family: var(--font-mono); font-size: 0.8rem;">${s.tag}</span>
          </div>
          <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">${s.desc}</p>
        </div>
      `).join('');

      let hwHtml = station.hardware.map(h => `
        <div style="background: rgba(255,153,0,0.06); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,153,0,0.2); margin-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="color: #fff; font-size: 1.05rem;">${h.name}</strong>
            <span style="color: var(--amber-accent); font-family: var(--font-mono); font-size: 0.8rem;">${h.tag}</span>
          </div>
          <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">${h.desc}</p>
        </div>
      `).join('');

      let featuresHtml = station.deepDive.keyFeatures.map(f => `
        <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.4rem;">
          <span style="color: var(--cyan-primary);">✔</span> ${f}
        </li>
      `).join('');

      modalContent.innerHTML = `
        <p style="color: #cbd5e1; font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">${station.deepDive.overview}</p>
        
        <h4 style="color: var(--cyan-primary); font-size: 1.05rem; margin-bottom: 0.75rem;">Integrated Software:</h4>
        ${swHtml}

        <h4 style="color: var(--amber-accent); font-size: 1.05rem; margin-top: 1.25rem; margin-bottom: 0.75rem;">Industrial Hardware Architecture:</h4>
        ${hwHtml}

        <h4 style="color: #fff; font-size: 1.05rem; margin-top: 1.25rem; margin-bottom: 0.75rem;">Key Operational Capabilities:</h4>
        <ul style="list-style: none; padding: 0;">${featuresHtml}</ul>

        <div style="display: flex; justify-content: flex-end; margin-top: 2rem; gap: 1rem;">
          <a href="contact.html?station=${station.id}" class="btn btn-primary btn-sm">Request Station Demonstration</a>
        </div>
      `;
    }

    productModal.classList.add('active');
  }

  if (modalCloseBtn && productModal) {
    modalCloseBtn.addEventListener('click', () => {
      productModal.classList.remove('active');
    });
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) productModal.classList.remove('active');
    });
  }

  // 9. Camera Mode Switching
  camBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      camBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-cam-mode');
      factory.setCameraMode(mode);
    });
  });

  // 10. Sound / Speech Narration Toggle
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isUnmuted = robot.toggleAudio();
      soundToggleBtn.classList.toggle('active', isUnmuted);
      soundToggleBtn.title = isUnmuted ? 'Mute AI Voice' : 'Unmute AI Voice';
    });
  }

  // Expose for external controls
  window.ATPL_SELECT_STATION = selectStation;
});
