'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');
const User = require('../models/user');
const Pokemon = require('../models/pokemon');

const Catch = connection.define('catches', {
    catch_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    catch_location_x: {type: Sequelize.DECIMAL(17,15), allowNull: false },
    catch_location_y: {type: Sequelize.DECIMAL(17,15), allowNull: false },
    catch_date: { type: Sequelize.DATEONLY, allowNull: false },
});

Catch.belongsTo(User, {foreignKey: 'user_id'}); // Adds user_id to catch table
Catch.belongsTo(Pokemon, {foreignKey: 'poke_id'}); // Adds poke_id to catch table

module.exports = Catch;

