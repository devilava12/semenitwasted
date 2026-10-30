/* Shared navigation, theme, seasonal modes, and mobile drawer across site pages. */
(function () {
  'use strict';

  // =========================================================================
  // PENGATURAN TEMA MUSIMAN (UBAH MANUAL DI SINI)
  // Pilihan yang tersedia:
  //   'default'   -> Tema asli semenitwasted (Monokrom Lavender / Plum)
  //   'halloween' -> Tema Musim Gugur & Labu Halloween (Light & Dark Mode)
  //   'christmas' -> Tema Musim Dingin, Pinus & Berry Natal (Light & Dark Mode)
  // =========================================================================
  const SITE_SEASON = 'halloween';

  const THEME_KEY = 'semenitwasted_theme';
  const pages = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'library', label: 'Library', href: 'library.html' },
    { id: 'blog', label: 'Blog', href: 'blog.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  const SEASON_META = {
    halloween: {
      label: 'Halloween',
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c.5 1.8 1.5 2.6 2.5 3"/><path d="M12 6c-5.5 0-9 3.4-9 7.8C3 18.2 6.5 21 12 21s9-2.8 9-7.2C21 9.4 17.5 6 12 6Z"/><path d="M12 6c-2.4 1.8-3.6 4.5-3.6 7.6 0 3 1.2 5.6 3.6 7.4"/><path d="M12 6c2.4 1.8 3.6 4.5 3.6 7.6 0 3-1.2 5.6-3.6 7.4"/></svg>'
    },
    christmas: {
      label: 'Natal',
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 7 9h3l-4 6h4l-3 5h10l-3-5h4l-4-6h3L12 2Z"/><path d="M12 20v2"/></svg>'
    }
  };

  const SEASONAL_CSS = `
    /* Seasonal Badge Pill (Navbar) */
    .season-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1;
      background: var(--color-accent-soft, rgba(217, 83, 30, 0.12));
      color: var(--color-accent, currentColor);
      border: 1px solid currentColor;
      border-color: color-mix(in srgb, var(--color-accent, currentColor) 32%, transparent);
      white-space: nowrap;
      user-select: none;
    }
    @media (max-width: 560px) {
      .season-badge-label { display: none; }
      .season-badge { padding: 5px; }
    }

    /* =======================================================================
       1. HALLOWEEN — LIGHT MODE (Warm Autumn Paper & Harvest Pumpkin)
       ======================================================================= */
    html[data-season="halloween"]:not([data-theme="dark"]) {
      --color-light: #F6EFE8;
      --color-dark: #23161E;
      --color-shadow: #8A2E0D;
      --color-accent: #D9531E;
      --color-accent-soft: rgba(217, 83, 30, 0.12);

      --background: #F6EFE8;
      --surface: #FFFDF9;
      --surface-soft: #FAF2E8;
      --surface-canvas: #EFE4D8;
      --border: #E5D4C3;
      --border-focus: #D9531E;

      --text-primary: #23161E;
      --text-secondary: #6B5347;
      --text-muted: #94796B;
      --strong: #23161E;
      --disabled: #D9C8B8;

      --shadow-primary: 18px 18px 16px rgba(138, 46, 13, 0.16);
      --shadow-depth: 4px 4px 4px rgba(138, 46, 13, 0.20);
      --shadow-hover: 10px 12px 16px rgba(138, 46, 13, 0.22);
      --shadow-pressed: 2px 2px 2px rgba(138, 46, 13, 0.26);

      /* Home page (style.css) tokens */
      --bg-color: #F6EFE8;
      --card-bg: #FFFDF9;
      --card-shadow: 18px 18px 16px rgba(138, 46, 13, 0.16);
      --card-shadow-hover: 22px 24px 24px rgba(138, 46, 13, 0.26);
      --accent-color: #D9531E;
      --accent-purple: #8A2E0D;
    }

    html[data-season="halloween"]:not([data-theme="dark"]) .glow-1 {
      background: radial-gradient(circle, rgba(255, 168, 96, 0.65) 0%, rgba(246, 239, 232, 0) 70%);
    }
    html[data-season="halloween"]:not([data-theme="dark"]) .glow-2 {
      background: radial-gradient(circle, rgba(217, 83, 30, 0.35) 0%, rgba(246, 239, 232, 0) 70%);
    }

    /* =======================================================================
       2. HALLOWEEN — DARK MODE (Midnight Obsidian-Plum & Glowing Ember)
       ======================================================================= */
    html[data-season="halloween"][data-theme="dark"] {
      --color-light: #FAF4ED;
      --color-dark: #140F18;
      --color-shadow: #FF7A2F;
      --color-accent: #FF7A2F;
      --color-accent-soft: rgba(255, 122, 47, 0.16);

      --background: #140F18;
      --surface: #1F1726;
      --surface-soft: #2A1F34;
      --surface-canvas: #191220;
      --border: #3E2D4A;
      --border-focus: #FF7A2F;

      --text-primary: #FAF4ED;
      --text-secondary: #C6B5AB;
      --text-muted: #9C8980;
      --strong: #FAF4ED;
      --disabled: #594663;

      --shadow-primary: 18px 18px 24px rgba(0, 0, 0, 0.54), 0 0 26px rgba(255, 122, 47, 0.06);
      --shadow-depth: 4px 4px 8px rgba(0, 0, 0, 0.44);
      --shadow-hover: 10px 12px 18px rgba(0, 0, 0, 0.52), 0 0 18px rgba(255, 122, 47, 0.12);
      --shadow-pressed: 2px 2px 4px rgba(0, 0, 0, 0.55);

      /* Home page (style.css) tokens */
      --bg-color: #140F18;
      --card-bg: #1F1726;
      --card-shadow: 18px 18px 24px rgba(0, 0, 0, 0.54), 0 0 26px rgba(255, 122, 47, 0.07);
      --card-shadow-hover: 22px 24px 28px rgba(0, 0, 0, 0.62), 0 0 24px rgba(255, 122, 47, 0.15);
      --accent-color: #FF7A2F;
      --accent-purple: #FF7A2F;
    }

    html[data-season="halloween"][data-theme="dark"] .glow-1 {
      background: radial-gradient(circle, rgba(255, 122, 47, 0.24) 0%, rgba(20, 15, 24, 0) 70%);
    }
    html[data-season="halloween"][data-theme="dark"] .glow-2 {
      background: radial-gradient(circle, rgba(145, 68, 196, 0.22) 0%, rgba(20, 15, 24, 0) 70%);
    }

    /* =======================================================================
       3. CHRISTMAS — LIGHT MODE (Nordic Frost Paper, Pine Shadow & Holly Red)
       ======================================================================= */
    html[data-season="christmas"]:not([data-theme="dark"]) {
      --color-light: #EEF3F0;
      --color-dark: #14241C;
      --color-shadow: #164A31;
      --color-accent: #C42B3B;
      --color-accent-soft: rgba(196, 43, 59, 0.11);

      --background: #EEF3F0;
      --surface: #FCFEFD;
      --surface-soft: #F2F7F4;
      --surface-canvas: #E4EDE7;
      --border: #CFDED5;
      --border-focus: #164A31;

      --text-primary: #14241C;
      --text-secondary: #4B6658;
      --text-muted: #769083;
      --strong: #14241C;
      --disabled: #C2D3C9;

      --shadow-primary: 18px 18px 16px rgba(22, 74, 49, 0.16);
      --shadow-depth: 4px 4px 4px rgba(22, 74, 49, 0.20);
      --shadow-hover: 10px 12px 16px rgba(22, 74, 49, 0.22);
      --shadow-pressed: 2px 2px 2px rgba(22, 74, 49, 0.26);

      /* Home page (style.css) tokens */
      --bg-color: #EEF3F0;
      --card-bg: #FCFEFD;
      --card-shadow: 18px 18px 16px rgba(22, 74, 49, 0.16);
      --card-shadow-hover: 22px 24px 24px rgba(22, 74, 49, 0.25);
      --accent-color: #C42B3B;
      --accent-purple: #164A31;
    }

    html[data-season="christmas"]:not([data-theme="dark"]) .glow-1 {
      background: radial-gradient(circle, rgba(164, 214, 186, 0.65) 0%, rgba(238, 243, 240, 0) 70%);
    }
    html[data-season="christmas"]:not([data-theme="dark"]) .glow-2 {
      background: radial-gradient(circle, rgba(224, 108, 120, 0.35) 0%, rgba(238, 243, 240, 0) 70%);
    }

    /* =======================================================================
       4. CHRISTMAS — DARK MODE (Midnight Evergreen, Warm Gold & Holly Berry)
       ======================================================================= */
    html[data-season="christmas"][data-theme="dark"] {
      --color-light: #F3F8F5;
      --color-dark: #0E1713;
      --color-shadow: #E8C468;
      --color-accent: #EE5A66;
      --color-accent-soft: rgba(238, 90, 102, 0.15);

      --background: #0E1713;
      --surface: #16241E;
      --surface-soft: #1E3129;
      --surface-canvas: #121E18;
      --border: #2C463B;
      --border-focus: #E8C468;

      --text-primary: #F3F8F5;
      --text-secondary: #ADC2B7;
      --text-muted: #82998D;
      --strong: #F3F8F5;
      --disabled: #3D594D;

      --shadow-primary: 18px 18px 24px rgba(0, 0, 0, 0.54), 0 0 26px rgba(232, 196, 104, 0.05);
      --shadow-depth: 4px 4px 8px rgba(0, 0, 0, 0.44);
      --shadow-hover: 10px 12px 18px rgba(0, 0, 0, 0.50), 0 0 18px rgba(232, 196, 104, 0.10);
      --shadow-pressed: 2px 2px 4px rgba(0, 0, 0, 0.54);

      /* Home page (style.css) tokens */
      --bg-color: #0E1713;
      --card-bg: #16241E;
      --card-shadow: 18px 18px 24px rgba(0, 0, 0, 0.54), 0 0 26px rgba(232, 196, 104, 0.06);
      --card-shadow-hover: 22px 24px 28px rgba(0, 0, 0, 0.62), 0 0 24px rgba(238, 90, 102, 0.14);
      --accent-color: #EE5A66;
      --accent-purple: #E8C468;
    }

    html[data-season="christmas"][data-theme="dark"] .glow-1 {
      background: radial-gradient(circle, rgba(46, 138, 92, 0.24) 0%, rgba(14, 23, 19, 0) 70%);
    }
    html[data-season="christmas"][data-theme="dark"] .glow-2 {
      background: radial-gradient(circle, rgba(238, 90, 102, 0.18) 0%, rgba(14, 23, 19, 0) 70%);
    }

    /* =======================================================================
       5. SHARED SEASONAL TACTILE ACCENTS (Subtle, Non-Intrusive Craft)
       ======================================================================= */
    html[data-season] .hero-eyebrow-dot,
    html[data-season] .featured-card-accent,
    html[data-season] .magnetic-dot {
      background: var(--color-accent) !important;
    }

    /* Library page dark-mode seasonal alignment */
    html[data-season][data-theme="dark"] .meta-tag,
    html[data-season][data-theme="dark"] .card-badge,
    html[data-season][data-theme="dark"] .tag-category,
    html[data-season][data-theme="dark"] .token-tone-token {
      color: var(--color-accent);
    }

    html[data-season][data-theme="dark"] .meta-tag,
    html[data-season][data-theme="dark"] .token-tone-token {
      background: var(--color-accent-soft);
    }

    html[data-season][data-theme="dark"] .ui-switch[aria-checked="true"],
    html[data-season][data-theme="dark"] .ui-chip[aria-pressed="true"] {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-dark);
    }

    html[data-season][data-theme="dark"] .type-width-slider::-webkit-slider-thumb {
      background: var(--color-accent);
      border-color: var(--surface);
    }

    html[data-season][data-theme="dark"] .type-width-slider::-moz-range-thumb {
      background: var(--color-accent);
      border-color: var(--surface);
    }

    html[data-season] .reading-progress-bar {
      background: linear-gradient(90deg, var(--color-accent), var(--color-shadow)) !important;
    }

    html[data-season] .post-tldr-card {
      border-left: 4px solid var(--color-accent) !important;
    }

    html[data-season] .nav-link.active::after,
    html[data-season] .nav-link-item.active::after {
      background: var(--color-accent);
    }

    html[data-season][data-theme="dark"] .category-pill.active,
    html[data-season][data-theme="dark"] .filter-pill.active,
    html[data-season][data-theme="dark"] .featured-read-btn,
    html[data-season][data-theme="dark"] .btn-primary,
    html[data-season][data-theme="dark"] .btn-copy-rss,
    html[data-season][data-theme="dark"] .btn-reach-out,
    html[data-season][data-theme="dark"] .badge-featured {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #140F18;
    }

    html[data-season][data-theme="dark"] .category-pill.active:hover,
    html[data-season][data-theme="dark"] .filter-pill.active:hover,
    html[data-season][data-theme="dark"] .featured-read-btn:hover,
    html[data-season][data-theme="dark"] .btn-primary:hover,
    html[data-season][data-theme="dark"] .btn-copy-rss:hover,
    html[data-season][data-theme="dark"] .btn-reach-out:hover {
      filter: brightness(1.08);
      color: #140F18;
    }
  `;

  function applySeason(season) {
    if (SEASON_META[season]) {
      document.documentElement.setAttribute('data-season', season);
      if (document.head && !document.getElementById('seasonal-theme-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'seasonal-theme-styles';
        styleEl.textContent = SEASONAL_CSS;
        document.head.appendChild(styleEl);
      }
    } else {
      document.documentElement.removeAttribute('data-season');
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  // Runs while this head script is parsed, preventing a theme or season flash.
  applyTheme(localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light');
  applySeason(SITE_SEASON);

  function seasonBadgeMarkup() {
    const meta = SEASON_META[SITE_SEASON];
    if (!meta) return '';
    return `<span class="season-badge" title="Mode Musiman: ${meta.label}">${meta.icon}<span class="season-badge-label">${meta.label}</span></span>`;
  }

  function themeIcon(isDark) {
    return isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m7.78-18.78-1.42 1.42m-12.72 12.72-1.42 1.42M23 12h-2M3 12H1m18.78 7.78-1.42-1.42M5.64 5.64 4.22 4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function getHomeHref(basePath, active) {
    if (active) return '#home';
    const isWeb = typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:');
    return isWeb ? '/' : `${basePath}index.html`;
  }

  function linkMarkup(page, activePage, className, basePath = '') {
    const active = page.id === activePage;
    const href = page.id === 'home' ? getHomeHref(basePath, active) : `${basePath}${page.href}`;
    return `<a href="${href}"${className ? ` class="${className}${active ? ' active' : ''}"` : active ? ' class="active"' : ''}${active ? ' aria-current="page"' : ''}>${page.label}</a>`;
  }

  function renderChrome(host) {
    const activePage = host.dataset.activePage;
    const basePath = host.dataset.basePath || '';
    const homeHref = getHomeHref(basePath, activePage === 'home');
    const navLinks = pages.map(page => `<li>${linkMarkup(page, activePage, 'nav-link-item', basePath)}</li>`).join('');
    const drawerLinks = pages.map(page => linkMarkup(page, activePage, '', basePath)).join('');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    host.outerHTML = `
      <header class="portfolio-navbar">
        <a href="${homeHref}" class="brand-link" aria-label="semenitwasted Home">
          <img src="${basePath}assets/logo-nav.svg" alt="semenitwasted logo" class="brand-logo-img" width="116" height="48">
          ${seasonBadgeMarkup()}
        </a>
        <nav aria-label="Main navigation">
          <ul class="navbar-nav">
            ${navLinks}
            <li><button class="theme-toggle-btn" id="themeToggle" type="button" aria-label="${isDark ? 'Switch to light theme' : 'Switch to dark theme'}">${themeIcon(isDark)}</button></li>
          </ul>
        </nav>
        <div class="mobile-nav-controls">
          <button class="theme-toggle-btn mobile-theme-btn" id="mobileThemeToggle" type="button" aria-label="${isDark ? 'Switch to light theme' : 'Switch to dark theme'}">${themeIcon(isDark)}</button>
          <button class="mobile-menu-toggle" id="mobileNavToggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileNavDrawer"><span></span><span></span><span></span></button>
        </div>
      </header>
      <nav class="mobile-nav-drawer" id="mobileNavDrawer" aria-label="Mobile navigation" aria-hidden="true" inert>
        ${drawerLinks}
      </nav>`;
  }

  function initialise() {
    document.querySelectorAll('[data-site-chrome]').forEach(renderChrome);

    // Inject seasonal badge on standalone home navbar (index.html) when active
    const homeBrand = document.querySelector('.nav-brand');
    if (homeBrand && SEASON_META[SITE_SEASON] && !homeBrand.querySelector('.season-badge')) {
      homeBrand.insertAdjacentHTML('beforeend', seasonBadgeMarkup());
    }

    const isWeb = typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:');
    if (isWeb) {
      document.querySelectorAll('a[href$="index.html"]').forEach(link => {
        const rawHref = link.getAttribute('href');
        if (rawHref === 'index.html' || rawHref === '../index.html' || rawHref === '../../index.html') {
          link.setAttribute('href', '/');
        }
      });
    }

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const initialDark = document.documentElement.getAttribute('data-theme') === 'dark';

    function updateToggleButtons(isDark) {
      toggleButtons.forEach(btn => {
        btn.innerHTML = themeIcon(isDark);
        btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      });
    }

    updateToggleButtons(initialDark);

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
        updateToggleButtons(nextTheme === 'dark');
      });
    });

    const drawer = document.getElementById('mobileNavDrawer');
    const menuButton = document.getElementById('mobileNavToggle');
    if (!drawer || !menuButton) return;

    function closeDrawer({ restoreFocus = false } = {}) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.inert = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      if (restoreFocus) menuButton.focus();
    }

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.inert = false;
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close navigation menu');
      drawer.querySelector('a')?.focus();
    }

    menuButton.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
    drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeDrawer()));
    document.addEventListener('pointerdown', event => {
      if (drawer.classList.contains('open') && !drawer.contains(event.target) && !menuButton.contains(event.target)) closeDrawer();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drawer.classList.contains('open')) {
        event.preventDefault();
        closeDrawer({ restoreFocus: true });
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
}());
