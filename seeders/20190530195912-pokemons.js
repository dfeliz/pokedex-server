'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const call = await axios.get('http://pokeapi.co/api/v2/pokemon/?limit=150');
    const extract = call.data.results;
    let data = [];
    extract.map(pokemon => {
      data.push({
        poke_name: pokemon.name,
        poke_description: 'Example',
        createdAt: "2019-05-30",
        updatedAt: "2019-05-30",
      })
    })
    return queryInterface.bulkInsert('pokemons', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pokemons', null, {})
  }
};
