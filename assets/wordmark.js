/* Only the AURA portion of the hero name rolls on hover. */
(() => {
  window.AuraliusWordmark = function AuraliusWordmark({ React }) {
    const h = React.createElement;
    const root = React.useRef(null);

    React.useLayoutEffect(() => {
      const name = root.current;
      const original = name.querySelector(".wordmark-roll-sizer");
      const replacement = name.querySelector(".wordmark-roll-replacement");
      const fit = () => {
        // Fit the five replacement letters inside the original four-letter
        // slot, keeping THE and LIUS completely stationary on hover.
        if (replacement.offsetWidth) name.style.setProperty(
          "--replacement-scale", String(original.offsetWidth / replacement.offsetWidth)
        );
      };
      const resize = new ResizeObserver(fit);
      resize.observe(original);
      resize.observe(replacement);
      fit();
      return () => resize.disconnect();
    }, []);

    return h("span", {
      ref: root, className: "wordmark hero-wordmark", tabIndex: 0,
      "aria-label": "The Auralius"
    },
      h("span", { className: "wordmark-ink wordmark-fixed", "aria-hidden": true }, "The\u00a0"),
      h("span", { className: "wordmark-roller", "aria-hidden": true },
        h("span", { className: "wordmark-roll-sizer" }, "Aura"),
        h("span", { className: "wordmark-roll-row wordmark-roll-original" },
          h("span", { className: "wordmark-ink" }, "Aura")),
        h("span", { className: "wordmark-roll-row wordmark-roll-incoming" },
          h("span", { className: "wordmark-ink wordmark-roll-replacement" }, "Kasau"))
      ),
      h("span", { className: "wordmark-ink wordmark-fixed", "aria-hidden": true }, "lius")
    );
  };
})();
