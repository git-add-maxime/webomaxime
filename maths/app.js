import { registerExercises, getAllExercises } from './registry.js';
import { store } from './utils/store.js';
import equation from './exercises/equation.js';
import affineTable from './exercises/affine-table.js';


// Enregistrer les exercices disponibles
registerExercises([
    equation,
    affineTable,
]);

// Rendu de la liste + navigation
const listView = document.getElementById('listView');
const detailView = document.getElementById('detailView');
const cardsRoot = document.getElementById('cards');
const detailMount = document.getElementById('detailMount');
const backBtn = document.getElementById('backBtn');


function svgStar(){
return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.9 5.89 6.5.95-4.7 4.58 1.1 6.43L12 18.9l-5.8 3.45 1.1-6.43L2.6 10.34l6.5-.95L12 3.5z"/></svg>`;
}


function section(title){
    const el = document.createElement('section');
    el.className = 'section';
    el.innerHTML = `<h2>${title}</h2><div class="grid"></div>`;
    return el;
}


function renderList(){
    cardsRoot.innerHTML = '';
    const all = getAllExercises();


    // Grouper par catégories et séparer favoris
    const favIds = new Set(store.get('favs', []));
    const favs = all.filter(x => favIds.has(x.id));
    const byCat = all.reduce((acc,x)=>{ (acc[x.category] ||= []).push(x); return acc; }, {});


    const container = document.createDocumentFragment();


    if (favs.length){
    const s = section('⭐ Favoris');
    fillGrid(s.querySelector('.grid'), favs);
    container.appendChild(s);
    }
    for (const [cat, items] of Object.entries(byCat)){
    const s = section(cat);
    fillGrid(s.querySelector('.grid'), items);
    container.appendChild(s);
    }
    cardsRoot.appendChild(container);
}


function fillGrid(gridEl, items){
    items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
    <button class="star" aria-label="Basculer favori" data-id="${item.id}">${svgStar()}</button>
    <h3>${item.title}</h3>
    <p>${item.subtitle ?? ''}</p>
    <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
    <span class="badge">${item.level ?? 'Débutant'}</span>
    <span class="badge">${item.duration ?? '~5 min'}</span>
    </div>
    `;
    card.addEventListener('click', (e)=>{
    if (e.target.closest('.star')) return; // évite d'ouvrir lors du clic étoile
    openDetail(item);
    });


    const favBtn = card.querySelector('.star');
    const favs = new Set(store.get('favs', []));
    favBtn.dataset.active = favs.has(item.id);
    favBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const set = new Set(store.get('favs', []));
    if (set.has(item.id)) set.delete(item.id); else set.add(item.id);
    store.set('favs', [...set]);
    favBtn.dataset.active = set.has(item.id);
    renderList(); // remonte les favoris en haut
    });


    gridEl.appendChild(card);
    });
}
function openDetail(item){
    // Monte la vue détail depuis la droite
    listView.classList.add('slide-out');
    detailView.classList.add('active');
    requestAnimationFrame(()=> listView.classList.remove('active'));


    // Nettoyage du précédent module et montage du nouveau
    detailMount.innerHTML = '';
    const host = document.createElement('div');
    detailMount.appendChild(host);
    item.mount(host);
}


backBtn.addEventListener('click', ()=>{
// Retour à la liste
listView.classList.add('active');
listView.classList.remove('slide-out');
detailView.classList.remove('active');
detailMount.innerHTML = '';
});

// Init
renderList();