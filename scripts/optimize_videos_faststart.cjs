const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'assets', 'videos');

function faststartBuffer(buf, filename) {
  let offset = 0;
  const atoms = [];
  while (offset < buf.length) {
    if (offset + 8 > buf.length) break;
    let size = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    let headerSize = 8;
    if (size === 1) {
      if (offset + 16 > buf.length) break;
      size = Number(buf.readBigUInt64BE(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = buf.length - offset;
    }
    atoms.push({ type, size, offset, headerSize });
    offset += size;
  }

  const mdatIndex = atoms.findIndex(a => a.type === 'mdat');
  const moovIndex = atoms.findIndex(a => a.type === 'moov');

  if (moovIndex === -1 || mdatIndex === -1) {
    console.log(`[SKIP] ${filename}: Missing moov or mdat`);
    return null;
  }

  if (moovIndex < mdatIndex) {
    console.log(`[OK]   ${filename}: Already FastStart (moov before mdat)`);
    return null;
  }

  const moovAtom = atoms[moovIndex];
  const moovBuf = Buffer.from(buf.subarray(moovAtom.offset, moovAtom.offset + moovAtom.size));
  const shift = moovAtom.size;

  let stcoCount = 0;
  let co64Count = 0;

  for (let i = 0; i <= moovBuf.length - 8; i++) {
    const type = moovBuf.toString('ascii', i + 4, i + 8);
    if (type === 'stco') {
      const count = moovBuf.readUInt32BE(i + 12);
      stcoCount += count;
      for (let j = 0; j < count; j++) {
        const entryPos = i + 16 + (j * 4);
        if (entryPos + 4 <= moovBuf.length) {
          const oldOff = moovBuf.readUInt32BE(entryPos);
          moovBuf.writeUInt32BE(oldOff + shift, entryPos);
        }
      }
    } else if (type === 'co64') {
      const count = moovBuf.readUInt32BE(i + 12);
      co64Count += count;
      for (let j = 0; j < count; j++) {
        const entryPos = i + 16 + (j * 8);
        if (entryPos + 8 <= moovBuf.length) {
          const oldOff = moovBuf.readBigUInt64BE(entryPos);
          moovBuf.writeBigUInt64BE(oldOff + BigInt(shift), entryPos);
        }
      }
    }
  }

  const parts = [];
  for (let i = 0; i < atoms.length; i++) {
    if (i === mdatIndex) {
      parts.push(moovBuf);
      parts.push(buf.subarray(atoms[i].offset, atoms[i].offset + atoms[i].size));
    } else if (i === moovIndex) {
      // Omit original moov at the end
    } else {
      parts.push(buf.subarray(atoms[i].offset, atoms[i].offset + atoms[i].size));
    }
  }

  const output = Buffer.concat(parts);
  console.log(`[FIX]  ${filename}: FastStart enabled! (stco: ${stcoCount}, co64: ${co64Count}) Size: ${(output.length / (1024*1024)).toFixed(2)} MB`);
  return output;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
console.log(`Found ${files.length} MP4 files in ${dir}`);

let converted = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  const buf = fs.readFileSync(filePath);
  const fixed = faststartBuffer(buf, file);
  if (fixed) {
    fs.writeFileSync(filePath, fixed);
    converted++;
  }
}

console.log(`\nSuccessfully converted ${converted} files to FastStart progressive web streaming.`);

