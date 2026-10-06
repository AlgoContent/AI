/* AlgoContentSEO signup guard.
   The form posts to the owner's signup service with the original field names.
   The service address is not written into the page as a form action. It is attached
   here, at the moment a person submits, after these checks pass:
     1. the hidden "website" field is empty (honeypot)
     2. the browser is not flagged as automated
     3. the person typed, pasted or tapped inside the form
     4. the page has been open for a few seconds
     5. the email address is well formed
   No email address is sent to analytics. */
(function () {
  'use strict';
  var forms = document.querySelectorAll('form.js-signup');
  if (!forms.length) return;
  var opened = Date.now();
  var MIN_MS = 3000;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  Array.prototype.forEach.call(forms, function (form) {
    var button = form.querySelector('button[type="submit"]');
    var email = form.querySelector('input[type="email"]');
    var trap = form.querySelector('input[name="website"]');
    var status = form.querySelector('.form-status');
    var touched = false;
    var sent = false;

    function say(message) {
      if (!status) return;
      status.textContent = message;
      status.hidden = !message;
    }
    function real(event) { if (event && event.isTrusted) touched = true; }

    form.addEventListener('pointerdown', real, true);
    form.addEventListener('touchstart', real, { capture: true, passive: true });
    form.addEventListener('keydown', real, true);
    form.addEventListener('paste', real, true);

    if (button) button.disabled = false;

    form.addEventListener('submit', function (event) {
      if (sent) { event.preventDefault(); return; }
      var value = (email.value || '').trim();

      // Quiet exits for automated submissions: nothing is posted and nothing is explained.
      if ((trap && trap.value) || navigator.webdriver === true) {
        event.preventDefault();
        say('Thank you.');
        return;
      }
      if (!touched) {
        event.preventDefault();
        say('Please type your email address, then press the button.');
        return;
      }
      if (!EMAIL.test(value) || value.length > 254) {
        event.preventDefault();
        say('Please enter a valid email address.');
        email.focus();
        return;
      }
      if (Date.now() - opened < MIN_MS) {
        event.preventDefault();
        say('One moment. Please press the button again.');
        return;
      }
      try {
        form.action = atob(form.getAttribute('data-ep'));
      } catch (error) {
        event.preventDefault();
        say('Something went wrong. Please message us on WhatsApp instead.');
        return;
      }
      email.value = value;
      sent = true;
      say('Sending…');
      var kind = form.getAttribute('data-kind') || 'signup';
      if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_name: kind });
      if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: kind });
      // The browser now sends the form as a normal POST.
    });
  });

  // If the visitor comes back with the Back button, let them submit again.
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    Array.prototype.forEach.call(forms, function (form) {
      form.removeAttribute('action');
      var status = form.querySelector('.form-status');
      if (status) { status.textContent = ''; status.hidden = true; }
    });
    opened = Date.now();
  });
})();
