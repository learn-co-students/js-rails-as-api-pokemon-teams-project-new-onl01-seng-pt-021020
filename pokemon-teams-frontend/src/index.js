const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainers = fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {renderTrainers(json)})
const pokemons = fetch(POKEMONS_URL)
    .then(response => response.json())

const body = document.querySelector('body')

function renderTrainers(json) {
    Array.from(json).forEach(trainer => {
        const card = document.createElement('div.card')
        card.textContent = JSON.stringify(trainer)
        body.appendChild(card)
    })
}
