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

        let errorMessageLogin = '';
        let hasErrorLogin = false;

        let hasRegistered = false;

        if(req.session.hasRegistered){
            hasRegistered = req.session.hasRegistered;

            
            delete req.session.hasRegistered;

        }

        if(req.session.hasErrorLogin){
            errorMessageLogin = req.session.errorMessageLogin;
            hasErrorLogin = req.session.hasErrorLogin;

            delete req.session.hasErrorLogin;
            delete req.session.errorMessageLogin;

            console.log(errorMessageLogin);
        }

        res.render('login', { 
            hasErrorLogin: hasErrorLogin,
            errorMessageLogin: errorMessageLogin,
            hasRegistered: hasRegistered
    
         });

    }else{
        res.redirect('/dashboard');
    }
})

router.post('/login', function(req,res){
    // A solicitação é do tipo POST, então você pode continuar com o processamento
    userController.authLogin(req,res);
});



router.get('/register', function(req,res){
    if (!req.session.authenticated) {
        
        let errorMessageRegister = '';
        let hasErrorRegister = false;

        if(req.session.hasErrorRegister){
            errorMessageRegister = req.session.errorMessageRegister;
            hasErrorRegister = req.session.hasErrorRegister;

            delete req.session.hasErrorRegister;
            delete req.session.errorMessageRegister;
            
            console.log(errorMessageRegister);
        }

        

        res.render('register', {
             hasErrorRegister: hasErrorRegister,
             errorMessageRegister
        });
    }else{
        res.redirect('/dashboard');
    }

})

router.post('/register', function(req,res){
    userController.validateRegister(req,res);
})
module.exports = router;