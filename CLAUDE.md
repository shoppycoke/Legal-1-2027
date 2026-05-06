# LegalPrep L1 — Contexte projet

## Ce qu'est ce projet

Site web statique de coaching juridique personnel, destiné à préparer une L1 de droit (rentrée septembre 2027). Interface de type dashboard avec sidebar de navigation, plusieurs pages fonctionnelles et un quiz interactif.

Pas de framework, pas de build tool. Vanilla HTML + CSS + JavaScript, servi par n'importe quel serveur HTTP local.

## Arborescence

```
legalprep-l1/
├── index.html              ← Toute la structure HTML (10 pages en SPA)
├── css/
│   ├── variables.css       ← Variables CSS custom properties (:root) + reset
│   ├── layout.css          ← Sidebar fixe, topbar sticky, zone .main
│   ├── components.css      ← Composants réutilisables (cards, boutons, grids, tabs, cours…)
│   ├── pages.css           ← Styles page-spécifiques (hero, countdown, quiz, chat, conseils)
│   └── responsive.css      ← Media queries (breakpoints 900px et 600px)
└── js/
    ├── data.js             ← Données statiques : MATIERES, COURS, QUESTIONS, AI_KB
    ├── utils.js            ← Utilitaires partagés : showToast, formatResp, switchTab, updateCountdown
    ├── navigation.js       ← navigate(), openMatiere(), openCours(), sidebar toggle
    ├── quiz.js             ← État et logique du quiz (startQuiz → renderQuestion → showResults)
    ├── chat.js             ← Chat IA : réponses locales + stub callAnthropicAPI()
    └── app.js              ← Point d'entrée : init countdown + date du jour
```

## Architecture SPA

Toutes les "pages" sont des `<div class="page">` dans un seul `index.html`. La navigation fonctionne en basculant la classe `active` via `navigate(pageId, btn)` dans `navigation.js`. Pas de routing côté serveur.

Pages existantes : `accueil`, `dashboard`, `matieres`, `matiere` (détail dynamique), `cours` (contenu dynamique), `quiz`, `methodo`, `planning`, `ai`, `conseils`.

## Données

Toutes les données sont dans `js/data.js` sous forme de constantes globales :

- **`MATIERES`** — 5 matières (intro, civil, constit, institutions, methodo_m), chacune avec chapitres, progression et fiches
- **`COURS`** — Contenu HTML des cours, clé = `matiereId_chapIndex` (ex: `intro_0`)
- **`QUESTIONS`** — Questions de quiz par matière (intro: 8q, civil: 5q, constit: 5q)
- **`AI_KB`** — Base de connaissances locale pour les réponses du chat sans API

## Conventions CSS

- Variables dans `variables.css` : couleurs (`--gold`, `--emerald`, `--sapphire`, `--rose`, `--amber`, `--violet`), dimensions (`--sidebar: 260px`, `--radius: 16px`), transition (`--tr`)
- Pas de classes utilitaires sauf `.mb-24` et `.divider`
- Les inline styles dans le HTML (`style="width:42%;--fill-color:#c9a84c"`) sont intentionnels — ce sont des données dynamiques, pas du style structurel
- Grilles : `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto` (auto-fill minmax 280px)

## Ordre de chargement des scripts

Respecter cet ordre dans `index.html` (dépendances) :
1. `data.js` — pas de dépendances
2. `utils.js` — pas de dépendances
3. `navigation.js` — dépend de `data.js` et `utils.js`
4. `quiz.js` — dépend de `data.js` et `utils.js`
5. `chat.js` — dépend de `data.js` et `utils.js`
6. `app.js` — dépend de `utils.js`

Tous les scripts sont en bas de `<body>`, donc le DOM est prêt sans `DOMContentLoaded`.

## Fonctionnalités en place

- Navigation sidebar avec état actif
- Compte à rebours jusqu'au 01/09/2027
- Quiz interactif avec score, XP et explication par réponse
- Pages matière avec onglets Cours / Fiches
- Contenu de cours pour : `intro_0`, `intro_1`, `civil_0`, `constit_0` (les autres affichent un placeholder)
- Chat IA avec réponses locales (AI_KB) + stub pour l'API Anthropic
- Méthodologie avec 4 onglets (dissertation, cas pratique, commentaire d'arrêt, fiche d'arrêt)
- Planning avec timeline 2025–2027
- Toast de notification global

## Pour activer l'IA Claude

Dans `js/chat.js`, fonction `callAnthropicAPI()` : décommenter le bloc `fetch` et remplacer `TON_API_KEY` par une clé obtenue sur [console.anthropic.com](https://console.anthropic.com).

## Contraintes à respecter

- Ne pas changer le design (couleurs, typographie, layout)
- Ne pas introduire de framework ou build tool sans demande explicite
- Garder les fonctions globales (pas de modules ES) — les `onclick` inline dans le HTML en dépendent
- Si on ajoute un cours, ajouter la clé correspondante dans `COURS` dans `data.js`
- Si on ajoute une matière, l'ajouter dans `MATIERES` ET créer le bloc HTML correspondant dans `index.html`

## Lancer le projet

```bash
# Python
python -m http.server 8080

# Node.js
npx serve legalprep-l1
```

Ne pas ouvrir `index.html` directement en `file://` — les fichiers CSS/JS séparés ne se chargent pas sans serveur HTTP.
