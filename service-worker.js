const CACHE_NAME = 'callistheni-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images exercices/Montées de genoux sans sauter.avif',
  '/images exercices/Footing sur place.avif',
  '/images exercices/squat.avif',
  '/images exercices/dips.avif',
  '/images exercices/Pompes au mur (pec).avif',
  '/images exercices/Pompes au sol (pec).avif',
  '/images exercices/pont fessiers.avif',
  '/images exercices/Chaises.avif',
  '/images exercices/Gainage de face sur les coudes.avif',
  '/images exercices/Gainage profil sur le coude.avif',
  '/images exercices/Super man.avif',
  '/images exercices/Fentes.avif',
  '/images exercices/1- Jumping jack.avif',
  '/images exercices/Mountain climbers.avif'
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
