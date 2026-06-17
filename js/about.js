/**
 * about.js
 * Handles:
 * - Generic .animate reveal observer
 * - Skill bar width animations (triggered on scroll)
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

  /* ── Skill bars ── */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = (bar.dataset.w || 0) + '%';
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.skills-col').forEach(el => barObserver.observe(el));

});
// ── GALLERY ──
const slides = document.querySelectorAll('.gallery-slide');
const dotsContainer = document.querySelector('.gallery-dots');
let current = 0;

// Crea i dots dinamicamente
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('gallery-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  slides[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');
}

document.getElementById('galleryNext').addEventListener('click', () => goTo(current + 1));
document.getElementById('galleryPrev').addEventListener('click', () => goTo(current - 1));

// Autoplay ogni 5 secondi
setInterval(() => goTo(current + 1), 5000);

// Inizializza prima slide
slides[0].classList.add('active');
