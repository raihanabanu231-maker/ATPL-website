import fs from 'fs';
import path from 'path';

const routes = [
  'software',
  'hardware',
  'solutions',
  'partners',
  'factory-tour',
  'services',
  'resources',
  'demos',
  'insights',
  'insights/sub-8ms-battery-cell-traceability-ola-futurefactory',
  'insights/decoding-1400-tags-second-high-density-dock-portals',
  'insights/edge-tensorrt-vision-microscopic-casting-flaws-sundram-fasteners',
  'insights/warehouse-4-0-dynamic-3d-bin-heatmaps-autonomous-fifo-proconnect',
  'insights/21-cfr-part-11-cloud-labeling-200-industrial-printers',
  'about',
  'contact',
  'privacy',
  'terms'
];

const distIndex = path.join('dist', 'index.html');

if (fs.existsSync(distIndex)) {
  const html = fs.readFileSync(distIndex, 'utf8');

  for (const route of routes) {
    const routeDir = path.join('dist', route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  }

  // Also ensure _redirects is present in dist
  const redirectsSrc = path.join('public', '_redirects');
  const redirectsDist = path.join('dist', '_redirects');
  if (fs.existsSync(redirectsSrc)) {
    fs.copyFileSync(redirectsSrc, redirectsDist);
  }

  console.log(`✓ Successfully generated static HTML routes for ${routes.length} paths and copied _redirects.`);
}
