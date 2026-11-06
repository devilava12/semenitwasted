const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://semenitwasted.web.id';
const distDir = path.join(__dirname, 'dist');

// ---------------------------------------------------------------------------
// 1. Auto-generate sitemap.xml dari halaman inti & repositori blog-data.js
// ---------------------------------------------------------------------------
function generateSitemap() {
  const { BLOG_POSTS = [] } = require('./blog-data.js');
  const latestPostDate = BLOG_POSTS.reduce((max, p) => (p.date && p.date > max ? p.date : max), '2026-11-06');

  const staticPages = [
    { loc: `${SITE_ORIGIN}/`, lastmod: latestPostDate, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_ORIGIN}/portfolio`, lastmod: '2026-10-17', changefreq: 'monthly', priority: '0.9' },
    { loc: `${SITE_ORIGIN}/about`, lastmod: '2026-10-17', changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_ORIGIN}/blog`, lastmod: latestPostDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_ORIGIN}/contact`, lastmod: '2026-10-12', changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_ORIGIN}/portfolio/roche/`, lastmod: '2026-10-17', changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_ORIGIN}/portfolio/artificial%20intelegent%20icon/`, lastmod: '2026-10-17', changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_ORIGIN}/portfolio/eksperimen%201/`, lastmod: '2026-10-25', changefreq: 'monthly', priority: '0.7' }
  ];

  const blogEntries = BLOG_POSTS
    .filter(post => post && post.slug && post.slug !== 'coming-soon')
    .map(post => ({
      loc: `${SITE_ORIGIN}/blog/${encodeURI(post.slug)}`,
      lastmod: post.date || latestPostDate,
      changefreq: 'monthly',
      priority: '0.8'
    }));

  const allEntries = [...staticPages, ...blogEntries];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map(entry => [
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>'
    ].join('\n')),
    '</urlset>',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log(`[OK] Generated sitemap.xml (${allEntries.length} URLs)`);
}

generateSitemap();

// ---------------------------------------------------------------------------
// 2. Bersihkan & bangun ulang folder dist untuk produksi
// ---------------------------------------------------------------------------
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const includeDirs = ['assets', 'blog', 'portfolio'];
const includeSpecialFiles = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml'];
const excludeRootFiles = new Set([
  'build.js',
  'serve.json',
  'wrangler.json',
  'package.json',
  'package-lock.json',
  'architecture-review-20261010.html'
]);

const items = fs.readdirSync(__dirname);

items.forEach(item => {
  if (item === 'dist' || item.startsWith('.')) return;

  const itemPath = path.join(__dirname, item);
  const targetPath = path.join(distDir, item);
  const stat = fs.statSync(itemPath);

  if (stat.isDirectory() && includeDirs.includes(item)) {
    fs.cpSync(itemPath, targetPath, {
      recursive: true,
      filter: src => !src.toLowerCase().endsWith('.md')
    });
    console.log(`[OK] Directory: ${item}`);
  } else if (stat.isFile()) {
    if (excludeRootFiles.has(item)) return;
    const ext = path.extname(item).toLowerCase();
    if (['.html', '.css', '.js', '.json', '.webmanifest'].includes(ext) || includeSpecialFiles.includes(item)) {
      fs.copyFileSync(itemPath, targetPath);
      console.log(`[OK] File: ${item}`);
    }
  }
});

console.log('\n--- Build selesai! Folder "dist" siap di-deploy ke Cloudflare ---');
