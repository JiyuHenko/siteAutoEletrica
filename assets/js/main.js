(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 12
      ? "0 12px 34px rgba(4,26,49,.08)"
      : "none";
  };
  updateHeader();
  addEventListener("scroll", updateHeader, { passive: true });

  // Selective motion: only structural moments, not every section/card.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSelectors = [
    ".section-head",
    ".story-panel",
    ".contact-card",
    ".map-frame",
    ".article-card",
    ".sidebar-card",
    ".faq",
    ".related-grid"
  ];

  const revealElements = [...document.querySelectorAll(revealSelectors.join(","))];

  revealElements.forEach((el, index) => {
    el.dataset.reveal = "";
    el.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 45}ms`);
  });

  if (!reduceMotion && "IntersectionObserver" in window && revealElements.length) {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    requestAnimationFrame(() => revealElements.forEach(el => observer.observe(el)));
  } else {
    revealElements.forEach(el => el.classList.add("is-visible"));
  }
})();
