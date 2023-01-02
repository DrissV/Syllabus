const caracteresBraille = {
    "a" : "&#x2801;",
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
    "è" : "⠮",
    "ù" : "⠾",
    "À" : "⠪",

    /* Trémas */
    "ë" : "⠫",
    "ü" : "⠳",
    "ï" : "⠻",
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

const texte = document.querySelector('#texte');
const braille = document.querySelector('#braille');
const email = document.querySelector('#email');
const submit = document.querySelector('#submit');
const traduction_braille = document.querySelector('#traduction_braille');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.font = '48px sans-serif';
x = 10;
y = 50;

texte.addEventListener('input', () => {
    braille.innerHTML = '';
    // braille.innerHTML = br.braille(texte.value);
    // braille.innerText = enBraille(texte.value);
    for (const lettre of texte.value) {
        if (caracteresBraille[lettre] !== undefined) {
            braille.innerHTML += caracteresBraille[lettre];
        } else {
            braille.innerHTML += lettre;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lines = braille.value.split('\n');
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + y * i);
    }
    ctx.save();
});

email.addEventListener('input', () => {
    //traduction_braille.setAttribute('action', 'mailto:' + email.value);
});

let doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
});

let pageWidth = doc.internal.pageSize.getWidth();

// var container = document.getElementById("image-wrap"); // specific element on page

submit.addEventListener('click', () => {
    let imgUrl = canvas.toDataURL('image/png');
    const imgProps= doc.getImageProperties(imgUrl);
    doc.setFontSize(20);
    doc.text(100, 30, texte.value, 'center');
    let x = pageWidth - imgProps.width / 3;
    console.log(imgProps.width, imgProps.height, x);
    const lines = braille.value.split('\n');
    doc.addImage(imgUrl, 'png',   x / 2 , 50);
    doc.save(texte.value);
    // location.reload();
});