/*
function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
*/
let main = document.getElementById('main');
let accordion_links = document.querySelectorAll('#accordion li > a');
accordion_links.forEach((link) => {
    link.addEventListener('focus', () => {
        let submenu = link.nextElementSibling;
        main.style.marginTop = (submenu !== null) ? `${submenu.clientHeight}px` : 0;
    });
    link.addEventListener('mouseover', () => {
        let submenu = link.nextElementSibling;
        if (submenu !== null) {
            main.style.marginTop = `${submenu.clientHeight}px`;
            submenu.addEventListener('mouseover', () => {
                main.style.marginTop = `${submenu.clientHeight}px`;
                submenu.removeEventListener('mouseleave');
            });
            submenu.addEventListener('mouseleave', () => {
                main.style.marginTop = 0;
                submenu.removeEventListener('mouseover');
            });
        } else {
            main.style.marginTop = 0;
        }
    });
    link.addEventListener('mouseleave', () => {
        main.style.marginTop = 0;
    });
});