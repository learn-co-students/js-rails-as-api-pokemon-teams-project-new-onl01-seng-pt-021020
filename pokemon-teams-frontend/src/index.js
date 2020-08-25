const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById("main-content")

document.addEventListener("DOMContentLoaded", () => {
    getTrainersData();
})


function getTrainersData() {
    fetch(TRAINERS_URL).then(response => {
        return response.json()
    }).then(jsonObj => {
        jsonObj.forEach(trainer => renderTrainer(trainer))
    })
}

function renderTrainer(trainerObj) {
    let newDiv = document.createElement("div")
    let newP = document.createElement("p")
    let addBtn = document.createElement("button")
    let newUl = document.createElement("ul")
    newDiv.className = "card"
    newDiv.setAttribute("data-id", trainerObj.id)
    newP.innerText = trainerObj.name
    addBtn.innerText = "Add Pokemon"
    addBtn.setAttribute("data-trainer-id", trainerObj.id)
    addBtn.addEventListener("click", addPokemon)


    newDiv.appendChild(newP)
    newDiv.appendChild(addBtn)
    newDiv.appendChild(newUl)
    main.appendChild(newDiv)

    trainerObj.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon) {
    let trainerId = pokemon.trainer_id
    const div = document.querySelector(`div[data-id='${trainerId}']`)
    const ul = div.getElementsByTagName("ul")[0]
    let li = document.createElement("li")
    let btn = document.createElement("button")
    btn.className = "release"
    btn.innerText = "Release"
    btn.setAttribute("data-pokemon-id", pokemon.id)
    btn.addEventListener("click", removePokemon)
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(btn)
    ul.appendChild(li)
}



function addPokemon(e) {
    e.preventDefault();

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: e.target.dataset.trainerId })
    }).then(resp => {
        return resp.json()
    }).then(obj => {
        if (obj.message) {
            alert(obj.message)
        } else {
            renderPokemon(obj)
        }
    })
}

function removePokemon(e) {
    e.preventDefault();
    e.target.parentElement.remove()
    fetch(`http://localhost:3000/pokemons/${ e.target.dataset.pokemonId }`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}