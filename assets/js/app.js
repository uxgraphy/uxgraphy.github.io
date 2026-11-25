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
// It waits on real assets: the web fonts, plus every image visible in the
// first viewport (measured at runtime). Deliberately NOT window.load: that
// also waits on images far below the fold, which nobody is looking at yet.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('is-loading')) return;

  var preloader = document.getElementById('preloader');
  var textEl = document.getElementById('loading-text');
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

  // Full brand moment only on the first page view of a session. Every later
  // page is quiet: nothing shows unless the load is genuinely slow.
  var firstView = true;
  try {
    firstView = !sessionStorage.getItem('sn-loader-seen');
    sessionStorage.setItem('sn-loader-seen', '1');
  } catch (e) {}

  var INDICATOR_AFTER = firstView ? 0 : 250;    // repeat views: only report a real wait
  var MIN_SHOWN = firstView ? 2400 : 400;       // first view: long enough for all three messages
  var MAX_WAIT = 6000;        // a stalled asset must never trap the visitor
  var FADE = 200;             // keep in sync with #preloader.is-leaving in CSS

  var total = 0;
  var settled = 0;
  var current = -1;
  var shownAt = 0;
  var lifted = false;

  function show() {
    shownAt = window.performance && performance.now ? performance.now() : 1;
    preloader.classList.add('is-active');
  }

  var indicatorTimer = 0;
  if (firstView) show();
  else indicatorTimer = setTimeout(show, INDICATOR_AFTER);

  // First view: messages also advance on a timer, so a fast load still shows
  // all three. Repeat views: messages follow real progress only.
  var floorIdx = firstView ? 0 : 2;
  if (firstView) {
    setTimeout(function () { floorIdx = 1; paint(); }, 900);
    setTimeout(function () { floorIdx = 2; paint(); }, 1700);
  }

  function paint() {
    var ratio = total ? settled / total : 1;

    var next = Math.min(floorIdx, ratio < 0.34 ? 0 : ratio < 0.75 ? 1 : 2);
    if (next === current) return;
    current = next;

    textEl.classList.add('is-swapping');
    setTimeout(function () {
      textEl.textContent = MESSAGES[next];
      textEl.classList.remove('is-swapping');
    }, textEl.textContent ? 150 : 0);
  }

  function done(fade) {
    // .is-loading is what keeps the curtain displayed, so it must outlive the
    // fade. Removing it up front made the curtain vanish instantly.
    if (fade) {
      preloader.classList.add('is-leaving');
      setTimeout(function () {
        preloader.remove();
        root.classList.remove('is-loading');
      }, FADE + 50);
    } else {
      preloader.remove();
      root.classList.remove('is-loading');
    }
    warmBuffer();
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

  // The gate is measured on this device, not hand-tagged: every image that
  // is on screen right now (phone and desktop differ). Images within one more
  // screen below the fold don't hold the curtain, but are fetched eagerly the
  // moment it lifts, so an early scroll finds them already arriving. The rest
  // keep native lazy loading.
  var vh = window.innerHeight || document.documentElement.clientHeight;
  var buffer = [];

  Array.prototype.forEach.call(document.images, function (img) {
    var r = img.getBoundingClientRect();
    if (!r.width && !r.height) return;          // hidden (inactive slide, display:none)
    if (r.bottom > 0 && r.top < vh) {
      if (img.loading === 'lazy') img.loading = 'eager';
      track(new Promise(function (resolve) {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }));
    } else if (r.top >= vh && r.top < vh * 2) {
      buffer.push(img);
    }
  });

  function warmBuffer() {
    buffer.forEach(function (img) { if (img.loading === 'lazy') img.loading = 'eager'; });
    buffer = [];
  }

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

// ============================================================
//  Case study card thumbnails: hover scale factors
// ============================================================
// On hover each thumbnail scales from its center until it sits flush with the card's
// inner border, closing the 4px white rim (see .cs-thumb in input.css). The factor
// depends on the thumbnail's own size, so it is set per card: 1 + 8px / size, which is
// 4px of growth on each side.
(function () {
  var thumbs = document.querySelectorAll('.cs-thumb');
  if (!thumbs.length) return;
  var GROW = 8;

  function update(el) {
    el.style.setProperty('--sx', (1 + GROW / el.offsetWidth).toFixed(4));
    el.style.setProperty('--sy', (1 + GROW / el.offsetHeight).toFixed(4));
  }

  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) { update(e.target); });
    });
    thumbs.forEach(function (el) { ro.observe(el); });
  } else {
    thumbs.forEach(update);
  }
})();
