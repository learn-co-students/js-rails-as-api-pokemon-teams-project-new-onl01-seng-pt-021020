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

  button.addeventListener("click", createPokemon)

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


const createPokemon = () => {

}

const deletePokemon = () => {

}
