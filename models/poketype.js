'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const Poketype = connection.define('pokemon_types');

module.exports = Poketype;