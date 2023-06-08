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

app.listen(3000);