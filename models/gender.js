'use strict';

module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define('genders', {
        gender_id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
        gender_name: {type: DataTypes.STRING, allowNull: false }
    });

    return Gender;
};