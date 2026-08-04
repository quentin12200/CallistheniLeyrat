'use strict';

// ─── Firebase Init ────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyADCaSdHPa7y80pK6yWUK1SvMouFxDZKos",
  authDomain: "callistheni-leyrat.firebaseapp.com",
  projectId: "callistheni-leyrat",
  storageBucket: "callistheni-leyrat.firebasestorage.app",
  messagingSenderId: "402631799755",
  appId: "1:402631799755:web:832f4c537322561ff6bc4e"
};

firebase.initializeApp(firebaseConfig);

const fbAuth = firebase.auth();
const fbDb   = firebase.firestore();

// Récupère le résultat après un signInWithRedirect (mobile)
fbAuth.getRedirectResult().catch(err => {
  if (err.code && err.code !== 'auth/no-auth-event') {
    showAuthError(friendlyAuthError(err));
  }
});

const ADMIN_EMAIL = 'leyrat.quentin@gmail.com';

// ─── Derive localStorage prefix from Firebase user ────────────
// Known accounts are mapped by email to preserve existing localStorage data
const EMAIL_PREFIX_MAP = {
  'leyrat.quentin@gmail.com': 'quentin',
  'so.leyrat@gmail.com':      'sophie',
};

function userPrefix(firebaseUser) {
  if (EMAIL_PREFIX_MAP[firebaseUser.email]) return EMAIL_PREFIX_MAP[firebaseUser.email];
  const name = (firebaseUser.displayName || firebaseUser.email.split('@')[0] || 'user')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove accents
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20);
  return name || 'user' + firebaseUser.uid.slice(0, 6);
}

// ─── Auth State Observer ─────────────────────────────────────
fbAuth.onAuthStateChanged(user => {
  if (user) {
    onFirebaseLogin(user);
  } else {
    onFirebaseLogout();
  }
});

// ─── Login Methods ────────────────────────────────────────────
async function fbLoginGoogle() {
  clearAuthError();
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await fbAuth.signInWithPopup(provider);
  } catch (err) {
    // Si popup bloquée, basculer sur redirect
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
      try {
        await fbAuth.signInWithRedirect(provider);
      } catch (err2) {
        showAuthError(friendlyAuthError(err2));
      }
    } else {
      showAuthError(friendlyAuthError(err));
    }
  }
}

async function fbLoginEmail() {
  clearAuthError();
  const email    = document.getElementById('authEmail')?.value.trim();
  const password = document.getElementById('authPassword')?.value;
  if (!email || !password) { showAuthError('Remplis l\'email et le mot de passe.'); return; }
  setAuthLoading(true);
  try {
    await fbAuth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    showAuthError(friendlyAuthError(err));
    setAuthLoading(false);
  }
}

async function fbRegister() {
  clearAuthError();
  const name     = document.getElementById('authName')?.value.trim();
  const email    = document.getElementById('regEmail')?.value.trim();
  const password = document.getElementById('regPassword')?.value;
  const confirm  = document.getElementById('regConfirm')?.value;

  if (!name || !email || !password) { showAuthError('Tous les champs sont obligatoires.'); return; }
  if (password !== confirm) { showAuthError('Les mots de passe ne correspondent pas.'); return; }
  if (password.length < 6) { showAuthError('Mot de passe trop court (6 caractères min).'); return; }

  setAuthLoading(true);
  try {
    const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    // Forcer le rechargement pour avoir le displayName à jour
    await cred.user.reload();
  } catch (err) {
    showAuthError(friendlyAuthError(err));
    setAuthLoading(false);
  }
}

async function fbResetPassword() {
  const email = document.getElementById('authEmail')?.value.trim()
    || prompt('Ton adresse email :');
  if (!email) return;
  try {
    await fbAuth.sendPasswordResetEmail(email);
    showAuthError('📧 Email envoyé ! Vérifie ta boîte mail.', true);
  } catch (err) {
    showAuthError(friendlyAuthError(err));
  }
}

async function fbLogout() {
  await fbAuth.signOut();
}

// ─── Firestore Sync ───────────────────────────────────────────
const FS_SYNC_KEYS = [
  'startDate', 'level', 'diffOffset', 'feedbackHistory',
  'xp', 'badges', 'bestStreak', 'weightHistory',
  'notifEnabled', 'notifTime', 'notifSentDate', 'objective', 'rythm',
  'initWeight', 'bodyHeight',
];

function fbUserRef() {
  const u = fbAuth.currentUser;
  if (!u) return null;
  return fbDb.collection('users').doc(u.uid);
}

