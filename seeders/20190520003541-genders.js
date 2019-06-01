'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let genders = [];
      genders.push({
        gender_id: 1,
        gender_name: "Male",
        createdAt: "2019-05-30",
        updatedAt: "2019-05-30",
      });
      genders.push({
        gender_id: 2,
        gender_name: "Female",
        createdAt: "2019-05-30",
        updatedAt: "2019-05-30",
      });
      genders.push({
        gender_id: 3,
        gender_name: "Other",
        createdAt: "2019-05-30",
        updatedAt: "2019-05-30",
      })
    return queryInterface.bulkInsert('genders', genders);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('genders', null, {});
  }
};
