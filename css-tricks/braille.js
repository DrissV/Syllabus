const texte = document.querySelector('#texte');
const braille = document.querySelector('#braille');
const caracteresBraille = {
    "a" : ".",
    "b" : "⠃",
    "c" : "⠉",
    "d" : "⠙",
    "e" : "⠑",
    "f" : "⠋",
    "g" : "⠛",
    "h" : "⠓",
    "i" : "⠊",
    "j" : "⠚",
    "k" : "⠅",
    "l" : "⠇",
    "m" : "⠍",
    "n" : "⠝",
    "o" : "⠕",
    "p" : "⠏",
    "q" : "⠟",
    "r" : "⠗",
    "s" : "⠎",
    "t" : "⠞",
    "u" : "⠥",
    "v" : "⠧",
    "w" : "⠺",
    "x" : "⠭",
    "y" : "⠽",
    "z" : "⠵",

    "ç" : "⠯",
    "Ç" : "⠠⠯",

    "A" : "⠠⠁",
    "B" : "⠠⠃",
    "C" : "⠠⠉",
    "D" : "⠠⠙",
    "E" : "⠠⠑",
    "F" : "⠠⠋",
    "G" : "⠠⠛",
    "H" : "⠠⠓",
    "I" : "⠠⠊",
    "J" : "⠠⠚",
    "K" : "⠠⠅",
    "L" : "⠠⠇",
    "M" : "⠠⠍",
    "N" : "⠠⠝",
    "O" : "⠠⠕",
    "P" : "⠠⠏",
    "Q" : "⠠⠟",
    "R" : "⠠⠗",
    "S" : "⠠⠎",
    "T" : "⠠⠞",
    "U" : "⠠⠥",
    "V" : "⠠⠧",
    "W" : "⠠⠺",
    "X" : "⠠⠭",
    "Y" : "⠠⠽",
    "Z" : "⠠⠵",

    "ou" : "⠳",
    "er" : "⠻",

    /* Numéros */
    "0" : "⠴",
    "1" : "⠂",
    "2" : "⠆",
    "3" : "⠒",
    "4" : "⠲",
    "5" : "⠢",
    "6" : "⠖",
    "7" : "⠶",
    "8" : "⠦",
    "9" : "⠔",

    " 0" : "⠴",
    " 1" : "⠼⠂",
    " 2" : "⠼⠆",
    " 3" : "⠼⠒",
    " 4" : "⠼⠲",
    " 5" : "⠼⠢",
    " 6" : "⠼⠖",
    " 7" : "⠼⠶",
    " 8" : "⠼⠦",
    " 9" : "⠼⠔",

    " " : " ",

    "á" : "⠷",
    "é" : "⠿",
    "í" : "⡈",
    "ó" : "⠬",
    "ú" : "⠾",

    "Á" : "⠠⠷",
    "Ã" : "⠜",
    "É" : "⠠⠿",
    "Í" : "⠠⡈",
    "Ó" : "⠠⠬",
    "Ú" : "⠠⠾",

    /* accents circonflexes */
    "â" : "⠡",
    "ê" : "⠣",
    "ô" : "⠹",

    "Â" : "⠠⠡",
    "Ê" : "⠠⠣",
    "Ô" : "⠠⠹",

    /* Accents tiltes */
    "ã" : "⠜",
    "õ" : "⠪",

    /* Accents graves */
    "à" : "⠜",
    "À" : "⠪",

    /* Tréma */
    "ü" : "⠫",
    "Ü" : "⠠⠫",
    
    /* Ponctuation */
    "," : "⠂",
    "." : "⠄",
    "..." : "⠄⠄⠄",
    ";" : "⠆",
    ":" : "⠒",
    "!" : "⠖",
    "?" : "⠢",
    "-" : "⠤",
    "—" : "⠤⠤",
    '"' : "⠦",
    "*" : "⠔",
    "$" : "⠰",
    "€" : "⠈⠑",
};

const enBraille = (texte) => {
    for (const [caractere, caractereBraille] of Object.entries(caracteresBraille)) {
        texte = texte.replaceAll(caractere, caractereBraille);
    }
    return texte;
}

texte.addEventListener('input', () => {
    braille.innerText = '';
    // braille.innerText = enBraille(texte.value);
    for (const lettre of texte.value) {
        braille.innerText += caracteresBraille[lettre];
    }
});