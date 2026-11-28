const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://semenitwasted.web.id';
const POSTS_PER_PAGE = 8;
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

function getBlogRepository() {
  const { BLOG_POSTS = [], BLOG_CATEGORIES = [] } = require('./blog-data.js');
  const publishedPosts = BLOG_POSTS
    .filter(post => post && post.slug && post.slug !== 'coming-soon')
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  return { publishedPosts, categories: BLOG_CATEGORIES };
}

function formatCategoryLabel(slug) {
  if (!slug) return '';
  return String(slug)
    .split(/[-_]+/)
    .filter(Boolean)
    .map(word => {
      if (word.toLowerCase() === 'and') return '&';
      if (['css', 'ux', 'ui'].includes(word.toLowerCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function computeBlogCategories(publishedPosts, predefinedCategories) {
  const baseCategories = predefinedCategories && predefinedCategories.length > 0
    ? predefinedCategories
    : [
        { id: 'all', label: 'All Topics' },
        { id: 'design-systems', label: 'Design Systems' },
        { id: 'frontend-code', label: 'Frontend & Code' },
        { id: 'product-support', label: 'Product & Support' },
        { id: 'reflections', label: 'Reflections' }
      ];

  const categoryMap = new Map();
  baseCategories.forEach(cat => {
    if (!cat || !cat.id) return;
    categoryMap.set(cat.id, {
      id: cat.id,
      label: cat.label || formatCategoryLabel(cat.id),
      count: 0
    });
  });

  if (!categoryMap.has('all')) {
    categoryMap.set('all', { id: 'all', label: 'All Topics', count: 0 });
  }

  publishedPosts.forEach(post => {
    const catId = post.category ? String(post.category).trim().toLowerCase() : '';
    if (!catId) return;
    if (!categoryMap.has(catId)) {
      categoryMap.set(catId, {
        id: catId,
        label: post.categoryLabel || formatCategoryLabel(catId),
        count: 0
      });
    }
    categoryMap.get(catId).count++;
  });
  categoryMap.get('all').count = publishedPosts.length;

  return Array.from(categoryMap.values()).filter(cat => {
    if (cat.id === 'all') return true;
    const isExplicit = baseCategories.some(c => c.id === cat.id);
    return cat.count > 0 || isExplicit;
  });
}

function renderCategoryPillsHtml(categories, indent = '            ') {
  return categories.map(cat => {
    const isActive = cat.id === 'all';
    return [
      `${indent}<button type="button" class="category-pill${isActive ? ' active' : ''}" data-category="${escapeHtml(cat.id)}" aria-pressed="${isActive ? 'true' : 'false'}">`,
      `${indent}  <span>${escapeHtml(cat.label)}</span>`,
      `${indent}  <span class="pill-count" id="count-${escapeHtml(cat.id)}">${cat.count}</span>`,
      `${indent}</button>`
    ].join('\n');
  }).join('\n');
}

function renderBlogCardHtml(post, { isRoot, indent = '          ' }) {
  const tagsArr = Array.isArray(post.tags) ? post.tags : [];
  const tagsAttr = tagsArr.map(t => String(t).replace(/^#/, '')).join(' ').toLowerCase();
  const visibleTags = tagsArr.slice(0, 3);
  const articleHref = `/blog/${encodeURI(post.slug)}`;
  const coverSrc = post.coverImage
    ? (isRoot ? post.coverImage : `../../../${post.coverImage}`)
    : '';
  const catLabel = post.categoryLabel || formatCategoryLabel(post.category);

  const lines = [
    `${indent}<article class="article-bento-card${coverSrc ? ' has-cover' : ''}" data-category="${escapeHtml(post.category || '')}" data-tags="${escapeHtml(tagsAttr)}">`
  ];

  if (coverSrc) {
    lines.push(
      `${indent}  <a href="${escapeHtml(articleHref)}" class="article-cover-link" tabindex="-1" aria-hidden="true">`,
      `${indent}    <div class="article-cover-frame">`,
      `${indent}      <img src="${escapeHtml(coverSrc)}" alt="${escapeHtml(post.coverAlt || post.title || '')}" class="article-cover-img" width="800" height="450" loading="lazy" decoding="async">`,
      `${indent}    </div>`,
      `${indent}  </a>`
    );
  }

  lines.push(
    `${indent}  <div class="article-card-body">`,
    `${indent}    <div class="card-meta">`,
    `${indent}      <span class="category-pill-sm">${escapeHtml(catLabel)}</span>`,
    `${indent}      <span class="meta-separator" aria-hidden="true">&bull;</span>`,
    `${indent}      <span class="reading-time">${escapeHtml(post.readingTime || '')}</span>`,
    `${indent}    </div>`,
    `${indent}    <h3 class="card-title">`,
    `${indent}      <a href="${escapeHtml(articleHref)}">${escapeHtml(post.title || '')}</a>`,
    `${indent}    </h3>`,
    `${indent}    <p class="card-excerpt">`,
    `${indent}      ${escapeHtml(post.excerpt || '')}`,
    `${indent}    </p>`,
    `${indent}    <div class="card-footer">`,
    `${indent}      <time datetime="${escapeHtml(post.date || '')}" class="card-date">${escapeHtml(post.formattedDate || post.date || '')}</time>`,
    `${indent}      <div class="tags-cluster">`,
    ...visibleTags.map(t => `${indent}        <span class="tag-chip">#${escapeHtml(String(t).replace(/^#/, ''))}</span>`),
    `${indent}      </div>`,
    `${indent}    </div>`,
    `${indent}  </div>`,
    `${indent}</article>`
  );

  return lines.join('\n');
}

function renderPaginationHtml(currentPage, totalPages, totalPosts, { isRoot, indent = '        ' }) {
  const basePath = isRoot ? '' : '../../../';
  const pageHref = (p) => {
    if (p === 1) return '/blog';
    return `/blog/page/${p}/#catalog-heading`;
  };

  const items = [];

  if (currentPage === 1) {
    items.push(`${indent}    <li><span class="pagination-btn pagination-btn--prev is-disabled" aria-disabled="true">&larr; Previous</span></li>`);
  } else {
    items.push(`${indent}    <li><a href="${pageHref(currentPage - 1)}" class="pagination-btn pagination-btn--prev" rel="prev" aria-label="Go to previous page, page ${currentPage - 1}">&larr; Previous</a></li>`);
  }

  for (let p = 1; p <= totalPages; p++) {
    if (p === currentPage) {
      items.push(`${indent}    <li><span class="pagination-btn pagination-btn--num is-active" aria-current="page">${p}</span></li>`);
    } else {
      items.push(`${indent}    <li><a href="${pageHref(p)}" class="pagination-btn pagination-btn--num" aria-label="Go to page ${p}">${p}</a></li>`);
    }
  }

  if (currentPage === totalPages) {
    items.push(`${indent}    <li><span class="pagination-btn pagination-btn--next is-disabled" aria-disabled="true">Next &rarr;</span></li>`);
  } else {
    items.push(`${indent}    <li><a href="${pageHref(currentPage + 1)}" class="pagination-btn pagination-btn--next" rel="next" aria-label="Go to next page, page ${currentPage + 1}">Next &rarr;</a></li>`);
  }

  const hiddenAttr = totalPages <= 1 ? ' hidden' : '';
  return [
    `${indent}<nav class="blog-pagination" id="blogPagination" aria-label="Pagination" data-current-page="${currentPage}" data-total-pages="${totalPages}" data-per-page="${POSTS_PER_PAGE}" data-base-path="${basePath}"${hiddenAttr}>`,
    `${indent}  <ul class="pagination-list">`,
    ...items,
    `${indent}  </ul>`,
    `${indent}  <p class="pagination-summary">Page ${currentPage} of ${totalPages} &bull; ${totalPosts} total essays</p>`,
    `${indent}</nav>`
  ].join('\n');
}

function buildBlogSubpageHtml({ pageNumber, totalPages, pagePosts, totalPosts, categoriesHtml }) {
  const canonicalUrl = `${SITE_ORIGIN}/blog/page/${pageNumber}/`;
  const prevUrl = pageNumber === 2 ? `${SITE_ORIGIN}/blog` : `${SITE_ORIGIN}/blog/page/${pageNumber - 1}/`;
  const nextUrl = pageNumber < totalPages ? `${SITE_ORIGIN}/blog/page/${pageNumber + 1}/` : '';
  const startIdx = (pageNumber - 1) * POSTS_PER_PAGE + 1;
  const endIdx = Math.min(pageNumber * POSTS_PER_PAGE, totalPosts);
  const pageTitle = `Blog &amp; Thoughts Halaman ${pageNumber} | semenitwasted`;
  const pageTitlePlain = `Blog & Thoughts Halaman ${pageNumber} | semenitwasted`;
  const pageDesc = `Arsip catatan digital halaman ${pageNumber} dari ${totalPages} yang merangkum eksplorasi antarmuka, rekayasa frontend, keamanan web, dan refleksi berkala oleh I Putu Dicky Adi Pranatha.`;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitlePlain,
        description: pageDesc,
        inLanguage: 'id-ID',
        isPartOf: {
          '@id': `${SITE_ORIGIN}/#website`
        },
        mainEntity: {
          '@id': `${SITE_ORIGIN}/blog#blog`
        }
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_ORIGIN}/blog#blog`,
        name: 'Blog & Thoughts | semenitwasted',
        description: 'Ruang catatan digital dan arsip terbuka yang merangkum eksplorasi antarmuka, rekayasa frontend, dan refleksi berkala oleh I Putu Dicky Adi Pranatha.',
        url: `${SITE_ORIGIN}/blog`,
        inLanguage: 'id-ID',
        author: {
          '@type': 'Person',
          '@id': `${SITE_ORIGIN}/#person`,
          name: 'I Putu Dicky Adi Pranatha',
          url: `${SITE_ORIGIN}/about`
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_ORIGIN}/#organization`,
          name: 'semenitwasted',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/assets/logo-nav.svg`
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_ORIGIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_ORIGIN}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Halaman ${pageNumber}`,
            item: canonicalUrl
          }
        ]
      }
    ]
  }, null, 2);

  const cardsHtml = pagePosts.map(post => renderBlogCardHtml(post, { isRoot: false })).join('\n\n');
  const paginationHtml = renderPaginationHtml(pageNumber, totalPages, totalPosts, { isRoot: false });
  const nextLinkTag = nextUrl ? `\n  <link rel="next" href="${nextUrl}">` : '';

  return `<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description"
    content="${escapeHtml(pageDesc)}">
  <link rel="icon" type="image/svg+xml" href="../../../assets/logo-nav.svg">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="semenitwasted">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description"
    content="${escapeHtml(pageDesc)}">
  <meta property="og:image" content="${SITE_ORIGIN}/assets/card-center.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description"
    content="${escapeHtml(pageDesc)}">
  <meta name="twitter:image" content="${SITE_ORIGIN}/assets/card-center.png">

  <link rel="canonical" href="${canonicalUrl}">
  <link rel="prev" href="${prevUrl}">${nextLinkTag}
  <link rel="alternate" type="application/rss+xml" title="semenitwasted Blog RSS Feed"
    href="${SITE_ORIGIN}/rss.xml">
  <meta property="og:url" content="${canonicalUrl}">

  <!-- Structured Data: CollectionPage, Blog & BreadcrumbList -->
  <script type="application/ld+json">
${jsonLd}
  </script>

  <link rel="stylesheet" href="../../../assets/fonts/rubik.css">
  <link rel="stylesheet" href="../../../portfolio.css">
  <link rel="stylesheet" href="../../../blog.css">
  <script src="../../../site-chrome.js"></script>
</head>

<body>
  <div class="portfolio-page-wrapper blog-page-wrapper">

    <!-- Global Site Navigation injected by site-chrome.js -->
    <div data-site-chrome data-active-page="blog" data-base-path="../../../"></div>

    <main id="main-content" class="blog-main" data-base-path="../../../">

      <!-- =================================================================
           1. HERO & SEARCH / FILTER BENTO CONTROLS
           ================================================================= -->
      <section class="blog-hero" aria-labelledby="blog-heading">
        <div class="blog-hero-header">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            WRITING &amp; FIELD NOTES
          </div>
          <h1 id="blog-heading" class="hero-title">Thoughts, devlogs, &amp; design notes.</h1>
          <p class="hero-desc">
            Ruang catatan digital dan arsip terbuka yang merangkum hal-hal yang menurut saya menarik, mulai dari eksplorasi desain antarmuka, rekayasa kode frontend, hingga refleksi berkala seputar pola pikir, cara berkarya, dan kehidupan sehari-hari.
          </p>
        </div>

        <hr class="hero-divider" aria-hidden="true">

        <!-- Bento Controls: Search & Category Pills -->
        <div class="blog-controls-card" aria-label="Article filters and search">
          <div class="blog-search-wrapper">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="search" id="blogSearchInput" class="blog-search-input" placeholder="Search essays by keyword, topic, or title..." aria-label="Search articles" autocomplete="off">
            <button type="button" id="clearSearchBtn" class="blog-search-clear" aria-label="Clear search query" hidden>&times;</button>
          </div>

          <div class="blog-category-filter" role="group" aria-label="Filter by category" id="categoryFilterGroup">
${categoriesHtml}
          </div>
        </div>
      </section>

      <!-- =================================================================
           2. ARTICLES BENTO GRID (PAGE ${pageNumber} OF ${totalPages})
           ================================================================= -->
      <section class="blog-catalog-section" aria-labelledby="catalog-heading">
        <div class="catalog-header">
          <h2 id="catalog-heading" class="catalog-heading">All Articles</h2>
          <span class="catalog-status" id="catalogStatus" aria-live="polite">Showing ${startIdx}&ndash;${endIdx} of ${totalPosts} essays &bull; Page ${pageNumber} of ${totalPages}</span>
        </div>

        <div class="blog-articles-grid" id="blogGridContainer">
${cardsHtml}
        </div>

        <!-- Empty State (When search returns 0 items) -->
        <div class="blog-empty-state" id="blogEmptyState" hidden>
          <div class="empty-state-card">
            <div class="empty-icon-wrap" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3 class="empty-title">No matching articles found</h3>
            <p class="empty-desc" id="emptyStateDesc">No essays matched your search criteria. Try a different keyword or reset category filters.</p>
            <button type="button" class="btn-reset-filter" id="resetFilterBtn">Reset All Filters</button>
          </div>
        </div>

${paginationHtml}
      </section>

      <!-- =================================================================
           3. BOTTOM BENTO STRIP: RSS FEED & CONNECT
           ================================================================= -->
      <section class="blog-bottom-bento" aria-label="RSS Feed and Community Connect">

        <!-- RSS Card -->
        <div class="connect-bento-card rss-bento-card">
          <div class="connect-icon-wrapper" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
          </div>
          <div class="connect-content">
            <span class="connect-badge">IndieWeb / RSS</span>
            <h3 class="connect-title">Subscribe via RSS Feed</h3>
            <p class="connect-desc">Prefer reading in NetNewsWire, Feedly, or your favorite reader? Add semenitwasted to your feeds.</p>
            <div class="rss-action-row">
              <code class="rss-url-pill" id="rssUrlDisplay">semenitwasted.web.id/rss.xml</code>
              <button type="button" class="btn-copy-rss" id="copyRssBtn" aria-label="Copy RSS Feed URL">
                <span id="copyRssText">Copy URL</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Discussion Card -->
        <div class="connect-bento-card feedback-bento-card">
          <div class="connect-icon-wrapper" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div class="connect-content">
            <span class="connect-badge">Have Thoughts?</span>
            <h3 class="connect-title">Start a Discussion</h3>
            <p class="connect-desc">Have a question, feedback on an essay, or want to exchange ideas on tactile web design? Let's talk.</p>
            <a href="/contact" class="btn-reach-out">
              <span>Send a Message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

      </section>

    </main>

    <!-- FOOTER (Matching library.html) -->
    <footer class="portfolio-footer">
      <div class="footer-left">
        <span class="footer-brand">semenitwasted</span>
        <span class="footer-subtitle">Design · Icons · Illustration · Web</span>
      </div>
      <div class="footer-platforms" aria-label="Platform links">
        <a href="https://www.linkedin.com/in/reionnyx/" target="_blank" rel="noopener noreferrer"
          class="footer-platform-card" aria-label="LinkedIn">
          <img src="../../../assets/linkedin.svg" alt="" width="24" height="24" class="footer-platform-icon footer-platform-icon--monochrome">
        </a>
        <a href="https://stock.adobe.com/contributor/207802543/dicky" target="_blank" rel="noopener noreferrer"
          class="footer-platform-card" aria-label="Adobe Stock">
          <img src="../../../assets/adobe-stock.svg" alt="" width="24" height="24" class="footer-platform-icon">
        </a>
        <a href="https://www.canva.com/p/gambar-reion" target="_blank" rel="noopener noreferrer"
          class="footer-platform-card" aria-label="Canva">
          <img src="../../../assets/canva.svg" alt="" width="24" height="24" class="footer-platform-icon">
        </a>
        <a href="https://thenounproject.com/creator/ReionDesign/" target="_blank" rel="noopener noreferrer"
          class="footer-platform-card" aria-label="The Noun Project">
          <img src="../../../assets/noun-project.svg" alt="" width="24" height="24" class="footer-platform-icon footer-platform-icon--monochrome">
        </a>
        <a href="https://www.flaticon.com/authors/reion" target="_blank" rel="noopener noreferrer"
          class="footer-platform-card" aria-label="Flaticon">
          <img src="../../../assets/flaticon.svg" alt="" width="24" height="24" class="footer-platform-icon footer-platform-icon--monochrome">
        </a>
      </div>
    </footer>

  </div>

  <script src="../../../blog-data.js"></script>
  <script src="../../../blog.js"></script>
</body>

</html>
`;
}

