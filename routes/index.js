const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


router.get('/', (req, res) => {
    res.render('index');
})

router.post('/', passport.authenticate('local', {
    successRedirect: 'protecteRoute/rutaProtegida',
    failureRedirect: '/',
    failureFlash: true

}))

router.get('/users/logout', (req, res) => {
    request.logOut();
    res.redirect('/');
});

module.exports = router;