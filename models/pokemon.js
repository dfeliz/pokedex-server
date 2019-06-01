'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const Pokemon = connection.define('pokemons', {
    poke_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    poke_name: {type: Sequelize.STRING, allowNull: false },
    poke_image: {type: Sequelize.STRING, allowNull: false},
});

module.exports = Pokemon;