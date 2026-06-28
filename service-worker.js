const CACHE_NAME = 'callistheni-v6';
const IMAGE_ASSETS = [
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/exercices/montees-genoux.avif',
  '/exercices/footing-place.avif',
  '/exercices/squat.avif',
  '/exercices/dips.avif',
  '/exercices/pompes-mur.avif',
  '/exercices/pompes-sol.avif',
  '/exercices/pont-fessiers.avif',
  '/exercices/chaise.avif',
  '/exercices/gainage-face.avif',
  '/exercices/gainage-cote.avif',
  '/exercices/superman.avif',
  '/exercices/fentes.avif',
  '/exercices/jumping-jack.avif',
  '/exercices/mountain-climbers.avif'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(IMAGE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isAppFile = url.pathname.match(/\.(html|css|js)$/) || url.pathname === '/';
  const isAPI = url.pathname.startsWith('/api/');

  if (isAPI) {
    // API : toujours réseau, pas de cache
    e.respondWith(fetch(e.request));
    return;
  }

  if (isAppFile) {
    // HTML/CSS/JS : réseau d'abord, cache en fallback offline
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Images et autres : cache d'abord
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => new Response('', { status: 404 })))
  );
});

const MOTIVATION_MSGS_SW = [
  "La régularité, c'est ton super-pouvoir. Pas besoin d'être parfait, juste présent. 💪",
  "Chaque séance compte, même la plus courte. Tu n'as pas à tout déchirer aujourd'hui.",
  "Le secret du sport ? Recommencer. Encore. Et encore. 🔥",
  "Pas motivé ? Normal. Les champions s'entraînent aussi les jours sans envie.",
  "5 minutes suffisent pour démarrer. Et souvent, on continue bien plus. 🚀",
  "Ton corps se souvient de chaque effort. Même ceux que tu as oublié.",
  "Ce n'est pas une question de force. C'est une question d'habitude. 🌱",
  "Quand tu ne veux pas, c'est exactement le bon moment. C'est là que ça compte.",
];

// Stocker la config notif reçue de l'app
let notifConfig = null;

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay, notifTime, daysSince, streak } = e.data;
    notifConfig = { notifTime, daysSince, streak };

    // Programmer avec setTimeout (fonctionne si l'app reste ouverte)
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'callistheni-reminder',
        requireInteraction: true,
        actions: [{ action: 'open', title: '▶ Lancer la séance' }]
      });
    }, delay);
  }
});

// Periodic Background Sync — se déclenche même app fermée (Android Chrome)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'daily-workout-reminder') {
    e.waitUntil(fireReminderIfDue());
  }
});

async function fireReminderIfDue() {
  // Vérifier via les clients ouverts si la séance est déjà faite
  const clients = await self.clients.matchAll({ type: 'window' });
  // Si l'app est ouverte, elle gère elle-même
  if (clients.length > 0) return;

  const now = new Date();
  const hour = now.getHours();
  // Ne notifier qu'entre 7h et 22h
  if (hour < 7 || hour > 22) return;

  const msg = MOTIVATION_MSGS_SW[Math.floor(Math.random() * MOTIVATION_MSGS_SW.length)];
  await self.registration.showNotification('CallistheniLeyrat 🏋️', {
    body: msg,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'callistheni-reminder',
    requireInteraction: true,
    actions: [{ action: 'open', title: '▶ Lancer la séance' }]
  });
}

// Push Web (VAPID) — notification reçue même app fermée
self.addEventListener('push', e => {
  let data = { title: 'CallistheniLeyrat 🏋️', body: MOTIVATION_MSGS_SW[0] };
  try { if (e.data) data = e.data.json(); } catch {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'callistheni-reminder',
      requireInteraction: true,
      actions: [{ action: 'open', title: '▶ Lancer la séance' }]
    })
  );
});

// Clic sur la notification → ouvre l'app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow('/');
    })
  );
});
