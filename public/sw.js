self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then(k => k.forEach(n => caches.delete(n))).then(() => self.clients.claim())));
