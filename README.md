# Aurelia Ribaudo Portfolio

Sito web portfolio personale di Aurelia Ribaudo, realizzato come progetto statico con HTML, CSS e JavaScript vanilla. Il sito presenta profilo, percorso accademico e professionale, competenze, galleria, curriculum e contatti.

## Panoramica

Il progetto e composto da quattro pagine principali:

- `index.html`: homepage con hero, sintesi del profilo, citazione del giorno e anteprima delle esperienze.
- `about.html`: biografia, competenze linguistiche, certificazioni, formazione, interessi, download CV e galleria fotografica.
- `projects.html`: esperienze professionali e progetti, con filtri per categoria.
- `contact.html`: informazioni di contatto e form dimostrativo con validazione lato client.

## Funzionalita

- Layout responsive con CSS dedicato per ogni pagina.
- Navigazione comune con stato attivo della pagina corrente.
- Widget meteo basato sulla geolocalizzazione del browser.
- Fallback meteo su Palermo se la geolocalizzazione viene rifiutata.
- Citazione del giorno nella homepage, con fallback locale se l'API esterna non risponde.
- Animazioni scroll-reveal tramite `IntersectionObserver`.
- Galleria immagini nella pagina About con frecce e indicatori.
- Filtri interattivi per le esperienze professionali.
- Form contatti dimostrativo con validazione dei campi obbligatori.
- Link per scaricare il CV in PDF.

## Tecnologie usate

- HTML5
- CSS3
- JavaScript vanilla
- Google Fonts
- Open-Meteo API per il meteo
- Nominatim/OpenStreetMap per il reverse geocoding
- DummyJSON Quotes API per la citazione del giorno


## Struttura del progetto

```text
.
|-- index.html
|-- about.html
|-- projects.html
|-- contact.html
|-- css/
|   |-- global.css
|   |-- index.css
|   |-- about.css
|   |-- projects.css
|   `-- contact.css
|-- js/
|   |-- nav.js
|   |-- weather.js
|   |-- index.js
|   |-- about.js
|   |-- projects.js
|   `-- contact.js
`-- images/
    |-- propic.png
    |-- libri.png
    |-- img1.jpeg
    |-- img2.jpeg
    |-- img3.jpeg
    |-- img4.jpeg
    |-- img5.jpeg
    `-- cvaurepdf.pdf
```

## Come avviare il sito in locale

Essendo un sito statico, basta aprire `index.html` nel browser.

In alternativa, si puo usare un piccolo server locale dalla cartella del progetto:

```bash
python -m http.server 8000
```

Poi aprire:

```text
http://localhost:8000
```

L'uso di un server locale e consigliato per testare meglio le chiamate `fetch`, la geolocalizzazione e il comportamento del browser.



## Note sul form contatti

Il form nella pagina `contact.html` e solo dimostrativo: controlla i campi obbligatori e mostra un messaggio di successo, ma non invia email e non salva dati.

Per renderlo realmente funzionante e necessario collegarlo a un servizio esterno o a un backend, per esempio Formspree, Netlify Forms, EmailJS o una API personalizzata.

## Personalizzazione

Per aggiornare il sito:

- modificare testi e sezioni direttamente nei file `.html`;
- aggiornare colori, spaziature e layout nei file dentro `css/`;
- modificare interazioni e animazioni nei file dentro `js/`;
- sostituire immagini e CV nella cartella `images/`, mantenendo gli stessi nomi file oppure aggiornando i percorsi negli HTML.

## Autrice

Aurelia Ribaudo  
Palermo, Italy  
Email: [aureliaribaudo@gmail.com](mailto:aureliaribaudo@gmail.com)
