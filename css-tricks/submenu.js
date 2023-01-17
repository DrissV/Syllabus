/*
function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
*/
let main = document.getElementById('main');
let accordion_links = document.querySelectorAll('.navbar .dropdown > a');
accordion_links.forEach((link) => {
    link.addEventListener('focus', () => {
        let submenu = link.nextElementSibling;
        main.style.marginTop = (submenu !== null) ? `${submenu.clientHeight}px` : 0;
    });
    link.addEventListener('mouseover', () => {
        let submenu = link.nextElementSibling;
        main.style.marginTop = (submenu !== null) ? `${submenu.clientHeight}px` : 0;
    });
    link.addEventListener('pointerout', () => {
        main.style.marginTop = 0;
    });
});