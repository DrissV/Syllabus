const data = {
    country: 'Suisse',
    population: 8.5,
    lang: ['DE', 'FR', 'IT', 'RM'],
    // RM = Romansh
};

const card = `
    <div class="card">
        <h2>Pays : ${data.country}</h2>
        <p>Population : ${data.population}</p>
        <p>Langue(s) : ${data.lang}</p>
    </div>
`

// document.querySelector('.container').innerHTML = card;
document.querySelector('.container').insertAdjacentHTML('beforeend', card);
// beforeend = avant la fin du contenu
// afterbegin = après le début du contenu
// afterend = après la fin du contenu
// beforebegin = avant le début du contenu