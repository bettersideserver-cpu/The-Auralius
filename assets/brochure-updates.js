/* Content supplied in the Auralius technical booklet. Keep these additions
   outside the exported React bundles so their copy and images remain editable. */
(() => {
  const root = document.getElementById("root");
  if (!root) return;

  const addSection = (id, anchor, position, markup) => {
    if (!anchor || document.getElementById(id)) return;
    const section = document.createElement("section");
    section.id = id;
    section.className = "brochure-section";
    section.innerHTML = markup;
    if (position === "before") anchor.before(section);
    else anchor.after(section);
  };

  function mountHome() {
    const register = root.querySelector("#register");
    if (!register) return;
    addSection("home-brochure-highlights", register, "before", `
      <div class="brochure-wrap residence-story">
        <div class="residence-story-intro">
          <div>
            <p class="brochure-eyebrow">A private hillside address</p>
            <h2>Fully Furnished.<br><em>Fully Customisable.</em></h2>
          </div>
          <div class="residence-story-aside">
            <p>Homes designed for the way you want to live, with furnished interiors and room to make the details your own.</p>
            <a class="residence-story-link" href="./plans/">Explore the plans <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure class="residence-story-visual">
          <img src="./images/brochure-aerial.webp?v=20261007-hires" alt="The Auralius estate on a wooded Kasauli hillside in daylight" loading="lazy">
          <figcaption><span>Estate visual · Technical booklet</span><span>Kasauli Hills · Dharampur</span></figcaption>
        </figure>
        <div class="residence-story-facts" aria-label="Project facts">
          <div><strong>12</strong><span>Private Villas</span></div>
          <div><strong>4 &amp; 4+1</strong><span>Configurations</span></div>
          <div><strong>2027</strong><span>Delivery</span></div>
        </div>
      </div>`);
    addSection("home-developer", register, "before", `
      <div class="brochure-wrap developer-story">
        <div class="developer-story-topline"><p class="brochure-eyebrow">The developer</p><span>The Auralius · Kasauli Hills</span></div>
        <div class="developer-story-content">
          <h2>A vision by<br><em>Surya Realty.</em></h2>
          <div class="developer-story-rule" aria-hidden="true"></div>
          <img src="./developers/images/surya-realty-logo.png" alt="Surya Realty" loading="lazy">
          <p>Discover the people and philosophy behind The Auralius.</p>
          <a class="developer-story-link" href="./developers/">Meet the developer <span aria-hidden="true">↗</span></a>
        </div>
      </div>`);
    addSection("home-project-status", register, "before", `
      <div class="brochure-wrap">
        <div class="project-status-intro">
          <div>
            <p class="brochure-eyebrow">Surya Realty portfolio</p>
            <h2>Delivered places.<br><em>What comes next.</em></h2>
          </div>
          <p>The Grand Walk and Alpha International City are delivered. The Auralius is in progress, with delivery listed for 2027.</p>
        </div>
        <div class="project-status-layout">
          <section class="project-status-group" aria-labelledby="project-status-delivered-heading">
            <div class="project-status-group-heading"><h3 id="project-status-delivered-heading">Delivered</h3><span>02 projects</span></div>
            <div class="project-status-delivered-grid">
              <article class="project-status-card">
                <div class="project-status-image"><img src="./images/projects/the-grand-walk.jpg" alt="The Grand Walk commercial building in Ludhiana" loading="lazy"></div>
                <div class="project-status-card-copy">
                  <span class="project-status-tag">Delivered · Commercial</span>
                  <h4>The Grand Walk</h4>
                  <p>Ferozepur Road, Ludhiana</p>
                </div>
              </article>
              <article class="project-status-card">
                <div class="project-status-image"><img src="./images/projects/alpha-international-city.jpg" alt="Entrance to Alpha International City" loading="lazy"></div>
                <div class="project-status-card-copy">
                  <span class="project-status-tag">Delivered · Residential</span>
                  <h4>Alpha International City</h4>
                  <p>Jalandhar–Amritsar NH-3</p>
                </div>
              </article>
            </div>
          </section>
          <section class="project-status-group project-status-progress" aria-labelledby="project-status-progress-heading">
            <div class="project-status-group-heading"><h3 id="project-status-progress-heading">In progress</h3><span>01 project</span></div>
            <article class="project-status-card">
              <div class="project-status-image"><img src="./images/hero-villas.webp" alt="Architectural visual of The Auralius villas" loading="lazy"></div>
              <div class="project-status-card-copy">
                <span class="project-status-tag">In progress · Delivery 2027</span>
                <h4 class="project-status-auralius-logo">
                  <img src="./assets/auralius-mark.svg" alt="" width="64" height="64" loading="lazy">
                  <span class="project-status-auralius-wordmark">The Auralius<small>Privé Hillside Villas</small></span>
                </h4>
                <p>Kasauli Hills, Dharampur</p>
                <a href="./villas/">Explore the villas <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </section>
        </div>
      </div>`);
    const developer = document.getElementById("home-developer");
    const portfolio = document.getElementById("home-project-status");
    if (developer && portfolio && portfolio.parentElement !== developer) developer.append(portfolio);
  }

  function mountVillas() {
    const hero = root.querySelector("main #top");
    if (!hero) return;
    const cards = [1, 2, 3, 4, 5].map((block) => `
      <figure class="villa-brochure-card">
        <button type="button" class="villa-brochure-open" data-block="${block}" aria-label="Enlarge Block ${block} villa visual">
          <img src="./images/brochure/block-${block}.webp" alt="Architectural visual of The Auralius Block ${block} villas" loading="lazy">
          <span class="villa-brochure-caption"><span>Block 0${block}</span><span>View visual <span aria-hidden="true">↗</span></span></span>
        </button>
      </figure>`).join("");
    addSection("villa-brochure-gallery", hero, "after", `
      <div class="brochure-wrap">
        <div class="brochure-section-heading">
          <div><p class="brochure-eyebrow">The villas in detail</p><h2>Five blocks.<br>Twelve private villas.</h2></div>
          <p>Explore the villa elevations from the technical booklet. The collection offers 4 and 4+1 configurations, with delivery in 2027.</p>
        </div>
        <div class="villa-brochure-grid">${cards}</div>
        <p class="villa-brochure-footnote">Architectural visuals from the technical booklet · Select an image to explore</p>
      </div>
      <dialog class="villa-brochure-dialog" aria-label="Villa visual gallery">
        <div class="villa-brochure-dialog-top">
          <span class="villa-brochure-dialog-title">Block 01</span>
          <button type="button" class="villa-brochure-close" aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button>
        </div>
        <div class="villa-brochure-dialog-image"><img alt=""></div>
        <div class="villa-brochure-dialog-bottom">
          <span class="villa-brochure-count">01 / 05</span>
          <span>Architectural visual · Technical booklet</span>
          <div class="villa-brochure-dialog-actions">
            <button type="button" class="villa-brochure-previous" aria-label="Previous villa image">← <span>Previous</span></button>
            <button type="button" class="villa-brochure-next" aria-label="Next villa image"><span>Next</span> →</button>
          </div>
        </div>
      </dialog>`);

    const gallery = document.getElementById("villa-brochure-gallery");
    if (gallery.dataset.viewerReady) return;
    gallery.dataset.viewerReady = "true";
    const dialog = gallery.querySelector(".villa-brochure-dialog");
    const dialogImage = dialog.querySelector("img");
    const title = dialog.querySelector(".villa-brochure-dialog-title");
    const count = dialog.querySelector(".villa-brochure-count");
    let current = 1;
    let opener;

    function show(block) {
      current = ((block - 1 + 5) % 5) + 1;
      dialogImage.src = `./images/brochure/block-${current}.webp`;
      dialogImage.alt = `Architectural visual of The Auralius Block ${current} villas`;
      title.textContent = `Block 0${current}`;
      count.textContent = `0${current} / 05`;
    }

    gallery.querySelectorAll(".villa-brochure-open").forEach((button) => {
      button.addEventListener("click", () => {
        opener = button;
        show(Number(button.dataset.block));
        dialog.showModal();
      });
    });
    dialog.querySelector(".villa-brochure-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".villa-brochure-previous").addEventListener("click", () => show(current - 1));
    dialog.querySelector(".villa-brochure-next").addEventListener("click", () => show(current + 1));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
    });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => opener?.focus());
  }

  function mountAmenities() {
    const amenities = root.querySelector("main #amenities");
    if (!amenities) return;
    const details = [
      ["01", "Fully furnished interiors", "Beds, sofas, dining furniture and easy chairs are included in the technical specifications."],
      ["02", "Modular kitchens", "Granite or composite counters and specified kitchen equipment."],
      ["03", "Climate comfort", "VRV air conditioning and a heat pump are listed in the booklet."],
      ["04", "Double glazing", "Aluminium framed external doors and windows with double glass for insulation."],
      ["05", "Designer bathrooms", "Designer tile finishes and specified sanitary fittings and fixtures."],
      ["06", "Considered lighting", "Energy efficient LED ceiling lights and decorative lighting fixtures."]
    ].map(([number, title, copy]) => `<article><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join("");
    addSection("in-villa-comforts", amenities, "after", `
      <div class="brochure-wrap">
        <p class="brochure-eyebrow">Beyond the shared spaces</p>
        <div class="brochure-section-heading"><h2>In-villa comforts.</h2><p>Additional details documented in the technical booklet.</p></div>
        <div class="in-villa-grid">${details}</div>
      </div>`);
  }

  function mountLocation() {
    const location = root.querySelector("main #location");
    if (!location) return;
    addSection("nearby-conveniences", location, "after", `
      <div class="brochure-wrap">
        <div class="nearby-intro">
          <div>
            <p class="brochure-eyebrow">Around the corner</p>
            <h2>The everyday,<br>close at hand.</h2>
          </div>
          <p>The project booklet places familiar stops along the approach to the estate.</p>
        </div>

        <div class="nearby-brand-grid" aria-label="Nearby landmarks">
          <article class="nearby-brand-card nearby-brand-starbucks">
              <div class="nearby-brand-mark"><img class="nearby-logo-image nearby-logo-starbucks" src="./images/brands/starbucks.svg" alt="" width="237" height="240" loading="lazy"></div>
            <span class="nearby-brand-kicker">01 / Coffee</span>
            <h3>Starbucks</h3>
            <p>Just around the corner</p>
          </article>
          <article class="nearby-brand-card nearby-brand-burger">
              <div class="nearby-brand-mark"><img class="nearby-logo-image nearby-logo-burger" src="./images/brands/burger-king.svg" alt="" width="173" height="173" loading="lazy"></div>
            <span class="nearby-brand-kicker">02 / Dining</span>
            <h3>Burger King</h3>
            <p>Just around the corner</p>
          </article>
          <article class="nearby-brand-card nearby-brand-fern">
              <div class="nearby-brand-mark"><img class="nearby-logo-image nearby-logo-fern" src="./images/brands/the-fern.svg" alt="" width="152" height="69" loading="lazy"></div>
            <span class="nearby-brand-kicker">03 / Hospitality</span>
            <h3>The Fern Surya Resort</h3>
            <p>Nearby hillside hospitality</p>
          </article>
          <article class="nearby-brand-card nearby-brand-series">
              <div class="nearby-brand-mark"><img class="nearby-logo-image nearby-logo-series" src="./images/brands/series-by-marriott.png" alt="" width="838" height="266" loading="lazy"></div>
            <span class="nearby-brand-kicker">04 / Hospitality</span>
            <h3>Series by Marriott</h3>
            <p>Kasauli Hills, Dharampur</p>
          </article>
        </div>

        <div class="nearby-map-layout">
          <div class="nearby-map-intro">
            <p class="brochure-eyebrow">The estate approach</p>
            <h3>See how it all<br>comes together.</h3>
            <p>The technical booklet's master plan marks Starbucks and Burger King beside the approach road.</p>
          </div>
          <figure class="nearby-map">
            <img src="./images/site-plan-brochure.webp" alt="Technical booklet master plan showing The Auralius and nearby Starbucks and Burger King" loading="lazy">
            <figcaption>Master plan from the supplied technical booklet</figcaption>
          </figure>
        </div>
      </div>`);
  }

  function mountHeaderLogo() {
    const logo = root.querySelector("header > .gutter > a[href='#top'], header > div > a.group[href='#top']");
    if (!logo) return;
    const name = logo.querySelector("span:first-child");
    if (name && name.textContent.trim().toLowerCase() !== "the auralius") name.textContent = "The Auralius";
    if (logo.getAttribute("aria-label") !== "The Auralius — Privé Hillside Villas") {
      logo.setAttribute("aria-label", "The Auralius — Privé Hillside Villas");
    }
  }

  function mount() {
    mountHeaderLogo();
    if (document.body.classList.contains("page-villas")) mountVillas();
    else if (document.body.classList.contains("page-amenities")) mountAmenities();
    else if (document.body.classList.contains("page-location")) mountLocation();
    else if (!document.body.classList.contains("inner-page")) mountHome();
  }

  const observer = new MutationObserver(mount);
  observer.observe(root, { childList: true, subtree: true });
  mount();
})();
