"use strict";

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v9";

// CODELAB: Add list of files to cache here.
// Tenemos un array con los ficheros que hay qe cachear, es decir, los ficheros que queremos tener, por ejemplo, nuestra página offline
const FILES_TO_CACHE = [
    '/offline.html',
    "/index.html",
    "assets/img/characters/char_01.png",
    "assets/img/characters/char_02.png",
    "assets/img/characters/char_03.png",
    "assets/img/characters/EnemyBall.png",
    "assets/img/characters/PlayerBall.png",
    "assets/img/characters/PlayerGamming.png",
    "assets/img/bueno_muerto.png",
    "assets/img/bueno.png",
    "assets/img/game_over.png",
    "assets/img/jefe_muerto.png",
    "assets/img/malo_muerto.png",
    "assets/img/malo.png",
    "assets/img/shot1.png",
    "assets/img/shot2.png",
    "assets/img/you_win.png",
    '/app/install.js'
];

self.addEventListener("install", (evt) => {
    // para saber que se está lanzando la instalación
    console.log("[ServiceWorker] Install");
    // CODELAB: Precache static resources here.
    evt.waitUntil( // esperar hasta que se abra la caché
        // le decimos que vamos a la caché con el nombre que dejamos en la constante
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[ServiceWorker] Pre-caching offline page");
            // cuando esté abierta la caché añadimos todos los ficheros a cachear
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    console.log("[ServiceWorker] Activate");
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        // vamos a hacer una comprobación para ver si ncesito refrescar algo de la caché o borrar, etc.
        // Obtengo todas las claves de la caché
        caches.keys().then((keyList) => {
            // hago un map de las keys
            return Promise.all(
                keyList.map((key) => {
                    // si no es la caché que indiqué en CACHE_NAME
                    if (key !== CACHE_NAME) {
                        // voy a borrarla
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    } // así ahorro espacio de almacenamiento y lo mantego actualizado
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    // CODELAB: Add fetch event handler here.
    // if (evt.request.mode !== 'navigate') {
    //   // Not a page navigation, bail.
    //   console.log("Fetch no navigate");
    //   return;
    // }
    console.log("[ServiceWorker] Fetch", evt.request.url);
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            // si esa petición de fetch coincide con la cache que estamos abriendo, devolverla.
            // si no (||), hago un verdadero fetch
            return cache.match(evt.request).then((response) => {
                console.log("RESP", response);
                return response || fetch(evt.request);
            }); // si ya tengo el elemento cacheado, no ir a la red y devolverlo
        })
    );
});
