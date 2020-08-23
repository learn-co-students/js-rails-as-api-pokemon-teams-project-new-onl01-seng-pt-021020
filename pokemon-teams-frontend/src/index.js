const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')


// guide code
/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */

document.addEventListener('DOMContentLoaded', () => getTrainers())

const getTrainers = () => {
    return fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => {
            trainers.forEach((trainer) => {
                renderTrainer(trainer)
                })
            })
}

const renderTrainer = (trainer) => {
    // create elements
    const div = document.createElement('div')
    const p = document.createElement('p')
    const button = document.createElement('button')
    const ul = document.createElement('ul')

    // update element attributes
    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainer.id)
    p.innerHTML = trainer.name
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerText = "Add Pokemon"

    // append
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)

    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))

    // event - add pokemon
    button.addEventListener('click', createPokemon)
}

const renderPokemon = (pokemon) => {
    // create elements
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement('li')
    const button = document.createElement('button')

    // set element attributes
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute('class', 'release')
    button.setAttribute('data-pokemon-id', pokemon.id)
    button.innerText = 'Release'

    // append
    li.appendChild(button)
    ul.appendChild(li)

    // event - release pokemon
    button.addEventListener('click', releasePokemon)
}

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

const releasePokemon = (e) => {
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