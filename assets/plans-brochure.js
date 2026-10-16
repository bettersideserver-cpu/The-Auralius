/* High-resolution block drawings from the supplied Auralius floormaps folder.
   Each drawing applies to the units named together on its source page. */
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
          <p>Explore ground, first and attic floor drawings for all five blocks. Open any drawing to zoom into room labels, dimensions and architectural details.</p>
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
            <div class="brochure-plan-board-footer"><span class="brochure-plan-caption"></span><span>Select drawing to zoom <span aria-hidden="true">↗</span></span></div>
          </div>
          <div class="brochure-plan-detail-row"><p class="brochure-plan-applicability"></p><a class="brochure-plan-download" download>Download full-resolution drawing ↓</a></div>
        </div>
      </div>
      <dialog class="brochure-plan-dialog" aria-labelledby="floor-drawing-title">
        <div class="floor-viewer-heading"><span id="floor-drawing-title" class="brochure-plan-dialog-title"></span><button type="button" data-viewer-close>Close ×</button></div>
        <div class="floor-viewer-toolbar">
          <div class="floor-viewer-zoom"><button type="button" data-zoom="out" aria-label="Zoom out">−</button><output aria-live="polite">100%</output><button type="button" data-zoom="in" aria-label="Zoom in">+</button><button type="button" data-zoom="fit">Fit</button><button type="button" data-zoom="original">Original size</button></div>
          <a class="floor-viewer-download" download>Download drawing ↓</a>
        </div>
        <div class="floor-viewer-viewport" tabindex="0" aria-label="Floor drawing. Use zoom controls and scroll to explore."><div class="floor-viewer-canvas"><img alt="" draggable="false"></div></div>
        <p class="floor-viewer-help" role="status">Use + and − to zoom. Drag, scroll or swipe to explore. Press Escape to close.</p>
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
    const applicability = section.querySelector(".brochure-plan-applicability");
    const download = section.querySelector(".brochure-plan-download");
    const dialogDownload = dialog.querySelector(".floor-viewer-download");
    const viewport = dialog.querySelector(".floor-viewer-viewport");
    const zoomOutput = dialog.querySelector("output");
    const zoomButtons = [...dialog.querySelectorAll("[data-zoom]")];
    const help = dialog.querySelector(".floor-viewer-help");
    const viewerHint = "Use + and − to zoom. Drag, scroll or swipe to explore. Press Escape to close.";
    let fullPath;
    let fitWidth = 1;
    let zoom = 1;
    let ready = false;
    let dragging;
    let block = 1;
    let unit = "A";
    let floor = "ground";

    function update() {
      const available = unitsByBlock[block];
      if (!available.includes(unit)) unit = "A";
      const floorTitle = floors.find(([id]) => id === floor)[1];
      const title = `Block 0${block} · Unit ${unit} · ${floorTitle}`;
      const path = `./images/floormaps/block-${block}-${floor}-preview.webp`;
      fullPath = `./images/floormaps/block-${block}-${floor}.webp`;

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
      image.alt = `Block ${block} · ${floorTitle} architectural drawing, shared by units ${available.join(", ")}`;
      caption.textContent = title;
      applicability.textContent = `This block drawing applies to Units ${available.join(", ")} in Block 0${block}.`;
      download.href = fullPath;
      download.download = `auralius-block-${block}-${floor}.webp`;
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
      ready = false;
      zoomButtons.forEach((button) => { button.disabled = true; });
      help.textContent = "Loading the full-resolution drawing…";
      dialogImage.style.visibility = "hidden";
      dialogImage.src = fullPath;
      dialogImage.alt = image.alt;
      dialogTitle.textContent = caption.textContent;
      dialogDownload.href = fullPath;
      dialogDownload.download = download.download;
      dialog.showModal();
      if (dialogImage.complete && dialogImage.naturalWidth) fitDrawing();
    });
    function setZoom(value, reset = false) {
      if (!ready) return;
      const previous = zoom;
      const limit = Math.max(8, dialogImage.naturalWidth / fitWidth);
      zoom = Math.min(limit, Math.max(1, value));
      dialogImage.style.width = `${Math.round(fitWidth * zoom)}px`;
      zoomOutput.value = `${Math.round(zoom * 100)}%`;
      zoomButtons.forEach((button) => { button.disabled = (button.dataset.zoom === "out" && zoom === 1) || (button.dataset.zoom === "in" && zoom === limit); });
      if (reset) { viewport.scrollLeft = 0; viewport.scrollTop = 0; }
      else {
        viewport.scrollLeft = (viewport.scrollLeft + viewport.clientWidth / 2) * zoom / previous - viewport.clientWidth / 2;
        viewport.scrollTop = (viewport.scrollTop + viewport.clientHeight / 2) * zoom / previous - viewport.clientHeight / 2;
      }
    }
    function fitDrawing() {
      if (!dialog.open || !dialogImage.naturalWidth) return;
      fitWidth = Math.min(dialogImage.naturalWidth, viewport.clientWidth - 32, (viewport.clientHeight - 32) * dialogImage.naturalWidth / dialogImage.naturalHeight);
      fitWidth = Math.max(1, fitWidth);
      ready = true;
      dialogImage.style.visibility = "visible";
      help.textContent = viewerHint;
      setZoom(1, true);
    }
    dialogImage.addEventListener("load", fitDrawing);
    dialogImage.addEventListener("error", () => { help.textContent = "The drawing could not load. Close the viewer and try again."; });
    zoomButtons.forEach((button) => button.addEventListener("click", () => {
      const action = button.dataset.zoom;
      if (action === "fit") fitDrawing();
      else setZoom(action === "original" ? dialogImage.naturalWidth / fitWidth : zoom * (action === "in" ? 1.5 : 1 / 1.5));
    }));
    dialog.addEventListener("keydown", (event) => {
      if (["+", "=", "-", "0"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "0") fitDrawing();
        else setZoom(zoom * (event.key === "-" ? 1 / 1.5 : 1.5));
      }
    });
    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !ready) return;
      dragging = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("is-dragging");
    });
    viewport.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      viewport.scrollLeft = dragging.left + dragging.x - event.clientX;
      viewport.scrollTop = dragging.top + dragging.y - event.clientY;
    });
    const stopDrag = () => { dragging = null; viewport.classList.remove("is-dragging"); };
    viewport.addEventListener("pointerup", stopDrag);
    viewport.addEventListener("pointercancel", stopDrag);
    viewport.addEventListener("lostpointercapture", stopDrag);
    window.addEventListener("resize", () => { if (dialog.open) fitDrawing(); });
    dialog.querySelector("[data-viewer-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => { stopDrag(); imageButton.focus(); });
    update();
  }

  const observer = new MutationObserver(mount);
  observer.observe(root, { childList: true, subtree: true });
  mount();
})();
