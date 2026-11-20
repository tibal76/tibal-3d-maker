// Centralisez ici vos liens externes pour les mettre à jour en un seul endroit
const SITE_CONFIG = {
  email: "tibal76@proton.me",
  googleReviewsUrl: "https://g.page/r/VOTRE-LIEN-AVIS-GOOGLE",
  socialUrl: "https://github.com/tibal76"
};

document.addEventListener("DOMContentLoaded", () => {
  // Année courante dans le pied de page
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Liens d'avis Google, e-mail et réseaux
  const googleReviewsLink = document.getElementById("google-reviews-link");
  if (googleReviewsLink && SITE_CONFIG.googleReviewsUrl) {
    googleReviewsLink.href = SITE_CONFIG.googleReviewsUrl;
  }

  const emailLink = document.getElementById("contact-email-link");
  if (emailLink && SITE_CONFIG.email) {
    emailLink.href = `mailto:${SITE_CONFIG.email}`;
  }

  const socialLink = document.getElementById("social-link");
  if (socialLink && SITE_CONFIG.socialUrl) {
    socialLink.href = SITE_CONFIG.socialUrl;
  }

  // Filtrage des réalisations
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = selectedFilter === "all" || category === selectedFilter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });
});