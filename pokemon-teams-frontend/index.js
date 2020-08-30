const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', () => {
    const trainers = fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(json => {console.log(JSON.stringify(json))})
        //.then(json => {renderTrainers(json)})
//    const pokemons = fetch(POKEMONS_URL)
//        .then(response => response.json())
//
//    const main = document.querySelector('main')
////
//    function renderTrainers(json) {
//        const jArray = Array.from(JSON.parse(JSON.stringify(json)).data)
//        jArray.forEach(trainer => {
//            //console.log(JSON.stringify(trainer))
//            const card = document.createElement('div.card')
//            card.textContent = JSON.stringify(trainer)
//            card.setAttribute('data-id', trainer.id)
//
//            const trainerName = document.createElement('p')
//            trainerName.textContent = trainer.attributes.name
//            card.appendChild(trainerName)
//
//            const addPokemonBtn = document.createElement('button')
//            addPokemonBtn.setAttribute('data-trainer-id', trainer.id)
//            addPokemonBtn.textContent = 'Add Pokemon'
//            card.appendChild(addPokemonBtn)
//
////            const pokemonsList = document.create('ul')
////            trainer.pokemons.data.forEach(pokemon => {
////                const pokemonLi = document.create('li')
////                pokemonLi.textContent = `${pokemon.
//
//            main.appendChild(card)
//        })
//    }
})
