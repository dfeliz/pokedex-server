'use strict';
const axios = require('axios');
const api = require('../api/pokeapi');

const getData = async() => {
    try {
        return await axios.get(api.url)
            .then(response => response.data.results)
    }
    catch (err){
        console.log(err);
    }
}

module.exports = {getData};