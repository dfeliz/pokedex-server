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
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('users');
  }
};