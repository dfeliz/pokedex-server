'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const Catch = connection.define('catches', {
    catch_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
    catch_location_x: {type: Sequelize.DECIMAL(17,15), allowNull: false },
    catch_location_y: {type: Sequelize.DECIMAL(17,15), allowNull: false },
    catch_date: { type: Sequelize.DATE, allowNull: false },
});

module.exports = Catch;

