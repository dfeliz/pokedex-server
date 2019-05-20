'use strict';

module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define('pokemons', {
        poke_id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
        poke_name: {type: DataTypes.STRING, allowNull: false },
        poke_description: {type: DataTypes.TEXT, allowNull: false },
        poke_captured: {type: DataTypes.BOOLEAN, allowNull: false },
    });

    return Pokemon;
};