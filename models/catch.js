'use strict';

module.exports = (sequelize, DataTypes) => {
    const Catch = sequelize.define('catches', {
        catch_id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
        catch_location_x: {type: DataTypes.DECIMAL(17,15), allowNull: false },
        catch_location_y: {type: DataTypes.DECIMAL(17,15), allowNull: false },
        catch_date: { type: DataTypes.DATE, allowNull: false },
    });

    return Catch;
};

