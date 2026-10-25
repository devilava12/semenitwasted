/**
 * semenitwasted — Blog Interactive Controller (blog.js)
 * Standalone IIFE:
 * - Dynamic Category Auto-Generation: automatically discovers new categories from
 *   blog-data.js and DOM cards, creating filter pills and calculating live counts.
 * - Dynamic Article Sync: seamlessly renders new articles added to blog-data.js.
 * - Client-side live search, category filtering, empty-state management, and RSS copy.
 * - 100% compatible with file:// protocol and Cloudflare Pages.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
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
    return String(str).replace(/"/g, '&quot;');
  }

  function formatCategoryLabel(slug) {
    if (!slug) return '';
    return String(slug)
      .split(/[-_]+/)
      .filter(Boolean)
      .map(word => {
        if (word.toLowerCase() === 'and') return '&';
        if (word.toLowerCase() === 'css' || word.toLowerCase() === 'ux' || word.toLowerCase() === 'ui') return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  function createArticleCardElement(post) {
    const article = document.createElement('article');
    article.className = 'article-bento-card' + (post.coverImage ? ' has-cover' : '');
    article.setAttribute('data-category', post.category || '');

    const tagsArr = Array.isArray(post.tags) ? post.tags : [];
    const tagsAttr = tagsArr.map(t => String(t).replace(/^#/, '')).join(' ').toLowerCase();
    article.setAttribute('data-tags', tagsAttr);

    const tagsChips = tagsArr
      .map(t => `<span class="tag-chip">#${escapeHTML(String(t).replace(/^#/, ''))}</span>`)
      .join('');

    const coverMarkup = post.coverImage ? `
      <a href="${escapeAttr(post.contentUrl || '#')}" class="article-cover-link" tabindex="-1" aria-hidden="true">
        <div class="article-cover-frame">
          <img src="${escapeAttr(post.coverImage)}" alt="${escapeAttr(post.coverAlt || post.title || '')}" class="article-cover-img" width="800" height="450" loading="lazy">
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
          <a href="${escapeAttr(post.contentUrl || '#')}">${escapeHTML(post.title || '')}</a>
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

  // --------------------------------------------------------------------------
  // Main Blog Controller
  // --------------------------------------------------------------------------
  function initBlog() {
    // Core DOM Elements
    const searchInput = document.getElementById('blogSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const categoryFilterGroup = document.getElementById('categoryFilterGroup');
    const featuredSection = document.getElementById('featuredSection');
    const featuredPostCard = document.getElementById('featuredPostCard');
    const catalogGrid = document.getElementById('blogGridContainer');
    const catalogStatus = document.getElementById('catalogStatus');
    const emptyState = document.getElementById('blogEmptyState');
    const emptyStateDesc = document.getElementById('emptyStateDesc');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const copyRssBtn = document.getElementById('copyRssBtn');
    const copyRssText = document.getElementById('copyRssText');

    let currentCategory = 'all';
    let currentSearchQuery = '';

    // ------------------------------------------------------------------------
    // 1. Sync Dynamic Posts from window.BLOG_POSTS into DOM (Newest to Oldest)
    // ------------------------------------------------------------------------
    function syncDynamicPosts() {
      if (!catalogGrid) return;
      const posts = window.BLOG_POSTS || [];
      if (posts.length === 0) return;

      // Collect all article URLs already in catalogGrid to avoid duplicate rendering
      const existingHrefs = new Set();
      const existingLinks = catalogGrid.querySelectorAll('a[href]');
      existingLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (href) existingHrefs.add(href.trim());
      });

      // Sort posts in data by date descending (newest to oldest)
      const sortedPosts = [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

      sortedPosts.forEach(post => {
        // If article is featured and already in spotlight, check if we also want it in grid or skip
        if (post.contentUrl && existingHrefs.has(post.contentUrl.trim())) return;

        // Article in data is not present in catalog DOM -> dynamically create & append
        const cardNode = createArticleCardElement(post);
        catalogGrid.appendChild(cardNode);
        if (post.contentUrl) existingHrefs.add(post.contentUrl.trim());
      });

      // Guarantee all DOM cards in catalogGrid are strictly sorted newest to oldest
      const allCards = Array.from(catalogGrid.querySelectorAll('.article-bento-card'));
      allCards.sort((a, b) => {
        const timeA = a.querySelector('time')?.getAttribute('datetime') || '';
        const timeB = b.querySelector('time')?.getAttribute('datetime') || '';
        return timeB.localeCompare(timeA);
      });
      allCards.forEach(card => catalogGrid.appendChild(card));
    }

    // ------------------------------------------------------------------------
    // 2. Discover & Render Category Filter Buttons (Automatic & Dynamic)
    // ------------------------------------------------------------------------
    function buildAndRenderCategories() {
      if (!categoryFilterGroup) return;

      // Base category catalog
      const predefinedCategories = window.BLOG_CATEGORIES || [
        { id: 'all', label: 'All Topics' },
        { id: 'design-systems', label: 'Design Systems' },
        { id: 'frontend-code', label: 'Frontend & Code' },
        { id: 'product-support', label: 'Product & Support' },
        { id: 'reflections', label: 'Reflections' }
      ];

      // Ordered category map
      const categoryMap = new Map();

      // Seed predefined categories
      predefinedCategories.forEach(cat => {
        if (!cat || !cat.id) return;
        categoryMap.set(cat.id, {
          id: cat.id,
          label: cat.label || formatCategoryLabel(cat.id),
          count: 0
        });
      });

      // Ensure 'all' is always present as the first option
      if (!categoryMap.has('all')) {
        categoryMap.set('all', { id: 'all', label: 'All Topics', count: 0 });
      }

      // 1. Discover from window.BLOG_POSTS
      const posts = window.BLOG_POSTS || [];
      let totalPosts = 0;

      if (posts.length > 0) {
        posts.forEach(post => {
          totalPosts++;
          const catId = post.category ? String(post.category).trim().toLowerCase() : '';
          if (!catId) return;

          if (!categoryMap.has(catId)) {
            const label = post.categoryLabel || formatCategoryLabel(catId);
            categoryMap.set(catId, {
              id: catId,
              label: label,
              count: 0
            });
          }
          categoryMap.get(catId).count++;
        });
        categoryMap.get('all').count = totalPosts;
      }

      // 2. Discover from any extra DOM cards (e.g. static HTML cards or edits)
      const domCards = [];
      if (featuredPostCard) domCards.push(featuredPostCard);
      document.querySelectorAll('.blog-articles-grid .article-bento-card').forEach(c => domCards.push(c));

      if (posts.length === 0) {
        // Fallback: If BLOG_POSTS is missing, count purely from DOM cards
        let domTotal = 0;
        domCards.forEach(card => {
          domTotal++;
          const catId = (card.getAttribute('data-category') || '').trim().toLowerCase();
          if (!catId) return;

          if (!categoryMap.has(catId)) {
            const pillSm = card.querySelector('.category-pill-sm');
            const label = pillSm ? pillSm.textContent.trim() : formatCategoryLabel(catId);
            categoryMap.set(catId, {
              id: catId,
              label: label,
              count: 0
            });
          }
          categoryMap.get(catId).count++;
        });
        categoryMap.get('all').count = domTotal;
      } else {
        // Cross-check DOM cards to discover any category not in BLOG_POSTS
        domCards.forEach(card => {
          const catId = (card.getAttribute('data-category') || '').trim().toLowerCase();
          if (catId && !categoryMap.has(catId)) {
            const pillSm = card.querySelector('.category-pill-sm');
            const label = pillSm ? pillSm.textContent.trim() : formatCategoryLabel(catId);
            categoryMap.set(catId, {
              id: catId,
              label: label,
              count: 1
            });
            categoryMap.get('all').count++;
          }
        });
      }

      // Filter categories to render:
      // Show 'all' plus any category that has at least 1 article or was explicitly configured
      const categoriesToRender = Array.from(categoryMap.values()).filter(cat => {
        if (cat.id === 'all') return true;
        const isExplicit = (window.BLOG_CATEGORIES || []).some(c => c.id === cat.id);
        return cat.count > 0 || isExplicit;
      });

      // Render pills into container
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
    // 3. Filtering & Live Search Logic
    // ------------------------------------------------------------------------
    function filterArticles() {
      const query = currentSearchQuery.trim().toLowerCase();
      let visibleCatalogCount = 0;
      let isFeaturedVisible = false;

      // Filter Featured Post Card
      if (featuredPostCard && featuredSection) {
        const featuredCat = (featuredPostCard.getAttribute('data-category') || '').trim().toLowerCase();
        const featuredText = (featuredPostCard.textContent || '').toLowerCase();

        const catMatches = currentCategory === 'all' || featuredCat === currentCategory;
        const searchMatches = !query || featuredText.includes(query);

        if (catMatches && searchMatches) {
          featuredSection.style.display = '';
          isFeaturedVisible = true;
        } else {
          featuredSection.style.display = 'none';
        }
      }

      // Filter Catalog Grid Cards (queries dynamically to include any newly synced cards)
      const currentCards = catalogGrid ? catalogGrid.querySelectorAll('.article-bento-card') : [];
      currentCards.forEach(card => {
        const cardCat = (card.getAttribute('data-category') || '').trim().toLowerCase();
        const cardTags = card.getAttribute('data-tags') || '';
        const cardContent = (card.textContent + ' ' + cardTags).toLowerCase();

        const catMatches = currentCategory === 'all' || cardCat === currentCategory;
        const searchMatches = !query || cardContent.includes(query);

        if (catMatches && searchMatches) {
          card.style.display = '';
          visibleCatalogCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const totalVisible = (isFeaturedVisible ? 1 : 0) + visibleCatalogCount;

      // Update Catalog Status Label
      if (catalogStatus) {
        if (totalVisible === 0) {
          catalogStatus.textContent = 'No essays found';
        } else if (totalVisible === 1) {
          catalogStatus.textContent = 'Showing 1 essay';
        } else {
          catalogStatus.textContent = `Showing ${totalVisible} essays`;
        }
      }

      // Toggle Empty State Container
      if (emptyState && catalogGrid) {
        if (totalVisible === 0) {
          emptyState.hidden = false;
          catalogGrid.style.display = 'none';
          if (emptyStateDesc) {
            if (query) {
              emptyStateDesc.textContent = `No essays matched "${currentSearchQuery}". Try adjusting your keywords or clearing category filters.`;
            } else {
              emptyStateDesc.textContent = 'No essays found in this category.';
            }
          }
        } else {
          emptyState.hidden = true;
          catalogGrid.style.display = '';
        }
      }
    }

    // ------------------------------------------------------------------------
    // 4. Category Switcher Logic
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

      filterArticles();
    }

    // Delegated click event on filter group container
    if (categoryFilterGroup) {
      categoryFilterGroup.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;
        const cat = pill.getAttribute('data-category') || 'all';
        setCategory(cat);
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
    // 5. Instant Search & Clear Logic
    // ------------------------------------------------------------------------
    function resetSearch() {
      if (!searchInput) return;
      searchInput.value = '';
      currentSearchQuery = '';
      if (clearSearchBtn) clearSearchBtn.hidden = true;
      searchInput.focus();
      filterArticles();
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;

        if (clearSearchBtn) {
          clearSearchBtn.hidden = currentSearchQuery.length === 0;
        }

        filterArticles();
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
    // 6. Reset All Filters (From Empty State)
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
    // 7. Copy RSS URL Feedback
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
    syncDynamicPosts();
    buildAndRenderCategories();
    filterArticles();
  }

  // Safe bootstrap (handles both loading and interactive/complete DOM states)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog, { once: true });
  } else {
    initBlog();
  }
})();
