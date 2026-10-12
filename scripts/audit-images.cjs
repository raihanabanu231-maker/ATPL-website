const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(getFiles(full));
      }
    } else if (/\.(jsx|tsx|js|html)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles(path.resolve('src')).concat(getFiles(path.resolve('public')));
let totalImgs = 0;
let imgsWithoutSrcset = [];
let pngReferences = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/<img[^>]+>/gs) || [];
  totalImgs += matches.length;
  for (const m of matches) {
    if (!m.includes('srcSet') && !m.includes('srcset')) {
      imgsWithoutSrcset.push({ file: path.relative(process.cwd(), file), tag: m.replace(/\s+/g, ' ').slice(0, 120) });
    }
  }
  const pngMatches = content.match(/['"`][^'"`\n]+\.png['"`]/g) || [];
  if (pngMatches.length > 0) {
    pngReferences.push({ file: path.relative(process.cwd(), file), count: pngMatches.length, samples: pngMatches.slice(0, 3) });
  }
}

console.log('Total img tags found:', totalImgs);
console.log('Img tags without srcset:', imgsWithoutSrcset.length);
console.log('\nTop img tags without srcset:');
imgsWithoutSrcset.slice(0, 15).forEach(i => console.log(' - ' + i.file + ' : ' + i.tag));

console.log('\nFiles with .png references:');
pngReferences.forEach(p => console.log(' - ' + p.file + ' (' + p.count + '): ' + p.samples.join(', ')));
