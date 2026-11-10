import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useApp } from '../../context/AppContext';
import { HARDWARE_DECK_CARDS, OFFICIAL_CATEGORY_URLS, FLAGSHIP_HARDWARE_PRODUCTS } from '../../data/hardwareProductsData';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

// Color palette matching the vibrant GSAP Flip Carousel cards with 2px gradient borders
const BORDER_PALETTE = [
  { border: '#00f0ff', c1: '#00f0ff', c2: '#38bdf8', glow: 'rgba(0, 240, 255, 0.35)', tag: 'CYAN' },
  { border: '#f43f5e', c1: '#f43f5e', c2: '#fb7185', glow: 'rgba(244, 63, 94, 0.35)', tag: 'ROSE' },
  { border: '#818cf8', c1: '#6366f1', c2: '#a855f7', glow: 'rgba(129, 140, 248, 0.35)', tag: 'INDIGO' },
  { border: '#fb923c', c1: '#fb923c', c2: '#f43f5e', glow: 'rgba(251, 146, 60, 0.35)', tag: 'AMBER' },
  { border: '#10b981', c1: '#10b981', c2: '#06b6d4', glow: 'rgba(16, 185, 129, 0.35)', tag: 'EMERALD' },
  { border: '#c084fc', c1: '#c084fc', c2: '#e879f9', glow: 'rgba(192, 132, 252, 0.35)', tag: 'VIOLET' }
];

const GAP = 16;
const DURATION = 0.65;
const EASE = 'power3.inOut';

function getSlotCount() {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 4;
}

function getSlotMetrics(container) {
  const slotCount = getSlotCount();
  const trackWidth = container.clientWidth || container.getBoundingClientRect().width || 1200;
  const cardWidth = Math.max(220, (trackWidth - (slotCount - 1) * GAP) / slotCount);
  return { slotCount, cardWidth };
}

function getSlotX(slotIndex, cardWidth) {
  return slotIndex * (cardWidth + GAP);
}

function getProductImage(product) {
  if (!product) return '/assets/images/hardware/atpl_scanner_cutout.png';
  if (product.id === 'hw-scanner-wired') return '/assets/images/hardware/atpl_scanner_cutout.png';
  if (product.id === 'hw-scanner-cordless' || product.id === 'hw-scanner-wireless') return '/assets/images/hardware/atpl_scanner_cordless_hs2.jpg';
  if (product.id === 'hw-scanner-granit') return '/assets/images/hardware/atpl_scanner_granit_h3.jpg';
  if (product.id === 'hw-scanner-dpm') return '/assets/images/hardware/atpl_scanner_dpm_h6.jpg';
  if (product.id === 'hw-scanner-conveyor') return '/assets/images/hardware/atpl_scanner_presentation_h4.jpg';
  if (product.id === 'hw-printer-industrial') return '/assets/images/hardware/atpl_printer_industrial.png';
  if (product.id === 'hw-printer-rfid') return '/assets/images/hardware/atpl_printer_rfid.png';
  if (product.id === 'hw-printer-mobile') return '/assets/images/hardware/atpl_printer_mobile.png';
  if (product.id === 'hw-printer-desktop') return '/assets/images/hardware/atpl_printer_desktop.png';
  if (product.id === 'hw-mobility-rugged') return '/assets/images/hardware/atpl_mobility_rugged.png';
  if (product.id === 'hw-mobility-field') return '/assets/images/hardware/atpl_mobility_field.png';
  if (product.id === 'hw-mobility-enterprise') return '/assets/images/hardware/atpl_mobility_enterprise.png';
  if (product.id === 'hw-mobility-tablet') return '/assets/images/hardware/atpl_mobility_tablet.png';
  if (product.id === 'hw-rfid-fixed') return '/assets/images/hardware/atpl_rfid_fixed_reader.jpg';
  if (product.id === 'hw-rfid-sled') return '/assets/images/hardware/atpl_rfid_handheld_sled.jpg';
  if (product.id === 'hw-rfid-antenna') return '/assets/images/hardware/atpl_rfid_antenna.jpg';
  if (product.id === 'hw-marking-fiber' || product.id === 'hw-marking-laser') return '/assets/images/hardware/atpl_marking_laser.png';
  if (product.id === 'hw-touch-industrial') return '/assets/images/hardware/atpl_touch_computer.jpg';
  if (product.id === 'hw-plc-automation') return '/assets/images/hardware/atpl_plc_automation.jpg';
  if (product.id === 'hw-kiosk-modular') return '/assets/images/hardware/atpl_kiosk_system.jpg';
  if (product.id === 'hw-voice-headset') return '/assets/images/hardware/atpl_voice_headset.png';

  if (product.fallbackImage && product.fallbackImage.startsWith('/')) return product.fallbackImage;
  if (product.image) return product.image;
  if (product.category === 'printers') return '/assets/images/hardware/blueprint_printer.svg';
  if (product.category === 'rfid') return '/assets/images/hardware/blueprint_rfid.svg';
  if (product.category === 'mobility') return '/assets/images/hardware/blueprint_mobility.svg';
  if (product.category === 'marking') return '/assets/images/hardware/blueprint_marking.svg';
  if (product.category === 'plc') return '/assets/images/hardware/blueprint_vision.svg';
  return '/assets/images/hardware/blueprint_scanner.svg';
}

