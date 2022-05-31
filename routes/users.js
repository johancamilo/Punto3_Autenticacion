const express = require('express');
const router = express.Router();
const User = require('../models/User');
require('../models/User');
const passport = require('passport');
const { request } = require('express');


router.get('/users/register', (req, res) => {
    res.render('users/register');
});
router.get('/users/logout', (req, res) => {
    res.render('users/logout');
});


// router.post('/users/logout', passport.authenticate('local', {
//     successRedirect: '/protecteRoute',
//     failureRedirect: '/users/logout',
//     failureFlash: true

// }))


router.post('/users/register', async (req, res) =>{
    const { nombre, apellido, celular, correo, password, confirmpassword, genero, ciudad} = req.body;
    const errors =[];
        if(nombre.length <= 0 ){
            errors.push({text: 'POR FAVOR LLENAR LOS CAMPOS SOLICITADOS'});
        }
        if(password != confirmpassword){
            errors.push({text: 'LAS CONTRASEÑAS NO CONCUERDAN'});
        }
        if(password.length < 4){
            errors.push({text: 'LA CONTRASEÑA TIENE QUE TENER AL MENOS 4 CARACTERES'});
        }
        if(errors.length > 0){
            res.render('users/register', {errors, nombre, apellido, celular, correo, password, confirmpassword, genero, ciudad});
        }else{
            const correoUser = await User.findOne({correo:correo});
            if(correoUser){
                
                req.flash('error_msg','LISTO');
                res.redirect('users/register');
            }
          const newUser = new User({nombre, correo, password});
          newUser.password = await newUser.encryptPassword(password);
          await newUser.save();
          req.flash('success_msg','ESTAS REGISTRADO');
          res.redirect('/');
        }
});




module.exports = router;