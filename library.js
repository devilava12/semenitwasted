/**
 * ==========================================================================
 * SEMENITWASTED — LIBRARY PAGE JAVASCRIPT
 * Living Design System & Interactive Motion Sandbox
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

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

  // --- 4. Multi-Library Hub Category Switcher (Motion vs Tokens vs Components) ---
  const tabButtons = document.querySelectorAll('.lib-tab-btn:not(.disabled)');
  const motionCatalog = document.getElementById('animationCatalog');
  const tokensCatalog = document.getElementById('tokensCatalog');
  const componentsCatalog = document.getElementById('componentsCatalog');

  const motionPillsGroup = document.querySelector('.filter-pills-group[data-tab-scope="motion"]');
  const tokensPillsGroup = document.querySelector('.filter-pills-group[data-tab-scope="tokens"]');
  const componentsPillsGroup = document.querySelector('.filter-pills-group[data-tab-scope="components"]');

  const motionToolbarControls = document.querySelectorAll('[data-tab-scope="motion"]');
  const tokensToolbarControls = document.querySelectorAll('[data-tab-scope="tokens"]');
  const componentsToolbarControls = document.querySelectorAll('[data-tab-scope="components"]');

  function switchLibraryTab(targetTab) {
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === targetTab;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-current', isTarget ? 'true' : 'false');
    });

    if (targetTab === 'tokens') {
      if (motionCatalog) motionCatalog.style.display = 'none';
      if (tokensCatalog) tokensCatalog.style.display = 'block';
      if (componentsCatalog) componentsCatalog.style.display = 'none';

      if (motionPillsGroup) motionPillsGroup.style.display = 'none';
      if (tokensPillsGroup) tokensPillsGroup.style.display = 'flex';
      if (componentsPillsGroup) componentsPillsGroup.style.display = 'none';

      motionToolbarControls.forEach(el => el.style.display = 'none');
      componentsToolbarControls.forEach(el => el.style.display = 'none');
      tokensToolbarControls.forEach(el => {
        if (el.classList.contains('filter-pills-group')) el.style.display = 'flex';
        else el.style.display = 'inline-flex';
      });

      if (!window.location.hash.startsWith('#token-') && window.location.hash !== '#tokens') {
        history.replaceState(null, '', '#tokens');
      }
    } else if (targetTab === 'components') {
      if (motionCatalog) motionCatalog.style.display = 'none';
      if (tokensCatalog) tokensCatalog.style.display = 'none';
      if (componentsCatalog) componentsCatalog.style.display = 'block';

      if (motionPillsGroup) motionPillsGroup.style.display = 'none';
      if (tokensPillsGroup) tokensPillsGroup.style.display = 'none';
      if (componentsPillsGroup) componentsPillsGroup.style.display = 'flex';

      motionToolbarControls.forEach(el => el.style.display = 'none');
      tokensToolbarControls.forEach(el => el.style.display = 'none');
      componentsToolbarControls.forEach(el => {
        if (el.classList.contains('filter-pills-group')) el.style.display = 'flex';
        else el.style.display = 'inline-flex';
      });

      if (!window.location.hash.startsWith('#cmp-') && window.location.hash !== '#components') {
        history.replaceState(null, '', '#components');
      }
    } else {
      if (motionCatalog) motionCatalog.style.display = 'block';
      if (tokensCatalog) tokensCatalog.style.display = 'none';
      if (componentsCatalog) componentsCatalog.style.display = 'none';

      if (motionPillsGroup) motionPillsGroup.style.display = 'flex';
      if (tokensPillsGroup) tokensPillsGroup.style.display = 'none';
      if (componentsPillsGroup) componentsPillsGroup.style.display = 'none';

      tokensToolbarControls.forEach(el => el.style.display = 'none');
      componentsToolbarControls.forEach(el => el.style.display = 'none');
      motionToolbarControls.forEach(el => {
        if (el.classList.contains('filter-pills-group')) el.style.display = 'flex';
        else if (el.classList.contains('simulator-control')) el.style.display = 'flex';
        else el.style.display = 'inline-flex';
      });

      if (!window.location.hash.startsWith('#anim-') && window.location.hash !== '#motion') {
        history.replaceState(null, '', '#motion');
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      switchLibraryTab(target);
    });
  });

  // Check URL hash on initial load
  if (window.location.hash === '#tokens' || window.location.hash.startsWith('#token-')) {
    switchLibraryTab('tokens');
    if (window.location.hash.startsWith('#token-')) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  } else if (window.location.hash === '#components' || window.location.hash.startsWith('#cmp-')) {
    switchLibraryTab('components');
    if (window.location.hash.startsWith('#cmp-')) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#tokens' || window.location.hash.startsWith('#token-')) {
      switchLibraryTab('tokens');
    } else if (window.location.hash === '#components' || window.location.hash.startsWith('#cmp-')) {
      switchLibraryTab('components');
    } else if (window.location.hash === '#motion' || window.location.hash.startsWith('#anim-')) {
      switchLibraryTab('motion');
    }
  });

  // --- 5. Category Filter Pills (Motion, Tokens, Components) ---
  const motionFilterPills = document.querySelectorAll('.filter-pills-group[data-tab-scope="motion"] .filter-pill');
  const animCards = document.querySelectorAll('#animationCatalog .bento-anim-card');

  motionFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      motionFilterPills.forEach(p => p.classList.remove('active'));
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

  const tokenFilterPills = document.querySelectorAll('.filter-pills-group[data-tab-scope="tokens"] .filter-pill');
  const tokenCards = document.querySelectorAll('#tokensCatalog .bento-anim-card');

  tokenFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tokenFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-token-filter');
      tokenCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal || (filterVal === 'all' && cat === 'master')) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const cmpFilterPills = document.querySelectorAll('.filter-pills-group[data-tab-scope="components"] .filter-pill');
  const cmpCards = document.querySelectorAll('#componentsCatalog .bento-anim-card');

  cmpFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      cmpFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-cmp-filter');
      cmpCards.forEach(card => {
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
        const textSpan = btn.querySelector('span');
        const originalText = textSpan ? textSpan.textContent : 'Copy CSS';
        if (textSpan) textSpan.textContent = 'Copied!';
        btn.style.borderColor = 'var(--color-shadow)';
        showToast('CSS Snippet Copied to Clipboard!');
        setTimeout(() => {
          if (textSpan) textSpan.textContent = originalText;
          btn.style.borderColor = 'var(--border)';
        }, 1800);
      } catch (err) {
        showToast('Gagal menyalin kode secara otomatis.');
      }
    });
  });

  // Universal Token Variable Copy [data-copy-token]
  document.addEventListener('click', async (e) => {
    const copyTokenEl = e.target.closest('[data-copy-token]');
    if (!copyTokenEl) return;

    const tokenVal = copyTokenEl.getAttribute('data-copy-token');
    if (!tokenVal) return;

    try {
      await navigator.clipboard.writeText(tokenVal);
      showToast(`Copied ${tokenVal} to clipboard!`);
    } catch (err) {
      showToast('Gagal menyalin token.');
    }
  });

  // Copy All :root CSS Button
  const btnCopyAllTokens = document.getElementById('btnCopyAllTokens');
  if (btnCopyAllTokens) {
    btnCopyAllTokens.addEventListener('click', async () => {
      const masterCode = document.querySelector('#token-master-export pre code');
      if (!masterCode) return;

      try {
        await navigator.clipboard.writeText(masterCode.textContent.trim());
        const span = btnCopyAllTokens.querySelector('span');
        const orig = span ? span.textContent : '';
        if (span) span.textContent = 'Copied All!';
        showToast('Complete :root Design Tokens copied to clipboard!');
        setTimeout(() => {
          if (span) span.textContent = orig;
        }, 2000);
      } catch (err) {
        showToast('Gagal menyalin master tokens.');
      }
    });
  }

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

  // --- 9. Spacing Scale Row Click-to-Copy ---
  const spacingRows = document.querySelectorAll('.spacing-step-row');
  spacingRows.forEach(row => {
    row.addEventListener('click', async () => {
      const token = row.getAttribute('data-token');
      const px = row.getAttribute('data-px');
      if (!token) return;
      try {
        await navigator.clipboard.writeText(`var(${token})`);
        showToast(`Copied var(${token}) (${px}px) to clipboard!`);
      } catch (err) {
        showToast(`Copied var(${token})`);
      }
    });
  });

  // --- 10. Fluid Typography Interactive Viewport Simulator ---
  const typeSlider = document.getElementById('typeWidthSlider');
  const scrubberVal = document.getElementById('scrubberVal');
  const compDisplay = document.getElementById('compDisplay');
  const compH1 = document.getElementById('compH1');
  const compH2 = document.getElementById('compH2');
  const compH3 = document.getElementById('compH3');
  const compH4 = document.getElementById('compH4');
  const compIntro = document.getElementById('compIntro');

  const sampleDisplay = document.querySelector('.sample-display');
  const sampleH1 = document.querySelector('.sample-h1');
  const sampleH2 = document.querySelector('.sample-h2');
  const sampleH3 = document.querySelector('.sample-h3');
  const sampleH4 = document.querySelector('.sample-h4');
  const sampleIntro = document.querySelector('.sample-intro');

  function updateTypographyScrubber(width) {
    if (!typeSlider) return;
    let bpName = 'Desktop';
    if (width < 768) bpName = 'Mobile';
    else if (width < 1024) bpName = 'Tablet';

    if (scrubberVal) scrubberVal.textContent = `${width}px (${bpName})`;

    // Formula clamp in px based on rem (1rem = 16px):
    // Display: clamp(40, 24 + 0.03 * W, 64)
    const valDisplay = Math.round(Math.min(64, Math.max(40, 24 + 0.03 * width)));
    // H1: clamp(36, 24 + 0.02 * W, 48)
    const valH1 = Math.round(Math.min(48, Math.max(36, 24 + 0.02 * width)));
    // H2: clamp(32, 20 + 0.015 * W, 40)
    const valH2 = Math.round(Math.min(40, Math.max(32, 20 + 0.015 * width)));
    // H3: clamp(24, 16 + 0.015 * W, 32)
    const valH3 = Math.round(Math.min(32, Math.max(24, 16 + 0.015 * width)));
    // H4: clamp(20, 17.6 + 0.005 * W, 24)
    const valH4 = Math.round(Math.min(24, Math.max(20, 17.6 + 0.005 * width)));
    // Intro: clamp(18, 16.8 + 0.0025 * W, 20)
    const valIntro = Math.round(Math.min(20, Math.max(18, 16.8 + 0.0025 * width)));

    if (compDisplay) compDisplay.textContent = `${valDisplay}px (${bpName})`;
    if (compH1) compH1.textContent = `${valH1}px (${bpName})`;
    if (compH2) compH2.textContent = `${valH2}px (${bpName})`;
    if (compH3) compH3.textContent = `${valH3}px (${bpName})`;
    if (compH4) compH4.textContent = `${valH4}px (${bpName})`;
    if (compIntro) compIntro.textContent = `${valIntro}px (${bpName})`;

    if (sampleDisplay) sampleDisplay.style.fontSize = `${valDisplay}px`;
    if (sampleH1) sampleH1.style.fontSize = `${valH1}px`;
    if (sampleH2) sampleH2.style.fontSize = `${valH2}px`;
    if (sampleH3) sampleH3.style.fontSize = `${valH3}px`;
    if (sampleH4) sampleH4.style.fontSize = `${valH4}px`;
    if (sampleIntro) sampleIntro.style.fontSize = `${valIntro}px`;
  }

  if (typeSlider) {
    typeSlider.addEventListener('input', (e) => {
      updateTypographyScrubber(parseInt(e.target.value, 10));
    });
  }

  // --- 11. Motion Timing Benchmark Runner & Tactile Specimens ---
  const btnTestMotionBenchmark = document.getElementById('btnTestMotionBenchmark');
  const benchmarkLiveStatus = document.getElementById('benchmarkLiveStatus');
  const benchmarkItems = [
    { row: 'micro', puck: document.getElementById('puckMicro'), fill: document.getElementById('fillMicro'), dur: 150, name: '--dur-micro' },
    { row: 'ui', puck: document.getElementById('puckUi'), fill: document.getElementById('fillUi'), dur: 200, name: '--dur-ui' },
    { row: 'reveal', puck: document.getElementById('puckReveal'), fill: document.getElementById('fillReveal'), dur: 400, name: '--dur-reveal' },
    { row: 'move', puck: document.getElementById('puckMove'), fill: document.getElementById('fillMove'), dur: 500, name: '--dur-move' }
  ];

  function runBenchmarkRow(item) {
    if (!item.puck || !item.fill) return;
    item.puck.classList.remove('animate');
    item.fill.classList.remove('animate');
    void item.puck.offsetWidth; // Force DOM reflow

    item.puck.classList.add('animate');
    item.fill.classList.add('animate');

    const rowEl = document.querySelector(`.timing-meter-row[data-benchmark-row="${item.row}"]`);
    if (rowEl) rowEl.classList.add('is-active');

    setTimeout(() => {
      if (rowEl) rowEl.classList.remove('is-active');
    }, item.dur + 200);

    setTimeout(() => {
      item.puck.classList.remove('animate');
      item.fill.classList.remove('animate');
    }, 2000);
  }

  let benchmarkAllTimer = null;
  if (btnTestMotionBenchmark) {
    btnTestMotionBenchmark.addEventListener('click', () => {
      if (benchmarkLiveStatus) {
        benchmarkLiveStatus.textContent = 'Menjalankan benchmark perbandingan durasi...';
      }

      benchmarkItems.forEach(item => {
        if (!item.puck || !item.fill) return;
        item.puck.classList.remove('animate');
        item.fill.classList.remove('animate');
        void item.puck.offsetWidth; // Force reflow
        item.puck.classList.add('animate');
        item.fill.classList.add('animate');
      });

      clearTimeout(benchmarkAllTimer);
      benchmarkAllTimer = setTimeout(() => {
        benchmarkItems.forEach(item => {
          if (item.puck) item.puck.classList.remove('animate');
          if (item.fill) item.fill.classList.remove('animate');
        });
        if (benchmarkLiveStatus) {
          benchmarkLiveStatus.textContent = 'Klik tombol atau klik salah satu baris di atas';
        }
      }, 2200);
    });
  }

  // Individual Row Click to Test Specific Duration
  document.querySelectorAll('.timing-meter-row').forEach(row => {
    const rowKey = row.getAttribute('data-benchmark-row');
    const matchedItem = benchmarkItems.find(i => i.row === rowKey);
    if (!matchedItem) return;

    const triggerRow = () => {
      runBenchmarkRow(matchedItem);
      if (benchmarkLiveStatus) {
        benchmarkLiveStatus.textContent = `Menguji ${matchedItem.name} (${matchedItem.dur}ms)`;
      }
    };

    row.addEventListener('click', triggerRow);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerRow();
      }
    });
  });

  // Entrance Demo Replay Trigger
  const btnTriggerRevealDemo = document.getElementById('btnTriggerRevealDemo');
  const miniRevealBox = document.getElementById('miniRevealBox');
  const demoRevealCard = document.getElementById('demoRevealCard');

  function triggerRevealEntrance() {
    if (!miniRevealBox) return;
    miniRevealBox.classList.add('is-animating');
    void miniRevealBox.offsetWidth; // Reflow
    requestAnimationFrame(() => {
      miniRevealBox.classList.remove('is-animating');
    });
  }

  if (btnTriggerRevealDemo) {
    btnTriggerRevealDemo.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerRevealEntrance();
    });
  }
  if (demoRevealCard) {
    demoRevealCard.addEventListener('click', () => {
      triggerRevealEntrance();
    });
  }

  // ==========================================================================
  // --- 12. COMPONENTS & UI INTERACTIVE DEMOS ---
  // ==========================================================================

  // --- Demo A: Button Hierarchy & Loading State ---
  const cmpBtnPrimary = document.getElementById('cmpBtnPrimary');
  const cmpBtnSecondary = document.getElementById('cmpBtnSecondary');
  const cmpBtnQuiet = document.getElementById('cmpBtnQuiet');
  const cmpBtnIcon = document.getElementById('cmpBtnIcon');
  const cmpBtnLoading = document.getElementById('cmpBtnLoading');
  const cmpButtonStatus = document.getElementById('cmpButtonStatus');

  const regularButtons = [
    { el: cmpBtnPrimary, name: 'Aksi Utama (Primary)', role: 'Aksi terpenting dalam kelompok' },
    { el: cmpBtnSecondary, name: 'Aksi Sekunder', role: 'Aksi alternatif dengan kontras permukaan lembut' },
    { el: cmpBtnQuiet, name: 'Aksi Ringan (Quiet)', role: 'Aksi pendukung / batal tanpa beban visual' },
    { el: cmpBtnIcon, name: 'Icon-only Button', role: 'Aksi ringkas dengan area sentuh minimal 44x44px' }
  ];

  regularButtons.forEach(btnObj => {
    if (btnObj.el && cmpButtonStatus) {
      btnObj.el.addEventListener('click', () => {
        cmpButtonStatus.textContent = `Tombol aktif: ${btnObj.name} — ${btnObj.role}`;
      });
    }
  });

  if (cmpBtnLoading) {
    let loadingTimer = null;
    let restoreTimer = null;
    const labelSpan = cmpBtnLoading.querySelector('.ui-btn-label');

    cmpBtnLoading.addEventListener('click', () => {
      if (cmpBtnLoading.getAttribute('aria-busy') === 'true') return;

      cmpBtnLoading.setAttribute('aria-busy', 'true');
      cmpBtnLoading.disabled = true;
      if (labelSpan) labelSpan.textContent = 'Menyimpan perubahan...';
      if (cmpButtonStatus) cmpButtonStatus.textContent = 'State: Loading (aria-busy="true", micro-spinner berputar tanpa layout shift)';

      clearTimeout(loadingTimer);
      clearTimeout(restoreTimer);

      loadingTimer = setTimeout(() => {
        if (labelSpan) labelSpan.textContent = 'Tersimpan ✓';
        if (cmpButtonStatus) cmpButtonStatus.textContent = 'State: Berhasil! Perubahan telah tersimpan.';
        showToast('Perubahan berhasil disimpan!');

        restoreTimer = setTimeout(() => {
          cmpBtnLoading.setAttribute('aria-busy', 'false');
          cmpBtnLoading.disabled = false;
          if (labelSpan) labelSpan.textContent = 'Simpan Perubahan';
          if (cmpButtonStatus) cmpButtonStatus.textContent = 'State: Siap / Idle';
        }, 2000);
      }, 1400);
    });
  }

  // --- Demo B: Form Fields & Live Validation ---
  const cmpForm = document.getElementById('cmpFormDemo');
  const cmpName = document.getElementById('cmpName');
  const cmpNameError = document.getElementById('cmpNameError');
  const cmpEmail = document.getElementById('cmpEmail');
  const cmpEmailError = document.getElementById('cmpEmailError');
  const cmpMessage = document.getElementById('cmpMessage');
  const cmpMessageCount = document.getElementById('cmpMessageCount');
  const cmpFormStatus = document.getElementById('cmpFormStatus');

  if (cmpMessage && cmpMessageCount) {
    cmpMessage.addEventListener('input', () => {
      const len = cmpMessage.value.length;
      cmpMessageCount.textContent = `${len} / 200 karakter`;
    });
  }

  function validateCmpField(input, errorEl, condition) {
    if (!input || !errorEl) return true;
    const isValid = condition();
    if (isValid) {
      input.removeAttribute('aria-invalid');
      errorEl.hidden = true;
    } else {
      input.setAttribute('aria-invalid', 'true');
      errorEl.hidden = false;
    }
    return isValid;
  }

  if (cmpName && cmpNameError) {
    cmpName.addEventListener('blur', () => {
      if (cmpName.value.trim().length > 0) {
        validateCmpField(cmpName, cmpNameError, () => cmpName.value.trim().length >= 2);
      }
    });
    cmpName.addEventListener('input', () => {
      if (cmpName.getAttribute('aria-invalid') === 'true') {
        validateCmpField(cmpName, cmpNameError, () => cmpName.value.trim().length >= 2);
      }
    });
  }

  if (cmpEmail && cmpEmailError) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    cmpEmail.addEventListener('blur', () => {
      if (cmpEmail.value.trim().length > 0) {
        validateCmpField(cmpEmail, cmpEmailError, () => emailRegex.test(cmpEmail.value.trim()));
      }
    });
    cmpEmail.addEventListener('input', () => {
      if (cmpEmail.getAttribute('aria-invalid') === 'true') {
        validateCmpField(cmpEmail, cmpEmailError, () => emailRegex.test(cmpEmail.value.trim()));
      }
    });
  }

  if (cmpForm) {
    cmpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isNameValid = validateCmpField(cmpName, cmpNameError, () => cmpName && cmpName.value.trim().length >= 2);
      const isEmailValid = validateCmpField(cmpEmail, cmpEmailError, () => cmpEmail && emailRegex.test(cmpEmail.value.trim()));

      if (!isNameValid) {
        cmpName.focus();
        if (cmpFormStatus) {
          cmpFormStatus.style.color = '#d9534f';
          cmpFormStatus.textContent = 'Mohon periksa nama (minimal 2 karakter).';
        }
        return;
      }

      if (!isEmailValid) {
        cmpEmail.focus();
        if (cmpFormStatus) {
          cmpFormStatus.style.color = '#d9534f';
          cmpFormStatus.textContent = 'Mohon periksa alamat email agar valid.';
        }
        return;
      }

      if (cmpFormStatus) {
        cmpFormStatus.style.color = 'var(--text-primary)';
        cmpFormStatus.textContent = '✓ Validasi berhasil! Formulir siap dikirim (demo lokal).';
      }
      showToast('Formulir valid! Tidak ada error.');
    });

    cmpForm.addEventListener('reset', () => {
      if (cmpName) {
        cmpName.removeAttribute('aria-invalid');
        if (cmpNameError) cmpNameError.hidden = true;
      }
      if (cmpEmail) {
        cmpEmail.removeAttribute('aria-invalid');
        if (cmpEmailError) cmpEmailError.hidden = true;
      }
      if (cmpMessageCount) cmpMessageCount.textContent = '0 / 200 karakter';
      if (cmpFormStatus) cmpFormStatus.textContent = '';
      showToast('Formulir telah di-reset');
    });
  }

  // --- Demo C: Selection Controls (Checkbox, Radio & Accessible Switch) ---
  const cmpSelectionGroup = document.getElementById('cmpSelectionGroup');
  const cmpSwitch = document.getElementById('cmpSwitch');
  const cmpSwitchState = document.getElementById('cmpSwitchState');
  const cmpSelectionSummary = document.getElementById('cmpSelectionSummary');

  function updateSelectionSummary() {
    if (!cmpSelectionSummary) return;
    const checkedNotifs = Array.from(document.querySelectorAll('input[name="cmpNotif"]:checked'))
      .map(cb => cb.value);
    const checkedDensity = document.querySelector('input[name="cmpDensity"]:checked');
    const isFocusOn = cmpSwitch ? cmpSwitch.getAttribute('aria-checked') === 'true' : false;

    const notifText = checkedNotifs.length > 0 ? checkedNotifs.join(', ') : 'Tidak ada';
    const densityText = checkedDensity ? checkedDensity.value : 'Lapang';
    const switchText = isFocusOn ? 'aktif' : 'nonaktif';

    cmpSelectionSummary.textContent = `Notifikasi: ${notifText} · Kepadatan: ${densityText} · Mode fokus: ${switchText}`;
  }

  if (cmpSwitch) {
    const toggleSwitchState = () => {
      const currentState = cmpSwitch.getAttribute('aria-checked') === 'true';
      const nextState = !currentState;
      cmpSwitch.setAttribute('aria-checked', String(nextState));
      if (cmpSwitchState) {
        cmpSwitchState.textContent = nextState ? 'Aktif' : 'Nonaktif';
      }
      updateSelectionSummary();
      showToast(`Mode fokus ${nextState ? 'diaktifkan' : 'dinonaktifkan'}`);
    };

    cmpSwitch.addEventListener('click', toggleSwitchState);
    cmpSwitch.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleSwitchState();
      }
    });
  }

  if (cmpSelectionGroup) {
    cmpSelectionGroup.addEventListener('change', updateSelectionSummary);
  }

  // --- Demo D: Filter Chips Toggle (aria-pressed) ---
  const filterChips = document.querySelectorAll('#cmp-tags .ui-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isPressed = chip.getAttribute('aria-pressed') === 'true';
      const nextPressed = !isPressed;
      chip.setAttribute('aria-pressed', String(nextPressed));
      const chipLabel = chip.querySelector('span')?.textContent || 'Chip';
      showToast(`Filter "${chipLabel}" ${nextPressed ? 'diaktifkan' : 'dinonaktifkan'}`);
    });
  });

  // --- Demo E: ARIA Tabs with Roving Tabindex & Arrow Keys ---
  const cmpTabsContainer = document.getElementById('cmpTabs');
  if (cmpTabsContainer) {
    const tabList = cmpTabsContainer.querySelector('.ui-tablist');
    const tabs = Array.from(cmpTabsContainer.querySelectorAll('.ui-tab'));
    const panels = Array.from(cmpTabsContainer.querySelectorAll('.ui-tabpanel'));

    function selectTab(newTab, setFocus = true) {
      tabs.forEach(tab => {
        const isSelected = tab === newTab;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        if (isSelected && setFocus) tab.focus();
      });

      const targetPanelId = newTab.getAttribute('aria-controls');
      panels.forEach(panel => {
        panel.hidden = panel.id !== targetPanelId;
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        selectTab(tab, false);
      });

      tab.addEventListener('keydown', (e) => {
        let targetIndex = -1;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex >= 0) {
          e.preventDefault();
          selectTab(tabs[targetIndex], true);
        }
      });
    });
  }

  // --- Demo F: Accordion / Disclosure Component ---
  const cmpAccordion = document.getElementById('cmpAccordion');
  if (cmpAccordion) {
    const triggers = cmpAccordion.querySelectorAll('.ui-accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        trigger.setAttribute('aria-expanded', String(!isExpanded));
        if (panel) {
          panel.classList.toggle('is-open', !isExpanded);
        }
      });
    });
  }

  // --- Demo G: Feedback (Alert Dismiss, Toast & Dialog) ---
  const cmpAlertClose = document.getElementById('cmpAlertClose');
  const cmpAlertDismissable = document.getElementById('cmpAlertDismissable');
  const cmpAlertRestore = document.getElementById('cmpAlertRestore');
  const cmpToastTrigger = document.getElementById('cmpToastTrigger');
  const cmpDialogTrigger = document.getElementById('cmpDialogTrigger');
  const cmpDialog = document.getElementById('cmpDialog');

  if (cmpAlertClose && cmpAlertDismissable && cmpAlertRestore) {
    cmpAlertClose.addEventListener('click', () => {
      cmpAlertDismissable.style.display = 'none';
      cmpAlertRestore.hidden = false;
      cmpAlertRestore.focus();
      showToast('Peringatan ditutup. Klik tombol untuk memunculkan kembali.');
    });

    cmpAlertRestore.addEventListener('click', () => {
      cmpAlertDismissable.style.display = 'flex';
      cmpAlertRestore.hidden = true;
      cmpAlertClose.focus();
      showToast('Peringatan ditampilkan kembali.');
    });
  }

  if (cmpToastTrigger) {
    cmpToastTrigger.addEventListener('click', () => {
      showToast('Ini adalah notifikasi feedback semenitwasted!');
    });
  }

  if (cmpDialogTrigger && cmpDialog) {
    const cancelBtn = cmpDialog.querySelector('[data-dialog-cancel]');
    const confirmBtn = cmpDialog.querySelector('[data-dialog-confirm]');

    cmpDialogTrigger.addEventListener('click', () => {
      if (typeof cmpDialog.showModal === 'function') {
        cmpDialog.showModal();
      } else {
        cmpDialog.setAttribute('open', '');
      }
    });

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        cmpDialog.close();
        cmpDialogTrigger.focus();
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        cmpDialog.close();
        cmpDialogTrigger.focus();
        showToast('Draft berhasil dihapus (simulasi dialog).');
      });
    }

    cmpDialog.addEventListener('close', () => {
      cmpDialogTrigger.focus();
    });
  }

});

