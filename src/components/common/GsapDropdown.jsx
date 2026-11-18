import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GsapDropdown - Fluid Dropdown Component with AnimatePresence
 *
 * Ensures dropdowns are never visible or rendered to the DOM when closed,
 * preventing any overlapping, flickering, or display conflicts on page load.
 */
export const GsapDropdown = ({
  isOpen,
  children,
  style = {},
  className = '',
  align = 'left', // 'left', 'center', or 'right'
  width = 'auto',
  onMouseEnter,
  onMouseLeave
}) => {
  // Position alignment
  const alignmentStyles = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    zIndex: 1050,
    ...(align === 'right'
      ? { right: 0 }
      : align === 'center'
      ? { left: '50%', transform: 'translateX(-50%)' }
      : { left: '-15px' })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`gsap-dropdown-card ${className}`}
          style={{
            ...alignmentStyles,
            width,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 113, 186, 0.04)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            padding: '1.25rem',
            boxSizing: 'border-box',
            backdropFilter: 'blur(16px)',
            pointerEvents: 'auto',
            transformOrigin: align === 'right' ? 'top right' : align === 'center' ? 'top center' : 'top left',
            ...style
          }}
        >
          {/* Decorative Top Arrow Pointer Indicator */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              ...(align === 'right'
                ? { right: '28px', transform: 'rotate(45deg)' }
                : align === 'center'
                ? { left: '50%', transform: 'translateX(-50%) rotate(45deg)' }
                : { left: '32px', transform: 'rotate(45deg)' }),
              width: '12px',
              height: '12px',
              backgroundColor: '#ffffff',
              borderLeft: '1px solid rgba(226, 232, 240, 0.9)',
              borderTop: '1px solid rgba(226, 232, 240, 0.9)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />

          {/* Main Content Area */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
