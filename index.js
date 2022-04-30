const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesControllers = require('./categories/categoriesControllers');
const docsControllers = require('./docs/docsControllers')
const Category = require('./categories/Category');
const Docs = require('./docs/Docs');


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

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(8080, ()=>{console.log("server init")});