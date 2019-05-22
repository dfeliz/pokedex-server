'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        user_name: 'John',
        user_lastname: 'Doe',
        user_birthdate: '1995-05-10',
        user_city: 'Santo Domingo',
        user_email: 'demo@demo.com',
        user_username: 'jdoe',
        user_password: '1234',
        user_picture: '',
        createdAt: '2019-05-21',
        updatedAt: '2019-05-21',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};