// Sintaxis del modo estricto para todo el script
'use strict';

// require de express
const express = require('express');
// hace pasar de http a htts porque es un requisito para las PWAs
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  // Para arrancar el servidor, si está en localhost nos hace esa redirección
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for static files
  // el servidor simplemente sirve lo que está en la carpeta public
  app.use(express.static('public'));

  // Start the server
  // el servidor escucha en el puerto 8000
  return app.listen('8000', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 8000...');
  });
}

// este comando arranca el servidor
startServer();
