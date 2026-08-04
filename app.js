/* ============================================================
   CallistheniLeyrat — app.js
   Données : localStorage, préfixées par profil (quentin_ / sophie_)
   ============================================================ */

// ─── Données des exercices ────────────────────────────────────
const EXERCISES = {
  "Montées de genoux": {
    desc: "Monter alternativement les genoux vers la poitrine en touchant le genou avec le coude opposé. Garder un rythme régulier et souffler lors de la montée.",
    tip: "Version facile : marche active sur place, sans toucher le coude. Garde les épaules relâchées.",
    muscles: ["Abdos", "Cardio", "Coordination"],
    difficulty: 1,
    errors: ["Ne pas creuser le dos", "Éviter de pencher le buste en avant"],
    variantEasy: "Marche rapide sur place",
    variantHard: "Genoux plus hauts, rythme plus rapide",
    imagePath: "exercices/montees-genoux.avif"
  },
  "Footing sur place": {
    desc: "Courir sur place à allure modérée. Respirer naturellement, garder le buste droit.",
    tip: "Version facile : marche rapide. Atterris sur l'avant du pied pour moins de bruit.",
    muscles: ["Cardio", "Mollets", "Jambes"],
    difficulty: 1,
    errors: ["Ne pas frapper le sol avec le talon", "Éviter de se pencher trop en avant"],
    variantEasy: "Marche rapide sur place",
    variantHard: "Genoux hauts (high knees) à vitesse maximale",
    imagePath: "exercices/footing-place.avif"
  },
  "Squats": {
    desc: "Pieds légèrement plus larges que les hanches. Reculer les fesses comme pour s'asseoir, dos droit. Descendre jusqu'aux cuisses proches de l'horizontale, remonter en poussant dans les talons.",
    tip: "Imagine que tu t'assoies sur une chaise derrière toi. Les genoux suivent la direction des orteils.",
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
    difficulty: 1,
    errors: ["Genoux qui rentrent vers l'intérieur", "Dos qui se courbe", "Talons qui décollent"],
    variantEasy: "Squats avec appui sur une chaise",
    variantHard: "Squat sauté (jump squat)",
    imagePath: "exercices/squat.avif"
  },
  "Dips chaise": {
    desc: "Mains sur le bord d'une chaise stable, fessiers devant la chaise. Fléchir les coudes vers l'arrière, descendre puis repousser. Garder la poitrine ouverte.",
    tip: "Version facile : pieds proches de la chaise. Attention à ne pas hausser les épaules.",
    muscles: ["Triceps", "Épaules", "Pectoraux"],
    difficulty: 2,
    errors: ["Épaules qui remontent vers les oreilles", "Coudes qui s'écartent sur les côtés"],
    variantEasy: "Pieds très proches, peu de descente",
    variantHard: "Jambes tendues et surélevées",
    imagePath: "exercices/dips.avif"
  },
  "Pompes mur": {
    desc: "Mains sur le mur à largeur d'épaules, corps gainé. Plier les bras pour approcher la poitrine du mur, repousser pour revenir.",
    tip: "Plus tes pieds sont loin du mur, plus c'est difficile. Garde le ventre rentré.",
    muscles: ["Pectoraux", "Triceps", "Épaules"],
    difficulty: 1,
    errors: ["Bassin qui tombe", "Coudes qui s'écartent à 90°"],
    variantEasy: "Mains plus hautes sur le mur",
    variantHard: "Pompes sur une table inclinée",
    imagePath: "exercices/pompes-mur.avif"
  },
  "Pompes genoux": {
    desc: "Au sol sur les genoux, corps aligné de la tête aux genoux. Descendre contrôlé, remonter en soufflant.",
    tip: "Pose une serviette sous les genoux si inconfort. Regarde le sol, pas devant toi.",
    muscles: ["Pectoraux", "Triceps", "Abdos"],
    difficulty: 2,
    errors: ["Fesses en l'air", "Corps qui n'est pas aligné", "Coudes trop écartés"],
    variantEasy: "Pompes mur",
    variantHard: "Pompes au sol sur les orteils",
    imagePath: "exercices/pompes-mur.avif"
  },
  "Pompes sol": {
    desc: "Corps en planche complète, mains sous les épaules. Garder les abdos serrés tout le mouvement.",
    tip: "Si les hanches montent ou descendent, reviens aux pompes genoux.",
    muscles: ["Pectoraux", "Triceps", "Abdos", "Épaules"],
    difficulty: 3,
    errors: ["Hanches trop hautes ou trop basses", "Regard vers l'avant au lieu du sol"],
    variantEasy: "Pompes genoux",
    variantHard: "Pompes diamant, pompes déclinées",
    imagePath: "exercices/pompes-sol.avif"
  },
  "Pont fessier": {
    desc: "Allongé sur le dos, pieds à plat près des fesses. Lever le bassin jusqu'à aligner épaules, hanches et genoux. Redescendre lentement.",
    tip: "Tiens 1 à 2 secondes en haut et serre les fessiers fort.",
    muscles: ["Fessiers", "Ischio-jambiers", "Lombaires"],
    difficulty: 1,
    errors: ["Bassin qui ne monte pas assez", "Genoux qui s'écartent"],
    variantEasy: "Amplitude réduite",
    variantHard: "Pont fessier sur une jambe",
    imagePath: "exercices/pont-fessiers.avif"
  },
  "Chaise": {
    desc: "Dos contre le mur, descendre jusqu'à former un angle proche de 90°. Maintenir la position avec les abdos engagés.",
    tip: "Version facile : descends moins bas. Respire régulièrement, ne retiens pas ton souffle.",
    muscles: ["Quadriceps", "Fessiers", "Mollets"],
    difficulty: 2,
    errors: ["Dos décollé du mur", "Genoux devant les orteils"],
    variantEasy: "Angle moins profond (120°)",
    variantHard: "Lever alternativement un talon",
    imagePath: "exercices/chaise.avif"
  },
  "Gainage face": {
    desc: "Sur les coudes ou les mains, corps en planche. Contracter les abdominaux. Maintenir sans creuser le dos.",
    tip: "Version facile : genoux au sol. Regarde le sol, contracte les fesses et le ventre.",
    muscles: ["Abdos", "Lombaires", "Épaules"],
    difficulty: 2,
    errors: ["Dos creusé ou arrondi", "Fesses trop hautes", "Retenir sa respiration"],
    variantEasy: "Gainage sur les genoux",
    variantHard: "Gainage avec levé de jambe alterné",
    imagePath: "exercices/gainage-face.avif"
  },
  "Gainage côté": {
    desc: "Appui sur un coude et les genoux ou les pieds. Corps aligné, maintenir la position sans laisser tomber le bassin.",
    tip: "Version facile : genou du bas au sol. Lève légèrement la hanche si tu veux plus de difficulté.",
    muscles: ["Obliques", "Abdos", "Épaules"],
    difficulty: 2,
    errors: ["Bassin qui s'affaisse", "Épaule qui remonte"],
    variantEasy: "Genoux au sol",
    variantHard: "Lever la jambe du dessus",
    imagePath: "exercices/gainage-cote.avif"
  },
  "Superman": {
    desc: "Allongé sur le ventre, lever simultanément bras et jambes. Garder la tête dans l'alignement du dos. Redescendre lentement.",
    tip: "Tiens 2 secondes en haut. Ne force pas si tu sens une douleur dans le bas du dos.",
    muscles: ["Lombaires", "Fessiers", "Épaules"],
    difficulty: 1,
    errors: ["Nuque cassée (tête trop relevée)", "Mouvement trop brusque"],
    variantEasy: "Lever un bras et la jambe opposée",
    variantHard: "Tenir 5 secondes en haut",
    imagePath: "exercices/superman.avif"
  },
  "Fentes": {
    desc: "Faire un grand pas en avant, descendre en pliant les deux jambes. Garder le buste droit. Revenir à la position de départ.",
    tip: "Version facile : petite amplitude ou appui à un mur pour l'équilibre.",
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
    difficulty: 2,
    errors: ["Genou avant qui dépasse les orteils", "Buste penché en avant"],
    variantEasy: "Fentes statiques avec appui",
    variantHard: "Fentes marchées ou sautées",
    imagePath: "exercices/fentes.avif"
  },
  "Jumping jack": {
    desc: "Sauter en écartant jambes et bras simultanément. Revenir en position initiale. Maintenir un rythme régulier.",
    tip: "Version facile : sans saut, un pied après l'autre. Atterrissage amorti, genoux fléchis.",
    muscles: ["Cardio", "Épaules", "Jambes"],
    difficulty: 1,
    errors: ["Atterrissage rigide sur les talons", "Bras qui ne montent pas assez"],
    variantEasy: "Version sans saut (step jack)",
    variantHard: "Jumping jack avec squat",
    imagePath: "exercices/jumping-jack.avif"
  },
  "Mountain climbers": {
    desc: "Position de planche, ramener alternativement les genoux vers la poitrine. Garder le bassin stable.",
    tip: "Version facile : lentement, mains sur une table surélevée. Garde les hanches basses.",
    muscles: ["Abdos", "Cardio", "Épaules"],
    difficulty: 3,
    errors: ["Bassin qui monte et descend", "Épaules qui reculent"],
    variantEasy: "Version lente sur table",
    variantHard: "Version rapide (sprint)",
    imagePath: "exercices/mountain-climbers.avif"
  },
  "Étirements": {
    desc: "Respiration lente et profonde. Psoas, dos, ischios, mollets, quadriceps. Ne jamais forcer.",
    tip: "Tiens chaque étirement 30 à 60 secondes. C'est une séance à part entière, pas une option !",
    muscles: ["Mobilité", "Récupération"],
    difficulty: 1,
    errors: ["Forcer sur une douleur", "Étirer à froid"],
    variantEasy: "Étirements allongés au sol",
    variantHard: "Yoga dynamique",
    imagePath: ""
  }
};

// ─── Étirements recommandés par groupe musculaire ─────────────
const STRETCHES = {
  "Quadriceps":       { name: "Étirement quadriceps",       desc: "Debout, attrape ta cheville derrière toi et tire doucement. Genou pointé vers le bas.", emoji: "🦵" },
  "Ischio-jambiers":  { name: "Étirement ischio-jambiers",  desc: "Assis jambe tendue, penche le buste vers les orteils. Garde le dos droit.", emoji: "🦵" },
  "Fessiers":         { name: "Étirement fessiers",         desc: "Allongé, croise une cheville sur le genou opposé et tire la jambe vers toi.", emoji: "🍑" },
  "Mollets":          { name: "Étirement mollets",          desc: "Appui contre le mur, jambe arrière tendue, talon au sol. Pousse le mur.", emoji: "🦵" },
  "Pectoraux":        { name: "Ouverture pectoraux",        desc: "Bras tendu contre un montant, tourne le corps pour sentir l'étirement.", emoji: "💪" },
  "Triceps":          { name: "Étirement triceps",          desc: "Passe un bras derrière la tête, coude plié. L'autre main tire le coude doucement.", emoji: "💪" },
  "Épaules":          { name: "Étirement épaules",          desc: "Passe un bras à l'horizontal, l'autre bras le ramène vers la poitrine.", emoji: "🤸" },
  "Lombaires":        { name: "Étirement lombaires",        desc: "Allongé sur le dos, ramène les deux genoux sur la poitrine. Bascule doucement.", emoji: "🧘" },
  "Abdos":            { name: "Étirement abdominaux",       desc: "Allongé sur le ventre, mains sous les épaules, pousse pour lever le buste (cobra).", emoji: "🧘" },
  "Obliques":         { name: "Étirement obliques",         desc: "Debout, un bras levé au-dessus de la tête, incline le buste de côté.", emoji: "🤸" },
  "Cardio":           { name: "Respiration et mobilité",    desc: "Respirations profondes, rotations des chevilles et des hanches pour activer la circulation.", emoji: "💨" },
  "Jambes":           { name: "Étirement jambes globales",  desc: "Écarte les pieds à 2x la largeur des épaules, descends lentement en plié.", emoji: "🦵" },
  "Coordination":     { name: "Activation neuromusculaire", desc: "Rotations lentes des poignets, chevilles et hanches. Mouvements doux et contrôlés.", emoji: "🤸" },
};

function getStretchesForMuscles(muscles) {
  const seen = new Set();
  const result = [];
  muscles.forEach(m => {
    if (STRETCHES[m] && !seen.has(m)) {
      seen.add(m);
      result.push(STRETCHES[m]);
    }
  });
  return result.slice(0, 2); // max 2 étirements avant un exercice
}

// ─── Programme (repris de preview.html, étendu) ───────────────
function baseWeek(day) {
  const d = ((day - 1) % 7) + 1;
  return ["Complet doux", "Bas du corps", "Haut du corps", "Étirements", "Abdos / dos", "Bas du corps", "Haut du corps"][d - 1];
}

function cycleNumber(day) {
  return Math.floor((day - 1) / 28) + 1;
}

function isRestDay(day) {
  const d = ((day - 1) % 7) + 1;
  return d === 4; // Étirements = jour de récup
}

