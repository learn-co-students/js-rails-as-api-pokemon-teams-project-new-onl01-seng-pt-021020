const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getTrainersData();
})


function getTrainersData() {
    fetch(BASE_URL + "/trainers").then(response => {
        return response.json()
    }).then(trainerObj => {
        renderTrainers(trainerObj["data"]);
        renderPokemon(trainerObj["included"]);
    })
}

function renderTrainers(trainerObj) {
    trainerObj.forEach(element => {
        createPokemonCard(element);
    });
}

function renderPokemon(trainerObj) {
    trainerObj.forEach(element => {
        addPokemon(element);
    });
}

function createPokemonCard(element) {
    const main = document.getElementById("main-content")
    let newDiv = document.createElement("div")
    let newP = document.createElement("p")
    let addBtn = document.createElement("button")
    let newUl = document.createElement("ul")
    let trainerName = element.attributes.name
    addBtn.innerText = "Add Pokemon"
    newDiv.className = "card"
    newDiv.setAttribute("data-id", element.id)
    newP.innerText = trainerName

    main.appendChild(newDiv)
    newDiv.appendChild(newP)
    newDiv.appendChild(addBtn)
    newDiv.appendChild(newUl)
}

function addPokemon(element) {
    let trainerId = element.attributes.trainer_id.toString()
    debugger
}