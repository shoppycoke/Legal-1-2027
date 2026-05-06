// ═══════════════════════════════════════════════
// DONNÉES DES MATIÈRES
// ═══════════════════════════════════════════════
const MATIERES = {
  intro: {
    nom: 'Introduction au Droit',
    emoji: '⚖️',
    couleur: '#c9a84c',
    prog: 0,
    chapitres: [
      { t: "Qu'est-ce que le droit ?", done: false, xp: 120 },
      { t: 'Les sources du droit',      done: false, xp: 150 },
      { t: 'La hiérarchie des normes',  done: false, xp: 180 },
      { t: 'Les personnes juridiques',  done: false, xp: 150 },
      { t: 'Les droits subjectifs',     done: false, xp: 200 }
    ],
    fiches: [
      { terme: 'Droit objectif',        def: "Ensemble des règles juridiques qui régissent la vie en société. S'oppose aux droits subjectifs, qui sont les prérogatives d'un individu particulier." },
      { terme: 'Droit subjectif',       def: "Prérogative reconnue à un individu par le droit objectif. Ex : droit de propriété, droit à l'image. L'individu en est le \"titulaire\"." },
      { terme: 'Norme juridique',       def: "Règle de droit ayant un caractère obligatoire et sanctionné par l'État. Toute norme a une valeur hiérarchique déterminée par la pyramide de Kelsen." },
      { terme: 'Personnalité juridique', def: "Aptitude à être titulaire de droits et d'obligations. Les personnes physiques et morales (sociétés, associations) en sont dotées." }
    ]
  },

  civil: {
    nom: 'Droit Civil',
    emoji: '📜',
    couleur: '#10b981',
    prog: 0,
    chapitres: [
      { t: 'Formation du contrat',          done: false, xp: 200 },
      { t: 'Les obligations contractuelles', done: false, xp: 220 },
      { t: 'La responsabilité civile',       done: false, xp: 250 },
      { t: 'Les biens',                      done: false, xp: 180 },
      { t: 'La famille',                     done: false, xp: 300 }
    ],
    fiches: [
      { terme: 'Contrat',               def: "Accord de volontés entre deux ou plusieurs parties destiné à créer, modifier, transmettre ou éteindre des obligations. Art. 1101 Code civil." },
      { terme: 'Obligation',            def: "Lien de droit en vertu duquel une personne (débiteur) est tenue d'une prestation envers une autre (créancier). Peut être de donner, faire ou ne pas faire." },
      { terme: 'Responsabilité civile', def: "Obligation pour une personne de réparer le préjudice causé à autrui. Elle est délictuelle (hors contrat) ou contractuelle (inexécution d'un contrat)." }
    ]
  },

  constit: {
    nom: 'Droit Constitutionnel',
    emoji: '🏛️',
    couleur: '#f59e0b',
    prog: 0,
    chapitres: [
      { t: 'La Constitution de 1958',           done: false, xp: 160 },
      { t: 'Les institutions de la Ve République', done: false, xp: 200 },
      { t: 'Le Parlement',                       done: false, xp: 180 },
      { t: 'Le Gouvernement',                    done: false, xp: 180 },
      { t: 'Le Conseil constitutionnel',         done: false, xp: 220 }
    ],
    fiches: [
      { terme: 'Constitution',          def: "Loi fondamentale de l'État, au sommet de la hiérarchie des normes. Organise les pouvoirs publics et garantit les droits et libertés fondamentaux." },
      { terme: 'Ve République',         def: "Régime politique français depuis 1958. Exécutif fort (Président) + bicaméralisme parlementaire (Assemblée nationale + Sénat)." },
      { terme: 'Conseil constitutionnel', def: "Institution chargée de contrôler la constitutionnalité des lois. 9 membres nommés pour 9 ans. Saisi via la QPC depuis 2010." }
    ]
  },

  institutions: {
    nom: 'Institutions juridictionnelles',
    emoji: '🔨',
    couleur: '#3b82f6',
    prog: 0,
    chapitres: [
      { t: 'Organisation judiciaire française', done: false, xp: 160 },
      { t: 'Les juridictions civiles',           done: false, xp: 180 },
      { t: 'Les juridictions pénales',           done: false, xp: 180 },
      { t: 'La justice administrative',          done: false, xp: 200 }
    ],
    fiches: [
      { terme: 'Juridiction',          def: "Organe investi du pouvoir de juger les litiges. On distingue les juridictions civiles, pénales, administratives et constitutionnelles." },
      { terme: 'Cour de cassation',    def: "Juridiction suprême de l'ordre judiciaire. Contrôle l'application du droit par les juges du fond. Ne juge pas les faits." },
      { terme: 'Dualisme juridictionnel', def: "Coexistence en France de deux ordres : judiciaire (TJ, CA, Cour de cassation) et administratif (TA, CAA, Conseil d'État)." }
    ]
  },

  methodo_m: {
    nom: 'Méthodologie juridique',
    emoji: '✍️',
    couleur: '#8b5cf6',
    prog: 0,
    chapitres: [
      { t: 'La dissertation juridique', done: false, xp: 200 },
      { t: 'Le cas pratique',           done: false, xp: 200 },
      { t: "Le commentaire d'arrêt",    done: false, xp: 250 },
      { t: "La fiche d'arrêt",          done: false, xp: 150 }
    ],
    fiches: [
      { terme: 'Syllogisme juridique', def: "Raisonnement déductif : Majeure (règle de droit) → Mineure (application aux faits) → Conclusion. Base de tout raisonnement en droit." },
      { terme: 'Problématique',        def: "Question juridique précise à laquelle le devoir doit répondre. Naît de la tension entre les termes du sujet et le droit applicable." }
    ]
  }
};


