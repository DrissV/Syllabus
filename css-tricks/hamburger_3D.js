const btn = document.querySelector('.btn');
const spinContainer = document.querySelector('.spin-container');

btn.addEventListener('click', () => {
    spinContainer.classList.toggle('active');
});