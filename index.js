const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesControllers = require('./categories/categoriesControllers');
const docsControllers = require('./docs/docsControllers');
const userControllers = require('./admin/userControllers');

const Category = require('./categories/Category');
const Docs = require('./docs/Docs');

app.use(session({
    secret: 'umasenha', cookie: {maxAge: 3000000}
}))

connection
    .authenticate()
    .then(()=>{
        console.log('database connection');
    }).catch((err)=>{
        console.log('database failed');
    });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set('view engine','ejs');
app.use(express.static('public'));

app.use('/', categoriesControllers);
app.use('/', docsControllers);
app.use('/', userControllers);

app.get('/', (req, res)=>{

    Docs.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(documents =>{

        Category.findAll().then(categories =>{
            res.render('index',{
                documents: documents ,categories: categories
            });
        })
        
    });
    
});

app.get('/:slug', (req,res)=>{
    var slug = req.params.slug;

    Docs.findOne({
        where:{
            slug: slug
        }
    }).then(documents => {
        if(documents != undefined){
            Category.findAll().then(categories => {
                res.render('documents',{documents: documents, categories: categories});
            });
        } else{
            res.redirect('/');
        }
    }).catch((err)=>{
        res.redirect('/');
    })
});

app.listen(8080, ()=>{console.log("server init")});