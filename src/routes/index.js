const express = require('express');
const router = express.Router();

// Rota raiz
router.get('/', function(req, res) {
    // res.send('testing testing oi oi');
    res.render('index', { error: null });

});

router.get('/login', function(req,res){
    let hasError = false
    res.render('login', { hasError: hasError});
})

router.get('/register', function(req,res){
    let hasError = false
    res.render('register', { hasError: hasError});
})
module.exports = router;