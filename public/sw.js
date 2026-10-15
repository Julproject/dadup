// Service worker DadUp
// - Les pages et les données ne sont jamais mises en cache : chaque ouverture montre la dernière version.
// - Sans réseau, une page « Pas de connexion » remplace l'écran d'erreur du navigateur.
// Changer CACHE_NAME à chaque modification de ce fichier ou des fichiers listés.
const CACHE_NAME = 'dadup-v6';
const HORS_LIGNE = '/hors-ligne.html';
const STATIC_ASSETS = [
  HORS_LIGNE,
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  // Ouverture d'une page : toujours le réseau, la page hors ligne seulement en cas d'échec
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match(HORS_LIGNE).then((r) => r || Response.error()))
    );
    return;
  }

  if (!STATIC_ASSETS.includes(url.pathname)) return;
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