function workout(day, diffOffset = 0) {
  const c = cycleNumber(day);
  const d = ((day - 1) % 7) + 1;
  const hard = c - 1;
  const rest = Math.max(30, 60 - (c - 1) * 5);

  // Durée par série : commence à 30s, +5s par cycle, +5s par cran de difficulté
  let t = 30 + Math.min(30, hard * 5) + diffOffset * 5;
  t = Math.max(20, Math.min(t, 90));

  // Gainage/chaise : durée de maintien (un peu moins longue)
  let plank = 25 + Math.min(35, hard * 5) + diffOffset * 5;
  plank = Math.max(20, Math.min(plank, 75));

  const title = baseWeek(day);
  let list = [];

  if (day <= 14) {
    if (d === 1) list = [`Montées de genoux — 3 x 30s`, `Squats — 3 x 30s`, `Dips chaise — 3 x 25s`, `Pompes mur — 3 x 25s`];
    if (d === 2) list = [`Footing sur place — 3 x 45s`, `Squats — 3 x 30s`, `Pont fessier — 3 x 30s`, `Chaise — 3 x 30s`];
    if (d === 3) list = [`Montées de genoux — 3 x 30s`, `Pompes mur — 3 x 25s`, `Dips chaise — 3 x 25s`, `Pompes genoux — 3 x 25s`];
    if (d === 4) list = [`Étirements — 10 à 15 min`];
    if (d === 5) list = [`Montées de genoux — 3 x 30s`, `Squats — 3 x 30s`, `Gainage côté — 2 x 25s par côté`, `Superman — 3 x 25s`];
    if (d === 6) list = [`Montées de genoux — 3 x 30s`, `Squats — 3 x 30s`, `Pont fessier — 3 x 30s`, `Fentes — 2 x 30s par jambe`];
    if (d === 7) list = [`Footing sur place — 3 x 45s`, `Pompes mur — 3 x 25s`, `Gainage face — 3 x 25s`, `Dips chaise — 3 x 25s`];
    return { title, list, note: "Récupération : 1 min entre exercices, 30s entre séries.", isRest: d === 4 };
  }

  const circuit = {
    1: ["Jumping jack", "Fentes", "Pont fessier", "Gainage face", "Pompes mur"],
    2: ["Footing sur place", "Chaise", "Pont fessier", "Squats", "Fentes"],
    3: ["Montées de genoux", "Pompes mur", "Dips chaise", "Pompes genoux", "Mountain climbers"],
    4: ["Jumping jack", "Gainage côté droit", "Gainage côté gauche", "Gainage face", "Superman"],
    5: ["Étirements"],
    6: ["Jumping jack", "Fentes", "Chaise", "Pont fessier", "Squats"],
    7: ["Montées de genoux", "Pompes genoux", "Dips chaise", "Pompes sol", "Gainage face"]
  };

  if (d === 5) return { title, list: ["Étirements — 12 à 20 min"], note: "Prends soin de toi, c'est une séance à part entière !", isRest: true };

  let rounds = day <= 21 ? 2 : 3;
  rounds += Math.max(0, c - 1) + diffOffset;
  rounds = Math.max(1, Math.min(rounds, 6));

  // Tous les exercices sont maintenant basés sur le temps
  list = circuit[d].map(x => {
    const isStatic = x.includes('Gainage') || x === 'Chaise';
    const dur = isStatic ? plank : t;
    return `${x} — ${dur}s`;
  });

  return {
    title: `${title} — circuit ${rounds} tour${rounds > 1 ? 's' : ''}`,
    list,
    note: `${t}s d'effort, ${rest}s de repos entre exercices.`,
    isRest: false
  };
}


function setSyncIndicator(state) {
  // state: '' | 'syncing' | 'synced' | 'sync-error'
  const el = document.getElementById('syncIndicator');
  if (!el) return;
  el.className = 'sync-indicator' + (state ? ' ' + state : '');
  if (state === 'syncing') {
    el.textContent = '↕ Sync…';
  } else if (state === 'synced') {
    el.textContent = '✓ Sync';
    setTimeout(() => { el.className = 'sync-indicator'; el.textContent = ''; }, 3000);
  } else if (state === 'sync-error') {
    el.textContent = '⚠ Hors-ligne';
    setTimeout(() => { el.className = 'sync-indicator'; el.textContent = ''; }, 4000);
  } else {
    el.textContent = '';
  }
}


// ─── Gestion des profils / localStorage ──────────────────────
let currentUser = null; // 'quentin' | 'sophie'

function key(k) {
  return `${currentUser}_${k}`;
}

function store(k, v) {
  localStorage.setItem(key(k), typeof v === 'object' ? JSON.stringify(v) : String(v));
}

function load(k, fallback = null) {
  const v = localStorage.getItem(key(k));
  if (v === null) return fallback;
  try { return JSON.parse(v); } catch { return v; }
}

// Migration des anciennes données (non préfixées) vers quentin_
function migrateOldData() {
  if (localStorage.getItem('_migrated_v1')) return;
  const oldStart = localStorage.getItem('startDate');
  const oldLevel = localStorage.getItem('level');
  if (oldStart && !localStorage.getItem('quentin_startDate')) {
    localStorage.setItem('quentin_startDate', oldStart);
  }
  if (oldLevel && !localStorage.getItem('quentin_level')) {
    localStorage.setItem('quentin_level', oldLevel);
  }
  // Migrer les séances faites
  for (let i = 1; i <= 365; i++) {
    const v = localStorage.getItem('done_' + i);
    if (v && !localStorage.getItem('quentin_done_' + i)) {
      localStorage.setItem('quentin_done_' + i, v);
    }
  }
  localStorage.setItem('_migrated_v1', '1');
}

// ─── Calcul du jour actuel ────────────────────────────────────
function getStartDate() {
  return load('startDate') || new Date().toISOString().slice(0, 10);
}

function dayNumber() {
  const s = new Date(getStartDate() + 'T00:00:00');
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return Math.max(1, Math.floor((n - s) / 86400000) + 1);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Séances réalisées ───────────────────────────────────────
function isDone(day) {
  return !!load('done_' + day);
}

function markDone(day, feedback = 'ok') {
  store('done_' + day, '1');
  store('feedback_' + day, feedback);
  awardXP(day);
  checkBadges();
  saveStreak();
  stopSessionTimer(); // Feature 4: arrêter le minuteur de séance
  if (typeof syncToFirestore === 'function') syncToFirestore();
}

// ─── Système RPG ─────────────────────────────────────────────
const RPG_LEVELS = [
  { name: 'Débutant', xp: 0 },
  { name: 'Apprenti', xp: 500 },
  { name: 'Confirmé', xp: 1500 },
  { name: 'Avancé', xp: 3500 },
  { name: 'Expert', xp: 7000 },
  { name: 'Maître', xp: 12000 }
];

function getXP() { return load('xp', 0); }
function addXP(amount) { store('xp', getXP() + amount); }

function getRPGLevel() {
  const xp = getXP();
  let lvl = 0;
  for (let i = RPG_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= RPG_LEVELS[i].xp) { lvl = i; break; }
  }
  return lvl;
}

function getRPGInfo() {
  const xp = getXP();
  const lvl = getRPGLevel();
  const current = RPG_LEVELS[lvl];
  const next = RPG_LEVELS[lvl + 1] || null;
  const xpInLevel = xp - current.xp;
  const xpNeeded = next ? next.xp - current.xp : 1;
  const pct = next ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)) : 100;
  return { xp, lvl, name: current.name, next: next?.name || null, pct, xpToNext: next ? next.xp - xp : 0 };
}

function getStreak() {
  const today = dayNumber();
  let streak = 0;
  for (let i = today; i >= 1; i--) {
    if (isDone(i) || isRestDay(i)) streak++;
    else break;
  }
  return streak;
}

function getBestStreak() {
  return load('bestStreak', 0);
}

function saveStreak() {
  const s = getStreak();
  if (s > getBestStreak()) store('bestStreak', s);
}

function countDoneSessions() {
  let count = 0;
  for (let i = 1; i <= dayNumber() + 1; i++) {
    if (isDone(i)) count++;
  }
  return count;
}

function awardXP(day) {
  let xp = 100;
  const prev = day > 1 ? isDone(day - 1) : true;
  if (prev) xp += 20;
  const streak = getStreak();
  xp += streak * 10;
  addXP(xp);
  return xp;
}

// ─── Badges ───────────────────────────────────────────────────
const BADGES = [
  { id: 'first',     icon: '🏅', name: 'Première séance',        desc: 'Tu as osé commencer.',              check: () => countDoneSessions() >= 1 },
  { id: 'week',      icon: '🔥', name: '7 jours consécutifs',    desc: 'Une semaine sans fléchir.',          check: () => getStreak() >= 7 },
  { id: 'streak14',  icon: '⚡', name: '2 semaines de suite',    desc: 'La régularité s\'installe.',         check: () => getStreak() >= 14 },
  { id: 'streak21',  icon: '🌟', name: '21 jours — l\'habitude', desc: 'L\'habitude est ancrée. Bravo !',   check: () => getStreak() >= 21 },
  { id: 'streak30',  icon: '👑', name: '1 mois consécutif',      desc: 'Un mois sans manquer. Incroyable.', check: () => getStreak() >= 30 },
  { id: 's10',       icon: '🎯', name: '10 séances',             desc: 'Tu gardes le cap.',                  check: () => countDoneSessions() >= 10 },
  { id: 's30',       icon: '💪', name: '30 séances',             desc: 'Un mois de travail au compteur.',   check: () => countDoneSessions() >= 30 },
  { id: 's50',       icon: '🦾', name: '50 séances',             desc: 'Tu es sérieux(se), ça se voit.',    check: () => countDoneSessions() >= 50 },
  { id: 's100',      icon: '🏆', name: '100 séances',            desc: 'Centurion. Respect total.',          check: () => countDoneSessions() >= 100 },
  { id: 'cycle2',    icon: '🌀', name: 'Cycle 2 atteint',        desc: '28 jours de programme accomplis.',  check: () => dayNumber() >= 29 },
  { id: 'cycle3',    icon: '🔄', name: 'Cycle 3 atteint',        desc: 'Tu enchaînes les cycles !',         check: () => dayNumber() >= 57 },
  { id: 'master',    icon: '🥇', name: 'Niveau Maître',          desc: 'Tu as gravi tous les échelons.',    check: () => getRPGLevel() >= 5 },
];

function checkBadges() {
  const unlocked = load('badges', []);
  const newlyUnlocked = [];
  BADGES.forEach(b => {
    if (!unlocked.includes(b.id) && b.check()) {
      unlocked.push(b.id);
      newlyUnlocked.push(b);
    }
  });
  if (newlyUnlocked.length) store('badges', unlocked);
  return { unlocked, newlyUnlocked };
}

function isUnlocked(id) {
  return load('badges', []).includes(id);
}

// ─── Adaptation de la difficulté ─────────────────────────────
function getDiffOffset() {
  return load('diffOffset', 0);
}

function updateDifficultyFromFeedback(feedback) {
  const history = load('feedbackHistory', []);
  history.push(feedback);
  if (history.length > 5) history.shift();
  store('feedbackHistory', history);

  const last3 = history.slice(-3);
  const last2 = history.slice(-2);

  if (last3.length === 3 && last3.every(f => f === 'easy')) {
    const d = getDiffOffset();
    store('diffOffset', d + 1);
    return 'up';
  }
  if (last2.length === 2 && last2.every(f => f === 'hard')) {
    const d = getDiffOffset();
    store('diffOffset', Math.max(-2, d - 1));
    return 'down';
  }
  return null;
}

// ─── Messages d'encouragement ────────────────────────────────
const ENCOURAGEMENTS = [
  "Tu assures ! Chaque séance compte. 💪",
  "Bravo, tu l'as fait ! Ton futur toi te remercie.",
  "Belle séance ! La régularité, c'est le vrai secret.",
  "C'est fait ! Un jour de plus dans la bonne direction.",
  "Tu construis quelque chose de solide, séance après séance.",
  "Respect ! Même quand c'est dur, tu es là.",
  "Une de plus ! Continue comme ça, tu es sur la bonne voie.",
  "Bien joué ! Le plus dur, c'était de commencer.",
  "Séance faite. Le reste de la journée t'appartient. 🌟",
  "Corps en mouvement, esprit qui avance. Belle journée !",
];

const COMEBACK_MESSAGES = [
  "Content de te revoir ! On reprend en douceur, sans pression. 💪",
  "Bienvenue de retour ! Ton corps se souvient de tout.",
  "Tu es là, c'est l'essentiel. On y va tranquillement.",
  "Retour en force ! Pas de jugement ici, que du positif.",
  "Une absence n'efface pas tes progrès. Tu reprends là où tu en es.",
  "L'important c'est de revenir. Et tu es là. C'est tout ce qui compte.",
  "Pas de culpabilité — juste un nouveau départ. C'est parti ! 🔥",
];

