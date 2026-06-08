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
  { id: 'first',    icon: '🏅', name: 'Première séance',       check: () => countDoneSessions() >= 1 },
  { id: 'week',     icon: '🔥', name: '7 jours consécutifs',   check: () => getStreak() >= 7 },
  { id: 's30',      icon: '💪', name: '30 séances',            check: () => countDoneSessions() >= 30 },
  { id: 'streak14', icon: '⚡', name: '14 jours de suite',     check: () => getStreak() >= 14 },
  { id: 'cycle2',   icon: '🌀', name: 'Cycle 2 atteint',       check: () => dayNumber() >= 29 },
  { id: 'master',   icon: '👑', name: 'Niveau Maître',         check: () => getRPGLevel() >= 5 }
];

function checkBadges() {
  const unlocked = load('badges', []);
  let changed = false;
  BADGES.forEach(b => {
    if (!unlocked.includes(b.id) && b.check()) {
      unlocked.push(b.id);
      changed = true;
    }
  });
  if (changed) store('badges', unlocked);
  return unlocked;
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
];

const COMEBACK_MESSAGES = [
  "Content de te revoir ! On reprend en douceur, sans pression.",
  "Bienvenue de retour ! Ton corps se souvient de tout.",
  "Tu es là, c'est l'essentiel. On y va tranquillement.",
  "Retour en force ! Pas de jugement ici, que du positif.",
];

function randomEncouragement() {
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
    [0, 0.3, 0.6].forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.25);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.25);
    });
  } catch (e) { /* silencieux si le contexte audio échoue */ }
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

// ─── Mini-timers inline avec compteur de séries ───────────────
// structure : { remaining, initial, interval, running, targetSets, doneSets, isTimed }
const inlineTimers = {};

