'use strict';

module.exports = (sequelize, DataTypes) => {
    const Poketype = sequelize.define('pokemon_types');
    
    return Poketype;
};