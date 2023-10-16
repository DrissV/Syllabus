const preElements = document.querySelectorAll('pre');

preElements.forEach(preElement => {
    preElement.addEventListener('click', () => {
        const textToCopy = preElement.textContent;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Texte copié dans le presse-papier');
            })
            .catch(err => {
                console.error('Erreur pour copie du texte : ', err);
            });
    });
});