// ═══════════════════════════════════════════════
// XP GLOBAL (SESSION)
// ═══════════════════════════════════════════════
let totalXP = 0;

const XP_LEVELS = [
  { nom: 'Apprenti juriste',  max: 500  },
  { nom: 'Étudiant en droit', max: 1500 },
  { nom: 'Juriste en herbe',  max: 3000 },
  { nom: 'Expert juridique',  max: Infinity }
];

function updateXPDisplay() {
  let level = 0, prevMax = 0;
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (totalXP < XP_LEVELS[i].max) { level = i; break; }
    prevMax = XP_LEVELS[i].max;
  }
  const lv  = XP_LEVELS[level];
  const pct = lv.max === Infinity ? 99 : Math.round((totalXP - prevMax) / (lv.max - prevMax) * 100);

  const label = document.querySelector('.xp-label');
  const fill  = document.querySelector('.xp-fill');
  const badge = document.querySelector('.level-badge');
  if (label) label.innerHTML = `<span>Niveau ${level + 1} — ${lv.nom}</span><span>${totalXP} / ${lv.max === Infinity ? '∞' : lv.max} XP</span>`;
  if (fill)  fill.style.width = pct + '%';
  if (badge) badge.textContent = '⚡ ' + totalXP + ' XP';
}

function refreshProgressUI() {
  const ids = ['intro', 'civil', 'constit', 'institutions', 'methodo_m'];

  // Barres de la page accueil
  ids.forEach(id => {
    const m = MATIERES[id];
    if (!m) return;
    document.querySelectorAll(`.matiere-card[onclick*="'${id}'"] .progress-fill`).forEach(el => {
      el.style.width = m.prog + '%';
    });
    document.querySelectorAll(`.matiere-card[onclick*="'${id}'"] .matiere-prog-label span:last-child`).forEach(el => {
      el.textContent = m.prog + '%';
    });
  });

  // Barres du dashboard
  const dashBars = document.querySelectorAll('#page-dashboard .progress-fill');
  const dashPcts = document.querySelectorAll('#page-dashboard .progress-bar');

  // Progression globale
  const totalProg = Math.round(ids.reduce((s, id) => s + (MATIERES[id]?.prog || 0), 0) / ids.length);
  const globalCard = document.querySelector('#page-dashboard .stat-card .stat-value');
  if (globalCard) globalCard.textContent = totalProg + '%';
  const globalBar = document.querySelector('#page-dashboard .stat-card .progress-fill');
  if (globalBar) globalBar.style.width = totalProg + '%';

  // Cours terminés
  const totalDone = ids.reduce((s, id) => s + (MATIERES[id]?.chapitres.filter(c => c.done).length || 0), 0);
  const doneCard  = document.querySelectorAll('#page-dashboard .stat-card .stat-value')[1];
  if (doneCard) doneCard.textContent = totalDone;

  // Barres par matière dans le dashboard
  const rows = document.querySelectorAll('#page-dashboard .card:nth-child(2) > div > div');
  const order = ['intro', 'civil', 'constit', 'institutions', 'methodo_m'];
  order.forEach((id, i) => {
    const row = document.querySelectorAll('#page-dashboard [style*="flex-direction:column"] > div')[i];
    if (!row) return;
    const span = row.querySelectorAll('span')[1];
    const bar  = row.querySelector('.progress-fill');
    if (span) span.textContent = (MATIERES[id]?.prog || 0) + '%';
    if (bar)  bar.style.width  = (MATIERES[id]?.prog || 0) + '%';
  });
}


// ═══════════════════════════════════════════════
// PERSISTANCE — LOCALSTORAGE
// ═══════════════════════════════════════════════
function saveProgress() {
  const state = {
    xp: totalXP,
    streak: parseInt(document.querySelector('.streak-badge span')?.textContent) || 0,
    matieres: {}
  };
  Object.entries(MATIERES).forEach(([id, m]) => {
    state.matieres[id] = {
      prog: m.prog,
      chapitres: m.chapitres.map(c => c.done)
    };
  });
  localStorage.setItem('legalprep_progress', JSON.stringify(state));
}

function loadProgress() {
  const raw = localStorage.getItem('legalprep_progress');
  if (!raw) return;
  try {
    const state = JSON.parse(raw);
    totalXP = state.xp || 0;

    Object.entries(state.matieres || {}).forEach(([id, saved]) => {
      const m = MATIERES[id];
      if (!m) return;
      m.prog = saved.prog;
      saved.chapitres.forEach((done, i) => {
        if (m.chapitres[i]) m.chapitres[i].done = done;
      });
    });

    updateXPDisplay();
    refreshProgressUI();

    const streakEl = document.querySelector('.streak-badge span');
    if (streakEl && state.streak) streakEl.textContent = state.streak;
  } catch (e) {}
}


