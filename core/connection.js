const Sequelize = require('sequelize')
const config = require('./config')

const connection = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
}, console.log("Connected to database"))



module.exports = connection;