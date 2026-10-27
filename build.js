const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Bersihkan folder dist jika sudah ada
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Folder dan file yang perlu dimasukkan ke produksi
const includeDirs = ['assets', 'blog', 'portfolio'];
const includeSpecialFiles = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml'];

const items = fs.readdirSync(__dirname);

items.forEach(item => {
  if (item === 'dist' || item.startsWith('.')) return;

  const itemPath = path.join(__dirname, item);
  const targetPath = path.join(distDir, item);
  const stat = fs.statSync(itemPath);

  if (stat.isDirectory() && includeDirs.includes(item)) {
    fs.cpSync(itemPath, targetPath, { recursive: true });
    console.log(`[OK] Directory: ${item}`);
  } else if (stat.isFile()) {
    const ext = path.extname(item).toLowerCase();
    if (['.html', '.css', '.js', '.json', '.webmanifest'].includes(ext) || includeSpecialFiles.includes(item)) {
      // Kecuali build.js dan package files jika ada
      if (item !== 'build.js') {
        fs.copyFileSync(itemPath, targetPath);
        console.log(`[OK] File: ${item}`);
      }
    }
  }
});

console.log('\n--- Build selesai! Folder "dist" siap di-deploy ke Cloudflare Pages ---');
