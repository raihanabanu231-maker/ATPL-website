const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIRS = [
  path.join(__dirname, '..', 'public', 'assets', 'images'),
  path.join(__dirname, '..', 'public', 'assets', 'images', 'clients'),
  path.join(__dirname, '..', 'public', 'assets', 'images', 'stations'),
  path.join(__dirname, '..', 'public')
];

function getAllImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'scratch'].includes(entry.name)) continue;
      getAllImageFiles(fullPath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function convertAll() {
  console.log('🚀 Starting Comprehensive WebP + AVIF Image Optimization...');
  const allImages = new Set();
  for (const d of TARGET_DIRS) {
    const found = getAllImageFiles(d);
    found.forEach(f => allImages.add(f));
  }

  const files = Array.from(allImages);
  console.log(`Found ${files.length} unique source PNG/JPG images to process.`);

  let webpCreated = 0;
  let avifCreated = 0;
  let errors = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file);
    const basePath = file.slice(0, -ext.length);
    const webpPath = basePath + '.webp';
    const avifPath = basePath + '.avif';

    try {
      const isClientLogo = file.includes('clients');
      const isTransparentPng = ext.toLowerCase() === '.png';

      // 1. Generate WebP
      if (!fs.existsSync(webpPath)) {
        if (isClientLogo) {
          // Keep crisp transparency for logos, max width 240px if larger
          await sharp(file)
            .resize({ width: 240, height: 120, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 85, effort: 4 })
            .toFile(webpPath);
        } else {
          await sharp(file)
            .webp({ quality: 84, effort: 4 })
            .toFile(webpPath);
        }
        webpCreated++;
      }

      // 2. Generate AVIF
      if (!fs.existsSync(avifPath)) {
        if (isClientLogo) {
          await sharp(file)
            .resize({ width: 240, height: 120, fit: 'inside', withoutEnlargement: true })
            .avif({ quality: 78, effort: 3 })
            .toFile(avifPath);
        } else {
          await sharp(file)
            .avif({ quality: 75, effort: 3 })
            .toFile(avifPath);
        }
        avifCreated++;
      }

      if ((i + 1) % 25 === 0 || i === files.length - 1) {
        console.log(`[${i + 1}/${files.length}] Processed images...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
      errors++;
    }
  }

  console.log(`\n🎉 Image Optimization Complete!`);
  console.log(`- WebP files created: ${webpCreated}`);
  console.log(`- AVIF files created: ${avifCreated}`);
  console.log(`- Errors: ${errors}`);
}

convertAll();
