'use strict';

const password = '12345678';
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        user_name: 'John',
        user_lastname: 'Doe',
        user_birthdate: '1995-05-10',
        user_city: 'Santo Domingo',
        user_email: 'demo@demo.com',
        user_username: 'jdoe',
        user_password: crypto.createHash('md5').update(password).digest('hex'),
        user_picture: '',
        user_active: true,
        createdAt: '2019-05-21',
        updatedAt: '2019-05-21',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};