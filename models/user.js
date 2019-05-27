'use strict';
const Sequelize = require('sequelize')
const connection = require('../core/connection');

const User = connection.define('users', {
  user_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  user_name: {type: Sequelize.STRING, allowNull: false },
  user_lastname: {type: Sequelize.STRING, allowNull: false },
  user_birthdate: {type: Sequelize.DATE, allowNull: false },
  user_city: {type: Sequelize.STRING, allowNull: false },
  user_email: {type: Sequelize.STRING, allowNull: false},
  user_username: {type: Sequelize.STRING, allowNull: false },
  user_password: {type: Sequelize.STRING, allowNull: false },
  user_picture: {type: Sequelize.BLOB('long'), allowNull: false},
  user_hash: {type: Sequelize.STRING},
  user_active: {type: Sequelize.BOOLEAN, defaultValue: false},
});

module.exports = User;