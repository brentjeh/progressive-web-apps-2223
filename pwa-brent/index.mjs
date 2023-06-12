    // Importeer de vereiste modules
    import compression from 'compression'; // Middleware voor compressie van HTTP-responsen
    import express from 'express'; // Webframework voor het bouwen van de server

    // Initialiseer de Express-applicatie en schakel compressie in
    const app = express();
    app.use(compression());

    import fetch from 'node-fetch'; // Bibliotheek voor het doen van HTTP-verzoeken

    import path from 'path'; // Module voor het werken met bestandspaden
    import { fileURLToPath } from 'url'; // Functie voor het converteren van een bestands-URL naar een bestandspad

    // Definieer het huidige bestandssysteempad en de mapnaam
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Stel een route in voor het serveren van statische bestanden (bijv. CSS, JS)
    app.use(express.static(path.join(__dirname, 'public')));

    // Stel de weergavemotor en het weergavepad in
    app.set('view engine', 'ejs');
    app.set('views', 'views');

    // Definieer de route voor de hoofdpagina ('/')
    app.get('/', (req, res) => {
        // Doe een HTTP GET-verzoek naar de Rijksmuseum API om schilderijgegevens op te halen
        fetch("https://www.rijksmuseum.nl/api/en/collection?key=RCZaMbZZ&format=json&type=painting&ps=48")
            .then(response => {
                return response.json();
            })
            .then(data => {
                // Stel de Cache-Control header in op een jaar (max-age=31536000) om caching van de respons mogelijk te maken
                res.set('Cache-control', 'public, max-age=31536000')
                // Render het 'index' weergavetemplate en geef de ontvangen gegevens door
                res.render('index', {
                    data: data
                });
            })
    });

    // Definieer de route voor het zoeken naar schilderijen ('/search')
    app.get('/search', (req, res) => {
        // Doe een HTTP GET-verzoek naar de Rijksmuseum API met de opgegeven zoekopdracht om schilderijgegevens op te halen
        fetch(`https://www.rijksmuseum.nl/api/en/collection?key=RCZaMbZZ&q=${req.query.query}&format=json&type=painting&ps=48`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // Stel de Cache-Control header in op een jaar (max-age=31536000) om caching van de respons mogelijk te maken
                res.set('Cache-control', 'public, max-age=31536000')
                // Render het 'index' weergavetemplate en geef de ontvangen gegevens door
                res.render('index', {
                    data: data
                });
            })
    });

    // Definieer de route voor de offlinepagina ('/offline')
    app.get('/offline', (req, res) => {
        // Render de 'offline' weergavepagina
        res.render('offline');
    });

    // Start de server en laat deze luisteren op poort 1000
    app.listen(1000);
