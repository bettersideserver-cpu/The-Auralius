/* Scroll through one aligned landscape: clouds > evening > lights > night.
   Kept separate from the exported site bundle so timings stay editable. */
(function () {
  "use strict";

  const FRAME_COUNT = 241;
  const FRAME_RATE = 24;
  const FRAME_BUFFER = 12;
  const smooth = (value, start, end) => {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };

  function roadPlayer(canvas) {
    const context = canvas.getContext("2d");
    const frames = new Map();
    let disposed = false;
    let running = false;
    let raf = 0;
    let lastTime = 0;
    let elapsed = 0;
    let drawn = -1;

    function release(frame) {
      if (frame.image && frame.image.close) frame.image.close();
    }

    function buffer(index) {
      if (!context || disposed) return;
      const wanted = new Set();
      for (let offset = 0; offset < FRAME_BUFFER; offset++) {
        wanted.add((index + offset) % FRAME_COUNT);
      }
      for (const [key, frame] of frames) {
        if (!wanted.has(key)) {
          release(frame);
          frames.delete(key);
        }
      }
      for (const key of wanted) {
        if (frames.has(key)) continue;
        const frame = { image: null };
        frames.set(key, frame);
        const image = new Image();
        image.decoding = "async";
        image.onload = async () => {
          let decoded = image;
          // A small rolling buffer avoids retaining 241 full HD decoded images.
          if (window.createImageBitmap) {
            try {
              decoded = await createImageBitmap(image, {
                resizeWidth: 1280, resizeHeight: 720, resizeQuality: "high"
              });
            } catch (_) { /* Local-file browsers can use the Image directly. */ }
          }
          if (disposed || frames.get(key) !== frame) {
            if (decoded.close) decoded.close();
            return;
          }
          frame.image = decoded;
        };
        image.onerror = () => { frame.failed = true; };
        image.src = `road/Comp%201_${String(key).padStart(5, "0")}.png`;
      }
    }

    function tick(time) {
      if (!running || disposed) return;
      if (lastTime) elapsed += Math.min(time - lastTime, 100);
      lastTime = time;
      const index = Math.floor(elapsed * FRAME_RATE / 1000) % FRAME_COUNT;
      if (index !== drawn) {
        buffer(index);
        const frame = frames.get(index);
        if (frame && frame.image) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(frame.image, 0, 0, canvas.width, canvas.height);
          canvas.dataset.frame = String(index);
          drawn = index;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    return {
      warm() { if (!frames.size) buffer(0); },
      setActive(active, reset = false) {
        if (active && context && !running) {
          running = true;
          lastTime = 0;
          buffer(Math.floor(elapsed * FRAME_RATE / 1000) % FRAME_COUNT);
          raf = requestAnimationFrame(tick);
        } else if (!active && running) {
          running = false;
          cancelAnimationFrame(raf);
          lastTime = 0;
        }
        canvas.dataset.playing = String(running);
        if (reset && (elapsed || drawn !== -1)) {
          elapsed = 0;
          drawn = -1;
          if (context) context.clearRect(0, 0, canvas.width, canvas.height);
          canvas.dataset.frame = "0";
          for (const frame of frames.values()) release(frame);
          frames.clear();
        }
      },
      destroy() {
        disposed = true;
        running = false;
        cancelAnimationFrame(raf);
        for (const frame of frames.values()) release(frame);
        frames.clear();
      }
    };
  }

  window.AuraliusEstate = function AuraliusEstate({ React }) {
    const h = React.createElement;
    const rootRef = React.useRef(null);

    React.useEffect(() => {
      const root = rootRef.current;
      const find = (name) => root.querySelector(`[data-layer="${name}"]`);
      const stage = find("stage");
      const evening = find("evening");
      const lights = find("lights");
      const night = find("night");
      const cloudTop = find("cloud-top");
      const cloudBottom = find("cloud-bottom");
      const veil = find("veil");
      const entry = find("entry");
      const snow = find("snow");
      const road = find("road");
      const shade = find("shade");
      const title = find("title");
      const approach = find("approach");
      const exit = find("exit");
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const player = roadPlayer(road);
      let pending = 0;

      const opacity = (element, value) => {
        element.style.opacity = value.toFixed(4);
        element.style.visibility = value <= 0.001 ? "hidden" : "visible";
      };
      const ready = (image) => image.complete && image.naturalWidth > 0;

      function update() {
        pending = 0;
        const rect = root.getBoundingClientRect();
        const viewHeight = root.firstElementChild.clientHeight;
        const distance = Math.max(1, root.offsetHeight - viewHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / distance));
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        const reduced = motion.matches;
        const clear = ready(evening) ? smooth(progress, 0.015, 0.24) : 0;
        // Start bringing the villa lights in while the remaining clouds clear.
        const dusk = ready(lights) ? smooth(progress, 0.12, 0.30) : 0;
        const dark = ready(night) ? smooth(progress, 0.57, 0.79) : 0;

        root.dataset.progress = progress.toFixed(4);
        root.dataset.phase = progress < 0.12 ? "clouds" : progress < 0.30
          ? "evening" : progress < 0.79 ? "dusk" : "night";
        opacity(lights, dusk);
        opacity(night, dark);
        // Let the textured cloud banks reveal the landscape. The flat white
        // veil clears first, and the hero bridge dissolves with the clouds.
        opacity(veil, 1 - smooth(clear, 0, 0.38));
        opacity(entry, 1 - smooth(clear, 0, 0.85));
        opacity(cloudTop, 1 - smooth(clear, 0.12, 0.94));
        opacity(cloudBottom, 1 - smooth(clear, 0.22, 1));
        cloudTop.style.transform = reduced ? "none"
          : `translate3d(${-7 * clear}%,${-58 * clear}%,0) scale(${1 + 0.16 * clear})`;
        cloudBottom.style.transform = reduced ? "none"
          : `translate3d(${6 * clear}%,${52 * clear}%,0) scale(${1 + 0.18 * clear})`;
        // All landscape layers share the same camera and 16:9 composition.
        stage.style.transform = `translate(-50%,-50%) scale(${reduced ? 1 : 1.035 - 0.035 * smooth(progress, 0, 0.79)})`;
        opacity(snow, reduced ? 0 : smooth(dark, 0.45, 1));
        snow.style.setProperty("--snow-play-state", visible && !document.hidden && dark > 0.45 ? "running" : "paused");
        opacity(road, dark >= 1 ? smooth(progress, 0.79, 0.82) : 0);
        if (visible && progress >= 0.5 && !reduced) player.warm();
        player.setActive(visible && !document.hidden && !reduced && dark >= 1, progress < 0.79 || reduced);

        const copy = smooth(progress, 0.82, 0.90);
        opacity(shade, copy);
        opacity(title, copy);
        title.style.transform = reduced ? "none" : `translateY(${24 * (1 - copy)}px)`;
        opacity(approach, smooth(progress, 0.9, 0.97));
        opacity(exit, smooth(progress, 0.94, 1));
      }

      function schedule() {
        if (!pending) pending = requestAnimationFrame(update);
      }
      const images = [evening, lights, night];
      images.forEach(image => image.addEventListener("load", schedule));
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      document.addEventListener("visibilitychange", schedule);
      motion.addEventListener("change", schedule);
      const resize = new ResizeObserver(schedule);
      resize.observe(root);
      update();
      return () => {
        cancelAnimationFrame(pending);
        player.destroy();
        resize.disconnect();
        images.forEach(image => image.removeEventListener("load", schedule));
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("visibilitychange", schedule);
        motion.removeEventListener("change", schedule);
      };
    }, []);

    const layer = (name, className, children, props = {}) => h("div", {
      "data-layer": name, className, "aria-hidden": true, ...props
    }, children);
    const still = (name, src) => h("img", {
      "data-layer": name, className: `estate-still estate-${name}`,
      src, alt: "", "aria-hidden": true, decoding: "async", draggable: false
    });

    return h("section", { id: "estate", ref: rootRef, className: "estate-scene", "aria-label": "The Auralius hillside, from evening to night" },
      h("div", { className: "estate-sticky" },
        layer("stage", "estate-stage", [
          h(React.Fragment, { key: "stills" },
            still("evening", "evening.webp"),
            still("lights", "Evening-1.webp"),
            still("night", "night.webp")),
          h("canvas", { key: "road", "data-layer": "road", className: "estate-road", width: 1920, height: 1080, "aria-hidden": true })
        ]),
        layer("cloud-top", "estate-cloud estate-cloud-top cloud-bank-top", h("img", { src: "images/cloud-1.webp", alt: "" })),
        layer("cloud-bottom", "estate-cloud estate-cloud-bottom cloud-bank-bottom", h("img", { src: "images/cloud-2.webp", alt: "" })),
        layer("veil", "estate-veil"),
        layer("shade", "estate-shade"),
        layer("exit", "estate-exit"),
        layer("snow", "estate-snow", ["far", "mid", "near"].map(depth => h("div", { key: depth, className: `snow-field snow-field-${depth}` }))),
        h("div", { "data-layer": "title", className: "estate-title gutter text-paper" },
          h("p", { className: "label opacity-70" }, "The Location"),
          h("h2", { className: "display" }, "One hillside, every hour"),
          h("div", { className: "estate-stats" },
            h("span", { className: "stat-plate" }, "NH-5 · 2 min"),
            h("span", { className: "stat-plate" }, "Chandigarh · 65 km"))),
        h("div", { "data-layer": "approach", className: "estate-approach gutter text-paper" },
          h("p", { className: "label opacity-70" }, "The Approach"),
          h("p", { className: "body-copy" }, "Minutes from the mountain highway — NH-5 is two minutes below the gate, and the ridge takes over from there. Chandigarh in an hour, Shimla up the road, Delhi a single unhurried morning."))
      ),
      h("div", { "data-layer": "entry", className: "estate-entry", "aria-hidden": true },
        h("img", { className: "estate-entry-mist", src: "images/cloud-gradient.webp", alt: "" }),
        h("img", { className: "estate-entry-cloud", src: "images/cloud-2.webp", alt: "" }))
    );
  };
})();
