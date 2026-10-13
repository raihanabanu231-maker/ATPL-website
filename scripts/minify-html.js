import fs from 'fs';

const distHtml = 'dist/index.html';
if (fs.existsSync(distHtml)) {
  let html = fs.readFileSync(distHtml, 'utf8');
  // Remove HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  // Collapse whitespace between tags
  html = html.replace(/>\s+</g, '><').trim();
  fs.writeFileSync(distHtml, html);
  console.log('✓ Successfully minified dist/index.html');
}
