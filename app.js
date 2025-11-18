// Mise à jour de l'année dans le footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// // Gestion des groupes d'étoiles (1 à gauche, 5 à droite)
document.querySelectorAll(".stars").forEach((starsGroup) => {
  const labels = Array.from(starsGroup.querySelectorAll("label"));
  const inputName = starsGroup.querySelector("input")?.name;
  const errorEl = inputName
    ? document.querySelector(`.error-inline[data-error-for="${inputName}"]`)
    : null;

  // Clic : sélection définitive
  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const clickedValue = Number(label.dataset.value);
      labels.forEach((l) => {
        l.classList.toggle("selected", Number(l.dataset.value) <= clickedValue);
      });
      if (errorEl) {
        errorEl.classList.remove("visible");
      }
    });
  });

  // Survol : prévisualisation
  labels.forEach((label) => {
    label.addEventListener("mouseenter", () => {
      const hoverValue = Number(label.dataset.value);
      labels.forEach((l) => {
        l.classList.toggle("hovered", Number(l.dataset.value) <= hoverValue);
      });
    });
  });

  // Quand on sort du groupe, on enlève l'effet de survol mais on garde la sélection
  starsGroup.addEventListener("mouseleave", () => {
    labels.forEach((l) => l.classList.remove("hovered"));
  });
});


// Gestion visuelle des boutons Oui / Non
document.querySelectorAll(".yesno-group").forEach((group) => {
  const options = group.querySelectorAll(".yesno-option");
  options.forEach((opt) => {
    const input = opt.querySelector("input");
    opt.addEventListener("click", () => {
      // décoche visuellement les autres options du groupe
      options.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      if (input) {
        input.checked = true;
      }
    });
  });
});

// Gestion de l'envoi du formulaire
const form = document.getElementById("surveyForm");
const successEl = document.getElementById("formSuccess");
const formErrorEl = document.getElementById("formError");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (formErrorEl) formErrorEl.classList.remove("visible");
    if (successEl) successEl.classList.remove("visible");

    let hasError = false;

    // Validation minimale : satisfaction globale obligatoire
    const globalRating = form.querySelector('input[name="rating_global"]:checked');
    const globalError = document.querySelector(
      '.error-inline[data-error-for="rating_global"]'
    );

    if (!globalRating) {
      if (globalError) globalError.classList.add("visible");
      hasError = true;
    } else if (globalError) {
      globalError.classList.remove("visible");
    }

    if (hasError) {
      return;
    }

    // Récupération des données du formulaire
    const formData = new FormData(form);

    try {
      // Envoi vers ton script Google Apps Script
      const response = await fetch("https://script.google.com/macros/s/AKfycbxArpPa4Ib1AHs3Bf7D-y3ww70aX-RJxiVkka9vTZhscnph2tMwGOOxL6gVjhRSqfte/exec", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Erreur HTTP (404, 500, etc.)
        console.error("Réponse HTTP non valide :", response.status, response.statusText);
        if (formErrorEl) formErrorEl.classList.add("visible");
        return;
      }

      const data = await response.json();

      if (!data.success) {
        // Le script a répondu, mais avec success = false
        console.error("Erreur retournée par le script :", data.error);
        if (formErrorEl) formErrorEl.classList.add("visible");
        return;
      }

      // Si on arrive ici : tout s’est bien passé côté Apps Script
      form.reset();

      // Réinitialiser l'affichage des étoiles
      document
        .querySelectorAll(".stars label")
        .forEach((l) => l.classList.remove("selected", "hovered"));

      // Réinitialiser les boutons oui/non
      document
        .querySelectorAll(".yesno-option")
        .forEach((opt) => opt.classList.remove("active"));

      if (successEl) {
        successEl.classList.add("visible");
        setTimeout(() => {
          successEl.classList.remove("visible");
        }, 4000);
      }
    } catch (err) {
      // Erreur réseau ou exception JS
      console.error("Erreur lors de l’envoi du formulaire :", err);
      if (formErrorEl) formErrorEl.classList.add("visible");
    }

  });
}
