const CACHE_NAME = 'vengas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/site.webmanifest',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&family=JetBrains+Mono:wght@500;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://unpkg.com/aos@next/dist/aos.css',
  'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
  'https://unpkg.com/aos@next/dist/aos.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});