'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('btnInstall');

// CUANDO EL USUARIO HAGA CLICK EN EL BOTÓN, LLAMAMOS AL MÉTODO INSTALLpwa
installButton.addEventListener('click', installPWA);

// cuando ocurra el evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent (evt) {
    // guardo el evento
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden'); // muestro el botón
}

function installPWA (evt) {
    // preguntarle al usuario cuando ha hecho click por el prompt
    deferredInstallPrompt.prompt();
    // volvemos a ocultar el botón
    evt.srcElement.setAttribute('hidden', true);
    // Esto ya no es imprescindible.
    // Si queremos campturar deferredInstallPrompt, ver qué ha elegido el usuario, usamos una promesa
    deferredInstallPrompt.userChoice.then( (choice) => {
        // Podemos hacer otras cosas tras capturar este evento
        if (choice.outcome === "accepted") {
            console.log('Aceptado');
        } else {
            console.log('Rechazado');
        }
        deferredInstallPrompt = null;
    })
}

// hay otro evento útil que podemos capturar
window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled (evt) {
    console.log('Shaped instalado');
}