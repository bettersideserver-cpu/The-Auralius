/* A scroll-led architectural reveal. No build step is required. */
(() => {
  const places = [
    {
      image: "images/ext-pool.webp", title: "The Water Court", lines: ["The Water", "Court"],
      note: "South terrace", short: "Water Court", mood: "A moment to unwind.",
      copy: "Heated pool, sun deck and cabana terrace, held inside the hillside garden.",
      position: "50% 58%"
    },
    {
      image: "images/ext-clubhouse.webp", title: "The Clubhouse", lines: ["The", "Clubhouse"],
      note: "Ridge shoulder", short: "Clubhouse", mood: "An invitation to linger.",
      copy: "A stone-and-timber pavilion for long lunches, quiet evenings and arriving guests.",
      position: "50% 50%"
    },
    {
      image: "images/ext-pathway.webp", title: "The Deodar Walk", lines: ["The Deodar", "Walk"],
      note: "East slope", short: "Deodar Walk", mood: "Take the quieter way.",
      copy: "A lantern-lit path threading the terraces, under trees older than the estate.",
      position: "50% 50%"
    }
  ];
  const stops = [0, 0.46, 0.96];
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => { const x = clamp(value); return x * x * (3 - 2 * x); };

  window.AuraliusExteriors = function AuraliusExteriors({ React }) {
    const h = React.createElement;
    const section = React.useRef(null);
    const refresh = React.useRef(() => {});

    React.useEffect(() => {
      const root = section.current;
      const stage = root.querySelector(".exteriors-stage");
      const scenes = Array.from(root.querySelectorAll(".exteriors-picture"));
      const panels = scenes.map(scene => Array.from(scene.querySelectorAll(".exteriors-panel")));
      const captions = Array.from(root.querySelectorAll(".exteriors-caption"));
      const buttons = Array.from(root.querySelectorAll(".exteriors-chapter"));
      const counter = root.querySelector(".exteriors-count-current");
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame = 0;
      let active = -1;
      let width = 0;

      function paint() {
        frame = 0;
        const box = root.getBoundingClientRect();
        const height = stage.offsetHeight;
        const p = clamp(-box.top / Math.max(1, box.height - height));
        root.dataset.pinned = String(box.top <= 1 && box.bottom >= height - 1);
        const raw = [1, clamp((p - 0.025) / 0.415), clamp((p - 0.50) / 0.42)];
        // Keep the outgoing photograph intact until the incoming asset is ready.
        const reveals = raw.map((value, index) => {
          const img = scenes[index].querySelector("img");
          return img.complete && img.naturalWidth ? value : 0;
        });
        const text = reveals.map((value, index) => index ? ease((value - 0.32) / 0.46) : 1);
        const outgoing = value => 1 - ease((value - 0.12) / 0.34);
        const incoming = value => ease((value - 0.48) / 0.36);
        // Separate the captions during the wipe so two large titles never overlap.
        const weights = [outgoing(reveals[1]), incoming(reveals[1]) * outgoing(reveals[2]), incoming(reveals[2])];
        const next = text[2] >= 0.5 ? 2 : text[1] >= 0.5 ? 1 : 0;

        scenes.forEach((scene, index) => {
          const reveal = reveals[index];
          scene.style.visibility = index === 0 || reveal > 0 ? "visible" : "hidden";
          scene.style.opacity = motion.matches && index ? ease(reveal).toFixed(4) : "1";
          panels[index].forEach((panel, column) => {
            // The outer panels lead; the centre closes last, like architectural shutters.
            const delay = [0, 0.12, 0.23, 0.12, 0][column];
            const amount = motion.matches ? 1 : ease((reveal - delay) / (1 - delay));
            const hidden = ((1 - amount) * 100).toFixed(3);
            panel.style.clipPath = column % 2
              ? `inset(${hidden}% 0 0 0)`
              : `inset(0 0 ${hidden}% 0)`;
          });
        });

        captions.forEach((caption, index) => {
          const weight = weights[index];
          caption.style.opacity = weight.toFixed(4);
          caption.style.visibility = weight > 0.001 ? "visible" : "hidden";
          caption.style.transform = motion.matches ? "none" : `translateY(${((1 - weight) * 22).toFixed(2)}px)`;
          caption.setAttribute("aria-hidden", String(index !== next));
        });
        buttons.forEach((button, index) => {
          const fill = index === 0 ? 1 - raw[1] : index === 1 ? raw[1] * (1 - raw[2]) : raw[2];
          button.style.setProperty("--chapter-fill", fill.toFixed(4));
        });
        if (next !== active) {
          active = next;
          root.dataset.chapter = String(next + 1);
          counter.textContent = String(next + 1).padStart(2, "0");
          buttons.forEach((button, index) => {
            button.setAttribute("aria-current", index === next ? "true" : "false");
          });
        }
      }
      function schedule() {
        if (!frame) frame = requestAnimationFrame(paint);
      }
      function resize() {
        const nextWidth = stage.clientWidth;
        if (nextWidth !== width) {
          width = nextWidth;
          stage.style.setProperty("--exteriors-width", `${width}px`);
        }
        schedule();
      }
      refresh.current = schedule;
      const observer = new ResizeObserver(resize);
      observer.observe(stage);
      observer.observe(document.body);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", resize);
      motion.addEventListener("change", schedule);
      resize();
      paint();
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", resize);
        motion.removeEventListener("change", schedule);
        refresh.current = () => {};
      };
    }, []);

    function visit(index) {
      const root = section.current;
      const distance = root.offsetHeight - root.querySelector(".exteriors-stage").offsetHeight;
      window.scrollTo({
        top: window.scrollY + root.getBoundingClientRect().top + distance * stops[index],
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
      });
    }

    return h("section", { id: "exteriors", ref: section, className: "exteriors-showcase", "aria-labelledby": "exteriors-heading" },
      h("div", { className: "exteriors-stage" },
        h("div", { className: "exteriors-photographs", "aria-hidden": true },
          places.map((place, index) => h("div", {
            key: place.image, className: "exteriors-picture",
            style: { visibility: index ? "hidden" : "visible", "--photo-position": place.position }
          }, Array.from({ length: 5 }, (_, column) => h("div", {
            key: column, className: "exteriors-panel", style: { "--column": column }
          }, h("img", {
            src: place.image, alt: "", decoding: "async", draggable: false,
            onLoad: () => refresh.current()
          })))))
        ),
        h("div", { className: "exteriors-shade", "aria-hidden": true }),
        h("header", { className: "exteriors-masthead" },
          h("h2", { id: "exteriors-heading" }, h("span", { className: "exteriors-marker", "aria-hidden": true }), "The Exteriors"),
          h("p", null, "Three arrivals", h("span", { "aria-hidden": true }, " / "), "One hillside")
        ),
        h("div", { className: "exteriors-edition", "aria-hidden": true },
          h("span", { className: "exteriors-count-current" }, "01"),
          h("span", { className: "exteriors-count-total" }, "/ 03")
        ),
        h("div", { className: "exteriors-captions" }, places.map((place, index) => h("article", {
          key: place.title, className: "exteriors-caption", "aria-hidden": index !== 0,
          style: { opacity: index ? 0 : 1, visibility: index ? "hidden" : "visible" }
        },
          h("div", { className: "exteriors-heading-group" },
            h("p", { className: "exteriors-location" }, h("span", null, String(index + 1).padStart(2, "0")), place.note),
            h("h3", null, place.lines.map((line, lineIndex) => h("span", { key: line, className: lineIndex ? "exteriors-title-last" : undefined }, line)))
          ),
          h("div", { className: "exteriors-description" },
            h("p", { className: "exteriors-mood" }, place.mood),
            h("p", { className: "exteriors-body" }, place.copy)
          )
        ))),
        h("footer", { className: "exteriors-footer" },
          h("nav", { className: "exteriors-chapters", "aria-label": "Explore the exteriors" }, places.map((place, index) => h("button", {
            type: "button", key: place.title, className: "exteriors-chapter", onClick: () => visit(index),
            "aria-label": `View ${place.title}`, "aria-current": index === 0 ? "true" : "false"
          }, h("span", { className: "exteriors-chapter-number" }, String(index + 1).padStart(2, "0")),
          h("span", null, place.short), h("span", { className: "exteriors-chapter-arrow", "aria-hidden": true }, "↗")))),
          h("span", { className: "exteriors-scroll-cue", "aria-hidden": true }, "Scroll to explore", h("span", null, "↓"))
        )
      )
    );
  };
})();
