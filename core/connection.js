const Sequelize = require('sequelize')
const config = require('./config')
var getData = require('../seeds/seed');

const connection = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
})




module.exports = connection;