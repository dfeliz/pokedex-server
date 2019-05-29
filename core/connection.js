/* eslint-disable no-undef */
const Sequelize = require('sequelize')

const connection = new Sequelize(process.env.SERVER_DATABASE, process.env.SERVER_DATABASE_USER, process.env.SERVER_DATABASE_PASSWORD, {
  host: process.env.SERVER_HOST,
  dialect: process.env.SERVER_DATABASE_DIALECT,
}, console.log("Connected to database"))



module.exports = connection;