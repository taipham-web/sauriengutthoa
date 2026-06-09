import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix the path: script is in 'scripts' folder, so we need to go up one level
const dirsToScan = [
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, '..', 'src', 'assets')
];

const convertToWebp = async (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`);
    return;
  }
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await convertToWebp(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${name}.webp`);
      
      try {
        await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
        console.log(`Converted: ${file} -> ${name}.webp`);
        // fs.unlinkSync(fullPath); // Uncomment to delete original
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
};

const run = async () => {
  console.log("Bắt đầu chuyển đổi ảnh sang WebP...");
  for (const dir of dirsToScan) {
    await convertToWebp(dir);
  }
  console.log("Hoàn tất chuyển đổi!");
};

run();
