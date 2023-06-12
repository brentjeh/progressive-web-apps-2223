// Dit zijn de namen van de caches die ik ga gebruiken.
const CORE_CACHE_NAME = 'cache-v1';
const RUNTIME_CACHE_NAME = 'cache-runtime';

// Dit zijn de assets die altijd gecached moeten worden.
const CORE_ASSETS = [
  '/offline',
  '/css/index.css'
]

// Hiermee vertel ik de service worker wat te doen als hij geïnstalleerd wordt.
self.addEventListener("install", (event) => {
  // Ik wavht tot de beloofde acties (caches openen en vullen) zijn uitgevoerd voordat we verder gaan.
  event.waitUntil(
    caches.open(CORE_CACHE_NAME)
      .then(cache => {
        // Ik voeg alle CORE_ASSETS toe aan de cache.
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        // SkipWaiting zorgt ervoor dat de service worker direct actief wordt, zonder te wachten.
        return self.skipWaiting();
      })
  );
});

// Hier vertel ik de service worker wat te doen als hij geactiveerd wordt.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          // Ik loop door alle caches heen, en als ze niet overeenkomen met onze huidige caches, verwijder ik ze.
          cacheNames.map(cacheName => {
            if (cacheName !== CORE_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        )
      })
  )
})

// Hier vertel ik de service worker wat te doen als er een fetch (netwerkverzoek) gebeurt.
self.addEventListener('fetch', (event) => {
  const path = new URL(event.request.url).pathname

  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => {
          // Ik probeer de cache te matchen met het verzoek, als dat lukt geef ik de cache terug.
          return cache.match(event.request);
        })
        .then(response => {
          // Als ik geen match in de cache heb gevonden, doe ik een fetch en cache ik de response.
          return response || fetchAndCache(event.request);
        })
        // Als er iets fout gaat, open ik de CORE_CACHE en geef ik de de offline pagina terug.
        .catch(() => caches.open(CORE_CACHE_NAME)
          .then(cache => cache.match('/offline')))
    )
  } else if (CORE_ASSETS.includes(path)) {
    // Als het pad in mijn CORE_ASSETS zit, probeer ik dat uit de cache te halen en terug te geven.
    event.respondWith(
      caches.open(CORE_CACHE_NAME)
        .then(cache => cache.match(path))
    )
  }
})

// Deze functie doet een netwerkverzoek en cacht de response.
function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      // Ik maak een kloon van de response om te kunnen cachen.
      const clone = response.clone();
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => {
          // Ik sla het request en de cloned response op in de cache.
          return cache.put(request, clone);
        })

      // Ik geef de originele response terug (niet de kloon).
      return response;
    })
}
