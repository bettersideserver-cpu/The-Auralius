/* Unit-specific drawings extracted from the supplied technical booklet. */
(() => {
  const root = document.getElementById("root");
  if (!root) return;

  const unitsByBlock = {
    1: ["A", "B", "C"],
    2: ["A", "B"],
    3: ["A", "B", "C"],
    4: ["A", "B"],
    5: ["A", "B"]
  };
  const floors = [
    ["ground", "Ground Floor"],
    ["first", "First Floor"],
    ["attic", "Attic Floor"]
  ];

  function mount() {
    const oldSection = root.querySelector("main > #floor-plans");
    if (!oldSection || document.getElementById("brochure-floor-plans")) return;

    const section = document.createElement("section");
    section.id = "brochure-floor-plans";
    section.innerHTML = `
      <div class="brochure-wrap">
        <p class="brochure-eyebrow">The residence drawings</p>
        <div class="brochure-section-heading">
          <h2>Every villa.<br>Every level.</h2>
          <p>Browse the floor plans for all 12 private villas, organised by block and unit from the technical booklet.</p>
        </div>

        <div class="brochure-plan-selector">
          <div class="brochure-plan-picker-heading"><span>01 / Choose a block</span><span>Five distinct blocks</span></div>
          <div class="brochure-block-grid" role="group" aria-label="Choose a block">
            ${Object.entries(unitsByBlock).map(([block, units]) => `
              <button type="button" data-block="${block}" aria-pressed="${block === "1"}">
                <span class="brochure-block-number">0${block}</span>
                <strong>Block 0${block}</strong>
                <small>${units.length} private villas <span aria-hidden="true">↗</span></small>
              </button>`).join("")}
          </div>

          <div class="brochure-plan-picker-heading brochure-unit-heading"><span>02 / Choose a unit</span><span class="brochure-available-count">3 units in Block 01</span></div>
          <div class="brochure-unit-grid" role="group" aria-label="Choose a unit">
            ${["A", "B", "C"].map((unit) => `
              <button type="button" data-unit="${unit}" aria-pressed="${unit === "A"}">
                <span class="brochure-unit-letter">${unit}</span>
                <span class="brochure-unit-label"><strong>Unit ${unit}</strong><small>View residence</small></span>
                <span class="brochure-unit-arrow" aria-hidden="true">↗</span>
              </button>`).join("")}
          </div>
        </div>

        <div class="brochure-plan-display">
          <div class="brochure-plan-toolbar">
            <div>
              <p class="brochure-eyebrow">Selected residence</p>
              <h3 class="brochure-plan-selection">Block 01 <span>/ Unit A</span></h3>
            </div>
            <div class="brochure-plan-tabs" role="tablist" aria-label="Floor level">
              ${floors.map(([id, title]) => `<button type="button" role="tab" data-floor="${id}" aria-selected="${id === "ground"}">${title}</button>`).join("")}
            </div>
          </div>
          <div class="brochure-plan-board">
            <button class="brochure-plan-image-button" type="button" aria-label="Enlarge floor plan"><img alt=""></button>
            <div class="brochure-plan-board-footer"><span class="brochure-plan-caption"></span><span>Select drawing to enlarge <span aria-hidden="true">↗</span></span></div>
          </div>
        </div>
      </div>
      <dialog class="brochure-plan-dialog" aria-label="Enlarged floor plan">
        <div><span class="brochure-plan-dialog-title"></span><button type="button">Close</button></div>
        <img alt="">
      </dialog>`;

    oldSection.before(section);
    document.body.classList.add("brochure-plans-ready");
    const collectionsLink = root.querySelector('#pick a[href="#floor-plans"]');
    if (collectionsLink) collectionsLink.href = "#brochure-floor-plans";

    const blockButtons = [...section.querySelectorAll("[data-block]")];
    const unitButtons = [...section.querySelectorAll("[data-unit]")];
    const tabs = [...section.querySelectorAll("[data-floor]")];
    const image = section.querySelector(".brochure-plan-image-button img");
    const caption = section.querySelector(".brochure-plan-caption");
    const selection = section.querySelector(".brochure-plan-selection");
    const availableCount = section.querySelector(".brochure-available-count");
    const imageButton = section.querySelector(".brochure-plan-image-button");
    const dialog = section.querySelector("dialog");
    const dialogImage = dialog.querySelector("img");
    const dialogTitle = dialog.querySelector(".brochure-plan-dialog-title");
    let block = 1;
    let unit = "A";
    let floor = "ground";

    function update() {
      const available = unitsByBlock[block];
      if (!available.includes(unit)) unit = "A";
      const floorTitle = floors.find(([id]) => id === floor)[1];
      const title = `Block 0${block} · Unit ${unit} · ${floorTitle}`;
      const path = `./images/brochure/block-${block}-unit-${unit.toLowerCase()}-${floor}.webp`;

      blockButtons.forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.block) === block)));
      unitButtons.forEach((button) => {
        const isAvailable = available.includes(button.dataset.unit);
        button.disabled = !isAvailable;
        button.setAttribute("aria-pressed", String(isAvailable && button.dataset.unit === unit));
        button.querySelector("small").textContent = isAvailable ? "View residence" : "Not in this block";
      });
      availableCount.textContent = `${available.length} units in Block 0${block}`;
      selection.innerHTML = `Block 0${block} <span>/ Unit ${unit}</span>`;
      image.src = path;
      image.alt = `${title} plan from The Auralius technical booklet`;
      caption.textContent = title;
      imageButton.setAttribute("aria-label", `Enlarge ${title} plan`);
      tabs.forEach((tab) => {
        const active = tab.dataset.floor === floor;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
    }

    blockButtons.forEach((button) => button.addEventListener("click", () => {
      block = Number(button.dataset.block);
      update();
    }));
    unitButtons.forEach((button) => button.addEventListener("click", () => {
      unit = button.dataset.unit;
      update();
    }));
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      floor = tab.dataset.floor;
      update();
    }));
    tabs.forEach((tab, index) => tab.addEventListener("keydown", (event) => {
      const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      floor = next.dataset.floor;
      update();
      next.focus();
    }));
    imageButton.addEventListener("click", () => {
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      dialogTitle.textContent = caption.textContent;
      dialog.showModal();
    });
    dialog.querySelector("button").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    update();
  }

  const observer = new MutationObserver(mount);
  observer.observe(root, { childList: true, subtree: true });
  mount();
})();
