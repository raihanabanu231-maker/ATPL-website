import sharp from 'sharp';

async function perfectTransparentCutout() {
  const input = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\.user_uploaded\\media_1791526475953.png`;
  
  // Crop precisely to the robot region in WhatsApp video player
  const cropLeft = 650;
  const cropTop = 115;
  const cropWidth = 238;
  const cropHeight = 300;

  const cropped = await sharp(input)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toBuffer();

  const { data, info } = await sharp(cropped)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Let's do a flood-fill / border threshold from the 4 outer edges of the image
  // Any pixel that is reachable from the border and has color close to the WhatsApp video gray (#b0b5ba to #e0e5eb) gets alpha = 0.
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to get index
  const idx = (x, y) => (y * width + x) * channels;
  const pidx = (x, y) => y * width + x;

  // Push all border pixels to queue
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
  }

  // BFS flood-fill transparency
  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    const p = pidx(x, y);
    if (visited[p]) continue;
    visited[p] = 1;

    const i = idx(x, y);
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if this pixel is part of the background
    // Background is near neutral gray where r, g, b are close to each other
    // and not the dark black robotic arms (r<60) and not the bright white/cyan parts
    const isNeutral = Math.abs(r - g) < 22 && Math.abs(g - b) < 22 && Math.abs(r - b) < 22;
    const isBgGray = isNeutral && (r > 120 && r < 240);
    const isBorderPixel = (x < 4 || x >= width - 4 || y < 4 || y >= height - 4);

    if (isBgGray || isBorderPixel) {
      data[i + 3] = 0; // completely transparent

      // Check neighbors
      const neighbors = [
        [x + 1, y], [x - 1, y],
        [x, y + 1], [x, y - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[pidx(nx, ny)]) {
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Also clean up any isolated background pixels in the outer 15% margin
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = pidx(x, y);
      const i = idx(x, y);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const isNeutral = Math.abs(r - g) < 18 && Math.abs(g - b) < 18;
      if (isNeutral && r > 130 && r < 235 && (x < 35 || x > width - 35 || y < 25 || y > height - 25)) {
        data[i + 3] = 0;
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/images/archery_robot_clean.png');

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('assets/images/archery_robot_clean.png');

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/images/atpl_archery_robot_transparent.png');

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('assets/images/atpl_archery_robot_transparent.png');

  console.log('Finished 100% clean transparent background removal!');
}

perfectTransparentCutout().catch(console.error);
