// ! Basic server stuff
const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

// ! Axios and PokeAPI
const axios = require('axios');

// ! to retrieve the configuration of the wanted pokemon...
// ! ...to reduce duplicate code (DRY: don't repeat yourself)
async function pokemonConfig(pokemonName) {
    const config = {
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    }

    const res = await axios(config)
    return res.data
}

// ! to make a request to the API and retrieve the data of a pokemon
async function makeRequest() {
    const pokemon1 = await pokemonConfig('pikachu')
    const pokemon2 = await pokemonConfig('pidgey')
    const pokemon3 = await pokemonConfig('minun')

    const map = new Map()
    map.set('pikachu', pokemon1)
    map.set('pidgey', pokemon2)
    map.set('minun', pokemon3)
    return map
}

// ! Render the EJS on the server
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const pokemonFetchedData = await makeRequest()
    res.render('index', { title: "Pokemon", header: "List of Pokemon",
                            pokemon1: pokemonFetchedData.get('pikachu'),
                            pokemon2: pokemonFetchedData.get('pidgey'),
                            pokemon3: pokemonFetchedData.get('minun')
                        })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}. http://localhost:${port}`)
})

