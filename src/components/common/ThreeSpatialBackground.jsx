import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js Spatial Constellation Layer
 * Renders an ambient, interactive 3D WebGL particle space with depth parallax.
 * Highly optimized: Composite-only, throttles when hidden, lightweight buffer geometry.
 */
export function ThreeSpatialBackground({ currentView }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let cleanup = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const container = containerRef.current;
      if (!container) return;

      let width = window.innerWidth;
      let height = window.innerHeight;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(width < 768 ? 1 : Math.min(window.devicePixelRatio, 1.5));
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.pointerEvents = 'none';
      renderer.domElement.style.zIndex = '0';

      container.appendChild(renderer.domElement);

      // 2. Industrial Sensor Nodes (Particles in 3D Space)
      const particleCount = width < 768 ? 35 : 70;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      // ATPL Palette: Electric Cyan (#00f0ff), Cobalt (#0071ba), Cyber Coral (#E85874)
      const colorPalette = [
        new THREE.Color('#00f0ff'),
        new THREE.Color('#0071ba'),
        new THREE.Color('#38bdf8'),
        new THREE.Color('#10b981'),
        new THREE.Color('#E85874')
      ];

      for (let i = 0; i < particleCount; i++) {
        // Spread across 3D box
        positions[i * 3] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;

        scales[i] = Math.random() * 3 + 1.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Custom circular soft particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 16,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: currentView === 'home' ? 0.35 : 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // 3. Mouse & Window Scroll Parallax Dampening
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      let currentScrollY = 0;
      let targetScrollY = window.scrollY || 0;
      let lastScrollY = window.scrollY || 0;
      let scrollVelocity = 0;

      const onMouseMove = (e) => {
        const windowHalfX = width / 2;
        const windowHalfY = height / 2;
        targetX = (e.clientX - windowHalfX) * 0.08;
        targetY = (e.clientY - windowHalfY) * 0.08;
      };

      const onScroll = () => {
        targetScrollY = window.scrollY || window.pageYOffset || 0;
      };

      const onResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      // 4. Animation Loop
      let animationId;
      let isVisible = true;

      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!isVisible) return;

        // Skip render when scrolled far past hero into opaque body sections
        if (targetScrollY > height * 2.2) return;

        // Smooth camera dampening (Apple-style inertia for mouse)
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Smooth camera dampening for page scroll
        currentScrollY += (targetScrollY - currentScrollY) * 0.08;
        scrollVelocity = (targetScrollY - lastScrollY);
        lastScrollY = targetScrollY;

        camera.position.x = mouseX;
        camera.position.y = -mouseY + (currentScrollY * 0.12);
        camera.position.z = 400 - Math.min(currentScrollY * 0.06, 120);
        camera.lookAt(scene.position);

        // Subtle particle orbital drift with scroll velocity
        particles.rotation.y += 0.0004 + (scrollVelocity * 0.00012);
        particles.rotation.x += 0.0002;
        particles.rotation.z = currentScrollY * 0.0001;

        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        if (container && renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
      };
    };

    let idleId = null;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(setup, { timeout: 1500 });
    } else {
      idleId = setTimeout(setup, 600);
    }

    return () => {
      cancelled = true;
      if (typeof window !== 'undefined') {
        if ('cancelIdleCallback' in window && typeof idleId === 'number') {
          window.cancelIdleCallback(idleId);
        } else if (idleId) {
          clearTimeout(idleId);
        }
      }
      if (cleanup) cleanup();
    };
  }, [currentView]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
}

export default ThreeSpatialBackground;

