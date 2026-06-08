const CACHE_NAME = 'callistheni-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => new Response('', { status: 404 })))
  );
});

// Notifications planifiées (déclenchées à l'ouverture de l'app via postMessage)
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
