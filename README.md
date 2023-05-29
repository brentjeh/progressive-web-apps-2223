# Progressive Web Apps @cmda-minor-web 2022 - 2023

## Inleiding
- [Introductie](#introductie)
- [De Web App from Scratch Applicatie](#wafs-app)
- [Week 1](#week1)

## Introductie 
Welkom bij dit project waarin ik je meeneem in het proces van het omzetten van een client-side webapplicatie naar een server-side gerenderde applicatie. Gedurende dit vak, gebaseerd op de "Web App From Scratch" applicatie, zal ik de functionaliteiten van de applicatie uitbreiden en optimalisaties doorvoeren om de prestaties te verbeteren.

Mijn doel is om de oorspronkelijke client-side webapplicatie om te zetten naar een server-side variant. Hierdoor kan ik de verwerking en logica van de applicatie naar de server verplaatsen, wat voordelen biedt op het gebied van schaalbaarheid, beveiliging en gegevensbeheer. Daarnaast zal ik gebruikmaken van de Service Worker om nieuwe functionaliteiten toe te voegen aan de applicatie en deze om te vormen tot een Progressive Web App.

Tijdens de cursus zal ik stap voor stap de nodige wijzigingen en optimalisaties doorvoeren om de prestaties van de applicatie te verbeteren. Dit omvat technieken zoals caching, lazy loading en code splitting, waarmee ik de laadtijden kan verkorten en de algehele gebruikerservaring kan verbeteren.

Dit project biedt een geweldige kans om mijn vaardigheden als ontwikkelaar uit te breiden en te leren hoe ik een client-side webapplicatie kan transformeren naar een server-side gerenderde applicatie.

## De Web App from Scratch Applicatie <a name="wafs-app"></a>
In deze applicatie kan de gebruiker kunstwerken bekijken en ontdekken vanuit de Rijksmuseum-collectie. Hier is een overzicht van de belangrijkste dingen die ik heb toegevoegd aan de applicatie:
- Kunstwerken ophalen: Met behulp van de code haal ik kunstwerken op vanuit de Rijksmuseum API. De API bevat een enorme collectie kunstwerken van verschillende artiesten.
- Kunstwerken weergeven: Nadat ik de kunstwerken heb opgehaald, worden ze op de webpagina weergegeven. Ik laat de afbeeldingen van de kunstwerken en de bijbehorende titels zien aan de gebruiker.
- Zoeken naar specifieke kunstwerken: De gebruiker kan in een zoekveld een zoekterm invoeren. Wanneer de gebruiker iets invoer, worden alleen de kunstwerken getoond die overeenkomen met de zoekterm van de gebruiker. Dit maakt het gemakkelijk om specifieke kunstwerken te vinden waarin de gebruiker geïnteresseerd in is.
- Pop-upvenster met details: Wanneer de gebruiker op een kunstwerk klik, opent er een pop-upvenster met meer details over dat specifieke kunstwerk. De gebruiker ziet een grotere afbeelding van het kunstwerk, de titel en informatie over de kunstenaar.

Met deze functionaliteiten kan de gebruiker door de kunstcollectie bladeren, kunstwerken vinden die de gebruiker aanspreken en meer te weten komen over de kunstenaars die ze hebben gemaakt.

## Week 1 <a name="week1"></a>

### Het refactoren van de WAfS applicatie
Ik wil dit gaan doen aan de hand van HTML, CSS, JavaScript, node.js, Express, EJS en nodemon. Ik heb de volgende mappenstructuur 
```bash
    ├── node_modules            # Een map met alle node modules
    ├── public                  # Een map met alle static files
    │   ├── css                 
    │   │   └── style.css       # Main CSS bestand voor alle styling
    │   └──  js                  
    │       └── main.js         # Main client-side JavaScript bestand
    ├── views
    │   └── index.ejs           # Main HTML bestand
    ├── package-lock.json
    └── package.json
```

## Week 2 <a name="week1"></a>
