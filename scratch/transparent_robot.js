import sharp from 'sharp';

async function makeTransparent() {
  const { data, info } = await sharp('public/assets/images/atpl_archery_robot.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  
  // Sample background color near the top-left corner
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  console.log('Background sample color:', bgR, bgG, bgB);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is close to the neutral light gray background (around 205-225)
    const diff = Math.max(Math.abs(r - bgR), Math.abs(g - bgG), Math.abs(b - bgB));
    
    // Also make sure we don't erase the white body: the white robot body has high brightness (r>235, g>235, b>235) or cyan eyes (b > 150, r < 100) or dark arms (r<80)
    const isGrayBg = (r > 195 && r < 230 && g > 195 && g < 230 && b > 195 && b < 230 && Math.abs(r-g)<15 && Math.abs(g-b)<15);

    if (diff < 18 || isGrayBg) {
      data[i + 3] = 0; // Transparent
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/images/atpl_archery_robot_transparent.png');

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('assets/images/atpl_archery_robot_transparent.png');

  console.log('Transparent robot created successfully!');
}

makeTransparent().catch(console.error);
