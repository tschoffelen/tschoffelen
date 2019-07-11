self.addEventListener('install', event => {
  event.waitUntil(caches.open('tschoffelen').then(cache => cache.addAll(['/'])))
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})
