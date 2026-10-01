(() => {
  const init = (hero) => {
    const progress = document.createElement('div');
    progress.className = 'premium-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pending = false;

    const update = () => {
      pending = false;
      const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const amount = Math.min(Math.max(window.scrollY / total, 0), 1);
      progress.style.transform = `scaleX(${amount})`;

      if (!reducedMotion.matches) {
        const heroProgress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
        hero.style.setProperty('--premium-hero-y', `${(heroProgress * 18).toFixed(1)}px`);
        hero.style.setProperty('--premium-hero-scale', `${(1.075 - heroProgress * 0.025).toFixed(3)}`);
      }
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    reducedMotion.addEventListener('change', schedule);
    update();
  };

  let attempts = 0;
  const boot = () => {
    const hero = document.querySelector('main #top > img:first-child');
    if (hero) {
      init(hero);
    } else if (attempts++ < 120) {
      window.requestAnimationFrame(boot);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
