const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const connection = new Sequelize('documents', 'root', 'Piazin25$',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;