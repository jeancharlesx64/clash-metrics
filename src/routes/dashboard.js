const express = require('express');
const router = express.Router();

// Rota raiz
router.get('/', function(req, res) {    
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;
        res.render('dashboard', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
        });

    }else{
        req.session.hasErrorLogin = true;
        req.session.errorMessageLogin = 'Faça login antes de acessar a Dashboard!';
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

});

module.exports = router;