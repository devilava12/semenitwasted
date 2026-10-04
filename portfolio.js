/**
 * SEMENITWASTED — Portfolio Engine (portfolio.js)
 * Data-Driven Bento Grid Rendering, Category Filtering, Theme & Drawer
 * Adheres strictly to porfolio_page_spec.md
 */

// --- 27. PORTFOLIO DATA MODEL (Personal Projects) ---
// Tailored to user's guidance:
// "saat ini saya hanya berencana untuk menambahkan personal project saja
// (semua akan saya masukkan dalam bentuk desain web tapi isinya antara desain karakter, icon dan konsep web design)"
const portfolioData = [
  {
    id: "web-tactile-studio",
    title: "Tactile Neumorphic Web Studio",
    category: "Web",
    categoryLabel: "Web Design",
    description: "Personal web interface exploration focusing on soft tactile surfaces, subtle depth, and editorial typography.",
    span: "col-span-6",
    tags: ["Personal Project", "Web UI", "Soft Neumorphism"],
    urlText: "semenitwasted.com/lab/tactile",
    previewType: "web-layout-1",
    featured: false,
    ctaText: "View Concept →"
  },
  {
    id: "icon-system-vector",
    title: "Minimal Icon System",
    category: "Icons",
    categoryLabel: "Icon Design",
    description: "Structured vector icon set designed with 24px pixel grids, smooth curves, and microstock optimization.",
    span: "col-span-3",
    tags: ["Icon Grid", "Vector Art"],
    urlText: "icons.semenitwasted.com",
    previewType: "icon-grid",
    featured: false,
    ctaText: "Explore Icons →"
  },
  {
    id: "character-avatar-universe",
    title: "Character Design & Avatar",
    category: "Illustration",
    categoryLabel: "Character",
    description: "Original character universe and signature personal brand avatar in playful expressive vector illustrations.",
    span: "col-span-3",
    tags: ["Character Art", "Mascot"],
    urlText: "art.semenitwasted.com/avatar",
    previewType: "character-avatar",
    featured: false,
    ctaText: "View Artwork →"
  },
  {
    id: "branding-visual-identity",
    title: "Personal Brand Identity",
    category: "Branding",
    categoryLabel: "Branding",
    description: "Visual identity guidelines, pastel color palette harmony, and minimalist vector typography system.",
    span: "col-span-4",
    tags: ["Brand Guide", "Typography", "Palette"],
    urlText: "identity.semenitwasted.com",
    previewType: "branding-swatch",
    featured: false,
    ctaText: "View Identity →"
  },
  {
    id: "featured-character-web-fusion",
    title: "Character Meets Web UI",
    category: "Web",
    categoryLabel: "Featured Personal Work",
    description: "A flagship personal exploration fusing expressive character illustration with an interactive modular web canvas. Built to feel tactile, lively, and quietly premium.",
    span: "col-span-8",
    tags: ["Featured", "Character + Web UI", "Interactive Canvas"],
    urlText: "showcase.semenitwasted.com/fusion",
    previewType: "featured-character",
    featured: true,
    ctaText: "Explore Showcase →"
  },
  {
    id: "experiments-ui-playground",
    title: "Playful UI Experiments",
    category: "Experiment",
    categoryLabel: "Experiments",
    description: "Interactive micro-animation sandbox, tactile button physics, and custom state switchers.",
    span: "col-span-6",
    tags: ["UI Labs", "Micro-Interactions", "Prototype"],
    urlText: "labs.semenitwasted.com/physics",
    previewType: "experiment-controls",
    featured: false,
    ctaText: "Play Demo →"
  },
  {
    id: "personal-creative-archive",
    title: "Creative Sketchbook & Archive",
    category: "Personal",
    categoryLabel: "Personal",
    description: "Work-in-progress vector doodles, conceptual draft cards, and creative ideas.",
    span: "col-span-3",
    tags: ["Drafts", "Vector Notes"],
    urlText: "archive.semenitwasted.com",
    previewType: "sketchbook-preview",
    featured: false,
    ctaText: "Open Archive →"
  },
  {
    id: "vector-soundscapes",
    title: "Audio-Visual Sandbox",
    category: "Experiment",
    categoryLabel: "Experiment",
    description: "Conceptual ambient player card blending pastel vector graphics with tactile sound toggles.",
    span: "col-span-3",
    tags: ["Ambient", "Sound & Vector"],
    urlText: "sound.semenitwasted.com",
    previewType: "audio-visual-preview",
    featured: false,
    ctaText: "Listen →"
  }
];

