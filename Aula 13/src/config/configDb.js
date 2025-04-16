const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DEV_DB_NOME, 
    process.env.DEV_DB_USER, 
    process.env.DEV_DB_PASSWORD, {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT

  });

  module.exports = sequelize

