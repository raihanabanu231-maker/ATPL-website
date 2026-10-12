const fs = require('fs');

['public/factory-map.html', 'factory-map.html'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace images with srcset and sizes
  html = html.replace(
    /<img src="assets\/images\/atpl_logo\.webp" alt="ATPL Logo">/g,
    '<img src="assets/images/atpl_logo.webp" srcset="assets/images/atpl_logo.webp 1x, assets/images/atpl_logo.webp 2x" sizes="180px" loading="lazy" decoding="async" alt="ATPL Logo">'
  );

  html = html.replace(
    /<img src="assets\/images\/atpl_logo\.webp" alt="ATPL Logo" style="width:38px;height:38px;object-fit:contain;">/g,
    '<img src="assets/images/atpl_logo.webp" srcset="assets/images/atpl_logo.webp 1x, assets/images/atpl_logo.webp 2x" sizes="38px" loading="lazy" decoding="async" alt="ATPL Logo" style="width:38px;height:38px;object-fit:contain;">'
  );

  html = html.replace(
    /<img id="bg" alt="ATPL smart factory digital twin" src="assets\/images\/atpl_factory_3d_interior\.webp">/g,
    '<img id="bg" alt="ATPL smart factory digital twin" src="assets/images/atpl_factory_3d_interior.webp" srcset="assets/images/atpl_factory_3d_interior.webp 1920w, assets/images/atpl_factory_3d_interior.webp 960w" sizes="100vw" loading="lazy" decoding="async">'
  );

  html = html.replace(
    /<img src="assets\/images\/archery_robot_clean\.webp" alt="Archery Technocrats Robot Mascot"/g,
    '<img src="assets/images/archery_robot_clean.webp" srcset="assets/images/archery_robot_clean.webp 1x, assets/images/archery_robot_clean.webp 2x" sizes="(max-width: 768px) 120px, 200px" loading="lazy" decoding="async" alt="Archery Technocrats Robot Mascot"'
  );

  html = html.replace(
    /<img id="pPhotoImg" src="assets\/images\/stations\/trace\.webp" alt="ATPL Project Hardware Photo"/g,
    '<img id="pPhotoImg" src="assets/images/stations/trace.webp" srcset="assets/images/stations/trace.webp 1x, assets/images/stations/trace.webp 2x" sizes="(max-width: 768px) 100vw, 400px" loading="lazy" decoding="async" alt="ATPL Project Hardware Photo"'
  );

  html = html.replace(
    /<img src="assets\/images\/atpl_archery_robot_transparent\.webp" alt="Archie Robot">/g,
    '<img src="assets/images/atpl_archery_robot_transparent.webp" srcset="assets/images/atpl_archery_robot_transparent.webp 1x, assets/images/atpl_archery_robot_transparent.webp 2x" sizes="40px" loading="lazy" decoding="async" alt="Archie Robot">'
  );

  html = html.replace(
    /<img src="assets\/images\/atpl_archery_robot_transparent\.webp" alt="Archie" style="width:100%;height:100%;object-fit:contain;">/g,
    '<img src="assets/images/atpl_archery_robot_transparent.webp" srcset="assets/images/atpl_archery_robot_transparent.webp 1x, assets/images/atpl_archery_robot_transparent.webp 2x" sizes="48px" loading="lazy" decoding="async" alt="Archie" style="width:100%;height:100%;object-fit:contain;">'
  );

  html = html.replace(
    /<img src="assets\/images\/atpl_archery_robot_transparent\.webp" alt="Archie Robot" style="width:100%;height:100%;object-fit:contain;">/g,
    '<img src="assets/images/atpl_archery_robot_transparent.webp" srcset="assets/images/atpl_archery_robot_transparent.webp 1x, assets/images/atpl_archery_robot_transparent.webp 2x" sizes="48px" loading="lazy" decoding="async" alt="Archie Robot" style="width:100%;height:100%;object-fit:contain;">'
  );

  html = html.replace(
    /<img src="assets\/images\/stations\/\$\{s\[7\]\}" alt="\$\{s\[0\]\}" style="width:100%;height:100%;object-fit:cover;transition:transform \.3s;"/g,
    '<img src="assets/images/stations/${s[7]}" srcset="assets/images/stations/${s[7]} 1x, assets/images/stations/${s[7]} 2x" sizes="(max-width: 768px) 100vw, 360px" loading="lazy" decoding="async" alt="${s[0]}" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;"'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated srcset & sizes in', filePath);
});
