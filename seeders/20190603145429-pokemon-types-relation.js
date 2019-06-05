'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const call = await axios.get('https://pokeapi.co/api/v2/type/')

    // const extract = call.data.results;

    // let requests = [];
    // let pokemon_types = [];

    // extract.map(type => {
    //   requests.push(
    //     axios.get(type.url)
    //     .then((response) => {
    //       let pokeTypes = response.data;
    //       console.log(pokeTypes.pokemon.pokemon);
    //       //console.log(`${pokeTypes.pokemon.pokemon.name} is type ${pokeTypes.id}`);
    //     })
    //   );
    // })

    // await axios.all(requests);

    // return queryInterface.bulkInsert('pokemon_types', pokemon_types, {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('pokemon_types', null, {});
  }
};
