window.onload = initialisation;

let btnMenu, menu, burger, fermer;

function initialisation() {
    btnMenu = document.getElementById('btnMenu');
    menu = document.getElementById('menu');
    burger = document.getElementById('burger');
    fermer = document.getElementById('fermer');
    ouvrirFermer();
    btnMenu.classList.remove('hidden-sm');
    btnMenu.addEventListener('click', ouvrirFermer);
}

function ouvrirFermer() {
    menu.classList.toggle('hidden-sm');
    fermer.classList.toggle('hidden-sm');
    burger.classList.toggle('hidden-sm');
    if (btnMenu.getAttribute('aria-expanded') === 'true') {
        btnMenu.setAttribute('aria-expanded', 'false');
    } else {
        btnMenu.setAttribute('aria-expanded', 'true');
    }
}