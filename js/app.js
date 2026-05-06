// ═══════════════════════════════════════════════
// INITIALISATION — COMPTE À REBOURS
// ═══════════════════════════════════════════════
updateCountdown();
setInterval(updateCountdown, 1000);

// ═══════════════════════════════════════════════
// INITIALISATION — RESTAURATION DE LA PROGRESSION
// ═══════════════════════════════════════════════
loadProgress();


// ═══════════════════════════════════════════════
// INITIALISATION — DATE DU JOUR (DASHBOARD)
// ═══════════════════════════════════════════════
(function initDate() {
  const jours  = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const mois   = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const now    = new Date();
  const el     = document.getElementById('dateAujourd');
  if (el) el.textContent = jours[now.getDay()] + ' ' + now.getDate() + ' ' + mois[now.getMonth()] + ' ' + now.getFullYear();
})();
