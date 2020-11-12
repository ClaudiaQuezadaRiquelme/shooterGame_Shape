/**
 * JS for UI components
 */

/**
 * Global vars
 */
let toggles;
let swipeSection;
let swiper;


/**
 * @function initToggles
 * 
 * Inicializa los Toggles en la aplicación
 * Toggle son los switchers
 */
let initToggles = () => {
    toggles.forEach(t => {
        t.addEventListener('click', () => {
            t.classList.toggle('on');
        });
    });
};


/**
 * @function initSwiper
 * 
 * Inicializa SwiperJS con las configuraciones necesarias
 * La navegación entre las página settings, menu, leaderboard es con Swiper
 */
let initSwiper = () => {
    // Swiper acepta 2 parámetros:
    // (1) Un elemento dom
    // (2) Un objeto de parámetros
    swiper = new Swiper(swipeSection, {
        // Iniciar por defecto en el Menú principal que corresponde al slide 1
        initialSlide: 1
    });
};


/**
 * @function initUI
 * 
 * Inicializa todo lo que tenga que ver con UI
 * La ejecuto en main.js
 */
const initUI = () => {
    // toggles
    toggles = GAME_UI.app.querySelectorAll('.toggle');
    initToggles();

    // swiperJS
    swipeSection = '.swiper_section';
    initSwiper();
};


