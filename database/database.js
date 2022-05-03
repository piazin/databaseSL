const Sequelize = require('sequelize');

const connection = new Sequelize('docsl','root','Piazin25$',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;