// --- PREVIEW GENERATORS (Render Web Design Mockup Frames) ---
function renderPreviewHTML(item) {
  const browserBar = `
    <div class="browser-top-bar" aria-hidden="true">
      <span class="browser-dot dot-red"></span>
      <span class="browser-dot dot-yellow"></span>
      <span class="browser-dot dot-green"></span>
      <span class="browser-address">${item.urlText || 'semenitwasted.com'}</span>
    </div>
  `;

  let innerContent = '';

  switch (item.previewType) {
    case 'character-avatar':
      innerContent = `
        <div class="preview-content">
          <img src="assets/card-center.png" alt="Character Avatar Design" class="preview-artwork-img" loading="lazy">
        </div>
      `;
      break;

    case 'featured-character':
      innerContent = `
        <div class="preview-content">
          <div class="featured-preview-layout">
            <div class="featured-art-side">
              <img src="assets/avatar-illustration.png" alt="Featured Character Artwork" loading="lazy">
            </div>
            <div class="featured-details-side">
              <span class="featured-stat-badge">✦ Interactive Stage Canvas</span>
              <p style="font-size:0.85rem; color:#D5CCD9; line-height: 1.5;">
                Merging 2D vector character assets with real-time responsive CSS grid cards and tactile hover states.
              </p>
              <div style="display:flex; gap:8px;">
                <span class="card-tag" style="background:rgba(255,255,255,0.12); color:#FCFAFD; border-color:rgba(255,255,255,0.25);">Live Preview</span>
                <span class="card-tag">Figma to Code</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'icon-grid':
      innerContent = `
        <div class="preview-content">
          <div class="preview-icon-grid" aria-label="Icon grid showcase">
            <div class="mini-icon-box" title="Adobe Stock Vector">
              <img src="assets/adobe-stock.svg" alt="Adobe Stock" width="22" height="22">
            </div>
            <div class="mini-icon-box" title="Flaticon Icon System">
              <img src="assets/flaticon.svg" alt="Flaticon" width="22" height="22">
            </div>
            <div class="mini-icon-box" title="Noun Project">
              <img src="assets/noun-project.svg" alt="Noun Project" width="22" height="22">
            </div>
            <div class="mini-icon-box" title="Brand Center Mark">
              <img src="assets/logo-center.svg" alt="Logo Mark" width="22" height="22">
            </div>
            <div class="mini-icon-box" title="Canva Resource">
              <img src="assets/canva.svg" alt="Canva" width="22" height="22">
            </div>
            <div class="mini-icon-box" title="Instagram Creative">
              <img src="assets/instagram.svg" alt="Instagram" width="22" height="22">
            </div>
          </div>
        </div>
      `;
      break;

    case 'branding-swatch':
      innerContent = `
        <div class="preview-content" style="flex-direction: column; gap: 10px;">
          <div style="display:flex; gap:8px; width: 100%; justify-content: center;">
            <div style="width:36px; height:36px; border-radius:10px; background:#211B28; box-shadow:0 4px 8px rgba(33,27,40,0.3);" title="#211B28 Core Dark"></div>
            <div style="width:36px; height:36px; border-radius:10px; background:#450D50; box-shadow:0 4px 8px rgba(69,13,80,0.25);" title="#450D50 Shadow Core"></div>
            <div style="width:36px; height:36px; border-radius:10px; background:#E4DCE9; border:1px solid #D5CCD9;" title="#E4DCE9 Border Neutral"></div>
            <div style="width:36px; height:36px; border-radius:10px; background:#F0EDF4; border:1px solid #D5CCD9;" title="#F0EDF4 Canvas Light"></div>
          </div>
          <div style="font-size:0.75rem; color:var(--text-secondary); text-align:center; font-weight:500;">
            Rubik Typography · 8px Spacing Matrix
          </div>
        </div>
      `;
      break;

    case 'experiment-controls':
      innerContent = `
        <div class="preview-content">
          <div style="display:flex; flex-direction:column; gap:12px; width:100%; max-width:280px; align-items:center;">
            <div style="display:flex; gap:12px; align-items:center;">
              <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">Tactile Switch</span>
              <div style="width:48px; height:26px; border-radius:999px; background:var(--strong); padding:3px; display:flex; justify-content:flex-end; cursor:pointer;">
                <div style="width:20px; height:20px; border-radius:50%; background:#FCFAFD; box-shadow:0 2px 4px rgba(0,0,0,0.25);"></div>
              </div>
            </div>
            <div style="width:100%; height:8px; background:var(--border); border-radius:999px; overflow:hidden;">
              <div style="width:68%; height:100%; background:var(--strong);"></div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'audio-visual-preview':
      innerContent = `
        <div class="preview-content">
          <div style="display:flex; align-items:center; gap:4px; height:50px;" aria-hidden="true">
            <span style="width:4px; height:18px; background:var(--strong); border-radius:2px;"></span>
            <span style="width:4px; height:34px; background:var(--strong); border-radius:2px;"></span>
            <span style="width:4px; height:46px; background:var(--text-secondary); border-radius:2px;"></span>
            <span style="width:4px; height:28px; background:var(--strong); border-radius:2px;"></span>
            <span style="width:4px; height:40px; background:var(--text-secondary); border-radius:2px;"></span>
            <span style="width:4px; height:22px; background:var(--strong); border-radius:2px;"></span>
            <span style="width:4px; height:12px; background:var(--strong); border-radius:2px;"></span>
          </div>
        </div>
      `;
      break;

    default: // web-layout-1 or generic
      innerContent = `
        <div class="preview-content">
          <div style="width:100%; background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:8px;">
            <div style="width:40%; height:8px; background:var(--accent-purple); border-radius:4px; opacity:0.75;"></div>
            <div style="width:85%; height:6px; background:var(--border); border-radius:4px;"></div>
            <div style="width:65%; height:6px; background:var(--border); border-radius:4px;"></div>
            <div style="display:flex; gap:6px; margin-top:4px;">
              <div style="width:24px; height:14px; background:var(--soft-purple); border-radius:4px;"></div>
              <div style="width:24px; height:14px; background:var(--soft-pink); border-radius:4px;"></div>
            </div>
          </div>
        </div>
      `;
      break;
  }

  return `
    <div class="card-preview-frame">
      ${browserBar}
      ${innerContent}
    </div>
  `;
}

