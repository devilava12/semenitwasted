/**
 * Creative Portfolio - Interactive Scripts
 * Dynamic Scaling, 3D Parallax Tilt, Drawer Navigation & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elements ---
  const heroStage = document.getElementById('heroStage');
  const stageContainer = document.querySelector('.hero-stage-container');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const interactiveCards = document.querySelectorAll('.interactive-card');
  
  // Modal Elements
  const modal = document.getElementById('cardModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.getElementById('modalClose');
  const modalDismiss = document.getElementById('modalDismiss');

  // --- Dynamic Desktop Stage Resizing ---
  function updateStageScale() {
    if (window.innerWidth >= 992) {
      // Figma base width is 1440px
      const availableWidth = Math.min(window.innerWidth - 48, 1440);
      const scale = Math.min(1, availableWidth / 1440);
      document.documentElement.style.setProperty('--stage-scale', scale);
      
      if (stageContainer) {
        // Base height from top of cards to bottom of canvas is ~780px
        stageContainer.style.height = `${780 * scale}px`;
      }
    } else {
      document.documentElement.style.setProperty('--stage-scale', '1');
      if (stageContainer) {
        stageContainer.style.height = 'auto';
      }
    }
  }

  window.addEventListener('resize', updateStageScale, { passive: true });
  updateStageScale();

  // --- Mobile Drawer Toggle ---
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Interactive 3D Parallax Tilt on Desktop Stage ---
  if (heroStage && window.innerWidth >= 992) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const normX = x / (rect.width / 2);
      const normY = y / (rect.height / 2);

      // Subtle tilt for interactive cards
      interactiveCards.forEach((card, index) => {
        const factor = (index % 3 + 1) * 2;
        const tiltX = -normY * factor;
        const tiltY = normX * factor;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      // Subtle float for decorative background
      const darkBg = document.querySelector('.stage-dark-bg');
      if (darkBg) {
        darkBg.style.transform = `translate(${normX * 5}px, ${normY * 5}px)`;
      }
    });

    heroStage.addEventListener('mouseleave', () => {
      interactiveCards.forEach(card => {
        card.style.transform = '';
      });
      const darkBg = document.querySelector('.stage-dark-bg');
      if (darkBg) {
        darkBg.style.transform = '';
      }
    });
  }

  // --- Modal Interaction for Cards ---
  function openModal(title, desc, href) {
    if (!modal) return;
    modalTitle.textContent = title || 'Details';
    modalDescription.textContent = desc || 'Information and portfolio details.';
    
    if (href && href !== '#' && !href.startsWith('javascript')) {
      modalLink.href = href;
      modalLink.style.display = 'inline-flex';
    } else {
      modalLink.style.display = 'none';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Card click triggers modal for text-only buttons
  document.querySelectorAll('[data-title]').forEach(card => {
    // If it's a button (Portfolio, E-Book, CV)
    if (card.tagName.toLowerCase() === 'button' || card.id === 'cardCenterHero') {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        openModal(title, desc, null);
      });
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeModal);
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key closes modal & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    }
  });

});
