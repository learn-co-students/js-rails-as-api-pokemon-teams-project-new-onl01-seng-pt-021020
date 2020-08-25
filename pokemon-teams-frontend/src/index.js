const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getTrainersData();
})


function getTrainersData() {
    fetch(TRAINERS_URL).then(response => {
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
        insertPokemon(element);
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
    addBtn.addEventListener("click", () => { addPokemon(element) })
    newDiv.className = "card"
    newDiv.setAttribute("data-id", element.id)
    newP.innerText = trainerName

    main.appendChild(newDiv)
    newDiv.appendChild(newP)
    newDiv.appendChild(addBtn)
    newDiv.appendChild(newUl)
}

function insertPokemon(element) {
    let trainerId = element.attributes.trainer_id.toString()
    const div = document.querySelector(`div[data-id='${trainerId}']`)
    const ul = div.getElementsByTagName("ul")[0]
    let li = document.createElement("li")
    let btn = document.createElement("button")
    btn.className = "release"
    btn.innerText = "Release"
    btn.addEventListener("click", () => { removePokemon(element) })
    btn.setAttribute("data-pokemon-id", element.id)
    li.innerText = `${element.attributes.nickname} (${element.attributes.species})`
    li.appendChild(btn)
    ul.appendChild(li)
}

function addPokemon(e) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(e.id)
    }).then(resp => {
        return resp.json()
    }).then(obj => {
        let trainerId = obj.trainer_id.toString()
        const div = document.querySelector(`div[data-id='${trainerId}']`)
        const ul = div.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        let btn = document.createElement("button")
        btn.className = "release"
        btn.innerText = "Release"
        btn.addEventListener("click", () => { removePokemon(obj) })
        btn.setAttribute("data-pokemon-id", obj.id)
        li.innerText = `${obj.nickname} (${obj.species})`
        li.appendChild(btn)
        ul.appendChild(li)
    })
}

function removePokemon(e) {
    fetch(POKEMONS_URL + `/${e.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(e)
    }).then(resp => {
        return resp.json()
    }).then(obj => {
        debugger
        console.log(obj)
    })
}