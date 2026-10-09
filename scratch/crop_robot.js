import sharp from 'sharp';
import path from 'path';

const inputPath = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\.user_uploaded\\media_1791526475953.png`;

async function process() {
  const metadata = await sharp(inputPath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);
  
  // The robot is in the right window (WhatsApp) from roughly x: 57% to 93%, y: 13% to 78%
  const cropLeft = Math.round(metadata.width * 0.58);
  const cropTop = Math.round(metadata.height * 0.15);
  const cropWidth = Math.round(metadata.width * 0.34);
  const cropHeight = Math.round(metadata.height * 0.60);

  console.log('Cropping at:', { cropLeft, cropTop, cropWidth, cropHeight });

  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toFile('public/assets/images/atpl_archery_robot.png');

  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toFile('assets/images/atpl_archery_robot.png');

  console.log('Successfully extracted authentic ATPL robot image!');
}

process().catch(console.error);
