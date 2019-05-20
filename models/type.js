'use strict';

module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('types', {
        type_id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
        type_name: {type: DataTypes.STRING, allowNull: false }
    });

    return Type;
};

