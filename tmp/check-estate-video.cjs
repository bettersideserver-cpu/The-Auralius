const { chromium } = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 840 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:5501/', { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([document.fonts.ready, ...Array.from(document.querySelectorAll('.estate-still'), img => img.decode())]));
    for (const [width, height] of [[390, 840], [320, 568], [768, 1024], [840, 390], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => {
        const scene = document.querySelector('#estate');
        window.scrollTo({ top: scene.offsetTop + (scene.offsetHeight - scene.firstElementChild.clientHeight) * .8, behavior: 'instant' });
      });
      await page.waitForFunction(() => document.querySelector('.estate-road').readyState >= 2);
      await page.waitForTimeout(1000);
      const metrics = await page.evaluate(() => {
        const media = document.querySelector('.estate-media');
        const stage = document.querySelector('.estate-stage');
        const video = document.querySelector('.estate-road');
        const still = document.querySelector('.estate-night');
        const rect = el => { const r = el.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; };
        const m = rect(media), s = rect(stage), v = rect(video), i = rect(still);
        return { viewport: [innerWidth, innerHeight], media:m, stage:s, video:v,
          videoSource:[video.videoWidth,video.videoHeight], paused:video.paused,
          videoOpacity:getComputedStyle(video).opacity,
          aligned: ['x','y','w','h'].every(key => Math.abs(i[key] - v[key]) < 1),
          coversFrame: v.x <= m.x + 1 && v.y <= m.y + 1 && v.x + v.w >= m.x + m.w - 1 && v.y + v.h >= m.y + m.h - 1,
          overflow: document.documentElement.scrollWidth > innerWidth };
      });
      console.log(JSON.stringify(metrics));
      await page.locator('.estate-media').screenshot({ path:path.join(__dirname, `estate-video-${width}.png`) });
      if (!metrics.coversFrame || !metrics.aligned || metrics.videoOpacity !== '1' || metrics.paused || metrics.overflow) throw new Error('Video coverage or playback check failed');
    }
    await page.setViewportSize({width:390,height:840});
    await page.evaluate(() => {
      const scene = document.querySelector('#estate');
      window.scrollTo({top:scene.offsetTop + (scene.offsetHeight - scene.firstElementChild.clientHeight) * .63,behavior:'instant'});
    });
    await page.waitForTimeout(500);
    await page.locator('.estate-media').screenshot({path:path.join(__dirname,'estate-video-transition.png')});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(300);
    console.log('Reduced motion:', await page.locator('.estate-road').evaluate(video => ({paused:video.paused,display:getComputedStyle(video).display})));
    console.log('MP4 dimensions:', await page.evaluate(() => new Promise((resolve,reject) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => resolve([video.videoWidth,video.videoHeight]);
      video.onerror = () => reject(new Error('MP4 metadata failed'));
      video.src = 'road-night-loop.mp4';
    })));
    console.log('Page errors:', JSON.stringify(errors));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
