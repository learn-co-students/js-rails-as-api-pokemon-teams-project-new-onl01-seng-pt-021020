const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");
document.addEventListener("DOMContentLoaded", () => loadTrainers());
//anonymous function that invokes loadTrainers

const loadTrainers = () => {
  // same as saying const loadTrainers() = function {}
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
      json.forEach(trainer => renderTrainer(trainer))
    })
}

const renderTrainer = (trainerHash) => {
  //trainerHash is the argument, and this hash is for one trainer only
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const ul = document.createElement("ul");

  div.setAttribute("class", "card"); //class="card"
  div.setAttribute("data-id", trainerHash.id); //data-id="1"
  p.innerHTML = trainerHash.name;
  button.setAttribute("data-trainer-id", trainerHash.id);
  button.innerHTML = "Add Pokemon";
  //<button data-trainer-id="1">Add Pokemon</button>
  //when I click this button, something needs to happen. a click event listener

  button.addEventListener("click", createPokemon)

  //createPokemon here corresponds to the #create method in the controller

  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(ul);
  //This is what puts these elements onto the page.
  main.appendChild(div);
  trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
  //{id: 1, species: "Seel", nickname: "Arnulfo", trainer_id: 1}
  const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`);
  const li = document.createElement("li");
  const button = document.createElement("button")

  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  button.setAttribute("class", "release");
  button.setAttribute("data-pokemon-id", pokemon.id);
  button.innerHTML = "Release"
  //the pokemon needs to be released here

  button.addEventListener("click", deletePokemon)

  li.appendChild(button); //add the button to the li
  ul.appendChild(li); //add the li to the ul

  //<button class="release" data-pokemon-id="140">Release</button>
}


const createPokemon = (e) => {
  e.preventDefault();
  //prevent regular behavior, prevent refreshing of the page
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
  }
  fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        alert(json.message)
      } else {
        renderPokemon(json)
      }
    })
}

const deletePokemon = (e) => {
  e.preventDefault();
//remove it from db
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(`$(POKEMONS_URL)/${e.target.dataset.pokemonId}`, configObj)

  //remove it from the page
  e.target.parentElement.remove();


}
