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

    if (tabBtns.length > 0 && expPanes.length > 0) {
        // Action : Changer d'entreprise
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Désactiver tous les boutons et panneaux
                tabBtns.forEach(b => b.classList.remove('active'));
                expPanes.forEach(p => p.classList.remove('active'));

                // 2. Activer le bouton cliqué
                btn.classList.add('active');
                
                // 3. Activer le panneau correspondant
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                
                if (targetPane) {
                    targetPane.classList.add('active');
                } else {
                    console.error("Erreur : Le panneau d'expérience '" + targetId + "' n'existe pas.");
                }
            });
        });
    }
});