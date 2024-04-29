const express = require('express');
const router = express.Router();

// Rota raiz
router.get('/', function(req, res) {
    // res.send('testing testing oi oi');
    res.render('index', { error: null });

});

module.exports = router;