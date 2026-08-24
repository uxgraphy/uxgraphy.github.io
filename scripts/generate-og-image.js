// Screenshots the hero section and renders it into a 1200x630 OG image.
// Used by .github/workflows/og-image.yml on every push to main.
const { chromium } = require('playwright');
const sharp = require('sharp');

const SITE_URL = process.argv[2] || 'http://localhost:4173';
const OUT_PATH = process.argv[3] || 'assets/img/og-image.png';
const TARGET_W = 1200;
const TARGET_H = 630;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800); // let the preloader curtain clear

  const hero = await page.$('main .intro-block-01');
  const heroContainer = await hero.evaluateHandle((node) => node.closest('.mx-auto'));
  const box = await heroContainer.asElement().boundingBox();

  const rawShot = await page.screenshot({
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  });

  await browser.close();

  await sharp(rawShot)
    .resize(TARGET_W, TARGET_H, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(OUT_PATH);
})();
