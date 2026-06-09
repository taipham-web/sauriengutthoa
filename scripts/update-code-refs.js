import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');

const filesToUpdate = [
  'src/components/Header.jsx',
  'src/components/SEO.jsx',
  'src/pages/Admin/AdminProductsTab.jsx',
  'src/pages/Product/ProductsPage.jsx',
  'src/pages/Product/ProductDetailsPage.jsx',
  'src/pages/Handbook/HandbookPage.jsx',
  'src/pages/Handbook/NutritionGuidePage.jsx',
  'src/pages/Handbook/SelectionGuidePage.jsx',
  'src/pages/Handbook/PreservationGuidePage.jsx',
  'src/pages/Handbook/CulinaryGuidePage.jsx',
  'src/pages/Home.jsx',
  'src/pages/AboutPage.jsx',
  'index.html'
];

const imageNames = [
  'Hero', 'SR_trai', 'anh_sr', 'anh_sr1', 'anh_sr2',
  'banh_crepe', 'cach_chon_sr', 'durian', 'logo', 'vua_sr', 'vuon'
];

console.log("Đang cập nhật code...");
for (const relPath of filesToUpdate) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  
  for (const name of imageNames) {
    const regex = new RegExp(`${name}\\.(jpg|png)`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `${name}.webp`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Đã cập nhật: ${relPath}`);
  }
}

// Now delete old files
const dirsToScan = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'src', 'assets')
];

console.log("Đang xoá các ảnh cũ...");
for (const dir of dirsToScan) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (!fs.statSync(fullPath).isDirectory()) {
      if (/\.(png|jpe?g)$/i.test(file)) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        if (imageNames.includes(name)) {
          fs.unlinkSync(fullPath);
          console.log(`Đã xoá: ${fullPath}`);
        }
      }
    }
  }
}

console.log("Hoàn tất!");
