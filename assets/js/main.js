(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 12 ? "0 10px 30px rgba(4,26,49,.08)" : "none";
  };
  updateHeader();
  addEventListener("scroll", updateHeader, { passive: true });
})();