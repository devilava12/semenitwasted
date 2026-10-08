/* ==========================================================================
   SEMENITWASTED — CONTACT PAGE SCRIPT
   Handles: Formspree AJAX submit, client-side validation, UI state
   ========================================================================== */

(function () {
  'use strict';

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  if (!form) return;

  /* ---- Validation helpers ---- */
  function showFieldError(id, message) {
    const el = document.getElementById('error-' + id);
    const input = form.querySelector('[name="' + id + '"]') ||
                  form.querySelector('#contact-' + id);
    if (el) el.textContent = message;
    if (input) input.classList.add('is-invalid');
  }

  function clearFieldError(id) {
    const el = document.getElementById('error-' + id);
    const input = form.querySelector('[name="' + id + '"]') ||
                  form.querySelector('#contact-' + id);
    if (el) el.textContent = '';
    if (input) input.classList.remove('is-invalid');
  }

  function validateForm() {
    let valid = true;

    const name    = form.querySelector('#contact-name');
    const email   = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('message');

    if (!name || name.value.trim() === '') {
      showFieldError('name', 'Please enter your name.');
      valid = false;
    }

    if (!email || email.value.trim() === '') {
      showFieldError('email', 'Please enter your email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showFieldError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!message || message.value.trim() === '') {
      showFieldError('message', 'Please enter your message.');
      valid = false;
    }

    return valid;
  }

  /* ---- Clear error on input ---- */
  ['name', 'email', 'message'].forEach(function (field) {
    const input = form.querySelector('#contact-' + field);
    if (input) {
      input.addEventListener('input', function () {
        clearFieldError(field);
      });
    }
  });

  /* ---- Submit handler ---- */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    successEl.hidden = true;
    errorEl.hidden   = true;

    if (!validateForm()) {
      /* Focus first invalid field */
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* UI: loading state */
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successEl.hidden = false;
        form.reset();
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const json = await response.json().catch(function () { return {}; });
        if (json.errors) {
          console.error('Formspree errors:', json.errors);
        }
        errorEl.hidden = false;
      }
    } catch (_err) {
      errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    }
  });

})();
