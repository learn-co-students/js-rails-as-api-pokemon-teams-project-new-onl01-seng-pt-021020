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

    trainers.forEach(trainer => {
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
            pokeItem.appendChild(releaseBtn)
            pokeList.appendChild(pokeItem)
        })
        card.appendChild(pokeList)


        main.appendChild(card)
    })
}

function requestNewPokemon(trainerId) {
    fetch(`${TRAINERS_URL}/${trainerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
//        body: {
//            'trainer_id': trainerId
//        }
    })
        .then(response => {response.json()})
        .then(json => {addPokemon(json)})
        .catch(error => {console.error(error)})
}

function addPokemon(json) {
    console.log(JSON.stringify(json))
}
