const fs = require('fs');

['public/factory-map.html', 'factory-map.html'].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/assets\/images\/atpl_logo\.png/g, 'assets/images/atpl_logo.webp');
    content = content.replace(/assets\/images\/atpl_factory_3d_interior\.jpg/g, 'assets/images/atpl_factory_3d_interior.webp');
    content = content.replace(/assets\/images\/archery_robot_clean\.png/g, 'assets/images/archery_robot_clean.webp');
    content = content.replace(/assets\/images\/atpl_archery_robot_transparent\.png/g, 'assets/images/atpl_archery_robot_transparent.webp');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated images to WebP in ${filePath}`);
  }
});