function randomEncouragement() {
  const streak = getStreak();
  const sessions = countDoneSessions();
  if (streak >= 21) return `${streak} jours d'affilée — tu es une légende. 👑`;
  if (streak >= 14) return `${streak} jours de suite — incroyable régularité ! ⚡`;
  if (streak >= 7)  return `${streak} jours consécutifs — tu es en feu ! 🔥`;
  if (streak >= 3)  return `${streak} jours d'affilée — ne lâche pas ! ⭐`;
  if (sessions === 1) return `Première séance faite ! L'aventure commence. 🎉`;
  if (sessions >= 50) return `${sessions} séances au compteur — champion(ne) absolu(e) ! 🏆`;
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

function randomComeback() {
  return COMEBACK_MESSAGES[Math.floor(Math.random() * COMEBACK_MESSAGES.length)];
}

// ─── Timer ───────────────────────────────────────────────────
let timerRemaining = 30;
let timerInitial = 30;
let timerInterval = null;
let timerRunning = false;

function setTimerDuration(s) {
  timerInitial = s;
  timerRemaining = s;
  timerRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  renderTimer();
  document.getElementById('timerDisplay').className = 'timer-display';
  document.querySelectorAll('.preset-btn').forEach(b => {
    b.classList.toggle('active-preset', parseInt(b.dataset.secs) === s);
  });
}

function renderTimer() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  document.getElementById('timerDisplay').textContent =
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById('timerDisplay').classList.add('running');
  timerInterval = setInterval(() => {
    if (timerRemaining > 0) {
      timerRemaining--;
      renderTimer();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRunning = false;
      document.getElementById('timerDisplay').classList.remove('running');
      document.getElementById('timerDisplay').classList.add('finished');
      // Vibration
      if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 500]);
      // Son
      playBeep();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  document.getElementById('timerDisplay').classList.remove('running');
}

function resetTimer() {
  pauseTimer();
  timerRemaining = timerInitial;
  document.getElementById('timerDisplay').classList.remove('running', 'finished');
  renderTimer();
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // 3 bips aigus forts — fin de série
    [0, 0.25, 0.5].forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.8, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.2);
    });
  } catch (e) { /* silencieux si le contexte audio échoue */ }
}

function playRestStart() {
  // Son grave prolongé — début de pause
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 330;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.7, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {}
}

function playRestEnd() {
  // 2 bips montants énergiques — fin de pause, c'est reparti
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[440, 0], [660, 0.2], [880, 0.4]].forEach(([freq, t]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.8, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.18);
    });
  } catch (e) {}
}

function playCountdownBeep(n) {
  // Décompte 5-4-3-2-1 pendant la pause : fréquence monte avec l'urgence
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = { 5: 400, 4: 480, 3: 560, 2: 660, 1: 800 };
    const freq = freqs[n] || 500;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.7, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// ─── Wake Lock (écran allumé pendant la séance) ───────────────
let wakeLock = null;

async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
  } catch (e) { /* silencieux si refusé */ }
}

function releaseWakeLock() {
  if (wakeLock) { wakeLock.release(); wakeLock = null; }
}

// Réacquérir le wake lock si la page redevient visible
document.addEventListener('visibilitychange', () => {
  // Réacquérir le wake lock dès qu'on revient sur l'app (séance en cours ou non)
  if (document.visibilityState === 'visible' && !isDone(dayNumber())) requestWakeLock();
});

function inlineTimerActive() {
  return Object.values(inlineTimers).some(t => t && t.running);
}

// ─── Minuteur global de séance (Feature 4) ────────────────────
let sessionTimerInterval = null;
let sessionTimerSeconds = 0;
let sessionTimerStarted = false;

function startSessionTimer() {
  if (sessionTimerStarted) return;
  sessionTimerStarted = true;
  sessionTimerSeconds = 0;
  const el = document.getElementById('sessionTimer');
  if (el) el.classList.remove('hidden');
  sessionTimerInterval = setInterval(() => {
    sessionTimerSeconds++;
    const m = Math.floor(sessionTimerSeconds / 60);
    const s = sessionTimerSeconds % 60;
    const disp = document.getElementById('sessionTimerDisplay');
    if (disp) disp.textContent = m + ':' + String(s).padStart(2, '0');
  }, 1000);
}

function stopSessionTimer() {
  clearInterval(sessionTimerInterval);
  sessionTimerInterval = null;
  sessionTimerStarted = false;
  sessionTimerSeconds = 0;
  const el = document.getElementById('sessionTimer');
  if (el) el.classList.add('hidden');
  const disp = document.getElementById('sessionTimerDisplay');
  if (disp) disp.textContent = '0:00';
}

// ─── Mini-timers inline avec compteur de séries ───────────────
// structure : { remaining, initial, interval, running, targetSets, doneSets, isTimed }
const inlineTimers = {};

function saveSeriesProgress() {
  const progress = {};
  Object.entries(inlineTimers).forEach(([idx, t]) => {
    if (t) progress[idx] = t.doneSets;
  });
  store('series_progress_' + dayNumber(), progress);
}

function loadSeriesProgress() {
  return load('series_progress_' + dayNumber(), {});
}

function startInlineTimer(idx, secs) {
  // Feature 4: démarrer le minuteur global de séance au premier timer
  startSessionTimer();
  const timerEl = document.getElementById('inline-timer-' + idx);
  timerEl.classList.add('visible');

  if (!inlineTimers[idx]) {
    const initial = secs > 0 ? secs : 60;
    const targetSets = parseInt(timerEl.dataset.sets) || 3;
    const savedProgress = loadSeriesProgress();
    const doneSets = savedProgress[idx] || 0;
    inlineTimers[idx] = {
      remaining: initial, initial, interval: null, running: false,
      targetSets, doneSets, isTimed: true
    };
  }
  renderInlineTimer(idx);
  timerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  requestWakeLock();
}

function renderInlineTimer(idx) {
  const t = inlineTimers[idx];
  if (!t) return;

  // Affichage chrono
  const el = document.getElementById('inline-display-' + idx);
  if (el) {
    if (t.isTimed) {
      const m = Math.floor(t.remaining / 60);
      const s = t.remaining % 60;
      el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    } else {
      el.textContent = '—';
    }
    el.className = 'inline-timer-display' +
      (t.running ? ' running' : (t.remaining === 0 && t.isTimed ? ' finished' : ''));
  }

  // Compteur de séries
  const counterEl = document.getElementById('inline-counter-' + idx);
  if (counterEl) {
    const over = t.doneSets > t.targetSets;
    counterEl.textContent = `${t.doneSets}/${t.targetSets}`;
    counterEl.className = 'inline-series-counter' +
      (over ? ' over' : (t.doneSets === t.targetSets ? ' done' : ''));
  }

  // Bouton "Série faite"
  const serieBtn = document.getElementById('inline-serie-btn-' + idx);
  if (serieBtn) {
    serieBtn.textContent = t.doneSets === 0
      ? '✓ Première série !'
      : t.doneSets < t.targetSets
        ? `✓ Série ${t.doneSets + 1}/${t.targetSets}`
        : `✓ Série bonus ${t.doneSets + 1} 🔥`;
  }
}

function toggleInlineTimer(idx) {
  const t = inlineTimers[idx];
  if (!t || !t.isTimed) return;
  const startBtn = document.querySelector(`#inline-timer-${idx} .inline-btn-start`);
  if (t.running) {
    clearInterval(t.interval);
    t.interval = null;
    t.running = false;
    if (startBtn) startBtn.textContent = '▶';
    renderInlineTimer(idx);
    if (!inlineTimerActive()) releaseWakeLock();
  } else {
    if (t.remaining === 0) { t.remaining = t.initial; }
    t.running = true;
    if (startBtn) startBtn.textContent = '⏸';
    t.interval = setInterval(() => {
      if (t.remaining > 0) {
        t.remaining--;
        renderInlineTimer(idx);
      } else {
        clearInterval(t.interval);
        t.interval = null;
        t.running = false;
        if (startBtn) startBtn.textContent = '▶';
        renderInlineTimer(idx);
        if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
        playBeep();
        if (!inlineTimerActive()) releaseWakeLock();
      }
    }, 1000);
  }
}

function resetInlineTimer(idx) {
  const t = inlineTimers[idx];
  if (!t) return;
  clearInterval(t.interval);
  t.interval = null;
  t.running = false;
  t.remaining = t.initial;
  const startBtn = document.querySelector(`#inline-timer-${idx} .inline-btn-start`);
  if (startBtn) startBtn.textContent = '▶';
  renderInlineTimer(idx);
}

function recordSerie(idx) {
  const t = inlineTimers[idx];
  if (!t) return;
  // Si timer chronométré : le remettre à zéro pour la prochaine série
  if (t.isTimed) {
    clearInterval(t.interval);
    t.interval = null;
    t.running = false;
    t.remaining = t.initial;
    const startBtn = document.querySelector(`#inline-timer-${idx} .inline-btn-start`);
    if (startBtn) startBtn.textContent = '▶';
  }
  t.doneSets++;
  renderInlineTimer(idx);

  // Marquer l'exercice en vert dès que l'objectif de séries est atteint
  const timerEl = document.getElementById(`inline-timer-${idx}`);
  if (timerEl && t.doneSets >= t.targetSets) {
    const itemEl = timerEl.closest('.exercise-item');
    if (itemEl) itemEl.classList.add('exercise-item-done');
  }

  // Persister la progression en localStorage
  saveSeriesProgress();

  checkAllSeriesDone();
}

// Vérifie si tous les exercices ont atteint leur objectif de séries
function checkAllSeriesDone() {
  const keys = Object.keys(inlineTimers);
  if (keys.length === 0) return;
  const allDone = keys.every(k => {
    const t = inlineTimers[k];
    return t && t.doneSets >= t.targetSets;
  });
  if (!allDone) return;

  const seanceFinieEl = document.getElementById('seanceFinie');
  if (!seanceFinieEl || !seanceFinieEl.classList.contains('hidden')) return;

  // Calculer les bonus séries
  const totalSeries = Object.values(inlineTimers).reduce((s, t) => s + (t?.doneSets || 0), 0);
  const targetTotal = Object.values(inlineTimers).reduce((s, t) => s + (t?.targetSets || 0), 0);
  const bonusSeries = totalSeries - targetTotal;
  const depassement = bonusSeries > 0;

  // Choisir emoji et message
  const emojis = depassement
    ? ['🔥', '⚡', '💥']
    : ['🎉', '🏆', '💪', '🌟'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  const msgs = depassement ? [
    `Tu as dépassé l'objectif avec ${bonusSeries} série${bonusSeries > 1 ? 's' : ''} bonus ! Tu repousses tes limites. 🚀`,
    `${bonusSeries} série${bonusSeries > 1 ? 's' : ''} de plus que prévu — ton corps est plus fort que tu ne le crois !`,
    `Dépassement x${bonusSeries} ! Tu assures vraiment. Continue comme ça !`
  ] : [
    'Tu l\'as fait ! Chaque séance compte, et celle-là, elle est dans la boîte.',
    'Bravo ! La régularité, c\'est le vrai secret du progrès.',
    'Belle séance ! Ton futur toi te remercie déjà.',
    'C\'est fait ! Un jour de plus dans la bonne direction.',
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];

  document.getElementById('seanceFinieEmoji').textContent = emoji;
  document.getElementById('seanceFinieTitle').textContent = depassement ? 'Objectif dépassé !' : 'Séance terminée !';
  document.getElementById('seanceFinieMsg').textContent = msg;

  // Stats de la séance
  const today = dayNumber();
  const tomorrowW = workout(today + 1, getDiffOffset());
  document.getElementById('seanceFinieStats').innerHTML = `
    <div class="seance-finie-stat">
      <div class="seance-finie-stat-val">${totalSeries}</div>
      <div class="seance-finie-stat-lbl">Séries totales</div>
    </div>
    ${depassement ? `<div class="seance-finie-stat">
      <div class="seance-finie-stat-val">+${bonusSeries}</div>
      <div class="seance-finie-stat-lbl">Bonus</div>
    </div>` : ''}
    <div class="seance-finie-stat">
      <div class="seance-finie-stat-val">Demain</div>
      <div class="seance-finie-stat-lbl">${tomorrowW.isRest ? '😴 Récup' : tomorrowW.title}</div>
    </div>
  `;

  // Sauvegarder automatiquement dès que toutes les séries sont faites
  markDone(dayNumber(), selectedFeedback);
  updateDifficultyFromFeedback(selectedFeedback);
  if (countDoneSessions() === 1) requestNotificationPermission();

  seanceFinieEl.classList.remove('hidden');
  // Masquer le bouton manuel (séance déjà sauvegardée)
  const doneBtn = document.getElementById('markDoneBtn');
  if (doneBtn) doneBtn.classList.add('hidden');

  setTimeout(() => seanceFinieEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  releaseWakeLock();
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 300]);
}