// ---------------------------------------------------------------------------
// 0. Auto-generate Static Blog Pagination (blog.html + blog/page/2..N/index.html)
// ---------------------------------------------------------------------------
function generateBlogPagination(publishedPosts, predefinedCategories) {
  const totalPosts = publishedPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const categories = computeBlogCategories(publishedPosts, predefinedCategories);
  const categoriesHtml = renderCategoryPillsHtml(categories);

  // Clean stale blog/page/ directory before regenerating
  const pageBaseDir = path.join(__dirname, 'blog', 'page');
  if (fs.existsSync(pageBaseDir)) {
    fs.rmSync(pageBaseDir, { recursive: true, force: true });
  }

  // Sync Page 1 (blog.html)
  const blogIndexPath = path.join(__dirname, 'blog.html');
  if (fs.existsSync(blogIndexPath)) {
    let html = fs.readFileSync(blogIndexPath, 'utf8');
    const page1Posts = publishedPosts.slice(0, POSTS_PER_PAGE);
    const page1End = page1Posts.length;
    const headPagination = totalPages > 1
      ? `  <!-- BLOG_PAGINATION_HEAD_START -->\n  <link rel="next" href="${SITE_ORIGIN}/blog/page/2/">\n  <!-- BLOG_PAGINATION_HEAD_END -->`
      : `  <!-- BLOG_PAGINATION_HEAD_START -->\n  <!-- BLOG_PAGINATION_HEAD_END -->`;
    const gridHtml = page1Posts.map(post => renderBlogCardHtml(post, { isRoot: true })).join('\n\n');
    const paginationHtml = renderPaginationHtml(1, totalPages, totalPosts, { isRoot: true });
    const statusText = totalPosts > 0
      ? `Showing 1&ndash;${page1End} of ${totalPosts} essays &bull; Page 1 of ${totalPages}`
      : 'No essays found';

    html = html.replace(
      /[ \t]*<!-- BLOG_PAGINATION_HEAD_START -->[\s\S]*?<!-- BLOG_PAGINATION_HEAD_END -->/,
      headPagination
    );
    html = html.replace(
      /<!-- BLOG_CATEGORY_PILLS_START -->[\s\S]*?<!-- BLOG_CATEGORY_PILLS_END -->/,
      `<!-- BLOG_CATEGORY_PILLS_START -->\n${categoriesHtml}\n            <!-- BLOG_CATEGORY_PILLS_END -->`
    );
    html = html.replace(
      /<!-- BLOG_CATALOG_STATUS_START -->[\s\S]*?<!-- BLOG_CATALOG_STATUS_END -->/,
      `<!-- BLOG_CATALOG_STATUS_START -->${statusText}<!-- BLOG_CATALOG_STATUS_END -->`
    );
    html = html.replace(
      /<!-- BLOG_GRID_START -->[\s\S]*?<!-- BLOG_GRID_END -->/,
      `<!-- BLOG_GRID_START -->\n${gridHtml}\n          <!-- BLOG_GRID_END -->`
    );
    html = html.replace(
      /<!-- BLOG_PAGINATION_START -->[\s\S]*?<!-- BLOG_PAGINATION_END -->/,
      `<!-- BLOG_PAGINATION_START -->\n${paginationHtml}\n        <!-- BLOG_PAGINATION_END -->`
    );

    fs.writeFileSync(blogIndexPath, html, 'utf8');
  }

  // Generate Pages 2..N (blog/page/N/index.html)
  for (let p = 2; p <= totalPages; p++) {
    const start = (p - 1) * POSTS_PER_PAGE;
    const pagePosts = publishedPosts.slice(start, start + POSTS_PER_PAGE);
    const pageDir = path.join(pageBaseDir, String(p));
    fs.mkdirSync(pageDir, { recursive: true });

    const pageHtml = buildBlogSubpageHtml({
      pageNumber: p,
      totalPages,
      pagePosts,
      totalPosts,
      categoriesHtml
    });

    fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');
  }

  console.log(`[OK] Generated static blog pagination (${totalPosts} posts across ${totalPages} pages, ${POSTS_PER_PAGE}/page)`);
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

    const cardsHtml = topThree.map(post => {
      const postHref = `/blog/${encodeURI(post.slug)}`;
      return `            <article class="home-bento-card home-blog-card">
              <a href="${escapeHtml(postHref)}" class="home-blog-cover-link" tabindex="-1" aria-hidden="true">
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
                  <a href="${escapeHtml(postHref)}">${escapeHtml(post.title)}</a>
                </h3>
                <p class="home-card-excerpt">
                  ${escapeHtml(post.excerpt || '')}
                </p>
                <div class="home-card-footer">
                  <time datetime="${escapeHtml(post.date || '')}" class="home-meta-muted">${escapeHtml(post.formattedDate || post.date || '')}</time>
                  <a href="${escapeHtml(postHref)}" class="home-card-link">
                    <span>Baca <span class="sr-only">${escapeHtml(post.title)}</span></span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>`;
    }).join('\n\n');

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
    const filePath = path.join(__dirname, 'blog', `${post.slug}.html`);
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
          `          <a href="/blog/${encodeURI(rel.slug)}" class="post-related-card">`,
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
// 4f. Auto-Sync Cloudflare Pages _redirects (Explicit 301 .html -> Clean URL)
// ---------------------------------------------------------------------------
function syncRedirects(publishedPosts) {
  const redirectsPath = path.join(__dirname, '_redirects');
  if (!fs.existsSync(redirectsPath)) return;

  const totalPages = Math.max(1, Math.ceil(publishedPosts.length / POSTS_PER_PAGE));
  const rules = [
    '# Root pages (.html -> clean URL)',
    '/index.html / 301',
    '/portfolio.html /portfolio 301',
    '/about.html /about 301',
    '/blog.html /blog 301',
    '/contact.html /contact 301',
    '/library.html /library 301',
    '',
    '# Portfolio directory indexes (index.html -> clean trailing slash)',
    '/portfolio/roche/index.html /portfolio/roche/ 301',
    '/portfolio/eksperimen%201/index.html /portfolio/eksperimen%201/ 301',
    '/portfolio/artificial%20intelegent%20icon/index.html /portfolio/artificial%20intelegent%20icon/ 301',
    '',
    '# Blog pagination canonical redirects',
    '/blog/page/1 /blog 301',
    '/blog/page/1/ /blog 301',
    '/blog/page /blog 301',
    '/blog/page/ /blog 301'
  ];

  for (let p = 2; p <= totalPages; p++) {
    rules.push(`/blog/page/${p}/index.html /blog/page/${p}/ 301`);
  }

  rules.push('', '# Published blog posts (.html -> clean URL)');
  publishedPosts.forEach(post => {
    const slug = encodeURI(post.slug);
    rules.push(`/blog/${slug}.html /blog/${slug} 301`);
  });
  rules.push('/blog/coming-soon.html /blog/coming-soon 301');

  const block = [
    '# AUTO_CLEAN_URL_REDIRECTS_START',
    ...rules,
    '# AUTO_CLEAN_URL_REDIRECTS_END'
  ].join('\n');

  let content = fs.readFileSync(redirectsPath, 'utf8');
  if (/# AUTO_CLEAN_URL_REDIRECTS_START[\s\S]*?# AUTO_CLEAN_URL_REDIRECTS_END/.test(content)) {
    content = content.replace(
      /# AUTO_CLEAN_URL_REDIRECTS_START[\s\S]*?# AUTO_CLEAN_URL_REDIRECTS_END/,
      block
    );
  } else {
    content = `${content.trimEnd()}\n\n${block}\n`;
  }

  fs.writeFileSync(redirectsPath, content, 'utf8');
  const ruleCount = rules.filter(line => line && !line.startsWith('#')).length;
  console.log(`[OK] Synced _redirects (${ruleCount} managed clean-URL 301 rules)`);
}

// ---------------------------------------------------------------------------
// 5. Automated Pre-Flight SEO Audit Gate (Adapted from references/seo.md)
// ---------------------------------------------------------------------------
function validateSEO(targetRoot) {
  const htmlFiles = [];
  const allRelFiles = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const relPath = path.relative(targetRoot, fullPath).replace(/\\/g, '/');
        allRelFiles.add(relPath);
        if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
      }
    }
  }
  walk(targetRoot);

  function cleanRouteExists(rawPath) {
    const cleanPath = decodeURIComponent(String(rawPath || '').split('#')[0].split('?')[0]);
    if (cleanPath === '' || cleanPath === '/') return allRelFiles.has('index.html');
    const trimmed = cleanPath.replace(/^\/+/, '');
    if (allRelFiles.has(trimmed)) return true;
    const noTrail = trimmed.replace(/\/+$/, '');
    if (allRelFiles.has(`${noTrail}.html`)) return true;
    if (allRelFiles.has(`${noTrail}/index.html`)) return true;
    return false;
  }

  let issues = 0;
  let checked = 0;
  const pageCanonicals = new Map();
  const noindexPages = new Set();

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

    const expectedCanonical = rel === 'index.html'
      ? `${SITE_ORIGIN}/`
      : rel.endsWith('/index.html')
        ? `${SITE_ORIGIN}/${encodeURI(rel.slice(0, -'index.html'.length))}`
        : `${SITE_ORIGIN}/${encodeURI(rel.replace(/\.html$/, ''))}`;

    if (isNoindex) {
      noindexPages.add(expectedCanonical);
    }

    const canonicalMatch = headContent.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
      || headContent.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);

    if (!isNoindex) {
      if (!canonicalMatch) {
        console.warn(`  [SEO WARN] ${rel}: public page missing canonical`);
        issues++;
      } else {
        const canonicalHref = canonicalMatch[1];
        pageCanonicals.set(expectedCanonical, canonicalHref);
        if (!canonicalHref.startsWith(`${SITE_ORIGIN}/`) || /\.html($|\?|#)/i.test(canonicalHref) || canonicalHref !== expectedCanonical) {
          console.warn(`  [SEO WARN] ${rel}: canonical "${canonicalHref}" does not match clean URL "${expectedCanonical}"`);
          issues++;
        }
      }
    }

    // Audit all internal <a href="..."> links for clean URLs & broken targets
    const aMatches = [...content.matchAll(/<a\b[^>]*?\bhref=["']([^"']+)["'][^>]*>/gi)];
    for (const m of aMatches) {
      const href = m[1].trim();
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;

      if (/^https?:\/\//i.test(href)) {
        if (href.startsWith(`${SITE_ORIGIN}/`) && /\.html($|\?|#)/i.test(href)) {
          console.warn(`  [SEO WARN] ${rel}: internal absolute link uses .html (${href})`);
          issues++;
        }
        continue;
      }

      const pathOnly = href.split('#')[0].split('?')[0];
      if (/\.html$/i.test(pathOnly)) {
        console.warn(`  [SEO WARN] ${rel}: internal link still uses .html (${href})`);
        issues++;
      }

      const resolved = pathOnly.startsWith('/')
        ? pathOnly
        : '/' + path.posix.normalize(path.posix.join(path.posix.dirname(rel) === '.' ? '' : path.posix.dirname(rel), pathOnly));

      if (!cleanRouteExists(resolved)) {
        console.warn(`  [SEO WARN] ${rel}: broken internal link "${href}" (resolved "${resolved}")`);
        issues++;
      }
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

  // Cross-check sitemap.xml entries against dist/ pages & canonicals
  const sitemapPath = path.join(targetRoot, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1].trim());
    for (const loc of locs) {
      if (!loc.startsWith(`${SITE_ORIGIN}/`) || /\.html($|\?|#)/i.test(loc)) {
        console.warn(`  [SEO WARN] sitemap.xml: non-clean URL "${loc}"`);
        issues++;
        continue;
      }
      if (noindexPages.has(loc)) {
        console.warn(`  [SEO WARN] sitemap.xml: includes noindex URL "${loc}"`);
        issues++;
      }
      if (!pageCanonicals.has(loc)) {
        console.warn(`  [SEO WARN] sitemap.xml: URL "${loc}" has no matching canonical page in dist/`);
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
const { publishedPosts, categories } = getBlogRepository();

generateBlogPagination(publishedPosts, categories);
generateSitemap(publishedPosts);
generateRssFeed(publishedPosts);
syncHomeAnd404LatestPosts(publishedPosts);
enhanceBlogPosts(publishedPosts);
syncRedirects(publishedPosts);

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