// ═══════════════════════════════════════════════
// CONTENU DES COURS
// ═══════════════════════════════════════════════
const COURS = {
  intro_0: `
    <h2>Qu'est-ce que le droit ?</h2>
    <p>Le droit est un ensemble de <strong>règles de conduite</strong> qui régissent les rapports entre les individus au sein d'une société. Ces règles sont créées ou reconnues par l'État et leur respect est garanti par la contrainte publique.</p>
    <div class="highlight">📌 Le droit se distingue des règles morales ou sociales par son caractère <strong>obligatoire et sanctionné par l'État</strong>.</div>
    <h3>I. Les caractères de la règle de droit</h3>
    <p><strong>1. Générale</strong> — Elle s'applique à tous les individus placés dans la même situation, sans distinction de personnes.</p>
    <p><strong>2. Abstraite</strong> — Elle ne vise pas des situations particulières mais des catégories de comportements ou de personnes.</p>
    <p><strong>3. Obligatoire</strong> — Son respect n'est pas laissé à la libre appréciation des individus. Elle s'impose à tous.</p>
    <p><strong>4. Coercitive</strong> — Son non-respect peut entraîner des sanctions (amende, emprisonnement, nullité d'un acte, dommages-intérêts).</p>
    <div class="exemple">Paul conclut un contrat sans respecter les règles légales de formation. Ce contrat pourra être annulé par le juge.</div>
    <h3>II. Droit objectif vs droits subjectifs</h3>
    <p>Le <strong>droit objectif</strong> désigne l'ensemble du système juridique — toutes les règles en vigueur. C'est "le droit" en général.</p>
    <p>Les <strong>droits subjectifs</strong> sont les prérogatives que le droit objectif reconnaît à un individu. Ex : mon droit de propriété sur ma maison, mon droit à l'image.</p>
    <div class="highlight">🎯 À retenir : "Le droit objectif est la règle du jeu. Les droits subjectifs sont les atouts que j'ai dans ma main."</div>
  `,

  intro_1: `
    <h2>Les sources du droit</h2>
    <p>Les sources du droit désignent les différents procédés par lesquels naissent les règles juridiques. En France, ces sources sont <strong>hiérarchisées</strong>.</p>
    <div class="highlight">📌 On distingue les sources écrites (loi, règlement, traités) et les sources non écrites (coutume, jurisprudence, doctrine).</div>
    <h3>I. Les sources écrites</h3>
    <p>La <strong>Constitution</strong> est au sommet. Toute loi contraire à la Constitution est nulle (contrôle de constitutionnalité).</p>
    <p>Les <strong>traités internationaux</strong> ont une valeur supérieure aux lois ordinaires (art. 55 Const.), sous réserve de réciprocité.</p>
    <p>La <strong>loi</strong> est votée par le Parlement. Elle fixe les règles dans les matières listées à l'article 34 de la Constitution.</p>
    <p>Le <strong>règlement</strong> émane du pouvoir exécutif (décrets, arrêtés). Il complète la loi.</p>
    <h3>II. Les sources non écrites</h3>
    <p>La <strong>coutume</strong> est une pratique ancienne et répétée, considérée comme obligatoire. Elle joue un rôle en droit commercial.</p>
    <p>La <strong>jurisprudence</strong> désigne l'ensemble des décisions de justice. Bien qu'officiellement elle ne soit pas une source en droit français, elle joue en pratique un rôle normatif majeur.</p>
    <div class="exemple">La Cour de cassation avait refusé la théorie de l'imprévision jusqu'en 2016. La réforme du droit des contrats l'a consacrée à l'art. 1195 C.civ.</div>
  `,

  civil_0: `
    <h2>La formation du contrat</h2>
    <p>Le contrat est défini à l'article 1101 du Code civil comme « un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations ».</p>
    <h3>I. Les conditions de validité (art. 1128 C.civ)</h3>
    <p>Depuis la réforme de 2016, trois conditions sont nécessaires :</p>
    <p><strong>1. Le consentement non vicié</strong> — Les parties doivent vouloir librement contracter. Le consentement est vicié par l'erreur, le dol (tromperie) ou la violence.</p>
    <p><strong>2. La capacité des parties</strong> — Les mineurs non émancipés et les majeurs sous tutelle sont incapables de contracter seuls.</p>
    <p><strong>3. Un contenu licite et certain</strong> — L'objet du contrat doit être possible, déterminé ou déterminable, et ne pas être contraire à l'ordre public.</p>
    <div class="highlight">⚠️ L'ancienne condition de "cause" a été abandonnée par la réforme de 2016, mais son esprit est conservé dans la notion de contenu licite.</div>
    <h3>II. La formation du contrat : offre et acceptation</h3>
    <p>Le contrat se forme par la <strong>rencontre d'une offre et d'une acceptation</strong>. L'offre doit être ferme et précise. L'acceptation doit être pure et simple.</p>
    <div class="exemple">Marie propose de vendre sa voiture à Paul pour 8 000 €. Paul répond "d'accord". Le contrat est formé dès cette acceptation.</div>
  `,

  constit_0: `
    <h2>La Constitution de 1958</h2>
    <p>La Constitution du 4 octobre 1958 est le texte fondateur de la Ve République. Elle a été rédigée sous l'impulsion du général de Gaulle, dans un contexte de crise politique liée à la guerre d'Algérie.</p>
    <h3>I. Structure et contenu</h3>
    <p>La Constitution comprend un <strong>préambule</strong> (qui renvoie à la DDHC de 1789, au préambule de 1946 et à la Charte de l'environnement de 2004) et <strong>15 titres</strong> organisant les institutions.</p>
    <div class="highlight">📌 Le "bloc de constitutionnalité" comprend la Constitution + le préambule + la DDHC + le préambule de 1946 + la Charte de l'environnement.</div>
    <h3>II. Les principes fondamentaux</h3>
    <p>Art. 1er : "La France est une République indivisible, laïque, démocratique et sociale." Ce premier article contient les valeurs fondamentales de la République française.</p>
    <p>La Constitution organise la <strong>séparation des pouvoirs</strong> entre l'exécutif (Président + Gouvernement), le législatif (Parlement) et le judiciaire (autorité judiciaire).</p>
    <div class="exemple">La révision constitutionnelle de 2008 a introduit la QPC (Question Prioritaire de Constitutionnalité), permettant à tout citoyen de contester la constitutionnalité d'une loi devant le Conseil constitutionnel.</div>
  `
};


