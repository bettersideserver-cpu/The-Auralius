const { chromium } = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5501/villas/', { waitUntil: 'networkidle' });
  const photoSelectors = ['#bedrooms img[src$="villa-bedroom.jpg"]', '#bar img[src$="villa-bag.jpg"]'];
  for (const selector of photoSelectors) await page.locator(selector).evaluate(image => image.decode());
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[390, 840], [1366, 768], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    for (const photoSelector of photoSelectors) {
    await page.locator(photoSelector).evaluate(photo => {
      window.scrollTo({ top: photo.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight - 24, behavior: 'instant' });
    });
    await page.waitForTimeout(1400);
    const metrics = await page.locator(photoSelector).evaluate(photo => {
      const image = photo.getBoundingClientRect();
      const frame = photo.parentElement.getBoundingClientRect();
      const column = photo.parentElement.parentElement.getBoundingClientRect();
      return {
        viewport: innerWidth,
        image: { width: image.width, height: image.height },
        columnWidth: column.width,
        source: photo.getAttribute('src'),
        entirePhotoVisible: getComputedStyle(photo).objectFit === 'contain' && photo.naturalWidth > 0,
        fillsBox: Math.abs(image.width - frame.width) < 1 && Math.abs(image.height - frame.height) < 1,
        fillsDesktopColumn: innerWidth < 768 || Math.abs(frame.width - column.width) < 1,
        mobileWidthPreserved: innerWidth >= 768 || Math.abs(frame.width / column.width - .72) < .001,
        overflow: document.documentElement.scrollWidth > innerWidth
      };
    });
    console.log(JSON.stringify(metrics));
    if (!metrics.fillsBox || !metrics.entirePhotoVisible || metrics.overflow) throw new Error('Photo box layout check failed');
    const name = photoSelector.includes('bedrooms') ? 'dining-card' : 'arrival-card';
    await page.locator(photoSelector).screenshot({ path: path.join(__dirname, `villa-full-${name}-${width}.png`) });
    }
  }
  console.log('Page errors:', JSON.stringify(errors));
  if (errors.length) throw new Error('Page had runtime errors');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
