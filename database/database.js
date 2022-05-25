const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize('docsl','root',process.env.PASS_BD,{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;