// ─── Navigation ───────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  const navBtn = document.getElementById('nav-' + id);
  if (!page) return;
  page.classList.add('active');
  if (navBtn) navBtn.classList.add('active');

  if (id === 'home') renderHome();
  if (id === 'calendar') renderCalendar();
  if (id === 'dashboard') renderDashboard();
  if (id === 'library') renderLibrary();
  if (id === 'settings') renderSettings();
  if (id === 'admin') renderAdmin();
}

// ─── Rendu — Page d'accueil ───────────────────────────────────
function renderHome() {
  // Nettoyer les timers inline actifs de la session précédente
  Object.values(inlineTimers).forEach(t => clearInterval(t?.interval));
  for (const k in inlineTimers) delete inlineTimers[k];
  // Feature 4: réinitialiser le minuteur global si séance déjà faite
  if (isDone(dayNumber())) stopSessionTimer();
  const today = dayNumber();
  const w = workout(today, getDiffOffset());
  const rpg = getRPGInfo();
  const streak = getStreak();
  const sessions = countDoneSessions();
  const doneToday = isDone(today);

  // Jour / cycle
  document.getElementById('heroDay').textContent = `Jour ${today}`;
  document.getElementById('heroCycle').textContent = `Cycle ${cycleNumber(today)}`;
  document.getElementById('heroLabel').textContent = w.title;

  // Hero chips (exercices ou repos)
  const chipsEl = document.getElementById('heroChips');
  if (chipsEl) {
    if (w.isRest) {
      chipsEl.innerHTML = `<span class="day-hero-rest-chip">🛌 Repos</span>`;
    } else {
      chipsEl.innerHTML = w.list.map(e => {
        const name = e.split(' — ')[0].trim();
        return `<span class="day-hero-chip">${name}</span>`;
      }).join('');
    }
  }

  // Hero launch button
  const heroBtn = document.getElementById('heroLaunchBtn');
  if (heroBtn) {
    if (w.isRest || isDone(today)) {
      heroBtn.textContent = w.isRest ? '🛌 Jour de repos' : '✓ Séance complète';
      heroBtn.classList.add('done');
      heroBtn.onclick = null;
    } else {
      const savedP = loadSeriesProgress();
      const hasProgress = Object.values(savedP).some(v => v > 0);
      heroBtn.innerHTML = hasProgress ? '↩ Reprendre la séance' : '▶ Lancer la séance';
      heroBtn.classList.remove('done');
      heroBtn.onclick = () => openWorkoutOverlay();
    }
  }

  // Séance du jour
  document.getElementById('workoutTitle').textContent = w.title;

  // Feature 3: Jour de repos — afficher une carte de repos
  if (w.isRest) {
    document.getElementById('workoutExercises').innerHTML = `
      <div class="rest-day-card">
        <div class="rest-day-emoji">🛌</div>
        <div class="rest-day-title">Jour de repos</div>
        <div class="rest-day-msg">Aujourd'hui c'est repos — ton corps se reconstruit. Profites-en !</div>
      </div>`;
    document.getElementById('workoutNote').textContent = '';
    document.getElementById('markDoneBtn').classList.add('hidden');
    document.getElementById('feedbackSection').classList.add('hidden');
    document.getElementById('seanceFinie').classList.add('hidden');
    document.getElementById('encouragementMsg').classList.add('hidden');
    // RPG/stats then return
    const rpg2 = getRPGInfo();
    document.getElementById('rpgName').textContent = rpg2.name;
    document.getElementById('rpgXP').textContent = `${rpg2.xp} XP`;
    document.getElementById('rpgBar').style.width = rpg2.pct + '%';
    if (document.getElementById('rpgNext')) document.getElementById('rpgNext').textContent = rpg2.next
      ? `Prochain niveau : ${rpg2.next} (encore ${rpg2.xpToNext} XP)`
      : 'Niveau maximum atteint — tu es un Maître ! 👑';
    const heroRpgName = document.getElementById('heroRpgName');
    const heroRpgXP = document.getElementById('heroRpgXP');
    const heroRpgBar = document.getElementById('heroRpgBar');
    if (heroRpgName) heroRpgName.textContent = rpg2.name;
    if (heroRpgXP) heroRpgXP.textContent = `${rpg2.xp} XP`;
    if (heroRpgBar) heroRpgBar.style.width = rpg2.pct + '%';
    document.getElementById('statSessions').textContent = sessions;
    document.getElementById('statStreak').textContent = streak;
    document.getElementById('statBestStreak').textContent = getBestStreak();
    renderBadges();
    renderTomorrowCard();
    return;
  }

  if (doneToday) {
    // Affichage "fait" : liste verte avec coches
    document.getElementById('workoutExercises').innerHTML = w.list.map(e => `
      <div class="exercise-item exercise-item-done">
        <div class="exercise-item-top">
          <span class="exercise-done-check">✓</span>
          <span class="exercise-item-label">${e}</span>
        </div>
      </div>`).join('');
    document.getElementById('workoutNote').textContent = '';
  } else {
    // ── Bouton principal "Commencer la séance" ──
    const savedProgress = loadSeriesProgress();
    const previewItems = w.list.map((e, i) => {
      const doneSets = savedProgress[i] || 0;
      const setsMatch = e.match(/(\d+)\s*x/);
      const targetSets = setsMatch ? parseInt(setsMatch[1]) : 3;
      const exName = e.split(' — ')[0].trim();
      const infoBtn = EXERCISES[exName]
        ? `<button class="exercise-info-btn" onclick="openExerciseModal('${exName.replace(/'/g, "\\'")}')">ℹ️</button>`
        : '';
      const isDoneEx = doneSets >= targetSets;
      return `
        <div class="exercise-item ${isDoneEx ? 'exercise-item-done' : ''}" onclick="openWorkoutOverlay(${i})" style="cursor:pointer;">
          <div class="exercise-item-top">
            ${isDoneEx ? '<span class="exercise-done-check">✓</span>' : '<span class="exercise-go-arrow">▶</span>'}
            <span class="exercise-item-label">${e}</span>
            ${infoBtn}
          </div>
        </div>`;
    }).join('');

    document.getElementById('workoutExercises').innerHTML = previewItems;
    document.getElementById('workoutNote').textContent = w.note;

    // Restaurer inlineTimers pour les exercices partiellement faits (pour checkAllSeriesDone)
    w.list.forEach((e, i) => {
      const doneSets = savedProgress[i] || 0;
      const targetSets = parseInt(e.match(/(\d+)\s*x/)?.[1]) || 3;
      if (doneSets > 0 && doneSets < targetSets) {
        const secMatch = e.match(/(\d+)s/);
        const minMatch = e.match(/(\d+)\s*min/);
        const secs = secMatch ? parseInt(secMatch[1]) : (minMatch ? parseInt(minMatch[1]) * 60 : 30);
        inlineTimers[i] = {
          remaining: secs, initial: secs, interval: null, running: false,
          targetSets, doneSets, isTimed: true
        };
      }
    });
  } // fin du else (séance pas encore faite)

  // État séance : déjà faite ou en cours
  const doneBtn = document.getElementById('markDoneBtn');
  const feedbackSection = document.getElementById('feedbackSection');
  const seanceFinie = document.getElementById('seanceFinie');
  const encouragementMsg = document.getElementById('encouragementMsg');
  if (doneToday) {
    doneBtn.classList.add('hidden');
    feedbackSection.classList.add('hidden');
    seanceFinie.classList.add('hidden');
    encouragementMsg.classList.remove('hidden');
    encouragementMsg.textContent = randomEncouragement();
  } else {
    doneBtn.classList.remove('hidden');
    feedbackSection.classList.remove('hidden');
    seanceFinie.classList.add('hidden');
    encouragementMsg.classList.add('hidden');
  }

  // RPG
  document.getElementById('rpgName').textContent = rpg.name;
  document.getElementById('rpgXP').textContent = `${rpg.xp} XP`;
  document.getElementById('rpgBar').style.width = rpg.pct + '%';
  if (document.getElementById('rpgNext')) document.getElementById('rpgNext').textContent = rpg.next
    ? `Prochain niveau : ${rpg.next} (encore ${rpg.xpToNext} XP)`
    : 'Niveau maximum atteint — tu es un Maître ! 👑';
  const heroRpgName2 = document.getElementById('heroRpgName');
  const heroRpgXP2 = document.getElementById('heroRpgXP');
  const heroRpgBar2 = document.getElementById('heroRpgBar');
  if (heroRpgName2) heroRpgName2.textContent = rpg.name;
  if (heroRpgXP2) heroRpgXP2.textContent = `${rpg.xp} XP`;
  if (heroRpgBar2) heroRpgBar2.style.width = rpg.pct + '%';

  // Stats rapides
  document.getElementById('statSessions').textContent = sessions;
  document.getElementById('statStreak').textContent = streak + ' j';
  document.getElementById('statBestStreak').textContent = getBestStreak() + ' j';

  // Badges
  renderBadges();

  // Feature 2: aperçu demain
  renderTomorrowCard();
}

// ─── Rendu des badges ─────────────────────────────────────────
function renderBadges() {
  const grid = document.getElementById('badgesGrid');
  if (!grid) return;
  const { unlocked } = checkBadges();
  grid.innerHTML = BADGES.map(b => {
    const earned = unlocked.includes(b.id);
    return `
      <div class="badge-item ${earned ? 'unlocked' : ''}">
        <div class="badge-icon">${earned ? b.icon : '🔒'}</div>
        <div class="badge-name">${b.name}</div>
        ${earned && b.desc ? `<div class="badge-desc">${b.desc}</div>` : ''}
      </div>`;
  }).join('');
}

// ─── Aperçu demain (Feature 2) ────────────────────────────────
function renderTomorrowCard() {
  const el = document.getElementById('tomorrowCard');
  if (!el) return;
  const tomorrowDay = dayNumber() + 1;
  const tw = workout(tomorrowDay, getDiffOffset());
  const exNames = tw.list.map(e => e.split(' — ')[0].trim()).join(', ');
  el.innerHTML = `
    <div class="card tomorrow-card">
      <div class="card-title">👀 Demain — Jour ${tomorrowDay}</div>
      <div class="workout-title" style="font-size:1rem;">${tw.title}</div>
      ${tw.isRest
        ? `<div class="rest-day-msg" style="margin-top:8px;">😴 Jour de repos</div>`
        : `<div class="tomorrow-exercises">${exNames}</div>`}
    </div>`;
}

// ─── Rendu — Calendrier ───────────────────────────────────────
let calViewDate = new Date();

function renderCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(getStartDate() + 'T00:00:00');

  const year = calViewDate.getFullYear();
  const month = calViewDate.getMonth();

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  document.getElementById('calMonthLabel').textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDow = firstDay.getDay(); // 0=dim
  startDow = (startDow + 6) % 7;   // lundi=0

  let html = '';
  for (let i = 0; i < startDow; i++) html += '<div class="cal-cell empty"></div>';

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    const diffDays = Math.round((date - start) / 86400000) + 1;
    const isToday = date.getTime() === today.getTime();
    const isFuture = date > today;
    const isPast = date < today;
    const isBeforeStart = date < start;

    let cls = 'cal-cell';
    let title = '';

    if (isBeforeStart) {
      cls += ' empty';
    } else if (isFuture) {
      const w = workout(diffDays);
      cls += w.isRest ? ' rest future' : ' future';
      title = w.isRest ? 'Repos' : w.title;
    } else if (isToday) {
      const w = workout(diffDays);
      cls += w.isRest ? ' rest' : (isDone(diffDays) ? ' done' : '');
      cls += ' today';
      title = w.title;
    } else if (isPast && !isBeforeStart) {
      const w = workout(diffDays);
      if (w.isRest) {
        cls += ' rest';
        title = 'Repos';
      } else if (isDone(diffDays)) {
        cls += ' done';
        title = w.title;
      } else {
        cls += ' missed';
        title = w.title;
      }
    }

    // Afficher label workout/repos dans la cellule (passé, aujourd'hui, et futur)
    let cellContent = '';
    let clickAttr = '';
    if (!isBeforeStart) {
      const shortTitle = title === 'Repos' ? 'Repos' : title.split(' — ')[0].split(' / ')[0].slice(0, 10);
      cellContent = `<div class="cal-cell-num">${d}</div>${shortTitle ? `<div class="cal-cell-label">${shortTitle}</div>` : ''}`;
      // Case manquée → clic pour rattraper (on utilise w.isRest car le jour de repos change selon le cycle)
      const wCheck = workout(diffDays);
      if (isPast && !isBeforeStart && !wCheck.isRest && !isDone(diffDays)) {
        clickAttr = `onclick="openCatchUpModal(${diffDays}, '${title.replace(/'/g,"\\'")}')"`;
        cellContent += `<div class="cal-cell-catchup">↩</div>`;
      }
    } else {
      cellContent = String(d);
    }
    html += `<div class="${cls}" title="${title}" ${clickAttr}>${cellContent}</div>`;
  }

  document.getElementById('calGrid').innerHTML = html;
}

