(() => {
    // Attendre que le DOM soit prêt si le script n'est pas chargé en "defer"
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  
    function init() {
      const header = document.querySelector("header");
      const nav = document.querySelector("header nav");
      const menuPanel = nav?.querySelector("ul");
      const toggleBtn =
        document.querySelector('label[for="menu"]') ||
        document.getElementById("menu-toggle"); // fallback
      const checkbox = document.getElementById("menu"); // si tu utilises l’input checkbox
  
      // --- Helpers menu
      const isOpen = () => nav?.dataset.open === "true";
  
      const openMenu = () => {
        if (!nav || !menuPanel) return;
        nav.dataset.open = "true";
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
        // styles minimalistes pour garantir l’ouverture même si le CSS varie
        menuPanel.style.display = "flex";
        menuPanel.style.flexDirection = "column";
      };
  
      const closeMenu = () => {
        if (!nav || !menuPanel) return;
        nav.dataset.open = "false";
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        menuPanel.style.display = ""; // reset
        menuPanel.style.flexDirection = "";
        if (checkbox) checkbox.checked = false; // si « checkbox hack »
      };
  
      const toggleMenu = (e) => {
        if (e) e.preventDefault();
        isOpen() ? closeMenu() : openMenu();
      };
  
      // --- Liaisons événements
      if (toggleBtn) {
        toggleBtn.setAttribute("role", "button");
        toggleBtn.setAttribute("aria-controls", "nav-list");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.addEventListener("click", toggleMenu);
        toggleBtn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
          }
        });
      }
      if (menuPanel && !menuPanel.id) menuPanel.id = "nav-list";
  
      // Fermer sur clic extérieur
      document.addEventListener("click", (e) => {
        if (!isOpen()) return;
        const within =
          (nav && nav.contains(e.target)) ||
          (toggleBtn && toggleBtn.contains(e.target));
        if (!within) closeMenu();
      });
  
      // Fermer sur Échap
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) closeMenu();
      });
  
      // --- Smooth scroll avec offset du header sticky
      function smoothScrollTo(selector) {
        const target = document.querySelector(selector);
        if (!target) return;
        const headerH = header ? header.offsetHeight : 0;
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerH -
          8; // petite marge
        window.scrollTo({ top: y, behavior: "smooth" });
        // Optionnel: mettre à jour l’URL
        try {
          history.pushState(null, "", selector);
        } catch (_) {
          /* noop */
        }
      }
  
      // Liens de la navbar
      const navLinks = document.querySelectorAll('header nav a[href^="#"]');
      navLinks.forEach((a) => {
        a.addEventListener(
          "click",
          (e) => {
            const hash = a.getAttribute("href");
            if (!hash || hash === "#") return;
            e.preventDefault();
            smoothScrollTo(hash);
            closeMenu();
          },
          { passive: false }
        );
      });
  
      // Bonus : activer le smooth scroll pour TOUT lien ancre de la page
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener(
          "click",
          (e) => {
            const href = a.getAttribute("href");
            const target = href && href !== "#" ? document.querySelector(href) : null;
            if (!target) return; // laisser le comportement par défaut s'il n'y a pas de cible
            e.preventDefault();
            smoothScrollTo(href);
          },
          { passive: false }
        );
      });
    }
  })();
  