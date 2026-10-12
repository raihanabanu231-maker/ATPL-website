const fs = require('fs');

const file = 'src/data/realClientsData.js';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  const count = (content.match(/\.png"/g) || []).length;
  console.log('Original PNG references in realClientsData.js:', count);
  content = content.replace(/\.png"/g, '.webp"');
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Updated realClientsData.js to WebP!');
}
