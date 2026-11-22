const SITE_CONFIG = {
  email: "tibal76@proton.me",
  instagramUrl: "https://www.instagram.com/tibal.3d.maker/",
  facebookUrl: "https://www.facebook.com/tibal.3d.maker/",
  tiktokUrl: "https://www.tiktok.com/@tibal.3d.maker"
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const backToTop = document.getElementById("back-to-top");
  const yearElement = document.getElementById("year");
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const quoteForm = document.getElementById("quote-form");
  const formStatus = document.getElementById("form-status");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }

    if (backToTop) {
      backToTop.hidden = window.scrollY < 600;
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

      filterButtons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle("active", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });

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

      const formData = new FormData(quoteForm);
      const message = [
        "Bonjour,",
        "",
        "Je vous contacte pour une demande préliminaire de projet.",
        "",
        `Nom : ${formData.get("name")}`,
        `E-mail : ${formData.get("email")}`,
        `Type de projet : ${formData.get("project")}`,
        "",
        "Description du besoin :",
        formData.get("message"),
        "",
        "Photos ou fichiers joints : à ajouter dans votre messagerie."
      ].join("\r\n");
      const subject = "Demande préliminaire de projet — Tibal 3D Maker";
      const mailtoUrl =
        `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(message)}`;

      formStatus.classList.remove("error", "notice");
      formStatus.textContent =
        "Votre application de messagerie va s’ouvrir avec la demande préremplie. Ajoutez vos fichiers avant de l’envoyer.";
      window.location.href = mailtoUrl;
    });
  }
});
