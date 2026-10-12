/**
 * SEMENITWASTED — Portfolio Engine (portfolio.js)
 * Data-Driven Bento Grid Rendering and Category Filtering
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
              <p class="featured-preview-copy">
                Merging 2D vector character assets with real-time responsive CSS grid cards and tactile hover states.
              </p>
              <div class="featured-preview-tags">
                <span class="card-tag card-tag--light">Live Preview</span>
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
        <div class="preview-content preview-content--swatches">
          <div class="preview-swatch-row">
            <div class="preview-swatch preview-swatch--dark" title="#211B28 Core Dark"></div>
            <div class="preview-swatch preview-swatch--shadow" title="#450D50 Shadow Core"></div>
            <div class="preview-swatch preview-swatch--border" title="#E4DCE9 Border Neutral"></div>
            <div class="preview-swatch preview-swatch--light" title="#F0EDF4 Canvas Light"></div>
          </div>
          <div class="preview-caption">
            Rubik Typography · 8px Spacing Matrix
          </div>
        </div>
      `;
      break;

    case 'experiment-controls':
      innerContent = `
        <div class="preview-content">
          <div class="preview-controls">
            <div class="preview-switch-row">
              <span class="preview-control-label">Tactile Switch</span>
              <div class="preview-switch" aria-hidden="true">
                <div class="preview-switch-thumb"></div>
              </div>
            </div>
            <div class="preview-progress" aria-hidden="true">
              <div class="preview-progress-value"></div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'audio-visual-preview':
      innerContent = `
        <div class="preview-content">
          <div class="preview-audio-bars" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      `;
      break;

    default: // web-layout-1 or generic
      innerContent = `
        <div class="preview-content">
          <div class="preview-web-layout">
            <div class="preview-web-title"></div>
            <div class="preview-web-line preview-web-line--long"></div>
            <div class="preview-web-line preview-web-line--medium"></div>
            <div class="preview-web-actions">
              <div></div><div></div>
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

});
