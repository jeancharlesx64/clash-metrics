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
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/login');
    }

});

module.exports = router;