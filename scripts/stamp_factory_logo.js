import fs from 'fs';
import sharp from 'sharp';

async function main() {
  const inputPath = 'assets/images/atpl_isometric_factory.jpg';
  const backupPath = 'assets/images/atpl_isometric_factory_original.jpg';
  
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log('Created backup of original image.');
  }

  // Full platform center is at x = 672, y = 402
  // Spanning full width to cover both the inner logo and the outer back circular rim
  const svgOverlay = `
  <svg width="1376" height="768" viewBox="0 0 1376 768" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pedestalRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
        <stop offset="40%" stop-color="#0071ba" stop-opacity="1" />
        <stop offset="70%" stop-color="#002248" stop-opacity="1" />
        <stop offset="100%" stop-color="#E85874" stop-opacity="0.9" />
      </linearGradient>

      <radialGradient id="pedestalBezelGrad" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#f1f5f9" />
        <stop offset="85%" stop-color="#e2e8f0" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </radialGradient>

      <filter id="pedestalOuterGlow" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="pedestalDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.8" />
      </filter>
    </defs>

    <!-- FULL CENTER PEDESTAL - COMPLETELY MASKS THE ENTIRE BACK RING & PEDESTAL -->
    <g transform="translate(672, 405) rotate(-14.5)">
      <!-- 1. Outer Circuit Connector Glow -->
      <ellipse cx="0" cy="0" rx="226" ry="122" fill="none" stroke="rgba(0, 240, 255, 0.4)" stroke-width="4" stroke-dasharray="12, 8" />
      <ellipse cx="0" cy="0" rx="218" ry="117" fill="none" stroke="rgba(232, 88, 116, 0.45)" stroke-width="3" />

      <!-- 2. Dark Opaque Background Blocker (Hides all traces of old drawing & back rim) -->
      <ellipse cx="0" cy="0" rx="212" ry="113" fill="#031326" filter="url(#pedestalOuterGlow)" />
      
      <!-- 3. Isometric 3D Beveled Base Ring -->
      <ellipse cx="0" cy="6" rx="208" ry="109" fill="#001830" filter="url(#pedestalDepthShadow)" />
      <ellipse cx="0" cy="0" rx="206" ry="108" fill="url(#pedestalRimGrad)" />
      <ellipse cx="0" cy="0" rx="200" ry="104" fill="#011e3d" />

      <!-- 4. Inner Cyan Cyber Tracers -->
      <ellipse cx="0" cy="0" rx="192" ry="99" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-dasharray="6, 4" opacity="0.8" />
      
      <!-- 5. Main Clean White/Silver Hologram Display Deck -->
      <ellipse cx="0" cy="0" rx="184" ry="94" fill="url(#pedestalBezelGrad)" stroke="#0071ba" stroke-width="5" />
      <ellipse cx="0" cy="0" rx="172" ry="86" fill="none" stroke="rgba(0, 113, 186, 0.35)" stroke-width="2.5" />

      <!-- 6. Official ATPL Brand Vector Logo Graphic (Dead Centered) -->
      <g transform="translate(-62, -68) scale(1.24)">
        <!-- Top Blue Triangle Facet -->
        <polygon points="22,10.5 38,43 0,58 22,10.5" fill="#29A2E1" />
        <!-- Middle Teal Accent -->
        <polygon points="23,54 44,53 29,73 23,54" fill="#0284c7" />
        <!-- Bottom Blue Wing -->
        <polygon points="29,73 65,99.5 38,62 29,73" fill="#38bdf8" />
        <!-- Dark Arrow Main Shaft -->
        <polygon points="0,85 38,51 83,22 75,34 0,85" fill="#334155" />
        <!-- Dark Arrow Tip Diamond -->
        <polygon points="83,22 100,10.5 89,22.5 83,22" fill="#1e293b" />
        <polygon points="89,22.5 100,10.5 91.5,27.5 89,22.5" fill="#334155" />
        <!-- Signature Brand Coral Bow Arc (#E85874) -->
        <path 
          d="M42 0.5 C55 3 67 11 75.5 22.5 C84.5 35 88 50 85 65.5 C82 80 72.5 92 65 99.5 C67 92 72.5 78.5 74.5 65 C76.5 51.5 73 38 65 27 C57 16 47 9 42 0.5 Z" 
          fill="#E85874" 
        />
      </g>

      <!-- 7. Official Brand Typography (Centered with perfect vertical balance) -->
      <text x="0" y="28" text-anchor="middle" fill="#002248" font-size="22" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="900" letter-spacing="3">
        ARCHERY
      </text>
      <text x="0" y="49" text-anchor="middle" fill="#E85874" font-size="16" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-weight="800" letter-spacing="4">
        TECHNOCRATS
      </text>
    </g>
  </svg>
  `;

  const svgBuffer = Buffer.from(svgOverlay);

  const outputPath = 'assets/images/atpl_isometric_factory.jpg';
  const publicPath = 'public/assets/images/atpl_isometric_factory.jpg';
  const distPath = 'dist/assets/images/atpl_isometric_factory.jpg';

  const outputBuffer = await sharp(backupPath)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .jpeg({ quality: 94 })
    .toBuffer();

  fs.writeFileSync(outputPath, outputBuffer);
  console.log('Updated', outputPath);

  if (fs.existsSync('public/assets/images')) {
    fs.writeFileSync(publicPath, outputBuffer);
    console.log('Updated', publicPath);
  }
  if (fs.existsSync('dist/assets/images')) {
    fs.writeFileSync(distPath, outputBuffer);
    console.log('Updated', distPath);
  }

  console.log('Successfully stamped official logo onto the factory illustration image!');
}

main().catch(console.error);
