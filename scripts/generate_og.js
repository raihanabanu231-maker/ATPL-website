import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Read logo if available
  const logoPath = path.resolve(__dirname, '../public/atpl_logo.png');
  let logoBuffer = null;
  if (fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath).resize({ width: 140, height: 140, fit: 'contain' }).png().toBuffer();
  }

  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040b18" />
        <stop offset="50%" stop-color="#08142b" />
        <stop offset="100%" stop-color="#020610" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0071ba" />
        <stop offset="50%" stop-color="#00f0ff" />
        <stop offset="100%" stop-color="#E85874" />
      </linearGradient>
      <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E85874" />
        <stop offset="100%" stop-color="#ff758f" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.05)" stroke-width="1" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#grid)" />

    <!-- Ambient Glowing Orbs -->
    <circle cx="150" cy="120" r="220" fill="rgba(0, 113, 186, 0.22)" filter="blur(60px)" />
    <circle cx="1050" cy="500" r="260" fill="rgba(232, 88, 116, 0.18)" filter="blur(70px)" />
    <circle cx="600" cy="280" r="180" fill="rgba(0, 240, 255, 0.12)" filter="blur(50px)" />

    <!-- Top Border Line -->
    <rect x="0" y="0" width="${width}" height="6" fill="url(#accentGrad)" />

    <!-- Subtitle Pill -->
    <g transform="translate(80, 85)">
      <rect x="0" y="0" width="410" height="38" rx="19" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0, 240, 255, 0.35)" stroke-width="1.5" />
      <circle cx="20" cy="19" r="5" fill="#00f0ff" />
      <text x="36" y="24" fill="#00f0ff" font-family="Outfit, -apple-system, sans-serif" font-size="14" font-weight="800" letter-spacing="1.5">INDUSTRY 4.0 &amp; SMART AUTOMATION</text>
    </g>

    <!-- Main Title -->
    <g transform="translate(80, 200)">
      <text x="0" y="0" fill="#ffffff" font-family="Outfit, -apple-system, sans-serif" font-size="56" font-weight="900" letter-spacing="-1">
        ATPL GROUP
      </text>
      <text x="360" y="-4" fill="#E85874" font-family="Outfit, -apple-system, sans-serif" font-size="32" font-weight="700">
        • Archery Technocrats
      </text>
    </g>

    <!-- Big Headline -->
    <g transform="translate(80, 280)">
      <text x="0" y="0" fill="#ffffff" font-family="Outfit, -apple-system, sans-serif" font-size="38" font-weight="800" letter-spacing="-0.5">
        Enterprise WMS, GS1 Serialization,
      </text>
      <text x="0" y="48" fill="url(#accentGrad)" font-family="Outfit, -apple-system, sans-serif" font-size="38" font-weight="800" letter-spacing="-0.5">
        UHF RFID &amp; 3D Digital Twin Factory Simulators
      </text>
    </g>

    <!-- Description -->
    <g transform="translate(80, 395)">
      <text x="0" y="0" fill="#94a3b8" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="400">
        Empowering 250+ manufacturing plants across India with certified AIDC hardware,
      </text>
      <text x="0" y="30" fill="#94a3b8" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="400">
        sub-8ms optical vision AI, and bi-directional SAP / Oracle ERP shopfloor synchronization.
      </text>
    </g>

    <!-- Feature Tags -->
    <g transform="translate(80, 500)">
      <!-- Tag 1 -->
      <rect x="0" y="0" width="220" height="44" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />
      <text x="20" y="27" fill="#ffffff" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="700">🚀 12-Station 3D Twin</text>

      <!-- Tag 2 -->
      <rect x="235" y="0" width="210" height="44" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />
      <text x="255" y="27" fill="#ffffff" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="700">📦 Perfect Store WMS</text>

      <!-- Tag 3 -->
      <rect x="460" y="0" width="200" height="44" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />
      <text x="480" y="27" fill="#ffffff" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="700">🔍 Perfect Trace GS1</text>

      <!-- Tag 4 -->
      <rect x="675" y="0" width="210" height="44" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />
      <text x="695" y="27" fill="#ffffff" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="700">🛡️ ISO 9001:2015 Cert</text>
    </g>

    <!-- Bottom URL Bar -->
    <g transform="translate(80, 580)">
      <text x="0" y="0" fill="#00f0ff" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700" letter-spacing="1">
        https://atplgroup.com
      </text>
      <text x="900" y="0" fill="#64748b" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="500">
        TIDEL Park, Chennai, India
      </text>
    </g>
  </svg>
  `;

  const composites = [
    { input: Buffer.from(svgContent), top: 0, left: 0 }
  ];

  if (logoBuffer) {
    composites.push({
      input: logoBuffer,
      top: 65,
      left: 1000
    });
  }

  const outputPath = path.resolve(__dirname, '../public/og-image.png');
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 4, g: 11, b: 24, alpha: 1 }
    }
  })
  .composite(composites)
  .png({ quality: 95 })
  .toFile(outputPath);

  console.log(`Generated og-image.png successfully at: ${outputPath}`);
}

generateOgImage().catch(console.error);
