const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');
const adminAuth = require('../middlewares/adminAuth')

router.get('/login', (req, res) => {
    res.render('admin/users/login')
})

router.get('/admin/users', adminAuth,(req,res) => {

    User.findAll().then(users => {
        res.render('admin/users/index', {
            users:users
        })
    }).catch(()=>{
        res.redirect('/');
    })

})

router.get('/admin/users/create', adminAuth,(req, res)=>{
    res.render('admin/users/create')
});

router.post('/users/save', (req,res)=>{
    var email = req.body.email; 
    var password = req.body.password;

    User.findOne({
        where: {
            email:email
        }
    }).then(user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect('/login');
            }).catch(()=>{
                console.log('err');
                res.redirect('/admin/users/create')
            })
        } else {
            res.redirect('/admin/users/create');
        }
    })
})

router.post('/authenticate', (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined){ //se existir um usuario com este email vamos validar a senha do user
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    user: user.id,
                    email: user.email
                }
                res.redirect('/admin/panel')
            } else {
                res.redirect('/login');
            }

        } else {
            res.redirect('/login');
        }
    })
})

router.get('/admin/panel', adminAuth,(req,res)=>{
    res.send('tela de admin')
})

module.exports = router;