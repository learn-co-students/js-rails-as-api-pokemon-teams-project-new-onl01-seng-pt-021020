const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', () => {
    const trainers = fetch(TRAINERS_URL)
        .then(response => response.json())
        //.then(json => {console.log(JSON.stringify(json))})
        .then(json => {renderTrainerCards(json)})

})

const main = document.querySelector('main')

function renderTrainerCards(json) {
    const trainers = Array.from(json)

    trainers.forEach(trainer => {renderTrainerCard(trainer)})
}

function renderTrainerCard(trainer) {
    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', trainer.id)

    const name = document.createElement('p')
    name.textContent = trainer.name
    card.appendChild(name)

    const addBtn = document.createElement('button')
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.textContent = 'Add Pokemon'
    addBtn.addEventListener('click', e => {requestNewPokemon(e.currentTarget.getAttribute('data-trainer-id'))})
    card.appendChild(addBtn)

    const pokeList = document.createElement('ul')
    const pokemons = trainer.pokemons
    pokemons.forEach(pokemon => {
        const pokeItem = document.createElement('li')
        pokeItem.textContent = `${pokemon.nickname} (${pokemon.species})`
        const releaseBtn = document.createElement('button')
        releaseBtn.className = 'release'
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.textContent = 'Release'
        releaseBtn.addEventListener('click', e => {releasePokemon(pokemon.id, e.currentTarget.parentElement)})
        pokeItem.appendChild(releaseBtn)
        pokeList.appendChild(pokeItem)
    })
    card.appendChild(pokeList)


    main.appendChild(card)
}

function requestNewPokemon(trainerId) {
    fetch(`${TRAINERS_URL}/${trainerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(json => {addPokemon(json)})
        .catch(error => {console.error(error.message)})
}

function addPokemon(json) {
    const card = document.querySelector(`
div.card[data-id="${json.id}"]`)
    const pokeList = card.querySelector('ul')
    const listedPokemons = pokeList.querySelectorAll('li')
    const listedPokemonsIds =[]
    const receivedPokemons = Array.from(json.pokemons)
    const receivedPokemonsIds = []
    const newPokemonsIds = []

    receivedPokemons.forEach(pokemon => {
        receivedPokemonsIds.push(pokemon.id)
    })
    listedPokemons.forEach(pokeItem => {
        const releaseBtn = pokeItem.querySelector('button')
        const id = releaseBtn.getAttribute('data-pokemon-id')
        listedPokemonsIds.push(parseInt(id))
    })

    receivedPokemonsIds.forEach(id => {
        if (!listedPokemonsIds.includes(id)) {
            newPokemonsIds.push(id)
        }
    })

    newPokemonsIds.forEach(id => {
        const pokeItem = document.createElement('li')
        const newPokemon = receivedPokemons.find(pokemon => pokemon.id == id)
        pokeItem.textContent = `${newPokemon.nickname} (${newPokemon.species})`
        const releaseBtn = document.createElement('button')
        releaseBtn.className = 'release'
        releaseBtn.setAttribute('data-pokemon-id', id)
        releaseBtn.textContent = 'Release'
        releaseBtn.addEventListener('click', e => {releasePokemon(id, e.currentTarget.parentElement)})
        pokeItem.appendChild(releaseBtn)
        pokeList.appendChild(pokeItem)
    })
}

function releasePokemon(pokemonId, pokeItem) {
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(() => {deletePokemon(pokeItem)})
}

function deletePokemon(pokeItem) {
    pokeItem.parentNode.removeChild(pokeItem)
}