function openCatchUpModal(day, title) {
  const existing = document.getElementById('catchUpModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'catchUpModal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;
    display:flex;align-items:flex-end;justify-content:center;`;
  modal.innerHTML = `
    <div style="background:#fff;border-radius:20px 20px 0 0;padding:24px 20px 40px;width:100%;max-width:480px;">
      <div style="font-size:1.1rem;font-weight:900;margin-bottom:6px;">↩ Rattraper la séance</div>
      <div style="font-size:0.9rem;color:#666;margin-bottom:20px;">Jour ${day} — ${title}</div>
      <p style="font-size:0.85rem;color:#444;margin-bottom:20px;line-height:1.5;">
        Tu peux faire cette séance maintenant et la marquer comme complétée.
        La régularité, c'est aussi savoir rattraper ! 💪
      </p>
      <button onclick="catchUpWorkout(${day})" style="
        width:100%;padding:14px;background:#d71920;color:#fff;border:none;
        border-radius:12px;font-size:1rem;font-weight:900;cursor:pointer;margin-bottom:10px;">
        ▶ Faire la séance maintenant
      </button>
      <button onclick="catchUpMarkDone(${day})" style="
        width:100%;padding:14px;background:#f0f0f0;color:#333;border:none;
        border-radius:12px;font-size:0.95rem;font-weight:700;cursor:pointer;margin-bottom:10px;">
        ✓ Marquer comme faite (déjà réalisée)
      </button>
      <button onclick="document.getElementById('catchUpModal').remove()" style="
        width:100%;padding:12px;background:none;color:#888;border:none;
        font-size:0.9rem;cursor:pointer;">
        Annuler
      </button>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

function catchUpWorkout(day) {
  document.getElementById('catchUpModal')?.remove();
  // Ouvrir l'overlay avec les exercices du jour passé
  const w = workout(day, getDiffOffset());
  if (!w.list || w.list.length === 0) return;
  // Stocker le jour cible pour markDone au finish
  woState._catchUpDay = day;
  openWorkoutOverlay(0, day);
}

function catchUpMarkDone(day) {
  document.getElementById('catchUpModal')?.remove();
  markDone(day, 'ok');
  showToast(`Séance du jour ${day} validée ✓`);
  renderCalendar();
}

function calPrev() {
  calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() - 1, 1);
  renderCalendar();
}

function calNext() {
  calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() + 1, 1);
  renderCalendar();
}

