/* Scroll through one aligned landscape: clouds > evening > lights > night.
   Kept separate from the exported site bundle so timings stay editable. */
(function () {
  "use strict";

  const smooth = (value, start, end) => {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };

  // The "road" layer is a short, seam-blended video (light trails on the
  // night road) that native-loops forever once the scene reaches full
  // night. It only ever plays/pauses/rewinds — the browser handles the
  // actual looping, so there is no frame bookkeeping to do here.
  function roadPlayer(video) {
    let active = false;
    let warmed = false;
    return {
      warm() {
        if (warmed) return;
        warmed = true;
        video.load();
      },
      setActive(shouldPlay, reset = false) {
        if (reset) {
          if (active || video.currentTime > 0) {
            video.pause();
            try { video.currentTime = 0; } catch (_) { /* not seekable yet */ }
          }
          active = false;
          return;
        }
        if (shouldPlay && !active) {
          active = true;
          const attempt = video.play();
          if (attempt && attempt.catch) attempt.catch(() => {});
        } else if (!shouldPlay && active) {
          active = false;
          video.pause();
        }
      },
      destroy() {
        active = false;
        video.pause();
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
        // Clouds move and fade immediately, revealing the first evening still.
        // Continuing the scroll brings in the lit evening while cloud banks
        // are still present. Night follows directly, without an extra hold.
        const clear = ready(evening) ? Math.min(1, progress / 0.48) : 0;
        const dusk = ready(lights) ? smooth(progress, 0.08, 0.16) : 0;
        const dark = ready(night) ? smooth(progress, 0.16, 0.60) : 0;

        root.dataset.progress = progress.toFixed(4);
        root.dataset.phase = progress < 0.48 ? "clouds" : progress < 0.60 ? "dusk" : "night";
        opacity(lights, dusk);
        opacity(night, dark);
        // Let the textured cloud banks reveal the landscape. The flat white
        // veil clears first, and the hero bridge dissolves with the clouds.
        opacity(veil, 1 - Math.min(1, clear / 0.38));
        opacity(entry, 1 - Math.min(1, clear / 0.85));
        opacity(cloudTop, 1 - clear);
        opacity(cloudBottom, 1 - clear);
        cloudTop.style.transform = reduced ? "none"
          : `translate3d(${-7 * clear}%,${-58 * clear}%,0) scale(${1 + 0.16 * clear})`;
        cloudBottom.style.transform = reduced ? "none"
          : `translate3d(${6 * clear}%,${52 * clear}%,0) scale(${1 + 0.18 * clear})`;
        // All landscape layers share the same camera and 16:9 composition.
        stage.style.transform = `translate(-50%,-50%) scale(${reduced ? 1 : 1.035 - 0.035 * smooth(progress, 0, 0.60)})`;
        opacity(snow, reduced ? 0 : smooth(dark, 0.45, 1));
        snow.style.setProperty("--snow-play-state", visible && !document.hidden && dark > 0.45 ? "running" : "paused");
        // Once night is fully in, the still frame hands off to the looping
        // road video. Scrolling back out (progress < 0.60) rewinds it to
        // frame zero, so scrolling forward into night always restarts the
        // same loop from its beginning — mirroring how the still images
        // themselves reset when you scroll back above them.
        opacity(road, dark >= 1 ? smooth(progress, 0.60, 0.66) : 0);
        if (visible && progress >= 0.16 && !reduced) player.warm();
        player.setActive(visible && !document.hidden && !reduced && dark >= 1, progress < 0.60 || reduced);

        const copy = smooth(progress, 0.66, 0.82);
        opacity(shade, copy);
        opacity(title, copy);
        title.style.transform = reduced ? "none" : `translateY(${24 * (1 - copy)}px)`;
        opacity(approach, smooth(progress, 0.82, 0.96));
        opacity(exit, smooth(progress, 0.88, 1));
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
          h("video", {
            key: "road", "data-layer": "road", className: "estate-road",
            muted: true, loop: true, playsInline: true, preload: "auto",
            "aria-hidden": true
          },
            h("source", { src: "road-night-loop.webm", type: "video/webm" }),
            h("source", { src: "road-night-loop.mp4", type: "video/mp4" }))
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