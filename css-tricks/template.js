let modal = null;
const focusableSelector = 'button, a, input, textarea';
let focusables = [];

const openModal = (e) => {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal = (e) => {
    if (modal === null) {
        return;
    }
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    target.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = (e) => {
    e.stopPropagation();
};

const focusInModal = (e) => {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
   
    } else if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
};

document.querySelectorAll('.js-modal').forEach(a => {
    console.log(a);
    a.addEventListener('click', openModal);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key == 'Esc') {
        closeModal(e);
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e);
    }
});