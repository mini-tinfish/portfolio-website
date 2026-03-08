/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
const panels = ['projects', 'about', 'coursework', 'experience', 'gallery', 'contact'];
let currentIndex = 0;

function showPanel(name) {
  const idx = panels.indexOf(name);
  if (idx === -1) return;
  currentIndex = idx;

  // Hide all panels
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Show target
  const panel = document.getElementById('panel-' + name);
  const btn = document.querySelector(`[data-panel="${name}"]`);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');

  // Scroll content into view smoothly
  const content = document.getElementById('content');
  if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Wire up nav buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showPanel(btn.dataset.panel));
});

// Keyboard arrow navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    currentIndex = Math.min(currentIndex + 1, panels.length - 1);
    showPanel(panels[currentIndex]);
  } else if (e.key === 'ArrowLeft') {
    currentIndex = Math.max(currentIndex - 1, 0);
    showPanel(panels[currentIndex]);
  }
});

/* ══════════════════════════════════════
   CAROUSEL
══════════════════════════════════════ */
const carousels = {};

function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const id = carousel.id;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dotsContainer = carousel.querySelector('.c-dots');

    if (!slides.length) return;

    carousels[id] = { current: 0, total: slides.length };

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'c-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(id, i));
        dotsContainer.appendChild(dot);
      });
    }

    // Wire prev/next buttons
    const prevBtn = carousel.querySelector('.c-prev');
    const nextBtn = carousel.querySelector('.c-next');
    if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel(id, -1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel(id, 1));
  });
}

function goToSlide(carouselId, index) {
  const carousel = document.getElementById(carouselId);
  if (!carousel || !carousels[carouselId]) return;

  const state = carousels[carouselId];
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots   = carousel.querySelectorAll('.c-dot');

  slides[state.current].classList.remove('active');
  if (dots[state.current]) dots[state.current].classList.remove('active');

  state.current = (index + state.total) % state.total;

  slides[state.current].classList.add('active');
  if (dots[state.current]) dots[state.current].classList.add('active');
}

function moveCarousel(carouselId, direction) {
  if (!carousels[carouselId]) return;
  const state = carousels[carouselId];
  goToSlide(carouselId, state.current + direction);
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Init carousels
  initCarousels();
});
