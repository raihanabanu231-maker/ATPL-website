import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\.user_uploaded\\media_1791522529911.pdf`;

async function extractAll() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const name = ops.argsArray[i][0];
        // Ensure object is fetched via commonObjs or page.objs
        page.objs.get(name, async (imgObj) => {
          if (imgObj && imgObj.data) {
            const channels = imgObj.data.length / (imgObj.width * imgObj.height);
            if (imgObj.width > 100 && imgObj.height > 100) {
              console.log(`Page ${p} image ${name}: ${imgObj.width}x${imgObj.height}, channels: ${channels}`);
              try {
                await sharp(Buffer.from(imgObj.data), {
                  raw: { width: imgObj.width, height: imgObj.height, channels: channels }
                })
                .png()
                .toFile(`scratch/p${p}_${name}_${imgObj.width}x${imgObj.height}.png`);
                console.log(`Saved p${p}_${name}!`);
              } catch (err) {
                console.error('Error saving image:', err.message);
              }
            }
          }
        });
      }
    }
  }
}

extractAll().catch(console.error);
