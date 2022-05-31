const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/protecteRoute/rutaProtegida', isAuthenticated, async (req, res) => {
    res.render('protecteRoute/rutaProtegida');
})


module.exports = router;