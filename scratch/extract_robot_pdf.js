import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = `C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3d742525-b6cb-4bc3-a297-6741a1dc77c4\\.user_uploaded\\media_1791522529911.pdf`;

async function extractRobotFromPDF() {
  console.log('Loading PDF from:', pdfPath);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total PDF pages:', doc.numPages);

  // Extract objects or images from Page 1 and Page 12
  for (const pageNum of [1, 12, 25]) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    console.log(`Page ${pageNum} operator list length:`, ops.fnArray.length);
    
    // Look for image objects
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const imgName = ops.argsArray[i][0];
        console.log(`Found image on page ${pageNum}:`, imgName);
        try {
          const imgObj = await page.objs.get(imgName);
          if (imgObj && imgObj.data) {
            console.log(`Image ${imgName} dims:`, imgObj.width, imgObj.height, 'kind:', imgObj.kind);
            
            // Convert to PNG with sharp
            const imgBuffer = Buffer.from(imgObj.data);
            const channels = imgObj.data.length / (imgObj.width * imgObj.height);
            console.log(`Channels: ${channels}`);

            if (channels === 3 || channels === 4) {
              await sharp(imgBuffer, {
                raw: {
                  width: imgObj.width,
                  height: imgObj.height,
                  channels: channels
                }
              })
              .png()
              .toFile(`scratch/pdf_page_${pageNum}_img_${imgName}.png`);
              console.log(`Saved scratch/pdf_page_${pageNum}_img_${imgName}.png!`);
            }
          }
        } catch (e) {
          console.log(`Could not get imgObj ${imgName}:`, e.message);
        }
      }
    }
  }
}

extractRobotFromPDF().catch(console.error);
