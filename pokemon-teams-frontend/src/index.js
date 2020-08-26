

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => load())

// function to load both function that fetch the api
const load = () => {
    loadTrainers()
    loadPokemons()
}
// fetch the url/trainers
const loadTrainers = () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(collection => renderTrainer(collection))
    })
}
// fetch the url/pokemons
const loadPokemons = () => {
    fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(collection => renderPokemon(collection))
    })
}





// renders all the trainers in a p element inside of a div
const renderTrainer = (trainer) => {
    const card = document.createElement("div")
    const button = document.createElement("button")
    const p = document.createElement("p")
    let ul = document.createElement("ul")
    card.setAttribute("class", `card`)
    card.setAttribute("data-id", `${trainer.id}`)
   
   
    let trainerName = card.appendChild(p)
    let pokeball = card.appendChild(button)
    let pokelist = card.appendChild(ul)
  
    main.appendChild(card)
    pokeball.innerText = "add pokemon"
  
    
    trainerName.innerText = `${trainer.id + trainer.name}`
    pokeball.addEventListener("click", createPokemon)
}  

 
const renderPokemon = (pokemon) => {

const li = document.createElement("li")
 const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
const btn = document.createElement('button')
btn.setAttribute("class", "release")
btn.setAttribute("data-pokemon-id", pokemon.id)
btn.innerText = `release ${pokemon.species}`
li.innerHTML = `${pokemon.nickname}`
btn.addEventListener("click", deletePokemon)
li.appendChild(btn)
ul.appendChild(li)
}
   
// creating pokemon by sending a request to the faker gem to generate data
// prevent default means regular behavior wont take place 
// that page wont refresh 
// something will happen asychronisly 

const createPokemon = (e) => {
    e.preventDefault()

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
       
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
        
    }

    fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(pokemon => {
            if (pokemon.message) {
                alert(pokemon.message)
            } else {
            renderPokemon(pokemon)
        }
    })
}
          

// delete pokemon
   const deletePokemon = (e) => {
    e.preventDefault()

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        e.target.parentElement.remove()
}