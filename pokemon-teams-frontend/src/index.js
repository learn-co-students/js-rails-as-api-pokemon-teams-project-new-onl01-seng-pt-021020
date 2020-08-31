const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener('DOMContentLoaded', () => {
	fetch(TRAINERS_URL)
		.then((response) => {
			return response.json();
		})
		.then((trainers) => {
			trainerData(trainers['data']);
		});
});

function addPokemon(id){
  const trnId = id
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trnId
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    trainerData(object)
    
  })
  .catch((error) => {
    console.log(error);
  });
};


function trainerData(trainers) {
  let main = document.querySelector('main');
  
	trainers.forEach(function(trainer) {
    const trnId = trainer['id'];

    let div = document.createElement('div'),
    p = document.createElement('p'),
    addPokeBtn = document.createElement('button'),
    ul = document.createElement('ul');
    
    addPokeBtn.setAttribute('data-trainer-id', trainer['id']);
    addPokeBtn.setAttribute('class', 'add-poke')
    div.setAttribute('class', 'card');
		div.setAttribute('data-id', trainer['id']);
    
		main.appendChild(div, addPokeBtn);
		for (const key in trainer) {
      if (key == 'attributes') {
        let pokemons = trainer[key].pokemons;
        
				p.innerText = trainer[key].name;
				div.appendChild(p);
        
				addPokeBtn.innerText = 'Add Pokemon';
        addPokeBtn.addEventListener('click', (event) => {
          addPokemon(trnId)
          event.preventDefault()
        })
        
				div.appendChild(addPokeBtn);
				div.appendChild(ul);
        
				for (const key in pokemons) {
          let li = document.createElement('li');
					lilBtn = document.createElement('button');
					lilBtn.setAttribute('class', 'release');
					lilBtn.setAttribute('data-pokemon-id', pokemons[key].id);
					lilBtn.innerText = 'Release';
					li.innerText = `${pokemons[key].nickname} (${pokemons[key].species})`;
					li.appendChild(lilBtn);
          ul.appendChild(li);
				}
			}
		}
  });
  releasePokemon()
}

function releasePokemon() {
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
