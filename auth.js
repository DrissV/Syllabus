(() => {

    // Bloque immédiatement l'affichage
    document.documentElement.style.display = 'none';

    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf("/") + 1);

    if (!file.startsWith('supplements_') || !file.endsWith('.html')) {
        document.documentElement.style.display = 'block';
        return;
    }

    var expectedPassword = file.replace('supplements_', '').replace('.html', '');

    if (sessionStorage.getItem('supplements_auth') === expectedPassword) {
        document.documentElement.style.display = "block";
        return;
    }

    var user = prompt('Mot de passe requis :');

    if (user === expectedPassword) {
        sessionStorage.setItem('supplements_auth', expectedPassword);
        document.documentElement.style.display = 'block';
    } else {
        // Redirige vers page inexistante pour simuler 404
        window.location.replace('/__forbidden__' + Date.now());
    }

})();