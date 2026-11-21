const SITE_CONFIG = {
  email: "tibal76@proton.me",
  tiktokUrl: "https://www.tiktok.com/@tibal.3d.maker"
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const yearElement = document.getElementById("year");
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const quoteForm = document.getElementById("quote-form");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.querySelector(".sr-only").textContent = isOpen
        ? "Fermer le menu"
        : "Ouvrir le menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector(".sr-only").textContent = "Ouvrir le menu";
      });
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const shouldShow =
          selectedFilter === "all" || card.dataset.category === selectedFilter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) {
        return;
      }

      const formData = new FormData(quoteForm);
      const name = formData.get("name").toString().trim();
      const email = formData.get("email").toString().trim();
      const project = formData.get("project").toString().trim();
      const message = formData.get("message").toString().trim();

      const subject = encodeURIComponent(`Demande de projet — ${project}`);
      const body = encodeURIComponent(
        `Nom / entreprise : ${name}\nE-mail : ${email}\n\nType de projet : ${project}\n\nBesoin :\n${message}`
      );

      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }
});
