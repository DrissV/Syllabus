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

const smartLinkElements = document.querySelectorAll('.smart-link');

smartLinkElements.forEach((link) => {

    let timer = null;

    function openSameTab() {
        window.location.href = link.href;
    }

    function openNewTab() {
        window.open(link.href, "_blank");
    }

    /* Souris */
    link.addEventListener('click', (e) => {
        e.preventDefault();

        if (timer) {
            clearTimeout(timer);
            timer = null;
            openNewTab(); // double clic
        } else {
            timer = setTimeout(() => {
                openSameTab(); // simple clic
                timer = null;
            }, 250);
        }
    });


    /* Clavier */
    link.addEventListener('keydown', (e) => {

        // Ctrl/Cmd + Enter -> nouvel onglet (standard)
        if ((e.ctrlKey || e.metaKey) && 'Enter' === e.key) {
            openNewTab();
            e.preventDefault();
            return;
        }

        // Enter simple / double Enter
        if ('Enter' === e.key) {
            if (timer === null)  {
                timer = setTimeout(() => {
                    openSameTab();
                    timer = null;
                }, 250);
            } else {
                clearTimeout(timer);
                timer = null;
                openNewTab();
            }
            
            e.preventDefault();
        }
    });
});

const questions = document.querySelectorAll('fieldset.question');

Promise.all([
    fetch('eyesOpen.html').then((response) => response.text()),
    fetch('openClosed.html').then((response) => response.text())
]).then(([eyesOpen, eyesClosed]) => {
    const createSvg = (svg) => {
        const template = document.createElement('template');
        template.innerHTML = svg.trim();
        return template.content.firstElementChild;
    };

    questions.forEach((fieldset) => {
        // Transforme les .em en explications sauf les span.em
        fieldset.querySelectorAll('.em:not(span)').forEach((element) => {
            element.classList.add('explication');
        });

        // Création du bouton
        const firstParagraph = fieldset.querySelector('p');

        if (!firstParagraph) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('toggle-correction');

        const icon = document.createElement('span');
        icon.classList.add('toggle-icon');

        const label = document.createElement('span');

        button.append(icon);
        button.append(label);

        firstParagraph.insertAdjacentElement('afterend', button);
    });

    const updateButton = () => {
        const showCorrection = fieldset.classList.contains('show-correction');
        icon.replaceChildren(createSvg(showCorrection ? eyesClosed : eyesOpen));
        label.textContent = showCorrection ? 'Masquer la correction' : 'Afficher la correction';
        button.setAttribute('aria-label', label.textContent);
    };

    updateButton();

    button.addEventListener('click', () => {
        fieldset.classList.toggle('show-correction');
        updateButton();
    });
});