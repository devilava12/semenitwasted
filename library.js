/**
 * ==========================================================================
 * SEMENITWASTED — LIBRARY PAGE JAVASCRIPT
 * Living Design System & Interactive Motion Sandbox
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Theme Toggle & Persistence ---
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
    });
  }

  // --- 2. Mobile Navigation Drawer ---
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
      mobileNavDrawer.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // --- 3. Toast Notification Helper ---
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

  // --- 4. Simulator Modes (Reduced Motion & Slow Motion) ---
  const pageWrapper = document.querySelector('.library-page-wrapper');
  const toggleReducedMotion = document.getElementById('toggleReducedMotion');
  const toggleSlowMotion = document.getElementById('toggleSlowMotion');

  if (toggleReducedMotion) {
    toggleReducedMotion.addEventListener('click', () => {
      const isActive = toggleReducedMotion.getAttribute('aria-checked') === 'true';
      const nextState = !isActive;
      toggleReducedMotion.setAttribute('aria-checked', String(nextState));
      pageWrapper.classList.toggle('reduced-motion-active', nextState);
      showToast(nextState ? 'Reduced Motion Simulator Active (Instant fallback)' : 'Reduced Motion Simulator Disabled');
    });
  }

  if (toggleSlowMotion) {
    toggleSlowMotion.addEventListener('click', () => {
      const isActive = toggleSlowMotion.getAttribute('aria-checked') === 'true';
      const nextState = !isActive;
      toggleSlowMotion.setAttribute('aria-checked', String(nextState));
      pageWrapper.classList.toggle('slow-motion-active', nextState);
      showToast(nextState ? 'Slow Motion Active (0.5x Easing inspection)' : 'Normal Motion Speed Restored');
    });
  }

  // --- 5. Category Filter Pills ---
  const filterPills = document.querySelectorAll('.filter-pill');
  const animCards = document.querySelectorAll('.bento-anim-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');
      animCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Code Snippet Copy Functionality ---
  const copyButtons = document.querySelectorAll('.btn-copy-code');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const card = btn.closest('.bento-anim-card');
      const codeBlock = card ? card.querySelector('pre code') : null;
      if (!codeBlock) return;

      const codeText = codeBlock.textContent.trim();
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.querySelector('span').textContent;
        btn.querySelector('span').textContent = 'Copied!';
        btn.style.borderColor = 'var(--color-shadow)';
        showToast('CSS Snippet Copied to Clipboard!');
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.style.borderColor = 'var(--border)';
        }, 1800);
      } catch (err) {
        showToast('Gagal menyalin kode secara otomatis.');
      }
    });
  });

  // --- 7. Interactive Playground Demos ---

  // Demo 1: Tactile Button Status
  const demoTactileBtn = document.getElementById('demoTactileBtn');
  const statusTactileBtn = document.getElementById('statusTactileBtn');
  if (demoTactileBtn && statusTactileBtn) {
    demoTactileBtn.addEventListener('mouseenter', () => {
      statusTactileBtn.textContent = 'State: Hover (Elevated -2px, shadow expanded)';
    });
    demoTactileBtn.addEventListener('mouseleave', () => {
      statusTactileBtn.textContent = 'State: Default / Resting';
    });
    demoTactileBtn.addEventListener('mousedown', () => {
      statusTactileBtn.textContent = 'State: Active (Pressed 0px, tactile resistance)';
    });
    demoTactileBtn.addEventListener('mouseup', () => {
      statusTactileBtn.textContent = 'State: Hover (Released)';
    });
  }

  // Demo 2: Micro Tactile Filter Pills
  const demoPills = document.querySelectorAll('.demo-pill');
  const statusMicroPills = document.getElementById('statusMicroPills');
  demoPills.forEach(pill => {
    pill.addEventListener('click', () => {
      demoPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (statusMicroPills) {
        statusMicroPills.textContent = `Active: "${pill.textContent.trim()}" (Primary shadow) · Hover to lift`;
      }
    });
  });

  // Demo 3: Surface Card Elevation Status
  const demoSurfaceCard = document.getElementById('demoSurfaceCard');
  const statusSurfaceCard = document.getElementById('statusSurfaceCard');
  if (demoSurfaceCard && statusSurfaceCard) {
    demoSurfaceCard.addEventListener('mouseenter', () => {
      statusSurfaceCard.textContent = 'Elevation: Focused Lift (-2px, primary shadow active)';
    });
    demoSurfaceCard.addEventListener('mouseleave', () => {
      statusSurfaceCard.textContent = 'Elevation: Standard (Resting depth)';
    });
  }

  // Demo 5: Entrance Sequence Replay
  const entranceContainer = document.getElementById('entranceSeqContainer');
  const btnReplayEntrance = document.getElementById('btnReplayEntrance');
  function playEntranceSequence() {
    if (!entranceContainer) return;
    entranceContainer.classList.remove('animate-seq');
    // Force DOM reflow to restart keyframe animation
    void entranceContainer.offsetWidth;
    entranceContainer.classList.add('animate-seq');
  }
  if (btnReplayEntrance) {
    btnReplayEntrance.addEventListener('click', playEntranceSequence);
  }
  // Play initially
  playEntranceSequence();

  // Demo 6: Scroll Reveal Simulator inside box
  const scrollBox = document.getElementById('scrollDemoViewport');
  const scrollItems = scrollBox ? scrollBox.querySelectorAll('.scroll-stream-item') : [];
  const btnResetScroll = document.getElementById('btnResetScrollDemo');

  function checkScrollBox() {
    if (!scrollBox) return;
    const boxRect = scrollBox.getBoundingClientRect();
    scrollItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < boxRect.bottom - 20) {
        item.classList.add('is-visible');
      }
    });
  }

  if (scrollBox) {
    scrollBox.addEventListener('scroll', checkScrollBox);
    checkScrollBox();
  }

  if (btnResetScroll && scrollBox) {
    btnResetScroll.addEventListener('click', () => {
      scrollBox.scrollTop = 0;
      scrollItems.forEach((item, index) => {
        if (index > 0) item.classList.remove('is-visible');
      });
      setTimeout(checkScrollBox, 100);
    });
  }

  // Demo 7: Magnetic CTA Proximity Interaction
  const magneticZone = document.getElementById('magneticZone');
  const magneticBtn = document.getElementById('demoMagneticBtn');
  const magneticStatus = document.getElementById('magneticStatus');

  if (magneticZone && magneticBtn) {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouch) {
      magneticZone.addEventListener('mousemove', (e) => {
        if (pageWrapper.classList.contains('reduced-motion-active')) return;

        const rect = magneticZone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.12;
        const deltaY = (e.clientY - centerY) * 0.12;

        // Clamped to subtle values
        const clampX = Math.max(-8, Math.min(8, deltaX));
        const clampY = Math.max(-8, Math.min(8, deltaY));

        magneticBtn.style.transform = `translate(${clampX}px, ${clampY}px)`;
        if (magneticStatus) {
          magneticStatus.textContent = `Proximity Pull: dx=${clampX.toFixed(1)}px, dy=${clampY.toFixed(1)}px`;
        }
      });

      magneticZone.addEventListener('mouseleave', () => {
        magneticBtn.style.transform = 'translate(0px, 0px)';
        if (magneticStatus) {
          magneticStatus.textContent = 'Proximity: Spring Return to resting center';
        }
      });
    } else {
      if (magneticStatus) {
        magneticStatus.textContent = 'Touch device detected: Magnetic behavior disabled';
      }
    }
  }

  // Demo 8: Navigation Sliding Indicator
  const demoNavBar = document.getElementById('demoNavBar');
  const demoNavPillBg = document.getElementById('demoNavPillBg');
  const demoNavLinks = document.querySelectorAll('.demo-nav-link');

  function updateNavPill(activeLink) {
    if (!demoNavPillBg || !activeLink) return;
    const offsetLeft = activeLink.offsetLeft;
    const width = activeLink.offsetWidth;
    demoNavPillBg.style.transform = `translateX(${offsetLeft - 4}px)`;
    demoNavPillBg.style.width = `${width}px`;
  }

  if (demoNavLinks.length > 0) {
    const firstActive = document.querySelector('.demo-nav-link.active') || demoNavLinks[0];
    updateNavPill(firstActive);

    demoNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        demoNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateNavPill(link);
      });
    });
  }

  // Demo 9: Focus Simulation
  const btnTriggerFocus = document.getElementById('btnTriggerFocus');
  const demoFocusInput = document.getElementById('demoFocusInput');
  const statusFocusIndicator = document.getElementById('statusFocusIndicator');

  if (demoFocusInput && statusFocusIndicator) {
    demoFocusInput.addEventListener('focus', () => {
      statusFocusIndicator.textContent = 'Ring: Active (3:1 contrast border + subtle depth ring)';
    });
    demoFocusInput.addEventListener('blur', () => {
      statusFocusIndicator.textContent = 'Ring: Inactive';
    });
  }

  if (btnTriggerFocus && demoFocusInput) {
    btnTriggerFocus.addEventListener('click', () => {
      demoFocusInput.focus();
    });
  }

  // Demo 10: Submit Spinner Zero-CLS State
  const demoSpinnerBtn = document.getElementById('demoSpinnerBtn');
  const statusSpinnerBtn = document.getElementById('statusSpinnerBtn');
  let spinnerTimeout = null;

  if (demoSpinnerBtn && statusSpinnerBtn) {
    demoSpinnerBtn.addEventListener('click', () => {
      if (demoSpinnerBtn.classList.contains('is-loading')) return;

      demoSpinnerBtn.classList.add('is-loading');
      demoSpinnerBtn.classList.remove('is-success');
      statusSpinnerBtn.textContent = 'State: Processing (Micro spinner rotating, zero CLS)';

      clearTimeout(spinnerTimeout);
      spinnerTimeout = setTimeout(() => {
        demoSpinnerBtn.classList.remove('is-loading');
        demoSpinnerBtn.classList.add('is-success');
        statusSpinnerBtn.textContent = 'State: Success confirmed (✓ Sent feedback)';

        setTimeout(() => {
          demoSpinnerBtn.classList.remove('is-success');
          statusSpinnerBtn.textContent = 'State: Idle / Ready';
        }, 2200);
      }, 1200);
    });
  }

  // --- 8. Replay All Global Trigger ---
  const btnReplayAll = document.getElementById('btnReplayAll');
  if (btnReplayAll) {
    btnReplayAll.addEventListener('click', () => {
      playEntranceSequence();

      if (btnResetScroll) {
        btnResetScroll.click();
      }

      if (demoSpinnerBtn && !demoSpinnerBtn.classList.contains('is-loading')) {
        demoSpinnerBtn.click();
      }

      showToast('All motion module sequences re-triggered!');
    });
  }

});
