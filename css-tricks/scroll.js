const container = document.querySelector('.container');

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    // scrollTop = nombre de pixels qu'on a scrollé depuis le top
    // clientHeight = hauteur de la fenêtre (plus précisement la hauteur de la partie visible de la fenêtre)
    // scrollHeight = hauteur total du document avec tous les éléments
    if (scrollTop + clientHeight === scrollHeight) {
        addArticles(10);
    }

});

const addArticles = (index) => {
    for (let i = 0; i < index; i++) {
        const item = document.createElement('div');
        item.setAttribute('class', 'item');
        container.appendChild(item);
    }
}