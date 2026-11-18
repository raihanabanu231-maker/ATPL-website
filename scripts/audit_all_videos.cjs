const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'assets', 'videos');
const files = [
  'scanner_360.mp4',
  'scanner_cordless_360.mp4',
  'scanner_dpm_360.mp4',
  'scanner_conveyor_360.mp4',
  'printer_360.mp4',
  'printer_rfid_360.mp4',
  'printer_mobile_360.mp4',
  'printer_desktop_360.mp4',
  'printer_idcard_360.mp4',
  'mobility_360.mp4',
  'mobility_field_360.mp4',
  'mobility_cold_storage_360.mp4',
  'mobility_tablet_360.mp4',
  'rfid_antenna_360.mp4',
  'laser_marker_360.mp4',
  'uv_laser_360.mp4',
  'dotpeen_360.mp4',
  'touch_computer_360.mp4',
  'kiosk_360.mp4',
  'voice_headset_360.mp4'
];

console.log('AUDITING ALL 20 VIDEOS IN ' + dir + ':\n');

files.forEach((file, idx) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`[${idx+1}] MISSING: ${file}`);
    return;
  }
  const stat = fs.statSync(filePath);
  const buf = fs.readFileSync(filePath);

  // Check atoms
  let offset = 0;
  const atoms = [];
  while (offset < buf.length) {
    if (offset + 8 > buf.length) break;
    const size = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    atoms.push(type);
    if (size === 0 || size === 1 || offset + size > buf.length) break;
    offset += size;
  }

  // Find duration and frames
  let durationSec = 0;
  let frameCount = 0;
  for (let i = 0; i < buf.length - 32; i++) {
    if (buf.toString('ascii', i + 4, i + 8) === 'mdhd') {
      const version = buf.readUInt8(i + 8);
      const timescale = buf.readUInt32BE(i + (version === 0 ? 20 : 28));
      const duration = version === 0 ? buf.readUInt32BE(i + 24) : Number(buf.readBigUInt64BE(i + 32));
      durationSec = (duration / timescale).toFixed(2);
      break;
    }
  }

  for (let i = 0; i < buf.length - 16; i++) {
    if (buf.toString('ascii', i + 4, i + 8) === 'stsz') {
      frameCount = buf.readUInt32BE(i + 16);
      break;
    }
  }

  console.log(`[${String(idx+1).padStart(2)}] ${file.padEnd(30)} Size: ${(stat.size/(1024*1024)).toFixed(2)}MB | Dur: ${durationSec}s | Frames: ${frameCount} | Atoms: ${atoms.join('->')}`);
});