// ═══════════════════════════════════════════════
// QUESTIONS DES QUIZ
// ═══════════════════════════════════════════════
const QUESTIONS = {
  intro: [
    {
      q: "Quelle est la définition du droit objectif ?",
      opts: ["Les règles qui s'appliquent à l'État seulement", "L'ensemble des règles juridiques régissant la vie en société", "Les droits reconnus à un individu particulier", "Les décisions de justice"],
      rep: 1,
      expl: "Le droit objectif est l'ensemble des règles juridiques qui s'imposent à tous les membres d'une société. À distinguer des droits subjectifs, qui sont les prérogatives d'un individu."
    },
    {
      q: "Au sommet de la hiérarchie des normes françaises se trouve :",
      opts: ["La loi ordinaire", "Le traité international", "La Constitution", "Le règlement"],
      rep: 2,
      expl: "La pyramide de Kelsen place la Constitution au sommet. Toute norme inférieure doit lui être conforme, sous peine de nullité."
    },
    {
      q: "Qu'est-ce qu'une règle de droit impérative ?",
      opts: ["Une règle que les parties peuvent écarter par contrat", "Une règle à laquelle on ne peut pas déroger", "Une règle applicable uniquement aux commerçants", "Une recommandation sans caractère obligatoire"],
      rep: 1,
      expl: "Une règle impérative (d'ordre public) s'impose à tous sans possibilité d'y déroger. À l'opposé, les règles supplétives peuvent être écartées par la volonté des parties."
    },
    {
      q: "La jurisprudence désigne :",
      opts: ["Uniquement les décisions du Conseil d'État", "L'ensemble des décisions de justice rendues par les tribunaux", "Les textes publiés au Journal officiel", "Les avis doctrinaux des professeurs de droit"],
      rep: 1,
      expl: "La jurisprudence désigne l'ensemble des décisions rendues par les juridictions. Bien qu'officiellement elle ne soit pas une source de droit en France, elle joue en pratique un rôle normatif considérable."
    },
    {
      q: "Quelle est la valeur des traités internationaux par rapport à la loi en droit français ?",
      opts: ["Inférieure à la loi", "Égale à la loi", "Supérieure à la loi sous réserve de réciprocité", "Supérieure à la Constitution"],
      rep: 2,
      expl: "L'article 55 de la Constitution dispose que les traités régulièrement ratifiés ont une autorité supérieure à celle des lois, sous réserve de réciprocité."
    },
    {
      q: "La personnalité juridique des personnes physiques commence :",
      opts: ["À partir de 18 ans", "Dès la naissance, à condition d'être né vivant et viable", "Seulement si elles sont françaises", "Dès la conception, sans condition"],
      rep: 1,
      expl: "La personnalité juridique commence à la naissance, à condition que l'enfant naisse vivant et viable. La règle 'infans conceptus' permet toutefois de prendre en compte l'intérêt de l'enfant conçu."
    },
    {
      q: "Le principe de non-rétroactivité de la loi signifie :",
      opts: ["La loi ne peut pas être modifiée après son adoption", "La loi nouvelle ne s'applique pas aux situations passées", "La loi s'applique à tout le monde sans exception", "La loi ne concerne que les situations futures"],
      rep: 1,
      expl: "En droit civil, la loi ne dispose que pour l'avenir (art. 2 C.civ). Elle ne s'applique pas rétroactivement aux situations constituées avant son entrée en vigueur."
    },
    {
      q: "Qu'est-ce que le principe de légalité en droit pénal ?",
      opts: ["Seule la loi peut créer des infractions et des peines", "Le juge peut créer des règles nouvelles", "Toutes les normes ont la même valeur", "L'État peut agir sans fondement juridique"],
      rep: 0,
      expl: "Le principe de légalité (nullum crimen, nulla poena sine lege) : nul ne peut être condamné pour un acte non prévu et puni par la loi. C'est un pilier de l'État de droit."
    }
  ],

  civil: [
    {
      q: "Selon l'article 1101 du Code civil, le contrat est :",
      opts: ["Un acte unilatéral créant des obligations", "Un accord de volontés entre deux ou plusieurs parties", "Une décision de justice", "Une loi votée par le Parlement"],
      rep: 1,
      expl: "L'article 1101 C.civ définit le contrat comme 'un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations'."
    },
    {
      q: "Quelles sont les conditions de validité d'un contrat (depuis 2016) ?",
      opts: ["Consentement, capacité, objet, cause", "Consentement non vicié, capacité, contenu licite et certain", "Écrit, signature, témoins", "Offre, acceptation, remise de la chose"],
      rep: 1,
      expl: "Depuis la réforme de 2016 : consentement non vicié, capacité des parties, contenu licite et certain (art. 1128 C.civ). La 'cause' a été abandonnée comme terme."
    },
    {
      q: "Les vices du consentement sont :",
      opts: ["L'erreur, le dol, la violence", "L'incapacité, l'erreur, le défaut de forme", "La violence, l'incapacité, l'objet illicite", "L'erreur, la lésion, le dol"],
      rep: 0,
      expl: "Les trois vices du consentement : l'erreur (fausse croyance), le dol (manœuvres frauduleuses) et la violence (contrainte). Ils entraînent la nullité relative du contrat."
    },
    {
      q: "La force majeure en droit des contrats exige :",
      opts: ["Seulement l'imprévisibilité", "L'imprévisibilité, l'irrésistibilité et l'extériorité", "Seulement que l'événement soit externe", "Uniquement l'irrésistibilité"],
      rep: 1,
      expl: "La force majeure (art. 1218 C.civ) est un événement imprévisible lors de la conclusion du contrat, irrésistible dans son exécution, et extérieur à la volonté du débiteur. Conditions cumulatives."
    },
    {
      q: "En matière de responsabilité délictuelle, les trois conditions pour engager la responsabilité sont :",
      opts: ["Une faute, un dommage, un lien de causalité", "Une faute intentionnelle, un dommage grave, un témoin", "Un contrat, une faute, une victime", "Un préjudice et une faute seulement"],
      rep: 0,
      expl: "La responsabilité délictuelle (art. 1240 C.civ) requiert cumulativement : une faute (ou fait de la chose), un dommage réparable, et un lien de causalité direct entre les deux."
    }
  ],

  constit: [
    {
      q: "Quel est le régime politique de la France depuis 1958 ?",
      opts: ["République parlementaire pure", "Régime présidentiel", "Régime semi-présidentiel (Ve République)", "Monarchie constitutionnelle"],
      rep: 2,
      expl: "La Ve République (1958) est souvent qualifiée de régime semi-présidentiel. Le Président dispose de pouvoirs importants mais le gouvernement répond devant le Parlement."
    },
    {
      q: "Le Conseil constitutionnel est composé de :",
      opts: ["7 membres nommés à vie", "9 membres nommés pour 9 ans non renouvelables", "12 juges élus par le Parlement", "5 membres nommés par le Président seulement"],
      rep: 1,
      expl: "9 membres pour 9 ans non renouvelables : 3 nommés par le Président de la République, 3 par le Président de l'Assemblée nationale, 3 par le Président du Sénat."
    },
    {
      q: "La QPC (Question Prioritaire de Constitutionnalité) permet :",
      opts: ["Au gouvernement de bloquer une loi", "À tout justiciable de contester la constitutionnalité d'une loi applicable à son litige", "Au Parlement de modifier la Constitution", "Au Conseil d'État de contrôler les lois"],
      rep: 1,
      expl: "Introduite en 2008 (art. 61-1 Const.) et en vigueur depuis 2010, la QPC permet à tout citoyen de contester la constitutionnalité d'une loi lors d'un procès."
    },
    {
      q: "L'article 49 alinéa 3 de la Constitution permet :",
      opts: ["De dissoudre le Parlement", "Au Premier ministre d'engager sa responsabilité sur un texte, sans vote", "De légiférer par ordonnances", "De convoquer un référendum"],
      rep: 1,
      expl: "L'art. 49-3 permet au Premier ministre d'engager la responsabilité du gouvernement sur un texte. Ce texte est adopté sans vote sauf si l'Assemblée vote une motion de censure dans les 24h."
    },
    {
      q: "Qui nomme le Premier ministre en France ?",
      opts: ["L'Assemblée nationale", "Le Sénat", "Le Président de la République", "Le peuple par élection directe"],
      rep: 2,
      expl: "Le Premier ministre est nommé par le Président de la République (art. 8 Const.). En pratique, le Président nomme le chef de la majorité parlementaire."
    }
  ]
};


