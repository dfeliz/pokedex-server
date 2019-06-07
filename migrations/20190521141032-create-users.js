'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_lastname: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_birthdate: {
        type: Sequelize.DATEONLY,
        alllowNull: false,
      },
      user_city: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_email: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_username: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_password: {
        type: Sequelize.STRING,
        alllowNull: false,
      },
      user_picture: {
        type: Sequelize.BLOB,
      },
      user_active: {
        type: Sequelize.BOOLEAN,
      },
      user_hash: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};