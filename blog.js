/**
 * semenitwasted - Blog Interactive Controller (blog.js)
 * Standalone IIFE supporting dual-mode static + filtered client-side pagination:
 * - Unfiltered default state: preserves build.js static 8-card pages & <a> pagination links
 *   (rewriting relative .html hrefs cleanly on web/Cloudflare Pages while staying 100% file:// compatible).
 * - Filtered / Search state (including ?category= deep links): hides #featuredSection,
 *   filters across all published posts in window.BLOG_POSTS (newest -> oldest), and paginates
 *   at 8 per page with accessible <button> controls in #blogPagination.
 * - Resetting back to All Topics + empty search restores the static page snapshot & #featuredSection.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Environment & Escaping Helpers
  // --------------------------------------------------------------------------
  function getEnvRouting() {
    const isWeb = typeof window !== 'undefined' &&
      (window.location.protocol === 'http:' || window.location.protocol === 'https:');
    const isLocalServer = isWeb && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]'
    );
    return { isWeb, isLocalServer };
  }

  function escapeHTML(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');
  }

  function formatCategoryLabel(slug) {
    if (!slug) return '';
    return String(slug)
      .split(/[-_]+/)
      .filter(Boolean)
      .map(word => {
        if (word.toLowerCase() === 'and') return '&';
        if (word.toLowerCase() === 'css' || word.toLowerCase() === 'ux' || word.toLowerCase() === 'ui') {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  // --------------------------------------------------------------------------
  // Main Blog Controller
  // --------------------------------------------------------------------------
  function initBlog() {
    const mainEl = document.getElementById('main-content');
    const searchInput = document.getElementById('blogSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const categoryFilterGroup = document.getElementById('categoryFilterGroup');
    const featuredSection = document.getElementById('featuredSection');
    const catalogGrid = document.getElementById('blogGridContainer');
    const catalogStatus = document.getElementById('catalogStatus');
    const emptyState = document.getElementById('blogEmptyState');
    const emptyStateDesc = document.getElementById('emptyStateDesc');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const paginationNav = document.getElementById('blogPagination');
    const copyRssBtn = document.getElementById('copyRssBtn');
    const copyRssText = document.getElementById('copyRssText');

    const { isWeb, isLocalServer } = getEnvRouting();
    const basePath = (paginationNav && paginationNav.dataset.basePath !== undefined)
      ? paginationNav.dataset.basePath
      : ((mainEl && mainEl.dataset.basePath) || '');
    const perPage = parseInt((paginationNav && paginationNav.dataset.perPage) || '8', 10) || 8;

    // Published posts sorted strictly newest -> oldest
    const allPublishedPosts = (window.BLOG_POSTS || [])
      .filter(post => post && post.slug && post.slug !== 'coming-soon')
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

    let currentCategory = 'all';
    let currentSearchQuery = '';
    let currentFilteredPage = 1;
    let isFilteredMode = false;

    // ------------------------------------------------------------------------
    // URL Resolution (Compatible with file://, localhost, and Cloudflare Pages)
    // ------------------------------------------------------------------------
    function resolveAssetUrl(relPath) {
      if (!relPath) return '';
      if (/^(https?:|\/|data:)/i.test(relPath)) return relPath;
      if (isWeb) return '/' + relPath.replace(/^\/+/, '');
      return `${basePath}${relPath}`;
    }

    function resolveArticleUrl(post) {
      const slug = post && post.slug ? encodeURI(post.slug) : '';
      if (slug) {
        return isWeb ? `/blog/${slug}` : `${basePath}blog/${slug}.html`;
      }
      const rawUrl = (post && post.contentUrl) || '';
      if (!rawUrl) return '';
      if (isWeb) return rawUrl.startsWith('/') ? rawUrl.replace(/\.html$/i, '') : '/' + rawUrl.replace(/^\/+/, '').replace(/\.html$/i, '');
      const cleanRel = rawUrl.replace(/^\/+/, '');
      return `${basePath}${cleanRel.endsWith('.html') ? cleanRel : `${cleanRel}.html`}`;
    }

    function rewriteStaticLinks() {
      // On web (Cloudflare Pages & clean-URL servers), raw HTML already uses canonical clean URLs.
      // Only rewrite on local file:// browsing so double-clicked HTML files navigate locally.
      if (isWeb) return;

      const scopes = [paginationNav, catalogGrid, featuredSection].filter(Boolean);
      scopes.forEach(scope => {
        scope.querySelectorAll('a[href^="/"]').forEach(link => {
          const rawHref = link.getAttribute('href');
          if (!rawHref || rawHref.startsWith('//')) return;
          const hashIdx = rawHref.indexOf('#');
          const hash = hashIdx >= 0 ? rawHref.slice(hashIdx) : '';
          const noHash = hashIdx >= 0 ? rawHref.slice(0, hashIdx) : rawHref;
          const qIdx = noHash.indexOf('?');
          const query = qIdx >= 0 ? noHash.slice(qIdx) : '';
          const cleanPath = qIdx >= 0 ? noHash.slice(0, qIdx) : noHash;

          let localTarget = '';
          if (cleanPath === '/') localTarget = `${basePath}index.html`;
          else if (cleanPath.endsWith('/')) localTarget = `${basePath}${cleanPath.slice(1)}index.html`;
          else if (/\.html$/i.test(cleanPath)) localTarget = `${basePath}${cleanPath.slice(1)}`;
          else localTarget = `${basePath}${cleanPath.slice(1)}.html`;

          link.setAttribute('href', `${localTarget}${query}${hash}`);
        });
      });
    }

    // Rewrite links before capturing static snapshots so restored state stays clean
    rewriteStaticLinks();

    const staticGridHTML = catalogGrid ? catalogGrid.innerHTML : '';
    const staticPaginationHTML = paginationNav ? paginationNav.innerHTML : '';
    const staticPaginationHidden = paginationNav ? paginationNav.hidden : false;
    const staticStatusText = catalogStatus ? catalogStatus.textContent : '';

    // ------------------------------------------------------------------------
    // Card & Client-Side Pagination Renderers
    // ------------------------------------------------------------------------
    function createArticleCardElement(post) {
      const article = document.createElement('article');
      article.className = 'article-bento-card' + (post.coverImage ? ' has-cover' : '');
      article.setAttribute('data-category', post.category || '');

      const tagsArr = Array.isArray(post.tags) ? post.tags : [];
      const tagsAttr = tagsArr.map(t => String(t).replace(/^#/, '')).join(' ').toLowerCase();
      article.setAttribute('data-tags', tagsAttr);

      const tagsChips = tagsArr
        .slice(0, 3)
        .map(t => `<span class="tag-chip">#${escapeHTML(String(t).replace(/^#/, ''))}</span>`)
        .join('');

      const articleHref = resolveArticleUrl(post);
      const coverSrc = resolveAssetUrl(post.coverImage);

      const coverMarkup = coverSrc ? `
        <a href="${escapeAttr(articleHref)}" class="article-cover-link" tabindex="-1" aria-hidden="true">
          <div class="article-cover-frame">
            <img src="${escapeAttr(coverSrc)}" alt="${escapeAttr(post.coverAlt || post.title || '')}" class="article-cover-img" width="800" height="450" loading="lazy" decoding="async">
          </div>
        </a>
      ` : '';

      const catLabel = post.categoryLabel || formatCategoryLabel(post.category);

      article.innerHTML = `
        ${coverMarkup}
        <div class="article-card-body">
          <div class="card-meta">
            <span class="category-pill-sm">${escapeHTML(catLabel)}</span>
            <span class="meta-separator" aria-hidden="true">&bull;</span>
            <span class="reading-time">${escapeHTML(post.readingTime || '')}</span>
          </div>
          <h3 class="card-title">
            <a href="${escapeAttr(articleHref)}">${escapeHTML(post.title || '')}</a>
          </h3>
          <p class="card-excerpt">
            ${escapeHTML(post.excerpt || '')}
          </p>
          <div class="card-footer">
            <time datetime="${escapeAttr(post.date || '')}" class="card-date">${escapeHTML(post.formattedDate || post.date || '')}</time>
            <div class="tags-cluster">
              ${tagsChips}
            </div>
          </div>
        </div>
      `.trim();

      return article;
    }

    function renderFilteredPagination(page, totalPages, totalMatches) {
      if (!paginationNav) return;

      if (totalMatches <= perPage || totalPages <= 1) {
        paginationNav.hidden = true;
        paginationNav.innerHTML = '';
        return;
      }

      const items = [];

      if (page === 1) {
        items.push('<li><span class="pagination-btn pagination-btn--prev is-disabled" aria-disabled="true">&larr; Previous</span></li>');
      } else {
        items.push(`<li><button type="button" class="pagination-btn pagination-btn--prev" data-page="${page - 1}" aria-label="Go to previous page, page ${page - 1}">&larr; Previous</button></li>`);
      }

      for (let p = 1; p <= totalPages; p++) {
        if (p === page) {
          items.push(`<li><span class="pagination-btn pagination-btn--num is-active" aria-current="page">${p}</span></li>`);
        } else {
          items.push(`<li><button type="button" class="pagination-btn pagination-btn--num" data-page="${p}" aria-label="Go to page ${p}">${p}</button></li>`);
        }
      }

      if (page === totalPages) {
        items.push('<li><span class="pagination-btn pagination-btn--next is-disabled" aria-disabled="true">Next &rarr;</span></li>');
      } else {
        items.push(`<li><button type="button" class="pagination-btn pagination-btn--next" data-page="${page + 1}" aria-label="Go to next page, page ${page + 1}">Next &rarr;</button></li>`);
      }

      paginationNav.innerHTML = `
        <ul class="pagination-list">
          ${items.join('\n          ')}
        </ul>
        <p class="pagination-summary">Page ${page} of ${totalPages} &bull; ${totalMatches} matching essays</p>
      `.trim();
      paginationNav.hidden = false;
    }

    function scrollToCatalog() {
      const target = document.getElementById('catalog-heading') || catalogGrid;
      if (!target) return;
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
    }

    // ------------------------------------------------------------------------
    // 1. Discover & Render Category Filter Buttons (No Featured Double-Count)
    // ------------------------------------------------------------------------
    function buildAndRenderCategories() {
      if (!categoryFilterGroup) return;

      const predefinedCategories = window.BLOG_CATEGORIES || [
        { id: 'all', label: 'All Topics' },
        { id: 'design-systems', label: 'Design Systems' },
        { id: 'frontend-code', label: 'Frontend & Code' },
        { id: 'product-support', label: 'Product & Support' },
        { id: 'reflections', label: 'Reflections' }
      ];

      const categoryMap = new Map();

      predefinedCategories.forEach(cat => {
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

      if (allPublishedPosts.length > 0) {
        allPublishedPosts.forEach(post => {
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
        categoryMap.get('all').count = allPublishedPosts.length;
      } else {
        // Fallback if BLOG_POSTS failed to load: count grid cards only (never featured spotlight)
        const domCards = document.querySelectorAll('.blog-articles-grid .article-bento-card');
        domCards.forEach(card => {
          const catId = (card.getAttribute('data-category') || '').trim().toLowerCase();
          if (!catId) return;
          if (!categoryMap.has(catId)) {
            const pillSm = card.querySelector('.category-pill-sm');
            categoryMap.set(catId, {
              id: catId,
              label: pillSm ? pillSm.textContent.trim() : formatCategoryLabel(catId),
              count: 0
            });
          }
          categoryMap.get(catId).count++;
        });
        categoryMap.get('all').count = domCards.length;
      }

      const categoriesToRender = Array.from(categoryMap.values()).filter(cat => {
        if (cat.id === 'all') return true;
        const isExplicit = predefinedCategories.some(c => c.id === cat.id);
        return cat.count > 0 || isExplicit;
      });

      categoryFilterGroup.innerHTML = categoriesToRender.map(cat => {
        const isActive = cat.id === currentCategory;
        return `
          <button type="button" class="category-pill ${isActive ? 'active' : ''}" data-category="${escapeAttr(cat.id)}" aria-pressed="${isActive ? 'true' : 'false'}">
            <span>${escapeHTML(cat.label)}</span>
            <span class="pill-count" id="count-${escapeAttr(cat.id)}">${cat.count}</span>
          </button>
        `.trim();
      }).join('\n');
    }

    // ------------------------------------------------------------------------
    // 2. Dual-Mode Filter & Pagination Controller
    // ------------------------------------------------------------------------
    function restoreStaticPage() {
      if (featuredSection) featuredSection.style.display = '';
      if (emptyState) emptyState.hidden = true;
      if (catalogGrid) {
        if (isFilteredMode) {
          catalogGrid.innerHTML = staticGridHTML;
        }
        catalogGrid.style.display = '';
      }
      if (paginationNav) {
        if (isFilteredMode) {
          paginationNav.innerHTML = staticPaginationHTML;
        }
        paginationNav.hidden = staticPaginationHidden;
      }
      if (catalogStatus && staticStatusText) {
        catalogStatus.textContent = staticStatusText;
      }
      isFilteredMode = false;
      currentFilteredPage = 1;
    }

    function applyFilterState({ resetPage = true } = {}) {
      const query = currentSearchQuery.trim().toLowerCase();
      const shouldFilter = currentCategory !== 'all' || query.length > 0;

      if (!shouldFilter) {
        restoreStaticPage();
        return;
      }

      isFilteredMode = true;
      if (resetPage) currentFilteredPage = 1;

      // Featured spotlight is editorial-only for unfiltered Page 1
      if (featuredSection) {
        featuredSection.style.display = 'none';
      }

      const filteredPosts = allPublishedPosts.filter(post => {
        const postCat = (post.category || '').trim().toLowerCase();
        const catMatches = currentCategory === 'all' || postCat === currentCategory;
        if (!catMatches) return false;
        if (!query) return true;

        const tagsText = Array.isArray(post.tags) ? post.tags.join(' ') : '';
        const haystack = [
          post.title || '',
          post.excerpt || '',
          post.categoryLabel || '',
          post.category || '',
          post.formattedDate || '',
          tagsText
        ].join(' ').toLowerCase();

        return haystack.includes(query);
      });

      const totalMatches = filteredPosts.length;

      if (totalMatches === 0) {
        if (catalogGrid) {
          catalogGrid.innerHTML = '';
          catalogGrid.style.display = 'none';
        }
        if (emptyState) {
          emptyState.hidden = false;
          if (emptyStateDesc) {
            if (query) {
              emptyStateDesc.textContent = `No essays matched "${currentSearchQuery}". Try adjusting your keywords or clearing category filters.`;
            } else {
              emptyStateDesc.textContent = 'No essays found in this category.';
            }
          }
        }
        if (catalogStatus) {
          catalogStatus.textContent = 'No essays found';
        }
        if (paginationNav) {
          paginationNav.hidden = true;
          paginationNav.innerHTML = '';
        }
        return;
      }

      const totalFilteredPages = Math.max(1, Math.ceil(totalMatches / perPage));
      currentFilteredPage = Math.min(Math.max(1, currentFilteredPage), totalFilteredPages);

      const startIdx = (currentFilteredPage - 1) * perPage;
      const pageSlice = filteredPosts.slice(startIdx, startIdx + perPage);

      if (emptyState) emptyState.hidden = true;
      if (catalogGrid) {
        catalogGrid.innerHTML = '';
        const frag = document.createDocumentFragment();
        pageSlice.forEach(post => frag.appendChild(createArticleCardElement(post)));
        catalogGrid.appendChild(frag);
        catalogGrid.style.display = '';
      }

      if (catalogStatus) {
        if (totalFilteredPages > 1) {
          catalogStatus.textContent = `Showing ${startIdx + 1}\u2013${startIdx + pageSlice.length} of ${totalMatches} essays \u2022 Page ${currentFilteredPage} of ${totalFilteredPages}`;
        } else if (totalMatches === 1) {
          catalogStatus.textContent = 'Showing 1 essay';
        } else {
          catalogStatus.textContent = `Showing ${totalMatches} essays`;
        }
      }

      renderFilteredPagination(currentFilteredPage, totalFilteredPages, totalMatches);
    }

    // ------------------------------------------------------------------------
    // 3. Category Switcher & Pagination Interaction
    // ------------------------------------------------------------------------
    function setCategory(targetCategory) {
      currentCategory = targetCategory || 'all';

      if (categoryFilterGroup) {
        const pills = categoryFilterGroup.querySelectorAll('.category-pill');
        pills.forEach(pill => {
          const cat = pill.getAttribute('data-category');
          const isActive = cat === currentCategory;
          pill.classList.toggle('active', isActive);
          pill.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }

      applyFilterState({ resetPage: true });
    }

    if (categoryFilterGroup) {
      categoryFilterGroup.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;
        const cat = pill.getAttribute('data-category') || 'all';
        setCategory(cat);
      });
    }

    if (paginationNav) {
      paginationNav.addEventListener('click', (e) => {
        const btn = e.target.closest('button.pagination-btn[data-page]');
        if (!btn) return;
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (!Number.isFinite(targetPage) || targetPage === currentFilteredPage) return;
        currentFilteredPage = targetPage;
        applyFilterState({ resetPage: false });
        scrollToCatalog();
      });
    }

    // Delegated tactile card click navigation (stretched link behaviour)
    if (catalogGrid) {
      catalogGrid.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const card = e.target.closest('.article-bento-card');
        if (!card) return;
        const link = card.querySelector('.card-title a') || card.querySelector('a');
        if (link && link.href) {
          window.location.href = link.href;
        }
      });
    }

    // ------------------------------------------------------------------------
    // 4. Instant Search & Clear Logic
    // ------------------------------------------------------------------------
    function resetSearch() {
      if (!searchInput) return;
      searchInput.value = '';
      currentSearchQuery = '';
      if (clearSearchBtn) clearSearchBtn.hidden = true;
      searchInput.focus();
      applyFilterState({ resetPage: true });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.hidden = currentSearchQuery.length === 0;
        }
        applyFilterState({ resetPage: true });
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentSearchQuery.length > 0) {
          resetSearch();
        }
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', resetSearch);
    }

    // ------------------------------------------------------------------------
    // 5. Reset All Filters (From Empty State)
    // ------------------------------------------------------------------------
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          currentSearchQuery = '';
          if (clearSearchBtn) clearSearchBtn.hidden = true;
        }
        setCategory('all');
      });
    }

    // ------------------------------------------------------------------------
    // 6. Copy RSS URL Feedback
    // ------------------------------------------------------------------------
    if (copyRssBtn) {
      copyRssBtn.addEventListener('click', async () => {
        const feedUrl = 'https://semenitwasted.web.id/rss.xml';

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(feedUrl);
          } else {
            const tempInput = document.createElement('input');
            tempInput.value = feedUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
          }

          if (copyRssText) copyRssText.textContent = 'Copied!';
          copyRssBtn.setAttribute('aria-label', 'RSS URL Copied to clipboard');

          setTimeout(() => {
            if (copyRssText) copyRssText.textContent = 'Copy URL';
            copyRssBtn.setAttribute('aria-label', 'Copy RSS Feed URL');
          }, 2200);
        } catch (err) {
          console.error('Failed to copy RSS URL: ', err);
        }
      });
    }

    // ------------------------------------------------------------------------
    // Initialization Sequence
    // ------------------------------------------------------------------------
    buildAndRenderCategories();

    // Support direct topic-cluster deep links like /blog?category=design-systems
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    if (initialCategory && categoryFilterGroup) {
      const matchingPill = categoryFilterGroup.querySelector(`.category-pill[data-category="${CSS.escape ? CSS.escape(initialCategory) : initialCategory}"]`);
      if (matchingPill) {
        setCategory(initialCategory);
        return;
      }
    }
  }

  // Safe bootstrap (handles both loading and interactive/complete DOM states)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog, { once: true });
  } else {
    initBlog();
  }
})();
