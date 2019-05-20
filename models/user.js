'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        user_id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
        user_name: {type: DataTypes.STRING, allowNull: false },
        user_lastname: {type: DataTypes.STRING, allowNull: false },
        user_birthdate: {type: DataTypes.DATE, allowNull: false },
        user_city: {type: DataTypes.STRING, allowNull: false },
        user_email: {type: DataTypes.STRING, allowNull: false},
        user_username: {type: DataTypes.STRING, allowNull: false },
        user_password: {type: DataTypes.STRING, allowNull: false },
        user_picture: {type: DataTypes.BLOB('long'), allowNull: false},
      });

    return User;
};