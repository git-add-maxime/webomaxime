// /lang/lang-switcher.js
(function () {
  const DEFAULT = "fr";

  function detect() {
    const stored = localStorage.getItem("lang");
    if (stored) return stored;
    const html = document.documentElement.getAttribute("lang");
    if (html) return html;
    const nav = (navigator.language || "fr").slice(0,2).toLowerCase();
    return (nav === "fr" || nav === "en") ? nav : DEFAULT;
  }

  let current = detect();

  function apply() {
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[current]) || {};
    document.documentElement.setAttribute("lang", current);

    // Titre (facultatif via data-i18n-title sur <body>)
    const titleKey = document.body.getAttribute("data-i18n-title");
    if (titleKey && dict[titleKey]) document.title = dict[titleKey];

    // Remplacement du texte
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    // État des boutons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === current);
    });
  }

  window.setLang = function (lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    current = lang;
    localStorage.setItem("lang", lang);
    apply();
  };

  document.addEventListener("click", e => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (lang) window.setLang(lang);
  });

  apply();
})();
