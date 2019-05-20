const Sequelize = require('sequelize')

const connection = new Sequelize('pokedex', 'root', '1887415157l', {
  host: 'localhost',
  dialect: 'mysql',
})

const Pokemon = connection.define('pokemons', {
  poke_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  poke_name: {type: Sequelize.STRING, allowNull: false },
  poke_description: {type: Sequelize.TEXT, allowNull: false },
  poke_captured: {type: Sequelize.BOOLEAN, allowNull: false },
});

const Poketype = connection.define('pokemon_types');

const Catch = connection.define('catches', {
  catch_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  catch_location_x: {type: Sequelize.DECIMAL(17,15), allowNull: false },
  catch_location_y: {type: Sequelize.DECIMAL(17,15), allowNull: false },
  catch_date: { type: Sequelize.DATE, allowNull: false },
});

const Gender = connection.define('genders', {
  gender_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  gender_name: {type: Sequelize.STRING, allowNull: false }
});

const Type = connection.define('types', {
  type_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  type_name: {type: Sequelize.STRING, allowNull: false }
});

const User = connection.define('users', {
  user_id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  user_name: {type: Sequelize.STRING, allowNull: false },
  user_lastname: {type: Sequelize.STRING, allowNull: false },
  user_birthdate: {type: Sequelize.DATE, allowNull: false },
  user_city: {type: Sequelize.STRING, allowNull: false },
  user_email: {type: Sequelize.STRING, allowNull: false},
  user_username: {type: Sequelize.STRING, allowNull: false },
  user_password: {type: Sequelize.STRING, allowNull: false },
  user_picture: {type: Sequelize.BLOB('long'), allowNull: false},
});

// Many-to-many relationship, creates a table called pokemon_types for the relation
Pokemon.belongsToMany(Type, {through: "pokemon_types", foreignKey: 'type_id', allowNull: false});
Type.belongsToMany(Pokemon, {through: "pokemon_types", foreignKey: 'poke_id', allowNull: false});

Gender.hasOne(User, {foreignKey: 'gender_id', allowNull: false}); // Adds gender_id to user table
Gender.hasOne(Pokemon, {foreignKey: 'gender_id', allowNull: false}); // Adds gender_id to pokemon table
User.hasMany(Catch, {foreignKey: 'user_id', allowNull: false}); // Adds user_id to catch table
Pokemon.hasMany(Catch, {foreignKey: 'poke_id', allowNull: false}); // Adds poke_id to catch table

connection.sync()

connection.authenticate()
  .then(() => {
    console.log('Authenticated');
})
  .catch(err => {
    console.log('Error connecting: ' + err.toString());
})

connection.authenticate()
  .then(() => {
    console.log('Authenticated');
})
  .catch(err => {
    console.log('Error connecting: ' + err.toString());
})

module.exports = connection;