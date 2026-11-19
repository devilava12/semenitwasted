const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://semenitwasted.web.id';
const distDir = path.join(__dirname, 'dist');

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifyHeading(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, 'dan')
    .replace(/&[a-z0-9#]+;/gi, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
    .replace(/-+$/, '') || 'bagian';
}

function getPublishedPosts() {
  const { BLOG_POSTS = [] } = require('./blog-data.js');
  return BLOG_POSTS
    .filter(post => post && post.slug && post.slug !== 'coming-soon')
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

// ---------------------------------------------------------------------------
// 1. Auto-generate sitemap.xml dari halaman inti & repositori blog-data.js
// ---------------------------------------------------------------------------
function generateSitemap(publishedPosts) {
  const latestPostDate = publishedPosts.reduce((max, p) => (p.date && p.date > max ? p.date : max), '2026-11-16');

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

  const blogEntries = publishedPosts.map(post => ({
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

// ---------------------------------------------------------------------------
// 2. Auto-generate rss.xml (RSS 2.0 Feed) dari blog-data.js
// ---------------------------------------------------------------------------
function generateRssFeed(publishedPosts) {
  const latestDate = publishedPosts[0]?.date ? new Date(`${publishedPosts[0].date}T08:00:00+08:00`) : new Date();
  const lastBuildDate = latestDate.toUTCString();

  const itemsXml = publishedPosts.map(post => {
    const link = `${SITE_ORIGIN}/blog/${encodeURI(post.slug)}`;
    const pubDate = post.date ? new Date(`${post.date}T08:00:00+08:00`).toUTCString() : lastBuildDate;
    const category = post.categoryLabel || post.category || 'Blog';
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <category>${escapeXml(category)}</category>`,
      `      <description>${escapeXml(post.excerpt || post.title)}</description>`,
      '    </item>'
    ].join('\n');
  });

  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>semenitwasted — Blog &amp; Field Notes</title>',
    `    <link>${SITE_ORIGIN}/blog</link>`,
    `    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />`,
    '    <description>Ruang catatan digital seputar desain antarmuka, rekayasa kode frontend, keamanan web, dan refleksi berkarya oleh I Putu Dicky Adi Pranatha.</description>',
    '    <language>id-ID</language>',
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    ...itemsXml,
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssXml, 'utf8');
  console.log(`[OK] Generated rss.xml (${publishedPosts.length} items)`);
}

// ---------------------------------------------------------------------------
// 3. Auto-Sync Static HTML (3 Artikel Terbaru) pada index.html & 404.html
// ---------------------------------------------------------------------------
function syncHomeAnd404LatestPosts(publishedPosts) {
  const topThree = publishedPosts.slice(0, 3);
  if (topThree.length === 0) return;

  // 3a. Sync index.html
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    const cardsHtml = topThree.map(post => `            <article class="home-bento-card home-blog-card">
              <a href="${escapeHtml(post.contentUrl)}" class="home-blog-cover-link" tabindex="-1" aria-hidden="true">
                <div class="home-blog-cover-frame">
                  <img src="${escapeHtml(post.coverImage)}"
                    alt="${escapeHtml(post.coverAlt || post.title)}"
                    class="home-blog-cover-img" width="800" height="450" loading="lazy" decoding="async">
                </div>
              </a>
              <div class="home-card-body">
                <div class="home-card-meta">
                  <span class="home-pill-badge">${escapeHtml(post.categoryLabel || post.category)}</span>
                  <span class="home-meta-muted">${escapeHtml(post.readingTime || '')}</span>
                </div>
                <h3 class="home-card-title">
                  <a href="${escapeHtml(post.contentUrl)}">${escapeHtml(post.title)}</a>
                </h3>
                <p class="home-card-excerpt">
                  ${escapeHtml(post.excerpt || '')}
                </p>
                <div class="home-card-footer">
                  <time datetime="${escapeHtml(post.date || '')}" class="home-meta-muted">${escapeHtml(post.formattedDate || post.date || '')}</time>
                  <a href="${escapeHtml(post.contentUrl)}" class="home-card-link">
                    <span>Baca <span class="sr-only">${escapeHtml(post.title)}</span></span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>`).join('\n\n');

    html = html.replace(
      /<!-- HOME_LATEST_POSTS_START -->[\s\S]*?<!-- HOME_LATEST_POSTS_END -->/,
      `<!-- HOME_LATEST_POSTS_START -->\n${cardsHtml}\n            <!-- HOME_LATEST_POSTS_END -->`
    );

    html = html.replace(
      /<!-- HOME_BLOG_COUNT_START -->[\s\S]*?<!-- HOME_BLOG_COUNT_END -->/,
      `<!-- HOME_BLOG_COUNT_START --><span>Browse All ${publishedPosts.length} Articles</span><!-- HOME_BLOG_COUNT_END -->`
    );

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log(`[OK] Synced index.html latest posts (${topThree.length} cards, ${publishedPosts.length} total)`);
  }

  // 3b. Sync 404.html
  const notFoundPath = path.join(__dirname, '404.html');
  if (fs.existsSync(notFoundPath)) {
    let html404 = fs.readFileSync(notFoundPath, 'utf8');
    const cards404 = topThree.map(post => `          <a href="/blog/${encodeURI(post.slug)}" class="post-related-card">
            <span class="post-related-meta">${escapeHtml(post.categoryLabel || post.category)} &bull; ${escapeHtml(post.formattedDate || post.date)}</span>
            <span class="post-related-title">${escapeHtml(post.title)}</span>
          </a>`).join('\n');

    html404 = html404.replace(
      /<!-- ERROR404_LATEST_POSTS_START -->[\s\S]*?<!-- ERROR404_LATEST_POSTS_END -->/,
      `<!-- ERROR404_LATEST_POSTS_START -->\n${cards404}\n          <!-- ERROR404_LATEST_POSTS_END -->`
    );

    fs.writeFileSync(notFoundPath, html404, 'utf8');
    console.log('[OK] Synced 404.html latest posts');
  }
}

// ---------------------------------------------------------------------------
// 4. Auto-Enhance Blog Posts: Anchor IDs, Table of Contents, Same-Category
//    Related Posts, RSS Autodiscovery & Hero LCP fetchpriority="high"
// ---------------------------------------------------------------------------
function enhanceBlogPosts(publishedPosts) {
  let enhancedCount = 0;

  publishedPosts.forEach(post => {
    const filePath = path.join(__dirname, post.contentUrl || `blog/${post.slug}.html`);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;

    // 4a. Ensure RSS autodiscovery link in <head>
    if (!/type="application\/rss\+xml"/i.test(html)) {
      html = html.replace(
        /(<link\s+rel="canonical"[^>]*>)/i,
        '$1\n  <link rel="alternate" type="application/rss+xml" title="semenitwasted Blog RSS Feed"\n    href="https://semenitwasted.web.id/rss.xml">'
      );
    }

    // 4b. Ensure fetchpriority="high" on primary hero image for LCP
    html = html.replace(
      /(<img\b[^>]*class="[^"]*post-hero-img[^"]*"[^>]*loading="eager"[^>]*)(>)/i,
      (match, before, close) => {
        if (/fetchpriority=/i.test(before)) return match;
        return `${before} fetchpriority="high"${close}`;
      }
    );

    // 4c. Add stable id attributes to <h2> headings inside <article class="post-prose">
    const proseRegex = /(<article\s+class="post-prose"[^>]*>)([\s\S]*?)(<\/article>)/i;
    const proseMatch = html.match(proseRegex);
    const tocItems = [];

    if (proseMatch) {
      const usedIds = new Set();
      const updatedBody = proseMatch[2].replace(/<h2(\s+[^>]*)?>([\s\S]*?)<\/h2>/gi, (m, attrs = '', inner) => {
        const plainTitle = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const existingIdMatch = attrs.match(/\bid="([^"]+)"/i);
        const rawExistingId = existingIdMatch ? existingIdMatch[1] : '';
        let id = (rawExistingId && !rawExistingId.endsWith('-')) ? rawExistingId : slugifyHeading(plainTitle);

        let uniqueId = id;
        let suffix = 2;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${id}-${suffix++}`;
        }
        usedIds.add(uniqueId);

        if (!/^referensi$/i.test(plainTitle)) {
          tocItems.push({ id: uniqueId, title: plainTitle });
        }

        if (existingIdMatch && !rawExistingId.endsWith('-')) {
          return `<h2${attrs}>${inner}</h2>`;
        }
        const cleanedAttrs = attrs.replace(/\s*\bid="[^"]*"/i, '');
        return `<h2 id="${uniqueId}"${cleanedAttrs}>${inner}</h2>`;
      });

      html = html.replace(proseRegex, `${proseMatch[1]}${updatedBody}${proseMatch[3]}`);
    }

    // 4d. Inject / refresh collapsible Table of Contents right before <article class="post-prose">
    if (tocItems.length >= 2) {
      const tocMarkup = [
        '      <!-- AUTO_TOC_START -->',
        '      <details class="post-toc-card">',
        '        <summary class="post-toc-summary">',
        '          <span>Daftar Isi Artikel</span>',
        '          <span class="post-toc-chevron" aria-hidden="true">&#9662;</span>',
        '        </summary>',
        '        <nav aria-label="Daftar isi artikel">',
        '          <ol class="post-toc-list">',
        ...tocItems.map(item => `            <li><a href="#${item.id}">${escapeHtml(item.title)}</a></li>`),
        '          </ol>',
        '        </nav>',
        '      </details>',
        '      <!-- AUTO_TOC_END -->'
      ].join('\n');

      if (/<!-- AUTO_TOC_START -->[\s\S]*?<!-- AUTO_TOC_END -->/.test(html)) {
        html = html.replace(
          /[ \t]*<!-- AUTO_TOC_START -->[\s\S]*?<!-- AUTO_TOC_END -->/,
          tocMarkup
        );
      } else {
        html = html.replace(
          /([ \t]*<!-- Article Body -->\s*\r?\n)?([ \t]*<article\s+class="post-prose")/i,
          `${tocMarkup}\n\n$1$2`
        );
      }
    }

    // 4e. Inject / refresh Same-Category Related Articles right before <nav class="post-navigator">
    const sameCategory = publishedPosts
      .filter(p => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);

    if (sameCategory.length > 0 && /<nav\s+class="post-navigator"/i.test(html)) {
      const catLabel = post.categoryLabel || post.category || 'Topik Ini';
      const relatedMarkup = [
        '      <!-- AUTO_RELATED_START -->',
        `      <section class="post-related-section" aria-label="Artikel terkait di kategori ${escapeHtml(catLabel)}">`,
        `        <h2 class="post-related-heading">Baca Juga di Topik ${escapeHtml(catLabel)}</h2>`,
        '        <div class="post-related-grid">',
        ...sameCategory.map(rel => [
          `          <a href="${encodeURI(rel.slug)}.html" class="post-related-card">`,
          `            <span class="post-related-meta">${escapeHtml(rel.formattedDate || rel.date)} &bull; ${escapeHtml(rel.readingTime || '')}</span>`,
          `            <span class="post-related-title">${escapeHtml(rel.title)}</span>`,
          '          </a>'
        ].join('\n')),
        '        </div>',
        '      </section>',
        '      <!-- AUTO_RELATED_END -->'
      ].join('\n');

      if (/<!-- AUTO_RELATED_START -->[\s\S]*?<!-- AUTO_RELATED_END -->/.test(html)) {
        html = html.replace(
          /[ \t]*<!-- AUTO_RELATED_START -->[\s\S]*?<!-- AUTO_RELATED_END -->/,
          relatedMarkup
        );
      } else {
        html = html.replace(
          /([ \t]*<!-- Next & Prev Navigation -->\s*\r?\n)?([ \t]*<nav\s+class="post-navigator")/i,
          `${relatedMarkup}\n\n$1$2`
        );
      }
    }

    if (html !== originalHtml) {
      fs.writeFileSync(filePath, html, 'utf8');
      enhancedCount++;
    }
  });

  console.log(`[OK] Enhanced blog articles with TOC, Anchor IDs, Related Cluster & LCP (${enhancedCount} updated / ${publishedPosts.length} checked)`);
}

// ---------------------------------------------------------------------------
// 5. Automated Pre-Flight SEO Audit Gate (Adapted from references/seo.md)
// ---------------------------------------------------------------------------
function validateSEO(targetRoot) {
  const htmlFiles = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  walk(targetRoot);

  let issues = 0;
  let checked = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(targetRoot, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    const isNoindex = /name=["']robots["'][^>]*noindex/i.test(content);
    checked++;

    const countTag = (regex, src = content) => (src.match(regex) || []).length;
    const headMatch = content.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
    const headContent = headMatch ? headMatch[1] : content;
    const titleCount = countTag(/<title[\s>]/gi, headContent);
    const h1Count = countTag(/<h1[\s>]/gi, content);

    if (titleCount !== 1) {
      console.warn(`  [SEO WARN] ${rel}: expected 1 <title>, found ${titleCount}`);
      issues++;
    }
    if (h1Count !== 1) {
      console.warn(`  [SEO WARN] ${rel}: expected 1 <h1>, found ${h1Count}`);
      issues++;
    }
    if (!/<html[^>]+lang=/i.test(content)) {
      console.warn(`  [SEO WARN] ${rel}: missing <html lang>`);
      issues++;
    }
    if (!isNoindex && !/<link[^>]+rel=["']canonical["']/i.test(content)) {
      console.warn(`  [SEO WARN] ${rel}: public page missing canonical`);
      issues++;
    }

    // Validate JSON-LD blocks
    const ldMatches = [...content.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const m of ldMatches) {
      try {
        JSON.parse(m[1]);
      } catch (err) {
        console.warn(`  [SEO ERROR] ${rel}: invalid JSON-LD (${err.message})`);
        issues++;
      }
    }
  }

  console.log(`[SEO AUDIT] Checked ${checked} HTML page(s) in dist -> ${issues} issue(s) found`);
  return issues;
}

// ---------------------------------------------------------------------------
// Execution Pipeline
// ---------------------------------------------------------------------------
const publishedPosts = getPublishedPosts();

generateSitemap(publishedPosts);
generateRssFeed(publishedPosts);
syncHomeAnd404LatestPosts(publishedPosts);
enhanceBlogPosts(publishedPosts);

// Clean & rebuild dist/
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const includeDirs = ['assets', 'blog', 'portfolio'];
const includeSpecialFiles = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'rss.xml'];
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

validateSEO(distDir);
console.log('\n--- Build selesai! Folder "dist" siap di-deploy ke Cloudflare ---');
