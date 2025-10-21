const CACHE_NAME = 'vishnu-yagya-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/form-handler.js',
  '/gallery-config.js',
  '/assets/banner.png',
  '/assets/poster.jpeg',
  '/assets/pujya-devi-Neha-saraswat.jpg',
  '/assets/UPI-Scanner.jpeg',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});