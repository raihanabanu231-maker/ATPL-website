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

      <!-- 6. Official ATPL Brand Vector Logo Graphic (Dead Centered with exact brand mark) -->
      <g transform="translate(-48, -78) scale(0.096)">
        <!-- 1. Top Blue Triangle Facet -->
        <polygon points="220,107 377,434 80,577" fill="#29A6E8" />
        <!-- 2. Dark Charcoal Arrow Shaft -->
        <polygon points="1,854 80,577 377,434 824,226 840,220 426,538" fill="#2F4149" />
        <!-- 3. Teal Accent Band -->
        <polygon points="229,678 426,538 457,600 296,731" fill="#0E87A9" />
        <!-- 4. Bottom Light Blue Triangle Facet -->
        <polygon points="296,731 457,600 648,1000" fill="#3EA6E9" />
        <!-- 5. Arrowhead Tip Diamond -->
        <polygon points="840,220 864,133 1000,107 910,225" fill="#2F4149" />
        <!-- 6. Signature Coral Bow Arc -->
        <path d="M436,34 L465,59 C605,180 740,430 740,580 C740,730 705,870 648,1000 C725,870 784,710 784,540 C784,370 655,140 436,34 Z" fill="#E85874" />
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
