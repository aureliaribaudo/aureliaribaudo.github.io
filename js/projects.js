/**
 * projects.js
 * Handles:
 * - Scroll-reveal for .exp-card elements
 * - Category filter buttons
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.exp-card').forEach(el => observer.observe(el));

  /* ── Filter buttons ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.exp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = filter === 'all' || cats.includes(filter);
        card.hidden = !show;
      });
    });
  });

});
