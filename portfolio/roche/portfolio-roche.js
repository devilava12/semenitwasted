/**
 * ==========================================================================
 * SEMENITWASTED — PORTFOLIO ROCHE CASE STUDY (portfolio-roche.js)
 * Interactive Bento Showcase, Category Filters & Motion Observer
 * Modeled after library.js & web-builder-SKILL.md standards
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Toast Notification Helper ---
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2400);
  }

  // --- 2. Category Filter Switcher ---
  const filterPills = document.querySelectorAll('.gallery-toolbar .filter-pill');
  const screenCards = document.querySelectorAll('.bento-screen-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterVal = pill.getAttribute('data-filter');
      let visibleCount = 0;

      screenCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('is-hidden');
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
          card.style.display = 'none';
        }
      });

      const label = pill.textContent.trim();
      showToast(`Menampilkan filter: ${label} (${visibleCount} layar)`);
    });
  });

  // --- 3. Scroll Reveal Observer (Modeled on Library Module 06) ---
  const revealElements = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
