import sharp from 'sharp';

async function buildOfficialCompanyRobot() {
  // `scratch/p1_img_p0_7_197x180.png` is the EXACT robot from Slide 1 of the official ATPL PDF.
  // Let's upscale and remove background cleanly:
  const input = 'scratch/p1_img_p0_7_197x180.png';
  
  const upscaled = await sharp(input)
    .resize(394, 360, { kernel: 'lanczos3' })
    .toBuffer();

  const { data, info } = await sharp(upscaled)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // The background in the PDF slide is pure white (#ffffff)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if white background (r > 248, g > 248, b > 248)
    if (r >= 246 && g >= 246 && b >= 246) {
      data[i + 3] = 0; // 100% transparent
    } else if (r >= 238 && g >= 238 && b >= 238) {
      // smooth antialiasing
      data[i + 3] = Math.round(((246 - Math.min(r, g, b)) / 8) * 255);
    }
  }

  const cleanPng = await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim()
    .toBuffer();

  await sharp(cleanPng).toFile('public/assets/images/archery_robot_clean.png');
  await sharp(cleanPng).toFile('assets/images/archery_robot_clean.png');
  await sharp(cleanPng).toFile('public/assets/images/atpl_archery_robot_transparent.png');
  await sharp(cleanPng).toFile('assets/images/atpl_archery_robot_transparent.png');

  console.log('Saved 100% authentic official ATPL robot extracted directly from the company PDF!');
}

buildOfficialCompanyRobot().catch(console.error);
