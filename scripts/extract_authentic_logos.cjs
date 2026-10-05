const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const UPLOADED_DIR = 'C:/Users/user/.gemini/antigravity-ide/brain/591d0075-b77c-4ad2-b3cd-700ee68b59a8/.user_uploaded';
const OUTPUT_DIR = path.join(__dirname, '../public/assets/images/clients');
const SRC_DATA_FILE = path.join(__dirname, '../src/data/realClientsData.js');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const SHEETS = [
  {
    file: path.join(UPLOADED_DIR, 'media_1791189034019.png'),
    logos: [
      // Row 0
      { slug: 'forbes-macsaid', name: 'Forbes Macsaid', category: 'Heavy Industry' },
      { slug: 'abb', name: 'ABB', category: 'Heavy Industry & Robotics' },
      { slug: 'abvr-traders', name: 'ABVR Traders', category: 'Industrial Supplies' },
      { slug: 'ap-tools', name: 'AP Tools', category: 'Tooling & Engineering' },
      { slug: 'apsbcl', name: 'APSBCL (Govt of AP)', category: 'Govt & Beverages' },
      { slug: 'astc', name: 'ASTC', category: 'Electrical & Industrial' },
      { slug: 'atc-tyres', name: 'ATC Tyres', category: 'Automotive & Tyres' },
      // Row 1
      { slug: 'avn', name: 'AVN Ayurveda', category: 'Healthcare & Pharma' },
      { slug: 'absolute', name: 'Absolute Brands & Retail', category: 'Retail & FMCG' },
      { slug: 'ace-micromatic', name: 'AceMicromatic Group', category: 'CNC & Manufacturing' },
      { slug: 'aconex', name: 'Aconex', category: 'Enterprise Technology' },
      { slug: 'aditya-enterprise', name: 'Aditya Enterprise', category: 'Hardware Supply' },
      { slug: 'ak-engineering', name: 'AK Engineering', category: 'Precision Engineering' },
      { slug: 'akshaya-power', name: 'Akshaya Power Solution', category: 'Renewable Energy' },
      // Row 2
      { slug: 'amay-enterprises', name: 'Amay Enterprises', category: 'Industrial Supplies' },
      { slug: 'ambal-group', name: 'Ambal Group of Companies', category: 'Manufacturing' },
      { slug: 'amman-seals', name: 'Amman Seals', category: 'Industrial Packaging' },
      { slug: 'apex', name: 'Apex Power & Process', category: 'Power & Process Automation' },
      { slug: 'apicom', name: 'Apicom Automation', category: 'Automotive Testing' },
      { slug: 'apollo-tyres', name: 'Apollo Tyres', category: 'Automotive & Tyres' },
      { slug: 'aptamitra', name: 'Aptamitra', category: 'Financial & Services' },
      // Row 3
      { slug: 'arcelormittal', name: 'ArcelorMittal', category: 'Steel & Heavy Metals' },
      { slug: 'arcus', name: 'Arcus', category: 'Architecture & Engineering' },
      { slug: 'arun-automobiles', name: 'Arun Automobiles', category: 'Automotive' },
      { slug: 'aspire-systems', name: 'Aspire Systems', category: 'Enterprise IT' },
      { slug: 'avalon', name: 'Avalon Technologies', category: 'Electronics EMS' },
      { slug: 'axis-technologies', name: 'Axis Technologies', category: 'Engineering Tech' },
      { slug: 'bbl-daido', name: 'BBL Daido', category: 'Automotive Bearings' },
      // Row 4
      { slug: 'bhawani-automobiles', name: 'Bhawani Automobiles', category: 'Automotive' },
      { slug: 'brahmins-foods', name: 'Brahmins Foods India', category: 'FMCG & Food Processing' },
      { slug: 'bps', name: 'BPS', category: 'Industrial Packaging' },
      { slug: 'buildmyinfra', name: 'BuildMyInfra', category: 'Infrastructure & EPC' },
      { slug: 'bundy-india', name: 'Bundy India', category: 'Automotive Fluid Systems' },
      { slug: 'baashyaam', name: 'Baashyaam Group', category: 'Infrastructure & Real Estate' },
      { slug: 'basell-polyolefins', name: 'Basell Polyolefins', category: 'Chemicals & Polymers' },
      // Row 5
      { slug: 'beckman-coulter', name: 'Beckman Coulter', category: 'Diagnostics & Healthcare' },
      { slug: 'bel-bharat-electronics', name: 'Bharat Electronics (BEL)', category: 'Defense & Aerospace' },
      { slug: 'binary-technologies', name: 'Binary Technologies', category: 'IT & Automation' },
      { slug: 'biovet', name: 'Biovet Animal Health', category: 'Pharma & Biotech' },
      { slug: 'bluemoon-infotech', name: 'Bluemoon Infotech', category: 'Retail Tech' },
      { slug: 'borgwarner', name: 'BorgWarner', category: 'Automotive Tier-1' },
      { slug: 'brightside', name: 'Brightside Enterprises', category: 'Industrial Supplies' }
    ]
  },
  {
    file: path.join(UPLOADED_DIR, 'media_1791189046594.png'),
    logos: [
      // Row 0
      { slug: 'bundl-swiggy', name: 'Bundl Technologies (Swiggy)', category: 'Supply Chain & Logistics' },
      { slug: 'campbell-travels', name: 'Campbell Travels', category: 'Logistics' },
      { slug: 'cavendish-industries', name: 'Cavendish Industries (JK Tyre)', category: 'Automotive Tyres' },
      { slug: 'cedi-tech', name: 'CEDI Tech Consulting', category: 'IT Consulting' },
      { slug: 'chidambaram-fishnets', name: 'Chidambaram Fishnets', category: 'Manufacturing & Textiles' },
      { slug: 'cholayil', name: 'Cholayil (Medimix)', category: 'FMCG & Personal Care' },
      { slug: 'codentrix', name: 'Codentrix Automation', category: 'Robotics & Automation' },
      // Row 1
      { slug: 'cpf-india', name: 'CPF (India)', category: 'Agro & Food Processing' },
      { slug: 'caltech-polymers', name: 'Caltech Polymers', category: 'Polymers & Chemicals' },
      { slug: 'caplin-steriles', name: 'Caplin Steriles USA', category: 'Pharma & Injectables' },
      { slug: 'cavli-wireless', name: 'Cavli Wireless', category: 'IIoT & Wireless Telemetry' },
      { slug: 'classic-technologies', name: 'Classic Technologies', category: 'Engineering Tech' },
      { slug: 'cochin-exports', name: 'Cochin Exports', category: 'Exporters & Logistics' },
      { slug: 'cofle-taylor', name: 'Cofle Taylor', category: 'Automotive Control Cables' },
      // Row 2
      { slug: 'comer-industries', name: 'Comer Industries', category: 'Heavy Industrial Gears' },
      { slug: 'cams', name: 'CAMS (Computer Age Management)', category: 'Financial Tech' },
      { slug: 'conversant', name: 'Conversant Software', category: 'Enterprise Software' },
      { slug: 'magna-cosma', name: 'Magna Cosma International', category: 'Automotive Tier-1' },
      { slug: 'crown-computer', name: 'Crown Computer Products', category: 'AIDC Hardware' },
      { slug: 'daksh-enterprises', name: 'Daksh Enterprises', category: 'Industrial Supplies' },
      { slug: 'delta-jewellers', name: 'Delta Jewellers', category: 'Retail & Luxury' },
      // Row 3
      { slug: 'destiny-lifestyle', name: 'Destiny Lifestyle', category: 'Textiles & Apparel' },
      { slug: 'diadora', name: 'Diadora Shoes', category: 'Footwear & Apparel' },
      { slug: 'dixcy-textiles', name: 'Dixcy Textiles', category: 'Textiles & FMCG' },
      { slug: 'dixon-technologies', name: 'Dixon Technologies', category: 'Electronics EMS Leader' },
      { slug: 'deash-trade', name: 'DeAsh Trade Net', category: 'Logistics & Trade' },
      { slug: 'dell-technologies', name: 'Dell Technologies', category: 'IT & Hardware' },
      { slug: 'diamond-engineering', name: 'Diamond Engineering', category: 'Heavy Fabrication' },
      // Row 4
      { slug: 'digital-data-automation', name: 'Digital Data Automation', category: 'Industrial Automation' },
      { slug: 'dimesco-footcare', name: 'Dimesco Footcare', category: 'Healthcare' },
      { slug: 'dwarkadhish-automobiles', name: 'Dwarkadhish Automobiles', category: 'Automotive' },
      { slug: 'dynamic-industrial', name: 'Dynamic Industrial Agencies', category: 'Industrial Solutions' },
      { slug: 'dynaspede', name: 'Dynaspede Integrated Systems', category: 'Motion Control & Drives' },
      { slug: 'efix-techno', name: 'E Fix Techno Solutions', category: 'Engineering Tech' },
      { slug: 'everlife-power', name: 'Everlife Power Systems', category: 'Power & Utilities' },
      // Row 5
      { slug: 'evoride-motors', name: 'Evoride Motors', category: 'Electric Vehicles' },
      { slug: 'excellerate', name: 'Excellerate Enterprises', category: 'Manufacturing' },
      { slug: 'eberspaecher', name: 'Eberspaecher Suetrak', category: 'Automotive Thermal Systems' },
      { slug: 'efficacy-technologies', name: 'Efficacy IT', category: 'Enterprise Technology' },
      { slug: 'emerson', name: 'Emerson Process Management', category: 'Process Automation' },
      { slug: 'endress-hauser', name: 'Endress+Hauser', category: 'Process Instrumentation' },
      { slug: 'entrib-analytics', name: 'Entrib Analytics', category: 'IIoT & Shopfloor Analytics' }
    ]
  },
  {
    file: path.join(UPLOADED_DIR, 'media_1791189064449.png'),
    logos: [
      // Row 0
      { slug: 'ess-gee-trendz', name: 'Ess Gee Trendz Retail', category: 'Retail & Fashion' },
      { slug: 'evergreen-enterprises', name: 'Evergreen Enterprises', category: 'Industrial Goods' },
      { slug: 'evergreen-electricals', name: 'Evergreen Electricals', category: 'Electrical Systems' },
      { slug: 'excel-copier', name: 'Excel Copier Systems', category: 'Printing & AIDC' },
      { slug: 'flyjac-logistics', name: 'Flyjac Logistics (Hitachi Transport)', category: '3PL & Global Freight' },
      { slug: 'foodswing', name: 'Foodswing Enterprises', category: 'Food & Beverage' },
      { slug: 'forgetech', name: 'Forgetech Technologies', category: 'Metal Forging' },
      // Row 1
      { slug: 'fenesta', name: 'Fenesta Building Systems', category: 'Building Materials' },
      { slug: 'finetech-enterprises', name: 'Finetech Enterprises', category: 'Precision Tooling' },
      { slug: 'flex-logistics', name: 'Flex Logistics', category: 'Supply Chain' },
      { slug: 'friends-electric', name: 'Friends Electric Works', category: 'Electrical Equipment' },
      { slug: 'futech-computers', name: 'Futech Computers', category: 'Hardware' },
      { slug: 'future-techniks', name: 'Future Techniks', category: 'Packaging Machinery' },
      { slug: 'ganaka-technologies', name: 'Ganaka Technologies', category: 'Engineering Tech' },
      // Row 2
      { slug: 'gmr-airports', name: 'GMR Airport Developers', category: 'Aviation & Infrastructure' },
      { slug: 'gmr-goa-airport', name: 'GMR Goa International Airport', category: 'Aviation & Baggage RFID' },
      { slug: 'gsi-global-sources', name: 'GSI (Global Sources India)', category: 'Global Trade' },
      { slug: 'gem-paints', name: 'Gem Paints', category: 'Chemicals & Coatings' },
      { slug: 'gofrugal', name: 'Gofrugal ERP', category: 'Retail & POS Software' },
      { slug: 'golden-leaf', name: 'Golden Leaf', category: 'Agro & Packaging' },
      { slug: 'grace-suppliers', name: 'Grace Suppliers', category: 'Industrial Supplies' },
      // Row 3
      { slug: 'green-power', name: 'Green Power', category: 'Clean Energy' },
      { slug: 'green-battery-zone', name: 'Green Battery Zone', category: 'EV Battery Tech' },
      { slug: 'gunjan-jewels', name: 'Gunjan Jewels', category: 'Jewellery & RFID Tagging' },
      { slug: 'harsha-agencies', name: 'Harsha Agencies', category: 'Distribution' },
      { slug: 'harting-india', name: 'HARTING India', category: 'Industrial Connectivity & RFID' },
      { slug: 'hatsun-agro', name: 'HAP (Hatsun Agro Product)', category: 'Dairy & Cold Chain FMCG' },
      { slug: 'hi-tech-arai', name: 'Hi-Tech Arai', category: 'Automotive Rubber Moldings' },
      // Row 4
      { slug: 'hsi-automotives', name: 'HSI Automotives (Hwaseung)', category: 'Automotive Sealing Systems' },
      { slug: 'hanil-tube', name: 'Hanil Tube India', category: 'Automotive Fluid Lines' },
      { slug: 'haspo-technologies', name: 'Haspo Technologies', category: 'Automation Engineering' },
      { slug: 'hengst-filtration', name: 'Hengst Filtration', category: 'Automotive Filtration' },
      { slug: 'herbalife-nutrition', name: 'Herbalife Nutrition', category: 'Nutrition & FMCG' },
      { slug: 'hexmoto-controls', name: 'Hexmoto Controls', category: 'Automotive Electronics' },
      { slug: 'hindustan-unilever', name: 'Hindustan Unilever (HUL)', category: 'FMCG Conglomerate' },
      // Row 5
      { slug: 'iit-madras', name: 'IIT Madras Research Park', category: 'Academic & R&D Institute' },
      { slug: 'indian-power-press', name: 'Indian Power Press Engineers', category: 'Heavy Stamping Machinery' },
      { slug: 'ip-rings', name: 'IP Rings (Amalgamations Group)', category: 'Automotive Engine Components' },
      { slug: 'intech-systems', name: 'Intech Systems Chennai', category: 'Industrial Automation' },
      { slug: 'ivy-mobility', name: 'Ivy Mobility Solutions', category: 'DSD & Route Accounting' },
      { slug: 'jj-automation', name: 'J.J Automation and Controls', category: 'PLC & Control Panels' },
      { slug: 'jes-solutions', name: 'JES Foundation Solutions', category: 'Geotechnical Engineering' }
    ]
  },
  {
    file: path.join(UPLOADED_DIR, 'media_1791189078126.png'),
    logos: [
      // Row 0
      { slug: 'jj-soft-techno', name: 'JJ Soft Techno', category: 'Software Development' },
      { slug: 'jamna-auto', name: 'Jamna Auto Industries', category: 'Automotive Suspensions' },
      { slug: 'jindal-aluminium', name: 'Jindal Aluminium', category: 'Aluminium Extrusions & Metals' },
      { slug: 'kk-packaging', name: 'K.K. Packaging (HUL CSA)', category: 'Secondary Packaging' },
      { slug: 'kems-auto', name: 'KEMS Auto Components', category: 'Automotive Stamping' },
      { slug: 'kiml', name: 'KIML (Kyungshin Motherson)', category: 'Wiring Harnesses' },
      { slug: 'klas', name: 'KLAS Precision', category: 'Precision Tooling' },
      // Row 1
      { slug: 'kms-solutions', name: 'KMS POS Tech Solutions', category: 'Retail Hardware' },
      { slug: 'kosei-minda', name: 'Kosei Minda Aluminum', category: 'Alloy Wheels & Die Casting' },
      { slug: 'kst-infotech', name: 'KST Infotech', category: 'IT Solutions' },
      { slug: 'kv-business', name: 'KV Business Solutions', category: 'Enterprise ERP' },
      { slug: 'karuna-management', name: 'Karuna Management Services', category: 'Corporate Services' },
      { slug: 'kasthuri-jewels', name: 'Kasthuri Jewels', category: 'Retail Jewellery' },
      { slug: 'kerry-indev', name: 'Kerry Indev Logistics', category: 'Global Freight & CFS' },
      // Row 2
      { slug: 'korea-fuel-tech', name: 'Korea Fuel Tech (KFTC)', category: 'Automotive Fuel Systems' },
      { slug: 'koshala-motors', name: 'Koshala Motors', category: 'Automotive Dealerships' },
      { slug: 'lt-hydrocarbon', name: 'L&T Hydrocarbon Engineering', category: 'Oil & Gas EPC' },
      { slug: 'ls-automotive', name: 'LS Automotive India', category: 'Automotive Switches & Relays' },
      { slug: 'lalithaa-jewellery', name: 'Lalithaa Jewellery Mart', category: 'Jewellery Retail Chain' },
      { slug: 'larsen-toubro', name: 'Larsen & Toubro (L&T)', category: 'Heavy EPC & Defense' },
      { slug: 'linkedin', name: 'LinkedIn Professional Network', category: 'Technology' },
      // Row 3
      { slug: 'mb-technologies', name: 'M & B Technologies', category: 'Hardware Automation' },
      { slug: 'mb-traders', name: 'M B Traders', category: 'Industrial Supplies' },
      { slug: 'ml-automobiles', name: 'M.L Automobiles', category: 'Automotive Dealership' },
      { slug: 'mm-enterprises', name: 'M.M. Enterprises', category: 'Industrial Distribution' },
      { slug: 'macro-automation', name: 'Macro Automation Solutions', category: 'Factory Robotics' },
      { slug: 'magna-automotive', name: 'Magna Automotive India', category: 'Automotive Systems Tier-1' },
      { slug: 'mansarovar-enterprises', name: 'Mansarovar Enterprises', category: 'Industrial Trading' },
      // Row 4
      { slug: 'maruthi-electrical', name: 'Maruthi Electrical & Electronics', category: 'Electrical Equipment' },
      { slug: 'maxcode-solutions', name: 'Maxcode Solutions', category: 'Barcode & RFID Solutions' },
      { slug: 'melss', name: 'MEL Systems and Services (MELSS)', category: 'Aerospace & Electronics Testing' },
      { slug: 'metro-enterprise', name: 'Metro Enterprise', category: 'Packaging Materials' },
      { slug: 'micro-macro', name: 'Micro Macro Quality Engineering', category: 'CMM & Quality Testing' },
      { slug: 'mjunction', name: 'Mjunction Services (Tata Steel / SAIL)', category: 'B2B E-Commerce & Logistics' },
      { slug: 'modenik-lifestyle', name: 'Modenik Lifestyle (Dixcy & Enamor)', category: 'Textiles & Apparel' },
      // Row 5
      { slug: 'movin-express', name: 'Movin Express (InterGlobe & UPS)', category: 'B2B Express Logistics' },
      { slug: 'manifest-services', name: 'Manifest Services', category: 'Facility Management' },
      { slug: 'marposs-india', name: 'Marposs India', category: 'Precision Metrology & Gauging' },
      { slug: 'marvel-automation', name: 'Marvel Automation', category: 'Safety & Automation' },
      { slug: 'maxworth-electronic', name: 'Maxworth Electronic Systems', category: 'AIDC Systems' },
      { slug: 'nexgen-it', name: 'Nexgen IT Solutions', category: 'IT Infrastructure' },
      { slug: 'nifco-south-india', name: 'Nifco South India', category: 'Plastic Automotive Fasteners' }
    ]
  },
  {
    file: path.join(UPLOADED_DIR, 'media_1791189097022.png'),
    logos: [
      // Row 0
      { slug: 'nifty-tools', name: 'Nifty Tools & Technologies', category: 'Precision Cutting Tools' },
      { slug: 'om-enterprise', name: 'Om Enterprise', category: 'Industrial Automation' },
      { slug: 'otto-clothing', name: 'OTTO Clothing', category: 'Apparel & Retail' },
      { slug: 'oasis-india', name: 'Oasis India IT Store', category: 'IT Retail' },
      { slug: 'okaya-power', name: 'Okaya Power', category: 'Batteries & Inverters' },
      { slug: 'ola-electric', name: 'Ola Electric FutureFactory', category: 'EV Manufacturing' },
      { slug: 'ondevice-solutions', name: 'OnDevice Solutions', category: 'Enterprise Mobility' },
      // Row 1
      { slug: 'origin-technology', name: 'Origin Technology Associates', category: 'Consulting' },
      { slug: 'orisenc', name: 'Orisenc Technologies', category: 'Embedded Systems' },
      { slug: 'ph-solution', name: 'pH Solution Hub', category: 'Lab Testing & QC' },
      { slug: 'pha-india', name: 'PHA India Limited', category: 'Automotive Door Modules' },
      { slug: 'polyspin-exports', name: 'Polyspin Exports', category: 'FIBC Bags & Packaging' },
      { slug: 'pranita-enterprises', name: 'Pranita Enterprises', category: 'Industrial Supplies' },
      { slug: 'psa-avtec', name: 'PSA AVTEC Powertrain (Stellantis)', category: 'Engine & Transmission OEM' },
      // Row 2
      { slug: 'palash-enterprises', name: 'Palash Enterprises', category: 'Industrial Distribution' },
      { slug: 'pearl-creations', name: 'Pearl Creations', category: 'Textiles' },
      { slug: 'pegatron-electronics', name: 'Pegatron Electronics India', category: 'High-Tech Electronics EMS' },
      { slug: 'plus-orthopaedics', name: 'Plus Orthopaedics India', category: 'Medical Devices & Implants' },
      { slug: 'power-automate', name: 'Power Automate', category: 'Robotic Process Automation' },
      { slug: 'pro-mech', name: 'Pro Mech Enterprises', category: 'Ground Support Systems' },
      { slug: 'proconnect-logistics', name: 'Proconnect Integrated Logistics (Redington)', category: '3PL & Supply Chain' },
      // Row 3
      { slug: 'protocol-labels', name: 'Protocol Labels India', category: 'Specialized Barcode Labels' },
      { slug: 'public-health-centre', name: 'Public Health Centre', category: 'Healthcare & Hospital' },
      { slug: 'qube-cinema', name: 'Qube Cinema Technologies', category: 'Digital Cinema Servers' },
      { slug: 'quality-engineering-qes', name: 'Quality Engineering Solutions (QES)', category: 'NDT & Inspection' },
      { slug: 'quantumid', name: 'QuantumID Technologies', category: 'Baggage RFID Portals' },
      { slug: 'rane-madras', name: 'Rane (Madras) Limited', category: 'Steering & Suspension OEM' },
      { slug: 'rajkamal-barscan', name: 'Rajkamal Barscan Systems', category: 'AIDC Scanners' },
      // Row 4
      { slug: 'rapidtec', name: 'Rapidtec Enterprises', category: 'Tooling & Fixtures' },
      { slug: 'ravi-metal', name: 'Ravi Metal Finishers', category: 'Electroplating & Surface Treatment' },
      { slug: 'red-infotech', name: 'Red Infotech', category: 'Software & IT' },
      { slug: 'roche-diagnostics', name: 'Roche Diagnostics India', category: 'Clinical Diagnostics & IVD' },
      { slug: 'sr-enterprises', name: 'S R Enterprises', category: 'Industrial Supplies' },
      { slug: 'ss-tools', name: 'S.S. Tools & Company', category: 'Precision Cutting Tools' },
      { slug: 'securecode-systems', name: 'Secure Code Systems', category: 'GS1 Serialization Tech' },
      // Row 5
      { slug: 'shanthi-gears', name: 'Shanthi Gears (Murugappa Group)', category: 'Industrial Gearboxes OEM' },
      { slug: 'sipcot-tamilnadu', name: 'SIPCOT (Govt of Tamil Nadu)', category: 'State Industrial Parks' },
      { slug: 'sivasakthi-enterprises', name: 'Sivasakthi Enterprises', category: 'Industrial Safety' },
      { slug: 'sk-tronicals', name: 'SK Tronicals', category: 'Electronics Manufacturing' },
      { slug: 'sellmore-pharma', name: 'Sellmore Pharmaceuticals', category: 'Pharmaceuticals' },
      { slug: 'seoyon-ehwa', name: 'Seoyon E-HWA Automotive', category: 'Automotive Interior Door Trims' }
    ]
  }
];

