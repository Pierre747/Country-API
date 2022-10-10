//^----------------- TODO: ------------------- //

// Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all) ✅

// Créer une fonction pour "fetcher" les données, afficher les données dans la console. ✅

// Passer les données à une variable ✅

// Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP ✅

// Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données ✅

// country.name.includes(inputSearch.value); ✅

// Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value) ✅

// Gérer les 3 boutons pour trier (méthode sort()) les pays ✅

//^----------------- RECUPERATION DE MES ÉLÉMENTS ------------------- //

const results = document.querySelector('.countries-container');

const wrapper = document.querySelector('.button-wrapper');

const btnSort = document.querySelectorAll('.btnSort');

const range = document.getElementById('inputRange');

const value = document.getElementById('rangeValue');

const spinner = document.getElementById('center');

spinner.style.display = 'visible';

let countries = [];

let sortMethod = 'maxToMin';

//^----------------- FONCTIONS ------------------- //

const fectchCountries = async () => {
	await fetch('https://restcountries.com/v3.1/all')
		.then((res) => res.json())
		.then((data) => (countries = data));
	displayCountries();
	spinner.style.display = 'none';
};

const displayCountries = () => {
	results.innerHTML = countries
		.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(inputSearch.value.toLowerCase())
		)
		.sort((a, b) => {
			if (sortMethod === 'maxToMin') {
				return b.population - a.population;
			} else if (sortMethod === 'minToMax') {
				return a.population - b.population;
			} else if (sortMethod === 'alpha') {
				return a.name.common.localeCompare(b.name.common);
			}
		})
		.slice(0, range.value)
		.map(
			(country) => `
      <div class="card"><h2>${country.name.common}</h2> <br>
												<h3>${country.capital}</h3>
												<p>Population: ${country.population.toLocaleString()}</p>
												<img src="${country.flags.svg}" alt="flag of${country.name.common}"></img>
												</div>
    `
		)
		.join('');
};

//^----------------- LISTENERS ------------------- //

inputSearch.addEventListener('input', () => {
	displayCountries();
});

range.addEventListener('input', (e) => {
	value.textContent = range.value;
	displayCountries();
});

btnSort.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		sortMethod = e.target.id;
		btn.classList.toggle = '.active';
		displayCountries();
	});
});

window.addEventListener('load', fectchCountries);
