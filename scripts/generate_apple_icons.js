import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAppleIcons() {
  const publicDir = 'public';
  const logoPath = path.join(publicDir, 'favicon.png');

  if (!fs.existsSync(logoPath)) {
    console.error('favicon.png not found!');
    return;
  }

  // 1. Generate apple-touch-icon.png (180x180)
  // Apple recommends 180x180 with solid background and comfortable padding (e.g. 140x140 logo centered in 180x180 canvas)
  const logoResizedForIcon = await sharp(logoPath)
    .resize(140, 140, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background per Apple guidelines
    }
  })
    .composite([{ input: logoResizedForIcon, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('✓ Created public/apple-touch-icon.png (180x180)');

  // Also create apple-touch-icon-precomposed.png
  fs.copyFileSync(
    path.join(publicDir, 'apple-touch-icon.png'),
    path.join(publicDir, 'apple-touch-icon-precomposed.png')
  );
  console.log('✓ Created public/apple-touch-icon-precomposed.png (180x180)');

  // 2. Generate apple-touch-startup-image.png (Splash Screen: 1242 x 2688 centered logo on dark premium ATPL navy background #040914)
  const logoResizedForSplash = await sharp(logoPath)
    .resize(480, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 1242,
      height: 2688,
      channels: 4,
      background: { r: 4, g: 9, b: 20, alpha: 1 } // #040914
    }
  })
    .composite([{ input: logoResizedForSplash, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-startup-image.png'));

  console.log('✓ Created public/apple-touch-startup-image.png (1242x2688)');
}

generateAppleIcons().catch(err => {
  console.error('Error generating apple icons:', err);
  process.exit(1);
});
