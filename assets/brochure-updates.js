/* Content from the Auralius technical booklet and updated Surya Realty profile.
   Homepage profile: pages 4-8, 15 and 17-22. Villa specifications: booklet page 35.
   Keep these additions
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
    const hero = root.querySelector("#top");
    addSection("home-address-facts", hero, "after", `
      <div class="brochure-wrap address-facts">
        <div><span>A hillside address</span><strong>Above 4,700 ft.</strong><p>Above sea level · Kasauli Hills</p></div>
        <div><span>A private collection</span><strong>12 villas</strong><p>Dharampur, Himachal Pradesh</p></div>
        <div><span>RERA registration</span><strong class="address-rera">RERAHPSOP09210117</strong><p>The Auralius</p></div>
      </div>`);
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
          <p>Rooted in North India, Surya Realty brings experience across hospitality, entertainment and construction to residential, commercial and leisure developments. Its approach places innovation, sustainability and community at the heart of each project.</p>
          <a class="developer-story-link" href="./developers/">Meet the developer <span aria-hidden="true">↗</span></a>
          <a class="developer-story-link developer-csr-link" href="./csr/">CSR initiatives <span aria-hidden="true">↗</span></a>
        </div>
      </div>`);
    addSection("home-project-status", register, "before", `
      <div class="brochure-wrap">
        <div class="project-status-intro">
          <div>
            <p class="brochure-eyebrow">Surya Realty portfolio</p>
            <h2>Delivered places.<br><em>What comes next.</em></h2>
          </div>
          <p>Two delivered destinations. Four upcoming and ongoing developments. Explore the portfolio, including Opus One, Jujhar IT Building with delivery in June 2027, and The Auralius with delivery in November 2027.</p>
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
                  <p class="project-description">Delivered in 2015, this commercial destination brings together retail, restaurants, cafés and office suites.</p>
                </div>
              </article>
              <article class="project-status-card">
                <div class="project-status-image"><img src="./images/projects/alpha-international-city.jpg" alt="Entrance to Alpha International City" loading="lazy"></div>
                <div class="project-status-card-copy">
                  <span class="project-status-tag">Delivered · Residential</span>
                  <h4>Alpha International City</h4>
                  <p>Jalandhar–Amritsar NH-3</p>
                  <p class="project-description">A residential township in Amritsar with villas and apartments, offering sizes of 250, 500, 1,100 and 2,500 square yards.</p>
                </div>
              </article>
            </div>
          </section>
          <section class="project-status-group project-status-progress" aria-labelledby="project-status-progress-heading">
            <div class="project-status-group-heading"><h3 id="project-status-progress-heading">Upcoming &amp; in progress</h3><span>04 projects</span></div>
            <div class="project-status-upcoming-grid">
            <article class="project-status-card">
              <div class="project-status-image"><img src="./images/hero-villas.webp" alt="Architectural visual of The Auralius villas" loading="lazy"></div>
              <div class="project-status-card-copy">
                <span class="project-status-tag">In progress · November 2027</span>
                <h4 class="project-status-auralius-logo">
                  <img src="./assets/auralius-mark.svg" alt="" width="64" height="64" loading="lazy">
                  <span class="project-status-auralius-wordmark">The Auralius<small>Privé Hillside Villas</small></span>
                </h4>
                <p>Kasauli Hills, Dharampur</p>
                <p class="project-description">Twelve private hillside villas with furnished interiors, terraces and gardens, in 4 and 4+1 configurations.</p>
                <a href="./villas/">Explore the villas <span aria-hidden="true">↗</span></a>
              </div>
            </article>
            <article class="project-status-card">
              <div class="project-status-image"><img src="./images/projects/opus-one.webp" alt="Opus One residential towers, as shown in the company profile" loading="lazy"></div>
              <div class="project-status-card-copy">
                <span class="project-status-tag">Ongoing · Residential</span>
                <h4>Opus One</h4><p>Eco-City 2, New Chandigarh</p>
                <p class="project-description">GB Realty’s flagship luxury apartment development, spanning 8.75 acres in New Chandigarh.</p>
              </div>
            </article>
            <article class="project-status-card">
              <div class="project-status-image"><img src="./images/projects/tangori-group-housing.webp" alt="Group housing project visual from the company profile" loading="lazy"></div>
              <div class="project-status-card-copy"><span class="project-status-tag">Upcoming · Residential</span>
                <h4>Group Housing Project</h4><p>Tangori, SAS Nagar</p>
                <p class="project-description">An upcoming residential group housing development across seven acres in Tangori.</p>
              </div>
            </article>
            <article class="project-status-card">
              <div class="project-status-image"><img src="./images/projects/jujhar-it-building.webp" alt="Jujhar IT Building architectural visual from the company profile" loading="lazy"></div>
              <div class="project-status-card-copy"><span class="project-status-tag">Delivery June 2027 · Office spaces</span>
                <h4>Jujhar IT Building</h4><p>Sector 101-A, Mohali</p>
                <p class="project-description">A commercial development offering 2,60,000 square feet of modern workspaces in Mohali, with delivery scheduled for June 2027.</p>
              </div>
            </article>
            </div>
          </section>
        </div>
      </div>`);
    const developer = document.getElementById("home-developer");
    const portfolio = document.getElementById("home-project-status");
    if (developer && portfolio && portfolio.parentElement !== developer) developer.append(portfolio);
    const furnished = document.getElementById("home-brochure-highlights");
    const earlyAnchor = root.querySelector("#estate") || document.getElementById("home-address-facts");
    if (furnished && earlyAnchor && earlyAnchor.nextElementSibling !== furnished) earlyAnchor.after(furnished);
    addSection("home-group-companies", register, "after", `
      <div class="brochure-wrap">
        <div class="brochure-section-heading"><div><p class="brochure-eyebrow">Businesses &amp; leadership ventures</p><h2>Connected by<br>a shared vision.</h2></div><p>The group’s businesses span real estate, hospitality, entertainment and connectivity. Its leadership experience also includes an association with healthcare.</p></div>
        <div class="group-company-grid">
          <article><span>01 / Real estate</span><h3>Places to live &amp; work</h3><ul><li>The Auralius</li><li>Opus One</li><li>The Grand Walk</li><li>Alpha International City</li><li>Group Housing Project, Tangori</li><li>Jujhar IT Building <small>Delivery: June 2027</small></li><li>South Hall Street <small>Leadership portfolio</small></li><li>Falak Farms <small>Premium farmhouse community</small></li></ul></article>
          <article><span>02 / Hospitality</span><h3>Welcoming destinations</h3><ul><li>Sarovar Premiere <small>Amritsar</small></li><li>Fairfield by Marriott <small>Amritsar</small></li><li>The Fern Surya Resort <small>Dharampur</small></li></ul></article>
          <article><span>03 / Family entertainment</span><h3>Time together</h3><ul><li>FunCity <small>Near Chandigarh</small></li><li>Sun City <small>Amritsar</small></li><li> <small></small></li></ul></article>
          <article><span>04 / Connectivity</span><h3>Everyday connections</h3><ul><li>Fastway <small>Cable &amp; digital entertainment</small></li><li>Netplus <small>Broadband &amp; connectivity</small></li></ul></article>
          <article><span>05 / Healthcare association</span><h3>Care for families</h3><ul><li>Apollo Cradle <small>Amritsar</small><small>Leadership association · Maternal &amp; childcare</small></li></ul></article>
        </div>
      </div>`);

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
      ["01", "Master & guest bedrooms", "Imported tile flooring, acrylic emulsion or wood panelling, and POP ceilings."],
      ["02", "Additional bedrooms", "Wooden flooring, considered wall finishes and POP ceilings in Bedroom 1 and Bedroom 2."],
      ["03", "Modular kitchens", "Granite or composite counters, kitchen equipment and a treated water provision."],
      ["04", "Master bath & powder room", "Designer tiles, marble or granite counters, sanitary fittings and glass shower enclosures where specified."],
      ["05", "Balconies", "Anti-skid vitrified tiles and textured wall finishes for outdoor spaces."],
      ["06", "Other bathrooms", "Designer tile finishes, marble or granite counters, sanitary fittings and glass shower enclosures."],
      ["07", "Staff accommodation", "Dedicated staff rooms with ceramic tile flooring and oil-bound distemper finishes."],
      ["08", "Doors, windows & wardrobes", "Veneer-finished doors, modular wardrobes and aluminium-framed double glazing."],
      ["09", "Electrical & lighting", "24/7 electricity supply, copper wiring, modular switches, energy-efficient LED lights and exhaust fans."],
      ["10", "Air conditioning", "VRV air conditioning, with Daikin, Mitsubishi or equivalent equipment specified."],
      ["11", "Heat pump", "A heat pump system, with Jaquar or Intersolar equipment specified."],
      ["12", "Television", "Samsung, LG or equivalent television equipment is included in the specifications."],
      ["13", "Handmade paintings", "Handmade paintings and decorative lighting, including artwork on the double-height wall."],
      ["14", "Bespoke interiors", "Fully furnished bespoke interiors with beds and mattresses, sofas, a dining table and chairs, and easy chairs."]
    ].map(([number, title, copy]) => `<article><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join("");
    addSection("in-villa-comforts", amenities, "after", `
      <div class="brochure-wrap">
        <p class="brochure-eyebrow">Beyond the shared spaces</p>
        <div class="brochure-section-heading"><h2>In-villa comforts.</h2><p>From bedroom finishes to furnished interiors, explore the features in the sequence presented in the technical booklet.</p></div>
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
          <article class="nearby-brand-card nearby-brand-dominos">
              <div class="nearby-brand-mark"><img class="nearby-logo-image nearby-logo-dominos" src="./images/brands/dominos.svg" alt="" loading="lazy"></div>
            <span class="nearby-brand-kicker">04 / Dining</span>
            <h3>Domino’s</h3>
            <p>A familiar dining stop nearby</p>
          </article>
        </div>

        <div class="nearby-map-layout">
          <div class="nearby-map-intro">
            <p class="brochure-eyebrow">The estate approach</p>
            <h3>See how it all<br>comes together.</h3>
            <p>The technical booklet's master plan marks Starbucks and Burger King beside the approach road.</p>
            <button type="button" class="location-plan-open">Explore the block plan <span aria-hidden="true">↗</span></button>
          </div>
          <figure class="nearby-map">
            <button type="button" class="location-plan-image-open" aria-label="Enlarge the technical block plan"><img src="./images/site-plan-brochure.webp" alt="Technical booklet master plan showing The Auralius and nearby Starbucks and Burger King" width="1016" height="835" loading="lazy"></button>
            <figcaption>Technical block plan <span>Select to enlarge and explore</span></figcaption>
          </figure>
        </div>
      </div>
      <dialog class="location-plan-dialog" aria-labelledby="location-plan-title">
        <div class="location-plan-toolbar"><h3 id="location-plan-title">The estate block plan</h3><button type="button" data-plan-close aria-label="Close block plan">Close ×</button></div>
        <div class="location-plan-controls"><div><button type="button" data-plan-zoom="out" aria-label="Zoom out">−</button><output aria-live="polite">100%</output><button type="button" data-plan-zoom="in" aria-label="Zoom in">+</button><button type="button" data-plan-zoom="reset">Reset</button></div><a href="./images/site-plan-brochure.webp" download="auralius-estate-block-plan.webp">Download plan ↓</a></div>
        <div class="location-plan-viewport" tabindex="0" aria-label="Block plan. Scroll to explore when zoomed."><img src="./images/site-plan-brochure.webp" width="1016" height="835" alt="The Auralius technical block plan with the estate layout, approach road and nearby landmarks"></div>
        <p class="location-plan-hint">Use + and − to zoom. Scroll or swipe to explore the drawing.</p>
      </dialog>`);
    const section = document.getElementById("nearby-conveniences");
    if (section.dataset.planViewerReady) return;
    section.dataset.planViewerReady = "true";
    const dialog = section.querySelector(".location-plan-dialog");
    const viewport = dialog.querySelector(".location-plan-viewport");
    const image = viewport.querySelector("img");
    const output = dialog.querySelector("output");
    let zoom = 1;
    let opener;
    const updateZoom = (value) => {
      zoom = Math.min(3, Math.max(1, value));
      image.style.width = `${zoom * 100}%`;
      output.value = `${Math.round(zoom * 100)}%`;
      dialog.querySelector('[data-plan-zoom="out"]').disabled = zoom === 1;
      dialog.querySelector('[data-plan-zoom="in"]').disabled = zoom === 3;
      if (zoom === 1) { viewport.scrollTop = 0; viewport.scrollLeft = 0; }
    };
    section.querySelectorAll(".location-plan-open, .location-plan-image-open").forEach((button) => {
      button.addEventListener("click", () => { opener = button; updateZoom(1); dialog.showModal(); });
    });
    dialog.querySelectorAll("[data-plan-zoom]").forEach((button) => {
      button.addEventListener("click", () => updateZoom(button.dataset.planZoom === "reset" ? 1 : zoom + (button.dataset.planZoom === "in" ? .5 : -.5)));
    });
    dialog.querySelector("[data-plan-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => opener?.focus());
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
