/* eslint-disable no-undef */
const Sequelize = require('sequelize')

const user = "postgres";

const connection = new Sequelize("pokedex", user, "password", {
  host: "db",
  dialect: "postgres",
}, console.log("Connected to database with user ", user))

module.exports = connection;
