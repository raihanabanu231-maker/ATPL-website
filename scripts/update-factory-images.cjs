const fs = require('fs');

const stations = [
  'trace', 'pms', 'warehouse', 'rfid', 'robot_arm', 'vision_ai',
  'erp_sync', 'drones', 'scanners', 'printers', 'software_lab', 'supercomputer'
];

['public/factory-map.html', 'factory-map.html'].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    stations.forEach(st => {
      content = content.replace(new RegExp(`"${st}\\.jpg"`, 'g'), `"${st}.webp"`);
      content = content.replace(new RegExp(`'${st}\\.jpg'`, 'g'), `'${st}.webp'`);
      content = content.replace(new RegExp(`stations/${st}\\.jpg`, 'g'), `stations/${st}.webp`);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully updated ${filePath} to use .webp station images.`);
  }
});