// --- RENDER BENTO GRID CARDS ---
function renderBentoGrid(items) {
  const gridContainer = document.getElementById('bentoGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  items.forEach(item => {
    const cardEl = document.createElement('article');
    const isFeatured = item.featured ? 'card-featured' : '';
    cardEl.className = `bento-card ${item.span} ${isFeatured}`;
    cardEl.setAttribute('data-category', item.category);

    const tagsHtml = item.tags.map(t => `<span class="card-tag">${t}</span>`).join('');

    cardEl.innerHTML = `
      <div class="card-top-meta">
        <span class="card-category-label">${item.categoryLabel}</span>
        <div class="card-cta-icon" aria-hidden="true">→</div>
      </div>
      
      ${renderPreviewHTML(item)}

      <div class="card-content-wrap">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-description">${item.description}</p>
        <div class="card-tags">
          ${tagsHtml}
        </div>
      </div>
    `;

    gridContainer.appendChild(cardEl);
  });
}

// --- INITIALIZE PAGE ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Render of all cards
  renderBentoGrid(portfolioData);

  // 2. Category Filter Handler
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-filter');

      if (selectedCategory === 'all') {
        renderBentoGrid(portfolioData);
      } else {
        const filtered = portfolioData.filter(item => 
          item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        renderBentoGrid(filtered);
      }
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const expanded = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
      mobileDrawer.setAttribute('aria-hidden', String(!expanded));
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 4. Theme Toggle (Light / Dark)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('semenitwasted_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('semenitwasted_theme', 'light');
        updateThemeIcon(false);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('semenitwasted_theme', 'dark');
        updateThemeIcon(true);
      }
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
});
