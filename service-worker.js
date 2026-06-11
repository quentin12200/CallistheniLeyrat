const CACHE_NAME = 'callistheni-v5';
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

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = e.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'callistheni-reminder'
      });
    }, delay);
  }
});
