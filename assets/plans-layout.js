/* Keep the exported Plans content and controls, but present it in a new order. */
(() => {
  const root = document.getElementById("root");
  if (!root) return;

  function arrangePlans() {
    const main = root.querySelector("main");
    const hero = main?.querySelector(":scope > #top");
    const sitePlan = main?.querySelector(":scope > #site-plan") || hero?.querySelector(":scope > #site-plan");
    const floorPlans = main?.querySelector(":scope > #floor-plans");
    const collections = main?.querySelector(":scope > #pick");
    const heroContent = hero?.querySelector(":scope > .plans-hero-copy") || hero?.querySelector(":scope > div:last-of-type");

    if (!main || !hero || !sitePlan || !floorPlans || !collections || !heroContent) return;

    heroContent.classList.add("plans-hero-copy");
    if (sitePlan.parentElement !== hero || sitePlan.previousElementSibling !== heroContent) {
      hero.insertBefore(sitePlan, heroContent.nextSibling);
    }
    if (floorPlans.nextElementSibling !== collections) main.insertBefore(floorPlans, collections);

    const scrollCue = heroContent.querySelector('a[aria-label^="Scroll"]');
    if (scrollCue) {
      scrollCue.href = document.getElementById("brochure-floor-plans") ? "#brochure-floor-plans" : "#floor-plans";
      scrollCue.setAttribute("aria-label", "Scroll to floor plans");
    }
  }

  const observer = new MutationObserver(arrangePlans);
  observer.observe(root, { childList: true, subtree: true });
  arrangePlans();
})();