function buildCardHTML(product, theme) {
  const pills = (product.keyPills || []).slice(0, 2);
  const prodImg = getProductImage(product);
  return `
    <!-- Small vertical bold-italic ATPL tags on each side edge -->
    <span style="position: absolute; left: 6px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-size: 0.58rem; font-family: monospace; font-weight: 800; font-style: italic; color: ${theme.border}; opacity: 0.7; letter-spacing: 0.15em; pointer-events: none; z-index: 2;">ATPL</span>
    <span style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%) rotate(90deg); font-size: 0.58rem; font-family: monospace; font-weight: 800; font-style: italic; color: ${theme.border}; opacity: 0.7; letter-spacing: 0.15em; pointer-events: none; z-index: 2;">ATPL</span>

    <!-- Top: Category Name in gradient -->
    <div style="width: 100%; text-align: center; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; background: linear-gradient(135deg, ${theme.c1}, ${theme.c2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; justify-content: center; gap: 0.35rem; margin-bottom: 0.25rem;">
      <span>✦</span>
      <span>${product.categoryName || 'ATPL HARDWARE'}</span>
      <span>✦</span>
    </div>

    <!-- OEM & Model Code -->
    <div style="width: 100%; text-align: center; font-size: 0.65rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.45rem;">
      ATPL // ${product.num}, ${product.oem}
    </div>

    <!-- Product 360° Rotating Image Frame (Clean Obsidian Studio, Large Crystal-Clear Image, Zero Circles Below) -->
    <div class="card-turntable-box" style="width: 100%; height: 300px; border-radius: 14px; background: radial-gradient(circle at 50% 45%, #0f172a 0%, #080d1a 65%, #02050c 100%); border: 1.5px solid rgba(0, 240, 255, 0.45); box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.7), 0 8px 25px rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 0.75rem; padding: 0; position: relative; perspective: 1000px;">
      
      <!-- 360° Rotating Product Image in Slow Motion (Dual-Faced 3D Turntable, Maximized Size) -->
      <div class="product-turntable-360" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transform-style: preserve-3d; animation: slowTurntable360 16s linear infinite; will-change: transform;">
        <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transform-style: preserve-3d;">
          <!-- Front Face (Maximized, ultra-crisp, filling frame) -->
          <img 
            src="${prodImg}" 
            alt="${product.title}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='/assets/images/hardware/blueprint_scanner.svg';"
            style="width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 12px; filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.75)); backface-visibility: hidden; transform: translateZ(2px); display: block;" 
          />
          <!-- Back Face (Un-mirrored, studio shaded) -->
          <img 
            src="${prodImg}" 
            alt="${product.title}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='/assets/images/hardware/blueprint_scanner.svg';"
            style="position: absolute; width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 12px; filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.75)) brightness(0.85); backface-visibility: hidden; transform: rotateY(180deg) translateZ(2px); display: block;" 
          />
        </div>
      </div>

      <!-- 360° Rotating Pill Badge -->
      <div style="position: absolute; top: 10px; right: 10px; background: rgba(10, 15, 29, 0.88); backdrop-filter: blur(6px); border: 1px solid rgba(0, 240, 255, 0.5); border-radius: 999px; padding: 3px 9px; font-size: 0.65rem; font-family: monospace; font-weight: 800; color: #00f0ff; z-index: 3; display: flex; align-items: center; gap: 4px; pointer-events: none; box-shadow: 0 2px 10px rgba(0,0,0,0.6);">
        <span style="display: inline-block; animation: spinTurntableBadge 16s linear infinite;">↻</span>
        <span>360° SLOW-MO</span>
      </div>
    </div>

    <!-- Product Title -->
    <h3 style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin: 0 0 0.45rem 0; line-height: 1.25; text-align: center; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.6rem;">
      ${product.title}
    </h3>

    <!-- Spec Highlight Badge -->
    <div style="text-align: center; margin-bottom: 0.6rem;">
      <span style="display: inline-block; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 999px; background: rgba(0, 240, 255, 0.08); color: ${theme.border}; border: 1px solid ${theme.border}66; letter-spacing: 0.03em; text-transform: uppercase;">
        ${product.badgeText}
      </span>
    </div>

    <!-- Key Pills -->
    <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; margin-bottom: 0.85rem;">
      ${pills.map(pill => `
        <span style="font-size: 0.64rem; font-weight: 600; padding: 0.15rem 0.45rem; border-radius: 4px; background-color: rgba(255, 255, 255, 0.06); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.08);">${pill}</span>
      `).join('')}
    </div>

    <!-- Action Buttons -->
    <div style="width: 100%; display: flex; gap: 0.45rem; margin-bottom: 0.65rem;">
      <button data-action="quote" data-product-id="${product.id}" style="flex: 1; background: linear-gradient(135deg, #0071ba, #005a96); color: #ffffff; border: 1px solid ${theme.border}77; padding: 0.55rem 0.65rem; border-radius: 8px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.3rem; box-shadow: 0 4px 15px rgba(0, 113, 186, 0.35); transition: transform 0.2s ease;">
        <span>Request Quote</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>

      <button data-action="specs" data-product-id="${product.id}" title="View Full Specifications" style="background: rgba(255, 255, 255, 0.08); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.18); padding: 0.55rem 0.65rem; border-radius: 8px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.25rem; transition: background 0.2s ease;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>Specs</span>
      </button>
    </div>

    <!-- Bottom: Same Title upside-down (scaleY(-1)) -->
    <div style="width: 100%; text-align: center; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; transform: scaleY(-1); background: linear-gradient(135deg, ${theme.c1}, ${theme.c2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0.8; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
      <span>✦</span>
      <span>${product.categoryName || 'ATPL HARDWARE'}</span>
      <span>✦</span>
    </div>
  `;
}

