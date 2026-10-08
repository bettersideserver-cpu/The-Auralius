const { chromium } = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 840 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5501/', { waitUntil: 'networkidle' });
  await page.evaluate(() => Promise.all([document.fonts.ready, ...Array.from(document.querySelectorAll('.estate-still'), image => image.decode())]));
  for (const [width, height] of [[390, 840], [320, 568], [360, 740], [768, 1024], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => {
      const scene = document.querySelector('#estate');
      window.scrollTo({ top: scene.offsetTop + (scene.offsetHeight - scene.firstElementChild.clientHeight) * .98, behavior: 'instant' });
    });
    await page.waitForTimeout(900);
    const metrics = await page.evaluate(() => {
      const rect = selector => {
        const el = document.querySelector(selector), r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right, display: getComputedStyle(el).display };
      };
      return {
        viewport: [innerWidth, innerHeight],
        overflow: document.documentElement.scrollWidth > innerWidth,
        header: rect('header'),
        logo: rect('header a[href="#top"]'),
        enquire: rect('header a[href="#register"]:last-child'),
        menu: rect('.mobile-page-nav'),
        stage: rect('.estate-stage'),
        title: rect('.estate-title'),
        approach: rect('.estate-approach'),
        progress: document.querySelector('#estate').dataset.progress,
        sourceRatio: document.querySelector('.estate-night').naturalWidth / document.querySelector('.estate-night').naturalHeight
      };
    });
    console.log(JSON.stringify(metrics));
    await page.screenshot({ path: path.join(__dirname, `mobile-layout-${width}.png`) });
  }
  await page.setViewportSize({ width: 390, height: 840 });
  await page.locator('.mobile-page-nav summary').click();
  console.log('Menu links:', await page.locator('.mobile-page-nav__links a:visible').count());
  await page.locator('.mobile-page-nav summary').click();
  await page.locator('header a[href="#register"]:last-child').click();
  await page.waitForTimeout(1500);
  console.log('Enquiry navigation:', await page.evaluate(() => ({ hash: location.hash, formTop: document.querySelector('#register').getBoundingClientRect().top })));
  console.log('Page errors:', JSON.stringify(errors));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
