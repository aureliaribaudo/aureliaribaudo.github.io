/**
 * contact.js
 * Handles:
 * - Generic .animate reveal observer
 * - Contact form validation and success state
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Fade observer ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  /* ── Form ── */
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const successMsg = document.getElementById('success-msg');

  const requiredFields = [
    {
      field: document.getElementById('fname'),
      error: document.getElementById('fname-error'),
      message: 'Enter your first name.',
      validate: field => field.value.trim().length > 0,
    },
    {
      field: document.getElementById('email'),
      error: document.getElementById('email-error'),
      message: 'Enter a valid email address.',
      validate: field => field.value.trim().length > 0 && field.validity.valid,
    },
    {
      field: document.getElementById('message'),
      error: document.getElementById('message-error'),
      message: 'Enter a message.',
      validate: field => field.value.trim().length > 0,
    },
    {
      field: document.getElementById('privacy'),
      error: document.getElementById('privacy-error'),
      message: 'Accept the privacy policy to continue.',
      validate: field => field.checked,
    },
  ];

  function setFieldError(item, message = '') {
    const hasError = Boolean(message);
    item.field.classList.toggle('error', hasError);
    item.field.setAttribute('aria-invalid', String(hasError));
    item.error.textContent = message;
  }

  function clearErrors() {
    requiredFields.forEach(item => setFieldError(item));
    status.textContent = '';
  }

  requiredFields.forEach(item => {
    item.field.addEventListener('input', () => {
      if (item.validate(item.field)) setFieldError(item);
    });

    item.field.addEventListener('change', () => {
      if (item.validate(item.field)) setFieldError(item);
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    let firstInvalid = null;

    clearErrors();

    requiredFields.forEach(item => {
      if (!item.validate(item.field)) {
        setFieldError(item, item.message);
        valid = false;
        firstInvalid = firstInvalid || item.field;
      }
    });

    if (!valid) {
      status.textContent = 'Please correct the highlighted fields.';
      firstInvalid.focus();
      return;
    }

    form.hidden = true;
    successMsg.classList.add('show');
    successMsg.focus();
  });

});
