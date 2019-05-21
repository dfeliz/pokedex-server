'use strict';
const axios = require('axios');

const getPokemonTypes = async() => {
    try {
        return await axios.get('http://pokeapi.co/api/v2/type')
            .then(response => response.data.results)
    }
    catch (err){
        console.log(err);
    }
}

module.exports = getPokemonTypes;