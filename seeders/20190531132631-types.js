'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const call = await axios.get('http://pokeapi.co/api/v2/type/');
    const extract = call.data.results;
    let types = [];
    extract.map((type) => {
      types.push({
        type_name: type.name,
        createdAt: '2019-05-21',
        updatedAt: '2019-05-21',
      })
    })
    return queryInterface.bulkInsert('types', types, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {})
  }
};
