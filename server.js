const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const POKEDEX = require('./pokedex.json')
require('dotenv').config()
console.log(process.env.API_TOKEN)
const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    console.log('validate bearer token middleware')
    debugger
    // move to the next middleware
    next()
})
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychich`, `Rock`, `Steel`, `Water`]

app.get('/types', function handleGetTypes(req, res) {
    res.json(validTypes)
})

app.get('/pokemon', function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;

    // filter our pokemon by name if name query param is present
    if (req.query.name) {
        response = response.filter(pokemon =>
            // case insensitive searching
            pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
    }

    // filter our pokemon by type if type query param is present
    if (req.query.type) {
        response = response.filter(pokemon =>
            pokemon.type.includes(req.query.type)
        )
    }

    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})