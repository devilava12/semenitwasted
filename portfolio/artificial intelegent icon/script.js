/**
 * ==========================================================================
 * SEMENITWASTED — ARTIFICIAL INTELLIGENCE ICON SYSTEM
 * Interactive Showcase, Live Search, Filter & Modal Inspector
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const iconsData = window.AI_ICONS_DATA || [];
  const galleryGrid = document.getElementById('iconGalleryGrid');
  const searchInput = document.getElementById('searchIconsInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const styleTabBtns = document.querySelectorAll('.style-tab-btn');
  const styleSwitcher = document.getElementById('styleSwitcher');
  const styleSwitcherPillBg = document.getElementById('styleSwitcherPillBg');

  function updateStylePill(activeBtn) {
    if (!styleSwitcherPillBg || !activeBtn) return;
    const offsetLeft = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;
    styleSwitcherPillBg.style.transform = `translateX(${offsetLeft - 4}px)`;
    styleSwitcherPillBg.style.width = `${width}px`;
  }
  // Scoped strictly to category pills inside the toolbar so other pill buttons are NEVER included
  const catPillBtns = document.querySelectorAll('.category-pills-wrap .cat-pill-btn');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const surfaceDotBtns = document.querySelectorAll('.surface-dot-btn');
  const galleryCountText = document.getElementById('galleryCountText');

  // Modal elements
  const modalBackdrop = document.getElementById('iconModalBackdrop');
  const modalCard = modalBackdrop ? modalBackdrop.querySelector('.icon-modal-card') : null;
  const modalTitle = document.getElementById('modalIconTitle');
  const modalCategoryBadge = document.getElementById('modalCategoryBadge');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalLineCanvas = document.getElementById('modalLineCanvas');
  const modalGlyphCanvas = document.getElementById('modalGlyphCanvas');
  const modalToggleGridBtn = document.getElementById('modalToggleGridBtn');
  const modalGridBtnText = document.getElementById('modalGridBtnText');

  // Current State
  let currentSearch = '';
  let currentStyle = 'line'; // 'line' | 'glyph' | 'all'
  let currentCategory = 'all';
  let currentSize = '64';
  let currentSurface = 'soft';
  let activeModalItem = null;

  // --- 1. Render Gallery Items ---
  function getDisplayList() {
    let result = [];

    iconsData.forEach(item => {
      // Filter by Category
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return;
      }

      // Filter by Search Query
      if (currentSearch.trim() !== '') {
        const query = currentSearch.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchName && !matchCategory) return;
      }

      // Filter by Style
      if (currentStyle === 'line' || currentStyle === 'all') {
        result.push({
          ...item,
          variantStyle: 'Line',
          file: item.lineFile,
          svg: item.lineSvg,
          uniqueKey: `${item.id}-line`
        });
      }

      if (currentStyle === 'glyph' || currentStyle === 'all') {
        result.push({
          ...item,
          variantStyle: 'Glyph',
          file: item.glyphFile,
          svg: item.glyphSvg,
          uniqueKey: `${item.id}-glyph`
        });
      }
    });

    return result;
  }

  function renderGallery() {
    if (!galleryGrid) return;
    const items = getDisplayList();

    if (galleryCountText) {
      const totalAvailable = currentStyle === 'all' ? 100 : 50;
      galleryCountText.textContent = `Menampilkan ${items.length} dari ${totalAvailable} ikon`;
    }

    if (items.length === 0) {
      galleryGrid.innerHTML = `
        <div class="empty-gallery-state" role="status">
          <h3 class="empty-gallery-title">Tidak ada ikon yang cocok</h3>
          <p class="empty-gallery-desc">Coba kata kunci lain atau ubah filter kategori dan gaya.</p>
          <button type="button" class="btn-secondary" id="btnResetFilters">Reset Semua Filter</button>
        </div>
      `;
      const btnReset = document.getElementById('btnResetFilters');
      if (btnReset) {
        btnReset.addEventListener('click', resetAllFilters);
      }
      return;
    }

    galleryGrid.innerHTML = items.map(it => `
      <article class="icon-card" data-key="${it.uniqueKey}" data-id="${it.id}" tabindex="0" role="button" aria-label="Buka inspeksi ${it.name} (${it.variantStyle})">
        <div class="icon-card-preview" title="Klik untuk inspeksi ${it.name}">
          <div class="icon-svg-wrap" aria-hidden="true">
            ${it.svg}
          </div>
        </div>

        <div class="icon-card-info">
          <div class="icon-card-title-row">
            <span class="icon-card-title" title="${it.name}">${it.name}</span>
          </div>
          <div class="icon-card-badges">
            <span class="badge-style ${it.variantStyle === 'Glyph' ? 'badge-style--glyph' : ''}">${it.variantStyle}</span>
            <span class="badge-category">${it.category}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Attach Click Events to cards for inspection modal
    galleryGrid.querySelectorAll('.icon-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const item = iconsData.find(d => d.id === id);

      card.addEventListener('click', () => {
        if (item) openModal(item);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (item) openModal(item);
        }
      });
    });
  }

  function resetAllFilters() {
    currentSearch = '';
    currentCategory = 'all';
    currentStyle = 'line';
    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.classList.remove('visible');

    styleTabBtns.forEach(btn => {
      const isLine = btn.getAttribute('data-style') === 'line';
      btn.classList.toggle('active', isLine);
      btn.setAttribute('aria-selected', isLine ? 'true' : 'false');
      if (isLine) updateStylePill(btn);
    });

    catPillBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
    });

    renderGallery();
  }

  // --- 2. Modal Detail Inspector ---
  function openModal(item) {
    activeModalItem = item;
    if (!modalBackdrop) return;

    if (modalTitle) modalTitle.textContent = item.name;
    if (modalCategoryBadge) modalCategoryBadge.textContent = item.category;

    if (modalLineCanvas) modalLineCanvas.innerHTML = item.lineSvg;
    if (modalGlyphCanvas) modalGlyphCanvas.innerHTML = item.glyphSvg;

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModalItem = null;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      // Close only if backdrop itself is clicked, not when clicking inside modal card
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  if (modalCard) {
    // Prevent any click inside the card from bubbling to the backdrop
    modalCard.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Toggle Grid Guidelines inside Modal
  if (modalToggleGridBtn) {
    modalToggleGridBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Never bubble to backdrop or background elements
      const isShow = modalLineCanvas ? modalLineCanvas.classList.toggle('show-grid') : false;
      if (modalGlyphCanvas) modalGlyphCanvas.classList.toggle('show-grid', isShow);
      modalToggleGridBtn.classList.toggle('active', isShow);
      modalToggleGridBtn.setAttribute('aria-pressed', isShow ? 'true' : 'false');
      if (modalGridBtnText) {
        modalGridBtnText.textContent = isShow ? 'Sembunyikan Garis Grid 76px' : 'Tampilkan Garis Grid 76px';
      }
    });
  }

  // --- 3. Search Bar Handler ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('visible', currentSearch.length > 0);
      }
      renderGallery();
    });

    // Keyboard shortcut '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && (!modalBackdrop || !modalBackdrop.classList.contains('open'))) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
        searchClearBtn.classList.remove('visible');
        renderGallery();
        searchInput.focus();
      }
    });
  }

  // --- 4. Style Switcher Handler ---
  styleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      styleTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      updateStylePill(btn);
      currentStyle = btn.getAttribute('data-style');
      renderGallery();
    });
  });

  // --- 5. Category Filter Handler ---
  // Notice: ONLY queries inside .category-pills-wrap, completely immune to modal buttons
  catPillBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      catPillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      renderGallery();
    });
  });

  // --- 6. Size Controls ---
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = btn.getAttribute('data-size') || '64';
      if (galleryGrid) galleryGrid.setAttribute('data-size', currentSize);
    });
  });

  // --- 7. Surface Preview Toggle ---
  surfaceDotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      surfaceDotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSurface = btn.getAttribute('data-surface') || 'soft';
      if (galleryGrid) {
        galleryGrid.classList.remove('surface--white', 'surface--dark');
        if (currentSurface === 'white') galleryGrid.classList.add('surface--white');
        if (currentSurface === 'dark') galleryGrid.classList.add('surface--dark');
      }
    });
  });

  // Initial Setup
  if (galleryGrid) {
    galleryGrid.setAttribute('data-size', currentSize);
  }
  renderGallery();

  const initialActiveStyle = document.querySelector('.style-tab-btn.active') || styleTabBtns[0];
  if (initialActiveStyle) updateStylePill(initialActiveStyle);

  window.addEventListener('resize', () => {
    const active = document.querySelector('.style-tab-btn.active');
    if (active) updateStylePill(active);
  });

  if (document.fonts) {
    document.fonts.ready.then(() => {
      const active = document.querySelector('.style-tab-btn.active');
      if (active) updateStylePill(active);
    });
  }
});
