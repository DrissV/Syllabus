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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.font = '40px sans-serif';
x = 10;
y = 50;

// @description: wrapText wraps HTML canvas text onto a canvas of fixed width
// @param ctx - the context for the canvas we want to wrap text on
// @param text - the text we want to wrap.
// @param x - the X starting point of the text on the canvas.
// @param y - the Y starting point of the text on the canvas.
// @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
// @param lineHeight - the height of each line, so we can space them below each other.
// @returns an array of [ lineText, x, y ] for all lines
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        } else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if (n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
};

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
       ctx.fillText(lines[i], window.innerWidth / 3, y + y * i, window.innerWidth / 3);
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

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

// var container = document.getElementById("image-wrap"); // specific element on page

submit.addEventListener('click', () => {
    let imgUrl = canvas.toDataURL('image/png');
    const imgProps = doc.getImageProperties(imgUrl);
    console.log(imgProps);
    const textlines = doc.setFontSize(20).splitTextToSize(texte.value, pageWidth / 3);
    doc.text(pageWidth / 3, 20, textlines);

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    let marginX = (pageWidth - canvasWidth) / 2;
    let marginY = (pageHeight - canvasHeight) / 2;
    doc.addImage(imgUrl, 'png', marginX, pageHeight / 2, canvasWidth, canvasHeight);
    doc.save('test_braille');
    location.reload();
});