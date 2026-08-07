// ============================================================
//  Preloader (disabled)
// ============================================================
// The loading-screen experience is turned off — the #preloader markup is
// commented out in index.html / writeups.html, and #content now shows
// immediately via CSS instead of waiting on this script. Kept here in case
// it needs to come back.
//
// const randomTexts = [
//   "Just make it EXIST first. You can make it good later.",
//   "Hang tight!",
//   "Almost there!"
// ];
//
// document.getElementById('loading-text').textContent =
//   randomTexts[Math.floor(Math.random() * randomTexts.length)];
//
// function revealContent() {
//   const preloader = document.getElementById('preloader');
//   const content = document.getElementById('content');
//
//   preloader.style.display = 'none';
//   content.style.display = 'block';
//   content.style.opacity = '1';
//   content.style.transition = 'opacity 0.2s ease-in-out';
//
//   // Content was hidden while the preloader ran, so the browser's
//   // automatic scroll-to-hash on load had nothing to scroll to. Do it now.
//   if (window.location.hash) {
//     const target = document.getElementById(window.location.hash.slice(1));
//     if (target) target.scrollIntoView({ behavior: 'smooth' });
//   }
// }
//
// // The preloader exists to cover real loading time, not as a fixed-length
// // animation. If the page (and its cached assets) are already loaded by the
// // time this script runs, there's nothing to wait for, so skip it entirely.
// if (document.readyState === 'complete') {
//   revealContent();
// } else {
//   window.addEventListener('load', revealContent);
// }

// ============================================================
//  Anchor scrolling
// ============================================================
// Same-document anchor jumps (clicking "Case Studies" while already on the
// home page) animate via `scroll-behavior: smooth` in CSS. Arriving from
// another page (writeups.html -> index.html#case-studies) is a cross-document
// load and is deliberately left instant — the browser's native behavior —
// so the section is simply there on arrival with no animation on landing.

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
