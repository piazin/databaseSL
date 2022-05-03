const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

const categoriesController = require('./categories/CategoriesControllers');
const articlesController = require('./articles/ArticlesControllers');

//views engine
app.set('view engine','ejs');
//static
app.use(express.static('public'));
//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(()=>{
        console.log('database init');
    }).catch((err)=>{
        console.log('database failed', err);
    });

//estou dizendo que quero usar as rotas criadas neste arquivo  
app.use('/', categoriesController);   
app.use('/', articlesController); 

//rot
app.get('/', (req, res)=>{
    Article.findAll({
        order:[
            ['createdAt','DESC']
        ],
        limit: 4
    }).then(articles=>{
        Category.findAll().then(categories => {
            res.render('index',{articles: articles, categories: categories});
        });
    })
});

app.get('/:slug', (req,res)=>{
    var slug = req.params.slug;

    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article',{article: article, categories: categories});
            });
        } else{
            res.redirect('/');
        }
    }).catch((err)=>{
        res.redirect('/');
    })
});

app.get('/category/:slug', (req,res)=>{
    var slug = req.params.slug;

    Category.findOne({
        where:{
            slug: slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){

            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories});
            })

        }else {
            res.redirect('/');
        }
    }).catch((err)=>{
        console.log('err',err);
        res.redirect('/');
    })
});

app.listen(8080, ()=>{console.log('server init')});