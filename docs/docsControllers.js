const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const slugify = require('slugify');
const Docs = require('./Docs');

//main
router.get('/admin/docs', (req,res)=>{
    Docs.findAll({
        include: [{model: Category}]
    }).then(documents => {
        res.render('admin/docs/index', {
            documents: documents
        });
    })
    
});
//new
router.get('/admin/docs/new', (req,res)=>{

    Category.findAll().then(categories => {
        res.render('admin/docs/new', {
            categories: categories
        });
    }); 
})
//save
router.post('/docs/save', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Docs.create({
        title:title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/docs')
    })
});

//delete
router.post('/docs/delete', (req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        Docs.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            setTimeout(()=>{
                res.redirect('/admin/docs');
            }, 2000);
        });
    }else{
        res.redirect('/');
    }
});

router.get('/admin/docs/edit/:id', (req,res)=>{
    var id = req.params.id;

    Docs.findOne({
        where:{
            id: id
        }
    }).then(documents =>{

        Category.findAll().then(categories =>{
            res.render('admin/docs/edit', {
                documents: documents, categories:categories
            });
        })
    })    
});

router.post('/docs/update', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    var id = req.body.id;


    Docs.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/docs')
    })
})

module.exports = router;