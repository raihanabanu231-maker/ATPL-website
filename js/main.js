/**
 * ATPL GROUP - GLOBAL JAVASCRIPT CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Transition
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }

  // 3. Product Tabs Filter
  const tabBtns = document.querySelectorAll('.product-tabs .tab-btn');
  const productCards = document.querySelectorAll('.product-grid .product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal System (Request Demo / Service Ticket)
  const demoModal = document.getElementById('demo-modal');
  const serviceModal = document.getElementById('service-modal');

  document.querySelectorAll('[data-open-modal="demo"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) demoModal.classList.add('active');
    });
  });

  document.querySelectorAll('[data-open-modal="service"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (serviceModal) serviceModal.classList.add('active');
    });
  });

  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // Form Submission feedback
  document.querySelectorAll('.modal-form, .contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Transmitting Data...';

      setTimeout(() => {
        submitBtn.innerHTML = '✔ Request Confirmed!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          form.reset();
        }, 1500);
      }, 1000);
    });
  });

  // 5. Hero Miniature 3D Portal Preview
  const heroMiniPortal = document.getElementById('hero-mini-portal');
  if (heroMiniPortal && window.THREE) {
    try {
      const miniScene = new THREE.Scene();
      const miniCamera = new THREE.PerspectiveCamera(45, heroMiniPortal.clientWidth / heroMiniPortal.clientHeight, 0.1, 100);
      miniCamera.position.set(0, 10, 18);
      miniCamera.lookAt(0, 2, 0);

      const miniRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      miniRenderer.setSize(heroMiniPortal.clientWidth, heroMiniPortal.clientHeight);
      heroMiniPortal.appendChild(miniRenderer.domElement);

      const miniLight = new THREE.DirectionalLight(0xd8f0ff, 2.0);
      miniLight.position.set(10, 20, 10);
      miniScene.add(miniLight);
      miniScene.add(new THREE.AmbientLight(0x00f0ff, 0.8));

      // Miniature rotating robot model
      const miniRobot = new THREE.Group();
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(2, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 })
      );
      miniRobot.add(head);

      const visor = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff })
      );
      visor.position.set(0, 0.4, 0.8);
      visor.rotation.y = Math.PI;
      miniRobot.add(visor);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 0.1, 16, 40),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 })
      );
      ring.rotation.x = Math.PI / 2.5;
      miniRobot.add(ring);

      miniRobot.position.y = 2.5;
      miniScene.add(miniRobot);

      function renderMini() {
        requestAnimationFrame(renderMini);
        miniRobot.rotation.y += 0.015;
        ring.rotation.z += 0.02;
        miniRobot.position.y = 2.5 + Math.sin(Date.now() * 0.003) * 0.4;
        miniRenderer.render(miniScene, miniCamera);
      }
      renderMini();
    } catch (e) {
      console.warn('Hero mini 3D init skipped', e);
    }
  }
});
