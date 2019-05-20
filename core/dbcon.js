const Sequelize = require('sequelize')

const connection = new Sequelize('pokedex', 'root', '1887415157l', {
  host: 'localhost',
  dialect: 'mysql',
})

connection.sync()

connection.authenticate()
  .then(() => {
    console.log('Authenticated');
})
  .catch(err => {
    console.log('Error connecting: ' + err.toString());
})



module.exports = connection;