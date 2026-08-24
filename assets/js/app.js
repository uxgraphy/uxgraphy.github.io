// ============================================================
//  Preloader curtain
// ============================================================
// The curtain is white and so is the page, so on a fast load it is literally
// invisible — white, then content. Nothing flashes. What would flash is the
// indicator drawn on it, so that is held back by INDICATOR_AFTER and only
// ever appears when there is a genuine wait to report.
//
// Net effect: a visitor on a warm cache sees no loading UI at all. A visitor
// on a cold phone connection gets real progress and something to read.
//
// It waits on real assets — the web fonts, plus the images marked
// data-critical because they sit above the fold — and lifts on the last one.
// Deliberately NOT window.load: that also waits on the carousel images far
// below the fold, which nobody is looking at yet.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('is-loading')) return;

  var preloader = document.getElementById('preloader');
  var textEl = document.getElementById('loading-text');
  var barEl = document.getElementById('loading-bar-fill');
  if (!preloader || !textEl) {
    root.classList.remove('is-loading');
    return;
  }

  // Tied to real progress, not to a timer — "Almost there!" only appears
  // when the page is, in fact, almost there.
  var MESSAGES = [
    'Just make it EXIST first. You can make it good later.',
    'Hang tight!',
    'Almost there!'
  ];

  var INDICATOR_AFTER = 250;  // below this there is nothing worth reporting
  var MIN_SHOWN = 400;        // once shown, don't strobe it away
  var MAX_WAIT = 6000;        // a stalled asset must never trap the visitor
  var FADE = 200;             // keep in sync with #preloader.is-leaving in CSS

  var total = 0;
  var settled = 0;
  var current = -1;
  var shownAt = 0;
  var lifted = false;

  var indicatorTimer = setTimeout(function () {
    shownAt = window.performance && performance.now ? performance.now() : 0;
    preloader.classList.add('is-active');
  }, INDICATOR_AFTER);

  function paint() {
    var ratio = total ? settled / total : 1;

    if (barEl) barEl.style.transform = 'scaleX(' + ratio + ')';

    var next = ratio < 0.34 ? 0 : ratio < 0.75 ? 1 : 2;
    if (next === current) return;
    current = next;

    textEl.classList.add('is-swapping');
    setTimeout(function () {
      textEl.textContent = MESSAGES[next];
      textEl.classList.remove('is-swapping');
    }, textEl.textContent ? 150 : 0);
  }

  function done(fade) {
    if (fade) {
      preloader.classList.add('is-leaving');
      setTimeout(function () { preloader.remove(); }, FADE + 50);
    } else {
      preloader.remove();
    }
    root.classList.remove('is-loading');
    // Measurable in devtools: how long the curtain really lasted.
    if (window.performance && performance.mark) performance.mark('curtain-lift');
  }

  function lift() {
    if (lifted) return;
    lifted = true;
    clearTimeout(indicatorTimer);

    // Never shown? Then nothing is on screen to fade, and no floor applies —
    // the curtain comes off at the exact moment loading finished.
    if (!shownAt) return done(false);

    var visible = (window.performance && performance.now ? performance.now() : MIN_SHOWN) - shownAt;
    setTimeout(function () { done(true); }, Math.max(0, MIN_SHOWN - visible));
  }

  function track(promise) {
    total++;
    promise.then(settle, settle);
  }

  function settle() {
    settled++;
    paint();
    if (settled >= total) lift();
  }

  if (document.fonts && document.fonts.ready) track(document.fonts.ready);

  Array.prototype.forEach.call(
    document.querySelectorAll('img[data-critical]'),
    function (img) {
      track(new Promise(function (resolve) {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }));
    }
  );

  paint();
  setTimeout(lift, MAX_WAIT);
  if (!total) lift();
})();

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

  // Same-page anchor links (nav bar + mobile menu): close the mobile
  // dropdown immediately so it doesn't sit on top of the section the page
  // is scrolling to, and move focus to the target for keyboard/screen
  // reader users per WCAG 2.4.3 (scroll-behavior alone only moves sighted
  // mouse users).
  //
  // The focus() call is deferred until the smooth-scroll animation ends
  // (via `scrollend`, falling back to a timeout). Safari doesn't honor
  // focus's `preventScroll` option, so calling it immediately made Safari
  // perform its own instant scroll-into-view that ignores scroll-margin,
  // overshooting past the sticky header. Waiting until the page has
  // already settled at the right position makes that forced scroll a
  // no-op.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      setMenu(false);
      target.setAttribute('tabindex', '-1');

      const focusTarget = () => target.focus({ preventScroll: true });
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', focusTarget, { once: true });
      } else {
        setTimeout(focusTarget, 500);
      }
    });
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
    const len = items.length;
    current = (index + len) % len;
    items.forEach((el, i) => {
      const diff = ((i - current) % len + len) % len;
      el.classList.remove('pos-active', 'pos-prev', 'pos-next');
      if (diff === 0) el.classList.add('pos-active');
      else if (diff === 1) el.classList.add('pos-next');
      else el.classList.add('pos-prev');
    });
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
