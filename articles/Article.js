const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//como relacionar uma tabela a outra?
//um para muitos
Category.hasMany(Article);
//belongsTo siginifica pertence á
Article.belongsTo(Category); //um artigo pertence a uma categoria

module.exports = Article;