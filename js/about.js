/**
 * about.js
 * Handles:
 * - Generic .animate reveal observer
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Generic fade-up observer ── */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.animate').forEach(el => fadeObserver.observe(el));
});
// ── GALLERY ──
const slides = document.querySelectorAll('.gallery-slide');
const dotsContainer = document.querySelector('.gallery-dots');
const nextButton = document.getElementById('galleryNext');
const prevButton = document.getElementById('galleryPrev');
let current = 0;

function updateSlideState() {
  slides.forEach((slide, i) => {
    const isActive = i === current;
    slide.classList.toggle('active', isActive);
  });

  [...dotsContainer.children].forEach((dot, i) => {
    const isActive = i === current;
    dot.classList.toggle('active', isActive);
  });
}

function goTo(index) {
  current = (index + slides.length) % slides.length;
  updateSlideState();
}

if (slides.length && dotsContainer && nextButton && prevButton) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.classList.add('gallery-dot');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  nextButton.addEventListener('click', () => goTo(current + 1));
  prevButton.addEventListener('click', () => goTo(current - 1));

  updateSlideState();
}
