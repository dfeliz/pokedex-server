var express = require('express');
var router = express.Router();

var connection = require('../core/connection');
var Pokemon = require('../models/pokemon');
var getData = require('../seeds/pokemon');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET users
router.get('/api/users', function(req, res, next) {
    res.send('respond with a resource');
    console.log('hi');
});

// GET pokemons
router.get('/api/pokemons', function(req, res, next) {
    res.send('list of pokemons');
})

// GET pokemon types
router.get('/api/pokemons/types', function(req, res, next) {
    res.send('Pokemon types')
})

// GET catches
router.get('/api/catches', function(req, res, next) {
    res.send('Here be the catches');
})

router.get('/seeddata', async(req, res, next) => {
    var data = await getData();
    data.map(pokemon => {
        Pokemon.create({
            poke_name: pokemon.name,
            poke_description: 'asd',
            poke_captured: false,
        })
    })
    res.send('Done!');
}) 
// If /seeddata is accessed, populates the database with 
// pokeapi's pokemons

// https://youtu.be/bOHysWYMZM0?t=1340

module.exports = router;