// ─── Rendu — Bibliothèque ─────────────────────────────────────
function renderLibrary() {
  const html = Object.entries(EXERCISES).map(([name, data]) => `
    <div class="exercise-card" id="excard-${name.replace(/\s/g, '_')}">
      <div class="exercise-card-header" onclick="toggleExercise('${name.replace(/\s/g, '_')}')">
        <span class="exercise-card-name">${name}</span>
        <span class="exercise-card-chevron">▼</span>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-muscles">
          ${data.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
        </div>
        <p class="exercise-desc">${data.desc}</p>
        <p class="exercise-tip">💡 ${data.tip}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('libraryList').innerHTML = html;
}

function toggleExercise(id) {
  document.getElementById('excard-' + id).classList.toggle('open');
}

// ─── Rendu — Réglages ─────────────────────────────────────────
function renderSettings() {
  document.getElementById('settingStartDate').value = getStartDate();
  document.getElementById('settingLevel').value = load('level', 'facile');
  document.getElementById('settingNotifTime').value = load('notifTime', '08:00');
  document.getElementById('settingNotifEnabled').checked = load('notifEnabled', false);
  document.getElementById('settingObjective').value = load('objective', 'remise');
  document.getElementById('settingRythm').value = load('rythm', '5');
  document.getElementById('rpgResetInfo').textContent =
    `${getRPGInfo().name} — ${getXP()} XP — ${countDoneSessions()} séances`;
  const iw = load('initWeight'); if (iw && document.getElementById('settingInitWeight')) document.getElementById('settingInitWeight').value = iw;
  const bh = load('bodyHeight'); if (bh && document.getElementById('settingBodyHeight')) document.getElementById('settingBodyHeight').value = bh;

  // Statut notifications
  const statusEl = document.getElementById('notifStatus');
  const guideEl = document.getElementById('notifGuide');
  if (statusEl) {
    if (!('Notification' in window)) {
      statusEl.innerHTML = '❌ Non supporté — utilise <strong>Chrome</strong> sur Android pour les notifications';
      statusEl.className = 'notif-status notif-status-denied';
      if (guideEl) guideEl.style.display = 'block';
    } else if (Notification.permission === 'denied') {
      statusEl.innerHTML = '🚫 Bloquées sur ce site — voir les instructions ci-dessous';
      statusEl.className = 'notif-status notif-status-denied';
      if (guideEl) guideEl.style.display = 'block';
    } else if (Notification.permission === 'granted' && load('notifEnabled', false)) {
      const subscribed = load('pushSubscribed', false);
      statusEl.innerHTML = subscribed
        ? '✅ Actives — rappels reçus même app fermée !'
        : '⚠️ Permission OK — en cours d\'activation…';
      statusEl.className = 'notif-status notif-status-ok';
      if (guideEl) guideEl.style.display = 'none';
    } else if (Notification.permission === 'default') {
      statusEl.innerHTML = '💤 Désactivées — active le rappel et enregistre';
      statusEl.className = 'notif-status notif-status-off';
      if (guideEl) guideEl.style.display = 'none';
    } else {
      statusEl.innerHTML = '💤 Désactivées';
      statusEl.className = 'notif-status notif-status-off';
      if (guideEl) guideEl.style.display = 'none';
    }
  }

  // Ajouter mesure rapide dans les réglages
  const today = new Date().toISOString().slice(0, 10);
  const qm = document.getElementById('quickMeasureDate');
  if (qm) qm.value = today;
}

function saveSettings() {
  const dateVal = document.getElementById('settingStartDate').value;
  if (!dateVal) {
    showToast('⚠️ La date de départ est obligatoire.');
    return;
  }
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const chosen = new Date(dateVal + 'T00:00:00');
  if (chosen > today) {
    showToast('⚠️ La date de départ ne peut pas être dans le futur.');
    return;
  }

  const prevDate = load('startDate');
  store('startDate', dateVal);
  store('level', document.getElementById('settingLevel').value);
  store('notifTime', document.getElementById('settingNotifTime').value);
  store('notifEnabled', document.getElementById('settingNotifEnabled').checked);
  store('objective', document.getElementById('settingObjective').value);
  store('rythm', document.getElementById('settingRythm').value);

  // Poids / taille corporelle
  const initWeight = document.getElementById('settingInitWeight')?.value;
  const bodyHeight = document.getElementById('settingBodyHeight')?.value;
  if (initWeight) store('initWeight', parseFloat(initWeight));
  if (bodyHeight) store('bodyHeight', parseFloat(bodyHeight));

  // Demander permission et activer les notifications
  if (document.getElementById('settingNotifEnabled').checked) {
    if (!('Notification' in window)) {
      showToast('Les notifications ne sont pas supportées sur cet appareil.');
    } else if (Notification.permission === 'denied') {
      showToast('🚫 Notifications bloquées — autorise-les dans les réglages du navigateur.');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(p => {
        if (p === 'granted') { scheduleNotifications(); setTimeout(renderSettings, 500); }
        else { showToast('Permission refusée — notifications désactivées.'); }
      });
    } else if (Notification.permission === 'granted') {
      scheduleNotifications();
      setTimeout(renderSettings, 1000);
    }
  } else {
    unsubscribeFromPush();
  }

  showToast('Réglages enregistrés ✓');
  // Seulement re-render home si la date a changé (évite les crashs)
  if (prevDate !== dateVal) renderHome();
  renderSettings();
  if (typeof syncToFirestore === 'function') syncToFirestore();
}

// ─── Notifications ────────────────────────────────────────────
const VAPID_PUBLIC_KEY = 'BHUZ3uBIMB_Lwk3Cv_SR2WBGcolTLHUQ37g7A5Sz6FEjwo5qqtuvNlackWhx5JfwAUMiV_egK-u4Ecaeo9iEYow';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') scheduleNotifications();
    });
  } else if (Notification.permission === 'granted') {
    scheduleNotifications();
  }
}

async function subscribeToPushIfNeeded() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (!load('notifEnabled', false)) return;
  if (!currentUser || currentUser === 'invite') return;

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    // Enregistrer côté serveur
    const pin = localStorage.getItem(currentUser + '_pin');
    if (pin) {
      fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: currentUser, pin, subscription: sub.toJSON() }),
      }).catch(() => {});
    }
    store('pushSubscribed', true);
    return sub;
  } catch (e) {
    store('pushSubscribed', false);
  }
}

async function unsubscribeFromPush() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      const pin = localStorage.getItem(currentUser + '_pin');
      if (pin) {
        fetch('/api/push-subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: currentUser, pin, endpoint: sub.endpoint }),
        }).catch(() => {});
      }
      await sub.unsubscribe();
    }
    store('pushSubscribed', false);
  } catch (e) {}
}

function scheduleNotifications() {
  if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') return;
  if (!load('notifEnabled', false)) return;

  // S'abonner au Web Push (notifications background réelles)
  subscribeToPushIfNeeded();

  startNotifWatcher();
}

function getDaysSinceLastSession() {
  const today = dayNumber();
  for (let i = today; i >= 1; i--) {
    if (isDone(i)) return today - i;
  }
  return today;
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
      background:#333;color:white;padding:12px 20px;border-radius:999px;
      font-size:.9rem;font-weight:700;z-index:9999;
      animation:fadeInUp .2s ease;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}


// ─── Feedback séance ─────────────────────────────────────────
let selectedFeedback = 'ok';

function selectFeedback(val) {
  selectedFeedback = val;
  document.querySelectorAll('.feedback-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.val === val);
  });
}

function handleMarkDone() {
  const today = dayNumber();
  markDone(today, selectedFeedback);
  const change = updateDifficultyFromFeedback(selectedFeedback);

  // Demander permission notif à la première séance
  if (countDoneSessions() === 1) requestNotificationPermission();

  let msg = randomEncouragement();
  if (change === 'up') msg += '\n\nTu progresses si vite ! La difficulté augmente un peu. 🚀';
  if (change === 'down') msg += '\n\nOn adapte un peu le programme pour que ce soit parfait pour toi. 👍';

  renderHome();
  showToast(msg);
}

// ─── PWA install ──────────────────────────────────────────────
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('installBanner').classList.remove('hidden');
});

function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(() => {
    deferredInstallPrompt = null;
    document.getElementById('installBanner').classList.add('hidden');
  });
}

// ─── Modale exercice ──────────────────────────────────────────
function openExerciseModal(name) {
  const ex = EXERCISES[name];
  if (!ex) return;
  const stars = '★'.repeat(ex.difficulty || 1) + '☆'.repeat(3 - (ex.difficulty || 1));
  const modal = document.getElementById('exerciseModal');
  document.getElementById('modalExName').textContent = name;
  // Encoder les espaces dans le chemin pour que le navigateur charge bien le fichier
  const imgEl = document.getElementById('modalExImg');
  if (ex.imagePath) {
    imgEl.src = ex.imagePath;
    imgEl.style.display = 'block';
  } else {
    imgEl.src = '';
    imgEl.style.display = 'none';
  }
  imgEl.alt = name;
  document.getElementById('modalExDesc').textContent = ex.desc;
  document.getElementById('modalExDiff').textContent = stars;
  document.getElementById('modalExMuscles').innerHTML =
    (ex.muscles || []).map(m => `<span class="muscle-tag">${m}</span>`).join('');
  document.getElementById('modalExErrors').innerHTML =
    (ex.errors || []).map(err => `<li>${err}</li>`).join('');
  document.getElementById('modalExEasy').textContent = ex.variantEasy || '—';
  document.getElementById('modalExHard').textContent = ex.variantHard || '—';
  modal.classList.remove('hidden');
}

function closeExerciseModal() {
  document.getElementById('exerciseModal').classList.add('hidden');
}

// ─── Dashboard / Tableau de bord ──────────────────────────────
function saveWeight(date, poids, taille, note) {
  const history = load('weightHistory', []);
  history.push({ date, poids: parseFloat(poids), taille: parseFloat(taille) || null, note: note || '' });
  history.sort((a, b) => a.date.localeCompare(b.date));
  store('weightHistory', history);
}

function drawWeightChart(canvasId, data, label, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const pad = { top: 20, right: 16, bottom: 28, left: 40 };

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  if (!data || data.length === 0) {
    ctx.fillStyle = '#aaa';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Aucune donnée', W / 2, H / 2);
    return;
  }

  const values = data.map(d => d.val).filter(v => v != null && !isNaN(v));
  if (values.length === 0) return;

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const toX = (i) => pad.left + (i / (data.length - 1 || 1)) * (W - pad.left - pad.right);
  const toY = (v) => pad.top + (1 - (v - minVal) / range) * (H - pad.top - pad.bottom);

  // Axes
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, H - pad.bottom);
  ctx.lineTo(W - pad.right, H - pad.bottom);
  ctx.stroke();

  // Y labels
  ctx.fillStyle = '#888';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'right';
  [0, 0.5, 1].forEach(t => {
    const v = minVal + t * range;
    const y = toY(v);
    ctx.fillText(v.toFixed(1), pad.left - 4, y + 4);
    ctx.strokeStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();
  });

  // Ligne
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((d, i) => {
    if (d.val == null) return;
    const x = toX(i); const y = toY(d.val);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points
  ctx.fillStyle = color;
  data.forEach((d, i) => {
    if (d.val == null) return;
    ctx.beginPath();
    ctx.arc(toX(i), toY(d.val), 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // X labels (dates)
  ctx.fillStyle = '#aaa';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.ceil(data.length / 5));
  data.forEach((d, i) => {
    if (i % step === 0 || i === data.length - 1) {
      ctx.fillText(d.label, toX(i), H - pad.bottom + 14);
    }
  });
}

// ─── Graphique progression 28 jours (Feature 1) ──────────────
function drawProgressionChart() {
  const canvas = document.getElementById('progressionChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 320;
  canvas.width = W;
  const H = 110;
  canvas.height = H;
  const today = dayNumber();
  const startOffset = today - 27; // day index for 28 days ago

  const BAR_W = Math.floor((W - 8) / 28) - 2;
  const BAR_AREA_H = 60;
  const BAR_Y = 8;
  const LABEL_Y = H - 18;
  const WEEK_Y = H - 4;

  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < 28; i++) {
    const dayIdx = startOffset + i; // programme day number
    const isToday = dayIdx === today;
    const isFuture = dayIdx > today;
    const x = 4 + i * (BAR_W + 2);

    let color = '#e0e0e0'; // default: future
    if (!isFuture && dayIdx >= 1) {
      const w = workout(dayIdx);
      if (isToday) {
        color = '#e07b00'; // orange = aujourd'hui
      } else if (w.isRest) {
        color = '#2563eb'; // bleu = repos
      } else if (isDone(dayIdx)) {
        color = '#1f8a4c'; // vert = fait
      } else {
        color = '#991b1b'; // rouge foncé = manquée
      }
    } else if (dayIdx < 1) {
      color = '#f0f0f0'; // avant le début
    }

    ctx.fillStyle = color;
    const barH = isToday ? BAR_AREA_H : (isFuture || dayIdx < 1 ? BAR_AREA_H * 0.4 : BAR_AREA_H);
    const bx = x, by = BAR_Y + (BAR_AREA_H - barH), bw = BAR_W, bh = barH, br = 3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(bx, by, bw, bh, br);
    } else {
      ctx.rect(bx, by, bw, bh);
    }
    ctx.fill();
  }

  // Semaine labels
  ctx.fillStyle = '#888';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  for (let w = 0; w < 4; w++) {
    const midX = 4 + w * 7 * (BAR_W + 2) + 3.5 * (BAR_W + 2);
    ctx.fillText('S' + (w + 1), midX, WEEK_Y);
  }

  // Légende ligne de séparation semaines
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  for (let w = 1; w < 4; w++) {
    const lx = 4 + w * 7 * (BAR_W + 2) - 1;
    ctx.beginPath();
    ctx.moveTo(lx, BAR_Y);
    ctx.lineTo(lx, BAR_Y + BAR_AREA_H);
    ctx.stroke();
  }
}

function renderDashboard() {
  const rpg = getRPGInfo();
  const sessions = countDoneSessions();
  const streak = getStreak();
  const bestStreak = getBestStreak();
  const today = dayNumber();
  const history = load('weightHistory', []);

  // Carte félicitations
  let congrats = null;
  if (streak >= 30) congrats = { icon: '👑', title: 'Incroyable !', msg: `${streak} jours consécutifs — tu es une machine !` };
  else if (streak >= 14) congrats = { icon: '⚡', title: 'Impressionnant !', msg: `${streak} jours d'affilée, continue comme ça !` };
  else if (streak >= 7) congrats = { icon: '🔥', title: 'En feu !', msg: `${streak} jours consécutifs — belle régularité !` };
  else if (sessions >= 30) congrats = { icon: '💪', title: '30 séances !', msg: `Tu as déjà fait ${sessions} séances. Bravo !` };
  else if (sessions >= 10) congrats = { icon: '🏅', title: 'En route !', msg: `${sessions} séances au compteur — tu progresses bien.` };
  else if (sessions >= 1) congrats = { icon: '🎉', title: 'Bien démarré !', msg: `Ta première séance est faite. L'aventure commence !` };

  // Calcul taux de complétion (séances faites / séances prévues depuis départ)
  let expected = 0;
  for (let i = 1; i <= today; i++) {
    if (!isRestDay(i)) expected++;
  }
  const completionRate = expected > 0 ? Math.round((sessions / expected) * 100) : 0;

  // Séances cette semaine (7 derniers jours)
  let thisWeek = 0;
  for (let i = Math.max(1, today - 6); i <= today; i++) {
    if (isDone(i)) thisWeek++;
  }

  // Historique séances
  const sessionHistory = [];
  for (let i = today; i >= 1 && sessionHistory.length < 10; i--) {
    if (isDone(i)) {
      const w = workout(i);
      sessionHistory.push({ day: i, title: w.title });
    }
  }

  // Poids
  const weightData = history.filter(h => h.poids).slice(-20).map(h => ({ val: h.poids, label: h.date.slice(5) }));
  const latestWeight = weightData.length > 0 ? weightData[weightData.length - 1].val : null;
  const initWeight = load('initWeight');
  const weightDelta = (latestWeight && initWeight) ? (latestWeight - initWeight).toFixed(1) : null;

  // Unlocked badges
  const { unlocked: unlockedBadges } = checkBadges();

  document.getElementById('dashContent').innerHTML = `

    ${congrats ? `
    <div class="dash-congrats">
      <div class="dash-congrats-icon">${congrats.icon}</div>
      <div>
        <div class="dash-congrats-title">${congrats.title}</div>
        <div class="dash-congrats-msg">${congrats.msg}</div>
      </div>
    </div>` : ''}

    <!-- RPG Card -->
    <div class="card dash-rpg-card">
      <div class="dash-rpg-header">
        <div>
          <div class="dash-rpg-level">${rpg.name}</div>
          <div class="dash-rpg-xp">${rpg.xp} XP${rpg.next ? ` · encore ${rpg.xpToNext} XP pour ${rpg.next}` : ' · Niveau max 👑'}</div>
        </div>
        <div class="dash-rpg-badge">${rpg.lvl + 1}</div>
      </div>
      <div class="dash-rpg-bar-wrap"><div class="dash-rpg-bar-fill" style="width:${rpg.pct}%"></div></div>
      <div class="dash-rpg-pct">${rpg.pct}%</div>
    </div>

    <!-- Stats grid -->
    <div class="dash-stats-grid">
      <div class="dash-stat-card">
        <div class="dash-stat-icon">🏋️</div>
        <div class="dash-stat-val">${sessions}</div>
        <div class="dash-stat-label">Séances totales</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon">🔥</div>
        <div class="dash-stat-val">${streak}</div>
        <div class="dash-stat-label">Série actuelle</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon">⭐</div>
        <div class="dash-stat-val">${bestStreak}</div>
        <div class="dash-stat-label">Record</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon">📅</div>
        <div class="dash-stat-val">${thisWeek}</div>
        <div class="dash-stat-label">Cette semaine</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon">🎯</div>
        <div class="dash-stat-val">${completionRate}%</div>
        <div class="dash-stat-label">Complétion</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon">📆</div>
        <div class="dash-stat-val">J${today}</div>
        <div class="dash-stat-label">Jour programme</div>
      </div>
    </div>

    <!-- Progression 4 semaines -->
    <div class="card">
      <div class="card-title">📈 4 dernières semaines</div>
      <canvas id="progressionChart" width="320" height="110" style="width:100%;height:110px;border-radius:8px;display:block;"></canvas>
      <div class="progression-week-labels" id="progressionWeekLabels"></div>
    </div>

    ${latestWeight ? `
    <div class="card">
      <div class="card-title">⚖️ Poids</div>
      <div class="dash-weight-row">
        <div class="dash-weight-val">${latestWeight} kg</div>
        ${weightDelta !== null ? `<div class="dash-weight-delta ${parseFloat(weightDelta) <= 0 ? 'neg' : 'pos'}">${parseFloat(weightDelta) > 0 ? '+' : ''}${weightDelta} kg</div>` : ''}
      </div>
      ${weightData.length > 1 ? `<canvas id="weightChart" width="320" height="140" style="width:100%;height:140px;border-radius:8px;margin-top:12px;"></canvas>` : ''}
    </div>` : ''}

    <!-- Historique séances -->
    ${sessionHistory.length > 0 ? `
    <div class="card">
      <div class="card-title">📋 Dernières séances</div>
      ${sessionHistory.map(s => `
        <div class="dash-session-row">
          <span class="dash-session-check">✓</span>
          <span class="dash-session-label">Jour ${s.day} — ${s.title}</span>
        </div>
      `).join('')}
    </div>` : ''}

    <!-- Badges -->
    <div class="card">
      <div class="card-title">🏅 Succès (${unlockedBadges.length}/${BADGES.length})</div>
      <div class="badges-grid">
        ${BADGES.map(b => {
          const earned = unlockedBadges.includes(b.id);
          return `<div class="badge-item ${earned ? 'unlocked' : ''}">
            <div class="badge-icon">${earned ? b.icon : '🔒'}</div>
            <div class="badge-name">${b.name}</div>
            ${earned && b.desc ? `<div class="badge-desc">${b.desc}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

  `;

  requestAnimationFrame(() => {
    drawProgressionChart();
    if (weightData.length > 1) drawWeightChart('weightChart', weightData, 'poids', '#d71920');
  });
}

function handleQuickMeasure() {
  const date = document.getElementById('quickMeasureDate').value;
  const poids = document.getElementById('quickMeasureWeight').value;
  const taille = document.getElementById('quickMeasureTaille').value;
  const note = document.getElementById('quickMeasureNote').value;
  if (!date) { showToast('Indique une date.'); return; }
  if (!poids && !taille) { showToast('Indique au moins le poids ou le tour de taille.'); return; }
  saveWeight(date, poids || null, taille || null, note);
  document.getElementById('quickMeasureWeight').value = '';
  document.getElementById('quickMeasureTaille').value = '';
  document.getElementById('quickMeasureNote').value = '';
  showToast('Mesure enregistrée ✓');
  if (typeof syncToFirestore === 'function') syncToFirestore();
}

function handleSaveMeasure() {
  const date = document.getElementById('inputWeightDate').value;
  const poids = document.getElementById('inputWeightVal').value;
  const taille = document.getElementById('inputTailleVal').value;
  const note = document.getElementById('inputWeightNote').value;
  if (!date) { showToast('Indique une date.'); return; }
  if (!poids && !taille) { showToast('Indique au moins une mesure.'); return; }
  saveWeight(date, poids || null, taille || null, note);
  showToast('Mesure enregistrée !');
  renderDashboard();
}

// ─── Messages motivants ───────────────────────────────────────
const MOTIVATION_MSGS = [
  "La régularité, c'est ton super-pouvoir. Pas besoin d'être parfait, juste présent. 💪",
  "Chaque séance compte, même la plus courte. Tu n'as pas à tout déchirer aujourd'hui.",
  "Le secret du sport ? Recommencer. Encore. Et encore. Tu le sais déjà. 🔥",
  "Pas motivé ? Normal. Les champions s'entraînent aussi les jours sans envie.",
  "5 minutes suffisent pour démarrer. Et souvent, on continue bien plus. 🚀",
  "Ton corps se souvient de chaque effort. Même ceux que tu as oublié.",
  "La progression ne se voit pas tous les jours. Mais elle est là, invisible, constante.",
  "Ce n'est pas une question de force. C'est une question d'habitude. 🌱",
  "Quand tu ne veux pas, c'est exactement le bon moment. C'est là que ça compte.",
  "Chaque jour sans séance est juste un repos de plus. Reprends quand tu es prêt. ❤️",
  "Tu n'es pas en retard. Tu reprends là où tu en es. C'est suffisant.",
  "Une séance moyenne vaut mieux que pas de séance. Lance-toi. 🎯"
];

function getMotivationMsg(daysSince, streak) {
  if (daysSince === 0 && streak >= 7) return `${streak} jours de suite — tu es en feu ! Garde ce rythme. 🔥`;
  if (daysSince === 0 && streak >= 3) return `${streak} jours consécutifs ! La régularité paie. Continue. ⭐`;
  if (daysSince === 0) return MOTIVATION_MSGS[Math.floor(Math.random() * 6)];
  if (daysSince === 1) return "Hier c'était repos, aujourd'hui c'est ton jour. Allez, on y va. 💪";
  if (daysSince === 2) return "2 jours de pause, ça fait du bien. Et maintenant ? On repart en douceur. 🌱";
  if (daysSince >= 7) return "Peu importe le temps passé. Ce qui compte c'est de reprendre. Pas de jugement. ❤️";
  return `${daysSince} jours sans séance — et c'est ok. Reprends à ton rythme. Tu sais que tu peux. 💪`;
}

// ─── Vérification notification au chargement ─────────────────
function checkAndFireNotificationIfDue() {
  if (!currentUser || currentUser === 'invite') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if (!load('notifEnabled', false)) return;

  const today = todayISO();
  const notifTime = load('notifTime', '08:00');
  const [h, m] = notifTime.split(':').map(Number);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const targetMins = h * 60 + m;

  // Si l'heure de rappel est passée ET la séance n'est pas faite ET pas encore notifié aujourd'hui
  const sessionDone = isDone(dayNumber());
  const alreadySent = load('notifSentDate') === today;

  if (nowMins >= targetMins && !sessionDone && !alreadySent) {
    store('notifSentDate', today);
    const daysSince = getDaysSinceLastSession();
    const streak = getStreak();
    const body = getMotivationMsg(daysSince, streak);
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification('CallistheniLeyrat 🏋️', { body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', vibrate: [200, 100, 200], tag: 'callistheni-reminder' });
    }).catch(() => {});
  }
}

// Vérifie toutes les minutes si c'est l'heure de notifier
function startNotifWatcher() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if (!load('notifEnabled', false)) return;
  setInterval(checkAndFireNotificationIfDue, 60 * 1000);
  checkAndFireNotificationIfDue();
}

function testNotification() {
  if (!('Notification' in window)) { showToast('Notifications non supportées.'); return; }
  if (Notification.permission !== 'granted') {
    showToast('Active les notifications d\'abord dans les réglages.');
    return;
  }
  const msgs = [
    "Test réussi ! Tu recevras tes rappels comme ça. 💪",
    "Voilà à quoi ressemble un rappel CallistheniLeyrat ! 🔥",
  ];
  navigator.serviceWorker.ready.then(reg => {
    reg.showNotification('CallistheniLeyrat 🏋️', {
      body: msgs[Math.floor(Math.random() * msgs.length)],
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'callistheni-test',
    });
    showToast('Notification envoyée !');
  }).catch(() => showToast('Erreur — recharge l\'app.'));
}

// ─── Workout Overlay (séance plein écran) ─────────────────────

const woState = {
  exercises: [],      // array of {name, detail, duration, targetSets, imagePath}
  current: 0,
  timers: {},         // per idx: {doneSets, running, remaining, phase:'work'|'rest', interval}
  sessionStart: null,
  sessionInterval: null,
  stretchTimers: {},  // { idx: intervalId }
  _catchUpDay: null   // jour de rattrapage (null = aujourd'hui)
};

const WO_REST_DURATION = 30;
const SVG_R = 70; // radius of SVG circle
const SVG_CIRC = 2 * Math.PI * SVG_R;

function launchTodayWorkout() { openWorkoutOverlay(0); }

function woSkipStretch(idx) {
  clearInterval(woState.stretchTimers[idx]);
  const panel = document.getElementById('wo-stretch-' + idx);
  const main = document.getElementById('wo-main-' + idx);
  if (panel) panel.style.display = 'none';
  if (main) main.style.display = '';
}

function woStartStretch(idx) {
  const btn = document.getElementById('wo-stretch-start-' + idx);
  if (btn) btn.style.display = 'none';
  let remaining = 45;
  const timerEl = document.getElementById('wo-stretch-timer-' + idx);
  woState.stretchTimers[idx] = setInterval(() => {
    remaining--;
    if (timerEl) timerEl.textContent = remaining + 's';
    if (remaining <= 0) {
      clearInterval(woState.stretchTimers[idx]);
      playRestEnd();
      if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
      woSkipStretch(idx);
    }
  }, 1000);
}

function openWorkoutOverlay(startIdx = 0, forDay = null) {
  const today = forDay || dayNumber();
  woState._catchUpDay = forDay || null;
  const w = workout(today, getDiffOffset());
  if (!w.list || w.list.length === 0) return;

  // Parse exercises
  woState.exercises = w.list.map(e => {
    const secMatch = e.match(/(\d+)s/);
    const minMatch = e.match(/(\d+)\s*min/);
    let duration = secMatch ? parseInt(secMatch[1]) : (minMatch ? parseInt(minMatch[1]) * 60 : 30);
    const setsMatch = e.match(/(\d+)\s*x/);
    const targetSets = setsMatch ? parseInt(setsMatch[1]) : 3;
    const name = e.split(' — ')[0].trim();
    const exData = EXERCISES[name] || null;
    return {
      name, detail: e.split(' — ')[1] || '', duration, targetSets,
      imagePath: exData?.imagePath || '',
      desc: exData?.desc || '',
      tip: exData?.tip || '',
      muscles: exData?.muscles || [],
      errors: exData?.errors || [],
      variantEasy: exData?.variantEasy || '',
      variantHard: exData?.variantHard || ''
    };
  });

  woState.current = 0;
  woState.timers = {};
  woState.sessionStart = Date.now();

  // Init timer state for each exercise
  const savedProgress = loadSeriesProgress();
  woState.exercises.forEach((ex, i) => {
    const doneSets = savedProgress[i] || 0;
    woState.timers[i] = {
      doneSets,
      running: false,
      remaining: ex.duration,
      phase: 'work',
      interval: null
    };
  });

  // Build carousel
  woRenderCarousel();

  // Show overlay
  document.getElementById('workoutOverlay').classList.remove('hidden');

  // Si startIdx non forcé, reprendre au premier exercice non terminé
  if (startIdx === 0) {
    const firstIncomplete = woState.exercises.findIndex((ex, i) =>
      (woState.timers[i]?.doneSets || 0) < ex.targetSets
    );
    if (firstIncomplete > 0) startIdx = firstIncomplete;
  }
  if (startIdx > 0) woGoTo(startIdx);
  requestWakeLock();

  // Session clock
  woState.sessionInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - woState.sessionStart) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    const el = document.getElementById('woSessionTimer');
    if (el) el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }, 1000);

  woGoTo(0);
  woInitSwipe();
}

