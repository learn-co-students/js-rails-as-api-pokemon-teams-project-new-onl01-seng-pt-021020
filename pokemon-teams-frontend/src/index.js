const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
document.addEventListener('DOMContentLoaded', () => {
	fetch(TRAINERS_URL)
		.then((response) => {
			return response.json();
		})
		.then((trainers) => {
			createTrainerCards(trainers['data']);
		});
});

function createTrainerCards(trainers) {
	trainers.forEach((trainer) => {
		const div = document.createElement('div');
		const p = document.createElement('p');
		const button = document.createElement('button');
		const ul = document.createElement('ul');
		div.classList.add('card');
		div.setAttribute('data-id', `${trainer.id}`);
		p.innerText = `${trainer.attributes.name}`;
		button.setAttribute('data-trainer-id', `${trainer.id}`);
		button.className = 'add-pokemon';
		button.innerText = 'Add Pokemon';
		div.appendChild(p);
		div.appendChild(button);
		trainer.attributes.pokemons.forEach((element) => {
			let li = document.createElement('li');
			li.innerHTML = `${element.nickname} (${element.species})<button class="release" data-pokemon-id="${element.id}">Release</button>`;
			ul.appendChild(li);
		});
		div.appendChild(ul);
		document.body.appendChild(div);
	});
	addPokemonListener();
	addReleaseListener();
}

function addReleaseListener() {
	const buttons = document.querySelectorAll('.release');
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const configObj = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			};
			fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj);
			event.target.parentElement.remove();
		});
	});
}

function addPokemonListener() {
	const buttons = document.querySelectorAll('.add-pokemon');
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			addANewPokemon(event);
		});
	});
}
function addANewPokemon(event) {
	const trainerId = event.target.dataset.trainerId;
	data = { trainer_id: trainerId };

	fetch(POKEMONS_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(data)
	}).catch((error) => {
		console.log(error);
	});
}