// ═══════════════════════════════════════════════
// MARQUER UN COURS COMME TERMINÉ
// ═══════════════════════════════════════════════
function completerCours(matiereId, chapIndex) {
  const mat  = MATIERES[matiereId];
  const chap = mat?.chapitres[chapIndex];
  if (!chap || chap.done) return;

  chap.done = true;
  const done = mat.chapitres.filter(c => c.done).length;
  mat.prog   = Math.round(done / mat.chapitres.length * 100);

  totalXP += chap.xp;
  updateXPDisplay();
  refreshProgressUI();

  const streakEl = document.querySelector('.streak-badge span');
  if (streakEl) {
    const cur = parseInt(streakEl.textContent) || 0;
    streakEl.textContent = cur + 1;
  }

  saveProgress();
  showToast('✅ Chapitre terminé ! +' + chap.xp + ' XP gagnés');
  openMatiere(matiereId);
}


// ═══════════════════════════════════════════════
// NAVIGATION ENTRE LES PAGES
// ═══════════════════════════════════════════════
function navigate(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('topbarTitle').textContent = pageTitles[page] || '';

  if (btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
  }

  closeSidebar();
  window.scrollTo(0, 0);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}


// ═══════════════════════════════════════════════
// PAGE MATIÈRE — AFFICHAGE DÉTAIL
// ═══════════════════════════════════════════════
function openMatiere(id) {
  const m = MATIERES[id];
  if (!m) return;

  const chapHtml = m.chapitres.map((c, i) => `
    <div class="cours-item" onclick="openCours('${id}', ${i})">
      <div class="cours-num ${c.done ? 'done' : ''}">${c.done ? '✓' : i + 1}</div>
      <span class="cours-title">${c.t}</span>
      <span class="cours-xp">+${c.xp} XP</span>
      <span class="cours-badge ${c.done ? 'badge-done' : 'badge-new'}">${c.done ? 'Terminé' : 'Étudier'}</span>
    </div>
  `).join('');

  const ficheHtml = m.fiches.map(f => `
    <div class="fiche-card" onclick="this.classList.toggle('open')">
      <div class="fiche-term">${f.terme}</div>
      <div class="fiche-def">${f.def}</div>
    </div>
  `).join('');

  document.getElementById('matiereContent').innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div>
        <h1>${m.emoji} ${m.nom}</h1>
        <p>Progression : <strong style="color:${m.couleur}">${m.prog}%</strong></p>
      </div>
      <button class="btn btn-primary" onclick="startQuiz('${id}')">🧠 Quiz sur cette matière</button>
    </div>
    <div class="progress-bar" style="height:8px;margin-bottom:32px">
      <div class="progress-fill" style="width:${m.prog}%;--fill-color:${m.couleur}"></div>
    </div>
    <div class="tabs" style="max-width:300px">
      <button class="tab active" onclick="switchMatiereTab(this,'cl-${id}','fi-${id}')">📖 Cours</button>
      <button class="tab" onclick="switchMatiereTab(this,'fi-${id}','cl-${id}')">📋 Fiches</button>
    </div>
    <div id="cl-${id}">${chapHtml}</div>
    <div id="fi-${id}" style="display:none">${ficheHtml}</div>
  `;

  document.getElementById('topbarTitle').textContent = m.nom;
  navigate('matiere', null);
}

function switchMatiereTab(btn, showId, hideId) {
  btn.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(showId).style.display = 'block';
  document.getElementById(hideId).style.display = 'none';
}


// ═══════════════════════════════════════════════
// PAGE COURS — AFFICHAGE CONTENU
// ═══════════════════════════════════════════════
function openCours(matiereId, chapIndex) {
  const key     = matiereId + '_' + chapIndex;
  const contenu = COURS[key];
  const mat     = MATIERES[matiereId];
  const chap    = mat?.chapitres[chapIndex];

  let html;
  if (contenu) {
    const alreadyDone = chap?.done;
    html = `
      <div class="cours-content">
        ${contenu}
        <hr style="border:none;border-top:1px solid var(--border);margin:28px 0">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <button class="btn btn-outline" onclick="navigate('matiere', null)">← Retour aux cours</button>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${alreadyDone
              ? `<button class="btn btn-outline" disabled style="opacity:.5;cursor:default">✅ Déjà terminé</button>`
              : `<button class="btn btn-primary" onclick="completerCours('${matiereId}', ${chapIndex})">✅ Marquer comme terminé (+${chap?.xp || 100} XP)</button>`
            }
            <button class="btn btn-outline" onclick="startQuiz('${matiereId}')">🧠 Quiz →</button>
          </div>
        </div>
      </div>
    `;
  } else {
    html = `
      <div class="cours-content">
        <h2>${chap ? chap.t : 'Cours'}</h2>
        <p>Ce cours arrive bientôt. En attendant, utilise l'<strong>Assistant IA</strong> pour te faire expliquer ce sujet en détail.</p>
        <div class="highlight">💡 Astuce : Clique sur "Ask AI" et demande : "<em>Explique-moi ${chap ? chap.t.toLowerCase() : 'ce chapitre'} en droit L1</em>"</div>
        <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="navigate('ai', null)">🤖 Demander à l'IA</button>
          <button class="btn btn-outline" onclick="navigate('matiere', null)">← Retour</button>
        </div>
      </div>
    `;
  }

  document.getElementById('coursContent').innerHTML = html;
  document.getElementById('coursBackBtn').onclick = () => navigate('matiere', null);
  document.getElementById('topbarTitle').textContent = chap?.t || 'Cours';
  navigate('cours', null);
  showToast('📖 Cours ouvert — bonne étude ! +120 XP à la fin');
}
