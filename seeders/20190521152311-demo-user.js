'use strict';

const password = '12345678';
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = [];
    users.push({
      user_name: 'John',
      user_lastname: 'Doe',
      user_birthdate: '1995-05-10',
      user_city: 'Santo Domingo',
      user_email: 'demo@demo.com',
      user_username: 'jdoe',
      user_password: crypto.createHash('md5').update(password).digest('hex'),
      user_picture: '',
      user_active: false,
      createdAt: '2019-05-21',
      updatedAt: '2019-05-21',
    });
    users.push({
      user_name: 'Daniel',
      user_lastname: 'Feliz',
      user_birthdate: '1998-05-10',
      user_city: 'Santo Domingo',
      user_email: 'foxxo14@aol.com',
      user_username: 'dfeliz',
      user_password: crypto.createHash('md5').update(password).digest('hex'),
      user_picture: '',
      user_active: true,
      gender_id: 1,
      createdAt: '2019-05-21',
      updatedAt: '2019-05-21',
    })

    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};