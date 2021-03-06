//========Imports=======//
const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');

//========rota principal=======//
router.get('/admin/categories', adminAuth,(req, res)=>{

    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        });
    }).catch(()=>{
        console.log('sem dados');
    });
    
});

//========rota para novo documento=======//
router.get('/admin/categories/new', adminAuth,(req,res)=>{
    res.render('admin/categories/new');
});
//========rota para salvar documento=======//
router.post('/categories/save', (req,res)=>{
    var title = req.body.title;

    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories');
        }).catch(()=>{
            console.log('erro ao cadastrar');
        })
    } else {
        res.redirect('/admin/categories');
    }
    
});
//========rota para deletar=======//
router.post('/categories/delete', (req,res)=>{
    var id = req.body.id;

    Category.destroy({
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    }).catch((err)=>{
        res.redirect('/');
    })
});
//========rota para edição=======//
router.get('/admin/categories/edit/:id', adminAuth,(req,res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category =>{

        if(category != undefined){
            res.render('admin/categories/edit', {
                category: category
            });
        } else {
            res.redirect('/admin/categories');
        }
    })
})
//========rota para confirmar update=======//
router.post('/categories/update', (req,res)=>{
    var id = req.body.id;
    var title = req.body.title;

    Category.update({
        title: title,
        slug: slugify(title)
    },{
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    });
});

module.exports = router;