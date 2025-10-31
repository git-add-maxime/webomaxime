// Exercice 2 — Remplir un tableau de valeurs pour une droite affine y = m x + p
export default {
  id: 'affine-table',
  title: 'Tableau de valeurs — y = m x + p',
  subtitle: 'Compléter le tableau puis vérifier',
  level: 'Débutant',
  duration: '~5 min',
  category: 'Fonctions',
  mount(container){
    container.innerHTML = `
      <div class="panel">
        <h2 style="margin-top:0">Tableau de valeurs <small>y = m x + p</small></h2>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <label>m <input id="m" type="number" step="1" value="2" class="input"></label>
          <label>p <input id="p" type="number" step="1" value="-1" class="input"></label>
          <label>Valeurs de x <input id="xs" class="input" value="-2,-1,0,1,2"></label>
          <button class="btn" id="regen">Générer</button>
          <button class="btn ghost" id="check">Vérifier</button>
          <button class="btn ghost" id="solve">Afficher la solution</button>
        </div>
        <div id="tableZone" style="margin-top:12px"></div>
        <div id="score" style="margin-top:10px;color:var(--muted)"></div>
      </div>`;

    const mEl = container.querySelector('#m');
    const pEl = container.querySelector('#p');
    const xsEl = container.querySelector('#xs');
    const tableZone = container.querySelector('#tableZone');
    const scoreEl = container.querySelector('#score');

    function parseXs(){ return xsEl.value.split(',').map(s=>s.trim()).filter(Boolean).map(Number).filter(x=>Number.isFinite(x)); }
    function y(m,p,x){ return m*x + p; }

    function renderTable(){
      const xs = parseXs();
      const rows = xs.map((x,i)=> `
        <tr>
          <th>x = ${x}</th>
          <td><input type="number" class="input" data-x="${x}" placeholder="y ?" /></td>
        </tr>`).join('');
      tableZone.innerHTML = `
        <table class="table">
          <thead><tr><th>x</th><th>y</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
      scoreEl.textContent='';
    }

    function check(){
      const m = +mEl.value, p = +pEl.value; const inputs = [...tableZone.querySelectorAll('input[data-x]')];
      let ok=0; inputs.forEach(inp=>{ const x=+inp.dataset.x; const expect=y(m,p,x); const val=Number(inp.value); if(Number.isFinite(val) && Math.abs(val-expect)<1e-9){ inp.style.borderColor='rgba(116,198,157,.8)'; ok++; } else { inp.style.borderColor='rgba(239,71,111,.8)'; }});
      scoreEl.textContent = `Score: ${ok}/${inputs.length}`;
    }

    function showSolution(){
      const m = +mEl.value, p = +pEl.value; const inputs = [...tableZone.querySelectorAll('input[data-x]')];
      inputs.forEach(inp=>{ const x=+inp.dataset.x; inp.value = y(m,p,x); inp.style.borderColor='rgba(116,198,157,.8)'; });
      check();
    }

    container.querySelector('#regen').addEventListener('click', renderTable);
    container.querySelector('#check').addEventListener('click', check);
    container.querySelector('#solve').addEventListener('click', showSolution);

    renderTable();
  }
};