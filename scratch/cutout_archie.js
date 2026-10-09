import sharp from 'sharp';

const input = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\atpl_official_archie_robot_1791527650601.jpg`;

async function makeCutout() {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // The background is pure/near black (r < 18, g < 18, b < 18)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const maxVal = Math.max(r, g, b);
    if (maxVal < 22) {
      data[i + 3] = 0; // 100% transparent
    } else if (maxVal < 45) {
      // Smooth antialiased edge feathering
      data[i + 3] = Math.round(((maxVal - 22) / 23) * 255);
    }
  }

  // Trim transparent bounding box
  const transparentPng = await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim()
    .toBuffer();

  await sharp(transparentPng).toFile('public/assets/images/archery_robot_clean.png');
  await sharp(transparentPng).toFile('assets/images/archery_robot_clean.png');
  await sharp(transparentPng).toFile('public/assets/images/atpl_archery_robot_transparent.png');
  await sharp(transparentPng).toFile('assets/images/atpl_archery_robot_transparent.png');

  console.log('Saved perfect transparent full-body Archery robot!');
}

makeCutout().catch(console.error);
