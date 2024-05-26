const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Rota raiz
router.get('/', async function(req, res) {    
    if (req.session.authenticated) {

        const user = req.session.user;

        const player = await userController.getPlayerDataAPI(req.session.userGamertag);
        
        player.clanBadge =  await userController.getClanBadge(player.clan.badgeId);

        res.render('dashboard', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            player: player,
            currentDeck: player.currentDeck
        });

    }else{
        req.session.hasErrorLogin = true;
        req.session.errorMessageLogin = 'Faça login antes de acessar a Dashboard!';
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/dashboard'); // Redirecione de volta para o dashboard em caso de erro
        }
        res.clearCookie('connect.sid'); // Limpar o cookie de sessão
        res.redirect('/login'); // Redirecionar para a tela de login
    });
});


module.exports = router;