'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const Gender = connection.define('genders', {
    gender_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    gender_name: {type: Sequelize.STRING, allowNull: false }
});

module.exports = Gender;