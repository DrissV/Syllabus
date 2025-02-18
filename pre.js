const preElements = document.querySelectorAll('pre');

preElements.forEach(preElement => {
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