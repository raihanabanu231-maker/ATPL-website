import sharp from 'sharp';

async function cropAndCleanRobot() {
  const input = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\.user_uploaded\\media_1791526475953.png`;
  
  // Crop the robot from the WhatsApp video player
  // The robot is centered around x=640 to 890, y=105 to 420
  const cropLeft = 645;
  const cropTop = 110;
  const cropWidth = 245;
  const cropHeight = 310;

  const cropped = await sharp(input)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toBuffer();

  const { data, info } = await sharp(cropped)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Key out the plain neutral gray background (#cfd2d6 / #d0d3d7)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is gray background
    const isGrayBg = (r > 185 && r < 225 && g > 185 && g < 225 && b > 185 && b < 225 && Math.abs(r - g) <= 8 && Math.abs(g - b) <= 8);
    const isTopCorner = (i / channels < width * 25); // Top 25 rows bg

    if (isGrayBg) {
      data[i + 3] = 0; // Transparent
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/images/archery_robot_clean.png');

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('assets/images/archery_robot_clean.png');

  console.log('Saved ultra-clean archery_robot_clean.png!');
}

cropAndCleanRobot().catch(console.error);