function closeWorkoutOverlay() {
  // Stop all timers
  Object.values(woState.timers).forEach(t => { if (t && t.interval) clearInterval(t.interval); });
  Object.values(woState.stretchTimers).forEach(id => clearInterval(id));
  woState.stretchTimers = {};
  clearInterval(woState.sessionInterval);
  woState.sessionInterval = null;
  document.getElementById('workoutOverlay').classList.add('hidden');
  releaseWakeLock();
}

function woRenderCarousel() {
  const carousel = document.getElementById('woCarousel');
  const dotsEl = document.getElementById('woDots');
  const n = woState.exercises.length;

  const slidesHTML = woState.exercises.map((ex, i) => {
    const t = woState.timers[i];
    const dots = Array.from({length: ex.targetSets}, (_, s) => {
      let cls = 'wo-serie-dot';
      if (s < t.doneSets) cls += ' done';
      return `<div class="${cls}">${s+1}</div>`;
    }).join('');

    const stretches = getStretchesForMuscles(ex.muscles);
    const stretchHTML = stretches.length > 0 ? `
      <div class="wo-stretch-panel" id="wo-stretch-${i}">
        <div class="wo-stretch-title">🧘 Avant de commencer</div>
        <div class="wo-stretch-subtitle">Étire ces muscles avant l'exercice</div>
        ${stretches.map(s => `
          <div class="wo-stretch-item">
            <div class="wo-stretch-emoji">${s.emoji}</div>
            <div>
              <div class="wo-stretch-name">${s.name}</div>
              <div class="wo-stretch-desc">${s.desc}</div>
            </div>
          </div>`).join('')}
        <div class="wo-stretch-timer-row">
          <div class="wo-stretch-timer" id="wo-stretch-timer-${i}">45s</div>
          <span class="wo-stretch-timer-label">pour s'étirer</span>
        </div>
        <div class="wo-stretch-btns">
          <button class="wo-stretch-skip" onclick="woSkipStretch(${i})">Passer →</button>
          <button class="wo-stretch-start" id="wo-stretch-start-${i}" onclick="woStartStretch(${i})">▶ Démarrer</button>
        </div>
      </div>` : '';

    return `
      <div class="wo-slide" id="wo-slide-${i}" data-idx="${i}">
        ${stretchHTML}
        <div class="wo-main" id="wo-main-${i}" style="${stretches.length > 0 ? 'display:none;' : ''}">
          <div class="wo-ex-name">${ex.name}</div>
          <div class="wo-ex-detail">${ex.detail}</div>
          <div class="wo-timer-ring" id="wo-ring-${i}">
            <svg viewBox="0 0 160 160" width="160" height="160">
              <circle class="wo-ring-bg" cx="80" cy="80" r="${SVG_R}" />
              <circle class="wo-ring-fill" id="wo-ring-fill-${i}" cx="80" cy="80" r="${SVG_R}"
                stroke-dasharray="${SVG_CIRC}"
                stroke-dashoffset="0" />
            </svg>
            <div class="wo-timer-display" id="wo-timer-display-${i}">${t.remaining}</div>
            <div class="wo-timer-label" id="wo-timer-label-${i}">Série 1/${ex.targetSets}</div>
          </div>
          <button class="wo-play-btn" id="wo-play-btn-${i}" onclick="woToggleTimer(${i})">▶</button>
          <div class="wo-series-row" id="wo-series-row-${i}">${dots}</div>
        </div>
        <div class="wo-info-panel">
          <div class="wo-info-content" id="wo-info-content-${i}">
            ${ex.imagePath ? `<img src="${ex.imagePath}" class="wo-info-img" onerror="this.style.display='none'" alt="${ex.name}" />` : ''}
            ${ex.muscles && ex.muscles.length ? `<div class="wo-muscles">${ex.muscles.map(m => `<span class="wo-muscle-tag">${m}</span>`).join('')}</div>` : ''}
            ${ex.desc ? `<p class="wo-info-desc">${ex.desc}</p>` : ''}
            ${ex.tip ? `<p class="wo-info-tip">💡 <strong>Conseil :</strong> ${ex.tip}</p>` : ''}
            ${ex.errors && ex.errors.length ? `
              <div class="wo-info-section">
                <div class="wo-info-section-title">⚠️ Erreurs à éviter</div>
                <ul class="wo-info-errors">${ex.errors.map(err => `<li>${err}</li>`).join('')}</ul>
              </div>` : ''}
            ${(ex.variantEasy || ex.variantHard) ? `
              <div class="wo-info-section">
                <div class="wo-info-section-title">🔄 Alternatives</div>
                ${ex.variantEasy ? `<p class="wo-variant easy">😌 Plus facile : ${ex.variantEasy}</p>` : ''}
                ${ex.variantHard ? `<p class="wo-variant hard">🔥 Plus difficile : ${ex.variantHard}</p>` : ''}
              </div>` : ''}
          </div>
        </div>
      </div>`;

  }).join('');

  carousel.innerHTML = `<div class="wo-carousel-track" id="woCarouselTrack">${slidesHTML}</div>`;

  // Activer le premier slide
  const firstSlide = document.getElementById('wo-slide-0');
  if (firstSlide) firstSlide.classList.add('active');

  // Dots
  dotsEl.innerHTML = Array.from({length: n}, (_, i) =>
    `<button class="wo-dot" id="wo-dot-${i}" onclick="woGoTo(${i})"></button>`
  ).join('');
}

function woGoTo(idx) {
  const n = woState.exercises.length;
  if (idx < 0 || idx >= n) return;

  // Désactiver l'ancien slide
  const prev = document.getElementById('wo-slide-' + woState.current);
  if (prev) prev.classList.remove('active');

  woState.current = idx;

  // Activer le nouveau et remonter en haut
  const next = document.getElementById('wo-slide-' + idx);
  if (next) { next.classList.add('active'); next.scrollTop = 0; }

  // Si l'exercice est déjà en cours (séries faites), passer l'étirement
  const t = woState.timers[idx];
  if (t && t.doneSets > 0) woSkipStretch(idx);

  document.getElementById('woProgress').textContent = `Exercice ${idx + 1} / ${n}`;

  for (let i = 0; i < n; i++) {
    const dot = document.getElementById('wo-dot-' + i);
    if (!dot) continue;
    dot.className = 'wo-dot';
    if (woState.timers[i] && woState.timers[i].doneSets >= woState.exercises[i].targetSets) {
      dot.classList.add('done');
    } else if (i === idx) {
      dot.classList.add('active');
    }
  }
}

// Swipe handling
let woTouchStartX = 0;
let woTouchStartY = 0;

function woInitSwipe() {
  const carousel = document.getElementById('woCarousel');
  if (!carousel) return;
  carousel.addEventListener('touchstart', e => {
    woTouchStartX = e.touches[0].clientX;
    woTouchStartY = e.touches[0].clientY;
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - woTouchStartX;
    const dy = e.changedTouches[0].clientY - woTouchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) woGoTo(woState.current + 1);
      else woGoTo(woState.current - 1);
    }
  }, { passive: true });
}