async function syncToFirestore() {
  const ref = fbUserRef();
  if (!ref || !currentUser) return;

  const data = {};
  FS_SYNC_KEYS.forEach(k => {
    const v = localStorage.getItem(currentUser + '_' + k);
    if (v !== null) data[k] = v;
  });

  // Done / feedback / series up to current day + 5
  const maxDay = (typeof dayNumber === 'function' ? dayNumber() : 100) + 5;
  for (let i = 1; i <= Math.min(maxDay, 500); i++) {
    ['done_', 'feedback_', 'series_progress_'].forEach(prefix => {
      const v = localStorage.getItem(currentUser + '_' + prefix + i);
      if (v) data[prefix + i] = v;
    });
  }

  try {
    await ref.set({
      data,
      prefix: currentUser,
      profile: {
        displayName: fbAuth.currentUser.displayName || '',
        email: fbAuth.currentUser.email || '',
        photoURL: fbAuth.currentUser.photoURL || '',
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    setSyncIndicator && setSyncIndicator('synced');
  } catch (err) {
    console.error('Firestore write error:', err);
    setSyncIndicator && setSyncIndicator('sync-error');
  }
}

async function syncFromFirestore() {
  const ref = fbUserRef();
  if (!ref || !currentUser) return;

  setSyncIndicator && setSyncIndicator('syncing');
  try {
    const doc = await ref.get();
    if (!doc.exists || !doc.data()?.data) {
      // Firestore vide — tenter une migration depuis l'ancienne base Turso
      await migrateFromTurso();
      setSyncIndicator && setSyncIndicator('');
      return;
    }

    const data = doc.data().data;
    Object.entries(data).forEach(([k, v]) => {
      localStorage.setItem(currentUser + '_' + k, v);
    });
    setSyncIndicator && setSyncIndicator('synced');
  } catch (err) {
    console.error('Firestore read error:', err);
    setSyncIndicator && setSyncIndicator('sync-error');
  }
}

async function migrateFromTurso() {
  const email = fbAuth.currentUser?.email;
  if (!email) return false;
  try {
    const res = await fetch('/api/sync?action=migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    if (!json.ok || !json.data) return false;

    const keys = Object.keys(json.data).filter(k => json.data[k] !== null && json.data[k] !== undefined);
    keys.forEach(k => localStorage.setItem(currentUser + '_' + k, json.data[k]));
    console.log('Migration Turso → Firebase OK (' + keys.length + ' clés)');
    await syncToFirestore();
    return keys.length;
  } catch (e) {
    console.log('Migration Turso non disponible:', e.message);
    return false;
  }
}

async function manualMigrate() {
  const btn = document.getElementById('migratBtn');
  const status = document.getElementById('migrateStatus');
  if (!btn || !status) return;

  if (!fbAuth.currentUser) {
    status.style.display = 'block';
    status.style.color = 'var(--red)';
    status.textContent = '❌ Connecte-toi d\'abord avec ton compte Google.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Récupération en cours…';
  status.style.display = 'block';
  status.style.color = 'var(--txt2)';
  status.textContent = 'Connexion à la base de données…';

  const count = await migrateFromTurso();
  btn.disabled = false;
  btn.textContent = '↩ Récupérer mes anciennes données';

  if (count === false) {
    status.style.color = 'var(--red)';
    status.textContent = '❌ Erreur — compte non trouvé ou base indisponible.';
  } else if (count === 0) {
    status.style.color = 'var(--warn)';
    status.textContent = '⚠️ Aucune donnée trouvée dans l\'ancienne base.';
  } else {
    status.style.color = 'var(--ok)';
    status.textContent = `✅ ${count} données récupérées ! L'app va se rafraîchir…`;
    setTimeout(() => {
      if (typeof renderHome === 'function') renderHome();
      if (typeof renderSettings === 'function') renderSettings();
    }, 1500);
  }
}

// ─── Admin ────────────────────────────────────────────────────
function fbIsAdmin() {
  return fbAuth.currentUser?.email === ADMIN_EMAIL;
}

async function fbAdminGetUsers() {
  if (!fbIsAdmin()) throw new Error('Accès refusé');
  const snapshot = await fbDb.collection('users').get();
  return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
}

// ─── Callbacks vers app.js ────────────────────────────────────
function onFirebaseLogin(user) {
  const prefix = userPrefix(user);
  // currentUser est défini dans app.js — on le met à jour globalement
  window.currentUser = prefix;

  // Masquer login, afficher app
  document.getElementById('loginScreen')?.classList.add('hidden');
  document.getElementById('app')?.classList.remove('hidden');

  // Nom affiché
  const displayName = user.displayName || user.email.split('@')[0];
  const el = document.getElementById('topbarProfileName');
  if (el) el.textContent = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  // Photo de profil (Google)
  const photoEl = document.getElementById('topbarPhoto');
  if (photoEl) {
    if (user.photoURL) {
      photoEl.style.backgroundImage = `url(${user.photoURL})`;
      photoEl.title = displayName;
    }
  }

  // Onglet admin
  const adminBtn = document.getElementById('nav-admin');
  if (adminBtn) {
    if (fbIsAdmin()) adminBtn.classList.remove('hidden');
    else adminBtn.classList.add('hidden');
  }

  // Date de départ si première utilisation
  if (!localStorage.getItem(prefix + '_startDate')) {
    localStorage.setItem(prefix + '_startDate', new Date().toISOString().slice(0, 10));
  }

  // Charger données cloud
  syncFromFirestore().then(() => {
    if (typeof renderHome === 'function') renderHome();
    if (typeof isDone === 'function' && typeof dayNumber === 'function' && !isDone(dayNumber())) {
      if (typeof requestWakeLock === 'function') requestWakeLock();
    }
    // Bandeau retour après absence
    if (typeof getDaysSinceLastSession === 'function' && typeof randomComeback === 'function') {
      const daysSince = getDaysSinceLastSession();
      if (daysSince >= 2) {
        setTimeout(() => {
          const comebackMsg = document.getElementById('comebackMsg');
          const comebackBanner = document.getElementById('comebackBanner');
          if (comebackMsg) comebackMsg.textContent = randomComeback();
          if (comebackBanner) comebackBanner.classList.remove('hidden');
        }, 500);
      }
    }
  });

  if (typeof showPage === 'function') showPage('home');

  // Notifications et push
  setTimeout(() => {
    if (typeof checkAndFireNotificationIfDue === 'function') checkAndFireNotificationIfDue();
    if (typeof startNotifWatcher === 'function') startNotifWatcher();
    if (typeof requestNotificationPermission === 'function' && typeof countDoneSessions === 'function') {
      if (countDoneSessions() >= 1) requestNotificationPermission();
    }
    if (typeof subscribeToPushIfNeeded === 'function' && typeof load === 'function') {
      if (Notification.permission === 'granted' && load('notifEnabled', false)) {
        subscribeToPushIfNeeded();
      }
    }
  }, 1000);
}

function onFirebaseLogout() {
  window.currentUser = null;
  document.getElementById('loginScreen')?.classList.remove('hidden');
  document.getElementById('app')?.classList.add('hidden');
  document.getElementById('comebackBanner')?.classList.add('hidden');
}

// ─── UI Helpers ───────────────────────────────────────────────
function showAuthError(msg, success = false) {
  const el = document.getElementById('authError');
  if (!el) return;
  el.textContent = msg;
  el.style.color = success ? '#166534' : '#991b1b';
  el.style.background = success ? '#d1fae5' : '#fee2e2';
  el.classList.remove('hidden');
}

function clearAuthError() {
  const el = document.getElementById('authError');
  if (el) el.classList.add('hidden');
}

function setAuthLoading(on) {
  const btn = document.getElementById('authSubmitBtn');
  if (btn) { btn.disabled = on; btn.textContent = on ? 'Connexion…' : 'Se connecter'; }
  const btn2 = document.getElementById('regSubmitBtn');
  if (btn2) { btn2.disabled = on; btn2.textContent = on ? 'Création…' : 'Créer mon compte'; }
}

function showLoginForm() {
  document.getElementById('loginForm')?.classList.remove('hidden');
  document.getElementById('registerForm')?.classList.add('hidden');
  clearAuthError();
}

function showRegisterForm() {
  document.getElementById('loginForm')?.classList.add('hidden');
  document.getElementById('registerForm')?.classList.remove('hidden');
  clearAuthError();
}

function fbGuestMode() {
  window.currentUser = 'invite';
  document.getElementById('loginScreen')?.classList.add('hidden');
  document.getElementById('app')?.classList.remove('hidden');
  const el = document.getElementById('topbarProfileName');
  if (el) el.textContent = 'Invité';
  if (typeof showPage === 'function') showPage('home');
}

function friendlyAuthError(err) {
  const codes = {
    'auth/user-not-found':      'Aucun compte avec cet email.',
    'auth/wrong-password':      'Mot de passe incorrect.',
    'auth/invalid-email':       'Adresse email invalide.',
    'auth/email-already-in-use':'Cet email est déjà utilisé.',
    'auth/weak-password':       'Mot de passe trop faible (6 caractères min).',
    'auth/too-many-requests':   'Trop de tentatives — réessaie plus tard.',
    'auth/network-request-failed': 'Erreur réseau — vérifie ta connexion.',
    'auth/popup-closed-by-user':'Connexion annulée.',
    'auth/invalid-credential':  'Email ou mot de passe incorrect.',
  };
  return codes[err.code] || err.message || 'Erreur inconnue.';
}
