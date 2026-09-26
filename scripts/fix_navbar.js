import fs from 'fs';

const filePath = 'src/components/common/Navbar.jsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('Zap,')) {
  content = content.replace("Smartphone\n} from 'lucide-react';", "Smartphone,\n  Zap,\n  Barcode\n} from 'lucide-react';");
  content = content.replace("Smartphone\r\n} from 'lucide-react';", "Smartphone,\r\n  Zap,\r\n  Barcode\r\n} from 'lucide-react';");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Navbar.jsx imports successfully');
