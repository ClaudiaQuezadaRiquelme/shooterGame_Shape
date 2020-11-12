/**
 * 
 * animation_FadeIn
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 * 
 * 
 */
const animation_FadeIn = () => {
    // Selecciona elementos a animar
    const splash = GAME_UI.pages.splash;
    const title = splash.querySelector('h1');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(splash, {
        visibility: 'visible',
        opacity: 0
    });
    anime.set(title, {
        opacity: 0,
        translateY: 50
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 500,
        easing: 'easeInOutSine'
    });

    animation_layout
        .add({
            targets: [splash],
            opacity: 1
        })
        .add({
            targets: [title],
            opacity: 1, 
            translateY: 0
        }, '-=200');
};


/**
 * El resto de animaciones las construyes tú. 
 * Recuerda que puedes guardar las animaciones del layout
 * en la variable global animation
 */
const animation_SplashToMenu = () => {
    // Selecciona elementos a animar
    const from = GAME_UI.pages.splash;
    const to = GAME_UI.pages.swiperContainer;
    
    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: 'visible', 
        translateY: '100%', 
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });
    animation_layout
        .add({
            targets: [from], 
            translateY: '-100%', 
            opacity: 0
        })
        .add({
            targets: [to], 
            translateY: 0, 
            opacity: 1
        }, '-=750')
};

const animation_MenuToMain = () => {
    console.log('Anima animation_MenuToMain');

    // Selecciona elementos a animar
    const from = document.querySelector('#swiper_page'); // queremos que se vaya
    const to = document.querySelector('#main_page'); // queremos que entre

    // Necesitas meter algo de CSS antes de la animación??
    // sí, hay elementos css de #main_page que están ocultos y que nos conviene que estén visibles
    anime.set(to, {
        visibility: 'visible', 
        translateY: '-100%', // negativo para que caiga desde arriba
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });

    animation_layout
        .add({
            targets: [from],
            translateY: '100%',
            opacity: 0
        })
        .add({
            targets: [to],
            translateY: '0%',
            opacity: 1
        }, '-=750'); // para que esta animación suceda al mismo tiempo que la de from

    // Hace falta alguna Promesa o Callback para ejecutar siguientes acciones?
    // Sí. Necesitamos una promesa para que comience el juego
    animation_layout.finished.then( () => {
        // Inicializar el juego
        game = new Game();
        game.start();
    })
}

const animation_MainToMenu = () => {
    // Selecciona elementos a animar
    const from = document.querySelector('#main_page'); // queremos que se vaya
    const to = document.querySelector('#swiper_page'); // queremos que entre

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: 'visible', 
        translateY: '100%',
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });

    animation_layout
        .add({
            targets: [from],
            translateY: '-100%',
            opacity: 0
        })
        .add({
            targets: [to],
            translateY: '0%',
            opacity: 1
        }, '-=750'); // para que esta animación suceda al mismo tiempo que la de from

    // Hace falta alguna Promesa o Callback para ejecutar siguientes acciones?
    animation_layout.finished.then( () => {
        anime.set(from, {
            visibility: 'hidden'
        });

        // Reiniciar el juego para partir desde cero
        game.ended = true;
        document.querySelector(".game").innerHTML = '';
        // Reiniciar puntaje, vidas
        // (podrías dirigirte a Leaderboard para que se muestre el puntaje que obtuviste)
    });
}

const animation_PopupPause = () => {
    const popup = document.querySelector('#modal_pause_window');

    anime.set(popup, {
        translateY: '20%', 
        opacity: 0, 
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '0%',
        opacity: 1
    });

    animation_layout.finished.then(() => {
        game.pauseOrResume();
    });
};

animation_PopupContinue = () => {
    // Selecciona elementos a animar
    const popup = document.querySelector('#modal_pause_window');

    // Necesitas meter algo de CSS antes de la animación??
    // No.

    // Anima!
    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '-20%', // se traslada hacia arriba
        opacity: 0
    });

    // Hace falta alguna Promesa o Callback para ejecutar siguientes acciones?
    // Sí. Hay que volver a poner el juego en marcha
    animation_layout.finished.then(() => {
        game.pauseOrResume();
        anime.set(popup, { // Si no hacemos esto, no podemos poner pausa más de una vez porque queda una capa por encima de la pantalla 
            visibility: 'hidden'
        })
    });
};

const animation_ConfirmIn = () => {
    // Selecciona elementos a animar
    const popup = document.querySelector('#modal_confirm');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(popup, {
        translateY: '-20%', 
        opacity: 0, 
        visibility: 'visible'
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '0%',
        opacity: 1
    });

    // Hace falta alguna Promesa o Callback para ejecutar siguientes acciones?
}

const animation_ConfirmOut = () => {
    // Selecciona elementos a animar
    const popup = document.querySelector('#modal_confirm');

    // Necesitas meter algo de CSS antes de la animación??
    // No

    // Anima!
    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '-20%',
        opacity: 0
    });

    // Hace falta alguna Promesa o Callback para ejecutar siguientes acciones?
    animation_layout.finished.then(() => {
        anime.set(popup, {
            visibility: 'hidden'
        })
    });
}
