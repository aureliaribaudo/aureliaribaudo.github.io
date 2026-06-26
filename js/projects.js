/**
 * projects.js
 * Handles:
 * - Scroll reveal for .exp-card elements
 * - Category filter buttons
 */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.exp-card');

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
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

    cards.forEach(el => observer.observe(el));
  } else {
    cards.forEach(el => el.classList.add('visible'));
  }

  /* Filter buttons */
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const categories = (card.dataset.cat || '').split(/\s+/);
        const shouldShow = filter === 'all' || categories.includes(filter);

        card.hidden = !shouldShow;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
});
