const Sequelize = require('sequelize');

const connection = new Sequelize('databasesl','root','Piazin25$',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;