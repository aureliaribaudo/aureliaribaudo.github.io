/**
 * nav.js
 * Handles nav scroll effect for pages where nav starts transparent (index)
 * and solid state for inner pages.
 */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  if (nav.classList.contains('solid')) return; // inner pages stay solid

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
