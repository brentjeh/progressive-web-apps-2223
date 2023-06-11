# Progressive Web Apps @cmda-minor-web 2022 - 2023

## Inhoudsopgave
- [Introductie](#introductie)
- [De Web App from Scratch applicatie](#wafs-app)
- [Installeren van de server-side Web App](#installatie)
- [Week 1](#week1)
    - [Het refactoren van de WAfS applicatie](#refactoren)
    - [Tooling](#tooling)
    - [Views en Public directory aanmaken](#views)
- [Week 2](#week2)
    - [Het converteren van de WAfS applicatie naar een Progressive Web App](#converteren)
    - [Service Worker](#service-worker)
- [Week 3](#week3)
    - [Optimaliseren van de performance](#optimaliseren)
    - [De app installeren](#installeren)
- [Mappenstructuur](#mappenstructuur)

## Introductie 
Welkom bij dit project waarin ik je meeneem in het proces van het omzetten van een client-side webapplicatie naar een server-side gerenderde applicatie. Gedurende dit vak, gebaseerd op de "Web App From Scratch" applicatie, zal ik de functionaliteiten van de applicatie uitbreiden en optimalisaties doorvoeren om de prestaties te verbeteren.

Mijn doel is om de oorspronkelijke client-side webapplicatie om te zetten naar een server-side variant. Hierdoor kan ik de verwerking en logica van de applicatie naar de server verplaatsen, wat voordelen biedt op het gebied van schaalbaarheid, beveiliging en gegevensbeheer. Daarnaast zal ik gebruikmaken van de Service Worker om nieuwe functionaliteiten toe te voegen aan de applicatie en deze om te vormen tot een Progressive Web App.

Tijdens de cursus zal ik stap voor stap de nodige wijzigingen en optimalisaties doorvoeren om de prestaties van de applicatie te verbeteren. Dit omvat technieken zoals caching, lazy loading en code splitting, waarmee ik de laadtijden kan verkorten en de algehele gebruikerservaring kan verbeteren.

Dit project biedt een geweldige kans om mijn vaardigheden als ontwikkelaar uit te breiden en te leren hoe ik een client-side webapplicatie kan transformeren naar een server-side gerenderde applicatie.

## De Web App from Scratch applicatie <a name="wafs-app"></a>
In deze applicatie kan de gebruiker kunstwerken bekijken en ontdekken vanuit de Rijksmuseum-collectie. Hier is een overzicht van de belangrijkste dingen die ik heb toegevoegd aan de applicatie:
- Kunstwerken ophalen: Met behulp van de code haal ik kunstwerken op vanuit de Rijksmuseum API. De API bevat een enorme collectie kunstwerken van verschillende artiesten.
- Kunstwerken weergeven: Nadat ik de kunstwerken heb opgehaald, worden ze op de webpagina weergegeven. Ik laat de afbeeldingen van de kunstwerken en de bijbehorende titels zien aan de gebruiker.
- Zoeken naar specifieke kunstwerken: De gebruiker kan in een zoekveld een zoekterm invoeren. Wanneer de gebruiker iets invoer, worden alleen de kunstwerken getoond die overeenkomen met de zoekterm van de gebruiker. Dit maakt het gemakkelijk om specifieke kunstwerken te vinden waarin de gebruiker geïnteresseerd in is.
- Pop-upvenster met details: Wanneer de gebruiker op een kunstwerk klik, opent er een pop-upvenster met meer details over dat specifieke kunstwerk. De gebruiker ziet een grotere afbeelding van het kunstwerk, de titel en informatie over de kunstenaar.

Met deze functionaliteiten kan de gebruiker door de kunstcollectie bladeren, kunstwerken vinden die de gebruiker aanspreken en meer te weten komen over de kunstenaars die ze hebben gemaakt.

## Installeren van de server-side Web App <a name="installatie"></a>

Installeer deze repository: 
```
Git clone https://github.com/brentjeh/progressive-web-apps-2223
```

Om Node modules te installeren:
```
npm install
```

Om de applicatie te starten:
```
npm run dev
```

## Week 1 <a name="week1"></a>

### Het refactoren van de WAfS applicatie <a name="refactoren"></a>
Ik wil dit gaan doen aan de hand van HTML, CSS, JavaScript, Node.js, node-fetch, Express, EJS, nodemon en Gulp. Eerst heb ik een nieuw Node.js project aangemaakt door het volgende in te tikken in mijn terminal:
```
npm init
```
Dit heeft een nieuw package.json aangemaakt in mijn mappenstructuur.

Daarna ben ik Express, EJS en nodemon gaan installeren met de volgende command:
```
npm install express nodemon ejs node-fetch compression
```
Vervolgens heb ik een nieuw index.mjs bestand gaan maken. Dit bestand dient als een entry point tot mijn server-side applicatie. In dit bestand heb ik volgende code gezet.
```js
import compression from 'compression';
import express from 'express';
const app = express();
app.use(compression());

import fetch from 'node-fetch';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    fetch("https://www.rijksmuseum.nl/api/en/collection?key=RCZaMbZZ&format=json&type=painting&ps=48")
        .then(response => {
            return response.json();
        })
        .then(data => {
            res.set('Cache-control', 'public, max-age=31536000')
            res.render('index', {
                data: data
            });
        })
});

app.get('/search', (req, res) => {
    fetch(`https://www.rijksmuseum.nl/api/en/collection?key=RCZaMbZZ&q=${req.query.query}&format=json&type=painting&ps=48`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            res.set('Cache-control', 'public, max-age=31536000')
            res.render('index', {
                data: data
            });
        })
});

app.get('/offline', (req, res) => {
    res.render('offline');
});

app.listen(1000);
```
Deze code importeert de vereiste modules ('compression' wordt gebruikt om compressie van HTTP-responsen in te schakelen, 'express' wordt gebruik als webframework voor het bouwen van de server, 'fetch' wordt geïmporteerd vanuit de node-fetch-bibliotheek om HTTP-verzoeken naar externe API's te maken, path en fileURLToPath worden gebruikt om het huidige bestandssysteempad op te halen). De code initialiseert Express en schakelt compressie in ('app = express()' maakt een Express-applicatie-instantie, 'app.use(compression())' registreert de compressiemiddleware, zodat de server de responsen kan comprimeren voordat ze naar de client worden verzonden). De code stelt statische bestandroutes in ('app.use(express.static(path.join(__dirname, 'public')))' definieert een route voor statische bestanden, waarbij de map 'public' wordt geserveerd als de rootmap voor statische bestanden (bijvoorbeeld CSS, JavaScript-bestanden)). De code configureert de view-engine en weergavepaden ('app.set('view engine', 'ejs')' stelt de weergavemotor in op EJS (Embedded JavaScript), waarmee dynamische HTML-templates kunnen worden gerenderd, 'app.set('views', 'views')' stelt het pad in naar de map waarin de weergavetemplates worden opgeslagen (in dit geval is het 'views')). De code definieert routes en maak HTTP-verzoeken naar de Rijksmuseum API ('app.get('/')' definieert de hoofdroute ('/') waarbij een HTTP GET-verzoek naar de Rijksmuseum API wordt gedaan om een lijst met schilderijen op te halen. De ontvangen gegevens worden vervolgens gerenderd met behulp van het 'index' weergavetemplate, 'app.get('/search')' definieert een route voor het zoeken naar schilderijen op basis van een zoekopdracht. Het maakt een HTTP GET-verzoek naar de Rijksmuseum API met de zoekopdracht en rendert de ontvangen gegevens met behulp van het 'index' weergavetemplate, 'app.get('/offline')' definieert een route voor een offlinepagina die kan worden weergegeven wanneer de server niet beschikbaar is). Als laatst start de code de server ('app.listen(1000)' start de server op poort 1000. Dit betekent dat de server luistert naar inkomende verzoeken op poort 1000 van de lokale machine.

### Tooling
Ik heb als tool nodemon geinstalleerd. Nodemon is een handige tool die je helpt bij het ontwikkelen van Node.js-applicaties. Het zorgt ervoor dat je server automatisch opnieuw wordt gestart telkens wanneer je wijzigingen aanbrengt in je code. Normaal gesproken zou je de server handmatig moeten stoppen en opnieuw starten, maar nodemon neemt dat werk voor je uit handen. In mijn package.json bestand heb ik de volgende regel gezet:
```json
"start": "nodemon index.js"
```

### Views en Public directory aanmaken <a name="views"></a>
Ik heb een views directory aangemaakt in mijn project om hierin mijn sjabloonbestanden te plaatsen voor mijn webpagina's. In deze directory zit een mapje genaamd 'partials'. In dit mapje plaats ik alle delen van mijn uiteindelijke HTML structuur. In mijn index.ejs bestand, die gelocaliseert is in de views directory maar buiten de 'partials' map, roep ik alle partials aan om de HTML structuur compleet te maken. 
Ik heb ook een public directory gemaakt, waarin ik alle statische bestanden van mijn webapplicatie geplaatst heb, zoals CSS-bestanden, JavaScript-bestanden en afbeeldingen.
Dit is hoe de structuur van mijn views directory eruit ziet:
```bash
    └── views
        ├── partials 
        │   ├── footer.ejs      # Footer
        │   ├── head.ejs        # Head
        │   ├── header.ejs      # Header (met logo en search optie)
        │   └── popup.ejs       # Pop-up (Handelt pop-up logica af)        
        ├── index.ejs           # Main HTML bestand
        └── offline.ejs         # Deze pagina wordt weergeven zodra de gebruiker offline is.
```

Dit is hoe de structuur van mijn public directory eruit ziet:
```bash
    └── public                  # Een map met alle static files
        ├── css                 
        │   └── index.css       # Main CSS bestand voor alle styling
        ├──  js  
        │   ├── index-min.js    # Een geminimaliseerde (gecomprimeerde) versie van de JavaScript-code voor mijn webapplicatie
        │   └── index.js        # Main client-side JavaScript bestand
        └── img                 # Een map voor eventuele image bestanden
            └── icon.png        # Icoontje voor de geïnstalleerde versie van mijn webapplicatie
```

## Week 2 <a name="week2"></a>

### Het converteren van de WAfS applicatie naar een Progressive Web App <a name="converteren"></a>
Om dit te doen heb ik een manifest.json bestand toegevoegd aan mijn project. Dit bestand bevat de volgende code:
```json
{
    "name": "Rijksmuseum Database",
    "short_name": "Rijksmuseum Database",
    "description": "Een database waarin je elk schilderij uit het Rijksmuseum in detail kan bekijken en opzoeken.",
    "start_url": "http://localhost:3000/",
    "icons": [
      {
        "src": "public/img/cat.jpg",
        "sizes": "192x192",
        "type": "image/jpeg"
      }
    ],
    "display": "standalone"
  }
```
Een manifest.json-bestand is een JSON-bestand dat wordt gebruikt in progressive web apps om metadata en configuratiegegevens te definiëren. Het manifestbestand beschrijft essentiële informatie over de webapplicatie, zoals de naam, beschrijving, pictogrammen, kleurenthema, weergavemodus en andere eigenschappen.

### Service Worker <a name="service-worker"></a>
Mijn service worker bestand (service-worker.js) bevat de logica voor het implementeren van caching en offline functionaliteit in mijn webapplicatie. Dit is hoe ik mijn service worker heb opgezet:
```js
const CORE_CACHE_NAME = 'cache-v1';
const RUNTIME_CACHE_NAME = 'cache-runtime';
const CORE_ASSETS = [
  '/offline',
  '/css/index.css'
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
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

self.addEventListener('fetch', (event) => {
  const path = new URL(event.request.url).pathname

  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => cache.match(event.request))
        .then(response => response || fetchAndCache(event.request))
        .catch(() => caches.open(CORE_CACHE_NAME)
          .then(cache => cache.match('/offline')))
    )
  } else if (CORE_ASSETS.includes(path)) {
    event.respondWith(
      caches.open(CORE_CACHE_NAME)
        .then(cache => cache.match(path))
    )
  }
})

function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      const clone = response.clone()
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => cache.put(request, clone))

      return response
    })
}
```
De code in de service worker definieert de cache-namen en kernbestanden, installeert de service worker (De 'install' event listener wordt gebruikt om het service worker-bestand te installeren en het cache opslaggebied voor kernbestanden te vullen. Bij het installeren wordt het CORE_CACHE_NAME-opslaggebied geopend en de CORE_ASSETS toegevoegd aan de cache. Het skipWaiting()-method zorgt ervoor dat de service worker onmiddellijk wordt geactiveerd nadat de installatie is voltooid), activeert de service worker (de 'activate' event listener wordt gebruikt om oude caches op te schonen en ervoor te zorgen dat de nieuwe service worker onmiddellijk actief wordt. Bij de activering worden alle cache-namen opgehaald en de caches verwijderd, behalve het CORE_CACHE_NAME en RUNTIME_CACHE_NAME), handelt aanvragen af (de 'fetch' event listener wordt gebruikt om alle netwerkverzoeken af te handelen en te reageren met gecachte gegevens indien beschikbaar. Als het verzoek een HTML-pagina is, wordt er gecontroleerd of er een gecachte versie beschikbaar is in het RUNTIME_CACHE_NAME-opslaggebied. Als er een gecachte versie beschikbaar is, wordt deze als reactie gegeven. Als er geen gecachte versie beschikbaar is, wordt het verzoek naar de server gestuurd en de reactie in het RUNTIME_CACHE_NAME-opslaggebied geplaatst. Als het verzoek een kernbestand is dat in de CORE_ASSETS-array is gedefinieerd, wordt er gecontroleerd of er een gecachte versie beschikbaar is in het CORE_CACHE_NAME-opslaggebied. De fetchAndCache()-functie wordt gebruikt om een verzoek naar de server te sturen, de reactie te cachen in het RUNTIME_CACHE_NAME-opslaggebied en de reactie door te geven aan de oorspronkelijke aanvrager). Over het algemeen zorgt mijn service worker-bestand ervoor dat de kernbestanden van mijn webapplicatie worden gecachet bij de installatie van de service worker en dat HTML-pagina's en andere bestanden worden gecacht en offline beschikbaar zijn via het RUNTIME_CACHE_NAME-opslaggebied. Het biedt ook een fallback-mechanisme waarbij een offline-pagina (/offline) wordt weergegeven als een HTML-verzoek niet kan worden beantwoord door het cache.

## Week 3 <a name="week3"></a>

### Optimaliseren van de performance <a name="optimaliseren"></a>
Om de performance van mijn webapplicatie te optimaliseren heb ik de Node.js Compression middleware (Node.js Compression is een module in de Node.js runtime-omgeving die functionaliteit biedt voor het comprimeren van HTTP-responses die worden verzonden door een webserver. Het helpt bij het verkleinen van de omvang van de gegevens die worden overgedragen tussen de server en de client, wat resulteert in snellere overdracht en verbeterde prestaties) en Gulp (Gulp is gebaseerd op de Node.js runtime-omgeving en wordt gebruikt voor het automatiseren van verschillende ontwikkelingstaken, zoals het samenvoegen en minificeren van bestanden, het compileren van CSS-preprocessors, het optimaliseren van afbeeldingen en nog veel meer). 
Ik heb in mijn project een 'scripts' mapje staan, waarin de Gulp-configuratie staat, voor beide CSS en JavaScript. 
Gulp doet dit voor het CSS bestand door eerst het CSS bestand te selecteren (styles.css) wat in een 'source' map staat. Vervolgens wordt het geselecteerde CSS-bestand samengevoegd tot één bestand genaamd 'index.css' met behulp van de concat-plug-in. Daarna wordt het CSS-bestand geminificeerd met behulp van de cleanCSS-plug-in. Vervolgens wordt autoprefixing (door autoprefixing toe te passen, wordt ervoor gezorgd dat mijn CSS-regels correct worden weergegeven in verschillende browsers, zelfs als ze verschillende prefixen nodig hebben om correct te functioneren. Dit helpt bij het bereiken van een betere cross-browsercompatibiliteit van mijn CSS-stijlen) toegepast op het CSS-bestand met behulp van de autoprefixer-plug-in. Ten slotte wordt het resulterende CSS-bestand (index.css) opgeslagen in de './public/css/' map.
Gulp doet dit voor het JavaScript bestand door eerst de JavaScript bestanden te selecteren wat in een 'source' map staat. Vervolgens worden de de geselecteerde JavaScript-bestanden samengevoegd tot één bestand genaamd 'index.js' met behulp van de concat-plug-in. Daarna wordt het JavaScript-bestand geminificeerd met behulp van de minify-plug-in. Ten slotte wordt het resulterende JavaScript-bestand opgeslagen in de './public/js/' map.

Als opdracht moest ik 2 of meer van de 5 performance componenten optimaliseren. Dat zijn de volgende componenten:
1. Perceived load speed
2. Load responsiveness
3. Runtime responsiveness
4. Visual stability
5. Smoothness

Ik ga per component langs hoe ik deze heb geoptimaliseerd aan de hand van Compression en Gulp.

#### 1. Perceived load speed
Het gebruik van Gulp en het samenvoegen, minificeren en autoprefixen van CSS- en JavaScript-bestanden heeft bijgedragen aan het optimaliseren van de laadsnelheid van een webpagina. Door CSS en JavaScript te minimaliseren, worden bestandsgroottes verkleind, waardoor ze sneller kunnen worden gedownload en verwerkt. Het samenvoegen van bestanden vermindert ook het aantal verzoeken dat naar de server wordt gestuurd. Verder definieert de service worker een cache met de naam CORE_CACHE_NAME en slaat specifieke assets op in deze cache, zoals de /offline-pagina en /css/index.css. Wanneer een gebruiker de pagina bezoekt, kan de Service Worker deze assets uit de cache halen en onmiddellijk weergeven, zelfs als er geen netwerkverbinding is. Dit draagt bij aan de waargenomen laadsnelheid van de pagina, omdat de essentiële inhoud direct beschikbaar is zonder te hoeven wachten op een netwerkreactie. 

#### 2. Load responsiveness
Het minimaliseren van JavaScript-bestanden met behulp van de minify-plug-in in mijn Gulp-taak heeft bijgedragen aan het optimaliseren van de laadresponsiviteit. Door de bestandsgrootte te verkleinen, kan het JavaScript sneller worden gedownload en geëvalueerd, waardoor het sneller kan reageren op gebruikersinteractie.

#### 3. Runtime responsiveness
Ik heb hier niet bewust voor geoptimaliseerd. 

#### 4. Visual stability
De Service Worker intercepteert fetch-verzoeken, inclusief HTML-verzoeken. Als een HTML-verzoek wordt gedetecteerd, probeert de Service Worker de respons te cachen en te reageren met de gecachte versie indien beschikbaar. Dit helpt voorkomen dat de pagina onverwacht verschuift of leeg wordt tijdens het laden, omdat de Service Worker de gecachte versie kan weergeven totdat de nieuwste versie beschikbaar is.

#### 5. Smoothness
Ik heb hier niet bewust voor geoptimaliseerd. 

### De app installeren <a name="installeren"></a>

### Mappenstructuur
Dit is hoe mijn mappenstructuur er uiteindelijk uit ziet:
```bash
    ├── node_modules            # Een map met alle node modules
    ├── public                  # Een map met alle static files
    │   ├── css                 
    │   │   └── style.css       # Main CSS bestand voor alle styling
    │   ├──  js                  
    │   │   └── main.js         # Main client-side JavaScript bestand
    │   └── img                 # Een map voor eventuele image bestanden
    ├── views
    │   └── index.ejs           # Main HTML bestand
    ├── index.js
    ├── manifest.json
    ├── package-lock.json
    ├── package.json
    └── service-worker.js       # Service Worker bestand
```
