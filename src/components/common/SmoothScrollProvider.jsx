import React, { createContext, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext({
  lenis: null,
  locomotive: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {}
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * SmoothScrollProvider
 * Global smooth inertial scrolling provider powered by Locomotive Scroll v5 + Lenis + GSAP ScrollTrigger.
 * Synchronizes Lenis momentum RAF directly to GSAP's central ticker, updates ScrollTrigger in lockstep,
 * and manages view transitions, scroll restoration, and accessibility.
 */
export function SmoothScrollProvider({ children, currentView }) {
  const locomotiveRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect accessibility prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lsInstance = null;

    try {
      lsInstance = new LocomotiveScroll({
        lenisOptions: {
          duration: prefersReducedMotion ? 0.01 : 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: !prefersReducedMotion,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.25,
          syncTouch: false, // native touch handling on mobile
          autoResize: true,
        },
        scrollCallback: () => {
          ScrollTrigger.update();
        },
        initCustomTicker: (render) => {
          gsap.ticker.add(render);
        },
        destroyCustomTicker: (render) => {
          gsap.ticker.remove(render);
        }
      });

      locomotiveRef.current = lsInstance;
      window.locomotiveScroll = lsInstance;

      // Expose underlying Lenis instance for direct Lenis API calls
      const lenis = lsInstance.lenisInstance;
      lenisRef.current = lenis;
      window.lenis = lenis;

      // Lock GSAP lagSmoothing to prevent frame jumps
      gsap.ticker.lagSmoothing(0);
    } catch (err) {
      console.warn('LocomotiveScroll / Lenis initialization notice:', err);
    }

    return () => {
      try {
        if (locomotiveRef.current) {
          locomotiveRef.current.destroy();
        }
      } catch (e) {
        // cleanup safety
      }
      locomotiveRef.current = null;
      lenisRef.current = null;
      window.locomotiveScroll = null;
      window.lenis = null;
    };
  }, []);

  // Synchronize on view switch: reset scroll position, manage 3D view pausing, refresh ScrollTrigger
  useEffect(() => {
    const ls = locomotiveRef.current;
    const lenis = lenisRef.current || ls?.lenisInstance;

    if (!ls && !lenis) return;

    // In full-screen 3D interactive viewer or admin portals, stop background smooth scroll
    if (currentView === 'factory-3d' || currentView === 'login' || currentView === 'admin') {
      try {
        ls?.stop();
        lenis?.stop();
      } catch (e) {}
    } else {
      try {
        ls?.start();
        lenis?.start();
        // Immediately reset scroll to top on page switch
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else if (ls) {
          ls.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }

        // Allow DOM to settle, then recalculate layout bounds for GSAP ScrollTrigger
        const timer = setTimeout(() => {
          lenis?.resize();
          ScrollTrigger.refresh();
        }, 75);

        return () => clearTimeout(timer);
      } catch (e) {}
    }
  }, [currentView]);

  const scrollTo = (target, options = {}) => {
    const lenis = lenisRef.current || locomotiveRef.current?.lenisInstance;
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (locomotiveRef.current) {
      locomotiveRef.current.scrollTo(target, options);
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  const stop = () => {
    locomotiveRef.current?.stop();
    lenisRef.current?.stop();
  };

  const start = () => {
    locomotiveRef.current?.start();
    lenisRef.current?.start();
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        locomotive: locomotiveRef.current,
        scrollTo,
        stop,
        start
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

