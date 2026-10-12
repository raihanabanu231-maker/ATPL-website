import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIRS_TO_PROCESS = [
  './assets/images',
  './assets/images/stations',
  './public/assets/images',
  './public/assets/images/stations'
];

async function optimizeImages() {
  console.log('Optimizing images with Sharp...');
  let totalSaved = 0;

  for (const dir of DIRS_TO_PROCESS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const filePath = path.join(dir, file);
        const webpPath = path.join(dir, `${path.basename(file, ext)}.webp`);

        try {
          const stats = fs.statSync(filePath);
          if (stats.size > 20000) { // Optimize images > 20KB
            const image = sharp(filePath);
            const metadata = await image.metadata();

            // Create WebP version
            await sharp(filePath)
              .webp({ quality: 82, effort: 4 })
              .toFile(webpPath);

            const newStats = fs.statSync(webpPath);
            const saved = stats.size - newStats.size;
            totalSaved += Math.max(0, saved);
            console.log(`Converted: ${filePath} (${(stats.size / 1024).toFixed(1)} KB) -> ${webpPath} (${(newStats.size / 1024).toFixed(1)} KB)`);
          }
        } catch (err) {
          console.error(`Error processing ${filePath}:`, err.message);
        }
      }
    }
  }

  console.log(`Optimization complete! Total bandwidth saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeImages();