async function extractAll() {
  console.log('Starting high-precision extraction of 210 authentic logos...');
  
  const allClientsList = [];

  for (let sIdx = 0; sIdx < SHEETS.length; sIdx++) {
    const sheet = SHEETS[sIdx];
    console.log(`Processing Sheet ${sIdx + 1}: ${path.basename(sheet.file)}`);
    
    const image = sharp(sheet.file);
    const meta = await image.metadata();
    
    const COLS = 7;
    const ROWS = 6;
    
    const cellW = meta.width / COLS;
    const cellH = meta.height / ROWS;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const itemIdx = r * COLS + c;
        if (itemIdx >= sheet.logos.length) continue;
        
        const logoInfo = sheet.logos[itemIdx];
        
        // Exact bounding box inside the cell:
        // Exclude grid border (3px padding) and bottom caption text area (bottom ~25%)
        const left = Math.round(c * cellW + 4);
        const top = Math.round(r * cellH + 4);
        const width = Math.round(cellW - 8);
        const height = Math.round(cellH * 0.76 - 4); // Only the graphical logo portion

        const outFileName = `${logoInfo.slug}.png`;
        const outFilePath = path.join(OUTPUT_DIR, outFileName);

        try {
          await sharp(sheet.file)
            .extract({ left, top, width, height })
            .trim() // Auto trim surrounding whitespace/borders
            .extend({
              top: 12,
              bottom: 12,
              left: 16,
              right: 16,
              background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .png({ quality: 95 })
            .toFile(outFilePath);

          allClientsList.push({
            id: `client-${logoInfo.slug}`,
            slug: logoInfo.slug,
            name: logoInfo.name,
            category: logoInfo.category,
            logoUrl: `/assets/images/clients/${outFileName}`
          });
        } catch (err) {
          console.error(`Error extracting ${logoInfo.slug}:`, err.message);
        }
      }
    }
  }

  // Also copy to assets/images/clients for fallback
  const fallbackDir = path.join(__dirname, '../assets/images/clients');
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }
  for (const item of allClientsList) {
    const src = path.join(OUTPUT_DIR, `${item.slug}.png`);
    const dest = path.join(fallbackDir, `${item.slug}.png`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // Write the JavaScript dataset
  const jsContent = `// Authentic Verified ATPL Clients & Industry Partners Dataset (210+ verified enterprise logos)
export const REAL_CLIENTS_DATA = ${JSON.stringify(allClientsList, null, 2)};

export const FEATURED_MARQUEE_CLIENTS = [
  'ola-electric',
  'abb',
  'apollo-tyres',
  'hindustan-unilever',
  'dixon-technologies',
  'larsen-toubro',
  'psa-avtec',
  'borgwarner',
  'caplin-steriles',
  'roche-diagnostics',
  'arcelormittal',
  'bel-bharat-electronics',
  'gmr-airports',
  'hatsun-agro',
  'pegatron-electronics',
  'dell-technologies',
  'endress-hauser',
  'shanthi-gears',
  'sipcot-tamilnadu',
  'magna-cosma',
  'rane-madras',
  'jindal-aluminium',
  'iit-madras',
  'bundl-swiggy',
  'flyjac-logistics',
  'kosei-minda',
  'jamna-auto',
  'seoyon-ehwa',
  'emerson',
  'harting-india',
  'marposs-india',
  'cholayil'
];
`;

  fs.writeFileSync(SRC_DATA_FILE, jsContent, 'utf8');
  console.log(`✅ Successfully extracted and generated ${allClientsList.length} authentic enterprise logos in ${OUTPUT_DIR}`);
}

extractAll().catch(err => {
  console.error('Extraction failed:', err);
});
