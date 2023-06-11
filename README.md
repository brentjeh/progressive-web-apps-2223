# Progressive Web Apps @cmda-minor-web 2022 - 2023

## Inleiding
- [Introductie](#introductie)
- [De Web App from Scratch applicatie](#wafs-app)
- [Installeren van de server-side Web App](#installatie)
- [Week 1](#week1)
    - [Het refactoren van de WAfS applicatie](#refactoren)
    - [Tooling](#tooling)
    - [Mappenstructuur](#mappenstructuur)
    - [Views en Public directory aanmaken](#views)
- [Week 2](#week2)
    - [Het converteren van de WAfS applicatie naar een Progressive Web App](#converteren)
    - [Service Worker](#service-worker)

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
Vervolgens heb ik een nieuw index.mjs bestand gaan maken. Dit bestand dient als een entry point tot mijn server-side applicatie. In dit bestand heb ik volgende code gezet. Deze code importeert de vereiste modules ('compression' wordt gebruikt om compressie van HTTP-responsen in te schakelen, 'express' wordt gebruik als webframework voor het bouwen van de server, 'fetch' wordt geïmporteerd vanuit de node-fetch-bibliotheek om HTTP-verzoeken naar externe API's te maken, path en fileURLToPath worden gebruikt om het huidige bestandssysteempad op te halen). De code initialiseert Express en schakelt compressie in ('app = express()' maakt een Express-applicatie-instantie, 'app.use(compression())' registreert de compressiemiddleware, zodat de server de responsen kan comprimeren voordat ze naar de client worden verzonden). De code stelt statische bestandroutes in ('app.use(express.static(path.join(__dirname, 'public')))' definieert een route voor statische bestanden, waarbij de map 'public' wordt geserveerd als de rootmap voor statische bestanden (bijvoorbeeld CSS, JavaScript-bestanden)). De code configureert de view-engine en weergavepaden ('app.set('view engine', 'ejs')' stelt de weergavemotor in op EJS (Embedded JavaScript), waarmee dynamische HTML-templates kunnen worden gerenderd, 'app.set('views', 'views')' stelt het pad in naar de map waarin de weergavetemplates worden opgeslagen (in dit geval is het 'views')). De code definieert routes en maak HTTP-verzoeken naar de Rijksmuseum API ('app.get('/')' definieert de hoofdroute ('/') waarbij een HTTP GET-verzoek naar de Rijksmuseum API wordt gedaan om een lijst met schilderijen op te halen. De ontvangen gegevens worden vervolgens gerenderd met behulp van het 'index' weergavetemplate, 'app.get('/search')' definieert een route voor het zoeken naar schilderijen op basis van een zoekopdracht. Het maakt een HTTP GET-verzoek naar de Rijksmuseum API met de zoekopdracht en rendert de ontvangen gegevens met behulp van het 'index' weergavetemplate, 'app.get('/offline')' definieert een route voor een offlinepagina die kan worden weergegeven wanneer de server niet beschikbaar is). Als laatst start de code de server ('app.listen(1000)' start de server op poort 1000. Dit betekent dat de server luistert naar inkomende verzoeken op poort 1000 van de lokale machine.
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
        │   └── index.js         # Main client-side JavaScript bestand
        └── img                 # Een map voor eventuele image bestanden
            └── icon.png        # Icoontje voor de geïnstalleerde versie van mijn webapplicatie
```

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

### Service Worker <a name="service-worker"></a>
