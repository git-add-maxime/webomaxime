document.addEventListener('DOMContentLoaded', () => {
    
    // Variables pour la navigation principale
    const btnGoExp = document.getElementById('btn-go-exp');
    const vueAccueil = document.getElementById('vue-accueil');
    const vueExperiences = document.getElementById('vue-experiences');
    const btnHome = document.getElementById('btn-home');

    // Vérification de sécurité pour la navigation vers Expériences
    if (btnGoExp && vueAccueil && vueExperiences) {
        btnGoExp.addEventListener('click', () => {
            vueAccueil.classList.remove('active');
            vueExperiences.classList.add('active');
            window.scrollTo(0, 0); 
        });
    } else {
        console.error("Erreur : Le bouton 'Expériences' ou les vues HTML sont introuvables.");
    }

    // Vérification de sécurité pour le bouton Accueil (Maison)
    if (btnHome && vueAccueil && vueExperiences) {
        btnHome.addEventListener('click', () => {
            vueExperiences.classList.remove('active');
            vueAccueil.classList.add('active');
            window.scrollTo(0, 0);
        });
    } else {
        console.error("Erreur : Le bouton 'Accueil' est introuvable dans le HTML.");
    }

    // Variables pour les sous-onglets d'entreprises
    const tabBtns = document.querySelectorAll('.tab-btn');
    const expPanes = document.querySelectorAll('.exp-pane');
    const titreExperienceActive = document.getElementById('titre-experience-active'); // Nouvelle variable

    if (tabBtns.length > 0 && expPanes.length > 0) {
        // Action : Changer d'entreprise
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // 1. Désactiver tous les panneaux et réafficher TOUS les boutons
                expPanes.forEach(p => p.classList.remove('active'));
                tabBtns.forEach(b => b.style.display = 'inline-block');

                // 2. Activer le panneau ciblé
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                
                if (targetPane) {
                    targetPane.classList.add('active');
                } else {
                    console.error("Erreur : Le panneau '" + targetId + "' n'existe pas.");
                }

                // 3. Remplacer le texte du grand titre par le nom de l'entreprise cliquée
                if (titreExperienceActive) {
                    titreExperienceActive.textContent = btn.textContent;
                }

                // 4. Cacher le bouton qu'on vient de cliquer (puisqu'il devient la vue active)
                btn.style.display = 'none';
            });
        });
    }
});