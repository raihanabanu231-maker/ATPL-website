"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const HeroParallax = ({ products }) => {
  const { setCurrentView, openDemoModal } = useApp();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Snappy Apple/Emil-style spring configuration
  const springConfig = { stiffness: 180, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 550]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -550]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [8, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.75, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [2, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 90]),
    springConfig
  );

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '160vh',
        paddingTop: '5rem',
        paddingBottom: '6rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        backgroundColor: '#050b14',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
      }}
    >
      {/* Background Volumetric Glows */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0, 113, 186, 0.25) 0%, rgba(0, 240, 255, 0.08) 45%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <Header onOpenDemo={() => openDemoModal({ mode: 'demo', solution: 'Enterprise Parallax Showcase', notes: 'Lead engaged from 21st.dev Hero Parallax showcase.' })} />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          position: 'relative',
          zIndex: 1,
          willChange: 'transform'
        }}
      >
        {/* Row 1 (Glides Right) */}
        <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              onSelect={() => {
                if (product.view) {
                  setCurrentView(product.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  openDemoModal({ solution: product.title, notes: `Inquiry for ${product.title} from Hero Parallax.` });
                }
              }}
            />
          ))}
        </div>

        {/* Row 2 (Glides Left) */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              onSelect={() => {
                if (product.view) {
                  setCurrentView(product.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  openDemoModal({ solution: product.title, notes: `Inquiry for ${product.title} from Hero Parallax.` });
                }
              }}
            />
          ))}
        </div>

        {/* Row 3 (Glides Right) */}
        <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '2.5rem' }}>
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              onSelect={() => {
                if (product.view) {
                  setCurrentView(product.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  openDemoModal({ solution: product.title, notes: `Inquiry for ${product.title} from Hero Parallax.` });
                }
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Header = ({ onOpenDemo }) => {
  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto 4rem auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        color: 'var(--color-brand-cyan, #00f0ff)',
        fontSize: '0.82rem',
        fontWeight: 700,
        marginBottom: '0.75rem'
      }}>
        <Sparkles size={14} />
        <span>Enterprise Architecture Ecosystem, Interactive Shopfloor Stack</span>
      </div>

      <h2 style={{
        fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
        fontWeight: 900,
        color: '#ffffff',
        lineHeight: 1.15,
        letterSpacing: '-0.03em',
        margin: '0 0 1.25rem 0',
        fontFamily: 'var(--font-display, Inter, sans-serif)'
      }}>
        End-to-End <span className="gradient-text">Connected Factory Stack</span>
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '2rem'
      }}>
        <p style={{
          maxWidth: '720px',
          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
          color: '#94a3b8',
          lineHeight: 1.65,
          margin: 0
        }}>
          From shopfloor UHF RFID portals and sub-8ms computer vision stations to our proprietary WMS, MES, and MDM software suites. Designed, calibrated, and deployed across India's largest automotive, pharmaceutical, and electronics manufacturing facilities.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenDemo}
          style={{
            backgroundColor: '#0071ba',
            color: '#ffffff',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '0.85rem 1.8rem',
            borderRadius: '10px',
            fontSize: '0.94rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 8px 25px rgba(0, 113, 186, 0.45)',
            whiteSpace: 'nowrap'
          }}
        >
          <span>Schedule Enterprise Architecture Demo</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate, onSelect }) => {
  return (
    <motion.div
      style={{
        x: translate,
        width: '420px',
        height: '270px',
        position: 'relative',
        flexShrink: 0,
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#0a1324',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65)'
      }}
      whileHover={{
        y: -14,
        borderColor: '#00f0ff',
        boxShadow: '0 30px 60px rgba(0, 113, 186, 0.45)'
      }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      onClick={onSelect}
      className="parallax-product-card"
    >
      {/* Background Showcase Thumbnail */}
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/assets/images/atpl_factory_3d_interior.jpg';
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease'
        }}
      />

      {/* Cinematic Scrim Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(6, 11, 20, 0.2) 0%, rgba(6, 11, 20, 0.65) 55%, rgba(6, 11, 20, 0.98) 100%)',
          zIndex: 1
        }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          padding: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#00f0ff',
              backgroundColor: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              padding: '0.2rem 0.65rem',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            {product.category || 'INDUSTRIAL SUITE'}
          </span>

          {product.badge && (
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.66rem',
                fontWeight: 700,
                color: '#f8fafc',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.15rem 0.55rem',
                borderRadius: '4px'
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            {product.title}
          </h3>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#94a3b8',
              lineHeight: 1.45,
              margin: '0 0 0.85rem 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700
            }}
          >
            <span>Explore Architecture</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

