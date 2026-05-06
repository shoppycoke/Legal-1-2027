// ═══════════════════════════════════════════════
// ÉTAT DU QUIZ
// ═══════════════════════════════════════════════
let currentQuiz = null;
let currentQ    = 0;
let quizAnswers = [];
let answered    = false;


// ═══════════════════════════════════════════════
// LANCEMENT D'UN QUIZ
// ═══════════════════════════════════════════════
function startQuiz(id) {
  const qs = QUESTIONS[id] || QUESTIONS.intro;
  currentQuiz = { id, questions: qs };
  currentQ    = 0;
  quizAnswers = [];
  answered    = false;

  navigate('quiz', null);
  document.getElementById('quizSelector').style.display  = 'none';
  document.getElementById('quizResults').style.display   = 'none';
  document.getElementById('quizArea').style.display      = 'block';

  renderQuestion();
}


// ═══════════════════════════════════════════════
// AFFICHAGE D'UNE QUESTION
// ═══════════════════════════════════════════════
function renderQuestion() {
  if (!currentQuiz) return;

  const q     = currentQuiz.questions[currentQ];
  const total = currentQuiz.questions.length;
  answered    = false;

  document.getElementById('qNum').textContent      = 'Question ' + (currentQ + 1) + ' / ' + total;
  document.getElementById('qText').textContent     = q.q;
  document.getElementById('quizProgress').style.width = (currentQ / total * 100) + '%';
  document.getElementById('quizScore').textContent = quizAnswers.filter(a => a).length + ' ✓';
  document.getElementById('qResult').style.display = 'none';
  document.getElementById('qNextBtn').style.display = 'none';

  document.getElementById('qOptions').innerHTML = q.opts
    .map((o, i) => `<button class="quiz-option" onclick="answerQ(${i})">${o}</button>`)
    .join('');
}


// ═══════════════════════════════════════════════
// RÉPONSE À UNE QUESTION
// ═══════════════════════════════════════════════
function answerQ(idx) {
  if (answered) return;
  answered = true;

  const q  = currentQuiz.questions[currentQ];
  const ok = idx === q.rep;
  quizAnswers.push(ok);

  document.querySelectorAll('.quiz-option').forEach((b, i) => {
    b.disabled = true;
    if (i === q.rep) b.classList.add('correct');
    else if (i === idx && !ok) b.classList.add('wrong');
  });

  const res = document.getElementById('qResult');
  res.style.display = 'block';
  res.className     = 'quiz-result ' + (ok ? 'ok' : 'ko');
  res.innerHTML     = (ok ? '✅ <strong>Bonne réponse !</strong>' : '❌ <strong>Pas tout à fait.</strong>') + '<br>' + q.expl;

  document.getElementById('qNextBtn').style.display = 'block';

  if (ok) showToast('✅ Bonne réponse ! +15 XP');
}


// ═══════════════════════════════════════════════
// QUESTION SUIVANTE
// ═══════════════════════════════════════════════
function nextQuestion() {
  currentQ++;
  if (currentQ >= currentQuiz.questions.length) showResults();
  else renderQuestion();
}


// ═══════════════════════════════════════════════
// RÉSULTATS FINAUX
// ═══════════════════════════════════════════════
function showResults() {
  const ok    = quizAnswers.filter(a => a).length;
  const total = currentQuiz.questions.length;
  const pct   = Math.round(ok / total * 100);

  document.getElementById('quizArea').style.display    = 'none';
  document.getElementById('quizResults').style.display = 'block';
  document.getElementById('rCorrect').textContent = ok;
  document.getElementById('rWrong').textContent   = total - ok;
  document.getElementById('rScore').textContent   = pct + '%';

  let emoji, title, txt;
  if (pct >= 80) {
    emoji = '🏆'; title = 'Excellent travail !'; txt = 'Tu maîtrises ce sujet. Continue avec un quiz plus difficile.';
  } else if (pct >= 60) {
    emoji = '👍'; title = 'Bon résultat'; txt = 'Quelques lacunes à combler. Relis les explications.';
  } else {
    emoji = '💪'; title = 'À retravailler'; txt = 'Ce chapitre nécessite plus de pratique. Relis le cours et refais le quiz.';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultText').textContent  = txt;

  showToast('🏁 Quiz terminé ! +' + (ok * 20) + ' XP gagnés');
}


// ═══════════════════════════════════════════════
// REJOUER / QUITTER
// ═══════════════════════════════════════════════
function retryQuiz() {
  startQuiz(currentQuiz.id);
}

function exitQuiz() {
  document.getElementById('quizSelector').style.display  = 'block';
  document.getElementById('quizArea').style.display      = 'none';
  document.getElementById('quizResults').style.display   = 'none';
  currentQuiz = null;
}
