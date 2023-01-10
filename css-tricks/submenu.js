function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}
  
  document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);  