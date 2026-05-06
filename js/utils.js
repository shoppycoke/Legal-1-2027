// ═══════════════════════════════════════════════
// TITRES DES PAGES
// ═══════════════════════════════════════════════
const pageTitles = {
  accueil:   'Accueil',
  dashboard: 'Dashboard',
  matieres:  'Matières',
  matiere:   '',
  cours:     '',
  quiz:      'Quiz',
  methodo:   'Méthodologie',
  planning:  'Planning',
  ai:        'Assistant IA',
  conseils:  'Conseils'
};


// ═══════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


// ═══════════════════════════════════════════════
// FORMATTAGE MARKDOWN SIMPLE
// ═══════════════════════════════════════════════
function formatResp(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}


// ═══════════════════════════════════════════════
// ONGLETS MÉTHODOLOGIE
// ═══════════════════════════════════════════════
function switchTab(btn, section) {
  btn.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  ['dissertation', 'cas', 'arret', 'fiche_arr'].forEach(s => {
    const el = document.getElementById('methodo-' + s);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById('methodo-' + section);
  if (target) target.style.display = 'block';
}


// ═══════════════════════════════════════════════
// COUNTDOWN JUSQU'À SEPTEMBRE 2027
// ═══════════════════════════════════════════════
function updateCountdown() {
  const diff = new Date('2027-09-01T08:00:00') - new Date();
  if (diff <= 0) return;

  document.getElementById('cdJours').textContent  = Math.floor(diff / 86400000);
  document.getElementById('cdHeures').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('cdMins').textContent   = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('cdSecs').textContent   = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
