import React, { memo } from 'react';

export const Factory3DView = memo(() => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      backgroundColor: '#02101C',
      overflow: 'hidden'
    }}>
      <iframe
        src="/factory-map.html"
        title="ATPL Smart Factory 3D Digital Twin Tour"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
});
