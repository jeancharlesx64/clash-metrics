const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Rota raiz
router.get('/', async function(req, res) {    
    if (req.session.authenticated) {

        // dados do usuário vindo do banco
        const user = req.session.user;

        console.log(req.session.userGamertag)
        // dados do jogador vindo da API
        const player = await userController.getPlayerDataAPI(req.session.userGamertag);

        console.log(player.tag);
        res.render('dashboard', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            playerTag: player.tag,
            playerName: player.name
        });

    }else{
        req.session.hasErrorLogin = true;
        req.session.errorMessageLogin = 'Faça login antes de acessar a Dashboard!';
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

});

module.exports = router;