function startInlineTimer(idx, secs) {
  const timerEl = document.getElementById('inline-timer-' + idx);
  timerEl.classList.add('visible');

  if (!inlineTimers[idx]) {
    const initial = secs > 0 ? secs : 60;
    const targetSets = parseInt(timerEl.dataset.sets) || 3;
    inlineTimers[idx] = {
      remaining: initial, initial, interval: null, running: false,
      targetSets, doneSets: 0, isTimed: true // toujours actif
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
        if (navigator.vibrate) navigator.vibrate([200, 80, 200, 80, 400]);
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
  document.getElementById('page-' + id).classList.add('active');
  document.getElementById('nav-' + id).classList.add('active');

  if (id === 'home') renderHome();
  if (id === 'calendar') renderCalendar();
  if (id === 'dashboard') renderDashboard();
  if (id === 'library') renderLibrary();
  if (id === 'settings') renderSettings();
}

// ─── Rendu — Page d'accueil ───────────────────────────────────
function renderHome() {
  // Nettoyer les timers inline actifs de la session précédente
  Object.values(inlineTimers).forEach(t => clearInterval(t?.interval));
  for (const k in inlineTimers) delete inlineTimers[k];
  const today = dayNumber();
  const w = workout(today, getDiffOffset());
  const rpg = getRPGInfo();
  const streak = getStreak();
  const sessions = countDoneSessions();
  const doneToday = isDone(today);

  // Jour / cycle
  document.getElementById('heroDay').textContent = today;
  document.getElementById('heroCycle').textContent = `Cycle ${cycleNumber(today)}`;
  document.getElementById('heroLabel').textContent = w.title;

  // Séance du jour
  document.getElementById('workoutTitle').textContent = w.title;

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
    document.getElementById('workoutExercises').innerHTML = w.list
    .map((e, i) => {
      // Extraire durée si chrono
      const secMatch = e.match(/(\d+)s/);
      const minMatch = e.match(/(\d+)\s*min/);
      let secs = null;
      if (secMatch) secs = parseInt(secMatch[1]);
      else if (minMatch) secs = parseInt(minMatch[1]) * 60;

      // Extraire le nombre de séries cible (ex: "3 x 15" → 3, "2 x 30s" → 2)
      const setsMatch = e.match(/(\d+)\s*x/);
      const targetSets = setsMatch ? parseInt(setsMatch[1]) : 3;

      const exName = e.split(' — ')[0].trim();

      // Tous les exercices ont maintenant une durée — fallback 30s si non détecté
      const duration = secs || 30;
      const goBtn = `<button class="exercise-start-btn" onclick="startInlineTimer(${i}, ${duration})">⏱ ${duration}s</button>`;

      const timerControls = `
        <button class="inline-btn inline-btn-start" onclick="toggleInlineTimer(${i})">▶</button>
        <button class="inline-btn inline-btn-reset" onclick="resetInlineTimer(${i})">↺</button>`;

      const defaultDisplay = String(Math.floor(duration/60)).padStart(2,'0') + ':' + String(duration%60).padStart(2,'0');

      const infoBtn = EXERCISES[exName]
        ? `<button class="exercise-info-btn" onclick="openExerciseModal('${exName.replace(/'/g, "\\'")}')">ℹ️</button>`
        : '';

      return `
        <div class="exercise-item">
          <div class="exercise-item-top">
            <span class="exercise-item-label">${e}</span>
            ${infoBtn}
            ${goBtn}
          </div>
          <div class="exercise-inline-timer" id="inline-timer-${i}" data-sets="${targetSets}">
            <div style="display:flex;flex-direction:column;gap:8px;width:100%;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="inline-timer-display" id="inline-display-${i}">${defaultDisplay}</div>
                <div class="inline-timer-controls" style="gap:6px;">
                  ${timerControls}
                </div>
                <div class="inline-series-counter" id="inline-counter-${i}">0/${targetSets}</div>
              </div>
              <button class="inline-btn inline-btn-serie" id="inline-serie-btn-${i}" onclick="recordSerie(${i})">
                ✓ Première série !
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
    document.getElementById('workoutNote').textContent = w.note;
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
  document.getElementById('rpgNext').textContent = rpg.next
    ? `Prochain niveau : ${rpg.next} (encore ${rpg.xpToNext} XP)`
    : 'Niveau maximum atteint — tu es un Maître ! 👑';

  // Stats rapides
  document.getElementById('statSessions').textContent = sessions;
  document.getElementById('statStreak').textContent = streak + ' j';
  document.getElementById('statBestStreak').textContent = getBestStreak() + ' j';
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
      cls += ' future';
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

    html += `<div class="${cls}" title="${title}">${d}</div>`;
  }

  document.getElementById('calGrid').innerHTML = html;
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
  // Badges
  const unlocked = load('badges', []);
  document.getElementById('badgesGrid').innerHTML = BADGES.map(b => `
    <div class="badge-item ${unlocked.includes(b.id) ? 'unlocked' : ''}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
    </div>
  `).join('');

  document.getElementById('rpgResetInfo').textContent =
    `${getRPGInfo().name} — ${getXP()} XP — ${countDoneSessions()} séances`;
}

function saveSettings() {
  store('startDate', document.getElementById('settingStartDate').value);
  store('level', document.getElementById('settingLevel').value);
  store('notifTime', document.getElementById('settingNotifTime').value);
  store('notifEnabled', document.getElementById('settingNotifEnabled').checked);
  store('objective', document.getElementById('settingObjective').value);
  store('rythm', document.getElementById('settingRythm').value);
  scheduleNotifications();
  showToast('Réglages enregistrés ✓');
  renderHome();
}

// ─── Notifications ────────────────────────────────────────────
function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') scheduleNotifications();
    });
  }
}

function scheduleNotifications() {
  if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') return;
  if (!load('notifEnabled', false)) return;

  const timeStr = load('notifTime', '08:00');
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const next = new Date(now);
  next.setHours(h, m, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next - now;

  const streak = getStreak();
  const body = streak > 1
    ? `Plus qu'une séance pour battre ton record de ${streak} jours ! Tu assures.`
    : 'C\'est l\'heure de ta séance du jour. Ton futur toi te remerciera ! 💪';

  navigator.serviceWorker.ready.then(reg => {
    reg.active?.postMessage({
      type: 'SCHEDULE_NOTIFICATION',
      title: 'CallistheniLeyrat — Séance du jour 🏋️',
      body,
      delay
    });
  });

  // Relance bienveillante si absence
  const daysSinceLastSession = getDaysSinceLastSession();
  if (daysSinceLastSession >= 1) {
    let relanceBody = null;
    if (daysSinceLastSession >= 7) {
      relanceBody = 'Ça fait un moment, et c\'est ok. Reprends quand tu veux, en douceur. On est là ! 🤗';
    } else if (daysSinceLastSession >= 3) {
      relanceBody = 'Un peu de temps s\'est passé — pas de jugement ! Un petit retour quand tu veux. 💪';
    } else if (daysSinceLastSession >= 1) {
      relanceBody = 'Petite pensée pour ta séance d\'hier — à toi de décider quand tu reprends !';
    }
    if (relanceBody) {
      navigator.serviceWorker.ready.then(reg => {
        reg.active?.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          title: 'On reprend en douceur ? 🌱',
          body: relanceBody,
          delay: delay + 3600000 // 1h après la notif principale
        });
      });
    }
  }
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

// ─── Sélection de profil ─────────────────────────────────────
function selectProfile(user) {
  currentUser = user;
  // Ne pas mémoriser le profil invité pour ne pas bloquer Quentin/Sophie au prochain lancement
  if (user !== 'invite') localStorage.setItem('lastUser', user);
  document.getElementById('profileScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  const displayName = user === 'invite' ? 'Invité' : user.charAt(0).toUpperCase() + user.slice(1);
  document.getElementById('topbarProfileName').textContent = displayName;

  // Sauvegarder automatiquement la date de départ si c'est la première utilisation
  if (!load('startDate')) {
    store('startDate', new Date().toISOString().slice(0, 10));
  }

  // Demander permission notif après la première interaction
  const sessions = countDoneSessions();
  if (sessions >= 1) requestNotificationPermission();

  // Vérifier si c'est un retour après absence
  const daysSince = getDaysSinceLastSession();
  if (daysSince >= 2) {
    setTimeout(() => {
      document.getElementById('comebackMsg').textContent = randomComeback();
      document.getElementById('comebackBanner').classList.remove('hidden');
    }, 500);
  }

  showPage('home');
  // Garder l'écran allumé si la séance du jour n'est pas encore faite
  if (!isDone(dayNumber())) requestWakeLock();
}

function switchProfile() {
  currentUser = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('profileScreen').classList.remove('hidden');
  document.getElementById('comebackBanner').classList.add('hidden');
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

function renderDashboard() {
  const rpg = getRPGInfo();
  const sessions = countDoneSessions();
  const streak = getStreak();
  const bestStreak = getBestStreak();
  const history = load('weightHistory', []);

  const weightData = history.filter(h => h.poids).map(h => ({
    val: h.poids,
    label: h.date.slice(5) // MM-DD
  }));
  const tailleData = history.filter(h => h.taille).map(h => ({
    val: h.taille,
    label: h.date.slice(5)
  }));

  document.getElementById('dashContent').innerHTML = `
    <div class="card">
      <div class="card-title">Statistiques</div>
      <div class="stat-row"><span class="stat-label">Séances totales</span><span class="stat-value">${sessions}</span></div>
      <div class="stat-row"><span class="stat-label">Série actuelle</span><span class="stat-value">${streak} j</span></div>
      <div class="stat-row"><span class="stat-label">Meilleure série</span><span class="stat-value">${bestStreak} j</span></div>
      <div class="stat-row"><span class="stat-label">XP total</span><span class="stat-value">${rpg.xp} XP</span></div>
      <div class="stat-row"><span class="stat-label">Niveau RPG</span><span class="stat-value">${rpg.name}</span></div>
    </div>

    <div class="card">
      <div class="card-title">Ajouter une mesure</div>
      <div class="settings-group">
        <div class="settings-label">Date</div>
        <input type="date" id="inputWeightDate" class="settings-field" value="${new Date().toISOString().slice(0,10)}" />
      </div>
      <div class="settings-group">
        <div class="settings-label">Poids (kg)</div>
        <input type="number" id="inputWeightVal" class="settings-field" step="0.1" min="30" max="300" placeholder="ex: 72.5" />
      </div>
      <div class="settings-group">
        <div class="settings-label">Tour de taille (cm)</div>
        <input type="number" id="inputTailleVal" class="settings-field" step="0.5" min="40" max="200" placeholder="ex: 85.0" />
      </div>
      <div class="settings-group">
        <div class="settings-label">Note (optionnel)</div>
        <input type="text" id="inputWeightNote" class="settings-field" placeholder="ex: Après le repas" />
      </div>
      <button class="btn btn-primary mt-8" onclick="handleSaveMeasure()">Ajouter mesure</button>
    </div>

    <div class="card">
      <div class="card-title">Évolution du poids (kg)</div>
      ${weightData.length > 0
        ? `<canvas id="weightChart" width="320" height="160" style="width:100%;height:160px;border-radius:8px;"></canvas>`
        : `<div class="text-muted" style="text-align:center;padding:20px 0;">Aucune donnée de poids enregistrée.</div>`}
    </div>

    <div class="card">
      <div class="card-title">Évolution du tour de taille (cm)</div>
      ${tailleData.length > 0
        ? `<canvas id="tailleChart" width="320" height="160" style="width:100%;height:160px;border-radius:8px;"></canvas>`
        : `<div class="text-muted" style="text-align:center;padding:20px 0;">Aucune donnée de tour de taille enregistrée.</div>`}
    </div>

    ${history.length > 0 ? `
    <div class="card">
      <div class="card-title">Historique</div>
      ${history.slice().reverse().slice(0, 10).map(h => `
        <div class="stat-row">
          <span class="stat-label">${h.date}${h.note ? ' — ' + h.note : ''}</span>
          <span class="stat-value">${h.poids ? h.poids + ' kg' : ''}${h.poids && h.taille ? ' / ' : ''}${h.taille ? h.taille + ' cm' : ''}</span>
        </div>
      `).join('')}
    </div>` : ''}
  `;

  // Dessiner les graphiques après rendu DOM
  requestAnimationFrame(() => {
    if (weightData.length > 0) drawWeightChart('weightChart', weightData, 'poids', '#d71920');
    if (tailleData.length > 0) drawWeightChart('tailleChart', tailleData, 'tour de taille', '#2563eb');
  });
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

// ─── Init ─────────────────────────────────────────────────────
function init() {
  // Enregistrement du service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }

  migrateOldData();

  // Reprendre le dernier profil si disponible
  const last = localStorage.getItem('lastUser');
  if (last === 'quentin' || last === 'sophie') {
    selectProfile(last);
  }
}

document.addEventListener('DOMContentLoaded', init);
