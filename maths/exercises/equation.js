// Exercice 1 — Résoudre ax + b = cx + d
export default {
  id: 'equation-linear',
  title: 'Résoudre ax + b = cx + d',
  subtitle: 'Isoler x en opérant des deux côtés',
  level: 'Débutant',
  duration: '~5 min',
  category: 'Algèbre',
  mount(container){
    container.innerHTML = `
      <div class="panel">
        <h2 style="margin-top:0">Résoudre <small>ax + b = cx + d</small></h2>
        <div id="eqText" class="panel" style="padding:16px;font-size:28px;font-weight:700">—</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px">
          <button class="btn" id="play">Lancer les étapes</button>
          <button class="btn ghost" id="next" disabled>Étape suivante</button>
          <button class="btn ghost" id="reset">Réinitialiser</button>
          <button class="btn ghost" id="new">Nouvelle équation</button>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <label class="badge">Mode
            <select id="mode" class="input">
              <option value="balanced">Facile</option>
              <option value="random">Aléatoire</option>
              <option value="custom">Personnalisé</option>
            </select>
          </label>
          <label>a <input id="a" type="number" class="input" value="2" step="1"></label>
          <label>b <input id="b" type="number" class="input" value="10" step="1"></label>
          <label>c <input id="c" type="number" class="input" value="3" step="1"></label>
          <label>d <input id="d" type="number" class="input" value="5" step="1"></label>
        </div>
        <div class="progress"><i id="bar"></i></div>
        <ol id="steps" style="margin-top:14px;display:flex;flex-direction:column;gap:10px"></ol>
      </div>`;

    // Helpers
    const fmtTerm = (k)=> k===0?'0':k===1?'x':k===-1?'-x':`${k}x`;
    const eqStr = (a,b,c,d)=>`${fmtTerm(a)} ${b<0?'-':'+'} ${Math.abs(b)} = ${fmtTerm(c)} ${d<0?'-':'+'} ${Math.abs(d)}`.replace(/^0 \+ /,'').replace(/= 0 \+ /,'= ');

    function genBalanced(){ const x = ri(-9,9)||3; const a=rnz(-5,5), c=rnz(-5,5), b=ri(-9,9); const d=(a-c)*x + b; return {a,b,c,d}; }
    function genRandom(){ const a=rnz(-9,9), c=rnz(-9,9), b=ri(-9,9), d=ri(-9,9); if(a===c) return genRandom(); return {a,b,c,d}; }
    const ri=(min,max)=>Math.floor(Math.random()*(max-min+1))+min; const rnz=(min,max)=>{let n=0;while(!n) n=ri(min,max);return n};

    const eqText = container.querySelector('#eqText');
    const stepsEl = container.querySelector('#steps');
    const bar = container.querySelector('#bar');

    let S = {a:2,b:10,c:3,d:5,steps:[],idx:0};

    const renderEq = ()=> eqText.textContent = eqStr(S.a,S.b,S.c,S.d);

    function buildSteps(a,b,c,d){
      const arr=[];
      arr.push({eq:eqStr(a,b,c,d), hint:'Équation de départ'});
      const s1={a:a-c,b:b,c:0,d:d}; arr.push({eq:eqStr(s1.a,s1.b,0,s1.d), hint:`Soustraire ${fmtTerm(c)} des deux côtés`});
      const s2={a:s1.a,b:0,c:0,d:s1.d-b}; arr.push({eq:eqStr(s2.a,0,0,s2.d), hint:`Soustraire ${b} des deux côtés`});
      const s3={a:1,b:0,c:0,d:s2.d/s2.a}; arr.push({eq:`x = ${Number.isInteger(s3.d)?s3.d:s3.d.toFixed(3)}`, hint:`Diviser par ${s2.a}`});
      return arr;
    }

    function renderSteps(){
      stepsEl.innerHTML='';
      S.steps.forEach((s,i)=>{
        const li = document.createElement('li');
        li.className='panel'; li.style.padding='12px';
        li.innerHTML=`<div style="font-weight:700;font-size:20px">${s.eq}</div><div style="color:var(--muted);font-size:13px;margin-top:6px">${s.hint}</div>`;
        li.dataset.state = i===0?'done':'pending';
        stepsEl.appendChild(li);
      });
      updateProgress();
    }

    const updateProgress = ()=>{ const n=S.steps.length; const done=Math.min(S.idx,n-1); const pct=(done)/(n-1)*100; bar.style.width = isFinite(pct)? pct+'%':'0%'; };
    const applyIdx = ()=>{ [...stepsEl.children].forEach((el,i)=> el.style.opacity = i<=S.idx? '1':'.55'); updateProgress(); };
    const rebuild = ()=>{ S.steps = buildSteps(S.a,S.b,S.c,S.d); renderEq(); renderSteps(); S.idx=0; applyIdx(); };

    const mode = container.querySelector('#mode');
    const [a,b,c,d] = ['a','b','c','d'].map(id=>container.querySelector('#'+id));

    function newEq(){
      let data; if(mode.value==='balanced') data=genBalanced(); else if(mode.value==='random') data=genRandom(); else data={a:+a.value,b:+b.value,c:+c.value,d:+d.value};
      a.value=data.a; b.value=data.b; c.value=data.c; d.value=data.d; S={...S,...data,idx:0}; rebuild();
    }

    container.querySelector('#play').addEventListener('click', async ()=>{ S.idx=0; applyIdx(); for(let i=1;i<S.steps.length;i++){ await wait(800); S.idx=i; applyIdx(); } });
    container.querySelector('#next').addEventListener('click', ()=>{ S.idx=Math.min(S.idx+1,S.steps.length-1); applyIdx(); });
    container.querySelector('#reset').addEventListener('click', ()=>{ S.idx=0; applyIdx(); });
    container.querySelector('#new').addEventListener('click', newEq);
    mode.addEventListener('change', ()=>{ const custom = mode.value==='custom'; [a,b,c,d].forEach(x=>x.disabled=!custom); if(!custom) newEq(); });
    ;[a,b,c,d].forEach(inp=> inp.addEventListener('input', rebuild));

    const wait = (ms)=> new Promise(r=>setTimeout(r,ms));
    newEq();
  }
};