const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development:{
    username: process.env.DEV_DB_USER, 
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NOME, 
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORTA,
    dialect: "postgres",
    logging: true
  },
  text:{},
  production:{}
}
