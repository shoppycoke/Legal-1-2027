// ═══════════════════════════════════════════════
// AJOUT D'UN MESSAGE DANS LE CHAT
// ═══════════════════════════════════════════════
function addMsg(role, text) {
  const msgs = document.getElementById('chatMessages');
  const d    = document.createElement('div');
  d.className = 'chat-msg ' + (role === 'user' ? 'user' : 'ai');
  d.innerHTML = `
    <div class="chat-avatar ${role === 'user' ? 'user2' : 'ai'}">${role === 'user' ? '👤' : '⚖️'}</div>
    <div class="chat-bubble">${role === 'user' ? text : formatResp(text)}</div>
  `;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}


// ═══════════════════════════════════════════════
// INDICATEUR DE FRAPPE
// ═══════════════════════════════════════════════
function addTyping() {
  const msgs = document.getElementById('chatMessages');
  const d    = document.createElement('div');
  d.className = 'chat-msg ai';
  d.id        = 'typingMsg';
  d.innerHTML = `
    <div class="chat-avatar ai">⚖️</div>
    <div class="chat-bubble">
      <div class="typing"><span></span><span></span><span></span></div>
    </div>
  `;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}


// ═══════════════════════════════════════════════
// RÉPONSES LOCALES (BASE DE CONNAISSANCES)
// ═══════════════════════════════════════════════
function getResp(msg) {
  const m = msg.toLowerCase();
  for (const [key, val] of Object.entries(AI_KB)) {
    if (m.includes(key)) return val;
  }

  const fallbacks = [
    "Très bonne question ! Ce concept est important en L1 de droit.\n\n💡 *Pour une réponse complète, connecte l'API Anthropic Claude dans le code (voir la carte en bas de page).* Je pourrai alors t'expliquer n'importe quel concept juridique, générer des quiz personnalisés et simuler un examen oral.\n\nEn attendant, explore les **cours** et **fiches** de chaque matière !",
    "Bonne question de révision ! Ce point est souvent évalué en L1.\n\n💡 *Active l'IA complète via l'API Anthropic pour des explications détaillées, des exemples et des exercices ciblés.*\n\nPour l'instant, consulte la **Méthodologie** pour les techniques d'examen !"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}


// ═══════════════════════════════════════════════
// API ANTHROPIC — À ACTIVER AVEC TA CLÉ
// ═══════════════════════════════════════════════
async function callAnthropicAPI(userMsg) {
  // Décommente ce bloc et remplace TON_API_KEY pour activer l'IA complète :
  /*
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'TON_API_KEY',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      system: 'Tu es un assistant pédagogique spécialisé en droit français niveau L1. Tu expliques les concepts clairement, avec des exemples, et tu poses des questions pour vérifier la compréhension. Réponds en français.',
      messages: [{ role: 'user', content: userMsg }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
  */
  return null; // Supprime cette ligne quand tu actives l'API
}


// ═══════════════════════════════════════════════
// ENVOI D'UN MESSAGE
// ═══════════════════════════════════════════════
async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg   = input.value.trim();
  if (!msg) return;

  input.value = '';
  addMsg('user', msg);
  addTyping();

  let resp = null;
  try {
    resp = await callAnthropicAPI(msg);
  } catch (e) {}

  setTimeout(() => {
    const typing = document.getElementById('typingMsg');
    if (typing) typing.remove();
    addMsg('ai', resp || getResp(msg));
  }, resp ? 0 : 800 + Math.random() * 500);
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function askQuick(q) {
  document.getElementById('chatInput').value = q;
  sendChatMessage();
}
