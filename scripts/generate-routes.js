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
