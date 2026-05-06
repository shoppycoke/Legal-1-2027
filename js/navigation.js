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
    html = `
      <div class="cours-content">
        ${contenu}
        <hr style="border:none;border-top:1px solid var(--border);margin:28px 0">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <button class="btn btn-outline" onclick="navigate('matiere', null)">← Retour aux cours</button>
          <button class="btn btn-primary" onclick="startQuiz('${matiereId}')">🧠 Quiz sur ce cours →</button>
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
