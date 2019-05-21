const Sequelize = require('sequelize')
const config = require('./config')

const connection = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
})



module.exports = connection;