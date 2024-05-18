const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController");

// Rota raiz
router.get('/', function(req, res) {
    // res.send('testing testing oi oi');
    res.render('index', { error: null });

});

router.get('/login', function(req,res){
    if (!req.session.authenticated) {

        let errorMessage = '';
        let hasError = false;

        if(req.session.hasError){
            errorMessage = req.session.errorMessage;
            hasError = req.session.hasError;
            console.log(errorMessage);
        }

        res.render('login', { 
            hasError: hasError,
            errorMessage: errorMessage
         });

    }else{
        res.redirect('/dashboard');
    }
})

router.post('/login', function(req,res){
    // A solicitação é do tipo POST, então você pode continuar com o processamento
    userController.login(req,res);
});



router.get('/register', function(req,res){
    let hasError = false
    res.render('register', { hasError: hasError});
})
module.exports = router;