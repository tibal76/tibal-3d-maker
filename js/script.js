const SITE_CONFIG = {
  email: "tibal76@proton.me",
  formEndpoint: "https://formsubmit.co/ajax/tibal76@proton.me",
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
  const formStatus = document.getElementById("form-status");

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
    quoteForm.action = SITE_CONFIG.formEndpoint;
    quoteForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = quoteForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      formStatus.classList.remove("error", "notice");
      formStatus.textContent = "Envoi de votre demande…";

      try {
        const response = await fetch(quoteForm.action, {
          method: "POST",
          body: new FormData(quoteForm),
          headers: { Accept: "application/json" }
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Le service de formulaire a refusé la demande.");
        }

        if (result.success !== "true") {
          if (result.message && result.message.toLowerCase().includes("activation")) {
            formStatus.classList.add("notice");
            formStatus.textContent =
              "FormSubmit attend l’activation de l’adresse de réception. Consultez tibal76@proton.me, y compris les courriers indésirables, puis cliquez sur le lien d’activation.";
            return;
          }

          throw new Error(result.message || "Le service de formulaire a refusé la demande.");
        }

        quoteForm.reset();
        formStatus.textContent = "Votre demande a bien été transmise. Merci, je reviendrai vers vous rapidement.";
      } catch (error) {
        console.error("Échec de l’envoi de la demande de devis.", error);
        formStatus.classList.add("error");
        formStatus.textContent =
          "L’envoi a échoué. Réessayez ou contactez-moi directement par e-mail.";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
