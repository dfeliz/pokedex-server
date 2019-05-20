const Pokemon = require('./pokemon');
const Type = require('./type');
const Gender = require('./gender');
const User = require('./user');
const Catch = require('./catch');
const Poketype = require('./poketype');

// Many-to-many relationship, creates a table called pokemon_types for the relation
Pokemon.belongsToMany(Type, {through: "pokemon_types", foreignKey: 'type_id', allowNull: false});
Type.belongsToMany(Pokemon, {through: "pokemon_types", foreignKey: 'poke_id', allowNull: false});

Gender.hasOne(User, {foreignKey: 'gender_id', allowNull: false}); // Adds gender_id to user table
Gender.hasOne(Pokemon, {foreignKey: 'gender_id', allowNull: false}); // Adds gender_id to pokemon table
User.hasMany(Catch, {foreignKey: 'user_id', allowNull: false}); // Adds user_id to catch table
Pokemon.hasMany(Catch, {foreignKey: 'poke_id', allowNull: false}); // Adds poke_id to catch table

module.exports;