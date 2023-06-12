// Definieer de namen van de caches
const CORE_CACHE_NAME = 'cache-v1';
const RUNTIME_CACHE_NAME = 'cache-runtime';

// Definieer de assets die in de cache moeten worden opgeslagen
const CORE_ASSETS = [
  '/offline',
  '/css/index.css'
]

// Evenementafhandelaar voor de installatie van de service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    // Open het CORE_CACHE_NAME-cache en voeg de CORE_ASSETS toe aan de cache
    caches.open(CORE_CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Evenementafhandelaar voor de activatie van de service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Ruim de verouderde caches op
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CORE_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        )
      })
  )
})

// Evenementafhandelaar voor fetch-verzoeken
self.addEventListener('fetch', (event) => {
  // Haal het pad van het ontvangen verzoek op
  const path = new URL(event.request.url).pathname

  if (event.request.headers.get('accept').includes('text/html')) {
    // Als het verzoek een HTML-verzoek is, probeer het te cachen en te reageren met de gecachte versie indien beschikbaar
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => cache.match(event.request))
        .then(response => response || fetchAndCache(event.request))
        .catch(() => caches.open(CORE_CACHE_NAME)
          .then(cache => cache.match('/offline')))
    )
  } else if (CORE_ASSETS.includes(path)) {
    // Als het verzoek overeenkomt met een CORE_ASSET, reageer dan met de gecachte versie indien beschikbaar
    event.respondWith(
      caches.open(CORE_CACHE_NAME)
        .then(cache => cache.match(path))
    )
  }
})

// Hulpmethode voor het doen van een fetch-verzoek en cachen van de respons
function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      const clone = response.clone()
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => cache.put(request, clone))

      return response
    })
}