function createCardElement(product, theme, width) {
  const card = document.createElement('div');
  card.className = 'flip-product-card';
  card.setAttribute('data-product-id', product.id);
  card.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: ${width}px;
    height: 100%;
    background: linear-gradient(#0c111d, #0c111d) padding-box, linear-gradient(135deg, ${theme.c1}, ${theme.c2}) border-box;
    border: 2px solid transparent;
    border-radius: 18px;
    padding: 1.15rem 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 25px ${theme.glow};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    will-change: transform, opacity;
  `;
  card.innerHTML = buildCardHTML(product, theme);
  return card;
}

export const HardwareFlipCaterpillar = ({ activeCategory = 'all', onCategoryChange }) => {
  const { openDemoModal } = useApp();

  const [internalCategory, setInternalCategory] = useState(activeCategory);
  const [inspectModalProduct, setInspectModalProduct] = useState(null);
  const [buttonsDimmed, setButtonsDimmed] = useState(false);

  const containerRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const queueStartRef = useRef(0);
  const activeCardsRef = useRef([]);

  // Sync internal category with external prop
  useEffect(() => {
    if (activeCategory) {
      setInternalCategory(activeCategory);
    }
  }, [activeCategory]);

  const currentCategory = onCategoryChange ? activeCategory : internalCategory;

  const handleCategoryClick = (catId) => {
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      setInternalCategory(catId);
    }
  };

  // Products list
  const currentProducts = useMemo(() => {
    if (currentCategory === 'all') {
      return FLAGSHIP_HARDWARE_PRODUCTS;
    }
    const filtered = HARDWARE_DECK_CARDS.filter(p => p.category === currentCategory);
    return filtered.length > 0 ? filtered : FLAGSHIP_HARDWARE_PRODUCTS;
  }, [currentCategory]);

  // Lookup map for modal retrieval
  const allProductsMap = useMemo(() => {
    const map = {};
    [...FLAGSHIP_HARDWARE_PRODUCTS, ...HARDWARE_DECK_CARDS].forEach(p => {
      map[p.id] = p;
    });
    return map;
  }, []);

  // Initialize track with cards in slots
  const initTrack = useCallback(() => {
    const container = cardsWrapperRef.current;
    if (!container || currentProducts.length === 0) return;

    // Clean up any ongoing tweens
    gsap.killTweensOf(container.querySelectorAll('.flip-product-card'));
    container.innerHTML = '';
    activeCardsRef.current = [];
    isAnimatingRef.current = false;
    setButtonsDimmed(false);

    const { slotCount, cardWidth } = getSlotMetrics(container);
    queueStartRef.current = 0;

    for (let i = 0; i < slotCount; i++) {
      const prod = currentProducts[i % currentProducts.length];
      const theme = BORDER_PALETTE[i % BORDER_PALETTE.length];
      const card = createCardElement(prod, theme, cardWidth);
      const x = getSlotX(i, cardWidth);

      gsap.set(card, {
        x: x,
        y: 0,
        scale: 1,
        opacity: 1
      });

      container.appendChild(card);
      activeCardsRef.current.push(card);
    }
  }, [currentProducts]);

  useEffect(() => {
    initTrack();
  }, [initTrack]);



  // Motion: Slide Next (0.65s power3.inOut)
  const slideNext = useCallback(() => {
    const container = cardsWrapperRef.current;
    if (!container || isAnimatingRef.current || currentProducts.length === 0) return;

    const activeCards = activeCardsRef.current;
    if (activeCards.length === 0) return;

    isAnimatingRef.current = true;
    setButtonsDimmed(true);

    const { slotCount, cardWidth } = getSlotMetrics(container);

    // Failsafe timer to never leave buttons locked
    const safetyTimer = setTimeout(() => {
      isAnimatingRef.current = false;
      setButtonsDimmed(false);
    }, 800);

    // 1. Ghost of first card shrinks to 58% from bottom edge and fades out at left
    const firstCard = activeCards[0];
    const ghostTargetX = getSlotX(0, cardWidth) - (cardWidth + GAP) * 0.45;

    gsap.to(firstCard, {
      x: ghostTargetX,
      scale: 0.58,
      opacity: 0,
      transformOrigin: '50% 100%',
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        firstCard.remove();
      }
    });

    // 2. Middle cards slide left by one slot
    for (let i = 1; i < activeCards.length; i++) {
      const targetX = getSlotX(i - 1, cardWidth);
      gsap.to(activeCards[i], {
        x: targetX,
        duration: DURATION,
        ease: EASE
      });
    }

    // 3. Incoming card starts small and transparent just past right end and grows into last slot
    queueStartRef.current = (queueStartRef.current + 1) % currentProducts.length;
    const nextProdIndex = (queueStartRef.current + slotCount - 1) % currentProducts.length;
    const nextProd = currentProducts[nextProdIndex];
    const theme = BORDER_PALETTE[nextProdIndex % BORDER_PALETTE.length];
    const newCard = createCardElement(nextProd, theme, cardWidth);

    const incomingStartX = getSlotX(slotCount - 1, cardWidth) + (cardWidth + GAP) * 0.45;
    const incomingTargetX = getSlotX(slotCount - 1, cardWidth);

    gsap.set(newCard, {
      x: incomingStartX,
      scale: 0.58,
      opacity: 0,
      transformOrigin: '50% 100%'
    });

    container.appendChild(newCard);

    gsap.to(newCard, {
      x: incomingTargetX,
      scale: 1,
      opacity: 1,
      transformOrigin: '50% 100%',
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        clearTimeout(safetyTimer);
        isAnimatingRef.current = false;
        setButtonsDimmed(false);
      }
    });

    activeCardsRef.current = [...activeCards.slice(1), newCard];
  }, [currentProducts]);

  // Motion: Slide Previous (Exact reverse)
  const slidePrev = useCallback(() => {
    const container = cardsWrapperRef.current;
    if (!container || isAnimatingRef.current || currentProducts.length === 0) return;

    const activeCards = activeCardsRef.current;
    if (activeCards.length === 0) return;

    isAnimatingRef.current = true;
    setButtonsDimmed(true);

    const { slotCount, cardWidth } = getSlotMetrics(container);

    const safetyTimer = setTimeout(() => {
      isAnimatingRef.current = false;
      setButtonsDimmed(false);
    }, 800);

    // 1. Ghost of last card shrinks to 58% from bottom edge and fades out at right
    const lastCard = activeCards[activeCards.length - 1];
    const ghostTargetX = getSlotX(slotCount - 1, cardWidth) + (cardWidth + GAP) * 0.45;

    gsap.to(lastCard, {
      x: ghostTargetX,
      scale: 0.58,
      opacity: 0,
      transformOrigin: '50% 100%',
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        lastCard.remove();
      }
    });

    // 2. Middle cards slide right by one slot
    for (let i = 0; i < activeCards.length - 1; i++) {
      const targetX = getSlotX(i + 1, cardWidth);
      gsap.to(activeCards[i], {
        x: targetX,
        duration: DURATION,
        ease: EASE
      });
    }

    // 3. Incoming card starts small and transparent just past left end and grows into first slot
    queueStartRef.current = (queueStartRef.current - 1 + currentProducts.length) % currentProducts.length;
    const prevProd = currentProducts[queueStartRef.current];
    const theme = BORDER_PALETTE[queueStartRef.current % BORDER_PALETTE.length];
    const newCard = createCardElement(prevProd, theme, cardWidth);

    const incomingStartX = getSlotX(0, cardWidth) - (cardWidth + GAP) * 0.45;
    const incomingTargetX = getSlotX(0, cardWidth);

    gsap.set(newCard, {
      x: incomingStartX,
      scale: 0.58,
      opacity: 0,
      transformOrigin: '50% 100%'
    });

    container.prepend(newCard);

    gsap.to(newCard, {
      x: incomingTargetX,
      scale: 1,
      opacity: 1,
      transformOrigin: '50% 100%',
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        clearTimeout(safetyTimer);
        isAnimatingRef.current = false;
        setButtonsDimmed(false);
      }
    });

    activeCardsRef.current = [newCard, ...activeCards.slice(0, activeCards.length - 1)];
  }, [currentProducts]);

  // Click delegation on track for Quote and Specs buttons
  useEffect(() => {
    const container = cardsWrapperRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const quoteBtn = e.target.closest('[data-action="quote"]');
      if (quoteBtn) {
        const prodId = quoteBtn.getAttribute('data-product-id');
        const prod = allProductsMap[prodId];
        if (prod) {
          openDemoModal({
            solution: `${prod.title} (${prod.oem})`,
            notes: `Inquiry from Hardware Carousel: ${prod.title}`
          });
        }
        return;
      }

      const specsBtn = e.target.closest('[data-action="specs"]');
      if (specsBtn) {
        const prodId = specsBtn.getAttribute('data-product-id');
        const prod = allProductsMap[prodId];
        if (prod) {
          setInspectModalProduct(prod);
        }
        return;
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [allProductsMap, openDemoModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (inspectModalProduct) {
        if (e.key === 'Escape') setInspectModalProduct(null);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        slideNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        slidePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideNext, slidePrev, inspectModalProduct]);

  // Window resize handler
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!isAnimatingRef.current) {
          initTrack();
        }
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initTrack]);

  return (
    <section
      id="hardware-3d-deck"
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: '#0a0d14',
        borderRadius: '24px',
        padding: '3rem 1.5rem 3.5rem 1.5rem',
        margin: '2rem 0 3.5rem 0',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)'
      }}
    >
      <style>{`
        @keyframes spinTurntableBadge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slowTurntable360 {
          0% {
            transform: perspective(1000px) rotateY(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(360deg);
          }
        }
        .flip-product-card:hover .product-turntable-360 {
          animation-play-state: paused;
        }
      `}</style>
      {/* Background Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(129, 140, 248, 0.06) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header & Category Filters */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.12)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Sparkles size={13} />
              <span>ATPL HARDWARE SHOWCASE</span>
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 800, color: '#ffffff', margin: '0 0 0.6rem 0', letterSpacing: '-0.025em' }}>
            Swipe & Explore <span style={{ color: '#00f0ff', textShadow: '0 0 25px rgba(0, 240, 255, 0.5)' }}>Industrial Hardware</span>
          </h2>

          <p style={{ fontSize: '0.94rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            Side-by-side interactive hardware cards arranged in a continuous looping carousel. Click <strong>Next</strong> or <strong>Previous</strong> or use arrow keys to glide through enterprise equipment.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'scanners', label: 'Scanning' },
              { id: 'rfid', label: 'RFID Portals' },
              { id: 'printers', label: 'Printers' },
              { id: 'marking', label: 'DPM Marking' },
              { id: 'mobility', label: 'Mobility' },
              { id: 'plc', label: 'Machine Vision' },
              { id: 'touch', label: 'Touch Systems' },
              { id: 'kiosk', label: 'Kiosks' },
              { id: 'voice', label: 'Wearable Voice' }
            ].map(cat => {
              const isSelected = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.16)' : 'rgba(15, 23, 42, 0.7)',
                    color: isSelected ? '#00f0ff' : '#94a3b8',
                    border: isSelected ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            THE DASHED BORDER ROUNDED FRAME (Container)
           ========================================================================= */}
        <div
          className="flip-carousel-outer-box"
          style={{
            border: '2px dashed rgba(255, 255, 255, 0.22)',
            borderRadius: '22px',
            padding: '18px 20px',
            backgroundColor: 'rgba(8, 14, 26, 0.75)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'inset 0 0 45px rgba(0, 0, 0, 0.7), 0 25px 60px rgba(0, 0, 0, 0.85)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Track container where cards are positioned absolutely in coordinate slots */}
          <div
            ref={cardsWrapperRef}
            className="flip-carousel-cards-track"
            style={{
              position: 'relative',
              width: '100%',
              height: '645px',
              overflow: 'hidden'
            }}
          />
        </div>

        {/* =========================================================================
            NEXT & PREVIOUS PILL BUTTONS BELOW
           ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginTop: '1.5rem'
          }}
        >
          {/* Next Button */}
          <button
            onClick={slideNext}
            disabled={buttonsDimmed}
            style={{
              padding: '0.65rem 2.6rem',
              backgroundColor: buttonsDimmed ? 'rgba(255,255,255,0.05)' : '#00f0ff',
              color: buttonsDimmed ? '#94a3b8' : '#080d1a',
              border: buttonsDimmed ? '1.5px solid rgba(255, 255, 255, 0.15)' : '1.5px solid #00f0ff',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: buttonsDimmed ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: buttonsDimmed ? 'none' : '0 0 25px rgba(0, 240, 255, 0.45)',
              opacity: buttonsDimmed ? 0.35 : 1,
              transition: 'all 0.25s ease'
            }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>

          {/* Previous Button */}
          <button
            onClick={slidePrev}
            disabled={buttonsDimmed}
            style={{
              padding: '0.65rem 2.6rem',
              backgroundColor: '#161922',
              color: buttonsDimmed ? '#64748b' : '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: buttonsDimmed ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              opacity: buttonsDimmed ? 0.35 : 1,
              transition: 'all 0.25s ease'
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.78rem', color: '#64748b' }}>
          Navigate with <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1' }}>←</kbd> <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1' }}>→</kbd> arrow keys
        </div>

      </div>

      {/* =========================================================================
          TECHNICAL SPECIFICATIONS INSPECTION MODAL (POPUP)
         ========================================================================= */}
      {inspectModalProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setInspectModalProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#070f1e',
              border: `1.5px solid ${inspectModalProduct.accentColor}`,
              borderRadius: '20px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px ${inspectModalProduct.accentColor}25`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setInspectModalProduct(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#cbd5e1',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: inspectModalProduct.accentColor,
                  backgroundColor: `${inspectModalProduct.accentColor}20`,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}
              >
                {inspectModalProduct.oem}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {inspectModalProduct.categoryName}
              </span>
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              {inspectModalProduct.title}
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {inspectModalProduct.desc}
            </p>

            {/* Technical Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}
            >
              {(inspectModalProduct.stats || []).map((stat, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, marginTop: '0.2rem' }}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Integration Blueprint */}
            {inspectModalProduct.blueprint && (
              <div
                style={{
                  backgroundColor: 'rgba(0, 113, 186, 0.12)',
                  border: '1px solid rgba(0, 113, 186, 0.3)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  marginBottom: '1.75rem',
                  fontSize: '0.85rem',
                  lineHeight: 1.6
                }}
              >
                <div style={{ fontWeight: 800, color: inspectModalProduct.accentColor, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={15} />
                  <span>Shopfloor Integration Architecture</span>
                </div>
                <div><strong style={{ color: '#ffffff' }}>Controller: </strong>{inspectModalProduct.blueprint.controller}</div>
                <div><strong style={{ color: '#ffffff' }}>Connectivity: </strong>{inspectModalProduct.blueprint.connectivity}</div>
                <div><strong style={{ color: '#ffffff' }}>Protocols & ERP: </strong>{inspectModalProduct.blueprint.protocols}</div>
                <div style={{ color: inspectModalProduct.accentColor, fontWeight: 700, marginTop: '0.4rem' }}>
                  ⚡ ROI Impact: {inspectModalProduct.blueprint.roiMetric}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setInspectModalProduct(null);
                  openDemoModal({
                    solution: `${inspectModalProduct.title} (${inspectModalProduct.oem})`,
                    notes: `Inquiry from Technical Modal: ${inspectModalProduct.title}`
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#0071ba',
                  color: '#ffffff',
                  border: `1px solid ${inspectModalProduct.accentColor}`,
                  padding: '0.8rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Request Unit & Official Quote</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={inspectModalProduct.officialUrl || OFFICIAL_CATEGORY_URLS[inspectModalProduct.category] || 'https://atplgroup.com/'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.8rem 1.15rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <span>View on atplgroup.com</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
