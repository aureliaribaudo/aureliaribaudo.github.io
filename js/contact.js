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
  const submitBtn = document.getElementById('submit-btn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const fname   = document.getElementById('fname');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');

    let valid = true;

    [fname, email, message].forEach(field => field.classList.remove('error'));

    if (!fname.value.trim())   { fname.classList.add('error');   valid = false; }
    if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; }
    if (!message.value.trim()) { message.classList.add('error'); valid = false; }

    if (!privacy.checked) {
      alert('Per continuare, accetta l\'informativa sulla privacy.');
      valid = false;
    }

    if (!valid) return;

    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('success-msg').classList.add('show');
  });

});
