'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const Type = connection.define('types', {
    type_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    type_name: {type: Sequelize.STRING, allowNull: false }
});

module.exports = Type;

