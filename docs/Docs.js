const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Docs = connection.define('docs', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


Category.hasMany(Docs);
Docs.belongsTo(Category);

module.exports = Docs;