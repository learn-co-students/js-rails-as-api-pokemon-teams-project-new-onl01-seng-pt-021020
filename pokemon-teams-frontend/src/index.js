const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))


function renderTrainers(json) {
    json.forEach(trainer => {
        let div = document.createElement('div')
        div.className = 'card'
        div.dataset.trainerId = trainer.id
        main.appendChild(div)
        let h1 = document.createElement('h1')
        h1.innerHTML = trainer.name
        div.appendChild(h1)
        const addPokemonButton = document.createElement('button')
        addPokemonButton.innerText = "Add Pokemon"
        addPokemonButton.className = 'add-pokemon'
        addPokemonButton.dataset.trainer_id = trainer.id
        div.appendChild(addPokemonButton)
        addPokemonButton.addEventListener('click', addPokemon)
        ul = document.createElement('ul')
        div.appendChild(ul)
        trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
    })
}

function renderPokemon(pokemon) {
    let ul = document.querySelector(`div[data-trainer-id="${pokemon.trainer_id}"]`)
    let li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        ul.appendChild(li)
        const releaseButton = document.createElement('button')
        releaseButton.innerText = 'Release'
        releaseButton.className = 'release'
        releaseButton.dataset.pokemon_id = pokemon.id
        li.appendChild(releaseButton)
        releaseButton.addEventListener('click', releasePokemon)
}

function addPokemon(event) {
    event.preventDefault()

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainer_id})
    }

    fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(pokemon => {
            if (pokemon.message) {
                alert(pokemon.message)
            }
            else {
                renderPokemon(pokemon)
            }
        }
    )
}

function releasePokemon(event) {
    event.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemon_id}`, configObj)
        event.target.parentElement.remove()
}