// ============================================================
//  Preloader
// ============================================================
const randomTexts = [
  "Just make it EXIST first. You can make it good later.",
  "Hang tight!",
  "Almost there!"
];

document.getElementById('loading-text').textContent =
  randomTexts[Math.floor(Math.random() * randomTexts.length)];

// First visit shows the preloader a little longer than repeat visits
const isFirstLoad = !localStorage.getItem('hasLoadedBefore');
const delay = isFirstLoad ? 4000 : 1500;

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');

  setTimeout(() => {
    preloader.style.display = 'none';
    content.style.display = 'block';

    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transition = 'opacity 0.2s ease-in-out';
    }, 200);

    localStorage.setItem('hasLoadedBefore', 'true');
  }, delay);
});

// Kept from the original site (referenced ad-hoc; harmless if unused)
function RequestCaseStudy() {
  alert(
    `Description:\n
      a) First point\n
      b) Second point\n
      c) Third point\n
      d) Fourth point\n
      e) Fifth point`
  );
}

// ============================================================
//  Header burger menu
// ============================================================
(function () {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  const scrim = document.getElementById('menu-scrim');
  if (!burger || !menu) return;

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  if (scrim) scrim.addEventListener('click', () => setMenu(false));
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(e.target) || burger.contains(e.target)) return;
    setMenu(false);
  });
})();

// ============================================================
//  Carousel (vanilla replacement for the Bootstrap component)
// ============================================================
(function () {
  const root = document.getElementById('carousel-1');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.carousel-item'));
  const indicators = Array.from(root.querySelectorAll('.carousel-indicators [data-bs-slide-to]'));
  if (!items.length) return;

  const INTERVAL = 5000; // matches Bootstrap's default cycle time
  let current = 0;
  let timer = null;

  function show(index) {
    current = (index + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('active', i === current));
    indicators.forEach((el, i) => el.classList.toggle('active', i === current));
  }

  function next() {
    show(current + 1);
  }

  function start() {
    stop();
    timer = setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  indicators.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-bs-slide-to'), 10);
      show(target);
      start(); // reset the timer after a manual jump
    });
  });

  // Pause on hover, like Bootstrap's default behavior
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  show(0);
  start();
})();
