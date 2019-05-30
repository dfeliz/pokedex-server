'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add gender_id to users table
    return queryInterface.addColumn(
      'users',
      'gender_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'genders',
          key: 'gender_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ).then(() => {
      // Add gender_id to pokemons table
      return queryInterface.addColumn(
        'pokemons',
        'gender_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'genders',
            key: 'gender_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      // Add user_id to catch table
      return queryInterface.addColumn(
        'catches',
        'user_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'user_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      // Add poke_id to catch table
      return queryInterface.addColumn(
        'catches',
        'poke_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'pokemons',
            key: 'poke_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn (
      'users',
      'gender_id',
    ).then(() => {
      return queryInterface.removeColumn (
        'pokemons',
        'gender_id',
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'catches',
        'user_id',
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'catches',
        'poke_id',
      )
    });
  }
};