function woToggleTimer(idx) {
  const t = woState.timers[idx];
  const ex = woState.exercises[idx];
  if (!t || !ex) return;

  if (t.running) {
    clearInterval(t.interval);
    t.interval = null;
    t.running = false;
    const btn = document.getElementById('wo-play-btn-' + idx);
    if (btn) { btn.textContent = '▶'; btn.className = 'wo-play-btn' + (t.phase === 'rest' ? ' rest' : ''); }
  } else {
    t.running = true;
    const btn = document.getElementById('wo-play-btn-' + idx);
    if (btn) { btn.textContent = '⏸'; btn.className = 'wo-play-btn' + (t.phase === 'rest' ? ' rest' : ''); }
    t.interval = setInterval(() => woTick(idx), 1000);
    startSessionTimer(); // also track in global session timer
  }
}

function woTick(idx) {
  const t = woState.timers[idx];
  const ex = woState.exercises[idx];
  if (!t || !ex) return;

  if (t.remaining > 0) {
    t.remaining--;
    if (t.phase === 'rest' && t.remaining >= 1 && t.remaining <= 5) {
      playCountdownBeep(t.remaining);
    }
    woUpdateRingDisplay(idx);
  } else {
    clearInterval(t.interval);
    t.interval = null;
    t.running = false;

    if (t.phase === 'work') {
      t.doneSets++;
      if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
      playBeep();
      saveSeriesProgress();
      woUpdateSeriesDots(idx);

      if (t.doneSets >= ex.targetSets) {
        // All series done — mark exercise complete
        woMarkExerciseDone(idx);
      } else {
        // Switch to rest phase — auto-continue
        t.phase = 'rest';
        t.remaining = WO_REST_DURATION;
        t.running = true;
        playRestStart(); // son grave : début de pause
        if (navigator.vibrate) navigator.vibrate([200]);
        const btn = document.getElementById('wo-play-btn-' + idx);
        if (btn) { btn.textContent = '⏸'; btn.className = 'wo-play-btn rest'; }
        const fill = document.getElementById('wo-ring-fill-' + idx);
        if (fill) fill.classList.add('rest-phase');
        woUpdateRingDisplay(idx);
        t.interval = setInterval(() => woTick(idx), 1000);
      }
    } else {
      // rest done → back to work — auto-continue
      t.phase = 'work';
      t.remaining = ex.duration;
      t.running = true;
      playRestEnd(); // sons montants : fin de pause, on repart
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 300]);
      const btn = document.getElementById('wo-play-btn-' + idx);
      if (btn) { btn.textContent = '⏸'; btn.className = 'wo-play-btn'; }
      const fill = document.getElementById('wo-ring-fill-' + idx);
      if (fill) fill.classList.remove('rest-phase');
      woUpdateRingDisplay(idx);
      t.interval = setInterval(() => woTick(idx), 1000);
    }
  }
}

function woUpdateRingDisplay(idx) {
  const t = woState.timers[idx];
  const ex = woState.exercises[idx];
  if (!t || !ex) return;

  const disp = document.getElementById('wo-timer-display-' + idx);
  if (disp) disp.textContent = t.remaining;

  const lbl = document.getElementById('wo-timer-label-' + idx);
  if (lbl) {
    lbl.textContent = t.phase === 'rest'
      ? 'Repos...'
      : `Série ${t.doneSets + 1}/${ex.targetSets}`;
  }

  // SVG ring
  const fill = document.getElementById('wo-ring-fill-' + idx);
  if (fill) {
    const total = t.phase === 'rest' ? WO_REST_DURATION : ex.duration;
    const pct = t.remaining / total;
    fill.style.strokeDashoffset = SVG_CIRC * (1 - pct);
  }
}

function woUpdateSeriesDots(idx) {
  const t = woState.timers[idx];
  const ex = woState.exercises[idx];
  if (!t || !ex) return;
  const row = document.getElementById('wo-series-row-' + idx);
  if (!row) return;
  row.innerHTML = Array.from({length: ex.targetSets}, (_, s) => {
    let cls = 'wo-serie-dot';
    if (s < t.doneSets) cls += ' done';
    else if (s === t.doneSets) cls += ' current';
    return `<div class="${cls}">${s+1}</div>`;
  }).join('');
}

function woMarkExerciseDone(idx) {
  // Save progress
  const progress = {};
  woState.exercises.forEach((ex, i) => {
    progress[i] = woState.timers[i]?.doneSets || 0;
  });
  store('series_progress_' + dayNumber(), progress);

  // Visual: mark slide as done
  const slide = document.getElementById('wo-slide-' + idx);
  if (slide) slide.classList.add('slide-done');

  // Update dots
  woGoTo(woState.current);

  // Check if all done
  const allDone = woState.exercises.every((ex, i) =>
    (woState.timers[i]?.doneSets || 0) >= ex.targetSets
  );

  if (allDone) {
    setTimeout(() => woShowCompletion(), 800);
  } else {
    // Auto-advance to next undone exercise after 1s
    setTimeout(() => {
      const next = woState.exercises.findIndex((ex, i) =>
        i > idx && (woState.timers[i]?.doneSets || 0) < ex.targetSets
      );
      if (next >= 0) woGoTo(next);
    }, 1000);
  }
}

// Milestones de série qui méritent une célébration spéciale
const STREAK_MILESTONES = [
  { streak: 3,  emoji: '⭐', title: '3 jours de suite !',       msg: 'Le mouvement est lancé. Ne t\'arrête plus.' },
  { streak: 7,  emoji: '🔥', title: 'Une semaine complète !',   msg: 'Une semaine sans fléchir. Tu montres qui tu es vraiment.' },
  { streak: 14, emoji: '⚡', title: 'Deux semaines non-stop !', msg: 'Deux semaines. L\'habitude est là. Maintenant tu es lancé(e).' },
  { streak: 21, emoji: '🌟', title: '21 jours — L\'habitude !', msg: 'On dit qu\'il faut 21 jours pour créer une habitude. C\'est fait. Tu as réussi.' },
  { streak: 30, emoji: '👑', title: 'UN MOIS ENTIER !',         msg: 'Trente jours consécutifs. C\'est exceptionnel. Tu es une inspiration.' },
  { streak: 50, emoji: '🏆', title: '50 jours de feu !',        msg: 'Cinquante jours. Ce n\'est plus une habitude, c\'est une identité.' },
  { streak: 100,emoji: '🥇', title: '100 jours — Centurion !',  msg: 'Cent jours. Tu es dans une catégorie à part. Rien ne peut t\'arrêter.' },
];

function getMilestone(streak) {
  const milestones = [...STREAK_MILESTONES].reverse();
  return milestones.find(m => streak === m.streak) || null;
}

function getCompletionMsg(streak, sessions) {
  if (streak >= 30) return `${streak} jours d'affilée — tu es une machine ! 👑`;
  if (streak >= 21) return `${streak} jours de suite — l'habitude est bien ancrée ! 🌟`;
  if (streak >= 14) return `${streak} jours consécutifs — tu es en feu ! ⚡`;
  if (streak >= 7)  return `${streak} jours de suite — belle régularité ! 🔥`;
  if (streak >= 3)  return `${streak} jours d'affilée — continue ! ⭐`;
  if (sessions >= 50) return `${sessions} séances au compteur — champion(ne) ! 🏆`;
  if (sessions >= 20) return `${sessions} séances — tu progresses super bien ! 💪`;
  if (sessions >= 10) return `${sessions} séances au compteur — en route ! 🏅`;
  if (sessions === 1) return 'Ta toute première séance — l\'aventure commence ! 🎉';
  return 'Belle séance ! Ton futur toi te remercie. 💪';
}

function woShowCompletion() {
  clearInterval(woState.sessionInterval);
  woState.sessionInterval = null;

  const { newlyUnlocked } = checkBadges();
  const targetDay = woState._catchUpDay || dayNumber();
  markDone(targetDay, selectedFeedback);
  saveStreak();
  if (woState._catchUpDay) {
    woState._catchUpDay = null;
    setTimeout(() => { renderCalendar(); renderHome(); }, 500);
  }

  const streak = getStreak();
  const sessions = countDoneSessions();
  const milestone = getMilestone(streak);
  const msg = getCompletionMsg(streak, sessions);

  const overlay = document.getElementById('workoutOverlay');
  const comp = document.createElement('div');
  comp.className = 'wo-completion' + (milestone ? ' wo-completion-milestone' : '');

  // Confetti elements pour les milestones
  const confetti = milestone ? `<div class="wo-confetti" aria-hidden="true">${
    ['🎊','✨','🎉','⭐','💥','🔥','🌟','💫'].map((e,i) =>
      `<span class="wo-confetti-piece" style="--i:${i}">${e}</span>`
    ).join('')
  }</div>` : '';

  // Badges nouvellement débloqués
  const badgeHTML = newlyUnlocked.length ? `
    <div class="wo-new-badges">
      <div class="wo-new-badge-title">🏅 Succès débloqué${newlyUnlocked.length > 1 ? 's' : ''} !</div>
      ${newlyUnlocked.map(b => `
        <div class="wo-new-badge-item">
          <span class="wo-new-badge-icon">${b.icon}</span>
          <div>
            <div class="wo-new-badge-name">${b.name}</div>
            <div class="wo-new-badge-desc">${b.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  comp.innerHTML = `
    ${confetti}
    <div class="wo-completion-emoji">${milestone ? milestone.emoji : '🎉'}</div>
    <div class="wo-completion-title">${milestone ? milestone.title : 'Séance terminée !'}</div>
    <div class="wo-completion-msg">${milestone ? milestone.msg : msg}</div>
    ${milestone ? `<div class="wo-completion-streak-badge">🔥 ${streak} jours</div>` : ''}
    ${badgeHTML}
    <button class="btn btn-success" style="width:220px;margin-top:8px;" onclick="closeWorkoutOverlay();renderHome();">✓ Valider et continuer</button>
  `;
  overlay.appendChild(comp);
  if (navigator.vibrate) navigator.vibrate(milestone
    ? [200, 100, 200, 100, 400]
    : [100, 50, 100, 50, 300]
  );
}

function woToggleInfo(idx) {
  const content = document.getElementById('wo-info-content-' + idx);
  if (!content) return;
  content.classList.toggle('hidden');
}


// ─── Admin (Quentin uniquement) ───────────────────────────────
async function renderAdmin() {
  const el = document.getElementById('adminContent');
  if (!el) return;
  if (typeof fbIsAdmin !== 'function' || !fbIsAdmin()) {
    el.innerHTML = '<div class="card" style="color:var(--txt2);text-align:center;">Accès réservé à l\'administrateur.</div>';
    return;
  }

  el.innerHTML = '<div class="card" style="text-align:center;color:var(--txt2);">Chargement des données…</div>';

  try {
    const users = await fbAdminGetUsers();

    function parseStats(data) {
      if (!data) return { sessions: 0, streak: 0, xp: 0, startDate: null };
      const d = data;
      const startDate = d.startDate || null;
      let sessions = 0, streak = 0;
      if (startDate) {
        const dayNum = Math.floor((Date.now() - new Date(startDate + 'T00:00:00Z').getTime()) / 86400000) + 1;
        for (let i = 1; i <= dayNum; i++) { if (d['done_' + i]) sessions++; }
        for (let i = dayNum; i >= 1; i--) { if (d['done_' + i]) streak++; else break; }
      }
      return { sessions, streak, xp: parseInt(d.xp) || 0, startDate };
    }

    el.innerHTML = `
      <div class="admin-summary card">
        <div class="admin-summary-title">👥 ${users.length} utilisateur${users.length > 1 ? 's' : ''} Firebase</div>
      </div>

      ${users.map(u => {
        const stats = parseStats(u.data);
        const name = u.profile?.displayName || u.uid.slice(0, 8);
        const email = u.profile?.email || '';
        return `
        <div class="card admin-user-card">
          <div class="admin-user-header">
            <div class="admin-user-avatar">${name.charAt(0).toUpperCase()}</div>
            <div class="admin-user-info">
              <div class="admin-user-name">${name}</div>
              <div class="admin-user-meta">${email}${stats.startDate ? ` · depuis le ${stats.startDate}` : ''}</div>
            </div>
          </div>
          <div class="admin-stats-row">
            <div class="admin-stat"><div class="admin-stat-val">${stats.sessions}</div><div class="admin-stat-lbl">Séances</div></div>
            <div class="admin-stat"><div class="admin-stat-val">${stats.streak}</div><div class="admin-stat-lbl">Série</div></div>
            <div class="admin-stat"><div class="admin-stat-val">${stats.xp}</div><div class="admin-stat-lbl">XP</div></div>
          </div>
        </div>`;
      }).join('')}
    `;
  } catch (err) {
    el.innerHTML = `<div class="card" style="color:red;">${err.message || 'Erreur'}</div>`;
  }
}

// ─── Init ─────────────────────────────────────────────────────
function init() {
  // Enregistrement du service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }

  migrateOldData();
}

document.addEventListener('DOMContentLoaded', init);
