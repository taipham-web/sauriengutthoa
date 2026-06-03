import fs from 'fs';
import path from 'path';

const srcDir = path.join('d:', 'WorkSpace', 'WebbanHang', 'my-brand-admin', 'src', 'pages', 'Handbook');

function fixFile(fileName) {
  const filePath = path.join(srcDir, fileName);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix "{t('key')}" -> 'key' in arrays
  content = content.replace(/"\{t\('([^']+)'\)\}"/g, "'$1'");
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

['CulinaryGuidePage.jsx', 'NutritionGuidePage.jsx', 'PreservationGuidePage.jsx', 'SelectionGuidePage.jsx'].forEach(fixFile);

console.log('Fixed JSX arrays!');
