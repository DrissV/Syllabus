var nbrLignes = 6;
var nbrColonnes = 7;
var caseVide = ' ';
var jetonRouge = 'O';
var jetonJaune = 'X';
var jetonCourant = jetonRouge;
var joueurCourant = 'red';
var suite = 4;
var info = document.getElementById('information');
var td = document.body.getElementsByTagName('td');

var jeu = function () {
    
    var grille = initialiserGrille();
    
    function initialiserGrille() {
        var tab = [];
        for (var ligne = 0; ligne < nbrLignes; ligne++) {
            tab.push([]);
            for (var colonne = 0; colonne < nbrColonnes; colonne++) {
                tab[ligne].push(caseVide);
            }
        }
        return tab;
    }
    
    function afficher() {
        for (var ligne = 0; ligne < nbrLignes; ligne++) {
            var ligneAAfficher = ' | ';
            for (var colonne = 0; colonne < nbrColonnes; colonne++) {
                ligneAAfficher += grille[ligne][colonne] + ' | ';
            }
            console.log(ligneAAfficher);
        }
    }
    
    function jouer(colonne) {
        colonne--;
        var ligne;
        for (ligne = 0; ligne < nbrLignes; ligne++) {
            if (grille[ligne][colonne] !== caseVide) {
                break;
            }
        }
        if (ligne === 0) {
            return false;
        }
        ligne--;
        grille[ligne][colonne] = jetonCourant;
        /* var nb = (ligne * nbrColonnes) + colonne;
        td[nb].style.backgroundColor = joueurCourant; */
        animer(ligne, 0, colonne);
        return true;
    }
    
    function animer(max, ligne, colonne) {
        if (ligne > max) {
            changerJoueur();
            return;
        }
        if (ligne - 1 >= 0) {
            var nbO = ((ligne - 1) * nbrColonnes) + colonne;
            td[nbO].style.backgroundColor = 'white';
        }
        var nbC= (ligne * nbrColonnes) + colonne;
        td[nbC].style.backgroundColor = joueurCourant;
        setTimeout(function() {
            animer(max, ligne + 1, colonne);
        }, 10);
    }
    
    function checkedColonne() {
        for (var colonne = 0; colonne < nbrColonnes; colonne++) {
            for (var ligne = 0; ligne <= nbrLignes - suite; ligne++) {
                if (grille[ligne][colonne] !== caseVide && grille[ligne][colonne] === grille[ligne + 1][colonne] && grille[ligne][colonne] === grille[ligne + 2][colonne] && grille[ligne][colonne] === grille[ligne + 3][colonne]) {
                    return grille[ligne][colonne];
                }
            }
        }
        return false;
    }
    
    function checkedLigne() {
        for (var colonne = 0; colonne <= nbrColonnes - suite; colonne++) {
            for (var ligne = 0; ligne < nbrLignes; ligne++) {
                if (grille[ligne][colonne] !== caseVide && grille[ligne][colonne] === grille[ligne][colonne + 1] && grille[ligne][colonne] === grille[ligne][colonne + 2] && grille[ligne][colonne] === grille[ligne][colonne + 3]) {
                    return grille[ligne][colonne];
                }
            }
        }
        return false;
    }
    
    function checkedD1() {
        for (var ligne = 0; ligne <= nbrLignes - suite; ligne++) {
            for (var colonne = 0; colonne <= nbrColonnes - suite; colonne++) {
                if (grille[ligne][colonne] !== caseVide && grille[ligne][colonne] === grille[ligne - 1][colonne -1] && grille[ligne][colonne] === grille[ligne - 2][colonne - 2] && grille[ligne][colonne] === grille[ligne - 3][colonne -3]) {
                    return grille[ligne][colonne];
                }
            }
        }
        return false;
    }
    
    function checkedD2() {
        for (var ligne = 0; ligne <= nbrLignes - suite; ligne++) {
            for (var colonne = 0; colonne < nbrColonnes; colonne++) {
                if (grille[ligne][colonne] !== caseVide && grille[ligne][colonne] === grille[ligne + 1][colonne -1] && grille[ligne][colonne] === grille[ligne + 2][colonne - 2] && grille[ligne][colonne] === grille[ligne + 3][colonne -3]) {
                    return grille[ligne][colonne];
                }
            }
        }
        return false;
    }
    
    function gagnant() {
        var gagnant;
        if ((gagnant = checkedLigne()) !== false) {
            return joueur(gagnant);
        }
        if ((gagnant = checkedColonne()) !== false) {
            return joueur(gagnant);
        }
        if ((gagnant = checkedD1()) !== false) {
            return joueur(gagnant);
        }
        if ((gagnant = checkedD2()) !== false) {
            return joueur(gagnant);
        }
        return false;
    }
    
    function grilleRemplie() {
        for (var ligne = 0; ligne < nbrLignes; ligne++) {
            for (var colonne = 0; colonne < nbrColonnes; colonne++) {
                if (grille[ligne][colonne] === caseVide) {
                    return false;
                }
            }
        }
        return true;
    }
    
    function joueur(jeton) {
        return (jeton === jetonRouge) ? 'red' : 'yellow';
    }
    
    function changerJoueur() {
        if (joueurCourant === 'red') {
            jetonCourant = jetonJaune;
            joueurCourant = 'yellow';
        } else {
            jetonCourant = jetonRouge;
            joueurCourant = 'red';
        }
    }
    
    var self = {
        afficher : afficher,
        jouer : jouer,
        gagnant : gagnant,
        grilleRemplie : grilleRemplie
    };
    
    return self;
}

var game = jeu();
var gagnant;
var button = '<br><button onclick="location.reload();" id="reload">Recharger la grille</button>';

function joue(i) {
    game.jouer(i);
    info.innerHTML = joueurCourant;
    game.afficher();
    if (game.grilleRemplie()) {
        info.innerHTML = 'C\'est égalité !' + button;
    }
    if ((gagnant = game.gagnant()) !== false) {
        info.innerHTML = 'Le gagnant est les "' + gagnant + '"' + button;
    }
}