// ═══════════════════════════════════════════════
// BASE DE CONNAISSANCES IA (RÉPONSES LOCALES)
// ═══════════════════════════════════════════════
const AI_KB = {
  "droit objectif": "Le **droit objectif** est l'ensemble des règles juridiques qui régissent la vie en société et s'imposent à tous.\n\n🔑 À distinguer des **droits subjectifs** : ce sont les prérogatives que le droit objectif reconnaît à *un individu particulier*. Ton droit de propriété sur ta maison, c'est un droit subjectif.",
  "hiérarchie": "La **hiérarchie des normes** (pyramide de Kelsen) :\n\n1. 🏛️ **Constitution** (+ bloc de constitutionnalité)\n2. 🌍 Traités internationaux / Droit UE\n3. 📜 **Lois** (organiques et ordinaires)\n4. 📋 **Règlements** (décrets, arrêtés)\n\nChaque norme inférieure doit être conforme à la norme supérieure. Une loi qui viole la Constitution → elle est inconstitutionnelle !",
  "public et privé": "Grande distinction fondamentale !\n\n⚖️ **Droit public** : règles régissant l'État et ses rapports avec les particuliers (droit constitutionnel, administratif, fiscal…)\n\n📜 **Droit privé** : règles régissant les rapports entre particuliers (droit civil, commercial, du travail…)\n\n💡 Juridictions différentes : ordre administratif (Conseil d'État) pour le public, ordre judiciaire (Cour de cassation) pour le privé.",
  "dissertation": "**Méthode dissertation juridique** en 5 étapes :\n\n1️⃣ Analyser le sujet — Définir chaque mot, délimiter\n2️⃣ Trouver la problématique — La tension juridique du sujet\n3️⃣ Construire le plan — Toujours 2 parties (I./II.) avec A. et B.\n4️⃣ L'introduction — Accroche → Définitions → Intérêt → Problématique → Annonce\n5️⃣ Le développement — Chaque argument appuyé sur du droit positif\n\n⚠️ **Jamais de plan en 3 parties** en droit français !",
  "contrat": "Le **contrat** est défini à l'article 1101 du Code civil comme « un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations ».\n\n📋 Conditions de validité (art. 1128) :\n✅ Consentement **non vicié** (pas d'erreur, dol ou violence)\n✅ **Capacité** des parties\n✅ Contenu **licite et certain**\n\nSi une condition manque → nullité du contrat !",
  "cour de cassation": "La **Cour de cassation** est la juridiction suprême de l'ordre judiciaire français.\n\n🔍 Elle ne juge pas les *faits* mais contrôle l'application du *droit* par les juges du fond. Elle peut :\n- **Rejeter** le pourvoi (la décision attaquée est correcte)\n- **Casser** l'arrêt et renvoyer devant une autre juridiction\n\n📍 Elle siège à Paris, Palais de justice, île de la Cité."
};
