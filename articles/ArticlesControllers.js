const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
const { append } = require('express/lib/response');

//main
router.get('/admin/articles', (req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles: articles
        });
    })
    
});
//new
router.get('/admin/articles/new', (req,res)=>{

    Category.findAll().then(categories => {
        res.render('admin/articles/new', {
            categories: categories
        });
    }); 
})
//save
router.post('/articles/save', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title:title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/articles')
    })
});

//delete
router.post('/articles/delete', (req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        Article.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            setTimeout(()=>{
                res.redirect('/admin/articles');
            }, 2000);
        });
    }else{
        res.redirect('/');
    }
});

router.get('/admin/articles/edit/:id', (req,res)=>{
    var id = req.params.id;

    Article.findOne({
        where:{
            id: id
        }
    }).then(articles =>{

        Category.findAll().then(categories =>{
            res.render('admin/articles/edit', {
                articles:articles, categories:categories
            });
        })
    })    
});

router.post('/articles/update', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    var id = req.body.id;


    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num', (req,res)=>{
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = parseInt(page - 1) * 4;
    }

    Article.findAndCountAll({ //este metodo retorna todos os artigos junto com a contagem dos artigos
        limit: 4,    //definimos um limite para ser retornado 
        offset: offset,//vai retornar o artigo só depois do numero em questão 
        order: [
            ['id', 'DESC']
        ] 
    }).then(articles => {

        var next;
        if(offset + 4 >= articles.count){
            next = false;
        } else {
            next =  true;
        }
        var result = {
            page: parseInt(page),
            next: next,
            articles:articles
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {
                result: result, categories:categories
            })
        })
    })
})

module.exports = router;