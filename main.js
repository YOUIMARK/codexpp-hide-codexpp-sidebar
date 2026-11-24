codexPlus.extension((ctx) => {
  const styleId = "codex-plus-ext-hide-codexpp-sidebar";
  const selectors = {
    main: ["#codex-plus-sidebar-nav", "#codex-plus-rail-nav"],
    extensions: ["#codex-plus-rail-extensions"],
    recommendations: ["#codex-plus-rail-sponsor"],
    provider: ["#codex-plus-rail-provider"],
    remote: ["#codex-plus-rail-remote"],
    weixin: ["#codex-plus-rail-weixin"],
    tasks: ["#codex-plus-rail-tasks"],
  };

  let style;

  function applyConfig(config) {
    const hiddenSelectors = Object.entries(selectors)
      .filter(([key]) => config?.[key] === true)
      .flatMap(([, ids]) => ids);

    style.textContent = hiddenSelectors.length
      ? `${hiddenSelectors.join(",\n")} { display: none !important; }`
      : "";
  }

  ctx.effect(() => {
    style = document.createElement("style");
    style.id = styleId;
    style.setAttribute("data-codex-plus-ext", "");
    document.head.appendChild(style);
    applyConfig(ctx.config);

    return () => style.remove();
  });

  ctx.onConfigUpdate((next) => {
    applyConfig(next);
    return true;
  });
});
