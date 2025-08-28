const preElements = document.querySelectorAll('pre');

preElements.forEach((preElement) => {
    preElement.setAttribute('tabindex', '0'); // Rendre focusable
    preElement.setAttribute('role', 'button'); // Indiquer son rôle
    preElement.setAttribute('aria-label', 'Copier le contenu dans le presse-papier');

    preElement.addEventListener('click', (event) => {
        copyPreContent(event);
    });
    preElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            copyPreContent(event);
        }
    });
});

const copyPreContent = (event) => {
    const textToCopy = event.target.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Texte copié dans le presse-papier');
        })
        .catch((err) => {
            console.error('Erreur pour copie du texte : ', err);
        });
};

const gifs = document.querySelectorAll('img[src=".gif"]');

gifs.forEach((img) => {
    const src = img.src;
    img.style.cursor = 'pointer';
    img.onclick = () => (img.src = '', img.src = src);
});

/*
gifs.forEach((img) => {
    img.dataset.src = img.src;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        img.src = '';
        img.src = img.dataset.src;
        img.dataset.playing = (img.dataset.playing === 'true') ? 'false' : 'true';
    });
});
*/