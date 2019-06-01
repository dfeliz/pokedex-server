'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const call = await axios.get('http://pokeapi.co/api/v2/pokemon/?limit=150');
    let extract = call.data.results;

    let requests = [];
    let pokemons = [];

    extract.map(pokemon => (
      requests.push(
        axios.get(pokemon.url)
        .then((response) => {
          let pokemonData = response.data;
          console.log(pokemonData.id);
          pokemons.push({
            poke_name: pokemonData.name,
            poke_image: pokemonData.sprites.front_default,
            createdAt: "2019-05-30",
            updatedAt: "2019-05-30",
          })
        })
      ))
    )

    await axios.all(requests)
      .catch((err) => console.log(err));

    return queryInterface.bulkInsert('pokemons', pokemons, {})
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pokemons', null, {})
  }
};
