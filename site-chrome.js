/* Shared navigation, theme, and mobile drawer for the inner site pages. */
(function () {
  'use strict';

  const THEME_KEY = 'semenitwasted_theme';
  const pages = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'library', label: 'Library', href: 'library.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  // Runs while this head script is parsed, preventing a light-theme flash.
  applyTheme(localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light');

  function themeIcon(isDark) {
    return isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m7.78-18.78-1.42 1.42m-12.72 12.72-1.42 1.42M23 12h-2M3 12H1m18.78 7.78-1.42-1.42M5.64 5.64 4.22 4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function linkMarkup(page, activePage, className, basePath = '') {
    const active = page.id === activePage;
    return `<a href="${basePath}${page.href}"${className ? ` class="${className}${active ? ' active' : ''}"` : active ? ' class="active"' : ''}${active ? ' aria-current="page"' : ''}>${page.label}</a>`;
  }

  function renderChrome(host) {
    const activePage = host.dataset.activePage;
    const basePath = host.dataset.basePath || '';
    const navLinks = pages.map(page => `<li>${linkMarkup(page, activePage, 'nav-link-item', basePath)}</li>`).join('');
    const drawerLinks = pages.map(page => linkMarkup(page, activePage, '', basePath)).join('');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    host.outerHTML = `
      <header class="portfolio-navbar">
        <a href="${basePath}index.html" class="brand-link" aria-label="semenitwasted Home">
          <img src="${basePath}assets/logo-nav.svg" alt="semenitwasted logo" class="brand-logo-img" width="116" height="48">
        </a>
        <nav aria-label="Main navigation">
          <ul class="navbar-nav">
            ${navLinks}
            <li><button class="theme-toggle-btn" id="themeToggle" type="button" aria-label="${isDark ? 'Switch to light theme' : 'Switch to dark theme'}">${themeIcon(isDark)}</button></li>
          </ul>
        </nav>
        <button class="mobile-menu-toggle" id="mobileNavToggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileNavDrawer"><span></span><span></span><span></span></button>
      </header>
      <nav class="mobile-nav-drawer" id="mobileNavDrawer" aria-label="Mobile navigation" aria-hidden="true" inert>
        ${drawerLinks}
      </nav>`;
  }

  function initialise() {
    document.querySelectorAll('[data-site-chrome]').forEach(renderChrome);

    const toggle = document.getElementById('themeToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const menuButton = document.getElementById('mobileNavToggle');
    if (!toggle || !drawer || !menuButton) return;

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

    toggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
      const isDark = nextTheme === 'dark';
      toggle.innerHTML = themeIcon(isDark);
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
}());
