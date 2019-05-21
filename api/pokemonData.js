'use strict';
const axios = require('axios');
//const api = require('../api/pokeapi');

const getPokemonData = async() => {
    try {
        const call = await axios.get('http://pokeapi.co/api/v2/pokemon/?limit=150');
        const extract = call.data.results;        
        return extract;
    }
    catch (err){
        console.log(err);
    }
}

module.exports = getPokemonData;