(async () => {
  // ─── set these to match the filters you chose in the reviews modal ───
  const META = {
    appName: 'YourApp',
    loc:     'Global',    // Newest = global feed, not country-filterable
    device:  'Phone',     // Phone | Tablet | Watch | ChromeOS | TV
    sortby:  'Newest',    // MUST be Newest for the date cutoff to work
    rating:  'Nil'        // Nil when no star filter, else '5'..'1'
  };
  const MONTHS_BACK = 6;                  // how far back to harvest
  const CUTOFF = new Date();
  CUTOFF.setMonth(CUTOFF.getMonth() - MONTHS_BACK);

  const fileName = `${META.appName}-loc${META.loc}-device${META.device}-sortby${META.sortby}-rating${META.rating}-last${MONTHS_BACK}mo.csv`;

  const DELAY    = 900;
  const MAX_IDLE = 6;                     // stop after this many no-growth rounds

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const scope = document.querySelector('[role="dialog"]') || document;
  const getCards = () => {
    let c = [...scope.querySelectorAll('header.c1bOId')].map(h => h.parentElement);
    return c.length ? c : [...scope.querySelectorAll('.EGFGHd')];
  };
  const dateOf = card => {
    const t = card.querySelector('.bp9Aid')?.textContent || '';
    const d = new Date(t);
    return isNaN(d) ? null : d;
  };

  const findScroller = () => {
    let el = getCards().at(-1);
    while (el && el !== document.body) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 20) return el;
      el = el.parentElement;
    }
    return scope.scrollHeight > scope.clientHeight ? scope : document.scrollingElement;
  };

  const scroller = findScroller();
  console.log('Scrolling element:', scroller);

  // Scroll until we hit a review older than the cutoff, or stall.
  let idle = 0, prev = 0;
  while (true) {
    const cards = getCards();
    const n = cards.length;

    // oldest loaded card's date (list is Newest-first, so the last card is oldest)
    let oldest = null;
    for (let i = n - 1; i >= 0 && oldest === null; i--) oldest = dateOf(cards[i]);

    if (oldest && oldest < CUTOFF) { console.log(`Hit ${oldest.toDateString()} at card ${n}, past the ${MONTHS_BACK}-month cutoff`); break; }
    if (n === prev) {
      if (++idle >= MAX_IDLE) { console.log(`No more loading, stopped at ${n}`); break; }
    } else { idle = 0; prev = n; }

    scroller.scrollTop = scroller.scrollHeight;
    console.log(`Loaded ${n}, oldest so far: ${oldest ? oldest.toDateString() : '?'}, scrolling`);
    await sleep(DELAY);
  }

  // --- build rows, keep only the last MONTHS_BACK months ----------------
  const rows = getCards().map(card => {
    const reply = card.querySelector('.ocpBU');
    return {
      reviewer: card.querySelector('.X5PpBb')?.textContent.trim(),
      has_avatar: !!card.querySelector('img.abYEib[src^="http"]'),
      rating: parseInt((card.querySelector('[role="img"][aria-label^="Rated "]')?.getAttribute('aria-label').match(/Rated\s+(\d+)/) || [])[1], 10) || null,
      date: card.querySelector('.bp9Aid')?.textContent.trim(),
      text: card.querySelector('.h3YV2d')?.textContent.trim(),
      helpful_count: parseInt(card.querySelector('.AJTPZc')?.textContent.replace(/\D/g, ''), 10) || 0,
      reply_author: reply?.querySelector('.I6j64d')?.textContent.trim() || '',
      reply_date: reply?.querySelector('.I9Jtec')?.textContent.trim() || '',
      reply_text: reply?.querySelector('.ras4vb')?.textContent.trim() || ''
    };
  }).filter(r => {
    const d = new Date(r.date || '');
    return !isNaN(d) && d >= CUTOFF;
  });

  console.log(`Kept ${rows.length} reviews from the last ${MONTHS_BACK} months (scanned ${getCards().length} loaded)`);
  console.table(rows);

  // --- prepare CSV + save helper ------------------------------------------
  const cols = Object.keys(rows[0] || {});
  const esc  = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv  = '﻿' + [cols.join(','), ...rows.map(r => cols.map(c => esc(r[c])).join(','))].join('\r\n');

  window.saveCSV = async (name = fileName) => {
    try {
      if (window.showSaveFilePicker) {
        const handle = await showSaveFilePicker({
          suggestedName: name,
          types: [{ description: 'CSV file', accept: { 'text/csv': ['.csv'] } }]
        });
        const w = await handle.createWritable();
        await w.write(csv); await w.close();
        console.log('Saved', name);
      } else {
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        Object.assign(document.createElement('a'), { href: url, download: name }).click();
        URL.revokeObjectURL(url);
        console.log('Saved to Downloads:', name);
      }
    } catch (e) { console.log(e.name === 'AbortError' ? 'Save cancelled' : e); }
  };

  console.log(`%c▶ Run  saveCSV()  to save "${fileName}".`, 'font-weight:bold;color:#1a73e8');
})();
