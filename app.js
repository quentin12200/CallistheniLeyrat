/* ============================================================
   CallistheniLeyrat — app.js
   Données : localStorage, préfixées par profil (quentin_ / sophie_)
   ============================================================ */

// ─── Données des exercices ────────────────────────────────────
const EXERCISES = {
  "Montées de genoux": {
    desc: "Monte les genoux doucement, sans sauter au début. Respire, garde le buste droit.",
    tip: "Version facile : marche active sur place. Pose les mains sur les hanches pour garder l'équilibre.",
    muscles: ["Abdos", "Cardio", "Jambes"]
  },
  "Footing sur place": {
    desc: "Trottine léger, pieds qui décollent à peine du sol. Garde les épaules relâchées.",
    tip: "Version facile : marche rapide. Version dure : genoux plus hauts.",
    muscles: ["Cardio", "Mollets", "Jambes"]
  },
  "Squats": {
    desc: "Pieds largeur hanches, fesses vers l'arrière, dos droit. Descends seulement tant que tu contrôles.",
    tip: "Imagine que tu t'assoies sur une chaise derrière toi. Les genoux suivent la direction des orteils.",
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"]
  },
  "Dips chaise": {
    desc: "Mains sur une chaise stable, coudes vers l'arrière. Descends et remonte.",
    tip: "Version facile : pieds proches de la chaise. Attention à ne pas hausser les épaules.",
    muscles: ["Triceps", "Épaules", "Pectoraux"]
  },
  "Pompes mur": {
    desc: "Mains contre le mur, corps gainé comme une planche. Plie les coudes pour te rapprocher du mur.",
    tip: "Plus tes pieds sont loin du mur, plus c'est difficile. Garde le ventre rentré.",
    muscles: ["Pectoraux", "Triceps", "Épaules"]
  },
  "Pompes genoux": {
    desc: "Au sol sur les genoux, corps aligné de la tête aux genoux. Descends contrôlé, remonte en soufflant.",
    tip: "Pose une serviette sous les genoux si inconfort. Regarde le sol, pas devant toi.",
    muscles: ["Pectoraux", "Triceps", "Abdos"]
  },
  "Pompes sol": {
    desc: "Corps en planche complète, mains sous les épaules. Garde les abdos serrés tout le mouvement.",
    tip: "Si les hanches montent ou descendent, reviens aux pompes genoux encore un peu.",
    muscles: ["Pectoraux", "Triceps", "Abdos", "Épaules"]
  },
  "Pont fessier": {
    desc: "Allongé sur le dos, pieds au sol près des fesses, monte le bassin. Serre les fessiers en haut.",
    tip: "Maintiens 1 à 2 secondes en haut pour mieux activer les fessiers.",
    muscles: ["Fessiers", "Ischio-jambiers", "Lombaires"]
  },
  "Chaise": {
    desc: "Dos au mur, cuisses parallèles au sol, comme assis sur une chaise invisible.",
    tip: "Version facile : descends moins bas. Respire régulièrement, ne retiens pas ton souffle.",
    muscles: ["Quadriceps", "Fessiers", "Mollets"]
  },
  "Gainage face": {
    desc: "Sur les coudes ou les mains, corps en planche. Maintiens la position sans bouger.",
    tip: "Version facile : genoux au sol. Regarde le sol, contracte les fesses et le ventre.",
    muscles: ["Abdos", "Lombaires", "Épaules"]
  },
  "Gainage côté": {
    desc: "Sur un coude, corps aligné de la tête aux pieds, côté droit puis gauche.",
    tip: "Version facile : genou du bas au sol. Lève légèrement la hanche si tu veux rendre plus dur.",
    muscles: ["Obliques", "Abdos", "Épaules"]
  },
  "Superman": {
    desc: "Sur le ventre, décolle doucement bras et jambes simultanément. Garde la nuque dans l'axe.",
    tip: "Tiens 2 secondes en haut. Ne force pas si tu sens une douleur dans le bas du dos.",
    muscles: ["Lombaires", "Fessiers", "Épaules"]
  },
  "Fentes": {
    desc: "Un pied devant, descends en gardant le buste droit, remonte. Alterne les jambes.",
    tip: "Version facile : petite amplitude ou appui à un mur pour l'équilibre.",
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"]
  },
  "Jumping jack": {
    desc: "Ouvre et ferme bras et jambes en même temps. Atterrissage amorti, genoux légèrement fléchis.",
    tip: "Version facile : sans saut, un pied après l'autre. Idéal pour s'échauffer.",
    muscles: ["Cardio", "Épaules", "Jambes"]
  },
  "Mountain climbers": {
    desc: "En position de planche, ramène les genoux vers la poitrine en alternance.",
    tip: "Version facile : lentement, mains sur une table surélevée. Garde les hanches basses.",
    muscles: ["Abdos", "Cardio", "Épaules"]
  },
  "Étirements": {
    desc: "Respiration lente et profonde. Psoas, dos, ischios, mollets, quadriceps. Ne force jamais.",
    tip: "Tiens chaque étirement 30 à 60 secondes. C'est une séance à part entière, pas une option !",
    muscles: ["Mobilité", "Récupération"]
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
  let reps = 15 + Math.min(15, hard * 3) + diffOffset * 5;
  reps = Math.max(8, reps);
  let plank = 30 + Math.min(45, hard * 5) + diffOffset * 5;
  plank = Math.max(20, plank);
  const title = baseWeek(day);

  let list = [];

  if (day <= 14) {
    if (d === 1) list = [`Montées de genoux — 3 x 20`, `Squats — 3 x 15`, `Dips chaise — 3 x 10 à 15`, `Pompes mur — 3 x 15`];
    if (d === 2) list = [`Footing sur place — 3 x 1 min`, `Squats — 3 x 15`, `Pont fessier — 3 x 15`, `Chaise — 3 x 30s`];
    if (d === 3) list = [`Montées de genoux — 3 x 20`, `Pompes mur — 3 x 15`, `Dips chaise — 3 x 10 à 15`, `Pompes genoux — 3 x 8 à 12`];
    if (d === 4) list = [`Étirements — 10 à 15 min`];
    if (d === 5) list = [`Montées de genoux — 3 x 20`, `Squats — 3 x 15`, `Gainage côté — 2 x 30s par côté`, `Superman — 3 x 15`];
    if (d === 6) list = [`Montées de genoux — 3 x 20`, `Squats — 3 x 15`, `Pont fessier — 3 x 15`, `Fentes — 2 x 30s par jambe`];
    if (d === 7) list = [`Footing sur place — 3 x 1 min`, `Pompes mur — 3 x 15`, `Gainage face — 3 x 30s`, `Dips chaise — 3 x 10 à 15`];
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

  list = circuit[d].map(x =>
    `${x} — ${(x.includes('Gainage') || x === 'Chaise') ? plank + 's' : reps + ' reps'}`
  );

  return {
    title: `${title} — circuit ${rounds} tour${rounds > 1 ? 's' : ''}`,
    list,
    note: `Repos : ${rest}s entre exercices, 1 à 2 min entre les tours.`,
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
  if (document.visibilityState === 'visible' && inlineTimerActive()) requestWakeLock();
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
    const initial = secs > 0 ? secs : 0; // 0 = pas chronométré (reps libres)
    const targetSets = parseInt(timerEl.dataset.sets) || 3;
    inlineTimers[idx] = {
      remaining: initial, initial, interval: null, running: false,
      targetSets, doneSets: 0, isTimed: secs > 0
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

  seanceFinieEl.classList.remove('hidden');
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
  if (id === 'timer') renderTimer();
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

      const goBtn = secs
        ? `<button class="exercise-start-btn" onclick="startInlineTimer(${i}, ${secs})">⏱ ${secs}s</button>`
        : `<button class="exercise-start-btn" onclick="startInlineTimer(${i}, 0)">▶ Go</button>`;

      const timerControls = secs
        ? `<button class="inline-btn inline-btn-start" onclick="toggleInlineTimer(${i})">▶</button>
           <button class="inline-btn inline-btn-reset" onclick="resetInlineTimer(${i})">↺</button>`
        : ``;

      return `
        <div class="exercise-item">
          <div class="exercise-item-top">
            <span class="exercise-item-label">${e}</span>
            ${goBtn}
          </div>
          <div class="exercise-inline-timer" id="inline-timer-${i}" data-sets="${targetSets}">
            <div style="display:flex;flex-direction:column;gap:8px;width:100%;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="inline-timer-display" id="inline-display-${i}">
                  ${secs ? (String(Math.floor(secs/60)).padStart(2,'0')+':'+String(secs%60).padStart(2,'0')) : '—'}
                </div>
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

  // État séance : déjà faite ou en cours
  const doneBtn = document.getElementById('markDoneBtn');
  const feedbackSection = document.getElementById('feedbackSection');
  const seanceFinie = document.getElementById('seanceFinie');
  if (doneToday) {
    doneBtn.classList.add('hidden');
    feedbackSection.classList.add('hidden');
    seanceFinie.classList.add('hidden');
    document.getElementById('encouragementMsg').classList.remove('hidden');
    document.getElementById('encouragementMsg').textContent = randomEncouragement();
  } else {
    doneBtn.classList.add('hidden'); // remplacé par le bouton dans seanceFinie
    feedbackSection.classList.remove('hidden');
    seanceFinie.classList.add('hidden');
    document.getElementById('encouragementMsg').classList.add('hidden');
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
  localStorage.setItem('lastUser', user);
  document.getElementById('profileScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbarProfileName').textContent =
    user.charAt(0).toUpperCase() + user.slice(1);

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
