'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pokemon_types', {
      poke_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pokemon_types');
  }
};